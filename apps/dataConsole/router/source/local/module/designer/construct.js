// DATA -----------------------------------------------------------------------------------------------------------------

DesignerJs.prototype.constructDataRender = function (project, titleMode) {
  const instance = this;
  const { ea, resetWidthEvent } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, dateToString, autoComma, equalJson, ajaxJson } = GeneralJs;
  const { process, proid, address } = project;
  const { contract, design: { construct } } = process;
  const { form: { date: { from, to } } } = contract;
  const { status, request, estimate, contract: { partner, form, payments } } = construct;
  const { id, guide, date: formDate } = form;
  const zeroAddition = (num) => { return (num < 10) ? `0${String(num)}` : String(num); }
  const textMaker = (title, value, color, column) => {
    return `<b id="${!titleMode ? project.proid : "title"}_${column}" title="${title}" class="value" style="color:${colorChip[titleMode ? "whiteBlack" : color]};">${titleMode ? title : value}</b>`;
  }
  const dateToColor = (dateObj, reverse = true) => {
    if (dateObj.valueOf() > (new Date(3000, 0, 1)).valueOf()) {
      return "red";
    } else if (dateObj.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
      return "gray5";
    } else {
      if (dateObj.valueOf() <= (new Date()).valueOf()) {
        return !reverse ? "green" : "black";
      } else {
        return !reverse ? "black" : "green";
      }
    }
  }
  const emptyDate = new Date(1800, 0, 1);
  const emptyValue = "해당 없음";
  let height, margin;
  let whiteBlock;
  let top, left, size;
  let startLeft;
  let previousWidth;
  let widthArr, domArr;
  let tempQsa;
  let whiteBack;
  let stringArr, tempDom;
  let tempString, tempString0, tempString1, tempString2, tempString3;
  let updateArr;
  let map;
  let displayBoo;
  let grayBoo;
  let num;
  let calendarEvent;
  let temp;
  let statusValues, partnerValues;

  height = 43;
  margin = 1;

  top = (titleMode ? (isMac() ? 12 : 13) : (isMac() ? 11 : 12));
  left = 16;
  size = 14;
  startLeft = 0;

  stringArr = [];
  updateArr = [];

  grayBoo = ![ "완료", "드랍" ].includes(status);

  statusValues = [
    "대기",
    "의뢰서 작성중",
    "견적 확인중",
    "견적 안내",
    "미팅 예정",
    "계약 발송",
    "계약금 입금",
    "착수금 입금",
    "중도금 입금",
    "잔금 입금",
    "완료",
    "드랍",
    "고객 진행",
    "디자이너 진행",
    "수수료 요청",
    "AS 진행중",
    "해당 없음",
  ];
  partnerValues = this.builderNames;

  if (this.type === "construct") {

    displayBoo = true;

    map = {
      projectFrom: {
        title: "프로젝트 시작",
        position: "process.contract.form.date.from",
        values: [],
        chain: null
      },
      request: {
        title: "시공 의뢰",
        position: "process.design.construct.request",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      status: {
        title: "진행 단계",
        position: "process.design.construct.status",
        values: statusValues,
        chain: null
      },
      estimate: {
        title: "견적 기록",
        position: "process.design.construct.estimate",
        values: [],
        chain: null
      },
      partner: {
        title: "시공사",
        position: "process.design.construct.contract.partner",
        values: partnerValues,
        chain: null
      },
      contractFrom: {
        title: "시공 시작일",
        position: "process.design.construct.contract.form.date.from",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      contractTo: {
        title: "시공 종료일",
        position: "process.design.construct.contract.form.date.to",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      contractGuide: {
        title: "계약서 발송",
        position: "process.design.construct.contract.form.guide",
        values: [],
        chain: null
      },
      // contractConfirm: {
      //   title: "계약서 서명",
      //   position: "process.design.construct.contract.form.id",
      //   values: [],
      //   chain: null
      // },
      address: {
        title: "현장 위치",
        position: "",
        values: [],
        chain: null
      },
    };

    stringArr.push(textMaker(map["projectFrom"].title, dateToString(from), "black", "projectFrom"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["status"].title, status, "black", "status"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "status";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;

      position = map[column].position;
      values = map[column].values;
      startLeft = 0;
      width = 100;
      margin = 4;

      background = colorChip.gradientGreen4;
      updateEvent = async function (e) {
        try {
          const value = this.getAttribute("value");
          const position = this.getAttribute("position");
          const proid = this.getAttribute("proid");
          const removeTargets = mother.querySelectorAll("aside");
          let whereQuery, updateQuery;

          whereQuery = { proid };
          updateQuery = {};
          updateQuery[position] = value;
          valueDom.textContent = value;

          await instance.constructUpdate(whereQuery, updateQuery, map[column].chain, value);
          instance.constructDeactivate(proid, /^[드완]/.test(value));

          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }
          resetWidthEvent();

        } catch (e) {
          console.log(e);
        }
      }

      nodeArr = [];
      for (let i = 0; i < values.length; i++) {
        nodeArr.push({
          mother: this,
          mode: "aside",
          attribute: { value: values[i], position, proid: project.proid },
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top + ((margin + height) * i)) + ea,
            left: String(startLeft) + ea,
            width: String(width) + ea,
            height: String(height) + ea,
            background, zIndex, boxShadow, borderRadius, animation,
          }
        });
        nodeArr.push({
          mother: -1,
          text: values[i],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.whiteBlack,
          }
        });
      }
      createNodes(nodeArr);
    });

    stringArr.push(textMaker(map["request"].title, dateToString(request), dateToColor(request, false), "request"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "request";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 260;
      margin = 4;

      background = colorChip.gradientGreen;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          let tempArr;
          if (value === "예정") {
            updateQuery[position] = new Date(3800, 0, 1);
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
          }
          await instance.constructUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          // calendarEvent(thisCase);
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }
          thisCase[column].style.color = colorChip[dateToColor(updateQuery[position], false)];
          resetWidthEvent();
        } catch (e) {
          console.log(e);
        }
      };

      nodeArr = createNodes([
        {
          mother: this,
          mode: "aside",
          attribute: [ { value: values[0] } ],
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top) + ea,
            left: String(startLeft) + ea,
            width: String((width - margin) / 2) + ea,
            height: String(height) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            zIndex, borderRadius, animation,
          }
        },
        {
          mother: -1,
          text: values[0],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          mother: this,
          mode: "aside",
          attribute: [ { value: values[1] } ],
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top) + ea,
            left: String(startLeft + ((width - margin) / 2) + margin) + ea,
            width: String((width - margin) / 2) + ea,
            height: String(height) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            zIndex, borderRadius, animation,
          }
        },
        {
          mother: -1,
          text: values[1],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          mother: this,
          mode: "aside",
          events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } } ],
          style: {
            position: "absolute",
            top: String(top + height + margin) + ea,
            left: String(startLeft) + ea,
            width: String(width) + ea,
            zIndex, borderRadius, animation,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            background: colorChip.white,
            transition: "all 0s ease",
          }
        }
      ]);

      calendarTong = nodeArr[4];

      const calendar = instance.mother.makeCalendar(new Date(), function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.setAttribute("value", this.getAttribute("buttonValue"));
        updateEvent.call(this, e);
      });
      calendarTong.appendChild(calendar.calendarBase);

    });

    temp = estimate.map((obj) => { return dateToString(obj.date) }).join(", ");
    stringArr.push(textMaker(map["estimate"].title, temp === '' ? "-" : temp, temp === '' ? "gray5" : "black", "estimate"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNode, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "estimate";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 260;
      margin = 4;

      background = colorChip.gradientGreen;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          let tempArr, thisProject, thisEstimate;

          // DEV ============================================================================================

          tempArr = value.split('-');

          thisProject = instance.projects.search("proid", project.proid);
          thisEstimate = thisProject.process.design.construct.estimate;
          thisEstimate.unshift({
            invid: "",
            date: new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')))
          });
          thisEstimate.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

          instance.projects.search("proid", project.proid).process.design.construct.estimate = equalJson(JSON.stringify(thisEstimate));
          updateQuery[position] = thisEstimate;

          await instance.constructUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = thisEstimate.map((obj) => { return dateToString(obj.date) }).join(", ");
          // calendarEvent(thisCase);
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

          thisCase[column].style.color = colorChip.black;
          resetWidthEvent();
        } catch (e) {
          console.log(e);
        }
      };

      calendarTong = createNode({
        mother: this,
        mode: "aside",
        events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } } ],
        style: {
          position: "absolute",
          top: String(top) + ea,
          left: String(startLeft) + ea,
          width: String(width) + ea,
          zIndex, borderRadius, animation,
          boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
          background: colorChip.white,
          transition: "all 0s ease",
        }
      });

      const calendar = instance.mother.makeCalendar(new Date(), function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.setAttribute("value", this.getAttribute("buttonValue"));
        updateEvent.call(this, e);
      });
      calendarTong.appendChild(calendar.calendarBase);

    });

    stringArr.push(textMaker(map["partner"].title, partner === '' ? "-" : partner, partner === '' ? "gray5" : "black", "partner"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "partner";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;

      position = map[column].position;
      values = map[column].values;
      startLeft = 0;
      width = 116;
      margin = 4;

      background = colorChip.gradientGreen4;
      updateEvent = async function (e) {
        try {
          const value = this.getAttribute("value");
          const position = this.getAttribute("position");
          const proid = this.getAttribute("proid");
          const removeTargets = mother.querySelectorAll("aside");
          let whereQuery, updateQuery;

          whereQuery = { proid };
          updateQuery = {};
          updateQuery[position] = value;
          valueDom.textContent = value;

          await instance.constructUpdate(whereQuery, updateQuery, map[column].chain, value);

          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }
          thisCase[column].style.color = colorChip.black;
          resetWidthEvent();

        } catch (e) {
          console.log(e);
        }
      }

      nodeArr = [];
      for (let i = 0; i < values.length; i++) {
        nodeArr.push({
          mother: this,
          mode: "aside",
          attribute: { value: values[i], position, proid: project.proid },
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top + ((margin + height) * i)) + ea,
            left: String(startLeft) + ea,
            width: String(width) + ea,
            height: String(height) + ea,
            background, zIndex, boxShadow, borderRadius, animation,
          }
        });
        nodeArr.push({
          mother: -1,
          text: values[i],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.whiteBlack,
          }
        });
      }
      createNodes(nodeArr);
    });

    stringArr.push(textMaker(map["contractFrom"].title, dateToString(formDate.from), dateToColor(formDate.from, false), "contractFrom"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "contractFrom";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 260;
      margin = 4;

      background = colorChip.gradientGreen;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          let tempArr;
          if (value === "예정") {
            updateQuery[position] = new Date(3800, 0, 1);
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
          }
          await instance.constructUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          // calendarEvent(thisCase);
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }
          thisCase[column].style.color = colorChip[dateToColor(updateQuery[position], false)];
          resetWidthEvent();
        } catch (e) {
          console.log(e);
        }
      };

      nodeArr = createNodes([
        {
          mother: this,
          mode: "aside",
          attribute: [ { value: values[0] } ],
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top) + ea,
            left: String(startLeft) + ea,
            width: String((width - margin) / 2) + ea,
            height: String(height) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            zIndex, borderRadius, animation,
          }
        },
        {
          mother: -1,
          text: values[0],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          mother: this,
          mode: "aside",
          attribute: [ { value: values[1] } ],
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top) + ea,
            left: String(startLeft + ((width - margin) / 2) + margin) + ea,
            width: String((width - margin) / 2) + ea,
            height: String(height) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            zIndex, borderRadius, animation,
          }
        },
        {
          mother: -1,
          text: values[1],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          mother: this,
          mode: "aside",
          events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } } ],
          style: {
            position: "absolute",
            top: String(top + height + margin) + ea,
            left: String(startLeft) + ea,
            width: String(width) + ea,
            zIndex, borderRadius, animation,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            background: colorChip.white,
            transition: "all 0s ease",
          }
        }
      ]);

      calendarTong = nodeArr[4];

      const calendar = instance.mother.makeCalendar(new Date(), function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.setAttribute("value", this.getAttribute("buttonValue"));
        updateEvent.call(this, e);
      });
      calendarTong.appendChild(calendar.calendarBase);

    });

    stringArr.push(textMaker(map["contractTo"].title, dateToString(formDate.to), dateToColor(formDate.to, false), "contractTo"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "contractTo";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 260;
      margin = 4;

      background = colorChip.gradientGreen;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          let tempArr;
          if (value === "예정") {
            updateQuery[position] = new Date(3800, 0, 1);
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
          }
          await instance.constructUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          // calendarEvent(thisCase);
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }
          thisCase[column].style.color = colorChip[dateToColor(updateQuery[position], false)];
          resetWidthEvent();
        } catch (e) {
          console.log(e);
        }
      };

      nodeArr = createNodes([
        {
          mother: this,
          mode: "aside",
          attribute: [ { value: values[0] } ],
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top) + ea,
            left: String(startLeft) + ea,
            width: String((width - margin) / 2) + ea,
            height: String(height) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            zIndex, borderRadius, animation,
          }
        },
        {
          mother: -1,
          text: values[0],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          mother: this,
          mode: "aside",
          attribute: [ { value: values[1] } ],
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top) + ea,
            left: String(startLeft + ((width - margin) / 2) + margin) + ea,
            width: String((width - margin) / 2) + ea,
            height: String(height) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            zIndex, borderRadius, animation,
          }
        },
        {
          mother: -1,
          text: values[1],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          mother: this,
          mode: "aside",
          events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } } ],
          style: {
            position: "absolute",
            top: String(top + height + margin) + ea,
            left: String(startLeft) + ea,
            width: String(width) + ea,
            zIndex, borderRadius, animation,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            background: colorChip.white,
            transition: "all 0s ease",
          }
        }
      ]);

      calendarTong = nodeArr[4];

      const calendar = instance.mother.makeCalendar(new Date(), function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.setAttribute("value", this.getAttribute("buttonValue"));
        updateEvent.call(this, e);
      });
      calendarTong.appendChild(calendar.calendarBase);

    });

    stringArr.push(textMaker(map["contractGuide"].title, dateToString(guide), dateToColor(guide, true), "contractGuide"));
    if (guide.valueOf() >= (new Date(2000, 0, 1)).valueOf() && guide.valueOf() < (new Date(3000, 0, 1)).valueOf()) {
      updateArr.push(function (e, option, cancelBox, parent) {
        const mother = this;
        cancelBox.parentNode.removeChild(cancelBox);
        resetWidthEvent();
      });
    } else {
      updateArr.push(function (e, option, cancelBox, parent) {
        const mother = this;
        const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
        let boxWidth, boxHeight;
        let paddingLeft, paddingTop;
        let fontSize;
        let titleMarginBottom;
        let textSize;
        let rowMargin;
        let middlePaddingTop, middlePaddingLeft;
        let titleWidth;
        let titleWeight;
        let areaHeight;
        let areaTop;
        let areaWeight;
        let betweenMargin0, betweenMargin1;
        let firstMoney, firstRatio;
        let startMoney, startRatio;
        let middleMoney, middleRatio;
        let remainMoney, remainRatio;
        let totalMoney;
        let thisProject;
        let updateEvent;
        let sendVisual;
        let sendSize;
        let sendWeight;

        thisProject = instance.projects.search("proid", project.proid);

        boxWidth = 680;
        boxHeight = 400;

        paddingLeft = 28;
        paddingTop = 23;

        middlePaddingLeft = 20;
        middlePaddingTop = 18;

        fontSize = 23;
        titleMarginBottom = 16;

        textSize = 15;
        rowMargin = 10;

        titleWidth = 100;
        titleWeight = 500;
        areaWeight = 300;

        areaHeight = 25;
        areaTop = 0;

        betweenMargin0 = 4;
        betweenMargin1 = 15;

        sendVisual = 1;
        sendSize = 13;
        sendWeight = 500;

        firstMoney = Math.floor(payments.first === null ? 0 : payments.first.calculation.amount.consumer);
        startMoney = Math.floor(payments.start === null ? 0 : payments.start.calculation.amount.consumer);
        middleMoney = Math.floor(payments.middle === null ? 0 : payments.middle.calculation.amount.consumer);
        remainMoney = Math.floor(payments.remain === null ? 0 : payments.remain.calculation.amount.consumer);

        totalMoney = Math.floor(firstMoney + startMoney + middleMoney + remainMoney);

        firstRatio = totalMoney !== 0 ? firstMoney / totalMoney : 0;
        startRatio = totalMoney !== 0 ? startMoney / totalMoney : 0;
        middleRatio = totalMoney !== 0 ? middleMoney / totalMoney : 0;
        remainRatio = totalMoney !== 0 ? remainMoney / totalMoney : 0;

        if (thisProject.process.design.construct.contract.form.date.from.valueOf() > (new Date(2000, 0, 1)).valueOf() && thisProject.process.design.construct.contract.form.date.to.valueOf() > (new Date(2000, 0, 1)).valueOf() && thisProject.process.design.construct.contract.partner !== "") {

          updateEvent = function (key) {
            let to, column;
            if (key === "historyName") {
              to = "history";
              column = "construct.name";
            } else if (key === "historyAddress") {
              to = "history";
              column = "construct.address";
            } else if (key === "amount") {
              to = "core";
              column = "amount"
            }
            return async function (e) {
              try {
                const self = this;
                const selfBox = self.getBoundingClientRect();
                const div = this.children[0];
                let cancel, input;
                cancel = createNode({
                  mother: this,
                  mode: "aside",
                  event: {
                    click: function (e) {
                      e.stopPropagation();
                      e.preventDefault();
                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    }
                  },
                  style: {
                    position: "fixed",
                    top: String(selfBox.top * -1) + ea,
                    left: String(selfBox.left * -1) + ea,
                    width: String(window.outerWidth) + ea,
                    height: String(window.outerHeight) + ea,
                    background: "transparent",
                    zIndex: String(1),
                  }
                });
                input = createNode({
                  mother: this,
                  mode: "input",
                  event: {
                    click: function (e) {
                      e.stopPropagation();
                      e.preventDefault();
                    },
                    keypress: async function (e) {
                      if (e.key === "Enter") {
                        e.stopPropagation();
                        e.preventDefault();
                        let value, questions;
                        let answer;
                        let num;
                        let result;
                        let totalNumber;
                        let ajaxResult;
                        try {
                          if (key === "historyName" || key === "historyAddress") {
                            value = this.value.trim();
                            await GeneralJs.ajaxJson({
                              id: project.proid,
                              column,
                              value,
                              email: GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail
                            }, "/updateProjectHistory");
                            instance.projects.search("proid", project.proid).history[key === "historyName" ? "name" : "address"] = value;
                            div.textContent = value;
                          } else {
                            value = Number(this.value.replace(/[^0-9\.\-]/gi, ''));
                            if (!Number.isNaN(value)) {

                              totalNumber = Math.floor(value);
                              questions = [
                                { question: "계약금의 비율을 숫자로만 알려주세요! 단위 %", type: "number", answer: null, target: "first", dom: 4, column: "ratio" },
                                { question: "착수금의 비율을 숫자로만 알려주세요! 단위 %", type: "number", answer: null, target: "start", dom: 5, column: "ratio" },
                                { question: "중도금의 비율을 숫자로만 알려주세요! 단위 %", type: "number", answer: null, target: "middle", dom: 6, column: "ratio" },
                                { question: "잔금의 비율을 숫자로만 알려주세요! 단위 %", type: "number", answer: null, target: "remain", dom: 7, column: "ratio" },
                                { question: "계약금 입금이 예상되는 날짜를 알려주세요! 형식 0000-00-00", type: "date", answer: null, target: "first", dom: 4, column: "date" },
                                { question: "착수금 입금이 예상되는 날짜를 알려주세요! 형식 0000-00-00", type: "date", answer: null, target: "start", dom: 5, column: "date" },
                                { question: "중도금 입금이 예상되는 날짜를 알려주세요! 형식 0000-00-00", type: "date", answer: null, target: "middle", dom: 6, column: "date" },
                                { question: "잔금 입금이 예상되는 날짜를 알려주세요! 형식 0000-00-00", type: "date", answer: null, target: "remain", dom: 7, column: "date" },
                                { question: "계약금 입금의 비고 사항을 알려주세요!", type: "string", answer: null, target: "first", dom: 4, column: "etc" },
                                { question: "착수금 입금의 비고 사항을 알려주세요!", type: "string", answer: null, target: "start", dom: 5, column: "etc" },
                                { question: "중도금 입금의 비고 사항을 알려주세요!", type: "string", answer: null, target: "middle", dom: 6, column: "etc" },
                                { question: "잔금 입금의 비고 사항을 알려주세요!", type: "string", answer: null, target: "remain", dom: 7, column: "etc" },
                              ];

                              num = 0;
                              while (true) {
                                answer = window.prompt(questions[num].question);
                                if (answer === null) {
                                  window.alert("올바른 형식이 아닙니다!");
                                  continue;
                                }
                                if (questions[num].type === "number") {
                                  if (answer === '') {
                                    window.alert("올바른 형식이 아닙니다!");
                                    continue;
                                  }
                                  if (Number.isNaN(Number(answer.replace(/[^0-9\.\-]/gi, '')))) {
                                    window.alert("올바른 형식이 아닙니다!");
                                    continue;
                                  }
                                  questions[num].answer = Math.floor(Number(answer.replace(/[^0-9\.\-]/gi, '')));
                                } else if (questions[num].type === "date") {
                                  if (!/^[0-9][0-9][0-9][0-9][ \-\.][0-9][0-9][ \-\.][0-9][0-9]$/.test(answer.trim())) {
                                    window.alert("올바른 형식이 아닙니다!");
                                    continue;
                                  }
                                  questions[num].answer = answer.trim();
                                } else if (questions[num].type === "string") {
                                  questions[num].answer = answer.trim();
                                }
                                if (questions.length - 1 === num) {
                                  break;
                                }
                                num++;
                              }
                              if (questions.some((obj) => { return typeof obj.answer !== "string" && typeof obj.answer !== "number" })) {
                                window.alert("올바른 값이 아닙니다!");
                              } else {

                                result = {};
                                for (let { answer, target, column, dom } of questions) {
                                  if (result[target] === undefined) {
                                    result[target] = {};
                                  }
                                  if (column === "ratio") {
                                    result[target][column] = answer;
                                    self.parentNode.parentNode.parentNode.children[dom].children[1].children[0].children[0].textContent = String(answer) + '%';
                                    self.parentNode.parentNode.parentNode.children[dom].children[1].children[0].children[2].textContent = autoComma(Math.round(totalNumber * (answer / 100))) + '원';
                                  } else if (column === "date") {
                                    result[target][column] = new Date(Number(answer.split('-')[0]), Number(answer.split('-')[1]) - 1, Number(answer.split('-')[2]));
                                    self.parentNode.parentNode.parentNode.children[dom].children[1].children[0].children[5].textContent = answer;
                                  } else if (column === "etc") {
                                    result[target][column] = answer;
                                    self.parentNode.parentNode.parentNode.children[dom].children[1].children[0].children[8].textContent = answer;
                                  }
                                }

                                result.total = totalNumber;
                                result.proid = project.proid;
                                result.mode = "updatePayments";

                                ajaxResult = await GeneralJs.ajaxJson(result, "/constructInteraction", { equal: true });
                                if (ajaxResult.message === "success") {
                                  const { core, history: historyPayments } = await GeneralJs.ajaxJson(result, "/constructInteraction", { equal: true });

                                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.first = core.first;
                                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.start = core.start;
                                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.middle = core.middle;
                                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.remain = core.remain;
                                  instance.projects.search("proid", project.proid).history.payments = historyPayments;
                                  div.textContent = autoComma(value) + '원';

                                } else {
                                  window.alert("서버 통신에서 문제가 생겼습니다!");
                                }
                              }
                            } else {
                              window.alert("올바른 값이 아닙니다!");
                            }
                          }
                          self.removeChild(self.lastChild);
                          self.removeChild(self.lastChild);
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    }
                  },
                  style: {
                    position: "absolute",
                    top: String(0),
                    left: String(0),
                    border: String(0),
                    outline: String(0),
                    fontSize: String(textSize) + ea,
                    fontWeight: String(areaWeight),
                    color: colorChip.green,
                    background: colorChip.white,
                    width: String(div.getBoundingClientRect().width + 100) + ea,
                    height: String(100) + '%',
                    zIndex: String(1),
                  }
                });
                if (key !== "amount") {
                  input.value = div.textContent;
                }

                input.focus();

              } catch (e) {
                console.log(e);
              }
            }
          }

          createNode({
            mother: this,
            mode: "aside",
            style: {
              position: "fixed",
              top: withOut(50, boxHeight / 2, ea),
              left: withOut(50, boxWidth / 2, ea),
              width: String(boxWidth - (paddingLeft * 2)) + ea,
              height: String(boxHeight - (paddingTop * 2)) + ea,
              background: colorChip.white,
              paddingTop: String(paddingTop) + ea,
              paddingLeft: String(paddingLeft) + ea,
              paddingRight: String(paddingLeft) + ea,
              paddingBottom: String(paddingLeft) + ea,
              zIndex: String(5),
              boxShadow, borderRadius, animation,
            },
            children: [
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  top: String(0),
                  left: String(0),
                  width: String(100) + '%',
                  height: String(100) + '%',
                },
                children: [
                  {
                    text: "계약서 작성",
                    style: {
                      display: "block",
                      position: "relative",
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                      marginBottom: String(titleMarginBottom) + ea,
                    },
                    children: [
                      {
                        class: [ "hoverDefault_lite" ],
                        event: {
                          selectstart: (e) => { e.preventDefault() },
                          click: async function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            try {
                              const children = this.parentElement.nextElementSibling.children;
                              let name, address, start, end, message;
                              let contractName, contractAddress, contractPhone;

                              name = children[0].children[1].textContent.trim();
                              address = children[1].children[1].textContent.trim();
                              [ start, end ] = [ ...children[2].children[1].textContent.matchAll(/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g) ].map((arr) => { return arr[0] });

                              const { result, summary } = await ajaxJson({
                                mode: "inspection",
                                proid: project.proid,
                                name, address, start, end,
                              }, "/constructInteraction", { equal: true });

                              if (result) {
                                message = '';
                                message += "총 금액 : " + autoComma(summary.total) + "원 | " + summary.hangul + "\n";
                                message += "계약금 : " + String(summary.first.percentage) + "% | " + autoComma(summary.first.amount) + "원 | " + summary.first.date + " | " + summary.first.etc + "\n";
                                message += "착수금 : " + String(summary.start.percentage) + "% | " + autoComma(summary.start.amount) + "원 | " + summary.start.date + " | " + summary.start.etc + "\n";
                                message += "중도금 : " + String(summary.middle.percentage) + "% | " + autoComma(summary.middle.amount) + "원 | " + summary.middle.date + " | " + summary.middle.etc + "\n";
                                message += "잔금 : " + String(summary.remain.percentage) + "% | " + autoComma(summary.remain.amount) + "원 | " + summary.remain.date + " | " + summary.remain.etc + "\n\n";
                                message += "정보가 올바르게 기입되었나요?";

                                if (window.confirm(message)) {

                                  contractName = window.prompt("계약서 작성시 별도의 이름이 있나요? (별도로 없다면 '없음' 또는 공백)");
                                  if (contractName === null || (typeof contractName === "string" && contractName.trim() === '') || (typeof contractName === "string" && /없/gi.test(contractName))) {
                                    contractName = project.name;
                                  }
                                  contractAddress = window.prompt("계약서 작성시 별도의 주소가 있나요? (별도로 없다면 '없음' 또는 공백)");
                                  if (contractAddress === null || (typeof contractAddress === "string" && contractAddress.trim() === '') || (typeof contractAddress === "string" && /없/gi.test(contractAddress))) {
                                    contractAddress = project.address;
                                  }
                                  contractPhone = window.prompt("계약서 작성시 별도의 사업자 번호가 있나요? (별도로 없다면 '없음' 또는 공백)");
                                  if (contractPhone === null || (typeof contractPhone === "string" && contractPhone.trim() === '') || (typeof contractPhone === "string" && /없/gi.test(contractPhone))) {
                                    contractPhone = project.phone;
                                  }

                                  summary.contractName = contractName;
                                  summary.contractAddress = contractAddress;
                                  summary.contractPhone = contractPhone;

                                  ajaxJson({ mode: "sendContract", proid: project.proid, summary }, "/constructInteraction").then((obj) => {
                                    if (obj.message === "success") {
                                      window.alert("계약서 자동 생성 및 발송 요청이 완료되었습니다!");
                                      window.location.reload();
                                    } else {
                                      window.alert("계약서 생성 요청에 문제가 생겨 완료하지 못했습니다!");
                                    }
                                  }).catch((err) => {
                                    window.alert("계약서 생성 요청에 문제가 생겨 완료하지 못했습니다!");
                                  });

                                } else {
                                  window.alert("정보를 올바르게 다시 기입해주세요!");
                                }

                              } else {
                                window.alert("정보 기입 후에 계약서를 제작할 수 있습니다!");
                              }
                            } catch (e) {
                              console.log(e);
                            }
                          }
                        },
                        text: "계약서 보내기",
                        style: {
                          position: "absolute",
                          bottom: String(0) + ea,
                          right: String(sendVisual) + ea,
                          fontSize: String(sendSize) + ea,
                          fontWeight: String(sendWeight),
                          color: colorChip.green,
                          cursor: "pointer",
                        }
                      }
                    ]
                  },
                  {
                    style: {
                      flexDirection: "column",
                      position: "relative",
                      border: "1px solid " + colorChip.gray3,
                      boxSizing: "border-box",
                      borderRadius: String(5) + "px",
                      width: String(100) + '%',
                      height: String(boxHeight) + ea,
                      paddingTop: String(middlePaddingTop) + ea,
                      paddingLeft: String(middlePaddingLeft) + ea,
                      paddingRight: String(middlePaddingLeft) + ea,
                    },
                    children: [
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          marginBottom: String(rowMargin) + ea,
                        },
                        children: [
                          {
                            text: "공사명",
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              width: String(titleWidth) + ea,
                              fontSize: String(textSize) + ea,
                              fontWeight: String(titleWeight),
                              color: colorChip.black,
                            }
                          },
                          {
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              position: "relative",
                              width: withOut(titleWidth, ea),
                              height: String(areaHeight) + ea,
                              top: String(areaTop) + ea,
                              overflow: "hidden",
                            },
                            children: [
                              {
                                event: {
                                  click: updateEvent("historyName")
                                },
                                style: {
                                  position: "relative",
                                  width: String(3000) + ea,
                                  left: String(0),
                                  top: String(0),
                                },
                                children: [
                                  {
                                    text: (project.history.name === '' ? project.address + " 내부 리모델링" : project.history.name),
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          marginBottom: String(rowMargin) + ea,
                        },
                        children: [
                          {
                            text: "시공 장소",
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              width: String(titleWidth) + ea,
                              fontSize: String(textSize) + ea,
                              fontWeight: String(titleWeight),
                              color: colorChip.black,
                            }
                          },
                          {
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              position: "relative",
                              width: withOut(titleWidth, ea),
                              height: String(areaHeight) + ea,
                              top: String(areaTop) + ea,
                            },
                            children: [
                              {
                                event: {
                                  click: updateEvent("historyAddress")
                                },
                                style: {
                                  position: "relative",
                                  width: String(3000) + ea,
                                  left: String(0),
                                  top: String(0),
                                },
                                children: [
                                  {
                                    text: (project.history.address === '' ? project.address : project.history.address),
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          marginBottom: String(rowMargin) + ea,
                        },
                        children: [
                          {
                            text: "공사 기간",
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              width: String(titleWidth) + ea,
                              fontSize: String(textSize) + ea,
                              fontWeight: String(titleWeight),
                              color: colorChip.black,
                            }
                          },
                          {
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              position: "relative",
                              width: withOut(titleWidth, ea),
                              height: String(areaHeight) + ea,
                              top: String(areaTop) + ea,
                            },
                            children: [
                              {
                                style: {
                                  position: "relative",
                                  width: String(3000) + ea,
                                  left: String(0),
                                  top: String(0),
                                },
                                children: [
                                  {
                                    text: "착공 : ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.deactive,
                                      marginRight: String(betweenMargin0) + ea,
                                    }
                                  },
                                  {
                                    text: dateToString(project.process.design.construct.contract.form.date.from),
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: " | ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.green,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: "완공 : ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.deactive,
                                      marginRight: String(betweenMargin0) + ea,
                                    }
                                  },
                                  {
                                    text: dateToString(project.process.design.construct.contract.form.date.to),
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                    }
                                  },
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          marginBottom: String(rowMargin) + ea,
                        },
                        children: [
                          {
                            text: "공사 금액",
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              width: String(titleWidth) + ea,
                              fontSize: String(textSize) + ea,
                              fontWeight: String(titleWeight),
                              color: colorChip.black,
                            }
                          },
                          {
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              position: "relative",
                              width: withOut(titleWidth, ea),
                              height: String(areaHeight) + ea,
                              top: String(areaTop) + ea,
                            },
                            children: [
                              {
                                event: {
                                  click: updateEvent("amount")
                                },
                                style: {
                                  position: "relative",
                                  width: String(3000) + ea,
                                  left: String(0),
                                  top: String(0),
                                },
                                children: [
                                  {
                                    text: autoComma(totalMoney) + "원",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          marginBottom: String(rowMargin) + ea,
                        },
                        children: [
                          {
                            text: "계약금 정보",
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              width: String(titleWidth) + ea,
                              fontSize: String(textSize) + ea,
                              fontWeight: String(titleWeight),
                              color: colorChip.black,
                            }
                          },
                          {
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              position: "relative",
                              width: withOut(titleWidth, ea),
                              height: String(areaHeight) + ea,
                              top: String(areaTop) + ea,
                            },
                            children: [
                              {
                                style: {
                                  position: "relative",
                                  width: String(3000) + ea,
                                  left: String(0),
                                  top: String(0),
                                },
                                children: [
                                  {
                                    text: Math.round(firstRatio * 100) + "%",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: " | ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.green,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: autoComma(firstMoney) + "원",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: " | ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.green,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: "예상일 : ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.deactive,
                                      marginRight: String(betweenMargin0) + ea,
                                    }
                                  },
                                  {
                                    text: dateToString(project.history.payments.first.date),
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: " | ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.green,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: "비고 : ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.deactive,
                                      marginRight: String(betweenMargin0) + ea,
                                    }
                                  },
                                  {
                                    text: project.history.payments.first.etc === '' ? "해당 없음" : project.history.payments.first.etc,
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                    }
                                  },
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          marginBottom: String(rowMargin) + ea,
                        },
                        children: [
                          {
                            text: "착수금 정보",
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              width: String(titleWidth) + ea,
                              fontSize: String(textSize) + ea,
                              fontWeight: String(titleWeight),
                              color: colorChip.black,
                            }
                          },
                          {
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              position: "relative",
                              width: withOut(titleWidth, ea),
                              height: String(areaHeight) + ea,
                              top: String(areaTop) + ea,
                            },
                            children: [
                              {
                                style: {
                                  position: "relative",
                                  width: String(3000) + ea,
                                  left: String(0),
                                  top: String(0),
                                },
                                children: [
                                  {
                                    text: Math.round(startRatio * 100) + "%",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: " | ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.green,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: autoComma(startMoney) + "원",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: " | ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.green,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: "예상일 : ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.deactive,
                                      marginRight: String(betweenMargin0) + ea,
                                    }
                                  },
                                  {
                                    text: dateToString(project.history.payments.start.date),
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: " | ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.green,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: "비고 : ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.deactive,
                                      marginRight: String(betweenMargin0) + ea,
                                    }
                                  },
                                  {
                                    text: project.history.payments.start.etc === '' ? "해당 없음" : project.history.payments.start.etc,
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                    }
                                  },
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          marginBottom: String(rowMargin) + ea,
                        },
                        children: [
                          {
                            text: "중도금 정보",
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              width: String(titleWidth) + ea,
                              fontSize: String(textSize) + ea,
                              fontWeight: String(titleWeight),
                              color: colorChip.black,
                            }
                          },
                          {
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              position: "relative",
                              width: withOut(titleWidth, ea),
                              height: String(areaHeight) + ea,
                              top: String(areaTop) + ea,
                            },
                            children: [
                              {
                                style: {
                                  position: "relative",
                                  width: String(3000) + ea,
                                  left: String(0),
                                  top: String(0),
                                },
                                children: [
                                  {
                                    text: Math.round(middleRatio * 100) + "%",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: " | ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.green,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: autoComma(middleMoney) + "원",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: " | ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.green,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: "예상일 : ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.deactive,
                                      marginRight: String(betweenMargin0) + ea,
                                    }
                                  },
                                  {
                                    text: dateToString(project.history.payments.middle.date),
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: " | ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.green,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: "비고 : ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.deactive,
                                      marginRight: String(betweenMargin0) + ea,
                                    }
                                  },
                                  {
                                    text: project.history.payments.middle.etc === '' ? "해당 없음" : project.history.payments.middle.etc,
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                    }
                                  },
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          marginBottom: String(rowMargin) + ea,
                        },
                        children: [
                          {
                            text: "잔금 정보",
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              width: String(titleWidth) + ea,
                              fontSize: String(textSize) + ea,
                              fontWeight: String(titleWeight),
                              color: colorChip.black,
                            }
                          },
                          {
                            style: {
                              display: "inline-block",
                              verticalAlign: "top",
                              position: "relative",
                              width: withOut(titleWidth, ea),
                              height: String(areaHeight) + ea,
                              top: String(areaTop) + ea,
                            },
                            children: [
                              {
                                style: {
                                  position: "relative",
                                  width: String(3000) + ea,
                                  left: String(0),
                                  top: String(0),
                                },
                                children: [
                                  {
                                    text: Math.round(remainRatio * 100) + "%",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: " | ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.green,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: autoComma(remainMoney) + "원",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: " | ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.green,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: "예상일 : ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.deactive,
                                      marginRight: String(betweenMargin0) + ea,
                                    }
                                  },
                                  {
                                    text: dateToString(project.history.payments.remain.date),
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: " | ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.green,
                                      marginRight: String(betweenMargin1) + ea,
                                    }
                                  },
                                  {
                                    text: "비고 : ",
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.deactive,
                                      marginRight: String(betweenMargin0) + ea,
                                    }
                                  },
                                  {
                                    text: project.history.payments.remain.etc === '' ? "해당 없음" : project.history.payments.remain.etc,
                                    style: {
                                      display: "inline-block",
                                      fontSize: String(textSize) + ea,
                                      fontWeight: String(areaWeight),
                                      color: colorChip.black,
                                    }
                                  },
                                ]
                              }
                            ]
                          }
                        ]
                      },
                    ]
                  }
                ]
              }
            ]
          });
        } else {
          window.alert("공사 기간, 파트너 시공사를 먼저 모두 설정해주세요!");
          cancelBox.parentNode.removeChild(cancelBox);
          resetWidthEvent();
        }

      });
    }

    stringArr.push(textMaker(map["address"].title, address, "black", "address"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

  } else if (this.type === "payment") {

    displayBoo = !(partner.trim() === "디자이너" || partner.trim() === "고객" || partner.trim() === "" || partner.trim === "외부업체");

    map = {
      status: {
        title: "진행 단계",
        position: "process.design.construct.status",
        values: statusValues,
        chain: null
      },
      firstGuide: {
        title: "계약금 안내",
        position: "process.design.construct.contract.payments.first.guide",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      firstAmount: {
        title: "계약금",
        position: "process.design.construct.contract.payments.first.calculation.amount.consumer",
        values: [],
        chain: null
      },
      firstDate: {
        title: "계약금 입금",
        position: "process.design.construct.contract.payments.first.date",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      startGuide: {
        title: "착수금 안내",
        position: "process.design.construct.contract.payments.start.guide",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      startAmount: {
        title: "착수금",
        position: "process.design.construct.contract.payments.start.calculation.amount.consumer",
        values: [],
        chain: null
      },
      startDate: {
        title: "착수금 입금",
        position: "process.design.construct.contract.payments.start.date",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      middleGuide: {
        title: "중도금 안내",
        position: "process.design.construct.contract.payments.middle.guide",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      middleAmount: {
        title: "중도금",
        position: "process.design.construct.contract.payments.middle.calculation.amount.consumer",
        values: [],
        chain: null
      },
      middleDate: {
        title: "중도금 입금",
        position: "process.design.construct.contract.payments.middle.date",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      remainGuide: {
        title: "잔금 안내",
        position: "process.design.construct.contract.payments.remain.guide",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      remainAmount: {
        title: "잔금",
        position: "process.design.construct.contract.payments.remain.calculation.amount.consumer",
        values: [],
        chain: null
      },
      remainDate: {
        title: "잔금 입금",
        position: "process.design.construct.contract.payments.remain.date",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
    };

    stringArr.push(textMaker(map["status"].title, status, "black", "status"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "status";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;

      position = map[column].position;
      values = map[column].values;
      startLeft = 0;
      width = 100;
      margin = 4;

      background = colorChip.gradientGreen4;
      updateEvent = async function (e) {
        try {
          const value = this.getAttribute("value");
          const position = this.getAttribute("position");
          const proid = this.getAttribute("proid");
          const removeTargets = mother.querySelectorAll("aside");
          let whereQuery, updateQuery;

          whereQuery = { proid };
          updateQuery = {};
          updateQuery[position] = value;
          valueDom.textContent = value;

          await instance.constructUpdate(whereQuery, updateQuery, map[column].chain, value);
          instance.constructDeactivate(proid, /^[드완]/.test(value));

          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }
          resetWidthEvent();

        } catch (e) {
          console.log(e);
        }
      }

      nodeArr = [];
      for (let i = 0; i < values.length; i++) {
        nodeArr.push({
          mother: this,
          mode: "aside",
          attribute: { value: values[i], position, proid: project.proid },
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top + ((margin + height) * i)) + ea,
            left: String(startLeft) + ea,
            width: String(width) + ea,
            height: String(height) + ea,
            background, zIndex, boxShadow, borderRadius, animation,
          }
        });
        nodeArr.push({
          mother: -1,
          text: values[i],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.whiteBlack,
          }
        });
      }
      createNodes(nodeArr);
    });

    stringArr.push(textMaker(map["firstGuide"].title, dateToString(payments.first !== null ? payments.first.guide : emptyDate), dateToColor(payments.first !== null ? payments.first.guide : emptyDate, false), "firstGuide"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      if (window.confirm("계약금 안내를 보낼까요?")) {

        ajaxJson({
          mode: "chargeGuide",
          proid,
          method: "first",
        }, "/constructInteraction", { equal: true }).then((result) => {
          const { date, now } = result;
          window.alert("계약금 안내를 전송하였습니다!");
          mother.querySelector(".value").textContent = date;
          mother.querySelector(".value").style.color = colorChip.black;
          instance.projects.search("proid", proid).process.design.construct.contract.payments.first.guide = now;
          resetWidthEvent();
        }).catch((err) => {
          console.log(err);
        });

      }
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["firstAmount"].title, autoComma(payments.first !== null ? payments.first.calculation.amount.consumer : 0) + '원', "black", "firstAmount"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["firstDate"].title, dateToString(payments.first !== null ? payments.first.date : emptyDate), dateToColor(payments.first !== null ? payments.first.date : emptyDate, false), "firstDate"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["startGuide"].title, dateToString(payments.start !== null ? payments.start.guide : emptyDate), dateToColor(payments.start !== null ? payments.start.guide : emptyDate, false), "startGuide"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      if (window.confirm("착수금 안내를 보낼까요?")) {

        ajaxJson({
          mode: "chargeGuide",
          proid,
          method: "start",
        }, "/constructInteraction", { equal: true }).then((result) => {
          const { date, now } = result;
          window.alert("착수금 안내를 전송하였습니다!");
          mother.querySelector(".value").textContent = date;
          mother.querySelector(".value").style.color = colorChip.black;
          instance.projects.search("proid", proid).process.design.construct.contract.payments.start.guide = now;
          resetWidthEvent();
        }).catch((err) => {
          console.log(err);
        });

      }
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["startAmount"].title, autoComma(payments.start !== null ? payments.start.calculation.amount.consumer : 0) + '원', "black", "startAmount"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["startDate"].title, dateToString(payments.start !== null ? payments.start.date : emptyDate), dateToColor(payments.start !== null ? payments.start.date : emptyDate, false), "startDate"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["middleGuide"].title, dateToString(payments.middle !== null ? payments.middle.guide : emptyDate), dateToColor(payments.middle !== null ? payments.middle.guide : emptyDate, false), "middleGuide"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      if (window.confirm("중도금 안내를 보낼까요?")) {

        ajaxJson({
          mode: "chargeGuide",
          proid,
          method: "middle",
        }, "/constructInteraction", { equal: true }).then((result) => {
          const { date, now } = result;
          window.alert("중도금 안내를 전송하였습니다!");
          mother.querySelector(".value").textContent = date;
          mother.querySelector(".value").style.color = colorChip.black;
          instance.projects.search("proid", proid).process.design.construct.contract.payments.middle.guide = now;
          resetWidthEvent();
        }).catch((err) => {
          console.log(err);
        });

      }
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["middleAmount"].title, autoComma(payments.middle !== null ? payments.middle.calculation.amount.consumer : 0) + '원', "black", "middleAmount"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["middleDate"].title, dateToString(payments.middle !== null ? payments.middle.date : emptyDate), dateToColor(payments.middle !== null ? payments.middle.date : emptyDate, false), "middleDate"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["remainGuide"].title, dateToString(payments.remain !== null ? payments.remain.guide : emptyDate), dateToColor(payments.remain !== null ? payments.remain.guide : emptyDate, false), "remainGuide"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      if (window.confirm("잔금 안내를 보낼까요?")) {

        ajaxJson({
          mode: "chargeGuide",
          proid,
          method: "remain",
        }, "/constructInteraction", { equal: true }).then((result) => {
          const { date, now } = result;
          window.alert("잔금 안내를 전송하였습니다!");
          mother.querySelector(".value").textContent = date;
          mother.querySelector(".value").style.color = colorChip.black;
          instance.projects.search("proid", proid).process.design.construct.contract.payments.remain.guide = now;
          resetWidthEvent();
        }).catch((err) => {
          console.log(err);
        });

      }
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["remainAmount"].title, autoComma(payments.remain !== null ? payments.remain.calculation.amount.consumer : 0) + '원', "black", "remainAmount"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      if (window.confirm("시공 금액을 변경하시겠습니까?")) {
        let answer, answerRaw, boo, message, zeroBoo, loading;
        do {
          do {
            answer = window.prompt("새로운 시공 잔금을 소비자가 기준으로 숫자로만, 또는 만원 단위로 써서 입력해주세요!\n예) 24000000원 또는 2400만원 등등");
            if (typeof answer === "string") {
              answerRaw = answer;
              answer = answer.trim().replace(/[^0-9]/gi, '');
              if (answer === '') {
                boo = false;
              } else {
                answer =  Number(answer);
                if (Number.isNaN(answer)) {
                  boo = false;
                } else {
                  if (answer < 100000) {
                    if (/만/gi.test(answerRaw)) {
                      answer = answer * 10000;
                      boo = true;
                    } else if (/억/gi.test(answerRaw)) {
                      answer = answer * 10000 * 10000;
                      boo = true;
                    } else {
                      boo = false;
                    }
                  } else {
                    boo = true;
                  }
                }
              }
            } else {
              boo = false;
            }
          } while (!boo);
          message = '';
          if ((answer / 10000) > 10000) {
            message = String(answer / (10000 * 10000)) + "억원";
          } else {
            message = String(answer / 10000) + "만원";
          }
          message += "이 맞습니까?";
          zeroBoo = !window.confirm(message);
        } while (zeroBoo);

        loading = instance.mother.grayLoading();
        ajaxJson({ mode: "amountSync", proid, amount: answer }, "/constructInteraction").then(() => {
          loading.remove();
          window.alert("업데이트가 완료되었습니다!");
        }).catch((err) => {
          console.log(err);
        });

        mother.querySelector(".value").textContent = autoComma(answer) + '원';
        instance.projects.search("proid", proid).process.design.construct.contract.payments.remain.calculation.amount.supply = Math.floor(answer) - Math.floor(answer / 11);
        instance.projects.search("proid", proid).process.design.construct.contract.payments.remain.calculation.amount.vat = Math.floor(answer / 11);
        instance.projects.search("proid", proid).process.design.construct.contract.payments.remain.calculation.amount.consumer = Math.floor(answer);

      }
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["remainDate"].title, dateToString(payments.remain !== null ? payments.remain.date : emptyDate), dateToColor(payments.remain !== null ? payments.remain.date : emptyDate, false), "remainDate"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

  }


  return { map, stringArr, updateArr, grayBoo, displayBoo };
}

DesignerJs.prototype.constructUpdate = async function (whereQuery, updateQuery, chainQuery = null, rawValue = '') {
  const instance = this;
  const { colorChip, ajaxJson } = GeneralJs;
  try {
    if (typeof whereQuery !== "object" || typeof updateQuery !== "object") {
      throw new Error("invaild input");
    }
    if (chainQuery !== null) {
      if (chainQuery.condition === undefined || chainQuery.updateQuery === undefined) {
        throw new Error("invaild input");
      }
    }
    const { proid } = whereQuery;
    const project = this.projects.search("proid", proid);
    let tempArr, target;
    let boo;
    let tempQsa0, tempQsa1, tempQsa2;

    await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateProject");

    for (let query in updateQuery) {
      tempArr = query.split('.');
      target = project;
      for (let i = 0; i < tempArr.length - 1; i++) {
        target = target[tempArr[i]];
      }
      target[tempArr[tempArr.length - 1]] = updateQuery[query];
    }

    if (chainQuery !== null) {
      const { condition, updateQuery: chainUpdateQuery } = chainQuery;
      boo = false;
      if ((new RegExp(condition, "gi")).test(rawValue)) {
        boo = true;
      }
      if (boo) {
        await ajaxJson({ whereQuery, updateQuery: chainUpdateQuery }, "/rawUpdateProject");
        for (let query in chainUpdateQuery) {
          tempArr = query.split('.');
          target = project;
          for (let i = 0; i < tempArr.length - 1; i++) {
            target = target[tempArr[i]];
          }
          target[tempArr[tempArr.length - 1]] = chainUpdateQuery[query];
        }
      }
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.constructDeactivate = function (proid, offMode = true) {
  const instance = this;
  const { colorChip, stacks } = GeneralJs;
  let emptyDate, emptyValue;
  let tempQsa;
  let whiteBlock;
  let num;
  let name;
  let tong;
  let children;
  let length;

  whiteBlock = document.getElementById(proid);
  children = whiteBlock.children;
  length = children.length;
  emptyDate = new Date(1800, 0, 1);
  emptyValue = "해당 없음";
  name = "deactive_" + proid;

  if (offMode) {
    stacks[name] = [];
    tong = stacks[name];
    tempQsa = whiteBlock.querySelectorAll("div");
    for (let dom of tempQsa) {
      tong.push(dom.style.color);
      dom.style.color = colorChip.gray4;
    }
    tempQsa = whiteBlock.querySelectorAll("b");
    for (let dom of tempQsa) {
      tong.push(dom.style.color);
      dom.style.color = colorChip.gray4;
    }
    tong.push(whiteBlock.firstChild.style.background);
    whiteBlock.firstChild.style.background = colorChip.gray0;
    tong.push(children[length - 2].style.background);
    children[length - 2].style.background = colorChip.gray0;
    tong.push(children[length - 1].style.background);
    children[length - 1].style.background = colorChip.gray4;
  } else {
    if (Array.isArray(stacks[name])) {
      num = 0;
      tong = stacks[name];
      tempQsa = whiteBlock.querySelectorAll("div");
      for (let dom of tempQsa) {
        dom.style.color = tong[num];
        num = num + 1;
      }
      tempQsa = whiteBlock.querySelectorAll("b");
      for (let dom of tempQsa) {
        dom.style.color = tong[num];
        num = num + 1;
      }
      whiteBlock.firstChild.style.background = tong[num];
      num = num + 1;
      children[length - 2].style.background = tong[num];
      num = num + 1;
      children[length - 1].style.background = tong[num];
    } else {
      if (![ "rgb(255, 255, 255)", "#ffffff", "#fff", "#FFFFFF", "#FFF", "white" ].includes(whiteBlock.firstChild.style.background)) {
        window.location.reload();
      }
    }
  }

}

// LOGIC -----------------------------------------------------------------------------------------------------------------

DesignerJs.prototype.constructBase = function (search = null) {
  const instance = this;
  const { ea, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const { white, green } = colorChip;
  let totalMother;
  let margin;
  let titleArea, contentsArea;
  let titleDesigner, titleProject, titleTime;
  let contentsDesigner, contentsProject, contentsTong;
  let size;
  let borderBack;
  let dashBoardHeight, dashBoardMargin;
  let dashBoard;
  let topMargin, leftMargin;

  margin = 30;
  size = 18;
  dashBoardHeight = 49;
  dashBoardMargin = 16;
  topMargin = 11;
  leftMargin = 10;

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

  [ borderBack, dashBoard, contentsArea, contentsTong ] = createNodes([
    {
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(margin + dashBoardHeight + dashBoardMargin) + ea,
        left: String(margin) + ea,
        width: withOut(margin * 2, ea),
        height: withOut(margin + dashBoardHeight + dashBoardMargin, ea),
        borderBottom: String(0),
        borderTopLeftRadius: String(3) + "px",
        borderTopRightRadius: String(3) + "px",
        boxSizing: "border-box",
        background: colorChip.gray2,
      }
    },
    {
      mother: totalMother,
      style: {
        position: "relative",
        height: String(dashBoardHeight) + ea,
        marginBottom: String(dashBoardMargin) + ea,
        background: colorChip.gray2,
        borderRadius: String(3) + "px",
        textAlign: "center",
      }
    },
    {
      mother: totalMother,
      style: {
        position: "relative",
        height: withOut(dashBoardHeight + dashBoardMargin, ea),
      }
    },
    {
      mother: -1,
      style: {
        display: "block",
        position: "relative",
        paddingTop: String(topMargin) + ea,
        paddingLeft: String(leftMargin) + ea,
        height: String(100) + '%',
        width: String(100) + '%',
        top: String(0) + ea,
        boxSizing: "border-box",
        overflowY: "scroll",
        overflowX: "hidden",
      }
    },
    {
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(margin + dashBoardHeight + dashBoardMargin) + ea,
        right: String(margin) + ea,
        width: String(leftMargin) + ea,
        height: withOut(margin + dashBoardHeight + dashBoardMargin, ea),
        borderBottom: String(0),
        borderTopLeftRadius: String(3) + "px",
        borderTopRightRadius: String(3) + "px",
        boxSizing: "border-box",
        background: colorChip.gray2,
        zIndex: String(4),
      }
    },
    {
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(margin + dashBoardHeight + dashBoardMargin) + ea,
        right: String(0) + ea,
        width: String(margin) + ea,
        height: withOut(margin + dashBoardHeight + dashBoardMargin, ea),
        borderBottom: String(0),
        boxSizing: "border-box",
        background: colorChip.white,
        zIndex: String(4),
      }
    },
  ]);

  this.contentsSpec.contentsTong = contentsTong;
  this.contentsSpec.dashBoard = dashBoard;
  this.constructBlockInjection();
  this.constructDashBoard();
}

DesignerJs.prototype.constructBlockInjection = function () {
  const instance = this;
  const { ea, projects } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren } = GeneralJs;
  const { contentsTong } = this.contentsSpec;
  let scrollTong;
  let width, dom;
  let maxWidth;
  let startLeft, betweenText, widthArr, domArr;
  let temp;
  let firstBoo;
  let leftMargin;
  let firstPaddingTop;
  let tongPaddingBottom;

  leftMargin = 10;
  firstPaddingTop = 44;
  tongPaddingBottom = 500;

  cleanChildren(contentsTong);

  scrollTong = createNode({
    mother: contentsTong,
    style: {
      position: "relative",
      width: withOut(leftMargin, ea),
      overflowX: "hidden",
      paddingTop: String(firstPaddingTop) + ea,
      paddingBottom: String(tongPaddingBottom) + ea,
    }
  });

  maxWidth = [];

  projects.sort((a, b) => { return b.process.contract.form.date.from.valueOf() - a.process.contract.form.date.from.valueOf(); });

  this.scrollTong = scrollTong;
  this.contentsBlocks = [];
  this.ignoreNumbers = [ 3, 1 ];
  this.resetWidthEvent = async function () {
    try {
      const { xyConverting } = GeneralJs;
      const { ignoreNumbers } = instance;
      let children;
      let widthArrMother, widthArrMotherConverted;
      let widthArr;
      let tempArr;

      widthArrMother = [];
      for (let block of instance.contentsBlocks) {
        children = block.children;
        widthArr = [];
        for (let i = 0; i < children.length; i++) {
          if (i >= ignoreNumbers[0] && i < children.length - ignoreNumbers[1]) {
            children[i].style.width = "auto";
          }
          widthArr.push(children[i].getBoundingClientRect().width);
        }
        widthArrMother.push(widthArr);
      }

      widthArrMotherConverted = xyConverting(widthArrMother).map((arr) => {
        arr.sort((a, b) => { return b - a; });
        return arr[0];
      });

      for (let block of instance.contentsBlocks) {
        children = block.children;
        for (let i = ignoreNumbers[0]; i < children.length - ignoreNumbers[1]; i++) {
          children[i].style.width = String(widthArrMotherConverted[i]) + ea;
        }
      }

    } catch (e) {
      console.log(e);
    }
  }

  firstBoo = true;
  for (let i = 0; i < projects.length; i++) {
    if (firstBoo) {
      this.constructWhiteBlock(scrollTong, projects[i], (i === 0), i, true);
      firstBoo = false;
    }
    this.constructWhiteBlock(scrollTong, projects[i], false, i, false);
  }

  this.resetWidthEvent();
  GeneralJs.setQueue(() => {
    instance.resetWidthEvent();
  }, 1000);
}

DesignerJs.prototype.constructWhiteBlock = function (mother, project, first, index, titleMode = false) {
  if (mother === undefined || project === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { ea } = this;
  const { createNode, createNodes, colorChip, withOut, isMac } = GeneralJs;
  const { map, stringArr, updateArr, grayBoo, displayBoo } = this.constructDataRender(project, titleMode);
  let height, margin;
  let whiteBlock;
  let width0, width1;
  let top, left, size;
  let textMargin;
  let previousWidth, betweenText;
  let widthArr, domArr;
  let tempQsa;
  let whiteBack;
  let whiteWidth;
  let tempDom;
  let factorHeight;
  let leftMargin;
  let motherMargin;
  let titleBlockTop;
  let menuMargin;
  let menuHeight;
  let menuTextTop;

  leftMargin = 10;
  motherMargin = 30;

  height = 43;
  margin = 1;

  width0 = 115;
  width1 = 3;
  titleBlockTop = 105;

  top = (titleMode ? (isMac() ? 11 : 12) : (isMac() ? 11 : 12));
  left = 16;
  size = 14;
  textMargin = 6;
  betweenText = 50;

  whiteWidth = 16;
  factorHeight = 20;

  menuMargin = 24;
  menuHeight = 32;
  menuTextTop = isMac() ? 6 : 7;

  whiteBlock = createNode({
    mother,
    id: titleMode ? "title" : project.proid,
    attribute: [
      { index: String(index) },
      { sortstandard: "" },
      { sort: "1" },
      { titlemode: titleMode ? 1 : 0 }
    ],
    style: {
      display: (first ? "block" : instance.contentsSearchIndex.includes(index) ? "none" : (displayBoo ? "block" : "none")),
      position: titleMode ? "fixed" : "relative",
      width: String(8000) + ea,
      height: String(height) + ea,
      marginBottom: String(margin) + ea,
      transition: "all 0s ease",
      zIndex: titleMode ? String(4) : "",
      top: titleMode ? String(titleBlockTop) + ea : "",
    },
    children: [
      {
        style: {
          position: "absolute",
          width: "calc(100vw - " + String((motherMargin * 2) + (leftMargin * 2)) + ea + ")",
          height: String(100) + '%',
          borderRadius: String(3) + "px",
          background: titleMode ? colorChip.gradientGreen2 : colorChip[grayBoo ? "white" : "gray0"],
          top: String(0),
          left: String(0),
          transition: "all 0s ease",
          boxShadow: titleMode ? "0px 2px 13px -9px " + colorChip.shadow : "",
          opacity: titleMode ? String(0.92) : "",
        }
      },
      {
        text: !titleMode ? project.title : "",
        class: [ "hoverDefault" ],
        events: [
          {
            type: "click",
            event: function (e) {
              window.location.href = window.location.protocol + "//" + window.location.host + "/project?proid=" + project.proid;
            }
          }
        ],
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          width: String(width0) + ea,
          top: String(top + (isMac() ? 1 : 0)) + ea,
          marginLeft: String(left) + ea,
          fontSize: String(size) + ea,
          zIndex: String(2),
          color: colorChip.black,
          transition: "all 0s ease",
        }
      },
      {
        text: !titleMode ? '|' : "",
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          width: String(width1) + ea,
          top: String(top + (isMac() ? 1 : 0)) + ea,
          marginLeft: String(textMargin) + ea,
          fontSize: String(size) + ea,
          color: colorChip.gray4,
          zIndex: String(2),
          transition: "all 0s ease",
        }
      },
    ]
  });

  widthArr = [];
  domArr = [];
  for (let i = 0; i < stringArr.length; i++) {
    tempDom = createNode({
      mother: whiteBlock,
      attribute: [
        { index: String(index) },
        { arrindex: String(i) },
        { titlemode: titleMode ? 1 : 0 },
        { sort: String(1), }
      ],
      text: stringArr[i],
      class: [ "white_child_" + String(i) ],
      events: [
        {
          type: [ "click", "contextmenu" ],
          event: function (e) {
            e.stopPropagation();
            e.preventDefault();
            const { ea, ignoreNumbers, contentsBlocks, scrollTong } = instance;
            const { createNode, createNodes, colorChip, withOut, xyConverting } = GeneralJs;
            const titleMode = Number(this.getAttribute("titlemode")) === 1;
            const thisIndex = Number(this.getAttribute("arrindex"));
            const thisSort = Number(this.getAttribute("sort"));
            if (titleMode) {
              const targets = contentsBlocks.map((dom, index) => { return { dom, index: index - 1 }; }).slice(1);
              const children = xyConverting(targets.map((obj) => { return [ ...obj.dom.children ].slice(ignoreNumbers[0], -1 * ignoreNumbers[1]); }));
              const sortTargets = children[thisIndex];
              let indexArr, tempIndex, numberSortBoo;

              numberSortBoo = sortTargets.map((dom) => { return dom.querySelector(".value").textContent; }).some((str) => { return (str.replace(/[0-9\-\.\: ]/gi, '').trim() === '' && /[0-9]/gi.test(str)) });

              if (!numberSortBoo) {
                if (thisSort === 1) {
                  sortTargets.sort((a, b) => {
                    return b.querySelector(".value").textContent > a.querySelector(".value").textContent ? 1 : -1;
                  });
                  this.setAttribute("sort", String(0));
                } else {
                  sortTargets.sort((a, b) => {
                    return a.querySelector(".value").textContent > b.querySelector(".value").textContent ? 1 : -1;
                  });
                  this.setAttribute("sort", String(1));
                }
              } else {
                if (thisSort === 1) {
                  sortTargets.sort((a, b) => {
                    return (b.querySelector(".value").textContent.replace(/[^0-9]/gi, '') === '' ? 0 : Number(b.querySelector(".value").textContent.replace(/[^0-9]/gi, ''))) - (a.querySelector(".value").textContent.replace(/[^0-9]/gi, '') === '' ? 0 : Number(a.querySelector(".value").textContent.replace(/[^0-9]/gi, '')));
                  });
                  this.setAttribute("sort", String(0));
                } else {
                  sortTargets.sort((a, b) => {
                    return (a.querySelector(".value").textContent.replace(/[^0-9]/gi, '') === '' ? 90000 * 90000 : Number(a.querySelector(".value").textContent.replace(/[^0-9]/gi, ''))) - (b.querySelector(".value").textContent.replace(/[^0-9]/gi, '') === '' ? 90000 * 90000 : Number(b.querySelector(".value").textContent.replace(/[^0-9]/gi, '')));
                  });
                  this.setAttribute("sort", String(1));
                }
              }

              indexArr = sortTargets.map((dom) => { return Number(dom.getAttribute("index")) });
              for (let index of indexArr) {
                tempIndex = targets.findIndex((obj) => { return obj.index === index });
                if (tempIndex !== -1) {
                  scrollTong.appendChild(targets[tempIndex].dom);
                }
              }

            } else {
              if (this.querySelectorAll("aside").length === 0) {
                const self = this;
                const index = Number(this.getAttribute("arrindex"));
                const valueDom = this.querySelector(".value");
                let thisCase;
                thisCase = {};
                for (let column in map) {
                  if (document.getElementById(project.proid + "_" + column) === null) {
                    throw new Error("invaild doms : " + column);
                  }
                  thisCase[column] = document.getElementById(project.proid + "_" + column);
                }
                const option = {
                  ea,
                  top: menuMargin,
                  createNode,
                  createNodes,
                  colorChip,
                  withOut,
                  thisCase,
                  boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
                  animation: "fadeuplite 0.2s ease forwards",
                  borderRadius: String(5) + "px",
                  zIndex: String(3),
                  valueDom,
                  height: menuHeight,
                  size: size - 1,
                  textTop: menuTextTop
                };
                let cancelBox, parent;

                parent = this.parentElement;
                cancelBox = createNode({
                  mother: this,
                  mode: "aside",
                  events: [
                    {
                      type: "click",
                      event: async function (e) {
                        try {
                          e.stopPropagation();
                          e.preventDefault();
                          const directParent = this.parentElement;
                          const removeTargets = directParent.querySelectorAll("aside");
                          for (let dom of removeTargets) {
                            directParent.removeChild(dom);
                          }
                          instance.resetWidthEvent();
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    }
                  ],
                  style: {
                    position: "fixed",
                    top: String(0) + ea,
                    left: String(0) + ea,
                    width: String(100) + '%',
                    height: String(100) + '%',
                    background: "transparent",
                    zIndex: option.zIndex,
                  }
                });

                updateArr[index].call(this, e, option, cancelBox, parent, instance.resetWidthEvent);
              }
            }
          }
        },
      ],
      style: {
        display: "inline-block",
        verticalAlign: "top",
        position: "relative",
        top: String(top) + ea,
        marginLeft: String(betweenText) + ea,
        fontSize: String(size) + ea,
        fontWeight: String(titleMode ? 700 : 500),
        height: ((i === stringArr.length - 1) ? String(factorHeight) + ea : ""),
        overflow: ((i === stringArr.length - 1) ? "hidden" : "visible"),
        transition: "all 0s ease",
        cursor: "pointer",
      }
    });
    domArr.push(tempDom);
    previousWidth = tempDom.getBoundingClientRect().width;
    widthArr.push(previousWidth);
  }

  whiteBack = createNode({
    mother: whiteBlock,
    style: {
      position: "absolute",
      top: String(0) + ea,
      right: String(0) + ea,
      width: String(whiteWidth) + ea,
      height: String(100) + '%',
      background: colorChip.white
    }
  });

  if (!grayBoo) {
    tempQsa = whiteBlock.querySelectorAll("div");
    for (let dom of tempQsa) {
      dom.style.color = colorChip.gray4;
    }
    tempQsa = whiteBlock.querySelectorAll("b");
    for (let dom of tempQsa) {
      dom.style.color = colorChip.gray4;
    }
    whiteBlock.children[2].style.background = colorChip.gray0;
    whiteBack.style.background = colorChip.gray0;
  }

  this.contentsBlocks.push(whiteBlock);

}

DesignerJs.prototype.constructDashBoard = function () {
  const instance = this;
  const { ea, projects } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const { dashBoard } = this.contentsSpec;
  let size, top, left;
  let nodeArr;
  let textArr;
  let typeNum;
  let dashBoardBox;

  size = 16;
  top = 11;
  left = 19;

  textArr = [];
  typeNum = 0;
  for (let i = 0; i < this.typeArr.length; i++) {
    if (this.typeArr[i] === this.type) {
      typeNum = i;
    }
    textArr.push(this.typeArr[i].slice(0, 1).toUpperCase() + this.typeArr[i].slice(1));
  }

  dashBoardBox = createNode({
    mother: dashBoard,
    style: {
      position: "relative",
      width: withOut(left * 2, ea),
      height: String(100) + '%',
      left: String(left) + ea,
      textAlign: "left",
    }
  });

  nodeArr = [];
  for (let i = 0; i < textArr.length; i++) {
    nodeArr.push({
      mother: dashBoardBox,
      text: textArr[i],
      class: [ "hoverDefault" ],
      attribute: [
        { value: instance.typeArr[i] }
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            instance.type = this.getAttribute("value");
            for (let i = 0; i < instance.typeArr.length; i++) {
              if (instance.typeArr[i] === instance.type) {
                instance.typeDoms[i].style.color = colorChip.green;
              } else {
                instance.typeDoms[i].style.color = colorChip.shadowWhite;
              }
            }
            instance.constructBlockInjection();
          }
        }
      ],
      style: {
        display: "inline-block",
        position: "relative",
        fontFamily: "graphik",
        fontSize: String(size) + ea,
        fontWeight: String(400),
        top: String(top) + ea,
        color: colorChip[i === typeNum ? "green" : "shadowWhite"],
      }
    });
    if (i !== textArr.length - 1) {
      nodeArr.push({
        mother: dashBoardBox,
        text: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`,
        style: {
          display: "inline-block",
          position: "relative",
          fontFamily: "graphik",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          top: String(top) + ea,
          color: colorChip.gray5
        }
      });
    }
  }
  nodeArr.push({
    mother: dashBoardBox,
    text: 'D',
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/designer?mode=general");
        }
      }
    ],
    style: {
      position: "absolute",
      fontFamily: "graphik",
      fontSize: String(size + 2) + ea,
      fontWeight: String(500),
      top: String(top - 1) + ea,
      right: String(0) + ea,
      fontStyle: "italic",
      color: colorChip.black,
    }
  });
  nodeArr.push({
    mother: dashBoardBox,
    text: 'C',
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/project");
        }
      }
    ],
    style: {
      position: "absolute",
      fontFamily: "graphik",
      fontSize: String(size + 2) + ea,
      fontWeight: String(500),
      top: String(top - 1) + ea,
      right: String(18) + ea,
      fontStyle: "italic",
      color: colorChip.black,
    }
  });

  nodeArr.push({
    mother: dashBoardBox,
    mode: "svg",
    source: this.mother.returnHamburger(colorChip.black),
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          instance.contentsSearchIndex = [];
          instance.constructBlockInjection();
        }
      }
    ],
    style: {
      position: "absolute",
      height: String(11) + ea,
      top: String(18) + ea,
      right: String(38) + ea,
    }
  });

  nodeArr = createNodes(nodeArr);
  instance.typeDoms = [];
  for (let i = 0; i < nodeArr.length; i++) {
    if (i % 2 === 0) {
      instance.typeDoms.push(nodeArr[i]);
    }
  }
}

DesignerJs.prototype.constructSearchEvent = function () {
  const instance = this;
  const { ea } = this;
  const input = this.searchInput;
  let width, length;

  length = this.projects.length;
  width = 800;

  input.parentNode.style.width = String(width) + ea;
  input.parentNode.style.left = GeneralJs.withOut(50, width / 2, ea);
  input.addEventListener("keypress", function (e) {
    let tempArr, orArr;
    if (e.key === "Enter") {
      instance.contentsSearchIndex = [];
      orArr = [];
      tempArr = this.value.trim().split(',');
      for (let value of tempArr) {
        if (value.trim() !== '' && value.trim() !== '.') {
          for (let dom of instance.contentsBlocks) {
            if ((new RegExp(value.trim(), "gi")).test(dom.textContent)) {
              orArr.push(Number(dom.getAttribute("index")));
            }
          }
        }
      }
      if (this.value.trim() !== '' && this.value.trim() !== '.') {
        for (let i = 0; i < length; i++) {
          if (!orArr.includes(i)) {
            instance.contentsSearchIndex.push(i);
          }
        }
      }
      instance.constructBlockInjection();
    }
  });
}

DesignerJs.prototype.contentsExtractEvent = function () {
  const instance = this;
  const { ignoreNumbers, parentId, sheetName } = this;
  const { ajaxJson, blankHref } = GeneralJs;
  const { belowButtons: { sub: { extractIcon } } } = this.mother;

  extractIcon.addEventListener("click", async function (e) {
    try {
      const domTargets = instance.contentsBlocks.filter((dom) => {
        return (dom.id !== "title") && (dom.style.display !== "none");
      });
      const childrenTargets = domTargets.map((dom) => {
        let target = [ ...dom.children ].slice(ignoreNumbers[0], -1 * ignoreNumbers[1]);
        target.unshift(dom.children[1]);
        return target;
      });
      const newMake = true;
      let values, titleMatrix;
      let loading;

      values = childrenTargets.map((arr) => {
        return arr.map((dom) => {
          if (dom.querySelector(".value") !== null) {
            return dom.querySelector(".value").textContent;
          } else {
            return dom.textContent;
          }
        });
      })

      titleMatrix = childrenTargets.map((arr) => {
        return arr.map((dom) => {
          if (dom.querySelector(".value") !== null) {
            return dom.querySelector(".value").getAttribute("title");
          } else {
            return "이름";
          }
        });
      })

      if (titleMatrix.length > 0) {
        values.unshift(titleMatrix[0]);
        loading = instance.mother.grayLoading();
        const { link } = await ajaxJson({ values, newMake, parentId, sheetName }, "/sendSheets");
        loading.remove();
        blankHref(link);
      }
    } catch (e) {
      console.log(e);
    }
  });
}

DesignerJs.prototype.constructBlockMove = function () {
  const instance = this;
  const { ea } = this;
  const { belowButtons: { arrow: { left, right } } } = this.mother;
  const moveEvent = function (type = "left") {
    return function (e) {
      const blocks = instance.contentsBlocks;
      const movementAmount = 50;
      const ignoreNumbers = [ 1, 1 ];
      let children;
      let left;
      for (let block of blocks) {
        children = block.children;
        for (let i = ignoreNumbers[0]; i < children.length - ignoreNumbers[1]; i++) {
          left = Number(children[i].style.left.replace(/[^0-9\-\.]/gi, ''));
          left = left + (movementAmount * (type === "left" ? -1 : 1));
          children[i].style.left = String(left) + ea;
        }
      }
    }
  }
  left.addEventListener("click", moveEvent("left"));
  right.addEventListener("click", moveEvent("right"));
}

DesignerJs.prototype.constructView = async function () {
  const instance = this;
  try {
    class SearchArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(target, value) {
        let obj = null;
        for (let i of this) {
          if (i[target] === value) {
            obj = i;
          }
        }
        return obj;
      }
    }
    const { createNodes, colorChip, ajaxJson, returnGet, equalJson, sleep, uniqueValue } = GeneralJs;
    const todayDateValue = (new Date()).valueOf();
    let loading;
    let projects;
    let designers, desidArr_raw, desidArr;
    let clients, cliidArr_raw, cliidArr;
    let contents;
    let type, typeArr;
    let projectHistory;
    let proidArr;
    let whereQuery;
    let client;
    let requestNumber;
    let builders, builderNames;

    loading = await this.mother.loadingRun();

    typeArr = [ "construct", "payment" ];
    type = returnGet().type;
    if (type === undefined || type === null || !typeArr.includes(type)) {
      type = typeArr[0];
    }

    this.parentId = "1lmed8VkFcNFkSdSj4RoT3dYpqLbHU1ps";
    this.sheetName = "fromDB_construct_" + uniqueValue("string");
    this.typeArr = typeArr;
    this.type = type;
    this.contentsSpec = {};
    this.contentsSearchIndex = [];
    this.contentsBlocks = null;

    whereQuery = {};
    whereQuery["$and"] = [];
    whereQuery["$and"].push({ desid: { $regex: "^d" } });
    whereQuery["$and"].push({ "process.status": { $regex: "^[진홀완]" } });

    projects = await ajaxJson({ noFlat: true, whereQuery }, "/getProjects", { equal: true });
    projects = new SearchArray(projects.filter((obj) => { return obj.process.design.construct !== null }));

    desidArr_raw = [];
    cliidArr_raw = [];
    proidArr = [];
    for (let project of projects) {
      desidArr_raw.push(project.desid);
      cliidArr_raw.push(project.cliid);
      proidArr.push(project.proid);
    }

    desidArr_raw = Array.from(new Set(desidArr_raw));
    desidArr = [];
    for (let desid of desidArr_raw) {
      desidArr.push({ desid });
    }
    cliidArr_raw = Array.from(new Set(cliidArr_raw));
    cliidArr = [];
    for (let cliid of cliidArr_raw) {
      cliidArr.push({ cliid });
    }

    designers = new SearchArray(await ajaxJson({
      noFlat: true,
      whereQuery: {
        $or: desidArr
      }
    }, "/getDesigners", { equal: true }));

    clients = new SearchArray(await ajaxJson({
      noFlat: true,
      whereQuery: {
        $or: cliidArr
      }
    }, "/getClients", { equal: true }));

    projectHistory = await ajaxJson({
      idArr: proidArr,
      method: "project",
      property: "construct",
    }, "/getHistoryProperty", { equal: true });

    for (let p of projects) {
      p.designer = designers.search("desid", p.desid).designer;
      client = clients.search("cliid", p.cliid);
      p.name = client.name;
      p.phone = client.phone;
      requestNumber = 0;
      for (let i = 0; i < client.requests.length; i++) {
        if (p.proposal.date.valueOf() >= client.requests[i].request.timeline.valueOf()) {
          requestNumber = i;
          break;
        }
      }
      p.address = client.requests[requestNumber].request.space.address;
      p.title = `${p.name} <b style="color:${colorChip.green}">C</b>&nbsp;&nbsp;${p.designer} <b style="color:${colorChip.green}">D</b>`;
      p.history = projectHistory[p.proid];
    }

    builders = await ajaxJson({ noFlat: true, whereQuery: {} }, "/getBuilders", { equal: true });
    builderNames = builders.map((obj) => {
      if (obj.information.business.company.trim() === '') {
        return obj.builder;
      } else {
        return obj.builder + "_" + obj.information.business.company;
      }
    });
    builderNames.push("외부업체");

    this.builderNames = builderNames;
    this.projects = projects;
    this.designers = new Designers(designers);
    this.designers.setProjects(projects);
    this.designers.setClients(clients);

    loading.parentNode.removeChild(loading);

    this.constructBase();
    this.constructSearchEvent();
    this.constructBlockMove();
    this.contentsExtractEvent();

  } catch (e) {
    console.log(e);
  }
}
