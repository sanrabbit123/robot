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
      "return ('파트너십 매뉴얼 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('파트너십 매뉴얼 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "partnershipManual",
  "hangul": "파트너십 매뉴얼",
  "route": [
    "partnershipManual"
  ]
} %/%/g

const PartnershipManualJs = function () {
  this.mother = new GeneralJs();
}

PartnershipManualJs.binaryPath = FRONTHOST + "/middle/console/partnership";

PartnershipManualJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media } = this;
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

  quoteHeight = <%% 15, 15, 15, 15, 2.5 %%>;
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

  titleWording = "파트너십 매뉴얼";
  subTitleContents = "홈리에종 디자이너 파트너십 매뉴얼";

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
        source: svgMaker.serifAsterisk(colorChip.white),
        style: {
          display: "inline-block",
          height: String(quoteHeight) + ea,
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

PartnershipManualJs.prototype.insertFirstBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  let paddingTop;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let whiteBottomMargin;
  let firstWidth;
  let firstPaddingLeft;
  let titleSize, titleWeight, titleLineHeight;
  let barTop, barWidth, barHeight;
  let contentsSize, contentsWeight, contentsLineHeight, contentsBetween;
  let contents;
  let mobileFirstMarginBottom;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 8 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 8 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 36, 0 %%>;

  firstWidth = <%% 572, 465, 397, 318, 50 %%>;
  firstPaddingLeft = <%% 28, 24, 22, 18, 4 %%>;

  barTop = <%% (isMac() ? 11 : 8), (isMac() ? 10 : 7), (isMac() ? 8 : 6), (isMac() ? 7 : 5), 1.4 %%>;
  barWidth = <%% 6, 6, 6, 5, 1 %%>;
  barHeight = <%% 62, 59, 52, 42, 10.6 %%>;

  titleSize = <%% 27, 25, 22, 18, 4.3 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contentsSize = <%% 15, 15, 14, 13, 3.2 %%>;
  contentsWeight = <%% 600, 600, 600, 600, 600 %%>;
  contentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;
  contentsBetween = <%% 20, 20, 20, 20, 4 %%>;

  mobileFirstMarginBottom = 4;

  contents = {
    title: [
      "홈리에종과 파트너십 디자이너가",
      "지속적으로 협업하기 위한 정책 안내"
    ],
    description: [
      [
        "홈리에종은 집을 디자인하는 새로운 방법을 안내합니다.",
        "디자이너의 성장을 위해 디자이너 역량 관리, 인프라 제공, 교육 등을 지원하고, 고객에게 가장 효과적이고, 만족스러운 홈스타일링이 되도록 혁신적인 서비스를 제공하고자 노력하며, 모두가 만족스러운 결과를 얻도록 고객 중심의 프로젝트를 홈리에종이 함께 케어합니다."
      ],
      [
        "홈리에종은 파트너입니다. 고객에게는 만족스러운 집과 편리한 서비스로, 디자이너에게는 지속적인 성장을 위한 폭넓은 지원으로 함께 의논하면서 함께 성장합니다."
      ]
    ]
  };

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(paddingTop) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;


  createNode({
    mother: whiteTong,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? String(firstWidth - firstPaddingLeft) + ea : "",
      paddingLeft: String(firstPaddingLeft) + ea,
      verticalAlign: "top",
      marginBottom: desktop ? "" : String(mobileFirstMarginBottom) + ea,
    },
    children: [
      {
        style: {
          position: "absolute",
          top: String(barTop) + ea,
          left: String(0),
          width: String(barWidth) + ea,
          height: String(barHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gray3,
        }
      },
      {
        text: contents.title.join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          color: colorChip.black,
          lineHeight: String(titleLineHeight),
        }
      }
    ]
  });

  createNode({
    mother: whiteTong,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? withOut(firstWidth, ea) : "",
      verticalAlign: "top",
    },
    children: [
      {
        text: contents.description[0].join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(contentsSize) + ea,
          fontWeight: String(contentsWeight),
          color: colorChip.black,
          lineHeight: String(contentsLineHeight),
        }
      },
      {
        text: contents.description[1].join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(contentsSize) + ea,
          fontWeight: String(contentsWeight),
          color: colorChip.black,
          lineHeight: String(contentsLineHeight),
          marginTop: String(contentsBetween) + ea,
        }
      },
    ]
  });

}

