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
      "return ('홈리에종 서비스 큐레이션 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 서비스 큐레이션 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "styleExplanation",
  "hangul": "서비스 큐레이션",
  "route": [
    "styleExplanation"
  ]
} %/%/g

const StyleExplanationJs = function () {
  this.mother = new GeneralJs();
}

StyleExplanationJs.binaryPath = "/middle/style";

StyleExplanationJs.prototype.insertInitBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight, baseTop } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const submitBlockClassName = "submitBlockClassName";
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

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    firstBasePaddingTop = <%% 26, 24, 24, 24, 8 %%>;
    firstBasePaddingBottom = <%% 180, 170, 160, 120, 20 %%>;

    subTitleSize = <%% 18, 18, 17, 16, 3.7 %%>;
    subTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
    subTitleMarginTop = <%% (isMac() ? 4 : 6), (isMac() ? 3 : 5), (isMac() ? 1 : 4), (isMac() ? 1 : 4), 0.5 %%>;

    buttonMarginTop = <%% 165, 160, 132, 110, 3.6 %%>;
    buttonWidth = <%% 190, 194, 186, 168, 31 %%>;
    buttonHeight = <%% 32, 32, 30, 28, 9 %%>;
    buttonSize = <%% 14, 14, 13, 12, 3.5 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
    buttonBetween = <%% 8, 8, 7, 6, 1 %%>;

    titleSize = <%% 57, 51, 48, 39, 8 %%>;
    titleWeight = <%% 500, 500, 500, 500, 500 %%>;
    titleVisualTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.5 %%>;
    titleVisualLeft = <%% 2, 2, 2, 2, -0.5 %%>;
    titleLineHeight = <%% 1.11, 1.11, 1.11, 1.11, 1.07 %%>;

    pointOpacity = 0.4;

    mainImageTop = <%% 27, 24, 18, 16, 33 %%>;
    mainImageHeight = <%% 390, 370, 338, 314, 39 %%>;

    descriptionSize = <%% 15, 14, 14, 13, 3.2 %%>;
    descriptionLineHeight = <%% 1.9, 1.9, 1.9, 1.8, 1.9 %%>;

    mobileLeftPaddingVisual = 1;

    descriptionMarginTop = <%% 40, 40, 36, 30, 81.5 %%>;

    descriptionPointBoldPaddingLeft = <%% 8, 8, 8, 8, 1.6 %%>;
    descriptionPointBoldPaddingTop = <%% (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 3), (isMac() ? 2 : 3), 0.4 %%>;
    descriptionPointBoldPaddingBottom = <%% (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 0.8 %%>;
    descriptionPointBoldMargin = <%% 2, 2, 2, 2, 1 %%>;

    blanketHeight = <%% 50, 50, 50, 50, 50 %%>;
    blanketVisualTop = <%% 1, 1, 1, 1, 1 %%>;
    blanketOpacity = <%% 0.3, 0.3, 0.3, 0.3, 0.3 %%>;
    blanketMargin = <%% 34, 34, 34, 34, 34 %%>;

    if (desktop && window.innerHeight > 1100) {
      titleSize = <%% 59, 51, 48, 39, 9 %%>;
      subTitleSize = <%% 19, 18, 17, 16, 3.6 %%>;
      firstBasePaddingTop = <%% 60, 48, 30, 28, 50 %%>;
      subTitleSize = <%% 19, 18, 17, 15, 3.6 %%>;
      firstBasePaddingBottom = <%% 210, 210, 160, 130, 210 %%>;
      mainImageTop = <%% 42, 32, 18, 16, 32 %%>;
      mainImageHeight = <%% 390, 372, 338, 314, 39 %%>;
      buttonMarginTop = <%% 146, 146, 132, 110, 3.6 %%>;
    }

    this.totalContents = document.getElementById("totalcontents");
    this.totalContents.style.overflow = "hidden";
    this.totalContents.style.background = colorExtended.black;
    document.body.style.background = colorExtended.black;

    description = [
      "홈리에종의 서비스 진행을 위해서는 다음 큐레이션 과정이 필요합니다.",
      "서비스 신청서를 모두 작성 후, <b%디자이너의 1:1 맞춤 상담%b>을 받아보세요!"
    ];

    firstBase = createNode({
      mother: baseTong,
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
          background: colorExtended.darkDarkBlack,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: desktop ? withOut(1 * ((-1 * baseTop) + naviHeight), ea) : String(185) + ea,
        }
      }
    });
  
    // main title
    createNode({
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
          text: (desktop ? "Service curation<b%.%b>" : "Service curation<b%.%b>"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.white,
            fontFamily: "mont",
            top: desktop ? String(titleVisualTop) + ea : "",
            left: desktop ? String(titleVisualLeft) + ea : "",
            lineHeight: String(titleLineHeight),
          },
          bold: {
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.white,
            fontFamily: "mont",
            opacity: String(pointOpacity),
          }
        }
      ]
    });

    // sub title
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(subTitleMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
      },
      children: [
        {
          text: "서비스 상세 큐레이션",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.white,
            fontWeight: String(subTitleWeight),
            fontSize: String(subTitleSize) + ea,
            textAlign: "center",
          }
        }
      ]
    });

    // description
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(descriptionMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.5s ease 0s 1 normal forwards running fadeupdelay2",
        textAlign: "center",
        flexDirection: "row",
      },
      children: [
        {
          mode: "img",
          attribute: {
            src: StyleExplanationJs.binaryPath + "/blanketLeft.svg",
          },
          style: {
            display: "inline-block",
            position: "relative",
            height: String(blanketHeight) + ea,
            opacity: String(blanketOpacity),
            marginRight: String(blanketMargin) + ea,
            top: String(blanketVisualTop) + ea,
          }
        },
        {
          text: description.join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.white,
            fontWeight: String(400),
            fontSize: String(descriptionSize) + ea,
            lineHeight: String(descriptionLineHeight),
          },
          bold: {
            color: colorExtended.darkDarkBlack,
            fontWeight: String(700),
            fontSize: String(descriptionSize) + ea,
            lineHeight: String(descriptionLineHeight),
            background: colorExtended.gradientBlue,
            padding: String(descriptionPointBoldPaddingLeft) + ea,
            paddingTop: String(descriptionPointBoldPaddingTop) + ea,
            paddingBottom: String(descriptionPointBoldPaddingBottom) + ea,
            "border-radius": String(5) + "px",
            margin: String(descriptionPointBoldMargin) + ea,
          }
        },
        {
          mode: "img",
          attribute: {
            src: StyleExplanationJs.binaryPath + "/blanketRight.svg",
          },
          style: {
            display: "inline-block",
            position: "relative",
            height: String(blanketHeight) + ea,
            opacity: String(blanketOpacity),
            marginLeft: String(blanketMargin) + ea,
            top: String(blanketVisualTop) + ea,
          }
        },
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

