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
      "return ('잘못 들어오셨습니다! | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('잘못 들어오셨습니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "frontNotfound",
  "route": [
    "frontNotfound"
  ]
} %/%/g

const FrontNotfoundJs = function () {
  this.mother = new GeneralJs();
}

FrontNotfoundJs.binaryPath = "/middle/index";

FrontNotfoundJs.prototype.insertInitBox = function () {
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

  whiteBlockMarginBottom = <%% 25, 25, 25, 25, 4 %%>;

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

  searchBarPaddingTop = <%% 220, 220, 192, 164, 13 %%>;
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

  titleWording = "잘못 들어오셨습니다";
  subTitleContents = "존재하지 않는 페이지입니다. 기타 문의는 홈리에종 채널에 주세요!";

  mobileBlockTop = 3.5;

  searchTags = [];

  placeholder = "디자인비";

  serviceButtonClassName = "serviceButton";

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

  middleBox = createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "left",
      alignItems: "center",
      paddingTop: String(searchBarPaddingTop) + ea,
    },
  });

}

FrontNotfoundJs.prototype.insertTermsBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, ajaxJson } = GeneralJs;
  const { ea, media, totalContents, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    let whiteBlock;
    let whiteBlockPaddingBottom;
    let whiteBlockPaddingTop;
    let whiteBlockMarginBottom;
    let faqTong;
    let targetContents;
    let baseBlock, questionArea, answerArea;
    let num;
    let finalBoo;
    let numberArea;
    let outerMargin;
    let innerMarginBottom;
    let finalMarginBottomVisual;
    let questionSize, questionWeight, numberWeight;
    let questionLineHeight;
    let firstWidth, secondWidth;
    let answerSize, answerWeight, answerLineHeight;
    let mobileQuestionMarginBottom;
    let textTop;
    let answerBoldWeight;
    let policy;
    let contents;
    let boldTargets;

    whiteBlockPaddingTop = <%% 85, 80, 72, 60, 7.5 %%>;
    whiteBlockPaddingBottom = <%% 85, 80, 72, 60, 8 %%>;
    whiteBlockMarginBottom = <%% 200, 200, 200, 200, 30 %%>;

    outerMargin = <%% 80, 80, 70, 60, 6 %%>;
    innerMarginBottom = <%% 85, 80, 72, 60, 8 %%>;
    finalMarginBottomVisual = <%% 25, 25, 15, 15, 2 %%>;

    questionSize = <%% 18, 18, 17, 16, 3.5 %%>;
    questionWeight = <%% 800, 800, 800, 800, 800 %%>;
    numberWeight = <%% 300, 300, 300, 300, 300 %%>;

    questionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.7 %%>;

    firstWidth = <%% 90, 80, 65, 45, 0 %%>;
    secondWidth = <%% 450, 370, 310, 265, 60 %%>;

    answerSize = <%% 16, 16, 15, 14, 3.5 %%>;
    answerWeight = <%% 400, 400, 400, 400, 400 %%>;
    answerBoldWeight = <%% 700, 700, 700, 700, 7700 %%>;
    answerLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

    textTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

    mobileQuestionMarginBottom = 1.5;

    whiteBlock = createNode({
      mother: baseTong,
      style: {
        display: "block",
        position: "relative",
        borderRadius: String(desktop ? 8 : 1) + ea,
        width: String(100) + '%',
        paddingTop: String(whiteBlockPaddingTop) + ea,
        paddingBottom: String(whiteBlockPaddingBottom) + ea,
        background: colorChip.white,
        marginBottom: String(whiteBlockMarginBottom) + ea,
        boxShadow: "0px 3px 15px -10px " + colorChip.gray5,
      }
    });

    faqTong = createNode({
      mother: whiteBlock,
      style: {
        display: "block",
        width: withOut(0),
      }
    });

    baseBlock = createNode({
      mother: faqTong,
      style: {
        display: "block",
        position: "relative",
        marginLeft: String(outerMargin) + ea,
        marginRight: String(outerMargin) + ea,
        width: withOut(outerMargin * 2, ea),
        marginBottom: String(finalMarginBottomVisual) + ea,
      }
    });

    contents = createNode({
      mother: baseBlock,
      text: "<b%존재하지 않는 페이지%b>\n\n서버에 없는 주소로 들어오셨습니다. 홈페이지 또는 이전 페이지로 돌아가 주시면 감사하겠습니다.",
      style: {
        display: "block",
        position: "relative",
        width: withOut(0),
        verticalAlign: "top",
        fontSize: String(answerSize) + ea,
        fontWeight: String(answerWeight),
        color: colorChip.black,
        lineHeight: String(answerLineHeight),
        top: String(textTop) + ea,
      },
      bold: {
        fontWeight: String(questionWeight),
        color: colorChip.black,
      }
    });

    boldTargets = contents.querySelectorAll('b');
    for (let dom of boldTargets) {
      dom.style.color = colorChip.black;
      dom.style.fontSize = String(questionSize) + ea;
      dom.style.fontWeight = String(questionWeight);
    }

  } catch (e) {
    console.log(e);
  }
}

FrontNotfoundJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, requestPromise, setDebounce } = GeneralJs;
    const getObj = returnGet();

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "frontNotfound",
      client: null,
      base: {
        instance: this,
        binaryPath: FrontNotfoundJs.binaryPath,
        subTitle: "잘못 들어오셨습니다",
        secondBackground: false,
        backgroundType: 1,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          await instance.insertTermsBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "FrontNotfoundJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "FrontNotfoundJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
