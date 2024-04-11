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
      "return ('홈리에종 디자이너 추천 제안서 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 디자이너 추천 제안 페이지입니다.');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "clientExplanation",
  "hangul": "디자이너 추천",
  "route": [
    "clientExplanation"
  ]
} %/%/g

const ClientExplanationJs = function () {
  this.mother = new GeneralJs();
}

ClientExplanationJs.binaryPath = "/middle/client";

ClientExplanationJs.prototype.insertInitBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight, baseTop } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
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

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    firstBasePaddingTop = <%% 26, 24, 24, 24, 8 %%>;
    firstBasePaddingBottom = <%% 180, 170, 160, 120, 20 %%>;

    subTitleSize = <%% 18, 18, 17, 16, 3.7 %%>;
    subTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
    subTitleMarginTop = <%% (isMac() ? 6 : 8), (isMac() ? 5 : 7), (isMac() ? 3 : 6), (isMac() ? 3 : 6), 0.5 %%>;

    buttonMarginTop = <%% 165, 160, 132, 110, 3.6 %%>;
    buttonWidth = <%% 136, 194, 186, 168, 31 %%>;
    buttonHeight = <%% 32, 32, 30, 28, 9 %%>;
    buttonSize = <%% 14, 14, 13, 12, 3.5 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
    buttonBetween = <%% 8, 8, 7, 6, 1 %%>;

    titleSize = <%% 57, 51, 48, 39, 8 %%>;
    titleWeight = <%% 500, 500, 500, 500, 500 %%>;
    titleVisualTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.5 %%>;
    titleVisualLeft = <%% -2, -2, -2, -2, -0.5 %%>;
    titleLineHeight = <%% 1.11, 1.11, 1.11, 1.11, 1.07 %%>;

    pointOpacity = 0.4;

    mainImageTop = <%% 27, 24, 18, 16, 33 %%>;
    mainImageHeight = <%% 390, 370, 338, 314, 39 %%>;

    descriptionSize = <%% 15, 14, 14, 13, 3.2 %%>;
    descriptionLineHeight = <%% 1.8, 1.8, 1.8, 1.7, 1.8 %%>;

    mobileLeftPaddingVisual = 1;

    descriptionMarginTop = <%% 40, 40, 36, 30, 81.5 %%>;

    descriptionPointBoldPaddingLeft = <%% 8, 8, 8, 8, 1.6 %%>;
    descriptionPointBoldPaddingTop = <%% (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 3), (isMac() ? 2 : 3), 0.4 %%>;
    descriptionPointBoldPaddingBottom = <%% (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 0.8 %%>;
    descriptionPointBoldMargin = <%% 2, 2, 2, 2, 1 %%>;

    mobileImageRight = 5;
    mobileSubImageMarginTop = 7.5;

    mainIllust = <%% ClientExplanationJs.binaryPath + "/mainIllust0.png", ClientExplanationJs.binaryPath + "/mainIllust1.png", ClientExplanationJs.binaryPath + "/mainIllust2.png", ClientExplanationJs.binaryPath + "/mainIllust2.png", ClientExplanationJs.binaryPath + "/mainIllust1.png" %%>;

    if (big) {
      descriptionContents = [
        `홈리에종의 서비스 진행을 위해서는 다음과 같이 기본 정보가 필요합니다.`,
        `서비스 신청서를 간단히 작성 후, <b%디자이너의 1:1 맞춤 상담%b> 을 받아보세요!`,
      ];
    } else {
      descriptionContents = [
        `고객님께 <b%디자이너의 1:1 맞춤 상담%b>와 그에 맞는`,
        `디자이너를 제안드립니다. 선택된 디자이너는 고객님의 예산을`,
        `현장 조건에 맞게 적절히 분배하여 스타일링을 진행합니다.`,
      ];
    }

    if (desktop && window.innerHeight > 1100) {
      titleSize = <%% 59, 51, 48, 39, 9 %%>;
      subTitleSize = <%% 19, 18, 17, 16, 3.6 %%>;
      firstBasePaddingTop = <%% 60, 48, 30, 28, 50 %%>;
      subTitleSize = <%% 19, 18, 17, 15, 3.6 %%>;
      firstBasePaddingBottom = <%% 230, 210, 160, 130, 210 %%>;
      mainImageTop = <%% 28, 28, 18, 16, 32 %%>;
      mainImageHeight = <%% 410, 372, 338, 314, 39 %%>;
      buttonMarginTop = <%% 150, 150, 132, 110, 3.6 %%>;
    }

    this.totalContents = document.getElementById("totalcontents");
    this.totalContents.style.overflow = "hidden";
    this.totalContents.style.background = colorExtended.mainBlue;
    document.body.style.background = colorExtended.mainBlue;

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
          background: colorExtended.white,
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
        justifyContent: desktop ? "start" : "center",
        alignItems: desktop ? "start" : "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        paddingLeft: mobile ? String(mobileLeftPaddingVisual) + ea : "",
      },
      children: [
        {
          text: (desktop ? "Service request<b%.%b>" : "Service request<b%.%b>"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.mainBlue,
            fontFamily: "mont",
            top: desktop ? String(titleVisualTop) + ea : "",
            left: desktop ? String(titleVisualLeft) + ea : "",
            lineHeight: String(titleLineHeight),
          },
          bold: {
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.mainBlue,
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
        justifyContent: desktop ? "start" : "center",
        alignItems: desktop ? "start" : "center",
        marginTop: String(subTitleMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
      },
      children: [
        {
          text: "홈리에종 서비스 신청",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(subTitleWeight),
            fontSize: String(subTitleSize) + ea,
          }
        }
      ]
    });

    // main illust
    createNode({
      mother: firstBase,
      mode: "img",
      attribute: {
        src: mainIllust
      },
      style: {
        position: "absolute",
        right: desktop ? String(0) : String(mobileImageRight) + ea,
        top: String(mainImageTop) + ea,
        width: desktop ? "" : withOut(mobileImageRight * 2, ea),
        height: desktop ? String(mainImageHeight) + ea : "",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0.2s 1 normal forwards running fadeupdelay2",
      }
    })

    // description
    createNode({
      mother: firstBase,
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
            color: colorExtended.black,
            fontWeight: String(400),
            fontSize: String(descriptionSize) + ea,
            lineHeight: String(descriptionLineHeight),
          },
          bold: {
            color: colorExtended.white,
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
            src: ClientExplanationJs.binaryPath + "/mainIllust4.png"
          },
          style: {
            display: desktop ? "none" : "relative",
            position: "relative",
            marginTop: String(mobileSubImageMarginTop) + ea,
            width: desktop ? "" : withOut(mobileImageRight * 2, ea),
            opacity: String(0),
            transform: "translateY(30px)",
            animation: "1.2s ease 0.2s 1 normal forwards running fadeupdelay2",
          }
        }
      ]
    })

    // black buttons
    if (desktop) {
      createNode({
        mother: firstBase,
        attribute: {
          selectstart: (e) => { e.preventDefault() },
        },
        style: {
          display: "flex",
          position: "relative",
          justifyContent: "start",
          alignItems: "center",
          marginTop: String(buttonMarginTop) + ea,
          opacity: String(0),
          transform: "translateY(10px)",
          animation: "1.2s ease 0.4s 1 normal forwards running fadeupdelay",
          cursor: "pointer",
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "relative",    
              width: String(buttonWidth) + ea,
              height: String(buttonHeight) + ea,
              background: colorExtended.darkDarkShadow,
              borderRadius: String(buttonHeight) + ea,
              justifyContent: "center",
              alignItems: "center",
            },
            child: {
              attribute: {
                selectstart: (e) => { e.preventDefault() },
              },
              text: `무료 상담 신청`,
              style: {
                display: "inline-block",
                position: "relative",
                top: String(buttonTextTop) + ea,
                fontSize: String(buttonSize) + ea,
                fontWeight: String(700),
                color: colorExtended.white,
              },
              next: {
                mode: "svg",
                source: svgMaker.buttonLineArrow(colorExtended.white),
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: String(7) + ea,
                  transform: "rotate(90deg)",
                  marginLeft: String(11) + ea,
                }
              }
            }
          },
        ]
      });
    }

  } catch (e) {
    console.log(e);
  }
}

