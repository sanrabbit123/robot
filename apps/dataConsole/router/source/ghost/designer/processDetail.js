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

ProcessDetailJs.binaryPath = FRONTHOST + "/middle/console/first";

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

ProcessDetailJs.prototype.insertNumbersBox = function () {
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

ProcessDetailJs.prototype.reloadNumbers = function (itemList) {
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

ProcessDetailJs.prototype.insertUploadBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainTitle = "프로젝트 파일";
  const uploadIconClassName = "uploadIconClassName";
  const memoIconClassName = "memoIconClassName";
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

  contentsWordingSize = <%% 15, 15, 14, 13, 2.9 %%>;
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
  panTitleBoxWidth = <%% 124, 120, 114, 108, 21 %%>;
  panTitleBoxHeight = <%% 52, 48, 45, 40, 8.2 %%>;

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
  subButtonPaddingTop = <%% (isMac() ? 4 : 6), (isMac() ? 4 : 6), (isMac() ? 4 : 6), (isMac() ? 3 : 5), (isIphone() ? 1.2 : 1.2) %%>;
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
          this.style.background = colorChip.gray1;
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

    createNode({
      mother: basePan,
      class: [ uploadIconClassName ],
      attribute: {
        index: String(i),
        key: this.panContents[i].key,
        proid: project.proid,
        desid: instance.designer.desid,
        name: project.name,
        designer: instance.designer.designer,
      },
      event: {
        click: (this.panContents[i].type === "link" ? instance.uploadLink(i) : instance.uploadFiles(i, (this.panContents[i].type === "photo"))),
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

    createNode({
      mother: basePan,
      class: [ memoIconClassName ],
      attribute: {
        index: String(i),
        key: this.panContents[i].key,
        proid: project.proid,
        desid: instance.designer.desid,
        name: project.name,
        designer: instance.designer.designer,
      },
      event: {
        click: instance.plusMemo(i),
      },
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: String(uploadCircleWidth) + ea,
        height: String(uploadCircleWidth) + ea,
        position: "absolute",
        bottom: String(uploadCirclePadding) + ea,
        right: String((uploadCirclePadding + uploadCircleWidth) + buttonBetween) + ea,
        borderRadius: String(uploadCircleWidth) + ea,
        background: colorChip.gradientGray,
        cursor: "pointer",
      },
      children: [
        {
          mode: "svg",
          source: instance.mother.returnPlus(colorChip.white),
          style: {
            display: "inline-block",
            position: "relative",
            top: String(plusIconTop) + ea,
            width: String(plusIconWidth) + ea,
          }
        }
      ]
    });

    this.panList.push(contentsPan);
  }

  this.setPanBlocks().catch((err) => { console.log(err) });

  return whiteBlock;
}

ProcessDetailJs.prototype.insertScheduleBox = async function () {
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
    return `${String(dateObject.getFullYear()).slice(2)}년 ${String(dateObject.getMonth() + 1)}월 ${String(dateObject.getDate())}일`;
  }
  const hangulToDate = (hangul) => {
    hangul = hangul.replace(/ /gi, '');
    const [ year, month, date ] = hangul.split(/[가-힣]/gi);
    return new Date(2000 + Number(year), Number(month) - 1, Number(date));
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
                tempObj.date.start = hangulToDate(childrenTarget[i].textContent);
              } else if (i === 4) {
                tempObj.date.end = hangulToDate(childrenTarget[i].textContent);
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
            draggable: "true",
            index: String(i),
          },
          class: [ dragElementClassName ],
          id: dragElementClassName + "_" + uniqueValue("hex"),
          event: {
            selectstart: (e) => {
              e.preventDefault();
            },
            dragstart: function (e) {
              this.style.height = String(0);
              this.style.opacity = String(0);
              this.style.marginBottom = String(0);
              e.dataTransfer.setData("dragData", this.id);
            },
            dragend: function (e) {
              this.style.height = String(panTitleBoxHeight) + ea;
              this.style.opacity = String(1);
              this.style.marginBottom = String(itemBetween) + ea;
              e.preventDefault();
            },
            dragenter: function (e) {
              this.style.paddingBottom = String(panTitleBoxHeight) + ea;
              e.preventDefault();
            },
            dragleave: function (e) {
              this.style.paddingBottom = String(0) + ea;
              e.preventDefault();
            },
            dragover: function (e) {
              e.preventDefault();
            },
            drop: updateOrderValue(),
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
              event: {
                click: updateTextValue(1, widthRatio0, contentsWordingWeight),
                contextmenu: contextMenuValue(1),
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
            event: {
              click: updateTextValue(2, widthRatio1, contentsWordingContentsWeight),
              contextmenu: contextMenuValue(2),
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
            event: {
              click: updateDateValue(3),
              contextmenu: contextMenuValue(3),
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
            event: {
              click: updateDateValue(4),
              contextmenu: contextMenuValue(4),
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
            event: {
              click: updateDateMobileValue(),
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
            event: {
              click: updateTextValue(3, 100, contentsWordingContentsWeight),
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

      createNode({
        mother: panMother,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(buttonTongHeight) + ea,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: desktop ? "end" : "center",
          paddingTop: String(buttonTongPaddingTop) + ea,
        },
        children: [
          {
            event: {
              click: async function (e) {
                try {
                  const host = FRONTHOST.replace(/^https\:\/\//gi, '');
                  const path = "project";
                  if (window.confirm(instance.client.name + " 고객님께 일정 알림톡을 보낼까요?")) {
                    await ajaxJson({
                      method: "scheduleClient",
                      name: instance.client.name,
                      phone: instance.client.phone,
                      option: {
                        client: instance.client.name,
                        host: host,
                        proid: instance.project.proid,
                      }
                    }, BACKHOST + "/alimTalk");
                    window.alert(instance.client.name + " 고객님에게 일정 알림톡을 전송하였습니다!");
                  }
                } catch (e) {
                  console.log(e);
                }
              }
            },
            style: {
              display: "inline-flex",
              height: String(buttonHeight) + ea,
              background: desktop ? colorChip.gradientGreen : colorChip.gradientGray,
              borderRadius: String(5) + "px",
              marginRight: String(buttonBetween) + ea,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: String(buttonPadding) + ea,
              paddingRight: String(buttonPadding) + ea,
              cursor: "pointer",
            },
            child: {
              text: "고객에게 일정표 알림 보내기",
              style: {
                display: "block",
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
                color: colorChip.white,
                position: "relative",
                top: String(buttonTextTop) + ea,
              }
            }
          },
          {
            event: {
              click: async function (e) {
                try {
                  let newContents;
                  if (window.confirm("일정을 초기화 하시겠습니까?")) {
                    await ajaxJson({
                      mode: "delete",
                      proid: project.proid,
                      desid: instance.designer.desid,
                    }, SECONDHOST + "/projectDesignerSchedule");
                    newContents = equalJson(JSON.stringify(originalContents));
                    await ajaxJson({ mode: "create", proid: project.proid, desid: instance.designer.desid, schedule: newContents.schedule }, SECONDHOST + "/projectDesignerSchedule");
                    setScheduleContents(newContents);
                  }
                } catch (e) {
                  console.log(e);
                }
              }
            },
            style: {
              display: "inline-flex",
              height: String(buttonHeight) + ea,
              background: desktop ? colorChip.gradientGreen : colorChip.gradientGray,
              borderRadius: String(5) + "px",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: String(buttonPadding) + ea,
              paddingRight: String(buttonPadding) + ea,
              cursor: "pointer",
            },
            child: {
              text: "전체 일정 초기화",
              style: {
                display: "block",
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
                color: colorChip.white,
                position: "relative",
                top: String(buttonTextTop) + ea,
              }
            }
          },
        ]
      });

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

ProcessDetailJs.prototype.insertControlBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project, contentsRawInfo, totalContents, requestNumber } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const manyBig = media[0];
  const generalSmall = !manyBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, ajaxForm, serviceParsing, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, downloadFile, blankHref, removeByClass, equalJson, svgMaker } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainTitle = "프로젝트 상태";
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
  let panMotherBetween;
  let contents;
  let buttonSize, buttonWeight, buttonTextTop;
  let buttonHeight;
  let paymentByCard;
  let downloadOriginal;
  let viewPortfolio;
  let viewReview;
  let designerRawContentsUpload;
  let designerSampleDownload;
  let designerRawContentsView;

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

  contentsWordingSize = <%% 15, 15, 14, 13, 2.9 %%>;
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
  panTitleBoxWidth = <%% 124, 120, 114, 108, 21 %%>;
  panTitleBoxHeight = <%% 52, 48, 45, 40, 8.2 %%>;

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
  subButtonPaddingTop = <%% (isMac() ? 4 : 6), (isMac() ? 4 : 6), (isMac() ? 4 : 6), (isMac() ? 3 : 5), (isIphone() ? 1.2 : 1.2) %%>;
  subButtonPaddingLeft = <%% 11, 11, 10, 9, 2 %%>;
  subButtonsVisualTop = <%% 2, 3, 3, 1, 0 %%>;

  subButtonsBetween = <%% 18, 18, 16, 14, 3 %%>;

  panMotherBetween = <%% 8, 7, 6, 5, 1 %%>;

  buttonHeight = <%% 42, 42, 38, 34, 7.5 %%>;
  buttonBetween = <%% 4, 4, 3, 2, 0.8 %%>;
  buttonSize = <%% 14, 14, 13, 12, 2.7 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
  buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  paymentByCard = instance.paymentByCard();

  downloadOriginal = (project) => {
    return async function (e) {
      try {
        const { link } = instance.contentsRawInfo.raw;
        let loading;
        if (link.trim() === '') {
          window.alert("원본 파일이 없습니다!");
        } else {
          loading = instance.mother.whiteProgressLoading();
          await downloadFile(link, null, loading.progress.firstChild);
          loading.remove();
      }
      } catch (e) {
        console.log(e);
      }
    }
  }

  viewPortfolio = (project) => {
    return async function (e) {
      try {
        const { link } = instance.contentsRawInfo.portfolio;
        if (link.trim() === '') {
          window.alert("포트폴리오가 발행되지 않았습니다!");
        } else {
          await blankHref(link);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  viewReview = (project) => {
    return async function (e) {
      try {
        const { link } = instance.contentsRawInfo.review;
        if (link.trim() === '') {
          window.alert("고객 후기가 발행되지 않았습니다!");
        } else {
          await blankHref(link);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  designerSampleDownload = (project) => {
    return async function (e) {
      try {
        const loading = instance.mother.whiteProgressLoading();
        await downloadFile(S3HOST + "/photo/sample/commentsSample.docx", null, loading.progress.firstChild);
        loading.remove();
      } catch (e) {
        console.log(e);
      }
    }
  }

  designerRawContentsUpload = (project) => {
    return instance.insertRawUploadBox();
  }

  designerRawContentsView = (project) => {
    return instance.insertRawContentsBox();
  }

  if (manyBig) {

    contents = {
      left: [
        {
          title: "촬영 상태",
          children: [
            {
              title: "촬영 컨택",
              target: (project) => {
                let boo;
                boo = true;
                if (/확정/gi.test(project.contents.photo.status)) {
                  boo = false;
                } else if (/완료/gi.test(project.contents.photo.status) || /없음/gi.test(project.contents.photo.status)) {
                  boo = false;
                }
                return boo;
              },
            },
            {
              title: "촬영 일정 확정",
              target: (project) => {
                return /확정/gi.test(project.contents.photo.status);
              },
            },
            {
              title: "촬영 완료",
              target: (project) => {
                return (/완료/gi.test(project.contents.photo.status) || /없음/gi.test(project.contents.photo.status));
              },
            },
          ]
        },
        {
          title: "촬영비 상태",
          children: [
            {
              title: "촬영비 결제 대기",
              target: (project) => {
                return /대기/gi.test(project.contents.payment.status);
              },
            },
            {
              title: "촬영비 결제 완료",
              target: (project) => {
                return /결제 완료/gi.test(project.contents.payment.status);
              },
            },
            {
              title: "촬영비 해당 없음",
              target: (project) => {
                return (/무료/gi.test(project.contents.payment.status) || /없음/gi.test(project.contents.payment.status) || /환불/gi.test(project.contents.payment.status));
              },
            },
          ]
        },
        {
          title: "디자이너 글",
          children: [
            {
              title: "디자이너 글 대기",
              target: (project) => {
                return !(/수집 완료/gi.test(project.contents.raw.portfolio.status) || /편집중/gi.test(project.contents.raw.portfolio.status) || /편집 완료/gi.test(project.contents.raw.portfolio.status));
              },
            },
            {
              title: "디자이너 글 완료",
              target: (project) => {
                return (/수집 완료/gi.test(project.contents.raw.portfolio.status) || /편집중/gi.test(project.contents.raw.portfolio.status) || /편집 완료/gi.test(project.contents.raw.portfolio.status));
              },
            },
          ]
        },
      ],
      right: [
        {
          title: "촬영비 관련",
          children: [
            {
              title: "촬영비 카드 결제",
              active: (project) => {
                return /대기/gi.test(project.contents.payment.status);
              },
              click: paymentByCard,
            },
            {
              title: "촬영비 계좌 이체",
              active: (project) => {
                return /대기/gi.test(project.contents.payment.status);
              },
              click: instance.paymentByAccount(),
            },
          ]
        },
        {
          title: "컨텐츠 관련",
          children: [
            {
              title: "원본 사진 다운로드",
              active: (project) => {
                return contentsRawInfo.raw.exist;
              },
              click: downloadOriginal,
            },
            {
              title: "포트폴리오 보기",
              active: (project) => {
                return contentsRawInfo.portfolio.exist;
              },
              click: viewPortfolio,
            },
            {
              title: "고객 후기 보기",
              active: (project) => {
                return contentsRawInfo.review.exist;
              },
              click: viewReview,
            },
          ]
        },
        {
          title: "디자이너 글",
          children: [
            {
              title: "샘플 다운로드",
              active: (project) => {
                return !(/수집 완료/gi.test(project.contents.raw.portfolio.status) || /편집중/gi.test(project.contents.raw.portfolio.status) || /편집 완료/gi.test(project.contents.raw.portfolio.status));
              },
              click: designerSampleDownload,
            },
            {
              title: "디자이너 글 업로드",
              active: (project) => {
                return !(/수집 완료/gi.test(project.contents.raw.portfolio.status) || /편집중/gi.test(project.contents.raw.portfolio.status) || /편집 완료/gi.test(project.contents.raw.portfolio.status));
              },
              click: designerRawContentsUpload,
            },
            {
              title: "디자이너 글 확인",
              active: (project) => {
                return (/수집 완료/gi.test(project.contents.raw.portfolio.status) || /편집중/gi.test(project.contents.raw.portfolio.status) || /편집 완료/gi.test(project.contents.raw.portfolio.status));
              },
              click: designerRawContentsView,
            },
          ]
        },
      ]
    };

  } else {

    contents = {
      left: [
        {
          title: "촬영비 상태",
          children: [
            {
              title: "촬영비 결제 대기",
              target: (project) => {
                return /대기/gi.test(project.contents.payment.status);
              },
            },
            {
              title: "촬영비 결제 완료",
              target: (project) => {
                return /결제 완료/gi.test(project.contents.payment.status);
              },
            },
            {
              title: "촬영비 해당 없음",
              target: (project) => {
                return (/무료/gi.test(project.contents.payment.status) || /없음/gi.test(project.contents.payment.status) || /환불/gi.test(project.contents.payment.status));
              },
            },
          ]
        },
        {
          title: "디자이너 글",
          children: [
            {
              title: "디자이너 글 대기",
              target: (project) => {
                return !(/수집 완료/gi.test(project.contents.raw.portfolio.status) || /편집중/gi.test(project.contents.raw.portfolio.status) || /편집 완료/gi.test(project.contents.raw.portfolio.status));
              },
            },
            {
              title: "디자이너 글 완료",
              target: (project) => {
                return (/수집 완료/gi.test(project.contents.raw.portfolio.status) || /편집중/gi.test(project.contents.raw.portfolio.status) || /편집 완료/gi.test(project.contents.raw.portfolio.status));
              },
            },
          ]
        },
      ],
      right: [
        {
          title: "촬영비 관련",
          children: [
            {
              title: "촬영비 카드 결제",
              active: (project) => {
                return /대기/gi.test(project.contents.payment.status);
              },
              click: paymentByCard,
            },
            {
              title: "원본 사진 다운로드",
              active: (project) => {
                return contentsRawInfo.raw.exist;
              },
              click: downloadOriginal,
            },
            {
              title: "포트폴리오 보기",
              active: (project) => {
                return contentsRawInfo.portfolio.exist;
              },
              click: viewPortfolio,
            },
          ]
        },
        {
          title: "디자이너 글",
          children: [
            {
              title: "샘플 다운로드",
              active: (project) => {
                return !(/수집 완료/gi.test(project.contents.raw.portfolio.status) || /편집중/gi.test(project.contents.raw.portfolio.status) || /편집 완료/gi.test(project.contents.raw.portfolio.status));
              },
              click: designerSampleDownload,
            },
            {
              title: "디자이너 글 업로드",
              active: (project) => {
                return !(/수집 완료/gi.test(project.contents.raw.portfolio.status) || /편집중/gi.test(project.contents.raw.portfolio.status) || /편집 완료/gi.test(project.contents.raw.portfolio.status));
              },
              click: designerRawContentsUpload,
            },
            {
              title: "디자이너 글 확인",
              active: (project) => {
                return (/수집 완료/gi.test(project.contents.raw.portfolio.status) || /편집중/gi.test(project.contents.raw.portfolio.status) || /편집 완료/gi.test(project.contents.raw.portfolio.status));
              },
              click: designerRawContentsView,
            },
          ]
        },
      ]
    };

  }

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
      display: desktop ? "inline-flex" : "flex",
      flexDirection: "row",
      position: "relative",
      borderRadius: String(5) + "px",
      background: desktop ? colorChip.gray3 : colorChip.gray1,
      width: desktop ? "calc(calc(calc(100% - " + String(panMotherBetween) + ea + ") / 2) - " + String(panMotherInnerPadding * 2) + ea + ")" : withOut(panMotherInnerPadding * 2, ea),
      padding: String(panMotherInnerPadding) + ea,
      marginRight: desktop ? String(panMotherBetween) + ea : "",
      marginBottom: desktop ? "" : String(panMotherBetween) + ea,
      verticalAlign: "top",
    }
  });
  for (let i = 0; i < contents.left.length; i++) {
    createNode({
      mother: panMother,
      style: {
        display: "inline-block",
        verticalAlign: "top",
        position: "relative",
        width: "calc(calc(100% - " + String(panBetween * (contents.left.length - 1)) + ea + ") / " + String(contents.left.length) + ")",
        marginRight: i !== contents.left.length - 1 ? String(panBetween) + ea : "",
        background: desktop ? colorChip.gray1 : colorChip.gray3,
        borderRadius: String(5) + "px",
        transition: "all 0.5s ease",
      },
      child: {
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
            text: contents.left[i].title,
            style: {
              position: "relative",
              top: String(contentsTextTop) + ea,
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(800),
              color: colorChip.black,
            }
          }
        ],
        next: {
          style: {
            padding: String(contentsPanPaddingTop) + ea,
            position: "relative",
            width: withOut(contentsPanPaddingTop * 2, ea),
            display: "flex",
            flexDirection: "column",
          },
          children: (new Array(3)).fill(0, 0).map((zero, index) => {
            const live = contents.left[i].children[index] !== undefined;
            const target = (live ? contents.left[i].children[index].target(project) : false);
            return {
              style: {
                display: "flex",
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                width: withOut(0),
                height: String(buttonHeight) + ea,
                background: live ? (target ? colorChip.white : (desktop ? colorChip.gray3 : colorChip.gray2)) : (desktop ? colorChip.gray2 : colorChip.gray4),
                borderRadius: String(5) + "px",
                marginBottom: index !== 3 - 1 ? String(buttonBetween) + ea : "",
                cursor: "pointer",
              },
              child: {
                text: live ? contents.left[i].children[index].title : "",
                style: {
                  fontSize: String(buttonSize) + ea,
                  fontWeight: String(buttonWeight),
                  color: target ? colorChip.green : colorChip.deactive,
                  position: "relative",
                  top: String(buttonTextTop) + ea,
                }
              }
            }
          }),
        }
      }
    })
  }

  panMother = createNode({
    mother: tong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      flexDirection: "row",
      position: "relative",
      borderRadius: String(5) + "px",
      background: desktop ? colorChip.gray3 : colorChip.gray1,
      width: desktop ? "calc(calc(calc(100% - " + String(panMotherBetween) + ea + ") / 2) - " + String(panMotherInnerPadding * 2) + ea + ")" : withOut(panMotherInnerPadding * 2, ea),
      padding: String(panMotherInnerPadding) + ea,
      verticalAlign: "top",
    }
  });
  for (let i = 0; i < contents.right.length; i++) {
    createNode({
      mother: panMother,
      style: {
        display: "inline-block",
        verticalAlign: "top",
        position: "relative",
        width: "calc(calc(100% - " + String(panBetween * (contents.right.length - 1)) + ea + ") / " + String(contents.right.length) + ")",
        marginRight: i !== contents.right.length - 1 ? String(panBetween) + ea : "",
        background: desktop ? colorChip.gray1 : colorChip.gray3,
        borderRadius: String(5) + "px",
        transition: "all 0.5s ease",
      },
      child: {
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
            text: contents.right[i].title,
            style: {
              position: "relative",
              top: String(contentsTextTop) + ea,
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(800),
              color: colorChip.black,
            }
          }
        ],
        next: {
          style: {
            padding: String(contentsPanPaddingTop) + ea,
            position: "relative",
            width: withOut(contentsPanPaddingTop * 2, ea),
            display: "flex",
            flexDirection: "column",
          },
          children: (new Array(3)).fill(0, 0).map((zero, index) => {
            const live = contents.right[i].children[index] !== undefined;
            const active = live ? contents.right[i].children[index].active(project) : false;
            const eventFunction = live ? contents.right[i].children[index].click(project) : ((e) => { console.log("nothing") });
            return {
              event: {
                click: eventFunction
              },
              style: {
                display: "flex",
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                width: withOut(0),
                height: String(buttonHeight) + ea,
                background: live ? (active ? colorChip.gradientGreen : (desktop ? colorChip.gray3 : colorChip.gray2)) : (desktop ? colorChip.gray2 : colorChip.gray4),
                borderRadius: String(5) + "px",
                marginBottom: index !== 3 - 1 ? String(buttonBetween) + ea : "",
                cursor: "pointer",
              },
              child: {
                text: live ? contents.right[i].children[index].title : "",
                style: {
                  fontSize: String(buttonSize) + ea,
                  fontWeight: String(buttonWeight),
                  color: active ? colorChip.white : colorChip.deactive,
                  position: "relative",
                  top: String(buttonTextTop) + ea,
                }
              }
            }
          }),
        }
      }
    })
  }

  

}

ProcessDetailJs.prototype.setPanBlocks = async function () {
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
              marginBottom: String(itemBetween) + ea,
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
          createNode({
            mother: whitePrompt,
            event: {
              click: async function (e) {
                let parsedString, fileMap;
                try {
                  if (instance.itemList.length === 0) {
                    window.alert("파일을 먼저 선택해주세요!");
                  } else {
                    if (window.confirm("선택한 파일을 삭제하시겠습니까?")) {
                      fileMap = instance.itemList.map(({ original }) => {
                        if ((new RegExp(instance.targetKeywords, "g")).test(original)) {
                          const [ protocol, host, const1, const2, desid, proid, fileName ] = original.split("/").filter((str) => { return str !== '' });
                          return { desid, proid, fileName, mode: "designer" };
                        } else {
                          const [ protocol, host, const1, const2, folder, kind, fileName ] = original.split("/").filter((str) => { return str !== '' });
                          return { folder, kind, fileName, mode: "client" };
                        }
                      });
                      await ajaxJson({ targets: fileMap }, BRIDGEHOST + "/middlePhotoRemove");
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
              marginBottom: String(itemBetween) + ea,
              cursor: "pointer",
            },
            child: {
              text: "파일 삭제",
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
              marginBottom: String(itemBetween) + ea,
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
          createNode({
            mother: whitePrompt,
            attribute: { original },
            event: {
              click: async function (e) {
                const original = this.getAttribute("original");
                let parsedString, fileMap;
                try {
                  if (instance.itemList.length === 0) {
                    window.alert("파일을 먼저 선택해주세요!");
                  } else {
                    if (window.confirm("선택한 파일을 삭제하시겠습니까?")) {
                      fileMap = instance.itemList.map(({ original }) => {
                        if ((new RegExp(instance.targetKeywords, "g")).test(original)) {
                          const [ protocol, host, const1, const2, desid, proid, fileName ] = original.split("/").filter((str) => { return str !== '' });
                          return { desid, proid, fileName, mode: "designer" };
                        } else {
                          const [ protocol, host, const1, const2, folder, kind, fileName ] = original.split("/").filter((str) => { return str !== '' });
                          return { folder, kind, fileName, mode: "client" };
                        }
                      });
                      await ajaxJson({ targets: fileMap }, BRIDGEHOST + "/middlePhotoRemove");
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
              marginBottom: String(itemBetween) + ea,
              cursor: "pointer",
            },
            child: {
              text: "링크 삭제",
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
        createNode({
          mother: whitePrompt,
          event: {
            click: async function (e) {
              let parsedString, fileMap;
              let string;
              let newString;
              let updateMap;
              let hash;
              let loading;
              let hex, desid, proid, fileName;
              let folder, kind;
              let mode;

              try {
                if (instance.itemList.length === 0) {
                  window.alert("파일을 먼저 선택해주세요!");
                } else {

                  fileMap = instance.itemList.map(({ original, hex }) => {
                    if ((new RegExp(instance.targetKeywords, "g")).test(original)) {
                      const [ protocol, host, const1, const2, desid, proid, fileName ] = original.split("/").filter((str) => { return str !== '' });
                      return { desid, proid, fileName, hex, mode: "designer" };
                    } else {
                      const [ protocol, host, const1, const2, folder, kind, fileName ] = original.split("/").filter((str) => { return str !== '' });
                      return { folder, kind, fileName, hex, mode: "client" };
                    }
                  });

                  updateMap = [];

                  for (let obj of fileMap) {
                    hex = obj.hex;
                    fileName = obj.fileName;
                    mode = obj.mode;

                    ({ string } = await ajaxJson({ mode: "decrypto", hash: hex }, BACKHOST + "/homeliaisonCrypto", { equal: true }));
                    if (instance.isEmptyString(string)) {
                      string = '';
                    }

                    newString = null;
                    newString = await GeneralJs.prompt("파일에 대한 간단한 이름 또는 메모를 적어주세요! (예) 주방_시공의뢰서_1", string);
                    if (typeof newString !== "string" || newString.trim() === '') {
                      newString = "메모 없음";
                    }

                    newString = newString.replace(/[\=\/\\\(\)\?\+\&]/gi, '').replace(/ /gi, '_');
                    ({ hash } = await ajaxJson({ mode: "crypto", string: newString }, BACKHOST + "/homeliaisonCrypto", { equal: true }));

                    if (mode === "designer") {
                      desid = obj.desid;
                      proid = obj.proid;
                      updateMap.push({ desid, proid, fileName, hash, mode });
                    } else {
                      folder = obj.folder;
                      kind = obj.kind;
                      updateMap.push({ folder, kind, fileName, hash, mode });
                    }
                  }

                  loading = instance.mother.grayLoading();
                  await ajaxJson({ targets: updateMap }, BRIDGEHOST + "/middlePhotoUpdate");
                  cancelEvent.call(self, e);
                  await instance.setPanBlocks();

                  loading.remove();
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
            marginBottom: String(itemBetween) + ea,
            cursor: "pointer",
          },
          child: {
            text: "메모 수정",
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
        createNode({
          mother: whitePrompt,
          event: {
            click: async function (e) {
              try {
                const host = FRONTHOST.replace(/^https\:\/\//gi, '');
                const path = "project";

                if (instance.itemList.length === 0) {
                  window.alert("파일을 먼저 선택해주세요!");
                } else {
                  const targets = equalJson(JSON.stringify(instance.panContents));
                  const target = targets.find((obj) => { return obj.key === instance.itemList[0].key })
                  await ajaxJson({
                    method: "projectDetail",
                    name: instance.client.name,
                    phone: instance.client.phone,
                    option: {
                      client: instance.client.name,
                      designer: instance.designer.designer,
                      file: target.action[0].name,
                      host: host,
                      path: path,
                      proid: instance.project.proid,
                      key: instance.itemList[0].key,
                    }
                  }, BACKHOST + "/alimTalk");
                  window.alert(instance.client.name + " 고객님에게 알림톡을 전송하였습니다!");
                  cancelEvent.call(self, e);
                }

              } catch (e) {
                console.log(e);
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
            text: "고객 알림 보내기",
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
            click: linkItemSelectEvent,
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
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, blankHref, downloadFile, returnGet } = GeneralJs;
  const wordings = {
    title: [ "고객 정보" ],
    subTitle: [
      "현장 미팅 주소",
      "현장 미팅 시간",
      "프로젝트 기간"
    ],
    contents: [
      "현장 미팅 전, <b%디자이너에게 공유%b>할 고객님의 기본 정보입니다.",
      "<b%잘못된 정보가 있을 시%b> 홈리에종에 말씀해주시길 바랍니다.",
    ],
    table: instance.tableStatic(instance.designer, instance.project, instance.client, instance.clientHistory, instance.projectHistory, instance.requestNumber)
  };
  const pdfSaveIconClassName = "pdfSaveIconClassName";
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
  let outMode;

  if (returnGet().mode === "request") {
    wordsTitle = desktop ? "홈스타일링 의뢰서" + "&nbsp;&nbsp;<b%pdf로 저장%b>" : "홈스타일링 의뢰서";
    outMode = false;
  } else {
    wordsTitle = desktop ? wordings.title.join(" ") + "&nbsp;&nbsp;<b%pdf로 저장%b>" : wordings.title.join(" ");
    outMode = true;
  }

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
  mobilePaddingBottom = 10;

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
            class: [ pdfSaveIconClassName ],
            event: {
              click: function (e) {
                const loading = instance.mother.grayLoading();
                ajaxJson({ url: window.encodeURIComponent(FRONTHOST + "/designer/process.php?proid=" + instance.project.proid + "&mode=request&green=deactive") }, SECONDHOST + "/pageToPdf").then((res) => {
                  return downloadFile(window.decodeURIComponent(res.url));
                }).then(() => {
                  loading.remove();
                }).catch((err) => {
                  console.log(err);
                })
              }
            },
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
        text: emptyReload(projectHistory.request.about.where, [ client.requests[requestNumber].request.space.address ]),
        style: {
          display: (outMode && mobile) ? "none" : "block",
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(400),
          color: desktop ? colorChip.black : colorChip.green,
          marginTop: String(initContentsMarginTop) + ea,
          lineHeight: String(1.6),
        },
        bold: {
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black
        }
      },
      {
        text: wordings.subTitle[0],
        style: {
          display: (outMode && mobile) ? "none" : "block",
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black,
          marginTop: String(bigNumberBetweenMargin) + ea,
          paddingLeft: String(initContentsPaddingLeft) + ea,
          lineHeight: String(1.6),
          position: "relative",
        },
        bold: {
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black
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
      {
        text: emptyReload(projectHistory.request.about.when, [ dateToString(project.process.contract.meeting.date, true, true) ]),
        style: {
          display: (outMode && mobile) ? "none" : "block",
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(400),
          color: desktop ? colorChip.black : colorChip.green,
          marginTop: String(initContentsMarginTop) + ea,
          lineHeight: String(1.6),
        },
        bold: {
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black
        }
      },
      {
        text: wordings.subTitle[1],
        style: {
          display: (outMode && mobile) ? "none" : "block",
          position: "relative",
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black,
          paddingLeft: String(initContentsPaddingLeft) + ea,
          marginTop: String(bigNumberBetweenMargin) + ea,
          lineHeight: String(1.6),
        },
        bold: {
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black
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
        text: wordings.subTitle[2],
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

ProcessDetailJs.prototype.insertBelowBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, project, projectHistory, requestNumber, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, blankHref, downloadFile, returnGet } = GeneralJs;
  const wordings = {
    title: [ "고객 정보" ],
    subTitle: [
      "현장 미팅 주소",
      "현장 미팅 시간",
      "프로젝트 기간"
    ],
    contents: [
      "현장 미팅 전, <b%디자이너에게 공유%b>할 고객님의 기본 정보입니다.",
      "<b%잘못된 정보가 있을 시%b> 홈리에종에 말씀해주시길 바랍니다.",
    ],
    table: instance.tableStatic(instance.designer, instance.project, instance.client, instance.clientHistory, instance.projectHistory, instance.requestNumber)
  };
  const pdfSaveIconClassName = "pdfSaveIconClassName";
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
  let outMode;
  let contentsAreaPaddingTop;
  let mobilePaddingLeft;

  if (returnGet().mode === "request") {
    wordsTitle = desktop ? "홈스타일링 의뢰서" + "&nbsp;&nbsp;<b%pdf로 저장%b>" : "홈스타일링 의뢰서";
    outMode = false;
  } else {
    wordsTitle = desktop ? wordings.title.join(" ") + "&nbsp;&nbsp;<b%pdf로 저장%b>" : wordings.title.join(" ");
    outMode = true;
  }

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
  mobileCalendarMarginTop = 7;
  mobilePaddingTop = 5;
  mobilePaddingBottom = 2;

  initWordingSize = <%% 14.5, 14, 14, 13, 3.2 %%>;

  zeroWordingSize = <%% 21, 21, 21, 21, 21 %%>;
  zeroWordingTop = <%% -3, -3, -3, -3, -3 %%>;

  initTitleMarginTop = <%% 14, 14, 14, 14, 2.5 %%>;
  initContentsMarginTop = <%% 4, 4, 4, 4, 0.5 %%>;
  initContentsBottom = <%% -3, -3, -3, -3, 0 %%>;
  initContentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;

  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  this.whiteMargin = (desktop ? margin : 0);

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
            text: "고객 정보",
            class: [ pdfSaveIconClassName ],
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
          paddingBottom: desktop ? "" : String(6) + ea,
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
        text: emptyReload(projectHistory.request.about.where, [ client.requests[requestNumber].request.space.address ]),
        style: {
          display: (outMode && mobile) ? "none" : "block",
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(400),
          color: desktop ? colorChip.black : colorChip.green,
          marginTop: String(initContentsMarginTop) + ea,
          lineHeight: String(1.6),
        },
        bold: {
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black
        }
      },
      {
        text: wordings.subTitle[0],
        style: {
          display: (outMode && mobile) ? "none" : "block",
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black,
          marginTop: String(bigNumberBetweenMargin) + ea,
          paddingLeft: String(initContentsPaddingLeft) + ea,
          lineHeight: String(1.6),
          position: "relative",
        },
        bold: {
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black
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
      {
        text: emptyReload(projectHistory.request.about.when, [ dateToString(project.process.contract.meeting.date, true, true) ]),
        style: {
          display: (outMode && mobile) ? "none" : "block",
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(400),
          color: desktop ? colorChip.black : colorChip.green,
          marginTop: String(initContentsMarginTop) + ea,
          lineHeight: String(1.6),
        },
        bold: {
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black
        }
      },
      {
        text: wordings.subTitle[1],
        style: {
          display: (outMode && mobile) ? "none" : "block",
          position: "relative",
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black,
          paddingLeft: String(initContentsPaddingLeft) + ea,
          marginTop: String(bigNumberBetweenMargin) + ea,
          lineHeight: String(1.6),
        },
        bold: {
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black
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
        text: wordings.subTitle[2],
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

ProcessDetailJs.prototype.insertDetailBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const { mainContents } = instance.tableStatic(instance.designer, instance.project, instance.client, instance.clientHistory, instance.projectHistory, instance.requestNumber);
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), 0 %%>;
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
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  this.whiteMargin = (desktop ? margin : 0);

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
            text: "상세 사항",
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
          paddingBottom: desktop ? "" : String(6) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { title, contents } of mainContents) {
    num2 = 0;
    for (let str of contents) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(num2 === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
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
                  fontWeight: String(600),
                  lineHeight: String(1.6),
                  color: colorChip.black,
                  textAlign: "left",
                  background: colorChip.white,
                  paddingRight: String(linePadding) + ea,
                },
                bold: {
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(600),
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
            text: str,
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: withOut(desktop ? zeroWidth + zeroMarginRight + firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
          },
        ]
      });

      num2++;
    }
    num++;
  }

}

ProcessDetailJs.prototype.insertStyleBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const { mainContents } = instance.tableStatic(instance.designer, instance.project, instance.client, instance.clientHistory, instance.projectHistory, instance.requestNumber);
  const imageStart = S3HOST + "/corePortfolio/listImage";
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
  let pid, images;
  let tempImage;
  let columnsLength;
  let imageMargin;
  let positionArr;
  let tempArr;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), 0 %%>;
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
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  columnsLength = <%% 4, 4, 3, 3, 2 %%>;
  imageMargin = <%% 8, 8, 8, 6, 1 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  this.whiteMargin = (desktop ? margin : 0);

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
            text: "스타일 체크 사진",
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
          paddingBottom: desktop ? "" : String(6) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  images = this.clientHistory.curation.image.map((image) => {
    pid = image.split('.')[0].replace(/^t[0-9]+/gi, '');
    return imageStart + "/" + pid + "/" + image;
  })

  positionArr = [];
  for (let i = 0; i < columnsLength; i++) {
    positionArr.push(createNode({
      mother: tong,
      style: {
        position: "relative",
        display: "inline-block",
        width: "calc(calc(100% - " + String(imageMargin * (columnsLength - 1)) + ea + ") / " + String(columnsLength) + ")",
        height: "auto",
        marginRight: String(i === columnsLength - 1 ? 0 : imageMargin) + ea,
        verticalAlign: "top",
      }
    }));
  }

  tempArr = [];
  num = 0;
  for (let image of images) {
    tempImage = createNode({
      mother: tong,
      mode: "img",
      attribute: [
        { src: image },
        { index: String(num) },
        { length: String(images.length) }
      ],
      style: {
        position: "relative",
        display: "inline-block",
        width: String(100) + '%',
        height: "auto",
        marginBottom: String(imageMargin) + ea,
        borderRadius: String(3) + "px",
        verticalAlign: "top",
        cursor: "pointer",
      }
    });
    if (media[0] || media[1]) {
      tempImage.addEventListener("click", function (e) {
        e.stopPropagation();
        const { createNode, withOut, colorChip, equalJson, downloadFile } = GeneralJs;
        const totalImages = equalJson(JSON.stringify(images));
        const mother = document.getElementById("totalcontents");
        const className = "photoSelectedTarget";
        const length = Number(this.getAttribute("length"));
        const zIndex = 2;
        const wordDictionary = "고객님이 선택한 사진";
        let img, height, imgBox;
        let title, titleSize, bottom;
        let titleBox;
        let leftArrow, rightArrow;
        let leftArrowBox, rightArrowBox;
        let arrowHeight;
        let arrowMargin;
        let index, src;
        let convertEvent;

        index = Number(this.getAttribute("index"));
        src = this.getAttribute("src");

        convertEvent = () => {};

        height = 78;
        titleSize = 2;
        bottom = 6.6;
        arrowHeight = 1.7;
        arrowMargin = 78;

        createNode({
          mother,
          class: [ className ],
          events: [
            {
              type: "click",
              event: function (e) {
                const removeTargets = document.querySelectorAll('.' + className);
                for (let dom of removeTargets) {
                  mother.removeChild(dom);
                }
              }
            }
          ],
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            width: String(100) + '%',
            height: String(100) + '%',
            background: colorChip.darkDarkShadow,
            zIndex: String(zIndex),
            animation: "justfadeineight 0.2s ease forwards",
          }
        });

        img = createNode({
          mother,
          class: [ className ],
          mode: "img",
          attribute: [
            { src },
            { direction: "right" }
          ],
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            height: String(height) + '%',
            width: "auto",
            zIndex: String(zIndex),
            transition: "all 0s ease",
            animation: "fadeuplite 0.2s ease forwards",
            borderRadius: String(3) + "px",
          }
        });
        imgBox = img.getBoundingClientRect();
        img.style.top = withOut(50, imgBox.height / 2, ea);
        img.style.left = withOut(50, imgBox.width / 2, ea);

        title = createNode({
          mother,
          events: [
            {
              type: [ "click", "dblclick", "selectstart" ],
              event: (e) => {
                e.stopPropagation();
                e.preventDefault();
              }
            }
          ],
          class: [ className ],
          text: wordDictionary,
          style: {
            position: "fixed",
            bottom: String(bottom) + '%',
            fontSize: String(titleSize) + "vh",
            fontWeight: String(600),
            color: colorChip.whiteBlack,
            left: String(50) + '%',
            zIndex: String(zIndex),
            transition: "all 0s ease",
            animation: "fadeuplite 0.2s ease forwards",
          }
        });
        titleBox = title.getBoundingClientRect();
        title.style.left = withOut(50, titleBox.width / 2, ea);

        leftArrow = createNode({
          mother,
          events: [
            {
              type: [ "dblclick", "selectstart" ],
              event: (e) => {
                e.stopPropagation();
                e.preventDefault();
              }
            }
          ],
          attribute: [
            { direction: "left" }
          ],
          class: [ className ],
          mode: "svg",
          source: instance.mother.returnArrow("left", colorChip.whiteBlack),
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            height: String(arrowHeight) + "vh",
            zIndex: String(zIndex),
            transition: "all 0s ease",
            animation: "fadeuplite 0.2s ease forwards",
            cursor: "pointer"
          }
        });
        leftArrowBox = leftArrow.getBoundingClientRect();
        leftArrow.style.top = withOut(50, leftArrowBox.height / 2, ea);
        leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, ea);

        rightArrow = createNode({
          mother,
          events: [
            {
              type: [ "dblclick", "selectstart" ],
              event: (e) => {
                e.stopPropagation();
                e.preventDefault();
              }
            }
          ],
          attribute: [
            { direction: "right" }
          ],
          class: [ className ],
          mode: "svg",
          source: instance.mother.returnArrow("right", colorChip.whiteBlack),
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            height: String(arrowHeight) + "vh",
            zIndex: String(zIndex),
            transition: "all 0s ease",
            animation: "fadeuplite 0.2s ease forwards",
            cursor: "pointer"
          }
        });
        rightArrowBox = rightArrow.getBoundingClientRect();
        rightArrow.style.top = withOut(50, rightArrowBox.height / 2, ea);
        rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, ea);

        convertEvent = function (e) {
          e.stopPropagation();
          e.preventDefault();
          const direction = this.getAttribute("direction");
          let targetIndex, targetImage;
          if (direction === "left") {
            targetIndex = index - 1;
            if (totalImages[targetIndex] === undefined) {
              targetIndex = length - 1;
            }
          } else {
            targetIndex = index + 1;
            if (totalImages[targetIndex] === undefined) {
              targetIndex = 0;
            }
          }
          targetImage = totalImages[targetIndex];
          img.setAttribute("src", targetImage);
          imgBox = img.getBoundingClientRect();
          img.style.left = withOut(50, imgBox.width / 2, ea);
          leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, ea);
          rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, ea);

          index = targetIndex;
          src = targetImage;

          title.textContent = wordDictionary;
          titleBox = title.getBoundingClientRect();
          title.style.left = withOut(50, titleBox.width / 2, ea);
        }
        leftArrow.addEventListener("click", convertEvent);
        rightArrow.addEventListener("click", convertEvent);
        img.addEventListener("click", convertEvent);
      });
    }
    tong.style.height = "auto";
    tempArr.push(tempImage);
    if (tempArr.length === columnsLength) {
      positionArr.sort((a, b) => { return a.getBoundingClientRect().height - b.getBoundingClientRect().height; });
      tempArr.sort((a, b) => { return b.getBoundingClientRect().height - a.getBoundingClientRect().height; });
      for (let i = 0; i < tempArr.length; i++) {
        positionArr[i].appendChild(tempArr[i]);
      }
      tempArr = [];
    }
    num++;
  }

  positionArr.sort((a, b) => { return a.getBoundingClientRect().height - b.getBoundingClientRect().height; });
  tempArr.sort((a, b) => { return b.getBoundingClientRect().height - a.getBoundingClientRect().height; });
  for (let i = 0; i < tempArr.length; i++) {
    positionArr[i].appendChild(tempArr[i]);
  }

}

ProcessDetailJs.prototype.insertNoticeBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const { notice: mainContents } = instance.tableStatic(instance.designer, instance.project, instance.client, instance.clientHistory, instance.projectHistory, instance.requestNumber);
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), 0 %%>;
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
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  this.whiteMargin = (desktop ? margin : 0);

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
            text: "기타 안내 사항",
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
          paddingBottom: desktop ? "" : String(6) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { title, contents } of mainContents) {
    num2 = 0;
    for (let str of contents) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(num2 === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
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
                  fontWeight: String(600),
                  lineHeight: String(1.6),
                  color: colorChip.black,
                  textAlign: "left",
                  background: colorChip.white,
                  paddingRight: String(linePadding) + ea,
                },
                bold: {
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(600),
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
            text: str,
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: withOut(desktop ? zeroWidth + zeroMarginRight + firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
          },
        ]
      });

      num2++;
    }
    num++;
  }

}

ProcessDetailJs.prototype.isEmptyString = function (string) {
  const instance = this;
  if (/^[0-9]/.test(string) && /[0-9]$/.test(string) && string.length > 5 && string.replace(/[0-9]/gi, '') === '') {
    return true;
  } else {
    return false;
  }
}

ProcessDetailJs.prototype.returnButtonList = function () {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, blankHref, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, downloadFile, removeByClass } = GeneralJs;
  const { project, requestNumber, ea, baseTong, media, totalContents, contentsRawInfo } = this;
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
    name: "선택 파일 열기",
    item: true,
    deactive: false,
    reverse: false,
    event: function () {
      return async function (e) {
        let parsedString;
        let protocol, host, static0, static1, desid, proid, file;
        let parsedObject, loading;
        try {
          if (instance.itemList.length === 0) {
            window.alert("파일을 먼저 선택해주세요!");
          } else {
            for (let { original, type, hex, exe } of instance.itemList) {
              loading = instance.mother.whiteProgressLoading();
              if (type === "photo") {
                await downloadFile(original, null, loading.progress.firstChild);
              } else if (type === "file") {
                parsedString = await ajaxJson({ mode: "decrypto", hash: hex }, BACKHOST + "/homeliaisonCrypto", { equal: true });
                await downloadFile(original, parsedString.string.replace(/ /gi, "_") + "." + exe, loading.progress.firstChild);
              } else {
                [ protocol, host, static0, static1, desid, proid, file ] = original.split("/").filter((str) => { return str !== "" });
                parsedObject = await ajaxJson({ links: [ { desid, proid, file } ] }, BRIDGEHOST + "/middleLinkParsing", { equal: true });
                if (Array.isArray(parsedObject) && parsedObject.length > 0) {
                  blankHref(parsedObject[0].link);
                }
              }
              loading.remove();
            }
          }
          await instance.setPanBlocks();
        } catch (e) {
          console.log(e);
          window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
        }
      }
    }
  });

  buttonList.push({
    name: "선택 파일 삭제",
    item: true,
    deactive: false,
    reverse: false,
    event: function () {
      return async function (e) {
        let parsedString, fileMap;
        try {
          if (instance.itemList.length === 0) {
            window.alert("파일을 먼저 선택해주세요!");
          } else {
            if (window.confirm("선택한 파일을 삭제하시겠습니까?")) {
              fileMap = instance.itemList.map(({ original }) => {
                if ((new RegExp(instance.targetKeywords, "g")).test(original)) {
                  const [ protocol, host, const1, const2, desid, proid, fileName ] = original.split("/").filter((str) => { return str !== '' });
                  return { desid, proid, fileName, mode: "designer" };
                } else {
                  const [ protocol, host, const1, const2, folder, kind, fileName ] = original.split("/").filter((str) => { return str !== '' });
                  return { folder, kind, fileName, mode: "client" };
                }
              });
              await ajaxJson({ targets: fileMap }, BRIDGEHOST + "/middlePhotoRemove");
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

  buttonList.push({
    name: "메모 수정하기",
    item: true,
    deactive: false,
    reverse: false,
    event: function () {
      return async function (e) {
        let parsedString, fileMap;
        let string;
        let newString;
        let updateMap;
        let hash;
        let loading;
        let hex, desid, proid, fileName;
        let folder, kind;
        let mode;

        try {
          if (instance.itemList.length === 0) {
            window.alert("파일을 먼저 선택해주세요!");
          } else {

            fileMap = instance.itemList.map(({ original, hex }) => {
              if ((new RegExp(instance.targetKeywords, "g")).test(original)) {
                const [ protocol, host, const1, const2, desid, proid, fileName ] = original.split("/").filter((str) => { return str !== '' });
                return { desid, proid, fileName, hex, mode: "designer" };
              } else {
                const [ protocol, host, const1, const2, folder, kind, fileName ] = original.split("/").filter((str) => { return str !== '' });
                return { folder, kind, fileName, hex, mode: "client" };
              }
            });

            updateMap = [];

            for (let obj of fileMap) {
              hex = obj.hex;
              fileName = obj.fileName;
              mode = obj.mode;

              ({ string } = await ajaxJson({ mode: "decrypto", hash: hex }, BACKHOST + "/homeliaisonCrypto", { equal: true }));
              if (instance.isEmptyString(string)) {
                string = '';
              }

              newString = null;
              newString = await GeneralJs.prompt("파일에 대한 간단한 이름 또는 메모를 적어주세요! (예) 주방_시공의뢰서_1", string);
              if (typeof newString !== "string" || newString.trim() === '') {
                newString = "메모 없음";
              }
              newString = newString.replace(/[\=\/\\\(\)\?\+\&]/gi, '').replace(/ /gi, '_');
              ({ hash } = await ajaxJson({ mode: "crypto", string: newString }, BACKHOST + "/homeliaisonCrypto", { equal: true }));

              if (mode === "designer") {
                desid = obj.desid;
                proid = obj.proid;
                updateMap.push({ desid, proid, fileName, hash, mode });
              } else {
                folder = obj.folder;
                kind = obj.kind;
                updateMap.push({ folder, kind, fileName, hash, mode });
              }
            }

            loading = instance.mother.grayLoading();
            await ajaxJson({ targets: updateMap }, BRIDGEHOST + "/middlePhotoUpdate");
            await instance.setPanBlocks();

            loading.remove();
          }
        } catch (e) {
          console.log(e);
          window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
        }
      }
    }
  });

  buttonList.push({
    name: "고객 알림 보내기",
    item: true,
    deactive: false,
    reverse: false,
    event: function () {
      return async function (e) {
        try {
          const host = FRONTHOST.replace(/^https\:\/\//gi, '');
          const path = "project";
          const targets = equalJson(JSON.stringify(instance.panContents));
          let target;

          if (instance.itemList.length === 0) {
            target = targets.find((obj) => { return obj.type === "link" })
          } else {
            target = targets.find((obj) => { return obj.key === instance.itemList[0].key })
          }

          await ajaxJson({
            method: "projectDetail",
            name: instance.client.name,
            phone: instance.client.phone,
            option: {
              client: instance.client.name,
              designer: instance.designer.designer,
              file: target.action[0].name,
              host: host,
              path: path,
              proid: instance.project.proid,
              key: target.key,
            }
          }, BACKHOST + "/alimTalk");
          window.alert(instance.client.name + " 고객님에게 알림톡을 전송하였습니다!");

        } catch (e) {
          console.log(e);
          window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
        }
      }
    }
  });

  if (!(/수집 완료/gi.test(project.contents.raw.portfolio.status) || /편집중/gi.test(project.contents.raw.portfolio.status) || /편집 완료/gi.test(project.contents.raw.portfolio.status))) {
    buttonList.push({
      name: "디자이너 글 업로드",
      item: false,
      deactive: (/수집 완료/gi.test(project.contents.raw.portfolio.status) || /편집중/gi.test(project.contents.raw.portfolio.status) || /편집 완료/gi.test(project.contents.raw.portfolio.status)),
      reverse: true,
      event: function () {
        return instance.insertRawUploadBox();
      }
    });
  } else {
    buttonList.push({
      name: "디자이너 글 확인",
      item: false,
      deactive: !(/수집 완료/gi.test(project.contents.raw.portfolio.status) || /편집중/gi.test(project.contents.raw.portfolio.status) || /편집 완료/gi.test(project.contents.raw.portfolio.status)),
      reverse: true,
      event: function () {
        return instance.insertRawContentsBox();
      }
    });
  }

  buttonList.push({
    name: "촬영비 카드 결제",
    item: false,
    deactive: !(/대기/gi.test(project.contents.payment.status)),
    reverse: true,
    event: function () {
      return (instance.paymentByCard())(instance.project);
    }
  });

  buttonList.push({
    name: "원본 사진 다운로드",
    item: false,
    deactive: !contentsRawInfo.raw.exist,
    reverse: true,
    event: function () {
      return async function (e) {
        try {
          const { link } = instance.contentsRawInfo.raw;
          let loading;
          if (link.trim() === '') {
            window.alert("원본 파일이 없습니다!");
          } else {
            loading = instance.mother.whiteProgressLoading();
            await downloadFile(link, null, loading.progress.firstChild);
            loading.remove();
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  });

  return buttonList;
}

ProcessDetailJs.prototype.insertGreenButtons = function () {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker } = GeneralJs;
  const { project, requestNumber, ea, baseTong, media, totalContents } = this;
  const greenButtonClassName = "greenButtonClassName";
  const reverseButtonClassName = "reverseButtonClassName";
  const generalButtonClassName = "generalButtonClassName";
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
  buttonBetween = <%% 5, 5, 5, 5, 0.8 %%>;

  buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isIphone() ? -0.1 : -0.3) %%>;
  buttonSize = <%% 14, 14, 14, 13, 2.6 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;

  basePadding = <%% 8, 8, 8, 6, 1.2 %%>;

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
      paddingBottom: String(basePadding - buttonMarginTop) + ea,
      zIndex: String(zIndex),
      transition: "all 0.5s ease",
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
          transition: "all 0.5s ease",
        }
      }
    ]
  }).firstChild;

  this.buttonBase = buttonBase.parentNode;

  setButtons = () => {
    buttonList = instance.returnButtonList();
    cleanChildren(buttonBase);
    for (let i = 0; i < buttonList.length; i++) {
      createNode({
        mother: buttonBase,
        class: [ (buttonList[i].item ? greenButtonClassName : (buttonList[i].reverse ? reverseButtonClassName : generalButtonClassName)) ],
        event: {
          click: buttonList[i].event(),
        },
        attribute: {
          proid: project.proid,
          desid: instance.designer.desid,
          name: project.name,
          designer: instance.designer.designer,
          height: String(buttonHeight) + ea,
          margin: String(buttonMarginTop) + ea,
          deactive: buttonList[i].deactive ? "true" : "false",
        },
        style: {
          display: "flex",
          width: withOut(0),
          height: String(buttonHeight) + ea,
          background: buttonList[i].item ? colorChip.gray3 : (!buttonList[i].deactive ? colorChip.softGreen : colorChip.gray3),
          borderRadius: String(5) + "px",
          marginBottom: String(buttonMarginTop) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
          overflow: "hidden",
          transition: "all 0.5s ease",
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
              color: buttonList[i].item ? colorChip.deactive : (!buttonList[i].deactive ? colorChip.white : colorChip.deactive),
            }
          }
        ]
      });
    }
  };
  setButtons();

  instance.reloadGreenButtons();

}

ProcessDetailJs.prototype.asyncLoadingBlock = function () {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker } = GeneralJs;
  const { project, requestNumber, ea, baseTong, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
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
  let loadingWidth;
  let loadingTop;
  let progressSize;
  let progressWeight;
  let progressMarginBottom;
  let pastButtonBase;

  this.nowUploading = true;

  const WhiteLoading = function (base, progress, pastBase) {
    this.base = base;
    this.progress = progress;
    this.pastBase = pastBase;
  }

  WhiteLoading.prototype.remove = function () {
    this.base.parentElement.removeChild(this.base);
    this.pastBase.style.animation = "talkfade 0.3s ease forwards";
    instance.nowUploading = false;
  }

  baseWidth = desktop ? 68 : 12;
  right = desktop ? 40 : 5.4;
  bottom = desktop ? 39 : 6;

  zIndex = 4;

  chatBaseWidth = <%% 160, 160, 160, 160, 21 %%>;
  chatBaseHeight = <%% 90, 90, 90, 90, 21 %%>;
  chatBaseBetween = <%% 16, 16, 16, 16, 2 %%>;

  buttonPadding = <%% 12, 12, 12, 10, 3.2 %%>;
  buttonHeight = <%% 36, 36, 36, 33, 6.8 %%>;
  buttonMarginTop = <%% 6, 6, 6, 6, 1 %%>;
  buttonBetween = <%% 6, 6, 6, 6, 1 %%>;

  buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isIphone() ? -0.1 : -0.3) %%>;
  buttonSize = <%% 14, 14, 14, 13, 2.6 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;

  basePadding = <%% 12, 12, 12, 10, 1.6 %%>;

  loadingWidth = <%% 40, 40, 40, 36, 8 %%>;
  loadingTop = <%% -3, -3, -3, -2, -0.5 %%>;

  progressSize = <%% 15, 15, 15, 14, 3.2 %%>;
  progressWeight = <%% 400, 400, 400, 400, 400 %%>;
  progressMarginBottom = <%% 1, 1, 1, 1, 0.5 %%>;

  pastButtonBase = instance.buttonBase;
  pastButtonBase.style.animation = "fadeoutlite 0.2s ease forwards";

  buttonBase = createNode({
    mother: totalContents,
    style: {
      display: "inline-flex",
      position: "fixed",
      width: String(chatBaseWidth) + ea,
      height: String(chatBaseHeight) + ea,
      borderRadius: String(8) + "px",
      right: String(right) + ea,
      bottom: String(bottom + baseWidth + chatBaseBetween) + ea,
      boxShadow: "0px 6px 20px -10px " + colorChip.shadow,
      animation: "talkfade 0.3s ease forwards",
      overflow: "hidden",
      background: colorChip.white,
      padding: String(basePadding) + ea,
      paddingBottom: String(basePadding - buttonMarginTop) + ea,
      zIndex: String(zIndex),
      transition: "all 0.5s ease",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    children: [
      {
        mode: "svg",
        source: instance.mother.returnLoading(),
        class: [ "loading" ],
        style: {
          display: "inline-block",
          position: "relative",
          width: String(loadingWidth) + ea,
          height: String(loadingWidth) + ea,
          left: "auto",
          top: String(loadingTop) + ea,
        }
      },
      {
        text: "0%",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(progressSize) + ea,
          fontWeight: String(progressWeight),
          fontFamily: "graphik",
          color: colorChip.green,
          marginBottom: String(progressMarginBottom) + ea,
        }
      }
    ]
  });

  return (new WhiteLoading(buttonBase, buttonBase.lastChild, pastButtonBase));
}

ProcessDetailJs.prototype.reloadGreenButtons = function () {
  const instance = this;
  const greenButtonClassName = "greenButtonClassName";
  const reverseButtonClassName = "reverseButtonClassName";
  const generalButtonClassName = "generalButtonClassName";
  const { colorChip } = GeneralJs;
  let targets;
  let reverseTargets;
  let thisDeactive;

  targets = document.querySelectorAll('.' + greenButtonClassName);
  reverseTargets = document.querySelectorAll('.' + reverseButtonClassName);

  if (this.itemList.length > 0) {

    for (let dom of targets) {
      thisDeactive = dom.getAttribute("deactive") === "true";
      dom.style.background = thisDeactive ? colorChip.gray3 : colorChip.softGreen;
      dom.firstChild.style.color = thisDeactive ? colorChip.deactive : colorChip.white;
      dom.style.height = dom.getAttribute("height");
      dom.style.marginBottom = dom.getAttribute("margin");
      dom.style.animation = "fadeuplite 0.3s ease forwards";
    }

    for (let dom of reverseTargets) {
      dom.style.background = colorChip.gray3;
      dom.firstChild.style.color = colorChip.deactive;
      dom.style.height = String(0);
      dom.style.marginBottom = String(0);
      dom.style.animation = "fadedownlite 0.3s ease forwards";
    }

  } else {

    for (let dom of targets) {
      dom.style.background = colorChip.gray3;
      dom.firstChild.style.color = colorChip.deactive;
      dom.style.height = String(0);
      dom.style.marginBottom = String(0);
      dom.style.animation = "fadedownlite 0.3s ease forwards";
    }

    for (let dom of reverseTargets) {
      thisDeactive = dom.getAttribute("deactive") === "true";
      dom.style.background = thisDeactive ? colorChip.gray3 : colorChip.softGreen;
      dom.firstChild.style.color = thisDeactive ? colorChip.deactive : colorChip.white;
      dom.style.height = dom.getAttribute("height");
      dom.style.marginBottom = dom.getAttribute("margin");
      dom.style.animation = "fadeuplite 0.3s ease forwards";
    }

  }

}

ProcessDetailJs.prototype.insertRawUploadBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project, contentsRawInfo, totalContents, requestNumber } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const manyBig = media[0];
  const generalSmall = !manyBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, ajaxForm, serviceParsing, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, downloadFile, blankHref, removeByClass, equalJson, svgMaker } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  return async function (e) {
    try {
      const commentPopupClassName = "commentPopupClassName";
      const proid = instance.project.proid;
      const designer = instance.designer.designer;
      const client = instance.client.name;
      const self = this;
      const zIndex = String(2);
      const activeUpload = !(/수집 완료/gi.test(instance.project.contents.raw.portfolio.status) || /편집중/gi.test(instance.project.contents.raw.portfolio.status) || /편집 완료/gi.test(instance.project.contents.raw.portfolio.status));
      const activeConfirm = !activeUpload;
      let cancelBack, whitePrompt, hiddenInput;
      let whitePromptWidth;
      let whitePromptPaddingTop;
      let whitePromptPaddingBottom;
      let whitePromptTitleHeight;
      let whitePromptButtonHeight;
      let whitePromptTitleSize;
      let whitePromptTitleWeight;
      let whitePromptTitleBoldWeight;
      let whitePromptTitleLineHeight;
      let whitePromptTitleTextTop;
      let whitePromptButtonBetween;
      let whitePromptButtonTextTop;
      let whitePromptButtonWidth;
      let whitePromptButtonSize;
      let whitePromptButtonWeight;

      whitePromptWidth = <%% 600, 600, 520, 450, 86 %%>;
      whitePromptPaddingTop = <%% 12, 12, 10, 8, 2 %%>;
      whitePromptPaddingBottom = <%% 40, 40, 36, 32, 5.6 %%>;
      whitePromptTitleHeight = <%% 110, 110, 100, 80, 16 %%>;
      whitePromptButtonHeight = <%% 35, 35, 32, 30, 6 %%>;

      whitePromptTitleSize = <%% 20, 20, 18, 16, 3.2 %%>;
      whitePromptTitleWeight = <%% 400, 400, 400, 400, 400 %%>;
      whitePromptTitleBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
      whitePromptTitleLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
      whitePromptTitleTextTop = <%% 0, 0, 0, 0, 0 %%>;

      whitePromptButtonBetween = <%% 6, 6, 5, 4, 1 %%>;
      whitePromptButtonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
      whitePromptButtonWidth = <%% 125, 125, 125, 115, 24 %%>;

      whitePromptButtonSize = <%% 13, 13, 12, 11, 2.5 %%>;
      whitePromptButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

      cancelBack = createNode({
        mother: totalContents,
        class: [ commentPopupClassName ],
        event: {
          click: (e) => {
            e.stopPropagation();
            removeByClass(commentPopupClassName);
          }
        },
        style: {
          top: String(0),
          left: String(0),
          width: withOut(0, ea),
          height: withOut(0, ea),
          background: colorChip.black,
          opacity: String(0.2),
          position: "fixed",
          zIndex: String(zIndex),
        }
      });

      hiddenInput = createNode({
        mother: totalContents,
        class: [ commentPopupClassName ],
        mode: "input",
        attribute: {
          type: "file",
          name: "comments",
          proid,
          designer,
          client
        },
        event: {
          change: async function (e) {
            try {
              const proid = this.getAttribute("proid");
              const designer = this.getAttribute("designer");
              const client = this.getAttribute("client");
              let thisFile, formData, res, loading;
              if ([ ...this.files ].length === 1) {
                thisFile = [ ...this.files ][0];

                formData = new FormData();
                formData.enctype = "multipart/form-data";
                formData.append("proid", proid);
                formData.append("designer", designer);
                formData.append("client", client);
                formData.append("comments", thisFile);
                formData.append("desid", instance.designer.desid);
                formData.append("cliid", instance.client.cliid);

                loading = instance.mother.grayLoading();

                [ res ] = equalJson(await ajaxForm(formData, BRIDGEHOST + "/middleCommentsBinary"));
                await ajaxJson({ whereQuery: { proid }, updateQuery: { "contents.raw.portfolio.status": "원본 수집 완료" } }, SECONDHOST + "/updateProject");
                await ajaxJson({
                  message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 디자이너 글을 업로드 했습니다!\n" + BACKHOST.replace(/\:3000/gi, '') + "/project__query__proid__equal__" + instance.project.proid + "__amper__raw__equal__contents",
                  channel: "#301_console",
                  target: instance.manager !== null ? [ instance.manager ] : null,
                }, BACKHOST + "/sendSlack");

                loading.remove();

                window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?proid=" + instance.project.proid + "&raw=contents";

                cancelBack.click();
              }
            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "none",
          opacity: String(0),
          position: "absolute",
        }
      });

      whitePrompt = createNode({
        mother: totalContents,
        class: [ commentPopupClassName ],
        event: {
          click: (e) => { e.stopPropagation() }
        },
        style: {
          display: "inline-block",
          position: "fixed",
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          width: String(whitePromptWidth) + ea,
          left: withOut(50, whitePromptWidth / 2, ea),
          top: withOut(50, ((whitePromptPaddingTop + whitePromptPaddingBottom + whitePromptTitleHeight + whitePromptButtonHeight) / 2), ea),
          paddingTop: String(whitePromptPaddingTop) + ea,
          paddingBottom: String(whitePromptPaddingBottom) + ea,
          zIndex: String(zIndex),
          animation: "fadeuplite 0.3s ease",
        },
        children: [
          {
            style: {
              display: "flex",
              position: "relative",
              height: String(whitePromptTitleHeight) + ea,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
            },
            children: [
              {
                text: "디자이너 글 탬플릿을 활용하여\n디자이너 글을 <b%워드 / pdf / 한글 등의 파일로 업로드%b> 해주세요!",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(whitePromptTitleTextTop) + ea,
                  fontSize: String(whitePromptTitleSize) + ea,
                  fontWeight: String(whitePromptTitleWeight),
                  color: colorChip.black,
                  lineHeight: String(whitePromptTitleLineHeight),
                },
                bold: {
                  fontSize: String(whitePromptTitleSize) + ea,
                  fontWeight: String(whitePromptTitleBoldWeight),
                  color: colorChip.black,
                }
              }
            ]
          },
          {
            style: {
              display: "flex",
              position: "relative",
              height: String(whitePromptButtonHeight) + ea,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "row",
            },
            children: [
              {
                event: {
                  click: async function (e) {
                    try {
                      const loading = instance.mother.whiteProgressLoading();
                      await downloadFile(S3HOST + "/photo/sample/commentsSample.docx", null, loading.progress.firstChild);
                      loading.remove();
                    } catch (e) {
                      console.log(e);
                    }
                  }
                },
                style: {
                  display: "inline-flex",
                  width: String(whitePromptButtonWidth) + ea,
                  height: String(whitePromptButtonHeight) + ea,
                  borderRadius: String(5) + "px",
                  background: colorChip.gradientGray,
                  marginRight: String(whitePromptButtonBetween) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                },
                children: [
                  {
                    text: "디자이너 글 탬플릿",
                    style: {
                      position: "relative",
                      top: String(whitePromptButtonTextTop) + ea,
                      fontSize: String(whitePromptButtonSize) + ea,
                      fontWeight: String(whitePromptButtonWeight),
                      color: colorChip.white,
                    }
                  }
                ]
              },
              {
                event: {
                  click: function (e) {
                    const targetInput = document.querySelector("input." + commentPopupClassName);
                    targetInput.click();
                  }
                },
                style: {
                  display: "inline-flex",
                  width: String(whitePromptButtonWidth) + ea,
                  height: String(whitePromptButtonHeight) + ea,
                  borderRadius: String(5) + "px",
                  background: activeUpload ? colorChip.gradientGreen : colorChip.gray2,
                  marginRight: String(whitePromptButtonBetween) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                },
                children: [
                  {
                    text: "디자이너 글 업로드",
                    style: {
                      position: "relative",
                      top: String(whitePromptButtonTextTop) + ea,
                      fontSize: String(whitePromptButtonSize) + ea,
                      fontWeight: String(whitePromptButtonWeight),
                      color: activeUpload ? colorChip.white : colorChip.deactive,
                    }
                  }
                ]
              },
              {
                event: {
                  click: instance.insertRawContentsBox(),
                },
                style: {
                  display: "inline-flex",
                  width: String(whitePromptButtonWidth) + ea,
                  height: String(whitePromptButtonHeight) + ea,
                  borderRadius: String(5) + "px",
                    background: activeUpload ? colorChip.gray2 : colorChip.gradientGreen,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                },
                children: [
                  {
                    text: "디자이너 글 확인",
                    style: {
                      position: "relative",
                      top: String(whitePromptButtonTextTop) + ea,
                      fontSize: String(whitePromptButtonSize) + ea,
                      fontWeight: String(whitePromptButtonWeight),
                        color: activeUpload ? colorChip.deactive : colorChip.white,
                    }
                  }
                ]
              },
            ]
          }
        ]
      });

    } catch (e) {
      console.log(e);
    }
  }
}

ProcessDetailJs.prototype.insertRawContentsBox = function () {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, removeByClass } = GeneralJs;
  const { project, requestNumber, ea, baseTong, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const rawCommentPopupClassName = "rawCommentPopupClassName";
  const rawCommentUpdateTargetClassName = "rawCommentUpdateTargetClassName";
  const zIndex = 4;
  return async function (e) {
    try {
      const designer = instance.designer;
      const client = instance.client;
      const proid = project.proid;
      const desid = project.desid;
      const cliid = project.cliid;
      let thisRawContents;
      let date, body;
      let cancelBack, whitePrompt;
      let whitePromptWidth;
      let whitePromptMarginTop;
      let realBaseTong;
      let realMargin;
      let dateCloseTong, contentsTong;
      let grayBlockBetween;
      let closeButtonHeight;
      let textMargin;
      let textSize;
      let textWeight;
      let textLineHeight;
      let updatedTextTop;
      let xIconWidth;
      let rawCommentUpdateEvent;
      let popupCloseEvent;

      whitePromptWidth = instance.standardWidth;
      whitePromptMarginTop = <%% 50, 50, 45, 40, 10 %%>;

      realMargin = <%% 20, 20, 16, 12, 2 %%>;
      grayBlockBetween = <%% 8, 6, 6, 4, 1 %%>;
      closeButtonHeight = <%% 50, 50, 45, 40, 9 %%>;

      textMargin = <%% 30, 30, 24, 20, 4 %%>;
      textSize = <%% 14, 14, 13, 12, 3.2 %%>;
      textWeight = <%% 400, 400, 400, 400, 400 %%>;
      textLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

      updatedTextTop = <%% -1, -1, -1, -1, -0.2 %%>;

      xIconWidth = <%% 16, 16, 14, 13, 3 %%>;

      thisRawContents = await ajaxJson({ mode: "get", proid, desid, cliid }, SECONDHOST + "/projectDesignerRaw", { equal: true });
      ({ date, contents: { body } } = thisRawContents);

      rawCommentUpdateEvent = function () {
        return async function (e) {
          try {
            const target = document.querySelector('.' + rawCommentUpdateTargetClassName);
            let body;
            let type;
            let mode;
            let response;
            if (target !== null) {
              mode = "update";
              type = "web";
              body = target.value.replace(/[\=\&]/gi, '').trim();
              response = await ajaxJson({ mode, proid, desid, cliid, body, type }, SECONDHOST + "/projectDesignerRaw");
            }
          } catch (e) {
            console.log(e);
          }
        }
      }

      popupCloseEvent = function () {
        return async function (e) {
          try {
            e.stopPropagation();
            rawCommentUpdateEvent().call(this, e);
            removeByClass(rawCommentPopupClassName);
          } catch (e) {
            console.log(e);
          }
        }
      }

      cancelBack = createNode({
        mother: totalContents,
        class: [ rawCommentPopupClassName ],
        event: {
          click: popupCloseEvent(),
        },
        style: {
          top: String(0),
          left: String(0),
          width: withOut(0, ea),
          height: withOut(0, ea),
          background: colorChip.black,
          opacity: String(0.3),
          position: "fixed",
          zIndex: String(zIndex),
        }
      });

      whitePrompt = createNode({
        mother: totalContents,
        class: [ rawCommentPopupClassName ],
        event: {
          click: (e) => { e.stopPropagation() }
        },
        style: {
          display: "inline-flex",
          position: "fixed",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          width: String(whitePromptWidth) + ea,
          height: "calc(calc(100vh - " + String(instance.naviHeight) + "px" + ") - " + String(whitePromptMarginTop * 2) + ea + ")",
          left: withOut(50, whitePromptWidth / 2, ea),
          top: "calc(" + String(instance.naviHeight) + "px" + " + " + String(whitePromptMarginTop) + ea + ")",
          zIndex: String(zIndex),
          animation: "fadeuplite 0.3s ease",
        }
      });

      realBaseTong = createNode({
        mother: whitePrompt,
        style: {
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: withOut(realMargin * 2, ea),
          height: withOut(realMargin * 2, ea),
        }
      });

      dateCloseTong = createNode({
        mother: realBaseTong,
        style: {
          display: "flex",
          flexDirection: "row",
          width: withOut(0, ea),
          height: String(closeButtonHeight) + ea,
          marginBottom: String(grayBlockBetween) + ea,
        },
        children: [
          {
            style: {
              display: "inline-flex",
              width: withOut(closeButtonHeight + grayBlockBetween, ea),
              height: String(closeButtonHeight) + ea,
              marginRight: String(grayBlockBetween) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray0,
              alignItems: "center",
              justifyContent: "start",
            },
            child: {
              text: "Updated : " + dateToString(date, true),
              style: {
                display: "inline-block",
                left: String(textMargin) + ea,
                top: String(updatedTextTop) + ea,
                position: "relative",
                fontSize: String(desktop ? textSize : 2.9) + ea,
                fontWeight: String(500),
                fontFamily: "graphik",
                fontStyle: "italic",
              }
            }
          },
          {
            event: {
              click: popupCloseEvent(),
            },
            style: {
              display: "inline-flex",
              width: String(closeButtonHeight) + ea,
              height: String(closeButtonHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray0,
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            },
            child: {
              mode: "svg",
              source: svgMaker.closeIcon(colorChip.shadow),
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(xIconWidth) + ea,
              }
            }
          }
        ]
      });

      contentsTong = createNode({
        mother: realBaseTong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: withOut(closeButtonHeight + grayBlockBetween, ea),
          borderRadius: String(5) + "px",
          background: colorChip.gray0,
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(textMargin * 2, ea),
            height: withOut(textMargin * 2, ea),
            overflow: "scroll",
          },
          child: {
            mode: "textarea",
            class: [ rawCommentUpdateTargetClassName ],
            text: body,
            event: {
              blur: rawCommentUpdateEvent(),
            },
            style: {
              width: withOut(0),
              height: withOut(0),
              fontSize: String(textSize) + ea,
              fontWeight: String(textWeight),
              color: colorChip.black,
              background: "transparent",
              border: String(0),
              outline: String(0),
              lineHeight: String(textLineHeight),
            }
          }
        }
      })

      contentsTong.firstChild.firstChild.value = body;
      contentsTong.firstChild.firstChild.focus();

    } catch (e) {
      console.log(e);
    }
  }
}

ProcessDetailJs.prototype.uploadFiles = function (thisStatusNumber, photoBoo) {
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

        if (!instance.nowUploading) {

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
  
                    if (!instance.nowUploading) {
                      loading = instance.asyncLoadingBlock();
  
                      ({ hash } = await ajaxJson({ mode: "crypto", string: String((new Date()).valueOf()) }, BACKHOST + "/homeliaisonCrypto", { equal: true }));
                      formData.append("name", hash);
    
                      res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                      await ajaxJson({ designer, desid, client, proid, title: thisTitle, mode: "designer" }, BRIDGEHOST + "/middlePhotoAlarm");
    
                      window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?proid=" + instance.project.proid;
  
                    } else {
                      instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");
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

        } else {

          instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");

        }

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        // window.location.reload();
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

        if (!instance.nowUploading) {

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
  
                    if (!instance.nowUploading) {
  
                      rawResponse = null;
                      rawResponse = await GeneralJs.prompt("파일에 대한 간단한 이름 또는 메모를 적어주세요! (예) 주방_시공의뢰서_1");
                      if (typeof rawResponse !== "string" || rawResponse.trim() === '') {
                        rawResponse = "메모 없음";
                      }
                      rawResponse = rawResponse.replace(/[\=\/\\\(\)\?\+\&]/gi, '').replace(/ /gi, '_');
  
                      loading = instance.asyncLoadingBlock();
  
                      ({ hash } = await ajaxJson({ mode: "crypto", string: rawResponse }, BACKHOST + "/homeliaisonCrypto", { equal: true }));
                      formData.append("name", hash);
    
                      res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary", loading.progress);
                      await ajaxJson({ designer, desid, client, proid, title: thisTitle, mode: "designer" }, BRIDGEHOST + "/middlePhotoAlarm");
    
                      window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?proid=" + instance.project.proid;
  
                    } else {
                      instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");
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

        } else {

          instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");

        }

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }

  }

}

ProcessDetailJs.prototype.dropFiles = function (thisStatusNumber, photoBoo) {
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

        if (!instance.nowUploading) {

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
  
                if (!instance.nowUploading) {
  
                  loading = instance.asyncLoadingBlock();
  
                  ({ hash } = await ajaxJson({ mode: "crypto", string: String((new Date()).valueOf()) }, BACKHOST + "/homeliaisonCrypto", { equal: true }));
                  formData.append("name", hash);
    
                  res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                  await ajaxJson({ designer, desid, client, proid, title: thisTitle, mode: "designer" }, BRIDGEHOST + "/middlePhotoAlarm");
    
                  window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?proid=" + instance.project.proid;
  
                } else {
                  instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");
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

        } else {

          instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");

        }

        this.style.background = colorChip.gray1;

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

        if (!instance.nowUploading) {

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
  
                if (!instance.nowUploading) {
  
                  rawResponse = null;
                  rawResponse = await GeneralJs.prompt("파일에 대한 간단한 이름 또는 메모를 적어주세요! (예) 주방_시공의뢰서_1");
                  if (typeof rawResponse !== "string" || rawResponse.trim() === '') {
                    rawResponse = "메모 없음";
                  }
                  rawResponse = rawResponse.replace(/[\=\/\\\(\)\?\+\&]/gi, '').replace(/ /gi, '_');
    
                  loading = instance.asyncLoadingBlock();
    
                  ({ hash } = await ajaxJson({ mode: "crypto", string: rawResponse }, BACKHOST + "/homeliaisonCrypto", { equal: true }));
                  formData.append("name", hash);
    
                  res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary");
                  await ajaxJson({ designer, desid, client, proid, title: thisTitle, mode: "designer" }, BRIDGEHOST + "/middlePhotoAlarm");
    
                  window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?proid=" + instance.project.proid;
  
                } else {
                  instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");
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

        } else {

          instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");

        }

        this.style.background = colorChip.gray1;

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }
  }


}

ProcessDetailJs.prototype.uploadLink = function (thisStatusNumber) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker } = GeneralJs;
  const { project, requestNumber, ea, baseTong, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  let serviceContents;
  let thisKey;
  let thisTitle;

  serviceContents = this.panContents;
  thisKey = serviceContents[thisStatusNumber].key;
  thisTitle = serviceContents[thisStatusNumber].title;

  return async function (e) {
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
        memo = await GeneralJs.prompt("링크에 대한 간단한 이름과 타입 등을 적어주세요! (예) 침실협탁_아이보리");
        if (typeof memo !== "string" || memo.trim() === '') {
          memo = "메모 없음";
        }

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
  }

}

ProcessDetailJs.prototype.plusMemo = function (thisStatusNumber) {
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

ProcessDetailJs.prototype.paymentByCard = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project, contentsRawInfo, totalContents, requestNumber } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const manyBig = media[0];
  const generalSmall = !manyBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, ajaxForm, serviceParsing, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, downloadFile, blankHref, removeByClass, equalJson, svgMaker } = GeneralJs;
  return (project) => {
    return async function (e) {
      try {
        const amount = 165000;
        const proid = project.proid;
        const cliid = project.cliid;
        const desid = project.desid;
        const impKey = "imp71921105";
        const loading = instance.mother.grayLoading();
        const { pluginScript, oidConst } = await ajaxJson({ mode: "script", oidKey: "designerPhoto" }, BACKHOST + "/generalImpPayment");
        const [ designer ] = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getDesigners", { equal: true });
        const [ client ] = await ajaxJson({ whereQuery: { cliid } }, SECONDHOST + "/getClients", { equal: true });
        let oid, plugin;
        let whereQuery, updateQuery;

        oid = oidConst + proid + "_" + String((new Date()).valueOf());
        plugin = new Function(pluginScript);
        plugin();
        window.IMP.init(impKey);
        if (desktop) {

          window.IMP.request_pay({
              pg: "inicis",
              pay_method: "card",
              merchant_uid: oid,
              name: "사진 촬영비",
              amount: Math.floor(amount),
              buyer_email: designer.information.email,
              buyer_name: designer.designer,
              buyer_tel: designer.information.phone,
          }, async (rsp) => {
            try {
              if (typeof rsp.status === "string" && /paid/gi.test(rsp.status)) {
                
                whereQuery = { proid };
                updateQuery = {};

                updateQuery["contents.payment.status"] = "결제 완료";
                updateQuery["contents.payment.date"] = new Date();
                updateQuery["contents.payment.calculation.amount"] = amount;
                updateQuery["contents.payment.calculation.info.method"] = `카드(${rsp.card_name.replace(/카드/gi, '')})`;
                updateQuery["contents.payment.calculation.info.proof"] = "이니시스";
                updateQuery["contents.payment.calculation.info.to"] = designer.designer;
                
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateProject");
                await ajaxJson({ message: designer.designer + " 실장님이 콘솔을 통해 " + client.name + " 고객님 촬영비를 결제하셨습니다!", channel: "#301_console" }, BACKHOST + "/sendSlack");

                window.alert("결제가 완료 되었습니다!");
                window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?proid=" + proid;

              } else {
                window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
                loading.remove();
              }
            } catch (e) {
              window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
              loading.remove();
            }
          });
        } else {

          ({ key } = await ajaxJson({ mode: "store", oid: oid, data: { oid } }, BACKHOST + "/generalImpPayment"));

          window.IMP.request_pay({
              pg: "inicis",
              pay_method: "card",
              merchant_uid: oid,
              name: "사진 촬영비",
              amount: Math.floor(amount),
              buyer_email: designer.information.email,
              buyer_name: designer.designer,
              buyer_tel: designer.information.phone,
              m_redirect_url: window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search + "&mobilecard=" + key,
          }, (rsp) => {});

        }

      } catch (e) {
        console.log(e);
      }
    }
  }
}

ProcessDetailJs.prototype.paymentByAccount = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project, contentsRawInfo, totalContents, requestNumber } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const manyBig = media[0];
  const generalSmall = !manyBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, ajaxForm, serviceParsing, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, downloadFile, blankHref, removeByClass, equalJson, svgMaker } = GeneralJs;
  return (project) => {
    return async function (e) {
      try {
        const amount = 165000;
        const goodname = "홈리에종 촬영비";
        const proid = project.proid;
        const cliid = project.cliid;
        const desid = project.desid;
        const requestNumber = instance.requestNumber;
        const designer = instance.designer;
        const name = designer.designer;
        const phone = designer.information.phone;
        const complete = 0;
        const date = new Date();
        let body;

        if (window.confirm("계좌 이체를 통해 결제를 하시겠습니까?")) {
          body = { requestNumber, proid, cliid, desid, goodname, date, name, phone, amount, complete };
          await ajaxJson({ designer: name, desid, body }, PYTHONHOST + "/designerTransfer");
          window.alert("카카오 채널을 통해 입금하실 통장과 금액을 안내해드렸습니다!");
        }

      } catch (e) {
        console.log(e);
      }
    }
  }
}

ProcessDetailJs.prototype.insertContentsBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, selfHref, scrollTo, blankHref, removeByClass } = GeneralJs;
  const buttonsClassName = "buttonsClassName";
  const blank = "<u%&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;%u>";
  const imageTargetClassName = "imageTargetClassName";
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
  let thisContents;
  let imageTargets;
  let titleBottom;
  let mobileTitleLeft;
  let mobileTitleTop;
  let numberRight;
  let titleTopNumber;
  let titleTop;
  let mobileInnerPaddingBottom;
  let imageTong;
  let imageBetween;
  let imageWidth, imageHeight;
  let portfolioText, reviewText;
  let textBoldWeight, textUnderWeight;
  let textBetween;
  let whiteBlockHeight;
  let smallButtonWidth, smallButtonHeight, smallButtonSize, smallButtonWeight, smallButtonTextTop;
  let thisTendency;
  let tendencyBox;
  let whitePaddingTop;
  let tendencyTitleBoxWidth;
  let tendencyContents;
  let tendencyTong;
  let whitePaddingBottom;
  let barTong;
  let barTongHeight, barHeight;
  let barTop;
  let whiteCircleWidth, whiteCircleMargin;
  let representative;
  let tendencySubTitleBoxWidth;
  let grayTongMarginTop;
  let tendencyLength;
  let detailInfo;
  let imagePromptEvent;
  let promptPadding;
  let promptButtonWidth, promptButtonHeight, promptButtonBetween;
  let promptSize, promptWeight, promptTextTop;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 44, 44, 36, 28, 5.4 %%>;

  whiteBottomMargin = <%% 46, 46, 46, 38, 5.6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 12, 12, 10, 10, 0 %%>;

  textTextTop = <%% (isMac() ? -1 : 2), (isMac() ? -1 : 2), (isMac() ? -1 : 1), (isMac() ? -1 : 1), 0 %%>;
  smallTextTop = <%% -1, -1, -1, -1, 0 %%>;

  textSize = <%% 16, 15, 14, 13, 2.9 %%>;
  textWeight = <%% 300, 300, 300, 300, 300 %%>;
  textBoldWeight = <%% 600, 600, 600, 600, 700 %%>;
  textUnderWeight = <%% 300, 300, 300, 300, 300 %%>;
  textFileWeight = <%% 500, 500, 500, 500, 500 %%>;

  textBetween = <%% 8, 8, 8, 8, 1 %%>;

  whitePadding = <%% 24, 24, 22, 20, 0 %%>;

  blockBetween = <%% 8, 8, 8, 8, 1 %%>;
  blockBetweenBottom = <%% 10, 4, 4, 4, 3 %%>;
  blockHeight = <%% 36, 36, 32, 26, 4 %%>;

  lineTop = <%% 18, 18, 16, 13, 1.9 %%>;

  columnsNumber = <%% 4, 3, 3, 3, 2 %%>;

  smallSize = <%% 11, 11, 10, 10, 2.5 %%>;
  smallWeight = <%% 400, 400, 400, 400, 400 %%>;
  smallBetween = <%% 5, 5, 4, 4, 0 %%>;

  mobileVisualPaddingValue = 0.2;

  titleBottom = <%% (isMac() ? 16 : 15), (isMac() ? 16 : 15), (isMac() ? 16 : 15), (isMac() ? 16 : 15), 0 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  numberRight = <%% 12, 12, 12, 12, 3 %%>;
  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  mobileInnerPaddingBottom = 0;

  imageBetween = <%% 8, 8, 6, 4, 1 %%>;

  imageWidth = <%% 154, 150, 196, 157, 37.5 %%>;
  imageHeight = <%% 224, 220, 277, 224, 53 %%>;

  whiteBlockHeight = <%% 60, 60, 56, 48, 7 %%>;

  smallButtonWidth = <%% 100, 100, 100, 90, 16 %%>;
  smallButtonHeight = <%% 30, 30, 30, 28, 4.8 %%>;
  smallButtonSize = <%% 12, 12, 12, 11, 2.5 %%>;
  smallButtonWeight = <%% 800, 800, 800, 800, 800 %%>;
  smallButtonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.1 %%>;

  whitePaddingTop = <%% (isMac() ? 20 : 22), (isMac() ? 20 : 22), (isMac() ? 18 : 20), (isMac() ? 16 : 17), 2 %%>;
  whitePaddingBottom = <%% (isMac() ? 13 : 12), (isMac() ? 13 : 12), (isMac() ? 12 : 11), (isMac() ? 11 : 10), 1 %%>;
  
  tendencyTitleBoxWidth = <%% 160, 140, 120, 120, 21 %%>;
  tendencySubTitleBoxWidth = <%% 100, 90, 80, 70, 14 %%>;

  barTongHeight = <%% 28, 28, 24, 22, 4.1 %%>;
  barHeight = <%% 16, 16, 15, 12, 2 %%>;
  barTop = <%% (isMac() ? 2 : 0), (isMac() ? 2 : 0), (isMac() ? 2 : 0), (isMac() ? 3 : 1), 1 %%>;

  whiteCircleMargin = <%% 12, 12, 12, 12, 2.5 %%>;
  whiteCircleWidth = <%% 16, 16, 16, 16, 3.2 %%>;

  grayTongMarginTop = <%% 20, 20, 20, 20, 4 %%>;

  tendencyLength = 10;

  promptPadding = <%% 6, 6, 6, 4, 1.2 %%>;
  promptButtonWidth = <%% 140, 140, 140, 130, 32 %%>;
  promptButtonHeight = <%% 30, 30, 30, 28, 7 %%>;
  promptButtonBetween = <%% 4, 4, 4, 2, 0.8 %%>;

  promptSize = <%% 12, 12, 12, 11, 2.7 %%>
  promptWeight = <%% 700, 700, 700, 700, 700 %%>
  promptTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>

  [ thisContents ] = this.contentsArr;
  ({ contents: { portfolio: { detailInfo: { photodae: representative, tendency: thisTendency } }, review: { detailInfo } } } = thisContents);
  representative = representative.concat(detailInfo.photodae);
  
  if (media[0]) {
    portfolioText = "<b%" + thisContents.contents.portfolio.title.main + "%b>" + blank + thisContents.contents.portfolio.spaceInfo.region + blank + thisContents.contents.portfolio.spaceInfo.method + blank + "<u%" + dateToString(thisContents.contents.portfolio.date, true) + "%u>";
  } else if (media[1] || media[2]) {
    portfolioText = "<b%" + thisContents.contents.portfolio.title.main + "%b>" + blank + thisContents.contents.portfolio.spaceInfo.region + blank + thisContents.contents.portfolio.spaceInfo.method;
  } else if (media[3]) {
    portfolioText = "<b%" + thisContents.contents.portfolio.title.main + "%b>" + blank + thisContents.contents.portfolio.spaceInfo.region;
  } else {
    portfolioText = "<b%" + thisContents.contents.portfolio.title.sub + "%b>";
  }

  if (/999/gi.test(thisContents.contents.review.rid)) {
    reviewText = "";
  } else {
    if (media[0]) {
      reviewText = "<b%" + thisContents.contents.review.title.main + "%b>" + blank + thisContents.contents.review.title.sub + blank + "<u%" + dateToString(thisContents.contents.review.date, true) + "%u>";
    } else if (media[1] || media[2]) {
      reviewText = "<b%" + thisContents.contents.review.title.main + "%b>" + blank + thisContents.contents.review.title.sub;
    } else if (media[3]) {
      reviewText = "<b%" + thisContents.contents.review.title.main + "%b>";
    } else {
      reviewText = "<b%" + thisContents.contents.review.title.sub + "%b>";
    }
  }

  tendencyContents = [
    {
      title: "스타일 경향성",
      children: [
        {
          title: "모던",
          position: "contents.portfolio.detailInfo.tendency.style.modern",
          value: thisTendency.style.modern
        },
        {
          title: "클래식",
          position: "contents.portfolio.detailInfo.tendency.style.classic",
          value: thisTendency.style.classic
        },
        {
          title: "내추럴",
          position: "contents.portfolio.detailInfo.tendency.style.natural",
          value: thisTendency.style.natural
        },
        {
          title: "믹스매치",
          position: "contents.portfolio.detailInfo.tendency.style.mixmatch",
          value: thisTendency.style.mixmatch
        },
        {
          title: "북유럽",
          position: "contents.portfolio.detailInfo.tendency.style.scandinavian",
          value: thisTendency.style.scandinavian
        },
        {
          title: "빈티지",
          position: "contents.portfolio.detailInfo.tendency.style.vintage",
          value: thisTendency.style.vintage
        },
        {
          title: "오리엔탈",
          position: "contents.portfolio.detailInfo.tendency.style.oriental",
          value: thisTendency.style.oriental
        },
        {
          title: "이그저틱",
          position: "contents.portfolio.detailInfo.tendency.style.exotic",
          value: thisTendency.style.exotic
        },
      ]
    },
    {
      title: "텍스처 경향성",
      children: [
        {
          title: "진한 우드",
          position: "contents.portfolio.detailInfo.tendency.texture.darkWood",
          value: thisTendency.texture.darkWood
        },
        {
          title: "연한 우드",
          position: "contents.portfolio.detailInfo.tendency.texture.whiteWood",
          value: thisTendency.texture.whiteWood
        },
        {
          title: "도장",
          position: "contents.portfolio.detailInfo.tendency.texture.coating",
          value: thisTendency.texture.coating
        },
        {
          title: "금속",
          position: "contents.portfolio.detailInfo.tendency.texture.metal",
          value: thisTendency.texture.metal
        },
      ]
    },
    {
      title: "컬러톤 경향성",
      children: [
        {
          title: "다크 우드",
          position: "contents.portfolio.detailInfo.tendency.color.darkWood",
          value: thisTendency.color.darkWood
        },
        {
          title: "밝은 우드",
          position: "contents.portfolio.detailInfo.tendency.color.whiteWood",
          value: thisTendency.color.whiteWood
        },
        {
          title: "고대비",
          position: "contents.portfolio.detailInfo.tendency.color.highContrast",
          value: thisTendency.color.highContrast
        },
        {
          title: "비비드",
          position: "contents.portfolio.detailInfo.tendency.color.vivid",
          value: thisTendency.color.vivid
        },
        {
          title: "화이트",
          position: "contents.portfolio.detailInfo.tendency.color.white",
          value: thisTendency.color.white
        },
        {
          title: "모노톤",
          position: "contents.portfolio.detailInfo.tendency.color.mono",
          value: thisTendency.color.mono
        },
        {
          title: "밝은톤",
          position: "contents.portfolio.detailInfo.tendency.color.bright",
          value: thisTendency.color.bright
        },
        {
          title: "어두운톤",
          position: "contents.portfolio.detailInfo.tendency.color.dark",
          value: thisTendency.color.dark
        },
      ]
    },
    {
      title: "밀도 경향성",
      children: [
        {
          title: "맥시멈",
          position: "contents.portfolio.detailInfo.tendency.density.maximun",
          value: thisTendency.density.maximun
        },
        {
          title: "미니멈",
          position: "contents.portfolio.detailInfo.tendency.density.minimum",
          value: thisTendency.density.minimum
        },
      ]
    },
  ];

  imagePromptEvent = function (e) {

    e.stopPropagation();
    e.preventDefault();

    const zIndex = 5;
    const imagePromptClassName = "imagePromptClassName";
    const { x, y } = e;
    const gs = this.getAttribute("gs");
    const index = Number(this.getAttribute("index"));
    const conid = this.getAttribute("conid");
    let cancelBack, whitePrompt;
    let buttonList;
    let num;

    buttonList = [
      {
        title: "포트폴리오 대표 사진으로",
        click: async function (e) {
          try {
            const gs = this.getAttribute("gs");
            const index = Number(this.getAttribute("index"));
            const targets = [ ...document.querySelectorAll('.' + imageTargetClassName + gs) ];
            const conid = this.getAttribute("conid");
            const [ thisContents ] = await ajaxJson({ whereQuery: { conid } }, SECONDHOST + "/getContents", { equal: true });
            let newRepresentative;
            let newOnArr;
            let whereQuery, updateQuery;
            let thisIndex;
            let check, pan;

            whereQuery = { conid };
            updateQuery = {};

            newRepresentative = null;
            newOnArr = null;

            if (gs === 's') {
              if (index !== thisContents.contents.portfolio.detailInfo.photodae[0] && index !== thisContents.contents.review.detailInfo.photodae[0]) {
                newRepresentative = [ index, thisContents.contents.portfolio.detailInfo.photodae[1] ];
                newOnArr = [ index, thisContents.contents.review.detailInfo.photodae[0] ];
  
                for (let dom of targets) {
                  thisIndex = Number(dom.getAttribute("index"));
                  dom.setAttribute("toggle", newOnArr.includes(thisIndex) ? "on" : "off");
                  [ check, pan ] = [ ...dom.children ];
                  check.firstChild.style.display = newOnArr.includes(thisIndex) ? "block" : "none";
                  pan.style.opacity = newOnArr.includes(thisIndex) ? String(0.2) : String(0);
                }

                updateQuery["contents.portfolio.detailInfo.photodae"] = newRepresentative;
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateContents");
                await ajaxJson({ whereQuery, updateQuery }, LOGHOST + "/updateContents");

              } else if (index === thisContents.contents.review.detailInfo.photodae[0]) {

                newRepresentative = [ index, thisContents.contents.portfolio.detailInfo.photodae[1] ];
                newOnArr = [ index, thisContents.contents.portfolio.detailInfo.photodae[0] ];

                for (let dom of targets) {
                  thisIndex = Number(dom.getAttribute("index"));
                  dom.setAttribute("toggle", newOnArr.includes(thisIndex) ? "on" : "off");
                  [ check, pan ] = [ ...dom.children ];
                  check.firstChild.style.display = newOnArr.includes(thisIndex) ? "block" : "none";
                  pan.style.opacity = newOnArr.includes(thisIndex) ? String(0.2) : String(0);
                }

                updateQuery["contents.portfolio.detailInfo.photodae"] = newRepresentative;
                updateQuery["contents.review.detailInfo.photodae"] = [ thisContents.contents.portfolio.detailInfo.photodae[0], thisContents.contents.review.detailInfo.photodae[1] ];
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateContents");
                await ajaxJson({ whereQuery, updateQuery }, LOGHOST + "/updateContents");

              }
            } else {
              if (index !== thisContents.contents.portfolio.detailInfo.photodae[1] && index !== thisContents.contents.review.detailInfo.photodae[1]) {
                newRepresentative = [ thisContents.contents.portfolio.detailInfo.photodae[0], index ];
                newOnArr = [ thisContents.contents.review.detailInfo.photodae[1], index ];
  
                for (let dom of targets) {
                  thisIndex = Number(dom.getAttribute("index"));
                  dom.setAttribute("toggle", newOnArr.includes(thisIndex) ? "on" : "off");
                  [ check, pan ] = [ ...dom.children ];
                  check.firstChild.style.display = newOnArr.includes(thisIndex) ? "block" : "none";
                  pan.style.opacity = newOnArr.includes(thisIndex) ? String(0.2) : String(0);
                }

                updateQuery["contents.portfolio.detailInfo.photodae"] = newRepresentative;
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateContents");
                await ajaxJson({ whereQuery, updateQuery }, LOGHOST + "/updateContents");

              } else if (index === thisContents.contents.review.detailInfo.photodae[1]) {

                newRepresentative = [ thisContents.contents.portfolio.detailInfo.photodae[0], index ];
                newOnArr = [ thisContents.contents.portfolio.detailInfo.photodae[1], index ];

                for (let dom of targets) {
                  thisIndex = Number(dom.getAttribute("index"));
                  dom.setAttribute("toggle", newOnArr.includes(thisIndex) ? "on" : "off");
                  [ check, pan ] = [ ...dom.children ];
                  check.firstChild.style.display = newOnArr.includes(thisIndex) ? "block" : "none";
                  pan.style.opacity = newOnArr.includes(thisIndex) ? String(0.2) : String(0);
                }

                updateQuery["contents.portfolio.detailInfo.photodae"] = newRepresentative;
                updateQuery["contents.review.detailInfo.photodae"] = [ thisContents.contents.review.detailInfo.photodae[0], thisContents.contents.portfolio.detailInfo.photodae[1] ];
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateContents");
                await ajaxJson({ whereQuery, updateQuery }, LOGHOST + "/updateContents");

              }

            }
            removeByClass(imagePromptClassName);
          } catch (e) {
            console.log(e);
          }
        }
      },
      {
        title: "고객 후기 대표 사진으로",
        click: async function (e) {
          try {
            const gs = this.getAttribute("gs");
            const index = Number(this.getAttribute("index"));
            const targets = [ ...document.querySelectorAll('.' + imageTargetClassName + gs) ];
            const conid = this.getAttribute("conid");
            const [ thisContents ] = await ajaxJson({ whereQuery: { conid } }, SECONDHOST + "/getContents", { equal: true });
            let newRepresentative;
            let newOnArr;
            let whereQuery, updateQuery;
            let thisIndex;
            let check, pan;

            whereQuery = { conid };
            updateQuery = {};

            newRepresentative = null;
            newOnArr = null;

            if (gs === 's') {
              if (index !== thisContents.contents.portfolio.detailInfo.photodae[0] && index !== thisContents.contents.review.detailInfo.photodae[0]) {
                newRepresentative = [ index, thisContents.contents.review.detailInfo.photodae[1] ];
                newOnArr = [ index, thisContents.contents.portfolio.detailInfo.photodae[0] ];
  
                for (let dom of targets) {
                  thisIndex = Number(dom.getAttribute("index"));
                  dom.setAttribute("toggle", newOnArr.includes(thisIndex) ? "on" : "off");
                  [ check, pan ] = [ ...dom.children ];
                  check.firstChild.style.display = newOnArr.includes(thisIndex) ? "block" : "none";
                  pan.style.opacity = newOnArr.includes(thisIndex) ? String(0.2) : String(0);
                }

                updateQuery["contents.review.detailInfo.photodae"] = newRepresentative;
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateContents");
                await ajaxJson({ whereQuery, updateQuery }, LOGHOST + "/updateContents");

              } else if (index === thisContents.contents.portfolio.detailInfo.photodae[0]) {

                newRepresentative = [ index, thisContents.contents.review.detailInfo.photodae[1] ];
                newOnArr = [ index, thisContents.contents.review.detailInfo.photodae[0] ];

                for (let dom of targets) {
                  thisIndex = Number(dom.getAttribute("index"));
                  dom.setAttribute("toggle", newOnArr.includes(thisIndex) ? "on" : "off");
                  [ check, pan ] = [ ...dom.children ];
                  check.firstChild.style.display = newOnArr.includes(thisIndex) ? "block" : "none";
                  pan.style.opacity = newOnArr.includes(thisIndex) ? String(0.2) : String(0);
                }

                updateQuery["contents.review.detailInfo.photodae"] = newRepresentative;
                updateQuery["contents.portfolio.detailInfo.photodae"] = [ thisContents.contents.review.detailInfo.photodae[0], thisContents.contents.portfolio.detailInfo.photodae[1] ];
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateContents");
                await ajaxJson({ whereQuery, updateQuery }, LOGHOST + "/updateContents");

              }
            } else {
              if (index !== thisContents.contents.portfolio.detailInfo.photodae[1] && index !== thisContents.contents.review.detailInfo.photodae[1]) {
                newRepresentative = [ thisContents.contents.review.detailInfo.photodae[0], index ];
                newOnArr = [ thisContents.contents.portfolio.detailInfo.photodae[1], index ];
  
                for (let dom of targets) {
                  thisIndex = Number(dom.getAttribute("index"));
                  dom.setAttribute("toggle", newOnArr.includes(thisIndex) ? "on" : "off");
                  [ check, pan ] = [ ...dom.children ];
                  check.firstChild.style.display = newOnArr.includes(thisIndex) ? "block" : "none";
                  pan.style.opacity = newOnArr.includes(thisIndex) ? String(0.2) : String(0);
                }

                updateQuery["contents.review.detailInfo.photodae"] = newRepresentative;
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateContents");
                await ajaxJson({ whereQuery, updateQuery }, LOGHOST + "/updateContents");

              } else if (index === thisContents.contents.portfolio.detailInfo.photodae[1]) {

                newRepresentative = [ thisContents.contents.review.detailInfo.photodae[0], index ];
                newOnArr = [ thisContents.contents.review.detailInfo.photodae[1], index ];

                for (let dom of targets) {
                  thisIndex = Number(dom.getAttribute("index"));
                  dom.setAttribute("toggle", newOnArr.includes(thisIndex) ? "on" : "off");
                  [ check, pan ] = [ ...dom.children ];
                  check.firstChild.style.display = newOnArr.includes(thisIndex) ? "block" : "none";
                  pan.style.opacity = newOnArr.includes(thisIndex) ? String(0.2) : String(0);
                }

                updateQuery["contents.review.detailInfo.photodae"] = newRepresentative;
                updateQuery["contents.portfolio.detailInfo.photodae"] = [ thisContents.contents.portfolio.detailInfo.photodae[0], thisContents.contents.review.detailInfo.photodae[1] ];
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateContents");
                await ajaxJson({ whereQuery, updateQuery }, LOGHOST + "/updateContents");

              }

            }
            removeByClass(imagePromptClassName);
          } catch (e) {
            console.log(e);
          }
        }
      },
    ];

    cancelBack = createNode({
      mother: totalContents,
      class: [ imagePromptClassName ],
      event: {
        click: (e) => {
          removeByClass(imagePromptClassName);
        }
      },
      style: {
        position: "fixed",
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(100) + '%',
        height: String(100) + '%',
        background: "transparent",
      }
    })

    whitePrompt = createNode({
      mother: totalContents,
      class: [ imagePromptClassName ],
      style: {
        position: "fixed",
        top: String(y) + "px",
        left: desktop ? (String(x) + "px") : ("calc(" + String(x) + "px" + " - " + String(promptButtonWidth / 2) + ea + ")"),
        padding: String(promptPadding) + ea,
        background: colorChip.white,
        borderRadius: String(8) + "px",
        animation: "fadeuplite 0.3s ease forwards",
        boxShadow: "0px 5px 15px -9px " + colorChip.shadow,
      }
    })

    num = 0;
    for (let { title, click } of buttonList) {
      createNode({
        mother: whitePrompt,
        event: { click },
        attribute: { gs, index: String(index), conid, },
        style: {
          display: "flex",
          position: "relative",
          width: String(promptButtonWidth) + ea,
          height: String(promptButtonHeight) + ea,
          marginBottom: num === buttonList.length - 1 ? "" : String(promptButtonBetween) + ea,
          background: colorChip.gradientGreen,
          borderRadius: String(5) + "px",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        },
        child: {
          text: title,
          style: {
            position: "relative",
            fontSize: String(promptSize) + ea,
            fontWeight: String(promptWeight),
            color: colorChip.white,
            top: String(promptTextTop) + ea,
          }
        }
      })

      num++;
    }

  }

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

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      height: desktop ? "" : String(9) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: mobile ? "absolute" : "relative",
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: "컨텐츠 설정",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: colorChip.white,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
    ]
  });


  // images

  imageTong = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(imageBetween * -1, ea),
      background: colorChip.white,
    }
  });

  imageTargets = thisContents.photos.detail.map((obj) => {
    obj.src = FRONTHOST + "/list_image/portp" + thisContents.contents.portfolio.pid + "/t" + String(obj.index) + thisContents.contents.portfolio.pid + ".jpg";
    return obj;
  });

  for (let { src, gs, index } of imageTargets) {
    createNode({
      mother: imageTong,
      class: [ imageTargetClassName + gs ],
      attribute: {
        index: String(index),
        toggle: representative.includes(index) ? "on" : "off",
        gs,
        conid: thisContents.conid,
      },
      event: {
        click: imagePromptEvent,
        contextmenu: imagePromptEvent,
        mouseenter: function (e) {
          if (desktop) {
            this.style.opacity = String(0.7);
          }
        },
        mouseleave: function (e) {
          if (desktop) {
            this.style.opacity = String(1);
          }
        },
      },
      style: {
        display: "inline-block",
        position: "relative",
        width: String(gs === 's' ? imageWidth : (imageWidth * 2) + imageBetween) + ea,
        height: String(imageHeight) + ea,
        borderRadius: String(5) + "px",
        marginRight: String(imageBetween) + ea,
        marginBottom: String(imageBetween) + ea,
        backgroundImage: "url('" + src + "')",
        backgroundPosition: "50% 50%",
        backgroundSize: "100% 100%",
        opacity: String(1),
        transition: "all 0.3s ease",
        cursor: "pointer",
      },
      child: {
        style: {
          display: "inline-flex",
          position: "absolute",
          top: String(whiteCircleMargin) + ea,
          left: String(whiteCircleMargin) + ea,
          width: String(whiteCircleWidth) + ea,
          height: String(whiteCircleWidth) + ea,
          borderRadius: String(whiteCircleWidth) + ea,
          background: colorChip.white,
          opacity: String(0.9),
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          mode: "svg",
          source: svgMaker.checkCircle(colorChip.green),
          style: {
            display: representative.includes(index) ? "block" : "none",
            position: "relative",
            width: String(whiteCircleWidth) + ea,
          }
        },
        next: {
          style: {
            display: "block",
            position: "absolute",
            top: String(0),
            left: String(0),
            width: withOut(0, ea),
            height: withOut(0, ea),
            background: colorChip.green,
            opacity: representative.includes(index) ? String(0.2) : String(0),
          }
        }
      }
    })
  }

  // links

  grayTong = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(innerMargin) + ea,
      paddingBottom: String(innerMargin) + ea,
      paddingLeft: String(innerMargin) + ea,
      paddingRight: String(innerMargin) + ea,
      width: withOut(innerMargin * 2, ea),
      background: desktop ? colorChip.gray2 : colorChip.white,
      borderRadius: String(8) + "px",
      marginTop: String(grayTongMarginTop) + ea,
    }
  });

  // portfolio
  createNode({
    mother: grayTong,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      background: colorChip.white,
      borderRadius: String(8) + "px",
      boxShadow: desktop ? "0px 3px 15px -9px " + colorChip.shadow : "",
      height: String(whiteBlockHeight) + ea,
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "center",
    },
    children: [
      {
        text: thisContents.contents.portfolio.pid,
        style: {
          display: desktop ? "inline-block" : "none",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(textFileWeight),
          color: colorChip.gray4,
          fontFamily: "graphik",
          fontStyle: "italic",
          marginLeft: String(whitePadding) + ea,
          marginRight: String(textBetween) + ea,
          top: String(smallTextTop) + ea,
        }
      },
      {
        text: portfolioText,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.black,
          top: String(textTextTop) + ea,
        },
        bold: {
          fontSize: String(textSize) + ea,
          fontWeight: String(textBoldWeight),
          color: colorChip.black,
        },
        under: {
          fontSize: String(textSize) + ea,
          fontWeight: String(textUnderWeight),
          color: colorChip.gray4,
        }
      },
      {
        attribute: {
          pid: thisContents.contents.portfolio.pid
        },
        event: {
          click: function (e) {
            const pid = this.getAttribute("pid");
            blankHref(FRONTHOST + "/portdetail.php?pid=" + pid);
          }
        },
        style: {
          display: "inline-flex",
          position: "absolute",
          width: String(smallButtonWidth) + ea,
          height: String(smallButtonHeight) + ea,
          top: desktop ? String((whiteBlockHeight - smallButtonHeight) / 2) + ea : String(1.2) + ea,
          right: desktop ? String((whiteBlockHeight - smallButtonHeight) / 2) + ea : String(0),
          borderRadius: String(8) + ea,
          background: colorChip.gradientGreen,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        },
        child: {
          text: desktop ? "포트폴리오 보기" : "포트폴리오",
          style: {
            fontSize: String(smallButtonSize) + ea,
            fontWeight: String(smallButtonWeight),
            color: colorChip.white,
            position: "relative",
            top: String(smallButtonTextTop) + ea,
          }
        }
      }
    ]
  });

  // review
  if (reviewText !== "") {
    createNode({
      mother: grayTong,
      style: {
        display: "flex",
        marginTop: String(blockBetween) + ea,
        position: "relative",
        width: withOut(0, ea),
        background: colorChip.white,
        borderRadius: String(8) + "px",
        boxShadow: desktop ? "0px 3px 15px -9px " + colorChip.shadow : "",
        height: String(whiteBlockHeight) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
      },
      children: [
        {
          text: thisContents.contents.portfolio.pid,
          style: {
            display: desktop ? "inline-block" : "none",
            position: "relative",
            fontSize: String(textSize) + ea,
            fontWeight: String(textFileWeight),
            color: colorChip.gray4,
            fontFamily: "graphik",
            fontStyle: "italic",
            marginLeft: String(whitePadding) + ea,
            marginRight: String(textBetween) + ea,
            top: String(smallTextTop) + ea,
          }
        },
        {
          text: reviewText,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(textSize) + ea,
            fontWeight: String(textWeight),
            color: colorChip.black,
            top: String(textTextTop) + ea,
          },
          bold: {
            fontSize: String(textSize) + ea,
            fontWeight: String(textBoldWeight),
            color: colorChip.black,
          },
          under: {
            fontSize: String(textSize) + ea,
            fontWeight: String(textUnderWeight),
            color: colorChip.gray4,
          }
        },
        {
          attribute: {
            pid: thisContents.contents.portfolio.pid
          },
          event: {
            click: function (e) {
              const pid = this.getAttribute("pid");
              blankHref(FRONTHOST + "/revdetail.php?pid=" + pid);
            }
          },
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(smallButtonWidth) + ea,
            height: String(smallButtonHeight) + ea,
            top: desktop ? String((whiteBlockHeight - smallButtonHeight) / 2) + ea : String(1.2) + ea,
            right: desktop ? String((whiteBlockHeight - smallButtonHeight) / 2) + ea : String(0),
            borderRadius: String(8) + ea,
            background: colorChip.gradientGreen,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          child: {
            text: desktop ? "고객 후기 보기" : "고객 후기",
            style: {
              fontSize: String(smallButtonSize) + ea,
              fontWeight: String(smallButtonWeight),
              color: colorChip.white,
              position: "relative",
              top: String(smallButtonTextTop) + ea,
            }
          }
        }
      ]
    });
  }

  // tendency
  for (let i = 0; i < tendencyContents.length; i++) {
    tendencyBox = createNode({
      mother: grayTong,
      style: {
        display: "flex",
        marginTop: String(blockBetween) + ea,
        position: "relative",
        width: withOut(whitePadding * 2, ea),
        background: colorChip.white,
        borderRadius: String(8) + "px",
        boxShadow: desktop ? "0px 3px 15px -9px " + colorChip.shadow : "",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
        paddingLeft: String(whitePadding) + ea,
        paddingRight: String(whitePadding) + ea,
        paddingTop: String(whitePaddingTop) + ea,
        paddingBottom: String(whitePaddingBottom) + ea,
      },
    });
  
    createNode({
      mother: tendencyBox,
      style: {
        display: "inline-flex",
        width: String(tendencyTitleBoxWidth) + ea,
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        verticalAlign: "top",
      },
      child: {
        text: tendencyContents[i].title,
        style: {
          display: "block",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        }
      }
    });
  
    tendencyTong = createNode({
      mother: tendencyBox,
      style: {
        display: "inline-flex",
        verticalAlign: "top",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: withOut(tendencyTitleBoxWidth, ea),
      }
    })
  
    for (z = 0; z < tendencyContents[i].children.length; z++) {
      barTong = createNode({
        mother: tendencyTong,
        style: {
          display: "flex",
          width: withOut(0, ea),
          height: String(barTongHeight) + ea,
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: tendencyContents[i].children[z].title,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textWeight),
              color: colorChip.black,
              width: String(tendencySubTitleBoxWidth) + ea,
            }
          },
          {
            style: {
              display: "inline-flex",
              flexDirection: "row",
              position: "relative",
              width: withOut(tendencySubTitleBoxWidth, ea),
              height: String(barHeight) + ea,
              overflow: "hidden",
              borderRadius: String(5) + "px",
              top: String(barTop) + ea,
              background: colorChip.gray2,
            }
          }
        ]
      }).children[1];
  
      for (let y = 0; y < tendencyLength; y++) {
        createNode({
          mother: barTong,
          class: [ tendencyContents[i].children[z].position.replace(/\./gi, '') ],
          attribute: {
            position: tendencyContents[i].children[z].position,
            index: String(y + 1),
            conid: thisContents.conid,
            toggle: (y + 1) <= tendencyContents[i].children[z].value ? "on" : "off",
          },
          event: {
            click: async function (e) {
              try {
                const position = this.getAttribute("position");
                const index = Number(this.getAttribute("index"));
                const className = position.replace(/\./gi, '');
                const targets = [ ...document.querySelectorAll('.' + className) ];
                const conid = this.getAttribute("conid");
                let newValue;
                let whereQuery, updateQuery;

                targets.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) });

                newValue = index;

                for (let i = 0; i < tendencyLength; i++) {
                  targets[i].style.background = (i + 1) <= newValue ? colorChip.green : colorChip.gray2;
                  targets[i].style.borderTopRightRadius = (i + 1) === newValue ? String(5) + "px" : "";
                  targets[i].style.borderBottomRightRadius = (i + 1) === newValue ? String(5) + "px" : "";
                  targets[i].setAttribute("toggle", (i + 1) <= newValue ? "on" : "off")
                }

                whereQuery = { conid };
                updateQuery = {};
                updateQuery[position] = newValue;
                
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateContents");
                await ajaxJson({ whereQuery, updateQuery }, LOGHOST + "/updateContents");

              } catch (e) {
                console.log(e);
              }
            },
            mouseenter: function (e) {
              const toggle = this.getAttribute("toggle");
              if (toggle === "on") {
                this.style.background = colorChip.softGreen;
              } else {
                this.style.background = colorChip.gray3;
              }
            },
            mouseleave: function (e) {
              const toggle = this.getAttribute("toggle");
              if (toggle === "on") {
                this.style.background = colorChip.green;
              } else {
                this.style.background = colorChip.gray2;
              }
            }
          },
          style: {
            display: "inline-block",
            width: "calc(100% / " + String(tendencyLength) + ")",
            height: withOut(0, ea),
            background: (y + 1) <= tendencyContents[i].children[z].value ? colorChip.green : colorChip.gray2,
            borderTopRightRadius: (y + 1) === tendencyContents[i].children[z].value ? String(5) + "px" : "",
            borderBottomRightRadius: (y + 1) === tendencyContents[i].children[z].value ? String(5) + "px" : "",
            cursor: "pointer",
            transition: "all 0s ease",
          }
        })
      }
  
    }
  }

}

