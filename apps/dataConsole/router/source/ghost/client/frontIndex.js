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
    let subTitleSize, subTitleWeight;
    let firstBasePaddingTop;
    let mobileLeftPaddingVisual;
    let titleSize, titleWeight, titleVisualTop, titleVisualLeft;
    let titleLineHeight;
    let mainTitleBlock, subTitleBlock, imageBlock, boxBlock0, boxBlock1;
    let totalHeight;
    let boxBlock0MarginTop, boxBlock1MarginTop;
    let imageBlockMarginTop, subTitleBlockMarginTop;
    let boxBlockHeight;
    let mainImageWidth;
    let titleLineBoxWidthVisual, titleLineBoxHeight, titleLineBoxTop, titleLineBoxLeft, titleLineBoxOpacity;
    let boxRadius;
    let dotWidth, dotMargin, dotRadius;
    let stepSize, stepWeight, stepTextTop;
    let stepBoldWeight;
    let stepEngSize, stepEngWeight, stepEngTextTop, stepEngMarginRight;
    let firstBoxVisualMarginRight;

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    firstBasePaddingTop = <%% 24, 24, 24, 24, (window.innerHeight < 700 ? 1.5 : 6.5) %%>;
    firstBasePaddingBottom = <%% 160, 160, 160, 120, 20 %%>;

    subTitleSize = <%% 20, 18, 17, 15, 4.3 %%>;
    subTitleWeight = 500;

    titleSize = <%% 50, 48, 43, 36, 7 %%>;
    titleWeight = 700;

    mainImageWidth = 59;
    subTitleBlockMarginTop = 2.7;
    imageBlockMarginTop = 6.5;
    boxBlock0MarginTop = 13;
    boxBlock1MarginTop = 2;
    boxBlockHeight = 20;

    titleLineBoxWidthVisual = -1.5;
    titleLineBoxHeight = 3.5;
    titleLineBoxTop = 5.2;
    titleLineBoxLeft = -1.2;
    titleLineBoxOpacity = 0.8;

    dotWidth = 1.2;
    dotMargin = 2.5;
    dotRadius = 1;

    boxRadius = 15;

    stepSize = 4;
    stepWeight = 500;
    stepBoldWeight = 800;
    stepTextTop = -0.1;

    stepEngSize = 4.5;
    stepEngWeight = 700;
    stepEngTextTop = 0.1;
    stepEngMarginRight = 4.2;
    firstBoxVisualMarginRight = 4.6;

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
              width: withOut(titleLineBoxWidthVisual, ea),
              height: String(titleLineBoxHeight) + ea,
              borderRadius: String(3) + "px",
              background: colorExtended.gradientBlue2,
              top: String(titleLineBoxTop) + ea,
              left: String(titleLineBoxLeft) + ea,
              zIndex: String(-1),
              opacity: String(titleLineBoxOpacity),
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
            fontWeight: String(subTitleWeight),
            fontSize: String(subTitleSize) + ea,
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
            width: String(mainImageWidth) + ea,
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
        borderRadius: String(boxRadius) + "px",
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
            right: String(dotMargin) + ea,
            top: String(dotMargin) + ea,
            width: String(dotWidth) + ea,
            height: String(dotWidth) + ea,
            borderRadius: String(dotRadius) + "px",
            background: colorExtended.blueLight,
          }
        },
        {
          style: {
            position: "absolute",
            right: String(dotMargin) + ea,
            bottom: String(dotMargin) + ea,
            width: String(dotWidth) + ea,
            height: String(dotWidth) + ea,
            borderRadius: String(dotRadius) + "px",
            background: colorExtended.blueLight,
          }
        },
        {
          text: "<b%STEP<u%.%u> 1%b><s%나만의 디자이너%s>를 추천받고",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(stepSize) + ea,
            fontWeight: String(stepWeight),
            color: colorExtended.black,
            fontFamily: "pretendard",
            top: String(stepTextTop) + ea,
            marginRight: String(firstBoxVisualMarginRight) + ea,
          },
          bold: {
            fontSize: String(stepEngSize) + ea,
            fontWeight: String(stepEngWeight),
            color: colorExtended.black,
            fontFamily: "mont",
            position: "relative",
            top: String(stepEngTextTop) + ea,
            marginRight: String(stepEngMarginRight) + ea,
          },
          under: {
            fontSize: String(stepEngSize) + ea,
            fontWeight: String(stepEngWeight),
            color: colorExtended.deactive,
            fontFamily: "mont",
            position: "relative",
          },
          special: {
            fontSize: String(stepSize) + ea,
            fontWeight: String(stepBoldWeight),
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
        borderRadius: String(boxRadius) + "px",
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
            right: String(dotMargin) + ea,
            top: String(dotMargin) + ea,
            width: String(dotWidth) + ea,
            height: String(dotWidth) + ea,
            borderRadius: String(dotRadius) + "px",
            background: colorExtended.blueLight,
          }
        },
        {
          style: {
            position: "absolute",
            right: String(dotMargin) + ea,
            bottom: String(dotMargin) + ea,
            width: String(dotWidth) + ea,
            height: String(dotWidth) + ea,
            borderRadius: String(dotRadius) + "px",
            background: colorExtended.blueLight,
          }
        },
        {
          text: "<b%STEP<u%.%u> 2%b><s%맞춤형 인테리어%s>를 실현해봐요.",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(stepSize) + ea,
            fontWeight: String(stepWeight),
            color: colorExtended.black,
            fontFamily: "pretendard",
            top: String(stepTextTop) + ea,
          },
          bold: {
            fontSize: String(stepEngSize) + ea,
            fontWeight: String(stepEngWeight),
            color: colorExtended.black,
            fontFamily: "mont",
            position: "relative",
            top: String(stepEngTextTop) + ea,
            marginRight: String(stepEngMarginRight) + ea,
          },
          under: {
            fontSize: String(stepEngSize) + ea,
            fontWeight: String(stepEngWeight),
            color: colorExtended.deactive,
            fontFamily: "mont",
            position: "relative",
          },
          special: {
            fontSize: String(stepSize) + ea,
            fontWeight: String(stepBoldWeight),
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
  const { secondBaseClassName } = this;
  try {
    let secondBase;

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
        height: String(200) + ea,
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
    const mobile = media[4];
    const desktop = !mobile;

    this.initAreaClassName = "initAreaClassName";
    this.secondBaseClassName = "secondBaseClassName";

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "frontIndex",
      client: null,
      base: {
        instance: this,
        binaryPath: FrontIndexJs.binaryPath,
        subTitle: "",
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
