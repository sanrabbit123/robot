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
    "designer": true,
    "project": false,
    "contents": false,
    "service": false
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
    ],
    "module": false
  },
  "name": "designerProposal",
  "route": [
    "proposal",
    "DP"
  ]
} %/%/g

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
          "디자이너와 카톡(문자) / 전화 / 메일 등의 채널을 통해 커뮤니케이션합니다. 적극적으로 참여해주실 때 더 좋은 결과물을 얻으실 수 있습니다.",
          "집 상태, 기간, 예산, 취향, 생활 방식 등을 고려하여 진행해드립니다."
        ]
      },
      {
        mother: "스타일링 범주",
        children: [
          "기존에 사용하시는 가구들 중 가져갈 가구와 버릴 가구 선택 및 활용 방안을 제안드립니다.",
          "새로 구매하실 가구, 조명, 패브릭(커튼, 베딩, 러그, 쿠션), 소품(식물, 액자, 시계 등)을 제안해드립니다.",
          "디자이너의 제안에 따라 패브릭 및 가구의 맞춤 제작이 가능합니다.",
          "가전은 스타일링 제안 범위에 포함되지 않습니다. 다만 디자인 옵션(컬러 등) 등에 대해서 의논할 수 있습니다.",
          "생활 용품과 식기의 경우는 제안하지 않습니다.",
          "거주 중인 경우 가구 이동, 수리, 폐기 등은 디자이너가 하지 않습니다.",
        ]
      },
      {
        mother: "시공 범주",
        children: [
          "시공의 경우 공정별 계약은 진행하지 않습니다. 시공에 대해서는 계약한 업체에게 책임이 있고, 의사 소통과 AS, 업무 지시는 해당 업체의 담당자가 책임지고 진행합니다.",
          "시공 진행시, 홈리에종 시공팀, 고객님이 알아보신 시공팀, 또는 디자이너 시공팀 중 하나를 선택하여 진행이 가능합니다.",
        ]
      },
      {
        mother: "구매 안내",
        children: [
          "제품 구매는 고객님이 직접 진행합니다.",
          "중고가 이상의 브랜드 제품 중 일부는 구매 할인 혜택을 받을 수 있습니다. (모든 제품이 해당되진 않으며 업체마다 차이가 있습니다.)",
          "최종 구매는 고객님이 직접 내용 확인 후 결정하셔야 합니다. 리뷰 확인이 정말 중요합니다!"
        ]
      },
      {
        mother: "촬영 및 인터뷰 안내",
        children: [
          "서비스가 완료되면 촬영과 인터뷰를 진행합니다.(필수)",
          "홈리에종과 디자이너는 공간의 사진과 인터뷰를 활용할 수 있습니다."
        ]
      },
      {
        mother: "배송 및 설치 안내",
        children: [
          "배송된 제품의 수령, 언박싱, 조립, 1차 배치는 고객님께서 진행하시게 됩니다.",
          "제품 구매에 소요되는 배송비, 조립 및 설치비는 고객님께서 부담하시게 됩니다."
        ]
      },
      {
        mother: "결제 및 증빙 안내",
        children: [
          "현장 미팅 후에는 계약금을 환불하지 않습니다.",
          "서비스 계약 후 이유 없이 서비스를 중단하거나 환불할 수 없습니다.",
          "현금영수증(전화번호) 또는 전자세금계산서를 발행합니다."
        ]
      },
      {
        mother: "추가 금액 안내",
        children: [
          "계약한 서비스의 유형에서 <b%서비스 유형 변경(시공 범위 추가)%b> 및 <b%기간 연장%b>이 되고 있는 경우 <b%디자인비가 추가%b>됩니다.",
          "디자이너와 고객의 기본 거리를 초과하는 지방 고객님의 경우 출장비가 발생하며 (1일 왕복 교통비 + 출장비) * 적용 일수로 계산합니다."
        ]
      }
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
    let target;

    target = this.words;

    result = [];
    num = 1;
    past = "";

    for (let i = 0; i < target.length; i++) {
      for (let j = 0; j < target[i].children.length; j++) {
        temp = new Array(3);
        if (past !== String(target[i])) {
          temp[0] = String(target[i]);
        } else {
          temp[0] = "";
        }
        temp[1] = String(num);
        temp[2] = target[i].children[j];
        result.push(temp);
        past = String(target[i]);
        num++;
      }
    }
    return result;
  }

  getCaution() {
    let result, num, past;
    let temp;
    let target;

    target = this.words;
    target = [ target.pop() ];
    result = [];
    num = 1;
    past = "";

    for (let i = 0; i < target.length; i++) {
      for (let j = 0; j < target[i].children.length; j++) {
        temp = new Array(3);
        if (past !== String(target[i])) {
          temp[0] = String(target[i]);
        } else {
          temp[0] = "";
        }
        temp[1] = String(num);
        temp[2] = target[i].children[j];
        result.push(temp);
        past = String(target[i]);
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
      "<b%* 홈리에종%b>의 모든 서비스는 ‘인테리어의 완성된 상태’를 <u%가구/패브릭/조명/소품이 다 자리 잡은 상태%u>라고 정의합니다.",
      "<b%*%b> 홈리에종은 ‘디자인비’를 먼저 받는 방식으로 진행됩니다. <b%디자이너의 시간과 경험의 전문성%b>에 대한 <b%무형 서비스%b>의 특징상 미리 <u%디자이너의 작업 기간을 확보%u>하고 홈리에종은 <u%마무리 단계를 확인하고 최종 정산함%u>으로써 끝까지 책임감 있는 디자인 프로세스가 유지되도록 케어합니다.",
      "<b%*%b> 턴키 공사 업체를 통해 리모델링을 하는 경우 소요되는 예산, 기간, 정성에 비해 기대하는 결과를 얻기 어렵습니다. 바탕 공사만 진행하고 가구/패브릭/조명/소품 등의 내부 스타일링은 전부 고객님의 몫입니다. 그리고 턴키 디자인 업체의 경우에는 가격이 매우 높은 편이고, 일정을 잡기 어렵습니다.",
      "<b%* 한 명의 디자이너%b>와 함께 <u%적합한 시공과 스타일링을 끝까지 함께 하여%u>, 합리적인 예산 운영과 높은 디자인적 완성도로 아늑하게 누릴 수 있는 주거를 완성하는 것이 가장 좋은 방법입니다."
    ];
    return arr;
  }

  getServiceWording() {
    let obj;
    obj = {
      name: "홈리에종 서비스",
      contents: "디자이너와 새로운 방법으로 집을 꾸며보세요. 일단 시공부터 시작하고 보는 것이 아니라 공간, 시간, 예산을 어떻게 사용할지 <b%디자이너와 함께%b> 계획해서 <u%여건에 맞는 시공 범위%u>를 정하고, <u%스타일링까지 마무리%u>하여 오롯이 쉴 수 있는 나만의 공간 경험을 전해드립니다.",
      items: {
        name: "제공 서비스",
        contents: [
          "전체 컨셉 설정",
          "공간 배치",
          "시공 범위 제안",
          "마감재 선택",
          "디자인 감리",
          "가구, 패브릭, 소품 제안",
          "세팅 및 촬영",
          "부가서비스 (입주 청소, 정리 수납 등)",
          "디자이너 중재",
          "프로젝트 케어",
          "프로젝트 검수"
        ]
      },
      methods: {
        name: "서비스 종류",
        contents: [
          {
            name: "홈퍼니싱",
            contents: "시공은 전혀 없이 기성 가구, 패브릭, 소품 등으로 제안",
            children: [
              "위치 변동 없는 조명 교체 포함",
              "빌트인 가구 제작은 시공에 포함, 빌트인 가구 제작 시 홈스타일링 유형"
            ],
            amount: 45,
            mobileLeft: 10.6,
          },
          {
            name: "홈스타일링",
            contents: "욕실, 싱크대 교체를 제외한 최소 시공에 스타일링 마무리",
            children: [
              "철거 제외 5가지 이하의 공정이 포함되는 경우",
              "공정 예시 : 도배, 필름, 중문, 조명 교체, 냉장고장 리폼, 타일 덧방 등",
              "고객님이 알아보신 시공사, 홈리에종 시공사 중에 선택 가능",
            ],
            amount: 60,
            mobileLeft: 13.2,
          },
          {
            name: "토탈 스타일링",
            contents: "욕실, 싱크대 교체를 포함한 전체 시공에 스타일링 마무리",
            children: [
              "욕실 혹은 싱크대 교체 중 한 가지라도 해당하는 경우",
              "철거 제외 6가지 이상의 공정이 포함되는 경우",
              "공정 예시 : 목공사, 도배, 필름, 목공사, 중문, 조명 교체, 가구 제작, 타일, 금속 등",
              "고객님이 알아보신 시공사, 홈리에종 시공사 혹은 디자이너 시공사에서 시공 가능 (디자이너에 따라 가능한 방식이 다름)"
            ],
            amount: 75,
            mobileLeft: 16.1,
          },
          {
            name: "엑스트라 스타일링",
            contents: "설계 변경을 포함한 전체 시공에 스타일링 마무리",
            children: [
              "주방 구조 변경, 알파룸 혹은 발코니 디자인, 게이트 등 공간에 따른 디자인 시공",
              "홈리에종 시공사 혹은 디자이너 시공사에서 시공 가능 (디자이너에 따라 가능한 방식이 다름)",
            ],
            amount: 90,
            mobileLeft: 20.9,
          },
        ]
      },
      process: {
        name: "전체 프로세스",
        contents: [
          {
            name: "계약 프로세스",
            contents: [
              "신청서 접수",
              "HL 전화 상담",
              "디자이너 추천 및 선택",
              "계약금 입금 (330,000원)",
              "디자이너와 현장 미팅",
              "계약서 작성 및 잔금 입금"
            ],
          },
          {
            name: "디자인 프로세스",
            contents: [
              "디자인 (2주 ~ 4주)",
              "고객 피드백",
              "수정 제안",
            ]
          },
          {
            name: "시공 프로세스",
            contents: [
              "시공 범위 지정",
              "시공 견적",
              "시공 계약",
              "시공 금액 입금 (4회 분할)",
              "마감재 선택",
              "시공 진행",
            ]
          },
          {
            name: "구매 프로세스",
            contents: [
              "구매 진행",
              "구매 상황 체크",
              "추가 항목 점검",
            ]
          },
          {
            name: "컨텐츠 프로세스",
            contents: [
              "현장 촬영",
              "고객 인터뷰",
              "사진 공유",
              "컨텐츠 공유"
            ]
          },
        ]
      }
    };

    return obj;
  }

}

const DesignerProposalJs = function () {
  this.mother = new GeneralJs();
  this.baseTong = null;
  this.project = null;
  this.client = null;
  this.proposal = null;
  this.whiteBoxNumbers = {
    leftMargin: 0,
    topMargin: 0
  };
  this.whiteBlocks = [];
  this.abc = [];
  for (let i = 'A'.charCodeAt(); i < 'Z'.charCodeAt() + 1; i++) {
    this.abc.push(String.fromCharCode(i));
  }
  this.abcStatic = 0;
  this.boxTops = [];
  this.designerButtons = [];
}

//static

DesignerProposalJs.binaryPath = "/middle/proposal";

