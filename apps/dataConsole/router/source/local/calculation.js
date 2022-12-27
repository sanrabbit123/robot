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

  this.contentsLoad = contentsLoad;
}

CalculationJs.prototype.whiteCardView = function (proid) {
  const instance = this;
  const { totalContents, ea, belowHeight, projects } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, removeByClass, setQueue } = GeneralJs;
  return async function (e) {
    try {
      const project = projects.find((obj) => { return obj.proid === proid });
      const zIndex = 4;
      const blank = "&nbsp;&nbsp;&nbsp;";
      const whiteCardClassName = "whiteCardClassName";
      const responsePlusButtonPopupClassName = "responsePlusButtonPopupClassName";
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
      let whiteTongDom;
      let payRealAmount;
      let refundGo;
      let oidArr;
      let refundReceipt;
      let responsePlusButton;
      let responsePlusButtonMenus;
      let plusCircleWidth;
      let plusCircleMargin;
      let plusSize, plusWeight, plusTextTop;
      let buttonWidth, buttonHeight;
      let buttonBetween;
      let buttonSize, buttonWeight, buttonTextTop;

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

      plusCircleWidth = 36;
      plusCircleMargin = 10;

      plusSize = 34;
      plusWeight = 500;
      plusTextTop = -3;

      buttonWidth = 96;
      buttonHeight = 30;
      buttonBetween = 4;
      buttonSize = 13;
      buttonWeight = 700;
      buttonTextTop = isMac() ? -1 : 1;

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
        "환수 확인",
      ];

      responsePlusButtonMenus = [
        {
          words: "시공 정산",
          func: function () {
            return async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const bilid = this.getAttribute("bilid");
                const desid = this.getAttribute("desid");
                const cliid = this.getAttribute("cliid");
                let loading;


                console.log(proid, bilid, desid, cliid);

                await ajaxJson({ bilid }, PYTHONHOST + "/responseInjection");
                window.alert("업데이트 되었습니다!");
                loading = instance.mother.grayLoading();
                setQueue(() => {
                  instance.contentsLoad();
                  (instance.whiteCardView(proid))();
                  loading.remove();
                }, 500);

                removeByClass(responsePlusButtonPopupClassName);
              } catch (e) {
                console.log(e);
              }
            }
          }
        }
      ];

      // base

      removeByClass(whiteCardClassName);

      cancelBack = createNode({
        mother: totalContents,
        class: [ whiteCardClassName ],
        event: (e) => {
          removeByClass(whiteCardClassName);
        },
        set: "fixed",
        style: {
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
        payRealAmount = 0;
        if (thisRequest.pay.length > 0) {
          payDate = dateToString(thisRequest.pay[0].date);
          payRealAmount = thisRequest.pay.reduce((acc, curr) => { return acc + curr.amount }, 0);
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

        refundGo = "환불 진행";
        refundReceipt = null;
        oidArr = thisRequest.pay.map((o) => { return o.oid }).filter((oid) => { return oid !== '' });
        refundReceipt = thisRequest.info.find((o) => {
          return typeof o === "object" && o.key === "refundReceipt" && oidArr.includes(o.oid)
        });
        if (refundReceipt !== null && refundReceipt !== undefined) {
          refundGo = "환불 요청";
        }
        if (cancelAmount !== 0) {
          refundGo = "환불 완료";
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
            event: null,
          },
          {
            value: autoComma(supplyAmount),
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(vatAmount),
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(currentState),
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(confirmState),
            color: confirmState === 0 ? colorChip.black : (payDate === '-' ? colorChip.red : colorChip.black),
            pointer: false,
            event: null,
          },
          {
            value: payDate === '-' ? String(0) : autoComma(payRealAmount),
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: payDate,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: payMethod,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: payProof,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(cancelAmount),
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: cancelDate,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: (payRealAmount === 0 ? "0%" : (String(Math.floor((cancelAmount / payRealAmount) * 10000) / 100) + '%')),
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: refundGo,
            color: (/진행/gi.test(refundGo) ? colorChip.green : (/요청/gi.test(refundGo) ? colorChip.black : colorChip.deactive)),
            pointer: /진행/gi.test(refundGo),
            event: (/진행/gi.test(refundGo) ? instance.makeRefundEvent(project.bill.bilid, z, project.proid) : null),
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
        for (let { value, color, pointer, event } of requestValueArr) {
          createNode({
            mother: whiteTong,
            event,
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
            event: null,
          },
          {
            value: project.process.calculation.method,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: String(project.process.calculation.percentage) + '%',
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: '-',
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(confirmState),
            color: colorChip.black,
            pointer: true,
            event: instance.amountFixEvent(project.bill.bilid, z, project.proid),
          },
          {
            value: autoComma(nonPayAmount),
            color: nonPayAmount !== 0 ? colorChip.purple : colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(payAmount),
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: payDate,
            color: colorChip.black,
            pointer: true,
            event: instance.dateFixEvent(project.bill.bilid, z, project.proid),
          },
          {
            value: payMethod,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(refundAmount),
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: refundDate,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: "지급 진행",
            color: colorChip.green,
            pointer: true,
            event: instance.makeExcuteEvent(project.bill.bilid, z, project.proid),
          },
          {
            value: "환수 확인",
            color: colorChip.green,
            pointer: true,
            event: instance.makeRepayEvent(project.bill.bilid, z, project.proid),
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
        for (let { value, color, pointer, event } of responseValueArr) {
          createNode({
            mother: whiteTong,
            event,
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


      // response plus button

      responsePlusButton = createNode({
        mother: contentsAreaRight,
        attribute: {
          proid: project.proid,
          bilid: project.bill.bilid,
          desid: project.desid,
          cliid: project.cliid,
        },
        event: {
          selectstart: (e) => {
            e.preventDefault();
          },
          click: function(e) {
            const self = this;
            const mother = self.parentElement;
            const proid = this.getAttribute("proid");
            const bilid = this.getAttribute("bilid");
            const desid = this.getAttribute("desid");
            const cliid = this.getAttribute("cliid");
            let cancelBox, baseBox;

            cancelBox = createNode({
              mother,
              class: [ responsePlusButtonPopupClassName ],
              event: {
                click: (e) => {
                  removeByClass(responsePlusButtonPopupClassName);
                }
              },
              style: {
                position: "fixed",
                top: String(0),
                left: String(0),
                width: withOut(0),
                height: withOut(0),
                zIndex: String(1),
              }
            });

            baseBox = createNode({
              mother,
              attribute: { proid, bilid, desid, cliid },
              class: [ responsePlusButtonPopupClassName ],
              style: {
                display: "inline-flex",
                flexDirection: "column",
                position: "absolute",
                right: String(plusCircleMargin) + ea,
                bottom: String(plusCircleMargin + plusCircleWidth + 8) + ea,
                width: String(buttonWidth) + ea,
                animation: "fadeuplite 0.2s ease forwards",
                zIndex: String(1),
              }
            });

            for (let { words, func } of responsePlusButtonMenus) {
              createNode({
                mother: baseBox,
                attribute: { proid, bilid, desid, cliid },
                event: {
                  selectstart: (e) => {
                    e.preventDefault();
                  },
                  click: func(),
                },
                style: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  width: String(buttonWidth) + ea,
                  height: String(buttonHeight) + ea,
                  background: colorChip.green,
                  borderRadius: String(8) + "px",
                  marginTop: String(buttonBetween) + ea,
                  cursor: "pointer",
                },
                child: {
                  text: words,
                  event: {
                    selectstart: (e) => {
                      e.preventDefault();
                    }
                  },
                  style: {
                    position: "relative",
                    display: "inline-block",
                    fontSize: String(buttonSize) + ea,
                    fontWeight: String(buttonWeight),
                    color: colorChip.white,
                    top: String(buttonTextTop) + ea,
                    cursor: "pointer",
                  }
                }
              });
            }

          },
        },
        style: {
          display: "flex",
          position: "absolute",
          bottom: String(plusCircleMargin) + ea,
          right: String(plusCircleMargin) + ea,
          width: String(plusCircleWidth) + ea,
          height: String(plusCircleWidth) + ea,
          borderRadius: String(plusCircleWidth) + ea,
          background: colorChip.gradientGreen,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        child: {
          text: "+",
          event: {
            selectstart: (e) => {
              e.preventDefault();
            },
          },
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(plusSize) + ea,
            fontWeight: String(plusWeight),
            fontFamily: "graphik",
            color: colorChip.white,
            top: String(plusTextTop) + ea,
            cursor: "pointer",
          }
        }
      });

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
        } else {
          for (let dom of instance.names) {
            dom.parentElement.parentElement.parentElement.style.display = "none";
          }
        }
      }
    }
  }

  this.searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      setDebounce(searchEvent(this.value, e), "__searchMatrix__", 200);
    }
  });
}

CalculationJs.prototype.reportMatrix = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects } = this;
  const { ajaxJson, uniqueValue, blankHref } = GeneralJs;
  const { belowButtons: { square: { reportIcon } } } = this.mother;

  reportIcon.addEventListener("click", this.queueView());
  reportIcon.addEventListener("contextmenu", this.refundView());
}

