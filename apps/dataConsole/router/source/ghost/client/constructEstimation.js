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
  "hangul": "시공 견적 안내",
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

ConstructEstimationJs.prototype.estimationWordings = function (requestIndex = 0) {
  const instance = this;
  const { client, designer, project, media, invoice } = this;
  const targetRequest = invoice.requests[requestIndex];
  const { items, comments, commission } = targetRequest;
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
    ratio: [],
    commentsTitle: "<b%*%b> 안내 사항",
    comments,
    items,
    itemDetail: () => {},
    itemPrice: (detail) => {
      return Math.floor(detail.unit.amount.consumer * detail.unit.number);
    },
    commission,
  };
  if (desktop) {
    wordings.column = [
      "순번",
      "품명",
      "단가",
      "수량",
      "단위",
      "공급가",
      "소비자가",
      "비고"
    ];
    wordings.ratio = [
      6,
      34,
      12,
      6,
      6,
      12,
      12,
      12
    ];
    wordings.itemDetail = (detail, index) => {
      return [
        String(index),
        detail.name,
        autoComma(detail.unit.amount.consumer) + '원',
        String(detail.unit.number),
        detail.unit.ea,
        autoComma(Math.floor(detail.unit.amount.supply * detail.unit.number)) + '원',
        autoComma(Math.floor(detail.unit.amount.consumer * detail.unit.number)) + '원',
        detail.description
      ];
    }
  } else {
    wordings.column = [
      "품명",
      "소비자가",
    ];
    wordings.ratio = [
      62,
      38,
    ];
    wordings.itemDetail = (detail) => {
      return [
        detail.name,
        autoComma(Math.floor(detail.unit.amount.consumer * detail.unit.number)) + '원',
      ];
    }
  }

  return wordings;
}

