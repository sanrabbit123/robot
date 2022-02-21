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
  let titleFont, titleLeft, titleFontWeight;
  let indexFont, indexFontWeight;
  let mobileRightBoxHeight;
  let mobileRightBoxLeft;
  let rightPhotoVisual;
  let photoMarginVisual;
  let leftBoxPaddingTop;

  blockHeight = <%% 380, 380, 380, 380, 264 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = 30;
  leftRatio = 0.2;

  titleFont = <%% 31, 29, 27, 23, 5.7 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;

  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  indexNumberBottom = <%% 3, 4, 6, 4, 0 %%>;

  mobileRightBoxHeight = <%% 78, 78, 78, 78, 78 %%>;

  mobileRightBoxLeft = 7;

  rightPhotoVisual = 1;
  photoMarginVisual = 2;

  leftBoxPaddingTop = 100;

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
    }
  });

  if (desktop) {

    createNode({
      mother: leftBox,
      text: String(0),
      style: {
        position: "absolute",
        fontSize: String(indexFont) + ea,
        fontWeight: String(indexFontWeight),
        wordSpacing: String(wordSpacing) + ea,
        bottom: String(indexNumberBottom) + ea,
        left: String(titleLeft) + ea,
        color: colorChip.gray4,
      }
    });

  }

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
