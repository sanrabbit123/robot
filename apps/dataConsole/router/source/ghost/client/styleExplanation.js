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
      firstBasePaddingTop = <%% 80, 48, 30, 28, 50 %%>;
      subTitleSize = <%% 19, 18, 17, 15, 3.6 %%>;
      firstBasePaddingBottom = <%% 240, 240, 160, 130, 210 %%>;
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
          background: colorExtended.darkDarkBlack,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * ((-1 * baseTop) + naviHeight), ea),
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
  const { firstFadeOutTargetClassName, secondBaseClassName } = this;
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

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 25, 25, 25, 25 %%>;
    titleSize = <%% 26, 26, 26, 26, 26 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;
    descriptionWeight = <%% 500, 500, 500, 500, 500 %%>;
    descriptionVisualLeft = <%% -1, -1, -1, -1, -1 %%>;

    betweenMargin = <%% 26, 26, 26, 26, 26 %%>;

    wordsMotherMarginTop = <%% 120, 120, 120, 120, 120 %%>;
    numbersAreaMarginTop = <%% 100, 100, 100, 100, 100 %%>;

    numberSize = <%% 28, 28, 28, 28, 28 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 28, 28, 28, 28 %%>;
    numberBarMarginLeft = <%% 12, 12, 12, 12, 12 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -1 %%>;

    serviceAreMarginTop = <%% 100, 100, 100, 100, 100 %%>;
    serviceAreMarginBottom = <%% 100, 100, 100, 100, 100 %%>;

    serviceNameBoxWidth = <%% 156, 156, 156, 156, 156 %%>;
    serviceNameBoxHeight = <%% 40, 40, 40, 40, 40 %%>;
    serviceNameSize = <%% 17, 17, 17, 17, 17 %%>;
    serviceNameWeight = <%% 800, 800, 800, 800, 800 %%>;
    serviceNameTop = <%% -0.5, -0.5, -0.5, -0.5, -0.5 %%>;

    circleWidth0 = <%% 8, 8, 8, 8, 8 %%>;
    circleWidth1 = <%% 6, 6, 6, 6, 6 %%>;
    circleWidth2 = <%% 4, 4, 4, 4, 4 %%>;
    circleBetween = <%% 6, 6, 6, 6, 6 %%>;

    circleGroupMarginTop = <%% 11, 11, 11, 11, 11 %%>;
    circleGroupMarginBottom = <%% 13, 13, 13, 13, 13 %%>;

    imageRatio = <%% 75, 75, 75, 75, 75 %%>;

    triangleZoneHeight = <%% 50, 50, 50, 50, 50 %%>;
    triangleWidth = <%% 12, 12, 12, 12, 12 %%>;

    serviceDescriptionHeight = <%% 98, 98, 98, 98, 98 %%>;
    serviceDescriptionSize = <%% 16, 16, 16, 16, 16 %%>;
    serviceDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    serviceDescriptionLineHeight = <%% 1.52, 1.52, 1.52, 1.52, 1.52 %%>;
    serviceDescriptionTextTop = <%% -1, -1, -1, -1, -1 %%>;

    plusSize = <%% 15, 15, 15, 15, 15 %%>;
    plusWeight = <%% 700, 700, 700, 700, 700 %%>;
    plusPaddingLeft = <%% 3, 3, 3, 3, 3 %%>;
    plusPaddingTop = <%% 0, 0, 0, 0, 0 %%>;
    plusPaddingBottom = <%% 2, 2, 2, 2, 2 %%>;
    plusBoxHeight = <%% 11, 11, 11, 11, 11 %%>;
    plusBoxMarginRight = <%% 4.5, 4.5, 4.5, 4.5, 4.5 %%>;

    checkCircleAreaHeight = <%% 80, 80, 80, 80, 80 %%>;
    checkCircleWidth = <%% 23, 23, 23, 23, 23 %%>;

    buttonMotherMarginBottom = <%% 140, 140, 140, 140, 140 %%>;
    buttonHeight = <%% 42, 42, 42, 42, 42 %%>;
    buttonWidth = <%% 120, 120, 120, 120, 120 %%>;
    buttonSize = <%% 17, 17, 17, 17, 17 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
    buttonTextTop = <%% -1, -1, -1, -1, -1 %%>;

    originalSecondBaseHeight = <%% 1398, 1398, 1398, 1398, 1398 %%>;

    textContent = [
      {
        title: "홈퍼니싱",
        description: [
          "시공 없이 스타일링만!",
          "가구 소품 패브릭 조명으로 진행",
        ],
        source: StyleExplanationJs.binaryPath + "/service_f.svg",
        plus: false,
        default: false,
        margin: false,
      },
      {
        title: "홈스타일링",
        description: [
          "부분 시공 (빌트인 제작 가구 포함)",
          "스타일링 (가구 소품 패브릭)",
        ],
        source: StyleExplanationJs.binaryPath + "/service_s.svg",
        plus: true,
        default: true,
        margin: true,
      },
      {
        title: "토탈 스타일링",
        description: [
          "전체 시공 (주방 혹은 화장실 설비 교체 포함)",
          "스타일링 (가구 소품 패브릭)",
        ],
        source: StyleExplanationJs.binaryPath + "/service_t.svg",
        plus: true,
        default: false,
        margin: false,
      },
    ];
    boxWidth = (standardWidth - (betweenMargin * (textContent.length - 1))) / textContent.length;

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
          },
        }
      }
    });

    selectionDomMaker = (secondBase, returnMode = false) => {
      wordsMother = createNode({
        mother: secondBase,
        class: [ firstFadeOutTargetClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: String(!returnMode ? wordsMotherMarginTop : numbersAreaMarginTop) + ea,
          opacity: String(0),
          transform: "translateY(30px)",
          animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              borderBottom: "1.5px solid " + colorExtended.blueDark,
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
                  color: colorExtended.white,
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  height: String(numberBarHeight) + ea,
                  width: String(0),
                  borderRight: "2px solid " + colorExtended.white,
                  transform: "rotate(25deg)",
                  marginLeft: String(numberBarMarginLeft) + ea,
                  marginRight: String(numberBarMarginLeft) + ea,
                  top: String(numberBarTop) + ea,
                }
              },
              {
                text: "6",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontFamily: "mont",
                  fontSize: String(numberSize) + ea,
                  fontWeight: String(numberWeight),
                  color: colorExtended.white,
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
              flexDirection: "column",
              marginTop: String(titleMarginTop) + ea,
            },
            children: [
              {
                text: "생각하는 서비스 유형을 선택해 주세요!",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorExtended.black,
                }
              },
              {
                text: "*스타일링 없는 단순 시공은 제공하지 않습니다.",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(descriptionSize) + ea,
                  fontWeight: String(descriptionWeight),
                  color: colorExtended.black,
                  marginTop: String(descriptionMarginTop) + ea,
                  left: String(descriptionVisualLeft) + ea,
                }
              },
            ]
          },
        ]
      });
      serviceMother = createNode({
        mother: secondBase,
        class: [ firstFadeOutTargetClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
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
          style: {
            display: "inline-flex",
            position: "relative",
            width: desktop ? String(boxWidth) + ea : withOut(0, ea),
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            opacity: String(target.default ? 1 : 0.5),
            marginLeft: (desktop && target.margin) ? String(betweenMargin) + ea : "",
            marginRight: (desktop && target.margin) ? String(betweenMargin) + ea : "",
          }
        });
  
        createNode({
          mother: serviceBase,
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
              src: target.source,
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
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(boxWidth) + ea,
            height: String(serviceDescriptionHeight) + ea,
            borderRadius: String(8) + "px",
            background: colorExtended.blueDark,
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 2px 12px -9px " + colorExtended.blueDim,
          },
          child: {
            text: target.description.join(target.plus ? "\n<b%+%b>" : "\n"),
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(serviceDescriptionSize) + ea,
              fontWeight: String(serviceDescriptionWeight),
              color: colorExtended.darkBlack,
              textAlign: "center",
              lineHeight: String(serviceDescriptionLineHeight),
              top: String(serviceDescriptionTextTop) + ea,
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
          event: {
            click: instance.firstConverting(),
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

StyleExplanationJs.prototype.insertThirdBox = async function (thirdBase) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { firstFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName, secondFadeOutTargetClassName } = this;
  try {
    const fadeOutTargets = [ ...document.querySelectorAll('.' + firstFadeOutTargetClassName) ];
    let minusLeft;
    let descriptionSize;
    let titleSize;
    let descriptionMarginTop;
    let betweenMargin;
    let checkCircleWidth;
    let buttonHeight;
    let ghostBase;
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
    let yesButtonWidth;
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
    let tempSecondHeight;

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 25, 25, 25, 25 %%>;
    titleSize = <%% 26, 26, 26, 26, 26 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;
    titleSquareWidth = <%% 8, 8, 8, 8, 8 %%>;
    titleSquareMarginRight = <%% 9, 9, 9, 9, 9 %%>;
    titleSquareTop = <%% 1, 1, 1, 1, 1 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;

    betweenMargin = <%% 26, 26, 26, 26, 26 %%>;
    checkCircleWidth = <%% 23, 23, 23, 23, 23 %%>;
    buttonHeight = <%% 42, 42, 42, 42, 42 %%>;

    wordsMotherMarginTop = <%% 120, 120, 120, 120, 120 %%>;

    numberSize = <%% 28, 28, 28, 28, 28 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 28, 28, 28, 28 %%>;
    numberBarMarginLeft = <%% 12, 12, 12, 12, 12 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -1 %%>;

    numbersAreaMarginTop = <%% 100, 100, 100, 100, 100 %%>;

    imageAreaMarginTop = <%% 70, 70, 70, 70, 70 %%>;
    imageAreaMarginBottom = <%% 110, 110, 110, 110, 110 %%>;
    imageWidth = <%% 510, 510, 510, 510, 510 %%>;

    yesButtonAreaMarginTop = <%% 50, 50, 50, 50, 50 %%>;
    yesButtonWidth = <%% 160, 160, 160, 160, 160 %%>;
    yesButtonHeight = <%% 40, 40, 40, 40, 40 %%>;
    yesButtonBetween = <%% 12, 12, 12, 12, 12 %%>;
    yesButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;
    yesButtonSize = <%% 16, 16, 16, 16, 16 %%>;
    yesButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    completeButtonWidth = <%% 120, 120, 120, 120, 120 %%>;
    completeButtonAreaMarginBottom = <%% 150, 150, 150, 150, 150 %%>;
    completeButtonSize = <%% 17, 17, 17, 17, 17 %%>;
    completeButtonWeight = <%% 700, 700, 700, 700, 700 %%>;
    completeButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;

    returnCircleWidth = <%% 34, 34, 34, 34, 34 %%>;
    returnCircleMarginRight = <%% 11, 11, 11, 11, 11 %%>;
    returnCicleArrowWidth = <%% 9, 9, 9, 9, 9 %%>;
    returnCicleArrowLeft = <%% -1.5, -1.5, -1.5, -1.5, -1.5 %%>;

    tempSecondHeight = <%% 1067.84, 1067.84, 1067.84, 1067.84, 1067.84 %%>;

    ghostBase = {};

    thirdBase.children[1].style.opacity = String(0);
    await instance.insertSecondBarBox(20);
    thirdBase.style.transition = "all 0.6 ease";
    thirdBase.style.height = String(tempSecondHeight) + ea;
    setQueue(() => {
      for (let dom of fadeOutTargets) {
        dom.remove();
      }
      ghostBase.style.position = "relative";
    }, 600);

    ghostBase = createNode({
      mother: thirdBase,
      class: [ ghostBaseClassName, secondFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "absolute",
        flexDirection: "column",
        top: String(0) + ea,
        paddingTop: String(0),
        width: withOut(0, ea),
        animation: "fadeinlite 0.6s ease forwards",
        opacity: String(0),
        transform: "translateX(20px)",
        alignItems: "center",
      }
    })

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: String(numbersAreaMarginTop) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: "1.5px solid " + colorExtended.blueDark,
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
              text: "6",
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
              text: "전체 공간을 철거하고 재시공을 원하시나요?",
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
    })

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(imageAreaMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          mode: "img",
          attribute: {
            src: StyleExplanationJs.binaryPath + "/construct.svg",
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(imageWidth) + ea,
          }
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: String(yesButtonAreaMarginTop) + ea,
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: "1.5px solid " + colorExtended.mainBlue,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: String(yesButtonBetween) + ea,
              },
              child: {
                text: "아니요",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: colorExtended.blueDark,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: "1.5px solid " + colorExtended.darkBlack,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                background: colorExtended.mainBlue,
                boxShadow: "0px 3px 15px -9px " + colorExtended.darkShadow,
              },
              child: {
                text: "예",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: colorExtended.darkBlack,
                }
              }
            },
          ]
        }
      ]
    })

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: String(buttonHeight) + ea,
        marginBottom: String(completeButtonAreaMarginBottom) + ea,
      },
      children: [
        {
          event: {
            click: instance.firstReturn(),
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
            border: "1.5px solid " + colorExtended.mainBlue,
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
            click: instance.secondConverting(),
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

StyleExplanationJs.prototype.insertFourthBox = async function (fourthBase) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { secondFadeOutTargetClassName, thirdFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName } = this;
  try {
    const fadeOutTargets = [ ...document.querySelectorAll('.' + secondFadeOutTargetClassName) ];
    let minusLeft;
    let descriptionSize;
    let titleSize;
    let descriptionMarginTop;
    let betweenMargin;
    let checkCircleWidth;
    let buttonHeight;
    let ghostBase;
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
    let blueBoxHeight;
    let middleLineMarginBottom;
    let middleLinePaddingTop;
    let blueDescriptionSize, blueDescriptionWeight, blueDescriptionBoldWeight, blueDescriptionTextTop;

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 25, 25, 25, 25 %%>;
    titleSize = <%% 26, 26, 26, 26, 26 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;
    titleSquareWidth = <%% 8, 8, 8, 8, 8 %%>;
    titleSquareMarginRight = <%% 9, 9, 9, 9, 9 %%>;
    titleSquareTop = <%% 1, 1, 1, 1, 1 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;

    betweenMargin = <%% 26, 26, 26, 26, 26 %%>;
    checkCircleWidth = <%% 23, 23, 23, 23, 23 %%>;
    buttonHeight = <%% 42, 42, 42, 42, 42 %%>;

    wordsMotherMarginTop = <%% 120, 120, 120, 120, 120 %%>;

    numberSize = <%% 28, 28, 28, 28, 28 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 28, 28, 28, 28 %%>;
    numberBarMarginLeft = <%% 12, 12, 12, 12, 12 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -1 %%>;

    numbersAreaMarginTop = <%% 100, 100, 100, 100, 100 %%>;

    imageAreaMarginTop = <%% 45, 45, 45, 45, 45 %%>;
    imageAreaMarginBottom = <%% 110, 110, 110, 110, 110 %%>;
    imageWidth = <%% 510, 510, 510, 510, 510 %%>;

    yesButtonAreaMarginTop = <%% 25, 25, 25, 25, 25 %%>;
    yesButtonWidth = <%% 160, 160, 160, 160, 160 %%>;
    yesButtonHeight = <%% 40, 40, 40, 40, 40 %%>;
    yesButtonBetween = <%% 12, 12, 12, 12, 12 %%>;
    yesButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;
    yesButtonSize = <%% 16, 16, 16, 16, 16 %%>;
    yesButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    completeButtonWidth = <%% 120, 120, 120, 120, 120 %%>;
    completeButtonAreaMarginBottom = <%% 129, 129, 129, 129, 129 %%>;
    completeButtonSize = <%% 17, 17, 17, 17, 17 %%>;
    completeButtonWeight = <%% 700, 700, 700, 700, 700 %%>;
    completeButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;

    returnCircleWidth = <%% 34, 34, 34, 34, 34 %%>;
    returnCircleMarginRight = <%% 11, 11, 11, 11, 11 %%>;
    returnCicleArrowWidth = <%% 9, 9, 9, 9, 9 %%>;
    returnCicleArrowLeft = <%% -1.5, -1.5, -1.5, -1.5, -1.5 %%>;

    middleLineMarginBottom = <%% 90, 90, 90, 90, 90 %%>;
    middleLinePaddingTop = <%% 80, 80, 80, 80, 80 %%>;

    blueBoxHeight = <%% 70, 70, 70, 70, 70 %%>;
    blueDescriptionSize = <%% 16, 16, 15, 15, 15 %%>;
    blueDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueDescriptionBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueDescriptionTextTop = <%% -1, -1, -1, -1, -1 %%>;

    constructItems = [
      {
        title: "철거",
      },
      {
        title: "보양",
      },
      {
        title: "목공",
      },
      {
        title: "전기",
      },
      {
        title: "타일",
      },
      {
        title: "바닥",
      },
      {
        title: "욕실",
      },
      {
        title: "주방",
      },
      {
        title: "필름",
      },
      {
        title: "도배",
      },
      {
        title: "도장",
      },
      {
        title: "중문",
      },
      {
        title: "발코니",
      },
      {
        title: "금속 샤시",
      },
      {
        title: "조명",
      },
      {
        title: "제작 가구",
      },
    ];
    statusItems = [
      {
        title: "거주 중이며 가구 있음",
      },
      {
        title: "거주 중이며 보관 이사 계획",
      },
      {
        title: "거주하지 않으며 공실 상태",
      },
    ];

    yesButtonWidth = (standardWidth - (yesButtonBetween * ((constructItems.length / 2) - 1))) / (constructItems.length / 2);
    yesButtonWidth2 = (standardWidth - (yesButtonBetween * ((statusItems.length / 1) - 1))) / (statusItems.length / 1);

    ghostBase = {};

    fourthBase.children[1].style.opacity = String(0);
    await instance.insertSecondBarBox(40);
    setQueue(() => {
      for (let dom of fadeOutTargets) {
        dom.remove();
      }
      ghostBase.style.position = "relative";
    }, 600);

    ghostBase = createNode({
      mother: fourthBase,
      class: [ ghostBaseClassName, thirdFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "absolute",
        flexDirection: "column",
        top: String(0) + ea,
        paddingTop: String(0),
        width: withOut(0, ea),
        animation: "fadeinlite 0.6s ease forwards",
        opacity: String(0),
        transform: "translateX(20px)",
        alignItems: "center",
      }
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: String(numbersAreaMarginTop) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: "1.5px solid " + colorExtended.blueDark,
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
              text: "6",
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
              text: "생각하시는 시공을 모두 체크해 주세요.",
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
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: "1.5px solid " + colorExtended.mainBlue,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: String(index % (constructItems.length / 2) === (constructItems.length / 2) - 1 ? 0 : yesButtonBetween) + ea,
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
                  color: colorExtended.blueDark,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
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
              text: "시공 당일의 주거 환경을 알려주세요.",
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
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(imageAreaMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
              text: "<b%*%b>거주 중일 경우, 먼지 확산과 시공 외 범위에 대한 관리가 어려워 홈리에종 시공사 이용이 어려울 수 있습니다.",
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
            }
          ]
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            marginTop: String(yesButtonAreaMarginTop) + ea,
          },
          children: statusItems.map((o, index) => {
            return {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth2) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: index === 2 ? "1.5px solid " + colorExtended.darkBlack : "1.5px solid " + colorExtended.mainBlue,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                background: index === 2 ? colorExtended.mainBlue : colorExtended.white,
                boxShadow: index === 2 ? "0px 3px 15px -9px " + colorExtended.darkShadow : "",
                marginRight: String(index % (statusItems.length / 1) === (statusItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea,
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
                  color: index === 2 ? colorExtended.darkBlack : colorExtended.blueDark,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: String(buttonHeight) + ea,
        marginBottom: String(completeButtonAreaMarginBottom) + ea,
      },
      children: [
        {
          event: {
            click: instance.firstReturn(),
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
            border: "1.5px solid " + colorExtended.mainBlue,
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
            click: instance.thirdConverting(),
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

StyleExplanationJs.prototype.insertFifthBox = async function (fourthBase) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { fourthFadeOutTargetClassName, thirdFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName } = this;
  try {
    const fadeOutTargets = [ ...document.querySelectorAll('.' + thirdFadeOutTargetClassName) ];
    let minusLeft;
    let descriptionSize;
    let titleSize;
    let descriptionMarginTop;
    let betweenMargin;
    let checkCircleWidth;
    let buttonHeight;
    let ghostBase;
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

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 25, 25, 25, 25 %%>;
    titleSize = <%% 26, 26, 26, 26, 26 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;
    titleSquareWidth = <%% 8, 8, 8, 8, 8 %%>;
    titleSquareMarginRight = <%% 9, 9, 9, 9, 9 %%>;
    titleSquareTop = <%% 1, 1, 1, 1, 1 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;

    betweenMargin = <%% 26, 26, 26, 26, 26 %%>;
    checkCircleWidth = <%% 23, 23, 23, 23, 23 %%>;
    buttonHeight = <%% 42, 42, 42, 42, 42 %%>;

    wordsMotherMarginTop = <%% 120, 120, 120, 120, 120 %%>;

    numberSize = <%% 28, 28, 28, 28, 28 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 28, 28, 28, 28 %%>;
    numberBarMarginLeft = <%% 12, 12, 12, 12, 12 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -1 %%>;

    numbersAreaMarginTop = <%% 100, 100, 100, 100, 100 %%>;

    imageAreaMarginTop = <%% 45, 45, 45, 45, 45 %%>;
    imageAreaMarginBottom = <%% 110, 110, 110, 110, 110 %%>;
    imageWidth = <%% 510, 510, 510, 510, 510 %%>;

    yesButtonAreaMarginTop = <%% 25, 25, 25, 25, 25 %%>;
    yesButtonWidth = <%% 160, 160, 160, 160, 160 %%>;
    yesButtonHeight = <%% 40, 40, 40, 40, 40 %%>;
    yesButtonBetween = <%% 12, 12, 12, 12, 12 %%>;
    yesButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;
    yesButtonSize = <%% 16, 16, 16, 16, 16 %%>;
    yesButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    completeButtonWidth = <%% 120, 120, 120, 120, 120 %%>;
    completeButtonAreaMarginBottom = <%% 129, 129, 129, 129, 129 %%>;
    completeButtonSize = <%% 17, 17, 17, 17, 17 %%>;
    completeButtonWeight = <%% 700, 700, 700, 700, 700 %%>;
    completeButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;

    returnCircleWidth = <%% 34, 34, 34, 34, 34 %%>;
    returnCircleMarginRight = <%% 11, 11, 11, 11, 11 %%>;
    returnCicleArrowWidth = <%% 9, 9, 9, 9, 9 %%>;
    returnCicleArrowLeft = <%% -1.5, -1.5, -1.5, -1.5, -1.5 %%>;

    middleLineMarginBottom = <%% 100, 100, 100, 100, 100 %%>;
    middleLinePaddingTop = <%% 80, 80, 80, 80, 80 %%>;

    blueBoxHeight = <%% 130, 130, 130, 130, 120 %%>;
    blueBoxHeight2 = <%% 70, 70, 70, 70, 70 %%>;
    blueDescriptionSize = <%% 16, 16, 15, 15, 15 %%>;
    blueDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueDescriptionBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueDescriptionTextTop = <%% -1, -1, -1, -1, -1 %%>;

    processBarHeight = <%% 24, 24, 24, 24, 24 %%>;
    defaultBudgetValue = <%% 5, 5, 5, 5, 5 %%>;
    blueWhiteFactorsAreaMarginTop = <%% 11, 11, 11, 11, 11 %%>;
    blueWhiteFactorLineWidth = <%% 352, 352, 352, 352, 352 %%>;
    blueWhiteFactorLineMarginRight = <%% 10, 10, 10, 10, 10 %%>;
    blueWhiteFactorWidth = <%% 180, 180, 180, 180, 180 %%>;
    blueWhiteFactorHeight = <%% 36, 36, 36, 36, 36 %%>;
    blueWhiteFactorTextTop = <%% -1, -1, -1, -1, -1 %%>;
    blueWhiteFactorSize = <%% 15, 15, 15, 15, 15 %%>;
    blueWhiteFactorWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueWhitePlusCircleWidth = <%% 22, 22, 22, 22, 22 %%>;
    blueWhitePlusCircleSize = <%% 20, 20, 20, 20, 20 %%>;
    blueWhitePlusCircleWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueWhitePlusCircleTextTop = <%% -1, -1, -1, -1, -1 %%>;
    blueWhitePlusCircleMargin = <%% 8, 8, 8, 8, 8 %%>;

    processValueSize = <%% 15, 15, 15, 15, 15 %%>;
    processValueWeight = <%% 700, 700, 700, 700, 700 %%>;

    convertingBaseHeight = <%% 1540, 1540, 1540, 1540, 1540 %%>;

    processValuesRatio = 99.4;

    constructItems = [
      { title: "500만원 이하", value: "500만원 이하" },
      { title: "1,000만원", value: "1,000만원" },
      { title: "1,500만원", value: "1,500만원" },
      { title: "2,000만원", value: "2,000만원" },
      { title: "3,000만원", value: "3,000만원" },
      { title: "4,000만원", value: "4,000만원" },
      { title: "5,000만원", value: "5,000만원 이상" },
      { title: "6,000만원", value: "6,000만원 이상" },
      { title: "7,000만원", value: "7,000만원 이상" },
      { title: "8,000만원", value: "8,000만원 이상" },
      { title: "9,000만원", value: "9,000만원 이상" },
      { title: "1억원 이상", value: "1억원 이상" },
    ]
    statusItems = [
      {
        title: "빌트인 제작 가구",
      },
      {
        title: "단순 붙박이장",
      },
      {
        title: "구매형 가구",
      },
    ];
    fabricItems = [
      {
        title: "커튼, 블라인드 등 외부 창문 패브릭",
      },
      {
        title: "제작 발주형 침구류 (쿠션, 이불, 베개 등)",
      },
      {
        title: "구매형 침구류, 카펫 등 패브릭",
      },
    ];

    yesButtonWidth = (standardWidth - (yesButtonBetween * ((statusItems.length / 1) - 1))) / (statusItems.length / 1);
    yesButtonWidthNoMargin = (standardWidth - (0 * ((constructItems.length / 1) - 1))) / (constructItems.length / 1);
    yesButtonWidth2 = (standardWidth - (yesButtonBetween * ((fabricItems.length / 1) - 1))) / (fabricItems.length / 1);

    ghostBase = {};

    fourthBase.children[1].style.opacity = String(0);
    await instance.insertSecondBarBox(56);
    fourthBase.style.transition = "all 0.6s ease";
    fourthBase.style.height = String(convertingBaseHeight) + ea;
    setQueue(() => {
      for (let dom of fadeOutTargets) {
        dom.remove();
      }
      ghostBase.style.position = "relative";
    }, 600);

    ghostBase = createNode({
      mother: fourthBase,
      class: [ ghostBaseClassName, fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "absolute",
        flexDirection: "column",
        top: String(0) + ea,
        paddingTop: String(0),
        width: withOut(0, ea),
        animation: "fadeinlite 0.6s ease forwards",
        opacity: String(0),
        transform: "translateX(20px)",
        alignItems: "center",
      }
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: String(numbersAreaMarginTop) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: "1.5px solid " + colorExtended.blueDark,
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
              text: "6",
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
              text: "인테리어 전체 가용 예산을 알려주세요.",
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
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(imageAreaMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
              text: "<b%*%b>홈리에종 인테리어 예산은 아래 세 가지를 포함합니다.",
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
                      color: colorExtended.mainBlue,
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
                      color: colorExtended.mainBlue,
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
                      color: colorExtended.mainBlue,
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
          children: constructItems.map((o, index) => {
            return [
              {
                attribute: {
                  index: String(index),
                },
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(yesButtonWidthNoMargin) + ea,
                  height: String(processBarHeight) + ea,
                  border: "1.5px solid " + colorExtended.mainBlue,
                  borderRight: (index === constructItems.length - 1 ? "1.5px solid " + colorExtended.mainBlue : ""),
                  borderLeft: (index === 0 ? "1.5px solid " + colorExtended.mainBlue : "1px dashed " + colorExtended.mainBlue),
                  boxSizing: "border-box",
                  borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderTopRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                  borderBottomRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                  background: colorExtended.white,
                },
                children: [
                  {
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: "1.5px solid " + colorExtended.darkBlack,
                      borderRight: (index === constructItems.length - 1 ? "1.5px solid " + colorExtended.darkBlack : ""),
                      borderLeft: (index === 0 ? "1.5px solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
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
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: "1.5px solid " + colorExtended.darkBlack,
                      borderRight: "1.5px solid " + colorExtended.darkBlack,
                      borderLeft: (index === 0 ? "1.5px solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
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
          }).flat()
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: String(processValuesRatio) + '%',
          },
          children: constructItems.map((o, index) => {
            return {
              style: {
                display: "inline-flex",
                position: "relative",
                width: "calc(100% / " + String(constructItems.length) + ")",
                height: String(yesButtonHeight) + ea,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
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
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
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
              text: "생각하는 가구 영역을 모두 체크해 주세요.",
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
                background: colorExtended.gradientBlue,
                opacity: String(0.7),
              }
            },
            {
              text: "<b%*%b>빌트인 제작 가구 :&nbsp;&nbsp;<u%싱크대 전체 교체, 거실 북카페, 전체 제작 책상 및 서재 연출 등%u>&nbsp;&nbsp;&nbsp;<b%/%b>&nbsp;&nbsp;&nbsp;단순 붙박이장 :&nbsp;&nbsp;<u%옷장, 신발장 등%u>",
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
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            marginTop: String(yesButtonAreaMarginTop) + ea,
          },
          children: statusItems.map((o, index) => {
            return {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: "1.5px solid " + colorExtended.mainBlue,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: String(index % (statusItems.length / 1) === (statusItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea,
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
                  color: colorExtended.blueDark,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
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
              text: "생각하는 패브릭 영역을 모두 체크해 주세요.",
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
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
          },
          children: fabricItems.map((o, index) => {
            return {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: "1.5px solid " + colorExtended.mainBlue,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: String(index % (fabricItems.length / 1) === (fabricItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea,
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
                  color: colorExtended.blueDark,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: String(buttonHeight) + ea,
        marginBottom: String(completeButtonAreaMarginBottom) + ea,
      },
      children: [
        {
          event: {
            click: instance.firstReturn(),
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
            border: "1.5px solid " + colorExtended.mainBlue,
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
            click: instance.fourthConverting(),
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

StyleExplanationJs.prototype.insertSixthBox = async function (fifthBase) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { fourthFadeOutTargetClassName, thirdFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName } = this;
  try {
    const fadeOutTargets = [ ...document.querySelectorAll('.' + fourthFadeOutTargetClassName) ];
    let minusLeft;
    let descriptionSize;
    let titleSize;
    let descriptionMarginTop;
    let betweenMargin;
    let checkCircleWidth;
    let buttonHeight;
    let ghostBase;
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
    let ageItems;
    let yesButtonWidth3;

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 25, 25, 25, 25 %%>;
    titleSize = <%% 26, 26, 26, 26, 26 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;
    titleSquareWidth = <%% 8, 8, 8, 8, 8 %%>;
    titleSquareMarginRight = <%% 9, 9, 9, 9, 9 %%>;
    titleSquareTop = <%% 1, 1, 1, 1, 1 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;

    betweenMargin = <%% 26, 26, 26, 26, 26 %%>;
    checkCircleWidth = <%% 23, 23, 23, 23, 23 %%>;
    buttonHeight = <%% 42, 42, 42, 42, 42 %%>;

    wordsMotherMarginTop = <%% 120, 120, 120, 120, 120 %%>;

    numberSize = <%% 28, 28, 28, 28, 28 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 28, 28, 28, 28 %%>;
    numberBarMarginLeft = <%% 12, 12, 12, 12, 12 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -1 %%>;

    numbersAreaMarginTop = <%% 100, 100, 100, 100, 100 %%>;

    imageAreaMarginTop = <%% 45, 45, 45, 45, 45 %%>;
    imageAreaMarginBottom = <%% 110, 110, 110, 110, 110 %%>;
    imageWidth = <%% 510, 510, 510, 510, 510 %%>;

    yesButtonAreaMarginTop = <%% 25, 25, 25, 25, 25 %%>;
    yesButtonWidth = <%% 160, 160, 160, 160, 160 %%>;
    yesButtonHeight = <%% 40, 40, 40, 40, 40 %%>;
    yesButtonBetween = <%% 12, 12, 12, 12, 12 %%>;
    yesButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;
    yesButtonSize = <%% 16, 16, 16, 16, 16 %%>;
    yesButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    completeButtonWidth = <%% 120, 120, 120, 120, 120 %%>;
    completeButtonAreaMarginBottom = <%% 129, 129, 129, 129, 129 %%>;
    completeButtonSize = <%% 17, 17, 17, 17, 17 %%>;
    completeButtonWeight = <%% 700, 700, 700, 700, 700 %%>;
    completeButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;

    returnCircleWidth = <%% 34, 34, 34, 34, 34 %%>;
    returnCircleMarginRight = <%% 11, 11, 11, 11, 11 %%>;
    returnCicleArrowWidth = <%% 9, 9, 9, 9, 9 %%>;
    returnCicleArrowLeft = <%% -1.5, -1.5, -1.5, -1.5, -1.5 %%>;

    middleLineMarginBottom = <%% 100, 100, 100, 100, 100 %%>;
    middleLinePaddingTop = <%% 80, 80, 80, 80, 80 %%>;

    blueBoxHeight = <%% 130, 130, 130, 130, 120 %%>;
    blueBoxHeight2 = <%% 70, 70, 70, 70, 70 %%>;
    blueDescriptionSize = <%% 16, 16, 15, 15, 15 %%>;
    blueDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueDescriptionBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueDescriptionTextTop = <%% -1, -1, -1, -1, -1 %%>;

    processBarHeight = <%% 24, 24, 24, 24, 24 %%>;
    defaultBudgetValue = <%% 2, 2, 2, 2, 2 %%>;
    blueWhiteFactorsAreaMarginTop = <%% 11, 11, 11, 11, 11 %%>;
    blueWhiteFactorLineWidth = <%% 352, 352, 352, 352, 352 %%>;
    blueWhiteFactorLineMarginRight = <%% 10, 10, 10, 10, 10 %%>;
    blueWhiteFactorWidth = <%% 180, 180, 180, 180, 180 %%>;
    blueWhiteFactorHeight = <%% 36, 36, 36, 36, 36 %%>;
    blueWhiteFactorTextTop = <%% -1, -1, -1, -1, -1 %%>;
    blueWhiteFactorSize = <%% 15, 15, 15, 15, 15 %%>;
    blueWhiteFactorWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueWhitePlusCircleWidth = <%% 22, 22, 22, 22, 22 %%>;
    blueWhitePlusCircleSize = <%% 20, 20, 20, 20, 20 %%>;
    blueWhitePlusCircleWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueWhitePlusCircleTextTop = <%% -1, -1, -1, -1, -1 %%>;
    blueWhitePlusCircleMargin = <%% 8, 8, 8, 8, 8 %%>;

    processValueSize = <%% 15, 15, 15, 15, 15 %%>;
    processValueWeight = <%% 700, 700, 700, 700, 700 %%>;

    convertingBaseHeight = <%% 1808, 1808, 1808, 1808, 1808 %%>;

    processValuesRatio = 99.4;

    constructItems = [
      { title: "미정 / 거주중" },
      { title: "1개월 이내" },
      { title: "2개월 이내" },
      { title: "3개월 이내" },
      { title: "4개월 이내" },
      { title: "5개월 이내" },
      { title: "6개월 이내" },
      { title: "1년 이내" },
      { title: "1년 이상" },
    ]
    statusItems = [
      {
        title: "기존 가구 재배치",
      },
      {
        title: "일부 신규 구매",
      },
      {
        title: "전체 신규 구매",
      },
    ];
    fabricItems = [
      {
        title: "1인 가구",
      },
      {
        title: "부부 (자녀 없음)",
      },
      {
        title: "부부 + 유아기 자녀",
      },
      {
        title: "부부 + 학령기 자녀",
      },
      {
        title: "기타",
      },
    ];
    ageItems = [
      {
        title: "29세 이하",
      },
      {
        title: "30세 - 39세",
      },
      {
        title: "40세 - 49세",
      },
      {
        title: "50세 - 59세",
      },
      {
        title: "60세 이상",
      },
    ];

    yesButtonWidth = (standardWidth - (yesButtonBetween * ((statusItems.length / 1) - 1))) / (statusItems.length / 1);
    yesButtonWidthNoMargin = (standardWidth - (0 * ((constructItems.length / 1) - 1))) / (constructItems.length / 1);
    yesButtonWidth2 = (standardWidth - (yesButtonBetween * ((fabricItems.length / 1) - 1))) / (fabricItems.length / 1);
    yesButtonWidth3 = (standardWidth - (yesButtonBetween * ((ageItems.length / 1) - 1))) / (ageItems.length / 1);

    ghostBase = {};

    fifthBase.children[1].style.opacity = String(0);
    await instance.insertSecondBarBox(68);
    fifthBase.style.transition = "all 0.6s ease";
    fifthBase.style.height = String(convertingBaseHeight) + ea;
    setQueue(() => {
      for (let dom of fadeOutTargets) {
        dom.remove();
      }
      ghostBase.style.position = "relative";
    }, 600);

    ghostBase = createNode({
      mother: fifthBase,
      class: [ ghostBaseClassName ],
      style: {
        display: "flex",
        position: "absolute",
        flexDirection: "column",
        top: String(0) + ea,
        paddingTop: String(0),
        width: withOut(0, ea),
        animation: "fadeinlite 0.6s ease forwards",
        opacity: String(0),
        transform: "translateX(20px)",
        alignItems: "center",
      }
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: String(numbersAreaMarginTop) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: "1.5px solid " + colorExtended.blueDark,
          },
          children: [
            {
              text: "5",
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
              text: "6",
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
              text: "입주 예정 시기를 알려주세요.",
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
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(imageAreaMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
          },
          children: constructItems.map((o, index) => {
            return [
              {
                attribute: {
                  index: String(index),
                },
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(yesButtonWidthNoMargin) + ea,
                  height: String(processBarHeight) + ea,
                  border: "1.5px solid " + colorExtended.mainBlue,
                  borderRight: (index === constructItems.length - 1 ? "1.5px solid " + colorExtended.mainBlue : ""),
                  borderLeft: (index === 0 ? "1.5px solid " + colorExtended.mainBlue : "1px dashed " + colorExtended.mainBlue),
                  boxSizing: "border-box",
                  borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderTopRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                  borderBottomRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                  background: colorExtended.white,
                },
                children: [
                  {
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: "1.5px solid " + colorExtended.darkBlack,
                      borderRight: (index === constructItems.length - 1 ? "1.5px solid " + colorExtended.darkBlack : ""),
                      borderLeft: (index === 0 ? "1.5px solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
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
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: "1.5px solid " + colorExtended.darkBlack,
                      borderRight: "1.5px solid " + colorExtended.darkBlack,
                      borderLeft: (index === 0 ? "1.5px solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
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
          }).flat()
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: String(processValuesRatio) + '%',
          },
          children: constructItems.map((o, index) => {
            return {
              style: {
                display: "inline-flex",
                position: "relative",
                width: "calc(100% / " + String(constructItems.length) + ")",
                height: String(yesButtonHeight) + ea,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
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
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
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
              text: "가구 구매 정도를 알려주세요.",
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
                background: colorExtended.gradientBlue,
                opacity: String(0.7),
              }
            },
            {
              text: "<b%*%b>기존 가구 재배치 :&nbsp;&nbsp;<u%가구의 새로운 구매 없이 기존 가구 그대로 사용%u>",
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
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            marginTop: String(yesButtonAreaMarginTop) + ea,
          },
          children: statusItems.map((o, index) => {
            return {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: "1.5px solid " + colorExtended.mainBlue,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: String(index % (statusItems.length / 1) === (statusItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea,
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
                  color: colorExtended.blueDark,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
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
              text: "해당 가족 구성원을 체크해 주세요!",
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
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
          },
          children: fabricItems.map((o, index) => {
            return {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth2) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: "1.5px solid " + colorExtended.mainBlue,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: String(index % (fabricItems.length / 1) === (fabricItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea,
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
                  color: colorExtended.blueDark,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
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
              text: "고객님의 연령대를 체크해 주세요!",
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
                opacity: String(0.7),
              }
            },
            {
              text: "<b%*%b>고객님의 연령대에 맞는 경험과 노하우의 디자이너를 추천해 드려요!",
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
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            marginTop: String(yesButtonAreaMarginTop) + ea,
          },
          children: ageItems.map((o, index) => {
            return {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth3) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: "1.5px solid " + colorExtended.mainBlue,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: String(index % (ageItems.length / 1) === (ageItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea,
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
                  color: colorExtended.blueDark,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: String(buttonHeight) + ea,
        marginBottom: String(completeButtonAreaMarginBottom) + ea,
      },
      children: [
        {
          event: {
            click: instance.firstReturn(),
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
            border: "1.5px solid " + colorExtended.mainBlue,
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
            click: instance.secondConverting(),
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

StyleExplanationJs.prototype.firstConverting = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
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

      blackScrollTop = <%% -642, -642, -642, -642, -642 %%>;
      numbersAreaMarginTop = <%% 100, 100, 100, 100, 100 %%>;

      blackTarget.style.transition = "all 0.6s ease";
      scrollTo(window, 0, 0, true);

      if (blackTarget.style.marginTop.replace(/[^0-9\-]/gi, '') === String(blackScrollTop)) {
        setQueue(() => {
          for (let dom of fadeOutTargets) {
            dom.style.animation = "fadeoutlite 0.6s ease forwards";
          }
          setQueue(() => {
            instance.insertThirdBox(document.querySelector('.' + secondBaseClassName)).catch((err) => {
              console.log(err);
            });
          }, 450);
        }, 0);
      } else {
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

StyleExplanationJs.prototype.secondConverting = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, secondFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName } = this;
  return async function (e) {
    try {
      const fadeOutTargets = [ ...document.querySelectorAll('.' + secondFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = <%% -642, -642, -642, -642, -642 %%>;
      numbersAreaMarginTop = <%% 100, 100, 100, 100, 100 %%>;

      scrollTo(window, 0, 0);

      setQueue(() => {
        for (let dom of fadeOutTargets) {
          dom.style.animation = "fadeoutlite 0.6s ease forwards";
        }
        setQueue(() => {
          instance.insertFourthBox(document.querySelector('.' + secondBaseClassName)).catch((err) => {
            console.log(err);
          });
        }, 450);
      }, 0);
    } catch (e) {
      console.log(e);
    }
  }
}

StyleExplanationJs.prototype.thirdConverting = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, thirdFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName } = this;
  return async function (e) {
    try {
      const fadeOutTargets = [ ...document.querySelectorAll('.' + thirdFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = <%% -642, -642, -642, -642, -642 %%>;
      numbersAreaMarginTop = <%% 100, 100, 100, 100, 100 %%>;

      scrollTo(window, 0, 0);

      setQueue(() => {
        for (let dom of fadeOutTargets) {
          dom.style.animation = "fadeoutlite 0.6s ease forwards";
        }
        setQueue(() => {
          instance.insertFifthBox(document.querySelector('.' + secondBaseClassName)).catch((err) => {
            console.log(err);
          });
        }, 450);
      }, 0);
    } catch (e) {
      console.log(e);
    }
  }
}

StyleExplanationJs.prototype.fourthConverting = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, fourthFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName } = this;
  return async function (e) {
    try {
      const fadeOutTargets = [ ...document.querySelectorAll('.' + fourthFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = <%% -642, -642, -642, -642, -642 %%>;
      numbersAreaMarginTop = <%% 100, 100, 100, 100, 100 %%>;

      scrollTo(window, 0, 0);

      setQueue(() => {
        for (let dom of fadeOutTargets) {
          dom.style.animation = "fadeoutlite 0.6s ease forwards";
        }
        setQueue(() => {
          instance.insertSixthBox(document.querySelector('.' + secondBaseClassName)).catch((err) => {
            console.log(err);
          });
        }, 450);
      }, 0);
    } catch (e) {
      console.log(e);
    }
  }
}

StyleExplanationJs.prototype.insertBarBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
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

    radius = <%% 5, 5, 5, 5, 5 %%>;

    x = <%% 2, 2, 2, 2, 2 %%>;
    y = <%% 5, 5, 5, 5, 5 %%>;
    z = <%% 8, 8, 8, 8, 8 %%>;

    barAreaHeight = <%% 270, 270, 270, 270, 270 %%>;
    flagWidth = <%% 23, 23, 23, 23, 23 %%>;
    flagRight = <%% -19, -19, -19, -19, -19 %%>;
    flagTop = <%% -34, -34, -34, -34, -34 %%>;

    commentAreaTop = <%% -52, -52, -52, -52, -52 %%>;
    commentAreaLeft = <%% 2, 2, 2, 2, 2 %%>;
    commentAreaWidth = <%% 286, 286, 286, 286, 286 %%>;
    commentAreaHeight = <%% 32, 32, 32, 32, 32 %%>;

    commentTriangleWidth = <%% 8, 8, 8, 8, 8 %%>;

    commentSize = <%% 14, 14, 14, 14, 14 %%>;
    commentWeight = <%% 700, 700, 700, 700, 700 %%>;
    commentTextTop = <%% -1, -1, -1, -1, -1 %%>;

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
        borderBottom: String(radius) + "px dotted " + colorExtended.black,
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(-1 * z) + ea,
            left: String(-1 * z) + ea,
            width: String(radius + (z * 2)) + ea,
            height: String(radius + (z * 2)) + ea,
            borderRadius: String(radius + (z * 2)) + ea,
            background: colorExtended.white,
            opacity: String(0.2),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(-1 * y) + ea,
            left: String(-1 * y) + ea,
            width: String(radius + (y * 2)) + ea,
            height: String(radius + (y * 2)) + ea,
            borderRadius: String(radius + (y * 2)) + ea,
            background: colorExtended.white,
            opacity: String(0.6),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(-1 * x) + ea,
            left: String(-1 * x) + ea,
            width: String(radius + (x * 2)) + ea,
            height: String(radius + (x * 2)) + ea,
            borderRadius: String(radius + (x * 2)) + ea,
            background: colorExtended.white,
            opacity: String(1),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(0) + ea,
            left: String(0) + ea,
            width: String(radius) + ea,
            height: String(radius) + ea,
            borderRadius: String(radius) + ea,
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
                text: "답변을 분석해 정확한 서비스를 제공해드릴게요!",
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

StyleExplanationJs.prototype.insertSecondBarBox = async function (ratio = 20) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { secondBarBoxMotherClassName } = this;
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

    radius = <%% 5, 5, 5, 5, 5 %%>;

    x = <%% 2, 2, 2, 2, 2 %%>;
    y = <%% 5, 5, 5, 5, 5 %%>;
    z = <%% 8, 8, 8, 8, 8 %%>;

    barAreaHeight = <%% 270, 270, 270, 270, 270 %%>;
    flagWidth = <%% 23, 23, 23, 23, 23 %%>;
    flagRight = <%% -19, -19, -19, -19, -19 %%>;
    flagTop = <%% -34, -34, -34, -34, -34 %%>;

    commentAreaTop = <%% -52, -52, -52, -52, -52 %%>;
    commentAreaLeft = <%% 2, 2, 2, 2, 2 %%>;
    commentAreaWidth = <%% 286, 286, 286, 286, 286 %%>;
    commentAreaHeight = <%% 32, 32, 32, 32, 32 %%>;

    commentTriangleWidth = <%% 8, 8, 8, 8, 8 %%>;

    commentSize = <%% 14, 14, 14, 14, 14 %%>;
    commentWeight = <%% 700, 700, 700, 700, 700 %%>;
    commentTextTop = <%% -1, -1, -1, -1, -1 %%>;

    minusLeft = window.innerWidth - standardWidth + 1;

    if (document.querySelector('.' + secondBarBoxMotherClassName) === null) {
      document.querySelector('.' + instance.firstBarTargetClassName).remove();
      thirdBase = createNode({
        mother: baseTong,
        class: [ secondBarBoxMotherClassName ],
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
          },
          next: {
            style: {
              position: "absolute",
              top: String(0),
              left: String(-1 * minusLeft) + ea,
              background: colorExtended.gradientBlue,
              width: withOut(-1 * (minusLeft * 2), ea),
              height: withOut(0, ea),
              opacity: String(0),
              animation: "justfadeinoriginal 0.4s ease forwards",
            },
          }
        }
      });
    } else {
      removeByClass(secondBarBoxMotherClassName);
      thirdBase = createNode({
        mother: baseTong,
        class: [ secondBarBoxMotherClassName ],
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
            },
          }
        }
      });
    }

    createNode({
      mother: thirdBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(0),
        borderBottom: String(radius) + "px dotted " + colorExtended.black,
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            height: String(0),
            zIndex: String(1),
            width: String(ratio) + "%",
            borderBottom: String(radius) + "px dotted " + colorExtended.white,
          }
        },
        {
          style: {
            position: "absolute",
            top: String(0),
            left: String(radius / 2) + ea,
            height: String(0),
            zIndex: String(1),
            width: "calc(" + String(ratio) + "%" + " - " + String(radius * 1) + ea + ")",
            borderBottom: String(radius) + "px solid " + colorExtended.white,
          }
        },
        {
          style: {
            position: "absolute",
            top: String(-1 * z) + ea,
            left: "calc(" + String(ratio) + "% + " + String(-1 * z) + ea + ")",
            width: String(radius + (z * 2)) + ea,
            height: String(radius + (z * 2)) + ea,
            borderRadius: String(radius + (z * 2)) + ea,
            background: colorExtended.white,
            opacity: String(0.2),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(-1 * y) + ea,
            left: "calc(" + String(ratio) + "% + " + String(-1 * y) + ea + ")",
            width: String(radius + (y * 2)) + ea,
            height: String(radius + (y * 2)) + ea,
            borderRadius: String(radius + (y * 2)) + ea,
            background: colorExtended.white,
            opacity: String(0.6),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(-1 * x) + ea,
            left: "calc(" + String(ratio) + "% + " + String(-1 * x) + ea + ")",
            width: String(radius + (x * 2)) + ea,
            height: String(radius + (x * 2)) + ea,
            borderRadius: String(radius + (x * 2)) + ea,
            background: colorExtended.white,
            opacity: String(1),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(0) + ea,
            left: "calc(" + String(ratio) + "% + " + String(0) + ea + ")",
            width: String(radius) + ea,
            height: String(radius) + ea,
            borderRadius: String(radius) + ea,
            background: colorExtended.blueDim,
          }
        },
        {
          mode: "svg",
          source: svgMaker.goalFlag(colorExtended.white, colorExtended.blueDark),
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
            left: "calc(" + String(ratio) + "% + " + String(commentAreaLeft) + ea + ")",
            width: String(commentAreaWidth) + ea,
            height: String(commentAreaHeight) + ea,
            borderRadius: String(8) + "px",
            background: colorExtended.blueDark,
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
                source: svgMaker.commentTriangle("verticalLeft", colorExtended.blueDark),
                style: {
                  position: "absolute",
                  width: String(commentTriangleWidth) + ea,
                  bottom: String(-1 * commentTriangleWidth) + ea,
                  left: String(0),
                }
              },
              {
                text: "답변을 분석해 정확한 서비스를 제공해드릴게요!",
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

StyleExplanationJs.prototype.firstReturn = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, firstFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName, ghostBaseClassName, secondBarBoxMotherClassName } = this;
  return async function (e) {
    try {
      document.querySelector('.' + ghostBaseClassName).remove();
      instance.selectionDomMaker(document.querySelector('.' + secondBaseClassName), true);
      document.querySelector('.' + secondBaseClassName).children[1].style.opacity = String(1);
      removeByClass(secondBarBoxMotherClassName);
      await instance.insertBarBox();
    } catch (e) {
      console.log(e);
    }
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
    this.initAreaClassName = "initAreaClassName";
    this.firstFadeOutTargetClassName = "firstFadeOutTargetClassName";
    this.secondBaseClassName = "secondBaseClassName";
    this.firstBarTargetClassName = "firstBarTargetClassName";
    this.secondBarBoxMotherClassName = "secondBarBoxMotherClassName";
    this.ghostBaseClassName = "ghostBaseClassName";
    this.secondFadeOutTargetClassName = "secondFadeOutTargetClassName";
    this.thirdFadeOutTargetClassName = "thirdFadeOutTargetClassName";
    this.fourthFadeOutTargetClassName = "fourthFadeOutTargetClassName";

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
          const secondBase = await instance.insertSecondBox();
          await instance.insertBarBox();









          // GeneralJs.setQueue(() => {
          //   const fadeOutTargets = [ ...document.querySelectorAll('.' + instance.firstFadeOutTargetClassName) ];
          //   for (let dom of fadeOutTargets) {
          //     dom.remove();
          //   }
          // }, 0);
          // document.querySelector('.' + instance.initAreaClassName).style.marginTop = String(-642) + "px";
          // await instance.insertSixthBox(secondBase);














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
