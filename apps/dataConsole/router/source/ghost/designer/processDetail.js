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
      "return ('프로젝트 상세 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('프로젝트 상세 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "processDetail",
  "hangul": "프로젝트 상세",
  "route": [
    "processDetail"
  ]
} %/%/g

const ProcessDetailJs = function () {
  this.mother = new GeneralJs();
}

ProcessDetailJs.binaryPath = FRONTHOST + "/middle/console/process";

ProcessDetailJs.prototype.insertInitBox = function () {
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

  titleWording = "프로젝트 상세";
  subTitleContents = this.client.name + " 고객님 프로젝트 상세";

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

ProcessDetailJs.prototype.insertProcessBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, selfHref } = GeneralJs;
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
  let button, buttons;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 55, 55, 47, 39, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 0, 0, 0, 0, 1 %%>;

  arrowBetween = <%% 5, 5, 5, 3, 1 %%>;
  arrowWidth = <%% 214, 160, 138, 109, 40 %%>;
  arrowHeight = <%% 100, 90, 80, 60, 12 %%>;

  textTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;
  textSize = <%% 16, 14, 13, 11, 3.3 %%>;
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
      paddingBottom: String(desktop ? innerMargin : innerMargin - arrowBetween) + ea,
      paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
      paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
      width: withOut(innerMargin * 2, ea),
      background: colorChip.white,
      borderRadius: String(8) + "px",
    }
  });

  buttons = [];
  for (let i = 0; i < contents.process.length; i++) {
    button = createNode({
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

          const toggle = this.getAttribute("toggle");
          if (toggle === "off") {
            this.children[1].style.color = colorChip.green;
          } else {
            this.children[1].style.color = colorChip.white;
          }

        },
        mouseleave: function (e) {
          e.stopPropagation();
          e.preventDefault();

          const toggle = this.getAttribute("toggle");
          if (toggle === "off") {
            this.children[1].style.color = colorChip.black;
          } else {
            this.children[1].style.color = colorChip.white;
          }

        },
        click: function (e) {
          e.stopPropagation();

          const key = this.getAttribute("key");
          const target = instance.whiteBlocks.find((dom) => { return dom.getAttribute("key") === key });
          const siblings = [ ...document.querySelectorAll('.' + buttonsClassName) ];
          let sNum;

          if (instance.initComplete === 1) {
            selfHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?proid=" + project.proid + "&key=" + key);
          } else {
            sNum = 0;
            for (let dom of siblings) {
              if (dom !== this) {
                dom.setAttribute("toggle", "off");
                dom.children[0].querySelector("path").setAttribute("fill", sNum % 2 === 0 ? colorChip.gray3 : colorChip.gray1);
                dom.children[1].style.color = colorChip.black;
              } else {
                dom.setAttribute("toggle", "on");
                dom.children[0].querySelector("path").setAttribute("fill", colorChip.green);
                dom.children[1].style.color = colorChip.white;
              }
              sNum++;
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
        transition: "all 0.1s ease",
      },
      children: [
        {
          mode: "svg",
          source: svgMaker.processArrow(arrowWidth, arrowHeight, (i % 2 === 0 ? colorChip.gray3 : colorChip.gray1)),
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(arrowWidth) + ea,
            height: String(arrowHeight) + ea,
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
    buttons.push(button);
  }
  this.buttons = buttons;

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
          source: svgMaker.processArrow(arrowWidth, arrowHeight, colorChip.gray1),
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

ProcessDetailJs.prototype.contentsLoop = function () {
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

ProcessDetailJs.prototype.insertChecklistBox = function (key) {
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
  let mobileInnerPaddingBottom;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), 0 %%>;
  contentsAreaPaddingTop = <%% 36, 36, 36, 36, 7 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  mobileInnerPaddingBottom = 8;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.4 %%>;
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
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 0 %%>;

  lineTop = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 9 : 7), 10 %%>;
  linePadding = <%% 12, 12, 12, 10, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3;

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
          paddingBottom: desktop ? "" : String(mobileInnerPaddingBottom) + ea,
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

ProcessDetailJs.prototype.insertUploadBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainTitle = "파일 업로드";
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
  let mobileInnerPaddingBottom;
  let panMother;
  let panMotherInnerPadding;
  let panBetween;
  let basePan;
  let contentsTextTop;
  let panTitleBoxHeight;
  let uploadCircleWidth;
  let uploadCirclePadding;
  let uploadIconWidth;
  let uploadIconTop;
  let panMotherMinHeight;
  let contentsPan;
  let contentsPanPaddingTop;
  let contentsPanPaddingBottom;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), 0 %%>;
  contentsAreaPaddingTop = <%% 36, 36, 36, 36, 7 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  mobileInnerPaddingBottom = 8;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 15, 15, 14, 13, 3.4 %%>;
  contentsTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), 0 %%>;

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
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 0 %%>;

  lineTop = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 9 : 7), 10 %%>;
  linePadding = <%% 12, 12, 12, 10, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3;

  checkBoxAreaWidth = <%% 16, 16, 16, 16, 3 %%>;

  panMotherInnerPadding = <%% 20, 20, 20, 20, 4 %%>;
  panBetween = <%% 8, 8, 8, 8, 1 %%>;
  panTitleBoxHeight = <%% 58, 58, 58, 56, 5 %%>;

  uploadCircleWidth = <%% 28, 28, 28, 24, 6 %%>;
  uploadCirclePadding = <%% 16, 16, 16, 12, 4 %%>;
  uploadIconWidth = <%% 13, 13, 13, 12, 4 %%>;
  uploadIconTop = <%% -1, -1, -1, 0, 0 %%>;

  panMotherMinHeight = <%% 500, 480, 420, 400, 54 %%>;

  contentsPanPaddingTop = <%% 12, 12, 12, 10, 4 %%>;
  contentsPanPaddingBottom = <%% 60, 60, 60, 54, 12 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    attribute: { toggle: "on" },
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(margin) + ea : "",
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
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(mobileInnerPaddingBottom) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  panMother = createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(5) + "px",
      background: colorChip.gray3,
      width: withOut(panMotherInnerPadding * 2, ea),
      padding: String(panMotherInnerPadding) + ea,
    }
  });

  for (let i = 0; i < this.contents.length; i++) {
    basePan = createNode({
      mother: panMother,
      style: {
        display: "inline-block",
        verticalAlign: "top",
        position: "relative",
        width: "calc(calc(100% - " + String(panBetween * (this.contents.length - 1)) + ea + ") / " + String(this.contents.length) + ")",
        marginRight: String((i === (this.contents.length - 1)) ? 0 : panBetween) + ea,
        "min-height": String(panMotherMinHeight) + ea,
        background: colorChip.gray0,
        borderRadius: String(5) + "px",
      }
    });

    createNode({
      mother: basePan,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: withOut(0),
        height: String(panTitleBoxHeight) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      },
      children: [
        {
          text: this.contents[i].title,
          style: {
            position: "relative",
            top: String(contentsTextTop) + ea,
            fontSize: String(contentsWordingSize) + ea,
            fontWeight: String(800),
            color: i === this.targetIndex ? colorChip.green : colorChip.black,
          }
        }
      ]
    });

    contentsPan = createNode({
      mother: basePan,
      attribute: {
        key: this.contents[i].key,
      },
      style: {
        display: "block",
        position: "relative",
        width: withOut(0),
        paddingTop: String(contentsPanPaddingTop) + ea,
        paddingBottom: String(contentsPanPaddingBottom) + ea,
      }
    });

    createNode({
      mother: basePan,
      attribute: {
        index: String(i),
        proid: project.proid,
        desid: instance.designer.desid,
        name: project.name,
        designer: instance.designer.designer,
      },
      event: {
        click: instance.uploadFiles(i),
      },
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: String(uploadCircleWidth) + ea,
        height: String(uploadCircleWidth) + ea,
        position: "absolute",
        bottom: String(uploadCirclePadding) + ea,
        right: String(uploadCirclePadding) + ea,
        borderRadius: String(uploadCircleWidth) + ea,
        background: i === this.targetIndex ? colorChip.gradientGreen : colorChip.gray5,
        cursor: "pointer",
      },
      children: [
        {
          mode: "svg",
          source: instance.mother.returnExtract(colorChip.white),
          style: {
            display: "inline-block",
            position: "relative",
            top: String(uploadIconTop) + ea,
            width: String(uploadIconWidth) + ea,
          }
        }
      ]
    });

    this.panList.push(contentsPan);
  }

  this.setPanBlocks().catch((err) => { console.log(err) });

  return whiteBlock;
}

