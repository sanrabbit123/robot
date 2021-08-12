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
      "return (thisPerson.name + ' 고객님 견적서 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return (thisPerson.name + ' 고객님 견적서 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "universalEstimation",
  "route": [
    "estimation",
    "UE"
  ]
} %/%/g

class StylingBill {
  constructor(json) {
    if (typeof json !== "object") {
      throw new Error("invaild input");
    }
    for (let i in json) {
      this[i] = json[i];
    }
  }

}

const UniversalEstimationJs = function () {
  this.mother = new GeneralJs();
}

UniversalEstimationJs.binaryPath = "/middle/estimation";

UniversalEstimationJs.prototype.billWordings = function () {
  const instance = this;
  const { client, designer, media, bill } = this;
  const { dateToString, autoComma } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  const { analytics, request } = client.requests[0];
  const spendDates = (Number(String(analytics.response.service.serid).split('_')[1].replace(/[^0-9]/gi, '')) + 1) * 15;
  let start, end;
  let wordings;
  let tempArr;
  let sum0, sum1;
  end = analytics.date.space.movein;
  start = new Date(end.getFullYear(), end.getMonth(), end.getDate(), end.getHours(), end.getMinutes(), end.getSeconds());
  start.setDate(start.getDate() - spendDates);
  wordings = {
    mainTitle: [
      designer.designer + " 디자이너",
      "<b%홈스타일링 비용 내역%b>",
    ],
    subTitle: [
      "<b%현장명%b> : " + request.space.address,
      "<b%예상 기간%b> : " + dateToString(start) + " ~ " + dateToString(end),
    ],
    column: [
      "품명",
      "수량",
      "단가",
      "수량",
      "단위",
      "공급가",
      "VAT",
      "소비자가"
    ],
    items: [],
    sum: {},
    commentsTitle: "<b%*%b> 유의 사항",
    comments: [],
    button: "결제 안내"
  };
  sum0 = 0;
  sum1 = 0;
  for (let obj of bill.requests[0].items) {
    tempArr = [];
    tempArr.push(obj.name);
    tempArr.push(autoComma(obj.unit.price));
    tempArr.push(autoComma(obj.unit.number));
    tempArr.push(obj.unit.ea === null ? '-' : obj.unit.ea);
    tempArr.push(autoComma(obj.amount.supply));
    tempArr.push(autoComma(obj.amount.vat));
    tempArr.push(autoComma(obj.amount.consumer));
    wordings.items.push(tempArr);
    sum0 += obj.amount.supply;
    sum1 += obj.amount.consumer;
  }
  wordings.sum.supply = autoComma(sum0);
  wordings.sum.consumer = autoComma(sum1);
  wordings.comments = bill.comments
  return wordings;
}

