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
      "return ('프로젝트 관리 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('프로젝트 관리 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "designerBoard",
  "hangul": "디자이너 콘솔",
  "route": [
    "designerBoard"
  ]
} %/%/g

const DesignerBoardJs = function () {
  this.mother = new GeneralJs();
}

DesignerBoardJs.binaryPath = FRONTHOST + "/middle/console/dashboard";

DesignerBoardJs.prototype.insertInitBox = function () {
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

  titleWording = "프로젝트 관리";
  subTitleContents = "홈리에종 프로젝트 제어 콘솔";

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

DesignerBoardJs.prototype.insertRouterBox = function () {
  const instance = this;
  const mother = this.mother;
  const { clients, projects, requestNumber, ea, baseTong, media, desid } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, selfHref } = GeneralJs;
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft;
  let tong;
  let whiteBottomMargin;
  let grayTong;
  let grayMargin;
  let tongMargin;
  let grayPadding;
  let tongHeight;
  let whiteSize;
  let whiteWeight, whiteColumnWeight;
  let whiteBaseTong;
  let whiteTextTop;
  let contentsMap;
  let widthMap;
  let circleWidth, circleTop;
  let state;
  let boxTarget;
  let targets;
  let minimalLength;
  let forceWidth;
  let colorBoxHeight;
  let colorBoxPadding;
  let colorBoxSize, colorBoxWeight, colorBoxTextTop;
  let naviMenu;
  let textVisual;
  let whiteSubSize;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 58, 58, 58, 58, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 3 %%>;

  mobileTitleLeft = 6;

  grayMargin = <%% 12, 12, 10, 10, 0 %%>;
  grayPadding = <%% 14, 14, 10, 10, 0 %%>;

  tongMargin = <%% 6, 6, 6, 6, 1 %%>;

  tongHeight = <%% 120, 120, 110, 100, 16 %%>;

  whiteSize = <%% 20, 19, 18, 17, 3.4 %%>;
  whiteWeight = <%% 800, 800, 800, 800, 800 %%>;
  whiteColumnWeight = <%% 200, 200, 200, 200, 200 %%>;
  whiteTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 1), (isMac() ? 0 : 1), 0 %%>;
  whiteSubSize = <%% 14, 14, 13, 12, 2.6 %%>;

  circleWidth = <%% 8, 8, 8, 8, 1.2 %%>;
  circleTop = <%% 21, 21, 17, 17, 2.7 %%>;
  circleRight = <%% 20, 20, 20, 20, 2.7 %%>;

  minimalLength = <%% 3, 3, 3, 3, 6 %%>;

  colorBoxHeight = <%% 26, 26, 24, 24, 5.5 %%>;
  colorBoxPadding = <%% 10, 10, 8, 8, 2.2 %%>;
  colorBoxSize = <%% 11, 11, 10, 10, 2.5 %%>;
  colorBoxWeight = <%% 700, 700, 700, 700, 700 %%>;
  colorBoxTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isIphone() ? 0 : -0.2) %%>;

  textVisual = <%% (isMac() ? 3 : 1), (isMac() ? 3 : 1), (isMac() ? 3 : 1), (isMac() ? 3 : 1), 0.2 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  naviMenu = [
    {
      title: "기본 정보",
      sub: "checklist",
      href: FRONTHOST + "/designer/about.php" + "?desid=" + desid,
    },
    {
      title: "정산 리포트",
      sub: "report",
      href: FRONTHOST + "/designer/report.php" + "?desid=" + desid,
    },
    {
      title: desktop ? "프로젝트 의뢰서" : "의뢰서",
      sub: "requests",
      href: FRONTHOST + "/designer/requests.php" + "?desid=" + desid,
    },
  ];

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(paddingTop) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          overflow: "hidden",
          marginBottom: String(0) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  grayTong = createNode({
    mother: tong,
    style: {
      display: "block",
      background: desktop ? colorChip.gray3 : "transparent",
      borderRadius: String(5) + "px",
      paddingTop: String(grayMargin) + ea,
      paddingBottom: String(grayMargin - tongMargin) + ea,
    }
  });

  for (let i = 0; i < naviMenu.length; i++) {
    whiteBaseTong = createNode({
      mother: grayTong,
      attribute: {
        index: String(i)
      },
      event: {
        click: function (e) {
          const index = Number(this.getAttribute("index"));
          selfHref(naviMenu[index].href);
        }
      },
      style: {
        display: "inline-flex",
        position: "relative",
        marginLeft: String(i === 0 ? grayMargin : 0) + ea,
        marginRight: String(i === naviMenu.length - 1 ? 0 : tongMargin) + ea,
        width: "calc(calc(calc(100% - " + String(grayMargin * 2) + ea + ") - " + String(tongMargin * (naviMenu.length - 1)) + ea + ") / " + String(naviMenu.length) + ")",
        height: String(tongHeight) + ea,
        borderRadius: String(5) + "px",
        background: desktop ? colorChip.white : colorChip.gray1,
        marginBottom: String(desktop ? tongMargin : 0) + ea,
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer",
        boxShadow: desktop ? "0px 3px 12px -9px " + colorChip.shadow : "",
        justifyContent: "center",
        textAlign: "center",
      },
      children: [
        {
          text: naviMenu[i].title,
          style: {
            display: "block",
            position: "relative",
            top: String(whiteTextTop) + ea,
            fontSize: String(whiteSize) + ea,
            fontWeight: String(whiteWeight),
            color: colorChip.black,
          }
        },
        {
          text: naviMenu[i].sub,
          style: {
            display: "block",
            position: "relative",
            top: desktop ? "" : String(isIphone() ? -0.6 : 0) + ea,
            fontSize: String(whiteSubSize) + ea,
            fontWeight: String(400),
            fontFamily: "graphik",
            color: colorChip.green,
            marginBottom: String(textVisual) + ea,
          }
        }
      ]
    });
  }

}

