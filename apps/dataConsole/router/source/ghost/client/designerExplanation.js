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
    "designer": false,
    "project": false,
    "contents": false,
    "service": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return ('홈리에종 디자이너 신청 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 디자이너 신청 설명 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "designerExplanation",
  "hangul": "디자이너 신청",
  "route": [
    "designerExplanation"
  ]
} %/%/g

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
        ]
      },
      {
        mother: "시공 범주",
        children: [
          "시공 진행시 홈리에종 시공사, 디자이너 시공사, 고객님께서 별도로 알아보신 시공사(홈스타일링 서비스일 경우) 중 진행이 가능합니다.",
        ]
      },
      {
        mother: "구매 안내",
        children: [
          "제품 구매는 고객님이 직접 진행합니다.",
          "최종 구매는 고객님이 직접 내용 확인 후 결정하셔야 합니다. 리뷰 확인이 정말 중요합니다!"
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
          "디자이너를 선택하고 계약금을 지불하면 디자이너와의 현장 미팅이 진행됩니다.",
          "현장 미팅 후에는 계약금을 환불하지 않습니다.",
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
        return `<b style="color:${GeneralJs.colorExtended.mainBlue}">${p1.slice(3, -3)}</b>`;
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
              "위치 변동 없는 조명 공사 포함",
              "빌트인 가구 제작은 시공에 포함, 빌트인 가구 제작 시 홈스타일링 유형"
            ],
            amount: 30,
            mobileLeft: 10.6,
          },
          {
            name: "홈스타일링",
            contents: "욕실, 싱크대 교체를 제외한 최소 시공에 스타일링 마무리",
            children: [
              "철거 제외 5가지 이하의 공정이 포함되는 경우",
              "공정 예시 : 도배, 필름, 중문, 조명 공사, 붙박이장, 타일 덧방 등",
              "홈리에종 시공사 / 디자이너 시공사 / 고객님께서 별도로 알아보신 시공사 중 선택",
            ],
            amount: 45,
            mobileLeft: 13.2,
          },
          {
            name: "토탈 스타일링",
            contents: "욕실, 싱크대 교체를 포함한 전체 시공에 스타일링 마무리",
            children: [
              "욕실 혹은 싱크대 교체 중 한 가지라도 해당하는 경우",
              "철거 제외 6가지 이상의 공정이 포함되는 경우",
              "공정 예시 : 목공사, 도배, 필름, 중문, 조명 공사, 붙박이장, 타일, 금속 등",
              "홈리에종 시공사 / 디자이너 시공사 중 매칭되는 시공사와 진행"
            ],
            amount: 60,
            mobileLeft: 16.1,
          },
          {
            name: "엑스트라 스타일링",
            contents: "설계 변경을 포함한 전체 시공에 스타일링 마무리",
            children: [
              "주방 구조 변경, 알파룸 혹은 발코니 디자인, 게이트 등 공간에 따른 디자인 시공",
              "홈리에종 시공사 / 디자이너 시공사 중 매칭되는 시공사와 진행"
            ],
            amount: 75,
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
              "계약금 입금",
              "디자이너와 현장 미팅",
              "계약서 서명 및 잔금 입금"
            ],
          },
          {
            name: "디자인 프로세스",
            contents: [
              "디자인 (2주 ~ 3주)",
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
        ]
      }
    };

    return obj;
  }

}

const DesignerExplanationJs = function () {
  this.mother = new GeneralJs();
}

DesignerExplanationJs.binaryPath = "/middle/proposal";

DesignerExplanationJs.prototype.insertInitBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const submitBlockClassName = "submitBlockClassName";
  try {
    let minusLeft;
    let firstBase;
    let leftRightWidth;
    let firstBasePaddingBottom;
    let blueTop;
    let subTitleSize, subTitleWeight, subTitleMarginTop;
    let buttonMarginTop;
    let buttonWidth;
    let buttonHeight;
    let buttonSize;
    let buttonTextTop;
    let buttonWeight;
    let firstBasePaddingTop;
    let mainIllust;
    let mobileLeftPaddingVisual;
    let titleSize, titleWeight, titleVisualTop, titleVisualLeft;
    let titleLineHeight;
    let descriptionContents;
    let descriptionSize, descriptionLineHeight;
    let descriptionMarginTop;
    let mainImageTop, mainImageHeight;

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    firstBasePaddingTop = <%% 24, 24, 24, 24, 8 %%>;
    firstBasePaddingBottom = <%% 170, 170, 160, 120, 20 %%>;
    blueTop = <%% 200, 200, 200, 200, 28 %%>;

    subTitleSize = <%% 19, 18, 17, 15, 3.6 %%>;
    subTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
    subTitleMarginTop = <%% 6, 6, 6, 6, 2.2 %%>;

    buttonMarginTop = <%% 146, 4, 24, 20, 3.6 %%>;
    buttonWidth = <%% 190, 145, 140, 130, 31 %%>;
    buttonHeight = <%% 32, 32, 32, 40, 9 %%>;
    buttonSize = <%% 14, 14, 14, 14, 3.5 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;

    titleSize = <%% 59, 50, 48, 40, 9 %%>;
    titleWeight = <%% 500, 500, 500, 500, 500 %%>;
    titleVisualTop = <%% -2, -2, -2, -2, -0.5 %%>;
    titleVisualLeft = <%% -2, -2, -2, -2, -0.5 %%>;
    titleLineHeight = <%% 1.11, 1.11, 1.11, 1.11, 1.07 %%>;

    mainImageTop = 42;
    mainImageHeight = 390;

    descriptionSize = 15;
    descriptionLineHeight = 1.8;

    mobileLeftPaddingVisual = 0.8;

    descriptionMarginTop = 40;

    mainIllust = <%% DesignerExplanationJs.binaryPath + "/mainIllust0.png", DesignerExplanationJs.binaryPath + "/mainIllust0.png", DesignerExplanationJs.binaryPath + "/mainIllust1.png", DesignerExplanationJs.binaryPath + "/mainIllust1.png", DesignerExplanationJs.binaryPath + "/mainIllust2.png" %%>;

    descriptionContents = [
      "고객님게 <b%오프라인 홈스타일링 basic 서비스%b>와 그에 맞는 디자이너를 제안드립니다.",
      "선택된 디자이너는 고객님의 예산을 현장 조건에 맞게 적절히 분배하여 스타일링을 진행합니다.",
    ];

    if (media[0] && window.innerHeight > 1100) {
      firstBasePaddingTop = 60;
      subTitleSize = 19;
      firstBasePaddingBottom = 230;
    }

    this.totalContents = document.getElementById("totalcontents");
    this.totalContents.style.overflow = "hidden";
    this.totalContents.style.background = colorExtended.mainBlue;
    document.body.style.background = colorExtended.mainBlue;

    firstBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(firstBasePaddingTop) + ea,
        flexDirection: "column",
        paddingBottom: String(firstBasePaddingBottom) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: desktop ? String((-1 * blueTop) + naviHeight) + ea : "calc(calc(" + String(naviHeight) + "px" + ") - " + String(blueTop) + ea + ")",
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.white,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: desktop ? withOut(1 * ((-1 * blueTop) + naviHeight), ea) : String(185) + ea,
        }
      }
    });
  
    // main title
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "start",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        paddingLeft: mobile ? String(mobileLeftPaddingVisual) + ea : "",
      },
      children: [
        {
          text: (desktop ? "Designer selection<b%.%b>" : "Designer\nselection<b%.%b>"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.mainBlue,
            fontFamily: "mont",
            top: String(titleVisualTop) + ea,
            left: String(titleVisualLeft) + ea,
            lineHeight: String(titleLineHeight),
          },
          bold: {
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.mainBlue,
            fontFamily: "mont",
            opacity: String(0.4),
          }
        }
      ]
    });

    // sub title
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "start",
        marginTop: String(subTitleMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        paddingLeft: mobile ? String(mobileLeftPaddingVisual) + ea : "",
      },
      children: [
        {
          text: "홈리에종 디자이너 추천",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(subTitleWeight),
            fontSize: String(subTitleSize) + ea,
          }
        }
      ]
    });

    // main illust
    createNode({
      mother: firstBase,
      mode: "img",
      attribute: {
        src: mainIllust
      },
      style: {
        position: "absolute",
        right: String(0),
        top: String(mainImageTop) + ea,
        height: String(mainImageHeight) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0.2s 1 normal forwards running fadeupdelay2",
      }
    })

    // description
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "start",
        marginTop: String(descriptionMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.5s ease 0s 1 normal forwards running fadeupdelay2",
      },
      children: [
        {
          text: descriptionContents.join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(400),
            fontSize: String(descriptionSize) + ea,
            lineHeight: String(descriptionLineHeight),
          },
          bold: {
            color: colorExtended.white,
            fontWeight: String(700),
            fontSize: String(descriptionSize) + ea,
            lineHeight: String(descriptionLineHeight),
            background: colorExtended.gradientBlue,
            padding: String(8) + ea,
            paddingTop: String(2) + ea,
            paddingBottom: String(4) + ea,
            "border-radius": String(5) + "px",
            margin: String(2) + ea,
          }
        }
      ]
    })

    // black buttons
    createNode({
      mother: firstBase,
      attribute: {
        selectstart: (e) => { e.preventDefault() },
      },
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "center",
        marginTop: String(buttonMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(10px)",
        animation: "1.2s ease 0.4s 1 normal forwards running fadeupdelay",
        cursor: "pointer",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",    
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            background: colorExtended.darkDarkShadow,
            borderRadius: String(buttonHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            attribute: {
              selectstart: (e) => { e.preventDefault() },
            },
            text: "예상 시작일&nbsp;&nbsp;|&nbsp;&nbsp;<b%24년 1월 17일%b>",
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(buttonSize) + ea,
              fontWeight: String(300),
              color: colorExtended.white,
            },
            bold: {
              fontSize: String(buttonSize) + ea,
              fontWeight: String(700),
              color: colorExtended.white,
            }
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",    
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            background: colorExtended.darkDarkShadow,
            borderRadius: String(buttonHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: String(8) + ea,
          },
          child: {
            attribute: {
              selectstart: (e) => { e.preventDefault() },
            },
            text: "예상 종료일&nbsp;&nbsp;|&nbsp;&nbsp;<b%24년 1월 17일%b>",
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(buttonSize) + ea,
              fontWeight: String(300),
              color: colorExtended.white,
            },
            bold: {
              fontSize: String(buttonSize) + ea,
              fontWeight: String(700),
              color: colorExtended.white,
            }
          }
        },
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

DesignerExplanationJs.prototype.insertSecondBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    let mainHeight;
    let minusLeft;
    let secondBase;
    let colorTop;
    let serviceBase;
    let textContent;
    let descriptionSize;
    let checkCircleWidth;
    let visualTop;
    let createServiceBlock;
    let titleSize;
    let descriptionMarginTop;
    let boxWidth, boxHeight;
    let betweenMargin;
    let totalHeight;

    mainHeight = <%% 440, 390, 370, 280, 136 %%>;
    minusLeft = window.innerWidth - standardWidth + 1;

    colorTop = <%% 200, 200, 200, 200, 200 %%>;

    titleSize = 23;
    descriptionSize = 15;
    descriptionMarginTop = 9;

    checkCircleWidth = 21;

    visualTop = 24;

    boxWidth = 290;
    boxHeight = 227;

    betweenMargin = 152;

    totalHeight = 350;

    textContent = [
      {
        title: "홈퍼니싱",
        description: [
          "<b%시공 없이 스타일링만%b>",
          "가구와 소품, 그리고 패브릭으로 진행",
        ],
        margin: false,
        focus: /aa01/gi.test(instance.project.service.serid),
      },
      {
        title: "홈스타일링",
        description: [
          "<b%부분 시공과 스타일링%b>",
          "집 컨디션에 맞는 범위의 시공을 진행",
        ],
        margin: true,
        focus: /aa02/gi.test(instance.project.service.serid),
      },
      {
        title: "토탈 스타일링",
        description: [
          "<b%전체 시공과 스타일링%b>",
          "전체 시공과 스타일링까지 전부 진행"
        ],
        margin: false,
        focus: (/aa03/gi.test(instance.project.service.serid) || /aa04/gi.test(instance.project.service.serid)),
      },
    ]

    secondBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        flexDirection: "column",
        height: String(totalHeight) + ea,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.blueWhiteBack,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * ((-1 * colorTop) + naviHeight), ea),
        }
      }
    });

    createServiceBlock = (index) => {
      serviceBase = createNode({
        mother: secondBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(boxWidth) + ea,
          height: String(boxHeight) + ea,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          top: String(visualTop) + ea,
          opacity: textContent[index].focus ? String(1) : String(0.4),
          marginLeft: textContent[index].margin ? String(betweenMargin) + ea : "",
          marginRight: textContent[index].margin ? String(betweenMargin) + ea : "",
        }
      });
      createNode({
        mother: serviceBase,
        mode: "svg",
        source: svgMaker.houseLine(colorExtended.focusBlue),
        style: {
          display: "flex",
          position: "absolute",
          width: String(boxWidth) + ea,
          top: String(0),
          left: String(0),
        }
      });
      createNode({
        mother: serviceBase,
        text: textContent[index].title,
        style: {
          display: "flex",
          position: "relative",
          fontFamily: "gmarket",
          fontSize: String(titleSize) + ea,
          fontWeight: String(700),
          color: colorExtended.black,
        }
      });
      createNode({
        mother: serviceBase,
        text: textContent[index].description[0],
        style: {
          display: "flex",
          position: "relative",
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(400),
          color: colorExtended.black,
          marginTop: String(descriptionMarginTop) + ea,
          marginBottom: String(0) + ea,
        },
        bold: {
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(800),
          color: colorExtended.black,
        }
      });
      createNode({
        mother: serviceBase,
        text: textContent[index].description[1],
        style: {
          display: "flex",
          position: "relative",
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(400),
          color: colorExtended.black,
        },
        bold: {
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(800),
          color: colorExtended.black,
        }
      });
      createNode({
        mother: serviceBase,
        style: {
          display: "flex",
          width: String(checkCircleWidth) + ea,
          height: String(checkCircleWidth) + ea,
          background: textContent[index].focus ? colorExtended.focusBlue : colorExtended.white,
          borderRadius: String(checkCircleWidth) + ea,
          marginTop: String(16) + ea,
        },
        child: {
          mode: "svg",
          source: svgMaker.checkCircle(colorExtended.white),
          style: {
            display: "flex",
            position: "relative",
            width: String(checkCircleWidth) + ea,
          },
        }
      });
    }

    for (let i = 0; i < textContent.length; i++) {
      createServiceBlock(i);
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerExplanationJs.prototype.insertThirdBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToLink, stringToDate, designerCareer, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const designerSelectionButtonClassNameButton = "designerSelectionButtonClassNameButton";
  const designerSelectionButtonClassNameString = "designerSelectionButtonClassNameString";
  const designerSelectionButtonClassNameButtonPlus = "designerSelectionButtonClassNameButtonPlus";
  try {
    let minusLeft;
    let thirdBase;
    let colorTop;
    let basePaddingTop;
    let basePaddingBottom;
    let abc, designers;
    let thisBase;
    let designer;
    let checkCircleWidth;
    let thisCardBase;
    let cardWidth, cardHeight, cardBetween;
    let buttonCardWidth;
    let shadowForm;
    let cardLength;
    let keywords;
    let representative;
    let buttonArrowWdith;
    let designerProfileBase;
    let profileHeight;
    let designerCardGroupBetween;
    let designerCardGroupBetweenFirst;
    let nameTitleSize;
    let selectionBase;
    let endBoo;
    let designerSelectionEvent;

    minusLeft = window.innerWidth - standardWidth + 1;

    colorTop = <%% 200, 200, 200, 200, 200 %%>;
    basePaddingTop = <%% 150, 150, 160, 140, 21 %%>;
    basePaddingBottom = <%% 160, 160, 160, 160, 24 %%>;

    checkCircleWidth = 13;

    cardLength = 5;

    cardHeight = 445;
    profileHeight = 250;
    cardBetween = 8;
    buttonCardWidth = 50;
    cardWidth = "calc(" + withOut((cardBetween * cardLength) + buttonCardWidth, ea) + " / " + String(cardLength) + ")";

    buttonArrowWdith = 14;

    designerCardGroupBetween = 70;
    designerCardGroupBetweenFirst = 50;

    nameTitleSize = 25;

    shadowForm = "0px 8px 20px -9px " + colorExtended.darkDarkShadow;

    abc = this.abc;
    designers = this.designers;

    designerSelectionEvent = (designer, end, index, mode = "button") => {
      return function (e) {
        const buttonFriends = [ ...document.querySelectorAll('.' + designerSelectionButtonClassNameButton) ];
        const stringFriends = [ ...document.querySelectorAll('.' + designerSelectionButtonClassNameString) ];
        let self, sibling, toggle;
        let matrix;

        matrix = [];
        for (let i = 0; i < buttonFriends.length; i++) {
          matrix.push([
            document.querySelector('.' + designerSelectionButtonClassNameButton + "_" + String(i)),
            document.querySelector('.' + designerSelectionButtonClassNameString + "_" + String(i)),
            document.querySelector('.' + designerSelectionButtonClassNameButtonPlus + "_" + String(i)),
          ]);
        }

        if (mode === "button") {

          sibling = document.querySelector('.' + designerSelectionButtonClassNameString + "_" + String(index));
          self = this;
          toggle = self.getAttribute("toggle");

          if (toggle === "off") {
            if (end) {
              window.alert("해당 디자이너는 마감되었습니다!");
            } else {
              for (let [ first, second, third ] of matrix) {
                if (first === self) {
                  self.children[self.children.length - 1].style.opacity = String(0);
                  sibling.style.color = colorExtended.white;
                  sibling.style.opacity = String(1);
                  third.children[0].children[1].style.opacity = String(0);
                  third.children[1].style.opacity = String(1);
                  
                  self.setAttribute("toggle", "on");
                  sibling.setAttribute("toggle", "on");
                  third.setAttribute("toggle", "on");
                } else {
                  first.children[first.children.length - 1].style.opacity = String(1);
                  second.style.color = colorExtended.blueLight;
                  second.style.opacity = String(0.8);
                  third.children[0].children[1].style.opacity = String(1);
                  third.children[1].style.opacity = String(0.4);

                  first.setAttribute("toggle", "off");
                  second.setAttribute("toggle", "off");
                  third.setAttribute("toggle", "off");
                }
              }
            }
          } else {
            for (let [ first, second, third ] of matrix) {
              if (first === self) {
                first.children[first.children.length - 1].style.opacity = String(1);
                second.style.color = colorExtended.blueLight;
                second.style.opacity = String(0.8);
                third.children[0].children[1].style.opacity = String(1);
                third.children[1].style.opacity = String(0.4);
      
                first.setAttribute("toggle", "off");
                second.setAttribute("toggle", "off");
                third.setAttribute("toggle", "off");
              }
            }
          }

        } else {

          sibling = document.querySelector('.' + designerSelectionButtonClassNameButton + "_" + String(index));
          self = this;
          toggle = self.getAttribute("toggle");

          if (toggle === "off") {
            if (end) {
              window.alert("해당 디자이너는 마감되었습니다!");
            } else {
              for (let [ first, second, third ] of matrix) {
                if (second === self) {
                  sibling.children[sibling.children.length - 1].style.opacity = String(0);
                  self.style.color = colorExtended.white;
                  self.style.opacity = String(1);
                  third.children[0].children[1].style.opacity = String(0);
                  third.children[1].style.opacity = String(1);
                  self.setAttribute("toggle", "on");
                  sibling.setAttribute("toggle", "on");
                  third.setAttribute("toggle", "on");
                } else {
                  first.children[first.children.length - 1].style.opacity = String(1);
                  second.style.color = colorExtended.blueLight;
                  second.style.opacity = String(0.8);
                  third.children[0].children[1].style.opacity = String(1);
                  third.children[1].style.opacity = String(0.4);
                  first.setAttribute("toggle", "off");
                  second.setAttribute("toggle", "off");
                  third.setAttribute("toggle", "off");
                }
              }
            }
          } else {
            for (let [ first, second, third ] of matrix) {
              if (second === self) {
                first.children[first.children.length - 1].style.opacity = String(1);
                second.style.color = colorExtended.blueLight;
                second.style.opacity = String(0.8);
                third.children[0].children[1].style.opacity = String(1);
                third.children[1].style.opacity = String(0.4);
      
                first.setAttribute("toggle", "off");
                second.setAttribute("toggle", "off");
                third.setAttribute("toggle", "off");
              }
            }
          }

        }

      }
    }

    thirdBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        flexDirection: "column",
        paddingTop: String(basePaddingTop) + ea,
        paddingBottom: String(basePaddingBottom) + ea,
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column",
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.blueBlack,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * ((-1 * colorTop) + naviHeight), ea),
        }
      }
    });
    createNode({
      mother: thirdBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        width: withOut(0, ea),
        flexDirection: "column",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            left: String(0),
            width: withOut(0, ea),
            borderBottom: "1px dashed " + colorExtended.white,
            opacity: String(0.5),
            top: String(17) + ea,
          }
        },
        {
          text: "designers",
          style: {
            display: "inline-flex",
            position: "relative",
            fontSize: String(29) + ea,
            fontWeight: String(700),
            color: colorExtended.white,
            fontFamily: "mont",
            background: colorExtended.blueBlack,
            paddingLeft: String(16) + ea,
            paddingRight: String(16) + ea,
          }
        },
      ]
    });

    for (let i = 0; i < designers.length; i++) {

      designer = designers[i];
      keywords = designer.keywords;
      representative = designer.representative;
      endBoo = designer.end;

      thisBase = createNode({
        mother: thirdBase,
        style: {
          display: "flex",
          position: "relative",
          justifyContent: "start",
          alignItems: "start",
          width: withOut(0, ea),
          flexDirection: "column",
          paddingBottom: String(6) + ea,
        }
      });

      createNode({
        mother: thisBase,
        event: {
          selectstart: (e) => { e.preventDefault() },
        },
        style: {
          display: "flex",
          position: "relative",
          justifyContent: "start",
          alignItems: "center",
          width: withOut(0, ea),
          flexDirection: "row",
          marginTop: String(i === 0 ? designerCardGroupBetweenFirst : designerCardGroupBetween) + ea,
          marginBottom: String(10) + ea,
        },
        children: [
          {
            class: [ designerSelectionButtonClassNameButton + "_" + String(i), designerSelectionButtonClassNameButton ],
            event: {
              click: designerSelectionEvent(designer, endBoo, i, "button"),
              selectstart: (e) => { e.preventDefault() },
            },
            attribute: {
              toggle: "off",
              desid: designer.desid,
            },
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(checkCircleWidth) + ea,
              height: String(checkCircleWidth) + ea,
              background: colorExtended.focusBlue,
              borderRadius: String(checkCircleWidth) + ea,
              opacity: endBoo ? String(0.4) : String(1),
              cursor: "pointer",
            },
            child: {
              mode: "svg",
              source: svgMaker.checkCircle(colorExtended.white),
              style: {
                display: "flex",
                position: "relative",
                width: String(checkCircleWidth) + ea,
              },
              next: {
                display: "inline-flex",
                position: "absolute",
                top: String(0),
                left: String(0),
                width: String(checkCircleWidth) + ea,
                height: String(checkCircleWidth) + ea,
                background: colorExtended.white,
                borderRadius: String(checkCircleWidth) + ea,
              }
            }
          },
          {
            class: [ designerSelectionButtonClassNameString + "_" + String(i), designerSelectionButtonClassNameString ],
            event: {
              click: designerSelectionEvent(designer, endBoo, i, "string"),
              selectstart: (e) => { e.preventDefault() },
            },
            attribute: {
              toggle: "off",
              desid: designer.desid,
            },
            text: "designers " + abc[i],
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(19) + ea,
              fontWeight: String(700),
              color: colorExtended.blueLight,
              fontFamily: "mont",
              marginLeft: String(7) + ea,
              opacity: endBoo ? String(0.4) : String(0.8),
              cursor: "pointer",
            }
          },
          {
            text: "해당 디자이너는 마감되었습니다.",
            event: {
              selectstart: (e) => { e.preventDefault() },
            },
            style: {
              display: endBoo ? "inline-flex" : "none",
              position: "relative",
              fontSize: String(18) + ea,
              fontWeight: String(800),
              color: colorExtended.white,
              marginLeft: String(9) + ea,
              top: String(-2) + ea,
            }
          },
        ]
      });

      thisCardBase = createNode({
        mother: thisBase,
        style: {
          display: "flex",
          position: "relative",
          justifyContent: "start",
          alignItems: "center",
          width: withOut(0, ea),
          flexDirection: "row",
          opacity: endBoo ? String(0.4) : String(1),
        }
      });

      // click me
      if (i === 0) {
        createNode({
          mother: thisCardBase,
          mode: "img",
          attribute: {
            src: DesignerExplanationJs.binaryPath + "/clickMe.svg",
          },
          style: {
            display: endBoo ? "none" : "inline-block",
            position: "absolute",
            top: String(-92) + ea,
            left: String(200) + ea,
            width: String(124) + ea,
            height: "auto",
          }
        })
      }

      // designer profile
      designerProfileBase = createNode({
        mother: thisCardBase,
        event: {
          click: instance.insertWhiteCardEvent(designer.desid, abc[i]),
        },
        attribute: {
          desid: designer.desid,
        },
        style: {
          display: "inline-flex",
          position: "relative",
          width: cardWidth,
          height: String(cardHeight) + ea,
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          marginRight: String(cardBetween) + ea,
          boxShadow: shadowForm,
          flexDirection: "column",
          overflow: "hidden",
          cursor: "pointer",
        },
        children: [
          {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              height: String(profileHeight) + ea,
              backgroundImage: "url('" + designer.profile.link + "')",
              backgroundSize: designer.profile.gs === 's' ? "100% auto" : "100% 100%",
              backgroundPosition: designer.profile.position,
              filter: "grayscale(100%)",
            }
          },
          {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(250, ea),
              background: colorExtended.white,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }
          },
          {
            style: {
              position: "absolute",
              top: String(6) + ea,
              left: String(6) + ea,
              width: withOut(6 * 2, ea),
              height: withOut(6 * 2, ea),
              borderRadius: String(5) + "px",
              border: "1px solid " + colorExtended.blue,
              "mix-blend-mode": "multiply",
              "box-sizing": "border-box",
            }
          }
        ]
      }).children[1];
      createNode({
        mother: designerProfileBase,
        text: designer.designer.split("").join(" "),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(nameTitleSize) + ea,
          fontWeight: String(800),
          color: colorExtended.black,
          wordSpacing: String(1) + "px",
          borderBottom: "1px solid " + colorExtended.blue,
          paddingBottom: String(1) + ea,
          marginBottom: String(15) + ea,
        }
      });
      createNode({
        mother: designerProfileBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(40) + ea,
          height: String(18) + ea,
          borderRadius: String(18) + ea,
          background: colorExtended.blueDark,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: String(0) + ea,
        },
        child: {
          text: "경력",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(-1) + ea,
            fontSize: String(11) + ea,
            fontWeight: String(700),
            color: colorExtended.white,
          }
        }
      });
      createNode({
        mother: designerProfileBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(23) + ea,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: String(4) + ea,
        },
        child: {
          text: designerCareer(designer, true, true),
          style: {
            display: "inline-block",
            position: "relative",
            top: String(-1) + ea,
            fontSize: String(12) + ea,
            fontWeight: String(400),
            color: colorExtended.black,
          }
        }
      });
      createNode({
        mother: designerProfileBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(92) + ea,
          height: String(18) + ea,
          borderRadius: String(18) + ea,
          background: colorExtended.blueDark,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: String(0) + ea,
        },
        child: {
          text: "자신 있는 스타일",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(-1) + ea,
            fontSize: String(11) + ea,
            fontWeight: String(700),
            color: colorExtended.white,
          }
        }
      });
      createNode({
        mother: designerProfileBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(23) + ea,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: String(11) + ea,
        },
        child: {
          text: designer.styleTendency.map((o) => { return o.name }).slice(0, 3).join("&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;"),
          style: {
            display: "inline-block",
            position: "relative",
            top: String(-1) + ea,
            fontSize: String(12) + ea,
            fontWeight: String(400),
            color: colorExtended.black,
          },
          under: {
            fontSize: String(12) + ea,
            fontWeight: String(400),
            color: colorExtended.blue,
          }
        }
      });
      // detail arrow in profile card
      createNode({
        mother: designerProfileBase,
        mode: "svg",
        source: svgMaker.horizontalArrow(24, 9, colorExtended.focusBlue),
        style: {
          display: "inline-block",
          position: "absolute",
          width: String(24) + ea,
          bottom: String(21) + ea,
          right: String(20) + ea,
        }
      });

      // ----------------------------------------------------------------------------------------------------------------

      // photo 0
      createNode({
        mother: thisCardBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: cardWidth,
          height: String(cardHeight) + ea,
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          marginRight: String(cardBetween) + ea,
          boxShadow: shadowForm,
          backgroundImage: typeof representative[0] === "string" ?  "url('" + "https://" + FILEHOST + stringToLink(representative[0]) + "')" : "",
          backgroundSize: "auto 100%",
          backgroundPosition: "50% 50%",
        }
      });

      // ----------------------------------------------------------------------------------------------------------------

      // photo 1
      createNode({
        mother: thisCardBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: cardWidth,
          height: String(cardHeight) + ea,
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          marginRight: String(cardBetween) + ea,
          boxShadow: shadowForm,
          backgroundImage: typeof representative[1] === "string" ?  "url('" + "https://" + FILEHOST + stringToLink(representative[1]) + "')" : "",
          backgroundSize: "auto 100%",
          backgroundPosition: "50% 50%",
        }
      });

      // ----------------------------------------------------------------------------------------------------------------

      // photo 2
      createNode({
        mother: thisCardBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: cardWidth,
          height: String(cardHeight) + ea,
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          marginRight: String(cardBetween) + ea,
          boxShadow: shadowForm,
          backgroundImage: typeof representative[2] === "string" ?  "url('" + "https://" + FILEHOST + stringToLink(representative[2]) + "')" : "",
          backgroundSize: "auto 100%",
          backgroundPosition: "50% 50%",
        }
      });

      // ----------------------------------------------------------------------------------------------------------------

      // photo 3
      createNode({
        mother: thisCardBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: cardWidth,
          height: String(cardHeight) + ea,
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          marginRight: String(cardBetween) + ea,
          boxShadow: shadowForm,
          backgroundImage: typeof representative[3] === "string" ?  "url('" + "https://" + FILEHOST + stringToLink(representative[3]) + "')" : "",
          backgroundSize: "auto 100%",
          backgroundPosition: "50% 50%",
        }
      });

      // ----------------------------------------------------------------------------------------------------------------

      // button arrow
      createNode({
        mother: thisCardBase,
        event: {
          click: instance.insertWhiteCardEvent(designer.desid, abc[i]),
        },
        attribute: {
          desid: designer.desid,
        },
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(buttonCardWidth) + ea,
          height: String(cardHeight) + ea,
          borderRadius: String(8) + "px",
          background: colorExtended.blueDarkButton,
          boxShadow: shadowForm,
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        },
        child: {
          mode: "svg",
          source: svgMaker.buttonLineArrow(colorExtended.white),
          style: {
            display: "inline-block",
            position: "relative",
            width: String(buttonArrowWdith) + ea,
            opacity: String(0.85),
          }
        }
      });

    }

  } catch (e) {
    console.log(e);
  }
}

