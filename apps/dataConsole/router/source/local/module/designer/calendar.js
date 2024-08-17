DesignerJs.prototype.calendarBase = function (search = null) {
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
  this.calendarContentsTime(search);
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
  const length = 18;
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

  today = new Date();
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
  this.calendarMonthY = {};
  for (let i = 0; i < matrix.length; i++) {
    tempObj = {
      mother: entireTong,
      class: [ "hoverDefault" ],
      attribute: [
        { query: "y" + String(matrix[i].year) + "m" + String(matrix[i].month) }
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            e.preventDefault();
            e.stopPropagation();
            const thisQuery = this.getAttribute("query");
            const tong = instance.calendarMonthY;
            const on = String(1);
            const off = String(0.3);
            let boo, arr;

            boo = false;
            for (let i in tong) {
              if (tong[i] === "off") {
                boo = true;
                break;
              }
            }

            if (!boo) {
              for (let i in tong) {
                if (i !== thisQuery) {
                  tong[i] = "off";
                  arr = document.querySelectorAll('.' + i);
                  for (let j of arr) {
                    j.style.opacity = off;
                  }
                } else {
                  tong[i] = "on";
                }
              }
            } else {
              if (tong[thisQuery] === "off") {
                arr = document.querySelectorAll('.' + thisQuery);
                for (let j of arr) {
                  j.style.opacity = on;
                }
                tong[thisQuery] = "on";
              } else {
                arr = document.querySelectorAll('.' + thisQuery);
                for (let j of arr) {
                  j.style.opacity = off;
                }
                tong[thisQuery] = "off";
              }
            }

          }
        },
        {
          type: "contextmenu",
          event: function (e) {
            e.preventDefault();
            e.stopPropagation();
            const tong = instance.calendarMonthY;
            const on = String(1);
            for (let i in tong) {
              tong[i] = "on";
              arr = document.querySelectorAll('.' + i);
              for (let j of arr) {
                j.style.opacity = on;
              }
            }
          }
        }
      ],
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
    this.calendarMonthY["y" + String(matrix[i].year) + "m" + String(matrix[i].month)] = "on";
  }
  createNodes(nodeArr);
}

DesignerJs.prototype.calendarMonthYSearch = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error("invaild input");
  }
  const instance = this;
  const tong = this.calendarMonthY;
  let targetMonth;
  let tempArr;

  targetMonth = [];
  for (let i of arr) {
    if ((i.trim() !== '') && !Number.isNaN(Number(i.replace(/[^0-9]/g, '')))) {
      targetMonth.push(Number(i.replace(/[^0-9]/g, '')));
    }
  }

  if (targetMonth.includes(0)) {
    for (let i in tong) {
      tong[i] = "on";
    }
  } else {
    for (let i in tong) {
      tempArr = i.split('m');
      if (tempArr.length !== 2) {
        throw new Error("tong error");
      }
      if (targetMonth.includes(Number(tempArr[1].replace(/[^0-9]/g, '')))) {
        tong[i] = "on";
      } else {
        tong[i] = "off";
      }
    }
  }
}