DesignerProposalJs.styleTextParsing = function (text) {
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

DesignerProposalJs.prototype.proposalMapGenerator = function (designer) {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const today = new Date();
  const { information: { business: { career: { startY, startM, relatedY, relatedM } } }, analytics } = designer;
  const { construct: { case: constructCase }, styling: { tendency: { style: styleTendency }, method, furniture: { builtin, design }, fabric: { curtain, bedding } }, purchase: { setting: { install, storage } }, project: { time: { first }, matrix } } = analytics;
  const service = [
    "홈퍼니싱",
    "홈스타일링",
    "토탈 스타일링",
    "엑스트라 스타일링",
  ];
  if (mobile) {
    service.pop();
  }
  const constructMethod = [
    "고객 시공사",
    "홈리에종 시공사",
    "디자이너 시공사",
  ];
  let map = new ProposalMap();
  let career, monthAmount;
  let matrixTong;
  let constructTong;
  let serviceNumber;

  serviceNumber = Number(this.project.service.serid.split('_')[1].replace(/[^0-9]/gi, '').replace(/^0/gi, '')) - 2;

  monthAmount = ((today.getFullYear()) * 12 + (today.getMonth() + 1)) - ((startY * 12) + startM);
  career = `${String(Math.floor(monthAmount / 12))}년 ${String(monthAmount % 12)}개월`;

  matrixTong = [];
  for (let i = 0; i < service.length; i++) {
    if (matrix[i].filter((j) => { return j === 1; }).length !== 0) {
      matrixTong.push(service[i]);
    }
  }

  constructTong = [];
  if (serviceNumber === -1) {
    for (let { possible } of constructCase) {
      for (let i of possible) {
        constructTong.push(i);
      }
    }
  } else {
    for (let i of constructCase[serviceNumber].possible) {
      constructTong.push(i);
    }
  }
  constructTong = Array.from(new Set(constructTong));

  map.set("career", {
    name: "스타일링 경력",
    type: "string",
    standard: null,
    value: career
  });
  map.set("related", {
    name: "유관 경력",
    type: "string",
    standard: null,
    value: `${String(relatedY)}년 ${String(relatedM)}개월`
  });
  map.set("matrix", {
    name: "활동 범위",
    type: "checkbox",
    standard: service,
    value: matrixTong
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
  map.set("construct", {
    name: "시공 가능",
    type: "checkbox",
    standard: constructMethod,
    value: constructTong
  });
  map.set("first", {
    name: "1차 제안 시간",
    type: "string",
    standard: null,
    value: String(Math.floor(first / 7)) + "주 이내",
  });
  map.set("curtain", {
    name: "커튼 패브릭",
    type: "checkbox",
    standard: [
      "기성",
      "제작"
    ],
    value: curtain.map((i) => { return ((/업체/gi.test(i) || /기성/gi.test(i)) ? "기성" : "제작"); }),
  });
  map.set("bedding", {
    name: "베딩 패브릭",
    type: "checkbox",
    standard: [
      "기성",
      "제작"
    ],
    value: bedding.map((i) => { return ((/업체/gi.test(i) || /기성/gi.test(i)) ? "기성" : "제작"); }),
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

DesignerProposalJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { requests } = this.client;
  const { request, analytics } = requests[0];
  const expectedToString = function (str0, str1) {
    let expected;
    if (/^1/.test(str0) || /^3/.test(str0)) {
      expected = new Date(str1);
    } else {
      expected = new Date(str0);
    }
    if (testMode) {
      return `00년 0월 0일`;
    } else {
      return `${String(expected.getFullYear()).slice(2)}년 ${String(expected.getMonth() + 1)}월 ${String(expected.getDate())}일`;
    }
  }
  const spaceToString = function (obj) {
    const { bathroom, room, valcony } = obj;
    if (testMode) {
      return `방 ${String(0)}${desktop ? "개" : ""}, 화장실 ${String(0)}${desktop ? "개" : ""}`;
    } else {
      return `방 ${String(room)}${desktop ? "개" : ""}, 화장실 ${String(bathroom)}${desktop ? "개" : ""}`;
    }
  }
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
  let factorBarWhiteMargin;
  let serviceBar;
  let barStyle;
  let serviceBarTop, serviceBarLeft, serviceBarWidth;
  let indexNumberBottom;
  let factorMarginBottom;

  blockHeight = <%% this.backHeight - 460, this.backHeight - 470, this.backHeight - 490, this.backHeight - 540, this.backHeight - 460 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 30, 27.5, 23, 5.7 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;

  this.whiteBoxNumbers.leftMargin = margin + titleLeft;
  this.whiteBoxNumbers.topMargin = margin;

  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  barWidth = <%% 80, 80, 80, 80, 80 %%>;
  barLeft = <%% titleLeft + 234, titleLeft + 234, titleLeft + 234, titleLeft + 234, titleLeft + 234 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  quoteTop = <%% 8, 8, 8, 8, -0.6 %%>;
  quoteHeight = <%% 12, 12, 12, 9, 2.5 %%>;
  quoteMarginBottom = <%% 7, 7, 7, 6, 7 %%>;
  quoteLeft = <%% 2, 2, 2, 2, 1.6 %%>;

  initWordingHeight = <%% 20, 20, 20, 20, 20 %%>;
  initWordingSize = <%% 15.5, 15.5, 15.5, 13.5, 15.5 %%>;
  initWordingWordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  initWordingLineHeight = <%% 9, 9, 9, 9, 9 %%>;

  factorBoxWidth = <%% 940, 672, 576, 478, 630 %%>;
  factorBoxTop = <%% 100, 100, 100, 82, 9 %%>;
  factorBoxTopVisual = <%% 12, 11, 9, 1, 3 %%>;

  factorPaddingLeft = <%% 10, 10, 11, 10, 16 %%>;
  factorPaddingTop = <%% 10, 10, 10, 2, 5.5 %%>;
  factorSize = <%% 17.5, 17.5, 17.5, 14, 3.5 %%>;
  factorMarginBottom = <%% 40, 40, 40, 0, 0 %%>;

  if (media[0]) {
    factors = [
      { title: "추천 서비스", value: GeneralJs.serviceParsing(this.project.service).split(' ').slice(1).join(' ') },
      { title: "서비스 형태", value: GeneralJs.serviceParsing(this.project.service).split(' ')[0] },
      { title: "대상 면적", value: String(request.space.pyeong) + "평" },
      { title: "대상 공간", value: spaceToString(request.space.spec) },
      { title: "출장비 여부", value: "없음" },
      { title: "입주 예정일", value: expectedToString(request.space.resident.expected, analytics.date.space.movein) },
      { title: "계약 형태", value: request.space.contract },
      { title: "예산", value: request.budget },
    ];
  } else {
    factors = [
      { title: "추천 서비스", value: (desktop ? GeneralJs.serviceParsing(this.project.service).split(' ').slice(1).join(' ') : GeneralJs.serviceParsing(this.project.service).split(' ')[1]) },
      { title: "서비스 형태", value: GeneralJs.serviceParsing(this.project.service).split(' ')[0] },
      { title: "대상 면적", value: String(request.space.pyeong) + "평" },
      { title: "대상 공간", value: spaceToString(request.space.spec) },
      { title: "출장비 여부", value: "없음" },
      { title: "입주 예정일", value: expectedToString(request.space.resident.expected, analytics.date.space.movein) },
    ];
  }

  factorsValueDoms = new Array(factors.length);
  factorsBarDoms = new Array(factors.length);
  factorsBarHeadDoms = new Array(factors.length);

  factorBarWidth = <%% 200, 200, 200, 200, 200 %%>;
  factorBarTop = <%% 12, 11, 11, 26 + (GeneralJs.isMac() ? 0 : 1), 8.5 %%>;
  factorArrowHeadWidth = <%% 8, 8, 8, 6, 0 %%>;
  factorArrowHeadTop = <%% 39, 37, 39, 23 + (GeneralJs.isMac() ? 0 : 1), 7 %%>;
  factorArrowHeadLeft = <%% 188, 188, 188, 188, 188 %%>;

  if (desktop) {
    factorBarTop = factorBarTop + (GeneralJs.isMac() ? 0 : -3);
    factorArrowHeadTop = factorArrowHeadTop + (GeneralJs.isMac() ? 0 : -3);
  }

  factorValueBottom = <%% 11, 13, 13, 3, 2.5 %%>;
  factorValueRight = <%% 36, 36, 36, 36, 4.5 %%>;

  factorValueMargin = <%% 46, 46, 46, 46, 30 %%>;
  factorValueHeadMargin = <%% 10, 10, 10, 7, 10 %%>;

  factorBarWhiteMargin = <%% 11, 11, 10, 8, 2 %%>;

  desigerBoxWidth = <%% 240, 240, 240, 240, 240 %%>;
  desigerBoxHeight = <%% 52, 52, 52, 52, 52 %%>;

  targetDesigners = [];
  for (let i = 0; i < this.proposal.detail.length; i++) {
    targetDesigners.push(this.proposal.detail[i].designer);
  }
  pastBlocks = [];
  designerFactorTitleTop = <%% 4, 4, 4, 4, 4 %%>;
  targetDesignerBoxTop = <%% 24, 24, 24, 24, 24 %%>;
  if (desktop) {
    targetDesignerBoxTop = targetDesignerBoxTop + (GeneralJs.isMac() ? 0 : 2);
  }
  targetDesignerBoxIndent = <%% 34, 36, 36, 36, 36 %%>;

  designerFactorTitleSize = <%% 13, 13, 13, 13, 13 %%>;
  designerFactorSize = <%% 22, 22, 22, 22, 22 %%>;
  designerFactorHeight = <%% 20, 20, 20, 20, 20 %%>;

  topBoxSize = <%% 14, 14, 14, 14, 14 %%>;
  topBoxWidth = <%% 700, 700, 700, 700, 700 %%>;
  topBoxHeight = <%% 28, 28, 28, 28, 28 %%>;
  topBoxRight = <%% 1, 1, 1, 1, 1 %%>;

  designerBarBottom = <%% 2, 2, 2, 2, 2 %%>;
  if (desktop) {
    designerBarBottom = designerBarBottom + (GeneralJs.isMac() ? 0 : 3);
  }
  designerBarLeft = <%% 6, 6, 6, 6, 6 %%>;

  serviceBarTop = <%% 56, 55, 54, 56, 56 %%>;
  serviceBarTop = serviceBarTop + (GeneralJs.isMac() ? 0 : -2);
  serviceBarLeft = <%% 0, 1, 0, 0, 0 %%>;
  serviceBarWidth = <%% 66, 38, 37, 39, 39 %%>;
  indexNumberBottom = <%% 3, 4, 6, 4, 0 %%>;

  //total white box
  whiteBlock = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    borderRadius: String(desktop ? 8 : 1) + ea,
    width: String(100) + '%',
    height: String(blockHeight) + ea,
    background: GeneralJs.colorChip.white,
    marginBottom: String(bottomMargin) + ea,
    boxShadow: "0px 5px 12px -10px " + GeneralJs.colorChip.gray5,
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
  if (mobile) {
    style = {
      display: "block",
      position: "relative",
      height: String(29) + ea,
      width: String(100) + '%'
    };
  }
  for (let i in style) {
    leftBox.style[i] = style[i];
  }

  //main title
  titleBox = GeneralJs.nodes.div.cloneNode(true);
  if (media[0] || media[4]) {
    titleBox.textContent = "당신에게 딱 맞는 디자이너,";
  } else if (media[1] || media[2] || media[3]) {
    titleBox.textContent = "당신에게";
  }
  style = {
    position: "absolute",
    fontSize: String(titleFont) + ea,
    fontWeight: String(titleFontWeight),
    wordSpacing: String(wordSpacing) + "px",
    top: String((media[0] ? 0 : media[1] ? 1 : 3) + (GeneralJs.isMac() || mobile ? 0 : 4)) + ea,
    left: String(titleLeft) + ea,
    color: GeneralJs.colorChip.black,
  };
  if (mobile) {
    style.top = String(9) + ea;
    style.width = String(100) + '%';
    style.textAlign = "center";
  }
  for (let i in style) {
    titleBox.style[i] = style[i];
  }
  leftBox.appendChild(titleBox);

  if (media[1] || media[2] || media[3]) {
    titleBox = GeneralJs.nodes.div.cloneNode(true);
    titleBox.textContent = "딱 맞는 디자이너,";
    style = {
      position: "absolute",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleFontWeight),
      wordSpacing: String(wordSpacing) + ea,
      top: String((media[0] ? 0 : media[1] ? 1 : 3) + (titleFont * (media[0] ? 1.45 : 1.47)) + (GeneralJs.isMac() || mobile ? 0 : 4)) + ea,
      left: String(titleLeft) + ea,
      color: GeneralJs.colorChip.black,
    };
    for (let i in style) {
      titleBox.style[i] = style[i];
    }
    leftBox.appendChild(titleBox);
  }

  titleBox = GeneralJs.nodes.div.cloneNode(true);
  titleBox.textContent = "이 곳 홈리에종에서";
  style = {
    position: "absolute",
    fontSize: String(titleFont) + ea,
    fontWeight: String(titleFontWeight),
    wordSpacing: String(wordSpacing) + "px",
    top: String((media[0] ? 0 : media[1] ? 1 : 3) + (titleFont * (media[0] ? 1.45 : 1.47) * (media[0] ? 1 : 2)) + (GeneralJs.isMac() || mobile ? 0 : 4)) + ea,
    left: String(titleLeft) + ea,
    color: GeneralJs.colorChip.black,
  };
  if (mobile) {
    style.top = String(17) + ea;
    style.width = String(100) + '%';
    style.textAlign = "center";
  }
  for (let i in style) {
    titleBox.style[i] = style[i];
  }
  leftBox.appendChild(titleBox);

  if (media[0]) {
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
  }

  //index box
  if (desktop) {
    indexBox = GeneralJs.nodes.div.cloneNode(true);
    indexBox.textContent = "0";
    style = {
      position: "absolute",
      fontSize: String(indexFont) + ea,
      fontWeight: String(indexFontWeight),
      wordSpacing: String(wordSpacing) + ea,
      bottom: String(indexNumberBottom) + ea,
      left: String(titleLeft) + ea,
      color: GeneralJs.colorChip.gray4,
    };
    for (let i in style) {
      indexBox.style[i] = style[i];
    }
    leftBox.appendChild(indexBox);
  }

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
  if (mobile) {
    style = {
      position: "relative",
      width: String(100) + '%',
      height: String(80) + ea,
    };
  }
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
  if (mobile) {
    style.left = "calc(50% - " + String(quoteWidth / 2) + ea + ")";
  }
  for (let i in style) {
    doubleQuote.style[i] = style[i];
  }
  rightBox.appendChild(doubleQuote);

  //init wording - 0
  initWordingBox = GeneralJs.nodes.div.cloneNode(true);
  if (desktop) {
    initWordingBox.insertAdjacentHTML("beforeend", this.client.name + " 고객님께" + ((!media[2] && !media[3]) ? " 고객 맞춤 커스터마이징 : " : " ") + "<b style=\"color:" + GeneralJs.colorChip.green + "\">" + GeneralJs.serviceParsing(this.project.service) + " 서비스</b>를 제안드립니다.");
  } else {
    initWordingBox.insertAdjacentHTML("beforeend", this.client.name + " 고객님께 고객 커스터마이징" + "<b style=\"color:" + GeneralJs.colorChip.green + "\">" + GeneralJs.serviceParsing(this.project.service) + " 서비스</b>를 제안드립니다.");
  }
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
  if (mobile) {
    style = {
      position: "absolute",
      top: String(3.7) + ea,
      left: String(13) + '%',
      width: String(74) + '%',
      height: String(9) + ea,
      fontSize: String(3.5) + ea,
      fontWeight: String(400),
      wordSpacing: String(-1) + "px",
      lineHeight: String(1.6),
      textAlign: "center",
    };
  }
  for (let i in style) {
    initWordingBox.style[i] = style[i];
  }
  rightBox.appendChild(initWordingBox);

  //init wording - 1
  initWordingBox = GeneralJs.nodes.div.cloneNode(true);
  if (media[0]) {
    initWordingBox.textContent = "담당 디자이너가 고객님의 전체 가용 예산을 시공 / 제작가구 / 구매가구 / 패브릭 소품 등을 위해 적절히 분배하여 제안합니다.";
  } else if (media[1]) {
    initWordingBox.textContent = "담당 디자이너가 고객님의 전체 가용 예산을 현장 조건에 맞게 적절히 분배하여 스타일링을 진행합니다.";
  } else {
    initWordingBox.textContent = "담당 디자이너가 고객님의 예산을 현장에 맞게 분배하여 스타일링을 진행합니다.";
  }
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
  if (mobile) {
    style = {
      position: "absolute",
      top: String(15.5) + ea,
      left: String(11) + '%',
      width: String(78) + '%',
      height: String(9) + ea,
      fontSize: String(3.5) + ea,
      fontWeight: String(400),
      lineHeight: String(1.6),
      wordSpacing: String(-1) + "px",
      textAlign: "center",
    };
  }
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
    height: "calc(100% - " + String(factorBoxTop - factorBoxTopVisual) + ea + ")",
  };
  if (mobile) {
    style = {
      position: "relative",
      top: String(32) + ea,
      left: String(6 + 3) + '%',
      width: String(100 - (6 * 2)) + '%',
      height: String(40) + ea
    };
  }
  for (let i in style) {
    factorBox.style[i] = style[i];
  }

  factorStyle = {
    display: "inline-block",
    position: "relative",
    width: "calc(calc(100% / " + String(2) + ") - " + String(factorPaddingLeft * 2) + ea + ")",
    height: "calc(calc(100% / " + String(3) + ") - " + String(factorPaddingTop * 2) + ea + ")",
    paddingBottom: String((!media[3] && !media[4]) ? factorPaddingTop * 0.5 : factorPaddingTop * 2) + ea,
    paddingRight: String(factorPaddingLeft * 2) + ea,
    marginBottom: String(factorMarginBottom) + ea,
  };

  if (media[0]) {
    factorStyle.width = "calc(calc(100% / " + String(3) + ") - " + String(factorPaddingLeft * 3) + ea + ")";
  }

  factorTitleStyle = {
    position: "absolute",
    fontSize: String(factorSize) + ea,
    fontWeight: String(600),
    top: String(0),
    left: String(0),
    wordSpacing: String(initWordingWordSpacing) + "px",
    background: GeneralJs.colorChip.white,
    paddingRight: String(desktop ? 10 : 0) + ea,
    zIndex: String(1),
  };

  factorBarStyle = {
    position: "absolute",
    borderBottom: "1px solid " + GeneralJs.colorChip.gray2,
    width: withOut(factorValueRight, ea),
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
    fontWeight: String(500),
    color: GeneralJs.colorChip.green,
    bottom: String(factorValueBottom) + ea,
    right: String(factorValueRight) + ea,
    wordSpacing: String(initWordingWordSpacing) + "px",
    background: GeneralJs.colorChip.white,
    paddingLeft: String(factorBarWhiteMargin) + ea,
  };

  if (!media[3] && !media[4]) {
    factorValueStyle.bottom = "";
    factorValueStyle.top = String(0);
  }

  for (let i = 0; i < factors.length; i++) {

    if (i === 2) {
      factorStyle.marginBottom = String(0);
      factorValueStyle.fontWeight = String(300);
      factorValueStyle.color = GeneralJs.colorChip.black;
    }

    if (media[0]) {
      if (i === 1) {
        factorStyle.marginRight = String(factorPaddingLeft * 10) + ea;
      } else {
        factorStyle.marginRight = String(0) + ea;
      }
    }

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

    factorValue = GeneralJs.nodes.div.cloneNode(true);
    factorValue.textContent = factors[i].value;
    for (let j in factorValueStyle) {
      factorValue.style[j] = factorValueStyle[j];
    }
    clientFactor.appendChild(factorValue);
    factorsValueDoms[i] = factorValue;

    factorBox.appendChild(clientFactor);
  }

  if (!media[3] && !media[4]) {
    serviceBar = GeneralJs.nodes.div.cloneNode(true);
    barStyle = {
      position: "absolute",
      borderBottom: "1px dashed " + GeneralJs.colorChip.gray4,
      top: String(serviceBarTop) + ea,
      left: String(serviceBarLeft) + ea,
      width: withOut(serviceBarWidth, ea),
    };
    for (let i in barStyle) {
      serviceBar.style[i] = barStyle[i];
    }
    factorBox.appendChild(serviceBar);
  }

  rightBox.appendChild(factorBox);

  // if (media[0]) {
  //   //designer box
  //   designerBox = GeneralJs.nodes.div.cloneNode(true);
  //   style = {
  //     position: "absolute",
  //     bottom: String(factorValueBottom - factorBoxTopVisual + 1) + ea,
  //     right: String(titleLeft) + ea,
  //     width: String(desigerBoxWidth) + ea,
  //     height: String(desigerBoxHeight) + ea,
  //   };
  //   for (let i in style) {
  //     designerBox.style[i] = style[i];
  //   }
  //
  //   designerTitle = GeneralJs.nodes.div.cloneNode(true);
  //   designerTitle.textContent = "추천 디자이너 :";
  //   style = {
  //     position: "absolute",
  //     top: String(designerFactorTitleTop) + ea,
  //     left: String(1) + ea,
  //     fontSize: String(designerFactorTitleSize) + ea,
  //     fontWeight: String(400),
  //   };
  //   for (let i in style) {
  //     designerTitle.style[i] = style[i];
  //   }
  //   designerBox.appendChild(designerTitle);
  //   pastBlocks.push(designerTitle);
  //
  //   for (let i = 0; i < targetDesigners.length; i++) {
  //     if (i % 3 === 0) {
  //       for (let dom of pastBlocks) {
  //         dom.style.top = String(Number(dom.style.top.replace(/[^0-9\.\-]/gi, '')) - (targetDesignerBoxIndent * Math.floor(i / 3))) + ea;
  //       }
  //     }
  //     designerFactor = GeneralJs.nodes.div.cloneNode(true);
  //     designerFactor.textContent = targetDesigners[targetDesigners.length - 1 - i];
  //     style = {
  //       fontSize: String(designerFactorSize) + ea,
  //       fontWeight: String(500),
  //       width: "calc(100% / 3)",
  //       display: "inline-block",
  //       position: "absolute",
  //       top: String(targetDesignerBoxTop) + ea,
  //       textAlign: ([ "left", "center", "right" ])[3 - 1 - (i % 3)],
  //       left: "calc(calc(100% / 3) * " + String(3 - 1 - (i % 3)) + ")",
  //     };
  //     for (let j in style) {
  //       designerFactor.style[j] = style[j];
  //     }
  //     if (i % 3 !== 1) {
  //       designerBar = GeneralJs.nodes.div.cloneNode(true);
  //       style = {
  //         position: "absolute",
  //         borderRight: "1px solid " + GeneralJs.colorChip.green,
  //         height: String(designerFactorHeight) + ea,
  //         bottom: String(designerBarBottom) + ea,
  //         left: String(designerBarLeft) + ea,
  //       };
  //       if (i % 3 === 2) {
  //         style.borderLeft = style.borderRight;
  //         style.right = style.left;
  //         delete style.borderRight;
  //         delete style.left;
  //       }
  //       for (let j in style) {
  //         designerBar.style[j] = style[j];
  //       }
  //       designerFactor.appendChild(designerBar);
  //     }
  //     designerBox.appendChild(designerFactor);
  //     pastBlocks.push(designerFactor);
  //   }
  //
  //   if (targetDesigners.length % 3 === 1) {
  //     designerBar.parentNode.removeChild(designerBar);
  //   }
  //
  //   rightBox.appendChild(designerBox);
  // }

  whiteBlock.appendChild(rightBox);

  //top white wording
  if (!media[3] && !media[4]) {
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
  }

  //end
  this.baseTong.appendChild(whiteBlock);
}

DesignerProposalJs.prototype.insertDesignerBoxes = function () {
  const instance = this;
  const { topMargin, leftMargin } = this.whiteBoxNumbers;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight, bottomMargin;
  let whiteBlocks;

  blockHeight = <%% 820, 820, 820, 820, 820 %%>;
  bottomMargin = <%% 16, 16, 16, 16, 5 %%>;

  whiteBlocks = [];
  for (let z = 0; z < this.proposal.detail.length; z++) {
    whiteBlock = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: String(blockHeight) + ea,
      background: desktop ? GeneralJs.colorChip.white : "transparent",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + GeneralJs.colorChip.gray5 : "",
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

DesignerProposalJs.prototype.insertDesignerBox = function (mother, info, index) {
  const instance = this;
  const { ea, media } = this;
  const { topMargin, leftMargin } = this.whiteBoxNumbers;
  const { desid, designer, pictureSettings, description } = info;
  const mobile = media[4];
  const desktop = !mobile;
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
  let feeDetailBox, feeDetailBoxTitle;

  bottomMarginVisual = <%% 3, 3, 3, 3, 3 %%>;

  designerTitleSize = <%% 20, 20, 20, 18, 4 %%>;
  titleWordSpacing = <%% -2, -2, -2, -2, -2 %%>;
  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  margin = <%% 18, 18, 18, 14, 2 %%>;

  pictureBoxWidth = <%% 980, 934, 784, 644, this.standardWidth %%>;
  pictureBoxHeight = pictureBoxWidth * (210 / 297);

  descriptionPaddingTop = <%% 22, 22, 22, 17, 10 %%>;
  descriptionPaddingBottom = <%% descriptionPaddingTop + 2, descriptionPaddingTop + 2, descriptionPaddingTop + 2, descriptionPaddingTop + 2, descriptionPaddingTop - 5 %%>;
  descriptionPaddingLeft = <%% 28, 38, 38, 32, 7 %%>;
  descriptionPaddingRight = <%% 20, 20, 20, 20, 5 %%>;
  descriptionMargin = <%% 10, 6, 6, 6, 1 %%>;
  descriptionSize = <%% 14.5, 14.5, 14.5, 13.5, 3.4 %%>;

  descriptionTitleTop = <%% -30, -30, -30, -30, 4 %%>;
  descriptionTitleLeft = <%% 1, 1, 1, 1, this.subBoxMargin.left %%>;
  descriptionTitleSize = <%% 16, 16, 16, 14, 3.5 %%>;

  pointRadius = <%% 2, 2, 2, 2, 0.6 %%>;
  pointLeftIndent = <%% 5, 5, 5, 5, 1.2 %%>;
  pointTop = <%% 9, 9 + (GeneralJs.isMac() ? 0 : -0.5), 9 + (GeneralJs.isMac() ? 0 : -0.5), 8.5 + (GeneralJs.isMac() ? 0 : -1.5), 2.1 %%>;

  indexFont = <%% 19, 19, 19, 19, 3 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  analyticsBoxHeight = <%% 300, 300, 300, 300, 40 %%>;
  analyticsBoxTopMargin = <%% 50, 50, 50, 50, 2 %%>;

  portfolioBoxHeight = <%% 150, 150, 150, 150, 150 %%>;

  feeHeight = <%% 30, 30, 30, 30, 18 %%>;
  feeMarginBottom = <%% 10, 10, 10, 10, 0 %%>;

  //mother padding
  mother.style.paddingTop = String(desktop ? topMargin : 3) + ea;
  mother.style.paddingBottom = String(desktop ? leftMargin + bottomMarginVisual : 0) + ea;
  mother.style.height = "";

  //title
  designerTitle = GeneralJs.nodes.div.cloneNode(true);
  // designerTitle.insertAdjacentHTML("beforeend", "추천 디자이너 " + this.abc[this.abcStatic] + "&nbsp;&nbsp;<b style=\"color:" + GeneralJs.colorChip.gray3 + "\">></b>&nbsp;&nbsp;<b style=\"color:" + GeneralJs.colorChip.green + "\">" + designer + "</b>");
  designerTitle.insertAdjacentHTML("beforeend", "추천 디자이너&nbsp;&nbsp;<b style=\"color:" + GeneralJs.colorChip.green + "\">" + this.abc[this.abcStatic] + "</b>");
  style = {
    position: "relative",
    marginLeft: String(desktop ? leftMargin : 0) + ea,
    marginRight: String(desktop ? leftMargin : 0) + ea,
    width: desktop ? "calc(100% - " + String(leftMargin * 2) + ea + ")" : String(100) + '%',
    fontSize: String(designerTitleSize) + ea,
    fontWeight: String(500),
    wordSpacing: String(titleWordSpacing) + "px",
    marginBottom: String(margin + (GeneralJs.isMac() ? 0 : -2)) + ea,
  };
  if (mobile) {
    style.marginBottom = String(2.2) + ea;
  }
  for (let i in style) {
    designerTitle.style[i] = style[i];
  }
  this.abcStatic = this.abcStatic + 1;

  //index
  if (desktop) {
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
  }

  mother.appendChild(designerTitle);

  //picture and description
  pictureDescription = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    marginLeft: String(desktop ? leftMargin : 0) + ea,
    width: desktop ? "calc(100% - " + String(leftMargin * 2) + ea + ")" : String(100) + '%',
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
  };
  for (let i in style) {
    pictureBox.style[i] = style[i];
  }

  //pictures
  for (let i of pictureSettings) {
    picture = GeneralJs.nodes.div.cloneNode(true);
    pictureStyle = DesignerProposalJs.styleTextParsing(i.styleText);
    pictureStyle.position = "absolute";
    pictureStyle.borderRadius = String(3) + "px";
    pictureStyle.backgroundSize = "100% 100%";
    for (let j in pictureStyle) {
      picture.style[j] = pictureStyle[j];
    }
    pictureBox.appendChild(picture);
  }

  pictureDescription.appendChild(pictureBox);

  if (media[0]) {
    //description box
    descriptionBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: "calc(100% - " + String(pictureBoxWidth + margin) + ea + ")",
      background: GeneralJs.colorChip.gray1,
      borderRadius: String(3) + "px",
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
      if (desktop) {
        style.top = String(GeneralJs.isMac() ? pointTop : pointTop - 0.5) + ea;
      }
      for (let j in style) {
        descriptionPoint.style[j] = style[j];
      }
      descriptionDetailBox.appendChild(descriptionPoint);
      descriptionBox.appendChild(descriptionDetailBox);
    }
    pictureDescription.appendChild(descriptionBox);
  }

  mother.appendChild(pictureDescription);

  if (media[1] || media[2] || media[3] || media[4]) {
    //description box
    descriptionBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      marginLeft: String(desktop ? leftMargin : 0) + ea,
      width: desktop ? "calc(100% - " + String(leftMargin * 2) + ea + ")" : String(100) + '%',
      border: desktop ? "1px solid " + GeneralJs.colorChip.gray3 : String(0),
      borderRadius: String(3) + "px",
      right: String(0) + ea,
      bottom: String(0) + ea,
      paddingTop: String(descriptionPaddingTop) + ea,
      paddingBottom: String(descriptionPaddingBottom) + ea,
      marginTop: String(desktop ? 51 : 2) + ea,
      background: mobile ? GeneralJs.colorChip.white : "transparent",
      boxShadow: mobile ? "0px 5px 12px -10px " + GeneralJs.colorChip.gray5 : "",
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
      wordSpacing: String(wordSpacing) + "px",
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
        wordSpacing: String(-1) + "px",
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
    mother.appendChild(descriptionBox);
  }

  //designer analytics
  analyticsBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    marginLeft: String(desktop ? leftMargin : 0) + ea,
    marginRight: String(desktop ? leftMargin : 0) + ea,
    width: desktop ? "calc(100% - " + String(leftMargin * 2) + ea + ")" : String(100) + '%',
    height: String(analyticsBoxHeight) + ea,
    marginTop: String(analyticsBoxTopMargin) + ea,
    boxSizing: "border-box",
    borderRadius: String(3) + "px",
    border: desktop ? "1px solid " + GeneralJs.colorChip.gray3 : String(0),
    background: mobile ? GeneralJs.colorChip.white : "transparent",
    boxShadow: mobile ? "0px 5px 12px -10px " + GeneralJs.colorChip.gray5 : "",
  };
  for (let i in style) {
    analyticsBox.style[i] = style[i];
  }
  analyticsBoxTitle = GeneralJs.nodes.div.cloneNode(true);
  analyticsBoxTitle.textContent = "디자이너 상세 정보";
  style = {
    position: "absolute",
    left: String(desktop ? 0 : this.subBoxMargin.left) + ea,
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
    marginLeft: String(desktop ? leftMargin : 0) + ea,
    marginRight: String(desktop ? leftMargin : 0) + ea,
    width: desktop ? "calc(100% - " + String(leftMargin * 2) + ea + ")" : String(100) + '%',
    height: String(portfolioBoxHeight) + ea,
    marginTop: String(analyticsBoxTopMargin) + ea,
    boxSizing: "border-box",
    borderRadius: String(3) + "px",
    border: desktop ? "1px solid " + GeneralJs.colorChip.gray3 : String(0),
    background: mobile ? GeneralJs.colorChip.white : "transparent",
    boxShadow: mobile ? "0px 5px 12px -10px " + GeneralJs.colorChip.gray5 : "",
  };
  for (let i in style) {
    portfolioBox.style[i] = style[i];
  }
  portfolioBoxTitle = GeneralJs.nodes.div.cloneNode(true);
  portfolioBoxTitle.textContent = "디자이너 포트폴리오";
  style = {
    position: "absolute",
    left: String(desktop ? 0 : this.subBoxMargin.left) + ea,
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

  // //designer fee detail
  // feeDetailBox = GeneralJs.nodes.div.cloneNode(true);
  // style = {
  //   position: "relative",
  //   marginLeft: String(desktop ? leftMargin : 0) + ea,
  //   marginRight: String(desktop ? leftMargin : 0) + ea,
  //   width: desktop ? "calc(100% - " + String(leftMargin * 2) + ea + ")" : String(100) + '%',
  //   height: String(portfolioBoxHeight) + ea,
  //   marginTop: String(analyticsBoxTopMargin) + ea,
  //   boxSizing: "border-box",
  //   borderRadius: String(3) + "px",
  //   border: desktop ? "1px solid " + GeneralJs.colorChip.gray3 : String(0),
  //   background: mobile ? GeneralJs.colorChip.white : "transparent",
  //   boxShadow: mobile ? "0px 5px 12px -10px " + GeneralJs.colorChip.gray5 : "",
  // };
  // for (let i in style) {
  //   feeDetailBox.style[i] = style[i];
  // }
  // feeDetailBoxTitle = GeneralJs.nodes.div.cloneNode(true);
  // feeDetailBoxTitle.textContent = "디자이너비 상세 사항";
  // style = {
  //   position: "absolute",
  //   left: String(desktop ? 0 : this.subBoxMargin.left) + ea,
  //   top: String(descriptionTitleTop) + ea,
  //   fontSize: String(descriptionTitleSize) + ea,
  //   fontWeight: String(600),
  // };
  // for (let i in style) {
  //   feeDetailBoxTitle.style[i] = style[i];
  // }
  // feeDetailBox.appendChild(feeDetailBoxTitle);
  // this.designerFeeDetail(feeDetailBox, desid, info.fee);
  // mother.appendChild(feeDetailBox);

  //designer fee
  feeBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    marginLeft: String(desktop ? leftMargin : 0) + ea,
    marginRight: String(desktop ? leftMargin : 0) + ea,
    width: desktop ? "calc(100% - " + String(leftMargin * 2) + ea + ")" : String(100) + '%',
    height: String(feeHeight) + ea,
    marginTop: String((!media[2] && !media[3]) ? analyticsBoxTopMargin : (media[2] ? 30 : 20)) + ea,
    marginBottom: String(feeMarginBottom) + ea,
    borderRadius: mobile ? String(3) + "px" : "",
    background: mobile ? GeneralJs.colorChip.white : "transparent",
    boxShadow: mobile ? "0px 5px 12px -10px " + GeneralJs.colorChip.gray5 : "",
  };
  for (let i in style) {
    feeBox.style[i] = style[i];
  }
  this.designerFee(feeBox, info.fee);
  mother.appendChild(feeBox);
}

DesignerProposalJs.prototype.designerAnalytics = function (mother, desid) {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { top, bottom, left } = this.subBoxMargin;
  const thisDesigner = this.designers.pick(desid);
  const map = this.proposalMapGenerator(thisDesigner);
  let propertyBox;
  let pointClone;
  let pointRadius, pointTop;
  let margin;
  let leftIndent, width0, width1, height;
  let initNumber;
  let maxNumber;
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
  let heightException;

  initNumber = 2;
  maxNumber = 6;

  leftIndent = <%% 20, 6, 6, 6, 0 %%>;
  width1 = <%% 360, 320, 390, 340, 60 %%>;
  width0 = (!media[2] && !media[3]) ? ((width1 * 2) + leftIndent) : (media[2] ? 715 : 622);
  height = <%% 26, 24, 19, 16, 4.8 %%>;
  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;

  margin = <%% 12, 12, 12, 12, 1 %%>;

  pointRadius = <%% 2, 2, 2, 2, 0 %%>;
  pointTop = <%% 9, 7.5, 7.5, 6.5, 1 %%>;
  pointTopValue = <%% 8, 8, 8, 8, 8 %%>;
  pointIntendValue = <%% 4, 4, 4, 4, 4 %%>;

  checkBoxRadius = <%% 4, 4, 4, 4, 1.05 %%>;
  checkBoxRadiusTop = <%% (GeneralJs.isMac() ? 6 : 5.5), (GeneralJs.isMac() ? 4.5 : 5), 5, (GeneralJs.isMac() ? 4.5 : 3), 1.2 %%>;
  checkBoxRadiusIntend = <%% 5, 5, 5, 5, 1 %%>;

  titleSize = <%% 16, 14, 15, 13.5, 3.3 %%>;
  titleIndent = <%% 4, 3, 4, 4, 0 %%>;
  titleTop = 0;

  valueIndent = <%% 140, 120, 150, 130, 30 %%>;

  checkboxMarginRight = <%% 35, 32, 32, 24, 5.6 %%>;
  radioMarginRight = <%% 35, 32, 32, 32, 5.6 %%>;

  valueDomBarLeft = <%% 60, 58, 58, 60, 13 %%>;
  valueDomValueWidth = <%% 13, 13, 13, 60, 3.8 %%>;
  valueDomValueMargin = <%% 10, 10, 10, 60, 0 %%>;

  tendencyVisualLeft = <%% 60, 52, 30, 10, 10 %%>;
  tendencyTop = <%% 33, 33, 33, 33, 6.5 %%>;
  tendencyMargin = <%% 3, 3, 3, 3, 0.5 %%>;

  heightException = 0;

  if (media[2] || media[3]) {
    map.pop();
  }

  for (let i = 0; i < map.length; i++) {

    //base
    propertyBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      top: String(top + ((margin + height) * ((i < 2 || ((media[0] || media[1]) && i === map.length - 1)) ? 0 : (i < (maxNumber + 1) ? i - 1 : i - (maxNumber + 1 - initNumber))))) + ea,
      left: String(left + ((i < (maxNumber + 1) && i !== 1) ? 0 : (width1 + leftIndent))) + ea,
      width: String((i === 2 || i === 6) ? width0 : width1) + ea,
      height: String(height) + ea,
    };
    // if (media[2] || media[3]) {
    //   if (i >= maxNumber) {
    //     if (media[2]) {
    //       style.width = String(297) + ea;
    //     } else if (media[3]) {
    //       style.width = String(267) + ea;
    //     }
    //   }
    // }
    if (media[0] || media[1]) {
      if (i === map.length - 1) {
        style.top = String(top) + ea;
        style.left = String(left + (leftIndent * 2) + (width1 * 2) - tendencyVisualLeft) + ea;
        style.height = String((height * maxNumber) + (margin * (maxNumber - 1))) + ea;
        style.width = "calc(100% - " + String((left * 2) + width0 + leftIndent - tendencyVisualLeft) + ea + ")";
      }
    }
    if (mobile) {
      style.top = String(top + ((margin + height) * (i + heightException))) + ea;
      style.left = String(left) + ea;
      style.width = "calc(100% - " + String(left * 2) + ea + ")";
      if (map[i].standard !== null) {
        if (JSON.parse(JSON.stringify(map[i].standard)).join('').length >= 20) {
          heightException = heightException + 0.9;
          style.height = String(height * 2) + ea;
        }
      }
    }
    for (let j in style) {
      propertyBox.style[j] = style[j];
    }

    //circle
    if (desktop) {
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
    }

    //property title
    titleDom = GeneralJs.nodes.div.cloneNode(true);
    titleDom.textContent = map[i].name;
    style = {
      position: "absolute",
      fontSize: String(titleSize) + ea,
      fontWeight: String(500),
      wordSpacing: String(wordSpacing) + "px",
      left: String((pointRadius * 2) + titleIndent) + ea,
      top: String(desktop ? 0 : 0) + ea,
    };
    if (desktop) {
      style.top = GeneralJs.isMac() ? String(0) + ea : String(2) + ea;
    }

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
        wordSpacing: String(wordSpacing) + "px",
        left: String((pointRadius * 2) + valueIndent - checkBoxRadiusIntend) + ea,
        top: String(0) + ea,
        color: GeneralJs.colorChip.green
      };
      if (mobile) {
        delete style.left;
        style.right = String(0) + ea;
      }
      for (let j in style) {
        valueDom.style[j] = style[j];
      }
      propertyBox.appendChild(valueDom);

    } else if (map[i].type === "checkbox" || map[i].type === "radio") {

      if (map[i].type === "radio") {
        map[i].value = [ map[i].value ];
      }
      map[i].value = map[i].value.map((h) => { return h.replace(/[^가-힣]/gi, ''); });

      valueDom = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        fontSize: String(titleSize) + ea,
        fontWeight: String(400),
        wordSpacing: String(wordSpacing) + "px",
        left: String((pointRadius * 2) + valueIndent) + ea,
        top: String(0) + ea,
        color: GeneralJs.colorChip.gray3,
        width: "calc(100% - " + String((pointRadius * 2) + valueIndent) + ea + ")",
        height: String(100) + '%',
      };
      if (mobile) {
        delete style.left;
        style.right = String(0) + ea;
        style.width = String(80) + '%';
        style.textAlign = "right";
      }
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
          fontWeight: (map[i].value.includes(map[i].standard[z].replace(/[^가-힣]/gi, '')) ? String(400) : "inherit"),
          color: (map[i].value.includes(map[i].standard[z].replace(/[^가-힣]/gi, '')) ? GeneralJs.colorChip.green : "inherit"),
          wordSpacing: String(wordSpacing) + "px",
          marginRight: String(map[i].type === "checkbox" ? checkboxMarginRight : radioMarginRight) + ea,
          top: String(0) + ea,
        };
        if (mobile) {
          style.marginLeft = style.marginRight;
          delete style.marginRight;
          style.textAlign = "right";
          style.marginBottom = String(1.2) + ea;
        } else {
          style.top = GeneralJs.isMac() ? String(0) + ea : String(1) + ea;
        }
        if (z === 0 && desktop) {
          style.marginLeft = String(9) + ea;
        }
        for (let j in style) {
          valueDomStandard.style[j] = style[j];
        }

        if (map[i].value.includes(map[i].standard[z].replace(/[^가-힣]/gi, ''))) {
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

      propertyBox.style.height = String(50) + ea;
      if (desktop) {
        tendencyHeight = ((height * maxNumber) + (margin * (maxNumber - 1)) - tendencyTop - (tendencyMargin * (map[i].standard.length - 1))) / map[i].standard.length;
      } else {
        tendencyHeight = 4;
      }

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
          width: String(valueDomBarLeft) + (desktop ? ea : "%"),
          height: String(tendencyHeight) + ea,
        };
        if (mobile) {
          style.color = GeneralJs.colorChip.green;
        }
        for (let j in style) {
          valueDomText.style[j] = style[j];
        }
        valueDom.appendChild(valueDomText);

        valueDomBar = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          left: String(valueDomBarLeft) + ea,
          top: String(desktop ? -1 * (tendencyMargin / 2) : 0) + ea,
          color: GeneralJs.colorChip.green,
          width: "calc(100% - " + String(valueDomBarLeft + valueDomValueWidth + valueDomValueMargin) + ea + ")",
          height: String(tendencyHeight * (desktop ? 0.8 : 0.7)) + ea,
          borderRadius: String(3) + "px",
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
            style.borderTopRightRadius = String(3) + "px";
            style.borderBottomRightRadius = String(3) + "px";
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
        if (mobile) {
          delete style.width;
        }
        for (let j in style) {
          valueDomValue.style[j] = style[j];
        }
        valueDom.appendChild(valueDomValue);

        propertyBox.appendChild(valueDom);
      }

    }

    mother.appendChild(propertyBox);
  }

  if (desktop) {
    mother.style.height = String((top + bottom) + (height * maxNumber) + (margin * (maxNumber - 1))) + ea;
  } else {
    mother.style.height = String(121) + ea;
  }

}

