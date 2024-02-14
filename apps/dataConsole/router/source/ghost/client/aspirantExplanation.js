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
  "name": "aspirantExplanation",
  "hangul": "디자이너 신청",
  "route": [
    "aspirantExplanation"
  ]
} %/%/g

const AspirantExplanationJs = function () {
  this.mother = new GeneralJs();
  this.colorExtended = {
    mainBlue: "#9eb6d8",
    white: "#ffffff",
    whiteIcon: "#ffffff",
    whiteBlack: "#ffffff",
    whiteGray: "#fbfbfb",
    gray0: "#f7f7f7",
    gray1: "#f2f2f2",
    gray2: "#ececec",
    gray3: "#dddddd",
    gray4: "#cccccc",
    gray5: "#aaaaaa",
    gray6: "#e2e2e2",
    grayDeactive: "#c2c2c2",
    deactive: "#bbbbbb",
    liteShadow: "#bbbbbb",
    shadow: "#808080",
    shadowWhite: "#808080",
    darkShadow: "#606060",
    darkDarkShadow: "#505050",
    liteBlack: "#aaaaaa",
    black: "#404040",
    darkBlack: "#303030",
    realBlack: "#202020",
    gradientGreen: "linear-gradient(222deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
    gradientGreen2: "linear-gradient(222deg, rgba(89, 175, 137, 0.8) 5%, rgba(0, 156, 106, 0.9) 100%)",
    gradientGreen3: "linear-gradient(172deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
    gradientGreen4: "linear-gradient(222deg, rgba(89, 175, 137, 1) 5%, rgba(0, 156, 106, 1) 100%)",
    gradientGreenWhite: "linear-gradient(222deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
    greenGray: "#2fa678",
    greenWhite: "#2fa678",
    greenBlack: "#2fa678",
    cancelBlack: "#404040",
    green: "#2fa678",
    softGreen: "#59af89",
    darkGreen: "#009b6a",
    whiteGreen: "#bedacb",
    middleGreen: "#83cea7",
    liteGreen: "#f0f9f5",
    gradientGray: "linear-gradient(256deg, rgba(17, 17, 17, 0.8) 0%, rgba(20, 20, 20, 0.75) 100%)",
    gradientBlack: "linear-gradient(256deg, rgba(17, 17, 17, 0.9) 0%, rgba(20, 20, 20, 0.75) 100%)",
    red: "#ff5f57",
    yellow: "#ffbd3d",
    purple: "#ba7dd7",
    darkRed: "#d13939",
    blue: "#5e9add",
    blueMiddle: "#3273bb",
    blueDark: "#2a4866",
    ultimateBlack: "#000000",
    subYellow: "#ffd574",
    warmGray0: "#f2f2f2",
    warmGray1: "#ececec",
    warmGrayMiddle: "#dddddd",
    warmGray2: "#cccccc",
    yellowLine: "#cc921f",
  }
}

AspirantExplanationJs.binaryPath = "/middle/aspirant";

AspirantExplanationJs.prototype.insertInitBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass } = GeneralJs;
  const { ea, media, baseTong, colorExtended, standardWidth, totalContents, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const submitBlockClassName = "submitBlockClassName";
  try {
    let minusLeft;
    let firstBase;
    let leftRightWidth;
    let titleHeight;
    let plusRatio;
    let plusWidth;
    let whitePopupWidth, whitePopupHeight;
    let pinMargin;
    let pinWidth;
    let firstBasePaddingBottom;
    let blueTop;
    let subTitleSize, subTitleWeight, subTitleMarginTop;
    let illustMarginTop;
    let buttonMarginTop;
    let buttonWidth;
    let buttonHeight;
    let buttonSize;
    let buttonTextTop;
    let buttonWeight;
    let firstBasePaddingTop;
    let mainIllust;
    let whitePopupMargin;
    let mobileLeftPaddingVisual;

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    plusRatio = <%% 0.45, 0.7, 0, 0, 0 %%>;
    plusWidth = ((leftRightWidth * plusRatio) * 2) + standardWidth

    firstBasePaddingTop = <%% 24, 24, 24, 24, 15.5 %%>;

    titleHeight = <%% 120, 106, 98, 84, 30.5 %%>;

    whitePopupWidth = <%% 1200, 1000, 800, 780, 80 %%>;
    whitePopupMargin = <%% 40, 40, 36, 32, 2 %%>;
    whitePopupHeight = window.innerHeight - naviHeight - (whitePopupMargin * 2);

    pinMargin = <%% 16, 16, 14, 12, 1 %%>;
    pinWidth = <%% 6, 6, 5, 4, 1 %%>;

    firstBasePaddingBottom = <%% 170, 170, 160, 120, 24.5 %%>;
    blueTop = <%% 200, 200, 200, 200, 20 %%>;

    subTitleSize = <%% 18, 18, 17, 15, 3.8 %%>;
    subTitleWeight = <%% 300, 300, 300, 300, 600 %%>;
    subTitleMarginTop = <%% 16, 16, 12, 10, 2.2 %%>;

    illustMarginTop = <%% 116, 110, 80, 80, 11 %%>;

    buttonMarginTop = <%% 4, 4, 24, 20, 3.6 %%>;
    buttonWidth = <%% 160, 145, 140, 130, 31 %%>;
    buttonHeight = <%% 42, 42, 42, 40, 9 %%>;
    buttonSize = <%% 18, 17, 17, 16, 3.5 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;

    mobileLeftPaddingVisual = 0.8;

    mainIllust = <%% AspirantExplanationJs.binaryPath + "/mainIllust0.png", AspirantExplanationJs.binaryPath + "/mainIllust0.png", AspirantExplanationJs.binaryPath + "/mainIllust1.png", AspirantExplanationJs.binaryPath + "/mainIllust1.png", AspirantExplanationJs.binaryPath + "/mainIllust2.png" %%>;

    if (media[0] && window.innerHeight > 1100) {
      firstBasePaddingTop = 60;
      titleHeight = 142;
      subTitleSize = 19;
      firstBasePaddingBottom = 200;
      illustMarginTop = 180;
      plusRatio = 0.8;
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
          top: String((-1 * blueTop) + naviHeight) + ea,
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.mainBlue,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * ((-1 * blueTop) + naviHeight), ea),
        }
      }
    });
  
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
          mode: "img",
          attribute: {
            src: desktop ? AspirantExplanationJs.binaryPath + "/titleSvg0.svg" : AspirantExplanationJs.binaryPath + "/titleSvg1.svg",
          },
          style: {
            display: "inline-flex",
            position: "relative",
            height: String(titleHeight) + ea,
          }
        }
      ]
    });
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
          text: "홈리에종 디자이너 파트너십 지원",
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
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "start",
        marginTop: String(illustMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0.2s 1 normal forwards running fadeupdelay2",
      },
      children: [
        {
          mode: "img",
          attribute: {
            src: mainIllust,
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(plusWidth) + ea,
            left: String(-1 * ((plusWidth - standardWidth) / 2)) + ea,
          }
        }
      ]
    });
    createNode({
      mother: firstBase,
      attribute: {
        selectstart: (e) => { e.preventDefault() },
      },
      event: {
        click: async function (e) {
          try {
            const zIndex = 4;
            let cancelBack, blockPrompt;
  
            homeliaisonAnalytics({
              page: instance.pageName,
              standard: instance.firstPageViewTime,
              action: "aspirantSubmitButtonClick",
              data: {
                delta: (new Date()).valueOf() - instance.firstPageViewTime.valueOf(),
                date: new Date(),
              },
            }).catch((err) => {
              console.log(err);
            });

            cancelBack = createNode({
              mother: totalContents,
              class: [ submitBlockClassName ],
              event: (e) => { removeByClass(submitBlockClassName) },
              style: {
                display: "block",
                position: "fixed",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                zIndex: String(zIndex),
              }
            });

            blockPrompt = createNode({
              mother: totalContents,
              class: [ submitBlockClassName ],
              style: {
                display: "flex",
                position: "fixed",
                top: "calc(calc(50% - " + String(whitePopupHeight / 2) + ea + ") + " + String(naviHeight / 2) + "px" + ")",
                left: "calc(50% - " + String(whitePopupWidth / 2) + ea + ")",
                width: String(whitePopupWidth) + ea,
                height: String(whitePopupHeight) + ea,
                background: colorChip.white,
                borderRadius: String(8) + "px",
                animation: "0.4s ease 0s 1 normal forwards running fadeupdelay",
                opacity: String(0),
                zIndex: String(zIndex),
                boxShadow: "0px 3px 15px -9px " + colorExtended.darkDarkShadow,
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(whitePopupWidth) + ea,
                  height: String(whitePopupHeight) + ea,
                  top: String(0),
                  left: String(0),
                },
                children: [
                  {
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(pinWidth) + ea,
                      height: String(pinWidth) + ea,
                      borderRadius: String(pinWidth) + ea,
                      border: "1px solid " + colorExtended.warmGray2,
                      background: colorExtended.gray0,
                      top: String(pinMargin) + ea,
                      left: String(pinMargin) + ea,
                      zIndex: String(4),
                    }
                  },
                  {
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(pinWidth) + ea,
                      height: String(pinWidth) + ea,
                      borderRadius: String(pinWidth) + ea,
                      border: "1px solid " + colorExtended.warmGray2,
                      background: colorExtended.gray0,
                      top: String(pinMargin) + ea,
                      right: String(pinMargin) + ea,
                      zIndex: String(4),
                    }
                  },
                  {
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(pinWidth) + ea,
                      height: String(pinWidth) + ea,
                      borderRadius: String(pinWidth) + ea,
                      border: "1px solid " + colorExtended.warmGray2,
                      background: colorExtended.gray0,
                      bottom: String(pinMargin) + ea,
                      left: String(pinMargin) + ea,
                      zIndex: String(4),
                    }
                  },
                  {
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(pinWidth) + ea,
                      height: String(pinWidth) + ea,
                      borderRadius: String(pinWidth) + ea,
                      border: "1px solid " + colorExtended.warmGray2,
                      background: colorExtended.gray0,
                      bottom: String(pinMargin) + ea,
                      right: String(pinMargin) + ea,
                      zIndex: String(4),
                    }
                  },
                ]
              },
            })
  
            createNode({
              mother: blockPrompt.firstChild,
              mode: "iframe",
              attribute: {
                src: "/middle/aspirantSubmit?cliid=c1801_aa01s&entire=true&normal=true&dataonly=true",
              },
              style: {
                position: "absolute",
                top: String(0),
                left: String(0) + ea,
                width: String(whitePopupWidth) + ea,
                height: String(whitePopupHeight) + ea,
                border: String(0),
                borderRadius: String(8) + "px",
              }
            });

          } catch (e) {
            console.log(e);
          }
        }
      },
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
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
            background: colorChip.black,
            borderRadius: String(buttonHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            attribute: {
              selectstart: (e) => { e.preventDefault() },
            },
            text: "파트너십 지원",
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(buttonSize) + ea,
              fontWeight: String(buttonWeight),
              color: colorExtended.white,
            }
          }
        }
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