ProcessDetailJs.prototype.insertPhotoPayBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray } = GeneralJs;
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
  let veryBigSize;
  let veryBigWeight;
  let firstWidth;
  let buttonWidth, buttonHeight;
  let buttonOuterPadding, buttonInnerMargin;
  let descriptionBetween;
  let panWidth, panVisualLeft;
  let veryBigTextTop;
  let circleWidth, circleTop, circleLeft;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 44, 44, 36, 34, 5.4 %%>;

  whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  veryBigSize = <%% 23, 21, 20, 16, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  veryBigTextTop = <%% -1, -1, -2, -1, -1 %%>;

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

  columnsNumber = <%% 4, 3, 3, 3, 2 %%>;

  smallSize = <%% 11, 11, 10, 10, 2.5 %%>;
  smallWeight = <%% 400, 400, 400, 400, 400 %%>;
  smallBetween = <%% 5, 5, 4, 4, 0 %%>;

  firstWidth = <%% 298, 220, 203, 130, 300 %%>;

  buttonWidth = <%% 140, 136, 124, 106, 34.5 %%>;
  buttonHeight = <%% 36, 40, 33, 31, 8 %%>;

  buttonOuterPadding = <%% 6, 6, 6, 5, 1 %%>;
  buttonInnerMargin = <%% 4, 4, 4, 3, 1 %%>;

  descriptionBetween = <%% 15, 15, 15, 14, 1 %%>;

  panWidth = <%% 20, 20, 20, 20, 2 %%>;
  panVisualLeft = <%% 1, 1, 1, 1, 1 %%>;

  circleWidth = <%% 5, 5, 5, 4, 0.8 %%>;
  circleTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 1.2 %%>;
  circleLeft = <%% -7, -7, -7, -5, -0.8 %%>;

  mobileVisualPaddingValue = 0.2;

  contents = {
    title: [
      big ? "촬영비 결제에 대해서" : "촬영비 결제",
      big ? "안내해드립니다." : "안내드립니다.",
    ],
    description: [
      (veryBig ? [
        "홈리에종은 디자이너 현장의 정확한 기록과 퀄리티 있는",
        "포트폴리오를 위해 전문 작가를 이용합니다.",
      ] : [
        "홈리에종은 현장의 정확한 기록과 퀄리티 있는",
        "포트폴리오를 위해 전문 작가를 이용합니다.",
      ]),
      (veryBig ? [
        "전문 작가의 비용은 건당 30만원 (VAT 별도) 이며,",
        "홈리에종의 50% 부담을 제외한 165,000원을 요청드리는 바입니다.",
      ] : [
        "전문 작가의 비용은 건당 30만원 (VAT 별도) 이며,",
        "홈리에종의 50% 촬영비 부담을 제외한",
        "165,000원 (VAT 포함) 을 요청드리는 바입니다.",
      ])
    ],
  };

  if (media[0]) {
    contents.buttonSet = [
      [
        {
          title: "촬영 컨택",
          active: !(/확정/gi.test(project.contents.photo.status) || /완료/gi.test(project.contents.photo.status) || /없음/gi.test(project.contents.photo.status)),
          click: null,
        },
        {
          title: "촬영 일정 확정",
          active: /확정/gi.test(project.contents.photo.status),
          click: null,
        },
        {
          title: "촬영 완료",
          active: (/완료/gi.test(project.contents.photo.status) || /없음/gi.test(project.contents.photo.status)),
          click: null,
        }
      ],
      [
        {
          title: "촬영비 결제 대기",
          active: /대기/gi.test(project.contents.payment.status),
          click: null,
        },
        {
          title: "촬영비 결제 완료",
          active: /결제 완료/gi.test(project.contents.payment.status),
          click: null,
        },
        {
          title: "촬영비 해당 없음",
          active: (/무료/gi.test(project.contents.payment.status) || /없음/gi.test(project.contents.payment.status) || /환불/gi.test(project.contents.payment.status)),
          click: null,
        }
      ],
      [
        {
          title: "촬영비 카드 결제",
          active: true,
          click: instance.paymentByCard(),
        },
        {
          title: "촬영비 계좌 이체",
          active: true,
          click: instance.paymentByAccount(),
        },
        {
          title: "",
          active: false,
          click: null,
        }
      ],
    ];
  } else {
    contents.buttonSet = [
      [
        {
          title: "촬영비 결제 대기",
          active: false,
          click: null,
        },
        {
          title: "촬영비 결제 완료",
          active: true,
          click: null,
        },
        {
          title: "촬영비 해당 없음",
          active: false,
          click: null,
        }
      ],
      [
        {
          title: "촬영비 카드 결제",
          active: true,
          click: instance.paymentByCard(),
        },
        {
          title: "촬영비 계좌 이체",
          active: true,
          click: instance.paymentByAccount(),
        },
        {
          title: "",
          active: false,
          click: null,
        }
      ],
    ];
  }


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

  createNode({
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
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? String(firstWidth) + ea : withOut(0, ea),
          justifyContent: desktop ? "" : "center",
          alignItems: desktop ? "" : "center",
          textAlign: desktop ? "" : "center",
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
                background: colorChip.red,
              }
            }
          }
        ]
      },
      {
        style: {
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? withOut(firstWidth + ((buttonWidth + buttonOuterPadding + buttonOuterPadding) * contents.buttonSet.length) + (buttonOuterPadding * (contents.buttonSet.length - 1)), ea) : withOut(0, ea),
          flexDirection: "column",
          marginBottom: desktop ? "" : String(7.2) + ea,
        },
        children: [
          {
            style: {
              display: veryBig ? "display" : "none",
              position: "absolute",
              top: String(0),
              left: String(panVisualLeft) + ea,
              width: String(panWidth) + ea,
              height: String((buttonHeight * contents.buttonSet[0].length) + (buttonInnerMargin * (contents.buttonSet[0].length - 1)) + (buttonOuterPadding * 2)) + ea,
              borderBottom: String(3) + "px solid " + colorChip.black,
              boxSizing: "border-box",
            }
          },
          {
            text: contents.description[0].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              marginBottom: String(descriptionBetween) + ea,
              textAlign: desktop ? "" : "center",
            }
          },
          {
            text: contents.description[1].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              textAlign: desktop ? "" : "center",
            }
          },
        ]
      },
      ...variableArray(contents.buttonSet.length).map((i) => {
        return {
          style: {
            display: "inline-flex",
            position: "relative",
            borderRadius: String(8) + "px",
            background: i !== contents.buttonSet.length - 1 ? colorChip.gray3 : colorChip.gray1,
            padding: String(buttonOuterPadding) + ea,
            flexDirection: "column",
            marginRight: i !== contents.buttonSet.length - 1 ? String(buttonOuterPadding) + ea : "",
          },
          children: variableArray(contents.buttonSet[i].length).map((index) => {
            return {
              event: {
                click: (typeof contents.buttonSet[i][index].click === "function") ? contents.buttonSet[i][index].click(instance.project) : (e) => {},
              },
              style: {
                width: String(buttonWidth) + ea,
                height: String(buttonHeight) + ea,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                borderRadius: String(5) + "px",
                background: contents.buttonSet[i][index].active ? (i !== contents.buttonSet.length - 1 ? colorChip.white : colorChip.gradientGreen) : (i !== contents.buttonSet.length - 1 ? colorChip.gray2 : colorChip.gray3),
                marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                cursor: "pointer",
              },
              child: {
                text: contents.buttonSet[i][index].title,
                style: {
                  position: "relative",
                  top: String(textTextTop) + ea,
                  fontSize: String(desktop ? textSize : 2.9) + ea,
                  fontWeight: String(textWeight),
                  color: contents.buttonSet[i][index].active ? (i !== contents.buttonSet.length - 1 ? colorChip.green : colorChip.white) : colorChip.deactive,
                }
              }
            }
          })
        };
      })
    ]
  })

}

