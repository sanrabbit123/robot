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
      "return ('콘솔 매뉴얼 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('콘솔 매뉴얼 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "consoleManual",
  "hangul": "콘솔 매뉴얼",
  "route": [
    "consoleManual"
  ]
} %/%/g

const ConsoleManualJs = function () {
  this.mother = new GeneralJs();
}

ConsoleManualJs.binaryPath = FRONTHOST + "/middle/console/manual";

ConsoleManualJs.prototype.insertInitBox = function () {
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

  whiteBlockMarginBottom = <%% 90, 80, 74, 60, 14.5 %%>;

  quoteHeight = <%% 15, 15, 15, 15, 2.5 %%>;
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

  searchBarPaddingTop = <%% 220, 220, 192, 164, 12.5 %%>;
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

  titleWording = "콘솔 매뉴얼";
  subTitleContents = "디자이너 콘솔에 대한 설명";

  mobileBlockTop = 4.5;

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
        source: svgMaker.serifAsterisk(colorChip.white),
        style: {
          display: "inline-block",
          height: String(quoteHeight) + ea,
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

}

ConsoleManualJs.prototype.insertManualStartBox = function () {
  const instance = this;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray, findByAttribute, setQueue, downloadFile, zeroAddition } = GeneralJs;
  let margin;
  let paddingTop;
  let whiteBottomMargin;
  let bottomMargin;
  let whiteBlock;
  let grayTong;
  let innerMargin;
  let mobileVisualPaddingValue;
  let veryBigSize;
  let veryBigWeight;
  let firstWidth;
  let veryBigTextTop;
  let textSize;
  let textWeight;
  let textFileWeight;
  let textTextTop;
  let contents;
  let firstMargin;
  let numberSize, numberWeight;
  let titleMargin;
  let descriptionLineHeight;
  let listImageHeight;
  let imageVisualPaddingTop;
  let imageVisualPaddingBottom;
  let detailImageHeight0, detailImageHeight1;
  let detailBlockHeight;
  let mobileLineMargin;
  let numberMargin;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 50, 50, 42, 39, 6 %%>;

  whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;

  veryBigSize = <%% 24, 22, 20, 18, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  veryBigTextTop = <%% -1, -1, -2, -1, -1 %%>;

  innerMargin = <%% 0, 0, 0, 0, 1 %%>;

  textTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), -0.3 %%>;

  textSize = <%% 14, 13, 12, 11, 3.2 %%>;
  textWeight = <%% 700, 700, 700, 700, 700 %%>;
  textFileWeight = <%% 400, 400, 400, 400, 400 %%>;

  firstWidth = <%% 350, 300, 260, 174, 300 %%>;
  firstMargin = <%% 36, 36, 28, 22, 7.2 %%>;

  numberSize = <%% 16, 16, 14, 12, 3.3 %%>;
  numberWeight = <%% 500, 500, 500, 500, 500 %%>;

  titleMargin = <%% 8, 8, 4, 4, 1.5 %%>;

  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  listImageHeight = <%% 1300, 1385, 1385, 1186, 1234 %%>;

  imageVisualPaddingTop = <%% 4, 4, 4, 4, 4 %%>;
  imageVisualPaddingBottom = <%% 10, 10, 10, 10, 10 %%>;

  mobileVisualPaddingValue = 0.2;

  detailImageHeight0 = <%% 914, 1329, 1166, 999, 770 %%>;
  detailImageHeight1 = <%% 2324, 2470, 3151, 2740, 1500 %%>;

  detailBlockHeight = <%% 188, 205, 174, 151, 188 %%>;

  mobileLineMargin = 14;
  numberMargin = 0.3;

  contents = {
    title: [
      "디자이너 콘솔의",
      "전체적인 구성",
    ],
    description: big ? [
      "콘솔의 구성에 대해 설명드립니다.",
      "옆모습은 디자이너 콘솔에 들어가셨을 때",
      "가장 처음 보게 되는 화면입니다.",
    ] : (desktop ? [
      "구성에 대해 설명드립니다.",
      "디자이너 콘솔에 들어가셨을 때",
      "처음 보게 되는 화면입니다.",
    ] : [
      "구성에 대해 설명드립니다. 디자이너 콘솔에",
      "들어가셨을 때 처음 보게 되는 화면입니다.",
    ]),
    margin: <&& 107 | 135 | 146 | 123 | 3 &&>,
    images: {
      list: [
        <&& ConsoleManualJs.binaryPath + "/back_desktop_0.jpg" | ConsoleManualJs.binaryPath + "/back_small_0.jpg" | ConsoleManualJs.binaryPath + "/back_tablet_0.jpg" | ConsoleManualJs.binaryPath + "/back_tablet_0.jpg" | ConsoleManualJs.binaryPath + "/back_mobile_0.jpg" &&>,
      ],
      detail: [
        <&& ConsoleManualJs.binaryPath + "/back_desktop_2.jpg" | ConsoleManualJs.binaryPath + "/back_small_2.jpg" | ConsoleManualJs.binaryPath + "/back_tablet_2.jpg" | ConsoleManualJs.binaryPath + "/back_tablet_2.jpg" | ConsoleManualJs.binaryPath + "/back_mobile_2.jpg" &&>,
        <&& ConsoleManualJs.binaryPath + "/back_desktop_1.jpg" | ConsoleManualJs.binaryPath + "/back_small_1.jpg" | ConsoleManualJs.binaryPath + "/back_tablet_1.jpg" | ConsoleManualJs.binaryPath + "/back_tablet_1.jpg" | ConsoleManualJs.binaryPath + "/back_mobile_1.jpg" &&>,
      ],
    },
    descriptions: {
      list: [
        {
          title: "진행중 프로젝트",
          description: big ? [
            "먼저, 디자이너 콘솔은 진행중 프로젝트로",
            "시작합니다. 홈리에종과 계약하신 프로젝트 중",
            "진행중 프로젝트만 리스트업이 되어 있으며,",
            "대기와 진행을 구분하여 볼 수 있습니다.",
          ] : [
            "디자이너 콘솔은 진행중 프로젝트로",
            "시작합니다. 홈리에종과 계약하신",
            "프로젝트 중 진행중 프로젝트만",
            "리스트업 되어 있으며, 대기와",
            "진행중을 구분하여 볼 수 있습니다.",
          ],
          margin: <&& 77 | 107 | 109 | 73 | 11 &&>,
        },
        {
          title: "완료된 프로젝트",
          description: big ? [
            "진행중 프로젝트 다음으로 나오는 것은 완료된",
            "프로젝트들로, 진행하셨던 모든 프로젝트들의",
            "리스트입니다. 각 항목을 클릭해 보시면 컨텐츠와",
            "관련된 설정을 하실 수 있게 되어 있습니다.",
          ] : [
            "진행중 프로젝트 밑으로 나오는 것은",
            "완료된 프로젝트들로, 진행하셨던",
            "프로젝트들입니다. 각 항목을 클릭해",
            "보면 컨텐츠 설정을 할 수 있습니다.",
          ],
          margin: <&& 52 | 86 | 97 | 80 | 11 &&>,
        },
        {
          title: "발행된 컨텐츠",
          description: big ? [
            "발행된 프로젝트가 홈리에종 웹에서 어떻게",
            "보이는지 미리 볼 수 있는 칸으로 홈리에종 웹의",
            "디자이너 탭의 실장님 섹션으로 가셨을 때와",
            "같은 리스트를 보여주고 있습니다.",
          ] : [
            "발행된 프로젝트가 홈리에종 웹에서",
            "어떻게 보이는 지 볼 수 있는 칸으로",
            "웹의 디자이너 탭의 실장님 섹션으로",
            "가셨을 때와 같은 리스트입니다."
          ],
          margin: <&& 126 | 129 | 136 | 115 | 11 &&>,
        },
      ],
      detail: [
        {
          title: "고객님의 현재 단계",
          description: big ? [
            "프로젝트 상세에 들어와 보시면 가장 먼저",
            "보이는 것은 고객님의 현재 단계를 체크하는",
            "란입니다. 디자인 / 시공 / 구매 / 세팅의",
            "분류 아래 해당 단계를 클릭해 주시면 됩니다.",
          ] : [
            "프로젝트 상세에 들어와 보시면",
            "먼저 보이는 것은 고객님의 단계를",
            "체크하는 란입니다. 각 카테고리",
            "별로 고객님께 해당되는 단계를",
            "클릭해 주시면 됩니다."
          ],
          margin: <&& 135 | 283 | 304 | 239 | 11 &&>,
        },
        {
          title: "프로젝트 파일",
          description: big ? [
            "밑으로 오는 것은 프로젝트에서 필요한 파일을",
            "아카이빙 할 수 있는 공간입니다. 각 주제별로",
            "업로드해주시면 쉽게 관리하실 수 있으며,",
            "공유 또한 한 번에 이루어질 수 있습니다.",
          ] : [
            "밑으로 오는 것은 프로젝트에서",
            "필요한 파일을 각 주제별로",
            "아카이빙 할 수 있는 공간입니다.",
            "업로드해주시면 쉽게 관리하실 수",
            "있으며, 공유도 할 수 있습니다.",
          ],
          margin: <&& 167 | 432 | 339 | 272 | 11 &&>,
        },
        {
          title: "프로젝트 파일",
          description: big ? [
            "파일을 올리시고, 메모를 남기신 뒤, 각 파일을",
            "클릭하시면 수정 / 삭제 / 공유와 같은 여러",
            "액션을 하실 수 있으며 고객 공유 또한 간편하게",
            "하실 수 있으므로 적극적 이용 부탁드립니다.",
          ] : [
            "파일을 올리시고, 메모를 남기신 뒤,",
            "각 파일을 클릭하시면 수정, 삭제와",
            "같은 여러 액션을 하실 수 있으며",
            "고객 공유 또한 간편하게 하실 수",
            "있으므로 이용 부탁드립니다.",
          ],
          margin: <&& 133 | 97 | 354 | 320 | 11 &&>,
        },
        {
          title: "프로젝트 상태",
          description: big ? [
            "기타 프로젝트 상태에 대한 표기입니다.",
            "촬영비 관련, 컨텐츠 관련, 디자이너 글 관련",
            "여러 액션을 하실 수 있습니다. 기타 기능이 모여",
            "있는 곳이므로 필요할 때 찾아 주시면 됩니다.",
          ] : [
            "기타 프로젝트 상태에 대한",
            "표기입니다. 촬영비, 컨텐츠 관련,",
            "디자이너 글 관련 등 상태 확인과",
            "여러 액션을 하실 수 있습니다.",
          ],
          margin: <&& 386 | 13 | 13 | 9 | 11 &&>,
        },
      ],
    }
  }


  if (desktop) {

    createNode({
      mother: baseTong,
      style: {
        position: "relative",
        borderRadius: String(desktop ? 8 : 1) + ea,
        width: String(100) + '%',
        background: colorChip.white,
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(whiteBottomMargin) + ea,
        marginBottom: String(bottomMargin) + ea,
        boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      },
      child: {
        style: {
          display: "block",
          position: "relative",
          width: withOut(margin * 2, ea),
          height: String(100) + '%',
          marginLeft: String(margin) + ea,
        },
        child: {
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(innerMargin) + ea,
            paddingBottom: String(desktop ? innerMargin : 0) + ea,
            paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
            paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
            width: withOut(innerMargin * 2, ea),
            background: colorChip.white,
            borderRadius: String(8) + "px",
          },
          child: {
            style: {
              display: desktop ? "flex" : "block",
              width: withOut(0),
              flexDirection: desktop ? "row" : "",
              justifyContent: desktop ? "start" : "",
              alignItems: desktop ? "start" : "",
            },
            children: [
              {
                style: {
                  display: desktop ? "inline-flex" : "flex",
                  position: "relative",
                  width: desktop ? String(firstWidth - firstMargin) + ea : withOut(0, ea),
                  justifyContent: desktop ? "" : "center",
                  alignItems: desktop ? "" : "center",
                  textAlign: desktop ? "" : "center",
                  marginTop: desktop ? "" : String(2.8) + ea,
                  marginBottom: desktop ? "" : String(3) + ea,
                  flexDirection: "column",
                  paddingRight: String(firstMargin) + ea,
                },
                children: [
                  {
                    text: contents.title.join("\n"),
                    style: {
                      display: "block",
                      position: "relative",
                      fontSize: String(veryBigSize) + ea,
                      fontWeight: String(veryBigWeight),
                      color: colorChip.black,
                      lineHeight: String(1.4),
                      textAlign: "left",
                      marginBottom: String(contents.margin) + ea,
                      top: String(textTextTop) + ea,
                    },
                  },
                  {
                    text: contents.description.join("\n"),
                    style: {
                      display: "block",
                      position: "relative",
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textFileWeight),
                      color: colorChip.black,
                      lineHeight: String(descriptionLineHeight),
                      textAlign: "right",
                    },
                  },
                  {
                    style: {
                      display: "block",
                      position: "relative",
                      height: String(firstMargin) + ea,
                      borderBottom: "1px dashed " + colorChip.gray4,
                      width: "calc(100% + " + String(firstMargin) + ea + ")",
                      marginBottom: String(firstMargin) + ea,
                    }
                  },
                  ...variableArray(contents.descriptions.list.length).map((index) => {
                    return [
                      {
                        text: zeroAddition(index + 1),
                        style: {
                          display: "block",
                          position: "relative",
                          fontSize: String(numberSize) + ea,
                          fontWeight: String(numberWeight),
                          color: colorChip.green,
                          fontFamily: "graphik",
                          marginBottom: String(contents.descriptions.list[index].margin) + ea,
                        },
                      },
                      {
                        text: contents.descriptions.list[index].title,
                        style: {
                          display: "block",
                          position: "relative",
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.black,
                          lineHeight: String(descriptionLineHeight),
                          textAlign: "right",
                          marginBottom: String(titleMargin) + ea,
                        },
                      },
                      {
                        text: contents.descriptions.list[index].description.join("\n"),
                        style: {
                          display: "block",
                          position: "relative",
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textFileWeight),
                          color: colorChip.black,
                          lineHeight: String(descriptionLineHeight),
                          textAlign: "right",
                        },
                      },
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          height: String(firstMargin) + ea,
                          borderBottom: "1px dashed " + colorChip.gray4,
                          width: "calc(100% + " + String(firstMargin) + ea + ")",
                          marginBottom: String(firstMargin) + ea,
                        }
                      },
                    ]
                  }).flat(),
                ]
              },
              {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: withOut(firstWidth, ea),
                  paddingTop: String(imageVisualPaddingTop) + ea,
                  paddingBottom: String(imageVisualPaddingBottom) + ea,
                },
                child: {
                  style: {
                    display: "block",
                    position: "relative",
                    width: withOut(0, ea),
                    borderRadius: String(5) + "px",
                    boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                    height: String(listImageHeight) + ea,
                    backgroundSize: "100% auto",
                    backgroundPosition: "50% 0%",
                    backgroundImage: "url('" + contents.images.list[0] + "')",
                  }
                }
              }
            ]
          }
        }
      }
    });
  
    createNode({
      mother: baseTong,
      style: {
        position: "relative",
        borderRadius: String(desktop ? 8 : 1) + ea,
        width: String(100) + '%',
        background: colorChip.white,
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(whiteBottomMargin) + ea,
        marginBottom: String(bottomMargin) + ea,
        boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      },
      child: {
        style: {
          display: "block",
          position: "relative",
          width: withOut(margin * 2, ea),
          height: String(100) + '%',
          marginLeft: String(margin) + ea,
        },
        child: {
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(innerMargin) + ea,
            paddingBottom: String(desktop ? innerMargin : 0) + ea,
            paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
            paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
            width: withOut(innerMargin * 2, ea),
            background: colorChip.white,
            borderRadius: String(8) + "px",
          },
          child: {
            style: {
              display: desktop ? "flex" : "block",
              width: withOut(0),
              flexDirection: desktop ? "row" : "",
              justifyContent: desktop ? "start" : "",
              alignItems: desktop ? "start" : "",
            },
            children: [
              {
                style: {
                  display: "inline-flex",
                  flexDirection: "column",
                  position: "relative",
                  width: withOut(firstWidth, ea),
                  paddingTop: String(imageVisualPaddingTop) + ea,
                  paddingBottom: String(imageVisualPaddingBottom) + ea,
                },
                child: {
                  style: {
                    display: "block",
                    position: "relative",
                    width: withOut(0, ea),
                    borderRadius: String(5) + "px",
                    boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                    height: String(detailImageHeight0) + ea,
                    backgroundSize: "100% auto",
                    backgroundPosition: "50% 0%",
                    backgroundImage: "url('" + contents.images.detail[0] + "')",
                    marginBottom: String(firstMargin) + ea,
                  },
                  next: {
                    style: {
                      display: "block",
                      position: "relative",
                      width: withOut(0, ea),
                      borderRadius: String(5) + "px",
                      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                      height: String(detailImageHeight1) + ea,
                      backgroundSize: "100% auto",
                      backgroundPosition: "50% 100%",
                      backgroundImage: "url('" + contents.images.detail[1] + "')",
                    },
                  }
                }
              },
              {
                style: {
                  display: desktop ? "inline-flex" : "flex",
                  position: "relative",
                  width: desktop ? String(firstWidth - firstMargin) + ea : withOut(0, ea),
                  justifyContent: desktop ? "" : "center",
                  alignItems: desktop ? "" : "center",
                  textAlign: desktop ? "" : "center",
                  marginTop: desktop ? "" : String(2.8) + ea,
                  marginBottom: desktop ? "" : String(3) + ea,
                  flexDirection: "column",
                  paddingLeft: String(firstMargin) + ea,
                },
                children: [
                  {
                    style: {
                      display: "block",
                      position: "relative",
                      height: String(detailBlockHeight) + ea,
                      borderBottom: "1px dashed " + colorChip.gray4,
                      width: "calc(100% + " + String(firstMargin) + ea + ")",
                      marginBottom: String(firstMargin) + ea,
                      left: String(-1 * firstMargin) + ea,
                    }
                  },
                  ...variableArray(contents.descriptions.detail.length).map((index) => {
                    return [
                      {
                        text: zeroAddition(index + 1 + contents.descriptions.list.length),
                        style: {
                          display: "block",
                          position: "relative",
                          fontSize: String(numberSize) + ea,
                          fontWeight: String(numberWeight),
                          color: colorChip.green,
                          fontFamily: "graphik",
                          marginBottom: String(contents.descriptions.detail[index].margin) + ea,
                        },
                      },
                      {
                        text: contents.descriptions.detail[index].title,
                        style: {
                          display: "block",
                          position: "relative",
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.black,
                          lineHeight: String(descriptionLineHeight),
                          textAlign: "right",
                          marginBottom: String(titleMargin) + ea,
                        },
                      },
                      {
                        text: contents.descriptions.detail[index].description.join("\n"),
                        style: {
                          display: "block",
                          position: "relative",
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textFileWeight),
                          color: colorChip.black,
                          lineHeight: String(descriptionLineHeight),
                          textAlign: "right",
                        },
                      },
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          height: String(firstMargin) + ea,
                          borderBottom: "1px dashed " + colorChip.gray4,
                          width: "calc(100% + " + String(firstMargin) + ea + ")",
                          left: String(-1 * firstMargin) + ea,
                          marginBottom: String(firstMargin) + ea,
                        }
                      },
                    ]
                  }).flat(),
                ]
              },
            ]
          }
        }
      }
    });

  } else {

    createNode({
      mother: baseTong,
      style: {
        position: "relative",
        borderRadius: String(desktop ? 8 : 1) + ea,
        width: String(100) + '%',
        background: colorChip.white,
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(whiteBottomMargin) + ea,
        marginBottom: String(bottomMargin) + ea,
        boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      },
      child: {
        style: {
          display: "block",
          position: "relative",
          width: withOut(margin * 2, ea),
          height: String(100) + '%',
          marginLeft: String(margin) + ea,
        },
        child: {
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(innerMargin) + ea,
            paddingBottom: String(desktop ? innerMargin : 0) + ea,
            paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
            paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
            width: withOut(innerMargin * 2, ea),
            background: colorChip.white,
            borderRadius: String(8) + "px",
          },
          child: {
            style: {
              display: desktop ? "flex" : "block",
              width: withOut(0),
              flexDirection: desktop ? "row" : "",
              justifyContent: desktop ? "start" : "",
              alignItems: desktop ? "start" : "",
            },
            children: [
              {
                style: {
                  display: desktop ? "inline-flex" : "flex",
                  position: "relative",
                  width: desktop ? String(firstWidth - firstMargin) + ea : withOut(0, ea),
                  justifyContent: desktop ? "" : "center",
                  alignItems: desktop ? "" : "center",
                  textAlign: desktop ? "" : "center",
                  marginTop: desktop ? "" : String(2.8) + ea,
                  marginBottom: desktop ? "" : String(3) + ea,
                  flexDirection: "column",
                  paddingRight: String(firstMargin) + ea,
                },
                children: [
                  {
                    text: contents.title.join(" "),
                    style: {
                      display: "block",
                      position: "relative",
                      fontSize: String(veryBigSize) + ea,
                      fontWeight: String(veryBigWeight),
                      color: colorChip.black,
                      lineHeight: String(1.4),
                      textAlign: "left",
                      marginBottom: String(contents.margin) + ea,
                      top: String(textTextTop) + ea,
                    },
                  },
                  {
                    text: contents.description.join("\n"),
                    style: {
                      display: "block",
                      position: "relative",
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textFileWeight),
                      color: colorChip.black,
                      lineHeight: String(descriptionLineHeight),
                      textAlign: "right",
                    },
                  },
                  {
                    mode: "img",
                    attribute: {
                      src: ConsoleManualJs.binaryPath + "/back_mobile_0.jpg"
                    },
                    style: {
                      display: "block",
                      position: "relative",
                      width: withOut(0, ea),
                      borderRadius: String(5) + "px",
                      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                      marginTop: String(firstMargin) + ea,
                    }
                  },
                  {
                    style: {
                      display: "block",
                      position: "relative",
                      height: String(mobileLineMargin) + ea,
                      borderBottom: "1px dashed " + colorChip.gray4,
                      width: withOut(0, ea),
                      marginBottom: String(mobileLineMargin) + ea,
                    }
                  },
                  ...variableArray(contents.descriptions.list.length).map((index) => {
                    return [
                      {
                        text: zeroAddition(index + 1),
                        style: {
                          display: "block",
                          position: "relative",
                          fontSize: String(numberSize) + ea,
                          fontWeight: String(numberWeight),
                          color: colorChip.green,
                          fontFamily: "graphik",
                          marginBottom: String(numberMargin) + ea,
                        },
                      },
                      {
                        text: contents.descriptions.list[index].title,
                        style: {
                          display: "block",
                          position: "relative",
                          fontSize: String(3.7) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.black,
                          lineHeight: String(descriptionLineHeight),
                          textAlign: "center",
                          marginBottom: String(titleMargin) + ea,
                        },
                      },
                      {
                        text: contents.descriptions.list[index].description.join(" "),
                        style: {
                          display: "block",
                          position: "relative",
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textFileWeight),
                          color: colorChip.black,
                          lineHeight: String(descriptionLineHeight),
                          textAlign: "center",
                          width: String(94) + '%',
                        },
                      },
                      {
                        mode: "img",
                        attribute: {
                          src: ConsoleManualJs.binaryPath + "/back_mobile_" + String(index + 1) + ".jpg"
                        },
                        style: {
                          display: "block",
                          position: "relative",
                          width: withOut(0, ea),
                          borderRadius: String(5) + "px",
                          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                          marginTop: String(firstMargin) + ea,
                        }
                      },
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          height: String(contents.descriptions.list.length - 1 === index ? 0 : mobileLineMargin) + ea,
                          borderBottom: contents.descriptions.list.length - 1 === index ? "" : "1px dashed " + colorChip.gray4,
                          width: withOut(0, ea),
                          marginBottom: contents.descriptions.list.length - 1 === index ? "" : String(mobileLineMargin) + ea,
                        }
                      },
                    ]
                  }).flat(),
                ]
              }
            ]
          }
        }
      }
    });
  
    createNode({
      mother: baseTong,
      style: {
        position: "relative",
        borderRadius: String(desktop ? 8 : 1) + ea,
        width: String(100) + '%',
        background: colorChip.white,
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(whiteBottomMargin) + ea,
        marginBottom: String(bottomMargin) + ea,
        boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      },
      child: {
        style: {
          display: "block",
          position: "relative",
          width: withOut(margin * 2, ea),
          height: String(100) + '%',
          marginLeft: String(margin) + ea,
        },
        child: {
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(innerMargin) + ea,
            paddingBottom: String(desktop ? innerMargin : 0) + ea,
            paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
            paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
            width: withOut(innerMargin * 2, ea),
            background: colorChip.white,
            borderRadius: String(8) + "px",
          },
          child: {
            style: {
              display: desktop ? "flex" : "block",
              width: withOut(0),
              flexDirection: desktop ? "row" : "",
              justifyContent: desktop ? "start" : "",
              alignItems: desktop ? "start" : "",
            },
            children: [
              {
                style: {
                  display: desktop ? "inline-flex" : "flex",
                  position: "relative",
                  width: desktop ? String(firstWidth - firstMargin) + ea : withOut(0, ea),
                  justifyContent: desktop ? "" : "center",
                  alignItems: desktop ? "" : "center",
                  textAlign: desktop ? "" : "center",
                  marginTop: desktop ? "" : String(2.8) + ea,
                  marginBottom: desktop ? "" : String(3) + ea,
                  flexDirection: "column",
                },
                children: [
                  ...variableArray(contents.descriptions.detail.length).map((index) => {
                    return [
                      {
                        text: zeroAddition(index + 1 + contents.descriptions.list.length),
                        style: {
                          display: "block",
                          position: "relative",
                          fontSize: String(numberSize) + ea,
                          fontWeight: String(numberWeight),
                          color: colorChip.green,
                          fontFamily: "graphik",
                          marginBottom: String(numberMargin) + ea,
                        },
                      },
                      {
                        text: contents.descriptions.detail[index].title,
                        style: {
                          display: "block",
                          position: "relative",
                          fontSize: String(3.7) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.black,
                          lineHeight: String(descriptionLineHeight),
                          textAlign: "center",
                          marginBottom: String(titleMargin) + ea,
                        },
                      },
                      {
                        text: contents.descriptions.detail[index].description.join(" "),
                        style: {
                          display: "block",
                          position: "relative",
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textFileWeight),
                          color: colorChip.black,
                          lineHeight: String(descriptionLineHeight),
                          textAlign: "center",
                          width: String(94) + '%',
                        },
                      },
                      {
                        mode: "img",
                        attribute: {
                          src: ConsoleManualJs.binaryPath + "/back_mobile_" + String(index + 1 + contents.descriptions.list.length) + ".jpg"
                        },
                        style: {
                          display: "block",
                          position: "relative",
                          width: withOut(0, ea),
                          borderRadius: String(5) + "px",
                          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                          marginTop: String(firstMargin) + ea,
                        }
                      },
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          height: String(contents.descriptions.detail.length - 1 === index ? 0 : mobileLineMargin) + ea,
                          borderBottom: contents.descriptions.detail.length - 1 === index ? "" : "1px dashed " + colorChip.gray4,
                          width: withOut(0, ea),
                          marginBottom: contents.descriptions.detail.length - 1 === index ? "" : String(mobileLineMargin) + ea,
                        }
                      },
                    ]
                  }).flat(),
                ]
              },
            ]
          }
        }
      }
    });

  }

}

