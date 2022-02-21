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
      "return ('홈리에종 고객 리뷰 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 고객 리뷰 리스트 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "reviewList",
  "route": [
    "reviewList",
    "RL"
  ]
} %/%/g

const ReviewListJs = function () {
  this.mother = new GeneralJs();
}

ReviewListJs.binaryPath = "/middle/review";

ReviewListJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, osException, testMode, inputClassName } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight, bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let leftRatio;
  let wordSpacing;
  let indexFont, indexFontWeight;
  let mobileRightBoxHeight;
  let mobileRightBoxLeft;
  let rightPhotoVisual;
  let photoMarginVisual;
  let leftBoxPaddingTop;
  let leftBoxLeftMargin;
  let quoteWidth;
  let quoteHeight;
  let quoteMarginTop;
  let quoteVisual;
  let contents;
  let contentsSize, contentsWeight, contentsLineHeight, contentsMarginTop;
  let titleFontSize, titleFontWeight, titleLineHeight;
  let dotPannelWidth, dotHeight, dotMargin;

  blockHeight = <%% 380, 380, 380, 380, 264 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = 30;
  leftRatio = 0.2;

  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  indexNumberBottom = <%% 3, 4, 6, 4, 0 %%>;

  mobileRightBoxHeight = <%% 78, 78, 78, 78, 78 %%>;

  mobileRightBoxLeft = 7;

  rightPhotoVisual = 1;
  photoMarginVisual = 2;

  leftBoxPaddingTop = 40;
  leftBoxLeftMargin = 35;

  quoteHeight = 10;
  quoteVisual = 2;
  quoteMarginTop = 24;

  titleFontSize = 33;
  titleFontWeight = 500;
  titleLineHeight = 1.36;

  contentsSize = 14;
  contentsWeight = 400;
  contentsLineHeight = 1.6;
  contentsMarginTop = 6;

  contents = [
    "솔직고객 리뷰 고객 리 고객 리뷰한",
    "고객 리고객객객객 리뷰뷰",
    "고객 리뷰고객 리뷰고객고객 뷰",
    "고객 리뷰고객고객 뷰",
  ];

  dotPannelWidth = 41;
  dotHeight = 7;
  dotMargin = 4;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: String(blockHeight) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  leftBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(leftRatio) + ")" : String(100) + '%',
      height: desktop ? "calc(100% - " + String((margin * 2) + leftBoxPaddingTop) + ea + ")" : String(29) + ea,
      marginTop: desktop ? String(margin) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
      paddingTop: String(leftBoxPaddingTop) + ea,
    }
  });

  createNode({
    mother: leftBox,
    text: "솔직한\n고객 후기",
    style: {
      display: "block",
      width: withOut(leftBoxLeftMargin, ea),
      fontSize: String(titleFontSize) + ea,
      fontWeight: String(titleFontWeight),
      color: colorChip.black,
      lineHeight: String(titleLineHeight),
      textAlign: "right",
    }
  });

  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  createNode({
    mother: leftBox,
    style: {
      display: "block",
      width: withOut(leftBoxLeftMargin + quoteVisual, ea),
      textAlign: "right",
      marginTop: String(quoteMarginTop) + ea,
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.doubleQuote(colorChip.green),
        style: {
          display: "inline-block",
          width: String(quoteWidth) + ea,
          height: String(quoteHeight) + ea,
          textAlign: "right",
        }
      }
    ]
  });

  createNode({
    mother: leftBox,
    text: contents.join("\n"),
    style: {
      display: "block",
      marginTop: String(contentsMarginTop) + ea,
      width: withOut(leftBoxLeftMargin, ea),
      fontSize: String(contentsSize) + ea,
      fontWeight: String(contentsWeight),
      color: colorChip.black,
      lineHeight: String(contentsLineHeight),
      textAlign: "right",
    }
  });

  createNode({
    mother: leftBox,
    style: {
      position: "absolute",
      bottom: String(photoMarginVisual) + ea,
      right: String(leftBoxLeftMargin + rightPhotoVisual) + ea,
      width: String(dotPannelWidth) + ea,
      height: String(dotHeight) + ea,
      textContent: "right",
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(dotHeight) + ea,
          height: String(dotHeight) + ea,
          borderRadius: String(dotHeight) + ea,
          background: colorChip.green,
          marginRight: String(dotMargin) + ea,
        }
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(dotHeight) + ea,
          height: String(dotHeight) + ea,
          borderRadius: String(dotHeight) + ea,
          background: colorChip.gray3,
          marginRight: String(dotMargin) + ea,
        }
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(dotHeight) + ea,
          height: String(dotHeight) + ea,
          borderRadius: String(dotHeight) + ea,
          background: colorChip.gray3,
          marginRight: String(dotMargin) + ea,
        }
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(dotHeight) + ea,
          height: String(dotHeight) + ea,
          borderRadius: String(dotHeight) + ea,
          background: colorChip.gray3,
        }
      },
    ]
  })



  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")" : withOut(mobileRightBoxLeft * 2, ea),
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : String(mobileRightBoxHeight) + ea,
      marginTop: desktop ? String(margin) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
      paddingLeft: mobile ? String(mobileRightBoxLeft) + ea : "",
      paddingRight: mobile ? String(mobileRightBoxLeft) + ea : "",
    }
  });

  createNode({
    mother: rightBox,
    style: {
      display: "block",
      width: String(100) + '%',
      height: withOut(photoMarginVisual * 2, ea),
      position: "relative",
      background: colorChip.gray2,
      borderRadius: String(5) + "px",
      top: String(rightPhotoVisual + photoMarginVisual) + ea,
    }
  })




}

ReviewListJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();

    this.inputClassName = "consultingInput";

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "reviewList",
      client: null,
      base: {
        instance: this,
        binaryPath: ReviewListJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 1,
      },
      local: async () => {
        try {
          instance.insertInitBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ReviewListJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ReviewListJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
