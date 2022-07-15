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
      "return ('홈리에종 서비스 신청 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 서비스 신청 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "requestDetail",
  "hangul": "스타일링 요청",
  "route": [
    "requestDetail"
  ]
} %/%/g

const RequestDetailJs = function () {
  this.mother = new GeneralJs();
}

RequestDetailJs.binaryPath = "/middle/request";

RequestDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);
    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();




    await this.mother.ghostDesignerLaunching({
      mode: "front",
      name: "requestDetail",
      client: null,
      base: {
        instance: this,
        binaryPath: RequestDetailJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 0,
      },
      local: async () => {
        try {

          


        } catch (e) {
          await GeneralJs.ajaxJson({ message: "RequestDetailJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "RequestDetailJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
