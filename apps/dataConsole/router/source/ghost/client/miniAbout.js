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
      "return ('홈리에종 미니 서비스 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 미니 서비스 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "miniAbout",
  "hangul": "미니 서비스 소개",
  "route": [
    "miniAbout"
  ]
} %/%/g

const MiniAboutJs = function () {
  this.mother = new GeneralJs();
}

MiniAboutJs.binaryPath = FRONTHOST + "/middle/mini";

MiniAboutJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const ctaUpClassName = "ctaUpClassName";
  let whiteBlock, whiteBlock2;
  let bottomMargin;
  let buttonBoxWidth;
  let buttonBoxHeight;
  let buttonBoxTop;
  let buttonSize, buttonWeight, buttonLineHeight, buttonTextTop;
  let blockBetween;

  blockBetween = <%% 18, 18, 18, 18, 3 %%>;
  bottomMargin = <%% 200, 200, 180, 160, 31 %%>;

  buttonBoxWidth = <%% 172, 164, 148, 138, 32 %%>;
  buttonBoxHeight = <%% 58, 54, 50, 45, 11 %%>;
  buttonBoxTop = <%% -108, -108, -100, -88, -18 %%>;

  buttonTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;
  buttonSize = <%% 21, 20, 18, 16, 4 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;
  buttonLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      background: colorChip.white,
      marginBottom: String(blockBetween) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.darkShadow,
      overflow: "hidden",
    }
  });

  this.insertTitleBox(whiteBlock);
  this.insertStrongBox(whiteBlock);

  whiteBlock2 = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  this.insertSlideBox(whiteBlock2);
  this.insertAboutBox(whiteBlock2);

  createNode({
    mother: whiteBlock2,
    class: [ ctaUpClassName ],
    event: {
      click: instance.whiteSubmitEvent(),
    },
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      position: "absolute",
      width: String(buttonBoxWidth) + ea,
      left: "calc(50% - " + String(buttonBoxWidth / 2) + ea + ")",
      height: String(buttonBoxHeight) + ea,
      bottom: String(buttonBoxTop) + ea,
      background: colorChip.gradientGreen,
      borderRadius: String(5) + "px",
      cursor: "pointer",
    },
    children: [
      {
        text: "Mini 시작하기",
        style: {
          position: "relative",
          top: String(buttonTextTop) + ea,
          fontSize: String(buttonSize) + ea,
          fontWeight: String(buttonWeight),
          color: colorChip.white,
          lineHeight: String(buttonLineHeight),
        }
      }
    ]
  });

}

MiniAboutJs.prototype.insertTitleBox = function (mother) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let margin;
  let base;
  let baseHeight;
  let descriptionWidth;
  let descriptionBox;
  let photoBox;
  let descriptionBoxPaddingTop;
  let contents;
  let titleSize, titleWeight;
  let subTitleSize, subTitleWeight;
  let subTitleMarginTop, subTitlePaddingRight;
  let subTitleLineWidth, subTitleLineRight, subTitleLineTop;
  let descriptionSize, descriptionWeight, descriptionLineHeight, descriptionMarginTop, descriptionBoldWeight;
  let belowSize, belowWeight, belowMarginTop, belowPaddingRight;
  let belowLineWidth, belowLineTop, belowLineRight;
  let photo0Width, photo1Width;
  let whiteSize, whiteWeight, whiteLineHeight, whiteBottom, whiteRight;
  let mobileBaseHeight;

  margin = <%% 68, 64, 56, 45, 6 %%>;
  baseHeight = <%% 408, 368, 328, 288, 53.5 %%>;
  descriptionWidth = <%% 328, 200, 181, 168, 30 %%>;

  mobileBaseHeight = 40;

  descriptionBoxPaddingTop = <%% 78, 68, 50, 45, 5 %%>;

  titleSize = <%% 41, 35, 32, 28, 7 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;

  subTitleSize = <%% 15, 15, 14, 12, 3 %%>;
  subTitleWeight = <%% 400, 400, 400, 400, 400 %%>;

  subTitleMarginTop = <%% 3, 3, 3, 3, 0 %%>;
  subTitlePaddingRight = <%% 3, 3, 3, 3, 0 %%>;

  subTitleLineWidth = <%% 50, 22, 16, 20, 27 %%>;
  subTitleLineRight = <%% 136, 136, 128, 110, 131 %%>;
  subTitleLineTop = <%% 10, 10, 10, 8, 10 %%>;

  descriptionSize = <%% 15, 15, 14, 12, 3.5 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;
  descriptionMarginTop = <%% 40, 32, 32, 32, 5 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

  belowSize = <%% 11, 11, 11, 10, 3 %%>;
  belowWeight = <%% 400, 400, 400, 400, 400 %%>;
  belowMarginTop = <%% 94, 83, 73, 60, 66 %%>;
  belowPaddingRight = <%% 3, 3, 3, 3, 3 %%>;

  belowLineWidth = <%% 142, 142, 142, 142, 142 %%>;
  belowLineTop = <%% 8, 8, 8, 8, 8 %%>;
  belowLineRight = <%% 186, 186, 186, 186, 186 %%>;

  photo0Width = <%% 420, 266, 220, 231, 25.3 %%>;
  photo1Width = <%% 300, 266, 220, 231, 25.4 %%>;

  whiteSize = <%% 32, 29, 26, 21, 4.5 %%>;
  whiteWeight = <%% 700, 700, 700, 700, 700 %%>;
  whiteLineHeight = <%% 1.35, 1.35, 1.35, 1.35, 1.35 %%>;
  whiteBottom = <%% 50, 50, 50, 40, 14.5 %%>;
  whiteRight = <%% 50, 50, 50, 40, 0 %%>;

  contents = {
    title: "무드 체인지",
    subTitle: "HomeLiaison Mini",
    description: [
      (desktop ? "<b%패브릭, 액자, 소품%b>만 교체해도" : "<b%패브릭, 액자, 소품%b>만 교체해도 다른 집에 온 것"),
      (desktop ? "다른 집에 온 것 같은 효과!" : "같은 효과! 가격 부담은 줄이고, <b%스타일링 효과는"),
      (desktop ? "가격 부담은 줄이고, <b%스타일링" : "높이는 경험%b>을 누려보세요."),
      (desktop ? "효과는 높이는 경험%b>을 누려보세요." : ""),
    ],
    below: "mood - change : HomeLiaison mini",
    photo: [
      "init0.jpg",
      "init1.jpg",
      "init2.jpg",
    ],
    black: [
      (desktop ? "지금 사용하고 있는 가구는 계속 쓰고 싶고" : "사용하던 가구는 계속 쓰고 싶고"),
      (desktop ? "가구 교체 비용은 아깝다면?" : "교체 비용은 아깝다면?"),
    ],
  };

  base = createNode({
    mother,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: desktop ? "" : String(margin) + ea,
      width: desktop ? withOut(margin, ea) : withOut(margin * 2, ea),
    }
  });

  descriptionBox = createNode({
    mother: base,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      height: String(baseHeight - descriptionBoxPaddingTop) + ea,
      width: desktop ? String(descriptionWidth) + ea : String(100) + '%',
      marginRight: desktop ? String(margin) + ea : "",
      verticalAlign: "top",
      paddingTop: String(descriptionBoxPaddingTop) + ea,
      opacity: String(0),
      transform: "translateY(10px)",
      animation: "fadeupdelay 1s 0.3s ease forwards",
    }
  });

  createNode({
    mother: descriptionBox,
    text: contents.title,
    style: {
      display: "block",
      position: "relative",
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      color: colorChip.black,
      textAlign: desktop ? "right" : "center",
      top: desktop ? String(isMac() ? 0 : 3) + ea : "",
    }
  });

  createNode({
    mother: descriptionBox,
    text: contents.subTitle,
    style: {
      display: "block",
      position: "relative",
      fontSize: String(subTitleSize) + ea,
      fontWeight: String(subTitleWeight),
      fontFamily: "graphik",
      color: colorChip.black,
      textAlign: desktop ? "right" : "center",
      marginTop: String(subTitleMarginTop) + ea,
      paddingRight: desktop ? String(subTitlePaddingRight) + ea : "",
    },
    children: [
      {
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          width: String(subTitleLineWidth) + ea,
          height: String(0),
          borderBottom: "1.5px solid " + colorChip.gray3,
          top: String(subTitleLineTop) + ea,
          right: String(subTitleLineRight) + ea,
        }
      }
    ]
  });

  createNode({
    mother: descriptionBox,
    text: contents.description.join("\n"),
    style: {
      display: "block",
      position: "relative",
      fontSize: String(descriptionSize) + ea,
      fontWeight: String(descriptionWeight),
      color: colorChip.black,
      lineHeight: String(descriptionLineHeight),
      marginTop: String(descriptionMarginTop) + ea,
      textAlign: desktop ? "right" : "center",
    },
    bold: {
      fontWeight: String(descriptionBoldWeight),
      color: colorChip.green,
    }
  });

  createNode({
    mother: descriptionBox,
    text: contents.below,
    style: {
      display: desktop ? "block" : "none",
      position: "relative",
      fontSize: String(belowSize) + ea,
      fontWeight: String(belowWeight),
      fontFamily: "graphik",
      color: colorChip.black,
      textAlign: desktop ? "right" : "center",
      marginTop: String(belowMarginTop) + ea,
      paddingRight: desktop ? String(belowPaddingRight) + ea : "",
    },
    children: [
      {
        style: {
          display: media[0] ? "block" : "none",
          position: "absolute",
          width: String(belowLineWidth) + ea,
          height: String(0),
          borderBottom: "1px solid " + colorChip.darkShadow,
          top: String(belowLineTop) + ea,
          right: String(belowLineRight) + ea,
        }
      }
    ]
  });

  // photo

  photoBox = createNode({
    mother: base,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      height: desktop ? String(baseHeight) + ea : String(mobileBaseHeight) + ea,
      width: desktop ? withOut(descriptionWidth + margin, ea) : String(100) + '%',
      overflow: "hidden",
      borderRadius: desktop ? "" : String(5) + "px",
      borderTopLeftRadius: String(5) + "px",
      borderBottomLeftRadius: String(5) + "px",
    }
  });

  createNode({
    mother: photoBox,
    style: {
      display: "inline-block",
      position: "relative",
      width: String(photo0Width) + ea,
      height: String(100) + '%',
      backgroundImage: "url('" + MiniAboutJs.binaryPath + "/" + contents.photo[0] + "')",
      backgroundSize: media[0] ? "100% auto" : "auto 100%",
      backgroundPosition: "50% 50%",
    }
  });

  createNode({
    mother: photoBox,
    style: {
      display: "inline-block",
      position: "relative",
      width: String(photo1Width) + ea,
      height: String(100) + '%',
      backgroundImage: "url('" + MiniAboutJs.binaryPath + "/" + contents.photo[1] + "')",
      backgroundSize: "auto 100%",
      backgroundPosition: "50% 50%",
    }
  });

  createNode({
    mother: photoBox,
    style: {
      display: "inline-block",
      position: "relative",
      width: withOut(photo0Width + photo1Width, ea),
      height: String(100) + '%',
      backgroundImage: "url('" + MiniAboutJs.binaryPath + "/" + contents.photo[2] + "')",
      backgroundSize: desktop ? "auto 100%" : "100% auto",
      backgroundPosition: "100% 50%",
    }
  });

  createNode({
    mother: photoBox,
    style: {
      position: "absolute",
      top: String(0),
      left: String(0),
      width: String(100) + '%',
      height: String(100) + '%',
      background: colorChip.black,
      opacity: String(0),
      animation: "justfadeinsmall 1s 2s ease forwards",
    }
  });

  createNode({
    mother: photoBox,
    text: contents.black.join("\n"),
    style: {
      position: "absolute",
      fontSize: String(whiteSize) + ea,
      fontWeight: String(whiteWeight),
      textAlign: desktop ? "right" : "center",
      lineHeight: String(whiteLineHeight),
      color: colorChip.white,
      bottom: String(whiteBottom) + ea,
      right: String(whiteRight) + ea,
      opacity: String(0),
      width: desktop ? "" : String(100) + '%',
      transform: "translateY(10px)",
      animation: "fadeupmiddle 0.6s 2s ease forwards",
    }
  });

}

MiniAboutJs.prototype.insertStrongBox = function (mother) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let margin;
  let base;
  let contents;
  let betweenWhite;
  let innerPaddingTop, innerPaddingBottom, innerPaddingLeft;
  let titleSize, titleWeight, titleLineHeight;
  let descriptionSize, descriptionWeight, descriptionLineHeight;
  let titleBetween;
  let iconWidth, iconBottom;
  let iconVisual;

  margin = <%% 68, 64, 56, 48, 6 %%>;
  betweenWhite = <%% 10, 10, 10, 10, 2 %%>;

  innerPaddingTop = <%% (isMac() ? 32 : 33), (isMac() ? 26 : 27), (isMac() ? 22 : 23), (isMac() ? 18 : 19), 5 %%>;
  innerPaddingBottom = <%% (isMac() ? 34 : 33), (isMac() ? 28 : 27), (isMac() ? 24 : 23), (isMac() ? 20 : 19), 5 %%>;
  innerPaddingLeft = <%% 40, 33, 29, 24, 6 %%>;

  titleSize = <%% 17, 16, 15, 13, 3.8 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  descriptionSize = <%% 13, 12, 12, 10, 3 %%>;
  descriptionWeight = <%% 300, 300, 300, 300, 300 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  titleBetween = <%% 12, 12, 10, 10, 2.5 %%>;

  iconWidth = <%% 30, 26, 22, 18, 6.4 %%>;
  iconBottom = <%% 38, 34, 29, 25, 6 %%>;
  iconVisual = <%% 1, 5, 5, 5, 1 %%>;

  contents = [
    {
      title: [
        "쉽고 빠르게 소통하며",
        "디자인 시안을 받을 수 있어요!",
      ],
      description: [
        <&& "디자이너의 디자인 작업이 시작된 이후부터" | "디자이너의 디자인 작업이 시작된 이후부터" | "디자이너의 디자인 작업이 시작된 이후부터" | "디자인 작업이 시작된 이후부터" | "디자인 작업이 시작된 이후부터" &&>,
        "3일 내에 디자인 시안부터 제품",
        "구매 리스트까지 확인할 수 있어요.",
      ],
      image: "strong0.png",
    },
    {
      title: [
        <&& "홈리에종의 특별 교육을 받은" | "홈리에종의 특별 교육을 받은" | "홈리에종 교육을 받은" | "홈리에종 교육을 받은" | "홈리에종 교육을 받은" &&>,
        <&& "전문 디자이너 혜택을 누려보세요!" | "전문 디자이너 혜택을 누려보세요!" | "디자이너 혜택을 누려보세요!" | "디자이너 혜택을 누려보세요!" | "디자이너 혜택을 누려보세요!" &&>,
      ],
      description: [
        <&& "패브릭, 액자, 소품 스타일링 제안에 특화된" | "패브릭, 액자, 소품 스타일링 제안에 특화된" | "패브릭, 액자, 소품 스타일링 제안에 특화된" | "패브릭, 액자, 소품 제안에 특화된" | "패브릭, 액자, 소품 제안에 특화된" &&>,
        <&& "전문 디자이너와 함께! 혼자서 발품 팔고" | "전문 디자이너와 함께! 혼자서 발품 팔고" | "디자이너와 함께! 혼자 발품 팔지" | "디자이너와 함께! 혼자 발품 팔지" | "디자이너와 함께! 혼자 발품 팔지" &&>,
        <&& "고민하지 말고, 디자이너와 함께 하세요." | "고민하지 말고, 디자이너와 함께 하세요." | "말고, 전문 디자이너와 함께 하세요." | "말고, 디자이너와 함께 하세요." | "말고, 디자이너와 함께 하세요." &&>,
      ],
      image: "strong1.png",
    },
    {
      title: [
        <&& "홈리에종만의 관리 시스템으로" | "홈리에종만의 관리 시스템으로" | "홈리에종의 관리 시스템으로" | "홈리에종의 관리 시스템으로" | "홈리에종의 관리 시스템으로" &&>,
        "편리하게 이용할 수 있어요!",
      ],
      description: [
        "시스템 안에서 빠른 커뮤니케이션으로",
        <&& "서비스의 전 과정을 한 번에 확인할 수 있어" | "서비스의 전 과정을 한 번에 확인할 수 있어" | "전 과정을 한 번에 확인할 수 있어" | "전 과정을 한 번에 확인할 수 있어" | "전 과정을 한 번에 확인할 수 있어" &&>,
        <&& "편리하게 서비스 혜택을 누릴 수 있어요!" | "편리하게 서비스 혜택을 누릴 수 있어요!" | "편리하게 혜택을 누릴 수 있어요!" | "편리하게 혜택을 누릴 수 있어요!" | "편리하게 혜택을 누릴 수 있어요!" &&>,
      ],
      image: "strong2.png",
    },
  ];

  base = createNode({
    mother,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: desktop ? "" : String(margin) + ea,
      width: desktop ? withOut(margin, ea) : withOut(margin * 2, ea),
      background: desktop ? colorChip.gray2 : colorChip.gray3,
    }
  });

  for (let i = 0; i < contents.length; i++) {
    createNode({
      mother: base,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        paddingTop: String(innerPaddingTop) + ea,
        paddingBottom: String(innerPaddingBottom) + ea,
        width: desktop ? "calc(calc(calc(100% - " + String(margin) + ea + ") - " + String(betweenWhite * (contents.length - 1)) + ea + ") / " + String(contents.length) + ")" : String(100) + '%',
        marginRight: desktop ? String(betweenWhite) + ea : "",
        marginBottom: desktop ? "" : String(betweenWhite) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        opacity: String(0),
        transform: "translateY(10px)",
        animation: "fadeupdelay 1s " + String(0.3 + (0.2 * (i + 0))) + "s ease forwards",
      },
      children: [
        {
          text: contents[i].title.join("\n"),
          style: {
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorChip.black,
            lineHeight: String(titleLineHeight),
            marginLeft: String(innerPaddingLeft) + ea,
          }
        },
        {
          text: contents[i].description.join("\n"),
          style: {
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(descriptionWeight),
            color: colorChip.black,
            lineHeight: String(descriptionLineHeight),
            marginTop: String(titleBetween) + ea,
            marginLeft: String(innerPaddingLeft) + ea,
          }
        },
        {
          mode: "img",
          attribute: { src: MiniAboutJs.binaryPath + "/" + contents[i].image },
          style: {
            position: "absolute",
            width: String(iconWidth) + ea,
            height: "auto",
            bottom: String(iconBottom) + ea,
            right: String(innerPaddingLeft - iconVisual) + ea,
          }
        }
      ]
    });
  }

}