DesignerBoardJs.prototype.projectPopup = function (proid) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, ajaxJson, homeliaisonAnalytics, cleanChildren, ajaxForm, colorCalendar } = GeneralJs;
  const { ea, naviHeight, media, projects, contents: serviceContents } = this;
  const project = projects.find((obj) => { return obj.proid === proid });
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const whitePopupClassName = "whitePopupClassName";
  const processTargetsClassName = "processTargetsClassName";
  const fileInputClassName = "fileInputClassName";
  const blank = "&nbsp;&nbsp;&nbsp;";
  const totalContents = document.getElementById("totalcontents");
  const zIndex = 4;
  const isDateValid = (date) => {
    return ((new Date(2000, 0, 1)).valueOf() <= date.valueOf() && (new Date(3000, 0, 1)).valueOf() > date.valueOf());
  }
  return (e) => {
    let grayBack, whiteBase;
    let whiteWidth;
    let whiteMargin;
    let innerMargin;
    let contentsTong;
    let titleArea, formArea, paymentArea;
    let titleHeight, formHeight, paymentHeight;
    let titleSize, titleWeight, titleLineHeight, titleTop;
    let formPaddingTop;
    let formBox;
    let grayTong;
    let grayInnerPadding;
    let arrowBetween;
    let arrowHeight;
    let arrowWidth;
    let grayInnerPaddingRight;
    let grayCenterMargin;
    let divideNumber;
    let textTop;
    let textSize;
    let textWeight;
    let textMarginLeft;
    let titleTargets;
    let grayDescriptionTong;
    let grayWhiteBase;
    let num, num2;
    let contentsMarginBottom0, contentsMarginBottom1;
    let contentsWordingSize;
    let contentsBottom;
    let zeroWidth;
    let zeroMarginRight;
    let firstWidth;
    let secondWidth;
    let secondMarginRight;
    let checkBoxWidth;
    let arrowBoxWidth;
    let checkBoxTop;
    let arrowBoxTop;
    let lineTop;
    let linePadding;
    let mobileContentsWordingSize;
    let checkBoxAreaWidth;
    let grayDescriptionTongMarginTop;
    let grayDescriptionTitleSize;
    let grayDescriptionTitleWeight;
    let grayDescriptionTitleMarginBottom;
    let buttonPadding;
    let buttonHeight;
    let buttonMarginTop;
    let buttonBetween;
    let buttonTextTop;
    let buttonSize;
    let buttonWeight;
    let thisStatusNumber;
    let setDescription;
    let statusButtonWidth, statusButtonHeight;
    let statusButtonBetween;
    let statusTextTop, statusSize, statusBetween;
    let mobileArrowMarginBottom;
    let mobileInnerPaddingBottom;
    let dateArr;
    let grayCalendarTong;
    let buttonList;
    let setButtons;

    whiteWidth = <%% 1000, 1000, 800, 660, 88 %%>;
    whiteMargin = <%% 54, 54, 54, 48, 6 %%>;
    innerMargin = <%% 54, 54, 54, 48, 6 %%>;

    titleHeight = <%% 36, 36, 30, 30, 8 %%>;
    paymentHeight = <%% 70, 70, 70, 70, 14 %%>;

    titleSize = <%% 24, 23, 21, 19, 4 %%>;
    titleWeight = <%% 700, 700, 700, 700, 700 %%>;
    titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
    titleTop = <%% (isMac() ? -10 : -7), (isMac() ? -10 : -7), (isMac() ? -9 : -6), (isMac() ? -6 : -4), -0.2 %%>;

    formPaddingTop = <%% 36, 36, 32, 25, 5 %%>;

    grayInnerPadding = <%% 20, 20, 16, 16, 3.6 %%>;
    grayInnerPaddingRight = <%% 32, 32, 30, 22, 5.4 %%>;
    grayCenterMargin = <%% 12, 12, 10, 8, 0.6 %%>;

    arrowBetween = <%% 5, 5, 5, 3, 1.5 %%>;
    arrowHeight = <%% 48, 46, 44, 30, 8 %%>;
    arrowWidth = <%% 224, 224, 175, 140, 24.6 %%>;

    mobileArrowMarginBottom = 2;

    mobileInnerPaddingBottom = 7;

    divideNumber = <%% 4, 4, 4, 4, 3 %%>;

    textTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isIphone() ? 0 : -0.3) %%>;
    textSize = <%% 14, 14, 13, 11, 2.6 %%>;
    textWeight = <%% 700, 700, 700, 700, 700 %%>;
    textMarginLeft = <%% 20, 18, 16, 10, 4.2 %%>;

    grayDescriptionTongMarginTop = <%% 24, 24, 20, 16, 3.5 %%>;

    grayDescriptionTitleSize = <%% 17, 17, 16, 14, 3.5 %%>;
    grayDescriptionTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
    grayDescriptionTitleMarginBottom = <%% 20, 20, 18, 16, 3 %%>;

    contentsMarginBottom0 = <%% 6, 6, 6, 4, 2 %%>;
    contentsMarginBottom1 = <%% 32, 32, 30, 28, 0 %%>;

    contentsWordingSize = <%% 13, 13, 12, 11, 3 %%>;
    contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

    zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
    zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
    firstWidth = <%% 150, 150, 120, 90, 10 %%>;
    secondWidth = <%% 15, 15, 15, 10, 2 %%>;
    secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

    checkBoxWidth = <%% 9, 9, 9, 7, 2 %%>;
    arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
    checkBoxTop = <%% (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 4), 1.6 %%>;
    arrowBoxTop = <%% (isMac() ? 7 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;
    checkBoxAreaWidth = <%% 14, 14, 14, 12, 3 %%>;

    lineTop = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 9 : 7), (isMac() ? 8 : 6), 10 %%>;
    linePadding = <%% 12, 12, 12, 10, 12 %%>;

    mobileContentsWordingSize = 2.7;

    buttonPadding = <%% 18, 18, 18, 16, 3.2 %%>;
    buttonHeight = <%% 36, 36, 36, 33, 7.2 %%>;
    buttonMarginTop = <%% 28, 28, 28, 28, 2 %%>;
    buttonBetween = <%% 6, 6, 6, 6, 1 %%>;

    buttonTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isIphone() ? -0.1 : -0.3) %%>;
    buttonSize = <%% 14, 14, 14, 13, 3 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;

    statusButtonWidth = <%% 120, 120, 110, 100, 24 %%>;
    statusButtonHeight = <%% 40, 40, 40, 36, 8 %%>;
    statusButtonBetween = <%% 8, 8, 8, 6, 1 %%>;

    statusTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isIphone() ? -0.2 : -0.3) %%>;
    statusSize = <%% 14, 14, 13, 12, 3 %%>;
    statusBetween = <%% 500, 500, 500, 500, 500 %%>;

    thisStatusNumber = serviceContents.findIndex((obj) => { return obj.target.includes(project.process.action) });

    buttonList = [];
    setDescription = () => {};
    setButtons = () => {};

    titleTargets = serviceContents.map((obj) => { return { title: obj.title, key: obj.key } });
    titleTargets.push({
      title: "현장 완료",
      key: null,
      checklist: null,
    });

    dateArr = [
      {
        contents: {
          color: colorChip.red,
          description: "",
          title: "오늘",
        },
        date: {
          start: new Date(),
          end: new Date(),
        }
      },
    ];
    if (isDateValid(project.process.contract.form.date.from)) {
      dateArr.push({
        contents: {
          color: colorChip.green,
          description: "",
          title: project.name + " 시작일",
        },
        date: {
          start: project.process.contract.form.date.from,
          end: project.process.contract.form.date.from,
        }
      });
    }
    if (isDateValid(project.process.contract.form.date.to)) {
      dateArr.push({
        contents: {
          color: colorChip.green,
          description: "",
          title: project.name + " 종료일",
        },
        date: {
          start: project.process.contract.form.date.to,
          end: project.process.contract.form.date.to,
        }
      });
    }
    if (isDateValid(project.process.contract.meeting.date)) {
      dateArr.push({
        contents: {
          color: colorChip.purple,
          description: "",
          title: project.name + " 현장 미팅",
        },
        date: {
          start: project.process.contract.meeting.date,
          end: project.process.contract.meeting.date,
        }
      });
    }
    if (isDateValid(project.contents.photo.date)) {
      dateArr.push({
        contents: {
          color: colorChip.yellow,
          description: "",
          title: project.name + " 촬영",
        },
        date: {
          start: project.contents.photo.date,
          end: project.contents.photo.date,
        }
      });
    }

    grayBack = createNode({
      mother: totalContents,
      event: {
        click: (e) => {
          const removeTargets = document.querySelectorAll('.' + whitePopupClassName);
          for (let dom of removeTargets) {
            dom.remove();
          }
        }
      },
      class: [ whitePopupClassName ],
      style: {
        position: "fixed",
        top: String(0),
        left: String(0),
        width: withOut(0),
        height: withOut(0),
        opacity: String(0.3),
        background: colorChip.black,
        zIndex: String(zIndex),
      }
    });

    whiteBase = createNode({
      mother: totalContents,
      class: [ whitePopupClassName ],
      style: {
        position: "fixed",
        width: String(whiteWidth) + ea,
        height: "calc(calc(100% - " + String(naviHeight) + "px" + ") - " + String((whiteMargin * 2) + innerMargin) + ea + ")",
        top: "calc(" + String(naviHeight) + "px" + " + " + String(whiteMargin) + ea + ")",
        left: "calc(50% - " + String(whiteWidth / 2) + ea + ")",
        borderRadius: String(5) + "px",
        background: colorChip.white,
        boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
        animation: "fadeuporiginal 0.3s ease forwards",
        paddingTop: String(innerMargin) + ea,
        zIndex: String(zIndex),
      }
    });

    contentsTong = createNode({
      mother: whiteBase,
      style: {
        display: "block",
        position: "relative",
        width: withOut(innerMargin * 2, ea),
        height: withOut(innerMargin, ea),
        marginLeft: String(innerMargin) + ea,
        marginRight: String(innerMargin) + ea,
      }
    });

    // title area

    titleArea = createNode({
      mother: contentsTong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: String(titleHeight) + ea,
        borderBottom: "1px solid " + colorChip.black,
      },
      children: [
        {
          text: project.name + " 고객님",
          style: {
            textAlign: "left",
            position: "absolute",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorChip.black,
            lineHeight: String(titleLineHeight),
            top: String(titleTop) + ea,
            left: String(0),
          }
        }
      ]
    });

    // contents area

    formArea = createNode({
      mother: contentsTong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0),
        height: withOut(titleHeight + paymentHeight + formPaddingTop, ea),
        paddingTop: String(formPaddingTop) + ea,
        overflow: "scroll",
      }
    });

    formBox = createNode({
      mother: formArea,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0),
        paddingBottom: String(formPaddingTop) + ea,
      }
    });

    // arrow area

    grayTong = createNode({
      mother: formBox,
      style: {
        display: "block",
        padding: String(grayInnerPadding) + ea,
        paddingBottom: String(desktop ? grayInnerPadding : grayInnerPadding - mobileArrowMarginBottom) + ea,
        paddingRight: String(grayInnerPaddingRight) + ea,
        width: withOut(grayInnerPadding + grayInnerPaddingRight, ea),
        borderRadius: String(5) + "px",
        background: colorChip.gray2,
      }
    });

    for (let i = 0; i < titleTargets.length; i++) {
      createNode({
        mother: grayTong,
        class: [ processTargetsClassName ],
        attribute: {
          index: String(i),
        },
        event: {
          click: function (e) {
            const self = this;
            const index = Number(this.getAttribute("index"));
            const targets = document.querySelectorAll('.' + processTargetsClassName);

            for (let dom of targets) {
              if (dom === self) {
                if (index === thisStatusNumber) {
                  dom.querySelector("path").setAttribute("fill", colorChip.green);
                  dom.children[1].style.color = colorChip.white;
                } else {
                  dom.querySelector("path").setAttribute("fill", colorChip.yellow);
                  dom.children[1].style.color = colorChip.white;
                }
              } else {
                if (thisStatusNumber === Number(dom.getAttribute("index"))) {
                  dom.querySelector("path").setAttribute("fill", colorChip.whiteGreen);
                  dom.children[1].style.color = colorChip.white;
                } else {
                  dom.querySelector("path").setAttribute("fill", colorChip.white);
                  if (index === thisStatusNumber) {
                    dom.children[1].style.color = colorChip.black;
                  } else {
                    dom.children[1].style.color = colorChip.deactive;
                  }
                }
              }
            }

            setDescription(index);
            setButtons(index);
          }
        },
        style: {
          display: "inline-flex",
          position: "relative",
          height: String(arrowHeight) + ea,
          width: "calc(calc(100% - " + String(arrowBetween * divideNumber) + ea + ") / " + String(divideNumber) + ")",
          marginRight: String(arrowBetween) + ea,
          marginBottom: desktop ? String(i / divideNumber < 1 ? grayCenterMargin : 0) + ea : String(mobileArrowMarginBottom) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          verticalAlign: "top",
        },
        children: [
          {
            mode: "svg",
            source: svgMaker.processArrow(arrowWidth, arrowHeight, (i === thisStatusNumber ? colorChip.green : colorChip.white)),
            style: {
              position: "absolute",
              top: String(0),
              left: String(0),
              width: String(arrowWidth) + ea,
              height: String(arrowHeight) + ea,
              transition: "all 0.2s ease",
            }
          },
          {
            text: titleTargets[i].title,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(textTop) + ea,
              fontSize: String(textSize) + ea,
              fontWeight: String(textWeight),
              color: i === thisStatusNumber ? colorChip.white : colorChip.black,
              marginLeft: String(textMarginLeft) + ea,
              transition: "all 0.2s ease",
            }
          }
        ]
      });
    }

    if (mobile) {
      createNode({
        mother: grayTong,
        style: {
          display: "inline-flex",
          position: "relative",
          height: String(arrowHeight) + ea,
          width: "calc(calc(100% - " + String(arrowBetween * divideNumber) + ea + ") / " + String(divideNumber) + ")",
          marginRight: String(arrowBetween) + ea,
          marginBottom: String(mobileArrowMarginBottom) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          verticalAlign: "top",
        },
        children: [
          {
            mode: "svg",
            source: svgMaker.processArrow(arrowWidth, arrowHeight, colorChip.gray0),
            style: {
              position: "absolute",
              top: String(0),
              left: String(0),
              width: String(arrowWidth) + ea,
              height: String(arrowHeight) + ea,
              transition: "all 0.2s ease",
            }
          },
        ]
      });
    }


    // calendar area

    grayCalendarTong = createNode({
      mother: formBox,
      style: {
        display: "block",
        width: withOut(0, ea),
        borderRadius: String(5) + "px",
        marginTop: String(grayDescriptionTongMarginTop) + ea,
      }
    });

    colorCalendar(grayCalendarTong, dateArr, { smallMode: true });

    // description area

    grayDescriptionTong = createNode({
      mother: formBox,
      style: {
        display: "block",
        padding: String(grayInnerPadding) + ea,
        width: withOut(grayInnerPadding * 2, ea),
        borderRadius: String(5) + "px",
        background: colorChip.gray2,
        marginTop: String(grayDescriptionTongMarginTop) + ea,
      }
    });

    grayWhiteBase = createNode({
      mother: grayDescriptionTong,
      style: {
        display: "block",
        width: withOut(0, ea),
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 5px 15px -9px " + colorChip.shadow,
        paddingTop: String(grayInnerPadding) + ea,
        paddingBottom: String(desktop ? grayInnerPadding : mobileInnerPaddingBottom) + ea,
      }
    });

    setDescription = (thisStatusNumber) => {
      cleanChildren(grayWhiteBase);
      createNode({
        mother: grayWhiteBase,
        text: titleTargets[thisStatusNumber].title,
        style: {
          display: "block",
          position: "relative",
          fontSize: String(grayDescriptionTitleSize) + ea,
          fontWeight: String(grayDescriptionTitleWeight),
          color: colorChip.black,
          marginLeft: String(grayInnerPadding) + ea,
          marginBottom: String(grayDescriptionTitleMarginBottom) + ea,
        },
      });

      if (serviceContents[thisStatusNumber] !== undefined) {
        num = 0;
        for (let { title, children } of serviceContents[thisStatusNumber].checklist) {
          num2 = 0;
          for (let { title: str, contents } of children) {
            createNode({
              mother: grayWhiteBase,
              style: {
                display: "block",
                position: "relative",
                marginBottom: String(num2 === children.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
                marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(5) + ea),
                marginLeft: String(grayInnerPadding) + ea,
                width: withOut(grayInnerPadding * 2, ea),
              },
              children: [
                {
                  text: (num2 === 0 ? String(num + 1) : ""),
                  style: {
                    display: desktop ? "inline-block" : "none",
                    fontSize: String(contentsWordingSize) + ea,
                    fontWeight: String(600),
                    verticalAlign: "top",
                    lineHeight: String(1.6),
                    width: String(zeroWidth) + ea,
                    marginRight: String(zeroMarginRight) + ea,
                    textAlign: "right",
                    color: colorChip.green,
                  }
                },
                {
                  style: {
                    display: desktop ? "inline-block" : "block",
                    position: "relative",
                    verticalAlign: "top",
                    width: desktop ? String(firstWidth) + ea : String(100) + '%',
                    marginBottom: desktop ? "" : String(1) + ea,
                  },
                  children: [
                    {
                      style: {
                        display: num2 === 0 ? "block" : "none",
                        position: "absolute",
                        top: String(0),
                        left: String(0),
                        height: String(lineTop) + ea,
                        width: withOut(0),
                        borderBottom: desktop ? "1px solid " + colorChip.gray3 : "",
                      }
                    },
                    {
                      text: (num2 === 0 ? (desktop ? title : "<b%" + String(num + 1) + "%b>" + blank + title) : ""),
                      style: {
                        display: desktop ? "inline-block" : "block",
                        position: "relative",
                        fontSize: String(contentsWordingSize) + ea,
                        fontWeight: String(700),
                        lineHeight: String(1.6),
                        color: colorChip.black,
                        textAlign: "left",
                        background: colorChip.white,
                        paddingRight: String(linePadding) + ea,
                      },
                      bold: {
                        fontSize: String(contentsWordingSize) + ea,
                        fontWeight: String(700),
                        color: colorChip.green,
                      },
                    }
                  ]
                },
                {
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(contentsWordingSize) + ea,
                    fontWeight: String(600),
                    verticalAlign: "top",
                    lineHeight: String(1.6),
                    width: String(secondWidth) + ea,
                    marginRight: String(secondMarginRight) + ea,
                    textAlign: desktop ? "right" : "left",
                    color: colorChip.green,
                  },
                },
                {
                  text: "<u%" + str + ":%u>&nbsp;&nbsp;&nbsp;" + contents,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                    fontWeight: String(400),
                    verticalAlign: "top",
                    lineHeight: String(1.6),
                    paddingLeft: String(checkBoxAreaWidth) + ea,
                    width: withOut(desktop ? zeroWidth + zeroMarginRight + firstWidth + secondWidth + secondMarginRight + checkBoxAreaWidth : secondWidth + secondMarginRight + checkBoxAreaWidth, ea),
                    textAlign: "left",
                    color: colorChip.black,
                  },
                  bold: {
                    fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                    fontWeight: String(600),
                    color: colorChip.green,
                  },
                  under: {
                    fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                    fontWeight: String(700),
                    color: colorChip.black,
                  },
                  children: [
                    {
                      mode: "svg",
                      source: instance.mother.returnCheckBox(colorChip.green),
                      style: {
                        top: String(checkBoxTop) + ea,
                        left: String(0),
                        position: "absolute",
                        width: String(checkBoxWidth) + ea,
                      }
                    }
                  ]
                },
              ]
            });

            num2++;
          }
          num++;
        }

      }

    };
    setDescription(thisStatusNumber);

    // button area

    paymentArea = createNode({
      mother: contentsTong,
      style: {
        display: "flex",
        flexDirection: "row",
        position: "relative",
        width: withOut(0, ea),
        height: String(paymentHeight) + ea,
        borderTop: "1px dashed " + colorChip.gray4,
        textAlign: "right",
        alignItems: "center",
        justifyContent: desktop ? "end" : "center",
      }
    });

    setButtons = (thisStatusNumber) => {
      buttonList = [
        {
          name: "상태 변경",
          event: function () {
            return function (e) {
              const targetMother = this.parentElement.parentElement.parentElement;
              let cancelBack, whitePrompt;

              cancelBack = createNode({
                mother: targetMother,
                event: {
                  click: function (e) {
                    targetMother.removeChild(targetMother.lastChild);
                    targetMother.removeChild(targetMother.lastChild);
                  }
                },
                style: {
                  position: "fixed",
                  top: String(0),
                  left: String(0),
                  width: withOut(0),
                  height: withOut(0),
                  background: colorChip.black,
                  opacity: String(0.2),
                }
              });

              whitePrompt = createNode({
                mother: targetMother,
                style: {
                  position: "absolute",
                  top: withOut(50, (((statusButtonHeight * 4) + (statusButtonBetween * 3) + (grayInnerPadding * 2)) / 2), ea),
                  left: withOut(50, (((statusButtonWidth * 2) + statusButtonBetween + (grayInnerPadding * 2)) / 2), ea),
                  width: String((statusButtonWidth * 2) + statusButtonBetween) + ea,
                  height: String((statusButtonHeight * 4) + (statusButtonBetween * 4)) + ea,
                  background: colorChip.gray2,
                  borderRadius: String(5) + "px",
                  boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                  animation: "fadeuplite 0.3s ease forwards",
                  padding: String(grayInnerPadding) + ea,
                  paddingBottom: String(grayInnerPadding - statusButtonBetween) + ea,
                },
                children: [
                  {
                    style: {
                      display: "block",
                      top: String(0),
                      left: String(0),
                      width: withOut(0),
                      height: withOut(0),
                      position: "relative",
                    }
                  }
                ]
              });

              for (let i = 0; i < titleTargets.length; i++) {
                createNode({
                  mother: whitePrompt.firstChild,
                  attribute: { index: String(i) },
                  event: {
                    click: async function (e) {
                      try {
                        const index = Number(this.getAttribute("index"));
                        if (serviceContents[index] !== undefined) {
                          let value;
                          let whereQuery, updateQuery;

                          value = serviceContents[index].target[0];

                          whereQuery = { proid: project.proid };
                          updateQuery = {};
                          updateQuery["process.action"] = value;

                          if (window.confirm("업데이트를 진행하시겠습니까?")) {
                            await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateProject");
                            await ajaxJson({ message: instance.designer.designer + " 실장님이 콘솔을 통해 " + project.name + " 고객님 상태를 변경했습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");

                            window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + instance.designer.desid + "&proid=" + project.proid;
                          }

                        } else {
                          window.alert("프로젝트 완료는 홈리에종에 직접 문의해주세요!");
                        }
                      } catch (e) {
                        console.log(e);
                        window.location.reload();
                      }
                    }
                  },
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    width: String(statusButtonWidth) + ea,
                    height: String(statusButtonHeight) + ea,
                    background: colorChip.white,
                    borderRadius: String(5) + "px",
                    boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                    marginRight: String(i % 2 === 0 ? statusButtonBetween : 0) + ea,
                    marginBottom: String(statusButtonBetween) + ea,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                  },
                  children: [
                    {
                      text: titleTargets[i].title,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        top: String(statusTextTop) + ea,
                        fontSize: String(statusSize) + ea,
                        fontWeight: String(statusBetween),
                        color: colorChip.black,
                      }
                    }
                  ]
                });
              }

            }
          }
        }
      ];

      if (thisStatusNumber === 1) {
        buttonList.push({
          name: "일정 안내 문서 전송",
          event: function () {
            return async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                const name = this.getAttribute("name");
                const designer = this.getAttribute("designer");
                let input, removeTargets;

                removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                for (let dom of removeTargets) {
                  dom.remove();
                }

                input = createNode({
                  mother: document.body,
                  class: [ fileInputClassName ],
                  mode: "input",
                  event: {
                    change: async function (e) {
                      try {
                        const proid = this.getAttribute("proid");
                        const desid = this.getAttribute("desid");
                        const client = this.getAttribute("client");
                        const designer = this.getAttribute("designer");
                        let thisFiles, formData, res;
                        let removeTargets;
                        let loading;

                        thisFiles = [ ...this.files ];

                        if (thisFiles.length >= 1) {
                          formData = new FormData();
                          formData.enctype = "multipart/form-data";
                          formData.append("proid", proid);
                          formData.append("desid", desid);
                          formData.append("client", client);
                          for (let i = 0; i < thisFiles.length; i++) {
                            formData.append("file_" + serviceContents[1].key + "_" + String(i), thisFiles[i]);
                          }

                          loading = instance.mother.grayLoading();

                          res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                          await ajaxJson({ message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 현장의 일정 안내 파일을 업로드 했습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                          window.alert("업로드가 완료되었습니다!");

                          loading.remove();

                          removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                          for (let dom of removeTargets) {
                            dom.remove();
                          }

                        }

                      } catch (e) {
                        console.log(e);
                        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                        window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + instance.designer.desid + "&proid=" + project.proid;
                      }
                    }
                  },
                  attribute: {
                    type: "file",
                    name: serviceContents[1].key,
                    multiple: "true",
                    proid,
                    desid,
                    client: name,
                    designer,
                  },
                  style: {
                    display: "none",
                  }
                });

                input.click();

              } catch (e) {
                console.log(e);
                window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + instance.designer.desid + "&proid=" + project.proid;
              }
            }
          }
        });
      } else if (thisStatusNumber === 2) {
        buttonList.push({
          name: "1차 제안 문서 전송",
          event: function () {
            return async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                const name = this.getAttribute("name");
                const designer = this.getAttribute("designer");
                let input, removeTargets;

                removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                for (let dom of removeTargets) {
                  dom.remove();
                }

                input = createNode({
                  mother: document.body,
                  class: [ fileInputClassName ],
                  mode: "input",
                  event: {
                    change: async function (e) {
                      try {
                        const proid = this.getAttribute("proid");
                        const desid = this.getAttribute("desid");
                        const client = this.getAttribute("client");
                        const designer = this.getAttribute("designer");
                        let thisFiles, formData, res;
                        let removeTargets;
                        let loading;

                        thisFiles = [ ...this.files ];

                        if (thisFiles.length >= 1) {
                          formData = new FormData();
                          formData.enctype = "multipart/form-data";
                          formData.append("proid", proid);
                          formData.append("desid", desid);
                          formData.append("client", client);
                          for (let i = 0; i < thisFiles.length; i++) {
                            formData.append("file_" + serviceContents[2].key + "_" + String(i), thisFiles[i]);
                          }

                          loading = instance.mother.grayLoading();

                          res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                          await ajaxJson({ message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 현장의 1차 제안서 파일을 업로드 했습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                          window.alert("업로드가 완료되었습니다!");

                          loading.remove();

                          removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                          for (let dom of removeTargets) {
                            dom.remove();
                          }

                        }

                      } catch (e) {
                        console.log(e);
                        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                        window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + instance.designer.desid + "&proid=" + project.proid;
                      }
                    }
                  },
                  attribute: {
                    type: "file",
                    name: serviceContents[2].key,
                    multiple: "true",
                    proid,
                    desid,
                    client: name,
                    designer,
                  },
                  style: {
                    display: "none",
                  }
                });

                input.click();

              } catch (e) {
                console.log(e);
                window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + instance.designer.desid + "&proid=" + project.proid;
              }
            }
          }
        });
      } else if (thisStatusNumber === 3) {
        buttonList.push({
          name: "수정 제안 문서 전송",
          event: function () {
            return async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                const name = this.getAttribute("name");
                const designer = this.getAttribute("designer");
                let input, removeTargets;
                let loading;

                removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                for (let dom of removeTargets) {
                  dom.remove();
                }

                input = createNode({
                  mother: document.body,
                  class: [ fileInputClassName ],
                  mode: "input",
                  event: {
                    change: async function (e) {
                      try {
                        const proid = this.getAttribute("proid");
                        const desid = this.getAttribute("desid");
                        const client = this.getAttribute("client");
                        const designer = this.getAttribute("designer");
                        let thisFiles, formData, res;
                        let removeTargets;

                        thisFiles = [ ...this.files ];

                        if (thisFiles.length >= 1) {
                          formData = new FormData();
                          formData.enctype = "multipart/form-data";
                          formData.append("proid", proid);
                          formData.append("desid", desid);
                          formData.append("client", client);
                          for (let i = 0; i < thisFiles.length; i++) {
                            formData.append("file_" + serviceContents[3].key + "_" + String(i), thisFiles[i]);
                          }

                          loading = instance.mother.grayLoading();

                          res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                          await ajaxJson({ message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 현장의 수정 제안서 파일을 업로드 했습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                          window.alert("업로드가 완료되었습니다!");

                          loading.remove();

                          removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                          for (let dom of removeTargets) {
                            dom.remove();
                          }

                        }

                      } catch (e) {
                        console.log(e);
                        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                        window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + instance.designer.desid + "&proid=" + project.proid;
                      }
                    }
                  },
                  attribute: {
                    type: "file",
                    name: serviceContents[3].key,
                    multiple: "true",
                    proid,
                    desid,
                    client: name,
                    designer,
                  },
                  style: {
                    display: "none",
                  }
                });

                input.click();

              } catch (e) {
                console.log(e);
                window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + instance.designer.desid + "&proid=" + project.proid;
              }
            }
          }
        });
      } else if (thisStatusNumber === 4) {
        buttonList.push({
          name: "시공 의뢰서 전송",
          event: function () {
            return async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                const name = this.getAttribute("name");
                const designer = this.getAttribute("designer");
                let input, removeTargets;
                let loading;

                removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                for (let dom of removeTargets) {
                  dom.remove();
                }

                input = createNode({
                  mother: document.body,
                  class: [ fileInputClassName ],
                  mode: "input",
                  event: {
                    change: async function (e) {
                      try {
                        const proid = this.getAttribute("proid");
                        const desid = this.getAttribute("desid");
                        const client = this.getAttribute("client");
                        const designer = this.getAttribute("designer");
                        let thisFiles, formData, res;
                        let removeTargets;

                        thisFiles = [ ...this.files ];

                        if (thisFiles.length >= 1) {
                          formData = new FormData();
                          formData.enctype = "multipart/form-data";
                          formData.append("proid", proid);
                          formData.append("desid", desid);
                          formData.append("client", client);
                          for (let i = 0; i < thisFiles.length; i++) {
                            formData.append("file_" + serviceContents[4].key + "_" + String(i), thisFiles[i]);
                          }

                          loading = instance.mother.grayLoading();

                          res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                          await ajaxJson({ message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 현장의 시공 의뢰서를 업로드 했습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                          window.alert("업로드가 완료되었습니다!");

                          loading.remove();

                          removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                          for (let dom of removeTargets) {
                            dom.remove();
                          }

                        }

                      } catch (e) {
                        console.log(e);
                        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                        window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + instance.designer.desid + "&proid=" + project.proid;
                      }
                    }
                  },
                  attribute: {
                    type: "file",
                    name: serviceContents[4].key,
                    multiple: "true",
                    proid,
                    desid,
                    client: name,
                    designer,
                  },
                  style: {
                    display: "none",
                  }
                });

                input.click();

              } catch (e) {
                console.log(e);
                window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + instance.designer.desid + "&proid=" + project.proid;
              }
            }
          }
        });
      } else if (thisStatusNumber === 5) {
        buttonList.push({
          name: "제품 리스트 전송",
          event: function () {
            return async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                const name = this.getAttribute("name");
                const designer = this.getAttribute("designer");
                let input, removeTargets;
                let loading;

                removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                for (let dom of removeTargets) {
                  dom.remove();
                }

                input = createNode({
                  mother: document.body,
                  class: [ fileInputClassName ],
                  mode: "input",
                  event: {
                    change: async function (e) {
                      try {
                        const proid = this.getAttribute("proid");
                        const desid = this.getAttribute("desid");
                        const client = this.getAttribute("client");
                        const designer = this.getAttribute("designer");
                        let thisFiles, formData, res;
                        let removeTargets;

                        thisFiles = [ ...this.files ];

                        if (thisFiles.length >= 1) {
                          formData = new FormData();
                          formData.enctype = "multipart/form-data";
                          formData.append("proid", proid);
                          formData.append("desid", desid);
                          formData.append("client", client);
                          for (let i = 0; i < thisFiles.length; i++) {
                            formData.append("file_" + serviceContents[5].key + "_" + String(i), thisFiles[i]);
                          }

                          loading = instance.mother.grayLoading();

                          res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                          await ajaxJson({ message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 현장의 제품 리스트를 업로드 했습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                          window.alert("업로드가 완료되었습니다!");

                          loading.remove();

                          removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                          for (let dom of removeTargets) {
                            dom.remove();
                          }

                        }

                      } catch (e) {
                        console.log(e);
                        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                        window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + instance.designer.desid + "&proid=" + project.proid;
                      }
                    }
                  },
                  attribute: {
                    type: "file",
                    name: serviceContents[5].key,
                    multiple: "true",
                    proid,
                    desid,
                    client: name,
                    designer,
                  },
                  style: {
                    display: "none",
                  }
                });

                input.click();

              } catch (e) {
                console.log(e);
                window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + instance.designer.desid + "&proid=" + project.proid;
              }
            }
          }
        });
      } else if (thisStatusNumber === 6) {
        buttonList.push({
          name: "촬영 여부",
          event: function () {
            return function (e) {
              const designer = this.getAttribute("designer");
              const desid = this.getAttribute("desid");
              const client = this.getAttribute("client");
              const proid = this.getAttribute("proid");
              const targetMother = this.parentElement.parentElement.parentElement;
              let photoTargets, cancelBack, whitePrompt;

              cancelBack = {};
              whitePrompt = {};

              photoTargets = [
                {
                  title: "촬영 요청",
                  event: async function (e) {
                    try {
                      const designer = this.getAttribute("designer");
                      const desid = this.getAttribute("desid");
                      const client = this.getAttribute("client");
                      const proid = this.getAttribute("proid");

                      await ajaxJson({ message: designer + " 실장님이 " + project.name + " 고객님 현장 촬영을 하고 싶다고 의사 표현하셨습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                      window.alert("홈리에종에 촬영 진행 의견을 전달하였습니다!");
                      cancelBack.click();

                    } catch (e) {
                      console.log(e);
                    }
                  }
                },
                {
                  title: "촬영 미진행",
                  event: async function (e) {
                    try {
                      const designer = this.getAttribute("designer");
                      const desid = this.getAttribute("desid");
                      const client = this.getAttribute("client");
                      const proid = this.getAttribute("proid");

                      await ajaxJson({ message: designer + " 실장님이 " + project.name + " 고객님 현장 촬영을 진행을 하고 싶지 않아 하십니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                      window.alert("홈리에종에 촬영 미진행 의견을 전달하였습니다!");
                      cancelBack.click();

                    } catch (e) {
                      console.log(e);
                    }
                  }
                },
                {
                  title: "촬영비 결제",
                  event: async function (e) {
                    try {
                      const designer = this.getAttribute("designer");
                      const desid = this.getAttribute("desid");
                      const client = this.getAttribute("client");
                      const proid = this.getAttribute("proid");
                      const { pluginScript, oidConst } = await ajaxJson({ mode: "script", oidKey: "mini" }, BACKHOST + "/generalImpPayment");
                      let plugin, oid;

                      oid = oidConst + instance.designer.information.phone.replace(/[^0-9]/gi, '') + "_" + String((new Date()).valueOf());

                      plugin = new Function(pluginScript);
                      plugin();
                      window.IMP.init("imp71921105");

                      if (desktop) {

                        window.IMP.request_pay({
                            pg: "inicis",
                            pay_method: "card",
                            merchant_uid: oid,
                            name: "현장 촬영비",
                            amount: Math.floor(165000),
                            buyer_email: instance.designer.information.email,
                            buyer_name: instance.designer.designer,
                            buyer_tel: instance.designer.information.phone,
                        }, async (rsp) => {
                          try {
                            if (typeof rsp.status === "string" && /paid/gi.test(rsp.status)) {
                              await ajaxJson({ message: designer + " 실장님이 " + project.name + " 고객님 현장 촬영의 촬영비를 결제하셨습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                              window.alert("결제가 완료되었습니다!");
                              cancelBack.click();
                            } else {
                              window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
                              window.location.reload();
                            }
                          } catch (e) {
                            window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
                            window.location.reload();
                          }
                        });

                      } else {

                        const { key } = await ajaxJson({ mode: "store", oid, data: { designer, desid, client, proid, oid } }, BACKHOST + "/generalImpPayment");
                        window.IMP.request_pay({
                            pg: "inicis",
                            pay_method: "card",
                            merchant_uid: oid,
                            name: "현장 촬영비",
                            amount: Math.floor(165000),
                            buyer_email: instance.designer.information.email,
                            buyer_name: instance.designer.designer,
                            buyer_tel: instance.designer.information.phone,
                            m_redirect_url: window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + desid + "&mobilecard=" + key,
                        }, (rsp) => {});

                      }

                    } catch (e) {
                      console.log(e);
                    }
                  }
                }
              ];

              cancelBack = createNode({
                mother: targetMother,
                event: {
                  click: function (e) {
                    targetMother.removeChild(targetMother.lastChild);
                    targetMother.removeChild(targetMother.lastChild);
                  }
                },
                style: {
                  position: "fixed",
                  top: String(0),
                  left: String(0),
                  width: withOut(0),
                  height: withOut(0),
                  background: colorChip.black,
                  opacity: String(0.2),
                }
              });

              whitePrompt = createNode({
                mother: targetMother,
                style: {
                  position: "absolute",
                  top: withOut(50, (((statusButtonHeight * 3) + (statusButtonBetween * 2) + (grayInnerPadding * 2)) / 2), ea),
                  left: withOut(50, (((statusButtonWidth * 1) + (grayInnerPadding * 2)) / 2), ea),
                  width: String((statusButtonWidth * 1)) + ea,
                  height: String((statusButtonHeight * 3) + (statusButtonBetween * 3)) + ea,
                  background: colorChip.gray2,
                  borderRadius: String(5) + "px",
                  boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                  animation: "fadeuplite 0.3s ease forwards",
                  padding: String(grayInnerPadding) + ea,
                  paddingBottom: String(grayInnerPadding - statusButtonBetween) + ea,
                },
                children: [
                  {
                    style: {
                      display: "block",
                      top: String(0),
                      left: String(0),
                      width: withOut(0),
                      height: withOut(0),
                      position: "relative",
                    }
                  }
                ]
              });

              for (let i = 0; i < photoTargets.length; i++) {
                createNode({
                  mother: whitePrompt.firstChild,
                  attribute: { index: String(i), designer, desid, client, proid },
                  event: {
                    click: photoTargets[i].event
                  },
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    width: String(statusButtonWidth) + ea,
                    height: String(statusButtonHeight) + ea,
                    background: colorChip.white,
                    borderRadius: String(5) + "px",
                    boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                    marginRight: String(i % 2 === 0 ? statusButtonBetween : 0) + ea,
                    marginBottom: String(statusButtonBetween) + ea,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                  },
                  children: [
                    {
                      text: photoTargets[i].title,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        top: String(statusTextTop) + ea,
                        fontSize: String(statusSize) + ea,
                        fontWeight: String(statusBetween),
                        color: colorChip.black,
                      }
                    }
                  ]
                });
              }

            }
          }
        });
      }

      cleanChildren(paymentArea);

      for (let i = 0; i < buttonList.length; i++) {
        createNode({
          mother: paymentArea,
          event: {
            click: buttonList[i].event(),
          },
          attribute: {
            proid: project.proid,
            desid: instance.designer.desid,
            name: project.name,
            designer: instance.designer.designer,
          },
          style: {
            display: "inline-flex",
            paddingLeft: String(buttonPadding) + ea,
            paddingRight: String(buttonPadding) + ea,
            height: String(buttonHeight) + ea,
            background: colorChip.gradientGreen,
            borderRadius: String(5) + "px",
            marginTop: String(buttonMarginTop) + ea,
            marginRight: i === buttonList.length - 1 ? "" : String(buttonBetween) + ea,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            cursor: "pointer",
          },
          children: [
            {
              text: buttonList[i].name,
              style: {
                display: "inline-block",
                position: "relative",
                top: String(buttonTextTop) + ea,
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
                color: colorChip.white,
              }
            }
          ]
        });
      }
    };
    setButtons(thisStatusNumber);

  }
}

DesignerBoardJs.prototype.insertProcessBox = function () {
  const instance = this;
  const mother = this.mother;
  const { clients, projects, requestNumber, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, selfHref, returnGet } = GeneralJs;
  const getObj = returnGet();
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft;
  let tong;
  let whiteBottomMargin;
  let grayTong;
  let grayMargin;
  let tongMargin;
  let grayPadding;
  let tongHeight;
  let whiteSize;
  let whiteWeight, whiteColumnWeight;
  let whiteBaseTong;
  let whiteTextTop;
  let contentsMap;
  let widthMap;
  let circleWidth, circleTop;
  let state;
  let boxTarget;
  let targets;
  let minimalLength;
  let forceWidth;
  let colorBoxHeight;
  let colorBoxPadding;
  let colorBoxSize, colorBoxWeight, colorBoxTextTop;
  let targetLength;
  let arrowHeight;
  let grayBetween;
  let whiteBaseTongDictionary;
  let setContents;
  let printSize;

  grayBetween = <%% 40, 40, 36, 36, 5 %%>;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 58, 56, 50, 44, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  printSize = <%% 14, 14, 13, 12, 2.5 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 1, isMac() ? 0 : 1, isMac() ? 0 : 1, isMac() ? 0 : 1, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 2.5 %%>;

  mobileTitleLeft = 6;

  grayMargin = <%% 12, 12, 10, 10, 2 %%>;
  grayPadding = <%% 14, 14, 10, 10, 2.5 %%>;

  tongMargin = <%% 2, 2, 2, 2, 1 %%>;

  tongHeight = <%% 50, 50, 42, 42, 15.64 %%>;

  whiteSize = <%% 15, 15, 13, 13, 3 %%>;
  whiteWeight = <%% 400, 400, 400, 400, 400 %%>;
  whiteColumnWeight = <%% 200, 200, 200, 200, 200 %%>;
  whiteTextTop = <%% (isMac() ? -1 : 2), (isMac() ? -1 : 2), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

  circleWidth = <%% 21, 21, 20, 20, 4 %%>;
  circleTop = <%% 20, 20, 17, 17, 3 %%>;
  circleRight = <%% 20, 20, 20, 20, 2.7 %%>;
  arrowHeight = <%% 8, 8, 8, 8, 1.5 %%>;

  minimalLength = <%% 3, 3, 3, 3, 3 %%>;

  colorBoxHeight = <%% 26, 26, 24, 24, 5.5 %%>;
  colorBoxPadding = <%% 10, 10, 8, 8, 2.2 %%>;
  colorBoxSize = <%% 11, 11, 10, 10, 2.5 %%>;
  colorBoxWeight = <%% 700, 700, 700, 700, 700 %%>;
  colorBoxTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isIphone() ? 0 : -0.2) %%>;

  this.whiteMargin = (desktop ? margin : 0);

  contentsMap = (project, index) => {
    let map;

    if (big) {
      map = [
        project.process.action,
        serviceParsing(project.service).replace(/[a-zA-Z]/gi, '').trim().split(' ').slice(1).join(' '),
        project.name,
        "<b%시작일 : %b>" + dateToString(project.process.contract.form.date.from, false).slice(2),
        "<b%종료일 : %b>" + dateToString(project.process.contract.form.date.to, false).slice(2),
        "<b%선금 정산 : %b>" + (/없음/gi.test(dateToString(project.process.calculation.payments.first.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.first.date, false).slice(2)),
        "<b%잔금 정산 : %b>" + (/없음/gi.test(dateToString(project.process.calculation.payments.remain.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.remain.date, false).slice(2)),
      ];
    } else {
      if (desktop) {
        map = [
          project.process.action,
          serviceParsing(project.service).replace(/[a-zA-Z]/gi, '').trim().split(' ').slice(1).join(' '),
          project.name,
          "<b%시작일 : %b>" + dateToString(project.process.contract.form.date.from, false).slice(2),
          "<b%종료일 : %b>" + dateToString(project.process.contract.form.date.to, false).slice(2),
          "<b%선금 : %b>" + (/없음/gi.test(dateToString(project.process.calculation.payments.first.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.first.date, false).slice(2)),
        ];
      } else {
        map = [
          project.name + " <b%고객님%b>",
          project.process.action,
          serviceParsing(project.service).replace(/[a-zA-Z]/gi, '').trim().split(' ').slice(1).join(' '),
          "선금 : " + (/없음/gi.test(dateToString(project.process.calculation.payments.first.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.first.date, false).slice(2)),
        ];
      }
    }
    return map[index];
  }

  if (desktop) {
    widthMap = <&&
      [ 86, 102, 73, 150, 150, 170, 150 ] |
      [ 86, 100, 62, 140, 140, 160, 140 ] |
      [ 80, 91, 54, 116, 116, 132, 116 ] |
      [ 78, 88, 54, 116, 116, 116 ] |
      [ 6, 11, 12, 7, 14, 15, 15 ]
    &&>;

    boxTarget = [
      (state) => { return (state <= 1 ? colorChip.red : colorChip.deactive) },
      (state) => { return (state <= 1 ? colorChip.yellow : colorChip.deactive) },
      null,
      null,
      null,
      null,
      null,
    ];

    forceWidth = [
      (<&& 62 | 62 | 60 | 58 | 6 &&>),
      (<&& 62 | 62 | 60 | 58 | 6 &&>),
      null,
      null,
      null,
      null,
      null,
    ];
  } else {
    widthMap = [ 6, 11, 12, 7 ];

    boxTarget = [
      null,
      (state) => { return colorChip.red },
      (state) => { return colorChip.yellow },
      (state) => { return colorChip.shadow },
    ];

    forceWidth = [
      null,
      null,
      null,
      null,
    ];
  }

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(whiteBottomMargin) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  setContents = (total = false) => {
    cleanChildren(whiteTong);

    block = createNode({
      mother: whiteTong,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        marginBottom: String(grayBetween) + ea,
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0),
            marginBottom: String(titleBottom) + ea,
            zIndex: mobile ? String(1) : "",
          },
          children: [
            {
              text: "진행중 프로젝트" + (!total ? "&nbsp;&nbsp;<b%모두 보기%b>" : "&nbsp;&nbsp;<b%일부만 보기%b>"),
              event: {
                click: function (e) {
                  setContents(/모두/gi.test(this.textContent));
                },
                selectstart: (e) => {
                  e.preventDefault();
                }
              },
              style: {
                position: "relative",
                display: "inline-block",
                top: String(titleTopNumber) + ea,
                fontSize: String(titleFontSize) + ea,
                fontWeight: String(600),
                background: colorChip.white,
                paddingRight: String(numberRight) + ea,
                color: colorChip.black,
              },
              bold: {
                background: colorChip.white,
                color: colorChip.green,
                fontSize: String(printSize) + ea,
                fontWeight: String(300),
                cursor: "pointer",
              }
            },
          ]
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: String(100) + '%',
            overflow: "hidden",
            marginBottom: String(0) + ea,
          }
        },
      ]
    });
    tong = block.lastChild;

    grayTong = createNode({
      mother: tong,
      style: {
        display: "block",
        background: colorChip.gray3,
        borderRadius: String(5) + "px",
        paddingTop: String(grayMargin) + ea,
        paddingBottom: String(grayMargin - tongMargin) + ea,
      }
    });

    targets = equalJson(JSON.stringify(projects));
    targets.sort((a, b) => {
      return b.process.contract.form.date.from.valueOf() - a.process.contract.form.date.from.valueOf();
    });
    targetLength = targets.length;
    if (targetLength < minimalLength) {
      for (let i = 0; i < minimalLength - targetLength; i++) {
        targets.push(null);
      }
    }

    if (!total) {
      if (targets.length > 10) {
        targets = targets.slice(0, 10);
      }
    }

    whiteBaseTongDictionary = {};
    for (let i = 0; i < targets.length; i++) {

      if (targets[i] !== null) {
        state = 0;
        if (/드[랍롭]/gi.test(targets[i].process.status) || /홀[드딩]/gi.test(targets[i].process.status)) {
          state = 3;
        } else if (/완료/gi.test(targets[i].process.status)) {
          state = 2;
        }

        whiteBaseTong = createNode({
          mother: grayTong,
          attribute: {
            proid: targets[i].proid
          },
          event: {
            click: function (e) {
              const proid = this.getAttribute("proid");
              selfHref(FRONTHOST + "/designer/process.php?proid=" + proid);
            },
            contextmenu: function (e) {
              e.preventDefault();
              const proid = this.getAttribute("proid");
              instance.projectPopup(proid).call(this, e);
            }
          },
          style: {
            display: desktop ? "inline-flex" : "block",
            position: "relative",
            marginLeft: String(grayMargin) + ea,
            width: withOut((grayMargin * 2) + (grayPadding * 2), ea),
            paddingLeft: String(grayPadding) + ea,
            paddingRight: String(grayPadding) + ea,
            height: desktop ? String(tongHeight) + ea : "",
            borderRadius: String(5) + "px",
            background: state >= 2 ? (state === 3 ? colorChip.gray4 : colorChip.gray1) : colorChip.white,
            marginBottom: String(tongMargin) + ea,
            alignItems: "center",
            flexDirection: "row",
            cursor: "pointer",
            paddingTop: desktop ? "" : String(grayPadding) + ea,
            paddingBottom: desktop ? "" : String(grayPadding - 0.8) + ea,
          },
        });
        for (let j = 0; j < widthMap.length; j++) {

          if (boxTarget[j] === null) {

            createNode({
              mother: whiteBaseTong,
              text: contentsMap(targets[i], j),
              style: {
                display: desktop ? "inline-block" : "block",
                position: "relative",
                fontSize: String(whiteSize) + ea,
                fontWeight: String(mobile || j === 2 ? 700 : whiteWeight),
                top: String(whiteTextTop) + ea,
                color: state >= 2 ? colorChip.deactive : colorChip.black,
                width: desktop ? String(widthMap[j]) + ea : "",
                marginRight: desktop ? "" : String(1) + ea,
                marginBottom: desktop ? "" : String(1) + ea,
                paddingLeft: desktop ? "" : String(0.4) + ea,
                paddingTop: desktop ? "" : String(0.2) + ea,
              },
              bold: {
                fontWeight: String(whiteColumnWeight),
                color: j === 2 ? (state >= 2 ? colorChip.deactive : colorChip.black) : colorChip.deactive,
              }
            });

          } else {

            createNode({
              mother: whiteBaseTong,
              style: {
                display: "inline-flex",
                position: "relative",
                alignItems: "center",
                top: String(0),
                height: withOut(0),
                width: desktop ? String(widthMap[j]) + ea : "",
                marginRight: desktop ? "" : String(1) + ea,
                marginBottom: desktop ? "" : String(1) + ea,
              },
              children: [
                {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    alignItems: "center",
                    height: String(colorBoxHeight) + ea,
                    background: boxTarget[j](state),
                    borderRadius: String(5) + "px",
                    paddingLeft: String(colorBoxPadding) + ea,
                    paddingRight: String(colorBoxPadding) + ea,
                    width: desktop ? (forceWidth[j] === null ? "" : String(forceWidth[j]) + ea) : "",
                    justifyContent: "center",
                  },
                  children: [
                    {
                      text: contentsMap(targets[i], j),
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(colorBoxSize) + ea,
                        fontWeight: String(colorBoxWeight),
                        color: colorChip.white,
                        top: String(colorBoxTextTop) + ea,
                      }
                    }
                  ]
                }
              ]
            });

          }

        }

        createNode({
          mother: whiteBaseTong,
          mode: "svg",
          attribute: {
            proid: targets[i].proid
          },
          source: svgMaker.horizontalArrow(circleWidth, arrowHeight, (state === 0 ? colorChip.green : colorChip.deactive)),
          style: {
            position: "absolute",
            right: String(circleRight) + ea,
            top: String(circleTop) + ea,
            width: String(circleWidth) + ea,
            borderRadius: String(circleWidth) + ea,
            cursor: "pointer",
          }
        });

        whiteBaseTongDictionary[targets[i].proid] = whiteBaseTong;

      } else {

        whiteBaseTong = createNode({
          mother: grayTong,
          style: {
            display: "inline-flex",
            position: "relative",
            marginLeft: String(grayMargin) + ea,
            width: withOut((grayMargin * 2) + (grayPadding * 2), ea),
            paddingLeft: String(grayPadding) + ea,
            paddingRight: String(grayPadding) + ea,
            height: String(tongHeight) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gray1,
            marginBottom: String(tongMargin) + ea,
            alignItems: "center",
            flexDirection: "row",
            cursor: "pointer",
          },
        });

      }

    }

    if (typeof getObj.proid === "string") {
      if (targets.filter((project) => { return project !== null }).map((project) => { return project.proid }).includes(getObj.proid)) {
        whiteBaseTongDictionary[getObj.proid].click();
      }
    }

    instance.insertCommentsBox(whiteBlock);
    instance.insertforeContentsBox(whiteBlock);
  }

  setContents();

  return whiteBlock;
}