DesignerExplanationJs.prototype.insertThirdPlusBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, autoComma, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToLink, designerCareer, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, blankPhoto } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const cardMoveTargetClassName = "cardMoveTargetClassName";
  const arrowLeftClassName = "arrowLeftClassName";
  const arrowRightClassName = "arrowRightClassName";
  const designerSelectionButtonClassNameButton = "designerSelectionButtonClassNameButton";
  const designerSelectionButtonClassNameString = "designerSelectionButtonClassNameString";
  const designerSelectionButtonClassNameButtonPlus = "designerSelectionButtonClassNameButtonPlus";
  const today = new Date();
  try {
    let minusLeft;
    let thirdBase;
    let colorTop;
    let basePaddingTop;
    let basePaddingBottom;
    let abc, designers;
    let thisBase;
    let designer;
    let checkCircleWidth;
    let thisCardBase;
    let cardWidth, cardHeight, cardBetween;
    let buttonCardWidth;
    let shadowForm;
    let cardLength;
    let keywords;
    let representative;
    let buttonArrowWdith;
    let designerProfileBase;
    let profileHeight;
    let designerCardGroupBetween;
    let designerCardGroupBetweenFirst;
    let nameTitleSize;
    let selectionBase;
    let columnBetween;
    let factorTextTop;
    let factorPadding;
    let factorHeight;
    let factorSize;
    let factorTitleWeight;
    let factorValueWeight;
    let factorMaker;
    let barMaker;
    let barPadding;
    let selectionMaker;
    let selectionBarWeight, selectionBarMargin;
    let valueLinePadding;
    let selectionBarLongMargin;
    let factorLongHeight;
    let whiteBoxBetween;
    let outerMargin;
    let outerMargin2;
    let moneyMaker;
    let subFactorSize;
    let subFactorTextTop;
    let visualWhitePadding;
    let dotWidth;
    let dotMargin;
    let subTitleMargin, vatMargin;
    let percentMaker;
    let finalMoneyBlocks;
    let moneyWhiteBoxBetween;
    let moneyBlockHeight;
    let finalBlockVatMargin;
    let finalArrowCicleWidth;
    let finalArrowWidth, finalArrowHeight;
    let finalMoneySize, finalMoneyWeight, finalMoneyBoldWeight;
    let thisBaseMother;
    let widthRatio;
    let loopNumber, safeLoopNumber;
    let arrowCircleWidth;
    let arrowMargin;
    let viewNumber;
    let renderDesigneresCard;
    let project;
    let proposal;
    let analytics;
    let information;
    let startY;
    let startM;
    let constructLevel;
    let constructCase;
    let styleTendency;
    let method;
    let builtin;
    let design;
    let fabricLevel;
    let curtain;
    let bedding;
    let install;
    let storage;
    let first;
    let matrix;
    let cadBoo;
    let collageBoo;
    let modelingBoo;
    let careerSubtract;
    let year;
    let month;
    let offlineFeeTarget;
    let onlineFeeTarget;
    let moneyArr;
    let endBoo;
    let designerSelectionEventPlus;

    minusLeft = window.innerWidth - standardWidth + 1;

    colorTop = <%% 200, 200, 200, 200, 200 %%>;
    basePaddingTop = <%% 150, 150, 160, 140, 21 %%>;
    basePaddingBottom = <%% 160, 160, 160, 160, 24 %%>;

    checkCircleWidth = 15;

    cardLength = 5;

    cardHeight = 445;
    profileHeight = 250;
    cardBetween = 8;
    buttonCardWidth = 50;
    cardWidth = 262;

    columnBetween = 20;

    buttonArrowWdith = 14;

    designerCardGroupBetween = 70;
    designerCardGroupBetweenFirst = 50;

    nameTitleSize = 25;

    factorTextTop = isMac() ? -1 : 1;
    subFactorTextTop = isMac() ? 1 : 3;
    factorPadding = 20;
    factorHeight = 48;
    factorSize = 17;
    subFactorSize = 11;
    factorTitleWeight = 500;
    factorValueWeight = 400;
    factorLongHeight = 78;

    barPadding = 18;

    selectionBarWeight = 300;
    selectionBarMargin = 8;
    selectionBarLongMargin = 17;

    valueLinePadding = 1;

    whiteBoxBetween = 12;
    moneyWhiteBoxBetween = 6;

    outerMargin = 12;
    outerMargin2 = 14;

    shadowForm = "0px 8px 20px -9px " + colorExtended.darkDarkShadow;

    visualWhitePadding = 3;

    dotWidth = 5;
    dotMargin = 5;

    subTitleMargin = 4;
    vatMargin = 6;

    moneyBlockHeight = 46;
    finalBlockVatMargin = 10;

    finalArrowCicleWidth = 30;
    finalArrowWidth = 11;
    finalArrowHeight = 16;

    finalMoneySize = 21;
    finalMoneyWeight = 300;
    finalMoneyBoldWeight = 700;

    safeLoopNumber = 1;
    loopNumber = 4;

    arrowCircleWidth = 44;

    arrowMargin = 70;

    viewNumber = 3;

    widthRatio = standardWidth / ((cardWidth * 2 * viewNumber) + (columnBetween * (viewNumber - 1)));

    abc = this.abc;
    designers = this.designers;

    factorMaker = (title, value) => {
      return {
        style: {
          display: "flex",
          position: "relative",
          width: withOut(factorPadding * 2, ea),
          height: String(factorHeight) + ea,
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
        },
        children: [
          {
            text: title,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(factorSize) + ea,
              fontWeight: String(factorTitleWeight),
              color: colorExtended.mainBlue,
              top: String(factorTextTop) + ea,
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              height: withOut(0, ea),
              top: String(0),
              right: String(0),
              justifyContent: "end",
              alignItems: "center",
            },
            child: {
              text: value,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorValueWeight),
                color: colorExtended.black,
                top: String(factorTextTop) + ea,
              }
            },
          }
        ]
      }
    }
    selectionMaker = (title, menu, values) => {
      return {
        style: {
          display: "flex",
          position: "relative",
          width: withOut(factorPadding * 2, ea),
          height: menu.length <= 3 ? String(factorHeight) + ea : String(factorLongHeight) + ea,
          flexDirection: menu.length <= 3 ? "row" : "column",
          justifyContent: menu.length <= 3 ? "start" : "center",
          alignItems: menu.length <= 3 ? "center" : "start",
        },
        children: [
          {
            text: title,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(factorSize) + ea,
              fontWeight: String(factorTitleWeight),
              color: colorExtended.mainBlue,
              top: String(factorTextTop) + ea,
            }
          },
          {
            style: {
              display: menu.length <= 3 ? "inline-flex" : "flex",
              position: menu.length <= 3 ? "absolute" : "relative",
              height: menu.length <= 3 ? withOut(0, ea) : "", 
              width: menu.length <= 3 ? "" : withOut(0, ea),
              top: String(0),
              right: String(0),
              justifyContent: menu.length <= 3 ? "end" : "start",
              alignItems: menu.length <= 3 ? "center" : "start",
              flexDirection: "row",
              marginTop: menu.length <= 3 ? "" : String(5) + ea,
            },
            children: menu.map((str, index, arr) => {
              return [
                {
                  text: str,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(factorSize) + ea,
                    fontWeight: String(factorValueWeight),
                    color: values[index] === 1 ? colorExtended.black : colorExtended.deactive,
                    top: String(factorTextTop) + ea,
                    paddingTop: String(valueLinePadding) + ea,
                    paddingBottom: String(valueLinePadding) + ea,
                    boxSizing: "border-box",
                    borderBottom: values[index] === 1 ? "1px solid " + colorExtended.mainBlue : "",
                    wordSpacing: String(-2) + ea,
                  }
                },
                {
                  text: "|",
                  style: {
                    display: (arr.length - 1 === index) ? "none" : "inline-block",
                    position: "relative",
                    fontSize: String(factorSize) + ea,
                    fontWeight: String(selectionBarWeight),
                    color: colorExtended.mainBlue,
                    top: String(factorTextTop) + ea,
                    marginLeft: String(menu.length <= 3 ? selectionBarMargin : selectionBarLongMargin) + ea,
                    marginRight: String(menu.length <= 3 ? selectionBarMargin : selectionBarLongMargin) + ea,
                    wordSpacing: String(-2) + ea,
                  }
                }
              ]
            }).flat(),
          }
        ]
      }
    }
    moneyMaker = (title, subTitle, value, blur = false) => {
      return {
        style: {
          display: "flex",
          position: "relative",
          width: withOut(factorPadding * 2, ea),
          height: String(factorHeight) + ea,
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          opacity: blur ? String(0.3) : String(1),
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(dotWidth) + ea,
              height: String(dotWidth) + ea,
              borderRadius: String(dotWidth) + ea,
              background: colorExtended.mainBlue,
              marginRight: String(dotMargin) + ea,
            }
          },
          {
            text: title,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(factorSize) + ea,
              fontWeight: String(factorTitleWeight),
              color: colorExtended.black,
              top: String(factorTextTop) + ea,
            }
          },
          {
            text: subTitle,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(subFactorSize) + ea,
              fontWeight: String(factorTitleWeight),
              color: colorExtended.black,
              marginLeft: String(subTitleMargin) + ea,
              top: String(subFactorTextTop) + ea,
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              height: withOut(0, ea),
              top: String(0),
              right: String(0),
              justifyContent: "end",
              alignItems: "center",
            },
            children: [
              {
                text: "* vat 별도",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(subFactorSize) + ea,
                  fontWeight: String(factorTitleWeight),
                  color: colorExtended.black,
                  marginRight: String(vatMargin) + ea,
                  top: String(subFactorTextTop) + ea,
                }
              },
              {
                text: value,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(factorSize) + ea,
                  fontWeight: String(factorValueWeight),
                  color: colorExtended.blueDark,
                  wordSpacing: String(-2) + ea,
                  top: String(factorTextTop) + ea,
                }
              },
            ]
          }
        ]
      }
    }
    barMaker = () => {
      return {
        style: {
          display: "flex",
          position: "relative",
          width: withOut(barPadding * 2, ea),
          height: String(0) + ea,
          borderBottom: "1px dashed " + colorExtended.blueLight,
        },
      }
    }
    percentMaker = (title, subTitle, percent, value, blur = false) => {
      return {
        style: {
          display: "flex",
          position: "relative",
          width: withOut(factorPadding * 2, ea),
          height: String(factorHeight) + ea,
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          opacity: blur ? String(0.3) : String(1),
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(dotWidth) + ea,
              height: String(dotWidth) + ea,
              borderRadius: String(dotWidth) + ea,
              background: colorExtended.mainBlue,
              marginRight: String(dotMargin) + ea,
            }
          },
          {
            text: title,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(factorSize) + ea,
              fontWeight: String(factorTitleWeight),
              color: colorExtended.black,
              top: String(factorTextTop) + ea,
            }
          },
          {
            text: subTitle,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(subFactorSize) + ea,
              fontWeight: String(factorTitleWeight),
              color: colorExtended.black,
              marginLeft: String(subTitleMargin) + ea,
              top: String(subFactorTextTop) + ea,
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "absolute",
              height: withOut(0, ea),
              top: String(0),
              right: String(0),
              justifyContent: "end",
              alignItems: "center",
            },
            children: [
              {
                text: `${String(percent)}% (${value})`,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(factorSize) + ea,
                  fontWeight: String(factorValueWeight),
                  color: colorExtended.blueDark,
                  top: String(factorTextTop) + ea,
                }
              },
            ]
          }
        ]
      }
    }
    finalMoneyBlocks = (matrix) => {
      let resultArr, num;

      num = 0;
      resultArr = [];
      for (let [ kind, before, after ] of matrix) {
        resultArr.push({
          style: {
            display: "flex",
            position: "relative",
            height: String(moneyBlockHeight) + ea,
            borderRadius: String(8) + ea,
            background: colorExtended.white,
            width: withOut(outerMargin * 2, ea),
            justifyContent: "start",
            alignItems: "center",
            flexDirection: "row",
            marginTop: num !== 0 ? String(moneyWhiteBoxBetween) + ea : "",
          },
          children: [
            {
              style: {
                display: "flex",
                position: "relative",    
                width: String(96) + ea,
                height: withOut(0, ea),
                borderRadius: String(8) + ea,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                background: colorExtended.blueDim,
                boxShadow: "3px 0px 15px -9px " + colorExtended.darkDarkShadow,
              },
              child: {
                text: kind,
                style: {
                  display: "inline-block",
                  position: "relative",    
                  fontSize: String(16) + ea,
                  fontWeight: String(800),
                  color: colorExtended.white,
                  top: String(-1) + ea,
                  opacity: Number(after.replace(/[^0-9]/gi, '')) === 0 ? String(0.3) : String(1),
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                height: withOut(0, ea),
                top: String(0),
                right: String(factorPadding) + ea,
                justifyContent: "end",
                alignItems: "center",
              },
              children: [
                {
                  text: "* vat 별도",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(subFactorSize) + ea,
                    fontWeight: String(factorTitleWeight),
                    color: colorExtended.black,
                    marginRight: String(finalBlockVatMargin) + ea,
                    top: String(subFactorTextTop) + ea,
                    opacity: Number(after.replace(/[^0-9]/gi, '')) === 0 ? String(0.3) : String(1),
                  }
                },
                {
                  text: before,
                  style: {
                    display: after === before ? "none" : "inline-block",
                    position: "relative",
                    fontSize: String(finalMoneySize) + ea,
                    fontWeight: String(finalMoneyWeight),
                    color: colorExtended.deactive,
                    top: String(factorTextTop) + ea,
                    marginRight: String(finalBlockVatMargin) + ea,
                    textDecoration: "line-through",
                    opacity: Number(after.replace(/[^0-9]/gi, '')) === 0 ? String(0.3) : String(1),
                  }
                },
                {
                  text: after,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(finalMoneySize) + ea,
                    fontWeight: String(finalMoneyBoldWeight),
                    color: colorExtended.blueDim,
                    top: String(factorTextTop) + ea,
                    opacity: Number(after.replace(/[^0-9]/gi, '')) === 0 ? String(0.3) : String(1),
                  }
                },
              ]
            }
          ]
        });
        num++;
      }
      return resultArr;
    }
    designerSelectionEventPlus = (designer, end, index) => {
      return function (e) {
        const self = this;
        const buttonFriends = [ ...document.querySelectorAll('.' + designerSelectionButtonClassNameButton) ];
        let matrix, toggle;

        matrix = [];
        for (let i = 0; i < buttonFriends.length; i++) {
          matrix.push([
            document.querySelector('.' + designerSelectionButtonClassNameButton + "_" + String(i)),
            document.querySelector('.' + designerSelectionButtonClassNameString + "_" + String(i)),
            document.querySelector('.' + designerSelectionButtonClassNameButtonPlus + "_" + String(i)),
          ]);
        }

        toggle = self.getAttribute("toggle");
        if (toggle === "off") {
          if (end) {
            window.alert("해당 디자이너는 마감되었습니다!");
          } else {
            for (let [ first, second, third ] of matrix) {
              if (third === self) {
                first.children[first.children.length - 1].style.opacity = String(0);
                second.style.color = colorExtended.white;
                second.style.opacity = String(1);
                third.children[0].children[1].style.opacity = String(0);
                third.children[1].style.opacity = String(1);
                
                first.setAttribute("toggle", "on");
                second.setAttribute("toggle", "on");
                third.setAttribute("toggle", "on");
              } else {
                first.children[first.children.length - 1].style.opacity = String(1);
                second.style.color = colorExtended.blueLight;
                second.style.opacity = String(0.8);
                third.children[0].children[1].style.opacity = String(1);
                third.children[1].style.opacity = String(0.4);
  
                first.setAttribute("toggle", "off");
                second.setAttribute("toggle", "off");
                third.setAttribute("toggle", "off");
              }
            }
          }
        } else {
          for (let [ first, second, third ] of matrix) {
            if (third === self) {
              first.children[first.children.length - 1].style.opacity = String(1);
              second.style.color = colorExtended.blueLight;
              second.style.opacity = String(0.8);
              third.children[0].children[1].style.opacity = String(1);
              third.children[1].style.opacity = String(0.4);
    
              first.setAttribute("toggle", "off");
              second.setAttribute("toggle", "off");
              third.setAttribute("toggle", "off");
            }
          }
        }

      }
    }

    thirdBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        flexDirection: "column",
        paddingTop: String(basePaddingTop) + ea,
        paddingBottom: String(basePaddingBottom) + ea,
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column",
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.gradientBlue4,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * ((-1 * colorTop) + naviHeight), ea),
        }
      }
    });

    thisBaseMother = createNode({
      mother: thirdBase,
      style: {
        display: "block",
        position: "relative",
        width: "calc(100% * " + String(1 / widthRatio) + ")",
        paddingBottom: String(6) + ea,
        transformOrigin: "0% 0%",
        transform: "scale(" + String(widthRatio) + ")",
        overflow: "visible",
      },
      children: [
        {
          class: [ arrowLeftClassName ],
          event: {
            click: function (e) {
              const moveTarget = document.querySelector('.' + cardMoveTargetClassName);
              const arrowLeft = document.querySelector('.' + arrowLeftClassName);
              const arrowRight = document.querySelector('.' + arrowRightClassName);
              const moveLength = Number(moveTarget.getAttribute("length"));
              const newMoveLength = moveLength - 1;
              if (arrowLeft.getAttribute("toggle") === "on") {
                moveTarget.style.transform = "translateX(" + String(-1 * ((cardWidth * 2) + columnBetween) * newMoveLength) + ea + ")";
                moveTarget.setAttribute("length", String(newMoveLength));
                if (newMoveLength <= 0) {
                  arrowLeft.style.opacity = String(0.5);
                  arrowLeft.setAttribute("toggle", "off");
                }
                if (newMoveLength < ((designers.length * safeLoopNumber) - viewNumber)) {
                  arrowRight.style.opacity = String(1);
                  arrowRight.setAttribute("toggle", "on");
                }
              }
            }
          },
          attribute: {
            toggle: "off"
          },
          style: {
            display: "inline-flex",
            position: "absolute",
            transition: "all 0.5s ease",
            top: "calc(50% - " + String(arrowCircleWidth / 2) + ea + ")",
            left: String(-1 * arrowMargin) + ea,
            width: String(arrowCircleWidth) + ea,
            height: String(arrowCircleWidth) + ea,
            borderRadius: String(arrowCircleWidth) + ea,
            background: colorExtended.blueDark,
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 3px 15px -9px " + colorExtended.blueBlack,
            cursor: "pointer",
            opacity: String(0.4),
          },
          child: {
            mode: "svg",
            source: svgMaker.buttonLineArrow(colorExtended.white),
            style: {
              display: "inline-block",
              position: "relative",
              width: String(11) + ea,
              transform: "rotate(180deg)",
              left: String(-1) + ea,
            }
          }
        },
        {
          class: [ arrowRightClassName ],
          event: {
            click: function (e) {
              const moveTarget = document.querySelector('.' + cardMoveTargetClassName);
              const arrowLeft = document.querySelector('.' + arrowLeftClassName);
              const arrowRight = document.querySelector('.' + arrowRightClassName);
              const moveLength = Number(moveTarget.getAttribute("length"));
              const newMoveLength = moveLength + 1;

              if (arrowRight.getAttribute("toggle") === "on") {
                moveTarget.style.transform = "translateX(" + String(-1 * ((cardWidth * 2) + columnBetween) * newMoveLength) + ea + ")";
                moveTarget.setAttribute("length", String(newMoveLength));
                if (newMoveLength > 0) {
                  arrowLeft.style.opacity = String(1);
                  arrowLeft.setAttribute("toggle", "on");
                }
                if (newMoveLength >= ((designers.length * safeLoopNumber) - viewNumber)) {
                  arrowRight.style.opacity = String(0.5);
                  arrowRight.setAttribute("toggle", "off");
                }
              }

            }
          },
          attribute: {
            toggle: viewNumber < designers.length ? "on" : "off",
          },
          style: {
            display: "inline-flex",
            position: "absolute",
            transition: "all 0.5s ease",
            top: "calc(50% - " + String(arrowCircleWidth / 2) + ea + ")",
            right: String(-1 * arrowMargin) + ea,
            width: String(arrowCircleWidth) + ea,
            height: String(arrowCircleWidth) + ea,
            borderRadius: String(arrowCircleWidth) + ea,
            background: colorExtended.blueDark,
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 3px 15px -9px " + colorExtended.blueBlack,
            cursor: "pointer",
            opacity: viewNumber < designers.length ? String(1) : String(0.5),
          },
          child: {
            mode: "svg",
            source: svgMaker.buttonLineArrow(colorExtended.white),
            style: {
              display: "inline-block",
              position: "relative",
              width: String(11) + ea,
              left: String(1) + ea,
            }
          }
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            overflow: "hidden",
          }
        }
      ]
    }).lastChild;

    thisBase = createNode({
      mother: thisBaseMother,
      class: [ cardMoveTargetClassName ],
      attribute: {
        length: String(0),
      },
      style: {
        display: "block",
        position: "relative",
        width: String(((cardWidth * 2) + cardBetween) * (designers.length) * 2) + ea,
        transformOrigin: "0% 0%",
        transform: "translateX(0px)",
      }
    });

    renderDesigneresCard = (blankInjection = false) => {
      for (let i = 0; i < designers.length; i++) {
  
        project = instance.project;
        designer = designers[i];
        keywords = designer.keywords;
        representative = designer.representative;
        proposal = project.proposal.detail.find((p) => { return p.desid === designer.desid });
        ({ analytics, information } = designer);
        ({ business: { career: { startY, startM } } } = information);
        ({ construct: { level: constructLevel, case: constructCase }, styling: { tendency: { style: styleTendency }, method, furniture: { builtin, design }, fabric: { level: fabricLevel, curtain, bedding } }, purchase: { setting: { install, storage } }, project: { time: { first }, matrix, cad: cadBoo, collage: collageBoo, modeling: modelingBoo } } = analytics);
        careerSubtract = ((today.getFullYear() * 12) + (today.getMonth() + 1)) - ((startY * 12) + startM);
        year = Math.floor(careerSubtract / 12);
        month = (careerSubtract % 12);
        offlineFeeTarget = proposal.fee.find((o) => { return o.method === "offline" });
        onlineFeeTarget = proposal.fee.find((o) => { return o.method !== "offline" });
        endBoo = designer.end;

        if (offlineFeeTarget === undefined) {
          offlineFeeTarget = null;
        } else {
          offlineFeeTarget.amount = Math.round(offlineFeeTarget.amount)
          if (offlineFeeTarget.discount === 0) {
            offlineFeeTarget.original = offlineFeeTarget.amount;
          } else {
            offlineFeeTarget.original = Math.round((offlineFeeTarget.amount / (1 - offlineFeeTarget.discount)));
          }
        }
        if (onlineFeeTarget === undefined) {
          onlineFeeTarget = null;
        } else {
          onlineFeeTarget.amount = Math.round(onlineFeeTarget.amount)
          if (onlineFeeTarget.discount === 0) {
            onlineFeeTarget.original = onlineFeeTarget.amount;
          } else {
            onlineFeeTarget.original = Math.round((onlineFeeTarget.amount / (1 - onlineFeeTarget.discount)));
          }
        }
  
        moneyArr = [];
        if (offlineFeeTarget === null) {
          moneyArr.push(moneyMaker("디자인비", "(오프라인)", autoComma(0) + "원", true));
          moneyArr.push(barMaker());
        } else {
          moneyArr.push(moneyMaker("디자인비", "(오프라인)", autoComma(offlineFeeTarget.amount) + "원", false));
          moneyArr.push(barMaker());
        }
        if (onlineFeeTarget === null) {
          moneyArr.push(moneyMaker("디자인비", "(온라인)", autoComma(0) + "원", true));
          moneyArr.push(barMaker());
        } else {
          moneyArr.push(moneyMaker("디자인비", "(온라인)", autoComma(onlineFeeTarget.amount) + "원", false));
          moneyArr.push(barMaker());
        }
        if (offlineFeeTarget === null) {
          moneyArr.push(moneyMaker("출장비", "", "(거리 : 0km / 시간 : 0시간 0분) " + autoComma(0) + "원", true));
          moneyArr.push(barMaker());
        } else {
          if (offlineFeeTarget.distance.amount === 0) {
            moneyArr.push(moneyMaker("출장비", "", "(거리 : 0km / 시간 : 0시간 0분) " + autoComma(0) + "원", true));
            moneyArr.push(barMaker());
          } else {
            moneyArr.push(moneyMaker("출장비", "", `(거리 : ${offlineFeeTarget.distance.distance} / 시간 : ${offlineFeeTarget.distance.time}) ${autoComma(offlineFeeTarget.distance.amount)}원`, false));
            moneyArr.push(barMaker());
          }
        }
        if (offlineFeeTarget !== null) {
          if (offlineFeeTarget.discount !== 0) {
            moneyArr.push(percentMaker("오프라인 디자인비 할인율", "(할인 금액)", offlineFeeTarget.discount * 100, autoComma(offlineFeeTarget.original - offlineFeeTarget.amount) + "원", false));
            moneyArr.push(barMaker());
          } else {
            moneyArr.push(percentMaker("오프라인 디자인비 할인율", "(할인 금액)", 0, autoComma(0) + "원", true));
            moneyArr.push(barMaker());
          }
        } else {
          moneyArr.push(percentMaker("오프라인 디자인비 할인율", "(할인 금액)", 0, autoComma(0) + "원", true));
          moneyArr.push(barMaker());
        }
        if (onlineFeeTarget !== null) {
          if (onlineFeeTarget.discount !== 0) {
            moneyArr.push(percentMaker("온라인 디자인비 할인율", "(할인 금액)", onlineFeeTarget.discount * 100, autoComma(onlineFeeTarget.original - onlineFeeTarget.amount) + "원", false));
            moneyArr.push(barMaker());
          } else {
            moneyArr.push(percentMaker("온라인 디자인비 할인율", "(할인 금액)", 0, autoComma(0) + "원", true));
            moneyArr.push(barMaker());
          }
        } else {
          moneyArr.push(percentMaker("온라인 디자인비 할인율", "(할인 금액)", 0, autoComma(0) + "원", true));
          moneyArr.push(barMaker());
        }
          
        moneyArr.pop();

        thisCardBase = createNode({
          mother: thisBase,
          style: {
            display: "inline-block",
            position: "relative",
            width: String(cardWidth * 2) + ea,
            marginRight: String(columnBetween) + ea,
            verticalAlign: "top",
            opacity: endBoo ? String(0.4) : String(1),
          }
        });
  
        // designer profile
        designerProfileBase = createNode({
          mother: thisCardBase,
          event: {
            click: instance.insertWhiteCardEvent(designer.desid, instance.abc[i]),
          },
          style: {
            display: "inline-flex",
            verticalAlign: "top",
            position: "relative",
            width: String(cardWidth) + ea,
            height: String(cardHeight) + ea,
            borderRadius: String(8) + "px",
            background: colorExtended.white,
            boxShadow: shadowForm,
            flexDirection: "column",
            overflow: "hidden",
            zIndex: String(2),
            cursor: "pointer",
          },
          children: [
            {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(0, ea),
                height: String(profileHeight) + ea,
                backgroundImage: "url('" + designer.profile.link + "')",
                backgroundSize: designer.profile.gs === 's' ? "100% auto" : "100% 100%",
                backgroundPosition: designer.profile.position,
                filter: "grayscale(100%)",
              }
            },
            {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(0, ea),
                height: withOut(250, ea),
                background: colorExtended.white,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }
            },
            {
              style: {
                position: "absolute",
                top: String(6) + ea,
                left: String(6) + ea,
                width: withOut(6 * 2, ea),
                height: withOut(6 * 2, ea),
                borderRadius: String(5) + "px",
                border: "1px solid " + colorExtended.blue,
                "mix-blend-mode": "multiply",
                "box-sizing": "border-box",
              }
            }
          ]
        }).children[1];
        createNode({
          mother: designerProfileBase,
          text: designer.designer.split("").join(" "),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(nameTitleSize) + ea,
            fontWeight: String(800),
            color: colorExtended.black,
            wordSpacing: String(1) + "px",
            borderBottom: "1px solid " + colorExtended.blue,
            paddingBottom: String(1) + ea,
            marginBottom: String(15) + ea,
          }
        });
        createNode({
          mother: designerProfileBase,
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(40) + ea,
            height: String(18) + ea,
            borderRadius: String(18) + ea,
            background: colorExtended.blueDark,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: String(0) + ea,
          },
          child: {
            text: "경력",
            style: {
              display: "inline-block",
              position: "relative",
              top: String(-1) + ea,
              fontSize: String(11) + ea,
              fontWeight: String(700),
              color: colorExtended.white,
            }
          }
        });
        createNode({
          mother: designerProfileBase,
          style: {
            display: "inline-flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(23) + ea,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: String(4) + ea,
          },
          child: {
            text: designerCareer(designer, true, true),
            style: {
              display: "inline-block",
              position: "relative",
              top: String(-1) + ea,
              fontSize: String(12) + ea,
              fontWeight: String(400),
              color: colorExtended.black,
            }
          }
        });
        createNode({
          mother: designerProfileBase,
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(92) + ea,
            height: String(18) + ea,
            borderRadius: String(18) + ea,
            background: colorExtended.blueDark,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: String(0) + ea,
          },
          child: {
            text: "자신 있는 스타일",
            style: {
              display: "inline-block",
              position: "relative",
              top: String(-1) + ea,
              fontSize: String(11) + ea,
              fontWeight: String(700),
              color: colorExtended.white,
            }
          }
        });
        createNode({
          mother: designerProfileBase,
          style: {
            display: "inline-flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(23) + ea,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: String(11) + ea,
          },
          child: {
            text: designer.styleTendency.map((o) => { return o.name }).slice(0, 3).join("&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;"),
            style: {
              display: "inline-block",
              position: "relative",
              top: String(-1) + ea,
              fontSize: String(12) + ea,
              fontWeight: String(400),
              color: colorExtended.black,
            },
            under: {
              fontSize: String(12) + ea,
              fontWeight: String(400),
              color: colorExtended.blue,
            }
          }
        });
        createNode({
          mother: designerProfileBase,
          mode: "svg",
          source: svgMaker.horizontalArrow(24, 9, colorExtended.focusBlue),
          style: {
            display: "inline-block",
            position: "absolute",
            width: String(24) + ea,
            bottom: String(21) + ea,
            right: String(20) + ea,
          }
        });

        createNode({
          mother: thisCardBase,
          event: {
            click: instance.insertWhiteCardEvent(designer.desid, instance.abc[i]),
          },
          style: {
            display: "inline-flex",
            verticalAlign: "top",
            position: "relative",
            width: String(cardWidth) + ea,
            height: String(cardHeight) + ea,
            borderRadius: String(8) + "px",
            background: colorExtended.white,
            boxShadow: shadowForm,
            backgroundImage: typeof representative[0] === "string" ?  "url('" + "https://" + FILEHOST + stringToLink(representative[0]) + "')" : "",
            backgroundSize: "auto 100%",
            backgroundPosition: "50% 50%",
            zIndex: String(1),
            cursor: "pointer",
          }
        });
  
        // info area
        createNode({
          mother: thisCardBase,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            background: colorExtended.blueBlack,
            borderRadius: String(8) + "px",
            borderTopLeftRadius: String(0) + "px",
            borderTopRightRadius: String(0) + "px",
            justifyContent: "center",
            alignItems: "center",
            top: String(-1 * 8) + "px",
            paddingTop: "calc(" + String(outerMargin2) + ea + " + " + String(8) + "px" + ")",
            paddingBottom: String(outerMargin2) + ea,
            flexDirection: "column",
            boxShadow: "0px 3px 12px -9px " + colorExtended.darkDarkShadow,
          },
          children: [
            {
              style: {
                display: "flex",
                position: "relative",
                borderRadius: String(8) + "px",
                background: colorExtended.white,
                width: withOut(outerMargin * 2, ea),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: String(visualWhitePadding) + ea,
                paddingBottom: String(visualWhitePadding) + ea,
              },
              children: [
                factorMaker("유관 경력", designerCareer(designer, true, true)),
                barMaker(),
                factorMaker("홈리에종 소속 기간", String(year) + "년 " + String(month) + "개월"),
                barMaker(),
                factorMaker("1차 제안 받는 시점", String(first) + "일 이내"),
                barMaker(),
                selectionMaker("제안 방식", [ "순차 제안", "한 번에 제안" ], [ (method === "순차 제안" ? 1 : 0), (method === "순차 제안" ? 0 : 1) ]),
                barMaker(),
                selectionMaker("CAD 도면", [ "가능", "불가능" ], [ cadBoo ? 1 : 0, cadBoo ? 0 : 1 ]),
                barMaker(),
                selectionMaker("3D", [ "가능", "불가능" ], [ modelingBoo > 0 ? 1 : 0, modelingBoo === 0 ? 1 : 0 ]),
                barMaker(),
                selectionMaker("콜라주", [ "가능", "불가능" ], [ collageBoo ? 1 : 0, collageBoo ? 0 : 1 ]),
                barMaker(),
                selectionMaker("빌트인 가구 제작", [ "가능", "불가능" ], [ builtin > 0 ? 1 : 0, builtin === 0 ? 1 : 0 ]),
                barMaker(),
                selectionMaker("디자인 가구 제작", [ "가능", "불가능" ], [ design > 0 ? 1 : 0, design === 0 ? 1 : 0 ]),
                barMaker(),
                selectionMaker("패브릭 제작", [ "가능", "불가능" ], [ fabricLevel > 0 ? 1 : 0, fabricLevel === 0 ? 1 : 0 ]),
                barMaker(),
                selectionMaker("디자이너 역량 범위", serviceParsing().name, [ (constructLevel < 0 ? 0 : 1), (constructLevel < 1 ? 0 : 1), (constructLevel < 2 ? 0 : 1), (constructLevel < 3 ? 0 : 1) ]),
              ]
            },
            {
              style: {
                display: "flex",
                position: "relative",
                borderRadius: String(8) + "px",
                background: colorExtended.white,
                width: withOut(outerMargin * 2, ea),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: String(whiteBoxBetween) + ea,
                paddingTop: String(visualWhitePadding) + ea,
                paddingBottom: String(visualWhitePadding) + ea,
              },
              children: moneyArr
            },
            {
              style: {
                display: "block",
                position: "relative",
                width: withOut(outerMargin * 2, ea),
                height: String(whiteBoxBetween) + ea,
                zIndex: String(1),
              },
              child: {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(finalArrowCicleWidth) + ea,
                  height: String(finalArrowCicleWidth) + ea,
                  borderRadius: String(finalArrowCicleWidth) + ea,
                  top: "calc(50% - " + String(finalArrowCicleWidth / 2) + ea + ")",
                  left: "calc(50% - " + String(finalArrowCicleWidth / 2) + ea + ")",
                  background: colorExtended.mainBlue,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  boxShadow: "0px 4px 18px -9px " + colorExtended.darkShadow,
                },
                child: {
                  mode: "svg",
                  source: svgMaker.verticalArrow(finalArrowWidth, finalArrowHeight, colorExtended.white),
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(finalArrowWidth) + ea,
                  }
                }
              }
            },
            ...finalMoneyBlocks([
              [ "오프라인", autoComma(offlineFeeTarget === null ? 0 : offlineFeeTarget.original) + "원", autoComma(offlineFeeTarget === null ? 0 : offlineFeeTarget.amount) + "원" ],
              [ "온라인", autoComma(onlineFeeTarget === null ? 0 : onlineFeeTarget.original) + "원", autoComma(onlineFeeTarget === null ? 0 : onlineFeeTarget.amount) + "원" ],
            ]),
          ]
        });
  
        // designer selection
        createNode({
          mother: thisCardBase,
          class: [ designerSelectionButtonClassNameButtonPlus, designerSelectionButtonClassNameButtonPlus + "_" + String(i) ],
          attribute: {
            toggle: "off",
            desid: designer.desid,
          },
          event: {
            click: designerSelectionEventPlus(designer, endBoo, i),
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            width: withOut(0, ea),
            flexDirection: "row",
            marginTop: String(18) + ea,
            marginBottom: String(4) + ea,
            cursor: "pointer",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(checkCircleWidth) + ea,
                height: String(checkCircleWidth + 1) + ea,
                background: colorExtended.focusBlue,
                borderRadius: String(checkCircleWidth + 1) + ea,
              },
              child: {
                mode: "svg",
                source: svgMaker.checkCircle(colorExtended.white),
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(checkCircleWidth) + ea,
                  height: String(checkCircleWidth + 1) + ea,
                },
                next: {
                  style: {
                    display: "inline-flex",
                    position: "absolute",
                    top: String(0),
                    left: String(0),
                    width: String(checkCircleWidth) + ea,
                    height: String(checkCircleWidth + 1) + ea,
                    background: colorExtended.white,
                    borderRadius: String(checkCircleWidth + 1) + ea,
                  },
                }
              }
            },
            {
              event: {
                selectstart: (e) => { e.preventDefault() },
              },
              text: "designers " + abc[i],
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(23) + ea,
                fontWeight: String(700),
                color: colorExtended.white,
                fontFamily: "mont",
                marginLeft: String(7) + ea,
                opacity: String(0.4),
                top: String(1) + ea,
              }
            }
          ]
        });
        createNode({
          mother: thisCardBase,
          event: {
            click: instance.insertWhiteCardEvent(designer.desid, instance.abc[i]),
          },
          style: {
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            width: withOut(0, ea),
            flexDirection: "row",
            cursor: "pointer",
          },
          children: [
            {
              mode: "svg",
              source: svgMaker.buttonLineArrow(colorExtended.white),
              style: {
                display: "inline-block",
                position: "relative",
                width: String(buttonArrowWdith) + ea,
                opacity: String(0.6),
                transform: "rotate(90deg)",
              }
            },
          ]
        });
  
      }
      if (blankInjection) {
        for (let i = 0; i < viewNumber - designers.length; i++) {
    
          thisCardBase = createNode({
            mother: thisBase,
            style: {
              display: "inline-block",
              position: "relative",
              width: String(cardWidth * 2) + ea,
              marginRight: String(columnBetween) + ea,
              verticalAlign: "top",
              opacity: String(0.35),
            }
          });
    
          // designer profile
          designerProfileBase = createNode({
            mother: thisCardBase,
            style: {
              display: "inline-flex",
              verticalAlign: "top",
              position: "relative",
              width: String(cardWidth) + ea,
              height: String(cardHeight) + ea,
              borderRadius: String(8) + "px",
              background: colorExtended.white,
              boxShadow: shadowForm,
              flexDirection: "column",
              overflow: "hidden",
              zIndex: String(2),
            },
            children: [
              {
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  height: String(profileHeight) + ea,
                  background: colorExtended.blueBlack,
                }
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  height: withOut(250, ea),
                  background: colorExtended.white,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }
              },
              {
                style: {
                  position: "absolute",
                  top: String(6) + ea,
                  left: String(6) + ea,
                  width: withOut(6 * 2, ea),
                  height: withOut(6 * 2, ea),
                  borderRadius: String(5) + "px",
                  border: "1px solid " + colorExtended.blue,
                  "mix-blend-mode": "multiply",
                  "box-sizing": "border-box",
                }
              }
            ]
          }).children[1];
          createNode({
            mother: designerProfileBase,
            text: "-",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(nameTitleSize) + ea,
              fontWeight: String(800),
              color: colorExtended.black,
              wordSpacing: String(1) + "px",
              borderBottom: "1px solid " + colorExtended.blue,
              paddingBottom: String(1) + ea,
              marginBottom: String(15) + ea,
            }
          });
          createNode({
            mother: designerProfileBase,
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(40) + ea,
              height: String(18) + ea,
              borderRadius: String(18) + ea,
              background: colorExtended.blueDark,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: String(0) + ea,
            },
            child: {
              text: "경력",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(-1) + ea,
                fontSize: String(11) + ea,
                fontWeight: String(700),
                color: colorExtended.white,
              }
            }
          });
          createNode({
            mother: designerProfileBase,
            style: {
              display: "inline-flex",
              position: "relative",
              width: withOut(0, ea),
              height: String(23) + ea,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: String(4) + ea,
            },
            child: {
              text: "-",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(-1) + ea,
                fontSize: String(12) + ea,
                fontWeight: String(400),
                color: colorExtended.black,
              }
            }
          });
          createNode({
            mother: designerProfileBase,
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(92) + ea,
              height: String(18) + ea,
              borderRadius: String(18) + ea,
              background: colorExtended.blueDark,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: String(0) + ea,
            },
            child: {
              text: "자신 있는 스타일",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(-1) + ea,
                fontSize: String(11) + ea,
                fontWeight: String(700),
                color: colorExtended.white,
              }
            }
          });
          createNode({
            mother: designerProfileBase,
            style: {
              display: "inline-flex",
              position: "relative",
              width: withOut(0, ea),
              height: String(23) + ea,
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: String(11) + ea,
            },
            child: {
              text: [
                "-",
              ].join("&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;"),
              style: {
                display: "inline-block",
                position: "relative",
                top: String(-1) + ea,
                fontSize: String(12) + ea,
                fontWeight: String(400),
                color: colorExtended.black,
              },
              under: {
                fontSize: String(12) + ea,
                fontWeight: String(400),
                color: colorExtended.blue,
              }
            }
          });
    
          // detail arrow
          createNode({
            mother: designerProfileBase,
            mode: "svg",
            source: svgMaker.horizontalArrow(24, 9, colorExtended.deactive),
            style: {
              display: "inline-block",
              position: "absolute",
              width: String(24) + ea,
              bottom: String(21) + ea,
              right: String(20) + ea,
            }
          });
          createNode({
            mother: thisCardBase,
            style: {
              display: "inline-flex",
              verticalAlign: "top",
              position: "relative",
              width: String(cardWidth) + ea,
              height: String(cardHeight) + ea,
              borderRadius: String(8) + "px",
              background: colorExtended.blueBlack,
              boxShadow: shadowForm,
              zIndex: String(1),
            }
          });
    
          // info area
          createNode({
            mother: thisCardBase,
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              background: colorExtended.blueBlack,
              borderRadius: String(8) + "px",
              borderTopLeftRadius: String(0) + "px",
              borderTopRightRadius: String(0) + "px",
              justifyContent: "center",
              alignItems: "center",
              top: String(-1 * 8) + "px",
              paddingTop: "calc(" + String(outerMargin2) + ea + " + " + String(8) + "px" + ")",
              paddingBottom: String(outerMargin2) + ea,
              flexDirection: "column",
              boxShadow: "0px 3px 12px -9px " + colorExtended.darkDarkShadow,
            },
            children: [
              {
                style: {
                  display: "flex",
                  position: "relative",
                  borderRadius: String(8) + "px",
                  background: colorExtended.white,
                  width: withOut(outerMargin * 2, ea),
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  paddingTop: String(visualWhitePadding) + ea,
                  paddingBottom: String(visualWhitePadding) + ea,
                },
                children: [
                  factorMaker("유관 경력", "0년 0개월"),
                  barMaker(),
                  factorMaker("홈리에종 소속 기간", "0년 0개월"),
                  barMaker(),
                  factorMaker("1차 제안 받는 시점", "2주 이내"),
                  barMaker(),
                  selectionMaker("제안 방식", [ "순차 제안", "한 번에 제안" ], [ 0, 1 ]),
                  barMaker(),
                  selectionMaker("CAD 도면", [ "가능", "불가능" ], [ 1, 0 ]),
                  barMaker(),
                  selectionMaker("3D", [ "가능", "불가능" ], [ 1, 0 ]),
                  barMaker(),
                  selectionMaker("콜라주", [ "가능", "불가능" ], [ 1, 0 ]),
                  barMaker(),
                  selectionMaker("빌트인 가구 제작", [ "가능", "불가능" ], [ 1, 0 ]),
                  barMaker(),
                  selectionMaker("디자인 가구 제작", [ "가능", "불가능" ], [ 1, 0 ]),
                  barMaker(),
                  selectionMaker("패브릭 제작", [ "가능", "불가능" ], [ 1, 0 ]),
                  barMaker(),
                  selectionMaker("디자이너 역량 범위", serviceParsing().name, [ 0, 1, 0, 0 ]),
                ]
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  borderRadius: String(8) + "px",
                  background: colorExtended.white,
                  width: withOut(outerMargin * 2, ea),
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: String(whiteBoxBetween) + ea,
                  paddingTop: String(visualWhitePadding) + ea,
                  paddingBottom: String(visualWhitePadding) + ea,
                },
                children: [
                  moneyMaker("디자인비", "(오프라인)", autoComma(0) + "원"),
                  barMaker(),
                  moneyMaker("디자인비", "(온라인)", autoComma(0) + "원"),
                  barMaker(),
                  moneyMaker("출장비", "", "(거리 : 0km / 시간 : 0시간 0분 / 1회당) " + autoComma(0) + "원"),
                  barMaker(),
                  percentMaker("오프라인 디자인비 할인율", "(할인 금액)", 0, autoComma(0) + "원"),
                  barMaker(),
                  percentMaker("온라인 디자인비 할인율", "(할인 금액)", 0, autoComma(0) + "원"),
                ]
              },
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(outerMargin * 2, ea),
                  height: String(whiteBoxBetween) + ea,
                  zIndex: String(1),
                },
                child: {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    width: String(finalArrowCicleWidth) + ea,
                    height: String(finalArrowCicleWidth) + ea,
                    borderRadius: String(finalArrowCicleWidth) + ea,
                    top: "calc(50% - " + String(finalArrowCicleWidth / 2) + ea + ")",
                    left: "calc(50% - " + String(finalArrowCicleWidth / 2) + ea + ")",
                    background: colorExtended.mainBlue,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    boxShadow: "0px 4px 18px -9px " + colorExtended.darkShadow,
                  },
                  child: {
                    mode: "svg",
                    source: svgMaker.verticalArrow(finalArrowWidth, finalArrowHeight, colorExtended.white),
                    style: {
                      display: "inline-block",
                      position: "relative",
                      width: String(finalArrowWidth) + ea,
                    }
                  }
                }
              },
              ...finalMoneyBlocks([
                [ "오프라인", autoComma(0) + "원", autoComma(0) + "원" ],
                [ "온라인", autoComma(0) + "원", autoComma(0) + "원" ],
              ]),
            ]
          });
    
          // designer selection
          createNode({
            mother: thisCardBase,
            style: {
              display: "flex",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              width: withOut(0, ea),
              flexDirection: "row",
              marginTop: String(18) + ea,
              marginBottom: String(4) + ea,
            },
            children: [
              {
                style: {
                  display: "inline-flex",
                  width: String(checkCircleWidth) + ea,
                  height: String(checkCircleWidth + 1) + ea,
                  background: colorExtended.focusBlue,
                  borderRadius: String(checkCircleWidth + 1) + ea,
                },
                child: {
                  mode: "svg",
                  source: svgMaker.checkCircle(colorExtended.white),
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(checkCircleWidth) + ea,
                    height: String(checkCircleWidth + 1) + ea,
                  },
                }
              },
              {
                text: "designers " + "-",
                style: {
                  display: "inline-flex",
                  position: "relative",
                  fontSize: String(23) + ea,
                  fontWeight: String(700),
                  color: colorExtended.white,
                  fontFamily: "mont",
                  marginLeft: String(7) + ea,
                  opacity: String(0.8),
                  top: String(1) + ea,
                }
              }
            ]
          });
          createNode({
            mother: thisCardBase,
            style: {
              display: "flex",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              width: withOut(0, ea),
              flexDirection: "row",
            },
            children: [
              {
                mode: "svg",
                source: svgMaker.buttonLineArrow(colorExtended.white),
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: String(buttonArrowWdith) + ea,
                  opacity: String(0.6),
                  transform: "rotate(90deg)",
                }
              },
            ]
          });
    
        }
      }
    }
    if (viewNumber <= designers.length) {
      renderDesigneresCard(false);
    } else {
      renderDesigneresCard(true);
    }

    selectionBase = createNode({
      mother: thirdBase,
      event: {
        selectstart: (e) => { e.preventDefault() },
      },
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        width: withOut(0, ea),
        height: String(96) + ea,
        flexDirection: "row",
        marginTop: String(-1 * 140) + ea,
      },
      children: [
        {
          style: {
            position: "absolute",
            width: withOut(0, ea),
            height: withOut(0, ea),
            borderRadius: String(10) + "px",
            boxShadow: "0px 3px 12px -9px " + colorExtended.darkDarkShadow,
            overflow: "hidden",
          },
          child: {
            style: {
              position: "absolute",
              width: String(standardWidth * 1.2) + ea,
              height: String(standardWidth * 1.2) + ea,
              background: colorExtended.gradientBlue,
              opacity: String(1),
              animation: "rotateProgress 5s linear infinite",
              transformOrigin: "50% 50%",
              left: String(-1 * standardWidth * 0.1) + ea,
              top: String(-1 * standardWidth * 0.6) + ea,
            }
          }
        }
      ]
    });
    createNode({
      mother: selectionBase,
      event: {
        selectstart: (e) => { e.preventDefault() },
      },
      text: "해당 디자이너를 선택하고 현장 미팅을 예약합니다.",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(18) + ea,
        fontWeight: String(800),
        color: colorExtended.white,
      }
    });
    createNode({
      mother: selectionBase,
      mode: "svg",
      source: svgMaker.horizontalArrow(832, 12, colorExtended.white),
      style: {
        display: "inline-block",
        position: "relative",
        width: String(832) + ea,
        marginLeft: String(16) + ea,
        marginRight: String(16) + ea,
        opacity: String(0.6),
      }
    });
    createNode({
      mother: selectionBase,
      event: {
        selectstart: (e) => { e.preventDefault() },
        mouseenter: function (e) {
          this.style.transform = "scale(1.03)";
          this.style.opacity = String(0.8);
        },
        mouseleave: function (e) {
          this.style.transform = "scale(1)";
          this.style.opacity = String(1);
        },
        click: instance.designerFinalSelection(),
      },
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(124) + ea,
        height: String(38) + ea,
        borderRadius: String(5) + "px",
        background: colorExtended.white,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: String(1),
        boxShadow: "0px 3px 14px -9px " + colorExtended.darkDarkShadow,
        cursor: "pointer",
        transformOrigin: "50% 50%",
        transition: "all 0.4s ease",
      },
      child: {
        event: {
          selectstart: (e) => { e.preventDefault() },
        },
        text: "디자이너 선택",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(-1) + ea,
          fontSize: String(16) + ea,
          fontWeight: String(800),
          color: colorExtended.blueDark,
        }
      }
    });

  } catch (e) {
    console.log(e);
  }
}

