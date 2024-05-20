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
      "return ('홈리에종 | 디자이너와 함께 하는 홈스타일링');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 | 디자이너와 함께 하는 홈스타일링');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "frontIndex",
  "hangul": "메인 홈",
  "route": [
    "frontIndex",
    "DD"
  ]
} %/%/g

const FrontIndexJs = function () {
  this.mother = new GeneralJs();
}

FrontIndexJs.binaryPath = FRONTHOST + "/middle/index";

FrontIndexJs.prototype.generateTotalValues = async function () {
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
    if (typeof clientHistory.curation.check === "object" && clientHistory.curation.check !== null) {

      // 0
      if (typeof clientHistory.curation.check.serid === "string") {
        if (/_/gi.test(clientHistory.curation.check.serid) && !Number.isNaN(Number(clientHistory.curation.check.serid.split("_")[1].replace(/[^0-9]/gi, '')))) {
          totalValues[0] = Number(clientHistory.curation.check.serid.split("_")[1].replace(/[^0-9]/gi, '')) - 1;
        }
      }

      // 1
      if (typeof clientHistory.curation.check.construct.entire === "boolean") {
        totalValues[1] = clientHistory.curation.check.construct.entire ? 1 : 0;
      }

      // 2
      if (Array.isArray(clientHistory.curation.check.construct.items) && clientHistory.curation.check.construct.items.length > 0) {
        totalValues[2] = objectDeepCopy(clientHistory.curation.check.construct.items);
      }

      // 3
      if (typeof clientHistory.curation.check.construct.environment === "number") {
        totalValues[3] = clientHistory.curation.check.construct.environment;
      }

      // 4
      if (typeof clientHistory.curation.check.budget === "number") {
        totalValues[4] = clientHistory.curation.check.budget;
      }

      // 5
      if (Array.isArray(clientHistory.curation.check.furniture) && clientHistory.curation.check.furniture.length > 0) {
        totalValues[5] = objectDeepCopy(clientHistory.curation.check.furniture);
      }

      // 6
      if (Array.isArray(clientHistory.curation.check.fabric) && clientHistory.curation.check.fabric.length > 0) {
        totalValues[6] = objectDeepCopy(clientHistory.curation.check.fabric);
      }

      // 7
      if (typeof clientHistory.curation.check.expect === "number") {
        totalValues[7] = clientHistory.curation.check.expect;
      }

      // 8
      if (typeof clientHistory.curation.check.purchase === "number") {
        totalValues[8] = clientHistory.curation.check.purchase;
      }

      // 9
      if (typeof clientHistory.curation.check.family === "number") {
        totalValues[9] = clientHistory.curation.check.family;
      }

      // 10
      if (typeof clientHistory.curation.check.age === "number") {
        totalValues[10] = clientHistory.curation.check.age;
      }

      // 11
      if (Array.isArray(clientHistory.curation.check.time) && clientHistory.curation.check.time.length > 0) {
        totalValues[11] = objectDeepCopy(clientHistory.curation.check.time);
      }

      // 12
      if (Array.isArray(clientHistory.curation.image) && clientHistory.curation.image.length > 0) {
        totalValues[12] = objectDeepCopy(clientHistory.curation.image);
      } else {
        totalValues[12] = [];
      }

      // 13
      totalValues[13] = [];

    }

    totalMenu = (await ajaxJson({ data: null }, BACKHOST + "/styleCuration_getTotalMenu", { equal: true })).totalMenu.map((o) => { return o.values });

    instance.totalValues = objectDeepCopy(totalValues);
    instance.totalMenu = objectDeepCopy(totalMenu)

    return { totalValues, totalMenu };
  } catch (e) {
    console.log(e);
  }
}

FrontIndexJs.prototype.updateImmediately = async function (valueIndex, menuIndex, menu) {
  const instance = this;
  const { withOut, returnGet, createNode, ajaxJson, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight, baseTop, heightTong, requestNumber } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  try {
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

  } catch (e) {
    console.log(e);
  }
}