PartnershipManualJs.prototype.insertContextBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker } = GeneralJs;
  const contextButtonClassName = "contextButtonClassName";
  let paddingTop;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let whiteBottomMargin;
  let grayInnerPadding;
  let contents;
  let contextTong;
  let grayInnerPaddingLeft;
  let titleSize, titleWeight, titleMarginBottom;
  let contextPadding;
  let arrowWidth, arrowHeight, arrowTop;
  let contextBetween;
  let contentsSize, contentsWeight;
  let numberWeight, numberWidth;
  let searchTong;
  let searchTongMarginBottom;
  let searchWidth, searchHeight, searchMarginRight;
  let searchIconWidth, searchIconTop;
  let buttonPaddingLeft;
  let buttonSize, buttonWeight, buttonTextTop;
  let textTop;
  let buttonBetween;
  let mobileContextBetween;

  bottomMargin = <%% 16, 16, 16, 12, 18 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 36, 0 %%>;

  grayInnerPadding = <%% 40, 30, 28, 24, 5 %%>;
  grayInnerPaddingLeft = <%% 72, 45, 42, 32, 6 %%>;

  titleSize = <%% 19, 17, 16, 13, 3.5 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleMarginBottom = <%% 16, 12, 10, 8, 1.5 %%>;

  contextPadding = <%% 56, 20, 0, 0, 2.5 %%>;

  textTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  arrowWidth = <%% 48, 14, 0, 0, 0 %%>;
  arrowHeight = <%% 6, 4, 4, 4, 1 %%>;
  arrowTop = <%% 7, (isMac() ? 8 : 9), 7, 7, 7 %%>;

  contextBetween = <%% 6, 6, 6, 4, 1 %%>;

  contentsSize = <%% 15, 14, 13, 11, 2.8 %%>;
  contentsWeight = <%% 600, 600, 600, 600, 600 %%>;

  numberWeight = <%% 300, 300, 300, 300, 300 %%>;
  numberWidth = <%% 30, 30, 28, 22, 6 %%>;

  searchTongMarginBottom = <%% 15, 15, 15, 15, 3 %%>;

  searchWidth = <%% 450, 420, 360, 320, 30 %%>;
  searchHeight = <%% 36, 32, 32, 26, 7 %%>;
  searchMarginRight = <%% 12, 12, 12, 12, 1 %%>;

  searchIconWidth = <%% 22, 22, 22, 20, 3 %%>;
  searchIconTop = <%% 6, 5, 4, 2, 1 %%>;

  buttonPaddingLeft = <%% 15, 15, 15, 13, 3 %%>;
  buttonBetween = <%% 6, 6, 6, 6, 1.2 %%>;
  buttonSize = <%% 14, 13, 13, 11, 3 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;
  buttontextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (GeneralJs.isIphone() ? -0.1 : -0.2) %%>;

  mobileContextBetween = 3;

  contents = [
    {
      title: desktop ? "프로젝트 사전 준비" : "프로젝트 준비",
      context: [
        desktop ? "디자이너 교육 이수" : "교육 이수",
        desktop ? "활동 가능 영역 책정" : "활동 가능 영역",
        "서비스 비용 책정",
        big ? "디자이너 작업 가능 일정" : "작업 가능 일정",
      ],
      scroll: [
        1000,
        1100,
        1100,
        1400
      ],
    },
    {
      title: desktop ? "첫 프로젝트 운영" : "프로젝트 운영",
      context: [
        "첫 프로젝트 응대",
        "디자이너 직접 시공",
        "현장 촬영",
        "디자이너 글 가이드",
      ],
      scroll: [
        1600,
        1900,
        2400,
        3800
      ],
    },
    {
      title: "컨텐츠 가이드",
      context: [
        "컨텐츠 활용 방법",
        desktop ? "홈리에종 제공 컨텐츠" : "홈리에종 컨텐츠",
      ],
      scroll: [
        4440,
        4600,
      ],
    },
    {
      title: "프로젝트 진행",
      context: [
        big ? "디자이너 현장미팅 준비 / 응대" : (desktop ? "디자이너 현장미팅 준비" : "현장미팅 준비"),
        "디자이너 작성 폼",
        "시공사 선택",
        "디자이너 소통",
      ],
      scroll: [
        5350,
        5800,
        6000,
        6200
      ],
    },
  ];

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(paddingTop) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          width: withOut(margin * 2, ea),
          marginLeft: String(margin) + ea,
          marginBottom: String(searchTongMarginBottom) + ea,
          height: desktop ? "" : String(searchHeight) + ea,
        }
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: withOut(margin * 2, ea),
          marginLeft: String(margin) + ea,
          borderRadius: String(desktop ? 8 : 1) + ea,
          paddingTop: String(grayInnerPadding) + ea,
          paddingBottom: String(grayInnerPadding) + ea,
          background: colorChip.gray1,
        }
      }
    ]
  });
  searchTong = whiteBlock.children[0];
  whiteTong = whiteBlock.children[1];

  if (desktop) {
    createNode({
      mother: searchTong,
      style: {
        display: "inline-block",
        position: "relative",
        width: String(searchWidth) + ea,
        height: String(searchHeight) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.gray1,
        marginRight: String(searchMarginRight) + ea,
        verticalAlign: "top",
      },
      children: [
        {
          mode: "input",
          attribute: {
            type: "text",
            placeholder: "정책 검색...",
          },
          event: {
            keyup: function (e) {
              if (e.key === "Enter") {
                if (this.value.trim() !== "") {
                  const searchTargets = [ ...document.querySelectorAll('.' + contextButtonClassName) ];
                  const typing = this.value;
                  const target = searchTargets.find((dom) => {
                    return (new RegExp(typing, "gi")).test(dom.getAttribute("value"));
                  });

                  if (target !== undefined) {
                    target.click();
                  }

                }
              }
            }
          },
          style: {
            display: "block",
            border: String(0),
            width: withOut(0),
            height: withOut(3, '%'),
            outline: String(0),
            fontSize: String(buttonSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            textAlign: "center",
            background: "transparent",
          }
        }
      ]
    });
    createNode({
      mother: searchTong,
      class: [ "hoverDefault_lite" ],
      mode: "svg",
      source: instance.mother.returnSearch(colorChip.black),
      style: {
        display: "inline-block",
        position: "relative",
        width: String(searchIconWidth) + ea,
        top: String(searchIconTop) + ea,
        verticalAlign: "top",
      }
    });
  }
  createNode({
    mother: searchTong,
    style: {
      display: desktop ? "inline-block" : "flex",
      position: desktop ? "absolute" : "relative",
      verticalAlign: "top",
      top: String(0),
      right: String(0),
      height: String(searchHeight) + ea,
      width: desktop ? "" : withOut(0),
      justifyContent: desktop ? "" : "center",
    },
    children: [
      {
        event: {
          click: function (e) {
            GeneralJs.selfHref(FRONTHOST + "/designer/provision.php?desid=" + instance.designer.desid + "&mode=styling");
          }
        },
        style: {
          display: "inline-flex",
          position: "relative",
          height: withOut(0),
          paddingLeft: String(buttonPaddingLeft) + ea,
          paddingRight: String(buttonPaddingLeft) + ea,
          background: colorChip.gradientGray,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          borderRadius: String(5) + "px",
          cursor: "pointer",
          marginRight: String(buttonBetween) + ea,
        },
        children: [
          {
            text: "홈스타일링 제공 내역",
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(buttonSize) + ea,
              fontWeight: String(buttonWeight),
              color: colorChip.white,
            }
          }
        ]
      },
      {
        event: {
          click: function (e) {
            GeneralJs.selfHref(FRONTHOST + "/designer/provision.php?desid=" + instance.designer.desid + "&mode=contract");
          }
        },
        style: {
          display: "inline-flex",
          position: "relative",
          height: withOut(0),
          paddingLeft: String(buttonPaddingLeft) + ea,
          paddingRight: String(buttonPaddingLeft) + ea,
          background: colorChip.gradientGray,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          borderRadius: String(5) + "px",
          cursor: "pointer",
        },
        children: [
          {
            text: "디자이너 계약서",
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(buttonSize) + ea,
              fontWeight: String(buttonWeight),
              color: colorChip.white,
            }
          }
        ]
      },
    ]
  });

  for (let i = 0; i < contents.length; i++) {

    contextTong = createNode({
      mother: whiteTong,
      style: {
        display: "inline-block",
        width: "calc(calc(100% - " + String(grayInnerPaddingLeft * 2) + ea + ") / " + String(desktop ? contents.length : 2) + ")",
        verticalAlign: "top",
        marginLeft: desktop ? (i === 0 ? String(grayInnerPaddingLeft) + ea : "") : (i % 2 === 0 ? String(grayInnerPaddingLeft) + ea : ""),
        marginRight: (i === contents.length - 1 ? String(grayInnerPaddingLeft) + ea : ""),
        marginBottom: desktop ? "" : (Math.floor(i / 2) === 0 ? String(mobileContextBetween) + ea : ""),
      },
      children: [
        {
          text: contents[i].title,
          style: {
            display: "block",
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorChip.black,
            marginBottom: String(titleMarginBottom) + ea,
            top: String(textTop) + ea,
          }
        },
        {
          style: {
            display: "block",
            position: "relative",
          }
        }
      ]
    }).children[1];

    for (let j = 0; j < contents[i].context.length; j++) {

      createNode({
        mother: contextTong,
        class: [ contextButtonClassName ],
        attribute: {
          i: String(i),
          j: String(j),
          value: contents[i].context[j],
        },
        event: {
          click: function (e) {
            const i = Number(this.getAttribute('i'));
            const j = Number(this.getAttribute('j'));
            if (big) {
              GeneralJs.scrollTo(window, contents[i].scroll[j]);
            }
          }
        },
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(contextBetween) + ea,
          paddingLeft: String(contextPadding) + ea,
          cursor: "pointer",
        },
        children: [
          {
            mode: "svg",
            source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.gray4),
            style: {
              position: "absolute",
              left: String(0),
              top: String(arrowTop) + ea,
              width: String(arrowWidth) + ea,
            }
          },
          {
            text: String(i + 1) + "-" + String(j + 1),
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsSize) + ea,
              fontWeight: String(numberWeight),
              color: colorChip.green,
              verticalAlign: "top",
              width: String(numberWidth) + ea,
              top: String(textTop) + ea,
            }
          },
          {
            text: contents[i].context[j],
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsSize) + ea,
              fontWeight: String(contentsWeight),
              color: colorChip.black,
              verticalAlign: "top",
              top: String(textTop) + ea,
            }
          }
        ]
      });

    }

  }

}

PartnershipManualJs.prototype.insertPreProjectBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;
  let mainContents;
  let mainTitle;
  let title, contents;
  let factors;
  let contentsHeight;
  let factorBoxTop, factorBoxLeft;
  let factorLineTop, factorLineLeft, factorLineWidth, factorLineHeight;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 36, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 14 : 12), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 180, 170, 150, 10 %%>;
  secondWidth = <%% 15, 15, 8, 0, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 24, 24, 24, 24, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 6 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  contentsHeight = <%% 180, 192, 180, 180, 180 %%>;

  factorBoxTop = <%% 25, 25, 25, 25, 25 %%>;
  factorBoxLeft = <%% 920, 600, 600, 600, 920 %%>;

  factorLineTop = <%% (isMac() ? 36 : 34), 36, 36, 36, 36 %%>;
  factorLineLeft = <%% 888, 588, 588, 588, 888 %%>;
  factorLineWidth = <%% 22, 22, 22, 22, 22 %%>;
  factorLineHeight = <%% 123, 123, 123, 123, 123 %%>;

  mainTitle = "프로젝트 운영을 위한 사전 준비";
  mainContents = [
    {
      title: "디자이너 교육 이수",
      contents: [
        "각 디자이너는 홈리에종에서 제공하는 디자이너 공통 교육을 이수해야만 홈리에종에서 제공하는 파트너십 프로젝트 진행을 할 수 있습니다.",
        "디자이너의 프로젝트 운영 방식을 이해하기 위한 과정으로 이수한 디자이너에게 우선적으로 프로젝트 참여 자격이 주어집니다.",
      ],
    },
    {
      title: "활동 가능 영역 및 서비스 비용 책정",
      contents: [
        "각 디자이너의 프로젝트 운영 방식을 이해하기 위한 과정으로 전체 내용은 공통 교육에서 우선적으로 설명 후,",
        "홈리에종 담당자가 개별적으로 연락을 취하여 확인합니다.",
      ],
      factors: [
        "서비스 제공 가능 지역",
        "활동 가능 서비스 영역",
        "프로젝트 운영 (스케쥴, 예산 운영)",
        "디자인 제안 방식",
        "시공 운영 방식",
        big ? "스타일링 운영 방식 (가구 및 패브릭 발주 가능 여부 등)" : "스타일링 운영 방식",
      ],
    },
    {
      title: "디자이너 작업 가능 일정",
      contents: [
        "디자이너의 일정은 매월 마지막주 정기적으로 익월 일정을 확인합니다. 상시로 일정 변동이 있기 때문에 매월 확인한 일정 외에 변동사항이 생길 때마다 홈리에종 채널로 변동 일정을 공유해주셔야 합니다. 초기 계약시 [활동 대기] 단계에서 일정을 확인합니다. 디자이너는 <b%홈리에종의 서비스 유형(F, S, T, XT) 에 대하여 활동 가능 영역을 결정하고, 이에 따라 서비스 비용을 책정%b>합니다. 초기 계약시 책정한 서비스 비용은 프로젝트 누적 수량에 따라 달라질 수 있습니다. 일정에 대한 답이 없다면, 계속 진행 가능함으로 판단하고 추천서에 등록되게 됩니다.",
        "이후부터 홈리에종은 디자이너 추천을 시작하고 고객의 선택을 기다리게 됩니다." + (desktop ? "\n" : " ") + "프로젝트 계약이 확정되고 첫번째 현장 미팅이 잡히기까지의 소요시간을 예상할 수 없습니다.",
      ]
    }
  ];

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? margin : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: "block",
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: mainTitle,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(800),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          borderRadius: mobile ? String(1) + ea : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: desktop ? "1px solid " + colorChip.shadow : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(6) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;


  // 1

  ({ title, contents } = mainContents[0]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: media[0] ? contents.join("\n") : contents.join(" "),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });

   // 2

  ({ title, contents, factors } = mainContents[1]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(desktop ? contentsMarginBottom0 : contentsMarginBottom1) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: "<b%< " + title + " >%b>\n" + (big ? contents.join("\n") : contents.join(" ")),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
          height: media[0] ? String(contentsHeight) + ea : "",
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(800),
          color: colorChip.green,
        },
        children: [
          {
            style: {
              display: media[0] ? "block" : "none",
              position: "absolute",
              top: String(factorLineTop) + ea,
              left: String(factorLineLeft) + ea,
              width: String(factorLineWidth) + ea,
              height: String(factorLineHeight) + ea,
              border: "1px solid " + colorChip.gray3,
              borderTopLeftRadius: String(8) + "px",
              borderBottomLeftRadius: String(8) + "px",
              borderRight: String(0),
            }
          },
          {
            text: factors.map((str, index) => { return "<b%" + String(index + 1) + ".%b> " + str }).join("\n"),
            style: {
              display: "block",
              position: media[0] ? "absolute" : "relative",
              top: media[0] ? String(factorBoxTop) + ea : "",
              left: media[0] ? String(factorBoxLeft) + ea : "",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              lineHeight: String(1.7),
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(400),
              color: colorChip.green,
            }
          }
        ]
      },
    ]
  });

  // 3

  ({ title, contents } = mainContents[2]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: contents.join("\n\n"),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });

}