ConsoleManualJs.prototype.insertMovieStartBox = function () {
  const instance = this;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray, findByAttribute, setQueue, downloadFile, zeroAddition } = GeneralJs;
  let margin;
  let paddingTop;
  let whiteBottomMargin;
  let bottomMargin;
  let whiteBlock, whiteTong;
  let grayTong;
  let innerMargin;
  let mobileVisualPaddingValue;
  let veryBigSize;
  let veryBigWeight;
  let firstWidth;
  let veryBigTextTop;
  let textSize;
  let textWeight;
  let textFileWeight;
  let textTextTop;
  let contents;
  let firstMargin;
  let numberSize, numberWeight;
  let titleMargin;
  let descriptionLineHeight;
  let listImageHeight;
  let imageVisualPaddingTop;
  let imageVisualPaddingBottom;
  let detailImageHeight0, detailImageHeight1;
  let detailBlockHeight;
  let mobileLineMargin;
  let numberMargin;
  let titleLineTop;
  let whitePaddingRight;
  let titleMarginBottom;
  let videoWidth, videoHeight;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 50, 50, 42, 39, 6 %%>;

  whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;

  veryBigSize = <%% 24, 22, 20, 18, 3.7 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  veryBigTextTop = <%% -1, -1, -2, -1, -1 %%>;

  innerMargin = <%% 0, 0, 0, 0, 1 %%>;

  textTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), -0.3 %%>;

  textSize = <%% 14, 13, 12, 11, 3.2 %%>;
  textWeight = <%% 700, 700, 700, 700, 700 %%>;
  textFileWeight = <%% 400, 400, 400, 400, 400 %%>;

  firstWidth = <%% 350, 300, 260, 174, 300 %%>;
  firstMargin = <%% 36, 36, 28, 22, 7.2 %%>;

  numberSize = <%% 16, 16, 14, 12, 3.3 %%>;
  numberWeight = <%% 500, 500, 500, 500, 500 %%>;

  titleMargin = <%% 8, 8, 4, 4, 1.5 %%>;

  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  listImageHeight = <%% 1234, 1385, 1300, 1120, 1234 %%>;

  imageVisualPaddingTop = <%% 4, 4, 4, 4, 0.5 %%>;
  imageVisualPaddingBottom = <%% 10, 10, 10, 10, 2 %%>;

  mobileVisualPaddingValue = 0.2;

  detailImageHeight0 = <%% 770, 1060, 920, 810, 770 %%>;
  detailImageHeight1 = <%% 1500, 1880, 1880, 1610, 1500 %%>;

  detailBlockHeight = <%% 188, 205, 174, 151, 188 %%>;

  mobileLineMargin = 14;
  numberMargin = 0.3;

  titleLineTop = <%% 16, 15, 13, 12, 2.1 %%>;
  whitePaddingRight = <%% 16, 16, 14, 12, 2 %%>;
  titleMarginBottom = <%% 25, 22, 20, 16, 0 %%>;

  videoWidth = <%% 1290, 940, 806, 642, 74 %%>;
  videoHeight = <%% 713, 520, 446, 355, 41 %%>;

  contents = [
    {
      title: "프로젝트 관리",
      link: "https://www.youtube.com/embed/aNuT55SV7As",
    },
    {
      title: "프로젝트 상세",
      link: "https://www.youtube.com/embed/OtfQZox1ISk",
    },
    {
      title: "파일 업로드",
      link: "https://www.youtube.com/embed/qNsY8iE4yyA",
    },
    {
      title: "일정표 관리",
      link: "https://www.youtube.com/embed/YNfubLunQyc",
    },
  ];

  for (let i = 0; i < contents.length; i++) {
    createNode({
      mother: baseTong,
      style: {
        position: "relative",
        borderRadius: String(desktop ? 8 : 1) + ea,
        width: String(100) + '%',
        background: colorChip.white,
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(whiteBottomMargin) + ea,
        marginBottom: String(bottomMargin) + ea,
        boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      },
      child: {
        style: {
          display: "block",
          position: "relative",
          width: withOut(margin * 2, ea),
          height: String(100) + '%',
          marginLeft: String(margin) + ea,
        },
        child: {
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(innerMargin) + ea,
            paddingBottom: String(desktop ? innerMargin : 0) + ea,
            paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
            paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
            width: withOut(innerMargin * 2, ea),
            background: colorChip.white,
            borderRadius: String(8) + "px",
          },
          child: {
            style: {
              display: desktop ? "flex" : "block",
              width: withOut(0),
              flexDirection: desktop ? "column" : "",
              justifyContent: desktop ? "start" : "",
              alignItems: desktop ? "start" : "",
            },
            children: [
              {
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  marginBottom: desktop ? "" : String(3) + ea,
                  flexDirection: "row",
                },
                children: [
                  {
                    style: {
                      display: "block",
                      position: "absolute",
                      top: String(0),
                      height: String(titleLineTop) + ea,
                      left: String(0),
                      width: withOut(0, ea),
                      borderBottom: "1px dashed " + colorChip.gray3,
                    }
                  },
                  {
                    text: "콘솔 설명 영상 :&nbsp;&nbsp;<b%" + contents[i].title + "%b>",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      fontSize: String(veryBigSize) + ea,
                      fontWeight: String(veryBigWeight),
                      color: colorChip.black,
                      lineHeight: String(1.4),
                      textAlign: "left",
                      marginBottom: String(titleMarginBottom) + ea,
                      top: String(textTextTop) + ea,
                      backgroundColor: colorChip.white,
                      paddingRight: String(whitePaddingRight) + ea,
                    },
                    bold: {
                      fontSize: String(veryBigSize) + ea,
                      fontWeight: String(200),
                      color: colorChip.green,
                      lineHeight: String(1.4),
                    }
                  },
                ]
              },
              {
                text: `<iframe src="${contents[i].link}" style="border-radius:5px;width:${String(videoWidth) + ea};height:${String(videoHeight) + ea}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  paddingTop: String(imageVisualPaddingTop) + ea,
                  paddingBottom: String(imageVisualPaddingBottom) + ea,
                },
              }
            ]
          }
        }
      }
    });
  }

}

ConsoleManualJs.prototype.insertDescriptionBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, selfHref, scrollTo } = GeneralJs;
  let margin;
  let paddingTop;
  let whiteBottomMargin;
  let titleFontSize;
  let bottomMargin;
  let whiteBlock;
  let grayTong;
  let arrowBetween;
  let contents;
  let innerMargin;
  let arrowWidth, arrowHeight;
  let textSize, textWeight;
  let mobileVisualPaddingValue;
  let button, buttons;
  let whiteTong;
  let veryBigSize;
  let veryBigWeight;
  let textTextTop;
  let firstWidth;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 55, 55, 47, 39, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 0, 0, 0, 0, 1 %%>;

  arrowBetween = <%% 5, 5, 5, 3, 1 %%>;
  arrowWidth = <%% 214, 160, 138, 109, 27 %%>;
  arrowHeight = <%% 100, 90, 80, 60, 11 %%>;

  textSize = <%% 15, 14, 13, 12, 3.2 %%>;
  textWeight = <%% 400, 400, 400, 400, 400 %%>;

  veryBigSize = <%% 24, 22, 20, 18, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  textTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), -0.3 %%>;

  firstWidth = <%% 348, 300, 260, 174, 34 %%>;

  mobileVisualPaddingValue = 0.2;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(whiteBottomMargin) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  grayTong = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(innerMargin) + ea,
      paddingBottom: String(desktop ? innerMargin : innerMargin - arrowBetween) + ea,
      paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
      paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
      width: withOut(innerMargin * 2, ea),
      background: colorChip.white,
      borderRadius: String(8) + "px",
    }
  });

  createNode({
    mother: grayTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      width: desktop ? String(firstWidth) + ea : withOut(0, ea),
      flexDirection: "column",
      verticalAlign: "top",
    },
    children: [
      {
        text: [
          "콘솔 사용 설명서"
        ].join(desktop ? "\n" : " "),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(veryBigSize) + ea,
          fontWeight: String(veryBigWeight),
          color: colorChip.black,
          lineHeight: String(1.4),
          textAlign: desktop ? "left" : "center",
          marginTop: desktop ? "" : String(2.8) + ea,
          marginBottom: desktop ? "" : String(5) + ea,
          top: String(textTextTop) + ea,
        },
      },
    ]
  })

  createNode({
    mother: grayTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      width: desktop ? withOut(firstWidth, ea) : withOut(0, ea),
      flexDirection: "column",
      verticalAlign: "top",
    },
    children: [
      {
        text: [
          "디자이너 콘솔을 이용하시면 더 편리하고 직관적으로 프로젝트를 관리하고 공유할 수 있습니다. 1) 고객님께 <u%콘솔을 활용하여 프로젝트 진행 상황과 파일을 공유%u>할 수 있으며, 2) 홈리에종으로의 보고 역시 <u%별도로 연락할 필요 없이 콘솔 내에서 실시간으로 상황 공유가 가능%u>합니다. 이 콘솔은 디자이너님과 고객님, 그리고 홈리에종 간의 의사소통을 더욱 원활하게 할 목적으로 만들어졌으니 적극적으로 활용해 주시기 바랍니다."
        ].join("\n\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.black,
          lineHeight: String(1.7),
          textAlign: "left",
          marginBottom: desktop ? "" : String(3) + ea,
          top: String(textTextTop) + ea,
        },
        bold: {
          fontSize: String(textSize) + ea,
          fontWeight: String(800),
          color: colorChip.green,
          lineHeight: String(1.7),
        },
        under: {
          fontSize: String(textSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
          lineHeight: String(1.7),
        }
      },
    ]
  });

}

ConsoleManualJs.prototype.insertBasicIntroductionBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, selfHref, scrollTo } = GeneralJs;
  let margin;
  let paddingTop;
  let whiteBottomMargin;
  let titleFontSize;
  let bottomMargin;
  let whiteBlock;
  let grayTong;
  let arrowBetween;
  let contents;
  let innerMargin;
  let arrowWidth, arrowHeight;
  let textSize, textWeight;
  let mobileVisualPaddingValue;
  let button, buttons;
  let whiteTong;
  let veryBigSize;
  let veryBigWeight;
  let textTextTop;
  let firstWidth;
  let contentsArea;
  let videoWidth;
  let videoHeight;
  let subTitleSize;
  let imageMarginTop, imageMarginBottom;
  let blankHeight;
  let createBlockVideo;
  let createBlockImage;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 55, 55, 47, 39, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 0, 0, 0, 0, 1 %%>;

  arrowBetween = <%% 5, 5, 5, 3, 1 %%>;
  arrowWidth = <%% 214, 160, 138, 109, 27 %%>;
  arrowHeight = <%% 100, 90, 80, 60, 11 %%>;

  subTitleSize = <%% 16, 15, 14, 13, 3.6 %%>;
  textSize = <%% 15, 14, 13, 12, 3.2 %%>;
  textWeight = <%% 400, 400, 400, 400, 400 %%>;

  veryBigSize = <%% 24, 22, 20, 18, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  textTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), -0.3 %%>;

  firstWidth = <%% 348, 300, 260, 174, 34 %%>;

  videoWidth = <%% 942, 640, 546, 468, 74 %%>;
  videoHeight = <%% 531, 361, 308, 264, 41 %%>;

  imageMarginTop = <%% 20, 16, 14, 12, 0.5 %%>;
  imageMarginBottom = <%% 36, 32, 28, 24, 5 %%>;

  blankHeight = <%% 80, 70, 60, 50, 9 %%>;

  mobileVisualPaddingValue = 0.2;

  contentsArea = {};

  createBlockVideo = (title, link, description) => {
    createNode({
      mother: contentsArea,
      text: title,
      style: {
        display: "block",
        position: "relative",
        fontSize: String(subTitleSize) + ea,
        fontWeight: String(800),
        color: colorChip.black,
        lineHeight: String(1.7),
        textAlign: "left",
        marginBottom: desktop ? "" : String(3) + ea,
        top: String(textTextTop) + ea,
      },
      bold: {
        fontSize: String(textSize) + ea,
        fontWeight: String(800),
        color: colorChip.green,
        lineHeight: String(1.7),
      },
      under: {
        fontSize: String(textSize) + ea,
        fontWeight: String(800),
        color: colorChip.black,
        lineHeight: String(1.7),
      }
    });
    createNode({
      mother: contentsArea,
      text: `<iframe src="${link}" style="border-radius:5px;width:${String(videoWidth) + ea};height:${String(videoHeight) + ea}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        marginTop: String(imageMarginTop) + ea,
        marginBottom: String(imageMarginBottom) + ea,
      },
    });
    createNode({
      mother: contentsArea,
      text: description.join("\n\n"),
      style: {
        display: "block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(textWeight),
        color: colorChip.black,
        lineHeight: String(1.7),
        textAlign: "left",
        marginBottom: desktop ? "" : String(3) + ea,
        top: String(textTextTop) + ea,
      },
      bold: {
        fontSize: String(textSize) + ea,
        fontWeight: String(800),
        color: colorChip.green,
        lineHeight: String(1.7),
      },
      under: {
        fontSize: String(textSize) + ea,
        fontWeight: String(800),
        color: colorChip.black,
        lineHeight: String(1.7),
      }
    });
    createNode({
      mother: contentsArea,
      style: {
        display: "block",
        width: withOut(0, ea),
        height: String(blankHeight) + ea,
        marginBottom: String(blankHeight + (mobile ? 4 : 0)) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
      }
    });
  }

  createBlockImage = (title, src, description, last = false) => {
    createNode({
      mother: contentsArea,
      text: title,
      style: {
        display: "block",
        position: "relative",
        fontSize: String(subTitleSize) + ea,
        fontWeight: String(800),
        color: colorChip.black,
        lineHeight: String(1.7),
        textAlign: "left",
        marginBottom: desktop ? "" : String(3) + ea,
        top: String(textTextTop) + ea,
      },
      bold: {
        fontSize: String(textSize) + ea,
        fontWeight: String(800),
        color: colorChip.green,
        lineHeight: String(1.7),
      },
      under: {
        fontSize: String(textSize) + ea,
        fontWeight: String(800),
        color: colorChip.black,
        lineHeight: String(1.7),
      }
    });
    createNode({
      mode: "img",
      attribute: {
        src
      },
      mother: contentsArea,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        marginTop: String(imageMarginTop) + ea,
        marginBottom: String(imageMarginBottom) + ea,
        borderRadius: String(5) + "px",
      },
    });
    createNode({
      mother: contentsArea,
      text: description.join("\n\n"),
      style: {
        display: "block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(textWeight),
        color: colorChip.black,
        lineHeight: String(1.7),
        textAlign: "left",
        marginBottom: desktop ? "" : String(3) + ea,
        top: String(textTextTop) + ea,
      },
      bold: {
        fontSize: String(textSize) + ea,
        fontWeight: String(800),
        color: colorChip.green,
        lineHeight: String(1.7),
      },
      under: {
        fontSize: String(textSize) + ea,
        fontWeight: String(800),
        color: colorChip.black,
        lineHeight: String(1.7),
      }
    });
    createNode({
      mother: contentsArea,
      style: {
        display: "block",
        width: withOut(0, ea),
        height: String((last && mobile) ? 2 : blankHeight) + ea,
        marginBottom: String(!last ? blankHeight + (mobile ? 4 : 0) : 0) + ea,
        borderBottom: !last ? "1px solid " + colorChip.gray3 : "",
      }
    });
  }

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(whiteBottomMargin) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  grayTong = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(innerMargin) + ea,
      paddingBottom: String(desktop ? innerMargin : innerMargin - arrowBetween) + ea,
      paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
      paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
      width: withOut(innerMargin * 2, ea),
      background: colorChip.white,
      borderRadius: String(8) + "px",
    }
  });

  createNode({
    mother: grayTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      width: desktop ? String(firstWidth) + ea : withOut(0, ea),
      flexDirection: "column",
      verticalAlign: "top",
    },
    children: [
      {
        text: [ "기본적인 사용법" ].join(desktop ? "\n" : " "),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(veryBigSize) + ea,
          fontWeight: String(veryBigWeight),
          color: colorChip.black,
          lineHeight: String(1.4),
          textAlign: desktop ? "left" : "center",
          marginTop: desktop ? "" : String(2.8) + ea,
          marginBottom: desktop ? "" : String(5) + ea,
          top: String(textTextTop) + ea,
        },
      },
    ]
  })

  contentsArea = createNode({
    mother: grayTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      width: desktop ? withOut(firstWidth, ea) : withOut(0, ea),
      flexDirection: "column",
      verticalAlign: "top",
    }
  });


  // 1
  createBlockVideo(
    "1. 진행중 프로젝트 파악하기",
    "https://www.youtube.com/embed/yNQCPYTcMbE",
    [
      `디자이너 콘솔을 처음 여시게 되면 보이는 화면에서, 프로젝트 바와 진행중 프로젝트, 완료된 프로젝트, 컨텐츠로 구성되어 있는 걸 보실 수 있습니다. 프로젝트 바와 진행중 프로젝트에는 홈리에종과 계약하신, 프로젝트가 리스트업 되어 있는 곳입니다. 프로젝트 바에서 각각의 항목을 눌러보시면 각 프로젝트의 상태를 체크할 수 있으며, 진행중 프로젝트에서 각각의 항목을 클릭하시면 해당 프로젝트의 상세 페이지로 가실 수 있습니다.`,
      `진행중 프로젝트 밑으로 오는 건 완료된 프로젝트 칸입니다. 하셨던 프로젝트들 중, 완료된 건들의 리스트로 컨텐츠가 발행된 건일 경우 활성화가 되어 있고, 그렇지 않을 경우 비활성화가 되어 있습니다. 활성화된 항목을 클릭해 보시면 컨텐츠와 관련된 여러 가지 설정을 하실 수 있게 되어 있습니다.`,
      `완료된 프로젝트 밑으로 오는 건 발행된 컨텐츠로 발행된 프로젝트가 홈리에종 웹에서 어떻게 보이는지 미리 볼 수 있는 칸입니다. 홈리에종 웹에서 디자이너의 탭의 실장님 섹션으로 가셨을 때와 같은 리스트를 보여주는 곳입니다.`,
    ]
  );

  createBlockVideo(
    "2. 프로젝트 상태 체크하기",
    "https://www.youtube.com/embed/58Okmp2swYg",
    [
      `진행중 프로젝트에서 현재 진행중인 건 하나를 클릭해 보시면, 프로젝트 상세 페이지로 오게 됩니다. 해당 프로젝트에 대한 디테일 정보와 여러 설정을 하실 수 있는 페이지로, 고객님의 현재 단계 프로젝트 파일, 상태, 기타 등등으로 이루어져 있습니다.`,
      `가장 먼저 보이는 것은 고객님의 현재 단계를 체크할 수 있는 칸입니다. 디자인, 시공, 구매, 세팅의 분류 아래에서 해당 단계를 클릭해 주시면 됩니다. 클릭을 하시면 이전 단계들이 모두 한꺼번에 선택이 되는데요, 여기서 이전 단계의 선택을 해제하고 싶으시다면 이 상태에서 해제하고자 하는 단계를 다시 클릭해주시면 됩니다. 그리고 각 단계마다 화살표를 클릭해보시면, 메모 추가와 함께 관련 기능을 이용하실 수 있습니다. 해당 단계를 체크해 주시고, 공유하기 버튼을 누르시게 되면 홈리에종에 자동적으로 해당 고객님이 어떤 상태인지 상세히 알릴 수 있습니다.`,
    ]
  );

  createBlockVideo(
    "3. 파일 업로드하고 수정하기",
    "https://www.youtube.com/embed/OFe7dM18mRI",
    [
      `다음으로 오는 것은 프로젝트 파일을 분류별로 업로드 및 아카이빙 할 수 있는 공간입니다. 각 주제별로 사진이나 파일을 업로드해 주시면 쉽게 관리하실 수 있으며, 공유하시는 것도 한 번에 하실 수 있으므로 적극적으로 활용을 부탁드립니다.`,
      `수정이나 삭제, 공유를 하는 방법은 먼저 데스크탑에선 해당 파일을 우클릭하시면 관련된 기능들이 나열되며 모바일에서는 파일들을 일단 터치하시면, 관련 기능들이 우측 하단에 리스트업이 됩니다. 이렇게 메모 수정, 고객님께 공유 등을 해주시면 됩니다!`,
    ]
  );

  createBlockVideo(
    "4. 프로젝트 일정표 작성하기",
    "https://www.youtube.com/embed/0Yf-T1GVUto",
    [
      `다음으로 해주셔야 할 것은 프로젝트의 일정표입니다. 프로젝트 상태 체크에서 버튼을 누르시면 나옵니다. 실장님께서는 각 항목의 순서 변경과, 날짜 입력을 통해 프로젝트의 대략적인 일정표를 기입하시면 됩니다. 수정하시는 방법은 각각의 항목을 누르시면 수정모드로 변하게 되는데, 이때 다시 입력을 해주시면 되고, 날짜 같은 경우는 날짜를 찍어주시면 됩니다. 블록을 삭제하시거나 추가하실 때에는 필요한 위치에 우클릭을 하시면 해당하는 항목이 나옵니다. 이 기능을 통해서 블록을 추가하시고 작성하시면 되고, 밑으로는 일정표를 수정하신 대로 캘린더가 표현된 것을 보실 수 있습니다.`,
      `프로젝트 파일 밑으로 오는 것은 기타 프로젝트 상태에 대한 여러 표기들입니다. 촬영비, 컨텐츠, 디자이너 글 관련 여러 상태를 보실 수 있고, 액션을 하실 수 있습니다. 디자이너 글 또한 이곳에서 업로드 해주시면 됩니다. 기타 기능이 모여 있는 곳으로 필요할 때 찾아 주셔서 해당 기능을 활용해 주시면 됩니다!`,
    ]
  );

  createBlockImage(
    "5. 디자이너 글 업로드하기",
    ConsoleManualJs.binaryPath + "/mc10.jpg",
    [
      `프로젝트 상세 페이지 하단에는 프로젝트에 대한 기타 설정을 할 수 있는 영역이 있습니다. 해당 영역에서는 디자이너 글 업로드와 촬영비 결제 등을 할 수 있습니다. 디자이너 글 업로드가 필요한 경우, 디자이너 글 업로드 버튼이 활성화됩니다. 해당 버튼을 누르면 디자이너 글 샘플을 다운로드하고 업로드 버튼이 표시됩니다. 이 버튼을 클릭하여 디자이너 글을 업로드할 수 있습니다. 디자이너 글은 워드나 한글, txt 파일로 작성할 수 있습니다. 디자이너 콘솔을 사용하여 디자이너 글을 업로드하면 홈리에종에 별도로 연락하지 않아도 되며, 업로드된 글을 확인하고 수정하는 기능도 제공됩니다. 실장님은 이 기능을 활용하여 디자이너 글을 업로드해주시기 바랍니다.`
    ]
  );

  createBlockImage(
    "6. 촬영비 결제하기",
    ConsoleManualJs.binaryPath + "/mc11.jpg",
    [
      `기타 설정에서는 해당 현장에 대한 촬영비를 결제할 수 있습니다. 촬영비는 카드 결제와 계좌 이체를 지원하며, 계좌 이체로 결제하실 경우 홈리에종의 계좌 번호를 알고 있더라도, 해당 프로젝트의 촬영비 결제를 위해 정상적인 안내 절차를 받으시고 계좌 이체를 부탁드립니다. 해당 기능을 이용하여 촬영비를 결제하면 홈리에종에 별도로 연락하지 않아도 즉시 어떤 현장의 촬영비가 결제되었는지 알 수 있기 때문에, 적극적으로 활용해주시기 바랍니다.`
    ]
  );

  createBlockImage(
    "7. 자신의 기본 정보 업데이트 하기",
    ConsoleManualJs.binaryPath + "/mc13.jpg",
    [
      `상단 네비게이터에서 "기본 관리"를 클릭하면, 실장님과 관련된 여러 기본 설정을 할 수 있는 페이지로 이동합니다. 해당 페이지에서는 기본 정보를 수정할 수 있으며, 이 정보는 고객님에게 추천할 때 매우 중요한 정보로 활용됩니다. 따라서 해당 정보를 정확하게 관리하시길 부탁드립니다. 일부 정보는 실장님이 직접 수정할 수 없도록 설정되어 있습니다. 이 경우에는 홈리에종과 협의한 후 수정이 가능합니다. 해당 정보를 수정하고자 하는 경우, 홈리에종에 직접 연락을 주시어 협의 후 수정 부탁드립니다.`
    ],
    true
  );

}