CalculationJs.prototype.queueView = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects, bills } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, copyJson, removeByClass } = GeneralJs;
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

      removeByClass(whiteCardClassName);

      cancelBack = createNode({
        mother: totalContents,
        class: [ whiteCardClassName ],
        event: (e) => {
          removeByClass(whiteCardClassName);
        },
        set: "fixed",
        style: {
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
            event: null,
          },
          {
            value: needs[z].names.name,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: needs[z].names.designer,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: responseName,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: needs[z].classification.classification,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: needs[z].classification.free ? "프리랜서 정산" : (needs[z].classification.simple ? "현금 영수증 확인" : "세금 계산서 확인"),
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(confirmState),
            color: colorChip.black,
            pointer: true,
            event: instance.amountFixEvent(needs[z].bill.bilid, needs[z].bill.responseIndex, needs[z].proid, true),
          },
          {
            value: autoComma(nonPayAmount),
            color: nonPayAmount !== 0 ? colorChip.purple : colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(payAmount),
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: payDate,
            color: colorChip.black,
            pointer: true,
            event: instance.dateFixEvent(needs[z].bill.bilid, needs[z].bill.responseIndex, needs[z].proid, true),
          },
          {
            value: payMethod,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: "지급 진행",
            color: colorChip.green,
            pointer: true,
            event: instance.makeExcuteEvent(needs[z].bill.bilid, needs[z].bill.responseIndex, needs[z].proid, true),
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
        for (let { value, color, pointer, event } of responseValueArr) {
          createNode({
            mother: whiteTong,
            event,
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
            event: null,
          },
          {
            value: pending[z].names.name,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: pending[z].names.designer,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: responseName,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: pending[z].classification.classification,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: '-',
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(confirmState),
            color: colorChip.black,
            pointer: true,
            event: instance.amountFixEvent(pending[z].bill.bilid, pending[z].bill.responseIndex, pending[z].proid, true),
          },
          {
            value: autoComma(nonPayAmount),
            color: nonPayAmount !== 0 ? colorChip.purple : colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(payAmount),
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: payDate,
            color: colorChip.black,
            pointer: true,
            event: instance.dateFixEvent(pending[z].bill.bilid, pending[z].bill.responseIndex, pending[z].proid, true),
          },
          {
            value: payMethod,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: "지급 진행",
            color: colorChip.green,
            pointer: true,
            event: instance.makeExcuteEvent(pending[z].bill.bilid, pending[z].bill.responseIndex, pending[z].proid, true),
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
        for (let { value, color, pointer, event } of responseValueArr) {
          createNode({
            mother: whiteTong,
            event,
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
            event: null,
          },
          {
            value: needs[z].names.name,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: needs[z].names.designer,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: responseName,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: needs[z].classification.classification,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: needs[z].classification.free ? "프리랜서 정산" : (needs[z].classification.simple ? "현금 영수증 확인" : "세금 계산서 확인"),
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(confirmState),
            color: colorChip.black,
            pointer: true,
            event: instance.amountFixEvent(needs[z].bill.bilid, needs[z].bill.responseIndex, needs[z].proid, true),
          },
          {
            value: autoComma(nonPayAmount),
            color: nonPayAmount !== 0 ? colorChip.purple : colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(payAmount),
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: payDate,
            color: colorChip.black,
            pointer: true,
            event: instance.dateFixEvent(needs[z].bill.bilid, needs[z].bill.responseIndex, needs[z].proid, true),
          },
          {
            value: payMethod,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: "지급 진행",
            color: colorChip.green,
            pointer: true,
            event: instance.makeExcuteEvent(needs[z].bill.bilid, needs[z].bill.responseIndex, needs[z].proid, true),
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
        for (let { value, color, pointer, event } of responseValueArr) {
          createNode({
            mother: whiteTong,
            event,
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

CalculationJs.prototype.refundView = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects, bills } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, copyJson, removeByClass } = GeneralJs;
  return async function (e) {
    try {

      e.preventDefault();

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
      let requestValueArr;
      let whiteTong;
      let responseSumTotal;
      let responseSumNon;
      let responseSumPaid;
      let grayTong;
      let loading;
      let targetRequestsTong;
      let refundReceipt;
      let thisProject;

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

      targetRequestsTong = [];
      for (let bill of bills) {
        for (let request of bill.requests) {
          refundReceipt = null;
          refundReceipt = request.info.find((o) => {
            return (typeof o === "object" && o.key === "refundReceipt" && o.oid !== undefined);
          });
          if (refundReceipt !== undefined && refundReceipt !== null) {
            if (!request.cancel.map((o) => { return o.oid }).includes(refundReceipt.oid)) {
              thisProject = projects.find((o) => {
                return o.cliid === bill.participant.customer.id && o.desid === bill.participant.designer.id;
              });
              targetRequestsTong.push({
                bill: copyJson(bill),
                project: copyJson(thisProject),
                request: copyJson(request),
                refundReceipt: copyJson(refundReceipt)
              });
            }
          }
        }
      }

      columns = [
        "아이디",
        "고객",
        "디자이너",
        "구분",
        "입금액",
        "환불액",
        "환불 비율",
        "환불 계좌",
        "계좌명",
        "환불 진행",
      ];

      contentsAreaLeft = {};
      contentsAreaRight = {};

      loading = instance.mother.grayLoading();

      // base

      removeByClass(whiteCardClassName);

      cancelBack = createNode({
        mother: totalContents,
        class: [ whiteCardClassName ],
        event: (e) => {
          removeByClass(whiteCardClassName);
        },
        set: "fixed",
        style: {
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
            text: "환불 리스트",
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

      for (let z = 0; z < targetRequestsTong.length; z++) {

        requestValueArr = [
          {
            value: targetRequestsTong[z].project.proid,
            color: colorChip.black,
            pointer: true,
            event: null,
          },
          {
            value: targetRequestsTong[z].bill.participant.customer.name,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: targetRequestsTong[z].bill.participant.designer.name,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: targetRequestsTong[z].request.name,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(Math.floor(targetRequestsTong[z].request.pay.reduce((acc, curr) => { return acc + curr.amount }, 0))),
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: autoComma(targetRequestsTong[z].refundReceipt.data.refund),
            color: colorChip.black,
            pointer: true,
            event: null,
          },
          {
            value: String(Math.floor((targetRequestsTong[z].refundReceipt.data.refund / targetRequestsTong[z].request.pay.reduce((acc, curr) => { return acc + curr.amount }, 0)) * 10000) / 100) + '%',
            color: colorChip.black,
            pointer: true,
            event: null,
          },
          {
            value: targetRequestsTong[z].refundReceipt.data.info.bankName + " " + targetRequestsTong[z].refundReceipt.data.info.accountNumber,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: targetRequestsTong[z].refundReceipt.data.info.accountName,
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: "환불 진행",
            color: colorChip.green,
            pointer: true,
            event: instance.makeCashRefundEvent(copyJson(targetRequestsTong[z])),
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

        for (let { value, color, pointer, event } of requestValueArr) {
          createNode({
            mother: whiteTong,
            event,
            style: {
              display: "inline-flex",
              width: "calc(100% / " + String(columns.length) + ")",
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
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
                  textAlign: "center",
                }
              }
            ]
          });
        }

      }


    } catch (e) {
      console.log(e);
    }
  }
}

CalculationJs.prototype.makeExcuteEvent = function (bilid, responseIndex, proid, queueMode = false) {
  const instance = this;
  const { setQueue } = GeneralJs;
  return async function (e) {
    try {
      await instance.excuteResponse(bilid, responseIndex, new Date());
      window.alert("업데이트 되었습니다!");
      const loading = instance.mother.grayLoading();
      setQueue(() => {
        instance.contentsLoad();
        if (!queueMode) {
          (instance.whiteCardView(proid))();
        } else {
          (instance.queueView())();
        }
        loading.remove();
      }, 500);
    } catch (e) {
      console.log(e);
    }
  }
}

CalculationJs.prototype.makeRefundEvent = function (bilid, requestIndex, proid) {
  const instance = this;
  const { setQueue } = GeneralJs;
  return async function (e) {
    try {
      await instance.excuteRefund(bilid, requestIndex, proid);
      const loading = instance.mother.grayLoading();
      for (let project of instance.projects) {
        project.bill = instance.bills.find((obj) => {
          return ((obj.links.proid === project.proid) && (obj.links.method === (project.service.online ? "online" : "offline")))
        });
      }
      setQueue(() => {
        instance.contentsLoad();
        (instance.whiteCardView(proid))();
        loading.remove();
      }, 500);
    } catch (e) {
      console.log(e);
    }
  }
}

CalculationJs.prototype.makeCashRefundEvent = function (refundRequest) {
  const instance = this;
  const { setQueue } = GeneralJs;
  const refundRequestString = JSON.stringify(refundRequest);
  return async function (e) {
    try {
      await instance.cashRefund(refundRequestString);
      const loading = instance.mother.grayLoading();
      for (let project of instance.projects) {
        project.bill = instance.bills.find((obj) => {
          return ((obj.links.proid === project.proid) && (obj.links.method === (project.service.online ? "online" : "offline")))
        });
      }
      setQueue(() => {
        instance.contentsLoad();
        (instance.refundView())({ preventDefault() { return null } });
        loading.remove();
      }, 500);
    } catch (e) {
      console.log(e);
    }
  }
}

CalculationJs.prototype.makeRepayEvent = function (bilid, responseIndex, proid) {
  const instance = this;
  const { setQueue } = GeneralJs;
  return async function (e) {
    try {
      let amount;

      do {
        amount = await GeneralJs.prompt("돌려 받은 금액을 원 단위로 알려주세요! (예: 1000000원)");
        if (amount !== null) {
          amount = Number(amount.replace(/[^0-9]/gi, ''));
        } else {
          amount = 0;
        }
      } while (amount === 0 || Number.isNaN(amount))

      await instance.excuteRepay(bilid, responseIndex, new Date(), amount);
      window.alert("업데이트 되었습니다!");
      const loading = instance.mother.grayLoading();
      setQueue(() => {
        instance.contentsLoad();
        (instance.whiteCardView(proid))();
        loading.remove();
      }, 500);
    } catch (e) {
      console.log(e);
    }
  }
}

CalculationJs.prototype.cashRefund = async function (refundRequestString) {
  const instance = this;
  const { totalContents, ea, belowHeight, projects, bills } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, copyJson, equalJson } = GeneralJs;
  const refundRequest = equalJson(refundRequestString);
  try {
    const {
      bill: thisBill,
      request: thisRequest,
      project: thisProject,
      refundReceipt
    } = refundRequest;
    const { bilid } = thisBill;
    const thisBillIndex = bills.findIndex((o) => { return o.bilid === thisBill.bilid });
    const requestIndex = thisBill.requests.findIndex((o) => { return o.id === thisRequest.id });
    const payIndex = thisRequest.pay.findIndex((o) => { return o.oid === refundReceipt.oid });
    const { accountNumber, bankName, accountName } = refundReceipt.data.info;
    const refundPrice = refundReceipt.data.refund;
    const percentage = (refundReceipt.data.refund / refundReceipt.data.original) * 100;
    const kind = percentage === 100 ? "cashEntire" : "cashPartial";
    let res;

    res = await ajaxJson({ mode: "execute", kind, bilid, requestIndex, payIndex, percentage, accountNumber, bankName, accountName, refundPrice }, PYTHONHOST + "/requestRefund", { equal: true });
    instance.bills[thisBillIndex] = res.bill;

  } catch (e) {
    console.log(e);
  }
}

CalculationJs.prototype.dateFixEvent = function (bilid, responseIndex, proid, queueMode = false) {
  const instance = this;
  const { totalContents, ea } = this;
  const { setQueue, colorChip, createNode, withOut, removeByClass, stringToDate } = GeneralJs;
  return async function (e) {
    try {
      const dateFixTargetClassName = "dateFixTargetClassName";
      const zIndex = 5;
      const thisBilid = bilid;
      const thisIndex = responseIndex;
      const calendar = instance.mother.makeCalendar(new Date(), async function (e) {
        try {
          const targetDate = stringToDate(this.getAttribute("buttonValue"));
          await instance.excuteResponse(thisBilid, thisIndex, targetDate);
          window.alert("업데이트 되었습니다!");
          removeByClass(dateFixTargetClassName);
          const loading = instance.mother.grayLoading();
          setQueue(() => {
            instance.contentsLoad();
            if (!queueMode) {
              (instance.whiteCardView(proid))();
            } else {
              (instance.queueView())();
            }
            loading.remove();
          }, 500);
        } catch (e) {
          console.log(e);
        }
      });
      const { top, left, height } = this.getBoundingClientRect();
      const margin = 6;

      createNode({
        mother: totalContents,
        class: [ dateFixTargetClassName ],
        event: (e) => {
          removeByClass(dateFixTargetClassName);
        },
        set: "fixed",
        style: {
          background: "transparent",
          zIndex: String(zIndex),
        }
      });

      calendar.calendarBase.classList.add("dateFixTargetClassName");
      calendar.calendarBase.style.position = "fixed";
      calendar.calendarBase.style.background = colorChip.white;
      calendar.calendarBase.style.zIndex = String(zIndex);
      calendar.calendarBase.style.top = String(top + height + margin) + ea;
      calendar.calendarBase.style.left = String(left) + ea;
      calendar.calendarBase.style.borderRadius = String(5) + "px";
      calendar.calendarBase.style.boxShadow = "0px 5px 15px -9px " + colorChip.shadow;
      calendar.calendarBase.style.animation = "fadeuplite 0.3s ease";

      totalContents.appendChild(calendar.calendarBase);

    } catch (e) {
      console.log(e);
    }
  }
}

CalculationJs.prototype.amountFixEvent = function (bilid, responseIndex, proid, queueMode = false) {
  const instance = this;
  const { totalContents, ea, bills, projects } = this;
  const { setQueue, colorChip, createNode, withOut, removeByClass, stringToDate, autoComma, isMac, ajaxJson } = GeneralJs;
  return async function (e) {
    try {
      const amountFixTargetClassName = "amountFixTargetClassName";
      const zIndex = 5;
      const thisBill = bills.find((obj) => { return obj.bilid === bilid });
      const thisBilid = bilid;
      const thisIndex = responseIndex;
      const thisResponse = thisBill.responses[thisIndex];
      const { top, left, height, width } = this.getBoundingClientRect();
      let margin, whiteWidth, whiteHeight;
      let whiteBase;
      let size, weight;
      let confirmState;

      margin = 6;
      whiteWidth = 160;
      whiteHeight = 38;

      size = 14;
      weight = 400;

      confirmState = Math.floor(thisResponse.items.reduce((acc, curr) => { return acc + curr.amount.pure }, 0));

      createNode({
        mother: totalContents,
        class: [ amountFixTargetClassName ],
        event: (e) => {
          removeByClass(amountFixTargetClassName);
        },
        set: "fixed",
        style: {
          background: colorChip.realBlack,
          opacity: String(0.3),
          zIndex: String(zIndex),
        }
      });

      whiteBase = createNode({
        mother: totalContents,
        class: [ amountFixTargetClassName ],
        style: {
          position: "fixed",
          background: colorChip.white,
          zIndex: String(zIndex),
          top: String(top + height + margin) + ea,
          left: String(left + (width / 2) - (whiteWidth / 2)) + ea,
          borderRadius: String(5) + "px",
          boxShadow: "0px 5px 15px -9px " + colorChip.shadow,
          animation: "fadeuplite 0.3s ease",
          width: String(whiteWidth) + ea,
          height: String(whiteHeight) + ea,
        }
      });

      whiteInput = createNode({
        mother: whiteBase,
        mode: "input",
        attribute: {
          type: "text"
        },
        set: "center",
        event: {
          keypress: async function (e) {
            try {
              if (e.key === "Enter") {
                const thisValue = this.value.replace(/[^0-9]/gi, '');
                if (thisValue !== "" && !Number.isNaN(Number(thisValue))) {
                  const thisAmount = Number(thisValue);
                  const res = await ajaxJson({
                    bilid: thisBilid,
                    responseIndex: thisIndex,
                    amount: thisAmount,
                  }, PYTHONHOST + "/passiveResponse", { equal: true });
                  const thisBillIndex = bills.findIndex((obj) => { return obj.bilid === res.bilid });
                  const thisProjectIndex = projects.findIndex((obj) => { return obj.proid === res.proid });
                  instance.bills[thisBillIndex] = res.bill;
                  instance.projects[thisProjectIndex].bill = res.bill;
                  window.alert("업데이트 되었습니다!");
                  removeByClass(amountFixTargetClassName);
                  const loading = instance.mother.grayLoading();
                  setQueue(() => {
                    instance.contentsLoad();
                    if (!queueMode) {
                      (instance.whiteCardView(res.proid))();
                    } else {
                      (instance.queueView())();
                    }
                    loading.remove();
                  }, 500);
                }
              }
            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          width: withOut(0, ea),
          height: String(isMac() ? 98 : 100) + '%',
          textAlign: "center",
          border: String(0),
          borderRadius: String(5) + "px",
          outline: String(0),
          color: colorChip.green,
          fontSize: String(size) + ea,
          fontWeight: String(weight),
        }
      })

      whiteInput.value = autoComma(confirmState);
      whiteInput.focus();

    } catch (e) {
      console.log(e);
    }
  }
}

CalculationJs.prototype.excuteResponse = async function (bilid, responseIndex, date) {
  if (typeof bilid !== "string" || typeof responseIndex !== "number" || typeof date !== "object") {
    throw new Error("input => [ bilid, responseIndex, date ]");
  }
  if (!(date instanceof Date)) {
    throw new Error("must be date object");
  }
  const instance = this;
  const { totalContents, ea, belowHeight, projects, bills } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, copyJson } = GeneralJs;
  try {
    const res = await ajaxJson({ bilid, responseIndex, date }, PYTHONHOST + "/excuteResponse", { equal: true });
    if (res.message === "success") {
      const thisBillIndex = bills.findIndex((obj) => { return obj.bilid === res.bilid });
      const thisProjectIndex = projects.findIndex((obj) => { return obj.proid === res.proid });
      instance.bills[thisBillIndex] = res.bill;
      instance.projects[thisProjectIndex].bill = res.bill;
      instance.projects[thisProjectIndex].process.calculation.payments.first.amount = res.project.process.calculation.payments.first.amount;
      instance.projects[thisProjectIndex].process.calculation.payments.first.date = res.project.process.calculation.payments.first.date;
      instance.projects[thisProjectIndex].process.calculation.payments.remain.amount = res.project.process.calculation.payments.remain.amount;
      instance.projects[thisProjectIndex].process.calculation.payments.remain.date = res.project.process.calculation.payments.remain.date;
    } else {
      window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
      window.location.reload();
    }
  } catch (e) {
    console.log(e);
  }
}

CalculationJs.prototype.excuteRefund = async function (bilid, requestIndex, proid) {
  if (typeof bilid !== "string" || typeof requestIndex !== "number" || typeof proid !== "string") {
    throw new Error("input => [ bilid, requestIndex, string ]");
  }
  const instance = this;
  const { totalContents, ea, belowHeight, projects, bills } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, copyJson } = GeneralJs;
  try {
    const thisBill = bills.find((obj) => { return obj.bilid === bilid });
    const thisBillIndex = bills.findIndex((obj) => { return obj.bilid === bilid });
    if (thisBill === undefined) {
      throw new Error("invaild bilid");
    }
    const thisProject = projects.find((obj) => { return obj.proid === proid });
    const thisRequest = thisBill.requests[requestIndex];
    if (thisRequest.pay.length === 0 || thisRequest.proofs.length === 0) {
      window.alert("이 건에 대해서는 환불을 진행할 수 없습니다!");
      return 0;
    }
    if (thisRequest.pay.length > 1) {
      window.alert("다중 결제 건의 환불에 대해서는 ca 콘솔을 이용하거나 별도 문의해주세요!");
    }
    const method = thisRequest.proofs[0].method;
    const cancel = (thisRequest.cancel.length !== 0);
    const amount = thisRequest.pay.reduce((acc, curr) => { return acc + curr.amount }, 0);
    const payIndex = 0;
    let raw;
    let percentage, accountNumber, bankName, accountName;
    let bankCode;
    let kind;
    let res;
    let entire;
    let ratio;
    let refundPrice;

    if (!cancel && window.confirm("환불을 진행할까요?")) {
      percentage = 100;

      // ratio

      if (!window.confirm("전체 환불을 진행할까요? (부분일시, '취소')")) {

        entire = false;
        refundPrice = 0;

        if (window.confirm("비율로 환불을 할까요, 금액으로 환불을 할까요? (비율 => '확인' / 금액 => '취소')")) {

          ratio = true;

          do {
            raw = await GeneralJs.prompt("돌려줄 금액의 비율을 알려주세요! (예: 50%)");
            if (raw !== null) {
              percentage = Number(raw.replace(/[^0-9]/gi, ''));
            } else {
              percentage = 0;
            }
          } while (percentage === 0 || Number.isNaN(percentage))

        } else {

          ratio = false;

          do {
            raw = await GeneralJs.prompt("돌려줄 금액을 원 단위로 알려주세요! (예: 1,000,000원)");
            if (raw !== null) {
              refundPrice = Number(raw.replace(/[^0-9]/gi, ''));
            } else {
              refundPrice = 0;
            }
          } while (refundPrice === 0 || Number.isNaN(refundPrice))

          percentage = (Math.floor((raw / amount) * 100000) / 100000) * 100;

        }

      } else {
        entire = true;
        ratio = true;
      }


      // method

      if (/카드/gi.test(method)) {

        kind = "card" + ((entire || percentage === 100) ? "Entire" : "Partial");

        if (ratio) {
          if (window.confirm("카드 " + String(percentage) + "% 환불을 진행합니다. 확실합니까?")) {
            res = await GeneralJs.ajaxJson({ kind, bilid, requestIndex, payIndex, percentage }, PYTHONHOST + "/requestRefund", { equal: true });
            instance.bills[thisBillIndex] = res.bill;
          }
        } else {
          if (window.confirm("카드 " + autoComma(refundPrice) + "원 환불을 진행합니다. 확실합니까?")) {
            res = await GeneralJs.ajaxJson({ kind, bilid, requestIndex, payIndex, percentage, refundPrice }, PYTHONHOST + "/requestRefund", { equal: true });
            instance.bills[thisBillIndex] = res.bill;
          }
        }

      } else if (/^무/gi.test(method)) {

        kind = "vaccount" + ((entire || percentage === 100) ? "Entire" : "Partial");
        bankCode = await GeneralJs.ajaxJson({}, PYTHONHOST + "/returnBankCode");
        do {
          raw = await GeneralJs.prompt("은행 이름을 알려주세요!");
          if (raw !== null) {
            raw = raw.trim();
            bankName = null;
            for (let arr of bankCode) {
              if ((new RegExp(arr[0], "gi")).test(raw)) {
                if (window.confirm("은행 이름이 '" + arr[0] + "'가 맞나요?")) {
                  bankName = arr[0];
                }
              }
            }
          } else {
            bankName = null;
          }
        } while (bankName === null)
        do {
          raw = await GeneralJs.prompt("계좌 번호를 알려주세요!");
          if (raw !== null) {
            accountNumber = null;
            accountNumber = raw.replace(/[^0-9]/gi, '').trim();
          } else {
            accountNumber = null;
          }
        } while (accountNumber === null)
        do {
          raw = await GeneralJs.prompt("예금주를 알려주세요!");
          if (raw !== null) {
            accountName = null;
            accountName = raw.trim();
          } else {
            accountName = null;
          }
        } while (accountName === null)

        if (ratio) {
          if (window.confirm("무통장 " + String(percentage) + "% 환불을 진행합니다.(" + bankName + " " + accountNumber + " " + accountName + ") 확실합니까?")) {
            res = await GeneralJs.ajaxJson({ kind, bilid, requestIndex, payIndex, percentage, accountNumber, bankName, accountName }, PYTHONHOST + "/requestRefund", { equal: true });
            instance.bills[thisBillIndex] = res.bill;
          }
        } else {
          if (window.confirm("무통장 " + String(refundPrice) + "원 환불을 진행합니다.(" + bankName + " " + accountNumber + " " + accountName + ") 확실합니까?")) {
            res = await GeneralJs.ajaxJson({ kind, bilid, requestIndex, payIndex, percentage, accountNumber, bankName, accountName, refundPrice }, PYTHONHOST + "/requestRefund", { equal: true });
            instance.bills[thisBillIndex] = res.bill;
          }
        }

      } else {

        kind = "cash" + (percentage === 100 ? "Entire" : "Partial");
        bankCode = await GeneralJs.ajaxJson({}, PYTHONHOST + "/returnBankCode");

        do {
          raw = await GeneralJs.prompt("은행 이름을 알려주세요!");
          if (raw !== null) {
            raw = raw.trim();
            bankName = null;
            for (let arr of bankCode) {
              if ((new RegExp(arr[0], "gi")).test(raw)) {
                if (window.confirm("은행 이름이 '" + arr[0] + "'가 맞나요?")) {
                  bankName = arr[0];
                }
              }
            }
          } else {
            bankName = null;
          }
        } while (bankName === null)
        do {
          raw = await GeneralJs.prompt("계좌 번호를 알려주세요!");
          if (raw !== null) {
            accountNumber = null;
            accountNumber = raw.replace(/[^0-9]/gi, '').trim();
          } else {
            accountNumber = null;
          }
        } while (accountNumber === null)
        do {
          raw = await GeneralJs.prompt("예금주를 알려주세요!");
          if (raw !== null) {
            accountName = null;
            accountName = raw.trim();
          } else {
            accountName = null;
          }
        } while (accountName === null)

        if (ratio) {
          if (window.confirm("계좌 이체 " + String(percentage) + "% 환불 요청을 진행합니다.(" + bankName + " " + accountNumber + " " + accountName + ") 확실합니까?")) {
            res = await GeneralJs.ajaxJson({ kind, bilid, requestIndex, payIndex, percentage, accountNumber, bankName, accountName }, PYTHONHOST + "/requestRefund", { equal: true });
            instance.bills[thisBillIndex] = res.bill;
          }
        } else {
          if (window.confirm("계좌 이체 " + String(refundPrice) + "원 환불 요청을 진행합니다.(" + bankName + " " + accountNumber + " " + accountName + ") 확실합니까?")) {
            res = await GeneralJs.ajaxJson({ kind, bilid, requestIndex, payIndex, percentage, accountNumber, bankName, accountName, refundPrice }, PYTHONHOST + "/requestRefund", { equal: true });
            instance.bills[thisBillIndex] = res.bill;
          }
        }

      }

    }

  } catch (e) {
    console.log(e);
  }
}

CalculationJs.prototype.excuteRepay = async function (bilid, responseIndex, date, amount) {
  if (typeof bilid !== "string" || typeof responseIndex !== "number" || typeof date !== "object" || typeof amount !== "number") {
    throw new Error("input => [ bilid, responseIndex, amount, date ]");
  }
  if (!(date instanceof Date)) {
    throw new Error("must be date object");
  }
  const instance = this;
  const { totalContents, ea, belowHeight, projects, bills } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, copyJson } = GeneralJs;
  try {
    const res = await ajaxJson({ bilid, responseIndex, date, amount }, PYTHONHOST + "/excuteRepay", { equal: true });
    if (res.message === "success") {
      const thisBillIndex = bills.findIndex((obj) => { return obj.bilid === res.bilid });
      const thisProjectIndex = projects.findIndex((obj) => { return obj.proid === res.proid });
      instance.bills[thisBillIndex] = res.bill;
      instance.projects[thisProjectIndex].bill = res.bill;
      instance.projects[thisProjectIndex].process.calculation.payments.first.refund = res.project.process.calculation.payments.first.refund;
      instance.projects[thisProjectIndex].process.calculation.payments.first.cancel = res.project.process.calculation.payments.first.cancel;
      instance.projects[thisProjectIndex].process.calculation.payments.remain.refund = res.project.process.calculation.payments.remain.refund;
      instance.projects[thisProjectIndex].process.calculation.payments.remain.cancel = res.project.process.calculation.payments.remain.cancel;
    } else {
      window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
      window.location.reload();
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
    });

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