ProcessDetailJs.prototype.insertMeetingBackBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray, findByAttribute, setQueue } = GeneralJs;
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
  let veryBigSize;
  let veryBigWeight;
  let firstWidth;
  let buttonWidth, buttonHeight;
  let buttonOuterPadding, buttonInnerMargin;
  let descriptionBetween;
  let panWidth, panVisualLeft;
  let veryBigTextTop;
  let circleWidth, circleTop, circleLeft;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 44, 44, 36, 34, 5.4 %%>;

  whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  veryBigSize = <%% 23, 21, 20, 16, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  veryBigTextTop = <%% -1, -1, -2, -1, -1 %%>;

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

  columnsNumber = <%% 4, 3, 3, 3, 2 %%>;

  smallSize = <%% 11, 11, 10, 10, 2.5 %%>;
  smallWeight = <%% 400, 400, 400, 400, 400 %%>;
  smallBetween = <%% 5, 5, 4, 4, 0 %%>;

  firstWidth = <%% 298, 220, 203, 130, 300 %%>;

  buttonWidth = <%% 490, 320, 285, 230, 72 %%>;
  buttonHeight = <%% 36, 40, 33, 31, 8 %%>;

  buttonOuterPadding = <%% 4, 4, 4, 3, 1 %%>;
  buttonInnerMargin = <%% 4, 4, 4, 3, 1 %%>;

  descriptionBetween = <%% 13, 14, 14, 12, 1 %%>;

  panWidth = <%% 20, 20, 20, 20, 2 %%>;
  panVisualLeft = <%% 1, 1, 1, 1, 1 %%>;

  circleWidth = <%% 5, 5, 5, 4, 0.8 %%>;
  circleTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 1.2 %%>;
  circleLeft = <%% -7, -7, -7, -5, -0.8 %%>;

  arrowWidth = <%% 18, 16, 15, 14, 3.6 %%>;
  arrowHeight = <%% 8, 8, 8, 7, 2 %%>;

  mobileVisualPaddingValue = 0.2;

  contents = {
    title: [
      big ? "고객과의 현장 미팅," : "현장 미팅은",
      big ? "잘 끝나셨나요?" : "잘 끝나셨나요?",
    ],
    description: [
      (veryBig ? [
        "고객님과의 현장 미팅은 어떠셨나요? 무사히 잘 끝났다면",
        "아래 콘솔을 통해 현장 사진을 올려주세요!",
      ] : [
        "고객님과 현장 미팅, 어떠셨나요? 잘 끝났다면",
        "아래 콘솔을 통해 현장 사진을 올려주세요!",
      ]),
      (veryBig ? [
        "피드백 후, 잔금 요청과 계약서 발송이 진행됩니다.",
        (media[0] ? "고객님의 " : "") + "잔금 지불이 완료되기 전까지 프로젝트 시작을 홀딩해주세요!"
      ] : [
        "피드백 후, 잔금 요청, 계약서 발송이 진행됩니다.",
        "고객님의 잔금 지불이 완료되고 계약서 서명이",
        "이루어지기 전까지, 프로젝트 시작을 홀딩해주세요!",
      ])
    ],
  };

  contents.buttonSet = [
    [
      {
        title: <&& "현장 사진 콘솔에 업로드하기" | "현장 사진 콘솔에 업로드하기" | "현장 사진 콘솔에 업로드하기" | "현장 사진 업로드하기" | "현장 사진 콘솔에 업로드하기" &&>,
        active: true,
        click: (project) => {
          return async function (e) {
            try {
              const target = findByAttribute(document.querySelectorAll(".uploadIconClassName"), "key", "firstPhoto");
              if (target !== null) {
                target.click();
              }
            } catch (e) {
              console.log(e);
            }
          }
        },
      },
      {
        title: <&& "현장에 대한 간략한 메모 작성하기" | "현장에 대한 메모 작성하기" | "현장에 대한 메모 작성하기" | "현장에 대한 메모 작성하기" | "현장에 대한 간략한 메모 작성하기" &&>,
        active: true,
        click: (project) => {
          return async function (e) {
            try {
              const target = findByAttribute(document.querySelectorAll(".memoIconClassName"), "key", "firstPhoto");
              if (target !== null) {
                target.click();
              }
            } catch (e) {
              console.log(e);
            }
          }
        },
      },
      {
        title: <&& "홈스타일링 의뢰서 다시 보기" | "홈스타일링 의뢰서 다시 보기" | "홈스타일링 의뢰서 다시 보기" | "의뢰서 다시 보기" | "홈스타일링 의뢰서 다시 보기" &&>,
        active: true,
        click: (project) => {
          return async function (e) {
            try {
              setQueue(() => {
                scrollTo(window, document.querySelector(".pdfSaveIconClassName"), (desktop ? 72 : 60));
              });
            } catch (e) {
              console.log(e);
            }
          }
        },
      }
    ],
  ];


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

  createNode({
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
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? String(firstWidth) + ea : withOut(0, ea),
          justifyContent: desktop ? "" : "center",
          alignItems: desktop ? "" : "center",
          textAlign: desktop ? "" : "center",
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
                background: colorChip.red,
              }
            }
          }
        ]
      },
      {
        style: {
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? withOut(firstWidth + ((buttonWidth + buttonOuterPadding + buttonOuterPadding) * contents.buttonSet.length) + (buttonOuterPadding * (contents.buttonSet.length - 1)), ea) : withOut(0, ea),
          flexDirection: "column",
          marginBottom: desktop ? "" : String(7.2) + ea,
        },
        children: [
          {
            style: {
              display: veryBig ? "display" : "none",
              position: "absolute",
              top: String(0),
              left: String(panVisualLeft) + ea,
              width: String(panWidth) + ea,
              height: String((buttonHeight * contents.buttonSet[0].length) + (buttonInnerMargin * (contents.buttonSet[0].length - 1)) + (buttonOuterPadding * 2)) + ea,
              borderBottom: String(3) + "px solid " + colorChip.black,
              boxSizing: "border-box",
            }
          },
          {
            text: contents.description[0].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              marginBottom: String(descriptionBetween) + ea,
              textAlign: desktop ? "" : "center",
            }
          },
          {
            text: contents.description[1].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              textAlign: desktop ? "" : "center",
            }
          },
        ]
      },
      ...variableArray(contents.buttonSet.length).map((i) => {
        return {
          style: {
            display: "inline-flex",
            position: "relative",
            borderRadius: String(8) + "px",
            background: i !== contents.buttonSet.length - 1 ? colorChip.gray3 : colorChip.gray3,
            padding: String(buttonOuterPadding) + ea,
            flexDirection: "column",
            marginRight: i !== contents.buttonSet.length - 1 ? String(buttonOuterPadding) + ea : "",
          },
          children: variableArray(contents.buttonSet[i].length).map((index, z) => {
            return {
              style: {
                display: "flex",
                flexDirection: "row",
              },
              children: [
                {
                  style: {
                    width: String(buttonHeight) + ea,
                    height: String(buttonHeight) + ea,
                    marginRight: String(buttonInnerMargin) + ea,
                    display: "inline-flex",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: contents.buttonSet[i][index].active ? (i !== contents.buttonSet.length - 1 ? colorChip.gray1 : colorChip.gray1) : (i !== contents.buttonSet.length - 1 ? colorChip.gray1 : colorChip.gray1),
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    mode: "svg",
                    source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.deactive),
                    style: {
                      position: "relative",
                      width: String(arrowWidth) + ea,
                    }
                  }
                },
                {
                  style: {
                    width: String(buttonHeight) + ea,
                    height: String(buttonHeight) + ea,
                    marginRight: String(buttonInnerMargin) + ea,
                    display: "inline-flex",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: contents.buttonSet[i][index].active ? (i !== contents.buttonSet.length - 1 ? colorChip.gray0 : colorChip.gray0) : (i !== contents.buttonSet.length - 1 ? colorChip.gray0 : colorChip.gray0),
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: String(z + 1),
                    style: {
                      position: "relative",
                      top: String(desktop ? -1 : -0.3) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontFamily: "graphik",
                      fontStyle: "italic",
                      fontWeight: String(500),
                      color: contents.buttonSet[i][index].active ? (i !== contents.buttonSet.length - 1 ? colorChip.green : colorChip.green) : colorChip.deactive,
                    }
                  }
                },
                {
                  event: {
                    click: (typeof contents.buttonSet[i][index].click === "function") ? contents.buttonSet[i][index].click(instance.project) : (e) => {},
                  },
                  style: {
                    width: String(buttonWidth - ((buttonInnerMargin + buttonHeight) * 2)) + ea,
                    height: String(buttonHeight) + ea,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: contents.buttonSet[i][index].active ? (i !== contents.buttonSet.length - 1 ? colorChip.white : colorChip.white) : (i !== contents.buttonSet.length - 1 ? colorChip.gray2 : colorChip.gray2),
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    cursor: "pointer",
                  },
                  child: {
                    text: contents.buttonSet[i][index].title,
                    style: {
                      position: "relative",
                      top: String(textTextTop) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontWeight: String(textWeight),
                      color: contents.buttonSet[i][index].active ? (i !== contents.buttonSet.length - 1 ? colorChip.black : colorChip.black) : colorChip.deactive,
                    }
                  }
                }
              ]
            }
          })
        };
      })
    ]
  })

}

