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
      "return ('전체 일정 안내 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('프로젝트의 전체 일정 안내 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "wholeSchedule",
  "route": [
    "schedule",
    "WS"
  ]
} %/%/g

const WholeScheduleJs = function () {
  this.mother = new GeneralJs();
  this.client = null;
  this.initDateClassName = {
    start: "initDateClassStart",
    end: "initDateClassEnd"
  };
}

WholeScheduleJs.binaryPath = "/middle/schedule";

WholeScheduleJs.prototype.scheduleWordings = function (liteMode = false) {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const colon = "&nbsp;" + ":" + "&nbsp;&nbsp;&nbsp;";
  class StyleCurationWordings {
    constructor() {
      this.wordings = {};
      this.wordings.init = {
        title: [
          "전체 일정 안내",
        ],
        subTitle: [
          "현장 미팅 시간",
          "현장 미팅 주소"
        ],
        contents: [
          "앞으로 진행하게 될 <b%홈스타일링의 전체 일정%b>을 보고해드립니다.",
          "디자이너가 전체적으로 계획을 세운 아래 일정은",
          "향후 <b%상황과 변수에 따라 조정될 수%b> 있습니다.",
        ],
        image: [
          "/init0.jpg",
          "/init1.jpg",
          "/init2.jpg",
        ]
      };

      this.wordings.schedule = {};
      this.wordings.schedule.title = [ "일정표" ];
      this.wordings.schedule.start = new Date(2021, 9, 10);
      this.wordings.schedule.matrix = [
        [ "현장과 니즈를 바탕으로 한 디자인 컨셉 논의", "도면 작업 기간" ],
        [ "디자인 및 3D 작업 기간" ],
        [ "디자인 작업 기간", "1차 제안 문서 제공 (9월 23일)" ],
        [ "디자인 수정 기간", "수정 제안 문서 제공" ],
        [ "디자인 수정 기간", "디자인 제안 확정" ],
        [ "시공 리스트 정리", "견적 수집 및 비교", "시공사 선택 및 공정표 요청" ],
        [ "철거 : 철거 및 폐기물 수거", "전기 : 작업선, 작업등 설치" ],
        [ "설비 : 바닥 배수관 시공, 방수 작업 및 양생" ],
        [ "전기 : 천장, 주방, 조명, 콘센트 위치에 배관 작업" ],
        [ "목공 : 칸막이 및 가벽 공사", "금속 : 샷시 공사" ],
        [ "목공 : 붙박이 가구 제작 및 설치", "목공 : 선반 및 수잡장 제작 및 설치", "목공 : 싱크대 및 테이블 제작" ],
        [ "도장 : 목공사와 금속 공사할 곳에 페인트칠" ],
        [ "타일 : 싱크대 벽 부분 타일 공사", "타일 : 주방 바닥 부분 타일 공사" ],
        [ "전기 : 목공사를 한 곳에 콘센트와 조명 연결", "금속 : 샷시에 유리 설치 및 실리콘 공사" ],
        [ "마감 : 전체적인 마감 공사 및 필름 설치" ],
        [ "공간별 구매 리스트 작성", "구매 리스트 공유", "입주 청소 컨택" ],
        [ "제품 구매", "입주 청소", "이사 준비", "패브릭 제작" ],
        [ "제품 세팅 및 설치" ],
        [ "제품 세팅 및 설치" ],
        [ "제품 세팅 및 설치" ],
        [ "마무리 점검", "촬영 및 인터뷰" ],
      ];

      this.wordings.check = {};
      this.wordings.check.title = [ "체크리스트" ];
      this.wordings.check.matrix = [
        {
          title: "기본적인 순서",
          contents: [
            "<u%6가지 과정%u>" + colon + "인테리어의 기본적인 순서는 1 <b%실측%b>, 2 <b%디자인(설계)%b>, 3 <b%견적%b>, 4 <b%시공(제작)%b>, 5 <b%구매%b>, 6 <b%세팅%b> 으로 이루어집니다. <b%누락되거나 순서가 뒤바뀐 경우, 문제가 발생%b>할 수 있습니다.",
          ],
        },
        {
          title: "디자인 일정",
          contents: [
            "<u%1차 제안%u>" + colon + "디자이너는 현장 상태와 예산을 고려해서 <b%컨셉을 잡고 디자인을 진행하여 도면 또는 디자인 시안의 형태로 어떻게 집을 만들지 제안%b>하게 됩니다. 페이퍼 워크의 형태는 디자이너마다 다를 수 있습니다.",
            "<u%수정 제안%u>" + colon + "디자인 제안은 <b%보통 2~3회 정도 수정을 거치며 고객님과 의견을 조율%b>해 완성해 나아갑니다. 일정에는 디자인 수정에 대한 시간적 고려가 반영되어 있어야 합니다.",
          ],
        },
        {
          title: "견적 일정",
          contents: [
            "<u%시공사 선택%u>" + colon + "디자이너 시공사 또는 홈리에종 시공사로부터 <b%견적서를 받고 비교하여 시공사를 선택할 수 있는 과정%b>이 있습니다. 여러 업체에서 견적을 많이 받을수록 일정 기간이 늘어날 수 있습니다.",
            "<u%견적 수정%u>" + colon + "시공사 선택 후, 견적을 받고 견적을 수정할 수 있는 과정입니다. 공사가 시작된 후 공사 내역이 생기거나 수정될 시 추가 비용이 발생될 수 있기 때문에, <b%누락된 공사 항목은 없는지 꼼꼼하게 확인해야 하는 단계%b>입니다.",
          ],
        },
        {
          title: "시공 일정",
          contents: [
            "<u%공정표 제공%u>" + colon + "시공이 <b%시작되면 시공사가 공정표를 제공%b>합니다. 공정표는 일반적으로 철거 -> 전기, 설비 -> 목공 -> 도장 -> 타일 -> 금속 -> 마감 순으로 되어 있습니다. 현장 상황에 따라 구체적인 순서는 달라질 수 있습니다.",
            "<u%추가 공사 방지%u>" + colon + "견적대로 진행하는 것이 중요하며, <b%부득이하게 수정 또는 추가 요청이 있을 경우, 공정상 언제 요청하는지에 따라 비용과 시간이 크게 늘어날 수%b> 있습니다.",
          ],
        },
        {
          title: "구매 일정",
          contents: [
            "<u%리스트 제공%u>" + colon + "입주 청소가 끝나는 타이밍에 맞춰 제품이 올 수 있도록 디자이너는 <b%구체적인 제품과 스펙과 구매처(링크)가 적혀 있는 리스트를 제공%b>합니다. 구매 대행은 진행해드리지 않으며, 직접 구입해주시면 됩니다.",
            "<u%배송 고려%u>" + colon + "구매 일정에서 가장 중요한 것은 배송에 대한 고려입니다. 제품마다 배송 일자가 모두 다르고 <b%변수도 많기 때문에 일정의 여유를 두고 구매를 진행%b>하시는 것이 중요합니다.",
          ],
        },
        {
          title: "세팅 일정",
          contents: [
            "<u%세팅 가이드%u>" + colon + "디자이너는 가구와 제품의 <b%배치도를 통해 어떤 것을 어디에 둘 지에 대한 구체적인 가이드를 제공%b>합니다. 디자이너가 직접 조립 및 설치를 도와드리지는 않습니다.",
            "<u%촬영 조율%u>" + colon + "구매와 세팅이 모두 완료되면 홈리에종 통해 촬영 일자를 잡게 되며, 촬영 일자에 맞춰 촬영과 인터뷰를 진행하게 됩니다.",
          ],
        },
      ];

    }

    get initWordings() {
      return this.wordings.init;
    }

    get scheduleWordings() {
      return this.wordings.schedule;
    }

    get checkWordings() {
      return this.wordings.check;
    }

  }
  return new StyleCurationWordings();
}

