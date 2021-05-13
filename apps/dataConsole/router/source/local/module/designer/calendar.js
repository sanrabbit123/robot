DesignerJs.prototype.calendarBase = function () {
  const instance = this;
  const { ea, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const { white, green } = colorChip;
  let totalMother;
  let margin;
  let titleHeight;
  let titleArea, contentsArea;
  let titleDesigner, titleProject, titleTime;
  let contentsDesigner, contentsProject, contentsTime;
  let designerWidth, projectWidth;
  let size;
  let borderBack;

  titleHeight = 34;
  margin = 30;
  designerWidth = 100;
  projectWidth = 200;
  size = 18;

  totalMother = createNode({
    mother: document.getElementById("totalcontents"),
    class: [ "totalMother" ],
    style: {
      position: "fixed",
      top: String(0),
      left: String(0),
      paddingTop: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      height: withOut(margin + belowHeight, ea),
    }
  });
  this.totalMother = totalMother;

  [ borderBack, titleArea, contentsArea ] = createNodes([
    {
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(margin + titleHeight) + ea,
        left: String(margin) + ea,
        width: withOut(margin * 2, ea),
        height: withOut(margin + titleHeight, ea),
        border: "1px solid " + colorChip.gray4,
        borderBottom: String(0),
        borderTopLeftRadius: String(5) + "px",
        borderTopRightRadius: String(5) + "px",
        boxSizing: "border-box",
      }
    },
    {
      mother: totalMother,
      style: {
        position: "relative",
        height: String(titleHeight) + ea,
      }
    },
    {
      mother: totalMother,
      style: {
        position: "relative",
        height: withOut(titleHeight, ea),
      }
    }
  ]);

  [ titleDesigner, titleProject, titleTime ] = createNodes([
    {
      mother: titleArea,
      style: {
        display: "inline-block",
        position: "relative",
        height: String(100) + '%',
        width: String(designerWidth) + ea,
      }
    },
    {
      mother: titleArea,
      style: {
        display: "inline-block",
        position: "relative",
        height: String(100) + '%',
        width: String(projectWidth) + ea,
      }
    },
    {
      mother: titleArea,
      style: {
        display: "inline-block",
        position: "relative",
        height: String(100) + '%',
        width: withOut(designerWidth + projectWidth, ea),
      }
    },
  ]);

  [ contentsDesigner, contentsProject, contentsTime ] = createNodes([
    {
      mother: contentsArea,
      style: {
        display: "inline-block",
        position: "relative",
        height: String(100) + '%',
        width: String(designerWidth) + ea,
        borderRight: "1px solid " + colorChip.gray4,
        boxSizing: "border-box",
        overflowY: "scroll",
        overflowX: "hidden",
      }
    },
    {
      mother: contentsArea,
      style: {
        display: "inline-block",
        position: "relative",
        height: String(100) + '%',
        width: String(projectWidth) + ea,
        borderRight: "1px solid " + colorChip.gray4,
        boxSizing: "border-box",
        overflowY: "scroll",
        overflowX: "hidden",
      }
    },
    {
      mother: contentsArea,
      style: {
        display: "inline-block",
        position: "relative",
        height: String(100) + '%',
        width: withOut(designerWidth + projectWidth, ea),
        boxSizing: "border-box",
        overflowY: "scroll",
        overflowX: "hidden",
      }
    },
  ]);

  createNodes([
    {
      mother: titleDesigner,
      text: "D",
      style: {
        position: "absolute",
        fontSize: String(18) + ea,
        fontWeight: String(500),
        fontFamily: "graphik",
        width: String(100) + '%',
        textAlign: "center",
      }
    },
    {
      mother: titleProject,
      text: "P",
      style: {
        position: "absolute",
        fontSize: String(18) + ea,
        fontWeight: String(500),
        fontFamily: "graphik",
        width: String(100) + '%',
        textAlign: "center",
      }
    },
  ]);

  this.calendarTitleTime(titleTime);
  this.calendarContentsDesigner(contentsDesigner);
  this.calendarContentsProject(contentsProject);
  this.calendarContentsTime(contentsTime);

}