ProcessDetailJs.prototype.insertPayFirstBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray, findByAttribute, setQueue } = GeneralJs;
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 44, 44, 36, 34, 5.4 %%>;

  whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  veryBigSize = <%% 23, 21, 20, 16, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  veryBigTextTop = <%% -1, -1, -2, -1, -1 %%>;

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

  columnsNumber = <%% 4, 3, 3, 3, 2 %%>;

  smallSize = <%% 11, 11, 10, 10, 2.5 %%>;
  smallWeight = <%% 400, 400, 400, 400, 400 %%>;
  smallBetween = <%% 5, 5, 4, 4, 0 %%>;

  firstWidth = <%% 298, 220, 203, 130, 300 %%>;

  buttonWidth = <%% 490, 320, 285, 230, 72 %%>;
  buttonHeight = <%% 36, 40, 33, 31, 8 %%>;

  buttonOuterPadding = <%% 4, 4, 4, 3, 1 %%>;
  buttonInnerMargin = <%% 4, 4, 4, 3, 1 %%>;

  descriptionBetween = <%% 13, 14, 14, 12, 1 %%>;

  panWidth = <%% 20, 20, 20, 20, 2 %%>;
  panVisualLeft = <%% 1, 1, 1, 1, 1 %%>;

  circleWidth = <%% 5, 5, 5, 4, 0.8 %%>;
  circleTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 1.2 %%>;
  circleLeft = <%% -7, -7, -7, -5, -0.7 %%>;

  arrowWidth = <%% 18, 16, 15, 14, 3.6 %%>;
  arrowHeight = <%% 8, 8, 8, 7, 2 %%>;

  subButtonWidth = <%% 90, 70, 70, 56, 15 %%>;

  mobileVisualPaddingValue = 0.2;

  contents = {
    title: [
      big ? "디자인비 선금 정산이" : "선금 정산이",
      big ? "완료 되었습니다!" : "완료 되었습니다!",
    ],
    description: [
      (veryBig ? [
        "수수료를 제외한 디자인비의 50%인 선금이 지급되었습니다.",
        "실장님께서는 정산 확인 부탁드리겠습니다.",
      ] : [
        "디자인비의 50%인 선금이 지급 완료되었습니다.",
        "실장님께는 정산 확인 부탁드리겠습니다.",
      ]),
      (veryBig ? [
        "나머지 50%의 잔금 지급은 고객님의 현장이 모두",
        "마무리되고, 고객님의 확인 과정을 거쳐 지급될 예정입니다!"
      ] : [
        "나머지 디자인비의 50%는 잔금의 형태로 실장님께",
        "지급될 예정입니다. 잔금 지급은 현장이 모두",
        "마무리되고 고객님 확인을 거쳐 정산이 완료됩니다!"
      ])
    ],
  };

  contents.buttonSet = [
    [
      [
        {
          title: "종류",
          active: true,
          click: null,
        },
        {
          title: project.process.calculation.method,
          active: true,
          click: null,
        },
      ],
      [
        {
          title: "선금",
          active: true,
          click: null,
        },
        {
          title: autoComma(project.process.calculation.payments.first.amount) + '원',
          active: true,
          click: null,
        },
      ],
      [
        {
          title: "잔금",
          active: false,
          click: null,
        },
        {
          title: autoComma(project.process.calculation.payments.first.amount) + '원',
          active: false,
          click: null,
        },
      ],
    ],
  ];


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

  createNode({
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
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? String(firstWidth) + ea : withOut(0, ea),
          justifyContent: desktop ? "" : "center",
          alignItems: desktop ? "" : "center",
          textAlign: desktop ? "" : "center",
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
                background: colorChip.red,
              }
            }
          }
        ]
      },
      {
        style: {
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? withOut(firstWidth + ((buttonWidth + buttonOuterPadding + buttonOuterPadding) * contents.buttonSet.length) + (buttonOuterPadding * (contents.buttonSet.length - 1)), ea) : withOut(0, ea),
          flexDirection: "column",
          marginBottom: desktop ? "" : String(7.2) + ea,
        },
        children: [
          {
            style: {
              display: veryBig ? "display" : "none",
              position: "absolute",
              top: String(0),
              left: String(panVisualLeft) + ea,
              width: String(panWidth) + ea,
              height: String((buttonHeight * contents.buttonSet[0].length) + (buttonInnerMargin * (contents.buttonSet[0].length - 1)) + (buttonOuterPadding * 2)) + ea,
              borderBottom: String(3) + "px solid " + colorChip.black,
              boxSizing: "border-box",
            }
          },
          {
            text: contents.description[0].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              marginBottom: String(descriptionBetween) + ea,
              textAlign: desktop ? "" : "center",
            }
          },
          {
            text: contents.description[1].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              textAlign: desktop ? "" : "center",
            }
          },
        ]
      },
      ...variableArray(contents.buttonSet.length).map((i) => {
        return {
          style: {
            display: "inline-flex",
            position: "relative",
            borderRadius: String(8) + "px",
            background: i !== contents.buttonSet.length - 1 ? colorChip.gray3 : colorChip.gray3,
            padding: String(buttonOuterPadding) + ea,
            flexDirection: "column",
            marginRight: i !== contents.buttonSet.length - 1 ? String(buttonOuterPadding) + ea : "",
          },
          children: variableArray(contents.buttonSet[i].length).map((index, z) => {
            return {
              style: {
                display: "flex",
                flexDirection: "row",
              },
              children: [
                {
                  style: {
                    width: String(buttonHeight) + ea,
                    height: String(buttonHeight) + ea,
                    marginRight: String(buttonInnerMargin) + ea,
                    display: "inline-flex",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray1,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    mode: "svg",
                    source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.deactive),
                    style: {
                      position: "relative",
                      width: String(arrowWidth) + ea,
                    }
                  }
                },
                {
                  style: {
                    width: String(buttonHeight) + ea,
                    height: String(buttonHeight) + ea,
                    marginRight: String(buttonInnerMargin) + ea,
                    display: media[0] ? "inline-flex" : "none",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray0,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: String(z + 1),
                    style: {
                      position: "relative",
                      top: String(desktop ? -1 : -0.3) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontFamily: "graphik",
                      fontStyle: "italic",
                      fontWeight: String(500),
                      color: contents.buttonSet[i][index][0].active ? colorChip.green : colorChip.deactive,
                    }
                  }
                },
                {
                  style: {
                    width: String(subButtonWidth) + ea,
                    height: String(buttonHeight) + ea,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray0,
                    marginRight: String(buttonInnerMargin) + ea,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    cursor: "pointer",
                  },
                  child: {
                    text: contents.buttonSet[i][index][0].title,
                    style: {
                      position: "relative",
                      top: String(textTextTop) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontWeight: String(500),
                      color: contents.buttonSet[i][index][0].active ? colorChip.black : colorChip.deactive,
                    }
                  }
                },
                {
                  style: {
                    width: String(buttonWidth - ((buttonInnerMargin + buttonHeight) * (media[0] ? 2 : 1)) - (subButtonWidth + buttonInnerMargin)) + ea,
                    height: String(buttonHeight) + ea,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.white,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                  },
                  child: {
                    text: contents.buttonSet[i][index][1].title,
                    style: {
                      position: "relative",
                      top: String(textTextTop) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontWeight: String(textWeight),
                      color: contents.buttonSet[i][index][1].active ? colorChip.green : colorChip.deactive,
                    }
                  }
                },
              ]
            }
          })
        };
      })
    ]
  })

}

