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
  "name": "projectDetail",
  "hangul": "프로젝트 상세",
  "route": [
    "projectDetail"
  ]
} %/%/g

const ProjectDetailJs = function () {
  this.mother = new GeneralJs();
}

ProjectDetailJs.binaryPath = FRONTHOST + "/middle/console/first";

ProjectDetailJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, client } = this;
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

  titleWording = "프로젝트 상세";
  subTitleContents = this.client.name + " 고객님의 프로젝트 상세입니다.";

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

ProjectDetailJs.prototype.insertProcessBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, selfHref, scrollTo } = GeneralJs;
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
  let whiteTong;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 55, 55, 47, 39, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 0, 0, 0, 0, 1 %%>;

  arrowBetween = <%% 5, 5, 5, 3, 1 %%>;
  arrowWidth = <%% 214, 160, 138, 109, 27 %%>;
  arrowHeight = <%% 100, 90, 80, 60, 11 %%>;

  textTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;
  textSize = <%% 16, 14, 13, 11, 2.8 %%>;
  textWeight = <%% 800, 800, 800, 800, 700 %%>;
  textMarginLeft = <%% 50, 48, 45, 30, 4.5 %%>;

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
        children: JSON.stringify(contents.process[i].children.map((obj) => { return obj.key })),
      },
      event: {
        mouseenter: function (e) {
          e.stopPropagation();
          e.preventDefault();

          const toggle = this.getAttribute("toggle");
          if (toggle === "off") {
            this.children[1].style.color = colorChip.green;
          } else {
            this.children[1].style.color = colorChip.green;
          }

        },
        mouseleave: function (e) {
          e.stopPropagation();
          e.preventDefault();

          const toggle = this.getAttribute("toggle");
          if (toggle === "off") {
            this.children[1].style.color = colorChip.black;
          } else {
            this.children[1].style.color = colorChip.black;
          }

        },
        click: function (e) {
          e.stopPropagation();
          const index = Number(this.getAttribute("index"));
          const children = JSON.parse(this.getAttribute("children"));
          scrollTo(window, instance.panList.find((dom) => {
            return children.includes(dom.getAttribute("key"));
          }), instance.mother.naviHeight * 2, true);
          this.children[1].style.color = colorChip.black;
        }
      },
      style: {
        display: "inline-flex",
        position: "relative",
        width: desktop ? "calc(calc(100% - " + String(arrowBetween * (contents.process.length - 1)) + ea + ") / " + String(contents.process.length) + ")" : "calc(calc(100% - " + String(arrowBetween * (3 - 1)) + ea + ") / " + String(3) + ")",
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
          source: desktop ? svgMaker.processArrow(arrowWidth, arrowHeight, (i % 2 === 0 ? colorChip.gray2 : colorChip.gray0)) : svgMaker.processArrow(arrowWidth, arrowHeight, (i % 2 === 0 ? colorChip.gray2 : colorChip.gray0)),
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
        width: desktop ? "calc(calc(100% - " + String(arrowBetween * (contents.process.length - 1)) + ea + ") / " + String(contents.process.length) + ")" : "calc(calc(calc(100% - " + String(arrowBetween * (3 - 1)) + ea + ") / " + String(3) + ") * 2)",
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
          source: svgMaker.processArrow(51, arrowHeight, colorChip.gray0),
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(51) + ea,
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
            marginLeft: String(1) + ea,
          }
        }
      ]
    });
  }

}

ProjectDetailJs.prototype.insertNumbersBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, selfHref, scrollTo } = GeneralJs;
  const buttonsClassName = "buttonsClassName";
  let margin;
  let paddingTop;
  let whiteBottomMargin;
  let titleFontSize;
  let bottomMargin;
  let whiteBlock;
  let grayTong;
  let contents;
  let innerMargin;
  let arrowWidth, arrowHeight;
  let textTop;
  let textSize, textWeight;
  let textMarginLeft;
  let mobileVisualPaddingValue;
  let button, buttons;
  let blockBetween;
  let blockBetweenBottom;
  let blockHeight;
  let lineTop;
  let columnsNumber;
  let textFileWeight;
  let whitePadding;
  let smallSize, smallWeight, smallBetween;
  let textTextTop;
  let smallTextTop;
  let panDom;
  let whiteTong;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 44, 44, 36, 28, 5.4 %%>;

  whiteBottomMargin = <%% 46, 46, 38, 30, 5.6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 0, 0, 0, 0, 1 %%>;

  textTextTop = <%% (isMac() ? 1 : 3), (isMac() ? 1 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 1), 0 %%>;
  smallTextTop = <%% (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), 0 %%>;

  textSize = <%% 16, 15, 14, 13, 2.9 %%>;
  textWeight = <%% 700, 700, 700, 700, 700 %%>;
  textFileWeight = <%% 500, 500, 500, 500, 500 %%>;

  whitePadding = <%% 12, 12, 8, 8, 2.2 %%>;

  blockBetween = <%% 36, 28, 26, 24, 5 %%>;
  blockBetweenBottom = <%% 10, 4, 4, 4, 2.2 %%>;
  blockHeight = <%% 36, 36, 32, 26, 4 %%>;

  lineTop = <%% 18, 18, 16, 13, 1.9 %%>;

  columnsNumber = <%% 4, 3, 3, 3, 2 %%>;

  smallSize = <%% 11, 11, 10, 10, 2.5 %%>;
  smallWeight = <%% 400, 400, 400, 400, 400 %%>;
  smallBetween = <%% 5, 5, 4, 4, 0 %%>;

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
      paddingBottom: String(whiteBottomMargin - blockBetweenBottom) + ea,
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
      paddingBottom: String(desktop ? innerMargin : 0) + ea,
      paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
      paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
      width: withOut(innerMargin * 2, ea),
      background: colorChip.white,
      borderRadius: String(8) + "px",
    }
  });

  this.panNumbers = [];
  for (let i = 0; i < this.panContents.length; i++) {
    panDom = createNode({
      mother: grayTong,
      attribute: {
        index: String(i),
        key: this.panContents[i].key,
      },
      style: {
        display: "inline-flex",
        position: "relative",
        width: "calc(calc(100% - " + String(blockBetween * (columnsNumber - 1)) + ea + ") / " + String(columnsNumber) + ")",
        height: String(blockHeight) + ea,
        marginRight: String((i % columnsNumber !== columnsNumber - 1) ? blockBetween : 0) + ea,
        marginBottom: String(blockBetweenBottom) + ea,
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "row",
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(0) + ea,
            left: String(0),
            height: String(lineTop) + ea,
            borderBottom: "1px solid " + colorChip.gray3,
            width: withOut(0, ea),
          }
        },
        {
          text: this.panContents[i].title,
          style: {
            position: "relative",
            top: String(textTextTop) + ea,
            fontSize: String(textSize) + ea,
            fontWeight: String(textWeight),
            color: colorChip.black,
            background: colorChip.white,
            paddingRight: String(whitePadding) + ea,
          }
        },
        {
          style: {
            right: String(0),
            position: "absolute",
            display: "inline-flex",
            alignItems: "end",
            justifyContent: "start",
            flexDirection: "row",
            background: colorChip.white,
            paddingLeft: String(whitePadding) + ea,
          },
          children: [
            {
              attribute: {
                value: String(0),
              },
              text: "0 file",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(textSize) + ea,
                fontWeight: String(textFileWeight),
                fontFamily: "graphik",
                color: colorChip.green,
                fontStyle: "italic",
                marginRight: String(smallBetween) + ea,
                background: colorChip.white,
              }
            },
            {
              attribute: {
                date: "0000-00-00",
              },
              text: big ? "최신 업로드 0000-00-00" : "00-00-00",
              style: {
                display: desktop ? "inline-block" : "none",
                position: "relative",
                top: String(smallTextTop) + ea,
                fontSize: String(smallSize) + ea,
                fontWeight: String(smallWeight),
                color: colorChip.green,
                background: colorChip.white,
              }
            },
          ]
        },
      ]
    });
    this.panNumbers.push(panDom);
  }
}

ProjectDetailJs.prototype.reloadNumbers = function (itemList) {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const { dateToString } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  let keyArr;
  let keyTong;
  let keyOptionArr;
  let targets, target;
  let filteredItems;

  targets = this.panNumbers;

  keyArr = itemList.map((obj) => { return obj.key });
  keyTong = {};
  for (let key of keyArr) {
    if (keyTong[key] === undefined) {
      keyTong[key] = [];
    }
    keyTong[key].push(key);
  }

  keyOptionArr = [];
  for (let key in keyTong) {
    keyOptionArr.push({
      key,
      number: keyTong[key].length,
    })
  }

  for (let { key, number } of keyOptionArr) {
    target = targets.find((dom) => { return dom.getAttribute("key") === key });
    if (target !== undefined) {

      if (number === 1 || number === 0) {
        target.children[2].firstChild.textContent = String(number) + " file";
      } else {
        target.children[2].firstChild.textContent = String(number) + " files";
      }
      target.children[2].firstChild.setAttribute("value", String(number));

      filteredItems = itemList.filter((obj) => { return obj.key === key });
      if (filteredItems.length > 0) {
        filteredItems.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
        target.children[2].lastChild.setAttribute("date", dateToString(filteredItems[0].date));
        if (big) {
          target.children[2].lastChild.textContent = "최신 업로드 " + dateToString(filteredItems[0].date);
        } else {
          target.children[2].lastChild.textContent = dateToString(filteredItems[0].date).slice(2);
        }
      }

    }
  }

}

ProjectDetailJs.prototype.insertUploadBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainTitle = "프로젝트 파일";
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
  let panTitleBoxWidth;
  let itemBetween;
  let statusPadding;
  let statusOpacity;
  let subButtonPaddingRight;
  let subButtonSize, subButtonWeight;
  let subButtonVisualTop;
  let subButtonPaddingBottom;
  let subButtonPaddingTop;
  let subButtonPaddingLeft;
  let buttonBetween;
  let plusIconTop, plusIconWidth;
  let subButtonsBasePan;
  let subButtonsBetween;
  let subButtonsVisualTop;
  let linkIconWidth;
  let linkIconTop;

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

  mobileInnerPaddingBottom = 0;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 15, 15, 14, 13, 3 %%>;
  contentsTextTop = <%% (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), -0.2 %%>;

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

  mobilePaddingLeft = 0;

  mobileContentsWordingSize = 3;

  checkBoxAreaWidth = <%% 16, 16, 16, 16, 3 %%>;

  panMotherInnerPadding = <%% 12, 12, 10, 8, 0 %%>;
  panBetween = <%% 8, 8, 8, 8, 1 %%>;
  panTitleBoxWidth = <%% 124, 120, 114, 108, 22 %%>;
  panTitleBoxHeight = <%% 52, 48, 45, 40, 9 %%>;

  uploadCircleWidth = <%% 28, 28, 28, 24, 6 %%>;
  uploadCirclePadding = <%% 16, 16, 16, 12, 4 %%>;
  uploadIconWidth = <%% 13, 13, 13, 12, 3 %%>;
  uploadIconTop = <%% 0, 0, 0, 0, 0 %%>;

  linkIconWidth = <%% 15.5, 15.5, 15.5, 14, 3.4 %%>;
  linkIconTop = <%% 0, 0, 0, 0, 0 %%>;

  plusIconTop = <%% 0, 0, 0, 0, 0 %%>;
  plusIconWidth = <%% 14, 14, 13, 12, 3 %%>;

  panMotherMinHeight = <%% 500, 480, 420, 400, 54 %%>;

  contentsPanPaddingTop = <%% 18, 18, 16, 12, 3 %%>;
  contentsPanPaddingBottom = <%% 60, 60, 60, 54, 12 %%>;
  itemBetween = <%% 6, 6, 5, 4, 1 %%>;

  statusPadding = <%% 21, 21, 18, 18, 4 %%>;
  statusOpacity = <%% 0.4, 0.4, 0.4, 0.4, 0.4 %%>;

  subButtonPaddingRight = <%% 18, 18, 16, 12, 1.6 %%>;
  subButtonSize = <%% 12, 12, 11, 10, 2.4 %%>;
  subButtonWeight = <%% 800, 800, 800, 800, 800 %%>;
  subButtonVisualTop = <%% 3, 3, 2, 1, 0.3 %%>;
  subButtonPaddingBottom = <%% (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 5 : 4), (isIphone() ? 1.2 : 1.4) %%>;
  subButtonPaddingTop = <%% (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 3 : 4), (isIphone() ? 1.2 : 1.2) %%>;
  subButtonPaddingLeft = <%% 11, 11, 10, 9, 2 %%>;
  subButtonsVisualTop = <%% 2, 3, 3, 1, 0 %%>;

  buttonBetween = <%% 5, 5, 5, 4, 1 %%>;

  subButtonsBetween = <%% 18, 18, 16, 14, 3 %%>;

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
      background: desktop ? colorChip.gray3 : colorChip.gray1,
      width: withOut(panMotherInnerPadding * 2, ea),
      padding: String(panMotherInnerPadding) + ea,
    }
  });

  for (let i = 0; i < this.panContents.length; i++) {
    basePan = createNode({
      mother: panMother,
      attribute: {
        index: String(i),
        proid: project.proid,
        desid: instance.designer.desid,
        name: project.name,
        designer: instance.designer.designer,
      },
      event: {
        drop: instance.dropFiles(i, (this.panContents[i].type === "photo")),
        dragenter: function (e) {
          e.preventDefault();
          e.stopPropagation();
          this.style.background = colorChip.whiteGreen;
        },
        dragover: function (e) {
          e.preventDefault();
          e.stopPropagation();
        },
        dragleave: function (e) {
          e.preventDefault();
          e.stopPropagation();
          this.style.background = colorChip.gray0;
        },
      },
      style: {
        display: "inline-block",
        verticalAlign: "top",
        position: "relative",
        width: withOut(0),
        marginBottom: String((i === (this.panContents.length - 1)) ? 0 : panBetween) + ea,
        background: desktop ? colorChip.gray1 : colorChip.gray3,
        borderRadius: String(5) + "px",
        transition: "all 0.5s ease",
      }
    });

    createNode({
      mother: basePan,
      style: {
        display: "inline-flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: String(panTitleBoxWidth) + ea,
        height: String(panTitleBoxHeight) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      },
      children: [
        {
          text: this.panContents[i].title,
          style: {
            position: "relative",
            top: String(contentsTextTop) + ea,
            fontSize: String(contentsWordingSize) + ea,
            fontWeight: String(800),
            color: colorChip.black,
          }
        }
      ]
    });

    subButtonsBasePan = createNode({
      mother: basePan,
      style: {
        display: "inline-flex",
        position: "absolute",
        alignItems: "center",
        flexDirection: "row",
        height: String(panTitleBoxHeight) + ea,
        paddingRight: String(subButtonPaddingRight) + ea,
        right: String(0),
        top: String(subButtonVisualTop) + ea,
      },
    });

    contentsPan = createNode({
      mother: basePan,
      attribute: {
        index: String(i),
        proid: project.proid,
        desid: instance.designer.desid,
        name: project.name,
        designer: instance.designer.designer,
        key: this.panContents[i].key,
      },
      style: {
        display: "block",
        position: "relative",
        width: withOut((contentsPanPaddingTop * 2) - itemBetween, ea),
        paddingTop: String(contentsPanPaddingTop) + ea,
        paddingBottom: String(contentsPanPaddingBottom) + ea,
        paddingLeft: String(contentsPanPaddingTop) + ea,
        paddingRight: String(contentsPanPaddingTop - itemBetween) + ea,
      }
    });

    if (this.panContents[i].type === "link") {

      createNode({
        mother: basePan,
        attribute: {
          index: String(i),
          key: this.panContents[i].key,
          proid: project.proid,
          desid: instance.designer.desid,
          name: project.name,
          designer: instance.designer.designer,
        },
        event: {
          click: async function (e) {
            try {
              const cancelKeyword = "httpCancel";
              const proid = this.getAttribute("proid");
              const desid = this.getAttribute("desid");
              const key = this.getAttribute("key");
              let link, memo, loading;

              loading = null;

              do {
                link = await GeneralJs.prompt("제품 링크를 복사 붙여넣기 해주세요!");
                if (link === null) {
                  link = cancelKeyword;
                }
              } while (typeof link !== "string" || !/^http/.test(link));

              if (link !== cancelKeyword) {
                do {
                  memo = await GeneralJs.prompt("링크에 대한 간단한 이름과 타입 등을 적어주세요! (예) 침실협탁_아이보리");
                  if (memo === null) {
                    memo = '';
                  }
                } while (typeof memo !== "string");

                loading = instance.mother.grayLoading();
                await ajaxJson({ proid, desid, key, link: window.encodeURIComponent(link.trim()), memo: memo.trim() }, BRIDGEHOST + "/middleLinkSave");
              }

              await instance.setPanBlocks();
              if (loading !== null) {
                loading.remove();
              }

            } catch (e) {
              console.log(e);
            }
          },
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
          background: colorChip.gradientGray,
          cursor: "pointer",
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnLink(colorChip.white),
            style: {
              display: "inline-block",
              position: "relative",
              top: String(linkIconTop) + ea,
              width: String(linkIconWidth) + ea,
            }
          }
        ]
      });

    } else {
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
          click: instance.uploadFiles(i, (this.panContents[i].type === "photo")),
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
          background: colorChip.gradientGray,
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
    }

    // createNode({
    //   mother: basePan,
    //   attribute: {
    //     index: String(i),
    //     proid: project.proid,
    //     desid: instance.designer.desid,
    //     name: project.name,
    //     designer: instance.designer.designer,
    //   },
    //   event: {
    //     click: instance.plusMemo(i),
    //   },
    //   style: {
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     width: String(uploadCircleWidth) + ea,
    //     height: String(uploadCircleWidth) + ea,
    //     position: "absolute",
    //     bottom: String(uploadCirclePadding) + ea,
    //     right: String((uploadCirclePadding + uploadCircleWidth) + buttonBetween) + ea,
    //     borderRadius: String(uploadCircleWidth) + ea,
    //     background: colorChip.gradientGray,
    //     cursor: "pointer",
    //   },
    //   children: [
    //     {
    //       mode: "svg",
    //       source: instance.mother.returnPlus(colorChip.white),
    //       style: {
    //         display: "inline-block",
    //         position: "relative",
    //         top: String(plusIconTop) + ea,
    //         width: String(plusIconWidth) + ea,
    //       }
    //     }
    //   ]
    // });

    this.panList.push(contentsPan);
  }

  this.setPanBlocks().catch((err) => { console.log(err) });

  return whiteBlock;
}