AspirantExplanationJs.prototype.insertSecondBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong, colorExtended, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    let mainHeight;
    let minusLeft;
    let secondBase;
    let leftBase, rightBase;
    let pinMargin;
    let pinWidth;
    let arrowMargin;
    let arrowWidth;
    let contentsSize;
    let boxBetween;
    let basePaddingTop, basePaddingBottom;
    let colorTop;
    let titleSize, titleWeight;
    let subTitleSize, subTitleWeight, subTitleMarginTop, subTitleOpacity;
    let contentsBaseMarginTop;
    let boxBorderRadius;
    let colorTitleSize, colorTitleWeight, colorTitleBoldWeight;
    let circleWidth, circleTop;
    let circleLeft0, circleLeft1, circleLeft2, circleLeft3, circleLeft4, circleLeft5, circleLeft6; 
    let descriptionBetween;
    let descriptionLineBottomBetween;

    mainHeight = <%% 440, 390, 370, 280, 132 %%>;
    minusLeft = window.innerWidth - standardWidth + 1;
  
    pinMargin = <%% 20, 20, 16, 12, 1.6 %%>;
    pinWidth = <%% 9, 9, 8, 7, 1.2 %%>;

    arrowMargin = <%% 29, 23, 19, 12, 2.5 %%>;
    arrowWidth = <%% 50, 46, 40, 32, 6 %%>;

    contentsSize = <%% 20, 18, 17, 15, 3.5 %%>;

    boxBetween = <%% 24, 24, 20, 20, 4 %%>;

    basePaddingTop = <%% 170, 170, 160, 140, 24 %%>;
    basePaddingBottom = <%% 200, 200, 190, 170, 27 %%>;

    colorTop = <%% 200, 200, 200, 200, 200 %%>;

    titleSize = <%% 32, 30, 29, 25, 5.6 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;

    subTitleSize = <%% 17, 17, 16, 15, 3.5 %%>;
    subTitleWeight = <%% 300, 300, 300, 300, 300 %%>;
    subTitleMarginTop = <%% (isMac() ? 6 : 4), (isMac() ? 6 : 4), (isMac() ? 5 : 3), (isMac() ? 4 : 3), 1.2 %%>;

    subTitleOpacity = <%% 0.7, 0.7, 0.7, 0.7, 0.7 %%>;

    contentsBaseMarginTop = <%% 64, 60, 50, 48, 10 %%>;

    boxBorderRadius = <%% 10, 10, 10, 10, 8 %%>;

    colorTitleSize = <%% 28, 26, 24, 20, 4.8 %%>;
    colorTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
    colorTitleBoldWeight = <%% 900, 900, 900, 900, 900 %%>;

    circleWidth = <%% 6, 6, 5, 4, 1 %%>;
    circleTop = <%% (isMac() ? -2 : -4), (isMac() ? -2 : -4), (isMac() ? -2 : -4), (isMac() ? -2 : -4), -0.5 %%>;

    descriptionBetween = <%% 12, 12, 9, 8, 2 %%>;
    descriptionLineBottomBetween = <%% 4, 4, 4, 4, 1 %%>;

    circleLeft0 = <%% 142, 133, 123, 101, 24.2 %%>;
    circleLeft1 = <%% 168, 155, 143, 119, 28.5 %%>;
    circleLeft2 = <%% 143, 132, 123, 101, 24.3 %%>;
    circleLeft3 = <%% 174, 161, 150, 124, 29.8 %%>;
    circleLeft4 = <%% 198, 183, 169, 141, 33.6 %%>;
    circleLeft5 = <%% 229, 212, 197, 163, 39.2 %%>;
    circleLeft6 = <%% 252, 233, 216, 179, 43 %%>;

    secondBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(basePaddingTop) + ea,
        paddingBottom: String(basePaddingBottom) + ea,
        flexDirection: "column"
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.black,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * ((-1 * colorTop) + naviHeight), ea),
        }
      }
    });

    createNode({
      mother: secondBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          text: "나는 어떤 디자이너일까?",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.white,
            fontWeight: String(titleWeight),
            fontSize: String(titleSize) + ea,
          }
        }
      ]
    });

    createNode({
      mother: secondBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "start",
        marginTop: String(subTitleMarginTop) + ea,
      },
      children: [
        {
          text: "이런 기회가 주어져요.",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.white,
            fontWeight: String(subTitleWeight),
            fontSize: String(subTitleSize) + ea,
            opacity: String(subTitleOpacity),
          }
        }
      ]
    });

    [ leftBase, rightBase ] = createNode({
      mother: secondBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "start",
        marginTop: String(contentsBaseMarginTop) + ea,
        height: String(mainHeight) + ea,
        flexDirection: desktop ? "row" : "column",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            marginRight: String(boxBetween) + ea,
            width: desktop ? "calc(calc(100% - " + String(boxBetween) + ea + ") / " + String(2) + ")" : withOut(0, ea),
            height: withOut(0, ea),
            borderRadius: String(boxBorderRadius) + "px",
            border: "1px solid " + colorExtended.darkShadow,
            boxShadow: "0px 5px 21px -9px " + colorExtended.ultimateBlack,
            background: colorExtended.black,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: desktop ? "" : String(boxBetween) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: desktop ? "calc(calc(100% - " + String(boxBetween) + ea + ") / " + String(2) + ")" : withOut(0, ea),
            height: withOut(0, ea),
            borderRadius: String(boxBorderRadius) + "px",
            border: "1px solid " + colorExtended.darkShadow,
            boxShadow: "0px 5px 21px -9px " + colorExtended.ultimateBlack,
            background: colorExtended.black,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }
        },
      ]
    }).children;

    // left pin
    createNode({
      mother: leftBase,
      style: {
        display: "inline-flex",
        position: "absolute",
        width: String(pinWidth) + ea,
        height: String(pinWidth) + ea,
        borderRadius: String(pinWidth) + ea,
        border: "1px solid " + colorExtended.shadow,
        background: colorExtended.realBlack,
        top: String(pinMargin) + ea,
        left: String(pinMargin) + ea,
      }
    });
    createNode({
      mother: leftBase,
      style: {
        display: "inline-flex",
        position: "absolute",
        width: String(pinWidth) + ea,
        height: String(pinWidth) + ea,
        borderRadius: String(pinWidth) + ea,
        border: "1px solid " + colorExtended.shadow,
        background: colorExtended.realBlack,
        top: String(pinMargin) + ea,
        right: String(pinMargin) + ea,
      }
    });
    createNode({
      mother: leftBase,
      style: {
        display: "inline-flex",
        position: "absolute",
        width: String(pinWidth) + ea,
        height: String(pinWidth) + ea,
        borderRadius: String(pinWidth) + ea,
        border: "1px solid " + colorExtended.shadow,
        background: colorExtended.realBlack,
        bottom: String(pinMargin) + ea,
        left: String(pinMargin) + ea,
      }
    });
    createNode({
      mother: leftBase,
      style: {
        display: "inline-flex",
        position: "absolute",
        width: String(pinWidth) + ea,
        height: String(pinWidth) + ea,
        borderRadius: String(pinWidth) + ea,
        border: "1px solid " + colorExtended.shadow,
        background: colorExtended.realBlack,
        bottom: String(pinMargin) + ea,
        right: String(pinMargin) + ea,
      }
    });

    // left contents
    createNode({
      mother: leftBase,
      style: {
        display: "block",
        position: "relative",
      },
      children: [
        {
          text: "실무 경험이 <b%많은%b> 디자이너",
          style: {
            display: "block",
            position: "relative",
            color: colorExtended.mainBlue,
            fontWeight: String(colorTitleWeight),
            fontSize: String(colorTitleSize) + ea,
          },
          bold: {
            color: colorExtended.mainBlue,
            fontWeight: String(colorTitleBoldWeight),
            fontSize: String(colorTitleSize) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorExtended.mainBlue,
            width: String(circleWidth) + ea,
            height: String(circleWidth) + ea,
            borderRadius: String(circleWidth) + ea,
            top: String(circleTop) + ea,
            left: String(circleLeft0) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorExtended.mainBlue,
            width: String(circleWidth) + ea,
            height: String(circleWidth) + ea,
            borderRadius: String(circleWidth) + ea,
            top: String(circleTop) + ea,
            left: String(circleLeft1) + ea,
          }
        },
      ]
    });
    createNode({
      mother: leftBase,
      style: {
        display: "block",
        position: "relative",
        marginTop: String(arrowMargin) + ea,
      },
      children: [
        {
          mode: "svg",
          source: GeneralJs.svgMaker.downArrow(colorExtended.mainBlue),
          style: {
            display: "block",
            position: "relative",
            width: String(arrowWidth) + ea,
          }
        }
      ]
    });
    createNode({
      mother: leftBase,
      style: {
        display: "block",
        position: "relative",
        marginTop: String(arrowMargin) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            borderBottom: "1px solid " + colorChip.shadow,
            paddingBottom: String(descriptionLineBottomBetween) + ea,
          },
          child: {
            text: "복잡한 세일즈, 정산, 중재는 홈리에종에게 맡겨요.",
            style: {
              display: "block",
              position: "relative",
              color: colorExtended.white,
              fontWeight: String(200),
              fontSize: String(contentsSize) + ea,
            },
          }
        },
      ]
    });
    createNode({
      mother: leftBase,
      style: {
        display: "block",
        position: "relative",
        marginTop: String(descriptionBetween) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            borderBottom: "1px solid " + colorChip.shadow,
            paddingBottom: String(descriptionLineBottomBetween) + ea,
          },
          child: {
            text: "디자이너는 디자인 역량을 키우는데 집중해주세요.",
            style: {
              display: "block",
              position: "relative",
              color: colorExtended.white,
              fontWeight: String(200),
              fontSize: String(contentsSize) + ea,
            },
          }
        },
      ]
    });
    createNode({
      mother: leftBase,
      style: {
        display: "block",
        position: "relative",
        marginTop: String(descriptionBetween) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            borderBottom: "1px solid " + colorChip.shadow,
            paddingBottom: String(descriptionLineBottomBetween) + ea,
          },
          child: {
            text: "홈리에종 시공사와 교육 인프라를 지원해드려요.",
            style: {
              display: "block",
              position: "relative",
              color: colorExtended.white,
              fontWeight: String(200),
              fontSize: String(contentsSize) + ea,
            },
          }
        },
      ]
    });

    // right pin
    createNode({
      mother: rightBase,
      style: {
        display: "inline-flex",
        position: "absolute",
        width: String(pinWidth) + ea,
        height: String(pinWidth) + ea,
        borderRadius: String(pinWidth) + ea,
        border: "1px solid " + colorExtended.shadow,
        background: colorExtended.realBlack,
        top: String(pinMargin) + ea,
        left: String(pinMargin) + ea,
      }
    });
    createNode({
      mother: rightBase,
      style: {
        display: "inline-flex",
        position: "absolute",
        width: String(pinWidth) + ea,
        height: String(pinWidth) + ea,
        borderRadius: String(pinWidth) + ea,
        border: "1px solid " + colorExtended.shadow,
        background: colorExtended.realBlack,
        top: String(pinMargin) + ea,
        right: String(pinMargin) + ea,
      }
    });
    createNode({
      mother: rightBase,
      style: {
        display: "inline-flex",
        position: "absolute",
        width: String(pinWidth) + ea,
        height: String(pinWidth) + ea,
        borderRadius: String(pinWidth) + ea,
        border: "1px solid " + colorExtended.shadow,
        background: colorExtended.realBlack,
        bottom: String(pinMargin) + ea,
        left: String(pinMargin) + ea,
      }
    });
    createNode({
      mother: rightBase,
      style: {
        display: "inline-flex",
        position: "absolute",
        width: String(pinWidth) + ea,
        height: String(pinWidth) + ea,
        borderRadius: String(pinWidth) + ea,
        border: "1px solid " + colorExtended.shadow,
        background: colorExtended.realBlack,
        bottom: String(pinMargin) + ea,
        right: String(pinMargin) + ea,
      }
    });

    // right contents
    createNode({
      mother: rightBase,
      style: {
        display: "block",
        position: "relative",
      },
      children: [
        {
          text: "실무 경험을 <b%더 쌓고 싶은%b> 디자이너",
          style: {
            display: "block",
            position: "relative",
            color: colorExtended.subYellow,
            fontWeight: String(colorTitleWeight),
            fontSize: String(colorTitleSize) + ea,
          },
          bold: {
            color: colorExtended.subYellow,
            fontWeight: String(colorTitleBoldWeight),
            fontSize: String(colorTitleSize) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorExtended.subYellow,
            width: String(circleWidth) + ea,
            height: String(circleWidth) + ea,
            borderRadius: String(circleWidth) + ea,
            top: String(circleTop) + ea,
            left: String(circleLeft2) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorExtended.subYellow,
            width: String(circleWidth) + ea,
            height: String(circleWidth) + ea,
            borderRadius: String(circleWidth) + ea,
            top: String(circleTop) + ea,
            left: String(circleLeft3) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorExtended.subYellow,
            width: String(circleWidth) + ea,
            height: String(circleWidth) + ea,
            borderRadius: String(circleWidth) + ea,
            top: String(circleTop) + ea,
            left: String(circleLeft4) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorExtended.subYellow,
            width: String(circleWidth) + ea,
            height: String(circleWidth) + ea,
            borderRadius: String(circleWidth) + ea,
            top: String(circleTop) + ea,
            left: String(circleLeft5) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorExtended.subYellow,
            width: String(circleWidth) + ea,
            height: String(circleWidth) + ea,
            borderRadius: String(circleWidth) + ea,
            top: String(circleTop) + ea,
            left: String(circleLeft6) + ea,
          }
        },
      ]
    });
    createNode({
      mother: rightBase,
      style: {
        display: "block",
        position: "relative",
        marginTop: String(arrowMargin) + ea,
      },
      children: [
        {
          mode: "svg",
          source: GeneralJs.svgMaker.downArrow(colorExtended.subYellow),
          style: {
            display: "block",
            position: "relative",
            width: String(arrowWidth) + ea,
          }
        }
      ]
    });
    createNode({
      mother: rightBase,
      style: {
        display: "block",
        position: "relative",
        marginTop: String(arrowMargin) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            borderBottom: "1px solid " + colorChip.shadow,
            paddingBottom: String(descriptionLineBottomBetween) + ea,
          },
          child: {
            text: "포트폴리오를 쌓을 수 있어요.",
            style: {
              display: "block",
              position: "relative",
              color: colorExtended.white,
              fontWeight: String(200),
              fontSize: String(contentsSize) + ea,
            },
          }
        },
      ]
    });
    createNode({
      mother: rightBase,
      style: {
        display: "block",
        position: "relative",
        marginTop: String(descriptionBetween) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            borderBottom: "1px solid " + colorChip.shadow,
            paddingBottom: String(descriptionLineBottomBetween) + ea,
          },
          child: {
            text: "콘텐츠는 홈리에종에서 관리해줘요.",
            style: {
              display: "block",
              position: "relative",
              color: colorExtended.white,
              fontWeight: String(200),
              fontSize: String(contentsSize) + ea,
            },
          }
        },
      ]
    });
    createNode({
      mother: rightBase,
      style: {
        display: "block",
        position: "relative",
        marginTop: String(descriptionBetween) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            borderBottom: "1px solid " + colorChip.shadow,
            paddingBottom: String(descriptionLineBottomBetween) + ea,
          },
          child: {
            text: "디자이너 커뮤니티에서 함께 성장해요.",
            style: {
              display: "block",
              position: "relative",
              color: colorExtended.white,
              fontWeight: String(200),
              fontSize: String(contentsSize) + ea,
            },
          }
        },
      ]
    });


  } catch (e) {
    console.log(e);
  }
}

