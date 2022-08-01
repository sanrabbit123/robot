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
      "return ('디자이너 종합 리포트 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('디자이너 종합 리포트 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "designerReport",
  "hangul": "디자이너 종합 리포트",
  "route": [
    "designerReport"
  ]
} %/%/g

const DesignerReportJs = function () {
  this.mother = new GeneralJs();
}

DesignerReportJs.binaryPath = FRONTHOST + "/middle/console/report";

DesignerReportJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let quoteWidth;
  let quoteHeight;
  let titleFontSize, titleFontWeight;
  let serviceChildren;
  let searchTags;
  let titleWording;
  let servicePaddingLeft;
  let serviceSize;
  let serviceBlockPaddingTop;
  let whiteBlockPaddingTop, whiteBlockPaddingBottom;
  let quotoTongHeight;
  let searchBarPaddingTop;
  let searchBarHeight;
  let searchBarWidth;
  let searchIconHeight;
  let searchIconRight, searchIconTop;
  let whiteBlockMarginBottom;
  let inputWithoutHeight;
  let serviceButtonClassName;
  let serviceBlock;
  let inputSize, inputWeight;
  let placeholder;
  let titleTop;
  let servicePaddingTop, servicePaddingBottom;
  let serviceMarginRight;
  let subTitleMarginTop, subTitleFontSize, subTitleWeight;
  let subTitleContents;
  let middleBox;
  let tagTextTop;
  let tagTongBottom;
  let boxTopVisual;
  let mobileBlockTop;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 90, 80, 74, 60, 14.5 %%>;

  quoteHeight = <%% 15, 15, 15, 15, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 35, 33, 32, 30, 6.4 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  servicePaddingBottom = <%% 10, 10, 10, 10, 10 %%>;
  servicePaddingLeft = <%% 13, 13, 13, 12, 2.2 %%>;
  serviceMarginRight = <%% 6, 6, 6, 6, 6 %%>;
  serviceSize = <%% 13, 13, 13, 12, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 11 %%>;

  searchBarPaddingTop = <%% 220, 220, 192, 164, 12.5 %%>;
  searchBarHeight = <%% 40, 40, 40, 36, 8 %%>;
  searchBarWidth = <%% 690, 516, 516, 420, 88 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 15, 15, 15, 14, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  subTitleMarginTop = <%% 2, 2, 1, 1, 0.2 %%>;
  subTitleFontSize = <%% 16, 16, 16, 15, 3.2 %%>;
  subTitleWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.3 %%>;
  tagTongBottom = <%% 3, 3, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  titleWording = "디자이너 리포트";
  subTitleContents = "디자이너 추천, 계약, 가격에 대한 보고서";

  mobileBlockTop = 4.5;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      marginBottom: String(whiteBlockMarginBottom) + ea,
      top: String(-1 * boxTopVisual) + ea,
      paddingTop: desktop ? "" : String(mobileBlockTop) + ea,
    }
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      height: String(quotoTongHeight) + ea,
      opacity: String(0.6),
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.serifAsterisk(colorChip.white),
        style: {
          display: "inline-block",
          height: String(quoteHeight) + ea,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        text: titleWording,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(titleTop) + ea,
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: String(subTitleMarginTop) + ea,
    },
    children: [
      {
        text: subTitleContents,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(0) + ea,
          fontSize: String(subTitleFontSize) + ea,
          fontWeight: String(subTitleWeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

DesignerReportJs.prototype.contentsCenter = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const { designer, proposals, contracts, service } = this;
  const { desid } = designer;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, autoHypenPhone } = GeneralJs;
  const toMoney = (num) => { return Math.floor(num / 1000) * 1000; }
  let contents;
  let proposalMatrix;
  let contractMatrix;
  let serviceMatrix;
  let tempArr;
  let z;
  let proposalAverage;
  let contractAverage;
  let serviceAverage;
  let a, b, c, d;
  let averagePyeong;

  proposalMatrix = (desktop ? [
    [
      "",
      "고객",
      "평수",
      "서비스",
      "제안 날짜",
      "제안 금액",
      "평단가",
      "계약 여부",
    ]
  ] : [
    [
      "고객",
      "평수",
      "제안 날짜",
      "제안 금액",
      "평단가",
    ]
  ]);

  proposalAverage = (desktop ? [
    [ "총 제안 횟수", 0 ],
    [ "평균 평수", 0 ],
    [ "평균 평단가", 0 ],
    [ "최고 제안가", 0 ]
  ] : [
    [ "총 횟수", 0 ],
    [ "평균 평단가", 0 ],
  ]);

  proposals.sort((a, b) => {
    return b.date.valueOf() - a.date.valueOf();
  });
  z = 0;
  a = 0;
  b = 0;
  c = 0;
  d = 0;
  for (let proposal of proposals) {
    tempArr = [];

    if (desktop) {
      tempArr.push(String(z + 1));
    }
    tempArr.push(proposal.name);
    tempArr.push(String(Math.round(proposal.pyeong)) + '평');
    if (desktop) {
      tempArr.push(proposal.service);
    }
    tempArr.push(dateToString(proposal.date));
    tempArr.push(autoComma(proposal.detail.fee.amount) + "원");
    tempArr.push(autoComma(Math.round(proposal.detail.fee.amount / proposal.pyeong)) + "원");
    if (desktop) {
      tempArr.push(proposal.desid.trim() !== "" ? "O" : "X");
    }
    proposalMatrix.push(tempArr);

    a += proposal.pyeong;
    if (Math.round(proposal.detail.fee.amount / proposal.pyeong) >= 50000) {
      b += Math.round(proposal.detail.fee.amount / proposal.pyeong);
      d++;
    }
    c = (proposal.detail.fee.amount >= c ? proposal.detail.fee.amount : c);

    z++;
  }

  if (desktop) {
    proposalAverage[0][1] = String(z) + '회';
    proposalAverage[1][1] = String(z !== 0 ? Math.round(a / z) : 0) + '평';
    proposalAverage[2][1] = autoComma(d !== 0 ? Math.round(b / d) : 0) + '원';
    proposalAverage[3][1] = autoComma(c) + '원';
  } else {
    proposalAverage[0][1] = String(z) + '회';
    proposalAverage[1][1] = autoComma(d !== 0 ? Math.round(b / d) : 0) + '원';
  }

  contractMatrix = (desktop ? [
    [
      "",
      "고객",
      "서비스",
      "시작일",
      "소비자가",
      "정산 금액",
      "선금 정산일",
      "잔금 정산일",
    ]
  ] : [
    [
      "고객",
      "소비자가",
      "정산 금액",
      "선금 정산",
      "잔금 정산",
    ]
  ]);

  contractAverage = (desktop ? [
    [ "총 계약 횟수", 0 ],
    [ "평균 평수", 0 ],
    [ "평균 소비자가", 0 ],
    [ "최고 정산가", 0 ]
  ] : [
    [ "총 횟수", 0 ],
    [ "평균 소비자가", 0 ],
  ]);

  contracts.sort((a, b) => {
    return b.process.contract.form.date.from.valueOf() - a.process.contract.form.date.from.valueOf();
  });
  z = 0;
  a = 0;
  b = 0;
  c = 0;
  d = 0;
  for (let contract of contracts) {
    if (contract.process.status !== "드랍" && contract.process.status !== "드롭" && contract.process.status !== "홀딩") {
      tempArr = [];

      if (desktop) {
        tempArr.push(String(z + 1));
      }
      tempArr.push(contract.name);
      if (desktop) {
        tempArr.push(contract.serviceName);
        tempArr.push(dateToString(contract.process.contract.form.date.from));
      }
      tempArr.push(autoComma(contract.process.contract.remain.calculation.amount.consumer) + '원');
      tempArr.push(autoComma(contract.process.calculation.payments.totalAmount) + '원');
      if (desktop) {
        tempArr.push(dateToString(contract.process.calculation.payments.first.date));
        tempArr.push(dateToString(contract.process.calculation.payments.remain.date));
      } else {
        tempArr.push(dateToString(contract.process.calculation.payments.first.date).slice(2));
        tempArr.push(dateToString(contract.process.calculation.payments.remain.date).slice(2));
      }
      contractMatrix.push(tempArr);

      a += contract.pyeong;
      b += contract.process.contract.remain.calculation.amount.consumer;
      c = (contract.process.calculation.payments.totalAmount >= c ? contract.process.calculation.payments.totalAmount : c);
      z++;
    }
  }

  if (desktop) {
    contractAverage[0][1] = String(z) + '회';
    contractAverage[1][1] = String(z !== 0 ? Math.round(a / z) : 0) + '평';
    contractAverage[2][1] = autoComma(z !== 0 ? Math.round(b / z) : 0) + '원';
    contractAverage[3][1] = autoComma(c) + '원';
  } else {
    contractAverage[0][1] = String(z) + '회';
    contractAverage[1][1] = autoComma(z !== 0 ? Math.round(b / z) : 0) + '원';
  }

  if ((z !== 0 ? Math.round(a / z) : 0) === 0) {
    averagePyeong = 34;
  } else {
    averagePyeong = Math.round(a / z);
  }

  serviceMatrix = (desktop ? [
    [
      "",
      "평수",
      "홈퍼니싱(B)",
      "홈퍼니싱(P)",
      "홈스타일링(B)",
      "홈스타일링(P)",
      "토탈 스타일링(B)",
      "토탈 스타일링(P)",
    ]
  ] : [
    [
      "평수",
      "홈퍼니싱",
      "홈스타일링",
      "토탈 스타일링",
    ]
  ]);

  if (desktop) {
    serviceAverage = [
      [ String(averagePyeong) + "평 홈퍼니싱", 0 ],
      [ String(averagePyeong) + "평 홈스타일링", 0 ],
      [ String(averagePyeong) + "평 토탈 스타일링", 0 ],
    ];
  } else {
    serviceAverage = [
      [ String(averagePyeong) + "평 홈스타일링", 0 ],
    ];
  }

  a = 0;
  b = 0;
  c = 0;
  d = 0;
  for (let z = 0; z < service.service.s2011_aa01s.example.length; z++) {
    tempArr = [];
    if (desktop) {
      tempArr.push(String(z + 1));
    }
    tempArr.push(String(service.service.s2011_aa01s.example[z].pyeong) + '평');
    tempArr.push(autoComma(toMoney(service.service.s2011_aa01s.example[z].price)) + '원');
    if (desktop) {
      tempArr.push(autoComma(toMoney(service.service.s2011_aa01s.example[z].price * service.priceStandard.premium)) + '원');
    }
    tempArr.push(autoComma(toMoney(service.service.s2011_aa02s.example[z].price)) + '원');
    if (desktop) {
      tempArr.push(autoComma(toMoney(service.service.s2011_aa02s.example[z].price * service.priceStandard.premium)) + '원');
    }
    tempArr.push(autoComma(toMoney(service.service.s2011_aa03s.example[z].price)) + '원');
    if (desktop) {
      tempArr.push(autoComma(toMoney(service.service.s2011_aa03s.example[z].price * service.priceStandard.premium)) + '원');
    }
    serviceMatrix.push(tempArr);
  }

  if (desktop) {
    serviceAverage[0][1] = autoComma(toMoney(service.service.s2011_aa01s.example[averagePyeong].price)) + '원';
    serviceAverage[1][1] = autoComma(toMoney(service.service.s2011_aa02s.example[averagePyeong].price)) + '원';
    serviceAverage[2][1] = autoComma(toMoney(service.service.s2011_aa03s.example[averagePyeong].price)) + '원';
  } else {
    serviceAverage[0][1] = autoComma(toMoney(service.service.s2011_aa02s.example[averagePyeong].price)) + '원';
  }

  contents = [
    {
      title: "추천 리포트",
      contents: {
        width: <&&
          [ 40, 140, 70, 200, 150, 150, 150, 80, ] |
          [ 30, 120, 70, 200, 140, 140, 140, 80, ] |
          [ 24, 100, 60, 170, 120, 120, 120, 60, ] |
          [ 16, 90, 50, 140, 95, 95, 95, 50, ] |
          [ 10, 10, 19, 19, 16 ]
        &&>,
        matrix: proposalMatrix,
        average: proposalAverage,
      }
    },
    {
      title: "계약 리포트",
      contents: {
        width: <&&
          [ 40, 140, 160, 130, 130, 130, 130, 130, ] |
          [ 30, 120, 148, 127, 127, 127, 127, 127, ] |
          [ 24, 100, 130, 109, 109, 109, 109, 109, ] |
          [ 16, 90, 122, 81, 81, 81, 81, 81, ] |
          [ 10, 18, 18, 14, 14 ]
        &&>,
        matrix: contractMatrix,
        average: contractAverage,
      }
    },
    {
      title: "평별 가격",
      contents: {
        width: <&&
          [ 40, 140, 130, 130, 130, 130, 130, 130, ] |
          [ 30, 120, 129, 129, 129, 129, 129, 129, ] |
          [ 24, 100, 112, 112, 112, 112, 112, 112, ] |
          [ 16, 90, 88, 88, 88, 88, 88, 88, ] |
          [ 10, 21, 21, 21 ]
        &&>,
        matrix: serviceMatrix,
        average: serviceAverage,
      }
    },
  ];
  this.contents = contents;
  for (let i = 0; i < contents.length; i++) {
    this.renderWhite(contents[i].title, contents[i].contents, i + 1);
  }

}

DesignerReportJs.prototype.renderWhite = function (title, contents, index) {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  let whiteBlock, whiteTong;
  let block;
  let leftPadding;
  let topPadding0;
  let topPadding1;
  let marginBottom;

  leftPadding = <%% 55, 55, 47, 39, 4.7 %%>;

  topPadding0 = <%% 52, 52, 44, 36, 4.7 %%>;
  topPadding1 = <%% 40, 40, 38, 32, 4.7 %%>;

  marginBottom = <%% 16, 16, 16, 12, 3 %%>;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: desktop ? String(topPadding0) + ea : "",
      paddingBottom: desktop ? String(leftPadding) + ea : "",
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
      marginBottom: String(marginBottom) + ea,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(leftPadding * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? leftPadding : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.children[0];

  block = this.renderTong(title, whiteTong, index);
  this.renderBlock(contents, block.children[1], index - 1);
}

DesignerReportJs.prototype.renderTong = function (title, whiteTong, index) {
  const instance = this;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma } = GeneralJs;
  const maxHeightTargetClassName = "maxHeightTargetClassName";
  let titleWidth;
  let titleTopNumber;
  let titleFontSize;
  let titlePaddingRight;
  let numberBottom;
  let numberSize;
  let numberWeight;
  let mobileBasicMargin;
  let mobileBasePaddingTop;
  let mobileLineTop;
  let maxHeight;
  let titleMarginBottom;
  let resultTong;
  let totalViewEvent;
  let numberTop;

  titleWidth = <%% 300, 160, 140, 120, 30 %%>;
  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleFontSize = <%% 20, 21, 19, 17, 4 %%>;
  titleMarginBottom = <%% 24, 24, 20, 16, 2.8 %%>;
  titlePaddingRight = <%% 12, 10, 10, 8, 2 %%>;

  numberSize = <%% 15, 12, 12, 11, 2.5 %%>;
  numberWeight = <%% 600, 600, 600, 600, 600 %%>;
  numberBottom = <%% (isMac() ? 8 : 6), 8, 8, 8, 6 %%>;
  numberTop = <%% 8, 2, 2, 2, 0 %%>;

  mobileLineTop = isIphone() ? 2.7 : 2.5;
  mobileBasePaddingTop = 7;
  mobileBasicMargin = 7;

  maxHeight = <%% 962, 940, 834, 680, 107 %%>;

  totalViewEvent = function (e) {
    const index = this.getAttribute("index");
    const toggle = this.getAttribute("toggle");
    if (toggle === "off") {
      document.querySelector('.' + maxHeightTargetClassName + String(index)).style.maxHeight = "";
      this.setAttribute("toggle", "on");
      this.style.color = colorChip.green;
    } else {
      document.querySelector('.' + maxHeightTargetClassName + String(index)).style.maxHeight = String(maxHeight) + ea;
      this.setAttribute("toggle", "off");
      this.style.color = colorChip.deactive;
    }
  }

  resultTong = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      paddingTop: desktop ? "" : String(mobileBasePaddingTop) + ea,
      paddingBottom: desktop ? "" : String(mobileBasePaddingTop) + ea,
    },
    children: [
      {
        style: {
          display: media[0] ? "inline-block" : "block",
          position: "relative",
          width: media[0] ? String(titleWidth) + ea : (desktop ? "" : withOut(mobileBasicMargin * 2, ea)),
          verticalAlign: "top",
          marginLeft: desktop ? "" : String(mobileBasicMargin) + ea,
          marginBottom: media[0] ? "" : String(titleMarginBottom) + ea,
        },
        children: [
          {
            text: title,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(700),
              background: colorChip.white,
              paddingRight: String(titlePaddingRight) + ea,
              color: colorChip.black,
              verticalAlign: "baseline"
            }
          },
        ]
      },
      {
        class: [ maxHeightTargetClassName + String(index) ],
        style: {
          display: media[0] ? "inline-block" : "block",
          position: "relative",
          overflow: "hidden",
          width: media[0] ? withOut(titleWidth, ea) : (desktop ? "" : withOut(mobileBasicMargin * 2, ea)),
          verticalAlign: "top",
          top: String(titleTopNumber) + ea,
          maxHeight: String(maxHeight) + ea,
          marginLeft: desktop ? "" : String(mobileBasicMargin) + ea,
        }
      },
    ]
  });

  if (media[0]) {
    createNode({
      mother: resultTong,
      text: "전체 보기",
      attribute: { toggle: "off", index: String(index) },
      event: { click: totalViewEvent },
      style: {
        display: "inline-block",
        position: "absolute",
        fontSize: String(numberSize) + ea,
        fontWeight: String(numberWeight),
        color: colorChip.deactive,
        bottom: String(numberBottom) + ea,
        left: String(0),
        cursor: "pointer",
      }
    });
  } else {
    createNode({
      mother: resultTong.children[0],
      text: "전체 보기",
      attribute: { toggle: "off", index: String(index) },
      event: { click: totalViewEvent },
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(numberSize) + ea,
        fontWeight: String(numberWeight),
        color: colorChip.deactive,
        verticalAlign: "baseline",
        cursor: "pointer",
        top: desktop ? (isMac() ? "" : String(numberTop) + ea) : "",
      }
    });

  }

  return resultTong;
}

