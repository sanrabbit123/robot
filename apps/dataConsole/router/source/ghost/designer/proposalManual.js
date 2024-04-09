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
      "return ('디자이너 추천 안내 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('디자이너 추천 안내 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "proposalManual",
  "hangul": "디자이너 추천 안내",
  "route": [
    "proposalManual"
  ]
} %/%/g

const ProposalManualJs = function () {
  this.mother = new GeneralJs();
}

ProposalManualJs.binaryPath = FRONTHOST + "/middle/console/fee";

ProposalManualJs.prototype.insertInitBox = function () {
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

  titleWording = "디자이너 추천";
  subTitleContents = "추천서 샘플 제공 및 안내";

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

ProposalManualJs.prototype.insertFirstBox = function () {
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

  firstWidth = <%% 380, 300, 280, 220, 50 %%>;
  firstPaddingLeft = <%% 28, 24, 22, 18, 4 %%>;

  barTop = <%% (isMac() ? 9 : 6), (isMac() ? 9 : 6), (isMac() ? 8 : 5), (isMac() ? 7 : 5), 1.4 %%>;
  barWidth = <%% 6, 6, 6, 5, 1 %%>;
  barHeight = <%% 53, 52, 49, 40, 10.6 %%>;

  titleSize = <%% 24, 24, 22, 18, 4.3 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.5 %%>;

  contentsSize = <%% 15, 15, 14, 13, 3.2 %%>;
  contentsWeight = <%% 600, 600, 600, 600, 600 %%>;
  contentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;
  contentsBetween = <%% 20, 20, 20, 20, 4 %%>;

  mobileFirstMarginBottom = 4;

  contents = {
    title: [
      "디자이너 추천에 대한",
      "과정 안내 및 샘플"
    ],
    description: [
      [
        "홈리에종은 디자이너님들에게 더 많고 좋은 연결을 제공하기 위해 추천서 페이지를 새롭게 업데이트했습니다! 새로운 추천서와 디자이너님이 어떻게 추천되는지 확인하실 수 있습니다. 이번 중요한 업데이트 사항은 디자이너님의 프로필 사진이 추가되었다는 점입니다.",
      ],
      [
        "프로필 사진은 디자이너님을 고객님들께 소개하는 데 중요한 역할을 하므로, 얼굴이 정면 또는 측면에서 잘 보이는 사진을 업로드해 주세요! :)",
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

ProposalManualJs.prototype.insertMainDescriptionBox = function () {
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
  let image;
  let funcAreaOuterPadding;
  let funcAreaHeight;
  let funcAreaContentsHeight;
  let funcAreaAlphaContentsHeight;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 36, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 14 : 12), (isMac() ? 14 : 12), (isMac() ? 14 : 12), (isMac() ? 14 : 12), 0 %%>;
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
  secondWidth = <%% 15, 15, 8, 0, 0 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 0 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 30, 24, 24, 24, 3 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 6 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  contentsHeight = <%% 143, 143, 143, 143, 180 %%>;

  factorBoxTop = <%% 25, 25, 25, 25, 25 %%>;
  factorBoxLeft = <%% 920, 600, 600, 600, 920 %%>;

  factorLineTop = <%% (isMac() ? 36 : 34), 36, 36, 36, 36 %%>;
  factorLineLeft = <%% 888, 588, 588, 588, 888 %%>;
  factorLineWidth = <%% 22, 22, 22, 22, 22 %%>;
  factorLineHeight = <%% 99, 99, 99, 99, 123 %%>;

  funcAreaOuterPadding = <%% 8, 7, 6, 4, 0.5 %%>;
  funcAreaHeight = <%% 120, 102, 92, 70, 12 %%>;
  funcAreaContentsHeight = <%% 58, 50, 42, 33, 5.2 %%>;
  funcAreaAlphaContentsHeight = <%% 26, 22, 19, 15, 2.6 %%>;

  mainTitle = "디자이너 추천서 샘플";

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

  createNode({
    mother: tong,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    child: {
      mode: "iframe",
      attribute: {
        src: FRONTHOST + "/proposal_test.php?desid=" + instance.desid,
      },
      style: {
        display: "block",
        position: "relative",
        border: String(0),
        width: withOut(0, ea),
        height: String(2000) + ea,
      }
    }
  });

}

ProposalManualJs.prototype.launching = async function (loading) {
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
      name: "proposalManual",
      designer: this.designer,
      base: {
        instance: this,
        binaryPath: ProposalManualJs.binaryPath,
        subTitle: "",
      },
      local: async () => {
        try {
          let whiteBlock;
          instance.insertInitBox();
          instance.insertFirstBox();
          instance.insertMainDescriptionBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ProposalManualJs.launching.ghostDesignerLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ProposalManualJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
