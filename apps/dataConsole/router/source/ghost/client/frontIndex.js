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
    let mobileMargin;
    let paddingVisual;

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    firstBasePaddingTop = <%% 24, 24, 24, 24, (window.innerHeight < 700 ? 1.5 : 6.5) %%>;
    firstBasePaddingBottom = <%% 160, 160, 160, 120, 20 %%>;

    subTitleSize = <%% 20, 18, 17, 15, 4.2 %%>;
    subTitleWeight = 500;

    titleSize = <%% 50, 48, 43, 36, 7 %%>;
    titleWeight = 700;

    mainImageWidth = 59;
    subTitleBlockMarginTop = 2.6;
    imageBlockMarginTop = 6.5;
    boxBlock0MarginTop = 13;
    boxBlock1MarginTop = 2;
    boxBlockHeight = 20;

    titleLineBoxWidthVisual = -1.2;
    titleLineBoxHeight = 3;
    titleLineBoxTop = 7;
    titleLineBoxLeft = -1;
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

    mobileMargin = 6;

    paddingVisual = 15;

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

    // if (window.innerHeight < 700) {
    //   totalHeight = 0;
    //   totalHeight += mainTitleBlock.getBoundingClientRect().height;
    //   totalHeight += subTitleBlock.getBoundingClientRect().height;
    //   totalHeight += imageBlock.getBoundingClientRect().height;
    //   totalHeight += window.innerWidth * ((subTitleBlockMarginTop + imageBlockMarginTop + boxBlock0MarginTop + boxBlock1MarginTop + boxBlockHeight + boxBlockHeight + instance.baseTop + instance.baseTop) / 100);
    //   totalHeight += instance.naviHeight;
    //   firstBase.style.paddingTop = String((window.innerHeight - totalHeight - paddingVisual) / 2) + "px";
    // }

    // setQueue(() => {
    //   if (window.innerHeight < 700) {
    //     totalHeight = 0;
    //     totalHeight += mainTitleBlock.getBoundingClientRect().height;
    //     totalHeight += subTitleBlock.getBoundingClientRect().height;
    //     totalHeight += imageBlock.getBoundingClientRect().height;
    //     totalHeight += window.innerWidth * ((subTitleBlockMarginTop + imageBlockMarginTop + boxBlock0MarginTop + boxBlock1MarginTop + boxBlockHeight + boxBlockHeight + instance.baseTop + instance.baseTop) / 100);
    //     totalHeight += instance.naviHeight;
    //     firstBase.style.paddingTop = String((window.innerHeight - totalHeight - paddingVisual) / 2) + "px";
    //   }

    //   setQueue(() => {
    //     if (window.innerHeight < 700) {
    //       totalHeight = 0;
    //       totalHeight += mainTitleBlock.getBoundingClientRect().height;
    //       totalHeight += subTitleBlock.getBoundingClientRect().height;
    //       totalHeight += imageBlock.getBoundingClientRect().height;
    //       totalHeight += window.innerWidth * ((subTitleBlockMarginTop + imageBlockMarginTop + boxBlock0MarginTop + boxBlock1MarginTop + boxBlockHeight + boxBlockHeight + instance.baseTop + instance.baseTop) / 100);
    //       totalHeight += instance.naviHeight;
    //       firstBase.style.paddingTop = String((window.innerHeight - totalHeight - paddingVisual) / 2) + "px";
    //     }
  
    //   }, 500);

    // });

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

    boxRadius = 15;
    moreAreaHeight = 12;

    moreSize = 3.2;
    moreWeight = 600;
    moreTextTop = -0.2;

    mobileMargin = 6;
    blackTop = -31;

    whiteBlockBetween = 4;

    whiteBlockHeight = 80;
    barMargin = 2.5;

    topBottomMargin = 9;

    blueBlockBetween = 1.8;

    titleSize = 4.8;

    imageBoxWidth = 62;
    imageScale = 0.84;
    imageOpacity = 0.4;

    imageMarginTop = 3;

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
            title: "시공",
          },
          {
            title: "퍼니싱 단독 서비스",
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
            title: "퍼니싱 단독 서비스",
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

    // click me
    createNode({
      mother: secondBase,
      mode: "img",
      attribute: {
        src: FrontIndexJs.binaryPath + "/clickMe.png",
      },
      style: {
        display: "inline-block",
        position: "absolute",
        top: String(-13) + ea,
        right: String(1) + ea,
        width: String(26) + ea,
        height: "auto",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
      }
    });

    // contents
    num = 0;
    for (let c of contents) {
      whiteBlock = createNode({
        mother: secondBase,
        style: {
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: withOut(0, ea),
          paddingTop: String(topBottomMargin) + ea,
          paddingBottom: String(topBottomMargin + moreAreaHeight - blueBlockBetween) + ea,
          marginBottom: String(whiteBlockBetween) + ea,
          borderRadius: String(boxRadius) + "px",
          background: colorExtended.white,
          justifyContent: "start",
          alignItems: "center",
          overflow: "hidden",
          animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
          boxShadow: "0px 5px 22px -9px " + colorExtended.ultimateBlack,
        },
        child: {
          style: {
            display: "flex",
            position: "absolute",
            height: String(moreAreaHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
            width: withOut(0, ea),
            bottom: String(0),
            left: String(0),
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
                    fontFamily: "pretendard",
                  }
                },
                {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    marginLeft: String(1) + ea,
                    width: String(2.8) + ea,
                    height: String(2.8) + ea,
                    borderRadius: String(3) + ea,
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
                      marginLeft: String(0.2) + ea,
                      width: String(1) + ea,
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
              fontWeight: String(700),
              color: colorExtended.black,
              fontFamily: "pretendard",
            }
          },
          {
            text: c.eng,
            style: {
              display: "inline-block",
              marginTop: String(0.1) + ea,
              position: "relative",
              fontSize: String(2.7) + ea,
              fontWeight: String(300),
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
          width: withOut(mobileMargin * 6, ea),
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
              fontSize: String(3) + ea,
              fontWeight: String(500),
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
          width: withOut(mobileMargin * 6, ea),
        }
      });
      
      for (let button of c.buttons) {

        blueBlock = createNode({
          mother: whiteBlock,
          style: {
            display: "inline-flex",
            position: "relative",
            flexDirection: "row",
            width: withOut(mobileMargin * 6, ea),
            height: String(8.8) + ea,
            borderRadius: String(8.8) + ea,
            border: "1.5px solid " + colorExtended.black,
            background: colorExtended.blue,
            marginBottom: String(blueBlockBetween) + ea,
            justifyContent: "center",
            alignItems: "center",
          },
          children: [
            {
              style: {
                width: String(4.5) + ea,
                height: String(4.5) + ea,
                borderRadius: String(4.5) + ea,
                display: "inline-block",
                position: "absolute",
                left: String(2.5) + ea,
                background: colorExtended.black,
              },
              child: {
                mode: "svg",
                source: svgMaker.checkCircle(colorExtended.white),
                style: {
                  width: String(4.7) + ea,
                  display: "inline-block",
                  position: "absolute",
                  top: String(-0.1) + ea,
                  left: String(-0.1) + ea,
                }
              }
            },
            {
              text: button.title,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(3.2) + ea,
                fontWeight: String(600),
                top: String(-0.2) + ea,
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
    createNode({
      mother: secondBase,
      style: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(15) + ea,
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        style: {
          display: "inline-flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          width: String(50) + ea,
          height: String(9) + ea,
          borderRadius: String(9) + ea,
          background: colorExtended.darkDarkBlack,
        },
        child: {
          text: "홈리에종 <b%BEST%b> 리뷰 바로가기",
          style: {
            display: "inline-block",
            position: "relative",
            textAlign: "center",
            fontSize: String(3.4) + ea,
            fontWeight: String(700),
            fontFamily: "pretendard",
            color: colorExtended.white,
            top: String(-0.2) + ea,
          },
          bold: {
            fontSize: String(3.7) + ea,
            fontWeight: String(700),
            fontFamily: "mont",
            color: colorExtended.white,
          }
        }
      }
    });

    imageReviewBox = createNode({
      mother: secondBase,
      style: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(6) + ea,
        paddingBottom: String(21) + ea,
        justifyContent: "center",
        alignItems: "center",
      },
    });

    createNode({
      mother: imageReviewBox,
      style: {
        display: "inline-flex",
        position: "absolute",
        left: String(0),
        top: String(6) + ea,
        width: String(imageBoxWidth) + ea,
        height: String(imageBoxWidth) + ea,
        borderRadius: String(15) + "px",
        backgroundImage: "url('" + FrontIndexJs.binaryPath + "/" + "slide1_0.jpg" + "')",
        backgroundPosition: "50% 50%",
        backgroundSize: "auto 100%",
        transformOrigin: "0% 50%",
        transform: "scale(" + String(imageScale) + ")",
        boxShadow: "0px 3px 22px -9px " + colorExtended.ultimateBlack,
        opacity: String(imageOpacity),
      }
    });

    createNode({
      mother: imageReviewBox,
      style: {
        display: "inline-flex",
        position: "absolute",
        right: String(0),
        top: String(6) + ea,
        width: String(imageBoxWidth) + ea,
        height: String(imageBoxWidth) + ea,
        borderRadius: String(15) + "px",
        backgroundImage: "url('" + FrontIndexJs.binaryPath + "/" + "slide0_2.jpg" + "')",
        backgroundPosition: "60% 50%",
        backgroundSize: "auto 100%",
        transformOrigin: "100% 50%",
        transform: "scale(" + String(imageScale) + ")",
        boxShadow: "0px 3px 22px -9px " + colorExtended.ultimateBlack,
        opacity: String(imageOpacity),
      }
    });

    createNode({
      mother: imageReviewBox,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(imageBoxWidth) + ea,
        height: String(imageBoxWidth) + ea,
        borderRadius: String(15) + "px",
        backgroundImage: "url('" + FrontIndexJs.binaryPath + "/" + "slide2_0.jpg" + "')",
        backgroundPosition: "58% 50%",
        backgroundSize: "auto 100%",
        boxShadow: "0px 3px 22px -9px " + colorExtended.ultimateBlack,
        overflow: "hidden",
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
            opacity: String(0.2),
            background: colorExtended.black,
          }
        },
        {
          text: [
            "갖고 있는 가구와",
            "새로운 가구의 재배치는",
            "큰 변화를 주었어요."
          ].join("\n"),
          style: {
            display: "inline-block",
            position: "absolute",
            top: String(6) + ea,
            left: String(6) + ea,
            fontSize: String(3.2) + ea,
            fontWeight: String(600),
            fontFamily: "pretendard",
            color: colorExtended.white,
            lineHeight: String(1.5),
          }
        },
        {
          text: "서울숲 트리마제 56py 홈퍼니싱",
          style: {
            display: "inline-block",
            position: "absolute",
            bottom: String(6) + ea,
            left: String(6) + ea,
            fontSize: String(2.5) + ea,
            fontWeight: String(500),
            fontFamily: "pretendard",
            color: colorExtended.white,
            lineHeight: String(1.5),
          }
        },
      ]
    });

    createNode({
      mother: imageReviewBox,
      mode: "svg",
      source: svgMaker.generalTriangle(colorExtended.white),
      style: {
        display: "inline-block",
        position: "absolute",
        width: String(3.4) + ea,
        transformOrigin: "50% 50%",
        transform: "rotate(90deg)",
        left: String(5) + ea,
        opacity: String(0.9),
      }
    });

    createNode({
      mother: imageReviewBox,
      mode: "svg",
      source: svgMaker.generalTriangle(colorExtended.white),
      style: {
        display: "inline-block",
        position: "absolute",
        width: String(3.4) + ea,
        transformOrigin: "50% 50%",
        transform: "rotate(-90deg)",
        right: String(5) + ea,
        opacity: String(0.9),
      }
    });


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

    boxRadius = 15;
    boxRadiusBig = 20;
    boxRadiusSmall = 2;

    moreAreaHeight = 12;
    mobileMargin = 6;
    slimMargin = 3;

    topBottomMargin = 14;

    baseModuleHeight = 97;
    baseModuleHeight2 = 112;
    finalModuleHeight = 90;

    descriptionMarginTop = 8;
    imageMarginTop = 3;

    // first
    firstBase = createNode({
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
          display: "block",
          position: "absolute",
          top: String(0),
          left: String(-1 * mobileMargin) + ea,
          width: withOut(-1 * mobileMargin * 2, ea),
          height: withOut(0, ea),
          background: colorExtended.white,
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
            borderRadius: String(boxRadiusBig) + "px",
          }
        }
      }
    });
    firstBox = createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
      }
    });
    createNode({
      mother: firstBox,
      style: {
        display: "inline-flex",
        position: "relative",
        flexDirection: "column",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        paddingTop: String(topBottomMargin) + ea,
      },
      child: {
        text: [
          "선호하는 <b%1명의 디자이너%b>를",
          "선택할 수 있어요.",
        ].join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(5) + ea,
          fontWeight: String(600),
          fontFamily: "pretendard",
          color: colorExtended.black,
          lineHeight: String(1.3),
        },
        bold: {
          fontSize: String(5) + ea,
          fontWeight: String(600),
          fontFamily: "pretendard",
          color: colorExtended.mainBlue,
        },
        next: {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(33) + ea,
            height: String(3) + ea,
            borderBottom: "2px solid " + colorExtended.black,
          }
        }
      }
    });
    createNode({
      mother: firstBox,
      style: {
        display: "inline-flex",
        position: "relative",
        flexDirection: "column",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "end",
        alignItems: "end",
        paddingTop: String(imageMarginTop) + ea,
      },
      child: {
        mode: "img",
        attribute: {
          src: FrontIndexJs.binaryPath + "/frontIndexSource1.png",
        },
        style: {
          display: "inline-block",
          position: "relative",
          width: String(73) + ea,
        }
      }
    });
    createNode({
      mother: firstBox,
      style: {
        display: "inline-flex",
        position: "relative",
        flexDirection: "column",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        paddingTop: String(descriptionMarginTop) + ea,
        paddingBottom: String(topBottomMargin) + ea,
      },
      child: {
        text: [
          "다양한 컨셉과 역량을 가진",
          "80명의 홈리에종 협업 디자이너",
        ].join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(3.4) + ea,
          fontWeight: String(600),
          fontFamily: "pretendard",
          color: colorExtended.black,
          lineHeight: String(1.5),
        },
      }
    });

    // second
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
        height: String(baseModuleHeight) + ea,
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
            borderBottomLeftRadius: String(boxRadiusSmall) + "px",
            borderBottomRightRadius: String(boxRadiusBig) + "px",
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
    secondBox = createNode({
      mother: secondBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "end",
        top: String(slimMargin) + ea,
        height: withOut(slimMargin * 2, ea),
        flexDirection: "row",
      }
    });
    createNode({
      mother: secondBox,
      mode: "img",
      attribute: {
        src: FrontIndexJs.binaryPath + "/frontIndexSource4.png",
      },
      style: {
        display: "inline-block",
        position: "relative",
        width: String(45) + ea,
        marginLeft: String(2) + ea,
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
        paddingLeft: String(4) + ea,
        top: String(-5) + ea,
      },
      child: {
        text: [
          "끌려가는",
          "인테리어? NO!",
          "<b%내가 원하는 컨셉%b>을",
          "실현해요."
        ].join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(5) + ea,
          fontWeight: String(600),
          fontFamily: "pretendard",
          color: colorExtended.black,
          lineHeight: String(1.3),
        },
        bold: {
          fontSize: String(4.7) + ea,
          fontWeight: String(600),
          fontFamily: "pretendard",
          color: colorExtended.mainBlue,
        },
        next: {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(18) + ea,
            height: String(3) + ea,
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
              paddingTop: String(11) + ea,
              paddingBottom: String(topBottomMargin) + ea,
            },
            child: {
              text: [
                "시공범위와 퍼니싱 정도를",
                "내 마음대로 조절하는",
                "진정한 맞춤형 서비스",
              ].join("\n"),
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(3.4) + ea,
                fontWeight: String(600),
                fontFamily: "pretendard",
                color: colorExtended.black,
                lineHeight: String(1.6),
              },
            }
          }
        }
      }
    });

    // third
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
      },
      child: {
        style: {
          display: "block",
          position: "absolute",
          top: String(0),
          left: String(-1 * mobileMargin) + ea,
          width: withOut(-1 * mobileMargin * 2, ea),
          height: withOut(0, ea),
          background: colorExtended.white,
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
            borderRadius: String(boxRadiusBig) + "px",
          }
        }
      }
    });
    thirdBox = createNode({
      mother: thirdBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
      }
    });
    createNode({
      mother: thirdBox,
      style: {
        display: "inline-flex",
        position: "relative",
        flexDirection: "column",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        paddingTop: String(topBottomMargin) + ea,
      },
      child: {
        text: [
          "기획을 먼저 잡고",
          "<b%필요한 시공%b>만 진행해요.",
        ].join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(5) + ea,
          fontWeight: String(600),
          fontFamily: "pretendard",
          color: colorExtended.black,
          lineHeight: String(1.3),
        },
        bold: {
          fontSize: String(5) + ea,
          fontWeight: String(600),
          fontFamily: "pretendard",
          color: colorExtended.mainBlue,
        },
        next: {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(27) + ea,
            height: String(3) + ea,
            borderBottom: "2px solid " + colorExtended.black,
          }
        }
      }
    });
    createNode({
      mother: thirdBox,
      style: {
        display: "inline-flex",
        position: "relative",
        flexDirection: "column",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "end",
        alignItems: "end",
        paddingTop: String(imageMarginTop) + ea,
      },
      child: {
        mode: "img",
        attribute: {
          src: FrontIndexJs.binaryPath + "/frontIndexSource2.png",
        },
        style: {
          display: "inline-block",
          position: "relative",
          width: String(73) + ea,
        }
      }
    });
    createNode({
      mother: thirdBox,
      style: {
        display: "inline-flex",
        position: "relative",
        flexDirection: "column",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        paddingTop: String(descriptionMarginTop) + ea,
        paddingBottom: String(topBottomMargin) + ea,
      },
      child: {
        text: [
          "무리한 시공에 대한 위험을 막아드릴게요.",
          "필요한 시공만 합리적으로!",
        ].join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(3.4) + ea,
          fontWeight: String(600),
          fontFamily: "pretendard",
          color: colorExtended.black,
          lineHeight: String(1.5),
        },
      }
    });

    // fourth
    fourthBase = createNode({
      mother: baseTong,
      class: [ secondBaseClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        height: String(baseModuleHeight2) + ea,
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
          fontSize: String(4.8) + ea,
          fontWeight: String(600),
          fontFamily: "pretendard",
          color: colorExtended.black,
          lineHeight: String(1.4),
          textAlign: "center",
        },
        bold: {
          fontSize: String(4.8) + ea,
          fontWeight: String(600),
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
        paddingTop: String(5) + ea,
      },
      child: {
        mode: "img",
        attribute: {
          src: FrontIndexJs.binaryPath + "/frontIndexSource3.png",
        },
        style: {
          display: "inline-block",
          position: "relative",
          width: String(66) + ea,
          left: String(-1) + ea,
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
        paddingTop: String(3) + ea,
      },
      child: {
        text: [
          "예상하지 못한 상황에도",
          "안심하고 인테리어를 진행할 수 있어요. ",
        ].join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(3.4) + ea,
          fontWeight: String(600),
          fontFamily: "pretendard",
          color: colorExtended.black,
          lineHeight: String(1.5),
          textAlign: "center",
        },
      }
    });

    // fifth
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
        height: String(finalModuleHeight) + ea,
      },
      child: {
        style: {
          display: "block",
          position: "absolute",
          top: String(0),
          left: String(-1 * mobileMargin) + ea,
          width: withOut(-1 * mobileMargin * 2, ea),
          height: withOut(0, ea),
          background: colorExtended.black,
        },
      }
    });
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
          "어떤 서비스를 선택해야 할지 모르겠어요!",
        ].join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(4.8) + ea,
          fontWeight: String(600),
          fontFamily: "pretendard",
          color: colorExtended.white,
          lineHeight: String(1.4),
          textAlign: "center",
        },
        bold: {
          fontSize: String(4.8) + ea,
          fontWeight: String(600),
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
        paddingTop: String(3) + ea,
      },
      child: {
        text: [
          "부담 없는 인테리어 상담을 도와드립니다.",
          "합리적인 서비스를 경험하세요.",
        ].join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(3.4) + ea,
          fontWeight: String(600),
          fontFamily: "pretendard",
          color: colorExtended.mainBlue,
          lineHeight: String(1.5),
          textAlign: "center",
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
        height: String(11.5) + ea,
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(15) + ea,
        borderRadius: String(boxRadius) + "px",
        background: colorExtended.gradientBlue2,
      },
      child: {
        text: [
          "인테리어 무료 상담 받기",
        ].join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(3.8) + ea,
          fontWeight: String(600),
          fontFamily: "pretendard",
          color: colorExtended.black,
          lineHeight: String(1.5),
          textAlign: "center",
          top: String(-0.2) + ea,
        },
        next: {
          style: {
            position: "absolute",
            display: "inline-flex",
            flexDirection: "column",
            width: String(23) + ea,
            height: String(6.6) + ea,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: String(5) + "px",
            background: colorExtended.subRed,
            top: String(-7.6) + ea,
            boxShadow: "0px 10px 32px -9px " + colorExtended.ultimateBlack,
          },
          child: {
            text: [
              "간편 상담 신청하고",
            ].join("\n"),
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(2.5) + ea,
              fontWeight: String(700),
              fontFamily: "pretendard",
              color: colorExtended.white,
              lineHeight: String(1.5),
              textAlign: "center",
              top: String(-0.2) + ea,
            },
            next: {
              mode: "svg",
              source: svgMaker.generalTriangle(colorExtended.subRed),
              style: {
                width: String(2.6) + ea,
                position: "absolute",
                left: "calc(50% - " + String(2.6 / 2) + ea + ")",
                top: String(6.2) + ea,
              }
            }
          }
        }
      }
    });

  } catch (e) {
    console.log(e);
  }
}

