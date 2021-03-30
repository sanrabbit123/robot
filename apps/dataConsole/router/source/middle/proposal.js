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
      "return (thisPerson.name !== undefined ? thisPerson.name + ' 고객님 디자이너 추천 제안서 | 홈리에종' : '홈리에종 디자이너 추천 제안서 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return (thisPerson.name !== undefined ? thisPerson.name + ' 고객님 디자이너 제안 페이지입니다.' : '홈리에종 디자이너 추천 제안 페이지입니다.');"
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

class WordsDictionary {
  constructor() {
    class Words extends Array {
      allChildren() {
        let arr = [];
        for (let i of this) {
          for (let j of i.children) {
            arr.push(j);
          }
        }
        return arr;
      }
    }
    class WordString extends String {
      constructor(str) {
        super(str);
      }
      setChildren(arr) {
        Object.defineProperty(this, "children", {
            enumerable: false,
            value: arr
        });
      }
    }
    let arr = new Words();
    let targets = [
      {
        mother: "커뮤니케이션 & 컨설팅",
        children: [
          "디자이너와 카톡(문자) / 전화 / 메일 등의 채널을 통해 커뮤니케이션하면서 전체 스타일링을 완성합니다. 커뮤니케이션에 적극적으로 참여해주시면 더 좋은 결과물을 얻으실 수 있습니다.",
          "(오프라인 진행 시) 디자이너와 현장 미팅을 진행하며 집 컨디션 / 취향 / 생활 특징 / 예산을 고려하여 컨설팅해드립니다."
        ]
      },
      {
        mother: "시공팀 관련",
        children: [
          "시공팀은 추천하는 시공팀 외에 고객이 개별적으로 알아본 시공팀과 진행 가능합니다."
        ]
      },
      {
        mother: "스타일링 범주",
        children: [
          "시공 진행 시 디자이너는 시공 방향 제시 및 전체 마감재를 셀렉해드립니다.",
          "기존에 사용하시는 가구들 중 가져갈 가구와 버릴 가구 선택 및 배치 / 활용 제안드립니다. 새로 구매하실 가구, 조명, 패브릭(커튼, 베딩, 러그, 쿠션), 소품(식물, 액자, 시계 등)을 제안해드립니다.",
          "디자이너의 제안에 따라 패브릭 및 가구의 맞춤 제작이 가능합니다.",
          "생활용품, 식기, 가전은 스타일링 제안 범위에 포함되지 않습니다. 다만 선택하신 후 제품 외관의 디자인 옵션(컬러 등)을 의논하실 경우 전체 디자인을 고려하여 골라 드립니다. 생활용품과 식기의 경우, 고객님께서 찾으신 3~4 품목 중에서 셀렉은 가능합니다."
        ]
      },
      {
        mother: "구매 안내",
        children: [
          "디자이너 제안 후 고객 컨펌이 완료된 구매 제품은 고객이 구매하실 수 있도록 안내드립니다. 연계 업체의 제품 구매 시에는 할인 혜택을 받으실 수 있습니다. 모든 제품이 해당되는 것은 아니며 업체마다 차이가 있습니다."
        ]
      },
      {
        mother: "배송 및 설치 안내",
        children: [
          "제품 구매에 소요되는 배송비, 조립 및 설치비는 고객님께서 부담하시게 됩니다. 배송된 제품의 수령, 언박싱, 조립, 1차 배치는 고객님께서 진행하시게 됩니다.",
          "구매 및 물품 배치가 완료되면 인터뷰와 촬영을 진행합니다."
        ]
      },
    ];
    let temp;
    for (let { mother, children } of targets) {
      temp = new WordString(mother);
      temp.setChildren(children);
      arr.push(temp);
    }
    this.words = arr;
  }

  getWords() {
    return this.words;
  }

  getMatrix() {
    let result, num, past;
    let temp;

    result = [];
    num = 1;
    past = "";

    for (let i = 0; i < this.words.length; i++) {
      for (let j = 0; j < this.words[i].children.length; j++) {
        temp = new Array(3);
        if (past !== String(this.words[i])) {
          temp[0] = String(this.words[i]);
        } else {
          temp[0] = "";
        }
        temp[1] = String(num);
        temp[2] = this.words[i].children[j];
        result.push(temp);
        past = String(this.words[i]);
        num++;
      }
    }

    return result;
  }

  colorMatching(str) {
    if (/\<b\%/gi.test(str)) {
      str = str.replace(/(\<b\%[^\%]+\%b\>)/gi, (match, p1, offset, string) => {
        return `<b style="color:${GeneralJs.colorChip.green}">${p1.slice(3, -3)}</b>`;
      });
    }
    return str;
  }