DesignerJs.prototype.calendarMatrix = function () {
  const instance = this;
  const { getDateMatrix } = GeneralJs;
  const zeroAddition = function (num) {
    if (num < 10) {
      return `0${String(num)}`;
    } else {
      return String(num);
    }
  }
  class CalendarMatrixFactor {
    getEntireWidth(width, margin) {
      if (typeof width === "number" && typeof margin === "number") {
        return ((width * this.children.length) + (margin * (this.children.length - 1)) + (margin * 3));
      } else {
        throw new Error("invaild arguments");
      }
    }
  }
  class CalendarMatrix extends Array {
    getEntireWidth(width, margin) {
      if (typeof width === "number" && typeof margin === "number") {
        let total;
        total = 0;
        for (let i of this) {
          total += i.getEntireWidth(width, margin);
        }
        return total;
      } else {
        throw new Error("invaild arguments");
      }
    }
  }
  const length = 12;
  let past, future;
  let date, week;
  let dateMatrix;
  let tempArr, tempObj;
  let today;
  let complex;
  let final;
  let pastMonth;

  today = new Date();
  past = today.valueOf();
  today.setMonth(today.getMonth() + length);
  future = today.valueOf();

  date = (((((future - past) / 1000) / 60) / 60) / 24);
  week = Math.floor(date / 7);

  today = new Date(2021, 4, 13);
  dateMatrix = [];
  for (let i = 0; i < week; i++) {
    tempArr = [];
    tempArr.push([ today.getFullYear(), today.getMonth() + 1, today.getDate() ]);
    if (i === 0) {
      if (today.getDay() !== 1) {
        if (today.getDay() !== 0) {
          today.setDate(today.getDate() + 7 - today.getDay());
        }
      } else {
        today.setDate(today.getDate() + 6);
      }
    } else {
      today.setDate(today.getDate() + 6);
    }
    tempArr.push([ today.getFullYear(), today.getMonth() + 1, today.getDate() ]);
    today.setDate(today.getDate() + 1);
    dateMatrix.push(tempArr);
  }

  complex = [];
  for (let i = 0; i < dateMatrix.length; i++) {
    tempObj = {};
    if (dateMatrix[i][0][1] === dateMatrix[i][1][1]) {
      tempObj.year = dateMatrix[i][0][0];
      tempObj.month = dateMatrix[i][0][1];
    } else {
      if (dateMatrix[i][1][2] > 3) {
        tempObj.year = dateMatrix[i][1][0];
        tempObj.month = dateMatrix[i][1][1];
      } else {
        tempObj.year = dateMatrix[i][0][0];
        tempObj.month = dateMatrix[i][0][1];
      }
    }
    tempObj.start = `${String(dateMatrix[i][0][0])}-${zeroAddition(dateMatrix[i][0][1])}-${zeroAddition(dateMatrix[i][0][2])}`;
    tempObj.end = `${String(dateMatrix[i][1][0])}-${zeroAddition(dateMatrix[i][1][1])}-${zeroAddition(dateMatrix[i][1][2])}`;

    complex.push(tempObj);
  }

  final = new CalendarMatrix();
  pastMonth = null;
  tempObj = new CalendarMatrixFactor();
  for (let i = 0; i < complex.length; i++) {
    if (pastMonth === complex[i].month) {
      tempObj.children.push(complex[i]);
    } else {
      tempObj = new CalendarMatrixFactor();
      tempObj.year = complex[i].year;
      tempObj.month = complex[i].month;
      tempObj.children = [];
      tempObj.children.push(complex[i]);
      final.push(tempObj);
    }
    pastMonth = complex[i].month;
  }

  return final;
}

DesignerJs.prototype.calendarTitleTime = function (mother) {
  const instance = this;

}

DesignerJs.prototype.calendarContentsDesigner = function (mother) {
  const instance = this;

}

DesignerJs.prototype.calendarContentsProject = function (mother) {
  const instance = this;

}

DesignerJs.prototype.calendarContentsTime = function (mother) {
  const instance = this;
  const { ea } = this;
  const { createNodes, colorChip, ajaxJson } = GeneralJs;
  const matrix = this.calendarMatrix();
  let width, margin;
  let totalWidth;
  let nodeArr;

  width = 200;
  margin = 20;
  totalWidth = matrix.getEntireWidth(width, margin);

  nodeArr = [];
  


  createNodes([
    {
      mother,
      style: {
        position: "relative",
        width: String(totalWidth) + ea,
        height: String(60) + ea,
        background: colorChip.gradientGreen2,
      }
    }
  ]);

}

DesignerJs.prototype.calendarView = async function () {
  const instance = this;
  try {
    const { createNodes, colorChip, ajaxJson } = GeneralJs;
    const designers = await ajaxJson({ noFlat: true }, "/getDesigners");

    this.designers = new Designers(designers);


    this.calendarBase();



  } catch (e) {
    console.log(e);
  }
}