DesignerJs.prototype.calendarContentsTime = async function (search = null, loadingIcon = null) {
  const instance = this;
  const { ea } = this;
  const { createNode, createNodes, colorChip, ajaxJson, withOut, cleanChildren, isMac } = GeneralJs;
  const { contentsTime: mother, designerWidth: box0Width, projectWidth: box1Width } = this.calendarSpec;
  const { DateX, DesignerDate, DesignerDates } = this.calendarDateClass;
  let designers;
  try {
    if (mother.firstChild !== null && mother.firstChild !== undefined) {
      cleanChildren(mother);
    }
    if (search === null || search === undefined) {
      designers = this.designers;
    } else if (typeof search === "string") {
      if (/^d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/i.test(search.trim())) {
        designers = this.designers.search(search);
      } else {
        this.calendarPastQueries.push(search);
        if (search !== '0') {
          // if (/^[0-9]+$/.test(search.replace(/[\,\.\/ ]/g, '').trim())) {
          //   if (this.calendarPastQueries.length > 1) {
          //     search = this.calendarPastQueries[this.calendarPastQueries.length - 2].replace(/0/g, '') + ',' + search;
          //   }
          // }
        }
        if (/[0-9]/g.test(search)) {
          this.calendarMonthYSearch([ ...search.replace(/[^0-9\,]/g, '').split(',') ]);
          search = search.replace(/[0-9]/g, '');
        }
        designers = this.designers.search(search);
      }
    } else {
      throw new Error("invaild search");
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
    this.detailTimeEvent = function (e) {
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
      const { createNodes, colorChip, withOut, isMac } = GeneralJs;
      let width, height, outerMargin, margin;
      let doms;
      let nodeArr;
      let topMargin, leftMargin, bottomMargin;
      let size;

      width = 218;
      height = meeting !== "on" ? (isMac() ? 82 : 80) : 58;
      outerMargin = 10;
      margin = 5;

      size = 17;
      topMargin = isMac() ? 10 : 13;
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
              position: y < 0 ? "fixed" : "absolute",
              width: String(width) + ea,
              height: String(height) + ea,
              top: String(y < 0 ? this.getBoundingClientRect().top - height - outerMargin : -1 * (height + outerMargin)) + ea,
              left: y < 0 ? String(this.getBoundingClientRect().left + (this.getBoundingClientRect().width / 2) - (width / 2)) + ea : withOut(50, width / 2, ea),
              background: meeting === "on" ? colorChip.red : (!possibleTimes ? colorChip.gradientGreen : colorChip.yellow),
              borderRadius: String(3) + "px",
              zIndex: String(3),
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
                  const y = that.getAttribute("y");
                  const target = document.getElementById(classNameDesid + '-' + desid + '-' + proid + '-' + x);
                  const startDate = stringToDate(target.getAttribute("start"));
                  const endDate = stringToDate(target.getAttribute("end"));
                  const thisDate = stringToDate(this.value.trim());
                  if (thisDate.valueOf() >= startDate.valueOf() && thisDate.valueOf() <= endDate.valueOf()) {
                    target.setAttribute("spot", this.value.trim());
                    if (/_/g.test(spot)) {
                      that.setAttribute("spot", this.value.trim() + '_' + spot.split('_')[1]);
                    }
                    instance.calendarData.updateByDoms(document.querySelectorAll('.' + instance.calendarClass.classNameY + '_' + y), x, e.type, e.altKey).then((resultNumber) => {
                      if (resultNumber !== 1) {
                        throw new Error("update error");
                      }
                    }).catch((err) => {
                      console.log(err);
                    });
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
                    const y = that.getAttribute("y");
                    const target = document.getElementById(classNameDesid + '-' + desid + '-' + proid + '-' + x);
                    const startDate = stringToDate(target.getAttribute("start"));
                    const endDate = stringToDate(target.getAttribute("end"));
                    const thisDate = stringToDate(this.value.trim());
                    if (thisDate.valueOf() >= startDate.valueOf() && thisDate.valueOf() <= endDate.valueOf()) {
                      target.setAttribute("spot", this.value.trim());
                      if (/_/g.test(spot)) {
                        that.setAttribute("spot", spot.split('_')[1] + '_' + this.value.trim());
                      }
                      instance.calendarData.updateByDoms(document.querySelectorAll('.' + instance.calendarClass.classNameY + '_' + y), x, e.type, e.altKey).then((resultNumber) => {
                        if (resultNumber !== 1) {
                          throw new Error("update error");
                        }
                      }).catch((err) => {
                        console.log(err);
                      });
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
    this.moduleEvent = function (e) {
      if (e.cancelable) {
        e.preventDefault();
      }
      e.stopPropagation();
      const that = this;
      const { createNode, cleanChildren, colorChip, isMac } = GeneralJs;
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
      let updateBoo;

      size0 = 16;
      size1 = 17;
      textTop0 = isMac() ? 6 : 8;
      textTop1 = 3;

      if (toggle === "off") {
        updateBoo = true;
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
              mother: firstDom,
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
                      instance.detailTimeEvent.call(this, e);
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
                    instance.detailTimeEvent.call(this, e);
                  }
                },
              ],
              style: {
                position: "absolute",
                width: String(lastDom.getBoundingClientRect().left - firstDom.getBoundingClientRect().left + width) + ea,
                top: String(0) + ea,
                left: String(0) + ea,
                height: String(100) + '%',
                background: colorChip.gradientGreen4,
                borderRadius: String(3) + "px",
                zIndex: String(2),
              }
            });
            firstDom.appendChild(firstDom.firstChild);
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
              color: colorChip.whiteBlack,
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

        updateBoo = false;

        if (e.type === "click" && this.getAttribute("memo") !== "on") {

          if (e.altKey) {
            updateBoo = true;
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
              instance.detailTimeEvent.call(this.querySelector('.' + classCalendarBarName), e);
            } else {
              if (this.getAttribute("link") === "off") {
                instance.detailTimeEvent.call(this, e);
              }
            }
          }

        } else {
          instance.detailTimeEvent.call(this, e);
        }

      }

      if (updateBoo) {
        if (!e.ctrlKey) {
          instance.calendarData.updateByDoms(lineDoms, x, e.type, e.altKey).then((resultNumber) => {
            if (resultNumber !== 1) {
              throw new Error("update error");
            }
          }).catch((err) => {
            console.log(err);
          });
        }
      }

    }
    this.countEvent = function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.altKey) {
        const x = this.getAttribute('x');
        const y = this.getAttribute('y');
        const desid = this.getAttribute('desid');
        const proid = this.getAttribute('proid');
        const { classNameDesid } = instance.calendarClass;
        const lineDoms = document.querySelectorAll('.' + classNameDesid + "-" + desid + "-" + proid);
        let thisValue = Number(this.firstChild.textContent);
        if (e.type === "click") {
          thisValue = thisValue + 1;
        } else {
          thisValue = thisValue - 1;
        }
        this.firstChild.textContent = String(thisValue);
        this.setAttribute("value", String(thisValue));
        if (!e.ctrlKey) {
          instance.calendarData.updateByDoms(lineDoms, x, e.type, e.altKey).then((resultNumber) => {
            if (resultNumber !== 1) {
              throw new Error("update error");
            }
          }).catch((err) => {
            console.log(err);
          });
        }
      }
    }
    let designerBox;
    let pastTop;
    let boxHeight;
    let nodeArr;
    let size;
    let textTop;
    let y;
    let designerNameBox, designerNameBox_clone;

    size = 16;
    pastTop = 0;
    textTop = isMac() ? 14 : 16;
    y = 0;

    setTimeout(async () => {
      for (let i = 0; i < designers.length; i++) {
        boxHeight = (margin * 5) + ((height + (margin * 1)) * (designers[i].projects.length + 2));

        nodeArr = [
          {
            mother,
            attribute: [
              { desid: designers[i].desid },
            ],
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
            text: "가능 개수",
            class: [ classNameTextY + "_" + String(y) ],
            style: {
              position: "absolute",
              fontSize: String(size) + ea,
              fontWeight: String(300),
              width: String(100) + '%',
              textAlign: "center",
              top: String(textTop) + ea,
            }
          },
          {
            mother: -2,
            text: "가능 시간",
            class: [ classNameTextY + "_" + String(y + 1) ],
            style: {
              position: "absolute",
              fontSize: String(size) + ea,
              fontWeight: String(300),
              width: String(100) + '%',
              textAlign: "center",
              top: String(textTop + height + margin) + ea,
            }
          },
        ];

        for (let j = 0; j < designers[i].projects.length; j++) {
          nodeArr.push({
            mother: -1 + (-1 * (j + 2)),
            text: designers[i].projects[j].name,
            attribute: [ { color: /^대/i.test(designers[i].projects[j].process.status) ? colorChip.red : (/^홀/.test(designers[i].projects[j].process.status) ? colorChip.purple : colorChip.black) } ],
            class: [ classNameTextY + "_" + String(y + (j + 2)) ],
            style: {
              position: "absolute",
              fontSize: String(size) + ea,
              fontWeight: String(300),
              width: String(100) + '%',
              textAlign: "center",
              top: String(textTop + ((height + (margin * 1)) * (j + 2))) + ea,
              color: /^대/i.test(designers[i].projects[j].process.status) ? colorChip.red : (/^홀/.test(designers[i].projects[j].process.status) ? colorChip.purple : colorChip.black),
            }
          });
          nodeArr[nodeArr.length - 1 - 2 + (-1 * (j + 2))].class.push(classNameTextY + "_" + String(y + (j + 2)));
        }

        [ designerNameBox ] = createNodes(nodeArr);
        designerNameBox_clone = designerNameBox.cloneNode(false);
        designerNameBox_clone.style.background = "transparent";
        designerNameBox_clone.style.border = String(0);
        designerNameBox_clone.style.zIndex = String(3);
        designerNameBox_clone.style.height = String(Number(designerNameBox_clone.style.height.replace(/[^0-9\-\.]/gi, '')) / 2) + ea;
        designerNameBox_clone.classList.add("hoverDefault");
        designerNameBox_clone.addEventListener("click", function (e) {
          const desid = this.getAttribute("desid");
          window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=possible&desid=" + desid;
        });
        mother.appendChild(designerNameBox_clone);

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
        for (let j = 0; j < designers[i].projects.length + 2; j++) {
          let mother, desid, proid, barHeight, possibleTimes;
          let totalWidth;
          let nodeArr;
          let tempObj;
          let entireTong;
          let x;
          let countMode;

          mother = designerBox;
          desid = designers[i].desid;
          proid = (j > 1 ? designers[i].projects[j - 2].proid : (j === 1 ? "possible" : "count"));
          barHeight = height;
          possibleTimes = j;

          if (possibleTimes === 0) {
            countMode = true;
            possibleTimes = false;
          } else if (possibleTimes === 1) {
            countMode = false;
            possibleTimes = true;
          } else {
            countMode = false;
            possibleTimes = false;
          }

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
                    if (dom.getAttribute("color") !== null) {
                      dom.style.color = dom.getAttribute("color");
                    } else {
                      dom.style.color = colorChip.black;
                    }
                  }
                }
              },
            ],
            style: {
              position: "relative",
              opacity: String(0),
              width: String(totalWidth) + ea,
              height: String(barHeight) + ea,
              marginTop: String(margin * 1) + ea,
              marginLeft: String((margin * 4) - 1) + ea,
              borderRadius: String(3) + "px",
              transform: instance.calendarPastTranslate,
              transition: "all 0.3s ease",
            }
          });

          GeneralJs.setTimeout(() => {
            entireTong.style.opacity = String(1);
          }, 300);

          if (!countMode) {
            nodeArr = [];
            x = 0;
            if (instance.calendarX === null) {
              instance.calendarX = [];
            }
            for (let i = 0; i < matrix.length; i++) {
              tempObj = {
                mother: entireTong,
                class: [ 'y' + String(matrix[i].year) + 'm' + String(matrix[i].month) ],
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: String(matrix[i].getEntireWidth(width, margin)) + ea,
                  height: String(barHeight) + ea,
                  opacity: instance.calendarMonthY['y' + String(matrix[i].year) + 'm' + String(matrix[i].month)] === "on" ? String(1) : String(0.3),
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
                      event: instance.moduleEvent
                    },
                    // {
                    //   type: "contextmenu",
                    //   event: instance.moduleEvent
                    // },
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

                if (instance.calendarX.break !== true) {
                  instance.calendarX.push({
                    start: matrix[i].children[j].start,
                    end: matrix[i].children[j].end
                  });
                }
                x++;
              }
            }
            if (instance.calendarX.break !== true) {
              instance.calendarX.break = true;
            }
            createNodes(nodeArr);
          } else {
            nodeArr = [];
            x = 0;
            for (let i = 0; i < matrix.length; i++) {
              tempObj = {
                mother: entireTong,
                class: [ 'y' + String(matrix[i].year) + 'm' + String(matrix[i].month) ],
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: String(matrix[i].getEntireWidth(width, margin)) + ea,
                  height: String(barHeight) + ea,
                  opacity: instance.calendarMonthY['y' + String(matrix[i].year) + 'm' + String(matrix[i].month)] === "on" ? String(1) : String(0.3),
                }
              };
              nodeArr.push(tempObj);
              tempObj = {
                mother: -1,
                id: classNameDesid + "-" + desid + "-" + proid + '-' + String(x),
                attribute: [
                  { x: String(x) },
                  { y: String(y) },
                  { value: String(5) },
                  { start: matrix[i].children[0].start },
                  { end: matrix[i].children[matrix[i].children.length - 1].end },
                  { desid },
                  { proid },
                  { year: String(matrix[i].year) },
                  { month: String(matrix[i].month) }
                ],
                class: [
                  classNameY + "_" + String(y),
                  classNameXY + "_" + String(x) + '_' + String(y),
                  classNameDesid + "-" + desid + "-" + proid,
                  desid + '-' + proid + '-' + 'y' + String(matrix[i].year) + 'm' + String(matrix[i].month),
                ],
                events: [
                  {
                    type: "click",
                    event: instance.countEvent
                  },
                  {
                    type: "contextmenu",
                    event: instance.countEvent
                  }
                ],
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: String((width * matrix[i].children.length) + (margin * (matrix[i].children.length - 1))) + ea,
                  height: withOut(0, ea),
                  marginRight: String(margin) + ea,
                  background: colorChip.gray2,
                  borderRadius: String(3) + "px",
                  cursor: "pointer",
                  transition: "all 0s ease",
                }
              };
              nodeArr.push(tempObj);
              tempObj = {
                mother: -1,
                text: String(5),
                events: [
                  {
                    type: "selectstart",
                    event: function (e) {
                      e.preventDefault();
                      return false;
                    }
                  }
                ],
                style: {
                  position: "absolute",
                  width: String(100) + '%',
                  textAlign: "center",
                  fontSize: String(17) + ea,
                  top: String(3) + ea,
                  fontFamily: "graphik",
                  fontWeight: String(500),
                  color: colorChip.deactive,
                  zIndex: String(2),
                }
              };
              nodeArr.push(tempObj);
              x = x + matrix[i].children.length;
            }
            createNodes(nodeArr);
          }

          y++;
        }

      }
      if (loadingIcon !== null) {
        loadingIcon.parentElement.removeChild(loadingIcon);
      }
      instance.calendarDashBoardLaunching();
      if (instance.calendarX.constructor.name !== "DateX") {
        instance.calendarX = new DateX(instance.calendarX);
      }
      instance.calendarData.render();
    }, 0);

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.calendarDashBoardLaunching = function () {
  const instance = this;
  const { ea, calendarDashBoard } = this;
  const { createNodes, colorChip, withOut, cleanChildren, isMac } = GeneralJs;
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
  height = isMac() ? 24 : 21;
  topMargin = isMac() ? 12 : 15;
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
              window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general" + (GeneralJs.returnGet().desid === undefined ? "" : "&desid=" + GeneralJs.returnGet().desid);
            }
          }
        ],
        style: {
          position: "absolute",
          top: String(topMargin + 5) + ea,
          right: String(leftMargin) + ea,
          height: String(size - 3) + ea,
        }
      },
      {
        mother: calendarDashBoard,
        mode: "svg",
        source: this.mother.returnHamburger(colorChip.black),
        class: [ "hoverDefault_lite" ],
        events: [
          {
            type: "click",
            event: function (e) {
              instance.calendarContentsTime('0');
            }
          }
        ],
        style: {
          position: "absolute",
          top: String(topMargin + 5.5) + ea,
          right: String(leftMargin + 16) + ea,
          height: String(size - 5) + ea,
        }
      },
    ]);

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
  input.addEventListener("keypress", async function (e) {
    try {
      const value = this.value.trim();
      if (e.key === "Enter") {
        instance.mother.loadingRun().then((loading) => {
          return instance.calendarContentsTime(value, loading);
        }).catch((err) => {
          console.log(err);
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

DesignerJs.prototype.calendarModuleClickDetail = function (mode, alt, desid, proid, x) {
  const instance = this;
  const { classNameDesid } = this.calendarClass;
  if (this.moduleEvent === null || this.countEvent === null) {
    throw new Error("event ready first");
  }
  if (mode !== "click" && mode !== "contextmenu") {
    throw new Error("mode must be String: 'click' or String: 'contextmenu'")
  }
  if (typeof alt !== "number" && typeof desid !== "string" && typeof proid !== "string" && typeof x !== "number") {
    throw new Error("invaild input");
  }

  const id = classNameDesid + "-" + desid + "-" + proid + '-' + String(x);
  const target = document.getElementById(id);
  let clickObj, contenxtObj;
  let eventObj;

  if (target !== null) {
    clickObj = {
      type: "click",
      cancelable: false,
      preventDefault: function () {},
      stopPropagation: function () {},
      altKey: (alt === 1),
      ctrlKey: true,
    };

    contenxtObj = {
      type: "contextmenu",
      cancelable: false,
      preventDefault: function () {},
      stopPropagation: function () {},
      altKey: (alt === 1),
      ctrlKey: true,
    };

    eventObj = (mode === "click") ? clickObj : contenxtObj;

    if (proid === "count") {
      this.countEvent.call(target, eventObj);
    } else {
      //fix this
      eventObj.type = "click";
      this.moduleEvent.call(target, eventObj);
    }
  }
}

DesignerJs.prototype.calendarModuleClick = function (arr) {
  const instance = this;
  if (!Array.isArray(arr)) {
    throw new Error("must be array");
  }
  for (let obj of arr) {
    if (obj.who !== this.cookiesWho) {
      this.calendarModuleClickDetail(obj.mode, obj.alt, obj.desid, obj.proid, obj.x);
    }
  }
}

DesignerJs.prototype.calendarFixUp = function () {
  const instance = this;
  const { ea, totalMother } = this;
  const { calendarBase, calendarHeight } = this.mother.makeCalendar(new Date, function (e) {});
  const { colorChip, createNode, withOut } = GeneralJs;
  let mother, style, calendarBox;
  let width, height;

  width = Number(calendarBase.style.width.replace(/[^0-9\-\.]/g, ''));
  height = Number(calendarBase.style.width.replace(/[^0-9\-\.]/g, ''));

  calendarBox = createNode({
    mother: totalMother,
    events: [
      {
        type: "contextmenu",
        event: function (e) {
          e.preventDefault();
          this.parentElement.removeChild(this);
        }
      }
    ],
    style: {
      position: "absolute",
      width: String(width) + ea,
      height: String(height) + ea,
      top: withOut(100, this.mother.belowHeight + 205, ea),
      right: String(42) + ea,
      transition: "all 0s ease",
      animation: "fadeup 0.3s ease forwards",
    }
  });

  style = {
    position: "absolute",
    background: colorChip.white,
    boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
    transition: "all 0s ease",
    borderRadius: String(3) + "px",
    opacity: String(0.95),
  };
  for (let i in style) {
    calendarBase.style[i] = style[i];
  }
  calendarBox.appendChild(calendarBase);

}

DesignerJs.prototype.calendarView = async function () {
  const instance = this;
  try {
    const { createNodes, colorChip, ajaxJson, sleep, returnGet, equalJson } = GeneralJs;
    const getObj = returnGet();
    let designers, projects, clients;
    let desidArr, cliidArr;
    let desidArr_raw;
    let loading;

    loading = await this.mother.loadingRun();

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
    this.calendarX = null;
    this.moduleEvent = null;
    this.countEvent = null;
    this.detailTimeEvent = null;
    this.calendarData = null;
    this.calendarMonthY = {};
    this.calendarPastQueries = [];
    this.calendarPastTranslate = "translateX(0px)";
    this.cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
    this.cookiesWho = this.cookies.homeliaisonConsoleLoginedName;

    this.mother.belowButtons.arrow.right.addEventListener("click", (e) => { instance.calendarPastTranslate = document.querySelector(".moveTarget").style.transform; });
    this.mother.belowButtons.arrow.left.addEventListener("click", (e) => { instance.calendarPastTranslate = document.querySelector(".moveTarget").style.transform; });

    class DateX extends Array {
      constructor(arr) {
        super();
        let tempArr0, tempArr1;
        let startDate, endDate;
        for (let obj of arr) {
          tempArr0 = obj.start.split('-');
          tempArr1 = obj.end.split('-');
          startDate = new Date(Number(tempArr0[0]), Number(tempArr0[1]) - 1, Number(tempArr0[2]));
          endDate = new Date(Number(tempArr1[0]), Number(tempArr1[1]) - 1, Number(tempArr1[2]));
          endDate.setDate(endDate.getDate() + 1);
          this.push({ start: startDate, end: endDate });
        }
        this.break = true;
      }
      firstDate() {
        if (this.length > 0) {
          return this[0].start;
        } else {
          return null;
        }
      }
      endDate() {
        if (this.length > 0) {
          return this[this.length - 1].end;
        } else {
          return null;
        }
      }
      dateToX(dateObj) {
        if (!(dateObj instanceof Date)) {
          throw new Error("must be date object");
        }
        let value, x;
        x = null;
        for (let i = 0; i < this.length; i++) {
          value = dateObj.valueOf();
          if ((this[i].start.valueOf() <= value) && (value < this[i].end.valueOf())) {
            x = i;
            break;
          }
        }
        return x;
      }
      dateToDom(desid, proid, dateObj, x = null) {
        if (!(dateObj instanceof Date)) {
          throw new Error("must be date object");
        }
        if (desid === undefined || proid === undefined) {
          throw new Error("invaild input");
        }
        if (x === null || x === undefined) {
          x = this.dateToX(dateObj);
        }
        if (x === null) {
          return null;
        } else {
          return document.getElementById(instance.calendarClass.classNameDesid + '-' + desid + '-' + proid + '-' + String(x));
        }
      }
      dateToDomX(desid, proid, dateObj) {
        if (!(dateObj instanceof Date)) {
          throw new Error("must be date object");
        }
        const x = this.dateToX(dateObj);
        const dom = this.dateToDom(desid, proid, dateObj, x);
        return { x, dom };
      }
    }
    class DesignerDate {
      constructor(obj) {
        this.desid = obj.desid;
        this.count = obj.count;
        this.possible = obj.possible;
        this.projects = obj.projects;
      }
      render() {
        const { desid, count, possible, projects } = this;
        const calendarX = instance.calendarX;
        if (instance.moduleEvent === null || instance.detailTimeEvent === null) {
          throw new Error("event definition first");
        }
        const firstDate = calendarX.firstDate();
        const endDate = calendarX.endDate();
        const zeroAddition = (num) => { return (num < 10) ? `0${String(num)}` : String(num); }
        const dateToString = (dateObj) => { return `${String(dateObj.getFullYear())}-${zeroAddition(dateObj.getMonth() + 1)}-${zeroAddition(dateObj.getDate())}`; }
        let clickObj, tempObj, tempDom, contenxtObj;
        let startObj, startDom;
        let x0, x1;

        clickObj = {
          type: "click",
          cancelable: false,
          preventDefault: function () {},
          stopPropagation: function () {},
          altKey: false,
          ctrlKey: true,
        };

        contenxtObj = {
          type: "contextmenu",
          cancelable: false,
          preventDefault: function () {},
          stopPropagation: function () {},
          altKey: false,
          ctrlKey: true,
        };

        for (let { start, end } of possible) {
          tempObj = calendarX.dateToDomX(desid, "possible", start);
          tempDom = tempObj.dom;
          x0 = tempObj.x;
          if (tempDom !== null) {
            tempDom.setAttribute("spot", dateToString(start));
            if (tempDom.getAttribute("toggle") === "off") {
              instance.moduleEvent.call(tempDom, clickObj);
            }
          }
          tempObj = calendarX.dateToDomX(desid, "possible", end);
          tempDom = tempObj.dom;
          x1 = tempObj.x;
          if (x0 !== x1) {
            if (tempDom !== null) {
              if (x0 === null && x1 !== null && start.valueOf() <= firstDate.valueOf()) {
                startDom = calendarX.dateToDom(desid, "possible", start, 0);
                if (startDom !== null) {
                  startDom.setAttribute("spot", dateToString(start));
                  if (tempDom.getAttribute("toggle") === "off") {
                    instance.moduleEvent.call(startDom, clickObj);
                  }
                }
                if (x1 !== 0) {
                  tempDom.setAttribute("spot", dateToString(end));
                  if (tempDom.getAttribute("toggle") === "off") {
                    instance.moduleEvent.call(tempDom, clickObj);
                  }
                }
              } else {
                tempDom.setAttribute("spot", dateToString(end));
                if (tempDom.getAttribute("toggle") === "off") {
                  instance.moduleEvent.call(tempDom, clickObj);
                }
              }
            }
          }
        }
        for (let { proid, meeting, project } of projects) {
          // for (let time of meeting) {
          //   tempObj = calendarX.dateToDomX(desid, proid, time);
          //   tempDom = tempObj.dom;
          //   if (tempDom !== null) {
          //     tempDom.setAttribute("spot", dateToString(time));
          //     // if (tempDom.getAttribute("toggle") === "off") {
          //       instance.moduleEvent.call(tempDom, contenxtObj);
          //     // }
          //   }
          // }
          for (let { start, end } of project) {
            tempObj = calendarX.dateToDomX(desid, proid, start);
            tempDom = tempObj.dom;
            x0 = tempObj.x;
            if (tempDom !== null) {
              tempDom.setAttribute("spot", dateToString(start));
              if (tempDom.getAttribute("toggle") === "off") {
                instance.moduleEvent.call(tempDom, clickObj);
              }
            }
            tempObj = calendarX.dateToDomX(desid, proid, end);
            tempDom = tempObj.dom;
            x1 = tempObj.x;
            if (x0 !== x1) {
              if (tempDom !== null) {
                if (x0 === null && x1 !== null && start.valueOf() <= firstDate.valueOf()) {
                  startDom = calendarX.dateToDom(desid, proid, start, 0);
                  if (startDom !== null) {
                    startDom.setAttribute("spot", dateToString(start));
                    if (tempDom.getAttribute("toggle") === "off") {
                      instance.moduleEvent.call(startDom, clickObj);
                    }
                  }
                  if (x1 !== 0) {
                    tempDom.setAttribute("spot", dateToString(end));
                    if (tempDom.getAttribute("toggle") === "off") {
                      instance.moduleEvent.call(tempDom, clickObj);
                    }
                  }
                } else {
                  tempDom.setAttribute("spot", dateToString(end));
                  if (tempDom.getAttribute("toggle") === "off") {
                    instance.moduleEvent.call(tempDom, clickObj);
                  }
                }
              }
            }
          }
        }
        for (let ym in count) {
          tempDom = document.querySelector('.' + desid + '-' + "count" + '-' + ym);
          if (tempDom !== null) {
            tempDom.firstChild.textContent = String(count[ym]);
            tempDom.setAttribute("value", String(count[ym]));
          }
        }
      }
      projectConvert(projectObj) {
        if (typeof projectObj !== "object") {
          throw new Error("invaild input");
        }
        if (projectObj.proid === undefined) {
          throw new Error("invaild input");
        }
        const { proid } = projectObj;
        let index;

        index = null;
        for (let i = 0; i < this.projects.length; i++) {
          if (this.projects[i].proid === proid) {
            index = i;
            break;
          }
        }

        if (index !== null) {
          this.projects.splice(index, 1, projectObj);
        } else {
          this.projects.push(projectObj);
        }
      }
      projectPick(proid, returnModel = false) {
        if (proid === undefined) {
          throw new Error("must be proid");
        }
        let model;
        let target;

        target = null;
        model = function (proid) {
          return {
            proid,
            meeting: [],
            project: []
          };
        }

        if (returnModel) {
          return model(proid);
        }

        for (let p of this.projects) {
          if (p.proid === proid) {
            target = p;
            break;
          }
        }
        if (target === null) {
          target = model(proid);
          this.projects.push(target);
        }
        return target;
      }
    }
    class DesignerDates extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(new DesignerDate(i));
        }
      }
      pick(desid) {
        if (desid === undefined) {
          throw new Error("invaild input");
        }
        let target = null;
        for (let i of this) {
          if (i.desid === desid) {
            target = i;
            break;
          }
        }
        if (target === null) {
          if (/^d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/i.test(desid)) {
            target = new DesignerDate({ desid, count: {}, possible: [], projects: [] });
            this.push(target);
          } else {
            throw new Error("invaild desid");
          }
        }
        return target;
      }
      render() {
        for (let i of this) {
          i.render();
        }
      }
      async updateByDoms(doms, x = 0, type = "click", alt = false) {
        const length = doms.length;
        const stringToDate = (str) => {
          if (typeof str !== "string") {
            throw new Error("invaild input");
          }
          let tempArr = str.split('-');
          if (tempArr.length !== 3) {
            throw new Error("invaild input");
          }
          return new Date(Number(tempArr[0]), Number(tempArr[1]) - 1, Number(tempArr[2]));
        }

        let desid, proid;
        let id;
        let tempArr;
        let toggle, meeting;
        let pastBoo;
        let startPoint, endPoint;
        let model, modelFiltered;
        let updateData, url;
        let thisDesigner;
        let original;
        let premiereStart, premiereEnd;
        let rescueTong_project, rescueTong_meeting;
        let indexTong;

        if (length === 0) {
          throw new Error("length error");
          return 0;
        }

        premiereStart = stringToDate(doms[0].getAttribute("start")).valueOf();
        premiereEnd = stringToDate(doms[0].getAttribute("end")).valueOf();

        id = null;
        for (let dom of doms) {
          if (dom.id !== "" && dom.id !== null && dom.id !== undefined) {
            id = dom.id;
            break;
          }
        }
        if (id === null) {
          throw new Error("id error");
          return 0;
        }
        tempArr = id.split('-');
        if (tempArr.length !== 4) {
          throw new Error("id error 2");
          return 0;
        }
        desid = tempArr[1];
        proid = tempArr[2];
        thisDesigner = this.pick(desid);

        if (proid !== "possible" && proid !== "count") {

          toggle = [];
          meeting = [];
          for (let dom of doms) {
            toggle.push(dom.getAttribute("toggle") === "on" ? true : false);
            meeting.push(dom.getAttribute("meeting") === "on" ? true : false);
          }

          pastBoo = false;
          startPoint = [];
          endPoint = [];
          original = thisDesigner.projectPick(proid, false);
          model = thisDesigner.projectPick(proid, true);
          for (let i = 0; i < length; i++) {
            if (!pastBoo && toggle[i]) {
              if (!meeting[i]) {
                startPoint.push(i);
              }
            }
            if (pastBoo && !toggle[i]) {
              endPoint.push(i - 1);
            }
            if (!pastBoo) {
              if (!meeting[i]) {
                pastBoo = toggle[i];
              }
            } else {
              pastBoo = toggle[i];
            }
            if (meeting[i]) {
              model.meeting.push(stringToDate((doms[i].getAttribute("spot") !== null && doms[i].getAttribute("spot") !== "null") ? doms[i].getAttribute("spot") : doms[i].getAttribute("start")));
            }
          }
          if (startPoint.length !== endPoint.length) {
            endPoint.push(length - 1);
          }

          for (let i = 0; i < startPoint.length; i++) {
            model.project.push({
              start: stringToDate((doms[startPoint[i]].getAttribute("spot") !== null && doms[startPoint[i]].getAttribute("spot") !== "null") ? doms[startPoint[i]].getAttribute("spot") : doms[startPoint[i]].getAttribute("start")),
              end: stringToDate((doms[endPoint[i]].getAttribute("spot") !== null && doms[endPoint[i]].getAttribute("spot") !== "null") ?  doms[endPoint[i]].getAttribute("spot") :  doms[endPoint[i]].getAttribute("end"))
            });
          }

          rescueTong_project = [];
          for (let obj of original.project) {
            if (obj.start.valueOf() < premiereStart && obj.end.valueOf() < premiereStart) {
              rescueTong_project.push(obj);
            } else if (obj.start.valueOf() < premiereStart && obj.end.valueOf() >= premiereStart) {
              for (let obj2 of model.project) {
                if (premiereStart <= obj2.start.valueOf() && obj2.start.valueOf() <= premiereEnd) {
                  obj.end = obj2.end;
                  rescueTong_project.push(obj);
                }
              }
            }
          }
          indexTong = [];
          for (let i = 0; i < model.project.length; i++) {
            if (premiereStart <= model.project[i].start.valueOf() && model.project[i].start.valueOf() <= premiereEnd) {
              for (let { end } of rescueTong_project) {
                if (end.valueOf() === model.project[i].end.valueOf()) {
                  indexTong.push(i);
                }
              }
            }
          }
          modelFiltered = [];
          for (let i = 0; i < model.project.length; i++) {
            if (!indexTong.includes(i)) {
              modelFiltered.push(model.project[i]);
            }
          }
          model.project = rescueTong_project.concat(modelFiltered);

          rescueTong_meeting = [];
          for (let date of original.meeting) {
            if (date.valueOf() < premiereStart) {
              rescueTong_meeting.push(date);
            }
          }
          model.meeting = rescueTong_meeting.concat(model.meeting);

          thisDesigner.projectConvert(model);

        } else if (proid === "possible") {

          toggle = [];
          for (let dom of doms) {
            toggle.push(dom.getAttribute("toggle") === "on");
          }

          pastBoo = false;
          startPoint = [];
          endPoint = [];
          model = [];
          for (let i = 0; i < length; i++) {
            if (!pastBoo && toggle[i]) {
              startPoint.push(i);
            }
            if (pastBoo && !toggle[i]) {
              endPoint.push(i - 1);
            }
            pastBoo = toggle[i];
          }

          if (startPoint.length !== endPoint.length) {
            endPoint.push(length - 1);
          }

          for (let i = 0; i < startPoint.length; i++) {
            model.push({
              start: stringToDate((doms[startPoint[i]].getAttribute("spot") !== null && doms[startPoint[i]].getAttribute("spot") !== "null") ? doms[startPoint[i]].getAttribute("spot") : doms[startPoint[i]].getAttribute("start")),
              end: stringToDate((doms[endPoint[i]].getAttribute("spot") !== null && doms[endPoint[i]].getAttribute("spot") !== "null") ?  doms[endPoint[i]].getAttribute("spot") :  doms[endPoint[i]].getAttribute("end"))
            });
          }

          thisDesigner.possible = model;

        } else {
          for (let dom of doms) {
            thisDesigner.count['y' + dom.getAttribute("year") + 'm' + dom.getAttribute("month")] = Number(dom.getAttribute("value"));
          }
        }

        url = "/generalMongo";
        updateData = {
          mode: "update",
          db: "console",
          collection: "realtimeDesigner",
          whereQuery: { desid },
          updateQuery: thisDesigner
        };
        await GeneralJs.ajaxJson(updateData, url);

        if (type !== "blur") {
          url = "/generalMongo";
          updateData = {
            mode: "sse",
            db: "console",
            collection: "sse_realtimeDesigner",
            updateQuery: {
              mode: type,
              alt: alt ? 1 : 0,
              desid,
              proid,
              x: String(x),
              who: instance.cookiesWho,
            }
          };
          await GeneralJs.ajaxJson(updateData, url);
        }

        return 1;
      }

      mergeProjects(projects) {
        const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
        if (projects === undefined) {
          throw new Error("invaild input");
        }
        let temp, tempTarget;
        for (let project of projects) {
          if (project.process.contract.form.date.from.valueOf() > emptyDateValue && project.process.contract.form.date.to.valueOf() > emptyDateValue) {
            temp = this.pick(project.desid);
            tempTarget = null;
            for (let obj of temp.projects) {
              if (obj.proid === project.proid) {
                tempTarget = obj;
              }
            }
            if (tempTarget === null) {
              temp.projects.push({ proid: project.proid, meeting: [], project: [ { start: project.process.contract.form.date.from, end: project.process.contract.form.date.to } ] });
            } else {
              tempTarget.project = [ { start: project.process.contract.form.date.from, end: project.process.contract.form.date.to } ];
            }
          }
          if (project.process.contract.meeting.date.valueOf() > emptyDateValue) {
            temp = this.pick(project.desid);
            tempTarget = null;
            for (let obj of temp.projects) {
              if (obj.proid === project.proid) {
                tempTarget = obj;
              }
            }
            if (tempTarget === null) {
              temp.projects.push({ proid: project.proid, meeting: [ project.process.contract.meeting.date ], project: [] });
            } else {
              tempTarget.meeting = [ project.process.contract.meeting.date ];
            }
          }
        }
      }

      async updateThisState() {
        const url = "/generalMongo";
        let updateData;
        for (let obj of this) {
          updateData = {
            mode: "update",
            db: "console",
            collection: "realtimeDesigner",
            whereQuery: { desid: obj.desid },
            updateQuery: obj
          };
          await GeneralJs.ajaxJson(updateData, url);
        }
      }

    }

    this.calendarDateClass = {
      DateX: DateX,
      DesignerDate: DesignerDate,
      DesignerDates: DesignerDates,
    };

    projects = await ajaxJson({
      noFlat: true,
      whereQuery: {
        $and: [
          { desid: { $regex: "^d" } },
          { "process.status": { $regex: "^[대진홀]" } }
        ]
      }
    }, "/getProjects", { equal: true });
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

    this.calendarData = new DesignerDates(await ajaxJson({
      mode: "read",
      db: "console",
      collection: "realtimeDesigner",
      whereQuery: {},
    }, "/generalMongo", { equal: true }));

    // this.calendarData.mergeProjects(projects);
    // await this.calendarData.updateThisState();

    this.designers = new Designers(designers);
    this.designers.setProjects(projects);
    this.designers.setClients(clients);

    this.matrix = this.calendarMatrix();
    this.calendarBase(getObj.desid === undefined ? null : getObj.desid);
    this.calendarSearchEvent();

    await sleep(500);

    loading.parentNode.removeChild(loading);
    this.totalMother.style.animation = "fadeup 0.3s ease forwards";

    await sleep(500);

    this.calendarFixUp();

  } catch (e) {
    console.log(e);
  }
}
