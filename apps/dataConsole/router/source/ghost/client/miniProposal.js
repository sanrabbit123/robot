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
      "return ('홈리에종 디자인 제안 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 디자인 제안 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "miniProposal",
  "route": [
    "curation",
    "SC"
  ]
} %/%/g

const MiniProposalJs = function () {
  this.mother = new GeneralJs();
  this.client = null;
  this.firstClick = false;
}

MiniProposalJs.binaryPath = "/middle/miniProposal";

MiniProposalJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let leftRatio;
  let wordSpacing;
  let titleFont, titleLeft, titleFontWeight;
  let indexFont, indexFontWeight;
  let doubleQuote;
  let quoteTop, quoteLeft, quoteHeight, quoteWidth, quoteMarginBottom;
  let initWordingSize;
  let indexNumberBottom;
  let grayBox;
  let grayBoxMarginTop;
  let grayBoxHeight;
  let grayBoxImageVisualWidth;
  let contents;
  let rightBoxPaddingTop;
  let rightBoxPaddingBottom;
  let titleTop;
  let titlePaddingTop;
  let descriptionMarginLeft;
  let mobileTitleHeight;
  let mobileBottomMargin;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 29, 27, 23, 5.8 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 600, 600, 600, 600, 700 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;
  titleTop = <%% 2, 3, 2, 2, 0 %%>;
  titlePaddingTop = <%% 5, 5, 5, 5, 5 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  quoteTop = <%% 9, 9, 9, 7, -0.6 %%>;
  quoteHeight = <%% 11, 11, 10, 9, 2.5 %%>;
  quoteLeft = <%% 2, 2, 2, 2, 1.6 %%>;

  rightBoxPaddingTop = <%% 25, 25, 23, 21, 3.5 %%>;
  rightBoxPaddingBottom = <%% 6, 6, 5, 4, 0 %%>;

  initWordingSize = <%% 15.5, 15, 14.5, 13, 3.5 %%>;

  indexNumberBottom = <%% 3, 4, 12, 4, 0 %%>;

  grayBoxMarginTop = <%% 55, 50, 40, 28, 9.5 %%>;
  grayBoxImageVisualWidth = <%% 6, 4, 0, 0, 19 %%>;

  descriptionMarginLeft = <%% 5, 5, 5, 5, 8 %%>;
  mobileTitleHeight = 28;
  mobileBottomMargin = 10;

  contents = {
    title: [
      "디자인 시안",
      "제공 방식 안내"
    ],
    description: [
      "고객님 공간에 딱 맞는 홈리에종 미니 스타일링안을 드립니다. <b%디자인 시안은 콜라주와 제품 리스트로 제공되며,%b>",
      "자세한 상품 정보와 구입처를 통해 구매하신 뒤, 무드 보드를 참고하셔서 배치 및 설치를 진행해주시면 됩니다."
    ],
    image: MiniProposalJs.binaryPath + "/init" + String(media.findIndex(boo => boo)) + ".png",
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin) + ea,
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
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : String(mobileTitleHeight) + ea,
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
    },
    children: [
      {
        text: contents.title.join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(titleFont) + ea,
          fontWeight: String(titleFontWeight),
          wordSpacing: String(wordSpacing) + "px",
          lineHeight: String(1.4),
          left: String(titleLeft) + ea,
          color: colorChip.black,
          width: desktop ? "" : String(100) + '%',
          textAlign: desktop ? "left" : "center",
          top: isMac() ? "" : String(titleTop) + ea,
          paddingTop: desktop ? "" : String(titlePaddingTop) + ea,
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
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")" : withOut(margin * 2, ea),
      marginBottom: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? "" : String(margin) + ea,
      paddingTop: String(rightBoxPaddingTop) + ea,
      paddingBottom: String(rightBoxPaddingBottom) + ea,
    }
  });

  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  createNode({
    mother: rightBox,
    mode: "svg",
    source: svgMaker.doubleQuote(colorChip.green),
    style: {
      position: "absolute",
      top: String(quoteTop) + ea,
      left: desktop ? String(quoteLeft) + ea : "calc(50% - " + String(quoteWidth / 2) + ea + ")",
      width: String(quoteWidth) + ea,
      height: String(quoteHeight) + ea,
    }
  });

  createNode({
    mother: rightBox,
    text: contents.description.join("\n"),
    style: {
      display: "block",
      position: "relative",
      width: desktop ? String(100) + '%' : withOut(descriptionMarginLeft * 2, ea),
      marginLeft: desktop ? "" : String(descriptionMarginLeft) + ea,
      fontSize: String(initWordingSize) + ea,
      fontWeight: String(400),
      color: colorChip.black,
      lineHeight: String(1.6),
      textAlign: desktop ? "left" : "center",
    },
    bold: {
      fontWeight: String(600),
      color: colorChip.green,
    }
  });

  grayBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginTop: desktop ? String(grayBoxMarginTop) + ea : "",
      paddingTop: desktop ? "" : String(grayBoxMarginTop) + ea,
      width: desktop ? withOut(grayBoxImageVisualWidth, ea) : String(100) + '%',
      paddingBottom: desktop ? "" : String(mobileBottomMargin) + ea,
    }
  });

  createNode({
    mother: grayBox,
    mode: "img",
    attribute: {
      src: contents.image,
    },
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    }
  });

}

