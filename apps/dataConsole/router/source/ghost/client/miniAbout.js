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
  let blockHeight, bottomMargin;

  blockHeight = <%% 1000, 326, 293, 246, 121 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;

  whiteBlock = createNode({
    mother: this.baseTong,
    attribute: {
      height: String(blockHeight)
    },
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      height: String(blockHeight) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  this.insertTitleBox(whiteBlock);
  this.insertStrongBox(whiteBlock);

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

  margin = <%% 67, 67, 67, 67, 67 %%>;
  baseHeight = <%% 408, 408, 408, 408, 408 %%>;
  descriptionWidth = <%% 328, 328, 328, 328, 328 %%>;

  descriptionBoxPaddingTop = <%% 78, 78, 78, 78, 78 %%>;

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
      fontSize: String(42) + ea,
      fontWeight: String(800),
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
      fontSize: String(15) + ea,
      fontWeight: String(400),
      fontFamily: "graphik",
      color: colorChip.black,
      textAlign: "right",
      marginTop: String(3) + ea,
      paddingRight: String(3) + ea,
    },
    children: [
      {
        style: {
          position: "absolute",
          width: String(54) + ea,
          height: String(0),
          borderBottom: "1.5px solid " + colorChip.gray3,
          top: String(10) + ea,
          right: String(136) + ea,
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
      fontSize: String(15) + ea,
      fontWeight: String(400),
      color: colorChip.black,
      lineHeight: String(1.66),
      marginTop: String(40) + ea,
      textAlign: "right",
    },
    bold: {
      fontWeight: String(700),
      color: colorChip.green,
    }
  });

  createNode({
    mother: descriptionBox,
    text: contents.below,
    style: {
      display: "block",
      position: "relative",
      fontSize: String(11) + ea,
      fontWeight: String(400),
      fontFamily: "graphik",
      color: colorChip.black,
      textAlign: "right",
      marginTop: String(94) + ea,
      paddingRight: String(3) + ea,
    },
    children: [
      {
        style: {
          position: "absolute",
          width: String(142) + ea,
          height: String(0),
          borderBottom: "1px solid " + colorChip.darkShadow,
          top: String(8) + ea,
          right: String(186) + ea,
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
      width: String(420) + ea,
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
      width: String(300) + ea,
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
      width: withOut(420 + 300, ea),
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
      fontSize: String(35) + ea,
      fontWeight: String(700),
      textAlign: "right",
      lineHeight: String(1.35),
      color: colorChip.white,
      bottom: String(50) + ea,
      right: String(50) + ea,
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
  let baseHeight;
  let descriptionWidth;
  let descriptionBox;
  let photoBox;
  let descriptionBoxPaddingTop;
  let contents;

  margin = <%% 67, 67, 67, 67, 67 %%>;
  baseHeight = <%% 408, 408, 408, 408, 408 %%>;
  descriptionWidth = <%% 328, 328, 328, 328, 328 %%>;

  descriptionBoxPaddingTop = <%% 82, 82, 82, 82, 82 %%>;

  base = createNode({
    mother,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      width: withOut(margin, ea),
      height: String(400) + ea,
      background: colorChip.gray2,
    }
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