  getSubWording() {
    let arr = [
      "<b%*%b> 홈리에종의 홈스타일링 서비스는 <b%“인테리어의 완성된 상태”를 가구/패브릭/조명/소품이 다 자리 잡은 상태라고 정의%b>합니다. 따라서 일반 인테리어와는 다르게 디자인적으로 필요한 시공만 하실 수 있도록 컨설팅해드리고, 마감재 선정 / 가구 / 패브릭 / 조명 / 소품 등 전체 스타일링을 중심으로 진행됩니다.",
      "<b%*%b> 리모델링 업체와 공사 계약을 맺으실 경우, <b%바탕 공사만 진행하고 가구/패브릭/조명/소품 등의 내부 스타일링은 전부 고객님의 몫%b>입니다. 스타일링을 하다 보면 골라야 할 품목은 매우 많고, 각각의 품목들이 어울리도록 하는 것은 어려운 작업입니다. 바탕과 스타일링이 어울리지 않으면 디자인 완성도가 떨어지게 되어 인테리어 하는데 비용을 사용하고도 불만족하게 됩니다. 따라서 전문가의 홈스타일링 컨설팅 및 디자인 서비스를 받으시는 것이 예산을 가장 효율적이고 합리적으로 사용하면서 디자인적 완성도를 높여 결국 공간을 사용하는 고객님의 만족도를 높이는 방법입니다.",
      "<b%*%b> 홈리에종은 ‘디자인비’를 먼저 받는 방식으로 진행됩니다. 디자인비를 지불하는 것이 낯설 수도 있지만, 제품 구매비의 할인 및 합리적인 시공비를 안내받으시기 때문에 총 금액상 혜택을 받게 됩니다. 또한 꼭 필요한 곳에 예산을 사용하기 때문에 오히려 효율적이고 합리적이죠. <b%선입금하신 디자인비는 프로젝트 완료 시까지 홈리에종에서 보관하기 때문에 걱정하지 않으셔도 됩니다.%b> 긴 프로젝트 기간 동안 디자이너와 함께 애정을 쏟은 만큼, 마음에 쏙 드는 공간을 얻게 되실 거예요!"
    ];
    let result = [];
    for (let i of arr) {
      result.push(this.colorMatching(i));
    }
    return result;
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
  this.naviHeight = 72;
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
  this.whiteBlocks = [];
  this.subBoxMargin = {
    top: 0,
    bottom: 0,
    left: 0
  };
  this.abc = [];
  for (let i = 'A'.charCodeAt(); i < 'Z'.charCodeAt() + 1; i++) {
    this.abc.push(String.fromCharCode(i));
  }
  this.abcStatic = 0;
  this.boxTops = [];
  this.designerButtons = [];
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
    height: String(100) + '%',
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

  baseTop = <%% 200, 200, 200, 200 %%>;

  baseTong = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    width: String(this.standardWidth) + ea,
    left: "calc(50% - " + String(this.standardWidth / 2) + ea + ")",
    paddingTop: String(baseTop) + ea,
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
  let targetDesignerBoxTop, targetDesignerBoxIndent;
  let designerFactorTitleTop;
  let designerFactor;
  let designerBar;
  let designerFactorTitleSize, designerFactorSize, designerFactorHeight;
  let topBox;
  let topBoxSize, topBoxWidth, topBoxHeight, topBoxRight;
  let whiteWording;
  let pastBlocks;
  let designerBarBottom, designerBarLeft;

  blockHeight = <%% this.backHeight - 460, this.backHeight - 460, this.backHeight - 460, this.backHeight - 460 %%>;
  bottomMargin = <%% 16, 16, 16, 16 %%>;
  margin = <%% 52, 52, 52, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 31, 31, 31 %%>;
  titleLeft = <%% 6, 6, 6, 6 %%>;

  this.whiteBoxNumbers.leftMargin = margin + titleLeft;
  this.whiteBoxNumbers.topMargin = margin;

  titleFontWeight = <%% 500, 500, 500, 500 %%>;
  wordSpacing = <%% -3, -3, -3, -3 %%>;

  barWidth = <%% 80, 80, 80, 80 %%>;
  barLeft = <%% titleLeft + 234, titleLeft + 234, titleLeft + 234, titleLeft + 234 %%>;

  indexFont = <%% 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200 %%>;

  quoteTop = <%% 8, 8, 8, 8 %%>;
  quoteHeight = <%% 12, 12, 12, 12 %%>;
  quoteMarginBottom = <%% 7, 7, 7, 7 %%>;
  quoteLeft = <%% 2, 2, 2, 2 %%>;

  initWordingHeight = <%% 20, 20, 20, 20 %%>;
  initWordingSize = <%% 15.5, 15.5, 15.5, 15.5 %%>;
  initWordingWordSpacing = <%% -1, -1, -1, -1 %%>;
  initWordingLineHeight = <%% 9, 9, 9, 9 %%>;

  factorBoxWidth = <%% 630, 630, 630, 630 %%>;
  factorBoxTop = <%% 100, 100, 100, 100 %%>;
  factorBoxTopVisual = <%% 3, 3, 3, 3 %%>;

  factorPaddingLeft = <%% 10, 10, 10, 10 %%>;
  factorPaddingTop = <%% 10, 10, 10, 10 %%>;
  factorSize = <%% 17.5, 17.5, 17.5, 17.5 %%>;
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

  factorBarWidth = <%% 200, 200, 200, 200 %%>;
  factorBarTop = <%% 43, 43, 43, 43 %%>;
  factorArrowHeadWidth = <%% 8, 8, 8, 8 %%>;
  factorArrowHeadTop = <%% 39, 39, 39, 39 %%>;
  factorArrowHeadLeft = <%% 188, 188, 188, 188 %%>;

  factorValueBottom = <%% 11, 11, 11, 11 %%>;
  factorValueRight = <%% 36, 36, 36, 36 %%>;

  factorValueMargin = <%% 46, 46, 46, 46 %%>;
  factorValueHeadMargin = <%% 10, 10, 10, 10 %%>;

  desigerBoxWidth = <%% 240, 240, 240, 240 %%>;
  desigerBoxHeight = <%% 52, 52, 52, 52 %%>;

  targetDesigners = [];
  for (let i = 0; i < this.proposal.detail.length; i++) {
    targetDesigners.push(this.proposal.detail[i].designer);
  }
  pastBlocks = [];
  designerFactorTitleTop = <%% 4, 4, 4, 4 %%>;
  targetDesignerBoxTop = <%% 24, 24, 24, 24 %%>;
  targetDesignerBoxIndent = <%% 34, 36, 36, 36 %%>;

  designerFactorTitleSize = <%% 13, 15, 15, 15 %%>;
  designerFactorSize = <%% 22, 22, 22, 22 %%>;
  designerFactorHeight = <%% 20, 20, 20, 20 %%>;

  topBoxSize = <%% 14, 14, 14, 14 %%>;
  topBoxWidth = <%% 700, 700, 700, 700 %%>;
  topBoxHeight = <%% 28, 28, 28, 28 %%>;
  topBoxRight = <%% 1, 1, 1, 1 %%>;

  designerBarBottom = <%% 2, 2, 2, 2 %%>;
  designerBarLeft = <%% 6, 6, 6, 6 %%>;

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
  initWordingBox.insertAdjacentHTML("beforeend", this.client.name + " 고객님께 고객 맞춤 커스터마이징 : <b style=\"color:" + GeneralJs.colorChip.green + "\">" + GeneralJs.serviceParsing(this.project.service) + " 서비스</b>를 제안드립니다.");
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
    fontWeight: String(300),
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
    top: String(designerFactorTitleTop) + ea,
    left: String(1) + ea,
    fontSize: String(designerFactorTitleSize) + ea,
    fontWeight: String(400),
  };
  for (let i in style) {
    designerTitle.style[i] = style[i];
  }
  designerBox.appendChild(designerTitle);
  pastBlocks.push(designerTitle);

