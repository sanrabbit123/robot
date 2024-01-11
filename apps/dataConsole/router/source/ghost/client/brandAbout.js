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
      "return ('홈리에종 서비스 소개 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 서비스 소개 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "brandAbout",
  "hangul": "서비스 소개",
  "route": [
    "brandAbout"
  ]
} %/%/g

const BrandAboutJs = function () {
  this.mother = new GeneralJs();
  this.color = {
    blue: "#5e9add",
    blueMiddle: "#3273bb",
    blueDark: "#2a4866",
    blueGradient: "linear-gradient(40deg, rgba(76,144,222,1) 0%, rgba(115,174,241,1) 100%)",
  }
}

BrandAboutJs.binaryPath = "/middle/brand";

BrandAboutJs.prototype.navigatorMaker = async function () {
  const instance = this;
  const { ea, totalContents, media, color, naviHeight } = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    let base;
    let textBox;

    base = createNode({
      mother: totalContents,
      style: {
        display: "flex",
        position: "fixed",
        width: String(100) + "vw",
        height: String(naviHeight) + ea,
        background: "transparent",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        zIndex: String(2),
      }
    })

    createNode({
      mother: base,
      text: "ABOUT",
      style: {
        display: "inline-flex",
        position: "relative",
        fontFamily: "graphik",
        fontSize: String(15) + ea,
        fontWeight: String(400),
        color: colorChip.white,
        top: String(-1) + ea,
      }
    });

    createNode({
      mother: base,
      text: "MAGAZINE",
      style: {
        display: "inline-flex",
        position: "relative",
        fontFamily: "graphik",
        fontSize: String(15) + ea,
        fontWeight: String(400),
        color: colorChip.white,
        top: String(-1) + ea,
        marginLeft: String(123) + ea,
        marginRight: String(115) + ea,
      }
    });

    createNode({
      mother: base,
      text: "CONTACT",
      style: {
        display: "inline-flex",
        position: "relative",
        fontFamily: "graphik",
        fontSize: String(15) + ea,
        fontWeight: String(400),
        color: colorChip.white,
        top: String(-1) + ea,
      }
    });


  } catch (e) {
    console.log(e);
  }
}

BrandAboutJs.prototype.baseMaker = async function () {
  const instance = this;
  const { ea, totalContents, media, color, px, vw } = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    let base;
    let textBox;
    let title, description;
    
    title = "홈리에종의 의미";
    description = [
      "집을 의미하는 '홈'과 연결, 담당, 관리를 의미하는 '리에종'의 합성어로",
      "집과 고객을 연결하고 아름답게 가꾸어 주고자 하는 의미에서 탄생되었습니다.",
    ]

    base = createNode({
      mother: totalContents,
      style: {
        display: "flex",
        position: "relative",
        width: String(100) + vw,
        height: String(window.innerHeight) + px,
        background: color.blueGradient,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }
    })

    createNode({
      mother: base,
      mode: "img",
      attribute: {
        src: BrandAboutJs.binaryPath + "/" + "main_0.svg",
      },
      style: {
        width: String(1200) + ea,
        position: "relative",
        display: "inline-block",
        marginTop: String(10) + ea,
      }
    });

    createNode({
      mother: base,
      mode: "img",
      attribute: {
        src: BrandAboutJs.binaryPath + "/" + "right_001.svg",
      },
      style: {
        position: "absolute",
        top: String(0),
        right: String(0),
        width: String(250) + ea,
      }
    })

    createNode({
      mother: base,
      mode: "img",
      attribute: {
        src: BrandAboutJs.binaryPath + "/" + "left_001.svg",
      },
      style: {
        position: "absolute",
        bottom: String(0),
        left: String(0),
        width: String(800) + ea,
      }
    })

    textBox = createNode({
      mother: base,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(1000) + ea,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }
    })

    createNode({
      mother: textBox,
      text: title,
      style: {
        display: "inline-flex",
        textAlign: "center",
        fontSize: String(30) + ea,
        fontWeight: String(800),
        color: colorChip.white,
        marginBottom: String(12) + ea,
        wordSpacing: String(-2) + px,
      }
    })

    createNode({
      mother: textBox,
      text: description.join("\n"),
      style: {
        display: "inline-flex",
        textAlign: "center",
        position: "relative",
        fontSize: String(15) + ea,
        fontWeight: String(500),
        color: colorChip.white,
        lineHeight: String(1.6),
        wordSpacing: String(-2) + px,
      }
    })

    createNode({
      mother: textBox,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(110) + ea,
        height: String(43) + ea,
        background: color.blueMiddle,
        borderRadius: String(43) + ea,
        marginTop: String(92) + ea,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      },
      child: {
        text: "더보기",
        style: {
          position: "relative",
          fontSize: String(19) + ea,
          fontWeight: String(900),
          color: colorChip.white,
          top: String(-1) + ea,
        }
      }
    })




  } catch (e) {
    console.log(e);
  }
}

BrandAboutJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, requestPromise, setDebounce, colorChip, homeliaisonAnalytics, dateToString } = GeneralJs;
    const getObj = returnGet();

    await this.navigatorMaker();
    await this.baseMaker();

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "BrandAboutJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
