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
      "return ('유의 사항 안내 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('유의 사항 안내 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "contractCaution",
  "hangul": "유의 사항 안내",
  "route": [
    "contractCaution"
  ]
} %/%/g

const ContractCautionJs = function () {
  this.mother = new GeneralJs();
}

ContractCautionJs.binaryPath = FRONTHOST + "/middle/console/possible";

ContractCautionJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
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

  titleWording = "유의 사항 안내";
  subTitleContents = "디자이너와 진행 시 유의 사항 안내";

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

ContractCautionJs.prototype.insertFirstBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, colorExtended, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
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
      "고객님게 가장 만족스러운",
      "인테리어가 되도록"
    ],
    description: [
      [
        "홈리에종은 집을 디자인하는 새로운 방법을 안내합니다.",
        "고객에게 가장 효과적이고, 만족스러운 홈스타일링이 되도록 혁신적인 서비스를 제공하고자 노력하며, 모두가 만족스러운 결과를 얻도록 고객 중심의 프로젝트를 홈리에종이 함께 케어합니다."
      ],
      [
        "고객님께 홈리에종의 파트너 디자이너와 인테리어 프로젝트를 진행하는 데 있어 주의하실 점들을 주제별로 정리하여 페이지 형태로 보내드립니다. 디자이너와 현장 미팅 전, 한 번씩은 꼭 읽어주시길 바랍니다.",
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

ContractCautionJs.prototype.insertContextBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, colorExtended, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker } = GeneralJs;
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
  buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;

  mobileContextBetween = 3;

  contents = [
    {
      title: "계약 및 환불",
      context: [
        "계약금 및 미팅",
        "계약서 서명 및 잔금",
        "환불 및 기타 사항"
      ],
      scroll: [
        1000,
        1100,
        1100,
      ],
    },
    {
      title: "시공 유의 사항",
      context: [
        "시공사 선택",
        "시공사 계약",
        "홈리에종 시공사",
        "기타 시공 관련",
      ],
      scroll: [
        1600,
        1900,
        2400,
        3800
      ],
    },
    {
      title: "디자인 관련 사항",
      context: [
        "디자인 진행",
        "디자인비 조정",
        "세팅 및 촬영",
      ],
      scroll: [
        4440,
        4600,
        4600,
      ],
    },
    {
      title: "구매 유의 사항",
      context: [
        "제품 구매",
        "제품 수령 및 세팅",
        "최종 결정권",
      ],
      scroll: [
        5350,
        5800,
        6000,
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
          borderRadius: String(desktop ? 8 : 1) + ea,
          paddingTop: String(grayInnerPadding) + ea,
          paddingBottom: String(grayInnerPadding) + ea,
          background: colorChip.gray1,
        }
      }
    ]
  });
  whiteTong = whiteBlock.children[0];

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
              color: colorExtended.mainBlue,
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