  for (let i = 0; i < targetDesigners.length; i++) {
    if (i % 3 === 0) {
      for (let dom of pastBlocks) {
        dom.style.top = String(Number(dom.style.top.replace(/[^0-9\.\-]/gi, '')) - (targetDesignerBoxIndent * Math.floor(i / 3))) + ea;
      }
    }
    designerFactor = GeneralJs.nodes.div.cloneNode(true);
    designerFactor.textContent = targetDesigners[i];
    style = {
      fontSize: String(designerFactorSize) + ea,
      fontWeight: String(500),
      width: "calc(100% / 3)",
      display: "inline-block",
      position: "absolute",
      top: String(targetDesignerBoxTop) + ea,
      textAlign: ([ "left", "center", "right" ])[3 - 1 - (i % 3)],
      left: "calc(calc(100% / 3) * " + String(3 - 1 - (i % 3)) + ")",
    };
    for (let j in style) {
      designerFactor.style[j] = style[j];
    }
    if (i % 3 !== 1) {
      designerBar = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        borderRight: "1px solid " + GeneralJs.colorChip.green,
        height: String(designerFactorHeight) + ea,
        bottom: String(designerBarBottom) + ea,
        left: String(designerBarLeft) + ea,
      };
      if (i % 3 === 2) {
        style.borderLeft = style.borderRight;
        style.right = style.left;
        delete style.borderRight;
        delete style.left;
      }
      for (let j in style) {
        designerBar.style[j] = style[j];
      }
      designerFactor.appendChild(designerBar);
    }
    designerBox.appendChild(designerFactor);
    pastBlocks.push(designerFactor);
  }

  if (targetDesigners.length % 3 === 1) {
    designerBar.parentNode.removeChild(designerBar);
  }

  rightBox.appendChild(designerBox);
  whiteBlock.appendChild(rightBox);

  //top white wording
  whiteWording = "";
  whiteWording += "HomeLiaison designer proposal";
  for (let i = 0; i < this.proposal.detail.length; i++) {
    whiteWording += " / ";
    whiteWording += "<b index=\"" + String(i) + "\" style=\"color:" + GeneralJs.colorChip.white + "\" class=\"hoverDefault\">";
    whiteWording += "designer ";
    whiteWording += this.abc[i];
    whiteWording += "</b>";
  }
  topBox = GeneralJs.nodes.div.cloneNode(true);
  topBox.insertAdjacentHTML("beforeend", whiteWording);
  for (let i = 0; i < this.proposal.detail.length; i++) {
    topBox.querySelectorAll("b")[i].addEventListener("click", function () {
      let z = 0;
      for (let whiteBlock of instance.whiteBlocks) {
        instance.boxTops.push(whiteBlock.getBoundingClientRect().top);
        z++;
      }
      const index = Number(this.getAttribute("index"));
      window.scrollTo(0, instance.boxTops[index] - (instance.naviHeight * 1.5));
    });
  }
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
  let whiteBlocks;

  blockHeight = <%% 820, 820, 820, 820 %%>;
  bottomMargin = <%% 16, 16, 16, 16 %%>;

  whiteBlocks = [];
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
    whiteBlocks.push(whiteBlock);
  }

  this.whiteBlocks = whiteBlocks;
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
  let feeBox;
  let feeHeight, feeMarginBottom;

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

  feeHeight = <%% 30, 30, 30, 30 %%>;
  feeMarginBottom = <%% 10, 10, 10, 10 %%>;

  //mother padding
  mother.style.paddingTop = String(topMargin) + ea;
  mother.style.paddingBottom = String(leftMargin + bottomMarginVisual) + ea;
  mother.style.height = "";

  //title
  designerTitle = GeneralJs.nodes.div.cloneNode(true);
  designerTitle.insertAdjacentHTML("beforeend", "추천 디자이너 " + this.abc[this.abcStatic] + "&nbsp;&nbsp;<b style=\"color:" + GeneralJs.colorChip.gray3 + "\">></b>&nbsp;&nbsp;<b style=\"color:" + GeneralJs.colorChip.green + "\">" + designer + "</b>");
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
  this.abcStatic = this.abcStatic + 1;

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

  //designer fee
  feeBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    marginLeft: String(leftMargin) + ea,
    marginRight: String(leftMargin) + ea,
    width: "calc(100% - " + String(leftMargin * 2) + ea + ")",
    height: String(feeHeight) + ea,
    marginTop: String(analyticsBoxTopMargin) + ea,
    marginBottom: String(feeMarginBottom) + ea,
  };
  for (let i in style) {
    feeBox.style[i] = style[i];
  }
  this.designerFee(feeBox, info.fee);
  mother.appendChild(feeBox);
}

