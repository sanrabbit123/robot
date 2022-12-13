// DATA -----------------------------------------------------------------------------------------------------------------

BuilderJs.prototype.constructDataRender = function (project, titleMode) {
  const instance = this;
  const { ea, resetWidthEvent } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, dateToString, autoComma, equalJson, ajaxJson, sleep } = GeneralJs;
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
  const emptyDateValue = ((new Date(2000, 0, 1))).valueOf();
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
  let statusValuesMatrix;

  height = 43;
  margin = 1;

  top = (titleMode ? (isMac() ? 12 : 13) : (isMac() ? 11 : 12.5));
  left = 16;
  size = 14;
  startLeft = 0;

  stringArr = [];
  updateArr = [];

  grayBoo = ![ "완료", "고객 완료", "디자이너 완료", "드랍" ].includes(status);

  statusValuesMatrix = [
    [ "대기" ],
    [ "의뢰서 작성중" ],
    [ "견적 확인중" ],
    [ "견적 안내" ],
    [ "홈리에종 진행", "고객 진행", "디자이너 진행" ],
    [ "미팅 예정", "-", "-" ],
    [ "계약 발송", "-", "-" ],
    [ "계약금 입금", "-", "-" ],
    [ "착수금 입금", "-", "확인 필요" ],
    [ "중도금 입금", "-", "확인 요청" ],
    [ "잔금 입금", "-", "수수료 요청" ],
    [ "AS 진행중", "-", "AS 진행중" ],
    [ "완료", "고객 완료", "디자이너 완료" ],
    [ "드랍" ],
    [ "해당 없음" ],
  ];

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
        title: "견적 발생",
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
      const { ea, top, createNode, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "status";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let maxColumnNumber;
      let tong, tongTong;
      let factorWidth;
      let paddingLeft;
      let unitBlockWidth;
      let factor, factorTong, factorWidthTong;
      let tempMax;
      let maxTong;
      let maxWidth;
      let tongTongArr;
      let children;

      position = map[column].position;
      values = map[column].values;
      startLeft = 0;
      factorWidth = 500;
      margin = 4;
      paddingLeft = 14;
      maxColumnNumber = statusValuesMatrix.map((arr) => { return arr.length }).reduce((acc, curr) => { return Math.max(acc, curr) });
      width = (factorWidth * maxColumnNumber) + (margin * (maxColumnNumber - 1));

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

      tong = createNode({
        mother: this,
        mode: "aside",
        style: {
          display: "block",
          position: "absolute",
          top: String(top) + ea,
          left: String(startLeft) + ea,
          width: String(width) + ea,
          height: "auto",
          transition: "all 0s ease",
          zIndex, animation
        }
      });

      maxTong = [];
      tongTongArr = [];
      for (let arr of statusValuesMatrix) {

        unitBlockWidth = (width - (margin * (arr.length - 1))) / arr.length;
        unitBlockWidth = unitBlockWidth - (paddingLeft * 2);

        tongTong = createNode({
          mother: tong,
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            marginBottom: String(margin) + ea,
            height: String(height) + ea,
            width: String(100) + '%',
          }
        });
        tongTongArr.push(tongTong);

        factorTong = [];
        for (let i = 0; i < arr.length; i++) {
          factor = createNode({
            mother: tongTong,
            attribute: { value: arr[i], position, proid: project.proid },
            events: [ { type: "click", event: updateEvent } ],
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(unitBlockWidth) + ea,
              height: String(100) + '%',
              paddingLeft: String(paddingLeft) + ea,
              paddingRight: String(paddingLeft) + ea,
              marginRight: String(i !== arr.length - 1 ? margin : 0) + ea,
              background: (arr[i].trim() !== '-' && arr[i].trim() !== '' ? colorChip.gradientGreen : colorChip.deactive),
              justifyContent: "center",
              transition: "all 0s ease",
              boxShadow, borderRadius,
            },
            children: [
              {
                text: arr[i],
                style: {
                  position: "relative",
                  top: String(textTop) + ea,
                  fontSize: String(size) + ea,
                  fontWeight: String(500),
                  color: colorChip.whiteBlack,
                }
              }
            ]
          });
          factorTong.push(factor);
        }

        for (let dom of factorTong) {
          dom.style.width = "auto";
        }
        factorWidthTong = factorTong.map((dom) => { return dom.getBoundingClientRect().width });
        tempMax = Math.max(...factorWidthTong);
        for (let dom of factorTong) {
          dom.style.width = String(tempMax) + ea;
        }
        maxTong.push((tempMax * arr.length) + (margin * (arr.length - 1)));

      }

      maxWidth = Math.max(...maxTong);
      tong.style.width = String(maxWidth) + ea;

      for (let tongTong of tongTongArr) {
        children = [ ...tongTong.children ];
        unitBlockWidth = (maxWidth - (margin * (children.length - 1))) / children.length;
        unitBlockWidth = unitBlockWidth - (paddingLeft * 2);
        for (let dom of children) {
          dom.style.width = String(unitBlockWidth) + ea;
        }
      }

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
          let thisBuilder, thisBuiid, newInvoice;
          let loading;

          do {
            thisBuilder = await GeneralJs.prompt("어느 소장님이 만드실 견적서인가요? 소장님 이름을 알려주세요!");
          } while (thisBuilder === null || !instance.builders.map((obj) => { return obj.builder }).includes(thisBuilder));

          if (instance.builders.map((obj) => { return obj.builder }).filter((str) => { return str === thisBuilder }).length !== 1) {
            do {
              thisBuiid = await GeneralJs.prompt("중복되는 이름이 있습니다. 소장님 아이디로 알려주세요!");
            } while (thisBuiid === null || !instance.builders.map((obj) => { return obj.buiid }).includes(thisBuiid));
          } else {
            thisBuiid = instance.builders.find((obj) => { return obj.builder === thisBuilder }).buiid;
          }

          loading = instance.mother.grayLoading();
          // if (window.confirm("견적 관리 페이지로 갈까요?")) {
          //   window.location.href = window.location.protocol + "//" + window.location.host + "/builder?mode=estimation&buiid=" + thisBuiid;
          // }
          //
          // newInvoice = await ajaxJson({ buiid: thisBuiid, proid: project.proid }, "/pythonPass_invoiceCreate", { equal: true });

          tempArr = value.split('-');

          thisProject = instance.projects.search("proid", project.proid);
          thisEstimate = thisProject.process.design.construct.estimate;
          thisEstimate.unshift({
            invid: null,
            date: new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')))
          });
          thisEstimate.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

          instance.projects.search("proid", project.proid).process.design.construct.estimate = equalJson(JSON.stringify(thisEstimate));
          updateQuery[position] = thisEstimate;

          await instance.constructUpdate(whereQuery, updateQuery, chainQuery, value);

          loading.remove();

          valueDom.textContent = thisEstimate.map((obj) => { return dateToString(obj.date) }).join(", ");

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
      width = 126;
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
    updateArr.push(function (e, option, cancelBox, parent) {
      class DomMap extends Array {

        thisDom(kind, contentsKey) {
          let target;
          target = null;
          for (let key in this) {
            if (key.replace(/[0-9]/gi, '') !== '') {
              if (kind === key) {
                target = this[key].contents[contentsKey];
              }
            }
          }
          return target;
        }

        oppositeDoms(kind, contentsKey) {
          let tong;
          tong = [];
          for (let key in this) {
            if (key.replace(/[0-9]/gi, '') !== '') {
              if (kind !== key) {
                tong.push(this[key].contents[contentsKey]);
              }
            }
          }
          return tong;
        }

        get totalDom() {
          return this[0].total;
        }

      }
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
      let totalTong;
      let totalBase;
      let titleArea, contentsArea;
      let dom_constructName, dom_address, dom_range, dom_total, dom_first, dom_start, dom_middle, dom_remain;
      let contractContentsMap;
      let ratio, money, date, etc;
      let tempDom;
      let domMap;
      let tempTitleDom, tempContentsDoms;
      let tempRatioDom, tempMoneyDom, tempDateDom, tempEtcDom;
      let ratioEventFunction, moneyEventFunction, dateEventFunction, etcEventFunction;
      let tempObj;
      let totalValueDom;
      let greenInputEvent;

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

      contractContentsMap = [
        {
          kind: "first",
          title: "계약금 정보",
          contents: [
            (String(Math.round(firstRatio * 100)) + "%"),
            (autoComma(firstMoney) + "원"),
            dateToString(project.history.payments.first.date),
            (project.history.payments.first.etc === '' ? "해당 없음" : project.history.payments.first.etc),
          ]
        },
        {
          kind: "start",
          title: "착수금 정보",
          contents: [
            (String(Math.round(startRatio * 100)) + "%"),
            (autoComma(startMoney) + "원"),
            dateToString(project.history.payments.start.date),
            (project.history.payments.start.etc === '' ? "해당 없음" : project.history.payments.start.etc)
          ]
        },
        {
          kind: "middle",
          title: "중도금 정보",
          contents: [
            (String(Math.round(middleRatio * 100)) + "%"),
            (autoComma(middleMoney) + "원"),
            dateToString(project.history.payments.middle.date),
            (project.history.payments.middle.etc === '' ? "해당 없음" : project.history.payments.middle.etc)
          ]
        },
        {
          kind: "remain",
          title: "잔금 정보",
          contents: [
            (String(Math.round(remainRatio * 100)) + "%"),
            (autoComma(remainMoney) + "원"),
            dateToString(project.history.payments.remain.date),
            (project.history.payments.remain.etc === '' ? "해당 없음" : project.history.payments.remain.etc)
          ]
        },
      ];
      domMap = new DomMap();

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
                            email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail
                          }, "/updateProjectHistory");
                          instance.projects.search("proid", project.proid).history[key === "historyName" ? "name" : "address"] = value;
                          div.textContent = value;
                        } else {
                          value = Number(this.value.replace(/[^0-9\.\-]/gi, ''));
                          if (!Number.isNaN(value)) {

                            totalNumber = Math.floor(value);
                            questions = [
                              { question: "계약금의 비율을 숫자로만 알려주세요! 단위 %", answer: null, target: "first", dom: 4, column: "ratio" },
                              { question: "착수금의 비율을 숫자로만 알려주세요! 단위 %", answer: null, target: "start", dom: 5, column: "ratio" },
                              { question: "중도금의 비율을 숫자로만 알려주세요! 단위 %", answer: null, target: "middle", dom: 6, column: "ratio" },
                              { question: "잔금의 비율을 숫자로만 알려주세요! 단위 %", answer: null, target: "remain", dom: 7, column: "ratio" },
                            ];

                            for (let obj of questions) {
                              do {
                                answer = await GeneralJs.prompt(obj.question);
                              } while (answer === null || answer === '');
                              obj.answer = Math.floor(Number(answer.replace(/[^0-9\.\-]/gi, '')));
                            }

                            if (questions.some((obj) => { return typeof obj.answer !== "string" && typeof obj.answer !== "number" })) {
                              window.alert("올바른 값이 아닙니다!");
                            } else {

                              result = {};
                              for (let { answer, target, column, dom } of questions) {
                                if (result[target] === undefined) {
                                  result[target] = {};
                                }
                                result[target][column] = answer;
                                self.parentNode.parentNode.parentNode.children[dom].children[1].children[0].children[0].setAttribute("value", String(answer) + '%');
                                self.parentNode.parentNode.parentNode.children[dom].children[1].children[0].children[0].textContent = String(answer) + '%';
                                self.parentNode.parentNode.parentNode.children[dom].children[1].children[0].children[2].setAttribute("value", autoComma(Math.round(totalNumber * (answer / 100))) + '원');
                                self.parentNode.parentNode.parentNode.children[dom].children[1].children[0].children[2].textContent = autoComma(Math.round(totalNumber * (answer / 100))) + '원';
                              }

                              result.total = totalNumber;
                              result.proid = project.proid;
                              result.mode = "updatePayments";

                              ajaxResult = await GeneralJs.ajaxJson(result, "/constructInteraction", { equal: true });
                              if (ajaxResult.message === "success") {
                                const { core } = ajaxResult;

                                instance.projects.search("proid", project.proid).process.design.construct.contract.payments.first = core.first;
                                instance.projects.search("proid", project.proid).process.design.construct.contract.payments.start = core.start;
                                instance.projects.search("proid", project.proid).process.design.construct.contract.payments.middle = core.middle;
                                instance.projects.search("proid", project.proid).process.design.construct.contract.payments.remain = core.remain;
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
              input.value = div.textContent;

              input.focus();

            } catch (e) {
              console.log(e);
            }
          }
        }

        totalTong = createNode({
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
          }
        });

        totalBase = createNode({
          mother: totalTong,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "relative",
            top: String(0),
            left: String(0),
            width: String(100) + '%',
            height: String(100) + '%',
          },
        });

        titleArea = createNode({
          mother: totalBase,
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

                        contractName = await GeneralJs.prompt("계약서 작성시 별도의 이름이 있나요? (별도로 없다면 '없음' 또는 공백)");
                        if (contractName === null || (typeof contractName === "string" && contractName.trim() === '') || (typeof contractName === "string" && /없/gi.test(contractName))) {
                          contractName = project.name;
                        }
                        contractAddress = await GeneralJs.prompt("계약서 작성시 별도의 주소가 있나요? (별도로 없다면 '없음' 또는 공백)");
                        if (contractAddress === null || (typeof contractAddress === "string" && contractAddress.trim() === '') || (typeof contractAddress === "string" && /없/gi.test(contractAddress))) {
                          contractAddress = project.address;
                        }
                        contractPhone = await GeneralJs.prompt("계약서 작성시 별도의 사업자 번호가 있나요? (별도로 없다면 '없음' 또는 공백)");
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
        });

        contentsArea = createNode({
          mother: totalBase,
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
        });

        dom_constructName = createNode({
          mother: contentsArea,
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
        });
        dom_address = createNode({
          mother: contentsArea,
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
        });
        dom_range = createNode({
          mother: contentsArea,
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
        });
        dom_total = createNode({
          mother: contentsArea,
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
            }
          ]
        });

        totalValueDom = createNode({
          mother: dom_total.children[1],
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
              attribute: {
                value: autoComma(totalMoney) + "원"
              },
              text: autoComma(totalMoney) + "원",
              style: {
                display: "inline-block",
                fontSize: String(textSize) + ea,
                fontWeight: String(areaWeight),
                color: colorChip.black,
              }
            }
          ]
        }).firstChild;

        greenInputEvent = (callback) => {
          return function (e) {
            const self = this;
            let cancel, input;
            cancel = createNode({
              mother: this,
              mode: "aside",
              event: {
                selectstart: (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                },
                click: function (e) {
                  e.stopPropagation();
                  e.preventDefault();
                  self.removeChild(self.lastChild);
                  self.removeChild(self.lastChild);
                }
              },
              style: {
                position: "fixed",
                top: String(0) + ea,
                left: String(0) + ea,
                width: String(window.outerWidth) + ea,
                height: String(window.outerHeight) + ea,
                background: "transparent",
                zIndex: String(1),
                transition: "all 0s ease",
              }
            });
            cancel.style.top = String(cancel.getBoundingClientRect().top * -1) + ea;
            cancel.style.left = String(cancel.getBoundingClientRect().left * -1) + ea;
            cancel.style.width = String(window.innerWidth) + ea;

            input = createNode({
              mother: this,
              mode: "input",
              event: {
                selectstart: (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                },
                click: (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                },
                keypress: async function (e) {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    e.preventDefault();
                    await callback(this.value);
                    self.removeChild(self.lastChild);
                    self.removeChild(self.lastChild);
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
                width: String(self.getBoundingClientRect().width + 10) + ea,
                height: String(100) + '%',
                zIndex: String(1),
              }
            });
            input.value = this.getAttribute("value");
            input.focus();
          }
        }

        ratioEventFunction = (kind) => {
          return function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.querySelector("input") === null) {
              greenInputEvent(async (value) => {
                try {
                  const max = 100;
                  const unit = '%';
                  const key = "ratio";
                  const amountKey = "amount";
                  const thisDom = domMap.thisDom(kind, key);
                  const thisValue = Number(value.replace(/[^0-9\-\.]/gi, ''));
                  const thisAmountDom = domMap.thisDom(kind, amountKey);
                  const [ oppoDom0, oppoDom1, oppoDom2 ] = domMap.oppositeDoms(kind, key);
                  const oppoValue0 = Number(oppoDom0.textContent.replace(/[^0-9\-\.]/gi, ''));
                  const oppoValue1 = Number(oppoDom1.textContent.replace(/[^0-9\-\.]/gi, ''));
                  const oppoValue2 = Number(oppoDom2.textContent.replace(/[^0-9\-\.]/gi, ''));
                  const oppoTotal = oppoValue0 + oppoValue1 + oppoValue2;
                  const [ oppoAmountDom0, oppoAmountDom1, oppoAmountDom2 ] = domMap.oppositeDoms(kind, amountKey);
                  const totalAmount = Number(domMap.totalDom.textContent.replace(/[^0-9\-]/gi, ''));
                  let oppositeMax;
                  let oppoFinal0, oppoFinal1, oppoFinal2;
                  let thisAmountFinal, oppoAmountFinal0, oppoAmountFinal1, oppoAmountFinal2;
                  let map;

                  oppositeMax = max - thisValue;
                  if (oppoTotal === 0) {
                    oppoFinal0 = Math.round(oppositeMax * (1 / 3));
                    oppoFinal1 = Math.round(oppositeMax * (1 / 3));
                  } else {
                    oppoFinal0 = Math.round(oppositeMax * (oppoValue0 / oppoTotal));
                    oppoFinal1 = Math.round(oppositeMax * (oppoValue1 / oppoTotal));
                  }
                  oppoFinal2 = oppositeMax - oppoFinal0 - oppoFinal1;

                  thisDom.firstChild.textContent = String(thisValue) + unit;
                  thisDom.setAttribute("value", String(thisValue) + unit);
                  oppoDom0.firstChild.textContent = String(oppoFinal0) + unit;
                  oppoDom0.setAttribute("value", String(oppoFinal0) + unit);
                  oppoDom1.firstChild.textContent = String(oppoFinal1) + unit;
                  oppoDom1.setAttribute("value", String(oppoFinal1) + unit);
                  oppoDom2.firstChild.textContent = String(oppoFinal2) + unit;
                  oppoDom2.setAttribute("value", String(oppoFinal2) + unit);

                  thisAmountFinal = autoComma(Math.floor((totalAmount * (thisValue / 100)) / 10) * 10) + '원';
                  oppoAmountFinal0 = autoComma(Math.floor((totalAmount * (oppoFinal0 / 100)) / 10) * 10) + '원';
                  oppoAmountFinal1 = autoComma(Math.floor((totalAmount * (oppoFinal1 / 100)) / 10) * 10) + '원';
                  oppoAmountFinal2 = autoComma(Math.floor((totalAmount * (oppoFinal2 / 100)) / 10) * 10) + '원';

                  thisAmountDom.firstChild.textContent = thisAmountFinal;
                  thisAmountDom.setAttribute("value", thisAmountFinal);
                  oppoAmountDom0.firstChild.textContent = oppoAmountFinal0;
                  oppoAmountDom0.setAttribute("value", oppoAmountFinal0);
                  oppoAmountDom1.firstChild.textContent = oppoAmountFinal1;
                  oppoAmountDom1.setAttribute("value", oppoAmountFinal1);
                  oppoAmountDom2.firstChild.textContent = oppoAmountFinal2;
                  oppoAmountDom2.setAttribute("value", oppoAmountFinal2);

                  const { core } = await ajaxJson({
                    mode: "changeAmount",
                    proid: project.proid,
                    map: {
                      first: Number(domMap[0].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                      start: Number(domMap[1].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                      middle: Number(domMap[2].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                      remain: Number(domMap[3].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                    }
                  }, "/constructInteraction", { equal: true });

                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.first = core.first;
                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.start = core.start;
                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.middle = core.middle;
                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.remain = core.remain;

                } catch (e) {
                  console.log(e);
                }
              }).call(this, e);
            }
          }
        }

        moneyEventFunction = (kind) => {
          return function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.querySelector("input") === null) {
              greenInputEvent(async (value) => {
                try {
                  const unit = '원';
                  const key = "amount";
                  const ratioKey = "ratio";
                  const thisDom = domMap.thisDom(kind, key);
                  const thisValue = Number(value.replace(/[^0-9\-\.]/gi, ''));
                  const thisRatioDom = domMap.thisDom(kind, ratioKey);
                  const [ oppoDom0, oppoDom1, oppoDom2 ] = domMap.oppositeDoms(kind, key);
                  const oppoValue0 = Number(oppoDom0.textContent.replace(/[^0-9\-\.]/gi, ''));
                  const oppoValue1 = Number(oppoDom1.textContent.replace(/[^0-9\-\.]/gi, ''));
                  const oppoValue2 = Number(oppoDom2.textContent.replace(/[^0-9\-\.]/gi, ''));
                  const oppoTotal = oppoValue0 + oppoValue1 + oppoValue2;
                  const [ oppoRatioDom0, oppoRatioDom1, oppoRatioDom2 ] = domMap.oppositeDoms(kind, ratioKey);
                  const totalDom = domMap.totalDom;
                  let thisFinal, oppoFinal0, oppoFinal1, oppoFinal2;
                  let thisRatioFinal, oppoRatioFinal0, oppoRatioFinal1, oppoRatioFinal2;
                  let totalValue;

                  totalValue = thisValue + oppoValue0 + oppoValue1 + oppoValue2;

                  totalDom.textContent = autoComma(totalValue) + unit;
                  totalDom.setAttribute("value", autoComma(totalValue) + unit);

                  thisDom.firstChild.textContent = autoComma(thisValue) + unit;
                  thisDom.setAttribute("value", autoComma(thisValue) + unit);

                  thisRatioFinal = Math.round(100 * (thisValue / totalValue));
                  oppoRatioFinal0 = Math.round(100 * (oppoValue0 / totalValue));
                  oppoRatioFinal1 = Math.round(100 * (oppoValue1 / totalValue));
                  oppoRatioFinal2 = 100 - thisRatioFinal - oppoRatioFinal0 - oppoRatioFinal1;

                  thisRatioDom.firstChild.textContent = String(thisRatioFinal) + '%';
                  thisRatioDom.setAttribute("value", String(thisRatioFinal) + '%');
                  oppoRatioDom0.firstChild.textContent = String(oppoRatioFinal0) + '%';
                  oppoRatioDom0.setAttribute("value", String(oppoRatioFinal0) + '%');
                  oppoRatioDom1.firstChild.textContent = String(oppoRatioFinal1) + '%';
                  oppoRatioDom1.setAttribute("value", String(oppoRatioFinal1) + '%');
                  oppoRatioDom2.firstChild.textContent = String(oppoRatioFinal2) + '%';
                  oppoRatioDom2.setAttribute("value", String(oppoRatioFinal2) + '%');

                  const { core } = await ajaxJson({
                    mode: "changeAmount",
                    proid: project.proid,
                    map: {
                      first: Number(domMap[0].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                      start: Number(domMap[1].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                      middle: Number(domMap[2].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                      remain: Number(domMap[3].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                    }
                  }, "/constructInteraction", { equal: true });

                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.first = core.first;
                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.start = core.start;
                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.middle = core.middle;
                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.remain = core.remain;

                } catch (e) {
                  console.log(e);
                }
              }).call(this, e);
            }
          }
        }

        dateEventFunction = (kind) => {
          return function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.querySelector("input") === null) {
              greenInputEvent(async (value) => {
                try {
                  if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(value.trim()) || value.trim() === '-') {
                    domMap[kind].contents.date.firstChild.textContent = value;
                    domMap[kind].contents.date.setAttribute("value", value);
                    instance.projects.search("proid", project.proid).history.payments[kind].date = GeneralJs.stringToDate(value);
                    await ajaxJson({
                      mode: "historyUpdate",
                      proid: project.proid,
                      column: "date",
                      kind, value
                    }, "/constructInteraction");
                  } else {
                    window.alert("표준 형식으로 작성해주셔야 업데이트가 가능합니다!\n표준 형식 => 0000-00-00 또는 '-'");
                  }
                } catch (e) {
                  console.log(e);
                }
              }).call(this, e);
            }
          }
        }

        etcEventFunction = (kind) => {
          return function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.querySelector("input") === null) {
              greenInputEvent(async (value) => {
                try {
                  domMap[kind].contents.etc.firstChild.textContent = value;
                  domMap[kind].contents.etc.setAttribute("value", value);
                  instance.projects.search("proid", project.proid).history.payments[kind].etc = value;
                  await ajaxJson({
                    mode: "historyUpdate",
                    proid: project.proid,
                    column: "etc",
                    kind, value
                  }, "/constructInteraction");
                } catch (e) {
                  console.log(e);
                }
              }).call(this, e);
            }
          }
        }

        for (let { title, kind, contents } of contractContentsMap) {
          [ ratio, money, date, etc ] = contents;
          tempDom = createNode({
            mother: contentsArea,
            style: {
              display: "block",
              position: "relative",
              marginBottom: String(rowMargin) + ea,
            }
          });
          tempTitleDom = createNode({
            mother: tempDom,
            text: title,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              width: String(titleWidth) + ea,
              fontSize: String(textSize) + ea,
              fontWeight: String(titleWeight),
              color: colorChip.black,
            }
          });
          tempContentsDoms = createNode({
            mother: tempDom,
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
                }
              }
            ]
          });
          tempRatioDom = createNode({
            mother: tempContentsDoms.firstChild,
            attribute: { value: ratio },
            text: ratio,
            event: {
              selectstart: (e) => { e.preventDefault(); e.stopPropagation(); },
              click: ratioEventFunction(kind),
            },
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.black,
              marginRight: String(betweenMargin1) + ea,
            }
          });
          createNode({
            mother: tempContentsDoms.firstChild,
            text: " | ",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.green,
              marginRight: String(betweenMargin1) + ea,
            }
          });
          tempMoneyDom = createNode({
            mother: tempContentsDoms.firstChild,
            attribute: { value: money },
            text: money,
            event: {
              selectstart: (e) => { e.preventDefault(); e.stopPropagation(); },
              click: moneyEventFunction(kind),
            },
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.black,
              marginRight: String(betweenMargin1) + ea,
            }
          });
          createNode({
            mother: tempContentsDoms.firstChild,
            text: " | ",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.green,
              marginRight: String(betweenMargin1) + ea,
            }
          });
          createNode({
            mother: tempContentsDoms.firstChild,
            text: "예상일 : ",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.deactive,
              marginRight: String(betweenMargin0) + ea,
            }
          });
          tempDateDom = createNode({
            mother: tempContentsDoms.firstChild,
            attribute: { value: date },
            text: date,
            event: {
              selectstart: (e) => { e.preventDefault(); e.stopPropagation(); },
              click: dateEventFunction(kind),
            },
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.black,
              marginRight: String(betweenMargin1) + ea,
            }
          });
          createNode({
            mother: tempContentsDoms.firstChild,
            text: " | ",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.green,
              marginRight: String(betweenMargin1) + ea,
            }
          });
          createNode({
            mother: tempContentsDoms.firstChild,
            text: "비고 : ",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.deactive,
              marginRight: String(betweenMargin0) + ea,
            }
          });
          tempEtcDom = createNode({
            mother: tempContentsDoms.firstChild,
            attribute: { value: etc },
            text: etc,
            event: {
              selectstart: (e) => { e.preventDefault(); e.stopPropagation(); },
              click: etcEventFunction(kind),
            },
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.black,
            }
          });

          tempObj = {
            mother: tempDom,
            title: tempTitleDom,
            kind,
            total: totalValueDom,
            contents: {
              ratio: tempRatioDom,
              amount: tempMoneyDom,
              date: tempDateDom,
              etc: tempEtcDom
            }
          }

          domMap[kind] = tempObj;
          domMap.push(tempObj);
        }

      } else {
        window.alert("공사 기간, 파트너 시공사를 먼저 모두 설정해주세요!");
        cancelBox.parentNode.removeChild(cancelBox);
        resetWidthEvent();
      }

    });

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
      const { ea, top, createNode, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "status";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let maxColumnNumber;
      let tong, tongTong;
      let factorWidth;
      let paddingLeft;
      let unitBlockWidth;
      let factor, factorTong, factorWidthTong;
      let tempMax;
      let maxTong;
      let maxWidth;
      let tongTongArr;
      let children;

      position = map[column].position;
      values = map[column].values;
      startLeft = 0;
      factorWidth = 500;
      margin = 4;
      paddingLeft = 14;
      maxColumnNumber = statusValuesMatrix.map((arr) => { return arr.length }).reduce((acc, curr) => { return Math.max(acc, curr) });
      width = (factorWidth * maxColumnNumber) + (margin * (maxColumnNumber - 1));

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

      tong = createNode({
        mother: this,
        mode: "aside",
        style: {
          display: "block",
          position: "absolute",
          top: String(top) + ea,
          left: String(startLeft) + ea,
          width: String(width) + ea,
          height: "auto",
          transition: "all 0s ease",
          zIndex, animation
        }
      });

      maxTong = [];
      tongTongArr = [];
      for (let arr of statusValuesMatrix) {

        unitBlockWidth = (width - (margin * (arr.length - 1))) / arr.length;
        unitBlockWidth = unitBlockWidth - (paddingLeft * 2);

        tongTong = createNode({
          mother: tong,
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            marginBottom: String(margin) + ea,
            height: String(height) + ea,
            width: String(100) + '%',
          }
        });
        tongTongArr.push(tongTong);

        factorTong = [];
        for (let i = 0; i < arr.length; i++) {
          factor = createNode({
            mother: tongTong,
            attribute: { value: arr[i], position, proid: project.proid },
            events: [ { type: "click", event: updateEvent } ],
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(unitBlockWidth) + ea,
              height: String(100) + '%',
              paddingLeft: String(paddingLeft) + ea,
              paddingRight: String(paddingLeft) + ea,
              marginRight: String(i !== arr.length - 1 ? margin : 0) + ea,
              background: (arr[i].trim() !== '-' && arr[i].trim() !== '' ? colorChip.gradientGreen : colorChip.deactive),
              justifyContent: "center",
              transition: "all 0s ease",
              boxShadow, borderRadius,
            },
            children: [
              {
                text: arr[i],
                style: {
                  position: "relative",
                  top: String(textTop) + ea,
                  fontSize: String(size) + ea,
                  fontWeight: String(500),
                  color: colorChip.whiteBlack,
                }
              }
            ]
          });
          factorTong.push(factor);
        }

        for (let dom of factorTong) {
          dom.style.width = "auto";
        }
        factorWidthTong = factorTong.map((dom) => { return dom.getBoundingClientRect().width });
        tempMax = Math.max(...factorWidthTong);
        for (let dom of factorTong) {
          dom.style.width = String(tempMax) + ea;
        }
        maxTong.push((tempMax * arr.length) + (margin * (arr.length - 1)));

      }

      maxWidth = Math.max(...maxTong);
      tong.style.width = String(maxWidth) + ea;

      for (let tongTong of tongTongArr) {
        children = [ ...tongTong.children ];
        unitBlockWidth = (maxWidth - (margin * (children.length - 1))) / children.length;
        unitBlockWidth = unitBlockWidth - (paddingLeft * 2);
        for (let dom of children) {
          dom.style.width = String(unitBlockWidth) + ea;
        }
      }

    });

    tempValue = (payments.first !== null ? payments.first.guide : emptyDate);
    if (tempValue.valueOf() < emptyDateValue) {
      tempValue = project.history.payments.first.date;
    }
    stringArr.push(textMaker(map["firstGuide"].title, dateToString(tempValue), dateToColor(tempValue, true), "firstGuide"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "firstGuide";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      if (e.type === "click") {
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
      } else {

        values = map[column].values;
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
            let dateValue, tempArr;
            if (value === "예정") {
              dateValue = new Date(3800, 0, 1);
            } else if (value === "해당 없음") {
              dateValue = new Date(1800, 0, 1);
            } else {
              tempArr = value.split('-');
              dateValue = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            }

            await ajaxJson({
              method: "project",
              id: project.proid,
              column: "construct.payments.first.date",
              value: dateValue,
              email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            }, "/updateHistory");

            valueDom.textContent = value;
            for (let dom of removeTargets) {
              mother.removeChild(dom);
            }
            thisCase[column].style.color = colorChip[dateToColor(dateValue, true)];
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

      }

      resetWidthEvent();
    });

    stringArr.push(textMaker(map["firstAmount"].title, autoComma(payments.first !== null ? payments.first.calculation.amount.consumer : 0) + '원', "black", "firstAmount"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["firstDate"].title, dateToString(payments.first !== null ? payments.first.date : emptyDate), dateToColor(payments.first !== null ? payments.first.date : emptyDate, true), "firstDate"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    tempValue = (payments.start !== null ? payments.start.guide : emptyDate);
    if (tempValue.valueOf() < emptyDateValue) {
      tempValue = project.history.payments.start.date;
    }
    stringArr.push(textMaker(map["startGuide"].title, dateToString(tempValue), dateToColor(tempValue, true), "startGuide"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "startGuide";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      if (e.type === "click") {
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
      } else {
        values = map[column].values;
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
            let dateValue, tempArr;
            if (value === "예정") {
              dateValue = new Date(3800, 0, 1);
            } else if (value === "해당 없음") {
              dateValue = new Date(1800, 0, 1);
            } else {
              tempArr = value.split('-');
              dateValue = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            }

            await ajaxJson({
              method: "project",
              id: project.proid,
              column: "construct.payments.start.date",
              value: dateValue,
              email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            }, "/updateHistory");

            valueDom.textContent = value;
            for (let dom of removeTargets) {
              mother.removeChild(dom);
            }
            thisCase[column].style.color = colorChip[dateToColor(dateValue, true)];
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

      }

      resetWidthEvent();
    });

    stringArr.push(textMaker(map["startAmount"].title, autoComma(payments.start !== null ? payments.start.calculation.amount.consumer : 0) + '원', "black", "startAmount"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["startDate"].title, dateToString(payments.start !== null ? payments.start.date : emptyDate), dateToColor(payments.start !== null ? payments.start.date : emptyDate, true), "startDate"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    tempValue = (payments.middle !== null ? payments.middle.guide : emptyDate);
    if (tempValue.valueOf() < emptyDateValue) {
      tempValue = project.history.payments.middle.date;
    }
    stringArr.push(textMaker(map["middleGuide"].title, dateToString(tempValue), dateToColor(tempValue, true), "middleGuide"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "middleGuide";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      if (e.type === "click") {
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
      } else {
        values = map[column].values;
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
            let dateValue, tempArr;
            if (value === "예정") {
              dateValue = new Date(3800, 0, 1);
            } else if (value === "해당 없음") {
              dateValue = new Date(1800, 0, 1);
            } else {
              tempArr = value.split('-');
              dateValue = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            }

            await ajaxJson({
              method: "project",
              id: project.proid,
              column: "construct.payments.middle.date",
              value: dateValue,
              email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            }, "/updateHistory");

            valueDom.textContent = value;
            for (let dom of removeTargets) {
              mother.removeChild(dom);
            }
            thisCase[column].style.color = colorChip[dateToColor(dateValue, true)];
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

      }

      resetWidthEvent();
    });

    stringArr.push(textMaker(map["middleAmount"].title, autoComma(payments.middle !== null ? payments.middle.calculation.amount.consumer : 0) + '원', "black", "middleAmount"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["middleDate"].title, dateToString(payments.middle !== null ? payments.middle.date : emptyDate), dateToColor(payments.middle !== null ? payments.middle.date : emptyDate, true), "middleDate"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    tempValue = (payments.remain !== null ? payments.remain.guide : emptyDate);
    if (tempValue.valueOf() < emptyDateValue) {
      tempValue = project.history.payments.remain.date;
    }
    stringArr.push(textMaker(map["remainGuide"].title, dateToString(tempValue), dateToColor(tempValue, true), "remainGuide"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "remainGuide";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      if (e.type === "click") {
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
      } else {
        values = map[column].values;
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
            let dateValue, tempArr;
            if (value === "예정") {
              dateValue = new Date(3800, 0, 1);
            } else if (value === "해당 없음") {
              dateValue = new Date(1800, 0, 1);
            } else {
              tempArr = value.split('-');
              dateValue = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            }

            await ajaxJson({
              method: "project",
              id: project.proid,
              column: "construct.payments.remain.date",
              value: dateValue,
              email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            }, "/updateHistory");

            valueDom.textContent = value;
            for (let dom of removeTargets) {
              mother.removeChild(dom);
            }
            thisCase[column].style.color = colorChip[dateToColor(dateValue, true)];
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

      }

      resetWidthEvent();
    });

    stringArr.push(textMaker(map["remainAmount"].title, autoComma(payments.remain !== null ? payments.remain.calculation.amount.consumer : 0) + '원', "black", "remainAmount"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      if (window.confirm("시공 금액을 변경하시겠습니까?")) {
        const valueInput = async function () {
          let answer, answerRaw, boo, message, zeroBoo;
          do {
            do {
              answer = await GeneralJs.prompt("새로운 시공 잔금을 소비자가 기준으로 숫자로만, 또는 만원 단위로 써서 입력해주세요!\n예) 24000000원 또는 2400만원 등등");
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
          return answer;
        }
        let loading;

        valueInput().then((answer) => {
          loading = instance.mother.grayLoading();

          mother.querySelector(".value").textContent = autoComma(answer) + '원';
          instance.projects.search("proid", proid).process.design.construct.contract.payments.remain.calculation.amount.supply = Math.floor(answer) - Math.floor(answer / 11);
          instance.projects.search("proid", proid).process.design.construct.contract.payments.remain.calculation.amount.vat = Math.floor(answer / 11);
          instance.projects.search("proid", proid).process.design.construct.contract.payments.remain.calculation.amount.consumer = Math.floor(answer);

          return ajaxJson({ mode: "amountSync", proid, amount: answer }, "/constructInteraction");
        }).then(() => {
          loading.remove();
          window.alert("업데이트가 완료되었습니다!");
        }).catch((err) => {
          console.log(err);
        });

      }
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["remainDate"].title, dateToString(payments.remain !== null ? payments.remain.date : emptyDate), dateToColor(payments.remain !== null ? payments.remain.date : emptyDate, true), "remainDate"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

  }


  return { map, stringArr, updateArr, grayBoo, displayBoo };
}

BuilderJs.prototype.constructUpdate = async function (whereQuery, updateQuery, chainQuery = null, rawValue = '') {
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

BuilderJs.prototype.constructDeactivate = function (proid, offMode = true) {
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

BuilderJs.prototype.constructBase = function (search = null) {
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

BuilderJs.prototype.constructBlockInjection = function () {
  const instance = this;
  const { ea, projects } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren, appendQuery, returnGet, removeQuery, setQueue } = GeneralJs;
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
  let resultArr;

  leftMargin = 10;
  firstPaddingTop = 44;
  tongPaddingBottom = 1000;

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

  resultArr = [];
  firstBoo = true;
  for (let i = 0; i < projects.length; i++) {
    if (firstBoo) {
      this.constructWhiteBlock(scrollTong, projects[i], (i === 0), i, true);
      firstBoo = false;
    }
    resultArr.push(this.constructWhiteBlock(scrollTong, projects[i], false, i, false));
  }

  resultArr = resultArr.filter((obj) => { return obj.result; });
  if (resultArr.length === 1) {
    if (returnGet().proid !== resultArr[0].proid) {
      appendQuery({
        proid: resultArr[0].proid
      });
    }
  } else if (resultArr.length === projects.length) {
    setQueue(() => {
      removeQuery("proid");
    });
  }

  instance.resetWidthEvent();
  setQueue(() => {
    instance.resetWidthEvent();
  }, 200);
}

BuilderJs.prototype.constructWhiteBlock = function (mother, project, first, index, titleMode = false) {
  if (mother === undefined || project === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { ea } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, blankHref } = GeneralJs;
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
  let blockArr;
  let blockMap;

  leftMargin = 10;
  motherMargin = 30;

  height = 43;
  margin = 1;

  width0 = 115;
  width1 = 3;
  titleBlockTop = 105;

  top = (titleMode ? (isMac() ? 11 : 12.5) : (isMac() ? 11 : 12.5));
  left = 16;
  size = 14;
  textMargin = 6;
  betweenText = 50;

  whiteWidth = 16;
  factorHeight = 20;

  menuMargin = 24;
  menuHeight = 32;
  menuTextTop = isMac() ? 6 : 7;

  blockMap = window.localStorage.getItem(instance.localStorageConst + instance.blockMapConst + instance.type);
  if (blockMap === null) {
    blockMap = {};
  } else {
    blockMap = JSON.parse(blockMap);
  }

  if (blockMap[project.proid] === undefined) {
    blockArr = (new Array(stringArr.length)).fill("block");
  } else {
    blockArr = blockMap[project.proid];
    blockArr.pop();
  }

  blockArr.push(first ? "block" : instance.contentsSearchIndex.includes(index) ? "none" : (displayBoo ? "block" : "none"));

  whiteBlock = createNode({
    mother,
    id: titleMode ? "title" : project.proid,
    attribute: [
      { index: String(index) },
      { sortstandard: "" },
      { sort: "1" },
      { titlemode: titleMode ? 1 : 0 },
      { blockarr: JSON.stringify(blockArr) }
    ],
    style: {
      display: first ? "block" : blockArr.every((str) => { return str.trim() === "block" }) ? "block" : "none",
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
              blankHref(window.location.protocol + "//" + window.location.host + "/project?proid=" + project.proid + "&rmode=true");
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
        text: !titleMode ? `|<b style="display:none">${project.proid + project.cliid + project.desid}</b>` : "",
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
        { sort: String(1) }
      ],
      text: stringArr[i],
      class: [ "white_child_" + String(i) ],
      events: [
        {
          type: [ "click", "contextmenu" ],
          event: function (e) {
            e.stopPropagation();
            e.preventDefault();
            const self = this;
            const { ea, ignoreNumbers, contentsBlocks, scrollTong } = instance;
            const { createNode, createNodes, colorChip, withOut, xyConverting, dateToString, stringToDate, isMac } = GeneralJs;
            const titleMode = Number(this.getAttribute("titlemode")) === 1;
            const thisIndex = Number(this.getAttribute("arrindex"));
            const thisSort = Number(this.getAttribute("sort"));
            if (titleMode) {

              const targets = contentsBlocks.map((dom, index) => { return { dom, index: index - 1 }; }).slice(1);
              const children = xyConverting(targets.map((obj) => { return [ ...obj.dom.children ].slice(ignoreNumbers[0], -1 * ignoreNumbers[1]); }));
              const sortTargets = children[thisIndex];
              const sortTargetsText = sortTargets.map((dom) => { return dom.querySelector(".value").textContent; });
              let indexArr, tempIndex, numberSortBoo;
              let target, column;
              let width, widthFactor;
              let innerMargin;
              let margin;
              let tong;
              let factor;
              let paddingLeft;
              let widthArr;
              let factorArr;
              let newWidth;
              let originalWidth;
              let height;
              let visual;
              let tongMargin;
              let cancel;
              let callback;
              let cancelLive;
              let onoff;
              let mode;
              let fontSize;

              if (e.type === "contextmenu") {

                // sort

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

                // filter
                margin = 10;
                innerMargin = 4;
                widthFactor = 600;
                paddingLeft = 12;
                height = 36;
                visual = isMac() ? -2 : 0.5;
                tongMargin = 13;
                cancelLive = true;
                fontSize = 14;

                cancel = createNode({
                  mother: this,
                  style: {
                    position: "fixed",
                    top: String(0),
                    left: String(0),
                    width: String(100) + '%',
                    height: String(100) + '%',
                    background: "transparent",
                    zIndex: String(1),
                  }
                });

                if (sortTargetsText.some((str) => { return /[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/gi.test(str); })) {
                  if (sortTargetsText.some((str) => { return /\,/gi.test(str) })) {
                    // date history
                    target = [ "있음", "없음" ];
                    column = 1;
                    mode = "dateHistory";
                  } else {
                    // date
                    target = [ "미래", "과거", "미정" ];
                    column = 1;
                    mode = "date";
                  }
                } else if (sortTargetsText.every((str) => { return str.length < 20; })) {
                  if (sortTargetsText.some((str) => { return /원$/.test(str) && /^[0-9]/gi.test(str) })) {
                    // money
                    target = [ "있음", "없음" ];
                    column = 1;
                    mode = "money";
                  } else {
                    // menu
                    target = [ ...new Set(sortTargetsText) ];
                    column = Math.ceil(target.length / 5);
                    mode = "menu";
                  }
                } else {
                  // long
                  cancel.remove();
                  cancelLive = false;
                }

                if (cancelLive) {

                  width = (widthFactor * column) + (innerMargin * (column - 1));

                  tong = createNode({
                    mother: this,
                    event: {
                      click: (e) => { e.preventDefault(); e.stopPropagation(); }
                    },
                    style: {
                      display: "block",
                      position: "absolute",
                      top: String(this.getBoundingClientRect().height + margin) + ea,
                      left: String((this.firstChild.getBoundingClientRect().width / 2) - (width / 2)) + ea,
                      width: String(width + column) + ea,
                      height: "auto",
                      transition: "all 0s ease",
                      borderRadius: String(3) + ea,
                      animation: "fadeuplite 0.3s ease",
                      boxShadow: "0px 4px 13px -9px " + colorChip.shadow,
                      zIndex: String(1),
                    },
                    children: [
                      {
                        style: {
                          position: "absolute",
                          top: String(0),
                          left: String(0),
                          width: String(100) + '%',
                          height: String(100) + '%',
                          background: colorChip.gray1,
                          opacity: String(0.9),
                          borderRadius: String(3) + ea,
                        }
                      }
                    ]
                  });


                  if (!Array.isArray(GeneralJs.stacks[instance.type + String(thisIndex)])) {
                    if (window.localStorage.getItem(instance.localStorageConst + instance.type + String(thisIndex)) !== null) {
                      GeneralJs.stacks[instance.type + String(thisIndex)] = JSON.parse(window.localStorage.getItem(instance.localStorageConst + instance.type + String(thisIndex)));
                    } else {
                      GeneralJs.stacks[instance.type + String(thisIndex)] = [[]];
                      window.localStorage.setItem(instance.localStorageConst + instance.type + String(thisIndex), JSON.stringify([[]]));
                    }
                  }
                  widthArr = [];
                  factorArr = [];
                  for (let str of target) {
                    onoff = GeneralJs.stacks[instance.type + String(thisIndex)][0].includes(str);
                    factor = createNode({
                      mother: tong,
                      attribute: {
                        toggle: onoff ? "on" : "off",
                        value: str,
                      },
                      event: {
                        click: function (e) {
                          e.preventDefault();
                          e.stopPropagation();
                          const toggle = this.getAttribute("toggle");
                          if (toggle === "off") {
                            this.style.background = colorChip.green;
                            this.setAttribute("toggle", "on");
                          } else {
                            this.style.background = colorChip.deactive;
                            this.setAttribute("toggle", "off");
                          }
                        }
                      },
                      style: {
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        width: String(widthFactor) + ea,
                        marginRight: String(innerMargin) + ea,
                        marginBottom: String(innerMargin) + ea,
                        height: String(height) + ea,
                        background: onoff ? colorChip.green : colorChip.deactive,
                        borderRadius: String(3) + ea,
                        paddingLeft: String(paddingLeft) + ea,
                        paddingRight: String(paddingLeft) + ea,
                      },
                      children: [
                        {
                          class: [ "hoverDefault_lite" ],
                          text: str,
                          style: {
                            fontSize: String(fontSize) + ea,
                            fontWeight: String(500),
                            color: colorChip.whiteBlack,
                            textAlign: "center",
                            width: String(100) + '%',
                            position: "relative",
                            top: String(visual) + ea,
                          }
                        }
                      ]
                    });

                    factor.style.width = "auto";
                    widthArr.push(factor.getBoundingClientRect().width);
                    factorArr.push(factor);
                  }

                  widthArr.sort((a, b) => { return b - a; });
                  originalWidth = Math.ceil(widthArr[0]);
                  newWidth = originalWidth - (paddingLeft * 2);
                  factorArr.forEach((dom) => {
                    dom.style.width = String(newWidth) + ea;
                  });

                  width = (originalWidth * column) + (innerMargin * (column - 1));

                  tong.style.paddingLeft = String(tongMargin) + ea;
                  tong.style.paddingTop = String(tongMargin) + ea;
                  tong.style.paddingRight = String(tongMargin - innerMargin) + ea;
                  tong.style.paddingBottom = String(tongMargin - innerMargin) + ea;

                  tong.style.left = String((this.firstChild.getBoundingClientRect().width / 2) - ((width + tongMargin + tongMargin) / 2)) + ea;
                  tong.style.width = String(width + innerMargin) + ea;

                  callback = async () => {
                    try {
                      const targetValues = factorArr.filter((dom) => { return dom.getAttribute("toggle") === "on" }).map((dom) => { return dom.getAttribute("value"); });
                      let blockArr, blockMap;
                      blockMap = {};

                      if (mode === "dateHistory") {
                        if (targetValues.length > 0) {
                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));

                            if (targetValues.includes("있음")) {
                              if (!/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/gi.test(dom.querySelector(".value").textContent)) {
                                blockArr[thisIndex] = "none";
                              } else {
                                blockArr[thisIndex] = "block";
                              }
                            }

                            if (targetValues.includes("없음")) {
                              if (!/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/gi.test(dom.querySelector(".value").textContent)) {
                                blockArr[thisIndex] = "block";
                              } else {
                                if (!targetValues.includes("있음")) {
                                  blockArr[thisIndex] = "none";
                                }
                              }
                            }

                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }
                        } else {
                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));
                            blockArr[thisIndex] = "block";
                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }
                        }
                      } else if (mode === "date") {
                        if (targetValues.length > 0) {

                          const past = new Date(2000, 0, 1);
                          const now = new Date();
                          const future = new Date(3000, 0, 1);

                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));

                            if (targetValues.includes("미래")) {
                              if (now.valueOf() <= stringToDate(dom.querySelector(".value").textContent.trim()).valueOf() && stringToDate(dom.querySelector(".value").textContent.trim()).valueOf() < future.valueOf()) {
                                blockArr[thisIndex] = "block";
                              } else {
                                blockArr[thisIndex] = "none";
                              }
                            }
                            if (targetValues.includes("과거")) {
                              if (now.valueOf() > stringToDate(dom.querySelector(".value").textContent.trim()).valueOf() && stringToDate(dom.querySelector(".value").textContent.trim()).valueOf() > past.valueOf()) {
                                blockArr[thisIndex] = "block";
                              } else {
                                if (!targetValues.includes("미래")) {
                                  blockArr[thisIndex] = "none";
                                }
                              }
                            }
                            if (targetValues.includes("미정")) {
                              if (future.valueOf() < stringToDate(dom.querySelector(".value").textContent.trim()).valueOf() || stringToDate(dom.querySelector(".value").textContent.trim()).valueOf() < past.valueOf()) {
                                blockArr[thisIndex] = "block";
                              } else {
                                if (!targetValues.includes("미래") && !targetValues.includes("과거")) {
                                  blockArr[thisIndex] = "none";
                                }
                              }
                            }

                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }

                        } else {
                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));
                            blockArr[thisIndex] = "block";
                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }
                        }
                      } else if (mode === "money") {
                        if (targetValues.length > 0) {
                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));

                            if (targetValues.includes("있음")) {
                              if (dom.querySelector(".value").textContent.trim() === "0원") {
                                blockArr[thisIndex] = "none";
                              } else {
                                blockArr[thisIndex] = "block";
                              }
                            }

                            if (targetValues.includes("없음")) {
                              if (dom.querySelector(".value").textContent.trim() === "0원") {
                                blockArr[thisIndex] = "block";
                              } else {
                                if (!targetValues.includes("있음")) {
                                  blockArr[thisIndex] = "none";
                                }
                              }
                            }

                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }
                        } else {
                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));
                            blockArr[thisIndex] = "block";
                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }
                        }
                      } else if (mode === "menu") {
                        if (targetValues.length > 0) {
                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));
                            if (targetValues.includes(dom.querySelector(".value").textContent.trim())) {
                              blockArr[thisIndex] = "block";
                            } else {
                              blockArr[thisIndex] = "none";
                            }
                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }
                        } else {
                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));
                            blockArr[thisIndex] = "block";
                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }
                        }
                      }

                      window.localStorage.setItem(instance.localStorageConst + instance.blockMapConst + instance.type, JSON.stringify(blockMap));

                      GeneralJs.stacks[instance.type + String(thisIndex)].unshift(targetValues);
                      window.localStorage.setItem(instance.localStorageConst + instance.type + String(thisIndex), JSON.stringify(GeneralJs.stacks[instance.type + String(thisIndex)]));
                    } catch (e) {
                      console.log(e);
                    }
                  }

                  cancel.addEventListener("click", async (e) => {
                    try {
                      e.preventDefault();
                      e.stopPropagation();

                      if (typeof callback === "function") {
                        await callback();
                      }

                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    } catch (e) {
                      console.log(e);
                    }
                  });
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
                          GeneralJs.setQueue(() => { instance.resetWidthEvent(); });
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

  return {
    proid: project.proid,
    result: (first ? true : instance.contentsSearchIndex.includes(index) ? false : (displayBoo ? true : false))
  };
}