ProcessDetailJs.prototype.setPanBlocks = async function () {
  const instance = this;
  const { ea, targetDrive } = this;
  const { ajaxJson, createNode, colorChip, withOut, cleanChildren, dateToString } = GeneralJs;
  try {
    let itemList;
    let mothers;
    let itemBetween;
    let itemTongHeight;
    let itemTongMarginLeft;
    let itemBlock;
    let motherMatrix;
    let motherMaxNumber;
    let transparentItemsMatrix;
    let index;
    let textTop, textSize, textWeight;

    itemBetween = <%% 6, 6, 5, 4, 1 %%>;
    itemTongHeight = <%% 40, 40, 36, 32, 3 %%>;
    itemTongMarginLeft = <%% 12, 12, 12, 10, 1 %%>;

    textTop = <%% -1, -1, -1, -1, 0 %%>;
    textSize = <%% 14, 14, 14, 14, 14 %%>;
    textWeight = <%% 400, 400, 400, 400, 400 %%>;

    mothers = this.panList;
    itemList = await ajaxJson({ target: this.targetDrive }, "/ghostPass_readDir", { equal: true });

    for (let mother of mothers) {
      cleanChildren(mother);
    }

    itemList = itemList.map((raw) => {
      const [ key, time, order, hex ] = raw.split("_");
      const [ , exe ] = hex.split(".");
      return [ key, new Date(Number(time)), String(Number(order) + 1) + "." + exe, Number(order) ];
    }).map(([ key, date, name, order ]) => {
      return { key, date, name, order };
    });

    itemList.sort((a, b) => { return a.order - b.order });
    itemList.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });

    for (let item of itemList) {
      for (let i = 0; i < this.contents.length; i++) {
        if (this.contents[i].key === item.key) {
          item.mother = mothers[i];
          item.motherNumber = i;
        }
      }
    }

    motherMatrix = (new Array(this.contents.length)).fill(0, 0);

    for (let { mother, key, date, name, order, motherNumber } of itemList) {
      itemBlock = createNode({
        mother,
        class: [ "hoverDefault_lite" ],
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: withOut(itemTongMarginLeft * 2, ea),
          marginLeft: String(itemTongMarginLeft) + ea,
          height: String(itemTongHeight) + ea,
          marginBottom: String(itemBetween) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gray3,
        },
        children: [
          {
            text: dateToString(date).replace(/\-/gi, '').slice(2) + "_" + name,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(textTop) + ea,
              fontSize: String(textSize) + ea,
              fontWeight: String(textWeight),
              color: colorChip.black,
            }
          }
        ]
      });
      motherMatrix[motherNumber] = motherMatrix[motherNumber] + 1;
    }

    motherMaxNumber = motherMatrix.reduce((acc, curr) => { return (acc >= curr ? acc : curr) }, 0);
    transparentItemsMatrix = motherMatrix.map((num) => { return Math.abs(motherMaxNumber - num) });

    index = 0;
    for (let num of transparentItemsMatrix) {
      for (let i = 0; i < num; i++) {
        createNode({
          mother: mothers[index],
          style: {
            display: "block",
            width: withOut(itemTongMarginLeft * 2, ea),
            marginLeft: String(itemTongMarginLeft) + ea,
            height: String(itemTongHeight) + ea,
            marginBottom: String(itemBetween) + ea,
          }
        });
      }
      index++;
    }

  } catch (e) {
    console.log(e);
  }
}

ProcessDetailJs.prototype.insertCalendarBox = function () {
  const instance = this;
  const mother = this.mother;
  const { project, requestNumber, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, colorCalendar } = GeneralJs;
  const isDateValid = (date) => {
    return ((new Date(2000, 0, 1)).valueOf() <= date.valueOf() && (new Date(3000, 0, 1)).valueOf() > date.valueOf());
  }
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let tong;
  let whiteBottomMargin;
  let grayBetween;
  let dateArr;

  grayBetween = <%% 40, 40, 36, 36, 3 %%>;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 0 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 20, 20, 16, 8, 0.5 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 2 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 3 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(whiteBottomMargin) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
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

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginBottom: String(grayBetween) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          width: withOut(0),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            style: {
              display: desktop ? "none" : "block",
              top: String(0),
              left: String(0),
              width: withOut(0),
              height: String(isIphone() ? 2.8 : 2.5) + ea,
              position: "absolute",
            }
          },
          {
            text: "디자이너 캘린더",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            },
            bold: {
              background: colorChip.white,
              color: colorChip.black,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(300),
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          overflow: "hidden",
          marginBottom: String(0) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  dateArr = [
    {
      contents: {
        color: colorChip.red,
        description: "",
        title: "오늘",
      },
      date: {
        start: new Date(),
        end: new Date(),
      }
    },
  ];


  if (isDateValid(project.process.contract.form.date.from)) {
    dateArr.push({
      contents: {
        color: colorChip.green,
        description: "",
        title: project.name + " 시작일",
      },
      date: {
        start: project.process.contract.form.date.from,
        end: project.process.contract.form.date.from,
      }
    });
  }

  if (isDateValid(project.process.contract.form.date.to)) {
    dateArr.push({
      contents: {
        color: colorChip.green,
        description: "",
        title: project.name + " 종료일",
      },
      date: {
        start: project.process.contract.form.date.to,
        end: project.process.contract.form.date.to,
      }
    });
  }

  if (isDateValid(project.process.contract.meeting.date)) {
    dateArr.push({
      contents: {
        color: colorChip.purple,
        description: "",
        title: project.name + " 현장 미팅",
      },
      date: {
        start: project.process.contract.meeting.date,
        end: project.process.contract.meeting.date,
      }
    });
  }

  if (isDateValid(project.contents.photo.date)) {
    dateArr.push({
      contents: {
        color: colorChip.yellow,
        description: "",
        title: project.name + " 촬영",
      },
      date: {
        start: project.contents.photo.date,
        end: project.contents.photo.date,
      }
    });
  }


  colorCalendar(tong, dateArr);
}

