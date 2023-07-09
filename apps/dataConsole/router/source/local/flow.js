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
          color: colorChip.red,
          description: "",
          title: "오늘",
        },
        date: {
          start: new Date(),
          end: new Date(),
        }
      },
    ];

    colorCalendar(calendarMother, calendarDateArr, { standardDate: new Date() });

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