MiniAboutJs.prototype.insertSlideBox = function (mother) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let margin;
  let base;
  let slideBase;
  let slidePan;
  let slideTargets;
  let photoWidth, photoHeight, photoMargin;
  let photoLength;
  let interval;
  let basePaddingBottom;
  let leftBase, totalWidth;

  margin = <%% 68, 64, 56, 48, 8 %%>;

  photoLength = <%% 14, 14, 14, 14, 14 %%>;

  photoMargin = <%% 12, 12, 10, 10, 1.5 %%>;
  photoWidth = <%% 240, 210, 180, 150, 36 %%>;
  photoHeight = <%% 340, 310, 270, 230, 53 %%>;

  basePaddingBottom = <%% 20, 20, 10, 8, 3 %%>;

  leftBase = <%% 176, 133, 114, 114, 30 %%>;
  totalWidth = <%% 8000, 8000, 8000, 8000, 8000 %%>;

  interval = 3 * 1000;

  base = createNode({
    mother,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(margin) + ea,
      paddingBottom: String(basePaddingBottom) + ea,
      width: withOut(0, ea),
    }
  });

  slideBase = createNode({
    mother: base,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      height: String(photoHeight) + ea,
      overflow: "hidden",
    }
  });

  slidePan = createNode({
    mother: slideBase,
    style: {
      position: "absolute",
      left: String(-1 * (leftBase + ((photoWidth + photoMargin) * 2))) + ea,
      width: String(totalWidth) + ea,
      height: String(100) + '%',
      top: String(0),
    }
  })

  slideTargets = [];
  for (let i = 0; i < photoLength; i++) {
    slideTargets.push(createNode({
      mother: slidePan,
      attribute: {
        index: String(i),
        position: String(0),
      },
      style: {
        display: "inline-block",
        position: "relative",
        marginRight: String(photoMargin) + ea,
        width: String(photoWidth) + ea,
        height: String(photoHeight) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.gray2,
        backgroundImage: "url('" + MiniAboutJs.binaryPath + "/" + "slide" + String(i) + ".jpg" + "')",
        backgroundSize: "auto 100%",
        backgroundPosition: "50% 50%",
        transform: "translateX(0px)",
        opacity: String(i === 0 ? 0 : 1),
        transition: "all 0.3s ease",
      }
    }));
  }

  setInterval(() => {
    if (slideTargets.length > 0) {
      const [ first ] = slideTargets;
      const position = Number(first.getAttribute("position"));
      let nextPosition;
      let index;

      nextPosition = position + 1;
      if (nextPosition === photoLength) {
        nextPosition = 0;
      }

      for (let dom of slideTargets) {
        index = Number(dom.getAttribute("index"));
        dom.style.opacity = String(position === index || nextPosition === index ? 0 : 1);
        if (index > position || nextPosition === 0) {
          dom.style.transform = "translateX(" + String((photoWidth + photoMargin) * nextPosition * -1) + ea + ")";
        } else {
          dom.style.transform = "translateX(" + String(((photoWidth + photoMargin) * (photoLength - 1 - index)) - ((photoWidth + photoMargin) * (nextPosition - index - 1))) + ea + ")";
        }
        dom.setAttribute("position", String(nextPosition));
      }

    }
  }, interval);

}

