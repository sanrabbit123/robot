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
      "return (thisPerson.name + ' 고객님 결제 안내 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return (thisPerson.name + ' 고객님 결제 안내 | 홈리에종');"
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
  const { client, designer, project, media, bill, requestNumber } = this;
  const { dateToString, autoComma } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  const { analytics, request } = client.requests[this.clientRequestNumber];
  const spendDates = (Number(String(analytics.response.service.serid).split('_')[1].replace(/[^0-9]/gi, '')) + 1) * 15;
  const serviceName = [ "홈퍼니싱", "홈스타일링", "토탈 스타일링", "설계 변경" ];
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
      "<b%" + (project.service.online ? "온라인" : "오프라인") + " " + serviceName[Number(project.service.serid.split('_')[1].replace(/[^0-9]/g, '').replace(/^0/, '')) - 1] + " 내역%b>",
    ],
    subTitle: [
      "<b%현장명%b> : " + request.space.address,
      "<b%예상 기간%b> : " + dateToString(start) + " ~ " + dateToString(end),
    ],
    column: [],
    items: [],
    sum: {},
    commentsTitle: "<b%*%b> 안내 사항",
    comments: [],
    button: [ "카드 결제", "무통장 입금", "계좌 이체" ],
    pannel: [
      {
        name: "계좌 이체시",
        children: [
          "기업 049-085567-04-022",
          "(주)홈리에종"
        ]
      },
      {
        name: "카드 결제시",
        children: [
          "카드 결제창",
        ]
      },
    ],
    account: {
      name: "(주)홈리에종",
      number: "기업 049-085567-04-022",
    },
    notice: {
      title: "* 주의 사항",
      business: [
        "계약서를 사업자명으로 작성하신 경우에만 사업자 등록번호로 세금 계산서 발행이 가능하며, 그렇지 않을 경우 신청자의 핸드폰 번호로 현금 영수증이 발행됩니다.",
        "세금 계산서 발행으로 일어나는 모든 세무상 불이익은 홈리에종과 무관하며, 홈리에종이 책임지지 않습니다.",
        "세금 계산서 발행을 한 경우에도, 입금자명을 신청자명으로 보내 주셔야 합니다. 그렇지 않을 경우, 입금 확인에 문제가 생길 수 있습니다."
      ],
      cash: [
        "입금자명을 반드시 신청자명으로 보내 주셔야 합니다. 그렇지 않을 경우, 입금 확인에 문제가 생길 수 있습니다."
      ]
    }
  };
  if (desktop) {
    wordings.column = [
      "품명",
      "단가",
      "수량",
      "단위",
      "공급가",
      "VAT",
      "소비자가"
    ];
  } else {
    wordings.column = [
      "품명",
      "수량",
      "공급가",
      "소비자가"
    ];
  }

  between = desktop ? "&nbsp;&nbsp;/&nbsp;&nbsp;" : " / ";
  sum0 = 0;
  sum1 = 0;

  for (let obj of bill.requests[requestNumber].items) {
    tempArr = [];
    tempArr.push(obj.name);
    if (desktop) {
      tempArr.push(autoComma(obj.unit.price));
    }
    tempArr.push(autoComma(obj.unit.number));
    if (desktop) {
      tempArr.push(obj.unit.ea === null ? '-' : obj.unit.ea);
    }
    tempArr.push(autoComma(obj.amount.supply));
    if (desktop) {
      tempArr.push(autoComma(obj.amount.vat));
    }
    tempArr.push(autoComma(obj.amount.consumer));
    wordings.items.push(tempArr);
    sum0 += obj.amount.supply;
    sum1 += obj.amount.consumer;
  }
  wordings.sum.supply = autoComma(sum0);
  wordings.sum.consumer = autoComma(sum1);
  wordings.comments = bill.requests[requestNumber].comments;

  if (this.completeInfo.method === "card") {
    wordings.completeComments = [];
    wordings.completeComments.push("결제가 완료되었으며, 다음 과정 안내를 위해 홈리에종에서 연락이 갈 수 있습니다.");
    wordings.completeComments.push("기타 문의 사항은 02-2039-2252 으로 전화 주시거나, <u%카카오톡 홈리에종 채널을 통해 문의 부탁%u>드립니다!");
  } else if (this.completeInfo.method === "bank") {
    wordings.completeComments = [];
    wordings.completeComments.push(dateToString(this.completeInfo.when) + " 까지 다음 가상계좌를 통해 입금해주시면 결제가 완료됩니다!");
    wordings.completeComments.push("가상계좌 정보 :&nbsp;&nbsp;<u%" + this.completeInfo.where.bank + between + this.completeInfo.where.account + between + this.completeInfo.where.to.replace(/ /g, '').replace(/\)/, ") ") + "%u>");
  } else if (this.completeInfo.method === "real") {
    wordings.completeComments = [];
    wordings.completeComments.push(dateToString(this.completeInfo.when) + " 까지 다음 홈리에종 계좌를 통해 입금해주시면 결제가 완료됩니다!");
    wordings.completeComments.push("계좌 정보 :&nbsp;&nbsp;<u%" + this.completeInfo.where.bank + between + this.completeInfo.where.account + between + this.completeInfo.where.to.replace(/ /g, '').replace(/\)/, ") ") + "%u>");
  }

  this.request.name = bill.requests[requestNumber].name;
  this.request.amount = sum1;

  return wordings;
}

