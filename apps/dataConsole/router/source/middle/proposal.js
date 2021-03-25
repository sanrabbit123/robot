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
  "meta": {
    "title": [
      "thisPerson",
      "return (thisPerson.name + ' 고객님 제안서');"
    ],
    "description": [
      "thisPerson",
      "return (thisPerson.name + ' 고객님 디자이너 제안 페이지입니다.');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ]
  }
} %/%/g

const ProposalJs = function () {
  this.mother = new GeneralJs();
  this.margin = 0;
  this.mode = "desktop";
  this.sero = false;
  this.totalContents = document.getElementById("totalcontents");
  this.frontPage = "https://home-liaison.com";
  this.standardWidth = 1400;
  this.ea = "px";
  this.baseTong = null;
  this.backHeight = 0;
  this.project = null;
  this.client = null;
  this.proposal = null;
}

ProposalJs.binaryPath = "/middle/proposal";

ProposalJs.prototype.setBackground = function () {
  const instance = this;
  let backGray, backImage;
  let style;
  let ea;
  let backHeight;
  let backgroundImageName;

  ea = this.ea;
  backHeight = 760;
  this.backHeight = backHeight;
  backgroundImageName = "back.jpg";

  backGray = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    top: String(0),
    left: String(0),
    width: String(100) + '%',
    height: String(5000) + ea,
    background: GeneralJs.colorChip.gray2,
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
    backgroundImage: "url('" + ProposalJs.binaryPath + "/" + backgroundImageName + "')",
    backgroundSize: "100% auto",
    backgroundPosition: "top",
    animation: "justfadeinoriginal 0.3s ease forwards",
  };
  for (let i in style) {
    backImage.style[i] = style[i];
  }
  this.totalContents.appendChild(backImage);
}

ProposalJs.prototype.setNavigator = function () {
  const instance = this;
  let naviBase, logo;
  let style;
  let ea;
  let standardWidth;
  let iconHeight, iconWidth, iconTop;
  let wordHeight, wordSize, wordTop;
  let height, width;
  let nameTong;

  ea = this.ea;
  standardWidth = this.standardWidth;
  iconHeight = 23;
  iconWidth = 165;
  iconTop = 21;
  wordHeight = 20;
  wordSize = 15;
  wordTop = 24;

  naviBase = GeneralJs.nodes.div.cloneNode(true);
  naviBase.classList.add("backblurdefault_lite");
  style = {
    position: "fixed",
    background: GeneralJs.colorChip.gradientGray,
    height: String(72) + ea,
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
    width: String(iconWidth) + ea,
  };
  for (let i in style) {
    logo.style[i] = style[i];
  }
  logo.addEventListener("click", function (e) {
    window.location.href = instance.frontPage;
  })
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
  for (let i in style) {
    nameTong.style[i] = style[i];
  }
  naviBase.appendChild(nameTong);

  this.totalContents.appendChild(naviBase);

}

ProposalJs.prototype.setBaseTong = function () {
  const instance = this;
  let baseTong;
  let style;
  let ea = this.ea;
  let baseTop;

  baseTop = 200;

  baseTong = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    width: String(this.standardWidth) + ea,
    left: "calc(50% - " + String(this.standardWidth / 2) + ea + ")",
    top: String(baseTop) + ea,
    height: String(3000) + ea,
    animation: "fadeupdelay 0.5s ease forwards",
  };
  for (let i in style) {
    baseTong.style[i] = style[i];
  }

  this.baseTong = baseTong;
  this.totalContents.appendChild(baseTong);
}

