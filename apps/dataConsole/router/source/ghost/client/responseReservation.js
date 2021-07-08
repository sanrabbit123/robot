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
      "return (thisPerson.name + ' 고객님 응대 예약 페이지 | 홈리에종');"
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

ResponseReservationJs.binaryPath = "/middle/proposal";

ResponseReservationJs.prototype.insertInitBox = function () {
  const instance = this;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip } = GeneralJs;
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

  blockHeight = <%% this.backHeight, this.backHeight, this.backHeight, this.backHeight, this.backHeight %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;

  initWordingHeight = <%% 20, 20, 20, 20, 20 %%>;
  initWordingSize = <%% 15.5, 15.5, 15.5, 13.5, 15.5 %%>;
  initWordingLineHeight = <%% 9, 9, 9, 9, 9 %%>;

  middleMargin = <%% 25, 25, 25, 25, 25 %%>;

  quoteTop = 0;
  quoteHeight = <%% 12, 12, 12, 9, 2.5 %%>;
  quoteMarginBottom = <%% 7, 7, 7, 6, 7 %%>;
  quoteLeft = <%% 2, 2, 2, 2, 1.6 %%>;

  calendarWidth = <%% 1000, 800, 600, 600, 520 %%>;

  buttonMargin = <%% 20, 20, 20, 20, 20 %%>;
  buttonBetween = <%% 5, 5, 5, 5, 5 %%>;
  buttonSize = <%% 19, 19, 19, 19, 19 %%>;
  buttonTop = <%% 7, 7, 7, 7, 7 %%>;
  buttonPaddingTop = <%% 48, 48, 48, 48, 48 %%>;

  buttonValues = [
    "11:00  ~  11:30",
    "11:30  ~  12:00",
    "13:30  ~  14:00",
    "14:00  ~  14:30",
    "14:30  ~  15:00",
    "15:00  ~  15:30",
    "15:30  ~  16:00",
    "16:00  ~  16:30",
    "16:30  ~  17:00",
    "17:00  ~  17:30",
    "17:30  ~  18:00",
    "18:00  ~  18:30",
  ];

  titleAreaHeight = quoteTop + quoteHeight + quoteMarginBottom + initWordingSize + initWordingLineHeight + initWordingHeight + middleMargin;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: String(blockHeight - (margin * 2)) + ea,
      background: colorChip.white,
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
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
            left: String(quoteLeft) + ea,
            height: String(quoteHeight) + ea,
          }
        },
        {
          text: `안녕하세요, ${this.client.name} 고객님! 1차 응대 전화 상담을 위한 예약 페이지입니다.`,
          style: {
            position: "absolute",
            top: String(quoteTop + quoteHeight + quoteMarginBottom) + ea,
            left: String(0) + ea,
            width: String(100) + '%',
            height: String(initWordingHeight) + ea,
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(400),
          }
        },
        {
          text: `상담을 원하시는 날짜와 시간대를 선택해주시면, 해당 시간에 상담을 위한 통화를 진행해드리도록 하겠습니다 :)`,
          style: {
            position: "absolute",
            top: String(quoteTop + quoteHeight + quoteMarginBottom + initWordingSize + initWordingLineHeight) + ea,
            left: String(0) + ea,
            width: String(100) + '%',
            height: String(initWordingHeight) + ea,
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(400),
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
            display: "inline-block",
            height: String(100) + '%',
            width: String(calendarWidth) + ea,
            verticalAlign: "top",
          }
        },
        {
          style: {
            display: "inline-block",
            paddingTop: String(buttonPaddingTop) + ea,
            paddingLeft: String(buttonMargin) + ea,
            width: withOut(calendarWidth + buttonMargin, ea),
            height: withOut(buttonPaddingTop, ea)
          }
        }
      ]
    }
  ]);

  for (let i = 0; i < buttonValues.length; i++) {
    createNode({
      mother: calendarBox.lastChild,
      style: {
        position: "relative",
        borderRadius: String(5) + "px",
        width: String(100) + '%',
        height: "calc(calc(100% - " + String(buttonBetween * (buttonValues.length - 1)) + ea + ") / " + String(buttonValues.length) + ")",
        background: colorChip.white,
        marginBottom: String(buttonBetween) + ea,
        border: "1px solid " + colorChip.gray3,
        boxSizing: "border-box",
      },
      children: [
        {
          text: buttonValues[i],
          style: {
            position: "absolute",
            fontSize: String(buttonSize) + ea,
            fontWeight: String(200),
            color: colorChip.black,
            width: String(100) + '%',
            textAlign: "center",
            top: String(buttonTop) + ea,
            fontFamily: "graphik",
          }
        }
      ]
    });
  }

  calendar = this.mother.makeCalendar(new Date(), function (e) {
    console.log(this.getAttribute("buttonValue"));
  }, {
    bigMode: true,
    width: String(calendarWidth) + ea,
    height: String(100) + '%',
    events: [],
  });
  calendarBox.firstChild.appendChild(calendar.calendarBase);

}

ResponseReservationJs.prototype.insertPannelBox = function () {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip } = GeneralJs;
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

  targetWords = [
    {
      mother: "커뮤니케이션 & 컨설팅",
      children: [
        "디자이너와 카톡(문자) / 전화 / 메일 등의 채널을 통해 커뮤니케이션합니다. 적극적으로 참여해주실 때 더 좋은 결과물을 얻으실 수 있습니다.",
        "집 상태, 기간, 예산, 취향, 생활 방식 등을 고려하여 진행해드립니다."
      ]
    },
    {
      mother: "스타일링 범주",
      children: [
        "기존에 사용하시는 가구들 중 가져갈 가구와 버릴 가구 선택 및 활용 방안을 제안드립니다.",
        "새로 구매하실 가구, 조명, 패브릭(커튼, 베딩, 러그, 쿠션), 소품(식물, 액자, 시계 등)을 제안해드립니다.",
        "디자이너의 제안에 따라 패브릭 및 가구의 맞춤 제작이 가능합니다.",
        "가전은 스타일링 제안 범위에 포함되지 않습니다. 다만 디자인 옵션(컬러 등) 등에 대해서 의논할 수 있습니다.",
        "생활 용품과 식기의 경우는 제안하지 않습니다.",
        "거주 중인 경우 가구 이동, 수리, 폐기 등은 디자이너가 하지 않습니다.",
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

  topMargin = <%% 52 + 6, 52 + 6, 44 + 6, 32 + 6, 52 %%>;
  leftMargin = <%% 52, 52, 44, 32, 52 %%>;

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
  finalBottom = <%% 42, 42, 42, 20, 5 %%>;

  marginBottom = <%% 3, 3, 3, 3, 1.8 %%>;
  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  wordSize = <%% 15, 15, 15, 13, 2.8 %%>;

  box0Size = <%% 140, 140, 140, 120, 4.5 %%>;
  box1Size = <%% 25, 25, 25, 25, 3 %%>;
  box0Margin = <%% 55, 55, 55, 55, 3 %%>;
  box1Margin = <%% 18, 18, 18, 18, 3 %%>;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      paddingTop: String(desktop ? topMargin : 5.8) + ea,
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
        top: String(0) + ea,
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

    clients = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getClients");
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
          instance.insertInitBox();
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