FrontIndexJs.prototype.insertInitBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight, baseTop, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { initAreaClassName } = this;
  try {
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
    let mobileLeftPaddingVisual;
    let titleSize, titleWeight, titleVisualTop, titleVisualLeft;
    let titleLineHeight;
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
    let description;
    let blanketHeight, blanketVisualTop, blanketOpacity, blanketMargin;
    let mainTitleBlock, subTitleBlock, imageBlock, boxBlock0, boxBlock1;
    let totalHeight;
    let boxBlock0MarginTop, boxBlock1MarginTop;
    let imageBlockMarginTop, subTitleBlockMarginTop;
    let boxBlockHeight;
    let mainImageWidth;

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    firstBasePaddingTop = <%% 24, 24, 24, 24, (window.innerHeight < 700 ? 1.5 : 7) %%>;
    firstBasePaddingBottom = <%% 160, 160, 160, 120, 20 %%>;

    subTitleSize = <%% 20, 18, 17, 15, 3.6 %%>;
    subTitleWeight = 500;
    subTitleMarginTop = <%% 3, 2, 1, 1, 0.5 %%>;

    buttonMarginTop = <%% 165, 160, 132, 110, 3.6 %%>;
    buttonWidth = <%% 190, 190, 186, 168, 31 %%>;
    buttonHeight = <%% 32, 32, 30, 28, 9 %%>;
    buttonSize = <%% 14, 14, 13, 12, 3.5 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
    buttonBetween = <%% 8, 8, 7, 6, 1 %%>;

    titleSize = <%% 50, 48, 43, 36, 7.2 %%>;
    titleWeight = 700;
    titleVisualTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.5 %%>;
    titleVisualLeft = <%% 2, 2, 2, 2, -0.5 %%>;
    titleLineHeight = <%% 1.11, 1.11, 1.11, 1.11, 1.07 %%>;

    pointOpacity = 0.4;

    mainImageTop = <%% 27, 24, 18, 16, 33 %%>;
    mainImageHeight = <%% 390, 370, 338, 314, 39 %%>;

    descriptionSize = <%% 15, 14, 14, 13, 3.2 %%>;
    descriptionLineHeight = <%% 1.9, 1.9, 1.9, 1.8, 1.8 %%>;

    mobileLeftPaddingVisual = 1;

    descriptionMarginTop = <%% 40, 40, 36, 30, 6.4 %%>;

    descriptionPointBoldPaddingLeft = <%% 8, 8, 8, 8, 1.6 %%>;
    descriptionPointBoldPaddingTop = <%% (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 3), (isMac() ? 2 : 3), 0.4 %%>;
    descriptionPointBoldPaddingBottom = <%% (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 0.8 %%>;
    descriptionPointBoldMargin = <%% 2, 2, 2, 2, 1 %%>;

    blanketHeight = <%% 48, 40, 40, 40, 4 %%>;
    blanketVisualTop = <%% (isMac() ? 1 : 0), (isMac() ? 1 : 0), (isMac() ? 1 : 0), (isMac() ? 1 : 0), 1 %%>;
    blanketOpacity = <%% 0.3, 0.3, 0.3, 0.3, 0.3 %%>;
    blanketMargin = <%% 34, 32, 30, 30, 2 %%>;

    if (desktop && window.innerHeight > 1100) {
      titleSize = <%% 57, 51, 43, 36, 7 %%>;
      subTitleSize = <%% 19, 18, 17, 15, 3.6 %%>;
      firstBasePaddingTop = <%% 80, 48, 30, 28, 50 %%>;
      firstBasePaddingBottom = <%% 240, 210, 160, 120, 210 %%>;
      mainImageTop = <%% 42, 32, 18, 16, 32 %%>;
      mainImageHeight = <%% 390, 372, 338, 314, 39 %%>;
      buttonMarginTop = <%% 146, 146, 132, 110, 3.6 %%>;
    }

    mainImageWidth = 60;
    subTitleBlockMarginTop = 2.5;
    imageBlockMarginTop = 6.5;
    boxBlock0MarginTop = 13;
    boxBlock1MarginTop = 2;
    boxBlockHeight = 20;

    this.totalContents = document.getElementById("totalcontents");
    this.totalContents.style.overflow = "hidden";
    this.totalContents.style.background = colorExtended.white;
    document.body.style.background = colorExtended.white;

    description = [
      desktop ? "홈리에종의 서비스 진행을 위해서는 다음 큐레이션 과정이 필요합니다." : "홈리에종 서비스 진행을 위해선 큐레이션 과정이 필요합니다.",
      desktop ? "서비스 신청서를 모두 작성 후, <b%디자이너의 1:1 맞춤 상담%b>을 받아보세요!" : "신청서를 모두 작성 후, <b%디자이너 1:1 상담%b>을 받아보세요!"
    ];

    firstBase = createNode({
      mother: baseTong,
      class: [ initAreaClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(firstBasePaddingTop) + ea,
        flexDirection: "column",
        paddingBottom: String(firstBasePaddingBottom) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: desktop ? String((-1 * baseTop) + naviHeight) + ea : "calc(calc(" + String(naviHeight - naviHeight) + "px" + ") - " + String(baseTop) + ea + ")",
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.white,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: desktop ? withOut(1 * ((-1 * baseTop) + naviHeight), ea) : String(185) + ea,
        }
      }
    });
  
    // main title
    mainTitleBlock = createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: desktop ? "start" : "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        paddingLeft: mobile ? String(mobileLeftPaddingVisual) + ea : "",
      },
      children: [
        {
          text: "인테리어,",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.black,
            fontFamily: "pretendard",
            top: desktop ? String(titleVisualTop) + ea : "",
            left: desktop ? String(titleVisualLeft) + ea : "",
            lineHeight: String(titleLineHeight),
          },
          child: {
            style: {
              position: "absolute",
              width: withOut(-1.5, ea),
              height: String(3.5) + ea,
              borderRadius: String(3) + "px",
              background: colorExtended.gradientBlue2,
              top: String(5.2) + ea,
              left: String(-1.2) + ea,
              zIndex: String(-1),
              opacity: String(0.8),
            }
          }
        }
      ]
    });

    // sub title
    subTitleBlock = createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(subTitleBlockMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
      },
      children: [
        {
          text: "무엇부터 시작해야할지 막막하시죠?",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(500),
            fontSize: String(4.4) + ea,
            textAlign: "center",
            fontFamily: "pretendard",
          }
        }
      ]
    });

    // image
    imageBlock = createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(imageBlockMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
      },
      children: [
        {
          mode: "img",
          attribute: {
            src: FrontIndexJs.binaryPath + "/frontIndexSource0.png",
          },
          style: {
            display: "inline-block",
            position: "relative",
            width: String(58) + ea,
          }
        }
      ]
    });

    // box 1
    boxBlock0 = createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(boxBlock0MarginTop) + ea,
        opacity: String(0),
        width: withOut(0, ea),
        height: String(boxBlockHeight) + ea,
        background: colorExtended.white,
        borderRadius: String(15) + "px",
        border: "2px solid " + colorExtended.black,
        boxSizing: "border-box",
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        zIndex: String(1),
      },
      children: [
        {
          style: {
            position: "absolute",
            right: String(2.5) + ea,
            top: String(2.5) + ea,
            width: String(1.2) + ea,
            height: String(1.2) + ea,
            borderRadius: String(1) + "px",
            background: colorExtended.blueLight,
          }
        },
        {
          style: {
            position: "absolute",
            right: String(2.5) + ea,
            bottom: String(2.5) + ea,
            width: String(1.2) + ea,
            height: String(1.2) + ea,
            borderRadius: String(1) + "px",
            background: colorExtended.blueLight,
          }
        },
        {
          text: "<b%STEP<u%.%u> 1%b><s%나만의 디자이너%s>를 추천받고",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(4) + ea,
            fontWeight: String(500),
            color: colorExtended.black,
            fontFamily: "pretendard",
            top: String(-0.1) + ea,
            marginRight: String(4.6) + ea,
          },
          bold: {
            fontSize: String(4.5) + ea,
            fontWeight: String(700),
            color: colorExtended.black,
            fontFamily: "mont",
            position: "relative",
            top: String(0.1) + ea,
            marginRight: String(4.2) + ea,
          },
          under: {
            fontSize: String(4.5) + ea,
            fontWeight: String(700),
            color: colorExtended.deactive,
            fontFamily: "mont",
            position: "relative",
          },
          special: {
            fontSize: String(4) + ea,
            fontWeight: String(800),
            color: colorExtended.black,
            fontFamily: "pretendard",
          },
        }
      ]
    });

    // box 2
    boxBlock1 = createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(boxBlock1MarginTop) + ea,
        opacity: String(0),
        width: withOut(0, ea),
        height: String(boxBlockHeight) + ea,
        background: colorExtended.white,
        borderRadius: String(15) + "px",
        border: "2px solid " + colorExtended.black,
        boxSizing: "border-box",
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        zIndex: String(1),
      },
      children: [
        {
          style: {
            position: "absolute",
            right: String(2.5) + ea,
            top: String(2.5) + ea,
            width: String(1.2) + ea,
            height: String(1.2) + ea,
            borderRadius: String(1) + "px",
            background: colorExtended.blueLight,
          }
        },
        {
          style: {
            position: "absolute",
            right: String(2.5) + ea,
            bottom: String(2.5) + ea,
            width: String(1.2) + ea,
            height: String(1.2) + ea,
            borderRadius: String(1) + "px",
            background: colorExtended.blueLight,
          }
        },
        {
          text: "<b%STEP<u%.%u> 2%b><s%맞춤형 인테리어%s>를 실현해봐요.",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(4) + ea,
            fontWeight: String(500),
            color: colorExtended.black,
            fontFamily: "pretendard",
            top: String(-0.1) + ea,
          },
          bold: {
            fontSize: String(4.5) + ea,
            fontWeight: String(700),
            color: colorExtended.black,
            fontFamily: "mont",
            position: "relative",
            top: String(0.1) + ea,
            marginRight: String(4.2) + ea,
          },
          under: {
            fontSize: String(4.5) + ea,
            fontWeight: String(700),
            color: colorExtended.deactive,
            fontFamily: "mont",
            position: "relative",
          },
          special: {
            fontSize: String(4) + ea,
            fontWeight: String(800),
            color: colorExtended.black,
            fontFamily: "pretendard",
          },
        }
      ]
    });

    if (window.innerHeight < 700) {
      totalHeight = 0;
      totalHeight += mainTitleBlock.getBoundingClientRect().height;
      totalHeight += subTitleBlock.getBoundingClientRect().height;
      totalHeight += imageBlock.getBoundingClientRect().height;
      totalHeight += window.innerWidth * ((subTitleBlockMarginTop + imageBlockMarginTop + boxBlock0MarginTop + boxBlock1MarginTop + boxBlockHeight + boxBlockHeight + instance.baseTop + instance.baseTop) / 100);
      totalHeight += instance.naviHeight;
      firstBase.style.paddingTop = String((window.innerHeight - totalHeight) / 2) + "px";
    }

  } catch (e) {
    console.log(e);
  }
}

