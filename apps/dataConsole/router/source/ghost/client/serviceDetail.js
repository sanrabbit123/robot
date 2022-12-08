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
      "return ('홈리에종 서비스 소개 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 서비스 소개 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "serviceDetail",
  "hangul": "서비스 소개",
  "route": [
    "serviceDetail"
  ]
} %/%/g

const ServiceDetailJs = function () {
  this.mother = new GeneralJs();
}

ServiceDetailJs.binaryPath = "/middle/detail";

ServiceDetailJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, mode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let quoteWidth;
  let quoteHeight;
  let titleFontSize, titleFontWeight;
  let serviceChildren;
  let searchTags;
  let titleWording;
  let servicePaddingLeft;
  let serviceSize;
  let serviceBlockPaddingTop;
  let whiteBlockPaddingTop, whiteBlockPaddingBottom;
  let quotoTongHeight;
  let searchBarPaddingTop;
  let searchBarHeight;
  let searchBarWidth;
  let searchIconHeight;
  let searchIconRight, searchIconTop;
  let whiteBlockMarginBottom;
  let inputWithoutHeight;
  let serviceButtonClassName;
  let serviceBlock;
  let inputSize, inputWeight;
  let placeholder;
  let titleTop;
  let servicePaddingTop, servicePaddingBottom;
  let serviceMarginRight;
  let subTitleMarginTop, subTitleFontSize, subTitleWeight;
  let subTitleContents;
  let middleBox;
  let tagTextTop;
  let tagTongBottom;
  let boxTopVisual;
  let mobileBlockTop;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 90, 80, 74, 60, 14.5 %%>;

  quoteHeight = <%% 14, 14, 14, 14, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 35, 33, 32, 30, 6.4 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  servicePaddingBottom = <%% 10, 10, 10, 10, 10 %%>;
  servicePaddingLeft = <%% 13, 13, 13, 12, 2.2 %%>;
  serviceMarginRight = <%% 6, 6, 6, 6, 6 %%>;
  serviceSize = <%% 13, 13, 13, 12, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 11 %%>;

  searchBarPaddingTop = <%% 220, 220, 192, 164, 12.5 %%>;
  searchBarHeight = <%% 40, 40, 40, 36, 8 %%>;
  searchBarWidth = <%% 690, 516, 516, 420, 88 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 15, 15, 15, 14, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  subTitleMarginTop = <%% 2, 2, 1, 1, 0.2 %%>;
  subTitleFontSize = <%% 16, 16, 16, 15, 3.2 %%>;
  subTitleWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.3 %%>;
  tagTongBottom = <%% 3, 3, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  if (mode === "furnishing") {
    titleWording = "홈리에종 홈퍼니싱";
    subTitleContents = "우리집 무드 체인지, 홈퍼니싱";
  } else if (mode === "styling") {
    titleWording = "홈리에종 홈스타일링";
    subTitleContents = "부분 시공과 스타일링의 조합";
  } else if (mode === "total") {
    titleWording = "시그니처 스타일링";
    subTitleContents = "전체 시공부터 전체 스타일링까지";
  }

  mobileBlockTop = 4.5;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      marginBottom: String(whiteBlockMarginBottom) + ea,
      top: String(-1 * boxTopVisual) + ea,
      paddingTop: desktop ? "" : String(mobileBlockTop) + ea,
    }
  });

  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.white))) * quoteHeight;
  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      height: String(quotoTongHeight) + ea,
      opacity: String(0.6),
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.doubleQuote(colorChip.white),
        style: {
          display: "inline-block",
          height: String(quoteHeight) + ea,
          width: String(quoteWidth) + ea,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        text: titleWording,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(titleTop) + ea,
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: String(subTitleMarginTop) + ea,
    },
    children: [
      {
        text: subTitleContents,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(0) + ea,
          fontSize: String(subTitleFontSize) + ea,
          fontWeight: String(subTitleWeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

ServiceDetailJs.prototype.insertStartBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { ea, media, baseTong, mode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let blockHeight;
  let bottomMargin;
  let margin;
  let marginTop;
  let leftBox;
  let rightBox;
  let contents;
  let titleSize, titleWeight, titleBoldWeight;
  let titleLineHeight;
  let titleLineTop, titleLineWidth, titleLineLength, titleLineMarginRight;
  let subBlockMarginTop;
  let subSize, subWeight, subLineHeight;
  let rightImagePosition;

  blockHeight = <%% 294, 294, 273, 226, 129.5 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 50, 40, 32, 52 %%>;
  marginTop = <%% 52, 50, 40, 32, 52 %%>;

  titleSize = <%% 22, 22, 22, 22, 22 %%>;
  titleWeight = <%% 400, 400, 400, 400, 400 %%>;
  titleBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.55, 1.55, 1.55, 1.55, 1.55 %%>;

  titleLineTop = <%% 9, 9, 9, 9, 9 %%>;
  titleLineWidth = <%% 4, 4, 4, 4, 4 %%>;
  titleLineLength = <%% 54, 54, 54, 54, 54 %%>;
  titleLineMarginRight = <%% 20, 20, 20, 20, 20 %%>;

  subBlockMarginTop = <%% 70, 70, 70, 70, 70 %%>;
  subSize = <%% 15, 15, 15, 15, 15 %%>;
  subWeight = <%% 400, 400, 400, 400, 400 %%>;
  subLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  if (mode === "furnishing") {
    rightImagePosition = <%% 80, 80, 80, 80, 80 %%>;
    contents = {
      left: {
        title: [
          "<b%인테리어 시공 없이 가구, 패브릭, 소품만으로%b>",
          "우리집 무드를 변화시켜주는 스타일링",
        ],
        sub: [
          "홈퍼니싱은 시공 없이 스타일링만으로 완성하는 인테리어 서비스입니다.",
          "내 집의 컨디션에 적합한 스타일링 서비스를 경험해보세요.",
        ]
      },
      right: {
        image: ServiceDetailJs.binaryPath + "/startf0.jpg",
      }
    }
  } else if (mode === "styling") {
    rightImagePosition = <%% 80, 80, 80, 80, 80 %%>;
    contents = {
      left: {
        title: [
          "<b%우리집과 예산에 맞는 범위의 시공을 진행하여%b>",
          "원하던 컨셉에 맞게 변화시켜주는 스타일링",
        ],
        sub: [
          "홈스타일링을 기반으로 컨셉과 니즈에 맞게, 효율적인 부분 시공으로",
          "공간을 효과적으로 변화시키는 홈스타일링을 경험해보세요.",
        ]
      },
      right: {
        image: ServiceDetailJs.binaryPath + "/starts0.jpg",
      }
    }
  } else if (mode === "total") {
    rightImagePosition = <%% 57, 57, 57, 57, 57 %%>;
    contents = {
      left: {
        title: [
          "<b%원하는 스타일과 라이프 패턴에 맞게 기획된%b>",
          "디자인의 구조로 변경하는 스타일링 서비스",
        ],
        sub: [
          "시공부터 스타일링까지 완성하는 토탈 스타일링을 소개해드립니다.",
          "기획부터 시공, 스타일링까지 풀 프로세스를 경험할 수 있어요.",
        ]
      },
      right: {
        image: ServiceDetailJs.binaryPath + "/startt0.jpg",
      }
    }
  }

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(5) + "px",
      width: String(100) + '%',
      height: String(blockHeight) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      overflow: "hidden",
    }
  });

  leftBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: withOut(50, margin * 2, ea),
      height: withOut(marginTop + margin, ea),
      marginTop: desktop ? String(marginTop) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          textAlign: "left",
        },
        children: [
          {
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              top: String(titleLineTop) + ea,
              width: String(titleLineWidth) + ea,
              height: String(titleLineLength) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray3,
              marginRight: String(titleLineMarginRight) + ea,
            }
          },
          {
            text: contents.left.title.join("\n"),
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(titleWeight),
              color: colorChip.black,
              lineHeight: String(titleLineHeight),
              textAlign: "left",
            },
            bold: {
              fontSize: String(titleSize) + ea,
              fontWeight: String(titleBoldWeight),
              color: colorChip.black,
            }
          }
        ]
      },
      {
        text: contents.left.sub.join("\n"),
        style: {
          display: "block",
          position: "relative",
          marginTop: String(subBlockMarginTop) + ea,
          fontSize: String(subSize) + ea,
          fontWeight: String(subWeight),
          color: colorChip.black,
          lineHeight: String(subLineHeight),
          textAlign: "right",
        },
      },
    ]
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? String(50) + '%' : String(100) + '%',
      height: String(100) + '%',
      overflow: "hidden",
      backgroundImage: "url('" + contents.right.image + "')",
      backgroundPosition: "50% " + String(rightImagePosition) + "%",
      backgroundSize: "100% auto",
    },
  });

}

ServiceDetailJs.prototype.insertThreeBox = function () {
  const instance = this;
  const { ea, media, mode } = this;
  const baseTong = this.baseTong;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  let contents;
  let middleTongPaddinngTop;
  let middleTongPaddingBottom;
  let middleTong;
  let middleTitleSize;
  let middleTitleWeight;
  let middleTitlePadding;
  let middleTitleLineTop;
  let middleTitleTextTop;
  let middleAreaPaddingTop;
  let middleInfoSize;
  let middleTitleMarginBottom;
  let threeBetween;
  let threeHeight;
  let threeBlock;
  let threeBlockMarginTop;
  let threeVisualPaddingBottom;
  let threeWidth0, threeWidth1;
  let threeSize, threeWeight, threeSmallSize;
  let blackCircleWidth;
  let arrowWidth, arrowHeight;
  let numberTop, numberLeft, numberSize, numberWeight;
  let mainBetween, subBetween, subTop;
  let total;

  total = (mode === "total");

  middleTongPaddinngTop = <%% 108, 84, 72, 52, 10 %%>;
  middleTongPaddingBottom = <%% 150, 130, 100, 70, 17 %%>;
  middleTitleMarginBottom = <%% 10, 10, 10, 10, 10 %%>;

  middleTitleLineTop = <%% 68, 68, 68, 68, 68 %%>;

  middleTitleSize = <%% 23, 23, 21, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 2 %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;
  middleInfoSize = <%% 14, 14, 14, 13, 3 %%>;

  threeBetween = <%% 10, 10, 10, 10, 1 %%>;
  threeHeight = <%% 170, 170, 170, 170, 170 %%>;
  threeVisualPaddingBottom = <%% 2, 2, 2, 2, 2 %%>;
  threeBlockMarginTop = <%% 48, 48, 48, 48, 48 %%>;

  if (total) {
    threeWidth0 = <%% 600, 600, 600, 600, 600 %%>;
    threeWidth1 = <%% 390, 390, 390, 390, 390 %%>;
  } else {
    threeWidth0 = <%% 525, 525, 525, 525, 525 %%>;
    threeWidth1 = <%% 330, 330, 330, 330, 330 %%>;
  }

  threeSize = <%% 20, 20, 20, 20, 20 %%>;
  threeWeight = <%% 800, 800, 800, 800, 800 %%>;
  threeSmallSize = <%% 13, 13, 13, 13, 13 %%>;

  blackCircleWidth = <%% 40, 40, 40, 40, 40 %%>;

  arrowWidth = <%% 22, 22, 22, 22, 22 %%>;
  arrowHeight = <%% 8, 8, 8, 8, 8 %%>;

  numberTop = <%% 14, 14, 14, 14, 14 %%>;
  numberLeft = <%% 22, 22, 22, 22, 22 %%>;
  numberSize = <%% 13, 13, 13, 13, 13 %%>;
  numberWeight = <%% 500, 500, 500, 500, 500 %%>;

  mainBetween = <%% 4, 4, 4, 4, 4 %%>;
  subBetween = <%% 6, 6, 6, 6, 6 %%>;
  subTop = <%% 3, 3, 3, 3, 3 %%>;

  if (mode === "furnishing") {
    contents = {
      title: "디자이너가 이끄는 무드 체인지 효과",
      description: [
        "디자이너의 기획이 담긴 디자인 컨셉에 맞게,",
        "제안된 스타일링으로 조화로운 완성을 이끌어 냅니다.",
      ],
      three: {
        first: {
          up: "빈 집을 취향대로 꾸미고 싶다면",
          upSub: "(새입주)",
          down: "가구 일부를 바꿔 분위기 변화를 주고 싶다면",
          downSub: "(거주중)",
        },
        second: {
          up: "디자이너의 기획이 담긴 디자인 컨셉",
          down: "( 가구 + 디자인 조명 + 소품 + 패브릭 + 액자 )",
        },
        third: "맞춤형 인테리어 완성",
      },
    }
  } else if (mode === "styling") {
    contents = {
      title: "디자이너가 이끄는 홈스타일링",
      description: [
        "예산에 맞는 적합한 시공과 스타일링의",
        "밸런스를 조율하여 인테리어의 완성도를 높입니다.",
      ],
      three: {
        first: {
          up: "전체를 변경하기엔 부담스럽고",
          upSub: "(새입주)",
          down: "간단한 마감재 변경이 필요한 집",
          downSub: "(거주중)",
        },
        second: {
          up: "디자이너의 밸런스 있는 예산 기획",
          down: "( 시공과 스타일링의 밸런스 )",
        },
        third: "컨셉, 예산에 맞게 완성",
      },
    }
  } else if (mode === "total") {
    contents = {
      title: "라이프 스타일에 맞게 기획된 인테리어",
      description: [
        "라이프 스타일이 녹아 있는 집을 기획하고 제안합니다.",
        "내게 맞춘 집을 기획해보세요. 홈리에종 시공팀이 함께 합니다.",
      ],
      three: {
        first: {
          up: "내게 맞춘 디자인이 필요한 공간",
          upSub: "(새입주)",
          down: "( 전체적인 변경이 필요한 공간 )",
          downSub: "(거주중)",
        },
        second: {
          up: "디자이너의 기획이 담긴 디자인 컨셉",
          down: "( 시공과 스타일링의 구체적인 계획 )",
        },
        third: "라이프 스타일에 맞게 완성",
      },
    }
  }

  middleTong = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      width: withOut(0 * 2, ea),
      paddingTop: String(middleTongPaddinngTop) + ea,
      paddingBottom: String(middleTitleMarginBottom) + ea,
    }
  });

  createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      width: String(100) + '%',
      textAlign: "center",
    },
    children: [
      {
        style: {
          display: "block",
          position: "absolute",
          width: String(100) + '%',
          height: String(middleTitleLineTop) + ea,
          top: String(0),
          left: String(0),
          borderBottom: "1px solid " + colorChip.gray4,
        }
      },
      {
        text: contents.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          top: String(middleTitleTextTop) + ea,
          background: colorChip.gray1,
        }
      },
      {
        text: contents.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          paddingLeft: String(middleTitlePadding * 1.5) + ea,
          paddingRight: String(middleTitlePadding * 1.5) + ea,
          background: colorChip.gray1,
        }
      }
    ]
  });

  threeBlock = createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      width: String(100) + '%',
      marginTop: String(threeBlockMarginTop) + ea,
    },
    children: [
      {
        style: {
          display: "inline-flex",
          position: "relative",
          flexDirection: "column",
          width: String(total ? threeWidth1 : threeWidth0) + ea,
          height: String(threeHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 5px 13px -10px " + colorChip.gray5,
          marginRight: String(threeBetween) + ea,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: String(threeVisualPaddingBottom) + ea,
        },
        children: [
          {
            text: String(1),
            style: {
              position: "absolute",
              top: String(numberTop) + ea,
              left: String(numberLeft) + ea,
              fontSize: String(numberSize) + ea,
              fontWeight: String(numberWeight),
              color: colorChip.green,
              fontStyle: "italic",
              fontFamily: "graphik",
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            },
            children: [
              {
                text: contents.three.first.up,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(threeSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.black,
                }
              },
              {
                text: contents.three.first.upSub,
                style: {
                  display: mode === "furnishing" ? "inline-block" : "none",
                  position: "relative",
                  fontSize: String(threeSmallSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.deactive,
                  marginLeft: String(subBetween) + ea,
                  top: String(subTop) + ea,
                }
              },
            ]
          },
          {
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              marginTop: String(mainBetween) + ea,
            },
            children: [
              {
                text: contents.three.first.down,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(total ? threeSmallSize : threeSize) + ea,
                  fontWeight: String(threeWeight),
                  color: total ? colorChip.deactive : colorChip.black,
                }
              },
              {
                text: contents.three.first.downSub,
                style: {
                  display: mode === "furnishing" ? "inline-block" : "none",
                  position: "relative",
                  fontSize: String(threeSmallSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.deactive,
                  marginLeft: String(subBetween) + ea,
                  top: String(subTop) + ea,
                }
              },
            ]
          },
        ]
      },
      {
        style: {
          display: "inline-flex",
          position: "relative",
          flexDirection: "column",
          width: String(threeWidth0) + ea,
          height: String(threeHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 5px 13px -10px " + colorChip.gray5,
          marginRight: String(threeBetween) + ea,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: String(threeVisualPaddingBottom) + ea,
        },
        children: [
          {
            text: String(2),
            style: {
              position: "absolute",
              top: String(numberTop) + ea,
              left: String(numberLeft) + ea,
              fontSize: String(numberSize) + ea,
              fontWeight: String(numberWeight),
              color: colorChip.green,
              fontStyle: "italic",
              fontFamily: "graphik",
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            },
            children: [
              {
                text: contents.three.second.up,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(threeSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.black,
                }
              },
            ]
          },
          {
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              marginTop: String(mainBetween) + ea,
            },
            children: [
              {
                text: contents.three.second.down,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(threeSmallSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.deactive,
                }
              },
            ]
          },
          {
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              width: String(blackCircleWidth) + ea,
              height: String(blackCircleWidth) + ea,
              borderRadius: String(blackCircleWidth) + ea,
              background: colorChip.black,
              left: String((-1 * (threeBetween / 2)) + (-1 * (blackCircleWidth / 2))) + ea,
              top: withOut(50, blackCircleWidth / 2, ea),
            },
            child: {
              mode: "svg",
              source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.white),
              style: {
                display: "inline-block",
                position: "relative",
                width: String(arrowWidth) + ea,
              }
            }
          }
        ]
      },
      {
        style: {
          display: "inline-flex",
          position: "relative",
          flexDirection: "column",
          width: String(threeWidth1) + ea,
          height: String(threeHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 5px 13px -10px " + colorChip.gray5,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: String(threeVisualPaddingBottom) + ea,
        },
        children: [
          {
            text: String(3),
            style: {
              position: "absolute",
              top: String(numberTop) + ea,
              left: String(numberLeft) + ea,
              fontSize: String(numberSize) + ea,
              fontWeight: String(numberWeight),
              color: colorChip.green,
              fontStyle: "italic",
              fontFamily: "graphik",
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            },
            children: [
              {
                text: contents.three.third,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(threeSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.green,
                }
              },
            ]
          },
          {
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              width: String(blackCircleWidth) + ea,
              height: String(blackCircleWidth) + ea,
              borderRadius: String(blackCircleWidth) + ea,
              background: colorChip.black,
              left: String((-1 * (threeBetween / 2)) + (-1 * (blackCircleWidth / 2))) + ea,
              top: withOut(50, blackCircleWidth / 2, ea),
            },
            child: {
              mode: "svg",
              source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.white),
              style: {
                display: "inline-block",
                position: "relative",
                width: String(arrowWidth) + ea,
              }
            }
          }
        ]
      },
    ]
  })

}

