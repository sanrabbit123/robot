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
          "디자이너를 직접 만나 <b%함께 현장 상태를 체크%b>하고,",
          "고객님의 <b%취향과 니즈를 전달%b>하여, 앞으로 진행하게 될",
          "홈스타일링에 대한 <b%전체적인 방향%b>을 이야기하게 됩니다.",
        ],
        image: [
          "/init0.jpg",
          "/init1.jpg",
          "/init2.jpg",
        ]
      };

      this.wordings.schedule = {};
      this.wordings.schedule.title = [ "일정표" ];

      this.wordings.check = {};
      this.wordings.check.title = [ "체크리스트" ];
      this.wordings.check.matrix = [
        {
          title: "디자이너가 진행할 3가지",
          contents: [
            "<u%현장 조사%u>" + colon + "현장에 대한 <b%파악과 실측이 가장 중요%b>합니다. 디자이너가 현장에 대해서 구체적으로 파악하는지 확인해주세요!",
            "<u%니즈 조사%u>" + colon + "디자이너는 고객님께서 전송해주신 정보와 사진을 바탕으로 미팅 준비를 하게 됩니다. 그리고 고객님의 <b%이야기를 최대한 들어 니즈를 파악%b>합니다.",
            "<u%컨셉 잡기%u>" + colon + "디자이너는 고객님의 이야기를 듣고만 있는 것이 아니라 현장과 정보를 바탕으로 <b%디자이너가 해줄 수 있는 말과 컨셉%b>을 잡게 됩니다.",
          ],
        },
        {
          title: "현장 조사 관련",
          contents: [
            "<u%도면 확인%u>" + colon + "현장의 <b%정확한 도면이 최대한 많을 수록%b> 좋습니다. 적절한 도면이 없을 경우, 실측을 통해 디자이너는 직접 도면을 작성합니다.",
            "<u%실측%u>" + colon + "도면이 있다고 해도 실제 상황과 다를 수 있습니다. <b%도면보다 실측이 더 중요하므로 디자이너는 반드시 실측을 진행%b>하게 됩니다.",
          ],
        },
        {
          title: "니즈 조사 관련",
          contents: [
            "<u%예산 확인%u>" + colon + "니즈와 항상 함께 알아야 할 것은 사용할 수 있는 예산입니다. 디자이너는 <b%예산에 대한 전체적인 범위 조사와 어떻게 나누어 쓸 지를 파악%b>하게 됩니다.",
            "<u%시공 조정%u>" + colon + "디자이너는 니즈와 예산의 균형, 전체적인 예산의 분배, 기존 현장의 상태와 기존 가구들을 <b%종합적으로 판단하여 시공의 범위를 조정%b>하게 됩니다.",
          ],
        },
        {
          title: "컨셉 잡기 관련",
          contents: [
            "<u%이미지 기반%u>" + colon + "추상적인 단어와 문장들로만 컨셉을 잡는 것이 아닌, <b%사진이나 이미지 등을 활용하여 구체적인 디자인 컨셉%b>을 잡게 됩니다.",
            "<u%용도 확인%u>" + colon + "디자인 컨셉과 더불어 디자이너는 고객님의 <b%라이프 스타일을 기반으로 공간 용도의 구성과 동선 계획 등을 함께 진행%b>하게 됩니다.",
          ],
        },
        {
          title: "기타 주의 사항",
          contents: [
            "<u%디자이너 변경%u>" + colon + "현장 미팅 후, 디자이너가 적합하지 않다고 판단될 시에 <b%최대 1회까지 홈리에종에 디자이너 변경을 요청%b>하실 수 있습니다.",
            "<u%진행 취소시%u>" + colon + "현장 미팅 이후 진행 자체를 취소하실 시 <b%계약금은 돌려드리지 않으며, 디자이너에게 출장비 100,000원(VAT별도)을 지급%b>합니다.",
          ]
        }
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
  const { client, project, projectHistory, requestNumber, ea, baseTong, media } = this;
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

  pictureNumber = 3;

  blockHeight = <%% 400, 380, 367, 260, 424 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;

  titleFontSize = <%% 29, 28.5, 27.5, 23, 5.7 %%>;
  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  titlePadding = <%% 5, 2, 1, 0, 1 %%>;
  contentsPadding = titlePadding + 1;
  titleHeight = <%% 38, 38, 38, 38, 10 %%>;

  picturePaddingTop = <%% 4, 3, 3, 2, 0 %%>;
  pictureBetweenMargin = <%% 10, 6, 5, 4, 1 %%>;

  secondBlockWidth = <%% 320, 240, 225, 160, 33 %%>;
  secondBlockMargin = <%% 50, 45, 40, 39, 2.5 %%>;

  initWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  initTitleMarginTop = <%% 18, 18, 12, 28, 2.5 %%>;

  dateRangeWidth = <%% 200, 190, 180, 160, 20 %%>;
  dateRangeMarginTop = <%% (isMac() ? 46 : 48), 62, 44, 48, 4 %%>;
  dateRangeSize = <%% 28, 27, 24, 22, 5 %%>;
  dateRangeLineTop = <%% 19, 18, 16, 15, 5 %%>;
  dateRangeIndent = <%% 10, 10, 8, 6, 2 %%>;

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
        display: desktop ? "inline-block" : "flex",
        position: "relative",
        width: desktop ? String(secondBlockWidth) + ea : withOut(secondBlockMargin * 2, ea),
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
            width: String(dateRangeWidth) + ea,
            marginTop: String(dateRangeMarginTop) + ea,
            paddingLeft: String(contentsPadding) + ea,
          },
          children: [
            {
              style: {
                display: "block",
                position: "relative",
                textAlign: "left",
              },
              children: [
                {
                  text: "2021. 08. 16",
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
                display: "block",
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
            marginTop: desktop ? String(initTitleMarginTop) + ea : String(5) + ea,
            paddingLeft: desktop ? String(contentsPadding) + ea : "",
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
        marginLeft: String(secondBlockMargin) + ea,
        paddingTop: String(picturePaddingTop) + ea,
        height: withOut(picturePaddingTop, ea),
      }
    }
  ]);

  for (let i = 0; i < pictureNumber; i++) {
    createNode({
      mother: secondBlock,
      style: {
        display: "inline-flex",
        position: "relative",
        width: "calc(calc(100% - " + String(pictureBetweenMargin * (pictureNumber - 1)) + ea + ") / " + String(pictureNumber) + ")",
        height: String(100) + '%',
        background: colorChip.gray3,
        borderRadius: String(8) + "px",
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
            height: !media[0] ? String(101) + '%' : "",
            width: !media[0] ? "" : String(101) + '%',
          }
        }
      ]
    });
  }

}