DesignerBoardJs.prototype.insertCommentsBox = function (whiteBlock) {
  const instance = this;
  const mother = this.mother;
  const { clients, projects, requestNumber, ea, baseTong, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const commentPopupClassName = "commentPopupClassName";
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, downloadFile, ajaxForm } = GeneralJs;
  let paddingTop;
  let block;
  let whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft;
  let tong;
  let whiteBottomMargin;
  let grayTong;
  let grayMargin;
  let tongMargin;
  let grayPadding;
  let tongHeight;
  let whiteSize;
  let whiteWeight, whiteColumnWeight;
  let whiteBaseTong;
  let whiteTextTop;
  let contentsMap;
  let widthMap;
  let circleWidth, circleTop;
  let state;
  let boxTarget;
  let targets;
  let minimalLength;
  let forceWidth;
  let colorBoxHeight;
  let colorBoxPadding;
  let colorBoxSize, colorBoxWeight, colorBoxTextTop;
  let targetLength;
  let arrowHeight;
  let grayBetween;
  let designerCommentsBoxEvent;
  let whitePromptWidth;
  let whitePromptPaddingTop;
  let whitePromptPaddingBottom;
  let whitePromptTitleHeight;
  let whitePromptButtonHeight;
  let whitePromptTitleSize;
  let whitePromptTitleWeight;
  let whitePromptTitleBoldWeight;
  let whitePromptTitleLineHeight;
  let whitePromptTitleTextTop;
  let whitePromptButtonBetween;
  let whitePromptButtonTextTop;
  let whitePromptButtonWidth;
  let whitePromptButtonSize;
  let whitePromptButtonWeight;

  grayBetween = <%% 40, 40, 36, 36, 5 %%>;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 58, 58, 58, 58, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 2.5 %%>;

  mobileTitleLeft = 6;

  grayMargin = <%% 12, 12, 10, 10, 2 %%>;
  grayPadding = <%% 14, 14, 10, 10, 2.5 %%>;

  tongMargin = <%% 2, 2, 2, 2, 1 %%>;

  tongHeight = <%% 50, 50, 42, 42, 15.64 %%>;

  whiteSize = <%% 15, 15, 13, 13, 3 %%>;
  whiteWeight = <%% 400, 400, 400, 400, 400 %%>;
  whiteColumnWeight = <%% 200, 200, 200, 200, 200 %%>;
  whiteTextTop = <%% (isMac() ? -1 : 2), (isMac() ? -1 : 2), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

  circleWidth = <%% 21, 21, 20, 20, 4 %%>;
  circleTop = <%% 20, 20, 17, 17, 3 %%>;
  circleRight = <%% 20, 20, 20, 20, 2.7 %%>;
  arrowHeight = <%% 8, 8, 8, 8, 1.5 %%>;

  minimalLength = <%% 3, 3, 3, 3, 3 %%>;

  colorBoxHeight = <%% 26, 26, 24, 24, 5.5 %%>;
  colorBoxPadding = <%% 10, 10, 8, 8, 2.2 %%>;
  colorBoxSize = <%% 11, 11, 10, 10, 2.5 %%>;
  colorBoxWeight = <%% 700, 700, 700, 700, 700 %%>;
  colorBoxTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isIphone() ? 0 : -0.2) %%>;

  whitePromptWidth = <%% 600, 600, 520, 450, 82 %%>;
  whitePromptPaddingTop = <%% 12, 12, 10, 8, 2 %%>;
  whitePromptPaddingBottom = <%% 40, 40, 36, 32, 5.6 %%>;
  whitePromptTitleHeight = <%% 110, 110, 100, 80, 16 %%>;
  whitePromptButtonHeight = <%% 35, 35, 32, 30, 6 %%>;

  whitePromptTitleSize = <%% 20, 20, 18, 16, 3.2 %%>;
  whitePromptTitleWeight = <%% 400, 400, 400, 400, 400 %%>;
  whitePromptTitleBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  whitePromptTitleLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  whitePromptTitleTextTop = <%% 0, 0, 0, 0, 0 %%>;

  whitePromptButtonBetween = <%% 6, 6, 5, 4, 1 %%>;
  whitePromptButtonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
  whitePromptButtonWidth = <%% 125, 125, 125, 115, 25 %%>;

  whitePromptButtonSize = <%% 13, 13, 12, 11, 2.5 %%>;
  whitePromptButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  contentsMap = (project, index) => {
    let map;

    if (big) {
      map = [
        "디자이너글",
        serviceParsing(project.service).replace(/[a-zA-Z]/gi, '').trim().split(' ').slice(1).join(' '),
        project.name,
        "<b%시작일 : %b>" + dateToString(project.process.contract.form.date.from, false).slice(2),
        "<b%종료일 : %b>" + dateToString(project.process.contract.form.date.to, false).slice(2),
        "<b%선금 정산 : %b>" + (/없음/gi.test(dateToString(project.process.calculation.payments.first.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.first.date, false).slice(2)),
        "<b%잔금 정산 : %b>" + (/없음/gi.test(dateToString(project.process.calculation.payments.remain.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.remain.date, false).slice(2)),
      ];
    } else {
      if (desktop) {
        map = [
          "디자이너글",
          serviceParsing(project.service).replace(/[a-zA-Z]/gi, '').trim().split(' ').slice(1).join(' '),
          project.name,
          "<b%시작일 : %b>" + dateToString(project.process.contract.form.date.from, false).slice(2),
          "<b%종료일 : %b>" + dateToString(project.process.contract.form.date.to, false).slice(2),
          "<b%선금 : %b>" + (/없음/gi.test(dateToString(project.process.calculation.payments.first.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.first.date, false).slice(2)),
        ];
      } else {
        map = [
          project.name + " <b%고객님%b>",
          "디자이너글",
          serviceParsing(project.service).replace(/[a-zA-Z]/gi, '').trim().split(' ').slice(1).join(' '),
          "선금 : " + (/없음/gi.test(dateToString(project.process.calculation.payments.first.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.first.date, false).slice(2)),
        ];
      }
    }
    return map[index];
  }

  if (desktop) {
    widthMap = <&&
      [ 86, 102, 73, 150, 150, 170, 150 ] |
      [ 86, 100, 62, 140, 140, 160, 140 ] |
      [ 80, 91, 54, 116, 116, 132, 116 ] |
      [ 78, 88, 54, 116, 116, 116 ] |
      [ 6, 11, 12, 7, 14, 15, 15 ]
    &&>;

    boxTarget = [
      (state) => { return (state <= 1 ? colorChip.purple : colorChip.deactive) },
      (state) => { return (state <= 1 ? colorChip.yellow : colorChip.deactive) },
      null,
      null,
      null,
      null,
      null,
    ];

    forceWidth = [
      (<&& 62 | 62 | 60 | 58 | 6 &&>),
      (<&& 62 | 62 | 60 | 58 | 6 &&>),
      null,
      null,
      null,
      null,
      null,
    ];
  } else {
    widthMap = [ 6, 11, 12, 7 ];

    boxTarget = [
      null,
      (state) => { return colorChip.purple },
      (state) => { return colorChip.yellow },
      (state) => { return colorChip.shadow },
    ];

    forceWidth = [
      null,
      null,
      null,
      null,
    ];
  }

  designerCommentsBoxEvent = (project) => {
    return function (e) {
      const proid = this.getAttribute("proid");
      const designer = this.getAttribute("designer");
      const client = this.getAttribute("client");
      const self = this;
      const zIndex = String(2);
      let cancelBack, whitePrompt, hiddenInput;

      cancelBack = createNode({
        mother: totalContents,
        class: [ commentPopupClassName ],
        event: {
          click: (e) => {
            e.stopPropagation();
            const removeTargets = document.querySelectorAll('.' + commentPopupClassName);
            for (let dom of removeTargets) {
              dom.remove();
            }
          }
        },
        style: {
          top: String(0),
          left: String(0),
          width: withOut(0, ea),
          height: withOut(0, ea),
          background: colorChip.black,
          opacity: String(0.2),
          position: "fixed",
          zIndex: String(zIndex),
        }
      });

      hiddenInput = createNode({
        mother: totalContents,
        class: [ commentPopupClassName ],
        mode: "input",
        attribute: {
          type: "file",
          name: "comments",
          proid,
          designer,
          client
        },
        event: {
          change: async function (e) {
            try {
              const proid = this.getAttribute("proid");
              const designer = this.getAttribute("designer");
              const client = this.getAttribute("client");
              let thisFile, formData, res;
              if ([ ...this.files ].length === 1) {
                thisFile = [ ...this.files ][0];

                formData = new FormData();
                formData.enctype = "multipart/form-data";
                formData.append("proid", proid);
                formData.append("designer", designer);
                formData.append("client", client);
                formData.append("comments", thisFile);

                res = await ajaxForm(formData, BRIDGEHOST + "/commentsBinary");
                await ajaxJson({ whereQuery: { proid }, updateQuery: { "contents.raw.portfolio.status": "원본 수집 완료" } }, SECONDHOST + "/updateProject");
                await ajaxJson({ message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 디자이너 글을 업로드 했습니다!", channel: "#300_designer" }, BACKHOST + "/sendSlack");
                window.alert("업로드가 완료되었습니다!");
                cancelBack.click();
              }
            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "none",
          opacity: String(0),
          position: "absolute",
        }
      });

      whitePrompt = createNode({
        mother: totalContents,
        class: [ commentPopupClassName ],
        event: {
          click: (e) => { e.stopPropagation() }
        },
        style: {
          display: "inline-block",
          position: "fixed",
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          width: String(whitePromptWidth) + ea,
          left: withOut(50, whitePromptWidth / 2, ea),
          top: withOut(50, ((whitePromptPaddingTop + whitePromptPaddingBottom + whitePromptTitleHeight + whitePromptButtonHeight) / 2), ea),
          paddingTop: String(whitePromptPaddingTop) + ea,
          paddingBottom: String(whitePromptPaddingBottom) + ea,
          zIndex: String(zIndex),
          animation: "fadeuplite 0.3s ease",
        },
        children: [
          {
            style: {
              display: "flex",
              position: "relative",
              height: String(whitePromptTitleHeight) + ea,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
            },
            children: [
              {
                text: "디자이너 글 탬플릿을 활용하여\n디자이너 글을 <b%워드 / pdf / 한글 등의 파일로 업로드%b> 해주세요!",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(whitePromptTitleTextTop) + ea,
                  fontSize: String(whitePromptTitleSize) + ea,
                  fontWeight: String(whitePromptTitleWeight),
                  color: colorChip.black,
                  lineHeight: String(whitePromptTitleLineHeight),
                },
                bold: {
                  fontSize: String(whitePromptTitleSize) + ea,
                  fontWeight: String(whitePromptTitleBoldWeight),
                  color: colorChip.black,
                }
              }
            ]
          },
          {
            style: {
              display: "flex",
              position: "relative",
              height: String(whitePromptButtonHeight) + ea,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "row",
            },
            children: [
              {
                event: {
                  click: function (e) {
                    downloadFile("https://" + FILEHOST + "/photo/sample/commentsSample.docx").catch((err) => {
                      console.log(err);
                    });
                  }
                },
                style: {
                  display: "inline-flex",
                  width: String(whitePromptButtonWidth) + ea,
                  height: String(whitePromptButtonHeight) + ea,
                  borderRadius: String(5) + "px",
                  background: colorChip.gradientGray,
                  marginRight: String(whitePromptButtonBetween) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                },
                children: [
                  {
                    text: "디자이너 글 탬플릿",
                    style: {
                      position: "relative",
                      top: String(whitePromptButtonTextTop) + ea,
                      fontSize: String(whitePromptButtonSize) + ea,
                      fontWeight: String(whitePromptButtonWeight),
                      color: colorChip.white,
                    }
                  }
                ]
              },
              {
                event: {
                  click: function (e) {
                    const targetInput = document.querySelector("input." + commentPopupClassName);
                    targetInput.click();
                  }
                },
                style: {
                  display: "inline-flex",
                  width: String(whitePromptButtonWidth) + ea,
                  height: String(whitePromptButtonHeight) + ea,
                  borderRadius: String(5) + "px",
                  background: colorChip.gradientGreen,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                },
                children: [
                  {
                    text: "디자이너 글 업로드",
                    style: {
                      position: "relative",
                      top: String(whitePromptButtonTextTop) + ea,
                      fontSize: String(whitePromptButtonSize) + ea,
                      fontWeight: String(whitePromptButtonWeight),
                      color: colorChip.white,
                    }
                  }
                ]
              },
            ]
          }
        ]
      });

    }
  }

  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginBottom: String(grayBetween) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          width: withOut(0),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: "디자이너 글 대기",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: colorChip.white,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            },
            bold: {
              background: colorChip.white,
              color: colorChip.black,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(300),
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          overflow: "hidden",
          marginBottom: String(0) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  grayTong = createNode({
    mother: tong,
    style: {
      display: "block",
      background: colorChip.gray3,
      borderRadius: String(5) + "px",
      paddingTop: String(grayMargin) + ea,
      paddingBottom: String(grayMargin - tongMargin) + ea,
    }
  });

  targets = equalJson(JSON.stringify(projects)).filter((project) => { return ((new Date(2000, 0, 1)).valueOf() > project.process.calculation.payments.remain.date.valueOf()) && ((new Date(2000, 0, 1)).valueOf() < project.process.calculation.payments.first.date.valueOf()) && (!/드[랍롭]/gi.test(project.process.status)); }).filter((project) => { return !/수집/gi.test(project.contents.raw.portfolio.status) });
  targetLength = targets.length;
  if (targetLength < minimalLength) {
    for (let i = 0; i < minimalLength - targetLength; i++) {
      targets.push(null);
    }
  }

  for (let i = 0; i < targets.length; i++) {

    if (targets[i] !== null) {
      state = 0;

      whiteBaseTong = createNode({
        mother: grayTong,
        attribute: {
          proid: targets[i].proid,
          designer: instance.designer.designer,
          client: targets[i].name,
        },
        event: {
          click: designerCommentsBoxEvent(targets[i])
        },
        style: {
          display: desktop ? "inline-flex" : "block",
          position: "relative",
          marginLeft: String(grayMargin) + ea,
          width: withOut((grayMargin * 2) + (grayPadding * 2), ea),
          paddingLeft: String(grayPadding) + ea,
          paddingRight: String(grayPadding) + ea,
          height: desktop ? String(tongHeight) + ea : "",
          borderRadius: String(5) + "px",
          background: state >= 2 ? (state === 3 ? colorChip.gray4 : colorChip.gray1) : colorChip.white,
          marginBottom: String(tongMargin) + ea,
          alignItems: "center",
          flexDirection: "row",
          cursor: "pointer",
          paddingTop: desktop ? "" : String(grayPadding) + ea,
          paddingBottom: desktop ? "" : String(grayPadding - 0.8) + ea,
        },
      });
      for (let j = 0; j < widthMap.length; j++) {

        if (boxTarget[j] === null) {

          createNode({
            mother: whiteBaseTong,
            text: contentsMap(targets[i], j),
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(whiteSize) + ea,
              fontWeight: String(mobile || j === 2 ? 700 : whiteWeight),
              top: String(whiteTextTop) + ea,
              color: state >= 2 ? colorChip.deactive : colorChip.black,
              width: desktop ? String(widthMap[j]) + ea : "",
              marginRight: desktop ? "" : String(1) + ea,
              marginBottom: desktop ? "" : String(1) + ea,
              paddingLeft: desktop ? "" : String(0.4) + ea,
              paddingTop: desktop ? "" : String(0.2) + ea,
            },
            bold: {
              fontWeight: String(whiteColumnWeight),
              color: j === 2 ? (state >= 2 ? colorChip.deactive : colorChip.black) : colorChip.deactive,
            }
          });

        } else {

          createNode({
            mother: whiteBaseTong,
            style: {
              display: "inline-flex",
              position: "relative",
              alignItems: "center",
              top: String(0),
              height: withOut(0),
              width: desktop ? String(widthMap[j]) + ea : "",
              marginRight: desktop ? "" : String(1) + ea,
              marginBottom: desktop ? "" : String(1) + ea,
            },
            children: [
              {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  alignItems: "center",
                  height: String(colorBoxHeight) + ea,
                  background: boxTarget[j](state),
                  borderRadius: String(5) + "px",
                  paddingLeft: String(colorBoxPadding) + ea,
                  paddingRight: String(colorBoxPadding) + ea,
                  width: desktop ? (forceWidth[j] === null ? "" : String(forceWidth[j]) + ea) : "",
                  justifyContent: "center",
                },
                children: [
                  {
                    text: contentsMap(targets[i], j),
                    style: {
                      display: "inline-block",
                      position: "relative",
                      fontSize: String(colorBoxSize) + ea,
                      fontWeight: String(colorBoxWeight),
                      color: colorChip.white,
                      top: String(colorBoxTextTop) + ea,
                    }
                  }
                ]
              }
            ]
          });

        }

      }

      createNode({
        mother: whiteBaseTong,
        mode: "svg",
        source: svgMaker.horizontalArrow(circleWidth, arrowHeight),
        style: {
          position: "absolute",
          right: String(circleRight) + ea,
          top: String(circleTop) + ea,
          width: String(circleWidth) + ea,
          borderRadius: String(circleWidth) + ea,
        }
      });
    } else {

      whiteBaseTong = createNode({
        mother: grayTong,
        style: {
          display: "inline-flex",
          position: "relative",
          marginLeft: String(grayMargin) + ea,
          width: withOut((grayMargin * 2) + (grayPadding * 2), ea),
          paddingLeft: String(grayPadding) + ea,
          paddingRight: String(grayPadding) + ea,
          height: String(tongHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gray1,
          marginBottom: String(tongMargin) + ea,
          alignItems: "center",
          flexDirection: "row",
          cursor: "pointer",
        },
      });

    }

  }

}

DesignerBoardJs.prototype.insertforeContentsBox = function (whiteBlock) {
  const instance = this;
  const mother = this.mother;
  const { clients, projects, requestNumber, ea, baseTong, media, ghostContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone } = GeneralJs;
  let paddingTop;
  let block;
  let whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft;
  let tong;
  let whiteBottomMargin;
  let grayTong;
  let grayMargin;
  let tongMargin;
  let grayPadding;
  let tongHeight;
  let whiteSize;
  let whiteWeight, whiteColumnWeight;
  let whiteBaseTong;
  let whiteTextTop;
  let contentsMap;
  let widthMap;
  let circleWidth, circleTop;
  let state;
  let boxTarget;
  let targets;
  let minimalLength;
  let forceWidth;
  let colorBoxHeight;
  let colorBoxPadding;
  let colorBoxSize, colorBoxWeight, colorBoxTextTop;
  let targetLength;
  let targetsRaw;
  let ghostIndex;
  let ghostCopied;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 58, 58, 58, 58, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 2.5 %%>;

  mobileTitleLeft = 6;

  grayMargin = <%% 12, 12, 10, 10, 2 %%>;
  grayPadding = <%% 14, 14, 10, 10, 2.5 %%>;

  tongMargin = <%% 2, 2, 2, 2, 1 %%>;

  tongHeight = <%% 50, 50, 42, 42, 15.64 %%>;

  whiteSize = <%% 15, 15, 13, 13, 3 %%>;
  whiteWeight = <%% 400, 400, 400, 400, 400 %%>;
  whiteColumnWeight = <%% 200, 200, 200, 200, 200 %%>;
  whiteTextTop = <%% (isMac() ? -1 : 2), (isMac() ? -1 : 2), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

  circleWidth = <%% 8, 8, 8, 8, 1.2 %%>;
  circleTop = <%% 21, 21, 17, 17, 2.7 %%>;
  circleRight = <%% 20, 20, 20, 20, 2.7 %%>;

  minimalLength = <%% 3, 3, 3, 3, 3 %%>;

  colorBoxHeight = <%% 26, 26, 24, 24, 5.5 %%>;
  colorBoxPadding = <%% 10, 10, 8, 8, 2.2 %%>;
  colorBoxSize = <%% 11, 11, 10, 10, 2.5 %%>;
  colorBoxWeight = <%% 700, 700, 700, 700, 700 %%>;
  colorBoxTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isIphone() ? 0 : -0.2) %%>;

  this.whiteMargin = (desktop ? margin : 0);

  contentsMap = (project, index) => {
    let map;

    if (big) {
      map = [
        "업로드 예정",
        serviceParsing(project.service).replace(/[a-zA-Z]/gi, '').trim().split(' ').slice(1).join(' '),
        project.name,
        "<b%시작일 : %b>" + dateToString(project.process.contract.form.date.from, false).slice(2),
        "<b%종료일 : %b>" + dateToString(project.process.contract.form.date.to, false).slice(2),
        "<b%잔금 정산 : %b>" + (/없음/gi.test(dateToString(project.process.calculation.payments.remain.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.remain.date, false).slice(2)),
        "<b%아이디 : %b>" + project.pid,
      ];
    } else {
      if (desktop) {
        map = [
          "업로드 예정",
          serviceParsing(project.service).replace(/[a-zA-Z]/gi, '').trim().split(' ').slice(1).join(' '),
          project.name,
          "<b%시작일 : %b>" + dateToString(project.process.contract.form.date.from, false).slice(2),
          "<b%종료일 : %b>" + dateToString(project.process.contract.form.date.to, false).slice(2),
          "<b%잔금 : %b>" + (/없음/gi.test(dateToString(project.process.calculation.payments.remain.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.remain.date, false).slice(2)),
        ];
      } else {
        map = [
          project.name + " <b%고객님%b>",
          "업로드 예정",
          serviceParsing(project.service).replace(/[a-zA-Z]/gi, '').trim().split(' ').slice(1).join(' '),
          "잔금 : " + (/없음/gi.test(dateToString(project.process.calculation.payments.remain.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.remain.date, false).slice(2)),
        ];
      }

    }
    return map[index];
  }

  if (desktop) {
    widthMap = <&&
      [ 86, 102, 73, 150, 150, 170, 150 ] |
      [ 86, 100, 62, 140, 140, 160, 140 ] |
      [ 80, 91, 54, 116, 116, 132, 116 ] |
      [ 78, 88, 54, 116, 116, 116, 116 ] |
      [ 6, 11, 12, 7, 14, 15, 15 ]
    &&>;

    boxTarget = [
      (state) => { return (state <= 1 ? colorChip.green : colorChip.deactive) },
      (state) => { return (state <= 1 ? colorChip.yellow : colorChip.deactive) },
      null,
      null,
      null,
      null,
      null,
    ];

    forceWidth = [
      (<&& 62 | 62 | 60 | 58 | 6 &&>),
      (<&& 62 | 62 | 60 | 58 | 6 &&>),
      null,
      null,
      null,
      null,
      null,
    ];
  } else {
    widthMap = [ 6, 11, 12, 7 ];

    boxTarget = [
      null,
      (state) => { return colorChip.green },
      (state) => { return colorChip.yellow },
      (state) => { return colorChip.shadow },
    ];

    forceWidth = [
      null,
      null,
      null,
      null,
    ];
  }

  if (desktop) {
    if (small) {
      widthMap.pop();
      boxTarget.pop();
      forceWidth.pop();
    }
  }

  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          width: withOut(0),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: "업로드 예정 컨텐츠",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: colorChip.white,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            },
            bold: {
              background: colorChip.white,
              color: colorChip.black,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(300),
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          overflow: "hidden",
          marginBottom: String(0) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  grayTong = createNode({
    mother: tong,
    style: {
      display: "block",
      background: colorChip.gray3,
      borderRadius: String(5) + "px",
      paddingTop: String(grayMargin) + ea,
      paddingBottom: String(grayMargin - tongMargin) + ea,
    }
  });

  targetsRaw = equalJson(JSON.stringify(projects)).filter((project) => { return ghostContents.map((obj) => { return obj.client }).includes(project.name); }).filter((project) => {
    const firstDate = project.process.calculation.payments.first.date.valueOf();
    return ((new Date(2000, 0, 1)).valueOf() < firstDate && firstDate < (new Date(3000, 0, 1)).valueOf());
  });

  ghostCopied = equalJson(JSON.stringify(ghostContents));

  targetsRaw.sort((a, b) => { return b.process.calculation.payments.first.date.valueOf() - a.process.calculation.payments.first.date.valueOf() });
  targets = [];
  for (let obj of targetsRaw) {
    ghostIndex = ghostCopied.findIndex((o) => { return o.client === obj.name });
    if (ghostIndex !== -1) {
      obj.pid = ghostContents[ghostIndex].pid;
      targets.push(obj);
    }
  }

  targetLength = targets.length;
  if (targetLength < minimalLength) {
    for (let i = 0; i < minimalLength - targetLength; i++) {
      targets.push(null);
    }
  }

  for (let i = 0; i < targets.length; i++) {

    if (targets[i] !== null) {
      state = 0;

      whiteBaseTong = createNode({
        mother: grayTong,
        style: {
          display: desktop ? "inline-flex" : "block",
          position: "relative",
          marginLeft: String(grayMargin) + ea,
          width: withOut((grayMargin * 2) + (grayPadding * 2), ea),
          paddingLeft: String(grayPadding) + ea,
          paddingRight: String(grayPadding) + ea,
          height: desktop ? String(tongHeight) + ea : "",
          borderRadius: String(5) + "px",
          background: state >= 2 ? (state === 3 ? colorChip.gray4 : colorChip.gray1) : colorChip.white,
          marginBottom: String(tongMargin) + ea,
          alignItems: "center",
          flexDirection: "row",
          cursor: "pointer",
          paddingTop: desktop ? "" : String(grayPadding) + ea,
          paddingBottom: desktop ? "" : String(grayPadding - 0.8) + ea,
        },
      });
      for (let j = 0; j < widthMap.length; j++) {

        if (boxTarget[j] === null) {

          createNode({
            mother: whiteBaseTong,
            text: contentsMap(targets[i], j),
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(whiteSize) + ea,
              fontWeight: String(mobile || j === 2 ? 700 : whiteWeight),
              top: String(whiteTextTop) + ea,
              color: state >= 2 ? colorChip.deactive : colorChip.black,
              width: desktop ? String(widthMap[j]) + ea : "",
              marginRight: desktop ? "" : String(1) + ea,
              marginBottom: desktop ? "" : String(1) + ea,
              paddingLeft: desktop ? "" : String(0.4) + ea,
              paddingTop: desktop ? "" : String(0.2) + ea,
            },
            bold: {
              fontWeight: String(whiteColumnWeight),
              color: j === 2 ? (state >= 2 ? colorChip.deactive : colorChip.black) : colorChip.deactive,
            }
          });

        } else {

          createNode({
            mother: whiteBaseTong,
            style: {
              display: "inline-flex",
              position: "relative",
              alignItems: "center",
              top: String(0),
              height: withOut(0),
              width: desktop ? String(widthMap[j]) + ea : "",
              marginRight: desktop ? "" : String(1) + ea,
              marginBottom: desktop ? "" : String(1) + ea,
            },
            children: [
              {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  alignItems: "center",
                  height: String(colorBoxHeight) + ea,
                  background: boxTarget[j](state),
                  borderRadius: String(5) + "px",
                  paddingLeft: String(colorBoxPadding) + ea,
                  paddingRight: String(colorBoxPadding) + ea,
                  width: desktop ? (forceWidth[j] === null ? "" : String(forceWidth[j]) + ea) : "",
                  justifyContent: "center",
                },
                children: [
                  {
                    text: contentsMap(targets[i], j),
                    style: {
                      display: "inline-block",
                      position: "relative",
                      fontSize: String(colorBoxSize) + ea,
                      fontWeight: String(colorBoxWeight),
                      color: colorChip.white,
                      top: String(colorBoxTextTop) + ea,
                    }
                  }
                ]
              }
            ]
          });

        }

      }

      createNode({
        mother: whiteBaseTong,
        style: {
          position: "absolute",
          right: String(circleRight) + ea,
          top: String(circleTop) + ea,
          width: String(circleWidth) + ea,
          height: String(circleWidth) + ea,
          borderRadius: String(circleWidth) + ea,
          background: state === 0 ? colorChip.green : colorChip.deactive,
        }
      });
    } else {

      whiteBaseTong = createNode({
        mother: grayTong,
        style: {
          display: "inline-flex",
          position: "relative",
          marginLeft: String(grayMargin) + ea,
          width: withOut((grayMargin * 2) + (grayPadding * 2), ea),
          paddingLeft: String(grayPadding) + ea,
          paddingRight: String(grayPadding) + ea,
          height: String(tongHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gray1,
          marginBottom: String(tongMargin) + ea,
          alignItems: "center",
          flexDirection: "row",
          cursor: "pointer",
        },
      });

    }

  }

}

DesignerBoardJs.prototype.insertCalendarBox = function () {
  const instance = this;
  const mother = this.mother;
  const { clients, projects, requestNumber, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, colorCalendar } = GeneralJs;
  const isDateValid = (date) => {
    return ((new Date(2000, 0, 1)).valueOf() <= date.valueOf() && (new Date(3000, 0, 1)).valueOf() > date.valueOf());
  }
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let tong;
  let whiteBottomMargin;
  let grayBetween;
  let dateArr;

  grayBetween = <%% 40, 40, 36, 36, 3 %%>;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 0 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 20, 20, 16, 8, 0.5 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 2 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 3 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(whiteBottomMargin) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginBottom: String(grayBetween) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          width: withOut(0),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            style: {
              display: desktop ? "none" : "block",
              top: String(0),
              left: String(0),
              width: withOut(0),
              height: String(isIphone() ? 2.8 : 2.5) + ea,
              borderBottom: "1px dashed " + colorChip.gray4,
              position: "absolute",
            }
          },
          {
            text: "디자이너 캘린더",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            },
            bold: {
              background: colorChip.white,
              color: colorChip.black,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(300),
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          overflow: "hidden",
          marginBottom: String(0) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  dateArr = [
    {
      contents: {
        color: colorChip.red,
        description: "",
        title: "오늘",
      },
      date: {
        start: new Date(),
        end: new Date(),
      }
    },
  ];

  for (let project of projects) {
    if (isDateValid(project.process.contract.form.date.from)) {
      dateArr.push({
        contents: {
          color: colorChip.green,
          description: "",
          title: project.name + " 시작일",
        },
        date: {
          start: project.process.contract.form.date.from,
          end: project.process.contract.form.date.from,
        }
      });
    }

    if (isDateValid(project.process.contract.form.date.to)) {
      dateArr.push({
        contents: {
          color: colorChip.green,
          description: "",
          title: project.name + " 종료일",
        },
        date: {
          start: project.process.contract.form.date.to,
          end: project.process.contract.form.date.to,
        }
      });
    }

    if (isDateValid(project.process.contract.meeting.date)) {
      dateArr.push({
        contents: {
          color: colorChip.purple,
          description: "",
          title: project.name + " 현장 미팅",
        },
        date: {
          start: project.process.contract.meeting.date,
          end: project.process.contract.meeting.date,
        }
      });
    }

    if (isDateValid(project.contents.photo.date)) {
      dateArr.push({
        contents: {
          color: colorChip.yellow,
          description: "",
          title: project.name + " 촬영",
        },
        date: {
          start: project.contents.photo.date,
          end: project.contents.photo.date,
        }
      });
    }
  }

  colorCalendar(tong, dateArr);
}

DesignerBoardJs.prototype.generateGsArray = function (number) {
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

DesignerBoardJs.prototype.insertPortfolioBase = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, equalJson, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let baseBlock;
  let photoMargin;
  let paddingBottom;
  let titlePaddingTop;
  let titlePaddingBottom;
  let lineTop;
  let wordsPaddingRight;

  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  paddingBottom = <%% 120, 120, 110, 90, 20 %%>;
  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  titlePaddingTop = <%% 30, 30, 30, 30, 3 %%>;
  titlePaddingBottom = <%% 30, 30, 30, 30, 3 %%>;

  lineTop = <%% 44, 44, 44, 44, isIphone() ? 5.8 : 5.5 %%>;
  wordsPaddingRight = <%% 16, 16, 16, 16, 2 %%>;

  createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(titlePaddingTop) + ea,
      paddingBottom: String(titlePaddingBottom) + ea,
    },
    children: [
      {
        style: {
          position: "absolute",
          width: withOut(0),
          height: String(lineTop) + ea,
          top: String(0),
          left: String(0),
          borderBottom: "1px dashed " + colorChip.gray4,
        }
      },
      {
        text: "발행된 컨텐츠",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(600),
          color: colorChip.black,
          background: colorChip.gray1,
          paddingRight: String(wordsPaddingRight) + ea,
        }
      }
    ]
  });

  baseBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      width: "calc(100% + " + String(photoMargin) + ea + ")",
      paddingBottom: String(paddingBottom) + ea,
    }
  });

  this.portfolioBlock();
}

