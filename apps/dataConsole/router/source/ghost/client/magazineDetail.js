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
      "return ('홈리에종 매거진 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 매거진 디테일 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "magazineDetail",
  "hangul": "매거진 상세",
  "route": [
    "magazineDetail"
  ]
} %/%/g

const MagazineDetailJs = function () {
  this.mother = new GeneralJs();
}

MagazineDetailJs.binaryPath = FRONTHOST + "/list_image/magaz";

MagazineDetailJs.prototype.magazineInitBox = function () {
  const instance = this;
  const { createNode, colorChip, withOut, svgMaker, isMac, isIphone } = GeneralJs;
  const { totalContents, naviHeight, ea, media } = this;
  const { contentsArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainHeight;
  let mainTong;
  let mainBelowBarHeight;
  let contentsBox;
  let pictureWidth, pictureHeight;
  let picture;
  let bottomVisual;
  let logoBottom, logoLeft, logoWidth;
  let wordingSize, wordingWeight;
  let wordingBottom, wordingLeft;
  let contents;

  ({ contents } = this.magazine);

  mainHeight = <%% 800, 750, 710, 590, (210 / 297) * 100 %%>;
  mainBelowBarHeight = <%% 250, 250, 250, 216, 250 %%>;

  contentsBoxTop = <%% 70, 70, 70, 70, 0 %%>;
  contentsBoxWidth = <%% 1200, 1050, 900, 720, 1200 %%>;

  bottomVisual = <%% 6, 6, 6, 6, 6 %%>;

  pictureHeight = mainHeight - (contentsBoxTop * 2) - bottomVisual;

  logoBottom = <%% 48, 48, 48, 48, 48 %%>;
  logoLeft = <%% 50, 50, 50, 50, 50 %%>;
  logoWidth = <%% 33, 33, 33, 33, 33 %%>;

  wordingBottom = <%% 44, 44, 40, 32, 44 %%>;
  wordingLeft = <%% 44, 44, 40, 32, 44 %%>;
  wordingSize = <%% 18, 18, 16, 14, 18 %%>;
  wordingWeight = <%% 400, 400, 400, 400, 400 %%>;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.gray0,
      paddingTop: String(naviHeight) + "px",
      height: String(mainHeight) + ea,
      animation: "fadeupdelay 0.5s ease forwards",
    },
    children: [
      {
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          background: colorChip.gray1,
          bottom: String(0),
          left: String(0),
          height: String(mainBelowBarHeight) + ea,
          width: String(100) + '%',
        }
      }
    ]
  });

  contentsBox = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(contentsBoxTop) + ea,
      width: desktop ? String(contentsBoxWidth) + ea : String(100) + '%',
      left: desktop ? "calc(50% - " + String(contentsBoxWidth / 2) + ea + ")" : String(0),
      top: String(0),
      height: String(mainHeight - (contentsBoxTop * 2)) + ea,
    }
  });

  picture = createNode({
    mother: contentsBox,
    style: {
      display: desktop ? "inline-block" : "block",
      position: desktop ? "relative" : "absolute",
      width: withOut(0),
      height: desktop ? String(pictureHeight) + ea : String(100) + '%',
      borderRadius: desktop ? String(5) + "px" : "",
      backgroundImage: "url('" + MagazineDetailJs.binaryPath + this.mid + contents.init[desktop ? 0 : 1] + "')",
      backgroundSize: "auto 100%",
      backgroundPosition: "50% 50%",
      boxShadow: desktop ? "0px 8px 22px -15px " + colorChip.shadow : "",
      verticalAlign: "top",
    }
  });

  if (desktop) {
    createNode({
      mother: picture,
      text: "magazine #" + String(Number(this.mid.replace(/[^0-9]/gi, '')) + 1),
      style: {
        position: "absolute",
        bottom: String(wordingBottom) + ea,
        right: String(wordingLeft) + ea,
        fontSize: String(wordingSize) + ea,
        fontWeight: String(wordingWeight),
        color: colorChip.black,
        fontFamily: "graphik",
        opacity: String(0.9),
      }
    });
  }

}

