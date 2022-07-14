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
      "return ('홈리에종 FAQ | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 FAQ 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "frontFaq",
  "hangul": "FAQ",
  "route": [
    "frontFaq"
  ]
} %/%/g

const FrontFaqJs = function () {
  this.mother = new GeneralJs();
}

FrontFaqJs.binaryPath = "/middle/curation";

FrontFaqJs.faqContents = [
  {
    "question": "홈리에종은 어떤 서비스인가요?",
    "answer": "홈리에종은 고객님의 예산 / 취향 / 공간 / 생활특징을 종합적으로 이해하고 그에 맞는 <b%홈스타일링 서비스와 디자이너를 추천하여 연결%b>해줍니다. 연결된 디자이너는 홈리에종의 종합적인 정보와 지원을 받아 고객님의 집을 전담하여 시공부터 가구, 소품의 스타일링까지 맡게 됩니다."
  },
  {
    "question": "홈스타일링이란 무엇인가요?",
    "answer": "홈스타일링이란 시공 위주인 리모델링과 달리 고객님의 전체 예산 내에서 기능, 디자인적으로 필요한 만큼 시공하고 마감, 가구, 패브릭, 소품 등으로 공간을 꾸미는 것에 집중하는 방식을 의미합니다. <b%불필요한 공사가 없어 비용이 절약되는 동시에 실제 디자인은 더 예쁘게%b> 나온답니다!"
  },
  {
    "question": "홈리에종 서비스는\n어떻게 진행되나요?",
    "answer": "홈리에종의 진행방식은 <b%큐레이션을 통한 디자이너 제안과 디자이너 선택을 기반%b>으로 시작됩니다. 매칭된 디자이너가 고객님을 전담하여 스타일링을 진행하는 동안 <b%홈리에종은 프로세스 트레킹을 통한 시공팀 연계를 진행%b>해드리고, 각종 지원과 중재를 담당합니다. 정산도 확실히 보증해 드리죠!"
  },
  {
    "question": "포트폴리오는 무엇인가요?",
    "answer": "홈리에종에는 다채로운 개성의 디자이너들이 활동하고 있고, <b%디자이너가 직접 작업한 포트폴리오가 모여있습니다.%b> 고객은 포트폴리오를 통해 다양한 스타일을 접할 수 있고, 내 취향에 맞는 디자이너를 찾을 수 있습니다."
  },
  {
    "question": "전문 디자이너가 필요한 이유",
    "answer": "인테리어는 혼자서 해결하기엔 벅찬 의사결정의 과정이 많습니다. 실제로 수많은 단계와 다양한 관계자를 거쳐야 합니다. 디자이너는 <b%전문적인 지식을 기반으로 시공, 가구, 소품, 패브릭까지 고객 상황에 맞추어 풀어갑니다.%b> 한 명의 디자이너가 전 과정에 관여해서 전담해야 하는 이유입니다."
  },
  {
    "question": "집을 꾸미는 전체 예산은\n어떻게 구성되나요?",
    "answer": "집을 꾸미는 <b%예산 항목은 크게 세가지 요소로 구성%b>됩니다. 1. 첫번째는 디자인비입니다. 집을 완성하기 위해 들어가는 컨설팅, 디자인 용역, 디자인 결과에 지불하시는 금액입니다. 2. 두번째는 시공비입니다. 시공시 사용하는 마감재와 부자재, 인건비, 기타 잡비로 구성됩니다. 3. 세번째는 제품구매 비용입니다. 가구, 패브릭, 조명, 소품 등의 제품 구매비용으로, 실비입니다. 디자이너가 예산에 맞춰 제안드리지만, 고객님께서 어떤 제품을 선택하냐에 따라 달라집니다."
  },
  {
    "question": "스타일링을 받기 전,\n디자인비를 결제 해야하나요?",
    "answer": "디자인비를 홈리에종에 입금하시면, 스타일링 서비스가 진행됩니다. <b%디자인비는 프로젝트가 완료된 후에 디자이너에게 정산%b>됩니다. 고객과 디자이너 양측을 위해 보증하는 홈리에종의 서비스로, 고객의 경우 입금 후에도 끝까지 충분한 서비스를 받으실 수 있고, 디자이너의 경우 서비스를 제공한 후 적절한 때에 정산을 받을 수 있게됩니다."
  },
  {
    "question": "디자인비가 얼마죠?",
    "answer": "디자인비는 <b%집 상태와 서비스 제공의 정도, 어떤 디자이너와 진행하는 지에 따라 다르게 책정%b>됩니다. 평당 금액으로 책정되며, 5-15만원까지 다양합니다. 그리고 계약금은 디자인비에 포함되는 금액입니다."
  },
  {
    "question": "디자인 비용이 합리적인 이유",
    "answer": "홈리에종은 ‘디자인비’를 먼저 받는 방식으로 진행됩니다. 어쩌면 디자인비를 내는 것이 낯설 수도 있어요! 하지만 <b%시행착오를 방지해주고, 업체와의 제휴관계를 이용해 할인을 받을 수 있어 오히려 총 지출은 줄어들게%b> 됩니다. 인테리어의 결과도 일관되게 나오니, 일석이조인 셈이죠."
  },
  {
    "question": "시공이 있을 경우,\n시공팀은 어떻게?",
    "answer": "시공이 필요한 홈스타일링의 경우, <b%홈리에종에서는 고객님께 시공사를 선택하실 수 있는 선택권%b>을 드립니다. 고객님께서 시공사를 직접 알아보시는 방법도 있지만, 홈리에종이 제안드리는 믿을 수 있 는 시공사를 선택하실 것을 권장해드립니다."
  },
  {
    "question": "시공 견적을\n미리 받아볼 수 있나요?",
    "answer": "구체적인 <b%시공 견적은 디자이너와의 미팅 후에 받아보실 수 있습니다.%b> 시공을 어느정도 하는지, 집이 어떤 상태인지, 어떤 마감재를 쓰는지, 마감재에 따라 시공하는 인력의 수준도 달라지고 그에 따라 견적금액도 달라지기 때문입니다."
  },
  {
    "question": "홈리에종 시공팀과\n진행하면 싸게 할 수 있나요?",
    "answer": "하고싶은 공사를 다하고 제일 싸게 하고싶다! 라고 생각하시는 고객님은 홈리에종/디자이너가 제안드리는 시공팀을 선택하시는 것이 적절하지 않습니다. 홈리에종에서는 <b%기능적, 디자인적으로 필요한만큼만 시공하실 수 있도록 범위를 조정함으로 예산 사용을 효율적으로 하실 수 있도록 도와드립니다.%b> (물론 디자이너가 조정해 드리지만 고객님께서 꼭 하고 싶다고 생각하시면 진행 가능합니다.) 또한, 홈리에종에서는 저렴하기만한 시공사는 제안드리지 않습니다. 고객과 디자이너 의 디자인 요구를 구현해 줄 수 있고, 시공력이 좋고, A/S가 잘 되면서 합리적인 견적을 제안하는 팀을 추천드립니다."
  },
  {
    "question": "온라인 스타일링은\n어떤 것인가요?",
    "answer": "디자이너와의 <b%미팅 없이 카톡/전화/이메일 등으로 커뮤니케이션하면서 디자인을 완성해갑니다.%b> 시공이 없고, 고객분께서 협조해주실 수 있을 경우 온라인 스타일링을 추천드리는데요! 오프라인 서비스에 비해 저렴하지만 그만큼 협력을 잘 해주시면 만족스러운 결과물을 얻으실 수 있습니다."
  },
  {
    "question": "온라인시 미팅이\n없어도 괜찮은가요?",
    "answer": "원칙적으로 온라인 스타일링에는 미팅이 없으나 디자이너의 방문 가능 지역에 거주하신다면, <b%디자이너와의 현장 미팅 1회 진행 후 온라인으로 진행하시는 것도 좋은 방법입니다.%b> 단, 미팅 비용은 별도로 청구됩니다."
  }
];

FrontFaqJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let quoteWidth;
  let quoteHeight;
  let titleFontSize, titleFontWeight;
  let serviceChildren;
  let searchTags;
  let titleWording;
  let servicePaddingLeft;
  let serviceSize;
  let serviceBlockPaddingTop;
  let whiteBlockPaddingTop, whiteBlockPaddingBottom;
  let quotoTongHeight;
  let searchBarPaddingTop;
  let searchBarHeight;
  let searchBarWidth;
  let searchIconHeight;
  let searchIconRight, searchIconTop;
  let whiteBlockMarginBottom;
  let inputWithoutHeight;
  let serviceButtonClassName;
  let serviceBlock;
  let inputSize, inputWeight;
  let placeholder;
  let titleTop;
  let servicePaddingTop, servicePaddingBottom;
  let serviceMarginRight;
  let subTitleMarginTop, subTitleFontSize, subTitleWeight;
  let subTitleContents;
  let middleBox;
  let tagTextTop;
  let tagTongBottom;
  let boxTopVisual;
  let mobileBlockTop;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 25, 25, 25, 25, 4 %%>;

  quoteHeight = <%% 14, 14, 14, 14, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 35, 33, 32, 30, 6.4 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  servicePaddingBottom = <%% 10, 10, 10, 10, 10 %%>;
  servicePaddingLeft = <%% 13, 13, 13, 12, 2.2 %%>;
  serviceMarginRight = <%% 6, 6, 6, 6, 6 %%>;
  serviceSize = <%% 13, 13, 13, 12, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 11 %%>;

  searchBarPaddingTop = <%% 220, 220, 192, 164, 13 %%>;
  searchBarHeight = <%% 40, 40, 40, 36, 8 %%>;
  searchBarWidth = <%% 690, 516, 516, 420, 88 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 15, 15, 15, 14, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  subTitleMarginTop = <%% 2, 2, 1, 1, 0.2 %%>;
  subTitleFontSize = <%% 16, 16, 16, 15, 3.2 %%>;
  subTitleWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.3 %%>;
  tagTongBottom = <%% 3, 3, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  titleWording = "홈리에종 FAQ";
  subTitleContents = "자주 묻는 질문";

  mobileBlockTop = 3.5;

  searchTags = [];
  if (media[0]) {
    searchTags.push("홈스타일링이란");
    searchTags.push("시공");
    searchTags.push("온라인");
    searchTags.push("디자인비");
    searchTags.push("미팅");
    searchTags.push("전체");
  } else if (media[1]) {
    searchTags.push("홈스타일링이란");
    searchTags.push("시공");
    searchTags.push("온라인");
    searchTags.push("디자인비");
    searchTags.push("전체");
  } else if (media[2]) {
    searchTags.push("홈스타일링이란");
    searchTags.push("시공");
    searchTags.push("온라인");
    searchTags.push("전체");
  } else if (media[3]) {
    searchTags.push("홈스타일링이란");
    searchTags.push("시공");
    searchTags.push("온라인");
  } else if (media[4]) {
    searchTags.push("홈스타일링이란");
    searchTags.push("시공");
    searchTags.push("온라인");
    searchTags.push("디자인비");
    searchTags.push("미팅");
    searchTags.push("전체");
  }

  placeholder = "디자인비";

  serviceButtonClassName = "serviceButton";

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      marginBottom: String(whiteBlockMarginBottom) + ea,
      top: String(-1 * boxTopVisual) + ea,
      paddingTop: desktop ? "" : String(mobileBlockTop) + ea,
    }
  });

  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.white))) * quoteHeight;
  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      height: String(quotoTongHeight) + ea,
      opacity: String(0.6),
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.doubleQuote(colorChip.white),
        style: {
          display: "inline-block",
          height: String(quoteHeight) + ea,
          width: String(quoteWidth) + ea,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        text: titleWording,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(titleTop) + ea,
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: String(subTitleMarginTop) + ea,
    },
    children: [
      {
        text: subTitleContents,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(0) + ea,
          fontSize: String(subTitleFontSize) + ea,
          fontWeight: String(subTitleWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  middleBox = createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "left",
      alignItems: "center",
      paddingTop: String(searchBarPaddingTop) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(searchBarWidth) + ea,
          height: String(searchBarHeight) + ea,
          borderRadius: String(5) + "px",
          background: desktop ? colorChip.gray2 : colorChip.white,
          opacity: desktop ? String(1) : String(0.88),
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnSearch(colorChip.black),
            style: {
              position: "absolute",
              height: String(searchIconHeight) + ea,
              right: String(searchIconRight) + ea,
              top: String(searchIconTop) + ea,
            }
          },
          {
            mode: "input",
            class: [ "searchInput" ],
            attribute: {
              type: "text",
              placeholder: placeholder,
            },
            event: {
              keyup: function (e) {
                setDebounce(async () => {
                  try {
                    this.value = this.value.trim();
                    this.value = this.value.replace(/[^가-힣a-z ]/gi, '');

                    homeliaisonAnalytics({
                      page: instance.pageName,
                      standard: instance.firstPageViewTime,
                      action: "searchKeyword",
                      data: {
                        value: this.value,
                        date: dateToString(new Date(), true),
                      },
                    }).catch((err) => {
                      console.log(err);
                    });

                    instance.insertFaqBlock(this.value);
                  } catch (e) {
                    console.log(e);
                  }
                }, "searchEventDebounce", 1000);
              }
            },
            style: {
              position: "absolute",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              height: withOut(inputWithoutHeight, ea),
              border: String(0),
              outline: String(0),
              background: "transparent",
              fontSize: String(inputSize) + ea,
              fontWeight: String(inputWeight),
              color: colorChip.black,
              textAlign: "center",
            }
          }
        ]
      },
    ]
  });

  serviceChildren = [];
  for (let service of searchTags) {
    serviceChildren.push({
      class: [
        serviceButtonClassName
      ],
      attribute: {
        toggle: "off",
        value: service,
      },
      event: {
        click: function (e) {
          const targets = [ ...document.querySelectorAll('.' + serviceButtonClassName) ];
          let thisValue;
          for (let dom of targets) {
            if (dom === this) {
              dom.setAttribute("toggle", "on");
              dom.firstChild.style.color = colorChip.black;
              dom.firstChild.querySelector('b').style.color = colorChip.green;
              thisValue = dom.getAttribute("value");
            } else {
              dom.setAttribute("toggle", "off");
              dom.firstChild.style.color = colorChip.deactive;
              dom.firstChild.querySelector('b').style.color = colorChip.deactive;
            }
          }
          instance.insertFaqBlock(/전체/gi.test(thisValue) ? "" : thisValue);
        }
      },
      style: {
        display: "inline-flex",
        position: "relative",
        height: String(searchBarHeight - (tagTongBottom * 2)) + ea,
        marginRight: String(serviceMarginRight) + ea,
        paddingLeft: String(servicePaddingLeft) + ea,
        paddingRight: String(servicePaddingLeft) + ea,
        textAlign: "center",
        background: colorChip.gray2,
        borderRadius: String(5) + "px",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      },
      children: [
        {
          text: "<b%#%b> " + service,
          style: {
            display: "inline-block",
            position: "relative",
            top: String(tagTextTop) + ea,
            fontSize: String(serviceSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            cursor: "pointer",
            textAlign: "center",
          },
          bold: {
            color: colorChip.deactive,
          }
        }
      ]
    });
  }

  serviceBlock = createNode({
    mother: middleBox,
    style: {
      display: desktop ? "block" : "none",
      position: "absolute",
      textAlign: "center",
      right: String(0),
      bottom: String(tagTongBottom) + ea,
    },
    children: serviceChildren
  });

  for (let dom of serviceBlock.children) {
    dom.firstChild.style.width = String(Math.ceil(dom.firstChild.getBoundingClientRect().width + 1)) + "px";
    dom.style.width = String(Math.ceil(dom.firstChild.getBoundingClientRect().width) + 1) + "px";
  }

  serviceBlock.lastChild.style.marginRight = "";

}

