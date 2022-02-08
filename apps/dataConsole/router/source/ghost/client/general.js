GeneralJs.prototype.setGeneralProperties = function (instance) {
  this.totalContents = document.getElementById("totalcontents");
  this.frontPage = FRONTHOST;
  this.testMode = false;

  instance.totalContents = this.totalContents;
  instance.frontPage = this.frontPage;
  instance.testMode = this.testMode;

  this.mode = <%% "bigDesktop", "smallDesktop", "tablet", "tablet", "mobile" %%>;
  this.ea = <%% "px", "px", "px", "px", "vw" %%>;
  this.standardWidth = <%% 1400, 1050, 900, 720, 88 %%>;
  this.sero = <%% false, false, false, false, true %%>;
  this.modeMinus = <%% 0, 1, 1, 1, 1 %%>;
  this.naviHeight = <%% 72, 72, 66, 60, 60 %%>;
  this.backHeight = <%% 860, 860, 860, 800, 80 %%>;
  this.margin = 20 - this.modeMinus;

  instance.mode = this.mode;
  instance.ea = this.ea;
  instance.standardWidth = this.standardWidth;
  instance.sero = this.sero;
  instance.modeMinus = this.modeMinus;
  instance.naviHeight = this.naviHeight;
  instance.backHeight = this.backHeight;
  instance.margin = this.margin;

  this.subBoxMargin = {};
  this.subBoxMargin.top = <%% 30, 30, 26, 20, 10.5 %%>;
  this.subBoxMargin.bottom = <%% 31, 31, 27, 26, 31 %%>;
  this.subBoxMargin.left = <%% 30, 30, 30, 24, 4.5 %%>;

  instance.subBoxMargin = {};
  instance.subBoxMargin.top = this.subBoxMargin.top;
  instance.subBoxMargin.bottom = this.subBoxMargin.bottom;
  instance.subBoxMargin.left = this.subBoxMargin.left;

  if (this.modeMinus !== 0) {
    document.querySelector("style").insertAdjacentHTML("beforeend", "*{transition:all 0s ease}");
  }

  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
  instance.media = this.media;
}

GeneralJs.prototype.setBackground = function (binaryPath, second = false, random = 0) {
  const instance = this;
  const { ea, media, backHeight, totalContents } = this;
  const { createNodes, colorChip, withOut } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  let backgroundImageName, secondBackgroundImageName;
  let backgroundGray, backgroundImageBox, backgroundImageBox2;

  backgroundImageName = "back.jpg";
  if (typeof random === "number") {
    if (random !== 0) {
      backgroundImageName = "back" + String(Math.floor(Math.random() * random)) + ".jpg";
    }
  }
  secondBackgroundImageName = "back2.jpg";

  if (!second) {
    [ backgroundGray, backgroundImageBox ] = createNodes([
      {
        mother: totalContents,
        style: {
          position: "absolute",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(100) + '%',
          background: desktop ? colorChip.gray2 : colorChip.gray1,
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
          backgroundImage: "url('" + binaryPath + "/" + backgroundImageName + "')",
          backgroundSize: (!media[3] && !media[4]) ? "100% auto" : "auto 100%",
          backgroundPosition: "top",
          animation: "justfadeinoriginal 0.3s ease forwards",
        }
      }
    ]);
    this.backgroundGray = backgroundGray;
    this.backgroundImageBox = backgroundImageBox;
    this.backgroundImageBox2 = null;
  } else {
    [ backgroundGray, backgroundImageBox2, backgroundImageBox ] = createNodes([
      {
        mother: totalContents,
        style: {
          position: "absolute",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(100) + '%',
          background: desktop ? colorChip.gray2 : colorChip.gray1,
          animation: "justfadeinoriginal 0.3s ease forwards",
        }
      },
      {
        mother: totalContents,
        style: {
          opacity: "0",
          transition: "all 0s ease",
          position: "absolute",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(backHeight) + ea,
          backgroundImage: "url('" + binaryPath + "/" + secondBackgroundImageName + "')",
          backgroundSize: (!media[3] && !media[4]) ? "100% auto" : "auto 100%",
          backgroundPosition: "top",
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
          backgroundImage: "url('" + binaryPath + "/" + backgroundImageName + "')",
          backgroundSize: (!media[3] && !media[4]) ? "100% auto" : "auto 100%",
          backgroundPosition: "top",
          animation: "justfadeinoriginal 0.3s ease forwards",
        }
      }
    ]);
    this.backgroundGray = backgroundGray;
    this.backgroundImageBox = backgroundImageBox;
    this.backgroundImageBox2 = backgroundImageBox2;
  }

}