WholeScheduleJs.prototype.insertInitBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, project, projectHistory, requestNumber, ea, baseTong, media, initDateClassName } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  let whiteBlock, whiteTong;
  let blockHeight, bottomMargin;
  let margin;
  let titleFontSize, titleFontWeight;
  let firstBlock, secondBlock, thirdBlock;
  let firstBlockWidth;
  let initWordingSize;
  let lineHeight;
  let wordings, initPhotos;
  let titlePadding;
  let contentsPadding;
  let titleHeight;
  let secondBlockWidth, secondBlockMargin;
  let initTitleMarginTop;
  let titleTextTop;
  let pictureBetweenMargin;
  let pictureNumber;
  let picturePaddingTop;
  let dateRangeWidth;
  let dateRangeMarginTop;
  let dateRangeSize;
  let dateRangeLineTop;
  let dateRangeIndent;
  let initNumberBottom;
  let initNumberSize;
  let dateRangeBetween;
  let pictureMobileHeight;

  pictureNumber = 3;

  blockHeight = <%% 400, 380, 367, 260, 424 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;

  titleFontSize = <%% 29, 28.5, 27.5, 23, 5.7 %%>;
  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  titlePadding = <%% 5, 2, 1, 0, 0 %%>;
  contentsPadding = titlePadding + 1;
  titleHeight = <%% 38, 38, 38, 38, 10 %%>;

  picturePaddingTop = <%% 4, 3, 3, 2, 0 %%>;
  pictureBetweenMargin = <%% 10, 6, 5, 4, 1 %%>;
  pictureMobileHeight = 25;

  secondBlockWidth = <%% 320, 240, 225, 160, 33 %%>;
  secondBlockMargin = <%% 50, 45, 40, 39, 2.5 %%>;

  initWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  initTitleMarginTop = <%% 18, 18, 12, 28, 2.5 %%>;

  dateRangeWidth = <%% 200, 190, 180, 160, 20 %%>;
  dateRangeMarginTop = <%% (isMac() ? 46 : 48), 62, 44, 48, 5.5 %%>;
  dateRangeSize = <%% 28, 27, 24, 22, 5 %%>;
  dateRangeLineTop = <%% 19, 18, 16, 15, 3.6 %%>;
  dateRangeIndent = <%% 10, 10, 8, 6, 1.4 %%>;
  dateRangeBetween = <%% 3, 3, 3, 3, 3 %%>;

  initNumberBottom = <%% -3, -3, -2, -1, 0 %%>;
  initNumberSize = <%% 18, 16, 15, 12, 4 %%>;

  wordings = this.wordings.initWordings;
  initPhotos = this.wordings.initWordings.image;

  titleTextTop = isMac() ? 0 : 4;

  lineHeight = 1.6;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: desktop ? String(blockHeight - (margin * 2)) + ea : "auto",
      background: colorChip.white,
      paddingTop: String(desktop ? margin : 9) + ea,
      paddingBottom: String(desktop ? margin : 10.5) + ea,
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

  [ firstBlock, secondBlock ] = createNodes([
    {
      mother: whiteTong,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        width: desktop ? String(secondBlockWidth) + ea : String(100) + '%',
        height: desktop ? String(100) + '%' : '',
        verticalAlign: "top",
        textAlign: desktop ? "" : "center",
      },
      children: [
        {
          text: wordings.title.join(" "),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(titleFontSize) + ea,
            fontWeight: String(titleFontWeight),
            fontFamily: "sandoll",
            paddingLeft: desktop ? String(titlePadding) + ea : "",
            height: String(titleHeight) + ea,
            background: colorChip.white,
            wordSpacing: String(-2) + "px",
            color: colorChip.black,
            top: desktop ? String(titleTextTop) + ea : "",
            textAlign: desktop ? "" : "center",
          },
          bold: {
            fontSize: String(titleFontSize) + ea,
            color: colorChip.black,
          }
        },
        {
          style: {
            display: !media[3] ? "block" : "none",
            position: "relative",
            width: desktop ? String(dateRangeWidth) + ea : String(100) + '%',
            marginTop: String(dateRangeMarginTop) + ea,
            paddingLeft: desktop ? String(contentsPadding) + ea : "",
          },
          children: [
            {
              style: {
                display: desktop ? "block" : "none",
                position: "relative",
                textAlign: "left",
              },
              children: [
                {
                  text: "2021. 08. 16",
                  class: [ initDateClassName.start ],
                  style: {
                    display: "inline-block",
                    fontSize: String(dateRangeSize) + ea,
                    fontWeight: String(200),
                    fontFamily: "graphik",
                    color: colorChip.green,
                  }
                }
              ]
            },
            {
              style: {
                display: desktop ? "block" : "none",
                position: "relative",
                textAlign: "right",
                marginTop: String(0) + ea,
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(100) + '%',
                    top: String(0),
                    left: String(0),
                    height: String(dateRangeLineTop) + ea,
                    borderBottom: "1px solid " + colorChip.whiteGreen,
                  }
                },
                {
                  text: "2021. 09. 16",
                  class: [ initDateClassName.end ],
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(dateRangeSize) + ea,
                    fontWeight: String(200),
                    fontFamily: "graphik",
                    color: colorChip.green,
                    background: colorChip.white,
                    paddingLeft: String(dateRangeIndent) + ea,
                  }
                }
              ]
            },
            {
              style: {
                display: mobile ? "block" : "none",
                position: "relative",
                textAlign: "center",
                marginTop: String(0) + ea,
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(50) + '%',
                    top: String(0),
                    left: String(25) + '%',
                    height: String(dateRangeLineTop) + ea,
                    borderBottom: "1px solid " + colorChip.whiteGreen,
                  }
                },
                {
                  text: "2021. 08. 16",
                  class: [ initDateClassName.start ],
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(dateRangeSize) + ea,
                    fontWeight: String(200),
                    fontFamily: "graphik",
                    color: colorChip.green,
                    background: colorChip.white,
                    paddingRight: String(dateRangeIndent) + ea,
                    marginRight: String(dateRangeBetween) + ea,
                  }
                },
                {
                  text: "2021. 09. 16",
                  class: [ initDateClassName.end ],
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(dateRangeSize) + ea,
                    fontWeight: String(200),
                    fontFamily: "graphik",
                    color: colorChip.green,
                    background: colorChip.white,
                    paddingLeft: String(dateRangeIndent) + ea,
                  }
                }
              ]
            }
          ]
        },
        {
          text: wordings.contents.join(" "),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            lineHeight: String(1.6),
            marginTop: desktop ? String(initTitleMarginTop) + ea : String(2.5) + ea,
            paddingLeft: String(contentsPadding) + ea,
            width: desktop ? "" : withOut(contentsPadding * 2, ea),
          },
          bold: {
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(600),
            color: colorChip.black
          }
        },
        {
          text: String(0),
          style: {
            display: (media[0] || media[2] || media[3]) ? "block" : "none",
            position: "absolute",
            bottom: String(initNumberBottom) + ea,
            left: String(contentsPadding) + ea,
            fontSize: String(initNumberSize) + ea,
            fontWeight: String(200),
            fontFamily: "graphik",
            color: colorChip.gray4,
          }
        }
      ]
    },
    {
      mother: whiteTong,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        width: desktop ? withOut(secondBlockWidth + secondBlockMargin, ea) : String(100) + '%',
        verticalAlign: "top",
        marginLeft: desktop ? String(secondBlockMargin) + ea : "",
        paddingTop: String(picturePaddingTop) + ea,
        height: desktop ? withOut(picturePaddingTop, ea) : String(pictureMobileHeight) + ea,
        marginTop: desktop ? "" : String(2) + ea,
      }
    }
  ]);

  if (mobile) {
    whiteTong.appendChild(firstBlock);
    whiteTong.insertBefore(firstBlock.firstChild, whiteTong.firstChild);
  }

  for (let i = 0; i < pictureNumber; i++) {
    createNode({
      mother: secondBlock,
      style: {
        display: "inline-flex",
        position: "relative",
        width: "calc(calc(100% - " + String(pictureBetweenMargin * (pictureNumber - 1)) + ea + ") / " + String(pictureNumber) + ")",
        height: String(100) + '%',
        background: colorChip.gray3,
        borderRadius: String(desktop ? 8 : 2) + "px",
        marginRight: String(i !== pictureNumber - 1 ? pictureBetweenMargin : 0) + ea,
        overflow: "hidden",
        verticalAlign: "top",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          mode: "img",
          attribute: {
            src: WholeScheduleJs.binaryPath + initPhotos[i],
          },
          style: {
            display: "block",
            height: !(media[0] || mobile) ? String(101) + '%' : "",
            width: !(media[0] || mobile) ? "" : String(101) + '%',
          }
        }
      ]
    });
  }

}