FrontIndexJs.prototype.insertSecondBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { firstFadeOutTargetClassName, secondBaseClassName } = this;
  const colorConvertPoint0ClassName = "colorConvertPoint0ClassName";
  const colorConvertPoint1ClassName = "colorConvertPoint1ClassName";
  const colorConvertPoint2ClassName = "colorConvertPoint2ClassName";
  const selectionBaseClassName = "selectionBaseClassName";
  const finalSelectionCompleteFirstButtonClassName = "finalSelectionCompleteFirstButtonClassName";
  const mobileCheckPointClassName = "mobileCheckPointClassName";
  try {
    let minusLeft;
    let secondBase;
    let serviceBase;
    let textContent;
    let descriptionSize;
    let createServiceBlock;
    let titleSize;
    let descriptionMarginTop;
    let boxWidth;
    let betweenMargin;
    let serviceMother;
    let target;
    let checkCircleWidth;
    let buttonHeight;
    let wordsMother, buttonMother;
    let wordsMotherMarginTop;
    let numberSize, numberWeight;
    let numberBarHeight, numberBarMarginLeft;
    let numberBarTop;
    let titleMarginTop, titleWeight;
    let descriptionWeight, descriptionVisualLeft;
    let serviceAreMarginTop, serviceAreMarginBottom;
    let serviceNameBoxWidth;
    let serviceNameBoxHeight;
    let serviceNameSize;
    let serviceNameWeight;
    let serviceNameTop;
    let circleWidth0, circleWidth1, circleWidth2;
    let circleBetween;
    let circleGroupMarginTop;
    let circleGroupMarginBottom;
    let imageRatio;
    let triangleZoneHeight;
    let triangleWidth;
    let serviceDescriptionHeight;
    let serviceDescriptionSize, serviceDescriptionWeight;
    let serviceDescriptionLineHeight;
    let serviceDescriptionTextTop;
    let plusSize, plusWeight, plusPaddingLeft, plusPaddingTop, plusPaddingBottom;
    let plusBoxHeight, plusBoxMarginRight;
    let checkCircleAreaHeight;
    let buttonMotherMarginBottom;
    let buttonWidth, buttonSize, buttonWeight, buttonTextTop;
    let selectionDomMaker;
    let numbersAreaMarginTop;
    let originalSecondBaseHeight;
    let transitionString;
    let selectionForceEvent;
    let focusAnimation;
    let mobileLeftBox, mobileRightBox;
    let mobileBoxInnerPadding;
    let mobileLeftBoxWidth;
    let mobileTitleSize, mobileEngSize;
    let mobileEngTextTop, mobileBoxLineMargin;
    let mobileWhiteBoxHeight;
    let mobileWhiteBoxBetween;
    let mobileBlueLineHeight;
    let plusVisualTop;

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 21, 15, 10, 2 %%>;
    titleSize = <%% 25, 24, 22, 19, 4.7 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.2 %%>;
    descriptionMarginTop = <%% (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 4 : 2), (isMac() ? 3 : 1), 0.6 %%>;
    descriptionWeight = <%% 500, 500, 500, 500, 500 %%>;
    descriptionVisualLeft = <%% -1, -1, -1, -1, -0.1 %%>;

    betweenMargin = <%% 26, 16, 12, 8, 26 %%>;

    wordsMotherMarginTop = <%% 120, 120, 110, 90, 16 %%>;
    numbersAreaMarginTop = heightTong.numbers;

    numberSize = <%% 28, 26, 24, 21, 5 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 24, 22, 19, 4.5 %%>;
    numberBarMarginLeft = <%% 12, 12, 10, 9, 2.1 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -0.4 %%>;

    serviceAreMarginTop = <%% 100, 80, 60, 40, 9.5 %%>;
    serviceAreMarginBottom = <%% 100, 80, 60, 40, 7.5 %%>;

    serviceNameBoxWidth = <%% 156, 140, 130, 120, 15 %%>;
    serviceNameBoxHeight = <%% 40, 36, 32, 30, 4 %%>;
    serviceNameSize = <%% 17, 16, 14, 13, 3 %%>;
    serviceNameWeight = <%% 800, 800, 800, 800, 800 %%>;
    serviceNameTop = <%% (isMac() ? -0.5 : 1), (isMac() ? -0.5 : 1), (isMac() ? -0.5 : 1), (isMac() ? -0.5 : 1), -0.5 %%>;

    circleWidth0 = <%% 8, 8, 8, 6, 8 %%>;
    circleWidth1 = <%% 6, 6, 6, 4, 6 %%>;
    circleWidth2 = <%% 4, 4, 4, 2, 4 %%>;
    circleBetween = <%% 6, 6, 6, 5, 6 %%>;

    circleGroupMarginTop = <%% 11, 11, 11, 9, 11 %%>;
    circleGroupMarginBottom = <%% 13, 13, 13, 11, 13 %%>;

    imageRatio = <%% 75, 80, 82, 85, 99 %%>;

    triangleZoneHeight = <%% 50, 45, 40, 32, 50 %%>;
    triangleWidth = <%% 12, 11, 10, 9, 12 %%>;

    serviceDescriptionHeight = <%% 98, 86, 76, 64, 98 %%>;
    serviceDescriptionSize = <%% 16, 15, 13, 12, 2.7 %%>;
    serviceDescriptionWeight = <%% 700, 700, 700, 700, 400 %%>;
    serviceDescriptionLineHeight = <%% 1.52, 1.52, 1.52, 1.52, 1.4 %%>;
    serviceDescriptionTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;

    plusSize = <%% 15, 15, 13, 12, 2.6 %%>;
    plusWeight = <%% 700, 700, 700, 700, 700 %%>;
    plusPaddingLeft = <%% 3, 3, 3, 3, 0.4 %%>;
    plusPaddingTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0.1 %%>;
    plusPaddingBottom = <%% (isMac() ? 2 : 0), (isMac() ? 2 : 0), (isMac() ? 2 : 0), (isMac() ? 2 : 0), 0.1 %%>;
    plusBoxHeight = <%% 11, 11, 11, 11, 2 %%>;
    plusBoxMarginRight = <%% 4.5, 4.5, 4.5, 4.5, 0.5 %%>;
    plusVisualTop = <%% (isMac() ? 0 : -1), (isMac() ? 0 : -1), (isMac() ? 0 : -1), (isMac() ? 0 : -1), 0 %%>;

    checkCircleAreaHeight = <%% 80, 64, 52, 45, 80 %%>;
    checkCircleWidth = <%% 23, 21, 19, 17, 3.6 %%>;

    buttonMotherMarginBottom = <%% 140, 140, 120, 90, 22 %%>;
    buttonHeight = <%% 42, 42, 38, 32, 9 %%>;
    buttonWidth = <%% 120, 120, 110, 90, 24 %%>;
    buttonSize = <%% 17, 17, 16, 14, 3.6 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

    originalSecondBaseHeight = heightTong.second;

    mobileWhiteBoxHeight = 48.8;
    mobileWhiteBoxBetween = 2;
    mobileBoxInnerPadding = 4.5;
    mobileLeftBoxWidth = 42;
    mobileTitleSize = 4;
    mobileEngSize = 2.8;
    mobileEngTextTop = -0.3;
    mobileBoxLineMargin = 2.4;
    mobileBlueLineHeight = 2;

    instance.totalValues[0] = 0;

    instance.animationStop = true;
    focusAnimation = "focusProgress 4s ease infinite";

    selectionForceEvent = (isOn = true) => {
      const target = document.querySelector('.' + finalSelectionCompleteFirstButtonClassName);
      if (isOn) {
        target.style.animation = focusAnimation;
        target.style.background = colorExtended.ultimateBlack;
      } else {
        target.style.animation = "";
        target.style.background = colorExtended.darkBlack;
      }
    }

    transitionString = "all 0.4s ease";

    secondBase = createNode({
      mother: baseTong,
      class: [ secondBaseClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        height: String(originalSecondBaseHeight) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: String(-31) + ea,
          left: String(-1 * 6) + ea,
          background: colorExtended.black,
          width: withOut(-1 * (6 * 2), ea),
          height: withOut(0, ea),
        },
      }
    });

    selectionDomMaker = (secondBase, returnMode = false) => {

      textContent = objectDeepCopy(instance.totalMenu[0]);
      boxWidth = (standardWidth - (betweenMargin * (textContent.length - 1))) / textContent.length;
      for (let i = 0; i < textContent.length; i++) {
        if (instance.totalValues[0] === null) {
          if (i === 1) {
            textContent[i].default = true;
          } else {
            textContent[i].default = false;
          }
        } else {
          if (i === instance.totalValues[0]) {
            textContent[i].default = true;
          } else {
            textContent[i].default = false;
          }
        }
      }
      instance.totalMenu[0] = objectDeepCopy(textContent);

      if (returnMode) {
        secondBase.style.height = String(originalSecondBaseHeight) + ea;
      }
      serviceMother = createNode({
        mother: secondBase,
        class: [ firstFadeOutTargetClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: desktop ? "row" : "column",
          paddingTop: String(serviceAreMarginTop) + ea,
          paddingBottom: String(serviceAreMarginBottom) + ea,
          opacity: String(0),
          transform: "translateY(30px)",
          animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        }
      });
      createServiceBlock = (index, thisMother = serviceMother) => {
        if (typeof index === "number") {
          target = textContent[index];
        } else {
          target = objectDeepCopy(index);
        }
        serviceBase = createNode({
          mother: thisMother,
          attribute: {
            index: String(index),
            toggle: (target.default ? "on" : "off"),
            draggable: "false",
          },
          class: [ selectionBaseClassName ],
          event: {
            click: async function (e) {
              try {
                const itemList = [ ...document.querySelectorAll('.' + selectionBaseClassName) ];
                const index = Number(this.getAttribute("index"));
                const valueIndex = 0;
                const toggle = this.getAttribute("toggle");
                let target0, target1, target2;
                if (desktop) {
                  if (toggle === "on") {
                    for (let dom of itemList) {
                      target0 = dom.querySelector('.' + colorConvertPoint0ClassName);
                      target1 = dom.querySelector('.' + colorConvertPoint1ClassName);
                      target2 = dom.querySelector('.' + colorConvertPoint2ClassName);
                      if (Number(dom.getAttribute("index")) === index) {
                        dom.style.opacity = String(0.5);
                        dom.setAttribute("toggle", "off");
                        target1.style.background = colorExtended.blueDark;
                        target1.firstChild.style.color = colorExtended.darkBlack;
                        target2.style.opacity = String(1);
                      } else {
                        dom.style.opacity = String(0.5);
                        dom.setAttribute("toggle", "off");
                        target1.style.background = colorExtended.blueDark;
                        target1.firstChild.style.color = colorExtended.darkBlack;
                        target2.style.opacity = String(1);
                      }
                    }
                    instance.totalValues[valueIndex] = null;
                    selectionForceEvent(false);
                  } else {
                    for (let dom of itemList) {
                      target0 = dom.querySelector('.' + colorConvertPoint0ClassName);
                      target1 = dom.querySelector('.' + colorConvertPoint1ClassName);
                      target2 = dom.querySelector('.' + colorConvertPoint2ClassName);
                      if (Number(dom.getAttribute("index")) === index) {
                        dom.style.opacity = String(1);
                        dom.setAttribute("toggle", "on");
                        target1.style.background = colorExtended.blueDim;
                        target1.firstChild.style.color = colorExtended.white;
                        target2.style.opacity = String(0);
                      } else {
                        dom.style.opacity = String(0.5);
                        dom.setAttribute("toggle", "off");
                        target1.style.background = colorExtended.blueDark;
                        target1.firstChild.style.color = colorExtended.darkBlack;
                        target2.style.opacity = String(1);
                      }
                    }
                    instance.totalValues[valueIndex] = index;
                    await instance.updateImmediately(valueIndex, index, textContent.map((o) => { return o.value }));
                    selectionForceEvent(true);
                  }
                } else {
                  if (toggle === "on") {
                    for (let dom of itemList) {
                      target0 = dom.querySelector('.' + mobileCheckPointClassName);
                      if (Number(dom.getAttribute("index")) === index) {
                        dom.style.opacity = String(0.6);
                        dom.setAttribute("toggle", "off");
                        target0.style.opacity = String(0);
                      } else {
                        dom.style.opacity = String(0.6);
                        dom.setAttribute("toggle", "off");
                        target0.style.opacity = String(0);
                      }
                    }
                    instance.totalValues[valueIndex] = null;
                  } else {
                    for (let dom of itemList) {
                      target0 = dom.querySelector('.' + mobileCheckPointClassName);
                      if (Number(dom.getAttribute("index")) === index) {
                        dom.style.opacity = String(1);
                        dom.setAttribute("toggle", "on");
                        target0.style.opacity = String(1);
                      } else {
                        dom.style.opacity = String(0.6);
                        dom.setAttribute("toggle", "off");
                        target0.style.opacity = String(0);
                      }
                    }
                    instance.totalValues[valueIndex] = index;
                    await instance.updateImmediately(valueIndex, index, textContent.map((o) => { return o.value }));
                  }
                }
              } catch (e) {
                console.log(e);
              }
            },
            mouseenter: function (e) {
              if (desktop) {
                if (!instance.animationStop) {
                  const toggle = this.getAttribute("toggle");
                  const target0 = this.querySelector('.' + colorConvertPoint0ClassName);
                  const target1 = this.querySelector('.' + colorConvertPoint1ClassName);
                  this.style.opacity = String(1);
                  target0.firstChild.style.color = colorExtended.focusBlue;
                  target1.style.background = colorExtended.blueDim;
                  target1.firstChild.style.color = colorExtended.white;
                }
              }
            },
            mouseleave: function (e) {
              if (desktop) {
                if (!instance.animationStop) {
                  const toggle = this.getAttribute("toggle");
                  const target0 = this.querySelector('.' + colorConvertPoint0ClassName);
                  const target1 = this.querySelector('.' + colorConvertPoint1ClassName);
                  if (toggle === "on") {
                    this.style.opacity = String(1);
                  } else {
                    this.style.opacity = String(0.5);
                    target1.style.background = colorExtended.blueDark;
                    target1.firstChild.style.color = colorExtended.darkBlack;
                  }
                  target0.firstChild.style.color = colorExtended.black;
                }
              }
            }
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: desktop ? String(boxWidth) + ea : withOut(0, ea),
            flexDirection: desktop ? "column" : "row",
            alignItems: "center",
            justifyContent: "start",
            opacity: desktop ? String(target.default ? 1 : 0.5) : String(target.default ? 1 : 0.6),
            marginLeft: (desktop && target.margin) ? String(betweenMargin) + ea : "",
            marginRight: (desktop && target.margin) ? String(betweenMargin) + ea : "",
            transition: transitionString,
            cursor: "pointer",
            height: desktop ? "" : String(mobileWhiteBoxHeight) + ea,
            borderRadius: desktop ? "" : String(10) + "px",
            background: desktop ? "" : colorExtended.white,
            boxShadow: desktop ? "" : "0px 5px 15px -9px " + colorExtended.darkDarkShadow,
            marginBottom: desktop ? "" : String(mobileWhiteBoxBetween) + ea,
          }
        });

        if (desktop) {

          createNode({
            mother: serviceBase,
            class: [ colorConvertPoint0ClassName ],
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(serviceNameBoxWidth) + ea,
              height: String(serviceNameBoxHeight) + ea,
              borderRadius: String(serviceNameBoxHeight) + ea,
              background: colorExtended.white,
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 2px 12px -9px " + colorExtended.darkShadow,
              transition: transitionString,
            },
            child: {
              text: target.title,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(serviceNameSize) + ea,
                fontWeight: String(serviceNameWeight),
                color: colorExtended.black,
                top: String(serviceNameTop) + ea,
                transition: transitionString,
              }
            }
          });
          createNode({
            mother: serviceBase,
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(circleWidth0) + ea,
              height: String(circleWidth0) + ea,
              borderRadius: String(circleWidth0) + ea,
              background: colorExtended.white,
              marginTop: String(circleGroupMarginTop) + ea,
            }
          });
          createNode({
            mother: serviceBase,
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(circleWidth1) + ea,
              height: String(circleWidth1) + ea,
              borderRadius: String(circleWidth1) + ea,
              background: colorExtended.white,
              marginTop: String(circleBetween) + ea,
              opacity: String(0.7),
            }
          });
          createNode({
            mother: serviceBase,
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(circleWidth2) + ea,
              height: String(circleWidth2) + ea,
              borderRadius: String(circleWidth2) + ea,
              background: colorExtended.white,
              marginTop: String(circleBetween) + ea,
              opacity: String(0.4),
            }
          });
          createNode({
            mother: serviceBase,
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(boxWidth) + ea,
              height: String(boxWidth) + ea,
              borderRadius: String(8) + "px",
              background: colorExtended.gradientWhite2,
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 3px 15px -9px " + colorExtended.darkShadow,
              marginTop: String(circleGroupMarginBottom) + ea,
            },
            child: {
              mode: "img",
              attribute: {
                src: FrontIndexJs.binaryPath + target.source,
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(imageRatio) + '%',
              }
            }
          });
          createNode({
            mother: serviceBase,
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              height: String(triangleZoneHeight) + ea,
              alignItems: "center",
              justifyContent: "center",
            },
            child: {
              mode: "svg",
              source: svgMaker.generalTriangle(colorExtended.blueDark),
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(triangleWidth) + ea,
              }
            }
          });
          createNode({
            mother: serviceBase,
            class: [ colorConvertPoint1ClassName ],
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(boxWidth) + ea,
              height: String(serviceDescriptionHeight) + ea,
              borderRadius: String(8) + "px",
              background: (target.default ? colorExtended.blueDim : colorExtended.blueDark),
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 2px 12px -9px " + colorExtended.blueDim,
              transition: transitionString,
            },
            child: {
              text: target.description.join(target.plus ? "\n<b%+%b>" : "\n"),
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(serviceDescriptionSize) + ea,
                fontWeight: String(serviceDescriptionWeight),
                color: (target.default ? colorExtended.white : colorExtended.darkBlack),
                textAlign: "center",
                lineHeight: String(serviceDescriptionLineHeight),
                top: String(serviceDescriptionTextTop) + ea,
                transition: transitionString,
              },
              bold: {
                display: "inline-flex",
                position: "relative",
                "justify-content": "center",
                "align-items": "center",
                color: colorExtended.mainBlue,
                fontWeight: String(plusWeight),
                fontSize: String(plusSize) + ea,
                background: colorExtended.white,
                padding: String(plusPaddingLeft) + ea,
                paddingTop: String(plusPaddingTop) + ea,
                paddingBottom: String(plusPaddingBottom) + ea,
                height: String(plusBoxHeight) + ea,
                "border-radius": String(8) + ea,
                marginRight: String(plusBoxMarginRight) + ea,
                top: String(plusVisualTop) + ea,
              }
            }
          });
          createNode({
            mother: serviceBase,
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              height: String(checkCircleAreaHeight) + ea,
              alignItems: "center",
              justifyContent: "center",
            },
            child: {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(checkCircleWidth) + ea,
                height: String(checkCircleWidth) + ea,
                borderRadius: String(checkCircleWidth) + ea,
              },
              child: {
                mode: "svg",
                source: svgMaker.checkCircle(colorExtended.white),
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(checkCircleWidth) + ea,
                },
                previous: {
                  class: [ colorConvertPoint2ClassName ],
                  style: {
                    position: "absolute",
                    top: String(0),
                    left: String(0),
                    width: String(checkCircleWidth) + ea,
                    height: String(checkCircleWidth) + ea,
                    borderRadius: String(checkCircleWidth) + ea,
                    background: colorExtended.white,
                    opacity: String(target.default ? 0 : 1),
                  },
                }
              }
            }
          });

        } else {

          mobileLeftBox = createNode({
            mother: serviceBase,
            style: {
              display: "inline-flex",
              flexDirection: "column",
              position: "relative",
              width: String(mobileLeftBoxWidth - (mobileBoxInnerPadding * 2)) + ea,
              height: withOut(mobileBoxInnerPadding * 2, ea),
              justifyContent: "end",
              alignItems: "start",
              padding: String(mobileBoxInnerPadding) + ea,
            },
            children: [
              {
                text: target.title,
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(mobileTitleSize) + ea,
                  fontWeight: String(700),
                  color: colorExtended.black,
                }
              },
              {
                text: target.english,
                style: {
                  display: "flex",
                  position: "relative",
                  fontFamily: "graphik",
                  fontSize: String(mobileEngSize) + ea,
                  fontWeight: String(200),
                  color: colorExtended.black,
                  top: String(mobileEngTextTop) + ea,
                }
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  height: String(mobileBlueLineHeight) + ea,
                  borderBottom: "1px solid " + colorExtended.mainBlue,
                  marginBottom: String(mobileBoxLineMargin) + ea,
                }
              },
              {
                text: target.description.join(target.plus ? "\n<b%+%b>" : "\n"),
                style: {
                  display: "block",
                  position: "relative",
                  fontSize: String(serviceDescriptionSize) + ea,
                  fontWeight: String(serviceDescriptionWeight),
                  color: colorExtended.black,
                  textAlign: "left",
                  lineHeight: String(serviceDescriptionLineHeight),
                  top: String(serviceDescriptionTextTop) + ea,
                  transition: transitionString,
                },
                bold: {
                  display: "inline-flex",
                  position: "relative",
                  "justify-content": "center",
                  "align-items": "center",
                  color: colorExtended.white,
                  fontWeight: String(plusWeight),
                  fontSize: String(plusSize) + ea,
                  background: colorExtended.blueDark,
                  padding: String(plusPaddingLeft) + ea,
                  paddingTop: String(plusPaddingTop) + ea,
                  paddingBottom: String(plusPaddingBottom) + ea,
                  height: String(plusBoxHeight) + ea,
                  "border-radius": String(8) + ea,
                  marginRight: String(plusBoxMarginRight) + ea,
                }
              }
            ]
          });

          mobileRightBox = createNode({
            mother: serviceBase,
            style: {
              display: "inline-flex",
              flexDirection: "column",
              position: "relative",
              width: withOut(mobileLeftBoxWidth + mobileBoxInnerPadding, ea),
              height: withOut(mobileBoxInnerPadding * 2, ea),
              justifyContent: "center",
              alignItems: "center",
              padding: String(mobileBoxInnerPadding) + ea,
              paddingLeft: String(0) + ea,
            },
            child: {
              mode: "img",
              attribute: {
                src: FrontIndexJs.binaryPath + target.source,
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(imageRatio) + '%',
              }
            }
          });

          createNode({
            mother: mobileLeftBox,
            style: {
              display: "inline-flex",
              position: "absolute",
              top: String(mobileBoxInnerPadding) + ea,
              left: String(mobileBoxInnerPadding) + ea,
              width: String(checkCircleWidth) + ea,
              height: String(checkCircleWidth) + ea,
              borderRadius: String(checkCircleWidth) + ea,
              overflow: "visible",
            },
            child: {
              style: {
                display: "inline-flex",
                position: "relative",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                mode: "svg",
                source: svgMaker.checkCircle(colorExtended.white),
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(checkCircleWidth) + ea,
                },
                next: {
                  position: "absolute",
                  top: String(0),
                  left: String(0),
                  width: String(checkCircleWidth) + ea,
                  height: String(checkCircleWidth) + ea,
                  borderRadius: String(checkCircleWidth) + ea,
                  zIndex: String(1),
                  border: "1px solid " + colorExtended.mainBlue,
                  boxSizing: "border-box",
                },
                previous: {
                  class: [ mobileCheckPointClassName ],
                  style: {
                    position: "absolute",
                    top: String(0),
                    left: String(0),
                    width: String(checkCircleWidth) + ea,
                    height: String(checkCircleWidth) + ea,
                    borderRadius: String(checkCircleWidth) + ea,
                    background: colorExtended.mainBlue,
                    opacity: String(target.default ? 1 : 0),
                  },
                }
              }
            }
          });

        }

      }
      for (let i = 0; i < textContent.length; i++) {
        createServiceBlock(i);
      }
      buttonMother = createNode({
        mother: secondBase,
        class: [ firstFadeOutTargetClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          height: String(buttonHeight) + ea,
          marginBottom: String(buttonMotherMarginBottom) + ea,
          opacity: String(0),
          transform: "translateY(30px)",
          animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        },
        child: {
          class: [ finalSelectionCompleteFirstButtonClassName ],
          event: {
            click: async function (e) {
              const targets = [ ...document.querySelectorAll('.' + selectionBaseClassName) ];
              const target = targets.find((d) => { return d.getAttribute("toggle") === "on" });
              let convertingFunction, thisIndex;
              if (target === undefined) {
                window.alert("서비스를 선택해주세요!");
              } else {
                thisIndex = Number(target.getAttribute("index"));
                instance.totalValues[0] = thisIndex;
                window.history.pushState({ mode: "first" }, "");
                if (thisIndex === 0) {
                  convertingFunction = instance.thirdConverting(true).bind(this);
                } else {
                  convertingFunction = instance.firstConverting().bind(this);
                }
                await convertingFunction(e);
              }
            }
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(10) + "px",
            background: colorExtended.darkBlack,
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid " + colorExtended.blueDark,
            cursor: "pointer",
            opacity: String(1),
            transformOrigin: "center",
            transform: "scale(1)",
            animation: "",
            transition: "all 0.5s ease",
          },
          child: {
            text: "선택 완료",
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(buttonSize) + ea,
              fontWeight: String(buttonWeight),
              color: colorExtended.white,
              top: String(buttonTextTop) + ea,
            }
          }
        }
      });
    }
    instance.selectionDomMaker = selectionDomMaker;

    selectionDomMaker(secondBase, false);

    return secondBase;

  } catch (e) {
    console.log(e);
  }
}