ContractCautionJs.prototype.contentsCenter = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  let contentsArr;
  let lastBlockMarginBottom;
  let block;

  lastBlockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  contentsArr = [
    {
      title: "계약 및 환불",
      contents: [
        {
          title: "계약금 및 미팅",
          contents: [
            {
              text: "디자이너와 <b%미팅 후에는 계약금 환불이 불가%b>해요.",
            },
            {
              text: "미팅 후 부득이하게 <b%디자이너 변경이 필요한 경우에는 1회에 한하여 요청%b>하실 수 있어요.",
            },
          ],
        },
        {
          title: "계약서 서명 및 잔금 입금",
          contents: [
            {
              text: "미팅 후 계약서 서명과 디자인비 잔금 전액을 입금하시면 프로젝트 진행을 최종 확정해요.",
            },
            {
              text: "서비스 제공 기간은 협의 후에 계약서에 기재해요.",
            },
            {
              text: "프로젝트는 서비스 제공 기간에 맞추어 시작해요.",
              children: [
                {
                  text: "디자이너는 월마다 진행하는 프로젝트가 있어요.",
                },
                {
                  text: "혹시 디자이너의 일정 마감으로 기다렸다 진행하셔야 하는 경우 별도로 빠른 진행을 요청하시는 것은 곤란해요. 이미 진행 중인 다른 고객에게 불편함을 주는 동시에 고객님 댁도 디자이너의 집중 케어를 받기 어렵습니다.",
                }
              ]
            },
          ],
        },
        {
          title: "환불 및 기타 사항",
          contents: [
            {
              text: "프로젝트 진행을 결정하시고 <b%계약서 서명 및 잔금 입금을 완료하신 후에는 프로젝트의 중단 및 환불이 불가%b>해요.",
            },
            {
              text: "서비스 제공기간이 종료되면 추가 문의는 불가해요.",
            },
          ],
        }
      ]
    },
    {
      title: "시공 유의 사항",
      contents: [
        {
          title: "시공사 선택",
          contents: [
            {
              text: "<b%홈스타일링 서비스(부분 시공 + 스타일링)를 진행하실 경우, 아래의 3가지 시공사 중 선택이 가능%b>해요.",
              children: [
                {
                  text: "홈리에종 시공사",
                },
                {
                  text: "디자이너 시공사",
                },
                {
                  text: "고객 별도 선택 시공사",
                },
              ]
            },
            {
              text: "토탈 서비스, 엑스트라 토탈 서비스(전체 시공 + 스타일링)를 진행하실 경우, 선택하신 디자이너에 따라 아래의 시공사 중 매칭되는 시공사와 진행하시게 돼요.",
              children: [
                {
                  text: "홈리에종 시공사",
                },
                {
                  text: "디자이너 시공사"
                }
              ]
            },
            {
              text: "위와 같이 서비스 유형에 따른 시공사 선택지가 있지만, 디자이너별로 가능한 선택지가 달라져요. 디자이너 추천서에서 디자이너별 시공사 선택지를 확인하세요.",
            }
          ],
        },
        {
          title: "시공사 계약",
          contents: [
            { text: "시공이 있는 프로젝트의 경우 홈리에종과 체결하는 디자인 계약과는 별도로 시공 계약을 체결하셔야 해요." },
            { text: "<b%선택하신 시공사와 직접 계약%b>을 하셔야 해요." },
            { text: "시공 금액 지불 / 시공 업무 진행(공사 일정 세팅, 공사 인력 세팅, 공사 진행, 공사품질 관리감독(감리), 하자보수, A/S 등)  / 시공과 관련된 일체의 책임은 계약을 체결한 시공사에게 있어요. <b%시공과 관련한 사항은 홈리에종이나 디자이너가 아닌 해당 시공사에 문의%b>하셔야 해요." },
            { text: "많이 문의하시는 “시공 감리”는 계약하신 시공사에서 진행하는 일이에요. <b%디자이너는 시공 감리를 하지 않아요.%b>" },
            { text: "디자이너는 시공 진행 시 전반적인 톤 앤 매너와 마감재 스펙을 제안해 드려요." },
            { text: "홈리에종 시공사 또는 디자이너 시공사가 아닌 <b%타 시공사와 진행하실 경우에는 시공사와의 커뮤니케이션은 고객님께서 직접%b> 해주셔야 해요." },
          ]
        },
        {
          title: "홈리에종 시공사",
          contents: [
            { text: "도배 또는 필름 시공만 필요하신 경우 홈리에종 단품 시공 계약이 가능해요. 그 외에는 홈리에종과 단품 시공 계약은 불가해요." },
            { text: "디자이너가 별도로 공정별 계약을 연결하는 것은 불가해요. (공정별 계약이란? 각 시공 항목마다 별도 계약하는 것을 의미해요.)" },
            { text: "홈리에종 시공사와 계약 시 ①공사 시작일 최소 한 달 전 견적 의뢰 ②<b%공사 시작일 최소 2주 전 시공 계약을 완료%b>하셔야 해요. / 홈리에종 시공사와 진행을 원하실 경우 프로젝트 초기에 의사를 알려주세요." },
            { text: "홈리에종 시공 계약의 경우 카드 결제가 불가하고 현금 결제만 가능해요. (홈리에종 외 일반 시공사들도 대체로 현금 결제만 가능한 편이에요.)" },
            { text: "홈리에종 시공 계약의 경우 VAT 10%를 포함하고 현금 영수증 등 증빙을 발행해요." },
          ]
        },
        {
          title: "기타 시공 관련",
          contents: [
            {
              text: "새아파트 부분 시공의 경우",
              children: [
                { text: "공동 구매 또는 고객 별도 선택 시공사 이용이 가능해요." },
                { text: "디자이너는 마감재 선택지 내 디자인 옵션(톤 앤 매너와 스펙)을 제안드려요." },
                { text: "진행 일정 논의 및 공사 진행 확인, 커뮤니케이션 등은 <b%고객님께서 직접 해주셔야%b> 해요." },
              ]
            },
            {
              text: "준공한 지 오래된 집의 경우",
              children: [
                { text: "준공한 지 오래된 집은 시공 진행 시 설비 이슈가 발생할 수 있어요." },
                { text: "설비 이슈는 배수, 배관, 보일러 등 내부 시설 정비와 관련이 있어요." },
                { text: "이 부분은 공사를 시작하기 전에는 상태를 알 수 없어요." },
                { text: "연식이 있는 집을 시공할 때는 이슈가 생겼을 때 대처할 수 있는 여유 자금이 필요하다는 것을 인지해주세요." },
              ]
            },
            {
              text: "거주 중의 경우",
              children: [
                { text: "공실인 집보다 고객님의 더 많은 협조가 필요해요." },
                { text: "거주 중에 가능한 시공은 부분 도배 또는 필름 정도이고, 현장 상황에 따라 시공이 불가한 경우도 있어요." },
                { text: "<b%거주 중에 가능한 시공 이상의 진행을 원하실 경우에는%b> 집(짐과 고객님 가족 모두)을 비워 주셔야 해요." },
                { text: "소음과 먼지가 발생해요." },
                { text: "시공 인력과 마감 자재가 드나들어요." },
                { text: "보관 이사 또는 거주하실 집은 별도로 알아보셔야 해요." },
                { text: "거주 중 시공 시에는 공실인 집을 시공할 때 보다 시공 금액이 더 높은 편이에요." },
                { text: "<b%공실인 상태에서 전체 시공을 하시는 경우가 아닐 경우, 보양을 하지만 진행 과정에서 스크래치가 생길 가능성이 높아요. 이 경우 별도로 A/S 해드리기 어려운 점을 감안%b>하셔야 해요." },
              ]
            },
          ]
        }
      ]
    },
    {
      title: "디자인 관련 사항",
      contents: [
        {
          title: "디자인",
          contents: [
            { text: "디자이너는 여러 가지를 종합적으로 고려해서 제안을 드려요." },
            { text: "미팅은 평균적으로 2회 정도 진행해요. 첫 현장 미팅 1회와 마무리 미팅 1회가 포함되고 현장 상황 또는 선택하신 <b%디자이너에 따라 미팅 횟수는 차이가 있어요.%b>" },
            { text: "커뮤니케이션은 미팅, 카톡, 문자, 전화, 메일 등으로 진행해요." },
            { text: "디자이너는 <b%컨셉 이미지/컨셉 보드, 배치도, 구매 제품리스트를 필수 제공%b>해드려요. 3D, 콜라주, 드로잉 등은 필수 제공 요소가 아니고 디자이너의 작업 방식에 따라 선택적으로 제공해드려요." },
            {
              text: "컨셉 설정을 위해 고객님의 의견이 꼭 필요해요.",
              children: [
                { text: "컨셉은 다채롭고, 좋고 나쁨이 아닌 개인의 취향과 선호도가 중요해요." },
                { text: "선호도를 프로젝트 초기에 디자이너에게 공유해주세요. 범주를 줄이면 보다 상세하고 효율적인 컨설팅을 받을 수 있어요." },
                { text: "특히, 취향이 명확하시거나 머릿속에 있는 느낌을 말로 전달하기 힘든 분들은 선호 사진(이미지)을 꼭 보내주세요." },
                { text: "명확한 취향이 없을 때에는 디자이너 주도하에 컨셉을 정할 수 있어요." },
                { text: "컨셉은 우리 집의 마지막 모습을 결정 지을 디자인 구상의 첫 단계이자 기준점이에요. 디자이너는 설정된 컨셉에 따라 여러 요소들을 일관성 있게 만들어가는 작업을 단계적으로 진행해요. 따라서 톤 앤 매너(컬러) 설정, 시공 범위의 조정, 마감재 및 제품의 선택 등 디자인 작업 전 과정에 영향을 미쳐요." },
                { text: "따라서 <b%첫 디자인 제안이 나온 후에는 컨셉 내에서 세부 사항을 수정 및 발전시킬 수 있지만 컨셉 자체의 변경은 어려워요.%b> 디자이너가 처음부터 다시 작업해야 되기 때문이에요." },
              ]
            },
            { text: "디자이너는 시공 범위를 제안해 드려요." },
            { text: "정해진 시공에 대해 톤 앤 매너의 제안 및 마감재 스펙을 제안해 드려요." },
            {
              text: "<b%사용하는 제품 중 가져갈 제품과 정리할 제품을 제안%b>해 드려요.",
              children: [
                { text: "<b%사용하고 있는 제품들의 사진을 촬영해서 디자이너에게 보내주세요.%b>" },
                { text: "<b%디자이너가 제안드린 가져갈 제품의 치수는 디자이너에게 보내주세요.%b>" },
                { text: "<b%가져갈 가구는 이사 갈 집에서 어디에 어떻게 사용할지 디자이너가 제안해드려요.%b>" },
                { text: "<b%정리할 제품은 이사하시면서 정리하시고 오시면 돼요.%b>" },
              ]
            },
            { text: "구매해야 할 가구들을 제안해 드려요. 제안 품목은 큰 가구(침대, 소파, 식탁 등) 작은 가구(협탁 등), 패브릭(커튼, 블라인드, 침구, 러그, 쿠션 등), 조명, 소품(거울, 시계, 액자, 화분 등) 등입니다." },
            { text: "가전은 제안해드리지 않아요. 다만 디자인 옵션(컬러 등)을 고르실 때 의견을 드려요." },
            { text: "<b%생활용품과 식기의 경우는 제안해드리지 않아요.%b>" },
            {
              text: "제작 가구의 경우 디자이너와 별도 계약을 진행할 수 있어요.",
              children: [
                { text: "가구 제작 업체는 소비자와 직접 거래하지 않는 경우가 많아요." },
                { text: "디자이너가 가구 제작 업체를 컨택하고 조정하는 과정이 발생해요." },
              ]
            },
          ]
        },
        {
          title: "디자인비 조정",
          contents: [
            { text: "<b%시공 범위가 추가되어 서비스 유형이 변경되거나 서비스 대상 면적이 추가되면 기간과 디자인비가 조정%b>돼요." },
            { text: "합당한 이유 없이 서비스 제공이 지연될 경우 디자인비가 추가될 수 있어요." },
          ]
        },
        {
          title: "촬영",
          contents: [
            {
              text: "프로젝트가 완료되면 촬영을 진행하고 홈리에종에 공유해요.",
              children: [
                { text: "홈리에종의 모든 현장은 촬영을 진행해요." },
                { text: "고객님 또는 디자이너가 촬영하여 홈리에종에 공유해요." },
                { text: "사진 촬영의 1차 목적은 현장을 검수하고 기록하는 데에 있어요." },
                { text: "고객님께서 포트폴리오를 보고 디자이너를 선택하셨듯이 다른 고객님들도 포트폴리오를 보고 디자이너를 선택하시기 때문에 디자이너에게 포트폴리오는 굉장히 소중해요." },
              ]
            },
            { text: "홈리에종과 디자이너가 별도로 전문 작가 촬영 및 고객 인터뷰를 제안드릴 수 있어요." },
            { text: "촬영 및 촬영 결과물의 활용을 원하지 않으실 경우에는 계약 전 미리 알려주세요." },
          ]
        },
      ]
    },
    {
      title: "구매 유의 사항",
      contents: [
        {
          title: "제품 구매",
          contents: [
            { text: "디자이너가 제안드린 제품은 직접 구매하셔야 해요." },
            { text: "제안받은 제품의 상세 사항과 필요시엔 리뷰까지 꼼꼼하게 확인하시고 구매하세요." },
            { text: "제품을 구매하실 구매처는 직접 선택하시면 돼요. 신뢰할 수 있는 구매처에서 구매하세요." },
            { text: "<b%결제 방식, 증빙, 조립/설치, 배송, 교환/환불, 하자/보수는 해당 구매처와 이야기하셔야%b> 해요." },
            { text: "<b%제작 패브릭, 제작 가구 등 제작 제품은 교환/환불이 불가%b>해요." },
          ]
        },
        {
          title: "제품 수령 및 세팅",
          contents: [
            { text: "배송된 제품의 수령, 언박싱, 조립/설치, <b%1차 배치는 고객님께서 진행하시게 돼요.%b>" },
            { text: "배치는 디자이너에게 제공받으신 가구 배치도를 보고 진행하시면 돼요." },
            { text: "새로 구매한 가구의 세팅은 일반적으로 가구 업체에서 배송할 때 함께 진행돼요.(가성비 가구 또는 일부 브랜드 제외)" },
            { text: "새로 구매한 가구를 직접 조립/설치하는 것을 원하지 않으시면 디자이너에게 완제품 제안을 요청하시거나 제품 구매처 또는 전문 업체의 조립/설치 서비스를 이용하셔야 해요." },
            { text: "사용하시던 제품의 세팅은 일반적으로 이사하는 날에 이사 업체의 도움을 받아 이루어져요." },
            { text: "사용하던 제품의 이동, 설치, 수리, 폐기는 직접 진행하셔야 해요." },
            { text: "이사하는 날 디자이너가 현장에 방문하지 않아요." },
          ]
        },
        {
          title: "최종 결정권",
          contents: [
            { text: "디자이너는 전문적인 지식을 바탕으로 좋은 결과물을 만들 수 있는 제안을 드려요." },
            { text: "디자이너의 제안 및 조언을 참고하여 고객님께서는 최종 선택 및 결정을 하셔야 해요." },
            { text: "<b%최종 선택 및 결정에 대한 책임은 고객님께 있기 때문에, 신중하게 선택%b>하셔야 해요." },
          ]
        },
      ]
    }
  ]

  for (let i = 0; i < contentsArr.length; i++) {
    block = this.whiteBlockRender(i, contentsArr[i].title, contentsArr[i].contents);
  }
  block.style.marginBottom = String(lastBlockMarginBottom) + ea;

}