PartnershipManualJs.prototype.insertFirstProjectBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;
  let mainContents;
  let mainTitle;
  let title, contents;
  let factors;
  let contentsHeight;
  let factorBoxTop, factorBoxLeft;
  let factorLineTop, factorLineLeft, factorLineWidth, factorLineHeight;
  let noticeBoxPaddingTop;
  let noticeGrayPadding;
  let noticeTitleTop;
  let noticePaddingLeft;
  let noticePaddingTop;
  let noticePaddingBottom;
  let noticeNumberWidth;
  let noticeLineBoxWidth;
  let noticeLineBoxPaddingTop, noticeLineBoxPadding, noticeLineHeight;
  let textTop;
  let mobilePaddingMinus;

  textTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 36, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 14 : 12), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 180, 170, 150, 10 %%>;
  secondWidth = <%% 15, 15, 8, 0, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 24, 24, 24, 24, 2 %%>;
  contentsMarginBottom1 = <%% 60, 56, 48, 42, 6 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  contentsHeight = <%% 180, 180, 180, 180, 180 %%>;

  factorBoxTop = <%% 25, 25, 25, 25, 25 %%>;
  factorBoxLeft = <%% 920, 920, 920, 920, 920 %%>;

  factorLineTop = <%% 36, 36, 36, 36, 36 %%>;
  factorLineLeft = <%% 888, 888, 888, 888, 888 %%>;
  factorLineWidth = <%% 22, 22, 22, 22, 22 %%>;
  factorLineHeight = <%% 123, 123, 123, 123, 123 %%>;

  noticeBoxPaddingTop = <%% 34, 34, 34, 34, 8 %%>;
  noticeGrayPadding = <%% 12, 12, 10, 8, 3 %%>;
  noticeTitleTop = <%% -28, -28, -28, -26, -7 %%>;

  noticePaddingLeft = <%% 22, 22, 22, 22, 4.5 %%>;
  noticePaddingTop = <%% 16, 16, 16, 12, 3 %%>;
  noticePaddingBottom = <%% 4, 4, 4, 2, 3 %%>;

  noticeNumberWidth = <%% 20, 20, 20, 16, 4 %%>;
  noticeLineBoxWidth = <%% 110, 110, 100, 16, 11 %%>;

  noticeLineBoxPaddingTop = <%% 14, 13, 13, 13, 14 %%>;
  noticeLineBoxPadding = <%% 10, 10, 10, 8, 10 %%>;
  noticeLineHeight = <%% 28, 27, 27, 25, 28 %%>;

  mobilePaddingMinus = 11;


  mainTitle = "첫 프로젝트 운영";
  mainContents = [
    {
      title: "첫 프로젝트 응대",
      contents: [
        "고객 첫 응대 시 홈리에종과 함께 프로젝트를 진행하는 협업의 관계라는 점과 디자인을 진행하면서" + (desktop ? "\n" : " ") + "불편 사항이 있는 경우 홈리에종을 통해 연락해달라고 안내해주세요.",
        "프로젝트를 마무리 후 인터뷰와 촬영을 진행하는데 <b%이는 프로젝트 검수(정산)와 디자이너를 지원하기 위해 중요한 과정임을 함께 설명%b>해주세요." + (media[0] ? "\n" : " ") + "모든 고객이 디자이너의 포트폴리오를 보고 선택하신 것처럼 최신의 포트폴리오가 누적되어야 디자이너가 계속해서 성장할 수 있기에 소중하게 관리되고 있으며 개인정보 노출 정도는 홈리에종과 조율할 수 있습니다.",
      ],
    },
    {
      title: "디자이너 시공사의" + (desktop ? "\n" : " ") + "직접 시공",
      contents: [
        "<b%디자이너가 직접 시공을 진행했을 경우 시공 계약서와 세부 내용이 담긴 견적서를 보내주세요!%b> 디자이너 직영 시공사가 있는 경우 사전에",
        "홈리에종과의 미팅을 통해서 시공 파트너사 등록을 진행해야 합니다. 디자이너 직영 시공사와 진행하는 과정에서 문제가 발생한 경우 홈리에종이 고객의 불편 사항 접수를 받게되고, 책임과 평가에 직접적으로 영향을 받기 때문에 필수적인 정책 등의 과정이 필요합니다.",
      ],
    },
    {
      title: "시공사와 계약시",
      contents: [
        "공정별 계약은 불가하며,",
        "선택하신 시공사와 " + (desktop ? "직접 " : "") + "계약을 맺습니다.",
        "시공" + (desktop ? "에 대한 모든 " : " ") + "책임은 계약한 시공사에 있고,",
        "시공 복잡도에 따라 디자이너의 감리 비용이 일부 책정될 수 있습니다.",
        "모든 시공사는 경험에 따라 시공 방법이나 견적에 차이가 있을 수 있습니다.",
      ]
    }
  ];

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? margin : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: "block",
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: mainTitle,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(800),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          borderRadius: mobile ? String(1) + ea : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: desktop ? "1px solid " + colorChip.shadow : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(6) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  // 1

  ({ title, contents } = mainContents[0]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom1) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: contents.join(desktop ? "\n\n" : "\n"),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });

  // 2

  ({ title, contents } = mainContents[1]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: media[0] ? contents.join("\n") : contents.join(" "),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });

  // 3

  ({ title, contents } = mainContents[2]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(noticeBoxPaddingTop) + ea,
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? withOut(firstWidth + secondWidth + secondMarginRight + (noticeGrayPadding * 2), ea) : withOut(mobilePaddingMinus, ea),
          textAlign: "left",
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          padding: String(noticeGrayPadding) + ea,
        },
        children: [
          {
            text: title,
            style: {
              position: "absolute",
              top: String(noticeTitleTop + textTop) + ea,
              left: String(0),
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              background: colorChip.white,
              borderRadius: String(5) + "px",
              width: withOut(noticePaddingLeft * 2, ea),
              paddingLeft: String(noticePaddingLeft) + ea,
              paddingRight: String(noticePaddingLeft) + ea,
              paddingTop: String(noticePaddingTop) + ea,
              paddingBottom: String(noticePaddingBottom) + ea,
            },
            children: [
              {
                text: (new Array(contents.length)).fill(1).map((num, index) => { return '0' + String(num + index) }).join("\n"),
                style: {
                  display: desktop ? "inline-block" : "none",
                  position: "relative",
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(700),
                  lineHeight: String(2),
                  color: colorChip.black,
                  width: String(noticeNumberWidth) + ea,
                  textAlign: "center",
                  top: String(textTop) + ea,
                }
              },
              {
                style: {
                  display: desktop ? "inline-flex" : "none",
                  flexDirection: "column",
                  position: "relative",
                  width: String(noticeLineBoxWidth) + ea,
                  paddingTop: String(noticeLineBoxPaddingTop) + ea,
                  paddingLeft: String(noticeLineBoxPadding) + ea,
                },
                children: (new Array(contents.length)).fill(null).map((n) => {
                  return {
                    style: {
                      position: "relative",
                      width: String(noticeLineBoxWidth - noticeLineBoxPadding) + ea,
                      height: String(noticeLineHeight) + ea,
                      borderTop: "1px solid " + colorChip.gray3,
                    }
                  }
                }),
              },
              {
                text: desktop ? contents.join("\n") : contents.map((str, index) => { return `${String(index + 1)}) ${str}` }).join("\n"),
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                  fontWeight: String(desktop ? 700 : 600),
                  lineHeight: String(desktop ? 2 : 1.8),
                  color: colorChip.black,
                  top: String(textTop) + ea,
                }
              }
            ]
          }
        ],
      },
    ]
  });

}

