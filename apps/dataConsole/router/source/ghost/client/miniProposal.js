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
  "hangul": "미니 디자인 제안",
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

MiniProposalJs.binaryPath = FRONTHOST + "/middle/miniProposal";

MiniProposalJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const { user } = this;
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

  quoteTop = <%% (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 7 : 5), -0.6 %%>;
  quoteHeight = <%% 11, 11, 10, 9, 2.5 %%>;
  quoteLeft = <%% 2, 2, 2, 2, 1.6 %%>;

  rightBoxPaddingTop = <%% 25, 25, 23, 21, 3.5 %%>;
  rightBoxPaddingBottom = <%% 6, 6, 5, 4, 0 %%>;

  initWordingSize = <%% 15.5, 15, 14.5, 13, 3.5 %%>;

  indexNumberBottom = <%% 3, 4, 12, 4, 0 %%>;

  grayBoxMarginTop = <%% (isMac() ? 50 : 48), (isMac() ? 45 : 43), (isMac() ? 35 : 33), (isMac() ? 25 : 23), 9.5 %%>;
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
      <&& "고객님 공간에 맞는 미니 스타일링안을 드립니다. <b%디자인 시안은 콜라주와 제품 리스트로 제공되며,%b>" | "고객님 공간에 맞는 미니 스타일링안을 드립니다. <b%디자인 시안은 콜라주와 제품 리스트로 제공되며,%b>" | "고객님 공간에 맞는 스타일링안을 드립니다. <b%시안은 콜라주와 제품 리스트로 제공되며,%b>" | "고객님께 맞는 스타일링안을 드립니다. <b%시안은 콜라주와 제품 리스트로 제공되며,%b>" | "고객님께 맞는 스타일링안을 드립니다. <b%시안은 콜라주와 제품 리스트로 제공되며,%b>" &&>,
      <&& "자세한 상품 정보와 구입처를 통해 구매하신 뒤, 무드 보드를 참고하여 배치와 설치를 진행해주시면 됩니다." | "자세한 상품 정보와 구입처를 통해 구매하신 뒤, 무드 보드를 참고하여 배치와 설치를 진행해주시면 됩니다." | "자세한 정보와 구입처를 통해 구매하신 뒤, 무드 보드를 참고하여 배치를 진행해주시면 됩니다." | "정보와 구입처를 통해 구매하신 뒤, 무드 보드를 참고하여 배치를 진행해주시면 됩니다." | "정보와 구입처를 통해 구매하신 뒤, 무드 보드를 참고하여 배치를 진행해주시면 됩니다." &&>,
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
      verticalAlign: "top",
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

  grayPaddingLeft = <%% 100, 52, 0, 0, 0 %%>;

  imageWidth = <%% 550, 460, 400, 290, 30 %%>;
  imageHeight = <%% 550, 460, 418, 303, 30 %%>;

  titleSize = <%% 18, 17, 16, 15, 4.2 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  descriptionBoxPaddingTop = <%% 64, 50, 45, 32, 6 %%>;
  descriptionBoxPaddingBottom = <%% 64, 50, 45, 32, 10 %%>;
  descriptionBoxPaddingLeft = <%% 80, 52, 45, 34, 6 %%>;
  descriptionBoxPaddingRight = <%% 20, 12, 8, 2, 0 %%>;

  descriptionPaddingTop = <%% 11, 10, 10, 9, 2.2 %%>;

  descriptionSize = <%% 14, 13, 13, 12, 3 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  subSize = <%% 16, 15, 14, 12, 3 %%>;
  subWeight = <%% 400, 400, 400, 400, 400 %%>;
  subTop = <%% -12, -12, -12, -8, -1 %%>;
  subRight = <%% 44, 40, 34, 32, 4 %%>;

  contents = {
    title: "콜라주 제공 안내",
    sub: "collage",
    description: [
      [
        <&& "콜라주는 이미지 샘플로 구성된 시각적 표현" | "콜라주는 이미지로 구성된 표현" | "콜라주는 이미지로 구성된 표현" | "콜라주는 이미지로 구성된 표현" | "콜라주는 이미지로 구성된 표현" &&>,
        <&& "방식입니다. 고객님 공간에 맞는 <b%패브릭," | "방식입니다. 공간에 맞는 <b%패브릭," | "방식입니다. 공간에 맞는 <b%패브릭," | "방식입니다. 공간에 맞는 <b%패브릭," | "방식입니다. 공간에 맞는 <b%패브릭," &&>,
        <&& "액자, 소품을 조합하여 하나의 스타일을" | "액자, 소품을 조합하여 스타일을" | "액자, 소품을 조합하여 스타일을" | "액자, 소품을 조합하여 스타일을" | "액자, 소품을 조합하여 스타일을" &&>,
        <&& "연출%b>하는 용도로 만들어 집니다." | "연출%b>하는 용도로 만들어 집니다." | "연출%b>하는 용도로 만들어 집니다." | "연출%b>하는 용도로 만들어 집니다." | "연출%b>하는 용도로 만들어 집니다." &&>,
      ],
      [
        <&& "제품 리스트에 있는 모든 제품들이 조합" | "제품 리스트의 항목들이 조합" | "제품 리스트의 항목들이 조합" | "제품 리스트의 항목들이 조합" | "제품 리스트의 항목들이 조합" &&>,
        <&& "되었을 때 <b%어떤 분위기를 내는 지, 어떻게" | "되었을 때 <b%어떤 분위기를 내고" | "되었을 때 <b%어떤 분위기를 내고" | "되었을 때 <b%어떤 분위기를 내고" | "되었을 때 <b%어떤 분위기를 내고" &&>,
        <&& "배치되면 되는 지%b>를 알려드립니다." | "배치되는 지%b>를 알려드립니다." | "배치되는 지%b>를 알려드립니다." | "배치되는 지%b>를 알려드립니다." | "배치되는 지%b>를 알려드립니다." &&>,
        <&& "가구는 해당 사항이 아니라 제외됩니다." | "가구는 사항에서 제외됩니다." | "가구는 사항에서 제외됩니다." | "가구는 사항에서 제외됩니다." | "가구는 사항에서 제외됩니다." &&>,
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
      background: desktop ? colorChip.gray1 : colorChip.white,
      borderRadius: String(5) + "px",
    }
  });

  imageBox = createNode({
    mother: grayTong,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? String(imageWidth) + ea : String(100) + '%',
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
      display: desktop ? "inline-flex" : "block",
      position: "relative",
      marginLeft: desktop ? String(descriptionBoxPaddingLeft) + ea : "",
      width: desktop ? withOut(imageWidth + (descriptionBoxPaddingLeft + descriptionBoxPaddingRight), ea) : String(100) + '%',
      marginTop: String(descriptionBoxPaddingTop) + ea,
      marginBottom: desktop ? String(descriptionBoxPaddingBottom) + ea : "",
      height: desktop ? String(imageHeight - descriptionBoxPaddingTop - descriptionBoxPaddingBottom) + ea : "",
      verticalAlign: desktop ? "top" : "",
      flexDirection: desktop ? "column" : "",
      justifyContent: desktop ? "end" : "",
    }
  });

  createNode({
    mother: descriptionBox,
    text: contents.title,
    style: {
      display: "block",
      position: "relative",
      textAlign: desktop ? "left" : "center",
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
      text: desktop ? contents.description[i].join("\n") : contents.description[i].join(" "),
      style: {
        display: desktop ? "inline-block" : "block",
        width: desktop ? "calc(100% / " + String(contents.description.length) + ")" : String(100) + '%',
        fontSize: String(descriptionSize) + ea,
        fontWeight: String(descriptionWeight),
        color: colorChip.black,
        lineHeight: String(descriptionLineHeight),
        textAlign: desktop ? "left" : "center",
        marginBottom: desktop ? "" : String(i === 0 ? 1 : 0.5) + ea,
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
      display: desktop ? "block" : "none",
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
  let mobileTitleMarginTop, mobileDescriptionMarginLeft;

  basePadding = <%% 150, 120, 105, 90, 12 %%>;

  margin = <%% 56, 52, 44, 32, 6 %%>;

  photoTongWidth = <%% 1150, 830, 670, 520, 40 %%>;
  photoTongHeight = <%% 241, 210, 210, 163, 39.5 %%>;

  photoBetween = <%% 10, 8, 8, 6, 1 %%>;

  titleSize = <%% 18, 17, 16, 15, 4.2 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  descriptionPaddingTop = <%% 11, 10, 10, 9, 2.2 %%>;

  descriptionSize = <%% 14, 13, 13, 12, 3 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  mobileTitleMarginTop = 6;
  mobileDescriptionMarginLeft = 2;

  contents = {
    title: "참고 사진 제공 안내",
    description: [
      "무드 보드와 함께 배치의 이해를 도울 수",
      desktop ? "있도록 <b%같은 컨셉의 인테리어 사진이 첨부%b>될" : "있도록 <b%같은 컨셉의 사진이 첨부%b>될",
      "수 있습니다. 하지만 참고 사진은 제품의",
      "하나하나의 구성이 실제 무드 보드, 제품",
      desktop ? "리스트와 다를 수 있으며 컨셉만 같다는" : "리스트와 다르며, 컨셉만 같다는",
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

  if (media[1]) {
    contents.images.pop();
  } else if (media[2] || media[3]) {
    contents.images.pop();
    contents.images.pop();
  }


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
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? String(photoTongWidth) + ea : String(100) + '%',
      height: desktop ? String(photoTongHeight) + ea : "",
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
        height: desktop ? String(100) + '%' : "",
        width: desktop ? "" : "calc(calc(100% - " + String(photoBetween * 2) + ea + ") / " + String(3) + ")",
        borderRadius: String(5) + "px",
        marginRight: desktop ? String(photoBetween) + ea : String(i % 3 === 2 ? 0 : photoBetween) + ea,
        marginBottom: desktop ? "" : String(photoBetween) + ea,
      }
    });
  }

  descriptionTong = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-flex" : "block",
      verticalAlign: "top",
      position: "relative",
      flexDirection: "column",
      justifyContent: "end",
      width: desktop ? withOut(photoTongWidth, ea) : String(100) + '%',
      height: desktop ? String(photoTongHeight) + ea : "",
      marginTop: desktop ? "" : String(mobileTitleMarginTop) + ea,
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
      textAlign: desktop ? "left" : "center",
    }
  });

  createNode({
    mother: descriptionTong,
    text: desktop ? contents.description.join("\n") : contents.description.join(" "),
    style: {
      display: "block",
      fontSize: String(descriptionSize) + ea,
      fontWeight: String(descriptionWeight),
      color: colorChip.black,
      lineHeight: String(descriptionLineHeight),
      textAlign: desktop ? "left" : "center",
      width: desktop ? "" : withOut(mobileDescriptionMarginLeft * 2, ea),
      marginLeft: desktop ? "" : String(mobileDescriptionMarginLeft) + ea,
    },
    bold: {
      fontSize: String(descriptionSize) + ea,
      fontWeight: String(descriptionBoldWeight),
      color: colorChip.black,
    }
  });


}

