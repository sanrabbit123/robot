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
  backHeight = 800;
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

  blockHeight = this.backHeight - 360;
  bottomMargin = 16;
  margin = 52;
  leftRatio = 0.3;

  titleFont = 32;
  titleLeft = 8;
  titleFontWeight = 500;
  wordSpacing = -3;

  barWidth = 80;
  barLeft = titleLeft + 244;

  indexFont = 20;
  indexFontWeight = 200;

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
    borderBottom: "1px solid #dddddd",
    top: String(titleFont * (62 / 30)) + ea,
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
    position: "relative",
    width: "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")",
    height: "calc(100% - " + String(margin * 2) + ea + ")",
    marginTop: String(margin) + ea,
    marginBottom: String(margin) + ea,
    marginRight: String(margin) + ea,
  };
  for (let i in style) {
    rightBox.style[i] = style[i];
  }
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
