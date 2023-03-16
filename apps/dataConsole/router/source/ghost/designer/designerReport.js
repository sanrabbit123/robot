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
    [ "최고 제안가", 0 ],
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
    proposalAverage[1][1] = autoComma(c) + '원';
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
    [ "최고 소비자가", 0 ]
  ] : [
    [ "총 횟수", 0 ],
    [ "최고 소비자가", 0 ],
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
      c = (contract.process.contract.remain.calculation.amount.consumer >= c ? contract.process.contract.remain.calculation.amount.consumer : c);
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
    contractAverage[1][1] = autoComma(c) + '원';
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
      [ "가산점", 0 ],
      [ String(averagePyeong) + "평 F", 0 ],
      [ String(averagePyeong) + "평 S", 0 ],
      [ String(averagePyeong) + "평 T", 0 ],
    ];
  } else {
    serviceAverage = [
      [ "가산점", 0 ],
      [ String(averagePyeong) + "평 S", 0 ],
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
    serviceAverage[0][1] = String(Math.round((service.alphaPercentage - 1) * 10000) / 100) + '%';
    serviceAverage[1][1] = autoComma(toMoney(service.service.s2011_aa01s.example[averagePyeong].price)) + '원';
    serviceAverage[2][1] = autoComma(toMoney(service.service.s2011_aa02s.example[averagePyeong].price)) + '원';
    serviceAverage[3][1] = autoComma(toMoney(service.service.s2011_aa03s.example[averagePyeong].price)) + '원';
  } else {
    serviceAverage[0][1] = String(Math.round((service.alphaPercentage - 1) * 10000) / 100) + '%';
    serviceAverage[1][1] = autoComma(toMoney(service.service.s2011_aa02s.example[averagePyeong].price)) + '원';
  }

  contents = [
    {
      title: "추천 리포트",
      contents: {
        width: <&&
          [ 40, 140, 100, 220, 160, 160, 160, ] |
          [ 30, 120, 100, 220, 150, 150, 150, ] |
          [ 24, 100, 70, 205, 125, 125, 125, ] |
          [ 16, 90, 55, 155, 105, 105, 105, ] |
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
  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
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

  whiteTongPadding = <%% 12, 12, 10, 8, 1.5 %%>;
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

DesignerReportJs.prototype.insertNoticeBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainContents = [
    {
      title: "금액 산출의 기준",
      contents: [
        "금액 산출은 가산점에 따라 평별 기준 가격에 가산되어 자동적으로 산출됩니다.",
        "평별 기준 가격은 홈리에종의 평균 디자인비 산출 공식에 의해 정해지며, 여러 상황과 조건에 따라 매년 업데이트를 진행하고 있습니다.",
        "가산점의 수치는 디자이너 경력 사항, 포트폴리오, 체크리스트에 따라 종합적으로 정해지며, 각 조건들에 따라 자동적으로 연산되어 산출됩니다.",
        "엑스트라 스타일링의 경우 토탈 스타일링 프리미엄과 개념과 값이 같으므로, 별도로 표기되어 있지 않습니다.",
      ],
    },
    {
      title: "정산 안내",
      contents: [
        "홈리에종에서 받은 서비스비는 수수료를 제하고 스타일링 시작 후 실장님께 선금 50%를 먼저 정산하고",
        "스타일링이 마무리되면 나머지 50%를 정산합니다.",
        "스타일링 마무리는",
        "1) 스타일링 제안이 마무리되어 제품들이 배송단계에 있고",
        "2) 촬영일이 (변동되더라도) 어느정도 정해지고",
        "3) 실장님께서 디자이너의 디자인 의도가 담긴 글(폼을 따로 드립니다) 저희쪽에 주시면",
        "4) 홈리에종에서 고객님께 정산 여부를 확인 후 정산을 진행합니다.",
      ]
    }
  ];
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? margin : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: "block",
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: "안내 사항",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          borderRadius: mobile ? String(1) + ea : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: desktop ? "1px solid " + colorChip.shadow : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(6) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { title, contents } of mainContents) {
    num2 = 0;
    for (let str of contents) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(num2 === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
          marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(6) + ea)
        },
        children: [
          {
            text: (num2 === 0 ? String(num + 1) : ""),
            style: {
              display: desktop ? "inline-block" : "none",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(zeroWidth) + ea,
              marginRight: String(zeroMarginRight) + ea,
              textAlign: "right",
              color: colorChip.green,
            }
          },
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              verticalAlign: "top",
              width: desktop ? String(firstWidth) + ea : String(100) + '%',
              marginBottom: desktop ? "" : String(1.5) + ea,
            },
            children: [
              {
                style: {
                  display: num2 === 0 ? "block" : "none",
                  position: "absolute",
                  top: String(0),
                  left: String(0),
                  height: String(lineTop) + ea,
                  width: withOut(0),
                  borderBottom: desktop ? "1px solid " + colorChip.gray3 : "",
                }
              },
              {
                text: (num2 === 0 ? (desktop ? title : "<b%" + String(num + 1) + "%b>" + blank + title) : ""),
                style: {
                  display: desktop ? "inline-block" : "block",
                  position: "relative",
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(600),
                  lineHeight: String(1.6),
                  color: colorChip.black,
                  textAlign: "left",
                  background: colorChip.white,
                  paddingRight: String(linePadding) + ea,
                },
                bold: {
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(600),
                  color: colorChip.green,
                },
              }
            ]
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(secondWidth) + ea,
              marginRight: String(secondMarginRight) + ea,
              textAlign: desktop ? "right" : "left",
              color: colorChip.green,
            },
          },
          {
            text: str,
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: withOut(desktop ? zeroWidth + zeroMarginRight + firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
          },
        ]
      });

      num2++;
    }
    num++;
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
    let socket;
    let wsLaunching;
    let wsOpenEvent;
    let wsMessageEvent;
    let wsCloseEvent;

    if (getObj.desid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    desid = getObj.desid;

    // if (typeof window.localStorage.getItem("HL_desid") === "string") {
    //   if (window.localStorage.getItem("HL_desid") !== desid) {
    //     GeneralJs.selfHref(FRONTHOST + "/designer/login.php");
    //   }
    // } else {
    //   GeneralJs.selfHref(FRONTHOST + "/designer/login.php");
    // }

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
        if (thisClient.requests[requestNumber].request.space.partial.pyeong === 0) {
          normal.proposal.pyeong = thisClient.requests[requestNumber].request.space.pyeong;
        } else {
          normal.proposal.pyeong = thisClient.requests[requestNumber].request.space.partial.pyeong;
        }
      } else {
        normal.proposal.pyeong = thisClient.requests[requestNumber].request.space.pyeong;
      }
      if (normal.proposal.pyeong === 0) {
        normal.proposal.pyeong = 1;
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
        if (thisClient.requests[requestNumber].request.space.partial.pyeong !== 0) {
          normal.pyeong = thisClient.requests[requestNumber].request.space.partial.pyeong;
        } else {
          normal.pyeong = thisClient.requests[requestNumber].request.space.pyeong;
        }
      } else {
        normal.pyeong = thisClient.requests[requestNumber].request.space.pyeong;
      }
      if (normal.pyeong === 0) {
        normal.pyeong = 1;
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
          instance.insertNoticeBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "DesignerReportJs.launching.ghostDesignerLaunching : " + instance.designer.desid + " : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    // web socket
    socket = {};
    if (!document.hidden) {
      wsOpenEvent = (ws) => {
        return async function () {
          try {
            ws.send(JSON.stringify({
              mode: "register",
              to: "homeliaison",
              data: instance.designer.desid
            }));
          } catch (e) {
            console.log(e);
          }
        }
      }
      wsLaunching = () => {
        let ws;
        if (typeof socket.close === "function") {
          socket.close();
          socket = {};
        }
        ws = new WebSocket(CRONHOST.replace(/https\:\/\//, "wss://") + "/realTimeCommunication");
        ws.addEventListener("open", wsOpenEvent(ws));
        return ws;
      }
      socket = wsLaunching();
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (typeof socket.close === "function") {
          socket.close();
          socket = {};
        }
      } else {
        socket = wsLaunching();
      }
    });

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "DesignerReportJs.launching 에러 일어남 => " + err }, BACKHOST + "/errorLog");
  }
}