ProposalJs.prototype.designerAnalytics = function (mother, desid) {
  const instance = this;
  const { ea } = this;
  const { top, bottom, left } = this.subBoxMargin;
  const thisDesigner = this.designers.search(desid);
  const map = this.map.analyticsMap(thisDesigner);
  let propertyBox;
  let pointClone;
  let pointRadius, pointTop;
  let margin;
  let leftIndent, width0, width1, height;
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

  leftIndent = <%% 20, 20, 20, 20 %%>;
  width1 = <%% 360, 500, 500, 500 %%>;
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

  checkboxMarginRight = <%% 30, 24, 24, 24 %%>;
  radioMarginRight = <%% 35, 32, 32, 32 %%>;

  valueDomBarLeft = <%% 60, 60, 60, 60 %%>;
  valueDomValueWidth = <%% 13, 60, 60, 60 %%>;
  valueDomValueMargin = <%% 10, 60, 60, 60 %%>;

  tendencyVisualLeft = <%% 30, 10, 10, 10 %%>;
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
          valueDomCircle = SvgTong.stringParsing(this.mother.returnCheckBox(GeneralJs.colorChip.gray3));
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

  mother.style.height = String((top + bottom) + (height * maxNumber) + (margin * (maxNumber - 1))) + ea;

}

ProposalJs.prototype.designerPortfolio = function (mother, desid) {
  const instance = this;
  const { ea } = this;
  const { top, bottom, left } = this.subBoxMargin;
  const thisDesigner = this.designers.search(desid);
  GeneralJs.ajax("noFlat=true&where=" + JSON.stringify({ desid }) + "&limit=12", "/getContents", function (res) {
    const contentsArr = JSON.parse(res);
    const web = {
      portfolio: "https://home-liaison.com/portdetail.php?qqq=",
      review: "https://home-liaison.com/revdetail.php?qqq="
    };
    const dateToString = function (dateObject) {
      const zeroAddition = function (num) {
        if (num < 10) {
          return `0${String(num)}`;
        } else {
          return String(num);
        }
      }
      return `${String(dateObject.getFullYear())}-${zeroAddition(dateObject.getMonth() + 1)}-${zeroAddition(dateObject.getDate())}`;
    }
    let sourceArr;
    let style;
    let num;
    let entireDom;
    let entireHeight, entireMarginBottom;
    let titleDom, portfolioDom, reviewDom, barDom, arrowDom;
    let wordSpacing, fontSize;
    let marginTop, marginBottom;
    let portfolioRight, barRight;
    let webOpenEvent;

    marginTop = <%% left - 6, left - 6, left - 6, left - 6 %%>;
    marginBottom = <%% left - 3, left - 6, left - 6, left - 6 %%>;

    entireHeight = <%% 20, 30, 30, 30 %%>;
    entireMarginBottom = <%% 10, 10, 10, 10 %%>;

    fontSize = <%% 15, 15, 15, 15 %%>;
    wordSpacing = <%% -1, -1, -1, -1 %%>;

    portfolioRight = <%% 80, 76, 76, 76 %%>;
    barRight = <%% 66, 64, 64, 64 %%>;

    sourceArr = [];
    for (let { contents } of contentsArr) {
      sourceArr.push({ date: new Date(contents.portfolio.date), title: { portfolio: contents.portfolio.title.main, review: contents.review.title.main }, link: { portfolio: web.portfolio + contents.portfolio.pid, review: web.review + contents.review.rid } });
    }

    webOpenEvent = function (e) {
      let a_clone;
      a_clone = GeneralJs.nodes.a.cloneNode(true);
      a_clone.style.display = "none";
      a_clone.setAttribute("href", this.getAttribute("link"));
      a_clone.setAttribute("target", "_blank");
      document.body.appendChild(a_clone);
      a_clone.click();
      document.body.removeChild(a_clone);
    }

    num = 0;
    for (let { date, title, link } of sourceArr) {
      entireDom = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "relative",
        height: String(entireHeight) + ea,
        marginLeft: String(left) + ea,
        width: "calc(100% - " + String(left * 2) + ea + ")",
        marginBottom: String(entireMarginBottom) + ea,
      };
      if (num === 0) {
        style.marginTop = String(marginTop) + ea;
      }
      for (let j in style) {
        entireDom.style[j] = style[j];
      }

      titleDom = GeneralJs.nodes.div.cloneNode(true);
      titleDom.textContent = title.portfolio;
      style = {
        display: "inline-block",
        position: "relative",
        fontSize: String(fontSize) + ea,
        fontWeight: String(400),
        left: String(0) + ea,
        top: String(0) + ea,
        color: GeneralJs.colorChip.black,
        wordSpacing: String(wordSpacing) + ea,
      };
      for (let j in style) {
        titleDom.style[j] = style[j];
      }
      entireDom.appendChild(titleDom);

      portfolioDom = GeneralJs.nodes.div.cloneNode(true);
      portfolioDom.textContent = "포트폴리오";
      portfolioDom.classList.add("hoverDefault");
      portfolioDom.setAttribute("link", link.portfolio);
      style = {
        position: "absolute",
        fontSize: String(fontSize) + ea,
        fontWeight: String(400),
        right: String(portfolioRight) + ea,
        top: String(0) + ea,
        color: GeneralJs.colorChip.green,
        wordSpacing: String(wordSpacing) + ea,
      };
      for (let j in style) {
        portfolioDom.style[j] = style[j];
      }
      portfolioDom.addEventListener("click", webOpenEvent);
      entireDom.appendChild(portfolioDom);

      barDom = GeneralJs.nodes.div.cloneNode(true);
      barDom.textContent = "|";
      style = {
        position: "absolute",
        fontSize: String(fontSize) + ea,
        fontWeight: String(400),
        right: String(barRight) + ea,
        top: String(0) + ea,
        color: GeneralJs.colorChip.gray4,
        wordSpacing: String(wordSpacing) + ea,
        opacity: String(0.6),
      };
      for (let j in style) {
        barDom.style[j] = style[j];
      }
      entireDom.appendChild(barDom);

      reviewDom = GeneralJs.nodes.div.cloneNode(true);
      reviewDom.textContent = "고객 후기";
      reviewDom.classList.add("hoverDefault");
      reviewDom.setAttribute("link", link.review);
      style = {
        position: "absolute",
        fontSize: String(fontSize) + ea,
        fontWeight: String(400),
        right: String(0) + ea,
        top: String(0) + ea,
        color: (/re999/gi.test(link.review) ? GeneralJs.colorChip.gray4 : GeneralJs.colorChip.green),
        wordSpacing: String(wordSpacing) + ea,
      };
      if (!/re999/gi.test(link.review)) {
        reviewDom.addEventListener("click", webOpenEvent);
      }
      for (let j in style) {
        reviewDom.style[j] = style[j];
      }
      entireDom.appendChild(reviewDom);

      mother.appendChild(entireDom);
      num = num + 1;
    }

    if (sourceArr.length === 0) {
      mother.parentNode.removeChild(mother);
    } else {
      mother.style.height = String(marginTop + marginBottom + (sourceArr.length * entireHeight) + ((sourceArr.length - 1) * entireMarginBottom)) + ea;
    }
  });

}

