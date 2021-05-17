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
  let dashBoardHeight, dashBoardMargin;
  let dashBoard;

  titleHeight = 34;
  margin = 30;
  designerWidth = 110;
  projectWidth = 110;
  size = 18;
  dashBoardHeight = 49;
  dashBoardMargin = 16;

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

  [ borderBack, dashBoard, titleArea, contentsArea ] = createNodes([
    {
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(margin + dashBoardHeight + dashBoardMargin + titleHeight) + ea,
        left: String(margin) + ea,
        width: withOut(margin * 2, ea),
        height: withOut(margin + dashBoardHeight + dashBoardMargin + titleHeight, ea),
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
        height: String(dashBoardHeight) + ea,
        marginBottom: String(dashBoardMargin) + ea,
        background: colorChip.gray1,
        borderRadius: String(3) + "px",
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
        height: withOut(dashBoardHeight + dashBoardMargin + titleHeight, ea),
      }
    },
    {
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(margin + dashBoardHeight + dashBoardMargin + titleHeight) + ea,
        left: String(margin) + ea,
        width: String(designerWidth + projectWidth + 1) + ea,
        height: withOut(margin + dashBoardHeight + dashBoardMargin + titleHeight, ea),
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

  this.calendarSpec.contentsTime = contentsTime;
  this.calendarSpec.designerWidth = designerWidth;
  this.calendarSpec.projectWidth = projectWidth;
  this.calendarDashBoard = dashBoard;

  this.calendarTitleTime(titleTime);
  this.calendarContentsTime();
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

DesignerJs.prototype.calendarContentsTime = function (search = null) {
  const instance = this;
  const { ea } = this;
  const { createNode, createNodes, colorChip, ajaxJson, withOut, cleanChildren } = GeneralJs;
  const { contentsTime: mother, designerWidth: box0Width, projectWidth: box1Width } = this.calendarSpec;
  let designers;

  if (mother.firstChild !== null && mother.firstChild !== undefined) {
    cleanChildren(mother);
  }
  if (search === null || search === undefined) {
    designers = this.designers;
  } else {
    designers = this.designers.search(search);
  }

  const { width, margin, height } = this.moduleBox;
  const { classNameX, classNameY, classNameXY, classNameTextY, classNameDesid, classDesignerBox, classCalendarBarName } = this.calendarClass;
  const matrix = this.matrix;
  const stringToDate = function (str) {
    if (!/^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$/.test(str)) {
      throw new Error("invaild input");
    }
    const arr = str.split('-');
    return new Date(Number(arr[0]), Number(arr[1].replace(/^0/, '')) - 1, Number(arr[2].replace(/^0/, '')));
  }
  const detailTimeEvent = function (e) {
    const that = this;
    const { ea } = instance;
    const x = Number(this.getAttribute('x'));
    const y = Number(this.getAttribute('y'));
    const text = this.getAttribute("value");
    const meeting = this.getAttribute("meeting");
    const possibleTimes = (this.getAttribute("possible") === "true");
    const start = this.getAttribute("start");
    const end = this.getAttribute("end");
    const spot = this.getAttribute("spot");
    const { createNodes, colorChip, withOut } = GeneralJs;
    let width, height, outerMargin, margin;
    let doms;
    let nodeArr;
    let topMargin, leftMargin, bottomMargin;
    let size;

    width = 218;
    height = meeting !== "on" ? 82 : 58;
    outerMargin = 10;
    margin = 5;

    size = 17;
    topMargin = 10;
    leftMargin = 18;
    bottomMargin = 7;

    if (this.getAttribute("memo") !== "on") {

      nodeArr = [
        {
          mother: this,
          mode: "aside",
          events: [
            {
              type: "click",
              event: function (e) {
                e.preventDefault();
                e.stopPropagation();
              }
            },
            {
              type: "contextmenu",
              event: function (e) {
                e.preventDefault();
                e.stopPropagation();
                const doms = that.querySelectorAll("aside");
                for (let dom of doms) {
                  that.removeChild(dom);
                }
                that.setAttribute("memo", "off");
              }
            },
          ],
          style: {
            position: "absolute",
            width: String(width) + ea,
            height: String(height) + ea,
            top: String(-1 * (height + outerMargin)) + ea,
            left: withOut(50, width / 2, ea),
            background: meeting === "on" ? colorChip.red : (!possibleTimes ? colorChip.gradientGreen : colorChip.yellow),
            borderRadius: String(3) + "px",
            zIndex: String(2),
            opacity: String(0.95),
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          }
        },
        {
          mother: -1,
          style: {
            position: "absolute",
            width: withOut(margin * 2, ea),
            height: withOut(margin * 2, ea),
            top: String(margin) + ea,
            left: String(margin) + ea,
            borderRadius: String(3) + "px",
            background: colorChip.white,
          }
        }
      ];

      nodeArr.push({
        mother: -1,
        text: "시작 날짜 : ",
        style: {
          position: "absolute",
          top: String(topMargin) + ea,
          left: String(leftMargin) + ea,
          fontSize: String(size) + ea,
          fontWeight: String(600),
        }
      });
      nodeArr.push({
        mother: -2,
        mode: "input",
        attribute: [
          { value: /_/g.test(spot) ? (spot.split('_')[0] !== "null" ? spot.split('_')[0] : start.split('_')[0]) : (spot !== "null" ? spot : start) },
          { type: "text" },
        ],
        events: [
          {
            type: "blur",
            event: function (e) {
              if (/^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$/.test(this.value.trim())) {
                const desid = that.getAttribute("desid");
                const proid = that.getAttribute("proid");
                const x = /_/g.test(that.getAttribute("x")) ? that.getAttribute("x").split('_')[0] : that.getAttribute("x");
                const target = document.getElementById(classNameDesid + '-' + desid + '-' + proid + '-' + x);
                const startDate = stringToDate(target.getAttribute("start"));
                const endDate = stringToDate(target.getAttribute("end"));
                const thisDate = stringToDate(this.value.trim());
                if (thisDate.valueOf() >= startDate.valueOf() && thisDate.valueOf() <= endDate.valueOf()) {
                  target.setAttribute("spot", this.value.trim());
                  if (/_/g.test(spot)) {
                    that.setAttribute("spot", this.value.trim() + '_' + spot.split('_')[1]);
                  }
                } else {
                  this.value = (/_/g.test(spot) ? (spot.split('_')[0] !== "null" ? spot.split('_')[0] : start.split('_')[0]) : (spot !== "null" ? spot : start));
                }
              } else {
                this.value = (/_/g.test(spot) ? (spot.split('_')[0] !== "null" ? spot.split('_')[0] : start.split('_')[0]) : (spot !== "null" ? spot : start));
              }
            }
          }
        ],
        style: {
          position: "absolute",
          top: String(topMargin) + ea,
          right: String(leftMargin + 1) + ea,
          fontSize: String(size) + ea,
          border: String(0),
          outline: String(0),
          width: String(98) + ea,
          textAlign: "right",
          fontWeight: String(200),
        }
      });

      if (meeting !== "on") {
        nodeArr.push({
          mother: -3,
          text: "종료 날짜 : ",
          style: {
            position: "absolute",
            top: String(size + bottomMargin + topMargin) + ea,
            left: String(leftMargin) + ea,
            fontSize: String(size) + ea,
            fontWeight: String(600),
          }
        });
        nodeArr.push({
          mother: -4,
          mode: "input",
          attribute: [
            { value: /_/g.test(spot) ? (spot.split('_')[1] !== "null" ? spot.split('_')[1] : end.split('_')[1]) : (spot !== "null" ? spot : end) },
            { type: "text" },
          ],
          events: [
            {
              type: "blur",
              event: function (e) {
                if (/^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$/.test(this.value.trim())) {
                  const desid = that.getAttribute("desid");
                  const proid = that.getAttribute("proid");
                  const x = /_/g.test(that.getAttribute("x")) ? that.getAttribute("x").split('_')[1] : that.getAttribute("x");
                  const target = document.getElementById(classNameDesid + '-' + desid + '-' + proid + '-' + x);
                  const startDate = stringToDate(target.getAttribute("start"));
                  const endDate = stringToDate(target.getAttribute("end"));
                  const thisDate = stringToDate(this.value.trim());
                  if (thisDate.valueOf() >= startDate.valueOf() && thisDate.valueOf() <= endDate.valueOf()) {
                    target.setAttribute("spot", this.value.trim());
                    if (/_/g.test(spot)) {
                      that.setAttribute("spot", spot.split('_')[1] + '_' + this.value.trim());
                    }
                  } else {
                    this.value = (/_/g.test(spot) ? (spot.split('_')[1] !== "null" ? spot.split('_')[1] : end.split('_')[1]) : (spot !== "null" ? spot : end));
                  }
                } else {
                  this.value = (/_/g.test(spot) ? (spot.split('_')[1] !== "null" ? spot.split('_')[1] : end.split('_')[1]) : (spot !== "null" ? spot : end));
                }
              }
            }
          ],
          style: {
            position: "absolute",
            top: String(size + bottomMargin + topMargin) + ea,
            right: String(leftMargin + 1) + ea,
            fontSize: String(size) + ea,
            border: String(0),
            outline: String(0),
            width: String(98) + ea,
            textAlign: "right",
            fontWeight: String(200),
          }
        });
      }

      createNodes(nodeArr);
      this.setAttribute("memo", "on");

    } else {
      doms = this.querySelectorAll("aside");
      for (let dom of doms) {
        this.removeChild(dom);
      }
      this.setAttribute("memo", "off");
    }

  }
  const moduleEvent = function (e) {
    if (e.cancelable) {
      e.preventDefault();
    }
    e.stopPropagation();
    const that = this;
    const { createNode, cleanChildren, colorChip } = GeneralJs;
    const x = Number(this.getAttribute('x'));
    const y = Number(this.getAttribute('y'));
    const toggle = this.getAttribute("toggle");
    const text = this.getAttribute("value");
    const possibleTimes = (this.getAttribute("possible") === "true");
    const lineDoms = document.querySelectorAll('.' + classNameY + '_' + y);
    let num, domX;
    let tempArr, tempDom;
    let textDom;
    let firstDom, lastDom;
    let directNum;
    let linkFirstNum, linkLastNum;
    let size0, size1;
    let textTop0, textTop1;
    let calendarBar;

    size0 = 16;
    size1 = 17;
    textTop0 = 6;
    textTop1 = 3;

    if (toggle === "off") {
      num = 0;
      directNum = 0;
      for (let dom of lineDoms) {
        if (dom.getAttribute("toggle") === "on") {
          num = num + 1;
          if (dom.getAttribute("link") !== "on" && dom.getAttribute("meeting") !== "on") {
            domX = Number(dom.getAttribute('x'));
          }
        }
        if (dom.getAttribute("direct") === "on") {
          directNum = directNum + 1;
        }
      }
      if (directNum % 2 === 0 || (e.type === "contextmenu" && !possibleTimes)) {
        this.style.background = !possibleTimes ? (e.type === "click" ? colorChip.gradientGreen4 : colorChip.red) : colorChip.yellow;
        this.setAttribute("toggle", "on");
        if (!possibleTimes) {
          if (e.type === "click") {
            this.setAttribute("direct", "on");
          } else {
            this.setAttribute("meeting", "on");
          }
        } else {
          this.setAttribute("direct", "on");
        }

      } else if (directNum % 2 === 1) {
        tempArr = [];
        tempArr.push(x);
        tempArr.push(domX);
        tempArr.sort((a, b) => { return a - b; });
        for (let i = tempArr[0]; i < tempArr[1] + 1; i++) {
          tempDom = document.querySelector('.' + classNameXY + '_' + String(i) + '_' + String(y));
          tempDom.style.background = !possibleTimes ? colorChip.gradientGreen4 : colorChip.yellow;
          tempDom.setAttribute("toggle", "on");
          tempDom.setAttribute("link", "on");
          if (i === tempArr[0]) {
            firstDom = tempDom;
          }
          if (i === tempArr[1]) {
            lastDom = tempDom;
          }
          if (i !== tempArr[0] && i !== tempArr[1] && possibleTimes) {
            createNode({
              mother: tempDom,
              attribute: [ { value: text } ],
              text: "가능",
              style: {
                position: "absolute",
                width: String(width) + ea,
                textAlign: "center",
                fontSize: String(size0) + ea,
                top: String(textTop0) + ea,
                fontWeight: String(300),
                color: colorChip.white,
                zIndex: String(2),
              }
            });
          }
        }
        firstDom.setAttribute("direct", "on");
        lastDom.setAttribute("direct", "on");
        if (!possibleTimes) {
          calendarBar = createNode({
            mother: this,
            class: [ classCalendarBarName ],
            attribute: [
              { value: text },
              { start: firstDom.getAttribute("start") + "_" + lastDom.getAttribute("start") },
              { end: firstDom.getAttribute("end") + "_" + lastDom.getAttribute("end") },
              { spot: firstDom.getAttribute("spot") + "_" + lastDom.getAttribute("spot") },
              { x: firstDom.getAttribute("x") + "_" + lastDom.getAttribute("x") },
              { y: firstDom.getAttribute("y") },
              { desid: firstDom.getAttribute("desid") },
              { proid: firstDom.getAttribute("proid") }
            ],
            events: [
              {
                type: "click",
                event: function (e) {
                  if (e.cancelable) {
                    e.preventDefault();
                  }
                  if (this.getAttribute("memo") === "on") {
                    e.stopPropagation();
                    detailTimeEvent.call(this, e);
                  }
                }
              },
              {
                type: "contextmenu",
                event: function (e) {
                  if (e.cancelable) {
                    e.preventDefault();
                  }
                  e.stopPropagation();
                  detailTimeEvent.call(this, e);
                }
              },
            ],
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
          if (this !== firstDom) {
            firstDom.firstChild.style.zIndex = String(3);
            GeneralJs.timeouts["barMake"] = setTimeout(function () {
              calendarBar.style.zIndex = String(2);
              clearTimeout(GeneralJs.timeouts["barMake"]);
              GeneralJs.timeouts["barMake"] = null;
            }, 0);
          }
        }
      }

      if (!possibleTimes) {
        textDom = createNode({
          mother: this,
          attribute: [ { value: text } ],
          text: e.type === "click" ? text : "미팅",
          style: {
            position: "absolute",
            width: String(width) + ea,
            textAlign: "center",
            fontSize: String(e.type === "click" ? size1 : size0) + ea,
            top: String(e.type === "click" ? textTop1 : textTop0) + ea,
            fontFamily: e.type === "click" ? "graphik" : "",
            fontWeight: String(300),
            color: colorChip.white,
            zIndex: String(2),
          }
        });
        textDom.style.wordSpacing = String(-4) + ea;
      } else {
        createNode({
          mother: this,
          attribute: [ { value: text } ],
          text: "가능",
          style: {
            position: "absolute",
            width: String(width) + ea,
            textAlign: "center",
            fontSize: String(size0) + ea,
            top: String(textTop0) + ea,
            fontWeight: String(300),
            color: colorChip.white,
            zIndex: String(2),
          }
        });
      }

    } else {

      if (e.type === "click" && this.getAttribute("memo") !== "on") {

        if (e.altKey) {
          if (this.getAttribute("link") === "off") {
            this.style.background = !possibleTimes ? colorChip.gray2 : colorChip.gray3;
            this.setAttribute("toggle", "off");
            this.setAttribute("direct", "off");
            this.setAttribute("link", "off");
            this.setAttribute("meeting", "off");
            cleanChildren(this);
          } else {
            num = x;
            do {
              linkFirstNum = num;
              num = num - 1;
            } while (lineDoms[num] !== undefined && lineDoms[num].getAttribute("link") === "on");
            num = x;
            do {
              linkLastNum = num;
              num = num + 1;
            } while (lineDoms[num] !== undefined && lineDoms[num].getAttribute("link") === "on");
            for (let i = linkFirstNum; i < linkLastNum + 1; i++) {
              lineDoms[i].style.background = !possibleTimes ? colorChip.gray2 : colorChip.gray3;
              lineDoms[i].setAttribute("toggle", "off");
              lineDoms[i].setAttribute("direct", "off");
              lineDoms[i].setAttribute("link", "off");
              lineDoms[i].setAttribute("meeting", "off");
              cleanChildren(lineDoms[i]);
            }
          }
        } else {
          if (this.querySelector('.' + classCalendarBarName) !== null) {
            detailTimeEvent.call(this.querySelector('.' + classCalendarBarName), e);
          } else {
            if (this.getAttribute("link") === "off") {
              detailTimeEvent.call(this, e);
            }
          }
        }

      } else {
        detailTimeEvent.call(this, e);
      }

    }
  }
  const createBlock = function (mother, desid, proid, width, margin, barHeight, y, possibleTimes) {
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
          id: classNameDesid + "-" + desid + "-" + proid + '-' + String(x),
          attribute: [
            { x: String(x) },
            { y: String(y) },
            { toggle: "off" },
            { direct: "off" },
            { link: "off" },
            { meeting: "off" },
            { value: String(matrix[i].month) + ' - ' + String((i === 0 ? instance.matrix.weekOrder : 1) + j) },
            { start: matrix[i].children[j].start },
            { end: matrix[i].children[j].end },
            { spot: "null" },
            { possible: possibleTimes ? "true" : "false" },
            { desid },
            { proid },
          ],
          events: [
            {
              type: "click",
              event: moduleEvent
            },
            {
              type: "contextmenu",
              event: moduleEvent
            },
          ],
          class: [
            classNameX + "_" + String(x),
            classNameY + "_" + String(y),
            classNameXY + "_" + String(x) + '_' + String(y),
            classNameDesid + "-" + desid + "-" + proid,
          ],
          style: {
            display: "inline-block",
            position: "relative",
            width: String(width) + ea,
            height: withOut(0, ea),
            marginRight: String(margin) + ea,
            background: !possibleTimes ? colorChip.gray2 : colorChip.gray3,
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
        attribute: [
          { desid: designers[i].desid },
        ],
        class: [ classNameTextY + "_" + String(y), classDesignerBox ],
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
        marginBottom: (i === designers.length - 1) ? String(window.innerHeight / 2) + ea : "",
      }
    });
    for (let j = 0; j < designers[i].projects.length + 1; j++) {
      createBlock(designerBox, designers[i].desid, (j !== 0 ? designers[i].projects[j - 1].proid : "possible"), width, margin, height, y, (j === 0));
      y++;
    }
  }

  this.calendarDashBoardLaunching();
}

DesignerJs.prototype.calendarDashBoardLaunching = function () {
  const instance = this;
  const { ea, calendarDashBoard } = this;
  const { createNodes, colorChip, withOut, cleanChildren } = GeneralJs;
  const { classNameX, classNameY, classNameXY, classNameTextY, classNameDesid, classDesignerBox } = this.calendarClass;
  const firstDoms = document.querySelectorAll('.' + classNameX + '_' + String(0));
  const today = new Date();
  let order;
  let dateText, designerText, projectText;
  let size;
  let width, height;
  let topMargin, leftMargin;
  let designers;
  let desidArr;
  let tempDom, temp;
  let num;

  size = 16;
  width = 400;
  height = 24;
  topMargin = 12;
  leftMargin = 20;

  cleanChildren(calendarDashBoard);

  if (firstDoms.length !== 0) {

    order = Number(firstDoms[0].getAttribute("value").split('-')[1].trim()) - 1;
    dateText = `${String(today.getFullYear())}년 ${String(today.getMonth() + 1)}월 ${String(today.getDate())}일 (${String(today.getMonth() + 1)}월 ${([ '첫', '둘', '셋', '넷', '다섯', '여섯' ])[order]}째주)`;

    desidArr = [];
    designers = document.querySelectorAll('.' + classDesignerBox);
    for (let designer of designers) {
      desidArr.push(designer.getAttribute("desid"));
    }

    num = 0;
    for (let desid of desidArr) {
      tempDom = document.getElementById(classNameDesid + '-' + desid + '-' + "possible" + '-' + String(0));
      if (tempDom.getAttribute("toggle") === "on") {
        num = num + 1;
      }
    }
    designerText = `${String(num)}명`;

    num = 0;
    for (let desid of desidArr) {
      temp = this.designers.getProjectsByDesid(desid);
      num = num + temp.length;
    }
    projectText = `${String(num)}개`;

    createNodes([
      {
        mother: calendarDashBoard,
        style: {
          position: "absolute",
          top: String(topMargin) + ea,
          left: String(leftMargin) + ea,
          width: withOut(leftMargin * 2, ea),
          height: String(height) + ea,
        }
      },
      {
        mother: -1,
        text: "현재 시간 : ",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(size) + ea,
          fontWeight: String(600),
          left: String(0)+ ea,
          top: String(0) + ea
        }
      },
      {
        mother: -2,
        text: dateText,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          marginLeft: String(10)+ ea,
          top: String(0) + ea
        }
      },
      {
        mother: -3,
        text: "가용 디자이너 : ",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(size) + ea,
          fontWeight: String(600),
          marginLeft: String(20)+ ea,
          left: String(0)+ ea,
          top: String(0) + ea
        }
      },
      {
        mother: -4,
        text: designerText,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          marginLeft: String(10)+ ea,
          top: String(0) + ea
        }
      },
      {
        mother: -5,
        text: "진행중 프로젝트 : ",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(size) + ea,
          fontWeight: String(600),
          marginLeft: String(20)+ ea,
          left: String(0)+ ea,
          top: String(0) + ea
        }
      },
      {
        mother: -6,
        text: projectText,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          marginLeft: String(10)+ ea,
          top: String(0) + ea
        }
      },
      {
        mother: calendarDashBoard,
        mode: "svg",
        source: this.mother.returnRinitial(colorChip.black),
        class: [ "hoverDefault_lite" ],
        events: [
          {
            type: "click",
            event: function (e) {
              window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general";
            }
          }
        ],
        style: {
          position: "absolute",
          top: String(topMargin + 5) + ea,
          right: String(leftMargin) + ea,
          height: String(size - 3) + ea,
        }
      }
    ]);

  } else {
    this.calendarContentsTime();
  }

}

DesignerJs.prototype.calendarSearchEvent = function () {
  const instance = this;
  const { ea } = this;
  const input = this.searchInput;
  let width;

  width = 800;

  input.parentNode.style.width = String(width) + ea;
  input.parentNode.style.left = GeneralJs.withOut(50, width / 2, ea);
  input.addEventListener("keypress", function (e) {
    if (GeneralJs.confirmKeyCode.includes(e.keyCode)) {
      instance.calendarContentsTime(this.value.trim());
    }
  });
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
    this.calendarSpec = {};
    this.calendarClass = {
      classNameX: "calendarModuleX",
      classNameY: "calendarModuleY",
      classNameXY: "calendarModuleXY",
      classNameTextY: "calendarTextY",
      classNameDesid: "calendar",
      classDesignerBox: "designerBox",
      classCalendarBarName: "calendar_bar"
    };
    this.calendarDashBoard = null;

    this.matrix = this.calendarMatrix();
    this.calendarBase();
    this.calendarSearchEvent();

    await sleep(500);

    loading.parentNode.removeChild(loading);
    this.totalMother.style.animation = "fadeup 0.3s ease forwards";

  } catch (e) {
    console.log(e);
  }
}