ProjectDetailJs.prototype.isEmptyString = function (string) {
  const instance = this;
  if (/^[0-9]/.test(string) && /[0-9]$/.test(string) && string.length > 5 && string.replace(/[0-9]/gi, '') === '') {
    return true;
  } else {
    return false;
  }
}

ProjectDetailJs.prototype.insertScheduleBox = async function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project, contentsRawInfo, totalContents, requestNumber } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const manyBig = media[0];
  const generalSmall = !manyBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, ajaxForm, serviceParsing, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, downloadFile, blankHref, removeByClass, equalJson, svgMaker, uniqueValue, variableArray, colorCalendar } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainTitle = "프로젝트 일정";
  const dragElementClassName = "dragElementClassName";
  const tempInputClassName = "tempInputClassName";
  const duringTextToken = "~";
  const duringToken = "<b%&nbsp;&nbsp;" + duringTextToken + "&nbsp;&nbsp;%b>";
  const dateToHangul = (dateObject) => {
    if (dateObject.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
      return '-';
    } else {
      return `${String(dateObject.getFullYear()).slice(2)}년 ${String(dateObject.getMonth() + 1)}월 ${String(dateObject.getDate())}일`;
    }
  }
  const hangulToDate = (hangul, calendarMode = true) => {
    hangul = hangul.replace(/ /gi, '');
    if (calendarMode) {
      if (hangul.trim() === '-') {
        return new Date();
      } else {
        const [ year, month, date ] = hangul.split(/[가-힣]/gi);
        return new Date(2000 + Number(year), Number(month) - 1, Number(date));    
      }
    } else {
      if (hangul.trim() === '-') {
        return new Date(1800, 0, 1);
      } else {
        const [ year, month, date ] = hangul.split(/[가-힣]/gi);
        return new Date(2000 + Number(year), Number(month) - 1, Number(date));    
      }
    }
  }
  try {
    let updateTextValue;
    let paddingTop;
    let margin;
    let block;
    let whiteBottomMargin;
    let whiteBlock, whiteTong;
    let bottomMargin;
    let titleFontSize;
    let numberRight;
    let titleTop, titleTopNumber;
    let titleBottom;
    let mobileTitleLeft, mobileTitleTop;
    let mobilePaddingLeft;
    let mobileInnerPaddingBottom;
    let contentsAreaPaddingTop;
    let panMother;
    let panMotherInnerPadding;
    let panBetween;
    let panTitleBoxWidth;
    let panTitleBoxHeight;
    let panMotherBetween;
    let contents;
    let itemBetween;
    let smallBetween;
    let contentsPanPaddingTop;
    let contentsWordingSize;
    let contentsWordingBoldWeight;
    let contentsWordingWeight;
    let contentsWordingContentsWeight;
    let hamburgerItemWidth;
    let contentsTextTop;
    let widthRatio0, widthRatio1;
    let updateDateValue;
    let calendarWidth;
    let calendarPadding;
    let contentsBlock;
    let updateDateMobileValue;
    let setScheduleContents;
    let updateOrderValue;
    let buttonTongHeight, buttonTongPaddingTop;
    let buttonHeight, buttonPadding, buttonBetween;
    let buttonSize, buttonWeight, buttonTextTop;
    let originalContents;
    let contextMenuValue;
    let refreshUpdate;
    let calendarMother;
    let calendarTongPaddingTop, calendarTongPaddingBottom;
    let calendarDateArr;
    let updatedContents;

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

    panMotherInnerPadding = <%% 12, 12, 10, 8, 0 %%>;
    panBetween = <%% 8, 8, 8, 8, 1 %%>;
    panTitleBoxWidth = <%% 124, 120, 114, 108, 21 %%>;
    panTitleBoxHeight = <%% 52, 48, 40, 35, 8.2 %%>;
  
    panMotherBetween = <%% 8, 7, 6, 5, 1 %%>;
    smallBetween = <%% 3, 3, 2, 2, 1 %%>;
  
    mobileTitleLeft = 1.5;
    mobileTitleTop = -8.7;
  
    itemBetween = <%% 7, 7, 7, 6, 1.5 %%>;
  
    contentsPanPaddingTop = <%% 18, 18, 16, 12, 3 %%>;
    contentsWordingSize = <%% 14, 14, 12, 11, 2.7 %%>;
    contentsWordingBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    contentsWordingWeight = <%% 700, 700, 700, 700, 700 %%>;
    contentsWordingContentsWeight = <%% 400, 400, 400, 400, 400 %%>;
    contentsTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.1 %%>;
  
    calendarTongPaddingTop = <%% 24, 24, 20, 16, 3 %%>;
    calendarTongPaddingBottom = <%% 20, 20, 18, 14, 3 %%>;

    hamburgerItemWidth = <%% 14, 13, 13, 12, 2 %%>;
  
    widthRatio0 = <%% 4, 3, 3, 2.5, 3.5 %%>;
    widthRatio1 = <%% 12, 10, 10, 9, 1 %%>;
  
    calendarWidth = <%% 260, 260, 260, 260, 260 %%>;
    calendarPadding = <%% 4, 4, 4, 4, 3 %%>;
  
    buttonTongHeight = <%% 42, 42, 32, 30, 14 %%>;
    buttonTongPaddingTop = <%% 11, 11, 8, 6, 2 %%>;

    buttonHeight = <%% 36, 36, 30, 28, 7 %%>;
    buttonPadding = <%% 22, 18, 16, 14, 4 %%>;
    buttonBetween = <%% 6, 6, 6, 6, 1 %%>;

    buttonSize = <%% 14, 14, 12, 11, 2.7 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.1 %%>;

    mobileInnerPaddingBottom = 0;
  
    this.whiteMargin = (desktop ? margin : 0);
  
    setScheduleContents = () => {};
  
    refreshUpdate = async function (base) {
      try {
        let refreshTargets;
        let num;
        let newContents;
        let childrenTarget;
        let tempObj;
        let whereQuery, updateQuery;

        refreshTargets = [ ...base.children ];
        refreshTargets.pop();

        num = -1;
        newContents = [];
        for (let dom of refreshTargets) {
          dom.setAttribute("index", String(num));
          childrenTarget = [ ...dom.children ];
          for (let child of childrenTarget) {
            child.setAttribute("index", String(num));
          }
          if (num !== -1) {
            tempObj = {};
            tempObj.date = {};
            for (let i = 0; i < childrenTarget.length; i++) {
              if (i === 1) {
                tempObj.title = childrenTarget[i].textContent;
              } else if (i === 2) {
                tempObj.description = childrenTarget[i].textContent;
              } else if (i === 3) {
                tempObj.date.start = hangulToDate(childrenTarget[i].textContent, false);
              } else if (i === 4) {
                tempObj.date.end = hangulToDate(childrenTarget[i].textContent, false);
              }
            }
            newContents.push(tempObj);
          }
          num++;
        }

        whereQuery = { proid: project.proid };
        updateQuery = {};
        updateQuery["schedule"] = newContents;

        await ajaxJson({
          mode: "update",
          proid: project.proid,
          desid: instance.designer.desid,
          whereQuery,
          updateQuery
        }, SECONDHOST + "/projectDesignerSchedule");

        return { schedule: newContents };
      } catch (e) {
        console.log(e);
      }
    }

    updateTextValue = (order, widthRatio, weight) => {
      return async function (e) {
        try {
          const index = Number(this.getAttribute("index"));
          const mother = this.parentElement.parentElement;
          const base = this.parentElement;
          const zIndex = 4;
          const thisChildOrder = order;
          let updateEvent;
          let cancelBack;
          let valueInput;
          let column;
          let whereQuery, updateQuery;
  
          cancelBack = {};
          valueInput = {};
  
          updateEvent = async function (e) {
            try {
              document.getElementById(base.id).children[thisChildOrder].firstChild.textContent = valueInput.value;

              if (thisChildOrder === 1) {
                column = "title";
              } else if (thisChildOrder === 2) {
                column = "description";
              } else if (thisChildOrder === 3) {
                column = "description";
              }

              whereQuery = { proid: project.proid };
              updateQuery = {};
              updateQuery["schedule." + String(index) + "." + column] = valueInput.value;

              updatedContents = await ajaxJson({
                mode: "update",
                proid: project.proid,
                desid: instance.designer.desid,
                whereQuery,
                updateQuery
              }, SECONDHOST + "/projectDesignerSchedule", { equal: true });

              removeByClass(tempInputClassName);
              setScheduleContents(updatedContents);

            } catch (e) {
              console.log(e);
            }
          }

          cancelBack = createNode({
            mother,
            attribute: {
              baseid: base.id,
            },
            class: [ tempInputClassName ],
            event: {
              click: function (e) {
                updateEvent(e).catch((err) => { console.log(err); });
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });
  
          valueInput = createNode({
            mother,
            class: [ tempInputClassName ],
            attribute: {
              baseid: base.id,
            },
            style: {
              display: "inline-flex",
              position: "absolute",
              top: String((widthRatio !== 100 ? base.getBoundingClientRect().top : this.getBoundingClientRect().top) - mother.getBoundingClientRect().top) + "px",
              left: String(this.getBoundingClientRect().left - mother.getBoundingClientRect().left) + "px",
              height: String(panTitleBoxHeight) + ea,
              width: widthRatio !== 100 ? String(panTitleBoxHeight * widthRatio) + ea : String(base.getBoundingClientRect().width) + "px",
              background: colorChip.white,
              borderRadius: String(5) + "px",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              zIndex: String(zIndex),
            },
            child: {
              mode: "input",
              attribute: {
                type: "text",
                baseid: base.id,
              },
              event: {
                keypress: function (e) {
                  if (e.key === "Enter") {
                    updateEvent(e).catch((err) => { console.log(err); });
                  }
                }
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(weight),
                color: colorChip.green,
                top: String(contentsTextTop) + ea,
                border: String(0),
                outline: String(0),
                width: withOut(0, ea),
                textAlign: "center",
              }
            }
          }).firstChild;
  
          valueInput.value = this.firstChild.textContent;
          valueInput.focus();
          
        } catch (e) {
          console.log(e);
        }
      }
    }
  
    contextMenuValue = (order) => {
      return async function (e) {
        try {

          e.preventDefault();

          const self = this;
          const index = Number(this.getAttribute("index"));
          const mother = this.parentElement.parentElement;
          const base = this.parentElement;
          const zIndex = 4;
          const thisChildOrder = order;
          let cancelBack;
          let valueInput;
          let menu;
          let clone;
          let whereQuery;
          let updateQuery;
  
          cancelBack = {};
          valueInput = {};

          menu = [
            {
              title: "수정하기",
              event: () => {
                return function (e) {
                  removeByClass(tempInputClassName);
                  self.click();
                }
              }
            },
            {
              title: "블록 지우기",
              event: () => {
                return async function (e) {
                  try {
                    removeByClass(tempInputClassName);
                    base.remove();
                    setScheduleContents(await refreshUpdate(mother));
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: "새 볼록 추가",
              event: () => {
                return async function (e) {
                  try {
                    removeByClass(tempInputClassName);
                    clone = base.cloneNode(true);
                    mother.insertBefore(clone, base.nextElementSibling);
                    setScheduleContents(await refreshUpdate(mother));
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
          ]

          cancelBack = createNode({
            mother,
            attribute: {
              baseid: base.id,
            },
            class: [ tempInputClassName ],
            event: {
              click: function (e) {
                removeByClass(tempInputClassName);
              },
              contextmenu: function (e) {
                e.preventDefault();
                removeByClass(tempInputClassName);
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });

          valueInput = createNode({
            mother,
            attribute: {
              baseid: base.id,
            },
            class: [ tempInputClassName ],
            event: {
              click: function (e) {

              }
            },
            style: {
              position: "fixed",
              top: String(e.clientY - baseTong.getBoundingClientRect().top) + "px",
              left: String(e.clientX - baseTong.getBoundingClientRect().left) + "px",
              background: colorChip.white,
              padding: String(6) + ea,
              zIndex: String(zIndex),
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              animation: "fadeuplite 0.3s ease forwards",
            },
            children: menu.map((obj, index) => {
              return {
                event: {
                  click: obj.event(),
                },
                style: {
                  display: "flex",
                  width: String(110) + ea,
                  height: String(32) + ea,
                  background: colorChip.gradientGreen,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: String(5) + "px",
                  marginBottom: index !== menu.length - 1 ? String(4) + ea : "",
                  cursor: "pointer",
                },
                child: {
                  text: obj.title,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(-1) + ea,
                    fontSize: String(13) + ea,
                    fontWeight: String(600),
                    color: colorChip.white,
                  }
                }
              };
            })
          });
          
        } catch (e) {
          console.log(e);
        }
      }
    }

    updateDateValue = (order) => {
      return async function (e) {
        try {
          const index = Number(this.getAttribute("index"));
          const mother = this.parentElement.parentElement;
          const base = this.parentElement;
          const zIndex = 4;
          const thisChildOrder = order;
          let cancelBack;
          let valueInput;
          let calendar;
          let updateEvent;
          let column;
          let whereQuery, updateQuery;
  
          cancelBack = {};
          valueInput = {};
  
          updateEvent = function (value) {
            return async function (e) {
              try {
                const thisDate = stringToDate(value);
                document.getElementById(base.id).children[thisChildOrder].firstChild.textContent = dateToHangul(thisDate);

                if (thisChildOrder === 3) {
                  column = "date.start";
                } else if (thisChildOrder === 4) {
                  column = "date.end";
                }
  
                whereQuery = { proid: project.proid };
                updateQuery = {};
                updateQuery["schedule." + String(index) + "." + column] = thisDate;
  
                updatedContents = await ajaxJson({
                  mode: "update",
                  proid: project.proid,
                  desid: instance.designer.desid,
                  whereQuery,
                  updateQuery
                }, SECONDHOST + "/projectDesignerSchedule", { equal: true });

                removeByClass(tempInputClassName);
                setScheduleContents(updatedContents);

              } catch (e) {
                console.log(e);
              }
            }
          }

          cancelBack = createNode({
            mother,
            attribute: {
              baseid: base.id,
            },
            class: [ tempInputClassName ],
            event: {
              click: function (e) {
                removeByClass(tempInputClassName);
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });
  
          valueInput = createNode({
            mother,
            class: [ tempInputClassName ],
            attribute: {
              baseid: base.id,
            },
            style: {
              display: "inline-flex",
              position: "absolute",
              top: String(base.getBoundingClientRect().top - mother.getBoundingClientRect().top + this.getBoundingClientRect().height + calendarPadding) + "px",
              left: String(this.getBoundingClientRect().left - mother.getBoundingClientRect().left + (this.getBoundingClientRect().width / 2) - (calendarWidth / 2)) + "px",
              width: String(calendarWidth) + ea,
              background: colorChip.white,
              borderRadius: String(5) + "px",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              zIndex: String(zIndex),
              boxShadow: "0px 5px 15px -9px " + colorChip.shadow,
              animation: "fadeuplite 0.3s ease forwards",
            },
          })
  
          calendar = instance.mother.makeCalendar(hangulToDate(base.children[thisChildOrder].firstChild.textContent), async function (e) {
            try {
              const updateFunc = updateEvent(this.getAttribute("buttonValue"));
              await updateFunc(e);
            } catch (e) {
              console.log(e);
            }
          });
          valueInput.appendChild(calendar.calendarBase);
          
        } catch (e) {
          console.log(e);
        }
      }
    }
  
    updateDateMobileValue = () => {
      return async function (e) {
        try {
          const index = Number(this.getAttribute("index"));
          const mother = this.parentElement.parentElement;
          const base = this.parentElement;
          const zIndex = 4;
          const thisChildOrder = 2;
          let cancelBack;
          let valueInput;
          let calendar;
          let thisDate, oppositeDate;
          let column;
          let whereQuery, updateQuery;

          cancelBack = {};
          valueInput = {};
  
          cancelBack = createNode({
            mother,
            attribute: {
              baseid: base.id,
            },
            class: [ tempInputClassName ],
            event: {
              click: function (e) {
                removeByClass(tempInputClassName);
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });
  
          valueInput = createNode({
            mother,
            class: [ tempInputClassName ],
            attribute: {
              baseid: base.id,
            },
            style: {
              display: "inline-flex",
              position: "absolute",
              top: String(base.getBoundingClientRect().top - mother.getBoundingClientRect().top + this.getBoundingClientRect().height + calendarPadding) + "px",
              right: String(3) + ea,
              width: String(calendarWidth) + "px",
              background: colorChip.white,
              borderRadius: String(5) + "px",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              zIndex: String(zIndex),
              boxShadow: "0px 5px 15px -9px " + colorChip.shadow,
              animation: "fadeuplite 0.3s ease forwards",
            },
          });
  


          if (e.clientX > this.querySelector('b').getBoundingClientRect().left) {
  
            thisDate = base.children[thisChildOrder].firstChild.textContent.split(duringTextToken).map((str) => { return str.trim() })[1];
            oppositeDate = base.children[thisChildOrder].firstChild.textContent.split(duringTextToken).map((str) => { return str.trim() })[0];
  
            calendar = instance.mother.makeCalendar(hangulToDate(thisDate), async function (e) {
              try {
                const thisDate = stringToDate(this.getAttribute("buttonValue"));
  
                document.getElementById(base.id).children[thisChildOrder].firstChild.lastChild.textContent = dateToHangul(thisDate);

                column = "date.end";
                whereQuery = { proid: project.proid };
                updateQuery = {};
                updateQuery["schedule." + String(index) + "." + column] = thisDate;
                
                updatedContents = await ajaxJson({
                  mode: "update",
                  proid: project.proid,
                  desid: instance.designer.desid,
                  whereQuery,
                  updateQuery
                }, SECONDHOST + "/projectDesignerSchedule", { equal: true });

                removeByClass(tempInputClassName);
                setScheduleContents(updatedContents);

              } catch (e) {
                console.log(e);
              }
            });
            valueInput.appendChild(calendar.calendarBase);
  
          } else {
  
            thisDate = base.children[thisChildOrder].firstChild.textContent.split(duringTextToken).map((str) => { return str.trim() })[0];
            oppositeDate = base.children[thisChildOrder].firstChild.textContent.split(duringTextToken).map((str) => { return str.trim() })[1];
  
            calendar = instance.mother.makeCalendar(hangulToDate(thisDate), async function (e) {
              try {
                const thisDate = stringToDate(this.getAttribute("buttonValue"));
                document.getElementById(base.id).children[thisChildOrder].firstChild.firstChild.textContent = dateToHangul(thisDate);

                column = "date.start";
                whereQuery = { proid: project.proid };
                updateQuery = {};
                updateQuery["schedule." + String(index) + "." + column] = thisDate;
                
                updatedContents = await ajaxJson({
                  mode: "update",
                  proid: project.proid,
                  desid: instance.designer.desid,
                  whereQuery,
                  updateQuery
                }, SECONDHOST + "/projectDesignerSchedule", { equal: true });

                removeByClass(tempInputClassName);
                setScheduleContents(updatedContents);

              } catch (e) {
                console.log(e);
              }
            });
            valueInput.appendChild(calendar.calendarBase);
  
          }
          
        } catch (e) {
          console.log(e);
        }
      }
    }

    updateOrderValue = () => {
      return async function (e) {
        try {
          const base = this.parentElement;
          let toTarget, fromTarget;

          e.preventDefault();
          toTarget = e.toElement;
          while (!(new RegExp(dragElementClassName, "gi")).test(toTarget.className === null ? '' : toTarget.className)) {
            toTarget = toTarget.parentElement;
          }
          toTarget.style.paddingBottom = String(0) + ea;

          fromTarget = document.getElementById(e.dataTransfer.getData("dragData"));

          if (toTarget.nextElementSibling === null) {
            base.appendChild(fromTarget);
          } else {
            base.insertBefore(fromTarget, toTarget.nextElementSibling)
          }

          if (desktop) {
            await refreshUpdate(base);
          }
          
        } catch (e) {
          console.log(e);
        }
      }
    }
    
    originalContents = await ajaxJson({ mode: "original", proid: project.proid, desid: instance.designer.desid }, SECONDHOST + "/projectDesignerSchedule");

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
            borderRadius: mobile ? String(1) + ea : "",
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
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: String(5) + "px",
        background: desktop ? colorChip.gray3 : colorChip.gray1,
        width: withOut(panMotherInnerPadding * 2, ea),
        padding: String(panMotherInnerPadding) + ea,
        verticalAlign: "top",
      },
      child: {
        style: {
          display: "flex",
          flexDirection: "column",
          position: "relative",
          borderRadius: String(5) + "px",
          background: desktop ? colorChip.gray1 : colorChip.gray3,
          width: withOut(contentsPanPaddingTop * 2, ea),
          padding: String(contentsPanPaddingTop) + ea,
          verticalAlign: "top",
        }
      }
    }).firstChild;
  
    calendarMother = createNode({
      mother: panMother.parentElement,
      style: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: String(5) + "px",
        background: desktop ? colorChip.gray1 : colorChip.gray3,
        width: withOut(contentsPanPaddingTop * 2, ea),
        paddingLeft: String(contentsPanPaddingTop) + ea,
        paddingRight: String(contentsPanPaddingTop) + ea,
        paddingTop: String(calendarTongPaddingTop) + ea,
        paddingBottom: String(calendarTongPaddingBottom) + ea,
        marginTop: String(desktop ? panMotherInnerPadding : 2) + ea,
        verticalAlign: "top",
      },
    });

    setScheduleContents = (contents) => {

      cleanChildren(panMother);
      cleanChildren(calendarMother);

      calendarDateArr = [
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

      for (let i = -1; i < contents.schedule.length; i++) {
        contentsBlock = createNode({
          mother: panMother,
          attribute: {
            index: String(i),
          },
          class: [ dragElementClassName ],
          id: dragElementClassName + "_" + uniqueValue("hex"),
          event: {
            selectstart: (e) => {
              e.preventDefault();
            },
          },
          style: {
            display: desktop ? "flex" : "block",
            position: "relative",
            width: withOut(0, ea),
            height: desktop ? String(panTitleBoxHeight) + ea : "",
            marginBottom: String(itemBetween) + ea,
            paddingBottom: desktop ? String(0) + ea : String(itemBetween) + ea,
            borderBottom: mobile ? "1px dashed " + colorChip.gray4 : "",
            transition: "all 0.3s ease",
          },
          children: [
            {
              attribute: {
                index: String(i),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(panTitleBoxHeight) + ea,
                height: String(panTitleBoxHeight) + ea,
                background: i === -1 ? colorChip.darkDarkShadow : colorChip.white,
                borderRadius: String(5) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                marginRight: String(smallBetween) + "px",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
                verticalAlign: "top",
                borderTopRightRadius: desktop ? String(5) + "px" : String(1) + "px",
                borderBottomRightRadius: desktop ? String(5) + "px" : String(1) + "px",
                borderBottomLeftRadius: desktop ? String(5) + "px" : String(1) + "px",
              },
              children: variableArray(1).map((index) => {
                if (desktop) {
                  return {
                    mode: "svg",
                    source: svgMaker.hamburgerIcon(colorChip.deactive),
                    style: {
                      display: i === -1 ? "none" : "inline-block",
                      position: "relative",
                      width: String(hamburgerItemWidth) + ea,
                    }
                  }
                } else {
                  return {
                    text: String(i + 1),
                    style: {
                      display: "inline-block",
                      position: "relative",
                      fontFamily: "graphik",
                      fontSize: String(contentsWordingSize) + ea,
                      fontStyle: "italic",
                      fontWeight: String(600),
                      color: i === -1 ? colorChip.white : colorChip.green,
                      top: String(contentsTextTop) + ea,
                    }
                  }
                }
              }),
            },
            {
              attribute: {
                index: String(i)
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(panTitleBoxHeight * widthRatio0) + ea,
                height: String(panTitleBoxHeight) + ea,
                background: i === -1 ? colorChip.darkDarkShadow : colorChip.white,
                borderRadius: String(desktop ? 5 : 1) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                marginRight: String(smallBetween) + "px",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
                verticalAlign: "top",
                marginBottom: desktop ? "" : String(smallBetween) + "px",
              },
              child: {
                text: i === -1 ? "계획명" : contents.schedule[i].title,
                event: {
                  selectstart: (e) => {
                    e.preventDefault();
                  }
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(i === -1 ? contentsWordingBoldWeight : contentsWordingWeight),
                  color: i === -1 ? colorChip.white : colorChip.black,
                  top: String(contentsTextTop) + ea,
                }
              }
            },
          ]
        });
        if (desktop) {
          createNode({
            mother: contentsBlock,
            attribute: {
              index: String(i)
            },
            style: {
              display: "inline-flex",
              position: "relative",
              width: desktop ? String(panTitleBoxHeight * widthRatio1) + ea : withOut(0, ea),
              height: String(panTitleBoxHeight) + ea,
              background: i === -1 ? colorChip.darkDarkShadow : colorChip.white,
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              marginRight: desktop ? String(smallBetween) + ea : "",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              verticalAlign: "top",
            },
            child: {
              text: i === -1 ? "설명" : contents.schedule[i].description,
              event: {
                selectstart: (e) => {
                  e.preventDefault();
                }
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(i === -1 ? contentsWordingBoldWeight : contentsWordingContentsWeight),
                color: i === -1 ? colorChip.white : colorChip.black,
                top: String(contentsTextTop) + ea,
              }
            }
          });
          createNode({
            mother: contentsBlock,
            attribute: {
              index: String(i)
            },
            style: {
              display: "inline-flex",
              position: "relative",
              width: "calc(" + withOut((panTitleBoxHeight * (1 + widthRatio0 + widthRatio1)) + (smallBetween * 4), "px") + " / " + String(2) + ")",
              height: String(panTitleBoxHeight) + ea,
              background: i === -1 ? colorChip.darkDarkShadow : colorChip.white,
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              marginRight: String(smallBetween) + "px",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              verticalAlign: "top",
            },
            child: {
              text: i === -1 ? "시작일" : dateToHangul(contents.schedule[i].date.start),
              event: {
                selectstart: (e) => {
                  e.preventDefault();
                }
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(i === -1 ? contentsWordingBoldWeight : contentsWordingContentsWeight),
                color: i === -1 ? colorChip.white : colorChip.black,
                top: String(contentsTextTop) + ea,
              }
            }
          });
          createNode({
            mother: contentsBlock,
            attribute: {
              index: String(i)
            },
            style: {
              display: "inline-flex",
              position: "relative",
              width: "calc(" + withOut((panTitleBoxHeight * (1 + widthRatio0 + widthRatio1)) + (smallBetween * 4), "px") + " / " + String(2) + ")",
              height: String(panTitleBoxHeight) + ea,
              background: i === -1 ? colorChip.darkDarkShadow : colorChip.white,
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              verticalAlign: "top",
            },
            child: {
              text: i === -1 ? "종료일" : dateToHangul(contents.schedule[i].date.end),
              event: {
                selectstart: (e) => {
                  e.preventDefault();
                }
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(i === -1 ? contentsWordingBoldWeight : contentsWordingContentsWeight),
                color: i === -1 ? colorChip.white : colorChip.black,
                top: String(contentsTextTop) + ea,
              }
            }
          });
        } else {
          createNode({
            mother: contentsBlock,
            attribute: {
              index: String(i)
            },
            style: {
              display: "inline-flex",
              position: "relative",
              width: "calc(" + withOut((panTitleBoxHeight * (1 + widthRatio0)), ea) + " - " + String((smallBetween * 2)) + "px" + ")",
              height: String(panTitleBoxHeight) + ea,
              background: i === -1 ? colorChip.darkDarkShadow : colorChip.white,
              borderRadius: String(1) + "px",
              borderTopRightRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              verticalAlign: "top",
            },
            child: {
              text: i === -1 ? "해당 일정 시작일 ~ 종료일" : dateToHangul(contents.schedule[i].date.start) + duringToken + dateToHangul(contents.schedule[i].date.end),
              event: {
                selectstart: (e) => {
                  e.preventDefault();
                }
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(i === -1 ? contentsWordingBoldWeight : 700),
                color: i === -1 ? colorChip.white : colorChip.black,
                top: String(contentsTextTop) + ea,
                fontStyle: "italic",
              },
              bold: {
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(i === -1 ? contentsWordingBoldWeight : contentsWordingContentsWeight),
                color: i === -1 ? colorChip.white : colorChip.deactive,
              }
            }
          });
          createNode({
            mother: contentsBlock,
            attribute: {
              index: String(i)
            },
            style: {
              display: "inline-flex",
              position: "relative",
              width: desktop ? String(panTitleBoxHeight * widthRatio1) + ea : withOut(0, ea),
              height: String(panTitleBoxHeight) + ea,
              background: i === -1 ? colorChip.darkDarkShadow : colorChip.white,
              borderTopLeftRadius: String(1) + "px",
              borderTopRightRadius: String(1) + "px",
              borderBottomLeftRadius: String(5) + "px",
              borderBottomRightRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              marginRight: desktop ? String(smallBetween) + "px" : "",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              verticalAlign: "top",
            },
            child: {
              text: i === -1 ? "해당 일정에 대한 자세한 설명" : contents.schedule[i].description,
              event: {
                selectstart: (e) => {
                  e.preventDefault();
                }
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(i === -1 ? contentsWordingBoldWeight : contentsWordingContentsWeight),
                color: i === -1 ? colorChip.white : colorChip.black,
                top: String(contentsTextTop) + ea,
              }
            }
          });
          if (i === contents.schedule.length - 1) {
            contentsBlock.style.marginBottom = "";
            contentsBlock.style.paddingBottom = "";
            contentsBlock.style.borderBottom = "";
          }
        }
        if (i !== -1) {
          calendarDateArr.push({
            contents: {
              color: [
                colorChip.yellow,
                colorChip.green,
                colorChip.purple,
                colorChip.red,
              ][i % 4],
              description: contents.schedule[i].description,
              title: contents.schedule[i].title,
            },
            date: {
              start: contents.schedule[i].date.start,
              end: contents.schedule[i].date.end,
            }
          })
        }
      }

      colorCalendar(calendarMother, calendarDateArr, { standardDate: new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1)) });

    }

    ajaxJson({ mode: "get", proid: project.proid, desid: instance.designer.desid }, SECONDHOST + "/projectDesignerSchedule", { equal: true }).then((rows) => {
      if (rows.length === 0) {
        contents = equalJson(JSON.stringify(originalContents));
        ajaxJson({ mode: "create", proid: project.proid, desid: instance.designer.desid, schedule: contents.schedule }, SECONDHOST + "/projectDesignerSchedule", { equal: true }).catch((err) => {
          console.log(err);
        });
      } else {
        contents = rows[0];
      }
      setScheduleContents(contents);
    }).catch((err) => {
      console.log(err);
    });

  } catch (e) {
    console.log(e);
  }
}

ProjectDetailJs.prototype.setPanBlocks = async function () {
  const instance = this;
  const { ea, targetDrive, targetHref, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { ajaxJson, createNode, colorChip, withOut, cleanChildren, dateToString, isMac, swipePatch, blankHref, removeByClass, downloadFile, equalJson } = GeneralJs;
  const motherChildPhotoTongClassName = "motherChildPhotoTongClassName";
  const photoItemInitClassName = "photoItemInitClassName";
  const bigPhotoClassName = "bigPhotoClassName";
  const bigPhotoFixedTargetsClassName = "bigPhotoFixedTargetsClassName";
  const preItemMotherKey = "firstPhoto";
  const preItemHex = "070a916ebdea87fae21233050e1b322eb4694980e1bced5012199be287e2e92d";
  const whiteContextmenuClassName = "whiteContextmenuClassName";
  const linkTargetKey = [ "productLink" ];
  const emptyDate = instance.client.requests[instance.requestNumber].request.timeline;
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
    let divideNumber;
    let bigPhotoPadding;
    let arrowButtonWidth;
    let arrowButtonMargin;
    let bigPhotoClickEvent;
    let fileItemSelectEvent;
    let photoItemSelectEvent;
    let linkItemSelectEvent;
    let itemDivide;
    let preItemList;
    let preIndex;
    let linkTargets;
    let linkContents;
    let link, memo;
    let linkPhotoHeight;
    let linkPhotoMarginBottom;
    let parsedHash;
    let contextmenuEvent;
    let contextSize;
    let contextmenuPadding;
    let contextWidth;
    let contextHeight;
    let preItemHexId;
    let fileItemList, photoItemList, linkItemList;

    itemBetween = <%% 6, 6, 5, 4, 1 %%>;
    itemTongHeight = <%% 40, 40, 36, 32, 8 %%>;
    itemTongMarginLeft = <%% 12, 12, 12, 10, 1 %%>;
    itemDivide = <%% 5, 4, 3, 3, 2 %%>;

    textTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;
    textSize = <%% 14, 14, 13, 12, 2.7 %%>;
    textWeight = <%% 500, 500, 500, 500, 500 %%>;

    contextmenuPadding = <%% 8, 8, 7, 6, 1 %%>;
    contextSize = <%% 13, 13, 12, 11, 2.5 %%>;
    contextWidth = <%% 130, 130, 120, 100, 20 %%>;
    contextHeight = <%% 32, 32, 30, 28, 6 %%>;

    divideNumber = <%% 5, 4, 3, 3, 2 %%>;

    bigPhotoPadding = <%% 48, 48, 48, 40, 24 %%>;

    arrowButtonWidth = <%% 16, 16, 16, 16, 2.5 %%>;
    arrowButtonMargin = <%% 20, 20, 20, 20, 2.5 %%>;

    linkPhotoHeight = <%% 238, 211, 244, 195, 40 %%>;
    linkPhotoMarginBottom = <%% 0, 0, 0, 0, 0 %%>;

    bigPhotoClickEvent = function (e) {
      e.preventDefault();
      e.stopPropagation();
      const self = this;
      const totalContents = document.querySelector("#totalcontents");
      const motherNumber = Number(this.getAttribute("number"));
      const zIndex = 4;
      let order, key, next, previous;
      let cancelBack, photoPrompt;
      let renderPhoto;

      next = {};
      previous = {};

      renderPhoto = (targetDom) => {
        const width = targetDom.getBoundingClientRect().width;
        const height = targetDom.getBoundingClientRect().height;
        const original = targetDom.getAttribute("original");
        const ratio = width / height;
        let thisWidth, thisHeight;
        let bigPhoto;

        order = Number(targetDom.getAttribute("order"));
        key = targetDom.getAttribute("key");
        next = document.querySelector('.' + photoItemInitClassName + "_" + key + "_" + String(order + 1));
        if (next === null) {
          next = document.querySelector('.' + photoItemInitClassName + "_" + key + "_" + String(0));
        }
        previous = document.querySelector('.' + photoItemInitClassName + "_" + key + "_" + String(order - 1));
        if (previous === null) {
          previous = document.querySelector('.' + photoItemInitClassName + "_" + key + "_" + String(motherMatrix[motherNumber] - 1));
        }

        if (document.querySelector('.' + bigPhotoClassName) !== null) {
          document.querySelector('.' + bigPhotoClassName).remove();
        }

        if (((window.innerHeight - instance.naviHeight) - (bigPhotoPadding * 2)) * ratio > window.innerWidth - (bigPhotoPadding * 2)) {
          thisWidth = window.innerWidth - (bigPhotoPadding * 2);
          thisHeight = thisWidth / ratio;
        } else {
          thisHeight = (window.innerHeight - instance.naviHeight) - (bigPhotoPadding * 2);
          thisWidth = thisHeight * ratio;
        }

        bigPhoto = createNode({
          mother: totalContents,
          mode: "img",
          class: [ bigPhotoClassName, bigPhotoFixedTargetsClassName ],
          event: {
            selectstart: (e) => { e.preventDefault(); },
          },
          attribute: {
            src: original
          },
          style: {
            display: "block",
            position: "fixed",
            top: "calc(calc(calc(calc(100% - " + String(instance.naviHeight) + "px" + ") / 2) - " + String(thisHeight / 2) + "px" + ") + " + String(instance.naviHeight) + "px" + ")",
            left: withOut(50, (thisWidth / 2), "px"),
            width: String(thisWidth) + "px",
            height: String(thisHeight) + "px",
            zIndex: String(zIndex),
            borderRadius: String(5) + "px",
          }
        });

        if (mobile) {
          swipePatch("left", function () {
            renderPhoto(next);
          }, bigPhoto);
          swipePatch("right", function () {
            renderPhoto(previous);
          }, bigPhoto);
        }

      }

      cancelBack = createNode({
        mother: totalContents,
        class: [ bigPhotoFixedTargetsClassName ],
        event: {
          click: function (e) {
            const removeTargets = document.querySelectorAll('.' + bigPhotoFixedTargetsClassName);
            for (let dom of removeTargets) {
              dom.remove();
            }
          }
        },
        style: {
          display: "block",
          position: "fixed",
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(0),
          background: colorChip.realBlack,
          opacity: String(0.7),
          zIndex: String(zIndex),
        }
      });

      if (desktop) {
        createNode({
          mother: totalContents,
          class: [ bigPhotoFixedTargetsClassName ],
          mode: "svg",
          source: instance.mother.returnArrow("left", colorChip.white),
          event: {
            selectstart: (e) => { e.preventDefault(); },
            click: function (e) {
              renderPhoto(previous);
            }
          },
          style: {
            display: "block",
            position: "fixed",
            top: "calc(calc(calc(calc(100% - " + String(instance.naviHeight) + "px" + ") / 2) - " + String(arrowButtonWidth / 2) + ea + ") + " + String(instance.naviHeight) + "px" + ")",
            left: String(arrowButtonMargin) + ea,
            width: String(arrowButtonWidth) + ea,
            zIndex: String(zIndex),
            cursor: "pointer",
          }
        });

        createNode({
          mother: totalContents,
          class: [ bigPhotoFixedTargetsClassName ],
          mode: "svg",
          source: instance.mother.returnArrow("right", colorChip.white),
          event: {
            selectstart: (e) => { e.preventDefault(); },
            click: function (e) {
              renderPhoto(next);
            }
          },
          style: {
            display: "block",
            position: "fixed",
            top: "calc(calc(calc(calc(100% - " + String(instance.naviHeight) + "px" + ") / 2) - " + String(arrowButtonWidth / 2) + ea + ") + " + String(instance.naviHeight) + "px" + ")",
            right: String(arrowButtonMargin) + ea,
            width: String(arrowButtonWidth) + ea,
            zIndex: String(zIndex),
            cursor: "pointer",
          }
        });
      }

      renderPhoto(self);

    }

    fileItemSelectEvent = function (e) {
      e.preventDefault();
      e.stopPropagation();
      const original = this.getAttribute("original");
      const key = this.getAttribute("key");
      const toggle = this.getAttribute("toggle");
      const hex = this.getAttribute("hex");
      const exe = this.getAttribute("exe");
      const type = this.getAttribute("type");

      if (toggle === "off") {

        this.style.background = colorChip.green;
        this.firstChild.style.color = colorChip.white;
        if (this.firstChild.querySelector('b') !== null) {
          this.firstChild.querySelector('b').style.color = colorChip.white;
        }

        this.setAttribute("toggle", "on");
        instance.itemList.push({ original, key, hex, exe, type });
      } else {

        this.style.background = desktop ? colorChip.white : colorChip.gray0;
        this.firstChild.style.color = colorChip.black;
        if (this.firstChild.querySelector('b') !== null) {
          this.firstChild.querySelector('b').style.color = colorChip.deactive;
        }

        instance.itemList.splice(instance.itemList.findIndex((obj) => {
          return obj.original === original;
        }), 1);
        this.setAttribute("toggle", "off");
      }

      instance.reloadGreenButtons();
    }

    linkItemSelectEvent = function (e) {
      e.preventDefault();
      e.stopPropagation();
      const original = this.getAttribute("original");
      const key = this.getAttribute("key");
      const toggle = this.getAttribute("toggle");
      const hex = this.getAttribute("hex");
      const exe = this.getAttribute("exe");
      const type = this.getAttribute("type");

      if (toggle === "off") {

        this.lastChild.style.background = colorChip.green;
        this.lastChild.firstChild.style.color = colorChip.white;
        if (this.lastChild.firstChild.querySelector('b') !== null) {
          this.lastChild.firstChild.querySelector('b').style.color = colorChip.white;
        }

        this.setAttribute("toggle", "on");
        instance.itemList.push({ original, key, hex, exe, type });
      } else {

        this.lastChild.style.background = desktop ? colorChip.white : colorChip.gray0;
        this.lastChild.firstChild.style.color = colorChip.black;
        if (this.lastChild.firstChild.querySelector('b') !== null) {
          this.lastChild.firstChild.querySelector('b').style.color = colorChip.deactive;
        }

        instance.itemList.splice(instance.itemList.findIndex((obj) => {
          return obj.original === original;
        }), 1);
        this.setAttribute("toggle", "off");
      }

      instance.reloadGreenButtons();
    }

    photoItemSelectEvent = function (e) {
      e.preventDefault();
      e.stopPropagation();
      const original = this.getAttribute("original");
      const key = this.getAttribute("key");
      const toggle = this.getAttribute("toggle");
      const hex = this.getAttribute("hex");
      const exe = this.getAttribute("exe");
      const type = this.getAttribute("type");

      if (toggle === "off") {

        this.lastChild.style.opacity = String(0.6);

        this.setAttribute("toggle", "on");
        instance.itemList.push({ original, key, hex, exe, type });
      } else {

        this.lastChild.style.opacity = String(0);

        instance.itemList.splice(instance.itemList.findIndex((obj) => {
          return obj.original === original;
        }), 1);
        this.setAttribute("toggle", "off");
      }

      instance.reloadGreenButtons();
    }

    contextmenuEvent = (type) => {
      return function (e) {
        e.preventDefault();

        let forceSelect;

        forceSelect = 0;
        if (this.getAttribute("toggle") === "off") {
          if (type === "file") {
            fileItemSelectEvent.call(this, e);
          } else if (type === "photo") {
            photoItemSelectEvent.call(this, e);
          } else {
            linkItemSelectEvent.call(this, e);
          }
          forceSelect = 1;
        }

        const self = this;
        const { top, left, height, width } = this.getBoundingClientRect();
        let cancelBack, whitePrompt;
        let cancelEvent;
        let link, original, key;

        cancelEvent = function (e) {
          removeByClass(whiteContextmenuClassName);
          if (forceSelect === 1) {
            if (type === "file") {
              fileItemSelectEvent.call(self, e);
            } else if (type === "photo") {
              photoItemSelectEvent.call(self, e);
            } else {
              linkItemSelectEvent.call(self, e);
            }
          }
        }

        cancelBack = createNode({
          mother: totalContents,
          class: [ whiteContextmenuClassName ],
          event: {
            click: cancelEvent
          },
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            width: withOut(0, ea),
            height: withOut(0, ea),
            background: "transparent",
          }
        });

        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteContextmenuClassName ],
          style: {
            display: "block",
            position: "fixed",
            top: String(e.y) + "px",
            left: String(e.x) + "px",
            padding: String(contextmenuPadding) + ea,
            background: colorChip.white,
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
            animation: "fadeuplite 0.3s ease forwards",
          }
        });

        if (type !== "link") {
          createNode({
            mother: whitePrompt,
            event: {
              click: async function (e) {
                let parsedString, loading;
                try {
                  if (instance.itemList.length === 0) {
                    window.alert("파일을 먼저 선택해주세요!");
                  } else {
                    for (let { original, type, hex, exe } of instance.itemList) {
                      loading = instance.mother.whiteProgressLoading();
                      if (type === "photo") {
                        await downloadFile(original, null, loading.progress.firstChild);
                      } else {
                        parsedString = await ajaxJson({ mode: "decrypto", hash: hex }, BACKHOST + "/homeliaisonCrypto", { equal: true });
                        await downloadFile(original, parsedString.string.replace(/ /gi, "_") + "." + exe, loading.progress.firstChild);
                      }
                      loading.remove();
                    }
                    cancelEvent.call(self, e);
                    await instance.setPanBlocks();
                  }
                } catch (e) {
                  console.log(e);
                  window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                }
              }
            },
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: String(contextWidth) + ea,
              height: String(contextHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray1,
              cursor: "pointer",
            },
            child: {
              text: "파일 다운로드",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contextSize) + ea,
                fontWeight: String(textWeight),
                color: colorChip.black,
                top: String(textTop) + ea,
              }
            }
          });
        } else {
          link = this.getAttribute("link");
          original = this.getAttribute("original");
          key = this.getAttribute("key");
          createNode({
            mother: whitePrompt,
            attribute: {
              link,
            },
            event: {
              click: function (e) {
                const link = this.getAttribute("link");
                blankHref(link);
                cancelEvent.call(self, e);
              },
            },
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: String(contextWidth) + ea,
              height: String(contextHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray1,
              cursor: "pointer",
            },
            child: {
              text: "링크 열기",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contextSize) + ea,
                fontWeight: String(textWeight),
                color: colorChip.black,
                top: String(textTop) + ea,
              }
            }
          });
        }

      }
    }

    mothers = this.panList;
    itemList = await ajaxJson({ target: this.targetDrive }, BRIDGEHOST + "/middlePhotoRead", { equal: true });
    preItemList = await ajaxJson({ cliid: this.client.cliid }, BRIDGEHOST + "/clientPhoto", { equal: true });

    linkTargets = itemList.filter((str) => { return linkTargetKey.includes(str.split("_")[0]) });
    linkContents = await ajaxJson({ links: linkTargets.map((file) => { return { desid: instance.designer.desid, proid: instance.project.proid, file } }) }, BRIDGEHOST + "/middleLinkParsing", { equal: true });

    for (let mother of mothers) {
      cleanChildren(mother);
    }

    itemList = itemList.map((raw) => {
      const original = raw;
      const [ key, time, order, hex ] = raw.split("_");
      const [ hexId, exe ] = hex.split(".");
      const id = key + "_" + time + "_" + String(order) + "_" + hexId;
      return [ key, new Date(Number(time)), String(Number(order) + 1) + "." + exe, Number(order), targetHref + "/" + original, exe, id, hexId ];
    }).map(([ key, date, name, order, original, exe, id, hexId ]) => {
      return { key, date, name, order, original, exe, id, hexId };
    });

    itemList.forEach((obj) => {
      if (obj.key === preItemMotherKey) {
        obj.order = preItemList.sitePhoto.length + obj.order;
        obj.name = String(obj.order) + "." + obj.exe;
      }
    });

    preIndex = 1;
    for (let original of preItemList.sitePhoto) {
      preItemHexId = ((new RegExp("^" + instance.hashConst + "_", "g")).test(original.split("/")[original.split("/").length - 1]) ? original.split("/")[original.split("/").length - 1].split("_")[1] : preItemHex);
      itemList.push({
        key: preItemMotherKey,
        date: emptyDate,
        name: String(preIndex) + "." + original.split(".")[original.split(".").length - 1],
        order: preIndex,
        original: original,
        exe: original.split(".")[original.split(".").length - 1],
        id: preItemMotherKey + "_" + String(emptyDate.valueOf()) + "_" + String(preIndex) + "_" + preItemHexId,
        hexId: preItemHexId,
      });
      preIndex++;
    }

    itemList.sort((a, b) => { return a.order - b.order });
    itemList.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });

    for (let item of itemList) {
      for (let i = 0; i < this.panContents.length; i++) {
        if (this.panContents[i].key === item.key) {
          item.mother = mothers[i];
          item.motherNumber = i;
          item.type = this.panContents[i].type;
        }
      }
    }

    motherMatrix = (new Array(this.panContents.length)).fill(0, 0);

    fileItemList = [];
    photoItemList = [];
    linkItemList = [];
    for (let { mother, key, date, name, order, motherNumber, type, original, exe, id, hexId } of itemList) {

      if (type === "file") {

        itemBlock = createNode({
          mother,
          attribute: {
            original,
            key,
            hex: hexId,
            exe,
            type,
            toggle: "off",
            date: dateToString(date).split("-").slice(1).join("/"),
          },
          event: {
            click: fileItemSelectEvent,
            contextmenu: contextmenuEvent(type),
          },
          style: {
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: "calc(calc(100% - " + String(itemBetween * itemDivide) + ea + ") / " + String(itemDivide) + ")",
            marginRight: String(itemBetween) + ea,
            height: String(itemTongHeight) + ea,
            marginBottom: String(itemBetween) + ea,
            borderRadius: String(5) + "px",
            background: desktop ? colorChip.white : colorChip.gray0,
            cursor: "pointer",
            textAlign: "center",
            verticalAlign: "top",
            overflow: "hidden",
            boxShadow: "0px 1px 8px -6px " + colorChip.shadow,
          },
          children: [
            {
              id,
              attribute: {
                exe,
                date: dateToString(date).split("-").slice(1).join("/"),
              },
              text: dateToString(date).slice(2) + "_" + name,
              style: {
                display: "inline-block",
                position: "relative",
                top: String(textTop) + ea,
                fontSize: String(textSize) + ea,
                fontWeight: String(textWeight),
                color: colorChip.black,
              },
              bold: {
                fontSize: String(textSize) + ea,
                fontWeight: String(textWeight),
                color: colorChip.deactive,
              }
            }
          ]
        });

        fileItemList.push({
          hash: hexId,
          target: id
        });

      } else if (type === "photo") {

        if (mother.querySelector('.' + motherChildPhotoTongClassName) === null) {
          for (let i = 0; i < divideNumber; i++) {
            createNode({
              mother,
              class: [ motherChildPhotoTongClassName ],
              style: {
                display: "inline-block",
                position: "relative",
                verticalAlign: "top",
                width: "calc(calc(100% - " + String(itemBetween * divideNumber) + ea + ") / " + String(divideNumber) + ")",
                marginRight: String(itemBetween) + ea,
                borderRadius: String(5) + "px",
              },
            });
          }
        }

        itemBlock = createNode({
          mother: [ ...mother.querySelectorAll('.' + motherChildPhotoTongClassName) ][(motherMatrix[motherNumber] % divideNumber)],
          class: [ (photoItemInitClassName + "_" + key + "_" + String(motherMatrix[motherNumber])) ],
          attribute: {
            key,
            original,
            hex: hexId,
            exe,
            type,
            order: String(motherMatrix[motherNumber]),
            number: String(motherNumber),
            toggle: "off"
          },
          event: {
            click: photoItemSelectEvent,
            contextmenu: contextmenuEvent(type),
          },
          style: {
            display: "block",
            position: "relative",
            width: withOut(0),
            borderRadius: String(5) + "px",
            marginBottom: String(itemBetween) + ea,
            cursor: "pointer",
          },
          children: [
            {
              mode: "img",
              attribute: { src: original },
              style: {
                display: "block",
                position: "relative",
                width: withOut(0),
                borderTopLeftRadius: String(5) + "px",
                borderTopRightRadius: String(5) + "px",
              }
            },
            {
              id,
              attribute: {
                height: String(itemTongHeight) + ea,
                date: dateToString(date).split("-").slice(1).join("/"),
              },
              style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: withOut(0, ea),
                height: String(0),
                borderBottomLeftRadius: String(5) + "px",
                borderBottomRightRadius: String(5) + "px",
                background: desktop ? colorChip.white : colorChip.gray0,
                textAlign: "center",
                overflow: "hidden",
                boxShadow: "0px 1px 8px -6px " + colorChip.shadow,
                transition: "all 0.3s ease",
              },
              child: {
                text: "",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(textTop) + ea,
                  fontSize: String(textSize) + ea,
                  fontWeight: String(textWeight),
                  color: colorChip.black,
                },
                bold: {
                  fontSize: String(textSize) + ea,
                  fontWeight: String(textWeight),
                  color: colorChip.deactive,
                }
              }
            },
            {
              style: {
                display: "block",
                position: "absolute",
                top: String(0),
                left: String(0),
                width: withOut(0),
                height: withOut(0),
                background: colorChip.green,
                opacity: String(0),
                borderRadius: String(5) + "px",
              }
            }
          ]
        });

        photoItemList.push({
          hash: hexId,
          target: id
        });

      } else if (type === "link") {

        ({ link, memo } = linkContents.find(({ file }) => { return (targetHref + "/" + file) === original }));

        itemBlock = createNode({
          mother,
          attribute: {
            link,
            original,
            key,
            toggle: "off",
            hex: hexId,
            exe,
            type,
            date: dateToString(date).split("-").slice(1).join("/"),
          },
          event: {
            click: function (e) {
              const link = this.getAttribute("link");
              blankHref(link);
            },
            contextmenu: contextmenuEvent(type),
          },
          style: {
            display: "inline-flex",
            width: "calc(calc(100% - " + String(itemBetween * divideNumber) + ea + ") / " + String(divideNumber) + ")",
            marginRight: String(itemBetween) + ea,
            marginBottom: String(itemBetween) + ea,
            cursor: "pointer",
            flexDirection: "column",
          },
          children: [
            {
              id,
              style: {
                display: "block",
                width: withOut(0, ea),
                height: String(linkPhotoHeight) + ea,
                borderTopLeftRadius: String(5) + "px",
                borderTopRightRadius: String(5) + "px",
                background: colorChip.white,
                marginBottom: String(linkPhotoMarginBottom) + ea,
                backgroundPosition: "50% 50%",
                backgroundSize: "100% auto",
                backgroundRepeat: "no-repeat",
              }
            },
            {
              style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: withOut(0, ea),
                height: String(itemTongHeight) + ea,
                borderBottomLeftRadius: String(5) + "px",
                borderBottomRightRadius: String(5) + "px",
                background: desktop ? colorChip.white : colorChip.gray0,
                textAlign: "center",
                overflow: "hidden",
                boxShadow: "0px 1px 8px -6px " + colorChip.shadow,
              },
              child: {
                text: memo.trim() !== "" ? memo.trim() + " <b%(" + dateToString(date).split("-").slice(1).join("/") + ")%b>" : dateToString(date) + "_" + name,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(textTop) + ea,
                  fontSize: String(textSize) + ea,
                  fontWeight: String(textWeight),
                  color: colorChip.black,
                },
                bold: {
                  fontSize: String(textSize) + ea,
                  fontWeight: String(textWeight),
                  color: colorChip.deactive,
                }
              }
            }
          ]
        });

        linkItemList.push({
          url: window.encodeURIComponent(link),
          target: id
        });

        ajaxJson({ mode: "image", url: window.encodeURIComponent(link), target: id }, BACKHOST + "/getOpenGraph").then(({ image, target }) => {
          target = document.querySelector('#' + target);
          if (image !== null && image !== "null") {
            target.style.backgroundImage = "url('" + image + "')";
          }
        }).catch((err) => {
          console.log(err);
        });

      }

      motherMatrix[motherNumber] = motherMatrix[motherNumber] + 1;
    }

    ajaxJson({ mode: "decrypto", targets: fileItemList }, BACKHOST + "/homeliaisonCrypto", { equal: true }).then((targets) => {
      for (let { string, target } of targets) {
        target = document.querySelector('#' + target);
        if (string.trim() !== "") {
          target.textContent = "";
          target.insertAdjacentHTML("beforeend", string + " <b style=\"color: " + colorChip.deactive + ";font-weight: " + String(textWeight) + "\">(" + target.getAttribute("date") + ")</b>");
        }
      }
    }).catch((err) => {
      console.log(err);
    });

    ajaxJson({ mode: "decrypto", targets: photoItemList }, BACKHOST + "/homeliaisonCrypto", { equal: true }).then((targets) => {
      for (let { string, target } of targets) {
        target = document.querySelector('#' + target);
        target.style.height = target.getAttribute("height");
        target.firstChild.textContent = "";
        if (!instance.isEmptyString(string)) {
          target.firstChild.insertAdjacentHTML("beforeend", string + " <b style=\"color: " + colorChip.deactive + ";font-weight: " + String(textWeight) + "\">(" + target.getAttribute("date") + ")</b>");
        } else {
          target.firstChild.insertAdjacentHTML("beforeend", "- " + " <b style=\"color: " + colorChip.deactive + ";font-weight: " + String(textWeight) + "\">(" + target.getAttribute("date") + ")</b>");
        }
      }
    }).catch((err) => {
      console.log(err);
    });

    motherMaxNumber = motherMatrix.reduce((acc, curr) => { return (acc >= curr ? acc : curr) }, 0);
    transparentItemsMatrix = motherMatrix.map((num) => { return Math.abs(motherMaxNumber - num) });

    this.reloadNumbers(itemList);

    this.itemList = [];
    this.reloadGreenButtons();

  } catch (e) {
    console.log(e);
  }
}