ProposalJs.prototype.designerFee = function (mother, fee) {
  const instance = this;
  const { ea } = this;
  const feeToString = function (fee) {
    const moneyString = function (m) {
      let target = String(m);
      let textLength = target.length;
      let sliceString;
      let fragments;
      sliceString = target.slice(textLength % 3);
      fragments = [];
      for (let i = 0; i < Math.floor(textLength / 3); i++) {
        fragments.push(sliceString.slice((3 * i), (3 * (i + 1))));
      }
      if (textLength % 3 !== 0) {
        fragments.unshift(target.slice(0, textLength % 3));
      }
      return `${fragments.join(',')}원`;
    }
    let moneyText;
    moneyText = '';
    for (let { amount, method, partial } of fee) {
      moneyText += (/offline/gi.test(method) ? "오프라인" : "온라인") + (partial ? "(부분) " : ' ') + moneyString(amount);
      moneyText += ", ";
    }
    moneyText = moneyText.slice(0, -2);
    return moneyText;
  }
  let arrowBox, arrowHead, moneyBox, vatBox;
  let style;
  let wordSpacing;
  let arrowTop;
  let headWidth, headTop, headMargin, headVisual;
  let feeBottom, feeSize, feeRight;
  let vatBottom, vatSize, vatRight;

  wordSpacing = <%% -1, -1, -1, -1 %%>;
  arrowTop = <%% 11, 11, 11, 11 %%>;

  headWidth = <%% 10, 10, 10, 10 %%>;
  headTop = <%% 6, 6, 6, 6 %%>;
  headMargin = <%% 18, 10, 10, 10 %%>;
  headVisual = <%% 11, 10, 10, 10 %%>;

  feeBottom = <%% 0, 0, 0, 0 %%>;
  feeSize = <%% 28, 28, 28, 28 %%>;
  feeRight = <%% 60, 60, 60, 60 %%>;

  vatBottom = <%% 3, 3, 3, 3 %%>;
  vatSize = <%% 15, 15, 15, 15 %%>;
  vatRight = <%% 0, 0, 0, 0 %%>;

  arrowBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
    width: "calc(100% - 340px)",
    top: String(arrowTop) + ea,
  };
  for (let i in style) {
    arrowBox.style[i] = style[i];
  }
  mother.appendChild(arrowBox);

  arrowHead = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    borderRight: "1px solid " + GeneralJs.colorChip.gray3,
    borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
    width: String(headWidth) + ea,
    height: String(headWidth) + ea,
    transform: "rotate(315deg)",
    top: String(headTop) + ea,
    left: "calc(100% - 351px)",
  };
  for (let i in style) {
    arrowHead.style[i] = style[i];
  }
  mother.appendChild(arrowHead);

  moneyBox = GeneralJs.nodes.div.cloneNode(true);
  moneyBox.textContent = feeToString(fee);
  style = {
    position: "absolute",
    bottom: String(feeBottom) + ea,
    right: String(feeRight) + ea,
    fontSize: String(feeSize) + ea,
    fontWeight: String(500),
    color: GeneralJs.colorChip.green
  };
  for (let i in style) {
    moneyBox.style[i] = style[i];
  }
  mother.appendChild(moneyBox);

  vatBox = GeneralJs.nodes.div.cloneNode(true);
  vatBox.textContent = "(vat별도)";
  style = {
    position: "absolute",
    bottom: String(vatBottom) + ea,
    right: String(vatRight) + ea,
    fontSize: String(vatSize) + ea,
    fontWeight: String(200),
    color: GeneralJs.colorChip.green
  };
  for (let i in style) {
    vatBox.style[i] = style[i];
  }
  mother.appendChild(vatBox);

  setTimeout(function () {
    const standardWidth = moneyBox.getBoundingClientRect().width + vatBox.getBoundingClientRect().width + headMargin;
    arrowBox.style.width = "calc(100% - " + String(standardWidth) + ea + ")";
    arrowHead.style.left = "calc(100% - " + String(standardWidth + headVisual) + ea + ")";
  }, 0);

}