ClientExplanationJs.prototype.insertSecondBox = async function () {
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
        focus: false,
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
        focus: false,
      },
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
          background: colorExtended.blueWhiteBack,
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

ClientExplanationJs.prototype.insertConsultingBox = function (thisBase) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, ajaxJson, equalJson } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const baseBlockClassName = "baseBlockClassName";
  const inputClassName = "inputClassName";
  const agreeTargetClassName = "agreeTargetClassName";
  const variableBarClassName = "variableBarClassName";
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
  let pyeongNumberEvent;
  let pyeongBlurEvent;
  let pyeongFocusEvent;
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
  let livingAlertEvent;
  let livingDownEvent;
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
  let budgetValues;
  let furnitureValues;
  let defaultRatio;
  let barClickEvent;
  let barFactorTongVisualTop;
  let thisTempBlock;

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
  grayBigHeight = <%% 156, 137, 136, 135, 38 %%>;
  grayTextAreaTop = <%% 3, 3, 3, 3, 1.3 %%>;
  grayTextAreaWidth = <%% 51.7, 51.7, 51.7, 390, 51.7 %%>;

  moduleHeight = grayTop + grayHeight;
  blockMarginBottom = <%% 12, 12, 9, 9, 2 %%>;

  leftGrayType0 = <%% 101, 90, 78, 78, 18 %%>;
  leftGrayType1 = <%% 418, 361, 318, 96, 22.8 %%>;
  leftGrayType2 = <%% 125, 112, 98, 98, 22.8 %%>;
  leftGrayType3 = <%% 164, 151, 130, 129, 30.5 %%>;

  widthGrayType0 = <%% 160, 140, 140, 150, 34 %%>;
  widthGrayType1 = <%% 455, 329, 283, 403, 58.1 %%>;
  widthGrayType2 = <%% 757, 588, 503, 383, 53.4 %%>;
  widthGrayType3 = <%% 392, 268, 231, 352, 45.6 %%>;

  addressWidth = <%% 54, 54, 46, 46, 11 %%>;
  addressSize = <%% 13, 13, 12, 12, 3 %%>;
  addressWeight = <%% 600, 600, 600, 600, 600 %%>;
  addressTop = <%% (isMac() ? 6 : 8), (isMac() ? 6 : 8), (isMac() ? 6 : 8), (isMac() ? 6 : 8), 1.2 %%>;

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
  submitButtonWidth = <%% 170, 170, 150, 136, 34 %%>;
  submitButtonHeight = <%% 47, 47, 42, 38, 10 %%>;
  submitSize = <%% 20, 20, 18, 16, 4 %%>;
  submitWeight = <%% 400, 400, 400, 400, 400 %%>;
  submitLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  submitTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;

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

  barFactorTongVisualTop = <%% 0, 1, 0, 0, 0 %%>;

  mobileGrayTextAreaTop = 7.8;

  defaultRatio = 0.5;

  contents = {
    main: [
      "홈리에종 서비스 신청",
    ],
    sub: [
      <&& "홈리에종의 서비스 진행을 위해서는" | "홈리에종 서비스 진행을 위해서는" | "서비스 진행을 위해서는" | "서비스 진행을 위해서는" | "홈리에종 서비스 진행을 위해서는" &&>,
      <&& "다음과 같이 기본 정보가 필요합니다." | "다음 기본 정보가 필요합니다." | "기본 정보가 필요합니다." | "기본 정보가 필요합니다." | "다음 기본 정보가 필요합니다." &&>,
      <&& "서비스 신청서를 간단히 작성 후," | "신청서를 간단히 작성 후," | "신청서를 간단히 작성 후," | "신청서를 간단히 작성 후," | "신청서를 간단히 작성 후," &&>,
      <&& "<b%디자이너의 1:1 맞춤 상담%b>을 받아보세요!" | "<b%1:1 맞춤 상담%b>을 받아보세요!" | "<b%1:1 상담%b>을 받아보세요!" | "<b%1:1 상담%b>을 받아보세요!" | "<b%1:1 맞춤 상담%b>을 받아보세요!" &&>,
    ]
  };

  budgetValues = [
    { title: (desktop ? "1,000만원 이하" : "1천만원 이하"), value: "1,000만원", },
    { title: (desktop ? "2,000만원" : "2천만원"), value: "2,000만원", },
    { title: (desktop ? "3,000만원" : "3천만원"), value: "3,000만원", },
    { title: (desktop ? "4,000만원" : "4천만원"), value: "4,000만원", },
    { title: (desktop ? "5,000만원" : "5천만원"), value: "5,000만원 이상", },
    { title: (desktop ? "6,000만원" : "6천만원"), value: "6,000만원 이상", },
    { title: (desktop ? "7,000만원" : "7천만원"), value: "7,000만원 이상", },
    { title: (desktop ? "8,000만원" : "8천만원"), value: "8,000만원 이상", },
    { title: "1억원 이상", value: "1억원 이상", },
  ];

  furnitureValues = [
    { title: "재배치", value: "재배치", },
    { title: "재배치 + 일부 구매", value: "일부 구매", },
    { title: "전체 구매", value: "전체 구매", },
  ];

  barClickEvent = (arr, property) => {
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

      instance.mother.setMemory({
        property: property,
        type: "bar",
        value: { valuesArr, ratio },
      }).catch((err) => { console.log(err) });
    }
  }

  phoneHypenEvent = function (e) {
    this.value = autoHypenPhone(this.value);
  }

  nameBlurEvent = function (e) {
    this.value = this.value.trim().replace(/[^a-zA-Z가-힣]/gi, '');
    instance.mother.setMemory({
      property: "name",
      type: "text",
      value: this.value,
    }).catch((err) => { console.log(err) });
    if (this.value !== '') {
      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "inputBlur",
        data: {
          property: "name",
          value: this.value,
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  phoneBlurEvent = function (e) {
    this.value = this.value.trim().replace(/[^0-9\-]/gi, '');
    this.value = autoHypenPhone(this.value);
    instance.mother.setMemory({
      property: "phone",
      type: "text",
      value: this.value,
    }).catch((err) => { console.log(err) });
    if (this.value !== '') {
      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "inputBlur",
        data: {
          property: "phone",
          value: this.value,
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  emailBlurEvent = function () {
    if (!/\@/.test(this.value) || !/\./.test(this.value)) {
      this.value = this.value.replace(/[\=\+\?\#\&\(\)]/gi, '');
    }
    instance.mother.setMemory({
      property: "email",
      type: "text",
      value: this.value,
    }).catch((err) => { console.log(err) });
    if (this.value !== '') {
      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "inputBlur",
        data: {
          property: "email",
          value: this.value,
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  bigAddressBlurEvent = function () {
    instance.mother.setMemory({
      property: "address0",
      type: "text",
      value: this.value,
    }).catch((err) => { console.log(err) });
    if (this.value !== '') {
      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "inputBlur",
        data: {
          property: "address0",
          value: this.value,
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });
    }
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
            instance.mother.setMemory({
              property: "address0",
              type: "text",
              value: e.data.trim(),
            }).catch((err) => { console.log(err) });
          }
          const targets = document.querySelectorAll('.' + removeTargets);
          for (let dom of targets) {
            dom.remove();
          }
          window.removeEventListener("message", GeneralJs.stacks["addressEvent"]);
          GeneralJs.stacks["addressEvent"] = null;
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ClientExplanationJs.addressEvent : " + e.message }, BACKHOST + "/errorLog");
        }
      }
      window.addEventListener("message", GeneralJs.stacks["addressEvent"]);

      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "addressClick",
        data: {
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });

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
    const self = this;
    const mother = this.previousElementSibling;
    const targets = [ ...mother.children ];
    for (let dom of targets) {
      dom.remove();
    }
    instance.mother.setMemory({
      property: "address1",
      type: "text",
      value: this.value,
    }).catch((err) => { console.log(err) });
    if (this.value !== '') {
      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "inputBlur",
        data: {
          property: "address1",
          value: this.value,
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  addressFocusEvent = function (e) {
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
          text: "주소는 인테리어를 받으실 곳으로 적어주세요!",
          style: {
            position: "absolute",
            width: String(greenNoticeWidth1) + ea,
            left: "calc(50% - " + String((greenNoticeWidth1 / 2) + greenNoticePaddingLeft) + ea + ")",
            background: colorExtended.gradientBlue,
            fontSize: String(greenNoticeSize) + ea,
            fontWeight: String(greenNoticeWeight),
            color: colorChip.white,
            paddingTop: String(greenNoticePaddingTop) + ea,
            paddingBottom: String(greenNoticePaddingBottom) + ea,
            paddingLeft: String(greenNoticePaddingLeft) + ea,
            paddingRight: String(greenNoticePaddingLeft) + ea,
            bottom: String(greenNoticeBottom) + ea,
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
            animation: "fadeuplite 0.3s ease forwards",
            lineHeight: String(greenNoticeLineHeight),
          }
        }
      ]
    });

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
            background: colorExtended.gradientBlue,
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
    instance.mother.setMemory({
      property: "etc",
      type: "text",
      value: this.value,
    }).catch((err) => { console.log(err) });
    if (this.value !== '') {
      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "inputBlur",
        data: {
          property: "etc",
          value: this.value,
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  pyeongNumberEvent = function (e) {
    this.value = this.value.replace(/[^0-9\.]/gi, '');
  }

  pyeongBlurEvent = function (e) {
    const self = this;
    const mother = this.previousElementSibling;
    const targets = [ ...mother.children ];
    for (let dom of targets) {
      dom.remove();
    }
    if (this.value.replace(/[^0-9\.]/gi, '').trim() === '') {
      this.value = "00평";
    } else {
      this.value = this.value.replace(/[^0-9\.]/gi, '') + "평";
    }
    instance.mother.setMemory({
      property: "pyeong",
      type: "text",
      value: this.value,
    }).catch((err) => { console.log(err) });
    if (this.value !== "00평" && this.value !== '') {
      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "inputBlur",
        data: {
          property: "pyeong",
          value: this.value,
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  pyeongFocusEvent = function (e) {
    const self = this;
    const mother = this.previousElementSibling;

    this.value = this.value.replace(/[^0-9\.]/gi, '');

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
          text: "평수는 반드시 분양 평수(공급 평수)로 적어주세요!",
          style: {
            position: "absolute",
            width: String(greenNoticeWidth0) + ea,
            left: "calc(50% - " + String((greenNoticeWidth0 / 2) + greenNoticePaddingLeft) + ea + ")",
            background: colorExtended.gradientBlue,
            fontSize: String(greenNoticeSize) + ea,
            fontWeight: String(greenNoticeWeight),
            color: colorChip.white,
            paddingTop: String(greenNoticePaddingTop) + ea,
            paddingBottom: String(greenNoticePaddingBottom) + ea,
            paddingLeft: String(greenNoticePaddingLeft) + ea,
            paddingRight: String(greenNoticePaddingLeft) + ea,
            bottom: String(greenNoticeBottom) + ea,
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
            animation: "fadeuplite 0.3s ease forwards",
            lineHeight: String(greenNoticeLineHeight),
          }
        }
      ]
    });

  }

  livingDownEvent = function (id) {
    GeneralJs.stacks["currentLivingAlertId"] = null;
    if (document.getElementById(id) !== null) {
      document.getElementById(id).style.animation = "fadedownlite 0.3s ease forwards";
      setQueue(() => {
        if (document.getElementById(id) !== null) {
          document.getElementById(id).parentElement.removeChild(document.getElementById(id));
        }
      }, 301);
    }
  }

  livingAlertEvent = function (mother) {

    // const tempId = uniqueValue("hex");
    const moveinTarget = [ ...document.querySelectorAll("." + inputClassName) ].find((dom) => { return dom.getAttribute("property") === "movein" });
    // createNode({
    //   mode: "aside",
    //   mother,
    //   id: tempId,
    //   style: {
    //     position: "absolute",
    //     top: String(0),
    //     left: String(0),
    //     width: String(100) + '%',
    //     height: String(100) + '%',
    //     textAlign: "center",
    //   },
    //   children: [
    //     {
    //       text: "거주중일 시, 보관 이사가 없다면 도배와 필름 제외 시공이 어렵습니다!",
    //       style: {
    //         position: "absolute",
    //         width: String(greenNoticeWidth1) + ea,
    //         left: "calc(50% - " + String((greenNoticeWidth1 / 2) + (greenNoticePaddingLeft / 2)) + ea + ")",
    //         background: colorExtended.gradientBlue,
    //         fontSize: String(greenNoticeSize) + ea,
    //         fontWeight: String(greenNoticeWeight),
    //         color: colorChip.white,
    //         paddingTop: String(greenNoticePaddingTop) + ea,
    //         paddingBottom: String(greenNoticePaddingBottom) + ea,
    //         paddingLeft: String(greenNoticePaddingLeft) + ea,
    //         paddingRight: String(greenNoticePaddingLeft) + ea,
    //         bottom: String(greenNoticeBottom2) + ea,
    //         borderRadius: String(5) + "px",
    //         boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
    //         animation: "fadeuplite 0.3s ease forwards",
    //         lineHeight: String(greenNoticeLineHeight),
    //       }
    //     }
    //   ]
    // });
    if (moveinTarget.value.trim() === '') {
      moveinTarget.value = dateToString(new Date());
    }
    // GeneralJs.stacks["currentLivingAlertId"] = tempId;
    // setQueue(() => {
    //   livingDownEvent(tempId);
    // }, 5 * 1000);

  }

  checkboxClickEvent0 = async function (e) {
    try {
      const property = this.getAttribute("property");
      const toggle = this.getAttribute("toggle");
      const targetsAll = [ ...document.querySelectorAll("." + inputClassName) ];
      const targets = targetsAll.filter((dom) => { return dom.getAttribute("property") === property });
      let valueArr, index;
      valueArr = new Array(targets.length);
      index = 0;
      for (let dom of targets) {
        if (dom === this) {
          if (/거주중/gi.test(dom.children[2].textContent)) {
            livingAlertEvent(dom);
          }
          dom.setAttribute("toggle", "on");
          dom.children[0].style.opacity = String(0);
          dom.children[1].style.opacity = String(1);
          dom.children[2].style.color = colorExtended.focusBlue;
          valueArr[index] = 1;
        } else {
          dom.setAttribute("toggle", "off");
          dom.children[0].style.opacity = String(1);
          dom.children[1].style.opacity = String(0);
          dom.children[2].style.color = colorChip.black;
          valueArr[index] = 0;
        }
        index++;
      }
      instance.mother.setMemory({
        property: property,
        type: "radio",
        value: valueArr,
      }).catch((err) => { console.log(err) });
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
        const self = findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "movein");
        let targets;
        self.value = this.getAttribute("buttonValue");
        instance.mother.setMemory({
          property: "movein",
          type: "text",
          value: self.value,
        }).catch((err) => { console.log(err) });
        homeliaisonAnalytics({
          page: instance.pageName,
          standard: instance.firstPageViewTime,
          action: "inputBlur",
          data: {
            property: "movein",
            value: self.value,
            date: dateToString(new Date(), true),
          },
        }).catch((err) => {
          console.log(err);
        });
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
      circle.style.background = colorExtended.mainBlue;
      words.style.color = colorExtended.mainBlue;
      circle.setAttribute("toggle", "on");
      words.setAttribute("toggle", "on");
    }
  }

  mainBlock = createNode({
    mother: thisBase,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(8) + "px",
      boxShadow: "0px 8px 20px -9px " + colorExtended.blueDim,
      overflow: "hidden",
    }
  });

  contentsArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.white,
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
    source: svgMaker.doubleQuote(colorExtended.mainBlue),
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
    class: [ baseBlockClassName ],
    attribute: { baseclass: "name" },
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
          background: colorExtended.mainBlue,
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
    class: [ baseBlockClassName ],
    attribute: { baseclass: "phone" },
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
          background: colorExtended.mainBlue,
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
    class: [ baseBlockClassName ],
    attribute: { baseclass: "email" },
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
          background: colorExtended.mainBlue,
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
    class: [ baseBlockClassName ],
    attribute: { baseclass: "address0" },
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
          background: colorExtended.mainBlue,
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
          background: colorExtended.gradientGray,
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
              fontWeight: String(700),
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
          placeholder: "인테리어 받을 곳의 주소",
          property: "address0",
          value: "",
        },
        event: {
          blur: bigAddressBlurEvent
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
    class: [ baseBlockClassName ],
    attribute: { baseclass: "address1" },
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
          placeholder: "인테리어 받을 곳의 상세 주소",
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
    class: [ baseBlockClassName ],
    attribute: { baseclass: "pyeong" },
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "분양 평수",
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
          left: String(leftGrayType2) + ea,
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
          placeholder: "00평 (분양 평수)",
          property: "pyeong",
          value: "",
        },
        event: {
          keyup: pyeongNumberEvent,
          blur: pyeongBlurEvent,
          focus: pyeongFocusEvent,
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType2) + ea,
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
      }
    ]
  });
  // 8
  createNode({
    mother: rightBox,
    class: [ baseBlockClassName ],
    attribute: { baseclass: "living" },
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "거주 여부",
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
        class: [ inputClassName ],
        attribute: {
          toggle: "on",
          property: "living",
        },
        event: {
          click: checkboxClickEvent0
        },
        style: {
          position: "absolute",
          top: String(0),
          left: String(leftCheck0) + ea,
          height: String(100) + '%',
          verticalAlign: "top",
          cursor: "pointer",
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
            source: instance.mother.returnCheckBox(colorExtended.focusBlue),
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
            text: "이사",
            style: {
              display: "inline-block",
              position: "relative",
              marginLeft: String(checkboxBetween) + ea,
              top: String(mainTop) + ea,
              fontSize: String(mainSize) + ea,
              fontWeight: String(checkboxWeight),
              color: colorExtended.focusBlue,
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
          property: "living",
        },
        event: {
          click: checkboxClickEvent0
        },
        style: {
          position: "absolute",
          top: String(0),
          left: String(leftCheck1) + ea,
          height: String(100) + '%',
          verticalAlign: "top",
          cursor: "pointer",
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
            source: instance.mother.returnCheckBox(colorExtended.focusBlue),
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
            text: "거주중",
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
  // 9
  createNode({
    mother: rightBox,
    class: [ baseBlockClassName ],
    attribute: { baseclass: "movein" },
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "입주일",
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
          left: String(leftGrayType2) + ea,
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
          placeholder: dateToString(new Date()),
          property: "movein",
          value: "",
        },
        event: {
          click: calendarViewEvent,
          blur: function () {
            instance.mother.setMemory({
              property: "movein",
              type: "text",
              value: this.value,
            }).catch((err) => { console.log(err) });
            if (this.value !== '') {
              homeliaisonAnalytics({
                page: instance.pageName,
                standard: instance.firstPageViewTime,
                action: "inputBlur",
                data: {
                  property: "movein",
                  value: this.value,
                  date: dateToString(new Date(), true),
                },
              }).catch((err) => {
                console.log(err);
              });
            }
          }
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType2) + ea,
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
  // 10
  createNode({
    mother: rightBox,
    class: [ baseBlockClassName ],
    attribute: { baseclass: "contract" },
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "계약 형태",
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
        class: [ inputClassName ],
        attribute: {
          toggle: "on",
          property: "contract",
        },
        event: {
          click: checkboxClickEvent0
        },
        style: {
          position: "absolute",
          top: String(0),
          left: String(leftCheck0) + ea,
          height: String(100) + '%',
          verticalAlign: "top",
          cursor: "pointer",
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
            source: instance.mother.returnCheckBox(colorExtended.focusBlue),
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
            text: "자가",
            style: {
              display: "inline-block",
              position: "relative",
              marginLeft: String(checkboxBetween) + ea,
              top: String(mainTop) + ea,
              fontSize: String(mainSize) + ea,
              fontWeight: String(checkboxWeight),
              color: colorExtended.focusBlue,
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
          property: "contract",
        },
        event: {
          click: checkboxClickEvent0
        },
        style: {
          position: "absolute",
          top: String(0),
          left: String(leftCheck1) + ea,
          height: String(100) + '%',
          verticalAlign: "top",
          cursor: "pointer",
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
            source: instance.mother.returnCheckBox(colorExtended.focusBlue),
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
            text: "전월세",
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


  /*

  // 11 : margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio) + ea,
    }
  });
  
  // 12
  createNode({
    mother: rightBox,
    class: [ baseBlockClassName ],
    attribute: { baseclass: "budget" },
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * 3) + ea,
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "예산",
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
          position: "absolute",
          top: String(barFactorTongVisualTop) + ea,
          left: String(leftGrayType2) + ea,
          width: withOut(leftGrayType2, ea),
          height: "auto",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: [
              "인테리어에 사용할 <b%전체 예산을 알려주세요!%b>",
              desktop ? "<u%* 스타일링, 시공을 모두 포함하는 예산 / 가전 예산은 제외%u>" : "<u%* 스타일링, 시공 모두 포함 예산 / 가전 제외%u>"
            ].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              lineHeight: String(barDescriptionLingHeight),
              color: colorChip.black,
              top: String(barDescriptionTextTop) + ea,
            },
            bold: {
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionBoldWeight),
              color: colorChip.black
            },
            under: {
              fontSize: String(barDescriptionSubSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorExtended.mainBlue
            },
          },
          {
            mode: "aside",
            class: [ inputClassName ],
            attribute: {
              ratio: String(defaultRatio),
              value: budgetValues[Math.round((budgetValues.length - 1) * defaultRatio)].value,
              property: "budget",
            },
            event: {
              click: barClickEvent(budgetValues, "budget"),
            },
            style: {
              display: "block",
              position: "relative",
              height: String(barTongHeight) + ea,
              cursor: "pointer",
              width: desktop ? withOut(0, ea) : withOut(-1 * leftGrayType2, ea),
              marginTop: String(barTongMarginTop) + ea,
              left: mobile ? String(-1 * leftGrayType2) + ea : "",
            },
            children: [
              {
                style: {
                  position: "absolute",
                  top: String(barTop) + ea,
                  height: String(barHeight) + ea,
                  borderRadius: String(barHeight + 1) + ea,
                  background: colorChip.gray3,
                  width: withOut(0, ea),
                  left: String(0) + ea,
                }
              },
              {
                text: budgetValues[0].title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                }
              },
              {
                text: budgetValues[2].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  left: String(barFactorA0Left) + ea,
                }
              },
              {
                text: budgetValues[4].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(700),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  left: String(barFactorA1Left) + ea,
                }
              },
              {
                text: budgetValues[6].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  left: String(barFactorA2Left) + ea,
                }
              },
              {
                text: budgetValues[8].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  right: String(0) + ea,
                }
              },
              {
                class: [ variableBarClassName ],
                style: {
                  position: "absolute",
                  left: String(0) + ea,
                  top: String(0) + ea,
                  width: String(defaultRatio * 100) + '%',
                  height: String(100) + '%',
                  transition: "all 0.3s ease",
                },
                children: [
                  {
                    style: {
                      position: "absolute",
                      top: String(barTop) + ea,
                      height: String(barHeight) + ea,
                      borderRadius: String(barHeight + 1) + ea,
                      background: colorChip.black,
                      width: withOut(0, ea),
                      left: String(0) + ea,
                    }
                  },
                  {
                    style: {
                      position: "absolute",
                      top: String(barCircleTop) + ea,
                      right: String(-1 * barCircleRadius) + ea,
                      width: String(barCircleRadius * 2) + ea,
                      height: String(barCircleRadius * 2) + ea,
                      borderRadius: String(barCircleRadius + 1) + ea,
                      background: colorChip.white,
                      border: "1px solid " + colorChip.gray4,
                      cursor: "pointer",
                    }
                  }
                ]
              }
            ]
          },
        ]
      },
    ]
  });

  // 13 : margin
  createNode({
    mother: rightBox,
    style: {
      display: (media[2] || media[3]) ? "none" : "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio) + ea,
    }
  });

  // 14
  createNode({
    mother: rightBox,
    class: [ baseBlockClassName ],
    attribute: { baseclass: "furniture" },
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * 3) + ea,
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "가구",
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
          position: "absolute",
          top: String(barFactorTongVisualTop) + ea,
          left: String(leftGrayType2) + ea,
          width: withOut(leftGrayType2, ea),
          height: "auto",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: [
              "가구의 <b%재사용과 구매의 비율을 알려주세요!%b>",
              desktop ? "<u%* 재배치 = 기존 가구를 재사용 / 구매 = 새로운 가구를 구매%u>" : "<u%* 재배치 = 기존 가구 재사용 / 구매 = 새로 구매%u>",
            ].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              lineHeight: String(barDescriptionLingHeight),
              color: colorChip.black,
              top: String(barDescriptionTextTop) + ea,
            },
            bold: {
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionBoldWeight),
              color: colorChip.black
            },
            under: {
              fontSize: String(barDescriptionSubSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorExtended.mainBlue
            },
          },
          {
            mode: "aside",
            class: [ inputClassName ],
            attribute: {
              ratio: String(defaultRatio),
              value: furnitureValues[Math.round((furnitureValues.length - 1) * defaultRatio)].value,
              property: "furniture",
            },
            event: {
              click: barClickEvent(furnitureValues, "furniture"),
            },
            style: {
              display: "block",
              position: "relative",
              height: String(barTongHeight) + ea,
              cursor: "pointer",
              width: desktop ? withOut(0, ea) : withOut(-1 * leftGrayType2, ea),
              marginTop: String(barTongMarginTop) + ea,
              left: mobile ? String(-1 * leftGrayType2) + ea : "",
            },
            children: [
              {
                style: {
                  position: "absolute",
                  top: String(barTop) + ea,
                  height: String(barHeight) + ea,
                  borderRadius: String(barHeight + 1) + ea,
                  background: colorChip.gray3,
                  width: withOut(0, ea),
                  left: String(0) + ea,
                }
              },
              {
                text: furnitureValues[0].title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                }
              },
              {
                text: furnitureValues[1].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  left: String(barFactorB0Left) + ea,
                }
              },
              {
                text: furnitureValues[2].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  right: String(0) + ea,
                }
              },
              {
                class: [ variableBarClassName ],
                style: {
                  position: "absolute",
                  left: String(0) + ea,
                  top: String(0) + ea,
                  width: String(defaultRatio * 100) + '%',
                  height: String(100) + '%',
                  transition: "all 0.3s ease",
                },
                children: [
                  {
                    style: {
                      position: "absolute",
                      top: String(barTop) + ea,
                      height: String(barHeight) + ea,
                      borderRadius: String(barHeight + 1) + ea,
                      background: colorExtended.gradientBlue,
                      width: withOut(0, ea),
                      left: String(0) + ea,
                    }
                  },
                  {
                    style: {
                      position: "absolute",
                      top: String(barCircleTop) + ea,
                      right: String(-1 * barCircleRadius) + ea,
                      width: String(barCircleRadius * 2) + ea,
                      height: String(barCircleRadius * 2) + ea,
                      borderRadius: String(barCircleRadius + 1) + ea,
                      background: colorChip.white,
                      border: "1px solid " + colorChip.gray4,
                      cursor: "pointer",
                    }
                  }
                ]
              }
            ]
          },
        ]
      },
    ]
  });

  // 15 : margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio) + ea,
    }
  });

  */

  // 16
  createNode({
    mother: rightBox,
    class: [ baseBlockClassName ],
    attribute: { baseclass: "etc" },
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "요청 사항",
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
          top: String(desktop ? grayTextAreaTop : mobileGrayTextAreaTop) + ea,
          left: String(desktop ? leftGrayType2 : 0) + ea,
          width: desktop ? String(widthGrayType2) + ea : withOut(0, ea),
          height: String(grayBigHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "textarea",
        class: [ inputClassName ],
        attribute: {
          placeholder: (desktop ? [
            "스타일링, 예산, 시공 등의 요청 사항을 적어주세요!",
            "홈리에종은 스타일링 없이 시공만 하지 않습니다. 문의 전 고려해 주세요 :)",
            "(예시)",
            "=> 시공: 도배, 조명만 부분적으로 원해요.",
            "=> 스타일링: 가구, 패브릭, 소품은 전체 구매를 해야 해요.",
            "=> 예산: 최대 00만원 이내로 하고 싶어요.",
          ].join("\n") : [
            "스타일링, 예산, 시공 등의 요청 사항을 적어주세요!",
            "홈리에종은 스타일링 없이 시공만 하지 않습니다.",
            "문의 전 고려해 주세요 :)",
            "(예시)",
            "시공: 도배, 조명만 부분적으로 원해요.",
            "스타일링: 가구, 패브릭, 소품은 전체 구매를 해야 해요.",
            "예산: 최대 00만원 이내로 하고 싶어요.",
          ].join("\n")),
          property: "etc",
        },
        event: {
          focus: commentsFocusEvent,
          blur: commentsBlurEvent,
        },
        style: {
          position: "absolute",
          top: String((desktop ? grayTextAreaTop : mobileGrayTextAreaTop) + textareaTop) + ea,
          left: String((desktop ? leftGrayType2 : 0) + textareaLeft) + ea,
          width: desktop ? String(widthGrayType2 - (textareaLeft * 2)) + ea : withOut(textareaLeft * 2, ea),
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

  instance.mother.insertMemories([
    "name",
    "phone",
    "email",
    "address0",
    "address1",
    "pyeong",
    "living",
    "movein",
    "contract",
    // "budget",
    // "furniture",
    "etc",
  ], false).catch((err) => { console.log(err); });

  // policy and submit
  policyArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginTop: String(-1) + "px",
      background: colorChip.white,
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
          color: colorExtended.mainBlue,
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
          background: colorExtended.mainBlue,
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
          background: colorExtended.gradientGray,
          borderRadius: String(5) + "px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        children: [
          {
            text: "서비스 신청하기",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(submitSize) + ea,
              fontWeight: String(800),
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

ClientExplanationJs.prototype.finalSubmit = function () {
  const instance = this;
  const inputClassName = "inputClassName";
  const agreeTargetClassName = "agreeTargetClassName";
  const { ajaxJson, colorChip, colorExtended, findByAttribute, scrollTo, dateToString, sleep, selfHref, homeliaisonAnalytics, setQueue } = GeneralJs;
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

      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "submitLaunching",
        data: {
          date: dateToString(new Date(), true),
        },
      }).catch((err) => { console.log(err); });

      if (document.querySelector('.' + agreeTargetClassName).getAttribute("toggle") === "off") {
        window.alert("개인정보 취급 방침에 동의해주세요!");
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
              } else if (p === "pyeong") {
                firstDom.value = firstDom.value.replace(/[^0-9\.]/gi, '');
                if (firstDom.value.trim() === '' || Number.isNaN(Number(firstDom.value.trim())) || Number(firstDom.value.trim()) === 0) {
                  throw new Error("분양 평수를 알려주세요!");
                }
              } else if (p === "movein") {
                firstDom.value = firstDom.value.replace(/[^0-9\-]/gi, '').trim();
                if (!/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/gi.test(firstDom.value.trim())) {
                  throw new Error("입주 예정일을 알려주세요! (정해지지 않았을 경우, 예상되는 날짜를 찍어주세요!)");
                }
              } else if (p === "etc") {
                firstDom.value = firstDom.value.trim().replace(/[\=\+\&\>\<\/\\\{\}\[\]\`\-]/gi, '');
                if (firstDom.value.trim() === '') {
                  throw new Error("예시를 보시고 요청 사항을 최대한 자세하게 적어주세요!");
                }
                if (firstDom.value.length < 5) {
                  throw new Error("예시를 보시고 요청 사항을 최대한 자세하게 적어주세요!");
                }
              }

              tempObj.value = firstDom.value.replace(/[\=\+\&\>\<\/\\\{\}\[\]\`]/gi, '');

            } catch (e) {
              window.alert(e.message);
              boo = false;
              await homeliaisonAnalytics({
                page: instance.pageName,
                standard: instance.firstPageViewTime,
                action: "errorOccur",
                data: {
                  error: e.message,
                  date: dateToString(new Date(), true),
                },
              });
              scrollTo(window, firstDom, visualSpecific);
              firstDom.previousElementSibling.style.border = "1px solid " + colorExtended.mainBlue;
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
              const { cliid } = await ajaxJson({ map }, BACKHOST + "/clientSubmit");
              if (typeof window.gtag === "function" && typeof window.gadsConverting === "string") {
                window.gtag("event", "conversion", {
                  "send_to": window.gadsConverting,
                  "value": 1.0,
                  "currency": 'KRW'
                });
              }
              if (typeof window.kakaoPixel === "function" && typeof window.kakaoPixelHlId === "string") {
                window.kakaoPixel(window.kakaoPixelHlId).signUp();
              }
              homeliaisonAnalytics({
                page: instance.pageName,
                standard: instance.firstPageViewTime,
                action: "login",
                data: {
                  cliid,
                  date: dateToString(new Date(), true),
                },
              }).then(() => {
                document.body.removeChild(box);
                document.body.removeChild(back);
                selfHref(FRONTHOST + "/curation.php?cliid=" + cliid);
              }).catch((err) => {
                window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                window.location.reload();
              });
            } catch (e) {
              await ajaxJson({ message: "front clientConsulting.certificationBox : " + e.message }, BACKHOST + "/errorLog");
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          });
        }

      }

    } catch (e) {
      console.log(e);
      await homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "errorOccur",
        data: {
          error: e.message,
          date: dateToString(new Date(), true),
        },
      });
      window.location.reload();
    }
  }
}

ClientExplanationJs.prototype.insertFourthBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToLink, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    let minusLeft;
    let fourthBase;
    let colorTop;
    let basePaddingTop;
    let basePaddingBottom;
    let abc, designers;
    let thisBase;
    let designer;
    let checkCircleWidth;
    let thisCardBase;
    let cardWidth, cardHeight, cardBetween;
    let buttonCardWidth;
    let shadowForm;
    let cardLength;
    let keywords;
    let representative;
    let buttonArrowWdith;
    let designerProfileBase;
    let profileHeight;
    let designerCardGroupBetween;
    let designerCardGroupBetweenFirst;
    let nameTitleSize;
    let selectionBase;
    let buttonBoxMarginTop;
    let buttonWidth;
    let buttonHeight;
    let buttonTextTop;
    let buttonSize;
    let buttonWeight;
    let buttonBaseMarginTop;

    minusLeft = window.innerWidth - standardWidth + 1;

    colorTop = <%% 200, 200, 200, 200, 200 %%>;
    basePaddingTop = <%% 160, 160, 140, 110, 19 %%>;
    basePaddingBottom = <%% 200, 200, 170, 150, 24 %%>;

    checkCircleWidth = 13;

    cardLength = 5;

    cardHeight = 445;
    profileHeight = 250;
    cardBetween = 8;
    buttonCardWidth = 50;
    cardWidth = "calc(" + withOut((cardBetween * cardLength) + buttonCardWidth, ea) + " / " + String(cardLength) + ")";

    buttonArrowWdith = 14;

    designerCardGroupBetween = 70;
    designerCardGroupBetweenFirst = 50;

    nameTitleSize = 25;

    buttonBoxMarginTop = <%% 28, 26, 24, 20, 4 %%>;
    buttonWidth = <%% 110, 90, 80, 80, 15 %%>;
    buttonHeight = <%% 44, 38, 38, 36, 7.5 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    buttonSize = <%% 20, 17, 17, 16, 3.5 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;

    shadowForm = "0px 8px 20px -9px " + colorExtended.blueDim;

    fourthBase = createNode({
      mother: baseTong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(basePaddingTop) + ea,
        paddingBottom: String(basePaddingBottom) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.gradientBlue,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(0, ea),
        }
      }
    });

    this.insertConsultingBox(fourthBase);

  } catch (e) {
    console.log(e);
  }
}

ClientExplanationJs.prototype.resizeEvent = function () {
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

ClientExplanationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, dateToString, homeliaisonAnalytics, colorExtended, stringToLink, objectDeepCopy } = GeneralJs;
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true");
    const normalMode = (entireMode && getObj.normal === "true");

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "clientExplanation",
      client: null,
      base: {
        instance: this,
        binaryPath: ClientExplanationJs.binaryPath,
        subTitle: "",
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
          await instance.insertFourthBox();
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
          await GeneralJs.ajaxJson({ message: "ClientExplanationJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
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
    await GeneralJs.ajaxJson({ message: "ClientExplanationJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