AspirantExplanationJs.prototype.insertThirdBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, equalJson, removeByClass } = GeneralJs;
  const { ea, media, baseTong, colorExtended, standardWidth, totalContents, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const blackPopupClassName = "blackPopupClassName";
  try {
    let mainHeight;
    let minusLeft;
    let thirdBase;
    let leftBase, rightBase;
    let pinMargin;
    let pinWidth;
    let arrowMargin;
    let arrowWidth;
    let contentsSize;
    let boxBetween;
    let middleBetween;
    let unitHeight;
    let unitSize, unitWeight;
    let contentsText;
    let popupClickEvent;
    let titleSize;
    let titleWeight;
    let subTitleSize;
    let subTitleWeight;
    let subTitleMarginTop;
    let subTitleOpacity;
    let basePaddingTop;
    let basePaddingBottom;
    let colorTop;
    let unitTextTop;
    let boxGroupMarginTop;
    let unitBorderRadius;
    let blackPromptMarginBetween;
    let blackPromptPaddingLeft;
    let blackPromptPaddingTop;
    let commentTriangleWidth;
    let blackPromptSize, blackPromptWeight, blackPromptLineHeight;
    let questions;

    mainHeight = <%% 900, 900, 900, 900, 900 %%>;
    minusLeft = window.innerWidth - standardWidth + 1;
  
    pinMargin = <%% 15, 15, 14, 12, 1.6 %%>;
    pinWidth = <%% 6, 6, 5, 4, 1.2 %%>;

    arrowMargin = <%% 29, 29, 29, 29, 29 %%>;
    arrowWidth = <%% 50, 50, 50, 50, 50 %%>;

    contentsSize = <%% 22, 22, 22, 22, 22 %%>;

    boxBetween = <%% 24, 24, 12, 12, 1.5 %%>;
    middleBetween = <%% 16, 16, 12, 12, 1.5 %%>;

    unitHeight = <%% 160, 130, 130, 100, 20 %%>;

    unitTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    unitSize = <%% 21, 20, 18, 16, 3.5 %%>;
    unitWeight = <%% 700, 700, 700, 700, 700 %%>;

    basePaddingTop = <%% 170, 170, 160, 140, 24 %%>;
    basePaddingBottom = <%% 200, 200, 190, 170, 27 %%>;

    colorTop = <%% 200, 200, 200, 200, 200 %%>;

    titleSize = <%% 32, 30, 29, 25, 5.6 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;

    subTitleSize = <%% 17, 17, 16, 15, 3.5 %%>;
    subTitleWeight = <%% 300, 300, 300, 300, 300 %%>;
    subTitleMarginTop = <%% (isMac() ? 6 : 4), (isMac() ? 6 : 4), (isMac() ? 5 : 3), (isMac() ? 4 : 3), 0.5 %%>;
    subTitleOpacity = <%% 0.7, 0.7, 0.7, 0.7, 0.7 %%>;

    boxGroupMarginTop = <%% 64, 60, 50, 48, 7.5 %%>;

    unitBorderRadius = <%% 10, 10, 10, 10, 6 %%>;

    blackPromptMarginBetween = <%% 20, 20, 20, 20, 3 %%>;

    blackPromptPaddingLeft = <%% 30, 20, 20, 14, 3.6 %%>;
    blackPromptPaddingTop = <%% 24, 16, 16, 10, 3 %%>;

    commentTriangleWidth = <%% 16, 16, 16, 12, 3 %%>;

    blackPromptSize = <%% 16, 14, 12, 10, 3 %%>;
    blackPromptWeight = <%% 500, 500, 500, 500, 500 %%>;
    blackPromptLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

    questions = [
      "다른 플랫폼과 다른 점은 무엇인가요?",
      "홈리에종의 홈스타일링 서비스란?",
      "직접 고객 유치를 하지 않아도 되나요?",
      "최소 활동 조건이 있나요?",
      "스타일링을 많이 해 본 건 아닌데\n저도 일할 수 있을까요?",
      "가능 일정이나 지역, 시공사 유무에 관계없이\n파트너십이 가능한가요?",
    ];

    contentsText = [
      [
        "많은 서비스가 있지만 유일한 시스템을 갖춘 서비스는 다릅니다.",
        "홈리에종은 홈스타일링 전문 플랫폼으로 단순 연결만 하지 않습니다.",
        "고객 중심의 인테리어를 추구하며 체계적으로 프로젝트를 케어하고,",
        "다양한 인프라 지원으로 디자이너와 함께 성장합니다.",
      ],
      [
        "고객의 예산, 제한 기간, 공간 상태, 취향을 고려하여",
        "시공부터 스타일링까지 완료합니다. 모든 공간은 가구, 패브릭 등의",
        "제품 세팅까지 일관성 있게 마무리할 때 인테리어가 잘 된 것입니다.",
        "현재 ‘인테리어’라는 단어는 ‘시공’에 국한되고 있으나",
        "진정한 인테리어는 시공과 스타일링을 포함합니다.",
      ],
      [
        "고객 유치는 홈리에종이 합니다. 홈리에종의 방향성에 기대감을",
        "가지신 고객님들을 유치하기 위해 노력하고 있습니다.",
        "디자이너님은 디자이너로서의 역량을 키워가는 것에 집중해주세요.",
        "능력 있고 디자인이 매력적이라면 꾸준히 고객을 만날 수 있습니다.",
      ],
      [
        "스타일링 경험 혹은 역량 확인이 필수입니다.",
        "1개 이상의 실제 현장 사진이 있거나, 1개 이상의 홈퍼니싱",
        "3D 작업 역량이 확인되어야 합니다.",
      ],
      [
        "3가지 모두 동의하시면 하실 수 있습니다.",
        "1. 주거 인테리어에 대한 새로운 접근 방법에 대한 공감",
        "2. 최소한의 스타일링 역량 (포트폴리오 혹은 3D 역량)",
        "3. 발전과 학습에 대한 강한 의지 및 관심",
      ],
      [
        "홈리에종은 디자이너님의 컨디션을 사전에 확인해 매칭합니다.",
        "디자이너의 어려움을 교육 및 가이드 제공을 통해 개선하고,",
        "디자이너의 가능 일정과 출발지역, 가능한 업무량을 파악하여",
        "지속적인 성장을 할 수 있도록 지원합니다!",
      ],
    ];

    popupClickEvent = (index) => {
      return async function(e) {
        try {
          const self = this;
          const targetContents = equalJson(JSON.stringify(contentsText[index])).join("\n");
          const thisBox = self.getBoundingClientRect();
          const zIndex = 4;
          let cancelBack, blockPrompt;

          homeliaisonAnalytics({
            page: instance.pageName,
            standard: instance.firstPageViewTime,
            action: "aspirantFaqUnitClick",
            data: {
              index: index,
              delta: (new Date()).valueOf() - instance.firstPageViewTime.valueOf(),
              date: new Date(),
              question: questions[index],
            },
          }).catch((err) => {
            console.log(err);
          });

          cancelBack = createNode({
            mother: totalContents,
            class: [ blackPopupClassName ],
            event: (e) => { removeByClass(blackPopupClassName) },
            style: {
              display: "block",
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              zIndex: String(zIndex),
            }
          });

          blockPrompt = createNode({
            mother: totalContents,
            class: [ blackPopupClassName ],
            style: {
              display: "flex",
              position: "absolute",
              top: "calc(" + String(thisBox.top + window.scrollY) + "px" + " + " + String(unitHeight + blackPromptMarginBetween) + ea + ")",
              left: String(thisBox.left) + "px",
              width: "calc(" + String(thisBox.width) + "px" + " - " + String(blackPromptPaddingLeft * 2) + ea + ")",
              padding: String(blackPromptPaddingLeft) + ea,
              paddingTop: String(blackPromptPaddingTop) + ea,
              paddingBottom: String(blackPromptPaddingTop) + ea,
              background: colorChip.black,
              borderRadius: String(8) + "px",
              animation: "0.4s ease 0s 1 normal forwards running fadeupdelay",
              opacity: String(0),
              zIndex: String(zIndex),
              boxShadow: "0px 3px 15px -9px " + colorExtended.realBlack,
            },
            child: {
              mode: "svg",
              source: svgMaker.commentTriangle("verticalLeft", colorExtended.black),
              style: {
                position: "absolute",
                width: String(commentTriangleWidth) + ea,
                top: String(-1 * commentTriangleWidth) + ea,
                right: String(0) + ea,
                transform: "rotate(180deg)",
              }
            }
          });

          createNode({
            mother: blockPrompt,
            text: targetContents,
            style: {
              fontSize: String(blackPromptSize) + ea,
              fontWeight: String(blackPromptWeight),
              color: colorChip.white,
              lineHeight: String(blackPromptLineHeight),
            }
          })

        } catch (e) {
          console.log(e);
        }
      }
    }

    thirdBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(basePaddingTop) + ea,
        paddingBottom: String(basePaddingBottom) + ea,
        flexDirection: "column"
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.gray0,
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
        alignItems: "start",
      },
      children: [
        {
          text: "자주 묻는 질문",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(titleWeight),
            fontSize: String(titleSize) + ea,
          }
        }
      ]
    });

    createNode({
      mother: thirdBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "start",
        marginTop: String(subTitleMarginTop) + ea,
      },
      children: [
        {
          text: "FAQ",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(subTitleWeight),
            fontSize: String(subTitleSize) + ea,
            opacity: String(subTitleOpacity),
          }
        }
      ]
    });

    [ leftBase, rightBase ] = createNode({
      mother: thirdBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "start",
        marginTop: String(boxGroupMarginTop) + ea,
        flexDirection: desktop ? "row" : "column",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            marginRight: desktop ? String(boxBetween) + ea : "",
            width: desktop ? "calc(calc(100% - " + String(boxBetween) + ea + ") / " + String(2) + ")" : withOut(0, ea),
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: desktop ? "" : String(boxBetween) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: desktop ? "calc(calc(100% - " + String(boxBetween) + ea + ") / " + String(2) + ")" : withOut(0, ea),
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }
        },
      ]
    }).children;

    // left
    createNode({
      mother: leftBase,
      attribute: {
        index: String(0),
      },
      event: {
        selectstart: (e) => { e.preventDefault() },
        click: popupClickEvent(0),
      },
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(unitBorderRadius) + "px",
        border: "1px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.white,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            top: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            top: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            bottom: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            bottom: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          text: questions[0],
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            display: "inline-block",
            position: "relative",
            top: String(unitTextTop) + ea,
            fontSize: String(unitSize) + ea,
            fontWeight: String(unitWeight),
            color: colorExtended.black,
          },
          under: {
            fontSize: String(unitSize) + ea,
            fontWeight: String(400),
            color: colorExtended.warmGray2,
          }
        }
      ],
    });
    createNode({
      mother: leftBase,
      attribute: {
        index: String(1),
      },
      event: {
        selectstart: (e) => { e.preventDefault() },
        click: popupClickEvent(1),
      },
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(unitBorderRadius) + "px",
        border: "1px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.white,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            top: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            top: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            bottom: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            bottom: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          text: questions[1],
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            display: "inline-block",
            position: "relative",
            top: String(unitTextTop) + ea,
            fontSize: String(unitSize) + ea,
            fontWeight: String(unitWeight),
            color: colorExtended.black,
          },
          under: {
            fontSize: String(unitSize) + ea,
            fontWeight: String(400),
            color: colorExtended.warmGray2,
          }
        }
      ],
    });
    createNode({
      mother: leftBase,
      attribute: {
        index: String(2),
      },
      event: {
        selectstart: (e) => { e.preventDefault() },
        click: popupClickEvent(2),
      },
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        borderRadius: String(unitBorderRadius) + "px",
        border: "1px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.white,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            top: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            top: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            bottom: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            bottom: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          text: questions[2],
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            display: "inline-block",
            position: "relative",
            top: String(unitTextTop) + ea,
            fontSize: String(unitSize) + ea,
            fontWeight: String(unitWeight),
            color: colorExtended.black,
          },
          under: {
            fontSize: String(unitSize) + ea,
            fontWeight: String(400),
            color: colorExtended.warmGray2,
          }
        }
      ],
    });

    // right
    createNode({
      mother: rightBase,
      attribute: {
        index: String(3),
      },
      event: {
        selectstart: (e) => { e.preventDefault() },
        click: popupClickEvent(3),
      },
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(unitBorderRadius) + "px",
        border: "1px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.white,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            top: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            top: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            bottom: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            bottom: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          text: questions[3],
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            display: "inline-block",
            position: "relative",
            top: String(unitTextTop) + ea,
            fontSize: String(unitSize) + ea,
            fontWeight: String(unitWeight),
            color: colorExtended.black,
          },
          under: {
            fontSize: String(unitSize) + ea,
            fontWeight: String(400),
            color: colorExtended.warmGray2,
          }
        }
      ],
    });
    createNode({
      mother: rightBase,
      attribute: {
        index: String(4),
      },
      event: {
        selectstart: (e) => { e.preventDefault() },
        click: popupClickEvent(4),
      },
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(unitBorderRadius) + "px",
        border: "1px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.white,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            top: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            top: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            bottom: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            bottom: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          text: questions[4],
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            display: "inline-block",
            position: "relative",
            top: String(unitTextTop) + ea,
            fontSize: String(unitSize) + ea,
            fontWeight: String(unitWeight),
            color: colorExtended.black,
            textAlign: "center",
          },
          under: {
            fontSize: String(unitSize) + ea,
            fontWeight: String(400),
            color: colorExtended.warmGray2,
          }
        }
      ],
    });
    createNode({
      mother: rightBase,
      attribute: {
        index: String(5),
      },
      event: {
        selectstart: (e) => { e.preventDefault() },
        click: popupClickEvent(5),
      },
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        borderRadius: String(unitBorderRadius) + "px",
        border: "1px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.white,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            top: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            top: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            bottom: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGray1,
            bottom: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          text: questions[5],
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            display: "inline-block",
            position: "relative",
            top: String(unitTextTop) + ea,
            fontSize: String(unitSize) + ea,
            fontWeight: String(unitWeight),
            color: colorExtended.black,
            textAlign: "center",
          },
          under: {
            fontSize: String(unitSize) + ea,
            fontWeight: String(400),
            color: colorExtended.warmGray2,
          }
        }
      ],
    });

  } catch (e) {
    console.log(e);
  }
}

