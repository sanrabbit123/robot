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
  let currentTong;
  let currentRatio;
  let pipeMargin;
  let valueMargin;
  let subTextTop, subTextMargin;
  let blockVisualPaddingBottom;
  let currentTargets, totalTargets, contentsTargets;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4 %%>;
  whiteBottomMargin = <%% 58, 58, 58, 58, 5 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 3 %%>;

  mobileTitleLeft = 6;

  grayMargin = <%% 0, 0, 0, 0, 0 %%>;
  grayPadding = <%% 14, 14, 10, 10, 0 %%>;

  tongMargin = <%% 6, 6, 6, 6, 0.5 %%>;

  tongHeight = <%% 72, 68, 60, 52, 12 %%>;

  whiteSize = <%% 17, 16, 14, 14, 3.2 %%>;
  whiteWeight = <%% 700, 700, 700, 700, 700 %%>;
  whiteColumnWeight = <%% 200, 200, 200, 200, 200 %%>;
  whiteTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 1), (isMac() ? 0 : 1), 0 %%>;
  whiteSubSize = <%% 13, 13, 13, 12, 2.5 %%>;

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

  currentRatio = <%% 60, 60, 58, 56, 60 %%>;
  pipeMargin = <%% 36, 18, 12, 24, 3.8 %%>;
  valueMargin = <%% 10, 10, 8, 8, 1.5 %%>;

  subTextTop = <%% 1, 1, 0, 0, 0.2 %%>;
  subTextMargin = <%% 5, 5, 5, 5, 1.2 %%>;

  blockVisualPaddingBottom = <%% (isMac() ? 1 : 2), (isMac() ? 1 : 2), (isMac() ? 1 : 2), (isMac() ? 1 : 2), 0.5 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  currentTargets = equalJson(JSON.stringify(projects));
  totalTargets = equalJson(JSON.stringify(projects));
  contentsTargets = equalJson(JSON.stringify(projects));

  currentTargets = currentTargets.filter((obj) => {
    return (!/드[랍롭]/gi.test(obj.process.status) && !/홀[드딩]/gi.test(obj.process.status) && !/완료/gi.test(obj.process.status));
  })
  contentsTargets = contentsTargets.filter((obj) => {
    return instance.contentsArr.toNormal().map((o) => { return o.proid }).includes(obj.proid);
    return true
  });

  naviMenu = [
    {
      title: media[0] ? "기본 정보 관리" : (big ? "기본 정보" : (mobile ? "기본 정보" : "기본 정보 관리")),
      sub: "checklist",
      href: FRONTHOST + "/designer/about.php" + "?desid=" + desid,
    },
    {
      title: "정산 리포트",
      sub: "report",
      href: FRONTHOST + "/designer/report.php" + "?desid=" + desid,
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
  tong = block.children[0];

  currentTong = createNode({
    mother: tong,
    style: {
      display: big ? "inline-flex" : "flex",
      background: "transparent",
      borderRadius: String(5) + "px",
      paddingTop: String(grayMargin) + ea,
      paddingBottom: String(grayMargin) + ea,
      position: "relative",
      width: big ? withOut(currentRatio, 0, ea) : String(100) + '%',
      marginRight: big ? String(tongMargin) + ea : "",
      verticalAlign: "top",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      textAlign: "center",
      boxSizing: "border-box",
      border: "1px solid " + colorChip.gray3,
      height: String(tongHeight) + ea,
      paddingBottom: String(blockVisualPaddingBottom) + ea,
      marginBottom: big ? "" : String(tongMargin) + ea,
    },
    children: [
      {
        text: "진행중 " + (desktop ? "프로젝트 " : "") + ": ",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(whiteTextTop) + ea,
          fontSize: String(whiteSize) + ea,
          fontWeight: String(whiteWeight),
          color: colorChip.black,
        }
      },
      {
        text: String(currentTargets.length) + "건",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(whiteTextTop) + ea,
          fontSize: String(whiteSize) + ea,
          fontWeight: String(800),
          color: colorChip.green,
          marginLeft: String(valueMargin) + ea,
        }
      },
      {
        text: " | ",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(whiteTextTop) + ea,
          fontSize: String(whiteSize) + ea,
          fontWeight: String(400),
          color: colorChip.deactive,
          marginLeft: String(pipeMargin) + ea,
          marginRight: String(pipeMargin) + ea,
        }
      },
      {
        text: "누적 " + (desktop ? "프로젝트 " : "") + ": ",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(whiteTextTop) + ea,
          fontSize: String(whiteSize) + ea,
          fontWeight: String(whiteWeight),
          color: colorChip.black,
        }
      },
      {
        text: String(totalTargets.length) + "건",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(whiteTextTop) + ea,
          fontSize: String(whiteSize) + ea,
          fontWeight: String(800),
          color: colorChip.green,
          marginLeft: String(valueMargin) + ea,
        }
      },
      {
        text: " | ",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(whiteTextTop) + ea,
          fontSize: String(whiteSize) + ea,
          fontWeight: String(400),
          color: colorChip.deactive,
          marginLeft: String(pipeMargin) + ea,
          marginRight: String(pipeMargin) + ea,
        }
      },
      {
        text: "발행 " + (desktop ? "프로젝트 " : "") + ": ",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(whiteTextTop) + ea,
          fontSize: String(whiteSize) + ea,
          fontWeight: String(whiteWeight),
          color: colorChip.black,
        }
      },
      {
        text: String(contentsTargets.length) + "건",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(whiteTextTop) + ea,
          fontSize: String(whiteSize) + ea,
          fontWeight: String(800),
          color: colorChip.green,
          marginLeft: String(valueMargin) + ea,
        }
      },
    ]
  });

  grayTong = createNode({
    mother: tong,
    style: {
      display: big ? "inline-block" : "block",
      background: "transparent",
      borderRadius: String(5) + "px",
      paddingTop: String(grayMargin) + ea,
      paddingBottom: String(grayMargin) + ea,
      position: "relative",
      width: big ? withOut((100 - currentRatio), tongMargin, ea) : String(100) + '%',
      verticalAlign: "top",
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
        background: desktop ? colorChip.gray1 : colorChip.gray1,
        alignItems: "center",
        flexDirection: "row",
        cursor: "pointer",
        justifyContent: "center",
        textAlign: "center",
        paddingBottom: String(blockVisualPaddingBottom) + ea,
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
            top: String(subTextTop) + ea,
            fontSize: String(whiteSubSize) + ea,
            fontWeight: String(500),
            fontFamily: "graphik",
            fontStyle: "italic",
            color: colorChip.green,
            marginLeft: String(subTextMargin) + ea,
          }
        }
      ]
    });
  }
  
}