FrontIndexJs.prototype.firstConverting = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, firstFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName } = this;
  return async function (e) {
    try {
      const secondBase = document.querySelector('.' + secondBaseClassName);
      const blackTarget = document.querySelector('.' + initAreaClassName);
      const fadeOutTargets = [ ...document.querySelectorAll('.' + firstFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = heightTong.scroll;
      numbersAreaMarginTop = heightTong.numbers;

      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "convertingPage",
        data: {
          cliid: instance.client.cliid,
          date: new Date(),
          order: "first",
        },
      }).catch((err) => {
        console.log(err);
      });

      blackTarget.style.transition = "all 0.6s ease";
      if (blackTarget.style.marginTop.replace(/[^0-9\-]/gi, '') === String(blackScrollTop)) {
        scrollTo(window, 0, 0, false, async () => {
          for (let dom of fadeOutTargets) {
            dom.style.animation = "fadeoutlite 0.6s ease forwards";
          }
          setQueue(() => {
            instance.insertThirdBox(secondBase).catch((err) => {
              console.log(err);
            });
          }, 600);
        });
      } else {
        scrollTo(window, 0, 0, true);
        setQueue(() => {
          blackTarget.style.marginTop = String(blackScrollTop) + ea;
          fadeOutTargets[0].style.marginTop = String(numbersAreaMarginTop) + ea;
          setQueue(() => {
            for (let dom of fadeOutTargets) {
              dom.style.animation = "fadeoutlite 0.6s ease forwards";
            }
            setQueue(() => {
              instance.insertThirdBox(secondBase).catch((err) => {
                console.log(err);
              });
            }, 450);
          }, 600);
        }, 300);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

FrontIndexJs.prototype.insertBarBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const px = "px";
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { firstBarTargetClassName } = this;
  try {
    let thirdBase;
    let minusLeft;
    let x, y, z;
    let radius;
    let barAreaHeight;
    let flagWidth;
    let flagRight;
    let flagTop;
    let commentAreaTop;
    let commentAreaLeft;
    let commentAreaWidth;
    let commentAreaHeight;
    let commentTriangleWidth;
    let commentSize, commentWeight, commentTextTop;

    radius = <%% 5, 5, 4, 3, 4 %%>;

    x = <%% 2, 2, 2, 2, 1 %%>;
    y = <%% 5, 5, 5, 5, 3 %%>;
    z = <%% 8, 8, 8, 8, 5 %%>;

    barAreaHeight = <%% 270, 270, 250, 180, 32 %%>;
    flagWidth = <%% 23, 23, 21, 19, 3.5 %%>;
    flagRight = <%% -19, -19, -18, -17, -3 %%>;
    flagTop = <%% -34, -34, -32, -30, -5.6 %%>;

    commentAreaTop = <%% -52, -52, -50, -42, -9 %%>;
    commentAreaLeft = <%% 2, 2, 2, 2, 0.3 %%>;
    commentAreaWidth = <%% 286, 286, 270, 216, 44.3 %%>;
    commentAreaHeight = <%% 32, 32, 28, 26, 6.1 %%>;

    commentTriangleWidth = <%% 8, 8, 8, 6, 1.6 %%>;

    commentSize = <%% 14, 14, 13, 12, 2.5 %%>;
    commentWeight = <%% 700, 700, 700, 700, 700 %%>;
    commentTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;

    minusLeft = window.innerWidth - standardWidth + 1;

    thirdBase = createNode({
      mother: baseTong,
      class: [ firstBarTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: String(barAreaHeight) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.blueDark,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(0, ea),
        }
      }
    });

    createNode({
      mother: thirdBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(0),
        borderBottom: String(radius) + px + " dotted " + colorExtended.black,
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(-1 * z) + px,
            left: String(-1 * z) + px,
            width: String(radius + (z * 2)) + px,
            height: String(radius + (z * 2)) + px,
            borderRadius: String(radius + (z * 2)) + px,
            background: colorExtended.white,
            opacity: String(0.2),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(-1 * y) + px,
            left: String(-1 * y) + px,
            width: String(radius + (y * 2)) + px,
            height: String(radius + (y * 2)) + px,
            borderRadius: String(radius + (y * 2)) + px,
            background: colorExtended.white,
            opacity: String(0.6),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(-1 * x) + px,
            left: String(-1 * x) + px,
            width: String(radius + (x * 2)) + px,
            height: String(radius + (x * 2)) + px,
            borderRadius: String(radius + (x * 2)) + px,
            background: colorExtended.white,
            opacity: String(1),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(0) + px,
            left: String(0) + px,
            width: String(radius) + px,
            height: String(radius) + px,
            borderRadius: String(radius) + px,
            background: colorExtended.blueDim,
          }
        },
        {
          mode: "svg",
          source: svgMaker.goalFlag(colorExtended.white, colorExtended.mainBlue),
          style: {
            position: "absolute",
            right: String(flagRight) + ea,
            top: String(flagTop) + ea,
            width: String(flagWidth) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            top: String(commentAreaTop) + ea,
            left: String(commentAreaLeft) + ea,
            width: String(commentAreaWidth) + ea,
            height: String(commentAreaHeight) + ea,
            borderRadius: String(8) + "px",
            background: colorExtended.mainBlue,
            borderBottomLeftRadius: String(0) + "px",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
            },
            children: [
              {
                mode: "svg",
                source: svgMaker.commentTriangle("verticalLeft", colorExtended.mainBlue),
                style: {
                  position: "absolute",
                  width: String(commentTriangleWidth) + ea,
                  bottom: String(-1 * commentTriangleWidth) + ea,
                  left: String(0),
                }
              },
              {
                text: big ? "답변을 분석해 정확한 서비스를 제공해드릴게요!" : "답변을 분석해 서비스를 제공해드릴게요!",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(commentSize) + ea,
                  fontWeight: String(commentWeight),
                  color: colorExtended.white,
                  top: String(commentTextTop) + ea,
                }
              }
            ]
          }
        }
      ]
    })


  } catch (e) {
    console.log(e);
  }
}