AspirantExplanationJs.prototype.insertFourthBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong, colorExtended, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    let mainHeight;
    let minusLeft;
    let thirdBase;
    let leftBase, rightBase;
    let pinMargin;
    let pinWidth;
    let arrowMargin;
    let arrowWidth;
    let contentsSize;
    let boxBetween;
    let middleBetween;
    let unitHeight;
    let unitSize, unitWeight;
    let yellowMargin;
    let titleSize;
    let titleWeight;
    let titleLineHeight;
    let processBlockMarginTop;
    let unitBoxWidth;
    let unitBoxWidthLong;
    let basePaddingTop;
    let basePaddingBottom;
    let colorTop;
    let unitTextTop;

    mainHeight = <%% 900, 900, 900, 900, 900 %%>;
    minusLeft = window.innerWidth - standardWidth + 1;
  
    pinMargin = <%% 16, 16, 12, 10, 16 %%>;
    pinWidth = <%% 7, 7, 6, 5, 7 %%>;

    arrowMargin = <%% 29, 29, 29, 29, 29 %%>;
    arrowWidth = <%% 50, 50, 50, 50, 50 %%>;

    contentsSize = <%% 22, 22, 22, 22, 22 %%>;

    boxBetween = <%% 24, 24, 24, 24, 24 %%>;
    middleBetween = <%% 16, 16, 16, 16, 16 %%>;

    unitHeight = <%% 60, 48, 48, 36, 60 %%>;

    unitSize = <%% 20, 17, 15, 13, 20 %%>;
    unitWeight = <%% 700, 700, 700, 700, 700 %%>;

    yellowMargin = <%% 10, 10, 10, 10, 10 %%>;

    titleSize = <%% 32, 31, 28, 24, 35 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;
    titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

    processBlockMarginTop = <%% 80, 72, 56, 48, 80 %%>;

    unitBoxWidth = <%% 190, 150, 130, 110, 190 %%>;
    unitBoxWidthLong = <%% 310, 270, 230, 190, 310 %%>;
    unitBetween = <%% 40, 20, 16, 10, 40 %%>;

    basePaddingTop = <%% 170, 170, 160, 130, 18 %%>;
    basePaddingBottom = <%% 200, 200, 190, 160, 21 %%>;
    colorTop = <%% 200, 200, 200, 200, 200 %%>;

    unitTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1) %%>;

    thirdBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(basePaddingTop) + ea,
        paddingBottom: String(basePaddingBottom) + ea,
        flexDirection: "column"
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.warmGray1,
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
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          text: "디자이너 신청을 마치면\n해야할 것을 알려드릴게요.",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(titleWeight),
            fontSize: String(titleSize) + ea,
            lineHeight: String(titleLineHeight),
          }
        }
      ]
    });

    createNode({
      mother: thirdBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "start",
        marginTop: String(processBlockMarginTop) + ea,
        flexDirection: "row",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(unitHeight / 2) + ea,
                left: String(unitBoxWidth) + ea,
                width: String(unitBetween) + ea,
                height: String(0),
                opacity: String(0.2),
                borderBottom: "1px dashed " + colorChip.darkShadow,
              }
            },
            {
              style: {
                position: "absolute",
                top: String(unitHeight / 2) + ea,
                left: String(unitBoxWidth + unitBetween + unitBoxWidth) + ea,
                width: String(unitBetween) + ea,
                height: String(0),
                opacity: String(0.5),
                borderBottom: "1px dashed " + colorChip.darkShadow,
              }
            },
            {
              style: {
                position: "absolute",
                top: String(unitHeight / 2) + ea,
                left: String(unitBoxWidth + unitBetween + unitBoxWidth + unitBetween + unitBoxWidth) + ea,
                width: String(unitBetween) + ea,
                height: String(0),
                opacity: String(0.8),
                borderBottom: "1px dashed " + colorChip.darkShadow,
              }
            },
            {
              style: {
                position: "absolute",
                top: String(unitHeight / 2) + ea,
                left: String(unitBoxWidth + unitBetween + unitBoxWidth + unitBetween + unitBoxWidth + unitBetween + unitBoxWidthLong) + ea,
                width: withOut((unitBoxWidth * 4) + unitBoxWidthLong + (unitBetween * 3) + (yellowMargin * 2), ea),
                height: String(0),
                opacity: String(1),
                borderBottom: "1px dashed " + colorChip.darkShadow,
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "relative",
                height: String(unitHeight) + ea,
                width: String(unitBoxWidth) + ea,
                background: colorExtended.warmGray0,
                borderRadius: String(unitHeight) + ea,
                boxShadow: "0px 5px 19px -9px " + colorExtended.shadow,
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                text: "1차 유선 상담",
                style: {
                  display: "inlnie-block",
                  position: "relative",
                  top: String(unitTextTop) + ea,
                  fontSize: String(unitSize) + ea,
                  fontWeight: String(unitWeight),
                  color: colorExtended.black,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "relative",
                height: String(unitHeight) + ea,
                width: String(unitBoxWidth) + ea,
                background: colorExtended.warmGray0,
                borderRadius: String(unitHeight) + ea,
                boxShadow: "0px 5px 19px -9px " + colorExtended.shadow,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: String(unitBetween) + ea,
              },
              child: {
                text: "포트폴리오 제출",
                style: {
                  display: "inlnie-block",
                  position: "relative",
                  top: String(unitTextTop) + ea,
                  fontSize: String(unitSize) + ea,
                  fontWeight: String(unitWeight),
                  color: colorExtended.black,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "relative",
                height: String(unitHeight) + ea,
                width: String(unitBoxWidth) + ea,
                background: colorExtended.warmGray0,
                borderRadius: String(unitHeight) + ea,
                boxShadow: "0px 5px 19px -9px " + colorExtended.shadow,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: String(unitBetween) + ea,
              },
              child: {
                text: "행정 서류 제출",
                style: {
                  display: "inlnie-block",
                  position: "relative",
                  top: String(unitTextTop) + ea,
                  fontSize: String(unitSize) + ea,
                  fontWeight: String(unitWeight),
                  color: colorExtended.black,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "relative",
                height: String(unitHeight) + ea,
                width: String(unitBoxWidthLong) + ea,
                background: colorExtended.warmGray0,
                borderRadius: String(unitHeight) + ea,
                boxShadow: "0px 5px 19px -9px " + colorExtended.shadow,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: String(unitBetween) + ea,
              },
              child: {
                text: "계약서 작성과 협업 매뉴얼 안내",
                style: {
                  display: "inlnie-block",
                  position: "relative",
                  top: String(unitTextTop) + ea,
                  fontSize: String(unitSize) + ea,
                  fontWeight: String(unitWeight),
                  color: colorExtended.black,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "relative",
                height: String(unitHeight) + ea,
                width: String(unitBoxWidth) + ea,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: withOut((unitBoxWidth * 4) + unitBoxWidthLong + (unitBetween * 3) + (yellowMargin * 2), ea),
                background: "transparent",
                borderRadius: String(unitHeight) + ea,
                overflow: "visible",
              },
              children: [
                {
                  display: "block",
                  position: "absolute",
                  width: "calc(100% + " + String(yellowMargin * 6) + ea + ")",
                  height: "calc(100% + " + String(yellowMargin * 6) + ea + ")",
                  borderRadius: String(5000) + "px",
                  background: colorExtended.subYellow,
                  opacity: String(0.2),
                  border: "1px dashed " + colorExtended.yellowLine,
                },
                {
                  display: "block",
                  position: "absolute",
                  width: "calc(100% + " + String(yellowMargin * 4) + ea + ")",
                  height: "calc(100% + " + String(yellowMargin * 4) + ea + ")",
                  borderRadius: String(5000) + "px",
                  background: colorExtended.subYellow,
                  opacity: String(0.5),
                  border: "1px dashed " + colorExtended.yellowLine,
                },
                {
                  display: "block",
                  position: "absolute",
                  width: "calc(100% + " + String(yellowMargin * 2) + ea + ")",
                  height: "calc(100% + " + String(yellowMargin * 2) + ea + ")",
                  borderRadius: String(5000) + "px",
                  background: colorExtended.subYellow,
                  border: "1px dashed " + colorExtended.yellowLine,
                },
                {
                  display: "block",
                  position: "absolute",
                  width: withOut(0, ea),
                  height: withOut(0, ea),
                  borderRadius: String(unitHeight) + ea,
                  background: colorExtended.black,
                  boxShadow: "0px 5px 19px -9px " + colorExtended.shadow,
                },
                {
                  text: "디자이너 등록",
                  style: {
                    display: "inlnie-block",
                    position: "relative",
                    top: String(unitTextTop) + ea,
                    fontSize: String(unitSize) + ea,
                    fontWeight: String(unitWeight),
                    color: colorExtended.subYellow,
                  }
                },
              ]
            },
          ]
        },
      ]
    });


  } catch (e) {
    console.log(e);
  }
}

