const CalculationJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
}

CalculationJs.prototype.baseMaker = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate } = GeneralJs;
  let outerMargin;
  let innerPadding;
  let grayBack;
  let grayTong;
  let blockHeight;
  let blockMargin;
  let baseBlock;
  let targetTong;
  let textTop;
  let textSize;
  let minimumBetween;
  let barWidth, barMargin;
  let motherBlock;
  let alarmCircleRadius;
  let buttonSize, buttonWeight, buttonTextTop;
  let buttonHeight, buttongTop;
  let buttonList;
  let buttonWidth;
  let num;
  let buttonBetween;
  let nameWidth, designerWidth, idWidth, requestWidth, responseWidth;
  let contentsLoad;
  let requestTable, responseTable;
  let requestBlock, responseBlock;
  let tableBlockHeight;
  let tableBlockFactorWidth;
  let tableBetween;
  let firstMargin;
  let tableSize, tableWeight, tableBoldWeight;
  let tableTextTop;
  let requestColumns, responseColumns;
  let thisRequest, thisResponse;
  let currentState;
  let confirmState;
  let requestName, responseName;
  let payDate, cancelAmount, cancelDate;
  let requestValueArr;
  let tableValueBlockHeight;
  let blockVisualPadding;
  let responseValueArr;
  let payAmount, nonPayAmount;
  let refundAmount;
  let requestSumConsumer, requestSumConfirm, requestSumRefund;
  let requestSumIncome;
  let responseSumTotal, responseSumNon, responseSumPaid, responseSumRefund;
  let mainColumns;
  let tempArr;
  let emptyRow;
  let startRow;
  let matrixColumns;
  let requestLength, responseLength, longLength;
  let requestArr, responseArr;

  mainColumns = [
    "아이디",
    "고객",
    "디자이너",
    "상태",
    "매출",
    "매입",
  ];
  requestColumns = [
    "구분",
    "소비자가",
    "확정가",
    "입금일",
    "환불액",
    "환불일",
  ];
  responseColumns = [
    "구분",
    "총액",
    "미지급액",
    "지급액",
    "지급일",
    "환수액",
  ];
  matrixColumns = [
    "아이디",
    "고객",
    "디자이너",
    "상태",
    "매출",
    "",
    "",
    "",
    "",
    "",
    "매입",
    "",
    "",
    "",
    "",
    "",
  ];
  startRow = [
    "",
    "",
    "",
    "",
    "구분",
    "소비자가",
    "확정가",
    "입금일",
    "환불액",
    "환불일",
    "구분",
    "총액",
    "미지급액",
    "지급액",
    "지급일",
    "환수액",
  ];
  emptyRow = (new Array(matrixColumns.length)).fill("");
  this.matrix = [ matrixColumns ];

  outerMargin = 30;
  innerPadding = 20;

  blockHeight = 43;
  blockMargin = 1;

  textTop = (isMac() ? 10 : 12);
  textSize = 14;

  barWidth = 4;
  barMargin = 6;

  firstMargin = 20;
  minimumBetween = 12;

  alarmCircleRadius = 8;

  tableBlockHeight = 34;
  tableValueBlockHeight = 28;
  tableBlockFactorWidth = 120;
  tableBetween = 20;

  blockVisualPadding = 8;

  nameWidth = 50;
  designerWidth = 60;
  idWidth = 82;
  requestWidth = tableBlockFactorWidth * requestColumns.length;
  responseWidth = tableBlockFactorWidth * responseColumns.length;

  tableSize = 13;
  tableWeight = 400;
  tableBoldWeight = 700;
  tableTextTop = (isMac() ? -2 : 0);

  contentsLoad = () => {};

  buttonList = [];

  grayBack = createNode({
    mother: totalContents,
    style: {
      position: "fixed",
      top: String(outerMargin) + ea,
      left: String(outerMargin) + ea,
      width: withOut(outerMargin * 2, ea),
      height: withOut((outerMargin * 2) + belowHeight, ea),
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
    },
    children: [
      {
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          display: "block",
          width: withOut(0, ea),
          height: withOut(0, ea),
        },
        children: [
          {
            style: {
              position: "absolute",
              top: String(innerPadding) + ea,
              left: String(innerPadding) + ea,
              width: withOut(innerPadding * 2, ea),
              height: withOut(innerPadding * 2, ea),
              overflow: "scroll",
            },
            children: [
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                }
              }
            ]
          }
        ]
      }
    ]
  });

  grayTong = grayBack.firstChild.firstChild.firstChild;

  // column

  contentsLoad = () => {

    cleanChildren(grayTong);

    motherBlock = createNode({
      mother: grayTong,
      style: {
        display: "block",
        position: "sticky",
        top: String(0),
        zIndex: String(1),
        height: String(blockHeight) + ea,
        width: withOut(0, ea),
        overflow: "hidden",
        borderRadius: String(5) + "px",
        marginBottom: String(blockMargin) + ea,
      }
    });

    baseBlock = createNode({
      mother: motherBlock,
      style: {
        display: "inline-block",
        width: withOut(0, ea),
        position: "relative",
        height: String(blockHeight) + ea,
        background: colorChip.gradientGray,
        backdropFilter: "blur(4px)",
        borderRadius: String(5) + "px",
        verticalAlign: "top",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: String(8000) + ea,
            height: withOut(0, ea),
          }
        },
      ]
    });
    targetTong = baseBlock.firstChild;
    createNode({
      mother: targetTong,
      text: "아이디",
      style: {
        width: String(idWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(firstMargin) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "고객",
      style: {
        width: String(nameWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "디자이너",
      style: {
        width: String(designerWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "상태",
      style: {
        width: String(designerWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "매출",
      style: {
        width: String(requestWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "매입",
      style: {
        width: String(responseWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(tableBetween) + ea,
      }
    });

    for (let project of projects) {

      instance.matrix.push(startRow);

      motherBlock = createNode({
        mother: grayTong,
        attribute: {
          proid: project.proid,
        },
        style: {
          display: "block",
          position: "relative",
          "min-height": String(blockHeight) + ea,
          width: withOut(0, ea),
          overflow: "hidden",
          borderRadius: String(5) + "px",
          marginBottom: String(blockMargin) + ea,
        }
      });

      baseBlock = createNode({
        mother: motherBlock,
        attribute: {
          proid: project.proid,
        },
        style: {
          display: "inline-block",
          width: withOut(0, ea),
          position: "relative",
          "min-height": String(blockHeight) + ea,
          background: colorChip.white,
          borderRadius: String(5) + "px",
          verticalAlign: "top",
        },
        children: [
          {
            attribute: {
              proid: project.proid,
            },
            style: {
              display: "block",
              position: "relative",
              width: String(8000) + ea,
              height: withOut(0, ea),
            }
          },
        ]
      });

      targetTong = baseBlock.firstChild;
      createNode({
        mother: targetTong,
        text: project.proid,
        event: {
          click: instance.whiteCardView(project.proid),
        },
        style: {
          width: String(idWidth) + ea,
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.deactive,
          top: String(textTop) + ea,
          marginLeft: String(firstMargin) + ea,
          cursor: "pointer",
        }
      });
      createNode({
        mother: targetTong,
        text: project.name.slice(0, 3) + "<b% C%b>",
        event: {
          click: instance.whiteCardView(project.proid),
        },
        style: {
          width: String(nameWidth) + ea,
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          fontSize: String(textSize) + ea,
          fontWeight: String(700),
          color: /^드/.test(project.process.status) ? colorChip.deactive : colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
          cursor: "pointer",
        },
        bold: {
          fontSize: String(textSize) + ea,
          fontWeight: String(300),
          color: colorChip.deactive,
        }
      });
      createNode({
        mother: targetTong,
        text: project.designer.designer.slice(0, 3) + "<b% D%b>",
        event: {
          click: instance.whiteCardView(project.proid),
        },
        style: {
          width: String(designerWidth) + ea,
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          fontSize: String(textSize) + ea,
          fontWeight: String(700),
          color: /^드/.test(project.process.status) ? colorChip.deactive : colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
          cursor: "pointer",
        },
        bold: {
          fontSize: String(textSize) + ea,
          fontWeight: String(300),
          color: colorChip.deactive,
        }
      });
      createNode({
        mother: targetTong,
        text: (/^드/.test(project.process.status) ? "<b%" + project.process.status + "%b>" : (/^대/.test(project.process.status) ? "<u%" + project.process.status + "%u>" : project.process.status)),
        style: {
          width: String(designerWidth) + ea,
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
        },
        bold: {
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.deactive,
        },
        under: {
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.red,
        }
      });

      // request

      requestTable = createNode({
        mother: targetTong,
        style: {
          width: String(requestWidth) + ea,
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          marginTop: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
          marginBottom: String(textTop) + ea,
          borderRadius: String(5) + "px",
          border: "1px solid " + colorChip.gray3,
          overflow: "hidden",
        }
      });
      requestBlock = createNode({
        mother: requestTable,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          height: String(tableBlockHeight) + ea,
          overflow: "hidden",
          borderRadius: String(5) + "px",
        }
      });
      for (let i = 0; i < requestColumns.length; i++) {
        createNode({
          mother: requestBlock,
          style: {
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            background: colorChip.gray1,
            height: withOut(0, ea),
            width: i === requestColumns.length - 1 ? String(tableBlockFactorWidth) + ea : String(tableBlockFactorWidth - 1) + ea,
            borderRight: i === requestColumns.length - 1 ?  "" : "1px solid " + colorChip.gray3,
          },
          children: [
            {
              text: requestColumns[i],
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(tableSize) + ea,
                fontWeight: String(tableBoldWeight),
                color: colorChip.black,
                top: String(tableTextTop) + ea,
              }
            }
          ]
        });
      }

      requestSumConsumer = 0;
      requestSumConfirm = 0;
      requestSumRefund = 0;
      requestSumIncome = 0;
      requestArr = [];
      for (let z = 0; z < project.bill.requests.length; z++) {
        thisRequest = project.bill.requests[z];

        requestName = thisRequest.name;
        confirmState = Math.floor(thisRequest.items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0));

        if (requestName === "홈리에종 잔금") {
          currentState = 1 - project.process.contract.remain.calculation.discount;
          currentState = Math.floor(project.process.contract.remain.calculation.amount.consumer / currentState);
          currentState = Math.floor(currentState - project.process.contract.first.calculation.amount);
        } else {
          currentState = Math.floor(thisRequest.items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0));
        }

        if (/^드/gi.test(project.process.status)) {
          if (thisRequest.pay.length === 0) {
            confirmState = 0;
          }
        }

        payDate = '-';
        if (thisRequest.pay.length > 0) {
          payDate = dateToString(thisRequest.pay[0].date);
        }

        cancelAmount = 0;
        cancelDate = '-';

        if (thisRequest.cancel.length > 0) {
          cancelAmount = thisRequest.cancel.reduce((acc, curr) => { return acc + curr.amount }, 0);
          cancelDate = dateToString(thisRequest.cancel[0].date);
        }

        requestSumConsumer += currentState;
        requestSumConfirm += confirmState;
        requestSumRefund += cancelAmount;
        if (payDate !== '-') {
          requestSumIncome += confirmState;
        }

        requestValueArr = [
          {
            value: requestName,
            color: colorChip.black,
          },
          {
            value: autoComma(currentState),
            color: colorChip.black,
          },
          {
            value: autoComma(confirmState),
            color: confirmState === 0 ? colorChip.black : (payDate === '-' ? colorChip.red : colorChip.black),
          },
          {
            value: payDate,
            color: colorChip.black,
          },
          {
            value: autoComma(cancelAmount),
            color: colorChip.black,
          },
          {
            value: cancelDate,
            color: colorChip.black,
          }
        ];

        requestBlock = createNode({
          mother: requestTable,
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            overflow: "hidden",
            borderRadius: String(5) + "px",
          }
        });
        for (let i = 0; i < requestValueArr.length; i++) {
          createNode({
            mother: requestBlock,
            style: {
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              background: colorChip.white,
              height: String(tableValueBlockHeight) + ea,
              paddingTop: String(z === 0 ? blockVisualPadding : 0) + ea,
              paddingBottom: String(z === project.bill.requests.length - 1 ? blockVisualPadding : 0) + ea,
              width: i === requestColumns.length - 1 ? String(tableBlockFactorWidth) + ea : String(tableBlockFactorWidth - 1) + ea,
              borderRight: i === requestColumns.length - 1 ?  "" : "1px solid " + colorChip.gray3,
            },
            children: [
              {
                text: requestValueArr[i].value,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(tableSize) + ea,
                  fontWeight: String(tableWeight),
                  color: requestValueArr[i].color,
                  top: String(tableTextTop) + ea,
                }
              }
            ]
          });
        }
        requestArr.push(requestValueArr.map((obj) => { return obj.value }));
      }

      requestValueArr = [
        {
          value: "총계",
          color: colorChip.black,
        },
        {
          value: autoComma(requestSumConsumer),
          color: colorChip.black,
        },
        {
          value: autoComma(requestSumConfirm),
          color: colorChip.black,
        },
        {
          value: autoComma(requestSumIncome),
          color: colorChip.black,
        },
        {
          value: autoComma(requestSumRefund),
          color: colorChip.black,
        },
        {
          value: '-',
          color: colorChip.black,
        }
      ];
      requestBlock = createNode({
        mother: requestTable,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          overflow: "hidden",
          borderRadius: String(5) + "px",
        }
      });
      for (let i = 0; i < requestValueArr.length; i++) {
        createNode({
          mother: requestBlock,
          style: {
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            background: colorChip.gray0,
            height: String(tableBlockHeight) + ea,
            width: i === requestColumns.length - 1 ? String(tableBlockFactorWidth) + ea : String(tableBlockFactorWidth - 1) + ea,
            borderRight: i === requestColumns.length - 1 ?  "" : "1px solid " + colorChip.gray3,
          },
          children: [
            {
              text: requestValueArr[i].value,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(tableSize) + ea,
                fontWeight: String(tableWeight),
                color: requestValueArr[i].color,
                top: String(tableTextTop) + ea,
              }
            }
          ]
        });
      }
      requestArr.push(requestValueArr.map((obj) => { return obj.value }));
      requestLength = requestArr.length;

      // response

      responseTable = createNode({
        mother: targetTong,
        style: {
          width: String(responseWidth) + ea,
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          marginTop: String(textTop) + ea,
          marginLeft: String(tableBetween) + ea,
          marginBottom: String(textTop) + ea,
          borderRadius: String(5) + "px",
          border: "1px solid " + colorChip.gray3,
          overflow: "hidden",
        }
      });
      responseBlock = createNode({
        mother: responseTable,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          height: String(tableBlockHeight) + ea,
          overflow: "hidden",
          borderRadius: String(5) + "px",
        }
      });
      for (let i = 0; i < responseColumns.length; i++) {
        createNode({
          mother: responseBlock,
          style: {
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            background: colorChip.gray1,
            height: withOut(0, ea),
            width: i === responseColumns.length - 1 ? String(tableBlockFactorWidth) + ea : String(tableBlockFactorWidth - 1) + ea,
            borderRight: i === responseColumns.length - 1 ?  "" : "1px solid " + colorChip.gray3,
          },
          children: [
            {
              text: responseColumns[i],
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(tableSize) + ea,
                fontWeight: String(tableBoldWeight),
                color: colorChip.black,
                top: String(tableTextTop) + ea,
              }
            }
          ]
        });
      }

      responseSumTotal = 0;
      responseSumNon = 0;
      responseSumPaid = 0;
      responseSumRefund = 0;
      responseArr = [];
      for (let z = 0; z < project.bill.responses.length; z++) {
        thisResponse = project.bill.responses[z];

        responseName = thisResponse.name;

        confirmState = Math.floor(thisResponse.items.reduce((acc, curr) => { return acc + curr.amount.pure }, 0));
        payAmount = Math.floor(thisResponse.pay.reduce((acc, curr) => { return acc + curr.amount }, 0));
        refundAmount = Math.floor(thisResponse.cancel.reduce((acc, curr) => { return acc + curr.amount }, 0));
        nonPayAmount = confirmState - payAmount;
        payDate = '-';
        if (thisResponse.pay.length > 0) {
          payDate = dateToString(thisResponse.pay[0].date);
        }

        responseSumTotal += confirmState;
        responseSumNon += nonPayAmount;
        responseSumPaid += payAmount;
        responseSumRefund += refundAmount;

        responseValueArr = [
          {
            value: responseName,
            color: colorChip.black,
          },
          {
            value: autoComma(confirmState),
            color: colorChip.black,
          },
          {
            value: autoComma(nonPayAmount),
            color: nonPayAmount !== 0 ? colorChip.purple : colorChip.black,
          },
          {
            value: autoComma(payAmount),
            color: colorChip.black,
          },
          {
            value: payDate,
            color: colorChip.black,
          },
          {
            value: autoComma(refundAmount),
            color: colorChip.black,
          },
        ];

        responseBlock = createNode({
          mother: responseTable,
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            overflow: "hidden",
            borderRadius: String(5) + "px",
          }
        });
        for (let i = 0; i < responseValueArr.length; i++) {
          createNode({
            mother: responseBlock,
            style: {
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              background: colorChip.white,
              height: String(tableValueBlockHeight) + ea,
              paddingTop: String(z === 0 ? blockVisualPadding : 0) + ea,
              paddingBottom: String(z === project.bill.responses.length - 1 ? blockVisualPadding : 0) + ea,
              width: i === responseColumns.length - 1 ? String(tableBlockFactorWidth) + ea : String(tableBlockFactorWidth - 1) + ea,
              borderRight: i === responseColumns.length - 1 ?  "" : "1px solid " + colorChip.gray3,
            },
            children: [
              {
                text: responseValueArr[i].value,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(tableSize) + ea,
                  fontWeight: String(tableWeight),
                  color: responseValueArr[i].color,
                  top: String(tableTextTop) + ea,
                }
              }
            ]
          });
        }
        responseArr.push(responseValueArr.map((obj) => { return obj.value }));
      }

      responseValueArr = [
        {
          value: "총계",
          color: colorChip.black,
        },
        {
          value: autoComma(responseSumTotal),
          color: colorChip.black,
        },
        {
          value: autoComma(responseSumNon),
          color: colorChip.black,
        },
        {
          value: autoComma(responseSumPaid),
          color: colorChip.black,
        },
        {
          value: '-',
          color: colorChip.black,
        },
        {
          value: autoComma(responseSumRefund),
          color: colorChip.black,
        },
      ];
      responseBlock = createNode({
        mother: responseTable,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          overflow: "hidden",
          borderRadius: String(5) + "px",
        }
      });
      for (let i = 0; i < responseValueArr.length; i++) {
        createNode({
          mother: responseBlock,
          style: {
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            background: colorChip.gray0,
            height: String(tableBlockHeight) + ea,
            width: i === responseColumns.length - 1 ? String(tableBlockFactorWidth) + ea : String(tableBlockFactorWidth - 1) + ea,
            borderRight: i === responseColumns.length - 1 ?  "" : "1px solid " + colorChip.gray3,
          },
          children: [
            {
              text: responseValueArr[i].value,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(tableSize) + ea,
                fontWeight: String(tableWeight),
                color: responseValueArr[i].color,
                top: String(tableTextTop) + ea,
              }
            }
          ]
        });
      }
      responseArr.push(responseValueArr.map((obj) => { return obj.value }));
      responseLength = responseArr.length;

      longLength = (requestLength >= responseLength ? requestLength : responseLength);
      for (let i = 0; i < longLength; i++) {
        instance.matrix.push([
          project.proid,
          project.name,
          project.designer.designer,
          project.process.status,
          requestArr[i] === undefined ? "" : requestArr[i][0],
          requestArr[i] === undefined ? "" : requestArr[i][1],
          requestArr[i] === undefined ? "" : requestArr[i][2],
          requestArr[i] === undefined ? "" : requestArr[i][3],
          requestArr[i] === undefined ? "" : requestArr[i][4],
          requestArr[i] === undefined ? "" : requestArr[i][5],
          responseArr[i] === undefined ? "" : responseArr[i][0],
          responseArr[i] === undefined ? "" : responseArr[i][1],
          responseArr[i] === undefined ? "" : responseArr[i][2],
          responseArr[i] === undefined ? "" : responseArr[i][3],
          responseArr[i] === undefined ? "" : responseArr[i][4],
          responseArr[i] === undefined ? "" : responseArr[i][5],
        ]);
      }

      instance.matrix.push(emptyRow);

    }
  }

  contentsLoad();
}

