const FlowJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
  this.baseClassName = "baseClassName";
}

FlowJs.prototype.calendarRender = async function () {
  const instance = this;
  const { totalContents, ea } = this;
  const { createNode, colorChip, withOut, ajaxJson, dateToString, stringToDate, colorCalendar } = GeneralJs;
  try {
    let calendarMother;
    let calendarDateArr;

    calendarMother = createNode({
      mother: totalContents,
      style: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: String(5) + "px",
        width: withOut(0, ea),
        height: withOut(0, ea),
      },
    });

    calendarDateArr = [
      {
        contents: {
          color: colorChip.yellow,
          description: "",
          title: "오늘",
        },
        date: {
          start: new Date(),
          end: new Date(),
        }
      },
      {
        contents: {
          color: colorChip.green,
          description: "",
          title: "경력 블록 CRUD 기능 구축",
        },
        date: {
          start: new Date(2023, 6, 10),
          end: new Date(2023, 6, 11),
        },
      },
      {
        contents: {
          color: colorChip.green,
          description: "",
          title: "프로필 업로드 기능 backend 구축",
        },
        date: {
          start: new Date(2023, 6, 12),
          end: new Date(2023, 6, 13),
        },
      },
      {
        contents: {
          color: colorChip.red,
          description: "",
          title: "체크리스트 업그레이드 (홈리에종 콘솔)",
        },
        date: {
          start: new Date(2023, 6, 13),
          end: new Date(2023, 6, 14),
        },
      },
      {
        contents: {
          color: colorChip.green,
          description: "",
          title: "작업물 업로드 기능 backend 구축",
        },
        date: {
          start: new Date(2023, 6, 16),
          end: new Date(2023, 6, 17),
        },
      },
      {
        contents: {
          color: colorChip.red,
          description: "",
          title: "새로운 체크리스트 구현 (designerAbout)",
        },
        date: {
          start: new Date(2023, 6, 17),
          end: new Date(2023, 6, 23),
        },
      },
      {
        contents: {
          color: colorChip.yellow,
          description: "",
          title: "사무실 이사",
        },
        date: {
          start: new Date(2023, 6, 20),
          end: new Date(2023, 6, 21),
        },
      },
      {
        contents: {
          color: colorChip.black,
          description: "",
          title: "디자이너 제어용 홈리에종 콘솔 구현",
        },
        date: {
          start: new Date(2023, 6, 23),
          end: new Date(2023, 6, 26),
        },
      },
      {
        contents: {
          color: colorChip.yellow,
          description: "",
          title: "디자이너 경력 데이터 동기화",
        },
        date: {
          start: new Date(2023, 7, 1),
          end: new Date(2023, 7, 3),
        },
      },
      {
        contents: {
          color: colorChip.green,
          description: "",
          title: "신청자 신청 페이지 업데이트",
        },
        date: {
          start: new Date(2023, 7, 2),
          end: new Date(2023, 7, 4),
        },
      },
      {
        contents: {
          color: colorChip.red,
          description: "",
          title: "체크리스트 요청 일괄 발송",
        },
        date: {
          start: new Date(2023, 7, 4),
          end: new Date(2023, 7, 4),
        },
      },
      {
        contents: {
          color: colorChip.green,
          description: "",
          title: "신청자 안내 페이지 구현",
        },
        date: {
          start: new Date(2023, 7, 7),
          end: new Date(2023, 7, 11),
        },
      },
      {
        contents: {
          color: colorChip.black,
          description: "",
          title: "신청자 제어 콘솔 구현",
        },
        date: {
          start: new Date(2023, 7, 14),
          end: new Date(2023, 7, 18),
        },
      },
      {
        contents: {
          color: colorChip.green,
          description: "",
          title: "체크리스트 신청자용으로 확장",
        },
        date: {
          start: new Date(2023, 7, 16),
          end: new Date(2023, 7, 18),
        },
      },
      {
        contents: {
          color: colorChip.green,
          description: "",
          title: "새로운 추천서 구현",
        },
        date: {
          start: new Date(2023, 7, 21),
          end: new Date(2023, 7, 29),
        },
      },
      {
        contents: {
          color: colorChip.red,
          description: "",
          title: "프로필, 작업 사진 업로드 마감",
        },
        date: {
          start: new Date(2023, 7, 29),
          end: new Date(2023, 7, 29),
        },
      },
      {
        contents: {
          color: colorChip.red,
          description: "",
          title: "새로운 추천서 런칭",
        },
        date: {
          start: new Date(2023, 7, 30),
          end: new Date(2023, 7, 30),
        },
      },
    ];

    colorCalendar(calendarMother, calendarDateArr, { standardDate: new Date(2023, 6, 10) });

  } catch (e) {
    console.log(e);
  }
}

FlowJs.prototype.launching = async function () {
  const instance = this;
  const { totalContents, ea } = this;
  const { returnGet, setQueue, ajaxJson, withOut, colorChip, createNode } = GeneralJs;
  try {
    const getObj = returnGet();
    const entireMode = (getObj.dataonly === "true" &&  getObj.entire === "true")

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    if (entireMode) {
      this.belowHeight = this.mother.belowHeight = 0;
      this.grayBarWidth = this.mother.grayBarWidth = 0; 
    }

    await this.calendarRender();
    
  } catch (e) {
    GeneralJs.ajax("message=" + e.message + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
