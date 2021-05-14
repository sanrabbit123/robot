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
  designerWidth = 110;
  projectWidth = 110;
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
      opacity: String(0),
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
    },
    {
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(margin + titleHeight) + ea,
        left: String(margin) + ea,
        width: String(designerWidth + projectWidth + 1) + ea,
        height: withOut(margin + titleHeight, ea),
        border: "1px solid " + colorChip.gray4,
        borderBottom: String(0),
        borderTopLeftRadius: String(5) + "px",
        boxSizing: "border-box",
        zIndex: String(1),
      }
    },
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
        overflow: "hidden",
      }
    },
  ]);

  [ contentsTime ] = createNodes([
    {
      mother: contentsArea,
      style: {
        display: "inline-block",
        position: "relative",
        height: String(100) + '%',
        width: withOut(1, ea),
        top: String(1) + ea,
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
        fontSize: String(size) + ea,
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
        fontSize: String(size) + ea,
        fontWeight: String(500),
        fontFamily: "graphik",
        width: String(100) + '%',
        textAlign: "center",
      }
    },
  ]);

  this.calendarTitleTime(titleTime);
  this.calendarContentsTime(contentsTime, designerWidth, projectWidth);

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
    constructor() {
      super();
      this.today = new Date();
      this.year = this.today.getFullYear();
      this.month = this.today.getMonth() + 1;
      this.date = this.today.getDate();
      this.day = this.today.getDay();
      const firstDate = new Date(this.year, this.month - 1, 1);
      const day = firstDate.getDay();
      const add = day !== 0 ? day - 1 : 6;
      this.weekOrder = Math.ceil((add + this.date) / 7);
    }
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
  const length = 8;
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
  const { ea, designers } = this;
  const { width, margin, height } = this.moduleBox;
  const { createNode, createNodes, colorChip, ajaxJson, withOut } = GeneralJs;
  const matrix = this.matrix;
  let nodeArr;
  let size;
  let totalWidth;
  let tempObj;
  let entireTong;

  size = 18;

  totalWidth = matrix.getEntireWidth(width, margin);

  entireTong = createNode({
    mother,
    class: [ "moveTarget" ],
    style: {
      position: "relative",
      width: String(totalWidth) + ea,
      height: String(height) + ea,
      marginLeft: String((margin * 4) - 1) + ea,
      borderRadius: String(3) + "px",
    }
  });
  nodeArr = [];
  for (let i = 0; i < matrix.length; i++) {
    tempObj = {
      mother: entireTong,
      style: {
        display: "inline-block",
        position: "relative",
        width: String(matrix[i].getEntireWidth(width, margin)) + ea,
        height: String(height) + ea,
      }
    };
    nodeArr.push(tempObj);
    tempObj = {
      mother: -1,
      text: String(matrix[i].month),
      style: {
        position: "absolute",
        top: String(0) + ea,
        left: String(1) + ea,
        fontSize: String(size) + ea,
        fontFamily: "graphik",
        fontWeight: String(500),
      }
    };
    nodeArr.push(tempObj);
  }
  createNodes(nodeArr);

}

