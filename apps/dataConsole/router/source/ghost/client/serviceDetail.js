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
      "return ('홈리에종 서비스 소개 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 서비스 소개 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "serviceDetail",
  "hangul": "서비스 소개",
  "route": [
    "serviceDetail"
  ]
} %/%/g

const ServiceDetailJs = function () {
  this.mother = new GeneralJs();
}

ServiceDetailJs.binaryPath = FRONTHOST + "/middle/curation";

ServiceDetailJs.prototype.insertInitBox = function () {
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

  titleWording = "홈리에종 서비스";
  subTitleContents = "홈리에종 서비스에 대한 상세한 안내";

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

ServiceDetailJs.prototype.insertPeopleBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
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
  let barWidth, barLeft;
  let indexFont, indexFontWeight;
  let doubleQuote;
  let quoteTop, quoteLeft, quoteHeight, quoteWidth, quoteMarginBottom;
  let initWordingSize, initWordingHeight, initWordingWordSpacing, initWordingLineHeight;
  let indexNumberBottom;
  let grayBox;
  let grayBoxMarginTop;
  let grayBoxTitleSize, grayBoxTitleWeight, grayBoxTitleTop, grayBoxTitleLeft;
  let grayBoxUp, grayBoxDown;
  let grayBoxHeight, grayBoxTop;
  let grayBoxUpWidth0, grayBoxUpWidth1, grayBoxUpWidth2, grayBoxUpWidth3;
  let grayBoxUpRight1, grayBoxUpRight2, grayBoxUpRight3;
  let grayBoxDownWidth0, grayBoxDownWidth1, grayBoxDownWidth2;
  let grayBoxDownRight1, grayBoxDownRight2;
  let grayBoxArrowTop, grayBoxArrowHeight;
  let overlappingWidth;
  let grayInnerWordingSize;
  let grayInnerWordingWeight;
  let grayInnerWordingTextTop;
  let grayUpWordings, grayDownWordings;
  let mobileGrayUpHeight;
  let mobileRightBoxHeight;
  let grayBoxImageVisualWidth;
  let marginTop;
  let mobileLeftBoxHeight;
  let titleTop;
  let descriptionSize;
  let descriptionBottom;

  blockHeight = <%% 383, 316, 273, 226, 129.5 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  marginTop = <%% 52, 50, 40, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 22, 22, 20, 17, 4.5 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 800, 800, 800, 800, 800 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  titleTop = <%% 110, 54, 40, 30, 8.5 %%>;
  descriptionSize = <%% 14, 14, 13, 12, 3 %%>;
  descriptionBottom = <%% 0, -8, -7, -2, 0 %%>;

  barWidth = <%% 70, 80, 80, 80, 80 %%>;
  barLeft = <%% 240, titleLeft + 234, titleLeft + 234, titleLeft + 234, titleLeft + 234 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  leftWidth = <%% 340, 260, 250, 210, 300 %%>;

  initWordingHeight = <%% 20, 20, 20, 20, 9 %%>;
  initWordingSize = <%% 15.5, 15, 14.5, 13.5, 3.5 %%>;
  initWordingWordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  initWordingLineHeight = <%% 9, 9, 9, 9, 9 %%>;

  indexNumberBottom = <%% 3, 4, 12, 4, 0 %%>;

  grayBoxMarginTop = <%% 108, 103, 96, 86, 36 %%>;

  grayBoxTitleSize = <%% 14, 14, 13, 11, 3.2 %%>;
  grayBoxTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  grayBoxTitleTop = <%% (isMac() ? 36 : 38), (isMac() ? 36 : 38), (isMac() ? 36 : 38), (isMac() ? 20 : 21), 0 %%>;
  grayBoxTitleLeft = <%% 40, 32, 30, 16, 6 %%>;
  grayBoxHeight = <%% 36, 36, 34, 28, 7 %%>;
  grayBoxTop = <%% 30, 30, 30, 15, 6.6 %%>;

  grayBoxUpWidth0 = <%% 280, 180, 140, 120, 24 %%>;
  grayBoxUpWidth1 = <%% 230, 160, 130, 110, 24 %%>;
  grayBoxUpWidth2 = <%% 72, 72, 72, 72, 9 %%>;
  grayBoxUpWidth3 = <%% 130, 112, 108, 90, 20 %%>;

  grayBoxUpRight1 = <%% 310, 200, 160, 125, 28.5 %%>;
  grayBoxUpRight2 = <%% 550, 370, 300, 244, 54 %%>;
  grayBoxUpRight3 = <%% 622, 422, 341, 285, 62 %%>;

  grayBoxDownWidth0 = <%% 280, 242, 195, 175, 30 %%>;
  grayBoxDownWidth1 = <%% 277, 170, 142, 120, 29 %%>;
  grayBoxDownWidth2 = <%% 175, 112, 108, 90, 20 %%>;

  grayBoxDownRight1 = <%% 310, 264, 210, 179, 34 %%>;
  grayBoxDownRight2 = <%% 577, 422, 341, 285, 62 %%>;

  grayBoxArrowTop = <%% 42, 42, 42, 24, 8.8 %%>;
  grayBoxArrowHeight = <%% 11, 11, 11, 9, 2 %%>;

  overlappingWidth = <%% 10, 10, 10, 10, 0 %%>;
  grayInnerWordingSize = <%% 13, 13, 13, 11, 2.8 %%>;
  grayInnerWordingTextTop = desktop ? (isMac() ? -1 : 0) : -0.1;
  grayInnerWordingWeight = 600;

  mobileGrayUpHeight = 18;
  mobileRightBoxHeight = 78;
  mobileLeftBoxHeight = 37.5;

  grayBoxImageVisualWidth = <%% 16, 4, 0, 0, 19 %%>;

  grayUpWordings = [ "프로세스", "후 시공 / 구매", "선 디자인 / 기획", "디자이너 선택" ];
  grayDownWordings = [ "비용 구성", "시공 비용", "구매 비용", "디자인비" ];

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
      width: desktop ? String(leftWidth) + ea : String(100) + '%',
      lineHeight: String(1.42),
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : String(mobileLeftBoxHeight) + ea,
      marginTop: desktop ? String(marginTop) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
    },
    children: [
      {
        text: "인테리어, 막상 하려니\n막막하지 않으세요?",
        style: {
          position: "absolute",
          fontSize: String(titleFont) + ea,
          fontWeight: String(titleFontWeight),
          top: String(titleTop) + ea,
          left: String(titleLeft) + ea,
          color: colorChip.black,
          width: desktop ? "" : String(100) + '%',
          textAlign: desktop ? "" : "center",
        }
      },
      {
        text: [
          desktop ? "알아보면 알아볼수록 해야 할 것이" : "알아볼수록 해야할 것이 너무 많은 인테리어,",
          desktop ? "너무나도 많은 인테리어, 준비하다 보면" : "막히는 부분도 많고 실패도 많이 하기 마련입니다.",
          desktop ? "막히는 부분도 많고, 구입하다 보면" : "",
          desktop ? "실패도 많이 하기 마련입니다." : "",
        ].join("\n"),
        style: {
          position: "absolute",
          bottom: String(descriptionBottom) + ea,
          left: String(titleLeft) + ea,
          color: colorChip.black,
          textAlign: desktop ? "" : "center",
          width: desktop ? "" : withOut(0),
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
        }
      }
    ]
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? withOut(leftWidth + margin, ea) : String(100) + '%',
      height: desktop ? String(100) + '%' : withOut(mobileLeftBoxHeight, ea),
      borderRadius: String(5) + "px",
      overflow: "hidden",
    },
    children: [
      {
        mode: "img",
        attribute: {
          src: ServiceDetailJs.binaryPath + "/contents5" + String(media.findIndex(boo => boo)) + ".png",
        },
        style: {
          display: "block",
          position: "absolute",
          width: String(100) + '%',
          bottom: String(0),
          right: String(0),
        }
      }
    ]
  });

}

ServiceDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, requestPromise, setDebounce, colorChip } = GeneralJs;
    const getObj = returnGet();

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "serviceDetail",
      client: null,
      base: {
        instance: this,
        binaryPath: ServiceDetailJs.binaryPath,
        subTitle: "홈리에종 서비스 설명",
        secondBackground: false,
        backgroundType: 0,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertPeopleBox();

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ServiceDetailJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    this.totalContents.children[0].style.background = colorChip.gray1;
    this.totalContents.children[1].style.transition = "all 0s ease";
    this.totalContents.children[1].style.height = String(<&& 600 | 540 | 460 | 400 | 118 &&>) + this.ea;

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ServiceDetailJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
