// DATA -----------------------------------------------------------------------------------------------------------------

DesignerJs.prototype.aspirantDataRender = function (aspirant, titleMode) {
  const instance = this;
  const { ea, resetWidthEvent } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, dateToString, autoComma, equalJson, ajaxJson, blankHref, downloadFile } = GeneralJs;
  const { aspid, designer, phone, email, address, portfolio, meeting: { date, status }, information, submit } = aspirant;
  const { firstRequest: { date: request }, comeFrom } = submit;
  const { career, company, channel: { web, sns, cloud } } = information;
  const { detail } = career;
  const { businessNumber, classification, name, representative } = company;
  const zeroAddition = (num) => { return (num < 10) ? `0${String(num)}` : String(num); }
  const textMaker = (title, value, color, column) => {
    return `<b id="${!titleMode ? aspirant.aspid : "title"}_${column}" title="${title}" class="value" style="color:${colorChip[titleMode ? "whiteBlack" : color]};">${titleMode ? title : value}</b>`;
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
  const token = ", ";
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
  let num;
  let calendarEvent;
  let grayBoo;

  height = 43;
  margin = 1;

  top = (titleMode ? (isMac() ? 12 : 13) : (isMac() ? 11 : 12.5));
  left = 16;
  size = 14;
  startLeft = 0;

  grayBoo = !(/드랍/gi.test(status) || /없/gi.test(status));
  displayBoo = true;

  stringArr = [];
  updateArr = [];

  if (this.type === "basic") {

    map = {
      classification: {
        title: "분류",
        position: "information.company.classification",
        values: [],
        chain: null
      },
      phone: {
        title: "연락처",
        position: "phone",
        values: [],
        chain: null
      },
      status: {
        title: "미팅 상태",
        position: "meeting.status",
        values: [ "조정중", "조정 필요", "미팅 대기", "미팅 완료", "계약서 발송", "계약 완료", "메뉴얼 발송", "드랍" ],
        chain: null
      },
      date: {
        title: "미팅 날짜",
        position: "meeting.date",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      dateHour: {
        title: "미팅 시간",
        position: "meeting.date",
        values: [],
        chain: null
      },
      address: {
        title: "주소",
        position: "address",
        values: [],
        chain: null
      },
      request: {
        title: "문의일",
        position: "submit.firstRequest.date",
        values: [],
        chain: null
      },
      comeFrom: {
        title: "유입 경로",
        position: "submit.comeFrom",
        values: [],
        chain: null
      },
      detail: {
        title: "메모 및 경력",
        position: "information.career.detail",
        values: [],
        chain: null
      },
    };

    calendarEvent = function (thisCase) {
      const to = "newDesigner";
      const title = `신규 미팅 W ${aspirant.designer}D ${aspirant.aspid}`;
      let tempArr, dateValue, updateDate, start;

      dateValue = thisCase["date"].textContent.trim();

      if (dateValue !== "미정" && dateValue !== "예정" && dateValue !== "해당 없음") {
        tempArr = dateValue.split('-');
        updateDate = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')), Number(thisCase["dateHour"].textContent.split('시')[0].replace(/[^0-9]/g, '')), Number(thisCase["dateHour"].textContent.split('시')[1].replace(/[^0-9]/g, '')));
        start = updateDate;
      } else {
        start = null;
      }

      ajaxJson({ from: to, search: aspirant.aspid }, "/listSchedule", { equal: true }).then((list) => {
        if (start !== null) {
          if (list.length === 0) {
            return ajaxJson({ to, title, start }, "/makeSchedule");
          } else {
            return ajaxJson({ from: to, id: list[0].eventId, updateQuery: { start, title } }, "/updateSchedule");
          }
        } else {
          if (list.length !== 0) {
            return ajaxJson({ from: to, id: list[0].eventId }, "/deleteSchedule");
          }
        }
      }).catch((err) => {
        throw new Error(err);
      });
    }

    stringArr.push(textMaker(map["classification"].title, classification, "black", "classification"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["phone"].title, phone, "black", "phone"));
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
      width = 92;
      margin = 4;

      background = colorChip.gradientGreen4;
      updateEvent = async function (e) {
        try {
          const value = this.getAttribute("value");
          const position = this.getAttribute("position");
          const aspid = this.getAttribute("aspid");
          const removeTargets = mother.querySelectorAll("aside");
          let whereQuery, updateQuery;

          whereQuery = { aspid };
          updateQuery = {};
          updateQuery[position] = value;
          valueDom.textContent = value;

          await instance.aspirantUpdate(whereQuery, updateQuery, map[column].chain, value);
          instance.aspirantDeactivate(aspid, (value === "드랍"));

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
          attribute: { value: values[i], position, aspid: aspirant.aspid },
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

    stringArr.push(textMaker(map["date"].title, dateToString(date), dateToColor(date, true), "date"));
    updateArr.push(function (e, option, cancelBox, parent) {
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
      whereQuery = { aspid: aspirant.aspid };
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
          await instance.aspirantUpdate(whereQuery, updateQuery, chainQuery, value);
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
    updateArr.push(function (e, option, cancelBox, parent) {
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
      whereQuery = { aspid: aspirant.aspid };
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
          if (thisCase["date"].textContent.trim() === "예정") {
            updateQuery[position] = new Date(3800, 0, 1);
            thisCase["date"].style.color = valueDom.style.color = colorChip.red;
          } else if (thisCase["date"].textContent.trim() === "해당 없음") {
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
          await instance.aspirantUpdate(whereQuery, updateQuery, chainQuery, value);
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
            fontSize: String(size + 1) + ea,
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

    stringArr.push(textMaker(map["request"].title, dateToString(request, true), dateToColor(request, true), "request"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["comeFrom"].title, comeFrom, "black", "comeFrom"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["address"].title, address.slice(0, 25), "black", "address"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["detail"].title, detail.trim().split("\n")[0].slice(0, 40), "black", "detail"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "status";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let whereQuery, updateQuery, chainQuery;
      let historyHeight;
      let historyMargin;

      updateQuery = {};
      whereQuery = { aspid: aspirant.aspid };
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
          text: aspirant.information.career.detail.replace(/\<br\>/gi, "\n"),
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
                    const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));

                    (mother.querySelectorAll('b'))[0].textContent = value.trim().split("\n")[0].slice(0, 40);
                    aspirant.information.career.detail = value.trim();
                    await GeneralJs.ajaxJson({
                      whereQuery: { aspid: aspirant.aspid },
                      updateQuery: { "information.career.detail": value.trim() }
                    }, "/rawUpdateAspirant");

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
            fontWeight: String(400),
            background: colorChip.white,
            lineHeight: String(1.7),
            color: colorChip.black,
            border: String(0),
            outline: String(0),
          }
        }
      ]);

    });



  } else if (this.type === "portfolio") {

    map = {
      email: {
        title: "이메일",
        position: "email",
        values: [],
        chain: null
      },
      portfolio: {
        title: "포트폴리오",
        position: "portfolio",
        values: [],
        chain: null
      },
      web: {
        title: "웹",
        position: "information.channel.web",
        values: [],
        chain: null
      },
      sns: {
        title: "SNS",
        position: "information.channel.sns",
        values: [],
        chain: null
      },
      cloud: {
        title: "클라우드",
        position: "information.channel.cloud",
        values: [],
        chain: null
      },
    };

    stringArr.push(textMaker(map["email"].title, email, "black", "email"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["portfolio"].title, "보기", "black", "portfolio"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      let folderName, fileName;

      // dev
      console.log("dev needs")

    });

    stringArr.push(textMaker(map["web"].title, web.map((str) => { return str.replace(/https?\:?\/\//gi, '').trim().replace(/\/$/, ''); }).join(token), "black", "web"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { valueDom } = option;
      const targetLinks = valueDom.textContent.split(token).map((str) => { return str.trim(); });
      for (let link of targetLinks) {
        blankHref("https://" + link);
      }
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["sns"].title, sns.map((str) => { return str.replace(/https?\:?\/\//gi, '').trim().replace(/\/$/, ''); }).join(token), "black", "sns"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { valueDom } = option;
      const targetLinks = valueDom.textContent.split(token).map((str) => { return str.trim(); });
      for (let link of targetLinks) {
        blankHref("https://" + link);
      }
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["cloud"].title, cloud.map((str) => { return str.replace(/https?\:?\/\//gi, '').trim().replace(/\/$/, ''); }).join(token), "black", "cloud"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { valueDom } = option;
      const targetLinks = valueDom.textContent.split(token).map((str) => { return str.trim(); });
      for (let link of targetLinks) {
        blankHref("https://" + link);
      }
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

  }

  return { map, stringArr, updateArr, grayBoo, displayBoo };
}

DesignerJs.prototype.aspirantUpdate = async function (whereQuery, updateQuery, chainQuery = null, rawValue = '') {
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
    const { aspid } = whereQuery;
    const aspirant = this.aspirants.search("aspid", aspid);
    let tempArr, target;
    let boo;
    let tempQsa0, tempQsa1, tempQsa2;

    await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateAspirant");

    for (let query in updateQuery) {
      tempArr = query.split('.');
      target = aspirant;
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
        await ajaxJson({ whereQuery, updateQuery: chainUpdateQuery }, "/rawUpdateAspirant");
        for (let query in chainUpdateQuery) {
          tempArr = query.split('.');
          target = aspirant;
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

DesignerJs.prototype.aspirantDeactivate = function (aspid, offMode = true) {
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

  whiteBlock = document.getElementById(aspid);
  children = whiteBlock.children;
  length = children.length;
  emptyDate = new Date(1800, 0, 1);
  emptyValue = "해당 없음";
  name = "deactive_" + aspid;

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

DesignerJs.prototype.aspirantBase = function (search = null) {
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
  this.aspirantBlockInjection();
  this.aspirantDashBoard();
}

DesignerJs.prototype.aspirantBlockInjection = function () {
  const instance = this;
  const { ea, aspirants } = this;
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

  aspirants.sort((a, b) => { return b.submit.firstRequest.valueOf() - a.submit.firstRequest.valueOf(); });

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
  for (let i = 0; i < aspirants.length; i++) {
    if (firstBoo) {
      this.aspirantWhiteBlock(scrollTong, aspirants[i], (i === 0), i, true);
      firstBoo = false;
    }
    resultArr.push(this.aspirantWhiteBlock(scrollTong, aspirants[i], false, i, false));
  }

  resultArr = resultArr.filter((obj) => { return obj.result; });
  if (resultArr.length === 1) {
    if (returnGet().aspid !== resultArr[0].aspid) {
      appendQuery({
        aspid: resultArr[0].aspid
      });
    }
  } else if (resultArr.length === aspirants.length) {
    setQueue(() => {
      removeQuery("aspid");
    });
  }

  instance.resetWidthEvent();
  setQueue(() => {
    instance.resetWidthEvent();
  }, 200);
}

DesignerJs.prototype.aspirantWhiteBlock = function (mother, aspirant, first, index, titleMode = false) {
  if (mother === undefined || aspirant === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { ea } = this;
  const { createNode, createNodes, colorChip, withOut, isMac } = GeneralJs;
  const { map, stringArr, updateArr, grayBoo, displayBoo } = this.aspirantDataRender(aspirant, titleMode);
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

  if (blockMap[aspirant.aspid] === undefined) {
    blockArr = (new Array(stringArr.length)).fill("block");
  } else {
    blockArr = blockMap[aspirant.aspid];
    blockArr.pop();
  }

  blockArr.push(first ? "block" : instance.contentsSearchIndex.includes(index) ? "none" : (displayBoo ? "block" : "none"));

  whiteBlock = createNode({
    mother,
    id: titleMode ? "title" : aspirant.aspid,
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
        text: !titleMode ? aspirant.title : "",
        class: [ "hoverDefault" ],
        events: [
          {
            type: "click",
            event: function (e) {

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
        text: !titleMode ? `|<b style="display:none">${aspirant.aspid}</b>` : "",
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
                  if (document.getElementById(aspirant.aspid + "_" + column) === null) {
                    throw new Error("invaild doms");
                  }
                  thisCase[column] = document.getElementById(aspirant.aspid + "_" + column);
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
    aspid: aspirant.aspid,
    result: (first ? true : instance.contentsSearchIndex.includes(index) ? false : (displayBoo ? true : false))
  };
}

DesignerJs.prototype.aspirantDashBoard = function () {
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
            instance.aspirantBlockInjection();
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
          instance.aspirantBlockInjection();
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

DesignerJs.prototype.aspirantSearchEvent = function () {
  const instance = this;
  const { ea } = this;
  const input = this.searchInput;
  let width, length;

  length = this.aspirants.length;
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
      instance.aspirantBlockInjection();
    }
  });
}

DesignerJs.prototype.aspirantExtractEvent = function () {
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

DesignerJs.prototype.aspirantBlockMove = function () {
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

DesignerJs.prototype.aspirantView = async function () {
  const instance = this;
  try {
    const { createNodes, colorChip, ajaxJson, returnGet, equalJson, sleep, uniqueValue } = GeneralJs;
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
    let loading;
    let type, typeArr;
    let aspirants, aspirant;

    loading = await this.mother.loadingRun();

    typeArr = [ "basic", "portfolio" ];
    type = returnGet().type;
    if (type === undefined || type === null || !typeArr.includes(type)) {
      type = typeArr[0];
    }

    this.parentId = "1p9UDCbteR25i9ZNs2AF2Hdq99-TNyhEX";
    this.sheetName = "fromDB_aspirant_" + uniqueValue("string");
    this.typeArr = typeArr;
    this.type = type;
    this.contentsSpec = {};
    this.contentsSearchIndex = [];
    this.contentsBlocks = null;
    this.localStorageConst = "aspirantFilter_";
    this.blockMapConst = "blockMap_";

    for (let t of typeArr) {
      window.localStorage.removeItem(this.localStorageConst + this.blockMapConst + t);
      for (let i = 0; i < 20; i++) {
        window.localStorage.removeItem(this.localStorageConst + t + String(i));
      }
    }

    aspirants = new SearchArray(await ajaxJson({ whereQuery: {} }, "/getAspirants", { equal: true }));
    this.aspirants = aspirants;
    for (let aspirant of this.aspirants) {
      aspirant.title = `${aspirant.designer}&nbsp;&nbsp;<b style="color:${colorChip.deactive}">디자이너</b>`;
    }

    loading.parentNode.removeChild(loading);

    this.aspirantBase();
    this.aspirantSearchEvent();
    this.aspirantBlockMove();
    this.aspirantExtractEvent();

  } catch (e) {
    console.log(e);
  }
}