DesignerJs.prototype.calendarContentsTime = function (mother, box0Width, box1Width) {
  const instance = this;
  const { ea, designers } = this;
  const { width, margin, height } = this.moduleBox;
  const { createNode, createNodes, colorChip, ajaxJson, withOut } = GeneralJs;
  const matrix = this.matrix;
  const classNameX = "calendarModuleX";
  const classNameY = "calendarModuleY";
  const classNameXY = "calendarModuleXY";
  const classNameTextY = "calendarTextY";
  const moduleEvent = function (e) {
    const x = Number(this.getAttribute('x'));
    const y = Number(this.getAttribute('y'));
    const toggle = this.getAttribute("toggle");
    const text = this.getAttribute("value");
    const lineDoms = document.querySelectorAll('.' + classNameY + '_' + y);
    let num, domX;
    let tempArr, tempDom;
    let textDom;
    let firstDom, lastDom;
    let directNum;
    let linkFirstNum, linkLastNum;

    if (toggle === "off") {
      num = 0;
      directNum = 0;
      for (let dom of lineDoms) {
        if (dom.getAttribute("toggle") === "on") {
          num = num + 1;
          if (dom.getAttribute("link") !== "on") {
            domX = Number(dom.getAttribute('x'));
          }
        }
        if (dom.getAttribute("direct") === "on") {
          directNum = directNum + 1;
        }
      }
      if (directNum % 2 === 0) {
        this.style.background = colorChip.gradientGreen4;
        this.setAttribute("toggle", "on");
        this.setAttribute("direct", "on");

      } else if (directNum % 2 === 1) {
        tempArr = [];
        tempArr.push(x);
        tempArr.push(domX);
        tempArr.sort((a, b) => { return a - b; });
        for (let i = tempArr[0]; i < tempArr[1] + 1; i++) {
          tempDom = document.querySelector('.' + classNameXY + '_' + String(i) + '_' + String(y));
          tempDom.style.background = colorChip.gradientGreen4;
          tempDom.setAttribute("toggle", "on");
          tempDom.setAttribute("link", "on");
          if (i === tempArr[0]) {
            firstDom = tempDom;
          }
          if (i === tempArr[1]) {
            lastDom = tempDom;
          }
        }
        firstDom.setAttribute("direct", "on");
        lastDom.setAttribute("direct", "on");
        textDom = GeneralJs.createNode({
          mother: this,
          style: {
            position: "absolute",
            width: String(lastDom.getBoundingClientRect().left - firstDom.getBoundingClientRect().left + width) + ea,
            top: String(0) + ea,
            left: tempArr[0] === x ? String(0) + ea : "",
            right: tempArr[0] === x ? "" : String(0) + ea,
            height: String(100) + '%',
            background: colorChip.gradientGreen4,
            borderRadius: String(3) + "px",
            zIndex: String(1),
          }
        });
      }

      textDom = GeneralJs.createNode({
        mother: this,
        text,
        style: {
          position: "absolute",
          width: String(width) + ea,
          textAlign: "center",
          fontSize: String(18) + ea,
          top: String(3) + ea,
          fontFamily: "graphik",
          fontWeight: String(300),
          color: colorChip.white,
          zIndex: String(2),
        }
      });
      textDom.style.wordSpacing = String(-4) + ea;
    } else {

      if (this.getAttribute("link") === "off") {
        this.style.background = colorChip.gray2;
        this.setAttribute("toggle", "off");
        this.setAttribute("direct", "off");
        this.setAttribute("link", "off");
        GeneralJs.cleanChildren(this);
      } else {
        num = x;
        do {
          linkFirstNum = num;
          num = num - 1;
        } while (lineDoms[num].getAttribute("link") === "on");

        num = x;
        do {
          linkLastNum = num;
          num = num + 1;
        } while (lineDoms[num].getAttribute("link") === "on");

        for (let i = linkFirstNum; i < linkLastNum + 1; i++) {
          lineDoms[i].style.background = colorChip.gray2;
          lineDoms[i].setAttribute("toggle", "off");
          lineDoms[i].setAttribute("direct", "off");
          lineDoms[i].setAttribute("link", "off");
          GeneralJs.cleanChildren(lineDoms[i]);
        }

      }
    }

  }
  const createBlock = function (mother, width, margin, barHeight, y) {
    let totalWidth;
    let nodeArr;
    let tempObj;
    let entireTong;
    let x;

    totalWidth = matrix.getEntireWidth(width, margin);

    entireTong = createNode({
      mother,
      attribute: [
        { y },
      ],
      class: [ "moveTarget" ],
      events: [
        {
          type: "mouseover",
          event: function (e) {
            const y = Number(this.getAttribute('y'));
            const targets = document.querySelectorAll('.' + classNameTextY + '_' + y);
            for (let dom of targets) {
              dom.style.color = colorChip.green;
            }
          }
        },
        {
          type: "mouseleave",
          event: function (e) {
            const y = Number(this.getAttribute('y'));
            const targets = document.querySelectorAll('.' + classNameTextY + '_' + y);
            for (let dom of targets) {
              dom.style.color = colorChip.black;
            }
          }
        },
      ],
      style: {
        position: "relative",
        width: String(totalWidth) + ea,
        height: String(barHeight) + ea,
        marginTop: String(margin * 1) + ea,
        marginLeft: String((margin * 4) - 1) + ea,
        borderRadius: String(3) + "px",
      }
    });
    nodeArr = [];

    x = 0;
    for (let i = 0; i < matrix.length; i++) {
      tempObj = {
        mother: entireTong,
        style: {
          display: "inline-block",
          position: "relative",
          width: String(matrix[i].getEntireWidth(width, margin)) + ea,
          height: String(barHeight) + ea,
        }
      };
      nodeArr.push(tempObj);
      for (let j = 0; j < matrix[i].children.length; j++) {
        tempObj = {
          mother: -1 * ((1 * j) + 1),
          attribute: [
            { x: String(x) },
            { y: String(y) },
            { toggle: "off" },
            { value: String(matrix[i].month) + ' - ' + String((i === 0 ? instance.matrix.weekOrder : 1) + j) },
            { direct: "off" },
            { link: "off" },
          ],
          events: [
            {
              type: "click",
              event: moduleEvent
            }
          ],
          class: [
            classNameX + "_" + String(x),
            classNameY + "_" + String(y),
            classNameXY + "_" + String(x) + '_' + String(y),
          ],
          style: {
            display: "inline-block",
            position: "relative",
            width: String(width) + ea,
            height: withOut(0, ea),
            marginRight: String(margin) + ea,
            background: colorChip.gray2,
            borderRadius: String(3) + "px",
            cursor: "pointer",
            transition: "all 0s ease",
          }
        };
        nodeArr.push(tempObj);

        x++;
      }
    }
    createNodes(nodeArr);
  }
  let designerBox;
  let pastTop;
  let boxHeight;
  let nodeArr;
  let size;
  let textTop;
  let y;

  size = 16;
  pastTop = 0;
  textTop = 14;
  y = 0;

  for (let i = 0; i < designers.length; i++) {
    boxHeight = (margin * 5) + (height + (margin * 1)) + ((height + (margin * 1)) * designers[i].projects.length);

    nodeArr = [
      {
        mother,
        style: {
          display: "block",
          position: "absolute",
          width: String(box0Width) + ea,
          top: String(pastTop) + ea,
          left: String(0) + ea,
          height: String(boxHeight) + ea,
          borderBottom: "1px solid " + colorChip.gray4,
          background: colorChip.white,
          zIndex: String(1),
        }
      },
      {
        mother: -1,
        text: designers[i].designer,
        class: [ classNameTextY + "_" + String(y) ],
        style: {
          position: "absolute",
          fontSize: String(size) + ea,
          fontWeight: String(600),
          width: String(100) + '%',
          textAlign: "center",
          top: String(textTop) + ea,
        }
      },
      {
        mother,
        style: {
          display: "block",
          position: "absolute",
          width: String(box1Width) + ea,
          top: String(pastTop) + ea,
          left: String(box0Width) + ea,
          height: String(boxHeight) + ea,
          borderBottom: "1px solid " + colorChip.gray4,
          borderLeft: "1px solid " + colorChip.gray4,
          background: colorChip.white,
          zIndex: String(1),
        }
      },
      {
        mother: -1,
        text: "가능 시간",
        class: [ classNameTextY + "_" + String(y) ],
        style: {
          position: "absolute",
          fontSize: String(size) + ea,
          fontWeight: String(300),
          width: String(100) + '%',
          textAlign: "center",
          top: String(textTop) + ea,
        }
      }
    ];

    for (let j = 0; j < designers[i].projects.length; j++) {
      nodeArr.push({
        mother: -1 + (-1 * (j + 1)),
        text: designers[i].projects[j].name,
        class: [ classNameTextY + "_" + String(y + (j + 1)) ],
        style: {
          position: "absolute",
          fontSize: String(size) + ea,
          fontWeight: String(300),
          width: String(100) + '%',
          textAlign: "center",
          top: String(textTop + ((height + (margin * 1)) * (j + 1))) + ea,
        }
      });
      nodeArr[nodeArr.length - 1 - 2 + (-1 * (j + 1))].class.push(classNameTextY + "_" + String(y + (j + 1)));
    }

    createNodes(nodeArr);

    pastTop += boxHeight + 1;

    designerBox = createNode({
      mother,
      style: {
        display: "block",
        position: "relative",
        left: String(box0Width + box1Width) + ea,
        width: withOut(box0Width + box1Width, ea),
        paddingTop: String(margin * 2) + ea,
        paddingBottom: String(margin * 3) + ea,
        borderBottom: "1px solid " + colorChip.gray4,
      }
    });
    for (let j = 0; j < designers[i].projects.length + 1; j++) {
      createBlock(designerBox, width, margin, height, y);
      y++;
    }
  }

}

