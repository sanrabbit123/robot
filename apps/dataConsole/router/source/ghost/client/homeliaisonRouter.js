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
      "return ('홈리에종 안내 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 안내 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "homeliaisonRouter",
  "hangul": "홈리에종 안내",
  "route": [
    "homeliaisonRouter"
  ]
} %/%/g

const HomeliaisonRouterJs = function () {
  this.mother = new GeneralJs();
}

HomeliaisonRouterJs.binaryPath = FRONTHOST + "/middle/router";

HomeliaisonRouterJs.prototype.boxRouting = function () {
  const instance = this;
  const { createNode, colorChip, withOut, svgMaker, isMac, isIphone } = GeneralJs;
  const { totalContents, naviHeight, ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainWidth, mainTong;
  let backgroundColor;
  let routingContents;
  let buttonTong;
  let buttonTongWidth;
  let blockHeight;
  let blockBetween;
  let fontTextTop, fontSize, fontWeight;
  let radius;

  mainWidth = <%% 900, 900, 900, 720, 100 %%>;

  buttonTongWidth = <%% 400, 400, 380, 340, 82 %%>;

  blockHeight = <%% 56, 56, 54, 50, 12 %%>;
  blockBetween = <%% 12, 12, 12, 10, 2 %%>;

  fontTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;
  fontSize = <%% 17, 17, 16, 15, 3.6 %%>;
  fontWeight = <%% 700, 700, 700, 700, 700 %%>;

  radius = <%% 10, 10, 10, 10, 5 %%>;

  routingContents = [
    {
      type: "general",
      title: "고객 후기 보러가기",
      link: FRONTHOST + "/review.php?utm_source=instagram&utm_medium=linktree&utm_campaign=link_review",
    },
    {
      type: "general",
      title: "홈스타일링 상담 신청하기",
      link: FRONTHOST + "/consulting.php?utm_source=instagram&utm_medium=linktree&utm_campaign=link_consulting",
    },
    {
      type: "image",
      title: "홈리에종 Mini 서비스 알아보기",
      link: FRONTHOST + "/miniAbout.php",
    }
  ]

  backgroundColor = colorChip.gray2;

  totalContents.style.background = backgroundColor;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "flex",
      position: "relative",
      width: String(mainWidth) + ea,
      left: "calc(50% - " + String(mainWidth / 2) + ea + ")",
      background: backgroundColor,
      animation: "fadeupdelay 0.5s ease forwards",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      height: "calc(100vh - " + String(0) + ea + ")"
    },
  });

  buttonTong = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String(buttonTongWidth) + ea,
    }
  });

  for (let { type, title, link } of routingContents) {
    if (type === "general") {

      createNode({
        mother: buttonTong,
        event: {
          mouseenter: function (e) {
            this.style.transform = "scale(1.03)";
            this.firstChild.style.color = colorChip.green;
          },
          mouseleave: function (e) {
            this.style.transform = "scale(1)";
            this.firstChild.style.color = colorChip.black;
          },
        },
        style: {
          display: "flex",
          width: withOut(0, ea),
          background: colorChip.white,
          height: String(blockHeight) + ea,
          borderRadius: String(10) + "px",
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          marginBottom: String(blockBetween) + ea,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          cursor: "pointer",
          transformOrigin: "50% 50%",
          transform: "scale(1)",
          transition: "all 0.5s ease",
        },
        children: [
          {
            text: title,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(fontTextTop) + ea,
              fontSize: String(fontSize) + ea,
              fontWeight: String(fontWeight),
              color: colorChip.black,
              textAlign: "center",
            }
          }
        ]
      });

    } else {

      createNode({
        mother: buttonTong,
        event: {
          mouseenter: function (e) {
            this.style.transform = "scale(1.03)";
            this.children[1].firstChild.style.color = colorChip.green;
          },
          mouseleave: function (e) {
            this.style.transform = "scale(1)";
            this.children[1].firstChild.style.color = colorChip.black;
          },
        },
        style: {
          display: "display",
          width: withOut(0, ea),
          background: colorChip.white,
          borderRadius: String(radius) + "px",
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          marginBottom: String(blockBetween) + ea,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          cursor: "pointer",
          transformOrigin: "50% 50%",
          transform: "scale(1)",
          transition: "all 0.5s ease",
          overflow: "hidden",
        },
        children: [
          {
            mode: "img",
            attribute: {
              src: FRONTHOST + "/middle/index/popup0.jpg",
            },
            style: {
              display: "block",
              width: withOut(0),
            }
          },
          {
            style: {
              display: "flex",
              width: withOut(0, ea),
              height: String(blockHeight) + ea,
              borderRadius: String(radius) + "px",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              cursor: "pointer",
            },
            children: [
              {
                text: title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(fontTextTop) + ea,
                  fontSize: String(fontSize) + ea,
                  fontWeight: String(fontWeight),
                  color: colorChip.black,
                  textAlign: "center",
                }
              }
            ]
          }
        ]
      });



    }
  }

}

HomeliaisonRouterJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce, facebookSdkPatch, kakaoSdkPatch } = GeneralJs;
  try {
    this.mother.setGeneralProperties(this);
    const getObj = returnGet();

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "homeliaisonRouter",
      client: null,
      base: {
        instance: this,
        binaryPath: HomeliaisonRouterJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 2,
      },
      local: async () => {
        try {

          instance.boxRouting();

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "HomeliaisonRouterJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    setQueue(() => {
      window.scroll({ top: 0, left: 0 });
      if (window.scrollY !== 0) {
        setQueue(() => {
          window.scroll({ top: 0, left: 0 });
        }, 10)
      }
    })

  } catch (err) {
    console.log(err);
    window.alert("잘못된 접근입니다!");
    await ajaxJson({ message: "HomeliaisonRouterJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
