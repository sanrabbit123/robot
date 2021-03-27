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

class Designers extends Array {
  constructor(arr) {
    super();
    for (let i of arr) {
      this.push(i);
    }
  }
  searchDesigner(desid) {
    let target = null;
    for (let obj of this) {
      if (obj.desid === desid) {
        target = obj;
        break;
      }
    }
    return target;
  }
  search(desid) {
    return this.searchDesigner(desid);
  }
}

class ProposalMapFactor {
  constructor(obj) {
    if (typeof obj === "object") {
      if (obj.name !== undefined && obj.type !== undefined && obj.standard !== undefined && obj.value !== undefined) {
        for (let i in obj) {
          this[i] = obj[i];
        }
      } else {
        throw new Error("invaild property name");
      }
    } else {
      throw new Error("invaild property name");
    }
  }
}

class ProposalMap extends Array {

  constructor() {
    super();
    Object.defineProperty(this, "__properties__", {
        enumerable: false,
        value: []
    });
  }

  set(property, valueObj) {
    if (Object.keys(ProposalMap.prototype).includes(property)) {
      throw new Error("invaild property name");
    }
    const value = new ProposalMapFactor(valueObj);
    this.push(value);
    this.__properties__.push(property);
    this[property] = value;
  }

  get(property) {
    let result = null;
    if (this[property] !== undefined) {
      result = this[property];
    }
    return result;
  }

  getAllProperties() {
    return this.__properties__;
  }

  search() {

  }

}

class ProposalMapGenerator {
  analyticsMap(designer) {
    const today = new Date();
    const { information: { business: { career: { startY, startM } } }, analytics } = designer;

    console.log(analytics)

    const { styling: { tendency: { style: styleTendency }, method, furniture: { builtin, design }, fabric: { manufacture } }, construct: { possible: { supervision } }, purchase: { agencies, setting: { install, storage } }, project: { paperWork } } = analytics;
    let map = new ProposalMap();
    let career, monthAmount;

    monthAmount = ((today.getFullYear()) * 12 + (today.getMonth() + 1)) - ((startY * 12) + startM);
    career = String(Math.floor(monthAmount / 12)) + '년' + ' ' + String(monthAmount % 12) + "개월";

    map.set("career", {
      name: "경력",
      type: "string",
      standard: null,
      value: career
    });
    map.set("paperWork", {
      name: "페이퍼 워크",
      type: "checkbox",
      standard: [
        "도면",
        "3D",
        "컨셉 제안",
        "마감재 제안",
        "제품 리스트",
        "참고 이미지",
        "드로잉",
      ],
      value: paperWork
    });
    map.set("method", {
      name: "제안 방식",
      type: "radio",
      standard: [
        "순차 제안",
        "한번에 제안"
      ],
      value: method
    });
    map.set("builtin", {
      name: "빌트인 가구 제작",
      type: "radio",
      standard: [
        "가능",
        "불가능"
      ],
      value: (builtin ? "가능" : "불가능")
    });
    map.set("furniture", {
      name: "디자인 가구 제작",
      type: "radio",
      standard: [
        "가능",
        "불가능"
      ],
      value: (design ? "가능" : "불가능")
    });
    map.set("fabric", {
      name: "패브릭 직접 제작",
      type: "radio",
      standard: [
        "가능",
        "불가능"
      ],
      value: (manufacture ? "가능" : "불가능")
    });
    map.set("supervision", {
      name: "시공 감리 여부",
      type: "radio",
      standard: [
        "가능",
        "불가능"
      ],
      value: (supervision ? "가능" : "불가능")
    });
    map.set("agencies", {
      name: "구매 대행 여부",
      type: "radio",
      standard: [
        "제공",
        "미제공"
      ],
      value: (agencies ? "제공" : "미제공")
    });
    map.set("install", {
      name: "조립, 설치 서비스",
      type: "radio",
      standard: [
        "제공",
        "미제공"
      ],
      value: (install ? "제공" : "미제공")
    });
    map.set("storage", {
      name: "정리 수납 서비스",
      type: "radio",
      standard: [
        "제공",
        "미제공"
      ],
      value: (storage ? "제공" : "미제공")
    });
    map.set("styleTendency", {
      name: "스타일 경향성",
      type: "tendency",
      standard: [
        { column: "classic", name: "클래식" },
        { column: "exotic", name: "엑조틱" },
        { column: "mixmatch", name: "믹스매치" },
        { column: "modern", name: "모던" },
        { column: "natural", name: "내추럴" },
        { column: "oriental", name: "동양" },
        { column: "scandinavian", name: "북유럽" },
        { column: "vintage", name: "빈티지" }
      ],
      value: styleTendency
    });
    return map;
  }
}