ConsoleManualJs.prototype.insertOperationBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, selfHref, scrollTo } = GeneralJs;
  let margin;
  let paddingTop;
  let whiteBottomMargin;
  let titleFontSize;
  let bottomMargin;
  let whiteBlock;
  let grayTong;
  let arrowBetween;
  let contents;
  let innerMargin;
  let arrowWidth, arrowHeight;
  let textSize, textWeight;
  let mobileVisualPaddingValue;
  let button, buttons;
  let whiteTong;
  let veryBigSize;
  let veryBigWeight;
  let textTextTop;
  let firstWidth;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 55, 55, 47, 39, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 0, 0, 0, 0, 1 %%>;

  arrowBetween = <%% 5, 5, 5, 3, 1 %%>;
  arrowWidth = <%% 214, 160, 138, 109, 27 %%>;
  arrowHeight = <%% 100, 90, 80, 60, 11 %%>;

  textSize = <%% 15, 14, 13, 12, 3.2 %%>;
  textWeight = <%% 400, 400, 400, 400, 400 %%>;

  veryBigSize = <%% 24, 22, 20, 18, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  textTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), -0.3 %%>;

  firstWidth = <%% 348, 300, 260, 174, 34 %%>;

  mobileVisualPaddingValue = 0.2;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(whiteBottomMargin) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  grayTong = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(innerMargin) + ea,
      paddingBottom: String(desktop ? innerMargin : innerMargin - arrowBetween) + ea,
      paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
      paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
      width: withOut(innerMargin * 2, ea),
      background: colorChip.white,
      borderRadius: String(8) + "px",
    }
  });

  createNode({
    mother: grayTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      width: desktop ? String(firstWidth) + ea : withOut(0, ea),
      flexDirection: "column",
      verticalAlign: "top",
    },
    children: [
      {
        text: [
          "디자이너 콘솔",
          "운영 안내",
        ].join(desktop ? "\n" : " "),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(veryBigSize) + ea,
          fontWeight: String(veryBigWeight),
          color: colorChip.black,
          lineHeight: String(1.4),
          textAlign: desktop ? "left" : "center",
          marginTop: desktop ? "" : String(2.8) + ea,
          marginBottom: desktop ? "" : String(5) + ea,
          top: String(textTextTop) + ea,
        },
      },
    ]
  })

  createNode({
    mother: grayTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      width: desktop ? withOut(firstWidth, ea) : withOut(0, ea),
      flexDirection: "column",
      verticalAlign: "top",
    },
    children: [
      {
        text: [
          `홈리에종은 2023년 4월 17일 월요일 이후부터 디자이너 콘솔의 사용을 전면 시작합니다. 매주 월요일마다 프로젝트 운영 상황의 업데이트를 요청하는 알림톡이 정기적으로 발송됩니다. 알림톡을 받은 후에는 디자이너 콘솔에 접속하여 현재 진행 중인 모든 프로젝트의 상태를 점검하고 체크해주세요. 그리고 상황에 맞게 고객님께 공유 알림톡을 발송해주세요.`,
          `앞으로도 계속해서 디자이너 콘솔을 업데이트할 예정이며, 고객님이 받는 서비스의 질적 향상과 디자이너님들의 편의를 제공하기 위해 노력하겠습니다. 업데이트가 이루어질 때마다 변경 사항과 관련된 안내 및 교육 자료를 디자이너님들께 전송하여 자세한 안내를 드릴 것입니다. 이를 통해 보다 상세하고 효율적인 사용법을 습득하실 수 있을 것입니다.`,
        ].join("\n\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.black,
          lineHeight: String(1.7),
          textAlign: "left",
          marginBottom: desktop ? "" : String(3) + ea,
          top: String(textTextTop) + ea,
        },
        bold: {
          fontSize: String(textSize) + ea,
          fontWeight: String(800),
          color: colorChip.green,
          lineHeight: String(1.7),
        },
        under: {
          fontSize: String(textSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
          lineHeight: String(1.7),
        }
      },
    ]
  });

}

