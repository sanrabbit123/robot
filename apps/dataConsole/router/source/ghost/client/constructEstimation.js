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
      "return ('시공 견적 안내 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('시공 견적서 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "constructEstimation",
  "route": [
    "cestimation",
    "CE"
  ]
} %/%/g

const ConstructEstimationJs = function () {
  this.mother = new GeneralJs();
  this.client = null;
}

ConstructEstimationJs.binaryPath = "/middle/cestimation";

ConstructEstimationJs.prototype.estimationWordings = function () {
  const instance = this;
  const { client, designer, project, media } = this;
  const { dateToString, autoComma } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  const { analytics, request } = client.requests[0];
  let start, end;
  let wordings;
  let tempArr;
  let sum0, sum1;
  let between;

  end = project.process.contract.form.date.to;
  start = project.process.contract.form.date.from;

  wordings = {
    mainTitle: [
      client.name + " 고객님",
      "<b%예상 시공 견적서%b>",
    ],
    subTitle: [
      "<b%현장명%b> : " + request.space.address,
      "<b%예상 기간%b> : " + dateToString(start) + " ~ " + dateToString(end),
    ],
    column: [],
    sum: {},
    commentsTitle: "<b%*%b> 안내 사항",
    comments: [],
  };
  if (desktop) {
    wordings.column = [
      "품명",
      "단가",
      "수량",
      "단위",
      "소비자가",
      "비고"
    ];
  } else {
    wordings.column = [
      "품명",
      "수량",
      "소비자가",
    ];
  }

  return wordings;
}