DesignerProposalJs.prototype.designerPortfolio = function (mother, desid) {
  const instance = this;
  const { ea, media, frontPage } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { top, bottom, left } = this.subBoxMargin;
  const thisDesigner = this.designers.pick(desid);
  GeneralJs.ajax("noFlat=true&where=" + JSON.stringify({ desid }) + "&limit=12", "/getContents", function (res) {
    const contentsArr = JSON.parse(res);
    const web = {
      portfolio: frontPage + "/portdetail.php?qqq=",
      review: frontPage + "/revdetail.php?qqq="
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
    let mobilePaddingTop;

    marginTop = <%% left - 6, left - 6, top, top, 2 %%>;
    marginBottom = <%% left - 3, left - 3, bottom, bottom, 5.1 %%>;

    entireHeight = <%% 20, 21, 20, 18, 4 %%>;
    entireMarginBottom = <%% 10, 10, 10, 10, 1 %%>;

    fontSize = <%% 15, 15, 15, 13.5, 2.9 %%>;
    wordSpacing = <%% -1, -1, -1, -1, -2 %%>;

    portfolioRight = <%% 80, 76, 76, 76, 0 %%>;
    barRight = <%% 66, 64, 64, 61, 0 %%>;

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
      titleDom.textContent = (title.portfolio.length >= 40) ? title.portfolio.split(' ').slice(0, -1).join(' ') : title.portfolio;
      style = {
        display: "inline-block",
        position: "relative",
        fontSize: String(fontSize) + ea,
        fontWeight: String(400),
        left: String(0) + ea,
        top: String(0) + ea,
        color: GeneralJs.colorChip.black,
        wordSpacing: String(wordSpacing) + "px",
      };
      for (let j in style) {
        titleDom.style[j] = style[j];
      }
      entireDom.appendChild(titleDom);

      portfolioDom = GeneralJs.nodes.div.cloneNode(true);
      portfolioDom.textContent = desktop ? "포트폴리오" : "H";
      portfolioDom.classList.add("hoverDefault");
      portfolioDom.setAttribute("link", link.portfolio);
      style = {
        position: "absolute",
        fontSize: String(fontSize) + ea,
        fontWeight: String(400),
        right: String(portfolioRight) + ea,
        top: String(0) + ea,
        color: GeneralJs.colorChip.green,
        wordSpacing: String(wordSpacing) + "px",
      };
      if (mobile) {
        style.fontSize = String(fontSize + 0.3) + ea;
        style.top = String(-0.15) + ea;
      }
      for (let j in style) {
        portfolioDom.style[j] = style[j];
      }
      portfolioDom.addEventListener("click", webOpenEvent);
      entireDom.appendChild(portfolioDom);

      if (desktop) {

        barDom = GeneralJs.nodes.div.cloneNode(true);
        barDom.textContent = "|";
        style = {
          position: "absolute",
          fontSize: String(fontSize) + ea,
          fontWeight: String(400),
          right: String(barRight) + ea,
          top: String(0) + ea,
          color: GeneralJs.colorChip.gray4,
          wordSpacing: String(wordSpacing) + "px",
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
          wordSpacing: String(wordSpacing) + "px",
        };
        if (!/re999/gi.test(link.review)) {
          reviewDom.addEventListener("click", webOpenEvent);
        }
        for (let j in style) {
          reviewDom.style[j] = style[j];
        }
        entireDom.appendChild(reviewDom);
      }

      mother.appendChild(entireDom);
      num = num + 1;
    }

    if (sourceArr.length === 0) {
      mother.parentNode.removeChild(mother);
    } else {
      if (desktop) {
        mother.style.height = String(marginTop + marginBottom + (sourceArr.length * entireHeight) + ((sourceArr.length - 1) * entireMarginBottom)) + ea;
      } else {
        mobilePaddingTop = 8.6;
        mother.style.height = String(mobilePaddingTop + marginTop + marginBottom + (sourceArr.length * entireHeight) + ((sourceArr.length - 1) * entireMarginBottom)) + ea;
        mother.style.paddingTop = String(mobilePaddingTop) + ea;
      }
    }
  });

}

