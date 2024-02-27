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
      "return ('홈리에종 디자이너 신청 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 디자이너 신청 설명 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "designerExplanation",
  "hangul": "디자이너 신청",
  "route": [
    "designerExplanation"
  ]
} %/%/g

const DesignerExplanationJs = function () {
  this.mother = new GeneralJs();
}

DesignerExplanationJs.binaryPath = "/middle/proposal";

DesignerExplanationJs.prototype.insertInitBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const submitBlockClassName = "submitBlockClassName";
  try {
    let minusLeft;
    let firstBase;
    let leftRightWidth;
    let firstBasePaddingBottom;
    let blueTop;
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

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    firstBasePaddingTop = <%% 24, 24, 24, 24, 8 %%>;
    firstBasePaddingBottom = <%% 170, 170, 160, 120, 20 %%>;
    blueTop = <%% 200, 200, 200, 200, 28 %%>;

    subTitleSize = <%% 19, 18, 17, 15, 3.6 %%>;
    subTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
    subTitleMarginTop = <%% 6, 6, 6, 6, 2.2 %%>;

    buttonMarginTop = <%% 146, 4, 24, 20, 3.6 %%>;
    buttonWidth = <%% 190, 145, 140, 130, 31 %%>;
    buttonHeight = <%% 32, 32, 32, 40, 9 %%>;
    buttonSize = <%% 14, 14, 14, 14, 3.5 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;

    titleSize = <%% 61, 50, 48, 40, 9 %%>;
    titleWeight = <%% 500, 500, 500, 500, 500 %%>;
    titleVisualTop = <%% -2, -2, -2, -2, -0.5 %%>;
    titleVisualLeft = <%% -2, -2, -2, -2, -0.5 %%>;
    titleLineHeight = <%% 1.11, 1.11, 1.11, 1.11, 1.07 %%>;

    descriptionSize = 15;
    descriptionLineHeight = 1.8;

    mobileLeftPaddingVisual = 0.8;

    descriptionMarginTop = 40;

    mainIllust = <%% DesignerExplanationJs.binaryPath + "/mainIllust0.png", DesignerExplanationJs.binaryPath + "/mainIllust0.png", DesignerExplanationJs.binaryPath + "/mainIllust1.png", DesignerExplanationJs.binaryPath + "/mainIllust1.png", DesignerExplanationJs.binaryPath + "/mainIllust2.png" %%>;

    descriptionContents = [
      "고객님게 <b%오프라인 홈스타일링 basic 서비스%b>와 그에 맞는 디자이너를 제안드립니다.",
      "선택된 디자이너는 고객님의 예산을 현장 조건에 맞게 적절히 분배하여 스타일링을 진행합니다.",
    ];

    if (media[0] && window.innerHeight > 1100) {
      firstBasePaddingTop = 60;
      subTitleSize = 19;
      firstBasePaddingBottom = 230;
    }

    this.totalContents = document.getElementById("totalcontents");
    this.totalContents.style.overflow = "hidden";
    this.totalContents.style.background = colorExtended.gray5;
    document.body.style.background = colorExtended.gray5;

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
          top: desktop ? String((-1 * blueTop) + naviHeight) + ea : "calc(calc(" + String(naviHeight) + "px" + ") - " + String(blueTop) + ea + ")",
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.white,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: desktop ? withOut(1 * ((-1 * blueTop) + naviHeight), ea) : String(185) + ea,
        }
      }
    });
  
    // main title
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "start",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        paddingLeft: mobile ? String(mobileLeftPaddingVisual) + ea : "",
      },
      children: [
        {
          text: (desktop ? "Designer selection<b%.%b>" : "Designer\nselection<b%.%b>"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.mainBlue,
            fontFamily: "mont",
            top: String(titleVisualTop) + ea,
            left: String(titleVisualLeft) + ea,
            lineHeight: String(titleLineHeight),
          },
          bold: {
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.mainBlue,
            fontFamily: "mont",
            opacity: String(0.4),
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
        justifyContent: "start",
        alignItems: "start",
        marginTop: String(subTitleMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        paddingLeft: mobile ? String(mobileLeftPaddingVisual) + ea : "",
      },
      children: [
        {
          text: "홈리에종 디자이너 추천",
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
        right: String(0),
        top: String(30) + ea,
        height: String(404) + ea,
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
        justifyContent: "start",
        alignItems: "start",
        marginTop: String(descriptionMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.5s ease 0s 1 normal forwards running fadeupdelay2",
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
            padding: String(8) + ea,
            paddingTop: String(2) + ea,
            paddingBottom: String(4) + ea,
            "border-radius": String(5) + "px",
            margin: String(2) + ea,
          }
        }
      ]
    })

    // black buttons
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
            text: "예상 시작일&nbsp;&nbsp;|&nbsp;&nbsp;<b%24년 1월 17일%b>",
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(buttonSize) + ea,
              fontWeight: String(300),
              color: colorExtended.white,
            },
            bold: {
              fontSize: String(buttonSize) + ea,
              fontWeight: String(700),
              color: colorExtended.white,
            }
          }
        },
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
            marginLeft: String(8) + ea,
          },
          child: {
            attribute: {
              selectstart: (e) => { e.preventDefault() },
            },
            text: "예상 종료일&nbsp;&nbsp;|&nbsp;&nbsp;<b%24년 1월 17일%b>",
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(buttonSize) + ea,
              fontWeight: String(300),
              color: colorExtended.white,
            },
            bold: {
              fontSize: String(buttonSize) + ea,
              fontWeight: String(700),
              color: colorExtended.white,
            }
          }
        },
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