FrontIndexJs.prototype.insertServiceDetailBox = async function () {
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

    boxRadius = 15;
    moreAreaHeight = 12;

    moreSize = 3.2;
    moreWeight = 600;
    moreTextTop = -0.2;

    mobileMargin = 6;
    blackTop = -31;

    whiteBlockBetween = 4;

    whiteBlockHeight = 80;
    barMargin = 2.5;

    topBottomMargin = 9;

    blueBlockBetween = 1.8;

    titleSize = 4.8;

    imageBoxWidth = 62;
    imageScale = 0.84;
    imageOpacity = 0.4;

    imageMarginTop = 3;

    moreWords = "더보기";
    tableTitle = "나에게 필요한 서비스는 무엇일까?";
    tableDescription = [
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
    contents = [
      {
        title: "홈퍼니싱",
        eng: "Home Furnishing",
        description: [
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
          description: [
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
          ],
        }
      },
      {
        title: "홈스타일링",
        eng: "Home Styling",
        description: [
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
          "걸레받이 / 몰딩 / 문짝",
          "일부 배선 및 조명 교체",
          "덧방 위주",
          "마루 / 장판",
          "악세사리 교체",
          "악세사리 교체",
          "전체 제공",
          "전체 제공",
          "중문 교체",
          "붙박이장 / 냉장고장",
          "제공 없음",
          "제공 없음",
        ],
        solve: {
          title: [
            "도배 바닥 필름 등",
            "기본적인 톤 보정만으로",
            "공간의 분위기 전환!",
          ],
          description: [
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
          ],
        }
      },
      {
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
          "전체 배선 및 조명 교체",
          "전체 철거 및 교체",
          "마루 / 장판 / 타일",
          "전체 철거 및 전체 공사",
          "전체 철거 및 전체 공사",
          "전체 제공",
          "전체 제공",
          "중문 교체",
          "모든 종류의 제작 가구",
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
          ],
        }
      },
    ];
    selectionButtons = contents.map((o) => { return o.eng });

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
    });

    // contents
    num = 0;
    for (let c of contents) {

      thisBlueOpacity = 1 - (0.2 * num);

      thisServiceBase = createNode({
        mother: secondBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
        }
      });

      selectionButtonsBase = createNode({
        mother: thisServiceBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "row",
          marginBottom: String(1.6) + ea,
          paddingLeft: String(1) + ea,
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
            height: String(3) + ea,
            justifyContent: "start",
            alignItems: "center",
            flexDirection: "row",
            marginRight: String(3) + ea,
          }
        });
        createNode({
          mother: serviceButtonBlock,
          style: {
            display: "inline-block",
            position: "relative",
            width: String(2) + ea,
            height: String(2) + ea,
            borderRadius: String(1) + "px",
            background: boo ? colorExtended.blue : colorExtended.white,
            border: "1px solid " + colorExtended.black,
            marginRight: String(1) + ea,
          }
        });
        createNode({
          mother: serviceButtonBlock,
          text: service,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(2.5) + ea,
            fontWeight: String(700),
            fontFamily: "mont",
            color: boo ? colorExtended.mainBlue : colorExtended.deactive,
            top: String(0) + ea,
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
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: String(2) + "px solid " + colorExtended.black,
          background: colorExtended.white,
          borderRadius: String(boxRadius) + "px",
          marginBottom: String(2) + ea,
          height: String(52) + ea,
          zIndex: String(2),
        }
      });
      createNode({
        mother: mainServiceBlock,
        style: {
          display: "inline-block",
          position: "absolute",
          width: String(1.3) + ea,
          height: String(1.3) + ea,
          background: colorExtended.mainBlue,
          top: String(2.5) + ea,
          right: String(2.5) + ea,
          opacity: String(0.5),
        }
      })
      createNode({
        mother: mainServiceBlock,
        text: c.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(4.8) + ea,
          fontWeight: String(700),
          fontFamily: "pretendard",
          color: colorExtended.black,
          marginBottom: String(0.1) + ea,
        }
      });
      createNode({
        mother: mainServiceBlock,
        text: c.eng,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(2.3) + ea,
          fontWeight: String(700),
          fontFamily: "mont",
          color: colorExtended.mainBlue,
        }
      });
      createNode({
        mother: mainServiceBlock,
        style: {
          display: "inline-block",
          position: "relative",
          width: String(28) + ea,
          height: String(3.6) + ea,
          marginBottom: String(3.8) + ea,
          borderBottom: String(2) + "px solid " + colorExtended.black,
        }
      });
      createNode({
        mother: mainServiceBlock,
        text: c.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(3.3) + ea,
          fontWeight: String(500),
          fontFamily: "pretendard",
          color: colorExtended.black,
          lineHeight: String(1.5),
          textAlign: "center",
        }
      });

      // black box
      blackBlock = createNode({
        mother: thisServiceBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(mobileMargin, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          height: String(80) + ea,
          paddingTop: String(6) + ea,
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
            height: withOut(-1 * 20, ea),
            top: String(-20) + ea,
            borderBottomRightRadius: String(8) + ea,
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
          width: withOut(0, ea),
          paddingLeft: String(0.8) + ea,
          marginBottom: String(2) + ea,
        },
        child: {
          mode: "svg",
          source: svgMaker.doubleQuote(colorExtended.mainBlue),
          style: {
            display: "inline-block",
            width: String(3) + ea,
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
          width: withOut(0, ea),
          paddingLeft: String(0) + ea,
        },
        child: {
          text: c.comments,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(5) + ea,
            fontWeight: String(600),
            fontFamily: "pretendard",
            color: colorExtended.white,
            lineHeight: String(1.41),
          }
        }
      });





      // solve box
      solveBlock = createNode({
        mother: thisServiceBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          height: String(80) + ea,
          paddingTop: String(6) + ea,
        },
        child: {
          style: {
            display: "block",
            position: "absolute",
            width: withOut(-1 * mobileMargin * 2, ea),
            left: String(-1 * mobileMargin) + ea,
            background: colorExtended.white,
            height: withOut(-1 * 10, ea),
            top: String(-10) + ea,
          },
          next: {
            style: {
              display: "block",
              position: "absolute",
              width: withOut(-1 * mobileMargin * 2, ea),
              left: String(-1 * mobileMargin) + ea,
              background: colorExtended.mainBlue,
              height: withOut(-1 * 10, ea),
              top: String(-10) + ea,
              opacity: String(thisBlueOpacity),
            }
          }
        }
      });

      // photo zone
      photoBlock = createNode({
        mother: thisServiceBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          height: String(80) + ea,
          paddingTop: String(6) + ea,
        },
        child: {
          style: {
            display: "block",
            position: "absolute",
            width: withOut(-1 * mobileMargin * 2, ea),
            left: String(-1 * mobileMargin) + ea,
            background: colorExtended.white,
            height: withOut(0, ea),
            top: String(0) + ea,
          },
        }
      });

      num++;
    }

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
          // await instance.insertInitBox();
          // await instance.insertSecondBox();
          // await instance.insertThirdBox();

          await instance.insertServiceDetailBox();

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