DesignerProposalJs.prototype.feeToString = function (fee, percentage = 1, noMethod = false) {
  const instance = this;
  const { autoComma } = GeneralJs;
  let moneyText;
  let money;
  moneyText = '';
  for (let { amount, method, partial } of fee) {
    money = amount * percentage;
    money = Math.round(money / 1000) * 1000;
    moneyText += (noMethod ? "" : (/offline/gi.test(method) ? "오프라인" : "온라인") + (partial ? "(부분) " : ' ')) + autoComma(money) + "원";
    moneyText += ", ";
  }
  moneyText = moneyText.slice(0, -2);
  return moneyText;
}

DesignerProposalJs.prototype.designerFee = function (mother, fee) {
  const instance = this;
  const { ea, media } = this;
  const { withOut } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  let arrowBox, arrowHead, moneyBox, vatBox;
  let style;
  let wordSpacing;
  let arrowTop;
  let headWidth, headTop, headMargin, headVisual;
  let feeBottom, feeSize, feeRight;
  let vatBottom, vatSize, vatRight;
  let barMargin;

  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  arrowTop = <%% 11, 11, 13, 16, 11 %%>;

  headWidth = <%% 10, 10, 10, 8, 10 %%>;
  headTop = <%% 6, 6, 8, 12, 6 %%>;
  headMargin = <%% 18, 18, 18, 18, 18 %%>;
  headVisual = <%% 11, 11, 11, 11, 11 %%>;

  feeBottom = <%% 0, 0, 0, 0, 0 %%>;
  feeSize = <%% 28, 28, 26, 22, 5 %%>;
  feeRight = <%% 60, 60, 60, 60, 0 %%>;

  vatBottom = <%% 3, 3, 3, 3, 3 %%>;
  vatSize = <%% 15, 15, 15, 15, 3 %%>;
  vatRight = <%% 0, 0, 0, 0, 0 %%>;

  barMargin = <%% 15, 15, 15, 15, 3 %%>;

  if (desktop) {
    feeBottom = feeBottom + (GeneralJs.isMac() ? 0 : -3);
    vatBottom = vatBottom + (GeneralJs.isMac() ? 0 : -3);
  }

  if (desktop) {
    arrowBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
      width: withOut(feeRight + 10, ea),
      top: String(arrowTop) + ea,
    };
    for (let i in style) {
      arrowBox.style[i] = style[i];
    }
    mother.appendChild(arrowBox);

    // arrowHead = GeneralJs.nodes.div.cloneNode(true);
    // style = {
    //   position: "absolute",
    //   borderRight: "1px solid " + GeneralJs.colorChip.gray3,
    //   borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
    //   width: String(headWidth) + ea,
    //   height: String(headWidth) + ea,
    //   transform: "rotate(315deg)",
    //   top: String(headTop) + ea,
    //   left: "calc(100% - 351px)",
    // };
    // for (let i in style) {
    //   arrowHead.style[i] = style[i];
    // }
    // mother.appendChild(arrowHead);
  }

  moneyBox = GeneralJs.nodes.div.cloneNode(true);
  moneyBox.textContent = this.feeToString(fee);
  style = {
    position: "absolute",
    bottom: String(feeBottom) + ea,
    right: String(feeRight) + ea,
    fontSize: String(feeSize) + ea,
    fontWeight: String(500),
    color: GeneralJs.colorChip.green,
    background: GeneralJs.colorChip.white,
  };
  if (mobile) {
    delete style.bottom;
    style.top = String(3) + ea;
    style.width = String(100) + '%';
    style.textAlign = "center";
  } else if (desktop) {
    style.paddingLeft = String(barMargin) + ea;
  }
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
  if (mobile) {
    delete style.bottom;
    style.top = String(9.5) + ea;
    style.width = String(100) + '%';
    style.textAlign = "center";
  }
  for (let i in style) {
    vatBox.style[i] = style[i];
  }
  mother.appendChild(vatBox);

  // if (desktop) {
  //   setTimeout(function () {
  //     let standardWidth, spaceException, oneException, visualException;
  //     visualException = 3;
  //     standardWidth = moneyBox.getBoundingClientRect().width + vatBox.getBoundingClientRect().width + headMargin + visualException;
  //     if (desktop && !GeneralJs.isMac()) {
  //       spaceException = ([ ...moneyBox.textContent.matchAll(/ /g) ]).length;
  //       oneException = ([ ...moneyBox.textContent.matchAll(/1/g) ]).length;
  //       spaceException = (2 * spaceException);
  //       oneException = (0 * oneException);
  //       standardWidth = standardWidth - visualException - spaceException - oneException;
  //     }
  //     arrowBox.style.width = "calc(100% - " + String(standardWidth) + ea + ")";
  //     arrowHead.style.left = "calc(100% - " + String(standardWidth + headVisual) + ea + ")";
  //   }, 0);
  // }

}

