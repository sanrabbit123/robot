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
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let buttonBoxWidth;
  let buttonBoxHeight;
  let buttonBoxTop;
  let buttonSize, buttonWeight, buttonLineHeight, buttonTextTop;

  bottomMargin = <%% 200, 200, 200, 200, 200 %%>;

  buttonBoxWidth = <%% 172, 172, 172, 172, 172 %%>;
  buttonBoxHeight = <%% 58, 58, 58, 58, 58 %%>;
  buttonBoxTop = <%% -108, -108, -108, -108, -108 %%>;

  buttonTextTop = <%% -2, -2, -2, -2, -2 %%>;
  buttonSize = <%% 21, 21, 21, 21, 21 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;
  buttonLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  whiteBlock = createNode({
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

  this.insertTitleBox(whiteBlock);
  this.insertStrongBox(whiteBlock);
  this.insertSlideBox(whiteBlock);
  this.insertAboutBox(whiteBlock);

  createNode({
    mother: whiteBlock,
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
  })

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

  margin = <%% 68, 68, 68, 68, 68 %%>;
  baseHeight = <%% 408, 408, 408, 408, 408 %%>;
  descriptionWidth = <%% 328, 328, 328, 328, 328 %%>;

  descriptionBoxPaddingTop = <%% 78, 78, 78, 78, 78 %%>;

  titleSize = <%% 42, 42, 42, 42, 42 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;

  subTitleSize = <%% 15, 15, 15, 15, 15 %%>;
  subTitleWeight = <%% 400, 400, 400, 400, 400 %%>;

  subTitleMarginTop = <%% 3, 3, 3, 3, 3 %%>;
  subTitlePaddingRight = <%% 3, 3, 3, 3, 3 %%>;

  subTitleLineWidth = <%% 54, 54, 54, 54, 54 %%>;
  subTitleLineRight = <%% 136, 136, 136, 136, 136 %%>;
  subTitleLineTop = <%% 10, 10, 10, 10, 10 %%>;

  descriptionSize = <%% 15, 15, 15, 15, 15 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;
  descriptionMarginTop = <%% 40, 40, 40, 40, 40 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

  belowSize = <%% 11, 11, 11, 11, 11 %%>;
  belowWeight = <%% 400, 400, 400, 400, 400 %%>;
  belowMarginTop = <%% 94, 94, 94, 94, 94 %%>;
  belowPaddingRight = <%% 3, 3, 3, 3, 3 %%>;

  belowLineWidth = <%% 142, 142, 142, 142, 142 %%>;
  belowLineTop = <%% 8, 8, 8, 8, 8 %%>;
  belowLineRight = <%% 186, 186, 186, 186, 186 %%>;

  photo0Width = <%% 420, 420, 420, 420, 420 %%>;
  photo1Width = <%% 300, 300, 300, 300, 300 %%>;

  whiteSize = <%% 35, 35, 35, 35, 35 %%>;
  whiteWeight = <%% 700, 700, 700, 700, 700 %%>;
  whiteLineHeight = <%% 1.35, 1.35, 1.35, 1.35, 1.35 %%>;
  whiteBottom = <%% 50, 50, 50, 50, 50 %%>;
  whiteRight = <%% 50, 50, 50, 50, 50 %%>;

  contents = {
    title: "무드 체인지",
    subTitle: "HomeLiaison Mini",
    description: [
      "<b%패브릭, 액자, 소품%b>만 교체해도",
      "다른 집에 온 것 같은 효과!",
      "가격 부담은 줄이고, <b%스타일링",
      "효과는 높이는 경험%b>을 누려보세요.",
    ],
    below: "mood - change : HomeLiaison mini",
    photo: [
      "init0.jpg",
      "init1.jpg",
      "init2.jpg",
    ],
    black: [
      "지금 사용하고 있는 가구는 계속 쓰고 싶고",
      "가구 교체 비용이 아깝다면?",
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
      width: withOut(margin, ea),
    }
  });

  descriptionBox = createNode({
    mother: base,
    style: {
      display: "inline-block",
      position: "relative",
      height: String(baseHeight - descriptionBoxPaddingTop) + ea,
      width: String(descriptionWidth) + ea,
      marginRight: String(margin) + ea,
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
      textAlign: "right",
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
      textAlign: "right",
      marginTop: String(subTitleMarginTop) + ea,
      paddingRight: String(subTitlePaddingRight) + ea,
    },
    children: [
      {
        style: {
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
      textAlign: "right",
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
      display: "block",
      position: "relative",
      fontSize: String(belowSize) + ea,
      fontWeight: String(belowWeight),
      fontFamily: "graphik",
      color: colorChip.black,
      textAlign: "right",
      marginTop: String(belowMarginTop) + ea,
      paddingRight: String(belowPaddingRight) + ea,
    },
    children: [
      {
        style: {
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
      display: "inline-block",
      position: "relative",
      height: String(baseHeight) + ea,
      width: withOut(descriptionWidth + margin, ea),
      overflow: "hidden",
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
      backgroundSize: "100% auto",
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
      backgroundSize: "auto 100%",
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
      textAlign: "right",
      lineHeight: String(whiteLineHeight),
      color: colorChip.white,
      bottom: String(whiteBottom) + ea,
      right: String(whiteRight) + ea,
      opacity: String(0),
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

  margin = <%% 68, 68, 68, 68, 68 %%>;
  betweenWhite = <%% 10, 10, 10, 10, 10 %%>;

  innerPaddingTop = <%% 32, 32, 32, 32, 32 %%>;
  innerPaddingBottom = <%% 34, 34, 34, 34, 34 %%>;
  innerPaddingLeft = <%% 40, 40, 40, 40, 40 %%>;

  titleSize = <%% 17, 17, 17, 17, 17 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  descriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  descriptionWeight = <%% 300, 300, 300, 300, 300 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  titleBetween = <%% 12, 12, 12, 12, 12 %%>;

  iconWidth = <%% 30, 30, 30, 30, 30 %%>;
  iconBottom = <%% 38, 38, 38, 38, 38 %%>;

  contents = [
    {
      title: [
        "쉽고 빠르게 소통하며",
        "디자인 시안을 받을 수 있어요!",
      ],
      description: [
        "디자이너의 디자인 작업이 시작된 이후부터",
        "3일 내에 디자인 시안부터 제품",
        "구매리스트까지 확인할 수 있어요.",
      ],
      image: "strong0.png",
    },
    {
      title: [
        "홈리에종의 특별 교육을 받은",
        "전문 디자이너 혜택을 누려보세요!",
      ],
      description: [
        "패브릭, 소품, 액자 스타일링 제안에 특화된",
        "전문 디자이너와 함께! 혼자서 발품팔고",
        "고민하지 말고, 디자이너와 함께하세요. ",
      ],
      image: "strong1.png",
    },
    {
      title: [
        "홈리에종만의 관리 시스템으로",
        "편리하게 이용할 수 있어요!",
      ],
      description: [
        "시스템 안에서 빠른 커뮤니케이션으로",
        "서비스의 전 과정을 한번에 확인할 수 있어",
        "편리하게 서비스 혜택을 누릴 수 있어요!",
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
      width: withOut(margin, ea),
      background: colorChip.gray2,
    }
  });

  for (let i = 0; i < contents.length; i++) {
    createNode({
      mother: base,
      style: {
        display: "inline-block",
        position: "relative",
        paddingTop: String(innerPaddingTop) + ea,
        paddingBottom: String(innerPaddingBottom) + ea,
        width: "calc(calc(calc(100% - " + String(margin) + ea + ") - " + String(betweenWhite * (contents.length - 1)) + ea + ") / " + String(contents.length) + ")",
        marginRight: String(betweenWhite) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
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
            right: String(innerPaddingLeft) + ea,
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

  margin = <%% 68, 68, 68, 68, 68 %%>;

  base = createNode({
    mother,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(margin) + ea,
      paddingBottom: String(40) + ea,
      width: withOut(0, ea),
    }
  });

  slideBase = createNode({
    mother: base,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      height: String(340) + ea,
      overflow: "hidden",
    }
  });

  slidePan = createNode({
    mother: slideBase,
    style: {
      position: "absolute",
      left: String(-176) + ea,
      width: String(8000) + ea,
      height: String(100) + '%',
      top: String(0),
    }
  })

  for (let i = 0; i < 8; i++) {
    createNode({
      mother: slidePan,
      style: {
        display: "inline-block",
        position: "relative",
        marginRight: String(12) + ea,
        width: String(240) + ea,
        height: String(340) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.gray2,
      }
    })
  }



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

  margin = <%% 68, 68, 68, 68, 68 %%>;

  grayInnerPadding = <%% 40, 40, 40, 40, 40 %%>;
  grayTop = <%% 14, 14, 14, 14, 14 %%>;

  aboutGrayLeftBoxMargin = <%% 8, 8, 8, 8, 8 %%>;

  aboutGrayLeftWidth = <%% 580, 580, 580, 580, 580 %%>;
  aboutContentsHeight = <%% 250, 250, 250, 250, 250 %%>;

  aboutBetween = <%% 36, 36, 36, 36, 36 %%>;

  aboutGrayRightTitlePaddingTop = <%% 63, 63, 63, 63, 63 %%>;

  aboutTitleSize = <%% 25, 25, 25, 25, 25 %%>;
  aboutTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  aboutTitleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  aboutSubTitleSize = <%% 17, 17, 17, 17, 17 %%>;
  aboutSubTitleWeight = <%% 400, 400, 400, 400, 400 %%>;
  aboutSubTitleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  aboutDescriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  aboutDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  aboutDescriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  aboutDescriptionMarginTop = <%% 60, 60, 60, 60, 60 %%>;

  areaNameSize = <%% 16, 16, 16, 16, 16 %%>;
  areaNameWeight = <%% 700, 700, 700, 700, 700 %%>;
  areaNameLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  processBlockWidth = <%% 120, 120, 120, 120, 120 %%>;

  titleSize = <%% 32, 32, 32, 32, 32 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  subTitleSize = <%% 16, 16, 16, 16, 16 %%>;
  subTitleWeight = <%% 400, 400, 400, 400, 400 %%>;
  subTitleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  descriptionMarginTop = <%% 30, 30, 30, 30, 30 %%>;
  descriptionSize = <%% 15, 15, 15, 15, 15 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  descriptionPadding = <%% 36, 36, 36, 36, 36 %%>;

  descriptionLineTop = <%% 22, 22, 22, 22, 22 %%>;

  aboutAreaTop = <%% 85, 85, 85, 85, 85 %%>;
  processAreaTop = <%% 56, 56, 56, 56, 56 %%>;
  billAreaTop = <%% 110, 110, 110, 110, 110 %%>;
  billAreaBottom = <%% 20, 20, 20, 20, 20 %%>;

  processBlockHeight = <%% 80, 80, 80, 80, 80 %%>;

  processTextTop = <%% -1, -1, -1, -1, -1 %%>;
  processSize = <%% 15, 15, 15, 15, 15 %%>;
  processWeight = <%% 600, 600, 600, 600, 600 %%>;
  processLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  processBlankHeight = <%% 170, 170, 170, 170, 170 %%>;
  processArrowWidth = <%% 43, 43, 43, 43, 43 %%>;
  processArrowHeight = <%% 10, 10, 10, 10, 10 %%>;
  processArrowTop = <%% 34, 34, 34, 34, 34 %%>;

  processNoticeBoxRight = <%% 38, 38, 38, 38, 38 %%>;
  processNoticeBoxBottom = <%% 36, 36, 36, 36, 36 %%>;

  processNoticeSize = <%% 12, 12, 12, 12, 12 %%>;
  processNoticeWeight = <%% 500, 500, 500, 500, 500 %%>;
  processNoticeMarginBottom = <%% 6, 6, 6, 6, 6 %%>;

  billSize = <%% 37, 37, 37, 37, 37 %%>;
  billWeight = <%% 600, 600, 600, 600, 600 %%>;
  billLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  billEaSize = <%% 16, 16, 16, 16, 16 %%>;
  billEaWeight = <%% 400, 400, 400, 400, 400 %%>;
  billEaBottom = <%% 6, 6, 6, 6, 6 %%>;
  billEaLeft = <%% -57, -57, -57, -57, -57 %%>;

  billLineLeft = <%% -56, -56, -56, -56, -56 %%>;
  billLineWidth = <%% 230, 230, 230, 230, 230 %%>;

  contents = {
    title: {
      main: "홈리에종 Mini",
      sub: "mood-change",
    },
    description: [
      "<b%홈리에종 미니는 패브릭, 소품, 액자만으로 공간의 무드를 변화시켜주는 스타일링 서비스%b>예요.",
      "인테리어 시공은 부담스럽고, 가구는 그대로 쓰고싶을때, HomeLiaison mini가 도와줄게요!",
    ],
    about: {
      name: "상품 안내",
      title: {
        main: "패브릭 + 액자 + 소품",
        sub: "curtain, pillow, bedding, frame, home accessory, ...",
      },
      description: "홈리에종 미니 서비스의 신청 방식은 공간별 신청하는 방식으로, <b%공간별로 베딩(침구), 커튼, 러그, 액자, 소품 품목%b>을 제안 드립니다.  단, 공간의 목적과 사용 용도, 가지고 계신 가구의 상황에 따라 제안의 품목이 상이할 수 있습니다.",
    },
    process: {
      name: "프로세스 안내",
      matrix: [
        [ [ "결제 완료", "및 확인" ] ],
        [ [ "고객", "직접 실측" ] ],
        [ [ "디자이너", "연결" ], [ "상담 일정", "확인" ] ],
        [ [ "디자이너", "상담 시작" ] ],
        [ [ "디자인", "작업" ], [ "홈리에종의", "제안서 컨펌" ] ],
        [ [ "디자인", "제안서" ] ],
        [ [ "제품 구매", "완료" ] ],
      ],
      green: [ 1, 4 ],
      notice: [
        "고객 실측이 이루어져야 디자이너 상담이 가능합니다.",
        "홈리에종 컨펌은 영업일 기준으로 이루어집니다.",
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
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          lineHeight: String(descriptionLineHeight),
          paddingLeft: String(descriptionPadding) + ea,
          paddingRight: String(descriptionPadding) + ea,
          background: colorChip.white,
          zIndex: String(1),
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
      display: "inline-block",
      width: String(aboutGrayLeftWidth) + ea,
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
          borderRadius: String(3) + "px",
        }
      },
    ]
  });

  aboutGrayRight = createNode({
    mother: aboutGray,
    style: {
      display: "inline-block",
      width: withOut(aboutGrayLeftWidth + aboutBetween, ea),
      paddingTop: String(aboutGrayRightTitlePaddingTop) + ea,
      height: String(aboutContentsHeight - aboutGrayRightTitlePaddingTop) + ea,
      verticalAlign: "top",
    }
  });

  createNode({
    mother: aboutGrayRight,
    text: contents.about.title.main,
    style: {
      display: "block",
      fontSize: String(aboutTitleSize) + ea,
      fontWeight: String(aboutTitleWeight),
      color: colorChip.black,
      textAlign: "left",
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
      textAlign: "left",
      lineHeight: String(aboutSubTitleLineHeight),
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
      textAlign: "left",
      marginTop: String(aboutDescriptionMarginTop) + ea,
      lineHeight: String(aboutDescriptionLineHeight),
    },
    bold: {
      fontWeight: String(700),
      color: colorChip.black,
    }
  });

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
        display: "inline-block",
        width: String(processBlockWidth) + ea,
        verticalAlign: "top",
      }
    });

    for (let j = 0; j < contents.process.matrix[i].length; j++) {
      createNode({
        mother: processBlock,
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: String(processBlockHeight) + ea,
          background: contents.process.green.includes(i) ? colorChip.gradientGreen : colorChip.white,
          borderRadius: String(3) + "px",
          marginBottom: String(j !== contents.process.matrix[i].length - 1 ? 10 : 0) + ea,
        },
        children: [
          {
            text: contents.process.matrix[i][j].join("\n"),
            style: {
              display: "block",
              position: "relative",
              textAlign: "center",
              top: String(processTextTop) + ea,
              fontSize: String(processSize) + ea,
              fontWeight: String(processWeight),
              color: contents.process.green.includes(i) ? colorChip.white : colorChip.black,
              lineHeight: String(processLineHeight),
            }
          }
        ]
      })
    }

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
  }

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
    })

  }


  // bill area

  createNode({
    mother: base,
    style: {
      display: "block",
      position: "relative",
      textAlign: "right",
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
          textAlign: "right",
          lineHeight: String(billLineHeight),
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

  basePadding = <%% 110, 110, 110, 110, 110 %%>;
  leftWidth = <%% 400, 400, 400, 400, 400 %%>;

  minusPadding = <%% -50, -50, -50, -50, -50 %%>;
  blockBetween = <%% 40, 40, 40, 40, 40 %%>;

  titleSize = <%% 21, 21, 21, 21, 21 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  descriptionSize = <%% 16, 16, 16, 16, 16 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  firstBlockMargin = <%% 30, 30, 30, 30, 30 %%>;
  secondBlockMargin = <%% 25, 25, 25, 25, 25 %%>;

  secondPaddingTop = <%% 15, 15, 15, 15, 15 %%>;
  secondPaddingBottom = <%% 20, 20, 20, 20, 20 %%>;
  secondPaddingLeft = <%% 30, 30, 30, 30, 30 %%>;
  secondTab = <%% 310, 310, 310, 310, 310 %%>;

  arrowTop = <%% 24, 24, 24, 24, 24 %%>;
  arrowBaseWidth = <%% 36, 36, 36, 36, 36 %%>;
  arrowHeight = <%% 10, 10, 10, 10, 10 %%>;

  contents = [
    {
      title: "왜 <b%Mini%b>인가요?",
      description: [
        "이제 혼자 고민하지 마세요! 1:1 전담 디자이너를 통해 <b%빠르고 쉽게 온라인으로 전문 제안%b>을 받을 수 있어요!",
        "기존 가구를 그대로 사용하면 공간 분위기가 바뀌지 않을까 걱정이신가요? <b%패브릭, 소품, 액자만 바꿨을 뿐인데, 분위기가 완전 달라질 수 있어요.%b> 신뢰할 수 있는 전문가를 믿고 따라오세요.",
        "시즌, 트렌드에 맞춰 공간에 변화를 주고 싶은데 <b%시간이 부족했다면? HomeLiaison mini 서비스와 함께%b> 똑똑하게 스타일링하세요.",
      ]
    },
    {
      title: "<b%이런 분%b>들께\n추천드려요!",
      description: [
        "가구는 그대로 사용한채로 공간의 무드를 <b%확! 바꾸고 싶은 분!%b>",
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
  baseTongClone.style.paddingBottom = String(basePadding) + ea;

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
      display: "inline-block",
      position: "relative",
      width: String(leftWidth) + ea,
      verticalAlign: "top",
    }
  });

  firstRightBase = createNode({
    mother: firstBase,
    style: {
      display: "inline-block",
      position: "relative",
      width: withOut(leftWidth, ea),
      verticalAlign: "top",
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
      display: "inline-block",
      position: "relative",
      width: String(leftWidth) + ea,
      verticalAlign: "top",
    }
  });
  secondRightBase = createNode({
    mother: secondBase,
    style: {
      display: "inline-block",
      position: "relative",
      width: withOut(leftWidth, ea),
      verticalAlign: "top",
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
            display: "inline-block",
            position: "relative",
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(descriptionBoldWeight),
            color: colorChip.black,
            lineHeight: String(descriptionLineHeight),
            background: colorChip.gray1,
            paddingTop: String(secondPaddingTop) + ea,
            paddingBottom: String(secondPaddingBottom) + ea,
            paddingLeft: String(secondPaddingLeft) + ea,
            paddingRight: String(secondPaddingLeft) + ea,
            borderRadius: String(5) + "px",
            marginLeft: String(i * secondTab) + ea,
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
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
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

  bottomMargin = <%% 200, 200, 200, 200, 200 %%>;
  margin = <%% 68, 68, 68, 68, 68 %%>;
  basePadding = <%% 110, 110, 110, 110, 110 %%>;
  blockBetween = <%% 10, 10, 10, 10, 10 %%>;

  ruleBlockWidth = <%% 420, 420, 420, 420, 420 %%>;

  faqSize = <%% 36, 36, 36, 36, 36 %%>;
  faqWeight = <%% 400, 400, 400, 400, 400 %%>;

  faqBoxMarginTop = <%% 42, 42, 42, 42, 42 %%>;

  faqFactorHeight = <%% 72, 72, 72, 72, 72 %%>;
  faqFactorTextTop = <%% -2, -2, -2, -2, -2 %%>;
  faqFactorSize = <%% 16, 16, 16, 16, 16 %%>;
  faqFactorWeight = <%% 600, 600, 600, 600, 600 %%>;

  finalPhotoHeight = <%% 300, 300, 300, 300, 300 %%>;

  finalSize = <%% 28, 28, 28, 28, 28 %%>;
  finalWeight = <%% 700, 700, 700, 700, 700 %%>;
  finalLineHeight = <%% 1.35, 1.35, 1.35, 1.35, 1.35 %%>;

  finalBarWidth = <%% 40, 40, 40, 40, 40 %%>;
  finalBarHeight = <%% 18, 18, 18, 18, 18 %%>;
  finalBarMarginBottom = <%% 24, 24, 24, 24, 24 %%>;

  buttonWidth = <%% 100, 100, 100, 100, 100 %%>;
  buttonHeight = <%% 45, 45, 45, 45, 45 %%>;

  finalVisual = <%% 8, 8, 8, 8, 8 %%>;

  buttonTextTop = <%% -1, -1, -1, -1, -1 %%>;
  buttonVisual = <%% 16, 16, 16, 16, 16 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;

  rulesBoxPaddingTop = <%% 100, 100, 100, 100, 100 %%>;

  rulesTitleSize = <%% 15, 15, 15, 15, 15 %%>;
  rulesTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  rulesTitleLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  rulesContentsMarginTop = <%% 8, 8, 8, 8, 8 %%>;
  rulesContentsSize = <%% 13, 13, 13, 13, 13 %%>;
  rulesContentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  rulesContentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

  rulesContentsLineTop = <%% 40, 40, 40, 40, 40 %%>;

  contents = {
    faq: [
      {
        question: "가구도 추천해주시는건가요?",
        answer: "",
        important: true,
      },
      {
        question: "디자이너를 선택할 수 있나요?",
        answer: "",
        important: false,
      },
      {
        question: "기간은 얼마나 소요되나요?",
        answer: "",
        important: false,
      },
      {
        question: "배치도 해주시나요?",
        answer: "",
        important: false,
      },
      {
        question: "공간 1개만 해도 되나요?",
        answer: "",
        important: false,
      },
      {
        question: "실측은 어떻게 해야하나요?",
        answer: "",
        important: false,
      },
      {
        question: "디자이너 제안서는 어떤 내용으로 제안받나요?",
        answer: "",
        important: false,
      },
      {
        question: "디자인 제안 받은 후에 수정도 가능할까요?",
        answer: "",
        important: false,
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
          "디자이너와의 상담 시작 1일 전 결제 취소 가능 합니다.",
          "디자이너와의 상담이 시작 된 이후에는 결제 취소가 불가합니다.",
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
          "결제 완료 후, 공간 정보를 공유해주신 후에 디자인 제안 작업 및 상담이 가능합니다.",
          "디자이너 선택은 불가하며, 디자이너는 홈리에종 시스템 내에서 지정됩니다.",
          "디자이너의 디자인 제안서는 1회에 한정됩니다.",
          "실측 서비스는 제공되지 않으며, 고객님에게 실측 안내 가이드를 제공해드립니다.",
          "가구, 제작 상품은 제안하지 않습니다.",
          "배송 완료 후 배치 서비스를 제공하지 않습니다.",
        ]
      },
    ]
  };

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

  for (let i = 0; i < contents.faq.length; i++) {

    createNode({
      mother: faqBox,
      style: {
        display: "inline-flex",
        position: "relative",
        marginRight: String(i % 2 === 0 ? blockBetween : 0) + ea,
        marginBottom: String(blockBetween) + ea,
        width: "calc(calc(100% - " + String(blockBetween) + ea + ") / 2)",
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
    });

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
      display: "inline-block",
      position: "relative",
      width: String(ruleBlockWidth) + ea,
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
  })

  createNode({
    mother: transparentBlock,
    style: {
      display: "inline-block",
      position: "relative",
      width: String(ruleBlockWidth) + ea,
      verticalAlign: "top",
      borderTop: "1px solid " + colorChip.black,
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
  })

  createNode({
    mother: transparentBlock,
    style: {
      display: "inline-block",
      position: "relative",
      width: withOut(ruleBlockWidth * 2, ea),
      verticalAlign: "top",
      borderTop: "1px solid " + colorChip.black,
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
          instance.insertWhyBox();
          instance.insertFaqBox();
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