MiniProposalJs.prototype.insertCollageBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing, setQueue } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let margin;
  let contents;
  let topBottomVisualMargin;
  let grayTong;
  let grayPaddingLeft;
  let descriptionBox;
  let imageBox;
  let imageWidth, imageHeight;
  let descriptionBoxPaddingTop, descriptionBoxPaddingBottom, descriptionBoxPaddingLeft, descriptionBoxPaddingRight;
  let descriptionTextTong;
  let titleSize, titleWeight, titleLineHeight;
  let descriptionPaddingTop;
  let descriptionSize, descriptionWeight, descriptionBoldWeight, descriptionLineHeight;
  let subSize, subWeight, subTop, subRight;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  topBottomVisualMargin = <%% 18, 16, 12, 10, 3 %%>;

  grayPaddingLeft = <%% 100, 64, 64, 64, 64 %%>;

  imageWidth = <%% 550, 520, 520, 520, 520 %%>;
  imageHeight = <%% 550, 520, 520, 520, 520 %%>;

  titleSize = <%% 18, 18, 18, 18, 18 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  descriptionBoxPaddingTop = <%% 64, 64, 64, 64, 10 %%>;
  descriptionBoxPaddingBottom = <%% 64, 64, 64, 64, 10 %%>;
  descriptionBoxPaddingLeft = <%% 80, 64, 64, 64, 64 %%>;
  descriptionBoxPaddingRight = <%% 20, 24, 24, 24, 24 %%>;

  descriptionPaddingTop = <%% 11, 11, 11, 11, 11 %%>;

  descriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  subSize = <%% 16, 16, 16, 16, 16 %%>;
  subWeight = <%% 400, 400, 400, 400, 400 %%>;
  subTop = <%% -12, -12, -12, -12, -12 %%>;
  subRight = <%% 44, 44, 44, 44, 44 %%>;

  contents = {
    title: "콜라주 제공 안내",
    sub: "collage",
    description: [
      [
        "콜라주는 이미지 샘플로 구성된 시각적 표현",
        "방식입니다. 고객님 공간에 맞는 <b%패브릭,",
        "액자, 소품을 조합하여 하나의 스타일을",
        "연출%b>하는 용도로 만들어 집니다.",
      ],
      [
        "제품 리스트에 있는 모든 제품들이 조합",
        "되었을 때 <b%어떤 분위기를 내는지, 어떻게",
        "배치되면 되는 지%b>를 알려드립니다.",
        "가구는 해당 사항이 아니라 제외됩니다.",
      ]
    ],
    image: MiniProposalJs.binaryPath + "/collage" + String(media.findIndex(boo => boo)) + ".svg",
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin + topBottomVisualMargin) + ea,
      paddingBottom: String(margin + topBottomVisualMargin) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  grayTong = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      marginLeft: String(margin) + ea,
      marginRight: String(margin) + ea,
      paddingLeft: String(grayPaddingLeft) + ea,
      width: withOut((margin * 2) + grayPaddingLeft, ea),
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
    }
  });

  imageBox = createNode({
    mother: grayTong,
    style: {
      display: "inline-block",
      position: "relative",
      width: String(imageWidth) + ea,
      background: colorChip.white,
      verticalAlign: "top",
    },
    children: [
      {
        mode: "img",
        attribute: {
          src: contents.image,
        },
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
        }
      }
    ]
  });

  descriptionBox = createNode({
    mother: grayTong,
    style: {
      display: "inline-flex",
      position: "relative",
      marginLeft: String(descriptionBoxPaddingLeft) + ea,
      width: withOut(imageWidth + (descriptionBoxPaddingLeft + descriptionBoxPaddingRight), ea),
      marginTop: String(descriptionBoxPaddingTop) + ea,
      marginBottom: String(descriptionBoxPaddingBottom) + ea,
      height: String(imageHeight - descriptionBoxPaddingTop - descriptionBoxPaddingBottom) + ea,
      verticalAlign: "top",
      flexDirection: "column",
      justifyContent: "end"
    }
  });

  createNode({
    mother: descriptionBox,
    text: contents.title,
    style: {
      display: "block",
      position: "relative",
      textAlign: "left",
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      lineHeight: String(titleLineHeight),
      color: colorChip.black,
    }
  });

  descriptionTextTong = createNode({
    mother: descriptionBox,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      paddingTop: String(descriptionPaddingTop) + ea,
    }
  });

  for (let i = 0; i < contents.description.length; i++) {
    createNode({
      mother: descriptionTextTong,
      text: contents.description[i].join("\n"),
      style: {
        display: "inline-block",
        width: "calc(100% / " + String(contents.description.length) + ")",
        fontSize: String(descriptionSize) + ea,
        fontWeight: String(descriptionWeight),
        color: colorChip.black,
        lineHeight: String(descriptionLineHeight),
      },
      bold: {
        fontSize: String(descriptionSize) + ea,
        fontWeight: String(descriptionBoldWeight),
        color: colorChip.black,
        lineHeight: String(descriptionLineHeight),
      }
    });
  }

  createNode({
    mother: descriptionBox,
    text: contents.sub,
    style: {
      display: "block",
      position: "absolute",
      textAlign: "right",
      width: String(100) + '%',
      fontSize: String(subSize) + ea,
      fontWeight: String(subWeight),
      top: String(subTop) + ea,
      right: String(subRight) + ea,
      fontFamily: "graphik",
      color: colorChip.black,
    }
  });

}