ServiceDetailJs.prototype.insertSlideBox = function () {
  const instance = this;
  const { ea, media } = this;
  const baseTong = this.baseTong;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  let whiteBlock;
  let bottomMargin;
  let slideTong;
  let slideTongHeight;
  let blockWidth;
  let blockBetween;
  let walk;
  let nextWalk;
  let length;
  let images;
  let pastWalk;
  let margin;
  let interval;
  let contents;
  let descriptionTong;
  let slideLeft;
  let slideWidth;
  let whitePaddingTop;
  let arrowWidth;
  let arrowHeight;
  let arrowMargin;
  let arrowTop;
  let descriptionSize, descriptionWeight, descriptionLineHeight, descriptionBoldWeight;
  let circleWidth, circleBetween;
  let circleBoxMarginTop, circleBoxPaddingLeft;
  let feeTong;
  let feeTongMarginTop;
  let finalMarginBottom;
  let feeTitleTongHeight;
  let feeTitleSize, feeTitleWeight, feeTitleTextTop;
  let feeDescriptionTongHeight;
  let feeDescriptionLineTop;
  let feeDescriptionSize;
  let feeDescriptionWeight, feeDescriptionWeightBold;
  let feeDescriptionPadding;
  let barWidth0, barBetween;
  let barHeight, barMarginBottom;
  let feeBarTongHeight;

  bottomMargin = <%% 180, 180, 180, 180, 180 %%>;
  slideTongHeight = <%% 340, 340, 340, 340, 340 %%>;
  blockWidth = <%% 240, 240, 240, 240, 240 %%>;
  blockBetween = <%% 12, 12, 12, 12, 12 %%>;

  margin = <%% 52, 50, 40, 32, 52 %%>;
  finalMarginBottom = <%% 72, 72, 72, 72, 72 %%>;

  whitePaddingTop = <%% 68, 68, 68, 68, 68 %%>;

  slideLeft = <%% -680, -680, -680, -680, -680 %%>;
  slideWidth = <%% 8000, 8000, 8000, 8000, 8000 %%>;

  arrowWidth = <%% 762, 762, 762, 762, 762 %%>;
  arrowHeight = <%% 10, 10, 10, 10, 10 %%>;

  arrowMargin = <%% 18, 18, 18, 18, 18 %%>;
  arrowTop = <%% 6, 6, 6, 6, 6 %%>;

  descriptionSize = <%% 15, 15, 15, 15, 15 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

  circleWidth = <%% 6, 6, 6, 6, 6 %%>;
  circleBetween = <%% 4, 4, 4, 4, 4 %%>;

  circleBoxMarginTop = <%% 16, 16, 16, 16, 16 %%>;
  circleBoxPaddingLeft = <%% 1, 1, 1, 1, 1 %%>;

  feeTongMarginTop = <%% 100, 100, 100, 100, 100 %%>;
  feeTitleTongHeight = <%% 50, 50, 50, 50, 50 %%>;

  feeTitleSize = <%% 20, 20, 20, 20, 20 %%>;
  feeTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  feeTitleTextTop = <%% -1, -1, -1, -1, -1 %%>;

  feeDescriptionTongHeight = <%% 60, 60, 60, 60, 60 %%>;
  feeDescriptionLineTop = <%% 9, 9, 9, 9, 9 %%>;
  feeDescriptionSize = <%% 15, 15, 15, 15, 15 %%>;
  feeDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  feeDescriptionWeightBold = <%% 600, 600, 600, 600, 600 %%>;
  feeDescriptionPadding = <%% 20, 20, 20, 20, 20 %%>;

  barWidth0 = <%% 360, 360, 360, 360, 360 %%>;
  barBetween = <%% 5, 5, 5, 5, 5 %%>;

  barHeight = <%% 20, 20, 20, 20, 20 %%>;
  barMarginBottom = <%% 8, 8, 8, 8, 8 %%>;

  feeBarTongHeight = <%% 60, 60, 60, 60, 60 %%>;

  contents = {
    images: [
      ServiceDetailJs.binaryPath + "/slide0.jpg",
      ServiceDetailJs.binaryPath + "/slide1.jpg",
      ServiceDetailJs.binaryPath + "/slide2.jpg",
      ServiceDetailJs.binaryPath + "/slide3.jpg",
      ServiceDetailJs.binaryPath + "/slide4.jpg",
      ServiceDetailJs.binaryPath + "/slide5.jpg",
      ServiceDetailJs.binaryPath + "/slide6.jpg",
      ServiceDetailJs.binaryPath + "/slide7.jpg",
      ServiceDetailJs.binaryPath + "/slide8.jpg",
      ServiceDetailJs.binaryPath + "/slide9.jpg",
      ServiceDetailJs.binaryPath + "/slide10.jpg",
      ServiceDetailJs.binaryPath + "/slide11.jpg",
      ServiceDetailJs.binaryPath + "/slide12.jpg",
      ServiceDetailJs.binaryPath + "/slide13.jpg",
    ],
    description: [
      "가구와 패브릭, 소품 만으로도 확실하게 분위기가 바뀌는 무드체인지를 되는 경험해보세요!",
      "<b%내 집의 컨디션에 맞는 디자인 컨셉을 디자이너가 대신 고민해줄거예요.%b>",
    ],
  };
  length = contents.images.length;
  walk = blockWidth + blockBetween;
  interval = 3000;

  // base

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(5) + "px",
      width: String(100) + '%',
      paddingTop: String(whitePaddingTop) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 15px -10px " + colorChip.gray5,
      overflow: "hidden",
    }
  });

  // slide

  slideTong = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      height: String(slideTongHeight) + ea,
      overflow: "hidden",
    },
    child: {
      style: {
        position: "absolute",
        top: String(0),
        left: String(slideLeft) + ea,
        width: String(slideWidth) + ea,
        height: withOut(0, ea),
      }
    }
  }).firstChild;
  for (let i = 0; i < length; i++) {
    createNode({
      mother: slideTong,
      attribute: {
        walk: String(i * walk),
      },
      style: {
        display: "inline-block",
        position: "absolute",
        top: String(0),
        left: String(0),
        width: String(blockWidth) + ea,
        height: String(slideTongHeight) + ea,
        borderRadius: String(5) + "px",
        backgroundImage: "url('" + contents.images[i] + "')",
        backgroundSize: "auto 100%",
        backgroundPosition: "50% 50%",
        transform: "translateX(" + String(i * walk) + ea + ")",
        transition: "all 0.5s ease",
        opacity: String((i >= length - 2 || i === 0) ? 0 : 1),
      }
    });
  }

  setInterval(() => {
    const targets = [ ...slideTong.children ];
    for (let target of targets) {
      pastWalk = Number(target.getAttribute("walk"));
      if (pastWalk >= walk * (length - 2) || pastWalk === 0) {
        target.style.opacity = String(0);
      } else {
        target.style.opacity = String(1);
      }
    }
    for (let target of targets) {
      pastWalk = Number(target.getAttribute("walk"));
      if (pastWalk === walk * (length - 1)) {
        nextWalk = 0;
      } else {
        nextWalk = pastWalk + walk;
      }
      target.setAttribute("walk", String(nextWalk));
      target.style.transform = "translateX(" + String(nextWalk) + ea + ")";
    }
    for (let target of targets) {
      nextWalk = Number(target.getAttribute("walk"));
      if (nextWalk >= walk * (length - 2) || nextWalk === 0) {
        target.style.opacity = String(0);
      } else {
        target.style.opacity = String(1);
      }
    }
  }, interval);

  // slide description

  descriptionTong = createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      width: withOut(margin * 2, ea),
      overflow: "hidden",
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingTop: String(margin) + ea,
      alignItems: "start",
    },
  });
  createNode({
    mother: descriptionTong,
    mode: "svg",
    source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.gray4),
    style: {
      width: String(arrowWidth) + ea,
      display: "inline-block",
      position: "relative",
      marginRight: String(arrowMargin) + ea,
      top: String(arrowTop) + ea,
    }
  });
  createNode({
    mother: descriptionTong,
    style: {
      display: "inline-flex",
      position: "relative",
      flexDirection: "column",
      width: withOut(arrowWidth + arrowMargin, ea),
    },
    children: [
      {
        text: contents.description.join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
        },
        bold: {
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionBoldWeight),
          color: colorChip.black,
        }
      },
      {
        style: {
          display: "flex",
          flexDirection: "row",
          width: withOut(0, ea),
          position: "relative",
          marginTop: String(circleBoxMarginTop) + ea,
          paddingLeft: String(circleBoxPaddingLeft) + ea,
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              background: colorChip.deactive,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              marginRight: String(circleBetween) + ea,
              marginLeft: String(circleBetween) + ea,
              background: colorChip.deactive,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              background: colorChip.deactive,
            }
          },
        ]
      }
    ]
  });

  // fee
  feeTong = createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      marginTop: String(feeTongMarginTop) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingBottom: String(finalMarginBottom) + ea,
      width: withOut(margin * 2, ea),
    }
  });
  createNode({
    mother: feeTong,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      height: String(feeTitleTongHeight) + ea,
      width: withOut(0, ea),
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    child: {
      text: "비용의 구성",
      style: {
        position: "relative",
        top: String(feeTitleTextTop) + ea,
        fontSize: String(feeTitleSize) + ea,
        fontWeight: String(feeTitleWeight),
        color: colorChip.black,
      }
    }
  });
  createNode({
    mother: feeTong,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: withOut(0, ea),
      height: String(feeDescriptionTongHeight) + ea,
      alignItems: "center",
      justifyContent: "start",
    },
    children: [
      {
        style: {
          position: "absolute",
          bottom: String(0),
          left: String(0),
          width: withOut(0, ea),
          height: String(feeDescriptionTongHeight - feeDescriptionLineTop) + ea,
          border: "1px solid " + colorChip.gray3,
          borderTopLeftRadius: String(5) + "px",
          borderTopRightRadius: String(5) + "px",
          borderBottom: String(0),
          boxSizing: "border-box",
        }
      },
      {
        text: [
          "홈퍼니싱 서비스는 디자인비와 제품 구매비로 구성됩니다."
        ].join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(feeDescriptionSize) + ea,
          fontWeight: String(feeDescriptionWeight),
          color: colorChip.black,
          background: colorChip.white,
          paddingLeft: String(feeDescriptionPadding) + ea,
          paddingRight: String(feeDescriptionPadding) + ea,
        }
      }
    ]
  });
  createNode({
    mother: feeTong,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      width: withOut(0, ea),
      height: String(feeBarTongHeight) + ea,
      alignItems: "end",
      justifyContent: "start",
    },
    children: [
      {
        style: {
          display: "inline-flex",
          flexDirection: "column",
          position: "relative",
          width: String(barWidth0) + ea,
          marginRight: String(barBetween) + ea,
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              height: String(barHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.green,
              marginBottom: String(barMarginBottom) + ea,
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "column",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            child: {
              text: "디자인 비용",
              style: {
                position: "relative",
                fontSize: String(feeDescriptionSize) + ea,
                fontWeight: String(feeDescriptionWeightBold),
                color: colorChip.green,
              }
            }
          }
        ]
      },
      {
        style: {
          display: "inline-flex",
          flexDirection: "column",
          position: "relative",
          width: withOut(barWidth0 + barBetween, ea),
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              height: String(barHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray4,
              marginBottom: String(barMarginBottom) + ea,
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "column",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            child: {
              text: "가구 및 제안 제품 구매 비용",
              style: {
                position: "relative",
                fontSize: String(feeDescriptionSize) + ea,
                fontWeight: String(feeDescriptionWeightBold),
                color: colorChip.black,
              }
            }
          }
        ]
      },
    ]
  });

}