DesignerExplanationJs.prototype.insertSecondBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
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

    mainHeight = <%% 440, 390, 370, 280, 136 %%>;
    minusLeft = window.innerWidth - standardWidth + 1;

    colorTop = <%% 200, 200, 200, 200, 200 %%>;

    titleSize = 23;
    descriptionSize = 16;
    descriptionMarginTop = 8;

    checkCircleWidth = 21;

    visualTop = 24;

    boxWidth = 290;
    boxHeight = 228;

    betweenMargin = 152;

    totalHeight = 344;

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

    secondBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        flexDirection: "column",
        height: String(totalHeight) + ea,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.blueWhiteBack,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * ((-1 * colorTop) + naviHeight), ea),
        }
      }
    });

    createServiceBlock = (index) => {
      serviceBase = createNode({
        mother: secondBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(boxWidth) + ea,
          height: String(boxHeight) + ea,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          top: String(visualTop) + ea,
          opacity: textContent[index].focus ? String(1) : String(0.4),
          marginLeft: textContent[index].margin ? String(betweenMargin) + ea : "",
          marginRight: textContent[index].margin ? String(betweenMargin) + ea : "",
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
          left: String(0),
        }
      });
      createNode({
        mother: serviceBase,
        text: textContent[index].title,
        style: {
          display: "flex",
          position: "relative",
          fontFamily: "gmarket",
          fontSize: String(titleSize) + ea,
          fontWeight: String(700),
          color: colorExtended.black,
        }
      });
      createNode({
        mother: serviceBase,
        text: textContent[index].description[0],
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
        text: textContent[index].description[1],
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
          background: textContent[index].focus ? colorExtended.focusBlue : colorExtended.white,
          borderRadius: String(checkCircleWidth) + ea,
          marginTop: String(16) + ea,
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

    for (let i = 0; i < textContent.length; i++) {
      createServiceBlock(i);
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerExplanationJs.prototype.insertThirdBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    let minusLeft;
    let thirdBase;
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

    minusLeft = window.innerWidth - standardWidth + 1;

    colorTop = <%% 200, 200, 200, 200, 200 %%>;
    basePaddingTop = <%% 150, 150, 160, 140, 21 %%>;
    basePaddingBottom = <%% 200, 200, 190, 170, 24 %%>;

    checkCircleWidth = 13;

    cardLength = 5;

    cardHeight = 420;
    cardBetween = 8;
    buttonCardWidth = 54;
    cardWidth = "calc(" + withOut((cardBetween * cardLength) + buttonCardWidth, ea) + " / " + String(cardLength) + ")";

    shadowForm = "0px 8px 18px -9px " + colorExtended.darkShadow;

    abc = this.abc;
    designers = this.designers;

    thirdBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        flexDirection: "column",
        paddingTop: String(basePaddingTop) + ea,
        paddingBottom: String(basePaddingBottom) + ea,
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column",
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.blueDark,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * ((-1 * colorTop) + naviHeight), ea),
        }
      }
    });
    createNode({
      mother: thirdBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        width: withOut(0, ea),
        flexDirection: "column",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            left: String(0),
            width: withOut(0, ea),
            borderBottom: "1px dashed " + colorExtended.white,
            opacity: String(0.5),
            top: String(18) + ea,
          }
        },
        {
          text: "designers",
          style: {
            display: "inline-flex",
            position: "relative",
            fontSize: String(30) + ea,
            fontWeight: String(700),
            color: colorExtended.white,
            fontFamily: "mont",
            background: colorExtended.blueDark,
            paddingLeft: String(16) + ea,
            paddingRight: String(16) + ea,
          }
        },
      ]
    })

    for (let i = 0; i < designers.length; i++) {

      designer = designers[i];

      thisBase = createNode({
        mother: thirdBase,
        style: {
          display: "flex",
          position: "relative",
          justifyContent: "start",
          alignItems: "start",
          width: withOut(0, ea),
          flexDirection: "column",
          paddingBottom: String(6) + ea,
        }
      });

      createNode({
        mother: thisBase,
        style: {
          display: "flex",
          position: "relative",
          justifyContent: "start",
          alignItems: "center",
          width: withOut(0, ea),
          flexDirection: "row",
          marginTop: String(30) + ea,
          marginBottom: String(10) + ea,
        },
        children: [
          {
            style: {
              display: "inline-flex",
              width: String(checkCircleWidth) + ea,
              height: String(checkCircleWidth) + ea,
              background: colorExtended.focusBlue,
              borderRadius: String(checkCircleWidth) + ea,
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
          },
          {
            text: "designers " + abc[i],
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(19) + ea,
              fontWeight: String(700),
              color: colorExtended.white,
              fontFamily: "mont",
              marginLeft: String(7) + ea,
              opacity: String(0.5),
            }
          }
        ]
      });

      thisCardBase = createNode({
        mother: thisBase,
        style: {
          display: "flex",
          position: "relative",
          justifyContent: "start",
          alignItems: "center",
          width: withOut(0, ea),
          flexDirection: "row",
        }
      });

      createNode({
        mother: thisCardBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: cardWidth,
          height: String(cardHeight) + ea,
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          marginRight: String(cardBetween) + ea,
          boxShadow: shadowForm,
          flexDirection: "column",
          overflow: "hidden",
        },
        children: [
          {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              height: String(250) + ea,
              backgroundImage: "url('" + designer.profile.link + "')",
              backgroundSize: designer.profile.gs === 's' ? "100% auto" : "100% 100%",
              backgroundPosition: designer.profile.position,
              filter: "grayscale(100%)",
            }
          }
        ]
      });

      createNode({
        mother: thisCardBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: cardWidth,
          height: String(cardHeight) + ea,
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          marginRight: String(cardBetween) + ea,
          boxShadow: shadowForm,
        }
      });

      createNode({
        mother: thisCardBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: cardWidth,
          height: String(cardHeight) + ea,
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          marginRight: String(cardBetween) + ea,
          boxShadow: shadowForm,
        }
      });

      createNode({
        mother: thisCardBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: cardWidth,
          height: String(cardHeight) + ea,
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          marginRight: String(cardBetween) + ea,
          boxShadow: shadowForm,
        }
      });

      createNode({
        mother: thisCardBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: cardWidth,
          height: String(cardHeight) + ea,
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          marginRight: String(cardBetween) + ea,
          boxShadow: shadowForm,
        }
      });

      createNode({
        mother: thisCardBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(buttonCardWidth) + ea,
          height: String(cardHeight) + ea,
          borderRadius: String(8) + "px",
          background: colorExtended.blueDarkButton,
          opacity: String(0.7),
          boxShadow: shadowForm,
        }
      });


    }
    

  } catch (e) {
    console.log(e);
  }
}

