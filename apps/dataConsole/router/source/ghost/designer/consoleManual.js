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
      "return ('콘솔 메뉴얼 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('콘솔 메뉴얼 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "consoleManual",
  "hangul": "콘솔 메뉴얼",
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

  titleWording = "콘솔 메뉴얼";
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 50, 50, 42, 39, 6 %%>;

  whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;

  veryBigSize = <%% 24, 22, 20, 16, 4.4 %%>;
  veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
  veryBigTextTop = <%% -1, -1, -2, -1, -1 %%>;

  innerMargin = <%% 0, 0, 0, 0, 1 %%>;

  textTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

  textSize = <%% 14, 14, 13, 12, 3.2 %%>;
  textWeight = <%% 700, 700, 700, 700, 700 %%>;
  textFileWeight = <%% 400, 400, 400, 400, 400 %%>;

  firstWidth = <%% 350, 230, 213, 134, 300 %%>;
  firstMargin = <%% 36, 36, 32, 20, 10 %%>;

  numberSize = <%% 16, 16, 16, 16, 16 %%>;
  numberWeight = <%% 500, 500, 500, 500, 500 %%>;

  titleMargin = <%% 8, 8, 8, 8, 8 %%>;

  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  listImageHeight = <%% 1234, 1234, 1234, 1234, 1234 %%>;

  imageVisualPaddingTop = <%% 4, 4, 4, 4, 4 %%>;
  imageVisualPaddingBottom = <%% 10, 10, 10, 10, 10 %%>;

  mobileVisualPaddingValue = 0.2;

  detailImageHeight0 = <%% 770, 770, 770, 770, 770 %%>;
  detailImageHeight1 = <%% 1500, 1500, 1500, 1500, 1500 %%>;

  contents = {
    title: [
      "디자이너 콘솔",
      "이용 안내",
    ],
    description: [
      "디자이너 콘솔에 대해 설명드립니다.",
      "옆모습은 디자이너 콘솔에 들어가셨을 때",
      "가장 처음 보게 되는 화면입니다.",
    ],
    margin: <&& 110 | 110 | 110 | 110 | 11 &&>,
    images: {
      list: [
        ConsoleManualJs.binaryPath + "/back_desktop_0.jpg"
      ],
      detail: [
        ConsoleManualJs.binaryPath + "/back_desktop_2.jpg",
        ConsoleManualJs.binaryPath + "/back_desktop_1.jpg",
      ],
    },
    descriptions: {
      list: [
        {
          title: "진행중 프로젝트",
          description: [
            "먼저, 디자이너 콘솔은 진행중 프로젝트로",
            "시작합니다. 홈리에종과 계약하신 모든 프로젝트가",
            "리스트업이 되어 있으며, 진행중 프로젝트만",
            "활성화된 상태로 보실 수 있게 되어 있습니다.",
          ],
          margin: <&& 104 | 104 | 104 | 96 | 11 &&>,
        },
        {
          title: "발행된 프로젝트",
          description: [
            "진행중 프로젝트 다음으로 나오는 것은 발행된",
            "프로젝트들로 홈리에종 웹에 게시된 건들의",
            "리스트입니다. 각 항목을 클릭해 보시면 컨텐츠와",
            "관련된 설정을 하실 수 있게 되어 있습니다.",
          ],
          margin: <&& 52 | 52 | 52 | 52 | 11 &&>,
        },
        {
          title: "발행된 컨텐츠",
          description: [
            "발행된 프로젝트가 홈리에종 웹에서 어떻게",
            "보이는지 미리 볼 수 있는 칸으로 홈리에종 웹의",
            "디자이너 탭의 실장님 섹션으로 가셨을 때와",
            "같은 리스트를 보여주고 있습니다. ",
          ],
          margin: <&& 125 | 125 | 125 | 125 | 11 &&>,
        },
      ],
      detail: [
        {
          title: "고객님의 현재 단계",
          description: [
            "프로젝트 상세에 들어와 보시면 가장 먼저",
            "보이는 것은 고객님의 현재 단계를 체크하는",
            "란입니다. 디자인 / 시공 / 구매 / 세팅의 ",
            "분류 아래 해당 단계를 클릭해 주시면 됩니다.",
          ],
          margin: <&& 148 | 148 | 148 | 148 | 11 &&>,
        },
        {
          title: "프로젝트 파일",
          description: [
            "밑으로 오는 것은 프로젝트에서 필요한 파일을",
            "아카이빙 할 수 있는 공간입니다. 각 주제별로",
            "업로드해주시면 쉽게 관리하실 수 있으며,",
            "공유 또한 한 번에 이루어질 수 있습니다.",
          ],
          margin: <&& 46 | 46 | 46 | 46 | 11 &&>,
        },
        {
          title: "프로젝트 파일",
          description: [
            "파일을 올리시고, 메모를 남기신 뒤, 각 파일을",
            "클릭하시면 수정 / 삭제 / 공유와 같은 여러",
            "액션을 하실 수 있으며 고객 공유 또한 간편하게",
            "하실 수 있으므로 적극적 이용 부탁드립니다.",
          ],
          margin: <&& 9 | 9 | 9 | 9 | 11 &&>,
        },
        {
          title: "프로젝트 일정표 기입",
          description: [
            "프로젝트의 일정표입니다. 계약서상 시작일을",
            "기준으로 미리 세팅되어 있으며 실장님께서는",
            "각 항목의 순서 변경과 날짜 수정을 통해",
            "프로젝트의 일정을 기입해 주시면 됩니다.",
          ],
          margin: <&& 236 | 236 | 236 | 236 | 11 &&>,
        },
        {
          title: "프로젝트 일정표 캘린더",
          description: [
            "프로젝트 일정표를 수정하시게 되면 자동으로",
            "캘린더에도 표시가 되며, 이는 고객님께",
            "공유될 예정이므로 꼭 일정표를 작성해 주셔서",
            "원활한 공유가 될 수 있도록 부탁드립니다.",
          ],
          margin: <&& 225 | 225 | 225 | 225 | 11 &&>,
        },
        {
          title: "프로젝트 상태",
          description: [
            "기타 프로젝트 상태에 대한 표기입니다.",
            "촬영비 관련, 컨텐츠 관련, 디자이너 글 관련",
            "여러 액션을 하실 수 있습니다. 기타 기능이 모여",
            "있는 곳이므로 필요할 때 찾아 주시면 됩니다.",
          ],
          margin: <&& 112 | 112 | 112 | 112 | 11 &&>,
        },
      ],
    }
  }

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
                    height: String(188) + ea,
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
          instance.insertManualStartBox();
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