MiniAboutJs.prototype.insertAboutBox = function (mother) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing, autoComma } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let margin;
  let base;
  let contents;
  let aboutGray, processGray;
  let aboutGrayLeft, aboutGrayRight;
  let aboutGrayLeftBoxMargin;
  let aboutBetween;
  let aboutGrayLeftWidth, aboutContentsHeight;
  let grayInnerPadding;
  let aboutGrayRightTitlePaddingTop;
  let areaNameSize, areaNameWeight, areaNameLineHeight;
  let processLength;
  let processBlockWidth;
  let processBlock;
  let processBlank;
  let processNotice;
  let titleSize, titleWeight, titleLineHeight;
  let subTitleSize, subTitleWeight, subTitleLineHeight;
  let descriptionMarginTop;
  let descriptionSize, descriptionWeight, descriptionLineHeight;
  let descriptionPadding;
  let descriptionLineTop;
  let aboutAreaTop;
  let billAreaTop;
  let billAreaBottom;
  let grayTop;
  let processAreaTop;
  let aboutTitleSize, aboutTitleWeight, aboutTitleLineHeight;
  let aboutSubTitleSize, aboutSubTitleWeight, aboutSubTitleLineHeight;
  let aboutDescriptionSize, aboutDescriptionWeight, aboutDescriptionLineHeight;
  let aboutDescriptionMarginTop;
  let processBlockHeight;
  let processTextTop, processSize, processWeight, processLineHeight;
  let processBlankHeight, processArrowWidth, processArrowHeight, processArrowTop;
  let processNoticeBoxRight, processNoticeBoxBottom;
  let processNoticeSize, processNoticeWeight, processNoticeMarginBottom;
  let billSize, billWeight, billLineHeight;
  let billEaSize, billEaWeight, billEaBottom, billEaLeft;
  let billLineLeft, billLineWidth;
  let mobileProcessPaddingSmall, mobileProcessPaddingBig;
  let beforeGray;
  let beforeImageBetween;
  let beforeWhiteCircleWidth;
  let beforeArrowWidth, beforeArrowHeight;
  let beforeTextBoxHeight, beforeFinalBottom;
  let reviewGray;
  let reviewInnerPadding;
  let reviewMinHeight;
  let reviewSize;
  let reviewQuoteWidth;
  let reviewQuoteBetween;
  let firstSlide, secondSlide, thirdSlide;
  let reviewSlideWidth;
  let convertingSlide;
  let reviewGrayHeight;

  margin = <%% 68, 64, 56, 48, 6 %%>;

  grayInnerPadding = <%% 40, 32, 28, 24, 4.8 %%>;
  grayTop = <%% 14, 14, 14, 14, 2 %%>;

  titleSize = <%% 32, 31, 28, 24, 5.5 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  subTitleSize = <%% 16, 16, 15, 14, 3.5 %%>;
  subTitleWeight = <%% 400, 400, 400, 400, 400 %%>;
  subTitleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  descriptionMarginTop = <%% 30, 30, 30, 28, 5 %%>;
  descriptionSize = <%% 16, 16, 15, 13, 3 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  descriptionPadding = <%% 36, 36, 32, 16, 5 %%>;
  descriptionLineTop = <%% 22, 22, 22, 20, 22 %%>;

  aboutAreaTop = <%% 100, 100, 84, 70, 11 %%>;
  processAreaTop = <%% 56, 52, 42, 32, 7 %%>;
  billAreaTop = <%% 110, 92, 78, 60, 9 %%>;
  billAreaBottom = <%% 20, 10, 10, 8, 4 %%>;

  areaNameSize = <%% 16, 16, 15, 15, 3.5 %%>;
  areaNameWeight = <%% 700, 700, 700, 700, 700 %%>;
  areaNameLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  aboutGrayLeftBoxMargin = <%% 8, 8, 8, 8, 1 %%>;

  aboutGrayLeftWidth = <%% 580, 520, 460, 370, 52 %%>;
  aboutContentsHeight = <%% 250, 250, 230, 190, 42 %%>;

  aboutBetween = <%% 36, 32, 28, 24, 36 %%>;

  aboutGrayRightTitlePaddingTop = <%% 62, 42, 40, 35, 5 %%>;

  aboutTitleSize = <%% 26, 24, 22, 17, 4.2 %%>;
  aboutTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  aboutTitleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  aboutSubTitleSize = <%% 17, 16, 14, 11, 3 %%>;
  aboutSubTitleWeight = <%% 400, 400, 400, 400, 400 %%>;
  aboutSubTitleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  aboutDescriptionSize = <%% 14, 13, 12, 11, 3 %%>;
  aboutDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  aboutDescriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  aboutDescriptionMarginTop = <%% 60, 45, 42, 29, 4.5 %%>;

  processBlockWidth = <%% 120, 96, 84, 70, 20 %%>;
  processBlockHeight = <%% 80, 72, 64, 52, 10 %%>;

  processTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), 2.5 %%>;
  processSize = <%% 15, 14, 13, 11, 3.5 %%>;
  processWeight = <%% 600, 600, 600, 600, 400 %%>;
  processLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  processBlankHeight = <%% 170, 154, 138, 114, 17 %%>;
  processArrowWidth = <%% 43, 21, 18, 10, 4 %%>;
  processArrowHeight = <%% 10, 10, 8, 6, 1 %%>;
  processArrowTop = <%% 34, 30, 26, 22, 3 %%>;

  processNoticeBoxRight = <%% 38, 28, 26, 20, 38 %%>;
  processNoticeBoxBottom = <%% 36, 29, 25, 22, 36 %%>;

  processNoticeSize = <%% 12, 11, 11, 10, 2.5 %%>;
  processNoticeWeight = <%% 500, 500, 500, 500, 500 %%>;
  processNoticeMarginBottom = <%% 6, 4, 3, 2, 1 %%>;

  mobileProcessPaddingSmall = 2.5;
  mobileProcessPaddingBig = 6;

  billSize = <%% 37, 37, 36, 30, 7 %%>;
  billWeight = <%% 600, 600, 600, 600, 600 %%>;
  billLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  billEaSize = <%% 16, 16, 16, 16, 3 %%>;
  billEaWeight = <%% 400, 400, 400, 400, 400 %%>;
  billEaBottom = <%% 6, 6, 6, 6, 1.5 %%>;
  billEaLeft = <%% -57, -57, -57, -57, -11 %%>;

  billLineLeft = <%% -56, -56, -56, -56, -10 %%>;
  billLineWidth = <%% 230, 230, 225, 197, 42.9 %%>;

  beforeImageBetween = <%% 24, 20, 16, 12, 2 %%>;
  beforeWhiteCircleWidth = <%% 45, 40, 40, 36, 10 %%>;
  beforeArrowWidth = <%% 10, 10, 9, 8, 2.5 %%>;
  beforeArrowHeight = <%% 24, 20, 20, 16, 5 %%>;

  beforeFinalBottom = <%% 30, 30, 24, 20, 12 %%>;
  beforeTextBoxHeight = <%% 50, 42, 36, 30, 8 %%>;

  reviewInnerPadding = <%% 30, 28, 24, 20, 4.5 %%>;
  reviewMinHeight = <%% 108, 102, 96, 88, 49.5 %%>;
  reviewSize = <%% 14, 13, 12, 11, 2.8 %%>;

  reviewSlideWidth = <%% 624, 570, 540, 474, 54.2 %%>;

  reviewQuoteWidth = <%% 13, 13, 12, 11, 3 %%>;
  reviewQuoteBetween = <%% 5, 5, 5, 4, 1.5 %%>;

  reviewGrayHeight = <%% 168, 158, 144, 142, 58.5 %%>;

  contents = {
    title: {
      main: "홈리에종 Mini",
      sub: "mood-change",
    },
    description: [
      "<b%홈리에종 미니는 패브릭, 액자, 소품만으로 공간의 무드를 변화시켜주는 스타일링 서비스%b>예요.",
      "인테리어 시공은 부담스럽고, 가구는 그대로 쓰고 싶을 때, HomeLiaison mini가 도와줄게요!",
    ],
    about: {
      name: "상품 안내",
      title: {
        main: "패브릭 + 액자 + 소품",
        sub: "curtain, bedding, frame, home accessory, ...",
      },
      description: <&& "홈리에종의 미니 서비스는 공간별 신청하는 방식으로, 공간마다 각각 <b%베딩(침구), 커튼, 러그, 액자, 소품 품목%b>을 디자이너가 제안해 드립니다. 단, 공간의 목적과 사용 용도, 가지고 계신 가구의 상황에 따라 제안의 품목이 상이할 수 있습니다." | "홈리에종 미니 서비스는 공간별 신청하는 방식으로, <b%베딩(침구), 커튼, 러그, 액자, 소품 품목%b>을 제안드립니다. 단, 공간의 목적과 사용 용도, 가지고 계신 가구의 상황에 따라 제안의 품목이 상이할 수 있습니다." | "미니 서비스는 공간별 신청하는 방식으로, <b%베딩(침구), 커튼, 러그, 액자, 소품 품목%b>을 제안드립니다. 단, 공간의 목적과 사용 용도, 가지고 계신 가구의 상황에 따라 제안의 품목이 상이할 수 있습니다." | "미니 서비스는 공간별 신청하는 방식으로, <b%베딩, 커튼, 러그, 액자, 소품 품목%b>을 제안드립니다. 단, 공간의 목적과 용도, 가지고 계신 가구에 따라 제안이 상이할 수 있습니다." | "미니 서비스는 공간별 신청하는 방식으로, <b%베딩, 커튼, 러그, 액자, 소품 품목%b>을 제안드립니다. 단, 공간의 목적과 용도, 가지고 계신 가구에 따라 제안이 상이할 수 있습니다." &&>,
      images: [
        "about0.jpg",
        "about1.jpg",
        "about2.jpg",
        "about3.jpg",
        "about4.jpg",
      ]
    },
    before: {
      name: "무드 체인지를 한다면?",
      space: [ "거실", "알파룸", "아이방" ],
      sub: "비포 앤 에프터",
      images: [
        [ "ba_before_0.jpg", "ba_after_0.jpg" ],
        [ "ba_before_1.jpg", "ba_after_1.jpg" ],
        [ "ba_before_2.jpg", "ba_after_2.jpg" ],
      ]
    },
    review: {
      name: "미니 고객 리뷰",
      detail: [
        {
          text: [
            "처음 자취를 하게 되면서 집을 예쁘게 꾸미고 싶었는데, 아무리 따라해도 예쁜 사진처럼 되지 않더라고요. ",
            "같은 가구들은 모두 샀지만 제 방에 어울리는 지도 잘 모르겠어서 미니 서비스를 신청했어요!",
            "디자이너님이 추천해주신 소품이랑 커튼만 바꾼 것 같은데 집 분위기가 확 달라져서 너무 행복해요!",
          ]
        },
        {
          text: [
            "딸 방을 유아스러운 느낌을 없애고 고등학생 방으로 꾸며주고 싶었어요. 가구는 다 화이트여서 그대로 사용하면서 분위기를 바꿀 수 있지 않을까 했었어요.",
            "이번에 제안주신 것들을 그대로 다 샀더니 완전 새로운 방이 되었더라고요.",
            "딸도 만족해해서 홈스타일링의 전문성을 크게 느끼고 있어요ㅎㅎ 다음엔 전체도 해보고 싶어지더라구요.",
          ]
        },
        {
          text: [
            "신혼집으로 이사오면서 기대를 부풀고 예쁜 가구들을 구입했는데, 분위기가 살지 않는 것 같아요. ",
            "제가 고른건 남편은 별로 좋아하지 않고, 어렵고 힘들더라고요 ㅠㅠ",
            "디자이너님이 저희 의견을 반영하면서 제안주신 소품이 너무 마음에 들어서 하나씩 놓을 때마다 ",
            "점점 예뻐져서 엄청 설렜어요 ㅎㅎ 그려주신 시안이랑 똑같아서 신기했어요! 무드체인지라더니 진짜 무드가 확 변했습니다 감사해요!",
          ]
        },
        {
          text: [
            "결혼하고 신혼집 마련하면서 구입한 가구라 쉽게 바꾸기가 어려워서 어떻게 해야하나 고민이 많았어요ㅠ",
            "그러다 홈스타일링을 봤고 홈페이지에서 가구를 그대로 쓰고 나머지를 제안해준다고해서 이거다 하고 바로 결제했는데 제가 사면 이상하던 쿠션과 소품들이 너무 찰떡같이 어울리더라고요 마치 세트처럼ㅋㅋ 너무 만족합니다~",
          ]
        },
      ]
    },
    process: {
      name: "프로세스 안내",
      matrix: [
        [ [ "결제 완료", "및 확인" ] ],
        [ [ "고객 실측", "및 정보 입력" ] ],
        [ [ "디자이너", "정보 확인" ] ],
        [ [ "디자이너", "상담 시작" ] ],
        [ [ "디자인", "작업" ], [ "홈리에종의", "제안서 컨펌" ] ],
        [ [ "제안서", "고객 확인" ] ],
        [ [ "프로젝트", "완료" ] ],
      ],
      green: [ 1, 4, 5 ],
      notice: [
        <&& "고객 실측이 이루어져야 디자이너 상담이 가능합니다." | "고객 실측이 이루어져야 디자이너 상담이 가능합니다." | "실측이 이루어져야 상담이 가능합니다." | "실측이 이루어져야 상담이 가능합니다." | "실측이 이루어져야 상담이 가능합니다." &&>,
        <&& "홈리에종 컨펌은 영업일 기준으로 이루어집니다." | "홈리에종 컨펌은 영업일 기준으로 이루어집니다." | "컨펌은 영업일 기준으로 이루어집니다." | "컨펌은 영업일 기준으로 이루어집니다." | "컨펌은 영업일 기준으로 이루어집니다." &&>,
      ]
    },
    bill: {
      unit: "공간당",
      amount: 220000,
      ea: "원",
    },
  };

  processLength = contents.process.matrix.length;

  base = createNode({
    mother,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
    }
  });

  // title area

  createNode({
    mother: base,
    text: contents.title.main,
    style: {
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      color: colorChip.black,
      display: "block",
      textAlign: "center",
      lineHeight: String(titleLineHeight),
      position: "relative",
      top: desktop ? String(isMac() ? 0 : 3) + ea : "",
    }
  });

  createNode({
    mother: base,
    text: contents.title.sub,
    style: {
      fontSize: String(subTitleSize) + ea,
      fontWeight: String(subTitleWeight),
      fontFamily: "graphik",
      color: colorChip.black,
      display: "block",
      textAlign: "center",
      lineHeight: String(subTitleLineHeight),
    }
  });

  createNode({
    mother: base,
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      marginTop: String(descriptionMarginTop) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(descriptionLineTop) + ea,
          borderBottom: "1px solid " + colorChip.gray3,
        }
      },
      {
        text: contents.description.join("\n"),
        style: {
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionWeight),
          color: colorChip.black,
          display: desktop ? "inline-block" : "block",
          position: "relative",
          textAlign: "center",
          lineHeight: String(descriptionLineHeight),
          paddingLeft: String(descriptionPadding) + ea,
          paddingRight: String(descriptionPadding) + ea,
          background: colorChip.white,
          zIndex: String(1),
          width: desktop ? "" : withOut(descriptionPadding * 2, ea),
        },
        bold: {
          fontWeight: String(400),
          color: colorChip.green,
        },
      }
    ]
  });

  // about area

  createNode({
    mother: base,
    text: contents.about.name,
    style: {
      fontSize: String(areaNameSize) + ea,
      fontWeight: String(areaNameWeight),
      color: colorChip.black,
      display: "block",
      textAlign: "center",
      lineHeight: String(areaNameLineHeight),
      marginTop: String(aboutAreaTop) + ea,
    }
  });

  aboutGray = createNode({
    mother: base,
    style: {
      display: "block",
      background: colorChip.gray1,
      marginTop: String(grayTop) + ea,
      borderRadius: String(5) + "px",
      paddingTop: String(grayInnerPadding) + ea,
      paddingBottom: String(grayInnerPadding) + ea,
      paddingRight: String(grayInnerPadding) + ea,
      paddingLeft: String(grayInnerPadding) + ea,
      width: withOut(grayInnerPadding * 2, ea),
    }
  });

  aboutGrayLeft = createNode({
    mother: aboutGray,
    style: {
      display: desktop ? "inline-block" : "block",
      width: desktop ? String(aboutGrayLeftWidth) + ea : String(100) + '%',
      height: String(aboutContentsHeight) + ea,
      marginRight: String(aboutBetween) + ea,
      verticalAlign: "top",
    }
  });

  createNode({
    mother: aboutGrayLeft,
    style: {
      display: "inline-block",
      width: "calc(calc(100% - " + String(aboutGrayLeftBoxMargin) + ea + ") / 2)",
      height: String(100) + '%',
      background: colorChip.gray5,
      backgroundImage: "url('" + MiniAboutJs.binaryPath + "/" + contents.about.images[0] + "')",
      backgroundPosition: "50% 31%",
      backgroundSize: "100% auto",
      marginRight: String(aboutGrayLeftBoxMargin) + ea,
      borderRadius: String(3) + "px",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: aboutGrayLeft,
    style: {
      display: "inline-block",
      width: "calc(calc(100% - " + String(aboutGrayLeftBoxMargin) + ea + ") / 2)",
      height: String(100) + '%',
      verticalAlign: "top",
    },
    children: [
      {
        style: {
          display: "inline-block",
          width: "calc(calc(100% - " + String(aboutGrayLeftBoxMargin) + ea + ") / 2)",
          height: "calc(calc(100% - " + String(aboutGrayLeftBoxMargin) + ea + ") / 2)",
          background: colorChip.gray5,
          backgroundImage: "url('" + MiniAboutJs.binaryPath + "/" + contents.about.images[1] + "')",
          backgroundPosition: "50% 46%",
          backgroundSize: "100% auto",
          marginRight: String(aboutGrayLeftBoxMargin) + ea,
          marginBottom: String(aboutGrayLeftBoxMargin) + ea,
          borderRadius: String(3) + "px",
        }
      },
      {
        style: {
          display: "inline-block",
          width: "calc(calc(100% - " + String(aboutGrayLeftBoxMargin) + ea + ") / 2)",
          height: "calc(calc(100% - " + String(aboutGrayLeftBoxMargin) + ea + ") / 2)",
          background: colorChip.gray5,
          backgroundImage: "url('" + MiniAboutJs.binaryPath + "/" + contents.about.images[2] + "')",
          backgroundPosition: "50% 96%",
          backgroundSize: "100% auto",
          marginBottom: String(aboutGrayLeftBoxMargin) + ea,
          borderRadius: String(3) + "px",
        }
      },
      {
        style: {
          display: "inline-block",
          width: "calc(calc(100% - " + String(aboutGrayLeftBoxMargin) + ea + ") / 2)",
          height: "calc(calc(100% - " + String(aboutGrayLeftBoxMargin) + ea + ") / 2)",
          background: colorChip.gray5,
          backgroundImage: "url('" + MiniAboutJs.binaryPath + "/" + contents.about.images[3] + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "auto 100%",
          marginRight: String(aboutGrayLeftBoxMargin) + ea,
          borderRadius: String(3) + "px",
        }
      },
      {
        style: {
          display: "inline-block",
          width: "calc(calc(100% - " + String(aboutGrayLeftBoxMargin) + ea + ") / 2)",
          height: "calc(calc(100% - " + String(aboutGrayLeftBoxMargin) + ea + ") / 2)",
          background: colorChip.gray5,
          backgroundImage: "url('" + MiniAboutJs.binaryPath + "/" + contents.about.images[4] + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "100% auto",
          borderRadius: String(3) + "px",
        }
      },
    ]
  });

  aboutGrayRight = createNode({
    mother: aboutGray,
    style: {
      display: desktop ? "inline-block" : "block",
      width: desktop ? withOut(aboutGrayLeftWidth + aboutBetween, ea) : String(100) + '%',
      paddingTop: String(aboutGrayRightTitlePaddingTop) + ea,
      height: desktop ? String(aboutContentsHeight - aboutGrayRightTitlePaddingTop) + ea : "",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: aboutGrayRight,
    text: contents.about.title.main,
    style: {
      display: "block",
      position: "relative",
      top: String(isMac() ? 0 : 2) + ea,
      fontSize: String(aboutTitleSize) + ea,
      fontWeight: String(aboutTitleWeight),
      color: colorChip.green,
      textAlign: desktop ? "left" : "center",
      lineHeight: String(aboutTitleLineHeight),
    }
  });

  createNode({
    mother: aboutGrayRight,
    text: contents.about.title.sub,
    style: {
      display: "block",
      fontSize: String(aboutSubTitleSize) + ea,
      fontWeight: String(aboutSubTitleWeight),
      fontFamily: "graphik",
      color: colorChip.black,
      textAlign: desktop ? "left" : "center",
      lineHeight: String(aboutSubTitleLineHeight),
      paddingLeft: desktop ? "" : String(10) + ea,
      paddingRight: desktop ? "" : String(10) + ea,
    }
  });

  createNode({
    mother: aboutGrayRight,
    text: contents.about.description,
    style: {
      display: "block",
      fontSize: String(aboutDescriptionSize) + ea,
      fontWeight: String(aboutDescriptionWeight),
      color: colorChip.black,
      textAlign: desktop ? "left" : "center",
      marginTop: String(aboutDescriptionMarginTop) + ea,
      lineHeight: String(aboutDescriptionLineHeight),
      marginBottom: desktop ? "" : String(2) + ea,
    },
    bold: {
      fontWeight: String(700),
      color: colorChip.black,
    }
  });

  // before and after area

  createNode({
    mother: base,
    text: contents.before.name,
    style: {
      fontSize: String(areaNameSize) + ea,
      fontWeight: String(areaNameWeight),
      color: colorChip.black,
      display: "block",
      textAlign: "center",
      lineHeight: String(areaNameLineHeight),
      marginTop: String(processAreaTop) + ea,
    }
  });

  beforeGray = createNode({
    mother: base,
    style: {
      display: "block",
      position: "relative",
      background: colorChip.gray1,
      marginTop: String(grayTop) + ea,
      borderRadius: String(5) + "px",
      paddingTop: String(grayInnerPadding) + ea,
      paddingBottom: String(grayInnerPadding) + ea,
      paddingRight: String(grayInnerPadding) + ea,
      paddingLeft: String(grayInnerPadding) + ea,
      width: withOut(grayInnerPadding * 2, ea),
    }
  });

  if (desktop) {
    for (let i = 0; i < 3; i++) {
      createNode({
        mother: beforeGray,
        style: {
          display: "inline-block",
          position: "relative",
          width: desktop ? "calc(calc(100% - " + String(beforeImageBetween * 2) + ea + ") / " + String(3) + ")" : withOut(0),
          marginRight: desktop ? (i === 3 - 1 ? "" : String(beforeImageBetween) + ea) : "",
          zIndex: String(1),
        },
        children: [
          {
            mode: "img",
            attribute: { src: MiniAboutJs.binaryPath + "/" + contents.before.images[i][0] },
            style: {
              position: "relative",
              borderTopLeftRadius: String(5) + "px",
              borderTopRightRadius: String(5) + "px",
              width: withOut(0),
            }
          },
          {
            class: [ "backblurwhite" ],
            style: {
              display: "inline-flex",
              position: "absolute",
              bottom: String(-1 * (beforeWhiteCircleWidth / 2)) + ea,
              width: String(beforeWhiteCircleWidth) + ea,
              left: "calc(50% - " + String(beforeWhiteCircleWidth / 2) + ea + ")",
              height: String(beforeWhiteCircleWidth) + ea,
              borderRadius: String(beforeWhiteCircleWidth) + ea,
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            children: [
              {
                mode: "svg",
                source: svgMaker.verticalArrow(beforeArrowWidth, beforeArrowHeight),
                style: {
                  display: "inline-block",
                  width: String(beforeArrowWidth) + ea,
                  height: String(beforeArrowHeight) + ea,
                }
              }
            ]
          }
        ]
      });
    }
    for (let i = 0; i < 3; i++) {
      createNode({
        mother: beforeGray,
        style: {
          display: "inline-block",
          position: "relative",
          width: desktop ? "calc(calc(100% - " + String(beforeImageBetween * 2) + ea + ") / " + String(3) + ")" : withOut(0),
          marginRight: desktop ? (i === 3 - 1 ? "" : String(beforeImageBetween) + ea) : "",
          marginBottom: String(beforeFinalBottom) + ea,
        },
        children: [
          {
            mode: "img",
            attribute: { src: MiniAboutJs.binaryPath + "/" + contents.before.images[i][1] },
            style: {
              position: "relative",
              borderBottomLeftRadius: String(5) + "px",
              borderBottomRightRadius: String(5) + "px",
              width: withOut(0),
            }
          },
          {
            style: {
              display: "flex",
              position: "absolute",
              bottom: String(-1 * beforeTextBoxHeight) + ea,
              left: String(0),
              width: withOut(0),
              height: String(beforeTextBoxHeight) + ea,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            children: [
              {
                text: contents.before.space[i] + " <b%" + contents.before.sub + "%b>",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(processSize) + ea,
                  fontWeight: String(300),
                  color: colorChip.black,
                },
                bold: {
                  fontSize: String(processSize) + ea,
                  fontWeight: String(700),
                  color: colorChip.black,
                }
              }
            ]
          }
        ]
      });
    }
  } else {
    for (let i = 0; i < 3; i++) {
      createNode({
        mother: beforeGray,
        style: {
          display: "inline-block",
          position: "relative",
          width: desktop ? "calc(calc(100% - " + String(beforeImageBetween * 2) + ea + ") / " + String(3) + ")" : withOut(0),
          marginRight: desktop ? (i === 3 - 1 ? "" : String(beforeImageBetween) + ea) : "",
          zIndex: String(1),
        },
        children: [
          {
            mode: "img",
            attribute: { src: MiniAboutJs.binaryPath + "/" + contents.before.images[i][0] },
            style: {
              position: "relative",
              borderTopLeftRadius: String(5) + "px",
              borderTopRightRadius: String(5) + "px",
              width: withOut(0),
            }
          },
          {
            class: [ "backblurwhite" ],
            style: {
              display: "inline-flex",
              position: "absolute",
              bottom: String(-1 * (beforeWhiteCircleWidth / 2)) + ea,
              width: String(beforeWhiteCircleWidth) + ea,
              left: "calc(50% - " + String(beforeWhiteCircleWidth / 2) + ea + ")",
              height: String(beforeWhiteCircleWidth) + ea,
              borderRadius: String(beforeWhiteCircleWidth) + ea,
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            children: [
              {
                mode: "svg",
                source: svgMaker.verticalArrow(beforeArrowWidth, beforeArrowHeight),
                style: {
                  display: "inline-block",
                  width: String(beforeArrowWidth) + ea,
                  height: String(beforeArrowHeight) + ea,
                }
              }
            ]
          }
        ]
      });
      createNode({
        mother: beforeGray,
        style: {
          display: "inline-block",
          position: "relative",
          width: desktop ? "calc(calc(100% - " + String(beforeImageBetween * 2) + ea + ") / " + String(3) + ")" : withOut(0),
          marginRight: desktop ? (i === 3 - 1 ? "" : String(beforeImageBetween) + ea) : "",
          marginBottom: String(i === 3 - 1 ? 8 : beforeFinalBottom) + ea,
        },
        children: [
          {
            mode: "img",
            attribute: { src: MiniAboutJs.binaryPath + "/" + contents.before.images[i][1] },
            style: {
              position: "relative",
              borderBottomLeftRadius: String(5) + "px",
              borderBottomRightRadius: String(5) + "px",
              width: withOut(0),
            }
          },
          {
            style: {
              display: "flex",
              position: "absolute",
              bottom: String(-1 * beforeTextBoxHeight) + ea,
              left: String(0),
              width: withOut(0),
              height: String(beforeTextBoxHeight) + ea,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            children: [
              {
                text: contents.before.space[i] + " <b%" + contents.before.sub + "%b>",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(processSize) + ea,
                  fontWeight: String(300),
                  color: colorChip.black,
                },
                bold: {
                  fontSize: String(processSize) + ea,
                  fontWeight: String(700),
                  color: colorChip.black,
                }
              }
            ]
          }
        ]
      });
    }
  }

  // process area

  createNode({
    mother: base,
    text: contents.process.name,
    style: {
      fontSize: String(areaNameSize) + ea,
      fontWeight: String(areaNameWeight),
      color: colorChip.black,
      display: "block",
      textAlign: "center",
      lineHeight: String(areaNameLineHeight),
      marginTop: String(processAreaTop) + ea,
    }
  });

  processGray = createNode({
    mother: base,
    style: {
      display: "block",
      position: "relative",
      background: colorChip.gray1,
      marginTop: String(grayTop) + ea,
      borderRadius: String(5) + "px",
      paddingTop: String(grayInnerPadding) + ea,
      paddingBottom: String(grayInnerPadding) + ea,
      paddingRight: String(grayInnerPadding) + ea,
      paddingLeft: String(grayInnerPadding) + ea,
      width: withOut(grayInnerPadding * 2, ea),
    }
  });

  for (let i = 0; i < processLength; i++) {
    processBlock = createNode({
      mother: processGray,
      style: {
        display: desktop ? "inline-block" : "block",
        width: desktop ? String(processBlockWidth) + ea : String(100) + '%',
        verticalAlign: "top",
        marginBottom: desktop ? "" : String(2) + ea,
      }
    });

    for (let j = 0; j < contents.process.matrix[i].length; j++) {
      createNode({
        mother: processBlock,
        style: {
          display: desktop ? "flex" : "block",
          position: "relative",
          justifyContent: desktop ? "center" : "right",
          alignItems: "center",
          textAlign: desktop ? "center" : "right",
          height: String(processBlockHeight) + ea,
          background: desktop ? (contents.process.green.includes(i) ? colorChip.gradientGreen : colorChip.white) : colorChip.white,
          borderRadius: String(3) + "px",
          marginBottom: desktop ? String(j !== contents.process.matrix[i].length - 1 ? 10 : 0) + ea : "",
        },
        children: [
          {
            text: desktop ? contents.process.matrix[i][j].join("\n") : contents.process.matrix[i][j].join(" "),
            style: {
              display: desktop ? "block" : "inline-block",
              position: "relative",
              textAlign: desktop ? "center" : "right",
              top: String(processTextTop) + ea,
              fontSize: String(processSize) + ea,
              fontWeight: String(processWeight),
              color: desktop ? (contents.process.green.includes(i) ? colorChip.white : colorChip.black) : (contents.process.green.includes(i) ? colorChip.green : colorChip.black),
              lineHeight: String(processLineHeight),
              paddingRight: desktop ? "" : String(mobileProcessPaddingBig) + ea,
              paddingLeft: desktop ? "" : String(mobileProcessPaddingSmall) + ea,
              background: desktop ? "" : colorChip.white,
              zIndex: mobile ? String(1) : "",
            }
          }
        ]
      });
      if (mobile) {
        break;
      }
    }

    if (desktop) {
      if (i !== processLength - 1) {
        processBlank = createNode({
          mother: processGray,
          style: {
            display: "inline-block",
            position: "relative",
            width: "calc(calc(100% - " + String(processBlockWidth * processLength) + ea + ") / " + String(processLength - 1) + ")",
            height: String(processBlankHeight) + ea,
            verticalAlign: "top",
          }
        });

        createNode({
          mother: processBlank,
          mode: "svg",
          source: svgMaker.horizontalArrow(processArrowWidth, processArrowHeight),
          style: {
            position: "relative",
            top: String(processArrowTop) + ea,
            width: String(processArrowWidth) + ea,
            height: String(processArrowHeight) + ea,
          }
        });
      }

    } else {

      createNode({
        mother: processBlock.firstChild,
        text: String(i + 1),
        style: {
          display: "inline-block",
          position: "absolute",
          textAlign: "left",
          top: String(processTextTop) + ea,
          left: String(0),
          fontSize: String(processSize) + ea,
          fontWeight: String(700),
          color: desktop ? (contents.process.green.includes(i) ? colorChip.white : colorChip.black) : (contents.process.green.includes(i) ? colorChip.green : colorChip.black),
          lineHeight: String(processLineHeight),
          paddingLeft: String(mobileProcessPaddingBig) + ea,
          paddingRight: String(mobileProcessPaddingSmall) + ea,
          background: colorChip.white,
          zIndex: String(1),
        }
      });

      createNode({
        mother: processBlock.firstChild,
        style: {
          position: "absolute",
          display: "block",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(45) + '%',
          borderBottom: "1px solid " + colorChip.gray3,
          zIndex: String(0),
        }
      })

    }

  }

  if (desktop) {
    processNotice = createNode({
      mother: processGray,
      style: {
        position: "absolute",
        right: String(processNoticeBoxRight) + ea,
        bottom: String(processNoticeBoxBottom) + ea,
        textAlign: "right",
      }
    })
    for (let notice of contents.process.notice) {
      createNode({
        mother: processNotice,
        text: "* " + notice,
        style: {
          fontSize: String(processNoticeSize) + ea,
          fontWeight: String(processNoticeWeight),
          color: colorChip.green,
          marginBottom: String(processNoticeMarginBottom) + ea,
          textAlign: "right",
        }
      });
    }
  }

  // reivew area

  createNode({
    mother: base,
    text: contents.review.name,
    style: {
      fontSize: String(areaNameSize) + ea,
      fontWeight: String(areaNameWeight),
      color: colorChip.black,
      display: "block",
      textAlign: "center",
      lineHeight: String(areaNameLineHeight),
      marginTop: String(processAreaTop) + ea,
    }
  });

  reviewGray = createNode({
    mother: base,
    style: {
      display: "block",
      position: "relative",
      background: colorChip.gray1,
      marginTop: String(grayTop) + ea,
      borderRadius: String(5) + "px",
      paddingTop: String(grayInnerPadding) + ea,
      paddingBottom: String(grayInnerPadding) + ea,
      paddingRight: String(grayInnerPadding) + ea,
      paddingLeft: String(grayInnerPadding) + ea,
      width: withOut(grayInnerPadding * 2, ea),
      height: String(reviewGrayHeight) + ea,
    }
  });

  firstSlide = createNode({
    mother: reviewGray,
    style: {
      display: "inline-flex",
      position: "absolute",
      left: String(grayInnerPadding) + ea,
      width: String(reviewSlideWidth) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gray0,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      paddingTop: String(reviewInnerPadding) + ea,
      paddingBottom: String(reviewInnerPadding) + ea,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "left",
      height: String(reviewMinHeight) + ea,
      verticalAlign: "top",
      transformOrigin: "0% 50%",
      transform: "scale(0.85)",
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.doubleQuote(colorChip.gray4),
        style: {
          width: String(reviewQuoteWidth) + ea,
          display: "block",
          marginLeft: String(reviewInnerPadding + (desktop ? 1 : 0.3)) + ea,
          marginBottom: String(reviewQuoteBetween) + ea,
          transition: "all 0.5s ease",
        }
      },
      {
        text: contents.review.detail[1].text.join("\n"),
        style: {
          display: "block",
          marginLeft: String(reviewInnerPadding) + ea,
          width: withOut(reviewInnerPadding * 2, ea),
          fontSize: String(reviewSize) + ea,
          fontWeight: String(400),
          color: colorChip.deactive,
          lineHeight: String(1.6),
          transition: "all 0.5s ease",
        }
      }
    ]
  });

  thirdSlide = createNode({
    mother: reviewGray,
    style: {
      display: "inline-flex",
      position: "absolute",
      right: String(grayInnerPadding) + ea,
      width: String(reviewSlideWidth + (mobile ? 2 : 0)) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gray0,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      paddingTop: String(reviewInnerPadding) + ea,
      paddingBottom: String(reviewInnerPadding) + ea,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "left",
      height: String(reviewMinHeight) + ea,
      verticalAlign: "top",
      transformOrigin: "100% 50%",
      transform: "scale(0.85)",
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.doubleQuote(colorChip.gray4),
        style: {
          width: String(reviewQuoteWidth) + ea,
          display: "block",
          marginLeft: String(reviewInnerPadding + (desktop ? 1 : 0.3)) + ea,
          marginBottom: String(reviewQuoteBetween) + ea,
          transition: "all 0.5s ease",
        }
      },
      {
        text: contents.review.detail[2].text.join("\n"),
        style: {
          display: "block",
          marginLeft: String(reviewInnerPadding) + ea,
          width: withOut(reviewInnerPadding * 2, ea),
          fontSize: String(reviewSize) + ea,
          fontWeight: String(400),
          color: colorChip.deactive,
          lineHeight: String(1.6),
          transition: "all 0.5s ease",
        }
      }
    ]
  });

  secondSlide = createNode({
    mother: reviewGray,
    attribute: {
      value: String(0),
    },
    style: {
      display: "inline-flex",
      position: "absolute",
      left: withOut(50, reviewSlideWidth / 2, ea),
      width: String(reviewSlideWidth) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      paddingTop: String(reviewInnerPadding) + ea,
      paddingBottom: String(reviewInnerPadding) + ea,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "left",
      height: String(reviewMinHeight) + ea,
      verticalAlign: "top",
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.doubleQuote(colorChip.gray5),
        style: {
          width: String(reviewQuoteWidth) + ea,
          display: "block",
          marginLeft: String(reviewInnerPadding + (desktop ? 1 : 0.3)) + ea,
          marginBottom: String(reviewQuoteBetween) + ea,
          transition: "all 0.5s ease",
        }
      },
      {
        text: contents.review.detail[0].text.join("\n"),
        style: {
          display: "block",
          marginLeft: String(reviewInnerPadding) + ea,
          width: withOut(reviewInnerPadding * 2, ea),
          fontSize: String(reviewSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          lineHeight: String(1.6),
          transition: "all 0.5s ease",
        }
      }
    ]
  });

  convertingSlide = () => {
    const thisValue = Number(secondSlide.getAttribute("value"));
    const nextValue = thisValue + 1;

    secondSlide.setAttribute("value", String(nextValue));

    firstSlide.children[0].style.opacity = String(0);
    firstSlide.children[1].style.opacity = String(0);
    firstSlide.children[0].style.transform = "translateY(8px)";
    firstSlide.children[1].style.transform = "translateY(8px)";

    secondSlide.children[0].style.opacity = String(0);
    secondSlide.children[1].style.opacity = String(0);
    secondSlide.children[0].style.transform = "translateY(8px)";
    secondSlide.children[1].style.transform = "translateY(8px)";

    thirdSlide.children[0].style.opacity = String(0);
    thirdSlide.children[1].style.opacity = String(0);
    thirdSlide.children[0].style.transform = "translateY(8px)";
    thirdSlide.children[1].style.transform = "translateY(8px)";

    setTimeout(() => {
      firstSlide.children[1].textContent = contents.review.detail[((nextValue + 1) % 4)].text.join("\n");
      firstSlide.children[0].style.opacity = String(1);
      firstSlide.children[1].style.opacity = String(1);
      firstSlide.children[0].style.transform = "translateY(0px)";
      firstSlide.children[1].style.transform = "translateY(0px)";

      secondSlide.children[1].textContent = contents.review.detail[(nextValue % 4)].text.join("\n");
      secondSlide.children[0].style.opacity = String(1);
      secondSlide.children[1].style.opacity = String(1);
      secondSlide.children[0].style.transform = "translateY(0px)";
      secondSlide.children[1].style.transform = "translateY(0px)";

      thirdSlide.children[1].textContent = contents.review.detail[((nextValue + 2) % 4)].text.join("\n");
      thirdSlide.children[0].style.opacity = String(1);
      thirdSlide.children[1].style.opacity = String(1);
      thirdSlide.children[0].style.transform = "translateY(0px)";
      thirdSlide.children[1].style.transform = "translateY(0px)";
    }, 501);
  }

  setInterval(() => {
    convertingSlide();
  }, 10000);

  // for (let i = 0; i < contents.review.detail.length; i++) {
  //
  //   createNode({
  //     mother: reviewGray,
  //     style: {
  //       display: "inline-flex",
  //       width: desktop ? "calc(calc(100% - " + beforeImageBetween + ea + ") / 2)" : withOut(0),
  //       borderRadius: String(5) + "px",
  //       background: colorChip.white,
  //       marginRight: desktop ? String(i % 2 === 0 ? beforeImageBetween : 0) + ea : "",
  //       marginBottom: desktop ? String(Math.floor(i / 2) === 0 ? beforeImageBetween : 0) + ea : String(beforeImageBetween) + ea,
  //       boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
  //       paddingTop: String(reviewInnerPadding) + ea,
  //       paddingBottom: String(reviewInnerPadding) + ea,
  //       flexDirection: "column",
  //       justifyContent: "center",
  //       alignItems: "left",
  //       height: desktop ? String(128) + ea : "",
  //       verticalAlign: "top",
  //     },
  //     children: [
  //       {
  //         mode: "svg",
  //         source: svgMaker.doubleQuote(colorChip.gray5),
  //         style: {
  //           width: String(reviewQuoteWidth) + ea,
  //           display: "block",
  //           marginLeft: String(reviewInnerPadding + (desktop ? 1 : 0.3)) + ea,
  //           marginBottom: String(reviewQuoteBetween) + ea,
  //         }
  //       },
  //       {
  //         text: contents.review.detail[i].text.join("\n"),
  //         style: {
  //           display: "block",
  //           marginLeft: String(reviewInnerPadding) + ea,
  //           width: withOut(reviewInnerPadding * 2, ea),
  //           fontSize: String(reviewSize) + ea,
  //           fontWeight: String(400),
  //           color: colorChip.black,
  //           lineHeight: String(1.6),
  //         }
  //       }
  //     ]
  //   });
  //
  // }

  // bill area

  createNode({
    mother: base,
    style: {
      display: "block",
      position: "relative",
      textAlign: desktop ? "right" : "center",
      marginTop: String(billAreaTop) + ea,
      marginBottom: String(billAreaBottom) + ea,
    },
    children: [
      {
        text: autoComma(contents.bill.amount) + contents.bill.ea,
        style: {
          fontSize: String(billSize) + ea,
          fontWeight: String(billWeight),
          color: colorChip.green,
          display: "inline-block",
          position: "relative",
          textAlign: desktop ? "right" : "center",
          lineHeight: String(billLineHeight),
          marginLeft: desktop ? "" : String(8) + ea,
        },
        children: [
          {
            text: "*" + contents.bill.unit,
            style: {
              position: "absolute",
              fontSize: String(billEaSize) + ea,
              fontWeight: String(billEaWeight),
              color: colorChip.green,
              bottom: String(billEaBottom) + ea,
              left: String(billEaLeft) + ea,
            }
          },
          {
            style: {
              position: "absolute",
              bottom: String(0) + ea,
              left: String(billLineLeft) + ea,
              width: String(billLineWidth) + ea,
              height: String(0),
              borderBottom: "1px solid " + colorChip.gray3,
            }
          }
        ]
      }
    ]
  });

}

MiniAboutJs.prototype.insertWhyBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBase;
  let baseTongClone;
  let basePadding;
  let contentsBase;
  let firstBase;
  let leftWidth;
  let firstLeftBase, firstRightBase;
  let contents;
  let secondBase;
  let secondLeftBase, secondRightBase;
  let titleSize, titleWeight, titleLineHeight;
  let descriptionSize, descriptionWeight, descriptionLineHeight;
  let firstBlockMargin, secondBlockMargin;
  let minusPadding;
  let blockBetween;
  let descriptionBoldWeight;
  let secondPaddingTop, secondPaddingBottom, secondPaddingLeft;
  let secondTab;
  let arrowBaseWidth, arrowHeight;
  let arrowTop;
  let mobileTitleMarginBottom;
  let mobilePaddingBottomVisual;

  basePadding = <%% 110, 90, 85, 75, 11 %%>;
  leftWidth = <%% 400, 300, 280, 160, 11 %%>;

  minusPadding = <%% -50, -50, -48, -30, -6 %%>;
  blockBetween = <%% 40, 40, 40, 40, 7 %%>;

  titleSize = <%% 21, 20, 18, 15, 4 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  descriptionSize = <%% 16, 16, 15, 14, 3.2 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  firstBlockMargin = <%% 30, 30, 30, 30, 3 %%>;
  secondBlockMargin = <%% 25, 25, 25, 25, 1 %%>;

  secondPaddingTop = <%% (isMac() ? 15 : 17), (isMac() ? 15 : 17), (isMac() ? 13 : 15), (isMac() ? 13 : 15), 2.8 %%>;
  secondPaddingBottom = <%% (isMac() ? 20 : 18), (isMac() ? 20 : 18), (isMac() ? 18 : 16), (isMac() ? 18 : 16), 3.2 %%>;
  secondPaddingLeft = <%% 30, 30, 24, 22, 3 %%>;
  secondTab = <%% 310, 194, 145, 126, 31 %%>;

  arrowTop = <%% (isMac() ? 24 : 23), (isMac() ? 24 : 23), (isMac() ? 24 : 23), (isMac() ? 21 : 20), 24 %%>;
  arrowBaseWidth = <%% 36, 36, 34, 16, 36 %%>;
  arrowHeight = <%% 10, 10, 10, 10, 10 %%>;

  mobileTitleMarginBottom = 5;
  mobilePaddingBottomVisual = 2;

  contents = [
    {
      title: "왜 <b%Mini%b>인가요?",
      description: [
        (desktop ? "이제 혼자 고민하지 마세요! 1:1 전담 디자이너를 통해 <b%빠르고 쉽게 온라인으로 전문 제안%b>을 받을 수 있어요!" : "혼자 고민하지 않도록! <b%빠르고 쉬운 온라인 전문가%b> 제안!"),
        (desktop ? "기존 가구를 그대로 사용하면 공간 분위기가 바뀌지 않을까 걱정이신가요? <b%패브릭, 액자, 소품만 바꿨을 뿐인데, 분위기가 완전 달라질 수 있어요.%b> 신뢰할 수 있는 전문가를 믿고 따라오세요." : "패브릭, 액자, 소품만으로 <b%분위기 환골탈태!%b>"),
        (desktop ? "시즌, 트렌드에 맞춰 공간에 변화를 주고 싶은데 <b%시간이 부족했다면? HomeLiaison mini 서비스와 함께%b> 똑똑하게 스타일링하세요." : "우리 집도 <b%빠른 트렌드에 따라%b> 공간 변화를 누릴 수 있으니까!"),
      ]
    },
    {
      title: (desktop ? "<b%이런 분%b>들께\n추천드려요!" : "<b%이런 분%b>들께 추천드려요!"),
      description: [
        "가구는 그대로 사용한 채로 공간의 무드를 <b%확! 바꾸고 싶은 분!%b>",
        "혼자 발품 팔 시간은 부족하고, <b%전문가의 도움%b>이 필요하신 분!",
        "온라인으로 <b%쉽고 빠르게%b> 공간을 꾸미고 싶으신 분!",
      ]
    }
  ];

  whiteBase = createNode({
    mother: this.baseTong.parentElement,
    style: {
      display: "block",
      width: String(100) + '%',
      position: "relative",
      background: colorChip.white,
    }
  });

  baseTongClone = this.baseTong.cloneNode(false);
  whiteBase.appendChild(baseTongClone);

  baseTongClone.style.paddingTop = String(basePadding) + ea;
  baseTongClone.style.paddingBottom = desktop ? String(basePadding) + ea : String(basePadding + mobilePaddingBottomVisual) + ea;

  contentsBase = createNode({
    mother: baseTongClone,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    }
  });

  firstBase = createNode({
    mother: contentsBase,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    }
  });

  firstLeftBase = createNode({
    mother: firstBase,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? String(leftWidth) + ea : String(100) + '%',
      verticalAlign: "top",
    }
  });

  firstRightBase = createNode({
    mother: firstBase,
    style: {
      display: "inline-block",
      position: "relative",
      width: desktop ? withOut(leftWidth, ea) : withOut(-1 * minusPadding, ea),
      verticalAlign: "top",
      paddingTop: desktop ? "" : String(mobileTitleMarginBottom) + ea,
    }
  });

  createNode({
    mother: firstLeftBase,
    text: contents[0].title,
    style: {
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      color: colorChip.black,
      lineHeight: String(titleLineHeight),
    },
    bold: {
      fontWeight: String(titleWeight),
      color: colorChip.green,
    }
  });

  for (let i = 0; i < contents[0].description.length; i++) {

    createNode({
      mother: firstRightBase,
      text: contents[0].description[i],
      style: {
        display: "block",
        position: "relative",
        fontSize: String(descriptionSize) + ea,
        fontWeight: String(descriptionWeight),
        color: colorChip.black,
        lineHeight: String(descriptionLineHeight),
        marginBottom: String(firstBlockMargin) + ea,
        marginLeft: desktop ? "" : String(-1 * minusPadding) + ea,
      },
      bold: {
        fontWeight: String(descriptionBoldWeight),
        color: colorChip.black,
      },
      children: [
        {
          text: String(i + 1),
          style: {
            position: "absolute",
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(descriptionWeight),
            color: colorChip.green,
            top: String(0),
            left: String(minusPadding) + ea,
          }
        }
      ]
    })

  }

  secondBase = createNode({
    mother: contentsBase,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginTop: String(blockBetween) + ea,
    }
  });
  secondLeftBase = createNode({
    mother: secondBase,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? String(leftWidth) + ea : String(100) + '%',
      verticalAlign: "top",
    }
  });
  secondRightBase = createNode({
    mother: secondBase,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? withOut(leftWidth, ea) : String(100) + '%',
      verticalAlign: "top",
      paddingTop: desktop ? "" : String(mobileTitleMarginBottom) + ea,
    }
  });

  createNode({
    mother: secondLeftBase,
    text: contents[1].title,
    style: {
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      color: colorChip.black,
      lineHeight: String(titleLineHeight),
    },
    bold: {
      fontWeight: String(titleWeight),
      color: colorChip.green,
    }
  });

  for (let i = 0; i < contents[1].description.length; i++) {

    createNode({
      mother: secondRightBase,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(i === contents[1].description.length - 1 ? 0 : secondBlockMargin) + ea,
      },
      children: [
        {
          text: contents[1].description[i],
          style: {
            display: desktop ? "inline-block" : "block",
            position: "relative",
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(descriptionBoldWeight),
            color: colorChip.black,
            lineHeight: String(descriptionLineHeight),
            background: colorChip.gray1,
            paddingTop: String(secondPaddingTop) + ea,
            paddingBottom: String(secondPaddingBottom) + ea,
            paddingLeft: desktop ? String(secondPaddingLeft) + ea : "",
            paddingRight: desktop ? String(secondPaddingLeft) + ea : "",
            borderRadius: String(5) + "px",
            marginLeft: desktop ? String(i * secondTab) + ea : String(0) + ea,
            width: desktop ? "" : String(100) + '%',
            textAlign: desktop ? "" : "center"
          },
          bold: {
            fontWeight: String(descriptionBoldWeight),
            color: colorChip.green,
          },
        },
        {
          mode: "svg",
          source: svgMaker.horizontalArrow(arrowBaseWidth + (i * secondTab), arrowHeight, colorChip.gray4),
          style: {
            display: desktop ? "block" : "none",
            position: "absolute",
            top: String(arrowTop) + ea,
            left: String(minusPadding) + ea,
            width: String(arrowBaseWidth + (i * secondTab)) + ea,
            height: String(arrowHeight) + ea,
          }
        }
      ]
    });

  }

}