WholeScheduleJs.prototype.insertScheduleBox = function (indexNumber) {
  const instance = this;
  const mother = this.mother;
  const { client, project, ea, baseTong, media } = this;
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

  bigDesktop = (media[0] || media[1]);

  wordsTitle = wordings.title.join(" ");

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

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

  dateRange = 3;

  dateMatrixMarginLeft = <%% 0, 0, 0, 0, 0 %%>;
  dateTextMatrixMarginLeft = <%% 2, 2, 2, 2, 0 %%>;
  dateTextMatrixMarginBottom = <%% 18, 17, 16, 14, 1 %%>;
  dateBlockHeight = <%% 47, 46, 44, 41, 4 %%>;
  dateTitlePaddingTop = <%% 30, 29, 28, 24, 4 %%>;
  dateTotalTitlePaddingBottom = <%% 40, 40, 40, 40, 4 %%>;
  dateFactorWidth = <%% 120, 120, 100, 90 ,10 %%>;
  dateFactorTextSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  dateFactorTitleTextTop = <%% (isMac() ? 11 : 13), (isMac() ? 11 : 13), (isMac() ? 10 : 12), (isMac() ? 9 : 11), 1 %%>;
  dateFactorTextTop = <%% (isMac() ? 12 : 14), (isMac() ? 12 : 14), (isMac() ? 11 : 13), (isMac() ? 10 : 12), 1 %%>;
  dateTitleSize = <%% 20, 20, 20, 19, 4 %%>;

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
          width: String(100) + '%',
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  dateMatrix = getDateMatrix(new Date());
  dateMatrix = dateMatrix.previousMatrix();

  dateMatrixArr = [];
  for (let i = 0; i < dateRange + 1; i++) {
    dateMatrixArr.push(dateMatrix.sundayConvert());
    dateMatrix = dateMatrix.nextMatrix();
  }

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
            fontWeight: String(500),
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
          display: "block",
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
          height: String(dateBlockHeight) + ea,
          boxSizing: "border-box",
          background: i === 0 ? colorChip.gray0 : colorChip.white,
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(dateFactorWidth) + ea,
              borderRight: "1px solid " + colorChip.gray3,
              height: String(100) + '%',
              boxSizing: "border-box",
            },
            children: [
              {
                text: i !== 0 ? `${String(month + 1)}월 ${String(i)}주차` : ``,
                style: {
                  position: "absolute",
                  fontSize: String(dateFactorTextSize) + ea,
                  fontWeight: String(400),
                  width: String(100) + '%',
                  textAlign: "center",
                  top: String(i === 0 ? dateFactorTitleTextTop : dateFactorTextTop) + ea,
                  color: colorChip.green,
                }
              }
            ]
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(dateFactorWidth) + ea,
              borderRight: "1px solid " + colorChip.gray3,
              height: String(100) + '%',
              boxSizing: "border-box",
            },
            children: [
              {
                text: i !== 0 ? (bigDesktop ? `${dateToString(dateStart.dateObject).slice(2).replace(/-/gi, ". ")}${blank}(${dateStart.day})` : dateToString(dateStart.dateObject).slice(2).replace(/-/gi, ". ")) : `시작일`,
                style: {
                  position: "absolute",
                  fontSize: String(dateFactorTextSize) + ea,
                  fontWeight: String(i === 0 ? 600 : 400),
                  width: String(100) + '%',
                  textAlign: "center",
                  top: String(i === 0 ? dateFactorTitleTextTop : dateFactorTextTop) + ea,
                  color: colorChip.black,
                }
              }
            ]
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(dateFactorWidth) + ea,
              borderRight: "1px solid " + colorChip.gray3,
              height: String(100) + '%',
              boxSizing: "border-box",
            },
            children: [
              {
                text: i !== 0 ? (bigDesktop ? `${dateToString(dateEnd.dateObject).slice(2).replace(/-/gi, ". ")}${blank}(${dateEnd.day})` : dateToString(dateEnd.dateObject).slice(2).replace(/-/gi, ". ")) : `종료일`,
                style: {
                  position: "absolute",
                  fontSize: String(dateFactorTextSize) + ea,
                  fontWeight: String(i === 0 ? 600 : 400),
                  width: String(100) + '%',
                  textAlign: "center",
                  top: String(i === 0 ? dateFactorTitleTextTop : dateFactorTextTop) + ea,
                  color: colorChip.black,
                }
              }
            ]
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: withOut(dateFactorWidth * 3, ea),
              height: String(100) + '%',
              boxSizing: "border-box",
            },
            children: [
              {
                text: i !== 0 ? `` : `내용`,
                style: {
                  position: "absolute",
                  fontSize: String(dateFactorTextSize) + ea,
                  fontWeight: String(i === 0 ? 600 : 400),
                  width: String(100) + '%',
                  textAlign: "center",
                  top: String(i === 0 ? dateFactorTitleTextTop : dateFactorTextTop) + ea,
                  color: colorChip.black,
                }
              }
            ]
          },
        ]
      });
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
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7.5 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.9 %%>;

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
