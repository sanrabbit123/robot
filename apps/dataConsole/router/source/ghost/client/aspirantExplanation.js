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
  const { ea, media, baseTong, colorExtended, standardWidth, totalContents } = this;
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

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    plusRatio = 0.5;

    plusWidth = ((leftRightWidth * plusRatio) * 2) + standardWidth

    titleHeight = 170;

    whitePopupWidth = 1200;
    whitePopupHeight = window.innerHeight - 72 - (72 * 2);

    pinMargin = 16;
    pinWidth = 6;

    this.totalContents = document.querySelector("#totalcontents");
    this.totalContents.style.overflow = "hidden";
    this.totalContents.style.background = colorExtended.mainBlue;
    document.body.style.background = colorExtended.mainBlue;

    firstBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(72) + ea,
        flexDirection: "column",
        paddingBottom: String(210) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: String(-200 + 72) + ea,
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.mainBlue,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * (-200 + 72), ea),
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
      },
      children: [
        {
          mode: "img",
          attribute: {
            src: AspirantExplanationJs.binaryPath + "/titleSvg0.svg",
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
        marginTop: String(16) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
      },
      children: [
        {
          text: "홈리에종 디자이너 파트너십 지원",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(300),
            fontSize: String(19) + ea,
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
        marginTop: String(190) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0.2s 1 normal forwards running fadeupdelay2",
      },
      children: [
        {
          mode: "img",
          attribute: {
            src: AspirantExplanationJs.binaryPath + "/mainIllust0.png",
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
                top: "calc(calc(50% - " + String(whitePopupHeight / 2) + ea + ") + " + String(72 / 2) + "px" + ")",
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
            })


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
        marginTop: String(8) + ea,
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
            width: String(180) + ea,
            height: String(50) + ea,
            background: colorChip.black,
            borderRadius: String(50) + ea,
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
              top: String(-1) + ea,
              fontSize: String(20) + ea,
              fontWeight: String(700),
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
  const { ea, media, baseTong, colorExtended, standardWidth } = this;
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

    mainHeight = 480;
    minusLeft = window.innerWidth - standardWidth + 1;
  
    pinMargin = 20;
    pinWidth = 9;

    arrowMargin = 29;
    arrowWidth = 50;

    contentsSize = 21;

    boxBetween = 24;

    secondBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(180) + ea,
        paddingBottom: String(210) + ea,
        flexDirection: "column"
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.black,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * (-200 + 72), ea),
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
            fontWeight: String(800),
            fontSize: String(35) + ea,
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
        marginTop: String(6) + ea,
      },
      children: [
        {
          text: "이런 기회가 주어져요.",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.white,
            fontWeight: String(300),
            fontSize: String(19) + ea,
            opacity: String(0.7),
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
        marginTop: String(64) + ea,
        height: String(mainHeight) + ea,
        flexDirection: "row",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            marginRight: String(boxBetween) + ea,
            width: "calc(calc(100% - " + String(boxBetween) + ea + ") / " + String(2) + ")",
            height: withOut(0, ea),
            borderRadius: String(10) + "px",
            border: "1px solid " + colorExtended.darkShadow,
            boxShadow: "0px 5px 21px -9px " + colorExtended.ultimateBlack,
            background: colorExtended.black,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: "calc(calc(100% - " + String(boxBetween) + ea + ") / " + String(2) + ")",
            height: withOut(0, ea),
            borderRadius: String(10) + "px",
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
            fontWeight: String(700),
            fontSize: String(29) + ea,
          },
          bold: {
            color: colorExtended.mainBlue,
            fontWeight: String(900),
            fontSize: String(29) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorExtended.mainBlue,
            width: String(6) + ea,
            height: String(6) + ea,
            borderRadius: String(6) + ea,
            top: String(-2) + ea,
            left: String(149) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorExtended.mainBlue,
            width: String(6) + ea,
            height: String(6) + ea,
            borderRadius: String(6) + ea,
            top: String(-2) + ea,
            left: String(173) + ea,
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
            paddingBottom: String(4) + ea,
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
        marginTop: String(12) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            borderBottom: "1px solid " + colorChip.shadow,
            paddingBottom: String(4) + ea,
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
        marginTop: String(12) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            borderBottom: "1px solid " + colorChip.shadow,
            paddingBottom: String(4) + ea,
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
            fontWeight: String(700),
            fontSize: String(29) + ea,
          },
          bold: {
            color: colorExtended.subYellow,
            fontWeight: String(900),
            fontSize: String(29) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorExtended.subYellow,
            width: String(6) + ea,
            height: String(6) + ea,
            borderRadius: String(6) + ea,
            top: String(-2) + ea,
            left: String(149) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorExtended.subYellow,
            width: String(6) + ea,
            height: String(6) + ea,
            borderRadius: String(6) + ea,
            top: String(-2) + ea,
            left: String(181) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorExtended.subYellow,
            width: String(6) + ea,
            height: String(6) + ea,
            borderRadius: String(6) + ea,
            top: String(-2) + ea,
            left: String(204) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorExtended.subYellow,
            width: String(6) + ea,
            height: String(6) + ea,
            borderRadius: String(6) + ea,
            top: String(-2) + ea,
            left: String(238) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorExtended.subYellow,
            width: String(6) + ea,
            height: String(6) + ea,
            borderRadius: String(6) + ea,
            top: String(-2) + ea,
            left: String(262) + ea,
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
            paddingBottom: String(4) + ea,
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
        marginTop: String(12) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            borderBottom: "1px solid " + colorChip.shadow,
            paddingBottom: String(4) + ea,
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
        marginTop: String(12) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            borderBottom: "1px solid " + colorChip.shadow,
            paddingBottom: String(4) + ea,
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
  const { ea, media, baseTong, colorExtended, standardWidth, totalContents } = this;
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

    mainHeight = 900;
    minusLeft = window.innerWidth - standardWidth + 1;
  
    pinMargin = 15;
    pinWidth = 6;

    arrowMargin = 29;
    arrowWidth = 50;

    contentsSize = 22;

    boxBetween = 24;
    middleBetween = 16;

    unitHeight = 184;

    unitSize = 22;
    unitWeight = 700;

    contentsText = [
      [
        "많은 서비스가 있지만 유일한 시스템을 갖춘 서비스는 다릅니다.",
        "홈리에종은 홈스타일링 전문 플랫폼으로 단순히 소비자 연결만 하지 않습니다.",
        "고객 중심의 인테리어를 추구하며 IT 기반에서 체계적으로 프로젝트를 케어하고,",
        "다양한 인프라 지원으로(직영 시공사, 성장지원 교육, 포트폴리오 개설)",
        "디자이너와 함께 성장합니다.",
      ],
      [
        "시공 중심이 아니라 고객 중심입니다. 고객의 예산, 제한 기간,",
        "공간 상태, 취향을 고려하여 시공의 난이도를 정하고 스타일링까지 ",
        "완료합니다. 모든 주거 공간은 도배나 욕실 뿐만 아니라 가구, 베딩, 커튼 등의",
        "제품 세팅까지  일관성 있게 마무리할 때 인테리어가 잘 된 것입니다. ",
        "현재 ‘인테리어’라는 단어는 ‘리모델링(=시공)’에 국한되고 있으나",
        "진정한 인테리어는 시공과 스타일링을 포함합니다. ",
        "홈리에종의 홈스타일링 서비스는 예산에 맞는 스타일링과 필요 시공을 의미합니다. ",
        "공간의 노후도에 따라 필요 시공이 전체 영역일 수도 있고, 예산에 따라 하이엔드 시공을 ",
        "기대하면서 전문가의 수준 높은 안목을 기대하는 고객님도 찾아오십니다.",
      ],
      [
        "고객 유치는 홈리에종이 합니다. ",
        "홈리에종의 방향성에 기대감을 가지신 고객님들을 유치하기 위해 노력하고 있습니다. ",
        "디자이너님은 디자이너로서의 역량을 키워가는 것에 집중해주세요. ",
        "커뮤니케이션 능력이 탁월하고 디자인 아이덴티티가 매력적이라면 좋은 고객을 꾸준히 ",
        "만나는 것은 점점 쉬워집니다 :) 함께 즐겁게 성장해요!",
      ],
      [
        "스타일링 경험 혹은 역량 확인이 필수입니다. ",
        "1개 이상의 포트폴리오(실제 현장 사진)이 있거나 1개 이상의 홈퍼니싱",
        "3D 작업 역량이 확인되어야 합니다.",
        "홈리에종의 모든 프로젝트는 시공 위주의 견적 제출, 단순 견적 비교를 지양하고",
        "고객의 예산 및 조건을 고려하여 시공의 난이도를 조정하면서 스타일링까지 완성해야 합니다.",
        "시공 역량 수준에 맞추어 고객 매칭이 이루어지며",
        "스타일링에 대한 최소 경험 혹은 역량은 필수입니다.",
      ],
      [
        "네 :) 홈리에종은 인테리어 업계의 새로운 문화를 만들어가는 개척 기업입니다. ",
        "3가지 모두 동의하시면 신청서를 남겨주세요.",
        "",
        "1. 주거 인테리어에 대한 새로운 접근 방법에 대한 공감",
        "2. 최소한의 스타일링 역량 (포트폴리오 혹은 3D 역량)",
        "3. 발전과 학습에 대한 강한 의지 및 관심",
      ],
      [
        "홈리에종은 디자이너님의 역량과 상세 컨디션을 사전에 확인해 꼭 맞는 매칭을 해드립니다.",
        "디자이너의 어려움을 교육 및 가이드 제공을 통해 개선하고, 시공사도 지원해드립니다.",
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
              top: String(thisBox.top + window.scrollY + 190 + 18) + "px",
              left: String(thisBox.left) + ea,
              width: String(thisBox.width - (30 * 2)) + "px",
              padding: String(30) + ea,
              paddingTop: String(24) + ea,
              paddingBottom: String(24) + ea,
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
                width: String(16) + ea,
                top: String(-16) + ea,
                right: String(0) + ea,
                transform: "rotate(180deg)",
              }
            }
          });

          createNode({
            mother: blockPrompt,
            text: targetContents,
            style: {
              fontSize: String(16) + ea,
              fontWeight: String(500),
              color: colorChip.white,
              lineHeight: String(1.6),
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
        paddingTop: String(180) + ea,
        paddingBottom: String(210) + ea,
        flexDirection: "column"
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.gray0,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * (-200 + 72), ea),
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
            fontWeight: String(800),
            fontSize: String(35) + ea,
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
        marginTop: String(6) + ea,
      },
      children: [
        {
          text: "FAQ",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(300),
            fontSize: String(19) + ea,
            opacity: String(0.7),
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
        marginTop: String(64) + ea,
        flexDirection: "row",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            marginRight: String(boxBetween) + ea,
            width: "calc(calc(100% - " + String(boxBetween) + ea + ") / " + String(2) + ")",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: "calc(calc(100% - " + String(boxBetween) + ea + ") / " + String(2) + ")",
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
        borderRadius: String(10) + "px",
        border: "3px solid " + colorExtended.warmGray1,
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
          text: "다른 플랫폼과 다른 점은 무엇인가요?",
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            display: "inline-block",
            position: "relative",
            top: String(-1) + ea,
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
        borderRadius: String(10) + "px",
        border: "3px solid " + colorExtended.warmGray1,
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
          text: "홈리에종의 홈스타일링 서비스란?",
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            display: "inline-block",
            position: "relative",
            top: String(-1) + ea,
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
        borderRadius: String(10) + "px",
        border: "3px solid " + colorExtended.warmGray1,
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
          text: "직접 고객 유치를 하지 않아도 되나요?",
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            display: "inline-block",
            position: "relative",
            top: String(-1) + ea,
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
        borderRadius: String(10) + "px",
        border: "3px solid " + colorExtended.warmGray1,
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
          text: "최소 활동 조건이 있나요?",
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            display: "inline-block",
            position: "relative",
            top: String(-1) + ea,
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
        borderRadius: String(10) + "px",
        border: "3px solid " + colorExtended.warmGray1,
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
          text: "스타일링을 많이 해 본 건 아닌데\n저도 일할 수 있을까요?",
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            display: "inline-block",
            position: "relative",
            top: String(-1) + ea,
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
        borderRadius: String(10) + "px",
        border: "3px solid " + colorExtended.warmGray1,
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
          text: "가능 일정이나 지역,시공사 유무에 관계없이\n파트너십이 가능한가요?",
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            display: "inline-block",
            position: "relative",
            top: String(-1) + ea,
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
  const { ea, media, baseTong, colorExtended, standardWidth } = this;
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

    mainHeight = 900;
    minusLeft = window.innerWidth - standardWidth + 1;
  
    pinMargin = 16;
    pinWidth = 7;

    arrowMargin = 29;
    arrowWidth = 50;

    contentsSize = 22;

    boxBetween = 24;
    middleBetween = 16;

    unitHeight = 60;

    unitSize = 20;
    unitWeight = 700;

    unitBetween = 40;

    yellowMargin = 10;

    thirdBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(180) + ea,
        paddingBottom: String(210) + ea,
        flexDirection: "column"
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.warmGray1,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * (-200 + 72), ea),
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
            fontWeight: String(800),
            fontSize: String(35) + ea,
            lineHeight: String(1.4),
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
        marginTop: String(80) + ea,
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
                left: String(190) + ea,
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
                left: String(190 + unitBetween + 190) + ea,
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
                left: String(190 + unitBetween + 190 + unitBetween + 190) + ea,
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
                left: String(190 + unitBetween + 190 + unitBetween + 190 + unitBetween + 310) + ea,
                width: String(160) + ea,
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
                width: String(190) + ea,
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
                  top: String(-1) + ea,
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
                width: String(190) + ea,
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
                  top: String(-1) + ea,
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
                width: String(190) + ea,
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
                  top: String(-1) + ea,
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
                width: String(310) + ea,
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
                  top: String(-1) + ea,
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
                width: String(190) + ea,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: String(170) + ea,
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
                    top: String(-1) + ea,
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
  const { ea, media, baseTong, colorExtended, standardWidth } = this;
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

    mainHeight = 900;
    minusLeft = window.innerWidth - standardWidth + 1;
  
    pinMargin = 16;
    pinWidth = 6;

    arrowMargin = 29;
    arrowWidth = 50;

    contentsSize = 22;

    boxBetween = 24;
    middleBetween = 12;

    unitHeight = 192;

    unitSize = 23;
    unitWeight = 700;

    firstWidth = 88;
    secondWidth = 372;

    titleSize = 23;
    numberTop = -17;

    numberAreaWidth = 80;
    titleAreaWidth = 320;

    thirdBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(180) + ea,
        paddingBottom: String(210) + ea,
        flexDirection: "column"
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.gray0,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * (-200 + 72), ea),
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
          text: "서비스 과정을 한 눈에 확인하세요!",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(800),
            fontSize: String(35) + ea,
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
        marginTop: String(6) + ea,
      },
      children: [
        {
          text: "HOMELIAISON SERVICE PROCESS",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(300),
            fontSize: String(19) + ea,
            opacity: String(0.7),
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
        marginTop: String(64) + ea,
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
        fontSize: String(72) + ea,
        fontWeight: String(400),
        color: colorExtended.warmGray2,
        top: String(numberTop) + ea,
        width: String(numberAreaWidth) + ea,
        left: String(7) + ea,
      }
    });
    createNode({
      mother: base0,
      text: "고객의 신청서를 바탕으로\n정보를 수집해요.",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(titleSize) + ea,
        fontWeight: String(600),
        color: colorExtended.black,
        lineHeight: String(1.5),
        top: String(1) + ea,
        width: String(titleAreaWidth) + ea,
      }
    });
    createNode({
      mother: base0,
      style: {
        display: "inline-flex",
        position: "relative",
        width: withOut(numberAreaWidth + titleAreaWidth, ea),
        height: String(140) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(10) + "px",
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
            fontSize: String(19) + ea,
            fontWeight: String(200),
            color: colorExtended.black,
            lineHeight: String(1.6),
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
        fontSize: String(72) + ea,
        fontWeight: String(400),
        color: colorExtended.warmGray2,
        top: String(numberTop) + ea,
        width: String(numberAreaWidth) + ea,
        left: String(2) + ea,
      }
    });
    createNode({
      mother: base1,
      text: "디자이너와 고객의\n매칭",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(titleSize) + ea,
        fontWeight: String(600),
        color: colorExtended.black,
        lineHeight: String(1.5),
        top: String(2) + ea,
        width: String(titleAreaWidth) + ea,
      }
    });
    createNode({
      mother: base1,
      style: {
        display: "inline-flex",
        position: "relative",
        width: withOut(numberAreaWidth + titleAreaWidth, ea),
        height: String(140) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(10) + "px",
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
            fontSize: String(19) + ea,
            fontWeight: String(200),
            color: colorExtended.black,
            lineHeight: String(1.6),
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
        fontSize: String(72) + ea,
        fontWeight: String(400),
        color: colorExtended.warmGray2,
        top: String(numberTop) + ea,
        width: String(numberAreaWidth) + ea,
        left: String(1) + ea,
      }
    });
    createNode({
      mother: base2,
      text: "프로젝트\n진행",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(titleSize) + ea,
        fontWeight: String(600),
        color: colorExtended.black,
        lineHeight: String(1.5),
        top: String(1) + ea,
        width: String(titleAreaWidth) + ea,
      }
    });
    createNode({
      mother: base2,
      style: {
        display: "inline-flex",
        position: "relative",
        width: withOut(numberAreaWidth + titleAreaWidth, ea),
        height: String(180) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(10) + "px",
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
            fontSize: String(19) + ea,
            fontWeight: String(200),
            color: colorExtended.black,
            lineHeight: String(1.6),
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
        fontSize: String(72) + ea,
        fontWeight: String(400),
        color: colorExtended.warmGray2,
        top: String(numberTop) + ea,
        width: String(numberAreaWidth) + ea,
      }
    });
    createNode({
      mother: base3,
      text: "프로젝트\n종료",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(titleSize) + ea,
        fontWeight: String(600),
        color: colorExtended.black,
        lineHeight: String(1.5),
        top: String(1) + ea,
        width: String(titleAreaWidth) + ea,
      }
    });
    createNode({
      mother: base3,
      style: {
        display: "inline-flex",
        position: "relative",
        width: withOut(numberAreaWidth + titleAreaWidth, ea),
        height: String(180) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(10) + "px",
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
            fontSize: String(19) + ea,
            fontWeight: String(200),
            color: colorExtended.black,
            lineHeight: String(1.6),
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
  const { ea, media, baseTong, colorExtended, standardWidth } = this;
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

    mainHeight = 900;
    minusLeft = window.innerWidth - standardWidth + 1;
  
    pinMargin = 16;
    pinWidth = 6;

    arrowMargin = 29;
    arrowWidth = 50;

    contentsSize = 22;

    boxBetween = 24;
    middleBetween = 12;

    unitHeight = 330;

    unitSize = 23;
    unitWeight = 700;

    firstWidth = 88;
    secondWidth = 372;

    titleSize = 23;
    numberTop = -17;

    numberAreaWidth = 80;
    titleAreaWidth = 320;

    cardWidth = 660;
    imageHeight = 260;
    imageLeft = 25;

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
        paddingTop: String(180) + ea,
        paddingBottom: String(210) + ea,
        flexDirection: "column"
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.mainBlue,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * (-200 + 72), ea),
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
        top: String(180) + ea,
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
          borderRadius: String(10) + "px",
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
              fontSize: String(17) + ea,
              fontWeight: String(300),
              color: colorChip.black,
              lineHeight: String(1.6),
              marginLeft: String(170) + ea,
              width: String(400) + ea,
            }
          },
          {
            class: [ position0DesignerClassName ],
            text: reviewContents[0].designer,
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(17) + ea,
              fontWeight: String(700),
              color: colorChip.black,
              lineHeight: String(1.6),
              marginTop: String(25) + ea,
              marginLeft: String(406) + ea,
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
        top: String(180) + ea,
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
          borderRadius: String(10) + "px",
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
              fontSize: String(17) + ea,
              fontWeight: String(300),
              color: colorChip.black,
              lineHeight: String(1.6),
              marginLeft: String(170) + ea,
              width: String(400) + ea,
            }
          },
          {
            class: [ position2DesignerClassName ],
            text: reviewContents[2].designer,
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(17) + ea,
              fontWeight: String(700),
              color: colorChip.black,
              lineHeight: String(1.6),
              marginTop: String(25) + ea,
              marginLeft: String(406) + ea,
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
          borderRadius: String(10) + "px",
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
              fontSize: String(17) + ea,
              fontWeight: String(300),
              color: colorChip.black,
              lineHeight: String(1.6),
              marginLeft: String(170) + ea,
              width: String(400) + ea,
            }
          },
          {
            class: [ position1DesignerClassName ],
            text: reviewContents[1].designer,
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(17) + ea,
              fontWeight: String(700),
              color: colorChip.black,
              lineHeight: String(1.6),
              marginTop: String(25) + ea,
              marginLeft: String(406) + ea,
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

    createNode({
      mother: sixthBase,
      event: {
        selectstart: (e) => { e.preventDefault() },
        click: (e) => { GeneralJs.scrollTo(window, 0) }
      },
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(54) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",    
            width: String(110) + ea,
            height: String(50) + ea,
            background: colorChip.black,
            borderRadius: String(50) + ea,
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
              top: String(-1) + ea,
              fontSize: String(20) + ea,
              fontWeight: String(700),
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

AspirantExplanationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
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