FrontFaqJs.prototype.insertFaqBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, totalContents, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let whiteBlockPaddingBottom;
  let whiteBlockPaddingTop;
  let whiteBlockMarginBottom;

  whiteBlockPaddingTop = <%% 85, 80, 72, 60, 7.5 %%>;
  whiteBlockPaddingBottom = <%% 85, 80, 72, 60, 8 %%>;
  whiteBlockMarginBottom = <%% 200, 200, 200, 200, 30 %%>;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      paddingTop: String(whiteBlockPaddingTop) + ea,
      paddingBottom: String(whiteBlockPaddingBottom) + ea,
      background: colorChip.white,
      marginBottom: String(whiteBlockMarginBottom) + ea,
      boxShadow: "0px 3px 15px -10px " + colorChip.gray5,
    }
  });

  this.faqTong = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      width: withOut(0),
    }
  });

  this.insertFaqBlock(null);
}

FrontFaqJs.prototype.insertFaqBlock = function (search = null) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, cleanChildren } = GeneralJs;
  const { ea, media, totalContents, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const faqTong = this.faqTong;
  let targetContents;
  let baseBlock, questionArea, answerArea;
  let num;
  let finalBoo;
  let numberArea;
  let outerMargin;
  let innerMarginBottom;
  let finalMarginBottomVisual;
  let questionSize, questionWeight, numberWeight;
  let questionLineHeight;
  let firstWidth, secondWidth;
  let answerSize, answerWeight, answerLineHeight;
  let mobileQuestionMarginBottom;
  let textTop;
  let answerBoldWeight;

  outerMargin = <%% 80, 80, 70, 60, 6 %%>;
  innerMarginBottom = <%% 85, 80, 72, 60, 8 %%>;
  finalMarginBottomVisual = <%% 25, 25, 15, 15, 2 %%>;

  questionSize = <%% 23, 21, 19, 16, 3.5 %%>;
  questionWeight = <%% 800, 800, 800, 800, 800 %%>;
  numberWeight = <%% 300, 300, 300, 300, 300 %%>;

  questionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.7 %%>;

  firstWidth = <%% 90, 80, 65, 45, 0 %%>;
  secondWidth = <%% 450, 370, 310, 265, 60 %%>;

  answerSize = <%% 16, 16, 15, 14, 3.5 %%>;
  answerWeight = <%% 400, 400, 400, 400, 400 %%>;
  answerBoldWeight = <%% 700, 700, 700, 700, 7700 %%>;
  answerLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

  textTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  mobileQuestionMarginBottom = 1.5;

  cleanChildren(faqTong);

  targetContents = JSON.parse(JSON.stringify(FrontFaqJs.faqContents));

  if (typeof search === "string") {
    if (search.trim() === '') {
      targetContents = targetContents;
    } else {
      targetContents = targetContents.filter((obj) => {
        return (new RegExp(search, "gi")).test(obj.question);
      });
    }
  }

  num = 0;
  for (let { question, answer } of targetContents) {

    finalBoo = (num === targetContents.length - 1);

    baseBlock = createNode({
      mother: faqTong,
      style: {
        display: "block",
        position: "relative",
        marginLeft: String(outerMargin) + ea,
        marginRight: String(outerMargin) + ea,
        width: withOut(outerMargin * 2, ea),
        marginBottom: !finalBoo ? String(innerMarginBottom) + ea : String(finalMarginBottomVisual) + ea,
        borderBottom: !finalBoo ? "1px dashed " + colorChip.gray3 : "",
        paddingBottom: !finalBoo ? String(innerMarginBottom) + ea : "",
      }
    });

    if (desktop) {
      numberArea = createNode({
        mother: baseBlock,
        text: "Q" + String(num + 1) + ".",
        style: {
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          fontSize: String(questionSize) + ea,
          fontWeight: String(numberWeight),
          color: colorChip.gray5,
          width: String(firstWidth) + ea,
          lineHeight: String(questionLineHeight),
          top: String(textTop) + ea,
        }
      });
    }

    questionArea = createNode({
      mother: baseBlock,
      text: desktop ? question : "<b%Q" + String(num + 1) + ".%b> " + question.replace(/\n/gi, ' '),
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        verticalAlign: "top",
        fontSize: String(questionSize) + ea,
        fontWeight: String(questionWeight),
        color: colorChip.black,
        width: desktop ? String(secondWidth) + ea : withOut(firstWidth, ea),
        lineHeight: String(questionLineHeight),
        marginBottom: desktop ? "" : String(mobileQuestionMarginBottom) + ea,
        top: String(textTop) + ea,
      },
      bold: {
        fontWeight: String(numberWeight),
        color: colorChip.gray5,
      }
    });

    answerArea = createNode({
      mother: baseBlock,
      text: answer,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        width: desktop ? withOut(firstWidth + secondWidth, ea) : withOut(0),
        verticalAlign: "top",
        fontSize: String(answerSize) + ea,
        fontWeight: String(answerWeight),
        color: colorChip.black,
        lineHeight: String(answerLineHeight),
        top: String(textTop) + ea,
      },
      bold: {
        fontWeight: String(answerBoldWeight),
        color: colorChip.green,
      }
    });

    num++;
  }

}

FrontFaqJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, requestPromise, setDebounce } = GeneralJs;
    const getObj = returnGet();

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "frontFaq",
      client: null,
      base: {
        instance: this,
        binaryPath: FrontFaqJs.binaryPath,
        subTitle: "홈리에종 FAQ",
        secondBackground: false,
        backgroundType: 1,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertFaqBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "FrontFaqJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "FrontFaqJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