DesignerReportJs.prototype.renderBlock = function (contents, tong, x) {
  const instance = this;
  const { ea, baseTong, media, designer } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma } = GeneralJs;
  const removePopupTargetClassName = "removePopupTargetClassName";
  const menuTargetClassName = "menuTargetClassName";
  const tendencyBarTargetClassName = "tendencyBarTargetClassName";
  const blank = big ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : "&nbsp;&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;&nbsp;";
  let blockHeight;
  let blockMarginBottom;
  let circleBoxWidth;
  let circleWidth;
  let circleTop;
  let contentsSize;
  let contentsWeight0;
  let contentsWeight1;
  let firstWidth;
  let baseBlock;
  let circleBlock, propertyBlock, valueBlock;
  let divideNumber;
  let num;
  let factorBetween;
  let tendencyTong;
  let tendencyBlockTop;
  let tendencyBlockWidth;
  let tendencyBlockHeight;
  let tendencyValueConst;
  let y, z;
  let value;
  let tendencyMinusRatio;
  let blockBase;
  let titlePaddingBottom;
  let titleMarginBottom;
  let whiteTongPadding;
  let whiteTongMarginBottom;
  let whiteTongHeight;
  let whiteSize, whiteWeight, whiteBoldWeight;
  let whiteTextTop;
  let whiteWording;
  let whiteWordingArr;

  blockHeight = <%% 38, 38, 34, 28, 6 %%>;
  blockMarginBottom = <%% 16, 15, 15, 12, 2.5 %%>;

  circleBoxWidth = <%% 16, 16, 16, 14, 2.8 %%>;
  circleWidth = <%% 5, 5, 5, 4, 1 %%>;
  circleTop = <%% 1, 1, 1, 1, 0 %%>;

  contentsSize = <%% 15, 15, 14, 12, 2.7 %%>;
  contentsWeight0 = <%% 600, 600, 600, 600, 600 %%>;
  contentsWeight1 = <%% 400, 400, 400, 400, 400 %%>;

  firstWidth = <%% 180, 160, 140, 120, 23 %%>;
  factorBetween = <%% 8, 8, 8, 8, 1.5 %%>;

  titlePaddingBottom = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 3 : 2), 1.5 %%>;
  titleMarginBottom = <%% (isMac() ? 11 : 12), (isMac() ? 11 : 12), (isMac() ? 10 : 11), (isMac() ? 9 : 10), 1.5 %%>;

  whiteTongPadding = <%% 16, 12, 10, 8, 2 %%>;
  whiteTongMarginBottom = <%% 24, 20, 16, 10, 3 %%>;
  whiteTongHeight = <%% 85, 82, 68, 54, 11.6 %%>;

  whiteSize = <%% 19, 19, 16, 14, 3.2 %%>;
  whiteWeight = <%% 200, 200, 200, 200, 200 %%>;
  whiteBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  whiteTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;

  whiteWordingArr = [];
  for (let [ property, value ] of contents.average) {
    whiteWording = '';
    whiteWording += property;
    whiteWording += " :&nbsp;&nbsp;<b%";
    whiteWording += value;
    whiteWording += "%b>";
    whiteWordingArr.push(whiteWording);
  }
  whiteWording = whiteWordingArr.join(blank);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(5) + "px",
      background: colorChip.gray1,
      paddingTop: String(whiteTongPadding) + ea,
      paddingBottom: String(whiteTongPadding) + ea,
      marginBottom: String(whiteTongMarginBottom) + ea,
    },
    children: [
      {
        style: {
          display: "inline-flex",
          position: "relative",
          marginLeft: String(whiteTongPadding) + ea,
          width: withOut(whiteTongPadding * 2, ea),
          height: String(whiteTongHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 3px 12px -9px " + colorChip.shadow,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        },
        children: [
          {
            text: whiteWording,
            style: {
              top: String(whiteTextTop) + ea,
              display: "inline-block",
              position: "relative",
              fontSize: String(whiteSize) + ea,
              fontWeight: String(whiteWeight),
              color: colorChip.black,
            },
            bold: {
              fontSize: String(whiteSize) + ea,
              fontWeight: String(whiteBoldWeight),
              color: colorChip.green,
            },
            under: {
              fontSize: String(whiteSize) + ea,
              fontWeight: String(whiteWeight),
              color: colorChip.gray3,
            }
          }
        ]
      }
    ]
  })

  z = 0;
  for (let arr of contents.matrix) {
    blockBase = createNode({
      mother: tong,
      style: {
        display: "block",
        position: "relative",
        borderBottom: z === 0 ? "1px solid " + colorChip.black : "",
        paddingBottom: z === 0 ? String(titlePaddingBottom) + ea : "",
        marginBottom: z === 0 ? String(titleMarginBottom) + ea : "",
      }
    });

    y = 0;
    for (let str of arr) {
      createNode({
        mother: blockBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(contents.width[y]) + ea,
          height: String(blockHeight) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        },
        children: [
          {
            text: str,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsSize) + ea,
              fontWeight: String(z === 0 ? contentsWeight0 : contentsWeight1),
              color: desktop ? (y === 0 ? colorChip.deactive : colorChip.black) : colorChip.black,
            }
          }
        ]
      });
      y++;
    }

    z++;
  }
}

DesignerReportJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, equalJson, serviceParsing } = GeneralJs;
    const getObj = returnGet();
    let proposals, contracts;
    let desid;

    if (getObj.desid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    desid = getObj.desid;

    const servicePrice = await ajaxJson({ desid }, BACKHOST + "/designerFeeTable", { equal: true });
    const { totalClient, contractProjects, proposalProjects, designer } = await ajaxJson({ desid }, SECONDHOST + "/designerProjects", { equal: true });

    this.designer = designer;

    proposals = proposalProjects.map((obj) => {
      let normal;
      let thisClient;
      let feeTarget;
      let requestNumber;
      let proposalDate;

      normal = equalJson(JSON.stringify(obj));
      thisClient = totalClient.find((obj) => { return obj.cliid === normal.cliid });
      requestNumber = 0;
      proposalDate = obj.proposal.date.valueOf();
      for (let i = 0; i < thisClient.requests.length; i++) {
        if (i === 0) {
          if (proposalDate >= thisClient.requests[i].request.timeline.valueOf()) {
            requestNumber = i;
          }
        } else {
          if (proposalDate <= thisClient.requests[i - 1].request.timeline.valueOf() && proposalDate >= thisClient.requests[i].request.timeline.valueOf()) {
            requestNumber = i;
          }
        }
      }

      normal.proposal.name = thisClient.name;

      if (thisClient.requests[requestNumber].request.space.partial.boo) {
        normal.proposal.pyeong = thisClient.requests[requestNumber].request.space.partial.pyeong;
      } else {
        normal.proposal.pyeong = thisClient.requests[requestNumber].request.space.pyeong;
      }

      normal.proposal.proid = normal.proid;
      normal.proposal.cliid = normal.cliid;
      normal.proposal.desid = normal.desid;

      normal.proposal.service = serviceParsing(normal.service).replace(/[a-zA-Z]/gi, '').trim();
      normal.proposal.detail = normal.proposal.detail.filter((o) => { return o.desid === desid })[0];

      if (normal.proposal.detail.fee.length === 1) {
        normal.proposal.detail.fee = normal.proposal.detail.fee[0];
      } else if (normal.proposal.detail.fee.length > 1) {
        feeTarget = null;
        if (normal.service.online) {
          feeTarget = normal.proposal.detail.fee.find((o) => { return /online/gi.test(o.method) })
        } else {
          feeTarget = normal.proposal.detail.fee.find((o) => { return /offline/gi.test(o.method) })
        }
        if (feeTarget !== null && feeTarget !== undefined) {
          normal.proposal.detail.fee = feeTarget;
        } else {
          normal.proposal.detail.fee = normal.proposal.detail.fee[0];
        }
      } else {
        normal.proposal.detail.fee = { amount: 0 };
      }

      return normal.proposal;
    });

    contracts = contractProjects.map((obj) => {
      let normal;
      let thisClient;
      let feeTarget;
      let requestNumber;
      let proposalDate;

      normal = equalJson(JSON.stringify(obj));
      thisClient = totalClient.find((obj) => { return obj.cliid === normal.cliid });
      requestNumber = 0;
      proposalDate = obj.proposal.date.valueOf();
      for (let i = 0; i < thisClient.requests.length; i++) {
        if (i === 0) {
          if (proposalDate >= thisClient.requests[i].request.timeline.valueOf()) {
            requestNumber = i;
          }
        } else {
          if (proposalDate <= thisClient.requests[i - 1].request.timeline.valueOf() && proposalDate >= thisClient.requests[i].request.timeline.valueOf()) {
            requestNumber = i;
          }
        }
      }

      normal.name = thisClient.name;
      if (thisClient.requests[requestNumber].request.space.partial.boo) {
        normal.pyeong = thisClient.requests[requestNumber].request.space.partial.pyeong;
      } else {
        normal.pyeong = thisClient.requests[requestNumber].request.space.pyeong;
      }
      normal.serviceName = serviceParsing(normal.service).replace(/[a-zA-Z]/gi, '').trim();

      return normal;
    });

    this.proposals = proposals;
    this.contracts = contracts;
    this.service = servicePrice;

    await this.mother.ghostDesignerLaunching({
      name: "designerReport",
      designer: this.designer,
      base: {
        instance: this,
        binaryPath: DesignerReportJs.binaryPath,
        subTitle: "",
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.contentsCenter();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "DesignerReportJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "DesignerReportJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