ContractCautionJs.prototype.whiteBlockRender = function (thisIndex, mainTitle, mainContents) {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, colorExtended, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
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
  let title, contents;
  let factors;
  let contentsHeight;
  let factorBoxTop, factorBoxLeft;
  let factorLineTop, factorLineLeft, factorLineWidth, factorLineHeight;
  let numberTongWidth;
  let checkBoxMarginRight;
  let secondNumberTongWidth;
  let checkBoxTongTop;

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
  secondWidth = <%% 15, 15, 8, 0, 0.3 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 0 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  checkBoxMarginRight = <%% 6, 6, 6, 6, 1.4 %%>;
  checkBoxTongTop = <%% 0, 0, 0, 0, -0.1 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 24, 24, 24, 24, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 32, 24, 6 %%>;

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

  numberTongWidth = <%% 72, 72, 72, 64, 15 %%>;
  secondNumberTongWidth = <%% 70, 70, 64, 58, 14 %%>;

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

  num2 = 0;
  pastLength = 0;
  for (let { title, contents } of mainContents) {

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
                lineHeight: String(desktop ? 1.8 : 1.6),
                color: colorChip.black,
                textAlign: "left",
                background: colorChip.white,
                paddingRight: String(linePadding) + ea,
              },
              bold: {
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(700),
                color: colorExtended.mainBlue,
              },
            }
          ]
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            verticalAlign: "top",
            width: String(secondWidth) + ea,
            marginRight: String(secondMarginRight) + ea,
          },
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            verticalAlign: "top",
            width: withOut(firstWidth + secondWidth + secondMarginRight, ea),
          },
          children: (new Array(contents.length)).fill(null).map((n, index) => {
            let childrenNum, arr, childrenArr;
            arr = [
              {
                text: `<div style="display:inline-block;position:relative;vertical-align:baseline;top:${String(checkBoxTongTop) + ea};width:${String(checkBoxWidth) + ea};margin-right:${String(checkBoxMarginRight) + ea};">${instance.mother.returnCheckBox(colorExtended.mainBlue)}</div>${String(thisIndex + 1)}-${String(num2 + 1)}-${String(1 + index)}`,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                  fontWeight: String(400),
                  verticalAlign: "top",
                  lineHeight: String(desktop ? 1.8 : 1.6),
                  width: String(numberTongWidth) + ea,
                  textAlign: "left",
                  color: colorChip.deactive,
                }
              },
              {
                text: contents[index].text,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                  fontWeight: String(400),
                  verticalAlign: "top",
                  lineHeight: String(desktop ? 1.8 : 1.7),
                  width: withOut(numberTongWidth, ea),
                  textAlign: "left",
                  color: colorChip.black,
                },
                bold: {
                  fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                  fontWeight: String(700),
                  color: colorChip.black,
                  background: colorExtended.mainBlue,
                },
                under: {
                  fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                  fontWeight: String(desktop ? 700 : 400),
                  color: desktop ? colorExtended.mainBlue : colorChip.deactive,
                },
              }
            ];
            if (Array.isArray(contents[index].children)) {

              childrenNum = 0;
              for (let obj of contents[index].children) {
                childrenArr = [
                  {
                    text: "",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                      fontWeight: String(400),
                      verticalAlign: "top",
                      lineHeight: String(desktop ? 1.8 : 1.6),
                      width: String(numberTongWidth) + ea,
                      textAlign: "left",
                      color: colorChip.deactive,
                    }
                  },
                  {
                    text: `${String(thisIndex + 1)}-${String(num2 + 1)}-${String(index + 1)}-${String(childrenNum + 1)}`,
                    style: {
                      display: "inline-block",
                      fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                      fontWeight: String(400),
                      verticalAlign: "top",
                      lineHeight: String(desktop ? 1.8 : 1.6),
                      width: String(secondNumberTongWidth) + ea,
                      textAlign: "left",
                      color: colorChip.deactive,
                    },
                  },
                  {
                    text: obj.text,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                      fontWeight: String(400),
                      verticalAlign: "top",
                      lineHeight: String(desktop ? 1.8 : 1.7),
                      width: withOut(numberTongWidth + secondNumberTongWidth, ea),
                      textAlign: "left",
                      color: colorChip.black,
                    },
                    bold: {
                      fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                      fontWeight: String(700),
                      color: colorChip.black,
                      background: colorExtended.mainBlue,
                    },
                    under: {
                      fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                      fontWeight: String(desktop ? 700 : 400),
                      color: desktop ? colorExtended.mainBlue : colorChip.deactive,
                    },
                  }
                ];
                arr = arr.concat(childrenArr);
                childrenNum++;
              }

              arr = arr.concat([
                {
                  text: "",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                    fontWeight: String(400),
                    verticalAlign: "top",
                    lineHeight: String(desktop ? 1.8 : 1.6),
                    width: String(numberTongWidth) + ea,
                    textAlign: "left",
                    color: colorChip.deactive,
                  }
                },
                {
                  text: "0",
                  style: {
                    display: "inline-block",
                    fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                    fontWeight: String(400),
                    verticalAlign: "top",
                    lineHeight: String(desktop ? 1.8 : 1.6),
                    width: String(secondNumberTongWidth) + ea,
                    textAlign: "left",
                    color: colorChip.white,
                  },
                },
                {
                  text: "공백",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                    fontWeight: String(400),
                    verticalAlign: "top",
                    lineHeight: String(desktop ? 1.8 : 1.7),
                    width: withOut(numberTongWidth + secondNumberTongWidth, ea),
                    textAlign: "left",
                    color: colorChip.white,
                  },
                  bold: {
                    fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                    fontWeight: String(700),
                    color: colorChip.white,
                  },
                  under: {
                    fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                    fontWeight: String(desktop ? 700 : 400),
                    color: colorChip.white,
                  },
                }
              ])

            }
            return arr;
          }).flat(),
        },
      ]
    });

    if (title.trim() !== '') {
      num2++;
    }
  }

  return whiteBlock;
}