ServiceDetailJs.prototype.insertDiagramBox = function () {
  const instance = this;
  const { ea, media, mode } = this;
  const baseTong = this.baseTong;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  let whiteBlock;
  let bottomMargin;
  let slideTong;
  let slideTongHeight;
  let blockWidth;
  let blockBetween;
  let walk;
  let nextWalk;
  let length;
  let images;
  let pastWalk;
  let margin;
  let interval;
  let contents;
  let descriptionTong;
  let slideLeft;
  let slideWidth;
  let whitePaddingTop;
  let arrowWidth;
  let arrowHeight;
  let arrowMargin;
  let arrowTop;
  let descriptionSize, descriptionWeight, descriptionLineHeight, descriptionBoldWeight;
  let circleWidth, circleBetween;
  let circleBoxMarginTop, circleBoxPaddingLeft;
  let feeTong;
  let feeTongMarginTop;
  let finalMarginBottom;
  let feeTitleTongHeight;
  let feeTitleSize, feeTitleWeight, feeTitleTextTop;
  let feeDescriptionTongHeight;
  let feeDescriptionLineTop;
  let feeDescriptionSize;
  let feeDescriptionWeight, feeDescriptionWeightBold;
  let feeDescriptionPadding;
  let barWidth0, barBetween, barWidth1;
  let barHeight, barMarginBottom;
  let feeBarTongHeight;
  let diagramTong;
  let diagramImageHeight;
  let diagramEnglishSize, diagramEnglishWeight;
  let diagramTitleSize, diagramTitleWeight;
  let diagramDescriptionSize, diagramDescriptionWeight;
  let diagramTitleLineHeight, diagramDescriptionLineHeight;
  let diagramTitleMarginTop, diagramTitleMarginBottom;
  let diagramFirstTop, diagramFirstLeft;
  let diagramSecondTop, diagramSecondLeft;
  let diagramThirdTop, diagramThirdLeft;
  let styling;

  styling = (mode === "styling");

  bottomMargin = <%% 180, 180, 180, 180, 180 %%>;
  slideTongHeight = <%% 340, 340, 340, 340, 340 %%>;
  blockWidth = <%% 240, 240, 240, 240, 240 %%>;
  blockBetween = <%% 12, 12, 12, 12, 12 %%>;

  margin = <%% 52, 50, 40, 32, 52 %%>;
  finalMarginBottom = <%% 72, 72, 72, 72, 72 %%>;

  whitePaddingTop = <%% 68, 68, 68, 68, 68 %%>;

  slideLeft = <%% -680, -680, -680, -680, -680 %%>;
  slideWidth = <%% 8000, 8000, 8000, 8000, 8000 %%>;

  arrowWidth = <%% 762, 762, 762, 762, 762 %%>;
  arrowHeight = <%% 10, 10, 10, 10, 10 %%>;

  arrowMargin = <%% 18, 18, 18, 18, 18 %%>;
  arrowTop = <%% 6, 6, 6, 6, 6 %%>;

  descriptionSize = <%% 15, 15, 15, 15, 15 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

  circleWidth = <%% 6, 6, 6, 6, 6 %%>;
  circleBetween = <%% 4, 4, 4, 4, 4 %%>;

  circleBoxMarginTop = <%% 16, 16, 16, 16, 16 %%>;
  circleBoxPaddingLeft = <%% 1, 1, 1, 1, 1 %%>;

  feeTongMarginTop = <%% 100, 100, 100, 100, 100 %%>;
  feeTitleTongHeight = <%% 50, 50, 50, 50, 50 %%>;

  feeTitleSize = <%% 20, 20, 20, 20, 20 %%>;
  feeTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  feeTitleTextTop = <%% -1, -1, -1, -1, -1 %%>;

  feeDescriptionTongHeight = <%% 60, 60, 60, 60, 60 %%>;
  feeDescriptionLineTop = <%% 9, 9, 9, 9, 9 %%>;
  feeDescriptionSize = <%% 15, 15, 15, 15, 15 %%>;
  feeDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  feeDescriptionWeightBold = <%% 600, 600, 600, 600, 600 %%>;
  feeDescriptionPadding = <%% 20, 20, 20, 20, 20 %%>;

  if (styling) {
    barWidth0 = <%% 200, 200, 200, 200, 200 %%>;
    barWidth1 = <%% 400, 400, 400, 400, 400 %%>;
  } else {
    barWidth0 = <%% 160, 160, 160, 160, 160 %%>;
    barWidth1 = <%% 640, 640, 640, 640, 640 %%>;
  }
  barBetween = <%% 5, 5, 5, 5, 5 %%>;

  barHeight = <%% 20, 20, 20, 20, 20 %%>;
  barMarginBottom = <%% 8, 8, 8, 8, 8 %%>;

  feeBarTongHeight = <%% 60, 60, 60, 60, 60 %%>;

  if (styling) {
    diagramImageHeight = <%% 680, 680, 680, 680, 680 %%>;
  } else {
    diagramImageHeight = <%% 520, 520, 520, 520, 520 %%>;
  }

  diagramEnglishSize = <%% 27, 27, 27, 27, 27 %%>;
  diagramEnglishWeight = <%% 500, 500, 500, 500, 500 %%>;
  diagramTitleSize = <%% 17, 17, 17, 17, 17 %%>;
  diagramTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  diagramDescriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  diagramDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  diagramTitleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  diagramDescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  diagramTitleMarginTop = <%% 8, 8, 8, 8, 8 %%>;
  diagramTitleMarginBottom = <%% 4, 4, 4, 4, 4 %%>;

  diagramFirstTop = <%% 360, 360, 360, 360, 360 %%>;
  diagramFirstLeft = <%% 98, 98, 98, 98, 98 %%>;
  if (styling) {
    diagramSecondTop = <%% 110, 110, 110, 110, 110 %%>;
    diagramSecondLeft = <%% 180, 180, 180, 180, 180 %%>;
    diagramThirdTop = <%% 532, 532, 532, 532, 532 %%>;
    diagramThirdLeft = <%% 100, 100, 100, 100, 100 %%>;
  } else {
    diagramSecondTop = <%% 229, 229, 229, 229, 229 %%>;
    diagramSecondLeft = <%% 110, 110, 110, 110, 110 %%>;
    diagramThirdTop = <%% 229, 229, 229, 229, 229 %%>;
    diagramThirdLeft = <%% 100, 100, 100, 100, 100 %%>;
  }

  contents = {
    description: [
      "가구와 패브릭, 소품 만으로도 확실하게 분위기가 바뀌는 무드체인지를 되는 경험해보세요!",
      "<b%내 집의 컨디션에 맞는 디자인 컨셉을 디자이너가 대신 고민해줄거예요.%b>",
    ],
    diagram: {
      image: ServiceDetailJs.binaryPath + (styling ? "/styling_diagram.png" : "/total_diagram.png"),
      first: {
        english: "Design",
        title: "디자인 기획",
        description: [
          "디자인을 먼저 진행하여",
          "시공 범위를 조절",
        ]
      },
      second: {
        english: styling ? "Construction" : "Design",
        title: styling ? "톤보정 시공" : "공간 기획",
        description: [
          styling ? "시공 범위와 자재, 디자인" : "라이프 스타일을 기반",
          styling ? "시공사에 따라 변동" : "공간을 먼저 기획",
        ]
      },
      third: {
        english: "Styling",
        title: "스타일링",
        description: [
          styling ? "스타일링 중심의 인테리어로" : "스타일링까지 진행하는",
          styling ? "효과와 완성도를 높임" : "완벽한 마무리",
        ]
      },
    }
  };

  // base
  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(5) + "px",
      width: String(100) + '%',
      paddingTop: String(whitePaddingTop) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 15px -10px " + colorChip.gray5,
      overflow: "hidden",
    }
  });

  // diagramTong
  diagramTong = createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    },
    child: {
      mode: "img",
      attribute: {
        src: contents.diagram.image,
      },
      style: {
        display: "inline-block",
        position: "relative",
        height: String(diagramImageHeight) + ea,
      }
    }
  });
  if (styling) {
    createNode({
      mother: diagramTong,
      style: {
        position: "absolute",
        top: String(diagramFirstTop) + ea,
        left: String(diagramFirstLeft) + ea,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      },
      children: [
        {
          text: contents.diagram.first.english,
          style: {
            fontSize: String(diagramEnglishSize) + ea,
            fontWeight: String(diagramEnglishWeight),
            fontFamily: "graphik",
            fontStyle: "italic",
            color: colorChip.green,
          }
        },
        {
          text: contents.diagram.first.title,
          style: {
            fontSize: String(diagramTitleSize) + ea,
            fontWeight: String(diagramTitleWeight),
            color: colorChip.black,
            marginTop: String(diagramTitleMarginTop) + ea,
            marginBottom: String(diagramTitleMarginBottom) + ea,
            lineHeight: String(diagramTitleLineHeight),
          }
        },
        {
          text: contents.diagram.first.description.join("\n"),
          style: {
            fontSize: String(diagramDescriptionSize) + ea,
            fontWeight: String(diagramDescriptionWeight),
            color: colorChip.black,
            lineHeight: String(diagramDescriptionLineHeight),
          }
        }
      ]
    });
  }
  createNode({
    mother: diagramTong,
    style: {
      position: "absolute",
      top: String(diagramSecondTop) + ea,
      left: styling ? "" : String(diagramSecondLeft) + ea,
      right: styling ? String(diagramSecondLeft) + ea : "",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: styling ? "start" : "end",
      textAlign: styling ? "left" : "right",
    },
    children: [
      {
        text: contents.diagram.second.english,
        style: {
          fontSize: String(diagramEnglishSize) + ea,
          fontWeight: String(diagramEnglishWeight),
          fontFamily: "graphik",
          fontStyle: "italic",
          color: colorChip.gray4,
        }
      },
      {
        text: contents.diagram.second.title,
        style: {
          fontSize: String(diagramTitleSize) + ea,
          fontWeight: String(diagramTitleWeight),
          color: colorChip.black,
          marginTop: String(diagramTitleMarginTop) + ea,
          marginBottom: String(diagramTitleMarginBottom) + ea,
          lineHeight: String(diagramTitleLineHeight),
        }
      },
      {
        text: contents.diagram.second.description.join("\n"),
        style: {
          fontSize: String(diagramDescriptionSize) + ea,
          fontWeight: String(diagramDescriptionWeight),
          color: colorChip.black,
          lineHeight: String(diagramDescriptionLineHeight),
        }
      }
    ]
  });
  createNode({
    mother: diagramTong,
    style: {
      position: "absolute",
      top: String(diagramThirdTop) + ea,
      right: String(diagramThirdLeft) + ea,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "start",
      textAlign: "left",
    },
    children: [
      {
        text: contents.diagram.third.english,
        style: {
          fontSize: String(diagramEnglishSize) + ea,
          fontWeight: String(diagramEnglishWeight),
          fontFamily: "graphik",
          fontStyle: "italic",
          color: colorChip.gray4,
        }
      },
      {
        text: contents.diagram.third.title,
        style: {
          fontSize: String(diagramTitleSize) + ea,
          fontWeight: String(diagramTitleWeight),
          color: colorChip.black,
          marginTop: String(diagramTitleMarginTop) + ea,
          marginBottom: String(diagramTitleMarginBottom) + ea,
          lineHeight: String(diagramTitleLineHeight),
        }
      },
      {
        text: contents.diagram.third.description.join("\n"),
        style: {
          fontSize: String(diagramDescriptionSize) + ea,
          fontWeight: String(diagramDescriptionWeight),
          color: colorChip.black,
          lineHeight: String(diagramDescriptionLineHeight),
        }
      }
    ]
  });

  // fee
  feeTong = createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      marginTop: String(finalMarginBottom) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingBottom: String(finalMarginBottom) + ea,
      width: withOut(margin * 2, ea),
    }
  });
  createNode({
    mother: feeTong,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      height: String(feeTitleTongHeight) + ea,
      width: withOut(0, ea),
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    child: {
      text: "비용의 구성",
      style: {
        position: "relative",
        top: String(feeTitleTextTop) + ea,
        fontSize: String(feeTitleSize) + ea,
        fontWeight: String(feeTitleWeight),
        color: colorChip.black,
      }
    }
  });
  createNode({
    mother: feeTong,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: withOut(0, ea),
      height: String(feeDescriptionTongHeight) + ea,
      alignItems: "center",
      justifyContent: "start",
    },
    children: [
      {
        style: {
          position: "absolute",
          bottom: String(0),
          left: String(0),
          width: withOut(0, ea),
          height: String(feeDescriptionTongHeight - feeDescriptionLineTop) + ea,
          border: "1px solid " + colorChip.gray3,
          borderTopLeftRadius: String(5) + "px",
          borderTopRightRadius: String(5) + "px",
          borderBottom: String(0),
          boxSizing: "border-box",
        }
      },
      {
        text: [
          styling ? "홈스타일링 서비스는 디자인비와 제품 구매비, 그리고 시공비로 구성됩니다." : "토탈 스타일링 서비스는 디자인비와 제품 구매비, 그리고 시공비로 구성됩니다."
        ].join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(feeDescriptionSize) + ea,
          fontWeight: String(feeDescriptionWeight),
          color: colorChip.black,
          background: colorChip.white,
          paddingLeft: String(feeDescriptionPadding) + ea,
          paddingRight: String(feeDescriptionPadding) + ea,
        }
      }
    ]
  });
  createNode({
    mother: feeTong,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      width: withOut(0, ea),
      height: String(feeBarTongHeight) + ea,
      alignItems: "end",
      justifyContent: "start",
    },
    children: [
      {
        style: {
          display: "inline-flex",
          flexDirection: "column",
          position: "relative",
          width: String(barWidth0) + ea,
          marginRight: String(barBetween) + ea,
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              height: String(barHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.green,
              marginBottom: String(barMarginBottom) + ea,
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "column",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            child: {
              text: "디자인 비용",
              style: {
                position: "relative",
                fontSize: String(feeDescriptionSize) + ea,
                fontWeight: String(feeDescriptionWeightBold),
                color: colorChip.green,
              }
            }
          }
        ]
      },
      {
        style: {
          display: "inline-flex",
          flexDirection: "column",
          position: "relative",
          width: String(barWidth1) + ea,
          marginRight: String(barBetween) + ea,
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              height: String(barHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray4,
              marginBottom: String(barMarginBottom) + ea,
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "column",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            child: {
              text: "시공 비용",
              style: {
                position: "relative",
                fontSize: String(feeDescriptionSize) + ea,
                fontWeight: String(feeDescriptionWeightBold),
                color: colorChip.black,
              }
            }
          }
        ]
      },
      {
        style: {
          display: "inline-flex",
          flexDirection: "column",
          position: "relative",
          width: withOut(barWidth0 + barBetween + barWidth1 + barBetween, ea),
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              height: String(barHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray2,
              marginBottom: String(barMarginBottom) + ea,
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "column",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            child: {
              text: "제품 구매 비용",
              style: {
                position: "relative",
                fontSize: String(feeDescriptionSize) + ea,
                fontWeight: String(feeDescriptionWeightBold),
                color: colorChip.black,
              }
            }
          }
        ]
      },
    ]
  });

}

ServiceDetailJs.prototype.insertPeopleBox = function () {
  const instance = this;
  const { ea, media, standardWidth, mode } = this;
  const pastBaseTong = this.baseTong;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  const newBaseTong = pastBaseTong.cloneNode(false);
  let bottomMargin;
  let margin;
  let baseTong;
  let contents;
  let middleTong;
  let middleTongPaddingBottom;
  let middleTitleMarginBottom;
  let middleTitleLineTop;
  let middleTitleSize;
  let middleTitleWeight;
  let middleTitlePadding;
  let middleTitleTextTop;
  let middleAreaPaddingTop;
  let middleInfoSize;
  let peopleTong;
  let peopleSize, peopleWeight, peopleBoldWeight;
  let peopleLineHeight;
  let peopleBetween, peopleMarginBottom;
  let topMargin;

  topMargin = <%% 160, 160, 160, 120, 50 %%>;
  bottomMargin = <%% 180, 180, 180, 180, 50 %%>;
  margin = <%% 52, 50, 40, 32, 52 %%>;

  middleTongPaddingBottom = <%% 150, 130, 100, 70, 17 %%>;
  middleTitleMarginBottom = <%% 60, 60, 60, 60, 60 %%>;

  middleTitleLineTop = <%% 68, 68, 68, 68, 68 %%>;

  middleTitleSize = <%% 23, 23, 21, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 2 %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;
  middleInfoSize = <%% 14, 14, 14, 13, 3 %%>;

  peopleSize = <%% 14, 14, 13, 12, 3 %%>;
  peopleWeight = <%% 400, 400, 400, 400, 400 %%>;
  peopleBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
  peopleLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  peopleBetween = <%% 8, 8, 8, 8, 8 %%>;
  peopleMarginBottom = <%% 40, 40, 40, 40, 40 %%>;

  pastBaseTong.parentNode.insertBefore(newBaseTong, pastBaseTong.nextElementSibling);
  newBaseTong.style.left = String(0);
  newBaseTong.style.width = withOut(0, ea);
  newBaseTong.style.background = colorChip.white;
  newBaseTong.style.paddingTop = String(topMargin) + ea;

  if (mode === "furnishing") {
    contents = {
      title: "바쁜 1, 2인 가구가 선택한 홈퍼니싱",
      image: ServiceDetailJs.binaryPath + "/people_f.svg",
      description: [
        "시간은 없고, 선택할 것은 많잖아요.",
        "<b%디자이너가 함께하면 시간은 줄이고 확실한 변화를 느낄 수 있어요.%b>",
      ],
      people: {
        title: "디자이너와 함께 할 때 효과",
        description: [
          "선택의 연속, 인테리어 프로세스,",
          "모두 시간과 비용의 부담이죠.",
          "이렇게 혼자하기 부담스러운 과정을",
          "디자이너가 함께하면 효율적이고",
          "합리적인 결과를 낼 수 있습니다.",
        ]
      }
    };
  } else if (mode === "styling") {
    contents = {
      title: "필요한 시공만, 부분 시공 + 스타일링",
      image: ServiceDetailJs.binaryPath + "/people_s.svg",
      description: [
        "전체 시공은 부담스럽고, 적은 시공이라 개별로 맡기기는 어렵잖아요.",
        "<b%디자이너를 통해 시공 범위 조정을 먼저 진행해보세요!%b>",
      ],
      people: {
        title: "나와 내 집 컨디션에 맞게",
        description: [
          "한정적인 예산 내에서 시공 비중을",
          "과하게 높이게 되면 완성도 높은 현장을",
          "만들 수 없어요. 나와 내 집이 컨디션에",
          "맞게 스타일링에 집중된 효과적인",
          "인테리어를 경험해보세요.",
        ]
      }
    };
  } else if (mode === "total") {
    contents = {
      title: "디자이너의 시그니처 스타일링",
      image: ServiceDetailJs.binaryPath + "/people_t.svg",
      description: [
        "인테리어에 대한 전체적인 도움이 필요하신가요?",
        "<b%디자이너와 처음부터 끝까지 한번에 진행해보세요!%b>",
      ],
      people: {
        title: "디자이너와 함께 할 때 효과",
        description: [
          "나를 잘 아는 디자이너와 함께",
          "우리집을 맞춤 설계 한다면?",
          "전문가와 함께 기획 단계부터",
          "시작하여 스타일링까지 완벽한",
          "인테리어로 공간을 바꿔보세요!",
        ]
      }
    };
  }

  baseTong = createNode({
    mother: newBaseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      paddingBottom: String(bottomMargin) + ea,
    }
  });

  middleTong = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0 * 2, ea),
      paddingBottom: String(middleTitleMarginBottom) + ea,
    }
  });

  createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      width: String(100) + '%',
      textAlign: "center",
    },
    children: [
      {
        style: {
          display: "block",
          position: "absolute",
          width: String(100) + '%',
          height: String(middleTitleLineTop) + ea,
          top: String(0),
          left: String(0),
          borderBottom: "1px solid " + colorChip.gray4,
        }
      },
      {
        text: contents.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          top: String(middleTitleTextTop) + ea,
          background: colorChip.white,
        }
      },
      {
        text: contents.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          paddingLeft: String(middleTitlePadding * 1.5) + ea,
          paddingRight: String(middleTitlePadding * 1.5) + ea,
          background: colorChip.white,
        },
        bold: {
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(700),
          lineHeight: String(1.6),
          color: colorChip.black,
        }
      }
    ]
  });

  peopleTong = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0 * 2, ea),
      borderBottom: "1px solid " + colorChip.gray4,
    },
    children: [
      {
        mode: "img",
        attribute: {
          src: contents.image,
        },
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
        }
      }
    ]
  });

  createNode({
    mother: peopleTong,
    style: {
      display: "flex",
      position: "absolute",
      right: String(0),
      bottom: String(0),
      flexDirection: "column-reverse",
    },
    children: [
      {
        text: contents.people.description.join("\n"),
        style: {
          fontSize: String(peopleSize) + ea,
          fontWeight: String(peopleWeight),
          color: colorChip.black,
          position: "relative",
          display: "block",
          lineHeight: String(peopleLineHeight),
          marginBottom: String(peopleMarginBottom) + ea,
        }
      },
      {
        text: contents.people.title,
        style: {
          fontSize: String(peopleSize) + ea,
          fontWeight: String(peopleBoldWeight),
          color: colorChip.black,
          position: "relative",
          display: "block",
          lineHeight: String(peopleLineHeight),
          marginBottom: String(peopleBetween) + ea,
        }
      },
    ]
  });

  return [ newBaseTong, baseTong ];
}