MiniProposalJs.prototype.insertSecondBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing, autoComma, blankHref, ajaxJson } = GeneralJs;
  const { client, ea, media, osException, testMode, user } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
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
    let concept;
    let proposal;
    let photo;
    let list;
    let conceptImages;
    let proposalImages;
    let photoImages;
    let slide;
    let description;
    let image;
    let userBlock;
    let userBlockTong;
    let userBlockPadding;
    let userBlockInnerPadding;
    let userBlockInnerPaddingTop;
    let userBlockMinHeight;
    let userBlockSize, userBlockWeight, userBlockLineHeight;

    basePadding = <%% 150, 120, 105, 90, 12 %%>;

    bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
    margin = <%% 56, 52, 44, 32, 4 %%>;

    titleTextTitleWidth = <%% 340, 280, 250, 200, 29 %%>;
    titleTextTongHeight = <%% (isMac() ? 85 : 81), (isMac() ? 85 : 81), (isMac() ? 80 : 77), (isMac() ? 75 : 73), 10 %%>;

    titleTextTitleSize = <%% 26, 26, 24, 20, 4 %%>;
    titleTextTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
    titleTextTitleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

    titleTextDescriptionSize = <%% 14, 14, 14, 13, 3 %%>;
    titleTextDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
    titleTextDescriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
    titleTextDescriptionLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.6 %%>;
    titleTextDescriptionPaddingTop = <%% 3, 3, 3, 2, 0.2 %%>;

    topBottomVisualMargin = <%% 8, 8, 4, 0, -2 %%>;

    grayTitleSize = <%% 22, 22, 20, 17, 4 %%>;
    grayTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
    grayTitleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
    grayTitlePadding = <%% 20, 20, 20, 16, 4 %%>;
    grayTitleLineTop = <%% (isMac() ? 15 : 12), (isMac() ? 15 : 12), (isMac() ? 14 : 12), (isMac() ? 11 : 9), 2.5 %%>;

    collageSlideBetween = <%% 12, 12, 12, 12, 2 %%>;
    collageInnerMargin = <%% 24, 24, 24, 24, 3 %%>;

    collageDescriptionBoxMarginLeft = <%% 60, 45, 35, 24, 3 %%>;
    collageDescriptionBoxMarginTop = <%% 72, 72, 56, 32, 5 %%>;
    collageDescriptionBoxMarginBottom = <%% 80, 80, 60, 32, 5 %%>;

    collageDescriptionBoxTitleAreaWidth = <%% 180, 180, 160, 140, 88 %%>;

    collageDescriptionBoxTitleSize = <%% 16, 16, 15, 13, 3.2 %%>;
    collageDescriptionBoxTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
    collageDescriptionBoxTitleLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

    collageDescriptionBoxDescriptionSize = <%% 14, 14, 13, 12, 3 %%>;
    collageDescriptionBoxDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
    collageDescriptionBoxDescriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

    whiteTongMarginTop = <%% 32, 32, 32, 20, 5 %%>;
    whiteTongMarginBottom = <%% 72, 72, 60, 45, 9 %%>;
    whiteTongMarginBottomFinal = <%% 32, 32, 32, 8, 2.5 %%>;

    referencePhotoBetween = <%% 10, 10, 8, 8, 1 %%>;

    tableInnerMargin = <%% 54, 45, 30, 20, 0 %%>;
    tableInnerMarginTop = <%% 42, 42, 20, 12, 0 %%>;

    tableFactorTextTop = <%% (isMac() ? -2 : -1), (isMac() ? -2 : -1), (isMac() ? -2 : -1), (isMac() ? -2 : -1), -0.3 %%>;
    tableFactorSize = <%% 14, 13, 12, 11, 2.5 %%>;
    tableFactorWeight = <%% 400, 400, 400, 400, 400 %%>;
    tableColumnWeight = <%% 700, 700, 700, 700, 700 %%>;

    tableFactorHeight = <%% 100, 90, 80, 50, 12 %%>;
    tableColumnHeight = <%% 45, 45, 40, 35, 6 %%>;

    userBlockPadding = <%% 16, 16, 16, 16, 2 %%>;
    userBlockInnerPadding = <%% 30, 30, 25, 25, 3 %%>;
    userBlockInnerPaddingTop = <%% 23, 23, 19, 19, 2 %%>;
    userBlockMinHeight = <%% 200, 200, 180, 150, 36 %%>;

    userBlockSize = <%% 16, 16, 15, 14, 3 %%>;
    userBlockWeight = <%% 400, 400, 400, 400, 400 %%>;
    userBlockLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

    tableColumnsWidth = [
      <&& 120 | 90 | 75 | 50 | 12 &&>,
      <&& 150 | 100 | 95 | 80 | 15 &&>,
      <&& 100 | 60 | 45 | 30 | 10 &&>,
      <&& 100 | 80 | 70 | 60 | 10 &&>,
      <&& 100 | 80 | 70 | 60 | 10 &&>,
      <&& 100 | 80 | 70 | 60 | 14 &&>,
      <&& 270 | 180 | 155 | 130 | 32 &&>,
      <&& 120 | 90 | 80 | 70 | 12 &&>,
      <&& 120 | 90 | 80 | 70 | 10 &&>,
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

    if (mobile) {
      tableColumnsWidth.splice(3, 2);
      tableColumnsName.splice(3, 2);
      tableColumnsFactor.splice(3, 2);

      tableColumnsWidth.splice(1, 1);
      tableColumnsName.splice(1, 1);
      tableColumnsFactor.splice(1, 1);

      tableColumnsWidth.splice(4, 1);
      tableColumnsName.splice(4, 1);
      tableColumnsFactor.splice(4, 1);
    }

    contents = {
      title: [
        desktop ? "공간별 디자인 시안과" : "디자인 시안과",
        "제품 리스트",
      ],
      description: [
        <&& "고객님 공간에 딱 맞는 홈리에종 미니 스타일링안을 드립니다. <b%디자인 시안은 무드 보드와 제품 리스트로 제공되며,%b>" | "고객님 공간에 딱 맞는 홈리에종 미니 스타일링안을 드립니다. <b%디자인 시안은 무드 보드와 제품 리스트로 제공되며,%b>" | "고객님 공간에 맞는 홈리에종 스타일링안을 드립니다. <b%시안은 무드 보드와 제품 리스트로 제공되며,%b>" | "고객님 공간에 맞는 스타일링안을 드립니다. <b%시안은 무드 보드와 제품 리스트로 제공되며,%b>" | "고객님께 맞는 스타일링안을 드립니다. <b%무드 보드와 제품 리스트로 제공되며,%b>" &&>,
        <&& "자세한 상품 정보와 구입처를 통해 구매하신 뒤, 무드 보드를 참고하셔서 배치 및 설치를 진행해주시면 됩니다." | "자세한 상품 정보와 구입처를 통해 구매하신 뒤, 무드 보드를 참고하셔서 배치 및 설치를 진행해주시면 됩니다." | "자세한 정보와 구입처를 통해 구매하신 뒤, 무드 보드를 참고하셔서 배치를 진행해주시면 됩니다." | "정보와 구입처를 통해 구매하신 뒤, 무드 보드를 참고하셔서 배치를 진행해주시면 됩니다." | "구입처를 통해 구매하신 뒤, 무드 보드를 보며 배치해주시면 됩니다." &&>,
        <&& "수정 사항은 별도로 제공되지 않으며 기타 문의 사항이 있을시, 하단 채팅 기능을 통해 홈리에종으로 문의해주시길 바랍니다!" | "수정 사항은 별도로 제공되지 않으며 기타 문의 사항이 있을시, 하단 채팅 기능을 통해 홈리에종으로 문의해주시길 바랍니다!" | "수정은 별도로 제공되지 않으며 문의가 있을 시, 채팅을 통해 홈리에종으로 문의해주시길 바랍니다!" | "수정은 제공되지 않으며 문의가 있을 시, 채팅을 통해 홈리에종으로 문의해주시길 바랍니다!" | "\n수정은 제공되지 않으며 별도 문의는 홈리에종으로 문의주시길 바랍니다!" &&>,
      ],
      proposal: {
        collage: {
          title: "무드보드와 콜라주",
          sub: "디자인 시안 설명",
        },
        reference: {
          title: "참고 사진",
        },
        table: {
          title: "제품 리스트",
        }
      },
      review: {
        title: <&& "고객님의 디자인 리뷰" | "고객님의 디자인 리뷰" | "고객님의 디자인 리뷰" | "디자인 리뷰" | "고객님의 디자인 리뷰" &&>,
        description: "디자이너와 홈리에종에게 전달할 리뷰를 남겨주세요!"
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

    // white info
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
        marginLeft: String((desktop ? margin : 6)) + ea,
        width: withOut((desktop ? margin : 6) * 2, ea),
        height: desktop ? String(titleTextTongHeight) + ea : "",
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
      text: desktop ? contents.description.join("\n") : contents.description.join(" "),
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

    // gray proposal
    for (let index = 0; index < user.response.design[0].concept.length; index++) {

      concept = user.response.design[0].concept[index];
      proposal = user.response.design[0].proposal[index];
      photo = user.response.design[0].photo[index];
      list = user.response.design[0].list[index];

      conceptImages = await ajaxJson({ key: concept.key }, BRIDGEHOST + "/userKey", { equal: true });
      conceptImages = conceptImages.list.map((path) => { return BRIDGEHOST.replace(/\:3000/g, '') + path });

      proposalImages = await ajaxJson({ key: proposal.key }, BRIDGEHOST + "/userKey", { equal: true });
      proposalImages = proposalImages.list.map((path) => { return BRIDGEHOST.replace(/\:3000/g, '') + path });

      photoImages = await ajaxJson({ key: photo.key }, BRIDGEHOST + "/userKey", { equal: true });
      photoImages = photoImages.list.map((path) => { return BRIDGEHOST.replace(/\:3000/g, '') + path });

      slide = conceptImages.concat(proposalImages);

      description = "";
      description += concept.comments.designer + "\n\n";
      description += proposal.comments.designer + "\n\n";
      description += photo.comments.designer;
      description = description.trim();

      // gray
      grayBlock = createNode({
        mother: baseTongClone,
        style: {
          position: "relative",
          borderRadius: String(8) + "px",
          width: String(100) + '%',
          paddingTop: String(desktop ? margin - topBottomVisualMargin : margin - topBottomVisualMargin + 1) + ea,
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
          paddingTop: String(desktop ? collageInnerMargin : collageInnerMargin + 1) + ea,
          paddingBottom: String(collageInnerMargin) + ea,
          paddingLeft: String(collageInnerMargin) + ea,
          paddingRight: String(collageInnerMargin) + ea,
          borderRadius: String(8) + "px",
          marginTop: String(whiteTongMarginTop) + ea,
          marginBottom: String(whiteTongMarginBottom) + ea,
        }
      });

      for (let i = 0; i < slide.length; i++) {
        createNode({
          mother: collageWhiteTong,
          mode: "img",
          attribute: {
            src: slide[i],
          },
          style: {
            display: "block",
            position: "relative",
            width: String(100) + '%',
            marginBottom: String(collageSlideBetween) + ea,
            borderRadius: String(5) + "px",
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
          display: desktop ? "inline-block" : "block",
          width: desktop ? String(collageDescriptionBoxTitleAreaWidth) + ea : String(100) + '%',
          fontSize: String(collageDescriptionBoxTitleSize) + ea,
          fontWeight: String(collageDescriptionBoxTitleWeight),
          color: colorChip.black,
          lineHeight: String(collageDescriptionBoxTitleLineHeight),
          verticalAlign: "top",
        }
      });
      createNode({
        mother: collageDescriptionBox,
        text: description,
        style: {
          display: desktop ? "inline-block" : "block",
          width: desktop ? withOut(collageDescriptionBoxTitleAreaWidth, ea) : String(100) + '%',
          fontSize: String(collageDescriptionBoxDescriptionSize) + ea,
          fontWeight: String(collageDescriptionBoxDescriptionWeight),
          color: colorChip.black,
          lineHeight: String(collageDescriptionBoxTitleLineHeight),
          verticalAlign: "top",
          marginTop: desktop ? "" : String(collageDescriptionBoxMarginLeft) + ea,
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
      for (let i = 0; i < photoImages.length; i++) {
        createNode({
          mother: referencePhotoTong,
          mode: "img",
          attribute: {
            src: photoImages[i]
          },
          style: {
            display: "inline-block",
            position: "relative",
            width: desktop ? "calc(calc(100% - " + String(referencePhotoBetween * (photoImages.length - 1)) + ea + ") / " + String(photoImages.length) + ")" : "calc(calc(100% - " + String(referencePhotoBetween) + ea + ") / 2)",
            marginRight: desktop ? String(i === photoImages.length - 1 ? 0 : referencePhotoBetween) + ea : String(i % 2 === 0 ? referencePhotoBetween : 0) + ea,
            marginBottom: desktop ? "" : String(referencePhotoBetween) + ea,
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
          background: desktop ? colorChip.white : "transparent",
          boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : 0,
          paddingTop: String(tableInnerMarginTop) + ea,
          paddingBottom: String(tableInnerMargin) + ea,
          paddingLeft: String(tableInnerMargin) + ea,
          paddingRight: String(tableInnerMargin) + ea,
          borderRadius: String(8) + "px",
          marginTop: String(desktop ? whiteTongMarginTop : whiteTongMarginTop - 1) + ea,
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
      for (let i = 0; i < list.detail.length; i++) {
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

      for (let i = 0; i < list.detail.length; i++) {
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
                src: window.decodeURIComponent(tableColumnsFactor[j].source(list.detail[i])),
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
              text: tableColumnsFactor[j].source(list.detail[i]),
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
              text: String(tableColumnsFactor[j].source(list.detail[i])),
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
              text: autoComma(tableColumnsFactor[j].source(list.detail[i])) + '원',
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
              attribute: {
                j: String(j),
                i: String(i),
              },
              text: "Link",
              event: {
                click: function (e) {
                  const j = Number(this.getAttribute('j'));
                  const i = Number(this.getAttribute('i'));
                  blankHref(window.decodeURIComponent(tableColumnsFactor[j].source(list.detail[i])));
                }
              },
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

    // user comments
    userBlock = createNode({
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
    userBlockTong = createNode({
      mother: userBlock,
      style: {
        display: "block",
        position: "relative",
        marginLeft: String((desktop ? margin : 6)) + ea,
        width: withOut((desktop ? margin : 6) * 2, ea),
      },
      children: [
        {
          text: contents.review.title,
          style: {
            display: desktop ? "inline-block" : "block",
            position: "relative",
            width: desktop ? String(titleTextTitleWidth) + ea : "",
            fontSize: String(titleTextTitleSize) + ea,
            fontWeight: String(titleTextTitleWeight),
            color: colorChip.black,
            lineHeight: String(titleTextTitleLineHeight),
            verticalAlign: "top",
            marginBottom: desktop ? "" : String(2.5) + ea,
          }
        }
      ]
    });
    createNode({
      mother: userBlockTong,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        width: withOut((desktop ? titleTextTitleWidth : 0) + (userBlockPadding * 2), ea),
        borderRadius: String(5) + "px",
        background: colorChip.gray1,
        verticalAlign: "top",
        paddingTop: String(userBlockPadding) + ea,
        paddingBottom: String(userBlockPadding) + ea,
        paddingLeft: String(userBlockPadding) + ea,
        paddingRight: String(userBlockPadding) + ea,
        minHeight: String(userBlockMinHeight) + ea,
      },
      children: [
        {
          style: {
            display: "block",
            width: withOut(userBlockInnerPadding * 2, ea),
            minHeight: String(userBlockMinHeight) + ea,
            background: colorChip.white,
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            paddingTop: String(userBlockInnerPaddingTop) + ea,
            paddingLeft: String(userBlockInnerPadding) + ea,
            paddingRight: String(userBlockInnerPadding) + ea,
            paddingBottom: String(userBlockInnerPadding) + ea,
          },
          children: [
            {
              mode: "textarea",
              text: instance.user.response.design[0].concept[0].comments.client,
              attribute: {
                placeholder: contents.review.description,
              },
              event: {
                blur: async function (e) {
                  try {
                    let whereQuery, updateQuery;

                    this.value = this.value.trim();

                    whereQuery = { useid: instance.user.useid };
                    updateQuery = {};
                    updateQuery["response.design.0.concept.0.comments.client"] = this.value.replace(/[\&\=\+]/gi, '');

                    await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/updateUser");

                  } catch (e) {
                    window.alert("오류가 발생하였습니다! 다시 시도해주세요.");
                  }
                }
              },
              style: {
                display: "block",
                width: String(100) + '%',
                minHeight: String(userBlockMinHeight) + ea,
                outline: String(0),
                border: String(0),
                fontSize: String(userBlockSize) + ea,
                fontWeight: String(userBlockWeight),
                lineHeight: String(userBlockLineHeight),
                color: colorChip.black,
                background: "transparent",
              }
            }
          ]
        }
      ]
    });

  } catch (e) {
    console.log(e);
    // window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
    // window.location.reload();
  }
}

MiniProposalJs.prototype.whiteReviewEvent = function () {
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
    let ratingContents;
    let ratingBlock;
    let ratingWeight;
    let ratingSize;
    let ratingBarTop;
    let ratingBarHeight;
    let ratingTextTop;
    let questionContents;
    let descriptionSize, descriptionLineHeight, descriptionMarginTop, descriptionPaddingBottom;
    let num, num2;

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
    blockMarginBottom = <%% 12, 12, 9, 9, 1 %%>;

    mainSize = <%% 20, 18, 17, 16, 3.5 %%>;
    mainWeight = <%% 500, 500, 500, 500, 500 %%>;
    mainTop = <%% (isMac() ? 0 : 3), (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 4), 0.9 %%>;
    inputSize = <%% 13, 13, 12, 12, 3 %%>;
    inputWeight = <%% 400, 400, 400, 400, 400 %%>;
    inputIndent = <%% 10, 10, 10, 10, 2.5 %%>;

    leftGrayType0 = <%% 101, 90, 78, 78, 18 %%>;
    leftGrayType1 = <%% 418, 361, 318, 96, 22.8 %%>;
    leftGrayType2 = <%% 125, 112, 98, 98, 22.8 %%>;
    leftGrayType3 = <%% 164, 151, 130, 129, 30.5 %%>;

    widthGrayType0 = <%% 160, 140, 130, 150, 34 %%>;
    widthGrayType1 = <%% 455, 329, 283, 403, 58 %%>;
    widthGrayType2 = <%% 757, 588, 503, 383, 53.2 %%>;
    widthGrayType3 = <%% 392, 268, 231, 352, 45.5 %%>;

    addressWidth = <%% 54, 54, 46, 46, 11 %%>;
    addressSize = <%% 13, 13, 12, 12, 3 %%>;
    addressWeight = <%% 600, 600, 600, 600, 600 %%>;
    addressTop = <%% (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), 1.2 %%>;

    marginRatio = <%% 0.8, 0.8, 0.7, 0.6, 0.7 %%>;

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

    paymentButtonSize = <%% 16, 16, 16, 16, 3.2 %%>;
    paymentButtonWeight = <%% 600, 600, 600, 600, 600 %%>;
    paymentButtonTop = <%% 12, 12, 12, 12, 3 %%>;
    paymentButtonPaddingTop = <%% (isMac() ? 8 : 10), (isMac() ? 8 : 10), (isMac() ? 8 : 10), (isMac() ? 8 : 10), 2 %%>;
    paymentButtonPaddingBottom = <%% (isMac() ? 10 : 9), (isMac() ? 10 : 9), (isMac() ? 10 : 9), (isMac() ? 10 : 9), 2.5 %%>;
    paymentButtonPaddingLeft = <%% 18, 18, 18, 18, 3.5 %%>;

    addressPromptWidth = <%% 600, 600, 600, 600, 80 %%>;
    addressPromptHeight = <%% 450, 450, 450, 450, 90 %%>;

    ratingWeight = <%% 800, 800, 800, 800, 800 %%>;
    ratingSize = <%% 14, 14, 13, 12, 2.6 %%>;
    ratingBarTop = <%% 24, 24, 24, 24, 4.7 %%>;
    ratingBarHeight = <%% 9, 9, 8, 7, 2.3 %%>;
    ratingTextTop = <%% (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), 0 %%>;

    descriptionSize = <%% 15, 15, 15, 15, 3 %%>;
    descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
    descriptionMarginTop = <%% 10, 10, 10, 10, 2.5 %%>;
    descriptionPaddingBottom = <%% 22, 22, 22, 22, 4.5 %%>;

    ratingContents = [
      {
        text: <&& "부족하다" | "부족하다" | "부족하다" | "부족하다" | "부족하다" &&>,
        left: <&& 45 | 45 | 35 | 18 | 2.5 &&>,
        width: <&& 69 | 69 | 57 | 38 | 6.8 &&>,
        text2: <&& "매우 아니다" | "매우 아니다" | "매우 아니다" | "매우 아니다" | "매우 아니다" &&>,
        left2: <&& 39 | 39 | 29 | 12 | 1.2 &&>,
      },
      {
        text: <&& "보통이다" | "보통이다" | "보통이다" | "보통이다" | "보통이다" &&>,
        left: <&& 221 | 221 | 169 | 127 | 18 &&>,
        width: <&& 174 | 174 | 133 | 108 | 15.5 &&>,
        text2: <&& "아니다" | "아니다" | "아니다" | "아니다" | "아니다" &&>,
        left2: <&& 226 | 226 | 174 | 132 | 19.3 &&>,
      },
      {
        text: <&& "괜찮은 것 같다" | "괜찮은 것 같다" | "괜찮은 것 같다" | "괜찮은 것 같다" | "괜찮다" &&>,
        left: <&& 394 | 394 | 304 | 237 | 34 &&>,
        width: <&& 187 | 187 | 146 | 120 | 14.5 &&>,
        text2: <&& "보통이다" | "보통이다" | "보통이다" | "보통이다" | "보통이다" &&>,
        left2: <&& 408 | 408 | 315 | 247 | 33 &&>,
      },
      {
        text: <&& "만족스럽다" | "만족스럽다" | "만족스럽다" | "만족스럽다" | "만족스럽다" &&>,
        left: <&& 579 | 579 | 446 | 355 | 47 &&>,
        width: <&& 175 | 175 | 134 | 111 | 14.7 &&>,
        text2: <&& "그렇다" | "그렇다" | "그렇다" | "그렇다" | "그렇다" &&>,
        left2: <&& 589 | 589 | 456 | 364 | 48.8 &&>,
      },
      {
        text: <&& "매우 만족스럽다" | "매우 만족스럽다" | "매우 만족스럽다" | "매우 만족스럽다" | "훌륭하다" &&>,
        left: <&& 756 | 756 | 574 | 459 | 65 &&>,
        width: <&& 190 | 190 | 140 | 113 | 16.8 &&>,
        text2: <&& "매우 그렇다" | "매우 그렇다" | "매우 그렇다" | "매우 그렇다" | "매우 그렇다" &&>,
        left2: <&& 768 | 768 | 585 | 467 | 64 &&>,
      }
    ];

    questionContents = {
      homeliaison: {
        title: "Homeliaison / 프로젝트 케어 만족도",
        description: (desktop ? [
          "전체 프로젝트를 진행하는 전 단계에서 Homeliaison이 담당한 과정에 대한 만족도 설문입니다.",
          "각 설문 내용에 솔직하게 답변 해 주시면 감사하겠습니다."
        ] : [
          "전체 프로젝트를 진행하는 전 단계에서",
          "Homeliaison이 담당한 과정에 대한 만족도 설문입니다.",
          "각 설문 내용에 솔직하게 답변 해 주시면 감사하겠습니다."
        ]),
        object: [
          {
            question: "스타일링 서비스를 제공 받고 만족하셨나요?",
            type: 0,
          },
          {
            question: "각 단계별 진행을 위한 안내가 잘 되었나요?",
            type: 0,
          },
          {
            question: "문의에 대한 처리가 원활하게 이루어졌나요?",
            type: 0,
          },
          {
            question: "서비스에 대해 지인 또는 가족이 궁금해한 적이 있나요?",
            type: 1,
          },
          {
            question: "서비스를 추천하실 의향이 있나요?",
            type: 1,
          },
        ],
        subject: [
          {
            question: "추천 또는 추천하시지 않는다면, 이유가 있나요?",
            placeholder: "추천 또는 추천하시지 않는 이유를 알려주세요!",
          }
        ]
      },
      designer: {
        title: "Designer / 프로젝트 케어 만족도",
        description: (desktop ? [
          "전체 프로젝트를 진행하는 전 단계에서 디자이너가 담당한 과정에 대한 만족도 설문입니다.",
          "각 설문 내용에 솔직하게 답변 해 주시면 감사하겠습니다."
        ] : [
          "전체 프로젝트를 진행하는 전 단계에서",
          "디자이너가 담당한 과정에 대한 만족도 설문입니다.",
          "각 설문 내용에 솔직하게 답변 해 주시면 감사하겠습니다."
        ]),
        object: [
          {
            question: "시행 전 안내받은 내용과 서비스 퀄리티가 일치했나요?",
            type: 0,
          },
          {
            question: "제공받은 제안서는 설명받은 내용과 일치했나요?",
            type: 0,
          },
          {
            question: "우리집의 무드가 이전과 다르게 확실히 변화되었나요?",
            type: 1,
          },
        ],
        subject: [
          {
            question: "진행 중 부족했던 점이 있다면 무엇일까요?",
            placeholder: "프로젝트 진행 중 부족했던 점, 혹은 어떻게 개선하면 좋을지에 대해 알려주세요!",
          }
        ]
      }
    }

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
          text: "Mini 서비스 리뷰",
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

    // homeliaison description
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
      },
      children: [
        {
          text: questionContents.homeliaison.title,
          style: {
            display: "block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(800),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          text: questionContents.homeliaison.description.join("\n"),
          style: {
            display: "block",
            position: "relative",
            marginTop: String(descriptionMarginTop) + ea,
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            lineHeight: String(descriptionLineHeight),
            verticalAlign: "top",
            paddingBottom: String(descriptionPaddingBottom) + ea,
          }
        },
      ]
    });

    // homeliaison question
    num = 0;
    for (let { question, type } of questionContents.homeliaison.object) {
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
            text: question,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(mainTop) + ea,
              fontSize: String(mainSize) + ea,
              fontWeight: String(mainWeight),
              color: colorChip.black,
              verticalAlign: "top",
            }
          }
        ]
      });
      ratingBlock = createNode({
        mother: formBox,
        class: [ inputClassName ],
        attribute: {
          question: question.replace(/\"/gi, "'"),
          kind: "homeliaison",
          index: String(num),
        },
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(blockMarginBottom) + ea,
          height: String(moduleHeight) + ea,
        },
        children: [
          {
            style: {
              display: "block",
              position: "absolute",
              borderBottom: "1px solid " + colorChip.gray3,
              width: withOut(0, ea),
              height: String(moduleHeight) + ea,
              top: String(0),
              left: String(0),
            }
          }
        ]
      });
      num2 = 0;
      for (let { text, left, width, text2, left2 } of ratingContents) {
        createNode({
          mother: ratingBlock,
          text: type === 0 ? text : text2,
          attribute: {
            toggle: "off",
            target: "true",
            value: (type === 0 ? text : text2),
            strength: String(num2 + 1),
          },
          event: {
            click: function (e) {
              const mother = this.parentNode;
              const targets = [ ...mother.children ].filter((dom) => { return dom.getAttribute("target") === "true"; });
              for (let dom of targets) {
                if (dom === this) {
                  dom.style.color = colorChip.green;
                  dom.setAttribute("toggle", "on");
                } else {
                  dom.style.color = colorChip.gray3;
                  dom.setAttribute("toggle", "off");
                }
              }
            }
          },
          style: {
            position: "absolute",
            fontWeight: String(ratingWeight),
            fontSize: String(ratingSize) + ea,
            color: colorChip.deactive,
            top: String(ratingTextTop) + ea,
            left: String(type === 0 ? left : left2) + ea,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }
        });
        createNode({
          mother: ratingBlock,
          style: {
            display: "inline-block",
            position: "relative",
            top: String(ratingBarTop) + ea,
            width: String(width) + ea,
            height: String(ratingBarHeight) + ea,
            borderRight: "1px solid " + colorChip.gray3,
            transition: "all 0.2s ease",
          }
        });
        num2++;
      }
      createNode({
        mother: formBox,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(blockMarginBottom) + ea,
          height: String(moduleHeight * marginRatio) + ea,
        }
      });
      num++;
    }

    num = 0;
    for (let { question, placeholder } of questionContents.homeliaison.subject) {
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
            text: question,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(mainTop) + ea,
              fontSize: String(mainSize) + ea,
              fontWeight: String(mainWeight),
              color: colorChip.black,
              verticalAlign: "top",
            }
          }
        ]
      });

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
              position: "absolute",
              top: String(grayTextAreaTop) + ea,
              left: String(0) + ea,
              width: String(100) + '%',
              height: String(grayBigHeight) + ea,
              background: colorChip.gray1,
              borderRadius: String(3) + "px",
            }
          },
          {
            mode: "textarea",
            class: [ inputClassName ],
            attribute: {
              question: question,
              placeholder: placeholder,
              property: "etc",
              kind: "homeliaison",
              index: String(num),
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
              left: String(textareaLeft) + ea,
              width: withOut((textareaLeft * 2), ea),
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
      num++;
    }

    // margin
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });

    // designer description
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
      },
      children: [
        {
          text: questionContents.designer.title,
          style: {
            display: "block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(800),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          text: questionContents.designer.description.join("\n"),
          style: {
            display: "block",
            position: "relative",
            marginTop: String(descriptionMarginTop) + ea,
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            lineHeight: String(descriptionLineHeight),
            verticalAlign: "top",
            paddingBottom: String(descriptionPaddingBottom) + ea,
          }
        },
      ]
    });

    // designer question
    num = 0;
    for (let { question, type } of questionContents.designer.object) {
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
            text: question,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(mainTop) + ea,
              fontSize: String(mainSize) + ea,
              fontWeight: String(mainWeight),
              color: colorChip.black,
              verticalAlign: "top",
            }
          }
        ]
      });
      ratingBlock = createNode({
        mother: formBox,
        class: [ inputClassName ],
        attribute: {
          question: question.replace(/\"/gi, "'"),
          kind: "designer",
          index: String(num),
        },
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(blockMarginBottom) + ea,
          height: String(moduleHeight) + ea,
        },
        children: [
          {
            style: {
              display: "block",
              position: "absolute",
              borderBottom: "1px solid " + colorChip.gray3,
              width: withOut(0, ea),
              height: String(moduleHeight) + ea,
              top: String(0),
              left: String(0),
            }
          }
        ]
      });
      num2 = 0;
      for (let { text, left, width, text2, left2 } of ratingContents) {
        createNode({
          mother: ratingBlock,
          text: type === 0 ? text : text2,
          attribute: {
            toggle: "off",
            target: "true",
            value: (type === 0 ? text : text2),
            strength: String(num2 + 1),
          },
          event: {
            click: function (e) {
              const mother = this.parentNode;
              const targets = [ ...mother.children ].filter((dom) => { return dom.getAttribute("target") === "true"; });
              for (let dom of targets) {
                if (dom === this) {
                  dom.style.color = colorChip.green;
                  dom.setAttribute("toggle", "on");
                } else {
                  dom.style.color = colorChip.gray3;
                  dom.setAttribute("toggle", "off");
                }
              }
            }
          },
          style: {
            position: "absolute",
            fontWeight: String(ratingWeight),
            fontSize: String(ratingSize) + ea,
            color: colorChip.deactive,
            top: String(ratingTextTop) + ea,
            left: String(type === 0 ? left : left2) + ea,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }
        });
        createNode({
          mother: ratingBlock,
          style: {
            display: "inline-block",
            position: "relative",
            top: String(ratingBarTop) + ea,
            width: String(width) + ea,
            height: String(ratingBarHeight) + ea,
            borderRight: "1px solid " + colorChip.gray3,
            transition: "all 0.2s ease",
          }
        });
        num2++;
      }
      createNode({
        mother: formBox,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(blockMarginBottom) + ea,
          height: String(moduleHeight * marginRatio) + ea,
        }
      });
      num++;
    }

    num = 0;
    for (let { question, placeholder } of questionContents.designer.subject) {
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
            text: question,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(mainTop) + ea,
              fontSize: String(mainSize) + ea,
              fontWeight: String(mainWeight),
              color: colorChip.black,
              verticalAlign: "top",
            }
          }
        ]
      });

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
              position: "absolute",
              top: String(grayTextAreaTop) + ea,
              left: String(0) + ea,
              width: String(100) + '%',
              height: String(grayBigHeight) + ea,
              background: colorChip.gray1,
              borderRadius: String(3) + "px",
            }
          },
          {
            mode: "textarea",
            class: [ inputClassName ],
            attribute: {
              question: question,
              placeholder: placeholder,
              property: "etc",
              kind: "designer",
              index: String(num),
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
              left: String(textareaLeft) + ea,
              width: withOut((textareaLeft * 2), ea),
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
      num++;
    }

    // margin
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });
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
      text: "제출하기",
      event: {
        click: async function (e) {
          try {
            const targets = [ ...document.querySelectorAll('.' + inputClassName) ];
            const objectTargets = targets.filter((dom) => { return !/TEXTAREA/gi.test(dom.nodeName); });
            const subjectTargets = targets.filter((dom) => { return /TEXTAREA/gi.test(dom.nodeName); });
            let valueTong;
            let tempObj;
            let value;
            let whereQuery, updateQuery;

            valueTong = {
              object: [],
              subject: []
            };

            objectTargets.forEach((dom) => {
              tempObj = {};
              tempObj.question = dom.getAttribute("question");
              tempObj.answer = [ ...dom.children ].filter((d) => { return d.getAttribute("target") === "true" }).filter((d) => { return d.getAttribute("toggle") === "on" });
              if (tempObj.answer.length === 0) {
                tempObj.answer = "모르겠다(0)";
              } else {
                tempObj.answer = tempObj.answer[0].getAttribute("value") + "(" + tempObj.answer[0].getAttribute("strength") + ")";
              }
              tempObj.kind = dom.getAttribute("kind");
              tempObj.index = Number(dom.getAttribute("index"));
              valueTong.object.push(tempObj);
            });

            subjectTargets.forEach((dom) => {
              tempObj = {};
              tempObj.question = dom.getAttribute("question");
              tempObj.answer = dom.value.trim();
              tempObj.kind = dom.getAttribute("kind");
              tempObj.index = Number(dom.getAttribute("index"));
              valueTong.subject.push(tempObj);
            });

            valueTong.object.sort((a, b) => { return a.index - b.index });
            valueTong.subject.sort((a, b) => { return a.index - b.index });

            value = [];
            value.push("홈리에종에 대한 설문");
            value.push("");
            for (let { question, answer, kind } of valueTong.object) {
              if (kind === "homeliaison") {
                value.push("Q. " + question);
                value.push("A. " + answer);
                value.push("");
              }
            }
            for (let { question, answer, kind } of valueTong.subject) {
              if (kind === "homeliaison") {
                value.push("Q. " + question);
                value.push("A. " + answer);
                value.push("");
              }
            }
            value.push("__split__");
            value.push("");
            value.push("디자이너에 대한 설문");
            value.push("");
            for (let { question, answer, kind } of valueTong.object) {
              if (kind === "designer") {
                value.push("Q. " + question);
                value.push("A. " + answer);
                value.push("");
              }
            }
            for (let { question, answer, kind } of valueTong.subject) {
              if (kind === "designer") {
                value.push("Q. " + question);
                value.push("A. " + answer);
                value.push("");
              }
            }

            whereQuery = { useid: instance.user.useid };
            updateQuery = {};
            updateQuery["response.design.0.proposal.0.comments.client"] = value.join("\n").replace(/[\&\=\+\{\}\[\]\#]/gi, '').trim();

            await ajaxJson({ whereQuery, updateQuery }, "/updateUser");

            window.alert("설문 작성이 완료되었습니다! 감사합니다 :)");
            window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?useid=" + instance.user.useid;

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

MiniProposalJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);
    const { returnGet, ajaxJson, requestPromise, setDebounce } = GeneralJs;
    const getObj = returnGet();
    let users, user;

    if (getObj.useid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    users = await ajaxJson({ whereQuery: { useid: getObj.useid } }, BACKHOST + "/getUsers", { equal: true });
    if (users.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    user = users[0];
    this.user = user;

    document.head.insertAdjacentHTML("beforeend", `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`);
    document.head.insertAdjacentHTML("beforeend", `<meta name="referrer" content="no-referrer" />`);

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "miniProposal",
      client: this.user,
      base: {
        instance: this,
        binaryPath: MiniProposalJs.binaryPath,
        subTitle: "디자인 제안",
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
          instance.insertCollageBox();
          instance.insertPhotoBox();
          await instance.insertSecondBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "MiniProposalJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    if (typeof getObj.reviewcard === "string") {
      this.whiteReviewEvent().call(this, {});
    }


  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "MiniProposalJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
