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

  margin = <%% 67, 67, 67, 67, 67 %%>;
  baseHeight = <%% 408, 408, 408, 408, 408 %%>;
  descriptionWidth = <%% 328, 328, 328, 328, 328 %%>;

  base = createNode({
    mother,
    style: {
      display: "block",
      position: "relative",
      background: colorChip.white,
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
      height: String(baseHeight) + ea,
      width: String(descriptionWidth) + ea,
      marginRight: String(margin) + ea,
    }
  });

  photoBox = createNode({
    mother: base,
    style: {
      display: "inline-block",
      position: "relative",
      height: String(baseHeight) + ea,
      width: withOut(descriptionWidth + margin, ea),
      background: colorChip.green,
      overflow: "hidden",
      borderTopLeftRadius: String(5) + "px",
      borderBottomLeftRadius: String(5) + "px",
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