ServiceDetailJs.prototype.insertReviewBox = function (newBaseTong, baseTong) {
  const instance = this;
  const { ea, media, standardWidth, mode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker, uniqueValue } = GeneralJs;
  const reviewBlockClassName = "reviewBlockClassName";
  const imageRatio = (210 / 297);
  let blankBlock;
  let setBlock;
  let contents;
  let imageHeight;
  let imageWidth;
  let imageBetween;
  let startBlankHeight;
  let blockBetween;
  let titleSize, titleWeight, textLineHeight;
  let quoteWidth, quoteMarginTop, quoteMarginBottom, quoteVisual;
  let descriptionSize, descriptionWeight;
  let lineTop, lineBottom;
  let tagTongHeight;
  let tagBetween;
  let tagTextTop, tagSize, tagWeight, tagPaddingLeft;
  let blockId;

  startBlankHeight = <%% 110, 110, 110, 110, 24 %%>;

  blockBetween = <%% 40, 40, 40, 40, 40 %%>;

  imageHeight = <%% 420, 420, 420, 420, 420 %%>;
  imageWidth = <%% 890, 890, 890, 890, 890 %%>;
  imageBetween = <%% 40, 40, 40, 40, 40 %%>;

  titleSize = <%% 17, 17, 16, 15, 4 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  textLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  quoteWidth = <%% 13, 13, 13, 13, 13 %%>;
  quoteMarginTop = <%% 14, 14, 14, 14, 14 %%>;
  quoteMarginBottom = <%% 8, 8, 8, 8, 8 %%>;
  quoteVisual = <%% 1, 1, 1, 1, 1 %%>;

  descriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;

  lineTop = <%% 20, 20, 20, 20, 20 %%>;
  lineBottom = <%% 22, 22, 22, 22, 22 %%>;

  tagTongHeight = <%% 26, 26, 26, 26, 26 %%>;

  tagBetween = <%% 4, 4, 4, 4, 4 %%>;

  tagTextTop = <%% -1, -1, -1, -1, -1 %%>;
  tagSize = <%% 11, 11, 11, 11, 11 %%>;
  tagWeight = <%% 600, 600, 600, 600, 600 %%>;
  tagPaddingLeft = <%% 12, 12, 12, 12, 12 %%>;

  blankBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      display: "block",
      height: String(startBlankHeight) + ea,
      width: withOut(0),
    }
  });

  if (mode === "furnishing") {
    contents = [
      {
        images: [
          ServiceDetailJs.binaryPath + "/review/f00.jpg",
          ServiceDetailJs.binaryPath + "/review/f01.jpg",
          ServiceDetailJs.binaryPath + "/review/f02.jpg",
        ],
        position: [
          27,
          47,
          44
        ],
        title: "DMC SK view 33py 아파트",
        description: [
          "임차 공간이라 시공도 어려운 상황인데 배치만으로도 확실한 변화가 있었어요.",
          "예산도 중요했고, 결혼 준비 해보신 분들은 아실거에요.",
          "정말 알아볼 것도 많고 준비할 것도 많은데 시간을 잘 아꼈죠.",
          "결과적으로 디자이너님 덕에 저의 시간과 기회비용을 아낄 수 있었어요.",
        ],
        tag: [
          "깔끔",
          "심플",
          "전체 구매",
          "2,000만원대",
          "새입주",
          "33py",
          "홈오피스",
          "재택 근무",
          "맞벌이",
          "신혼집",
          "신혼 부부",
          "임차 공간",
          "30대",
        ],
      },
      {
        images: [
          ServiceDetailJs.binaryPath + "/review/f10.jpg",
          ServiceDetailJs.binaryPath + "/review/f11.jpg",
          ServiceDetailJs.binaryPath + "/review/f12.jpg",
        ],
        position: [
          40,
          31,
          42
        ],
        title: "광주 헤스티아 35py 빌라",
        description: [
          "일하면서 시간이 정말 없었어요, 솔직히 가서 보고 사도 배송 와서 보면,",
          "잘 맞지 않을 때도 있잖아요, 디자이너님께서 주신 도면과 자료만 보고 믿고",
          "구매했는데, 배치했을 때 마음에 들더라고요! 디자이너님이 시각화 작업을",
          "잘하시는 편이라 자료를 토대로 믿고 구매하기 더 원활했어요. ",
        ],
        tag: [
          "전체 구매",
          "2,000만원대",
          "새입주",
          "35py",
          "홈오피스",
          "재택 근무",
          "반려견",
          "전문직",
          "여성",
          "1인 가구",
          "자가",
          "30대",
          "컬러풀한",
          "컬러풀",
        ],
      },
      {
        images: [
          ServiceDetailJs.binaryPath + "/review/f20.jpg",
          ServiceDetailJs.binaryPath + "/review/f21.jpg",
          ServiceDetailJs.binaryPath + "/review/f22.jpg",
        ],
        position: [
          44,
          43,
          36
        ],
        title: "서울숲 트리마제 64py 아파트",
        description: [
          "제가 일을 하다보니 시간이 정말 부족했어요, 그래서 디자이너님과 함께 한",
          "과정이 정말 신의 한 수였죠. 제가 미처 생각하지 못한 부분까지 챙겨주셔서",
          "확실히 전문가는 다르다는 것을 느끼게 되었어요. 시간이 부족한 분들에게",
          "정말 추천하고 싶어요. 확실히 인테리어 수월해지는 것 같거든요.",
        ],
        tag: [
          "시크 모던",
          "전체 구매",
          "5,000만원대",
          "64py",
          "맞춤 가구",
          "뚜렷한 취향",
          "컬렉터",
          "남성",
          "1인 가구",
          "임차 공간",
          "30대",
          "모던",
          "서울숲",
        ],
      },
    ];
  } else if (mode === "styling") {
    contents = [
      {
        images: [
          ServiceDetailJs.binaryPath + "/review/s00.jpg",
          ServiceDetailJs.binaryPath + "/review/s01.jpg",
          ServiceDetailJs.binaryPath + "/review/s02.jpg",
        ],
        position: [
          38,
          44,
          47
        ],
        title: "일산 자이 3차 34py 아파트",
        description: [
          "디자이너님이 시공 내역을 당장 꼭 해야하는 것과 추후에 해도",
          "괜찮은 부분으로 나누어주셔서 예산에 맞게 시공할 수 있었어요.",
          "당장 불필요한 시공은 줄이고, 스타일링으로 보완할 수 있는 방안을 제시해",
          "주셔서 원래 예상했던 것보다 훨씬 비용을 아낄 수 있었어요.",
        ],
        tag: [
          "깔끔",
          "심플",
          "전체 구매",
          "3,000만원대",
          "새입주",
          "34py",
          "톤보정",
          "가벽철거",
          "알파룸",
          "맞벌이",
          "내집마련",
          "부부",
          "자녀",
          "자가",
          "30대",
        ],
      },
      {
        images: [
          ServiceDetailJs.binaryPath + "/review/s10.jpg",
          ServiceDetailJs.binaryPath + "/review/s11.jpg",
          ServiceDetailJs.binaryPath + "/review/s12.jpg",
        ],
        position: [
          38,
          29,
          40
        ],
        title: "신길 파크 자이 35py 아파트",
        description: [
          "전반적으로 홈스타일링 과정이 엄청 만족스러웠어요.",
          "우리가 부분 부분 직접 선택한다 하더라도 이게 다 어떻게 보여질 지 ",
          "상상을 못하잖아요. 디자이너님은 아무것도 없을 때부터 이 정도를 생각하시는",
          "분이시고, 어떻게 나올지를 보여주시니까 완전 신뢰할 수 있었죠.",
        ],
        tag: [
          "첫 내집",
          "톤보정",
          "전체 구매",
          "4,000만원대",
          "새입주",
          "35py",
          "거실의 서재화",
          "서재",
          "서재형 거실",
          "수납공간",
          "전문직",
          "부부",
          "자가",
          "30대",
          "모던",
        ],
      },
      {
        images: [
          ServiceDetailJs.binaryPath + "/review/s20.jpg",
          ServiceDetailJs.binaryPath + "/review/s21.jpg",
          ServiceDetailJs.binaryPath + "/review/s22.jpg",
        ],
        position: [
          42,
          41,
          40
        ],
        title: "호반 써밋 2차 41py 아파트",
        description: [
          "가장 신경 쓴 공간은 아이방이에요. 코로나 이슈로 밖에 나가서 뛰어놀기",
          "힘들었는데 집에서라도 놀이터를 즐기라고 만들어줬어요. 그리고 확실하게 주방은",
          "어둡고, 거실은 밝게 무드를 잡고 싶었는데 디자이너님께선 제가 원하는대로",
          "맞춰 제안해주셨죠. 덕분에 제가 딱 원하던 집이 완성되었어요.",
        ],
        tag: [
          "밝은 거실",
          "어두운 주방",
          "아이방 ",
          "전체 구매",
          "4,000만원대",
          "41py",
          "뚜렷한 취향",
          "부부",
          "자녀",
          "자가",
          "30대",
          "화이트 모던",
        ],
      },
    ];
  } else if (mode === "total") {
    contents = [
      {
        images: [
          ServiceDetailJs.binaryPath + "/review/t00.jpg",
          ServiceDetailJs.binaryPath + "/review/t01.jpg",
          ServiceDetailJs.binaryPath + "/review/t02.jpg",
        ],
        position: [
          29,
          26,
          45
        ],
        title: "보문 파크뷰 자이 35py 아파트",
        description: [
          "저희가 의류 사업을 하다보니 옷도 정말 많고, 또 가족 취미가 캠핑이라 ",
          "전체적으로 수납이 정말 중요했어요. 거실을 촬영 공간으로 사용하고 싶었고요.",
          "디자이너님은 저희들의 니즈와 취향에 잘 맞게 이 모든걸 제안해주셨어요. ",
          "덕분에 우리 가족에게 적합한 딱 맞는 집이 되었어요. ",
        ],
        tag: [
          "구조 변경",
          "깔끔",
          "심플",
          "전체 구매",
          "1억대 ",
          "새입주",
          "35py",
          "전체시공",
          "취미",
          "수납공간",
          "맞벌이",
          "스튜디오",
          "부부",
          "자녀",
          "자가",
          "30대",
        ],
      },
      {
        images: [
          ServiceDetailJs.binaryPath + "/review/t10.jpg",
          ServiceDetailJs.binaryPath + "/review/t11.jpg",
          ServiceDetailJs.binaryPath + "/review/t12.jpg",
        ],
        position: [
          48,
          51,
          42
        ],
        title: "경희궁의 아침 45py 아파트",
        description: [
          "디자이너님께서 저의 라이프 스타일을 고려해 만들어주셨어요. ",
          "저희 집 맞춤형 공간이다보니 집에 놀러 오는 사람들이 모두 탐내더라고요, ",
          "기존의 집보다 훨씬 높고 넓어 보여서 엄청 만족스러워요.",
          "바빠서 집에 있을 시간이 많이 없지만, 얼른 집에 오고 싶어져요.",
        ],
        tag: [
          "첫 내집",
          "구조 변경",
          "전체 구매",
          "1억대 ",
          "45py",
          "맞춤가구",
          "수납공간",
          "전문직",
          "1인가구",
          "자가",
          "40대",
          "제작 가구",
          "화이트우드",
          "라탄",
          "우드",
        ],
      },
      {
        images: [
          ServiceDetailJs.binaryPath + "/review/t20.jpg",
          ServiceDetailJs.binaryPath + "/review/t21.jpg",
          ServiceDetailJs.binaryPath + "/review/t22.jpg",
        ],
        position: [
          39,
          39,
          45
        ],
        title: "파크 푸르지오 35py 아파트",
        description: [
          "유튜브 편집할 수 있는 오픈된 공간을 원했어요.",
          "변경된 주방에서 주방에서 가족끼리 티타임도 가질 수 있고요,",
          "확실히 바뀌고 나니 가족들이 함께할 수 있는 시간이 늘어났어요.",
          "쾌적한 공간이 마련되니까 자연스럽게 모이게 되더라고요.",
        ],
        tag: [
          "전문직",
          "4,000만원대",
          "자가",
          "밝은 거실",
          "구조 변경",
          "취미 공간",
          "거실의 서재화",
          "알파룸 철거",
          "부부",
          "자녀",
          "30대",
          "알파룸",
          "따뜻한",
        ],
      },
    ];
  }

  setBlock = ({ images, position, title, description, tag }) => {

    createNode({
      mother: baseTong,
      class: [ reviewBlockClassName ],
      style: {
        display: "flex",
        flexDirection: "row",
        position: "relative",
        width: withOut(0),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: String(blockBetween) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(imageWidth) + ea,
            height: String(imageHeight) + ea,
            marginRight: String(imageBetween) + ea,
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            overflow: "hidden",
          },
          children: images.map((src, index) => {
            return {
              mode: "img",
              attribute: { src, toggle: (index === 0 ? "on" : "off") },
              style: {
                position: "absolute",
                left: String(0),
                width: String(imageWidth) + ea,
                height: String(imageWidth * imageRatio) + ea,
                top: withOut(position[index], ((imageWidth * imageRatio) / 2), ea),
                transition: "all 0.5s ease",
                opacity: index === 0 ? String(1) : String(0),
              }
            }
          })
        },
        {
          style: {
            display: "inline-flex",
            flexDirection: "column",
            position: "relative",
            width: withOut(imageWidth + imageBetween, ea),
            height: String(imageHeight) + ea,
            justifyContent: "end",
            alignItems: "start",
          },
          children: [
            {
              text: title,
              style: {
                display: "block",
                textAlign: "left",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                lineHeight: String(textLineHeight),
                color: colorChip.black,
              }
            },
            {
              mode: "svg",
              source: svgMaker.doubleQuote(colorChip.deactive),
              style: {
                display: "inline-block",
                position: "relative",
                width: String(quoteWidth) + ea,
                marginTop: String(quoteMarginTop) + ea,
                marginBottom: String(quoteMarginBottom) + ea,
                marginLeft: String(quoteVisual) + ea,
              }
            },
            {
              text: description.join("\n"),
              style: {
                display: "block",
                textAlign: "left",
                position: "relative",
                fontSize: String(descriptionSize) + ea,
                fontWeight: String(descriptionWeight),
                lineHeight: String(textLineHeight),
                color: colorChip.black,
              }
            },
            {
              style: {
                display: "block",
                position: "relative",
                width: withOut(0),
                height: String(lineTop) + ea,
                marginBottom: String(lineBottom) + ea,
                borderBottom: "1px solid " + colorChip.gray4,
              }
            },
            {
              style: {
                display: "block",
                position: "relative",
                width: withOut(0),
              },
              children: tag.map((text) => {
                return {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: String(tagTongHeight) + ea,
                    marginRight: String(tagBetween) + ea,
                    marginBottom: String(tagBetween) + ea,
                    borderRadius: String(8) + "px",
                    background: colorChip.gray2,
                  },
                  child: {
                    text,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(tagTextTop) + ea,
                      fontSize: String(tagSize) + ea,
                      fontWeight: String(tagWeight),
                      color: colorChip.black,
                      paddingLeft: String(tagPaddingLeft) + ea,
                      paddingRight: String(tagPaddingLeft) + ea,
                    }
                  }
                }
              })
            }
          ]
        }
      ]
    });

  }

  contents.forEach(setBlock);

  setInterval(() => {
    const targets = [ ...document.querySelectorAll('.' + reviewBlockClassName) ];
    let target, images;
    let index, toggle;
    for (let dom of targets) {
      target = dom.firstChild;
      images = [ ...target.children ];
      index = null;
      for (let i = 0; i < images.length; i++) {
        if (images[i].getAttribute("toggle") === "off") {
          index = i;
          break;
        }
      }
      if (index === null) {
        for (let i = 0; i < images.length; i++) {
          if (i === 0) {
            images[i].setAttribute("toggle", "on");
            images[i].style.opacity = String(1);
          } else {
            images[i].setAttribute("toggle", "off");
            images[i].style.opacity = String(0);
          }
        }
      } else {
        for (let i = 0; i < index + 1; i++) {
          images[i].setAttribute("toggle", "on");
          images[i].style.opacity = String(1);
        }
      }
    }
  }, 5000);

}

ServiceDetailJs.prototype.insertToneBox = function (pastBaseTong, baseTong) {
  const instance = this;
  const { ea, media, standardWidth, mode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  const newBaseTong = pastBaseTong.cloneNode(false);
  let topMargin;
  let bottomMargin;
  let margin;
  let middleTongPaddingBottom;
  let middleTitleMarginBottom;
  let middleTitleLineTop;
  let middleTitleSize;
  let middleTitleWeight;
  let middleTitlePadding;
  let middleTitleTextTop;
  let middleAreaPaddingTop;
  let middleInfoSize;
  let contents;
  let middleTong;
  let whiteTongMarginTop;
  let whiteBlock;
  let setToneSetting;
  let imageWidth, imageHeight;
  let imageBetween;
  let marginTop;
  let titleSize, titleWeight, descriptionWeight;
  let descriptionLineHeight;
  let titleMarginBottom;
  let factorTextTop, factorSize, factorWeight;
  let factorTongHeight, factorTongWidth;
  let lineStart;
  let lineWidth, lineHeight;
  let lineEnd;
  let arrowWidth;
  let boxWidth, boxHeight;
  let total;

  total = (mode === "total");

  topMargin = <%% 160, 160, 160, 120, 50 %%>;
  bottomMargin = <%% 180, 180, 180, 180, 50 %%>;
  margin = <%% 52, 50, 40, 32, 52 %%>;
  marginTop = <%% 56, 56, 56, 56, 56 %%>;

  middleTongPaddingBottom = <%% 150, 130, 100, 70, 17 %%>;
  middleTitleMarginBottom = <%% 60, 60, 60, 60, 60 %%>;

  middleTitleLineTop = <%% 68, 68, 68, 68, 68 %%>;

  middleTitleSize = <%% 23, 23, 21, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 2 %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;
  middleInfoSize = <%% 14, 14, 14, 13, 3 %%>;

  whiteTongMarginTop = <%% 48, 48, 48, 48, 48 %%>;

  imageWidth = <%% 680, 680, 680, 680, 680 %%>;
  imageHeight = <%% 400, 400, 400, 400, 400 %%>;
  imageBetween = <%% 12, 12, 12, 12, 12 %%>;

  titleSize = <%% 14, 14, 14, 14, 14 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  titleMarginBottom = <%% 6, 6, 6, 6, 6 %%>;

  factorTextTop = <%% -1, -1, -1, -1, -1 %%>;
  factorSize = <%% 13, 13, 13, 13, 13 %%>;
  factorWeight = <%% 700, 700, 700, 700, 700 %%>;

  factorTongHeight = <%% 36, 36, 36, 36, 36 %%>;
  factorTongWidth = <%% 96, 96, 96, 96, 96 %%>;

  lineStart = <%% 20, 20, 20, 20, 20 %%>;
  lineWidth = <%% 74, 74, 74, 74, 74 %%>;
  lineHeight = <%% 94, 94, 94, 94, 94 %%>;
  lineEnd = <%% 2, 2, 2, 2, 2 %%>;

  arrowWidth = <%% 10, 10, 10, 10, 10 %%>;

  boxWidth = <%% 150, 150, 150, 150, 150 %%>;
  boxHeight = <%% 80, 80, 80, 80, 80 %%>;

  pastBaseTong.parentNode.insertBefore(newBaseTong, pastBaseTong.nextElementSibling);
  newBaseTong.style.left = String(0);
  newBaseTong.style.width = withOut(0, ea);
  newBaseTong.style.background = colorChip.gray2;
  newBaseTong.style.paddingTop = String(topMargin) + ea;

  if (total) {
    contents = {
      title: "스타일링까지 조화롭게",
      description: [
        "마지막 스타일링까지 완성해야 인테리어의 정점을 찍어요.",
        "기획 단계부터 스타일링 마무리까지 홈스타일링의 풀 프로세스를 경험해보세요!",
      ],
      tone: [
        {
          title: "토탈 비포 에프터",
          description: [
            "고객의 라이프 스타일에 맞게 설계된",
            "구조 변경, 모든 자재 선택, 제작 가구 등",
            "모두가 사용하기에 일반적인 집의 형태",
            "대신 나에게 맞는 공간으로 확실하게",
            "달라진 사례입니다.",
          ],
          factors: [
            "전체 시공",
            "제작 가구",
            "스타일링",
          ],
          before: ServiceDetailJs.binaryPath + "/tone_before0_t.jpg",
          after: ServiceDetailJs.binaryPath + "/tone_after0_t.jpg",
        }
      ]
    };
  } else {
    contents = {
      title: "확실한 무드 체인지",
      description: [
        "홈퍼니싱 서비스를 이용한 실제 고객님들의 비포 앤 에프터",
        "사진을 통해 확실한 무드 체인지를 느껴보세요!",
      ],
      tone: [
        {
          title: "거실 비포 에프터",
          description: [
            "시공 없이 스타일링 서비스만",
            "진행한 현장으로 가구와 패브릭,",
            "소품의 변화만으로 완전히 다른",
            "분위기의 공간으로 변화한",
            "고객님의 현장 사례입니다.",
          ],
          factors: [
            "소품 배치",
            "가구 배치",
            "패브릭 설치",
          ],
          before: ServiceDetailJs.binaryPath + "/tone_before0_f.jpg",
          after: ServiceDetailJs.binaryPath + "/tone_after0_f.jpg",
        },
        {
          title: "아이방 비포 에프터",
          description: [
            "사용하던 기존 가구의 변화된",
            "배치만으로 공간의 무드를",
            "확실하게 바꾸어 준 사례입니다.",
          ],
          factors: [
            "소품 배치",
            "가구 배치",
            "패브릭 설치",
          ],
          before: ServiceDetailJs.binaryPath + "/tone_before1_f.jpg",
          after: ServiceDetailJs.binaryPath + "/tone_after1_f.jpg",
        },
      ]
    };
  }


  baseTong = createNode({
    mother: newBaseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      paddingBottom: String(bottomMargin) + ea,
    }
  });

  middleTong = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0 * 2, ea),
    }
  });

  createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      width: String(100) + '%',
      textAlign: "center",
    },
    children: [
      {
        style: {
          display: "block",
          position: "absolute",
          width: String(100) + '%',
          height: String(middleTitleLineTop) + ea,
          top: String(0),
          left: String(0),
          borderBottom: "1px solid " + colorChip.gray4,
        }
      },
      {
        text: contents.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          top: String(middleTitleTextTop) + ea,
          background: colorChip.gray2,
        }
      },
      {
        text: contents.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          paddingLeft: String(middleTitlePadding * 1.5) + ea,
          paddingRight: String(middleTitlePadding * 1.5) + ea,
          background: colorChip.gray2,
        },
        bold: {
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(700),
          lineHeight: String(1.6),
          color: colorChip.black,
        }
      }
    ]
  });

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      flexDirection: "column",
      marginTop: String(whiteTongMarginTop) + ea,
      width: withOut(margin * 2, ea),
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingTop: String(marginTop) + ea,
      paddingBottom: String(marginTop) + ea,
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      borderRadius: String(8) + "px",
    }
  });

  setToneSetting = ({ title, description, factors, before, after }, index) => {

    createNode({
      mother: whiteBlock,
      style: {
        display: "flex",
        flexDirection: "row",
        width: withOut(0),
        position: "relative",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            flexDirection: "column",
            position: "relative",
            marginRight: String(imageBetween) + ea,
            width: withOut((imageWidth / 2) + imageWidth + (imageBetween * 2)),
            height: String(imageHeight) + ea,
            alignItems: "start",
            justifyContent: "end",
          },
          children: [
            {
              text: String(index + 1),
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                fontSize: String(titleSize) + ea,
                fontWeight: String(500),
                fontFamily: "graphik",
                fontStyle: "italic",
                color: colorChip.green
              }
            },
            {
              text: title,
              style: {
                display: "block",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorChip.black,
                lineHeight: String(descriptionLineHeight),
                marginBottom: String(titleMarginBottom) + ea,
              }
            },
            {
              text: description.join("\n"),
              style: {
                display: "block",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(descriptionWeight),
                color: colorChip.black,
                lineHeight: String(descriptionLineHeight),
              }
            },
          ]
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            flexDirection: "column",
            height: String(imageHeight) + ea,
            width: String(imageWidth / 2) + ea,
            marginRight: String(imageBetween) + ea,
          },
          children: [
            {
              style: {
                display: "flex",
                position: "relative",
                width: String(imageWidth / 2) + ea,
                height: String(imageHeight / 2) + ea,
                borderRadius: String(8) + "px",
                backgroundImage: "url('" + before + "')",
                backgroundSize: "100% auto",
                backgroundPosition: "50% 50%",
                marginBottom: String(imageBetween) + ea,
              }
            },
            {
              style: {
                display: "flex",
                flexDirection: "column",
                position: "relative",
                width: String(imageWidth / 2) + ea,
                height: withOut((imageHeight / 2) + imageBetween, ea),
                justifyContent: "center",
                alignItems: "center",
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(lineWidth) + ea,
                    height: String(lineHeight) + ea,
                    top: String(0),
                    left: String(lineStart) + ea,
                    borderBottomLeftRadius: String(8) + "px",
                    borderLeft: "1px solid " + colorChip.gray5,
                    borderBottom: "1px solid " + colorChip.gray5,
                  }
                },
                {
                  style: {
                    position: "absolute",
                    width: String(boxWidth) + ea,
                    height: String(boxHeight) + ea,
                    border: "1px solid " + colorChip.gray5,
                    borderRadius: String(8) + "px",
                    left: withOut(50, boxWidth / 2, ea),
                    top: withOut(50, boxHeight / 2, ea),
                  }
                },
                {
                  style: {
                    position: "absolute",
                    width: String(boxWidth) + ea,
                    height: String(0) + ea,
                    borderBottom: "1px solid " + colorChip.gray5,
                    left: withOut(50, boxWidth / 2, ea),
                    top: withOut(50, 0, ea),
                  }
                },
                {
                  style: {
                    position: "absolute",
                    width: String(lineWidth + lineStart - lineEnd) + ea,
                    height: String(0),
                    right: String(lineEnd) + ea,
                    top: withOut(50, 0, ea),
                    borderBottom: "1px solid " + colorChip.gray5,
                  }
                },
                {
                  style: {
                    position: "absolute",
                    width: String(arrowWidth) + ea,
                    height: String(arrowWidth) + ea,
                    borderRight: "1px solid " + colorChip.gray5,
                    borderBottom: "1px solid " + colorChip.gray5,
                    right: String(lineEnd) + ea,
                    top: withOut(50, arrowWidth / 2, ea),
                    transform: "rotate(-45deg)",
                  }
                }
              ].concat(factors.map((factor, index) => {
                return {
                  style: {
                    display: "flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                    height: String(factorTongHeight) + ea,
                    width: String(factorTongWidth) + ea,
                    background: colorChip.black,
                    borderRadius: String(8) + "px",
                    marginBottom: String(index === factors.length - 1 ? 0 : 4) + ea,
                  },
                  child: {
                    text: factor,
                    style: {
                      position: "relative",
                      top: String(factorTextTop) + ea,
                      fontSize: String(factorSize) + ea,
                      fontWeight: String(factorWeight),
                      color: colorChip.white,
                    }
                  }
                }
              }))
            }
          ]
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(imageWidth) + ea,
            height: String(imageHeight) + ea,
            borderRadius: String(8) + "px",
            backgroundImage: "url('" + after + "')",
            backgroundSize: "100% auto",
            backgroundPosition: "50% 50%",
          }
        }
      ]
    });

    createNode({
      mother: whiteBlock,
      style: {
        display: "block",
        position: "relative",
        height: String(margin) + ea,
        width: withOut(0),
        marginBottom: String(margin) + ea,
        borderBottom: "1px solid " + colorChip.gray4,
      }
    })

  }

  contents.tone.forEach(setToneSetting);
  whiteBlock.removeChild(whiteBlock.lastChild);

  return [ newBaseTong, baseTong ];
}

