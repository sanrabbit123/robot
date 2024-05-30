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

ClientEvaluationJs.binaryPath = FRONTHOST + "/middle/style";

ClientEvaluationJs.prototype.generateTotalValues = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, ajaxJson, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight, baseTop, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  try {
    const clientHistory = this.clientHistory;
    let totalValues, totalMenu;

    totalValues = (new Array(this.questionNumber)).fill(null, 0);
    totalMenu = (await ajaxJson({ mode: "get" }, BACKHOST + "/styleCuration_getTotalMenu", { equal: true })).totalMenu.map((o) => { return o.values });

    instance.totalValues = objectDeepCopy(totalValues);
    instance.totalMenu = objectDeepCopy(totalMenu)

    return { totalValues, totalMenu };
  } catch (e) {
    console.log(e);
  }
}

ClientEvaluationJs.prototype.updateImmediately = async function (valueIndex, menuIndex, menu) {
  const instance = this;
  const { withOut, returnGet, createNode, ajaxJson, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight, baseTop, heightTong, requestNumber } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  try {

    /*

    const defaultQueryObject = {
      newMode: true,
      method: "client",
      id: instance.client.cliid
    };
    let updateQuery, coreQuery;
    
    if (typeof valueIndex !== "number") {
      throw new Error("invalid value index");
    }
    if (!Array.isArray(menu)) {
      throw new Error("invalid menu");
    }
    if (menuIndex === undefined) {
      throw new Error("invalid menu index");
    }

    if (valueIndex === 0) {
      if (typeof menuIndex === "number" && menu[menuIndex] !== undefined) {
        updateQuery = {};
        coreQuery = {};
        updateQuery["curation.service.serid"] = [ menu[menuIndex] ];
        updateQuery["curation.check.serid"] = menu[menuIndex];
        coreQuery["requests." + String(requestNumber) + ".analytics.response.service.serid"] = menu[menuIndex];
        await ajaxJson({ ...defaultQueryObject, updateQuery, coreQuery }, BACKHOST + "/updateHistory");
      }
    } else if (valueIndex === 1) {
      if (typeof menuIndex === "number" && menu[menuIndex] !== undefined) {
        updateQuery = {};
        coreQuery = {};
        if (instance.totalValues[0] === 1) {
          updateQuery["curation.check.construct.entire"] = menu[menuIndex];
        } else {
          updateQuery["curation.check.construct.entire"] = true;
        }
        await ajaxJson({ ...defaultQueryObject, updateQuery, coreQuery }, BACKHOST + "/updateHistory");
      }
    } else if (valueIndex === 2) {
      if (Array.isArray(menuIndex)) {
        updateQuery = {};
        coreQuery = {};
        updateQuery["curation.check.construct.items"] = menuIndex;
        await ajaxJson({ ...defaultQueryObject, updateQuery, coreQuery }, BACKHOST + "/updateHistory");
      }
    } else if (valueIndex === 3) {
      if (typeof menuIndex === "number" && menu[menuIndex] !== undefined) {
        updateQuery = {};
        coreQuery = {};
        updateQuery["curation.check.construct.environment"] = menuIndex;
        await ajaxJson({ ...defaultQueryObject, updateQuery, coreQuery }, BACKHOST + "/updateHistory");
      }
    } else if (valueIndex === 4) {
      if (typeof menuIndex === "number" && menu[menuIndex] !== undefined) {
        updateQuery = {};
        coreQuery = {};
        updateQuery["curation.check.budget"] = menuIndex;
        coreQuery["requests." + String(requestNumber) + ".request.budget"] = menu[menuIndex];
        await ajaxJson({ ...defaultQueryObject, updateQuery, coreQuery }, BACKHOST + "/updateHistory");
      }
    } else if (valueIndex === 5) {
      if (Array.isArray(menuIndex)) {
        updateQuery = {};
        coreQuery = {};
        updateQuery["curation.check.furniture"] = menuIndex;
        await ajaxJson({ ...defaultQueryObject, updateQuery, coreQuery }, BACKHOST + "/updateHistory");
      }
    } else if (valueIndex === 6) {
      if (Array.isArray(menuIndex)) {
        updateQuery = {};
        coreQuery = {};
        updateQuery["curation.check.fabric"] = menuIndex;
        await ajaxJson({ ...defaultQueryObject, updateQuery, coreQuery }, BACKHOST + "/updateHistory");
      }
    } else if (valueIndex === 7) {
      if (typeof menuIndex === "number" && menu[menuIndex] !== undefined) {
        updateQuery = {};
        coreQuery = {};
        updateQuery["curation.check.expect"] = menuIndex;
        await ajaxJson({ ...defaultQueryObject, updateQuery, coreQuery }, BACKHOST + "/updateHistory");
      }
    } else if (valueIndex === 8) {
      if (typeof menuIndex === "number" && menu[menuIndex] !== undefined) {
        updateQuery = {};
        coreQuery = {};
        updateQuery["curation.check.purchase"] = menuIndex;
        coreQuery["requests." + String(requestNumber) + ".request.furniture"] = menu[menuIndex];
        await ajaxJson({ ...defaultQueryObject, updateQuery, coreQuery }, BACKHOST + "/updateHistory");
      }
    } else if (valueIndex === 9) {
      if (typeof menuIndex === "number" && menu[menuIndex] !== undefined) {
        updateQuery = {};
        coreQuery = {};
        updateQuery["curation.check.family"] = menuIndex;
        coreQuery["requests." + String(requestNumber) + ".request.family"] = menu[menuIndex];
        await ajaxJson({ ...defaultQueryObject, updateQuery, coreQuery }, BACKHOST + "/updateHistory");
      }
    } else if (valueIndex === 10) {
      if (typeof menuIndex === "number" && menu[menuIndex] !== undefined) {
        updateQuery = {};
        coreQuery = {};
        updateQuery["curation.check.age"] = menuIndex;
        await ajaxJson({ ...defaultQueryObject, updateQuery, coreQuery }, BACKHOST + "/updateHistory");
      }
    } else if (valueIndex === 11) {
      if (Array.isArray(menuIndex)) {
        updateQuery = {};
        coreQuery = {};
        updateQuery["curation.check.time"] = menuIndex;
        updateQuery["budget"] = "상담 가능 시간 : \n" + menu.filter((str, index) => { return menuIndex.includes(index) }).join(", ");
        await ajaxJson({ ...defaultQueryObject, updateQuery, coreQuery }, BACKHOST + "/updateHistory");
      }
    }

    if (Array.isArray(instance.totalMenu[valueIndex])) {
      if (typeof menuIndex === "number") {
        if (typeof instance.totalMenu[valueIndex][menuIndex] === "object" && instance.totalMenu[valueIndex][menuIndex] !== null && instance.totalMenu[valueIndex][menuIndex].value !== undefined) {
          homeliaisonAnalytics({
            page: instance.pageName,
            standard: instance.firstPageViewTime,
            action: "updateCheckValue",
            data: {
              cliid: instance.client.cliid,
              date: new Date(),
              index: valueIndex,
              raw: menuIndex,
              value: instance.totalMenu[valueIndex][menuIndex].value,
            },
          }).catch((err) => {
            console.log(err);
          });
        }  
      } else if (Array.isArray(menuIndex)) {
        if (menuIndex.every((n) => { return (typeof n === "number") })) {
          homeliaisonAnalytics({
            page: instance.pageName,
            standard: instance.firstPageViewTime,
            action: "updateCheckValue",
            data: {
              cliid: instance.client.cliid,
              date: new Date(),
              index: valueIndex,
              raw: menuIndex,
              value: instance.totalMenu[valueIndex].filter((o, index) => { return menuIndex.includes(index) }).map((o) => { return o.value === undefined ? o.title : o.value }),
            },
          }).catch((err) => {
            console.log(err);
          });          
        }  
      }
    }

    */

  } catch (e) {
    console.log(e);
  }
}

ClientEvaluationJs.prototype.setBaseTong = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong, baseTop } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { firstFadeOutTargetClassName, secondBaseClassName, initAreaClassName } = this;
  try {
    let minusLeft;

    minusLeft = window.innerWidth - standardWidth + 1;

    this.totalContents = document.getElementById("totalcontents");
    this.totalContents.style.overflow = "hidden";
    this.totalContents.style.background = colorExtended.mainBlue;
    document.body.style.background = colorExtended.mainBlue;

    instance.totalValues[0] = 1;
    instance.totalValues[1] = 1;

    createNode({
      mother: baseTong,
      class: [ secondBaseClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        transition: "all 0.6s ease",
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.white,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(0, ea),
        },
        next: {
          style: {
            position: "absolute",
            top: String(0),
            left: String(-1 * minusLeft) + ea,
            background: colorExtended.gradientBlue,
            width: withOut(-1 * (minusLeft * 2), ea),
            height: withOut(0, ea),
            transition: "all 0.6s ease",
            opacity: String(1),
          },
        }
      }
    });

    baseTong.style.paddingTop = String(naviHeight) + "px";

  } catch (e) {
    console.log(e);
  }
}

ClientEvaluationJs.prototype.constructItemPopupEvent = async function (constructItems) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const promptAsideClassName = "promptAsideClassName";
  try {
    const zIndex = 5;
    let blackTongBase, blockPrompt;
    let whiteWidth;
    let whiteHeight;
    let paddingTop;
    let paddingLeft;
    let paddingBottom;
    let size0, size1;
    let wordingVisual;
    let returnEvent;
    let timeOutEventId;
    let delta;
    let alertCircleWidth, alertCircleMarginBottom, alertTextTop, alertSize, alertWeight;
    let wordingWeight, wordingLineHeight, wordingMarginBottom;

    whiteWidth = <%% 580, 480, 400, 350, 88 %%>;
    whiteHeight = <%% 160, 150, 140, 120, 88 %%>;
    paddingTop = <%% 17, 16, 15, 13, 4 %%>;
    paddingLeft = <%% 23, 23, 23, 23, 8 %%>;
    paddingBottom = <%% 62, 62, 62, 62, 5 %%>;

    wordingVisual = GeneralJs.isMac() ? -1 : 1;
    delta = 5 * 1000;

    alertCircleWidth = <%% 36, 34, 32, 30, 5 %%>;
    alertCircleMarginBottom = <%% 12, 11, 10, 9, 3 %%>;
    alertTextTop = <%% 1, 1, 1, 1, 0.1 %%>;
    alertSize = <%% 28, 27, 26, 24, 4 %%>;
    alertWeight = <%% 700, 700, 700, 700, 700 %%>;

    size1 = <%% 16, 15, 14, 12, 3 %%>;
    wordingWeight = <%% 700, 700, 700, 700, 700 %%>;
    wordingLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;
    wordingMarginBottom = <%% 5, 5, 4, 3, 0.2 %%>;

    returnEvent = () => {
      return async function (e) {
        try {
          removeByClass(promptAsideClassName);
        } catch (e) {
          console.log(e);
        }
      }
    }

    blackTongBase = createNode({
      mode: "aside",
      mother: document.body,
      class: [ promptAsideClassName ],
      event: {
        contextmenu: (e) => { e.stopPropagation(); },
        dblclick: (e) => { e.stopPropagation(); },
        drop: (e) => { e.stopPropagation(); },
        keyup: (e) => { e.stopPropagation(); },
        keydown: (e) => { e.stopPropagation(); },
        keypress: (e) => { e.stopPropagation(); },
        click: returnEvent(),
      },
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: String(0) + "vh",
        left: String(1) + "vw",
        width: String(98) + "vw",
        height: "calc(100vh - " + String(0) + ea + ")",
        background: "transparent",
        zIndex: String(zIndex),
        cursor: "pointer",
      }
    });
  
    blockPrompt = createNode({
      mother: blackTongBase,
      style: {
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: String(whiteWidth) + ea,
        height: String(whiteHeight) + ea,
        borderRadius: String(10) + "px",
        boxShadow: "0px 3px 15px -9px " + colorExtended.ultimateBlack,
        background: colorExtended.darkBlack,
        animation: desktop ? "fadeuplite 0.4s ease forwards" : "fadeuplite 0.3s ease forwards",
      }
    });

    createNode({
      mother: blockPrompt,
      text: constructItems.map((o) => { return o.title }).join("\n"),
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(size1) + ea,
        fontWeight: String(wordingWeight),
        color: colorExtended.white,
        lineHeight: String(wordingLineHeight),
        textAlign: "left",
        marginBottom: String(wordingMarginBottom) + ea,
      }
    });
    createNode({
      mother: blockPrompt,
      text: constructItems.map((o) => { return " : " }).join("\n"),
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(size1) + ea,
        fontWeight: String(wordingWeight),
        color: colorExtended.mainBlue,
        lineHeight: String(wordingLineHeight),
        textAlign: "center",
        width: String(4) + ea,
        marginBottom: String(wordingMarginBottom) + ea,
      }
    });
    createNode({
      mother: blockPrompt,
      text: constructItems.map((o) => { return o.description.replace(/\n/gi, " ") }).join("\n"),
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(size1) + ea,
        fontWeight: String(300),
        color: colorExtended.white,
        lineHeight: String(wordingLineHeight),
        textAlign: "left",
        marginBottom: String(wordingMarginBottom) + ea,
      }
    });

  } catch (e) {
    console.log(e);
  }
}