UniversalEstimationJs.prototype.insertInitBox = function () {
  const instance = this;
  const { client, designer, ea, baseTong, media, bill } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip } = GeneralJs;
  const wordings = this.billWordings();
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
  let grayMarginTop0, grayMarginTop1;
  let cautionBox;
  let cautionTitleBox, cautionContentsBox;

  blockHeight = <%% 444, 424, 390, 335, 424 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  blockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  titleFontSize = <%% 32, 31, 29, 26, 5.7 %%>;
  titleFontWeight = <%% 300, 300, 300, 300, 300 %%>;
  titleFontBottom = <%% 2, 2, 2, 2, 2 %%>;
  titlePadding = <%% 6, 6, 6, 6, 6 %%>;
  titlePaddingMargin = <%% 18, 18, 18, 18, 18 %%>;

  titleBarTopVisual = <%% 10, 10, 10, 10, 10 %%>;
  titleBarBottomVisual = <%% 6, 6, 6, 6, 6 %%>;

  initWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  initWordingWeight = <%% 300, 300, 300, 300, 300 %%>;

  subTitleBoxTop = <%% 42, 42, 42, 42, 42 %%>;

  tableMarginTop = <%% 34, 34, 34, 34, 34 %%>;

  itemBarLeft = <%% 28, 28, 28, 28, 28 %%>;
  itemBarTop = <%% 10, 10, 10, 10, 10 %%>;
  itemBarBottom = <%% 16, 16, 16, 16, 16 %%>;

  tablePaddingTop = <%% 8, 8, 8, 8, 8 %%>;
  tablePaddingBottom = <%% 13, 13, 13, 13, 13 %%>;
  barPaddingBottom = <%% 5, 5, 5, 5, 5 %%>;
  barMarginBottom = <%% 14, 14, 14, 14, 14 %%>;

  grayMarginTop0 = <%% 40, 40, 40, 40, 40 %%>;
  grayMarginTop1 = <%% 20, 20, 20, 20, 20 %%>;

  items = JSON.parse(JSON.stringify(wordings.items));
  items = [ JSON.parse(JSON.stringify(wordings.column)) ].concat(items);
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


  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: desktop ? String(blockHeight - (margin * 2)) + ea : "auto",
      background: colorChip.white,
      paddingTop: String(desktop ? margin : 9) + ea,
      paddingBottom: String(desktop ? margin : 10.5) + ea,
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
          paddingLeft: String(titlePadding + titlePaddingMargin) + ea,
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
          paddingLeft: String(titlePadding + titlePaddingMargin) + ea,
        },
        bold: {
          fontWeight: String(600),
          color: colorChip.black,
        }
      },
      {
        style: {
          position: "absolute",
          left: String(0),
          width: String(titlePadding) + ea,
          borderRadius: String(3) + "px",
          height: withOut(titleBarTopVisual + titleBarBottomVisual, ea),
          background: colorChip.gray2,
          top: String(titleBarTopVisual) + ea,
        }
      },
      {
        text: wordings.subTitle.join("\n"),
        style: {
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
  for (let z = 0; z < wordings.items.length; z++) {
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
        text: wordings.items[z][i],
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
        }
      });
    }
  }

  sumBox = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(15) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          textAlign: "right",
        },
        children: [
          {
            style: {
              position: "absolute",
              borderBottom: "1px solid " + colorChip.gray3,
              height: String(20) + ea,
              width: String(100) + '%',
              top: String(0),
              left: String(0),
            }
          },
          {
            text: wordings.sum.consumer + "원",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(29) + ea,
              fontWeight: String(500),
              textAlign: "right",
              background: colorChip.white,
              paddingLeft: String(19) + ea,
              color: colorChip.black,
            }
          },
          {
            text: "vat 포함",
            style: {
              display: "inline-block",
              position: "relative",
              paddingLeft: String(10) + ea,
              fontSize: String(18) + ea,
              fontWeight: String(300),
              textAlign: "right",
              background: colorChip.white,
              color: colorChip.shadow,
            }
          }
        ]
      }
    ]
  });

  cautionBox = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(5) + "px",
      paddingTop: String(tablePaddingTop) + ea,
      paddingBottom: String(tablePaddingBottom) + ea,
      marginTop: String(grayMarginTop0) + ea,
      background: colorChip.gray0,
      height: String(600) + ea,
    }
  });






  createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(5) + "px",
      paddingTop: String(tablePaddingTop) + ea,
      paddingBottom: String(tablePaddingBottom) + ea,
      marginTop: String(grayMarginTop1) + ea,
      background: colorChip.gray0,
      height: String(300) + ea,
    }
  });

  console.log(wordings);

  whiteBlock.style.height = "auto";

}

UniversalEstimationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    if (getObj.needs === undefined || getObj.cliid === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    const { needs, cliid } = getObj;
    const [ kind, desid, proid, method ] = needs.split(',');
    let clients, client;
    let designers, designer;
    let bills, bill;

    clients = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getClients", { equal: true });
    if (clients.length === 0) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    designers = await ajaxJson({ noFlat: true, whereQuery: { desid } }, "/getDesigners", { equal: true });
    if (designers.length === 0) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    client = clients[0];
    this.client = client;
    designer = designers[0];
    this.designer = designer;

    bills = await ajaxJson({ mode: "read", whereQuery: { $and: [ { class: kind }, { "links.cliid": cliid }, { "links.desid": desid }, { "links.proid": proid }, { "links.method": method } ] } }, PYTHONHOST + "/generalBill", { equal: true });
    if (bills.length === 0) {
      alert("견적서가 없습니다! 홈리에종에 문의해주세요!");
      window.location.href = this.frontPage;
    }
    if (kind === "style") {
      bill = new StylingBill(bills[0]);
      this.bill = bill;
      this.class = kind;
    } else {
      alert("아직 구축되지 않은 영역입니다!");
      window.location.href = this.frontPage;
    }

    await this.mother.ghostClientLaunching({
      name: "universalEstimation",
      client: client,
      base: {
        instance: this,
        binaryPath: UniversalEstimationJs.binaryPath,
        subTitle: (this.client.name + " 고객님 견적서"),
      },
      local: async () => {
        try {
          instance.insertInitBox();
        } catch (e) {
          console.log(e);
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