ProposalJs.prototype.insertWordBox = function () {
  const instance = this;
  const { ea } = this;
  const { topMargin, leftMargin } = this.whiteBoxNumbers;
  const words = new WordsDictionary();
  const matrix = words.getMatrix();
  const subWords = words.getSubWording();
  let top, bottom;
  let whiteBlock;
  let wordsTable;
  let div_clone, div_clone2;
  let style;
  let blockHeight, blockMarginBottom;
  let wordSpacing;
  let box0Size, box1Size;
  let box0Margin, box1Margin;
  let marginBottom;
  let wordSize;
  let grayBar;
  let wordBlock;

  top = <%% topMargin - 2, topMargin - 2, topMargin - 2, topMargin - 2 %%>;
  bottom = <%% topMargin - 3, topMargin - 2, topMargin - 2, topMargin - 2 %%>;

  blockMarginBottom = <%% 16, 16, 16, 16 %%>;
  wordSpacing = <%% -1, -1, -1, -1 %%>;

  box0Size = <%% 140, 50, 50, 50 %%>;
  box1Size = <%% 25, 30, 30, 30 %%>;
  box0Margin = <%% 55, 30, 30, 30 %%>;
  box1Margin = <%% 18, 30, 30, 30 %%>;

  marginBottom = <%% 9, 30, 30, 30 %%>;
  wordSize = <%% 15, 15, 15, 15 %%>;

  whiteBlock = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    borderRadius: String(8) + ea,
    width: String(100) + '%',
    background: GeneralJs.colorChip.white,
    boxShadow: "0px 5px 12px -10px #aaaaaa",
    marginBottom: String(blockMarginBottom) + ea,
    paddingTop: String(top) + ea,
    paddingBottom: String(bottom) + ea,
  };
  for (let i in style) {
    whiteBlock.style[i] = style[i];
  }
  this.baseTong.appendChild(whiteBlock);

  wordsTable = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    marginLeft: String(leftMargin) + ea,
    width: "calc(100% - " + String(leftMargin * 2) + ea + ")",
  };
  for (let i in style) {
    wordsTable.style[i] = style[i];
  }

  for (let arr of matrix) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      marginBottom: String(marginBottom) + ea,
    };
    for (let j in style) {
      div_clone.style[j] = style[j];
    }

    for (let z = 0; z < arr.length; z++) {
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        display: "inline-block",
        fontSize: String(wordSize) + ea,
        wordSpacing: String(wordSpacing) + ea,
        position: "relative",
        top: String(0) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
      };
      if (z === 0) {
        style.width = String(box0Size) + ea;
        style.marginRight = String(box0Margin) + ea;
        style.fontWeight = String(600);
        style.textAlign = "left";
      } else if (z === 1) {
        style.width = String(box1Size) + ea;
        style.marginRight = String(box1Margin) + ea;
        style.fontWeight = String(600);
        style.color = GeneralJs.colorChip.green;
        style.textAlign = "right";
      } else {
        style.width = "calc(100% - " + String(box0Size + box1Size + box0Margin + box1Margin) + ea + ")";
        style.fontWeight = String(300);
        style.textAlign = "left";
      }
      for (let j in style) {
        div_clone2.style[j] = style[j];
      }
      div_clone2.textContent = arr[z];
      div_clone.appendChild(div_clone2);
    }

    wordsTable.appendChild(div_clone);
  }

  whiteBlock.appendChild(wordsTable);


  grayBar = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
    left: String(leftMargin) + ea,
    width: "calc(100% - " + String(leftMargin * 2) + ea + ")",
    marginTop: String(top) + ea,
    marginBottom: String(top) + ea,
  };
  for (let i in style) {
    grayBar.style[i] = style[i];
  }
  whiteBlock.appendChild(grayBar);

  for (let z = 0; z < subWords.length; z++) {
    wordBlock = GeneralJs.nodes.div.cloneNode(true);
    wordBlock.insertAdjacentHTML("beforeend", subWords[z]);
    style = {
      position: "relative",
      left: String(leftMargin) + ea,
      width: "calc(100% - " + String(leftMargin * 2) + ea + ")",
      fontSize: String(wordSize) + ea,
      fontWeight: String(400),
      wordSpacing: String(wordSpacing) + ea,
      verticalAlign: "top",
      lineHeight: String(1.6),
      marginBottom: String(marginBottom * 1.5) + ea,
    };
    for (let i in style) {
      wordBlock.style[i] = style[i];
    }
    whiteBlock.appendChild(wordBlock);
  }

}

