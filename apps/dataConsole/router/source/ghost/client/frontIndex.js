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

    moreSize = 3.4;
    moreWeight = 600;
    moreTextTop = -0.2;

    mobileMargin = 6;
    blackTop = -31;

    whiteBlockBetween = 4;

    whiteBlockHeight = 80;
    barMargin = 2.5;

    topBottomMargin = 9;

    blueBlockBetween = 1.8;

    titleSize = 5;

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
                    top: String(-0.1) + ea,
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

    boxRadius = 15;
    boxRadiusBig = 20;
    boxRadiusSmall = 2;

    moreAreaHeight = 12;
    mobileMargin = 6;
    slimMargin = 3;

    topBottomMargin = 14;

    descriptionMarginTop = 8;
    imageMarginTop = 3;

    baseHeight = lastMode ? 42 : 92;
    buttonMarginTop = lastMode ? 1 : 16;

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
        width: withOut(0, ea),
        height: String(11) + ea,
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
          fontSize: String(3.5) + ea,
          fontWeight: String(600),
          fontFamily: "pretendard",
          color: lastMode ? colorExtended.white : colorExtended.black,
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
          width: String(17) + ea,
          height: String(7) + ea,
          justifyContent: "center",
          top: String(-26) + ea,
          alignItems: "center",
          marginTop: String(buttonMarginTop) + ea,
          borderRadius: String(7) + ea,
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
            fontSize: String(3) + ea,
            fontWeight: String(700),
            fontFamily: "pretendard",
            color: colorExtended.white,
            lineHeight: String(1.5),
            textAlign: "center",
            top: String(-0.1) + ea,
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

    boxRadius = 15;
    photoRadius = 8;
    moreAreaHeight = 12;
    factorRadius = 4;

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

    solveBlockHeight = 9.4;
    blockBetween = 1.8;

    commentsTitleSize = 5.4;

    photoHeight = 70;
    photoWidth = 140;
    photoBetween = 2.5;

    serviceAreaBetween = 24;

    bigMargin = 11;
    tableFactorHeight = 8.2;
    factorBetween = 0.4;
    tableFactorWidth0 = 11.5;
    tableFactorWidth1 = (standardWidth - tableFactorWidth0 - (factorBetween * 3)) / 3;

    factorSize = 2.8;
    factorTextTop = -0.2;

    if (secondBaseMother === null || typeof secondBaseMother !== "object") {
      secondBaseMother = baseTong;
    }

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

    furnishingObj = {
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
    };

    stylingObj = {
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
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        paddingTop: String(secondBaseMother === baseTong ? 4 : 0) + ea,
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
          paddingTop: String(6) + ea,
          paddingBottom: String(11) + ea,
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
            fontSize: String(commentsTitleSize) + ea,
            fontWeight: String(600),
            fontFamily: "pretendard",
            color: colorExtended.white,
            lineHeight: String(1.44),
          }
        }
      });
      blackBlueArea = createNode({
        mother: blackBlock,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "end",
          alignItems: "end",
          flexDirection: "column",
          paddingTop: String(num === 0 ? 7.5 : 9) + ea,
          paddingLeft: String(0 / 2) + ea,
          paddingRight: String(0 / 2) + ea,
        }
      });
      num3 = 0;
      for (let b of c.buttons) {

        createNode({
          mother: blackBlueArea,
          style: {
            height: String(8.6) + ea,
            paddingLeft: String(7) + ea,
            paddingRight: String(7) + ea,
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: String(2.5) + ea,
            overflow: "hidden",
            borderTopLeftRadius: String(num3 % 2 !== 0 ? 8.6 / 2 : 0) + ea,
            borderBottomLeftRadius: String(8.6 / 2) + ea,
            borderBottomRightRadius: String(8.6 / 2) + ea,
            borderTopRightRadius: String(num3 % 2 === 0 ? 8.6 / 2 : 0) + ea,
            marginRight: num3 % 2 === 0 ? String(6 + (11 * Math.floor(num3 / 2) - 1)) + ea : String(0) + ea,
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
                top: String(1.2) + ea,
                left: num3 % 2 === 0 ? String(1.2) + ea : "",
                right: num3 % 2 === 0 ? "" : String(1.2) + ea,
                width: String(0.9) + ea,
                height: String(0.9) + ea,
                borderRadius: String(1) + ea,
                background: colorExtended.blueDim,
              }
            },
            {
              text: b,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(3.4) + ea,
                fontWeight: String(600),
                color: colorExtended.black,
                fontFamily: "pretendard",
                top: String(-0.2) + "px",
              }
            }
          ]
        });

        num3++;
      }

      // solve box
      solveBlock = createNode({
        mother: thisServiceBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(mobileMargin, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          paddingTop: String(11) + ea,
          paddingBottom: String(11) + ea,
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
      createNode({
        mother: solveBlock,
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          justifyContent: "start",
          alignItems: "start",
          width: withOut(0, ea),
          paddingLeft: String(0.8) + ea,
          marginBottom: String(6) + ea,
        },
        child: {
          text: c.eng,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(3.3) + ea,
            fontWeight: String(700),
            color: colorExtended.black,
            fontFamily: "mont",
          },
          previous: {
            style: {
              position: "absolute",
              left: String(-0.8) + ea,
              top: String(-0.5) + ea,
              width: String(4.8) + ea,
              height: String(4.8) + ea,
              borderRadius: String(3) + "px",
              background: colorExtended.white,
              opacity: String(0.7),
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
          alignItems: "start",
          width: withOut(0, ea),
          paddingLeft: String(0) + ea,
        },
        child: {
          text: c.solve.title,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(commentsTitleSize) + ea,
            fontWeight: String(600),
            fontFamily: "pretendard",
            color: colorExtended.darkBlack,
            lineHeight: String(1.44),
          }
        }
      });
      createNode({
        mother: solveBlock,
        text: c.solve.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(3.3) + ea,
          fontWeight: String(400),
          fontFamily: "pretendard",
          color: colorExtended.darkBlack,
          lineHeight: String(1.5),
          textAlign: "left",
          marginTop: String(3) + ea,
        }
      });
      solveListArea = createNode({
        mother: solveBlock,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "end",
          alignItems: "end",
          flexDirection: "column",
          paddingTop: String(10) + ea,
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
                borderRadius: String(8) + "px",
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
                  top: String(0) + ea,
                  fontSize: String(3.4) + ea,
                  fontWeight: String(700),
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
                borderRadius: String(8) + "px",
                background: colorExtended.darkBlack,
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                text: b,
                style: {
                  display: "inline-flex",
                  position: "relative",
                  top: String(-0.1) + ea,
                  fontSize: String(3.3) + ea,
                  fontWeight: String(600),
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
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          height: String(photoHeight) + ea,
          paddingTop: String(11) + ea,
          paddingBottom: String(serviceAreaBetween) + ea,
        },
      });
      createNode({
        mother: photoBlock,
        style: {
          display: "block",
          position: "relative",
          width: withOut(-1 * mobileMargin * 2, ea),
          height: withOut(0, ea),
          left: String(-1 * mobileMargin) + ea,
          overflow: "scroll",
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(0, ea),
              overflow: "scroll",
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
                height: withOut(0, ea),
                paddingLeft: String(mobileMargin) + ea,
                paddingRight: String(mobileMargin * 1.5) + ea,
                width: String(photoWidth) + ea,
              },
              children: [
                {
                  mode: "img",
                  attribute: { src: c.solve.images[0] },
                  style: {
                    display: "inline-block",
                    height: String(photoHeight) + ea,
                    borderRadius: String(photoRadius) + "px",
                    marginRight: String(photoBetween) + ea,
                  }
                },
                {
                  mode: "img",
                  attribute: { src: c.solve.images[1] },
                  style: {
                    display: "inline-block",
                    height: String(photoHeight) + ea,
                    borderRadius: String(photoRadius) + "px",
                  }
                },
              ]
            }
          }
        ]
      });

      num++;
    }

    // table

    contents = [ objectDeepCopy(furnishingObj), objectDeepCopy(stylingObj), objectDeepCopy(totalObj) ]

    tableBase = createNode({
      mother: secondBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(16) + ea,
        paddingBottom: String(22) + ea,
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

    createNode({
      mother: tableBase,
      style: {
        display: "inline-flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        background: colorExtended.black,
        width: String(70) + ea,
        height: String(11) + ea,
        borderRadius: String(11) + ea,
      },
      child: {
        text: tableTitle,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(4.4) + ea,
          fontWeight: String(700),
          fontFamily: "pretendard",
          color: colorExtended.white,
          top: String(-0.2) + ea,
        }
      }
    });
    createNode({
      mother: tableBase,
      text: tableDescription.join("\n"),
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(3.3) + ea,
        fontWeight: String(500),
        fontFamily: "pretendard",
        color: colorExtended.black,
        lineHeight: String(1.5),
        textAlign: "center",
        marginTop: String(3) + ea,
        marginBottom: String(9) + ea,
      }
    });

    tableMother = createNode({
      mother: tableBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
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
        width: withOut(0, ea),
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
          fontWeight: String(800),
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
        border: "1.5px solid " + colorExtended.black,
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
          fontWeight: String(800),
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
        border: "1.5px solid " + colorExtended.black,
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
          fontWeight: String(800),
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
        border: "1.5px solid " + colorExtended.black,
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
          fontWeight: String(800),
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
          width: withOut(0, ea),
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
            fontWeight: String(800),
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
          border: "1.5px dotted " + colorExtended.gray3,
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
            fontWeight: String(600),
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
            fontWeight: String(600),
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
            fontWeight: String(600),
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
      styleBlockTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.2 %%>;
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

      whiteStandardWidth = <%% 1400, 1050, 900, 720, 100 %%>;

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
          background: colorChip.black,
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
          borderTopLeftRadius: desktop ? String(5) + px : String(1.6) + ea,
          borderTopRightRadius: desktop ? String(5) + px : String(1.6) + ea,
          borderBottomLeftRadius: desktop ? String(5) + px : String(0) + ea,
          borderBottomRightRadius: desktop ? String(5) + px : String(0) + ea,
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
        },
        child: {
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(desktop ? innerMargin : 15) + ea,
            width: withOut(innerMargin * 2, ea),
            height: "auto",
            marginLeft: String(innerMargin) + ea,
            marginRight: String(innerMargin) + ea,
            overflow: "visible",
          }
        }
      }).firstChild;

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
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const portfolioBaseBlockClassName = "portfolioBaseBlockClassName";
  let baseBlock;
  let limitLength;
  let photoMargin;
  let paddingBottom;
  let basePaddingTop;

  limitLength = <%% 42, 42, 42, 42, 42 %%>;
  photoMargin = <%% 18, 16, 16, 16, 2.5 %%>;
  paddingBottom = <%% 120, 120, 120, 120, 22 %%>;

  basePaddingTop = 10;

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

    response = await ajaxJson({ mode: "portfolio", limit: 42 }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.designers = new SearchArray(response.designers);
    this.fullLoad = false;
    this.photoLoad = false;
    this.loadedContents = [];
    this.sort = "key9";
    this.search = "";

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
