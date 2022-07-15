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
  this.backHeight = <%% 860, 840, 700, 640, 80 %%>;
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

  this.firstPageViewTime = new Date();
  instance.firstPageViewTime = new Date();
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
          background: desktop ? (this.backgroundType === 1 ? colorChip.gray0 : colorChip.gray2) : colorChip.gray1,
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
          backgroundSize: this.backgroundType !== 1 ? ((!media[3] && !media[4]) ? "100% auto" : "auto 100%") : (mobile ? "auto 100%" : "100% auto"),
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
          background: desktop ? (this.backgroundType === 1 ? colorChip.gray0 : colorChip.gray2) : colorChip.gray1,
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
  const { createNode, createNodes, colorChip, withOut, blankHref, selfHref, isMac, setQueue } = GeneralJs;
  const touchStartConst = "mainNavigatorTouchStartConstName";
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
  let hamburgerEvent;
  let mobileHrefEvent;

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
      href: FRONTHOST + "/consulting.php",
      green: [ "clientConsulting" ],
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
      zIndex: String(100),
    }
  });

  createNode({
    mother: naviBase,
    mode: "svg",
    source: this.returnLogo(blackMode ? colorChip.white : colorChip.green, 0),
    class: [ desktop ? "hoverDefault" : "hoverDefault_mobile" ],
    event: {
      click: (e) => {
        selfHref(frontPage);
      },
      touchstart: (e) => {
        selfHref(frontPage);
      },
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
            position: "relative",
            top: String(isMac() ? 0 : 2) + ea,
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
      mobileHrefEvent = function (e) {
        const index = Number(this.getAttribute("index"));
        selfHref(naviMenu[index].href);
      }
      for (let i = 0; i < naviMenu.length; i++) {
        createNode({
          mother: mobileMenuTong.firstChild.firstChild,
          attribute: {
            index: String(i)
          },
          event: {
            click: mobileHrefEvent,
            selectstart: function (e) {
              e.preventDefault();
            },
            touchstart: function (e) {
              const self = this;
              self.setAttribute(touchStartConst, "on");
              setQueue(() => {
                self.setAttribute(touchStartConst, "off");
              });
            },
            touchend: function (e) {
              if (this.getAttribute(touchStartConst) === "on") {
                mobileHrefEvent.call(this, e);
              }
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

      hamburgerEvent = function (e) {
        const toggle = mobileMenuTong.getAttribute("toggle");
        if (toggle === "off") {
          mobileMenuTong.style.height = String(mobileMenuHeight) + "px";
          mobileMenuTong.setAttribute("toggle", "on");
        } else {
          mobileMenuTong.style.height = String(0) + "px";
          mobileMenuTong.setAttribute("toggle", "off");
        }
      }

      createNode({
        mother: naviBase,
        mode: "svg",
        source: this.returnHamburger(colorChip.black),
        event: {
          click: function (e) {
            hamburgerEvent.call(this, e)
          },
          touchstart: function (e) {
            const self = this;
            self.setAttribute(touchStartConst, "on");
            setQueue(() => {
              self.setAttribute(touchStartConst, "off");
            });
          },
          touchend: function (e) {
            if (this.getAttribute(touchStartConst) === "on") {
              hamburgerEvent.call(this, e);
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
      animation: mobile ? "" : "fadeupdelay 0.5s ease forwards",
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
  if (this.backgroundType !== 2) {
    this.setBackground(binaryPath, obj.secondBackground === true, random);
    this.setNavigator(subTitle, mode === "ghost", name);
    this.setBaseTong(instance);
  } else {
    this.setNavigator(subTitle, mode === "ghost", name);
  }
}

GeneralJs.prototype.ghostDesignerLaunching = async function (obj) {
  const instance = this;
  try {
    if (typeof obj !== "object") {
      throw new Error("must be object => { name, client, base, local }");
    }
    if (typeof obj.name !== "string" || typeof obj.client !== "object" || typeof obj.base !== "object" || typeof obj.local !== "function") {
      throw new Error("must be object => { name, client, base, local }");
    }
    const { ajaxJson, returnGet, homeliaisonAnalytics, setDebounce, dateToString } = GeneralJs;
    const { mode, name, client, base, local } = obj;
    let belowTarget, removeTargets, getObj;

    this.backgroundType = base.backgroundType;
    if (base.backgroundType === 1) {
      this.backHeight = <%% 420, 420, 375, 320, 94 %%>;
      base.instance.backHeight = this.backHeight;
    }

    base.instance.pageName = name;
    base.instance.mother.pageName = name;
    this.setGeneralBase(base, typeof obj.background === "number" ? obj.background : 0, mode, name);
    await local();
    this.footerMake();
    this.greenTalk(typeof base.talk === "object" ? base.talk : null);

    this.totalContents.style.height = "auto";

    getObj = returnGet();
    if (getObj.mode !== "test" && getObj.view !== "test" && client !== null) {
      await ajaxJson({
        page: name,
        mode: "page",
        liteMode: returnGet().mode === "lite",
        cliid: client.cliid,
      }, "/ghostClient_updateAnalytics");
    }
    homeliaisonAnalytics({
      page: base.instance.pageName,
      standard: base.instance.firstPageViewTime,
      action: "pageInit",
      data: {
        cliid: client !== null ? client.cliid : "null",
        href: window.encodeURIComponent(window.location.href),
        date: dateToString(new Date(), true),
      },
    }).then((json) => {
      base.instance.googleClientId = json.data.id;
      base.instance.mother.googleClientId = json.data.id;
      base.instance.userInfo = json;
    }).catch((err) => {
      console.log(err);
    });

    GeneralJs.stacks["__topLevelScrollDebounceConst__"] = 0;
    window.addEventListener("scroll", (e) => {
      setDebounce(() => {
        if (GeneralJs.stacks["__topLevelScrollDebounceConst__"] === 0) {
          homeliaisonAnalytics({
            page: base.instance.pageName,
            standard: base.instance.firstPageViewTime,
            action: "scrollStop",
            data: {
              cliid: client !== null ? client.cliid : "null",
              scroll: window.scrollY,
              total: ((document.body.getBoundingClientRect() !== null && document.body.getBoundingClientRect() !== undefined) ? document.body.getBoundingClientRect().height : 0),
              screen: window.innerHeight,
              date: dateToString(new Date(), true),
            },
          }).catch((err) => {
            console.log(err);
          });
          GeneralJs.stacks["__topLevelScrollDebounceConst__"] = 1;
        }
      }, "__topLevelScrollDebounceEvent__");
    });

  } catch (e) {
    await GeneralJs.ajaxJson({ message: "GeneralJs.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
  }
}
