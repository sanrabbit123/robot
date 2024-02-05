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
    warmGray0: "#faf7f2",
    warmGray1: "#f3f0e9",
    warmGray2: "#d6d3cb",
    yellowLine: "#cc921f",
  }
}

AspirantExplanationJs.binaryPath = "/middle/aspirant";

AspirantExplanationJs.prototype.insertInitBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong, colorExtended, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    let minusLeft;
    let firstBase;
    let leftRightWidth;
    let titleHeight;
    let plusRatio;
    let plusWidth;

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    plusRatio = 0.5;

    plusWidth = ((leftRightWidth * plusRatio) * 2) + standardWidth

    titleHeight = 172;

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
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(8) + ea,
        opacity: String(0),
        transform: "translateY(10px)",
        animation: "1.2s ease 0.4s 1 normal forwards running fadeupdelay",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",    
            width: String(180) + ea,
            height: String(54) + ea,
            background: colorChip.black,
            borderRadius: String(54) + ea,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
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

    contentsSize = 22;

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
            fontSize: String(37) + ea,
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
            borderRadius: String(16) + "px",
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
            borderRadius: String(16) + "px",
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

    mainHeight = 900;
    minusLeft = window.innerWidth - standardWidth + 1;
  
    pinMargin = 16;
    pinWidth = 6;

    arrowMargin = 29;
    arrowWidth = 50;

    contentsSize = 22;

    boxBetween = 24;
    middleBetween = 16;

    unitHeight = 192;

    unitSize = 23;
    unitWeight = 700;

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
          background: colorExtended.warmGray2,
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
            fontSize: String(37) + ea,
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
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(16) + "px",
        border: "4px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray0,
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
          text: "다른 플랫폼과 다른 점은 무엇인가요?",
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
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(16) + "px",
        border: "4px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray0,
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
          text: "홈리에종의 홈스타일링 서비스란?",
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
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        borderRadius: String(16) + "px",
        border: "4px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray0,
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
          text: "직접 고객 유치를 하지 않아도 되나요?",
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
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(16) + "px",
        border: "4px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray0,
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
          text: "최소 활동 조건이 있나요?",
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
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(16) + "px",
        border: "4px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray0,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
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
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        borderRadius: String(16) + "px",
        border: "4px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray0,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
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

    unitBetween = 50;

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
            fontSize: String(37) + ea,
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

    mainHeight = 900;
    minusLeft = window.innerWidth - standardWidth + 1;
  
    pinMargin = 16;
    pinWidth = 6;

    arrowMargin = 29;
    arrowWidth = 50;

    contentsSize = 22;

    boxBetween = 24;
    middleBetween = 16;

    unitHeight = 192;

    unitSize = 23;
    unitWeight = 700;

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
          background: colorExtended.warmGray0,
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
            fontSize: String(37) + ea,
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
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(16) + "px",
        border: "4px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray0,
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
          text: "다른 플랫폼과 다른 점은 무엇인가요?",
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
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(16) + "px",
        border: "4px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray0,
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
          text: "홈리에종의 홈스타일링 서비스란?",
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
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        borderRadius: String(16) + "px",
        border: "4px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray0,
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
          text: "직접 고객 유치를 하지 않아도 되나요?",
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
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(16) + "px",
        border: "4px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray0,
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
          text: "최소 활동 조건이 있나요?",
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
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        marginBottom: String(middleBetween) + ea,
        borderRadius: String(16) + "px",
        border: "4px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray0,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
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
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(unitHeight) + ea,
        borderRadius: String(16) + "px",
        border: "4px solid " + colorExtended.warmGray1,
        boxShadow: "0px 5px 18px -9px " + colorExtended.darkShadow,
        background: colorExtended.warmGray0,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
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

AspirantExplanationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();

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