ProposalJs.prototype.insertInitBox = function () {
  const instance = this;
  const { client, ea } = this;
  let whiteBlock;
  let style;
  let blockHeight, bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let leftRatio;
  let wordSpacing;
  let titleFont, titleLeft, titleFontWeight;
  let barWidth, barLeft;
  let indexFont, indexFontWeight;
  let doubleQuote;
  let quoteTop, quoteLeft, quoteHeight, quoteWidth, quoteMarginBottom;
  let initWordingSize, initWordingHeight, initWordingWordSpacing, initWordingLineHeight;
  let factorBox, clientFactor, factorStyle;
  let factorBoxWidth, factorBoxTop, factorBoxTopVisual;
  let factorPaddingLeft, factorPaddingTop;
  let factorTitle, factorTitleStyle;
  let factors;
  let factorSize;
  let factorBar, factorBarStyle;
  let factorBarWidth, factorBarTop;
  let factorArrowHead, factorArrowHeadStyle;
  let factorArrowHeadWidth;
  let factorArrowHeadTop, factorArrowHeadLeft;
  let factorValue, factorValueStyle;
  let factorValueBottom, factorValueRight;
  let factorsValueDoms;
  let factorValueMargin, factorValueHeadMargin;
  let designerBox;
  let desigerBoxWidth, desigerBoxHeight;
  let targetDesigners;
  let designerFactor;
  let designerBar;
  let designerFactorTitleSize, designerFactorSize, designerFactorHeight;

  blockHeight = this.backHeight - 360;
  bottomMargin = 16;
  margin = 52;
  leftRatio = 0.32;

  titleFont = 31;
  titleLeft = 8;
  titleFontWeight = 500;
  wordSpacing = -3;

  barWidth = 80;
  barLeft = titleLeft + 234;

  indexFont = 20;
  indexFontWeight = 200;

  quoteTop = 8;
  quoteHeight = 12;
  quoteMarginBottom = 7;
  quoteLeft = 2;

  initWordingHeight = 20;
  initWordingSize = 15.5;
  initWordingWordSpacing = -1;
  initWordingLineHeight = 9;

  factorBoxWidth = 630;
  factorBoxTop = 100;
  factorBoxTopVisual = 8;

  factorPaddingLeft = 10;
  factorPaddingTop = 10;
  factorSize = 17.5;
  factors = [
    { title: "예산", value: "2,500만원" },
    { title: "가족 구성원", value: "부부, 딸 1, 아들 1" },
    { title: "면적", value: "47평" },
    { title: "계약 형태", value: "자가" },
    { title: "입주 예정일", value: "21년 3월 20일" },
    { title: "공간 상태", value: "방 3, 화장실 1, 확장" }
  ];
  factorsValueDoms = new Array(factors.length);
  factorsBarDoms = new Array(factors.length);
  factorsBarHeadDoms = new Array(factors.length);
  factorBarWidth = 200;
  factorBarTop = 42;
  factorArrowHeadWidth = 8;
  factorArrowHeadTop = 38;
  factorArrowHeadLeft = 188;

  factorValueBottom = 11;
  factorValueRight = 36;

  factorValueMargin = 46;
  factorValueHeadMargin = 10;

  desigerBoxWidth = 240;
  desigerBoxHeight = 52;

  targetDesigners = [
    "임은숙",
    "김남희",
    "김지은"
  ];
  designerFactorTitleSize = 15;
  designerFactorSize = 22;
  designerFactorHeight = 20;

  whiteBlock = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    borderRadius: String(5) + ea,
    width: String(100) + '%',
    height: String(blockHeight) + ea,
    background: GeneralJs.colorChip.white,
    marginBottom: String(bottomMargin) + ea,
    boxShadow: "0px 5px 12px -10px #aaaaaa",
  };
  for (let i in style) {
    whiteBlock.style[i] = style[i];
  }

  //left area
  leftBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    display: "inline-block",
    position: "relative",
    width: "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(leftRatio) + ")",
    height: "calc(100% - " + String(margin * 2) + ea + ")",
    marginTop: String(margin) + ea,
    marginBottom: String(margin) + ea,
    marginLeft: String(margin) + ea,
  };
  for (let i in style) {
    leftBox.style[i] = style[i];
  }

  //main title
  titleBox = GeneralJs.nodes.div.cloneNode(true);
  titleBox.textContent = "당신에게 딱 맞는 디자이너,";
  style = {
    position: "absolute",
    fontSize: String(titleFont) + ea,
    fontWeight: String(titleFontWeight),
    wordSpacing: String(wordSpacing) + ea,
    top: String(0) + ea,
    left: String(titleLeft) + ea,
    color: GeneralJs.colorChip.black,
  };
  for (let i in style) {
    titleBox.style[i] = style[i];
  }
  leftBox.appendChild(titleBox);

  titleBox = GeneralJs.nodes.div.cloneNode(true);
  titleBox.textContent = "이 곳 홈리에종에서";
  style = {
    position: "absolute",
    fontSize: String(titleFont) + ea,
    fontWeight: String(titleFontWeight),
    wordSpacing: String(wordSpacing) + ea,
    top: String(titleFont * 1.45) + ea,
    left: String(titleLeft) + ea,
    color: GeneralJs.colorChip.black,
  };
  for (let i in style) {
    titleBox.style[i] = style[i];
  }
  leftBox.appendChild(titleBox);

  barBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
    top: String(titleFont * (63 / 30)) + ea,
    left: String(barLeft) + ea,
    width: String(barWidth) + ea,
  };
  for (let i in style) {
    barBox.style[i] = style[i];
  }
  leftBox.appendChild(barBox);

  //index box
  indexBox = GeneralJs.nodes.div.cloneNode(true);
  indexBox.textContent = "0";
  style = {
    position: "absolute",
    fontSize: String(indexFont) + ea,
    fontWeight: String(indexFontWeight),
    wordSpacing: String(wordSpacing) + ea,
    bottom: String(0) + ea,
    left: String(titleLeft) + ea,
    color: GeneralJs.colorChip.black,
  };
  for (let i in style) {
    indexBox.style[i] = style[i];
  }
  leftBox.appendChild(indexBox);

  whiteBlock.appendChild(leftBox);

  //right area
  rightBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    display: "inline-block",
    position: "absolute",
    top: String(0) + ea,
    width: "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")",
    height: "calc(100% - " + String(margin * 2) + ea + ")",
    marginTop: String(margin) + ea,
    marginBottom: String(margin) + ea,
    marginRight: String(margin) + ea,
  };
  for (let i in style) {
    rightBox.style[i] = style[i];
  }

  //quote
  doubleQuote = SvgTong.stringParsing(this.mother.returnQuotes(GeneralJs.colorChip.green));
  quoteWidth = SvgTong.getRatio(doubleQuote) * quoteHeight;
  style = {
    position: "absolute",
    top: String(quoteTop) + ea,
    left: String(quoteLeft) + ea,
    width: String(quoteWidth) + ea,
    height: String(quoteHeight) + ea,
  };
  for (let i in style) {
    doubleQuote.style[i] = style[i];
  }
  rightBox.appendChild(doubleQuote);

  //init wording - 0
  initWordingBox = GeneralJs.nodes.div.cloneNode(true);
  initWordingBox.textContent = "김연희 고객님께 고객 맞춤 커스터마이징 : 토탈 스타일링 서비스를 제안드립니다.";
  style = {
    position: "absolute",
    top: String(quoteTop + quoteHeight + quoteMarginBottom) + ea,
    left: String(0) + ea,
    width: String(100) + '%',
    height: String(initWordingHeight) + ea,
    fontSize: String(initWordingSize) + ea,
    fontWeight: String(400),
    wordSpacing: String(initWordingWordSpacing) + ea,
  };
  for (let i in style) {
    initWordingBox.style[i] = style[i];
  }
  rightBox.appendChild(initWordingBox);

  //init wording - 1
  initWordingBox = GeneralJs.nodes.div.cloneNode(true);
  initWordingBox.textContent = "담당 디자이너가 고객님의 전체 가용 예산을 시공 / 제작가구 / 구매가구 / 패브릭 소품 등을 위해 적절히 분배하여 제안합니다.";
  style = {
    position: "absolute",
    top: String(quoteTop + quoteHeight + quoteMarginBottom + initWordingSize + initWordingLineHeight) + ea,
    left: String(0) + ea,
    width: String(100) + '%',
    height: String(initWordingHeight) + ea,
    fontSize: String(initWordingSize) + ea,
    fontWeight: String(400),
    wordSpacing: String(initWordingWordSpacing) + ea,
  };
  for (let i in style) {
    initWordingBox.style[i] = style[i];
  }
  rightBox.appendChild(initWordingBox);

  //client factors
  factorBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    top: String(factorBoxTop + factorBoxTopVisual) + ea,
    width: String(factorBoxWidth) + ea,
    height: "calc(100% - " + String(factorBoxTop) + ea + ")",
  };
  for (let i in style) {
    factorBox.style[i] = style[i];
  }

  factorStyle = {
    display: "inline-block",
    position: "relative",
    width: "calc(calc(100% / " + String(2) + ") - " + String(factorPaddingLeft * 2) + ea + ")",
    height: "calc(calc(100% / " + String(3) + ") - " + String(factorPaddingTop * 2) + ea + ")",
    paddingBottom: String(factorPaddingTop * 2) + ea,
    paddingRight: String(factorPaddingLeft * 2) + ea,
  };

  factorTitleStyle = {
    position: "absolute",
    fontSize: String(factorSize) + ea,
    fontWeight: String(600),
    top: String(0),
    left: String(0),
    wordSpacing: String(initWordingWordSpacing) + ea,
  };

  factorBarStyle = {
    position: "absolute",
    borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
    width: String(100) + '%',
    top: String(factorBarTop) + ea,
  };

  factorArrowHeadStyle = {
    position: "absolute",
    borderRight: "1px solid " + GeneralJs.colorChip.gray3,
    borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
    top: String(factorArrowHeadTop) + ea,
    left: String(factorArrowHeadLeft) + ea,
    width: String(factorArrowHeadWidth) + ea,
    height: String(factorArrowHeadWidth) + ea,
    transform: "rotate(-45deg)",
  };

  factorValueStyle = {
    position: "absolute",
    fontSize: String(factorSize) + ea,
    fontWeight: String(200),
    color: GeneralJs.colorChip.green,
    bottom: String(factorValueBottom) + ea,
    right: String(factorValueRight) + ea,
    wordSpacing: String(initWordingWordSpacing) + ea,
  };

  for (let i = 0; i < factors.length; i++) {
    clientFactor = GeneralJs.nodes.div.cloneNode(true);
    for (let j in factorStyle) {
      clientFactor.style[j] = factorStyle[j];
    }

    factorTitle = GeneralJs.nodes.div.cloneNode(true);
    factorTitle.textContent = factors[i].title;
    for (let j in factorTitleStyle) {
      factorTitle.style[j] = factorTitleStyle[j];
    }
    clientFactor.appendChild(factorTitle);

    factorBar = GeneralJs.nodes.div.cloneNode(true);
    for (let j in factorBarStyle) {
      factorBar.style[j] = factorBarStyle[j];
    }
    clientFactor.appendChild(factorBar);
    factorsBarDoms[i] = factorBar;

    factorArrowHead = GeneralJs.nodes.div.cloneNode(true);
    for (let j in factorArrowHeadStyle) {
      factorArrowHead.style[j] = factorArrowHeadStyle[j];
    }
    clientFactor.appendChild(factorArrowHead);
    factorsBarHeadDoms[i] = factorArrowHead;

    factorValue = GeneralJs.nodes.div.cloneNode(true);
    factorValue.textContent = factors[i].value;
    for (let j in factorValueStyle) {
      factorValue.style[j] = factorValueStyle[j];
    }
    clientFactor.appendChild(factorValue);
    factorsValueDoms[i] = factorValue;

    factorBox.appendChild(clientFactor);
  }

  GeneralJs.timeouts["factorsValueDoms"] = setTimeout(function () {
    let width;
    for (let i = 0; i < factorsValueDoms.length; i++) {
      width = factorsBarDoms[i].getBoundingClientRect().width - factorsValueDoms[i].getBoundingClientRect().width - factorValueMargin;
      factorsBarDoms[i].style.width = String(width) + ea;
      factorsBarHeadDoms[i].style.left = String(width - factorValueHeadMargin) + ea;
    }
    clearTimeout(GeneralJs.timeouts["factorsValueDoms"]);
    GeneralJs.timeouts["factorsValueDoms"] = null;
  }, 0);

  rightBox.appendChild(factorBox);


  designerBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    bottom: String(factorValueBottom - factorBoxTopVisual + 1) + ea,
    right: String(0) + ea,
    width: String(desigerBoxWidth) + ea,
    height: String(desigerBoxHeight) + ea,
  };
  for (let i in style) {
    designerBox.style[i] = style[i];
  }

  designerTitle = GeneralJs.nodes.div.cloneNode(true);
  designerTitle.textContent = "추천 디자이너 :";
  style = {
    position: "absolute",
    top: String(0) + ea,
    left: String(1) + ea,
    fontSize: String(designerFactorTitleSize) + ea,
    fontWeight: String(300),
  };
  for (let i in style) {
    designerTitle.style[i] = style[i];
  }
  designerBox.appendChild(designerTitle);

  for (let i = 0; i < targetDesigners.length; i++) {
    designerFactor = GeneralJs.nodes.div.cloneNode(true);
    designerFactor.textContent = targetDesigners[i];
    style = {
      fontSize: String(designerFactorSize) + ea,
      fontWeight: String(500),
      width: "calc(100% / 3)",
      display: "inline-block",
      position: "absolute",
      bottom: String(0),
      textAlign: ([ "left", "center", "right" ])[i % 3],
      left: "calc(calc(100% / 3) * " + String(i % 3) + ")",
    };
    for (let j in style) {
      designerFactor.style[j] = style[j];
    }
    if (i % 3 !== 1) {
      designerBar = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        borderLeft: "1px solid " + GeneralJs.colorChip.green,
        height: String(designerFactorHeight) + ea,
        bottom: String(2) + ea,
        right: "calc(calc(100% / 3) / " + String(4) + ")",
      };
      if (i % 3 === 2) {
        style.borderRight = "1px solid " + GeneralJs.colorChip.green;
        style.left = "calc(calc(100% / 3) / " + String(4) + ")";
        delete style.borderLeft;
        delete style.right;
      }
      for (let j in style) {
        designerBar.style[j] = style[j];
      }
      designerFactor.appendChild(designerBar);
    }
    designerBox.appendChild(designerFactor);
  }

  rightBox.appendChild(designerBox);

  whiteBlock.appendChild(rightBox);

  this.baseTong.appendChild(whiteBlock);
}