DesignerProposalJs.prototype.designerFeeDetail = function (mother, desid, fee) {
  const instance = this;
  const { ea, media } = this;
  const { dateToString, autoComma } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  const { top, bottom, left } = this.subBoxMargin;
  const thisDesigner = this.designers.pick(desid);
  const percentage = 0.8;
  // GeneralJs.ajax({
  //   mode: "inspection",
  //
  // }, "/parsingAddress", function (res) {
    // const contentsArr = JSON.parse(res);

    const addressCompress = function (address) {
      let tempArr, targetIndex;
      tempArr = address.split(' ');
      for (let i = 0; i < tempArr.length; i++) {
        if (/[동로가리길]$/i.test(tempArr[i])) {
          targetIndex = i;
        }
      }
      return tempArr.slice(0, targetIndex + 1).join(' ');
    }
    let sourceArr;
    let style;
    let num;
    let entireDom;
    let entireHeight, entireMarginBottom;
    let titleDom, amountDom;
    let wordSpacing, fontSize;
    let marginTop, marginBottom;
    let mobilePaddingTop;

    marginTop = <%% left - 6, left - 6, top, top, 2 %%>;
    marginBottom = <%% left - 3, left - 3, bottom, bottom, 5.1 %%>;

    entireHeight = <%% 20, 21, 20, 18, 4 %%>;
    entireMarginBottom = <%% 10, 10, 10, 10, 1 %%>;

    fontSize = <%% 15, 15, 15, 13.5, 2.9 %%>;
    wordSpacing = <%% -1, -1, -1, -1, -1 %%>;

    sourceArr = [
      { title: thisDesigner.designer + " 디자이너 디자인 용역비", amount: instance.feeToString(fee, percentage, true) },
      { title: thisDesigner.designer + " 디자이너 디자인 감리비", amount: instance.feeToString(fee, 1 - percentage, true) },
      { title: "출장비 (거리 : " + String(297) + "km)", amount: autoComma(1000000) + "원" }
    ];

    num = 0;
    for (let { title, amount } of sourceArr) {
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
      titleDom.textContent = title;
      style = {
        display: "inline-block",
        position: "relative",
        fontSize: String(fontSize) + ea,
        fontWeight: String(400),
        left: String(0) + ea,
        top: String(0) + ea,
        color: GeneralJs.colorChip.black,
        wordSpacing: String(wordSpacing) + "px",
      };
      for (let j in style) {
        titleDom.style[j] = style[j];
      }
      entireDom.appendChild(titleDom);

      amountDom = GeneralJs.nodes.div.cloneNode(true);
      amountDom.textContent = amount + " (vat 별도)";
      amountDom.classList.add("hoverDefault");
      style = {
        position: "absolute",
        fontSize: String(fontSize) + ea,
        fontWeight: String(400),
        right: String(0) + ea,
        top: String(0) + ea,
        color: GeneralJs.colorChip.green,
        wordSpacing: String(wordSpacing) + "px",
      };
      if (mobile) {
        style.fontSize = String(fontSize + 0.3) + ea;
        style.top = String(-0.15) + ea;
      }
      for (let j in style) {
        amountDom.style[j] = style[j];
      }
      entireDom.appendChild(amountDom);

      mother.appendChild(entireDom);
      num = num + 1;
    }

    if (desktop) {
      mother.style.height = String(marginTop + marginBottom + (sourceArr.length * entireHeight) + ((sourceArr.length - 1) * entireMarginBottom)) + ea;
    } else {
      mobilePaddingTop = 8.6;
      mother.style.height = String(mobilePaddingTop + marginTop + marginBottom + (sourceArr.length * entireHeight) + ((sourceArr.length - 1) * entireMarginBottom)) + ea;
      mother.style.paddingTop = String(mobilePaddingTop) + ea;
    }
  // });

}

