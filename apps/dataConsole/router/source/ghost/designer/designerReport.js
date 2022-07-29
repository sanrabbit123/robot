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

DesignerReportJs.binaryPath = "/middle/console";

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

  proposalMatrix = [
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
  ];

  proposals.sort((a, b) => {
    return b.date.valueOf() - a.date.valueOf();
  });
  z = 0;
  for (let proposal of proposals) {
    tempArr = [];
    tempArr.push(String(z + 1));
    tempArr.push(proposal.name);
    tempArr.push(String(Math.round(proposal.pyeong)) + '평');
    tempArr.push(proposal.service);
    tempArr.push(dateToString(proposal.date));
    tempArr.push(autoComma(proposal.detail.fee.amount) + "원");
    tempArr.push(autoComma(Math.round(proposal.detail.fee.amount / proposal.pyeong)) + "원");
    tempArr.push(proposal.desid.trim() !== "" ? "O" : "X");
    proposalMatrix.push(tempArr);
    z++;
  }

  contractMatrix = [
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
  ];

  contracts.sort((a, b) => {
    return b.process.contract.form.date.from.valueOf() - a.process.contract.form.date.from.valueOf();
  });
  z = 0;
  for (let contract of contracts) {
    if (contract.process.status !== "드랍" && contract.process.status !== "드롭" && contract.process.status !== "홀딩") {
      tempArr = [];
      tempArr.push(String(z + 1));
      tempArr.push(contract.name);
      tempArr.push(contract.serviceName);
      tempArr.push(dateToString(contract.process.contract.form.date.from));
      tempArr.push(autoComma(contract.process.contract.remain.calculation.amount.consumer) + '원');
      tempArr.push(autoComma(contract.process.calculation.payments.totalAmount) + '원');
      tempArr.push(dateToString(contract.process.calculation.payments.first.date));
      tempArr.push(dateToString(contract.process.calculation.payments.remain.date));
      contractMatrix.push(tempArr);
      z++;
    }
  }

  serviceMatrix = [
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
  ];

  for (let z = 0; z < service.service.s2011_aa01s.example.length; z++) {
    tempArr = [];
    tempArr.push(String(z + 1));
    tempArr.push(String(service.service.s2011_aa01s.example[z].pyeong) + '평');
    tempArr.push(autoComma(toMoney(service.service.s2011_aa01s.example[z].price)) + '원');
    tempArr.push(autoComma(toMoney(service.service.s2011_aa01s.example[z].price * service.priceStandard.premium)) + '원');
    tempArr.push(autoComma(toMoney(service.service.s2011_aa02s.example[z].price)) + '원');
    tempArr.push(autoComma(toMoney(service.service.s2011_aa02s.example[z].price * service.priceStandard.premium)) + '원');
    tempArr.push(autoComma(toMoney(service.service.s2011_aa03s.example[z].price)) + '원');
    tempArr.push(autoComma(toMoney(service.service.s2011_aa03s.example[z].price * service.priceStandard.premium)) + '원');
    serviceMatrix.push(tempArr);
  }

  contents = [
    {
      title: "추천 리포트",
      contents: {
        width: [
          40,
          140,
          70,
          200,
          150,
          150,
          150,
          80,
        ],
        matrix: proposalMatrix
      }
    },
    {
      title: "계약 리포트",
      contents: {
        width: [
          40,
          140,
          160,
          130,
          130,
          130,
          130,
          130,
        ],
        matrix: contractMatrix
      }
    },
    {
      title: "평별 가격",
      contents: {
        width: [
          40,
          140,
          130,
          130,
          130,
          130,
          130,
          130,
        ],
        matrix: serviceMatrix
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
  let titleWidth;
  let titleTopNumber;
  let titleFontSize;
  let numberRight;
  let numberBottom;
  let numberSize;
  let numberWeight;
  let finalBottomMargin;
  let mobileBasicMargin;
  let mobileBasePaddingTop;
  let mobileLineTop;
  let maxHeight;

  titleWidth = <%% 300, 160, 140, 120, 30 %%>;
  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleFontSize = <%% 20, 20, 18, 16, 4 %%>;

  numberRight = <%% 12, 12, 12, 12, 2 %%>;
  numberSize = <%% 15, 15, 15, 14, 3 %%>;
  numberWeight = <%% 600, 600, 600, 600, 600 %%>;
  numberBottom = <%% 62, 62, 62, 62, 6 %%>;

  finalBottomMargin = <%% 55, 55, 55, 55, 0 %%>;

  mobileLineTop = isIphone() ? 2.7 : 2.5;
  mobileBasePaddingTop = 7;
  mobileBasicMargin = 7;

  maxHeight = <%% 972, 972, 972, 972, 972 %%>;

  return createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      paddingTop: desktop ? "" : String(mobileBasePaddingTop) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          width: desktop ? String(titleWidth) + ea : withOut(mobileBasicMargin * 2, ea),
          verticalAlign: "top",
          marginLeft: desktop ? "" : String(mobileBasicMargin) + ea,
          marginBottom: desktop ? "" : String(4) + ea,
        },
        children: [
          {
            style: {
              display: desktop ? "none" : "block",
              position: "absolute",
              top: String(0),
              width: withOut(0),
              left: String(0),
              height: String(mobileLineTop) + ea,
              borderBottom: "1px dashed " + colorChip.green,
            }
          },
          {
            text: title,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(700),
              background: colorChip.white,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          overflow: "hidden",
          width: desktop ? withOut(titleWidth, ea) : withOut(mobileBasicMargin * 2, ea),
          verticalAlign: "top",
          top: String(titleTopNumber) + ea,
          maxHeight: String(maxHeight) + ea,
          marginBottom: String(finalBottomMargin) + ea,
          marginLeft: desktop ? "" : String(mobileBasicMargin) + ea,
        }
      },
      {
        text: "전체 보기",
        style: {
          position: "absolute",
          fontSize: String(numberSize) + ea,
          fontWeight: String(numberWeight),
          color: colorChip.deactive,
          bottom: String(numberBottom) + ea,
          left: String(0),
        }
      }
    ]
  });

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

  blockHeight = <%% 38, 38, 38, 38, 6 %%>;
  blockMarginBottom = <%% 16, 15, 15, 12, 2.5 %%>;

  circleBoxWidth = <%% 16, 16, 16, 14, 2.8 %%>;
  circleWidth = <%% 5, 5, 5, 4, 1 %%>;
  circleTop = <%% 1, 1, 1, 1, 0 %%>;

  contentsSize = <%% 15, 15, 15, 14, 3.4 %%>;
  contentsWeight0 = <%% 600, 600, 600, 600, 600 %%>;
  contentsWeight1 = <%% 400, 400, 400, 400, 400 %%>;

  firstWidth = <%% 180, 160, 140, 120, 23 %%>;
  factorBetween = <%% 8, 8, 8, 8, 1.5 %%>;

  titlePaddingBottom = <%% 5, 5, 5, 5, 5 %%>;
  titleMarginBottom = <%% 11, 11, 11, 11, 11 %%>;

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
              color: y === 0 ? colorChip.deactive : colorChip.black,
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

      normal = equalJson(JSON.stringify(obj));
      thisClient = totalClient.find((obj) => { return obj.cliid === normal.cliid });

      normal.proposal.name = thisClient.name;

      if (thisClient.requests[0].request.space.partial.boo) {
        normal.proposal.pyeong = thisClient.requests[0].request.space.partial.pyeong;
      } else {
        normal.proposal.pyeong = thisClient.requests[0].request.space.pyeong;
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

      normal = equalJson(JSON.stringify(obj));
      thisClient = totalClient.find((obj) => { return obj.cliid === normal.cliid });

      normal.name = thisClient.name;
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