DesignerJs.prototype.calendarView = async function () {
  const instance = this;
  try {
    const { createNodes, colorChip, ajaxJson, sleep } = GeneralJs;
    let designers, projects, clients;
    let desidArr, cliidArr;
    let desidArr_raw;
    let loading;

    loading = await this.mother.loadingRun();

    projects = await ajaxJson({
      noFlat: true,
      whereQuery: {
        $and: [
          { desid: { $regex: "^d" } },
          { "process.status": { $regex: "^[대진]" } }
        ]
      }
    }, "/getProjects");
    desidArr_raw = [];
    for (let project of projects) {
      desidArr_raw.push(project.desid);
    }
    desidArr_raw = Array.from(new Set(desidArr_raw));
    desidArr = [];
    for (let desid of desidArr_raw) {
      desidArr.push({ desid });
    }
    cliidArr = [];
    for (let project of projects) {
      cliidArr.push({ cliid: project.cliid });
    }

    designers = await ajaxJson({
      noFlat: true,
      whereQuery: {
        $or: [
          { $or: desidArr },
          { "information.contract.status": { $regex: "완료" } }
        ]
      }
    }, "/getDesigners");

    clients = await ajaxJson({
      noFlat: true,
      whereQuery: {
        $or: cliidArr
      }
    }, "/getClients");

    this.designers = new Designers(designers);
    this.designers.setProjects(projects);
    this.designers.setClients(clients);

    this.moduleBox = {
      width: 58,
      height: 34,
      margin: 3,
    };

    this.matrix = this.calendarMatrix();
    this.calendarBase();

    await sleep(500);

    loading.parentNode.removeChild(loading);
    this.totalMother.style.animation = "fadeup 0.3s ease forwards";

  } catch (e) {
    console.log(e);
  }
}
