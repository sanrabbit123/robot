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
      "return ('홈스타일링 제공 내역 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈스타일링 제공 내역 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "designManual",
  "hangul": "의뢰서 리스트",
  "route": [
    "designManual"
  ]
} %/%/g

const DesignManualJs = function () {
  this.mother = new GeneralJs();
}

DesignManualJs.binaryPath = FRONTHOST + "/middle/console/manual";

DesignManualJs.prototype.insertInitBox = function () {
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

  titleWording = "제공 내역 안내";
  subTitleContents = "디자인 진행시 확인해야 할 체크리스트";

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

DesignManualJs.prototype.insertProcessBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker } = GeneralJs;
  const buttonsClassName = "buttonsClassName";
  let margin;
  let paddingTop;
  let whiteBottomMargin;
  let titleFontSize;
  let bottomMargin;
  let whiteBlock;
  let grayTong;
  let arrowBetween;
  let contents;
  let innerMargin;
  let arrowWidth, arrowHeight;
  let textTop;
  let textSize, textWeight;
  let textMarginLeft;
  let mobileVisualPaddingValue;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 55, 55, 47, 39, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 38, 28, 24, (isMac() ? 16 : 14), 4 %%>;

  arrowBetween = <%% 5, 5, 5, 3, 1.5 %%>;
  arrowWidth = <%% 204, 153, 132, 105, 36 %%>;
  arrowHeight = <%% 100, 90, 80, 60, 12 %%>;

  textTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;
  textSize = <%% 16, 14, 13, 12, 3.3 %%>;
  textWeight = <%% 800, 800, 800, 800, 800 %%>;
  textMarginLeft = <%% 50, 48, 45, 30, 3 %%>;

  mobileVisualPaddingValue = 0.2;

  contents = {
    process: this.contents,
  };

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(whiteBottomMargin) + ea,
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
      display: "block",
      position: "relative",
      paddingTop: String(innerMargin) + ea,
      paddingBottom: String(innerMargin) + ea,
      paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
      paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
      width: withOut(innerMargin * 2, ea),
      background: colorChip.gradientGray,
      borderRadius: String(8) + "px",
    }
  });

  for (let i = 0; i < contents.process.length; i++) {
    createNode({
      mother: grayTong,
      class: [ buttonsClassName ],
      attribute: {
        index: String(i),
        key: contents.process[i].key,
        toggle: "off",
      },
      event: {
        mouseenter: function (e) {
          e.stopPropagation();
          e.preventDefault();

          this.children[1].style.color = colorChip.green;

        },
        mouseleave: function (e) {
          e.stopPropagation();
          e.preventDefault();

          const toggle = this.getAttribute("toggle");
          if (toggle === "off") {
            this.children[1].style.color = colorChip.black;
          }

        },
        click: function (e) {
          e.stopPropagation();

          const key = this.getAttribute("key");
          const target = instance.whiteBlocks.find((dom) => { return dom.getAttribute("key") === key });
          const siblings = [ ...document.querySelectorAll('.' + buttonsClassName) ];

          for (let dom of siblings) {
            if (dom !== this) {
              dom.setAttribute("toggle", "off");
              dom.children[1].style.color = colorChip.black;
            } else {
              dom.setAttribute("toggle", "on");
              dom.children[1].style.color = colorChip.green;
            }
          }

          for (let dom of instance.whiteBlocks) {
            if (dom !== target) {
              dom.setAttribute("toggle", "off");
              dom.style.display = "none";
            } else {
              dom.setAttribute("toggle", "on");
              dom.style.display = "block";
            }
          }

        }
      },
      style: {
        display: "inline-flex",
        position: "relative",
        width: desktop ? "calc(calc(100% - " + String(arrowBetween * (contents.process.length - 1)) + ea + ") / " + String(contents.process.length) + ")" : "calc(calc(100% - " + String(arrowBetween * (2 - 1)) + ea + ") / " + String(2) + ")",
        marginBottom: desktop ? "" : String(arrowBetween) + ea,
        height: String(arrowHeight) + ea,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
      },
      children: [
        {
          mode: "svg",
          source: svgMaker.processArrow(arrowWidth, arrowHeight, colorChip.white),
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(arrowWidth) + ea,
            height: String(arrowHeight) + ea,
            opacity: String(i % 2 === 0 ? 1 : 0.9),
          }
        },
        {
          event: {
            selectstart: function (e) {
              e.preventDefault();
            }
          },
          text: contents.process[i].title,
          style: {
            display: "inline-block",
            position: "relative",
            top: String(textTop) + ea,
            fontSize: String(textSize) + ea,
            fontWeight: String(textWeight),
            color: colorChip.black,
            marginLeft: String(textMarginLeft) + ea,
          }
        }
      ]
    });
  }

  if (mobile) {
    createNode({
      mother: grayTong,
      style: {
        display: "inline-flex",
        position: "relative",
        width: desktop ? "calc(calc(100% - " + String(arrowBetween * (contents.process.length - 1)) + ea + ") / " + String(contents.process.length) + ")" : "calc(calc(100% - " + String(arrowBetween * (2 - 1)) + ea + ") / " + String(2) + ")",
        marginBottom: desktop ? "" : String(arrowBetween) + ea,
        height: String(arrowHeight) + ea,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
      },
      children: [
        {
          mode: "svg",
          source: svgMaker.processArrow(arrowWidth, arrowHeight, colorChip.white),
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(arrowWidth) + ea,
            height: String(arrowHeight) + ea,
            opacity: String(0.9),
          }
        },
        {
          event: {
            selectstart: function (e) {
              e.preventDefault();
            }
          },
          text: "현장 완료",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(textTop) + ea,
            fontSize: String(textSize) + ea,
            fontWeight: String(textWeight),
            color: colorChip.black,
            marginLeft: String(textMarginLeft) + ea,
          }
        }
      ]
    });
  }

}