ServiceDetailJs.prototype.insertAfterBox = function (pastBaseTong, baseTong) {
  const instance = this;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  const newBaseTong = pastBaseTong.cloneNode(false);
  let topMargin;
  let bottomMargin;
  let margin;
  let middleTongPaddingBottom;
  let middleTitleMarginBottom;
  let middleTitleLineTop;
  let middleTitleSize;
  let middleTitleWeight;
  let middleTitlePadding;
  let middleTitleTextTop;
  let middleAreaPaddingTop;
  let middleInfoSize;
  let contents;
  let middleTong;
  let whiteTongMarginTop;
  let whiteBlock;
  let setToneSetting;
  let imageWidth, imageHeight;
  let imageBetween;
  let marginTop;
  let titleSize, titleWeight, descriptionWeight;
  let descriptionLineHeight;
  let titleMarginBottom;
  let factorTextTop, factorSize, factorWeight;
  let factorTongHeight, factorTongWidth;
  let lineStart;
  let lineWidth, lineHeight;
  let lineEnd;
  let boxWidth, boxHeight;
  let singleImageWidth;
  let markTop, markLeft, markWidth, markHeight;
  let markSize, makrWeight, markTextTop;
  let centerCircleWidth;
  let arrowWidth, arrowHeight;
  let subBoxMargin;
  let subTitleSize, subTitleWeight;
  let subTitleMarginBottom;
  let subDescriptionSize, subDescriptionWeight;
  let subDescriptionBottom;
  let toneBoxPaddingLeft, toneBoxPaddingTop;
  let toneTitleSize, toneDescriptionSize;

  topMargin = <%% 160, 160, 160, 120, 50 %%>;
  bottomMargin = <%% 180, 180, 180, 180, 50 %%>;
  margin = <%% 52, 50, 40, 32, 52 %%>;
  marginTop = <%% 56, 56, 56, 56, 56 %%>;

  middleTongPaddingBottom = <%% 150, 130, 100, 70, 17 %%>;
  middleTitleMarginBottom = <%% 60, 60, 60, 60, 60 %%>;

  middleTitleLineTop = <%% 68, 68, 68, 68, 68 %%>;

  middleTitleSize = <%% 23, 23, 21, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 2 %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;
  middleInfoSize = <%% 14, 14, 14, 13, 3 %%>;

  whiteTongMarginTop = <%% 48, 48, 48, 48, 48 %%>;

  imageWidth = <%% 960, 960, 960, 960, 960 %%>;
  imageHeight = <%% 540, 540, 540, 540, 540 %%>;
  imageBetween = <%% 12, 12, 12, 12, 12 %%>;

  titleSize = <%% 14, 14, 14, 14, 14 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  titleMarginBottom = <%% 6, 6, 6, 6, 6 %%>;

  factorTextTop = <%% -1, -1, -1, -1, -1 %%>;
  factorSize = <%% 13, 13, 13, 13, 13 %%>;
  factorWeight = <%% 700, 700, 700, 700, 700 %%>;

  factorTongHeight = <%% 36, 36, 36, 36, 36 %%>;
  factorTongWidth = <%% 96, 96, 96, 96, 96 %%>;

  lineStart = <%% 20, 20, 20, 20, 20 %%>;
  lineWidth = <%% 74, 74, 74, 74, 74 %%>;
  lineHeight = <%% 94, 94, 94, 94, 94 %%>;
  lineEnd = <%% 2, 2, 2, 2, 2 %%>;

  boxWidth = <%% 150, 150, 150, 150, 150 %%>;
  boxHeight = <%% 80, 80, 80, 80, 80 %%>;

  singleImageWidth = <%% 390, 390, 390, 390, 390 %%>;

  markTop = <%% 16, 16, 16, 16, 16 %%>;
  markLeft = <%% 16, 16, 16, 16, 16 %%>;
  markWidth = <%% 70, 70, 70, 70, 70 %%>;
  markHeight = <%% 32, 32, 32, 32, 32 %%>;
  markSize = <%% 14, 14, 14, 14, 14 %%>;
  makrWeight = <%% 500, 500, 500, 500, 500 %%>;
  markTextTop = <%% -1, -1, -1, -1, -1 %%>;

  centerCircleWidth = <%% 60, 60, 60, 60, 60 %%>;

  arrowWidth = <%% 38, 38, 38, 38, 38 %%>;
  arrowHeight = <%% 12, 12, 12, 12, 12 %%>;

  subBoxMargin = <%% 24, 24, 24, 24, 24 %%>;

  subTitleSize = <%% 13, 13, 13, 13, 13 %%>;
  subTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  subTitleMarginBottom = <%% 3, 3, 3, 3, 3 %%>;
  subDescriptionSize = <%% 13, 13, 13, 13, 13 %%>;
  subDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  subDescriptionBottom = <%% 16, 16, 16, 16, 16 %%>;

  toneBoxPaddingLeft = <%% 20, 20, 20, 20, 20 %%>;
  toneBoxPaddingTop = <%% 18, 18, 18, 18, 18 %%>;

  toneTitleSize = <%% 13, 13, 13, 13, 13 %%>;
  toneDescriptionSize = <%% 12, 12, 12, 12, 12 %%>;

  pastBaseTong.parentNode.insertBefore(newBaseTong, pastBaseTong.nextElementSibling);
  newBaseTong.style.left = String(0);
  newBaseTong.style.width = withOut(0, ea);
  newBaseTong.style.background = colorChip.gray2;
  newBaseTong.style.paddingTop = String(topMargin) + ea;

  contents = {
    title: "톤보정의 중요성",
    description: [
      "톤보정은 기존 자재의 거슬리는 컬러, 톤, 무늬 등을 새로운 자재로",
      "드레스업하여 배경을 새로 만들어내는 간단한 부분 시공 서비스입니다.",
    ],
    white: {
      basic: {
        title: "주방 비포 에프터",
        description: [
          "기존의 튀고 오래된 듯한 마감재의 컬러 정도를",
          "바꾸어 주기 위해 필름 시공과 상판 교체만으로",
          "다른 공간처럼 변화한 사례입니다. 뿐만 아니라",
          "바뀐 배경에 맞게 고객이 원했던 컨셉을",
          "확실히 살려주는 스타일링이 가장 중요합니다.",
        ]
      },
      images: {
        before: ServiceDetailJs.binaryPath + "/styling_before.jpg",
        after: ServiceDetailJs.binaryPath + "/styling_after.jpg",
      },
    },
    tone: {
      title: "*톤 보정 시공이란?",
      description: [
        "디자이너와 함께 원하는 스타일링에 맞추어",
        "큰 구조의 변경아니 전체 시공 없이 기존 자재의",
        "거슬리는 컬러, 톤, 무늬 등을 새로운 자재로",
        "드레스업하여 배경을 새로 만들어내는 비교적",
        "간단한 부분 시공 서비스",
      ]
    }
  };

  baseTong = createNode({
    mother: newBaseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      paddingBottom: String(bottomMargin) + ea,
    }
  });

  middleTong = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0 * 2, ea),
    }
  });

  createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      width: String(100) + '%',
      textAlign: "center",
    },
    children: [
      {
        style: {
          display: "block",
          position: "absolute",
          width: String(100) + '%',
          height: String(middleTitleLineTop) + ea,
          top: String(0),
          left: String(0),
          borderBottom: "1px solid " + colorChip.gray4,
        }
      },
      {
        text: contents.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          top: String(middleTitleTextTop) + ea,
          background: colorChip.gray2,
        }
      },
      {
        text: contents.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          paddingLeft: String(middleTitlePadding * 1.5) + ea,
          paddingRight: String(middleTitlePadding * 1.5) + ea,
          background: colorChip.gray2,
        },
        bold: {
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(700),
          lineHeight: String(1.6),
          color: colorChip.black,
        }
      }
    ]
  });

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      flexDirection: "column",
      marginTop: String(whiteTongMarginTop) + ea,
      width: withOut(margin * 2, ea),
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingTop: String(marginTop) + ea,
      paddingBottom: String(marginTop) + ea,
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      borderRadius: String(8) + "px",
    }
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      flexDirection: "row",
      width: withOut(0),
      position: "relative",
    },
    children: [
      {
        style: {
          display: "inline-flex",
          flexDirection: "column",
          position: "relative",
          marginRight: String(imageBetween) + ea,
          width: withOut(imageWidth + imageBetween, ea),
          height: String(imageHeight) + ea,
          alignItems: "start",
          justifyContent: "end",
        },
        children: [
          {
            text: contents.white.basic.title,
            style: {
              display: "block",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(titleWeight),
              color: colorChip.black,
              lineHeight: String(descriptionLineHeight),
              marginBottom: String(titleMarginBottom) + ea,
            }
          },
          {
            text: contents.white.basic.description.join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorChip.black,
              lineHeight: String(descriptionLineHeight),
            }
          },
        ]
      },
      {
        style: {
          display: "inline-flex",
          flexDirection: "row",
          position: "relative",
          width: String(imageWidth) + ea,
          height: String(imageHeight) + ea,
          alignItems: "center",
          justifyContent: "center",
          background: colorChip.gray1,
        },
        children: [
          {
            style: {
              display: "inline-block",
              height: String(imageHeight) + ea,
              width: String(singleImageWidth) + ea,
              position: "relative",
              borderRadius: String(8) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              backgroundSize: "auto 100%",
              backgroundPosition: "50% 50%",
              backgroundImage: "url('" + contents.white.images.before + "')",
            },
            child: {
              style: {
                top: String(markTop) + ea,
                left: String(markLeft) + ea,
                width: String(markWidth) + ea,
                height: String(markHeight) + ea,
                display: "inline-flex",
                position: "absolute",
                borderRadius: String(8) + "px",
                alignItems: "center",
                justifyContent: "center",
                background: colorChip.gradientGray,
              },
              child: {
                text: "before",
                style: {
                  fontSize: String(markSize) + ea,
                  fontWeight: String(makrWeight),
                  color: colorChip.white,
                  fontFamily: "graphik",
                  fontStyle: "italic",
                  position: "relative",
                  top: String(markTextTop) + ea,
                }
              }
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "relative",
              height: String(imageHeight) + ea,
              width: withOut(singleImageWidth * 2, ea),
              justifyContent: "center",
              alignItems: "center",
            },
            child: {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(centerCircleWidth) + ea,
                height: String(centerCircleWidth) + ea,
                borderRadius: String(centerCircleWidth) + ea,
                background: colorChip.gradientGreen,
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                mode: "svg",
                source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.white),
                style: {
                  width: String(arrowWidth) + ea,
                  height: String(arrowHeight) + ea,
                  display: "inline-flex",
                  position: "relative",
                }
              },
              next: {
                style: {
                  display: "inline-flex",
                  flexDirection: "column",
                  position: "absolute",
                  bottom: String(subBoxMargin) + ea,
                  right: String(subBoxMargin) + ea,
                  textAlign: "right",
                },
                children: [
                  {
                    text: "주방 가구",
                    style: {
                      fontSize: String(subTitleSize) + ea,
                      fontWeight: String(subTitleWeight),
                      color: colorChip.black,
                      position: "relative",
                      marginBottom: String(subTitleMarginBottom) + ea,
                    }
                  },
                  {
                    text: "화이트 필름 시공",
                    style: {
                      fontSize: String(subDescriptionSize) + ea,
                      fontWeight: String(subDescriptionWeight),
                      color: colorChip.black,
                      position: "relative",
                      marginBottom: String(subDescriptionBottom) + ea,
                    }
                  },
                  {
                    text: "주방 상판",
                    style: {
                      fontSize: String(subTitleSize) + ea,
                      fontWeight: String(subTitleWeight),
                      color: colorChip.black,
                      position: "relative",
                      marginBottom: String(subTitleMarginBottom) + ea,
                    }
                  },
                  {
                    text: "밝은 대리석으로 교체",
                    style: {
                      fontSize: String(subDescriptionSize) + ea,
                      fontWeight: String(subDescriptionWeight),
                      color: colorChip.black,
                      position: "relative",
                      marginBottom: String(subDescriptionBottom) + ea,
                    }
                  },
                  {
                    text: "기타 가구 및 소품",
                    style: {
                      fontSize: String(subTitleSize) + ea,
                      fontWeight: String(subTitleWeight),
                      color: colorChip.black,
                      position: "relative",
                      marginBottom: String(subTitleMarginBottom) + ea,
                    }
                  },
                  {
                    text: "디자이너의 스타일링",
                    style: {
                      fontSize: String(subDescriptionSize) + ea,
                      fontWeight: String(subDescriptionWeight),
                      color: colorChip.black,
                      position: "relative",
                    }
                  },
                ]
              }
            }
          },
          {
            style: {
              display: "inline-block",
              height: String(imageHeight) + ea,
              width: String(singleImageWidth) + ea,
              position: "relative",
              borderRadius: String(8) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              backgroundSize: "100% auto",
              backgroundPosition: "50% 50%",
              backgroundImage: "url('" + contents.white.images.after + "')",
            },
            child: {
              style: {
                top: String(markTop) + ea,
                left: String(markLeft) + ea,
                width: String(markWidth) + ea,
                height: String(markHeight) + ea,
                display: "inline-flex",
                position: "absolute",
                borderRadius: String(8) + "px",
                alignItems: "center",
                justifyContent: "center",
                background: colorChip.gradientGreen,
              },
              child: {
                text: "after",
                style: {
                  fontSize: String(markSize) + ea,
                  fontWeight: String(makrWeight),
                  color: colorChip.white,
                  fontFamily: "graphik",
                  fontStyle: "italic",
                  position: "relative",
                  top: String(markTextTop) + ea,
                }
              }
            }
          },
        ]
      },
      {
        style: {
          display: "inline-flex",
          flexDirection: "column",
          position: "absolute",
          top: String(0),
          left: String(0),
          padding: String(toneBoxPaddingLeft) + ea,
          paddingTop: String(toneBoxPaddingTop) + ea,
          paddingBottom: String(toneBoxPaddingTop) + ea,
          alignItems: "start",
          justifyContent: "end",
          background: colorChip.gradientGray,
          borderRadius: String(8) + "px",
        },
        children: [
          {
            text: contents.tone.title,
            style: {
              display: "block",
              position: "relative",
              fontSize: String(toneTitleSize) + ea,
              fontWeight: String(titleWeight),
              color: colorChip.white,
              lineHeight: String(descriptionLineHeight),
              marginBottom: String(titleMarginBottom) + ea,
            }
          },
          {
            text: contents.tone.description.join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(toneDescriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorChip.white,
              lineHeight: String(descriptionLineHeight),
            }
          },
        ]
      },
    ]
  });

  return [ newBaseTong, baseTong ];
}