DesignerExplanationJs.prototype.insertServiceBox = function (thisBase) {
  const instance = this;
  const { ea, media } = this;
  const baseTong = this.baseTong;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, colorChip, colorExtended, withOut, ajaxJson, isMac } = GeneralJs;
  const words = new WordsDictionary();
  const serviceObj = words.getServiceWording();
  let topMargin, leftMargin;
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
  let tempBlock, tempChild, tempDom, tempTitle;
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
  let mobileAllViewBottom, mobileAllViewRight;
  let mobileAllViewInitialHeight;
  let mobileAllViewClassNameService, mobileAllViewClassNameProcess;
  let titleFontWeight;

  topMargin = 44;
  leftMargin = 48;

  titleFontWeight = 800;

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

  mobileAllViewBottom = 0.3;
  mobileAllViewRight = 0.3;
  mobileAllViewInitialHeight = 20;

  mobileAllViewClassNameService = "mobileAllViewClassNameService";
  mobileAllViewClassNameProcess = "mobileAllViewClassNameProcess";

  [ whiteBlock, wordsTable ] = createNodes([
    {
      mother: thisBase,
      style: {
        position: "relative",
        borderRadius: String(desktop ? 8 : 3) + "px",
        width: String(100) + '%',
        background: colorChip.white,
        boxShadow: "0px 5px 18px -9px " + GeneralJs.colorExtended.blueDim,
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
        fontWeight: String(titleFontWeight),
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
        fontWeight: String(titleFontWeight),
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
        fontWeight: String(titleFontWeight),
        color: colorExtended.mainBlue,
      },
      under: {
        "text-decoration": "underline",
        color: colorExtended.mainBlue,
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
        fontWeight: String(titleFontWeight),
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
        fontWeight: String(titleFontWeight),
        color: colorExtended.mainBlue,
      },
      under: {
        "text-decoration": "underline",
        color: colorExtended.mainBlue,
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
      fontWeight: String(titleFontWeight),
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
        fontWeight: String(titleFontWeight),
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
          color: colorExtended.mainBlue,
        }
      }
    ]);
  }

  //methods
  tempBlock = createNode({
    mother: wordsTable,
    style: {
      position: "relative",
      marginBottom: String(marginBottom) + ea,
    }
  });

  tempTitle = createNode({
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
      fontWeight: String(titleFontWeight),
      textAlign: "left",
      color: colorChip.black,
      cursor: "pointer",
    }
  });

  if (mobile) {
    createNode({
      mother: tempTitle,
      text: "전체 보기",
      style: {
        fontSize: String(wordSize - methodsTextVisual - amountTextVisual) + ea,
        position: "absolute",
        bottom: String(mobileAllViewBottom) + ea,
        right: String(mobileAllViewRight) + ea,
        fontWeight: String(titleFontWeight),
        color: colorExtended.mainBlue,
      }
    });
    tempTitle.addEventListener("click", function (e) {
      const target = document.querySelector('.' + mobileAllViewClassNameService);
      const toggle = target.getAttribute("toggle");
      const height = target.getAttribute("height");
      if (toggle === "off") {
        target.style.overflow = "";
        target.style.height = "auto";
        target.setAttribute("toggle", "on");
      } else {
        target.style.overflow = "hidden";
        target.style.height = height;
        target.setAttribute("toggle", "off");
      }
    });
  }

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
        fontWeight: String(titleFontWeight),
        color: colorChip.white,
        textAlign: "right",
      }
    });
  }

  [ grayTong, grayTextTong ] = createNodes([
    {
      mother: tempBlock,
      attribute: [
        { toggle: "off" },
        { height: String(mobileAllViewInitialHeight) + ea }
      ],
      class: [ mobileAllViewClassNameService ],
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

  if (mobile) {
    grayTong.style.overflow = "hidden";
    grayTong.style.height = String(mobileAllViewInitialHeight) + ea;
  }

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
                fontWeight: String(titleFontWeight),
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
                color: colorExtended.mainBlue,
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
          color: colorExtended.mainBlue,
        }
      });
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

  tempTitle = createNode({
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
      fontWeight: String(titleFontWeight),
      textAlign: "left",
      color: colorChip.black,
      cursor: "pointer",
    }
  });

  if (mobile) {
    createNode({
      mother: tempTitle,
      text: "전체 보기",
      style: {
        fontSize: String(wordSize - methodsTextVisual - amountTextVisual) + ea,
        position: "absolute",
        bottom: String(mobileAllViewBottom) + ea,
        right: String(mobileAllViewRight) + ea,
        fontWeight: String(titleFontWeight),
        color: colorExtended.mainBlue,
      }
    });
    tempTitle.addEventListener("click", function (e) {
      const target = document.querySelector('.' + mobileAllViewClassNameProcess);
      const toggle = target.getAttribute("toggle");
      const height = target.getAttribute("height");
      if (toggle === "off") {
        target.style.overflow = "";
        target.style.height = "auto";
        target.setAttribute("toggle", "on");
      } else {
        target.style.overflow = "hidden";
        target.style.height = height;
        target.setAttribute("toggle", "off");
      }
    });
  }

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
        fontWeight: String(titleFontWeight),
        color: colorChip.white,
        textAlign: "right",
      }
    });
  }

  [ grayTong, grayTextTong ] = createNodes([
    {
      mother: tempBlock,
      attribute: [
        { toggle: "off" },
        { height: String(mobileAllViewInitialHeight) + ea }
      ],
      class: [ mobileAllViewClassNameProcess ],
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

  if (mobile) {
    grayTong.style.overflow = "hidden";
    grayTong.style.height = String(mobileAllViewInitialHeight) + ea;
  }

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
                fontWeight: String(titleFontWeight),
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
          color: colorExtended.mainBlue,
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
              source: instance.mother.returnLongArrow(colorExtended.mainBlue),
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

DesignerExplanationJs.prototype.insertWordBox = function (thisBase) {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, colorChip, colorExtended, withOut, ajaxJson } = GeneralJs;
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
  let topMargin, leftMargin;
  let titleFontWeight;

  topMargin = 44;
  leftMargin = 48;

  titleFontWeight = 800;

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
    background: GeneralJs.colorExtended.white,
    boxShadow: "0px 5px 18px -9px " + GeneralJs.colorExtended.blueDim,
    marginBottom: String(blockMarginBottom) + ea,
    paddingTop: String(top) + ea,
    paddingBottom: String(bottom) + ea,
  };
  for (let i in style) {
    whiteBlock.style[i] = style[i];
  }
  thisBase.appendChild(whiteBlock);

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
        style.fontWeight = String(titleFontWeight);
        style.textAlign = "left";
      } else if (z === 1) {
        style.width = String(box1Size) + ea;
        style.marginRight = String(box1Margin) + ea;
        style.fontWeight = String(titleFontWeight);
        style.color = GeneralJs.colorExtended.mainBlue;
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
          style.color = GeneralJs.colorExtended.mainBlue;
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
        arr[z] = arr[z].replace(/\<b\%/gi, "<b style=\"color:" + GeneralJs.colorExtended.mainBlue + "\">");
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
          fontWeight: String(titleFontWeight),
          color: colorExtended.mainBlue,
        },
        under: {
          "text-decoration": "underline",
          color: colorExtended.mainBlue,
        },
      });
    }

  }
}