DesignerBoardJs.prototype.insertProcessBox = function () {
  const instance = this;
  const mother = this.mother;
  const { clients, projects, requestNumber, ea, baseTong, media, entireMode, totalContents, normalMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, selfHref, returnGet, homeliaisonAnalytics } = GeneralJs;
  const getObj = returnGet();
  const slash = "&nbsp;&nbsp;<b%/%b>&nbsp;&nbsp;";
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
  let state;
  let boxTarget;
  let targets;
  let minimalLength;
  let forceWidth;
  let colorBoxHeight;
  let colorBoxPadding;
  let colorBoxSize, colorBoxWeight, colorBoxTextTop;
  let targetLength;
  let arrowHeight, arrowWidth;
  let grayBetween;
  let whiteBaseTongDictionary;
  let setContents;
  let printSize;
  let circleWidth, circleBetween, circleColor;
  let circleBoxTop;
  let mobileCircleBoxPaddingBottom;
  let numbersTop;
  let middleState;
  let analyticsData;
  let defaultViewLength;
  let entireKeywords;

  grayBetween = <%% 40, 40, 36, 36, 5 %%>;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;

  if (normalMode) {
    margin = 24;
    paddingTop = 14;
    whiteBottomMargin = 0;
    titleFontSize = 16;
    titleBottom = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), 2.5 %%>;
    titleTopNumber = <%% isMac() ? 2 : 3, isMac() ? 2 : 3, isMac() ? 2 : 3, isMac() ? 2 : 3, 0 %%>;
    grayMargin = 8;
    grayPadding = 10;
    tongHeight = 42;
    whiteSize = 14;
    numbersTop = 7;
    circleTop = 16;
  } else {
    margin = <%% 55, 55, 47, 39, 4 %%>;
    paddingTop =  <%% 52, 52, 44, 36, 4 %%>;
    whiteBottomMargin = <%% 58, 56, 50, 44, 5 %%>;
    titleFontSize = <%% 21, 21, 19, 17, 3.8 %%>;
    titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 2.5 %%>;
    titleTopNumber = <%% isMac() ? 0 : 1, isMac() ? 0 : 1, isMac() ? 0 : 1, isMac() ? 0 : 1, 0 %%>;
    grayMargin = <%% 12, 12, 10, 10, 1 %%>;
    grayPadding = <%% 14, 14, 10, 10, 2.5 %%>;
    tongHeight = <%% 50, 50, 42, 42, 15.64 %%>;
    whiteSize = <%% 15, 15, 13, 13, 3 %%>;
    numbersTop = <%% 9, 9, 7, 5, (isIphone() ? 1.6 : 1.5) %%>;
    circleTop = <%% 20, 20, 17, 17, 3 %%>;
  }

  printSize = <%% 14, 14, 13, 12, 2.7 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  mobileTitleLeft = 6;

  tongMargin = <%% 2, 2, 2, 2, 0.5 %%>;

  whiteWeight = <%% 400, 400, 400, 400, 400 %%>;
  whiteColumnWeight = <%% 200, 200, 200, 200, 200 %%>;
  whiteTextTop = <%% (isMac() ? -1 : 2), (isMac() ? -1 : 2), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

  arrowWidth = <%% 21, 21, 20, 16, 4 %%>;
  circleRight = <%% 20, 20, 20, 12, 2.7 %%>;
  arrowHeight = <%% 8, 8, 8, 6, 1.5 %%>;

  minimalLength = <%% 3, 3, 3, 3, 3 %%>;

  colorBoxHeight = <%% 26, 26, 24, 24, 5.5 %%>;
  colorBoxPadding = <%% 10, 10, 8, 8, 2.2 %%>;
  colorBoxSize = <%% 11, 11, 10, 10, 2.5 %%>;
  colorBoxWeight = <%% 700, 700, 700, 700, 700 %%>;
  colorBoxTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isIphone() ? 0 : -0.2) %%>;

  circleWidth = <%% 8, 8, 7, 6, 1.5 %%>;
  circleBetween = <%% 5, 5, 4, 4, 1 %%>;
  circleBoxTop = <%% 30, 30, 28, 24, 4 %%>;
  mobileCircleBoxPaddingBottom = 1.4;

  this.whiteMargin = (desktop ? margin : 0);

  defaultViewLength = entireMode ? 9999 : 16;

  contentsMap = (project, index) => {
    let map;

    if (big) {
      map = [
        project.process.status,
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
          project.process.status,
          serviceParsing(project.service).replace(/[a-zA-Z]/gi, '').trim().split(' ').slice(1).join(' '),
          project.name,
          "<b%시작일 : %b>" + dateToString(project.process.contract.form.date.from, false).slice(2),
          "<b%종료일 : %b>" + dateToString(project.process.contract.form.date.to, false).slice(2),
          "<b%선금 : %b>" + (/없음/gi.test(dateToString(project.process.calculation.payments.first.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.first.date, false).slice(2)),
        ];
      } else {
        map = [
          project.name + " <b%고객님%b>",
          project.process.status,
          serviceParsing(project.service).replace(/[a-zA-Z]/gi, '').trim().split(' ').slice(1).join(' '),
          "선금 : " + (/없음/gi.test(dateToString(project.process.calculation.payments.first.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.first.date, false).slice(2)),
        ];
      }
    }
    return map[index];
  }

  if (desktop) {
    widthMap = <&&
      [ 94, 110, 73, 150, 150, 170, 150 ] |
      [ 94, 106, 62, 140, 140, 160, 140 ] |
      [ 88, 99, 54, 116, 116, 132, 116 ] |
      [ 86, 96, 54, 116, 116, 116 ] |
      [ 6, 11, 12, 7, 14, 15, 15 ]
    &&>;

    boxTarget = [
      (state, middle) => { return (state <= 1 ? (state === 0 ? colorChip.red : (middle === 0 ? colorChip.shadow : colorChip.purple)) : colorChip.deactive) },
      (state, middle) => { return (state <= 1 ? (state === 0 ? colorChip.yellow : colorChip.shadow) : colorChip.deactive) },
      null,
      null,
      null,
      null,
      null,
    ];

    forceWidth = [
      (<&& 70 | 70 | 68 | 66 | 6 &&>),
      (<&& 70 | 70 | 68 | 66 | 6 &&>),
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
      (state, middle) => { return (state <= 1 ? (state === 0 ? colorChip.red : (middle === 0 ? colorChip.shadow : colorChip.purple)) : colorChip.deactive) },
      (state, middle) => { return (state <= 1 ? (state === 0 ? colorChip.yellow : colorChip.shadow) : colorChip.deactive) },
      (state, middle) => { return (state <= 1 ? (state === 0 ? colorChip.darkShadow : colorChip.shadow) : colorChip.deactive) },
    ];

    forceWidth = [
      null,
      null,
      null,
      null,
    ];
  }

  whiteBlock = createNode({
    mother: entireMode ? totalContents : baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: entireMode ? "" : String(whiteBottomMargin) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: entireMode ? "" : "0px 5px 12px -10px " + colorChip.gray5,
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

    targets = equalJson(JSON.stringify(projects));
    targets = targets.filter((obj) => {
      return /대기/gi.test(obj.process.status) || /진행/gi.test(obj.process.status);
    });
    targets.sort((a, b) => {
      const emptyValue = Math.abs((new Date(1200, 0, 1)).valueOf());
      let aConst, bConst;

      if (/대기/gi.test(a.process.status)) {
        aConst = 1;
      } else {
        aConst = 100000000;
      }

      if (/대기/gi.test(b.process.status)) {
        bConst = 1;
      } else {
        bConst = 100000000;
      }

      return ((a.process.contract.form.date.from.valueOf() + emptyValue) * bConst) - ((b.process.contract.form.date.from.valueOf() + emptyValue) * aConst);
    });

    analyticsData = {
      desid: instance.designer.desid,
      href: window.encodeURIComponent(window.location.href),
      date: dateToString(new Date(), true),
      process: {
        length: targets.length,
        detail: targets.map((p) => {
          return {
            proid: p.proid,
            cliid: p.cliid,
            name: p.name,
            service: p.service,
            status: p.process.status,
          }
        })
      }
    };
    analyticsData = equalJson(JSON.stringify(analyticsData));
    if (!entireMode) {
      homeliaisonAnalytics({ page: instance.pageName, standard: instance.firstPageViewTime, action: "processLoad", data: analyticsData }).catch((err) => { console.log(err); });
    }

    targetLength = targets.length;
    if (targetLength < minimalLength) {
      for (let i = 0; i < minimalLength - targetLength; i++) {
        targets.push(null);
      }
    }

    circleColor = colorChip.deactive;
    entireKeywords = false;
    if (!total) {
      if (targets.length > defaultViewLength) {
        targets = targets.slice(0, defaultViewLength);
        circleColor = colorChip.green;
        entireKeywords = true;
      }
    }

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
              text: "진행중 프로젝트" + (desktop ? (!total ? "&nbsp;&nbsp;<b%모두 보기%b>" : "&nbsp;&nbsp;<b%일부만 보기%b>") : ""),
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
                fontWeight: String(normalMode ? 800 : 600),
                background: colorChip.white,
                paddingRight: String(numberRight) + ea,
                color: colorChip.black,
              },
              bold: {
                background: colorChip.white,
                color: circleColor,
                fontSize: entireMode ? String(0) : String(printSize) + ea,
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
        {
          text: "총 <u%" + String(targetLength) + "%u>건" + slash + "진행중 <u%" + String(equalJson(JSON.stringify(targets)).filter((o) => { return o !== null }).filter((o) => { return /진행/gi.test(o.process.status) }).length) + "%u>건" + slash + "대기 <u%" + String(equalJson(JSON.stringify(targets)).filter((o) => { return o !== null }).filter((o) => { return /대기/gi.test(o.process.status) }).length) + "%u>건",
          style: {
            position: "absolute",
            top: String(numbersTop) + ea,
            right: String(0) + ea,
            color: colorChip.black,
            fontSize: String(printSize) + ea,
            fontWeight: String(500),
          },
          bold: {
            color: colorChip.deactive,
            fontSize: String(printSize) + ea,
            fontWeight: String(500),
          },
          under: {
            color: colorChip.green,
            fontSize: String(printSize) + ea,
            fontWeight: String(500),
          },
        },
      ]
    });
    tong = block.children[1];

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

    whiteBaseTongDictionary = {};
    for (let i = 0; i < targets.length; i++) {

      if (targets[i] !== null) {
        state = 0;
        middleState = 0;
        if (/드[랍롭]/gi.test(targets[i].process.status) || /홀[드딩]/gi.test(targets[i].process.status)) {
          state = 3;
          middleState = 0;
        } else if (/완료/gi.test(targets[i].process.status)) {
          state = 2;
          middleState = 0;
        } else if (/대기/gi.test(targets[i].process.status)) {
          state = 1;
          middleState = 0;
        }

        if (state === 0) {
          if (targets[i].process.contract.form.date.from.valueOf() > (new Date()).valueOf()) {
            state = 1;
            middleState = 1;
          }
        }

        whiteBaseTong = createNode({
          mother: grayTong,
          attribute: {
            proid: targets[i].proid,
            state: String(state)
          },
          event: {
            click: async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const state = Number(this.getAttribute("state"));
                let thisProject;
                let analytics;

                if (normalMode) {
                  if (typeof window.parent.postMessage === "function") {
                    window.parent.postMessage(JSON.stringify({
                      type: "processDetail",
                      proid: proid,
                      desid: instance.designer.desid,
                    }), "*");
                  }
                } else {
                  if (state === 0) {
                    selfHref(FRONTHOST + "/designer/process.php?proid=" + proid);
                  } else {
    
                    [ thisProject ] = await ajaxJson({ noFlat: true, whereQuery: { proid } }, BACKHOST + "/getProjects", { equal: true });
                    analytics = await ajaxJson({ desid: instance.desid, mode: "request", type: "send", cliid: thisProject.cliid }, BACKHOST + "/ghostDesigner_getAnalytics", { equal: true });
                    
                    if (analytics.length > 0) {
                      selfHref(FRONTHOST + "/designer/process.php?proid=" + proid + "&mode=request");
                    } else {
                      selfHref(FRONTHOST + "/designer/process.php?proid=" + proid);
                    }
                  }
                }
              } catch (e) {
                console.log(e);
              } 
            },
            contextmenu: function (e) {
              e.preventDefault();
              const proid = this.getAttribute("proid");
              if (normalMode) {
                if (typeof window.parent.postMessage === "function") {
                  window.parent.postMessage(JSON.stringify({
                    type: "processDetail",
                    proid: proid,
                    desid: instance.designer.desid,
                  }), "*");
                }
              } else {
                selfHref(FRONTHOST + "/designer/process.php?proid=" + proid);
              }
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
            background: state >= 2 ? (state === 3 ? colorChip.gray4 : colorChip.gray1) : (state === 0 ? colorChip.white : colorChip.gray0),
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
                flexDirection: "row",
              },
              children: [
                {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    alignItems: "center",
                    height: String(colorBoxHeight) + ea,
                    background: boxTarget[j](state, middleState),
                    borderRadius: String(5) + "px",
                    paddingLeft: String(colorBoxPadding) + ea,
                    paddingRight: String(colorBoxPadding) + ea,
                    width: desktop ? (forceWidth[j] === null ? "" : String(forceWidth[j]) + ea) : "",
                    justifyContent: "center",
                    flexDirection: "row",
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
          source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, (state === 0 ? colorChip.green : colorChip.deactive)),
          style: {
            position: "absolute",
            right: String(circleRight) + ea,
            top: String(circleTop) + ea,
            width: String(arrowWidth) + ea,
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

    if (!entireMode) {
      createNode({
        mother: tong,
        attribute: { entire: entireKeywords ? "true" : "false" },
        event: {
          click: function (e) {
            setContents(this.getAttribute("entire") === "true");
          },
        },
        style: {
          display: "flex",
          marginTop: String(circleBoxTop) + ea,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
          paddingBottom: desktop ? "" : String(mobileCircleBoxPaddingBottom) + ea,
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              background: circleColor,
              borderRadius: String(circleWidth) + ea,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              background: circleColor,
              borderRadius: String(circleWidth) + ea,
              marginLeft: String(circleBetween) + ea,
              marginRight: String(circleBetween) + ea,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              background: circleColor,
              borderRadius: String(circleWidth) + ea,
            }
          },
        ]
      });
  
    }
  }

  setContents();

  return whiteBlock;
}

DesignerBoardJs.prototype.insertReleaseBox = function () {
  const instance = this;
  const mother = this.mother;
  const { clients, projects, requestNumber, ea, baseTong, media, entireMode, totalContents, normalMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, selfHref, returnGet, homeliaisonAnalytics } = GeneralJs;
  const getObj = returnGet();
  const slash = "&nbsp;&nbsp;<b%/%b>&nbsp;&nbsp;";
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
  let state;
  let boxTarget;
  let targets;
  let minimalLength;
  let forceWidth;
  let colorBoxHeight;
  let colorBoxPadding;
  let colorBoxSize, colorBoxWeight, colorBoxTextTop;
  let targetLength;
  let arrowHeight, arrowWidth;
  let grayBetween;
  let whiteBaseTongDictionary;
  let setContents;
  let printSize;
  let circleWidth, circleBetween, circleColor;
  let circleBoxTop;
  let mobileCircleBoxPaddingBottom;
  let numbersTop;
  let analyticsData;
  let defaultViewLength;
  let entireKeywords;

  grayBetween = <%% 40, 40, 36, 36, 5 %%>;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;

  if (normalMode) {
    margin = 24;
    paddingTop = 0;
    whiteBottomMargin = 24;
    titleFontSize = 16;
    titleBottom = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), 2.5 %%>;
    titleTopNumber = <%% isMac() ? 2 : 3, isMac() ? 2 : 3, isMac() ? 2 : 3, isMac() ? 2 : 3, 0 %%>;
    grayMargin = 8;
    grayPadding = 10;
    tongHeight = 42;
    whiteSize = 14;
    numbersTop = 7;
    circleTop = 16;
  } else {
    margin = <%% 55, 55, 47, 39, 4 %%>;
    paddingTop =  <%% 52, 52, 44, 36, 4 %%>;
    whiteBottomMargin = <%% 58, 56, 50, 44, 5 %%>;
    titleFontSize = <%% 21, 21, 19, 17, 3.8 %%>;
    titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 2.5 %%>;
    titleTopNumber = <%% isMac() ? 0 : 1, isMac() ? 0 : 1, isMac() ? 0 : 1, isMac() ? 0 : 1, 0 %%>;
    grayMargin = <%% 12, 12, 10, 10, 1 %%>;
    grayPadding = <%% 14, 14, 10, 10, 2.5 %%>;
    tongHeight = <%% 50, 50, 42, 42, 15.64 %%>;
    whiteSize = <%% 15, 15, 13, 13, 3 %%>;
    numbersTop = <%% 9, 9, 7, 5, (isIphone() ? 1.6 : 1.5) %%>;
    circleTop = <%% 20, 20, 17, 17, 3 %%>;
  }

  printSize = <%% 14, 14, 13, 12, 2.7 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  mobileTitleLeft = 6;

  tongMargin = <%% 2, 2, 2, 2, 0.5 %%>;

  whiteWeight = <%% 400, 400, 400, 400, 400 %%>;
  whiteColumnWeight = <%% 200, 200, 200, 200, 200 %%>;
  whiteTextTop = <%% (isMac() ? -1 : 2), (isMac() ? -1 : 2), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

  arrowWidth = <%% 21, 21, 20, 16, 4 %%>;
  circleTop = <%% 20, 20, 17, 17, 3 %%>;
  circleRight = <%% 20, 20, 20, 12, 2.7 %%>;
  arrowHeight = <%% 8, 8, 8, 6, 1.5 %%>;

  minimalLength = <%% 3, 3, 3, 3, 3 %%>;

  colorBoxHeight = <%% 26, 26, 24, 24, 5.5 %%>;
  colorBoxPadding = <%% 10, 10, 8, 8, 2.2 %%>;
  colorBoxSize = <%% 11, 11, 10, 10, 2.5 %%>;
  colorBoxWeight = <%% 700, 700, 700, 700, 700 %%>;
  colorBoxTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isIphone() ? 0 : -0.2) %%>;

  circleWidth = <%% 8, 8, 7, 6, 1.5 %%>;
  circleBetween = <%% 5, 5, 4, 4, 1 %%>;
  circleBoxTop = <%% 30, 30, 28, 24, 4 %%>;
  mobileCircleBoxPaddingBottom = 1.4;

  this.whiteMargin = (desktop ? margin : 0);

  defaultViewLength = entireMode ? 9999 : 16;

  contentsMap = (project, index) => {
    let map;

    if (big) {
      map = [
        project.process.status,
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
          project.process.status,
          serviceParsing(project.service).replace(/[a-zA-Z]/gi, '').trim().split(' ').slice(1).join(' '),
          project.name,
          "<b%시작일 : %b>" + dateToString(project.process.contract.form.date.from, false).slice(2),
          "<b%종료일 : %b>" + dateToString(project.process.contract.form.date.to, false).slice(2),
          "<b%선금 : %b>" + (/없음/gi.test(dateToString(project.process.calculation.payments.first.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.first.date, false).slice(2)),
        ];
      } else {
        map = [
          project.name + " <b%고객님%b>",
          project.process.status,
          serviceParsing(project.service).replace(/[a-zA-Z]/gi, '').trim().split(' ').slice(1).join(' '),
          "선금 : " + (/없음/gi.test(dateToString(project.process.calculation.payments.first.date, false).slice(2)) ? "예정" : dateToString(project.process.calculation.payments.first.date, false).slice(2)),
        ];
      }
    }
    return map[index];
  }

  if (desktop) {
    widthMap = <&&
      [ 94, 110, 73, 150, 150, 170, 150 ] |
      [ 94, 106, 62, 140, 140, 160, 140 ] |
      [ 88, 99, 54, 116, 116, 132, 116 ] |
      [ 86, 96, 54, 116, 116, 116 ] |
      [ 6, 11, 12, 7, 14, 15, 15 ]
    &&>;

    boxTarget = [
      (state) => { return (state <= 1 ? (state === 0 ? colorChip.green : colorChip.shadow) : colorChip.deactive) },
      (state) => { return (state <= 1 ? (state === 0 ? colorChip.yellow : colorChip.shadow) : colorChip.deactive) },
      null,
      null,
      null,
      null,
      null,
    ];

    forceWidth = [
      (<&& 70 | 70 | 68 | 66 | 6 &&>),
      (<&& 70 | 70 | 68 | 66 | 6 &&>),
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
      (state) => { return (state <= 1 ? (state === 0 ? colorChip.green : colorChip.shadow) : colorChip.deactive) },
      (state) => { return (state <= 1 ? (state === 0 ? colorChip.yellow : colorChip.shadow) : colorChip.deactive) },
      (state) => { return (state <= 1 ? (state === 0 ? colorChip.darkShadow : colorChip.shadow) : colorChip.deactive) },
    ];

    forceWidth = [
      null,
      null,
      null,
      null,
    ];
  }

  whiteBlock = createNode({
    mother: entireMode ? totalContents : baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(whiteBottomMargin) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: entireMode ? "" : "0px 5px 12px -10px " + colorChip.gray5,
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

    targets = equalJson(JSON.stringify(projects));
    targets = targets.filter((obj) => {
      return instance.contentsArr.toNormal().map((o) => { return o.proid }).includes(obj.proid) || (!/대기/gi.test(obj.process.status) && !/진행/gi.test(obj.process.status));
    });
    targets.sort((a, b) => {
      const emptyValue = Math.abs((new Date(1200, 0, 1)).valueOf());
      let aConst, bConst;

      if (/드[랍롭]/gi.test(a.process.status) || /홀[드딩]/gi.test(a.process.status)) {
        aConst = 1;
      } else if (instance.contentsArr.toNormal().map((o) => { return o.proid }).includes(a.proid)) {
        aConst = 10000;
      } else if (instance.ghostContents.map((o) => { return o.proid }).includes(a.proid)) {
        aConst = 100000000;
      } else {
        aConst = 10;
      }

      if (/드[랍롭]/gi.test(b.process.status) || /홀[드딩]/gi.test(b.process.status)) {
        bConst = 1;
      } else if (instance.contentsArr.toNormal().map((o) => { return o.proid }).includes(b.proid)) {
        bConst = 10000;
      } else if (instance.ghostContents.map((o) => { return o.proid }).includes(b.proid)) {
        bConst = 100000000;
      } else {
        bConst = 10;
      }

      return ((b.process.contract.form.date.from.valueOf() + emptyValue) * bConst) - ((a.process.contract.form.date.from.valueOf() + emptyValue) * aConst);
    });

    analyticsData = {
      desid: instance.designer.desid,
      href: window.encodeURIComponent(window.location.href),
      date: dateToString(new Date(), true),
      contents: {
        length: targets.length,
        detail: targets.map((p) => {
          return {
            proid: p.proid,
            cliid: p.cliid,
            name: p.name,
            service: p.service,
            status: p.process.status,
          }
        })
      }
    };
    analyticsData = equalJson(JSON.stringify(analyticsData));
    for (let obj of analyticsData.contents.detail) {
      if (instance.contentsArr.toNormal().map((o) => { return o.proid }).includes(obj.proid)) {
        obj.contents = {
          status: "발행",
          pid: instance.contentsArr.toNormal().find((o) => { return o.proid === obj.proid }).contents.portfolio.pid,
        };
      } else if (/드[랍롭]/gi.test(obj.status) || /홀[드딩]/gi.test(obj.status)) {
        obj.contents = {
          status: "드랍",
          pid: "",
        };
      } else if (instance.ghostContents.map((o) => { return o.proid }).includes(obj.proid)) {
        obj.contents = {
          status: "예정",
          pid: instance.ghostContents.find((o) => { return o.proid === obj.proid }).pid,
        };
      } else {
        obj.contents = {
          status: "미발행",
          pid: "",
        };
      }
    }
    if (!entireMode) {
      homeliaisonAnalytics({ page: instance.pageName, standard: instance.firstPageViewTime, action: "contentsLoad", data: analyticsData }).catch((err) => { console.log(err); });
    }

    targetLength = targets.length;
    if (targetLength < minimalLength) {
      for (let i = 0; i < minimalLength - targetLength; i++) {
        targets.push(null);
      }
    }

    circleColor = colorChip.deactive;
    entireKeywords = false;
    if (!total) {
      if (targets.length > defaultViewLength) {
        targets = targets.slice(0, defaultViewLength);
        circleColor = colorChip.green;
        entireKeywords = true;
      }
    }

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
              text: "완료된 프로젝트" + (desktop ? (!total ? "&nbsp;&nbsp;<b%모두 보기%b>" : "&nbsp;&nbsp;<b%일부만 보기%b>") : ""),
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
                fontWeight: String(normalMode ? 800 : 600),
                background: colorChip.white,
                paddingRight: String(numberRight) + ea,
                color: colorChip.black,
              },
              bold: {
                background: colorChip.white,
                color: circleColor,
                fontSize: entireMode ? String(0) : String(printSize) + ea,
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
        {
          text: "총 <u%" + String(targetLength) + "%u>건" + slash + "발행 예정 <u%" + String(equalJson(JSON.stringify(targets)).filter((o) => { return o !== null }).filter((o) => { return instance.ghostContents.map((o2) => { return o2.proid }).includes(o.proid) }).length) + "%u>건" + slash + "발행됨 <u%" + String(equalJson(JSON.stringify(targets)).filter((o) => { return o !== null }).filter((o) => { return instance.contentsArr.toNormal().map((o2) => { return o2.proid }).includes(o.proid) }).length) + "%u>건",
          style: {
            position: "absolute",
            top: String(numbersTop) + ea,
            right: String(0) + ea,
            color: colorChip.black,
            fontSize: String(printSize) + ea,
            fontWeight: String(500),
          },
          bold: {
            color: colorChip.deactive,
            fontSize: String(printSize) + ea,
            fontWeight: String(500),
          },
          under: {
            color: colorChip.green,
            fontSize: String(printSize) + ea,
            fontWeight: String(500),
          },
        },
      ]
    });
    tong = block.children[1];

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

    whiteBaseTongDictionary = {};
    for (let i = 0; i < targets.length; i++) {

      if (targets[i] !== null) {

        if (instance.contentsArr.toNormal().map((o) => { return o.proid }).includes(targets[i].proid)) {
          state = 0;
        } else if (/드[랍롭]/gi.test(targets[i].process.status) || /홀[드딩]/gi.test(targets[i].process.status)) {
          state = 3;
        } else if (instance.ghostContents.map((o) => { return o.proid }).includes(targets[i].proid)) {
          state = 1;
        } else {
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
              if (normalMode) {
                if (typeof window.parent.postMessage === "function") {
                  window.parent.postMessage(JSON.stringify({
                    type: "processDetail",
                    proid: proid,
                    desid: instance.designer.desid,
                  }), "*");
                }
              } else {
                selfHref(FRONTHOST + "/designer/process.php?proid=" + proid);
              }
            },
            contextmenu: function (e) {
              e.preventDefault();
              const proid = this.getAttribute("proid");
              if (normalMode) {
                if (typeof window.parent.postMessage === "function") {
                  window.parent.postMessage(JSON.stringify({
                    type: "processDetail",
                    proid: proid,
                    desid: instance.designer.desid,
                  }), "*");
                }
              } else {
                selfHref(FRONTHOST + "/designer/process.php?proid=" + proid);
              }
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
            background: state >= 2 ? (state === 3 ? colorChip.gray4 : colorChip.gray1) : (state === 0 ? colorChip.white : colorChip.gray0),
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
                flexDirection: "row",
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
                    flexDirection: "row",
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
          source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, (state === 0 ? colorChip.green : colorChip.deactive)),
          style: {
            position: "absolute",
            right: String(circleRight) + ea,
            top: String(circleTop) + ea,
            width: String(arrowWidth) + ea,
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

    if (!entireMode) {
      createNode({
        mother: tong,
        attribute: { entire: entireKeywords ? "true" : "false" },
        event: {
          click: function (e) {
            setContents(this.getAttribute("entire") === "true");
          },
        },
        style: {
          display: "flex",
          marginTop: String(circleBoxTop) + ea,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
          paddingBottom: desktop ? "" : String(mobileCircleBoxPaddingBottom) + ea,
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              background: circleColor,
              borderRadius: String(circleWidth) + ea,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              background: circleColor,
              borderRadius: String(circleWidth) + ea,
              marginLeft: String(circleBetween) + ea,
              marginRight: String(circleBetween) + ea,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              background: circleColor,
              borderRadius: String(circleWidth) + ea,
            }
          },
        ]
      });
    }

  }

  setContents();

  return whiteBlock;
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

  this.portfolioBlock(baseBlock);
}

