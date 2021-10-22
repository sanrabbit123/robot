GeneralJs.prototype.setGeneralProperties = function (instance) {
  this.totalContents = document.getElementById("totalcontents");
  this.frontPage = "https://home-liaison.com";
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

GeneralJs.prototype.setBackground = function (binaryPath, second = false) {
  const instance = this;
  const { ea, media, backHeight, totalContents } = this;
  const { createNodes, colorChip, withOut } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  const backgroundImageName = "back.jpg";
  const secondBackgroundImageName = "back2.jpg";
  let backgroundGray, backgroundImageBox, backgroundImageBox2;

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

GeneralJs.prototype.setNavigator = function (subTitle) {
  const instance = this;
  const { standardWidth, media, totalContents, naviHeight, frontPage } = this;
  const { createNode, createNodes, colorChip, withOut, blankHref } = GeneralJs;
  let { ea } = this;
  let mobile = media[4];
  let desktop = !mobile;
  let naviBase;
  let iconHeight, iconTop;
  let wordHeight, wordSize, wordTop;
  let height, width;
  let mobileMargin;

  iconHeight = <%% 22, 22, 20, 18, 16 %%>;
  iconTop = <%% 21, 21, 20, 18, 20 %%>;
  wordHeight = <%% 20, 20, 20, 20, 20 %%>;
  wordSize = <%% 15, 15, 15, 14, 13 %%>;
  wordTop = <%% 24, 24, 21, 19, 18 %%>;
  ea = desktop ? ea : "px";
  mobileMargin = 28;

  if (desktop) {
    wordTop = wordTop + (GeneralJs.isMac() ? 0 : 1);
  }

  naviBase = createNode({
    mother: totalContents,
    class: [ "backblurdefault_lite" ],
    style: {
      position: "fixed",
      background: colorChip.gradientGray,
      height: String(naviHeight) + ea,
      width: String(100) + '%',
      top: String(0),
      left: String(0),
      zIndex: String(1),
    }
  });

  createNodes([
    {
      mother: naviBase,
      mode: "svg",
      source: this.returnLogo(colorChip.white, 0),
      class: [ "hoverDefault" ],
      event: {
        click: (e) => {
          blankHref(frontPage);
        }
      },
      style: {
        position: "absolute",
        top: String(iconTop) + ea,
        left: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : String(mobileMargin) + ea,
        height: String(iconHeight) + ea,
      }
    },
    {
      mother: naviBase,
      text: subTitle,
      style: {
        position: "absolute",
        top: String(wordTop) + ea,
        right: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : String(mobileMargin) + ea,
        height: String(wordHeight) + ea,
        width: String(200) + ea,
        fontSize: String(wordSize) + ea,
        fontWeight: String(300),
        textAlign: "right",
        wordSpacing: String(-1) + ea,
        color: colorChip.white,
      }
    }
  ]);

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

GeneralJs.prototype.setGeneralBase = function (obj) {
  if (typeof obj !== "object") {
    throw new Error("must be object => { instance, binaryPath, subTitle }");
  }
  if (obj.instance === undefined || typeof obj.binaryPath !== "string" || typeof obj.subTitle !== "string") {
    throw new Error("must be object => { instance, binaryPath, subTitle }");
  }
  const { instance, binaryPath, subTitle } = obj;
  this.setBackground(binaryPath, obj.secondBackground === true);
  this.setNavigator(subTitle);
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
    const { name, client, base, local } = obj;
    let belowTarget, removeTargets, getObj;

    this.setGeneralBase(base);
    await local();

    if (this.media[4]) {
      this.footerMake('A', "gradientGreen", true);
      belowTarget = document.querySelector(".mofooterbelow");
      belowTarget.removeChild(belowTarget.firstChild);
      removeTargets = belowTarget.querySelectorAll("a");
      for (let dom of removeTargets) {
        belowTarget.removeChild(dom);
      }
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