ProcessDetailJs.prototype.tableStatic = function (designer, project, client, clientHistory, projectHistory, requestNumber) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, autoComma } = GeneralJs;
  const { totalMother, ea, grayBarWidth, middleMode } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const desid = designer.desid;
  const proid = project.proid;
  const cliid = project.cliid;

  const title = "고객 정보";
  const initialContents = "안녕하세요, <b%" + designer.designer + "%b> 실장님!\n홈리에종에 의뢰하신 " + client.name +  " 고객님 관련 정보를 보내드립니다. <b%" + GeneralJs.serviceParsing(project.service) + "%b>를 진행합니다.";
  const emptyReload = (originalArr, reloadArr) => {
    if (originalArr.map((a) => { return a.trim(); }).filter((a) => { return a !== ""; }).length > 0) {
      return originalArr;
    } else {
      return reloadArr;
    }
  }
  const mainContents = [
    {
      title: "현장 미팅",
      className: "mainContents_when",
      position: "request.about.when",
      contents: emptyReload(projectHistory.request.about.when, [ dateToString(project.process.contract.meeting.date, true, true) ]),
      spread: true,
    },
    {
      title: "현장 주소",
      className: "mainContents_where",
      position: "request.about.where",
      contents: emptyReload(projectHistory.request.about.where, [ client.requests[requestNumber].request.space.address ]),
      spread: true,
    },
    {
      title: "현장 관련",
      className: "mainContents_site",
      position: "request.about.site",
      contents: emptyReload(projectHistory.request.about.site, [ "현장 관련 상세 사항 없음" ]),
      spread: true,
    },
    {
      title: "시공 관련",
      className: "mainContents_construct",
      position: "request.about.construct",
      contents: emptyReload(projectHistory.request.about.construct, [ "시공 관련 상세 사항 없음" ]),
      spread: false,
    },
    {
      title: "스타일링 관련",
      className: "mainContents_styling",
      position: "request.about.styling",
      contents: emptyReload(projectHistory.request.about.styling, [ "스타일링 관련 상세 사항 없음" ]),
      spread: true,
    },
    {
      title: "예산 관련",
      className: "mainContents_budget",
      position: "request.about.budget",
      contents: emptyReload(projectHistory.request.about.budget, [ "예산 관련 상세 사항 없음" ]),
      spread: true,
    },
    {
      title: "기타 사항",
      className: "mainContents_progress",
      position: "request.about.progress",
      contents: emptyReload(projectHistory.request.about.progress, [ "기타 관련 상세 사항 없음" ]),
      spread: false,
    }
  ];
  const pictureContents = "고객님이 선택한 사진";
  const pictureContentsSite = "고객님의 현장 사진";
  const pictureContentsPrefer = "고객님의 선호 사진";
  const pictures = clientHistory.curation.image;
  const matrix = [
    [ "고객 정보", "", "공간 정보", "" ],
    [ (desktop ? "고객명" : "성함"), projectHistory.request.client.name, (desktop ? "계약 형태" : "계약"), projectHistory.request.space.contract ],
    [ "연락처", projectHistory.request.client.phone, (desktop ? "사전 점검일" : "사전점검"), projectHistory.request.space.precheck ],
    [ (desktop ? "가족 구성원" : "가족"), projectHistory.request.client.family, (desktop ? "집 비는 날" : "비는 날"), projectHistory.request.space.empty ],
    [ "주소", projectHistory.request.client.address, (desktop ? "입주 예정일" : "입주일"), projectHistory.request.space.movein ],
    [ "", "", (desktop ? "특이 사항" : "기타"), projectHistory.request.space.special ],
    [ "예산", projectHistory.request.client.budget, (desktop ? "공간구성" : "구성"), projectHistory.request.space.composition ],
    [ "서비스 정보", "", "고객 요청", "" ],
    [ "서비스", projectHistory.request.service.service, projectHistory.request.client.etc, "" ],
    [ (desktop ? "선호 컨셉" : "컨셉"), projectHistory.request.service.concept, "", "" ],
    [ "시공", projectHistory.request.service.construct, "", "" ],
    [ "스타일링", projectHistory.request.service.styling, "", "" ],
  ];
  const mergeMap = [
    [ null, [ 0, 0 ], null, [ 0, 2 ] ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ [ 4, 0 ], [ 4, 1 ], null, null ],
    [ null, null, null, null ],
    [ null, [ 7, 0 ], null, [ 7, 2 ] ],
    [ null, null, null, [ 8, 2 ] ],
    [ null, null, null, [ 9, 2 ] ],
    [ null, null, null, [ 10, 2 ] ],
    [ null, null, [ 8, 2 ], [ 11, 2 ] ],
  ];
  const callbackMap = [
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
  ];
  const boldMap = [
    [ 0, 0, 0, 0 ],
    [ 1, 0, 1, 0 ],
    [ 1, 0, 1, 0 ],
    [ 1, 0, 1, 0 ],
    [ 1, 0, 1, 0 ],
    [ 1, 0, 1, 0 ],
    [ 1, 0, 1, 0 ],
    [ 0, 0, 0, 0 ],
    [ 1, 0, 0, 0 ],
    [ 1, 0, 0, 0 ],
    [ 1, 0, 0, 0 ],
    [ 1, 0, 0, 0 ],
  ];
  const titleMap = [ 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 ];
  const widthRatio = desktop ? [ 1, 3, 1, 3 ] : [ 1, 2, 1, 2 ];
  const notice = [
    {
      title: "서비스비 안내",
      contents: [
        "이번 현장의 서비스비는 " + autoComma(project.process.contract.remain.calculation.amount.supply) + "원(VAT별도)으로 책정되어 있습니다.",
        "홈리에종의 계약금은 300,000원(VAT별도)으로 책정되어 있습니다.",
        "현재 고객은 홈리에종에 계약금 330,000원을 입금한 상태며, 현장 미팅 후 계약금을 제외한 서비스비를 전액 입금할 경우 서비스가 계속 진행됩니다.",
        "★ 현장 미팅 후 서비스비 지불 전에는 디자이너와 스타일링 논의를 할 수 없는 것이 원칙입니다.(고객에게도 필요시 안내해주세요)",
        "★ 서비스 진행중 타 공간에 대한 전체적인 스타일링이 추가되는 경우 꼭! 홈리에종을 통해 디자인비 조정이 될 수 있도록 해주세요.",
        "법인/개인사업자(일반과세), 개인사업자(간이과세), 프리랜서 정산 중에 정산 방식을 알려주시면 수수료를 제외한 정확한 정산액은 계산하여 말씀드리겠습니다.",
      ]
    },
    {
      title: "고객 안내 사항과 서비스 구성",
      contents: [
        "디자이너와 카톡(문자)/전화/메일 등의 채널을 통해 커뮤니케이션 하면서 전체 스타일링을 완성합니다. 커뮤니케이션에 적극적으로 참여해주시면 더 좋은 결과물을 얻으실 수 있습니다.",
        "디자이너와 현장 미팅을 진행하며 집컨디션/취향/생활특징/예산을 고려하여 컨설팅 해드립니다.",
        "시공팀은 추천하는 시공팀 외에 고객이 개별적으로 알아본 시공팀과 진행 가능합니다.",
        "시공 진행시 디자이너는 시공 방향 제시 및 전체 마감재를 셀렉해드립니다.",
        "기존에 사용하시는 가구들 중 가져갈 가구와 버릴가구 선택 및 배치/활용 제안 드립니다. 새로 구매하실 가구, 조명, 패브릭(커튼, 베딩, 러그, 쿠션), 소품(식물, 액자, 시계 등)을 제안해드립니다.",
        "디자이너의 제안에 따라 패브릭 및 가구의 맞춤 제작이 가능합니다.",
        "생활용품, 식기, 가전은 스타일링 제안 범위에 포함되지 않습니다. 다만 선택하신 후 제품 외관의 디자인 옵션(컬러 등)을 의논하실 경우 전체 디자인을 고려하여 골라드립니다. 생활용품과 식기의 경우, 고객님께서 찾으신 3~4품목중에서 셀렉은 가능합니다.",
        "디자이너 제안 후 고객 컨펌이 완료된 구매제품은 고객이 구매하실 수 있도록 안내드립니다. 연계 업체의 제품 구매시에는 할인혜택을 받으실 수 있습니다. 모든 제품이 해당되는 것은 아니며 업체마다 차이가 있습니다.",
        "제품 구매에 소요되는 배송비, 조립 및 설치비는 고객님께서 부담하시게 됩니다. 배송된 제품의 수령, 언박싱, 조립, 1차배치는 고객님께서 진행하시게 됩니다. 구매 및 물품배치가 완료되면 디자이너의 마무리터치 후 인터뷰와 촬영을 진행합니다."
      ],
    },
    {
      title: "시공 연계 수수료 안내",
      contents: [
        "고객이 시공 계약을 체결한 곳에 공사진행과 A/S에 대한 책임이 있습니다. (고객에게 동일하게 안내합니다.)",
        "고객이 데려온 시공팀과 진행할 경우 디자이너는 시공자재 셀렉과 필요시 시공관련 커뮤니케이션 업무가 있을 수 있습니다.",
        "고객이 실장님 또는 실장님과 협업하시는 시공사와 시공 계약을 체결할 경우 전체 계약 금액의 5%가 시공 연계 수수료 입니다.",
        "홈리에종은 적법한 방식의 시공계약을 권장하며, (세금 없는) 현금 거래로 시공을 진행했을 경우에도 시공 연계 수수료는 공급가에 VAT 10%를 더한 금액으로 전자세금계산서를 발행합니다. 입금하실 때에도 공급가에 VAT10% 더한 금액을 입금해주셔야합니다."
      ],
    },
    {
      title: "정산 안내",
      contents: [
        "홈리에종에서 받은 서비스비는 수수료를 제하고 스타일링 시작 후 실장님께 선금 50%를 먼저 정산하고",
        "스타일링이 마무리되면 나머지 50%를 정산합니다.",
        "스타일링 마무리는",
        "1) 스타일링 제안이 마무리되어 제품들이 배송단계에 있고",
        "2) 촬영일이 (변동되더라도) 어느정도 정해지고",
        "3) 실장님께서 디자이너의 디자인 의도가 담긴 글(폼을 따로 드립니다) 저희쪽에 주시면",
        "4) 홈리에종에서 고객님께 정산 여부를 확인 후 정산을 진행합니다.",
      ]
    }
  ];

  return {
    title,
    initialContents,
    emptyReload,
    mainContents,
    pictureContents,
    pictureContentsSite,
    pictureContentsPrefer,
    pictures,
    matrix,
    mergeMap,
    callbackMap,
    boldMap,
    titleMap,
    widthRatio,
    notice,
  };
}