const ProposalJs = function () {
  this.mother = new GeneralJs();
  this.map = new ProposalMapGenerator();
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
  this.whiteBoxNumbers = {
    leftMargin: 0,
    topMargin: 0
  };
}

//static

ProposalJs.binaryPath = "/middle/proposal";

ProposalJs.styleTextParsing = function (text) {
  const cssArr = text.split(';');
  let filterArr;
  let tempArr, finalObj;
  finalObj = {};

  filterArr = [];
  for (let i of cssArr) {
    if (/\:/.test(i)) {
      filterArr.push(i.trim());
    }
  }

  for (let i of filterArr) {
    tempArr = i.split(':');
    if (tempArr.length !== 2) {
      console.log(cssArr, filterArr);
      throw new Error("invaild css string");
    }
    if (/url\(/gi.test(tempArr[1].trim())) {
      finalObj[tempArr[0].trim()] = "url(\"" + S3HOST + tempArr[1].trim().replace(/^url\([\"\']/gi, '').replace(/[\"\']\)$/gi, '') + "\")";
    } else {
      finalObj[tempArr[0].trim()] = tempArr[1].trim();
    }
  }

  return finalObj;
}

//method

ProposalJs.prototype.setBackground = function () {
  const instance = this;
  let backGray, backImage;
  let style;
  let ea;
  let backHeight;
  let backgroundImageName;

  ea = this.ea;
  backHeight = 860;
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
  let topBox;
  let topBoxSize, topBoxWidth, topBoxHeight, topBoxRight;

  blockHeight = this.backHeight - 460;
  bottomMargin = 16;
  margin = 52;
  leftRatio = 0.32;

  titleFont = 31;
  titleLeft = 6;

  this.whiteBoxNumbers.leftMargin = margin + titleLeft;
  this.whiteBoxNumbers.topMargin = margin;

  titleFontWeight = 500;
  wordSpacing = -3;

  barWidth = 80;
  barLeft = titleLeft + 234;

  indexFont = 19;
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
  factorBoxTopVisual = <%% 5, 5, 5, 5 %%>;

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

  topBoxSize = 14;
  topBoxWidth = 700;
  topBoxHeight = 28;
  topBoxRight = 1;

  //total white box
  whiteBlock = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    borderRadius: String(8) + ea,
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
    color: GeneralJs.colorChip.gray4,
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
  initWordingBox.insertAdjacentHTML("beforeend", "김연희 고객님께 고객 맞춤 커스터마이징 : <b style=\"color:" + GeneralJs.colorChip.green + "\">" + GeneralJs.serviceParsing(this.project.service) + " 서비스</b>를 제안드립니다.");
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

  //fix arrow width and head
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

  //designer box
  designerBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    bottom: String(factorValueBottom - factorBoxTopVisual + 1) + ea,
    right: String(titleLeft) + ea,
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

  //top white wording
  topBox = GeneralJs.nodes.div.cloneNode(true);
  topBox.textContent = "HomeLiaison designer proposal  /  designer A  /  desinger B  /  desinger C";
  style = {
    position: "absolute",
    fontFamily: "graphik",
    fontWeight: String(200),
    fontSize: String(topBoxSize) + ea,
    top: String(-1 * topBoxHeight) + ea,
    right: String(topBoxRight) + ea,
    textAlign: "right",
    width: String(topBoxWidth) + ea,
    height: String(topBoxHeight) + ea,
    wordSpacing: String(initWordingWordSpacing) + ea,
    color: GeneralJs.colorChip.white,
  };
  for (let i in style) {
    topBox.style[i] = style[i];
  }
  whiteBlock.appendChild(topBox);

  //end
  this.baseTong.appendChild(whiteBlock);
}

ProposalJs.prototype.insertDesignerBoxes = function () {
  const instance = this;
  const { topMargin, leftMargin } = this.whiteBoxNumbers;
  let whiteBlock;
  let style;
  let ea = this.ea;
  let blockHeight, bottomMargin;

  blockHeight = 820;
  bottomMargin = 16;

  for (let z = 0; z < this.proposal.detail.length; z++) {
    whiteBlock = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      borderRadius: String(8) + ea,
      width: String(100) + '%',
      height: String(blockHeight) + ea,
      background: GeneralJs.colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px #aaaaaa",
    };
    for (let i in style) {
      whiteBlock.style[i] = style[i];
    }
    this.insertDesignerBox(whiteBlock, this.proposal.detail[z], z + 1);
    this.baseTong.appendChild(whiteBlock);
  }
}

ProposalJs.prototype.insertDesignerBox = function (mother, info, index) {
  const instance = this;
  const { ea } = this;
  const { topMargin, leftMargin } = this.whiteBoxNumbers;
  const { desid, designer, pictureSettings, description } = info;
  let bottomMarginVisual;
  let style;
  let designerTitle;
  let designerTitleSize;
  let titleWordSpacing, wordSpacing;
  let pictureDescription;
  let margin;
  let pictureBox;
  let pictureBoxHeight, pictureBoxWidth;
  let pictureStyle;
  let picture;
  let descriptionBox, descriptionDetailBox, descriptionPoint;
  let descriptionPaddingTop, descriptionPaddingBottom, descriptionPaddingLeft, descriptionPaddingRight;
  let descriptionMargin;
  let descriptionSize;
  let pointRadius;
  let pointLeftIndent, pointTop;
  let descriptionTitle;
  let descriptionTitleTop, descriptionTitleLeft, descriptionTitleSize;
  let designerTitleIndex;
  let indexFont, indexFontWeight;
  let analyticsBox;
  let analyticsBoxHeight, analyticsBoxTopMargin;
  let analyticsBoxTitle;
  let portfolioBox, portfolioBoxTitle;
  let portfolioBoxHeight;

  bottomMarginVisual = <%% 3, 3, 3, 3 %%>;

  designerTitleSize = <%% 20, 20, 20, 20 %%>;
  titleWordSpacing = <%% -2, -2, -2, -2 %%>;
  wordSpacing = <%% -1, -1, -1, -1 %%>;
  margin = <%% 18, 18, 18, 18 %%>;

  pictureBoxWidth = <%% 980, 980, 980, 980 %%>;
  pictureBoxHeight = pictureBoxWidth * (210 / 297);

  descriptionPaddingTop = <%% 22, 22, 22, 22 %%>;
  descriptionPaddingBottom = <%% descriptionPaddingTop + 2, descriptionPaddingTop + 2, descriptionPaddingTop + 2, descriptionPaddingTop + 2 %%>;
  descriptionPaddingLeft = <%% 28, 28, 28, 28 %%>;
  descriptionPaddingRight = <%% 20, 20, 20, 20 %%>;
  descriptionMargin = <%% 10, 10, 10, 10 %%>;
  descriptionSize = <%% 14.5, 14.5, 14.5, 14.5 %%>;

  descriptionTitleTop = <%% -30, -30, -30, -30 %%>;
  descriptionTitleLeft = <%% 1, 1, 1, 1 %%>;
  descriptionTitleSize = <%% 16, 16, 16, 16 %%>;

  pointRadius = <%% 2, 2, 2, 2 %%>;
  pointLeftIndent = <%% 5, 5, 5, 5 %%>;
  pointTop = <%% 9, 9, 9, 9 %%>;

  indexFont = <%% 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200 %%>;

  analyticsBoxHeight = <%% 300, 300, 300, 300 %%>;
  analyticsBoxTopMargin = <%% 50, 50, 50, 50 %%>;

  portfolioBoxHeight = <%% 150, 150, 150, 150 %%>;

  //mother padding
  mother.style.paddingTop = String(topMargin) + ea;
  mother.style.paddingBottom = String(leftMargin + bottomMarginVisual) + ea;
  mother.style.height = "";

  //title
  designerTitle = GeneralJs.nodes.div.cloneNode(true);
  designerTitle.insertAdjacentHTML("beforeend", "추천 디자이너 A&nbsp;&nbsp;<b style=\"color:" + GeneralJs.colorChip.gray3 + "\">></b>&nbsp;&nbsp;<b style=\"color:" + GeneralJs.colorChip.green + "\">" + designer + "</b>");
  style = {
    position: "relative",
    marginLeft: String(leftMargin) + ea,
    marginRight: String(leftMargin) + ea,
    width: "calc(100% - " + String(leftMargin * 2) + ea + ")",
    fontSize: String(designerTitleSize) + ea,
    fontWeight: String(500),
    wordSpacing: String(titleWordSpacing) + ea,
    marginBottom: String(margin) + ea,
  };
  for (let i in style) {
    designerTitle.style[i] = style[i];
  }

  //index
  designerTitleIndex = GeneralJs.nodes.div.cloneNode(true);
  designerTitleIndex.textContent = String(index);
  style = {
    position: "absolute",
    fontSize: String(indexFont) + ea,
    fontWeight: String(indexFontWeight),
    wordSpacing: String(wordSpacing) + ea,
    top: String(0) + ea,
    right: String(0) + ea,
    color: GeneralJs.colorChip.gray4,
  };
  for (let i in style) {
    designerTitleIndex.style[i] = style[i];
  }

  designerTitle.appendChild(designerTitleIndex);
  mother.appendChild(designerTitle);

  //picture and description
  pictureDescription = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    marginLeft: String(leftMargin) + ea,
    width: "calc(100% - " + String(leftMargin * 2) + ea + ")",
    height: String(pictureBoxHeight) + ea,
  };
  for (let i in style) {
    pictureDescription.style[i] = style[i];
  }

  //picture box
  pictureBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    width: String(pictureBoxWidth) + ea,
    height: String(pictureBoxHeight) + ea,
    background: "aliceblue",
  };
  for (let i in style) {
    pictureBox.style[i] = style[i];
  }

  //pictures
  for (let i of pictureSettings) {
    picture = GeneralJs.nodes.div.cloneNode(true);
    pictureStyle = ProposalJs.styleTextParsing(i.styleText);
    pictureStyle.position = "absolute";
    pictureStyle.borderRadius = String(3) + ea;
    pictureStyle.backgroundSize = "100% 100%";
    for (let j in pictureStyle) {
      picture.style[j] = pictureStyle[j];
    }
    pictureBox.appendChild(picture);
  }

  pictureDescription.appendChild(pictureBox);

  //description box
  descriptionBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    width: "calc(100% - " + String(pictureBoxWidth + margin) + ea + ")",
    background: GeneralJs.colorChip.gray1,
    borderRadius: String(3) + ea,
    right: String(0) + ea,
    bottom: String(0) + ea,
    paddingTop: String(descriptionPaddingTop) + ea,
    paddingBottom: String(descriptionPaddingBottom) + ea,
  };
  for (let i in style) {
    descriptionBox.style[i] = style[i];
  }

  //description title
  descriptionTitle = GeneralJs.nodes.div.cloneNode(true);
  descriptionTitle.textContent = "디자이너 설명";
  style = {
    position: "absolute",
    top: String(descriptionTitleTop) + ea,
    left: String(descriptionTitleLeft) + ea,
    fontSize: String(descriptionTitleSize) + ea,
    fontWeight: String(600),
    wordSpacing: String(wordSpacing) + ea,
  };
  for (let i in style) {
    descriptionTitle.style[i] = style[i];
  }
  descriptionBox.appendChild(descriptionTitle);

  //description contents
  for (let i = 0; i < description.length; i++) {
    descriptionDetailBox = GeneralJs.nodes.div.cloneNode(true);
    descriptionDetailBox.textContent = description[i];
    style = {
      position: "relative",
      fontSize: String(descriptionSize) + ea,
      lineHeight: String(1.6),
      wordSpacing: String(-1) + ea,
      left: String(descriptionPaddingLeft) + ea,
      width: "calc(100% - " + String(descriptionPaddingLeft + descriptionPaddingRight) + ea + ")",
      marginBottom: String(descriptionMargin) + ea,
    };
    if (i === description.length - 1) {
      style.marginBottom = '';
    }
    for (let j in style) {
      descriptionDetailBox.style[j] = style[j];
    }

    descriptionPoint = SvgTong.stringParsing(this.mother.returnPoint(String(pointRadius) + ea, GeneralJs.colorChip.black));
    style = {
      position: "absolute",
      width: String(pointRadius * 2) + ea,
      height: String(pointRadius * 2) + ea,
      left: String(-1 * ((pointRadius * 2) + pointLeftIndent)) + ea,
      top: String(pointTop) + ea,
    };
    for (let j in style) {
      descriptionPoint.style[j] = style[j];
    }
    descriptionDetailBox.appendChild(descriptionPoint);
    descriptionBox.appendChild(descriptionDetailBox);
  }
  pictureDescription.appendChild(descriptionBox);
  mother.appendChild(pictureDescription);

  //designer analytics
  analyticsBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    marginLeft: String(leftMargin) + ea,
    marginRight: String(leftMargin) + ea,
    width: "calc(100% - " + String(leftMargin * 2) + ea + ")",
    height: String(analyticsBoxHeight) + ea,
    border: "1px solid " + GeneralJs.colorChip.gray3,
    marginTop: String(analyticsBoxTopMargin) + ea,
    boxSizing: "border-box",
    borderRadius: String(3) + ea,
  };
  for (let i in style) {
    analyticsBox.style[i] = style[i];
  }
  analyticsBoxTitle = GeneralJs.nodes.div.cloneNode(true);
  analyticsBoxTitle.textContent = "디자이너 상세 정보";
  style = {
    position: "absolute",
    left: String(0) + ea,
    top: String(descriptionTitleTop) + ea,
    fontSize: String(descriptionTitleSize) + ea,
    fontWeight: String(600),
  };
  for (let i in style) {
    analyticsBoxTitle.style[i] = style[i];
  }
  analyticsBox.appendChild(analyticsBoxTitle);
  this.designerAnalytics(analyticsBox, desid);
  mother.appendChild(analyticsBox);

  //designer portfolio
  portfolioBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    marginLeft: String(leftMargin) + ea,
    marginRight: String(leftMargin) + ea,
    width: "calc(100% - " + String(leftMargin * 2) + ea + ")",
    height: String(portfolioBoxHeight) + ea,
    border: "1px solid " + GeneralJs.colorChip.gray3,
    marginTop: String(analyticsBoxTopMargin) + ea,
    boxSizing: "border-box",
    borderRadius: String(3) + ea,
  };
  for (let i in style) {
    portfolioBox.style[i] = style[i];
  }
  portfolioBoxTitle = GeneralJs.nodes.div.cloneNode(true);
  portfolioBoxTitle.textContent = "디자이너 포트폴리오";
  style = {
    position: "absolute",
    left: String(0) + ea,
    top: String(descriptionTitleTop) + ea,
    fontSize: String(descriptionTitleSize) + ea,
    fontWeight: String(600),
  };
  for (let i in style) {
    portfolioBoxTitle.style[i] = style[i];
  }
  portfolioBox.appendChild(portfolioBoxTitle);
  this.designerPortfolio(portfolioBox, desid);
  mother.appendChild(portfolioBox);
}