DesignerBoardJs.prototype.portfolioBlock = function (baseBlock) {
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

  if (limitLength !== 0) {
    for (let i = 0; i < limitLength; i++) {

      ({ contents, service } = contentsArr[i]);

      if (desktop) {
        src = "https://" + FILEHOST + "/list_image/portp" + contents.portfolio.pid + "/" + photoChar + String(contents.portfolio.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
      } else {
        src = "https://" + FILEHOST + "/list_image/portp" + contents.portfolio.pid + "/mobile/" + photoCharMobile + String(contents.portfolio.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
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

DesignerBoardJs.prototype.insertFormStatusBox = async function (whiteTong, client, project) {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const { proid, desid } = project;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, blankHref, selfHref, scrollTo, variableArray, findByAttribute, setQueue, serviceParsing } = GeneralJs;
  const dateToHangul = (dateObject) => {
    return `${String(dateObject.getFullYear()).slice(2)}년 ${String(dateObject.getMonth() + 1)}월 ${String(dateObject.getDate())}일`;
  }
  const hangulToDate = (hangul) => {
    hangul = hangul.replace(/ /gi, '');
    const [ year, month, date ] = hangul.split(/[가-힣]/gi);
    return new Date(2000 + Number(year), Number(month) - 1, Number(date));
  }
  const siblingKeywords = "siblingKeywords__";
  const valueBlockClassName = "valueBlockClassName__";
  try {
    let margin;
    let paddingTop;
    let whiteBottomMargin;
    let titleFontSize;
    let bottomMargin;
    let whiteBlock;
    let grayTong;
    let contents;
    let innerMargin;
    let arrowWidth, arrowHeight;
    let textTop;
    let textSize, textWeight;
    let textMarginLeft;
    let mobileVisualPaddingValue;
    let button, buttons;
    let blockBetween;
    let blockBetweenBottom;
    let blockHeight;
    let lineTop;
    let columnsNumber;
    let textFileWeight;
    let whitePadding;
    let smallSize, smallWeight, smallBetween;
    let textTextTop;
    let smallTextTop;
    let panDom;
    let veryBigSize;
    let veryBigWeight;
    let firstWidth;
    let buttonWidth, buttonHeight;
    let buttonOuterPadding, buttonInnerMargin;
    let descriptionBetween;
    let panWidth, panVisualLeft;
    let veryBigTextTop;
    let circleWidth, circleTop, circleLeft;
    let subButtonWidth;
    let thirdWidth;
    let imageBoxVisualPaddingBottom;
    let imageBetween;
    let panBoxBetween;
    let wordingPaddingTop0, wordingPaddingTop1;
    let mainTong;
    let wordingBoxWidth;
    let contentsTong;
    let contentsTongPaddingBottom;
    let bigTextSize;
    let bigTextWeight;
    let bigTextTextTop;
    let clock;
    let formPanBase;
    let thisPan;
    let panBetween;
    let panHeight, panInnerMargin;
    let panCheckBoxWidth;
    let panWhitePaddingLeft;
    let panBlockBetween, panBlockBigBetween;
    let buttonSize, buttonWeight, buttonTextTop;
    let panPaddingTop;
    let panTitleSize, panTitleWeight;
    let formPanBaseMarginBottom;
    let checkBoxWidth;
    let blockTextSize, blockTextWeight;
    let siblings;
    let thisForm;
    let colorArr;
    let barArrBase;
    let barArrBlock;
    let barArrBlockValuesBase;
    let childrenMaxNumber;
    let thisValueNumber;
    let reloadBarArr;
    let barBaseHeight, barFactorHeight, barFactorBetween;
    let barFirstWidth;
    let barArrBasePaddingTop;
    let barArrBaseMarginTop;
    let barArrTitleTextTop;
    let reloadMainButtons;
    let valueIndex;
    let finalValueNumber;
    let percentageSize;
    let percentageTextTop;
    let formPanBasePaddingBottom;
    let printSize;

    bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
    margin = <%% 55, 55, 47, 39, 4 %%>;
    paddingTop = <%% 44, 44, 36, 34, 5.4 %%>;
    whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;
  
    titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
    printSize = <%% 13, 12, 11, 10, 2.5 %%>;

    bigTextSize = <%% 36, 36, 36, 36, 4.4 %%>;
    bigTextWeight = <%% 100, 100, 100, 100, 100 %%>;
    bigTextTextTop = <%% (isMac() ? -7 : -5), (isMac() ? -7 : -5), -7, -7, -1 %%>;
  
    veryBigSize = <%% 17, 16, 14, 14, 3.4 %%>;
    veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
    veryBigTextTop = <%% (isMac() ? 1 : 3), (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 1 : 3), -1 %%>;
  
    innerMargin = <%% 0, 0, 0, 0, 1 %%>;
  
    textTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;
    smallTextTop = <%% (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), 0 %%>;
  
    textSize = <%% 13, 13, 12, 11, 3.2 %%>;
    textWeight = <%% 700, 700, 700, 700, 700 %%>;
    textFileWeight = <%% 400, 400, 400, 400, 400 %%>;
  
    whitePadding = <%% 12, 12, 8, 8, 2.2 %%>;
  
    blockBetween = <%% 36, 28, 26, 24, 5 %%>;
    blockBetweenBottom = <%% 10, 4, 4, 4, 2.2 %%>;
    blockHeight = <%% 30, 30, 28, 26, 4 %%>;
  
    lineTop = <%% 18, 18, 16, 13, 1.9 %%>;
  
    firstWidth = <%% 230, 210, 190, 160, 28 %%>;
  
    panWidth = <%% 20, 20, 20, 20, 2 %%>;
    panVisualLeft = <%% 1, 1, 1, 1, 1 %%>;
  
    circleWidth = <%% 5, 5, 5, 4, 0.8 %%>;
    circleTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 1.2 %%>;
    circleLeft = <%% -7, -7, -7, -5, -0.8 %%>;
  
    arrowWidth = <%% 18, 16, 15, 14, 3.6 %%>;
    arrowHeight = <%% 8, 8, 8, 7, 2 %%>;
  
    subButtonWidth = <%% 90, 72, 72, 64, 16 %%>;
  
    mobileVisualPaddingValue = 0.2;
  
    thirdWidth = <%% 240, 0, 0, 0, 0 %%>;
  
    imageBoxVisualPaddingBottom = <%% 4, 2, 2, 2, 0 %%>;
    imageBetween = <%% 32, 16, 12, 12, 6 %%>;
    panBoxBetween = <%% 12, 32, 26, 24, 12 %%>;
  
    wordingPaddingTop0 = <%% 300, 213, 213, 213, 213 %%>;
    wordingPaddingTop1 = <%% 309, 243, 243, 243, 243 %%>;
  
    wordingBoxWidth = <%% 175, 185, 175, 115, 175 %%>;
  
    contentsTongPaddingBottom = <%% 15, 15, 15, 15, 5 %%>;
    panBetween = <%% 28, 28, 24, 20, 2 %%>;
  
    panHeight = <%% 48, 48, 45, 42, 11 %%>;
    panInnerMargin = <%% 4, 4, 4, 3, 1 %%>;
  
    panCheckBoxWidth = <%% 32, 24, 20, 20, 8 %%>;
    checkBoxWidth = <%% 13, 11, 9, 9, 3 %%>;
  
    panWhitePaddingLeft = <%% 16, 14, 14, 12, 3.5 %%>; 
    panBlockBetween = <%% 8, 8, 6, 5, 1 %%>; 
    panBlockBigBetween = <%% 8, 8, 6, 5, 1 %%>; 
  
    buttonWidth = <%% 100, 80, 70, 60, 20 %%>;
    buttonHeight = <%% 36, 28, 26, 24, 7.8 %%>;
  
    buttonSize = <%% 15, 13, 12, 11, 3.2 %%>;
    buttonWeight = <%% 800, 800, 800, 800, 800 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;
  
    panPaddingTop = <%% 22, 18, 14, 14, 4 %%>;
  
    panTitleSize = <%% 16, 15, 14, 13, 3.8 %%>;
    panTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  
    formPanBaseMarginBottom = <%% 12, 8, 6, 6, 4 %%>;
  
    blockTextSize = <%% 14, 13, 12, 11, 3.2 %%>;
    blockTextWeight = <%% 600, 600, 600, 600, 600 %%>;
  
    barBaseHeight = <%% 30, 30, 26, 24, 6.8 %%>;
    barFirstWidth = <%% 60, 56, 50, 42, 11 %%>;
    barFactorHeight = <%% 20, 20, 18, 16, 4 %%>;
    barFactorBetween = <%% 0, 0, 0, 0, 0 %%>;

    barArrBasePaddingTop = <%% 36, 32, 28, 25, 8 %%>;
    barArrBaseMarginTop = <%% 48, 46, 40, 32, 9.5 %%>;

    barArrTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

    percentageSize = <%% 18, 18, 16, 14, 3.3 %%>;
    percentageTextTop = <%% -2, -2, -2, -2, 0.2 %%>;

    formPanBasePaddingBottom = <%% 16, 14, 12, 8, 2 %%>;

    thisForm = await ajaxJson({ mode: "get", proid, desid }, SECONDHOST + "/projectDesignerStatus", { equal: true });
  
    contents = {
      title: [
        desktop ? project.name + "님&nbsp;&nbsp;<b%상태 관리하기 >%b>" : project.name + "&nbsp;&nbsp;<b%관리하기 >%b>",
      ],
      description: [
        "고객님의 프로젝트 진행 상황을 알려드립니다.",
        "문제가 있는 부분이 있다면 홈리에종에 연락 주세요!",
      ],
      form: thisForm,
      button: "공유하기",
    };

    colorArr = [
      colorChip.gradientGreen,
    ];

    reloadBarArr = () => {};
    barArrBase = {};

    grayTong = createNode({
      mother: whiteTong,
      style: {
        display: "block",
        position: "relative",
        paddingTop: String(innerMargin) + ea,
        paddingBottom: String(desktop ? innerMargin : 0) + ea,
        paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
        paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
        width: withOut(innerMargin * 2, ea),
        background: colorChip.white,
      }
    });
  
    mainTong = createNode({
      mother: grayTong,
      style: {
        display: "flex",
        width: withOut(0),
        flexDirection: desktop ? "row" : "",
        justifyContent: desktop ? "start" : "",
        alignItems: desktop ? "start" : "",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(firstWidth) + ea,
            verticalAlign: "top",
            top: mobile ? String(isIphone() ? 0.3 : 0.1) + ea : ""
          },
          children: [
            {
              text: contents.title.join(desktop ? "\n" : " "),
              attribute: {
                proid: project.proid,
              },
              event: {
                click: function (e) {
                  const proid = this.getAttribute("proid");
                  blankHref(FRONTHOST + "/designer/process.php?proid=" + proid);
                }
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(veryBigSize) + ea,
                fontWeight: String(veryBigWeight),
                color: colorChip.black,
                lineHeight: String(1.5),
                top: desktop ? String(veryBigTextTop) + ea : "",
              },
              bold: {
                fontSize: String(printSize) + ea,
                fontWeight: String(400),
                color: colorChip.green,
                cursor: "pointer",
              }
            }
          ]
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: withOut(firstWidth, ea),
            verticalAlign: "top",
            flexDirection: "column",
          }
        }
      ]
    });
  
    contentsTong = mainTong.children[1];
  
    barArrBase = createNode({
      mother: contentsTong,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        width: withOut(0),
        justifyContent: "start",
        alignItems: "start",
      }
    });

    reloadBarArr = (barArrBase, thisForm) => {

      cleanChildren(barArrBase);

      childrenMaxNumber = thisForm.reduce((acc, curr) => {
        return acc + curr.children.filter((obj) => { return obj.deactive !== true }).length;
      }, 0);
  
      finalValueNumber = 0;
      for (let i = 0; i < thisForm.length; i++) {
        thisValueNumber = thisForm[i].children.filter((obj) => { return obj.value !== 0 }).length;
        finalValueNumber = thisValueNumber + finalValueNumber;
      }

      barArrBlock = createNode({
        mother: barArrBase,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          width: withOut(0),
          height: desktop ? String(barBaseHeight) + ea : "",
        }
      });

      createNode({
        mother: barArrBlock,
        style: {
          display: "flex",
          position: "relative",
          width:  String(barFirstWidth) + ea,
          height: withOut(0, ea),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          marginBottom: desktop ? "" : String(2) + ea,
        },
        child: {
          text: String(Math.round((finalValueNumber / childrenMaxNumber) * 100)) + "<b%%%b>",
          style: {
            fontSize: String(percentageSize) + ea,
            fontWeight: String(500),
            fontFamily: "graphik",
            color: colorChip.black,
            position: "relative",
            top: String(percentageTextTop) + ea,
          },
          bold: {
            fontSize: String(percentageSize) + ea,
            fontWeight: String(500),
            fontFamily: "graphik",
            color: colorChip.softGreen,
          }
        }
      })

      barArrBlockValuesBase = createNode({
        mother: barArrBlock,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          width: withOut(barFirstWidth, ea),
          height: String(barFactorHeight) + ea,
          borderRadius: String(5) + "px",
          top: mobile ? String(-0.3) + ea : "",
          overflow: "hidden",
        },
        child: {
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: withOut(0),
            height: withOut(0),
            background: colorChip.gradientGreen,
          }
        }
      });

      for (let j = 0; j < childrenMaxNumber; j++) {
  
        createNode({
          mother: barArrBlockValuesBase,
          style: {
            display: "inline-block",
            position: "relative",
            height: String(barFactorHeight) + ea,
            width: "calc(calc(100% - " + String(barFactorBetween * (childrenMaxNumber - 1)) + ea + ") / " + String(childrenMaxNumber) + ")",
            background: j < finalValueNumber ? "transparent" : colorChip.gray2,
            marginRight: j !== childrenMaxNumber - 1 ? String(barFactorBetween) + ea : "",
          }
        });

      }

    }

    reloadBarArr(barArrBase, thisForm);
  
    return grayTong;

  } catch (e) {
    console.log(e);
  }
}