GeneralJs.prototype.setNavigator = function (subTitle, blackMode = true, name) {
  const instance = this;
  const { standardWidth, media, totalContents, naviHeight, frontPage } = this;
  const { createNode, createNodes, colorChip, withOut, blankHref, selfHref } = GeneralJs;
  let { ea } = this;
  let mobile = media[4];
  let desktop = !mobile;
  let naviBase;
  let iconHeight, iconTop;
  let wordHeight, wordSize, wordTop;
  let height, width;
  let mobileMargin;
  let naviTong;
  let naviMenu;
  let wordingTop;
  let wordingSize;
  let wordingMarginRight;
  let wordingMarginRightLast;
  let searchWidth, searchWidthMinus;
  let hamburgerTop;
  let mobileMenuTong;
  let mobileMenuHeight;
  let mobileFirstTop, mobileVerticalBetween;
  let thisIndex;

  iconHeight = <%% 21.5, 21.5, 19, 17, 16 %%>;
  iconTop = <%% 22, 22, 20.5, 18, 20 %%>;
  wordHeight = <%% 20, 20, 20, 20, 20 %%>;
  wordSize = <%% 15, 15, 15, 14, 13 %%>;
  wordTop = <%% 24, 24, 21, 19, 18 %%>;
  mobileMargin = 6.1;
  wordingTop = <%% 21.5, 21.5, 20.5, 17, 10 %%>;
  wordingSize = <%% 14.5, 14.5, 14, 13, 15 %%>;
  wordingMarginRight = <%% 36, 36, 34, 24, 3 %%>;
  wordingMarginRightLast = <%% 9, 9, 4, 0, 1 %%>;
  hamburgerTop = 21;
  searchWidth = <%% 22.5, 22.5, 21, 18, 20 %%>;
  searchWidthMinus = <%% 23, 23, 21, 18.5, 2 %%>;
  mobileMenuHeight = 210;
  mobileFirstTop = 11;
  mobileVerticalBetween = 37;

  thisIndex = 99;
  naviMenu = [
    {
      title: "서비스 소개",
      href: FRONTHOST + "/about.php",
      green: [],
    },
    {
      title: "포트폴리오",
      href: FRONTHOST + "/portfolio.php",
      green: [],
    },
    {
      title: "디자이너",
      href: FRONTHOST + "/designer.php",
      green: [],
    },
    {
      title: "고객 후기",
      href: FRONTHOST + "/review.php",
      green: [],
    },
    {
      title: "상담 신청",
      href: "https://" + GHOSTHOST + "/middle/curation?cliid=" + "c1801_aa01s",
      green: [ "styleCuration" ],
    },
  ];
  for (let i = 0; i < naviMenu.length; i++) {
    if (naviMenu[i].green.includes(name)) {
      thisIndex = i;
      break;
    }
  }

  if (desktop) {
    wordTop = wordTop + (GeneralJs.isMac() ? 0 : 1);
  }

  naviBase = createNode({
    mother: totalContents,
    class: [ "backblurdefault_lite" ],
    style: {
      position: "fixed",
      background: blackMode ? colorChip.gradientGray : colorChip.white,
      height: String(naviHeight) + "px",
      width: String(100) + '%',
      top: String(0),
      left: String(0),
      zIndex: String(1),
    }
  });

  createNode({
    mother: naviBase,
    mode: "svg",
    source: this.returnLogo(blackMode ? colorChip.white : colorChip.green, 0),
    class: [ desktop ? "hoverDefault" : "hoverDefault_mobile" ],
    event: {
      click: (e) => {
        blankHref(frontPage);
      }
    },
    style: {
      position: "absolute",
      top: String(iconTop) + "px",
      left: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : String(mobileMargin) + ea,
      height: String(iconHeight) + "px",
      zIndex: String(1),
      cursor: "pointer",
    }
  });

  if (blackMode) {
    createNode({
      mother: naviBase,
      text: subTitle,
      style: {
        position: "absolute",
        top: String(wordTop) + "px",
        right: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : String(mobileMargin) + ea,
        height: String(wordHeight) + "px",
        width: String(200) + "px",
        fontSize: String(wordSize) + "px",
        fontWeight: String(300),
        textAlign: "right",
        wordSpacing: String(-1) + "px",
        color: colorChip.white,
      }
    });
  } else {

    if (desktop) {

      naviTong = createNode({
        mother: naviBase,
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          top: String(wordingTop) + ea,
          left: String(0) + ea,
          textAlign: "center",
        }
      });
      for (let i = 0; i < naviMenu.length; i++) {
        createNode({
          mother: naviTong,
          attribute: {
            index: String(i)
          },
          event: {
            mouseenter: function (e) {
              const index = Number(this.getAttribute("index"));
              if (index !== thisIndex) {
                this.style.color = colorChip.green;
              }
            },
            mouseleave: function (e) {
              const index = Number(this.getAttribute("index"));
              if (index !== thisIndex) {
                this.style.color = colorChip.black;
              }
            },
            click: function (e) {
              const index = Number(this.getAttribute("index"));
              selfHref(naviMenu[i].href);
            }
          },
          text: naviMenu[i].title,
          style: {
            display: "inline-block",
            fontSize: String(wordingSize) + ea,
            fontWeight: String(600),
            color: i === thisIndex ? colorChip.green : colorChip.black,
            marginRight: String(i === naviMenu.length - 1 ? wordingMarginRightLast : wordingMarginRight) + ea,
            cursor: "pointer",
            transition: "all 0.5s ease",
          }
        });
      }

      createNode({
        mother: naviBase,
        mode: "svg",
        source: this.returnSearch(colorChip.green),
        class: [ "hoverDefault" ],
        event: {
          click: (e) => {
            selfHref(frontPage + "/portfolio.php");
          }
        },
        style: {
          position: "absolute",
          top: String(iconTop) + ea,
          left: desktop ? "calc(50% + " + String((standardWidth / 2) - searchWidthMinus) + ea + ")" : String(mobileMargin) + ea,
          width: String(searchWidth) + ea,
          zIndex: String(1),
        }
      });
    } else {

      mobileMenuTong = createNode({
        mother: naviBase,
        attribute: {
          toggle: "off",
        },
        style: {
          position: "relative",
          top: String(100) + '%',
          display: "block",
          height: String(0) + "px",
          overflow: "hidden",
          transition: "all 0.5s ease",
        },
        children: [
          {
            style: {
              position: "absolute",
              bottom: String(0),
              left: String(0),
              width: String(100) + '%',
              height: String(mobileMenuHeight) + "px",
              background: colorChip.white,
            },
            children: [
              {
                style: {
                  position: "relative",
                  width: String(100) + '%',
                  height: String(100) + '%',
                }
              }
            ]
          }
        ]
      });
      for (let i = 0; i < naviMenu.length; i++) {
        createNode({
          mother: mobileMenuTong.firstChild.firstChild,
          attribute: {
            index: String(i)
          },
          event: {
            click: function (e) {
              const index = Number(this.getAttribute("index"));
              selfHref(naviMenu[i].href);
            }
          },
          text: naviMenu[i].title,
          style: {
            display: "block",
            position: "absolute",
            fontSize: String(wordingSize) + "px",
            fontWeight: String(600),
            color: i === thisIndex ? colorChip.green : colorChip.black,
            width: String(100) + '%',
            textAlign: "center",
            top: String(mobileFirstTop + (mobileVerticalBetween * i)) + "px",
          }
        });
      }

      createNode({
        mother: naviBase,
        mode: "svg",
        source: this.returnHamburger(colorChip.black),
        event: {
          click: (e) => {
            const toggle = mobileMenuTong.getAttribute("toggle");
            if (toggle === "off") {
              mobileMenuTong.style.height = String(mobileMenuHeight) + "px";
              mobileMenuTong.setAttribute("toggle", "on");
            } else {
              mobileMenuTong.style.height = String(0) + "px";
              mobileMenuTong.setAttribute("toggle", "off");
            }
          }
        },
        style: {
          position: "absolute",
          top: String(hamburgerTop) + "px",
          right: String(mobileMargin) + ea,
          width: String(searchWidth) + "px",
          zIndex: String(1),
        }
      });

    }

  }

}

