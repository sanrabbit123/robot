DesignerJs.prototype.contentsBase = function (search = null) {
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
    }
  ]);

  this.contentsSpec.contentsTong = contentsTong;
  this.contentsSpec.dashBoard = dashBoard;
  this.contentsBlockInjection();
  this.contentsDashBoard();
}

DesignerJs.prototype.contentsWhiteBlock = function (mother, project, last, index, titleMode = false) {
  if (mother === undefined || project === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { ea, photoActionList } = this;
  const { createNode, createNodes, colorChip, withOut, isMac } = GeneralJs;
  const { address, contents: { photo, raw, share, sns }, history } = project;
  const { boo, date, info: { interviewer, photographer }, status } = photo;
  const { portfolio: { status: portfolioStatus, link: portfolioLink }, interview: { status: interviewStatus, link: interviewLink }, photo: { status: photoStatus, link: photoLink } } = raw;
  const { client: { photo: photoClient, contents: contentsClient }, designer: { photo: photoDesigner, contents: contentsDesigner } } = share;
  const { portfolio: { long: longPortfolio, short: shortPortfoilo }, interview: { long: longInterview, short: shortInterview } } = sns;
  const zeroAddition = (num) => { return (num < 10) ? `0${String(num)}` : String(num); }
  const textMaker = (title, value, color, column) => {
    return `<b id="${!titleMode ? project.proid : "title"}_${column}" title="${title}" class="value" style="color:${colorChip[titleMode ? "whiteBlack" : color]};">${titleMode ? title : value}</b>`;
  }
  const dateToString = (dateObj) => {
    if (dateObj.valueOf() > (new Date(3000, 0, 1)).valueOf()) {
      return "미정";
    } else if (dateObj.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
      return "해당 없음";
    } else {
      return `${String(dateObj.getFullYear())}-${zeroAddition(dateObj.getMonth() + 1)}-${zeroAddition(dateObj.getDate())}`;
    }
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
  let height, margin;
  let whiteBlock;
  let width0, width1;
  let top, left, size;
  let textMargin;
  let startLeft;
  let previousWidth, betweenText;
  let widthArr, domArr;
  let totalObj;
  let tempQsa;
  let whiteBack;
  let whiteWidth;
  let stringArr, tempDom;
  let tempString, tempString0, tempString1, tempString2, tempString3;
  let updateArr;
  let emptyDate, emptyValue;
  let map, mapColumn;
  let photoSourceBoo;
  let generalMargin, lastMargin;
  let factorHeight;
  let num;
  let leftMargin;
  let motherMargin;
  let titleBlockTop;

  leftMargin = 10;
  motherMargin = 30;

  totalObj = [];

  height = 43;
  margin = 1;

  width0 = 115;
  width1 = 3;
  titleBlockTop = 105;

  top = isMac() ? 11 : 13;
  left = 16;
  size = 14;
  textMargin = 6;
  startLeft = 0;
  betweenText = 50;

  totalObj.push(startLeft);
  totalObj.push(betweenText);

  whiteWidth = 16;

  stringArr = [];
  updateArr = [];

  generalMargin = 1;
  lastMargin = 60;

  factorHeight = 20;

  emptyDate = new Date(1800, 0, 1);
  emptyValue = "해당 없음";

  photoSourceBoo = true;
  if (this.type === "contents" || this.type === "share") {
    if (photoActionList.includes(project.contents.raw.photo.status)) {
      photoSourceBoo = false;
    }
    if (photoSourceBoo && this.pastPhotoSourceBoo) {
      last = true;
    }
  }
  if (this.type === "photo") {

    map = {
      boo: {
        title: "촬영",
        position: "contents.photo.boo",
        values: [ 'O', 'X' ],
        chain: {
          condition: 'X',
          updateQuery: {
            "contents.photo.status": emptyValue,
            "contents.photo.date": emptyDate,
            "contents.photo.info.photographer": emptyValue,
            "contents.photo.info.interviewer": emptyValue,
            "contents.share.client.photo": emptyDate,
            "contents.share.client.contents": emptyDate,
            "contents.share.designer.photo": emptyDate,
            "contents.share.designer.contents": emptyDate,
            "contents.sns.portfolio.long": emptyDate,
            "contents.sns.portfolio.short": emptyDate,
            "contents.sns.interview.long": emptyDate,
            "contents.sns.interview.short": emptyDate,
          }
        }
      },
      date: {
        title: "날짜",
        position: "contents.photo.date",
        values: [ '미정', '해당 없음' ],
        chain: null
      },
      dateHour: {
        title: "시간",
        position: "contents.photo.date",
        values: [],
        chain: null
      },
      status: {
        title: "상태",
        position: "contents.photo.status",
        values: [ '세팅 대기', '촬영 컨택 요망', '촬영 컨택중', '촬영 일정 확정', '촬영 완료', '촬영 홀딩', '해당 없음' ],
        chain: null
      },
      photographer: {
        title: "포토",
        position: "contents.photo.info.photographer",
        values: [ '미정', '정경일', '이현익', '김다현', '디자이너', '고객', '박혜연', '배창규' ],
        chain: null
      },
      interviewer: {
        title: "담당",
        position: "contents.photo.info.interviewer",
        values: [ '미정', '정재은', '강해진', '임혜령', '임지민', '이큰별', '배창규', '박혜연' ],
        chain: null
      },
      address: {
        title: "주소",
        position: "",
        values: [],
        chain: null
      },
    };

    stringArr.push(textMaker(map["boo"].title, boo ? 'O' : 'X', "black", "boo"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "boo";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      width = 36;
      margin = 4;
      startLeft = 0;

      background = colorChip.gradientGreen4;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          updateQuery[position] = value === 'O';
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          instance.contentsDeactivate(project.proid, (value === 'X'));
          valueDom.textContent = value;
          thisCase["status"].textContent = emptyValue;
          thisCase["date"].textContent = emptyValue;
          thisCase["photographer"].textContent = emptyValue;
          thisCase["interviewer"].textContent = emptyValue;
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
          attribute: [ { value: values[i] } ],
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top) + ea,
            left: String(startLeft + ((width + margin) * i)) + ea,
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
    stringArr.push(textMaker(map["date"].title, dateToString(date), dateToColor(date, true), "date"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "date";
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
          if (value === "미정") {
            updateQuery[position] = new Date(3800, 0, 1);
            thisCase["dateHour"].style.color = valueDom.style.color = colorChip.red;
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
            thisCase["dateHour"].style.color = valueDom.style.color = colorChip.gray5;
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')), Number(thisCase["dateHour"].textContent.split('시')[0].replace(/[^0-9]/g, '')), Number(thisCase["dateHour"].textContent.split('시')[1].replace(/[^0-9]/g, '')));
            if (updateQuery[position].valueOf() > (new Date()).valueOf()) {
              thisCase["dateHour"].style.color = valueDom.style.color = colorChip.green;
            } else {
              thisCase["dateHour"].style.color = valueDom.style.color = colorChip.black;
            }
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          calendarEvent(thisCase);
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

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
    stringArr.push(textMaker(map["dateHour"].title, `${zeroAddition(date.getHours())}시 ${zeroAddition(date.getMinutes())}분`, dateToColor(date, true), "dateHour"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "dateHour";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let newDom, newInput;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 36;
      margin = 4;

      background = colorChip.gradientGreen;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          let tempArr;
          if (thisCase["date"].textContent.trim() === "미정") {
            updateQuery[position] = new Date(3800, 0, 1);
            thisCase["date"].style.color = valueDom.style.color = colorChip.red;
          } else if (thisCase["date"].textContent.trim() === "없음") {
            updateQuery[position] = new Date(1800, 0, 1);
            thisCase["date"].style.color = valueDom.style.color = colorChip.gray5;
          } else {
            tempArr = thisCase["date"].textContent.trim().split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')), Number(value.split('시')[0].replace(/[^0-9]/g, '')), Number(value.split('시')[1].replace(/[^0-9]/g, '')));
            if (updateQuery[position].valueOf() > (new Date()).valueOf()) {
              thisCase["date"].style.color = valueDom.style.color = colorChip.green;
            } else {
              thisCase["date"].style.color = valueDom.style.color = colorChip.black;
            }
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          calendarEvent(thisCase);
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

          resetWidthEvent();
        } catch (e) {
          console.log(e);
        }
      };

      [ newDom, newInput ] = createNodes([
        {
          mother: this,
          mode: "aside",
          events: [ { type: "click", event: (e) => { e.stopPropagation(); } } ],
          style: {
            position: "absolute",
            top: String(0) + ea,
            left: String(0) + ea,
            width: String(this.getBoundingClientRect().width) + ea,
            height: String(this.getBoundingClientRect().height) + ea,
            color: colorChip.green,
            background: colorChip.white,
            zIndex
          }
        },
        {
          mother: -1,
          mode: "input",
          attribute: [
            { type: "text" },
            { value: this.textContent.trim() },
            { past: this.textContent.trim() },
          ],
          events: [
            { type: "click", event: (e) => { e.stopPropagation(); } },
            {
              type: "keypress",
              event: function (e) {
                if (e.key === "Enter") {
                  if (/^[0-9]+시 [0-9][0-9]분$/i.test(this.value.trim())) {
                    this.setAttribute("value", this.value.trim());
                    updateEvent.call(this, e);
                  } else {
                    this.value = this.getAttribute("past");
                  }
                }
              }
            },
          ],
          style: {
            display: "inline-block",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.green,
            background: colorChip.white,
            outline: String(0),
            border: String(0),
            width: String(100) + '%',
            height: String(valueDom.getBoundingClientRect().height) + ea,
          }
        }
      ]);

      newInput.focus();

    });
    stringArr.push(textMaker(map["status"].title, status, "black", "status"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "status";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 114;
      margin = 4;

      background = colorChip.gradientGreen4;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          updateQuery[position] = value;
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          calendarEvent(thisCase);
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
          attribute: [ { value: values[i] } ],
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
    stringArr.push(textMaker(map["photographer"].title, photographer, (photographer === "미정" ? "red" : "black"), "photographer"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "photographer";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 70;
      margin = 4;

      background = colorChip.gradientGreen4;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          updateQuery[position] = value;
          if (value === "미정") {
            valueDom.style.color = colorChip.red;
          } else {
            valueDom.style.color = colorChip.black;
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          calendarEvent(thisCase);
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
          attribute: [ { value: values[i] } ],
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
    stringArr.push(textMaker(map["interviewer"].title, interviewer, (interviewer === "미정" ? "red" : "black"), "interviewer"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "interviewer";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 70;
      margin = 4;

      background = colorChip.gradientGreen4;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          updateQuery[position] = value;
          if (value === "미정") {
            valueDom.style.color = colorChip.red;
          } else {
            valueDom.style.color = colorChip.black;
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          calendarEvent(thisCase);
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
          attribute: [ { value: values[i] } ],
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
    stringArr.push(textMaker(map["address"].title, address.replace(/시 /gi, " ").replace(/도 /gi, " ").replace(/군 /gi, " ").replace(/구 /gi, " ").slice(0, 40), "black", "address"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);

      resetWidthEvent();
    });

  } else if (this.type === "source") {

    map = {
      portfolioStatus: {
        title: "디자이너글 상태",
        position: "contents.raw.portfolio.status",
        values: [ '세팅 대기', '원본 요청 요망', '원본 요청 완료', '원본 수집 완료', '원본 편집중', '원본 편집 완료', '해당 없음' ],
        chain: null
      },
      portfolioLink: {
        title: "디자이너글 링크",
        position: "contents.raw.portfolio.link",
        values: [],
        chain: {
          condition: "^http",
          updateQuery: {
            "contents.raw.portfolio.status": "원본 수집 완료"
          },
        }
      },
      interviewStatus: {
        title: "인터뷰 상태",
        position: "contents.raw.interview.status",
        values: [ '세팅 대기', '인터뷰 요망', '인터뷰 완료', '원본 편집중', '원본 편집 완료', '해당 없음' ],
        chain: null
      },
      interviewLink: {
        title: "인터뷰 링크",
        position: "contents.raw.interview.link",
        values: [],
        chain: null
      },
      photoStatus: {
        title: "사진 상태",
        position: "contents.raw.photo.status",
        values: [ '촬영 대기', '원본 요청 요망', '원본 요청 완료', '원본 수집 완료', '원본 보정중', '원본 보정 완료', '해당 없음' ],
        chain: null
      },
    };

    stringArr.push(textMaker(map["portfolioStatus"].title, portfolioStatus, /요망/gi.test(portfolioStatus) ? "red" : (/요청 완료/gi.test(portfolioStatus) ? "purple" : (/편집 완료/gi.test(portfolioStatus) ? "green" : "black")), "portfolioStatus"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "portfolioStatus";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 110;
      margin = 4;

      background = colorChip.gradientGreen4;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          updateQuery[position] = value;
          if (/요망/gi.test(value)) {
            valueDom.style.color = colorChip.red;
          } else if (/편집 완료/gi.test(value)) {
            valueDom.style.color = colorChip.green;
          } else {
            valueDom.style.color = colorChip.black;
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
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
          attribute: [ { value: values[i] } ],
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
    stringArr.push(textMaker(map["portfolioLink"].title, portfolioLink === '' ? "링크 없음" : "링크 있음", "black", "portfolioLink"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "portfolioLink";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let newDom, newInput;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 36;
      margin = 4;

      background = colorChip.gradientGreen;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          updateQuery[position] = value;
          if (value === '') {
            valueDom.textContent = "링크 없음";
          } else {
            valueDom.textContent = "링크 있음";
            thisCase["portfolioStatus"].textContent = "원본 수집 완료";
            thisCase["portfolioStatus"].style.color = colorChip.black;
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

          resetWidthEvent();
        } catch (e) {
          console.log(e);
        }
      };

      [ newDom, newInput ] = createNodes([
        {
          mother: this,
          mode: "aside",
          events: [ { type: "click", event: (e) => { e.stopPropagation(); } } ],
          style: {
            position: "absolute",
            top: String(0) + ea,
            left: String(0) + ea,
            width: String(this.getBoundingClientRect().width) + ea,
            height: String(this.getBoundingClientRect().height) + ea,
            color: colorChip.green,
            background: colorChip.white,
            zIndex
          }
        },
        {
          mother: -1,
          mode: "input",
          attribute: [
            { type: "text" },
            { value: project.contents.raw.portfolio.link },
            { past: project.contents.raw.portfolio.link },
          ],
          events: [
            { type: "click", event: (e) => { e.stopPropagation(); } },
            {
              type: "keypress",
              event: function (e) {
                if (e.key === "Enter") {
                  this.setAttribute("value", this.value.trim());
                  updateEvent.call(this, e);
                }
              }
            },
          ],
          style: {
            display: "inline-block",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.green,
            background: colorChip.white,
            outline: String(0),
            border: String(0),
            width: String(100) + '%',
            height: String(valueDom.getBoundingClientRect().height) + ea,
          }
        }
      ]);

      newInput.focus();

    });
    stringArr.push(textMaker(map["interviewStatus"].title, interviewStatus, /요망/gi.test(interviewStatus) ? "red" : (/편집 완료/gi.test(interviewStatus) ? "green" : "black"), "interviewStatus"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "interviewStatus";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 110;
      margin = 4;

      background = colorChip.gradientGreen4;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          updateQuery[position] = value;
          if (/요망/gi.test(value)) {
            valueDom.style.color = colorChip.red;
          } else if (/편집 완료/gi.test(value)) {
            valueDom.style.color = colorChip.green;
          } else {
            valueDom.style.color = colorChip.black;
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
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
          attribute: [ { value: values[i] } ],
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
    stringArr.push(textMaker(map["interviewLink"].title, interviewLink === '' ? "링크 없음" : "링크 있음", "black", "interviewLink"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "interviewLink";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let newDom, newInput;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 36;
      margin = 4;

      background = colorChip.gradientGreen;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          updateQuery[position] = value;
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = (value === '') ? "링크 없음" : "링크 있음";
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

          resetWidthEvent();
        } catch (e) {
          console.log(e);
        }
      };

      [ newDom, newInput ] = createNodes([
        {
          mother: this,
          mode: "aside",
          events: [ { type: "click", event: (e) => { e.stopPropagation(); } } ],
          style: {
            position: "absolute",
            top: String(0) + ea,
            left: String(0) + ea,
            width: String(this.getBoundingClientRect().width) + ea,
            height: String(this.getBoundingClientRect().height) + ea,
            color: colorChip.green,
            background: colorChip.white,
            zIndex
          }
        },
        {
          mother: -1,
          mode: "input",
          attribute: [
            { type: "text" },
            { value: project.contents.raw.interview.link },
            { past: project.contents.raw.interview.link },
          ],
          events: [
            { type: "click", event: (e) => { e.stopPropagation(); } },
            {
              type: "keypress",
              event: function (e) {
                if (e.key === "Enter") {
                  this.setAttribute("value", this.value.trim());
                  updateEvent.call(this, e);
                }
              }
            },
          ],
          style: {
            display: "inline-block",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.green,
            background: colorChip.white,
            outline: String(0),
            border: String(0),
            width: String(100) + '%',
            height: String(valueDom.getBoundingClientRect().height) + ea,
          }
        }
      ]);

      newInput.focus();

    });
    stringArr.push(textMaker(map["photoStatus"].title, photoStatus, /요망/gi.test(photoStatus) ? "red" : (/보정 완료/gi.test(photoStatus) ? "green" : "black"), "photoStatus"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "photoStatus";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 110;
      margin = 4;

      background = colorChip.gradientGreen4;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          updateQuery[position] = value;
          if (/요망/gi.test(value)) {
            valueDom.style.color = colorChip.red;
          } else if (/보정 완료/gi.test(value)) {
            valueDom.style.color = colorChip.green;
          } else {
            valueDom.style.color = colorChip.black;
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
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
          attribute: [ { value: values[i] } ],
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

  } else if (this.type === "contents") {

    map = {
      portfolioLong: {
        title: "블로그 포폴",
        position: "contents.sns.portfolio.long",
        values: [ '미정', '해당 없음' ],
        chain: null
      },
      interviewLong: {
        title: "블로그 인터뷰",
        position: "contents.sns.interview.long",
        values: [ '미정', '해당 없음' ],
        chain: null
      },
      portfolioShort: {
        title: "인스타 포폴",
        position: "contents.sns.portfolio.short",
        values: [ '미정', '해당 없음' ],
        chain: null
      },
      interviewShort: {
        title: "인스타 인터뷰",
        position: "contents.sns.interview.short",
        values: [ '미정', '해당 없음' ],
        chain: null
      },
      webPublish: {
        title: "웹",
        position: "",
        values: [],
        chain: null
      },
    };

    tempString0 = dateToString(longPortfolio);
    tempString1 = dateToString(longInterview);
    tempString2 = dateToString(shortPortfoilo);
    tempString3 = dateToString(shortInterview);

    stringArr.push(textMaker(map["interviewLong"].title, tempString1, dateToColor(longInterview, false), "interviewLong"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "interviewLong";
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
          if (value === "미정") {
            updateQuery[position] = new Date(3800, 0, 1);
            thisCase["webPublish"].style.color = valueDom.style.color = colorChip.red;
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
            thisCase["webPublish"].style.color = valueDom.style.color = colorChip.gray5;
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            if (updateQuery[position].valueOf() <= (new Date()).valueOf()) {
              thisCase["webPublish"].style.color = valueDom.style.color = colorChip.green;
            } else {
              thisCase["webPublish"].style.color = valueDom.style.color = colorChip.black;
            }
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          thisCase["webPublish"].textContent = value;
          valueDom.textContent = value;
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

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
    stringArr.push(textMaker(map["portfolioLong"].title, tempString0, dateToColor(longPortfolio, false), "portfolioLong"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "portfolioLong";
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
          if (value === "미정") {
            updateQuery[position] = new Date(3800, 0, 1);
            valueDom.style.color = colorChip.red;
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
            valueDom.style.color = colorChip.gray5;
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            if (updateQuery[position].valueOf() <= (new Date()).valueOf()) {
              valueDom.style.color = colorChip.green;
            } else {
              valueDom.style.color = colorChip.black;
            }
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

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
    stringArr.push(textMaker(map["interviewShort"].title, tempString3, dateToColor(shortInterview, false), "interviewShort"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "interviewShort";
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
          if (value === "미정") {
            updateQuery[position] = new Date(3800, 0, 1);
            valueDom.style.color = colorChip.red;
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
            valueDom.style.color = colorChip.gray5;
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            if (updateQuery[position].valueOf() <= (new Date()).valueOf()) {
              valueDom.style.color = colorChip.green;
            } else {
              valueDom.style.color = colorChip.black;
            }
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

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
    stringArr.push(textMaker(map["portfolioShort"].title, tempString2, dateToColor(shortPortfoilo, false), "portfolioShort"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "portfolioShort";
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
          if (value === "미정") {
            updateQuery[position] = new Date(3800, 0, 1);
            valueDom.style.color = colorChip.red;
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
            valueDom.style.color = colorChip.gray5;
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            if (updateQuery[position].valueOf() <= (new Date()).valueOf()) {
              valueDom.style.color = colorChip.green;
            } else {
              valueDom.style.color = colorChip.black;
            }
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

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
    stringArr.push(textMaker(map["webPublish"].title, dateToString(project.web), dateToColor(project.web, false), "webPublish"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);

      resetWidthEvent();
    });

  } else if (this.type === "share") {

    map = {
      clientPhoto: {
        title: "고객 사진 공유",
        position: "contents.share.client.photo",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      clientContents: {
        title: "고객 컨텐츠 공유",
        position: "contents.share.client.contents",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      designerPhoto: {
        title: "디자이너 사진 공유",
        position: "contents.share.designer.photo",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      designerContents: {
        title: "디자이너 컨텐츠 공유",
        position: "contents.share.designer.contents",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
    };

    stringArr.push(textMaker(map["clientPhoto"].title, dateToString(photoClient).replace(/미정/g, "예정"), dateToColor(photoClient, false).replace(/red/gi, "black"), "clientPhoto"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "clientPhoto";
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
            valueDom.style.color = colorChip.black;
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
            valueDom.style.color = colorChip.gray5;
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            if (updateQuery[position].valueOf() >= (new Date()).valueOf()) {
              valueDom.style.color = colorChip.black;
            } else {
              valueDom.style.color = colorChip.green;
            }
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

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
    stringArr.push(textMaker(map["designerPhoto"].title, dateToString(photoDesigner).replace(/미정/g, "예정"), dateToColor(photoDesigner, false).replace(/red/gi, "black"), "designerPhoto"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "designerPhoto";
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
            valueDom.style.color = colorChip.black;
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
            valueDom.style.color = colorChip.gray5;
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            if (updateQuery[position].valueOf() >= (new Date()).valueOf()) {
              valueDom.style.color = colorChip.black;
            } else {
              valueDom.style.color = colorChip.green;
            }
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

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
    stringArr.push(textMaker(map["clientContents"].title, dateToString(contentsClient).replace(/미정/g, "예정"), dateToColor(contentsClient, false).replace(/red/gi, "black"), "clientContents"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "clientContents";
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
            valueDom.style.color = colorChip.black;
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
            valueDom.style.color = colorChip.gray5;
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            if (updateQuery[position].valueOf() >= (new Date()).valueOf()) {
              valueDom.style.color = colorChip.black;
            } else {
              valueDom.style.color = colorChip.green;
            }
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

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
    stringArr.push(textMaker(map["designerContents"].title, dateToString(contentsDesigner).replace(/미정/g, "예정"), dateToColor(contentsDesigner, false).replace(/red/gi, "black"), "designerContents"));
    updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "designerContents";
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
            valueDom.style.color = colorChip.black;
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
            valueDom.style.color = colorChip.gray5;
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            if (updateQuery[position].valueOf() >= (new Date()).valueOf()) {
              valueDom.style.color = colorChip.black;
            } else {
              valueDom.style.color = colorChip.green;
            }
          }
          await instance.contentsUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

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

  }

  stringArr.push(textMaker("메모", history.replace(/\n/g, ' ').slice(0, 40), "black", "history"));
  updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
    const mother = this;
    const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
    const column = "status";
    let startLeft, width, margin, background;
    let values, updateEvent;
    let whereQuery, updateQuery, chainQuery;
    let historyHeight;
    let historyMargin;

    updateQuery = {};
    whereQuery = { proid: project.proid };
    startLeft = -20;
    width = 560;
    historyHeight = 400;
    margin = 4;
    historyMargin = 15;

    this.style.overflow = "visible";

    background = colorChip.white;

    createNodes([
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
          }
        ],
        style: {
          position: "absolute",
          top: String(top + 1) + ea,
          left: String(startLeft) + ea,
          width: String(width) + ea,
          height: String(historyHeight) + ea,
          background: colorChip.white,
          zIndex, boxShadow, borderRadius, animation,
        }
      },
      {
        mother: -1,
        mode: "textarea",
        text: history.replace(/\<br\>/gi, "\n"),
        events: [
          {
            type: "click",
            event: function (e) {
              e.stopPropagation();
            }
          },
          {
            type: "keydown",
            event: async function (e) {
              try {
                if (e.key === "Tab") {
                  e.preventDefault();
                  e.stopPropagation();

                  const removeTargets = mother.querySelectorAll("aside");
                  const value = this.value;
                  const cookies = GeneralJs.getCookiesAll();

                  (mother.querySelectorAll('b'))[1].textContent = value.slice(0, 40);
                  await GeneralJs.ajaxJson({
                    id: project.proid,
                    column: "photo",
                    value,
                    email: cookies.homeliaisonConsoleLoginedEmail
                  }, "/updateProjectHistory");

                  for (let dom of removeTargets) {
                    mother.removeChild(dom);
                  }

                  resetWidthEvent();
                }
              } catch (e) {
                console.log(e);
              }
            }
          }
        ],
        style: {
          position: "absolute",
          top: String(historyMargin) + ea,
          left: String(historyMargin + 3) + ea,
          width: withOut(100, (historyMargin + 3) * 2, ea),
          height: withOut(100, historyMargin * 2, ea),
          fontSize: String(size) + ea,
          fontWeight: String(300),
          background: colorChip.white,
          lineHeight: String(1.7),
          color: colorChip.black,
          border: String(0),
          outline: String(0),
        }
      }
    ]);

  });

  whiteBlock = createNode({
    mother,
    id: project.proid,
    attribute: [
      { index: String(index) },
      { sortstandard: "" },
      { sort: "1" },
    ],
    style: {
      display: instance.contentsSearchIndex.includes(index) ? "none" : (photoSourceBoo ? "block" : "none"),
      position: titleMode ? "fixed" : "relative",
      width: String(8000) + ea,
      height: String(height) + ea,
      marginBottom: String(margin * (!last ? generalMargin : lastMargin)) + ea,
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
          background: titleMode ? colorChip.gradientGreen2 : colorChip[boo ? "white" : "gray0"],
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
        { arrindex: String(i) },
      ],
      text: stringArr[i],
      class: [ "white_child_" + String(i) ],
      events: [
        {
          type: [ "click", "contextmenu" ],
          event: function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (this.querySelectorAll("aside").length === 0) {
              const self = this;
              const index = Number(this.getAttribute("arrindex"));
              const { ea } = instance;
              const { createNode, createNodes, colorChip, withOut } = GeneralJs;
              const valueDom = this.querySelector(".value");
              let thisCase;
              thisCase = {};
              for (let column in map) {
                if (document.getElementById(project.proid + "_" + column) === null) {
                  throw new Error("invaild doms");
                }
                thisCase[column] = document.getElementById(project.proid + "_" + column);
              }
              const option = {
                ea,
                top: 25,
                createNode,
                createNodes,
                colorChip,
                withOut,
                thisCase,
                boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
                animation: "fadeuplite 0.2s ease forwards",
                borderRadius: String(5) + "px",
                zIndex: String(1),
                valueDom,
                height: 31,
                size,
                textTop: (isMac() ? 5 : 7)
              };
              let cancelBox, parent, calendarEvent;

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

              calendarEvent = null;
              if (instance.type === "photo") {
                if (thisCase["boo"].textContent.trim() === "O") {
                  calendarEvent = function (thisCase) {
                    const to = "photographing";
                    const title = `촬영 W ${project.name}C ${project.designer}D ${thisCase["photographer"].textContent}P ${thisCase["interviewer"].textContent}I ${project.proid}`;
                    let tempArr, dateValue, updateDate, start;

                    dateValue = thisCase["date"].textContent.trim();

                    if (dateValue !== "미정" && dateValue !== "해당 없음" && !/디자이너/gi.test(thisCase["photographer"].textContent) && !/고객/gi.test(thisCase["photographer"].textContent)) {
                      tempArr = dateValue.split('-');
                      updateDate = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')), Number(thisCase["dateHour"].textContent.split('시')[0].replace(/[^0-9]/g, '')), Number(thisCase["dateHour"].textContent.split('시')[1].replace(/[^0-9]/g, '')));
                      start = updateDate;
                    } else {
                      start = null;
                    }

                    GeneralJs.ajaxJson({ from: to, search: project.proid }, "/listSchedule", { equal: true }).then((list) => {
                      if (start !== null) {
                        if (list.length === 0) {
                          return GeneralJs.ajaxJson({ to, title, start }, "/makeSchedule");
                        } else {
                          return GeneralJs.ajaxJson({ from: to, id: list[0].eventId, updateQuery: { start, title } }, "/updateSchedule");
                        }
                      } else {
                        if (list.length !== 0) {
                          return GeneralJs.ajaxJson({ from: to, id: list[0].eventId }, "/deleteSchedule");
                        }
                      }
                    }).catch((err) => {
                      throw new Error(err);
                    });

                  }
                }
              }

              updateArr[index].call(this, e, option, cancelBox, parent, calendarEvent, instance.resetWidthEvent);
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
    startLeft = startLeft + previousWidth + betweenText;
  }
  totalObj.push(widthArr);
  totalObj.push(domArr);

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

  if (!boo) {
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
  if (photoSourceBoo && this.pastPhotoSourceBoo) {
    num = 2;
    while (this.contentsBlocks[this.contentsBlocks.length - num] !== undefined) {
      this.contentsBlocks[this.contentsBlocks.length - num].style.marginBottom = String(margin * generalMargin) + ea;
      num++;
    }
  }
  this.pastPhotoSourceBoo = photoSourceBoo;

  totalObj.push(whiteBlock);

  return totalObj;
}

DesignerJs.prototype.contentsBlockInjection = function () {
  const instance = this;
  const { ea, projects, actionList } = this;
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

  width = [];
  dom = [];
  maxWidth = [];

  projects.sort((a, b) => { return b.contents.photo.date.valueOf() - a.contents.photo.date.valueOf(); });

  this.contentsBlocks = [];
  this.pastPhotoSourceBoo = true;
  this.resetWidthEvent = async function () {
    try {
      const { xyConverting } = GeneralJs;
      const ignoreNumbers = [ 3, 1 ];
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
    if (!actionList.includes(projects[i].process.action)) {
      if (firstBoo) {
        [ startLeft, betweenText, widthArr, domArr, whiteBlock ] = this.contentsWhiteBlock(scrollTong, projects[i], (i === projects.length - 1), i, true);
        whiteBlock.style.display = "block";
        width.push(widthArr);
        dom.push(domArr);
        firstBoo = false;
      }
      [ startLeft, betweenText, widthArr, domArr, whiteBlock ] = this.contentsWhiteBlock(scrollTong, projects[i], (i === projects.length - 1), i, false);
      width.push(widthArr);
      dom.push(domArr);
    }
  }

  this.resetWidthEvent();

}

DesignerJs.prototype.contentsDashBoard = function () {
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
            instance.contentsBlockInjection();
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
          instance.contentsBlockInjection();
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

DesignerJs.prototype.contentsSearchEvent = function () {
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
      instance.contentsBlockInjection();
    }
  });
}

DesignerJs.prototype.contentsUpdate = async function (whereQuery, updateQuery, chainQuery = null, rawValue = '') {
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

DesignerJs.prototype.contentsDeactivate = function (proid, offMode = true) {
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
    tong.push(whiteBlock.style.background);
    whiteBlock.style.background = colorChip.gray0;
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
      whiteBlock.style.background = tong[num];
      num = num + 1;
      children[length - 2].style.background = tong[num];
      num = num + 1;
      children[length - 1].style.background = tong[num];
    } else {
      window.location.reload();
    }
  }

}

DesignerJs.prototype.contentsBlockMove = function () {
  const instance = this;
  const { ea } = this;
  const { belowButtons: { arrow: { left, right } } } = this.mother;
  const moveEvent = function (type = "left") {
    return function (e) {
      const blocks = instance.contentsBlocks;
      const movementAmount = 50;
      const ignoreNumbers = [ 3, 2 ];
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

DesignerJs.prototype.contentsView = async function () {
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
    const { createNodes, colorChip, ajaxJson, returnGet, equalJson, sleep } = GeneralJs;
    const todayDateValue = (new Date()).valueOf();
    let loading;
    let projects;
    let designers, desidArr_raw, desidArr;
    let clients, cliidArr_raw, cliidArr;
    let proidArr_raw;
    let contents;
    let temp;
    let type, typeArr;
    let projectHistory;
    let proidArr;
    let whereQuery;

    loading = await this.mother.loadingRun();

    typeArr = [ "photo", "source", "contents", "share" ];
    type = returnGet().type;
    if (type === undefined || type === null || !typeArr.includes(type)) {
      type = typeArr[0];
    }

    this.typeArr = typeArr;
    this.type = type;
    this.contentsSpec = {};
    this.contentsSearchIndex = [];
    this.contentsBlocks = null;
    this.actionList = [
      "계약금 안내",
      "현장미팅 조율",
      "현장미팅 확정",
      "의뢰서 공유",
      "현장미팅 피드백",
      "잔금 안내",
      "시작 대기",
      "1차 제안",
      "수정 제안",
      "시공 진행",
      "제품 구매",
      "배송중",
      "세팅 마무리",
    ];
    this.photoActionList = [
      '촬영 대기',
      '원본 요청 요망',
      '원본 요청 완료',
      '해당 없음'
    ];

    whereQuery = {};
    whereQuery["$and"] = [];
    whereQuery["$and"].push({ desid: { $regex: "^d" } });
    whereQuery["$and"].push({ "process.status": { $regex: "^[진홀완]" } });
    for (let i of this.actionList) {
      whereQuery["$and"].push({ "process.action": { $not: { $regex: i } } });
    }
    whereQuery["$and"].push({
      $or: [
        { "contents.share.client.photo": { $gte: new Date() } },
        { "contents.share.client.contents": { $gte: new Date() } },
        { "contents.share.designer.photo": { $gte: new Date() } },
        { "contents.share.designer.contents": { $gte: new Date() } },
        { "contents.sns.portfolio.long": { $gte: new Date() } },
        { "contents.sns.portfolio.short": { $gte: new Date() } },
        { "contents.sns.interview.long": { $gte: new Date() } },
        { "contents.sns.interview.short": { $gte: new Date() } },
        { "process.calculation.payments.remain.date": { $lte: new Date(2000, 0, 1) } }
      ]
    });

    projects = new SearchArray(await ajaxJson({ noFlat: true, whereQuery }, "/getProjects", { equal: true }));

    desidArr_raw = [];
    cliidArr_raw = [];
    proidArr_raw = [];
    proidArr = [];
    for (let project of projects) {
      desidArr_raw.push(project.desid);
      cliidArr_raw.push(project.cliid);
      proidArr_raw.push({ proid: project.proid });
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
    }, "/getClients"));

    contents = new SearchArray(await ajaxJson({
      noFlat: true,
      whereQuery: {
        $or: proidArr_raw
      }
    }, "/getContents", { equal: true }));

    projectHistory = await ajaxJson({
      idArr: proidArr,
      method: "project",
      property: "photo",
    }, "/getHistoryProperty");

    for (let p of projects) {
      p.designer = designers.search("desid", p.desid).designer;
      temp = clients.search("cliid", p.cliid);
      p.name = temp.name;
      p.address = temp.requests[0].request.space.address;
      p.title = `${p.name} <b style="color:${colorChip.green}">C</b>&nbsp;&nbsp;${p.designer} <b style="color:${colorChip.green}">D</b>`;
      temp = contents.search("proid", p.proid);
      if (temp !== null) {
        p.web = temp.contents.portfolio.date;
        p.pid = temp.contents.portfolio.pid;
      } else {
        p.web = p.contents.sns.interview.long;
        p.pid = "미정";
      }
      p.history = projectHistory[p.proid];
    }

    this.projects = projects;
    this.designers = new Designers(designers);
    this.designers.setProjects(projects);
    this.designers.setClients(clients);

    loading.parentNode.removeChild(loading);

    this.contentsBase();
    this.contentsSearchEvent();
    this.contentsBlockMove();

  } catch (e) {
    console.log(e);
  }
}