MagazineDetailJs.prototype.magazineContentsBox = function () {
  const instance = this;
  const { createNode, colorChip, withOut, svgMaker, equalJson, designerMthParsing, designerCareer, isMac, isIphone, selfHref, setQueue } = GeneralJs;
  const { totalContents, ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainWidth;
  let mainPaddingTop;
  let titleSize;
  let titleWeight;
  let titleLineHeight;
  let titleBarMarginTop;
  let titleBarWidth;
  let contentsSize;
  let contentsWeight;
  let contentsLineHeight;
  let mainTong;
  let titleBarMarginBottom;
  let photoMargin;
  let blankMarginFirst;
  let blankMargin;
  let blankMargin2;
  let blankMarginLast;
  let contentsMarginBottom;
  let binaryPath;
  let contents;
  let type;

  binaryPath = MagazineDetailJs.binaryPath + this.mid;
  ({ contents } = this.magazine);

  mainWidth = <%% 900, 900, 900, 720, 100 %%>;
  mainPaddingTop = <%% 110, 110, 110, 80, 11.7 %%>;

  titleSize = <%% 23, 23, 23, 21, 4.8 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  titleBarMarginTop = <%% 15, 15, 15, 15, 3 %%>;
  titleBarWidth = <%% 80, 80, 80, 80, 18 %%>;
  titleBarMarginBottom = <%% 36, 36, 36, 36, 5.5 %%>;

  contentsSize = <%% 16, 16, 16, 15, 3.8 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;
  contentsMarginBottom = <%% 36, 36, 36, 36, 6 %%>;

  photoMargin = <%% 8, 8, 8, 8, 1 %%>;
  blankMarginFirst = <%% 126, 126, 126, 96, 13.5 %%>;
  blankMargin = <%% 100, 100, 100, 70, 11 %%>;
  blankMargin2 = <%% 100, 100, 100, 70, 10 %%>;
  blankMarginLast = <%% 200, 200, 200, 170, 20 %%>;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(mainWidth) + ea,
      left: "calc(50% - " + String(mainWidth / 2) + ea + ")",
      background: colorChip.white,
      paddingTop: String(mainPaddingTop) + ea,
      paddingBottom: String(200) + ea,
      animation: "fadeupdelay 0.5s ease forwards",
    },
  });

  for (let obj of contents.detail) {
    type = obj.type;
    if (/^blank/i.test(type)) {
      createNode({
        mother: mainTong,
        style: {
          display: "block",
          height: String(blankMargin) + ea,
        }
      });
    }
    if (type.replace(/^general/i, '').replace(/^blank/i, '') === "Title") {
      createNode({
        mother: mainTong,
        text: obj.text.join("\n"),
        style: {
          display: "block",
          position: "relative",
          textAlign: "center",
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          lineHeight: String(titleLineHeight),
          color: colorChip.black,
        }
      });
      createNode({
        mother: mainTong,
        style: {
          display: "block",
          position: "relative",
          textAlign: "center",
          marginTop: String(titleBarMarginTop) + ea,
          marginBottom: String(titleBarMarginBottom) + ea,
        },
        children: [
          {
            style: {
              display: "inline-block",
              width: String(titleBarWidth) + ea,
              borderBottom: "1px solid " + colorChip.gray3,
            }
          }
        ]
      });
    } else if (type.replace(/^general/i, '').replace(/^blank/i, '') === "Description") {
      createNode({
        mother: mainTong,
        text: obj.text.join("\n\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(contentsSize) + ea,
          fontWeight: String(contentsWeight),
          color: colorChip.black,
          lineHeight: String(contentsLineHeight),
        }
      });
    } else if (type.replace(/^general/i, '').replace(/^blank/i, '') === "Image") {
      if (obj.gs === 'g') {
        createNode({
          mother: mainTong,
          mode: "img",
          attribute: { src: binaryPath + obj.source[desktop ? 0 : 1] },
          event: {
            contextmenu: (e) => { e.preventDefault(); },
            selectstart: (e) => { e.preventDefault(); }
          },
          style: {
            width: withOut(0),
            display: "inline-block",
            marginBottom: String(photoMargin) + ea,
            marginRight: String(0) + ea,
            borderRadius: String(3) + "px",
          }
        });
      } else {
        createNode({
          mother: mainTong,
          mode: "img",
          attribute: { src: binaryPath + obj.source[desktop ? 0 : 1][0] },
          event: {
            contextmenu: (e) => { e.preventDefault(); },
            selectstart: (e) => { e.preventDefault(); }
          },
          style: {
            width: "calc(calc(100% - " + String(photoMargin) + ea + ") / 2)",
            display: "inline-block",
            marginRight: String(photoMargin) + ea,
            marginBottom: String(photoMargin) + ea,
            borderRadius: String(3) + "px",
          }
        });
        createNode({
          mother: mainTong,
          mode: "img",
          attribute: { src: binaryPath + obj.source[desktop ? 0 : 1][1] },
          event: {
            contextmenu: (e) => { e.preventDefault(); },
            selectstart: (e) => { e.preventDefault(); }
          },
          style: {
            width: "calc(calc(100% - " + String(photoMargin) + ea + ") / 2)",
            display: "inline-block",
            marginBottom: String(photoMargin) + ea,
            marginRight: String(0) + ea,
            borderRadius: String(3) + "px",
          }
        });
      }
    }
  }

}

MagazineDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce, facebookSdkPatch, kakaoSdkPatch, protoPatch } = GeneralJs;
  try {
    this.mother.setGeneralProperties(this);

    const getObj = returnGet();
    let mid;
    let response;
    let magazine;

    if (typeof getObj.mid !== "string") {
      throw new Error("invalid mid");
    }

    mid = getObj.mid;
    this.mid = mid;
    response = await ajaxJson({ mode: "magazine", mid }, LOGHOST + "/getContents", { equal: true });
    [ magazine ] = response.contentsArr;
    this.magazine = magazine;

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "magazineDetail",
      client: null,
      base: {
        instance: this,
        binaryPath: MagazineDetailJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 2,
      },
      local: async () => {
        try {
          instance.magazineInitBox();
          instance.magazineContentsBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "MagazineDetailJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    window.alert("잘못된 접근입니다!");
    await ajaxJson({ message: "MagazineDetailJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