MiniAboutJs.prototype.insertFaqBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, serviceParsing, blankHref } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const ctaDownClassName = "ctaDownClassName";
  const goGeneralClassName = "goGeneralClassName";
  let baseTongClone;
  let grayBase;
  let whiteBlock;
  let bottomMargin;
  let margin;
  let basePadding;
  let faqBox;
  let contents;
  let blockBetween;
  let transparentBlock;
  let ruleBlockWidth;
  let faqSize, faqWeight;
  let faqBoxMarginTop;
  let faqFactorHeight;
  let faqFactorTextTop, faqFactorSize, faqFactorWeight;
  let faqAnswerSize;
  let finalPhotoHeight;
  let finalSize, finalWeight, finalLineHeight;
  let finalBarWidth, finalBarHeight, finalBarMarginBottom;
  let buttonWidth, buttonHeight;
  let finalVisual;
  let buttonTextTop, buttonVisual, buttonWeight;
  let rulesBoxPaddingTop;
  let rulesTitleSize, rulesTitleWeight, rulesTitleLineHeight;
  let rulesContentsMarginTop, rulesContentsSize, rulesContentsWeight, rulesContentsLineHeight;
  let rulesContentsLineTop;
  let faqBlocks;
  let faqPaddingLeft, faqPaddingTop;
  let faqButtonWidth, faqButtonHeight, faqButtonMarginTop, faqButtonTextTop;

  bottomMargin = <%% 200, 200, 200, 200, 16 %%>;
  margin = <%% 68, 64, 56, 48, 6 %%>;
  basePadding = <%% 110, 90, 85, 75, 13 %%>;
  blockBetween = <%% 10, 10, 10, 10, 2 %%>;

  faqSize = <%% 36, 36, 32, 27, 5 %%>;
  faqWeight = <%% 400, 400, 400, 400, 400 %%>;

  faqBoxMarginTop = <%% 42, 42, 40, 32, 5 %%>;

  faqFactorHeight = <%% 72, 68, 64, 50, 11 %%>;
  faqFactorTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.2 %%>;
  faqFactorSize = <%% 16, 16, 15, 13, 3.1 %%>;
  faqFactorWeight = <%% 600, 600, 600, 600, 600 %%>;
  faqAnswerSize = <%% 14, 14, 13, 12, 2.8 %%>;

  finalPhotoHeight = <%% 300, 300, 280, 240, 56 %%>;

  finalSize = <%% 28, 26, 24, 21, 5 %%>;
  finalWeight = <%% 700, 700, 700, 700, 700 %%>;
  finalLineHeight = <%% 1.35, 1.35, 1.35, 1.35, 1.35 %%>;

  finalBarWidth = <%% 40, 40, 40, 40, 5 %%>;
  finalBarHeight = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 15 : 13), (isMac() ? 12 : 10), 3 %%>;
  finalBarMarginBottom = <%% 24, 24, 21, 18, 4.5 %%>;

  buttonWidth = <%% 100, 100, 100, 90, 22 %%>;
  buttonHeight = <%% 45, 45, 42, 38, 9 %%>;

  finalVisual = <%% 8, 8, 8, 8, 0 %%>;

  buttonTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.4 %%>;
  buttonVisual = <%% 16, 16, 15, 14, 3.2 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;

  ruleBlockWidth = <%% 420, 330, 275, 235, 33 %%>;

  rulesBoxPaddingTop = <%% 100, 90, 85, 65, 13 %%>;

  rulesTitleSize = <%% 15, 15, 14, 13, 3 %%>;
  rulesTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  rulesTitleLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  rulesContentsMarginTop = <%% 8, 8, 8, 8, 1.5 %%>;
  rulesContentsSize = <%% 13, 13, 12, 10, 2.5 %%>;
  rulesContentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  rulesContentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

  rulesContentsLineTop = <%% 40, 40, 40, 40, 6 %%>;

  faqPaddingLeft = <%% 45, 45, 45, 45, 5 %%>;
  faqPaddingTop = <%% 32, 32, 32, 32, 5 %%>;

  faqButtonWidth = <%% 154, 154, 145, 138, 30 %%>;
  faqButtonHeight = <%% 36, 36, 36, 34, 8 %%>;
  faqButtonMarginTop = <%% 20, 20, 20, 20, 3 %%>;
  faqButtonTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;

  contents = {
    faq: [
      {
        question: "가구도 추천해주시는 건가요?",
        answer: "홈리에종 mini는 <b%기존 가구를 그대로 활용하되 합리적인 비용으로 패브릭, 액자, 소품을 활용해 공간의 무드를 크게 변화시킬 수 있는 라이트한 서비스로 제공%b>하고 있습니다. 가구 체인지 도움이 필요하시다면 홈리에종의 온/오프라인 서비스를 이용해보세요!",
        important: true,
        button: (e) => { blankHref("/about.php") }
      },
      {
        question: "디자이너를 선택할 수 있나요?",
        answer: "홈리에종 mini는 <b%홈리에종의 전문적인 교육을 받은 디자이너가 프로젝트를 담당%b>합니다. 특화된 서비스에 맞게 홈리에종에서 디자이너 모두 동일한 mini 서비스를 제공하기 때문에 따로 지정을 하지 않고, 자동 배치하여 빠른 서비스로 만나 볼 수 있어요!",
        important: false,
        button: null
      },
      {
        question: "기간은 얼마나 소요되나요?",
        answer: "홈리에종 mini는 큰 가구의 제작 기간이나 맞춤 제작 상품을 제안하지 않고, 빠른 시일 내 가장 어울리는 우리 집의 모습을 보여드리기 위해 기성 제품을 추천드리고 있어요.\n\n각 제품을 판매하고 있는 판매처의 상황에 따라 다를 수 있지만, <b%디자이너의 제안은 고객님께서 전달해 주실 기본 정보를 받는 기준, 3일 내로 내 공간을 위한 나만의 시안을 받아보실 수 있답니다!%b>(*구매처의 배송 기간에 따라 완료까지 소요되는 기간이 상이할 수 있습니다.)",
        important: false,
        button: null
      },
      {
        question: "배치도 해주시나요?",
        answer: "홈리에종 서비스는 고객에게 제안서와 제안서 내의 제안 제품을 편리하게 구매하실 수 있도록 구매 리스트 제공까지를 디자이너의 역할로 안내하고 있습니다. 구매 진행 또한 고객님의 선택이시며, <b%디자이너가 제안하는 배치도에 맞게 액자 및 소품을 배치%b>해주시면 됩니다 :)",
        important: false,
        button: null
      },
      {
        question: "공간 1개만 해도 되나요?",
        answer: "물론 가능합니다 :) <b%최소 공간 1개부터 진행 가능한 서비스를 제공%b>하고 있습니다. 공간의 목적이 어떤 지에 따라서 필요한 패브릭, 액자, 소품이 달라지고 모든 공간의 제안 품목과 수량은 고객님의 댁의 상황에 맞추어 제안하게 됩니다 :)",
        important: false,
        button: null
      },
      {
        question: "실측은 어떻게 해야 하나요?",
        answer: "나 혼자 하기 어려웠던 실측, 이젠 걱정하지 마세요!\n<b%실측 가이드를 제공하여 쉽고 빠르게 직접 실측할 수 있도록%b> 홈리에종이 도와드려요!",
        important: false,
        button: null
      },
      {
        question: "디자이너 제안서는 어떤 내용으로 제안받나요?",
        answer: "디자이너의 제안서는 고객에게 제공받은 공간의 사이즈, 사진 속의 배치를 기반으로 고객님이 원하는 무드에 대해 상담 후, <b%디자이너와 약속된 컨셉과 무드의 공간을 시각화한 자료를 통해 제안서로 제공%b>받게 됩니다.\n\n시각화 자료는 실제 제품의 재질, 조화를 보여주기 위해 3D가 아닌 평면적인 콜라주 형태의 제안서로 제공됩니다.",
        important: false,
        button: null
      },
      {
        question: "디자인 제안받은 후에 수정도 가능할까요?",
        answer: "디자이너는 고객과의 상담 내용을 바탕으로 디자인 작업을 진행하게 됩니다. <b%따라서 상담 내용과 다른 내용의 수정 제안서는 제공되지 않습니다.%b>\n\n디자이너와 상담 시, 부담 없이 원하는 부분에 대해 상세하게 설명을 해주시면 원하는 방향의 스타일링을 원활하게 받으실 수 있어요!",
        important: false,
        button: null
      },
    ],
    final: {
      wording: [
        "우리 집 무드 체인지",
        "홈리에종 Mini와 함께"
      ],
      button: "시작하기",
    },
    rules: [
      {
        title: "취소 규정",
        description: [
          "디자이너와의 상담 시작 1일 전 결제 취소 가능합니다.",
          <&& "디자이너와의 상담이 시작된 이후에는 결제 취소가 불가능합니다." | "디자이너와의 상담이 시작된 이후에는 취소가 불가능합니다." | "디자이너와 상담이 시작된 이후에는 취소가 불가능합니다." | "디자이너와 상담이 시작된 이후에는 취소가 불가능합니다." | "디자이너와 상담이 시작된 이후에는 취소가 불가능합니다." &&>,
        ]
      },
      {
        title: "환불 규정",
        description: [
          "디자이너와의 상담 시작 1일 전 100% 환불 가능합니다.",
          "디자이너와의 상담이 시작되면 환불이 불가능합니다.",
        ]
      },
      {
        title: "유의 사항",
        description: [
          "결제 완료 후, 요청한 공간 정보가 확인되면 디자이너와의 디자인 제안 작업 및 상담이 가능합니다.",
          "디자이너 선택은 불가하며, 디자이너는 홈리에종 시스템 내에서 지정됩니다.",
          "디자이너의 디자인 제안서는 1회에 한정됩니다.",
          "실측 서비스는 제공되지 않으며, 고객님께서 어렵지 않게 실측할 수 있도록 실측 가이드를 안내해드립니다.",
          "제작이 필요한 패브릭, 소품 등은 제안하지 않습니다.",
          "홈리에종 Mini 서비스는 제품 구매 리스트 제안까지 제공됩니다. 대리 구매, 배치 서비스 등 구매 이후의 단계의 서비스는 제공되지 않습니다.",
          "홈리에종 Mini 서비스는 가구 품목을 제안하지 않습니다.",
        ]
      },
    ]
  };

  if (mobile) {
    contents.rules = [
      {
        title: "취소 / 환불 규정",
        description: [
          "디자이너와의 상담 시작 1일 전 결제 취소 가능합니다.",
          <&& "디자이너와의 상담이 시작된 이후에는 결제 취소가 불가능합니다." | "디자이너와의 상담이 시작된 이후에는 취소가 불가능합니다." | "디자이너와 상담이 시작된 이후에는 취소가 불가능합니다." | "디자이너와 상담이 시작된 이후에는 취소가 불가능합니다." | "디자이너와 상담이 시작된 이후에는 취소가 불가능합니다." &&>,
          "디자이너와의 상담 시작 1일 전 100% 환불 가능합니다.",
          "디자이너와의 상담이 시작되면 환불이 불가능합니다.",
        ]
      },
      {
        title: "유의 사항",
        description: [
          "결제 완료 후, 요청한 공간 정보가 확인되면 디자이너와의 디자인 제안 작업 및 상담이 가능합니다.",
          "디자이너 선택은 불가하며, 디자이너는 홈리에종 시스템 내에서 지정됩니다.",
          "디자이너의 디자인 제안서는 1회에 한정됩니다.",
          "실측 서비스는 제공되지 않으며, 고객님께서 어렵지 않게 실측할 수 있도록 실측 가이드를 안내해드립니다.",
          "제작이 필요한 패브릭, 소품 등은 제안하지 않습니다.",
          "홈리에종 Mini 서비스는 제품 구매 리스트 제안까지 제공됩니다. 대리 구매, 배치 서비스 등 구매 이후의 단계의 서비스는 제공되지 않습니다.",
          "홈리에종 Mini 서비스는 가구 품목을 제안하지 않습니다.",
        ]
      },
    ]
  }

  grayBase = createNode({
    mother: this.baseTong.parentElement,
    style: {
      display: "block",
      width: String(100) + '%',
      position: "relative",
      background: colorChip.gray1,
    }
  });

  baseTongClone = this.baseTong.cloneNode(false);
  grayBase.appendChild(baseTongClone);
  baseTongClone.style.paddingTop = String(basePadding) + ea;
  baseTongClone.style.paddingBottom = String(bottomMargin) + ea;

  whiteBlock = createNode({
    mother: baseTongClone,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      paddingTop: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      overflow: "hidden",
    }
  });

  createNode({
    mother: whiteBlock,
    text: "FAQ",
    style: {
      display: "block",
      position: "relative",
      fontSize: String(faqSize) + ea,
      fontWeight: String(faqWeight),
      fontFamily: "graphik",
      color: colorChip.black,
      textAlign: "center",
      paddingTop: desktop ? "" : String(1) + ea,
    }
  })

  faqBox = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      marginTop: String(faqBoxMarginTop) + ea,
      paddingBottom: String(margin) + ea,
    }
  });

  faqBlocks = [];
  for (let i = 0; i < contents.faq.length; i++) {

    faqBlocks.push(createNode({
      mother: faqBox,
      attribute: {
        index: String(i),
      },
      event: {
        click: function (e) {
          const index = Number(this.getAttribute("index"));
          const { question, answer } = contents.faq[index];
          const faqPopupClassName = "faqPopupClassName";
          let cancelBack, whiteBase;
          let zIndex;

          zIndex = 4;

          for (let faq of faqBlocks) {
            if (faq !== this) {
              faq.firstChild.style.color = colorChip.gray2;
            } else {
              faq.firstChild.style.color = colorChip.green;
            }
          }

          cancelBack = createNode({
            mother: this,
            class: [ faqPopupClassName ],
            event: {
              click: function (e) {
                e.stopPropagation();
                const removeTargets = document.querySelectorAll('.' + faqPopupClassName);
                for (let faq of faqBlocks) {
                    faq.firstChild.style.color = colorChip.black;
                }
                for (let dom of removeTargets) {
                  dom.remove();
                }
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              height: String(100) + '%',
              zIndex: String(zIndex),
            }
          });

          whiteBase = createNode({
            mother: this,
            class: [ faqPopupClassName ],
            event: {
              click: function (e) {
                e.stopPropagation();
              }
            },
            style: {
              position: "absolute",
              top: String(faqFactorHeight + blockBetween - 1) + ea,
              left: String(-1) + ea,
              width: "calc(100% + " + String(1 * 2) + ea + ")",
              paddingTop: String(faqPaddingTop) + ea,
              paddingBottom: String(faqPaddingTop) + ea,
              background: colorChip.white,
              borderRadius: String(8) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
              animation: "fadeuphard 0.3s ease forwards",
              zIndex: String(zIndex),
            }
          });

          createNode({
            mother: whiteBase,
            text: answer,
            style: {
              display: "block",
              position: "relative",
              fontSize: String(faqAnswerSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              lineHeight: String(1.7),
              marginLeft: String(faqPaddingLeft) + ea,
              marginRight: String(faqPaddingLeft) + ea,
              width: withOut(faqPaddingLeft * 2, ea),
              textAlign: "left",
            },
            bold: {
              fontSize: String(faqAnswerSize) + ea,
              color: colorChip.black,
              fontWeight: String(700),
            }
          });

          if (typeof contents.faq[index].button === "function") {
            createNode({
              mother: whiteBase,
              class: [ goGeneralClassName ],
              event: { click: contents.faq[index].button },
              style: {
                display: "inline-flex",
                background: colorChip.gradientGreen,
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                width: String(faqButtonWidth) + ea,
                height: String(faqButtonHeight) + ea,
                borderRadius: String(5) + "px",
                marginTop: String(faqButtonMarginTop) + ea,
                cursor: "pointer",
              },
              children: [
                {
                  text: "홈리에종 서비스 소개",
                  style: {
                    position: "relative",
                    fontSize: String(faqAnswerSize) + ea,
                    fontWeight: String(700),
                    color: colorChip.white,
                    lineHeight: String(1.7),
                    top: String(faqButtonTextTop) + ea,
                  }
                }
              ]
            });
          }

        }
      },
      style: {
        display: desktop ? "inline-flex" : "flex",
        position: "relative",
        marginRight: desktop ? String(i % 2 === 0 ? blockBetween : 0) + ea : "",
        marginBottom: String(blockBetween) + ea,
        width: desktop ? "calc(calc(100% - " + String(blockBetween) + ea + ") / 2)" : String(100) + '%',
        height: String(faqFactorHeight) + ea,
        border: "1px solid " + (contents.faq[i].important ? colorChip.green : colorChip.gray3),
        boxSizing: "border-box",
        borderRadius: String(8) + "px",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
      },
      children: [
        {
          text: contents.faq[i].question,
          style: {
            position: "relative",
            top: String(faqFactorTextTop) + ea,
            fontSize: String(faqFactorSize) + ea,
            fontWeight: String(faqFactorWeight),
            color: colorChip.black,
          }
        }
      ]
    }));

  }

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      height: String(finalPhotoHeight) + ea,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
    },
    children: [
      {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * margin) + ea,
          width: "calc(100% + " + String(margin * 2) + ea + ")",
          height: String(100) + '%',
          background: colorChip.shadow,
          backgroundImage: "url('" + MiniAboutJs.binaryPath + "/" + "below.jpg" + "')",
          backgroundSize: "100% auto",
          backgroundPosition: "50% 50%",
        }
      },
      {
        text: contents.final.wording.join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(finalSize) + ea,
          fontWeight: String(finalWeight),
          color: colorChip.white,
          lineHeight: String(finalLineHeight),
          textAlign: "center",
        }
      },
      {
        style: {
          display: "inline-block",
          width: String(finalBarWidth) + ea,
          height: String(finalBarHeight) + ea,
          marginBottom: String(finalBarMarginBottom) + ea,
          position: "relative",
          borderBottom: "1px solid " + colorChip.white,
        }
      },
      {
        class: [ ctaDownClassName ],
        event: {
          click: instance.whiteSubmitEvent(),
        },
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(buttonWidth) + ea,
          height: String(buttonHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.white,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: String(finalVisual) + ea,
        },
        children: [
          {
            text: contents.final.button,
            style: {
              position: "relative",
              top: String(buttonTextTop) + ea,
              textAlign: "center",
              fontSize: String(buttonVisual) + ea,
              fontWeight: String(buttonWeight),
              color: colorChip.black,
            }
          }
        ]
      }
    ]
  });

  transparentBlock = createNode({
    mother: baseTongClone,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      paddingTop: String(rulesBoxPaddingTop) + ea,
      width: withOut(0, ea),
    }
  });

  createNode({
    mother: transparentBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? String(ruleBlockWidth) + ea : String(100) + '%',
      verticalAlign: "top",
      borderTop: "1px solid " + colorChip.black,
      paddingTop: String(rulesContentsLineTop) + ea,
    },
    children: [
      {
        text: contents.rules[0].title,
        style: {
          fontSize: String(rulesTitleSize) + ea,
          fontWeight: String(rulesTitleWeight),
          color: colorChip.black,
          lineHeight: String(rulesTitleLineHeight),
        }
      },
      {
        text: contents.rules[0].description.join("\n"),
        style: {
          marginTop: String(rulesContentsMarginTop) + ea,
          fontSize: String(rulesContentsSize) + ea,
          fontWeight: String(rulesContentsWeight),
          color: colorChip.black,
          lineHeight: String(rulesContentsLineHeight),
        }
      }
    ]
  });

  createNode({
    mother: transparentBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? String(ruleBlockWidth) + ea : String(100) + '%',
      verticalAlign: "top",
      borderTop: desktop ? "1px solid " + colorChip.black : "",
      paddingTop: String(rulesContentsLineTop) + ea,
    },
    children: [
      {
        text: contents.rules[1].title,
        style: {
          fontSize: String(rulesTitleSize) + ea,
          fontWeight: String(rulesTitleWeight),
          color: colorChip.black,
          lineHeight: String(rulesTitleLineHeight),
        }
      },
      {
        text: contents.rules[1].description.join("\n"),
        style: {
          marginTop: String(rulesContentsMarginTop) + ea,
          fontSize: String(rulesContentsSize) + ea,
          fontWeight: String(rulesContentsWeight),
          color: colorChip.black,
          lineHeight: String(rulesContentsLineHeight),
        }
      }
    ]
  });

  if (desktop) {
    createNode({
      mother: transparentBlock,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        width: desktop ? withOut(ruleBlockWidth * 2, ea) : String(100) + '%',
        verticalAlign: "top",
        borderTop: desktop ? "1px solid " + colorChip.black : "",
        paddingTop: String(rulesContentsLineTop) + ea,
      },
      children: [
        {
          text: contents.rules[2].title,
          style: {
            fontSize: String(rulesTitleSize) + ea,
            fontWeight: String(rulesTitleWeight),
            color: colorChip.black,
            lineHeight: String(rulesTitleLineHeight),
          }
        },
        {
          text: contents.rules[2].description.join("\n"),
          style: {
            marginTop: String(rulesContentsMarginTop) + ea,
            fontSize: String(rulesContentsSize) + ea,
            fontWeight: String(rulesContentsWeight),
            color: colorChip.black,
            lineHeight: String(rulesContentsLineHeight),
          }
        }
      ]
    });
  }

}