ProposalJs.prototype.designerAnalytics = function (mother, desid) {
  const instance = this;
  const { ea } = this;
  const thisDesigner = this.designers.search(desid);
  const map = this.map.analyticsMap(thisDesigner);
  let propertyBox;
  let pointClone;
  let pointRadius, pointTop;
  let margin;
  let top, left, leftIndent, width0, width1, height;
  let initNumber;
  let maxNumber;
  let maxInitNumber;
  let leftNumber;
  let titleDom;
  let titleSize;
  let titleIndent;
  let wordSpacing;
  let valueDom;
  let titleTop;
  let valueDomStandard;
  let valueDomCircle;
  let pointTopValue, pointIntendValue;
  let checkboxMarginRight, radioMarginRight;
  let tendencyTop, tendencyHeight, tendencyMargin;
  let valueDomText, valueDomBar;
  let valueDomBarLeft;
  let valueDomBarFactor;
  let tendencyVisualLeft;
  let valueDomValue, valueDomValueWidth, valueDomValueMargin;
  let checkBoxRadius, checkBoxRadiusTop, checkBoxRadiusIntend;

  initNumber = 2;
  maxNumber = 6;
  maxInitNumber = (maxNumber * 2) - initNumber;
  leftNumber = map.length - maxInitNumber;

  top = <%% 30, 30, 30, 30 %%>;
  left = <%% 30, 30, 30, 30 %%>;
  leftIndent = <%% 20, 20, 20, 20 %%>;
  width1 = <%% 340, 500, 500, 500 %%>;
  width0 = (width1 * 2) + leftIndent;
  height = <%% 26, 30, 30, 30 %%>;
  wordSpacing = <%% -1, -1, -1, -1 %%>;

  margin = <%% 12, 12, 12, 12 %%>;

  pointRadius = <%% 2, 2, 2, 2 %%>;
  pointTop = <%% 9, 9, 9, 9 %%>;
  pointTopValue = <%% 8, 9, 9, 9 %%>;
  pointIntendValue = <%% 4, 4, 4, 4 %%>;

  checkBoxRadius = <%% 4, 5, 5, 5 %%>;
  checkBoxRadiusTop = <%% 6, 5, 5, 5 %%>;
  checkBoxRadiusIntend = <%% 5, 5, 5, 5 %%>;

  titleSize = <%% 16, 15, 15, 15 %%>;
  titleIndent = <%% 4, 2, 2, 2 %%>;
  titleTop = 0;

  valueIndent = <%% 140, 2, 2, 2 %%>;

  checkboxMarginRight = <%% 24, 24, 24, 24 %%>;
  radioMarginRight = <%% 27, 32, 32, 32 %%>;

  valueDomBarLeft = <%% 60, 60, 60, 60 %%>;
  valueDomValueWidth = <%% 13, 60, 60, 60 %%>;
  valueDomValueMargin = <%% 10, 60, 60, 60 %%>;

  tendencyVisualLeft = <%% 12, 10, 10, 10 %%>;
  tendencyTop = <%% 33, 33, 33, 33 %%>;
  tendencyMargin = <%% 3, 3, 3, 3 %%>;

  for (let i = 0; i < map.length; i++) {

    //base
    propertyBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      top: String(top + ((margin + height) * (i < maxNumber ? i : i - (maxNumber - initNumber)))) + ea,
      left: String(left + (i < maxNumber ? 0 : (width1 + leftIndent))) + ea,
      width: String(i < 2 ? width0 : width1) + ea,
      height: String(height) + ea,
    };
    if (i >= maxInitNumber) {
      style.top = String(top) + ea;
      style.left = String(left + (leftIndent * 2) + (width1 * 2) - tendencyVisualLeft) + ea;
      style.height = String((height * maxNumber) + (margin * (maxNumber - 1))) + ea;
      style.width = "calc(100% - " + String((left * 2) + width0 + leftIndent - tendencyVisualLeft) + ea + ")";
    }
    for (let j in style) {
      propertyBox.style[j] = style[j];
    }

    //circle
    pointClone = SvgTong.stringParsing(this.mother.returnPoint(String(pointRadius) + ea, GeneralJs.colorChip.green));
    style = {
      position: "absolute",
      width: String(pointRadius * 2) + ea,
      height: String(pointRadius * 2) + ea,
      left: String(0) + ea,
      top: String(pointTop) + ea,
    };
    for (let j in style) {
      pointClone.style[j] = style[j];
    }
    propertyBox.appendChild(pointClone);

    //property title
    titleDom = GeneralJs.nodes.div.cloneNode(true);
    titleDom.textContent = map[i].name;
    style = {
      position: "absolute",
      fontSize: String(titleSize) + ea,
      fontWeight: String(500),
      wordSpacing: String(wordSpacing) + ea,
      left: String((pointRadius * 2) + titleIndent) + ea,
      top: String(titleTop) + ea,
    };
    for (let j in style) {
      titleDom.style[j] = style[j];
    }
    propertyBox.appendChild(titleDom);

    //value
    if (map[i].type === "string") {
      valueDom = GeneralJs.nodes.div.cloneNode(true);
      valueDom.textContent = map[i].value;
      style = {
        position: "absolute",
        fontSize: String(titleSize) + ea,
        fontWeight: String(400),
        wordSpacing: String(wordSpacing) + ea,
        left: String((pointRadius * 2) + valueIndent - checkBoxRadiusIntend) + ea,
        top: String(0) + ea,
        color: GeneralJs.colorChip.green
      };
      for (let j in style) {
        valueDom.style[j] = style[j];
      }
      propertyBox.appendChild(valueDom);
    } else if (map[i].type === "checkbox" || map[i].type === "radio") {

      if (map[i].type === "radio") {
        map[i].value = [ map[i].value ];
      }

      valueDom = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        fontSize: String(titleSize) + ea,
        fontWeight: String(400),
        wordSpacing: String(wordSpacing) + ea,
        left: String((pointRadius * 2) + valueIndent) + ea,
        top: String(0) + ea,
        color: GeneralJs.colorChip.gray3,
        width: "calc(100% - " + String((pointRadius * 2) + valueIndent) + ea + ")",
        height: String(100) + '%',
      };
      for (let j in style) {
        valueDom.style[j] = style[j];
      }

      for (let z = 0; z < map[i].standard.length; z++) {
        valueDomStandard = GeneralJs.nodes.div.cloneNode(true);
        valueDomStandard.textContent = map[i].standard[z];
        style = {
          display: "inline-block",
          position: "relative",
          fontSize: "inherit",
          fontWeight: (map[i].value.includes(map[i].standard[z]) ? String(400) : "inherit"),
          color: (map[i].value.includes(map[i].standard[z]) ? GeneralJs.colorChip.green : "inherit"),
          wordSpacing: String(wordSpacing) + ea,
          marginRight: String(map[i].type === "checkbox" ? checkboxMarginRight : radioMarginRight) + ea,
          top: String(0) + ea,
        };
        if (z === 0) {
          style.marginLeft = String(9) + ea;
        }
        for (let j in style) {
          valueDomStandard.style[j] = style[j];
        }

        if (map[i].value.includes(map[i].standard[z])) {
          valueDomCircle = SvgTong.stringParsing(this.mother.returnCheckBox(GeneralJs.colorChip.green));
        } else {
          valueDomCircle = SvgTong.stringParsing(this.mother.returnCheckBox(GeneralJs.colorChip.gray4));
        }
        style = {
          position: "absolute",
          width: String(checkBoxRadius * 2) + ea,
          height: String(checkBoxRadius * 2) + ea,
          left: String(-1 * ((checkBoxRadius * 2) + checkBoxRadiusIntend)) + ea,
          top: String(checkBoxRadiusTop) + ea,
        };
        for (let j in style) {
          valueDomCircle.style[j] = style[j];
        }
        valueDomStandard.appendChild(valueDomCircle);
        valueDom.appendChild(valueDomStandard);
      }
      propertyBox.appendChild(valueDom);
    } else if (map[i].type === "tendency") {

      tendencyHeight = ((height * maxNumber) + (margin * (maxNumber - 1)) - tendencyTop - (tendencyMargin * (map[i].standard.length - 1))) / map[i].standard.length;

      for (let z = 0; z < map[i].standard.length; z++) {
        valueDom = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          left: String(0) + ea,
          top: String(tendencyTop + ((tendencyHeight + tendencyMargin) * z)) + ea,
          width: String(100) + '%',
          height: String(tendencyHeight) + ea,
        };
        for (let j in style) {
          valueDom.style[j] = style[j];
        }

        valueDomText = GeneralJs.nodes.div.cloneNode(true);
        valueDomText.textContent = map[i].standard[z].name;
        style = {
          position: "absolute",
          fontSize: String(tendencyHeight * 0.65) + ea,
          fontWeight: String(500),
          wordSpacing: String(wordSpacing) + ea,
          left: String(0) + ea,
          top: String(-1 * (tendencyMargin)) + ea,
          width: String(valueDomBarLeft) + ea,
          height: String(tendencyHeight) + ea,
        };
        for (let j in style) {
          valueDomText.style[j] = style[j];
        }
        valueDom.appendChild(valueDomText);

        valueDomBar = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          left: String(valueDomBarLeft) + ea,
          top: String(-1 * (tendencyMargin / 2)) + ea,
          color: GeneralJs.colorChip.green,
          width: "calc(100% - " + String(valueDomBarLeft + valueDomValueWidth + valueDomValueMargin) + ea + ")",
          height: String(tendencyHeight * 0.8) + ea,
          borderRadius: String(3) + ea,
          background: GeneralJs.colorChip.gray0,
          overflow: "hidden",
        };
        for (let j in style) {
          valueDomBar.style[j] = style[j];
        }
        for (let y = 0; y < 10; y++) {
          valueDomBarFactor = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "inline-block",
            position: "relative",
            width: "calc(100% / " + String(10) + ")",
            height: String(100) + '%',
            boxSizing: "border-box",
          };
          if (y <= map[i].value[map[i].standard[z].column] - 1) {
            style.background = GeneralJs.colorChip.green;
            style.borderRight = "1px solid " + GeneralJs.colorChip.green;
          } else {
            style.background = GeneralJs.colorChip.gray1;
            style.borderRight = "1px solid " + GeneralJs.colorChip.white;
          }

          if (y === map[i].value[map[i].standard[z].column] - 1) {
            style.borderTopRightRadius = String(3) + ea;
            style.borderBottomRightRadius = String(3) + ea;
          }

          if (y === 10 - 1) {
            delete style.borderRight;
          }
          for (let j in style) {
            valueDomBarFactor.style[j] = style[j];
          }

          valueDomBar.appendChild(valueDomBarFactor);
        }
        valueDom.appendChild(valueDomBar);

        valueDomValue = GeneralJs.nodes.div.cloneNode(true);
        valueDomValue.textContent = String(map[i].value[map[i].standard[z].column]);
        style = {
          position: "absolute",
          fontSize: String(tendencyHeight * 0.65) + ea,
          fontWeight: String(200),
          wordSpacing: String(wordSpacing) + ea,
          right: String(0) + ea,
          top: String(-1 * (tendencyMargin)) + ea,
          color: GeneralJs.colorChip.green,
          width: String(valueDomValueWidth) + ea,
          height: String(tendencyHeight) + ea,
        };
        for (let j in style) {
          valueDomValue.style[j] = style[j];
        }
        valueDom.appendChild(valueDomValue);

        propertyBox.appendChild(valueDom);
      }

    }

    mother.appendChild(propertyBox);
  }

  mother.style.height = String((top * 2) + (height * maxNumber) + (margin * (maxNumber - 1))) + ea;

}

ProposalJs.prototype.designerPortfolio = function (mother, desid) {
  const instance = this;
  const thisDesigner = this.designers.search(desid);


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
    let designers, designer;
    let whereQuery;

    this.mode = <%% "bigDesktop", "smallDesktop", "tablet", "mobile" %%>;
    this.ea = <%% "px", "px", "px", "vw" %%>;
    this.standardWidth = <%% 1400, 1050, 900, 100 %%>;
    this.sero = <%% false, false, false, true %%>;
    this.modeMinus = <%% 0, 1, 1, 1 %%>;

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

      whereQuery = {};
      whereQuery["$or"] = [];
      for (let project of projects) {
        for (let { desid } of project.proposal.detail) {
          whereQuery["$or"].push({ desid: desid });
        }
      }
      designers = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify(whereQuery), "/getDesigners"));

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
    for (let obj of project.proposal.detail) {
      for (let { desid, designer } of designers) {
        if (obj.desid === desid) {
          obj.designer = designer;
        }
      }
    }
    this.project = project;
    this.client = client;
    this.designers = new Designers(designers);
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