ProcessDetailJs.prototype.insertPayRemainBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray, findByAttribute, setQueue } = GeneralJs;
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 44, 44, 36, 34, 5.4 %%>;

  whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  veryBigSize = <%% 23, 21, 20, 16, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  veryBigTextTop = <%% -1, -1, -2, -1, -1 %%>;

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

  columnsNumber = <%% 4, 3, 3, 3, 2 %%>;

  smallSize = <%% 11, 11, 10, 10, 2.5 %%>;
  smallWeight = <%% 400, 400, 400, 400, 400 %%>;
  smallBetween = <%% 5, 5, 4, 4, 0 %%>;

  firstWidth = <%% 298, 220, 203, 130, 300 %%>;

  buttonWidth = <%% 490, 320, 285, 230, 72 %%>;
  buttonHeight = <%% 36, 40, 33, 31, 8 %%>;

  buttonOuterPadding = <%% 4, 4, 4, 3, 1 %%>;
  buttonInnerMargin = <%% 4, 4, 4, 3, 1 %%>;

  descriptionBetween = <%% 13, 14, 14, 12, 1 %%>;

  panWidth = <%% 20, 20, 20, 20, 2 %%>;
  panVisualLeft = <%% 1, 1, 1, 1, 1 %%>;

  circleWidth = <%% 5, 5, 5, 4, 0.8 %%>;
  circleTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 1.2 %%>;
  circleLeft = <%% -7, -7, -7, -5, -0.9 %%>;

  arrowWidth = <%% 18, 16, 15, 14, 3.6 %%>;
  arrowHeight = <%% 8, 8, 8, 7, 2 %%>;

  subButtonWidth = <%% 90, 70, 70, 56, 15 %%>;

  mobileVisualPaddingValue = 0.2;

  contents = {
    title: [
      big ? "디자인비 잔금 정산이" : "잔금 정산이",
      big ? "완료 되었습니다!" : "완료 되었습니다!",
    ],
    description: [
      (veryBig ? [
        "수수료를 제외한 디자인비의 50%인 잔금이 지급되었습니다.",
        "실장님께서는 정산 확인 부탁드리겠습니다.",
      ] : [
        "디자인비의 50%인 잔금이 지급 완료되었습니다.",
        "실장님께는 정산 확인 부탁드리겠습니다.",
      ]),
      (veryBig ? [
        "고객님의 확인과 컨펌을 거쳐 해당 프로젝트가 모두",
        "완료되었습니다. 이번 프로젝트도 너무 수고 많으셨습니다!"
      ] : [
        "고객님의 확인과 최종 컨펌을 거쳐 해당 프로젝트가",
        "스타일링 단계까지 모두 완료 처리되었습니다.",
        "이번 프로젝트도 너무 수고 많으셨습니다!",
      ])
    ],
  };

  contents.buttonSet = [
    [
      [
        {
          title: "종류",
          active: true,
          click: null,
        },
        {
          title: project.process.calculation.method,
          active: true,
          click: null,
        },
      ],
      [
        {
          title: "선금",
          active: false,
          click: null,
        },
        {
          title: autoComma(project.process.calculation.payments.first.amount) + '원',
          active: false,
          click: null,
        },
      ],
      [
        {
          title: "잔금",
          active: true,
          click: null,
        },
        {
          title: autoComma(project.process.calculation.payments.first.amount) + '원',
          active: true,
          click: null,
        },
      ],
    ],
  ];


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

  createNode({
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
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? String(firstWidth) + ea : withOut(0, ea),
          justifyContent: desktop ? "" : "center",
          alignItems: desktop ? "" : "center",
          textAlign: desktop ? "" : "center",
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
                background: colorChip.red,
              }
            }
          }
        ]
      },
      {
        style: {
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? withOut(firstWidth + ((buttonWidth + buttonOuterPadding + buttonOuterPadding) * contents.buttonSet.length) + (buttonOuterPadding * (contents.buttonSet.length - 1)), ea) : withOut(0, ea),
          flexDirection: "column",
          marginBottom: desktop ? "" : String(7.2) + ea,
        },
        children: [
          {
            style: {
              display: veryBig ? "display" : "none",
              position: "absolute",
              top: String(0),
              left: String(panVisualLeft) + ea,
              width: String(panWidth) + ea,
              height: String((buttonHeight * contents.buttonSet[0].length) + (buttonInnerMargin * (contents.buttonSet[0].length - 1)) + (buttonOuterPadding * 2)) + ea,
              borderBottom: String(3) + "px solid " + colorChip.black,
              boxSizing: "border-box",
            }
          },
          {
            text: contents.description[0].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              marginBottom: String(descriptionBetween) + ea,
              textAlign: desktop ? "" : "center",
            }
          },
          {
            text: contents.description[1].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              textAlign: desktop ? "" : "center",
            }
          },
        ]
      },
      ...variableArray(contents.buttonSet.length).map((i) => {
        return {
          style: {
            display: "inline-flex",
            position: "relative",
            borderRadius: String(8) + "px",
            background: i !== contents.buttonSet.length - 1 ? colorChip.gray3 : colorChip.gray3,
            padding: String(buttonOuterPadding) + ea,
            flexDirection: "column",
            marginRight: i !== contents.buttonSet.length - 1 ? String(buttonOuterPadding) + ea : "",
          },
          children: variableArray(contents.buttonSet[i].length).map((index, z) => {
            return {
              style: {
                display: "flex",
                flexDirection: "row",
              },
              children: [
                {
                  style: {
                    width: String(buttonHeight) + ea,
                    height: String(buttonHeight) + ea,
                    marginRight: String(buttonInnerMargin) + ea,
                    display: "inline-flex",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray1,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    mode: "svg",
                    source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.deactive),
                    style: {
                      position: "relative",
                      width: String(arrowWidth) + ea,
                    }
                  }
                },
                {
                  style: {
                    width: String(buttonHeight) + ea,
                    height: String(buttonHeight) + ea,
                    marginRight: String(buttonInnerMargin) + ea,
                    display: media[0] ? "inline-flex" : "none",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray0,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: String(z + 1),
                    style: {
                      position: "relative",
                      top: String(desktop ? -1 : -0.3) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontFamily: "graphik",
                      fontStyle: "italic",
                      fontWeight: String(500),
                      color: contents.buttonSet[i][index][0].active ? colorChip.green : colorChip.deactive,
                    }
                  }
                },
                {
                  style: {
                    width: String(subButtonWidth) + ea,
                    height: String(buttonHeight) + ea,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray0,
                    marginRight: String(buttonInnerMargin) + ea,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    cursor: "pointer",
                  },
                  child: {
                    text: contents.buttonSet[i][index][0].title,
                    style: {
                      position: "relative",
                      top: String(textTextTop) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontWeight: String(500),
                      color: contents.buttonSet[i][index][0].active ? colorChip.black : colorChip.deactive,
                    }
                  }
                },
                {
                  style: {
                    width: String(buttonWidth - ((buttonInnerMargin + buttonHeight) * (media[0] ? 2 : 1)) - (subButtonWidth + buttonInnerMargin)) + ea,
                    height: String(buttonHeight) + ea,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.white,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                  },
                  child: {
                    text: contents.buttonSet[i][index][1].title,
                    style: {
                      position: "relative",
                      top: String(textTextTop) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontWeight: String(textWeight),
                      color: contents.buttonSet[i][index][1].active ? colorChip.green : colorChip.deactive,
                    }
                  }
                },
              ]
            }
          })
        };
      })
    ]
  })

}