MiniAboutJs.prototype.whiteSubmitEvent = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, serviceParsing, ajaxJson, setQueue, autoHypenPhone, findByAttribute, homeliaisonAnalytics, autoComma, selfHref } = GeneralJs;
  const { ea, media, standardWidth, totalContents, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  return function (e) {
    const zIndex = 4;
    const popupClassName = "popupClassName";
    const inputClassName = "userInputClassName";
    const priceTargetClassName = "priceTargetClassName";
    const agreeTargetClassName = "agreeTargetClassName";
    const priceButtonClassName = "priceButtonClassName";
    const initialPrice = 220000;
    let cancelBack, whiteBase;
    let whiteWidth;
    let whiteMargin;
    let innerMargin;
    let contentsTong;
    let titleArea, formArea, paymentArea;
    let titleHeight, formHeight, paymentHeight;
    let titleSize, titleWeight, titleLineHeight, titleTop;
    let formPaddingTop;
    let formBox;
    let circleRadius;
    let circleTop;
    let circleBetween;
    let grayTop;
    let grayInputTop;
    let grayHeight;
    let grayBigHeight;
    let grayTextAreaTop;
    let grayTextAreaWidth;
    let moduleHeight;
    let blockMarginBottom;
    let mainSize;
    let mainWeight;
    let mainTop;
    let inputSize;
    let inputWeight;
    let inputIndent;
    let leftGrayType0;
    let leftGrayType1;
    let leftGrayType2;
    let leftGrayType3;
    let widthGrayType0;
    let widthGrayType1;
    let widthGrayType2;
    let widthGrayType3;
    let addressWidth;
    let addressSize;
    let addressWeight;
    let addressTop;
    let marginRatio;
    let textareaTop;
    let textareaLeft;
    let grayLineBlockFontSize;
    let grayLineBlockFontWeight;
    let grayLineBlockFontTop;
    let policyInnerPadding;
    let policyTong;
    let policyTextSize;
    let agreeSize, agreeWeight, agreeCircleBetween, agreeCircleTop;
    let paymentAmountSize, paymentAmountWeight, paymentAmountTop, paymentAmountBetween;
    let paymentButtonSize, paymentButtonWeight, paymentButtonTop, paymentButtonPaddingTop, paymentButtonPaddingBottom, paymentButtonPaddingLeft;
    let whiteMaxHeight;
    let addressPromptWidth;
    let addressPromptHeight;
    let agreeEvent;
    let oidConst;
    let paymentAmountSizeSub;

    whiteWidth = <%% 1000, 1000, 800, 660, 88 %%>;
    whiteMargin = <%% 54, 54, 54, 54, 6 %%>;
    innerMargin = <%% 54, 54, 54, 54, 6 %%>;

    whiteMaxHeight = 900;

    titleHeight = <%% 41, 39, 37, 35, 8 %%>;
    paymentHeight = <%% 70, 70, 70, 70, 14 %%>;

    titleSize = <%% 27, 26, 24, 22, 4 %%>;
    titleWeight = <%% 700, 700, 700, 700, 700 %%>;
    titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
    titleTop = <%% (isMac() ? -10 : -7), (isMac() ? -10 : -7), (isMac() ? -10 : -7), (isMac() ? -10 : -7), -0.2 %%>;

    formPaddingTop = <%% 40, 40, 40, 40, 6 %%>;

    circleRadius = <%% 2.5, 2.5, 2, 2, 0.5 %%>;
    circleTop = <%% 12, 12, 11, 10.5, (isIphone() ? 2.9 : 2.7) %%>;
    circleBetween = <%% 6, 6, 5, 5, 1.3 %%>;

    grayTop = <%% 0, 0, 0, 0, 0 %%>;
    grayInputTop = <%% (isMac() ? -1.5 : 0), (isMac() ? -1.5 : 0), (isMac() ? -1.5 : 0), (isMac() ? -1.5 : 0), -0.2 %%>;
    grayHeight = <%% 32, 32, 31, 31, 7 %%>;
    grayBigHeight = <%% 92, 92, 92, 92, 31 %%>;
    grayTextAreaTop = <%% 0, 0, 0, 0, 0 %%>;
    grayTextAreaWidth = <%% 51.7, 51.7, 51.7, 390, 51.7 %%>;

    moduleHeight = grayTop + grayHeight;
    blockMarginBottom = <%% 12, 12, 9, 9, 2 %%>;

    mainSize = <%% 20, 18, 17, 16, 4 %%>;
    mainWeight = <%% 500, 500, 500, 500, 500 %%>;
    mainTop = <%% (isMac() ? 0 : 3), (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 4), 0.5 %%>;
    inputSize = <%% 13, 13, 12, 12, 3 %%>;
    inputWeight = <%% 400, 400, 400, 400, 400 %%>;
    inputIndent = <%% 10, 10, 10, 10, 2.5 %%>;

    leftGrayType0 = <%% 101, 90, 78, 78, 18 %%>;
    leftGrayType1 = <%% 418, 361, 318, 96, 22.8 %%>;
    leftGrayType2 = <%% 125, 112, 98, 98, 22.8 %%>;
    leftGrayType3 = <%% 164, 151, 130, 129, 30.5 %%>;

    widthGrayType0 = <%% 160, 140, 130, 150, 34 %%>;
    widthGrayType1 = <%% 455, 329, 283, 403, 58 %%>;
    widthGrayType2 = <%% 767, 588, 503, 383, 53.2 %%>;
    widthGrayType3 = <%% 392, 268, 231, 352, 45.5 %%>;

    addressWidth = <%% 54, 54, 46, 46, 11 %%>;
    addressSize = <%% 13, 13, 12, 12, 3 %%>;
    addressWeight = <%% 600, 600, 600, 600, 600 %%>;
    addressTop = <%% (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), 1.2 %%>;

    marginRatio = <%% 0.5, 0.5, 0.5, 0.5, 0.5 %%>;

    textareaTop = <%% 10, 10, 10, 10, 2 %%>;
    textareaLeft = <%% 15, 15, 15, 15, 2.5 %%>;

    grayLineBlockFontSize = <%% 14, 12, 12, 12, 3 %%>;
    grayLineBlockFontWeight = <%% 400, 400, 400, 300, 400 %%>;
    grayLineBlockFontTop = <%% 15, 15, 15, 15, 15 %%>;

    policyInnerPadding = <%% 16, 16, 16, 16, 4 %%>;
    policyTextSize = <%% 10, 10, 10, 10, 2.5 %%>;

    agreeCircleBetween = <%% 5, 5, 5, 5, 1 %%>;
    agreeCircleTop = <%% 8, 8, 8, 8, 1.7 %%>;
    agreeSize = <%% 14, 14, 14, 14, 3 %%>;
    agreeWeight = <%% 600, 600, 600, 600, 600 %%>;

    paymentAmountSize = <%% 30, 30, 29, 27, 3.7 %%>;
    paymentAmountSizeSub = <%% 13, 13, 12, 11, 2.5 %%>;
    paymentAmountWeight = <%% 600, 600, 600, 600, 600 %%>;
    paymentAmountTop = <%% (isMac() ? 17 : 19), (isMac() ? 17 : 19), (isMac() ? 17 : 19), (isMac() ? 17 : 19), 3.7 %%>;
    paymentAmountBetween = <%% 20, 20, 20, 20, 3 %%>;

    paymentButtonSize = <%% 17, 17, 16, 16, 3.2 %%>;
    paymentButtonWeight = <%% 600, 600, 600, 600, 600 %%>;
    paymentButtonTop = <%% 12, 12, 12, 12, 3 %%>;
    paymentButtonPaddingTop = <%% (isMac() ? 8 : 10), (isMac() ? 8 : 10), (isMac() ? 8 : 10), (isMac() ? 8 : 10), 2 %%>;
    paymentButtonPaddingBottom = <%% (isMac() ? 10 : 9), (isMac() ? 10 : 9), (isMac() ? 10 : 9), (isMac() ? 10 : 9), 2.5 %%>;
    paymentButtonPaddingLeft = <%% 18, 18, 18, 18, 3.5 %%>;

    addressPromptWidth = <%% 600, 600, 600, 600, 80 %%>;
    addressPromptHeight = <%% 450, 450, 450, 450, 90 %%>;

    agreeEvent = function (e) {
      const targets = document.querySelectorAll('.' + agreeTargetClassName);
      for (let dom of targets) {
        if (dom.getAttribute("circle") === "true") {
          if (dom.getAttribute("toggle") === "on") {
            dom.style.background = colorChip.gray4;
            dom.setAttribute("toggle", "off");
          } else {
            dom.style.background = colorChip.green;
            dom.setAttribute("toggle", "on");
          }
        } else {
          if (dom.getAttribute("toggle") === "on") {
            dom.style.color = colorChip.deactive;
            dom.setAttribute("toggle", "off");
          } else {
            dom.style.color = colorChip.green;
            dom.setAttribute("toggle", "on");
          }
        }
      }
    }

    cancelBack = createNode({
      mother: totalContents,
      class: [ popupClassName ],
      event: {
        click: function (e) {
          const removeTargets = document.querySelectorAll('.' + popupClassName);
          for (let dom of removeTargets) {
            dom.remove();
          }
        }
      },
      style: {
        position: "fixed",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        background: colorChip.black,
        opacity: String(0.3),
        zIndex: String(zIndex),
      }
    });

    if (window.innerHeight - naviHeight - (whiteMargin * 2) > whiteMaxHeight) {
      whiteMargin = (window.innerHeight - whiteMaxHeight - naviHeight) / 2;
    }

    whiteBase = createNode({
      mother: totalContents,
      class: [ popupClassName ],
      style: {
        position: "fixed",
        width: String(whiteWidth) + ea,
        height: "calc(calc(100% - " + String(naviHeight) + "px" + ") - " + String((whiteMargin * 2) + innerMargin) + ea + ")",
        top: "calc(" + String(naviHeight) + "px" + " + " + String(whiteMargin) + ea + ")",
        left: "calc(50% - " + String(whiteWidth / 2) + ea + ")",
        borderRadius: String(5) + "px",
        background: colorChip.white,
        boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
        animation: "fadeuporiginal 0.3s ease forwards",
        paddingTop: String(innerMargin) + ea,
        zIndex: String(zIndex),
      }
    });

    contentsTong = createNode({
      mother: whiteBase,
      style: {
        display: "block",
        position: "relative",
        width: withOut(innerMargin * 2, ea),
        height: withOut(innerMargin, ea),
        marginLeft: String(innerMargin) + ea,
        marginRight: String(innerMargin) + ea,
      }
    });


    // title

    titleArea = createNode({
      mother: contentsTong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: String(titleHeight) + ea,
        borderBottom: "1px solid " + colorChip.black,
      },
      children: [
        {
          text: "Mini 서비스 신청",
          style: {
            textAlign: "left",
            position: "absolute",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorChip.black,
            lineHeight: String(titleLineHeight),
            top: String(titleTop) + ea,
            left: String(0),
          }
        }
      ]
    });


    // form

    formArea = createNode({
      mother: contentsTong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: withOut(titleHeight + paymentHeight + formPaddingTop, ea),
        paddingTop: String(formPaddingTop) + ea,
        overflow: "scroll",
      }
    });

    formBox = createNode({
      mother: formArea,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
      }
    });

    // 1
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "성함",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType0) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "input",
          class: [ inputClassName ],
          attribute: {
            type: "text",
            placeholder: "성함",
            property: "name",
            value: "",
          },
          event: {
            keyup: function (e) {
              this.value = this.value.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/gi, '');
            },
            blur: function (e) {
              this.value = this.value.replace(/[^a-zA-Z가-힣]/gi, '');
            }
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType0) + ea,
            height: String(grayHeight) + ea,
            outline: String(0),
            border: String(0),
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            color: colorChip.black,
            textAlign: "center",
            background: "transparent",
          }
        },
      ]
    });
    // 2
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "연락처",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType0) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "input",
          class: [ inputClassName ],
          attribute: {
            type: "text",
            placeholder: "010-0000-0000",
            property: "phone",
            value: "",
          },
          event: {
            keyup: function (e) {
              this.value = autoHypenPhone(this.value);
            },
            blur: function (e) {
              this.value = this.value.replace(/[^0-9\-]/gi, '');
            }
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType0) + ea,
            height: String(grayHeight) + ea,
            outline: String(0),
            border: String(0),
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            color: colorChip.black,
            textAlign: "center",
            background: "transparent",
          }
        },
      ]
    });
    // 3
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "이메일",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType1) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "input",
          class: [ inputClassName ],
          attribute: {
            type: "text",
            placeholder: "example@home-liaison.com",
            property: "email",
            value: "",
          },
          event: {
            keyup: function (e) {
              this.value = this.value.replace(/[\=\+\?\#\&\(\)]/gi, '');
            },
            blur: function (e) {
              if (!/\@/.test(this.value) || !/\./.test(this.value)) {
                window.alert("올바른 형태의 이메일로 적어주세요!");
                this.value = this.value.replace(/[\=\+\?\#\&\(\)]/gi, '');
              }
            }
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType1) + ea,
            height: String(grayHeight) + ea,
            outline: String(0),
            border: String(0),
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            color: colorChip.black,
            textAlign: "left",
            background: "transparent",
            textIndent: String(inputIndent) + ea,
          }
        },
      ]
    });
    // 4
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "주소",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          event: {
            click: function (e) {
              const addressSearchClassName = "addressSearchClassName";
              const zIndex = 102;
              let cancelBack, searchWhite;

              GeneralJs.stacks["addressEvent"] = async function (e) {
                try {
                  if (typeof e.data === "string") {
                    findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "address0").value = e.data.trim();
                    findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "address1").value = '';
                    findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "address1").focus();
                  }
                  const targets = document.querySelectorAll('.' + addressSearchClassName);
                  for (let dom of targets) {
                    dom.remove();
                  }
                  window.removeEventListener("message", GeneralJs.stacks["addressEvent"]);
                  GeneralJs.stacks["addressEvent"] = null;
                } catch (e) {
                  await GeneralJs.ajaxJson({ message: "ClientConsultingJs.addressEvent : " + e.message }, BACKHOST + "/errorLog");
                }
              }
              window.addEventListener("message", GeneralJs.stacks["addressEvent"]);

              cancelBack = createNode({
                mother: totalContents,
                class: [ addressSearchClassName ],
                event: {
                  click: (e) => {
                    const targets = document.querySelectorAll('.' + addressSearchClassName);
                    for (let dom of targets) {
                      dom.remove();
                    }
                    if (GeneralJs.stacks["addressEvent"] !== null && GeneralJs.stacks["addressEvent"] !== undefined) {
                      window.removeEventListener("message", GeneralJs.stacks["addressEvent"]);
                      GeneralJs.stacks["addressEvent"] = null;
                    }
                  },
                },
                style: {
                  position: "fixed",
                  top: String(0),
                  left: String(0),
                  width: String(100) + '%',
                  height: String(100) + '%',
                  background: "transparent",
                  zIndex: String(zIndex),
                }
              });

              searchWhite = createNode({
                mother: totalContents,
                class: [ addressSearchClassName ],
                style: {
                  position: "fixed",
                  left: "calc(50% - " + String(addressPromptWidth / 2) + ea + ")",
                  top: "calc(50% - " + String(addressPromptHeight / 2) + ea + ")",
                  width: String(addressPromptWidth) + ea,
                  height: String(addressPromptHeight) + ea,
                  zIndex: String(zIndex),
                  background: colorChip.white,
                  borderRadius: String(3) + "px",
                  boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                  animation: "fadeuphard 0.3s ease forwards",
                  overflow: "hidden",
                },
                children: [
                  {
                    mode: "iframe",
                    attribute: [
                      { src: BACKHOST + "/tools/addressLite" },
                      { width: String(100) + '%' },
                      { height: String(100) + '%' },
                    ],
                    style: {
                      position: "absolute",
                      top: String(0) + ea,
                      left: String(0) + ea,
                      border: String(0),
                    }
                  }
                ]
              });

            }
          },
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(addressWidth) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gradientGreen,
            borderRadius: String(3) + "px",
            cursor: "pointer",
          },
          children: [
            {
              text: "검색",
              style: {
                width: String(100) + '%',
                textAlign: "center",
                fontSize: String(addressSize) + ea,
                fontWeight: String(addressWeight),
                color: colorChip.white,
                position: "relative",
                top: String(addressTop) + ea,
              }
            }
          ]
        },
        {
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType3) + ea,
            width: String(widthGrayType3) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "input",
          class: [ inputClassName ],
          event: {
            keyup: function (e) {
              this.value = this.value.replace(/[\=\+\?\#\&]/gi, '');
            },
          },
          attribute: {
            type: "text",
            placeholder: "인테리어 받을 곳의 주소",
            property: "address0",
            value: "",
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType3) + ea,
            width: String(widthGrayType3) + ea,
            height: String(grayHeight) + ea,
            outline: String(0),
            border: String(0),
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            color: colorChip.black,
            textAlign: "left",
            background: "transparent",
            textIndent: String(inputIndent) + ea,
          }
        },
      ]
    });
    // 5
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType1) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "input",
          class: [ inputClassName ],
          event: {
            keyup: function (e) {
              this.value = this.value.replace(/[\=\+\?\#\&]/gi, '');
            },
          },
          attribute: {
            type: "text",
            placeholder: "인테리어 받을 곳의 상세 주소",
            property: "address1",
            value: "",
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType1) + ea,
            height: String(grayHeight) + ea,
            outline: String(0),
            border: String(0),
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            color: colorChip.black,
            textAlign: "left",
            background: "transparent",
            textIndent: String(inputIndent) + ea,
          }
        },
      ]
    });

    // 6 : margin
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });

    // 7
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "공간 개수",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType2) + ea,
            width: String(widthGrayType0) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "input",
          class: [ inputClassName ],
          attribute: {
            type: "text",
            placeholder: "00개",
            property: "targets",
            value: "",
          },
          event: {
            keyup: function (e) {
              this.value = this.value.replace(/[^0-9]/gi, '');
            },
            blur: function (e) {
              const priceTarget = document.querySelector('.' + priceTargetClassName);
              const final = this.value.trim().replace(/[^0-9]/gi, '');
              let finalNumber;
              let finalPrice;

              if (final === '' || Number.isNaN(Number(final))) {
                finalNumber = 1;
              } else {
                if (Number(final) === 0) {
                  finalNumber = 1;
                } else {
                  finalNumber = Number(final);
                }
              }
              this.value = String(finalNumber) + "개";

              finalPrice = Math.floor(initialPrice * finalNumber);
              priceTarget.setAttribute("price", String(finalPrice));
              priceTarget.textContent = "";
              priceTarget.insertAdjacentHTML("beforeend", autoComma(Math.floor(finalPrice)) + "원");
            }
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType2) + ea,
            width: String(widthGrayType0) + ea,
            height: String(grayHeight) + ea,
            outline: String(0),
            border: String(0),
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            color: colorChip.black,
            textAlign: "center",
            background: "transparent",
          }
        }
      ]
    });
    // 8
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(grayTextAreaTop + grayBigHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "요청 사항",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          style: {
            position: "absolute",
            top: String(grayTextAreaTop) + ea,
            left: String(leftGrayType2) + ea,
            width: String(widthGrayType2) + ea,
            height: String(grayBigHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "textarea",
          class: [ inputClassName ],
          attribute: {
            placeholder: desktop ? "선호하는 스타일 + 공간의 특이 사항을 적어주세요!" : "선호하는 스타일 + 공간의 특이 사항을\n적어주세요!",
            property: "etc",
          },
          event: {
            keyup: function (e) {
              this.value = this.value.replace(/[\=\+\?\#\&]/gi, '');
            },
            blur: function (e) {
              this.value = this.value.replace(/[\=\+\?\#\&]/gi, '');
            }
          },
          style: {
            position: "absolute",
            top: String(grayTextAreaTop + textareaTop) + ea,
            left: String(leftGrayType2 + textareaLeft) + ea,
            width: String(widthGrayType2 - (textareaLeft * 2)) + ea,
            height: String(grayBigHeight - (textareaTop * 1)) + ea,
            fontSize: String(grayLineBlockFontSize) + ea,
            fontWeight: String(grayLineBlockFontWeight),
            border: String(0),
            background: "transparent",
            outline: String(0),
            overflow: "scroll",
            lineHeight: String(1.6),
            color: colorChip.black,
          }
        }
      ]
    });

    // 9 : margin
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });

    // 10
    policyTong = createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
      },
      children: [
        {
          style: {
            position: "relative",
            top: String(grayTextAreaTop) + ea,
            left: String(0) + ea,
            width: String(100) + '%',
            paddingTop: String(policyInnerPadding) + ea,
            height: String(grayBigHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          children: [
            {
              style: {
                display: "block",
                position: "relative",
                width: withOut(policyInnerPadding * 2, ea),
                marginLeft: String(policyInnerPadding) + ea,
                height: withOut(policyInnerPadding, ea),
                overflow: "scroll",
              },
              children: [
                {
                  style: {
                    display: "block",
                    position: "relative",
                    fontSize: String(policyTextSize) + ea,
                    color: colorChip.black,
                  }
                }
              ]
            }
          ]
        },
      ]
    }).firstChild.firstChild.firstChild;

    ajaxJson({}, BACKHOST + "/designerProposal_policy").then(function (res) {
      const { policy, button } = res;
      let bTags;

      policyTong.insertAdjacentHTML("beforeend", policy);
      bTags = policyTong.querySelectorAll("b");
      for (let b of bTags) {
        b.style.color = colorChip.black;
        b.style.fontWeight = String(600);
      }

    }).catch(function (err) {
      throw new Error(err);
    });

    // 11
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        textAlign: "right",
      },
      children: [
        {
          class: [ agreeTargetClassName ],
          event: { click: agreeEvent },
          attribute: {
            toggle: "on",
            circle: "true",
          },
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(agreeCircleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(agreeCircleTop) + ea,
            verticalAlign: "top",
            cursor: "pointer",
          }
        },
        {
          text: "상기 개인정보 취급 방침에 동의합니다.",
          class: [ agreeTargetClassName ],
          event: { click: agreeEvent },
          attribute: {
            toggle: "on",
          },
          style: {
            display: "inline-block",
            fontSize: String(agreeSize) + ea,
            fontWeight: String(agreeWeight),
            color: colorChip.green,
            cursor: "pointer",
          }
        }
      ]
    });

    // 12 : margin
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });

    // payment
    paymentArea = createNode({
      mother: contentsTong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: String(paymentHeight) + ea,
        borderTop: "1px dashed " + colorChip.gray4,
        textAlign: "right",
      }
    });

    createNode({
      mother: paymentArea,
      class: [ priceTargetClassName ],
      attribute: {
        price: String(Math.floor(initialPrice)),
      },
      text: autoComma(Math.floor(initialPrice)) + "원",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(paymentAmountSize) + ea,
        fontWeight: String(paymentAmountWeight),
        color: colorChip.black,
        top: String(paymentAmountTop) + ea,
        marginRight: String(paymentAmountBetween) + ea,
      },
    });

    createNode({
      mother: paymentArea,
      class: [ priceButtonClassName ],
      text: "결제하기",
      event: {
        click: async function (e) {
          try {
            const agreeTarget = document.querySelector('.' + agreeTargetClassName);
            const agreeBoo = (agreeTarget.getAttribute("toggle") === "on");
            if (!agreeBoo) {
              window.alert("개인정보 처리 방침에 동의해주세요!");
              return;
            } else {

              const inputTargets = [ ...document.querySelectorAll('.' + inputClassName) ];
              const inputMatrix = inputTargets.map((dom) => {
                return [ dom.getAttribute("property"), dom.value.trim().replace(/[\&\=\+\#]/gi, ''), dom ];
              });
              let boo;
              let name, phone;
              let map;
              let pluginScript, plugin;
              let key;

              boo = true;

              for (let [ property, value, dom ] of inputMatrix) {
                dom.previousElementSibling.style.border = "";
                if (property === "name") {
                  if (value.replace(/[^a-zA-Z가-힣]/gi, '') === '') {
                    window.alert("성함을 입력해주세요!");
                    boo = false;
                    dom.previousElementSibling.style.border = "1px solid " + colorChip.green;
                    if (typeof dom.focus === "function") {
                      dom.focus();
                    }
                  } else {
                    name = value.replace(/[^a-zA-Z가-힣]/gi, '');
                  }
                } else if (property === "phone") {
                  if (value.replace(/[^0-9\-]/gi, '') === '') {
                    window.alert("연락처를 입력해주세요!");
                    boo = false;
                    dom.previousElementSibling.style.border = "1px solid " + colorChip.green;
                    if (typeof dom.focus === "function") {
                      dom.focus();
                    }
                  } else {
                    phone = value.replace(/[^0-9\-]/gi, '');
                  }
                } else if (property === "email") {
                  if (value.trim() === '') {
                    window.alert("이메일 주소를 적어주세요!");
                    boo = false;
                    dom.previousElementSibling.style.border = "1px solid " + colorChip.green;
                    if (typeof dom.focus === "function") {
                      dom.focus();
                    }
                  }
                } else if (property === "address0") {
                  if (value.trim() === '') {
                    window.alert("주소를 검색하여 입력해주세요!");
                    boo = false;
                    dom.previousElementSibling.style.border = "1px solid " + colorChip.green;
                    if (typeof dom.focus === "function") {
                      dom.focus();
                    }
                  }
                } else if (property === "address1") {
                  if (value.trim() === '') {
                    window.alert("상세 주소를 적어주세요!");
                    boo = false;
                    dom.previousElementSibling.style.border = "1px solid " + colorChip.green;
                    if (typeof dom.focus === "function") {
                      dom.focus();
                    }
                  }
                } else if (property === "targets") {
                  if (value.replace(/[^0-9]/gi, '') === '' || Number.isNaN(Number(value.replace(/[^0-9]/gi, '')))) {
                    window.alert("공간 개수를 입력해주세요!");
                    boo = false;
                    dom.previousElementSibling.style.border = "1px solid " + colorChip.green;
                    if (typeof dom.focus === "function") {
                      dom.focus();
                    }
                  }
                }
                if (!boo) {
                  break;
                }
              }
              if (boo) {
                map = {
                  name,
                  phone,
                  email: inputMatrix.find((arr) => { return arr[0] === "email" })[1].trim(),
                  address: inputMatrix.find((arr) => { return arr[0] === "address0" })[1].trim() + " " + inputMatrix.find((arr) => { return arr[0] === "address1" })[1].trim(),
                  targets: Number(inputMatrix.find((arr) => { return arr[0] === "targets" })[1].replace(/[^0-9]/gi, '')),
                  etc: inputMatrix.find((arr) => { return arr[0] === "etc" })[1].trim(),
                };

                instance.mother.certificationBox(name, phone, async function (back, box) {
                  try {

                    ({ pluginScript, oidConst } = await ajaxJson({ mode: "script", oidKey: "mini" }, "/generalImpPayment"));
                    map.oid = oidConst + phone.replace(/[^0-9]/gi, '') + "_" + String((new Date()).valueOf());
                    plugin = new Function(pluginScript);
                    plugin();
                    window.IMP.init("imp71921105");
                    if (desktop) {
                      window.IMP.request_pay({
                          pg: "inicis",
                          pay_method: "card",
                          merchant_uid: map.oid,
                          name: "HomeLiaison Mini",
                          amount: Math.floor(map.targets * initialPrice),
                          buyer_email: map.email,
                          buyer_name: map.name,
                          buyer_tel: map.phone,
                      }, async (rsp) => {
                        try {
                          if (typeof rsp.status === "string" && /paid/gi.test(rsp.status)) {
                            map.rsp = JSON.parse(JSON.stringify(rsp));
                            const { useid } = await ajaxJson({ map }, "/userSubmit");

                            homeliaisonAnalytics({
                              page: instance.pageName,
                              standard: instance.firstPageViewTime,
                              action: "miniSubmit",
                              data: { useid },
                            }).then(() => {
                              document.body.removeChild(box);
                              document.body.removeChild(back);
                              selfHref(BACKHOST + "/middle/miniGuide?useid=" + useid);
                            }).catch((err) => {
                              document.body.removeChild(box);
                              document.body.removeChild(back);
                              selfHref(BACKHOST + "/middle/miniGuide?useid=" + useid);
                            });

                          } else {
                            window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
                            document.body.removeChild(box);
                            document.body.removeChild(back);
                          }
                        } catch (e) {
                          window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
                          document.body.removeChild(box);
                          document.body.removeChild(back);
                        }
                      });
                    } else {
                      ({ key } = await ajaxJson({ mode: "store", oid: map.oid, data: map }, "/generalImpPayment"));

                      window.IMP.request_pay({
                          pg: "inicis",
                          pay_method: "card",
                          merchant_uid: map.oid,
                          name: "HomeLiaison Mini",
                          amount: Math.floor(map.targets * initialPrice),
                          buyer_email: map.email,
                          buyer_name: map.name,
                          buyer_tel: map.phone,
                          m_redirect_url: window.location.protocol + "//" + window.location.host + window.location.pathname + "?mobilecard=" + key,
                      }, (rsp) => {});
                    }

                  } catch (e) {
                    window.alert("인증에 실패하였습니다! 다시 시도해주세요!");
                    document.body.removeChild(box);
                    document.body.removeChild(back);
                  }
                });

              }
            }
          } catch (e) {
            console.log(e);
            window.alert("오류가 일어났습니다! 다시 시도해주세요!");
            cancelBack.click();
          }
        }
      },
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(paymentButtonSize) + ea,
        fontWeight: String(paymentButtonWeight),
        color: colorChip.white,
        top: String(paymentButtonTop) + ea,
        background: colorChip.gradientGreen,
        paddingTop: String(paymentButtonPaddingTop) + ea,
        paddingBottom: String(paymentButtonPaddingBottom) + ea,
        paddingLeft: String(paymentButtonPaddingLeft) + ea,
        paddingRight: String(paymentButtonPaddingLeft) + ea,
        borderRadius: String(5) + "px",
        cursor: "pointer",
      }
    });

  }
}

MiniAboutJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, requestPromise, setDebounce, homeliaisonAnalytics, selfHref } = GeneralJs;
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
        backgroundType: 0,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertWhyBox();
          instance.insertFaqBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "MiniAboutJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    if (typeof getObj.mobilecard === "string") {
      const grayLoadingIcon = instance.mother.grayLoading();
      const response = await ajaxJson({ mode: "open", key: getObj.mobilecard }, "/generalImpPayment", { equal: true });
      if (response.data !== undefined && response.rsp !== undefined) {
        const { data: map, rsp } = response;

        map.rsp = JSON.parse(JSON.stringify(rsp));
        const { useid } = await ajaxJson({ map }, "/userSubmit");

        homeliaisonAnalytics({
          page: instance.pageName,
          standard: instance.firstPageViewTime,
          action: "miniSubmit",
          data: { useid },
        }).then(() => {
          selfHref(BACKHOST + "/middle/miniGuide?useid=" + useid);
        }).catch((err) => {
          selfHref(BACKHOST + "/middle/miniGuide?useid=" + useid);
        });

      }

      grayLoadingIcon.remove();
    }


  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "MiniAboutJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