ConsoleManualJs.prototype.insertButtonBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, downloadFile, selfHref } = GeneralJs;
  const buttonsClassName = "buttonsClassName";
  let margin;
  let paddingTop;
  let titleFontSize;
  let bottomMargin;
  let whiteBlock;
  let grayTong;
  let arrowBetween;
  let innerMargin;
  let arrowWidth, arrowHeight;
  let textTop;
  let textSize, textWeight;
  let textMarginLeft;
  let buttonHeight, buttonPadding;
  let buttonBetween;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 40, 40, 40, 40, 4 %%>;

  arrowBetween = <%% 5, 5, 5, 5, 4 %%>;
  arrowWidth = <%% 204, 203, 203, 203, 203 %%>;
  arrowHeight = <%% 100, 100, 100, 100, 100 %%>;

  textTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;
  textSize = <%% 17, 17, 15, 14, 2.5 %%>;
  textWeight = <%% 700, 700, 700, 700, 700 %%>;
  textMarginLeft = <%% 50, 50, 50, 50, 50 %%>;

  buttonPadding = <%% 20, 19, 18, 18, 2.1 %%>;
  buttonHeight = <%% 42, 42, 36, 32, 6.3 %%>;

  buttonBetween = <%% 6, 6, 5, 4, 0.5 %%>;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(paddingTop) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  grayTong = createNode({
    mother: whiteTong,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    }
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/provision.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "디자이너 가이드",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        window.alert("준비중인 기능입니다!");
        // let url;
        // url = "";
        // url += FRONTHOST;
        // url += "/designer/manual.php";
        // url += "?";
        // url += "desid=";
        // url += instance.designer.desid;
        // selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "디자인비 설명",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/partnership.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "파트너십 정보",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/provision.php";
        url += "?mode=contract&";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      // marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "계약 내역",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

ConsoleManualJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue } = GeneralJs;
  try {
    this.mother.setGeneralProperties(this);

    const getObj = returnGet();
    const { media } = this;
    const mobile = media[4];
    const desktop = !mobile;
    let desid, designers, designer;
    let socket;
    let wsLaunching;
    let wsOpenEvent;
    let wsMessageEvent;
    let wsCloseEvent;

    if (getObj.desid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    desid = getObj.desid;
    this.desid = desid;
    designers = await ajaxJson({ whereQuery: { desid: desid } }, SECONDHOST + "/getDesigners", { equal: true });
    if (designers.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ designer ] = designers;
    this.designer = designer;

    await this.mother.ghostDesignerLaunching({
      name: "consoleManual",
      designer: this.designer,
      base: {
        instance: this,
        binaryPath: ConsoleManualJs.binaryPath,
        subTitle: "",
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertDescriptionBox();
          instance.insertBasicIntroductionBox();
          instance.insertManualStartBox();
          instance.insertButtonBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ConsoleManualJs.launching.ghostDesignerLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);
    
  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ConsoleManualJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