MiniProposalJs.prototype.insertPhotoBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let margin;
  let contents;
  let photoTong;
  let photoTongWidth;
  let photoTongHeight;
  let descriptionTong;
  let titleSize;
  let titleWeight;
  let titleLineHeight;
  let descriptionPaddingTop;
  let descriptionSize;
  let descriptionWeight;
  let descriptionBoldWeight;
  let descriptionLineHeight;
  let photoBetween;
  let basePadding;

  basePadding = <%% 150, 90, 85, 75, 11 %%>;

  margin = <%% 56, 52, 44, 32, 6 %%>;

  photoTongWidth = <%% 1150, 1150, 1150, 1150, 1150 %%>;
  photoTongHeight = <%% 241, 241, 241, 241, 241 %%>;

  photoBetween = <%% 10, 10, 10, 10, 10 %%>;

  titleSize = <%% 18, 18, 18, 18, 18 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  descriptionPaddingTop = <%% 11, 11, 11, 11, 11 %%>;

  descriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;


  contents = {
    title: "참고 사진 제공 안내",
    description: [
      "무드 보드와 함께 배치의 이해를 도울 수",
      "있도록 <b%같은 컨셉의 인테리어 사진이 첨부%b>될",
      "수 있습니다. 하지만 참고 사진은 제품의",
      "하나하나의 구성이 실제 무드 보드 / 제품",
      "리스트와 다를 수 있으며 컨셉만 같다는",
      "점을 유의하시길 바랍니다.",
    ],
    images: [
      MiniProposalJs.binaryPath + "/" + "sample0.jpg",
      MiniProposalJs.binaryPath + "/" + "sample1.jpg",
      MiniProposalJs.binaryPath + "/" + "sample2.jpg",
      MiniProposalJs.binaryPath + "/" + "sample3.jpg",
      MiniProposalJs.binaryPath + "/" + "sample4.jpg",
      MiniProposalJs.binaryPath + "/" + "sample5.jpg",
    ]
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      width: String(100) + '%',
      paddingTop: String(margin) + ea,
      paddingBottom: String(basePadding) + ea,
    }
  });

  photoTong = createNode({
    mother: whiteBlock,
    style: {
      display: "inline-block",
      position: "relative",
      width: String(photoTongWidth) + ea,
      height: String(photoTongHeight) + ea,
      verticalAlign: "top",
    }
  });

  for (let i = 0; i < contents.images.length; i++) {
    createNode({
      mother: photoTong,
      mode: "img",
      attribute: {
        src: contents.images[i]
      },
      style: {
        display: "inline-block",
        position: "relative",
        height: String(100) + '%',
        borderRadius: String(5) + "px",
        marginRight: String(photoBetween) + ea,
      }
    });
  }

  descriptionTong = createNode({
    mother: whiteBlock,
    style: {
      display: "inline-flex",
      verticalAlign: "top",
      position: "relative",
      flexDirection: "column",
      justifyContent: "end",
      width: withOut(photoTongWidth, ea),
      height: String(photoTongHeight) + ea,
    }
  });

  createNode({
    mother: descriptionTong,
    text: contents.title,
    style: {
      display: "block",
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      color: colorChip.black,
      lineHeight: String(titleLineHeight),
      marginBottom: String(descriptionPaddingTop) + ea,
    }
  });

  createNode({
    mother: descriptionTong,
    text: contents.description.join("\n"),
    style: {
      display: "block",
      fontSize: String(descriptionSize) + ea,
      fontWeight: String(descriptionWeight),
      color: colorChip.black,
      lineHeight: String(descriptionLineHeight),
    },
    bold: {
      fontSize: String(descriptionSize) + ea,
      fontWeight: String(descriptionBoldWeight),
      color: colorChip.black,
    }
  });


}