ContractCautionJs.prototype.injectServiceTable = function () {
  const instance = this;
  const { ea, media } = this;
  const baseTong = this.baseTong;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, colorExtended, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  let blockMarginBottom;
  let top;
  let bottom;
  let whiteBlock0, whiteBlock1, whiteBlock2, whiteBlock3, whiteBlock4;
  let leftBox0, leftBox1, leftBox2, leftBox3, leftBox4;
  let rightBox0, rightBox1, rightBox2, rightBox3, rightBox4;
  let contents0, contents1, contents2, contents3, contents4;
  let height0, height1, height2, height3, height4;
  let margin;
  let lineHeight;
  let title;
  let description;
  let image;
  let boxMargin;
  let boxTong;
  let rightBoxPaddingTop;
  let titleVisualTop;
  let boxTongPaddingBottom;
  let contents3Box, contents3BoxFactor;
  let contents3BoxGray;
  let contents3BoxMarginTop;
  let contents3BoxBetween;
  let contents3GreenHeight;
  let contents3GreenTextTop;
  let contents3GreenSize;
  let contents3GreenWeight;
  let contents3GrayHeight;
  let contents3GrayInnerPadding;
  let contents3GrayWhiteSize;
  let contents3GrayWhiteWeight;
  let contents3GrayWhiteLineHeight;
  let contents3GrayWhitePaddingTop;
  let contents3GrayWhitePaddingBottom;
  let contents3GrayWhiteWeightBold;
  let contents3GrayChildrenMarginTop;
  let contents3GrayChildrenWeight;
  let contents3GrayChildrenPaddingTop;
  let contents3PictureHeight;
  let num;
  let contents0Tong;
  let baseTongBack2, baseTongBack3;
  let baseTong2, baseTong3;
  let middleTitleSize, middleTitleWeight;
  let middleTitlePadding;
  let middleTitleLineTop;
  let middleTongPaddinngTop;
  let middleTitleMarginBottom;
  let middleTongPaddingBottom;
  let middleAreaPaddingTop;
  let contents2ImageBottom;
  let contents4Tong;
  let baseTong4, baseTong4Back;
  let contents5Tong;
  let middleTitleTextTop;
  let bottomMargin;
  let contents0InfoSize;
  let motherPosition;
  let boxMarginTop, boxMarginBottom;

  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  blockMarginBottom = <%% 16, 16, 16, 16, 2 %%>;

  margin = <%% 20, 18, 16, 12, 2 %%>;

  lineHeight = <%% 1.42, 1.42, 1.42, 1.42, 1.42 %%>;

  boxMargin = <%% 36, 25, 24, 14, 2 %%>;

  rightBoxPaddingTop = <%% 7, 5, 7, 7, 6.5 %%>;
  rightBoxPaddingTopFontVersion = <%% 2, 2, 2, 2, 7 %%>;

  middleTitleSize = <%% 23, 23, 21, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 2 %%>;
  middleTitleLineTop = <%% 14, 14, 13, 11, (isIphone() ? 2.9 : 2.6) %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleTongPaddinngTop = <%% 108, 84, 72, 52, 10 %%>;
  middleTongPaddingBottom = <%% 150, 130, 100, 70, 17 %%>;
  middleTitleMarginBottom = <%% 50, 42, 40, 34, 7.5 %%>;

  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;

  contents3BoxMarginTop = <%% 40, 20, 20, 40, 4 %%>;
  contents3BoxBetween = <%% 8, 8, 6, 6, 2 %%>;
  contents3GreenHeight = <%% 48, 40, 36, 32, 9 %%>;
  contents3GreenTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.2 %%>;
  contents3GreenSize = <%% 15, 13, 12, 11, 3 %%>;
  contents3GreenWeight = <%% 600, 600, 600, 600, 600 %%>;

  contents3GrayHeight = <%% 640, 584, 625, 640, 640 %%>;
  contents3GrayInnerPadding = <%% 12, 10, 8, 6, 2 %%>;
  contents3GrayWhiteSize = <%% 13, 11, 11, 10, 2.5 %%>;
  contents3GrayWhiteWeight = <%% 400, 400, 400, 400, 400 %%>;
  contents3GrayWhiteWeightBold = <%% 700, 700, 700, 700, 700 %%>;
  contents3GrayWhiteLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contents3GrayWhitePaddingTop = <%% (isMac() ? 17 : 18), (isMac() ? 13 : 14), (isMac() ? 13 : 14), (isMac() ? 9 : 10), 3 %%>;
  contents3GrayWhitePaddingBottom = <%% (isMac() ? 20 : 18), (isMac() ? 17 : 15), (isMac() ? 17 : 15), (isMac() ? 13 : 11), 3.8 %%>;

  contents3GrayChildrenMarginTop = <%% 20, 15, 20, 20, 20 %%>;
  contents3GrayChildrenWeight = <%% 600, 600, 600, 600, 600 %%>;
  contents3GrayChildrenPaddingTop = <%% 3, 3, 3, 3, 3 %%>;
  contents3GrayTongMarginBottom = <%% 170, 150, 110, 80, 17 %%>;

  contents3PictureHeight = <%% 160, 110, 96, 76, 23 %%>;

  boxMarginTop = <%% 24, 24, 20, 16, 5 %%>;
  boxMarginBottom = <%% 48, 42, 40, 36, 8 %%>;

  contents3 = {
    title: "디자인 서비스 종류",
    children: [
      {
        title: "홈퍼니싱",
        description: [
          (<&& "시공 없이 가구와 소품 등으로\n진행하는 <b%효율적 인테리어%b>" | "시공 없이 가구, 소품으로\n진행하는 <b%효율적 인테리어%b>" | "시공 없이 가구, 소품으로\n진행하는 <b%효율적 인테리어%b>" | "시공 없이 가구\n소품으로 진행" | "시공 없이 가구, 소품으로\n진행하는 <b%효율적 인테리어%b>" &&>),
          "시공 없음\n약 30일 소요"
        ],
        image: "s0.jpg",
      },
      {
        title: "홈스타일링",
        description: [
          (<&& "부분 시공과 홈퍼니싱으로 필요\n부분만 진행하는 <b%스마트 인테리어%b>" | "부분 시공과 홈퍼니싱으로\n진행하는 <b%스마트 인테리어%b>" | "부분 시공과 홈퍼니싱으로\n진행하는 <b%스마트 인테리어%b>" | "부분 시공과 홈퍼\n니싱으로 진행" | "부분 시공과 홈퍼니싱으로\n진행하는 <b%스마트 인테리어%b>" &&>),
          "5개 공정 이하의 시공\n약 45일 소요"
        ],
        image: "s1.jpg",
      },
      {
        title: "토탈 스타일링",
        description: [
          (<&& "시공부터 스타일링까지 완벽하게\n진행하는 <b%원스탑 인테리어%b>" | "시공부터 스타일링까지\n진행하는 <b%원스탑 인테리어%b>" | "시공부터 스타일링까지\n진행하는 <b%원스탑 인테리어%b>" | "시공부터 스타\n일링까지 진행" | "시공부터 스타일링까지\n진행하는 <b%원스탑 인테리어%b>" &&>),
          "5개 초과 공정 전체 시공\n약 60일 소요"
        ],
        image: "s2.jpg",
      },
      {
        title: "엑스트라 스타일링",
        description: [
          (<&& "디자인 토탈 시공과 <b%프리미엄%b>\n<b%스타일링으로 진행%b>하는 인테리어" | "토탈 시공과 <b%프리미엄 스타%b>\n<b%일링으로 진행%b>하는 인테리어" | "토탈 시공과 <b%스타일링%b>\n<b%으로 진행%b>하는 인테리어" | "토탈 시공과 프리\n미엄 스타일링" | "토탈 시공과 <b%프리미엄 스타%b>\n<b%일링으로 진행%b>하는 인테리어" &&>),
          "5개 초과 공정 전체 시공\n약 75일 소요"
        ],
        image: "s3.jpg",
      },
    ],
  };

  motherPosition = baseTong.children[5].children[0].children[0].children[1].children[1].children[2];

  whiteBlock3 = createNode({
    mother: motherPosition,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(margin * 2, ea),
      background: colorChip.gray1,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      marginTop: String(boxMarginTop) + ea,
      marginBottom: String(boxMarginBottom) + ea,
    }
  });

  rightBox3 = createNode({
    mother: whiteBlock3,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
    }
  });

  contents3Box = createNode({
    mother: rightBox3,
    style: {
      display: "block",
      width: String(100) + '%',
      position: "relative",
    }
  });

  for (let i = 0; i < contents3.children.length; i++) {

    contents3BoxFactor = createNode({
      mother: contents3Box,
      style: {
        display: "inline-block",
        width: "calc(calc(100% - " + String(contents3BoxBetween * (desktop ? (contents3.children.length - 1) : 1)) + ea + ") / " + String(desktop ? contents3.children.length : 2) + ")",
        marginRight: desktop ? String(i === contents3.children.length - 1 ? 0 : contents3BoxBetween) + ea : String(i % 2 === 1 ? 0 : contents3BoxBetween) + ea,
        marginBottom: desktop ? "" : String(contents3BoxBetween) + ea,
        verticalAlign: "top",
      }
    })

    createNode({
      mother: contents3BoxFactor,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: String(5) + "px",
        background: colorChip.white,
        height: String(contents3GreenHeight) + ea,
        marginBottom: desktop ? String(contents3BoxBetween) + ea : String(contents3BoxBetween / 2) + ea,
      },
      children: [
        {
          text: contents3.children[i].title,
          style: {
            position: "relative",
            top: String(contents3GreenTextTop) + ea,
            fontSize: String(contents3GreenSize) + ea,
            fontWeight: String(contents3GreenWeight),
            color: colorChip.black,
          }
        }
      ]
    })

    createNode({
      mother: contents3BoxFactor,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: String(5) + "px",
        background: colorChip.gray1,
        height: String(contents3PictureHeight) + ea,
        marginBottom: desktop ? String(contents3BoxBetween) + ea : String(contents3BoxBetween / 2) + ea,
        backgroundImage: "url('" + FRONTHOST + "/middle/curation" + "/" + contents3.children[i].image + "')",
        backgroundSize: "100% auto",
        backgroundPosition: "50% 50%",
      }
    })

    contents3BoxGray = createNode({
      mother: contents3BoxFactor,
      style: {
        display: "block",
        position: "relative",
        textAlign: "center",
        borderRadius: String(5) + "px",
        background: colorChip.gray3,
        paddingTop: String(contents3GrayInnerPadding) + ea,
        paddingBottom: String(contents3GrayInnerPadding) + ea,
      }
    });

    createNode({
      mother: contents3BoxGray,
      text: contents3.children[i].description[0],
      style: {
        display: "block",
        textAlign: "center",
        fontSize: String(contents3GrayWhiteSize) + ea,
        fontWeight: String(contents3GrayWhiteWeight),
        color: colorChip.black,
        lineHeight: String(contents3GrayWhiteLineHeight),
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        marginLeft: String(contents3GrayInnerPadding) + ea,
        width: withOut(contents3GrayInnerPadding * 2, ea),
        paddingTop: String(contents3GrayWhitePaddingTop) + ea,
        paddingBottom: String(contents3GrayWhitePaddingBottom) + ea,
        marginBottom: String(contents3GrayInnerPadding) + ea,
      },
      bold: {
        fontWeight: String(contents3GrayWhiteWeightBold),
        color: colorChip.black,
      }
    });

    createNode({
      mother: contents3BoxGray,
      text: contents3.children[i].description[1],
      style: {
        display: "block",
        textAlign: "center",
        fontSize: String(contents3GrayWhiteSize) + ea,
        fontWeight: String(contents3GrayWhiteWeight),
        color: colorExtended.mainBlue,
        lineHeight: String(contents3GrayWhiteLineHeight),
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        marginLeft: String(contents3GrayInnerPadding) + ea,
        width: withOut(contents3GrayInnerPadding * 2, ea),
        paddingTop: String(contents3GrayWhitePaddingTop) + ea,
        paddingBottom: String(contents3GrayWhitePaddingBottom) + ea,
      },
      bold: {
        fontWeight: String(contents3GrayWhiteWeightBold),
        color: colorExtended.mainBlue,
      }
    });

  }

}

ContractCautionJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, serviceParsing, colorChip, colorExtended } = GeneralJs;
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
    let designers, designer;
    let requestNumber;
    let service;
    let response, services;
    let ghostContents;

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "partnershipManual",
      client: null,
      base: {
        instance: this,
        binaryPath: ContractCautionJs.binaryPath,
        subTitle: "유의 사항 안내",
        secondBackground: false,
        backgroundType: 0,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          let whiteBlock;
          instance.insertInitBox();
          instance.insertFirstBox();
          instance.insertContextBox();
          instance.contentsCenter();
          instance.injectServiceTable();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ContractCautionJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ContractCautionJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
