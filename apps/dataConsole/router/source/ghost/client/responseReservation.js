/<%patch%>/ {
  "patch": {
    "entire": false,
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false,
    "photo": false
  },
  "class": {
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return (thisPerson.name + ' 고객님 응대 예약 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return (thisPerson.name + ' 고객님 응대 예약 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "responseReservation",
  "route": [
    "reservation",
    "RR"
  ]
} %/%/g

const ResponseReservationJs = function () {
  this.mother = new GeneralJs();
  this.client = null;
}

ResponseReservationJs.binaryPath = "/middle/reservation";

ResponseReservationJs.prototype.insertInitBox = async function () {
  const instance = this;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren } = GeneralJs;
  try {
    let whiteBlock, whiteTong;
    let blockHeight, bottomMargin;
    let margin;
    let calendar;
    let initWordingBox;
    let initWordingHeight;
    let initWordingSize;
    let initWordingLineHeight;
    let calendarBox;
    let calendarWidth;
    let quoteTop, quoteHeight, quoteMarginBottom, quoteLeft;
    let titleAreaHeight;
    let middleMargin;
    let buttonMargin;
    let buttonValues;
    let buttonBetween;
    let buttonSize;
    let buttonTop;
    let buttonPaddingTop;
    let mobileCalendarHeight;
    let initWordings;
    let buttonMaker;

    blockHeight = <%% this.backHeight, this.backHeight - 100, this.backHeight - 100, this.backHeight - 220, this.backHeight %%>;
    bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
    margin = <%% 52, 52, 44, 36, 4.7 %%>;

    initWordingHeight = <%% 20, 20, 20, 20, 5 %%>;
    initWordingSize = <%% 17, 17, 16, 14, 3.4 %%>;
    initWordingLineHeight = <%% 10, 10, 10, 9, 1.7 %%>;

    middleMargin = <%% 30, 30, 30, 15, 3.2 %%>;

    quoteTop = 0;
    quoteHeight = <%% 12, 12, 11, 9, 2.2 %%>;
    quoteMarginBottom = <%% 7, 7, 7, 6, 1.2 %%>;
    quoteLeft = <%% 2, 2, 2, 2, 1 %%>;

    calendarWidth = <%% 1000, 780, 640, 520, 80 %%>;

    buttonMargin = <%% 20, 20, 20, 20, 20 %%>;
    buttonBetween = <%% 5, 5, 5, 4, 1 %%>;
    buttonSize = <%% 19, 16, 16, 12, 3 %%>;
    buttonTop = <%% 7, 5, 5, 4, 1.4 %%>;
    buttonPaddingTop = <%% 48, 48, 48, 48, 3 %%>;

    mobileCalendarHeight = 64;

    initWordings = [
      (desktop ? `안녕하세요, ${this.client.name} 고객님! 전화 상담을 위한 <b%예약 페이지%b>입니다.` : `안녕하세요, ${this.client.name} 고객님.`),
      (desktop ? `<b%상담을 원하시는 날짜와 시간대를 선택%b>해주시면, 해당 시간에 상담을 위한 통화를 진행해드리도록 하겠습니다 :)` : `<b%상담을 원하시는 날짜와 시간대%b>를 선택해주세요!`),
    ];

    titleAreaHeight = quoteTop + quoteHeight + quoteMarginBottom + initWordingSize + initWordingLineHeight + initWordingHeight + middleMargin;

    whiteBlock = createNode({
      mother: baseTong,
      style: {
        position: "relative",
        borderRadius: String(desktop ? 8 : 1) + ea,
        width: String(100) + '%',
        height: String(blockHeight + (desktop ? 0 : mobileCalendarHeight) - (margin * 2)) + ea,
        background: colorChip.white,
        paddingTop: String(margin + (desktop ? 0 : 1.7)) + ea,
        paddingBottom: String(margin + (desktop ? 0 : 1.3)) + ea,
        marginBottom: String(bottomMargin) + ea,
        boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      },
      children: [
        {
          display: "block",
          position: "relative",
          width: withOut(margin * 2, ea),
          height: String(100) + '%',
          marginLeft: String(margin) + ea,
        }
      ]
    });

    whiteTong = whiteBlock.firstChild;

    [ initWordingBox, calendarBox ] = createNodes([
      {
        mother: whiteTong,
        style :{
          position: "relative",
          width: String(100) + '%',
          height: String(titleAreaHeight) + ea,
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(400),
        },
        children: [
          {
            mode: "svg",
            source: this.mother.returnQuotes(colorChip.green),
            style: {
              position: "absolute",
              top: String(quoteTop) + ea,
              left: desktop ? String(quoteLeft) + ea : "calc(50% - 1.3vw)",
              height: String(quoteHeight) + ea,
            }
          },
          {
            text: initWordings[0],
            style: {
              position: "absolute",
              top: String(quoteTop + quoteHeight + quoteMarginBottom) + ea,
              left: String(0) + ea,
              width: String(100) + '%',
              height: String(initWordingHeight) + ea,
              fontSize: String(initWordingSize) + ea,
              fontWeight: String(300),
              textAlign: desktop ? "left" : "center",
              color: colorChip.black
            },
            bold: {
              fontWeight: String(500),
              color: colorChip.black
            }
          },
          {
            text: initWordings[1],
            style: {
              position: "absolute",
              top: String(quoteTop + quoteHeight + quoteMarginBottom + initWordingSize + initWordingLineHeight) + ea,
              left: String(0) + ea,
              width: String(100) + '%',
              height: String(initWordingHeight) + ea,
              fontSize: String(initWordingSize) + ea,
              fontWeight: String(300),
              textAlign: desktop ? "left" : "center",
              color: colorChip.black
            },
            bold: {
              fontWeight: String(500),
              color: colorChip.black
            }
          }
        ]
      },
      {
        mother: whiteTong,
        style: {
          position: "relative",
          width: String(100) + '%',
          height: withOut(titleAreaHeight, ea),
        },
        children: [
          {
            style: {
              display: desktop ? "inline-block" : "block",
              height: desktop ? String(100) + '%' : String(mobileCalendarHeight) + ea,
              width: desktop ? String(calendarWidth) + ea : String(100) + '%',
              verticalAlign: "top",
            }
          },
          {
            style: {
              display: desktop ? "inline-block" : "block",
              paddingTop: String(buttonPaddingTop) + ea,
              paddingLeft: String(desktop ? buttonMargin : 0) + ea,
              width: desktop ? withOut(calendarWidth + buttonMargin, ea) : String(100) + '%',
              height: desktop ? withOut(buttonPaddingTop, ea) : withOut(buttonPaddingTop + mobileCalendarHeight, ea)
            }
          }
        ]
      }
    ]);

    buttonMaker = function (dateObject, standard, matrix, clientSide) {
      const now = new Date();
      let buttons;
      let button, tempHeight, percentage, division, deactive;
      let from, to;
      let times;
      let year, month, date;
      let length;

      percentage = 0.41;
      division = desktop ? 3.5 : 5;
      year = dateObject.getFullYear();
      month = dateObject.getMonth() + 1;
      date = dateObject.getDate();
      length = standard.length - clientSide.filter((i) => { return i !== 1; }).length;

      cleanChildren(calendarBox.lastChild);

      buttons = [];
      for (let i = 0; i < standard.length; i++) {
        times = standard[i].split('~').map((s) => { return s.trim().split(':').map((z) => { return Number(z.replace(/^0/, '')); }); });
        times = times.map((arr) => { return new Date(year, month - 1, date, arr[0], arr[1]) });
        [ from, to ] = times;
        deactive = (matrix[i].name !== "미정" || now.valueOf() > from.valueOf() - (1000 * 60 * 60));
        button = createNode({
          mother: calendarBox.lastChild,
          class: [ "hoverDefault_lite" ],
          attribute: [
            { year: String(year) },
            { month: String(month) },
            { date: String(date) },
            { from: dateToString(from, true) },
            { to: dateToString(to, true) },
            { index: String(i) },
            { deactive: deactive ? "true" : "false" },
          ],
          events: [
            {
              type: "click",
              event: function (e) {
                const { ajaxJson } = GeneralJs;
                const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)); }
                const from = stringToDate(this.getAttribute("from"));
                const to = stringToDate(this.getAttribute("to"));
                const index = Number(this.getAttribute("index"));
                const deactive = (this.getAttribute("deactive") === "true");
                const year = Number(this.getAttribute("year"));
                const month = Number(this.getAttribute("month"));
                const date = Number(this.getAttribute("date"));
                let confirm;

                if (deactive) {
                  window.alert("예약할 수 없는 시간입니다!");
                } else {

                  ajaxJson({ method: "get", date: from }, "/realtimeClient").then((obj) => {
                    const { standard, matrix } = obj;
                    const cancelPromise = new Promise(function (resolve, reject) {
                      resolve(JSON.stringify({ message: "cancel" }));
                    });
                    if (matrix[index].name !== "미정") {
                      window.alert("예약할 수 없는 시간입니다!");
                      window.location.reload();
                      return cancelPromise;
                    } else {
                      confirm = window.confirm(`${String(month)}월 ${String(date)}일 ${zeroAddition(from.getHours())}:${zeroAddition(from.getMinutes())} ~ ${zeroAddition(to.getHours())}:${zeroAddition(to.getMinutes())}에 예약을 진행하시겠습니까?`);
                      if (confirm) {
                        return ajaxJson({ method: "update", date: from, update: { cliid: instance.client.cliid, index, name: instance.client.name } }, "/realtimeClient");
                      } else {
                        return cancelPromise;
                      }
                    }
                  }).then((obj) => {
                    const { message } = obj;
                    if (message === "done") {
                      window.alert("성공적으로 예약되었습니다!");
                      window.location.reload();
                    }
                  }).catch((err) => {
                    console.log(err);
                  });

                }
              }
            }
          ],
          style: {
            display: (clientSide[i] === 1 ? (desktop ? "block" : "inline-block") : "none"),
            position: "relative",
            borderRadius: String(5) + "px",
            width: desktop ? (String(100) + '%') : ("calc(calc(100% - " + String(buttonBetween) + ea + ") / 2)"),
            height: "calc(calc(100% - " + String(buttonBetween * (desktop ? (length - 1) : ((length / 2) - 1))) + ea + ") / " + String(desktop ? length : (length / 2)) + ")",
            background: colorChip[deactive ? "gray0" : "green"],
            marginBottom: String(buttonBetween) + ea,
            marginRight: desktop ? "" : (i % 2 === 0 ? String(buttonBetween) + ea : ""),
          },
        });
        tempHeight = button.getBoundingClientRect().height;
        createNode({
          mother: button,
          text: standard[i],
          style: {
            position: "absolute",
            fontSize: String(tempHeight * percentage) + "px",
            fontWeight: String(300),
            color: colorChip[deactive ? "deactive" : "white"],
            width: String(100) + '%',
            textAlign: "center",
            top: String(tempHeight * ((1 - percentage) / division)) + "px",
            fontFamily: "graphik",
          }
        });
        buttons.push(button);
      }

      ajaxJson({ method: "list" }, "/realtimeClient").then((list) => {
        const emptyProm = new Promise(function (resolve, reject) {
          resolve({
            standard: [],
            caution: [],
            matrix: [],
          });
        });
        let thisListKey;
        let thisListYear, thisListMonth, thisListDate;
        if (list[instance.client.cliid] !== undefined) {
          thisListKey = list[instance.client.cliid];
          thisListYear = Number(String(thisListKey).slice(0, 4));
          thisListMonth = Number(String(thisListKey).slice(4, 6));
          thisListDate = Number(String(thisListKey).slice(6));
          if (thisListYear === year && thisListMonth === month && thisListDate === date) {
            return ajaxJson({ method: "get", date: stringToDate(`${String(thisListKey).slice(0, 4)}-${String(thisListKey).slice(4, 6)}-${String(thisListKey).slice(6)}`) }, "/realtimeClient");
          } else {
            return emptyProm;
          }
        } else {
          return emptyProm;
        }
      }).then((obj) => {
        const { standard, caution, matrix } = obj;
        let index = null;
        let cliidArr;
        if (matrix.length !== 0) {
          cliidArr = JSON.parse(JSON.stringify(matrix)).map((obj) => { return obj.cliid; });
          index = caution.findIndex((id) => { return id === instance.client.cliid });
          if (index === -1) {
            index = cliidArr.findIndex((id) => { return id === instance.client.cliid });
          }
          if (index !== -1) {
            buttons[index].style.background = colorChip.yellow;
            buttons[index].firstChild.style.color = colorChip.white;
          }
        }
      }).catch((err) => {
        console.log(err);
      });

    }

    buttonValues = await ajaxJson({ method: "get", date: new Date() }, "/realtimeClient");
    buttonMaker(new Date(), buttonValues.standard, buttonValues.matrix, buttonValues.clientSide);

    calendar = this.mother.makeCalendar(new Date(), function (e) {
      const mother = this.parentElement.parentElement;
      const thisDate = stringToDate(this.getAttribute("buttonValue"));
      let childrenDoms;

      childrenDoms = Array.from(mother.children);
      childrenDoms.shift();
      childrenDoms = childrenDoms.map((dom) => {
        return Array.from(dom.children);
      });
      childrenDoms = childrenDoms.flat();
      childrenDoms = childrenDoms.filter((dom) => {
        return dom.hasAttribute("date");
      });

      for (let dom of childrenDoms) {
        if (dom === this) {
          dom.style.background = GeneralJs.colorChip.green;
          dom.firstChild.style.color = GeneralJs.colorChip.white;
        } else {
          if (dom.getAttribute("deactive") === "true") {
            dom.style.background = GeneralJs.colorChip.gray0;
            dom.firstChild.style.color = GeneralJs.colorChip.deactive;
          } else {
            dom.style.background = GeneralJs.colorChip.white;
            dom.firstChild.style.color = dom.getAttribute("color");
          }
        }
      }

      ajaxJson({ method: "get", date: thisDate }, "/realtimeClient").then((obj) => {
        const { standard, matrix, clientSide } = obj;
        buttonMaker(thisDate, standard, matrix, clientSide);
      }).catch((err) => {
        console.log(err);
      });

    }, {
      bigMode: true,
      mobile: mobile,
      width: desktop ? String(calendarWidth) + ea : String(100) + "%",
      height: desktop ? String(100) + '%' : String(mobileCalendarHeight) + ea,
      events: [],
      grayMode: async function (year, month) {
        try {
          const boos = await GeneralJs.ajaxJson({ method: "range", year, month }, "/realtimeClient");
          return boos;
        } catch (e) {
          console.log(e);
        }
      }
    });
    calendarBox.firstChild.appendChild(calendar.calendarBase);

  } catch (e) {
    console.log(e);
  }
}