ProjectDetailJs.prototype.tableStatic = function (designer, project, client, clientHistory, projectHistory, requestNumber) {
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

ProjectDetailJs.prototype.insertInformationBox = function () {
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

  bottomMargin = <%% 160, 160, 160, 120, 30 %%>;
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

ProjectDetailJs.prototype.returnButtonList = function () {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, downloadFile } = GeneralJs;
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

  buttonList = [];
  buttonList.push({
    name: "선택 파일 다운로드",
    event: function () {
      return async function (e) {
        let parsedString, loading;
        try {
          if (instance.itemList.length === 0) {
            window.alert("파일을 먼저 선택해주세요!");
          } else {
            for (let { original, type, hex, exe } of instance.itemList) {
              loading = instance.mother.whiteProgressLoading();
              if (type === "photo") {
                await downloadFile(original, null, loading.progress.firstChild);
              } else {
                parsedString = await ajaxJson({ mode: "decrypto", hash: hex }, BACKHOST + "/homeliaisonCrypto", { equal: true });
                await downloadFile(original, parsedString.string.replace(/ /gi, "_") + "." + exe, loading.progress.firstChild);
              }
              loading.remove();
            }
            await instance.setPanBlocks();
          }
        } catch (e) {
          console.log(e);
          window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
        }
      }
    }
  });

  return buttonList;
}

ProjectDetailJs.prototype.insertGreenButtons = function () {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker } = GeneralJs;
  const { project, requestNumber, ea, baseTong, media, totalContents } = this;
  const greenButtonClassName = "greenButtonClassName";
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
  right = desktop ? 40 : 5.4;
  bottom = desktop ? 39 : 6;

  zIndex = 4;

  chatBaseWidth = <%% 140, 140, 140, 140, 28 %%>;
  chatBaseHeight = <%% 480, 480, 480, 480, 48 %%>;
  chatBaseBetween = <%% 16, 16, 16, 16, 2 %%>;

  buttonPadding = <%% 12, 12, 12, 10, 3.2 %%>;
  buttonHeight = <%% 36, 36, 36, 33, 6.8 %%>;
  buttonMarginTop = <%% 6, 6, 6, 6, 1 %%>;
  buttonBetween = <%% 6, 6, 6, 6, 1 %%>;

  buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isIphone() ? -0.1 : -0.3) %%>;
  buttonSize = <%% 14, 14, 14, 13, 2.6 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;

  basePadding = <%% 12, 12, 12, 10, 1.6 %%>;

  buttonBase = createNode({
    mother: totalContents,
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
      background: colorChip.white,
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

  setButtons = () => {
    buttonList = instance.returnButtonList();
    cleanChildren(buttonBase);
    for (let i = 0; i < buttonList.length; i++) {
      createNode({
        mother: buttonBase,
        class: [ greenButtonClassName ],
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
          background: colorChip.gray3,
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
              color: colorChip.deactive,
            }
          }
        ]
      });
    }
  };
  setButtons();

  instance.reloadGreenButtons();

}