BuilderJs.prototype.constructDashBoard = function () {
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

BuilderJs.prototype.constructSearchEvent = function () {
  const instance = this;
  const { ea } = this;
  const input = this.searchInput;
  let width, length;

  length = this.projects.length;
  width = 800;

  input.parentNode.style.width = String(width) + ea;
  input.parentNode.style.left = GeneralJs.withOut(50, width / 2, ea);
  this.searchEvent = function (e) {
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
  }
  input.addEventListener("keypress", this.searchEvent);
}

BuilderJs.prototype.constructExtractEvent = function () {
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

BuilderJs.prototype.constructReportEvent = function () {
  const instance = this;
  const { belowButtons: { square: { reportIcon } } } = this.mother;

  reportIcon.addEventListener("click", function (e) {
    if (document.getElementById("constructReport") === null) {
      instance.constructReportView();
    }
  });

}

BuilderJs.prototype.constructBlockMove = function () {
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

BuilderJs.prototype.constructReport = async function (from, to) {
  if (!(from instanceof Date) || !(to instanceof Date)) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { projects } = this;
  const { ajaxJson, equalJson } = GeneralJs;
  const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
  try {
    const fromYear = from.getFullYear();
    const fromMonth = from.getMonth();
    const toYear = to.getFullYear();
    const toMonth = to.getMonth();
    let targets, tong;
    let menuSet, menuDetailSet;
    let thisPosition;
    let tempDate;
    let targetMatrixArr, targetMatrixArrFlat;
    let standardDateTo, standardDateFrom;
    let dateMatrix;
    let minDate, maxDate;
    let mongoRange;
    let copiedDate;
    let final, finalFactor;

    menuSet = {
      before: [
        "대기",
        "의뢰서 작성중",
        "견적 확인중",
        "견적 안내",
        "확인 필요",
        "확인 요청",
      ],
      drop: [
        "드랍",
        "해당 없음",
      ],
      progress: [],
    };
    menuDetailSet = {
      client: [
        "고객 진행",
        "고객 완료",
      ],
      designer: [
        "디자이너 진행",
        "수수료 요청",
        "AS 진행중",
        "디자이너 완료"
      ],
      homeliaison: []
    };

    targets = projects.toNormal();

    tong = [];
    for (let project of targets) {
      if (project.process.contract.first.date.valueOf() > emptyDateValue) {
        thisPosition = "";
        if (menuSet.before.includes(project.process.design.construct.status)) {
          thisPosition = "before";
        } else if (menuSet.drop.includes(project.process.design.construct.status)) {
          thisPosition = "drop";
        } else {
          if (menuDetailSet.client.includes(project.process.design.construct.status)) {
            thisPosition = "progress.client";
          } else if (menuDetailSet.designer.includes(project.process.design.construct.status)) {
            thisPosition = "progress.designer";
          } else {
            thisPosition = "progress.homeliaison";
          }
        }

        tong.push({
          proid: project.proid,
          cliid: project.cliid,
          desid: project.desid,
          status: thisPosition,
          request: project.process.design.construct.request,
          estimate: project.process.design.construct.estimate,
          contract: project.process.contract.first.date,
          start: project.process.contract.form.date.from
        });
      }
    }

    standardDateFrom = new Date(fromYear, fromMonth, 1);
    standardDateTo = new Date(toYear, toMonth, 25);

    dateMatrix = GeneralJs.getDateMatrix();
    tempDate = new Date(dateMatrix.year, dateMatrix.month, 15);

    targetMatrixArr = [];
    do {
      if (tempDate.valueOf() < standardDateTo.valueOf() && tempDate.valueOf() > standardDateFrom.valueOf()) {
        targetMatrixArr.push(dateMatrix.nextMatrix().previousMatrix());
      }
      dateMatrix = dateMatrix.previousMatrix();
      tempDate = new Date(dateMatrix.year, dateMatrix.month, 15);
    } while (tempDate.valueOf() > standardDateFrom.valueOf());


    for (let obj of targetMatrixArr) {
      obj.startEnd = obj.matrix.map((arr) => {
        let obj2 = {};
        obj2.start = arr.find((obj) => { return obj !== null; });
        obj2.end = arr.reverse().find((obj) => { return obj !== null; });
        return obj2;
      })
    }

    targetMatrixArrFlat = targetMatrixArr.map((obj) => { return obj.startEnd }).flat().map((obj) => {
      let obj2 = {};
      obj2.from = obj.start.dateObject;
      obj.end.dateObject.setDate(obj.end.dateObject.getDate() + 1);
      obj2.to = obj.end.dateObject;
      return obj2;
    });
    targetMatrixArrFlat.sort((a, b) => { return b.to.valueOf() - a.to.valueOf() });

    for (let obj of targetMatrixArrFlat) {
      obj.children = [];
      for (let obj2 of tong) {
        if (obj.from.valueOf() <= obj2.start.valueOf() && obj2.start.valueOf() < obj.to.valueOf()) {
          obj.children.push(equalJson(JSON.stringify(obj2)));
        }
      }
    }

    for (let obj of targetMatrixArrFlat) {
      obj.report = {};
      obj.report.total = obj.children.map(o => o).map((o) => { return o.proid });
      obj.report.before = obj.children.filter((o) => {
        return /before/gi.test(o.status);
      }).map((o) => { return o.proid; });
      obj.report.progress = obj.children.filter((o) => {
        return /progress/gi.test(o.status);
      }).map((o) => { return o.proid; });
      obj.report.with = {};
      obj.report.with.homeliaison = obj.children.filter((o) => {
        return /progress\.homeliaison/gi.test(o.status);
      }).map((o) => { return o.proid; });
      obj.report.with.designer = obj.children.filter((o) => {
        return /progress\.designer/gi.test(o.status);
      }).map((o) => { return o.proid; });
      obj.report.with.client = obj.children.filter((o) => {
        return /progress\.client/gi.test(o.status);
      }).map((o) => { return o.proid; });
      obj.report.request = obj.children.filter((o) => {
        return o.request.valueOf() > emptyDateValue;
      }).map((o) => { return o.proid; });
      obj.report.estimate = obj.children.filter((o) => {
        return o.estimate.length > 0;
      }).map((o) => { return o.proid; });

      obj.numbers = {};
      obj.numbers.total = obj.report.total.length;
      obj.numbers.before = obj.report.before.length;
      obj.numbers.progress = obj.report.progress.length;
      obj.numbers.with = {};
      obj.numbers.with.homeliaison = obj.report.with.homeliaison.length;
      obj.numbers.with.designer = obj.report.with.designer.length;
      obj.numbers.with.client = obj.report.with.client.length;
      obj.numbers.request = obj.report.request.length;
      obj.numbers.estimate = obj.report.estimate.length;
    }

    minDate = targetMatrixArrFlat[targetMatrixArrFlat.length - 1].from;
    maxDate = targetMatrixArrFlat[0].from;

    copiedDate = new Date(JSON.stringify(minDate).slice(1, -1));

    mongoRange = 0;
    while (copiedDate.valueOf() < maxDate.valueOf()) {
      mongoRange = mongoRange + 1;
      copiedDate.setMonth(copiedDate.getMonth() + 1);
    }

    final = [];
    for (let i = 0; i < mongoRange; i++) {
      copiedDate = new Date(JSON.stringify(minDate).slice(1, -1));
      copiedDate.setMonth(copiedDate.getMonth() + i);
      final.unshift({
        year: copiedDate.getFullYear(),
        month: copiedDate.getMonth(),
        children: []
      });
    }

    for (let z of final) {
      for (let obj of targetMatrixArrFlat) {
        if (obj.from.getFullYear() === z.year && obj.from.getMonth() === z.month) {
          z.children.push(equalJson(JSON.stringify(obj)));
        }
      }
    }

    for (let obj of targetMatrixArrFlat) {
      obj.from.getFullYear()
      obj.from.getMonth()
    }

    return final;

  } catch (e) {
    console.log(e);
    return null;
  }
}

BuilderJs.prototype.constructReportView = function () {
  const instance = this;
  const { ea, projects, belowHeight, totalContents } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, dateToString } = GeneralJs;
  const today = new Date();
  const ago = new Date();
  const zeroAddition = num => (num < 10 ? `0${String(num)}` : String(num));
  let margin;
  let heightVisual;
  let whiteBox, cancelBack;
  let searchArea, dataArea;
  let searchAreaHeight;
  let searchAreaPaddingTop;
  let innerMargin;
  let inputWidth;
  let inputHeight;
  let inputSize;
  let searchInput;
  let subSumSize;
  let subSumRight;
  let subSumTop;
  let subSum;
  let reload;

  margin = 30;
  heightVisual = 10;

  innerMargin = 36;
  searchAreaHeight = 88;
  searchAreaPaddingTop = isMac() ? 42 : 47;
  inputWidth = 500;
  inputHeight = 30;
  inputSize = 29;

  subSumSize = 15;
  subSumRight = 1;
  subSumTop = 56;

  dataArea = {};
  subSum = {};

  ago.setMonth(ago.getMonth() - 6);
  this.constructReport(ago, today).then((data) => {

    // total
    cancelBack = createNode({
      mother: totalContents,
      event: {
        click: function (e) {
          totalContents.removeChild(totalContents.lastChild);
          totalContents.removeChild(totalContents.lastChild);
        }
      },
      style: {
        position: "fixed",
        background: colorChip.cancelBlack,
        animation: "justfadein 0.3s ease forwards",
        zIndex: String(2),
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: withOut(belowHeight, ea),
      }
    });
    whiteBox = createNode({
      mother: totalContents,
      id: "constructReport",
      style: {
        position: "fixed",
        background: colorChip.white,
        top: String(margin) + ea,
        left: String(margin) + ea,
        borderRadius: String(5) + "px",
        boxShadow: "0 2px 10px -6px " + colorChip.shadow,
        width: withOut(margin * 2, ea),
        height: withOut(belowHeight + (margin * 2) + heightVisual, ea),
        zIndex: String(2),
        animation: "fadeup 0.3s ease forwards",
      }
    });

    reload = (strValue) => {
      const arr = strValue.split(" ~ ").map((s) => { return s.trim(); });
      const fromArr = arr[0].split('-').map((s) => { return s.trim(); }).map((s) => { return Number(s); });
      const toArr = arr[1].split('-').map((s) => { return s.trim(); }).map((s) => { return Number(s); });
      const from = new Date(fromArr[0], fromArr[1] - 1, 1);
      const to = new Date(toArr[0], toArr[1] - 1, 1);

      instance.constructReport(from, to).then((data) => {
        instance.constructReportBoxRender(dataArea, data, subSum);
      }).catch((err) => {
        console.log(err);
      });
    }

    // search bar area
    searchArea = createNode({
      mother: whiteBox,
      style: {
        display: "block",
        position: "relative",
        marginLeft: String(innerMargin) + ea,
        width: withOut(innerMargin * 2, ea),
        height: String(searchAreaHeight - searchAreaPaddingTop) + ea,
        paddingTop: String(searchAreaPaddingTop) + ea,
      }
    });

    searchInput = createNode({
      mother: searchArea,
      event: {
        focus: function (e) {
          this.setAttribute("pastvalue", this.getAttribute("value"));
          this.style.color = colorChip.green;
        },
        keypress: function (e) {
          if (e.key === "Enter") {
            if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9] ~ [0-9][0-9][0-9][0-9]\-[0-9][0-9]$/.test(this.value)) {
              this.value = this.getAttribute("pastvalue");
            } else {
              reload(this.value);
            }
            this.blur();
            this.style.color = colorChip.black;
          }
        },
        blur: function (e) {
          if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9] ~ [0-9][0-9][0-9][0-9]\-[0-9][0-9]$/.test(this.value)) {
            this.value = this.getAttribute("pastvalue");
          } else {
            reload(this.value);
          }
          this.style.color = colorChip.black;
        }
      },
      mode: "input",
      attribute: {
        type: "text"
      },
      style: {
        display: "inline-block",
        position: "relative",
        width: String(inputWidth) + ea,
        height: String(inputHeight) + ea,
        fontSize: String(inputSize) + ea,
        fontWeight: String(200),
        border: String(0) + ea,
        outline: String(0) + ea,
        color: colorChip.black,
        transition: "all 0.5s ease",
      }
    });

    searchInput.value = dateToString(ago).slice(0, 7) + " ~ " + dateToString(today).slice(0, 7);

    subSum = createNode({
      mother: searchArea,
      text: "문의 문의 문의 100명",
      style: {
        position: "absolute",
        fontSize: String(subSumSize) + ea,
        fontWeight: String(500) + ea,
        right: String(subSumRight) + ea,
        top: String(subSumTop) + ea,
        color: colorChip.black,
      }
    });

    // data area
    dataArea = createNode({
      mother: whiteBox,
      style: {
        display: "block",
        position: "relative",
        marginLeft: String(innerMargin) + ea,
        width: withOut(innerMargin, ea),
        height: withOut(searchAreaHeight, ea),
        overflow: "scroll",
      }
    });

    instance.constructReportBoxRender(dataArea, data, subSum);

  }).catch((err) => {
    console.log(err);
  });
}