ProcessDetailJs.prototype.insertInformationBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, project, projectHistory, requestNumber, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, blankHref, downloadFile } = GeneralJs;
  const wordings = {
    title: [ "고객 정보" ],
    subTitle: [
      "프로젝트 기간"
    ],
    contents: [
      "현장 미팅 전, <b%디자이너에게 공유%b>할 고객님의 기본 정보입니다.",
      "<b%잘못된 정보가 있을 시%b> 홈리에종에 말씀해주시길 바랍니다.",
    ],
    table: instance.tableStatic(instance.designer, instance.project, instance.client, instance.clientHistory, instance.projectHistory, instance.requestNumber)
  };
  const {
    title,
    initialContents,
    emptyReload,
    mainContents,
    pictureContents,
    pictureContentsSite,
    pictureContentsPrefer,
    pictures,
    matrix,
    mergeMap,
    callbackMap,
    boldMap,
    titleMap,
    widthRatio,
  } = wordings.table;
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
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
  let periodLineTop;
  let calendar;
  let mobileCalendarMargin, mobileCalendarMarginTop;
  let mobilePaddingTop, mobilePaddingBottom;
  let periodPaddingLeft;
  let periodLineWidth;
  let initWordingSize;
  let zeroWordingSize;
  let zeroWordingTop;
  let initTitleMarginTop;
  let initContentsMarginTop;
  let initContentsBottom;
  let initContentsPaddingLeft;
  let printSize;

  wordsTitle = wordings.title.join(" ");

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 58, 58, 58, 58, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  printSize = <%% 14, 14, 13, 12, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), 0 %%>;

  mobileTitleLeft = 6;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 230, 180, 200, 33 %%>;
  secondBlockMargin = <%% 45, 40, 30, 40, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 13, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% (isMac() ? 8 : 6), (isMac() ? 8 : 6), (isMac() ? 8 : 6), (isMac() ? 7 : 5), 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 28, 30, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 5 %%>;

  periodLineTop = <%% 27, 27, 23, 23, 3.8 %%>;
  periodPaddingLeft = <%% 16, 16, 16, 32, 7 %%>;
  periodLineWidth = <%% 4, 4, 4, 18, 4 %%>;

  mobileCalendarMargin = 6;
  mobileCalendarMarginTop = 4;
  mobilePaddingTop = 5;
  mobilePaddingBottom = 10.5;

  initWordingSize = <%% 14.5, 14, 14, 13, 3.2 %%>;

  zeroWordingSize = <%% 21, 21, 21, 21, 21 %%>;
  zeroWordingTop = <%% -3, -3, -3, -3, -3 %%>;

  initTitleMarginTop = <%% 14, 14, 14, 14, 2.5 %%>;
  initContentsMarginTop = <%% 4, 4, 4, 4, 0.5 %%>;
  initContentsBottom = <%% -3, -3, -3, -3, 0 %%>;
  initContentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
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
          position: "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: wordsTitle,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: colorChip.white,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            },
            bold: {
              background: colorChip.white,
              color: colorChip.green,
              fontSize: String(printSize) + ea,
              fontWeight: String(300),
              cursor: "pointer",
            },
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          overflow: "hidden",
          marginBottom: String(0) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;
  tong.appendChild(mother.makeTable(matrix, { whiteMode: true, style: { width: 100 }, mergeMap, callbackMap, boldMap, titleMap, widthRatio }));
  calendar = tong.firstChild;

  if (desktop) {
    calendar.style.width = big ? withOut(secondBlockWidth + secondBlockMargin, ea) : String(100) + '%';
    calendar.style.display = big ? "inline-block" : "block";
  } else {
    calendar.style.width = withOut(mobileCalendarMargin * 2, ea);
    calendar.style.marginLeft = String(mobileCalendarMargin) + ea;
    tong.style.paddingTop = String(mobileCalendarMarginTop) + ea;
    calendar.style.display = "block";
  }

  createNode({
    mother: tong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      width: big ? String(secondBlockWidth) + ea : withOut(mobileCalendarMargin * 2, ea),
      height: big ? String(tong.getBoundingClientRect().height) + ea : "",
      verticalAlign: "top",
      textAlign: desktop ? "" : "center",
      marginLeft: big ? String(secondBlockMargin) + ea : String(mobileCalendarMargin) + ea,
      flexDirection: "column-reverse",
      paddingTop: desktop ? "" : String(mobilePaddingTop) + ea,
      paddingBottom: desktop ? String(1) + ea : String(mobilePaddingBottom) + ea,
    },
    children: [
      {
        style: {
          display: big ? "block" : "none",
          marginTop: String(bigNumberBetween) + ea,
          position: "relative",
          textAlign: "right",
        },
        children: [
          {
            style: {
              position: "absolute",
              width: String(100) + '%',
              height: String(periodLineTop) + ea,
              top: String(0),
              left: String(0),
              borderBottom: "1px solid " + colorChip.whiteGreen,
            }
          },
          {
            text: dateToString(project.process.contract.form.date.to).replace(/-/g, ". "),
            style: {
              display: "inline-block",
              fontSize: String(bigNumberSize) + ea,
              fontWeight: String(200),
              fontFamily: "graphik",
              color: colorChip.green,
              lineHeight: String(1.6),
              background: colorChip.white,
              paddingLeft: String(16) + ea,
              position: "relative",
            }
          }
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          textAlign: desktop ? "left" : "center",
          marginTop: String(bigNumberMargin) + ea,
        },
        children: [
          {
            text: dateToString(project.process.contract.form.date.from).replace(/-/g, ". "),
            style: {
              display: "inline-block",
              fontSize: String(bigNumberSize) + ea,
              fontWeight: String(200),
              fontFamily: "graphik",
              color: colorChip.green,
              lineHeight: String(1.4),
              position: "relative",
            }
          },
          {
            text: dateToString(project.process.contract.form.date.to).replace(/-/g, ". "),
            style: {
              display: small ? "inline-block" : "none",
              fontSize: String(bigNumberSize) + ea,
              fontWeight: String(200),
              fontFamily: "graphik",
              color: colorChip.green,
              lineHeight: String(1.4),
              background: colorChip.white,
              paddingLeft: String(periodPaddingLeft) + ea,
              position: "relative",
            }
          },
          {
            style: {
              display: small ? "block" : "none",
              position: "absolute",
              width: big ? String(100) + '%' : String(periodLineWidth) + ea,
              height: String(periodLineTop) + ea,
              top: String(0),
              left: desktop ? String(165) + ea : withOut(50, periodLineWidth / 2, ea),
              borderBottom: "1px solid " + colorChip.whiteGreen,
            }
          },
        ]
      },
      {
        text: wordings.subTitle[0],
        style: {
          display: "block",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black,
          marginTop: String(desktop ? bigNumberBetweenMargin : 2) + ea,
          paddingLeft: String(contentsPaddingLeft) + ea,
          lineHeight: String(1.6),
          position: "relative",
        },
        children: [
          {
            mode: "svg",
            source: mother.returnArrow("right", colorChip.green),
            style: {
              display: desktop ? "block" : "none",
              position: "absolute",
              width: String(arrowWidth) + ea,
              left: String(arrorLeft) + ea,
              top: String(arrowTop) + ea,
            }
          },
        ]
      },
    ]
  });


}