UniversalEstimationJs.prototype.insertInitBox = function () {
  const instance = this;
  const { client, designer, ea, baseTong, media, bill, request, completeMode, completeInfo } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, isMac, setQueue } = GeneralJs;
  const wordings = this.billWordings();
  const cashTarget = "cashTarget";
  const businessTarget = "businessTarget";
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
  let cashWidth, cashHeight;
  let cashWhiteBox;
  let cashPaddingTop, cashPaddingLeft;
  let cashLoading;
  let cashLoadingRadius;
  let cashLoadingTop;
  let cashLoadingBetween;
  let cashWording;
  let cashWordingSize;
  let cashWordingTop;
  let inputBaseHeight;
  let inputBaseVisual;
  let cashInput, businessInput;
  let cashInputSize;
  let cashInputTop;
  let cashPaddingBottom;
  let cashInputVisual;
  let cashSubmitEvent;
  let cashSubmitButtonWidth;
  let cashSubmitButtonSize;
  let cashSubmitButtonBetween;
  let submitTextTop;
  let secondTop;
  let deactiveOpacity;
  let greenNoticeMother;
  let greenNoticePaddingTop;
  let greenNoticePaddingBottom;
  let greenNoticePaddingLeft;
  let greenNoticeBetween;
  let greenNoticeSize;

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
  initWordingWeight = <%% 400, 400, 400, 400, 400 %%>;

  subTitleBoxTop = <%% 35, 35, 31, 20, 35 %%>;

  itemBarLeft = <%% 28, 28, 28, 28, 2 %%>;
  itemBarTop = <%% 10, 10, 10, 10, 1 %%>;
  itemBarBottom = <%% 11, 11, 11, 11, 2 %%>;

  tableMarginTop = <%% 32, 32, 26, 22, 8.5 %%>;
  tablePaddingTop = <%% 10, 10, 10, 10, 2.5 %%>;
  tablePaddingBottom = <%% (isMac() ? 20 : 17), (isMac() ? 20 : 17), (isMac() ? 20 : 17), (isMac() ? 20 : 17), 3 %%>;
  barPaddingBottom = <%% 9, 9, 9, 9, 1.5 %%>;
  barMarginBottom = <%% 13, 13, 13, 13, 2.5 %%>;

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

  greenButtonWidth = <%% 122, 122, 122, 110, 20 %%>;
  greenButtonHeight = <%% 47, 47, 45, 40, 8.4 %%>;
  greenButtonFontSize = <%% 20, 20, 20, 16, 3.8 %%>;
  greenButtonTextTop = <%% (isMac() ? 8 : 10), (isMac() ? 8 : 10), (isMac() ? 8 : 10), (isMac() ? 8 : 10), 1.2 %%>;
  greenButtonBetween = <%% 4, 4, 4, 2, 0.6 %%>;

  greenBasePaddingTop = <%% 10, 10, 10, 10, 3.8 %%>;
  greenBasePaddingBottom = <%% 32, 32, 32, 32, 3.8 %%>;

  cashWidth = <%% 440, 440, 440, 440, 80 %%>;
  cashHeight = <%% 261, 261, 261, 261, 49.2 %%>;
  cashPaddingLeft = <%% 30, 30, 30, 30, 5.2 %%>;
  cashPaddingTop = <%% 25, 25, 25, 25, 4.9 %%>;
  cashPaddingBottom = <%% 28, 28, 28, 28, 4.9 %%>;
  cashInputTop = <%% 62, 62, 62, 62, 11.5 %%>;
  cashLoadingRadius = <%% 18, 18, 18, 18, 3.6 %%>;
  cashLoadingBetween = <%% 8, 8, 8, 8, 1.2 %%>;
  cashLoadingTop = <%% 30, 30, 30, 30, 5.7 %%>;
  cashWordingSize = <%% 20, 20, 20, 20, 3.7 %%>;
  cashWordingTop = <%% isMac() ? 24 : 27, isMac() ? 24 : 27, isMac() ? 24 : 27, isMac() ? 24 : 27, 4.6 %%>;
  inputBaseHeight = <%% 36, 36, 36, 36, 7 %%>;
  inputBaseVisual = <%% 1, 1, 1, 1, 0.1 %%>;
  cashInputSize = <%% 16, 16, 16, 16, 3 %%>;
  cashInputVisual = <%% isMac() ? 1 : 0, isMac() ? 1 : 0, isMac() ? 1 : 0, isMac() ? 1 : 0, 0.2 %%>;
  cashSubmitButtonWidth = <%% 54, 54, 54, 54, 10 %%>;
  cashSubmitButtonSize = <%% 14, 14, 14, 14, 2.8 %%>;
  cashSubmitButtonBetween = <%% 6, 6, 6, 6, 1 %%>;
  submitTextTop = <%% isMac() ? -2 : 0, isMac() ? -2 : 0, isMac() ? -2 : 0, isMac() ? -2 : 0, -0.3 %%>;
  secondTop = <%% 130, 130, 130, 130, 24 %%>;
  deactiveOpacity = <%% 0.5, 0.5, 0.5, 0.5, 0.5 %%>;

  greenNoticePaddingTop = <%% 14, 14, 14, 14, 2.2 %%>;
  greenNoticePaddingBottom = <%% 11, 11, 11, 11, 1.7 %%>;
  greenNoticePaddingLeft = <%% 16, 16, 16, 16, 3 %%>;
  greenNoticeBetween = <%% 6, 6, 6, 6, 1 %%>;
  greenNoticeSize = <%% 12, 12, 12, 12, 2.2 %%>;

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

  if (completeMode) {
    if (completeInfo.method === "card") {
      wordings.mainTitle[0] = "카드 결제가";
      wordings.mainTitle[1] = "<b%완료되었습니다!%b>";
    } else if (completeInfo.method === "bank") {
      wordings.mainTitle[0] = "가상계좌 발급이";
      wordings.mainTitle[1] = "<b%완료되었습니다!%b>";
    } else {
      wordings.mainTitle[0] = "홈리에종 계좌를";
      wordings.mainTitle[1] = "<b%안내드립니다!%b>";
    }
  }
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
          background: colorChip.gray2,
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
          color: completeMode ? colorChip.green : colorChip.black
        }
      });
    }
  }

  if (completeMode) {
    sumBox = createNode({
      mother: whiteTong,
      style: {
        display: "block",
        position: "relative",
        paddingTop: String(sumBoxPaddingTop) + ea,
        paddingBottom: String(sumBoxPaddingBottom) + ea,
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
                height: String(sumBoxBarTop) + ea,
                width: String(100) + '%',
                top: String(0),
                left: String(0),
              }
            },
            {
              text: completeInfo.method === "card" ? "결제 완료" : "안내 완료",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(sumBoxMainFontSize) + ea,
                fontWeight: String(sumBoxMainFontWeight),
                textAlign: "right",
                background: colorChip.white,
                paddingLeft: String(sumBoxMainPaddingLeft) + ea,
                color: colorChip.green,
              }
            }
          ]
        }
      ]
    });
  } else {
    sumBox = createNode({
      mother: whiteTong,
      style: {
        display: "block",
        position: "relative",
        paddingTop: String(sumBoxPaddingTop) + ea,
        paddingBottom: String(sumBoxPaddingBottom) + ea,
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
                height: String(sumBoxBarTop) + ea,
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
                fontSize: String(sumBoxMainFontSize) + ea,
                fontWeight: String(sumBoxMainFontWeight),
                textAlign: "right",
                background: colorChip.white,
                paddingLeft: String(sumBoxMainPaddingLeft) + ea,
                color: colorChip.green,
              }
            },
            {
              text: "vat 포함",
              style: {
                display: "inline-block",
                position: "relative",
                paddingLeft: String(sumBoxVatPaddingLeft) + ea,
                fontSize: String(sumBoxVatFontSize) + ea,
                fontWeight: String(sumBoxVatFontWeight),
                textAlign: "right",
                background: colorChip.white,
                color: colorChip.shadow,
              }
            }
          ]
        }
      ]
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
      marginTop: String(completeMode ? completeMarginTop0 : grayMarginTop0) + ea,
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

  for (let c of wordings[completeMode ? "completeComments" : "comments"]) {
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

  if (completeMode) {
    whiteBlock.style.height = "auto";
    return 0;
  }

  grayTong = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(5) + "px",
      paddingTop: String(tablePaddingTop) + ea,
      paddingBottom: String(tablePaddingBottom) + ea,
      marginTop: String(grayMarginTop1) + ea,
      background: colorChip.gray0,
      marginBottom: String(grayTongMarginBottom) + ea,
      height: String(grayHeight) + ea,
    },
    children: [
      {
        style: {
          position: "absolute",
          top: String(grayTextTop) + ea,
          left: String(grayTextLeft) + ea,
          width: withOut(grayTextLeft * 2, ea),
          height: withOut(grayTextTop * 2, ea),
          overflow: "scroll",
        },
        children: [
          {
            style: {
              position: "absolute",
              top: String(0) + ea,
              left: String(0) + ea,
              width: String(100) + '%',
              height: "auto",
              fontSize: String(grayTextSize) + ea,
              fontWeight: String(300),
              lineHeight: String(1.6),
            }
          }
        ]
      }
    ]
  });
  grayTextTong = grayTong.firstChild.firstChild;

  buttonOn = {};
  buttonTong = createNode({
    mother: whiteTong,
    attribute: [
      { toggle: "on" }
    ],
    events: [
      {
        type: "click",
        event: function (e) {
          if (buttonOn.style !== undefined) {
            if (this.getAttribute("toggle") === "on") {
              buttonOn.style.opacity = String(0);
              this.setAttribute("toggle", "off");
            } else {
              buttonOn.style.opacity = String(1);
              this.setAttribute("toggle", "on");
            }
          }
        }
      }
    ],
    style: {
      position: "relative",
      left: String(0) + ea,
      width: withOut(0 * 2, ea),
      height: String(buttonTongHeight) + ea,
      cursor: "pointer",
    }
  });

  ajaxJson("/designerProposal_policy").then(function (res) {
    const { policy, button } = res;
    let bTags;

    grayTextTong.insertAdjacentHTML("beforeend", policy);
    bTags = grayTextTong.querySelectorAll("b");
    for (let b of bTags) {
      b.style.color = colorChip.black;
      b.style.fontWeight = String(600);
    }

    [ buttonOff, buttonOn ] = createNodes([
      {
        mother: buttonTong,
        mode: "svg",
        source: button.off,
        style: {
          position: "absolute",
          height: String(grayButtonHeight) + ea,
          right: String(0) + ea,
          top: String(0) + ea,
        }
      },
      {
        mother: buttonTong,
        mode: "svg",
        source: button.on,
        style: {
          position: "absolute",
          height: String(grayButtonHeight) + ea,
          right: String(0) + ea,
          top: String(0) + ea,
          background: colorChip.white,
        }
      },
    ]);

  }).catch(function (err) {
    throw new Error(err);
  });

  greenButtonBase = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(greenBasePaddingTop) + ea,
      paddingBottom: String(greenBasePaddingBottom) + ea,
      textAlign: "center",
    }
  });

  GeneralJs.stacks.messageCancelEvent = function (e) {
    for (let i = 0; i < 3; i++) {
      document.body.removeChild(document.body.lastChild);
    }
    document.head.removeChild(document.head.lastChild);
    //close callback
    window.alert("결제가 취소되었습니다! 다시 시도해주세요!");
  }
  window.addEventListener("message", GeneralJs.stacks.messageCancelEvent);

  paymentEvent = function (motherMethod) {
    return async function (e) {
      try {
        if (motherMethod === "account") {
          if (!window.confirm("계좌 이체를 위한 안내를 받으시겠습니까?")) {
            return;
          }
        }
        const { pluginScript, formValue } = await ajaxJson({
          cliid: instance.cliid,
          kind: instance.class,
          desid: instance.desid,
          proid: instance.proid,
          method: instance.method,
          mode: "script",
          name: request.name,
          price: request.amount,
          buyerName: instance.client.name,
          buyerPhone: instance.client.phone,
          buyerEmail: instance.client.email,
          currentPage: window.location.protocol + "//" + window.location.host,
          gopaymethod: (/card/gi.test(motherMethod) ? "Card" : (/vbank/gi.test(motherMethod) ? "VBank" : "Account")),
          device: (desktop ? "desktop" : "mobile"),
          requestNumber: String(instance.requestNumber),
          bilid: instance.bill.bilid,
        }, "/inicisPayment");
        const formMother = document.createElement("DIV");
        const form = document.createElement("FORM");
        let value, formId, plugin;
        let mobileInisisInfo;

        formId = "form" + String((new Date()).valueOf());
        form.id = formId;
        form.style.display = "none";
        formMother.style.display = "none";
        document.body.appendChild(formMother);
        formMother.appendChild(form);

        if (!/vbank/gi.test(motherMethod) && !/card/gi.test(motherMethod)) {

          cashInput = {};
          businessInput = {};

          //submit event
          cashSubmitEvent = function (thisInput) {
            return function (e) {
              e.preventDefault();
              e.stopPropagation();
              if (thisInput !== null) {
                if (thisInput.value === '') {
                  window.alert("휴대폰 번호 또는 사업자 등록번호를 입력해주세요!");
                  thisInput.value = instance.client.phone;
                  thisInput.focus();
                } else {
                  if (/[^0-9\-]/gi.test(thisInput.value)) {
                    window.alert("숫자와 하이픈(-)만 이용해서 입력해주세요!");
                    thisInput.value = instance.client.phone;
                    thisInput.focus();
                  } else {
                    window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search + "&mode=complete&hash=" + pluginScript + "&cashphone=" + thisInput.value.trim();
                  }
                }
              } else {
                window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search + "&mode=complete&hash=" + pluginScript + "&cashphone=" + instance.client.phone;
              }
            }
          }

          // cancel back
          createNode({
            mother: document.body,
            event: {
              click: cashSubmitEvent(null)
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              height: String(100) + '%',
              background: "transparent",
            }
          });

          // white box
          cashWhiteBox = createNode({
            mother: document.body,
            style: {
              position: "fixed",
              top: withOut(50, cashHeight / 2, ea),
              left: withOut(50, cashWidth / 2, ea),
              width: String(cashWidth) + ea,
              height: String(cashHeight) + ea,
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              background: colorChip.white,
              animation: "fadeuplite 0.3s ease",
              zIndex: String(5),
            }
          });

          // first - cash
          cashLoading = instance.mother.returnLoadingIcon();
          cashLoading.style.position = "absolute";
          cashLoading.style.width = String(cashLoadingRadius) + ea;
          cashLoading.style.height = String(cashLoadingRadius) + ea;
          cashLoading.style.top = String(cashLoadingTop) + ea;
          cashLoading.style.left = String(cashPaddingLeft) + ea;
          cashLoading.style.opacity = String(deactiveOpacity);
          cashLoading.style.transition = "all 0.3s ease";
          cashLoading.classList.add(cashTarget);
          cashWhiteBox.appendChild(cashLoading);

          cashWording = createNode({
            mother: cashWhiteBox,
            text: "현금영수증을 받으실 번호를 알려주세요!",
            class: [ cashTarget ],
            style: {
              position: "absolute",
              top: String(cashWordingTop) + ea,
              left: String(cashPaddingLeft + cashLoadingRadius + cashLoadingBetween) + ea,
              fontSize: String(cashWordingSize) + ea,
              fontWeight: String(500),
              color: colorChip.black,
              opacity: String(deactiveOpacity),
              transition: "all 0.3s ease",
            }
          });

          createNode({
            mother: cashWhiteBox,
            class: [ cashTarget ],
            style: {
              position: "absolute",
              top: String(cashInputTop) + ea,
              left: String(cashPaddingLeft + inputBaseVisual) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray1,
              width: withOut((cashPaddingLeft * 2) + inputBaseVisual + cashSubmitButtonBetween + cashSubmitButtonWidth, ea),
              height: String(inputBaseHeight) + ea,
              opacity: String(deactiveOpacity),
              transition: "all 0.3s ease",
            }
          });

          cashInput = createNode({
            mother: cashWhiteBox,
            class: [ cashTarget ],
            mode: "input",
            event: {
              keyup: function (e) {
                this.value = this.value.replace(/[^0-9\-]/gi, '');
              },
              keypress: function (e) {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  cashSubmitEvent(cashInput).call(this, e);
                }
              },
              focus: function (e) {
                const targets = cashWhiteBox.querySelectorAll('.' + cashTarget);
                for (let dom of targets) {
                  dom.style.opacity = String(1);
                }
                [ ...targets ].find((dom) => { return /hoverDefault_lite/gi.test(dom.className) }).style.background = colorChip.green;

                greenNoticeMother = createNode({
                  mode: "aside",
                  mother: this.parentNode,
                  style: {
                    position: "absolute",
                    width: withOut((cashPaddingLeft * 2) + inputBaseVisual + cashSubmitButtonBetween + cashSubmitButtonWidth, ea),
                    top: String(cashInputTop + inputBaseHeight + cashSubmitButtonBetween) + ea,
                    left: String(cashPaddingLeft + inputBaseVisual) + ea,
                    background: colorChip.gradientGreen,
                    borderRadius: String(5) + "px",
                    animation: "fadeuplite 0.3s ease forwards",
                    paddingTop: String(greenNoticePaddingTop) + ea,
                    paddingBottom: String(greenNoticePaddingBottom) + ea,
                  }
                });

                for (let str of wordings.notice.cash) {
                  createNode({
                    mother: greenNoticeMother,
                    text: "* " + str,
                    style: {
                      display: "block",
                      position: "relative",
                      fontSize: String(greenNoticeSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.white,
                      paddingLeft: String(greenNoticePaddingLeft) + ea,
                      paddingRight: String(greenNoticePaddingLeft) + ea,
                      marginBottom: String(greenNoticeBetween) + ea,
                      lineHeight: String(1.45),
                    }
                  });
                }

              },
              blur: function (e) {
                const targets = cashWhiteBox.querySelectorAll('.' + cashTarget);
                for (let dom of targets) {
                  dom.style.opacity = String(deactiveOpacity);
                }
                [ ...targets ].find((dom) => { return /hoverDefault_lite/gi.test(dom.className) }).style.background = colorChip.deactive;

                const self = this;
                const removeTargets = self.parentNode.querySelectorAll("aside");
                for (let dom of removeTargets) {
                  dom.remove();
                }
              }
            },
            style: {
              position: "absolute",
              top: String(cashInputTop - cashInputVisual) + ea,
              left: String(cashPaddingLeft + inputBaseVisual) + ea,
              border: String(0),
              outline: String(0),
              fontSize: String(cashInputSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              background: "transparent",
              width: withOut((cashPaddingLeft * 2) + inputBaseVisual + cashSubmitButtonBetween + cashSubmitButtonWidth, ea),
              height: String(inputBaseHeight) + ea,
              zIndex: String(1),
              textAlign: "center",
              opacity: String(deactiveOpacity),
              transition: "all 0.3s ease",
            }
          });
          cashInput.value = instance.client.phone;
          setQueue(() => { cashInput.focus(); });

          createNode({
            mother: cashWhiteBox,
            class: [ "hoverDefault_lite", cashTarget ],
            event: {
              click: cashSubmitEvent(cashInput)
            },
            style: {
              display: "flex",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              top: String(cashInputTop) + ea,
              right: String(cashPaddingLeft + inputBaseVisual) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.deactive,
              width: String(cashSubmitButtonWidth) + ea,
              height: String(inputBaseHeight) + ea,
              transition: "all 0.3s ease",
              opacity: String(deactiveOpacity),
            },
            children: [
              {
                text: "제출",
                style: {
                  fontSize: String(cashSubmitButtonSize) + ea,
                  fontWeight: String(500),
                  color: colorChip.white,
                  position: "relative",
                  top: String(submitTextTop) + ea,
                  transition: "all 0.3s ease",
                }
              }
            ]
          });

          // middle bar
          createNode({
            mother: cashWhiteBox,
            style: {
              position: "absolute",
              top: String(secondTop) + ea,
              left: String(cashPaddingLeft + inputBaseVisual) + ea,
              borderBottom: "1px solid " + colorChip.gray3,
              width: withOut((cashPaddingLeft + inputBaseVisual) * 2, ea),
            }
          });

          // second - business
          cashLoading = instance.mother.returnLoadingIcon();
          cashLoading.style.position = "absolute";
          cashLoading.style.width = String(cashLoadingRadius) + ea;
          cashLoading.style.height = String(cashLoadingRadius) + ea;
          cashLoading.style.top = String(secondTop + cashLoadingTop) + ea;
          cashLoading.style.left = String(cashPaddingLeft) + ea;
          cashLoading.style.opacity = String(deactiveOpacity);
          cashLoading.style.transition = "all 0.3s ease";
          cashLoading.classList.add(businessTarget);
          cashWhiteBox.appendChild(cashLoading);

          createNode({
            mother: cashWhiteBox,
            class: [ businessTarget ],
            text: "사업자의 경우, 등록번호를 알려주세요!",
            style: {
              position: "absolute",
              top: String(secondTop + cashWordingTop) + ea,
              left: String(cashPaddingLeft + cashLoadingRadius + cashLoadingBetween) + ea,
              fontSize: String(cashWordingSize) + ea,
              fontWeight: String(500),
              color: colorChip.black,
              opacity: String(deactiveOpacity),
              transition: "all 0.3s ease",
            }
          });
          createNode({
            mother: cashWhiteBox,
            class: [ businessTarget ],
            style: {
              position: "absolute",
              top: String(secondTop + cashInputTop) + ea,
              left: String(cashPaddingLeft + inputBaseVisual) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray1,
              width: withOut((cashPaddingLeft * 2) + inputBaseVisual + cashSubmitButtonBetween + cashSubmitButtonWidth, ea),
              height: String(inputBaseHeight) + ea,
              opacity: String(deactiveOpacity),
              transition: "all 0.3s ease",
            }
          });
          businessInput = createNode({
            mother: cashWhiteBox,
            class: [ businessTarget ],
            mode: "input",
            event: {
              keyup: function (e) {
                this.value = this.value.replace(/[^0-9\-]/gi, '');
              },
              keypress: function (e) {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  cashSubmitEvent(businessInput).call(this, e);
                }
              },
              focus: function (e) {
                const targets = cashWhiteBox.querySelectorAll('.' + businessTarget);
                for (let dom of targets) {
                  dom.style.opacity = String(1);
                }
                [ ...targets ].find((dom) => { return /hoverDefault_lite/gi.test(dom.className) }).style.background = colorChip.green;

                greenNoticeMother = createNode({
                  mode: "aside",
                  mother: this.parentNode,
                  style: {
                    position: "absolute",
                    width: withOut((cashPaddingLeft * 2) + inputBaseVisual + cashSubmitButtonBetween + cashSubmitButtonWidth, ea),
                    top: String(secondTop + cashInputTop + inputBaseHeight + cashSubmitButtonBetween) + ea,
                    left: String(cashPaddingLeft + inputBaseVisual) + ea,
                    background: colorChip.gradientGreen,
                    borderRadius: String(5) + "px",
                    animation: "fadeuplite 0.3s ease forwards",
                    paddingTop: String(greenNoticePaddingTop) + ea,
                    paddingBottom: String(greenNoticePaddingBottom) + ea,
                  }
                });

                createNode({
                  mother: greenNoticeMother,
                  text: wordings.notice.title,
                  style: {
                    display: "block",
                    position: "relative",
                    fontSize: String(greenNoticeSize) + ea,
                    fontWeight: String(700),
                    color: colorChip.white,
                    paddingLeft: String(greenNoticePaddingLeft) + ea,
                    paddingRight: String(greenNoticePaddingLeft) + ea,
                    marginBottom: String(greenNoticeBetween) + ea,
                    lineHeight: String(1.4),
                  }
                });

                for (let str of wordings.notice.business) {
                  createNode({
                    mother: greenNoticeMother,
                    text: "- " + str,
                    style: {
                      display: "block",
                      position: "relative",
                      fontSize: String(greenNoticeSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.white,
                      paddingLeft: String(greenNoticePaddingLeft) + ea,
                      paddingRight: String(greenNoticePaddingLeft) + ea,
                      marginBottom: String(greenNoticeBetween) + ea,
                      lineHeight: String(1.4),
                    }
                  });
                }

              },
              blur: function (e) {
                const targets = cashWhiteBox.querySelectorAll('.' + businessTarget);
                for (let dom of targets) {
                  dom.style.opacity = String(deactiveOpacity);
                }
                [ ...targets ].find((dom) => { return /hoverDefault_lite/gi.test(dom.className) }).style.background = colorChip.deactive;

                const self = this;
                const removeTargets = self.parentNode.querySelectorAll("aside");
                for (let dom of removeTargets) {
                  dom.remove();
                }

              }
            },
            style: {
              position: "absolute",
              top: String(secondTop + cashInputTop - cashInputVisual) + ea,
              left: String(cashPaddingLeft + inputBaseVisual) + ea,
              border: String(0),
              outline: String(0),
              fontSize: String(cashInputSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              background: "transparent",
              width: withOut((cashPaddingLeft * 2) + inputBaseVisual + cashSubmitButtonBetween + cashSubmitButtonWidth, ea),
              height: String(inputBaseHeight) + ea,
              zIndex: String(1),
              textAlign: "center",
              opacity: String(deactiveOpacity),
              transition: "all 0.3s ease",
            }
          });
          createNode({
            mother: cashWhiteBox,
            class: [ "hoverDefault_lite", businessTarget ],
            event: {
              click: cashSubmitEvent(businessInput)
            },
            style: {
              display: "flex",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              top: String(secondTop + cashInputTop) + ea,
              right: String(cashPaddingLeft + inputBaseVisual) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.deactive,
              width: String(cashSubmitButtonWidth) + ea,
              height: String(inputBaseHeight) + ea,
              transition: "all 0.3s ease",
              opacity: String(deactiveOpacity),
            },
            children: [
              {
                text: "제출",
                style: {
                  fontSize: String(cashSubmitButtonSize) + ea,
                  fontWeight: String(500),
                  color: colorChip.white,
                  position: "relative",
                  top: String(submitTextTop) + ea,
                  transition: "all 0.3s ease",
                }
              }
            ]
          });

        } else {

          if (desktop) {
            if (/vbank/gi.test(motherMethod) || /card/gi.test(motherMethod)) {

              for (let name in formValue) {
                value = String(formValue[name]);
                createNode({
                  mother: form,
                  mode: "input",
                  attribute: [ { name }, { value } ],
                  style: { display: "none" }
                });
              }
              plugin = new Function(`${pluginScript}\n\nINIStdPay.pay(${formId});`);
              plugin();

            }
          } else {
            if (/vbank/gi.test(motherMethod)) {
              form.setAttribute("method", "post");
              form.setAttribute("accept-charset", "euc-kr");
              mobileInisisInfo = {
                P_INI_PAYMENT: "VBANK",
                P_MID: formValue.mid,
                P_OID: formValue.oid,
                P_AMT: Math.floor(request.amount),
                P_GOODS: formValue.goodname,
                P_UNAME: instance.client.name,
                P_NEXT_URL: formValue.returnUrl,
                P_NOTI_URL: PYTHONHOST.replace(/\:3000/gi, '') + "/webHookVAccount.php",
                P_HPP_METHOD: String(1),
                P_CHARSET: "utf8",
                P_RESERVED: "vbank_receipt=Y",
                P_NOTI: formValue.goodname + "__split__" + formValue.mid + "__split__" + formValue.returnUrl,
              };
              for (let name in mobileInisisInfo) {
                value = String(mobileInisisInfo[name]);
                createNode({
                  mother: form,
                  mode: "input",
                  attribute: [ { name }, { value } ],
                  style: { display: "none" }
                });
              }
              form.action = "https://mobile.inicis.com/smart/payment/";
              form.target = "_self";
              form.submit();
            } else if (/card/gi.test(motherMethod)) {
              window.removeEventListener("message", GeneralJs.stacks.messageCancelEvent);
              plugin = new Function(pluginScript);
              plugin();
              window.IMP.init("imp71921105");
              window.IMP.request_pay({
                  merchant_uid: formValue.oid,
                  name: formValue.goodname,
                  amount: Math.floor(request.amount),
                  buyer_email: instance.client.email,
                  buyer_name: instance.client.name,
                  buyer_tel: instance.client.phone,
                  m_redirect_url: window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search + "&mobilecard=true&mid=" + formValue.mid + "&oid=" + formValue.oid,
              }, (rsp) => {});
            }
          }

        }

      } catch (e) {
        await GeneralJs.ajaxJson({ message: "UniversalEstimationJs.insertInitBox.paymentEvent : " + e.message }, "/errorLog");
      }
    };
  }

  if (!this.inicisDeactive) {
    createNode({
      mother: greenButtonBase,
      class: [ "hoverDefault_lite" ],
      events: [
        {
          type: "click",
          event: paymentEvent("card"),
        }
      ],
      style: {
        display: "inline-block",
        position: "relative",
        width: String(greenButtonWidth) + ea,
        height: String(greenButtonHeight) + ea,
        background: colorChip.green,
        textAlign: "center",
        borderRadius: String(3) + "px",
        marginRight: String(greenButtonBetween) + ea,
      },
      children: [
        {
          text: wordings.button[0],
          style: {
            position: "absolute",
            top: String(greenButtonTextTop) + ea,
            width: String(100) + '%',
            left: String(0),
            fontSize: String(greenButtonFontSize) + ea,
            fontWeight: String(400),
            color: colorChip.white,
            textAlign: "center",
          }
        }
      ]
    });

    // createNode({
    //   mother: greenButtonBase,
    //   class: [ "hoverDefault_lite" ],
    //   events: [
    //     {
    //       type: "click",
    //       event: paymentEvent("vbank"),
    //     }
    //   ],
    //   style: {
    //     display: "inline-block",
    //     position: "relative",
    //     width: String(greenButtonWidth + 3) + ea,
    //     height: String(greenButtonHeight) + ea,
    //     background: colorChip.green,
    //     textAlign: "center",
    //     borderRadius: String(3) + "px",
    //     marginLeft: String(greenButtonBetween) + ea,
    //     marginRight: String(greenButtonBetween) + ea,
    //   },
    //   children: [
    //     {
    //       text: wordings.button[1],
    //       style: {
    //         position: "absolute",
    //         top: String(greenButtonTextTop) + ea,
    //         width: String(100) + '%',
    //         left: String(0),
    //         fontSize: String(greenButtonFontSize) + ea,
    //         fontWeight: String(400),
    //         color: colorChip.white,
    //         textAlign: "center",
    //       }
    //     }
    //   ]
    // });

  }

  createNode({
    mother: greenButtonBase,
    class: [ "hoverDefault_lite" ],
    events: [
      {
        type: "click",
        event: paymentEvent("account"),
      }
    ],
    style: {
      display: "inline-block",
      position: "relative",
      width: String(greenButtonWidth) + ea,
      height: String(greenButtonHeight) + ea,
      background: colorChip.green,
      textAlign: "center",
      borderRadius: String(3) + "px",
      marginLeft: String(greenButtonBetween) + ea,
    },
    children: [
      {
        text: wordings.button[2],
        style: {
          position: "absolute",
          top: String(greenButtonTextTop) + ea,
          width: String(100) + '%',
          left: String(0),
          fontSize: String(greenButtonFontSize) + ea,
          fontWeight: String(400),
          color: colorChip.white,
          textAlign: "center",
        }
      }
    ]
  });

  whiteBlock.style.height = "auto";
}

UniversalEstimationJs.prototype.payComplete = async function (data, pythonSend = true) {
  const instance = this;
  const { ajaxJson, returnGet } = GeneralJs;
  const { bill, requestNumber, completeInfo } = this;
  try {
    if (typeof data.MOID !== "string") {
      throw new Error("invaild data");
    }
    const getObj = returnGet();
    const bilid = bill.bilid;
    let year, month, date;
    let to;
    let requestNumber;
    let pastOid;
    let refresh;

    refresh = false;
    pastOid = window.localStorage.getItem("oid");
    if (typeof pastOid === "string") {
      if (pastOid === data.MOID) {
        refresh = true;
      } else {
        refresh = false;
        window.localStorage.setItem("oid", data.MOID);
      }
    } else {
      refresh = false;
      window.localStorage.setItem("oid", data.MOID);
    }

    requestNumber = this.requestNumber;
    if (getObj.request !== undefined) {
      if (!Number.isNaN(Number(getObj.request.replace(/[^0-9]/gi, '')))) {
        requestNumber = Number(getObj.request.replace(/[^0-9]/gi, ''));
      }
    }

    if (!refresh) {
      if (pythonSend) {
        await ajaxJson({ bilid, requestNumber, data }, "/pythonPass_ghostClientBill");
      }
    }

    completeInfo.raw = data;

    if (data.CARD_BankCode !== undefined) {
      completeInfo.method = "card";
    } else {
      year = Number(data.VACT_Date.slice(0, 4));
      month = Number(data.VACT_Date.slice(4, -2).replace(/^0/, '')) - 1;
      date = Number(data.VACT_Date.slice(-2).replace(/^0/, ''));
      to = new Date(year, month, date, 15);
      to.setDate(to.getDate() - 1);
      completeInfo.method = data.REAL_Account === undefined ? "bank" : "real";
      completeInfo.when = to;
      completeInfo.where = {
        bank: data.vactBankName,
        account: data.VACT_Num,
        to: data.VACT_Name,
        input: data.VACT_InputName
      };
      completeInfo.price = Number(data.TotPrice);
    }

    this.completeMode = true;

  } catch (e) {
    await GeneralJs.ajaxJson({ message: "UniversalEstimationJs.payComplete : " + e.message }, "/errorLog");
    window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
    window.location.reload();
  }
}

UniversalEstimationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);
    const { returnGet, ajaxJson, requestPromise } = GeneralJs;
    const getObj = returnGet();
    if (getObj.needs === undefined || getObj.cliid === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    const { needs, cliid } = getObj;
    if (needs.split(',').length !== 4) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    const [ kind, desid, proid, method ] = needs.split(',');
    if (!/^d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(desid) || !/^p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(proid)) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    let clients, client;
    let designers, designer;
    let projects, project;
    let bills, bill;
    let data;
    let totalNum, payNum, cancelNum;
    let clientRequestNumber;

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
    projects = await ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true });
    if (projects.length === 0) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    client = clients[0];
    this.client = client;
    designer = designers[0];
    this.designer = designer;
    project = projects[0];
    this.project = project;

    clientRequestNumber = 0;
    for (let i = 0; i < client.requests.length; i++) {
      if (client.requests[i].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
        clientRequestNumber = i;
        break;
      }
    }
    this.clientRequestNumber = clientRequestNumber;

    bills = await ajaxJson({ mode: "read", whereQuery: { $and: [ { class: kind }, { "links.cliid": cliid }, { "links.desid": desid }, { "links.proid": proid }, { "links.method": method } ] } }, "/pythonPass_generalBill", { equal: true });
    if (bills.length === 0) {
      bills = await ajaxJson({ mode: "read", whereQuery: { $and: [ { class: kind }, { "links.cliid": cliid }, { "links.desid": desid }, { "links.proid": proid }, { "links.method": (/off/gi.test(method) ? "online" : "offline") } ] } }, "/pythonPass_generalBill", { equal: true });
      if (bills.length === 0) {
        alert("결제 안내 문서가 없습니다! 홈리에종에 문의해주세요!");
        window.location.href = this.frontPage;
      }
    }
    if (kind === "style") {
      bill = new StylingBill(bills[0]);
      this.bill = bill;
      this.class = kind;
      this.method = method;
      this.proid = proid;
      this.desid = desid;
      this.cliid = cliid;
    } else {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    this.requestNumber = 0;
    for (let i = 0; i < bill.requests.length; i++) {
      totalNum = 0;
      for (let { amount: { consumer } } of bill.requests[i].items) {
        totalNum += consumer;
      }
      payNum = 0;
      for (let { amount } of bill.requests[i].pay) {
        payNum += amount;
      }
      cancelNum = 0;
      for (let { amount } of bill.requests[i].cancel) {
        cancelNum += amount;
      }
      if (Math.floor(totalNum) > Math.floor(payNum) - Math.floor(cancelNum)) {
        this.requestNumber = i;
      }
    }

    if (getObj.request !== undefined) {
      if (!Number.isNaN(Number(getObj.request.replace(/[^0-9]/gi, '')))) {
        this.requestNumber = Number(getObj.request.replace(/[^0-9]/gi, ''));
      }
    }

    this.request = {
      name: "",
      amount: 0,
    };
    this.completeMode = false;
    this.completeInfo = {};

    this.inicisDeactive = false;
    if (getObj.inicisdeactive === "true") {
      this.inicisDeactive = true;
    }

    if (getObj.mobilecard !== undefined) {
      const { convertingData } = await ajaxJson({
        mode: "mobileCard",
        mid: getObj.mid,
        oid: getObj.oid,
        impId: getObj.imp_uid,
      }, "/inicisPayment");
      if (convertingData.error === "error") {
        window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
      } else {
        await this.payComplete(convertingData, false);
      }
    }

    if (getObj.hash !== undefined) {
      data = await ajaxJson({
        hash: getObj.hash,
        mode: "decrypto",
      }, "/inicisPayment", { equal: true });
      if (typeof getObj.cashphone === "string") {
        await ajaxJson({
          mode: "cashPhone",
          phone: getObj.cashphone,
          hash: getObj.hash,
          bilid: this.bill.bilid,
          proid,
          desid,
          cliid,
          name: client.name,
        }, "/inicisPayment");
        data.cashPhone = getObj.cashphone;
      }
      if (getObj.mode === "complete") {
        await this.payComplete(data, true);
      }
    }
    if (getObj.mode === "fail") {
      window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
    }

    await this.mother.ghostClientLaunching({
      name: "universalEstimation",
      client: client,
      background: 3,
      base: {
        instance: this,
        binaryPath: UniversalEstimationJs.binaryPath,
        subTitle: (this.client.name + " 고객님 결제 안내"),
      },
      local: async () => {
        try {
          instance.insertInitBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "UniversalEstimationJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    if (this.completeMode) {
      const totalContents = document.getElementById("totalcontents");
      GeneralJs.setTimeout(() => {
        totalContents.children[1].style.height = String(totalContents.getBoundingClientRect().height - totalContents.children[totalContents.children.length - 2].getBoundingClientRect().height) + "px";
      }, 0);
    }

    loading.parentNode.removeChild(loading);

  } catch (e) {
    await GeneralJs.ajaxJson({ message: "UniversalEstimationJs.launching : " + e.message }, "/errorLog");
  }
}