ProcessDetailJs.prototype.insertContractConfirmBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray, findByAttribute, setQueue, downloadFile } = GeneralJs;
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 44, 44, 36, 34, 5.4 %%>;

  whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  veryBigSize = <%% 23, 21, 20, 16, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  veryBigTextTop = <%% -1, -1, -2, -1, -1 %%>;

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

  columnsNumber = <%% 4, 3, 3, 3, 2 %%>;

  smallSize = <%% 11, 11, 10, 10, 2.5 %%>;
  smallWeight = <%% 400, 400, 400, 400, 400 %%>;
  smallBetween = <%% 5, 5, 4, 4, 0 %%>;

  firstWidth = <%% 298, 230, 213, 134, 300 %%>;

  buttonWidth = <%% 490, 320, 285, 230, 72 %%>;
  buttonHeight = <%% 36, 40, 33, 31, 8 %%>;

  buttonOuterPadding = <%% 4, 4, 4, 3, 1 %%>;
  buttonInnerMargin = <%% 4, 4, 4, 3, 1 %%>;

  descriptionBetween = <%% 13, 14, 14, 12, 1 %%>;

  panWidth = <%% 20, 20, 20, 20, 2 %%>;
  panVisualLeft = <%% 1, 1, 1, 1, 1 %%>;

  circleWidth = <%% 5, 5, 5, 4, 0.8 %%>;
  circleTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 1.2 %%>;
  circleLeft = <%% -7, -7, -7, -5, -0.9 %%>;

  arrowWidth = <%% 18, 16, 15, 14, 3.6 %%>;
  arrowHeight = <%% 8, 8, 8, 7, 2 %%>;

  subButtonWidth = <%% 90, 72, 72, 64, 16 %%>;

  mobileVisualPaddingValue = 0.2;

  contents = {
    title: [
      big ? "고객님의 계약서 서명이" : "계약서 서명이",
      big ? "완료 되었습니다!" : "완료 되었습니다!",
    ],
    description: [
      (veryBig ? [
        "고객님이 홈스타일링 계약서에 서명을 완료하셨습니다.",
        "계약서 날짜에 따라 프로젝트를 진행해 주세요!"
      ] : [
        "고객님이 계약서에 서명을 완료하셨습니다.",
        "계약서 날짜에 따라 프로젝트를 진행해 주세요!"
      ]),
      (veryBig ? [
        "시작일에 고객님께 디자인 진행 안내가 발송됩니다.",
        "실장님께서는 계약서상의 시작일 확인을 부탁드립니다.",
      ] : [
        "계약상 시작일이 되면, 고객님께 프로젝트의",
        "디자인 작업이 시작된다는 안내가 발송됩니다.",
        "실장님께서는 시작일 확인을 부탁드립니다."
      ])
    ],
  };

  contents.buttonSet = [
    [
      [
        {
          title: "시작일",
          active: true,
          click: null,
        },
        {
          title: dateToString(project.process.contract.form.date.from),
          active: true,
          click: null,
        },
      ],
      [
        {
          title: "종료일",
          active: true,
          click: null,
        },
        {
          title: dateToString(project.process.contract.form.date.to),
          active: false,
          click: null,
        },
      ],
      [
        {
          title: "계약서",
          active: true,
          click: null,
        },
        {
          title: "계약서 보기",
          active: true,
          click: async function (e) {
            try {
              const thisContract = await ajaxJson({ mode: "search", proid: instance.project.proid }, BRIDGEHOST + "/contractList", { equal: true });
              if (thisContract.contract !== null) {
                await downloadFile(thisContract.contract.downloadLink);
              } else {
                window.alert("계약서를 확인할 수 없습니다!");
              }
            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
    ],
  ];


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

  createNode({
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
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? String(firstWidth) + ea : withOut(0, ea),
          justifyContent: desktop ? "" : "center",
          alignItems: desktop ? "" : "center",
          textAlign: desktop ? "" : "center",
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
                background: colorChip.red,
              }
            }
          }
        ]
      },
      {
        style: {
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? withOut(firstWidth + ((buttonWidth + buttonOuterPadding + buttonOuterPadding) * contents.buttonSet.length) + (buttonOuterPadding * (contents.buttonSet.length - 1)), ea) : withOut(0, ea),
          flexDirection: "column",
          marginBottom: desktop ? "" : String(7.2) + ea,
        },
        children: [
          {
            style: {
              display: veryBig ? "display" : "none",
              position: "absolute",
              top: String(0),
              left: String(panVisualLeft) + ea,
              width: String(panWidth) + ea,
              height: String((buttonHeight * contents.buttonSet[0].length) + (buttonInnerMargin * (contents.buttonSet[0].length - 1)) + (buttonOuterPadding * 2)) + ea,
              borderBottom: String(3) + "px solid " + colorChip.black,
              boxSizing: "border-box",
            }
          },
          {
            text: contents.description[0].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              marginBottom: String(descriptionBetween) + ea,
              textAlign: desktop ? "" : "center",
            }
          },
          {
            text: contents.description[1].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              textAlign: desktop ? "" : "center",
            }
          },
        ]
      },
      ...variableArray(contents.buttonSet.length).map((i) => {
        return {
          style: {
            display: "inline-flex",
            position: "relative",
            borderRadius: String(8) + "px",
            background: i !== contents.buttonSet.length - 1 ? colorChip.gray3 : colorChip.gray3,
            padding: String(buttonOuterPadding) + ea,
            flexDirection: "column",
            marginRight: i !== contents.buttonSet.length - 1 ? String(buttonOuterPadding) + ea : "",
          },
          children: variableArray(contents.buttonSet[i].length).map((index, z) => {
            return {
              style: {
                display: "flex",
                flexDirection: "row",
              },
              children: [
                {
                  style: {
                    width: String(buttonHeight) + ea,
                    height: String(buttonHeight) + ea,
                    marginRight: String(buttonInnerMargin) + ea,
                    display: "inline-flex",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray1,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    mode: "svg",
                    source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.deactive),
                    style: {
                      position: "relative",
                      width: String(arrowWidth) + ea,
                    }
                  }
                },
                {
                  style: {
                    width: String(buttonHeight) + ea,
                    height: String(buttonHeight) + ea,
                    marginRight: String(buttonInnerMargin) + ea,
                    display: media[0] ? "inline-flex" : "none",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray0,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: String(z + 1),
                    style: {
                      position: "relative",
                      top: String(desktop ? -1 : -0.3) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontFamily: "graphik",
                      fontStyle: "italic",
                      fontWeight: String(500),
                      color: contents.buttonSet[i][index][0].active ? colorChip.green : colorChip.deactive,
                    }
                  }
                },
                {
                  style: {
                    width: String(subButtonWidth) + ea,
                    height: String(buttonHeight) + ea,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray0,
                    marginRight: String(buttonInnerMargin) + ea,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    cursor: "pointer",
                  },
                  child: {
                    text: contents.buttonSet[i][index][0].title,
                    style: {
                      position: "relative",
                      top: String(textTextTop) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontWeight: String(500),
                      color: contents.buttonSet[i][index][0].active ? colorChip.black : colorChip.deactive,
                    }
                  }
                },
                {
                  event: {
                    click: typeof contents.buttonSet[i][index][1].click === "function" ? contents.buttonSet[i][index][1].click : (e) => {},
                    selectstart: (e) => { e.preventDefault() },
                  },
                  style: {
                    width: String(buttonWidth - ((buttonInnerMargin + buttonHeight) * (media[0] ? 2 : 1)) - (subButtonWidth + buttonInnerMargin)) + ea,
                    height: String(buttonHeight) + ea,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.white,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    cursor: "pointer",
                  },
                  child: {
                    text: contents.buttonSet[i][index][1].title,
                    style: {
                      position: "relative",
                      top: String(textTextTop) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontWeight: String(textWeight),
                      color: contents.buttonSet[i][index][1].active ? colorChip.green : colorChip.deactive,
                    }
                  }
                },
              ]
            }
          })
        };
      })
    ]
  })

}