ProcessDetailJs.prototype.returnButtonList = function (thisStatusNumber) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker } = GeneralJs;
  const { project, requestNumber, ea, baseTong, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const fileInputClassName = "fileInputClassName";
  let buttonList;
  let titleTargets;
  let grayInnerPadding;
  let grayInnerPaddingRight;
  let grayCenterMargin;
  let statusButtonWidth;
  let statusButtonHeight;
  let statusButtonBetween;
  let statusTextTop;
  let statusSize;
  let statusBetween;
  let serviceContents;

  serviceContents = this.contents;

  grayInnerPadding = <%% 20, 20, 16, 16, 3.6 %%>;
  grayInnerPaddingRight = <%% 32, 32, 30, 22, 5.4 %%>;
  grayCenterMargin = <%% 12, 12, 10, 8, 0.6 %%>;

  statusButtonWidth = <%% 120, 120, 110, 100, 24 %%>;
  statusButtonHeight = <%% 40, 40, 40, 36, 8 %%>;
  statusButtonBetween = <%% 8, 8, 8, 6, 1 %%>;

  statusTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isIphone() ? -0.2 : -0.3) %%>;
  statusSize = <%% 14, 14, 13, 12, 3 %%>;
  statusBetween = <%% 500, 500, 500, 500, 500 %%>;

  titleTargets = serviceContents.map((obj) => { return { title: obj.title, key: obj.key } });
  titleTargets.push({
    title: "현장 완료",
    key: null,
    checklist: null,
  });

  buttonList = [
    {
      name: "상태 변경",
      event: function () {
        return function (e) {
          const targetMother = totalContents;
          let cancelBack, whitePrompt;

          cancelBack = createNode({
            mother: targetMother,
            event: {
              click: function (e) {
                targetMother.removeChild(targetMother.lastChild);
                targetMother.removeChild(targetMother.lastChild);
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0),
              height: withOut(0),
              background: colorChip.black,
              opacity: String(0.2),
            }
          });

          whitePrompt = createNode({
            mother: targetMother,
            style: {
              position: "fixed",
              top: withOut(50, (((statusButtonHeight * 4) + (statusButtonBetween * 3) + (grayInnerPadding * 2)) / 2), ea),
              left: withOut(50, (((statusButtonWidth * 2) + statusButtonBetween + (grayInnerPadding * 2)) / 2), ea),
              width: String((statusButtonWidth * 2) + statusButtonBetween) + ea,
              height: String((statusButtonHeight * 4) + (statusButtonBetween * 4)) + ea,
              background: colorChip.gray2,
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              animation: "fadeuplite 0.3s ease forwards",
              padding: String(grayInnerPadding) + ea,
              paddingBottom: String(grayInnerPadding - statusButtonBetween) + ea,
            },
            children: [
              {
                style: {
                  display: "block",
                  top: String(0),
                  left: String(0),
                  width: withOut(0),
                  height: withOut(0),
                  position: "relative",
                }
              }
            ]
          });

          for (let i = 0; i < titleTargets.length; i++) {
            createNode({
              mother: whitePrompt.firstChild,
              attribute: { index: String(i) },
              event: {
                click: async function (e) {
                  try {
                    const index = Number(this.getAttribute("index"));
                    if (serviceContents[index] !== undefined) {
                      let value;
                      let whereQuery, updateQuery;

                      value = serviceContents[index].target[0];

                      whereQuery = { proid: project.proid };
                      updateQuery = {};
                      updateQuery["process.action"] = value;

                      if (window.confirm("업데이트를 진행하시겠습니까?")) {
                        await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateProject");
                        await ajaxJson({ message: instance.designer.designer + " 실장님이 콘솔을 통해 " + project.name + " 고객님 상태를 변경했습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");

                        window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?proid=" + project.proid + "&index=" + String(index);
                      }

                    } else {
                      window.alert("프로젝트 완료는 홈리에종에 직접 문의해주세요!");
                    }
                  } catch (e) {
                    console.log(e);
                    window.location.reload();
                  }
                }
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(statusButtonWidth) + ea,
                height: String(statusButtonHeight) + ea,
                background: colorChip.white,
                borderRadius: String(5) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                marginRight: String(i % 2 === 0 ? statusButtonBetween : 0) + ea,
                marginBottom: String(statusButtonBetween) + ea,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
              },
              children: [
                {
                  text: titleTargets[i].title,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(statusTextTop) + ea,
                    fontSize: String(statusSize) + ea,
                    fontWeight: String(statusBetween),
                    color: colorChip.black,
                  }
                }
              ]
            });
          }

        }
      }
    }
  ];

  if (thisStatusNumber === 1) {
    buttonList.push({
      name: "일정 안내 문서 전송",
      event: function () {
        return instance.uploadFiles(thisStatusNumber);
      }
    });
  } else if (thisStatusNumber === 2) {
    buttonList.push({
      name: "1차 제안 문서 전송",
      event: function () {
        return instance.uploadFiles(thisStatusNumber);
      }
    });
  } else if (thisStatusNumber === 3) {
    buttonList.push({
      name: "수정 제안 문서 전송",
      event: function () {
        return instance.uploadFiles(thisStatusNumber);
      }
    });
  } else if (thisStatusNumber === 4) {
    buttonList.push({
      name: "시공 의뢰서 전송",
      event: function () {
        return instance.uploadFiles(thisStatusNumber);
      }
    });
  } else if (thisStatusNumber === 5) {
    buttonList.push({
      name: "제품 리스트 전송",
      event: function () {
        return instance.uploadFiles(thisStatusNumber);
      }
    });
  } else if (thisStatusNumber === 6) {
    buttonList.push({
      name: "촬영 여부",
      event: function () {
        return function (e) {
          const designer = this.getAttribute("designer");
          const desid = this.getAttribute("desid");
          const client = this.getAttribute("client");
          const proid = this.getAttribute("proid");
          const targetMother = totalContents;
          let photoTargets, cancelBack, whitePrompt;

          cancelBack = {};
          whitePrompt = {};

          photoTargets = [
            {
              title: "촬영 요청",
              event: async function (e) {
                try {
                  const designer = this.getAttribute("designer");
                  const desid = this.getAttribute("desid");
                  const client = this.getAttribute("client");
                  const proid = this.getAttribute("proid");

                  await ajaxJson({ message: designer + " 실장님이 " + project.name + " 고객님 현장 촬영을 하고 싶다고 의사 표현하셨습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                  window.alert("홈리에종에 촬영 진행 의견을 전달하였습니다!");
                  cancelBack.click();

                } catch (e) {
                  console.log(e);
                }
              }
            },
            {
              title: "촬영 미진행",
              event: async function (e) {
                try {
                  const designer = this.getAttribute("designer");
                  const desid = this.getAttribute("desid");
                  const client = this.getAttribute("client");
                  const proid = this.getAttribute("proid");

                  await ajaxJson({ message: designer + " 실장님이 " + project.name + " 고객님 현장 촬영을 진행을 하고 싶지 않아 하십니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                  window.alert("홈리에종에 촬영 미진행 의견을 전달하였습니다!");
                  cancelBack.click();

                } catch (e) {
                  console.log(e);
                }
              }
            },
            {
              title: "촬영비 결제",
              event: async function (e) {
                try {
                  const designer = this.getAttribute("designer");
                  const desid = this.getAttribute("desid");
                  const client = this.getAttribute("client");
                  const proid = this.getAttribute("proid");
                  const { pluginScript, oidConst } = await ajaxJson({ mode: "script", oidKey: "mini" }, BACKHOST + "/generalImpPayment");
                  let plugin, oid;

                  oid = oidConst + instance.designer.information.phone.replace(/[^0-9]/gi, '') + "_" + String((new Date()).valueOf());

                  plugin = new Function(pluginScript);
                  plugin();
                  window.IMP.init("imp71921105");

                  if (desktop) {

                    window.IMP.request_pay({
                        pg: "inicis",
                        pay_method: "card",
                        merchant_uid: oid,
                        name: "현장 촬영비",
                        amount: Math.floor(165000),
                        buyer_email: instance.designer.information.email,
                        buyer_name: instance.designer.designer,
                        buyer_tel: instance.designer.information.phone,
                    }, async (rsp) => {
                      try {
                        if (typeof rsp.status === "string" && /paid/gi.test(rsp.status)) {
                          await ajaxJson({ message: designer + " 실장님이 " + project.name + " 고객님 현장 촬영의 촬영비를 결제하셨습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                          window.alert("결제가 완료되었습니다!");
                          cancelBack.click();
                        } else {
                          window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
                          window.location.reload();
                        }
                      } catch (e) {
                        window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
                        window.location.reload();
                      }
                    });

                  } else {

                    const { key } = await ajaxJson({ mode: "store", oid, data: { designer, desid, client, proid, oid } }, BACKHOST + "/generalImpPayment");
                    window.IMP.request_pay({
                        pg: "inicis",
                        pay_method: "card",
                        merchant_uid: oid,
                        name: "현장 촬영비",
                        amount: Math.floor(165000),
                        buyer_email: instance.designer.information.email,
                        buyer_name: instance.designer.designer,
                        buyer_tel: instance.designer.information.phone,
                        m_redirect_url: window.location.protocol + "//" + window.location.host + window.location.pathname + "?proid=" + proid + "&mobilecard=" + key,
                    }, (rsp) => {});

                  }

                } catch (e) {
                  console.log(e);
                }
              }
            }
          ];

          cancelBack = createNode({
            mother: targetMother,
            event: {
              click: function (e) {
                targetMother.removeChild(targetMother.lastChild);
                targetMother.removeChild(targetMother.lastChild);
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0),
              height: withOut(0),
              background: colorChip.black,
              opacity: String(0.2),
            }
          });

          whitePrompt = createNode({
            mother: targetMother,
            style: {
              position: "fixed",
              top: withOut(50, (((statusButtonHeight * 3) + (statusButtonBetween * 2) + (grayInnerPadding * 2)) / 2), ea),
              left: withOut(50, (((statusButtonWidth * 1) + (grayInnerPadding * 2)) / 2), ea),
              width: String((statusButtonWidth * 1)) + ea,
              height: String((statusButtonHeight * 3) + (statusButtonBetween * 3)) + ea,
              background: colorChip.gray2,
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              animation: "fadeuplite 0.3s ease forwards",
              padding: String(grayInnerPadding) + ea,
              paddingBottom: String(grayInnerPadding - statusButtonBetween) + ea,
            },
            children: [
              {
                style: {
                  display: "block",
                  top: String(0),
                  left: String(0),
                  width: withOut(0),
                  height: withOut(0),
                  position: "relative",
                }
              }
            ]
          });

          for (let i = 0; i < photoTargets.length; i++) {
            createNode({
              mother: whitePrompt.firstChild,
              attribute: { index: String(i), designer, desid, client, proid },
              event: {
                click: photoTargets[i].event
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(statusButtonWidth) + ea,
                height: String(statusButtonHeight) + ea,
                background: colorChip.white,
                borderRadius: String(5) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                marginRight: String(i % 2 === 0 ? statusButtonBetween : 0) + ea,
                marginBottom: String(statusButtonBetween) + ea,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
              },
              children: [
                {
                  text: photoTargets[i].title,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(statusTextTop) + ea,
                    fontSize: String(statusSize) + ea,
                    fontWeight: String(statusBetween),
                    color: colorChip.black,
                  }
                }
              ]
            });
          }

        }
      }
    });
  }

  return buttonList;
}

ProcessDetailJs.prototype.insertGreenButtons = function () {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker } = GeneralJs;
  const { project, requestNumber, ea, baseTong, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  let baseWidth;
  let bottom;
  let chatBaseWidth;
  let chatBaseHeight;
  let chatBaseBetween;
  let right;
  let zIndex;
  let setButtons;
  let buttonList;
  let buttonBase;
  let buttonPadding;
  let buttonHeight;
  let buttonMarginTop;
  let buttonBetween;
  let buttonTextTop;
  let buttonSize;
  let buttonWeight;
  let basePadding;

  baseWidth = desktop ? 68 : 12;
  right = desktop ? 38 : 5.2;
  bottom = desktop ? 39 : 6.2;

  zIndex = 4;

  chatBaseWidth = <%% 150, 150, 150, 150, 36 %%>;
  chatBaseHeight = <%% 480, 480, 480, 480, 48 %%>;
  chatBaseBetween = <%% 16, 16, 16, 16, 2 %%>;

  buttonPadding = <%% 18, 18, 18, 16, 3.2 %%>;
  buttonHeight = <%% 36, 36, 36, 33, 7.2 %%>;
  buttonMarginTop = <%% 6, 6, 6, 6, 2 %%>;
  buttonBetween = <%% 6, 6, 6, 6, 1 %%>;

  buttonTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isIphone() ? -0.1 : -0.3) %%>;
  buttonSize = <%% 14, 14, 14, 13, 3 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;

  basePadding = <%% 18, 18, 16, 12, 4 %%>;

  buttonBase = createNode({
    mother: totalContents,
    class: [ "backblurwhite" ],
    style: {
      display: "inline-flex",
      position: "fixed",
      width: String(chatBaseWidth) + ea,
      borderRadius: String(8) + "px",
      right: String(right) + ea,
      bottom: String(bottom + baseWidth + chatBaseBetween) + ea,
      boxShadow: "0px 6px 20px -10px " + colorChip.shadow,
      animation: "talkfade 0.3s ease forwards",
      overflow: "hidden",
      padding: String(basePadding) + ea,
      zIndex: String(zIndex),
    },
    children: [
      {
        style: {
          display: "flex",
          position: "relative",
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(0),
          flexDirection: "column",
        }
      }
    ]
  }).firstChild;

  setButtons = (thisStatusNumber) => {
    buttonList = instance.returnButtonList(thisStatusNumber);
    cleanChildren(buttonBase);
    for (let i = 0; i < buttonList.length; i++) {
      createNode({
        mother: buttonBase,
        event: {
          click: buttonList[i].event(),
        },
        attribute: {
          proid: project.proid,
          desid: instance.designer.desid,
          name: project.name,
          designer: instance.designer.designer,
        },
        style: {
          display: "flex",
          width: withOut(0),
          height: String(buttonHeight) + ea,
          background: colorChip.gradientGreen,
          borderRadius: String(5) + "px",
          marginTop: String(i === 0 ? 0 : buttonMarginTop) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        children: [
          {
            text: buttonList[i].name,
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
      });
    }
  };
  setButtons(this.targetIndex);

}

ProcessDetailJs.prototype.insertButtonBox = function () {
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
  let buttonList;

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

  buttonList = instance.returnButtonList(this.targetIndex);

  for (let i = 0; i < buttonList.length; i++) {
    createNode({
      mother: grayTong,
      event: {
        click: buttonList[i].event(),
      },
      attribute: {
        proid: project.proid,
        desid: instance.designer.desid,
        name: project.name,
        designer: instance.designer.designer,
      },
      style: {
        display: "inline-flex",
        position: "relative",
        paddingLeft: String(buttonPadding) + ea,
        paddingRight: String(buttonPadding) + ea,
        marginRight: String(i === buttonList.length - 1 ? 0 : buttonBetween) + ea,
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
          text: buttonList[i].name,
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

}

ProcessDetailJs.prototype.uploadFiles = function (thisStatusNumber) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker } = GeneralJs;
  const { project, requestNumber, ea, baseTong, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const fileInputClassName = "fileInputClassName";
  let serviceContents;

  serviceContents = this.contents;

  if (thisStatusNumber === 0) {
    return async function (e) {
      try {
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        const name = this.getAttribute("name");
        const designer = this.getAttribute("designer");
        let input, removeTargets;

        removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
        for (let dom of removeTargets) {
          dom.remove();
        }

        input = createNode({
          mother: document.body,
          class: [ fileInputClassName ],
          mode: "input",
          event: {
            change: async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                const client = this.getAttribute("client");
                const designer = this.getAttribute("designer");
                let thisFiles, formData, res;
                let removeTargets;
                let loading;

                thisFiles = [ ...this.files ];

                if (thisFiles.length >= 1) {
                  formData = new FormData();
                  formData.enctype = "multipart/form-data";
                  formData.append("proid", proid);
                  formData.append("desid", desid);
                  formData.append("client", client);
                  for (let i = 0; i < thisFiles.length; i++) {
                    formData.append("file_" + serviceContents[0].key + "_" + String(i), thisFiles[i]);
                  }

                  loading = instance.mother.grayLoading();

                  res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                  await ajaxJson({ message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 현장 미팅 관련 파일을 업로드 했습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                  window.alert("업로드가 완료되었습니다!");

                  await instance.setPanBlocks();

                  loading.remove();

                  removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                  for (let dom of removeTargets) {
                    dom.remove();
                  }

                }

              } catch (e) {
                console.log(e);
                window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
          attribute: {
            type: "file",
            name: serviceContents[0].key,
            multiple: "true",
            proid,
            desid,
            client: name,
            designer,
          },
          style: {
            display: "none",
          }
        });

        input.click();

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }
  } else if (thisStatusNumber === 1) {
    return async function (e) {
      try {
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        const name = this.getAttribute("name");
        const designer = this.getAttribute("designer");
        let input, removeTargets;

        removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
        for (let dom of removeTargets) {
          dom.remove();
        }

        input = createNode({
          mother: document.body,
          class: [ fileInputClassName ],
          mode: "input",
          event: {
            change: async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                const client = this.getAttribute("client");
                const designer = this.getAttribute("designer");
                let thisFiles, formData, res;
                let removeTargets;
                let loading;

                thisFiles = [ ...this.files ];

                if (thisFiles.length >= 1) {
                  formData = new FormData();
                  formData.enctype = "multipart/form-data";
                  formData.append("proid", proid);
                  formData.append("desid", desid);
                  formData.append("client", client);
                  for (let i = 0; i < thisFiles.length; i++) {
                    formData.append("file_" + serviceContents[1].key + "_" + String(i), thisFiles[i]);
                  }

                  loading = instance.mother.grayLoading();

                  res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                  await ajaxJson({ message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 현장의 일정 안내 파일을 업로드 했습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                  window.alert("업로드가 완료되었습니다!");

                  await instance.setPanBlocks();

                  loading.remove();

                  removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                  for (let dom of removeTargets) {
                    dom.remove();
                  }

                }

              } catch (e) {
                console.log(e);
                window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
          attribute: {
            type: "file",
            name: serviceContents[1].key,
            multiple: "true",
            proid,
            desid,
            client: name,
            designer,
          },
          style: {
            display: "none",
          }
        });

        input.click();

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }
  } else if (thisStatusNumber === 2) {
    return async function (e) {
      try {
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        const name = this.getAttribute("name");
        const designer = this.getAttribute("designer");
        let input, removeTargets;

        removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
        for (let dom of removeTargets) {
          dom.remove();
        }

        input = createNode({
          mother: document.body,
          class: [ fileInputClassName ],
          mode: "input",
          event: {
            change: async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                const client = this.getAttribute("client");
                const designer = this.getAttribute("designer");
                let thisFiles, formData, res;
                let removeTargets;
                let loading;

                thisFiles = [ ...this.files ];

                if (thisFiles.length >= 1) {
                  formData = new FormData();
                  formData.enctype = "multipart/form-data";
                  formData.append("proid", proid);
                  formData.append("desid", desid);
                  formData.append("client", client);
                  for (let i = 0; i < thisFiles.length; i++) {
                    formData.append("file_" + serviceContents[2].key + "_" + String(i), thisFiles[i]);
                  }

                  loading = instance.mother.grayLoading();

                  res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                  await ajaxJson({ message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 현장의 1차 제안서 파일을 업로드 했습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                  window.alert("업로드가 완료되었습니다!");

                  await instance.setPanBlocks();

                  loading.remove();

                  removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                  for (let dom of removeTargets) {
                    dom.remove();
                  }

                }

              } catch (e) {
                console.log(e);
                window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
          attribute: {
            type: "file",
            name: serviceContents[2].key,
            multiple: "true",
            proid,
            desid,
            client: name,
            designer,
          },
          style: {
            display: "none",
          }
        });

        input.click();

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }
  } else if (thisStatusNumber === 3) {
    return async function (e) {
      try {
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        const name = this.getAttribute("name");
        const designer = this.getAttribute("designer");
        let input, removeTargets;
        let loading;

        removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
        for (let dom of removeTargets) {
          dom.remove();
        }

        input = createNode({
          mother: document.body,
          class: [ fileInputClassName ],
          mode: "input",
          event: {
            change: async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                const client = this.getAttribute("client");
                const designer = this.getAttribute("designer");
                let thisFiles, formData, res;
                let removeTargets;

                thisFiles = [ ...this.files ];

                if (thisFiles.length >= 1) {
                  formData = new FormData();
                  formData.enctype = "multipart/form-data";
                  formData.append("proid", proid);
                  formData.append("desid", desid);
                  formData.append("client", client);
                  for (let i = 0; i < thisFiles.length; i++) {
                    formData.append("file_" + serviceContents[3].key + "_" + String(i), thisFiles[i]);
                  }

                  loading = instance.mother.grayLoading();

                  res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                  await ajaxJson({ message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 현장의 수정 제안서 파일을 업로드 했습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                  window.alert("업로드가 완료되었습니다!");

                  await instance.setPanBlocks();

                  loading.remove();

                  removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                  for (let dom of removeTargets) {
                    dom.remove();
                  }

                }

              } catch (e) {
                console.log(e);
                window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
          attribute: {
            type: "file",
            name: serviceContents[3].key,
            multiple: "true",
            proid,
            desid,
            client: name,
            designer,
          },
          style: {
            display: "none",
          }
        });

        input.click();

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }
  } else if (thisStatusNumber === 4) {
    return async function (e) {
      try {
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        const name = this.getAttribute("name");
        const designer = this.getAttribute("designer");
        let input, removeTargets;
        let loading;

        removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
        for (let dom of removeTargets) {
          dom.remove();
        }

        input = createNode({
          mother: document.body,
          class: [ fileInputClassName ],
          mode: "input",
          event: {
            change: async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                const client = this.getAttribute("client");
                const designer = this.getAttribute("designer");
                let thisFiles, formData, res;
                let removeTargets;

                thisFiles = [ ...this.files ];

                if (thisFiles.length >= 1) {
                  formData = new FormData();
                  formData.enctype = "multipart/form-data";
                  formData.append("proid", proid);
                  formData.append("desid", desid);
                  formData.append("client", client);
                  for (let i = 0; i < thisFiles.length; i++) {
                    formData.append("file_" + serviceContents[4].key + "_" + String(i), thisFiles[i]);
                  }

                  loading = instance.mother.grayLoading();

                  res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                  await ajaxJson({ message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 현장의 시공 의뢰서를 업로드 했습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                  window.alert("업로드가 완료되었습니다!");

                  await instance.setPanBlocks();

                  loading.remove();

                  removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                  for (let dom of removeTargets) {
                    dom.remove();
                  }

                }

              } catch (e) {
                console.log(e);
                window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
          attribute: {
            type: "file",
            name: serviceContents[4].key,
            multiple: "true",
            proid,
            desid,
            client: name,
            designer,
          },
          style: {
            display: "none",
          }
        });

        input.click();

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }
  } else if (thisStatusNumber === 5) {
    return async function (e) {
      try {
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        const name = this.getAttribute("name");
        const designer = this.getAttribute("designer");
        let input, removeTargets;
        let loading;

        removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
        for (let dom of removeTargets) {
          dom.remove();
        }

        input = createNode({
          mother: document.body,
          class: [ fileInputClassName ],
          mode: "input",
          event: {
            change: async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                const client = this.getAttribute("client");
                const designer = this.getAttribute("designer");
                let thisFiles, formData, res;
                let removeTargets;

                thisFiles = [ ...this.files ];

                if (thisFiles.length >= 1) {
                  formData = new FormData();
                  formData.enctype = "multipart/form-data";
                  formData.append("proid", proid);
                  formData.append("desid", desid);
                  formData.append("client", client);
                  for (let i = 0; i < thisFiles.length; i++) {
                    formData.append("file_" + serviceContents[5].key + "_" + String(i), thisFiles[i]);
                  }

                  loading = instance.mother.grayLoading();

                  res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                  await ajaxJson({ message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 현장의 제품 리스트를 업로드 했습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                  window.alert("업로드가 완료되었습니다!");

                  await instance.setPanBlocks();

                  loading.remove();

                  removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                  for (let dom of removeTargets) {
                    dom.remove();
                  }

                }

              } catch (e) {
                console.log(e);
                window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
          attribute: {
            type: "file",
            name: serviceContents[5].key,
            multiple: "true",
            proid,
            desid,
            client: name,
            designer,
          },
          style: {
            display: "none",
          }
        });

        input.click();

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }
  } else if (thisStatusNumber === 6) {
    return async function (e) {
      try {
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        const name = this.getAttribute("name");
        const designer = this.getAttribute("designer");
        let input, removeTargets;

        removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
        for (let dom of removeTargets) {
          dom.remove();
        }

        input = createNode({
          mother: document.body,
          class: [ fileInputClassName ],
          mode: "input",
          event: {
            change: async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                const client = this.getAttribute("client");
                const designer = this.getAttribute("designer");
                let thisFiles, formData, res;
                let removeTargets;
                let loading;

                thisFiles = [ ...this.files ];

                if (thisFiles.length >= 1) {
                  formData = new FormData();
                  formData.enctype = "multipart/form-data";
                  formData.append("proid", proid);
                  formData.append("desid", desid);
                  formData.append("client", client);
                  for (let i = 0; i < thisFiles.length; i++) {
                    formData.append("file_" + serviceContents[6].key + "_" + String(i), thisFiles[i]);
                  }

                  loading = instance.mother.grayLoading();

                  res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                  await ajaxJson({ message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 촬영 관련 파일을 업로드 했습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                  window.alert("업로드가 완료되었습니다!");

                  await instance.setPanBlocks();

                  loading.remove();

                  removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
                  for (let dom of removeTargets) {
                    dom.remove();
                  }

                }

              } catch (e) {
                console.log(e);
                window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
          attribute: {
            type: "file",
            name: serviceContents[6].key,
            multiple: "true",
            proid,
            desid,
            client: name,
            designer,
          },
          style: {
            display: "none",
          }
        });

        input.click();

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }

  }
}

ProcessDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let desid, designers, designer;
    let requestNumber;
    let service;
    let key;
    let targetIndex;

    if (getObj.proid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    proid = getObj.proid;
    projects = await ajaxJson({ whereQuery: { proid } }, SECONDHOST + "/getProjects", { equal: true });
    if (projects.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ project ] = projects;
    if (!/^d/.test(project.desid)) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    this.project = project;

    clients = await ajaxJson({ whereQuery: { cliid: project.cliid } }, SECONDHOST + "/getClients", { equal: true });
    if (clients.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ client ] = clients;
    this.client = client;

    this.projectHistory = await ajaxJson({ id: project.proid, rawMode: true }, BACKHOST + "/getProjectHistory");
    this.clientHistory = await ajaxJson({ id: client.cliid, rawMode: true }, BACKHOST + "/getClientHistory");

    this.project.name = this.client.name;

    requestNumber = 0;
    for (let i = 0; i < client.requests.length; i++) {
      if (client.requests[i].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
        requestNumber = i;
        break;
      }
    }
    this.requestNumber = requestNumber;

    designers = await ajaxJson({ whereQuery: { desid: project.desid } }, SECONDHOST + "/getDesigners", { equal: true });
    if (designers.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ designer ] = designers;
    this.designer = designer;

    this.contents = await ajaxJson({}, SECONDHOST + "/getChecklist", { equal: true });

    console.log(this.contents);

    targetIndex = -1;
    if (typeof getObj.index === "string") {
      if (!Number.isNaN(Number(getObj.index.replace(/[^0-9]/gi, '')))) {
        if (this.contents[Number(getObj.index)] !== undefined) {
          targetIndex = Number(getObj.index);
        }
      }
    }

    if (targetIndex === -1) {
      if (typeof getObj.key === "string") {
        key = getObj.key;
        targetIndex = this.contents.findIndex((obj) => { return obj.key === key });
      }
    }

    if (targetIndex === -1) {
      targetIndex = this.contents.findIndex((obj) => { return obj.target.includes(this.project.process.action) });
    }

    this.targetIndex = targetIndex;
    this.targetDrive = "__project__/" + this.designer.desid + "/" + this.project.proid;
    this.panList = [];

    if (typeof getObj.mobilecard === "string") {
      const response = await ajaxJson({ mode: "open", key: getObj.mobilecard }, BACKHOST + "/generalImpPayment", { equal: true });
      if (response.data !== undefined && response.rsp !== undefined) {
        const { data, rsp } = response;
        await ajaxJson({ message: data.designer + " 실장님이 " + data.client + " 고객님 현장 촬영의 촬영비를 결제하셨습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
        window.alert("결제가 완료되었습니다!");
      }
    }

    if (targetIndex === 0) {
      ProcessDetailJs.binaryPath = FRONTHOST + "/middle/meeting"
    } else if (targetIndex === 1) {
      ProcessDetailJs.binaryPath = FRONTHOST + "/middle/console/process"
    } else if (targetIndex === 2) {
      ProcessDetailJs.binaryPath = FRONTHOST + "/middle/console/first"
    } else if (targetIndex === 3) {
      ProcessDetailJs.binaryPath = FRONTHOST + "/middle/console/fix"
    } else if (targetIndex === 4) {
      ProcessDetailJs.binaryPath = FRONTHOST + "/middle/console/construct"
    } else if (targetIndex === 5) {
      ProcessDetailJs.binaryPath = FRONTHOST + "/middle/console/purchase"
    } else if (targetIndex === 6) {
      ProcessDetailJs.binaryPath = FRONTHOST + "/middle/console/setting"
    }

    this.initComplete = 0;

    await this.mother.ghostDesignerLaunching({
      name: "processDetail",
      designer: this.designer,
      base: {
        instance: this,
        binaryPath: ProcessDetailJs.binaryPath,
        subTitle: "",
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertProcessBox();
          instance.insertUploadBox();
          instance.contentsLoop();
          instance.insertCalendarBox();
          instance.insertInformationBox();
          instance.insertGreenButtons();
          instance.insertButtonBox();

          if (instance.targetIndex !== -1) {
            if (instance.buttons[instance.targetIndex] !== undefined) {
              instance.buttons[instance.targetIndex].click();
              instance.initComplete = 1;
            }
          }

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ProcessDetailJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ProcessDetailJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