MiniProposalJs.prototype.insertSecondBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing, autoComma, blankHref } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let whiteBase;
  let bottomMargin;
  let margin;
  let contents;
  let baseTongClone;
  let basePadding;
  let titleTextTong;
  let titleTextTitleWidth;
  let titleTextTongHeight;
  let titleTextTitleSize, titleTextTitleWeight, titleTextTitleLineHeight;
  let titleTextDescriptionSize, titleTextDescriptionWeight, titleTextDescriptionBoldWeight, titleTextDescriptionLineHeight;
  let titleTextDescriptionPaddingTop;
  let topBottomVisualMargin;
  let grayBlock;
  let grayTitleSize, grayTitleWeight, grayTitleLineHeight;
  let grayTitlePadding;
  let grayTitleLineTop;
  let collageWhiteTong;
  let collageSlideBetween;
  let collageInnerMargin;
  let collageDescriptionBox;
  let collageDescriptionBoxMarginLeft;
  let whiteTongMarginTop, whiteTongMarginBottom;
  let collageDescriptionBoxMarginTop, collageDescriptionBoxMarginBottom;
  let collageDescriptionBoxTitleAreaWidth;
  let collageDescriptionBoxTitleSize, collageDescriptionBoxTitleWeight, collageDescriptionBoxTitleLineHeight;
  let collageDescriptionBoxDescriptionSize, collageDescriptionBoxDescriptionWeight, collageDescriptionBoxDescriptionBoldWeight;
  let tableWhiteTong;
  let referencePhotoTong;
  let referencePhotoBetween;
  let tableColumnsWidth;
  let tableColumnsFactor;
  let tableColumnsName;
  let tableColumnBar;
  let tableFatorBars;
  let tempTong;
  let tableInnerMargin;
  let tableInnerMarginTop;
  let whiteTongMarginBottomFinal;
  let tableFactorTextTop, tableFactorSize, tableFactorWeight;
  let tableFactorHeight;
  let tableColumnHeight;
  let tableColumnWeight;

  basePadding = <%% 150, 90, 85, 75, 11 %%>;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  titleTextTitleWidth = <%% 340, 340, 340, 340, 340 %%>;
  titleTextTongHeight = <%% 85, 85, 85, 85, 85 %%>;

  titleTextTitleSize = <%% 26, 26, 26, 26, 26 %%>;
  titleTextTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleTextTitleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  titleTextDescriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  titleTextDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  titleTextDescriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTextDescriptionLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;
  titleTextDescriptionPaddingTop = <%% 3, 3, 3, 3, 3 %%>;

  topBottomVisualMargin = <%% 8, 8, 8, 8, 0 %%>;

  grayTitleSize = <%% 22, 22, 22, 22, 22 %%>;
  grayTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  grayTitleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  grayTitlePadding = <%% 20, 20, 20, 20, 20 %%>;
  grayTitleLineTop = <%% 16, 16, 16, 16, 16 %%>;

  collageSlideBetween = <%% 12, 12, 12, 12, 12 %%>;
  collageInnerMargin = <%% 24, 24, 24, 24, 24 %%>;

  collageDescriptionBoxMarginLeft = <%% 60, 70, 70, 70, 70 %%>;
  collageDescriptionBoxMarginTop = <%% 72, 72, 72, 72, 72 %%>;
  collageDescriptionBoxMarginBottom = <%% 80, 80, 80, 80, 80 %%>;

  collageDescriptionBoxTitleAreaWidth = <%% 180, 180, 180, 180, 180 %%>;

  collageDescriptionBoxTitleSize = <%% 16, 16, 16, 16, 16 %%>;
  collageDescriptionBoxTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  collageDescriptionBoxTitleLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  collageDescriptionBoxDescriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  collageDescriptionBoxDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  collageDescriptionBoxDescriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

  whiteTongMarginTop = <%% 32, 32, 32, 32, 32 %%>;
  whiteTongMarginBottom = <%% 72, 72, 72, 72, 72 %%>;
  whiteTongMarginBottomFinal = <%% 32, 32, 32, 32, 32 %%>;

  referencePhotoBetween = <%% 10, 10, 8, 8, 1 %%>;

  tableInnerMargin = <%% 54, 54, 54, 54, 54 %%>;
  tableInnerMarginTop = <%% 42, 42, 42, 42, 42 %%>;

  tableFactorTextTop = <%% -2, -2, -2, -2, -2 %%>;
  tableFactorSize = <%% 14, 14, 14, 14, 14 %%>;
  tableFactorWeight = <%% 400, 400, 400, 400, 400 %%>;
  tableColumnWeight = <%% 700, 700, 700, 700, 700 %%>;

  tableFactorHeight = <%% 100, 100, 100, 100, 100 %%>;
  tableColumnHeight = <%% 45, 45, 45, 45, 45 %%>;

  tableColumnsWidth = [
    <&& 120 | 120 | 120 | 120 | 120 &&>,
    <&& 150 | 150 | 150 | 150 | 150 &&>,
    <&& 100 | 100 | 100 | 100 | 100 &&>,
    <&& 100 | 100 | 100 | 100 | 100 &&>,
    <&& 100 | 100 | 100 | 100 | 100 &&>,
    <&& 100 | 100 | 100 | 100 | 100 &&>,
    <&& 270 | 270 | 270 | 270 | 270 &&>,
    <&& 120 | 120 | 120 | 120 | 120 &&>,
    <&& 120 | 120 | 120 | 120 | 120 &&>,
  ];

  tableColumnsName = [
    "이미지",
    "품목",
    "수량",
    "단가",
    "배송비",
    "총액",
    "상세 사항",
    "구매처",
    "링크"
  ];

  tableColumnsFactor = [
    { type: "image", source: (obj) => { return obj.image } },
    { type: "string", source: (obj) => { return obj.name } },
    { type: "number", source: (obj) => { return obj.number } },
    { type: "money", source: (obj) => { return obj.price.unit } },
    { type: "money", source: (obj) => { return obj.price.delivery } },
    { type: "money", source: (obj) => { return (obj.price.unit * obj.number) + obj.price.delivery } },
    { type: "string", source: (obj) => { return obj.detail } },
    { type: "string", source: (obj) => { return obj.where.name } },
    { type: "link", source: (obj) => { return obj.where.link } },
  ];

  contents = {
    title: [
      "공간별 디자인 시안과",
      "제품 리스트",
    ],
    description: [
      "고객님 공간에 딱 맞는 홈리에종 미니 스타일링안을 드립니다. <b%디자인 시안은 무드 보드와 제품 리스트로 제공되며,%b>",
      "자세한 상품 정보와 구입처를 통해 구매하신 뒤, 무드 보드를 참고하셔서 배치 및 설치를 진행해주시면 됩니다.",
      "수정 사항은 별도로 제공되지 않으며 기타 문의 사항이 있을시, 하단 채팅 기능을 통해 홈리에종으로 문의해주시길 바랍니다!",
    ],
    proposal: {
      collage: {
        title: "무드보드와 콜라주",
        slide: [
          MiniProposalJs.binaryPath + "/" + "proposal0.jpg",
          MiniProposalJs.binaryPath + "/" + "proposal1.jpg",
        ],
        sub: "디자인 시안 설명",
        description: "고객님 공간에 딱 맞는 홈리에종 미니 스타일링안을 드립니다. 디자인 시안은 무드 보드와 제품 리스트로 제공되며, <b%자세한 상품 정보와 구입처를 통해 구매하신 뒤, 무드 보드를 참고하셔서%b> 배치 및 설치를 진행해주시면 됩니다. 수정 사항은 별도로 제공되지 않으며 기타 문의 사항이 있을시, 하단 채팅 기능을 통해 홈리에종으로 문의해주시길 바랍니다!\n\n고객님 공간에 딱 맞는 홈리에종 미니 스타일링안을 드립니다. 디자인 시안은 무드 보드와 제품 리스트로 제공되며, <b%자세한 상품 정보와 구입처를 통해 구매하신 뒤, 무드 보드를 참고하셔서%b> 배치 및 설치를 진행해주시면 됩니다. 수정 사항은 별도로 제공되지 않으며 기타 문의 사항이 있을시, 하단 채팅 기능을 통해 홈리에종으로 문의해주시길 바랍니다!",
      },
      reference: {
        title: "참고 사진",
        slide: [
          MiniProposalJs.binaryPath + "/" + "reference0.jpg",
          MiniProposalJs.binaryPath + "/" + "reference1.jpg",
          MiniProposalJs.binaryPath + "/" + "reference2.jpg",
          MiniProposalJs.binaryPath + "/" + "reference3.jpg",
        ]
      },
      table: {
        title: "제품 리스트",
        list: [
          {
            image: MiniProposalJs.binaryPath + "/" + "item0.png",
            name: "거실 실링팬",
            number: 1,
            price: {
              unit: 389000,
              delivery: 0
            },
            detail: "화이트 / 화이트",
            where: {
              name: "에어블로우",
              link: "https://google.com",
            }
          },
          {
            image: MiniProposalJs.binaryPath + "/" + "item1.png",
            name: "스텐드 조명",
            number: 1,
            price: {
              unit: 370000,
              delivery: 0
            },
            detail: "노란빛",
            where: {
              name: "슬로우 빌라",
              link: "https://google.com",
            }
          },
          {
            image: MiniProposalJs.binaryPath + "/" + "item2.png",
            name: "스텐드 조명",
            number: 1,
            price: {
              unit: 256000,
              delivery: 0
            },
            detail: "미니 소프트웜 / 스노우 화이트",
            where: {
              name: "라문직영샵",
              link: "https://google.com",
            }
          },
          {
            image: MiniProposalJs.binaryPath + "/" + "item3.png",
            name: "조명 펜던트",
            number: 2,
            price: {
              unit: 125000,
              delivery: 0
            },
            detail: "주백색 일체형",
            where: {
              name: "조명나라",
              link: "https://google.com",
            }
          },
          {
            image: MiniProposalJs.binaryPath + "/" + "item4.png",
            name: "조명 펜던트",
            number: 1,
            price: {
              unit: 95000,
              delivery: 0
            },
            detail: "400H / 노란빛",
            where: {
              name: "조명나라",
              link: "https://google.com",
            }
          },
          {
            image: MiniProposalJs.binaryPath + "/" + "item5.png",
            name: "조명 펜던트",
            number: 1,
            price: {
              unit: 74200,
              delivery: 0
            },
            detail: "380 파이 / 볼전구 주백색",
            where: {
              name: "공간조명",
              link: "https://google.com",
            }
          },
          {
            image: MiniProposalJs.binaryPath + "/" + "item6.png",
            name: "조명 펜던트",
            number: 1,
            price: {
              unit: 66000,
              delivery: 0
            },
            detail: "화이트 / 화이트 / 12W 볼전구 전구색",
            where: {
              name: "라디룸",
              link: "https://google.com",
            }
          },
          {
            image: MiniProposalJs.binaryPath + "/" + "item7.png",
            name: "조명 펜던트",
            number: 1,
            price: {
              unit: 57900,
              delivery: 3000
            },
            detail: "150파이 / 일반형 / 2M / 노란빛",
            where: {
              name: "제일조명",
              link: "https://google.com",
            }
          },
          {
            image: MiniProposalJs.binaryPath + "/" + "item8.png",
            name: "스텐드 조명",
            number: 1,
            price: {
              unit: 156000,
              delivery: 3000
            },
            detail: "버터 / 디밍",
            where: {
              name: "1962",
              link: "https://google.com",
            }
          },
        ]
      }
    }
  };

  // another base
  whiteBase = createNode({
    mother: this.baseTong.parentElement,
    style: {
      display: "block",
      width: String(100) + '%',
      position: "relative",
      background: colorChip.gray3,
    }
  });

  baseTongClone = this.baseTong.cloneNode(false);
  whiteBase.appendChild(baseTongClone);

  baseTongClone.style.paddingTop = String(basePadding) + ea;
  baseTongClone.style.paddingBottom = String(basePadding) + ea;

  // white
  whiteBlock = createNode({
    mother: baseTongClone,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin - topBottomVisualMargin) + ea,
      paddingBottom: String(margin - topBottomVisualMargin) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });
  titleTextTong = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      marginLeft: String(margin) + ea,
      width: withOut(margin * 2, ea),
      height: String(titleTextTongHeight) + ea,
    }
  });
  createNode({
    mother: titleTextTong,
    text: contents.title.join("\n"),
    style: {
      display: "inline-block",
      position: "relative",
      width: String(titleTextTitleWidth) + ea,
      fontSize: String(titleTextTitleSize) + ea,
      fontWeight: String(titleTextTitleWeight),
      color: colorChip.black,
      lineHeight: String(titleTextTitleLineHeight),
      verticalAlign: "top",
    }
  });
  createNode({
    mother: titleTextTong,
    text: contents.description.join("\n"),
    style: {
      display: "inline-block",
      position: "relative",
      width: withOut(titleTextTitleWidth, ea),
      fontSize: String(titleTextDescriptionSize) + ea,
      fontWeight: String(titleTextDescriptionWeight),
      color: colorChip.black,
      lineHeight: String(titleTextDescriptionLineHeight),
      verticalAlign: "top",
      paddingTop: String(titleTextDescriptionPaddingTop) + ea,
    },
    bold: {
      fontSize: String(titleTextDescriptionSize) + ea,
      fontWeight: String(titleTextDescriptionBoldWeight),
      color: colorChip.green,
    }
  });

  // gray
  grayBlock = createNode({
    mother: baseTongClone,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin - topBottomVisualMargin) + ea,
      paddingBottom: String(margin - topBottomVisualMargin) + ea,
      background: colorChip.gray1,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  // gray 1 : collage
  createNode({
    mother: grayBlock,
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      marginLeft: String(margin) + ea,
      width: withOut(margin * 2, ea),
    },
    children: [
      {
        style: {
          position: "absolute",
          width: String(100) + '%',
          top: String(0),
          left: String(0),
          height: String(grayTitleLineTop) + ea,
          borderBottom: "1px solid " + colorChip.gray3,
        }
      },
      {
        text: contents.proposal.collage.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(grayTitleSize) + ea,
          fontWeight: String(grayTitleWeight),
          lineHeight: String(grayTitleLineHeight),
          color: colorChip.black,
          paddingLeft: String(grayTitlePadding) + ea,
          paddingRight: String(grayTitlePadding) + ea,
          background: colorChip.gray1,
        }
      }
    ]
  });

  collageWhiteTong = createNode({
    mother: grayBlock,
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      marginLeft: String(margin) + ea,
      width: withOut((margin * 2) + (collageInnerMargin * 2), ea),
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      paddingTop: String(collageInnerMargin) + ea,
      paddingBottom: String(collageInnerMargin) + ea,
      paddingLeft: String(collageInnerMargin) + ea,
      paddingRight: String(collageInnerMargin) + ea,
      borderRadius: String(8) + "px",
      marginTop: String(whiteTongMarginTop) + ea,
      marginBottom: String(whiteTongMarginBottom) + ea,
    }
  });

  for (let i = 0; i < contents.proposal.collage.slide.length; i++) {
    createNode({
      mother: collageWhiteTong,
      mode: "img",
      attribute: {
        src: contents.proposal.collage.slide[i],
      },
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        marginBottom: String(collageSlideBetween) + ea,
      }
    });
  }

  collageDescriptionBox = createNode({
    mother: collageWhiteTong,
    style: {
      display: "block",
      position: "relative",
      marginTop: String(collageDescriptionBoxMarginTop) + ea,
      textAlign: "left",
      marginLeft: String(collageDescriptionBoxMarginLeft) + ea,
      marginRight: String(collageDescriptionBoxMarginLeft) + ea,
      width: withOut(collageDescriptionBoxMarginLeft * 2, ea),
      marginBottom: String(collageDescriptionBoxMarginBottom) + ea,
    }
  });
  createNode({
    mother: collageDescriptionBox,
    text: contents.proposal.collage.sub,
    style: {
      display: "inline-block",
      width: String(collageDescriptionBoxTitleAreaWidth) + ea,
      fontSize: String(collageDescriptionBoxTitleSize) + ea,
      fontWeight: String(collageDescriptionBoxTitleWeight),
      color: colorChip.black,
      lineHeight: String(collageDescriptionBoxTitleLineHeight),
      verticalAlign: "top",
    }
  });
  createNode({
    mother: collageDescriptionBox,
    text: contents.proposal.collage.description,
    style: {
      display: "inline-block",
      width: withOut(collageDescriptionBoxTitleAreaWidth, ea),
      fontSize: String(collageDescriptionBoxDescriptionSize) + ea,
      fontWeight: String(collageDescriptionBoxDescriptionWeight),
      color: colorChip.black,
      lineHeight: String(collageDescriptionBoxTitleLineHeight),
      verticalAlign: "top",
    },
    bold: {
      fontWeight: String(collageDescriptionBoxDescriptionBoldWeight),
      color: colorChip.black,
    }
  });

  // gray 2 : reference
  createNode({
    mother: grayBlock,
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      marginLeft: String(margin) + ea,
      width: withOut(margin * 2, ea),
    },
    children: [
      {
        style: {
          position: "absolute",
          width: String(100) + '%',
          top: String(0),
          left: String(0),
          height: String(grayTitleLineTop) + ea,
          borderBottom: "1px solid " + colorChip.gray3,
        }
      },
      {
        text: contents.proposal.reference.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(grayTitleSize) + ea,
          fontWeight: String(grayTitleWeight),
          lineHeight: String(grayTitleLineHeight),
          color: colorChip.black,
          paddingLeft: String(grayTitlePadding) + ea,
          paddingRight: String(grayTitlePadding) + ea,
          background: colorChip.gray1,
        }
      }
    ]
  });
  referencePhotoTong = createNode({
    mother: grayBlock,
    style: {
      display: "block",
      position: "relative",
      textAlign: "left",
      marginLeft: String(margin) + ea,
      width: withOut((margin * 2), ea),
      marginTop: String(whiteTongMarginTop) + ea,
      marginBottom: String(whiteTongMarginBottom) + ea,
    }
  });
  for (let i = 0; i < contents.proposal.reference.slide.length; i++) {
    createNode({
      mother: referencePhotoTong,
      mode: "img",
      attribute: {
        src: contents.proposal.reference.slide[i]
      },
      style: {
        display: "inline-block",
        position: "relative",
        width: "calc(calc(100% - " + String(referencePhotoBetween * (contents.proposal.reference.slide.length - 1)) + ea + ") / " + String(contents.proposal.reference.slide.length) + ")",
        marginRight: String(i === contents.proposal.reference.slide.length - 1 ? 0 : referencePhotoBetween) + ea,
        borderRadius: String(5) + "px",
      }
    });
  }

  // gray 3 : table
  createNode({
    mother: grayBlock,
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      marginLeft: String(margin) + ea,
      width: withOut(margin * 2, ea),
    },
    children: [
      {
        style: {
          position: "absolute",
          width: String(100) + '%',
          top: String(0),
          left: String(0),
          height: String(grayTitleLineTop) + ea,
          borderBottom: "1px solid " + colorChip.gray3,
        }
      },
      {
        text: contents.proposal.table.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(grayTitleSize) + ea,
          fontWeight: String(grayTitleWeight),
          lineHeight: String(grayTitleLineHeight),
          color: colorChip.black,
          paddingLeft: String(grayTitlePadding) + ea,
          paddingRight: String(grayTitlePadding) + ea,
          background: colorChip.gray1,
        }
      }
    ]
  });

  tableWhiteTong = createNode({
    mother: grayBlock,
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      marginLeft: String(margin) + ea,
      width: withOut((margin * 2) + (tableInnerMargin * 2), ea),
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      paddingTop: String(tableInnerMarginTop) + ea,
      paddingBottom: String(tableInnerMargin) + ea,
      paddingLeft: String(tableInnerMargin) + ea,
      paddingRight: String(tableInnerMargin) + ea,
      borderRadius: String(8) + "px",
      marginTop: String(whiteTongMarginTop) + ea,
      marginBottom: String(whiteTongMarginBottomFinal) + ea,
    }
  });

  tableColumnBar = createNode({
    mother: tableWhiteTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      textAlign: "left",
      borderBottom: "1px solid " + colorChip.black,
    }
  });

  for (let i = 0; i < tableColumnsName.length; i++) {
    createNode({
      mother: tableColumnBar,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(tableColumnsWidth[i]) + ea,
        height: String(tableColumnHeight) + ea,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      },
      children: [
        {
          text: tableColumnsName[i],
          style: {
            display: "inline-block",
            position: "relative",
            top: String(tableFactorTextTop) + ea,
            fontSize: String(tableFactorSize) + ea,
            fontWeight: String(tableColumnWeight),
            color: colorChip.black,
          }
        }
      ]
    });
  }


  tableFatorBars = [];
  for (let i = 0; i < contents.proposal.table.list.length; i++) {
    tableFatorBars.push(createNode({
      mother: tableWhiteTong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        textAlign: "left",
        borderBottom: "1px solid " + colorChip.gray3,
      }
    }));
  }

  for (let i = 0; i < contents.proposal.table.list.length; i++) {
    for (let j = 0; j < tableColumnsFactor.length; j++) {

      tempTong = createNode({
        mother: tableFatorBars[i],
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(tableColumnsWidth[j]) + ea,
          height: String(tableFactorHeight) + ea,
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "top",
          overflow: "scroll",
        }
      });

      if (tableColumnsFactor[j].type === "image") {

        createNode({
          mother: tempTong,
          mode: "img",
          attribute: {
            src: tableColumnsFactor[j].source(contents.proposal.table.list[i]),
          },
          style: {
            display: "inline-block",
            position: "relative",
            height: String(tableFactorHeight) + ea,
          }
        })


      } else if (tableColumnsFactor[j].type === "string") {

        createNode({
          mother: tempTong,
          text: tableColumnsFactor[j].source(contents.proposal.table.list[i]),
          style: {
            display: "inline-block",
            position: "relative",
            top: String(tableFactorTextTop) + ea,
            fontSize: String(tableFactorSize) + ea,
            fontWeight: String(tableFactorWeight),
            color: colorChip.black,
          }
        });

      } else if (tableColumnsFactor[j].type === "number") {

        createNode({
          mother: tempTong,
          text: String(tableColumnsFactor[j].source(contents.proposal.table.list[i])),
          style: {
            display: "inline-block",
            position: "relative",
            top: String(tableFactorTextTop) + ea,
            fontSize: String(tableFactorSize) + ea,
            fontWeight: String(tableFactorWeight),
            color: colorChip.black,
          }
        });


      } else if (tableColumnsFactor[j].type === "money") {

        createNode({
          mother: tempTong,
          text: autoComma(tableColumnsFactor[j].source(contents.proposal.table.list[i])) + '원',
          style: {
            display: "inline-block",
            position: "relative",
            top: String(tableFactorTextTop) + ea,
            fontSize: String(tableFactorSize) + ea,
            fontWeight: String(tableFactorWeight),
            color: colorChip.black,
          }
        });

      } else if (tableColumnsFactor[j].type === "link") {

        createNode({
          mother: tempTong,
          text: "링크 열기",
          event: (e) => { blankHref(tableColumnsFactor[j].source(contents.proposal.table.list[i])) },
          style: {
            display: "inline-block",
            position: "relative",
            top: String(tableFactorTextTop) + ea,
            fontSize: String(tableFactorSize) + ea,
            fontWeight: String(tableFactorWeight),
            color: colorChip.black,
            cursor: "pointer",
          }
        });

      }
    }
  }


}

MiniProposalJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);
    const { returnGet, ajaxJson, requestPromise, setDebounce } = GeneralJs;
    const getObj = returnGet();

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "miniProposal",
      client: this.client,
      base: {
        instance: this,
        binaryPath: MiniProposalJs.binaryPath,
        subTitle: "디자인 제안",
        secondBackground: false,
        backgroundType: 0,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertCollageBox();
          instance.insertPhotoBox();
          instance.insertSecondBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "MiniProposalJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "MiniProposalJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