CalculationJs.prototype.extractMatrix = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects } = this;
  const { ajaxJson, uniqueValue, blankHref } = GeneralJs;
  const { belowButtons: { sub: { extractIcon } } } = this.mother;
  const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";

  extractIcon.addEventListener("click", async function () {
    try {
      const loading = instance.mother.grayLoading();
      let matrix, res, link;

      matrix = instance.matrix;
      res = await ajaxJson({
        values: matrix,
        newMake: true,
        parentId: parentId,
        sheetName: "fromDB_calculation_" + uniqueValue("hex")
      }, "/sendSheets");
      link = res.link;
      blankHref(link);
      loading.remove();

    } catch (e) {
      console.log(e);
    }
  });
}

CalculationJs.prototype.whiteCardView = function (proid) {
  const instance = this;
  const { totalContents, ea, belowHeight, projects } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate } = GeneralJs;
  return async function (e) {
    try {
      const project = projects.find((obj) => { return obj.proid === proid });
      const zIndex = 4;
      const blank = "&nbsp;&nbsp;&nbsp;";
      let cancelBack, whiteCard;
      let whiteOuterMargin;
      let whiteInnerMargin;
      let titleArea, contentsArea, buttonArea;
      let titleAreaHeight;
      let titleAreaPaddingBottom;
      let nameSize, nameWeight;
      let subSize, subWeight, subMarginLeft, subTextTop;
      let statusTextTop;
      let contentsAreaBetween;
      let contentsAreaPaddingTop;
      let grayInnerPadding;
      let contentsAreaLeft;
      let contentsAreaRight;
      let blockHeight;
      let leftColumns;
      let rightColumns;
      let greenTong, whiteTong, blackTong;
      let thisRequest;
      let requestName;
      let currentState;
      let confirmState;
      let payDate;
      let cancelAmount;
      let cancelDate;
      let valueSize, valueWeight, valueBoldWeight;
      let valueTextTop;
      let blockMarginBottom;

      whiteOuterMargin = 40;
      whiteInnerMargin = 50;

      titleAreaHeight = 63;
      buttonAreaHeight = 120;

      titleAreaPaddingBottom = 6;

      nameSize = 32;
      nameWeight = 800;

      subSize = 17;
      subWeight = 400;
      subMarginLeft = 13;
      subTextTop = 7;

      statusTextTop = 27;

      contentsAreaBetween = 10;
      contentsAreaPaddingTop = 30;

      grayInnerPadding = 10;

      blockHeight = 40;

      valueSize = 13;
      valueWeight = 400;
      valueBoldWeight = 800;
      valueTextTop = -1;

      blockMarginBottom = 2;

      leftColumns = [
        "구분",
        "소비자가",
        "확정가",
        "입금액",
        "입금일",
        "환불액",
        "환불일",
      ]

      rightColumns = [
        "구분",
        "총액",
        "미지급액",
        "지급액",
        "지급일",
        "환수액",
        "환수일",
      ]

      cancelBack = createNode({
        mother: totalContents,
        style: {
          position: "fixed",
          top: String(0),
          left: String(0),
          width: withOut(0, ea),
          height: withOut(belowHeight, ea),
          background: colorChip.black,
          opacity: String(0.4),
          zIndex: String(zIndex),
        }
      });

      whiteCard = createNode({
        mother: totalContents,
        style: {
          position: "fixed",
          top: String(whiteOuterMargin) + ea,
          left: String(whiteOuterMargin) + ea,
          width: withOut((whiteOuterMargin * 2) + (whiteInnerMargin * 2), ea),
          height: withOut((whiteOuterMargin * 2) + belowHeight + (whiteInnerMargin * 2), ea),
          padding: String(whiteInnerMargin) + ea,
          background: colorChip.white,
          borderRadius: String(5) + "px",
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          animation: "fadeuplite 0.3s ease forwards",
          zIndex: String(zIndex),
        },
        children: [
          {
            style: {
              position: "relative",
              display: "block",
              width: withOut(0, ea),
              height: withOut(0, ea),
              borderRadius: String(5) + "px",
              overflow: "hidden",
            },
          }
        ]
      }).firstChild;


      // title area

      titleArea = createNode({
        mother: whiteCard,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(titleAreaHeight) + ea,
          paddingBottom: String(titleAreaPaddingBottom) + ea,
          alignItems: "center",
          borderBottom: "1px solid " + colorChip.gray3,
        }
      })
      createNode({
        mother: titleArea,
        text: project.name,
        style: {
          display: "inline-flex",
          position: "relative",
          fontSize: String(nameSize) + ea,
          fontWeight: String(nameWeight),
          color: colorChip.black,
        }
      });
      createNode({
        mother: titleArea,
        text: project.proid + blank + "/" + blank + project.designer.designer + " 디자이너",
        style: {
          display: "inline-flex",
          fontSize: String(subSize) + ea,
          fontWeight: String(subWeight),
          color: colorChip.deactive,
          marginLeft: String(subMarginLeft) + ea,
          position: "relative",
          top: String(subTextTop) + ea,
        }
      });
      createNode({
        mother: titleArea,
        text: project.process.status,
        style: {
          display: "inline-flex",
          fontSize: String(subSize) + ea,
          fontWeight: String(subWeight),
          color: ((status) => {
            if (status === "대기") {
              return colorChip.red;
            } else if (status === "진행중") {
              return colorChip.black;
            } else if (status === "드랍") {
              return colorChip.deactive;
            } else if (status === "완료") {
              return colorChip.green;
            } else {
              return colorChip.black;
            }
          })(project.process.status),
          position: "absolute",
          right: String(0),
          top: String(statusTextTop) + ea,
        }
      });


      // contents area

      contentsArea = createNode({
        mother: whiteCard,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          paddingTop: String(contentsAreaPaddingTop) + ea,
          height: withOut(titleAreaHeight + buttonAreaHeight + titleAreaPaddingBottom + contentsAreaPaddingTop, ea),
          width: withOut(0, ea),
        }
      });

      contentsAreaLeft = createNode({
        mother: contentsArea,
        style: {
          display: "inline-flex",
          position: "relative",
          width: "calc(calc(calc(100% - " + String(contentsAreaBetween) + ea + ") / 2) - " + String(grayInnerPadding * 2) + ea + ")",
          height: withOut(grayInnerPadding * 2, ea),
          borderRadius: String(5) + "px",
          padding: String(grayInnerPadding) + ea,
          background: colorChip.gray2,
          marginRight: String(contentsAreaBetween) + ea,
          alignItems: "center",
          justifyContent: "center",
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(0, ea),
              overflow: "scroll",
            }
          }
        ]
      }).firstChild;

      greenTong = createNode({
        mother: contentsAreaLeft,
        style: {
          display: "flex",
          position: "sticky",
          flexDirection: "row",
          top: String(0),
          width: withOut(0),
          height: String(blockHeight) + ea,
          background: colorChip.gradientGreen,
          borderRadius: String(5) + "px",
          marginBottom: String(blockMarginBottom) + ea,
          zIndex: String(1),
        }
      });

      for (let column of leftColumns) {
        createNode({
          mother: greenTong,
          style: {
            display: "inline-flex",
            width: "calc(100% / " + String(leftColumns.length) + ")",
            height: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          },
          children: [
            {
              text: column,
              style: {
                fontSize: String(valueSize) + ea,
                fontWeight: String(valueBoldWeight),
                color: colorChip.white,
                position: "relative",
                top: String(valueTextTop) + ea,
              }
            }
          ]
        });
      }

      for (let z = 0; z < project.bill.requests.length; z++) {
        thisRequest = project.bill.requests[z];
        requestName = thisRequest.name;
        confirmState = Math.floor(thisRequest.items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0));

        if (requestName === "홈리에종 잔금") {
          currentState = 1 - project.process.contract.remain.calculation.discount;
          currentState = Math.floor(project.process.contract.remain.calculation.amount.consumer / currentState);
          currentState = Math.floor(currentState - project.process.contract.first.calculation.amount);
        } else {
          currentState = Math.floor(thisRequest.items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0));
        }

        if (/^드/gi.test(project.process.status)) {
          if (thisRequest.pay.length === 0) {
            confirmState = 0;
          }
        }

        payDate = '-';
        if (thisRequest.pay.length > 0) {
          payDate = dateToString(thisRequest.pay[0].date);
        }

        cancelAmount = 0;
        cancelDate = '-';

        if (thisRequest.cancel.length > 0) {
          cancelAmount = thisRequest.cancel.reduce((acc, curr) => { return acc + curr.amount }, 0);
          cancelDate = dateToString(thisRequest.cancel[0].date);
        }

        whiteTong = createNode({
          mother: contentsAreaLeft,
          style: {
            display: "flex",
            position: "relative",
            flexDirection: "row",
            width: withOut(0),
            height: String(blockHeight) + ea,
            background: colorChip.white,
            borderRadius: String(5) + "px",
            marginBottom: String(blockMarginBottom) + ea,
          }
        });

        createNode({
          mother: whiteTong,
          style: {
            display: "inline-flex",
            width: "calc(100% / " + String(leftColumns.length) + ")",
            height: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          },
          children: [
            {
              text: requestName,
              style: {
                fontSize: String(valueSize) + ea,
                fontWeight: String(valueWeight),
                color: colorChip.black,
                position: "relative",
                top: String(valueTextTop) + ea,
              }
            }
          ]
        });

        createNode({
          mother: whiteTong,
          style: {
            display: "inline-flex",
            width: "calc(100% / " + String(leftColumns.length) + ")",
            height: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          },
          children: [
            {
              text: autoComma(currentState),
              style: {
                fontSize: String(valueSize) + ea,
                fontWeight: String(valueWeight),
                color: colorChip.black,
                position: "relative",
                top: String(valueTextTop) + ea,
              }
            }
          ]
        });

        createNode({
          mother: whiteTong,
          style: {
            display: "inline-flex",
            width: "calc(100% / " + String(leftColumns.length) + ")",
            height: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          },
          children: [
            {
              text: autoComma(confirmState),
              style: {
                fontSize: String(valueSize) + ea,
                fontWeight: String(valueWeight),
                color: colorChip.black,
                position: "relative",
                top: String(valueTextTop) + ea,
              }
            }
          ]
        });

        createNode({
          mother: whiteTong,
          style: {
            display: "inline-flex",
            width: "calc(100% / " + String(leftColumns.length) + ")",
            height: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          },
          children: [
            {
              text: payDate === '-' ? String(0) : autoComma(confirmState),
              style: {
                fontSize: String(valueSize) + ea,
                fontWeight: String(valueWeight),
                color: colorChip.black,
                position: "relative",
                top: String(valueTextTop) + ea,
              }
            }
          ]
        });


        createNode({
          mother: whiteTong,
          style: {
            display: "inline-flex",
            width: "calc(100% / " + String(leftColumns.length) + ")",
            height: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          },
          children: [
            {
              text: payDate,
              style: {
                fontSize: String(valueSize) + ea,
                fontWeight: String(valueWeight),
                color: colorChip.black,
                position: "relative",
                top: String(valueTextTop) + ea,
              }
            }
          ]
        });

        createNode({
          mother: whiteTong,
          style: {
            display: "inline-flex",
            width: "calc(100% / " + String(leftColumns.length) + ")",
            height: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          },
          children: [
            {
              text: autoComma(cancelAmount),
              style: {
                fontSize: String(valueSize) + ea,
                fontWeight: String(valueWeight),
                color: colorChip.black,
                position: "relative",
                top: String(valueTextTop) + ea,
              }
            }
          ]
        });

        createNode({
          mother: whiteTong,
          style: {
            display: "inline-flex",
            width: "calc(100% / " + String(leftColumns.length) + ")",
            height: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          },
          children: [
            {
              text: cancelDate,
              style: {
                fontSize: String(valueSize) + ea,
                fontWeight: String(valueWeight),
                color: colorChip.black,
                position: "relative",
                top: String(valueTextTop) + ea,
              }
            }
          ]
        });


      }

      createNode({
        mother: contentsAreaLeft,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          width: withOut(0),
          height: String(blockHeight) + ea,
          background: colorChip.gray0,
          borderRadius: String(5) + "px",
          marginBottom: String(80) + ea,
        }
      })


      contentsAreaRight = createNode({
        mother: contentsArea,
        style: {
          display: "inline-flex",
          position: "relative",
          width: "calc(calc(calc(100% - " + String(contentsAreaBetween) + ea + ") / 2) - " + String(grayInnerPadding * 2) + ea + ")",
          height: withOut(grayInnerPadding * 2, ea),
          borderRadius: String(5) + "px",
          padding: String(grayInnerPadding) + ea,
          background: colorChip.gray2,
          alignItems: "center",
          justifyContent: "center",
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(0, ea),
              overflow: "scroll",
            }
          }
        ]
      }).firstChild;



    } catch (e) {
      console.log(e);
    }
  }
}

CalculationJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, equalJson } = GeneralJs;
  try {
    const emptyDate = () => { return new Date(1800, 0, 1) };
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    let projects, projectsRaw;
    let clients, designers;
    let loading;
    let bills;
    let proid, cliid, desid, service;
    let thisClient, thisDesigner;
    let thisBill;

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    loading = this.mother.grayLoading();

    projectsRaw = await ajaxJson({ noFlat: true, whereQuery: {} }, "/getProjects", { equal: true });
    projects = projectsRaw.filter((obj) => {  return obj.process.contract.first.date.valueOf() >= emptyDateValue });

    clients = await ajaxJson({ noFlat: true, whereQuery: { $or: Array.from(new Set(projects.map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) } }, "/getClients", { equal: true });
    designers = await ajaxJson({ noFlat: true, whereQuery: { $or: Array.from(new Set(projects.map((p) => { return p.desid }))).map((desid) => { return { desid } }) } }, "/getDesigners", { equal: true });

    bills = await ajaxJson({ mode: "read", db: "python", collection: "generalBill", whereQuery: {} }, PYTHONHOST + "/generalMongo", { equal: true });

    for (let project of projects) {
      ({ proid, cliid, desid, service } = project);

      thisClient = clients.find((obj) => { return obj.cliid === cliid });
      thisDesigner = designers.find((obj) => { return obj.desid === desid });
      thisBill = bills.find((obj) => {
        return ((obj.links.proid === proid) && (obj.links.method === (service.online ? "online" : "offline")))
      });

      project.client = thisClient;
      project.designer = thisDesigner;
      project.bill = thisBill;
      project.name = thisClient.name;
      project.phone = thisClient.phone;
    }

    projects = projects.filter((obj) => {
      return obj.proid !== "p1801_aa01s" && obj.proid !== "p1801_aa02s";
    })

    this.projects = projects;
    this.matrix = [];
    this.baseMaker();
    this.extractMatrix();

    document.getElementById("moveLeftArea").remove();
    document.getElementById("moveRightArea").remove();

    loading.remove();

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