DesignerProposalJs.prototype.insertWordBox = function () {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { topMargin, leftMargin } = this.whiteBoxNumbers;
  const { createNode, createNodes, colorChip, withOut, ajaxJson } = GeneralJs;
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
  let num;
  let grayHeight;
  let grayTop;
  let grayTextTop;
  let grayTextLeft;
  let grayTextSize;
  let buttonTongHeight;
  let buttonHeight;
  let finalBottom;
  let buttonTong;

  top = <%% topMargin - 2, topMargin - 2, topMargin - 2, topMargin - 2, 5 %%>;
  bottom = <%% topMargin - 3, topMargin - 3, topMargin - 2, topMargin - 2, 4 %%>;

  blockMarginBottom = <%% 16, 16, 16, 16, 2 %%>;
  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;

  box0Size = <%% 140, 140, 140, 120, 4.5 %%>;
  box1Size = <%% 25, 25, 25, 25, 3 %%>;
  box0Margin = <%% 55, 55, 55, 55, 3 %%>;
  box1Margin = <%% 18, 18, 18, 18, 3 %%>;

  marginBottom = <%% 3, 3, 3, 3, 1.8 %%>;
  wordSize = <%% 15, 15, 15, 13, 2.8 %%>;

  grayHeight = <%% 180, 180, 180, 180, 42 %%>;
  grayTop = <%% topMargin + 2, topMargin + 2, topMargin + 2, topMargin + 2, 5 %%>;
  grayTextTop = <%% 22, 22, 20, 20, 3 %%>;
  grayTextLeft = <%% 22, 20, 18, 15, 3 %%>;
  grayTextSize = <%% 12, 12, 10, 10, 2 %%>;

  buttonTongHeight = <%% 30, 30, 30, 30, 5 %%>;
  buttonHeight = <%% 13, 13, 12, 11, 2.5 %%>;

  finalBottom = <%% -3, -4, -7, -9, 0 %%>;

  whiteBlock = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    borderRadius: String(desktop ? 8 : 3) + "px",
    width: String(100) + '%',
    background: GeneralJs.colorChip.white,
    boxShadow: "0px 5px 12px -10px " + GeneralJs.colorChip.gray5,
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
    marginLeft: String(desktop ? leftMargin : 0) + ea,
    width: desktop ? "calc(100% - " + String(leftMargin * 2) + ea + ")" : String(100) + '%',
  };
  for (let i in style) {
    wordsTable.style[i] = style[i];
  }

  num = 0;
  for (let arr of matrix) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      marginBottom: String(marginBottom) + ea,
    };
    for (let j in style) {
      div_clone.style[j] = style[j];
    }
    if (desktop) {
      if (num !== matrix.length - 1) {
        if (matrix[num + 1][0] !== '' && matrix[num][0] === '') {
          div_clone.style.marginBottom = String(marginBottom * 6) + ea;
        }
      }
    }

    for (let z = 0; z < arr.length; z++) {
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        display: "inline-block",
        fontSize: String(wordSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
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
      if (mobile) {
        style = {
          display: "inline-block",
          fontSize: String(wordSize) + ea,
          wordSpacing: String(wordSpacing) + "px",
          position: "relative",
          top: String(0) + ea,
          verticalAlign: "top",
          lineHeight: String(1.6),
          left: String((this.subBoxMargin.left + 0.2)) + ea,
          width: GeneralJs.withOut((this.subBoxMargin.left + 0.2) * 2, ea),
        };
        if (z === 0) {
          continue;
        }
        if (z === 1) {
          style.width = String(box0Size) + ea;
          style.color = GeneralJs.colorChip.green;
        }
        if (z === 2) {
          style.width = GeneralJs.withOut(((this.subBoxMargin.left + 0.2) * 2) + box0Size, ea);
          style.left = String(box0Size) + ea;
        }
      }
      for (let j in style) {
        div_clone2.style[j] = style[j];
      }
      if (/\<b\%/gi.test(arr[z])) {
        arr[z] = arr[z].replace(/\<b\%/gi, "<b style=\"color:" + GeneralJs.colorChip.green + "\">");
        arr[z] = arr[z].replace(/\%b\>/gi, "</b>");
      }
      div_clone2.insertAdjacentHTML("beforeend", arr[z]);
      div_clone.appendChild(div_clone2);
    }

    wordsTable.appendChild(div_clone);

    num++;
  }

  whiteBlock.appendChild(wordsTable);

  if (desktop) {
    grayBar = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
      left: String(desktop ? leftMargin : 0) + ea,
      width: desktop ? "calc(100% - " + String(leftMargin * 2) + ea + ")" : String(100) + ea,
      marginTop: String(desktop ? top : 0) + ea,
      marginBottom: String(desktop ? top : 0) + ea,
    };
    for (let i in style) {
      grayBar.style[i] = style[i];
    }
    whiteBlock.appendChild(grayBar);

    for (let z = 0; z < subWords.length; z++) {
      wordBlock = createNode({
        mother: whiteBlock,
        text: subWords[z],
        style: {
          position: "relative",
          left: String(desktop ? leftMargin : 0) + ea,
          width: mobile ? String(100) + '%' : "calc(100% - " + String(leftMargin * 2) + ea + ")",
          fontSize: String(wordSize) + ea,
          fontWeight: String(400),
          wordSpacing: String(wordSpacing) + "px",
          verticalAlign: "top",
          lineHeight: String(1.6),
          marginBottom: String(marginBottom * 1.5) + ea,
          color: colorChip.black,
        },
        bold: {
          fontWeight: String(600),
          color: colorChip.green,
        },
        under: {
          "text-decoration": "underline",
          color: colorChip.green,
        },
      });
    }

  }

  [ grayTong, grayTextScroll, grayTextTong ] = createNodes([
    {
      mother: whiteBlock,
      style: {
        position: "relative",
        left: String(desktop ? leftMargin : 4.5) + ea,
        width: desktop ? withOut(leftMargin * 2, ea) : withOut(4.5 * 2, ea),
        marginTop: String(grayTop) + ea,
        marginBottom: String(desktop ? 15 : 2.5) + ea,
        height: String(grayHeight) + ea,
        background: colorChip.gray1,
        borderRadius: String(3) + "px",
      }
    },
    {
      mother: -1,
      style: {
        position: "absolute",
        top: String(grayTextTop) + ea,
        left: String(grayTextLeft) + ea,
        width: withOut(grayTextLeft * 2, ea),
        height: withOut(grayTextTop * 2, ea),
        overflow: "scroll",
      }
    },
    {
      mother: -1,
      style: {
        position: "absolute",
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(100) + '%',
        height: "auto",
        fontSize: String(grayTextSize) + ea,
        fontWeight: String(300),
        lineHeight: String(1.6),
      }
    },
  ]);

  [ buttonTong ] = createNodes([
    {
      mother: whiteBlock,
      attribute: [
        { toggle: "on" }
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            if (buttonOn.style !== undefined) {
              if (this.getAttribute("toggle") === "on") {
                buttonOn.style.opacity = String(0);
                this.setAttribute("toggle", "off");
              } else {
                buttonOn.style.opacity = String(1);
                this.setAttribute("toggle", "on");
              }
            }
          }
        }
      ],
      style: {
        position: "relative",
        left: String(desktop ? leftMargin : 4.5) + ea,
        width: desktop ? withOut(leftMargin * 2, ea) : withOut(4.5 * 2, ea),
        marginBottom: String(finalBottom) + ea,
        height: String(buttonTongHeight) + ea,
        cursor: "pointer",
      }
    },
  ]);

  ajaxJson("/designerProposal_policy").then(function (res) {
    const { policy, button } = res;
    let bTags;

    grayTextTong.insertAdjacentHTML("beforeend", policy);
    bTags = grayTextTong.querySelectorAll("b");
    for (let b of bTags) {
      b.style.color = colorChip.black;
      b.style.fontWeight = String(600);
    }

    [ buttonOff, buttonOn ] = createNodes([
      {
        mother: buttonTong,
        mode: "svg",
        source: button.off,
        style: {
          position: "absolute",
          height: String(buttonHeight) + ea,
          right: String(0) + ea,
          top: String(0) + ea,
        }
      },
      {
        mother: buttonTong,
        mode: "svg",
        source: button.on,
        style: {
          position: "absolute",
          height: String(buttonHeight) + ea,
          right: String(0) + ea,
          top: String(0) + ea,
          background: colorChip.white,
        }
      },
    ]);

  }).catch(function (err) {
    throw new Error(err);
  });

}