ServiceDetailJs.prototype.insertConstructBox = function (pastBaseTong, baseTong) {
  const instance = this;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  const newBaseTong = pastBaseTong.cloneNode(false);
  let topMargin;
  let bottomMargin;
  let margin;
  let middleTongPaddingBottom;
  let middleTitleMarginBottom;
  let middleTitleLineTop;
  let middleTitleSize;
  let middleTitleWeight;
  let middleTitlePadding;
  let middleTitleTextTop;
  let middleAreaPaddingTop;
  let middleInfoSize;
  let contents;
  let middleTong;
  let whiteTongMarginTop;
  let whiteBlock0, whiteBlock1, whiteBlock2;
  let whiteBetween;
  let leftBlockWidth, leftBlockMarginRight;
  let titleSize, titleWeight;
  let descriptionSize, descriptionWeight, descriptionLineHeight;
  let descriptionMarginTop;
  let blockBetween, blockBetweenBottom;
  let imageMarginBottom;
  let grayBoxHeight;
  let innerTitleSize, innerTitleWeight, innerTitleLineHeight;
  let innerDescriptionSize, innerDescriptionWeight, innerDescriptionLineHeight;
  let innerDescriptionMarginTop, innerDescriptionTextVisual;
  let freeWidth, freeHeight;
  let freeTextTop;
  let linesTongHeight;
  let linesWidth;
  let blackTongHeight, blackTongHeight2;
  let blackGrayPaddingTop, blackGrayPaddingLeft;
  let blackGrayFactorBetween;
  let blackGrayFactorWhiteHeight, blackGrayFactorGreenHeight;
  let tagBoxHeight;
  let tagDefaultSize, tagDefaultWeight, tagDefaultTextTop;
  let white2StandardPercentage;

  topMargin = <%% 160, 160, 160, 120, 50 %%>;
  bottomMargin = <%% 180, 180, 180, 180, 50 %%>;
  margin = <%% 52, 50, 40, 32, 52 %%>;
  marginTop = <%% 56, 56, 56, 56, 56 %%>;

  middleTongPaddingBottom = <%% 150, 130, 100, 70, 17 %%>;
  middleTitleMarginBottom = <%% 60, 60, 60, 60, 60 %%>;

  middleTitleLineTop = <%% 68, 68, 68, 68, 68 %%>;

  middleTitleSize = <%% 23, 23, 21, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 2 %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;
  middleInfoSize = <%% 14, 14, 14, 13, 3 %%>;

  whiteTongMarginTop = <%% 48, 48, 48, 48, 48 %%>;

  whiteBetween = <%% 12, 12, 12, 12, 12 %%>;

  leftBlockWidth = <%% 302, 302, 302, 302, 302 %%>;
  leftBlockMarginRight = <%% 12, 12, 12, 12, 12 %%>;

  titleSize = <%% 14, 14, 14, 14, 14 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  descriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  descriptionMarginTop = <%% 6, 6, 6, 6, 6 %%>;

  blockBetween = <%% 12, 12, 12, 12, 12 %%>;
  blockBetweenBottom = <%% 3, 3, 3, 3, 3 %%>;
  imageMarginBottom = <%% 20, 20, 20, 20, 20 %%>;
  grayBoxHeight = <%% 120, 120, 120, 120, 120 %%>;

  innerTitleSize = <%% 15, 15, 15, 15, 15 %%>;
  innerTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  innerTitleLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  innerDescriptionSize = <%% 13, 13, 13, 13, 13 %%>;
  innerDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  innerDescriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  innerDescriptionMarginTop = <%% 4, 4, 4, 4, 4 %%>;
  innerDescriptionTextVisual = <%% 2, 2, 2, 2, 2 %%>;

  freeWidth = <%% 180, 180, 180, 180, 180 %%>;
  freeHeight = <%% 42, 42, 42, 42, 42 %%>;
  freeTextTop = <%% -2, -2, -2, -2, -2 %%>;

  linesTongHeight = <%% 48, 48, 48, 48, 48 %%>;
  linesWidth = <%% 660, 660, 660, 660, 660 %%>;

  blackTongHeight = <%% 52, 52, 52, 52, 52 %%>;
  blackTongHeight2 = <%% 42, 42, 42, 42, 42 %%>;

  blackGrayPaddingTop = <%% 20, 20, 20, 20, 20 %%>;
  blackGrayPaddingLeft = <%% 25, 25, 25, 25, 25 %%>;

  blackGrayFactorBetween = <%% 4, 4, 4, 4, 4 %%>;

  blackGrayFactorWhiteHeight = <%% 12, 12, 12, 12, 12 %%>;
  blackGrayFactorGreenHeight = <%% 12, 12, 12, 12, 12 %%>;

  tagBoxHeight = <%% 140, 140, 140, 140, 140 %%>;
  tagDefaultSize = <%% 24, 24, 24, 24, 24 %%>;
  tagDefaultWeight = <%% 200, 200, 200, 200, 200 %%>;
  tagDefaultTextTop = <%% -2, -2, -2, -2, -2 %%>;

  white2StandardPercentage = <%% 11, 11, 11, 11, 11 %%>;

  pastBaseTong.parentNode.insertBefore(newBaseTong, pastBaseTong.nextElementSibling);
  newBaseTong.style.left = String(0);
  newBaseTong.style.width = withOut(0, ea);
  newBaseTong.style.background = colorChip.gray3;
  newBaseTong.style.paddingTop = String(topMargin) + ea;

  contents = {
    title: "신뢰할 수 있는 시공사",
    description: [
      "믿을 수 있는 홈리에종 시공사와 함께",
      "편안하고 안정적인 전체 시공을 경험해보세요!",
    ],
    white0: {
      title: "이제 시공 걱정하지 마세요!",
      description: [
        "이제 시공 걱정하실 필요 없습니다.",
        "고객과의 편리하고 적극적인 소통,",
        "안심 AS, 안정적인 결제 프로세스를",
        "갖춘 홈리에종 시공사와 안심 시공하세요. ",
      ],
      factors: [
        {
          image: ServiceDetailJs.binaryPath + "/constructure0.png",
          title: "적극적인 소통",
          description: [
            "홈리에종과 직영 시공사, 디자이너가 모두",
            "참여된 단톡방을 만들어 체크합니다.",
          ]
        },
        {
          image: ServiceDetailJs.binaryPath + "/constructure1.png",
          title: "안심 AS",
          description: [
            "홈리에종 시공사는 1년 무상 책임 AS과",
            "확실한 사후 처리를 해드립니다.",
          ]
        },
        {
          image: ServiceDetailJs.binaryPath + "/constructure2.png",
          title: "안정적인 결제",
          description: [
            "홈리에종을 거쳐 프로젝트 완료 확인 시",
            "시스템을 통한 안정적 결제가 이루어집니다.",
          ]
        },
      ]
    },
    white1: {
      title: "인테리어 프로세스 경험",
      description: [
        "고객님에게는 시공사 선택의 자유가",
        "있습니다. 디자이너 시공사, 또는 직접",
        "컨택한 시공사와 진행하실 수 있으며",
        "믿을 수 있는 홈리에종의 시공사와의",
        "확실한 인테리어를 경험하세요.",
      ],
      diagram: {
        title: "시공사 선택의 자유",
        properties: [
          "시공사 신뢰도",
          "디자이너 참여",
          "홈리에종 케어",
          "시공 견적",
        ],
        factors: [
          { title: "홈리에종 시공사", values: [ 0.95, 0.95, 0.95, 0.95 ] },
          { title: "디자이너 시공사", values: [ 0.95, 0.95, 0.35, 0.8 ] },
          { title: "기타 외부 시공사", values: [ 0.5, 0.2, 0.1, 0.2 ] },
        ]
      }
    },
    white2: {
      title: "서비스별 시공 정도",
      description: [
        "홈리에종의 스타일링 서비스 유형은 3가지로",
        "나뉘어집니다. 각 유형 별 구분은 시공의",
        "정도와 범위에 따라 구분되며, 서비스 별",
        "발생하는 비용에 차이가 있습니다. ",
        "우리 집에 필요한 시공은 어느정도일까요? ",
      ],
      standard: [
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
        "기타"
      ],
      factors: [
        {
          title: "홈퍼니싱",
          service: [
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
          ]
        },
        {
          title: "홈스타일링",
          service: [
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
          ]
        },
        {
          title: "토탈 스타일링",
          service: [
            "전체 철거",
            "해당 면적",
            "모든 종류의 목공",
            "전체 배선 및 조명 교체",
            "전체 철거 및 교체",
            "마루 / 장판 / 타일",
            "기본 철거 및 전체 공사",
            "전체 철거 및 전체 공사",
            "전체 제공",
            "전체 제공",
            "중문 교체",
            "모든 종류의 제작 가구",
            "발코니 확장",
            "금속, 샤시 등"
          ]
        },
      ],
      default: "서비스명을 클릭해주세요!",
    }
  };

  baseTong = createNode({
    mother: newBaseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      paddingBottom: String(bottomMargin) + ea,
    }
  });

  middleTong = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0 * 2, ea),
    }
  });

  createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      width: String(100) + '%',
      textAlign: "center",
    },
    children: [
      {
        style: {
          display: "block",
          position: "absolute",
          width: String(100) + '%',
          height: String(middleTitleLineTop) + ea,
          top: String(0),
          left: String(0),
          borderBottom: "1px solid " + colorChip.gray4,
        }
      },
      {
        text: contents.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          top: String(middleTitleTextTop) + ea,
          background: colorChip.gray3,
        }
      },
      {
        text: contents.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          paddingLeft: String(middleTitlePadding * 1.5) + ea,
          paddingRight: String(middleTitlePadding * 1.5) + ea,
          background: colorChip.gray3,
        },
        bold: {
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(700),
          lineHeight: String(1.6),
          color: colorChip.black,
        }
      }
    ]
  });

  // 1

  whiteBlock0 = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      flexDirection: "row",
      marginTop: String(whiteTongMarginTop) + ea,
      width: withOut(margin * 2, ea),
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingTop: String(marginTop) + ea,
      paddingBottom: String(marginTop) + ea,
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      borderRadius: String(8) + "px",
    }
  });
  createNode({
    mother: whiteBlock0,
    style: {
      display: "inline-flex",
      position: "relative",
      flexDirection: "column",
      width: String(leftBlockWidth) + ea,
      marginRight: String(leftBlockMarginRight) + ea,
      alignItems: "start",
      justifyContent: "end",
    },
    children: [
      {
        text: contents.white0.title,
        style: {
          display: "block",
          position: "relative",
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
        }
      },
      {
        text: contents.white0.description.join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(titleSize) + ea,
          fontWeight: String(descriptionWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
          marginTop: String(descriptionMarginTop) + ea,
        }
      },
    ]
  });
  createNode({
    mother: whiteBlock0,
    style: {
      display: "inline-flex",
      position: "relative",
      flexDirection: "row",
      width: withOut(leftBlockWidth + leftBlockMarginRight, ea),
    },
    children: contents.white0.factors.map(({ image, title, description }, index) => {
      return {
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "column",
          width: "calc(calc(100% - " + String(blockBetween * (contents.white0.factors.length - 1)) + ea + ") / " + String(contents.white0.factors.length) + ")",
          marginRight: String(index === contents.white0.factors.length - 1 ? 0 : blockBetween) + ea,
        },
        children: [
          {
            mode: "img",
            attribute: { src: image },
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              marginBottom: String(imageMarginBottom) + ea,
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "column",
              borderRadius: String(8) + "px",
              background: colorChip.gray1,
              width: withOut(0, ea),
              height: String(grayBoxHeight) + ea,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            },
            children: [
              {
                text: title,
                style: {
                  fontSize: String(innerTitleSize) + ea,
                  fontWeight: String(innerTitleWeight),
                  lineHeight: String(innerTitleLineHeight),
                  color: colorChip.black,
                  position: "relative",
                  display: "block",
                }
              },
              {
                text: description.join("\n"),
                style: {
                  position: "relative",
                  display: "block",
                  fontSize: String(innerDescriptionSize) + ea,
                  fontWeight: String(innerDescriptionWeight),
                  lineHeight: String(innerDescriptionLineHeight),
                  color: colorChip.black,
                  marginTop: String(innerDescriptionMarginTop) + ea,
                  marginBottom: String(innerDescriptionTextVisual) + ea,
                }
              }
            ]
          }
        ]
      };
    }),
  });


  // 2

  whiteBlock1 = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      flexDirection: "row",
      marginTop: String(whiteBetween) + ea,
      width: withOut(margin * 2, ea),
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingTop: String(marginTop) + ea,
      paddingBottom: String(marginTop) + ea,
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      borderRadius: String(8) + "px",
    }
  });
  createNode({
    mother: whiteBlock1,
    style: {
      display: "inline-flex",
      position: "relative",
      flexDirection: "column",
      width: String(leftBlockWidth) + ea,
      marginRight: String(leftBlockMarginRight) + ea,
      alignItems: "start",
      justifyContent: "end",
    },
    children: [
      {
        text: contents.white1.title,
        style: {
          display: "block",
          position: "relative",
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
        }
      },
      {
        text: contents.white1.description.join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(titleSize) + ea,
          fontWeight: String(descriptionWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
          marginTop: String(descriptionMarginTop) + ea,
        }
      },
    ]
  })
  createNode({
    mother: whiteBlock1,
    style: {
      display: "inline-flex",
      position: "relative",
      flexDirection: "column",
      width: withOut(leftBlockWidth + leftBlockMarginRight, ea),
    },
    children: [
      {
        style: {
          display: "flex",
          width: withOut(0, ea),
          position: "relative",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          style: {
            width: String(freeWidth) + ea,
            height: String(freeHeight) + ea,
            background: colorChip.gradientGreen,
            borderRadius: String(freeHeight) + ea,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          },
          child: {
            text: contents.white1.diagram.title,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(freeTextTop) + ea,
              fontSize: String(innerTitleSize) + ea,
              fontWeight: String(innerTitleWeight),
              color: colorChip.white,
            }
          }
        }
      },
      {
        style: {
          display: "flex",
          width: withOut(0, ea),
          height: String(linesTongHeight) + ea,
          position: "relative",
          flexDirection: "column",
          justifyContent: "end",
          alignItems: "center",
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(linesWidth) + ea,
              height: withOut(50, 0, ea),
              borderTop: "1px solid " + colorChip.gray4,
              borderRight: "1px solid " + colorChip.gray4,
              borderLeft: "1px solid " + colorChip.gray4,
              borderTopLeftRadius: String(8) + "px",
              borderTopRightRadius: String(8) + "px",
            }
          },
          {
            style: {
              position: "absolute",
              height: withOut(0, ea),
              width: String(0),
              left: withOut(50, 0, ea),
              top: String(0),
              borderRight: "1px solid " + colorChip.gray4,
            }
          }
        ]
      },
      {
        style: {
          display: "flex",
          flexDirection: "row",
          width: withOut(0, ea),
          position: "relative",
        },
        children: contents.white1.diagram.factors.map(({ title, values }, index) => {
          return {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "column",
              width: "calc(calc(100% - " + String(blockBetween * (contents.white1.diagram.factors.length - 1)) + ea + ") / " + String(contents.white1.diagram.factors.length) + ")",
              marginRight: String(index === contents.white1.diagram.factors.length - 1 ? 0 : blockBetween) + ea,
            },
            children: [
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  borderTopLeftRadius: String(8) + "px",
                  borderTopRightRadius: String(8) + "px",
                  background: colorChip.black,
                  width: withOut(0, ea),
                  height: String(blackTongHeight) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                },
                children: [
                  {
                    text: title,
                    style: {
                      fontSize: String(innerTitleSize) + ea,
                      fontWeight: String(innerTitleWeight),
                      lineHeight: String(innerTitleLineHeight),
                      color: colorChip.white,
                      position: "relative",
                      display: "block",
                      top: String(freeTextTop) + ea,
                    }
                  },
                ]
              },
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: String(blackGrayPaddingTop) + ea,
                  paddingBottom: String(blackGrayPaddingTop - blackGrayFactorBetween) + ea,
                  width: withOut(blackGrayPaddingLeft * 2, ea),
                  borderBottomLeftRadius: String(8) + "px",
                  borderBottomRightRadius: String(8) + "px",
                  paddingLeft: String(blackGrayPaddingLeft) + ea,
                  paddingRight: String(blackGrayPaddingLeft) + ea,
                  background: colorChip.gray1,
                },
                children: values.map((number, index) => {
                  const property = contents.white1.diagram.properties[index];
                  return {
                    style: {
                      display: "flex",
                      flexDirection: "row",
                      position: "relative",
                      width: withOut(0, ea),
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: String(blackGrayFactorBetween) + ea,
                    },
                    children: [
                      {
                        text: property,
                        style: {
                          display: "inline-block",
                          position: "relative",
                          fontSize: String(innerDescriptionSize) + ea,
                          fontWeight: String(700),
                          color: colorChip.black,
                          width: String(100) + ea,
                        }
                      },
                      {
                        style: {
                          display: "inline-block",
                          position: "relative",
                          width: withOut(100, ea),
                          height: String(blackGrayFactorWhiteHeight) + ea,
                          background: colorChip.white,
                          borderRadius: String(blackGrayFactorWhiteHeight) + ea,
                          overflow: "hidden",
                        },
                        child: {
                          position: "absolute",
                          left: String(0),
                          top: String((blackGrayFactorWhiteHeight - blackGrayFactorGreenHeight) / 2) + ea,
                          height: String(blackGrayFactorGreenHeight) + ea,
                          width: String(100 * number) + '%',
                          borderRadius: String(blackGrayFactorGreenHeight) + ea,
                          background: colorChip.gradientGreen,
                        }
                      }
                    ]
                  };
                })
              }
            ]
          };
        }),
      }
    ]
  });


  // 3

  whiteBlock2 = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      flexDirection: "row",
      marginTop: String(whiteBetween) + ea,
      width: withOut(margin * 2, ea),
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingTop: String(marginTop) + ea,
      paddingBottom: String(marginTop) + ea,
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      borderRadius: String(8) + "px",
    }
  });
  createNode({
    mother: whiteBlock2,
    style: {
      display: "inline-flex",
      position: "relative",
      flexDirection: "column",
      width: String(leftBlockWidth) + ea,
      marginRight: String(leftBlockMarginRight) + ea,
      alignItems: "start",
      justifyContent: "end",
    },
    children: [
      {
        text: contents.white2.title,
        style: {
          display: "block",
          position: "relative",
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
        }
      },
      {
        text: contents.white2.description.join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(titleSize) + ea,
          fontWeight: String(descriptionWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
          marginTop: String(descriptionMarginTop) + ea,
        }
      },
    ]
  })
  createNode({
    mother: whiteBlock2,
    style: {
      display: "inline-flex",
      position: "relative",
      flexDirection: "column",
      width: withOut(leftBlockWidth + leftBlockMarginRight, ea),
    },
    children: [
      {
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          width: withOut(0, ea),
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "relative",
              flexDirection: "column",
              width: String(white2StandardPercentage) + '%',
            },
            children: [
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: String(8) + "px",
                  background: colorChip.black,
                  width: withOut(blockBetweenBottom, ea),
                  height: String(blackTongHeight2) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginBottom: String(blockBetweenBottom) + ea,
                },
                child: {
                  text: "구분",
                  style: {
                    position: "relative",
                    top: String(freeTextTop) + ea,
                    fontSize: String(innerTitleSize) + ea,
                    fontWeight: String(innerTitleWeight),
                    lineHeight: String(innerTitleLineHeight),
                    color: colorChip.white,
                    position: "relative",
                    display: "block",
                  }
                }
              }
            ].concat(contents.white2.standard.map((str) => {
              return {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: String(8) + "px",
                  background: colorChip.darkShadow,
                  width: withOut(blockBetweenBottom, ea),
                  height: String(blackTongHeight2) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginBottom: String(blockBetweenBottom) + ea,
                },
                child: {
                  text: str,
                  style: {
                    position: "relative",
                    top: String(freeTextTop) + ea,
                    fontSize: String(innerTitleSize) + ea,
                    fontWeight: String(innerTitleWeight),
                    lineHeight: String(innerTitleLineHeight),
                    color: colorChip.white,
                    position: "relative",
                    display: "block",
                  }
                }
              }
            })),
          }
        ].concat(contents.white2.factors.map(({ title, service }, index) => {
          const greenBoo = [ "furnishing", "styling", "total" ].findIndex((str) => { return str === instance.mode }) === index;
          return {
            style: {
              display: "inline-flex",
              position: "relative",
              flexDirection: "column",
              width: "calc(calc(" + String(100 - white2StandardPercentage) + "% - " + String(blockBetweenBottom * (contents.white0.factors.length - 1)) + ea + ") / " + String(contents.white0.factors.length) + ")",
              marginRight: String(index === contents.white0.factors.length - 1 ? 0 : blockBetweenBottom) + ea,
            },
            children: [
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: String(8) + "px",
                  background: greenBoo ? colorChip.gradientGreen : colorChip.black,
                  width: withOut(0, ea),
                  height: String(blackTongHeight2) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginBottom: String(blockBetweenBottom) + ea,
                },
                children: [
                  {
                    text: title,
                    style: {
                      position: "relative",
                      top: String(freeTextTop) + ea,
                      fontSize: String(innerTitleSize) + ea,
                      fontWeight: String(innerTitleWeight),
                      lineHeight: String(innerTitleLineHeight),
                      color: colorChip.white,
                      position: "relative",
                      display: "block",
                    }
                  },
                ]
              }
            ].concat(service.map((str) => {
              return {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: String(8) + "px",
                  background: greenBoo ? colorChip.gray0 : colorChip.gray1,
                  width: withOut(0, ea),
                  height: String(blackTongHeight2) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginBottom: String(blockBetweenBottom) + ea,
                },
                child: {
                  text: str,
                  style: {
                    position: "relative",
                    top: String(freeTextTop) + ea,
                    fontSize: String(innerTitleSize) + ea,
                    fontWeight: String(500),
                    lineHeight: String(innerTitleLineHeight),
                    color: /없음/gi.test(str) ? colorChip.deactive : (greenBoo ? colorChip.green : colorChip.black),
                    position: "relative",
                    display: "block",
                  }
                }
              }
            }))
          };
        })),
      },
    ]
  })

  return [ newBaseTong, baseTong ];
}