PartnershipManualJs.prototype.insertPhotoSettingBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;
  let mainContents;
  let mainTitle;
  let title, contents;
  let factors;
  let contentsHeight;
  let factorBoxTop, factorBoxLeft;
  let factorLineTop, factorLineLeft, factorLineWidth, factorLineHeight;
  let preContents;
  let middleSecondWidth;
  let grayPadding;
  let grayPaddingLeft, grayPaddingTop;
  let final;
  let gray;
  let bigPaddingWidth;
  let bigPaddingPaddingVisual;
  let lineBoxPaddingTop;
  let lineBoxHeight;
  let bigPaddingNumberWidth;
  let textTop;
  let mobileGrayPaddingTop;
  let mobileGrayMarginBottom;

  mobileGrayPaddingTop = 1;
  mobileGrayMarginBottom = 4.5;

  textTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 36, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 14 : 12), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 180, 170, 150, 0 %%>;
  secondWidth = <%% 15, 15, 8, 0, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 0 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 24, 24, 24, 24, 2 %%>;
  contentsMarginBottom1 = <%% 60, 56, 48, 42, 6 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 0 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  contentsHeight = <%% 180, 180, 180, 180, 180 %%>;

  factorBoxTop = <%% 25, 25, 25, 25, 25 %%>;
  factorBoxLeft = <%% 920, 920, 920, 920, 920 %%>;

  factorLineTop = <%% 36, 36, 36, 36, 36 %%>;
  factorLineLeft = <%% 888, 888, 888, 888, 888 %%>;
  factorLineWidth = <%% 22, 22, 22, 22, 22 %%>;
  factorLineHeight = <%% 123, 123, 123, 123, 123 %%>;

  middleSecondWidth = <%% 175, 140, 125, 110, 22 %%>;

  grayPadding = <%% 12, 12, 12, 8, 3 %%>;

  grayPaddingLeft = <%% 30, 30, 30, 24, 4.5 %%>;
  grayPaddingTop = <%% 22, 20, 18, 16, 3 %%>;

  bigPaddingWidth = <%% 424, 188, 172, 148, 12 %%>;
  bigPaddingPaddingVisual = <%% 16, 16, 16, 12, 2 %%>;
  lineBoxPaddingTop = <%% 12, 12, 12, 11, 2.5 %%>;
  lineBoxHeight = <%% 23, 22, 22, 21, 10.7 %%>;

  bigPaddingNumberWidth = <%% 12, 12, 12, 9, 4 %%>;

  mainTitle = "촬영 및 세팅 가이드";
  mainContents = [
    {
      preContents: [
        "홈리에종과의 협업 포트폴리오는 가능한 현장을 정돈한 후 촬영하여 보존합니다.",
        "<b%1) 프로젝트의 종료를 검수하는 의미와 2) 디자이너의 지속적인 성장을 지원하고자 하는%b> 두 가지 의미를 가집니다.",
      ],
      contents: [
        big ? "디자이너는 고객과 촬영 일자를 맞추고 촬영 전 고객과 부족한 부분은 없는 지 논의하여 촬영 준비를 합니다." : "디자이너는 고객과 촬영 일자를 맞추고 촬영 전 촬영 준비를 합니다.",
        "디자이너가 준비할 수 있는 소품이 있다면 현장에서 배치를 해도 무방합니다.",
        "포토 실장님께 각 공간별 디자이너의 의도를 전달하며 원하는 촬영 부분에 대해 논의합니다.",
      ]
    },
    {
      title: "촬영 세팅 TIP",
      contents: [
        {
          title: "선 정리",
          contents: [
            "전자제품, 문어발 콘센트, TV케이블, 마우스 선 등을 정리해주시면 훨씬 깔끔한 사진을 얻을 수 있습니다.",
          ]
        },
        {
          title: "패브릭 정돈",
          contents: [
            "커튼 : 주름이 잘 잡히는 소재의 커튼이 아니라면 손으로 주름을 잡아주세요. 커튼 연 것, 친 것 모두 촬영하셔도 됩니다.",
            "쿠션 : 쪼글쪼글하지 않도록 탁탁 쳐서 볼륨감을 살려주세요.",
            "베딩 : 정면에서는 자락이 양쪽으로 균등하게 떨어지는 것이 안정감 있습니다. 방향에 따라 한 쪽을 당겨 프레임이나 어수선한 부분을 가려도 좋아요.",
          ]
        },
        {
          title: "물건 정리",
          contents: [
            "텅 빈 집처럼 치우는 것보다는 적당한 생활감이 묻어나는 것이 좋아요. 그래도 수세미, 음식, 쓰레기통 등이 생활감이 많이 묻어나는 것들은 숨겨주세요.",
          ]
        },
        {
          title: "소품 세팅",
          contents: [
            "고객님이 구매하신 것 활용 : 같은 소품도 어떻게 배치하고 활용하는 지에 따라 확 다르다는 것을 고객님께 보여드릴 수 있어요.",
            "고객 후기에서도 많이 언급해 주시는데, 디자이너님이 손을 대주시니까 확 달라졌다고요!",
            "디자이너 준비 : 소품이 부족한 경우, 디자이너가 준비하여 추가 세팅하고 촬영합니다. 화병, 액자, 오브제, 쿠션, 조명 등을 챙겨오시는 편이에요. 홈리에종 디자이너님들 중에는 플로리스트 공부하시는 분들도 있답니다.",
          ]
        },
      ],
    },
    {
      title: "촬영 경우의 수",
      contents: [
        {
          type: "first",
          contents: [ "홈리에종이 촬영하는 경우, 고객의 사정이나 지역의 특이성에 의해 디자이너가 직접 촬영한 후 전달하는 경우,", "혹은 개인 정보 등의 문제로 촬영을 진행하지 않기로 결정하는 3가지 경우가 있습니다." ],
        },
        {
          type: "second",
          title: desktop ? "홈리에종이\n촬영하는 경우" : "홈리에종\n촬영",
          contents: [
            "프로젝트 종료 시점에 촬영 작가, 디자이너, 홈리에종 담당자가 고객의 집에 방문하여 촬영합니다. 디자이너는 촬영일 당일 디자인 의도에 맞추어 촬영할 수 있는 상태로 현장을 세팅해야 합니다. 홈리에종 담당자는 사전에 고객에게 정리 정돈을 부탁하고 촬영일에 인터뷰를 진행하며 필요에 따라 현장 지원합니다.",
            "<b%촬영 비용 : 1건당 165,000원 (vat포함) 디자이너 부담률 50% + 홈리에종 부담률 50%%b>",
          ]
        },
        {
          type: "gray",
          title: desktop ? "홈리에종\n촬영 가이드" : "촬영\n가이드",
          contents: [
            "스타일링이 완성된 공간별, 가로 비율 1장 이상의 사진",
            "세로 비율의 사진일 경우, 최소 2장 이상의 컷 필요 (짝수컷 필요)",
            "공간당 전체가 보이는 광각 사진 (14mm 이하의 렌즈) 1장 이상씩 필요",
            "사진은 원본 해상도로, 사진의 긴 쪽 최소 픽셀이 2000px 이상",
            "필터는 사용되어서는 안 됨",
            "색상을 정확하게 보여줄 수 있도록 화이트 밸런스 맞추기",
            "가구나 소품의 왜곡이 없어야 함",
          ]
        },
        {
          type: "second",
          title: desktop ? "디자이너가\n촬영하는 경우" : "디자이너\n촬영",
          contents: [
            "디자이너님이 직접 촬영 또는 외부 포토그래퍼를 이용하시는 것도 가능합니다. 디자이너 직접 촬영 또는 외부 포토그래퍼 촬영 시 홈리에종은 현장에 동행하여 고객 인터뷰를 진행할 수 있습니다. 여건에 따라 전화 인터뷰를 진행할 수 있으며 외부 포토그래퍼",
            "촬영 시 원활한 일정 조율을 위하여 사전에 홈리에종과 협의 부탁드립니다.",
          ]
        },
        {
          type: "second",
          title: "",
          contents: [
            "디자이너가 직접 촬영한 사진으로 프로젝트 종료를 검수하는 경우 디자이너는 최대한 성의 있게 촬영하여 홈리에종과 공유합니다. 고성능 휴대폰으로 촬영한 사진도 사용 가능합니다. 다만 모든 사진은 필터를 적용하지 않고 찍은 원본 사진을 보내주셔야 합니다. 프로젝트 단위로 압축하셔서 이메일로 전송해주세요.\nadmin@home-liaison.com",
          ]
        },
      ]
    },
    {
      title: "포트폴리오 설명",
      contents: [
        "촬영을 진행했거나 그렇지 못한 모든 경우에 포트폴리오에 대한 설명을 작성하여 보내주세요. <b%포트폴리오 설명을 확인한 후 서비스 비용(잔금)을 정산합니다.%b> 보내주시는 콘텐츠는 홈리에종의 웹사이트 / SNS 채널에 노출하며 디자이너 추천 및 브랜딩 용도로 사용합니다.",
        "‘포트폴리오 작성 형식'은 2부 5)에서안내해드린 방식과 같습니다.",
      ]
    },
    {
      title: "디자이너 글 가이드",
      contents: [
        "완성된 현장의 사진은 텍스트와 함께 홈리에종의 웹사이트 / SNS 채널에 노출하며, 고객제안 및 디자이너 브랜딩 용도로 사용합니다.",
        "포트폴리오 텍스트 작성 순서는 아래와 같습니다. 홈리에종내에서 보정 및 편집 과정을 거치므로 편안한 마음으로 작성해 주시면 됩니다 ^^",
      ],
      gray: [
        "1) 고객 상황에 대한 이야기",
        "2) 고객이 원하는 스타일에 대한 이야기 ",
        "3) 디자이너의 공간별 디자인 의도 이야기 ",
        "4) 현장 진행소감",
        "5) 공간정보",
        "공간정보 : 00py, 아파트/주택/타운하우스 등, 방0+화장실0+거실+주방 등",
        "가족구성 :",
        "기간 :",
        "예산 :",
      ],
      final: [
        "레퍼런스를 보내드립니다. 참고해서 작성해 주시면 됩니다.",
        "https://blog.naver.com/homeliaison/221486291912",
      ],
    },
  ];

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? margin : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: "block",
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: mainTitle,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(800),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          borderRadius: mobile ? String(1) + ea : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: desktop ? "1px solid " + colorChip.shadow : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(6) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  // 1

  ({ preContents, contents } = mainContents[0]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: desktop ? preContents.join("\n") : preContents.join(" "),
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.black,
            },
          }
        ]
      },
    ]
  });
  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom1) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: withOut(0, ea),
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(bigPaddingWidth) + ea,
              paddingRight: String(bigPaddingPaddingVisual) + ea,
              verticalAlign: "top",
              paddingTop: String(lineBoxPaddingTop) + ea,
            },
            children: (new Array(contents.length)).fill(null).map((n, index) => {
              return {
                style: {
                  display: "block",
                  position: "relative",
                  borderTop: "1px solid " + colorChip.gray3,
                  height: String(index === contents.length - 1 ? 0 : lineBoxHeight) + ea,
                }
              };
            }),
          },
          {
            text: (new Array(contents.length)).fill(null).map((n, index) => { return `${String(index + 1)}) ` }),
            style: {
              display: desktop ? "inline-block" : "none",
              position: "relative",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              lineHeight: String(1.7),
              color: colorChip.deactive,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
              width: String(bigPaddingNumberWidth) + ea,
              verticalAlign: "top",
              top: String(textTop) + ea,
            }
          },
          {
            text: desktop ? contents.join("\n") : contents.map((str, index) => { return `${String(index + 1)}) ${str}` }).join("\n"),
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
              verticalAlign: "top",
              top: String(textTop) + ea,
              width: desktop ? "" : withOut(bigPaddingWidth + bigPaddingPaddingVisual, ea),
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
    ]
  });

  // 2

  ({ title, contents } = mainContents[1]);

  num = 0;
  for (let obj of contents) {
    createNode({
      mother: tong,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(num === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
      },
      children: [
        {
          style: {
            display: desktop ? "inline-block" : "block",
            position: "relative",
            verticalAlign: "top",
            width: desktop ? String(firstWidth) + ea : String(100) + '%',
            marginBottom: desktop ? "" : String(1.5) + ea,
          },
          children: [
            {
              text: num === 0 ? title : "",
              style: {
                display: desktop ? "inline-block" : "block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(700),
                lineHeight: String(1.7),
                color: colorChip.black,
                textAlign: "left",
                background: colorChip.white,
                paddingRight: String(linePadding) + ea,
              },
              bold: {
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(700),
                color: colorChip.green,
              },
            }
          ]
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(contentsWordingSize) + ea,
            fontWeight: String(700),
            verticalAlign: "top",
            lineHeight: String(1.7),
            width: String(secondWidth) + ea,
            marginRight: String(secondMarginRight) + ea,
            color: colorChip.green,
          },
        },
        {
          text: obj.title,
          style: {
            display: "inline-block",
            fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
            fontWeight: String(700),
            verticalAlign: "top",
            lineHeight: String(1.7),
            width: String(middleSecondWidth) + ea,
            textAlign: "left",
            color: colorChip.black,
          },
          bold: {
            fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
            fontWeight: String(700),
            color: colorChip.black,
          },
          under: {
            fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
            fontWeight: String(700),
            color: colorChip.green,
          },
        },
        {
          text: obj.contents.join("\n"),
          style: {
            display: "inline-block",
            fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
            fontWeight: String(400),
            verticalAlign: "top",
            lineHeight: String(1.7),
            width: withOut(firstWidth + secondWidth + secondMarginRight + middleSecondWidth, ea),
            textAlign: "left",
            color: colorChip.black,
          },
          bold: {
            fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
            fontWeight: String(700),
            color: colorChip.black,
          },
          under: {
            fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
            fontWeight: String(700),
            color: colorChip.green,
          },
        },
      ]
    });
    num++;
  }


  // 3

  ({ title, contents } = mainContents[2]);

  num = 0;
  for (let obj of contents) {

    if (obj.type === "first") {

      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(num === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
        },
        children: [
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              verticalAlign: "top",
              width: desktop ? String(firstWidth) + ea : String(100) + '%',
              marginBottom: desktop ? "" : String(1.5) + ea,
            },
            children: [
              {
                text: num === 0 ? title : "",
                style: {
                  display: desktop ? "inline-block" : "block",
                  position: "relative",
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(700),
                  lineHeight: String(1.7),
                  color: colorChip.black,
                  textAlign: "left",
                  background: colorChip.white,
                  paddingRight: String(linePadding) + ea,
                },
                bold: {
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(700),
                  color: colorChip.green,
                },
              }
            ]
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              verticalAlign: "top",
              lineHeight: String(1.7),
              width: String(secondWidth) + ea,
              marginRight: String(secondMarginRight) + ea,
              color: colorChip.green,
            },
          },
          {
            text: big ? obj.contents.join("\n") : obj.contents.join(" "),
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.7),
              width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          },
        ]
      });

    } else if (obj.type === "second") {

      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(num === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
        },
        children: [
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              verticalAlign: "top",
              width: desktop ? String(firstWidth) + ea : String(100) + '%',
              marginBottom: desktop ? "" : String(1.5) + ea,
            },
            children: [
              {
                text: num === 0 ? title : "",
                style: {
                  display: desktop ? "inline-block" : "block",
                  position: "relative",
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(700),
                  lineHeight: String(1.7),
                  color: colorChip.black,
                  textAlign: "left",
                  background: colorChip.white,
                  paddingRight: String(linePadding) + ea,
                },
                bold: {
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(700),
                  color: colorChip.green,
                },
              }
            ]
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              verticalAlign: "top",
              lineHeight: String(1.7),
              width: String(secondWidth) + ea,
              marginRight: String(secondMarginRight) + ea,
              color: colorChip.green,
            },
          },
          {
            text: obj.title,
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(700),
              verticalAlign: "top",
              lineHeight: String(1.7),
              width: String(middleSecondWidth) + ea,
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          },
          {
            text: big ? obj.contents.join("\n") : obj.contents.join(" "),
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.7),
              width: withOut(firstWidth + secondWidth + secondMarginRight + middleSecondWidth, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          },
        ]
      });


    } else if (obj.type === "gray") {

      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: desktop ? String(num === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea : String(mobileGrayMarginBottom) + ea,
          paddingTop: desktop ? "" : String(mobileGrayPaddingTop) + ea,
        },
        children: [
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              verticalAlign: "top",
              width: desktop ? String(firstWidth) + ea : String(100) + '%',
              marginBottom: desktop ? "" : String(1.5) + ea,
            },
            children: [
              {
                text: num === 0 ? title : "",
                style: {
                  display: desktop ? "inline-block" : "block",
                  position: "relative",
                  fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                  fontWeight: String(700),
                  lineHeight: String(1.7),
                  color: colorChip.black,
                  textAlign: "left",
                  background: colorChip.white,
                  paddingRight: String(linePadding) + ea,
                },
                bold: {
                  fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                  fontWeight: String(700),
                  color: colorChip.green,
                },
              }
            ]
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(700),
              verticalAlign: "top",
              lineHeight: String(1.7),
              width: String(secondWidth) + ea,
              marginRight: String(secondMarginRight) + ea,
              color: colorChip.green,
            },
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              verticalAlign: "top",
              width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
              paddingTop: String(grayPaddingTop) + ea,
              paddingBottom: String(grayPaddingTop) + ea,
              background: colorChip.gray1,
              borderRadius: String(8) + "px",
            },
            children: [
              {
                text: obj.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                  fontWeight: String(700),
                  verticalAlign: "bottom",
                  lineHeight: String(1.7),
                  color: colorChip.black,
                  paddingLeft: String(grayPaddingLeft) + ea,
                  width: String(middleSecondWidth - grayPaddingLeft) + ea,
                }
              },
              {
                text: obj.contents.map((str) => { return `- ${str}`; }).join("\n"),
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                  fontWeight: String(400),
                  verticalAlign: "top",
                  lineHeight: String(1.7),
                  color: colorChip.black,
                  width: desktop ? "" : withOut(middleSecondWidth + grayPaddingLeft, ea),
                }
              },
            ]
          },
        ]
      });

    }

    num++;
  }


  // 4

  ({ title, contents } = mainContents[3]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom1) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: contents.join("\n"),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });


  // 5

  ({ title, contents, final, gray } = mainContents[4]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: contents.join("\n"),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });
  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: desktop ? String(contentsMarginBottom0) + ea : String(mobileGrayMarginBottom) + ea,
      paddingTop: desktop ? "" : String(mobileGrayPaddingTop) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: "",
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        style: {
          display: "inline-block",
          verticalAlign: "top",
          width: withOut(firstWidth + secondWidth + secondMarginRight + (grayPadding * 2), ea),
          borderRadius: String(8) + "px",
          position: "relative",
          background: colorChip.gray2,
          padding: String(grayPadding) + ea,
        },
        children: [
          {
            style: {
              display: "block",
              paddingTop: String(grayPaddingTop) + ea,
              paddingBottom: String(grayPaddingTop) + ea,
              paddingLeft: String(grayPaddingLeft) + ea,
              paddingRight: String(grayPaddingLeft) + ea,
              width: withOut(grayPaddingLeft * 2, ea),
              borderRadius: String(8) + "px",
              position: "relative",
              background: colorChip.white,
            },
            children: [
              {
                text: gray.join("\n"),
                style: {
                  position: "relative",
                  fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                  fontWeight: String(600),
                  verticalAlign: "top",
                  lineHeight: String(desktop ? 2 : 1.8),
                  color: colorChip.black,
                }
              }
            ]
          }
        ]
      },
    ]
  });
  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: final.join("\n"),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });

}