DesignerExplanationJs.prototype.insertFourthBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToLink, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    let minusLeft;
    let fourthBase;
    let colorTop;
    let basePaddingTop;
    let basePaddingBottom;
    let abc, designers;
    let thisBase;
    let designer;
    let checkCircleWidth;
    let thisCardBase;
    let cardWidth, cardHeight, cardBetween;
    let buttonCardWidth;
    let shadowForm;
    let cardLength;
    let keywords;
    let representative;
    let buttonArrowWdith;
    let designerProfileBase;
    let profileHeight;
    let designerCardGroupBetween;
    let designerCardGroupBetweenFirst;
    let nameTitleSize;
    let selectionBase;
    let buttonBoxMarginTop;
    let buttonWidth;
    let buttonHeight;
    let buttonTextTop;
    let buttonSize;
    let buttonWeight;

    minusLeft = window.innerWidth - standardWidth + 1;

    colorTop = <%% 200, 200, 200, 200, 200 %%>;
    basePaddingTop = <%% 160, 160, 160, 140, 21 %%>;
    basePaddingBottom = <%% 200, 200, 190, 170, 24 %%>;

    checkCircleWidth = 13;

    cardLength = 5;

    cardHeight = 445;
    profileHeight = 250;
    cardBetween = 8;
    buttonCardWidth = 50;
    cardWidth = "calc(" + withOut((cardBetween * cardLength) + buttonCardWidth, ea) + " / " + String(cardLength) + ")";

    buttonArrowWdith = 14;

    designerCardGroupBetween = 70;
    designerCardGroupBetweenFirst = 50;

    nameTitleSize = 25;

    buttonBoxMarginTop = <%% 54, 48, 36, 28, 14 %%>;
    buttonWidth = <%% 110, 90, 80, 80, 15 %%>;
    buttonHeight = <%% 44, 42, 40, 40, 9 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    buttonSize = <%% 20, 17, 16, 15, 3.5 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;

    shadowForm = "0px 8px 20px -9px " + colorExtended.blueDim;

    abc = this.abc;
    designers = this.designers;

    fourthBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        flexDirection: "column",
        paddingTop: String(basePaddingTop) + ea,
        paddingBottom: String(basePaddingBottom) + ea,
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column",
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.gradientBlue,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(0, ea),
        }
      }
    });

    this.insertServiceBox(fourthBase);
    this.insertWordBox(fourthBase);

    // button
    createNode({
      mother: fourthBase,
      event: {
        selectstart: (e) => { e.preventDefault() },
        click: (e) => {
          GeneralJs.scrollTo(window, 0);
        }
      },
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        width: withOut(0, ea),
        marginTop: String(28) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",    
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            background: colorExtended.blueDim,
            borderRadius: String(buttonHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          child: {
            text: "TOP",
            event: {
              selectstart: (e) => { e.preventDefault() },
            },
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(buttonSize) + ea,
              fontWeight: String(buttonWeight),
              color: colorExtended.white,
            }
          }
        }
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

DesignerExplanationJs.prototype.styleTextParsing = function (text) {
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
      finalObj[tempArr[0].trim()] = "url(\"" + BRIDGEHOST.replace(/\:3000$/gi, '') + tempArr[1].trim().replace(/^url\([\"\']/gi, '').replace(/[\"\']\)$/gi, '') + "\")";
    } else {
      finalObj[tempArr[0].trim()] = tempArr[1].trim();
    }
  }

  return finalObj;
}

DesignerExplanationJs.prototype.insertWhiteCardEvent = function (desid, char) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, designerCareer, isMac, isIphone, svgMaker, autoComma, ajaxJson, serviceParsing, dateToString, stringToLink, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const whitePopupClassName = "whitePopupClassName";
  const totalContents = document.getElementById("totalcontents");
  const paperWorksTongClassName = "paperWorksTongClassName";
  const paperWorksFactorWidthClassName = "paperWorksFactorWidthClassName";
  return async function (e) {
    try {
      const loading = instance.mother.grayLoading();
      const project = instance.project;
      const designer = instance.designers.find((d) => { return d.desid === desid });
      const proposal = project.proposal.detail.find((p) => { return p.desid === desid });
      const { analytics, information } = designer;
      const { business: { career: { startY, startM } } } = information;
      const { construct: { level: constructLevel, case: constructCase }, styling: { tendency: { style: styleTendency }, method, furniture: { builtin, design }, fabric: { level: fabricLevel, curtain, bedding } }, purchase: { setting: { install, storage } }, project: { time: { first }, matrix, cad: cadBoo, collage: collageBoo, modeling: modelingBoo } } = analytics;
      const zIndex = 4;
      const web = {
        portfolio: FRONTHOST + "/portdetail.php?pid=",
        review: FRONTHOST + "/revdetail.php?pid="
      };
      const { contentsArr } = await ajaxJson({ mode: "designer", desid }, LOGHOST + "/getContents", { equal: true });
      const today = new Date();
      const careerSubtract = ((today.getFullYear() * 12) + (today.getMonth() + 1)) - ((startY * 12) + startM);
      const year = Math.floor(careerSubtract / 12);
      const month = (careerSubtract % 12);
      let cancelBack, whiteBase;
      let whiteMargin;
      let innerMargin;
      let contentsTong;
      let titleArea;
      let titleHeight;
      let titleSize;
      let titleWeight;
      let titleLineHeight;
      let titleTop;
      let scrollTong;
      let firstTong;
      let profileHeight;
      let profileLineWidth;
      let profileDescriptionTong;
      let profileMargin;
      let secondTong;
      let styleButtonMarginBottom;
      let profilePhotoTong;
      let profileDescriptionTongWidth;
      let profileKeywordsTong;
      let nameMargin;
      let num;
      let nameTitlesize;
      let words;
      let positionData;
      let blockInnerPadding;
      let paperWorksHeight;
      let paperBetween;
      let blockTitleSize;
      let blockTitleBlockHeight;
      let arrowLeftMargin;
      let blockTitleMarginBottom;
      let thirdTong;
      let styleObject;
      let pictureBase;
      let whiteStandardWidth;
      let pictureBaseHeight;
      let fourthTong;
      let infoTong;
      let factorHeight;
      let factorWidth;
      let factorSize, factorBoldWeight, factorWeight;
      let factorTextTop;
      let factorBetween;
      let infoMiddleBase;
      let infoMiddleMother;
      let whiteBlockMarginBottom;
      let whiteBlockOuterMargin;
      let titleTextIndent;
      let factorLightWeight;
      let insertWhiteBlock;
      let leftTendency, rightTendency;
      let tendencyMotherHeight;
      let tendencyNameAreaWidth;
      let tendencyBarHeight;
      let tendencySize, tendencyTextTop, tendencyWeight;
      let tendencyNum;
      let tendencyBoxPaddingTop;
      let fifthTong;
      let largePaddingBottom;
      let portfolioTong;
      let portfolioMiddleMother;
      let contentsNum;
      let sourceArr;
      let sixthTong;
      let dashLineIndent;
      let priceTong;
      let priceMiddleMother;
      let unitBlockHeight, unitBlockIndent;
      let unitBlockHeightSmall;
      let moneyTitleSize, moneyValueSize;
      let moneyVatSize;
      let moneyTitleWeight;
      let moneyVatWeight;
      let moneyValueWeight;
      let moneyTitleTextTop;
      let moneyVatTextTop;
      let moneyValueTextTop;
      let moneyVatMarginRight;
      let moneyCircleWidth, moneyCircleMargin;
      let insertMoneyBlock;
      let moneyBoxPaddingTopVisual;
      let unitBlockHeightBig;
      let finalPriceTong, finalPriceMiddleMother;
      let finalBlockBetween;
      let finalBlockMarginLeft;
      let seventhTong;
      let finalSelectionTong;
      let finalSelectionMiddleMother;
      let buttonArrowWdith;
      let buttonArrowHeight;
      let paperMove;
      let offlineFeeTarget, onlineFeeTarget;
      let deactiveOpacity;
      let insertFinalMoneyBlock;
      let variableLastBlock;
      let noDiscountOffline;
      let noDiscountOnline;
      let onoffLineMarkWidth;
      let vatPadding;

      whiteMargin = 30;
      innerMargin = 52;

      titleHeight = <%% 41, 39, 37, 28, 8 %%>;  
      titleSize = 40;
      titleWeight = <%% 700, 700, 700, 700, 700 %%>;
      titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
      titleTop = -6;

      profileHeight = 200;
      profileLineWidth = 10;
      profileMargin = 30;

      profileDescriptionTongWidth = 700;

      styleButtonMarginBottom = 4;

      nameTitlesize = 32;
      nameMargin = 12;

      blockTitleBlockHeight = 30;
      blockTitleSize = 21;
      blockInnerPadding = 52;
      paperWorksHeight = 260;
  
      paperBetween = 6;
      arrowLeftMargin = 30;

      blockTitleMarginBottom = 11;

      whiteStandardWidth = <%% 1400, 1050, 900, 720, 88 %%>;

      pictureBaseHeight = 880;
      factorHeight = 42;
      factorWidth = 292;

      factorTextTop = -0.5;
      factorSize = 14.5;
      factorBoldWeight = 800;
      factorWeight = 700;
      factorBetween = 5;

      whiteBlockMarginBottom = 6;
      whiteBlockOuterMargin = 10;

      titleTextIndent = 21;

      factorLightWeight = 500;
      tendencyMotherHeight = 21;
      tendencyNameAreaWidth = 64;
      tendencyBarHeight = 14;

      tendencySize = 13;
      tendencyTextTop = -1;
      tendencyWeight = 600;
      tendencyBoxPaddingTop = 16;

      largePaddingBottom = 58;

      dashLineIndent = 8;

      unitBlockHeight = 50;
      unitBlockIndent = 18;
      unitBlockHeightSmall = 46;
      unitBlockHeightBig = 44;

      moneyTitleSize = 16;
      moneyVatSize = 11;
      moneyValueSize = 18;

      moneyTitleWeight = 700;
      moneyVatWeight = 500;
      moneyValueWeight = 700;

      moneyTitleTextTop = -1;
      moneyVatTextTop = 1;
      moneyValueTextTop = -1;
      moneyVatMarginRight = 6;

      moneyCircleWidth = 6;
      moneyCircleMargin = 6;

      moneyBoxPaddingTopVisual = 3;

      finalBlockBetween = 10;
      finalBlockMarginLeft = 430;

      buttonArrowWdith = 16;
      buttonArrowHeight = 30;

      paperMove = 240;

      deactiveOpacity = 0.4;

      onoffLineMarkWidth = 110;
      vatPadding = 16;

      ({ data: { position: positionData } } = await ajaxJson({ mode: "get", desid: designer.desid }, BRIDGEHOST + "/designerRepresentativePaper", { equal: true }));

      offlineFeeTarget = proposal.fee.find((o) => { return o.method === "offline" });
      onlineFeeTarget = proposal.fee.find((o) => { return o.method !== "offline" });
      if (offlineFeeTarget === undefined) {
        offlineFeeTarget = null;
      } else {
        offlineFeeTarget.amount = Math.round(offlineFeeTarget.amount)
        if (offlineFeeTarget.discount === 0) {
          offlineFeeTarget.original = offlineFeeTarget.amount;
        } else {
          offlineFeeTarget.original = Math.round((offlineFeeTarget.amount / (1 - offlineFeeTarget.discount)));
        }
      }
      if (onlineFeeTarget === undefined) {
        onlineFeeTarget = null;
      } else {
        onlineFeeTarget.amount = Math.round(onlineFeeTarget.amount)
        if (onlineFeeTarget.discount === 0) {
          onlineFeeTarget.original = onlineFeeTarget.amount;
        } else {
          onlineFeeTarget.original = Math.round((onlineFeeTarget.amount / (1 - onlineFeeTarget.discount)));
        }
      }

      sourceArr = [];
      for (let { contents } of contentsArr) {
        sourceArr.push({ date: contents.portfolio.date, title: { portfolio: contents.portfolio.title.main, review: contents.review.title.main }, link: { portfolio: web.portfolio + contents.portfolio.pid, review: web.review + contents.portfolio.pid } });
      }
      sourceArr.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
      sourceArr = sourceArr.slice(0, 20);

      insertWhiteBlock = (infoMiddleMother, values, last = false) => {
        let infoMiddleBase, num;

        infoMiddleBase = createNode({
          mother: infoMiddleMother,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(factorHeight) + ea,
            boxSizing: "border-box",
            borderRadius: String(8) + "px",
            background: colorExtended.white,
            marginBottom: String(!last ? whiteBlockMarginBottom : whiteBlockMarginBottom) + ea,
            boxShadow: "0px 2px 15px -9px " + colorExtended.blueDim,
            overflow: "hidden",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }
        });

        num = 0;
        for (let { type, title, double, value } of values) {
          if (type === "string") {
            createNode({
              mother: infoMiddleBase,
              style: {
                display: "inline-flex",
                position: "relative",
                height: String(factorHeight - (dashLineIndent * 2)) + ea,
                width: double ? "calc(100% / " + String(2) + ")" : "calc(100% / " + String(4) + ")",
                flexDirection: "row",
                overflow: "hidden",
                boxSizing: "border-box",
              },
              children: [
                {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    width: "calc(100% / " + String(2) + ")",
                    height: withOut(0, ea),
                    justifyContent: "start",
                    alignItems: "center",
                    background: colorExtended.white,
                  },
                  child: {
                    text: title,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(factorTextTop) + ea,
                      fontSize: String(factorSize) + ea,
                      fontWeight: String(factorBoldWeight),
                      color: colorExtended.mainBlue,
                      textAlign: "left",
                      left: String(titleTextIndent) + ea,
                    }
                  }
                },
                {
                  style: {
                    display: "inline-flex",
                    position: "absolute",
                    top: String(0),
                    right: String(0),
                    height: withOut(0, ea),
                    justifyContent: "center",
                    alignItems: "center",
                    background: colorExtended.white,
                    borderRight: num === values.length - 1 ? "" : "1px dashed " + colorExtended.mainBlue,
                    paddingRight: String(titleTextIndent) + ea,
                  },
                  child: {
                    text: value,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(factorTextTop) + ea,
                      fontSize: String(factorSize) + ea,
                      fontWeight: String(factorLightWeight),
                      color: colorExtended.black,
                      textAlign: "right",
                    }
                  }
                },
              ]
            });
          } else {
            createNode({
              mother: infoMiddleBase,
              style: {
                display: "inline-flex",
                position: "relative",
                height: String(factorHeight - (dashLineIndent * 2)) + ea,
                width: double ? "calc(100% / " + String(2) + ")" : "calc(100% / " + String(4) + ")",
                flexDirection: "row",
                overflow: "hidden",
                boxSizing: "border-box",
              },
              children: [
                {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    width: "calc(100% / " + String(2) + ")",
                    height: withOut(0, ea),
                    justifyContent: "start",
                    alignItems: "center",
                    background: colorExtended.white,
                  },
                  child: {
                    text: title,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(factorTextTop) + ea,
                      fontSize: String(factorSize) + ea,
                      fontWeight: String(factorBoldWeight),
                      color: colorExtended.mainBlue,
                      textAlign: "left",
                      left: String(titleTextIndent) + ea,
                    }
                  }
                },
                {
                  style: {
                    display: "inline-flex",
                    position: "absolute",
                    top: String(0),
                    right: String(0),
                    height: withOut(0, ea),
                    justifyContent: "center",
                    alignItems: "center",
                    background: colorExtended.white,
                    borderRight: num === values.length - 1 ? "" : "1px dashed " + colorExtended.mainBlue,
                    paddingRight: String(titleTextIndent) + ea,
                  },
                  children: value.map(({ title, value: valueNumber }, index) => {
                    if (index !== value.length - 1) {
                      return [
                        {
                          text: title,
                          style: {
                            display: "inline-block",
                            position: "relative",
                            top: String(factorTextTop) + ea,
                            fontSize: String(factorSize) + ea,
                            fontWeight: String(factorLightWeight),
                            color: valueNumber === 1 ? colorExtended.black : colorExtended.deactive,
                            textAlign: "right",
                            borderBottom: valueNumber === 1 ? "1px solid " + colorExtended.mainBlue : "",
                          }
                        },
                        {
                          text: double ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b%|%b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : "&nbsp;&nbsp;&nbsp;&nbsp;<b%|%b>&nbsp;&nbsp;&nbsp;&nbsp;",
                          style: {
                            display: "inline-block",
                            position: "relative",
                            top: String(factorTextTop) + ea,
                            fontSize: String(factorSize) + ea,
                            fontWeight: String(200),
                            color: colorExtended.black,
                            textAlign: "right",
                          },
                          bold: {
                            fontSize: String(factorSize) + ea,
                            fontWeight: String(300),
                            color: colorExtended.mainBlue,
                          }
                        },
                      ]
                    } else {
                      return [
                        {
                          text: title,
                          style: {
                            display: "inline-block",
                            position: "relative",
                            top: String(factorTextTop) + ea,
                            fontSize: String(factorSize) + ea,
                            fontWeight: String(factorLightWeight),
                            color: valueNumber === 1 ? colorExtended.black : colorExtended.deactive,
                            textAlign: "right",
                            borderBottom: valueNumber === 1 ? "1px solid " + colorExtended.mainBlue : "",
                          }
                        },
                      ]
                    }
                  }).flat()
                },
              ]
            });
          }
          num++;
        }

        return infoMiddleBase;
      }

      insertMoneyBlock = (priceMiddleMother, title, vatBoo, value, last = false, blur = false) => {
        return createNode({
          mother: priceMiddleMother,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(unitBlockIndent * 2, ea),
            marginLeft: String(unitBlockIndent) + ea,
            height: String(unitBlockHeightSmall) + ea,
            boxSizing: "border-box",
            justifyContent: "start",
            alignItems: "center",
            borderBottom: last ? "" : "1px dashed " + colorExtended.mainBlue,
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(moneyCircleWidth) + ea,
                height: String(moneyCircleWidth) + ea,
                borderRadius: String(moneyCircleWidth) + ea,
                background: colorExtended.mainBlue,
                marginRight: String(moneyCircleMargin) + ea,
                opacity: blur ? String(deactiveOpacity) : String(1),
              }
            },
            {
              text: title,
              style: {
                fontSize: String(moneyTitleSize) + ea,
                fontWeight: String(moneyTitleWeight),
                color: colorExtended.black,
                display: "inline-flex",
                position: "relative",
                top: String(moneyTitleTextTop) + ea,
                opacity: blur ? String(deactiveOpacity) : String(1),
              }
            },
            {
              style: {
                position: "absolute",
                width: String(50) + '%',
                height: withOut(0, ea),
                display: "inline-flex",
                right: String(0),
                top: String(0),
                justifyContent: "end",
                alignItems: "center",
                opacity: blur ? String(deactiveOpacity) : String(1),
              },
              children: [
                {
                  text: "*vat 별도",
                  style: {
                    fontSize: String(moneyVatSize) + ea,
                    fontWeight: String(moneyVatWeight),
                    color: colorExtended.black,
                    display: vatBoo ? "inline-flex" : "none",
                    position: "relative",
                    top: String(moneyVatTextTop) + ea,
                    marginRight: String(moneyVatMarginRight) + ea,
                  }
                },
                {
                  text: value,
                  style: {
                    fontSize: String(moneyValueSize) + ea,
                    fontWeight: String(moneyValueWeight),
                    color: colorExtended.blueDark,
                    display: "inline-flex",
                    position: "relative",
                    top: String(moneyValueTextTop) + ea,
                  }
                },
              ]
            }
          ]
        });
      }

      insertFinalMoneyBlock = (finalPriceMiddleMother, method, original, amount, last = false, noDiscount = false) => {
        return createNode({
          mother: finalPriceMiddleMother,
          style: {
            display: "inline-flex",
            verticalAlign: "top",
            flexDirection: "row",
            position: "relative",
            height: String(unitBlockHeightBig) + ea,
            borderRadius: String(unitBlockHeightBig) + ea,
            background: colorExtended.white,
            justifyContent: "end",
            alignItems: "center",
            marginRight: !last ? String(finalBlockBetween) + ea : "",
            paddingLeft: String(onoffLineMarkWidth + vatPadding) + ea,
          },
          children: [
            {
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "absolute",
                top: String(0),
                left: String(0),
                justifyContent: "center",
                alignItems: "center",
                height: String(unitBlockHeightBig) + ea,
                borderRadius: String(unitBlockHeightBig) + ea,
                width: String(onoffLineMarkWidth) + ea,
                background: colorExtended.blueDim,
              },
              child: {
                text: method === "online" ? "온라인" : "오프라인",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(-1) + ea,
                  fontSize: String(18) + ea,
                  fontWeight: String(800),
                  color: colorExtended.white,
                }
              }
            },
            {
              text: "*vat 별도",
              style: {
                display: "inline-flex",
                position: "relaive",
                fontSize: String(12) + ea,
                fontWeight: String(moneyVatWeight),
                color: colorExtended.black,
                top: String(moneyVatTextTop) + ea,
                marginRight: String(8) + ea,
              }
            },
            {
              text: autoComma(original) + "원",
              style: {
                display: noDiscount ? "none" : "inline-flex",
                position: "relaive",
                fontSize: String(20) + ea,
                fontWeight: String(300),
                color: colorExtended.deactive,
                top: String(moneyValueTextTop) + ea,
                marginRight: String(8) + ea,
                textDecoration: "line-through",
              }
            },
            {
              text: autoComma(amount) + "원",
              style: {
                display: "inline-flex",
                position: "relaive",
                fontSize: String(21) + ea,
                fontWeight: String(moneyValueWeight),
                color: colorExtended.blueDark,
                top: String(moneyValueTextTop) + ea,
                marginRight: String(24) + ea,
              }
            },
          ]
        });
      }

      cancelBack = createNode({
        mother: totalContents,
        class: [ whitePopupClassName ],
        event: {
          click: (e) => {
            removeByClass(whitePopupClassName);
          }
        },
        style: {
          position: "fixed",
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(0),
          opacity: String(0.4),
          background: colorChip.black,
          zIndex: String(zIndex),
        }
      });

      whiteBase = createNode({
        mother: totalContents,
        class: [ whitePopupClassName ],
        style: {
          position: "fixed",
          width: String(whiteStandardWidth) + ea,
          height: "calc(calc(100% - " + String(naviHeight) + "px" + ") - " + String((whiteMargin * 2)) + ea + ")",
          top: "calc(" + String(naviHeight) + "px" + " + " + String(whiteMargin) + ea + ")",
          left: "calc(50% - " + String(whiteStandardWidth / 2) + ea + ")",
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
          animation: "fadeuporiginal 0.3s ease forwards",
          zIndex: String(zIndex),
        },
        child: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          height: withOut(0, ea),
          overflow: "visible",
        }
      }).firstChild;

      scrollTong = createNode({
        mother: whiteBase,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0 * 2, ea),
          height: withOut(0, ea),
          overflow: "scroll",
        },
        child: {
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(innerMargin) + ea,
            width: withOut(innerMargin * 2, ea),
            height: "auto",
            marginLeft: String(innerMargin) + ea,
            marginRight: String(innerMargin) + ea,
            overflow: "visible",
          }
        }
      }).firstChild;

      // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      firstTong = createNode({
        mother: scrollTong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          flexDirection: "row",
          height: String(profileHeight) + ea,
        }
      });

      // first : photo tong
      profilePhotoTong = createNode({
        mother: firstTong,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(profileHeight + profileLineWidth) + ea,
          height: String(profileHeight) + ea,
          borderRadius: String(8) + "px",
          background: colorExtended.gradientBlue4,
          justifyContent: "end",
          alignItems: "end",
          overflow: "hidden",
        },
        child: {
          style: {
            display: "flex",
            position: "relative",
            width: String(profileHeight) + ea,
            height: String(profileHeight) + ea,
            backgroundImage: "url('" + designer.profile.link + "')",
            backgroundSize: designer.profile.gs === 's' ? "100% auto" : "100% 100%",
            backgroundPosition: designer.profile.position,
            filter: "grayscale(100%)",
          }
        }
      });

      // first : description tong
      profileDescriptionTong = createNode({
        mother: firstTong,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(profileDescriptionTongWidth) + ea,
          height: String(profileHeight) + ea,
          justifyContent: "end",
          alignItems: "start",
          overflow: "hidden",
          flexDirection: "column",
          marginLeft: String(profileMargin) + ea,
        },
      });
      createNode({
        mother: profileDescriptionTong,
        style: {
          display: "flex",
          position: "relative",
          height: String(50) + ea,
          width: withOut(0, ea),
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "end",
          marginBottom: String(nameMargin) + ea,
        },
        children: [
          {
            text: designer.designer.split("").join(" "),
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(nameTitlesize) + ea,
              fontWeight: String(800),
              color: colorExtended.black,
              wordSpacing: String(1) + "px",
            }
          },
          {
            text: "디자이너",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(14) + ea,
              fontWeight: String(400),
              color: colorExtended.black,
              marginLeft: String(10) + ea,
              paddingBottom: String(5) + ea,
            }
          },
          ...designer.styleTendency.map((o) => { return o.name }).slice(0, 3).map((styleName, index) => {
            return {
              style: {
                display: "inline-flex",
                position: "relative",
                height: String(21) + ea,
                borderRadius: String(21) + ea,
                background: colorExtended.mainBlue,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: String(styleButtonMarginBottom) + ea,
                paddingLeft: String(8) + ea,
                paddingRight: String(8) + ea,
                marginLeft: String(index === 0 ? 14 : 3) + ea,
              },
              child: {
                text: styleName,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(-1) + ea,
                  fontSize: String(11) + ea,
                  fontWeight: String(700),
                  color: colorExtended.white,
                }
              }
            }
          })
        ]
      });
      createNode({
        mother: profileDescriptionTong,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
        },
        child: {
          text: designer.setting.front.introduction.desktop.join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(16) + ea,
            lineHeight: String(1.66),
            fontWeight: String(400),
            color: colorExtended.black,
          }
        }
      });

      // first : keywords
      profileKeywordsTong = createNode({
        mother: firstTong,
        style: {
          display: "inline-flex",
          position: "relative",
          width: withOut(profileDescriptionTongWidth + profileMargin + profileHeight + profileLineWidth, ea),
          height: String(profileHeight) + ea,
          justifyContent: "start",
          alignItems: "end",
          overflow: "hidden",
          flexDirection: "column",
        },
      });
      createNode({
        mother: profileKeywordsTong,
        text: "Designer " + char,
        style: {
          display: "flex",
          position: "relative",
          fontSize: String(27) + ea,
          fontWeight: String(700),
          color: colorExtended.blueDark,
          fontFamily: "mont",
          width: withOut(0, ea),
          justifyContent: "end",
          top: String(-5) + ea,
          marginBottom: String(24) + ea,
        }
      });

      for (let i = 0; i < 4; i++) {
        words = designer.keywords[i];
        createNode({
          mother: profileKeywordsTong,
          style: {
            display: "inline-flex",
            position: "relative",
            background: colorExtended.mainBlue,
            paddingLeft: String(6) + ea,
            paddingRight: String(12) + ea,
            height: String(32) + ea,
            borderRadius: String(4) + "px",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: i === 4 - 1 ? "" : String(4) + ea,
          },
          child: {
            text: words,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(14) + ea,
              fontWeight: String(700),
              color: colorExtended.white,
              top: String(-1) + ea,
            },
            previous: {
              mode: "svg",
              source: svgMaker.boxTag(colorExtended.mainBlue),
              style: {
                position: "absolute",
                height: String(32) + ea,
                top: String(0),
                left: String(-18) + ea,
              }
            }
          }
        });
      }

      // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      // second : paper works

      secondTong = createNode({
        mother: scrollTong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          flexDirection: "column",
          marginTop: String(blockInnerPadding) + ea,
          paddingTop: String(blockInnerPadding) + ea,
          paddingBottom: String(blockInnerPadding) + ea,
        },
        children: [
          {
            style: {
              display: "block",
              position: "absolute",
              width: "calc(100% + " + String(innerMargin * 2) + ea + ")",
              top: String(0),
              left: String(-1 * innerMargin) + ea,
              height: withOut(0, ea),
              background: colorExtended.gradientBlue5,
            }
          }
        ]
      });
      createNode({
        mother: secondTong,
        event: {
          selectstart: (e) => { e.preventDefault() },
        },
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(blockTitleBlockHeight) + ea,
          alignItems: "start",
          justifyContent: "start",
        },
        child: {
          text: "PAPER WORKS",
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(blockTitleSize) + ea,
            fontWeight: String(700),
            color: colorExtended.white,
            fontFamily: "mont",
          }
        }
      });
      createNode({
        mother: secondTong,
        event: {
          selectstart: (e) => { e.preventDefault() },
        },
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(paperWorksHeight) + ea,
          overflow: "visible",
          marginTop: String(blockTitleMarginBottom) + ea,
        },
        children: [
          {
            event: {
              click: function (e) {
                const targetTong = document.querySelector('.' + paperWorksTongClassName);
                const thisPosition = Number(targetTong.getAttribute("position"));
                let newPosition;
                newPosition = thisPosition + paperMove;
                if (newPosition > 0) {
                  // pass
                } else {
                  targetTong.style.transform = "translate(" + String(newPosition) + "px)";
                  targetTong.setAttribute("position", String(newPosition));
                }
              },
              selectstart: (e) => { e.preventDefault() },
            },
            style: {
              display: "block",
              position: "absolute",
              top: "calc(50% - " + String(24 / 2) + ea + ")",
              width: String(12) + ea,
              height: String(24) + ea,
              left: String(-1 * arrowLeftMargin) + ea,
            },
            child: {
              mode: "svg",
              source: svgMaker.buttonLineArrow(colorExtended.white),
              style: {
                display: "block",
                position: "relative",
                height: String(24) + ea,
                transform: "rotate(180deg)",
              }
            }
          },
          {
            event: {
              click: function (e) {
                const factors = [ ...document.querySelectorAll('.' + paperWorksFactorWidthClassName) ];
                const targetTong = document.querySelector('.' + paperWorksTongClassName);
                const thisPosition = Number(targetTong.getAttribute("position"));
                let newPosition;
                let totalWidth;

                newPosition = thisPosition - paperMove;
                totalWidth = factors.map((dom) => { return dom.getBoundingClientRect().width + paperBetween }).reduce((acc, curr) => { return acc + curr }, 0);
                standard = (totalWidth - targetTong.parentElement.getBoundingClientRect().width + (largePaddingBottom * 2)) * -1;
                if (newPosition < standard) {
                  newPosition = (totalWidth - targetTong.parentElement.getBoundingClientRect().width) * -1;
                  targetTong.style.transform = "translate(" + String(newPosition) + "px)";
                  targetTong.setAttribute("position", String(newPosition));
                } else {
                  targetTong.style.transform = "translate(" + String(newPosition) + "px)";
                  targetTong.setAttribute("position", String(newPosition));
                }

              },
              selectstart: (e) => { e.preventDefault() },
            },
            style: {
              display: "block",
              position: "absolute",
              top: "calc(50% - " + String(24 / 2) + ea + ")",
              width: String(12) + ea,
              height: String(24) + ea,
              right: String(-1 * arrowLeftMargin) + ea,
            },
            child: {
              mode: "svg",
              source: svgMaker.buttonLineArrow(colorExtended.white),
              style: {
                display: "block",
                position: "relative",
                height: String(24) + ea,
              }
            }
          },
          {
            event: {
              selectstart: (e) => { e.preventDefault() },
            },
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(0, ea),
              overflow: "scroll",
            },
            child: {
              class: [ paperWorksTongClassName ],
              attribute: {
                position: String(0),
              },
              event: {
                selectstart: (e) => { e.preventDefault() },
              },
              style: {
                display: "block",
                position: "relative",
                width: String(8000) + ea,
                height: withOut(0, ea),
                transformOrigin: "0% 0%",
                transform: "traslate(0px)",
                transition: "all 0.3s ease",
              },
              children: positionData.filter((raw, i) => {
                return positionData[i] !== undefined && positionData[i] !== 0 && positionData[i] !== "0"
              }).map((raw, i) => {
                return {
                  class: [ paperWorksFactorWidthClassName ],
                  mode: "img",
                  attribute: {
                    src: "https://" + FILEHOST + stringToLink(positionData[i]),
                  },
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                  },
                  style: {
                    display: "inline-block",
                    position: "relative",
                    height: String(paperWorksHeight) + ea,
                    borderRadius: String(5) + "px",
                    marginRight: String(paperBetween) + ea,
                  }
                }
              })
            }
          }
        ]
      });

      // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      // third : photo settings

      thirdTong = createNode({
        mother: scrollTong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          flexDirection: "column",
          paddingTop: String(blockInnerPadding) + ea,
          paddingBottom: String(largePaddingBottom) + ea,
          borderBottom: "1px dashed " + colorExtended.mainBlue,
        },
      });
      createNode({
        mother: thirdTong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(blockTitleBlockHeight) + ea,
          alignItems: "start",
          justifyContent: "start",
        },
        child: {
          text: "INTERIOR",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(blockTitleSize) + ea,
            fontWeight: String(700),
            color: colorExtended.black,
            fontFamily: "mont",
          }
        }
      });
      pictureBase = createNode({
        mother: thirdTong,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          height: String(pictureBaseHeight) + ea,
          overflow: "visible",
          marginTop: String(blockTitleMarginBottom) + ea,
        },
      });
      for (let obj of proposal.pictureSettings) {
        styleObject = instance.styleTextParsing(obj.styleText);
        createNode({
          mother: pictureBase,
          style: {
            display: "inline-block",
            position: "absolute",
            borderRadius: String(5) + "px",
            backgroundSize: "100% auto",
            backgroundPosition: "50% 50%",
            ...styleObject,
          }
        });
      }

      // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      // fourth : portfolio

      fifthTong = createNode({
        mother: scrollTong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          flexDirection: "column",
          paddingTop: String(blockInnerPadding) + ea,
          paddingBottom: String(blockInnerPadding) + ea,
        },
      });
      createNode({
        mother: fifthTong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(blockTitleBlockHeight) + ea,
          alignItems: "start",
          justifyContent: "start",
        },
        child: {
          text: "PORTFOLIO",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(blockTitleSize) + ea,
            fontWeight: String(700),
            color: colorExtended.black,
            fontFamily: "mont",
          }
        }
      });

      portfolioTong = createNode({
        mother: fifthTong,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          overflow: "visible",
          marginTop: String(blockTitleMarginBottom) + ea,
        },
      });
      portfolioMiddleMother = createNode({
        mother: portfolioTong,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0 * 2, ea),
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          border: "1px solid " + colorExtended.mainBlue,
          boxSizing: "border-box",
        },
      });

      contentsNum = 0;
      for (let { date, title, link } of sourceArr) {

        createNode({
          mother: portfolioMiddleMother,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(unitBlockIndent * 2, ea),
            marginLeft: String(unitBlockIndent) + ea,
            height: String(unitBlockHeight) + ea,
            boxSizing: "border-box",
            justifyContent: "start",
            alignItems: "center",
            borderBottom: contentsNum !== sourceArr.length - 1 ? "1px dashed " + colorExtended.mainBlue : "",
          },
          children: [
            {
              text: title.portfolio,
              style: {
                fontSize: String(16) + ea,
                fontWeight: String(700),
                color: colorExtended.blueDark,
                display: "inline-flex",
                position: "relative",
                top: String(-1) + ea,
              }
            },
            {
              style: {
                position: "absolute",
                width: String(100) + ea,
                height: withOut(0, ea),
                display: "inline-flex",
                right: String(0),
                top: String(0),
                justifyContent: "end",
                alignItems: "center",
              },
              child: {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(18) + ea,
                  height: String(18) + ea,
                  borderRadius: String(5) + "px",
                  background: colorExtended.blueDark,
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  mode: "svg",
                  source: svgMaker.horizontalArrow(12, 10, colorExtended.white),
                  style: {
                    width: String(12) + ea,
                  }
                }
              }
            }
          ]
        });

        contentsNum++;
      }

      // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      // fifth : info

      fourthTong = createNode({
        mother: scrollTong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          flexDirection: "column",
          paddingTop: String(blockInnerPadding) + ea,
          paddingBottom: String(largePaddingBottom) + ea,
          boxSizing: "border-box",
          overflow: "visible",
        },
        child: {
          style: {
            position: "absolute",
            top: String(0),
            left: String(-1 * innerMargin) + ea,
            width: "calc(100% + " + String(innerMargin * 2) + ea + ")",
            height: withOut(-2, "px"),
            background: colorExtended.blueLight,
          },
          next: {
            style: {
              position: "absolute",
              top: String(0),
              left: String(0) + ea,
              width: withOut(0, ea),
              height: withOut(-1, "px"),
              borderBottom: "1px dashed " + colorExtended.blueDim,
              zIndex: String(1),
            }
          }
        }
      });
      createNode({
        mother: fourthTong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(blockTitleBlockHeight) + ea,
          alignItems: "start",
          justifyContent: "start",
        },
        child: {
          text: "INFO",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(blockTitleSize) + ea,
            fontWeight: String(700),
            color: colorExtended.black,
            fontFamily: "mont",
          }
        }
      });

      infoTong = createNode({
        mother: fourthTong,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          overflow: "visible",
          marginTop: String(blockTitleMarginBottom) + ea,
        },
      });
      infoMiddleMother = createNode({
        mother: infoTong,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0 * 2, ea),
          borderRadius: String(8) + "px",
          padding: String(0) + ea,
          paddingBottom: String(0) + ea,
          background: colorExtended.blueLight,
        }
      });

      insertWhiteBlock(infoMiddleMother, [
        {
          title: "유관 경력",
          type: "string",
          double: false,
          value: designerCareer(designer, true, true),
        },
        {
          title: "홈리에종 소속 기간",
          type: "string",
          double: false,
          value: String(year) + "년 " + String(month) + "개월",
        },
        {
          title: "빌트인 가구 제작",
          type: "selection",
          double: false,
          value: [
            { title: "가능", value: builtin > 0 ? 1 : 0 },
            { title: "불가능", value: builtin === 0 ? 1 : 0 },
          ],
        },
        {
          title: "디자인 가구 제작",
          type: "selection",
          double: false,
          value: [
            { title: "가능", value: design > 0 ? 1 : 0 },
            { title: "불가능", value: design === 0 ? 1 : 0 },
          ],
        },
      ], false);
      insertWhiteBlock(infoMiddleMother, [
        {
          title: "3D",
          type: "selection",
          double: false,
          value: [
            { title: "가능", value: modelingBoo > 0 ? 1 : 0 },
            { title: "불가능", value: modelingBoo === 0 ? 1 : 0 },
          ],
        },
        {
          title: "CAD 도면",
          type: "selection",
          double: false,
          value: [
            { title: "가능", value: cadBoo ? 1 : 0 },
            { title: "불가능", value: cadBoo ? 0 : 1 },
          ],
        },
        {
          title: "콜라주",
          type: "selection",
          double: false,
          value: [
            { title: "가능", value: collageBoo ? 1 : 0 },
            { title: "불가능", value: collageBoo ? 0 : 1 },
          ],
        },
        {
          title: "패브릭 제작",
          type: "selection",
          double: false,
          value: [
            { title: "가능", value: fabricLevel > 0 ? 1 : 0 },
            { title: "불가능", value: fabricLevel === 0 ? 1 : 0 },
          ],
        },
      ], false);
      insertWhiteBlock(infoMiddleMother, [
        {
          title: "1차 제안 받는 시점",
          type: "string",
          double: false,
          value: String(first) + "일 이내",
        },
        {
          title: "제안 방식",
          type: "selection",
          double: false,
          value: [
            { title: "순차 제안", value: (method === "순차 제안" ? 1 : 0) },
            { title: "한 번에 제안", value: (method !== "순차 제안" ? 1 : 0) },
          ],
        },
        {
          title: "역량 범위",
          type: "selection",
          double: true,
          value: serviceParsing().name.map((str, index) => {
            return { title: str, value: index <= constructLevel ? 1 : 0 }
          })
        }
      ], true);

      infoMiddleBase = createNode({
        mother: infoMiddleMother,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          boxSizing: "border-box",
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          marginBottom: String(whiteBlockMarginBottom) + ea,
          boxShadow: "0px 2px 15px -9px " + colorExtended.blueDim,
          overflow: "hidden",
          paddingTop: String(dashLineIndent) + ea,
          paddingBottom: String(dashLineIndent) + ea,
        }
      });
      leftTendency = createNode({
        mother: infoMiddleBase,
        style: {
          display: "inline-flex",
          position: "relative",
          paddingTop: String(tendencyBoxPaddingTop - dashLineIndent) + ea,
          paddingBottom: String(tendencyBoxPaddingTop - dashLineIndent) + ea,
          width: "calc(100% / " + String(2) + ")",
          flexDirection: "column",
          overflow: "hidden",
          boxSizing: "border-box",
          verticalAlign: "top",
          borderRight: "1px dashed " + colorExtended.mainBlue,
        },
      });
      rightTendency = createNode({
        mother: infoMiddleBase,
        style: {
          display: "inline-flex",
          position: "relative",
          paddingTop: String(tendencyBoxPaddingTop - dashLineIndent) + ea,
          paddingBottom: String(tendencyBoxPaddingTop - dashLineIndent) + ea,
          width: "calc(100% / " + String(2) + ")",
          flexDirection: "column",
          overflow: "hidden",
          boxSizing: "border-box",
          verticalAlign: "top",
        },
      });
      
      tendencyNum = 0;
      for (let t of designer.styleTendency) {
        createNode({
          mother: leftTendency,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(titleTextIndent * 2, ea),
            marginLeft: String(titleTextIndent) + ea,
            flexDirection: "row",
            height: String(tendencyMotherHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(tendencyNameAreaWidth) + ea,
                height: withOut(0, ea),
                justifyContent: "start",
                alignItems: "center",
              },
              child: {
                text: t.name,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(tendencyTextTop) + ea,
                  fontSize: String(tendencySize) + ea,
                  fontWeight: String(tendencyWeight),
                  color: tendencyNum < 3 ? colorExtended.focusBlue : colorExtended.black,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: withOut(tendencyNameAreaWidth, ea),
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  height: String(tendencyBarHeight) + ea,
                  borderRadius: String(tendencyBarHeight) + ea,
                  background: colorExtended.gray2,
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(100 * (t.value / 10)) + '%',
                    height: withOut(0, ea),
                    height: String(tendencyBarHeight) + ea,
                    borderRadius: String(tendencyBarHeight) + ea,
                    background: colorExtended.gradientBlue1,
                  },
                }
              }
            }
          ]
        });
        tendencyNum++;
      }
      tendencyNum = 0;
      for (let t of designer.toneTendency) {
        createNode({
          mother: rightTendency,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(titleTextIndent * 2, ea),
            marginLeft: String(titleTextIndent) + ea,
            flexDirection: "row",
            height: String(tendencyMotherHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(tendencyNameAreaWidth) + ea,
                height: withOut(0, ea),
                justifyContent: "start",
                alignItems: "center",
              },
              child: {
                text: t.name,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(tendencyTextTop) + ea,
                  fontSize: String(tendencySize) + ea,
                  fontWeight: String(tendencyWeight),
                  color: tendencyNum < 3 ? colorExtended.focusBlue : colorExtended.black,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: withOut(tendencyNameAreaWidth, ea),
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  height: String(tendencyBarHeight) + ea,
                  borderRadius: String(tendencyBarHeight) + ea,
                  background: colorExtended.gray2,
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(100 * (t.value / 10)) + '%',
                    height: withOut(0, ea),
                    height: String(tendencyBarHeight) + ea,
                    borderRadius: String(tendencyBarHeight) + ea,
                    background: colorExtended.gradientBlue1,
                  },
                }
              }
            }
          ]
        });
        tendencyNum++;
      }

      // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      // fifth : price

      sixthTong = createNode({
        mother: scrollTong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          flexDirection: "column",
          paddingTop: String(blockInnerPadding) + ea,
          paddingBottom: String(blockInnerPadding) + ea,
        },
        child: {
          style: {
            position: "absolute",
            top: String(0),
            left: String(-1 * innerMargin) + ea,
            width: "calc(100% + " + String(innerMargin * 2) + ea + ")",
            height: withOut(0, ea),
            background: colorExtended.blueLight,
          }
        }
      });
      createNode({
        mother: sixthTong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(blockTitleBlockHeight) + ea,
          alignItems: "start",
          justifyContent: "start",
        },
        child: {
          text: "PRICE",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(blockTitleSize) + ea,
            fontWeight: String(700),
            color: colorExtended.black,
            fontFamily: "mont",
          }
        }
      });

      priceTong = createNode({
        mother: sixthTong,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          overflow: "visible",
          marginTop: String(blockTitleMarginBottom) + ea,
        },
      });
      priceMiddleMother = createNode({
        mother: priceTong,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0 * 2, ea),
          borderRadius: String(8) + "px",
          background: colorExtended.white,
          boxSizing: "border-box",
          paddingTop: String(moneyBoxPaddingTopVisual) + ea,
          paddingBottom: String(moneyBoxPaddingTopVisual) + ea,
        },
      });

      if (offlineFeeTarget === null) {
        insertMoneyBlock(priceMiddleMother, "디자인비 (오프라인)", true, autoComma(0) + "원", false, true);
      } else {
        insertMoneyBlock(priceMiddleMother, "디자인비 (오프라인)", true, autoComma(offlineFeeTarget.amount) + "원", false, false);
      }
      if (onlineFeeTarget === null) {
        insertMoneyBlock(priceMiddleMother, "디자인비 (온라인)", true, autoComma(0) + "원", false, true);
      } else {
        insertMoneyBlock(priceMiddleMother, "디자인비 (온라인)", true, autoComma(onlineFeeTarget.amount) + "원", false, false);
      }
      if (offlineFeeTarget === null) {
        variableLastBlock = insertMoneyBlock(priceMiddleMother, "출장비", true, "(거리 : 0km / 시간 : 0시간 0분 / 1회당) 0원", false, true);
      } else {
        if (offlineFeeTarget.distance.amount === 0) {
          variableLastBlock = insertMoneyBlock(priceMiddleMother, "출장비", true, "(거리 : 0km / 시간 : 0시간 0분 / 1회당) 0원", false, true);
        } else {
          variableLastBlock = insertMoneyBlock(priceMiddleMother, "출장비", true, `(거리 : ${offlineFeeTarget.distance.distance} / 시간 : ${offlineFeeTarget.distance.time} / 1회당) ${autoComma(offlineFeeTarget.distance.amount)}원`, false, false);
        }
      }
      noDiscountOffline = true;
      if (offlineFeeTarget !== null) {
        if (offlineFeeTarget.discount !== 0) {
          variableLastBlock = insertMoneyBlock(priceMiddleMother, "오프라인 디자인비 할인율 (할인 금액)", false, `${String(offlineFeeTarget.discount * 100)}% (${autoComma(offlineFeeTarget.original - offlineFeeTarget.amount)}원)`, false);
          noDiscountOffline = false;
        }
      }
      noDiscountOnline = true;
      if (onlineFeeTarget !== null) {
        if (onlineFeeTarget.discount !== 0) {
          variableLastBlock = insertMoneyBlock(priceMiddleMother, "온라인 디자인비 할인율 (할인 금액)", false, `${String(onlineFeeTarget.discount * 100)}% (${autoComma(onlineFeeTarget.original - onlineFeeTarget.amount)}원)`, true);
          noDiscountOnline = false;
        }
      }

      variableLastBlock.style.borderBottom = "";

      finalPriceTong = createNode({
        mother: sixthTong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          overflow: "visible",
          marginTop: String(16) + ea,
          justifyContent: "end",
          alignItems: "end",
        },
      });
      createNode({
        mother: finalPriceTong,
        style: {
          display: "block",
          position: "absolute",
          top: String(21) + ea,
          left: String(0),
          width: withOut(0, ea),
          height: String(0) + ea,
          borderBottom: "1px dashed " + colorExtended.blueDim,
        },
      });
      finalPriceMiddleMother = createNode({
        mother: finalPriceTong,
        style: {
          display: "block",
          position: "relative",
          paddingLeft: String(finalBlockBetween) + ea,
          height: String(unitBlockHeightBig) + ea,
          borderRadius: String(8) + "px",
          background: colorExtended.blueLight,
        },
      });

      if (offlineFeeTarget !== null) {
        insertFinalMoneyBlock(finalPriceMiddleMother, "offline", offlineFeeTarget.original, offlineFeeTarget.amount, (onlineFeeTarget === null), noDiscountOffline);
      }
      if (onlineFeeTarget !== null) {
        insertFinalMoneyBlock(finalPriceMiddleMother, "online", onlineFeeTarget.original, onlineFeeTarget.amount, true, noDiscountOnline);
      }

      // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      // fifth : designer selection

      seventhTong = createNode({
        mother: scrollTong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          flexDirection: "column",
          paddingTop: String(44) + ea,
          paddingBottom: String(44) + ea,
        },
        child: {
          style: {
            position: "absolute",
            top: String(0),
            left: String(-1 * innerMargin) + ea,
            width: "calc(100% + " + String(innerMargin * 2) + ea + ")",
            height: withOut(0, ea),
            background: colorExtended.gradientBlue5,
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
          }
        }
      });
      finalSelectionTong = createNode({
        mother: seventhTong,
        event: {
          selectstart: (e) => { e.preventDefault() },
        },
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          overflow: "visible",
        },
      });
      finalSelectionMiddleMother = createNode({
        mother: finalSelectionTong,
        event: {
          selectstart: (e) => { e.preventDefault() },
        },
        style: {
          display: "block",
          position: "relative",
          marginLeft: String(1150) + ea,
          width: withOut(1150, ea),
          height: String(unitBlockHeightBig) + ea,
          borderRadius: String(8) + "px",
        },
      });
      createNode({
        mother: finalSelectionMiddleMother,
        event: {
          selectstart: (e) => { e.preventDefault() },
          click: instance.designerFinalSelection(true, designer.desid),
        },
        style: {
          display: "inline-flex",
          verticalAlign: "top",
          flexDirection: "row",
          position: "relative",
          width: "calc(calc(100% - " + String(0) + ea + ") / 1)",
          height: String(unitBlockHeightBig) + ea,
          borderRadius: String(unitBlockHeightBig) + ea,
          background: colorExtended.white,
          justifyContent: "center",
          alignItems: "center",
        },
        children: [
          {
            event: {
              selectstart: (e) => { e.preventDefault() },
            },
            text: designer.end ? "디자이너 마감" : "디자이너 선택",
            style: {
              fontSize: String(18) + ea,
              fontWeight: String(800),
              color: designer.end ? colorExtended.deactive : colorExtended.blueDark,
              display: "inline-flex",
              position: "relative",
              top: String(moneyValueTextTop) + ea,
            }
          },
        ]
      });

      loading.remove();

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerExplanationJs.prototype.resizeEvent = function () {
  const instance = this;
  const { homeliaisonAnalytics, colorExtended } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;

  this.resizeStack = 0;
  this.resizeFrom = 0;
  this.resizePopup = 0;

  if (desktop) {
    const resizeDebounceEvent = function () {
      let timeout;
      const reEvent = function () {
        homeliaisonAnalytics({
          page: instance.pageName,
          standard: instance.firstPageViewTime,
          action: "aspirantPageResize",
          data: {
            delta: (new Date()).valueOf() - instance.firstPageViewTime.valueOf(),
            date: new Date(),
          },
        }).then(() => {
          window.location.reload();
          instance.resizeStack = 0;
        }).catch((err) => {
          console.log(err);
        });
      }
      let immediate = null;
      return function (e) {
        if (instance.resizeStack === 0) {
          instance.resizeStack = 1;
          instance.resizeFrom = window.innerWidth;
        }
        let context = this;
        let args = arguments;
        function later() {
          timeout = null;
          if (!immediate) { reEvent.apply(context, args); };
        }
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, 250);
        if (callNow) {
          reEvent.apply(context, args);
        }
      }
    }
    window.addEventListener("resize", resizeDebounceEvent());
  }
}