DesignerBoardJs.prototype.portfolioBlock = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, equalJson, cleanChildren, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref } = GeneralJs;
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const photoChar = 't';
  const photoCharMobile = "mot";
  const touchStartConst = "touchStartConstName";
  let { contentsArr, designers } = this;
  let baseBlock;
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
  let titleSubSize;
  let subTitle;
  let titleSubMarginTop;
  let service;
  let tagBlock;
  let subInfoSize;
  let subInfoWeight;
  let arrowWidth;
  let arrowHeight;
  let arrowBottom;
  let arrowReviewBottom;
  let subInfoTextTop;
  let limitLength;

  contentsArr = contentsArr;

  limitLength = contentsArr.length;

  gsArray = this.generateGsArray(limitLength);

  baseWidth = Number(baseTong.style.width.replace(/[^0-9\.]/gi, ''));
  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  columns = <%% 4, 4, 3, 3, 2 %%>;

  photoRatio = (297 / 210);
  seroWidth = (baseWidth - (photoMargin * (columns - 1))) / columns;
  garoWidth = (seroWidth * 2) + photoMargin;
  photoHeight = seroWidth * photoRatio;
  photoMarginBottom = <%% (isMac() ? 20 : 22), (isMac() ? 18 : 20), (isMac() ? 18 : 20), (isMac() ? 18 : 20), 2.3 %%>;

  quoteHeight = <%% 10, 8, 8, 7, 1.8 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  quoteTop = <%% (isMac() ? 7 : 5), (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), isIphone() ? 1.3 : 1.2 %%>;

  titleSize = <%% 21, 17, 17, 15, 3 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleMarginLeft = <%% 6, 6, 5, 5, 1.3 %%>;

  titleSubSize = <%% 14, 12, 12, 11, 2.5 %%>;
  titleSubMarginTop = <%% 3, 3, 3, 2, 0.5 %%>;

  photoBlockMarginBottom = <%% 72, 66, 66, 62, 8 %%>;

  garoSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  garoSliceEnd = <%% 10, 10, 10, 10, 9 %%>;
  garoSliceLimit = <%% 17, 17, 17, 17, 17 %%>;

  seroSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  seroSliceEnd = <%% 16, 15, 17, 15, 13 %%>;
  seroSliceLimit = <%% 30, 30, 30, 30, 30 %%>;

  tagTongMarginTop = <%% (isMac() ? 11 : 10), (isMac() ? 11 : 10), (isMac() ? 10 : 9), (isMac() ? 8 : 7), 1.3 %%>;
  tagTongWidthRatio = <%% 2, 2, 2, 2, 2 %%>;

  tagSize = <%% 12, 10, 10, 9, 2 %%>;
  tagWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagPaddingLeft = <%% 10, 8, 8, 7, 1 %%>;
  tagPaddingTop = <%% (isMac() ? 5 : 6), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), 1 %%>;
  tagPaddingBottom = <%% (isMac() ? 7 : 6), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isIphone() ? 1.2 : 1.4) %%>;
  tagMarginRight = <%% 4, 3, 3, 3, 1 %%>;

  subInfoSize = <%% 12, 11, 11, 10, 2.5 %%>;
  subInfoWeight = <%% 500, 500, 500, 500, 500 %%>;
  subInfoTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  arrowWidth = <%% 32, 28, 28, 26, 4 %%>;
  arrowHeight = <%% 9, 8, 8, 8, 1.5 %%>;
  arrowBottom = <%% 3, 3, 3, 2, 1 %%>;
  arrowReviewBottom = <%% 5, 4, 4, 4, 1 %%>;

  baseBlock = baseTong.children[4];
  cleanChildren(baseBlock);

  if (limitLength !== 0) {
    for (let i = 0; i < limitLength; i++) {

      ({ contents, service } = contentsArr[i]);

      if (desktop) {
        src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/" + photoChar + String(contents.portfolio.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
      } else {
        src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/mobile/" + photoCharMobile + String(contents.portfolio.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
      }

      title = contents.portfolio.title.main.split(", ")[1];
      title = title.replace(/홈?스타일링/gi, '') + serviceParsing(0).name[Number(service.serid.split('_')[1].replace(/[^0-9]/gi, '')) - 1];

      if (media[0] || media[2]) {
        subTitle = contents.portfolio.title.sub;
      } else {
        subTitle = contents.portfolio.title.sub;
        if (!mobile) {
          if (gsArray[i] !== 'g' && subTitle.length > 27) {
            subTitle = contents.portfolio.title.sub.replace(/홈?스타일링$/i, '');
          }
        } else {
          if (gsArray[i] !== 'g' && subTitle.length > 25) {
            subTitle = contents.portfolio.title.sub.replace(/홈?스타일링$/i, '');
          }
        }
      }

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
                text: title,
                style: {
                  display: "block",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  width: withOut(0, ea),
                  verticalAlign: "top",
                }
              },
              {
                style: {
                  display: "block",
                  width: withOut(0, ea),
                  verticalAlign: "top",
                  marginTop: String(titleSubMarginTop) + ea,
                  overflow: "hidden",
                },
                children: [
                  {
                    text: subTitle,
                    style: {
                      display: "block",
                      position: "relative",
                      fontSize: String(titleSubSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.deactive,
                      width: String(200) + '%',
                    },
                  }
                ]
              }
            ]
          },
          {
            style: {
              display: "block",
              position: "relative",
              marginTop: String(tagTongMarginTop) + ea,
              width: String(100) + '%',
              borderTop: "1px solid " + colorChip.gray3,
              left: String(0) + ea,
              paddingTop: String(tagTongMarginTop) + ea,
            },
            children: [
              {
                text: contents.portfolio.spaceInfo.region + "&nbsp;&nbsp;&nbsp;<b%|%b>&nbsp;&nbsp;&nbsp;" + contents.portfolio.spaceInfo.method.split(" ")[0] + " 스타일링",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(subInfoTextTop) + ea,
                  fontSize: String(subInfoSize) + ea,
                  fontWeight: String(subInfoWeight),
                  color: colorChip.black,
                },
                bold: {
                  fontWeight: String(subInfoWeight),
                  color: colorChip.green,
                }
              },
              {
                mode: "svg",
                source: svgMaker.horizontalArrow(arrowWidth, arrowHeight),
                style: {
                  position: "absolute",
                  width: String(arrowWidth) + ea,
                  right: String(0),
                  bottom: String(arrowBottom) + ea,
                }
              }
            ]
          }
        ]
      });

    }
  } else {

    for (let i = 0; i < 4; i++) {

      block = createNode({
        mother: baseBlock,
        style: {
          display: "inline-block",
          width: String(seroWidth) + ea,
          borderRadius: String(5) + "px",
          marginRight: String(photoMargin) + ea,
          marginBottom: String(photoBlockMarginBottom) + ea,
          verticalAlign: "top",
          overflow: "hidden",
        },
        children: [
          {
            style: {
              width: String(seroWidth) + ea,
              height: String(photoHeight) + ea,
              borderRadius: String(5) + "px",
              marginBottom: String(photoMarginBottom) + ea,
              background: colorChip.gray2,
            }
          },
          {
            style: {
              display: "block",
              position: "relative",
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
                text: "-",
                style: {
                  display: "inline-block",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  marginLeft: String(titleMarginLeft) + ea,
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

    }

  }

}

DesignerBoardJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, serviceParsing } = GeneralJs;
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
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let desid, designers, designer;
    let requestNumber;
    let service;
    let response, services;
    let ghostContents;

    if (getObj.desid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    desid = getObj.desid;
    this.desid = desid;
    designers = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getDesigners", { equal: true });
    if (designers.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ designer ] = designers;
    this.designer = designer;

    // if (typeof window.localStorage.getItem("HL_desid") === "string") {
    //   if (window.localStorage.getItem("HL_desid") !== desid) {
    //     GeneralJs.selfHref(FRONTHOST + "/designer/login.php");
    //   }
    // } else {
    //   GeneralJs.selfHref(FRONTHOST + "/designer/login.php");
    // }

    projects = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getProjects", { equal: true });
    this.projects = projects;

    if (projects.length > 0) {
      clients = await ajaxJson({ whereQuery: { $or: projects.map((obj) => { return { cliid: obj.cliid } }) } }, SECONDHOST + "/getClients", { equal: true });
      this.clients = clients;
    } else {
      this.clients = [];
    }

    projects.sort((a, b) => {
      return b.process.contract.meeting.date.valueOf() - a.process.contract.meeting.date.valueOf();
    });

    for (let project of projects) {
      project.name = clients.find((obj) => { return obj.cliid === project.cliid }).name;
    }

    services = serviceParsing().name;
    response = await ajaxJson({ mode: "designer", desid: getObj.desid }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);

    ghostContents = await ajaxJson({ desid: designer.desid, mode: "full" }, BACKHOST + "/getDesignerGhost", { equal: true });
    this.ghostContents = ghostContents;

    this.contents = await ajaxJson({}, SECONDHOST + "/getChecklist", { equal: true });

    await this.mother.ghostDesignerLaunching({
      name: "designerBoard",
      designer: this.designer,
      base: {
        instance: this,
        binaryPath: DesignerBoardJs.binaryPath,
        subTitle: "",
      },
      local: async () => {
        try {
          let whiteBlock;
          instance.insertInitBox();
          instance.insertProcessBox();
          instance.insertCalendarBox();
          instance.insertPortfolioBase();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "DesignerBoardJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    if (typeof getObj.mobilecard === "string") {
      const response = await ajaxJson({ mode: "open", key: getObj.mobilecard }, BACKHOST + "/generalImpPayment", { equal: true });
      if (response.data !== undefined && response.rsp !== undefined) {
        const { data, rsp } = response;
        await ajaxJson({ message: data.designer + " 실장님이 " + data.client + " 고객님 현장 촬영의 촬영비를 결제하셨습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
        window.alert("결제가 완료되었습니다!");
      }
    }

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "DesignerBoardJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