DesignerProposalJs.prototype.insertServiceBox = function () {
  const instance = this;
  const { ea, media, testMode } = this;
  const baseTong = this.baseTong;
  const { topMargin, leftMargin } = this.whiteBoxNumbers;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac } = GeneralJs;
  const words = new WordsDictionary();
  const serviceObj = words.getServiceWording();
  let whiteBlock;
  let blockHeight, blockMarginBottom;
  let wordsTable;
  let marginBottom;
  let nodeArr;
  let wordSize, wordSpacing;
  let box0Size, box1Size, box0Margin, box1Margin;
  let top, bottom;
  let grayHeight, grayTop, grayTong, grayTextScroll, grayTextTong, grayTextTop, grayTextLeft, grayTextSize;
  let buttonTong, buttonHeight, buttonTongHeight;
  let buttonOff = {}, buttonOn = {};
  let finalBottom;
  let tempBlock, tempChild, tempDom;
  let whiteBlockHeight, whiteBlockMargin, whiteBlockPaddingTop, whiteBlockPaddingLeft, whiteBlockVisual;
  let methodsTongTop, methodsTongBottom, methodsTongLeft, methodsBlockBottom;
  let methodsTitleWidth;
  let methodsBlockPaddingBottom;
  let methodsSecondBlockWidth;
  let methodsTongClassName;
  let methodsThirdBlockBottom;
  let methodsSecondBlockRight;
  let methodsTextVisual;
  let mobileTitleSize;
  let processTongClassName;
  let processBlockMarginLeft;
  let processArrowWidth;
  let processArrowTop;
  let processBlockHeight;
  let processBlockPaddingBottom;
  let processThirdBlockBottom;
  let amountTextVisual, amountTextTop;

  top = <%% topMargin - 2, topMargin - 2, topMargin - 2, topMargin - 2, 5 %%>;
  bottom = <%% topMargin - 3, topMargin - 3, topMargin - 2, topMargin - 2, 4 %%>;

  blockHeight = <%% 400, 400, 400, 400, 400 %%>;
  blockMarginBottom = <%% 16, 16, 16, 16, 2 %%>;
  marginBottom = <%% 13, 13, 13, 13, 3 %%>;

  mobileTitleSize = 3.5;
  wordSize = <%% 15, 15, 15, 13, 2.8 %%>;
  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;

  box0Size = <%% 140, 120, 120, 82, 12 %%>;
  box1Size = <%% 25, 0, 0, 0, 3 %%>;
  box0Margin = <%% 55, 55, 55, 45, 3 %%>;
  box1Margin = <%% 18, 18, 0, 0, 3 %%>;

  grayHeight = <%% 180, 180, 180, 180, 42 %%>;
  grayTop = <%% 4, 4, 4, 4, 0 %%>;
  grayTextTop = <%% 12, 12, 10, 9, 1.8 %%>;
  grayTextLeft = <%% 12, 12, 10, 9, 1.8 %%>;
  grayTextSize = <%% 14, 14, 13, 11, 2.3 %%>;

  buttonTongHeight = <%% 30, 30, 30, 30, 5 %%>;
  buttonHeight = <%% 13, 13, 12, 11, 2.5 %%>;

  finalBottom = <%% -3, -4, -7, -9, 0 %%>;

  whiteBlockHeight = <%% (isMac() ? 26 : 25), (isMac() ? 26 : 25), (isMac() ? 24 : 23), (isMac() ? 20 : 19), 4.6 %%>;
  whiteBlockMargin = <%% 6, 6, 6, 4, 1 %%>;
  whiteBlockPaddingTop = <%% 6, 6, 6, 4, 1 %%>;
  whiteBlockPaddingLeft = <%% 11, 11, 11, 9, 2 %%>;
  whiteBlockVisual = <%% 1, 1, 1, 1, 0 %%>;

  methodsTongTop = <%% 18, 18, 18, 18, 3.2 %%>;
  methodsTongBottom = <%% 1, 1, 1, 1, 0 %%>;
  methodsTongLeft = <%% 24, 24, 22, 22, 4 %%>;
  methodsTitleWidth = <%% 155, 140, 128, 110, 20 %%>;
  methodsBlockPaddingBottom = <%% 20, 20, 20, 16, 1.5 %%>;
  methodsBlockBottom = <%% 16, 16, 16, 16, 3.5 %%>;
  if (desktop) {
    if (!isMac()) {
      if (media[3]) {
        methodsBlockPaddingBottom = methodsBlockPaddingBottom - 2;
        methodsBlockBottom = methodsBlockBottom + 1;
      } else {
        methodsBlockPaddingBottom = methodsBlockPaddingBottom - 4;
        methodsBlockBottom = methodsBlockBottom + 2;
      }
    }
  }
  methodsSecondBlockWidth = <%% 370, 170, 170, 116, 80 %%>;
  methodsSecondBlockRight = <%% 0, 32, 28, 28, 10 %%>;
  methodsTongClassName = "methodsDetailTong";
  processTongClassName = "processDetailTong";
  methodsThirdBlockBottom = <%% 9, 9, 9, 9, 1 %%>;
  methodsTextVisual = <%% 0, 0, 1, 1, 0 %%>;

  processBlockMarginLeft = <%% 8, 8, 8, 7, 1.5 %%>;
  processBlockHeight = <%% 22, 22, 22, 18, 3 %%>;
  processArrowWidth = <%% 25, 25, 25, 24, 5 %%>;
  processArrowTop = <%% 7, 7, 7, 5, 1.3 %%>;
  processThirdBlockBottom = <%% 4, 4, 4, 2, 0.5 %%>;
  if (desktop) {
    if (!isMac()) {
      processThirdBlockBottom = processThirdBlockBottom - 2;
      processArrowTop = processArrowTop - 2;
    }
  }
  processBlockPaddingBottom = <%% 16, 16, 16, 16, 0.5 %%>;

  amountTextVisual = <%% 3, 3, 3, 3, 0.8 %%>;
  amountTextTop = <%% 20, 20, 20, 18, 0.1 %%>;

  [ whiteBlock, wordsTable ] = createNodes([
    {
      mother: baseTong,
      style: {
        position: "relative",
        borderRadius: String(desktop ? 8 : 3) + "px",
        width: String(100) + '%',
        background: colorChip.white,
        boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
        marginBottom: String(blockMarginBottom) + ea,
        paddingTop: String(top) + ea,
        paddingBottom: String(bottom) + ea,
      }
    },
    {
      mother: -1,
      style: {
        position: "relative",
        marginLeft: String(desktop ? leftMargin : 0) + ea,
        width: desktop ? withOut(leftMargin * 2, ea) : String(100) + '%',
      }
    }
  ]);

  //main service
  nodeArr = [
    {
      mother: wordsTable,
      style: {
        position: "relative",
        marginBottom: String(marginBottom) + ea,
      }
    }
  ];

  if (desktop) {
    nodeArr.push({
      mother: -1,
      text: serviceObj.name,
      style: {
        display: "inline-block",
        fontSize: String(wordSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
        position: "relative",
        top: String(0) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
        width: String(box0Size) + ea,
        marginRight: String(box0Margin) + ea,
        fontWeight: String(600),
        textAlign: "left",
        color: colorChip.black,
      }
    });
    nodeArr.push({
      mother: -2,
      text: '0',
      style: {
        display: "inline-block",
        fontSize: String(wordSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
        position: "relative",
        top: String(0) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
        width: String(box1Size) + ea,
        marginRight: String(box1Margin) + ea,
        fontWeight: String(600),
        color: colorChip.white,
        textAlign: "right",
      }
    });
    nodeArr.push({
      mother: -3,
      text: serviceObj.contents,
      style: {
        display: "inline-block",
        fontSize: String(wordSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
        position: "relative",
        top: String(0) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
        width: "calc(100% - " + String(box0Size + box1Size + box0Margin + box1Margin) + ea + ")",
        fontWeight: String(300),
        textAlign: "left",
        color: colorChip.black,
      },
      bold: {
        fontWeight: String(600),
        color: colorChip.green,
      },
      under: {
        "text-decoration": "underline",
        color: colorChip.green,
      }
    });
  } else {
    nodeArr.push({
      mother: -1,
      text: serviceObj.name,
      style: {
        display: "block",
        fontSize: String(mobileTitleSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
        position: "relative",
        top: String(0) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
        left: String((this.subBoxMargin.left + 0.2)) + ea,
        width: withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
        fontWeight: String(600),
        color: colorChip.black,
        marginBottom: String(marginBottom / 2) + ea,
      }
    });
    nodeArr.push({
      mother: -2,
      text: serviceObj.contents,
      style: {
        display: "block",
        fontSize: String(wordSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
        position: "relative",
        top: String(0) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
        left: String((this.subBoxMargin.left + 0.2)) + ea,
        width: withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
      },
      bold: {
        fontWeight: String(600),
        color: colorChip.green,
      },
      under: {
        "text-decoration": "underline",
        color: colorChip.green,
      }
    });
  }

  createNodes(nodeArr);

  //items

  tempBlock = createNode({
    mother: wordsTable,
    style: {
      position: "relative",
      marginBottom: String(marginBottom) + ea,
    }
  });

  createNode({
    mother: tempBlock,
    text: serviceObj.items.name,
    style: {
      display: desktop ? "inline-block" : "block",
      fontSize: String(desktop ? wordSize : mobileTitleSize) + ea,
      wordSpacing: String(wordSpacing) + "px",
      position: "relative",
      top: String(0) + ea,
      verticalAlign: "top",
      lineHeight: String(1.6),
      left: desktop ? "" : String((this.subBoxMargin.left + 0.2)) + ea,
      width: desktop ? String(box0Size) + ea : withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
      marginRight: desktop ? String(box0Margin) + ea : "",
      marginBottom: desktop ? "" : String(marginBottom / 2) + ea,
      fontWeight: String(600),
      textAlign: "left",
      color: colorChip.black,
    }
  });

  if (desktop) {
    createNode({
      mother: tempBlock,
      text: '0',
      style: {
        display: "inline-block",
        fontSize: String(wordSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
        position: "relative",
        top: String(0) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
        width: String(box1Size) + ea,
        marginRight: String(box1Margin) + ea,
        fontWeight: String(600),
        color: colorChip.white,
        textAlign: "right",
      }
    });
  }

  [ grayTong, grayTextTong ] = createNodes([
    {
      mother: tempBlock,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        left: desktop ? "" : String((this.subBoxMargin.left + 0.2)) + ea,
        width: desktop ? withOut(box0Size + box1Size + box0Margin + box1Margin, ea) : withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
        marginTop: String(grayTop) + ea,
        marginBottom: String(desktop ? 6 : 2.5) + ea,
        paddingTop: String(grayTextTop) + ea,
        paddingBottom: String(grayTextTop - whiteBlockMargin + whiteBlockVisual) + ea,
        background: colorChip.gray1,
        borderRadius: String(3) + "px",
      }
    },
    {
      mother: -1,
      style: {
        position: "relative",
        marginLeft: String(grayTextLeft) + ea,
        width: withOut(grayTextLeft * 2, ea),
      }
    },
  ]);

  for (let i = 0; i < serviceObj.items.contents.length; i++) {
    createNodes([
      {
        mother: grayTextTong,
        style: {
          display: "inline-block",
          background: colorChip.white,
          borderRadius: String(3) + "px",
          position: "relative",
          height: String(whiteBlockHeight) + ea,
          marginRight: String(whiteBlockMargin) + ea,
          marginBottom: String(whiteBlockMargin) + ea,
          paddingTop: String(whiteBlockPaddingTop) + ea,
          paddingLeft: String(whiteBlockPaddingLeft) + ea,
          paddingRight: String(whiteBlockPaddingLeft) + ea,
        }
      },
      {
        mother: -1,
        text: serviceObj.items.contents[i],
        style: {
          fontSize: String(grayTextSize) + ea,
          fontWeight: String(400),
          color: colorChip.green,
        }
      }
    ]);
  }

  //methods

  if (!testMode) {
    tempBlock = createNode({
      mother: wordsTable,
      style: {
        position: "relative",
        marginBottom: String(marginBottom) + ea,
      }
    });

    createNode({
      mother: tempBlock,
      text: serviceObj.methods.name,
      style: {
        display: desktop ? "inline-block" : "block",
        fontSize: String(desktop ? wordSize : mobileTitleSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
        position: "relative",
        top: String(0) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
        left: desktop ? "" : String((this.subBoxMargin.left + 0.2)) + ea,
        width: desktop ? String(box0Size) + ea : withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
        marginRight: desktop ? String(box0Margin) + ea : "",
        marginBottom: desktop ? "" : String(marginBottom / 2) + ea,
        fontWeight: String(600),
        textAlign: "left",
        color: colorChip.black,
      }
    });

    if (desktop) {
      createNode({
        mother: tempBlock,
        text: '0',
        style: {
          display: "inline-block",
          fontSize: String(wordSize) + ea,
          wordSpacing: String(wordSpacing) + "px",
          position: "relative",
          top: String(0) + ea,
          verticalAlign: "top",
          lineHeight: String(1.6),
          width: String(box1Size) + ea,
          marginRight: String(box1Margin) + ea,
          fontWeight: String(600),
          color: colorChip.white,
          textAlign: "right",
        }
      });
    }

    [ grayTong, grayTextTong ] = createNodes([
      {
        mother: tempBlock,
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          left: desktop ? "" : String((this.subBoxMargin.left + 0.2)) + ea,
          width: desktop ? withOut(box0Size + box1Size + box0Margin + box1Margin, ea) : withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
          marginTop: String(grayTop) + ea,
          marginBottom: String(desktop ? 6 : 2.5) + ea,
          paddingTop: String(methodsTongTop) + ea,
          paddingBottom: String(methodsTongBottom) + ea,
          borderRadius: String(3) + "px",
          border: "1px solid " + colorChip.gray3,
          boxSizing: "border-box",
        }
      },
      {
        mother: -1,
        style: {
          position: "relative",
          marginLeft: String(methodsTongLeft) + ea,
          width: withOut(methodsTongLeft * 2, ea),
        }
      },
    ]);

    for (let i = 0; i < serviceObj.methods.contents.length; i++) {
      tempChild = createNode({
        mother: grayTextTong,
        style: {
          position: "relative",
          display: "block",
          marginBottom: String(i === serviceObj.methods.contents.length - 1 ? 0 : methodsBlockBottom) + ea,
          paddingBottom: String(methodsBlockPaddingBottom) + ea,
          borderBottom: (i === serviceObj.methods.contents.length - 1) ? "" : "1px solid " + colorChip.gray3,
        },
        children: [
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              width: desktop ? String(methodsTitleWidth) + ea : "",
              verticalAlign: "top",
              marginBottom: desktop ? "" : String(1) + ea,
            },
            children: [
              {
                text: serviceObj.methods.contents[i].name,
                style: {
                  position: "relative",
                  left: String(desktop ? 1 : 0) + ea,
                  fontSize: String(wordSize - methodsTextVisual) + ea,
                  fontWeight: String(600),
                  lineHeight: String(1.5),
                  color: colorChip.black,
                }
              },
              {
                text: "약 " + String(serviceObj.methods.contents[i].amount) + "일 소요",
                style: {
                  position: "absolute",
                  left: desktop ? String(1) + ea : "",
                  fontSize: String(wordSize - methodsTextVisual - amountTextVisual) + ea,
                  fontWeight: String(400),
                  lineHeight: String(1.5),
                  top: String(amountTextTop) + ea,
                  right: mobile ? String(0) + ea : "",
                  color: colorChip.green,
                }
              }
            ]
          },
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              width: desktop ? String(methodsSecondBlockWidth) + ea : "",
              verticalAlign: "top",
              marginRight: desktop ? String(methodsSecondBlockRight) + ea : "",
              marginBottom: desktop ? "" : String(2.5) + ea,
            },
            children: [
              {
                text: serviceObj.methods.contents[i].contents,
                style: {
                  fontSize: String(wordSize - methodsTextVisual) + ea,
                  fontWeight: String(300),
                  lineHeight: String(1.5),
                  color: colorChip.black,
                }
              }
            ]
          },
          {
            class: [ methodsTongClassName ],
            style: {
              display: "inline-block",
              position: "relative",
              width: desktop ? withOut(methodsTitleWidth + methodsSecondBlockWidth + methodsSecondBlockRight, ea) : "",
              marginBottom: desktop ? "" : String(serviceObj.methods.contents[i].children.length !== 0 ? 2.5 : 0) + ea,
            },
          }
        ]
      });
      tempDom = tempChild.querySelector('.' + methodsTongClassName);
      for (let j = 0; j < serviceObj.methods.contents[i].children.length; j++) {
        createNode({
          mother: tempDom,
          text: "<b%-%b> " + serviceObj.methods.contents[i].children[j],
          style: {
            display: "block",
            position: "relative",
            fontSize: String(wordSize - methodsTextVisual) + ea,
            fontWeight: String(300),
            color: colorChip.black,
            marginBottom: String(j === serviceObj.methods.contents[i].children.length - 1 ? 0 : methodsThirdBlockBottom) + ea,
            lineHeight: String(1.5),
          },
          bold: {
            color: colorChip.green,
          }
        });
      }
    }
  }

  //process

  tempBlock = createNode({
    mother: wordsTable,
    style: {
      position: "relative",
      marginBottom: String(marginBottom) + ea,
    }
  });

  createNode({
    mother: tempBlock,
    text: serviceObj.process.name,
    style: {
      display: desktop ? "inline-block" : "block",
      fontSize: String(desktop ? wordSize : mobileTitleSize) + ea,
      wordSpacing: String(wordSpacing) + "px",
      position: "relative",
      top: String(0) + ea,
      verticalAlign: "top",
      lineHeight: String(1.6),
      left: desktop ? "" : String((this.subBoxMargin.left + 0.2)) + ea,
      width: desktop ? String(box0Size) + ea : withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
      marginRight: desktop ? String(box0Margin) + ea : "",
      marginBottom: desktop ? "" : String(marginBottom / 2) + ea,
      fontWeight: String(600),
      textAlign: "left",
      color: colorChip.black,
    }
  });

  if (desktop) {
    createNode({
      mother: tempBlock,
      text: '0',
      style: {
        display: "inline-block",
        fontSize: String(wordSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
        position: "relative",
        top: String(0) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
        width: String(box1Size) + ea,
        marginRight: String(box1Margin) + ea,
        fontWeight: String(600),
        color: colorChip.white,
        textAlign: "right",
      }
    });
  }

  [ grayTong, grayTextTong ] = createNodes([
    {
      mother: tempBlock,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        left: desktop ? "" : String((this.subBoxMargin.left + 0.2)) + ea,
        width: desktop ? withOut(box0Size + box1Size + box0Margin + box1Margin, ea) : withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
        marginTop: String(grayTop) + ea,
        marginBottom: String(desktop ? 6 : 2.5) + ea,
        paddingTop: String(methodsTongTop) + ea,
        paddingBottom: String(methodsTongBottom) + ea,
        borderRadius: String(3) + "px",
        border: "1px solid " + colorChip.gray3,
        boxSizing: "border-box",
      }
    },
    {
      mother: -1,
      style: {
        position: "relative",
        marginLeft: String(methodsTongLeft) + ea,
        width: withOut(methodsTongLeft * 2, ea),
      }
    },
  ]);

  for (let i = 0; i < serviceObj.process.contents.length; i++) {
    tempChild = createNode({
      mother: grayTextTong,
      style: {
        position: "relative",
        display: "block",
        marginBottom: String(i === serviceObj.process.contents.length - 1 ? 0 : methodsBlockBottom) + ea,
        paddingBottom: String(processBlockPaddingBottom) + ea,
        borderBottom: (i === serviceObj.process.contents.length - 1) ? "" : "1px solid " + colorChip.gray3,
      },
      children: [
        {
          style: {
            display: desktop ? "inline-block" : "block",
            position: "relative",
            width: desktop ? String(methodsTitleWidth) + ea : "",
            verticalAlign: "top",
            marginBottom: desktop ? "" : String(1) + ea,
          },
          children: [
            {
              text: serviceObj.process.contents[i].name,
              style: {
                position: "relative",
                left: String(desktop ? 1 : 0) + ea,
                fontSize: String(wordSize - methodsTextVisual) + ea,
                fontWeight: String(600),
                lineHeight: String(1.5),
                color: colorChip.black,
              }
            }
          ]
        },
        {
          class: [ processTongClassName ],
          style: {
            display: desktop ? "inline-block" : "block",
            position: "relative",
            width: desktop ? withOut(methodsTitleWidth, ea) : "",
            verticalAlign: "top",
            marginBottom: desktop ? "" : String(2.5) + ea,
          },
        },
      ]
    });
    tempDom = tempChild.querySelector('.' + processTongClassName);
    for (let j = 0; j < serviceObj.process.contents[i].contents.length; j++) {
      createNode({
        mother: tempDom,
        text: serviceObj.process.contents[i].contents[j],
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(wordSize - methodsTextVisual) + ea,
          fontWeight: String(300),
          color: colorChip.black,
          marginRight: String(processBlockMarginLeft) + ea,
          marginBottom: String(processThirdBlockBottom) + ea,
          lineHeight: String(1.5),
        },
        bold: {
          color: colorChip.green,
        }
      });
      if (j !== serviceObj.process.contents[i].contents.length - 1) {
        createNode({
          mother: tempDom,
          style: {
            display: "inline-block",
            position: "relative",
            width: String(processArrowWidth) + ea,
            height: String(processBlockHeight) + ea,
            marginRight: String(processBlockMarginLeft) + ea,
            verticalAlign: "top",
            marginBottom: String(processThirdBlockBottom) + ea,
          },
          children: [
            {
              mode: "svg",
              source: instance.mother.returnLongArrow(colorChip.green),
              style: {
                position: "absolute",
                width: String(processArrowWidth) + ea,
                top: String(processArrowTop) + ea,
                left: String(0),
              }
            }
          ]
        });
      }
    }
  }

}