ProposalJs.prototype.insertPannelBox = function () {
  const instance = this;
  const { ea } = this;
  const { topMargin, leftMargin } = this.whiteBoxNumbers;
  let whiteBlock;
  let style;
  let blockHeight, blockMarginBottom;
  let designerButtonTong;
  let designerButtonBar;
  let designerButtonBarHead;
  let designerButton;
  let designerButtonText;
  let buttonHeight, buttonWidth;
  let buttonMargin;
  let buttonTextTop, buttonTextSize;
  let headWidth, headVisual;
  let informationArea;
  let wordSpacing;
  let finalBottom;

  blockHeight = <%% 820, 820, 820, 820 %%>;
  blockMarginBottom = <%% 160, 160, 160, 160 %%>;

  buttonHeight = <%% 47, 48, 48, 48 %%>;
  buttonWidth = <%% 108, 108, 108, 108 %%>;
  buttonMargin = <%% 8, 8, 8, 8 %%>;

  buttonTextTop = <%% 9, 9, 9, 9 %%>;
  buttonTextSize = <%% 20, 20, 20, 20 %%>;

  headWidth = <%% 10, 10, 10, 10 %%>;
  headVisual = <%% 11, 11, 11, 11 %%>;

  wordSpacing = <%% -1, -1, -1, -1 %%>;

  finalBottom = <%% 42, 42, 42, 42 %%>;

  whiteBlock = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    borderRadius: String(8) + ea,
    width: String(100) + '%',
    height: String(blockHeight) + ea,
    background: GeneralJs.colorChip.white,
    boxShadow: "0px 5px 12px -10px #aaaaaa",
    paddingTop: String(topMargin) + ea,
    marginBottom: String(blockMarginBottom) + ea,
  };
  for (let i in style) {
    whiteBlock.style[i] = style[i];
  }
  this.baseTong.appendChild(whiteBlock);


  designerButtonTong = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    height: String(buttonHeight) + ea,
    textAlign: "center",
  };
  for (let i in style) {
    designerButtonTong.style[i] = style[i];
  }

  this.designerButtons = [];
  for (let z = 0; z < this.proposal.detail.length; z++) {
    designerButton = GeneralJs.nodes.div.cloneNode(true);
    style = {
      display: "inline-block",
      position: "relative",
      width: String(buttonWidth) + ea,
      height: String(100) + '%',
      background: GeneralJs.colorChip.gray2,
      color: GeneralJs.colorChip.deactive,
      borderRadius: String(3) + ea,
      marginRight: String(buttonMargin) + ea,
      transition: "all 0.2s ease",
      cursor: "pointer",
    };
    if (z === this.proposal.detail.length - 1) {
      delete style.marginRight;
    }
    for (let i in style) {
      designerButton.style[i] = style[i];
    }
    designerButtonText = GeneralJs.nodes.div.cloneNode(true);
    designerButtonText.textContent = this.proposal.detail[z].designer;
    style = {
      position: "absolute",
      top: String(buttonTextTop) + ea,
      fontSize: String(buttonTextSize) + ea,
      fontWeight: String(400),
      color: "inherit",
      width: String(100) + '%',
      textAlign: "center",
      transition: "all 0s ease",
    };
    for (let i in style) {
      designerButtonText.style[i] = style[i];
    }
    designerButton.appendChild(designerButtonText);
    designerButton.setAttribute("toggle", "off");
    designerButton.addEventListener("click", function (e) {
      const toggle = this.getAttribute("toggle");
      const onStyle = {
        background: GeneralJs.colorChip.green,
        color: GeneralJs.colorChip.white
      };
      const offStyle = {
        background: GeneralJs.colorChip.gray2,
        color: GeneralJs.colorChip.deactive
      };

      if (toggle === "off") {
        for (let dom of instance.designerButtons) {
          if (dom !== this) {
            for (let i in offStyle) {
              dom.style[i] = offStyle[i];
            }
            dom.setAttribute("toggle", "off");
          } else {
            for (let i in onStyle) {
              dom.style[i] = onStyle[i];
            }
            dom.setAttribute("toggle", "on");
          }
        }
      } else {
        for (let i in offStyle) {
          this.style[i] = offStyle[i];
        }
        this.setAttribute("toggle", "off");
      }
    });
    designerButtonTong.appendChild(designerButton);
    this.designerButtons.push(designerButton);
  }

  for (let z = 0; z < 2; z++) {
    designerButtonBar = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: "calc(50% - " + String((((buttonWidth * this.proposal.detail.length) + (buttonMargin * (this.proposal.detail.length - 1))) / 2) + buttonMargin + buttonMargin + leftMargin) + ea + ")",
      borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
      left: String(leftMargin) + ea,
      top: String(47) + '%',
    };
    if (z === 1) {
      style.right = style.left;
      delete style.left;
    }
    for (let i in style) {
      designerButtonBar.style[i] = style[i];
    }
    designerButtonTong.appendChild(designerButtonBar);

    designerButtonBarHead = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: String(headWidth) + ea,
      height: String(headWidth) + ea,
      borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
      borderRight: "1px solid " + GeneralJs.colorChip.gray3,
      transform: "rotate(-45deg)",
      left: "calc(50% - " + String((((buttonWidth * this.proposal.detail.length) + (buttonMargin * (this.proposal.detail.length - 1))) / 2) + buttonMargin + buttonMargin + headVisual) + ea + ")",
      top: String(36) + '%',
    };
    if (z === 1) {
      style.right = style.left;
      style.transform = "rotate(135deg)";
      delete style.left;
    }
    for (let i in style) {
      designerButtonBarHead.style[i] = style[i];
    }
    designerButtonTong.appendChild(designerButtonBarHead);
  }
  whiteBlock.appendChild(designerButtonTong);

  designerButtonTong = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    height: String(buttonHeight) + ea,
    textAlign: "center",
    marginTop: String(buttonMargin * 3) + ea,
  };
  for (let i in style) {
    designerButtonTong.style[i] = style[i];
  }

  designerButton = GeneralJs.nodes.div.cloneNode(true);
  style = {
    display: "inline-block",
    position: "relative",
    width: String(buttonWidth * 1.5) + ea,
    height: String(100) + '%',
    background: GeneralJs.colorChip.green,
    borderRadius: String(3) + ea,
    cursor: "pointer",
  };
  for (let i in style) {
    designerButton.style[i] = style[i];
  }
  designerButtonText = GeneralJs.nodes.div.cloneNode(true);
  designerButtonText.textContent = "디자이너 선택";
  style = {
    position: "absolute",
    top: String(buttonTextTop) + ea,
    fontSize: String(buttonTextSize) + ea,
    fontWeight: String(400),
    color: GeneralJs.colorChip.white,
    width: String(100) + '%',
    textAlign: "center",
  };
  for (let i in style) {
    designerButtonText.style[i] = style[i];
  }
  designerButton.appendChild(designerButtonText);
  designerButton.addEventListener("click", function (e) {
    let target = null;
    for (let dom of instance.designerButtons) {
      if (dom.getAttribute("toggle") === "on") {
        target = dom;
        break;
      }
    }
    if (target === null) {
      window.alert("디자이너를 선택해주세요!");
      return;
    } else {
      if (window.confirm(target.textContent.trim() + " 디자이너를 선택하시겠습니까?")) {
        instance.submitEvent(target.textContent.trim());
      } else {
        return;
      }
    }
  });
  designerButtonTong.appendChild(designerButton);

  whiteBlock.appendChild(designerButtonTong);

  designerButtonTong = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    height: String(buttonHeight) + ea,
    textAlign: "center",
    marginTop: String(buttonMargin * 1.25) + ea,
  };
  for (let i in style) {
    designerButtonTong.style[i] = style[i];
  }

  informationArea = GeneralJs.nodes.div.cloneNode(true);
  informationArea.insertAdjacentHTML("beforeend", "* 디자이너를 선택 후,<br>위 버튼을 눌러주세요!");
  style = {
    fontSize: String(13) + ea,
    color: GeneralJs.colorChip.green,
    wordSpacing: String(wordSpacing) + ea,
    lineHeight: String(1.5),
  };
  for (let i in style) {
    informationArea.style[i] = style[i];
  }
  designerButtonTong.appendChild(informationArea);

  whiteBlock.appendChild(designerButtonTong);

  whiteBlock.style.paddingBottom = String(finalBottom) + ea;
  whiteBlock.style.height = "";

}

