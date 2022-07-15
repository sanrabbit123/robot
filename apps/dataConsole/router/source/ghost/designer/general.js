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

GeneralJs.prototype.setBackground = function () {
  const instance = this;
  const { ea, media, backHeight, totalContents } = this;
  const { createNodes, colorChip, withOut } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  let backgroundImageName;
  let backgroundGray, backgroundImageBox;
  let binaryPath;

  binaryPath = FRONTHOST + "/middle/console";
  backgroundImageName = "back.jpg";

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
        backgroundImage: "url('" + binaryPath + "/" + backgroundImageName + "')",
        backgroundSize: ((!media[3] && !media[4]) ? "100% auto" : "auto 100%"),
        backgroundPosition: "top",
        animation: "justfadeinoriginal 0.3s ease forwards",
      }
    }
  ]);
  this.backgroundGray = backgroundGray;
  this.backgroundImageBox = backgroundImageBox;
  this.backgroundImageBox2 = null;

}

GeneralJs.prototype.setNavigator = function () {
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

  if (desktop) {
    wordTop = wordTop + (GeneralJs.isMac() ? 0 : 1);
  }

  naviBase = createNode({
    mother: totalContents,
    class: [ "backblurdefault_lite" ],
    style: {
      position: "fixed",
      background: colorChip.gradientGray,
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
    source: this.returnLogo(colorChip.white, 0),
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

  createNode({
    mother: naviBase,
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
      paddingBottom: String(baseTop) + ea,
      animation: mobile ? "" : "fadeupdelay 0.5s ease forwards",
    }
  });

  this.baseTop = baseTop;
  this.baseTong = baseTong;
  child.baseTop = this.baseTop;
  child.baseTong = this.baseTong;
}

GeneralJs.prototype.setGeneralBase = function (obj) {
  if (typeof obj !== "object") {
    throw new Error("must be object => { instance, binaryPath, subTitle }");
  }
  if (obj.instance === undefined || typeof obj.binaryPath !== "string" || typeof obj.subTitle !== "string") {
    throw new Error("must be object => { instance, binaryPath, subTitle }");
  }
  const { instance, subTitle } = obj;
  this.setBackground();
  this.setNavigator();
  this.setBaseTong(instance);
}

GeneralJs.prototype.ghostDesignerLaunching = async function (obj) {
  const instance = this;
  try {
    if (typeof obj !== "object") {
      throw new Error("must be object => { name, designer, base, local }");
    }
    if (typeof obj.name !== "string" || typeof obj.designer !== "object" || typeof obj.base !== "object" || typeof obj.local !== "function") {
      throw new Error("must be object => { name, designer, base, local }");
    }
    const { ajaxJson, returnGet, homeliaisonAnalytics, setDebounce, dateToString, colorChip } = GeneralJs;
    const { name, designer, base, local } = obj;

    base.instance.pageName = name;
    base.instance.mother.pageName = name;
    this.setGeneralBase(base);
    await local();
    this.footerMake(colorChip.gradientBlack);
    this.totalContents.style.height = "auto";

  } catch (e) {
    await GeneralJs.ajaxJson({ message: "GeneralJs.ghostDesignerLaunching : " + e.message }, BACKHOST + "/errorLog");
  }
}