DesignManualJs.prototype.contentsLoop = function () {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const targetContents = this.contents;

  this.whiteBlocks = [];
  for (let { key } of targetContents) {
    this.whiteBlocks.push(this.insertChecklistBox(key));
  }

}

DesignManualJs.prototype.insertChecklistBox = function (key) {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainTitle = this.contents.find((obj) => { return obj.key === key }).title;
  const mainContents = this.contents.find((obj) => { return obj.key === key }).checklist;
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
  let checkBoxAreaWidth;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), 0 %%>;
  contentsAreaPaddingTop = <%% 36, 36, 36, 36, 6 %%>;

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
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 7 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 7 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  checkBoxAreaWidth = <%% 16, 16, 16, 16, 3 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    attribute: { key, toggle: "on" },
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
              fontWeight: String(600),
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
          paddingBottom: desktop ? "" : String(9.5) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { title, children } of mainContents) {
    num2 = 0;
    for (let { title: str, contents } of children) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(num2 === children.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
          marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(6) + ea)
        },
        children: [
          {
            text: (num2 === 0 ? String(num + 1) : ""),
            style: {
              display: desktop ? "inline-block" : "none",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(zeroWidth) + ea,
              marginRight: String(zeroMarginRight) + ea,
              textAlign: "right",
              color: colorChip.green,
            }
          },
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
                  display: num2 === 0 ? "block" : "none",
                  position: "absolute",
                  top: String(0),
                  left: String(0),
                  height: String(lineTop) + ea,
                  width: withOut(0),
                  borderBottom: desktop ? "1px solid " + colorChip.gray3 : "",
                }
              },
              {
                text: (num2 === 0 ? (desktop ? title : "<b%" + String(num + 1) + "%b>" + blank + title) : ""),
                style: {
                  display: desktop ? "inline-block" : "block",
                  position: "relative",
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(800),
                  lineHeight: String(1.6),
                  color: colorChip.black,
                  textAlign: "left",
                  background: colorChip.white,
                  paddingRight: String(linePadding) + ea,
                },
                bold: {
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(800),
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
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(secondWidth) + ea,
              marginRight: String(secondMarginRight) + ea,
              textAlign: desktop ? "right" : "left",
              color: colorChip.green,
            },
          },
          {
            text: "<u%" + str + ":%u>&nbsp;&nbsp;&nbsp;" + contents,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              paddingLeft: String(checkBoxAreaWidth) + ea,
              width: withOut(desktop ? zeroWidth + zeroMarginRight + firstWidth + secondWidth + secondMarginRight + checkBoxAreaWidth : secondWidth + secondMarginRight + checkBoxAreaWidth, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.black,
            },
            children: [
              {
                mode: "svg",
                source: instance.mother.returnCheckBox(colorChip.green),
                style: {
                  top: String(checkBoxTop) + ea,
                  left: String(0),
                  position: "absolute",
                  width: String(checkBoxWidth) + ea,
                }
              }
            ]
          },
        ]
      });

      num2++;
    }
    num++;
  }

  return whiteBlock;
}

DesignManualJs.prototype.insertButtonBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, downloadFile } = GeneralJs;
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

  textTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;
  textSize = <%% 17, 17, 15, 14, 3.1 %%>;
  textWeight = <%% 700, 700, 700, 700, 700 %%>;
  textMarginLeft = <%% 50, 50, 50, 50, 50 %%>;

  buttonPadding = <%% 22, 22, 18, 18, 3.6 %%>;
  buttonHeight = <%% 45, 45, 40, 36, 8.2 %%>;

  buttonBetween = <%% 8, 8, 6, 6, 1 %%>;

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
        const buttons = [ ...document.querySelectorAll('.' + buttonsClassName) ];
        for (let dom of instance.whiteBlocks) {
          dom.style.display = "block";
          dom.setAttribute("toggle", "on");
        }
        for (let dom of buttons) {
          dom.setAttribute("toggle", "off");
          dom.children[1].style.color = colorChip.black;
        }
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
      background: colorChip.gradientGreen,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "전체 보기",
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
      click: async function (e) {
        try {
          const loading = instance.mother.grayLoading();
          const res = await ajaxJson({ url: window.encodeURIComponent(window.location.href) }, "/ghostPass_pageToPdf");
          downloadFile(window.decodeURIComponent(res.url));
          loading.remove();
        } catch (e) {
          console.log(e);
        }
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
      background: colorChip.gradientGreen,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "PDF 출력",
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
        window.alert("준비중인 기능입니다!");
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
      background: colorChip.deactive,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "템플릿 다운로드",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.darkShadow,
        }
      }
    ]
  });


}

DesignManualJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let designers, designer;
    let requestNumber;
    let service;

    if (getObj.desid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    desid = getObj.desid;
    designers = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getDesigners", { equal: true });
    if (designers.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ designer ] = designers;
    this.designer = designer;

    this.contents = await ajaxJson({}, SECONDHOST + "/getChecklist", { equal: true });

    await this.mother.ghostDesignerLaunching({
      name: "designManual",
      designer: this.designer,
      base: {
        instance: this,
        binaryPath: DesignManualJs.binaryPath,
        subTitle: "",
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertProcessBox();
          instance.contentsLoop();
          instance.insertButtonBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "DesignManualJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "DesignManualJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