PartnershipManualJs.prototype.insertContentsBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;
  let mainContents;
  let mainTitle;
  let title, contents;
  let factors;
  let contentsHeight;
  let factorBoxTop, factorBoxLeft;
  let factorLineTop, factorLineLeft, factorLineWidth, factorLineHeight;
  let preContents;
  let middleSecondWidth;
  let grayPadding;
  let grayPaddingLeft, grayPaddingTop;
  let final;
  let gray;
  let bigPaddingWidth;
  let bigPaddingPaddingVisual;
  let lineBoxPaddingTop;
  let lineBoxHeight;
  let bigPaddingNumberWidth;
  let textTop;
  let mobileGrayPaddingTop;
  let mobileGrayMarginBottom;

  mobileGrayPaddingTop = 1;
  mobileGrayMarginBottom = 4.5;

  textTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 36, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 14 : 12), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 180, 170, 150, 0 %%>;
  secondWidth = <%% 15, 15, 8, 0, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 0 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 24, 24, 24, 24, 2 %%>;
  contentsMarginBottom1 = <%% 60, 56, 48, 42, 6 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 0 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  contentsHeight = <%% 180, 180, 180, 180, 180 %%>;

  factorBoxTop = <%% 25, 25, 25, 25, 25 %%>;
  factorBoxLeft = <%% 920, 920, 920, 920, 920 %%>;

  factorLineTop = <%% 36, 36, 36, 36, 36 %%>;
  factorLineLeft = <%% 888, 888, 888, 888, 888 %%>;
  factorLineWidth = <%% 22, 22, 22, 22, 22 %%>;
  factorLineHeight = <%% 123, 123, 123, 123, 123 %%>;

  middleSecondWidth = <%% 175, 140, 125, 110, 22 %%>;

  grayPadding = <%% 12, 12, 12, 8, 3 %%>;

  grayPaddingLeft = <%% 30, 30, 30, 24, 4.5 %%>;
  grayPaddingTop = <%% 22, 20, 18, 16, 3 %%>;

  bigPaddingWidth = <%% 424, 188, 172, 148, 12 %%>;
  bigPaddingPaddingVisual = <%% 16, 16, 16, 12, 2 %%>;
  lineBoxPaddingTop = <%% 12, 12, 12, 11, 2.5 %%>;
  lineBoxHeight = <%% 23, 22, 22, 21, 10.7 %%>;

  bigPaddingNumberWidth = <%% 12, 12, 12, 9, 4 %%>;

  mainTitle = "콘텐츠 활용 가이드";
  mainContents = [
    {
      preContents: [
        "홈리에종 프로젝트의 포트폴리오를 개인 채널에서 활용하실 경우, 필수로 기재해주셔야하는 내용을 안내드립니다.",
        "<b%협업 파트너십을 유지하기 위한 기본적인 사항으로 꼭 기재%b>해주시기를 요청드리며, 기재가 되어있지 않을 경우, 별도로 추가 요청을 드릴 수 있습니다.",
      ],
      contents: [
        big ? "홈리에종에서 제공받은 현장의 사진을 사용할 때에는 홈리에종의 컨텐츠 활용 가이드 라인을 지킵니다." : "홈리에종에서 제공받은 사진을 사용할 때에는 홈리에종의 가이드를 지킵니다.",
        "디자이너가 사용하는 모든 SNS채널, 웹페이지, 유튜브 채널에 공통적으로 적용됩니다.",
        "1회에 한정되는 것이 아니라 현장 포트폴리오를 사용할 때마다 적용됩니다.",
      ]
    },
    {
      title: "채널별 사용 권한",
      contents: [
        {
          title: "인스타그램",
          contents: [
            "<b%인물 해시 태그%b> : 피드 게시물 사진에 직접 인물 해시 태그",
            "<b%내용 해시 태그%b> : #홈리에종",
            "<b%내용 필수 문구%b> : 협업 사실 명시 => 이 프로젝트는 디자이너와 함께하는 홈스타일링 플랫폼, 홈리에종을 통해 진행했습니다. www.home-liaison.com",
          ]
        },
        {
          title: "유튜브",
          contents: [
            "<b%내용 필수 문구%b> : 홈리에종 협업 사실 명시",
            "<b%자막 2-3초%b> : 이 프로젝트는 디자이너와 함께하는 홈스타일링 플랫폼, 홈리에종을 통해 진행했습니다.",
            "<b%내용 해시 태그%b> : #홈리에종",
            "<b%영상 타이틀%b> : 타이틀에 홈리에종 기입, 홈리에종 기업명은 항상 가장 좌측에 위치",
          ]
        },
        {
          title: "블로그",
          contents: [
            "<b%홈리에종 로고 삽입%b> : 메인 사진 아래에 홈리에종 지정 로고 삽입",
            "<b%지정 문구 삽입%b> : 협업 사실 명시 => 이 프로젝트는 디자이너와 함께하는 홈스타일링 플랫폼, 홈리에종을 통해 진행했습니다.",
            "<b%해시 태그%b> : #홈리에종",
            "<b%링크 삽입%b> : home-liaison.com",
          ]
        }
      ]
    },
    {
      title: "홈리에종 컨텐츠 공유",
      contents: [
        "홈리에종의 촬영본은 홈리에종 촬영 컨텐츠 활용 가이드에 맞게 사용하여야 하며, 다른 상업적인 용도로 활용할 수가 없음을 안내드립니다.",
        "포토 실장님과 진행 시 홈리에종과 디자이너가 각각 50%씩 부담하며, 디자이너는 워터마크 없는 촬영본을 공유받을 수 있습니다.",
        "고객에겐 워터마크가 찍힌 사진을 제공하고, 제품 구매의 후기 사진 등, 타 회사의 상업적 용도로 사용될 수 없음을 미리 안내드립니다.",
      ]
    }
  ];

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? margin : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: "block",
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: mainTitle,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(800),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          borderRadius: mobile ? String(1) + ea : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: desktop ? "1px solid " + colorChip.shadow : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(6) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  // 1

  ({ preContents, contents } = mainContents[0]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: desktop ? preContents.join("\n") : preContents.join(" "),
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.black,
            },
          }
        ]
      },
    ]
  });
  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom1) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: withOut(0, ea),
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(bigPaddingWidth) + ea,
              paddingRight: String(bigPaddingPaddingVisual) + ea,
              verticalAlign: "top",
              paddingTop: String(lineBoxPaddingTop) + ea,
            },
            children: (new Array(contents.length)).fill(null).map((n, index) => {
              return {
                style: {
                  display: "block",
                  position: "relative",
                  borderTop: "1px solid " + colorChip.gray3,
                  height: String(index === contents.length - 1 ? 0 : lineBoxHeight) + ea,
                }
              };
            }),
          },
          {
            text: (new Array(contents.length)).fill(null).map((n, index) => { return `${String(index + 1)}) ` }),
            style: {
              display: desktop ? "inline-block" : "none",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(400),
              lineHeight: String(1.7),
              color: colorChip.deactive,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
              width: String(bigPaddingNumberWidth) + ea,
              verticalAlign: "top",
              top: String(textTop) + ea,
            }
          },
          {
            text: desktop ? contents.join("\n") : contents.map((str, index) => { return `${String(index + 1)}) ${str}` }).join("\n"),
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
              verticalAlign: "top",
              top: String(textTop) + ea,
              width: desktop ? "" : withOut(bigPaddingWidth + bigPaddingPaddingVisual, ea),
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
    ]
  });

  // 2

  ({ title, contents } = mainContents[1]);

  num = 0;
  for (let obj of contents) {
    createNode({
      mother: tong,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(num === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
      },
      children: [
        {
          style: {
            display: desktop ? "inline-block" : "block",
            position: "relative",
            verticalAlign: "top",
            width: desktop ? String(firstWidth) + ea : String(100) + '%',
            marginBottom: desktop ? "" : String(1.5) + ea,
          },
          children: [
            {
              text: num === 0 ? title : "",
              style: {
                display: desktop ? "inline-block" : "block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(700),
                lineHeight: String(1.7),
                color: colorChip.black,
                textAlign: "left",
                background: colorChip.white,
                paddingRight: String(linePadding) + ea,
              },
              bold: {
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(700),
                color: colorChip.green,
              },
            }
          ]
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(contentsWordingSize) + ea,
            fontWeight: String(700),
            verticalAlign: "top",
            lineHeight: String(1.7),
            width: String(secondWidth) + ea,
            marginRight: String(secondMarginRight) + ea,
            color: colorChip.green,
          },
        },
        {
          text: obj.title,
          style: {
            display: "inline-block",
            fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
            fontWeight: String(700),
            verticalAlign: "top",
            lineHeight: String(1.7),
            width: String(middleSecondWidth) + ea,
            textAlign: "left",
            color: colorChip.black,
          },
          bold: {
            fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
            fontWeight: String(700),
            color: colorChip.black,
          },
          under: {
            fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
            fontWeight: String(700),
            color: colorChip.green,
          },
        },
        {
          text: obj.contents.join("\n"),
          style: {
            display: "inline-block",
            fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
            fontWeight: String(400),
            verticalAlign: "top",
            lineHeight: String(1.7),
            width: withOut(firstWidth + secondWidth + secondMarginRight + middleSecondWidth, ea),
            textAlign: "left",
            color: colorChip.black,
          },
          bold: {
            fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
            fontWeight: String(400),
            color: colorChip.green,
          },
          under: {
            fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
            fontWeight: String(400),
            color: colorChip.green,
          },
        },
      ]
    });
    num++;
  }

  // 3

  ({ title, contents } = mainContents[2]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(desktop ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: media[0] ? contents.join("\n") : contents.join(" "),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });


}