GeneralJs.prototype.setBaseTong = function (child) {
  const instance = this;
  const { ea, media, totalContents, standardWidth, naviHeight } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  let baseTong;
  let style;
  let baseTop;

  baseTop = <%% 200, 200, 170, 140, 10 %%>;
  baseTong = createNode({
    mother: totalContents,
    style: {
      position: "relative",
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      paddingTop: desktop ? String(baseTop) + ea : "calc(" + String(naviHeight) + "px" + " + " + String(baseTop) + ea + ")",
      animation: "fadeupdelay 0.5s ease forwards",
    }
  });

  this.baseTop = baseTop;
  this.baseTong = baseTong;
  child.baseTop = this.baseTop;
  child.baseTong = this.baseTong;
}

GeneralJs.prototype.setGeneralBase = function (obj, random = 0, mode, name) {
  if (typeof obj !== "object") {
    throw new Error("must be object => { instance, binaryPath, subTitle }");
  }
  if (obj.instance === undefined || typeof obj.binaryPath !== "string" || typeof obj.subTitle !== "string") {
    throw new Error("must be object => { instance, binaryPath, subTitle }");
  }
  const { instance, binaryPath, subTitle } = obj;
  this.setBackground(binaryPath, obj.secondBackground === true, random);
  this.setNavigator(subTitle, mode === "ghost", name);
  this.setBaseTong(instance);
}