ServiceDetailJs.prototype.insertCareBox = function (pastBaseTong, baseTong) {
  const instance = this;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  const newBaseTong = pastBaseTong.cloneNode(false);
  let topMargin;
  let bottomMargin;
  let margin;
  let middleTongPaddingBottom;
  let middleTitleMarginBottom;
  let middleTitleLineTop;
  let middleTitleSize;
  let middleTitleWeight;
  let middleTitlePadding;
  let middleTitleTextTop;
  let middleAreaPaddingTop;
  let middleInfoSize;
  let contents;
  let middleTong;
  let whiteBlock;
  let whiteTongMarginTop;
  let blankMiddle;
  let workBox;
  let grayBlocksMother;
  let leftWidth;
  let grayBetween;
  let grayBoxNumbers;
  let grayHeight0, grayHeight1;
  let box0Size, box0Weight, box0TextTop;
  let circleWidth;
  let titleSize, titleWeight, titleLineHeight;
  let descriptionSize, descriptionWeight, descriptionMarginTop;
  let box1Size0, box1Weight0, box1Size1, box1Weight1;
  let box1TitleMarginTop, box1TitleMarginBottom, box1DescriptionBottomVisual;
  let box2LineWidth, box2LineMargin;

  topMargin = <%% 160, 160, 160, 120, 50 %%>;
  bottomMargin = <%% 180, 180, 180, 180, 50 %%>;
  margin = <%% 52, 50, 40, 32, 52 %%>;
  marginTop = <%% 56, 56, 56, 56, 56 %%>;

  middleTongPaddingBottom = <%% 150, 130, 100, 70, 17 %%>;
  middleTitleMarginBottom = <%% 60, 60, 60, 60, 60 %%>;

  middleTitleLineTop = <%% 68, 68, 68, 68, 68 %%>;

  middleTitleSize = <%% 23, 23, 21, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 2 %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;
  middleInfoSize = <%% 14, 14, 14, 13, 3 %%>;

  whiteTongMarginTop = <%% 48, 48, 48, 48, 48 %%>;

  leftWidth = <%% 390, 390, 390, 390, 390 %%>;

  grayBetween = <%% 10, 10, 10, 10, 10 %%>;

  grayBoxNumbers = <%% 5, 5, 5, 5, 5 %%>;

  grayHeight0 = <%% 56, 56, 56, 56, 56 %%>;
  grayHeight1 = <%% 240, 240, 240, 240, 240 %%>;

  box0Size = <%% 15, 15, 15, 15, 15 %%>;
  box0Weight = <%% 700, 700, 700, 700, 700 %%>;
  box0TextTop = <%% -1, -1, -1, -1, -1 %%>;

  circleWidth = <%% 108, 108, 108, 108, 108 %%>;

  titleSize = <%% 17, 17, 17, 17, 17 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  descriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionMarginTop = <%% 12, 12, 12, 12, 12 %%>;

  box1Size0 = <%% 14, 14, 14, 14, 14 %%>;
  box1Weight0 = <%% 800, 800, 800, 800, 800 %%>;

  box1Size1 = <%% 12, 12, 12, 12, 12 %%>;
  box1Weight1 = <%% 400, 400, 400, 400, 400 %%>;

  box1TitleMarginTop = <%% 16, 16, 16, 16, 16 %%>;
  box1TitleMarginBottom = <%% 4, 4, 4, 4, 4 %%>;
  box1DescriptionBottomVisual = <%% 1, 1, 1, 1, 1 %%>;

  box2LineWidth = <%% 684, 684, 684, 684, 684 %%>;
  box2LineMargin = <%% 20, 20, 20, 20, 20 %%>;

  pastBaseTong.parentNode.insertBefore(newBaseTong, pastBaseTong.nextElementSibling);
  newBaseTong.style.left = String(0);
  newBaseTong.style.width = withOut(0, ea);
  newBaseTong.style.background = colorChip.white;
  newBaseTong.style.paddingTop = String(topMargin) + ea;

  contents = {
    title: "홈리에종의 프로젝트 케어",
    description: [
      "홈리에종은 프로젝트의 처음과 마무리까지의 전 과정 케어를 진행합니다.",
      "처음이어서, 몰라서 어려웠던 인테리어 과정을 홈리에종과 함께 해요.",
    ],
    work: {
      title: "디자이너는 진행 단계별\n‘이렇게’ 제공해요.",
      description: [
        "디자이너는 다음과 같은 단계별",
        "페이퍼워크 제공을 통해 소통합니다.",
      ],
      box0: [
        "STEP 1. 프로젝트 기획",
        "STEP 2. 디자인",
        "STEP 3. 구매",
      ],
      box1: [
        {
          image: ServiceDetailJs.binaryPath + "/workPaper0.svg",
          title: "디자인 제안서",
          description: [
            "계약 기간 기준의",
            "전체 일정 캘린더",
          ],
        },
        {
          image: ServiceDetailJs.binaryPath + "/workPaper1.svg",
          title: "제품 제안",
          description: [
            "프로젝트에 반영될",
            "컨셉 디자인",
          ],
        },
        {
          image: ServiceDetailJs.binaryPath + "/workPaper2.svg",
          title: "배치도",
          description: [
            "시공 포함된",
            "서비스 진행 시 해당",
          ],
        },
        {
          image: ServiceDetailJs.binaryPath + "/workPaper3.svg",
          title: "컨셉 제안서",
          description: [
            "공간별 구성 및",
            "가구/소품 배치 도면",
          ],
        },
        {
          image: ServiceDetailJs.binaryPath + "/workPaper4.svg",
          title: "일정표",
          description: [
            "기존 제품 활용 제안 및",
            "새 제품 구매 리스트",
          ],
        },
      ],
      box2: "+ 홈리에종의 토탈 케어",
    },
  };

  baseTong = createNode({
    mother: newBaseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      paddingBottom: String(bottomMargin) + ea,
    }
  });

  middleTong = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0 * 2, ea),
    }
  });

  createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      width: String(100) + '%',
      textAlign: "center",
    },
    children: [
      {
        style: {
          display: "block",
          position: "absolute",
          width: String(100) + '%',
          height: String(middleTitleLineTop) + ea,
          top: String(0),
          left: String(0),
          borderBottom: "1px solid " + colorChip.gray4,
        }
      },
      {
        text: contents.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          top: String(middleTitleTextTop) + ea,
          background: colorChip.white,
        }
      },
      {
        text: contents.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          paddingLeft: String(middleTitlePadding * 1.5) + ea,
          paddingRight: String(middleTitlePadding * 1.5) + ea,
          background: colorChip.white,
        },
        bold: {
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(700),
          lineHeight: String(1.6),
          color: colorChip.black,
        }
      }
    ]
  });

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      flexDirection: "column",
      marginTop: String(whiteTongMarginTop) + ea,
      width: withOut(margin * 2, ea),
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingTop: String(marginTop) + ea,
      paddingBottom: String(marginTop) + ea,
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      borderRadius: String(8) + "px",
    }
  });

  createNode({
    mother: whiteBlock,
    mode: "img",
    attribute: {
      src: ServiceDetailJs.binaryPath + "/careBox.svg",
    },
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      height: "auto",
    }
  });

  blankMiddle = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      height: String(marginTop) + ea,
    }
  });

  workBox = createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "row",
      width: withOut(0, ea),
    }
  });

  createNode({
    mother: workBox,
    style: {
      display: "inline-flex",
      position: "relative",
      flexDirection: "column",
      width: String(leftWidth) + ea,
    },
    children: [
      {
        text: contents.work.title,
        style: {
          position: "relative",
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          color: colorChip.black,
          lineHeight: String(titleLineHeight),
        }
      },
      {
        text: contents.work.description.join("\n"),
        style: {
          position: "relative",
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionWeight),
          color: colorChip.black,
          lineHeight: String(1.6),
          marginTop: String(descriptionMarginTop) + ea,
        }
      }
    ]
  })

  grayBlocksMother = createNode({
    mother: workBox,
    style: {
      display: "inline-block",
      position: "relative",
      width: withOut(leftWidth, ea),
    }
  });

  // box0 - 3
  for (let i = 0; i < contents.work.box0.length; i++) {
    createNode({
      mother: grayBlocksMother,
      style: {
        display: "inline-flex",
        width: i === contents.work.box0.length - 1 ? "calc(calc(100% - " + String(grayBetween * (grayBoxNumbers - 1)) + ea + ") / " + String(grayBoxNumbers) + ")" : "calc(calc(calc(calc(100% - " + String(grayBetween * (grayBoxNumbers - 1)) + ea + ") / " + String(grayBoxNumbers) + ") * " + String(2) + ") + " + String(grayBetween * 1) + ea + ")",
        height: String(grayHeight0) + ea,
        background: colorChip.gray1,
        borderRadius: String(8) + "px",
        marginRight: String(i === contents.work.box0.length - 1 ? 0 : grayBetween) + ea,
        marginBottom: String(grayBetween) + ea,
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: "top",
      },
      child: {
        text: contents.work.box0[i],
        style: {
          fontSize: String(box0Size) + ea,
          fontWeight: String(box0Weight),
          color: colorChip.black,
          position: "relative",
          top: String(box0TextTop) + ea,
        }
      }
    });
  }

  // box1 - 5
  for (let i = 0; i < contents.work.box1.length; i++) {
    createNode({
      mother: grayBlocksMother,
      style: {
        display: "inline-flex",
        width: "calc(calc(100% - " + String(grayBetween * (grayBoxNumbers - 1)) + ea + ") / " + String(grayBoxNumbers) + ")",
        height: String(grayHeight1) + ea,
        background: colorChip.gray1,
        borderRadius: String(8) + "px",
        marginRight: String(i === contents.work.box1.length - 1 ? 0 : grayBetween) + ea,
        marginBottom: String(grayBetween) + ea,
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: "top",
        flexDirection: "column",
        textAlign: "center",
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleWidth) + ea,
            height: String(circleWidth) + ea,
            borderRadius: String(circleWidth) + ea,
            background: colorChip.gray3,
            textAlign: "center",
            overflow: "hidden",
          },
          child: {
            mode: "img",
            attribute: {
              src: contents.work.box1[i].image
            },
            style: {
              display: "block",
              position: "relative",
              top: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
            }
          }
        },
        {
          text: contents.work.box1[i].title,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(box1Size0) + ea,
            fontWeight: String(box1Weight0),
            color: colorChip.black,
            textAlign: "center",
            marginTop: String(box1TitleMarginTop) + ea,
            marginBottom: String(box1TitleMarginBottom) + ea,
          }
        },
        {
          text: contents.work.box1[i].description.join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(box1Size1) + ea,
            fontWeight: String(box1Weight1),
            color: colorChip.black,
            textAlign: "center",
            marginBottom: String(box1DescriptionBottomVisual) + ea,
          }
        },
      ]
    })
  }

  // box2 - 1
  createNode({
    mother: grayBlocksMother,
    style: {
      display: "inline-flex",
      flexDirection: "row",
      width: withOut(0, ea),
      height: String(grayHeight0) + ea,
      background: colorChip.gray1,
      borderRadius: String(8) + "px",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    },
    child: {
      text: contents.work.box2,
      style: {
        fontSize: String(box0Size) + ea,
        fontWeight: String(box0Weight),
        color: colorChip.green,
        position: "relative",
        top: String(box0TextTop) + ea,
      },
      previous: {
        style: {
          display: "inline-block",
          position: "relative",
          marginRight: String(box2LineMargin) + ea,
          width: String(box2LineWidth) + ea,
          height: String(0),
          borderBottom: "1px dashed " + colorChip.green
        }
      }
    }
  })


  return [ newBaseTong, baseTong ];
}