PartnershipManualJs.prototype.insertProcessBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;
  let mainContents;
  let mainTitle;
  let title, contents;
  let factors;
  let contentsHeight;
  let factorBoxTop, factorBoxLeft;
  let factorLineTop, factorLineLeft, factorLineWidth, factorLineHeight;
  let checkBoxTongWidth;
  let checkBoxTongPaddingTop;
  let checkBoxWidth;
  let checkboxBetween;
  let numberTongWidth;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 36, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 14 : 12), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 180, 170, 150, 0 %%>;
  secondWidth = <%% 15, 15, 8, 0, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 0 %%>;

  checkBoxWidth = <%% 10, 9, 8, 7, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 24, 24, 24, 24, 2 %%>;
  contentsMarginBottom1 = <%% 60, 56, 48, 42, 6 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  contentsHeight = <%% 180, 180, 180, 180, 180 %%>;

  factorBoxTop = <%% 25, 25, 25, 25, 25 %%>;
  factorBoxLeft = <%% 920, 920, 920, 920, 920 %%>;

  factorLineTop = <%% 36, 36, 36, 36, 36 %%>;
  factorLineLeft = <%% 888, 888, 888, 888, 888 %%>;
  factorLineWidth = <%% 22, 22, 22, 22, 22 %%>;
  factorLineHeight = <%% 123, 123, 123, 123, 123 %%>;

  checkBoxTongWidth = <%% 20, 20, 20, 16, 0 %%>;
  checkBoxTongPaddingTop = <%% (isMac() ? 8 : 6), (isMac() ? 8 : 6), (isMac() ? 8 : 7), (isMac() ? 8 : 6), 0 %%>;
  checkBoxWidth = <%% 11, 10, 10, 9, 0 %%>;
  checkboxBetween = <%% 15.2, 15.2, 15.2, 14.4, 1 %%>;

  numberTongWidth = <%% 32, 32, 32, 32, 0 %%>;

  mainTitle = "디자이너 프로젝트 진행";
  mainContents = [
    {
      title: "디자이너 현장 미팅 준비",
      contents: [
        "약속된 현장 미팅 일자 기준 2-3일 전, 사전에 연락합니다. 홈리에종에서는 3일 기준으로 안내문을 발송합니다.",
        "담당 디자이너 인사, 디자이너의 업무 방식에 따라 필요로 하는 자료가 있다면 고객에게 요청합니다.",
        "홈리에종은 기본적으로 <b%1) 현장의 도면 2) 재배치가 필요한 가전, 가구, 3) 정확한 예산, 4) 방 마다의 사용 목적%b> 을 가지고 디자이너를 만날 것을 권장하고 있습니다.",
      ],
    },
    {
      title: "디자이너 현장 미팅 응대",
      contents: [
        desktop ? "고객이 준비한 도면을 받더라도 실측은 정확하게 합니다." : "고객에게 도면을 받더라도 실측은 정확하게 합니다.",
        "고객의 예산을 분명히 확인하고, 최대 가용 예산 범위가 있는 지 확인합니다.",
        big ? "현장 미팅 후, 구두로 전할 수 있는 상담을 진행합니다. 미팅 후 디자인 작업을 시작하지 않습니다." : "현장 미팅 후, 상담을 진행합니다. 미팅 후 디자인 작업을 시작하지 않습니다.",
        big ? "고객에게 프로젝트 전체 프로세스를 설명하고, 디자이너의 작업 기간과 방식에 대해 명확하게 설명합니다." : "고객에게 프로세스를 설명하고, 작업 기간과 방식에 대해 명확하게 설명합니다.",
        big ? "시공이 있는 경우 사전에 일자 협의가 완료되면 소장님과 함께 현장을 방문하여 시공 범위를 조정합니다." : "시공이 있는 경우 소장님과 함께 현장을 방문하여 시공 범위를 조정합니다.",
        big ? "소장님과 현장에 함께 가지 못하게 되는 경우, 소장님이 이해하기 쉽도록 정리하여 내용을 공유합니다." : "현장에 함께 가지 못하게 되는 경우, 소장님이 이해하기 쉽도록 정리하여 공유합니다.",
        big ? "시공이 있는 경우 미팅 완료 이후에 정리된 시공 범위를 시공의뢰서로 작성하여 홈리에종으로 공유합니다." : "정리된 시공 범위를 시공의뢰서로 작성하여 홈리에종으로 공유합니다.",
        "현장 미팅이 끝나고 홈리에종으로부터 진행 확인을 받은 후에 프로젝트를 진행합니다.",
        big ? "현장 미팅 이후, 고객이 디자이너와 진행하지 않음을 선택하거나 디자이너 변경을 요청할 수 있습니다." : "현장 미팅 이후, 고객이 진행하지 않거나 디자이너 변경을 요청할 수 있습니다.",
        "위와 같은 경우에는 <b%디자이너에게 출장 비용 (110,000 vat포함)만 지급%b>됩니다. ",
      ],
    },
    {
      title: "디자인 제안 폼",
      contents: [
        big ? "디자이너가 고객에게 제공할 제안서의 가이드 폼은 공유하나, 디자이너 개개인의 작업 방식을 존중합니다." : "디자이너가 제공할 제안서의 가이드 폼은 공유하나, 개개인의 작업 방식을 존중합니다.",
        big ? "작업 방식을 허용하더라도, 홈리에종 가이드 폼에 들어있는 필수 내용은 포함되어 있어야 합니다." : "홈리에종 가이드 폼에 들어있는 필수 내용은 포함되어 있어야 합니다.",
        "필수적인 내용 : <b%1) 프로젝트 캘린더 2) 컨셉 제안서 3) 디자인 제안서 4) 제품 구매리스트%b>",
      ]
    },
    {
      title: "시공사 선택",
      contents: [
        "홈리에종은 고객님이 시공사를 자유롭게 선택하실 수 있도록 해드립니다.",
        "모든 시공사는 경험에 따라 시공 방법 및 견적 금액이 다를 수 있습니다. 지나치게 저렴하거나 비싼 경우는 피하는 것이 좋습니다.",
        "선택지 중, 홈리에종 시공사도 있으며 <b%시공 퀄리티, 합리적인 견적을 원하신다면 추천%b>해드립니다."
      ]
    },
    {
      title: "",
      contents: [
        "선택하신 시공사와 직접 고객이 계약을 맺습니다.",
        "시공에 대한 모든 책임은 계약한 시공사에 있습니다.",
        "시공 복잡도에 따라 디자이너의 시공 감리 비용을 책정할 수 있습니다.",
        "감리 비용은 ‘시공 감리’라고 명하고 기업 이윤 내에 반영해야 합니다.",
        "디자이너 연계 시공사의 경우 홈리에종에서 견적 확인 후 고객에게 안내할 수 있습니다.",
      ]
    },
    {
      title: "시공의뢰서",
      contents: [
        "시공이 있는 경우, 디자이너는 시공사에게 가능 여부와 견적을 의뢰합니다.",
        "시공의뢰서는 반드시 필요하며, <b%홈리에종 직영 시공을 선택 시, 홈리에종의 시공의뢰서 가이드 라인%b>을 따릅니다."
      ]
    },
    {
      title: "",
      contents: [
        "디자이너는 고객과 합의된 내용을 바탕으로 시공 의뢰서를 작성합니다.",
        "홈리에종 시공의뢰서에 표기해야할 모든 셀의 내용은 입력하며, 꼭 사진을 첨부합니다.",
        "수량을 셀 수 있는 경우에는 개수를 꼭 표기하며, 자재명이 정해져 있다면 기입해줍니다.",
        big ? "도면을 첨부하여 시공사가 현장을 방문했을 때 쉽게 파악할 수 있도록 시공 위치를 자세히 표현합니다." : "시공사가 쉽게 파악할 수 있도록 시공 위치를 자세히 표현합니다.",
        "시공의뢰서 확인을 위해 홈리에종 소장님이 연락할 수 있습니다.",
      ]
    },
    {
      title: "디자이너 소통",
      contents: [
        "현장 미팅 후, 디자이너는 홈리에종 카카오톡 채널을 통해 홈리에종으로 현장 미팅 종료 상황에 대해 공유합니다.",
        "현장 미팅 후, <b%현장에 대한 이슈가 발생했거나, 혹은 사전에 홈리에종으로부터 안내받은 내용과 현장 상황이 다른 부분이 있다면 홈리에종과 확인 후 프로젝트를 진행%b>해야 합니다.",
        "고객과 커뮤니케이션을 위해 연락 방법과 디자이너의 개인 사정으로 연락이 불가한 시간대에 대해 설명합니다.",
      ],
    },
  ];

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? margin : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: "block",
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: mainTitle,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(800),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          borderRadius: mobile ? String(1) + ea : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: desktop ? "1px solid " + colorChip.shadow : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(6) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  // 1

  ({ title, contents } = mainContents[0]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom1) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: big ? contents.join("\n") : contents.join(" "),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });


  // 2

  ({ title, contents } = mainContents[1]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom1) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        style: {
          display: "inline-block",
          verticalAlign: "top",
          width: String(checkBoxTongWidth) + ea,
          textAlign: "left",
          color: colorChip.deactive,
          paddingTop: String(checkBoxTongPaddingTop) + ea,
        },
        children: (new Array(contents.length)).fill(null).map((n, index) => {
          return {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.green),
            style: {
              display: "block",
              width: String(checkBoxWidth) + ea,
              marginBottom: String(checkboxBetween) + ea,
            }
          };
        })
      },
      {
        text: (new Array(contents.length)).fill(1).map((num, index) => { return `${String(num + index)}) ` }).join("\n"),
        style: {
          display: desktop ? "inline-block" : "none",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(desktop ? 1.8 : 1.6),
          width: String(numberTongWidth) + ea,
          textAlign: "left",
          color: colorChip.deactive,
        },
      },
      {
        text: desktop ? contents.join("\n") : contents.map((str, index) => { return `<div style="display:inline-block;position:relative;width:2.5vw;height:2.5vw;margin-right:1vw;top:0.1vw">${instance.mother.returnCheckBox(colorChip.green)}</div>&nbsp;<u%${String(index + 1)})%u>&nbsp;${str}`; }).join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(desktop ? 1.8 : 1.7),
          width: withOut(firstWidth + secondWidth + secondMarginRight + checkBoxTongWidth + numberTongWidth, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(desktop ? 700 : 400),
          color: desktop ? colorChip.green : colorChip.deactive,
        },
      },
    ]
  });

  // 3

  ({ title, contents } = mainContents[2]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom1) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        style: {
          display: "inline-block",
          verticalAlign: "top",
          width: String(checkBoxTongWidth) + ea,
          textAlign: "left",
          color: colorChip.deactive,
          paddingTop: String(checkBoxTongPaddingTop) + ea,
        },
        children: (new Array(contents.length)).fill(null).map((n, index) => {
          return {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.green),
            style: {
              display: "block",
              width: String(checkBoxWidth) + ea,
              marginBottom: String(checkboxBetween) + ea,
            }
          };
        })
      },
      {
        text: (new Array(contents.length)).fill(1).map((num, index) => { return `${String(num + index)}) ` }).join("\n"),
        style: {
          display: desktop ? "inline-block" : "none",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(desktop ? 1.8 : 1.6),
          width: String(numberTongWidth) + ea,
          textAlign: "left",
          color: colorChip.deactive,
        },
      },
      {
        text: desktop ? contents.join("\n") : contents.map((str, index) => { return `<div style="display:inline-block;position:relative;width:2.5vw;height:2.5vw;margin-right:1vw;top:0.1vw">${instance.mother.returnCheckBox(colorChip.green)}</div>&nbsp;<u%${String(index + 1)})%u>&nbsp;${str}`; }).join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(desktop ? 1.8 : 1.7),
          width: withOut(firstWidth + secondWidth + secondMarginRight + checkBoxTongWidth + numberTongWidth, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(desktop ? 700 : 400),
          color: desktop ? colorChip.green : colorChip.deactive,
        },
      },
    ]
  });

  // 4

  ({ title, contents } = mainContents[3]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: desktop ? contents.join("\n") : contents.join(" "),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });

  // 5

  ({ title, contents } = mainContents[4]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom1) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        style: {
          display: "inline-block",
          verticalAlign: "top",
          width: String(checkBoxTongWidth) + ea,
          textAlign: "left",
          color: colorChip.deactive,
          paddingTop: String(checkBoxTongPaddingTop) + ea,
        },
        children: (new Array(contents.length)).fill(null).map((n, index) => {
          return {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.green),
            style: {
              display: "block",
              width: String(checkBoxWidth) + ea,
              marginBottom: String(checkboxBetween) + ea,
            }
          };
        })
      },
      {
        text: (new Array(contents.length)).fill(1).map((num, index) => { return `${String(num + index)}) ` }).join("\n"),
        style: {
          display: desktop ? "inline-block" : "none",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(desktop ? 1.8 : 1.6),
          width: String(numberTongWidth) + ea,
          textAlign: "left",
          color: colorChip.deactive,
        },
      },
      {
        text: desktop ? contents.join("\n") : contents.map((str, index) => { return `<div style="display:inline-block;position:relative;width:2.5vw;height:2.5vw;margin-right:1vw;top:0.1vw">${instance.mother.returnCheckBox(colorChip.green)}</div>&nbsp;<u%${String(index + 1)})%u>&nbsp;${str}`; }).join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(desktop ? 1.8 : 1.7),
          width: withOut(firstWidth + secondWidth + secondMarginRight + checkBoxTongWidth + numberTongWidth, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(desktop ? 700 : 400),
          color: desktop ? colorChip.green : colorChip.deactive,
        },
      },
    ]
  });


  // 6

  ({ title, contents } = mainContents[5]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: desktop ? contents.join("\n") : contents.join(" "),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });

  // 7

  ({ title, contents } = mainContents[6]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom1) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        style: {
          display: "inline-block",
          verticalAlign: "top",
          width: String(checkBoxTongWidth) + ea,
          textAlign: "left",
          color: colorChip.deactive,
          paddingTop: String(checkBoxTongPaddingTop) + ea,
        },
        children: (new Array(contents.length)).fill(null).map((n, index) => {
          return {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.green),
            style: {
              display: "block",
              width: String(checkBoxWidth) + ea,
              marginBottom: String(checkboxBetween) + ea,
            }
          };
        })
      },
      {
        text: (new Array(contents.length)).fill(1).map((num, index) => { return `${String(num + index)}) ` }).join("\n"),
        style: {
          display: desktop ? "inline-block" : "none",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(desktop ? 1.8 : 1.6),
          width: String(numberTongWidth) + ea,
          textAlign: "left",
          color: colorChip.deactive,
        },
      },
      {
        text: desktop ? contents.join("\n") : contents.map((str, index) => { return `<div style="display:inline-block;position:relative;width:2.5vw;height:2.5vw;margin-right:1vw;top:0.1vw">${instance.mother.returnCheckBox(colorChip.green)}</div>&nbsp;<u%${String(index + 1)})%u>&nbsp;${str}`; }).join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(desktop ? 1.8 : 1.7),
          width: withOut(firstWidth + secondWidth + secondMarginRight + checkBoxTongWidth + numberTongWidth, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(desktop ? 700 : 400),
          color: desktop ? colorChip.green : colorChip.deactive,
        },
      },
    ]
  });


  // 8

  ({ title, contents } = mainContents[7]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(desktop ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: contents.join("\n"),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });


}