FrontIndexJs.prototype.resizeEvent = function () {
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

FrontIndexJs.prototype.launching = async function (loading) {
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
    let cliid;
    let clients, client;
    let contentsPhotoObj;
    let fhdVisual;

    if (getObj.cliid !== undefined) {
      cliid = getObj.cliid;
    } else {
      window.alert("잘못된 접근입니다!");
      throw new Error("invaild get object");
    }

    clients = await ajaxJson({ whereQuery: { cliid } }, SECONDHOST + "/getClients", { equal: true });
    if (clients.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    client = clients[0];

    contentsPhotoObj = await ajaxJson({}, BACKHOST + "/styleCuration_getPhotos", { equal: true });
    this.selectPhotos = [];
    this.randomPick = [];
    this.photos = contentsPhotoObj.photos;
    this.contentsArr = contentsPhotoObj.contentsArr;
    this.designers = contentsPhotoObj.designers;
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
      name: "frontIndex",
      client: instance.client,
      base: {
        instance: this,
        binaryPath: FrontIndexJs.binaryPath,
        subTitle: (instance.client.name + " 고객님 서비스 안내"),
        secondBackground: false,
        backgroundType: 9,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        },
        blueLogo: true,
      },
      local: async () => {
        try {
          await instance.insertInitBox();
          const secondBase = await instance.insertSecondBox();
          await instance.insertBarBox();

          instance.resizeEvent();
          setInterval(() => {
            homeliaisonAnalytics({
              page: instance.pageName,
              standard: instance.firstPageViewTime,
              action: "readTimer",
              data: {
                cliid: "null",
                href: window.encodeURIComponent(window.location.href),
                date: dateToString(new Date(), true),
              },
            }).catch((err) => {
              console.log(err);
            });
          }, 60 * 1000);
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "FrontIndexJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    document.querySelector("style").insertAdjacentHTML("beforeend", "*{transition:all 0.3s ease}");

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "FrontIndexJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
