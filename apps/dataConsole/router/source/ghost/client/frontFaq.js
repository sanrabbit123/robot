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
    "answer": "홈리에종은 고객님의 예산 / 취향 / 공간 / 생활특징을 종합적으로 이해하고 그에 맞는 홈스타일링 서비스와 디자이너를 추천하여 연결해줍니다. 연결된 디자이너는 홈리에종의 종합적인 정보와 지원을 받아 고객님의 집을 전담하여 시공부터 가구, 소품의 스타일링까지 맡게 됩니다."
  },
  {
    "question": "홈스타일링이 무엇인가요?",
    "answer": "홈스타일링이란 시공 위주인 리모델링과 달리 고객님의 전체 예산 내에서 기능, 디자인적으로 필요한 만큼 시공하고 마감, 가구, 패브릭, 소품 등으로 공간을 꾸미는 것에 집중하는 방식을 의미합니다. 불필요한 공사가 없어 비용이 절약되는 동시에 실제 디자인은 더 예쁘게 나온답니다!"
  },
  {
    "question": "홈리에종 서비스는 어떻게 진행되나요?",
    "answer": "홈리에종의 진행방식은 큐레이션을 통한 디자이너 제안과 디자이너 선택을 기반으로 시작됩니다. 매칭된 디자이너가 고객님을 전담하여 스타일링을 진행하는 동안 홈리에종은 프로세스 트레킹을 통한 시공팀 연계를 진행해드리고, 각종 지원과 중재를 담당합니다. 정산도 확실히 보증해 드리죠!"
  },
  {
    "question": "포트폴리오는 무엇인가요?",
    "answer": "홈리에종에는 다채로운 개성의 디자이너들이 활동하고 있고, 디자이너가 직접 작업한 포트폴리오가 모여있습니다. 고객은 포트폴리오를 통해 다양한 스타일을 접할 수 있고, 내 취향에 맞는 디자이너를 찾을 수 있습니다."
  },
  {
    "question": "전문 디자이너가 필요한 이유",
    "answer": "인테리어는 혼자서 해결하기엔 벅찬 의사결정의 과정이 많습니다. 실제로 수많은 단계와 다양한 관계자를 거쳐야 합니다. 디자이너는 전문적인 지식을 기반으로 시공, 가구, 소품, 패브릭까지 고객 상황에 맞추어 풀어갑니다. 한 명의 디자이너가 전 과정에 관여해서 전담해야 하는 이유입니다."
  },
  {
    "question": "집을 꾸미는 전체 예산은 어떻게 구성되나요?",
    "answer": "집을 꾸미는 예산항목은 크게 세가지 요소로 구성됩니다. 1. 첫번째는 디자인비입니다. 집을 완성하기 위해 들어가는 컨설팅, 디자인 용역, 디자인 결과에 지불하시는 금액입니다. 2. 두번째는 시공비입니다. 시공시 사용하는 마감재와 부자재, 인건비, 기타 잡비로 구성됩니다. 3. 세번째는 제품구매 비용입니다. 가구, 패브릭, 조명, 소품 등의 제품 구매비용으로, 실비입니다. 디자이너가 예산에 맞춰 제안드리지만, 고객님께서 어떤 제품을 선택하냐에 따라 달라집니다."
  },
  {
    "question": "스타일링을 받기전, 디자인비를 결제 해야하나요?",
    "answer": "디자인비를 홈리에종에 입금하시면, 스타일링 서비스가 진행됩니다. 디자인비는 프로젝트가 완료된 후에 디자이너에게 정산됩니다. 고객과 디자이너 양측을 위해 보증하는 홈리에종의 서비스로, 고객의 경우 입금 후에도 끝까지 충분한 서비스를 받으실 수 있고, 디자이너의 경우 서비스를 제공한 후 적절한 때에 정산을 받을 수 있게됩니다."
  },
  {
    "question": "디자인비가 얼마죠?",
    "answer": "디자인비는 집 상태와 서비스 제공의 정도, 어떤 디자이너와 진행하는지에 따라 다르게 책정됩니다. 평당 금액으로 책정되며, 5-15만원까지 다양합니다. 그리고 계약금은 디자인비에 포함되는 금액입니다."
  },
  {
    "question": "디자인 비용이 합리적인 이유",
    "answer": "홈리에종은 ‘디자인비’를 먼저 받는 방식으로 진행됩니다. 어쩌면 디자인비를 내는 것이 낯설 수도 있어요! 하지만 시행착오를 방지해주고, 업체와의 제휴관계를 이용해 할인을 받을 수 있어 오히려 총 지출은 줄어들게 됩니다. 인테리어의 결과도 일관되게 나오니, 일석이조인 셈이죠."
  },
  {
    "question": "시공이 있을 경우, 시공팀은 어떻게?",
    "answer": "시공이 필요한 홈스타일링의 경우, 홈리에종에서는 고객님께 시공사를 선택하실 수 있는 선택권을 드립니다. 고객님께서 시공사를 직접 알아보시는 방법도 있지만, 홈리에종이 제안드리는 믿을 수 있 는 시공사를 선택하실 것을 권장해드립니다."
  },
  {
    "question": "시공 견적을 미리 받아볼 수 있나요?",
    "answer": "구체적인 시공견적은 디자이너와의 미팅 후에 받아보실 수 있습니다. 시공을 어느정도 하는지, 집이 어떤 상태인지, 어떤 마감재를 쓰는지, 마감재에 따라 시공하는 인력의 수준도 달라지고 그에 따라 견적금액도 달라지기 때문입니다."
  },
  {
    "question": "홈리에종이 제안하는 시공팀과 진행하면 싸게 할 수 있나요?",
    "answer": "하고싶은 공사를 다하고 제일 싸게 하고싶다! 라고 생각하시는 고객님은 홈리에종/디자이너가 제안드리는 시공팀을 선택하시는 것이 적절하지 않습니다. 홈리에종에서는 기능적, 디자인적으로 필요한만큼만 시공하실 수 있도록 범위를 조정함으로 예산 사용을 효율적으로 하실 수 있도록 도와드립니다. (물론 디자이너가 조정해 드리지만 고객님께서 꼭 하고 싶다고 생각하시면 진행 가능합니다.) 또한, 홈리에종에서는 저렴하기만한 시공사는 제안드리지 않습니다. 고객과 디자이너 의 디자인 요구를 구현해 줄 수 있고, 시공력이 좋고, A/S가 잘 되면서 합리적인 견적을 제안하는 팀을 추천드립니다."
  },
  {
    "question": "온라인 스타일링은 어떤 것인가요?",
    "answer": "디자이너와의 미팅 없이 카톡/전화/이메일 등으로 커뮤니케이션하면서 디자인을 완성해갑니다. 시공이 없고, 고객분께서 협조해주실 수 있을 경우 온라인 스타일링을 추천드리는데요! 오프라인 서비스에 비해 저렴하지만 그만큼 협력을 잘 해주시면 만족스러운 결과물을 얻으실 수 있습니다."
  },
  {
    "question": "온라인시 미팅이 없어도 괜찮은가요?",
    "answer": "원칙적으로 온라인 스타일링에는 미팅이 없으나 디자이너의 방문가능 지역에 거주하신다면, 디자이너와의 현장 미팅 1회 진행 후 온라인으로 진행하시는 것도 좋은 방법입니다. 단, 미팅 비용은 별도로 청구됩니다."
  }
];

FrontFaqJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
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
  let indexNumberBottom;
  let initWording0, initWording1;
  let grayBox;
  let grayBoxMarginTop;
  let grayBoxTitleSize, grayBoxTitleWeight, grayBoxTitleTop, grayBoxTitleLeft;
  let grayBoxUp, grayBoxDown;
  let grayBoxHeight, grayBoxTop;
  let grayBoxUpWidth0, grayBoxUpWidth1, grayBoxUpWidth2, grayBoxUpWidth3;
  let grayBoxUpRight1, grayBoxUpRight2, grayBoxUpRight3;
  let grayBoxDownWidth0, grayBoxDownWidth1, grayBoxDownWidth2;
  let grayBoxDownRight1, grayBoxDownRight2;
  let grayBoxArrowTop, grayBoxArrowHeight;
  let overlappingWidth;
  let grayInnerWordingSize;
  let grayInnerWordingWeight;
  let grayInnerWordingTextTop;
  let grayUpWordings, grayDownWordings;
  let mobileGrayUpHeight;
  let mobileRightBoxHeight;
  let grayBoxImageVisualWidth;
  let marginTop;
  let mobileLeftBoxHeight;

  blockHeight = <%% 396, 326, 293, 246, 121 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  marginTop = <%% 52, 50, 40, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 26, 23, 19, 5.4 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 500, 500, 600, 600, 500 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  barWidth = <%% 70, 80, 80, 80, 80 %%>;
  barLeft = <%% 240, titleLeft + 234, titleLeft + 234, titleLeft + 234, titleLeft + 234 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  leftWidth = <%% 300, 232, 200, 164, 300 %%>;

  initWordingHeight = <%% 20, 20, 20, 20, 9 %%>;
  initWordingSize = <%% 15.5, 15, 14.5, 13.5, 3.5 %%>;
  initWordingWordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  initWordingLineHeight = <%% 9, 9, 9, 9, 9 %%>;

  indexNumberBottom = <%% 3, 4, 12, 4, 0 %%>;

  grayBoxMarginTop = <%% 108, 103, 96, 86, 36 %%>;

  grayBoxTitleSize = <%% 14, 14, 13, 11, 3.2 %%>;
  grayBoxTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  grayBoxTitleTop = <%% (isMac() ? 36 : 38), (isMac() ? 36 : 38), (isMac() ? 36 : 38), (isMac() ? 20 : 21), 0 %%>;
  grayBoxTitleLeft = <%% 40, 32, 30, 16, 6 %%>;
  grayBoxHeight = <%% 36, 36, 34, 28, 7 %%>;
  grayBoxTop = <%% 30, 30, 30, 15, 6.6 %%>;

  grayBoxUpWidth0 = <%% 280, 180, 140, 120, 24 %%>;
  grayBoxUpWidth1 = <%% 230, 160, 130, 110, 24 %%>;
  grayBoxUpWidth2 = <%% 72, 72, 72, 72, 9 %%>;
  grayBoxUpWidth3 = <%% 130, 112, 108, 90, 20 %%>;

  grayBoxUpRight1 = <%% 310, 200, 160, 125, 28.5 %%>;
  grayBoxUpRight2 = <%% 550, 370, 300, 244, 54 %%>;
  grayBoxUpRight3 = <%% 622, 422, 341, 285, 62 %%>;

  grayBoxDownWidth0 = <%% 280, 242, 195, 175, 30 %%>;
  grayBoxDownWidth1 = <%% 277, 170, 142, 120, 29 %%>;
  grayBoxDownWidth2 = <%% 175, 112, 108, 90, 20 %%>;

  grayBoxDownRight1 = <%% 310, 264, 210, 179, 34 %%>;
  grayBoxDownRight2 = <%% 577, 422, 341, 285, 62 %%>;

  grayBoxArrowTop = <%% 42, 42, 42, 24, 8.8 %%>;
  grayBoxArrowHeight = <%% 11, 11, 11, 9, 2 %%>;

  overlappingWidth = <%% 10, 10, 10, 10, 0 %%>;
  grayInnerWordingSize = <%% 13, 13, 13, 11, 2.8 %%>;
  grayInnerWordingTextTop = desktop ? (isMac() ? -1 : 0) : -0.1;
  grayInnerWordingWeight = 600;

  mobileGrayUpHeight = 18;
  mobileRightBoxHeight = 78;
  mobileLeftBoxHeight = 29;

  grayBoxImageVisualWidth = <%% 16, 4, 0, 0, 19 %%>;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  leftBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? String(leftWidth) + ea : String(100) + '%',
      lineHeight: String(1.42),
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : String(mobileLeftBoxHeight) + ea,
      marginTop: desktop ? String(marginTop) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
      verticalAlign: "top",
    },
    children: [
      {
        text: "홈리에종 FAQ",
        style: {
          position: "absolute",
          fontSize: String(titleFont) + ea,
          fontWeight: String(titleFontWeight),
          wordSpacing: String(wordSpacing) + "px",
          top: desktop ? (String((media[0] ? 0 : media[1] ? 1 : 3) + (isMac() || mobile ? 0 : 2)) + ea) : String(9) + ea,
          left: String(titleLeft) + ea,
          color: colorChip.black,
          width: desktop ? "" : String(100) + '%',
          textAlign: desktop ? "" : "center",
        }
      }
    ]
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      paddingTop: String(margin) + ea,
      width: desktop ? withOut(leftWidth + margin + margin, ea) : String(100) + '%',
      height: "",
      borderRadius: String(5) + "px",
      overflow: "hidden",
    }
  });

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
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "FrontFaqJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "FrontFaqJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