PartnershipManualJs.prototype.insertButtonBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, downloadFile, selfHref } = GeneralJs;
  const buttonsClassName = "buttonsClassName";
  let margin;
  let paddingTop;
  let titleFontSize;
  let bottomMargin;
  let whiteBlock;
  let grayTong;
  let arrowBetween;
  let innerMargin;
  let arrowWidth, arrowHeight;
  let textTop;
  let textSize, textWeight;
  let textMarginLeft;
  let buttonHeight, buttonPadding;
  let buttonBetween;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 40, 40, 40, 40, 4 %%>;

  arrowBetween = <%% 5, 5, 5, 5, 4 %%>;
  arrowWidth = <%% 204, 203, 203, 203, 203 %%>;
  arrowHeight = <%% 100, 100, 100, 100, 100 %%>;

  textTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (GeneralJs.isIphone() ? -0.1 : -0.2) %%>;
  textSize = <%% 17, 17, 15, 14, 2.5 %%>;
  textWeight = <%% 700, 700, 700, 700, 700 %%>;
  textMarginLeft = <%% 50, 50, 50, 50, 50 %%>;

  buttonPadding = <%% 20, 19, 18, 18, 2.1 %%>;
  buttonHeight = <%% 42, 42, 36, 32, 6.3 %%>;

  buttonBetween = <%% 6, 6, 5, 4, 0.5 %%>;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(paddingTop) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  grayTong = createNode({
    mother: whiteTong,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    }
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/manual.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "콘솔 사용법",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/fee.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "디자인비 설명",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/provision.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "디자이너 가이드",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/provision.php";
        url += "?mode=contract&";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      // marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "계약 내역",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

PartnershipManualJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, serviceParsing, colorChip } = GeneralJs;
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

    const getObj = returnGet();
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let desid, designers, designer;
    let requestNumber;
    let service;
    let response, services;
    let ghostContents;
    let socket;
    let wsLaunching;
    let wsOpenEvent;
    let wsMessageEvent;
    let wsCloseEvent;

    if (getObj.desid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    desid = getObj.desid;
    this.desid = desid;
    designers = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getDesigners", { equal: true });
    if (designers.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ designer ] = designers;
    this.designer = designer;

    await this.mother.ghostDesignerLaunching({
      name: "partnershipManual",
      designer: this.designer,
      base: {
        instance: this,
        binaryPath: PartnershipManualJs.binaryPath,
        subTitle: "",
      },
      local: async () => {
        try {
          let whiteBlock;
          instance.insertInitBox();
          instance.insertFirstBox();
          instance.insertContextBox();
          instance.insertPreProjectBox();
          instance.insertFirstProjectBox();
          instance.insertPhotoSettingBox();
          instance.insertContentsBox();
          instance.insertProcessBox();
          instance.insertButtonBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "PartnershipManualJs.launching.ghostDesignerLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "PartnershipManualJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
