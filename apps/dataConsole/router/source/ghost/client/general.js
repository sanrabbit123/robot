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

GeneralJs.prototype.setBackground = function (binaryPath) {
  const instance = this;
  const { ea, media } = this;
  const { backHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let backGray, backImage;
  let style;
  let backgroundImageName;

  backgroundImageName = "back.jpg";

  backGray = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    top: String(0),
    left: String(0),
    width: String(100) + '%',
    height: String(100) + '%',
    background: desktop ? GeneralJs.colorChip.gray2 : GeneralJs.colorChip.gray1,
    animation: "justfadeinoriginal 0.3s ease forwards",
  };
  for (let i in style) {
    backGray.style[i] = style[i];
  }
  this.totalContents.appendChild(backGray);

  backImage = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    top: String(0),
    left: String(0),
    width: String(100) + '%',
    height: String(backHeight) + ea,
    backgroundImage: "url('" + DesignerProposalJs.binaryPath + "/" + backgroundImageName + "')",
    backgroundSize: (!media[3] && !media[4]) ? "100% auto" : "auto 100%",
    backgroundPosition: "top",
    animation: "justfadeinoriginal 0.3s ease forwards",
  };
  for (let i in style) {
    backImage.style[i] = style[i];
  }
  this.totalContents.appendChild(backImage);
}

GeneralJs.prototype.setNavigator = function () {
  const instance = this;
  let { ea, standardWidth, media } = this;
  let mobile = media[4];
  let desktop = !mobile;
  let naviBase, logo;
  let style;
  let iconHeight, iconTop;
  let wordHeight, wordSize, wordTop;
  let height, width;
  let nameTong;
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

  naviBase = GeneralJs.nodes.div.cloneNode(true);
  naviBase.classList.add("backblurdefault_lite");
  style = {
    position: "fixed",
    background: GeneralJs.colorChip.gradientGray,
    height: String(this.naviHeight) + ea,
    width: String(100) + '%',
    top: String(0),
    left: String(0),
    zIndex: String(1),
  };
  for (let i in style) {
    naviBase.style[i] = style[i];
  }

  logo = SvgTong.stringParsing(this.mother.returnLogo(GeneralJs.colorChip.white, 0));
  logo.classList.add("hoverDefault");
  style = {
    position: "absolute",
    top: String(iconTop) + ea,
    left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
    height: String(iconHeight) + ea,
    width: String(iconHeight * SvgTong.getRatio(logo)) + ea,
  };
  if (mobile) {
    style.left = String(mobileMargin) + ea;
  }
  for (let i in style) {
    logo.style[i] = style[i];
  }
  logo.addEventListener("click", function (e) {
    window.location.href = instance.frontPage;
  });
  naviBase.appendChild(logo);

  nameTong = GeneralJs.nodes.div.cloneNode(true);
  nameTong.textContent = this.client.name + " 고객님 제안서";
  style = {
    position: "absolute",
    top: String(wordTop) + ea,
    right: "calc(50% - " + String(standardWidth / 2) + ea + ")",
    height: String(wordHeight) + ea,
    width: String(200) + ea,
    fontSize: String(wordSize) + ea,
    fontWeight: String(300),
    textAlign: "right",
    wordSpacing: String(-1) + ea,
    color: GeneralJs.colorChip.white,
  };
  if (mobile) {
    style.right = String(mobileMargin) + ea;
  }
  for (let i in style) {
    nameTong.style[i] = style[i];
  }
  naviBase.appendChild(nameTong);

  this.totalContents.appendChild(naviBase);

}

GeneralJs.prototype.setBaseTong = function () {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let baseTong;
  let style;
  let baseTop;

  baseTop = <%% 200, 200, 170, 140, 10 %%>;

  baseTong = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    width: String(this.standardWidth) + ea,
    left: "calc(50% - " + String(this.standardWidth / 2) + ea + ")",
    paddingTop: String(baseTop) + ea,
    animation: "fadeupdelay 0.5s ease forwards",
  };
  if (mobile) {
    style.paddingTop = "calc(" + String(this.naviHeight) + "px" + " + " + String(baseTop) + ea + ")";
  }
  for (let i in style) {
    baseTong.style[i] = style[i];
  }

  this.baseTong = baseTong;
  this.totalContents.appendChild(baseTong);
}