ProjectDetailJs.prototype.reloadGreenButtons = function () {
  const instance = this;
  const greenButtonClassName = "greenButtonClassName";
  const { colorChip } = GeneralJs;
  let targets;

  targets = document.querySelectorAll('.' + greenButtonClassName);

  if (this.itemList.length > 0) {

    for (let dom of targets) {
      dom.style.background = colorChip.green;
      dom.firstChild.style.color = colorChip.white;
    }

  } else {

    for (let dom of targets) {
      dom.style.background = colorChip.gray3;
      dom.firstChild.style.color = colorChip.deactive;
    }

  }

}

ProjectDetailJs.prototype.uploadFiles = function (thisStatusNumber, photoBoo) {
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
  let thisKey;
  let thisTitle;

  serviceContents = this.panContents;
  thisKey = serviceContents[thisStatusNumber].key;
  thisTitle = serviceContents[thisStatusNumber].title;

  if (photoBoo) {
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
                const thisKey = this.getAttribute("name");
                const thisTitle = this.getAttribute("title");
                let thisFiles, formData, res;
                let removeTargets;
                let loading;
                let hash;

                thisFiles = [ ...this.files ];

                if (thisFiles.length >= 1) {
                  formData = new FormData();
                  formData.enctype = "multipart/form-data";
                  formData.append("proid", proid);
                  formData.append("desid", desid);
                  formData.append("client", client);
                  formData.append("type", "photo");
                  for (let i = 0; i < thisFiles.length; i++) {
                    formData.append("file_" + thisKey + "_" + String(i), thisFiles[i]);
                  }

                  loading = instance.mother.grayLoading();

                  ({ hash } = await ajaxJson({ mode: "crypto", string: String((new Date()).valueOf()) }, BACKHOST + "/homeliaisonCrypto", { equal: true }));
                  formData.append("name", hash);

                  res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                  await ajaxJson({ designer, desid, client, proid, title: thisTitle, mode: "client" }, BRIDGEHOST + "/middlePhotoAlarm");
                  window.alert(thisTitle + " 관련 파일 업로드가 완료되었습니다!");

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
            name: thisKey,
            title: thisTitle,
            multiple: "true",
            proid,
            desid,
            client: name,
            designer,
            accept: "image/*, application/pdf",
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
  } else {
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
                const thisKey = this.getAttribute("name");
                const thisTitle = this.getAttribute("title");
                let thisFiles, formData, res;
                let removeTargets;
                let loading;
                let hash;
                let rawResponse;

                thisFiles = [ ...this.files ];

                if (thisFiles.length >= 1) {
                  formData = new FormData();
                  formData.enctype = "multipart/form-data";
                  formData.append("proid", proid);
                  formData.append("desid", desid);
                  formData.append("client", client);
                  formData.append("type", "file");
                  formData.append("file_" + thisKey + "_" + String(0), thisFiles[0]);

                  rawResponse = null;
                  do {
                    rawResponse = await GeneralJs.prompt("파일에 대한 간단한 이름 또는 메모를 적어주세요! (예) 주방_시공의뢰서_1");
                  } while (typeof rawResponse !== "string" || rawResponse.trim() === '');
                  rawResponse = rawResponse.replace(/[\=\/\\\(\)\?\+\&]/gi, '').replace(/ /gi, '_');

                  loading = instance.mother.grayLoading();

                  ({ hash } = await ajaxJson({ mode: "crypto", string: rawResponse }, BACKHOST + "/homeliaisonCrypto", { equal: true }));
                  formData.append("name", hash);

                  res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                  await ajaxJson({ designer, desid, client, proid, title: thisTitle, mode: "client" }, BRIDGEHOST + "/middlePhotoAlarm");
                  window.alert(thisTitle + " 관련 파일 업로드가 완료되었습니다!");

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
            name: thisKey,
            title: thisTitle,
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

ProjectDetailJs.prototype.dropFiles = function (thisStatusNumber, photoBoo) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, removeByClass } = GeneralJs;
  const { project, requestNumber, ea, baseTong, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const fileInputClassName = "fileInputClassName";
  let serviceContents;
  let thisKey;
  let thisTitle;

  serviceContents = this.panContents;
  thisKey = serviceContents[thisStatusNumber].key;
  thisTitle = serviceContents[thisStatusNumber].title;

  if (photoBoo) {
    return async function (e) {
      try {

        e.preventDefault();
        e.stopPropagation();

        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        const name = this.getAttribute("name");
        const designer = this.getAttribute("designer");
        let input, changeEvent;

        removeByClass(fileInputClassName);

        changeEvent = async function (e) {
          try {
            const proid = this.getAttribute("proid");
            const desid = this.getAttribute("desid");
            const client = this.getAttribute("client");
            const designer = this.getAttribute("designer");
            const thisKey = this.getAttribute("name");
            const thisTitle = this.getAttribute("title");
            let thisFiles, formData, res;
            let removeTargets;
            let loading;
            let hash;

            thisFiles = [ ...this.files ].filter((file) => {
              return /^image/gi.test(file.type) || file.type.trim() === "application/pdf";
            });

            if (thisFiles.length >= 1) {
              formData = new FormData();
              formData.enctype = "multipart/form-data";
              formData.append("proid", proid);
              formData.append("desid", desid);
              formData.append("client", client);
              formData.append("type", "photo");
              for (let i = 0; i < thisFiles.length; i++) {
                formData.append("file_" + thisKey + "_" + String(i), thisFiles[i]);
              }

              loading = instance.mother.grayLoading();

              ({ hash } = await ajaxJson({ mode: "crypto", string: String((new Date()).valueOf()) }, BACKHOST + "/homeliaisonCrypto", { equal: true }));
              formData.append("name", hash);

              res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
              await ajaxJson({ designer, desid, client, proid, title: thisTitle, mode: "client" }, BRIDGEHOST + "/middlePhotoAlarm");
              window.alert(thisTitle + " 관련 파일 업로드가 완료되었습니다!");

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

        input = createNode({
          mother: document.body,
          class: [ fileInputClassName ],
          mode: "input",
          event: {
            change: changeEvent
          },
          attribute: {
            type: "file",
            name: thisKey,
            title: thisTitle,
            multiple: "true",
            proid,
            desid,
            client: name,
            designer,
            accept: "image/*, application/pdf",
          },
          style: {
            display: "none",
          }
        });
        input.files = e.dataTransfer.files;
        changeEvent.call(input, e);
        this.style.background = colorChip.gray0;

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }
  } else {
    return async function (e) {
      try {

        e.preventDefault();
        e.stopPropagation();

        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        const name = this.getAttribute("name");
        const designer = this.getAttribute("designer");
        let input, changeEvent;

        removeByClass(fileInputClassName);

        changeEvent = async function (e) {
          try {
            const proid = this.getAttribute("proid");
            const desid = this.getAttribute("desid");
            const client = this.getAttribute("client");
            const designer = this.getAttribute("designer");
            const thisKey = this.getAttribute("name");
            const thisTitle = this.getAttribute("title");
            let thisFiles, formData, res;
            let removeTargets;
            let loading;
            let hash;
            let rawResponse;

            thisFiles = [ ...this.files ];

            if (thisFiles.length >= 1) {
              formData = new FormData();
              formData.enctype = "multipart/form-data";
              formData.append("proid", proid);
              formData.append("desid", desid);
              formData.append("client", client);
              formData.append("type", "file");
              formData.append("file_" + thisKey + "_" + String(0), thisFiles[0]);

              rawResponse = null;
              do {
                rawResponse = await GeneralJs.prompt("파일에 대한 간단한 이름 또는 메모를 적어주세요! (예) 주방_시공의뢰서_1");
              } while (typeof rawResponse !== "string" || rawResponse.trim() === '');
              rawResponse = rawResponse.replace(/[\=\/\\\(\)\?\+\&]/gi, '').replace(/ /gi, '_');

              loading = instance.mother.grayLoading();

              ({ hash } = await ajaxJson({ mode: "crypto", string: rawResponse }, BACKHOST + "/homeliaisonCrypto", { equal: true }));
              formData.append("name", hash);

              res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
              await ajaxJson({ designer, desid, client, proid, title: thisTitle, mode: "client" }, BRIDGEHOST + "/middlePhotoAlarm");
              window.alert(thisTitle + " 관련 파일 업로드가 완료되었습니다!");

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

        input = createNode({
          mother: document.body,
          class: [ fileInputClassName ],
          mode: "input",
          event: {
            change: changeEvent
          },
          attribute: {
            type: "file",
            name: thisKey,
            title: thisTitle,
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
        input.files = e.dataTransfer.files;
        changeEvent.call(input, e);
        this.style.background = colorChip.gray0;

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }
  }


}

ProjectDetailJs.prototype.plusMemo = function (thisStatusNumber) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker } = GeneralJs;
  const { project, requestNumber, ea, baseTong, media, totalContents } = this;
  const memoFixedTargetsClassName = "memoFixedTargetsClassName";
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  let serviceContents;
  let thisKey;
  let thisTitle;
  let whitePromptWidth, whitePromptHeight;
  let whitePromptInnerPaddingTop;
  let whitePromptInnerPaddingLeft;
  let whitePromptInnerPaddingBottom;
  let titleArea, contentsArea;
  let cancelBack;
  let whitePrompt;
  let titleAreaHeight;
  let memoContents;
  let titleContentsBetween;
  let titleSize, titleWeight;
  let contentsSize, contentsWeight, contentsLineHeight;
  let memoJson;

  serviceContents = this.panContents;
  thisKey = serviceContents[thisStatusNumber].key;
  thisTitle = serviceContents[thisStatusNumber].title;

  whitePromptWidth = <%% 900, 800, 700, 600, 88 %%>;
  whitePromptHeight = <%% 492, 492, 492, 420, 120 %%>;

  whitePromptInnerPaddingLeft = <%% 44, 44, 40, 36, 6 %%>;
  whitePromptInnerPaddingTop = <%% 38, 38, 36, 32, 6 %%>;
  whitePromptInnerPaddingBottom = <%% 44, 44, 40, 36, 6 %%>;

  titleAreaHeight = <%% 40, 40, 38, 36, 7.5 %%>;

  titleContentsBetween = <%% 24, 24, 24, 16, 3.6 %%>;

  titleSize = <%% 21, 21, 20, 18, 4 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;

  contentsSize = <%% 14, 14, 14, 13, 2.8 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

  return async function (e) {
    try {
      const proid = this.getAttribute("proid");
      const desid = this.getAttribute("desid");
      const name = this.getAttribute("name");
      const designer = this.getAttribute("designer");
      const zIndex = 4;

      memoJson = await ajaxJson({
        mode: "get",
        proid: project.proid,
        desid: instance.designer.desid,
        key: thisKey,
        memo: "",
      }, SECONDHOST + "/projectDesignerMemo", { equal: true });

      memoContents = memoJson.contents.memo;

      cancelBack = createNode({
        mother: totalContents,
        class: [ memoFixedTargetsClassName ],
        event: {
          click: function (e) {
            const removeTargets = document.querySelectorAll('.' + memoFixedTargetsClassName);
            for (let dom of removeTargets) {
              dom.remove();
            }
          }
        },
        style: {
          display: "block",
          position: "fixed",
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(0),
          background: colorChip.realBlack,
          opacity: String(0.7),
          zIndex: String(zIndex),
        }
      });

      whitePrompt = createNode({
        mother: totalContents,
        class: [ memoFixedTargetsClassName ],
        style: {
          display: "block",
          position: "fixed",
          paddingLeft: String(whitePromptInnerPaddingLeft) + ea,
          paddingRight: String(whitePromptInnerPaddingLeft) + ea,
          paddingTop: String(whitePromptInnerPaddingTop) + ea,
          paddingBottom: String(whitePromptInnerPaddingBottom) + ea,
          width: String(whitePromptWidth - (whitePromptInnerPaddingLeft * 2)) + ea,
          height: String(whitePromptHeight - (whitePromptInnerPaddingTop + whitePromptInnerPaddingBottom)) + ea,
          top: "calc(calc(calc(calc(100% - " + String(instance.naviHeight) + "px" + ") / 2) - " + String(whitePromptHeight / 2) + ea + ") + " + String(instance.naviHeight) + "px" + ")",
          left: withOut(50, whitePromptWidth / 2, ea),
          background: colorChip.white,
          borderRadius: String(5) + "px",
          boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
          animation: "fadeuplite 0.3s ease forwards",
          zIndex: String(zIndex),
        }
      });

      titleArea = createNode({
        mother: whitePrompt,
        style: {
          display: "block",
          position: "relative",
          borderBottom: "1px solid " + colorChip.black,
          height: String(titleAreaHeight) + ea,
        },
        children: [
          {
            text: thisTitle + " 관련 MEMO",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(titleWeight),
              color: colorChip.black,
            }
          }
        ]
      });

      contentsArea = createNode({
        mother: whitePrompt,
        style: {
          display: "block",
          position: "relative",
          paddingTop: String(titleContentsBetween) + ea,
          width: withOut(0),
          height: withOut(titleAreaHeight + titleContentsBetween, ea),
          borderBottom: "1px solid " + colorChip.gray3,
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              overflow: "scroll",
              top: String(0),
              left: String(0),
              width: withOut(0),
              height: withOut(0),
            },
            children: [
              {
                mode: "textarea",
                text: memoContents,
                event: {
                  focus: function (e) {
                    this.style.color = colorChip.green;
                  },
                  blur: async function (e) {
                    try {
                      this.style.color = colorChip.black;
                      await ajaxJson({
                        mode: "update",
                        proid: project.proid,
                        desid: instance.designer.desid,
                        key: thisKey,
                        memo: this.value.trim(),
                      }, SECONDHOST + "/projectDesignerMemo");
                    } catch (e) {
                      console.log(e);
                    }
                  }
                },
                style: {
                  position: "relative",
                  fontSize: String(contentsSize) + ea,
                  fontWeight: String(contentsWeight),
                  color: colorChip.black,
                  lineHeight: String(contentsLineHeight),
                  width: withOut(0),
                  height: withOut(0),
                  outline: String(0),
                  border: String(0),
                  background: "transparent",
                }
              }
            ]
          }
        ]
      });


    } catch (e) {
      console.log(e);
    }
  }
}

ProjectDetailJs.prototype.insertFormStatusBox = async function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media, client, project } = this;
  const { proid, desid } = project;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray, findByAttribute, setQueue, serviceParsing } = GeneralJs;
  const siblingKeywords = "siblingKeywords__";
  const valueBlockClassName = "valueBlockClassName__";
  try {
    let margin;
    let paddingTop;
    let whiteBottomMargin;
    let titleFontSize;
    let bottomMargin;
    let whiteBlock;
    let grayTong;
    let contents;
    let innerMargin;
    let arrowWidth, arrowHeight;
    let textTop;
    let textSize, textWeight;
    let textMarginLeft;
    let mobileVisualPaddingValue;
    let button, buttons;
    let blockBetween;
    let blockBetweenBottom;
    let blockHeight;
    let lineTop;
    let columnsNumber;
    let textFileWeight;
    let whitePadding;
    let smallSize, smallWeight, smallBetween;
    let textTextTop;
    let smallTextTop;
    let panDom;
    let veryBigSize;
    let veryBigWeight;
    let firstWidth;
    let buttonWidth, buttonHeight;
    let buttonOuterPadding, buttonInnerMargin;
    let descriptionBetween;
    let panWidth, panVisualLeft;
    let veryBigTextTop;
    let circleWidth, circleTop, circleLeft;
    let subButtonWidth;
    let thirdWidth;
    let imageBoxVisualPaddingBottom;
    let imageBetween;
    let panBoxBetween;
    let wordingPaddingTop0, wordingPaddingTop1;
    let mainTong;
    let wordingBoxWidth;
    let contentsTong;
    let contentsTongPaddingBottom;
    let bigTextSize;
    let bigTextWeight;
    let bigTextTextTop;
    let clock;
    let formPanBase;
    let thisPan;
    let panBetween;
    let panHeight, panInnerMargin;
    let panCheckBoxWidth;
    let panWhitePaddingLeft;
    let panBlockBetween, panBlockBigBetween;
    let buttonSize, buttonWeight, buttonTextTop;
    let panPaddingTop;
    let panTitleSize, panTitleWeight;
    let formPanBaseMarginBottom;
    let checkBoxWidth;
    let blockTextSize, blockTextWeight;
    let siblings;
    let thisForm;
    let colorArr;
    let barArrBase;
    let barArrBlock;
    let barArrBlockValuesBase;
    let childrenMaxNumber;
    let thisValueNumber;
    let reloadBarArr;
    let barBaseHeight, barFactorHeight, barFactorBetween;
    let barFirstWidth;
    let barArrBasePaddingTop;
    let barArrBaseMarginTop;
    let barArrTitleTextTop;
    let reloadMainButtons;
    let valueIndex;
    let finalValueNumber;
    let percentageSize;
    let percentageTextTop;
    let formPanBasePaddingBottom;
    let whiteTong;

    bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
    margin = <%% 55, 55, 47, 39, 6 %%>;
    paddingTop = <%% 44, 44, 36, 34, 5.4 %%>;
  
    whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;
  
    titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  
    bigTextSize = <%% 36, 36, 36, 36, 4.4 %%>;
    bigTextWeight = <%% 100, 100, 100, 100, 100 %%>;
    bigTextTextTop = <%% (isMac() ? -7 : -5), (isMac() ? -7 : -5), -7, -7, -1 %%>;
  
    veryBigSize = <%% 23, 21, 20, 16, 4.4 %%>;
    veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
    veryBigTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -2 : 0), (isMac() ? -1 : 0), -1 %%>;
  
    innerMargin = <%% 0, 0, 0, 0, 1 %%>;
  
    textTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;
    smallTextTop = <%% (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), 0 %%>;
  
    textSize = <%% 14, 14, 13, 12, 3.2 %%>;
    textWeight = <%% 700, 700, 700, 700, 700 %%>;
    textFileWeight = <%% 400, 400, 400, 400, 400 %%>;
  
    whitePadding = <%% 12, 12, 8, 8, 2.2 %%>;
  
    blockBetween = <%% 36, 28, 26, 24, 5 %%>;
    blockBetweenBottom = <%% 10, 4, 4, 4, 2.2 %%>;
    blockHeight = <%% 36, 36, 32, 26, 4 %%>;
  
    lineTop = <%% 18, 18, 16, 13, 1.9 %%>;
  
    firstWidth = <%% 298, 230, 213, 142, 300 %%>;
  
    panWidth = <%% 20, 20, 20, 20, 2 %%>;
    panVisualLeft = <%% 1, 1, 1, 1, 1 %%>;
  
    circleWidth = <%% 5, 5, 5, 4, 0.8 %%>;
    circleTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 1.2 %%>;
    circleLeft = <%% -7, -7, -7, -5, -0.8 %%>;
  
    arrowWidth = <%% 18, 16, 15, 14, 3.6 %%>;
    arrowHeight = <%% 8, 8, 8, 7, 2 %%>;
  
    subButtonWidth = <%% 90, 72, 72, 64, 16 %%>;
  
    mobileVisualPaddingValue = 0.2;
  
    thirdWidth = <%% 240, 0, 0, 0, 0 %%>;
  
    imageBoxVisualPaddingBottom = <%% 4, 2, 2, 2, 0 %%>;
    imageBetween = <%% 32, 16, 12, 12, 6 %%>;
    panBoxBetween = <%% 12, 32, 26, 24, 12 %%>;
  
    wordingPaddingTop0 = <%% 300, 213, 213, 213, 213 %%>;
    wordingPaddingTop1 = <%% 309, 243, 243, 243, 243 %%>;
  
    wordingBoxWidth = <%% 175, 185, 175, 115, 175 %%>;
  
    contentsTongPaddingBottom = <%% 15, 15, 15, 15, 5 %%>;
    panBetween = <%% 28, 28, 24, 20, 2 %%>;
  
    panHeight = <%% 48, 48, 45, 42, 11 %%>;
    panInnerMargin = <%% 4, 4, 4, 3, 1 %%>;
  
    panCheckBoxWidth = <%% 32, 24, 20, 20, 8 %%>;
    checkBoxWidth = <%% 13, 11, 9, 9, 3 %%>;
  
    panWhitePaddingLeft = <%% 16, 14, 14, 12, 3.5 %%>; 
    panBlockBetween = <%% 8, 8, 6, 5, 1 %%>; 
    panBlockBigBetween = <%% 8, 8, 6, 5, 1 %%>; 
  
    buttonWidth = <%% 100, 80, 70, 60, 20 %%>;
    buttonHeight = <%% 36, 28, 26, 24, 7.8 %%>;
  
    buttonSize = <%% 15, 13, 12, 11, 3.2 %%>;
    buttonWeight = <%% 800, 800, 800, 800, 800 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;
  
    panPaddingTop = <%% 22, 18, 14, 14, 4 %%>;
  
    panTitleSize = <%% 16, 15, 14, 13, 3.8 %%>;
    panTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  
    formPanBaseMarginBottom = <%% 12, 8, 6, 6, 4 %%>;
  
    blockTextSize = <%% 14, 13, 12, 11, 3.2 %%>;
    blockTextWeight = <%% 600, 600, 600, 600, 600 %%>;
  
    barBaseHeight = <%% 40, 36, 32, 28, 6.8 %%>;
    barFirstWidth = <%% 70, 60, 50, 42, 14 %%>;
    barFactorHeight = <%% 20, 20, 18, 16, 5 %%>;
    barFactorBetween = <%% 0, 0, 0, 0, 0 %%>;

    barArrBasePaddingTop = <%% 36, 32, 28, 25, 8 %%>;
    barArrBaseMarginTop = <%% 48, 46, 40, 32, 9.5 %%>;

    barArrTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

    percentageSize = <%% 20, 20, 17, 14, 7.5 %%>;
    percentageTextTop = <%% -1, -1, -1, -1, 0 %%>;

    formPanBasePaddingBottom = <%% 16, 14, 12, 8, 2 %%>;

    thisForm = await ajaxJson({ mode: "get", proid, desid }, SECONDHOST + "/projectDesignerStatus", { equal: true });
  
    contents = {
      title: [
        project.name + "님의",
        "프로젝트 진행율"
      ],
      description: [
        "고객님의 프로젝트 진행 상황을 알려드립니다.",
        "문제가 있는 부분이 있다면 홈리에종에 연락 주세요!",
      ],
      form: thisForm,
      button: "공유하기",
    };

    colorArr = [
      colorChip.gradientGreen,
    ];
  
    reloadMainButtons = () => {};
    formPanBase = {};

    reloadBarArr = () => {};
    barArrBase = {};

    whiteBlock = createNode({
      mother: baseTong,
      style: {
        position: "relative",
        borderRadius: String(desktop ? 8 : 1) + ea,
        width: String(100) + '%',
        background: colorChip.white,
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(desktop ? whiteBottomMargin - blockBetweenBottom : 6.6) + ea,
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
        paddingBottom: String(desktop ? innerMargin : 0) + ea,
        paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
        paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
        width: withOut(innerMargin * 2, ea),
        background: colorChip.white,
        borderRadius: String(8) + "px",
      }
    });
  
    mainTong = createNode({
      mother: grayTong,
      style: {
        display: desktop ? "flex" : "block",
        width: withOut(0),
        flexDirection: desktop ? "row" : "",
        justifyContent: desktop ? "start" : "",
        alignItems: desktop ? "start" : "",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: desktop ? String(firstWidth) + ea : withOut(0, ea),
            verticalAlign: "top",
            justifyContent: desktop ? "" : "center",
            alignItems: desktop ? "" : "center",
            marginTop: desktop ? "" : String(2.8) + ea,
            marginBottom: desktop ? "" : String(3) + ea,
          },
          children: [
            {
              text: contents.title.join(desktop ? "\n" : " "),
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(veryBigSize) + ea,
                fontWeight: String(veryBigWeight),
                color: colorChip.black,
                lineHeight: String(1.5),
                top: desktop ? String(veryBigTextTop) + ea : "",
              },
              child: {
                style: {
                  display: "inline-block",
                  position: "absolute",
                  top: String(circleTop) + ea,
                  left: String(circleLeft) + ea,
                  width: String(circleWidth) + ea,
                  height: String(circleWidth) + ea,
                  borderRadius: String(circleWidth) + ea,
                  background: colorChip.gray4,
                }
              }
            }
          ]
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: desktop ? withOut(firstWidth, ea) : withOut(0, ea),
            verticalAlign: "top",
            flexDirection: "column",
          }
        }
      ]
    });
  
    contentsTong = mainTong.children[1];
  
    clock = createNode({
      mother: contentsTong,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        width: withOut(0),
        paddingBottom: String(contentsTongPaddingBottom) + ea,
        borderBottom: desktop ? "1px dashed " + colorChip.gray3 : "",
        justifyContent: desktop ? "" : "center",
        alignItems: desktop ? "" : "center",
      },
      children: [
        {
          text: contents.description.join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(textSize) + ea,
            fontWeight: String(textFileWeight),
            color: colorChip.black,
            lineHeight: String(1.6),
            textAlign: desktop ? "" : "center",
          },
          bold: {
            fontSize: String(textSize) + ea,
            fontWeight: String(800),
            color: colorChip.green,
            lineHeight: String(1.6),
          },
          under: {
            fontSize: String(textSize) + ea,
            fontWeight: String(800),
            color: colorChip.black,
            lineHeight: String(1.6),
          }
        },
        {
          text: dateToString(new Date(), true).slice(0, -3),
          style: {
            display: (media[0] || media[1]) ? "inline-block" : "none",
            position: "absolute",
            right: String(0),
            top: String(bigTextTextTop) + ea,
            fontSize: String(bigTextSize) + ea,
            fontWeight: String(bigTextWeight),
            color: colorChip.deactive,
          }
        }
      ]
    }).children[1];
  
    if (media[0] || media[1]) {
      setInterval(() => {
        clock.textContent = dateToString(new Date(), true).slice(0, -3);
      }, 60 * 1000);
    }
  
    if (desktop) {
  
      barArrBase = createNode({
        mother: contentsTong,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "column",
          width: withOut(0),
          justifyContent: "start",
          alignItems: "start",
          paddingTop: String(barArrBasePaddingTop) + ea,
        }
      });

      formPanBase = createNode({
        mother: contentsTong,
        style: {
          display: (media[0] || media[4] ? "flex" : "block"),
          position: "relative",
          flexDirection: desktop ? "row" : "column",
          width: withOut(0),
          justifyContent: "start",
          alignItems: "start",
          paddingBottom: String(formPanBasePaddingBottom) + ea,
        },
      });

    } else {

      barArrBase = createNode({
        mother: contentsTong,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "column",
          width: withOut(0),
          justifyContent: "start",
          alignItems: "start",
          paddingBottom: String(3) + ea,
        }
      });

      formPanBase = createNode({
        mother: contentsTong,
        style: {
          display: "none",
          position: "relative",
          flexDirection: desktop ? "row" : "column",
          width: withOut(0),
          justifyContent: "start",
          alignItems: "start",
          paddingBottom: desktop ? "" : String(18) + ea,
          borderTop: "1px dashed " + colorChip.gray3,
          paddingTop: String(2) + ea,
        },
      });

    }

    reloadMainButtons = (formPanBase, thisForm) => {
      cleanChildren(formPanBase);
      for (let i = 0; i < thisForm.length; i++) {
  
        thisPan = createNode({
          mother: formPanBase,
          attribute: {
            index: String(i),
          },
          style: {
            display: "inline-flex",
            position: "relative",
            flexDirection: "column",
            width: desktop ? (media[0] ? "calc(calc(100% - " + String(panBetween * (thisForm.length - 1)) + ea + ") / " + String(thisForm.length) + ")" : "calc(calc(100% - " + String(panBetween * ((thisForm.length / 2) - 1)) + ea + ") / " + String(thisForm.length / 2) + ")") : withOut(0, ea),
            marginRight: desktop ? (media[0] ? (i === thisForm.length - 1 ? "" : String(panBetween) + ea) : (i === thisForm.length - 1 || i === (thisForm.length / 2) - 1 ? "" : String(panBetween) + ea)) : "",
            paddingTop: String(panPaddingTop) + ea,
            verticalAlign: "top",
          }
        });
    
        createNode({
          mother: thisPan,
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: withOut(0, ea),
            height: String(panHeight) + ea,
          },
          child: {
            text: thisForm[i].title,
            style: {
              fontSize: String(panTitleSize) + ea,
              fontWeight: String(panTitleWeight),
              color: thisForm[i].children.every((obj) => { return obj.deactive === true }) ? colorChip.deactive : colorChip.black,
            }
          }
        });
  
        valueIndex = thisForm[i].children.reduce((acc, curr, index) => {
          if (curr.value === 0) {
            return acc;
          } else {
            return index;
          }
        }, -1);

        for (let j = 0; j < thisForm[i].children.length; j++) {
          createNode({
            mother: thisPan,
            class: [ valueBlockClassName, siblingKeywords + String(i) ],
            attribute: {
              toggle: thisForm[i].children[j].value === 0 ? "off" : "on",
              x: String(i),
              y: String(j),
              mother: thisForm[i].title,
              title: thisForm[i].children[j].title,
              deactive: thisForm[i].children[j].deactive ? "true" : "false",
              proid,
              desid,
              red: thisForm[i].children[j].value !== 0 ? "off" : (j < valueIndex ? "on" : "off"),
              middle: thisForm[i].children[j].value === 0 ? "off" : (j < valueIndex ? "on" : "off"),
            },
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: withOut(0, ea),
              height: String(panHeight) + ea,
              background: j > valueIndex ? colorChip.gray1 : (j === valueIndex ? colorChip.gradientGreen : (thisForm[i].children[j].value !== 0 ? colorChip.whiteGreen : colorChip.gray1)),
              borderRadius: String(5) + "px",
              marginBottom: j === thisForm[i].children.length - 1 ? "" : String(panBlockBetween) + ea,
              flexDirection: "row",
              cursor: "pointer",
              transition: "all 0s ease",
            },
            children: [
              {
                style: {
                  width: String(panCheckBoxWidth) + ea,
                  marginRight: String(panInnerMargin) + ea,
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: withOut(panInnerMargin * 2, ea),
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "all 0s ease",
                },
                child: {
                  mode: "svg",
                  source: svgMaker.checkBox(j > valueIndex ? colorChip.gray4 : (j === valueIndex ? colorChip.white : (thisForm[i].children[j].value !== 0 ? colorChip.green : colorChip.red))),
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(checkBoxWidth) + ea,
                    transition: "all 0s ease",
                  }
                }
              },
              {
                style: {
                  width: withOut(panCheckBoxWidth + (panInnerMargin * 3) + panWhitePaddingLeft, ea),
                  height: withOut(panInnerMargin * 2, ea),
                  background: thisForm[i].children[j].deactive ? colorChip.gray2 : colorChip.white,
                  borderRadius: String(5) + "px",
                  display: "inline-flex",
                  justifyContent: "start",
                  alignItems: "center",
                  paddingLeft: String(panWhitePaddingLeft) + ea,
                  transition: "all 0s ease",
                },
                child: {
                  text: thisForm[i].children[j].title,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(blockTextSize) + ea,
                    fontWeight: String(blockTextWeight),
                    color: thisForm[i].children[j].deactive ? colorChip.deactive : (j > valueIndex ? colorChip.deactive : (j === valueIndex ? colorChip.black : (thisForm[i].children[j].value !== 0 ? colorChip.softGreen : colorChip.red))),
                    top: String(textTextTop) + ea,
                    transition: "all 0s ease",
                  }
                }
              }
            ]
          });
        }
      }

      if (mobile) {
        createNode({
          mother: formPanBase,
          event: {
            click: function (e) {
              formPanBase.style.display = "none";
              barArrBase.style.paddingBottom = String(3) + ea;
              barArrBase.lastChild.style.display = "inline-flex";
            }
          },
          style: {
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGray,
            bottom: String(0),
            right: desktop ? String(0) : withOut(50, buttonWidth / 2, ea),
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            cursor: "pointer",
          },
          child: {
            text: "간단히 보기",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(buttonSize) + ea,
              fontWeight: String(buttonWeight),
              top: String(buttonTextTop) + ea,
              color: colorChip.white,
              cursor: "pointer",
            }
          }
        });
      }

    }

    reloadBarArr = (barArrBase, thisForm) => {

      cleanChildren(barArrBase);

      childrenMaxNumber = thisForm.reduce((acc, curr) => {
        return acc + curr.children.filter((obj) => { return obj.deactive !== true }).length;
      }, 0);
  
      finalValueNumber = 0;
      for (let i = 0; i < thisForm.length; i++) {
        thisValueNumber = thisForm[i].children.filter((obj) => { return obj.value !== 0 }).length;
        finalValueNumber = thisValueNumber + finalValueNumber;
      }

      barArrBlock = createNode({
        mother: barArrBase,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: desktop ? "row" : "column",
          justifyContent: "start",
          alignItems: "center",
          width: withOut(0),
          height: desktop ? String(barBaseHeight) + ea : "",
        }
      });

      createNode({
        mother: barArrBlock,
        style: {
          display: "flex",
          position: "relative",
          width: desktop ? String(barFirstWidth) + ea : "",
          height: withOut(0, ea),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          marginBottom: desktop ? "" : String(2) + ea,
        },
        child: {
          text: String(Math.round((finalValueNumber / childrenMaxNumber) * 100)) + "<b%%%b>",
          style: {
            fontSize: String(percentageSize) + ea,
            fontWeight: String(500),
            fontFamily: "graphik",
            color: colorChip.black,
            position: "relative",
            top: String(percentageTextTop) + ea,
          },
          bold: {
            fontSize: String(percentageSize) + ea,
            fontWeight: String(500),
            fontFamily: "graphik",
            color: colorChip.softGreen,
          }
        }
      })

      barArrBlockValuesBase = createNode({
        mother: barArrBlock,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          width: desktop ? withOut(barFirstWidth, ea) : withOut(0, ea),
          height: String(barFactorHeight) + ea,
          borderRadius: String(5) + "px",
          overflow: "hidden",
        },
        child: {
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: withOut(0),
            height: withOut(0),
            background: colorChip.gradientGreen,
          }
        }
      });

      for (let j = 0; j < childrenMaxNumber; j++) {
  
        createNode({
          mother: barArrBlockValuesBase,
          style: {
            display: "inline-block",
            position: "relative",
            height: String(barFactorHeight) + ea,
            width: "calc(calc(100% - " + String(barFactorBetween * (childrenMaxNumber - 1)) + ea + ") / " + String(childrenMaxNumber) + ")",
            background: j < finalValueNumber ? "transparent" : colorChip.gray2,
            marginRight: j !== childrenMaxNumber - 1 ? String(barFactorBetween) + ea : "",
          }
        });

      }

      if (mobile) {
        createNode({
          mother: barArrBase,
          event: {
            click: function (e) {
              this.style.display = "none";
              formPanBase.style.display = "block";
              barArrBase.style.paddingBottom = String(11) + ea;
            }
          },
          style: {
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGray,
            left: desktop ? String(0) : withOut(50, buttonWidth / 2, ea),
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            cursor: "pointer",
            marginTop: String(5.6) + ea,
          },
          child: {
            text: "상세 보기",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(buttonSize) + ea,
              fontWeight: String(buttonWeight),
              top: String(buttonTextTop) + ea,
              color: colorChip.white,
              cursor: "pointer",
            }
          }
        });
      }

    }

    reloadMainButtons(formPanBase, thisForm);
    reloadBarArr(barArrBase, thisForm);
  
  } catch (e) {
    console.log(e);
  }
}

ProjectDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, setQueue } = GeneralJs;
    const getObj = returnGet();
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let desid, designers, designer;
    let requestNumber;
    let service;
    let key;

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
    this.panContents = this.contents.map((obj) => { return obj.children }).flat();

    this.hashConst = "homeliaisonHash";
    this.targetKeywords = "/photo/designer";
    this.targetHref = BRIDGEHOST.replace(/\:3000/gi, '') + this.targetKeywords + "/" + this.designer.desid + "/" + this.project.proid;
    this.targetDrive = "/" + this.designer.desid + "/" + this.project.proid;
    this.panList = [];
    this.itemList = [];
    this.panNumbers = [];

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "projectDetail",
      client: this.client,
      base: {
        instance: this,
        binaryPath: ProjectDetailJs.binaryPath,
        subTitle: (this.client.name + " 고객님 프로젝트 상세"),
        secondBackground: false,
        backgroundType: 0,
        talk: {
          text: "",
          event: "channel",
        }
      },
      local: async () => {
        try {
          instance.insertInitBox();


          // past version

          instance.insertNumbersBox();
          instance.insertUploadBox();

          // dev - new version
          // await instance.insertFormStatusBox();
          // if (getObj.mode === "schedule") {
          //   await instance.insertScheduleBox();
          //   instance.insertUploadBox();
          // } else {
          //   instance.insertUploadBox();
          //   await instance.insertScheduleBox();
          // }
          
          instance.insertInformationBox();
          instance.insertGreenButtons();


          if (getObj.mode === "schedule") {
            setQueue(() => {
              GeneralJs.scrollTo(window, instance.baseTong.children[2], (!instance.media[4] ? 72 : 60));
            }, 500);
          }

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ProjectDetailJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ProjectDetailJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