DesignerBoardJs.prototype.insertFormsBox = async function () {
  const instance = this;
  const mother = this.mother;
  const { clients, projects, requestNumber, ea, baseTong, media, desid } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const nameTypeClassName = "nameTypeClassName";
  const timelineTypeClassName = "timelineTypeClassName";
  const nameBlankTypeClassName = "nameBlankTypeClassName";
  const statusTypeClassName = "statusTypeClassName";
  const moveTargetClassName = "moveTargetClassName";
  const todayLineClassName = "todayLineClassName";
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, selfHref, getDateMatrix, findByAttribute } = GeneralJs;
  try {
    let currentTargets;
    let whiteBlock;
    let whiteTong;
    let bottomMargin;
    let margin;
    let paddingTop;
    let whiteBottomMargin;
    let blockBetweenBottom;
    let thisBase;
    let num;
    let blockBetween;
    let dateMatrix;
    let pastDateMatrix;
    let baseMatrix;
    let delta;
    let tempDateMatrix;
    let standardDate;
    let basicBase;
    let scrollTong;
    let dateTong;
    let thisDateBox;
    let previousDate;
    let dateBoxHeight;
    let dateBoxPaddingTop;
    let factorDateBoxHeight;
    let factorDateBoxPaddingTop;
    let unitBoxWidth;
    let fridayMargin;
    let backgroundColor;
    let unitBetween;
    let nameAreaWidth;
    let nameTong;
    let textTop;
    let buttonWidth;
    let buttonBetween;
    let arrowWidth;
    let move;
    let dateSize, dateWeight;
    let todayLineTop;
    let todayLineWidth;
    let monthTop, monthSize, monthWeight;
    let spreadHeight;
    let nameSize, nameWeight, nameBoldWeight;
    let iframeSrc;
    let iframeBase;
    let zoom;
    let iframeOpenEvent;

    delta = 18;

    bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
    margin = <%% 55, 55, 47, 39, 4 %%>;
    paddingTop = <%% 44, 44, 36, 34, 5.4 %%>;
    whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;
    blockBetweenBottom = <%% 10, 4, 4, 4, 2.2 %%>;
    blockBetween = <%% 14, 14, 12, 10, 2 %%>;

    dateBoxHeight = <%% 20, 20, 18, 16, 3.2 %%>;
    dateBoxPaddingTop = <%% 16, 16, 14, 12, 1 %%>;

    factorDateBoxHeight = <%% 20, 20, 18, 16, 3.2 %%>;
    factorDateBoxPaddingTop = <%% 6, 5, 4, 3, 1 %%>;

    unitBoxWidth = <%% 20, 20, 18, 16, 3.2 %%>;

    fridayMargin = <%% 4, 4, 3, 2, 1 %%>;

    unitBetween = <%% 1, 1, 1, 1, 0.2 %%>;

    nameAreaWidth = <%% 110, 100, 90, 75, 10 %%>;

    buttonWidth = <%% 18, 18, 16, 14, 1 %%>;
    buttonBetween = <%% 2, 2, 2, 1, 1 %%>;

    arrowWidth = <%% 8, 8, 7, 6, 1 %%>;

    move = 500;

    dateSize = <%% 10, 10, 10, 10, 2.5 %%>;
    dateWeight = <%% 400, 400, 400, 400, 400 %%>;

    todayLineTop = <%% -16, -16, -14, -12, -1 %%>;
    todayLineWidth = <%% 8, 8, 6, 6, 1 %%>;

    monthTop = <%% -20, -20, -18, -16, -4 %%>;
    monthSize = <%% 12, 11, 11, 10, 2.5 %%>;
    monthWeight = <%% 800, 800, 800, 800, 800 %%>;

    spreadHeight = <%% 675, 565, 515, 410, (isIphone() ? 118 : 128) %%>;

    nameSize = <%% 14, 13, 12, 10, 2.7 %%>;
    nameWeight = <%% 300, 300, 300, 300, 300 %%>;
    nameBoldWeight = <%% 600, 600, 600, 600, 600 %%>;

    zoom = <%% 1, 1, 0.98, 0.78, 1.2 %%>;

    iframeOpenEvent = () => {
      return function (e) {
        const proid = this.getAttribute("proid");
        const target0 = findByAttribute(document.querySelectorAll('.' + nameBlankTypeClassName), "proid", proid);
        const target1 = findByAttribute(document.querySelectorAll('.' + statusTypeClassName), "proid", proid);
        const toggle = target0.getAttribute("toggle");
        if (toggle === "off") {
          target0.style.height = String(spreadHeight) + ea;
          target1.style.height = String(spreadHeight) + ea;
          target0.setAttribute("toggle", "on");
          target1.setAttribute("toggle", "on");
        } else {
          target0.style.height = String(0) + ea;
          target1.style.height = String(0) + ea;
          target0.setAttribute("toggle", "off");
          target1.setAttribute("toggle", "off");
        }

        target1.querySelector("iframe").contentWindow.document.querySelector("html").style.zoom = String(zoom);

        if ([ ...document.querySelectorAll('.' + nameBlankTypeClassName) ].every((dom) => { return dom.getAttribute("toggle") === "off" })) {
          document.querySelector("." + todayLineClassName).style.opacity = String(1);
        } else {
          document.querySelector("." + todayLineClassName).style.opacity = String(0);
        }
      }
    }

    standardDate = new Date();
    standardDate.setDate(standardDate.getDate() - 18);
    dateMatrix = getDateMatrix();
    pastDateMatrix = dateMatrix.previousMatrix();

    baseMatrix = equalJson(JSON.stringify(pastDateMatrix.matrix.flat().filter((o) => { return o !== null }).filter((o) => { return o.day !== "일" && o.day !== "토" })));
    baseMatrix = baseMatrix.concat(equalJson(JSON.stringify(dateMatrix.matrix.flat().filter((o) => { return o !== null }).filter((o) => { return o.day !== "일" && o.day !== "토" }))));

    tempDateMatrix = dateMatrix.nextMatrix();
    for (let i = 0; i < delta; i++) {
      baseMatrix = baseMatrix.concat(equalJson(JSON.stringify(tempDateMatrix.matrix.flat().filter((o) => { return o !== null }).filter((o) => { return o.day !== "일" && o.day !== "토" }))));
      tempDateMatrix = tempDateMatrix.nextMatrix();
    }
    baseMatrix = baseMatrix.filter((o) => { return o.dateObject.valueOf() >= standardDate.valueOf() });
    baseMatrix = baseMatrix.slice(baseMatrix.findIndex((o) => { return o.day === "월" }));

    textTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.1 %%>;

    currentTargets = equalJson(JSON.stringify(projects));
    currentTargets = currentTargets.filter((obj) => {
      return (!/드[랍롭]/gi.test(obj.process.status) && !/홀[드딩]/gi.test(obj.process.status) && !/완료/gi.test(obj.process.status));
    })
    currentTargets.sort((a, b) => {
      const emptyValue = Math.abs((new Date(1200, 0, 1)).valueOf());
      let aConst, bConst;

      if (/드[랍롭]/gi.test(a.process.status) || /홀[드딩]/gi.test(a.process.status)) {
        aConst = 1;
      } else if (/완료/gi.test(a.process.status)) {
        aConst = 10000;
      } else {
        aConst = 100000000;
      }

      if (/드[랍롭]/gi.test(b.process.status) || /홀[드딩]/gi.test(b.process.status)) {
        bConst = 1;
      } else if (/완료/gi.test(b.process.status)) {
        bConst = 10000;
      } else {
        bConst = 100000000;
      }

      return ((b.process.contract.form.date.from.valueOf() + emptyValue) * bConst) - ((a.process.contract.form.date.from.valueOf() + emptyValue) * aConst);
    });

    if (currentTargets.length > 0) {
      whiteBlock = createNode({
        mother: baseTong,
        style: {
          position: "relative",
          borderRadius: String(desktop ? 8 : 1) + ea,
          width: String(100) + '%',
          background: colorChip.white,
          paddingTop: String(paddingTop) + ea,
          paddingBottom: String(desktop ? whiteBottomMargin - blockBetweenBottom : 6.6) + ea,
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
  
      if (desktop) {
        createNode({
          mother: whiteTong,
          style: {
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String((buttonWidth * 3) + (buttonBetween * 2)) + ea,
            height: String(buttonWidth) + ea,
            zIndex: String(2),
          },
          children: [
            {
              event: {
                click: function (e) {
                  const translateFunc = function (past) {
                    const newValue = Number(past.replace(/[^0-9\-\.]/g, '')) + move;
                    return ("translateX(" + String(newValue) + ea + ")");
                  }
                  let targets;
                  targets = document.querySelectorAll("." + moveTargetClassName);
                  for (let target of targets) {
                    if (target.style.transform === '') {
                      target.style.transform = "translateX(" + String(move) + ea + ")";
                    } else {
                      target.style.transform = translateFunc(target.style.transform);
                    }
                    if (Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) > 0) {
                      target.style.transform = "translateX(0px)";
                    } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-\.]/g, ''))) {
                      target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) + ea + ")";
                    }
                  }
                }
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(buttonWidth) + ea,
                height: String(buttonWidth) + ea,
                marginRight: String(buttonBetween) + ea,
                borderRadius: String(3) + "px",
                background: colorChip.gradientGray,
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              },
              child: {
                mode: "svg",
                source: instance.mother.returnArrow("left", colorChip.white),
                style: {
                  position: "relative",
                  width: String(arrowWidth) + ea,
                }
              },
            },
            {
              event: {
                click: function (e) {
                  const translateFunc = function (past) {
                    const newValue = Number(past.replace(/[^0-9\-\.]/g, '')) - move;
                    return ("translateX(" + String(newValue) + ea + ")");
                  }
                  let targets;
                  targets = document.querySelectorAll("." + moveTargetClassName);
                  for (let target of targets) {
                    if (target.style.transform === '') {
                      target.style.transform = "translateX(" + String(-1 * move) + ea + ")";
                    } else {
                      target.style.transform = translateFunc(target.style.transform);
                    }
                  }
                }
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(buttonWidth) + ea,
                height: String(buttonWidth) + ea,
                marginRight: String(buttonBetween) + ea,
                borderRadius: String(3) + "px",
                background: colorChip.gradientGray,
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              },
              child: {
                mode: "svg",
                source: instance.mother.returnArrow("right", colorChip.white),
                style: {
                  position: "relative",
                  width: String(arrowWidth) + ea,
                }
              },
            },
            {
              event: function (e) {
                const targets0 = [ ...document.querySelectorAll('.' + nameBlankTypeClassName) ];
                const targets1 = [ ...document.querySelectorAll('.' + statusTypeClassName) ];
                const toggle = targets0.some((dom) => { return dom.getAttribute("toggle") !== "on" });
                if (toggle) {
                  for (let i = 0; i < targets0.length; i++) {
                    targets0[i].style.height = String(spreadHeight) + ea;
                    targets1[i].style.height = String(spreadHeight) + ea;
                    targets0[i].setAttribute("toggle", "on");
                    targets1[i].setAttribute("toggle", "on");
                  }
                } else {
                  for (let i = 0; i < targets0.length; i++) {
                    targets0[i].style.height = String(0) + ea;
                    targets1[i].style.height = String(0) + ea;
                    targets0[i].setAttribute("toggle", "off");
                    targets1[i].setAttribute("toggle", "off");
                  }
                }
  
                for (let target1 of targets1) {
                  target1.querySelector("iframe").contentWindow.document.querySelector("html").style.zoom = String(zoom);
                }
  
                if ([ ...document.querySelectorAll('.' + nameBlankTypeClassName) ].every((dom) => { return dom.getAttribute("toggle") === "off" })) {
                  document.querySelector("." + todayLineClassName).style.opacity = String(1);
                } else {
                  document.querySelector("." + todayLineClassName).style.opacity = String(0);
                }
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(buttonWidth) + ea,
                height: String(buttonWidth) + ea,
                borderRadius: String(3) + "px",
                background: colorChip.gradientGreen,
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              },
              child: {
                style: {
                  position: "relative",
                  width: String(arrowWidth) + ea,
                  height: String(arrowWidth) + ea,
                  borderRadius: String(arrowWidth) + ea,
                  background: colorChip.white,
                }
              },
            },
          ]
        });
      }
  
      basicBase = createNode({
        mother: whiteTong,
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          height: "auto",
          width: withOut(0, ea),
        }
      });
      nameTong = createNode({
        mother: basicBase,
        style: {
          display: "inline-block",
          position: "relative",
          width: String(nameAreaWidth) + ea,
          paddingTop: String(desktop ? dateBoxPaddingTop : 3) + ea,
          verticalAlign: "top",
        }
      });
      scrollTong = createNode({
        mother: basicBase,
        style: {
          display: "inline-block",
          position: "relative",
          width: withOut(nameAreaWidth, ea),
          overflow: desktop ? "hidden" : "",
          paddingTop: String(desktop ? dateBoxPaddingTop : 3) + ea,
          verticalAlign: "top",
        }
      });
      if (mobile) {
        scrollTong.style["overflow-x"] = "scroll";
        scrollTong.style["overflow-y"] = "hidden";
      }
  
      createNode({
        mother: nameTong,
        style: {
          height: String(dateBoxHeight) + ea,
          display: "block",
          position: "relative",
          width: withOut(0, ea),
        }
      });
  
      dateTong = createNode({
        mother: scrollTong,
        class: [ moveTargetClassName ],
        style: {
          display: "block",
          position: "relative",
          width: String((unitBoxWidth * 2) * baseMatrix.length) + ea,
          height: String(dateBoxHeight) + ea,
          zIndex: String(2),
          transition: desktop ? "all 0.3s ease" : "all 0s ease",
        }
      });
      num = 0;
      for (let { day, dateObject } of baseMatrix) {

        thisDateBox = createNode({
          mother: dateTong,
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(unitBoxWidth) + ea,
            marginRight: String(day === "금" ? 0 : unitBetween) + ea,
            height: withOut(0, ea),
            background: desktop ? colorChip.gray0 : colorChip.white,
            justifyContent: "center",
            alignItems: "center",
            verticalAlign: "top",
          },
          child: {
            text: String(dateObject.getDate()),
            style: {
              position: "relative",
              top: String(textTop) + ea,
              fontSize: String(dateSize) + ea,
              fontWeight: String(dateWeight),
              color: colorChip.black,
            }
          }
        });

        if (day === "월") {
          thisDateBox.style.borderTopLeftRadius = String(3) + "px";
          thisDateBox.style.borderBottomLeftRadius = String(3) + "px";
        } else if (day === "금") {
          thisDateBox.style.borderTopRightRadius = String(3) + "px";
          thisDateBox.style.borderBottomRightRadius = String(3) + "px";
        }

        if (dateToString(dateObject) === dateToString(new Date())) {
          createNode({
            mother: thisDateBox,
            class: [ todayLineClassName ],
            style: {
              display: "flex",
              position: "absolute",
              top: String(todayLineTop) + ea,
              width: String(todayLineWidth) + ea,
              left: String((unitBoxWidth / 2) - (todayLineWidth / 2)) + ea,
              height: desktop ? String((dateBoxHeight + factorDateBoxPaddingTop) + ((factorDateBoxPaddingTop + factorDateBoxPaddingTop + factorDateBoxHeight + 2) * currentTargets.length) - factorDateBoxPaddingTop + Math.abs(todayLineTop)) + ea : "calc(calc(" + String(dateBoxHeight + factorDateBoxPaddingTop) + ea + " + " + "calc(calc(" + String(factorDateBoxPaddingTop + factorDateBoxPaddingTop + factorDateBoxHeight) + ea + " + 2px) * " + String(currentTargets.length) + ")" + ") + " + "calc(" + String(Math.abs(todayLineTop) - factorDateBoxPaddingTop) + ea + ")" + ")",
              borderTop: "1px solid " + colorChip.yellow,
              borderBottom: "1px solid " + colorChip.yellow,
              boxSizing: "border-box",
              justifyContent: "center",
              alignItems: "center",
              transition: desktop ? "all 0.3s ease" : "all 0s ease",
            },
            child: {
              style: {
                position: "relative",
                width: String(0),
                height: withOut(0, ea),
                borderRight: "1px solid " + colorChip.yellow,
              }
            }
          });
        }
  
        previousDate = new Date(JSON.stringify(dateObject).slice(1, -1));
        previousDate.setDate(previousDate.getDate() - 1);
        if (previousDate.getMonth() !== dateObject.getMonth()) {
          num = 0;
        }
  
        if (num === 0) {
          createNode({
            mother: thisDateBox,
            style: {
              position: "absolute",
              width: String(unitBoxWidth) + ea,
              textAlign: "center",
              top: String(monthTop) + ea,
              left: String(0) + ea,
            },
            child: {
              text: String(dateObject.getMonth() + 1),
              style: {
                fontSize: String(monthSize) + ea,
                fontWeight: String(monthWeight),
                color: colorChip.black,
              },
            }
          });
        }
  
        if (day === "금") {
          createNode({
            mother: dateTong,
            style: {
              display: "inline-block",
              position: "relative",  
              width: String(fridayMargin) + ea,
              height: withOut(0, ea),
              borderRight: "1px dashed " + colorChip.gray3,
              marginRight: String(fridayMargin) + ea,
              verticalAlign: "top",
            }
          });
        }
  
        num++;
      }
  
      currentTargets.sort((a, b) => {
        return a.process.contract.form.date.from.valueOf() - b.process.contract.form.date.from.valueOf();
      });
      num = 0;
      for (let project of currentTargets) {
  
        if ((new RegExp(FRONTHOST.split("//")[1], "gi")).test(window.location.host)) {
          iframeSrc = FRONTHOST + "/designer/process.php?proid=" + project.proid + "&only=status&view=test" + (desktop ? "" : "&onlymode=mobile");
        } else {
          iframeSrc = "/middle/processDetail?proid=" + project.proid + "&only=status&view=test" + (desktop ? "" : "&onlymode=mobile");
        }

        createNode({
          mother: nameTong,
          class: [ nameTypeClassName ],
          attribute: {
            proid: project.proid,
            type: "name",
          },
          event: {
            mouseenter: function (e) {
              if (desktop) {
                this.firstChild.style.color = colorChip.green;
              }
            },
            mouseleave: function (e) {
              if (desktop) {
                this.firstChild.style.color = colorChip.black;
              }
            },
            touch: iframeOpenEvent(),
          },
          style: {
            paddingTop: String(factorDateBoxPaddingTop) + ea,
            height: String(factorDateBoxHeight) + ea,
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "start",
            alignItems: "center",
            cursor: "pointer",
            flexDirection: "row",
          },
          child: {
            text: desktop ? project.name + "<b% - " + project.process.status + "%b>" : project.name,
            style: {
              position: "relative",
              top: String(textTop) + ea,
              fontSize: String(nameSize) + ea,
              fontWeight: String(nameBoldWeight),
              color: colorChip.black,
              transition: desktop ? "all 0.3s ease" : "all 0s ease",
            },
            bold: {
              fontSize: String(nameSize) + ea,
              fontWeight: String(nameWeight),
              color: colorChip.deactive,
            }
          }
        });
        dateTong = createNode({
          mother: scrollTong,
          class: [ timelineTypeClassName, moveTargetClassName ],
          attribute: {
            proid: project.proid,
            type: "timeline",
          },
          event: {
            click: iframeOpenEvent(),
          },
          style: {
            display: "block",
            position: "relative",
            width: String((unitBoxWidth * 2) * baseMatrix.length) + ea,
            paddingTop: String(factorDateBoxPaddingTop) + ea,
            height: String(factorDateBoxHeight) + ea,
            transition: desktop ? "all 0.3s ease" : "all 0s ease",
            cursor: "pointer",
          }
        });
  
        createNode({
          mother: nameTong,
          class: [ nameBlankTypeClassName ],
          attribute: {
            proid: project.proid,
            type: "nameBlank",
            toggle: "off",
          },
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            height: String(0) + ea,
            borderRadius: String(5) + "px",
            border: "1px solid " + colorChip.gray2,
            boxSizing: "border-box",
            marginTop: String(factorDateBoxPaddingTop) + ea,
            overflow: "hidden",
            opacity: String(0),
            transition: desktop ? "all 0.3s ease" : "all 0s ease",
          },
        });
        iframeBase = createNode({
          mother: scrollTong,
          class: [ statusTypeClassName ],
          attribute: {
            proid: project.proid,
            type: "status",
            toggle: "off",
          },
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            height: String(0) + ea,
            borderRadius: String(5) + "px",
            border: "1px solid " + colorChip.gray2,
            boxSizing: "border-box",
            marginTop: String(factorDateBoxPaddingTop) + ea,
            overflow: "hidden",
            transition: desktop ? "all 0.3s ease" : "all 0s ease",
          },
          child: {
            mode: "iframe",
            attribute: { src: iframeSrc },
            style: {
              position: "absolute",
              display: "block",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              border: String(0),
            }
          }
        });
        iframeBase.querySelector("iframe").contentWindow.document.querySelector("html").style.zoom = String(zoom);
  
        for (let { day, dateObject } of baseMatrix) {
  
          backgroundColor = colorChip.gray1;
          if (project.process.contract.form.date.from.valueOf() <= dateObject.valueOf()) {
            if (project.process.contract.form.date.to.valueOf() >= dateObject.valueOf()) {
              backgroundColor = colorChip.softGreen;
            }
          }
  
          thisDateBox = createNode({
            mother: dateTong,
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(unitBoxWidth) + ea,
              marginRight: String(day === "금" ? 0 : unitBetween) + ea,
              height: withOut(0, ea),
              background: backgroundColor,
              justifyContent: "center",
              alignItems: "center",
              verticalAlign: "top",
            },
          });

          if (day === "월") {
            thisDateBox.style.borderTopLeftRadius = String(3) + "px";
            thisDateBox.style.borderBottomLeftRadius = String(3) + "px";
          } else if (day === "금") {
            thisDateBox.style.borderTopRightRadius = String(3) + "px";
            thisDateBox.style.borderBottomRightRadius = String(3) + "px";
          }

          if (day === "금") {
            createNode({
              mother: dateTong,
              style: {
                display: "inline-block",
                position: "relative",  
                width: String(fridayMargin) + ea,
                height: withOut(0, ea),
                borderRight: "1px dashed " + colorChip.gray3,
                marginRight: String(fridayMargin) + ea,
                verticalAlign: "top",
              }
            });
          }
        }
        
        num++;
      }
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerBoardJs.prototype.insertStatusCheck = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, projects } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray, findByAttribute, setQueue, homeliaisonAnalytics } = GeneralJs;
  const buttonsClassName = "buttonsClassName";
  let margin;
  let paddingTop;
  let whiteBottomMargin;
  let titleFontSize;
  let bottomMargin;
  let whiteBlock;
  let grayTong;
  let contents;
  let innerMargin;
  let arrowWidth, arrowHeight;
  let textTop;
  let textSize, textWeight;
  let textMarginLeft;
  let mobileVisualPaddingValue;
  let button, buttons;
  let blockBetween;
  let blockBetweenBottom;
  let blockHeight;
  let lineTop;
  let columnsNumber;
  let textFileWeight;
  let whitePadding;
  let smallSize, smallWeight, smallBetween;
  let textTextTop;
  let smallTextTop;
  let panDom;
  let veryBigSize;
  let veryBigWeight;
  let firstWidth;
  let buttonWidth, buttonHeight;
  let buttonOuterPadding, buttonInnerMargin;
  let descriptionBetween;
  let panWidth, panVisualLeft;
  let veryBigTextTop;
  let circleWidth, circleTop, circleLeft;
  let subButtonWidth;
  let whiteTong;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4 %%>;
  paddingTop = <%% 44, 44, 36, 34, 5.4 %%>;

  whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  veryBigSize = <%% 23, 21, 20, 16, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  veryBigTextTop = <%% -1, -1, -2, -1, -1 %%>;

  innerMargin = <%% 0, 0, 0, 0, 1 %%>;

  textTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;
  smallTextTop = <%% (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), 0 %%>;

  textSize = <%% 14, 14, 13, 12, 3.2 %%>;
  textWeight = <%% 700, 700, 700, 700, 700 %%>;
  textFileWeight = <%% 400, 400, 400, 400, 400 %%>;

  whitePadding = <%% 12, 12, 8, 8, 2.2 %%>;

  blockBetween = <%% 36, 28, 26, 24, 5 %%>;
  blockBetweenBottom = <%% 10, 4, 4, 4, 2.2 %%>;
  blockHeight = <%% 36, 36, 32, 26, 4 %%>;

  lineTop = <%% 18, 18, 16, 13, 1.9 %%>;

  columnsNumber = <%% 4, 3, 3, 3, 2 %%>;

  smallSize = <%% 11, 11, 10, 10, 2.5 %%>;
  smallWeight = <%% 400, 400, 400, 400, 400 %%>;
  smallBetween = <%% 5, 5, 4, 4, 0 %%>;

  firstWidth = <%% 298, 220, 203, 130, 300 %%>;

  buttonWidth = <%% 490, 320, 285, 230, 72 %%>;
  buttonHeight = <%% 36, 40, 33, 31, 8 %%>;

  buttonOuterPadding = <%% 4, 4, 4, 3, 1 %%>;
  buttonInnerMargin = <%% 4, 4, 4, 3, 1 %%>;

  descriptionBetween = <%% 13, 14, 14, 12, 1 %%>;

  panWidth = <%% 20, 20, 20, 20, 2 %%>;
  panVisualLeft = <%% 1, 1, 1, 1, 1 %%>;

  circleWidth = <%% 5, 5, 5, 4, 0.8 %%>;
  circleTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 1.2 %%>;
  circleLeft = <%% -7, -7, -7, -5, -0.7 %%>;

  arrowWidth = <%% 18, 16, 15, 14, 3.6 %%>;
  arrowHeight = <%% 8, 8, 8, 7, 2 %%>;

  subButtonWidth = <%% 90, 70, 70, 56, 15 %%>;

  mobileVisualPaddingValue = 0.0;

  contents = {
    title: [
      big ? "프로젝트의 상태를" : "프로젝트 상태를",
      big ? "모두 체크해 주세요!" : "체크해 주세요!",
    ],
    description: [
      (veryBig ? [
        "현재 진행중인 홈스타일링 프로젝트들의 구체적인 상태를",
        "모두 기입해주세요! 상태 체크를 해주셔야",
      ] : [
        "진행중 홈스타일링 프로젝트의 상태를",
        "모두 기입해주세요! 체크를 해주셔야",
      ]),
      (veryBig ? [
        "고객님께 정확한 진행바가 공유가 되고, 홈리에종에도",
        "별도의 전화 통화를 할 필요 없이 진행 상황을 공유할 수 있습니다!",
      ] : [
        "고객님께 정확한 진행바가 공유가 되고",
        "홈리에종에도 별도로 통화를 할 필요 없이",
        "진행 상황을 공유할 수 있습니다!",
      ]),
    ],
  };

  contents.buttonSet = [
    [
      [
        {
          title: "전체",
          active: true,
          click: null,
        },
        {
          title: String(projects.filter((p) => { return /^[진대]/gi.test(p.process.status) }).length) + "건",
          active: true,
          click: null,
        },
      ],
      [
        {
          title: "대기",
          active: false,
          click: null,
        },
        {
          title: String(projects.filter((p) => { return /^[대]/gi.test(p.process.status) }).length) + "건",
          active: false,
          click: null,
        },
      ],
      [
        {
          title: "진행중",
          active: true,
          click: null,
        },
        {
          title: String(projects.filter((p) => { return /^[진]/gi.test(p.process.status) }).length) + "건",
          active: true,
          click: null,
        },
      ],
    ],
  ];


  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(desktop ? whiteBottomMargin - blockBetweenBottom : 6.6) + ea,
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

  grayTong = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(innerMargin) + ea,
      paddingBottom: String(desktop ? innerMargin : 0) + ea,
      paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
      paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
      width: withOut(innerMargin * 2, ea),
      background: colorChip.white,
      borderRadius: String(8) + "px",
    }
  });

  createNode({
    mother: grayTong,
    style: {
      display: desktop ? "flex" : "block",
      width: withOut(0),
      flexDirection: desktop ? "row" : "",
      justifyContent: desktop ? "start" : "",
      alignItems: desktop ? "start" : "",
      textAlign: desktop ? "" : "center",
    },
    children: [
      {
        style: {
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? String(firstWidth) + ea : withOut(0, ea),
          justifyContent: desktop ? "" : "center",
          alignItems: desktop ? "" : "center",
          textAlign: desktop ? "" : "center",
          marginTop: desktop ? "" : String(2.8) + ea,
          marginBottom: desktop ? "" : String(3) + ea,
        },
        children: [
          {
            text: contents.title.join(desktop ? "\n" : " "),
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(veryBigSize) + ea,
              fontWeight: String(veryBigWeight),
              color: colorChip.black,
              lineHeight: String(1.5),
              top: desktop ? String(veryBigTextTop) + ea : "",
            },
            child: {
              style: {
                display: "inline-block",
                position: "absolute",
                top: String(circleTop) + ea,
                left: String(circleLeft) + ea,
                width: String(circleWidth) + ea,
                height: String(circleWidth) + ea,
                borderRadius: String(circleWidth) + ea,
                background: colorChip.red,
              }
            }
          }
        ]
      },
      {
        style: {
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? withOut(firstWidth + ((buttonWidth + buttonOuterPadding + buttonOuterPadding) * contents.buttonSet.length) + (buttonOuterPadding * (contents.buttonSet.length - 1)), ea) : withOut(0, ea),
          flexDirection: "column",
          marginBottom: desktop ? "" : String(7.2) + ea,
        },
        children: [
          {
            style: {
              display: veryBig ? "display" : "none",
              position: "absolute",
              top: String(0),
              left: String(panVisualLeft) + ea,
              width: String(panWidth) + ea,
              height: String((buttonHeight * contents.buttonSet[0].length) + (buttonInnerMargin * (contents.buttonSet[0].length - 1)) + (buttonOuterPadding * 2)) + ea,
              borderBottom: String(3) + "px solid " + colorChip.black,
              boxSizing: "border-box",
            }
          },
          {
            text: contents.description[0].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              marginBottom: String(descriptionBetween) + ea,
              textAlign: desktop ? "" : "center",
            }
          },
          {
            text: contents.description[1].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              textAlign: desktop ? "" : "center",
            }
          },
        ]
      },
      ...variableArray(contents.buttonSet.length).map((i) => {
        return {
          style: {
            display: "inline-flex",
            position: "relative",
            borderRadius: String(8) + "px",
            background: i !== contents.buttonSet.length - 1 ? colorChip.gray3 : colorChip.gray3,
            padding: String(buttonOuterPadding) + ea,
            flexDirection: "column",
            marginRight: i !== contents.buttonSet.length - 1 ? String(buttonOuterPadding) + ea : "",
          },
          children: variableArray(contents.buttonSet[i].length).map((index, z) => {
            return {
              style: {
                display: "flex",
                flexDirection: "row",
              },
              children: [
                {
                  style: {
                    width: String(buttonHeight) + ea,
                    height: String(buttonHeight) + ea,
                    marginRight: String(buttonInnerMargin) + ea,
                    display: "inline-flex",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray1,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    mode: "svg",
                    source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.deactive),
                    style: {
                      position: "relative",
                      width: String(arrowWidth) + ea,
                    }
                  }
                },
                {
                  style: {
                    width: String(buttonHeight) + ea,
                    height: String(buttonHeight) + ea,
                    marginRight: String(buttonInnerMargin) + ea,
                    display: media[0] ? "inline-flex" : "none",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray0,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: String(z + 1),
                    style: {
                      position: "relative",
                      top: String(desktop ? -1 : -0.3) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontFamily: "graphik",
                      fontStyle: "italic",
                      fontWeight: String(500),
                      color: contents.buttonSet[i][index][0].active ? colorChip.green : colorChip.deactive,
                    }
                  }
                },
                {
                  style: {
                    width: String(subButtonWidth) + ea,
                    height: String(buttonHeight) + ea,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray0,
                    marginRight: String(buttonInnerMargin) + ea,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    cursor: "pointer",
                  },
                  child: {
                    text: contents.buttonSet[i][index][0].title,
                    style: {
                      position: "relative",
                      top: String(textTextTop) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontWeight: String(500),
                      color: contents.buttonSet[i][index][0].active ? colorChip.black : colorChip.deactive,
                    }
                  }
                },
                {
                  style: {
                    width: String(buttonWidth - ((buttonInnerMargin + buttonHeight) * (media[0] ? 2 : 1)) - (subButtonWidth + buttonInnerMargin)) + ea,
                    height: String(buttonHeight) + ea,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.white,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                  },
                  child: {
                    text: contents.buttonSet[i][index][1].title,
                    style: {
                      position: "relative",
                      top: String(textTextTop) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontWeight: String(textWeight),
                      color: contents.buttonSet[i][index][1].active ? colorChip.green : colorChip.deactive,
                    }
                  }
                },
              ]
            }
          })
        };
      })
    ]
  })

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
    const entireMode = (getObj.entire === "true");
    const normalMode = (entireMode && getObj.normal === "true");
    const adminMode = (getObj.admin === "true");
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

    this.entireMode = entireMode;
    this.normalMode = normalMode;
    this.adminMode = adminMode;

    if (!entireMode) {
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
            if (getObj.mode === "status") {
              instance.insertStatusCheck();
            }
            instance.insertRouterBox();
            await instance.insertFormsBox();
            instance.insertProcessBox();
            instance.insertReleaseBox();
            instance.insertPortfolioBase();
  
          } catch (e) {
            await GeneralJs.ajaxJson({ message: "DesignerBoardJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
          }
        }
      });
    } else {
      instance.insertProcessBox();
      instance.insertReleaseBox();
    }

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
