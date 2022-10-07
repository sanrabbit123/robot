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
      "return ('홈리에종 스타일 파츠 소개 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 스타일 파츠 소개 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "aboutConstruction",
  "hangul": "스타일 파츠",
  "route": [
    "aboutConstruction"
  ]
} %/%/g

const AboutConstructionJs = function () {
  this.mother = new GeneralJs();
}

AboutConstructionJs.binaryPath = FRONTHOST + "/middle/curation";

AboutConstructionJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet } = GeneralJs;
    const getObj = returnGet();
    let response;

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "aboutConstruction",
      client: null,
      base: {
        instance: this,
        binaryPath: AboutConstructionJs.binaryPath,
        subTitle: "스타일 파츠",
        secondBackground: false,
        backgroundType: 0,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {




        } catch (e) {
          await GeneralJs.ajaxJson({ message: "AboutConstructionJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "AboutConstructionJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