BuilderJs.prototype.constructReportBoxRender = function (dataArea, data, subSum) {
  const instance = this;
  const { ea, projects, belowHeight, totalContents } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, dateToString, cleanChildren } = GeneralJs;
  const zeroAddition = num => (num < 10 ? `0${String(num)}` : String(num));
  let margin, innerMargin;
  let boxNumber, boxHeight, boxWidth, boxMargin;
  let grayBoxPaddingLeft;
  let grayBoxPaddingTop;
  let yearMonthBoxHeight;
  let yearMonthBoxSize;
  let yearMonthBoxPadding;
  let titleLineBottom;
  let titleLineMarginBottom;
  let table, block;
  let blockHeight, blockSize;
  let columns;
  let blockTextTop;
  let values;
  let sumBox;
  let sumBoxBottom;
  let sumSize;
  let sumText, sumArr;
  let sumVisual;
  let proidMatrix;
  let valuesTarget;
  let ratioSuccess, ratioHomeliaison;
  let ratioSuccessWording, ratioHomeliaisonWording;
  let totalMatrix, totalArr;
  let tempNumber;
  let totalSumText;

  margin = 30;
  innerMargin = 36;

  boxMargin = 18;
  boxNumber = Math.floor((window.innerWidth - (boxMargin * 5)) / (boxMargin + 400));
  boxHeight = 400;
  boxWidth = ((window.innerWidth - (margin * 2)) - (boxMargin * (boxNumber - 1)) - (innerMargin * 2)) / boxNumber;
  grayBoxPaddingTop = 18;
  grayBoxPaddingLeft = 24;

  yearMonthBoxHeight = 28;
  yearMonthBoxSize = 20;
  yearMonthBoxPadding = 12;

  titleLineBottom = 14;
  titleLineMarginBottom = 12;

  blockHeight = 36;
  blockSize = 14;
  blockTextTop = -1;

  sumBoxBottom = 25;
  sumSize = 16;
  sumVisual = 1;

  columns = [
    "",
    "대기",
    "견적",
    "진행",
    "HL",
    "DE",
    "CL"
  ];

  ratioSuccessWording = "견적 성공률";
  ratioHomeliaisonWording = "HL 진행율";

  cleanChildren(dataArea);

  totalMatrix = [];
  for (let obj of data) {

    // total table
    table = createNode({
      mother: dataArea,
      style: {
        display: "inline-block",
        position: "relative",
        width: String(boxWidth - (grayBoxPaddingLeft * 2)) + ea,
        height: String(boxHeight - grayBoxPaddingTop) + ea,
        overflow: "scroll",
        marginRight: String(boxMargin) + ea,
        marginBottom: String(boxMargin) + ea,
        background: colorChip.gray0,
        borderRadius: String(5) + "px",
        paddingTop: String(grayBoxPaddingTop) + ea,
        paddingLeft: String(grayBoxPaddingLeft) + ea,
        paddingRight: String(grayBoxPaddingLeft) + ea,
        verticalAlign: "top",
      },
      children: [
        {
          style: {
            display: "block",
            width: String(100) + '%',
            height: String(yearMonthBoxHeight) + ea,
            position: "relative",
            marginBottom: String(titleLineMarginBottom) + ea,
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(0),
                left: String(0) + ea,
                width: withOut(0, ea),
                height: String(titleLineBottom) + ea,
                borderBottom: "1px solid " + colorChip.gray3,
              }
            },
            {
              text: String(obj.year) + "-" + zeroAddition(obj.month + 1),
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(yearMonthBoxSize) + ea,
                fontWeight: String(200),
                background: colorChip.gray0,
                paddingRight: String(yearMonthBoxPadding) + ea,
              }
            }
          ]
        },
        {
          style: {
            display: "block",
            width: String(100) + '%',
            position: "relative",
            border: "1px solid " + colorChip.gray4,
            boxSizing: "border-box",
            borderRadius: String(5) + "px",
            overflow: "hidden",
          }
        }
      ]
    }).children[1];

    // title set
    block = createNode({
      mother: table,
      style: {
        display: "flex",
        width: String(100) + '%',
        flexDirection: "row",
        height: String(blockHeight) + ea,
        background: colorChip.white,
        boxSizing: "border-box",
        borderBottom: "1px solid " + colorChip.gray2,
      }
    });
    for (let i = 0; i < columns.length; i++) {
      createNode({
        mother: block,
        style: {
          display: "inline-flex",
          flexShrink: String(1),
          borderRight: i === columns.length - 1 ? "" : "1px solid " + colorChip.gray2,
          boxSizing: "border-box",
          width: String(100) + '%',
          height: String(100) + '%',
          alignItems: "center",
          justifyContent: "center",
        },
        children: [
          {
            text: columns[i],
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(blockSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
              top: String(blockTextTop) + ea,
            }
          }
        ]
      });
    }

    // value set
    sumArr = [];
    for (let i = 0; i < obj.children.length; i++) {

      values = [
        [ i + 1, [] ],
        [ obj.children[i].numbers.before, obj.children[i].report.before ],
        [ obj.children[i].numbers.estimate, obj.children[i].report.estimate ],
        [ obj.children[i].numbers.progress, obj.children[i].report.progress ],
        [ obj.children[i].numbers.with.homeliaison, obj.children[i].report.with.homeliaison ],
        [ obj.children[i].numbers.with.designer, obj.children[i].report.with.designer ],
        [ obj.children[i].numbers.with.client, obj.children[i].report.with.client ],
      ];
      sumArr.push(values);

      block = createNode({
        mother: table,
        style: {
          display: "flex",
          width: String(100) + '%',
          flexDirection: "row",
          height: String(blockHeight) + ea,
          boxSizing: "border-box",
          borderBottom: "1px solid " + colorChip.gray2,
        }
      });
      for (let i = 0; i < values.length; i++) {
        createNode({
          mother: block,
          attribute: {
            proid: JSON.stringify(values[i][1])
          },
          event: {
            click: function (e) {
              const proidArr = JSON.parse(this.getAttribute("proid"));
              if (proidArr.length > 0) {
                GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/project?" + "specificids=" + proidArr.join(","));
              }
            }
          },
          style: {
            display: "inline-flex",
            flexShrink: String(1),
            borderRight: i === values.length - 1 ? "" : "1px solid " + colorChip.gray2,
            boxSizing: "border-box",
            width: String(100) + '%',
            height: String(100) + '%',
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          },
          children: [
            {
              attribute: {
                proid: JSON.stringify(values[i][1])
              },
              text: String(values[i][0]),
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(blockSize) + ea,
                fontWeight: String(i === 0 ? 600 : 300),
                color: colorChip.black,
                top: String(blockTextTop) + ea,
              }
            }
          ]
        })
      }

    }

    // sum set

    sumText = '';
    proidMatrix = [];
    totalArr = [];
    for (let i = 1; i < columns.length; i++) {
      proidMatrix.push(sumArr.map((matrix) => {
        return matrix[i][1];
      }).reduce((acc, curr) => {
        return acc.concat(curr);
      }, []));

      sumText += columns[i];
      sumText += " <b%";
      tempNumber = sumArr.map((matrix) => {
        return matrix[i][0];
      }).reduce((acc, curr) => {
        return acc + curr;
      }, 0);
      sumText += String(tempNumber);
      if (i === columns.length - 1) {
        sumText += "%b>명";
      } else {
        sumText += "%b>명&nbsp;&nbsp;&nbsp;";
      }
      totalArr.push(tempNumber);
    }
    totalMatrix.push(totalArr);

    sumBox = createNode({
      mother: table.parentNode,
      text: sumText,
      style: {
        position: "absolute",
        width: withOut((grayBoxPaddingLeft + sumVisual) * 2, ea),
        left: String(grayBoxPaddingLeft + sumVisual) + ea,
        bottom: String(sumBoxBottom) + ea,
        fontSize: String(sumSize) + ea,
        fontWeight: String(400),
        color: colorChip.black,
        textAlign: "right",
        lineHeight: String(1.6),
      },
      bold: {
        fontSize: String(sumSize) + ea,
        fontWeight: String(300),
        color: colorChip.green,
      }
    });

    valuesTarget = sumBox.querySelectorAll("b");
    for (let i = 0; i < valuesTarget.length; i++) {
      valuesTarget[i].setAttribute("proid", JSON.stringify(proidMatrix[i]));
      valuesTarget[i].addEventListener("click", function (e) {
        const proidArr = JSON.parse(this.getAttribute("proid"));
        if (proidArr.length > 0) {
          GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/project?" + "specificids=" + proidArr.join(","));
        }
      });
    }

    if (Number(valuesTarget[1].textContent.replace(/[^0-9]/gi, '')) === 0) {
      ratioSuccess = 0;
    } else {
      ratioSuccess = Math.round(100 * (Number(valuesTarget[3].textContent.replace(/[^0-9]/gi, '')) / Number(valuesTarget[1].textContent.replace(/[^0-9]/gi, ''))));
    }

    if (Number(valuesTarget[2].textContent.replace(/[^0-9]/gi, '')) === 0) {
      ratioHomeliaison = 0;
    } else {
      ratioHomeliaison = Math.round(100 * (Number(valuesTarget[3].textContent.replace(/[^0-9]/gi, '')) / Number(valuesTarget[2].textContent.replace(/[^0-9]/gi, ''))));
    }

    sumBox.insertAdjacentHTML(`beforeend`, `<br>${ratioSuccessWording} <b style="font-weight:300;color:${colorChip.green}">${String(ratioSuccess)}</b>%&nbsp;&nbsp;&nbsp;${ratioHomeliaisonWording} <b style="font-weight:300;color:${colorChip.green}">${String(ratioHomeliaison)}</b>%`);

  }

  columns.filter((str) => { return str !== '' }).fill(0, 0)

  totalMatrix = totalMatrix.reduce((acc, curr) => {
    for (let i = 0; i < acc.length; i++) {
      acc[i] += curr[i];
    }
    return acc;
  }, columns.filter((str) => { return str !== '' }).fill(0, 0));

  totalSumText = "";
  for (let i = 1; i < columns.length; i++) {
    totalSumText += columns[i];
    totalSumText += ' <b style="font-weight:300;color:' + colorChip.green + '">';
    totalSumText += String(totalMatrix[i - 1]);
    if (i === columns.length - 1) {
      totalSumText += "</b>명";
    } else {
      totalSumText += "</b>명&nbsp;&nbsp;&nbsp;";
    }
  }

  subSum.textContent = '';
  subSum.insertAdjacentHTML(`beforeend`, totalSumText);

}