ResponseReservationJs.prototype.insertPannelBox = function () {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, isMac } = GeneralJs;
  let topMargin, leftMargin;
  let blockHeight, blockMarginBottom;
  let whiteBlock;
  let buttonHeight, buttonWidth;
  let buttonMargin;
  let buttonTextTop, buttonTextSize;
  let wordSpacing;
  let finalBottom;
  let targetWords;
  let matrix;
  let temp;
  let past;
  let style;
  let wordsTable;
  let num;
  let div_clone, div_clone2;
  let marginBottom;
  let wordSize;
  let box0Size, box1Size, box0Margin, box1Margin;
  let target;
  let logoVisual, logoHeight;

  targetWords = [
    {
      mother: "상담 안내",
      children: [
        "상담 가능 시간은 평일 오전 11시부터 오후 6시 30분까지입니다.",
        "점심 시간은 12시부터 13시 30분으로, 해당 시간에 응대가 어려울 수 있습니다.",
        "짧게는 5분, 평균 10분, 길게는 30분 이하로 진행됩니다.",
        "본 응대는 디자이너 추천을 위한 응대로, 구체적인 견적과 디자인 사항이 나오기 전 서비스 설명과 프로세스 소개를 위한 응대입니다.",
        "구체적인 디자인 제안 및 견적 사항은 디자이너 선택을 하신 후, 응대받으실 수 있습니다."
      ]
    },
  ];

  matrix = [];
  num = 1;
  past = "";
  for (let i = 0; i < targetWords.length; i++) {
    for (let j = 0; j < targetWords[i].children.length; j++) {
      temp = new Array(3);
      if (past !== String(targetWords[i].mother)) {
        temp[0] = String(targetWords[i].mother);
      } else {
        temp[0] = "";
      }
      temp[1] = String(num);
      temp[2] = targetWords[i].children[j];
      matrix.push(temp);
      past = String(targetWords[i].mother);
      num++;
    }
  }

  topMargin = <%% 48, 48, 48, 32, 5.3 %%>;
  leftMargin = <%% 52, 52, 44, 36, 52 %%>;

  blockHeight = <%% 820, 820, 820, 820, 820 %%>;
  blockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  buttonHeight = <%% 47, 48, 48, 40, 8.4 %%>;
  buttonWidth = <%% 92, 92, 92, 74, 17 %%>;
  buttonMargin = <%% 8, 8, 8, 5, 2 %%>;

  buttonTextTop = <%% 9, 9, 9, 9, 1.2 %%>;
  buttonTextSize = <%% 20, 20, 20, 16, 3.8 %%>;

  if (desktop) {
    buttonTextTop = buttonTextTop + (GeneralJs.isMac() ? 0 : 2);
  }

  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  finalBottom = <%% 50, 50, 50, 30, 5 %%>;

  marginBottom = <%% 3, 3, 3, 3, 1.8 %%>;
  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  wordSize = <%% 15, 15, 15, 13, 2.8 %%>;

  box0Size = <%% 140, 140, 130, 120, 4.5 %%>;
  box1Size = <%% 25, 25, 25, 25, 3 %%>;
  box0Margin = <%% 55, 55, 55, 55, 3 %%>;
  box1Margin = <%% 18, 18, 18, 18, 3 %%>;

  logoVisual = <%% 4, 4, 4, 4, 4 %%>;
  logoHeight = <%% 16, 16, 16, 16, 16 %%>;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      paddingTop: String(topMargin) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
      paddingBottom: String(finalBottom) + ea
    }
  });

  wordsTable = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    marginLeft: String(desktop ? leftMargin : 0) + ea,
    width: desktop ? "calc(100% - " + String(leftMargin * 2) + ea + ")" : String(100) + '%',
  };
  for (let i in style) {
    wordsTable.style[i] = style[i];
  }

  num = 0;
  for (let arr of matrix) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      marginBottom: String(marginBottom) + ea,
    };
    for (let j in style) {
      div_clone.style[j] = style[j];
    }
    if (desktop) {
      if (num !== matrix.length - 1) {
        if (matrix[num + 1][0] !== '' && matrix[num][0] === '') {
          div_clone.style.marginBottom = String(marginBottom * 6) + ea;
        }
      }
    }

    for (let z = 0; z < arr.length; z++) {
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        display: "inline-block",
        fontSize: String(wordSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
        position: "relative",
        top: String(isMac() ? 0 : 2) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
      };
      if (z === 0) {
        style.width = String(box0Size) + ea;
        style.marginRight = String(box0Margin) + ea;
        style.fontWeight = String(600);
        style.textAlign = "left";
      } else if (z === 1) {
        style.width = String(box1Size) + ea;
        style.marginRight = String(box1Margin) + ea;
        style.fontWeight = String(600);
        style.color = GeneralJs.colorChip.green;
        style.textAlign = "right";
      } else {
        style.width = "calc(100% - " + String(box0Size + box1Size + box0Margin + box1Margin) + ea + ")";
        style.fontWeight = String(300);
        style.textAlign = "left";
      }
      if (mobile) {
        style = {
          display: "inline-block",
          fontSize: String(wordSize) + ea,
          wordSpacing: String(wordSpacing) + "px",
          position: "relative",
          top: String(0) + ea,
          verticalAlign: "top",
          lineHeight: String(1.6),
          left: String((this.subBoxMargin.left + 0.2)) + ea,
          width: GeneralJs.withOut((this.subBoxMargin.left + 0.2) * 2, ea),
        };
        if (z === 0) {
          continue;
        }
        if (z === 1) {
          style.width = String(box0Size) + ea;
          style.color = GeneralJs.colorChip.green;
        }
        if (z === 2) {
          style.width = GeneralJs.withOut(((this.subBoxMargin.left + 0.2) * 2) + box0Size, ea);
          style.left = String(box0Size) + ea;
        }
      }
      for (let j in style) {
        div_clone2.style[j] = style[j];
      }
      if (/\<b\%/gi.test(arr[z])) {
        arr[z] = arr[z].replace(/\<b\%/gi, "<b style=\"color:" + GeneralJs.colorChip.green + "\">");
        arr[z] = arr[z].replace(/\%b\>/gi, "</b>");
      }
      div_clone2.insertAdjacentHTML("beforeend", arr[z]);
      div_clone.appendChild(div_clone2);
    }

    wordsTable.appendChild(div_clone);

    num++;
  }

  whiteBlock.appendChild(wordsTable);

  if (media[0] || media[1] || media[2]) {
    createNode({
      mother: whiteBlock,
      mode: "svg",
      source: this.mother.returnLogo(colorChip.green, 4),
      style: {
        position: "absolute",
        bottom: String(finalBottom + logoVisual) + ea,
        right: String(leftMargin) + ea,
        height: String(logoHeight) + ea,
      }
    });
  }

}

ResponseReservationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let proid, cliid;
    let projects, project;
    let clients, client;
    let designers, designer;
    let whereQuery;
    let belowTarget, removeTargets;

    if (getObj.cliid === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    clients = await ajaxJson({ noFlat: true, whereQuery: { cliid: getObj.cliid } }, "/getClients");
    if (clients.length === 0) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    client = clients[0];
    this.client = client;

    await this.mother.ghostClientLaunching({
      base: {
        instance: this,
        binaryPath: ResponseReservationJs.binaryPath,
        subTitle: (this.client.name + " 고객님 응대 예약 페이지"),
      },
      local: async () => {
        try {
          await instance.insertInitBox();
          instance.insertPannelBox();
        } catch (e) {
          console.log(e);
        }
      }
    });

    //loading end
    await GeneralJs.sleep(500);
    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