ConstructEstimationJs.prototype.insertInitBox = function (requestIndex = 0) {
  const instance = this;
  const { client, designer, ea, baseTong, media, invoice } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, isMac, autoComma } = GeneralJs;
  const wordings = this.estimationWordings(requestIndex);
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
  let itemsRatio;
  let itemDetailArr;
  let item;
  let tempArr;
  let itemBar;
  let itemBarLeft;
  let itemBarTop, itemBarBottom;
  let tablePaddingTop;
  let tablePaddingBottom;
  let barPaddingBottom;
  let barMarginBottom;
  let grayMarginTop0;
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
  let grayTextTong;
  let titleBoxPaddingTop;
  let tableMarginTopFirst;
  let sumNumberSize;
  let itemSumNumber;
  let sumWhitePaddingLeft;
  let itemTitleTop, itemTitleSize;
  let itemSumBottom;
  let itemSumLineTop;
  let sumBox;
  let totalSum;
  let whiteTongSecond;
  let firstWhitePaddingBottom;
  let firstBlockMarginBottom;
  let sumBoxHeight;
  let finalPaddingTopVisual, finalPaddingBottomVisual;
  let sumMiddleNumberSize;
  let itemTotalSumLineTop;
  let tableBackgroundMargin;
  let bottomVisualBackHeight;

  blockHeight = <%% 444, 424, 390, 335, 424 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  blockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;
  firstWhitePaddingBottom = <%% 115, 115, 80, 72, 14 %%>;
  firstBlockMarginBottom = <%% 12, 12, 12, 8, 2 %%>;
  tableBackgroundMargin = <%% 82, 82, 75, 65, 12 %%>;

  titleFontSize = <%% 30, 30, 28, 23, 5.7 %%>;
  titleFontWeight = <%% 300, 300, 300, 300, 300 %%>;
  titleFontBottom = <%% 2, 2, 2, 2, 0.2 %%>;
  titlePadding = <%% 6, 6, 6, 5, 12 %%>;
  titlePaddingMargin = <%% 18, 18, 18, 16, 18 %%>;
  titleBoxPaddingTop = <%% 2, 2, 2, 2, 2 %%>;

  titleBarTopVisual = <%% (isMac() ? 10 : 6), (isMac() ? 10 : 6), (isMac() ? 10 : 6), (isMac() ? 7 : 5), 17.5 %%>;
  titleBarBottomVisual = <%% (isMac() ? 6 : 10), (isMac() ? 6 : 10), (isMac() ? 6 : 10), (isMac() ? 6 : 8), 6 %%>;

  initWordingSize = <%% 14.5, 14, 14, 13, 3 %%>;
  initWordingWeight = <%% 400, 400, 400, 400, 400 %%>;

  subTitleBoxTop = <%% 35, 35, 31, 20, 35 %%>;

  itemBarLeft = <%% 28, 28, 28, 28, 2 %%>;
  itemBarTop = <%% 10, 10, 10, 10, 1 %%>;
  itemBarBottom = <%% (isMac() ? 11 : 8), (isMac() ? 11 : 8), (isMac() ? 11 : 8), (isMac() ? 11 : 8), 2 %%>;

  tableMarginTopFirst = <%% 92, 92, 90, 82, 14 %%>;
  tableMarginTop = <%% 150, 150, 150, 120, 25 %%>;
  tablePaddingTop = <%% 10, 10, 10, 10, 2.5 %%>;
  tablePaddingBottom = <%% (isMac() ? 85 : 82), (isMac() ? 85 : 82), (isMac() ? 85 : 82), (isMac() ? 85 : 82), 3 %%>;
  barPaddingBottom = <%% 9, 9, 9, 9, 1.5 %%>;
  barMarginBottom = <%% 13, 13, 13, 13, 2.5 %%>;

  grayMarginTop0 = <%% 60, 60, 50, 40, 7.5 %%>;

  cautionPaddingTop = <%% 34, 34, 34, 27, 4 %%>;
  cautionPaddingBottom = <%% (isMac() ? 29 : 25), (isMac() ? 29 : 25), (isMac() ? 29 : 25), (isMac() ? 24 : 22), 4 %%>;
  cautionPaddingLeft = <%% 40, 40, 40, 32, 4.5 %%>;
  cautionPaddingRight = <%% 40, 40, 40, 32, 4.5 %%>;
  cautionFirstBoxWidth = <%% 180, 180, 135, 100, 20 %%>;
  cautionWordsMarginBottom = <%% 8, 8, 8, 8, 1.5 %%>;

  cautionLogoBottom = <%% 12, 12, 12, 12, 12 %%>;
  cautionLogoHeight = <%% 16, 16, 16, 16, 16 %%>;

  sumMiddleNumberSize = <%% 21, 21, 21, 20, 4 %%>;
  sumNumberSize = <%% 31, 31, 29, 28, 6 %%>;
  sumWhitePaddingLeft = <%% 15, 15, 14, 13, 2 %%>;

  itemTitleTop = <%% -38, -38, -36, -33, -7 %%>;
  itemTitleSize = <%% 20, 20, 19, 18, 3.5 %%>;

  itemSumBottom = <%% (isMac() ? 27 : 25), (isMac() ? 27 : 25), (isMac() ? 27 : 25), (isMac() ? 26 : 24), -7.5 %%>;
  itemSumLineTop = <%% -11, -11, -10, -10, 4 %%>;
  itemTotalSumLineTop = <%% (isMac() ? 19 : 16), (isMac() ? 19 : 16), (isMac() ? 18 : 15), (isMac() ? 17 : 14), 4 %%>;

  sumBoxHeight = <%% 25, 25, 24, 23, 5 %%>;
  finalPaddingTopVisual = <%% 0, 7, 7, 7, 0 %%>;
  finalPaddingBottomVisual = <%% 11, 17, 24, 49, 0 %%>;

  bottomVisualBackHeight = <%% 50, 50, 40, 26, 2 %%>;

  itemsRatio = wordings.ratio.map((num) => { return String(num) + '%'; });
  items = wordings.items;
  items = items.filter((obj) => {
    return !obj.detail.every((i) => { return i.unit.number === 0; })
  });

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: desktop ? String(blockHeight - (margin * 2)) + ea : "auto",
      background: colorChip.white,
      paddingTop: String(desktop ? margin : 8.5) + ea,
      paddingBottom: String(firstWhitePaddingBottom) + ea,
      marginBottom: String(firstBlockMarginBottom) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      overflow: "hidden",
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          width: withOut(margin * 2, ea),
          height: String(100) + '%',
          marginLeft: String(margin) + ea,
        }
      },
      {
        style: {
          position: "absolute",
          bottom: String(0),
          height: String(bottomVisualBackHeight) + ea,
          left: String(0),
          width: String(100) + '%',
          background: colorChip[items.length % 2 === 0 ? "gray0" : "white"],
        }
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

  totalSum = 0;
  for (let z = 0; z < items.length; z++) {

    itemSumNumber = 0;

    table = createNode({
      mother: whiteTong,
      style: {
        display: "block",
        position: "relative",
        paddingTop: String(tablePaddingTop) + ea,
        paddingBottom: String(tablePaddingBottom) + ea,
        marginTop: String(z === 0 ? tableMarginTopFirst : tableMarginTop) + ea,
      },
      children: [
        {
          style: {
            position: "absolute",
            width: "calc(100% + " + String(margin * 2) + ea + ")",
            height: "calc(100% + " + String((tableBackgroundMargin * 2) + (desktop ? 0 : 1)) + ea + ")",
            top: String(tableBackgroundMargin * -1) + ea,
            left: String(margin * -1) + ea,
            background: colorChip[z % 2 === 0 ? "white" : "gray0"],
            opacity: String(0.95),
          },
        },
        {
          style: {
            position: "absolute",
            borderRadius: String(3) + "px",
            width: String(100) + '%',
            height: String(100) + '%',
            border: "1px solid " + colorChip.gray3,
            boxSizing: "border-box",
            top: String(0),
            left: String(0),
          },
        },
        {
          text: "<b%>%b>&nbsp;&nbsp;" + items[z].name,
          style: {
            position: "absolute",
            top: String(itemTitleTop) + ea,
            fontSize: String(itemTitleSize) + ea,
            fontWeight: String(500),
            color: colorChip.black,
            width: String(100) + '%',
            textAlign: "left",
          },
          bold: {
            color: colorChip.green,
            fontWeight: String(700),
          }
        }
      ]
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

    items[z].detail = items[z].detail.filter((obj) => {
      return obj.unit.number !== 0;
    });

    for (let y = 0; y < items[z].detail.length; y++) {

      itemDetailArr = wordings.itemDetail(items[z].detail[y], (y + 1));
      itemSumNumber += wordings.itemPrice(items[z].detail[y]);

      itemBar = createNode({
        mother: table,
        style: {
          display: "block",
          position: "relative",
          marginLeft: String(itemBarLeft) + ea,
          width: withOut(itemBarLeft * 2, ea),
        }
      });

      for (let i = 0; i < itemsRatio.length; i++) {
        item = createNode({
          mother: itemBar,
          text: itemDetailArr[i],
          style: {
            display: "inline-block",
            width: itemsRatio[i],
            position: "relative",
            paddingTop: String(itemBarTop) + ea,
            paddingBottom: String(itemBarBottom) + ea,
            borderRadius: String(3) + "px",
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(initWordingWeight),
            textAlign: "center",
            color: colorChip.black
          }
        });
      }
    }

    createNode({
      mother: table,
      style: {
        position: "absolute",
        display: "block",
        bottom: String(itemSumBottom) + ea,
        width: withOut(desktop ? itemBarLeft * 2 : 0, ea),
        left: String(desktop ? itemBarLeft : 0) + ea,
        textAlign: "right",
      },
      children: [
        {
          text: "<b%>%b>&nbsp;&nbsp;" + autoComma(itemSumNumber) + '원',
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(sumMiddleNumberSize) + ea,
            fontWeight: String(500),
            color: colorChip.black,
            paddingLeft: String(sumWhitePaddingLeft) + ea,
          },
          bold: {
            fontSize: String(sumMiddleNumberSize) + ea,
            fontWeight: String(800),
            color: colorChip.gray3,
          }
        }
      ]
    });
    totalSum += itemSumNumber;

  }

  whiteTongSecond = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: desktop ? String(blockHeight - (margin * 2)) + ea : "auto",
      background: colorChip.white,
      paddingTop: String(desktop ? margin - finalPaddingTopVisual : 8.5) + ea,
      paddingBottom: String(desktop ? margin + finalPaddingBottomVisual : 5) + ea,
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
  }).firstChild;

  sumBox = createNode({
    mother: whiteTongSecond,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      height: String(sumBoxHeight) + ea,
    },
    children: [
      {
        style: {
          position: "absolute",
          display: "block",
          top: String(0) + ea,
          width: String(100) + '%',
          textAlign: "right",
        },
        children: [
          {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(100) + '%',
            height: String(itemTotalSumLineTop) + ea,
            borderBottom: "1px dashed " + colorChip.gray4,
          },
          {
            text: "합계 :&nbsp;&nbsp;&nbsp;" + autoComma(totalSum) + '원',
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(sumNumberSize) + ea,
              fontWeight: String(500),
              color: colorChip.green,
              paddingLeft: String(sumWhitePaddingLeft) + ea,
              background: colorChip.white,
            },
          }
        ]
      }
    ]
  });

  cautionBox = createNode({
    mother: whiteTongSecond,
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
    let buiid;
    let whereQuery;
    let designers, designer;
    let requestNumber;
    let service;
    let invoiceList, invoice;

    if (getObj.proid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    if (getObj.buiid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    buiid = getObj.buiid;
    proid = getObj.proid;

    this.buiid = buiid;
    this.proid = proid;

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

    invoiceList = await ajaxJson({
      whereQuery: { "links.proid": proid, "links.buiid": buiid }
    }, PYTHONHOST + "/invoiceRead", { equal: true });
    if (invoiceList.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ invoice ] = invoiceList;
    this.invoice = invoice;
    this.invid = invoice.invid;

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "constructEstimation",
      client: this.client,
      base: {
        instance: this,
        binaryPath: ConstructEstimationJs.binaryPath,
        subTitle: (this.client.name + " 고객님 시공 견적서"),
        backgroundType: 0,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          instance.insertInitBox(0);
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