DesignerExplanationJs.prototype.resizeEvent = function () {
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

DesignerExplanationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, dateToString, homeliaisonAnalytics, colorExtended, stringToLink } = GeneralJs;
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true");
    const normalMode = (entireMode && getObj.normal === "true");
    let designers;
    let alphabet, temp0, temp1;
    let profileList;
    let profileListFiltered;
    let blankPhoto;

    temp0 = 'A'.charCodeAt();
    temp1 = 'Z'.charCodeAt();
    alphabet = [];
    for (let i = temp0; i < temp1 + 1; i++) {
      alphabet.push(String.fromCharCode(i));
    }

    this.abc = [];
    for (let i of alphabet) {
      this.abc.push(i);
    }

    for (let i of alphabet) {
      for (let j of alphabet) {
        this.abc.push(i + j);
      }
    }

    designers = await ajaxJson({ noFlat: true, whereQuery: { "information.contract.status": "협약 완료" } }, BACKHOST + "/getDesigners", { equal: true });
    profileList = await ajaxJson({ mode: "entire" }, BRIDGEHOST + "/designerProfileList", { equal: true });
    blankPhoto = DesignerExplanationJs.binaryPath + "/blank.png";

    for (let designer of designers) {
      profileListFiltered = profileList.filter((o) => { return o.desid === designer.desid });
      if (profileListFiltered.length === 0) {
        designer.profile = { gs: "s", link: blankPhoto, position: "50% 50%" };
      } else {
        profileListFiltered.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
        designer.profile = { gs: profileListFiltered[0].gs, link: stringToLink(profileListFiltered[0].link), position: `${String(profileListFiltered[0].position.x)}% ${String(profileListFiltered[0].position.y)}%` };
      }
    }
    this.designers = designers;

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "designerExplanation",
      client: null,
      base: {
        instance: this,
        binaryPath: DesignerExplanationJs.binaryPath,
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
          await instance.insertThirdBox();
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
          await GeneralJs.ajaxJson({ message: "DesignerExplanationJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    // GeneralJs.setQueue(() => {
    //   window.scrollTo(0, 0);
    // }, 400);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "DesignerExplanationJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
