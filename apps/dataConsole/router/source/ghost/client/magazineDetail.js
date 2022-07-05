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

MagazineDetailJs.binaryPath = FRONTHOST + "/middle/index";

MagazineDetailJs.prototype.generalBase = function () {
  const instance = this;
  const { createNode, createNodes, colorChip, withOut, svgMaker, isMac, isIphone } = GeneralJs;
  const { totalContents, naviHeight, ea, media, backHeight, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let backgroundImageName;
  let backgroundGray, backgroundImageBox;
  let baseTop;

  backgroundImageName = "back.jpg";
  baseTop = <%% 200, 200, 170, 140, 10 %%>;

  [ backgroundGray, backgroundImageBox ] = createNodes([
    {
      mother: totalContents,
      style: {
        position: "absolute",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        background: colorChip.gray1,
        animation: "justfadeinoriginal 0.3s ease forwards",
      }
    },
    {
      mother: totalContents,
      style: {
        position: "absolute",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(backHeight) + ea,
        backgroundImage: "url('" + MagazineDetailJs.binaryPath + "/" + backgroundImageName + "')",
        backgroundSize: this.backgroundType !== 1 ? ((!media[3] && !media[4]) ? "100% auto" : "auto 100%") : (mobile ? "auto 100%" : "100% auto"),
        backgroundPosition: "top",
        animation: "justfadeinoriginal 0.3s ease forwards",
      }
    }
  ]);
  this.backgroundGray = backgroundGray;
  this.backgroundImageBox = backgroundImageBox;

  baseTong = createNode({
    mother: totalContents,
    style: {
      position: "relative",
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      paddingTop: desktop ? String(baseTop) + ea : "calc(" + String(naviHeight) + "px" + " + " + String(baseTop) + ea + ")",
      animation: mobile ? "" : "fadeupdelay 0.5s ease forwards",
    }
  });

  this.baseTop = baseTop;
  this.baseTong = baseTong;
}

MagazineDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce, facebookSdkPatch, kakaoSdkPatch, setMetaData, protoPatch } = GeneralJs;
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
          instance.generalBase();
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