WholeScheduleJs.prototype.insertScheduleBox = function (indexNumber) {
  const instance = this;
  const mother = this.mother;
  const { client, project, ea, baseTong, media, initDateClassName } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, getDateMatrix, equalJson } = GeneralJs;
  const wordings = this.wordings.scheduleWordings;
  const blank = "&nbsp;&nbsp;";
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let periodLineTop;
  let bigDesktop;
  let calendar;
  let mobileCalendarMargin, mobileCalendarMarginTop;
  let mobilePaddingTop, mobilePaddingBottom;
  let periodPaddingLeft;
  let periodLineWidth;
  let dateMatrix;
  let dateMatrixArr;
  let dateRange;
  let dateTong;
  let dateMatrixMarginLeft, dateTextMatrixMarginLeft;
  let dateTextMatrixMarginBottom;
  let dateBlockHeight;
  let dateNum;
  let dateTitlePaddingTop;
  let dateTotalTitlePaddingBottom;
  let dateFactorWidth;
  let dateFactorTextSize;
  let dateFactorTextTop;
  let dateStart, dateEnd;
  let dateCopied;
  let dateFactorTitleTextTop;
  let dateTitleSize;
  let paddingLeft;
  let paddingBottom;
  let toDoMatrix;
  let startDate;
  let toDoStartXYZ, toDoEndXYZ;
  let dateIndex;
  let boo0, boo1, boo2;
  let accumulate;
  let totalNum;
  let dateFactorTitleTextBottom;
  let dateFactorTextBottom;
  let dateFactorPaddingLeft;
  let dateFactorVisualTop;
  let lineHeight;
  let startTargets, endTargets;
  let tempArr;

  bigDesktop = (media[0] || media[1]);

  wordsTitle = wordings.title.join(" ");

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 5.5 %%>;
  paddingLeft =  <%% 46, 46, 40, 32, 5.6 %%>;
  paddingBottom =  <%% 46, 46, 40, 32, 8.5 %%>;

  whiteBottomMargin = <%% 58, 58, 58, 58, 0 %%>;

  titleFontSize = <%% 21, 21, 21, 19, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 18 : 16), 0 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 250, 220, 200, 33 %%>;
  secondBlockMargin = <%% 36, 35, 34, 34, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% (isMac() ? 6 : 4), (isMac() ? 6 : 4), (isMac() ? 6 : 4), (isMac() ? 6 : 4), 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 34, 30, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 2 %%>;

  periodLineTop = <%% 27, 27, 27, 27, 3.8 %%>;
  periodPaddingLeft = <%% 16, 16, 16, 16, 7 %%>;
  periodLineWidth = <%% 4, 4, 4, 4, 4 %%>;

  mobileCalendarMargin = 6;
  mobileCalendarMarginTop = 6.5;
  mobilePaddingTop = 5;
  mobilePaddingBottom = 10.5;

  dateMatrixMarginLeft = <%% 0, 0, 0, 0, 0 %%>;
  dateTextMatrixMarginLeft = <%% 2, 2, 2, 2, 0.3 %%>;
  dateTextMatrixMarginBottom = <%% 18, 17, 16, 14, 2 %%>;
  dateBlockHeight = <%% 47, 46, 44, 41, 8 %%>;
  dateTitlePaddingTop = <%% 30, 29, 28, 24, 4 %%>;
  dateTotalTitlePaddingBottom = <%% 40, 40, 40, 40, 4 %%>;
  dateFactorWidth = <%% 120, 120, 100, 90, 20 %%>;
  dateFactorTextSize = <%% 14.5, 14, 14, 13, 3 %%>;
  dateFactorTitleTextTop = <%% 12, 12, 11, 10, 2.4 %%>;
  dateFactorTextTop = <%% 12, 12, 11, 10, 2.4 %%>;
  dateTitleSize = <%% 20, 20, 20, 19, 3.7 %%>;
  dateFactorTitleTextBottom = <%% 12, 12, 11, 10, 2.5 %%>;
  dateFactorTextBottom =  <%% 12, 12, 11, 10, 2.7 %%>;
  dateFactorPaddingLeft = <%% 30, 30, 30, 26, 3 %%>;
  dateFactorVisualTop = <%% 2, 2, 1, 1, 0.4 %%>;

  lineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.4 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  dateRange = 10;
  startDate = wordings.start;
  toDoMatrix = wordings.matrix;

  dateMatrix = getDateMatrix(new Date());
  dateMatrix = dateMatrix.previousMatrix();
  dateMatrix = dateMatrix.previousMatrix();

  dateMatrixArr = [];
  for (let i = 0; i < dateRange + 2; i++) {
    dateMatrixArr.push(dateMatrix.sundayConvert());
    dateMatrix = dateMatrix.nextMatrix();
  }

  toDoStartXYZ = [];
  for (let i = 0; i < dateMatrixArr.length; i++) {
    boo0 = (dateMatrixArr[i].year === startDate.getFullYear());
    boo1 = (dateMatrixArr[i].month === startDate.getMonth());
    dateIndex = dateMatrixArr[i].matrix.findIndex((arr) => {
      let boo;
      boo = false;
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] !== null) {
          if (arr[j].date === startDate.getDate()) {
            boo = true;
            break;
          }
        }
      }
      return boo;
    });
    boo2 = (dateIndex !== -1);
    if (boo0 && boo1 && boo2) {
      toDoStartXYZ = [ i, dateIndex ];
      break;
    }
  }

  if (toDoStartXYZ.length !== 2) {
    throw new Error("cannot find start");
  }

  dateMatrixArr = dateMatrixArr.slice(toDoStartXYZ[0]);
  dateMatrixArr[0].matrix = dateMatrixArr[0].matrix.slice(toDoStartXYZ[1]);

  toDoEndXYZ = [];
  accumulate = 0;
  for (let i = 0; i < dateMatrixArr.length; i++) {
    accumulate += dateMatrixArr[i].matrix.length;
    if (accumulate >= toDoMatrix.length) {
      toDoEndXYZ = [ i, dateMatrixArr[i].matrix.length - accumulate + toDoMatrix.length ];
      break;
    }
  }

  if (toDoEndXYZ.length !== 2) {
    throw new Error("cannot find end");
  }

  dateMatrixArr = dateMatrixArr.slice(0, toDoEndXYZ[0] + 1);
  dateMatrixArr[dateMatrixArr.length - 1].matrix = dateMatrixArr[dateMatrixArr.length - 1].matrix.slice(0, toDoEndXYZ[1]);

  startTargets = document.querySelectorAll('.' + initDateClassName.start);
  endTargets = document.querySelectorAll('.' + initDateClassName.end);

  for (let dom of startTargets) {
    dom.textContent = dateToString(startDate).replace(/-/gi, ". ");
  }
  for (let dom of endTargets) {
    tempArr = equalJson(JSON.stringify(dateMatrixArr[dateMatrixArr.length - 1].matrix[dateMatrixArr[dateMatrixArr.length - 1].matrix.length - 1]));
    dom.textContent = dateToString(tempArr.reverse().find((obj) => { return obj !== null }).dateObject).replace(/-/gi, ". ");
  }

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? margin : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: "block",
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: wordsTitle,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
          {
            text: String(indexNumber),
            style: {
              position: "absolute",
              right: String(0),
              top: String(titleTop) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(200),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingLeft: String(numberRight) + ea,
              color: desktop ? colorChip.black : colorChip.green,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(paddingLeft * 2, ea),
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          borderRadius: mobile ? String(1) + ea : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingLeft: desktop ? "" : String(paddingLeft) + ea,
          paddingRight: desktop ? "" : String(paddingLeft) + ea,
          paddingTop: desktop ? "" : String(paddingTop) + ea,
          paddingBottom: desktop ? "" : String(paddingBottom) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  dateTong = createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      paddingBottom: String(dateTotalTitlePaddingBottom) + ea,
    }
  });

  dateNum = 0;
  totalNum = 0;
  for (let { year, month, matrix } of dateMatrixArr) {

    createNode({
      mother: dateTong,
      style: {
        display: "block",
        position: "relative",
        paddingLeft: String(dateTextMatrixMarginLeft) + ea,
        paddingTop: String(dateNum !== 0 ? dateTitlePaddingTop : 0) + ea,
        paddingBottom: String(dateTextMatrixMarginBottom) + ea,
      },
      children: [
        {
          text: String(year) + "년 " + String(month + 1) + "월",
          style: {
            fontSize: String(dateTitleSize) + ea,
            fontWeight: String(600),
            color: colorChip.black
          }
        }
      ]
    });

    for (let i = 0; i < matrix.length + 1; i++) {

      if (i !== 0) {
        dateCopied = equalJson(JSON.stringify(matrix[i - 1]));
        dateStart = equalJson(JSON.stringify(dateCopied.find((obj) => { return obj !== null; })));
        dateEnd = equalJson(JSON.stringify(dateCopied.reverse().find((obj) => { return obj !== null; })));
      } else {
        dateCopied = null;
        dateStart = null;
        dateEnd = null;
      }

      createNode({
        mother: dateTong,
        style: {
          display: "flex",
          position: "relative",
          borderBottom: "1px solid " + colorChip.gray3,
          borderTopLeftRadius: String(i === 0 ? 5 : 0) + "px",
          borderTopRightRadius: String(i === 0 ? 5 : 0) + "px",
          borderBottomLeftRadius: String(i === matrix.length ? 5 : 0) + "px",
          borderBottomRightRadius: String(i === matrix.length ? 5 : 0) + "px",
          borderTop: i === 0 ? "1px solid " + colorChip.gray3 : "",
          borderRight: "1px solid " + colorChip.gray3,
          borderLeft: "1px solid " + colorChip.gray3,
          marginLeft: String(dateMatrixMarginLeft) + ea,
          marginRight: String(dateMatrixMarginLeft) + ea,
          width: withOut(dateMatrixMarginLeft * 2, ea),
          boxSizing: "border-box",
          background: i === 0 ? colorChip.gray0 : colorChip.white,
          flexDirection: "row",
        },
        children: [
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              verticalAlign: "top",
              position: "relative",
              width: String(dateFactorWidth) + ea,
              borderRight: "1px solid " + colorChip.gray3,
              boxSizing: "border-box",
              paddingTop: String(i === 0 ? dateFactorTitleTextTop : dateFactorTextTop) + ea,
              paddingBottom: String(i === 0 ? dateFactorTitleTextTop : dateFactorTextTop) + ea,
            },
            children: [
              {
                text: i !== 0 ? `${String(month + 1)}월 ${String(i + (dateNum === 0 ? toDoStartXYZ[1] : 0))}주차` : ``,
                style: {
                  position: "relative",
                  fontSize: String(dateFactorTextSize) + ea,
                  fontWeight: String(400),
                  width: String(100) + '%',
                  textAlign: "center",
                  color: colorChip.green,
                  top: String(-1 * dateFactorVisualTop) + ea,
                  lineHeight: String(lineHeight),
                }
              }
            ]
          },
          {
            style: {
              display: desktop ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              verticalAlign: "top",
              width: String(dateFactorWidth) + ea,
              borderRight: "1px solid " + colorChip.gray3,
              boxSizing: "border-box",
              paddingTop: String(i === 0 ? dateFactorTitleTextTop : dateFactorTextTop) + ea,
              paddingBottom: String(i === 0 ? dateFactorTitleTextTop : dateFactorTextTop) + ea,
            },
            children: [
              {
                text: i !== 0 ? (bigDesktop ? `${dateToString(dateStart.dateObject).slice(2).replace(/-/gi, ". ")}${blank}(${dateStart.day})` : dateToString(dateStart.dateObject).slice(2).replace(/-/gi, ". ")) : `시작일`,
                style: {
                  position: "relative",
                  fontSize: String(dateFactorTextSize) + ea,
                  fontWeight: String(i === 0 ? 600 : 400),
                  width: String(100) + '%',
                  textAlign: "center",
                  color: colorChip.black,
                  top: String(-1 * dateFactorVisualTop) + ea,
                  lineHeight: String(lineHeight),
                }
              }
            ]
          },
          {
            style: {
              display: desktop ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              verticalAlign: "top",
              width: String(dateFactorWidth) + ea,
              borderRight: "1px solid " + colorChip.gray3,
              boxSizing: "border-box",
              paddingTop: String(i === 0 ? dateFactorTitleTextTop : dateFactorTextTop) + ea,
              paddingBottom: String(i === 0 ? dateFactorTitleTextTop : dateFactorTextTop) + ea,
            },
            children: [
              {
                text: i !== 0 ? (bigDesktop ? `${dateToString(dateEnd.dateObject).slice(2).replace(/-/gi, ". ")}${blank}(${dateEnd.day})` : dateToString(dateEnd.dateObject).slice(2).replace(/-/gi, ". ")) : `종료일`,
                style: {
                  position: "relative",
                  fontSize: String(dateFactorTextSize) + ea,
                  fontWeight: String(i === 0 ? 600 : 400),
                  width: String(100) + '%',
                  textAlign: "center",
                  color: colorChip.black,
                  top: String(-1 * dateFactorVisualTop) + ea,
                  lineHeight: String(lineHeight),
                }
              }
            ]
          },
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              verticalAlign: "top",
              width: withOut(dateFactorWidth * (desktop ? 3 : 1), ea),
              boxSizing: "border-box",
              paddingTop: String(i === 0 ? dateFactorTitleTextTop : dateFactorTextTop) + ea,
              paddingBottom: String(i === 0 ? dateFactorTitleTextBottom : dateFactorTextBottom) + ea,
              paddingLeft: String(dateFactorPaddingLeft) + ea,
              paddingRight: String(dateFactorPaddingLeft) + ea,
            },
            children: [
              {
                text: i !== 0 ? toDoMatrix[totalNum].join("&nbsp;&nbsp;<b%/%b>&nbsp;&nbsp;") : `내용`,
                style: {
                  position: "relative",
                  fontSize: String(dateFactorTextSize) + ea,
                  fontWeight: String(i === 0 ? 600 : 400),
                  width: String(100) + '%',
                  textAlign: "center",
                  color: colorChip.black,
                  top: String(-1 * dateFactorVisualTop) + ea,
                  lineHeight: String(lineHeight),
                },
                bold: {
                  fontSize: String(dateFactorTextSize) + ea,
                  fontWeight: String(i === 0 ? 600 : 400),
                  color: colorChip.gray4,
                }
              }
            ]
          },
        ]
      });

      if (i !== 0) {
        totalNum++;
      }
    }

    dateNum++;
  }

}