ProcessDetailJs.prototype.insertContractStartBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray, findByAttribute, setQueue, downloadFile } = GeneralJs;
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 44, 44, 36, 34, 5.4 %%>;

  whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  veryBigSize = <%% 23, 21, 20, 16, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  veryBigTextTop = <%% -1, -1, -2, -1, -1 %%>;

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

  columnsNumber = <%% 4, 3, 3, 3, 2 %%>;

  smallSize = <%% 11, 11, 10, 10, 2.5 %%>;
  smallWeight = <%% 400, 400, 400, 400, 400 %%>;
  smallBetween = <%% 5, 5, 4, 4, 0 %%>;

  firstWidth = <%% 298, 220, 203, 130, 300 %%>;

  buttonWidth = <%% 490, 320, 285, 230, 72 %%>;
  buttonHeight = <%% 36, 40, 33, 31, 8 %%>;

  buttonOuterPadding = <%% 4, 4, 4, 3, 1 %%>;
  buttonInnerMargin = <%% 4, 4, 4, 3, 1 %%>;

  descriptionBetween = <%% 13, 14, 14, 12, 1 %%>;

  panWidth = <%% 20, 20, 20, 20, 2 %%>;
  panVisualLeft = <%% 1, 1, 1, 1, 1 %%>;

  circleWidth = <%% 5, 5, 5, 4, 0.8 %%>;
  circleTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 1.2 %%>;
  circleLeft = <%% -7, -7, -7, -5, -0.9 %%>;

  arrowWidth = <%% 18, 16, 15, 14, 3.6 %%>;
  arrowHeight = <%% 8, 8, 8, 7, 2 %%>;

  subButtonWidth = <%% 90, 72, 72, 64, 16 %%>;

  mobileVisualPaddingValue = 0.2;

  contents = {
    title: [
      big ? "프로젝트의 계약일이" : "프로젝트가",
      big ? "시작되었습니다!" : "시작되었습니다!",
    ],
    description: [
      (veryBig ? [
        "홈스타일링 계약서상 프로젝트의 시작일이 되었습니다.",
        "실장님께서는 디자인 작업을 시작해 주세요!",
      ] : [
        "홈스타일링 계약서상 시작일이 되었습니다.",
        "실장님께서는 디자인 작업을 시작해 주세요!",
      ]),
      (veryBig ? [
        "상담을 통해 작업을 진행하신 후 일정표, 디자인 제안,",
        "제품 리스트 등의 페이퍼 작업을 콘솔에 업로드해 주세요!"
      ] : [
        "고객님과의 상담을 통해 작업을 진행하신 후,",
        "일정표, 디자인 제안서, 제품 리스트 등의",
        "페이퍼 작업을 콘솔에 업로드해 주세요!",
      ])
    ],
  };

  contents.buttonSet = [
    [
      [
        {
          title: "시작일",
          active: true,
          click: null,
        },
        {
          title: dateToString(project.process.contract.form.date.from),
          active: true,
          click: null,
        },
      ],
      [
        {
          title: "종료일",
          active: true,
          click: null,
        },
        {
          title: dateToString(project.process.contract.form.date.to),
          active: false,
          click: null,
        },
      ],
      [
        {
          title: "계약서",
          active: true,
          click: null,
        },
        {
          title: "계약서 보기",
          active: true,
          click: async function (e) {
            try {
              const thisContract = await ajaxJson({ mode: "search", proid: instance.project.proid }, BRIDGEHOST + "/contractList", { equal: true });
              if (thisContract.contract !== null) {
                await downloadFile(thisContract.contract.downloadLink);
              } else {
                window.alert("계약서를 확인할 수 없습니다!");
              }
            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
    ],
  ];


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

  createNode({
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
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? String(firstWidth) + ea : withOut(0, ea),
          justifyContent: desktop ? "" : "center",
          alignItems: desktop ? "" : "center",
          textAlign: desktop ? "" : "center",
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
                background: colorChip.red,
              }
            }
          }
        ]
      },
      {
        style: {
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? withOut(firstWidth + ((buttonWidth + buttonOuterPadding + buttonOuterPadding) * contents.buttonSet.length) + (buttonOuterPadding * (contents.buttonSet.length - 1)), ea) : withOut(0, ea),
          flexDirection: "column",
          marginBottom: desktop ? "" : String(7.2) + ea,
        },
        children: [
          {
            style: {
              display: veryBig ? "display" : "none",
              position: "absolute",
              top: String(0),
              left: String(panVisualLeft) + ea,
              width: String(panWidth) + ea,
              height: String((buttonHeight * contents.buttonSet[0].length) + (buttonInnerMargin * (contents.buttonSet[0].length - 1)) + (buttonOuterPadding * 2)) + ea,
              borderBottom: String(3) + "px solid " + colorChip.black,
              boxSizing: "border-box",
            }
          },
          {
            text: contents.description[0].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              marginBottom: String(descriptionBetween) + ea,
              textAlign: desktop ? "" : "center",
            }
          },
          {
            text: contents.description[1].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              textAlign: desktop ? "" : "center",
            }
          },
        ]
      },
      ...variableArray(contents.buttonSet.length).map((i) => {
        return {
          style: {
            display: "inline-flex",
            position: "relative",
            borderRadius: String(8) + "px",
            background: i !== contents.buttonSet.length - 1 ? colorChip.gray3 : colorChip.gray3,
            padding: String(buttonOuterPadding) + ea,
            flexDirection: "column",
            marginRight: i !== contents.buttonSet.length - 1 ? String(buttonOuterPadding) + ea : "",
          },
          children: variableArray(contents.buttonSet[i].length).map((index, z) => {
            return {
              style: {
                display: "flex",
                flexDirection: "row",
              },
              children: [
                {
                  style: {
                    width: String(buttonHeight) + ea,
                    height: String(buttonHeight) + ea,
                    marginRight: String(buttonInnerMargin) + ea,
                    display: "inline-flex",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray1,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    mode: "svg",
                    source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.deactive),
                    style: {
                      position: "relative",
                      width: String(arrowWidth) + ea,
                    }
                  }
                },
                {
                  style: {
                    width: String(buttonHeight) + ea,
                    height: String(buttonHeight) + ea,
                    marginRight: String(buttonInnerMargin) + ea,
                    display: media[0] ? "inline-flex" : "none",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray0,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: String(z + 1),
                    style: {
                      position: "relative",
                      top: String(desktop ? -1 : -0.3) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontFamily: "graphik",
                      fontStyle: "italic",
                      fontWeight: String(500),
                      color: contents.buttonSet[i][index][0].active ? colorChip.green : colorChip.deactive,
                    }
                  }
                },
                {
                  style: {
                    width: String(subButtonWidth) + ea,
                    height: String(buttonHeight) + ea,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray0,
                    marginRight: String(buttonInnerMargin) + ea,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    cursor: "pointer",
                  },
                  child: {
                    text: contents.buttonSet[i][index][0].title,
                    style: {
                      position: "relative",
                      top: String(textTextTop) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontWeight: String(500),
                      color: contents.buttonSet[i][index][0].active ? colorChip.black : colorChip.deactive,
                    }
                  }
                },
                {
                  event: {
                    click: typeof contents.buttonSet[i][index][1].click === "function" ? contents.buttonSet[i][index][1].click : (e) => {},
                    selectstart: (e) => { e.preventDefault() },
                  },
                  style: {
                    width: String(buttonWidth - ((buttonInnerMargin + buttonHeight) * (media[0] ? 2 : 1)) - (subButtonWidth + buttonInnerMargin)) + ea,
                    height: String(buttonHeight) + ea,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.white,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    cursor: "pointer",
                  },
                  child: {
                    text: contents.buttonSet[i][index][1].title,
                    style: {
                      position: "relative",
                      top: String(textTextTop) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontWeight: String(textWeight),
                      color: contents.buttonSet[i][index][1].active ? colorChip.green : colorChip.deactive,
                    }
                  }
                },
              ]
            }
          })
        };
      })
    ]
  })

}

ProcessDetailJs.prototype.insertScheduleStartBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray, findByAttribute, setQueue, downloadFile } = GeneralJs;
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 44, 44, 36, 34, 5.4 %%>;

  whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  veryBigSize = <%% 23, 21, 20, 16, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  veryBigTextTop = <%% -1, -1, -2, -1, -1 %%>;

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

  columnsNumber = <%% 4, 3, 3, 3, 2 %%>;

  smallSize = <%% 11, 11, 10, 10, 2.5 %%>;
  smallWeight = <%% 400, 400, 400, 400, 400 %%>;
  smallBetween = <%% 5, 5, 4, 4, 0 %%>;

  firstWidth = <%% 298, 230, 213, 142, 300 %%>;

  buttonWidth = <%% 490, 320, 285, 230, 72 %%>;
  buttonHeight = <%% 36, 40, 33, 31, 8 %%>;

  buttonOuterPadding = <%% 4, 4, 4, 3, 1 %%>;
  buttonInnerMargin = <%% 4, 4, 4, 3, 1 %%>;

  descriptionBetween = <%% 13, 14, 14, 12, 1 %%>;

  panWidth = <%% 20, 20, 20, 20, 2 %%>;
  panVisualLeft = <%% 1, 1, 1, 1, 1 %%>;

  circleWidth = <%% 5, 5, 5, 4, 0.8 %%>;
  circleTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 1.2 %%>;
  circleLeft = <%% -7, -7, -7, -5, -0.9 %%>;

  arrowWidth = <%% 18, 16, 15, 14, 3.6 %%>;
  arrowHeight = <%% 8, 8, 8, 7, 2 %%>;

  subButtonWidth = <%% 90, 72, 72, 64, 16 %%>;

  mobileVisualPaddingValue = 0.2;

  contents = {
    title: [
      big ? "프로젝트의 일정표를" : "프로젝트 일정표를",
      big ? "작성해주세요!" : "작성해주세요!",
    ],
    description: [
      (veryBig ? [
        "홈스타일링 계약서상 프로젝트의 시작일이 되었습니다.",
        "아래의 프로젝트 전체 일정표를 작성해주세요!"
      ] : [
        "홈스타일링 계약서상 시작일이 되었습니다.",
        "아래의 프로젝트 전체 일정표를 작성해주세요!"
      ]),
      (veryBig ? [
        "5일 후에 고객님께 일정표 안내문이 발송됩니다.",
        "실장님께 일정표 내용 확인 및 수정을 부탁드립니다.",
      ] : [
        "오늘로부터 5일 뒤에 자동으로 고객님께",
        "일정표 안내문이 발송됩니다. 실장님께",
        "일정표 내용 확인 및 수정을 부탁드립니다."
      ])
    ],
  };

  contents.buttonSet = [
    [
      [
        {
          title: "시작일",
          active: true,
          click: null,
        },
        {
          title: dateToString(project.process.contract.form.date.from),
          active: true,
          click: null,
        },
      ],
      [
        {
          title: "종료일",
          active: true,
          click: null,
        },
        {
          title: dateToString(project.process.contract.form.date.to),
          active: false,
          click: null,
        },
      ],
      [
        {
          title: "계약서",
          active: true,
          click: null,
        },
        {
          title: "계약서 보기",
          active: true,
          click: async function (e) {
            try {
              const thisContract = await ajaxJson({ mode: "search", proid: instance.project.proid }, BRIDGEHOST + "/contractList", { equal: true });
              if (thisContract.contract !== null) {
                await downloadFile(thisContract.contract.downloadLink);
              } else {
                window.alert("계약서를 확인할 수 없습니다!");
              }
            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
    ],
  ];


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

  createNode({
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
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? String(firstWidth) + ea : withOut(0, ea),
          justifyContent: desktop ? "" : "center",
          alignItems: desktop ? "" : "center",
          textAlign: desktop ? "" : "center",
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
                background: colorChip.red,
              }
            }
          }
        ]
      },
      {
        style: {
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          width: desktop ? withOut(firstWidth + ((buttonWidth + buttonOuterPadding + buttonOuterPadding) * contents.buttonSet.length) + (buttonOuterPadding * (contents.buttonSet.length - 1)), ea) : withOut(0, ea),
          flexDirection: "column",
          marginBottom: desktop ? "" : String(7.2) + ea,
        },
        children: [
          {
            style: {
              display: veryBig ? "display" : "none",
              position: "absolute",
              top: String(0),
              left: String(panVisualLeft) + ea,
              width: String(panWidth) + ea,
              height: String((buttonHeight * contents.buttonSet[0].length) + (buttonInnerMargin * (contents.buttonSet[0].length - 1)) + (buttonOuterPadding * 2)) + ea,
              borderBottom: String(3) + "px solid " + colorChip.black,
              boxSizing: "border-box",
            }
          },
          {
            text: contents.description[0].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              marginBottom: String(descriptionBetween) + ea,
              textAlign: desktop ? "" : "center",
            }
          },
          {
            text: contents.description[1].join("\n"),
            style: {
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(textFileWeight),
              color: colorChip.black,
              lineHeight: String(1.6),
              textAlign: desktop ? "" : "center",
            }
          },
        ]
      },
      ...variableArray(contents.buttonSet.length).map((i) => {
        return {
          style: {
            display: "inline-flex",
            position: "relative",
            borderRadius: String(8) + "px",
            background: i !== contents.buttonSet.length - 1 ? colorChip.gray3 : colorChip.gray3,
            padding: String(buttonOuterPadding) + ea,
            flexDirection: "column",
            marginRight: i !== contents.buttonSet.length - 1 ? String(buttonOuterPadding) + ea : "",
          },
          children: variableArray(contents.buttonSet[i].length).map((index, z) => {
            return {
              style: {
                display: "flex",
                flexDirection: "row",
              },
              children: [
                {
                  style: {
                    width: String(buttonHeight) + ea,
                    height: String(buttonHeight) + ea,
                    marginRight: String(buttonInnerMargin) + ea,
                    display: "inline-flex",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray1,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    mode: "svg",
                    source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.deactive),
                    style: {
                      position: "relative",
                      width: String(arrowWidth) + ea,
                    }
                  }
                },
                {
                  style: {
                    width: String(buttonHeight) + ea,
                    height: String(buttonHeight) + ea,
                    marginRight: String(buttonInnerMargin) + ea,
                    display: media[0] ? "inline-flex" : "none",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray0,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: String(z + 1),
                    style: {
                      position: "relative",
                      top: String(desktop ? -1 : -0.3) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontFamily: "graphik",
                      fontStyle: "italic",
                      fontWeight: String(500),
                      color: contents.buttonSet[i][index][0].active ? colorChip.green : colorChip.deactive,
                    }
                  }
                },
                {
                  style: {
                    width: String(subButtonWidth) + ea,
                    height: String(buttonHeight) + ea,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.gray0,
                    marginRight: String(buttonInnerMargin) + ea,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    cursor: "pointer",
                  },
                  child: {
                    text: contents.buttonSet[i][index][0].title,
                    style: {
                      position: "relative",
                      top: String(textTextTop) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontWeight: String(500),
                      color: contents.buttonSet[i][index][0].active ? colorChip.black : colorChip.deactive,
                    }
                  }
                },
                {
                  event: {
                    click: typeof contents.buttonSet[i][index][1].click === "function" ? contents.buttonSet[i][index][1].click : (e) => {},
                    selectstart: (e) => { e.preventDefault() },
                  },
                  style: {
                    width: String(buttonWidth - ((buttonInnerMargin + buttonHeight) * (media[0] ? 2 : 1)) - (subButtonWidth + buttonInnerMargin)) + ea,
                    height: String(buttonHeight) + ea,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: String(5) + "px",
                    background: colorChip.white,
                    marginBottom: index !== contents.buttonSet[i].length - 1 ? String(buttonInnerMargin) + ea : "",
                    cursor: "pointer",
                  },
                  child: {
                    text: contents.buttonSet[i][index][1].title,
                    style: {
                      position: "relative",
                      top: String(textTextTop) + ea,
                      fontSize: String(desktop ? textSize : 2.9) + ea,
                      fontWeight: String(textWeight),
                      color: contents.buttonSet[i][index][1].active ? colorChip.green : colorChip.deactive,
                    }
                  }
                },
              ]
            }
          })
        };
      })
    ]
  })

}

ProcessDetailJs.prototype.insertScheduleAboutBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray, findByAttribute, setQueue } = GeneralJs;
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 44, 44, 36, 34, 5.4 %%>;

  whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  veryBigSize = <%% 23, 21, 20, 16, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  veryBigTextTop = <%% -1, -1, -2, -1, -1 %%>;

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

  columnsNumber = <%% 4, 3, 3, 3, 2 %%>;

  smallSize = <%% 11, 11, 10, 10, 2.5 %%>;
  smallWeight = <%% 400, 400, 400, 400, 400 %%>;
  smallBetween = <%% 5, 5, 4, 4, 0 %%>;

  firstWidth = <%% 298, 230, 213, 142, 300 %%>;

  buttonWidth = <%% 490, 320, 285, 230, 72 %%>;
  buttonHeight = <%% 36, 40, 33, 31, 8 %%>;

  buttonOuterPadding = <%% 4, 4, 4, 3, 1 %%>;
  buttonInnerMargin = <%% 4, 4, 4, 3, 1 %%>;

  descriptionBetween = <%% 13, 14, 14, 12, 1 %%>;

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

  contents = {
    title: [
      "프로젝트 일정표",
      "작성법 안내"
    ],
    description: [
      (big ? [
        "일정표는 계획명, 설명, 시작일, 종료일의 구성으로",
        "짜여진 표입니다.\n계약서상 시작일 기준으로",
        "미리 작성되어 있으며 실장님께서는 이 표를 수정하셔서",
        "고객님께 공유해주시면 됩니다.",
      ] : (desktop ? [
        "일정표는 계약서상 시작일을 기준으로",
        "미리 작성되어 있습니다.\n실장님께서는 이 표를 수정하셔서",
        "고객님께 공유해주시면 됩니다.",
      ] : [
        "일정표는 계약서상 시작일을 기준으로 미리",
        "작성되어 있습니다. 실장님께서는 이 표를 수정하셔서",
        "고객님께 공유해주시면 됩니다.",
      ])),
      (big ? [
        "표를 수정하는 방법은 각각 항목을 클릭하시면 수정할 수 있습니다.",
        "\n특히 시작일과 종료일의 경우 정확한 날짜를 적는 것이 가장 중요하니",
        "해당 항목을 클릭하셔서 날짜를 입력해주시길 바랍니다.",
      ] : (desktop ? [
        "수정하는 방법은 각각 항목을 클릭하시면 수정할 수 있습니다.",
        "\n시작일과 종료일의 경우 정확한 날짜를 적는 것이 중요하니",
        "해당 항목을 클릭하셔서 날짜를 입력해주시길 바랍니다.",
      ] : [
        "수정하는 방법은 각각의 항목을 터치해보시면",
        "값을 수정할 수 있게 됩니다. 시작일과 종료일의 경우",
        "해당 날짜를 터치하시면 달력이 나옵니다.",
      ]))
    ],
    about: [
      <&& ProcessDetailJs.binaryPath + "/consoleScheduleDesktop0.png" | ProcessDetailJs.binaryPath + "/consoleScheduleDesktop0.png" | ProcessDetailJs.binaryPath + "/consoleScheduleTablet0.png" | ProcessDetailJs.binaryPath + "/consoleScheduleTablet0.png" | ProcessDetailJs.binaryPath + "/consoleScheduleMobile0.png" &&>,
      <&& ProcessDetailJs.binaryPath + "/consoleScheduleDesktop1.png" | ProcessDetailJs.binaryPath + "/consoleScheduleDesktop1.png" | ProcessDetailJs.binaryPath + "/consoleScheduleTablet1.png" | ProcessDetailJs.binaryPath + "/consoleScheduleTablet1.png" | ProcessDetailJs.binaryPath + "/consoleScheduleMobile1.png" &&>,
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

  if (desktop) {

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
            display: desktop ? "inline-flex" : "flex",
            position: "relative",
            width: desktop ? String(firstWidth) + ea : withOut(0, ea),
            justifyContent: desktop ? "" : "center",
            alignItems: desktop ? "" : "center",
            textAlign: desktop ? "" : "center",
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
            display: desktop ? "inline-flex" : "flex",
            position: "relative",
            width: desktop ? withOut(firstWidth + thirdWidth, ea) : withOut(0, ea),
            flexDirection: "column",
            marginBottom: desktop ? "" : String(7.2) + ea,
            paddingBottom: String(imageBoxVisualPaddingBottom) + ea,
          },
          children: [
            {
              mode: "img",
              attribute: {
                src: contents.about[0],
              },
              style: {
                display: "block",
                position: "relative",
                width: withOut(0),
                borderRadius: String(8) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
                marginBottom: String(imageBetween) + ea,
              }
            },
            {
              mode: "img",
              attribute: {
                src: contents.about[1],
              },
              style: {
                display: "block",
                position: "relative",
                width: withOut(0),
                borderRadius: String(8) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
              }
            },
          ]
        }
      ]
    });
  
    createNode({
      mother: mainTong,
      style: {
        display: desktop ? "inline-flex" : "flex",
        position: media[0] ? "relative" : "absolute",
        width: media[0] ? String(thirdWidth) + ea : "",
        flexDirection: "column",
        left: media[0] ? "" : String(0),
        bottom: media[0] ? "" : String(imageBoxVisualPaddingBottom) + ea,
      },
      children: [
        {
          style: {
            paddingLeft: String(imageBetween) + ea,
            width: withOut(imageBetween, ea),
            display: media[0] ? "block" : "none",
            paddingTop: String(wordingPaddingTop0) + ea,
          },
          children: [
            {
              text: contents.description[0].join(" "),
              style: {
                position: "relative",
                fontSize: String(textSize) + ea,
                fontWeight: String(textFileWeight),
                color: colorChip.black,
                lineHeight: String(1.6),
                textAlign: "left",
                marginBottom: String(panBoxBetween) + ea,
              }
            },
            {
              style: {
                display: "display",
                position: "relative",
                top: String(0),
                width: String(panWidth) + ea,
                height: String(0) + ea,
                borderBottom: String(3) + "px solid " + colorChip.black,
                boxSizing: "border-box",
              }
            },
          ]
        },
        {
          style: {
            paddingLeft: media[0] ? String(imageBetween) + ea : "",
            width: media[0] ? withOut(imageBetween, ea) : "",
            display: "block",
            paddingTop: media[0] ? String(wordingPaddingTop1) + ea : "",
          },
          children: [
            {
              text: media[0] ? contents.description[1].join(" ") : contents.description[0].join(" ") + "\n\n" + contents.description[1].join(" "),
              style: {
                position: "relative",
                fontSize: String(textSize) + ea,
                fontWeight: String(textFileWeight),
                color: colorChip.black,
                lineHeight: String(1.6),
                textAlign: "left",
                marginBottom: String(panBoxBetween) + ea,
                width: media[0] ? "" : String(wordingBoxWidth) + ea,
              }
            },
            {
              style: {
                display: "display",
                position: "relative",
                top: String(0),
                width: String(panWidth) + ea,
                height: String(0) + ea,
                borderBottom: String(3) + "px solid " + colorChip.black,
                boxSizing: "border-box",
              }
            },
          ]
        },
      ]
    });

  } else {

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
            display: desktop ? "inline-flex" : "flex",
            position: "relative",
            width: desktop ? String(firstWidth) + ea : withOut(0, ea),
            justifyContent: desktop ? "" : "center",
            alignItems: desktop ? "" : "center",
            textAlign: desktop ? "" : "center",
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
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            flexDirection: "column",
            marginBottom: String(7.2) + ea,
          },
          children: [
            {
              text: contents.description[0].join("\n"),
              style: {
                position: "relative",
                fontSize: String(textSize) + ea,
                fontWeight: String(textFileWeight),
                color: colorChip.black,
                lineHeight: String(1.6),
                marginBottom: String(descriptionBetween) + ea,
                textAlign: desktop ? "" : "center",
              }
            },
            {
              text: contents.description[1].join("\n"),
              style: {
                position: "relative",
                fontSize: String(textSize) + ea,
                fontWeight: String(textFileWeight),
                color: colorChip.black,
                lineHeight: String(1.6),
                textAlign: desktop ? "" : "center",
              }
            },
          ]
        },
        {
          style: {
            display: desktop ? "inline-flex" : "flex",
            position: "relative",
            width: desktop ? withOut(firstWidth + thirdWidth, ea) : withOut(0, ea),
            flexDirection: "column",
            paddingBottom: String(imageBoxVisualPaddingBottom) + ea,
          },
          children: [
            {
              mode: "img",
              attribute: {
                src: contents.about[0],
              },
              style: {
                display: "block",
                position: "relative",
                width: withOut(0),
                borderRadius: String(8) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
                marginBottom: String(imageBetween) + ea,
              }
            },
            {
              mode: "img",
              attribute: {
                src: contents.about[1],
              },
              style: {
                display: "block",
                position: "relative",
                width: withOut(0),
                borderRadius: String(8) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
              }
            },
          ]
        }
      ]
    });
  
  }

}

