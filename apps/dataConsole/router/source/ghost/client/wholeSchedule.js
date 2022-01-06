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

WholeScheduleJs.prototype.scheduleWordings = function (service) {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const colon = "&nbsp;" + ":" + "&nbsp;&nbsp;&nbsp;";
  class StyleCurationWordings {
    constructor() {
      let tempObj;

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

      this.wordings.check = {};
      this.wordings.check.title = [ "체크리스트" ];
      this.wordings.check.matrix = [];
      for (let { title, children } of service.setting.contents.checklist) {
        tempObj = {};
        tempObj.title = title;
        tempObj.contents = [];
        for (let obj of children) {
          tempObj.contents.push(`<u%${obj.title}%u>${colon}${obj.contents}`);
        }
        this.wordings.check.matrix.push(tempObj);
      }

    }

    get initWordings() {
      return this.wordings.init;
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
  const { schedule } = this.projectHistory;
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
  let imageNode;

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
  pictureBetweenMargin = <%% 10, 6, 5, 4, 0 %%>;
  pictureMobileHeight = 25;

  secondBlockWidth = <%% 320, 240, 225, 160, 33 %%>;
  secondBlockMargin = <%% 50, 45, 40, 39, 2.5 %%>;

  initWordingSize = <%% 14.5, 14, 14, 13, 3.2 %%>;
  initTitleMarginTop = <%% 18, 18, 12, 28, 2.5 %%>;

  dateRangeWidth = <%% 200, 190, 180, 160, 20 %%>;
  dateRangeMarginTop = <%% (isMac() ? 46 : 48), 62, 44, 48, 6 %%>;
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
                  text: dateToString(schedule.date.start).replace(/\-/g, ". "),
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
                  text: dateToString(schedule.date.end).replace(/\-/g, ". "),
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
                  text: dateToString(schedule.date.start).replace(/\-/g, ". "),
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
                  text: dateToString(schedule.date.end).replace(/\-/g, ". "),
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
        width: desktop ? withOut(secondBlockWidth + secondBlockMargin, ea) : withOut(1 * 2, ea),
        verticalAlign: "top",
        marginLeft: desktop ? String(secondBlockMargin) + ea : String(1) + ea,
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
    imageNode = createNode({
      mother: secondBlock,
      style: {
        display: "inline-flex",
        position: "relative",
        width: "calc(calc(100% - " + String(pictureBetweenMargin * (pictureNumber - 1)) + ea + ") / " + String(pictureNumber) + ")",
        height: String(100) + '%',
        background: colorChip.gray3,
        borderRadius: String(desktop ? 8 : 0) + "px",
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
    if (mobile) {
      if (i === 0) {
        imageNode.style.borderTopLeftRadius = String(5) + "px";
        imageNode.style.borderBottomLeftRadius = String(5) + "px";
      }
      if (i === pictureNumber - 1) {
        imageNode.style.borderTopRightRadius = String(5) + "px";
        imageNode.style.borderBottomRightRadius = String(5) + "px";
      }
    }
  }

}

WholeScheduleJs.prototype.insertScheduleBox = function (indexNumber) {
  const instance = this;
  const mother = this.mother;
  const { client, project, ea, baseTong, media, initDateClassName } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, getDateMatrix, equalJson } = GeneralJs;
  const weekWordings = [ '월', '화', '수', '목', '금', '토', '일' ];
  const calendarMethods = [
    "start",
    "end",
    "middle",
    "none",
    "startend",
    "blank"
  ];
  const dateToNumber = (date) => { return (date.getFullYear() * 100000) + ((date.getMonth() + 1) * 100) + date.getDate() }
  const { schedule } = this.projectHistory;
  const today = new Date();
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
  let tong;
  let whiteBottomMargin;
  let dateTong;
  let paddingLeft;
  let paddingBottom;
  let lineHeight;
  let blockOuterPadding;
  let blockFactorHeight;
  let blockInnerMargin;
  let blockFactorMarginBottom;
  let numberSize;
  let numberTextTop;
  let numberWeight;
  let blockSecondRatio;
  let dateSize;
  let dateWeight;
  let dateTop;
  let dateTop2;
  let dateBottom;
  let dateLeft;
  let datePadding;
  let dateLineBottom;
  let dateCalendarWidth;
  let dateCalendarIndent;
  let dateCalendarVisual;
  let calendarCancelBackPadding;
  let colorBoxIndent;
  let colorBoxPadding;
  let colorBarWidth;
  let colorBarVisual;
  let wordingSize;
  let wordingLeft;
  let wordingWeight0;
  let wordingWeight1;
  let wordingTop;
  let descriptionPaddingLeft;
  let descriptionPaddingRight;
  let descriptionPaddingTop;
  let descriptionPaddingBottom;
  let descriptionLineHeight;
  let plusSize;
  let plusWeight;
  let plusTextTop;
  let blockAreaMarginBottom;
  let calendarVisualLeft;
  let bigCalendarTitleBottom;
  let bigCalendarTitleSize;
  let bigCalendarTitleWeight;
  let weekBlockHeight;
  let weekBlockSize;
  let weekBlockWeight;
  let weekBlockTextTop;
  let dateBlockHeight;
  let dateBlockPaddingTop;
  let dateBlockPaddingBottom;
  let dateBlockWeight;
  let datePositionTop;
  let datePositionLeft;
  let arrowWidth;
  let arrowTop;
  let barMotherHeight;
  let colorSqureTop;
  let colorSqureHeight;
  let colorSqureIndent;
  let calendarTitleTop;
  let calendarTitleSize;
  let calendarTitlePaddingTop;
  let calendarTitlePaddingBottom;
  let calendarTitlePaddingLeft;
  let calendarTitlePaddingRight;
  let dateStart, dateEnd, wordingTitle, wordingDescription, barColor;
  let bigCalendar, bigCalendarTitleZone, bigCalendarContentsZone;
  let scheduleTargets;
  let barMatrix;
  let dateBlocks;
  let noneDeleteArr;
  let barMatrix_final;
  let children;
  let blockInsert;
  let bigCalendarMarginTop;
  let sevenArr, sevenLength, sevenIndex;
  let colorSqureWordingSize, colorSqureWordingTop, colorSqureWordingLeft, colorSqureWordingWeight;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 5.5 %%>;
  paddingLeft =  <%% 46, 46, 40, 32, 5.6 %%>;
  paddingBottom =  <%% 46, 46, 40, 32, 6.7 %%>;

  whiteBottomMargin = <%% 58, 56, 52, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 21, 19, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 23 : 21), (isMac() ? 21 : 19), (isMac() ? 19 : 17), (isMac() ? 16 : 14), 0 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  lineHeight = 1.7;

  blockOuterPadding = <%% 10, 10, 10, 10, 1.5 %%>;
  blockFactorHeight = <%% 90, 90, 90, 90, 13 %%>;
  blockInnerMargin = <%% 6, 6, 6, 6, 1 %%>;
  blockFactorMarginBottom = <%% 6, 6, 6, 6, 1.5 %%>;

  numberSize = <%% 36, 36, 36, 36, 4.8 %%>;
  numberTextTop = <%% -4, -4, -4, -4, -0.6 %%>;
  numberWeight = <%% 400, 400, 400, 400, 400 %%>;

  blockSecondRatio = <%% 2.4, 2.1, 1.8, 1.5, 2.4 %%>;
  dateSize = <%% 15, 15, 15, 14, 3.6 %%>;
  dateWeight = <%% 400, 400, 400, 400, 400 %%>;
  dateTop = <%% 11, 11, 11, 14, 2 %%>;
  dateTop2 = <%% 34, 34, 34, 34, 2 %%>;
  dateBottom = <%% dateTop + (isMac() ? 5 : 6), dateTop + (isMac() ? 5 : 6), dateTop + (isMac() ? 5 : 6), dateTop + (isMac() ? 3 : 4), dateTop %%>;
  dateLeft = <%% 18, 18, 18, 18, 4.2 %%>;
  datePadding = <%% 8, 8, 8, 8, 2 %%>;
  dateLineBottom = <%% 24.5, 24.5, 24.5, 25, 5.3 %%>;

  dateCalendarWidth = <%% 260, 260, 260, 260, 80 %%>;
  dateCalendarIndent = <%% 6, 6, 6, 6, 0 %%>;
  dateCalendarVisual = <%% 2, 2, 2, 2, 0 %%>;
  calendarCancelBackPadding = <%% 24, 24, 24, 24, 2.4 %%>;
  colorBoxIndent = <%% 12, 12, 12, 12, 12 %%>;
  colorBoxPadding = <%% 12, 12, 12, 12, 12 %%>;

  colorBarWidth = <%% 6, 6, 6, 5, 1 %%>;
  colorBarVisual = <%% 1, 1, 1, 0, 0 %%>;

  wordingSize = <%% 14, 14, 13, 12, 2.8 %%>;
  wordingLeft = <%% 34, 34, 34, 34, 8 %%>;
  wordingWeight0 = <%% 600, 600, 600, 600, 600 %%>;
  wordingWeight1 = <%% 400, 400, 400, 400, 400 %%>;
  wordingTop = <%% (isMac() ? 13 : 15), (isMac() ? 13 : 15), (isMac() ? 13 : 15), (isMac() ? 13 : 15), 3.4 %%>;

  descriptionPaddingLeft = wordingLeft;
  descriptionPaddingRight = dateLeft;
  descriptionPaddingTop = <%% (isMac() ? 34 : 36), (isMac() ? 35 : 37), (isMac() ? 36 : 38), (isMac() ? 35 : 37), 8.2 %%>;
  descriptionPaddingBottom = <%% (isMac() ? 15 : 13), (isMac() ? 14 : 12), (isMac() ? 13 : 11), (isMac() ? 14 : 12), 3.8 %%>;
  descriptionLineHeight = 1.5;

  plusSize = <%% 48, 48, 48, 48, 4.8 %%>;
  plusWeight = <%% 500, 500, 500, 500, 500 %%>;
  plusTextTop = <%% -5, -5, -5, -5, -5 %%>;

  blockAreaMarginBottom = <%% 50, 50, 50, 50, 5 %%>;

  calendarVisualLeft = <%% 1, 1, 1, 1, 1 %%>;

  bigCalendarTitleBottom = <%% 22, 20, 18, 16, 3 %%>;
  bigCalendarTitleSize = <%% 36, 34, 32, 30, 5 %%>;
  bigCalendarTitleWeight = <%% 300, 300, 300, 300, 300 %%>;
  weekBlockHeight = <%% 48, 48, 48, 48, 8 %%>;
  weekBlockSize = <%% 15, 15, 15, 15, 2.8 %%>;
  weekBlockWeight = <%% 600, 600, 600, 600, 600 %%>;
  weekBlockTextTop = <%% (isMac() ? -2 : -1), (isMac() ? -2 : -1), (isMac() ? -2 : -1), (isMac() ? -2 : -1), 0 %%>;

  dateBlockHeight = <%% 120, 120, 120, 120, 12 %%>;
  dateBlockPaddingTop = <%% 40, 40, 40, 40, 5.5 %%>;
  dateBlockPaddingBottom = <%% 20, 20, 20, 20, 1.5 %%>;
  dateBlockWeight = <%% 300, 300, 300, 300, 300 %%>;

  datePositionTop = <%% 10, 10, 10, 10, 1 %%>;
  datePositionLeft = <%% 18, 18, 18, 18, 1 %%>;

  arrowWidth = <%% 12, 12, 12, 12, 2 %%>;
  arrowTop = <%% 22, 22, 18, 18, 2.4 %%>;

  barMotherHeight = <%% 25, 25, 25, 21, 5 %%>;
  colorSqureTop = <%% 4, 4, 4, 4, 0.25 %%>;
  colorSqureHeight = <%% 21, 21, 21, 18, 3.5 %%>;
  colorSqureIndent = <%% 25, 25, 25, 25, 20 %%>;

  calendarTitleTop = <%% -32, -32, -32, -32, -3.2 %%>;
  calendarTitleSize = <%% 13, 13, 12, 11, 3 %%>;
  calendarTitlePaddingTop = <%% (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), 1 %%>;
  calendarTitlePaddingBottom = <%% 6, 6, 6, 6, 6 %%>;
  calendarTitlePaddingLeft = <%% 12, 12, 12, 12, 1.2 %%>;
  calendarTitlePaddingRight = <%% 12, 12, 12, 12, 1.2 %%>;

  bigCalendarMarginTop = <%% 60, 50, 36, 28, 5.5 %%>;

  colorSqureWordingSize = <%% 11, 11, 11, 9, 2.1 %%>;
  colorSqureWordingTop = <%% (isMac() ? 2 : 3), (isMac() ? 2 : 3), (isMac() ? 2 : 3), (isMac() ? 1 : 2), 0 %%>;
  colorSqureWordingLeft = <%% 7, 7, 7, 6, 1.4 %%>;
  colorSqureWordingWeight = 800;

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
            text: "일정표",
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
    }
  });

  children = schedule.children;
  for (let i = 0; i < children.length; i++) {
    ({ date: { start: dateStart, end: dateEnd }, contents: { title: wordingTitle, description: wordingDescription, color: barColor } } = children[i]);
    dateStart = dateToString(dateStart).replace(/-/gi, ". ").slice(2);
    dateEnd = dateToString(dateEnd).replace(/-/gi, ". ").slice(2);

    createNode({
      mother: dateTong,
      style: {
        display: "block",
        position: "relative",
        padding: String(blockOuterPadding) + ea,
        width: withOut(blockOuterPadding * 2, ea),
        borderRadius: String(5) + "px",
        background: colorChip.gray2,
        marginBottom: String(blockFactorMarginBottom) + ea,
      },
      children: [
        {
          style: {
            verticalAlign: "top",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
            height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
            background: colorChip.white,
            borderRadius: String(5) + "px",
            marginRight: String(blockInnerMargin) + ea,
          },
          children: [
            {
              text: String(i + 1),
              style: {
                position: "relative",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                fontFamily: "graphik",
                top: String(numberTextTop) + ea,
                color: colorChip.black,
              }
            }
          ]
        },
        {
          style: {
            verticalAlign: "top",
            display: "inline-block",
            position: "relative",
            width: desktop ? String((blockFactorHeight - (blockOuterPadding * 2)) * blockSecondRatio) + ea : withOut(blockFactorHeight - (blockOuterPadding * 2) + blockInnerMargin, ea),
            height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
            background: colorChip.white,
            borderRadius: String(5) + "px",
            marginRight: desktop ? String(blockInnerMargin) + ea : "",
          },
          children: [
            {
              style: {
                position: "absolute",
                width: withOut(dateLeft * 2, ea),
                bottom: String(dateLineBottom) + ea,
                left: String(dateLeft) + ea,
                borderBottom: "1px solid " + colorChip.green,
              }
            },
            {
              text: dateStart,
              attribute: {
                value: String(20) + dateStart.replace(/\. /gi, "-"),
              },
              style: {
                position: "absolute",
                fontSize: String(dateSize) + ea,
                fontWeight: String(dateWeight),
                fontFamily: "graphik",
                color: colorChip.black,
                top: String(dateTop) + ea,
                left: String(dateLeft) + ea,
                background: colorChip.white,
                paddingRight: String(datePadding) + ea,
                cursor: "pointer",
              }
            },
            {
              text: dateEnd,
              attribute: {
                value: String(20) + dateEnd.replace(/\. /gi, "-"),
              },
              style: {
                position: "absolute",
                fontSize: String(dateSize) + ea,
                fontWeight: String(dateWeight),
                fontFamily: "graphik",
                color: colorChip.black,
                top: String(dateTop2) + ea,
                right: String(dateLeft) + ea,
                background: colorChip.white,
                paddingLeft: String(datePadding) + ea,
                cursor: "pointer",
              }
            },
          ]
        },
        {
          style: {
            verticalAlign: "top",
            display: desktop ? "inline-block" : "block",
            position: "relative",
            width: desktop ? withOut(((blockFactorHeight - (blockOuterPadding * 2)) * (1 + blockSecondRatio) + (blockInnerMargin * 2) + descriptionPaddingLeft + descriptionPaddingRight), ea) : "",
            paddingTop: String(descriptionPaddingTop) + ea,
            paddingLeft: String(descriptionPaddingLeft) + ea,
            paddingRight: String(descriptionPaddingRight) + ea,
            paddingBottom: String(descriptionPaddingBottom) + ea,
            background: colorChip.white,
            borderRadius: String(5) + "px",
            marginTop: mobile ? String(blockInnerMargin) + ea : "",
          },
          children: [
            {
              attribute: {
                value: barColor,
              },
              style: {
                position: "absolute",
                left: String(dateLeft) + ea,
                top: String((desktop ? dateBottom : 4.2)) + ea,
                width: String(colorBarWidth) + ea,
                height: withOut(((desktop ? dateBottom : 4.4) * 2) + colorBarVisual, ea),
                borderRadius: String(colorBarWidth) + ea,
                background: barColor,
              }
            },
            {
              text: wordingTitle,
              attribute: {
                value: wordingTitle.replace(/[\"\=\&\+]/gi, ''),
              },
              style: {
                position: "absolute",
                left: String(wordingLeft) + ea,
                top: String(wordingTop) + ea,
                fontSize: String(wordingSize) + ea,
                fontWeight: String(wordingWeight0),
                color: colorChip.black,
              }
            },
            {
              style: {
                position: "relative",
                width: String(100) + '%',
                height: String(100) + '%',
                background: "transparent",
              },
              children: [
                {
                  text: wordingDescription,
                  attribute: {
                    value: wordingDescription.replace(/[\"\=\&\+]/gi, ''),
                  },
                  style: {
                    fontSize: String(wordingSize) + ea,
                    fontWeight: String(wordingWeight1),
                    color: colorChip.black,
                    lineHeight: String(descriptionLineHeight),
                  }
                }
              ]
            }
          ]
        }
      ]
    });
  }

  //calendar
  blockInsert = () => {
    cleanChildren(bigCalendarContentsZone);

    scheduleTargets = [];
    for (let i = 0; i < children.length; i++) {
      ({ date: { start: dateStart, end: dateEnd }, contents: { title: wordingTitle, description: wordingDescription, color: barColor } } = children[i]);
      scheduleTargets.push({
        start: new Date(JSON.stringify(dateStart).slice(1, -1)),
        end: new Date(JSON.stringify(dateEnd).slice(1, -1)),
        title: wordingTitle,
        color: barColor,
      });
    }

    for (let i = 0; i < weekWordings.length; i++) {
      createNode({
        mother: bigCalendarContentsZone,
        style: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "calc(100% / " + String(weekWordings.length) + ")",
          height: String(weekBlockHeight) + ea,
          background: colorChip.gray1,
          boxSizing: "border-box",
          borderRight: i !== weekWordings.length - 1 ? "1px solid " + colorChip.gray3 : "",
          borderBottom: "1px solid " + colorChip.gray3,
        },
        children: [
          {
            text: weekWordings[i],
            style: {
              fontSize: String(weekBlockSize) + ea,
              fontWeight: String(weekBlockWeight),
              color: i < 5 ? colorChip.black : colorChip.red,
              position: "relative",
              top: String(weekBlockTextTop) + ea,
            }
          }
        ]
      });
    }

    barMatrix = [];
    dateBlocks = [];
    for (let i = 0; i < dateMatrix.matrix.length; i++) {
      for (let j = 0; j < dateMatrix.matrix[i].length; j++) {

        tempArr = [];
        for (let k = 0; k < scheduleTargets.length; k++) {
          if (dateMatrix.matrix[i][j] === null) {
            tempArr.push(calendarMethods[3]);
          } else {
            tempNumber = dateToNumber(new Date(dateMatrix.year, dateMatrix.month, dateMatrix.matrix[i][j].date));
            if (dateToNumber(scheduleTargets[k].start) === tempNumber) {
              if (dateToNumber(scheduleTargets[k].end) === tempNumber) {
                tempArr.push(calendarMethods[4]);
              } else {
                tempArr.push(calendarMethods[0]);
              }
            } else if (dateToNumber(scheduleTargets[k].start) < tempNumber && tempNumber < dateToNumber(scheduleTargets[k].end)) {
              tempArr.push(calendarMethods[2]);
            } else if (dateToNumber(scheduleTargets[k].end) === tempNumber) {
              tempArr.push(calendarMethods[1]);
            } else {
              tempArr.push(calendarMethods[3]);
            }
          }
        }

        block = createNode({
          mother: bigCalendarContentsZone,
          style: {
            display: "inline-block",
            position: "relative",
            width: "calc(100% / " + String(dateMatrix.matrix[i].length) + ")",
            paddingTop: String(dateBlockPaddingTop) + ea,
            paddingBottom: String(dateBlockPaddingBottom) + ea,
            background: dateMatrix.matrix[i][j] !== null ? colorChip.white : colorChip.gray0,
            boxSizing: "border-box",
            borderRight: j !== dateMatrix.matrix[i].length - 1 ? "1px solid " + colorChip.gray3 : "",
            borderBottom: i !== dateMatrix.matrix.length - 1 ? "1px solid " + colorChip.gray3 : "",
          },
          children: [
            {
              text: dateMatrix.matrix[i][j] !== null ? String(dateMatrix.matrix[i][j].date) : "",
              style: {
                fontSize: String(weekBlockSize) + ea,
                fontWeight: String(dateBlockWeight),
                fontFamily: "graphik",
                color: j < 5 ? colorChip.black : colorChip.red,
                position: "absolute",
                top: String(datePositionTop) + ea,
                left: String(datePositionLeft) + ea,
              }
            }
          ]
        });
        dateBlocks.push(block);

        if (barMatrix.length > 0) {
          for (let z = 0; z < barMatrix[barMatrix.length - 1].length; z++) {
            for (let k = 0; k < barMatrix[barMatrix.length - 1].length; k++) {
              if (tempArr[k] === calendarMethods[3] && (tempArr[k + 1] === calendarMethods[2] || tempArr[k + 1] === calendarMethods[1] || tempArr[k + 1] === calendarMethods[5])) {
                if (barMatrix[barMatrix.length - 1][k] !== calendarMethods[3] && barMatrix[barMatrix.length - 1][k] !== calendarMethods[4]) {
                  tempArr[k] = calendarMethods[5];
                }
              }
            }
          }
        }
        barMatrix.push(tempArr);

      }
    }

    noneDeleteArr = (new Array(scheduleTargets.length)).fill(0, 0);
    for (let arr of barMatrix) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== calendarMethods[3]) {
          noneDeleteArr[i] = noneDeleteArr[i] + 1;
        }
        arr[i] = arr[i] + "_" + scheduleTargets[i].color + "_" + scheduleTargets[i].title;
      }
    }

    barMatrix_final = [];
    for (let arr of barMatrix) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i] + "_" + String(noneDeleteArr[i]);
      }
      barMatrix_final.push(arr.filter((str) => { return Number(str.split("_")[str.split("_").length - 1]) !== 0 }));
    }

    for (let z = 0; z < (barMatrix_final.length / 7); z++) {
      sevenArr = [];
      for (let i = 0; i < 7; i++) {
        sevenArr.push(barMatrix_final[(7 * z) + i]);
      }

      sevenArr = sevenArr.map((arr) => { return arr.reverse(); });
      sevenLength = sevenArr[0].length;
      sevenIndex = 0;
      for (let i = 0; i < sevenLength; i++) {
        if (sevenArr.every((arr) => { return (new RegExp("^" + calendarMethods[3], 'i')).test(arr[sevenIndex]) })) {
          sevenArr = sevenArr.map((arr) => { arr.shift(); return arr; });
        } else {
          sevenIndex = sevenIndex + 1;
        }
      }

      sevenArr = sevenArr.map((arr) => { return arr.reverse(); });
      sevenLength = sevenArr[0].length;
      sevenIndex = 0;
      for (let i = 0; i < sevenLength; i++) {
        if (sevenArr.every((arr) => { return (new RegExp("^" + calendarMethods[3] + '|' + calendarMethods[5], 'i')).test(arr[sevenIndex]) })) {
          sevenArr = sevenArr.map((arr) => { arr.shift(); return arr; });
        } else {
          sevenIndex = sevenIndex + 1;
        }
      }
    }

    for (let i = 0; i < barMatrix_final.length; i++) {
      for (let j = 0; j < barMatrix_final[i].length; j++) {
        const [ method, color, title, deleteNum ] = barMatrix_final[i][j].split('_');
        barMother = createNode({
          mother: dateBlocks[i],
          style: {
            position: "relative",
            display: "block",
            height: String(barMotherHeight) + ea,
            width: String(100) + '%',
          }
        });

        if (method === "start") {
          createNode({
            mother: barMother,
            attribute: { title, color, method },
            event: {
              mouseenter: function (e) {
                e.stopPropagation();
                createNode({
                  mode: "aside",
                  mother: this.parentElement,
                  text: title,
                  style: {
                    position: "absolute",
                    top: String(calendarTitleTop) + ea,
                    width: String(100) + '%',
                    textAlign: "center",
                    zIndex: String(1),
                  },
                  children: [
                    {
                      text: title,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(calendarTitleSize) + ea,
                        fontWeight: String(600),
                        paddingTop: String(calendarTitlePaddingTop) + ea,
                        paddingBottom: String(calendarTitlePaddingBottom) + ea,
                        paddingLeft: String(calendarTitlePaddingLeft) + ea,
                        paddingRight: String(calendarTitlePaddingRight) + ea,
                        background: colorChip.white,
                        borderRadius: String(5) + "px",
                        boxShadow: "0px 3px 16px -9px " + colorChip.darkShadow,
                        color,
                        zIndex: String(1),
                      }
                    }
                  ]
                })
              },
              mouseleave: function (e) {
                e.stopPropagation();
                const targets = [ ...this.parentElement.querySelectorAll("aside") ];
                for (let target of targets) {
                  this.parentElement.removeChild(target);
                }
              },
            },
            style: {
              position: "relative",
              top: String(colorSqureTop) + ea,
              height: String(colorSqureHeight) + ea,
              width: String(100 - colorSqureIndent) + '%',
              marginLeft: String(colorSqureIndent) + '%',
              background: color,
              borderTopLeftRadius: String(5) + "px",
              borderBottomLeftRadius: String(5) + "px",
              cursor: "pointer",
            },
            children: [
              {
                text: title,
                style: {
                  position: "absolute",
                  top: String(colorSqureWordingTop) + ea,
                  textAlign: "left",
                  left: String(colorSqureWordingLeft) + ea,
                  fontSize: String(colorSqureWordingSize) + ea,
                  fontWeight: String(colorSqureWordingWeight),
                  color: colorChip.white,
                  width: String(200) + '%',
                  zIndex: String(1),
                }
              }
            ]
          });
        } else if (method === "end") {
          createNode({
            mother: barMother,
            attribute: { title, color, method },
            event: {
              mouseenter: function (e) {
                e.stopPropagation();
                createNode({
                  mode: "aside",
                  mother: this.parentElement,
                  text: title,
                  style: {
                    position: "absolute",
                    top: String(calendarTitleTop) + ea,
                    width: String(100) + '%',
                    textAlign: "center",
                    zIndex: String(1),
                  },
                  children: [
                    {
                      text: title,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(calendarTitleSize) + ea,
                        fontWeight: String(600),
                        paddingTop: String(calendarTitlePaddingTop) + ea,
                        paddingBottom: String(calendarTitlePaddingBottom) + ea,
                        paddingLeft: String(calendarTitlePaddingLeft) + ea,
                        paddingRight: String(calendarTitlePaddingRight) + ea,
                        background: colorChip.white,
                        borderRadius: String(5) + "px",
                        boxShadow: "0px 3px 16px -9px " + colorChip.darkShadow,
                        color,
                        zIndex: String(1),
                      }
                    }
                  ]
                })
              },
              mouseleave: function (e) {
                e.stopPropagation();
                const targets = [ ...this.parentElement.querySelectorAll("aside") ];
                for (let target of targets) {
                  this.parentElement.removeChild(target);
                }
              },
            },
            style: {
              position: "relative",
              top: String(colorSqureTop) + ea,
              height: String(colorSqureHeight) + ea,
              width: String(100 - colorSqureIndent) + '%',
              left: String(0) + ea,
              background: color,
              borderTopRightRadius: String(5) + "px",
              borderBottomRightRadius: String(5) + "px",
              cursor: "pointer",
            },
            children: [
              {
                text: title,
                style: {
                  position: "absolute",
                  top: String(colorSqureWordingTop) + ea,
                  right: String(colorSqureWordingLeft) + ea,
                  textAlign: "right",
                  fontSize: String(colorSqureWordingSize) + ea,
                  fontWeight: String(colorSqureWordingWeight),
                  color: colorChip.white,
                  width: String(200) + '%',
                  zIndex: String(1),
                }
              }
            ]
          });
        } else if (method === "middle") {
          createNode({
            mother: barMother,
            attribute: { title, color, method },
            event: {
              mouseenter: function (e) {
                e.stopPropagation();
                createNode({
                  mode: "aside",
                  mother: this.parentElement,
                  text: title,
                  style: {
                    position: "absolute",
                    top: String(calendarTitleTop) + ea,
                    width: String(100) + '%',
                    textAlign: "center",
                    zIndex: String(1),
                  },
                  children: [
                    {
                      text: title,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(calendarTitleSize) + ea,
                        fontWeight: String(600),
                        paddingTop: String(calendarTitlePaddingTop) + ea,
                        paddingBottom: String(calendarTitlePaddingBottom) + ea,
                        paddingLeft: String(calendarTitlePaddingLeft) + ea,
                        paddingRight: String(calendarTitlePaddingRight) + ea,
                        background: colorChip.white,
                        borderRadius: String(5) + "px",
                        boxShadow: "0px 3px 16px -9px " + colorChip.darkShadow,
                        color,
                        zIndex: String(1),
                      }
                    }
                  ]
                })
              },
              mouseleave: function (e) {
                e.stopPropagation();
                const targets = [ ...this.parentElement.querySelectorAll("aside") ];
                for (let target of targets) {
                  this.parentElement.removeChild(target);
                }
              },
            },
            style: {
              position: "absolute",
              top: String(colorSqureTop) + ea,
              height: String(colorSqureHeight) + ea,
              width: "calc(100% + " + String(1 * 2) + "px" + ")",
              left: String(-1) + "px",
              background: color,
              cursor: "pointer",
            }
          });
        } else if (method === "startend") {
          createNode({
            mother: barMother,
            attribute: { title, color, method },
            event: {
              mouseenter: function (e) {
                e.stopPropagation();
                createNode({
                  mode: "aside",
                  mother: this.parentElement,
                  text: title,
                  style: {
                    position: "absolute",
                    top: String(calendarTitleTop) + ea,
                    width: String(100) + '%',
                    textAlign: "center",
                    zIndex: String(1),
                  },
                  children: [
                    {
                      text: title,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(calendarTitleSize) + ea,
                        fontWeight: String(600),
                        paddingTop: String(calendarTitlePaddingTop) + ea,
                        paddingBottom: String(calendarTitlePaddingBottom) + ea,
                        paddingLeft: String(calendarTitlePaddingLeft) + ea,
                        paddingRight: String(calendarTitlePaddingRight) + ea,
                        background: colorChip.white,
                        borderRadius: String(5) + "px",
                        boxShadow: "0px 3px 16px -9px " + colorChip.darkShadow,
                        color,
                        zIndex: String(1),
                      }
                    }
                  ]
                })
              },
              mouseleave: function (e) {
                e.stopPropagation();
                const targets = [ ...this.parentElement.querySelectorAll("aside") ];
                for (let target of targets) {
                  this.parentElement.removeChild(target);
                }
              },
            },
            style: {
              position: "absolute",
              top: String(colorSqureTop) + ea,
              height: String(colorSqureHeight) + ea,
              width: String(100 - (colorSqureIndent * 2)) + '%',
              left: String(colorSqureIndent) + '%',
              background: color,
              borderRadius: String(5) + "px",
              cursor: "pointer",
            }
          });
        }
      }
    }

  }

  dateMatrix = getDateMatrix(today);
  bigCalendar = createNode({
    mother: dateTong,
    style: {
      display: "block",
      position: "relative",
      paddingLeft: String(calendarVisualLeft) + ea,
      paddingRight: String(calendarVisualLeft) + ea,
      marginTop: String(bigCalendarMarginTop) + ea,
    }
  });
  bigCalendarTitleZone = createNode({
    mother: bigCalendar,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      marginBottom: String(bigCalendarTitleBottom) + ea,
    },
    children: [
      {
        text: dateToString(today).split('-').slice(0, 2).join(". "),
        style: {
          fontSize: String(bigCalendarTitleSize) + ea,
          fontWeight: String(bigCalendarTitleWeight),
          fontFamily: "graphik",
          color: colorChip.black,
        }
      },
      {
        mode: "svg",
        class: [ "hoverDefault_lite" ],
        source: this.mother.returnArrow("left", colorChip.green),
        event: {
          click: function (e) {
            dateMatrix = dateMatrix.previousMatrix();
            this.parentElement.firstChild.textContent = String(dateMatrix.year) + ". " + String(dateMatrix.month + 1)
            blockInsert();
          }
        },
        style: {
          position: "absolute",
          top: String(arrowTop) + ea,
          left: String(0) + ea,
          width: String(arrowWidth) + ea,
        }
      },
      {
        mode: "svg",
        class: [ "hoverDefault_lite" ],
        source: this.mother.returnArrow("right", colorChip.green),
        event: {
          click: function (e) {
            dateMatrix = dateMatrix.nextMatrix();
            this.parentElement.firstChild.textContent = String(dateMatrix.year) + ". " + String(dateMatrix.month + 1)
            blockInsert();
          }
        },
        style: {
          position: "absolute",
          top: String(arrowTop) + ea,
          right: String(0) + ea,
          width: String(arrowWidth) + ea,
        }
      },
    ]
  });
  bigCalendarContentsZone = createNode({
    mother: bigCalendar,
    style: {
      display: "block",
      position: "relative",
      border: "1px solid " + colorChip.gray3,
      borderRadius: String(5) + "px",
      width: String(100) + '%',
      overflow: "hidden",
      boxSizing: "border-box",
    },
  });
  blockInsert();

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
    let service;

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
    this.projectHistory = await ajaxJson({ id: project.proid, rawMode: true }, "/getProjectHistory", { equal: true });

    clients = await ajaxJson({ noFlat: true, whereQuery: { cliid: project.cliid } }, "/getClients", { equal: true });
    if (clients.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ client ] = clients;
    this.client = client;
    this.clientHistory = await ajaxJson({ id: client.cliid, rawMode: true }, "/getClientHistory", { equal: true });

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

    service = await ajaxJson({ key: "wholeSchedule" }, "/getServiceByKey", { equal: true });
    this.wordings = this.scheduleWordings(service);

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