WholeScheduleJs.prototype.insertChecklistBox = function (indexNumber) {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;

  wordings = this.wordings.checkWordings;
  wordsTitle = wordings.title;
  matrix = wordings.matrix;

  bottomMargin = <%% 160, 160, 160, 120, 30 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 21, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 21 : 19), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 25, 25, 25, 25, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 1.5 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7.5 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 1 %%>;
  contentsMarginBottom1 = <%% 18, 18, 18, 18, 1 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? margin : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: "block",
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: wordsTitle,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
          {
            text: String(indexNumber),
            style: {
              position: "absolute",
              right: String(0),
              top: String(titleTop) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(200),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingLeft: String(numberRight) + ea,
              color: desktop ? colorChip.black : colorChip.green,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          borderRadius: mobile ? String(1) + ea : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: desktop ? "1px solid " + colorChip.shadow : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(10.5) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { title, contents } of matrix) {
    num2 = 0;
    for (let str of contents) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(num2 === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
          marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(6) + ea)
        },
        children: [
          {
            text: (num2 === 0 ? String(num + 1) : ""),
            style: {
              display: desktop ? "inline-block" : "none",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(zeroWidth) + ea,
              marginRight: String(zeroMarginRight) + ea,
              textAlign: "right",
              color: colorChip.green,
            }
          },
          {
            text: (num2 === 0 ? (desktop ? title : "<b%" + String(num + 1) + "%b>" + blank + title) : ""),
            style: {
              display: desktop ? "inline-block" : "block",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: desktop ? String(firstWidth) + ea : String(100) + '%',
              textAlign: "left",
              color: colorChip.black,
              marginBottom: desktop ? "" : String(1.5) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(secondWidth) + ea,
              marginRight: String(secondMarginRight) + ea,
              textAlign: desktop ? "right" : "left",
              color: colorChip.green,
            },
            children: [
              {
                mode: "svg",
                source: this.mother.returnCheckBox(colorChip.green),
                style: {
                  position: "relative",
                  top: String(checkBoxTop) + ea,
                  width: String(checkBoxWidth) + ea,
                  verticalAlign: "top",
                }
              }
            ]
          },
          {
            text: str,
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: withOut(desktop ? zeroWidth + zeroMarginRight + firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
          },
        ]
      });

      num2++;
    }
    num++;
  }

}

WholeScheduleJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let designers, designer;
    let requestNumber;

    if (getObj.proid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    proid = getObj.proid;
    projects = await ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true });
    if (projects.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ project ] = projects;
    if (!/^d/.test(project.desid)) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    this.project = project;
    this.projectHistory = await ajaxJson({ id: project.proid, rawMode: true }, "/getProjectHistory");

    clients = await ajaxJson({ noFlat: true, whereQuery: { cliid: project.cliid } }, "/getClients", { equal: true });
    if (clients.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ client ] = clients;
    this.client = client;
    this.clientHistory = await ajaxJson({ id: client.cliid, rawMode: true }, "/getClientHistory");

    document.querySelector("title").textContent = client.name + " 고객님 전체 일정 안내 | 홈리에종";

    requestNumber = 0;
    for (let i = 0; i < client.requests.length; i++) {
      if (client.requests[i].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
        requestNumber = i;
        break;
      }
    }
    this.requestNumber = requestNumber;

    designers = await ajaxJson({ noFlat: true, whereQuery: { desid: project.desid } }, "/getDesigners", { equal: true });
    if (designers.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ designer ] = designers;
    this.designer = designer;

    this.wordings = this.scheduleWordings();

    await this.mother.ghostClientLaunching({
      name: "wholeSchedule",
      client: this.client,
      base: {
        instance: this,
        binaryPath: WholeScheduleJs.binaryPath,
        subTitle: (this.client.name + " 고객님 전체 일정 안내"),
        secondBackground: false
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertScheduleBox(1);
          instance.insertChecklistBox(2);
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "WholeScheduleJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (e) {
    await GeneralJs.ajaxJson({ message: "WholeScheduleJs.launching : " + e.message }, "/errorLog");
  }
}
