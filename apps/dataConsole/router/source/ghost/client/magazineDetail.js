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

MagazineDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce, facebookSdkPatch, kakaoSdkPatch, setMetaData, protoPatch } = GeneralJs;
  try {
    this.mother.setGeneralProperties(this);

    const getObj = returnGet();

    await protoPatch(this, LOGHOST + "/magazineM0.js", "MagazineM0Js");

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
