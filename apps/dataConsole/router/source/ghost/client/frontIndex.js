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

FrontIndexJs.prototype.generateGsArray = function (number) {
  if (typeof number !== "number") {
    throw new Error("invaild input");
  }
  const instance = this;
  const standard = [
    'g', 's', 's',
    's', 's', 's', 's',
    's', 's', 'g',
    's', 's', 's', 's',
    's', 's', 's', 's',
    's', 's', 'g',
  ];
  let additional;
  let add;
  let multi;
  let result;
  additional = number % standard.length;
  add = standard.slice(0, additional);
  multi = Math.floor(number / standard.length);
  result = [];
  for (let i = 0; i < multi; i++) {
    result = result.concat(JSON.parse(JSON.stringify(standard)));
  }
  result = result.concat(add);
  return result;
}

FrontIndexJs.prototype.insertInitBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass, selectByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight, baseTop, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { initAreaClassName } = this;
  const animationTargetTitleClassName = "animationTargetTitleClassName";
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
    let mobileMargin;
    let paddingVisual;
    let initAreaHeight;
    let firstBaseHalfLeft, firstBaseHalfRight;
    let boxWidth;
    let titleX, titleY;
    let scaleConst;
    let imageMarginTop;
    let imageMarginLeft;
    let mainIllustSvg;
    let titleVisualBottom;

    mainIllustSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 548.4656 387.8559">
    <defs>
      <linearGradient id="Gradient1" x1="0" x2="-1" y1="-1" y2="0">
        <stop class="stop1" offset="0%" />
        <stop class="stop2" offset="25%" />
        <stop class="stop3" offset="100%" />
      </linearGradient>
    <style>
      .stop1 {
        stop-color: rgba(127,159,185,0.8);
      }
      .stop2 {
        stop-color: rgba(155,189,209,0.8);
      }
      .stop3 {
        stop-color: rgba(200,218,227,0.6);
      }
    </style>
    </defs>
    <path fill="url(#Gradient1)" d="M413.7049,55.4116c-10.3407-9.0132-78.7193-40.516-155.9485-12.1091-33.9044,12.4709-73.1454,34.1793-108.2269,51.4999-35.0815,17.3206-52.0337,38.7982-56.978,69.5693-4.2638,26.5353-.641,45.1678,11.1047,71.7108.7096-.9911,28.7903,44.5062,74.0373,72.7254,35.4917,22.1351,115.0259,40.2577,154.5627,29.7529,37.8094-10.0459,82.9747-41.223,109.4625-85.5637,26.5447-44.4361,32.1472-145.1479-28.0138-197.5854Z"/>
    </svg>`;

    minusLeft = window.innerWidth - standardWidth;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    firstBasePaddingTop = <%% 24, 24, 24, 24, (window.innerHeight < 700 ? 1.5 : 6.5) %%>;
    firstBasePaddingBottom = <%% 160, 160, 160, 120, 20 %%>;

    subTitleSize = <%% 21, 18, 17, 15, 4.2 %%>;
    subTitleWeight = desktop ? 300 : 400;

    titleSize = <%% 38, 35, 32, 28, 7 %%>;
    titleWeight = desktop ? 800 : 700;

    mainImageWidth = <%% 590, 475, 410, 345, 59 %%>;
    subTitleBlockMarginTop = <%% 10, 9, 9, 7, 2.6 %%>;
    imageBlockMarginTop = 6.5;
    boxBlock0MarginTop = <%% 50, 50, 45, 36, 13 %%>;
    boxBlock1MarginTop = <%% 6, 6, 6, 6, 2 %%>;
    boxBlockHeight = <%% 90, 82, 72, 62, 20 %%>;

    titleLineBoxWidthVisual = -1.2;
    titleLineBoxHeight = <%% 8, 8, 8, 8, 2.8 %%>;
    titleLineBoxTop = <%% 46, 46, 44, 44, 7.3 %%>;
    titleLineBoxLeft = -1;
    titleLineBoxOpacity = 0.8;

    dotWidth = <%% 6, 6, 4, 4, 1.2 %%>;
    dotMargin = <%% 12, 12, 10, 9, 2.5 %%>;
    dotRadius = 1;

    boxRadius = 15;
    
    stepSize = <%% 17, 16, 15, 14, 4 %%>;
    stepWeight = 500;
    stepBoldWeight = 800;
    stepTextTop = -0.1;

    stepEngSize = <%% 18, 17, 16, 15, 4.5 %%>;
    stepEngWeight = 700;
    stepEngTextTop = <%% 0.5, 0.5, 0.5, 0.5, 0.1 %%>;
    stepEngMarginRight = <%% 8, 8, 8, 8, 4.2 %%>;
    firstBoxVisualMarginRight = 4.6;

    mobileMargin = 6;

    paddingVisual = 15;

    initAreaHeight = <%% 700, 620, 550, 480, 54 %%>;

    boxWidth = <%% 450, 420, 380, 300, 40 %%>;

    titleX = <%% 100, 0, 0, 0, 0 %%>;
    titleY = <%% 160, 150, 130, 110, 160 %%>;

    scaleConst = 1;

    imageMarginTop = <%% 11, 8, 9, 3, 10 %%>;
    imageMarginLeft = <%% 64, 50, 36, 32, 50 %%>;

    titleVisualTop = <%% 6, 3, 3, 3, 1 %%>;
    titleVisualBottom = <%% 8, 4, 4, 4, 8 %%>;

    if (media[0] && window.innerHeight > 1100) {
      initAreaHeight = 780;
      boxWidth = 450;
      scaleConst = 1.06;
      titleX = 72;
      titleY = 180;
      mainImageWidth = 610;
      imageMarginLeft = 71;
      imageMarginTop = -24;
    }

    firstBase = createNode({
      mother: baseTong,
      class: [ initAreaClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: desktop ? "" : String(firstBasePaddingTop) + ea,
        flexDirection: desktop ? "row" : "column",
        paddingBottom: desktop ? "" : String(firstBasePaddingBottom) + ea,
        height: mobile ? "" : String(initAreaHeight) + ea,
      },
    });

    // absolute back
    if (desktop) {
      totalContents.style.background = colorExtended.blueLight;
      baseTong.style.top = String(instance.naviHeight) + "px";
      baseTong.style.paddingTop = String(0) + "px";
      baseTong.style.marginBottom = String(instance.naviHeight) + "px";
      createNode({
        mother: firstBase,
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * (minusLeft / 2)) + ea,
          height: withOut(0, ea),
          width: String(window.innerWidth / 2) + ea,
          background: colorExtended.gradientBlue7,
        }
      });
      createNode({
        mother: firstBase,
        style: {
          position: "absolute",
          top: String(0),
          right: String(-1 * (minusLeft / 2)) + ea,
          height: withOut(0, ea),
          width: String(window.innerWidth / 2) + ea,
          background: colorExtended.white,
        }
      });

      firstBaseHalfLeft = createNode({
        mother: firstBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: withOut(50, titleX, ea),
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          top: String(titleY) + ea,
          height: withOut(titleY, ea),
          left: String(titleX) + ea,
          transformOrigin: "0% 0%",
          transform: "scale(" + String(scaleConst) + ")",
        }
      });

      firstBaseHalfRight = createNode({
        mother: firstBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: withOut(50, 0, ea),
          flexDirection: "column",
          height: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          left: String(titleX) + ea,
        }
      });

    }
  
    // main title
    if (desktop) {
      mainTitleBlock = createNode({
        mother: desktop ? firstBaseHalfLeft : firstBase,
        style: {
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          justifyContent: "start",
          alignItems: "center",
          opacity: String(0),
          transform: "translateY(30px)",
          animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
          paddingLeft: String(4) + ea,
          paddingRight: String(4) + ea,
          paddingTop: desktop ? String(titleVisualTop) + ea : "",
          paddingBottom: desktop ? String(titleVisualBottom) + ea : "",
          borderRadius: desktop ? String(15) + ea : "",
          overflow: "hidden",
          transition: "all 0.3s ease",
        },
        children: [
          {
            style: {
              position: "absolute",
              background: colorExtended.mainBlue,
              width: String(100) + '%',
              bottom: String(0),
              height: String(5) + ea,
              left: String(0) + ea,
              transformOrigin: "0% 50%",
              transform: "scaleX(0)",
              animation: "garoProgress 4s linear infinite",
            }
          },
          {
            class: [ animationTargetTitleClassName ],
            text: "인테리어,",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(titleWeight),
              color: colorExtended.black,
              fontFamily: "pretendard",
              lineHeight: String(titleLineHeight),
              opacity: String(1),
            },
            child: {
              style: {
                display: mobile ? "inline-block" : "none",
                position: "absolute",
                width: withOut(titleLineBoxWidthVisual, ea),
                height: String(titleLineBoxHeight) + ea,
                borderRadius: String(3) + "px",
                background: desktop ? colorExtended.blueWhite : colorExtended.gradientBlue2,
                top: String(titleLineBoxTop) + ea,
                left: String(titleLineBoxLeft) + ea,
                zIndex: String(-1),
                opacity: String(titleLineBoxOpacity),
              }
            }
          }
        ]
      });

      setInterval(() => {
        const [ target ] = selectByClass(animationTargetTitleClassName);
        target.style.animation = "fadeoutslide 0.3s ease forwards";
        if (/^인테리어/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "홈스타일링,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^홈스타일링/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "토탈 스타일링,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^토탈 스타일링/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "홈퍼니싱,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^홈퍼니싱/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "스타일링,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^스타일링/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "집꾸미기,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^집꾸미기/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "새아파트 꾸미기,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^새아파트 꾸미기/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "신혼집 인테리어,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^신혼집 인테리어/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "아이방 스타일링,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^아이방 스타일링/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "인테리어,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        }
      }, 4000);

    } else {
      mainTitleBlock = createNode({
        mother: desktop ? firstBaseHalfLeft : firstBase,
        style: {
          display: desktop ? "inline-flex" : "flex",
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
            class: [ animationTargetTitleClassName ],
            text: "인테리어,",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(titleWeight),
              color: mobile ? colorExtended.black : colorExtended.white,
              fontFamily: "pretendard",
              top: desktop ? String(titleVisualTop) + ea : "",
              left: desktop ? String(titleVisualLeft) + ea : "",
              lineHeight: String(titleLineHeight),
            },
            child: {
              style: {
                display: mobile ? "inline-block" : "none",
                position: "absolute",
                width: withOut(titleLineBoxWidthVisual, ea),
                height: String(titleLineBoxHeight) + ea,
                borderRadius: String(3) + "px",
                background: colorExtended.gradientBlue2,
                top: String(titleLineBoxTop) + ea,
                left: String(titleLineBoxLeft) + ea,
                zIndex: String(-1),
                opacity: String(titleLineBoxOpacity),
              },
            }
          }
        ]
      });

      setInterval(() => {
        const [ target ] = selectByClass(animationTargetTitleClassName);
        target.style.animation = "fadeoutslide 0.3s ease forwards";
        if (/^인테리어/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "홈스타일링,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^홈스타일링/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "토탈 스타일링,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^토탈 스타일링/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "홈퍼니싱,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^홈퍼니싱/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "스타일링,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^스타일링/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "집꾸미기,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^집꾸미기/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "새아파트 꾸미기,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^새아파트 꾸미기/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "신혼집 인테리어,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^신혼집 인테리어/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "아이방 스타일링,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        } else if (/^아이방 스타일링/gi.test(target.firstChild.textContent)) {
          setQueue(() => {
            target.firstChild.textContent = "인테리어,";
            target.style.animation = "fadeinslide 0.3s ease forwards";
          }, 300);
        }
      }, 4000);
    }

    // sub title
    subTitleBlock = createNode({
      mother: desktop ? firstBaseHalfLeft : firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(subTitleBlockMarginTop) + ea,
        paddingLeft: desktop ? String(4) + ea : "",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0.2s 1 normal forwards running fadeupdelay2",
      },
      children: [
        {
          text: "무엇부터 시작해야 할지 막막하시죠?",
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

    if (mobile) {
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
          animation: "1.2s ease 0.4s 1 normal forwards running fadeupdelay2",
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
    } else {
      imageBlock = createNode({
        mother: firstBaseHalfRight,
        style: {
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          opacity: String(0),
          transform: "translateY(30px)",
          animation: "1.2s ease 0.4s 1 normal forwards running fadeupdelay2",
        },
        children: [
          {
            mode: "svg",
            source: mainIllustSvg,
            style: {
              display: "inline-block",
              position: "absolute",
              width: String(mainImageWidth) + ea,
              marginTop: String(imageMarginTop) + ea,
              marginLeft: String(imageMarginLeft) + ea,
            }
          },
          {
            mode: "img",
            attribute: {
              src: FrontIndexJs.binaryPath + "/frontIndexSourceDesktop0.png",
            },
            style: {
              display: "inline-block",
              position: "relative",
              width: String(mainImageWidth) + ea,
              marginTop: String(imageMarginTop) + ea,
              marginLeft: String(imageMarginLeft) + ea,
            }
          }
        ]
      });
    }

    // box 1
    boxBlock0 = createNode({
      mother: desktop ? firstBaseHalfLeft : firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(boxBlock0MarginTop) + ea,
        opacity: String(0),
        width: mobile ? withOut(0, ea) : String(boxWidth) + ea,
        height: String(boxBlockHeight) + ea,
        background: colorExtended.white,
        borderRadius: String(boxRadius) + "px",
        border: "2px solid " + colorExtended.black,
        boxSizing: "border-box",
        transform: "translateY(30px)",
        animation: desktop ? "1.2s ease 0.8s 1 normal forwards running fadeupdelay2" : "1.2s ease 0s 1 normal forwards running fadeupdelay2",
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
      mother: desktop ? firstBaseHalfLeft : firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(boxBlock1MarginTop) + ea,
        opacity: String(0),
        width: mobile ? withOut(0, ea) : String(boxWidth) + ea,
        height: String(boxBlockHeight) + ea,
        background: colorExtended.white,
        borderRadius: String(boxRadius) + "px",
        border: "2px solid " + colorExtended.black,
        boxSizing: "border-box",
        transform: "translateY(30px)",
        animation: desktop ? "1.2s ease 1s 1 normal forwards running fadeupdelay2" : "1.2s ease 0s 1 normal forwards running fadeupdelay2",
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

    setQueue(() => {
      if (window.innerHeight < 700) {
        totalHeight = 0;
        totalHeight += mainTitleBlock.getBoundingClientRect().height;
        totalHeight += subTitleBlock.getBoundingClientRect().height;
        totalHeight += imageBlock.getBoundingClientRect().height;
        totalHeight += window.innerWidth * ((subTitleBlockMarginTop + imageBlockMarginTop + boxBlock0MarginTop + boxBlock1MarginTop + boxBlockHeight + boxBlockHeight) / 100);
        totalHeight += instance.naviHeight;
        firstBase.style.paddingTop = String(((window.innerHeight - totalHeight - paddingVisual) / 2)) + "px";
        instance.baseTong.style.paddingTop = String(instance.naviHeight) + "px";
      }
      setQueue(() => {
        if (window.innerHeight < 700) {
          totalHeight = 0;
          totalHeight += mainTitleBlock.getBoundingClientRect().height;
          totalHeight += subTitleBlock.getBoundingClientRect().height;
          totalHeight += imageBlock.getBoundingClientRect().height;
          totalHeight += window.innerWidth * ((subTitleBlockMarginTop + imageBlockMarginTop + boxBlock0MarginTop + boxBlock1MarginTop + boxBlockHeight + boxBlockHeight) / 100);
          totalHeight += instance.naviHeight;
          firstBase.style.paddingTop = String(((window.innerHeight - totalHeight - paddingVisual) / 2)) + "px";
          instance.baseTong.style.paddingTop = String(instance.naviHeight) + "px";
        }
      }, 500);
    }, 200);

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
    let contents;
    let moreWords;
    let num;
    let boxRadius;
    let moreAreaHeight;
    let moreSize, moreWeight;
    let moreTextTop;
    let mobileMargin;
    let blackTop;
    let whiteBlockBetween;
    let whiteBlockHeight;
    let whiteBlock;
    let barMargin;
    let topBottomMargin;
    let blueBlock;
    let blueBlockBetween;
    let titleSize;
    let imageReviewBox;
    let imageBoxWidth;
    let imageScale;
    let imageOpacity;
    let imageMarginTop;
    let clickMeTop, clickMeRight;
    let clictMeWidth;
    let moreArrowCircleWidth, moreArrowCircleMarginLeft;
    let moreArrowVisualLeft, moreArrowWidth;
    let titleWeight;
    let titleEngSize, titleEngWeight, titleEngBetween;
    let descriptionSize, descriptionWeight;
    let buttonHeight;
    let multipleConst;
    let checkCircleWidth, checkCircleWidthSvg;
    let checkCircleLeft;
    let buttonTitleSize, buttonTitleWeight, buttonTitleTextTop;
    let totalBlockPaddingTop, totalBlockPaddingBottom;
    let thirdBase;

    boxRadius = <%% 15, 15, 15, 15, 15 %%>;
    moreAreaHeight = <%% 45, 42, 40, 32, 12 %%>;

    moreSize = <%% 14, 13, 13, 11, 3.4 %%>;
    moreWeight = <%% 600, 600, 600, 600, 600 %%>;
    moreTextTop = <%% -0.5, -0.5, -0.5, -0.5, -0.1 %%>;

    mobileMargin = <%% 6, 6, 6, 6, 6 %%>;
    blackTop = <%% -31, -31, -31, -31, -31 %%>;

    whiteBlockBetween = <%% 10, 10, 10, 10, 4 %%>;

    whiteBlockHeight = <%% 80, 80, 80, 80, 80 %%>;
    barMargin = <%% 12, 12, 10, 8, 2.5 %%>;

    topBottomMargin = <%% 45, 35, 30, 27, 9 %%>;

    blueBlockBetween = <%% 6, 5, 3, 2, 1.2 %%>;

    titleSize = <%% 23, 21, 19, 17, 5.2 %%>;
    titleWeight = <%% 700, 700, 700, 700, 700 %%>;

    titleEngSize = <%% 11, 10, 8, 7, 2.7 %%>;
    titleEngWeight = <%% 300, 300, 300, 300, 300 %%>;
    titleEngBetween = <%% (isMac() ? 2 : 0), (isMac() ? 0 : -1), (isMac() ? -1 : -2), (isMac() ? -1 : -2), 0.1 %%>;

    descriptionSize = <%% 13, 12, 12, 11, 3 %%>;
    descriptionWeight = <%% 500, 500, 500, 500, 500 %%>;

    imageBoxWidth = <%% 62, 62, 62, 62, 62 %%>;
    imageScale = <%% 0.84, 0.84, 0.84, 0.84, 0.84 %%>;
    imageOpacity = <%% 0.4, 0.4, 0.4, 0.4, 0.4 %%>;

    imageMarginTop = <%% 3, 3, 3, 3, 3 %%>;

    clickMeTop = <%% 84, 80, 80, 65, -13 %%>;
    clickMeRight = <%% 1, 1, 1, 1, 1 %%>;
    clictMeWidth = <%% 110, 100, 85, 75, 26 %%>;

    moreArrowCircleWidth = <%% 13, 12, 11, 9, 2.8 %%>;
    moreArrowCircleMarginLeft = <%% 4, 4, 4, 3, 1 %%>;

    moreArrowVisualLeft = <%% 1, 1, 1, 1, 0.2 %%>;
    moreArrowWidth = <%% 4, 4, 3, 3, 1 %%>;

    buttonHeight = <%% 40, 34, 28, 22, 8.8 %%>;

    multipleConst = <%% 6, 6, 6, 6, 6 %%>;

    checkCircleWidth = <%% 20, 20, 17, 13, 4.5 %%>;
    checkCircleWidthSvg = <%% 21, 21, 18, 14, 4.7 %%>;
    checkCircleLeft = <%% 12, 11, 7, 6, 2.5 %%>;

    buttonTitleSize = <%% 14, 13, 12, 10, 3.2 %%>;
    buttonTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
    buttonTitleTextTop = <%% (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), -0.2 %%>;

    totalBlockPaddingTop = <%% 140, 130, 110, 100, 140 %%>;
    totalBlockPaddingBottom = <%% 130, 120, 110, 100, 130 %%>;

    if (media[0] && window.innerHeight > 1100) {
      totalBlockPaddingTop = 160;
      totalBlockPaddingBottom = 150;
      clickMeTop = 104;
    }

    moreWords = "더보기";
    contents = [
      {
        title: "홈퍼니싱",
        eng: "Home Furnishing",
        description: [
          "시공 없이 가구, 패브릭, 소품으로",
          "집 무드를 변화시키고 싶어요.",
        ],
        buttons: [
          {
            title: "퍼니싱 단독 서비스",
          },
          {
            title: "패브릭 서비스",
          },
          {
            title: "기획 + 배치도",
          },
          {
            title: "디자인 제안서",
          },
        ]
      },
      {
        title: "홈스타일링",
        eng: "Home Styling",
        description: [
          "필수적인 부분만 시공해 가격 부담을 덜고",
          "퍼니싱까지 해결하고 싶어요.",
        ],
        buttons: [
          {
            title: "부분 인테리어 시공",
          },
          {
            title: "퍼니싱 서비스",
          },
          {
            title: "기획 + 배치도",
          },
          {
            title: "디자인 제안서",
          },
        ]
      },
      {
        title: "토탈 스타일링",
        eng: "Total Styling",
        description: [
          "구조 변경, 전체 시공과 퍼니싱을 통해",
          "공간을 새롭게 바꾸고 싶어요.",
        ],
        buttons: [
          {
            title: "전체 인테리어 시공",
          },
          {
            title: "퍼니싱 서비스",
          },
          {
            title: "기획 + 배치도",
          },
          {
            title: "디자인 제안서",
          },
        ]
      },
    ];

    if (mobile) {
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
        },
        child: {
          style: {
            position: "absolute",
            top: String(blackTop) + ea,
            left: String(-1 * mobileMargin) + ea,
            background: colorExtended.black,
            width: withOut(-1 * (mobileMargin * 2), ea),
            height: withOut(blackTop, ea),
          },
        }
      });
    } else {
      secondBase = createNode({
        mother: baseTong,
        class: [ secondBaseClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "row",
          paddingTop: String(totalBlockPaddingTop) + ea,
          paddingBottom: String(totalBlockPaddingBottom) + ea,
        },
        child: {
          style: {
            position: "absolute",
            top: String(0) + ea,
            left: String(-1 * ((window.innerWidth - standardWidth) / 2) - 1) + ea,
            background: colorExtended.black,
            width: "calc(100vw + 1px)",
            height: withOut(0, ea),
          },
        }
      });
    }

    // click me

    // contents
    num = 0;
    for (let c of contents) {
      whiteBlock = createNode({
        mother: secondBase,
        style: {
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: desktop ? "calc(calc(100% - " + String(whiteBlockBetween * 2) + ea + ") / 2)" : withOut(0, ea),
          paddingTop: String(topBottomMargin) + ea,
          paddingBottom: String(topBottomMargin + moreAreaHeight - blueBlockBetween) + ea,
          marginBottom: String(whiteBlockBetween) + ea,
          marginRight: (desktop && num !== contents.length - 1) ? String(whiteBlockBetween) + ea : "",
          borderRadius: String(boxRadius) + "px",
          background: colorExtended.white,
          justifyContent: "start",
          alignItems: "center",
          overflow: "hidden",
          animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
          boxShadow: "0px 5px 22px -9px " + colorExtended.ultimateBlack,
        },
        child: {
          event: {
            click: instance.insertWhiteCardEvent(num),
          },
          style: {
            display: "flex",
            position: "absolute",
            height: String(moreAreaHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
            width: withOut(0, ea),
            bottom: String(0),
            left: String(0),
            cursor: "pointer",
          },
          children: [
            {
              style: {
                display: "block",
                position: "absolute",
                width: withOut(0, ea),
                height: withOut(0, ea),
                top: String(0),
                left: String(0),
                background: colorExtended.blueLight,
                opacity: String(0.4),
              }
            },
            {
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              },
              children: [
                {
                  text: "더보기",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(moreSize) + ea,
                    fontWeight: String(moreWeight),
                    color: colorExtended.black,
                    top: String(moreTextTop) + ea,
                    fontFamily: "pretendard",
                  }
                },
                {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    marginLeft: String(moreArrowCircleMarginLeft) + ea,
                    width: String(moreArrowCircleWidth) + ea,
                    height: String(moreArrowCircleWidth) + ea,
                    borderRadius: String(moreArrowCircleWidth) + ea,
                    border: "1px solid " + colorExtended.black,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    mode: "svg",
                    source: svgMaker.buttonLineArrow(colorExtended.black),
                    style: {
                      display: "inline-block",
                      position: "relative",
                      marginLeft: String(moreArrowVisualLeft) + ea,
                      width: String(moreArrowWidth) + ea,
                      transformOrigin: "50% 50%",
                      transform: "scaleY(0.8)",
                    }
                  }
                },
              ]
            },
          ]
        }
      });

      createNode({
        mother: whiteBlock,
        style: {
          display: "flex",
          width: withOut(0, ea),
          position: "relative",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        children: [
          {
            text: c.title,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(titleWeight),
              color: colorExtended.black,
              fontFamily: "pretendard",
            }
          },
          {
            text: c.eng,
            style: {
              display: "inline-block",
              marginTop: String(titleEngBetween) + ea,
              position: "relative",
              fontSize: String(titleEngSize) + ea,
              fontWeight: String(titleEngWeight),
              color: colorExtended.darkDarkShadow,
              fontFamily: "mont",
            }
          }
        ]
      });

      createNode({
        mother: whiteBlock,
        style: {
          display: "flex",
          position: "relative",
          height: String(barMargin) + ea,
          marginBottom: String(barMargin) + ea,
          borderBottom: "1px solid " + colorExtended.gray4,
          width: desktop ? withOut(topBottomMargin * 2.1, ea) : withOut(mobileMargin * multipleConst, ea),
        }
      });

      createNode({
        mother: whiteBlock,
        style: {
          display: "flex",
          width: withOut(0, ea),
          position: "relative",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        children: [
          {
            text: c.description.join("\n"),
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorExtended.black,
              fontFamily: "pretendard",
              textAlign: "center",
            }
          },
        ]
      });

      createNode({
        mother: whiteBlock,
        style: {
          display: "flex",
          position: "relative",
          height: String(barMargin) + ea,
          marginBottom: String(barMargin) + ea,
          width: desktop ? withOut(topBottomMargin * 2, ea) : withOut(mobileMargin * multipleConst, ea),
        }
      });
      
      for (let button of c.buttons) {

        blueBlock = createNode({
          mother: whiteBlock,
          style: {
            display: "inline-flex",
            position: "relative",
            flexDirection: "row",
            width: desktop ? withOut(topBottomMargin * 2, ea) : withOut(mobileMargin * multipleConst, ea),
            height: String(buttonHeight) + ea,
            borderRadius: String(buttonHeight) + ea,
            border: "1.5px solid " + colorExtended.black,
            background: colorExtended.blue,
            marginBottom: String(blueBlockBetween) + ea,
            justifyContent: "center",
            alignItems: "center",
          },
          children: [
            {
              style: {
                width: String(checkCircleWidth) + ea,
                height: String(checkCircleWidth) + ea,
                borderRadius: String(checkCircleWidth) + ea,
                display: "inline-block",
                position: "absolute",
                left: String(checkCircleLeft) + ea,
                background: colorExtended.black,
              },
              child: {
                mode: "svg",
                source: svgMaker.checkCircle(colorExtended.white),
                style: {
                  width: String(checkCircleWidthSvg) + ea,
                  display: "inline-block",
                  position: "absolute",
                  top: String((checkCircleWidth - checkCircleWidthSvg) / 2) + ea,
                  left: String((checkCircleWidth - checkCircleWidthSvg) / 2) + ea,
                }
              }
            },
            {
              text: button.title,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(buttonTitleSize) + ea,
                fontWeight: String(buttonTitleWeight),
                top: String(buttonTitleTextTop) + ea,
                color: colorExtended.black,
                fontFamily: "pretendard",
                textAlign: "center",
              }
            },
          ]
        });
      }
      num++;
    }
  
    // review
    if (mobile) {
      await instance.insertReviewBox(secondBase);
    } else {
      thirdBase = createNode({
        mother: baseTong,
        class: [ secondBaseClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          paddingTop: String(totalBlockPaddingTop) + ea,
          paddingBottom: String(totalBlockPaddingBottom) + ea,
        },
        child: {
          style: {
            position: "absolute",
            top: String(0) + ea,
            left: String(-1 * ((window.innerWidth - standardWidth) / 2) - 1) + ea,
            background: colorExtended.darkDarkBlack,
            width: "calc(100vw + 1px)",
            height: withOut(0, ea),
          },
        }
      });
      await instance.insertReviewBox(thirdBase);
    }

  } catch (e) {
    console.log(e);
  }
}

FrontIndexJs.prototype.insertReviewBox = async function (secondBase) {
  const instance = this;
  const { withOut, returnGet, selectByClass, removeByClass, createNode, swipePatch, selfHref, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong, reviewTargets } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { secondBaseClassName } = this;
  const photoChar = 't';
  const photoCharMobile = "mot";
  const reviewBlockBaseClassName = "reviewBlockBaseClassName";
  const reviewBlockClassName = "reviewBlockClassName";
  const reviewBlockArrowClassName = "reviewBlockArrowClassName";
  try {
    let contents;
    let moreWords;
    let num;
    let boxRadius;
    let moreAreaHeight;
    let moreSize, moreWeight;
    let moreTextTop;
    let mobileMargin;
    let blackTop;
    let whiteBlockBetween;
    let whiteBlockHeight;
    let whiteBlock;
    let barMargin;
    let topBottomMargin;
    let blueBlock;
    let blueBlockBetween;
    let titleSize;
    let imageReviewBox;
    let imageBoxWidth;
    let imageScale;
    let imageOpacity;
    let imageMarginTop;
    let thisIndex;
    let pid;
    let thisReview;
    let reviewTitleSize;
    let reviewSubSize;
    let blackScreenOpacity;
    let reviewTitleMargin, reviewTitleWeight;;
    let reviewLineHeight;
    let reviewSubTitleWeight;
    let reviewMaker;
    let rightArrowEvent;
    let leftArrowEvent;
    let reviewBoxPaddingTop;
    let reviewBestSize, reviewBestWeight, reviewBestTextTop, reviewBestEngSize;
    let reviewBoxPaddingBottom;
    let bestBetween;
    let reviewBackBoxTop, reviewBackBoxLeft;
    let arrowWidth, arrowLeft;
    let title0Size, title0Weight, title0LineHeight;
    let line0Width, lineMarginTop;
    let mainImageWidth;
    let bestReviewWidth, bestReviewHeight;
    let imageScale2;

    boxRadius = <%% 15, 15, 15, 15, 15 %%>;
    moreAreaHeight = <%% 12, 12, 12, 12, 12 %%>;

    moreSize = <%% 3.4, 3.4, 3.4, 3.4, 3.4 %%>;
    moreWeight = <%% 600, 600, 600, 600, 600 %%>;
    moreTextTop = <%% -0.2, -0.2, -0.2, -0.2, -0.2 %%>;

    mobileMargin = <%% 6, 6, 6, 6, 6 %%>;
    blackTop = <%% -31, -31, -31, -31, -31 %%>;

    whiteBlockBetween = <%% 4, 4, 4, 4, 4 %%>;

    whiteBlockHeight = <%% 80, 80, 80, 80, 80 %%>;
    barMargin = <%% 2.5, 2.5, 2.5, 2.5, 2.5 %%>;

    topBottomMargin = <%% 9, 9, 9, 9, 9 %%>;

    blueBlockBetween = <%% 1.8, 1.8, 1.8, 1.8, 1.8 %%>;

    titleSize = <%% 19, 18, 18, 18, 5 %%>;

    imageBoxWidth = <%% 460, 460, 420, 390, 62 %%>;
    imageScale = <%% 0.91, 0.91, 0.91, 0.91, 0.84 %%>;
    imageScale2 = <%% 0.77, 0.77, 0.77, 0.77, 0.8 %%>;
    imageOpacity = <%% 0.4, 0.4, 0.4, 0.4, 0.4 %%>;

    imageMarginTop = <%% 3, 3, 3, 3, 3 %%>;
    reviewTitleSize = <%% 24, 24, 22, 20, 3.6 %%>;
    reviewSubSize = <%% 13, 13, 12, 11, 2.6 %%>;

    blackScreenOpacity = <%% 0.2, 0.2, 0.2, 0.2, 0.2 %%>;

    reviewTitleMargin = <%% 45, 45, 43, 42, 6 %%>;
    reviewTitleWeight = <%% 700, 700, 700, 700, 600 %%>;
    reviewLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.5 %%>;
    reviewSubTitleWeight = <%% 500, 500, 500, 500, 500 %%>;

    reviewBoxPaddingTop = <%% 0, 0, 0, 0, 15 %%>;
    reviewBoxPaddingBottom = <%% 21, 21, 21, 20, 21 %%>;
    bestBetween = <%% 32, 32, 30, 28, 6 %%>;

    bestReviewWidth = <%% 270, 270, 250, 220, 50 %%>;
    bestReviewHeight = <%% 45, 45, 42, 36, 9 %%>;

    reviewBestSize = <%% 18, 17, 16, 14, 3.4 %%>;
    reviewBestWeight = <%% 700, 700, 700, 700, 700 %%>;
    reviewBestTextTop = <%% (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), -0.2 %%>;
    reviewBestEngSize = <%% 20, 18, 17, 16, 3.8 %%>;
    reviewBackBoxTop = <%% 6, 6, 6, 6, 6 %%>;
    reviewBackBoxLeft = <%% 160, 120, 90, 60, 0 %%>;

    arrowWidth = <%% 3.4, 3.4, 3.4, 3.4, 3.4 %%>;
    arrowLeft = <%% 5, 5, 5, 5, 5 %%>;

    rightArrowEvent = () => {
      return function (e) {
        if (mobile) {
          const [ a, b, c ] = [ ...document.querySelectorAll('.' + reviewBlockClassName) ];
          const [ d, f ] = [ ...document.querySelectorAll('.' + reviewBlockArrowClassName) ];
          const [ target ] = selectByClass(reviewBlockBaseClassName);
          const numbers = JSON.parse(target.getAttribute("numbers"));
  
          target.style.animation = "fadeoutslidereverse 0.3s ease forwards";
          a.style.animation = "justfadeoutsmall 0.5s ease forwards";
          b.style.animation = "justfadeoutsmall 0.5s ease forwards";
          c.style.animation = "justfadeoutoriginal 0.5s ease forwards";
  
          d.style.animation = "justfadeoutoriginal 0.5s ease forwards";
          f.style.animation = "justfadeoutoriginal 0.5s ease forwards";
  
          setQueue(() => {
            if (JSON.stringify(numbers) === "[2,1,0]") {
              reviewMaker(1, 0, 2, false);
            } else if (JSON.stringify(numbers) === "[1,0,2]") {
              reviewMaker(0, 2, 1, false);
            } else if (JSON.stringify(numbers) === "[0,2,1]") {
              reviewMaker(2, 1, 0, false);
            }
          }, 501);
        } else {
          const [ e, f, a, b, c ] = [ ...document.querySelectorAll('.' + reviewBlockClassName) ];
          const [ target ] = selectByClass(reviewBlockBaseClassName);
          const numbers = JSON.parse(target.getAttribute("numbers"));
  
          target.style.animation = "fadeoutslidereverse 0.3s ease forwards";
          e.style.animation = "justfadeoutsmall 0.5s ease forwards";
          f.style.animation = "justfadeoutsmall 0.5s ease forwards";
          c.style.animation = "justfadeoutoriginal 0.5s ease forwards";
          a.style.animation = "justfadeouteight 0.5s ease forwards";
          b.style.animation = "justfadeouteight 0.5s ease forwards";
        
          setQueue(() => {
            if (JSON.stringify(numbers) === "[2,1,0,3,4]") {
              reviewMaker(0, 4, 1, false, 2, 3);
            } else if (JSON.stringify(numbers) === "[0,4,1,2,3]") {
              reviewMaker(1, 3, 4, false, 0, 2);
            } else if (JSON.stringify(numbers) === "[1,3,4,0,2]") {
              reviewMaker(4, 2, 3, false, 1, 0);
            } else if (JSON.stringify(numbers) === "[4,2,3,1,0]") {
              reviewMaker(3, 0, 2, false, 4, 1);
            } else if (JSON.stringify(numbers) === "[3,0,2,4,1]") {
              reviewMaker(2, 1, 0, false, 3, 4);
            }
          }, 501);
        }
      }
    }
    leftArrowEvent = () => {
      return function (e) {
        if (mobile) {
          const [ a, b, c ] = [ ...document.querySelectorAll('.' + reviewBlockClassName) ];
          const [ d, f ] = [ ...document.querySelectorAll('.' + reviewBlockArrowClassName) ];
          const [ target ] = selectByClass(reviewBlockBaseClassName);
          const numbers = JSON.parse(target.getAttribute("numbers"));
  
          target.style.animation = "fadeoutslide 0.3s ease forwards";
          a.style.animation = "justfadeoutsmall 0.5s ease forwards";
          b.style.animation = "justfadeoutsmall 0.5s ease forwards";
          c.style.animation = "justfadeoutoriginal 0.5s ease forwards";
  
          d.style.animation = "justfadeoutoriginal 0.5s ease forwards";
          f.style.animation = "justfadeoutoriginal 0.5s ease forwards";
  
          setQueue(() => {
            if (JSON.stringify(numbers) === "[2,1,0]") {
              reviewMaker(0, 2, 1, true);
            } else if (JSON.stringify(numbers) === "[0,2,1]") {
              reviewMaker(1, 0, 2, true);
            } else if (JSON.stringify(numbers) === "[1,0,2]") {
              reviewMaker(2, 1, 0, true);
            }
          }, 501);
        } else {
          const [ e, f, a, b, c ] = [ ...document.querySelectorAll('.' + reviewBlockClassName) ];
          const [ target ] = selectByClass(reviewBlockBaseClassName);
          const numbers = JSON.parse(target.getAttribute("numbers"));
  
          target.style.animation = "fadeoutslide 0.3s ease forwards";
          e.style.animation = "justfadeoutsmall 0.5s ease forwards";
          f.style.animation = "justfadeoutsmall 0.5s ease forwards";
          c.style.animation = "justfadeoutoriginal 0.5s ease forwards";
          a.style.animation = "justfadeouteight 0.5s ease forwards";
          b.style.animation = "justfadeouteight 0.5s ease forwards";

          setQueue(() => {
            if (JSON.stringify(numbers) === "[2,1,0,3,4]") {
              reviewMaker(3, 0, 2, true, 4, 1);
            } else if (JSON.stringify(numbers) === "[3,0,2,4,1]") {
              reviewMaker(4, 2, 3, true, 1, 0);
            } else if (JSON.stringify(numbers) === "[4,2,3,1,0]") {
              reviewMaker(1, 3, 4, true, 0, 2);
            } else if (JSON.stringify(numbers) === "[1,3,4,0,2]") {
              reviewMaker(0, 4, 1, true, 2, 3);
            } else if (JSON.stringify(numbers) === "[0,4,1,2,3]") {
              reviewMaker(2, 1, 0, true, 3, 4);
            }
          }, 501);

        }
      }
    }

    // review
    createNode({
      mother: secondBase,
      style: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(reviewBoxPaddingTop) + ea,
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        style: {
          display: "inline-flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          width: String(bestReviewWidth) + ea,
          height: String(bestReviewHeight) + ea,
          borderRadius: String(bestReviewHeight) + ea,
          background: desktop ? colorExtended.ultimateBlack : colorExtended.darkDarkBlack,
        },
        child: {
          text: "홈리에종 <b%BEST%b> 리뷰 바로가기",
          style: {
            display: "inline-block",
            position: "relative",
            textAlign: "center",
            fontSize: String(reviewBestSize) + ea,
            fontWeight: String(reviewBestWeight),
            fontFamily: "pretendard",
            color: colorExtended.white,
            top: String(reviewBestTextTop) + ea,
          },
          bold: {
            fontSize: String(reviewBestEngSize) + ea,
            fontWeight: String(reviewBestWeight),
            fontFamily: "mont",
            color: colorExtended.white,
            position: "relative",
            top: desktop ? String(isMac() ? 0.5 : 0) + ea : String(0.1) + ea,
          }
        }
      }
    });

    // reviewMaker
    reviewMaker = (a, b, c, reverse = false, e = null, f = null) => {
      removeByClass(reviewBlockBaseClassName);

      imageReviewBox = createNode({
        mother: secondBase,
        class: [ reviewBlockBaseClassName ],
        attribute: { numbers: (desktop ? JSON.stringify([ a, b, c, e, f ]) : JSON.stringify([ a, b, c ])) },
        style: {
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: withOut(0, ea),
          paddingTop: String(bestBetween) + ea,
          paddingBottom: String(reviewBoxPaddingBottom) + ea,
          justifyContent: "center",
          alignItems: "center",
          opacity: String(0),
          transform: "translateX(-15px)",
          animation: "fadeinslide" + (reverse ? "" : "reverse") + " 0.5s ease forwards",
        },
      });

      if (mobile) {
        swipePatch({
          left: rightArrowEvent(),
          right: leftArrowEvent(),
        }, null, imageReviewBox, "swipeStack_review_" + String(a) + String(b) + String(c) + uniqueValue("hex"));
      }

      if (desktop) {
        thisIndex = e;
        thisReview = reviewTargets[thisIndex];
        pid = thisReview.contents.portfolio.pid;
        createNode({
          mother: imageReviewBox,
          class: [ reviewBlockClassName ],
          event: { click: leftArrowEvent() },
          style: {
            display: "inline-flex",
            position: "absolute",
            left: String(0) + ea,
            top: desktop ? "" : String(reviewBackBoxTop) + ea,
            width: String(imageBoxWidth) + ea,
            height: String(imageBoxWidth) + ea,
            borderRadius: String(boxRadius) + "px",
            backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(thisReview.contents.review.detailInfo.photodae[1]) + pid + ".jpg" + "')",
            backgroundPosition: "50% 50%",
            backgroundSize: "auto 100%",
            transformOrigin: "0% 50%",
            transform: "scale(" + String(imageScale2) + ")",
            boxShadow: "0px 3px 22px -9px " + colorExtended.ultimateBlack,
            opacity: String(0),
            animation: "justfadeinsmall 0.5s ease forwards",
            cursor: "pointer",
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "absolute",
                width: withOut(0, ea),
                height: withOut(0, ea),
                top: String(0),
                left: String(0),
                opacity: String(blackScreenOpacity),
                background: colorExtended.black,
              }
            },
            {
              text: thisReview.contents.review.title.main.split(", ").join("\n"),
              style: {
                display: "inline-block",
                position: "absolute",
                top: String(reviewTitleMargin) + ea,
                left: String(reviewTitleMargin) + ea,
                fontSize: String(reviewTitleSize) + ea,
                fontWeight: String(reviewTitleWeight),
                fontFamily: "pretendard",
                color: colorExtended.white,
                lineHeight: String(reviewLineHeight),
              }
            },
            {
              text: thisReview.contents.portfolio.spaceInfo.space + " " + String(thisReview.contents.portfolio.spaceInfo.pyeong) + "py 홈스타일링",
              style: {
                display: "inline-block",
                position: "absolute",
                bottom: String(reviewTitleMargin) + ea,
                left: String(reviewTitleMargin) + ea,
                fontSize: String(reviewSubSize) + ea,
                fontWeight: String(reviewSubTitleWeight),
                fontFamily: "pretendard",
                color: colorExtended.white,
                lineHeight: String(reviewLineHeight),
              }
            },
          ],
        });

        thisIndex = f;
        thisReview = reviewTargets[thisIndex];
        pid = thisReview.contents.portfolio.pid;
        createNode({
          mother: imageReviewBox,
          class: [ reviewBlockClassName ],
          event: { click: rightArrowEvent() },
          style: {
            display: "inline-flex",
            position: "absolute",
            right: String(0) + ea,
            top: desktop ? "" : String(reviewBackBoxTop) + ea,
            width: String(imageBoxWidth) + ea,
            height: String(imageBoxWidth) + ea,
            borderRadius: String(boxRadius) + "px",
            backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(thisReview.contents.review.detailInfo.photodae[1]) + pid + ".jpg" + "')",
            backgroundPosition: "50% 50%",
            backgroundSize: "auto 100%",
            transformOrigin: "100% 50%",
            transform: "scale(" + String(imageScale2) + ")",
            boxShadow: "0px 3px 22px -9px " + colorExtended.ultimateBlack,
            opacity: String(0),
            animation: "justfadeinsmall 0.5s ease forwards",
            cursor: "pointer",
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "absolute",
                width: withOut(0, ea),
                height: withOut(0, ea),
                top: String(0),
                left: String(0),
                opacity: String(blackScreenOpacity),
                background: colorExtended.black,
              }
            },
            {
              text: thisReview.contents.review.title.main.split(", ").join("\n"),
              style: {
                display: "inline-block",
                position: "absolute",
                top: String(reviewTitleMargin) + ea,
                left: String(reviewTitleMargin) + ea,
                fontSize: String(reviewTitleSize) + ea,
                fontWeight: String(reviewTitleWeight),
                fontFamily: "pretendard",
                color: colorExtended.white,
                lineHeight: String(reviewLineHeight),
              }
            },
            {
              text: thisReview.contents.portfolio.spaceInfo.space + " " + String(thisReview.contents.portfolio.spaceInfo.pyeong) + "py 홈스타일링",
              style: {
                display: "inline-block",
                position: "absolute",
                bottom: String(reviewTitleMargin) + ea,
                left: String(reviewTitleMargin) + ea,
                fontSize: String(reviewSubSize) + ea,
                fontWeight: String(reviewSubTitleWeight),
                fontFamily: "pretendard",
                color: colorExtended.white,
                lineHeight: String(reviewLineHeight),
              }
            },
          ],
        });
      }


      // 0
      thisIndex = a;
      thisReview = reviewTargets[thisIndex];
      pid = thisReview.contents.portfolio.pid;
      createNode({
        mother: imageReviewBox,
        class: [ reviewBlockClassName ],
        event: { click: leftArrowEvent() },
        style: {
          display: "inline-flex",
          position: "absolute",
          left: String(reviewBackBoxLeft) + ea,
          top: desktop ? "" : String(reviewBackBoxTop) + ea,
          width: String(imageBoxWidth) + ea,
          height: String(imageBoxWidth) + ea,
          borderRadius: String(boxRadius) + "px",
          backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(thisReview.contents.review.detailInfo.photodae[1]) + pid + ".jpg" + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "auto 100%",
          transformOrigin: "0% 50%",
          transform: "scale(" + String(imageScale) + ")",
          boxShadow: "0px 3px 22px -9px " + colorExtended.ultimateBlack,
          opacity: String(0),
          animation: (desktop ? "justfadeineight" : "justfadeinsmall") + " 0.5s ease forwards",
          cursor: "pointer",
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "absolute",
              width: withOut(0, ea),
              height: withOut(0, ea),
              top: String(0),
              left: String(0),
              opacity: String(blackScreenOpacity),
              background: colorExtended.black,
            }
          },
          {
            text: thisReview.contents.review.title.main.split(", ").join("\n"),
            style: {
              display: "inline-block",
              position: "absolute",
              top: String(reviewTitleMargin) + ea,
              left: String(reviewTitleMargin) + ea,
              fontSize: String(reviewTitleSize) + ea,
              fontWeight: String(reviewTitleWeight),
              fontFamily: "pretendard",
              color: colorExtended.white,
              lineHeight: String(reviewLineHeight),
            }
          },
          {
            text: thisReview.contents.portfolio.spaceInfo.space + " " + String(thisReview.contents.portfolio.spaceInfo.pyeong) + "py 홈스타일링",
            style: {
              display: "inline-block",
              position: "absolute",
              bottom: String(reviewTitleMargin) + ea,
              left: String(reviewTitleMargin) + ea,
              fontSize: String(reviewSubSize) + ea,
              fontWeight: String(reviewSubTitleWeight),
              fontFamily: "pretendard",
              color: colorExtended.white,
              lineHeight: String(reviewLineHeight),
            }
          },
        ],
      });
  
      // 1
      thisIndex = b;
      thisReview = reviewTargets[thisIndex];
      pid = thisReview.contents.portfolio.pid;
      createNode({
        mother: imageReviewBox,
        class: [ reviewBlockClassName ],
        event: { click: rightArrowEvent() },
        style: {
          display: "inline-flex",
          position: "absolute",
          right: String(reviewBackBoxLeft) + ea,
          top: desktop ? "" : String(reviewBackBoxTop) + ea,
          width: String(imageBoxWidth) + ea,
          height: String(imageBoxWidth) + ea,
          borderRadius: String(boxRadius) + "px",
          backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(thisReview.contents.review.detailInfo.photodae[1]) + pid + ".jpg" + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "auto 100%",
          transformOrigin: "100% 50%",
          transform: "scale(" + String(imageScale) + ")",
          boxShadow: "0px 3px 22px -9px " + colorExtended.ultimateBlack,
          opacity: String(0),
          animation: (desktop ? "justfadeineight" : "justfadeinsmall") + " 0.5s ease forwards",
          cursor: "pointer",
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "absolute",
              width: withOut(0, ea),
              height: withOut(0, ea),
              top: String(0),
              left: String(0),
              opacity: String(blackScreenOpacity),
              background: colorExtended.black,
            }
          },
          {
            text: thisReview.contents.review.title.main.split(", ").join("\n"),
            style: {
              display: "inline-block",
              position: "absolute",
              top: String(reviewTitleMargin) + ea,
              left: String(reviewTitleMargin) + ea,
              fontSize: String(reviewTitleSize) + ea,
              fontWeight: String(reviewTitleWeight),
              fontFamily: "pretendard",
              color: colorExtended.white,
              lineHeight: String(reviewLineHeight),
            }
          },
          {
            text: thisReview.contents.portfolio.spaceInfo.space + " " + String(thisReview.contents.portfolio.spaceInfo.pyeong) + "py 홈스타일링",
            style: {
              display: "inline-block",
              position: "absolute",
              bottom: String(reviewTitleMargin) + ea,
              left: String(reviewTitleMargin) + ea,
              fontSize: String(reviewSubSize) + ea,
              fontWeight: String(reviewSubTitleWeight),
              fontFamily: "pretendard",
              color: colorExtended.white,
              lineHeight: String(reviewLineHeight),
            }
          },
        ],
      });
  
      // 2
      thisIndex = c;
      thisReview = reviewTargets[thisIndex];
      pid = thisReview.contents.portfolio.pid;
      createNode({
        mother: imageReviewBox,
        class: [ reviewBlockClassName ],
        event: {
          click: function (e) { selfHref(FRONTHOST + "/revdetail.php?pid=" + this.getAttribute("pid")); }
        },
        attribute: { pid },
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(imageBoxWidth) + ea,
          height: String(imageBoxWidth) + ea,
          borderRadius: String(boxRadius) + "px",
          backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(thisReview.contents.review.detailInfo.photodae[1]) + pid + ".jpg" + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "auto 100%",
          boxShadow: "0px 3px 22px -9px " + colorExtended.ultimateBlack,
          overflow: "hidden",
          animation: "justfadeinoriginal 0.5s ease forwards",
          cursor: "pointer",
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "absolute",
              width: withOut(0, ea),
              height: withOut(0, ea),
              top: String(0),
              left: String(0),
              opacity: String(blackScreenOpacity),
              background: colorExtended.black,
            }
          },
          {
            text: thisReview.contents.review.title.main.split(", ").join("\n"),
            style: {
              display: "inline-block",
              position: "absolute",
              top: String(reviewTitleMargin) + ea,
              left: String(reviewTitleMargin) + ea,
              fontSize: String(reviewTitleSize) + ea,
              fontWeight: String(reviewTitleWeight),
              fontFamily: "pretendard",
              color: colorExtended.white,
              lineHeight: String(reviewLineHeight),
            }
          },
          {
            text: thisReview.contents.portfolio.spaceInfo.space + " " + String(thisReview.contents.portfolio.spaceInfo.pyeong) + "py 홈스타일링",
            style: {
              display: "inline-block",
              position: "absolute",
              bottom: String(reviewTitleMargin) + ea,
              left: String(reviewTitleMargin) + ea,
              fontSize: String(reviewSubSize) + ea,
              fontWeight: String(reviewSubTitleWeight),
              fontFamily: "pretendard",
              color: colorExtended.white,
              lineHeight: String(reviewLineHeight),
            }
          },
        ],
      });

      if (mobile) {
        // arrows
        createNode({
          mother: imageReviewBox,
          class: [ reviewBlockArrowClassName ],
          mode: "svg",
          source: svgMaker.generalTriangle(colorExtended.white),
          event: {
            click: leftArrowEvent(),
          },
          style: {
            display: "inline-block",
            position: "absolute",
            width: String(arrowWidth) + ea,
            transformOrigin: "50% 50%",
            transform: "rotate(90deg)",
            left: String(arrowLeft) + ea,
            animation: "justfadeinoriginal 0.5s ease forwards",
          }
        });
        createNode({
          mother: imageReviewBox,
          class: [ reviewBlockArrowClassName ],
          mode: "svg",
          source: svgMaker.generalTriangle(colorExtended.white),
          event: {
            click: rightArrowEvent(),
          },
          style: {
            display: "inline-block",
            position: "absolute",
            width: String(arrowWidth) + ea,
            transformOrigin: "50% 50%",
            transform: "rotate(-90deg)",
            right: String(arrowLeft) + ea,
            animation: "justfadeinoriginal 0.5s ease forwards",
          }
        });
      }

    }

    if (mobile) {
      reviewMaker(2, 1, 0, true);
    } else {
      reviewMaker(2, 1, 0, true, 3, 4);
    }

  } catch (e) {
    console.log(e);
  }
}

FrontIndexJs.prototype.insertThirdBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { secondBaseClassName } = this;
  try {
    let boxRadius;
    let moreAreaHeight;
    let mobileMargin;
    let firstBox, secondBox, thirdBox, fourthBox;
    let firstBase, secondBase, thirdBase, fourthBase;
    let topBottomMargin;
    let slimMargin;
    let boxRadiusBig;
    let boxRadiusSmall;
    let baseModuleHeight;
    let fifthBase, fifthBox;
    let imageMarginTop;
    let descriptionMarginTop;
    let baseModuleHeight2;
    let finalModuleHeight;
    let title0Size;
    let title0Weight;
    let title0LineHeight;
    let line0Width;
    let lineMarginTop;
    let mainImageWidth;
    let descriptionSize, descriptionWeight, descriptionLineHeight;
    let image1Width, image1VisualLeft;
    let image1Between, image1TextTop;
    let line1Width;
    let descriptionLineHeight2, descriptionMarginTop2;
    let line2Width;
    let image3MarginTop;
    let title1Size, title1LineHeight;
    let image3Width, image3VisualLeft;
    let descriptionMarginTop3;
    let baseMother;
    let totalBlockPaddingTop;
    let totalBlockPaddingBottom;
    let boxInnerPadding;
    let mainImageTop;
    let boxInnerPaddingTop;
    let topBottomMarginBig;
    let secondAreaTextPaddingLeft;
    let phoneTop, phoneWidth, phoneHeight;
    let visualDescriptionPaddingBottom;
    let whitePadding;
    let supportWidth, supportTop;
    let thirdPadding;

    boxRadius = <%% 15, 15, 15, 15, 15 %%>;
    boxRadiusBig = <%% 24, 24, 24, 24, 20 %%>;
    boxRadiusSmall = <%% 2, 2, 2, 2, 2 %%>;

    moreAreaHeight = <%% 12, 12, 12, 12, 12 %%>;
    mobileMargin = <%% 6, 6, 6, 6, 6 %%>;
    slimMargin = <%% 3, 3, 3, 3, 3 %%>;

    topBottomMargin = <%% 24, 24, 20, 16, 14 %%>;
    topBottomMarginBig = <%% 100, 100, 90, 72, 14 %%>;

    baseModuleHeight = <%% 97, 97, 97, 97, 97 %%>;
    baseModuleHeight2 = <%% 112, 112, 112, 112, 112 %%>;
    finalModuleHeight = <%% 90, 90, 90, 90, 90 %%>;

    descriptionMarginTop = <%% 24, 24, 20, 14, 8 %%>;
    descriptionMarginTop2 = <%% 24, 24, 20, 14, 11 %%>;
    descriptionMarginTop3 = <%% 24, 24, 20, 14, 3 %%>;
    imageMarginTop = <%% 3, 3, 3, 3, 3 %%>;

    title0Size = <%% 33, 28, 25, 22, 5 %%>;
    title1Size = <%% 33, 28, 25, 22, 4.8 %%>;
    title0Weight = <%% 700, 700, 700, 700, 600 %%>;
    title0LineHeight = <%% 1.3, 1.3, 1.3, 1.3, 1.3 %%>;
    title1LineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

    line0Width = <%% 33, 33, 33, 33, 33 %%>;
    lineMarginTop = <%% 3, 3, 3, 3, 3 %%>;
    line1Width = <%% 18, 18, 18, 18, 18 %%>;
    line2Width = <%% 27, 27, 27, 27, 27 %%>;

    mainImageWidth = <%% 450, 405, 370, 300, 73 %%>;
    mainImageTop = <%% -120, -104, -92, -75, -135 %%>;
    descriptionSize = <%% 17, 16, 15, 14, 3.4 %%>;
    descriptionWeight = <%% 300, 300, 300, 300, 600 %%>;
    descriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
    descriptionLineHeight2 = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

    image1Width = <%% 350, 350, 350, 350, 45 %%>;
    image1VisualLeft = <%% 2, 2, 2, 2, 2 %%>;
    image1Between = <%% 3.6, 3.6, 3.6, 3.6, 3.6 %%>;
    image1TextTop = <%% -5, -5, -5, -5, -5 %%>;

    image3MarginTop = <%% 6, 6, 6, 6, 6 %%>;
    image3Width = <%% 66, 66, 66, 66, 66 %%>;
    image3VisualLeft = <%% -1, -1, -1, -1, -1 %%>;

    totalBlockPaddingTop = <%% 140, 130, 110, 100, 140 %%>;
    totalBlockPaddingBottom = <%% 30, 20, 10, 10, 130 %%>;
    boxInnerPadding = <%% 130, 108, 90, 72, 45 %%>;
    boxInnerPaddingTop = <%% 90, 70, 60, 50, 60 %%>;

    secondAreaTextPaddingLeft = <%% 830, 610, 530, 410, 830 %%>;
    visualDescriptionPaddingBottom = <%% 10, 10, 10, 10, 10 %%>;

    whitePadding = <%% 150, 105, 90, 70, 150 %%>;

    phoneTop = <%% -110, -120, -110, -96, -110 %%>;
    phoneWidth = <%% 350, 304, 260, 220, 350 %%>;
    phoneHeight = <%% 730, 626, 550, 460, 730 %%>;

    supportWidth = <%% 470, 420, 350, 278, 44 %%>;
    supportTop = <%% 90, 64, 56, 45, 7 %%>;

    thirdPadding = <%% 140, 120, 106, 80, 9 %%>;

    if (media[0] && window.innerHeight > 1100) {
      totalBlockPaddingTop = 160;
      totalBlockPaddingBottom = 150;
    }

    if (desktop) {
      baseMother = createNode({
        mother: baseTong,
        class: [ secondBaseClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          paddingTop: String(totalBlockPaddingTop) + ea,
          paddingBottom: String(totalBlockPaddingBottom) + ea,
        },
        child: {
          style: {
            position: "absolute",
            top: String(0) + ea,
            left: String(-1 * ((window.innerWidth - standardWidth) / 2) - 1) + ea,
            background: colorExtended.white,
            width: "calc(100vw + 1px)",
            height: withOut(0, ea),
          },
        }
      });
    }

    // first
    // firstBase = createNode({
    //   mother: desktop ? baseMother : baseTong,
    //   class: [ secondBaseClassName ],
    //   style: {
    //     display: "flex",
    //     position: "relative",
    //     width: withOut(0, ea),
    //     justifyContent: "start",
    //     alignItems: "start",
    //     flexDirection: "column",
    //   },
    //   child: {
    //     style: {
    //       display: "block",
    //       position: "absolute",
    //       top: String(0),
    //       left: mobile ? String(-1 * mobileMargin) + ea : String(0) + ea,
    //       width: mobile ? withOut(-1 * mobileMargin * 2, ea) : withOut(0, ea),
    //       height: withOut(0, ea),
    //       background: colorExtended.white,
    //     },
    //     next: {
    //       style: {
    //         display: "block",
    //         position: "absolute",
    //         top: mobile ? String(slimMargin) + ea : String(0),
    //         left: mobile ? String(-1 * (mobileMargin - slimMargin)) + ea : String(0),
    //         width: mobile ? withOut(-1 * (mobileMargin - slimMargin) * 2, ea) : String(100) + '%',
    //         height: mobile ? withOut(slimMargin * 2, ea) : String(100) + '%',
    //         background: desktop ? colorExtended.gradientBlue9 : colorExtended.white,
    //         borderRadius: String(boxRadiusBig) + "px",
    //         border: desktop ? "4px solid " + colorExtended.blueWhiteWhiteBack : "",
    //         boxSizing: desktop ? "border-box" : "",
    //       }
    //     }
    //   }
    // });
    // firstBox = createNode({
    //   mother: firstBase,
    //   style: {
    //     display: "flex",
    //     position: "relative",
    //     padding: desktop ? String(boxInnerPadding) + ea : "",
    //     paddingTop: desktop ? String(boxInnerPaddingTop) + ea : "",
    //     paddingBottom: desktop ? String(boxInnerPaddingTop) + ea : "",
    //     width: desktop ? withOut(boxInnerPadding * 2, ea) : withOut(0, ea),
    //     justifyContent: "start",
    //     alignItems: "start",
    //     flexDirection: "column",
    //   }
    // });
    // createNode({
    //   mother: firstBox,
    //   style: {
    //     display: "inline-flex",
    //     position: "relative",
    //     flexDirection: "column",
    //     position: "relative",
    //     width: withOut(0, ea),
    //     justifyContent: "start",
    //     alignItems: "start",
    //     paddingTop: String(topBottomMargin) + ea,
    //   },
    //   child: {
    //     text: [
    //       "선호하는 <b%1명의 디자이너%b>를",
    //       "선택할 수 있어요.",
    //     ].join("\n"),
    //     style: {
    //       display: "inline-block",
    //       position: "relative",
    //       fontSize: String(title0Size) + ea,
    //       fontWeight: String(title0Weight),
    //       fontFamily: "pretendard",
    //       color: colorExtended.black,
    //       lineHeight: String(title0LineHeight),
    //     },
    //     bold: {
    //       fontSize: String(title0Size) + ea,
    //       fontWeight: String(title0Weight),
    //       fontFamily: "pretendard",
    //       color: colorExtended.mainBlue,
    //     },
    //     next: {
    //       style: {
    //         display: desktop ? "none" : "inline-block",
    //         position: "relative",
    //         width: String(line0Width) + ea,
    //         height: String(lineMarginTop) + ea,
    //         borderBottom: "2px solid " + colorExtended.black,
    //       }
    //     }
    //   }
    // });
    // createNode({
    //   mother: firstBox,
    //   style: {
    //     display: "inline-flex",
    //     position: "relative",
    //     flexDirection: "column",
    //     position: "relative",
    //     width: withOut(0, ea),
    //     justifyContent: "end",
    //     alignItems: "end",
    //     paddingTop: String(imageMarginTop) + ea,
    //   },
    //   child: {
    //     mode: "img",
    //     attribute: {
    //       src: FrontIndexJs.binaryPath + "/frontIndexSource1.png",
    //     },
    //     style: {
    //       display: "inline-block",
    //       position: mobile ? "relative" : "absolute",
    //       width: String(mainImageWidth) + ea,
    //       top: desktop ? String(mainImageTop) + ea : "",
    //     }
    //   }
    // });
    // createNode({
    //   mother: firstBox,
    //   style: {
    //     display: "inline-flex",
    //     position: "relative",
    //     flexDirection: "column",
    //     position: "relative",
    //     width: withOut(0, ea),
    //     justifyContent: "start",
    //     alignItems: "start",
    //     paddingTop: String(descriptionMarginTop) + ea,
    //     paddingBottom: String(desktop ? topBottomMarginBig : topBottomMargin) + ea,
    //   },
    //   child: {
    //     text: [
    //       "다양한 컨셉과 역량을 가진",
    //       String(instance.lengthDic.designer) + "명의 홈리에종 협업 디자이너",
    //     ].join("\n"),
    //     style: {
    //       display: "inline-block",
    //       position: "relative",
    //       fontSize: String(descriptionSize) + ea,
    //       fontWeight: String(descriptionWeight),
    //       fontFamily: "pretendard",
    //       color: colorExtended.black,
    //       lineHeight: String(descriptionLineHeight),
    //     },
    //   }
    // });

    // // second
    // if (mobile) {
    //   secondBase = createNode({
    //     mother: desktop ? baseMother : baseTong,
    //     class: [ secondBaseClassName ],
    //     style: {
    //       display: "flex",
    //       position: "relative",
    //       width: withOut(0, ea),
    //       justifyContent: "start",
    //       alignItems: "start",
    //       flexDirection: "column",
    //       height: desktop ? "" : String(baseModuleHeight) + ea,
    //     },
    //     child: {
    //       style: {
    //         display: "block",
    //         position: "absolute",
    //         top: String(0),
    //         left: String(-1 * mobileMargin) + ea,
    //         width: withOut(-1 * mobileMargin * 2, ea),
    //         height: withOut(0, ea),
    //         background: colorExtended.gradientBlue,
    //       },
    //       next: {
    //         style: {
    //           display: "block",
    //           position: "absolute",
    //           top: String(slimMargin) + ea,
    //           left: String(-1 * (mobileMargin - slimMargin)) + ea,
    //           width: withOut(-1 * (mobileMargin - slimMargin) * 2, ea),
    //           height: withOut(slimMargin * 2, ea),
    //           background: colorExtended.white,
    //           borderTopLeftRadius: String(boxRadiusBig) + "px",
    //           borderTopRightRadius: String(boxRadiusBig) + "px",
    //           borderBottomLeftRadius: String(boxRadiusSmall) + "px",
    //           borderBottomRightRadius: String(boxRadiusBig) + "px",
    //         },
    //         next: {
    //           style: {
    //             display: "block",
    //             position: "absolute",
    //             top: String(slimMargin) + ea,
    //             left: String(-1 * (mobileMargin - slimMargin)) + ea,
    //             width: withOut(-1 * (mobileMargin - slimMargin) * 2, ea),
    //             height: withOut(slimMargin * 2, ea),
    //             background: colorExtended.blueWhiteWhiteBack,
    //             opacity: String(0.4),
    //             borderRadius: String(boxRadiusBig) + "px",
    //           },
    //         },
    //       },
    //     }
    //   });
    //   secondBox = createNode({
    //     mother: secondBase,
    //     style: {
    //       display: "flex",
    //       position: "relative",
    //       width: withOut(0, ea),
    //       justifyContent: "start",
    //       alignItems: "end",
    //       top: String(slimMargin) + ea,
    //       height: withOut(slimMargin * 2, ea),
    //       flexDirection: "row",
    //     }
    //   });
    //   createNode({
    //     mother: secondBox,
    //     mode: "img",
    //     attribute: {
    //       src: FrontIndexJs.binaryPath + (desktop ? "/frontIndexSource4Desktop.png" : "/frontIndexSource4.png"),
    //     },
    //     style: {
    //       display: "inline-block",
    //       position: "relative",
    //       width: String(image1Width) + ea,
    //       marginLeft: String(image1VisualLeft) + ea,
    //     }
    //   });
    //   createNode({
    //     mother: secondBox,
    //     style: {
    //       display: "inline-flex",
    //       flexDirection: "column",
    //       position: "relative",
    //       justifyContent: "start",
    //       alignItems: "start",
    //       paddingLeft: String(image1Between) + ea,
    //       top: String(image1TextTop) + ea,
    //     },
    //     child: {
    //       text: [
    //         "끌려가는",
    //         "인테리어? NO!",
    //         "<b%내가 원하는 컨셉%b>을",
    //         "실현해요."
    //       ].join("\n"),
    //       style: {
    //         display: "inline-block",
    //         position: "relative",
    //         fontSize: String(title0Size) + ea,
    //         fontWeight: String(title0Weight),
    //         fontFamily: "pretendard",
    //         color: colorExtended.black,
    //         lineHeight: String(title0LineHeight),
    //       },
    //       bold: {
    //         fontSize: String(title0Size) + ea,
    //         fontWeight: String(title0Weight),
    //         fontFamily: "pretendard",
    //         color: colorExtended.mainBlue,
    //       },
    //       next: {
    //         style: {
    //           display: "inline-block",
    //           position: "relative",
    //           width: String(line1Width) + ea,
    //           height: String(lineMarginTop) + ea,
    //           borderBottom: "2px solid " + colorExtended.black,
    //         },
    //         next: {
    //           style: {
    //             display: "inline-flex",
    //             position: "relative",
    //             flexDirection: "column",
    //             position: "relative",
    //             justifyContent: "start",
    //             alignItems: "start",
    //             paddingTop: String(descriptionMarginTop2) + ea,
    //             paddingBottom: String(topBottomMargin) + ea,
    //           },
    //           child: {
    //             text: [
    //               "시공범위와 퍼니싱 정도를",
    //               "내 마음대로 조절하는",
    //               "진정한 맞춤형 서비스",
    //             ].join("\n"),
    //             style: {
    //               display: "inline-block",
    //               position: "relative",
    //               fontSize: String(descriptionSize) + ea,
    //               fontWeight: String(descriptionWeight),
    //               fontFamily: "pretendard",
    //               color: colorExtended.black,
    //               lineHeight: String(descriptionLineHeight2),
    //             },
    //           }
    //         }
    //       }
    //     }
    //   });
    // } else {
    //   secondBase = createNode({
    //     mother: desktop ? baseMother : baseTong,
    //     class: [ secondBaseClassName ],
    //     style: {
    //       display: "flex",
    //       position: "relative",
    //       width: withOut(0, ea),
    //       justifyContent: "start",
    //       alignItems: "start",
    //       flexDirection: "column",
    //       height: desktop ? "" : String(baseModuleHeight) + ea,
    //     },
    //     child: {
    //       style: {
    //         display: "block",
    //         position: "absolute",
    //         top: String(0),
    //         left: desktop ? String(0) + ea : String(-1 * mobileMargin) + ea,
    //         width: desktop ? withOut(0, ea) : withOut(-1 * mobileMargin * 2, ea),
    //         height: withOut(0, ea),
    //         background: colorExtended.white,
    //       },
    //     }
    //   });
    //   secondBox = createNode({
    //     mother: secondBase,
    //     style: {
    //       display: "flex",
    //       position: "relative",
    //       width: withOut(0, ea),
    //       justifyContent: "start",
    //       alignItems: "end",
    //       flexDirection: "row",
    //     }
    //   });
    //   createNode({
    //     mother: secondBox,
    //     style: {
    //       display: "inline-block",
    //       position: "absolute",
    //       width: String(phoneWidth - 4) + ea,
    //       height: String(phoneHeight - 4) + ea,
    //       left: String(boxInnerPadding + 2) + ea,
    //       top: String(phoneTop + 2) + ea,
    //       zIndex: String(1),
    //       borderRadius: String(57) + ea,
    //       boxShadow: "18px 18px 45px -12px " + colorExtended.black,
    //     }
    //   });
    //   createNode({
    //     mother: secondBox,
    //     mode: "img",
    //     attribute: {
    //       src: FrontIndexJs.binaryPath + (desktop ? "/frontIndexSource4Desktop.png" : "/frontIndexSource4.png"),
    //     },
    //     style: {
    //       display: "inline-block",
    //       position: "absolute",
    //       width: String(phoneWidth) + ea,
    //       height: String(phoneHeight) + ea,
    //       left: String(boxInnerPadding) + ea,
    //       top: String(phoneTop) + ea,
    //       zIndex: String(2),
    //     }
    //   });
    //   createNode({
    //     mother: secondBox,
    //     style: {
    //       display: "inline-flex",
    //       flexDirection: "column",
    //       position: "relative",
    //       justifyContent: "start",
    //       alignItems: "start",
    //       paddingLeft: String(secondAreaTextPaddingLeft) + ea,
    //       paddingTop: String(whitePadding) + ea,
    //       paddingBottom: String(whitePadding) + ea,
    //     },
    //     child: {
    //       text: [
    //         "끌려가는 인테리어? NO!",
    //         "<b%내가 원하는 컨셉%b>을 실현해요."
    //       ].join("\n"),
    //       style: {
    //         display: "inline-block",
    //         position: "relative",
    //         fontSize: String(title0Size) + ea,
    //         fontWeight: String(title0Weight),
    //         fontFamily: "pretendard",
    //         color: colorExtended.black,
    //         lineHeight: String(title0LineHeight),
    //       },
    //       bold: {
    //         fontSize: String(title0Size) + ea,
    //         fontWeight: String(title0Weight),
    //         fontFamily: "pretendard",
    //         color: colorExtended.mainBlue,
    //       },
    //       next: {
    //         style: {
    //           display: "none",
    //           position: "relative",
    //           width: String(line1Width) + ea,
    //           height: String(lineMarginTop) + ea,
    //           borderBottom: "2px solid " + colorExtended.black,
    //         },
    //         next: {
    //           style: {
    //             display: "inline-flex",
    //             position: "relative",
    //             flexDirection: "column",
    //             position: "relative",
    //             justifyContent: "start",
    //             alignItems: "start",
    //             paddingTop: String(descriptionMarginTop) + ea,
    //             paddingBottom: String(visualDescriptionPaddingBottom) + ea,
    //           },
    //           child: {
    //             text: [
    //               "시공범위와 퍼니싱 정도를",
    //               "내 마음대로 조절하는 진정한 맞춤형 서비스",
    //             ].join("\n"),
    //             style: {
    //               display: "inline-block",
    //               position: "relative",
    //               fontSize: String(descriptionSize) + ea,
    //               fontWeight: String(descriptionWeight),
    //               fontFamily: "pretendard",
    //               color: colorExtended.black,
    //               lineHeight: String(descriptionLineHeight2),
    //             },
    //           }
    //         }
    //       }
    //     }
    //   });
    // }

    // // third
    // thirdBase = createNode({
    //   mother: desktop ? baseMother : baseTong,
    //   class: [ secondBaseClassName ],
    //   style: {
    //     display: "flex",
    //     position: "relative",
    //     width: withOut(0, ea),
    //     justifyContent: "start",
    //     alignItems: "start",
    //     flexDirection: "column",
    //   },
    //   child: {
    //     style: {
    //       display: "block",
    //       position: "absolute",
    //       top: String(0),
    //       left: mobile ? String(-1 * mobileMargin) + ea : String(0) + ea,
    //       width: mobile ? withOut(-1 * mobileMargin * 2, ea) : withOut(0, ea),
    //       height: withOut(0, ea),
    //       background: colorExtended.white,
    //     },
    //     next: {
    //       style: {
    //         display: "block",
    //         position: "absolute",
    //         top: mobile ? String(slimMargin) + ea : String(0),
    //         left: mobile ? String(-1 * (mobileMargin - slimMargin)) + ea : String(0),
    //         width: mobile ? withOut(-1 * (mobileMargin - slimMargin) * 2, ea) : String(100) + '%',
    //         height: mobile ? withOut(slimMargin * 2, ea) : String(100) + '%',
    //         background: desktop ? colorExtended.gradientBlue9 : colorExtended.white,
    //         borderRadius: String(boxRadiusBig) + "px",
    //         border: desktop ? "4px solid " + colorExtended.blueWhiteWhiteBack : "",
    //         boxSizing: desktop ? "border-box" : "",
    //       }
    //     }
    //   }
    // });
    // thirdBox = createNode({
    //   mother: thirdBase,
    //   style: {
    //     display: "flex",
    //     position: "relative",
    //     padding: desktop ? String(boxInnerPadding) + ea : "",
    //     paddingTop: desktop ? String(boxInnerPaddingTop) + ea : "",
    //     paddingBottom: desktop ? String(boxInnerPaddingTop) + ea : "",
    //     width: desktop ? withOut(boxInnerPadding * 2, ea) : withOut(0, ea),
    //     justifyContent: "start",
    //     alignItems: "start",
    //     flexDirection: "column",
    //   }
    // });
    // createNode({
    //   mother: thirdBox,
    //   style: {
    //     display: "inline-flex",
    //     position: "relative",
    //     flexDirection: "column",
    //     position: "relative",
    //     width: withOut(0, ea),
    //     justifyContent: "start",
    //     alignItems: "start",
    //     paddingTop: desktop ? String(thirdPadding) + ea : String(topBottomMargin) + ea,
    //   },
    //   child: {
    //     text: [
    //       "기획을 먼저 잡고",
    //       "<b%필요한 시공%b>만 진행해요.",
    //     ].join("\n"),
    //     style: {
    //       display: "inline-block",
    //       position: "relative",
    //       fontSize: String(title0Size) + ea,
    //       fontWeight: String(title0Weight),
    //       fontFamily: "pretendard",
    //       color: colorExtended.black,
    //       lineHeight: String(title0LineHeight),
    //     },
    //     bold: {
    //       fontSize: String(title0Size) + ea,
    //       fontWeight: String(title0Weight),
    //       fontFamily: "pretendard",
    //       color: colorExtended.mainBlue,
    //     },
    //     next: {
    //       style: {
    //         display: desktop ? "none" : "inline-block",
    //         position: "relative",
    //         width: String(line2Width) + ea,
    //         height: String(imageMarginTop) + ea,
    //         borderBottom: "2px solid " + colorExtended.black,
    //       }
    //     }
    //   }
    // });
    // createNode({
    //   mother: thirdBox,
    //   style: {
    //     display: "inline-flex",
    //     position: "relative",
    //     flexDirection: "column",
    //     position: "relative",
    //     width: withOut(0, ea),
    //     justifyContent: "end",
    //     alignItems: "end",
    //     paddingTop: String(imageMarginTop) + ea,
    //   },
    //   child: {
    //     mode: "img",
    //     attribute: {
    //       src: FrontIndexJs.binaryPath + "/frontIndexSource2.png",
    //     },
    //     style: {
    //       display: "inline-block",
    //       position: mobile ? "relative" : "absolute",
    //       width: String(mainImageWidth) + ea,
    //       top: desktop ? String(mainImageTop * 2) + ea : "",
    //     }
    //   }
    // });
    // createNode({
    //   mother: thirdBox,
    //   style: {
    //     display: "inline-flex",
    //     position: "relative",
    //     flexDirection: "column",
    //     position: "relative",
    //     width: withOut(0, ea),
    //     justifyContent: "start",
    //     alignItems: "start",
    //     paddingTop: String(descriptionMarginTop) + ea,
    //     paddingBottom: String(desktop ? 0 : topBottomMargin) + ea,
    //   },
    //   child: {
    //     text: [
    //       "무리한 시공에 대한 위험을 막아드릴게요.",
    //       "필요한 시공만 합리적으로!",
    //     ].join("\n"),
    //     style: {
    //       display: "inline-block",
    //       position: "relative",
    //       fontSize: String(descriptionSize) + ea,
    //       fontWeight: String(descriptionWeight),
    //       fontFamily: "pretendard",
    //       color: colorExtended.black,
    //       lineHeight: String(descriptionLineHeight),
    //     },
    //   }
    // });

    // fourth
    if (mobile) {
      fourthBase = createNode({
        mother: desktop ? baseMother : baseTong,
        class: [ secondBaseClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          height: desktop ? "" : String(baseModuleHeight2) + ea,
        },
        child: {
          style: {
            display: "block",
            position: "absolute",
            top: String(0),
            left: String(-1 * mobileMargin) + ea,
            width: withOut(-1 * mobileMargin * 2, ea),
            height: withOut(0, ea),
            background: colorExtended.gradientBlue,
          },
          next: {
            style: {
              display: "block",
              position: "absolute",
              top: String(slimMargin) + ea,
              left: String(-1 * (mobileMargin - slimMargin)) + ea,
              width: withOut(-1 * (mobileMargin - slimMargin) * 2, ea),
              height: withOut(slimMargin * 2, ea),
              background: colorExtended.white,
              borderTopLeftRadius: String(boxRadiusBig) + "px",
              borderTopRightRadius: String(boxRadiusBig) + "px",
              borderBottomRightRadius: String(boxRadiusSmall) + "px",
              borderBottomLeftRadius: String(boxRadiusBig) + "px",
            },
            next: {
              style: {
                display: "block",
                position: "absolute",
                top: String(slimMargin) + ea,
                left: String(-1 * (mobileMargin - slimMargin)) + ea,
                width: withOut(-1 * (mobileMargin - slimMargin) * 2, ea),
                height: withOut(slimMargin * 2, ea),
                background: colorExtended.blueWhiteWhiteBack,
                opacity: String(0.4),
                borderRadius: String(boxRadiusBig) + "px",
              },
            },
          },
        }
      });
      fourthBox = createNode({
        mother: fourthBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          top: String(slimMargin) + ea,
          height: withOut(slimMargin * 2, ea),
          flexDirection: "column",
        }
      });
      createNode({
        mother: fourthBox,
        style: {
          display: "inline-flex",
          position: "relative",
          flexDirection: "column",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          text: [
            "문제가 발생하면",
            "든든한 프로젝트 케어 매니저가",
            "<b%해결%b>해줄거에요.",
          ].join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(title1Size) + ea,
            fontWeight: String(title0Weight),
            fontFamily: "pretendard",
            color: colorExtended.black,
            lineHeight: String(title1LineHeight),
            textAlign: "center",
          },
          bold: {
            fontSize: String(title1Size) + ea,
            fontWeight: String(title0Weight),
            fontFamily: "pretendard",
            color: colorExtended.mainBlue,
          },
        }
      });
      createNode({
        mother: fourthBox,
        style: {
          display: "inline-flex",
          position: "relative",
          flexDirection: "column",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          paddingTop: String(image3MarginTop) + ea,
        },
        child: {
          mode: "img",
          attribute: {
            src: FrontIndexJs.binaryPath + "/frontIndexSource3.png",
          },
          style: {
            display: "inline-block",
            position: "relative",
            width: String(image3Width) + ea,
            left: String(image3VisualLeft) + ea,
          }
        }
      });
      createNode({
        mother: fourthBox,
        style: {
          display: "inline-flex",
          position: "relative",
          flexDirection: "column",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          paddingTop: String(descriptionMarginTop3) + ea,
        },
        child: {
          text: [
            "예상하지 못한 상황에도",
            "안심하고 인테리어를 진행할 수 있어요.",
          ].join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(descriptionWeight),
            fontFamily: "pretendard",
            color: colorExtended.black,
            lineHeight: String(descriptionLineHeight),
            textAlign: "center",
          },
        }
      });
    } else {
      secondBase = createNode({
        mother: desktop ? baseMother : baseTong,
        class: [ secondBaseClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          height: desktop ? "" : String(baseModuleHeight) + ea,
        },
        child: {
          style: {
            display: "block",
            position: "absolute",
            top: String(0),
            left: desktop ? String(0) + ea : String(-1 * mobileMargin) + ea,
            width: desktop ? withOut(0, ea) : withOut(-1 * mobileMargin * 2, ea),
            height: withOut(0, ea),
            background: colorExtended.white,
          },
        }
      });
      secondBox = createNode({
        mother: secondBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "end",
          flexDirection: "row",
        }
      });
      createNode({
        mother: secondBox,
        mode: "img",
        attribute: {
          src: FrontIndexJs.binaryPath + "/frontIndexSource3.png",
        },
        style: {
          display: "inline-block",
          position: "absolute",
          width: String(supportWidth) + ea,
          left: String(boxInnerPadding) + ea,
          top: String(supportTop) + ea,
          zIndex: String(2),
        }
      });
      createNode({
        mother: secondBox,
        style: {
          display: "inline-flex",
          flexDirection: "column",
          position: "relative",
          justifyContent: "start",
          alignItems: "start",
          paddingLeft: String(secondAreaTextPaddingLeft) + ea,
          paddingTop: String(whitePadding) + ea,
          paddingBottom: String(whitePadding) + ea,
        },
        child: {
          text: [
            "문제가 발생시 든든한",
            "프로젝트 케어 매니저가 해결해요."
          ].join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(title0Size) + ea,
            fontWeight: String(title0Weight),
            fontFamily: "pretendard",
            color: colorExtended.black,
            lineHeight: String(title0LineHeight),
          },
          bold: {
            fontSize: String(title0Size) + ea,
            fontWeight: String(title0Weight),
            fontFamily: "pretendard",
            color: colorExtended.mainBlue,
          },
          next: {
            style: {
              display: "none",
              position: "relative",
              width: String(line1Width) + ea,
              height: String(lineMarginTop) + ea,
              borderBottom: "2px solid " + colorExtended.black,
            },
            next: {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "column",
                position: "relative",
                justifyContent: "start",
                alignItems: "start",
                paddingTop: String(descriptionMarginTop) + ea,
                paddingBottom: String(visualDescriptionPaddingBottom) + ea,
              },
              child: {
                text: [
                  "예상하지 못한 상황에도",
                  "안심하고 인테리어를 진행할 수 있어요.",
                ].join("\n"),
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(descriptionSize) + ea,
                  fontWeight: String(descriptionWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  lineHeight: String(descriptionLineHeight2),
                },
              }
            }
          }
        }
      });
    }

  } catch (e) {
    console.log(e);
  }
}

FrontIndexJs.prototype.insertConsultingBox = async function (lastMode = false) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, selfHref } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { secondBaseClassName } = this;
  try {
    let boxRadius;
    let moreAreaHeight;
    let mobileMargin;
    let firstBox, secondBox, thirdBox, fourthBox;
    let firstBase, secondBase, thirdBase, fourthBase;
    let topBottomMargin;
    let slimMargin;
    let boxRadiusBig;
    let boxRadiusSmall;
    let baseModuleHeight;
    let fifthBase, fifthBox;
    let imageMarginTop;
    let descriptionMarginTop;
    let baseModuleHeight2;
    let finalModuleHeight;
    let baseHeight;
    let buttonMarginTop;
    let title1Size;
    let title0Weight;
    let title1LineHeight;
    let descriptionSize, descriptionWeight, descriptionLineHeight;
    let buttonSize, buttonWeight, buttonLineHeight, buttonTextTop;
    let commentsWidth, commentsHeight, commentsRadius, commentsTop, commentsSize, commentsWeight, commentsLineHeight, commentsTextTop, commentsTriangleWidth, commentsTriangleTop;
    let buttonHeight;
    let lastMoreWidth, lastMoreHeight, lastMoreTop, lastMoreRadius, lastMoreSize, lastMoreWeight, lastMoreLineHeight, lastMoreTextTop;
    let totalBlockPaddingTop;
    let totalBlockPaddingBottom;
    let buttonWidth;

    boxRadius = <%% 15, 15, 15, 15, 15 %%>;
    boxRadiusBig = <%% 20, 20, 20, 20, 20 %%>;
    boxRadiusSmall = <%% 2, 2, 2, 2, 2 %%>;

    moreAreaHeight = <%% 36, 36, 36, 36, 12 %%>;
    mobileMargin = <%% 6, 6, 6, 6, 6 %%>;
    slimMargin = <%% 3, 3, 3, 3, 3 %%>;

    topBottomMargin = <%% 14, 14, 14, 14, 14 %%>;

    descriptionMarginTop = <%% 16, 12, 10, 8, 3 %%>;
    imageMarginTop = <%% 3, 3, 3, 3, 3 %%>;

    title1Size = <%% 29, 26, 24, 21, 4.8 %%>;
    title0Weight = <%% 600, 600, 600, 600, 600 %%>;
    title1LineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

    descriptionSize = <%% 16, 15, 14, 13, 3.4 %%>;
    descriptionWeight = <%% 500, 500, 500, 500, 500 %%>;
    descriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

    buttonSize = <%% 17, 16, 15, 14, 3.5 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 600 %%>;
    buttonLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
    buttonTextTop = <%% (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), -0.1 %%>;
    buttonHeight = <%% 48, 45, 42, 36, 11 %%>;
    buttonWidth = <%% 300, 352, 320, 275, 3 %%>;

    commentsWidth = <%% 120, 120, 120, 100, 24 %%>;
    commentsHeight = <%% 28, 28, 28, 24, 6.6 %%>;
    commentsRadius = <%% 5, 5, 5, 5, 5 %%>;
    commentsTop = <%% -34, -34, -34, -28, -7.6 %%>;
    commentsSize = <%% 12, 12, 12, 10, 2.5 %%>;
    commentsWeight = <%% 700, 700, 700, 700, 700 %%>;
    commentsLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
    commentsTextTop = <%% (isMac() ? -1 : -0), (isMac() ? -1 : -0), (isMac() ? -1 : -0), (isMac() ? -1 : -0), -0.1 %%>;
    commentsTriangleWidth = <%% 10, 10, 10, 8, 2.6 %%>;
    commentsTriangleTop = <%% 27, 27, 27, 23, 6.2 %%>;

    lastMoreWidth = <%% 96, 96, 84, 72, 17 %%>;
    lastMoreHeight = <%% 36, 36, 32, 28, 7 %%>;
    lastMoreTop = <%% -260, -260, -260, -260, -26 %%>;
    lastMoreRadius = <%% 7, 7, 7, 7, 7 %%>;
    lastMoreSize = <%% 16, 16, 15, 14, 3 %%>;
    lastMoreWeight = <%% 700, 700, 700, 700, 700 %%>;
    lastMoreLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
    lastMoreTextTop = <%% (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), -0.1 %%>;

    baseHeight = lastMode ? 42 : 92;
    buttonMarginTop = <%% 70, 68, 60, 56, 16 %%>;
    if (desktop) {
      buttonMarginTop = lastMode ? 1 : buttonMarginTop;
    } else {
      buttonMarginTop = lastMode ? 1 : 16;
    }

    totalBlockPaddingTop = <%% 140, 130, 110, 100, 140 %%>;
    totalBlockPaddingBottom = <%% 130, 120, 110, 100, 130 %%>;

    // fifth
    if (mobile) {
      fifthBase = createNode({
        mother: baseTong,
        class: [ secondBaseClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          height: String(baseHeight) + ea,
        },
        child: {
          style: {
            display: "block",
            position: "absolute",
            top: String(0),
            left: String(-1 * mobileMargin) + ea,
            width: withOut(-1 * mobileMargin * 2, ea),
            height: withOut(0, ea),
            background: lastMode ? colorExtended.gradientBlue2 : colorExtended.black,
          },
        }
      });
    } else {
      fifthBase = createNode({
        mother: baseTong,
        class: [ secondBaseClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          paddingTop: String(lastMode ? 100 : totalBlockPaddingTop) + ea,
          paddingBottom: String(lastMode ? 100 : totalBlockPaddingBottom) + ea,
        },
        child: {
          style: {
            position: "absolute",
            top: String(0) + ea,
            left: String(-1 * ((window.innerWidth - standardWidth) / 2) - 1) + ea,
            background: lastMode ? colorExtended.gradientBlue2 : colorExtended.black,
            width: "calc(100vw + 1px)",
            height: withOut(0, ea),
          },
        }
      });
    }
    fifthBox = createNode({
      mother: fifthBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        top: String(slimMargin) + ea,
        height: withOut(slimMargin * 2, ea),
        flexDirection: "column",
      }
    });

    if (!lastMode) {
      createNode({
        mother: fifthBox,
        style: {
          display: "inline-flex",
          position: "relative",
          flexDirection: "column",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          text: [
            "어떤 서비스를 선택할지 어려워요!",
          ].join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(title1Size) + ea,
            fontWeight: String(title0Weight),
            fontFamily: "pretendard",
            color: colorExtended.white,
            lineHeight: String(title1LineHeight),
            textAlign: "center",
          },
          bold: {
            fontSize: String(title1Size) + ea,
            fontWeight: String(title0Weight),
            fontFamily: "pretendard",
            color: colorExtended.mainBlue,
          },
        }
      });
      createNode({
        mother: fifthBox,
        style: {
          display: "inline-flex",
          position: "relative",
          flexDirection: "column",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          paddingTop: String(descriptionMarginTop) + ea,
        },
        child: {
          text: [
            "부담 없는 인테리어 상담을 도와드립니다.",
            "합리적인 서비스를 경험하세요.",
          ].join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(descriptionWeight),
            fontFamily: "pretendard",
            color: colorExtended.mainBlue,
            lineHeight: String(descriptionLineHeight),
            textAlign: "center",
          },
        }
      });
    }

    createNode({
      mother: fifthBox,
      event: {
        click: (e) => { selfHref(FRONTHOST + "/consulting.php") }
      },
      style: {
        display: "inline-flex",
        position: "relative",
        flexDirection: "column",
        position: "relative",
        width: desktop ? String(buttonWidth) + ea : withOut(0, ea),
        height: String(buttonHeight) + ea,
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(buttonMarginTop) + ea,
        borderRadius: String(boxRadius) + "px",
        background: lastMode ? colorExtended.darkBlack : colorExtended.gradientBlue2,
      },
      child: {
        text: [
          "인테리어 무료 상담 받기",
        ].join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(buttonSize) + ea,
          fontWeight: String(buttonWeight),
          fontFamily: "pretendard",
          color: lastMode ? colorExtended.white : colorExtended.black,
          lineHeight: String(buttonLineHeight),
          textAlign: "center",
          top: String(buttonTextTop) + ea,
        },
        next: {
          style: {
            position: "absolute",
            display: "inline-flex",
            flexDirection: "column",
            width: String(commentsWidth) + ea,
            height: String(commentsHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: String(commentsRadius) + "px",
            background: lastMode ? colorExtended.blueDim : colorExtended.subRed,
            top: String(commentsTop) + ea,
            boxShadow: "0px 10px 32px -9px " + colorExtended.ultimateBlack,
          },
          child: {
            text: [
              "간편 상담 신청하고",
            ].join("\n"),
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(commentsSize) + ea,
              fontWeight: String(commentsWeight),
              fontFamily: "pretendard",
              color: colorExtended.white,
              lineHeight: String(commentsLineHeight),
              textAlign: "center",
              top: String(commentsTextTop) + ea,
            },
            next: {
              mode: "svg",
              source: svgMaker.generalTriangle(lastMode ? colorExtended.blueDim : colorExtended.subRed),
              style: {
                width: String(commentsTriangleWidth) + ea,
                position: "absolute",
                left: "calc(50% - " + String(commentsTriangleWidth / 2) + ea + ")",
                top: String(commentsTriangleTop) + ea,
              }
            }
          }
        }
      }
    });

    if (lastMode) {
      createNode({
        mother: fifthBox,
        event: {
          click: (e) => { selfHref(FRONTHOST + "/portfolio.php") },
        },
        style: {
          display: "inline-flex",
          position: "absolute",
          flexDirection: "column",
          width: String(lastMoreWidth) + ea,
          height: String(lastMoreHeight) + ea,
          justifyContent: "center",
          top: String(lastMoreTop) + ea,
          alignItems: "center",
          marginTop: String(buttonMarginTop) + ea,
          borderRadius: String(lastMoreRadius) + ea,
          background: colorExtended.blueDark,
          cursor: "pointer",
        },
        child: {
          text: [
            "더보기",
          ].join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(lastMoreSize) + ea,
            fontWeight: String(lastMoreWeight),
            fontFamily: "pretendard",
            color: colorExtended.white,
            lineHeight: String(lastMoreLineHeight),
            textAlign: "center",
            top: String(lastMoreTextTop) + ea,
          },
        }
      });
    }

  } catch (e) {
    console.log(e);
  }
}

FrontIndexJs.prototype.insertServiceDetailBox = async function (secondBaseMother = null, serviceIndex = 0) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, zeroAddition } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { secondBaseClassName } = this;
  try {
    let secondBase;
    let contents;
    let moreWords;
    let num;
    let boxRadius;
    let moreAreaHeight;
    let moreSize, moreWeight;
    let moreTextTop;
    let mobileMargin;
    let blackTop;
    let whiteBlockBetween;
    let whiteBlockHeight;
    let whiteBlock;
    let barMargin;
    let topBottomMargin;
    let blueBlock;
    let blueBlockBetween;
    let titleSize;
    let imageReviewBox;
    let imageBoxWidth;
    let imageScale;
    let imageOpacity;
    let imageMarginTop;
    let selectionButtons;
    let tableColumns;
    let tableTitle, tableDescription;
    let thisServiceBase;
    let selectionButtonsBase;
    let serviceButtonBlock;
    let num2;
    let boo;
    let mainServiceBlock;
    let blackBlock;
    let solveBlock;
    let thisBlueOpacity;
    let photoBlock;
    let blackBlueArea;
    let num3;
    let solveListArea;
    let num4;
    let solveBlockHeight;
    let blockBetween;
    let commentsTitleSize;
    let photoHeight;
    let photoBetween;
    let serviceAreaBetween;
    let photoWidth;
    let photoRadius;
    let tableBase;
    let bigMargin;
    let tableMother;
    let tableFactor;
    let num5;
    let tableFactorHeight;
    let tableFactorWidth0, tableFactorWidth1;
    let factorBetween;
    let factorSize;
    let factorTextTop;
    let factorRadius;
    let furnishingObj;
    let stylingObj;
    let totalObj;
    let middleMargin;
    let secondBasePaddingTop;
    let selectionButtonsBaseMarginBottom, selectionButtonsPaddingLeft;
    let selectionButtonsBlockBetween;
    let selectionButtonsBlockHeight;
    let selectionButtonsSquareWidth, selectionButtonsSquareRadius, selectionButtonsSquareBetween;
    let selectionButtonsSquareSize, selectionButtonsSquareWeight;
    let mainServiceBlockHeight, mainServiceBlockMarginBottom;
    let factorWeight;
    let factorBoldWeight;
    let mainServiceBlockDotPointWidth;
    let mainServiceBlockDotPointIndent;
    let mainServiceBlockDotPointOpacity;
    let titleWeight, titleMarginBottom;
    let titleEngSize, titleEngWeight;
    let blackLineWidth, blackLineHeight, blackLineMarginBottom, blackLineStroke;
    let descriptionSize, descriptionWeight, descriptionLineHeight;
    let blackBackTop;
    let blackBackRadius;
    let quotePaddingLeft, quoteMarginBottom, quoteWidth;
    let commentsTitleWeight, commentsTitleLineHeight;
    let blackBlueAreaPaddingTop0, blackBlueAreaPaddingTop1;
    let blueButtonHeight, blueButtonPadding, blueButtonBetween;
    let blueRightMMargin0, blueRightMMargin1;
    let blueDotPointWidth, blueDotPointIndent;
    let blueSize, blueWeight, blueTextTop;
    let tableBasePaddingTop, tableBasePaddingBottom;
    let solveBlockPaddingLeft, solveBlockMarginBottom;
    let whiteSquareWidth, whiteSquareTop, whiteSquareLeft, whiteSquareRadius, whiteSquareOpacity;
    let solveDescriptionMarginTop;
    let solveTextTextTop, solveTextSize, solveTextWeight;
    let photoZonePaddingTop, photoZonePaddingBottom;
    let tableTitleBlockWidth, tableTitleBlockHeight;
    let tableTitleSize, tableTitleWeight, tableTitleTextTop;
    let tableDescriptionSize, tableDescriptionWeight, tableDescriptionLineHeight, tableDescriptionMarginTop, tableDescriptionMarginBottom;
    let ratioConst;
    let mainBoxPaddingBottomVisual;
    let totalWidth;
    let titleVisualPaddingBottom;
    let blackBlueAreaHeight;
    let blackBlueAreaTop;
    let blackBlueAreaRight;
    let blackBlueFactorBetween;
    let solveEngSize;
    let whiteStandardWidth;
    let minusLeft;
    let desktopSolveSize;
    let desktopSolveMarginLeft;
    let solveListAreaTop;
    let solveListAreaWidth;
    let blackAreaPaddingTop, blackAreaPaddingBottom;
    let blueAreaPaddingTop, blueAreaPaddingBottom;
    let tableBasePaddingTopDesktop, tableBasePaddingBottomDesktop;

    boxRadius = <%% 15, 15, 15, 15, 15 %%>;
    photoRadius = <%% 8, 8, 8, 8, 8 %%>;
    moreAreaHeight = <%% 12, 12, 12, 12, 12 %%>;
    factorRadius = <%% 4, 4, 4, 4, 4 %%>;

    moreSize = <%% 3.2, 3.2, 3.2, 3.2, 3.2 %%>;
    moreWeight = <%% 600, 600, 600, 600, 600 %%>;
    moreTextTop = <%% -0.2, -0.2, -0.2, -0.2, -0.2 %%>;

    mobileMargin = <%% 6, 6, 6, 6, 6 %%>;
    blackTop = <%% -31, -31, -31, -31, -31 %%>;

    whiteBlockBetween = <%% 4, 4, 4, 4, 4 %%>;

    whiteBlockHeight = <%% 80, 80, 80, 80, 80 %%>;
    barMargin = <%% 2.5, 2.5, 2.5, 2.5, 2.5 %%>;

    topBottomMargin = <%% 9, 9, 9, 9, 9 %%>;

    blueBlockBetween = <%% 1.8, 1.8, 1.8, 1.8, 1.8 %%>;

    titleSize = <%% 28, 27, 24, 22, 5.2 %%>;
    titleWeight = <%% 700, 700, 700, 700, 700 %%>;
    titleMarginBottom = <%% 0.1, 0.1, 0.1, 0.1, 0.1 %%>;

    titleEngSize = <%% 16, 16, 13, 10, 2.3 %%>;
    titleEngWeight = <%% 700, 700, 700, 700, 700 %%>;

    imageBoxWidth = <%% 62, 62, 62, 62, 62 %%>;
    imageScale = <%% 0.84, 0.84, 0.84, 0.84, 0.84 %%>;
    imageOpacity = <%% 0.4, 0.4, 0.4, 0.4, 0.4 %%>;

    imageMarginTop = <%% 3, 3, 3, 3, 3 %%>;

    commentsTitleSize = <%% 24, 24, 22, 20, 5.4 %%>;

    photoHeight = <%% 247, 221, 232, 178, 68 %%>;
    photoWidth = <%% 140, 120, 120, 120, 280 %%>;
    photoBetween = <%% 4, 5, 3.5, 3.5, 2.5 %%>;

    serviceAreaBetween = <%% 24, 24, 24, 24, 24 %%>;

    middleMargin = <%% 45, 45, 45, 45, 8 %%>;
    bigMargin = <%% 45, 45, 45, 45, 12 %%>;
    tableFactorHeight = <%% 36, 36, 32, 30, 8.2 %%>;
    factorBetween = <%% 3, 3, 3, 2, 0.4 %%>;
    tableFactorWidth0 = <%% 150, 150, 140, 100, 11.5 %%>;
    tableFactorWidth1 = (standardWidth - tableFactorWidth0 - (factorBetween * 3)) / 3;

    secondBasePaddingTop = <%% 4, 4, 4, 4, 4 %%>;
    selectionButtonsBaseMarginBottom = <%% 10, 10, 10, 10, 1.6 %%>;
    selectionButtonsPaddingLeft = <%% 1, 1, 1, 1, 1 %%>;

    selectionButtonsBlockBetween = <%% 10, 10, 8, 6, 3 %%>;
    selectionButtonsBlockHeight = <%% 20, 20, 16, 14, 3 %%>;
    selectionButtonsSquareWidth = <%% 10, 10, 8, 6, 2 %%>;
    selectionButtonsSquareRadius = <%% 2, 2, 2, 2, 1 %%>;
    selectionButtonsSquareBetween = <%% 4, 4, 4, 3, 1 %%>;

    selectionButtonsSquareSize = <%% 12, 12, 11, 10, 2.5 %%>;
    selectionButtonsSquareWeight = <%% 700, 700, 700, 700, 700 %%>;

    mainServiceBlockHeight = <%% 245, 235, 220, 200, 52 %%>;
    mainServiceBlockMarginBottom = <%% 20, 20, 18, 17, 2 %%>;

    mainServiceBlockDotPointWidth = <%% 1.3, 1.3, 1.3, 1.3, 1.3 %%>;
    mainServiceBlockDotPointIndent = <%% 2.5, 2.5, 2.5, 2.5, 2.5 %%>;
    mainServiceBlockDotPointOpacity = <%% 0.5, 0.5, 0.5, 0.5, 0.5 %%>;

    factorSize = <%% 13, 13, 13, 11, 2.8 %%>;
    factorTextTop = <%% (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), -0.2 %%>;
    factorWeight = <%% 600, 600, 600, 600, 600 %%>;
    factorBoldWeight = <%% 800, 800, 800, 800, 800 %%>;

    blackLineWidth = <%% 56, 56, 56, 56, 10 %%>;
    blackLineHeight = <%% 15, 15, 15, 15, 3.6 %%>;
    blackLineMarginBottom = <%% 18, 18, 18, 18, 3.8 %%>;
    blackLineStroke = <%% 2, 2, 2, 2, 2 %%>;

    descriptionSize = <%% 16, 16, 15, 14, 3.3 %%>;
    descriptionWeight = <%% 400, 400, 400, 400, 500 %%>;
    descriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

    blackBackTop = <%% -140, -140, -140, -140, -20 %%>;
    blackBackRadius = <%% 8, 8, 8, 8, 8 %%>;

    quotePaddingLeft = <%% 5, 5, 5, 5, 0.8 %%>;
    quoteMarginBottom = <%% 5, 5, 5, 5, 2 %%>;
    quoteWidth = <%% 13, 13, 13, 13, 3 %%>;

    titleVisualPaddingBottom = <%% 42, 42, 42, 42, 4 %%>;

    commentsTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
    commentsTitleLineHeight = <%% 1.44, 1.44, 1.44, 1.44, 1.44 %%>;

    blackBlueAreaPaddingTop0 = <%% 9.5, 9.5, 9.5, 9.5, 9.5 %%>;
    blackBlueAreaPaddingTop1 = <%% 11, 11, 11, 11, 11 %%>;

    blueButtonHeight = <%% 32, 30, 28, 25, 8.6 %%>;
    blueButtonPadding = <%% 21, 20, 18, 16, 7 %%>;
    blueButtonBetween = <%% 7, 7, 6, 5, 2.5 %%>;
    blueRightMMargin0 = <%% 30, 30, 30, 30, 6 %%>;
    blueRightMMargin1 = <%% 40, 40, 40, 40, 11 %%>;

    blueDotPointWidth = <%% 0.9, 0.9, 0.9, 0.9, 0.9 %%>;
    blueDotPointIndent = <%% 1.2, 1.2, 1.2, 1.2, 1.2 %%>;

    blueSize = <%% 14, 13, 12, 11, 3.4 %%>;
    blueWeight = <%% 600, 600, 600, 600, 600 %%>;
    blueTextTop = <%%(isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), -0.2 %%>;

    tableBasePaddingTop = <%% 16, 16, 16, 16, 16 %%>;
    tableBasePaddingBottom = <%% 22, 22, 22, 22, 22 %%>;

    solveBlockPaddingLeft = <%% 17, 17, 15, 14, 0.8 %%>;
    solveBlockMarginBottom = <%% 5, 7, 5, 5, 6 %%>;

    whiteSquareWidth = <%% 15, 15, 14, 12, 4.8 %%>;
    whiteSquareTop = <%% -0.5, -0.5, -1, -0, -0.5 %%>;
    whiteSquareLeft = <%% 11, 11, 10, 9, -0.8 %%>;
    whiteSquareRadius = <%% 2, 2, 2, 2, 3 %%>;
    whiteSquareOpacity = <%% 0.7, 0.7, 0.7, 0.7, 0.7 %%>;

    solveDescriptionMarginTop = <%% 3, 3, 3, 3, 3 %%>;

    solveTextTextTop = <%% (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), -0.1 %%>;
    solveTextSize = <%% 12, 11, 10, 9, 3.3 %%>;
    solveTextWeight = <%% 600, 600, 600, 600, 600 %%>;

    photoZonePaddingTop = <%% 74, 74, 70, 52, 11 %%>;
    photoZonePaddingBottom = <%% 90, 90, 86, 70, 11 %%>;

    tableTitleBlockWidth = <%% 250, 250, 230, 210, 66 %%>;
    tableTitleBlockHeight = <%% 37, 37, 32, 30, 11 %%>;

    tableTitleSize = <%% 15, 15, 14, 13, 4 %%>;
    tableTitleWeight = <%% 800, 800, 800, 800, 700 %%>;
    tableTitleTextTop = <%% (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), -0.2 %%>;

    tableDescriptionSize = <%% 14, 14, 13, 12, 3.3 %%>;
    tableDescriptionWeight = <%% 500, 500, 500, 500, 500 %%>;
    tableDescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
    tableDescriptionMarginTop = <%% 8, 8, 7, 6, 3 %%>;
    tableDescriptionMarginBottom = <%% 28, 28, 26, 24, 9 %%>;

    whiteStandardWidth = <%% 1150, 1050, 900, 720, 100 %%>;
    totalWidth = <%% 1000, 900, 780, 600, 88 %%>;

    blackBlueAreaHeight = <%% 80, 80, 80, 80, 8 %%>;
    blackBlueAreaTop = <%% 60, 60, 55, 47, 6 %%>;
    blackBlueAreaRight = <%% 21, 27, 18, 35, 27 %%>;
    blackBlueFactorBetween = <%% 6, 6, 6, 6, 5 %%>;

    solveEngSize = <%% 13, 13, 12, 10, 3.3 %%>;

    minusLeft = <%% -53, -49, -41, -25, -53 %%>;
    desktopSolveMarginLeft = <%% 40, 24, 24, 20, 2 %%>;

    solveListAreaTop = <%% 71, 71, 69, 64, 7 %%>;
    solveListAreaWidth = <%% 400, 380, 320, 210, 30 %%>;
    solveBlockHeight = <%% 28, 28, 26, 23, 9.4 %%>;
    blockBetween = <%% 3, 3, 2, 1, 1 %%>;

    ratioConst = 72;

    mainBoxPaddingBottomVisual = <%% 6, 6, 5, 4, 0 %%>;
    desktopSolveSize = <%% 14, 13, 13, 12, 1 %%>;

    blackAreaPaddingTop = <%% 40, 40, 36, 28, 40 %%>;
    blackAreaPaddingBottom = <%% 32, 32, 28, 20, 32 %%>;
    blueAreaPaddingTop = <%% 70, 70, 66, 58, 70 %%>;
    blueAreaPaddingBottom = <%% 25, 25, 21, 13, 25 %%>;

    tableBasePaddingTopDesktop = <%% 75, 75, 70, 64, 6 %%>;
    tableBasePaddingBottomDesktop = <%% 75, 75, 70, 64, 6 %%>;

    if (desktop) {
      tableFactorWidth1 = (totalWidth - tableFactorWidth0 - (factorBetween * 3)) / 3;
    }


    if (secondBaseMother === null || typeof secondBaseMother !== "object") {
      secondBaseMother = baseTong;
    }

    moreWords = "더보기";
    tableTitle = "나에게 필요한 서비스는 무엇일까?";
    tableDescription = desktop ? [
      "홈리에종 서비스 유형은 3가지로 나뉘며, 시공의 정도와 범위에 따라 구분됩니다.",
    ] : [
      "홈리에종 서비스 유형은 3가지로 나뉘며,",
      "시공의 정도와 범위에 따라 구분됩니다.",
    ]
    tableColumns = [
      "철거",
      "보양",
      "목공",
      "전기",
      "타일",
      "바닥",
      "욕실",
      "주방",
      "필름",
      "도배",
      "중문",
      "가구",
      "발코니",
      "기타",
    ];
    furnishingObj = {
      title: "홈퍼니싱",
      eng: "Home Furnishing",
      description: desktop ? [
        "인테리어 시공 없이 가구, 패브릭, 소품만으로",
        "공간을 변화시키는 홈퍼니싱",
      ] : [
        "인테리어 시공 없이",
        "가구, 패브릭, 소품만으로",
        "공간을 변화시키는 홈퍼니싱",
      ],
      comments: [
        "시간은 부족하고",
        "선택할 것은 많아요..",
      ],
      buttons: [
        "예산 문제",
        "바쁜 일상",
        "취향과 감각",
        "셀프 인테리어 실패",
      ],
      table: [
        "제공 없음",
        "제공 없음",
        "제공 없음",
        "제공 없음",
        "제공 없음",
        "제공 없음",
        "제공 없음",
        "제공 없음",
        "제공 없음",
        "제공 없음",
        "제공 없음",
        "제공 없음",
        "제공 없음",
        "제공 없음",
      ],
      solve: {
        title: [
          "가구 구매와 배치,",
          "소품 활용으로 무드 체인지!",
        ],
        description: desktop ? [
          "경력과 역량을 지닌 디자이너가",
          "제공하는 배치도와 기획이 담긴",
          "홈퍼니싱 서비스를 경험하세요.",
        ] : [
          "경력과 역량을 지닌 디자이너가 제공하는 배치도와",
          "기획이 담긴 홈퍼니싱 서비스를 경험하세요.",
        ],
        buttons: [
          "디자이너의 컨셉 제안과 기획",
          "공간 배치도와 퍼니싱 구입 제안서 제공",
          "맞춤형 홈퍼니싱 완성",
        ],
        images: [
          FrontIndexJs.binaryPath + "/furnishingSource0.jpg",
          FrontIndexJs.binaryPath + "/furnishingSource1.jpg",
          FrontIndexJs.binaryPath + "/furnishingSource2.jpg",
          FrontIndexJs.binaryPath + "/furnishingSource3.jpg",
        ],
      }
    };
    stylingObj = {
      title: "홈스타일링",
      eng: "Home Styling",
      description: desktop ? [
        "필수적인 부분만 적절하게 시공을 하고",
        "적절한 퍼니싱으로 집 컨디션에 알맞는 합리적인 서비스",
      ] : [
        "필수적인 부분만 적절하게 시공을 하고",
        "적절한 퍼니싱으로 집 컨디션에 알맞는",
        "합리적인 서비스",
      ],
      comments: [
        "전체 구조 변경은 부담스럽고,",
        "원하는 곳만 시공하고 싶어요!",
      ],
      buttons: [
        "예산 문제",
        "부담스러운 개별 시공 의뢰",
        "새아파트 단일 시공",
      ],
      table: [
        "부분 철거",
        "해당 면적",
        "걸레받이, 몰딩, 문짝",
        "일부 배선 및 조명",
        "덧방 위주",
        "마루, 장판",
        "악세사리 교체",
        "악세사리 교체",
        "전체 제공",
        "전체 제공",
        "중문 교체",
        "붙박이장, 냉장고장",
        "제공 없음",
        "제공 없음",
      ],
      solve: {
        title: [
          "도배 바닥 필름 등",
          "기본적인 톤 보정만으로",
          "공간의 분위기 전환!",
        ],
        description: desktop ? [
          "디자이너의 기획을 바탕으로",
          "믿을 수 있는 시공사와",
          "안정적인 인테리어를 경험하세요.",
        ] : [
          "디자이너가 제공하는 기획을 바탕으로",
          "믿을 수 있는 시공사와 안정적인 인테리어를 경험하세요.",
        ],
        buttons: [
          "디자이너의 컨셉 제안과 기획",
          "공간 배치도와 퍼니싱 구입 제안서 제공",
          "부분 시공 디자인 및 진행",
          "맞춤형 홈스타일링 완성",
        ],
        images: [
          FrontIndexJs.binaryPath + "/stylingSource0.jpg",
          FrontIndexJs.binaryPath + "/stylingSource1.jpg",
          FrontIndexJs.binaryPath + "/stylingSource2.jpg",
          FrontIndexJs.binaryPath + "/stylingSource3.jpg",
        ],
      }
    };
    totalObj = {
      title: "토탈 스타일링",
      eng: "Total Styling",
      description: [
        "원하는 구조를 위한 철거와 주방, 화장실 등",
        "기본 이상의 시공을 통해",
        "전체적인 분위기를 업그레이드",
      ],
      comments: [
        "라이프 스타일이 담긴",
        "인테리어를 원해요.",
      ],
      buttons: [
        "구조 변경과 철거",
        "제작 가구로 나에게 맞는 공간",
        "구축 아파트 시공",
      ],
      table: [
        "전체 철거",
        "해당 면적",
        "모든 종류의 목공",
        "전체 배선 및 조명",
        "전체 철거 및 교체",
        "마루, 장판, 타일",
        "전체 철거 및 공사",
        "전체 철거 및 공사",
        "전체 제공",
        "전체 제공",
        "중문 교체",
        "모든 제작 가구",
        "발코니 확장",
        "금속, 샤시 등",
      ],
      solve: {
        title: [
          "오래 머물고 싶은",
          "나에게 맞는 공간으로",
          "평범한 집의 형태 탈피!",
        ],
        description: [
          "구조 변경과 자유로운 시공을 통해",
          "내 옷을 입은 것만 같은",
          "맞춤형 주거공간을 경험하세요.",
        ],
        buttons: [
          "디자이너의 컨셉 제안과 기획",
          "공간 배치도와 퍼니싱 구입 제안서 제공",
          "전체 시공 디자인 및 진행",
          "맞춤형 토탈 스타일링 완성"
        ],
        images: [
          FrontIndexJs.binaryPath + "/totalSource0.jpg",
          FrontIndexJs.binaryPath + "/totalSource1.jpg",
          FrontIndexJs.binaryPath + "/totalSource2.jpg",
          FrontIndexJs.binaryPath + "/totalSource3.jpg",
        ],
      }
    };
    contents = [];
    if (serviceIndex === 0) {
      contents = [ objectDeepCopy(furnishingObj), objectDeepCopy(stylingObj), objectDeepCopy(totalObj) ];
    } else if (serviceIndex === 1) {
      contents = [ objectDeepCopy(stylingObj), objectDeepCopy(furnishingObj), objectDeepCopy(totalObj) ];
    } else {
      contents = [ objectDeepCopy(totalObj), objectDeepCopy(stylingObj), objectDeepCopy(furnishingObj) ];
    }

    selectionButtons = contents.map((o) => { return o.eng });

    secondBase = createNode({
      mother: secondBaseMother,
      class: [ secondBaseClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        alignItems: "start",
        justifyContent: "start",
        flexDirection: "column",
        paddingTop: String(secondBaseMother === baseTong ? secondBasePaddingTop : 0) + ea,
      },
    });

    // service contents
    num = 0;
    for (let c of contents) {

      thisBlueOpacity = 1 - (0.2 * num);

      thisServiceBase = createNode({
        mother: secondBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: desktop ? "center" : "start",
          alignItems: desktop ? "center" : "start",
          flexDirection: "column",
        }
      });

      selectionButtonsBase = createNode({
        mother: thisServiceBase,
        style: {
          display: "flex",
          position: "relative",
          width: desktop ? String(totalWidth) + ea : withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "row",
          marginBottom: String(selectionButtonsBaseMarginBottom) + ea,
          paddingLeft: String(selectionButtonsPaddingLeft) + ea,
        }
      })

      // service buttons
      num2 = 0;
      for (let service of selectionButtons) {
        boo = (num === num2);
        serviceButtonBlock = createNode({
          mother: selectionButtonsBase,
          style: {
            display: "inline-flex",
            position: "relative",
            width: "auto",
            height: String(selectionButtonsBlockHeight) + ea,
            justifyContent: "start",
            alignItems: "center",
            flexDirection: "row",
            marginRight: String(selectionButtonsBlockBetween) + ea,
          }
        });
        createNode({
          mother: serviceButtonBlock,
          style: {
            display: "inline-block",
            position: "relative",
            width: String(selectionButtonsSquareWidth) + ea,
            height: String(selectionButtonsSquareWidth) + ea,
            borderRadius: String(selectionButtonsSquareRadius) + "px",
            background: boo ? colorExtended.blue : colorExtended.white,
            border: "1px solid " + colorExtended.black,
            marginRight: String(selectionButtonsSquareBetween) + ea,
          }
        });
        createNode({
          mother: serviceButtonBlock,
          text: service,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(selectionButtonsSquareSize) + ea,
            fontWeight: String(selectionButtonsSquareWeight),
            fontFamily: "mont",
            color: boo ? colorExtended.mainBlue : colorExtended.deactive,
            top: desktop ? String(0.5) + ea : String(0) + ea,
          }
        });

        num2++;
      }

      // main box
      mainServiceBlock = createNode({
        mother: thisServiceBase,
        style: {
          display: "flex",
          position: "relative",
          width: desktop ? String(totalWidth) + ea : withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: String(2) + "px solid " + colorExtended.black,
          background: colorExtended.white,
          borderRadius: String(boxRadius) + "px",
          marginBottom: desktop ? String(mainServiceBlockMarginBottom) + ea : "",
          height: String(mainServiceBlockHeight) + ea,
          zIndex: String(2),
          paddingBottom: desktop ? String(mainBoxPaddingBottomVisual) + ea : "",
        }
      });
      createNode({
        mother: mainServiceBlock,
        style: {
          display: "inline-block",
          position: "absolute",
          width: String(mainServiceBlockDotPointWidth) + ea,
          height: String(mainServiceBlockDotPointWidth) + ea,
          background: colorExtended.mainBlue,
          top: String(mainServiceBlockDotPointIndent) + ea,
          right: String(mainServiceBlockDotPointIndent) + ea,
          opacity: String(mainServiceBlockDotPointOpacity),
        }
      })
      createNode({
        mother: mainServiceBlock,
        text: c.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          fontFamily: "pretendard",
          color: colorExtended.black,
          marginBottom: String(titleMarginBottom) + ea,
        }
      });
      createNode({
        mother: mainServiceBlock,
        text: c.eng,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(titleEngSize) + ea,
          fontWeight: String(titleEngWeight),
          fontFamily: "mont",
          color: colorExtended.mainBlue,
        }
      });
      createNode({
        mother: mainServiceBlock,
        style: {
          display: "inline-block",
          position: "relative",
          width: String(blackLineWidth) + ea,
          height: String(blackLineHeight) + ea,
          marginBottom: desktop ? "" : String(blackLineMarginBottom) + ea,
          borderBottom: desktop ? "" : String(blackLineStroke) + "px solid " + colorExtended.black,
        }
      });
      createNode({
        mother: mainServiceBlock,
        text: c.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionWeight),
          fontFamily: "pretendard",
          color: colorExtended.black,
          lineHeight: String(descriptionLineHeight),
          textAlign: "center",
        }
      });

      // black box
      if (mobile) {
        blackBlock = createNode({
          mother: thisServiceBase,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(mobileMargin, ea),
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "column",
            paddingTop: String(middleMargin) + ea,
            paddingBottom: String(bigMargin) + ea,
            zIndex: String(1),
            paddingLeft: String(mobileMargin / 2) + ea,
            paddingRight: String(mobileMargin / 2) + ea,
          },
          child: {
            style: {
              display: "block",
              position: "absolute",
              width: withOut(-1 * mobileMargin * 2, ea),
              left: String(-1 * mobileMargin) + ea,
              background: colorExtended.black,
              height: withOut(blackBackTop, ea),
              top: String(blackBackTop) + ea,
              borderBottomRightRadius: String(blackBackRadius) + ea,
            }
          }
        });
      } else {
        blackBlock = createNode({
          mother: thisServiceBase,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingTop: String(blackAreaPaddingTop) + ea,
            paddingBottom: String(blackAreaPaddingBottom) + ea,
            zIndex: String(1),
          },
          child: {
            style: {
              position: "absolute",
              left: String(minusLeft) + ea,
              background: colorExtended.black,
              width: String(whiteStandardWidth + 1) + ea,
              height: withOut(blackBackTop, ea),
              top: String(blackBackTop) + ea,
            }
          }
        });
      }
      createNode({
        mother: blackBlock,
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          justifyContent: "start",
          alignItems: "start",
          width: desktop ? String(totalWidth) + ea : withOut(0, ea),
          paddingLeft: String(quotePaddingLeft) + ea,
          marginBottom: String(quoteMarginBottom) + ea,
        },
        child: {
          mode: "svg",
          source: svgMaker.doubleQuote(colorExtended.mainBlue),
          style: {
            display: "inline-block",
            width: String(quoteWidth) + ea,
          }
        }
      });
      createNode({
        mother: blackBlock,
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          justifyContent: "start",
          alignItems: "start",
          width: desktop ? String(totalWidth) + ea : withOut(0, ea),
          paddingLeft: String(0) + ea,
          paddingBottom: desktop ? String(titleVisualPaddingBottom) + ea : ""
        },
        child: {
          text: c.comments,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(commentsTitleSize) + ea,
            fontWeight: String(commentsTitleWeight),
            fontFamily: "pretendard",
            color: colorExtended.white,
            lineHeight: String(commentsTitleLineHeight),
          }
        }
      });

      blackBlueArea = createNode({
        mother: blackBlock,
        style: {
          display: desktop ? "block" : "flex",
          position: desktop ? "absolute" : "relative",
          width: desktop ? String(totalWidth) + ea : withOut(0, ea),
          right: desktop ? String(blackBlueAreaRight) + ea : "",
          justifyContent: desktop ? "" : "end",
          alignItems: desktop ? "" : "end",
          flexDirection: desktop ? "" : "column",
          top: desktop ? String(blackBlueAreaTop) + ea : "",
          paddingTop: desktop ? "" : String(num === 0 ? blackBlueAreaPaddingTop0 : blackBlueAreaPaddingTop1) + ea,
          paddingLeft: String(0) + ea,
          paddingRight: String(0) + ea,
          textAlign: desktop ? "right" : "",
        }
      });
      num3 = 0;
      for (let b of c.buttons) {
        createNode({
          mother: blackBlueArea,
          style: {
            height: String(blueButtonHeight) + ea,
            paddingLeft: String(blueButtonPadding) + ea,
            paddingRight: String(blueButtonPadding) + ea,
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: String(blueButtonBetween) + ea,
            overflow: "hidden",
            borderTopLeftRadius: desktop ? String(true ? blueButtonHeight / 2 : 0) + ea : String(num3 % 2 !== 0 ? blueButtonHeight / 2 : 0) + ea,
            borderBottomLeftRadius: String(blueButtonHeight / 2) + ea,
            borderBottomRightRadius: String(blueButtonHeight / 2) + ea,
            borderTopRightRadius: desktop ? String(true ? blueButtonHeight / 2 : 0) + ea : String(num3 % 2 === 0 ? blueButtonHeight / 2 : 0) + ea,
            marginRight: desktop ? "" : num3 % 2 === 0 ? String(blueRightMMargin0 + (blueRightMMargin1 * Math.floor(num3 / 2) - 1)) + ea : String(0) + ea,
            marginLeft: desktop ? String(blackBlueFactorBetween) + ea : "",
          },
          children: [
            {
              style: {
                position: "absolute",
                display: "block",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.white,
              }
            },
            {
              style: {
                position: "absolute",
                display: "block",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.mainBlue,
                opacity: String(thisBlueOpacity),
              }
            },
            {
              style: {
                position: "absolute",
                top: String(blueDotPointIndent) + ea,
                left: num3 % 2 === 0 ? String(blueDotPointIndent) + ea : "",
                right: num3 % 2 === 0 ? "" : String(blueDotPointIndent) + ea,
                width: String(blueDotPointWidth) + ea,
                height: String(blueDotPointWidth) + ea,
                borderRadius: String(blueDotPointWidth) + ea,
                background: colorExtended.blueDim,
              }
            },
            {
              text: b,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(blueSize) + ea,
                fontWeight: String(blueWeight),
                color: colorExtended.black,
                fontFamily: "pretendard",
                top: String(blueTextTop) + "px",
              }
            }
          ]
        });
        if (desktop) {
          if (num3 % 2 !== 0) {
            blackBlueArea.insertAdjacentHTML("beforeend", "<br>");
          }
        }
        num3++;
      }

      // solve box
      if (mobile) {
        solveBlock = createNode({
          mother: thisServiceBase,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(mobileMargin, ea),
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "column",
            paddingTop: String(bigMargin) + ea,
            paddingBottom: String(bigMargin) + ea,
            paddingLeft: String(mobileMargin / 2) + ea,
            paddingRight: String(mobileMargin / 2) + ea,
          },
          child: {
            style: {
              display: "block",
              position: "absolute",
              width: withOut(-1 * mobileMargin * 2, ea),
              left: String(-1 * mobileMargin) + ea,
              background: colorExtended.white,
              height: withOut(-1 + (blackBackRadius * -1), ea),
              top: String(-1 + (blackBackRadius * -1)) + ea,
            },
            next: {
              style: {
                display: "block",
                position: "absolute",
                width: withOut(-1 * mobileMargin * 2, ea),
                left: String(-1 * mobileMargin) + ea,
                background: colorExtended.mainBlue,
                height: withOut(-1 + (blackBackRadius * -1), ea),
                top: String(-1 + (blackBackRadius * -1)) + ea,
                opacity: String(thisBlueOpacity),
              }
            }
          }
        });
      } else {
        solveBlock = createNode({
          mother: thisServiceBase,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingTop: String(blueAreaPaddingTop) + ea,
            paddingBottom: String(blueAreaPaddingBottom) + ea,
          },
          child: {
            style: {
              display: "block",
              top: String(0) + ea,
              left: String(minusLeft) + ea,
              position: "absolute",
              width: String(whiteStandardWidth + 1) + ea,
              height: withOut(0, ea),
              background: colorExtended.white,
            },
            next: {
              style: {
                display: "block",
                top: String(0) + ea,
                left: String(minusLeft) + ea,
                position: "absolute",
                width: String(whiteStandardWidth + 1) + ea,
                height: withOut(0, ea),
                background: colorExtended.mainBlue,
                opacity: String(thisBlueOpacity),
              }
            }
          }
        });
      }

      createNode({
        mother: solveBlock,
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          justifyContent: "start",
          alignItems: "start",
          width: desktop ? String(totalWidth) + ea : withOut(0, ea),
          paddingLeft: String(solveBlockPaddingLeft) + ea,
          marginBottom: String(solveBlockMarginBottom) + ea,
        },
        child: {
          text: c.eng,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(solveEngSize) + ea,
            fontWeight: String(700),
            color: colorExtended.black,
            fontFamily: "mont",
          },
          previous: {
            style: {
              position: "absolute",
              left: String(whiteSquareLeft) + ea,
              top: String(whiteSquareTop) + ea,
              width: String(whiteSquareWidth) + ea,
              height: String(whiteSquareWidth) + ea,
              borderRadius: String(whiteSquareRadius) + "px",
              background: colorExtended.white,
              opacity: String(whiteSquareOpacity),
            }
          }
        }
      });
      createNode({
        mother: solveBlock,
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          justifyContent: "start",
          alignItems: desktop ? "end" : "start",
          width: desktop ? String(totalWidth) + ea : withOut(0, ea),
          paddingLeft: String(0) + ea,
          paddingBottom: desktop ? String(titleVisualPaddingBottom) + ea : ""
        },
        child: {
          text: c.solve.title,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(commentsTitleSize) + ea,
            fontWeight: String(desktop ? 700 : commentsTitleWeight),
            fontFamily: "pretendard",
            color: colorExtended.darkBlack,
            lineHeight: String(commentsTitleLineHeight),
          },
          next: {
            text: c.solve.description.join("\n"),
            style: {
              display: mobile ? "none" : "inline-block",
              position: "relative",
              fontSize: String(desktop ? desktopSolveSize : descriptionSize) + ea,
              fontWeight: String(500),
              fontFamily: "pretendard",
              color: colorExtended.darkBlack,
              lineHeight: String(descriptionLineHeight),
              textAlign: "left",
              marginTop: String(solveDescriptionMarginTop) + ea,
              marginBottom: String(3) + ea,
              marginLeft: String(desktopSolveMarginLeft) + ea,
            }
          }
        }
      });

      if (mobile) {
        createNode({
          mother: solveBlock,
          text: c.solve.description.join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(desktop ? 13 : descriptionSize) + ea,
            fontWeight: String(400),
            fontFamily: "pretendard",
            color: colorExtended.darkBlack,
            lineHeight: String(descriptionLineHeight),
            textAlign: "left",
            marginTop: String(solveDescriptionMarginTop) + ea,
          }
        });
      }

      solveListArea = createNode({
        mother: solveBlock,
        style: {
          display: desktop ? "block" : "flex",
          position: desktop ? "absolute" : "relative",
          width: desktop ? String(solveListAreaWidth) + ea : withOut(0, ea),
          right: desktop ? String(blackBlueAreaRight) + ea : "",
          justifyContent: desktop ? "" : "end",
          alignItems: desktop ? "" : "end",
          flexDirection: desktop ? "" : "column",
          top: desktop ? String(solveListAreaTop) + ea : "",
          paddingTop: desktop ? "" : String(bigMargin) + ea,
          textAlign: desktop ? "right" : "",
        }
      });
      num4 = 0;
      for (let b of c.solve.buttons) {

        createNode({
          mother: solveListArea,
          style: {
            height: String(solveBlockHeight) + ea,
            display: "flex",
            width: withOut(0, ea),
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: String(blockBetween) + ea,
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(solveBlockHeight) + ea,
                height: String(solveBlockHeight) + ea,
                borderRadius: String(<&& 8 | 8 | 7 | 3 | 8 &&>) + "px",
                background: colorExtended.blueDark,
                justifyContent: "center",
                alignItems: "center",
                marginRight: String(blockBetween) + ea,
              },
              child: {
                text: zeroAddition(num4 + 1),
                style: {
                  display: "inline-flex",
                  position: "relative",
                  top: String(desktop ? (isMac() ? 0.5 : 0) : 0) + ea,
                  fontSize: String(desktop ? (<&& 13 | 13 | 12 | 11 | 1 &&>) : blueSize) + ea,
                  fontWeight: String(blueWeight),
                  fontFamily: "mont",
                  color: colorExtended.darkBlack,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: withOut(solveBlockHeight + blockBetween, ea),
                height: String(solveBlockHeight) + ea,
                borderRadius: String(<&& 8 | 8 | 7 | 3 | 8 &&>) + "px",
                background: colorExtended.darkBlack,
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                text: b,
                style: {
                  display: "inline-flex",
                  position: "relative",
                  top: String(solveTextTextTop) + ea,
                  fontSize: String(solveTextSize) + ea,
                  fontWeight: String(solveTextWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.white,
                }
              }
            },
          ]
        });

        num4++;
      }

      // photo zone
      photoBlock = createNode({
        mother: thisServiceBase,
        style: {
          display: "flex",
          position: "relative",
          width: desktop ? String(totalWidth) + ea : withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          paddingTop: String(photoZonePaddingTop) + ea,
          paddingBottom: String(desktop ? photoZonePaddingBottom : serviceAreaBetween) + ea,
        },
      });
      createNode({
        mother: photoBlock,
        style: {
          display: "block",
          position: "relative",
          width: mobile ? withOut(-1 * mobileMargin * 2, ea) : withOut(0, ea),
          left: mobile ? String(-1 * mobileMargin) + ea : String(0) + ea,
          overflow: desktop ? "hiddne" : "scroll",
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              overflow: desktop ? "hiddne" : "scroll",
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
                paddingLeft: mobile ? String(mobileMargin) + ea : "",
                paddingRight: mobile ? String(mobileMargin * 1.5) + ea : "",
                width: desktop ? withOut(0, ea) : String(photoWidth) + ea,
              },
            }
          }
        ]
      });

      num++;
    }

    // table

    contents = [ objectDeepCopy(furnishingObj), objectDeepCopy(stylingObj), objectDeepCopy(totalObj) ]

    if (mobile) {
      tableBase = createNode({
        mother: secondBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: String(tableBasePaddingTop) + ea,
          paddingBottom: String(tableBasePaddingBottom) + ea,
        },
        child: {
          style: {
            display: "block",
            position: "absolute",
            width: withOut(-1 * mobileMargin * 2, ea),
            left: String(-1 * mobileMargin) + ea,
            background: colorExtended.blueWhiteWhiteBack,
            height: withOut(0, ea),
            top: String(0) + ea,
          }
        }
      });
    } else {
      tableBase = createNode({
        mother: secondBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: String(tableBasePaddingTopDesktop) + ea,
          paddingBottom: String(tableBasePaddingBottomDesktop) + ea,
        },
        child: {
          style: {
            display: "block",
            top: String(0) + ea,
            left: String(minusLeft) + ea,
            position: "absolute",
            width: String(whiteStandardWidth + 1) + ea,
            height: withOut(0, ea),
            background: colorExtended.blueWhiteWhiteBack,
          }
        }
      });
    }

    createNode({
      mother: tableBase,
      style: {
        display: "inline-flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        background: colorExtended.black,
        width: String(tableTitleBlockWidth) + ea,
        height: String(tableTitleBlockHeight) + ea,
        borderRadius: String(tableTitleBlockHeight) + ea,
      },
      child: {
        text: tableTitle,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(tableTitleSize) + ea,
          fontWeight: String(tableTitleWeight),
          fontFamily: "pretendard",
          color: colorExtended.white,
          top: String(tableTitleTextTop) + ea,
        }
      }
    });
    createNode({
      mother: tableBase,
      text: tableDescription.join("\n"),
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(tableDescriptionSize) + ea,
        fontWeight: String(tableDescriptionWeight),
        fontFamily: "pretendard",
        color: colorExtended.black,
        lineHeight: String(tableDescriptionLineHeight),
        textAlign: "center",
        marginTop: String(tableDescriptionMarginTop) + ea,
        marginBottom: String(tableDescriptionMarginBottom) + ea,
      }
    });

    tableMother = createNode({
      mother: tableBase,
      style: {
        display: "flex",
        position: "relative",
        width: desktop ? String(totalWidth) + ea : withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
      }
    });

    tableFactor = createNode({
      mother: tableMother,
      style: {
        display: "flex",
        position: "relative",
        width: desktop ? String(totalWidth) + ea : withOut(0, ea),
        height: String(tableFactorHeight) + ea,
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "row",
        marginBottom: String(factorBetween) + ea,
      }
    });
    createNode({
      mother: tableFactor,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(tableFactorWidth0) + ea,
        height: withOut(0, ea),
        boxSizing: "border-box",
        border: "1px solid " + colorExtended.black,
        borderRadius: String(factorRadius) + "px",
        marginRight: String(factorBetween) + ea,
        background: colorExtended.white,
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        text: "구분",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(factorSize) + ea,
          fontWeight: String(factorBoldWeight),
          color: colorExtended.black,
          top: String(factorTextTop) + ea,
        }
      }
    });
    createNode({
      mother: tableFactor,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(tableFactorWidth1) + ea,
        height: withOut(0, ea),
        boxSizing: "border-box",
        border: "1px solid " + colorExtended.black,
        borderRadius: String(factorRadius) + "px",
        marginRight: String(factorBetween) + ea,
        background: colorExtended.mainBlue,
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        text: "홈퍼니싱",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(factorSize) + ea,
          fontWeight: String(factorBoldWeight),
          color: colorExtended.black,
          top: String(factorTextTop) + ea,
        }
      }
    })
    createNode({
      mother: tableFactor,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(tableFactorWidth1) + ea,
        height: withOut(0, ea),
        boxSizing: "border-box",
        border: "1px solid " + colorExtended.black,
        borderRadius: String(factorRadius) + "px",
        marginRight: String(factorBetween) + ea,
        background: colorExtended.mainBlue,
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        text: "홈스타일링",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(factorSize) + ea,
          fontWeight: String(factorBoldWeight),
          color: colorExtended.black,
          top: String(factorTextTop) + ea,
        }
      }
    })
    createNode({
      mother: tableFactor,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(tableFactorWidth1) + ea,
        height: withOut(0, ea),
        boxSizing: "border-box",
        border: "1px solid " + colorExtended.black,
        borderRadius: String(factorRadius) + "px",
        background: colorExtended.mainBlue,
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        text: "토탈 스타일링",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(factorSize) + ea,
          fontWeight: String(factorBoldWeight),
          color: colorExtended.black,
          top: String(factorTextTop) + ea,
        }
      }
    });

    for (let i = 0; i < tableColumns.length; i++) {
      tableFactor = createNode({
        mother: tableMother,
        style: {
          display: "flex",
          position: "relative",
          width: desktop ? String(totalWidth) + ea : withOut(0, ea),
          height: String(tableFactorHeight) + ea,
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "row",
          marginBottom: String(factorBetween) + ea,
        }
      });
      createNode({
        mother: tableFactor,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(tableFactorWidth0) + ea,
          height: withOut(0, ea),
          boxSizing: "border-box",
          border: "1.5px solid " + colorExtended.black,
          borderRadius: String(factorRadius) + "px",
          marginRight: String(factorBetween) + ea,
          background: colorExtended.black,
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          text: tableColumns[i],
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(factorSize) + ea,
            fontWeight: String(factorBoldWeight),
            color: colorExtended.white,
            top: String(factorTextTop) + ea,
          }
        }
      });
      createNode({
        mother: tableFactor,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(tableFactorWidth1) + ea,
          height: withOut(0, ea),
          boxSizing: "border-box",
          border: "1.5px dotted " + colorExtended.gray4,
          borderRadius: String(factorRadius) + "px",
          marginRight: String(factorBetween) + ea,
          background: colorExtended.white,
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          text: contents[0].table[i],
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(factorSize) + ea,
            fontWeight: String(factorWeight),
            color: /없음/gi.test(contents[0].table[i]) ? colorExtended.deactive : colorExtended.black,
            top: String(factorTextTop) + ea,
          }
        }
      })
      createNode({
        mother: tableFactor,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(tableFactorWidth1) + ea,
          height: withOut(0, ea),
          boxSizing: "border-box",
          border: "1.5px dotted " + colorExtended.gray3,
          borderRadius: String(factorRadius) + "px",
          marginRight: String(factorBetween) + ea,
          background: colorExtended.white,
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          text: contents[1].table[i],
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(factorSize) + ea,
            fontWeight: String(factorWeight),
            color: /없음/gi.test(contents[1].table[i]) ? colorExtended.deactive : colorExtended.black,
            top: String(factorTextTop) + ea,
          }
        }
      })
      createNode({
        mother: tableFactor,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(tableFactorWidth1) + ea,
          height: withOut(0, ea),
          boxSizing: "border-box",
          border: "1.5px dotted " + colorExtended.gray3,
          borderRadius: String(factorRadius) + "px",
          background: colorExtended.white,
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          text: contents[2].table[i],
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(factorSize) + ea,
            fontWeight: String(factorWeight),
            color: colorExtended.blueDark,
            top: String(factorTextTop) + ea,
          }
        }
      });
    }
    
  } catch (e) {
    console.log(e);
  }
}

FrontIndexJs.prototype.insertWhiteCardEvent = function (serviceIndex) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, designerCareer, isMac, isIphone, svgMaker, autoComma, ajaxJson, serviceParsing, dateToString, stringToLink, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass, swipePatch, tempScrollBan, tempScrollRelease, setDebounce, equalJson } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const whitePopupClassName = "whitePopupClassName";
  const mobileBlueBarClassName = "mobileBlueBarClassName";
  const totalContents = document.getElementById("totalcontents");
  return async function (e) {
    try {
      const loading = instance.mother.grayLoading(null, mobile);
      const zIndex = desktop ? 3 : 104;
      const px = "px";
      let cancelBack, whiteBase;
      let whiteMargin;
      let innerMargin;
      let contentsTong;
      let titleArea;
      let titleHeight;
      let titleSize;
      let titleWeight;
      let titleLineHeight;
      let titleTop;
      let scrollTong;
      let firstTong;
      let profileHeight;
      let profileLineWidth;
      let profileDescriptionTong;
      let profileMargin;
      let secondTong;
      let styleButtonMarginBottom;
      let profilePhotoTong;
      let profileDescriptionTongWidth;
      let profileKeywordsTong;
      let nameMargin;
      let num;
      let nameTitlesize;
      let words;
      let positionData;
      let blockInnerPadding;
      let paperWorksHeight;
      let paperBetween;
      let blockTitleSize;
      let blockTitleBlockHeight;
      let arrowLeftMargin;
      let blockTitleMarginBottom;
      let thirdTong;
      let styleObject;
      let pictureBase;
      let whiteStandardWidth;
      let pictureBaseHeight;
      let fourthTong;
      let infoTong;
      let factorHeight;
      let factorSize, factorBoldWeight, factorWeight;
      let factorTextTop;
      let factorBetween;
      let infoMiddleBase;
      let infoMiddleMother;
      let whiteBlockMarginBottom;
      let whiteBlockOuterMargin;
      let titleTextIndent;
      let factorLightWeight;
      let insertWhiteBlock;
      let leftTendency, rightTendency;
      let tendencyMotherHeight;
      let tendencyNameAreaWidth;
      let tendencyBarHeight;
      let tendencySize, tendencyTextTop, tendencyWeight;
      let tendencyNum;
      let tendencyBoxPaddingTop;
      let fifthTong;
      let largePaddingBottom;
      let portfolioTong;
      let portfolioMiddleMother;
      let contentsNum;
      let sourceArr;
      let sixthTong;
      let dashLineIndent;
      let priceTong;
      let priceMiddleMother;
      let unitBlockHeight, unitBlockIndent;
      let unitBlockHeightSmall;
      let moneyTitleSize, moneyValueSize;
      let moneyVatSize;
      let moneyTitleWeight;
      let moneyVatWeight;
      let moneyValueWeight;
      let moneyTitleTextTop;
      let moneyVatTextTop;
      let moneyValueTextTop;
      let moneyVatMarginRight;
      let moneyCircleWidth, moneyCircleMargin;
      let insertMoneyBlock;
      let moneyBoxPaddingTopVisual;
      let unitBlockHeightBig;
      let finalPriceTong, finalPriceMiddleMother;
      let finalBlockBetween;
      let finalBlockMarginLeft;
      let seventhTong;
      let finalSelectionTong;
      let finalSelectionMiddleMother;
      let buttonArrowWdith;
      let buttonArrowHeight;
      let paperMove;
      let offlineFeeTarget, onlineFeeTarget;
      let deactiveOpacity;
      let insertFinalMoneyBlock;
      let variableLastBlock;
      let noDiscountOffline;
      let noDiscountOnline;
      let onoffLineMarkWidth;
      let vatPadding;
      let designerNameTongHeight;
      let nameTitleWeight;
      let designerWordsSize;
      let designerWordsWeight;
      let designerWordsMarginLeft;
      let designerWordsPaddingBottom;
      let styleBlockHeight, styleBlockPadding, styleBlockTextTop, styleBlockSize, styleBlockWeight;
      let styleBlockMarginLeftLong, styleBlockMarginLeftShort;
      let introducetionSize, introducetionLineHeight, introducetionWeight;
      let designerCharSize, designerCharWeight, designerCharTop, designerCharMarginBottom;
      let designerKeywordsLength;
      let designerKeywordsPaddingLeft, designerKeywordsPaddingRight;
      let designerKeywordsTagHeight;
      let designerKeywordsBetween;
      let designerKeywordsSize, designerKeywordsWeight, designerKeywordsTextTop, designerKeywordsSvgLeft;
      let paperWorkArrowWidth;
      let paperWorkArrowHeight;
      let portfolioSize, portfolioWeight, portfolioTextTop;
      let portfolioDetailBoxWidth, portfolioDetailArrowWidth, portfolioDetailArrowHeight;
      let finalPriceTongMarginTop;
      let finalPriceDashedLineTop;
      let designerSelectionMotherPadding;
      let designerSelectionMarginLeft;
      let designerSelectionSize, designerSelectionWeight;
      let onoffKindTextTop, onoffKindSize, onoffKindWeight;
      let finalMoneyOriginalSize, finalMoneyOriginalWeight, finalMoneyOriginalMarginRight;
      let finalMoneyAmountSize, finalMoneyAmountMarginRight;
      let finalVatSize, finalVatMarginRight;
      let nameTitleVisualTop;
      let priceCircleVisualTop;
      let mobileWhiteTopMargin;
      let whiteCloseEvent;
      let mobileDesignerProfileTong;
      let mobileProfileSeroMargin;
      let factorMaker;
      let selectionMaker;
      let factorPadding;
      let factorTitleWeight;
      let factorValueWeight;
      let factorLongHeight;
      let menuMarginTop;
      let valueLinePadding;
      let selectionBarWeight;
      let selectionBarMargin;
      let selectionBarLongMargin;
      let infoMiddleMiddle;
      let sourceTong;
      let pictureNumber;
      let scrollTongPaddingTop;
      let boxRadius;

      boxRadius = <%% 16, 16, 16, 16, 16 %%>;

      whiteMargin = <%% 30, 30, 30, 30, 3 %%>;
      innerMargin = <%% 52, 48, 40, 24, 6 %%>;

      titleHeight = <%% 41, 39, 37, 28, 8 %%>;  
      titleSize = <%% 40, 40, 40, 40, 4 %%>;
      titleWeight = <%% 700, 700, 700, 700, 700 %%>;
      titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
      titleTop = <%% -6, -6, -6, -6, -1 %%>;

      profileHeight = <%% 200, 192, 180, 150, 40 %%>;
      profileLineWidth = <%% 10, 10, 8, 8, 1.5 %%>;
      profileMargin = <%% 30, 24, 20, 16, 3 %%>;

      profileDescriptionTongWidth = <%% 700, 560, 450, 320, 70 %%>;

      styleButtonMarginBottom = <%% 4, 4, 4, 4, 0.8 %%>;

      nameTitlesize = <%% 32, 30, 28, 23, 6 %%>;
      nameMargin = <%% 12, 10, 9, 7, 2 %%>;

      designerNameTongHeight = <%% 50, 50, 50, 50, 10 %%>;
      nameTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
      designerWordsSize = <%% 14, 14, 14, 12, 3 %%>;
      designerWordsWeight = <%% 400, 400, 400, 400, 400 %%>;
      designerWordsMarginLeft = <%% 10, 10, 10, 8, 1.8 %%>;
      designerWordsPaddingBottom = <%% 5, 5, 4, (isMac() ? 4 : 3), 1.3 %%>;

      introducetionSize = <%% 16, 15, 13, 12, 3.3 %%>;
      introducetionLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.6 %%>;
      introducetionWeight = <%% 400, 400, 400, 400, 400 %%>;

      styleBlockHeight = <%% 21, 21, 21, 18, 4.8 %%>;
      styleBlockPadding = <%% 8, 8, 8, 7, 2 %%>;
      styleBlockMarginLeftLong = <%% 14, 14, 14, 9, 0 %%>;
      styleBlockMarginLeftShort = <%% 3, 3, 3, 2, 0.8 %%>;
      styleBlockTextTop = <%% (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), -0.2 %%>;
      styleBlockSize = <%% 11, 11, 11, 10, 2.6 %%>;
      styleBlockWeight = <%% 700, 700, 700, 700, 700 %%>;

      designerCharSize = <%% 27, 24, 21, 17, 4.7 %%>;
      designerCharWeight = <%% 700, 700, 700, 700, 700 %%>;
      designerCharTop = <%% -5, -4, -3, -1, -1 %%>;
      designerCharMarginBottom = <%% 22, 35, 30, 18, 3.5 %%>;

      blockTitleBlockHeight = <%% 30, 24, 20, 18, 6.4 %%>;
      blockTitleSize = <%% 21, 20, 17, 16, 4 %%>;
      blockInnerPadding = <%% 52, 48, 40, 24, 8 %%>;

      paperWorksHeight = <%% 260, 200, 200, 170, 42 %%>;
      paperBetween = <%% 6, 5, 4, 3, 1 %%>;
      arrowLeftMargin = <%% 30, 30, 25, 16, 3 %%>;

      blockTitleMarginBottom = <%% 11, 11, 11, 11, 1 %%>;

      whiteStandardWidth = <%% 1150, 1050, 900, 720, 100 %%>;

      pictureBaseHeight = <%% 880, 650, 570, 460, 61 %%>;

      factorHeight = <%% 42, 40, 36, 33, 8.8 %%>;
      factorTextTop = <%% (isMac() ? -0.5 : 1), (isMac() ? -0.5 : 1), (isMac() ? -0.5 : 1), (isMac() ? -0.5 : 1), -0.2 %%>;
      factorSize = <%% 14.5, 13, 12, 11, 3.3 %%>;
      factorBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
      factorWeight = <%% 700, 700, 700, 700, 700 %%>;
      factorBetween = <%% 5, 5, 5, 5, 5 %%>;
      factorPadding = 3.2;
      factorTitleWeight = 800;
      factorValueWeight = 500;
      factorLongHeight = 16;
      menuMarginTop = 0.4;
      valueLinePadding = 1;
      selectionBarWeight = 300;
      selectionBarMargin = 1;
      selectionBarLongMargin = 2;

      scrollTongPaddingTop = <%% 64, 64, 60, 56, 15 %%>;

      whiteBlockMarginBottom = <%% 6, 5, 4, 3, 1 %%>;
      whiteBlockOuterMargin = <%% 10, 10, 10, 10, 1 %%>;

      titleTextIndent = <%% 21, 18, 15, 11, 21 %%>;

      factorLightWeight = <%% 500, 500, 500, 500, 500 %%>;
      tendencyMotherHeight = <%% 21, 21, 21, 18, 8 %%>;
      tendencyNameAreaWidth = <%% 64, 64, 64, 64, 15 %%>;
      tendencyBarHeight = <%% 14, 14, 14, 12, 2.7 %%>;

      tendencySize = <%% 13, 13, 12, 11, 3.2 %%>;
      tendencyTextTop = <%% (isMac() ? -1 : 1.5), (isMac() ? -1 : 1.5), (isMac() ? -1 : 1.5), (isMac() ? -1 : 1), -0 %%>;
      tendencyWeight = <%% 600, 600, 600, 600, 600 %%>;
      tendencyBoxPaddingTop = <%% 16, 16, 14, 8, 1 %%>;

      largePaddingBottom = <%% 58, 54, 45, 34, 9 %%>;

      dashLineIndent = <%% 8, 8, 8, 8, 1 %%>;

      unitBlockHeight = <%% 50, 48, 44, 36, 8.7 %%>;
      unitBlockIndent = <%% 18, 16, 14, 14, 3.2 %%>;
      unitBlockHeightSmall = <%% 46, 42, 38, 34, 9 %%>;
      unitBlockHeightBig = <%% 44, 40, 36, 30, 8.2 %%>;

      moneyTitleSize = <%% 16, 15, 14, 13, 3.2 %%>;
      moneyVatSize = <%% 11, 11, 10, 10, 2 %%>;
      moneyValueSize = <%% 18, 16, 15, 14, 3.3 %%>;

      moneyTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
      moneyVatWeight = <%% 500, 500, 500, 500, 500 %%>;
      moneyValueWeight = <%% 700, 700, 700, 700, 700 %%>;

      moneyTitleTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
      moneyVatTextTop = <%% (isMac() ? 1 : 2), (isMac() ? 1 : 2), (isMac() ? 1 : 2), (isMac() ? 1 : 2), 0.3 %%>;
      moneyValueTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
      moneyVatMarginRight = <%% 6, 6, 6, 6, 1 %%>;

      moneyCircleWidth = <%% 6, 5, 4, 4, 1 %%>;
      moneyCircleMargin = <%% 6, 5, 4, 3, 1 %%>;

      moneyBoxPaddingTopVisual = <%% 3, 3, 3, 3, 0.6 %%>;

      finalBlockBetween = <%% 10, 8, 6, 4, 1 %%>;
      finalBlockMarginLeft = <%% 430, 430, 430, 430, 430 %%>;

      buttonArrowWdith = <%% 16, 16, 16, 16, 1 %%>;
      buttonArrowHeight = <%% 30, 30, 30, 30, 3 %%>;

      paperMove = <%% 240, 240, 240, 240, 24 %%>;

      deactiveOpacity = <%% 0.4, 0.4, 0.4, 0.4, 0.4 %%>;

      onoffLineMarkWidth = <%% 110, 110, 90, 60, 20 %%>;
      vatPadding = <%% 16, 16, 16, 8, 1 %%>;

      designerKeywordsLength = <%% 4, 4, 4, 4, 2 %%>;
      designerKeywordsPaddingLeft = <%% 6, 6, 6, 6, 6 %%>;
      designerKeywordsPaddingRight = <%% 12, 12, 12, 10, 12 %%>;
      designerKeywordsTagHeight = <%% 32, 28, 26, 24, 32 %%>;
      designerKeywordsBetween = <%% 4, 3, 5, 4, 4 %%>;
      designerKeywordsSize = <%% 14, 13, 12, 11, 3 %%>;
      designerKeywordsWeight = <%% 700, 700, 700, 700, 700 %%>;
      designerKeywordsTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -1 %%>;
      designerKeywordsSvgLeft = <%% -18, -18, -16, -14, -1 %%>;

      paperWorkArrowWidth = <%% 12, 12, 10, 8, 1 %%>;
      paperWorkArrowHeight = <%% 24, 24, 20, 16, 2 %%>;

      portfolioSize = <%% 16, 15, 14, 12, 3.2 %%>;
      portfolioWeight = <%% 700, 700, 700, 700, 700 %%>;
      portfolioTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;

      portfolioDetailBoxWidth = <%% 18, 18, 18, 16, 4.2 %%>;
      portfolioDetailArrowWidth = <%% 12, 12, 12, 10, 2.2 %%>;
      portfolioDetailArrowHeight = <%% 10, 10, 10, 8, 2 %%>;

      finalPriceTongMarginTop = <%% 16, 12, 10, 8, 0.8 %%>;
      finalPriceDashedLineTop = <%% 21, 21, 17, 13, 2 %%>;

      designerSelectionMotherPadding = <%% 44, 42, 32, 24, 7 %%>;

      designerSelectionMarginLeft = <%% 1150, 810, 690, 570, 60 %%>;
      designerSelectionSize = <%% 18, 17, 15, 13, 3.5 %%>;
      designerSelectionWeight = <%% 800, 800, 800, 800, 800 %%>;

      onoffKindTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
      onoffKindSize = <%% 18, 16, 14, 11, 3.3 %%>;
      onoffKindWeight = <%% 800, 800, 800, 800, 800 %%>;

      finalMoneyOriginalSize = <%% 20, 18, 16, 13, 3.3 %%>;
      finalMoneyOriginalWeight = <%% 300, 300, 300, 300, 300 %%>;
      finalMoneyOriginalMarginRight = <%% 8, 8, 8, 6, 1 %%>;
      finalMoneyAmountSize = <%% 21, 19, 17, 14, 3.3 %%>;
      finalMoneyAmountMarginRight = <%% 24, 24, 18, 12, 0 %%>;
      finalVatSize = <%% 12, 12, 11, 10, 2 %%>;
      finalVatMarginRight = <%% 8, 8, 8, 5, 1 %%>;

      nameTitleVisualTop = <%% (isMac() ? 0 : 3), (isMac() ? 0 : 3), (isMac() ? 0 : 3), (isMac() ? 0 : 2), 0 %%>;
      priceCircleVisualTop = <%% (isMac() ? 0 : -1), (isMac() ? 0 : -1), (isMac() ? 0 : -1), (isMac() ? 0 : -1), 0 %%>;

      mobileWhiteTopMargin = 0;
      mobileProfileSeroMargin = 5;

      window.history.pushState({ mode: "white" }, "");

      cancelBack = {};

      whiteCloseEvent = () => {
        return function (e) {
          if (desktop) {
            removeByClass(whitePopupClassName);
          } else {
            const motherArr = [ ...document.querySelectorAll('.' + whitePopupClassName) ];
            if (motherArr.length > 1) {
              const [ cancel, whiteBase ] = motherArr;
              cancel.style.animation = "justfadeoutsmall 0.5s ease forwards";
              whiteBase.style.animation = "fadedownentire 0.5s ease forwards";
              setQueue(() => {
                removeByClass(whitePopupClassName);
              }, 500);
            }
          }
          window.history.pushState({ mode: "base" }, "");
          instance.mobileCardStack = 0;
        }
      }
      instance.whiteCloseEvent = whiteCloseEvent;

      cancelBack = createNode({
        mother: totalContents,
        class: [ whitePopupClassName ],
        event: {
          click: whiteCloseEvent(),
        },
        style: {
          position: "fixed",
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(0),
          transition: "all 0.3s ease",
          opacity: String(0),
          animation: "justfadeinsmall 0.5s ease forwards",
          background: desktop ? colorExtended.black : colorExtended.transparent,
          zIndex: String(zIndex),
        }
      });

      whiteBase = createNode({
        mother: totalContents,
        class: [ whitePopupClassName ],
        style: {
          position: "fixed",
          width: String(whiteStandardWidth) + ea,
          height: desktop ? "calc(calc(100% - " + String(naviHeight) + px + ") - " + String((whiteMargin * 2)) + ea + ")" : "calc(calc(100% - " + String(naviHeight) + px + ") - " + String(mobileWhiteTopMargin) + ea + ")",
          top: desktop ? "calc(" + String(naviHeight) + px + " + " + String(whiteMargin) + ea + ")" : "calc(" + String(naviHeight) + px + " + " + String(mobileWhiteTopMargin) + ea + ")",
          left: "calc(50% - " + String(whiteStandardWidth / 2) + ea + ")",
          borderTopLeftRadius: desktop ? String(boxRadius) + px : String(boxRadius) + "px",
          borderTopRightRadius: desktop ? String(boxRadius) + px : String(boxRadius) + "px",
          borderBottomLeftRadius: desktop ? String(boxRadius) + px : String(0) + ea,
          borderBottomRightRadius: desktop ? String(boxRadius) + px : String(0) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
          animation: desktop ? "fadeuporiginal 0.3s ease forwards" : "fadeupentire 0.5s ease forwards",
          zIndex: String(zIndex),
        },
        child: {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            height: withOut(0, ea),
            overflow: "visible",
          },
          next: {
            class: [ mobileBlueBarClassName ],
            attribute: { toggle: "on" },
            event: {
              click: whiteCloseEvent(),
            },
            style: {
              display: mobile ? "flex" : "none",
              position: "absolute",
              width: String(12) + ea,
              height: String(1) + ea,
              borderRadius: String(1) + ea,
              background: colorExtended.mainBlue,
              top: String(3) + ea,
              left: withOut(50, 12 / 2, ea),
            }
          }
        }
      }).firstChild;

      if (mobile) {
        swipePatch({
          down: whiteCloseEvent(),
        }, null, whiteBase.parentElement, "swipeStack_whiteBlock_index_top_", whiteBase.firstChild, () => {
          return whiteBase.firstChild.scrollTop <= 0;
        });
        swipePatch({
          right: whiteCloseEvent(),
        }, null, whiteBase.parentElement, "swipeStack_whiteBlock_index_right_", whiteBase.firstChild, () => {
          return (whiteBase.firstChild.scrollTop > 0) && (Math.floor(Math.abs(whiteBase.firstChild.firstChild.getBoundingClientRect().height - window.innerHeight)) - 2 > Math.floor(Math.abs(whiteBase.firstChild.firstChild.getBoundingClientRect().top)));
        });
        swipePatch({
          up: function (e) {
            if (instance.mobileCardStack === 0) {
              instance.mobileCardStack = instance.mobileCardStack + 1;
            } else {
              whiteCloseEvent().call(this);
              instance.mobileCardStack = 0;
            }
          },
          right: whiteCloseEvent(),
        }, null, whiteBase.parentElement, "swipeStack_whiteBlock_index_bottom_", whiteBase.firstChild, () => {
          return (Math.floor(Math.abs(whiteBase.firstChild.firstChild.getBoundingClientRect().height - window.innerHeight)) - 2 <= Math.floor(Math.abs(whiteBase.firstChild.firstChild.getBoundingClientRect().top)));
        });
        setQueue(() => {
          whiteBase.firstChild.addEventListener("scroll", (e) => {
            setDebounce(() => {
              if (whiteBase.firstChild.scrollTop <= 10) {
                if (document.querySelector('.' + mobileBlueBarClassName).getAttribute("toggle") === "off") {
                  document.querySelector('.' + mobileBlueBarClassName).style.animation = "justfadeinoriginal 0.3s ease forwards";
                  document.querySelector('.' + mobileBlueBarClassName).setAttribute("toggle", "on");
                  whiteBase.firstChild.scroll({ top: 0, left: 0, behavior: "smooth" });
                }
              } else {
                if (document.querySelector('.' + mobileBlueBarClassName).getAttribute("toggle") === "on") {
                  document.querySelector('.' + mobileBlueBarClassName).style.animation = "justfadeoutoriginal 0.3s ease forwards";
                  document.querySelector('.' + mobileBlueBarClassName).setAttribute("toggle", "off");
                }
              }
            }, "__whiteBaseScrollDebounce__", 100);
          });
        });
      }

      scrollTong = createNode({
        id: "scrollTong",
        mother: whiteBase,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0 * 2, ea),
          height: withOut(0, ea),
          overflow: "scroll",
          borderTopLeftRadius: desktop ? String(boxRadius) + px : String(boxRadius) + "px",
          borderTopRightRadius: desktop ? String(boxRadius) + px : String(boxRadius) + "px",
          borderBottomLeftRadius: desktop ? String(boxRadius) + px : String(0) + ea,
          borderBottomRightRadius: desktop ? String(boxRadius) + px : String(0) + ea,
        },
        child: {
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(scrollTongPaddingTop) + ea,
            width: withOut(innerMargin * 2, ea),
            height: "auto",
            marginLeft: String(innerMargin) + ea,
            marginRight: String(innerMargin) + ea,
            overflow: "visible",
          }
        }
      }).firstChild;

      instance.scrollTong = scrollTong;

      await instance.insertServiceDetailBox(scrollTong, serviceIndex);

      loading.remove();

    } catch (e) {
      console.log(e);
    }
  }
}

FrontIndexJs.prototype.insertPortfolioBase = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, equalJson, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const portfolioBaseBlockClassName = "portfolioBaseBlockClassName";
  let baseBlock;
  let limitLength;
  let photoMargin;
  let paddingBottom;
  let basePaddingTop;
  let totalBlockPaddingTop;
  let totalBlockPaddingBottom;

  limitLength = <%% 42, 42, 42, 42, 42 %%>;
  photoMargin = <%% 18, 16, 16, 16, 2.5 %%>;
  paddingBottom = <%% 120, 120, 120, 120, 22 %%>;

  totalBlockPaddingTop = <%% 140, 130, 110, 100, 140 %%>;
  totalBlockPaddingBottom = <%% 200, 190, 180, 170, 130 %%>;


  basePaddingTop = 10;

  if (mobile) {
    baseBlock = createNode({
      mother: baseTong,
      class: [ portfolioBaseBlockClassName ],
      style: {
        position: "relative",
        width: "calc(100% + " + String(photoMargin) + ea + ")",
        paddingBottom: String(paddingBottom) + ea,
        paddingTop: String(basePaddingTop) + ea,
      }
    });
  } else {
    baseBlock = createNode({
      mother: baseTong,
      class: [ portfolioBaseBlockClassName ],
      style: {
        display: "block",
        position: "relative",
        width: "calc(100% + " + String(photoMargin) + ea + ")",
        paddingBottom: String(totalBlockPaddingBottom) + ea,
        paddingTop: String(totalBlockPaddingTop) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: String(0) + ea,
          left: String(-1 * ((window.innerWidth - standardWidth) / 2) - 1) + ea,
          background: colorExtended.white,
          width: "calc(100vw + 1px)",
          height: withOut(0, ea),
          zIndex: String(-1),
        },
      }
    });
  }

  this.portfolioBlock(limitLength, null, instance.sort);
}

FrontIndexJs.prototype.portfolioBlock = function (limitLength, search = null, sort = "key9") {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, equalJson, selectByClass, cleanChildren, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref } = GeneralJs;
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const photoChar = 't';
  const photoCharMobile = "mot";
  const touchStartConst = "touchStartConstName";
  const portfolioBaseBlockClassName = "portfolioBaseBlockClassName";
  let { designers } = this;
  let baseBlock;
  let contentsArr;
  let gsArray;
  let baseWidth;
  let photoMargin;
  let columns;
  let seroWidth, garoWidth;
  let photoRatio;
  let photoHeight;
  let src;
  let contents;
  let title;
  let quoteWidth, quoteHeight;
  let quoteTop;
  let photoMarginBottom;
  let titleSize, titleWeight, titleMarginLeft;
  let tag;
  let block;
  let tagTong;
  let photoBlockMarginBottom;
  let garoSliceStart, garoSliceEnd, garoSliceLimit;
  let seroSliceStart, seroSliceEnd, seroSliceLimit;
  let tagTongWidthRatio;
  let tagSize, tagWeight;
  let tagPaddingLeft, tagPaddingTop, tagPaddingBottom;
  let tagMarginRight;
  let titleSubSize;
  let subTitle;
  let titleSubMarginTop;
  let service;
  let tagBlock;
  let subInfoSize;
  let subInfoWeight;
  let arrowWidth;
  let arrowHeight;
  let arrowBottom;
  let subInfoTextTop;
  let radiusPixel;
  let conidArr;

  if (typeof search === "string") {

    if (search === '') {
      contentsArr = this.contentsArr;

    } else if (/^\<\<\</.test(search)) {

      search = search.trim().replace(/^\<\<\</gi, '').replace(/\>\>\>$/gi, '');
      if (search === "") {
        contentsArr = [];
      } else {
        conidArr = search.split(",");
        contentsArr = this.contentsArr.toNormal().filter((o) => {
          return conidArr.includes(o.conid);
        });
      }

    } else {

      if (/엑스트라/gi.test(search)) {
        search = "엑스트라";
      }
      contentsArr = this.contentsArr.toNormal().filter((obj) => {
        let boo;
        let target;
        let projectTarget;
        let designerTarget;

        target = equalJson(JSON.stringify(obj.contents.portfolio.detailInfo.tag));
        target.push(obj.contents.portfolio.title.main.replace(/홈?스타일링/gi, ''));
        target.push(obj.contents.portfolio.title.sub.replace(/홈?스타일링/gi, ''));
        target.push(serviceParsing(obj.service));
        designerTarget = designers.search("desid", obj.desid);
        target.push(designerTarget.designer);

        boo = false;
        for (let t of target) {
          if ((new RegExp(search, "gi")).test(t)) {
            boo = true;
            break;
          }
        }

        return boo;
      });

    }

  } else {
    contentsArr = this.contentsArr;
  }

  contentsArr = equalJson(JSON.stringify(contentsArr));
  if (sort === "key9") {
    contentsArr.sort((a, b) => {
      return Number(b.contents.portfolio.detailInfo.sort.key9) - Number(a.contents.portfolio.detailInfo.sort.key9);
    });
  } else {
    contentsArr.sort((a, b) => {
      return Number(b.contents.portfolio.detailInfo.sort.key8) - Number(a.contents.portfolio.detailInfo.sort.key8);
    });
  }

  if (limitLength === null) {
    limitLength = contentsArr.length;
  }

  gsArray = this.generateGsArray(limitLength);

  baseWidth = Number(baseTong.style.width.replace(/[^0-9\.]/gi, ''));
  photoMargin = <%% 18, 16, 16, 16, 2.5 %%>;
  columns = <%% 4, 4, 3, 3, 2 %%>;

  photoRatio = (297 / 210);
  seroWidth = (baseWidth - (photoMargin * (columns - 1))) / columns;
  garoWidth = (seroWidth * 2) + photoMargin;
  photoHeight = seroWidth * photoRatio;
  photoMarginBottom = <%% 14, 14, 13, 12, 2.3 %%>;

  quoteHeight = <%% 10, 8, 8, 7, 1.8 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorExtended.mainBlue))) * quoteHeight;
  quoteTop = <%% (isMac() ? 7 : 5), (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), isIphone() ? 1.3 : 1.2 %%>;

  titleSize = <%% 18, 15, 16, 14, 3.3 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleMarginLeft = <%% 6, 6, 5, 5, 1.3 %%>;

  titleSubSize = <%% 14, 12, 12, 11, 2.5 %%>;
  titleSubMarginTop = <%% 3, 2, 2, 1, (isIphone() ? 0 : 0.3) %%>;

  photoBlockMarginBottom = <%% 65, 56, 52, 46, 8 %%>;

  garoSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  garoSliceEnd = <%% 10, 10, 10, 10, 9 %%>;
  garoSliceLimit = <%% 17, 17, 17, 17, 17 %%>;

  seroSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  seroSliceEnd = <%% 16, 15, 17, 15, 13 %%>;
  seroSliceLimit = <%% 30, 30, 30, 30, 30 %%>;

  tagTongWidthRatio = <%% 2, 2, 2, 2, 2 %%>;

  tagSize = <%% 12, 10, 10, 9, 2 %%>;
  tagWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagPaddingLeft = <%% 10, 8, 8, 7, 1 %%>;
  tagPaddingTop = <%% (isMac() ? 5 : 6), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), 1 %%>;
  tagPaddingBottom = <%% (isMac() ? 7 : 6), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isIphone() ? 1.2 : 1.4) %%>;
  tagMarginRight = <%% 4, 3, 3, 3, 1 %%>;

  subInfoSize = <%% 12, 11, 11, 10, 2.5 %%>;
  subInfoWeight = <%% 500, 500, 500, 500, 500 %%>;
  subInfoTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  arrowWidth = <%% 32, 28, 28, 26, 4 %%>;
  arrowHeight = <%% 9, 8, 8, 8, 1.5 %%>;
  arrowBottom = <%% 3, 3, 3, 2, 1 %%>;

  [ baseBlock ] = selectByClass(portfolioBaseBlockClassName);

  radiusPixel = <%% 15, 15, 15, 15, 15 %%>;

  if (search !== null) {
    cleanChildren(baseBlock);
  }

  if (limitLength !== 0) {
    for (let i = 0; i < limitLength; i++) {
      if (!this.loadedContents.includes(i) || search !== null) {

        ({ contents, service } = contentsArr[i]);

        if (desktop) {
          src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/" + photoChar + String(contents.portfolio.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
        } else {
          src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/mobile/" + photoCharMobile + String(contents.portfolio.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
        }

        title = contents.portfolio.title.main.split(", ")[1];
        title = title.replace(/홈?스타일링/gi, '') + serviceParsing(0).name[Number(service.serid.split('_')[1].replace(/[^0-9]/gi, '')) - 1];
        if (mobile) {
          title = title.split(" ").slice(0, title.split(" ").findIndex((s) => { return /py/gi.test(s) }) + 1).join(" ")
        }


        if (media[0] || media[2]) {
          subTitle = contents.portfolio.title.sub;
        } else {
          subTitle = contents.portfolio.title.sub;
          if (!mobile) {
            if (gsArray[i] !== 'g' && subTitle.length > 27) {
              subTitle = contents.portfolio.title.sub.replace(/홈?스타일링$/i, '');
            }
          } else {
            if (gsArray[i] !== 'g' && subTitle.length > 25) {
              subTitle = contents.portfolio.title.sub.replace(/홈?스타일링$/i, '');
            }
          }
        }
        tag = equalJson(JSON.stringify(contents.portfolio.detailInfo.tag));

        if (gsArray[i] !== 'g') {
          tag = tag.slice(garoSliceStart, garoSliceEnd);
          if (tag.reduce((acc, curr) => { return acc + curr.length }, 0) > garoSliceLimit) {
            tag = tag.slice(0, -1);
          }
        } else {
          tag = tag.slice(seroSliceStart, seroSliceEnd);
          if (tag.reduce((acc, curr) => { return acc + curr.length }, 0) > seroSliceLimit) {
            tag = tag.slice(0, -1);
          }
        }

        block = createNode({
          mother: baseBlock,
          attribute: {
            pid: contents.portfolio.pid,
          },
          event: {
            click: function (e) {
              const pid = this.getAttribute("pid");
              selfHref(FRONTHOST + "/portdetail.php?pid=" + pid);
            },
            touchstart: function (e) {
              const self = this;
              self.setAttribute(touchStartConst, "on");
              setQueue(() => {
                self.setAttribute(touchStartConst, "off");
              });
            },
            touchend: function (e) {
              if (this.getAttribute(touchStartConst) === "on") {
                const pid = this.getAttribute("pid");
                selfHref(FRONTHOST + "/portdetail.php?pid=" + pid);
              }
            }
          },
          style: {
            display: "inline-block",
            width: String(gsArray[i] === 'g' ? garoWidth : seroWidth) + ea,
            marginRight: String(photoMargin) + ea,
            marginBottom: String(photoBlockMarginBottom) + ea,
            verticalAlign: "top",
            overflow: "hidden",
            cursor: "pointer",
          },
          children: [
            {
              style: {
                display: "block",
                width: String(gsArray[i] === 'g' ? garoWidth : seroWidth) + ea,
                height: String(photoHeight) + ea,
                borderRadius: String(radiusPixel) + "px",
                marginBottom: String(photoMarginBottom) + ea,
                backgroundSize: "100% auto",
                backgroundPosition: "50% 50%",
                backgroundImage: "url('" + src + "')",
              }
            },
            {
              style: {
                display: "block",
                position: "relative",
                width: String(100) + '%',
              },
              children: [
                {
                  text: title,
                  style: {
                    display: "block",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    width: String(200) + '%',
                    verticalAlign: "top",
                    fontFamily: "pretendard",
                  }
                },
                {
                  style: {
                    display: "block",
                    width: withOut(0, ea),
                    verticalAlign: "top",
                    marginTop: String(titleSubMarginTop) + ea,
                    overflow: "hidden",
                  },
                  children: [
                    {
                      text: subTitle,
                      style: {
                        display: "block",
                        position: "relative",
                        fontSize: String(titleSubSize) + ea,
                        fontWeight: String(400),
                        color: colorChip.gray5,
                        width: String(200) + '%',
                        fontFamily: "pretendard",
                      },
                    }
                  ]
                }
              ]
            },
          ]
        });

        if (search === null) {
          this.loadedContents.push(i);
        }

      }
    }
  } else {

    for (let i = 0; i < 4; i++) {

      block = createNode({
        mother: baseBlock,
        style: {
          display: "inline-block",
          width: String(seroWidth) + ea,
          borderRadius: String(5) + "px",
          marginRight: String(photoMargin) + ea,
          marginBottom: String(photoBlockMarginBottom) + ea,
          verticalAlign: "top",
          overflow: "hidden",
        },
        children: [
          {
            style: {
              width: String(seroWidth) + ea,
              height: String(photoHeight) + ea,
              borderRadius: String(5) + "px",
              marginBottom: String(photoMarginBottom) + ea,
              background: colorChip.gray2,
            }
          },
          {
            style: {
              display: "block",
              position: "relative",
            },
            children: [
              {
                mode: "svg",
                source: svgMaker.doubleQuote(colorExtended.mainBlue),
                style: {
                  display: "inline-block",
                  height: String(quoteHeight) + ea,
                  width: String(quoteWidth) + ea,
                  verticalAlign: "top",
                  position: "relative",
                  top: String(quoteTop) + ea,
                }
              },
              {
                text: "-",
                style: {
                  display: "inline-block",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  marginLeft: String(titleMarginLeft) + ea,
                  verticalAlign: "top",
                  fontFamily: "pretendard",
                }
              }
            ]
          }
        ]
      });

    }

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

    class SearchArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(target, value) {
        let obj = null;
        for (let i of this) {
          if (i[target] === value) {
            obj = i;
          }
        }
        return obj;
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i);
        }
        return arr;
      }
    }

    const { media } = this;
    const { returnGet, ajaxJson, dateToString, homeliaisonAnalytics, colorExtended, stringToLink, objectDeepCopy } = GeneralJs;
    const getObj = returnGet();
    const mobile = media[4];
    const desktop = !mobile;
    let response;
    let reviewRes, lengthDic;
    let thisCliid;

    if (typeof getObj.cliid === "string" && /^c/gi.test(getObj.cliid)) {
      thisCliid = getObj.cliid;
    } else {
      thisCliid = "null";
    }

    response = await ajaxJson({ mode: "portfolio", limit: 42 }, LOGHOST + "/getContents", { equal: true });
    reviewRes = await ajaxJson({ mode: "review", limit: 5, newmode: 1 }, LOGHOST + "/getContents", { equal: true });
    lengthDic = await ajaxJson({ data: null }, LOGHOST + "/getLength", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.designers = new SearchArray(response.designers);
    this.fullLoad = false;
    this.photoLoad = false;
    this.loadedContents = [];
    this.sort = "key9";
    this.search = "";
    this.reviewTargets = reviewRes.contentsArr;
    this.lengthDic = lengthDic;

    this.initAreaClassName = "initAreaClassName";
    this.secondBaseClassName = "secondBaseClassName";

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "frontIndex",
      client: null,
      cliid: thisCliid,
      base: {
        instance: this,
        binaryPath: FrontIndexJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 9,
        blueLogo: true,
      },
      local: async () => {
        try {
          await instance.insertInitBox();
          await instance.insertSecondBox();
          await instance.insertThirdBox();
          await instance.insertConsultingBox(false);
          instance.insertPortfolioBase();
          await instance.insertConsultingBox(true);

          if (getObj.mode === "about") {
            const thisFunction = instance.insertWhiteCardEvent(1);
            await thisFunction(new Event("click", { bubbles: true }));
          }

          instance.resizeEvent();
          setInterval(() => {
            homeliaisonAnalytics({
              page: instance.pageName,
              standard: instance.firstPageViewTime,
              action: "readTimer",
              data: {
                cliid: thisCliid,
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