DesignerProposalJs.prototype.insertPannelBox = function () {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
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

  blockHeight = <%% 820, 820, 820, 820, 820 %%>;
  blockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  buttonHeight = <%% 47, 48, 48, 40, 8.4 %%>;
  buttonWidth = <%% 92, 92, 92, 74, 17 %%>;
  buttonMargin = <%% 8, 8, 8, 5, 2 %%>;

  buttonTextTop = <%% 9, 9, 9, 9, 1.2 %%>;
  buttonTextSize = <%% 20, 20, 20, 16, 3.8 %%>;

  if (desktop) {
    buttonTextTop = buttonTextTop + (GeneralJs.isMac() ? 0 : 2);
  }

  headWidth = <%% 10, 10, 10, 10, 2 %%>;
  headVisual = <%% 11, 11, 11, 11, 11 %%>;

  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;

  finalBottom = <%% 42, 42, 42, 20, 5 %%>;

  whiteBlock = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    borderRadius: String(desktop ? 8 : 3) + "px",
    paddingTop: String(desktop ? topMargin : 5.8) + ea,
    paddingLeft: String(this.subBoxMargin.left) + ea,
    paddingRight: String(this.subBoxMargin.left) + ea,
    width: GeneralJs.withOut(this.subBoxMargin.left * 2, ea),
    height: String(blockHeight) + ea,
    background: GeneralJs.colorChip.white,
    boxShadow: "0px 5px 12px -10px " + GeneralJs.colorChip.gray5,
    marginBottom: String(blockMarginBottom) + ea,
  };
  for (let i in style) {
    whiteBlock.style[i] = style[i];
  }
  this.baseTong.appendChild(whiteBlock);

  designerButtonTong = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    height: desktop ? String(buttonHeight) + ea : "auto",
    textAlign: "center",
  };
  if (mobile) {
    if (this.proposal.detail.length >= 3) {
      style.width = (buttonWidth * 3) + (buttonMargin * 2);
    } else {
      style.width = (buttonWidth * this.proposal.detail.length) + (buttonMargin * (this.proposal.detail.length - 1));
    }
    style.left = "calc(50% - " + String(style.width / 2) + ea + ")";
    style.width = String(style.width) + ea;
  }
  for (let i in style) {
    designerButtonTong.style[i] = style[i];
  }

  this.designerButtons = [];
  for (let z = 0; z < this.proposal.detail.length; z++) {
    designerButton = GeneralJs.nodes.div.cloneNode(true);
    designerButton.setAttribute("desid", this.proposal.detail[z].desid);
    designerButton.setAttribute("designer", this.proposal.detail[z].designer);
    style = {
      display: "inline-block",
      position: "relative",
      width: String(buttonWidth) + ea,
      height: desktop ? String(100) + '%' : String(buttonHeight) + ea,
      background: GeneralJs.colorChip.gray2,
      color: GeneralJs.colorChip.deactive,
      borderRadius: String(3) + "px",
      marginRight: String(buttonMargin) + ea,
      transition: "all 0.2s ease",
      cursor: "pointer",
    };
    if (mobile) {
      if (this.proposal.detail.length > 3) {
        if (z < Math.floor((this.proposal.detail.length - 1) / 3) * 3) {
          style.marginBottom = String(buttonMargin) + ea;
        }
      }
      if (z % 3 === 2) {
        delete style.marginRight;
      }
    }
    if (z === this.proposal.detail.length - 1) {
      delete style.marginRight;
    }
    for (let i in style) {
      designerButton.style[i] = style[i];
    }
    designerButtonText = GeneralJs.nodes.div.cloneNode(true);
    designerButtonText.textContent = this.abc[z];
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

  // if (desktop) {
  //   for (let z = 0; z < 2; z++) {
  //     designerButtonBar = GeneralJs.nodes.div.cloneNode(true);
  //     style = {
  //       position: "absolute",
  //       width: "calc(50% - " + String((((buttonWidth * this.proposal.detail.length) + (buttonMargin * (this.proposal.detail.length - 1))) / 2) + buttonMargin + buttonMargin + leftMargin) + ea + ")",
  //       borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
  //       left: String(leftMargin) + ea,
  //       top: String(47) + '%',
  //     };
  //     if (z === 1) {
  //       style.right = style.left;
  //       delete style.left;
  //     }
  //     for (let i in style) {
  //       designerButtonBar.style[i] = style[i];
  //     }
  //     designerButtonTong.appendChild(designerButtonBar);
  //
  //     designerButtonBarHead = GeneralJs.nodes.div.cloneNode(true);
  //     style = {
  //       position: "absolute",
  //       width: String(headWidth) + ea,
  //       height: String(headWidth) + ea,
  //       borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
  //       borderRight: "1px solid " + GeneralJs.colorChip.gray3,
  //       transform: "rotate(-45deg)",
  //       left: "calc(50% - " + String((((buttonWidth * this.proposal.detail.length) + (buttonMargin * (this.proposal.detail.length - 1))) / 2) + buttonMargin + buttonMargin + headVisual) + ea + ")",
  //       top: String(36) + '%',
  //     };
  //     if (z === 1) {
  //       style.right = style.left;
  //       style.transform = "rotate(135deg)";
  //       delete style.left;
  //     }
  //     for (let i in style) {
  //       designerButtonBarHead.style[i] = style[i];
  //     }
  //     designerButtonTong.appendChild(designerButtonBarHead);
  //   }
  // }
  whiteBlock.appendChild(designerButtonTong);

  designerButtonTong = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    height: String(buttonHeight) + ea,
    textAlign: "center",
    marginTop: String(buttonMargin * 3 * (desktop ? 1 : 0.5)) + ea,
  };
  for (let i in style) {
    designerButtonTong.style[i] = style[i];
  }

  designerButton = GeneralJs.nodes.div.cloneNode(true);
  style = {
    display: "inline-block",
    position: "relative",
    width: String(buttonWidth * 1.7) + ea,
    height: String(100) + '%',
    background: GeneralJs.colorChip.green,
    borderRadius: String(3) + "px",
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
    let desid = null;
    let realName = null;
    for (let dom of instance.designerButtons) {
      if (dom.getAttribute("toggle") === "on") {
        target = dom;
        desid = dom.getAttribute("desid");
        realName = dom.getAttribute("designer");
        break;
      }
    }
    if (target === null || desid === null || realName === null) {
      window.alert("디자이너를 선택해주세요!");
      return;
    } else {
      if (window.confirm(target.textContent.trim() + " 디자이너를 선택하시겠습니까?")) {
        instance.submitEvent(desid, realName);
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
    fontSize: String(desktop ? (!media[3] ? 13 : 11) : 3) + ea,
    color: GeneralJs.colorChip.green,
    wordSpacing: String(wordSpacing) + "px",
    lineHeight: String(desktop && !media[3] ? 1.5 : 1.4),
  };
  for (let i in style) {
    informationArea.style[i] = style[i];
  }
  designerButtonTong.appendChild(informationArea);

  whiteBlock.appendChild(designerButtonTong);

  whiteBlock.style.paddingBottom = String(finalBottom) + ea;
  whiteBlock.style.height = "";

}

DesignerProposalJs.prototype.submitEvent = function (desid, designer) {
  const instance = this;
  const { frontPage } = this;
  const getObj = GeneralJs.returnGet();
  let name, phone;
  name = instance.client.name;
  phone = instance.client.phone;

  if (getObj.mode === "test") {
    window.alert("검수 모드입니다!");
  } else {

    GeneralJs.ajaxJson({
      method: "client",
      property: "curation",
      idArr: [ instance.client.cliid ]
    }, "/getHistoryProperty").then((obj) => {
      if (obj !== null && obj !== undefined && typeof obj === "object" && obj[instance.client.cliid] !== undefined && !obj[instance.client.cliid].analytics.full) {
        instance.mother.certificationBox(name, phone, async function (back, box) {
          try {
            await GeneralJs.ajaxJson({
              cliid: instance.client.cliid,
              proid: instance.project.proid,
              desid: desid,
              name: name,
              phone: phone,
              designer: designer,
            }, "/designerProposal_submit");
            await GeneralJs.sleep(500);
            document.body.removeChild(box);
            document.body.removeChild(back);
            window.location.href = frontPage + "/payment.php?card=true";
          } catch (e) {
            console.log(e);
          }
        });
      } else {
        window.alert("자동 큐레이션을 진행하신 고객님은 유선 확인 후 결제를 진행하실 수 있습니다! 금일 홈리에종 CX팀이 전화드릴 예정입니다!");
      }
    });

  }
}

DesignerProposalJs.prototype.launching = async function (loading) {
  const instance = this;
  try {

    this.mother.setGeneralProperties(this);

    const getObj = GeneralJs.returnGet();
    if (getObj.cliid === undefined && getObj.proid === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    let proid, cliid;
    let projects, project;
    let clients, client;
    let designers, designer;
    let whereQuery;
    let belowTarget, removeTargets;

    if (getObj.cliid !== undefined) {
      cliid = getObj.cliid;
      proid = null;
    } else {
      cliid = null;
      proid = getObj.proid;
    }

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
      window.location.href = this.frontPage;
    }

    if (projects.length === 0) {
      alert("아직 제안서가 만들어지지 않았습니다! 잠시만 기다려주세요 :)");
      window.location.href = this.frontPage;
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

    if (getObj.proid === undefined) {
      window.location.href = window.location.protocol + "//" + window.location.host + "/middle/proposal?proid=" + project.proid;
    }
    if (proid === "p1806_aa01s" && getObj.mode !== "test") {
      window.location.href = this.frontPage;
    }
    if (proid === "p1806_aa01s" && getObj.mode === "test") {
      this.client.name = "홍길동";
      this.testMode = true;
    }

    await this.mother.ghostClientLaunching({
      name: "designerProposal",
      client: client,
      base: {
        instance: this,
        binaryPath: DesignerProposalJs.binaryPath,
        subTitle: (this.client.name + " 고객님 제안서"),
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertDesignerBoxes();
          instance.insertServiceBox();
          instance.insertWordBox();
          instance.insertPannelBox();
        } catch (e) {
          console.log(e);
        }
      }
    });

    //loading end
    await GeneralJs.sleep(500);
    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