AspirantExplanationJs.prototype.insertFifthBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong, colorExtended, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    let mainHeight;
    let minusLeft;
    let thirdBase;
    let leftBase, rightBase;
    let pinMargin;
    let pinWidth;
    let arrowMargin;
    let arrowWidth;
    let contentsSize;
    let boxBetween;
    let middleBetween;
    let unitHeight;
    let unitSize, unitWeight;
    let base0, base1, base2, base3;
    let firstWidth, secondWidth;
    let titleSize;
    let numberTop;
    let numberAreaWidth;
    let titleAreaWidth;
    let basePaddingTop;
    let basePaddingBottom;
    let colorTop;
    let mainTitleWeight;
    let subTitleSize;
    let subTitleWeight;
    let subTitleMarginTop;
    let subTitleOpacity;
    let boxGroupMarginTop;
    let numberSize, numberWeight;
    let numberLeft0, numberLeft1, numberLeft2, numberLeft3;
    let titleWeight, titleLineHeight;
    let titleVisualTop;
    let descriptionSize, descriptionWeight, descriptionLineHeight;
    let blockHeight0, blockHeight1;
    let blockBorderRaidus;
    let subjectTitleSize;

    mainHeight = <%% 900, 900, 900, 900, 900 %%>;
    minusLeft = window.innerWidth - standardWidth + 1;
  
    pinMargin = <%% 16, 16, 10, 6, 16 %%>;
    pinWidth = <%% 6, 6, 5, 4, 6 %%>;

    arrowMargin = <%% 29, 29, 29, 29, 29 %%>;
    arrowWidth = <%% 50, 50, 50, 50, 50 %%>;

    contentsSize = <%% 22, 22, 22, 22, 22 %%>;

    boxBetween = <%% 24, 16, 10, 6, 24 %%>;
    middleBetween = <%% 12, 12, 12, 12, 12 %%>;

    unitHeight = <%% 192, 192, 192, 192, 192 %%>;

    unitSize = <%% 23, 23, 23, 23, 23 %%>;
    unitWeight = <%% 700, 700, 700, 700, 700 %%>;

    firstWidth = <%% 88, 88, 88, 88, 88 %%>;
    secondWidth = <%% 372, 372, 360, 360, 372 %%>;

    titleSize = <%% 23, 22, 21, 17, 23 %%>;
    titleWeight = <%% 600, 600, 600, 600, 600 %%>;
    titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
    titleVisualTop = <%% (isMac() ? 1 : 3), (isMac() ? 1 : 3), (isMac() ? 1 : 3), (isMac() ? 1 : 3), (isMac() ? 1 : 3) %%>;

    numberTop = <%% -17, -17, -15, -14, -17 %%>;

    numberAreaWidth = <%% 80, 70, 64, 56, 80 %%>;
    titleAreaWidth = <%% 320, 310, 275, 220, 320 %%>;

    basePaddingTop = <%% 170, 170, 160, 140, 18 %%>;
    basePaddingBottom = <%% 200, 200, 190, 170, 21 %%>;

    colorTop = <%% 200, 200, 200, 200, 200 %%>;

    mainTitleWeight = <%% 800, 800, 800, 800, 800 %%>;

    subjectTitleSize = <%% 32, 30, 29, 25, 31 %%>;

    subTitleSize = <%% 17, 17, 16, 15, 3 %%>;
    subTitleWeight = <%% 300, 300, 300, 300, 300 %%>;
    subTitleMarginTop = <%% (isMac() ? 6 : 4), (isMac() ? 6 : 4), (isMac() ? 5 : 3), (isMac() ? 4 : 3), (isMac() ? 6 : 4) %%>;
    subTitleOpacity = <%% 0.7, 0.7, 0.7, 0.7, 0.7 %%>;

    boxGroupMarginTop = <%% 64, 60, 50, 48, 64 %%>;

    numberSize = <%% 72, 70, 65, 56, 72 %%>;
    numberWeight = <%% 400, 400, 400, 400, 400 %%>;
    numberLeft0 = <%% 7, 7, 7, 7, 7 %%>;
    numberLeft1 = <%% 2, 2, 2, 2, 2 %%>;
    numberLeft2 = <%% 1, 1, 1, 1, 1 %%>;
    numberLeft3 = <%% 0, 0, 0, 0, 0 %%>;

    descriptionSize = <%% 19, 18, 16, 14, 19 %%>;
    descriptionWeight = <%% 200, 200, 200, 200, 200 %%>;
    descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

    blockHeight0 = <%% 140, 120, 110, 80, 14 %%>;
    blockHeight1 = <%% 180, 160, 140, 110, 18 %%>;
    blockBorderRaidus = <%% 10, 10, 10, 10, 10 %%>;

    thirdBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(basePaddingTop) + ea,
        paddingBottom: String(basePaddingBottom) + ea,
        flexDirection: "column"
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.gray0,
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
        alignItems: "start",
      },
      child: {
        text: "서비스 과정을 한 눈에 확인하세요!",
        style: {
          display: "inline-block",
          position: "relative",
          color: colorExtended.black,
          fontSize: String(subjectTitleSize) + ea,
          fontWeight: String(mainTitleWeight),
        }
      }
    });

    createNode({
      mother: thirdBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "start",
        marginTop: String(subTitleMarginTop) + ea,
      },
      children: [
        {
          text: "HOMELIAISON SERVICE PROCESS",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(subTitleWeight),
            fontSize: String(subTitleSize) + ea,
            opacity: String(subTitleOpacity),
          }
        }
      ]
    });

    [ base0, base1, base2, base3 ] = createNode({
      mother: thirdBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "start",
        marginTop: String(boxGroupMarginTop) + ea,
        flexDirection: "column",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            marginBottom: String(boxBetween) + ea,
            width: withOut(0, ea),
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          }
        },
        {
          style: {
            display: "flex",
            position: "relative",
            marginBottom: String(boxBetween) + ea,
            width: withOut(0, ea),
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          }
        },
        {
          style: {
            display: "flex",
            position: "relative",
            marginBottom: String(boxBetween) + ea,
            width: withOut(0, ea),
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          }
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          }
        },
      ]
    }).children;

    // 1
    createNode({
      mother: base0,
      text: String(1),
      style: {
        display: "inline-block",
        position: "relative",
        fontFamily: "graphik",
        fontSize: String(numberSize) + ea,
        fontWeight: String(numberWeight),
        color: colorExtended.warmGray2,
        top: String(numberTop) + ea,
        width: String(numberAreaWidth) + ea,
        left: String(numberLeft0) + ea,
      }
    });
    createNode({
      mother: base0,
      text: "고객의 신청서를 바탕으로\n정보를 수집해요.",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(titleSize) + ea,
        fontWeight: String(titleWeight),
        color: colorExtended.black,
        lineHeight: String(titleLineHeight),
        top: String(titleVisualTop) + ea,
        width: String(titleAreaWidth) + ea,
      }
    });
    createNode({
      mother: base0,
      style: {
        display: "inline-flex",
        position: "relative",
        width: withOut(numberAreaWidth + titleAreaWidth, ea),
        height: String(blockHeight0) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(blockBorderRaidus) + "px",
        border: "2px solid " + colorExtended.warmGray0,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            top: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            top: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            bottom: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            bottom: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          text: "디자이너 대신 고객의 니즈에 대한 상세한 정보를 확인해요.",
          style: {
            display: "block",
            position: "relative",
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(descriptionWeight),
            color: colorExtended.black,
            lineHeight: String(descriptionLineHeight),
            textAlign: "center",
          }
        },
      ],
    });

    // 2
    createNode({
      mother: base1,
      text: String(2),
      style: {
        display: "inline-block",
        position: "relative",
        fontFamily: "graphik",
        fontSize: String(numberSize) + ea,
        fontWeight: String(numberWeight),
        color: colorExtended.warmGray2,
        top: String(numberTop) + ea,
        width: String(numberAreaWidth) + ea,
        left: String(numberLeft1) + ea,
      }
    });
    createNode({
      mother: base1,
      text: "디자이너와 고객의\n매칭",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(titleSize) + ea,
        fontWeight: String(titleWeight),
        color: colorExtended.black,
        lineHeight: String(titleLineHeight),
        top: String(titleVisualTop) + ea,
        width: String(titleAreaWidth) + ea,
      }
    });
    createNode({
      mother: base1,
      style: {
        display: "inline-flex",
        position: "relative",
        width: withOut(numberAreaWidth + titleAreaWidth, ea),
        height: String(blockHeight0) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(blockBorderRaidus) + "px",
        border: "2px solid " + colorExtended.warmGray0,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            top: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            top: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            bottom: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            bottom: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          text: "지역, 스타일, 예산, 일정이 고려된 홈리에종의\n고객 분석 시스템을 통해 디자이너와 고객을 매칭해요.",
          style: {
            display: "block",
            position: "relative",
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(descriptionWeight),
            color: colorExtended.black,
            lineHeight: String(descriptionLineHeight),
            textAlign: "center",
          }
        },
      ],
    });

    // 3
    createNode({
      mother: base2,
      text: String(3),
      style: {
        display: "inline-block",
        position: "relative",
        fontFamily: "graphik",
        fontSize: String(numberSize) + ea,
        fontWeight: String(numberWeight),
        color: colorExtended.warmGray2,
        top: String(numberTop) + ea,
        width: String(numberAreaWidth) + ea,
        left: String(numberLeft2) + ea,
      }
    });
    createNode({
      mother: base2,
      text: "프로젝트\n진행",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(titleSize) + ea,
        fontWeight: String(titleWeight),
        color: colorExtended.black,
        lineHeight: String(titleLineHeight),
        top: String(titleVisualTop) + ea,
        width: String(titleAreaWidth) + ea,
      }
    });
    createNode({
      mother: base2,
      style: {
        display: "inline-flex",
        position: "relative",
        width: withOut(numberAreaWidth + titleAreaWidth, ea),
        height: String(blockHeight1) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(blockBorderRaidus) + "px",
        border: "2px solid " + colorExtended.warmGray0,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            top: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            top: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            bottom: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            bottom: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          text: "고객과 소통하며 디자인에 따라 시공 및 스타일링을 제안, 운영합니다.\n시공 포함된 프로젝트의 경우, 디자이너는 시공사 선택에 도움을 주고\n시공 디자인에 필요한 역할을 수행합니다.",
          style: {
            display: "block",
            position: "relative",
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(descriptionWeight),
            color: colorExtended.black,
            lineHeight: String(descriptionLineHeight),
            textAlign: "center",
          }
        },
      ],
    });

    // 4
    createNode({
      mother: base3,
      text: String(4),
      style: {
        display: "inline-block",
        position: "relative",
        fontFamily: "graphik",
        fontSize: String(numberSize) + ea,
        fontWeight: String(numberWeight),
        color: colorExtended.warmGray2,
        top: String(numberTop) + ea,
        width: String(numberAreaWidth) + ea,
        left: String(numberLeft3) + ea,
      }
    });
    createNode({
      mother: base3,
      text: "프로젝트\n종료",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(titleSize) + ea,
        fontWeight: String(titleWeight),
        color: colorExtended.black,
        lineHeight: String(titleLineHeight),
        top: String(titleVisualTop) + ea,
        width: String(titleAreaWidth) + ea,
      }
    });
    createNode({
      mother: base3,
      style: {
        display: "inline-flex",
        position: "relative",
        width: withOut(numberAreaWidth + titleAreaWidth, ea),
        height: String(blockHeight1) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(blockBorderRaidus) + "px",
        border: "2px solid " + colorExtended.warmGray0,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            top: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            top: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            bottom: String(pinMargin) + ea,
            left: String(pinMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(pinWidth) + ea,
            height: String(pinWidth) + ea,
            borderRadius: String(pinWidth) + ea,
            border: "1px solid " + colorExtended.warmGray2,
            background: colorExtended.warmGrayMiddle,
            bottom: String(pinMargin) + ea,
            right: String(pinMargin) + ea,
          }
        },
        {
          text: "스타일링이 완성된 현장의 사진을 촬영합니다.\n해당 이미지는 포트폴리오 콘텐츠를 발행하는데 활용됩니다.\n사진 촬영과 동시에 최종 검수를 마친 후 프로젝트를 종료합니다.",
          style: {
            display: "block",
            position: "relative",
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(descriptionWeight),
            color: colorExtended.black,
            lineHeight: String(descriptionLineHeight),
            textAlign: "center",
          }
        },
      ],
    });

  } catch (e) {
    console.log(e);
  }
}

