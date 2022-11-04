const CalculationJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
}

CalculationJs.prototype.baseMaker = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects, media } = this;
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
  let nameDom;

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
        display: media[0] ? "inline-block" : "none",
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
        display: media[0] ? "inline-block" : "none",
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

    instance.names = [];
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
          display: media[0] ? "inline-block" : "none",
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
      nameDom = createNode({
        mother: targetTong,
        text: project.name.slice(0, 3) + "<b% C%b>",
        attribute: {
          name: project.proid + project.cliid + project.desid + project.name + project.designer.designer,
        },
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
      instance.names.push(nameDom);
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
          display: media[0] ? "inline-block" : "none",
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

CalculationJs.prototype.whiteCardView = function (proid) {
  const instance = this;
  const { totalContents, ea, belowHeight, projects } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate } = GeneralJs;
  return async function (e) {
    try {
      const project = projects.find((obj) => { return obj.proid === proid });
      const zIndex = 4;
      const blank = "&nbsp;&nbsp;&nbsp;";
      const whiteCardClassName = "whiteCardClassName";
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
      let greenTong, whiteTong, blackTong, grayTong;
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
      let requestSumConsumer;
      let requestSumConfirm;
      let requestSumRefund;
      let requestSumIncome;
      let requestValueArr, responseValueArr;
      let thisResponse;
      let responseName;
      let payAmount;
      let refundAmount;
      let nonPayAmount;
      let responseSumTotal;
      let responseSumNon;
      let responseSumPaid;
      let responseSumRefund;
      let refundDate;
      let vatAmount, supplyAmount;
      let payMethod, payProof;
      let requestSumVat, requestSumSupply;

      whiteOuterMargin = <%% 40, 20, 20, 20, 10 %%>;
      whiteInnerMargin = <%% 50, 30, 30, 30, 20 %%>;

      titleAreaHeight = <%% 63, 42, 42, 42, 42 %%>;

      titleAreaPaddingBottom = 6;

      nameSize = <%% 32, 24, 24, 24, 24 %%>;
      nameWeight = 800;

      subSize = <%% 17, 15, 15, 15, 15 %%>;
      subWeight = 400;
      subMarginLeft = 13;
      subTextTop = <%% (isMac() ? 7 : 5), 5, 5, 5, 3 %%>;

      statusTextTop = <%% 27, 18, 18, 18, 18 %%>;

      contentsAreaBetween = 10;
      contentsAreaPaddingTop = <%% 30, 15, 15, 15, 15 %%>;

      grayInnerPadding = 10;

      blockHeight = <%% 40, 36, 36, 36, 36 %%>;

      valueSize = <%% 13, 12, 12, 11, 3 %%>;
      valueWeight = 400;
      valueBoldWeight = 800;
      valueTextTop = isMac() ? -1 : 1;

      blockMarginBottom = 2;

      leftColumns = [
        "구분",
        "공급가",
        "VAT",
        "소비자가",
        "확정가",
        "입금액",
        "입금일",
        "입금 수단",
        "입금 증빙",
        "환불액",
        "환불일",
        "환불 비율",
        "환불 진행",
      ];

      rightColumns = [
        "구분",
        "종류",
        "수수료",
        "증빙",
        "총액",
        "미지급액",
        "지급액",
        "지급일",
        "지급 수단",
        "환수액",
        "환수일",
        "지급 진행",
        "환수 진행",
      ];


      // base

      cancelBack = createNode({
        mother: totalContents,
        class: [ whiteCardClassName ],
        event: {
          click: function (e) {
            const targets = [ ...document.querySelectorAll('.' + whiteCardClassName) ];
            for (let dom of targets) {
              dom.remove();
            }
          }
        },
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
        class: [ whiteCardClassName ],
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
      });
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
          flexDirection: "column",
          paddingTop: String(contentsAreaPaddingTop) + ea,
          height: withOut(titleAreaHeight + titleAreaPaddingBottom + contentsAreaPaddingTop, ea),
          width: withOut(0, ea),
        }
      });

      // contents area up - request

      contentsAreaLeft = createNode({
        mother: contentsArea,
        style: {
          display: "flex",
          position: "relative",
          height: "calc(calc(calc(100% - " + String(contentsAreaBetween) + ea + ") / 2) - " + String(grayInnerPadding * 2) + ea + ")",
          width: withOut(grayInnerPadding * 2, ea),
          borderRadius: String(5) + "px",
          padding: String(grayInnerPadding) + ea,
          background: colorChip.gray2,
          marginBottom: String(contentsAreaBetween) + ea,
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

      requestSumConsumer = 0;
      requestSumConfirm = 0;
      requestSumRefund = 0;
      requestSumIncome = 0;
      requestSumVat = 0;
      requestSumSupply = 0;
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

        vatAmount = Math.floor(currentState / 11);
        supplyAmount = Math.floor(currentState - vatAmount);

        if (/^드/gi.test(project.process.status)) {
          if (thisRequest.pay.length === 0) {
            confirmState = 0;
          }
        }

        payDate = '-';
        if (thisRequest.pay.length > 0) {
          payDate = dateToString(thisRequest.pay[0].date);
        }

        if (payDate === '-') {
          payMethod = "-";
          payProof = "-";
        } else {
          payMethod = "알 수 없음";
          if (thisRequest.proofs.length > 0) {
            payMethod = thisRequest.proofs[0].method;
          }
          payProof = "알 수 없음";
          if (thisRequest.proofs.length > 0) {
            payProof = thisRequest.proofs[0].proof;
          }
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
        requestSumIncome += (payDate === '-' ? 0 : confirmState);
        requestSumVat += vatAmount;
        requestSumSupply += supplyAmount;

        requestValueArr = [
          {
            value: requestName,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(supplyAmount),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(vatAmount),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(currentState),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(confirmState),
            color: confirmState === 0 ? colorChip.black : (payDate === '-' ? colorChip.red : colorChip.black),
            pointer: false,
          },
          {
            value: payDate === '-' ? String(0) : autoComma(confirmState),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: payDate,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: payMethod,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: payProof,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(cancelAmount),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: cancelDate,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: cancelDate === '-' ? "0%" : String(Math.floor(cancelAmount / confirmState)) + '%',
            color: colorChip.black,
            pointer: false,
          },
          {
            value: "환불 진행",
            color: colorChip.green,
            pointer: true,
          },
        ];

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
        for (let { value, color, pointer } of requestValueArr) {
          createNode({
            mother: whiteTong,
            style: {
              display: "inline-flex",
              width: "calc(100% / " + String(leftColumns.length) + ")",
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              cursor: pointer ? "pointer" : "",
            },
            children: [
              {
                text: value,
                style: {
                  fontSize: String(valueSize) + ea,
                  fontWeight: String(valueWeight),
                  color: color,
                  position: "relative",
                  top: String(valueTextTop) + ea,
                }
              }
            ]
          });
        }
      }

      requestValueArr = [
        {
          value: "총계",
          color: colorChip.black,
        },
        {
          value: autoComma(requestSumSupply),
          color: colorChip.black,
        },
        {
          value: autoComma(requestSumVat),
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
          value: '-',
          color: colorChip.black,
        },
        {
          value: '-',
          color: colorChip.black,
        },
        {
          value: '-',
          color: colorChip.black,
        },
        {
          value: autoComma(requestSumRefund),
          color: colorChip.black,
        },
        {
          value: '-',
          color: colorChip.black,
        },
        {
          value: '-',
          color: colorChip.black,
        },
        {
          value: '-',
          color: colorChip.black,
        },
      ];
      grayTong = createNode({
        mother: contentsAreaLeft,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          width: withOut(0),
          height: String(blockHeight) + ea,
          background: colorChip.gray0,
          borderRadius: String(5) + "px",
          marginBottom: String(blockMarginBottom) + ea,
        }
      });
      for (let { value, color } of requestValueArr) {
        createNode({
          mother: grayTong,
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
              text: value,
              style: {
                fontSize: String(valueSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                position: "relative",
                top: String(valueTextTop) + ea,
              }
            }
          ]
        });
      }

      // contents area down - response

      contentsAreaRight = createNode({
        mother: contentsArea,
        style: {
          display: "flex",
          position: "relative",
          height: "calc(calc(calc(100% - " + String(contentsAreaBetween) + ea + ") / 2) - " + String(grayInnerPadding * 2) + ea + ")",
          width: withOut(grayInnerPadding * 2, ea),
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

      blackTong = createNode({
        mother: contentsAreaRight,
        style: {
          display: "flex",
          position: "sticky",
          flexDirection: "row",
          top: String(0),
          width: withOut(0),
          height: String(blockHeight) + ea,
          background: colorChip.gradientGray,
          borderRadius: String(5) + "px",
          marginBottom: String(blockMarginBottom) + ea,
          zIndex: String(1),
        }
      });
      for (let column of rightColumns) {
        createNode({
          mother: blackTong,
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

      responseSumTotal = 0;
      responseSumNon = 0;
      responseSumPaid = 0;
      responseSumRefund = 0;
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
        refundDate = '-';
        if (thisResponse.cancel.length > 0) {
          refundDate = dateToString(thisResponse.cancel[0].date);
        }
        if (payDate === '-') {
          payMethod = "-";
          payProof = "-";
        } else {
          payMethod = "알 수 없음";
          if (thisResponse.proofs.length > 0) {
            payMethod = thisResponse.proofs[0].method;
          }
          payProof = "알 수 없음";
          if (thisResponse.proofs.length > 0) {
            payProof = thisResponse.proofs[0].proof;
          }
        }


        responseSumTotal += confirmState;
        responseSumNon += nonPayAmount;
        responseSumPaid += payAmount;
        responseSumRefund += refundAmount;

        responseValueArr = [
          {
            value: responseName,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: project.process.calculation.method,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: String(project.process.calculation.percentage) + '%',
            color: colorChip.black,
            pointer: false,
          },
          {
            value: '-',
            color: colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(confirmState),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(nonPayAmount),
            color: nonPayAmount !== 0 ? colorChip.purple : colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(payAmount),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: payDate,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: payMethod,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(refundAmount),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: refundDate,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: "지급 진행",
            color: colorChip.green,
            pointer: true,
          },
          {
            value: "환수 진행",
            color: colorChip.green,
            pointer: true,
          },
        ];

        whiteTong = createNode({
          mother: contentsAreaRight,
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
        for (let { value, color, pointer } of responseValueArr) {
          createNode({
            mother: whiteTong,
            style: {
              display: "inline-flex",
              width: "calc(100% / " + String(leftColumns.length) + ")",
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              cursor: pointer ? "pointer" : "",
            },
            children: [
              {
                text: value,
                style: {
                  fontSize: String(valueSize) + ea,
                  fontWeight: String(valueWeight),
                  color: color,
                  position: "relative",
                  top: String(valueTextTop) + ea,
                }
              }
            ]
          });
        }
      }

      responseValueArr = [
        {
          value: "총계",
          color: colorChip.black,
        },
        {
          value: '-',
          color: colorChip.black,
        },
        {
          value: '-',
          color: colorChip.black,
        },
        {
          value: '-',
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
          value: '-',
          color: colorChip.black,
        },
        {
          value: autoComma(responseSumRefund),
          color: colorChip.black,
        },
        {
          value: '-',
          color: colorChip.black,
        },
        {
          value: '-',
          color: colorChip.black,
        },
        {
          value: '-',
          color: colorChip.black,
        },
      ];
      grayTong = createNode({
        mother: contentsAreaRight,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          width: withOut(0),
          height: String(blockHeight) + ea,
          background: colorChip.gray0,
          borderRadius: String(5) + "px",
          marginBottom: String(blockMarginBottom) + ea,
        }
      });
      for (let { value, color } of responseValueArr) {
        createNode({
          mother: grayTong,
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
              text: value,
              style: {
                fontSize: String(valueSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                position: "relative",
                top: String(valueTextTop) + ea,
              }
            }
          ]
        });
      }

    } catch (e) {
      console.log(e);
    }
  }
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

CalculationJs.prototype.searchMatrix = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects } = this;
  const { ajaxJson, uniqueValue, blankHref, setDebounce } = GeneralJs;
  const whiteCardClassName = "whiteCardClassName";
  let searchEvent;

  searchEvent = (value, e) => {
    return () => {
      const removeTargets = document.querySelectorAll('.' + whiteCardClassName);
      for (let dom of removeTargets) {
        dom.remove();
      }
      let target;
      if (value.trim() === '') {
        for (let dom of instance.names) {
          dom.parentElement.parentElement.parentElement.style.display = "block";
        }
      } else {
        target = instance.names.find((dom) => { return (new RegExp(value.trim().replace(/ /gi, ''), "gi")).test(dom.getAttribute("name")) });
        if (target !== undefined) {
          for (let dom of instance.names) {
            if (dom === target) {
              dom.parentElement.parentElement.parentElement.style.display = "block";
            } else {
              dom.parentElement.parentElement.parentElement.style.display = "none";
            }
          }
          if (e.key === "Enter") {
            target.click();
          }
        }
      }
    }
  }

  this.searchInput.addEventListener("keyup", function (e) {
    setDebounce(searchEvent(this.value, e), "__searchMatrix__", 200);
  });
}

CalculationJs.prototype.reportMatrix = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects } = this;
  const { ajaxJson, uniqueValue, blankHref } = GeneralJs;
  const { belowButtons: { square: { reportIcon } } } = this.mother;

  reportIcon.addEventListener("click", this.queueView());
}

CalculationJs.prototype.queueView = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects, bills } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, copyJson } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      const whiteCardClassName = "whiteCardClassName";
      let cancelBack, whiteCard;
      let whiteOuterMargin;
      let whiteInnerMargin;
      let titleAreaHeight;
      let titleAreaPaddingBottom;
      let nameSize;
      let nameWeight;
      let subSize;
      let subWeight;
      let subMarginLeft;
      let subTextTop;
      let statusTextTop;
      let titleArea;
      let responses;
      let thisBill;
      let forEachFunction;
      let needs, pending;
      let contentsAreaBetween;
      let contentsAreaPaddingTop;
      let grayInnerPadding;
      let blockHeight;
      let valueSize;
      let valueWeight;
      let valueBoldWeight;
      let valueTextTop;
      let blockMarginBottom;
      let columns;
      let contentsArea;
      let contentsAreaLeft;
      let contentsAreaRight;
      let greenTong;
      let blackTong;
      let thisResponse;
      let responseName;
      let confirmState;
      let payAmount;
      let refundAmount;
      let nonPayAmount;
      let payDate;
      let refundDate;
      let payMethod;
      let payProof;
      let responseValueArr;
      let whiteTong;
      let responseSumTotal;
      let responseSumNon;
      let responseSumPaid;
      let grayTong;
      let loading;

      whiteOuterMargin = <%% 40, 20, 20, 20, 10 %%>;
      whiteInnerMargin = <%% 50, 30, 30, 30, 20 %%>;

      titleAreaHeight = <%% 63, 42, 42, 42, 42 %%>;

      titleAreaPaddingBottom = 6;

      nameSize = <%% 32, 24, 24, 24, 24 %%>;
      nameWeight = 800;

      subSize = <%% 17, 15, 15, 15, 15 %%>;
      subWeight = 400;
      subMarginLeft = 13;
      subTextTop = <%% (isMac() ? 7 : 5), 5, 5, 5, 3 %%>;

      statusTextTop = <%% 27, 18, 18, 18, 18 %%>;

      contentsAreaBetween = 10;
      contentsAreaPaddingTop = <%% 30, 15, 15, 15, 15 %%>;

      grayInnerPadding = 10;

      blockHeight = <%% 40, 36, 36, 36, 36 %%>;

      valueSize = <%% 13, 12, 12, 11, 3 %%>;
      valueWeight = 400;
      valueBoldWeight = 800;
      valueTextTop = isMac() ? -1 : 1;

      blockMarginBottom = 2;

      columns = [
        "아이디",
        "고객",
        "디자이너",
        "구분",
        "종류",
        "확인",
        "총액",
        "미지급액",
        "지급액",
        "지급일",
        "지급 수단",
        "지급 진행",
      ];

      contentsAreaLeft = {};
      contentsAreaRight = {};

      loading = instance.mother.grayLoading();

      responses = await ajaxJson({ mode: "get" }, PYTHONHOST + "/nonPaidResponses");

      forEachFunction = (obj) => {
        thisBill = copyJson(bills.find((o) => { return o.bilid === obj.bill.bilid; }));
        obj.bill.bill = thisBill;
        obj.bill.responseObject = thisBill.responses[obj.bill.responseIndex];
      }
      responses.needs.forEach(forEachFunction);
      responses.pending.forEach(forEachFunction);
      ({ needs, pending } = responses);

      // base

      const targets = [ ...document.querySelectorAll('.' + whiteCardClassName) ];
      for (let dom of targets) {
        dom.remove();
      }

      cancelBack = createNode({
        mother: totalContents,
        class: [ whiteCardClassName ],
        event: {
          click: function (e) {
            const targets = [ ...document.querySelectorAll('.' + whiteCardClassName) ];
            for (let dom of targets) {
              dom.remove();
            }
          }
        },
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
        class: [ whiteCardClassName ],
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
            set: "block",
            style: {
              width: withOut(0, ea),
              height: withOut(0, ea),
              borderRadius: String(5) + "px",
              overflow: "hidden",
            },
          }
        ]
      }).firstChild;


      loading.remove();

      // title

      createNode({
        mother: whiteCard,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(titleAreaHeight) + ea,
          paddingBottom: String(titleAreaPaddingBottom) + ea,
          alignItems: "center",
          borderBottom: "1px solid " + colorChip.gray3,
        },
        children: [
          {
            text: "미정산 리포트",
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(nameSize) + ea,
              fontWeight: String(nameWeight),
              color: colorChip.black,
            }
          },
          {
            text: dateToString(new Date(), true),
            style: {
              display: "inline-flex",
              fontSize: String(subSize) + ea,
              fontWeight: String(subWeight),
              color: colorChip.deactive,
              marginLeft: String(subMarginLeft) + ea,
              position: "relative",
              top: String(subTextTop) + ea,
            }
          },
          {
            text: "전체 보기",
            event: {
              click: function (e) {
                if (this.textContent.trim() === "전체 보기") {
                  contentsAreaLeft.parentElement.style.display = "none";
                  contentsAreaRight.parentElement.style.display = "flex";
                  this.textContent = "정산 대상";
                } else {
                  contentsAreaLeft.parentElement.style.display = "flex";
                  contentsAreaRight.parentElement.style.display = "none";
                  this.textContent = "전체 보기";
                }
              },
            },
            style: {
              display: "inline-flex",
              fontSize: String(subSize) + ea,
              fontWeight: String(subWeight),
              color: colorChip.red,
              position: "absolute",
              cursor: "pointer",
              right: String(0),
              top: String(statusTextTop) + ea,
            }
          }
        ]
      });

      // contents area

      contentsArea = createNode({
        mother: whiteCard,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "column",
          paddingTop: String(contentsAreaPaddingTop) + ea,
          height: withOut(titleAreaHeight + titleAreaPaddingBottom + contentsAreaPaddingTop, ea),
          width: withOut(0, ea),
        }
      });

      // contents area up - needs response

      contentsAreaLeft = createNode({
        mother: contentsArea,
        style: {
          display: "flex",
          position: "relative",
          height: withOut(grayInnerPadding * 2, ea),
          width: withOut(grayInnerPadding * 2, ea),
          borderRadius: String(5) + "px",
          padding: String(grayInnerPadding) + ea,
          background: colorChip.gray2,
          marginBottom: String(contentsAreaBetween) + ea,
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
      for (let column of columns) {
        createNode({
          mother: greenTong,
          style: {
            display: "inline-flex",
            width: "calc(100% / " + String(columns.length) + ")",
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

      responseSumTotal = 0;
      responseSumNon = 0;
      responseSumPaid = 0;
      for (let z = 0; z < needs.length; z++) {
        thisResponse = needs[z].bill.responseObject;
        responseName = thisResponse.name;

        confirmState = Math.floor(thisResponse.items.reduce((acc, curr) => { return acc + curr.amount.pure }, 0));
        payAmount = Math.floor(thisResponse.pay.reduce((acc, curr) => { return acc + curr.amount }, 0));
        nonPayAmount = confirmState - payAmount;
        payDate = '-';
        if (thisResponse.pay.length > 0) {
          payDate = dateToString(thisResponse.pay[0].date);
        }
        if (payDate === '-') {
          payMethod = "-";
          payProof = "-";
        } else {
          payMethod = "알 수 없음";
          if (thisResponse.proofs.length > 0) {
            payMethod = thisResponse.proofs[0].method;
          }
          payProof = "알 수 없음";
          if (thisResponse.proofs.length > 0) {
            payProof = thisResponse.proofs[0].proof;
          }
        }

        responseSumTotal += confirmState;
        responseSumNon += nonPayAmount;
        responseSumPaid += payAmount;

        responseValueArr = [
          {
            value: needs[z].proid,
            color: colorChip.black,
            pointer: true,
          },
          {
            value: needs[z].names.name,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: needs[z].names.designer,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: responseName,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: needs[z].classification.classification,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: needs[z].classification.free ? "프리랜서 정산" : (needs[z].classification.simple ? "현금 영수증 확인" : "세금 계산서 확인"),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(confirmState),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(nonPayAmount),
            color: nonPayAmount !== 0 ? colorChip.purple : colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(payAmount),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: payDate,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: payMethod,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: "지급 진행",
            color: colorChip.green,
            pointer: true,
          },
        ];
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
        for (let { value, color, pointer } of responseValueArr) {
          createNode({
            mother: whiteTong,
            style: {
              display: "inline-flex",
              width: "calc(100% / " + String(columns.length) + ")",
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              cursor: pointer ? "pointer" : "",
            },
            children: [
              {
                text: value,
                style: {
                  fontSize: String(valueSize) + ea,
                  fontWeight: String(valueWeight),
                  color: color,
                  position: "relative",
                  top: String(valueTextTop) + ea,
                }
              }
            ]
          });
        }
      }

      responseValueArr = [
        {
          value: "총계",
          color: colorChip.black,
          pointer: true,
        },
        {
          value: "-",
          color: colorChip.black,
          pointer: false,
        },
        {
          value: "-",
          color: colorChip.black,
          pointer: false,
        },
        {
          value: "-",
          color: colorChip.black,
          pointer: false,
        },
        {
          value: "-",
          color: colorChip.black,
          pointer: false,
        },
        {
          value: "-",
          color: colorChip.black,
          pointer: false,
        },
        {
          value: autoComma(responseSumTotal),
          color: colorChip.black,
          pointer: false,
        },
        {
          value: autoComma(responseSumNon),
          color: colorChip.black,
          pointer: false,
        },
        {
          value: autoComma(responseSumPaid),
          color: colorChip.black,
          pointer: false,
        },
        {
          value: "-",
          color: colorChip.black,
          pointer: false,
        },
        {
          value: "-",
          color: colorChip.black,
          pointer: false,
        },
        {
          value: "-",
          color: colorChip.green,
          pointer: true,
        },
      ];
      grayTong = createNode({
        mother: contentsAreaLeft,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          width: withOut(0),
          height: String(blockHeight) + ea,
          background: colorChip.gray0,
          borderRadius: String(5) + "px",
          marginBottom: String(blockMarginBottom) + ea,
        }
      });
      for (let { value, color } of responseValueArr) {
        createNode({
          mother: grayTong,
          style: {
            display: "inline-flex",
            width: "calc(100% / " + String(columns.length) + ")",
            height: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          },
          children: [
            {
              text: value,
              style: {
                fontSize: String(valueSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                position: "relative",
                top: String(valueTextTop) + ea,
              }
            }
          ]
        });
      }


      // contents area down - pending response

      contentsAreaRight = createNode({
        mother: contentsArea,
        style: {
          display: "none",
          position: "relative",
          height: withOut(grayInnerPadding * 2, ea),
          width: withOut(grayInnerPadding * 2, ea),
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

      blackTong = createNode({
        mother: contentsAreaRight,
        style: {
          display: "flex",
          position: "sticky",
          flexDirection: "row",
          top: String(0),
          width: withOut(0),
          height: String(blockHeight) + ea,
          background: colorChip.gradientGray,
          borderRadius: String(5) + "px",
          marginBottom: String(blockMarginBottom) + ea,
          zIndex: String(1),
        }
      });
      for (let column of columns) {
        createNode({
          mother: blackTong,
          style: {
            display: "inline-flex",
            width: "calc(100% / " + String(columns.length) + ")",
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

      responseSumTotal = 0;
      responseSumNon = 0;
      responseSumPaid = 0;
      for (let z = 0; z < pending.length; z++) {
        thisResponse = pending[z].bill.responseObject;
        responseName = thisResponse.name;

        confirmState = Math.floor(thisResponse.items.reduce((acc, curr) => { return acc + curr.amount.pure }, 0));
        payAmount = Math.floor(thisResponse.pay.reduce((acc, curr) => { return acc + curr.amount }, 0));
        nonPayAmount = confirmState - payAmount;
        payDate = '-';
        if (thisResponse.pay.length > 0) {
          payDate = dateToString(thisResponse.pay[0].date);
        }
        if (payDate === '-') {
          payMethod = "-";
          payProof = "-";
        } else {
          payMethod = "알 수 없음";
          if (thisResponse.proofs.length > 0) {
            payMethod = thisResponse.proofs[0].method;
          }
          payProof = "알 수 없음";
          if (thisResponse.proofs.length > 0) {
            payProof = thisResponse.proofs[0].proof;
          }
        }

        responseSumTotal += confirmState;
        responseSumNon += nonPayAmount;
        responseSumPaid += payAmount;

        responseValueArr = [
          {
            value: pending[z].proid,
            color: colorChip.black,
            pointer: true,
          },
          {
            value: pending[z].names.name,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: pending[z].names.designer,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: responseName,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: pending[z].classification.classification,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: '-',
            color: colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(confirmState),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(nonPayAmount),
            color: nonPayAmount !== 0 ? colorChip.purple : colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(payAmount),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: payDate,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: payMethod,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: "지급 진행",
            color: colorChip.green,
            pointer: true,
          },
        ];

        whiteTong = createNode({
          mother: contentsAreaRight,
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
        for (let { value, color, pointer } of responseValueArr) {
          createNode({
            mother: whiteTong,
            style: {
              display: "inline-flex",
              width: "calc(100% / " + String(columns.length) + ")",
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              cursor: pointer ? "pointer" : "",
            },
            children: [
              {
                text: value,
                style: {
                  fontSize: String(valueSize) + ea,
                  fontWeight: String(valueWeight),
                  color: color,
                  position: "relative",
                  top: String(valueTextTop) + ea,
                }
              }
            ]
          });
        }
      }
      for (let z = 0; z < needs.length; z++) {
        thisResponse = needs[z].bill.responseObject;
        responseName = thisResponse.name;

        confirmState = Math.floor(thisResponse.items.reduce((acc, curr) => { return acc + curr.amount.pure }, 0));
        payAmount = Math.floor(thisResponse.pay.reduce((acc, curr) => { return acc + curr.amount }, 0));
        nonPayAmount = confirmState - payAmount;
        payDate = '-';
        if (thisResponse.pay.length > 0) {
          payDate = dateToString(thisResponse.pay[0].date);
        }
        if (payDate === '-') {
          payMethod = "-";
          payProof = "-";
        } else {
          payMethod = "알 수 없음";
          if (thisResponse.proofs.length > 0) {
            payMethod = thisResponse.proofs[0].method;
          }
          payProof = "알 수 없음";
          if (thisResponse.proofs.length > 0) {
            payProof = thisResponse.proofs[0].proof;
          }
        }

        responseSumTotal += confirmState;
        responseSumNon += nonPayAmount;
        responseSumPaid += payAmount;

        responseValueArr = [
          {
            value: needs[z].proid,
            color: colorChip.black,
            pointer: true,
          },
          {
            value: needs[z].names.name,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: needs[z].names.designer,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: responseName,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: needs[z].classification.classification,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: needs[z].classification.free ? "프리랜서 정산" : (needs[z].classification.simple ? "현금 영수증 확인" : "세금 계산서 확인"),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(confirmState),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(nonPayAmount),
            color: nonPayAmount !== 0 ? colorChip.purple : colorChip.black,
            pointer: false,
          },
          {
            value: autoComma(payAmount),
            color: colorChip.black,
            pointer: false,
          },
          {
            value: payDate,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: payMethod,
            color: colorChip.black,
            pointer: false,
          },
          {
            value: "지급 진행",
            color: colorChip.green,
            pointer: true,
          },
        ];
        whiteTong = createNode({
          mother: contentsAreaRight,
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
        for (let { value, color, pointer } of responseValueArr) {
          createNode({
            mother: whiteTong,
            style: {
              display: "inline-flex",
              width: "calc(100% / " + String(columns.length) + ")",
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              cursor: pointer ? "pointer" : "",
            },
            children: [
              {
                text: value,
                style: {
                  fontSize: String(valueSize) + ea,
                  fontWeight: String(valueWeight),
                  color: color,
                  position: "relative",
                  top: String(valueTextTop) + ea,
                }
              }
            ]
          });
        }
      }

      responseValueArr = [
        {
          value: "총계",
          color: colorChip.black,
          pointer: true,
        },
        {
          value: "-",
          color: colorChip.black,
          pointer: false,
        },
        {
          value: "-",
          color: colorChip.black,
          pointer: false,
        },
        {
          value: "-",
          color: colorChip.black,
          pointer: false,
        },
        {
          value: "-",
          color: colorChip.black,
          pointer: false,
        },
        {
          value: "-",
          color: colorChip.black,
          pointer: false,
        },
        {
          value: autoComma(responseSumTotal),
          color: colorChip.black,
          pointer: false,
        },
        {
          value: autoComma(responseSumNon),
          color: colorChip.black,
          pointer: false,
        },
        {
          value: autoComma(responseSumPaid),
          color: colorChip.black,
          pointer: false,
        },
        {
          value: "-",
          color: colorChip.black,
          pointer: false,
        },
        {
          value: "-",
          color: colorChip.black,
          pointer: false,
        },
        {
          value: "-",
          color: colorChip.green,
          pointer: true,
        },
      ];
      grayTong = createNode({
        mother: contentsAreaRight,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          width: withOut(0),
          height: String(blockHeight) + ea,
          background: colorChip.gray0,
          borderRadius: String(5) + "px",
          marginBottom: String(blockMarginBottom) + ea,
        }
      });
      for (let { value, color } of responseValueArr) {
        createNode({
          mother: grayTong,
          style: {
            display: "inline-flex",
            width: "calc(100% / " + String(columns.length) + ")",
            height: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          },
          children: [
            {
              text: value,
              style: {
                fontSize: String(valueSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                position: "relative",
                top: String(valueTextTop) + ea,
              }
            }
          ]
        });
      }


    } catch (e) {
      console.log(e);
    }
  }
}

CalculationJs.prototype.excuteResponse = async function (bilid, responseIndex, date) {
  if (typeof bilid !== "string" || typeof responseIndex !== "number" || typeof date !== "object") {
    throw new Error("input => [ bilid, responseIndex, amount, date ]");
  }
  if (!(date instanceof Date)) {
    throw new Error("must be date object");
  }
  const instance = this;
  const { totalContents, ea, belowHeight, projects, bills } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, copyJson } = GeneralJs;
  try {
    const oid = "";
    const method = "계좌 이체";
    const thisBill = bills.find((obj) => { return obj.bilid === bilid });
    if (thisBill === undefined) {
      throw new Error("invaild bilid");
    }
    if (thisBill.responses[responseIndex] === undefined) {
      throw new Error("invaild index");
    }
    const proid = thisBill.links.proid;
    const thisProject = projects.find((obj) => { return obj.proid === proid });
    const thisResponse = thisBill.responses[responseIndex];
    const { pay, name, target } = thisResponse;
    let whereQuery, updateQuery;
    let projectWhereQuery, projectUpdateQuery;
    let amount;

    amount = Math.floor(thisResponse.items.reduce((acc, curr) => { return acc + curr.amount.pure }, 0));

    whereQuery = { bilid };
    updateQuery = {};

    if (pay.length === 0) {
      updateQuery["responses." + String(responseIndex) + ".pay"] = [ { amount, date, oid } ];
      updateQuery["responses." + String(responseIndex) + ".proofs"] = [ { date, method, proof: thisProject.process.calculation.info.proof, to: thisProject.process.calculation.info.to } ];
    } else if (pay.length === 1) {
      updateQuery["responses." + String(responseIndex) + ".pay." + String(0) + ".amount"] = amount;
      updateQuery["responses." + String(responseIndex) + ".pay." + String(0) + ".date"] = date;
      updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".date"] = date;
      updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".method"] = method;
      updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".proof"] = thisProject.process.calculation.info.proof;
      updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".to"] = thisProject.process.calculation.info.to;
    } else {
      updateQuery["responses." + String(responseIndex) + ".pay"] = [ { amount, date, oid } ];
      updateQuery["responses." + String(responseIndex) + ".proofs"] = [ { date, method, proof: thisProject.process.calculation.info.proof, to: thisProject.process.calculation.info.to } ];
    }

    await ajaxJson({
      mode: "update",
      collection: "generalBill",
      db: "python",
      whereQuery,
      updateQuery
    }, PYTHONHOST + "/generalMongo");


    if (/홈리에종 선금/gi.test(name) || /홈리에종 잔금/gi.test(name)) {

      projectWhereQuery = { proid };
      projectUpdateQuery = {};

      if (/홈리에종 선금/gi.test(name)) {

        projectUpdateQuery["process.calculation.payments.first.amount"] = Math.floor(amount);
        projectUpdateQuery["process.calculation.payments.first.date"] = date;
        projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor(thisProject.process.calculation.payments.totalAmount - amount);

      } else if (/홈리에종 잔금/gi.test(name)) {

        projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor(amount);
        projectUpdateQuery["process.calculation.payments.remain.date"] = date;

      }

      await ajaxJson({
        whereQuery: projectWhereQuery,
        updateQuery: projectUpdateQuery
      }, BACKHOST + "/rawUpdateProject");

    }

  } catch (e) {
    console.log(e);
  }
}

CalculationJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, equalJson, returnGet } = GeneralJs;
  try {
    const getObj = returnGet();
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

    this.bills = bills;
    this.projects = projects;
    this.matrix = [];
    this.names = [];
    this.baseMaker();
    this.extractMatrix();
    this.searchMatrix();
    this.reportMatrix();

    if (getObj.mode === "report") {
      (this.queueView())();
    }

    document.getElementById("moveLeftArea").remove();
    document.getElementById("moveRightArea").remove();

    loading.remove();

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
