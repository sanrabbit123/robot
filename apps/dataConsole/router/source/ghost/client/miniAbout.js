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
      "return ('홈리에종 미니 서비스 소개 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 미니 서비스 소개 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "miniAbout",
  "route": [
    "miniAbout"
  ]
} %/%/g

const MiniAboutJs = function () {
  this.mother = new GeneralJs();
}

MiniAboutJs.binaryPath = "/middle/mini";

MiniAboutJs.prototype.insertInitBox = function () {
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
  let initWording0, initWording1;
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

  blockHeight = <%% 396, 326, 293, 246, 121 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  marginTop = <%% 52, 50, 40, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 26, 23, 19, 5.4 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 500, 500, 600, 600, 500 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  barWidth = <%% 70, 80, 80, 80, 80 %%>;
  barLeft = <%% 240, titleLeft + 234, titleLeft + 234, titleLeft + 234, titleLeft + 234 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  leftWidth = <%% 300, 232, 200, 164, 300 %%>;

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
  mobileLeftBoxHeight = 29;

  grayBoxImageVisualWidth = <%% 16, 4, 0, 0, 19 %%>;

  grayUpWordings = [ "프로세스", "후 시공 / 구매", "선 디자인 / 기획", "디자이너 선택" ];
  grayDownWordings = [ "비용 구성", "시공 비용", "구매 비용", "디자인비" ];

  initWording0 = "본격적인 인테리어는 고객님과 맞는 <b%디자이너가 매칭된 이후%b> 진행되며,";
  initWording1 = "<b%이를 위해 상세 큐레이션%b>이 꼭 필요합니다. 다음 질문들에 꼭 답변해주세요!";

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
          wordSpacing: String(wordSpacing) + "px",
          top: desktop ? (String((media[0] ? 0 : media[1] ? 1 : 3) + (isMac() || mobile ? 0 : 2)) + ea) : String(9) + ea,
          left: String(titleLeft) + ea,
          color: colorChip.black,
          width: desktop ? "" : String(100) + '%',
          textAlign: desktop ? "" : "center",
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
          src: MiniAboutJs.binaryPath + "/contents5" + String(media.findIndex(boo => boo)) + ".png",
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

MiniAboutJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, requestPromise, setDebounce } = GeneralJs;
    const getObj = returnGet();

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "miniAbout",
      client: null,
      base: {
        instance: this,
        binaryPath: MiniAboutJs.binaryPath,
        subTitle: "홈리에종 미니 서비스 설명",
        secondBackground: false,
        backgroundType: 1,
      },
      local: async () => {
        try {
          instance.insertInitBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "MiniAboutJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "MiniAboutJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