ProposalJs.prototype.insertDesignerBoxes = function () {
  const instance = this;
  let whiteBlock;
  let style;
  let ea = this.ea;
  let blockHeight, bottomMargin;

  blockHeight = 820;
  bottomMargin = 16;

  console.log(this.proposal);
  console.log(this.proposal.detail);

  for (let z = 0; z < this.proposal.detail.length; z++) {
    whiteBlock = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      borderRadius: String(5) + ea,
      width: String(100) + '%',
      height: String(blockHeight) + ea,
      background: GeneralJs.colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px #aaaaaa",
    };
    for (let i in style) {
      whiteBlock.style[i] = style[i];
    }
    this.baseTong.appendChild(whiteBlock);
  }





}

ProposalJs.prototype.insertWordBox = function () {
  const instance = this;
}

ProposalJs.prototype.insertPannelBox = function () {
  const instance = this;
}

ProposalJs.prototype.setFooter = function () {
  const instance = this;
}

ProposalJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    const getObj = GeneralJs.returnGet();
    if (getObj.cliid === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = "https://home-liaison.com";
    }
    const { cliid } = getObj;
    let projects, project;
    let clients, client;

    //tablet
    if (window.innerWidth <= 1050 && window.innerWidth > 800) {
      this.modeMinus = 1;
      this.mode = "tablet";
      this.sero = false;
      this.standardWidth = 900;
      this.ea = "px";
    //small desktop
    } else if (window.innerWidth <= 1540 && window.innerWidth > 1050) {
      this.modeMinus = 1;
      this.mode = "smallDesktop";
      this.sero = false;
      this.standardWidth = 1050;
      this.ea = "px";
    //mobile
    } else if (window.innerWidth <= 800) {
      this.modeMinus = 1;
      this.mode = "mobile";
      this.sero = true;
      this.standardWidth = 100;
      this.ea = "vw";
    //desktop
    } else {
      this.modeMinus = 0;
      this.mode = "bigDesktop";
      this.sero = false;
      this.standardWidth = 1400;
      this.ea = "px";
    }

    if (this.modeMinus !== 0) {
      document.querySelector("style").insertAdjacentHTML("beforeend", "*{transition:all 0s ease}");
    }
    this.margin = 20;
    this.margin = this.margin - this.modeMinus;

    //set proposal, client info
    projects = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ cliid }), "/getProjects"));
    clients = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ cliid }), "/getClients"));
    if (projects.length === 0) {
      alert("아직 제안서가 만들어지지 않았습니다! 잠시만 기다려주세요 :)");
      window.location.href = "https://home-liaison.com";
      project = null;
    } else {
      projects.sort((a, b) => {
        return (new Date(b.proposal.date)).valueOf() - (new Date(a.proposal.date)).valueOf();
      });
      project = projects[0];
    }
    if (clients.length === 0) {
      alert("잘못된 접근입니다!");
      window.location.href = "https://home-liaison.com";
    }
    client = clients[0];
    this.project = project;
    this.client = client;
    this.proposal = project.proposal;

    //loading end
    await GeneralJs.sleep(500);
    loading.parentNode.removeChild(loading);

    //base setting
    this.setBackground();
    this.setNavigator();
    this.setBaseTong();

    //insert contents
    this.insertInitBox();
    this.insertDesignerBoxes();
    this.insertWordBox();
    this.insertPannelBox();

    //set footer
    this.setFooter();

  } catch (e) {
    console.log(e);
  }
}