ClientEvaluationJs.prototype.renderStartBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, setDebounce } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, baseTop, totalContents, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const submitBlockClassName = "submitBlockClassName";
  const eightSecondWhiteClassName = "eightSecondWhiteClassName";
  const { sixthFadeOutTargetClassName, thirdFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName, fileTongClassName, secondBarBoxMotherClassName, blurFixedBelowBarClassName, greenTalkEventClassName } = this;
  try {
    let ghostBase;
    let minusLeft;
    let firstBase;
    let leftRightWidth;
    let firstBasePaddingBottom;
    let subTitleSize, subTitleWeight, subTitleMarginTop;
    let buttonMarginTop;
    let buttonWidth;
    let buttonHeight;
    let buttonSize;
    let buttonTextTop;
    let buttonWeight;
    let firstBasePaddingTop;
    let mainIllust;
    let mobileLeftPaddingVisual;
    let titleSize, titleWeight, titleVisualTop, titleVisualLeft;
    let titleLineHeight;
    let descriptionContents;
    let descriptionSize, descriptionLineHeight;
    let descriptionMarginTop;
    let mainImageTop, mainImageHeight;
    let pointOpacity;
    let descriptionPointBoldPaddingLeft;
    let descriptionPointBoldPaddingTop;
    let descriptionPointBoldPaddingBottom;
    let descriptionPointBoldMargin;
    let buttonBetween;
    let mobileImageRight;
    let mobileSubImageMarginTop;
    let barBase;
    let barBaseMarginTop;
    let initAreaPaddingBottom;
    let secondWhite;
    let thirdEtc;
    let hangulTitleSize, hangulTitleWeight;
    let etcNotice;
    let noticeTong;
    let tempBlock;
    let noticeBlockBetween;
    let noticeBlockTitleWidth;
    let noticeBlockHeight;
    let blockPaddingTop;
    let blockPaddingBottom;
    let noticeTitleSize, noticeTitleWeight, noticeTitleTextTop;
    let noticeDescriptionIndent;
    let noticeDescriptionSize, noticeDescriptionWeight, noticeDescriptionLineHeight, noticeDescriptionTextTop;
    let noticeBlockMarginTop;
    let thirdDescriptionMarginTop, thirdDescriptionWeight, thirdDescriptionSize, thirdDescriptionLineHeight;
    let processDiagramHeight;
    let totalHeight;
    let blackButtonWidth, blackButtonHeight, blackButtonBetween;
    let blackButtonSize, blackButtonWeight;
    let hangulDescriptionWeight, hangulDescriptionSize, hangulDescriptionLineHeight;
    let hangulDescriptionMarginTop;
    let hangulBarMarginTop, hangulBarWidth, hangulBarHeight;
    let noticeVisual;
    let fixedWhiteBarHeight, fixedWhiteBarButtonMarginLeft;
    let returnCircleWidth;
    let returnCircleMarginRight;
    let returnCicleArrowWidth;
    let returnCicleArrowLeft;
    let mobileArrowZoneMarginTop;
    let mobileFixedWhiteMarginBottom;
    let ghostBase2;

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    totalHeight = heightTong.eighth;

    firstBasePaddingTop = 240;
    firstBasePaddingBottom = <%% 180, 170, 160, 120, 20 %%>;

    subTitleSize = <%% 18, 18, 17, 16, 3.7 %%>;
    subTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
    subTitleMarginTop = <%% 6, 5, 3, 3, 0.5 %%>;

    buttonMarginTop = <%% 165, 160, 132, 90, 6.5 %%>;
    buttonWidth = <%% 205, 194, 186, 168, 31 %%>;
    buttonHeight = <%% 32, 32, 30, 28, 8.5 %%>;
    buttonSize = <%% 14, 14, 13, 12, 3.4 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 0), -0.2 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
    buttonBetween = <%% 8, 8, 7, 6, 1 %%>;

    titleSize = <%% 57, 51, 48, 38, 7 %%>;
    titleWeight = <%% 500, 500, 500, 500, 500 %%>;
    titleVisualTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.5 %%>;
    titleVisualLeft = <%% -2, -2, -2, -2, -0.5 %%>;
    titleLineHeight = <%% 1.11, 1.11, 1.11, 1.11, 1.07 %%>;

    pointOpacity = 0.4;

    mainImageTop = <%% 24, 22, 18, 18, 44 %%>;
    mainImageHeight = <%% 360, 383, 346, 275, 39 %%>;

    descriptionSize = <%% 15, 14, 14, 13, 3.2 %%>;
    descriptionLineHeight = <%% 1.8, 1.8, 1.8, 1.7, 1.8 %%>;

    mobileLeftPaddingVisual = 1;

    descriptionMarginTop = <%% 56, 56, 52, 46, 76 %%>;

    descriptionPointBoldPaddingLeft = <%% 8, 8, 8, 8, 1.6 %%>;
    descriptionPointBoldPaddingTop = <%% (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 3), (isMac() ? 2 : 3), 0.4 %%>;
    descriptionPointBoldPaddingBottom = <%% (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 0.8 %%>;
    descriptionPointBoldMargin = <%% 2, 2, 2, 2, 1 %%>;

    mobileImageRight = 1.2;
    mobileSubImageMarginTop = 7.5;

    barBaseMarginTop = <%% 80, 80, 80, 80, 80 %%>;

    initAreaPaddingBottom = <%% 170, 170, 120, 70, 22 %%>;

    hangulTitleSize = <%% 32, 28, 23.5, 20, 4.6 %%>;
    hangulTitleWeight = <%% 800, 800, 800, 800, 800 %%>;

    noticeBlockBetween = <%% 10, 9, 5, 6, 2.5 %%>;
    noticeBlockTitleWidth = <%% 280, 210, 150, 120, 30 %%>;
    noticeBlockHeight = <%% 108, 100, 90, 80, 27.5 %%>;

    noticeVisual = <%% 24, 21, 18, 15, 3 %%>;

    blockPaddingTop = <%% 30, 30, 25, 20, 19 %%>;
    blockPaddingBottom = <%% 30, 30, 25, 20, 19 %%>;

    noticeBlockMarginTop = <%% 50, 45, 40, 35, 5 %%>;

    noticeTitleSize = <%% 21, 18, 15, 14, 3.4 %%>;
    noticeTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
    noticeTitleTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -1 %%>;
    noticeDescriptionIndent = <%% 24, 24, 21, 18, 2 %%>;
    noticeDescriptionSize = <%% 15, 14, 13, 12, 3 %%>;
    noticeDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
    noticeDescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.6 %%>;
    noticeDescriptionTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

    thirdDescriptionMarginTop = <%% 10, 7, 3, 1, 1 %%>;
    thirdDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
    thirdDescriptionSize = <%% 16, 15, 14, 13, 3.2 %%>;
    thirdDescriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

    processDiagramHeight = <%% 420, 350, 320, 270, 420 %%>;

    blackButtonWidth = <%% 180, 160, 145, 125, 34 %%>;
    blackButtonHeight = <%% 38, 32, 30, 28, 7.6 %%>;
    blackButtonBetween = <%% 8, 7, 6, 5, 1.5 %%>;
    blackButtonSize = <%% 16, 14, 13, 12, 3 %%>;
    blackButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    hangulDescriptionMarginTop = <%% 45, 32, 28, 20, 2 %%>;
    hangulDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
    hangulDescriptionSize = <%% 16, 15, 14, 13, 3.2 %%>;
    hangulDescriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
    hangulBarMarginTop = <%% 102, 67, 67, 45, 102 %%>;
    hangulBarWidth = <%% 96, 84, 64, 48, 96 %%>;
    hangulBarHeight = <%% 6, 5, 4, 3, 1 %%>;

    fixedWhiteBarHeight = <%% 96, 80, 72, 64, 19 %%>;
    fixedWhiteBarButtonMarginLeft = <%% 1037, 722, 503, 456, 40 %%>;
    mobileFixedWhiteMarginBottom = 0;

    returnCircleWidth = <%% 34, 34, 32, 28, 7.2 %%>;
    returnCicleArrowWidth = <%% 9, 9, 8, 7, 2 %%>;
    returnCicleArrowLeft = <%% -1.5, -1.5, -1, -0.5, 0.2 %%>;

    mobileArrowZoneMarginTop = 11;

    mainIllust = <%% ClientEvaluationJs.binaryPath + "/evaluation_deaktop.png", ClientEvaluationJs.binaryPath + "/evaluation_deaktop.png", ClientEvaluationJs.binaryPath + "/endIllust.svg", ClientEvaluationJs.binaryPath + "/endIllust.svg", ClientEvaluationJs.binaryPath + "/endIllust2.svg" %%>;

    descriptionContents = [
      `홈리에종의 서비스를 잘 진행해주셔서 감사합니다!`,
      `고객님의 서비스 평가를 알려주세요! 완료되면 <b%사진 다운로드%b>가 가능해집니다.`,
    ];

    if (media[0] && window.innerHeight > 1100) {
      titleSize = 57;
      subTitleSize = <%% 19, 18, 17, 15, 3.6 %%>;
      firstBasePaddingTop = 160;
      firstBasePaddingBottom = <%% 230, 210, 160, 130, 210 %%>;
      mainImageTop = 15;
      mainImageHeight = 496;
      buttonMarginTop = <%% 248, 146, 132, 90, 3.6 %%>;
    }
    
    ghostBase = createNode({
      mother: document.querySelector('.' + secondBaseClassName),
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        paddingTop: String(firstBasePaddingTop) + ea,
        width: withOut(0, ea),
        animation: "fadeinlite 0.6s ease forwards",
        opacity: String(0),
        transform: "translateX(20px)",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            flexDirection: "row",
            width: String(925) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            flexDirection: "column",
            width: withOut(925, ea),
          }
        },
      ]
    });

    // main illust
    createNode({
      mother: ghostBase.children[0],
      mode: "img",
      attribute: {
        src: mainIllust
      },
      style: {
        display: "inline-block",
        position: "relative",
        top: String(mainImageTop) + ea,
        height: String(mainImageHeight) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0.2s 1 normal forwards running fadeupdelay2",
      }
    });

    // main title
    createNode({
      mother: ghostBase.children[1],
      style: {
        display: "flex",
        position: "relative",
        justifyContent: desktop ? "start" : "center",
        alignItems: desktop ? "start" : "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        paddingLeft: mobile ? String(mobileLeftPaddingVisual) + ea : "",
      },
      children: [
        {
          text: (desktop ? "Customer\nsatisfaction\nsurvey<b%.%b>" : "Request completed<b%.%b>"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: desktop ? colorExtended.white : colorExtended.white,
            fontFamily: "mont",
            top: desktop ? String(titleVisualTop) + ea : "",
            left: desktop ? String(titleVisualLeft) + ea : "",
            lineHeight: String(titleLineHeight),
          },
          bold: {
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: desktop ? colorExtended.white : colorExtended.white,
            fontFamily: "mont",
            opacity: String(pointOpacity),
          }
        }
      ]
    });

    // sub title
    createNode({
      mother: ghostBase.children[1],
      style: {
        display: "flex",
        position: "relative",
        justifyContent: desktop ? "start" : "center",
        alignItems: desktop ? "start" : "center",
        marginTop: String(subTitleMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
      },
      children: [
        {
          text: "홈리에종 서비스 평가",
          style: {
            display: "inline-block",
            position: "relative",
            color: desktop ? colorExtended.black : colorExtended.white,
            fontWeight: String(subTitleWeight),
            fontSize: String(subTitleSize) + ea,
            fontFamily: "pretendard",
          }
        }
      ]
    });

    // description
    createNode({
      mother: ghostBase.children[1],
      style: {
        display: "flex",
        position: "relative",
        justifyContent: desktop ? "start" : "center",
        alignItems: desktop ? "start" : "center",
        marginTop: String(descriptionMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.5s ease 0s 1 normal forwards running fadeupdelay2",
        textAlign: desktop ? "left" : "center",
        flexDirection: desktop ? "row" : "column",
      },
      children: [
        {
          text: descriptionContents.join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            color: desktop ? colorExtended.black : colorExtended.white,
            fontWeight: String(400),
            fontSize: String(descriptionSize) + ea,
            lineHeight: String(descriptionLineHeight),
          },
          bold: {
            color: colorExtended.white,
            fontWeight: String(800),
            fontSize: String(descriptionSize) + ea,
            lineHeight: String(descriptionLineHeight),
            background: colorExtended.blueDark,
            padding: String(descriptionPointBoldPaddingLeft) + ea,
            paddingTop: String(descriptionPointBoldPaddingTop) + ea,
            paddingBottom: String(descriptionPointBoldPaddingBottom) + ea,
            "border-radius": String(5) + "px",
            margin: String(descriptionPointBoldMargin) + ea,
          }
        },
      ]
    });

    // buttons
    createNode({
      mother: ghostBase.children[1],
      event: {
        selectstart: (e) => { e.preventDefault() },
      },
      style: {
        display: "flex",
        position: "relative",
        justifyContent: desktop ? "start" : "center",
        alignItems: "start",
        marginTop: String(80) + ea,
        cursor: "pointer",
        flexDirection: "column",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.5s ease 0s 1 normal forwards running fadeupdelay2",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",    
            width: String(blackButtonWidth) + ea,
            height: String(blackButtonHeight) + ea,
            background: colorExtended.blueDark,
            borderRadius: String(blackButtonHeight) + ea,
            marginBottom: String(blackButtonBetween) + ea,
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          child: {
            event: {
              selectstart: (e) => { e.preventDefault() },
            },
            text: `사진 다운로드 하기`,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(blackButtonSize) + ea,
              fontWeight: String(blackButtonWeight),
              color: colorExtended.white,
            },
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",    
            width: String(blackButtonWidth) + ea,
            height: String(blackButtonHeight) + ea,
            background: desktop ? colorExtended.darkBlack : colorExtended.ultimateBlack,
            borderRadius: String(blackButtonHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          child: {
            event: {
              selectstart: (e) => { e.preventDefault() },
            },
            text: `서비스 평가 시작하기`,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(blackButtonSize) + ea,
              fontWeight: String(blackButtonWeight),
              color: colorExtended.white,
            },
          }
        },
      ]
    });

    ghostBase2 = createNode({
      mother: document.querySelector('.' + secondBaseClassName),
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        width: withOut(0, ea),
      },
    });

    // second white
    secondWhite = createNode({
      mother: ghostBase2,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        marginTop: String(initAreaPaddingBottom) + ea,
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        paddingTop: String(blockPaddingTop) + ea,
        paddingBottom: String(blockPaddingBottom) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.white,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(0, ea),
        },
        next: {
          class: [ ghostBaseClassName ],
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "column",
          }
        }
      }
    });

    await instance.renderFirstContents(secondWhite.children[1]);

  } catch (e) {
    console.log(e);
  }
}