ProcessDetailJs.prototype.insertAboutConsoleBox = function (feedback = false) {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray, findByAttribute, setQueue } = GeneralJs;
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 44, 44, 36, 34, 5.4 %%>;

  whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  veryBigSize = <%% 23, 21, 20, 16, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  veryBigTextTop = <%% -1, -1, -2, -1, -1 %%>;

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

  columnsNumber = <%% 4, 3, 3, 3, 2 %%>;

  smallSize = <%% 11, 11, 10, 10, 2.5 %%>;
  smallWeight = <%% 400, 400, 400, 400, 400 %%>;
  smallBetween = <%% 5, 5, 4, 4, 0 %%>;

  firstWidth = <%% 298, 230, 213, 134, 300 %%>;

  buttonWidth = <%% 490, 320, 285, 230, 72 %%>;
  buttonHeight = <%% 36, 40, 33, 31, 8 %%>;

  buttonOuterPadding = <%% 4, 4, 4, 3, 1 %%>;
  buttonInnerMargin = <%% 4, 4, 4, 3, 1 %%>;

  descriptionBetween = <%% 13, 14, 14, 12, 1 %%>;

  panWidth = <%% 20, 20, 20, 20, 2 %%>;
  panVisualLeft = <%% 1, 1, 1, 1, 1 %%>;

  circleWidth = <%% 5, 5, 5, 4, 0.8 %%>;
  circleTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 1.2 %%>;
  circleLeft = <%% -7, -7, -7, -5, -0.8 %%>;

  arrowWidth = <%% 18, 16, 15, 14, 3.6 %%>;
  arrowHeight = <%% 8, 8, 8, 7, 2 %%>;

  subButtonWidth = <%% 90, 72, 72, 64, 16 %%>;

  mobileVisualPaddingValue = 0.2;

  thirdWidth = <%% 180, 0, 0, 0, 0 %%>;

  imageBoxVisualPaddingBottom = <%% 4, 2, 2, 2, 0 %%>;
  imageBetween = <%% 32, 16, 12, 12, 6 %%>;
  panBoxBetween = <%% 12, 32, 26, 24, 12 %%>;

  wordingPaddingTop0 = <%% 213, 213, 213, 213, 213 %%>;
  wordingPaddingTop1 = <%% 243, 243, 243, 243, 243 %%>;

  wordingBoxWidth = <%% 175, 175, 165, 98, 175 %%>;

  contents = {
    title: [
      feedback ? "현장 사진" : "페이퍼 워크",
      "업로드 안내"
    ],
    description: [
      [
        "해당 영역의 박스로 가신 후, 아래 화살표 모양의",
        "아이콘을 누르시면 " + (feedback ? "사진" : "파일") + "을 업로드할 수 있습니다.",
      ],
      [
        "올리신 " + (feedback ? "사진" : "파일") + "을 우클릭 하거나 터치를 하시면",
        "그 파일에 관련된 다양한 제어를 하실 수 있습니다.",
      ]
    ],
    about: [
      <&& ProcessDetailJs.binaryPath + "/consoleAboutDesktop0.png" | ProcessDetailJs.binaryPath + "/consoleAboutDesktop0.png" | ProcessDetailJs.binaryPath + "/consoleAboutTablet0.png" | ProcessDetailJs.binaryPath + "/consoleAboutTablet0.png" | ProcessDetailJs.binaryPath + "/consoleAboutMobile0.png" &&>,
      <&& ProcessDetailJs.binaryPath + "/consoleAboutDesktop1.png" | ProcessDetailJs.binaryPath + "/consoleAboutDesktop1.png" | ProcessDetailJs.binaryPath + "/consoleAboutTablet1.png" | ProcessDetailJs.binaryPath + "/consoleAboutTablet1.png" | ProcessDetailJs.binaryPath + "/consoleAboutMobile1.png" &&>,
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

  if (desktop) {

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
            display: desktop ? "inline-flex" : "flex",
            position: "relative",
            width: desktop ? String(firstWidth) + ea : withOut(0, ea),
            justifyContent: desktop ? "" : "center",
            alignItems: desktop ? "" : "center",
            textAlign: desktop ? "" : "center",
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
            display: desktop ? "inline-flex" : "flex",
            position: "relative",
            width: desktop ? withOut(firstWidth + thirdWidth, ea) : withOut(0, ea),
            flexDirection: "column",
            marginBottom: desktop ? "" : String(7.2) + ea,
            paddingBottom: String(imageBoxVisualPaddingBottom) + ea,
          },
          children: [
            {
              mode: "img",
              attribute: {
                src: contents.about[0],
              },
              style: {
                display: "block",
                position: "relative",
                width: withOut(0),
                borderRadius: String(8) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
                marginBottom: String(imageBetween) + ea,
              }
            },
            {
              mode: "img",
              attribute: {
                src: contents.about[1],
              },
              style: {
                display: "block",
                position: "relative",
                width: withOut(0),
                borderRadius: String(8) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
              }
            },
          ]
        }
      ]
    });
  
    createNode({
      mother: mainTong,
      style: {
        display: desktop ? "inline-flex" : "flex",
        position: media[0] ? "relative" : "absolute",
        width: media[0] ? String(thirdWidth) + ea : "",
        flexDirection: "column",
        left: media[0] ? "" : String(0),
        bottom: media[0] ? "" : String(imageBoxVisualPaddingBottom) + ea,
      },
      children: [
        {
          style: {
            paddingLeft: String(imageBetween) + ea,
            width: withOut(imageBetween, ea),
            display: media[0] ? "block" : "none",
            paddingTop: String(wordingPaddingTop0) + ea,
          },
          children: [
            {
              text: contents.description[0].join(" "),
              style: {
                position: "relative",
                fontSize: String(textSize) + ea,
                fontWeight: String(textFileWeight),
                color: colorChip.black,
                lineHeight: String(1.6),
                textAlign: "left",
                marginBottom: String(panBoxBetween) + ea,
              }
            },
            {
              style: {
                display: "display",
                position: "relative",
                top: String(0),
                width: String(panWidth) + ea,
                height: String(0) + ea,
                borderBottom: String(3) + "px solid " + colorChip.black,
                boxSizing: "border-box",
              }
            },
          ]
        },
        {
          style: {
            paddingLeft: media[0] ? String(imageBetween) + ea : "",
            width: media[0] ? withOut(imageBetween, ea) : "",
            display: "block",
            paddingTop: media[0] ? String(wordingPaddingTop1) + ea : "",
          },
          children: [
            {
              text: media[0] ? contents.description[1].join(" ") : contents.description[0].join(" ") + "\n\n" + contents.description[1].join(" "),
              style: {
                position: "relative",
                fontSize: String(textSize) + ea,
                fontWeight: String(textFileWeight),
                color: colorChip.black,
                lineHeight: String(1.6),
                textAlign: "left",
                marginBottom: String(panBoxBetween) + ea,
                width: media[0] ? "" : String(wordingBoxWidth) + ea,
              }
            },
            {
              style: {
                display: "display",
                position: "relative",
                top: String(0),
                width: String(panWidth) + ea,
                height: String(0) + ea,
                borderBottom: String(3) + "px solid " + colorChip.black,
                boxSizing: "border-box",
              }
            },
          ]
        },
      ]
    });

  } else {

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
            display: desktop ? "inline-flex" : "flex",
            position: "relative",
            width: desktop ? String(firstWidth) + ea : withOut(0, ea),
            justifyContent: desktop ? "" : "center",
            alignItems: desktop ? "" : "center",
            textAlign: desktop ? "" : "center",
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
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            flexDirection: "column",
            marginBottom: String(7.2) + ea,
          },
          children: [
            {
              text: contents.description[0].join("\n"),
              style: {
                position: "relative",
                fontSize: String(textSize) + ea,
                fontWeight: String(textFileWeight),
                color: colorChip.black,
                lineHeight: String(1.6),
                marginBottom: String(descriptionBetween) + ea,
                textAlign: desktop ? "" : "center",
              }
            },
            {
              text: contents.description[1].join("\n"),
              style: {
                position: "relative",
                fontSize: String(textSize) + ea,
                fontWeight: String(textFileWeight),
                color: colorChip.black,
                lineHeight: String(1.6),
                textAlign: desktop ? "" : "center",
              }
            },
          ]
        },
        {
          style: {
            display: desktop ? "inline-flex" : "flex",
            position: "relative",
            width: desktop ? withOut(firstWidth + thirdWidth, ea) : withOut(0, ea),
            flexDirection: "column",
            paddingBottom: String(imageBoxVisualPaddingBottom) + ea,
          },
          children: [
            {
              mode: "img",
              attribute: {
                src: contents.about[0],
              },
              style: {
                display: "block",
                position: "relative",
                width: withOut(0),
                borderRadius: String(8) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
                marginBottom: String(imageBetween) + ea,
              }
            },
            {
              mode: "img",
              attribute: {
                src: contents.about[1],
              },
              style: {
                display: "block",
                position: "relative",
                width: withOut(0),
                borderRadius: String(8) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
              }
            },
          ]
        }
      ]
    });
  
  }

}

ProcessDetailJs.prototype.insertFormStatusBox = async function () {
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
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray, findByAttribute, setQueue, serviceParsing, removeByClass, equalJson } = GeneralJs;
  const dateToHangul = (dateObject) => {
    return `${String(dateObject.getFullYear()).slice(2)}년 ${String(dateObject.getMonth() + 1)}월 ${String(dateObject.getDate())}일`;
  }
  const hangulToDate = (hangul) => {
    hangul = hangul.replace(/ /gi, '');
    const [ year, month, date ] = hangul.split(/[가-힣]/gi);
    return new Date(2000 + Number(year), Number(month) - 1, Number(date));
  }
  const siblingKeywords = "siblingKeywords__";
  const valueBlockClassName = "valueBlockClassName__";
  const blockContextMenuClassName = "blockContextMenuClassName__";
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
    let blackButtonWidth, blackButtonHeight, blackButtonBetween, blackButtonMargin;
    let blackButtonSize, blackButtonWeight, blackButtonTextTop;

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
  
    buttonWidth = <%% 100, 80, 70, 60, 24 %%>;
    buttonHeight = <%% 36, 28, 26, 24, 8.2 %%>;
  
    buttonSize = <%% 15, 13, 12, 11, 3.5 %%>;
    buttonWeight = <%% 800, 800, 800, 800, 800 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;
  
    panPaddingTop = <%% 22, 16, 14, 14, 4 %%>;
  
    panTitleSize = <%% 16, 15, 14, 13, 3.8 %%>;
    panTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  
    formPanBaseMarginBottom = <%% 12, 8, 6, 6, 4 %%>;
  
    blockTextSize = <%% 14, 13, 12, 11, 3.2 %%>;
    blockTextWeight = <%% 600, 600, 600, 600, 600 %%>;
  
    barBaseHeight = <%% 40, 36, 32, 28, 6.8 %%>;
    barFirstWidth = <%% 70, 60, 50, 42, 14 %%>;
    barFactorHeight = <%% 20, 20, 18, 16, 5 %%>;
    barFactorBetween = <%% 0, 0, 0, 0, 0 %%>;

    barArrBasePaddingTop = <%% 38, 36, 32, 26, 8 %%>;
    barArrBaseMarginTop = <%% 48, 46, 40, 32, 9.5 %%>;

    barArrTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

    percentageSize = <%% 20, 20, 17, 14, 7.5 %%>;
    percentageTextTop = <%% -1, -1, -1, -1, 0 %%>;

    blackButtonWidth = <%% 132, 120, 120, 120, 120 %%>;
    blackButtonHeight = <%% 34, 32, 30, 28, 32 %%>;
    blackButtonBetween = <%% 4, 4, 4, 4, 4 %%>;
    blackButtonMargin = <%% 6, 6, 6, 6, 6 %%>;
    blackButtonSize = <%% 13, 12, 11, 10, 2.5 %%>;
    blackButtonWeight = <%% 600, 600, 600, 600, 600 %%>;
    blackButtonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1) %%>;

    thisForm = await ajaxJson({ mode: "get", proid, desid }, SECONDHOST + "/projectDesignerStatus", { equal: true });
  
    contents = {
      title: [
        project.name + "님은 현재",
        "어느 단계인가요?"
      ],
      description: [
        project.name + " 고객님 : " + "<u%" + serviceParsing(project.service) + "%u>",
        "고객님께 해당되는 상태를 <b%모두 체크%b>해주세요!",
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

      formPanBase = createNode({
        mother: contentsTong,
        style: {
          display: (media[0] || media[4] ? "flex" : "block"),
          position: "relative",
          flexDirection: desktop ? "row" : "column",
          width: withOut(0),
          justifyContent: "start",
          alignItems: "start",
        },
      });
  
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
          borderTop: "1px dashed " + colorChip.gray3,
          marginTop: String(barArrBaseMarginTop) + ea,
        }
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
          paddingBottom: String(11) + ea,
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
            event: {
              click: async function (e) {
                const self = this;
                const toggle = this.getAttribute("toggle");
                const middle = this.getAttribute("middle");
                const red = this.getAttribute("red");
                const x = Number(this.getAttribute("x"));
                const y = Number(this.getAttribute("y"));
                const deactive = (this.getAttribute("deactive") === "true");
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                try {
                  let totalDom;
                  let matrix;
                  let maxX, maxY;
                  let xArr, yArr;
                  let tempObj;
                  let targetDoms;
                  let thisIndex;
                  let finalIndex;
  
                  siblings = [ ...document.querySelectorAll('.' + siblingKeywords + String(x)) ];
                  thisIndex = siblings.findIndex((dom) => { return dom === self });

                  if (!deactive) {
                    if (toggle === "off") {
                      if (red === "off") {

                        for (let i = 0; i < siblings.length; i++) {
                          if (i < thisIndex) {
                            if (siblings[i].getAttribute("red") !== "on") {
                              siblings[i].style.background = colorChip.whiteGreen;
                              siblings[i].children[0].children[0].children[0].setAttribute("fill", colorChip.green);
                              siblings[i].children[1].children[0].style.color = colorChip.softGreen;
                              siblings[i].setAttribute("toggle", "on");
                              siblings[i].setAttribute("middle", "on");
                              siblings[i].setAttribute("red", "off");
                            }
                          } else if (i === thisIndex) {
                            siblings[i].style.background = colorChip.gradientGreen;
                            siblings[i].children[0].children[0].children[0].setAttribute("fill", colorChip.white);
                            siblings[i].children[1].children[0].style.color = colorChip.black;
                            siblings[i].setAttribute("toggle", "on");
                            siblings[i].setAttribute("middle", "off");
                            siblings[i].setAttribute("red", "off");
                          } else {
                            siblings[i].style.background = colorChip.gray1;
                            siblings[i].children[0].children[0].children[0].setAttribute("fill", colorChip.gray4);
                            siblings[i].children[1].children[0].style.color = colorChip.deactive;
                            siblings[i].setAttribute("toggle", "off");
                            siblings[i].setAttribute("middle", "off");
                            siblings[i].setAttribute("red", "off");
                          }
                        }

                      } else {

                        siblings[thisIndex].style.background = colorChip.whiteGreen;
                        siblings[thisIndex].children[0].children[0].children[0].setAttribute("fill", colorChip.green);
                        siblings[thisIndex].children[1].children[0].style.color = colorChip.softGreen;
                        siblings[thisIndex].setAttribute("toggle", "on");
                        siblings[thisIndex].setAttribute("middle", "on");
                        siblings[thisIndex].setAttribute("red", "off");

                      }
                    } else {

                      if (middle === "off") {

                        if (siblings[thisIndex - 1] === undefined) {

                          siblings[thisIndex].style.background = colorChip.gray1;
                          siblings[thisIndex].children[0].children[0].children[0].setAttribute("fill", colorChip.gray4);
                          siblings[thisIndex].children[1].children[0].style.color = colorChip.deactive;
                          siblings[thisIndex].setAttribute("toggle", "off");
                          siblings[thisIndex].setAttribute("middle", "off");
                          siblings[thisIndex].setAttribute("red", "off");

                        } else {

                          if (siblings[thisIndex - 1].getAttribute("middle") === "on") {

                            siblings[thisIndex].style.background = colorChip.gray1;
                            siblings[thisIndex].children[0].children[0].children[0].setAttribute("fill", colorChip.gray4);
                            siblings[thisIndex].children[1].children[0].style.color = colorChip.deactive;
                            siblings[thisIndex].setAttribute("toggle", "off");
                            siblings[thisIndex].setAttribute("middle", "off");
                            siblings[thisIndex].setAttribute("red", "off");

                            siblings[thisIndex - 1].style.background = colorChip.gradientGreen;
                            siblings[thisIndex - 1].children[0].children[0].children[0].setAttribute("fill", colorChip.white);
                            siblings[thisIndex - 1].children[1].children[0].style.color = colorChip.black;
                            siblings[thisIndex - 1].setAttribute("toggle", "on");
                            siblings[thisIndex - 1].setAttribute("middle", "off");
                            siblings[thisIndex - 1].setAttribute("red", "off");

                          } else {

                            siblings[thisIndex].style.background = colorChip.gray1;
                            siblings[thisIndex].children[0].children[0].children[0].setAttribute("fill", colorChip.gray4);
                            siblings[thisIndex].children[1].children[0].style.color = colorChip.deactive;
                            siblings[thisIndex].setAttribute("toggle", "off");
                            siblings[thisIndex].setAttribute("middle", "off");
                            siblings[thisIndex].setAttribute("red", "off");

                            finalIndex = siblings.reduce((acc, curr, index) => {
                              if (curr.getAttribute("toggle") === "off") {
                                return acc;
                              } else {
                                return index;
                              }
                            }, -1);
                            
                            for (let i = 0; i < siblings.length; i++) {
                              if (i < finalIndex) {
                                // pass
                              } else if (i === finalIndex) {
                                siblings[i].style.background = colorChip.gradientGreen;
                                siblings[i].children[0].children[0].children[0].setAttribute("fill", colorChip.white);
                                siblings[i].children[1].children[0].style.color = colorChip.black;
                                siblings[i].setAttribute("toggle", "on");
                                siblings[i].setAttribute("middle", "off");
                                siblings[i].setAttribute("red", "off");
                              } else {
                                siblings[i].style.background = colorChip.gray1;
                                siblings[i].children[0].children[0].children[0].setAttribute("fill", colorChip.gray4);
                                siblings[i].children[1].children[0].style.color = colorChip.deactive;
                                siblings[i].setAttribute("toggle", "off");
                                siblings[i].setAttribute("middle", "off");
                                siblings[i].setAttribute("red", "off");
                              }
                            }

                          }
                        }

                      } else {
                        siblings[thisIndex].style.background = colorChip.gray1;
                        siblings[thisIndex].children[0].children[0].children[0].setAttribute("fill", colorChip.red);
                        siblings[thisIndex].children[1].children[0].style.color = colorChip.red;
                        siblings[thisIndex].setAttribute("toggle", "off");
                        siblings[thisIndex].setAttribute("middle", "off");
                        siblings[thisIndex].setAttribute("red", "on");
                      }
                      
                    }
                  }
  
                  totalDom = [ ...document.querySelectorAll('.' + valueBlockClassName) ];
                  
                  xArr = [];
                  for (let dom of totalDom) {
                    xArr.push(Number(dom.getAttribute("x")));
                  }
                  xArr.sort((a, b) => { return b - a; });
                  maxX = xArr[0] + 1;
  
                  matrix = [];
                  for (let z = 0; z < maxX; z++) {
                    targetDoms = totalDom.filter((dom) => { return Number(dom.getAttribute("x")) === z });
                    targetDoms.sort((a, b) => { return Number(a.getAttribute("y")) - Number(b.getAttribute("y")); });
                    tempObj = {
                      title: targetDoms[0].getAttribute("mother"),
                      children: []
                    };
                    for (let w = 0; w < targetDoms.length; w++) {
                      tempObj.children.push({
                        title: targetDoms[w].getAttribute("title"),
                        deactive: targetDoms[w].getAttribute("deactive") === "true",
                        value: targetDoms[w].getAttribute("toggle") === "on" ? 1 : 0,
                        children: equalJson(JSON.stringify(thisForm[z].children[w].children)),
                      });
                    }
                    matrix.push(tempObj);
                  }
                  
                  await ajaxJson({
                    mode: "update",
                    proid,
                    desid,
                    matrix
                  }, SECONDHOST + "/projectDesignerStatus");
  
                  reloadBarArr(barArrBase, matrix);
  
                } catch (e) {
                  console.log(e);
                }
              },
              contextmenu: async function (e) {
                try {

                  e.preventDefault();
                  e.stopPropagation();

                  const self = this;
                  const x = Number(this.getAttribute("x"));
                  const y = Number(this.getAttribute("y"));
                  const proid = this.getAttribute("proid");
                  const desid = this.getAttribute("desid");
                  const deactive = (this.getAttribute("deactive") === "true");
                  const zIndex = 4;
                  let cancelBack, whitePrompt;

                  if (!deactive) {

                    cancelBack = createNode({
                      mother: formPanBase,
                      class: [ blockContextMenuClassName ],
                      event: {
                        click: function (e) {
                          removeByClass(blockContextMenuClassName);
                        }
                      },
                      style: {
                        display: "block",
                        position: "fixed",
                        top: String(0),
                        left: String(0),
                        width: withOut(0, ea),
                        height: withOut(0, ea),
                        background: "transparent",
                        zIndex: String(zIndex),
                      }
                    });
  
                    whitePrompt = createNode({
                      mother: formPanBase,
                      class: [ blockContextMenuClassName ],
                      style: {
                        display: "inline-block",
                        position: "fixed",
                        top: String(e.clientY - baseTong.getBoundingClientRect().top) + "px",
                        left: String(e.clientX - baseTong.getBoundingClientRect().left) + "px",
                        width: String(blackButtonWidth) + ea,
                        background: colorChip.white,
                        borderRadius: String(5) + "px",
                        boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
                        animation: "fadeuplite 0.3s ease forwards",
                        zIndex: String(zIndex),
                        padding: String(blackButtonMargin) + ea,
                        paddingBottom: String(blackButtonMargin - blackButtonBetween) + ea,
                      }
                    });

                    for (let z = 0; z < thisForm[x].children[y].children.length; z++) {
                      createNode({
                        mother: whitePrompt,
                        attribute: {
                          x: String(x),
                          y: String(y),
                          z: String(z),
                          proid,
                          desid,
                          name: instance.client.name,
                          designer: instance.designer.designer,
                        },
                        event: {
                          click: async function (e) {
                            const x = Number(this.getAttribute("x"));
                            const y = Number(this.getAttribute("y"));
                            const z = Number(this.getAttribute("z"));
                            const type = thisForm[x].children[y].children[z].type;
                            try {
                              let tempFunction;
                              let key, photoBoo, thisStatusNumber;

                              if (type === "upload") {

                                key = thisForm[x].children[y].children[z].key;
                                photoBoo = thisForm[x].children[y].children[z].photo;
                                thisStatusNumber = instance.panContents.findIndex((o) => { return o.key === key });
  
                                removeByClass(blockContextMenuClassName);
                                instance.uploadFiles(thisStatusNumber, photoBoo).call(this, e);

                              } else if (type === "memo") {

                                key = thisForm[x].children[y].children[z].key;
                                thisStatusNumber = instance.panContents.findIndex((o) => { return o.key === key });

                                removeByClass(blockContextMenuClassName);
                                instance.plusMemo(thisStatusNumber).call(this, e);

                              }

                            } catch (e) {
                              console.log(e);
                            }
                          },
                        },
                        style: {
                          display: "flex",
                          height: String(blackButtonHeight) + ea,
                          width: String(blackButtonWidth) + ea,
                          borderRadius: String(5) + "px",
                          background: colorChip.gradientGray,
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: String(blackButtonBetween) + ea,
                          cursor: "pointer",
                        },
                        child: {
                          text: thisForm[x].children[y].children[z].title,
                          style: {
                            display: "inline-block",
                            position: "relative",
                            fontSize: String(blackButtonSize) + ea,
                            fontWeight: String(blackButtonWeight),
                            color: colorChip.white,
                            top: String(blackButtonTextTop) + ea,
                            cursor: "pointer",
                          }
                        }
                      });

                    }
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
      createNode({
        mother: formPanBase,
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
          text: contents.button,
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

    }

    reloadMainButtons(formPanBase, thisForm);
    reloadBarArr(barArrBase, thisForm);
  
  } catch (e) {
    console.log(e);
  }
}

ProcessDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, setQueue } = GeneralJs;
    const getObj = returnGet();
    const { media } = this;
    const mobile = media[4];
    const desktop = !mobile;
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let desid, designers, designer;
    let requestNumber;
    let service;
    let key;
    let contentsArr;

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
    this.manager = this.projectHistory.manager;
    if (this.manager === '-') {
      this.manager = null;
    } else if (this.manager === "강해진") {
      this.manager = "Jini";
    } else if (this.manager === "이큰별") {
      this.manager = "이큰별";
    } else if (this.manager === "임지민") {
      this.manager = "Pepper";
    } else {
      this.manager = null;
    }

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

    contentsArr = await ajaxJson({ whereQuery: { proid: project.proid } }, SECONDHOST + "/getContents", { equal: true });
    this.contentsArr = contentsArr;

    this.contents = await ajaxJson({}, SECONDHOST + "/getChecklist", { equal: true });
    this.panContents = this.contents.map((obj) => { return obj.children }).flat();
    this.contentsRawInfo = await ajaxJson({ mode: "search", proid }, SECONDHOST + "/rawImageParsing", { equal: true });
    this.hashConst = "homeliaisonHash";
    this.targetKeywords = "/photo/designer";
    this.targetHref = BRIDGEHOST.replace(/\:3000/gi, '') + this.targetKeywords + "/" + this.designer.desid + "/" + this.project.proid;
    this.targetDrive = "/" + this.designer.desid + "/" + this.project.proid;
    this.panList = [];
    this.itemList = [];
    this.panNumbers = [];
    this.nowUploading = false;

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
          if (typeof getObj.mode === "string" && getObj.mode === "request") {
            instance.insertInitBox();
            instance.insertInformationBox();
            instance.insertDetailBox();
            instance.insertStyleBox();
            instance.insertUploadBox();
            instance.insertControlBox();
            instance.insertNoticeBox();
            if (getObj.green !== "deactive") {
              instance.insertGreenButtons();
            }

          } else if (typeof getObj.mode === "string" && getObj.mode === "schedule") {

            instance.insertInitBox();
            instance.insertScheduleStartBox();
            instance.insertScheduleAboutBox();
            await instance.insertScheduleBox();
            await instance.insertFormStatusBox();
            // instance.insertNumbersBox();
            instance.insertUploadBox();
            instance.insertControlBox();
            if (mobile) {
              instance.insertBelowBox();
            } else {
              instance.insertInformationBox();
            }
            instance.insertDetailBox();
            instance.insertStyleBox();
            instance.insertNoticeBox();
            instance.insertGreenButtons();

          } else {
            instance.insertInitBox();
            if (getObj.mode === "photopay") {
              instance.insertPhotoPayBox();
            } else if (getObj.mode === "feedback") {
              instance.insertMeetingBackBox();
              instance.insertAboutConsoleBox(true);
            } else if (getObj.mode === "payfirst") {
              instance.insertPayFirstBox();
            } else if (getObj.mode === "payremain") {
              instance.insertPayRemainBox();
            } else if (getObj.mode === "contractconfirm") {
              instance.insertContractConfirmBox();
              instance.insertAboutConsoleBox(false);
            } else if (getObj.mode === "contractstart") {
              instance.insertContractStartBox();
              instance.insertAboutConsoleBox(false);
            }
            if (instance.contentsArr.length > 0) {
              instance.insertContentsBox();
            } else {
              await instance.insertFormStatusBox();
            }
            // instance.insertNumbersBox();
            instance.insertUploadBox();
            await instance.insertScheduleBox();
            instance.insertControlBox();
            if (mobile) {
              instance.insertBelowBox();
            } else {
              instance.insertInformationBox();
            }
            instance.insertDetailBox();
            instance.insertStyleBox();
            instance.insertNoticeBox();
            instance.insertGreenButtons();
          }
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ProcessDetailJs.launching.ghostDesignerLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    // mobile payment
    if (typeof getObj.mobilecard === "string") {
      const grayLoadingIcon = instance.mother.grayLoading();
      const response = await ajaxJson({ mode: "open", key: getObj.mobilecard }, BACKHOST + "/generalImpPayment", { equal: true });
      if (response.data !== undefined && response.rsp !== undefined) {
        const { data, rsp } = response;
        let whereQuery, updateQuery;
        let amount;

        if (typeof rsp.status === "string" && /paid/gi.test(rsp.status)) {

          whereQuery = { proid: instance.project.proid };
          updateQuery = {};

          if (typeof rsp.amount === "string") {
            amount = Number(rsp.amount.replace(/[^0-9]/gi, ''));
          } else if (typeof rsp.amount === "number") {
            amount = rsp.amount
          } else {
            amount = 165000;
          }

          updateQuery["contents.payment.status"] = "결제 완료";
          updateQuery["contents.payment.date"] = new Date();
          updateQuery["contents.payment.calculation.amount"] = amount;
          updateQuery["contents.payment.calculation.info.method"] = `카드(${rsp.card_name.replace(/카드/gi, '')})`;
          updateQuery["contents.payment.calculation.info.proof"] = "이니시스";
          updateQuery["contents.payment.calculation.info.to"] = instance.designer.designer;

          await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateProject");
          await ajaxJson({ message: instance.designer.designer + " 실장님이 콘솔을 통해 " + instance.client.name + " 고객님 촬영비를 결제하셨습니다!", channel: "#301_console" }, BACKHOST + "/sendSlack");

          window.alert("결제가 완료 되었습니다!");
          window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?proid=" + instance.project.proid;

        } else {
          window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
        }
      } else {
        window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
      }
      grayLoadingIcon.remove();
    }

    // auto download
    if (typeof getObj.download === "string") {
      if (getObj.download === "auto") {
        if (this.contentsRawInfo.raw.exist) {
          if (mobile) {
            window.alert("해당 사진 파일은 압축 형태이기 때문에 (zip 파일), 모바일에서 다운로드 할 경우 확인이 어려울 수 있습니다! PC에서 다운로드 해주세요!");
          }
          const loading = instance.mother.whiteProgressLoading();
          instance.mother.greenAlert("다운로드를 진행합니다!").catch((err) => { console.log(err); });
          await GeneralJs.downloadFile(this.contentsRawInfo.raw.link, null, loading.progress.firstChild);
          loading.remove();
        }
      }
    }

    // raw comments upload
    if (typeof getObj.raw === "string") {
      if (getObj.raw === "upload") {
        instance.insertRawUploadBox().call(document.getElementById("totalcontents"), {});
      } else if (getObj.raw === "contents") {
        instance.insertRawContentsBox().call(document.getElementById("totalcontents"), {});
      }
    }

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ProcessDetailJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
