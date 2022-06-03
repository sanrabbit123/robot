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
  let descriptionBoxPaddingTop, descriptionBoxPaddingBottom, descriptionBoxPaddingLeft;
  let descriptionTextTong;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  topBottomVisualMargin = <%% 18, 16, 12, 10, 3 %%>;

  grayPaddingLeft = <%% 100, 64, 64, 64, 64 %%>;

  imageWidth = <%% 520, 520, 520, 520, 520 %%>;
  imageHeight = <%% 520, 520, 520, 520, 520 %%>;

  descriptionBoxPaddingTop = <%% 72, 72, 72, 72, 10 %%>;
  descriptionBoxPaddingBottom = <%% 72, 72, 72, 72, 10 %%>;
  descriptionBoxPaddingLeft = <%% 64, 64, 64, 64, 64 %%>;

  contents = {
    title: "콜라주 제공 안내",
    sub: "collage",
    description: [
      [
        "콜라주는 이미지 샘플로 구성된 시각적 표현",
        "방식입니다. 고객님 공간에 맞는 패브릭,",
        "액자, 소품을 조합하여 하나의 스타일을",
        "연출하는 용도로 만들어 집니다.",
      ],
      [
        "제품 리스트에 있는 모든 제품들이 조합",
        "되었을 때 어떤 분위기를 내는지, 어떻게",
        "배치되면 되는지를 알려드립니다.",
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
      display: "inline-block",
      position: "relative",
      marginLeft: String(descriptionBoxPaddingLeft) + ea,
      width: withOut(imageWidth + (descriptionBoxPaddingLeft * 2), ea),
      marginTop: String(descriptionBoxPaddingTop) + ea,
      marginBottom: String(descriptionBoxPaddingBottom) + ea,
      height: String(imageHeight - descriptionBoxPaddingTop - descriptionBoxPaddingBottom) + ea,
      verticalAlign: "top",
      background: "aqua"
    }
  });

  createNode({
    mother: descriptionBox,
    text: contents.title,
    style: {
      display: "block",
      position: "relative",
      textAlign: "left",
      fontSize: String(24) + ea,
      fontWeight: String(700),
      color: colorChip.black,
    }
  });

  descriptionTextTong = createNode({
    mother: descriptionBox,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    }
  });

  for (let i = 0; i < contents.description.length; i++) {
    createNode({
      mother: descriptionTextTong,
      style: {
        display: "inline-block",
        width: String(50) + '%',
        fontSize: String(14) + ea,
        fontWeight: String(400),
        color: colorChip.black,
      }
    })



  }




}

MiniProposalJs.prototype.insertPhotoBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let margin;
  let contents;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  contents = {
    title: "참고 사진 제공 안내",
    description: [
      "무드 보드와 함께 배치의 이해를 도울 수",
      "있도록 같은 컨셉의 인테리어 사진이 첨부될",
      "수 있습니다. 하지만 참고 사진은 제품의",
      "하나하나의 구성이 실제 무드 보드 / 제품",
      "리스트와 다를 수 있으며 컨셉만 같다는",
      "점을 유의하시길 바랍니다.",
    ]
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

}

MiniProposalJs.prototype.insertSecondBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let margin;
  let contents;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  contents = {
    title: [
      "공간별 디자인 시안과",
      "제품 리스트",
    ],
    description: [
      "고객님 공간에 딱 맞는 홈리에종 미니 스타일링안을 드립니다. 디자인 시안은 무드 보드와 제품 리스트로 제공되며,",
      "자세한 상품 정보와 구입처를 통해 구매하신 뒤, 무드 보드를 참고하셔서 배치 및 설치를 진행해주시면 됩니다.",
      "수정 사항은 별도로 제공되지 않으며 기타 문의 사항이 있을시, 하단 채팅 기능을 통해 홈리에종으로 문의해주시길 바랍니다!",
    ]
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

}

MiniProposalJs.prototype.insertProposalBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let margin;
  let contents;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  contents = {};

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
          instance.insertProposalBox();
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
