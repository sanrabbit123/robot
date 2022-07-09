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

MagazineDetailJs.prototype.magazineMainBox = function () {
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

  mainHeight = <%% 800, 750, 710, 590, (210 / 297) * 100 %%>;
  mainBelowBarHeight = <%% 250, 250, 250, 216, 250 %%>;

  contentsBoxTop = <%% 70, 70, 70, 70, 0 %%>;
  contentsBoxWidth = <%% 1200, 1050, 900, 720, 1200 %%>;

  bottomVisual = <%% 6, 6, 6, 6, 6 %%>;

  pictureHeight = mainHeight - (contentsBoxTop * 2) - bottomVisual;

  logoBottom = <%% 48, 48, 48, 48, 48 %%>;
  logoLeft = <%% 50, 50, 50, 50, 50 %%>;
  logoWidth = <%% 33, 33, 33, 33, 33 %%>;

  wordingBottom = <%% 44, 44, 44, 44, 44 %%>;
  wordingLeft = <%% 91, 91, 91, 91, 91 %%>;
  wordingSize = <%% 20, 20, 20, 20, 20 %%>;
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
      backgroundImage: "url('" + MagazineDetailJs.binaryPath + this.mid + "/main.jpg" + "')",
      backgroundSize: "100% auto",
      backgroundPosition: "50% 50%",
      boxShadow: desktop ? "0px 8px 22px -15px " + colorChip.shadow : "",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: picture,
    mode: "svg",
    source: instance.mother.returnLogo(colorChip.white, 4),
    style: {
      position: "absolute",
      bottom: String(logoBottom) + ea,
      left: String(logoLeft) + ea,
      width: String(logoWidth) + ea,
    }
  });

  createNode({
    mother: picture,
    text: "magazine",
    style: {
      position: "absolute",
      bottom: String(wordingBottom) + ea,
      left: String(wordingLeft) + ea,
      fontSize: String(wordingSize) + ea,
      fontWeight: String(wordingWeight),
      color: colorChip.white,
      fontFamily: "graphik",
    }
  });


}

MagazineDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce, facebookSdkPatch, kakaoSdkPatch, protoPatch } = GeneralJs;
  try {
    this.mother.setGeneralProperties(this);

    const getObj = returnGet();
    let mid;

    if (typeof getObj.mid !== "string") {
      throw new Error("invalid mid");
    }

    mid = getObj.mid.slice(0, 1).toUpperCase() + getObj.mid.slice(1);
    this.mid = getObj.mid;
    // await protoPatch(this, "https://" + GHOSTHOST + "/patch/magazine" + mid + "?dir=magazine", "Magazine" + mid + "Js");
    await protoPatch(this, "/patch/magazine" + mid + "?directory=magazine", "Magazine" + mid + "Js");

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
          instance.magazineMainBox();
          await instance.magazineLaunching();
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