ServiceDetailJs.prototype.insertWithBox = function (pastBaseTong, baseTong) {
  const instance = this;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker, selfHref, cleanChildren } = GeneralJs;
  const newBaseTong = pastBaseTong.cloneNode(false);
  const box1ButtonTargetsClassName = "box1ButtonTargetsClassName";
  let topMargin;
  let bottomMargin;
  let margin;
  let middleTongPaddingBottom;
  let middleTitleMarginBottom;
  let middleTitleLineTop;
  let middleTitleSize;
  let middleTitleWeight;
  let middleTitlePadding;
  let middleTitleTextTop;
  let middleAreaPaddingTop;
  let middleInfoSize;
  let contents;
  let middleTong;
  let whiteTongMarginTop;
  let baseBlock;
  let box0Width;
  let boxBetween;
  let box1Width;
  let totalHeight;
  let box1InnerMargin;
  let innerMargin;
  let box0Size, box0Weight, box0TextTop, box0LineHeight;
  let box1TextTop, box1Size, box1Weight, box1LightWeight;
  let buttonWidth, buttonHeight;
  let box2Size;
  let buttonTextTop;
  let box2LineTop, box2LineBottom;
  let box2DetailPaddingTop;
  let box2DetailBetween;
  let box2NumberWidth;
  let box2Weight;
  let box2DescriptionWeight, box2DescriptionLineHeight;
  let box2NumberWeight, box2DetailWeight;
  let buttonBase;
  let buttonBaseHeight;
  let finalButtonWidth, finalButtonHeight;
  let buttonSize, buttonWeight, finalButtonTextTop;
  let box0, box1, box2;
  let box2Set0, box2Set1, box2Set2, box2Set3;

  topMargin = <%% 160, 160, 160, 120, 50 %%>;
  bottomMargin = <%% 180, 180, 180, 180, 50 %%>;
  margin = <%% 52, 50, 40, 32, 52 %%>;
  marginTop = <%% 56, 56, 56, 56, 56 %%>;

  middleTongPaddingBottom = <%% 150, 130, 100, 70, 17 %%>;
  middleTitleMarginBottom = <%% 60, 60, 60, 60, 60 %%>;

  middleTitleLineTop = <%% 68, 68, 68, 68, 68 %%>;

  middleTitleSize = <%% 23, 23, 21, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 2 %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;
  middleInfoSize = <%% 14, 14, 14, 13, 3 %%>;

  whiteTongMarginTop = <%% 48, 48, 48, 48, 48 %%>;

  box0Width = <%% 170, 170, 170, 170, 170 %%>;
  box1Width = <%% 410, 410, 410, 410, 410 %%>;

  box1InnerMargin = <%% 45, 45, 45, 45, 45 %%>;

  boxBetween = <%% 10, 10, 10, 10, 10 %%>;

  totalHeight = <%% 400, 400, 400, 400, 400 %%>;

  innerMargin = <%% 48, 48, 48, 48, 48 %%>;

  box0Size = <%% 19, 19, 19, 19, 19 %%>;
  box0Weight = <%% 800, 800, 800, 800, 800 %%>;
  box0TextTop = <%% -1, -1, -1, -1, -1 %%>;
  box0LineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  box1TextTop = <%% -1, -1, -1, -1, -1 %%>;
  box1Size = <%% 18, 18, 18, 18, 18 %%>;
  box1Weight = <%% 700, 700, 700, 700, 700 %%>;
  box1LightWeight = <%% 300, 300, 300, 300, 300 %%>;

  buttonWidth = <%% 190, 190, 190, 190, 190 %%>;
  buttonHeight = <%% 40, 40, 40, 40, 40 %%>;

  box2Size = <%% 15, 15, 15, 15, 15 %%>;
  buttonTextTop = <%% -1, -1, -1, -1, -1 %%>;

  box2LineTop = <%% 36, 36, 36, 36, 36 %%>;
  box2LineBottom = <%% 16, 16, 16, 16, 16 %%>;

  box2DetailPaddingTop = <%% 22, 22, 22, 22, 22 %%>;

  box2DetailBetween = <%% 24, 24, 24, 24, 24 %%>;
  box2NumberWidth = <%% 48, 48, 48, 48, 48 %%>;

  box2Weight = <%% 800, 800, 800, 800, 800 %%>;

  box2DescriptionWeight = <%% 600, 600, 600, 600, 600 %%>;
  box2DescriptionLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

  box2NumberWeight = <%% 500, 500, 500, 500, 500 %%>;
  box2DetailWeight = <%% 600, 600, 600, 600, 600 %%>;

  buttonBaseHeight = <%% 150, 150, 150, 150, 150 %%>;
  finalButtonWidth = <%% 140, 140, 140, 140, 140 %%>;
  finalButtonHeight = <%% 48, 48, 48, 48, 48 %%>;
  buttonSize = <%% 18, 18, 18, 18, 18 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
  finalButtonTextTop = <%% -2, -2, -2, -2, -2 %%>;

  box2 = {};
  box2Set0 = () => {}
  box2Set1 = () => {}
  box2Set2 = () => {}
  box2Set3 = () => {}

  pastBaseTong.parentNode.insertBefore(newBaseTong, pastBaseTong.nextElementSibling);
  newBaseTong.style.left = String(0);
  newBaseTong.style.width = withOut(0, ea);
  newBaseTong.style.background = colorChip.gray1;
  newBaseTong.style.paddingTop = String(topMargin) + ea;

  contents = {
    title: "처음부터 끝까지, 홈리에종과 함께",
    description: [
       "상담부터 가구 배치가 완료되는 과정이 보편적으로 1달 반 정도 소요됩니다. 상담 문의는",
       "소요되는 기간을 고려하여 미리 문의 주시면 디자이너의 선택 폭이 넓어집니다.",
    ],
    box0: "홈리에종\n케어",
    box1: [
      "홈리에종 상담 신청",
      "스타일링",
      "시공 / 구매",
      "촬영 / 현장 인터뷰",
    ],
    box2: {
      set0: {
        button: "홈리에종에 상담 신청 하기",
        description: [
          "홈페이지 간편 상담 신청 접수 후,",
          "홈리에종 전담 매니저가 1-2일 내 유선 상담을 진행합니다.",
        ],
        detail: [
          "나와 Fit 이 맞는 디자이너 추천",
          "서비스 계약 안내,  디자이너 미팅 어레인지",
          "off - 디자이너 현장 미팅, 실측 / on - 비대면 미팅, 고객 직접 실측",
        ]
      },
      set1: {
        button: "디자이너와 홈스타일링",
        description: [
          "디자이너와 현장 미팅을 진행한 후,",
          "디자이너가 디자인을 진행하는 단계입니다. 1 ~ 3주의 시간이 소요됩니다.",
        ],
        detail: [
          "현장 미팅 이후, 작업 기간 및 프로세스 안내",
          "컨셉 제안서, 디자인 제안서, 배치도, 구매 리스트, 시공 디자인 제안",
          "제안서 수정 및 추가 추천, 필요에 따라 대면 미팅 진행",
        ]
      },
      set2: {
        button: "시공, 제안 가구 구매 진행",
        description: [
          "디자이너와 시공 범위 조정 및 디자인을 마친 후,",
          "실질적으로 시공을 진행하고 가구를 구매하는 과정입니다.",
        ],
        detail: [
          "시공사 시공 준비 및 진행 및 시공 감리",
          "추천 가구 리스트를 보며 가구 및 소품을 고객 직접 구입",
          "구입한 가구 및 소품, 제품 배치도에 따라 1차 직접 배치",
        ]
      },
      set3: {
        button: "촬영 및 홈리에종 인터뷰",
        description: [
          "시공과 제품 구매 및 배치가 모두 완료되고",
          "홈리에종이 현장을 확인하고 촬영과 인터뷰를 진행하는 단계입니다.",
        ],
        detail: [
          "디자이너의 현장 방문 및 최종 배치, 마무리",
          "홈리에종 현장 방문 점검 및 고객 인터뷰",
          "전문 사진 작가와 함께 가장 예쁜 순간의 우리집 촬영본 남기기",
        ]
      }
    }
  };

  baseTong = createNode({
    mother: newBaseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      paddingBottom: String(bottomMargin) + ea,
    }
  });

  middleTong = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0 * 2, ea),
    }
  });

  createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      width: String(100) + '%',
      textAlign: "center",
    },
    children: [
      {
        style: {
          display: "block",
          position: "absolute",
          width: String(100) + '%',
          height: String(middleTitleLineTop) + ea,
          top: String(0),
          left: String(0),
          borderBottom: "1px solid " + colorChip.gray4,
        }
      },
      {
        text: contents.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          top: String(middleTitleTextTop) + ea,
          background: colorChip.gray1,
        }
      },
      {
        text: contents.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          paddingLeft: String(middleTitlePadding * 1.5) + ea,
          paddingRight: String(middleTitlePadding * 1.5) + ea,
          background: colorChip.gray1,
        },
        bold: {
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(700),
          lineHeight: String(1.6),
          color: colorChip.black,
        }
      }
    ]
  });

  // white blocks

  baseBlock = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "row",
      marginTop: String(whiteTongMarginTop) + ea,
      width: withOut(0 * 2, ea),
    }
  });
  box0 = createNode({
    mother: baseBlock,
    style: {
      display: "inline-flex",
      width: String(box0Width) + ea,
      height: String(totalHeight) + ea,
      flexDirection: "column",
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      borderRadius: String(8) + "px",
      justifyContent: "center",
      alignItems: "center",
      marginRight: String(boxBetween) + ea,
    },
    child: {
      text: contents.box0,
      style: {
        fontSize: String(box0Size) + ea,
        fontWeight: String(box0Weight),
        color: colorChip.green,
        position: "relative",
        top: String(box0TextTop) + ea,
        display: "inline-block",
        textAlign: "center",
        lineHeight: String(box0LineHeight),
      }
    }
  })
  box1 = createNode({
    mother: baseBlock,
    style: {
      width: String(box1Width) + ea,
      display: "inline-flex",
      height: String(totalHeight) + ea,
      flexDirection: "column",
      marginRight: String(boxBetween) + ea,
    },
    children: contents.box1.map((str, index) => {
      return {
        class: [ box1ButtonTargetsClassName ],
        attribute: {
          index: String(index),
        },
        event: {
          click: function (e) {
            const index = Number(this.getAttribute("index"));
            const targets = document.querySelectorAll('.' + box1ButtonTargetsClassName);
            for (let dom of targets) {
              if (dom === this) {
                dom.firstChild.firstChild.style.color = colorChip.white;
                dom.firstChild.lastChild.style.color = colorChip.white;
                dom.style.background = colorChip.softGreen;
              } else {
                dom.firstChild.firstChild.style.color = colorChip.black;
                dom.firstChild.lastChild.style.color = colorChip.black;
                dom.style.background = colorChip.white;
              }
            }

            if (index === 0) {
              box2Set0();
            } else if (index === 1) {
              box2Set1();
            } else if (index === 2) {
              box2Set2();
            } else {
              box2Set3();
            }
          }
        },
        style: {
          width: withOut(0, ea),
          height: "calc(calc(100% - " + String(boxBetween * (contents.box1.length - 1)) + ea + ") / " + String(contents.box1.length) + ")",
          marginBottom: String(index === contents.box1.length - 1 ? 0 : boxBetween) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          borderRadius: String(8) + "px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          cursor: "pointer",
          transition: "all 0.3s ease",
        },
        child: {
          style: {
            width: String(box1Width - (box1InnerMargin * 2)) + ea,
            display: "inline-flex",
            position: "relative",
            justifyContent: "end",
            alignItems: "center",
            top: String(box1TextTop) + ea,
          },
          child: {
            text: str,
            style: {
              fontSize: String(box1Size) + ea,
              fontWeight: String(box1Weight),
              color: colorChip.black,
              position: "relative",
              transition: "all 0.3s ease",
            },
            previous: {
              text: String(index + 1),
              style: {
                fontSize: String(box1Size) + ea,
                fontWeight: String(box1LightWeight),
                color: colorChip.black,
                position: "absolute",
                top: String(0),
                left: String(0),
                transition: "all 0.3s ease",
              },
            }
          }
        }
      }
    })
  })
  box2 = createNode({
    mother: baseBlock,
    style: {
      display: "inline-flex",
      width: withOut(box0Width + box1Width + (boxBetween * 2), ea),
      height: String(totalHeight) + ea,
      flexDirection: "column",
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      borderRadius: String(8) + "px",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  box2Set0 = () => {
    cleanChildren(box2);
    createNode({
      mother: box2,
      style: {
        width: withOut(innerMargin * 2, ea),
        height: withOut(innerMargin * 2, ea),
        display: "flex",
        position: "relative",
        flexDirection: "column",
      },
      children: [
        {
          style: {
            display: "flex",
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(8) + "px",
            background: colorChip.black,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            text: contents.box2.set0.button,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(box2Size) + ea,
              fontWeight: String(box2Weight),
              color: colorChip.white,
              top: String(buttonTextTop) + ea,
            }
          }
        },
        {
          text: contents.box2.set0.description.join("\n"),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(box2Size) + ea,
            fontWeight: String(box2DescriptionWeight),
            lineHeight: String(box2DescriptionLineHeight),
            color: colorChip.black,
            paddingTop: String(box2LineTop) + ea,
            paddingBottom: String(box2LineBottom) + ea,
            borderBottom: "1px solid " + colorChip.black,
          }
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            paddingTop: String(box2DetailPaddingTop) + ea,
          },
          children: contents.box2.set0.detail.map((str, index) => {
            return {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(0, ea),
                marginTop: String(box2DetailBetween) + ea,
              },
              children: [
                {
                  text: String(index + 1),
                  style: {
                    display: "inline-block",
                    fontSize: String(box2Size) + ea,
                    fontWeight: String(box2NumberWeight),
                    fontFamily: "graphik",
                    fontStyle: "italic",
                    color: colorChip.green,
                    width: String(box2NumberWidth) + ea,
                  }
                },
                {
                  text: str,
                  style: {
                    display: "inline-block",
                    fontSize: String(box2Size) + ea,
                    fontWeight: String(box2DetailWeight),
                    color: colorChip.black,
                  }
                },
              ]
            };
          })
        }
      ]
    })
  }

  box2Set1 = () => {
    cleanChildren(box2);
    createNode({
      mother: box2,
      style: {
        width: withOut(innerMargin * 2, ea),
        height: withOut(innerMargin * 2, ea),
        display: "flex",
        position: "relative",
        flexDirection: "column",
      },
      children: [
        {
          style: {
            display: "flex",
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(8) + "px",
            background: colorChip.black,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            text: contents.box2.set1.button,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(box2Size) + ea,
              fontWeight: String(box2Weight),
              color: colorChip.white,
              top: String(buttonTextTop) + ea,
            }
          }
        },
        {
          text: contents.box2.set1.description.join("\n"),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(box2Size) + ea,
            fontWeight: String(box2DescriptionWeight),
            lineHeight: String(box2DescriptionLineHeight),
            color: colorChip.black,
            paddingTop: String(box2LineTop) + ea,
            paddingBottom: String(box2LineBottom) + ea,
            borderBottom: "1px solid " + colorChip.black,
          }
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            paddingTop: String(box2DetailPaddingTop) + ea,
          },
          children: contents.box2.set1.detail.map((str, index) => {
            return {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(0, ea),
                marginTop: String(box2DetailBetween) + ea,
              },
              children: [
                {
                  text: String(index + 1),
                  style: {
                    display: "inline-block",
                    fontSize: String(box2Size) + ea,
                    fontWeight: String(box2NumberWeight),
                    fontFamily: "graphik",
                    fontStyle: "italic",
                    color: colorChip.green,
                    width: String(box2NumberWidth) + ea,
                  }
                },
                {
                  text: str,
                  style: {
                    display: "inline-block",
                    fontSize: String(box2Size) + ea,
                    fontWeight: String(box2DetailWeight),
                    color: colorChip.black,
                  }
                },
              ]
            };
          })
        }
      ]
    })
  }

  box2Set2 = () => {
    cleanChildren(box2);
    createNode({
      mother: box2,
      style: {
        width: withOut(innerMargin * 2, ea),
        height: withOut(innerMargin * 2, ea),
        display: "flex",
        position: "relative",
        flexDirection: "column",
      },
      children: [
        {
          style: {
            display: "flex",
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(8) + "px",
            background: colorChip.black,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            text: contents.box2.set2.button,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(box2Size) + ea,
              fontWeight: String(box2Weight),
              color: colorChip.white,
              top: String(buttonTextTop) + ea,
            }
          }
        },
        {
          text: contents.box2.set2.description.join("\n"),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(box2Size) + ea,
            fontWeight: String(box2DescriptionWeight),
            lineHeight: String(box2DescriptionLineHeight),
            color: colorChip.black,
            paddingTop: String(box2LineTop) + ea,
            paddingBottom: String(box2LineBottom) + ea,
            borderBottom: "1px solid " + colorChip.black,
          }
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            paddingTop: String(box2DetailPaddingTop) + ea,
          },
          children: contents.box2.set2.detail.map((str, index) => {
            return {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(0, ea),
                marginTop: String(box2DetailBetween) + ea,
              },
              children: [
                {
                  text: String(index + 1),
                  style: {
                    display: "inline-block",
                    fontSize: String(box2Size) + ea,
                    fontWeight: String(box2NumberWeight),
                    fontFamily: "graphik",
                    fontStyle: "italic",
                    color: colorChip.green,
                    width: String(box2NumberWidth) + ea,
                  }
                },
                {
                  text: str,
                  style: {
                    display: "inline-block",
                    fontSize: String(box2Size) + ea,
                    fontWeight: String(box2DetailWeight),
                    color: colorChip.black,
                  }
                },
              ]
            };
          })
        }
      ]
    })
  }

  box2Set3 = () => {
    cleanChildren(box2);
    createNode({
      mother: box2,
      style: {
        width: withOut(innerMargin * 2, ea),
        height: withOut(innerMargin * 2, ea),
        display: "flex",
        position: "relative",
        flexDirection: "column",
      },
      children: [
        {
          style: {
            display: "flex",
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(8) + "px",
            background: colorChip.black,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            text: contents.box2.set3.button,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(box2Size) + ea,
              fontWeight: String(box2Weight),
              color: colorChip.white,
              top: String(buttonTextTop) + ea,
            }
          }
        },
        {
          text: contents.box2.set3.description.join("\n"),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(box2Size) + ea,
            fontWeight: String(box2DescriptionWeight),
            lineHeight: String(box2DescriptionLineHeight),
            color: colorChip.black,
            paddingTop: String(box2LineTop) + ea,
            paddingBottom: String(box2LineBottom) + ea,
            borderBottom: "1px solid " + colorChip.black,
          }
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            paddingTop: String(box2DetailPaddingTop) + ea,
          },
          children: contents.box2.set3.detail.map((str, index) => {
            return {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(0, ea),
                marginTop: String(box2DetailBetween) + ea,
              },
              children: [
                {
                  text: String(index + 1),
                  style: {
                    display: "inline-block",
                    fontSize: String(box2Size) + ea,
                    fontWeight: String(box2NumberWeight),
                    fontFamily: "graphik",
                    fontStyle: "italic",
                    color: colorChip.green,
                    width: String(box2NumberWidth) + ea,
                  }
                },
                {
                  text: str,
                  style: {
                    display: "inline-block",
                    fontSize: String(box2Size) + ea,
                    fontWeight: String(box2DetailWeight),
                    color: colorChip.black,
                  }
                },
              ]
            };
          })
        }
      ]
    })
  }

  box1.firstChild.click();

  // final button

  buttonBase = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      marginTop: String(whiteTongMarginTop) + ea,
      width: withOut(0 * 2, ea),
      height: String(buttonBaseHeight) + ea,
      alignItems: "center",
      justifyContent: "center",
    },
    child: {
      event: {
        click: (e) => {
          selfHref(FRONTHOST + "/consulting.php");
        }
      },
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(finalButtonWidth) + ea,
        height: String(finalButtonHeight) + ea,
        background: colorChip.gradientGreen,
        borderRadius: String(8) + "px",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      },
      child: {
        text: "서비스 신청",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(buttonSize) + ea,
          fontWeight: String(buttonWeight),
          top: String(finalButtonTextTop) + ea,
          color: colorChip.white,
        }
      }
    }
  });

  return [ newBaseTong, baseTong ];
}

ServiceDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, requestPromise, setDebounce, colorChip } = GeneralJs;
    const getObj = returnGet();
    let newBaseTong, baseTong;
    let mode;

    mode = "furnishing";
    if (getObj.mode === "styling") {
      mode = "styling";
    } else if (getObj.mode === "total") {
      mode = "total";
    }
    this.mode = mode;

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "serviceDetail",
      client: null,
      base: {
        instance: this,
        binaryPath: ServiceDetailJs.binaryPath,
        subTitle: "홈리에종 서비스 설명",
        secondBackground: false,
        backgroundType: 0,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {

          if (instance.mode === "furnishing") {
            instance.mother.backgroundImageBox.style.backgroundImage = "url('" + ServiceDetailJs.binaryPath + "/back0.jpg" + "')";
          } else if (instance.mode === "styling") {
            instance.mother.backgroundImageBox.style.backgroundImage = "url('" + ServiceDetailJs.binaryPath + "/back1.jpg" + "')";
          } else if (instance.mode === "total") {
            instance.mother.backgroundImageBox.style.backgroundImage = "url('" + ServiceDetailJs.binaryPath + "/back2.jpg" + "')";
          }

          instance.insertInitBox();
          instance.insertStartBox();
          instance.insertThreeBox();

          if (instance.mode === "furnishing") {
            instance.insertSlideBox();
          } else if (instance.mode === "styling") {
            instance.insertDiagramBox();
          } else if (instance.mode === "total") {
            instance.insertDiagramBox();
          }

          [ newBaseTong, baseTong ] = instance.insertPeopleBox();
          instance.insertReviewBox(newBaseTong, baseTong);

          if (instance.mode === "furnishing") {
            [ newBaseTong, baseTong ] = instance.insertToneBox(newBaseTong, baseTong);
          } else if (instance.mode === "styling") {
            [ newBaseTong, baseTong ] = instance.insertAfterBox(newBaseTong, baseTong);
          } else if (instance.mode === "total") {
            [ newBaseTong, baseTong ] = instance.insertToneBox(newBaseTong, baseTong);
          }

          if (instance.mode !== "furnishing") {
            [ newBaseTong, baseTong ] = instance.insertConstructBox(newBaseTong, baseTong);
          }
          [ newBaseTong, baseTong ] = instance.insertCareBox(newBaseTong, baseTong);
          instance.insertWithBox(newBaseTong, baseTong);

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ServiceDetailJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    this.totalContents.children[0].style.background = colorChip.gray1;
    this.totalContents.children[1].style.transition = "all 0s ease";
    this.totalContents.children[1].style.height = String(<&& 560 | 540 | 460 | 400 | 118 &&>) + this.ea;

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ServiceDetailJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