ClientEvaluationJs.prototype.renderFirstContents = async function (ghostBase) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { firstFadeOutTargetClassName, fourthFadeOutTargetClassName, thirdFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName } = this;
  const selectionBaseFifthClassName0 = "selectionBaseFifthClassName0";
  const selectionBaseFifthClassName1 = "selectionBaseFifthClassName1";
  const selectionBaseFifthClassName2 = "selectionBaseFifthClassName2";
  const selectionBaseSixthClassName3 = "selectionBaseSixthClassName3";
  const blueBlockClassName0 = "blueBlockClassName0";
  const blueBlockClassName1 = "blueBlockClassName1";
  const blueBlockBarFactorClassName = "blueBlockBarFactorClassName";
  const blueBlockBarFactorIndexClassName = "blueBlockBarFactorClassName_index_";
  const blueBlockBarWordsIndexClassName = "blueBlockBarWordsClassName_index_";
  const blueBlock2ClassName0 = "blueBlock2ClassName0";
  const blueBlock2ClassName1 = "blueBlock2ClassName1";
  const blueBlock2BarFactorClassName = "blueBlock2BarFactorClassName";
  const blueBlock2BarFactorIndexClassName = "blueBlock2BarFactorClassName_index_";
  const blueBlock2BarWordsIndexClassName = "blueBlock2BarWordsClassName_index_";
  try {
    const fadeOutTargets0 = [ ...document.querySelectorAll('.' + firstFadeOutTargetClassName) ];
    const fadeOutTargets = [ ...document.querySelectorAll('.' + thirdFadeOutTargetClassName) ];
    const furnishingMode = false;
    let minusLeft;
    let descriptionSize;
    let titleSize;
    let descriptionMarginTop;
    let betweenMargin;
    let checkCircleWidth;
    let buttonHeight;
    let wordsMotherMarginTop;
    let numberSize;
    let numberWeight;
    let numberBarHeight;
    let numberBarMarginLeft;
    let numberBarTop;
    let numbersAreaMarginTop;
    let titleMarginTop;
    let titleWeight;
    let titleSquareWidth, titleSquareMarginRight, titleSquareTop;
    let imageAreaMarginTop, imageAreaMarginBottom;
    let imageWidth;
    let yesButtonAreaMarginTop;
    let yesButtonWidth, yesButtonWidth2;
    let yesButtonHeight;
    let yesButtonBetween;
    let yesButtonTextTop;
    let yesButtonSize;
    let yesButtonWeight;
    let completeButtonWidth, completeButtonAreaMarginBottom;
    let completeButtonSize, completeButtonWeight, completeButtonTextTop;
    let returnCircleWidth;
    let returnCircleMarginRight;
    let returnCicleArrowWidth, returnCicleArrowLeft;
    let constructItems;
    let statusItems;
    let blueBoxHeight, blueBoxHeight2;
    let middleLineMarginBottom;
    let middleLinePaddingTop;
    let blueDescriptionSize, blueDescriptionWeight, blueDescriptionBoldWeight, blueDescriptionTextTop;
    let fabricItems;
    let yesButtonWidthNoMargin;
    let processBarHeight;
    let defaultBudgetValue;
    let blueWhiteFactorsAreaMarginTop;
    let blueWhiteFactorLineWidth, blueWhiteFactorLineMarginRight;
    let blueWhiteFactorWidth, blueWhiteFactorHeight;
    let blueWhiteFactorTextTop, blueWhiteFactorSize, blueWhiteFactorWeight;
    let blueWhitePlusCircleWidth, blueWhitePlusCircleSize, blueWhitePlusCircleWeight, blueWhitePlusCircleTextTop;
    let blueWhitePlusCircleMargin;
    let processValuesRatio;
    let processValueSize, processValueWeight;
    let convertingBaseHeight;
    let barClickEvent;
    let fifthSelectionEvent2, fifthSelectionEvent3;
    let mobileConstructItemDevide;
    let barClickEvent2;
    let fabricItems2;

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 21, 15, 10, 2 %%>;
    titleSize = <%% 25, 24, 22, 19, 4.7 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;
    titleSquareWidth = <%% 8, 8, 6, 5, 1.4 %%>;
    titleSquareMarginRight = <%% 9, 8, 7, 5, 1.4 %%>;
    titleSquareTop = <%% (isMac() ? 1 : -1), (isMac() ? 1 : -2), (isMac() ? 1 : -2), (isMac() ? 1 : -2), 0 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;

    betweenMargin = <%% 26, 26, 26, 26, 26 %%>;
    checkCircleWidth = <%% 23, 23, 23, 23, 23 %%>;
    buttonHeight = <%% 42, 42, 38, 32, 9 %%>;

    wordsMotherMarginTop = <%% 120, 120, 120, 120, 120 %%>;

    numberSize = <%% 28, 26, 24, 21, 5 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 24, 22, 19, 4.5 %%>;
    numberBarMarginLeft = <%% 12, 12, 10, 9, 2.1 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -0.4 %%>;

    numbersAreaMarginTop = heightTong.numbers;

    imageAreaMarginTop = <%% 45, 40, 35, 25, 6.5 %%>;
    imageAreaMarginBottom = <%% 110, 100, 75, 50, 11.5 %%>;
    imageWidth = <%% 510, 510, 510, 510, 510 %%>;

    yesButtonAreaMarginTop = <%% 25, 21, 18, 16, 4.5 %%>;
    yesButtonWidth = <%% 160, 140, 130, 100, 30 %%>;
    yesButtonWidth2 = <%% 400, 240, 130, 100, 30 %%>;
    yesButtonHeight = <%% 40, 36, 34, 32, 8 %%>;
    yesButtonBetween = <%% 12, 10, 9, 6, 1.6 %%>;
    yesButtonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    yesButtonSize = <%% 16, 15, 14, 13, 3.2 %%>;
    yesButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    completeButtonWidth = <%% 120, 120, 110, 90, 22 %%>;
    completeButtonAreaMarginBottom = <%% 129, 129, 110, 100, 23 %%>;
    completeButtonSize = <%% 17, 17, 16, 14, 3.6 %%>;
    completeButtonWeight = <%% 700, 700, 700, 700, 700 %%>;
    completeButtonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

    returnCircleWidth = <%% 34, 34, 32, 28, 6.8 %%>;
    returnCircleMarginRight = <%% 11, 11, 10, 7, 1.8 %%>;
    returnCicleArrowWidth = <%% 9, 9, 8, 7, 1.8 %%>;
    returnCicleArrowLeft = <%% -1.5, -1.5, -1, -0.5, -0.2 %%>;

    middleLineMarginBottom = <%% 100, 90, 80, 65, 11.5 %%>;
    middleLinePaddingTop = <%% 80, 70, 60, 50, 10 %%>;

    blueBoxHeight = <%% 130, 120, 105, 90, 21 %%>;
    blueBoxHeight2 = <%% 70, 68, 60, 52, 16 %%>;
    blueDescriptionSize = <%% 16, 15, 14, 13, 3 %%>;
    blueDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueDescriptionBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueDescriptionTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

    processBarHeight = <%% 24, 21, 18, 15, 3 %%>;
    defaultBudgetValue = <%% 5, 5, 5, 5, 5 %%>;
    blueWhiteFactorsAreaMarginTop = <%% 11, 11, 11, 11, 1.5 %%>;
    blueWhiteFactorLineWidth = <%% 352, 280, 240, 200, 0 %%>;
    blueWhiteFactorLineMarginRight = <%% 10, 10, 10, 10, 0 %%>;
    blueWhiteFactorWidth = <%% 180, 150, 120, 90, 21 %%>;
    blueWhiteFactorHeight = <%% 36, 30, 26, 21, 6.1 %%>;
    blueWhiteFactorTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    blueWhiteFactorSize = <%% 15, 14, 12, 11, 2.7 %%>;
    blueWhiteFactorWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueWhitePlusCircleWidth = <%% 22, 19, 17, 14, 4 %%>;
    blueWhitePlusCircleSize = <%% 20, 19, 16, 15, 3.5 %%>;
    blueWhitePlusCircleWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueWhitePlusCircleTextTop = <%% (isMac() ? -1 : 2), (isMac() ? -1 : 2), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.1 %%>;
    blueWhitePlusCircleMargin = <%% 8, 7, 6, 4, 1.2 %%>;

    processValueSize = <%% 15, 13, 12, 10, 2.5 %%>;
    processValueWeight = <%% 700, 700, 700, 700, 700 %%>;

    convertingBaseHeight = heightTong.fifth;

    processValuesRatio = <%% 99.4, 99.4, 99.4, 100, 100 %%>;

    mobileConstructItemDevide = 3;

    constructItems = objectDeepCopy(instance.totalMenu[4]);
    statusItems = objectDeepCopy(instance.totalMenu[5]);
    fabricItems = [
      {
        title: "3주 이내",
        value: 21,
      },
      {
        title: "4주 이내",
        value: 21,
      },
      {
        title: "한 달 이상",
        value: 30,
      },
      {
        title: "두 달 이하",
        value: 60,
      },
      {
        title: "두 달 이상",
        value: 80,
      },
    ];
    fabricItems2 = [
      {
        title: "조명",
        value: "조명",
      },
      {
        title: "가구",
        value: "가구",
      },
      {
        title: "패브릭",
        value: "패브릭",
      },
      {
        title: "소품",
        value: "소품",
      },
    ]

    yesButtonWidth = (standardWidth - (yesButtonBetween * ((fabricItems.length / 1) - 1))) / (fabricItems.length / 1);
    yesButtonWidthNoMargin = (standardWidth - (0 * ((constructItems.length / 1) - 1))) / (constructItems.length / 1);
    yesButtonWidth2 = (standardWidth - (yesButtonBetween * ((fabricItems2.length / 1) - 1))) / (fabricItems2.length / 1);

    if (mobile) {
      yesButtonWidth = standardWidth;
      yesButtonWidth2 = standardWidth;
      yesButtonWidthNoMargin = (standardWidth - (yesButtonBetween * (mobileConstructItemDevide - 1))) / mobileConstructItemDevide;
    }

    if (instance.totalValues[4] === null) {
      instance.totalValues[4] = defaultBudgetValue;
    } else {
      defaultBudgetValue = instance.totalValues[4];
    }

    barClickEvent = (i) => {
      return async (e) => {
        try {
          const target = document.querySelector('.' + blueBlockBarFactorIndexClassName + String(i));
          const index = Number(target.getAttribute("index"));
          const siblings = [ ...target.parentElement.querySelectorAll('.' + blueBlockBarFactorClassName) ];
          const toggle = target.getAttribute("toggle");
          let blue0, blue1, num, wordsTarget;

          siblings.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) })

          num = 0;
          for (let dom of siblings) {
            blue0 = dom.querySelector('.' + blueBlockClassName0);
            blue1 = dom.querySelector('.' + blueBlockClassName1);
            wordsTarget = document.querySelector('.' + blueBlockBarWordsIndexClassName + String(num));
            if (index > num) {
              blue0.style.opacity = String(1);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            } else if (index === num) {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(1);
              wordsTarget.firstChild.style.color = colorExtended.darkBlack;
              dom.setAttribute("toggle", "on");
            } else {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            }
            num++;
          }

          instance.totalValues[4] = index;
          await instance.updateImmediately(4, index, constructItems.map((o) => { return o.value }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    barClickEvent2 = (i) => {
      return async (e) => {
        try {
          const target = document.querySelector('.' + blueBlock2BarFactorIndexClassName + String(i));
          const index = Number(target.getAttribute("index"));
          const siblings = [ ...target.parentElement.querySelectorAll('.' + blueBlock2BarFactorClassName) ];
          const toggle = target.getAttribute("toggle");
          let blue0, blue1, num, wordsTarget;

          siblings.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) })

          num = 0;
          for (let dom of siblings) {
            blue0 = dom.querySelector('.' + blueBlock2ClassName0);
            blue1 = dom.querySelector('.' + blueBlock2ClassName1);
            wordsTarget = document.querySelector('.' + blueBlock2BarWordsIndexClassName + String(num));
            if (index > num) {
              blue0.style.opacity = String(1);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            } else if (index === num) {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(1);
              wordsTarget.firstChild.style.color = colorExtended.darkBlack;
              dom.setAttribute("toggle", "on");
            } else {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            }
            num++;
          }

          instance.totalValues[7] = index;
          await instance.updateImmediately(7, index, constructItems.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    fifthSelectionEvent2 = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseFifthClassName1);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
              }
            }
          }

          instance.totalValues[5] = [ ...document.querySelectorAll('.' + selectionBaseFifthClassName1) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });
          await instance.updateImmediately(5, instance.totalValues[5], statusItems.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    fifthSelectionEvent3 = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseFifthClassName2);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
              }
            }
          }

          instance.totalValues[6] = [ ...document.querySelectorAll('.' + selectionBaseFifthClassName2) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });
          await instance.updateImmediately(6, instance.totalValues[6], fabricItems.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: String(numbersAreaMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: String(instance.lineWeight) + "px" + " solid " + colorExtended.blueDark,
          },
          children: [
            {
              text: "1",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: String(numberBarHeight) + ea,
                width: String(0),
                borderRight: "2px solid " + colorExtended.mainBlue,
                transform: "rotate(25deg)",
                marginLeft: String(numberBarMarginLeft) + ea,
                marginRight: String(numberBarMarginLeft) + ea,
                top: String(numberBarTop) + ea,
              }
            },
            {
              text: "4",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
                opacity: String(0.4),
              }
            },
          ]
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "인테리어에 사용한 전체 비용은 어느 정도이신가요?",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(blueBoxHeight) + ea,
            borderRadius: String(10) + "px",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.gradientBlue,
                opacity: String(0.7),
              }
            },
            {
              text: "<b%*%b>인테리어 비용은 아래 세 가지를 포함합니다.",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(blueDescriptionTextTop) + ea,
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionWeight),
                color: colorExtended.black,
              },
              bold: {
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionBoldWeight),
                color: colorExtended.blueDark,
              }
            },
            {
              style: {
                display: "flex",
                position: "relative",
                marginTop: String(blueWhiteFactorsAreaMarginTop) + ea,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              },
              children: [
                {
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(blueWhiteFactorLineWidth) + ea,
                    height: String(0),
                    borderBottom: "2px dotted " + colorExtended.blueWhite,
                    marginRight: String(blueWhiteFactorLineMarginRight) + ea,
                  }
                },
                {
                  style: {
                    width: String(blueWhiteFactorWidth) + ea,
                    height: String(blueWhiteFactorHeight) + ea,
                    borderRadius: String(blueWhiteFactorHeight) + ea,
                    background: colorExtended.white,
                    display: "inline-flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "디자인비",
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      top: String(blueWhiteFactorTextTop) + ea,
                      fontSize: String(blueWhiteFactorSize) + ea,
                      fontWeight: String(blueWhiteFactorWeight),
                      color: colorExtended.blueDark,
                    }
                  }
                },
                {
                  style: {
                    width: String(blueWhitePlusCircleWidth) + ea,
                    height: String(blueWhitePlusCircleWidth) + ea,
                    borderRadius: String(blueWhitePlusCircleWidth) + ea,
                    background: colorExtended.blueDark,
                    display: "inline-flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: String(blueWhitePlusCircleMargin) + ea,
                    marginRight: String(blueWhitePlusCircleMargin) + ea,
                  },
                  child: {
                    text: "+",
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      top: String(blueWhitePlusCircleTextTop) + ea,
                      fontSize: String(blueWhitePlusCircleSize) + ea,
                      fontWeight: String(blueWhitePlusCircleWeight),
                      color: colorExtended.white,
                    }
                  }
                },
                {
                  style: {
                    width: String(blueWhiteFactorWidth) + ea,
                    height: String(blueWhiteFactorHeight) + ea,
                    borderRadius: String(blueWhiteFactorHeight) + ea,
                    background: colorExtended.white,
                    display: "inline-flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "시공비",
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      top: String(blueWhiteFactorTextTop) + ea,
                      fontSize: String(blueWhiteFactorSize) + ea,
                      fontWeight: String(blueWhiteFactorWeight),
                      color: colorExtended.blueDark,
                    }
                  }
                },
                {
                  style: {
                    width: String(blueWhitePlusCircleWidth) + ea,
                    height: String(blueWhitePlusCircleWidth) + ea,
                    borderRadius: String(blueWhitePlusCircleWidth) + ea,
                    background: colorExtended.blueDark,
                    display: "inline-flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: String(blueWhitePlusCircleMargin) + ea,
                    marginRight: String(blueWhitePlusCircleMargin) + ea,
                  },
                  child: {
                    text: "+",
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      top: String(blueWhitePlusCircleTextTop) + ea,
                      fontSize: String(blueWhitePlusCircleSize) + ea,
                      fontWeight: String(blueWhitePlusCircleWeight),
                      color: colorExtended.white,
                    }
                  }
                },
                {
                  style: {
                    width: String(blueWhiteFactorWidth) + ea,
                    height: String(blueWhiteFactorHeight) + ea,
                    borderRadius: String(blueWhiteFactorHeight) + ea,
                    background: colorExtended.white,
                    display: "inline-flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "제품 구매비",
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      top: String(blueWhiteFactorTextTop) + ea,
                      fontSize: String(blueWhiteFactorSize) + ea,
                      fontWeight: String(blueWhiteFactorWeight),
                      color: colorExtended.blueDark,
                    }
                  }
                },
                {
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(blueWhiteFactorLineWidth) + ea,
                    height: String(0),
                    borderBottom: "2px dotted " + colorExtended.blueWhite,
                    marginLeft: String(blueWhiteFactorLineMarginRight) + ea,
                  }
                },
              ]
            },
          ]
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            marginTop: String(yesButtonAreaMarginTop) + ea,
          },
          children: (desktop ? constructItems.map((o, index) => {
            return [
              {
                class: [ blueBlockBarFactorClassName, blueBlockBarFactorIndexClassName + String(index) ],
                attribute: {
                  index: String(index),
                  toggle: (index === defaultBudgetValue ? "on" : "off"),
                },
                event: {
                  click: barClickEvent(index),
                },
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(yesButtonWidthNoMargin) + ea,
                  height: String(processBarHeight) + ea,
                  border: String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue,
                  borderRight: (index === constructItems.length - 1 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : ""),
                  borderLeft: (index === 0 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : "1px dashed " + colorExtended.mainBlue),
                  boxSizing: "border-box",
                  borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderTopRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                  borderBottomRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                  background: colorExtended.white,
                  cursor: "pointer",
                },
                children: [
                  {
                    class: [ blueBlockClassName0 ],
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                      borderRight: (index === constructItems.length - 1 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack : ""),
                      borderLeft: (index === 0 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
                      boxSizing: "border-box",
                      borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderTopRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                      borderBottomRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                      background: colorExtended.mainBlue,
                      zIndex: String(1),
                      transition: "all 0s ease",
                      opacity: index < defaultBudgetValue ? String(1) : String(0),
                    }
                  },
                  {
                    class: [ blueBlockClassName1 ],
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                      borderRight: String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                      borderLeft: (index === 0 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
                      boxSizing: "border-box",
                      borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderTopRightRadius: String(processBarHeight) + ea,
                      borderBottomRightRadius: String(processBarHeight) + ea,
                      background: colorExtended.mainBlue,
                      zIndex: String(1),
                      transition: "all 0s ease",
                      opacity: index === defaultBudgetValue ? String(1) : String(0),
                    }
                  },
                ]
              },
            ]
          }).flat() : [])
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: String(processValuesRatio) + '%',
          },
          children: (desktop ? constructItems.map((o, index) => {
            return {
              class: [ blueBlockBarWordsIndexClassName + String(index) ],
              attribute: {
                index: String(index),
              },
              event: {
                click: barClickEvent(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: "calc(100% / " + String(constructItems.length) + ")",
                height: String(yesButtonHeight) + ea,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(processValueSize) + ea,
                  fontWeight: String(processValueWeight),
                  transition: "all 0.2 ease",
                  color: index === defaultBudgetValue ? colorExtended.darkBlack : colorExtended.mainBlue,
                }
              }
            }
          }) : constructItems.map((o, index) => {
            return {
              class: [ blueBlockBarFactorClassName ],
              attribute: {
                index: String(index),
                toggle: (index === defaultBudgetValue ? "on" : "off"),
              },
              event: {
                click: async function (e) {
                  try {
                    const targets = document.querySelectorAll('.' + blueBlockBarFactorClassName);
                    const index = Number(this.getAttribute("index"));
                    const toggle = this.getAttribute("toggle");
                    if (toggle === "on") {
                      for (let dom of targets) {
                        if (index === Number(dom.getAttribute("index"))) {
                          dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                          dom.style.background = colorExtended.white;
                          dom.style.boxShadow = "";
                          dom.firstChild.style.color = colorExtended.blueDark;
                          dom.setAttribute("toggle", "off");
                          instance.totalValues[4] = null;
                        }
                      }
                    } else {
                      for (let dom of targets) {
                        if (index === Number(dom.getAttribute("index"))) {
                          dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                          dom.style.background = colorExtended.mainBlue;
                          dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                          dom.firstChild.style.color = colorExtended.darkBlack;
                          dom.setAttribute("toggle", "on");
                          instance.totalValues[4] = Number(dom.getAttribute("index"));
                          await instance.updateImmediately(4, index, constructItems.map((o) => { return o.value }));
                        } else {
                          dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                          dom.style.background = colorExtended.white;
                          dom.style.boxShadow = "";
                          dom.firstChild.style.color = colorExtended.blueDark;
                          dom.setAttribute("toggle", "off");
                        }
                      }
                    }
          
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidthNoMargin) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(index === defaultBudgetValue) ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                background: !(index === defaultBudgetValue) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(index === defaultBudgetValue) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: desktop ? String(index % (constructItems.length / 2) === (constructItems.length / 2) - 1 ? 0 : yesButtonBetween) + ea : String(index % mobileConstructItemDevide === mobileConstructItemDevide - 1 ? 0 : yesButtonBetween) + ea,
                marginBottom: String(yesButtonBetween) + ea,
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(index === defaultBudgetValue) ? colorExtended.blueDark : colorExtended.darkBlack,
                },
              }
            }
          }))
        }
      ]
    });

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "그 중 스타일링에만 사용한 비용은 어느 정도이신가요?",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
          },
          children: (desktop ? constructItems.map((o, index) => {
            return [
              {
                class: [ blueBlock2BarFactorClassName, blueBlock2BarFactorIndexClassName + String(index) ],
                attribute: {
                  index: String(index),
                  toggle: (index === defaultBudgetValue ? "on" : "off"),
                },
                event: {
                  click: barClickEvent2(index),
                },
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(yesButtonWidthNoMargin) + ea,
                  height: String(processBarHeight) + ea,
                  border: String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue,
                  borderRight: (index === constructItems.length - 1 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : ""),
                  borderLeft: (index === 0 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : "1px dashed " + colorExtended.mainBlue),
                  boxSizing: "border-box",
                  borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderTopRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                  borderBottomRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                  background: colorExtended.white,
                  cursor: "pointer",
                },
                children: [
                  {
                    class: [ blueBlock2ClassName0 ],
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                      borderRight: (index === constructItems.length - 1 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack : ""),
                      borderLeft: (index === 0 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
                      boxSizing: "border-box",
                      borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderTopRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                      borderBottomRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                      background: colorExtended.mainBlue,
                      zIndex: String(1),
                      transition: "all 0s ease",
                      opacity: index < defaultBudgetValue ? String(1) : String(0),
                    }
                  },
                  {
                    class: [ blueBlock2ClassName1 ],
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                      borderRight: String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                      borderLeft: (index === 0 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
                      boxSizing: "border-box",
                      borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderTopRightRadius: String(processBarHeight) + ea,
                      borderBottomRightRadius: String(processBarHeight) + ea,
                      background: colorExtended.mainBlue,
                      zIndex: String(1),
                      transition: "all 0s ease",
                      opacity: index === defaultBudgetValue ? String(1) : String(0),
                    }
                  },
                ]
              },
            ]
          }).flat() : [])
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: String(processValuesRatio) + '%',
          },
          children: (desktop ? constructItems.map((o, index) => {
            return {
              class: [ blueBlock2BarWordsIndexClassName + String(index) ],
              attribute: {
                index: String(index),
              },
              event: {
                click: barClickEvent2(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: "calc(100% / " + String(constructItems.length) + ")",
                height: String(yesButtonHeight) + ea,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(processValueSize) + ea,
                  fontWeight: String(processValueWeight),
                  color: index === defaultBudgetValue ? colorExtended.darkBlack : colorExtended.mainBlue,
                }
              }
            }
          }) : constructItems.map((o, index) => {
            return {
              class: [ blueBlock2BarFactorClassName ],
              attribute: {
                index: String(index),
                toggle: (index === defaultBudgetValue ? "on" : "off"),
              },
              event: {
                click: async function (e) {
                  try {
                    const targets = document.querySelectorAll('.' + blueBlock2BarFactorClassName);
                    const index = Number(this.getAttribute("index"));
                    const toggle = this.getAttribute("toggle");
                    if (toggle === "on") {
                      for (let dom of targets) {
                        if (index === Number(dom.getAttribute("index"))) {
                          dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                          dom.style.background = colorExtended.white;
                          dom.style.boxShadow = "";
                          dom.firstChild.style.color = colorExtended.blueDark;
                          dom.setAttribute("toggle", "off");
                          instance.totalValues[7] = null;
                        }
                      }
                    } else {
                      for (let dom of targets) {
                        if (index === Number(dom.getAttribute("index"))) {
                          dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                          dom.style.background = colorExtended.mainBlue;
                          dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                          dom.firstChild.style.color = colorExtended.darkBlack;
                          dom.setAttribute("toggle", "on");
                          instance.totalValues[7] = Number(dom.getAttribute("index"));
                          await instance.updateImmediately(7, index, constructItems.map((o) => { return o.title }));
                        } else {
                          dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                          dom.style.background = colorExtended.white;
                          dom.style.boxShadow = "";
                          dom.firstChild.style.color = colorExtended.blueDark;
                          dom.setAttribute("toggle", "off");
                        }
                      }
                    }
          
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidthNoMargin) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(index === defaultBudgetValue) ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                background: !(index === defaultBudgetValue) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(index === defaultBudgetValue) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: desktop ? String(index % (constructItems.length / 2) === (constructItems.length / 2) - 1 ? 0 : yesButtonBetween) + ea : String(index % mobileConstructItemDevide === mobileConstructItemDevide - 1 ? 0 : yesButtonBetween) + ea,
                marginBottom: String(yesButtonBetween) + ea,
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(index === defaultBudgetValue) ? colorExtended.blueDark : colorExtended.darkBlack,
                },
              }
            }
          }))
        }
      ]
    });

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "완성까지 걸린 전체 기간을 대략적으로 알려주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(blueBoxHeight2) + ea,
            borderRadius: String(10) + "px",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.gray2,
                opacity: String(1),
              }
            },
            {
              text: "<b%*%b>시공 착공일부터 제품의 선택, 구매 및 세팅까지 걸린 기간을 알려주세요!",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(blueDescriptionTextTop) + ea,
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionWeight),
                color: colorExtended.black,
              },
              bold: {
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionBoldWeight),
                color: colorExtended.blueDark,
              },
              under: {
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(400),
                color: colorExtended.black,
              },
            }
          ]
        },
        {
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            width: withOut(0, ea),
            marginTop: String(yesButtonAreaMarginTop) + ea,
          },
          children: fabricItems.map((o, index) => {
            return {
              class: [ selectionBaseFifthClassName2 ],
              attribute: {
                index: String(index),
                toggle: (Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "on" : "off",
              },
              event: {
                click: fifthSelectionEvent2(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                background: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: desktop ? String(index % (fabricItems.length / 1) === (fabricItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea : "",
                marginBottom: String(yesButtonBetween) + ea,
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.blueDark : colorExtended.darkBlack,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "진행한 스타일링 항목을 모두 선택해 주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            width: withOut(0, ea),
          },
          children: fabricItems2.map((o, index) => {
            return {
              class: [ selectionBaseFifthClassName2 ],
              attribute: {
                index: String(index),
                toggle: (Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "on" : "off",
              },
              event: {
                click: fifthSelectionEvent3(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth2) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                background: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: desktop ? String(index % (fabricItems2.length / 1) === (fabricItems2.length / 1) - 1 ? 0 : yesButtonBetween) + ea : "",
                marginBottom: String(yesButtonBetween) + ea,
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.blueDark : colorExtended.darkBlack,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: String(buttonHeight) + ea,
        marginBottom: String(completeButtonAreaMarginBottom) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          event: {
            click: async function (e) {
              let convertingFunction;
              convertingFunction = instance.firstConverting().bind(this);
              await convertingFunction(e);
              return 1;
            },
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(completeButtonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(10) + "px",
            background: colorExtended.darkBlack,
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid " + colorExtended.blueDark,
            cursor: "pointer",
          },
          child: {
            text: "선택 완료",
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(completeButtonSize) + ea,
              fontWeight: String(completeButtonWeight),
              color: colorExtended.white,
              top: String(completeButtonTextTop) + ea,
            }
          }
        }
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

ClientEvaluationJs.prototype.renderSecondContents = async function (ghostBase) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { firstFadeOutTargetClassName, fourthFadeOutTargetClassName, thirdFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName } = this;
  const selectionBaseFifthClassName0 = "selectionBaseFifthClassName0";
  const selectionBaseFifthClassName1 = "selectionBaseFifthClassName1";
  const selectionBaseFifthClassName2 = "selectionBaseFifthClassName2";
  const selectionBaseSixthClassName3 = "selectionBaseSixthClassName3";
  const blueBlockClassName0 = "blueBlockClassName0";
  const blueBlockClassName1 = "blueBlockClassName1";
  const blueBlockBarFactorClassName = "blueBlockBarFactorClassName";
  const blueBlockBarFactorIndexClassName = "blueBlockBarFactorClassName_index_";
  const blueBlockBarWordsIndexClassName = "blueBlockBarWordsClassName_index_";
  const blueBlock2ClassName0 = "blueBlock2ClassName0";
  const blueBlock2ClassName1 = "blueBlock2ClassName1";
  const blueBlock2BarFactorClassName = "blueBlock2BarFactorClassName";
  const blueBlock2BarFactorIndexClassName = "blueBlock2BarFactorClassName_index_";
  const blueBlock2BarWordsIndexClassName = "blueBlock2BarWordsClassName_index_";
  const selectionBaseFourthClassName0 = "selectionBaseFourthClassName0";
  const selectionBaseFourthClassName1 = "selectionBaseFourthClassName1";
  const fourthNoticeBoxClassName = "fourthNoticeBoxClassName";
  const fourthDescriptionBoxClassName = "fourthDescriptionBoxClassName";
  try {
    const fadeOutTargets0 = [ ...document.querySelectorAll('.' + firstFadeOutTargetClassName) ];
    const fadeOutTargets = [ ...document.querySelectorAll('.' + thirdFadeOutTargetClassName) ];
    const furnishingMode = false;
    let minusLeft;
    let descriptionSize;
    let titleSize;
    let descriptionMarginTop;
    let betweenMargin;
    let checkCircleWidth;
    let buttonHeight;
    let wordsMotherMarginTop;
    let numberSize;
    let numberWeight;
    let numberBarHeight;
    let numberBarMarginLeft;
    let numberBarTop;
    let numbersAreaMarginTop;
    let titleMarginTop;
    let titleWeight;
    let titleSquareWidth, titleSquareMarginRight, titleSquareTop;
    let imageAreaMarginTop, imageAreaMarginBottom;
    let imageWidth;
    let yesButtonAreaMarginTop;
    let yesButtonWidth, yesButtonWidth2;
    let yesButtonHeight;
    let yesButtonBetween;
    let yesButtonTextTop;
    let yesButtonSize;
    let yesButtonWeight;
    let completeButtonWidth, completeButtonAreaMarginBottom;
    let completeButtonSize, completeButtonWeight, completeButtonTextTop;
    let returnCircleWidth;
    let returnCircleMarginRight;
    let returnCicleArrowWidth, returnCicleArrowLeft;
    let constructItems;
    let statusItems;
    let blueBoxHeight, blueBoxHeight2;
    let middleLineMarginBottom;
    let middleLinePaddingTop;
    let blueDescriptionSize, blueDescriptionWeight, blueDescriptionBoldWeight, blueDescriptionTextTop;
    let fabricItems;
    let yesButtonWidthNoMargin;
    let processBarHeight;
    let defaultBudgetValue;
    let blueWhiteFactorsAreaMarginTop;
    let blueWhiteFactorLineWidth, blueWhiteFactorLineMarginRight;
    let blueWhiteFactorWidth, blueWhiteFactorHeight;
    let blueWhiteFactorTextTop, blueWhiteFactorSize, blueWhiteFactorWeight;
    let blueWhitePlusCircleWidth, blueWhitePlusCircleSize, blueWhitePlusCircleWeight, blueWhitePlusCircleTextTop;
    let blueWhitePlusCircleMargin;
    let processValuesRatio;
    let processValueSize, processValueWeight;
    let convertingBaseHeight;
    let barClickEvent;
    let fifthSelectionEvent2, fifthSelectionEvent3;
    let mobileConstructItemDevide;
    let barClickEvent2;
    let fabricItems2;
    let mobileConstructPopupEvent;
    let fourthSelectionEvent;
    let alertCircleWidth;
    let alertCircleMarginLeft;
    let alertTextTop;
    let alertSize;
    let alertWeight;
    let blackDescriptionBoxHeight;
    let blackDescriptionBoxWidth;
    let blackDescriptionBoxIndent;
    let blackDescriptionSize;
    let blackDescriptionWeight;
    let blackDescriptionLineHeight;
    let constructItems2;
    let yesButtonWidth3;

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 21, 15, 10, 2 %%>;
    titleSize = <%% 25, 24, 22, 19, 4.7 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;
    titleSquareWidth = <%% 8, 8, 6, 5, 1.4 %%>;
    titleSquareMarginRight = <%% 9, 8, 7, 5, 1.4 %%>;
    titleSquareTop = <%% (isMac() ? 1 : -1), (isMac() ? 1 : -2), (isMac() ? 1 : -2), (isMac() ? 1 : -2), 0 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;

    betweenMargin = <%% 26, 26, 26, 26, 26 %%>;
    checkCircleWidth = <%% 23, 23, 23, 23, 23 %%>;
    buttonHeight = <%% 42, 42, 38, 32, 9 %%>;

    wordsMotherMarginTop = <%% 120, 120, 120, 120, 120 %%>;

    numberSize = <%% 28, 26, 24, 21, 5 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 24, 22, 19, 4.5 %%>;
    numberBarMarginLeft = <%% 12, 12, 10, 9, 2.1 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -0.4 %%>;

    numbersAreaMarginTop = heightTong.numbers;

    imageAreaMarginTop = <%% 45, 40, 35, 25, 6.5 %%>;
    imageAreaMarginBottom = <%% 110, 100, 75, 50, 11.5 %%>;
    imageWidth = <%% 510, 510, 510, 510, 510 %%>;

    yesButtonAreaMarginTop = <%% 25, 21, 18, 16, 4.5 %%>;
    yesButtonWidth = <%% 160, 140, 130, 100, 30 %%>;
    yesButtonWidth2 = <%% 400, 240, 130, 100, 30 %%>;
    yesButtonHeight = <%% 40, 36, 34, 32, 8 %%>;
    yesButtonBetween = <%% 12, 10, 9, 6, 1.6 %%>;
    yesButtonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    yesButtonSize = <%% 16, 15, 14, 13, 3.2 %%>;
    yesButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    completeButtonWidth = <%% 120, 120, 110, 90, 22 %%>;
    completeButtonAreaMarginBottom = <%% 129, 129, 110, 100, 23 %%>;
    completeButtonSize = <%% 17, 17, 16, 14, 3.6 %%>;
    completeButtonWeight = <%% 700, 700, 700, 700, 700 %%>;
    completeButtonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

    returnCircleWidth = <%% 34, 34, 32, 28, 6.8 %%>;
    returnCircleMarginRight = <%% 11, 11, 10, 7, 1.8 %%>;
    returnCicleArrowWidth = <%% 9, 9, 8, 7, 1.8 %%>;
    returnCicleArrowLeft = <%% -1.5, -1.5, -1, -0.5, -0.2 %%>;

    middleLineMarginBottom = <%% 100, 90, 80, 65, 11.5 %%>;
    middleLinePaddingTop = <%% 80, 70, 60, 50, 10 %%>;

    blueBoxHeight = <%% 130, 120, 105, 90, 21 %%>;
    blueBoxHeight2 = <%% 70, 68, 60, 52, 16 %%>;
    blueDescriptionSize = <%% 16, 15, 14, 13, 3 %%>;
    blueDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueDescriptionBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueDescriptionTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

    processBarHeight = <%% 24, 21, 18, 15, 3 %%>;
    defaultBudgetValue = <%% 5, 5, 5, 5, 5 %%>;
    blueWhiteFactorsAreaMarginTop = <%% 11, 11, 11, 11, 1.5 %%>;
    blueWhiteFactorLineWidth = <%% 352, 280, 240, 200, 0 %%>;
    blueWhiteFactorLineMarginRight = <%% 10, 10, 10, 10, 0 %%>;
    blueWhiteFactorWidth = <%% 180, 150, 120, 90, 21 %%>;
    blueWhiteFactorHeight = <%% 36, 30, 26, 21, 6.1 %%>;
    blueWhiteFactorTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    blueWhiteFactorSize = <%% 15, 14, 12, 11, 2.7 %%>;
    blueWhiteFactorWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueWhitePlusCircleWidth = <%% 22, 19, 17, 14, 4 %%>;
    blueWhitePlusCircleSize = <%% 20, 19, 16, 15, 3.5 %%>;
    blueWhitePlusCircleWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueWhitePlusCircleTextTop = <%% (isMac() ? -1 : 2), (isMac() ? -1 : 2), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.1 %%>;
    blueWhitePlusCircleMargin = <%% 8, 7, 6, 4, 1.2 %%>;

    processValueSize = <%% 15, 13, 12, 10, 2.5 %%>;
    processValueWeight = <%% 700, 700, 700, 700, 700 %%>;

    convertingBaseHeight = heightTong.fifth;

    processValuesRatio = <%% 99.4, 99.4, 99.4, 100, 100 %%>;

    mobileConstructItemDevide = 3;

    blackDescriptionBoxHeight = <%% 56, 56, 56, 56, 56 %%>;
    blackDescriptionBoxWidth = <%% 196, 196, 196, 196, 196 %%>;
    blackDescriptionBoxIndent = <%% 10, 10, 10, 10, 10 %%>;

    blackDescriptionSize = <%% 12, 12, 12, 12, 12 %%>;
    blackDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blackDescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

    alertCircleWidth = <%% 36, 34, 32, 30, 3.8 %%>;
    alertCircleMarginLeft = <%% 12, 11, 10, 9, 1 %%>;
    alertTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), 0 %%>;
    alertSize = <%% 28, 27, 26, 24, 3.2 %%>;
    alertWeight = <%% 700, 700, 700, 700, 700 %%>;

    statusItems = objectDeepCopy(instance.totalMenu[5]);
    fabricItems = [
      {
        title: "3주 이내",
        value: 21,
      },
      {
        title: "4주 이내",
        value: 21,
      },
      {
        title: "한 달 이상",
        value: 30,
      },
      {
        title: "두 달 이하",
        value: 60,
      },
      {
        title: "두 달 이상",
        value: 80,
      },
    ];
    fabricItems2 = [
      {
        title: "매우 불만족",
        value: "매우 불만족",
      },
      {
        title: "불만족",
        value: "불만족",
      },
      {
        title: "보통",
        value: "보통",
      },
      {
        title: "만족",
        value: "만족",
      },
      {
        title: "매우 만족",
        value: "매우 만족",
      },
    ];
    constructItems2 = objectDeepCopy(instance.totalMenu[4]);
    constructItems = [
      {
        title: "철거",
        value: "철거",
        description: "철거, 기존에 있던 것을\n모두 제거하는 작업",
        styling: true,
        alert: true,
        notice: "전체 철거는 토탈 스타일링에서만 가능합니다!",
      },
      {
        title: "보양",
        value: "보양",
        description: "엘리베이터 등에 기스 나지\n않도록 비닐을 씌우는 작업",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "목공",
        value: "목공",
        description: "나무를 사용한 작업\n걸레받이, 몰딩, 문짝, 천정 평탄화 등",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "전기",
        value: "전기",
        description: "집 내부의 전기 배선\n구성을 바꾸는 작업",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "타일",
        value: "타일",
        description: "화장실, 주방 등에 타일을\n바꾸는 작업",
        styling: true,
        alert: true,
        notice: "홈스타일링에서는 덧방 공사만 가능합니다!",
      },
      {
        title: "바닥",
        value: "바닥",
        description: "집의 바닥 공사\n장판, 마루, 타일이 있음",
        styling: true,
        alert: true,
        notice: "홈스타일링에서는 장판과 마루 공사만 가능합니다!",
      },
      {
        title: "욕실",
        value: "욕실",
        description: "화장실 공사, 홈스타일링에선\n부분 악세사리 교체만 가능",
        styling: true,
        alert: true,
        notice: "홈스타일링에서는 부분 악세사리 교체만 가능합니다!",
      },
      {
        title: "주방",
        value: "주방",
        description: "주방 공사, 홈스타일링에선\n부분 악세사리 교체만 가능",
        styling: true,
        alert: true,
        notice: "홈스타일링에서는 부분 악세사리 교체만 가능합니다!",
      },
      {
        title: "필름",
        value: "필름",
        description: "필름지를 씌워 해당 면의\n색상이나 재질감을 바꾸는 제공",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "도배",
        value: "도배",
        description: "벽에 도배지를 바르는 작업\n합지와 실크가 있음",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "도장",
        value: "도장",
        description: "페인팅, 탄성코트 등\n면의 도료를 칠하는 공사",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "중문",
        value: "중문",
        description: "현관에 중문을\n새로 달거나 바꾸는 작업",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "발코니",
        value: "발코니",
        description: "발코니의 확장 및\n확장 부분 단열 공사",
        styling: false,
        alert: false,
        notice: "",
      },
      {
        title: "금속 샤시",
        value: "금속 샤시",
        description: "모든 금속 공사와\n샤시 교체 작업",
        styling: false,
        alert: false,
        notice: "",
      },
      {
        title: "조명",
        value: "조명",
        description: "스타일링을 위한 조명\n배치부터 조명 제품 선택",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "제작 가구",
        value: "제작 가구",
        description: "대가구, 소가구로 나뉘며\n제작이 필요한 모든 가구",
        styling: true,
        alert: false,
        notice: "",
      },
    ];

    mobileConstructPopupEvent = (constructItems) => {
      return async function (e) {
        try {
          await instance.constructItemPopupEvent(constructItems);
        } catch (e) {
          console.log(e);
        }
      }
    }

    yesButtonWidth = (standardWidth - (yesButtonBetween * ((constructItems.length / 2) - 1))) / (constructItems.length / 2);
    yesButtonWidthNoMargin = (standardWidth - (0 * ((constructItems2.length / 1) - 1))) / (constructItems2.length / 1);
    yesButtonWidth2 = (standardWidth - (yesButtonBetween * ((fabricItems2.length / 1) - 1))) / (fabricItems2.length / 1);

    if (mobile) {
      yesButtonWidth = (standardWidth - (yesButtonBetween * (mobileConstructItemDevide - 1))) / mobileConstructItemDevide;
      yesButtonWidth2 = standardWidth;
      yesButtonWidthNoMargin = (standardWidth - (yesButtonBetween * (mobileConstructItemDevide - 1))) / mobileConstructItemDevide;
    }

    if (instance.totalValues[4] === null) {
      instance.totalValues[4] = defaultBudgetValue;
    } else {
      defaultBudgetValue = instance.totalValues[4];
    }

    barClickEvent = (i) => {
      return async (e) => {
        try {
          const target = document.querySelector('.' + blueBlockBarFactorIndexClassName + String(i));
          const index = Number(target.getAttribute("index"));
          const siblings = [ ...target.parentElement.querySelectorAll('.' + blueBlockBarFactorClassName) ];
          const toggle = target.getAttribute("toggle");
          let blue0, blue1, num, wordsTarget;

          siblings.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) })

          num = 0;
          for (let dom of siblings) {
            blue0 = dom.querySelector('.' + blueBlockClassName0);
            blue1 = dom.querySelector('.' + blueBlockClassName1);
            wordsTarget = document.querySelector('.' + blueBlockBarWordsIndexClassName + String(num));
            if (index > num) {
              blue0.style.opacity = String(1);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            } else if (index === num) {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(1);
              wordsTarget.firstChild.style.color = colorExtended.darkBlack;
              dom.setAttribute("toggle", "on");
            } else {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            }
            num++;
          }

          instance.totalValues[4] = index;
          await instance.updateImmediately(4, index, constructItems.map((o) => { return o.value }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    barClickEvent2 = (i) => {
      return async (e) => {
        try {
          const target = document.querySelector('.' + blueBlock2BarFactorIndexClassName + String(i));
          const index = Number(target.getAttribute("index"));
          const siblings = [ ...target.parentElement.querySelectorAll('.' + blueBlock2BarFactorClassName) ];
          const toggle = target.getAttribute("toggle");
          let blue0, blue1, num, wordsTarget;

          siblings.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) })

          num = 0;
          for (let dom of siblings) {
            blue0 = dom.querySelector('.' + blueBlock2ClassName0);
            blue1 = dom.querySelector('.' + blueBlock2ClassName1);
            wordsTarget = document.querySelector('.' + blueBlock2BarWordsIndexClassName + String(num));
            if (index > num) {
              blue0.style.opacity = String(1);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            } else if (index === num) {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(1);
              wordsTarget.firstChild.style.color = colorExtended.darkBlack;
              dom.setAttribute("toggle", "on");
            } else {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            }
            num++;
          }

          instance.totalValues[7] = index;
          await instance.updateImmediately(7, index, constructItems2.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    fifthSelectionEvent2 = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseFifthClassName1);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
              }
            }
          }

          instance.totalValues[5] = [ ...document.querySelectorAll('.' + selectionBaseFifthClassName1) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });
          await instance.updateImmediately(5, instance.totalValues[5], statusItems.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    fifthSelectionEvent3 = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseFifthClassName2);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
              }
            }
          }

          instance.totalValues[6] = [ ...document.querySelectorAll('.' + selectionBaseFifthClassName2) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });
          await instance.updateImmediately(6, instance.totalValues[6], fabricItems.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    fourthSelectionEvent = (index) => {
      return async function (e) {
        try {
          const targets = [ ...document.querySelectorAll('.' + selectionBaseFourthClassName0) ];
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          let finalArr;
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              } else {
                // dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                // dom.style.background = colorExtended.mainBlue;
                // dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                // dom.firstChild.style.color = colorExtended.darkBlack;
                // dom.setAttribute("toggle", "on");
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
              } else {
                // dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                // dom.style.background = colorExtended.white;
                // dom.style.boxShadow = "";
                // dom.firstChild.style.color = colorExtended.blueDark;
                // dom.setAttribute("toggle", "off");
              }
            }
          }

          finalArr = [ ...document.querySelectorAll('.' + selectionBaseFourthClassName0) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });

          instance.totalValues[2] = objectDeepCopy(finalArr);
          await instance.updateImmediately(2, finalArr, constructItems.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: String(numbersAreaMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: String(instance.lineWeight) + "px" + " solid " + colorExtended.blueDark,
          },
          children: [
            {
              text: "2",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: String(numberBarHeight) + ea,
                width: String(0),
                borderRight: "2px solid " + colorExtended.mainBlue,
                transform: "rotate(25deg)",
                marginLeft: String(numberBarMarginLeft) + ea,
                marginRight: String(numberBarMarginLeft) + ea,
                top: String(numberBarTop) + ea,
              }
            },
            {
              text: "4",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
                opacity: String(0.4),
              }
            },
          ]
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "진행하셨던 시공을 모두 체크해 주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
            {
              event: {
                click: mobileConstructPopupEvent(constructItems),
              },
              style: {
                display: mobile ? "inline-flex" : "none",
                position: "relative",
                width: String(alertCircleWidth) + ea,
                height: String(alertCircleWidth) + ea,
                borderRadius: String(alertCircleWidth) + ea,
                background: colorExtended.mainBlue,
                marginLeft: String(alertCircleMarginLeft) + ea,
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                top: String(0.1) + ea,
              },
              child: {
                text: "?",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(alertTextTop) + ea,
                  fontSize: String(alertSize) + ea,
                  fontWeight: String(alertWeight),
                  color: colorExtended.white,
                  fontFamily: "cabinet",
                }
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
          },
          children: constructItems.map((o, index) => {
            return {
              class: [ selectionBaseFourthClassName0 ],
              attribute: {
                index: String(index),
                toggle: (Array.isArray(instance.totalValues[2]) && instance.totalValues[2]?.includes(index)) ? "on" : "off",
              },
              event: {
                click: async function (e) {
                  const index = Number(this.getAttribute("index"));
                  const thisObj = objectDeepCopy(constructItems[index]);
                  const thisFunction = fourthSelectionEvent(index).bind(this);
                  
                  if (instance.totalValues[0] === 2) {
                    await thisFunction(e);
                  } else {
                    if (thisObj.styling) {
                      if (thisObj.alert) {
                        if (this.getAttribute("toggle") === "off") {
                          GeneralJs.alert(thisObj.notice, true, true);
                        }
                      }
                      await thisFunction(e);
                    } else {
                      GeneralJs.alert("홈스타일링에서는 불가능한 공사입니다!", true, true);
                    }
                  }
                },
                mouseenter: function (e) {
                  if (desktop) {
                    this.querySelector('.' + fourthDescriptionBoxClassName).style.display = "flex";
                  }
                },
                mouseleave: function (e) {
                  if (desktop) {
                    this.querySelector('.' + fourthDescriptionBoxClassName).style.display = "none";
                  }
                }
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(Array.isArray(instance.totalValues[2]) && instance.totalValues[2]?.includes(index)) ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                background: !(Array.isArray(instance.totalValues[2]) && instance.totalValues[2]?.includes(index)) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(Array.isArray(instance.totalValues[2]) && instance.totalValues[2]?.includes(index)) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: desktop ? String(index % (constructItems.length / 2) === (constructItems.length / 2) - 1 ? 0 : yesButtonBetween) + ea : String(index % mobileConstructItemDevide === mobileConstructItemDevide - 1 ? 0 : yesButtonBetween) + ea,
                marginBottom: String(yesButtonBetween) + ea,
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(Array.isArray(instance.totalValues[2]) && instance.totalValues[2]?.includes(index)) ? colorExtended.blueDark : colorExtended.darkBlack,
                },
                next: {
                  class: [ fourthDescriptionBoxClassName ],
                  style: {
                    display: "none",
                    position: "absolute",
                    top: Math.floor(index / (constructItems.length / 2)) === 0 ? String(-1 * (blackDescriptionBoxIndent + blackDescriptionBoxHeight)) + ea : String(yesButtonHeight + blackDescriptionBoxIndent - (1.5 * 2)) + ea,
                    left: withOut(50, blackDescriptionBoxWidth / 2, ea),
                    height: String(blackDescriptionBoxHeight) + ea,
                    width: String(blackDescriptionBoxWidth) + ea,
                    borderRadius: String(8) + "px",
                    background: colorExtended.black,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0px 3px 15px -9px " + colorExtended.darkDarkBlack,
                  },
                  child: {
                    text: o.description,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(yesButtonTextTop) + ea,
                      fontSize: String(blackDescriptionSize) + ea,
                      fontWeight: String(blackDescriptionWeight),
                      color: colorExtended.white,
                      textAlign: "center",
                      lineHeight: String(blackDescriptionLineHeight),
                    },
                  }
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "해당 시공에 사용한 비용은 어느 정도이신가요?",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
          },
          children: (desktop ? constructItems2.map((o, index) => {
            return [
              {
                class: [ blueBlock2BarFactorClassName, blueBlock2BarFactorIndexClassName + String(index) ],
                attribute: {
                  index: String(index),
                  toggle: (index === defaultBudgetValue ? "on" : "off"),
                },
                event: {
                  click: barClickEvent2(index),
                },
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(yesButtonWidthNoMargin) + ea,
                  height: String(processBarHeight) + ea,
                  border: String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue,
                  borderRight: (index === constructItems2.length - 1 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : ""),
                  borderLeft: (index === 0 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : "1px dashed " + colorExtended.mainBlue),
                  boxSizing: "border-box",
                  borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderTopRightRadius: (index === constructItems2.length - 1 ? String(processBarHeight) + ea : ""),
                  borderBottomRightRadius: (index === constructItems2.length - 1 ? String(processBarHeight) + ea : ""),
                  background: colorExtended.white,
                  cursor: "pointer",
                },
                children: [
                  {
                    class: [ blueBlock2ClassName0 ],
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                      borderRight: (index === constructItems2.length - 1 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack : ""),
                      borderLeft: (index === 0 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
                      boxSizing: "border-box",
                      borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderTopRightRadius: (index === constructItems2.length - 1 ? String(processBarHeight) + ea : ""),
                      borderBottomRightRadius: (index === constructItems2.length - 1 ? String(processBarHeight) + ea : ""),
                      background: colorExtended.mainBlue,
                      zIndex: String(1),
                      transition: "all 0s ease",
                      opacity: index < defaultBudgetValue ? String(1) : String(0),
                    }
                  },
                  {
                    class: [ blueBlock2ClassName1 ],
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                      borderRight: String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                      borderLeft: (index === 0 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
                      boxSizing: "border-box",
                      borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderTopRightRadius: String(processBarHeight) + ea,
                      borderBottomRightRadius: String(processBarHeight) + ea,
                      background: colorExtended.mainBlue,
                      zIndex: String(1),
                      transition: "all 0s ease",
                      opacity: index === defaultBudgetValue ? String(1) : String(0),
                    }
                  },
                ]
              },
            ]
          }).flat() : [])
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: String(processValuesRatio) + '%',
          },
          children: (desktop ? constructItems2.map((o, index) => {
            return {
              class: [ blueBlock2BarWordsIndexClassName + String(index) ],
              attribute: {
                index: String(index),
              },
              event: {
                click: barClickEvent2(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: "calc(100% / " + String(constructItems2.length) + ")",
                height: String(yesButtonHeight) + ea,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(processValueSize) + ea,
                  fontWeight: String(processValueWeight),
                  color: index === defaultBudgetValue ? colorExtended.darkBlack : colorExtended.mainBlue,
                }
              }
            }
          }) : constructItems2.map((o, index) => {
            return {
              class: [ blueBlock2BarFactorClassName ],
              attribute: {
                index: String(index),
                toggle: (index === defaultBudgetValue ? "on" : "off"),
              },
              event: {
                click: async function (e) {
                  try {
                    const targets = document.querySelectorAll('.' + blueBlock2BarFactorClassName);
                    const index = Number(this.getAttribute("index"));
                    const toggle = this.getAttribute("toggle");
                    if (toggle === "on") {
                      for (let dom of targets) {
                        if (index === Number(dom.getAttribute("index"))) {
                          dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                          dom.style.background = colorExtended.white;
                          dom.style.boxShadow = "";
                          dom.firstChild.style.color = colorExtended.blueDark;
                          dom.setAttribute("toggle", "off");
                          instance.totalValues[7] = null;
                        }
                      }
                    } else {
                      for (let dom of targets) {
                        if (index === Number(dom.getAttribute("index"))) {
                          dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                          dom.style.background = colorExtended.mainBlue;
                          dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                          dom.firstChild.style.color = colorExtended.darkBlack;
                          dom.setAttribute("toggle", "on");
                          instance.totalValues[7] = Number(dom.getAttribute("index"));
                          await instance.updateImmediately(7, index, constructItems2.map((o) => { return o.title }));
                        } else {
                          dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                          dom.style.background = colorExtended.white;
                          dom.style.boxShadow = "";
                          dom.firstChild.style.color = colorExtended.blueDark;
                          dom.setAttribute("toggle", "off");
                        }
                      }
                    }
          
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidthNoMargin) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(index === defaultBudgetValue) ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                background: !(index === defaultBudgetValue) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(index === defaultBudgetValue) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: desktop ? String(index % (constructItems2.length / 2) === (constructItems2.length / 2) - 1 ? 0 : yesButtonBetween) + ea : String(index % mobileConstructItemDevide === mobileConstructItemDevide - 1 ? 0 : yesButtonBetween) + ea,
                marginBottom: String(yesButtonBetween) + ea,
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(index === defaultBudgetValue) ? colorExtended.blueDark : colorExtended.darkBlack,
                },
              }
            }
          }))
        }
      ]
    });

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "진행한 시공에 대한 만족도를 알려주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            width: withOut(0, ea),
          },
          children: fabricItems2.map((o, index) => {
            return {
              class: [ selectionBaseFifthClassName2 ],
              attribute: {
                index: String(index),
                toggle: (Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "on" : "off",
              },
              event: {
                click: fifthSelectionEvent3(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth2) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                background: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: desktop ? String(index % (fabricItems2.length / 1) === (fabricItems2.length / 1) - 1 ? 0 : yesButtonBetween) + ea : "",
                marginBottom: String(yesButtonBetween) + ea,
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.blueDark : colorExtended.darkBlack,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: String(buttonHeight) + ea,
        marginBottom: String(completeButtonAreaMarginBottom) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          event: {
            click: async function (e) {
              let convertingFunction;
              convertingFunction = instance.firstReturn().bind(this);
              await convertingFunction(e);
              return 1;
            },
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(returnCircleWidth) + ea,
            height: String(returnCircleWidth) + ea,
            borderRadius: String(returnCircleWidth) + ea,
            marginRight: String(returnCircleMarginRight) + ea,
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            border: String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue,
            cursor: "pointer",
          },
          child: {
            mode: "svg",
            source: svgMaker.buttonLineArrow(colorExtended.mainBlue),
            style: {
              position: "relative",
              width: String(returnCicleArrowWidth) + ea,
              transformOrigin: "50% 50%",
              transform: "rotate(180deg)",
              left: String(returnCicleArrowLeft) + ea,
            }
          }
        },
        {
          event: {
            click: async function (e) {
              let convertingFunction;
              convertingFunction = instance.secondConverting().bind(this);
              await convertingFunction(e);
              return 1;
            },
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(completeButtonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(10) + "px",
            background: colorExtended.darkBlack,
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid " + colorExtended.blueDark,
            cursor: "pointer",
          },
          child: {
            text: "선택 완료",
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(completeButtonSize) + ea,
              fontWeight: String(completeButtonWeight),
              color: colorExtended.white,
              top: String(completeButtonTextTop) + ea,
            }
          }
        }
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

ClientEvaluationJs.prototype.renderThirdContents = async function (ghostBase) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { firstFadeOutTargetClassName, fourthFadeOutTargetClassName, thirdFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName } = this;
  const selectionBaseFifthClassName0 = "selectionBaseFifthClassName0";
  const selectionBaseFifthClassName1 = "selectionBaseFifthClassName1";
  const selectionBaseFifthClassName2 = "selectionBaseFifthClassName2";
  const selectionBaseSixthClassName3 = "selectionBaseSixthClassName3";
  const blueBlockClassName0 = "blueBlockClassName0";
  const blueBlockClassName1 = "blueBlockClassName1";
  const blueBlockBarFactorClassName = "blueBlockBarFactorClassName";
  const blueBlockBarFactorIndexClassName = "blueBlockBarFactorClassName_index_";
  const blueBlockBarWordsIndexClassName = "blueBlockBarWordsClassName_index_";
  const blueBlock2ClassName0 = "blueBlock2ClassName0";
  const blueBlock2ClassName1 = "blueBlock2ClassName1";
  const blueBlock2BarFactorClassName = "blueBlock2BarFactorClassName";
  const blueBlock2BarFactorIndexClassName = "blueBlock2BarFactorClassName_index_";
  const blueBlock2BarWordsIndexClassName = "blueBlock2BarWordsClassName_index_";
  const selectionBaseFourthClassName0 = "selectionBaseFourthClassName0";
  const selectionBaseFourthClassName1 = "selectionBaseFourthClassName1";
  const fourthNoticeBoxClassName = "fourthNoticeBoxClassName";
  const fourthDescriptionBoxClassName = "fourthDescriptionBoxClassName";
  try {
    const fadeOutTargets0 = [ ...document.querySelectorAll('.' + firstFadeOutTargetClassName) ];
    const fadeOutTargets = [ ...document.querySelectorAll('.' + thirdFadeOutTargetClassName) ];
    const furnishingMode = false;
    let minusLeft;
    let descriptionSize;
    let titleSize;
    let descriptionMarginTop;
    let betweenMargin;
    let checkCircleWidth;
    let buttonHeight;
    let wordsMotherMarginTop;
    let numberSize;
    let numberWeight;
    let numberBarHeight;
    let numberBarMarginLeft;
    let numberBarTop;
    let numbersAreaMarginTop;
    let titleMarginTop;
    let titleWeight;
    let titleSquareWidth, titleSquareMarginRight, titleSquareTop;
    let imageAreaMarginTop, imageAreaMarginBottom;
    let imageWidth;
    let yesButtonAreaMarginTop;
    let yesButtonWidth, yesButtonWidth2;
    let yesButtonHeight;
    let yesButtonBetween;
    let yesButtonTextTop;
    let yesButtonSize;
    let yesButtonWeight;
    let completeButtonWidth, completeButtonAreaMarginBottom;
    let completeButtonSize, completeButtonWeight, completeButtonTextTop;
    let returnCircleWidth;
    let returnCircleMarginRight;
    let returnCicleArrowWidth, returnCicleArrowLeft;
    let constructItems;
    let statusItems;
    let blueBoxHeight, blueBoxHeight2;
    let middleLineMarginBottom;
    let middleLinePaddingTop;
    let blueDescriptionSize, blueDescriptionWeight, blueDescriptionBoldWeight, blueDescriptionTextTop;
    let fabricItems;
    let yesButtonWidthNoMargin;
    let processBarHeight;
    let defaultBudgetValue;
    let blueWhiteFactorsAreaMarginTop;
    let blueWhiteFactorLineWidth, blueWhiteFactorLineMarginRight;
    let blueWhiteFactorWidth, blueWhiteFactorHeight;
    let blueWhiteFactorTextTop, blueWhiteFactorSize, blueWhiteFactorWeight;
    let blueWhitePlusCircleWidth, blueWhitePlusCircleSize, blueWhitePlusCircleWeight, blueWhitePlusCircleTextTop;
    let blueWhitePlusCircleMargin;
    let processValuesRatio;
    let processValueSize, processValueWeight;
    let convertingBaseHeight;
    let barClickEvent;
    let fifthSelectionEvent2, fifthSelectionEvent3;
    let mobileConstructItemDevide;
    let barClickEvent2;
    let fabricItems2;
    let mobileConstructPopupEvent;
    let fourthSelectionEvent;
    let alertCircleWidth;
    let alertCircleMarginLeft;
    let alertTextTop;
    let alertSize;
    let alertWeight;
    let blackDescriptionBoxHeight;
    let blackDescriptionBoxWidth;
    let blackDescriptionBoxIndent;
    let blackDescriptionSize;
    let blackDescriptionWeight;
    let blackDescriptionLineHeight;
    let constructItems2;
    let yesButtonWidth3;

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 21, 15, 10, 2 %%>;
    titleSize = <%% 25, 24, 22, 19, 4.7 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;
    titleSquareWidth = <%% 8, 8, 6, 5, 1.4 %%>;
    titleSquareMarginRight = <%% 9, 8, 7, 5, 1.4 %%>;
    titleSquareTop = <%% (isMac() ? 1 : -1), (isMac() ? 1 : -2), (isMac() ? 1 : -2), (isMac() ? 1 : -2), 0 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;

    betweenMargin = <%% 26, 26, 26, 26, 26 %%>;
    checkCircleWidth = <%% 23, 23, 23, 23, 23 %%>;
    buttonHeight = <%% 42, 42, 38, 32, 9 %%>;

    wordsMotherMarginTop = <%% 120, 120, 120, 120, 120 %%>;

    numberSize = <%% 28, 26, 24, 21, 5 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 24, 22, 19, 4.5 %%>;
    numberBarMarginLeft = <%% 12, 12, 10, 9, 2.1 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -0.4 %%>;

    numbersAreaMarginTop = heightTong.numbers;

    imageAreaMarginTop = <%% 45, 40, 35, 25, 6.5 %%>;
    imageAreaMarginBottom = <%% 110, 100, 75, 50, 11.5 %%>;
    imageWidth = <%% 510, 510, 510, 510, 510 %%>;

    yesButtonAreaMarginTop = <%% 25, 21, 18, 16, 4.5 %%>;
    yesButtonWidth = <%% 160, 140, 130, 100, 30 %%>;
    yesButtonWidth2 = <%% 400, 240, 130, 100, 30 %%>;
    yesButtonHeight = <%% 40, 36, 34, 32, 8 %%>;
    yesButtonBetween = <%% 12, 10, 9, 6, 1.6 %%>;
    yesButtonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    yesButtonSize = <%% 16, 15, 14, 13, 3.2 %%>;
    yesButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    completeButtonWidth = <%% 120, 120, 110, 90, 22 %%>;
    completeButtonAreaMarginBottom = <%% 129, 129, 110, 100, 23 %%>;
    completeButtonSize = <%% 17, 17, 16, 14, 3.6 %%>;
    completeButtonWeight = <%% 700, 700, 700, 700, 700 %%>;
    completeButtonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

    returnCircleWidth = <%% 34, 34, 32, 28, 6.8 %%>;
    returnCircleMarginRight = <%% 11, 11, 10, 7, 1.8 %%>;
    returnCicleArrowWidth = <%% 9, 9, 8, 7, 1.8 %%>;
    returnCicleArrowLeft = <%% -1.5, -1.5, -1, -0.5, -0.2 %%>;

    middleLineMarginBottom = <%% 100, 90, 80, 65, 11.5 %%>;
    middleLinePaddingTop = <%% 80, 70, 60, 50, 10 %%>;

    blueBoxHeight = <%% 130, 120, 105, 90, 21 %%>;
    blueBoxHeight2 = <%% 70, 68, 60, 52, 16 %%>;
    blueDescriptionSize = <%% 16, 15, 14, 13, 3 %%>;
    blueDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueDescriptionBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueDescriptionTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

    processBarHeight = <%% 24, 21, 18, 15, 3 %%>;
    defaultBudgetValue = <%% 5, 5, 5, 5, 5 %%>;
    blueWhiteFactorsAreaMarginTop = <%% 11, 11, 11, 11, 1.5 %%>;
    blueWhiteFactorLineWidth = <%% 352, 280, 240, 200, 0 %%>;
    blueWhiteFactorLineMarginRight = <%% 10, 10, 10, 10, 0 %%>;
    blueWhiteFactorWidth = <%% 180, 150, 120, 90, 21 %%>;
    blueWhiteFactorHeight = <%% 36, 30, 26, 21, 6.1 %%>;
    blueWhiteFactorTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    blueWhiteFactorSize = <%% 15, 14, 12, 11, 2.7 %%>;
    blueWhiteFactorWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueWhitePlusCircleWidth = <%% 22, 19, 17, 14, 4 %%>;
    blueWhitePlusCircleSize = <%% 20, 19, 16, 15, 3.5 %%>;
    blueWhitePlusCircleWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueWhitePlusCircleTextTop = <%% (isMac() ? -1 : 2), (isMac() ? -1 : 2), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.1 %%>;
    blueWhitePlusCircleMargin = <%% 8, 7, 6, 4, 1.2 %%>;

    processValueSize = <%% 15, 13, 12, 10, 2.5 %%>;
    processValueWeight = <%% 700, 700, 700, 700, 700 %%>;

    convertingBaseHeight = heightTong.fifth;

    processValuesRatio = <%% 99.4, 99.4, 99.4, 100, 100 %%>;

    mobileConstructItemDevide = 3;

    blackDescriptionBoxHeight = <%% 56, 56, 56, 56, 56 %%>;
    blackDescriptionBoxWidth = <%% 196, 196, 196, 196, 196 %%>;
    blackDescriptionBoxIndent = <%% 10, 10, 10, 10, 10 %%>;

    blackDescriptionSize = <%% 12, 12, 12, 12, 12 %%>;
    blackDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blackDescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

    alertCircleWidth = <%% 36, 34, 32, 30, 3.8 %%>;
    alertCircleMarginLeft = <%% 12, 11, 10, 9, 1 %%>;
    alertTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), 0 %%>;
    alertSize = <%% 28, 27, 26, 24, 3.2 %%>;
    alertWeight = <%% 700, 700, 700, 700, 700 %%>;

    statusItems = objectDeepCopy(instance.totalMenu[5]);
    fabricItems = [
      {
        title: "3주 이내",
        value: 21,
      },
      {
        title: "4주 이내",
        value: 21,
      },
      {
        title: "한 달 이상",
        value: 30,
      },
      {
        title: "두 달 이하",
        value: 60,
      },
      {
        title: "두 달 이상",
        value: 80,
      },
    ];
    fabricItems2 = [
      {
        title: "매우 불만족",
        value: "매우 불만족",
      },
      {
        title: "불만족",
        value: "불만족",
      },
      {
        title: "보통",
        value: "보통",
      },
      {
        title: "만족",
        value: "만족",
      },
      {
        title: "매우 만족",
        value: "매우 만족",
      },
    ];
    constructItems2 = objectDeepCopy(instance.totalMenu[4]).slice(0, -2);
    constructItems = [
      {
        title: "구입하지 않고 재배치",
        value: "구입하지 않고 재배치",
      },
      {
        title: "재배치 + 일부 구매",
        title: "재배치 + 일부 구매",
      },
      {
        title: "모든 가구 새로 구매",
        value: "모든 가구 새로 구매",
      },
    ];

    mobileConstructPopupEvent = (constructItems) => {
      return async function (e) {
        try {
          await instance.constructItemPopupEvent(constructItems);
        } catch (e) {
          console.log(e);
        }
      }
    }

    yesButtonWidth = (standardWidth - (yesButtonBetween * ((constructItems.length / 1) - 1))) / (constructItems.length / 1);
    yesButtonWidthNoMargin = (standardWidth - (0 * ((constructItems2.length / 1) - 1))) / (constructItems2.length / 1);
    yesButtonWidth2 = (standardWidth - (yesButtonBetween * ((fabricItems2.length / 1) - 1))) / (fabricItems2.length / 1);

    if (mobile) {
      yesButtonWidth = (standardWidth - (yesButtonBetween * (mobileConstructItemDevide - 1))) / mobileConstructItemDevide;
      yesButtonWidth2 = standardWidth;
      yesButtonWidthNoMargin = (standardWidth - (yesButtonBetween * (mobileConstructItemDevide - 1))) / mobileConstructItemDevide;
    }

    if (instance.totalValues[4] === null) {
      instance.totalValues[4] = defaultBudgetValue;
    } else {
      defaultBudgetValue = instance.totalValues[4];
    }

    barClickEvent = (i) => {
      return async (e) => {
        try {
          const target = document.querySelector('.' + blueBlockBarFactorIndexClassName + String(i));
          const index = Number(target.getAttribute("index"));
          const siblings = [ ...target.parentElement.querySelectorAll('.' + blueBlockBarFactorClassName) ];
          const toggle = target.getAttribute("toggle");
          let blue0, blue1, num, wordsTarget;

          siblings.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) })

          num = 0;
          for (let dom of siblings) {
            blue0 = dom.querySelector('.' + blueBlockClassName0);
            blue1 = dom.querySelector('.' + blueBlockClassName1);
            wordsTarget = document.querySelector('.' + blueBlockBarWordsIndexClassName + String(num));
            if (index > num) {
              blue0.style.opacity = String(1);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            } else if (index === num) {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(1);
              wordsTarget.firstChild.style.color = colorExtended.darkBlack;
              dom.setAttribute("toggle", "on");
            } else {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            }
            num++;
          }

          instance.totalValues[4] = index;
          await instance.updateImmediately(4, index, constructItems.map((o) => { return o.value }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    barClickEvent2 = (i) => {
      return async (e) => {
        try {
          const target = document.querySelector('.' + blueBlock2BarFactorIndexClassName + String(i));
          const index = Number(target.getAttribute("index"));
          const siblings = [ ...target.parentElement.querySelectorAll('.' + blueBlock2BarFactorClassName) ];
          const toggle = target.getAttribute("toggle");
          let blue0, blue1, num, wordsTarget;

          siblings.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) })

          num = 0;
          for (let dom of siblings) {
            blue0 = dom.querySelector('.' + blueBlock2ClassName0);
            blue1 = dom.querySelector('.' + blueBlock2ClassName1);
            wordsTarget = document.querySelector('.' + blueBlock2BarWordsIndexClassName + String(num));
            if (index > num) {
              blue0.style.opacity = String(1);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            } else if (index === num) {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(1);
              wordsTarget.firstChild.style.color = colorExtended.darkBlack;
              dom.setAttribute("toggle", "on");
            } else {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            }
            num++;
          }

          instance.totalValues[7] = index;
          await instance.updateImmediately(7, index, constructItems2.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    fifthSelectionEvent2 = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseFifthClassName1);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
              }
            }
          }

          instance.totalValues[5] = [ ...document.querySelectorAll('.' + selectionBaseFifthClassName1) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });
          await instance.updateImmediately(5, instance.totalValues[5], statusItems.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    fifthSelectionEvent3 = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseFifthClassName2);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
              }
            }
          }

          instance.totalValues[6] = [ ...document.querySelectorAll('.' + selectionBaseFifthClassName2) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });
          await instance.updateImmediately(6, instance.totalValues[6], fabricItems.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    fourthSelectionEvent = (index) => {
      return async function (e) {
        try {
          const targets = [ ...document.querySelectorAll('.' + selectionBaseFourthClassName0) ];
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          let finalArr;
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              } else {
                // dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                // dom.style.background = colorExtended.mainBlue;
                // dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                // dom.firstChild.style.color = colorExtended.darkBlack;
                // dom.setAttribute("toggle", "on");
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
              } else {
                // dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                // dom.style.background = colorExtended.white;
                // dom.style.boxShadow = "";
                // dom.firstChild.style.color = colorExtended.blueDark;
                // dom.setAttribute("toggle", "off");
              }
            }
          }

          finalArr = [ ...document.querySelectorAll('.' + selectionBaseFourthClassName0) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });

          instance.totalValues[2] = objectDeepCopy(finalArr);
          await instance.updateImmediately(2, finalArr, constructItems.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: String(numbersAreaMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: String(instance.lineWeight) + "px" + " solid " + colorExtended.blueDark,
          },
          children: [
            {
              text: "3",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: String(numberBarHeight) + ea,
                width: String(0),
                borderRight: "2px solid " + colorExtended.mainBlue,
                transform: "rotate(25deg)",
                marginLeft: String(numberBarMarginLeft) + ea,
                marginRight: String(numberBarMarginLeft) + ea,
                top: String(numberBarTop) + ea,
              }
            },
            {
              text: "4",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
                opacity: String(0.4),
              }
            },
          ]
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "가구의 재사용과 신규 구매의 정도를 알려주세요!",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(blueBoxHeight2) + ea,
            borderRadius: String(10) + "px",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.gray2,
                opacity: String(1),
              }
            },
            {
              text: "<b%*%b>재배치 = 기존 가구를 재사용 / 구매 = 새로운 가구를 구매",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(blueDescriptionTextTop) + ea,
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionWeight),
                color: colorExtended.black,
              },
              bold: {
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionBoldWeight),
                color: colorExtended.blueDark,
              },
              under: {
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(400),
                color: colorExtended.black,
              },
            }
          ]
        },
        {
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            width: withOut(0, ea),
            marginTop: String(yesButtonAreaMarginTop) + ea,
          },
          children: constructItems.map((o, index) => {
            return {
              class: [ selectionBaseFifthClassName2 ],
              attribute: {
                index: String(index),
                toggle: (Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "on" : "off",
              },
              event: {
                click: fifthSelectionEvent3(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                background: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: desktop ? String(index % (constructItems.length / 1) === (constructItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea : "",
                marginBottom: String(yesButtonBetween) + ea,
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.blueDark : colorExtended.darkBlack,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "디자이너가 제안한 제품을 그대로 구입하신 비율을 알려주세요!",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
          },
          children: (desktop ? constructItems2.map((o, index) => {
            return [
              {
                class: [ blueBlock2BarFactorClassName, blueBlock2BarFactorIndexClassName + String(index) ],
                attribute: {
                  index: String(index),
                  toggle: (index === defaultBudgetValue ? "on" : "off"),
                },
                event: {
                  click: barClickEvent2(index),
                },
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(yesButtonWidthNoMargin) + ea,
                  height: String(processBarHeight) + ea,
                  border: String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue,
                  borderRight: (index === constructItems2.length - 1 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : ""),
                  borderLeft: (index === 0 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : "1px dashed " + colorExtended.mainBlue),
                  boxSizing: "border-box",
                  borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderTopRightRadius: (index === constructItems2.length - 1 ? String(processBarHeight) + ea : ""),
                  borderBottomRightRadius: (index === constructItems2.length - 1 ? String(processBarHeight) + ea : ""),
                  background: colorExtended.white,
                  cursor: "pointer",
                },
                children: [
                  {
                    class: [ blueBlock2ClassName0 ],
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                      borderRight: (index === constructItems2.length - 1 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack : ""),
                      borderLeft: (index === 0 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
                      boxSizing: "border-box",
                      borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderTopRightRadius: (index === constructItems2.length - 1 ? String(processBarHeight) + ea : ""),
                      borderBottomRightRadius: (index === constructItems2.length - 1 ? String(processBarHeight) + ea : ""),
                      background: colorExtended.mainBlue,
                      zIndex: String(1),
                      transition: "all 0s ease",
                      opacity: index < defaultBudgetValue ? String(1) : String(0),
                    }
                  },
                  {
                    class: [ blueBlock2ClassName1 ],
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                      borderRight: String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                      borderLeft: (index === 0 ? String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
                      boxSizing: "border-box",
                      borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderTopRightRadius: String(processBarHeight) + ea,
                      borderBottomRightRadius: String(processBarHeight) + ea,
                      background: colorExtended.mainBlue,
                      zIndex: String(1),
                      transition: "all 0s ease",
                      opacity: index === defaultBudgetValue ? String(1) : String(0),
                    }
                  },
                ]
              },
            ]
          }).flat() : [])
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: String(processValuesRatio) + '%',
          },
          children: (desktop ? constructItems2.map((o, index, thisArr) => {
            return {
              class: [ blueBlock2BarWordsIndexClassName + String(index) ],
              attribute: {
                index: String(index),
              },
              event: {
                click: barClickEvent2(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: "calc(100% / " + String(constructItems2.length) + ")",
                height: String(yesButtonHeight) + ea,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              },
              child: {
                text: (index === 0 ? "스스로 다시 찾아 구매" : (index === thisArr.length - 1 ? "제안한 그대로 구매" : "")),
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(processValueSize) + ea,
                  fontWeight: String(processValueWeight),
                  color: index === defaultBudgetValue ? colorExtended.darkBlack : colorExtended.mainBlue,
                }
              }
            }
          }) : constructItems2.map((o, index, thisArr) => {
            return {
              class: [ blueBlock2BarFactorClassName ],
              attribute: {
                index: String(index),
                toggle: (index === defaultBudgetValue ? "on" : "off"),
              },
              event: {
                click: async function (e) {
                  try {
                    const targets = document.querySelectorAll('.' + blueBlock2BarFactorClassName);
                    const index = Number(this.getAttribute("index"));
                    const toggle = this.getAttribute("toggle");
                    if (toggle === "on") {
                      for (let dom of targets) {
                        if (index === Number(dom.getAttribute("index"))) {
                          dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                          dom.style.background = colorExtended.white;
                          dom.style.boxShadow = "";
                          dom.firstChild.style.color = colorExtended.blueDark;
                          dom.setAttribute("toggle", "off");
                          instance.totalValues[7] = null;
                        }
                      }
                    } else {
                      for (let dom of targets) {
                        if (index === Number(dom.getAttribute("index"))) {
                          dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                          dom.style.background = colorExtended.mainBlue;
                          dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                          dom.firstChild.style.color = colorExtended.darkBlack;
                          dom.setAttribute("toggle", "on");
                          instance.totalValues[7] = Number(dom.getAttribute("index"));
                          await instance.updateImmediately(7, index, constructItems2.map((o) => { return o.title }));
                        } else {
                          dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                          dom.style.background = colorExtended.white;
                          dom.style.boxShadow = "";
                          dom.firstChild.style.color = colorExtended.blueDark;
                          dom.setAttribute("toggle", "off");
                        }
                      }
                    }
          
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidthNoMargin) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(index === defaultBudgetValue) ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                background: !(index === defaultBudgetValue) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(index === defaultBudgetValue) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: desktop ? String(index % (constructItems2.length / 2) === (constructItems2.length / 2) - 1 ? 0 : yesButtonBetween) + ea : String(index % mobileConstructItemDevide === mobileConstructItemDevide - 1 ? 0 : yesButtonBetween) + ea,
                marginBottom: String(yesButtonBetween) + ea,
                cursor: "pointer",
              },
              child: {
                text: (index === 0 ? "스스로 다시 찾아 구매" : (index === thisArr.length - 1 ? "제안한 그대로 구매" : "")),
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(index === defaultBudgetValue) ? colorExtended.blueDark : colorExtended.darkBlack,
                },
              }
            }
          }))
        }
      ]
    });

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "디자이너가 제안한 제품 리스트에 대한 만족도를 알려주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            width: withOut(0, ea),
          },
          children: fabricItems2.map((o, index) => {
            return {
              class: [ selectionBaseFifthClassName2 ],
              attribute: {
                index: String(index),
                toggle: (Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "on" : "off",
              },
              event: {
                click: fifthSelectionEvent3(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth2) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                background: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: desktop ? String(index % (fabricItems2.length / 1) === (fabricItems2.length / 1) - 1 ? 0 : yesButtonBetween) + ea : "",
                marginBottom: String(yesButtonBetween) + ea,
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.blueDark : colorExtended.darkBlack,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: String(buttonHeight) + ea,
        marginBottom: String(completeButtonAreaMarginBottom) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          event: {
            click: async function (e) {
              let convertingFunction;
              convertingFunction = instance.secondReturn().bind(this);
              await convertingFunction(e);
              return 1;
            },
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(returnCircleWidth) + ea,
            height: String(returnCircleWidth) + ea,
            borderRadius: String(returnCircleWidth) + ea,
            marginRight: String(returnCircleMarginRight) + ea,
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            border: String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue,
            cursor: "pointer",
          },
          child: {
            mode: "svg",
            source: svgMaker.buttonLineArrow(colorExtended.mainBlue),
            style: {
              position: "relative",
              width: String(returnCicleArrowWidth) + ea,
              transformOrigin: "50% 50%",
              transform: "rotate(180deg)",
              left: String(returnCicleArrowLeft) + ea,
            }
          }
        },
        {
          event: {
            click: async function (e) {
              let convertingFunction;
              convertingFunction = instance.thirdConverting().bind(this);
              await convertingFunction(e);
              return 1;
            },
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(completeButtonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(10) + "px",
            background: colorExtended.darkBlack,
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid " + colorExtended.blueDark,
            cursor: "pointer",
          },
          child: {
            text: "선택 완료",
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(completeButtonSize) + ea,
              fontWeight: String(completeButtonWeight),
              color: colorExtended.white,
              top: String(completeButtonTextTop) + ea,
            }
          }
        }
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

ClientEvaluationJs.prototype.renderFourthContents = async function (ghostBase) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { firstFadeOutTargetClassName, fourthFadeOutTargetClassName, thirdFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName } = this;
  const selectionBaseFifthClassName0 = "selectionBaseFifthClassName0";
  const selectionBaseFifthClassName1 = "selectionBaseFifthClassName1";
  const selectionBaseFifthClassName2 = "selectionBaseFifthClassName2";
  const selectionBaseSixthClassName3 = "selectionBaseSixthClassName3";
  const blueBlockClassName0 = "blueBlockClassName0";
  const blueBlockClassName1 = "blueBlockClassName1";
  const blueBlockBarFactorClassName = "blueBlockBarFactorClassName";
  const blueBlockBarFactorIndexClassName = "blueBlockBarFactorClassName_index_";
  const blueBlockBarWordsIndexClassName = "blueBlockBarWordsClassName_index_";
  const blueBlock2ClassName0 = "blueBlock2ClassName0";
  const blueBlock2ClassName1 = "blueBlock2ClassName1";
  const blueBlock2BarFactorClassName = "blueBlock2BarFactorClassName";
  const blueBlock2BarFactorIndexClassName = "blueBlock2BarFactorClassName_index_";
  const blueBlock2BarWordsIndexClassName = "blueBlock2BarWordsClassName_index_";
  const selectionBaseFourthClassName0 = "selectionBaseFourthClassName0";
  const selectionBaseFourthClassName1 = "selectionBaseFourthClassName1";
  const fourthNoticeBoxClassName = "fourthNoticeBoxClassName";
  const fourthDescriptionBoxClassName = "fourthDescriptionBoxClassName";
  try {
    const fadeOutTargets0 = [ ...document.querySelectorAll('.' + firstFadeOutTargetClassName) ];
    const fadeOutTargets = [ ...document.querySelectorAll('.' + thirdFadeOutTargetClassName) ];
    const furnishingMode = false;
    let minusLeft;
    let descriptionSize;
    let titleSize;
    let descriptionMarginTop;
    let betweenMargin;
    let checkCircleWidth;
    let buttonHeight;
    let wordsMotherMarginTop;
    let numberSize;
    let numberWeight;
    let numberBarHeight;
    let numberBarMarginLeft;
    let numberBarTop;
    let numbersAreaMarginTop;
    let titleMarginTop;
    let titleWeight;
    let titleSquareWidth, titleSquareMarginRight, titleSquareTop;
    let imageAreaMarginTop, imageAreaMarginBottom;
    let imageWidth;
    let yesButtonAreaMarginTop;
    let yesButtonWidth, yesButtonWidth2;
    let yesButtonHeight;
    let yesButtonBetween;
    let yesButtonTextTop;
    let yesButtonSize;
    let yesButtonWeight;
    let completeButtonWidth, completeButtonAreaMarginBottom;
    let completeButtonSize, completeButtonWeight, completeButtonTextTop;
    let returnCircleWidth;
    let returnCircleMarginRight;
    let returnCicleArrowWidth, returnCicleArrowLeft;
    let constructItems;
    let statusItems;
    let blueBoxHeight, blueBoxHeight2;
    let middleLineMarginBottom;
    let middleLinePaddingTop;
    let blueDescriptionSize, blueDescriptionWeight, blueDescriptionBoldWeight, blueDescriptionTextTop;
    let fabricItems;
    let yesButtonWidthNoMargin;
    let processBarHeight;
    let defaultBudgetValue;
    let blueWhiteFactorsAreaMarginTop;
    let blueWhiteFactorLineWidth, blueWhiteFactorLineMarginRight;
    let blueWhiteFactorWidth, blueWhiteFactorHeight;
    let blueWhiteFactorTextTop, blueWhiteFactorSize, blueWhiteFactorWeight;
    let blueWhitePlusCircleWidth, blueWhitePlusCircleSize, blueWhitePlusCircleWeight, blueWhitePlusCircleTextTop;
    let blueWhitePlusCircleMargin;
    let processValuesRatio;
    let processValueSize, processValueWeight;
    let convertingBaseHeight;
    let barClickEvent;
    let fifthSelectionEvent2, fifthSelectionEvent3;
    let mobileConstructItemDevide;
    let barClickEvent2;
    let fabricItems2;
    let mobileConstructPopupEvent;
    let fourthSelectionEvent;
    let alertCircleWidth;
    let alertCircleMarginLeft;
    let alertTextTop;
    let alertSize;
    let alertWeight;
    let blackDescriptionBoxHeight;
    let blackDescriptionBoxWidth;
    let blackDescriptionBoxIndent;
    let blackDescriptionSize;
    let blackDescriptionWeight;
    let blackDescriptionLineHeight;
    let constructItems2;
    let yesButtonWidth3;

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 21, 15, 10, 2 %%>;
    titleSize = <%% 25, 24, 22, 19, 4.7 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;
    titleSquareWidth = <%% 8, 8, 6, 5, 1.4 %%>;
    titleSquareMarginRight = <%% 9, 8, 7, 5, 1.4 %%>;
    titleSquareTop = <%% (isMac() ? 1 : -1), (isMac() ? 1 : -2), (isMac() ? 1 : -2), (isMac() ? 1 : -2), 0 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;

    betweenMargin = <%% 26, 26, 26, 26, 26 %%>;
    checkCircleWidth = <%% 23, 23, 23, 23, 23 %%>;
    buttonHeight = <%% 42, 42, 38, 32, 9 %%>;

    wordsMotherMarginTop = <%% 120, 120, 120, 120, 120 %%>;

    numberSize = <%% 28, 26, 24, 21, 5 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 24, 22, 19, 4.5 %%>;
    numberBarMarginLeft = <%% 12, 12, 10, 9, 2.1 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -0.4 %%>;

    numbersAreaMarginTop = heightTong.numbers;

    imageAreaMarginTop = <%% 45, 40, 35, 25, 6.5 %%>;
    imageAreaMarginBottom = <%% 110, 100, 75, 50, 11.5 %%>;
    imageWidth = <%% 510, 510, 510, 510, 510 %%>;

    yesButtonAreaMarginTop = <%% 25, 21, 18, 16, 4.5 %%>;
    yesButtonWidth = <%% 160, 140, 130, 100, 30 %%>;
    yesButtonWidth2 = <%% 400, 240, 130, 100, 30 %%>;
    yesButtonHeight = <%% 40, 36, 34, 32, 8 %%>;
    yesButtonBetween = <%% 12, 10, 9, 6, 1.6 %%>;
    yesButtonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    yesButtonSize = <%% 16, 15, 14, 13, 3.2 %%>;
    yesButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    completeButtonWidth = <%% 120, 120, 110, 90, 22 %%>;
    completeButtonAreaMarginBottom = <%% 129, 129, 110, 100, 23 %%>;
    completeButtonSize = <%% 17, 17, 16, 14, 3.6 %%>;
    completeButtonWeight = <%% 700, 700, 700, 700, 700 %%>;
    completeButtonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

    returnCircleWidth = <%% 34, 34, 32, 28, 6.8 %%>;
    returnCircleMarginRight = <%% 11, 11, 10, 7, 1.8 %%>;
    returnCicleArrowWidth = <%% 9, 9, 8, 7, 1.8 %%>;
    returnCicleArrowLeft = <%% -1.5, -1.5, -1, -0.5, -0.2 %%>;

    middleLineMarginBottom = <%% 100, 90, 80, 65, 11.5 %%>;
    middleLinePaddingTop = <%% 80, 70, 60, 50, 10 %%>;

    blueBoxHeight = <%% 130, 120, 105, 90, 21 %%>;
    blueBoxHeight2 = <%% 70, 68, 60, 52, 16 %%>;
    blueDescriptionSize = <%% 16, 15, 14, 13, 3 %%>;
    blueDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueDescriptionBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueDescriptionTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

    processBarHeight = <%% 24, 21, 18, 15, 3 %%>;
    defaultBudgetValue = <%% 5, 5, 5, 5, 5 %%>;
    blueWhiteFactorsAreaMarginTop = <%% 11, 11, 11, 11, 1.5 %%>;
    blueWhiteFactorLineWidth = <%% 352, 280, 240, 200, 0 %%>;
    blueWhiteFactorLineMarginRight = <%% 10, 10, 10, 10, 0 %%>;
    blueWhiteFactorWidth = <%% 180, 150, 120, 90, 21 %%>;
    blueWhiteFactorHeight = <%% 36, 30, 26, 21, 6.1 %%>;
    blueWhiteFactorTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    blueWhiteFactorSize = <%% 15, 14, 12, 11, 2.7 %%>;
    blueWhiteFactorWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueWhitePlusCircleWidth = <%% 22, 19, 17, 14, 4 %%>;
    blueWhitePlusCircleSize = <%% 20, 19, 16, 15, 3.5 %%>;
    blueWhitePlusCircleWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueWhitePlusCircleTextTop = <%% (isMac() ? -1 : 2), (isMac() ? -1 : 2), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.1 %%>;
    blueWhitePlusCircleMargin = <%% 8, 7, 6, 4, 1.2 %%>;

    processValueSize = <%% 15, 13, 12, 10, 2.5 %%>;
    processValueWeight = <%% 700, 700, 700, 700, 700 %%>;

    convertingBaseHeight = heightTong.fifth;

    processValuesRatio = <%% 99.4, 99.4, 99.4, 100, 100 %%>;

    mobileConstructItemDevide = 3;

    blackDescriptionBoxHeight = <%% 56, 56, 56, 56, 56 %%>;
    blackDescriptionBoxWidth = <%% 196, 196, 196, 196, 196 %%>;
    blackDescriptionBoxIndent = <%% 10, 10, 10, 10, 10 %%>;

    blackDescriptionSize = <%% 12, 12, 12, 12, 12 %%>;
    blackDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blackDescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

    alertCircleWidth = <%% 36, 34, 32, 30, 3.8 %%>;
    alertCircleMarginLeft = <%% 12, 11, 10, 9, 1 %%>;
    alertTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), 0 %%>;
    alertSize = <%% 28, 27, 26, 24, 3.2 %%>;
    alertWeight = <%% 700, 700, 700, 700, 700 %%>;

    statusItems = objectDeepCopy(instance.totalMenu[5]);
    fabricItems = [
      {
        title: "3주 이내",
        value: 21,
      },
      {
        title: "4주 이내",
        value: 21,
      },
      {
        title: "한 달 이상",
        value: 30,
      },
      {
        title: "두 달 이하",
        value: 60,
      },
      {
        title: "두 달 이상",
        value: 80,
      },
    ];
    fabricItems2 = [
      {
        title: "매우 불만족",
        value: "매우 불만족",
      },
      {
        title: "불만족",
        value: "불만족",
      },
      {
        title: "보통",
        value: "보통",
      },
      {
        title: "만족",
        value: "만족",
      },
      {
        title: "매우 만족",
        value: "매우 만족",
      },
    ];
    constructItems2 = objectDeepCopy(instance.totalMenu[4]);
    constructItems = [
      {
        title: "철거",
        value: "철거",
        description: "철거, 기존에 있던 것을\n모두 제거하는 작업",
        styling: true,
        alert: true,
        notice: "전체 철거는 토탈 스타일링에서만 가능합니다!",
      },
      {
        title: "보양",
        value: "보양",
        description: "엘리베이터 등에 기스 나지\n않도록 비닐을 씌우는 작업",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "목공",
        value: "목공",
        description: "나무를 사용한 작업\n걸레받이, 몰딩, 문짝, 천정 평탄화 등",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "전기",
        value: "전기",
        description: "집 내부의 전기 배선\n구성을 바꾸는 작업",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "타일",
        value: "타일",
        description: "화장실, 주방 등에 타일을\n바꾸는 작업",
        styling: true,
        alert: true,
        notice: "홈스타일링에서는 덧방 공사만 가능합니다!",
      },
      {
        title: "바닥",
        value: "바닥",
        description: "집의 바닥 공사\n장판, 마루, 타일이 있음",
        styling: true,
        alert: true,
        notice: "홈스타일링에서는 장판과 마루 공사만 가능합니다!",
      },
      {
        title: "욕실",
        value: "욕실",
        description: "화장실 공사, 홈스타일링에선\n부분 악세사리 교체만 가능",
        styling: true,
        alert: true,
        notice: "홈스타일링에서는 부분 악세사리 교체만 가능합니다!",
      },
      {
        title: "주방",
        value: "주방",
        description: "주방 공사, 홈스타일링에선\n부분 악세사리 교체만 가능",
        styling: true,
        alert: true,
        notice: "홈스타일링에서는 부분 악세사리 교체만 가능합니다!",
      },
      {
        title: "필름",
        value: "필름",
        description: "필름지를 씌워 해당 면의\n색상이나 재질감을 바꾸는 제공",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "도배",
        value: "도배",
        description: "벽에 도배지를 바르는 작업\n합지와 실크가 있음",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "도장",
        value: "도장",
        description: "페인팅, 탄성코트 등\n면의 도료를 칠하는 공사",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "중문",
        value: "중문",
        description: "현관에 중문을\n새로 달거나 바꾸는 작업",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "발코니",
        value: "발코니",
        description: "발코니의 확장 및\n확장 부분 단열 공사",
        styling: false,
        alert: false,
        notice: "",
      },
      {
        title: "금속 샤시",
        value: "금속 샤시",
        description: "모든 금속 공사와\n샤시 교체 작업",
        styling: false,
        alert: false,
        notice: "",
      },
      {
        title: "조명",
        value: "조명",
        description: "스타일링을 위한 조명\n배치부터 조명 제품 선택",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "제작 가구",
        value: "제작 가구",
        description: "대가구, 소가구로 나뉘며\n제작이 필요한 모든 가구",
        styling: true,
        alert: false,
        notice: "",
      },
    ];

    mobileConstructPopupEvent = (constructItems) => {
      return async function (e) {
        try {
          await instance.constructItemPopupEvent(constructItems);
        } catch (e) {
          console.log(e);
        }
      }
    }

    yesButtonWidth = (standardWidth - (yesButtonBetween * ((constructItems.length / 2) - 1))) / (constructItems.length / 2);
    yesButtonWidthNoMargin = (standardWidth - (0 * ((constructItems2.length / 1) - 1))) / (constructItems2.length / 1);
    yesButtonWidth2 = (standardWidth - (yesButtonBetween * ((fabricItems2.length / 1) - 1))) / (fabricItems2.length / 1);

    if (mobile) {
      yesButtonWidth = (standardWidth - (yesButtonBetween * (mobileConstructItemDevide - 1))) / mobileConstructItemDevide;
      yesButtonWidth2 = standardWidth;
      yesButtonWidthNoMargin = (standardWidth - (yesButtonBetween * (mobileConstructItemDevide - 1))) / mobileConstructItemDevide;
    }

    if (instance.totalValues[4] === null) {
      instance.totalValues[4] = defaultBudgetValue;
    } else {
      defaultBudgetValue = instance.totalValues[4];
    }

    barClickEvent = (i) => {
      return async (e) => {
        try {
          const target = document.querySelector('.' + blueBlockBarFactorIndexClassName + String(i));
          const index = Number(target.getAttribute("index"));
          const siblings = [ ...target.parentElement.querySelectorAll('.' + blueBlockBarFactorClassName) ];
          const toggle = target.getAttribute("toggle");
          let blue0, blue1, num, wordsTarget;

          siblings.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) })

          num = 0;
          for (let dom of siblings) {
            blue0 = dom.querySelector('.' + blueBlockClassName0);
            blue1 = dom.querySelector('.' + blueBlockClassName1);
            wordsTarget = document.querySelector('.' + blueBlockBarWordsIndexClassName + String(num));
            if (index > num) {
              blue0.style.opacity = String(1);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            } else if (index === num) {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(1);
              wordsTarget.firstChild.style.color = colorExtended.darkBlack;
              dom.setAttribute("toggle", "on");
            } else {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            }
            num++;
          }

          instance.totalValues[4] = index;
          await instance.updateImmediately(4, index, constructItems.map((o) => { return o.value }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    barClickEvent2 = (i) => {
      return async (e) => {
        try {
          const target = document.querySelector('.' + blueBlock2BarFactorIndexClassName + String(i));
          const index = Number(target.getAttribute("index"));
          const siblings = [ ...target.parentElement.querySelectorAll('.' + blueBlock2BarFactorClassName) ];
          const toggle = target.getAttribute("toggle");
          let blue0, blue1, num, wordsTarget;

          siblings.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) })

          num = 0;
          for (let dom of siblings) {
            blue0 = dom.querySelector('.' + blueBlock2ClassName0);
            blue1 = dom.querySelector('.' + blueBlock2ClassName1);
            wordsTarget = document.querySelector('.' + blueBlock2BarWordsIndexClassName + String(num));
            if (index > num) {
              blue0.style.opacity = String(1);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            } else if (index === num) {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(1);
              wordsTarget.firstChild.style.color = colorExtended.darkBlack;
              dom.setAttribute("toggle", "on");
            } else {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            }
            num++;
          }

          instance.totalValues[7] = index;
          await instance.updateImmediately(7, index, constructItems2.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    fifthSelectionEvent2 = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseFifthClassName1);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
              }
            }
          }

          instance.totalValues[5] = [ ...document.querySelectorAll('.' + selectionBaseFifthClassName1) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });
          await instance.updateImmediately(5, instance.totalValues[5], statusItems.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    fifthSelectionEvent3 = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseFifthClassName2);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
              }
            }
          }

          instance.totalValues[6] = [ ...document.querySelectorAll('.' + selectionBaseFifthClassName2) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });
          await instance.updateImmediately(6, instance.totalValues[6], fabricItems.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    fourthSelectionEvent = (index) => {
      return async function (e) {
        try {
          const targets = [ ...document.querySelectorAll('.' + selectionBaseFourthClassName0) ];
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          let finalArr;
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              } else {
                // dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                // dom.style.background = colorExtended.mainBlue;
                // dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                // dom.firstChild.style.color = colorExtended.darkBlack;
                // dom.setAttribute("toggle", "on");
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
              } else {
                // dom.style.border = String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue;
                // dom.style.background = colorExtended.white;
                // dom.style.boxShadow = "";
                // dom.firstChild.style.color = colorExtended.blueDark;
                // dom.setAttribute("toggle", "off");
              }
            }
          }

          finalArr = [ ...document.querySelectorAll('.' + selectionBaseFourthClassName0) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });

          instance.totalValues[2] = objectDeepCopy(finalArr);
          await instance.updateImmediately(2, finalArr, constructItems.map((o) => { return o.title }));

        } catch (e) {
          console.log(e);
        }
      }
    }

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: String(numbersAreaMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: String(instance.lineWeight) + "px" + " solid " + colorExtended.blueDark,
          },
          children: [
            {
              text: "4",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: String(numberBarHeight) + ea,
                width: String(0),
                borderRight: "2px solid " + colorExtended.mainBlue,
                transform: "rotate(25deg)",
                marginLeft: String(numberBarMarginLeft) + ea,
                marginRight: String(numberBarMarginLeft) + ea,
                top: String(numberBarTop) + ea,
              }
            },
            {
              text: "4",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
                opacity: String(0.4),
              }
            },
          ]
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "디자이너에게 받은 디자인과 페이퍼워크에 대한 만족도를 알려주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            width: withOut(0, ea),
          },
          children: fabricItems2.map((o, index) => {
            return {
              class: [ selectionBaseFifthClassName2 ],
              attribute: {
                index: String(index),
                toggle: (Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "on" : "off",
              },
              event: {
                click: fifthSelectionEvent3(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth2) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                background: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: desktop ? String(index % (fabricItems2.length / 1) === (fabricItems2.length / 1) - 1 ? 0 : yesButtonBetween) + ea : "",
                marginBottom: String(yesButtonBetween) + ea,
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.blueDark : colorExtended.darkBlack,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "디자이너는 피드백을 적절히 제공하였나요?",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            width: withOut(0, ea),
          },
          children: fabricItems2.map((o, index) => {
            return {
              class: [ selectionBaseFifthClassName2 ],
              attribute: {
                index: String(index),
                toggle: (Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "on" : "off",
              },
              event: {
                click: fifthSelectionEvent3(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth2) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                background: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: desktop ? String(index % (fabricItems2.length / 1) === (fabricItems2.length / 1) - 1 ? 0 : yesButtonBetween) + ea : "",
                marginBottom: String(yesButtonBetween) + ea,
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.blueDark : colorExtended.darkBlack,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "디자이너의 일정 관리와 운영에 대한 만족도를 알려주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            width: withOut(0, ea),
          },
          children: fabricItems2.map((o, index) => {
            return {
              class: [ selectionBaseFifthClassName2 ],
              attribute: {
                index: String(index),
                toggle: (Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "on" : "off",
              },
              event: {
                click: fifthSelectionEvent3(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth2) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue : String(instance.lineWeight) + "px" + " solid " + colorExtended.darkBlack,
                background: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: desktop ? String(index % (fabricItems2.length / 1) === (fabricItems2.length / 1) - 1 ? 0 : yesButtonBetween) + ea : "",
                marginBottom: String(yesButtonBetween) + ea,
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.blueDark : colorExtended.darkBlack,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      class: [ fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: String(buttonHeight) + ea,
        marginBottom: String(completeButtonAreaMarginBottom) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "fadeupdelay2 ease 1s forwards",
      },
      children: [
        {
          event: {
            click: async function (e) {
              let convertingFunction;
              convertingFunction = instance.thirdReturn().bind(this);
              await convertingFunction(e);
              return 1;
            },
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(returnCircleWidth) + ea,
            height: String(returnCircleWidth) + ea,
            borderRadius: String(returnCircleWidth) + ea,
            marginRight: String(returnCircleMarginRight) + ea,
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            border: String(instance.lineWeight) + "px" + " solid " + colorExtended.mainBlue,
            cursor: "pointer",
          },
          child: {
            mode: "svg",
            source: svgMaker.buttonLineArrow(colorExtended.mainBlue),
            style: {
              position: "relative",
              width: String(returnCicleArrowWidth) + ea,
              transformOrigin: "50% 50%",
              transform: "rotate(180deg)",
              left: String(returnCicleArrowLeft) + ea,
            }
          }
        },
        {
          event: {
            click: async function (e) {
              let convertingFunction;
              convertingFunction = instance.firstConverting().bind(this);
              await convertingFunction(e);
              return 1;
            },
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(completeButtonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(10) + "px",
            background: colorExtended.darkBlack,
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid " + colorExtended.blueDark,
            cursor: "pointer",
          },
          child: {
            text: "선택 완료",
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(completeButtonSize) + ea,
              fontWeight: String(completeButtonWeight),
              color: colorExtended.white,
              top: String(completeButtonTextTop) + ea,
            }
          }
        }
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

ClientEvaluationJs.prototype.firstConverting = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo, cleanChildren } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, fourthFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName, ghostBaseClassName } = this;
  return async function (e) {
    try {
      const fadeOutTargets = [ ...document.querySelectorAll('.' + fourthFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = heightTong.scroll;
      numbersAreaMarginTop = heightTong.numbers;

      scrollTo(window, 0, 0, false, async () => {
        for (let dom of fadeOutTargets) {
          dom.style.animation = "fadeoutlite 0.6s ease forwards";
        }
        setQueue(() => {
          cleanChildren(document.querySelector('.' + ghostBaseClassName));
          instance.renderSecondContents(document.querySelector('.' + ghostBaseClassName)).then(() => {
            scrollTo(window, document.querySelector('.' + ghostBaseClassName), 30);
          }).catch((err) => {
            console.log(err);
          });
        }, 600);
      });

    } catch (e) {
      console.log(e);
    }
  }
}

ClientEvaluationJs.prototype.secondConverting = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo, cleanChildren } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, fourthFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName, ghostBaseClassName } = this;
  return async function (e) {
    try {
      const fadeOutTargets = [ ...document.querySelectorAll('.' + fourthFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = heightTong.scroll;
      numbersAreaMarginTop = heightTong.numbers;

      scrollTo(window, 0, 0, false, async () => {
        for (let dom of fadeOutTargets) {
          dom.style.animation = "fadeoutlite 0.6s ease forwards";
        }
        setQueue(() => {
          cleanChildren(document.querySelector('.' + ghostBaseClassName));
          instance.renderThirdContents(document.querySelector('.' + ghostBaseClassName)).then(() => {
            scrollTo(window, document.querySelector('.' + ghostBaseClassName), 30);
          }).catch((err) => {
            console.log(err);
          });
        }, 600);
      });

    } catch (e) {
      console.log(e);
    }
  }
}

ClientEvaluationJs.prototype.thirdConverting = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo, cleanChildren } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, fourthFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName, ghostBaseClassName } = this;
  return async function (e) {
    try {
      const fadeOutTargets = [ ...document.querySelectorAll('.' + fourthFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = heightTong.scroll;
      numbersAreaMarginTop = heightTong.numbers;

      scrollTo(window, 0, 0, false, async () => {
        for (let dom of fadeOutTargets) {
          dom.style.animation = "fadeoutlite 0.6s ease forwards";
        }
        setQueue(() => {
          cleanChildren(document.querySelector('.' + ghostBaseClassName));
          instance.renderFourthContents(document.querySelector('.' + ghostBaseClassName)).then(() => {
            scrollTo(window, document.querySelector('.' + ghostBaseClassName), 30);
          }).catch((err) => {
            console.log(err);
          });
        }, 600);
      });

    } catch (e) {
      console.log(e);
    }
  }
}

ClientEvaluationJs.prototype.firstReturn = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo, cleanChildren } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, fourthFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName, ghostBaseClassName } = this;
  return async function (e) {
    try {
      const fadeOutTargets = [ ...document.querySelectorAll('.' + fourthFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = heightTong.scroll;
      numbersAreaMarginTop = heightTong.numbers;

      scrollTo(window, 0, 0, false, async () => {
        for (let dom of fadeOutTargets) {
          dom.style.animation = "fadeoutlite 0.6s ease forwards";
        }
        setQueue(() => {
          cleanChildren(document.querySelector('.' + ghostBaseClassName));
          instance.renderFirstContents(document.querySelector('.' + ghostBaseClassName)).then(() => {
            scrollTo(window, document.querySelector('.' + ghostBaseClassName), 30);
          }).catch((err) => {
            console.log(err);
          });
        }, 600);
      });

    } catch (e) {
      console.log(e);
    }
  }
}

ClientEvaluationJs.prototype.secondReturn = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo, cleanChildren } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, fourthFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName, ghostBaseClassName } = this;
  return async function (e) {
    try {
      const fadeOutTargets = [ ...document.querySelectorAll('.' + fourthFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = heightTong.scroll;
      numbersAreaMarginTop = heightTong.numbers;

      scrollTo(window, 0, 0, false, async () => {
        for (let dom of fadeOutTargets) {
          dom.style.animation = "fadeoutlite 0.6s ease forwards";
        }
        setQueue(() => {
          cleanChildren(document.querySelector('.' + ghostBaseClassName));
          instance.renderSecondContents(document.querySelector('.' + ghostBaseClassName)).then(() => {
            scrollTo(window, document.querySelector('.' + ghostBaseClassName), 30);
          }).catch((err) => {
            console.log(err);
          });
        }, 600);
      });

    } catch (e) {
      console.log(e);
    }
  }
}

ClientEvaluationJs.prototype.thirdReturn = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo, cleanChildren } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, fourthFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName, ghostBaseClassName } = this;
  return async function (e) {
    try {
      const fadeOutTargets = [ ...document.querySelectorAll('.' + fourthFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = heightTong.scroll;
      numbersAreaMarginTop = heightTong.numbers;

      scrollTo(window, 0, 0, false, async () => {
        for (let dom of fadeOutTargets) {
          dom.style.animation = "fadeoutlite 0.6s ease forwards";
        }
        setQueue(() => {
          cleanChildren(document.querySelector('.' + ghostBaseClassName));
          instance.renderThirdContents(document.querySelector('.' + ghostBaseClassName)).then(() => {
            scrollTo(window, document.querySelector('.' + ghostBaseClassName), 30);
          }).catch((err) => {
            console.log(err);
          });
        }, 600);
      });

    } catch (e) {
      console.log(e);
    }
  }
}

ClientEvaluationJs.prototype.resizeEvent = function () {
  const instance = this;
  const { homeliaisonAnalytics, colorExtended } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;

  this.resizeStack = 0;
  this.resizeFrom = 0;
  this.resizePopup = 0;

  if (desktop) {
    const resizeDebounceEvent = function () {
      let timeout;
      const reEvent = function () {
        homeliaisonAnalytics({
          page: instance.pageName,
          standard: instance.firstPageViewTime,
          action: "aspirantPageResize",
          data: {
            delta: (new Date()).valueOf() - instance.firstPageViewTime.valueOf(),
            date: new Date(),
          },
        }).then(() => {
          window.location.reload();
          instance.resizeStack = 0;
        }).catch((err) => {
          console.log(err);
        });
      }
      let immediate = null;
      return function (e) {
        if (instance.resizeStack === 0) {
          instance.resizeStack = 1;
          instance.resizeFrom = window.innerWidth;
        }
        let context = this;
        let args = arguments;
        function later() {
          timeout = null;
          if (!immediate) { reEvent.apply(context, args); };
        }
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, 250);
        if (callNow) {
          reEvent.apply(context, args);
        }
      }
    }
    window.addEventListener("resize", resizeDebounceEvent());
  }
}

ClientEvaluationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { media } = this;
    const { returnGet, ajaxJson, dateToString, homeliaisonAnalytics, colorExtended, stringToLink, objectDeepCopy } = GeneralJs;
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true");
    const normalMode = (entireMode && getObj.normal === "true");
    const mobile = media[4];
    const desktop = !mobile;
    let cliid, clients, client;
    let proid, projects, project;
    let contentsPhotoObj;
    let fhdVisual;

    if (getObj.proid !== undefined) {
      proid = getObj.proid;
      this.proid = proid;
    } else {
      window.alert("잘못된 접근입니다!");
      throw new Error("invaild get object : must be proid");
    }

    projects = await ajaxJson({ whereQuery: { proid } }, SECONDHOST + "/getProjects", { equal: true });
    if (projects.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    project = projects[0];

    cliid = project.cliid;
    clients = await ajaxJson({ whereQuery: { cliid } }, SECONDHOST + "/getClients", { equal: true });
    if (clients.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    client = clients[0];

    this.client = client;
    this.clientHistory = await ajaxJson({ id: client.cliid, rawMode: true }, BACKHOST + "/getClientHistory", { equal: true });
    this.requestNumber = 0;

    this.initAreaClassName = "initAreaClassName";
    this.firstFadeOutTargetClassName = "firstFadeOutTargetClassName";
    this.secondBaseClassName = "secondBaseClassName";
    this.firstBarTargetClassName = "firstBarTargetClassName";
    this.secondBarBoxMotherClassName = "secondBarBoxMotherClassName";
    this.ghostBaseClassName = "ghostBaseClassName";
    this.secondFadeOutTargetClassName = "secondFadeOutTargetClassName";
    this.thirdFadeOutTargetClassName = "thirdFadeOutTargetClassName";
    this.fourthFadeOutTargetClassName = "fourthFadeOutTargetClassName";
    this.fifthFadeOutTargetClassName = "fifthFadeOutTargetClassName";
    this.sixthFadeOutTargetClassName = "sixthFadeOutTargetClassName";
    this.blurFixedBelowBarClassName = "blurFixedBelowBarClassName";
    this.fileTongClassName = "fileTongClassName";
    this.fileInputClassName = "fileInputClassName";
    this.fileClickWordsClassName = "fileClickWordsClassName";
    this.greenTalkEventClassName = "greenTalkEventClassName";

    this.animationStop = false;

    this.questionNumber = 14;
    await this.generateTotalValues();

    this.lineWeight = <%% 1.5, 1.5, 1.5, 1, 1 %%>;
    this.heightTong = {};

    if (desktop && window.innerHeight > 1100) {
      this.heightTong.second = <%% 1398, 1203, 1035, 825, 238 %%>;
      this.heightTong.third = <%% 1067.84, 1037, 875, 675, 158 %%>;
      this.heightTong.fourth = <%% 1067.84, 995, 853, 708, 208 %%>;
      this.heightTong.fifth = <%% 1540, 1392, 1220, 1019, 298.5 %%>;
      this.heightTong.sixth = <%% 1808, 1638, 1442, 1199, 383.5 %%>;
      this.heightTong.seventh = <%% 2000, 1864, 1640, 1328, 358.5 %%>;
      this.heightTong.eighth = <%% 2593, 2346, 1960, 1540, 480 %%>;
      this.heightTong.scroll = <%% -638, -565, -457, -368, -71 %%>;
      this.heightTong.numbers = <%% 100, 100, 90, 75, 16 %%>;
    } else if (desktop) {
      this.heightTong.second = <%% 1398, 1203, 1035, 825, 238 %%>;
      this.heightTong.third = <%% 1067.84, 1037, 875, 675, 158 %%>;
      this.heightTong.fourth = <%% 1067.84, 995, 853, 708, 208 %%>;
      this.heightTong.fifth = <%% 1540, 1392, 1220, 1019, 298.5 %%>;
      this.heightTong.sixth = <%% 1808, 1638, 1442, 1199, 383.5 %%>;
      this.heightTong.seventh = <%% 2000, 1864, 1640, 1328, 358.5 %%>;
      this.heightTong.eighth = <%% 2473, 2337, 1956, 1540, 480 %%>;
      this.heightTong.scroll = <%% -492, -486, -451, -365, -71 %%>;
      this.heightTong.numbers = <%% 100, 100, 90, 75, 16 %%>;

      fhdVisual = <%% 30, 30, 20, 0, 0 %%>;

      this.heightTong.second = this.heightTong.second - fhdVisual;
      this.heightTong.third = this.heightTong.third - fhdVisual;
      this.heightTong.fourth = this.heightTong.fourth - fhdVisual;
      this.heightTong.fifth = this.heightTong.fifth - fhdVisual;
      this.heightTong.sixth = this.heightTong.sixth - fhdVisual;
      this.heightTong.seventh = this.heightTong.seventh - fhdVisual;
      this.heightTong.numbers = this.heightTong.numbers - fhdVisual;
    } else if (mobile) {
      this.heightTong.second = <%% 1398, 1203, 1035, 825, 238 %%>;
      this.heightTong.third = <%% 1067.84, 1037, 875, 675, 158 %%>;
      this.heightTong.fourth = <%% 1067.84, 995, 853, 708, 208 %%>;
      this.heightTong.fifth = <%% 1540, 1392, 1220, 1019, 298.5 %%>;
      this.heightTong.sixth = <%% 1808, 1638, 1442, 1199, 383.5 %%>;
      this.heightTong.seventh = <%% 2000, 1864, 1640, 1328, 358.5 %%>;
      this.heightTong.eighth = <%% 2593, 2346, 1960, 1540, 480 %%>;
      this.heightTong.scroll = <%% -638, -565, -457, -368, -71 %%>;
      this.heightTong.numbers = <%% 100, 100, 90, 75, 16 %%>;
    }

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "clientEvaluation",
      client: instance.client,
      base: {
        instance: this,
        binaryPath: ClientEvaluationJs.binaryPath,
        subTitle: (instance.client.name + " 고객님 서비스 평가"),
        secondBackground: false,
        backgroundType: 9,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          await instance.setBaseTong();
          await instance.renderStartBox();
          instance.resizeEvent();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ClientEvaluationJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);
    document.querySelector("style").insertAdjacentHTML("beforeend", "*{transition:all 0.3s ease}");

    GeneralJs.setQueue(() => {
      window.scrollTo(0, 0);
    }, 400);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ClientEvaluationJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