AspirantExplanationJs.prototype.insertSixthBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong, colorExtended, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const position0ReviewClassName = "position0ReviewClassName";
  const position0DesignerClassName = "position0DesignerClassName";
  const position0ImageClassName = "position0ImageClassName";
  const position1ReviewClassName = "position1ReviewClassName";
  const position1DesignerClassName = "position1DesignerClassName";
  const position1ImageClassName = "position1ImageClassName";
  const position2ReviewClassName = "position2ReviewClassName";
  const position2DesignerClassName = "position2DesignerClassName";
  const position2ImageClassName = "position2ImageClassName";
  const firstDomClassName = "firstDomClassName";
  const secondDomClassName = "secondDomClassName";
  const thirdDomClassName = "thirdDomClassName";
  try {
    let mainHeight;
    let minusLeft;
    let sixthBase;
    let leftBase, rightBase;
    let pinMargin;
    let pinWidth;
    let arrowMargin;
    let arrowWidth;
    let contentsSize;
    let boxBetween;
    let middleBetween;
    let unitHeight;
    let unitSize, unitWeight;
    let base0, base1, base2, base3;
    let firstWidth, secondWidth;
    let titleSize;
    let numberTop;
    let numberAreaWidth;
    let titleAreaWidth;
    let contentsBase;
    let cardWidth;
    let imageHeight;
    let imageLeft;
    let reviewContents;
    let basePaddingTop;
    let basePaddingBottom;
    let colorTop;
    let whiteBoxBorderRadius;
    let reviewSize, reviewWeight, reviewLineHeight, reviewMarginLeft;
    let reviewBoxWidth;
    let reviewBoldWeight;
    let nameAreaMarginTop;
    let nameAreaMarginLeft;
    let buttonBoxMarginTop;
    let buttonWidth;
    let buttonHeight;
    let buttonTextTop;
    let buttonSize;
    let buttonWeight;

    mainHeight = <%% 900, 900, 900, 900, 900 %%>;
    minusLeft = window.innerWidth - standardWidth + 1;
  
    pinMargin = <%% 16, 16, 12, 10, 16 %%>;
    pinWidth = <%% 6, 6, 5, 4, 6 %%>;

    arrowMargin = <%% 29, 29, 29, 29, 29 %%>;
    arrowWidth = <%% 50, 50, 50, 50, 50 %%>;

    contentsSize = <%% 22, 22, 22, 22, 22 %%>;

    boxBetween = <%% 24, 24, 24, 24, 24 %%>;
    middleBetween = <%% 12, 12, 12, 12, 12 %%>;

    unitHeight = <%% 330, 310, 290, 245, 310 %%>;

    unitSize = <%% 23, 23, 23, 23, 23 %%>;
    unitWeight = <%% 700, 700, 700, 700, 700 %%>;

    firstWidth = <%% 88, 88, 88, 88, 88 %%>;
    secondWidth = <%% 372, 372, 372, 372, 372 %%>;

    titleSize = <%% 23, 23, 23, 23, 23 %%>;
    numberTop = <%% -17, -17, -17, -17, -17 %%>;

    numberAreaWidth = <%% 80, 80, 80, 80, 80 %%>;
    titleAreaWidth = <%% 320, 320, 320, 320, 320 %%>;

    cardWidth = <%% 660, 640, 610, 570, 660 %%>;
    imageHeight = <%% 260, 250, 230, 200, 260 %%>;
    imageLeft = <%% 25, 25, 25, 25, 25 %%>;

    basePaddingTop = <%% 170, 170, 160, 140, 18 %%>;
    basePaddingBottom = <%% 200, 200, 190, 170, 21 %%>;

    colorTop = <%% 200, 200, 200, 200, 200 %%>;

    whiteBoxBorderRadius = <%% 10, 10, 10, 10, 10 %%>;

    reviewSize = <%% 17, 16, 15, 14, 17 %%>;
    reviewWeight = <%% 300, 300, 300, 300, 300 %%>;
    reviewBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
    reviewLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
    reviewMarginLeft = <%% 170, 185, 170, 170, 170 %%>;
    reviewBoxWidth = <%% 400, 400, 400, 400, 400 %%>;
    nameAreaMarginTop = <%% 25, 25, 25, 25, 25 %%>;
    nameAreaMarginLeft = <%% 406, 386, 386, 386, 386 %%>;

    buttonBoxMarginTop = <%% 54, 48, 36, 28, 54 %%>;
    buttonWidth = <%% 110, 90, 80, 80, 110 %%>;
    buttonHeight = <%% 50, 42, 40, 40, 50 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1) %%>;
    buttonSize = <%% 20, 17, 16, 15, 20 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;

    reviewContents = [
      {
        review: [
          "오랜 회사 생활 이후 인생 2막을 준비하던 중이었어요.",
          "주거 인테리어가 경력의 많은 부분을 차지하고 있기 때문에",
          "이쪽으로 특화 시키면 좋겠다 생각했던 찰나,",
          "홈리에종의 디자이너 리크루팅 소식을 접하게 되었어요.",
          "그 후 일사천리로 일이 진행된 것 같아요.",
          "홈리에종과 윈윈하는 관계가 되어 함께 성장해 나가고 싶어요.",
        ],
        designer: "/ 김경수 파트너 디자이너",
        image: AspirantExplanationJs.binaryPath + "/peopleTarget0.png",
      },
      {
        review: [
          "인테리어만 할 때는, 수천만 원 들여서 깔끔히 시공을 해도",
          "나중에 그 모습이 거의 없더라고요.",
          "자식 같은 현장인데 아쉬움이 많이 남았어요.",
          "그래서 홈스타일링 쪽으로 관심을 갖다 홈리에종을 만나서",
          "홈스타일링 디자이너로 발돋움할 수 있었어요.",
          "고객님들의 만족하고, 예쁜 현장을 보면 저도 같이 행복해져요!",
        ],
        designer: "/ 박주령 파트너 디자이너",
        image: AspirantExplanationJs.binaryPath + "/peopleTarget1.png",
      },
      {
        review: [
          "홈리에종만의 특별한 점이 있어요.",
          "다른 매칭 플랫폼과 확연히 다른 홈리에종만의 성격과 결이",
          "정말 특별하다고 생각해요. 단순히 연계만 해주는 것이 아니라",
          "홈리에종의 케어가 함께 한다는 점이 좋은 것 같아요! ",
          "그리고 디자이너로서 새로운 그림을 그려볼 수 있는 기회가 ",
          "많다는 점에서 확실한 특장점이 있고요.",
        ],
        designer: "/ 김소영 파트너 디자이너",
        image: AspirantExplanationJs.binaryPath + "/peopleTarget2.png",
      },
    ]

    sixthBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(basePaddingTop) + ea,
        paddingBottom: String(basePaddingBottom) + ea,
        flexDirection: "column"
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.mainBlue,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * ((-1 * colorTop) + naviHeight), ea),
        }
      }
    });

    // 1
    createNode({
      mother: sixthBase,
      attribute: {
        index: String(0),
      },
      class: [ firstDomClassName ],
      style: {
        display: "flex",
        position: "absolute",
        top: String(basePaddingTop) + ea,
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "center",
        opacity: String(0.6),
        transform: "scale(0.8)",
        transformOrigin: "0% 50%",
        cursor: "pointer",
      },
      child: {
        mother: contentsBase,
        style: {
          display: "flex",
          position: "relative",
          width: String(cardWidth) + ea,
          height: String(unitHeight) + ea,
          borderRadius: String(whiteBoxBorderRadius) + "px",
          boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
          background: colorExtended.gray0,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              width: String(pinWidth) + ea,
              height: String(pinWidth) + ea,
              borderRadius: String(pinWidth) + ea,
              border: "1px solid " + colorExtended.warmGray2,
              background: colorExtended.warmGray1,
              top: String(pinMargin) + ea,
              left: String(pinMargin) + ea,
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              width: String(pinWidth) + ea,
              height: String(pinWidth) + ea,
              borderRadius: String(pinWidth) + ea,
              border: "1px solid " + colorExtended.warmGray2,
              background: colorExtended.warmGray1,
              top: String(pinMargin) + ea,
              right: String(pinMargin) + ea,
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              width: String(pinWidth) + ea,
              height: String(pinWidth) + ea,
              borderRadius: String(pinWidth) + ea,
              border: "1px solid " + colorExtended.warmGray2,
              background: colorExtended.warmGray1,
              bottom: String(pinMargin) + ea,
              left: String(pinMargin) + ea,
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              width: String(pinWidth) + ea,
              height: String(pinWidth) + ea,
              borderRadius: String(pinWidth) + ea,
              border: "1px solid " + colorExtended.warmGray2,
              background: colorExtended.warmGray1,
              bottom: String(pinMargin) + ea,
              right: String(pinMargin) + ea,
            }
          },
          {
            class: [ position0ReviewClassName ],
            text: reviewContents[0].review.join("\n"),
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(reviewSize) + ea,
              fontWeight: String(reviewWeight),
              color: colorChip.black,
              lineHeight: String(reviewLineHeight),
              marginLeft: String(reviewMarginLeft) + ea,
              width: String(reviewBoxWidth) + ea,
            }
          },
          {
            class: [ position0DesignerClassName ],
            text: reviewContents[0].designer,
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(reviewSize) + ea,
              fontWeight: String(reviewBoldWeight),
              color: colorChip.black,
              lineHeight: String(reviewLineHeight),
              marginTop: String(nameAreaMarginTop) + ea,
              marginLeft: String(nameAreaMarginLeft) + ea,
            }
          },
          {
            mode: "img",
            class: [ position0ImageClassName ],
            attribute: {
              src: reviewContents[0].image,
            },
            style: {
              left: String(imageLeft) + ea,
              position: "absolute",
              height: String(imageHeight) + ea,
            }
          },
        ],
      }
    });

    // 2
    createNode({
      mother: sixthBase,
      attribute: {
        index: String(2),
      },
      class: [ secondDomClassName ],
      style: {
        display: "flex",
        position: "absolute",
        top: String(basePaddingTop) + ea,
        width: withOut(0, ea),
        justifyContent: "end",
        alignItems: "center",
        opacity: String(0.6),
        transform: "scale(0.8)",
        transformOrigin: "100% 50%",
        cursor: "pointer",
      },
      child: {
        mother: contentsBase,
        style: {
          display: "flex",
          position: "relative",
          width: String(cardWidth) + ea,
          height: String(unitHeight) + ea,
          borderRadius: String(whiteBoxBorderRadius) + "px",
          boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
          background: colorExtended.gray0,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              width: String(pinWidth) + ea,
              height: String(pinWidth) + ea,
              borderRadius: String(pinWidth) + ea,
              border: "1px solid " + colorExtended.warmGray2,
              background: colorExtended.warmGray1,
              top: String(pinMargin) + ea,
              left: String(pinMargin) + ea,
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              width: String(pinWidth) + ea,
              height: String(pinWidth) + ea,
              borderRadius: String(pinWidth) + ea,
              border: "1px solid " + colorExtended.warmGray2,
              background: colorExtended.warmGray1,
              top: String(pinMargin) + ea,
              right: String(pinMargin) + ea,
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              width: String(pinWidth) + ea,
              height: String(pinWidth) + ea,
              borderRadius: String(pinWidth) + ea,
              border: "1px solid " + colorExtended.warmGray2,
              background: colorExtended.warmGray1,
              bottom: String(pinMargin) + ea,
              left: String(pinMargin) + ea,
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              width: String(pinWidth) + ea,
              height: String(pinWidth) + ea,
              borderRadius: String(pinWidth) + ea,
              border: "1px solid " + colorExtended.warmGray2,
              background: colorExtended.warmGray1,
              bottom: String(pinMargin) + ea,
              right: String(pinMargin) + ea,
            }
          },
          {
            class: [ position2ReviewClassName ],
            text: reviewContents[2].review.join("\n"),
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(reviewSize) + ea,
              fontWeight: String(reviewWeight),
              color: colorChip.black,
              lineHeight: String(reviewLineHeight),
              marginLeft: String(reviewMarginLeft) + ea,
              width: String(reviewBoxWidth) + ea,
            }
          },
          {
            class: [ position2DesignerClassName ],
            text: reviewContents[2].designer,
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(reviewSize) + ea,
              fontWeight: String(reviewBoldWeight),
              color: colorChip.black,
              lineHeight: String(reviewLineHeight),
              marginTop: String(nameAreaMarginTop) + ea,
              marginLeft: String(nameAreaMarginLeft) + ea,
            }
          },
          {
            class: [ position2ImageClassName ],
            mode: "img",
            attribute: {
              src: reviewContents[2].image,
            },
            style: {
              left: String(imageLeft) + ea,
              position: "absolute",
              height: String(imageHeight) + ea,
            }
          },
        ],
      }
    });

    // 3
    createNode({
      mother: sixthBase,
      attribute: {
        index: String(1),
      },
      class: [ thirdDomClassName ],
      event: {
        click: function (e) {
          const self = this;
          const thisBox = self.getBoundingClientRect();
          const leftUnit = ((thisBox.width - cardWidth) / 2);
          const rightUnit = leftUnit + cardWidth;
          const xPosition = e.x - thisBox.left;
          const index = Number(self.getAttribute("index"));
          const position0ReviewDom = document.querySelector(".position0ReviewClassName");
          const position0DesignerDom = document.querySelector(".position0DesignerClassName");
          const position0ImageDom = document.querySelector(".position0ImageClassName");
          const position1ReviewDom = document.querySelector(".position1ReviewClassName");
          const position1DesignerDom = document.querySelector(".position1DesignerClassName");
          const position1ImageDom = document.querySelector(".position1ImageClassName");
          const position2ReviewDom = document.querySelector(".position2ReviewClassName");
          const position2DesignerDom = document.querySelector(".position2DesignerClassName");
          const position2ImageDom = document.querySelector(".position2ImageClassName");
          const firstDom = document.querySelector("." + firstDomClassName);
          const secondDom = document.querySelector("." + secondDomClassName);
          const thirdDom = document.querySelector("." + thirdDomClassName);

          homeliaisonAnalytics({
            page: instance.pageName,
            standard: instance.firstPageViewTime,
            action: "aspirantReviewBlockClick",
            data: {
              delta: (new Date()).valueOf() - instance.firstPageViewTime.valueOf(),
              date: new Date(),
            },
          }).catch((err) => {
            console.log(err);
          });

          firstDom.style.transition = "all 0.5s ease";
          secondDom.style.transition = "all 0.5s ease";
          thirdDom.style.transition = "all 0.5s ease";

          firstDom.style.opacity = String(0.3);
          secondDom.style.opacity = String(0.3);
          thirdDom.style.opacity = String(0.8);

          if (xPosition <= leftUnit) {

            position0ReviewDom.style.animation = "fadeoutlite 0.5s ease forwards";
            position0DesignerDom.style.animation = "fadeoutlite 0.5s ease forwards";
            position0ImageDom.style.animation = "fadeoutlite 0.5s ease forwards";
  
            position1ReviewDom.style.animation = "fadeoutlite 0.5s ease forwards";
            position1DesignerDom.style.animation = "fadeoutlite 0.5s ease forwards";
            position1ImageDom.style.animation = "fadeoutlite 0.5s ease forwards";
  
            position2ReviewDom.style.animation = "fadeoutlite 0.5s ease forwards";
            position2DesignerDom.style.animation = "fadeoutlite 0.5s ease forwards";
            position2ImageDom.style.animation = "fadeoutlite 0.5s ease forwards";

            if (index === 1) {
              setQueue(() => {
                position0ReviewDom.textContent = "";
                position0DesignerDom.textContent = "";
                position0ReviewDom.insertAdjacentHTML("beforeend", reviewContents[1].review.join("<br>"));
                position0DesignerDom.insertAdjacentHTML("beforeend", reviewContents[1].designer);
                position0ImageDom.setAttribute("src", reviewContents[1].image);
                position0ReviewDom.style.animation = "fadeinlite 0.5s ease forwards";
                position0DesignerDom.style.animation = "fadeinlite 0.5s ease forwards";
                position0ImageDom.style.animation = "fadeinlite 0.5s ease forwards";
  
                position1ReviewDom.textContent = "";
                position1DesignerDom.textContent = "";
                position1ReviewDom.insertAdjacentHTML("beforeend", reviewContents[2].review.join("<br>"));
                position1DesignerDom.insertAdjacentHTML("beforeend", reviewContents[2].designer);
                position1ImageDom.setAttribute("src", reviewContents[2].image);
                position1ReviewDom.style.animation = "fadeinlite 0.5s ease forwards";
                position1DesignerDom.style.animation = "fadeinlite 0.5s ease forwards";
                position1ImageDom.style.animation = "fadeinlite 0.5s ease forwards";
  
                position2ReviewDom.textContent = "";
                position2DesignerDom.textContent = "";
                position2ReviewDom.insertAdjacentHTML("beforeend", reviewContents[0].review.join("<br>"));
                position2DesignerDom.insertAdjacentHTML("beforeend", reviewContents[0].designer);
                position2ImageDom.setAttribute("src", reviewContents[0].image);
                position2ReviewDom.style.animation = "fadeinlite 0.5s ease forwards";
                position2DesignerDom.style.animation = "fadeinlite 0.5s ease forwards";
                position2ImageDom.style.animation = "fadeinlite 0.5s ease forwards";
  
                firstDom.style.opacity = String(0.6);
                secondDom.style.opacity = String(0.6);
                thirdDom.style.opacity = String(1);

                self.setAttribute("index", String(2));
              }, 500);
            } else if (index === 2) {
              setQueue(() => {
                position0ReviewDom.textContent = "";
                position0DesignerDom.textContent = "";
                position0ReviewDom.insertAdjacentHTML("beforeend", reviewContents[2].review.join("<br>"));
                position0DesignerDom.insertAdjacentHTML("beforeend", reviewContents[2].designer);
                position0ImageDom.setAttribute("src", reviewContents[2].image);
                position0ReviewDom.style.animation = "fadeinlite 0.5s ease forwards";
                position0DesignerDom.style.animation = "fadeinlite 0.5s ease forwards";
                position0ImageDom.style.animation = "fadeinlite 0.5s ease forwards";
  
                position1ReviewDom.textContent = "";
                position1DesignerDom.textContent = "";
                position1ReviewDom.insertAdjacentHTML("beforeend", reviewContents[0].review.join("<br>"));
                position1DesignerDom.insertAdjacentHTML("beforeend", reviewContents[0].designer);
                position1ImageDom.setAttribute("src", reviewContents[0].image);
                position1ReviewDom.style.animation = "fadeinlite 0.5s ease forwards";
                position1DesignerDom.style.animation = "fadeinlite 0.5s ease forwards";
                position1ImageDom.style.animation = "fadeinlite 0.5s ease forwards";
  
                position2ReviewDom.textContent = "";
                position2DesignerDom.textContent = "";
                position2ReviewDom.insertAdjacentHTML("beforeend", reviewContents[1].review.join("<br>"));
                position2DesignerDom.insertAdjacentHTML("beforeend", reviewContents[1].designer);
                position2ImageDom.setAttribute("src", reviewContents[1].image);
                position2ReviewDom.style.animation = "fadeinlite 0.5s ease forwards";
                position2DesignerDom.style.animation = "fadeinlite 0.5s ease forwards";
                position2ImageDom.style.animation = "fadeinlite 0.5s ease forwards";
  
                firstDom.style.opacity = String(0.6);
                secondDom.style.opacity = String(0.6);
                thirdDom.style.opacity = String(1);

                self.setAttribute("index", String(0));
              }, 500);
            } else {
              setQueue(() => {
                position0ReviewDom.textContent = "";
                position0DesignerDom.textContent = "";
                position0ReviewDom.insertAdjacentHTML("beforeend", reviewContents[0].review.join("<br>"));
                position0DesignerDom.insertAdjacentHTML("beforeend", reviewContents[0].designer);
                position0ImageDom.setAttribute("src", reviewContents[0].image);
                position0ReviewDom.style.animation = "fadeinlite 0.5s ease forwards";
                position0DesignerDom.style.animation = "fadeinlite 0.5s ease forwards";
                position0ImageDom.style.animation = "fadeinlite 0.5s ease forwards";
  
                position1ReviewDom.textContent = "";
                position1DesignerDom.textContent = "";
                position1ReviewDom.insertAdjacentHTML("beforeend", reviewContents[1].review.join("<br>"));
                position1DesignerDom.insertAdjacentHTML("beforeend", reviewContents[1].designer);
                position1ImageDom.setAttribute("src", reviewContents[1].image);
                position1ReviewDom.style.animation = "fadeinlite 0.5s ease forwards";
                position1DesignerDom.style.animation = "fadeinlite 0.5s ease forwards";
                position1ImageDom.style.animation = "fadeinlite 0.5s ease forwards";
  
                position2ReviewDom.textContent = "";
                position2DesignerDom.textContent = "";
                position2ReviewDom.insertAdjacentHTML("beforeend", reviewContents[2].review.join("<br>"));
                position2DesignerDom.insertAdjacentHTML("beforeend", reviewContents[2].designer);
                position2ImageDom.setAttribute("src", reviewContents[2].image);
                position2ReviewDom.style.animation = "fadeinlite 0.5s ease forwards";
                position2DesignerDom.style.animation = "fadeinlite 0.5s ease forwards";
                position2ImageDom.style.animation = "fadeinlite 0.5s ease forwards";
  
                firstDom.style.opacity = String(0.6);
                secondDom.style.opacity = String(0.6);
                thirdDom.style.opacity = String(1);

                self.setAttribute("index", String(1));
              }, 500);
            }
          } else {

            position0ReviewDom.style.animation = "fadeoutlite2 0.5s ease forwards";
            position0DesignerDom.style.animation = "fadeoutlite2 0.5s ease forwards";
            position0ImageDom.style.animation = "fadeoutlite2 0.5s ease forwards";
  
            position1ReviewDom.style.animation = "fadeoutlite2 0.5s ease forwards";
            position1DesignerDom.style.animation = "fadeoutlite2 0.5s ease forwards";
            position1ImageDom.style.animation = "fadeoutlite2 0.5s ease forwards";
  
            position2ReviewDom.style.animation = "fadeoutlite2 0.5s ease forwards";
            position2DesignerDom.style.animation = "fadeoutlite2 0.5s ease forwards";
            position2ImageDom.style.animation = "fadeoutlite2 0.5s ease forwards";

            if (index === 1) {
              setQueue(() => {
                position0ReviewDom.textContent = "";
                position0DesignerDom.textContent = "";
                position0ReviewDom.insertAdjacentHTML("beforeend", reviewContents[2].review.join("<br>"));
                position0DesignerDom.insertAdjacentHTML("beforeend", reviewContents[2].designer);
                position0ImageDom.setAttribute("src", reviewContents[2].image);
                position0ReviewDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position0DesignerDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position0ImageDom.style.animation = "fadeinlite2 0.5s ease forwards";
  
                position1ReviewDom.textContent = "";
                position1DesignerDom.textContent = "";
                position1ReviewDom.insertAdjacentHTML("beforeend", reviewContents[0].review.join("<br>"));
                position1DesignerDom.insertAdjacentHTML("beforeend", reviewContents[0].designer);
                position1ImageDom.setAttribute("src", reviewContents[0].image);
                position1ReviewDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position1DesignerDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position1ImageDom.style.animation = "fadeinlite2 0.5s ease forwards";
  
                position2ReviewDom.textContent = "";
                position2DesignerDom.textContent = "";
                position2ReviewDom.insertAdjacentHTML("beforeend", reviewContents[1].review.join("<br>"));
                position2DesignerDom.insertAdjacentHTML("beforeend", reviewContents[1].designer);
                position2ImageDom.setAttribute("src", reviewContents[1].image);
                position2ReviewDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position2DesignerDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position2ImageDom.style.animation = "fadeinlite2 0.5s ease forwards";
  
                firstDom.style.opacity = String(0.6);
                secondDom.style.opacity = String(0.6);
                thirdDom.style.opacity = String(1);

                self.setAttribute("index", String(0));
              }, 500);
            } else if (index === 2) {
              setQueue(() => {
                position0ReviewDom.textContent = "";
                position0DesignerDom.textContent = "";
                position0ReviewDom.insertAdjacentHTML("beforeend", reviewContents[0].review.join("<br>"));
                position0DesignerDom.insertAdjacentHTML("beforeend", reviewContents[0].designer);
                position0ImageDom.setAttribute("src", reviewContents[0].image);
                position0ReviewDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position0DesignerDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position0ImageDom.style.animation = "fadeinlite2 0.5s ease forwards";
  
                position1ReviewDom.textContent = "";
                position1DesignerDom.textContent = "";
                position1ReviewDom.insertAdjacentHTML("beforeend", reviewContents[1].review.join("<br>"));
                position1DesignerDom.insertAdjacentHTML("beforeend", reviewContents[1].designer);
                position1ImageDom.setAttribute("src", reviewContents[1].image);
                position1ReviewDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position1DesignerDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position1ImageDom.style.animation = "fadeinlite2 0.5s ease forwards";
  
                position2ReviewDom.textContent = "";
                position2DesignerDom.textContent = "";
                position2ReviewDom.insertAdjacentHTML("beforeend", reviewContents[2].review.join("<br>"));
                position2DesignerDom.insertAdjacentHTML("beforeend", reviewContents[2].designer);
                position2ImageDom.setAttribute("src", reviewContents[2].image);
                position2ReviewDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position2DesignerDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position2ImageDom.style.animation = "fadeinlite2 0.5s ease forwards";
  
                firstDom.style.opacity = String(0.6);
                secondDom.style.opacity = String(0.6);
                thirdDom.style.opacity = String(1);

                self.setAttribute("index", String(1));
              }, 500);
            } else {
              setQueue(() => {
                position0ReviewDom.textContent = "";
                position0DesignerDom.textContent = "";
                position0ReviewDom.insertAdjacentHTML("beforeend", reviewContents[1].review.join("<br>"));
                position0DesignerDom.insertAdjacentHTML("beforeend", reviewContents[1].designer);
                position0ImageDom.setAttribute("src", reviewContents[1].image);
                position0ReviewDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position0DesignerDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position0ImageDom.style.animation = "fadeinlite2 0.5s ease forwards";
  
                position1ReviewDom.textContent = "";
                position1DesignerDom.textContent = "";
                position1ReviewDom.insertAdjacentHTML("beforeend", reviewContents[2].review.join("<br>"));
                position1DesignerDom.insertAdjacentHTML("beforeend", reviewContents[2].designer);
                position1ImageDom.setAttribute("src", reviewContents[2].image);
                position1ReviewDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position1DesignerDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position1ImageDom.style.animation = "fadeinlite2 0.5s ease forwards";
  
                position2ReviewDom.textContent = "";
                position2DesignerDom.textContent = "";
                position2ReviewDom.insertAdjacentHTML("beforeend", reviewContents[0].review.join("<br>"));
                position2DesignerDom.insertAdjacentHTML("beforeend", reviewContents[0].designer);
                position2ImageDom.setAttribute("src", reviewContents[0].image);
                position2ReviewDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position2DesignerDom.style.animation = "fadeinlite2 0.5s ease forwards";
                position2ImageDom.style.animation = "fadeinlite2 0.5s ease forwards";
  
                firstDom.style.opacity = String(0.6);
                secondDom.style.opacity = String(0.6);
                thirdDom.style.opacity = String(1);

                self.setAttribute("index", String(2));
              }, 500);
            }
          }
        }
      },
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      },
      child: {
        mother: contentsBase,
        style: {
          display: "flex",
          position: "relative",
          width: String(cardWidth) + ea,
          height: String(unitHeight) + ea,
          borderRadius: String(whiteBoxBorderRadius) + "px",
          boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
          background: colorExtended.gray0,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              width: String(pinWidth) + ea,
              height: String(pinWidth) + ea,
              borderRadius: String(pinWidth) + ea,
              border: "1px solid " + colorExtended.warmGray2,
              background: colorExtended.warmGray1,
              top: String(pinMargin) + ea,
              left: String(pinMargin) + ea,
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              width: String(pinWidth) + ea,
              height: String(pinWidth) + ea,
              borderRadius: String(pinWidth) + ea,
              border: "1px solid " + colorExtended.warmGray2,
              background: colorExtended.warmGray1,
              top: String(pinMargin) + ea,
              right: String(pinMargin) + ea,
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              width: String(pinWidth) + ea,
              height: String(pinWidth) + ea,
              borderRadius: String(pinWidth) + ea,
              border: "1px solid " + colorExtended.warmGray2,
              background: colorExtended.warmGray1,
              bottom: String(pinMargin) + ea,
              left: String(pinMargin) + ea,
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              width: String(pinWidth) + ea,
              height: String(pinWidth) + ea,
              borderRadius: String(pinWidth) + ea,
              border: "1px solid " + colorExtended.warmGray2,
              background: colorExtended.warmGray1,
              bottom: String(pinMargin) + ea,
              right: String(pinMargin) + ea,
            }
          },
          {
            class: [ position1ReviewClassName ],
            text: reviewContents[1].review.join("\n"),
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(reviewSize) + ea,
              fontWeight: String(reviewWeight),
              color: colorChip.black,
              lineHeight: String(reviewLineHeight),
              marginLeft: String(reviewMarginLeft) + ea,
              width: String(reviewBoxWidth) + ea,
            }
          },
          {
            class: [ position1DesignerClassName ],
            text: reviewContents[1].designer,
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(reviewSize) + ea,
              fontWeight: String(reviewBoldWeight),
              color: colorChip.black,
              lineHeight: String(reviewLineHeight),
              marginTop: String(nameAreaMarginTop) + ea,
              marginLeft: String(nameAreaMarginLeft) + ea,
            }
          },
          {
            class: [ position1ImageClassName ],
            mode: "img",
            attribute: {
              src: reviewContents[1].image,
            },
            style: {
              left: String(imageLeft) + ea,
              position: "absolute",
              height: String(imageHeight) + ea,
            }
          },
        ],
      }
    });

    // button
    createNode({
      mother: sixthBase,
      event: {
        selectstart: (e) => { e.preventDefault() },
        click: (e) => {
          homeliaisonAnalytics({
            page: instance.pageName,
            standard: instance.firstPageViewTime,
            action: "aspirantTopButtonClick",
            data: {
              delta: (new Date()).valueOf() - instance.firstPageViewTime.valueOf(),
              date: new Date(),
            },
          }).then(() => {
            GeneralJs.scrollTo(window, 0);
          }).catch((err) => {
            console.log(err);
          });
        }
      },
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(buttonBoxMarginTop) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",    
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            background: colorChip.black,
            borderRadius: String(buttonHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          child: {
            text: "TOP",
            event: {
              selectstart: (e) => { e.preventDefault() },
            },
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(buttonSize) + ea,
              fontWeight: String(buttonWeight),
              color: colorExtended.white,
            }
          }
        }
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

AspirantExplanationJs.prototype.resizeEvent = function () {
  const instance = this;
  const { homeliaisonAnalytics } = GeneralJs;
  this.resizeStack = 0;
  this.resizeFrom = 0;
  this.resizePopup = 0;
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

AspirantExplanationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, dateToString, homeliaisonAnalytics } = GeneralJs;
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true");
    const normalMode = (entireMode && getObj.normal === "true");
    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "aspirantExplanation",
      client: null,
      base: {
        instance: this,
        binaryPath: AspirantExplanationJs.binaryPath,
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
          await instance.insertFourthBox();
          await instance.insertFifthBox();
          await instance.insertSixthBox();
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
          await GeneralJs.ajaxJson({ message: "AspirantExplanationJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "AspirantExplanationJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