ConstructEstimationJs.prototype.insertInitBox = function () {
  const instance = this;
  const { client, designer, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, isMac } = GeneralJs;
  const wordings = this.estimationWordings();
  let whiteBlock, whiteTong;
  let blockHeight;
  let margin;
  let blockMarginBottom;
  let titleBox;
  let titleFontSize, titleFontWeight, titleFontBottom;
  let titlePadding, titlePaddingMargin;
  let initWordingSize, initWordingWeight;
  let titleBarTopVisual, titleBarBottomVisual;
  let subTitleBoxTop;
  let table;
  let tableMarginTop;
  let items, itemsRatio, itemsLength, itemsLengthConverted, itemsLengthSum;
  let item;
  let tempArr;
  let itemBar;
  let itemBarLeft;
  let itemBarTop, itemBarBottom;
  let tablePaddingTop;
  let tablePaddingBottom;
  let barPaddingBottom;
  let barMarginBottom;
  let sumBox;
  let sumBoxPaddingTop, sumBoxPaddingBottom;
  let sumBoxBarTop;
  let sumBoxMainFontSize, sumBoxMainFontWeight, sumBoxMainPaddingLeft;
  let sumBoxVatFontSize, sumBoxVatFontWeight, sumBoxVatPaddingLeft;
  let grayMarginTop0, grayMarginTop1;
  let cautionBox;
  let cautionTitleBox, cautionContentsBox;
  let cautionPaddingTop;
  let cautionPaddingBottom;
  let cautionPaddingLeft;
  let cautionPaddingRight;
  let cautionFirstBoxWidth;
  let cautionWordsMarginBottom;
  let cautionLogoBottom, cautionLogoHeight;
  let grayTong;
  let grayHeight, grayTop, grayTextTop, grayTextLeft, grayTextSize, grayButtonHeight;
  let grayTextTong;
  let grayTongMarginBottom;
  let buttonOff, buttonOn, buttonTong;
  let buttonTongHeight;
  let greenButton;
  let greenButtonBase;
  let greenButtonWidth, greenButtonHeight;
  let greenButtonFontSize;
  let greenButtonTextTop;
  let greenBasePaddingTop, greenBasePaddingBottom;
  let completeMarginTop0;
  let paymentEvent;
  let titleBoxPaddingTop;
  let greenButtonBetween;

  blockHeight = <%% 444, 424, 390, 335, 424 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  blockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  titleFontSize = <%% 30, 30, 28, 23, 5.7 %%>;
  titleFontWeight = <%% 300, 300, 300, 300, 300 %%>;
  titleFontBottom = <%% 2, 2, 2, 2, 0.2 %%>;
  titlePadding = <%% 6, 6, 6, 5, 12 %%>;
  titlePaddingMargin = <%% 18, 18, 18, 16, 18 %%>;
  titleBoxPaddingTop = <%% 2, 2, 2, 2, 2 %%>;

  titleBarTopVisual = <%% (isMac() ? 10 : 6), (isMac() ? 10 : 6), (isMac() ? 10 : 6), (isMac() ? 7 : 5), 17.5 %%>;
  titleBarBottomVisual = <%% (isMac() ? 6 : 10), (isMac() ? 6 : 10), (isMac() ? 6 : 10), (isMac() ? 6 : 8), 6 %%>;

  initWordingSize = <%% 14.5, 14, 14, 13, 3 %%>;
  initWordingWeight = <%% 300, 300, 300, 300, 300 %%>;

  subTitleBoxTop = <%% 35, 35, 31, 20, 35 %%>;

  itemBarLeft = <%% 28, 28, 28, 28, 2 %%>;
  itemBarTop = <%% 10, 10, 10, 10, 1 %%>;
  itemBarBottom = <%% 16, 16, 16, 16, 2 %%>;

  tableMarginTop = <%% 32, 32, 26, 22, 8.5 %%>;
  tablePaddingTop = <%% 13, 13, 13, 13, 2.5 %%>;
  tablePaddingBottom = <%% (isMac() ? 18 : 15), (isMac() ? 18 : 15), (isMac() ? 18 : 15), (isMac() ? 18 : 15), 3 %%>;
  barPaddingBottom = <%% 5, 5, 5, 5, 2 %%>;
  barMarginBottom = <%% 14, 14, 14, 14, 2.5 %%>;

  sumBoxBarTop = <%% (isMac() ? 19 : 16), (isMac() ? 19 : 16), (isMac() ? 18 : 15), (isMac() ? 18 : 15), 3.5 %%>;
  sumBoxMainFontSize = <%% 29, 29, 28, 27, 5.5 %%>;
  sumBoxMainFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  sumBoxMainPaddingLeft = <%% 19, 19, 19, 19, 3 %%>;
  sumBoxVatFontSize = <%% 18, 18, 17, 16, 3 %%>;
  sumBoxVatFontWeight = <%% 300, 300, 300, 300, 300 %%>;
  sumBoxVatPaddingLeft = <%% 10, 10, 10, 10, 2 %%>;

  sumBoxPaddingTop = <%% 15, 15, 14, 13, 2.5 %%>;
  sumBoxPaddingBottom = <%% 10, 10, 10, 10, 5 %%>;

  completeMarginTop0 = <%% 32, 32, 24, 20, 3 %%>;
  grayMarginTop0 = <%% 60, 60, 50, 40, 4 %%>;
  grayMarginTop1 = <%% 20, 20, 14, 12, 2 %%>;

  cautionPaddingTop = <%% 34, 34, 34, 27, 4 %%>;
  cautionPaddingBottom = <%% (isMac() ? 29 : 25), (isMac() ? 29 : 25), (isMac() ? 29 : 25), (isMac() ? 24 : 22), 4 %%>;
  cautionPaddingLeft = <%% 40, 40, 40, 32, 4.5 %%>;
  cautionPaddingRight = <%% 40, 40, 40, 32, 4.5 %%>;
  cautionFirstBoxWidth = <%% 180, 180, 150, 110, 20 %%>;
  cautionWordsMarginBottom = <%% 8, 8, 8, 8, 1.5 %%>;

  cautionLogoBottom = <%% 12, 12, 12, 12, 12 %%>;
  cautionLogoHeight = <%% 16, 16, 16, 16, 16 %%>;

  grayHeight = <%% 180, 180, 180, 180, 42 %%>;
  grayTop = <%% 5, 5, 5, 5, 0 %%>;
  grayTextTop = <%% 22, 22, 20, 20, 3.5 %%>;
  grayTextLeft = <%% 22, 22, 20, 20, 4 %%>;
  grayTextSize = <%% 12, 12, 10, 10, 2 %%>;
  grayButtonHeight = <%% 13, 13, 12, 11, 2.5 %%>;
  grayTongMarginBottom = <%% 15, 15, 15, 15, 2.5 %%>;

  buttonTongHeight = <%% 30, 30, 30, 30, 5 %%>;


  // items = JSON.parse(JSON.stringify(wordings.items));
  // items = [ JSON.parse(JSON.stringify(wordings.column)) ].concat(items);

  items = [ JSON.parse(JSON.stringify(wordings.column)) ];
  itemsLength = items.map((arr) => { return arr.map((a) => {
    return a.replace(/[ \n\.\_]/gi, '').replace(/[0-9]/gi, '').length + (a.replace(/[^0-9]/gi, '').length * 0.5);
  }) });
  itemsLengthConverted = [];
  for (let i = 0; i < wordings.column.length; i++) {
    tempArr = [];
    for (let arr of itemsLength) {
      tempArr.push(arr[i]);
    }
    itemsLengthConverted.push(tempArr);
  }
  itemsLengthConverted.forEach((arr) => {
    arr.sort((a, b) => { return b - a; });
  });
  itemsLengthConverted = itemsLengthConverted.map((arr) => {
    return arr[0] === undefined ? 0 : arr[0];
  });
  itemsLengthSum = 0;
  for (let num of itemsLengthConverted) {
    itemsLengthSum += num;
  }
  itemsRatio = itemsLengthConverted.map((num) => { return itemsLengthSum === 0 ? 0 : (num / itemsLengthSum) });
  itemsRatio = itemsRatio.map((num) => { return String(Math.floor(num * 10000) / 100) + '%'; });


  // dev
  tablePaddingBottom = tablePaddingBottom + 800;
  // dev

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: desktop ? String(blockHeight - (margin * 2)) + ea : "auto",
      background: colorChip.white,
      paddingTop: String(desktop ? margin : 8.5) + ea,
      paddingBottom: String(desktop ? margin : 8) + ea,
      marginBottom: String(blockMarginBottom) + ea,
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

  titleBox = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: (isMac() ? "" : String(titleBoxPaddingTop) + ea),
    },
    children: [
      {
        text: wordings.mainTitle[0],
        style: {
          position: "relative",
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.black,
          marginBottom: String(titleFontBottom) + ea,
          paddingLeft: String(desktop ? titlePadding + titlePaddingMargin : 0) + ea,
          textAlign: mobile ? "center" : "",
          width: mobile ? String(100) + '%' : "",
        },
        bold: {
          fontWeight: String(600),
          color: colorChip.black,
        }
      },
      {
        text: wordings.mainTitle[1],
        style: {
          position: "relative",
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.black,
          paddingLeft: String(desktop ? titlePadding + titlePaddingMargin : 0) + ea,
          textAlign: mobile ? "center" : "",
          width: mobile ? String(100) + '%' : "",
        },
        bold: {
          fontWeight: String(600),
          color: colorChip.black,
        }
      },
      {
        style: {
          position: "absolute",
          left: desktop ? String(0) : withOut(50, titlePadding / 2, ea),
          width: String(titlePadding) + ea,
          borderRadius: String(3) + "px",
          height: desktop ? withOut(titleBarTopVisual + titleBarBottomVisual, ea) : String(0.8) + ea,
          background: colorChip.gradientGreen,
          top: String(titleBarTopVisual) + ea,
        }
      },
      {
        text: wordings.subTitle.join("\n"),
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          right: String(0),
          top: String(subTitleBoxTop) + ea,
          fontSize: String(initWordingSize) + ea,
          fontWeight: String(initWordingWeight) + ea,
          color: colorChip.black,
          lineHeight: String(1.6),
          textAlign: "right",
        },
        bold: {
          color: colorChip.black,
          fontWeight: String(600),
        }
      }
    ]
  });

  table = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(3) + "px",
      border: "1px solid " + colorChip.gray3,
      boxSizing: "border-box",
      paddingTop: String(tablePaddingTop) + ea,
      paddingBottom: String(tablePaddingBottom) + ea,
      marginTop: String(tableMarginTop) + ea,
    }
  });

  itemBar = createNode({
    mother: table,
    style: {
      display: "block",
      position: "relative",
      marginLeft: String(itemBarLeft) + ea,
      width: withOut(itemBarLeft * 2, ea),
      paddingBottom: String(barPaddingBottom) + ea,
      marginBottom: String(barMarginBottom) + ea,
      borderBottom: "1px solid " + colorChip.gray3
    }
  });
  for (let i = 0; i < itemsRatio.length; i++) {
    item = createNode({
      mother: itemBar,
      text: wordings.column[i],
      style: {
        display: "inline-block",
        width: itemsRatio[i],
        position: "relative",
        paddingTop: String(itemBarTop) + ea,
        paddingBottom: String(itemBarBottom) + ea,
        borderRadius: String(3) + "px",
        fontSize: String(initWordingSize) + ea,
        fontWeight: String(600),
        textAlign: "center",
      }
    });
  }




  cautionBox = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(5) + "px",
      paddingTop: String(cautionPaddingTop) + ea,
      paddingBottom: String(cautionPaddingBottom) + ea,
      paddingLeft: String(cautionPaddingLeft) + ea,
      paddingRight: String(cautionPaddingRight) + ea,
      width: withOut(cautionPaddingLeft + cautionPaddingRight, ea),
      marginTop: String(grayMarginTop0) + ea,
      background: colorChip.gray0,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          width: desktop ? String(cautionFirstBoxWidth) + ea : String(100) + '%',
          verticalAlign: "top",
          marginBottom: desktop ? "" : String(2) + ea,
        }
      },
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          width: desktop ? withOut(cautionFirstBoxWidth, ea) : String(100) + '%',
          verticalAlign: "top",
        }
      },
    ]
  });

  createNode({
    mother: cautionBox.firstChild,
    text: wordings.commentsTitle,
    style: {
      position: "relative",
      fontSize: String(initWordingSize + (desktop ? 0 : 0.3)) + ea,
      fontWeight: String(600),
      color: colorChip.black,
    },
    bold: {
      fontSize: String(initWordingSize + (desktop ? 0 : 0.3)) + ea,
      fontWeight: String(600),
      color: colorChip.green,
    }
  });

  for (let c of wordings.comments) {
    createNode({
      mother: cautionBox.lastChild,
      text: "<b%-%b>&nbsp;&nbsp;" + c,
      style: {
        position: "relative",
        fontSize: String(initWordingSize) + ea,
        fontWeight: String(initWordingWeight),
        color: colorChip.black,
        marginBottom: String(cautionWordsMarginBottom) + ea,
        lineHeight: desktop ? "" : String(1.5),
      },
      bold: {
        fontSize: String(initWordingSize) + ea,
        fontWeight: String(initWordingWeight),
        color: colorChip.gray5,
      },
      under: {
        fontSize: String(initWordingSize) + ea,
        fontWeight: String(600),
        color: colorChip.green,
      }
    });
  }

  if (media[0] || media[1] || media[2]) {
    createNode({
      mother: cautionBox.lastChild,
      mode: "svg",
      source: instance.mother.returnLogo(colorChip.shadow, 4),
      style: {
        position: "absolute",
        bottom: String(cautionLogoBottom) + ea,
        right: String(0) + ea,
        height: String(cautionLogoHeight) + ea,
      }
    });
  }

  whiteBlock.style.height = "auto";
}

ConstructEstimationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let designers, designer;
    let requestNumber;
    let service;

    if (getObj.proid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    proid = getObj.proid;
    projects = await ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true });
    if (projects.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ project ] = projects;
    if (!/^d/.test(project.desid)) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    this.project = project;

    clients = await ajaxJson({ noFlat: true, whereQuery: { cliid: project.cliid } }, "/getClients", { equal: true });
    if (clients.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ client ] = clients;
    this.client = client;

    requestNumber = 0;
    for (let i = 0; i < client.requests.length; i++) {
      if (client.requests[i].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
        requestNumber = i;
        break;
      }
    }
    this.requestNumber = requestNumber;

    designers = await ajaxJson({ noFlat: true, whereQuery: { desid: project.desid } }, "/getDesigners", { equal: true });
    if (designers.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ designer ] = designers;
    this.designer = designer;




    await this.mother.ghostClientLaunching({
      name: "constructEstimation",
      client: this.client,
      base: {
        instance: this,
        binaryPath: ConstructEstimationJs.binaryPath,
        subTitle: (this.client.name + " 고객님 시공 견적서"),
      },
      local: async () => {
        try {
          instance.insertInitBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ConstructEstimationJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (e) {
    await GeneralJs.ajaxJson({ message: "ConstructEstimationJs.launching : " + e.message }, "/errorLog");
  }
}