ProposalJs.prototype.submitEvent = function () {
  const instance = this;
  console.log(this.client.name);
  console.log(this.client.phone);
  this.mother.certificationBox("배창규", "010-2747-3403", async function (back, box) {
    try {
      await GeneralJs.sleep(3000);
      document.body.removeChild(box);
      document.body.removeChild(back);
      window.alert("전송이 완료되었습니다!");
      window.location.href = "https://home-liaison.com/about.php";
    } catch (e) {
      console.log(e);
    }
  });
}

ProposalJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    const getObj = GeneralJs.returnGet();
    if (getObj.cliid === undefined && getObj.proid === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = "https://home-liaison.com";
    }
    let proid, cliid;
    let projects, project;
    let clients, client;
    let designers, designer;
    let whereQuery;

    if (getObj.cliid !== undefined) {
      cliid = getObj.cliid;
      proid = null;
    } else {
      cliid = null;
      proid = getObj.proid;
    }

    this.mode = <%% "bigDesktop", "smallDesktop", "tablet", "mobile" %%>;
    this.ea = <%% "px", "px", "px", "vw" %%>;
    this.standardWidth = <%% 1400, 1050, 900, 100 %%>;
    this.sero = <%% false, false, false, true %%>;
    this.modeMinus = <%% 0, 1, 1, 1 %%>;
    this.naviHeight = <%% 72, 72, 60, 60 %%>;

    this.subBoxMargin.top = <%% 30, 30, 30, 30 %%>;
    this.subBoxMargin.bottom = <%% 31, 30, 30, 30 %%>;
    this.subBoxMargin.left = <%% 30, 30, 30, 30 %%>;

    if (this.modeMinus !== 0) {
      document.querySelector("style").insertAdjacentHTML("beforeend", "*{transition:all 0s ease}");
    }
    this.margin = 20;
    this.margin = this.margin - this.modeMinus;

    //set proposal, client info
    if (cliid !== null) {
      projects = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ cliid }), "/getProjects"));
      clients = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ cliid }), "/getClients"));
    } else {
      projects = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ proid }), "/getProjects"));
      projects.sort((a, b) => {
        return (new Date(b.proposal.date)).valueOf() - (new Date(a.proposal.date)).valueOf();
      });
      project = projects[0];
      clients = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ cliid: project.cliid }), "/getClients"));
    }

    if (clients.length === 0) {
      alert("잘못된 접근입니다!");
      window.location.href = "https://home-liaison.com";
    }

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
      proid = project.proid;

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
    this.mother.footerMake();
    this.mother.homeliaisonTalk();

    this.totalContents.style.height = "auto";

  } catch (e) {
    console.log(e);
  }
}