StyleExplanationJs.prototype.insertSecondBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    let mainHeight;
    let minusLeft;
    let secondBase;
    let colorTop;
    let serviceBase;
    let textContent;
    let descriptionSize;
    let checkCircleWidth;
    let visualTop;
    let createServiceBlock;
    let titleSize;
    let descriptionMarginTop;
    let boxWidth, boxHeight;
    let betweenMargin;
    let totalHeight;
    let circleMarginTop;
    let mobileStartEndText;
    let mobileBasePaddingTop;
    let mobileWhiteBase;
    let num;
    let startEndSize;
    let startEndValueSize;
    let whiteInnerPadding;
    let whiteInnerVisualPaddingTop;
    let mobileServicePaddingTop;

    mainHeight = <%% 440, 390, 370, 280, 136 %%>;
    minusLeft = window.innerWidth - standardWidth + 1;

    colorTop = <%% 200, 200, 200, 200, 200 %%>;

    titleSize = <%% 23, 21, 19, 17, 4.6 %%>;
    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 9, 9, 7, 6, 2.6 %%>;

    checkCircleWidth = <%% 21, 21, 20, 18, 4.6 %%>;

    visualTop = <%% 24, 24, 22, 17, 2 %%>;

    boxWidth = <%% 290, 270, 240, 200, 56 %%>;
    boxHeight = <%% 227, 214, 192, 163, 39.8 %%>;

    betweenMargin = <%% 152, 90, 90, 60, 9 %%>;

    totalHeight = <%% 350, 340, 320, 254, 88 %%>;

    circleMarginTop = <%% 16, 16, 14, 12, 2.2 %%>;

    mobileBasePaddingTop = 7.2;
    startEndSize = 3.3;
    startEndValueSize = 3.6;
    whiteInnerPadding = 4.8;
    whiteInnerVisualPaddingTop = 2.1;
    mobileServicePaddingTop = 5;

    textContent = [
      {
        title: "홈퍼니싱",
        description: [
          "<b%시공 없이 스타일링만%b>",
          "가구와 소품, 그리고 패브릭으로 진행",
        ],
        margin: false,
        focus: true,
      },
      {
        title: "홈스타일링",
        description: [
          "<b%부분 시공과 스타일링%b>",
          "집 컨디션에 맞는 범위의 시공을 진행",
        ],
        margin: true,
        focus: true,
      },
      {
        title: "토탈 스타일링",
        description: [
          "<b%전체 시공과 스타일링%b>",
          "전체 시공과 스타일링까지 전부 진행"
        ],
        margin: false,
        focus: true,
      },
    ]

    mobileStartEndText = [
      [
        "예상 시작일",
        "2020-01-01",
      ],
      [
        "예상 종료일",
        "2020-01-01",
      ],
    ]

    if (mobile) {
      textContent = textContent.find((o) => { return o.focus });
    }

    secondBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        flexDirection: "column",
        height: desktop ? String(totalHeight) + ea : "",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: desktop ? "row" : "column",
        paddingTop: desktop ? "" : String(mobileBasePaddingTop) + ea,
        paddingBottom: desktop ? "" : String(mobileBasePaddingTop) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.gradientBlue,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: desktop ? withOut(1 * ((-1 * colorTop) + naviHeight), ea) : withOut(0, ea),
        }
      }
    });

    createServiceBlock = (index, thisMother = secondBase) => {
      let target;
      if (typeof index === "number") {
        target = textContent[index];
      } else {
        target = objectDeepCopy(index);
      }
      serviceBase = createNode({
        mother: thisMother,
        style: {
          display: "inline-flex",
          position: "relative",
          width: desktop ? String(boxWidth) + ea : withOut(0, ea),
          height: String(boxHeight) + ea,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          top: String(visualTop) + ea,
          opacity: target.focus ? String(1) : String(0.4),
          marginLeft: (desktop && target.margin) ? String(betweenMargin) + ea : "",
          marginRight: (desktop && target.margin) ? String(betweenMargin) + ea : "",
        }
      });
      createNode({
        mother: serviceBase,
        mode: "svg",
        source: svgMaker.houseLine(colorExtended.focusBlue),
        style: {
          display: "flex",
          position: "absolute",
          width: String(boxWidth) + ea,
          top: String(0),
          left: desktop ? String(0) : withOut(50, boxWidth / 2, ea),
        }
      });
      createNode({
        mother: serviceBase,
        text: target.title,
        style: {
          display: "flex",
          position: "relative",
          fontFamily: "gmarket",
          fontSize: String(titleSize) + ea,
          fontWeight: String(700),
          color: colorExtended.black,
          marginTop: desktop ? "" : String(5.6) + ea,
        }
      });
      createNode({
        mother: serviceBase,
        text: target.description[0],
        style: {
          display: "flex",
          position: "relative",
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(400),
          color: colorExtended.black,
          marginTop: String(descriptionMarginTop) + ea,
          marginBottom: String(0) + ea,
        },
        bold: {
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(800),
          color: colorExtended.black,
        }
      });
      createNode({
        mother: serviceBase,
        text: target.description[1],
        style: {
          display: "flex",
          position: "relative",
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(400),
          color: colorExtended.black,
        },
        bold: {
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(800),
          color: colorExtended.black,
        }
      });
      createNode({
        mother: serviceBase,
        style: {
          display: "flex",
          width: String(checkCircleWidth) + ea,
          height: String(checkCircleWidth) + ea,
          background: target.focus ? colorExtended.focusBlue : colorExtended.white,
          borderRadius: String(checkCircleWidth) + ea,
          marginTop: String(circleMarginTop) + ea,
          border: "1px solid " + colorExtended.focusBlue,
        },
        child: {
          mode: "svg",
          source: svgMaker.checkCircle(colorExtended.white),
          style: {
            display: "flex",
            position: "relative",
            width: String(checkCircleWidth) + ea,
          },
        }
      });
    }

    if (desktop) {
      for (let i = 0; i < textContent.length; i++) {
        createServiceBlock(i);
      }
    } else {

      mobileWhiteBase = createNode({
        mother: secondBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          boxShadow: "0px 3px 13px -9px " + colorExtended.blueDim,
          paddingTop: String(whiteInnerVisualPaddingTop) + ea,
          paddingBottom: String(whiteInnerVisualPaddingTop) + ea,
          flexDirection: "column",
          marginBottom: String(2) + ea,
        }
      });

      num = 0;
      for (let [ black, white ] of mobileStartEndText) {
        createNode({
          mother: mobileWhiteBase,
          style: {
            display: "flex",
            position: "relative",
            marginLeft: String(whiteInnerPadding) + ea,
            width: withOut(whiteInnerPadding * 2, ea),
            height: String(12) + ea,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
            borderBottom: num === 0 ? "1px dashed " + colorExtended.black : "",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(21.6) + ea,
                height: String(7.2) + ea,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: String(8) + "px",
                background: colorExtended.black,
              },
              child: {
                text: black,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontWeight: String(800),
                  fontSize: String(startEndSize) + ea,
                  color: colorExtended.white,
                  top: String(-0.2) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                right: String(0),
                top: String(0),
                width: String(40) + ea,
                height: withOut(0, ea),
                alignItems: "center",
                justifyContent: "end",
              },
              child: {
                text: white,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontWeight: String(500),
                  fontSize: String(startEndValueSize) + ea,
                  color: colorExtended.black,
                  top: String(-0.4) + ea,
                }
              }
            },
          ]
        });
        num++;
      }

      createServiceBlock(textContent, createNode({
        mother: secondBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          boxShadow: "0px 3px 13px -9px " + colorExtended.blueDim,
          paddingTop: String(mobileServicePaddingTop) + ea,
          paddingBottom: String(mobileServicePaddingTop) + ea,
          flexDirection: "column",
        }
      }));
    }

  } catch (e) {
    console.log(e);
  }
}

StyleExplanationJs.prototype.resizeEvent = function () {
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

StyleExplanationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, dateToString, homeliaisonAnalytics, colorExtended, stringToLink, objectDeepCopy } = GeneralJs;
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true");
    const normalMode = (entireMode && getObj.normal === "true");
    let cliid;
    let clients, client;

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
    this.client = client;

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "styleExplanation",
      client: instance.client,
      base: {
        instance: this,
        binaryPath: StyleExplanationJs.binaryPath,
        subTitle: (instance.client.name + " 고객님 서비스 안내"),
        secondBackground: false,
        backgroundType: 9,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          await instance.insertInitBox();
          await instance.insertSecondBox();
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
          await GeneralJs.ajaxJson({ message: "StyleExplanationJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
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
    await GeneralJs.ajaxJson({ message: "StyleExplanationJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