DesignerExplanationJs.prototype.designerFinalSelection = function (fromCard = false, thisDesid = null) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, autoComma, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToLink, designerCareer, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, blankPhoto } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const designerSelectionButtonClassNameButton = "designerSelectionButtonClassNameButton";
  const designerSelectionButtonClassNameString = "designerSelectionButtonClassNameString";
  const designerSelectionButtonClassNameButtonPlus = "designerSelectionButtonClassNameButtonPlus";
  return async function (e) {
    try {
      if (fromCard) {
        const desid = thisDesid;
        const designer = instance.designers.find((d) => { return d.desid === desid });
        await instance.finalSubmit(desid);
      } else {
        const selectionButtons = [ ...document.querySelectorAll('.' + designerSelectionButtonClassNameButton) ];
        const selectedDesignerRaw = selectionButtons.filter((d) => { return d.getAttribute("toggle") === "on" });
        if (selectedDesignerRaw.length === 0) {
          const desidRaw = await GeneralJs.promptLongButtons("디자이너를 선택해주세요!", instance.designers.map(({ designer }, index) => {
            return "Designer " + instance.abc[index] + " : " + designer;  
          }))
          if (desidRaw !== null) {
            const designer = instance.designers[instance.abc.findIndex((a) => { return a === desidRaw.split(" ")[1].trim() })];
            const desid = designer.desid;
            await instance.finalSubmit(desid);
          }
        } else {
          const [ selectedDesigner ] = selectedDesignerRaw;
          const desid = selectedDesigner.getAttribute("desid");
          const designer = instance.designers.find((d) => { return d.desid === desid });
          await instance.finalSubmit(desid);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

DesignerExplanationJs.prototype.finalSubmit = async function (desid) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, autoComma, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToLink, designerCareer, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, blankPhoto } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    const designer = instance.designers.find((d) => { return d.desid === desid });


    console.log(designer);


  } catch (e) {
    console.log(e);
  }
}

DesignerExplanationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, dateToString, homeliaisonAnalytics, colorExtended, stringToLink, objectDeepCopy } = GeneralJs;
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true");
    const normalMode = (entireMode && getObj.normal === "true");
    let proid, cliid;
    let projects, project;
    let clients, client;
    let designers, designer;
    let alphabet, temp0, temp1;
    let profileList;
    let profileListFiltered;
    let blankPhoto;
    let desidArr;
    let keywordsList, photosList;
    let keywordsListFiltered, photosListFiltered;
    let whereQuery;
    let belowTarget, removeTargets;
    let proposalHistory;
    let isOffice;
    let thisStyleTendency;
    let thisToneTendency;

    temp0 = 'A'.charCodeAt();
    temp1 = 'Z'.charCodeAt();
    alphabet = [];
    for (let i = temp0; i < temp1 + 1; i++) {
      alphabet.push(String.fromCharCode(i));
    }

    this.abc = [];
    for (let i of alphabet) {
      this.abc.push(i);
    }

    for (let i of alphabet) {
      for (let j of alphabet) {
        this.abc.push(i + j);
      }
    }

    if (getObj.proid !== undefined) {
      proid = getObj.proid;
    } else {
      window.alert("잘못된 접근입니다!");
      throw new Error("invaild get object");
    }

    projects = await ajaxJson({ whereQuery: { proid } }, SECONDHOST + "/getProjects", { equal: true });
    projects.sort((a, b) => { return b.proposal.date.valueOf() - a.proposal.date.valueOf(); });
    project = projects[0];
    clients = await ajaxJson({ whereQuery: { cliid: project.cliid } }, SECONDHOST + "/getClients", { equal: true });
    client = clients[0];

    if (projects.length === 0) {
      window.alert("아직 제안서가 만들어지지 않았습니다! 잠시만 기다려주세요 :)");
      window.location.href = this.frontPage;
    }

    this.project = project;
    this.client = client;

    proposalHistory = await ajaxJson({ proid: project.proid }, BACKHOST + "/proposalLog", { equal: true });
    desidArr = projects.map((p) => { return p.proposal.detail.map((p) => { return p.desid }) }).flat();

    designers = await ajaxJson({ proid: project.proid, whereQuery: { "$or": desidArr.map((desid) => { return { desid } }) } }, BACKHOST + "/designerProposal_getDesigners", { equal: true });
    profileList = await ajaxJson({ mode: "entire" }, BRIDGEHOST + "/designerProfileList", { equal: true });
    blankPhoto = DesignerExplanationJs.binaryPath + "/blank.png";
    this.blankPhoto = blankPhoto;

    this.tendencyStandards = [
      { column: "classic", name: "클래식" },
      { column: "exotic", name: "엑조틱" },
      { column: "mixmatch", name: "믹스매치" },
      { column: "modern", name: "모던" },
      { column: "natural", name: "내추럴" },
      { column: "oriental", name: "동양" },
      { column: "scandinavian", name: "북유럽" },
      { column: "vintage", name: "빈티지" }
    ]
    this.tendencyTone = [
      { column: "darkWood", name: "다크 우드" },
      { column: "whiteWood", name: "밝은 우드" },
      { column: "highContrast", name: "고대비" },
      { column: "vivid", name: "비비드" },
      { column: "white", name: "화이트" },
      { column: "mono", name: "모노톤" },
      { column: "bright", name: "밝은 톤" },
      { column: "dark", name: "어두운 톤" }
    ]

    keywordsList = (await ajaxJson({ mode: "proposal", desidArr }, BRIDGEHOST + "/designerRepresentativeKeywords", { equal: true })).data;
    photosList = (await ajaxJson({ mode: "proposal", desidArr }, BRIDGEHOST + "/designerRepresentativePhotos", { equal: true })).data;

    for (let designer of designers) {
      profileListFiltered = profileList.filter((o) => { return o.desid === designer.desid });
      keywordsListFiltered = keywordsList.filter((o) => { return o.desid === designer.desid });
      photosListFiltered = photosList.filter((o) => { return o.desid === designer.desid });

      if (profileListFiltered.length === 0) {
        designer.profile = { gs: "s", link: blankPhoto, position: "50% 50%" };
      } else {
        profileListFiltered.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
        designer.profile = { gs: profileListFiltered[0].gs, link: stringToLink(profileListFiltered[0].link), position: `${String(profileListFiltered[0].position.x)}% ${String(profileListFiltered[0].position.y)}%` };
      }

      if (keywordsListFiltered.length === 0) {
        designer.keywords = [];
      } else {
        designer.keywords = keywordsListFiltered[0].selected;
      }

      if (photosListFiltered.length === 0) {
        designer.representative = [ 0, 0, 0, 0, 0 ];
      } else {
        designer.representative = photosListFiltered[0].position;
      }

      thisStyleTendency = objectDeepCopy(this.tendencyStandards);
      for (let obj of thisStyleTendency) {
        obj.value = designer.analytics.styling.tendency.style[obj["column"]]
      }
      thisStyleTendency.sort((a, b) => { return b.value - a.value });
      designer.styleTendency = thisStyleTendency;

      thisToneTendency = objectDeepCopy(this.tendencyTone);
      for (let obj of thisToneTendency) {
        obj.value = designer.analytics.styling.tendency.color[obj["column"]]
      }
      thisToneTendency.sort((a, b) => { return b.value - a.value });
      designer.toneTendency = thisToneTendency;
    }

    // TEST Center ==================================================================================================
    // if (proid === "p1801_aa01s") {
    //   for (let d of designers) {
    //     d.end = false;
    //   }
    // }
    // TEST Center ==================================================================================================
    this.designers = designers;

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "designerExplanation",
      client: null,
      base: {
        instance: this,
        binaryPath: DesignerExplanationJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 9,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          await instance.insertInitBox();
          await instance.insertSecondBox();
          await instance.insertThirdBox();
          await instance.insertThirdPlusBox();
          await instance.insertFourthBox();
          instance.resizeEvent();
          setInterval(() => {
            homeliaisonAnalytics({
              page: instance.pageName,
              standard: instance.firstPageViewTime,
              action: "readTimer",
              data: {
                cliid: "null",
                href: window.encodeURIComponent(window.location.href),
                date: dateToString(new Date(), true),
              },
            }).catch((err) => {
              console.log(err);
            });
          }, 60 * 1000);

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "DesignerExplanationJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    GeneralJs.setQueue(() => {
      window.scrollTo(0, 0);
    }, 400);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "DesignerExplanationJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