GeneralJs.prototype.ghostClientLaunching = async function (obj) {
  const instance = this;
  try {
    if (typeof obj !== "object") {
      throw new Error("must be object => { name, client, base, local }");
    }
    if (typeof obj.name !== "string" || typeof obj.client !== "object" || typeof obj.base !== "object" || typeof obj.local !== "function") {
      throw new Error("must be object => { name, client, base, local }");
    }
    const { ajaxJson, returnGet } = GeneralJs;
    const { mode, name, client, base, local } = obj;
    let belowTarget, removeTargets, getObj;

    this.setGeneralBase(base, typeof obj.background === "number" ? obj.background : 0, mode, name);
    await local();

    if (this.media[4]) {
      this.footerMake('A', "gradientGreen", true);
      belowTarget = document.querySelector(".mofooterbelow");
      belowTarget.removeChild(belowTarget.firstChild);
      removeTargets = belowTarget.querySelectorAll("a");
      for (let dom of removeTargets) {
        belowTarget.removeChild(dom);
      }
      this.homeliaisonTalk({}, true);
    } else {
      this.footerMake();
      this.homeliaisonTalk();
    }
    this.totalContents.style.height = "auto";

    getObj = returnGet();
    if (getObj.mode !== "test" && getObj.view !== "test") {
      await ajaxJson({
        page: name,
        mode: "page",
        liteMode: returnGet().mode === "lite",
        cliid: client.cliid,
      }, "/ghostClient_updateAnalytics");
    }

  } catch (e) {
    await GeneralJs.ajaxJson({ message: "GeneralJs.ghostClientLaunching : " + e.message }, "/errorLog");
  }
}