BuilderJs.prototype.constructView = async function () {
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
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i);
        }
        return arr;
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
    this.localStorageConst = "constructFilter_";
    this.blockMapConst = "blockMap_";

    for (let t of typeArr) {
      window.localStorage.removeItem(this.localStorageConst + this.blockMapConst + t);
      for (let i = 0; i < 20; i++) {
        window.localStorage.removeItem(this.localStorageConst + t + String(i));
      }
    }

    whereQuery = {};
    projects = await ajaxJson({ noFlat: true, whereQuery }, "/getProjects", { equal: true });
    projects = new SearchArray(projects.filter((obj) => {
      return obj.desid !== '';
    }).filter((obj) => {
      return /^[진홀완드]/gi.test(obj.process.status);
    }).filter((obj) => {
      return obj.process.design.construct !== null
    }));

    designers = new SearchArray(await ajaxJson({ noFlat: true, whereQuery: { $or: projects.toNormal().map((obj) => { return { desid: obj.desid } }) } }, "/getDesigners", { equal: true }));
    clients = new SearchArray(await ajaxJson({ noFlat: true, whereQuery: { $or: projects.toNormal().map((obj) => { return { cliid: obj.cliid } }) } }, "/getClients", { equal: true }));

    projectHistory = await ajaxJson({
      idArr: projects.toNormal().map((obj) => { return obj.proid }),
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

    builderNames.push("고객");
    builderNames.push("디자이너");
    builderNames.push("-");

    this.builders = builders;
    this.builderNames = builderNames;
    this.projects = projects;
    this.designers = new Designers(designers);
    this.designers.setProjects(projects);
    this.designers.setClients(clients);

    loading.parentNode.removeChild(loading);

    this.constructBase();
    this.constructSearchEvent();
    this.constructBlockMove();
    this.constructExtractEvent();
    this.constructReportEvent();

    if (returnGet().proid !== undefined) {
      this.searchEvent.call({
        value: returnGet().proid
      }, {
        key: "Enter"
      })
    }

  } catch (e) {
    console.log(e);
  }
}
