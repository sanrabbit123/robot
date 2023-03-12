const ProcessJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
}

ProcessJs.prototype.baseMaker = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects, media } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, serviceParsing, equalJson, svgMaker } = GeneralJs;
  const splitToken = "__split__";
  const dateConvert = (dateObject) => {
    const res = dateToString(dateObject);
    if (/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/gi.test(res)) {
      return res.trim();
    } else {
      return '-';
    }
  }
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
  let nameWidth, designerWidth, idWidth, requestWidth;
  let contentsLoad;
  let clientTable;
  let clientBlack;
  let tableBlockHeight;
  let tableBlockFactorWidth;
  let tableBetween;
  let firstMargin;
  let tableSize, tableWeight, tableBoldWeight;
  let tableTextTop;
  let clientColumns;
  let clientValueArr;
  let tableValueBlockHeight;
  let blockVisualPadding;
  let managers;
  let newProjectsTong;
  let thisProjects, thisProjects2;
  let designers;
  let desid, designer;
  let thisProject;
  let partner;
  let callHistory;
  let latestCall;
  let wordingWidth;
  let checkBoxWidth, checkBoxMargin, checkBoxVisualTop;
  let latestCallNumber;
  let meetingDate, meetingDateNumber;
  let remainDate, remainDateNumber;
  let startDate, startDateNumber;
  let endDate, endDateNumber;
  let rawDate, rawDateNumber;
  let designerDom;
  let subArea;
  let subAreaBottom;
  let tableMiddleWeight;
  let subAreaBetween;
  let onlineCircleTop, onlineCircleWidth;
  let onlineStatusSize, onlineStatusWeight;
  let onlineCircleMarginRight;

  clientColumns = [
    "고객",
    "상태",
    "시공사",
    "마지막 연락",
    "계약금",
    "현장 미팅",
    "잔금",
    "시작일",
    "종료일",
    "일정표 공유",
    "상태 공유",
    "디자이너 글",
  ];

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
  tableBlockFactorWidth = 132;
  tableBetween = 20;

  blockVisualPadding = 8;

  nameWidth = 56;
  designerWidth = 98;
  idWidth = 82;
  requestWidth = tableBlockFactorWidth * clientColumns.length;

  tableSize = 13;
  tableWeight = 400;
  tableMiddleWeight = 500;
  tableBoldWeight = 700;
  tableTextTop = (isMac() ? -1 : 1);

  wordingWidth = 77;
  checkBoxWidth = 10;
  checkBoxMargin = 5;
  checkBoxVisualTop = -0.5;

  subAreaBottom = 18;
  subAreaBetween = 4;

  onlineCircleTop = 2.5;
  onlineCircleWidth = 6;
  onlineCircleMarginRight = 4;
  onlineStatusSize = 14;
  onlineStatusWeight = 400;

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
      text: "담당자",
      style: {
        width: String(nameWidth) + ea,
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
      text: "고객",
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

    managers = [ ...new Set(instance.projects.map((obj) => { return obj.history.manager })) ];
    managers.sort();
    managers = managers.filter((str) => { return str !== '-' });
    managers.push('-');

    newProjectsTong = [];
    for (let manager of managers) {
      thisProjects = instance.projects.filter((obj) => { return obj.history.manager === manager });
      designers = [ ...new Set(thisProjects.map((obj) => { return obj.designer.desid + splitToken + obj.designer.designer })) ];
      for (let complex of designers) {
        [ desid, designer ] = complex.split(splitToken);
        thisProjects2 = thisProjects.filter((obj) => { return obj.designer.designer === designer && obj.designer.desid === desid });
        thisProjects2 = thisProjects2.filter((obj) => { return !/^[드완]/.test(obj.process.status) })
        newProjectsTong.push({ manager, designer, desid, projects: thisProjects2 });
      }
    }

    for (let { manager, designer, desid, projects } of newProjectsTong) {
      if (projects.length > 0) {

        motherBlock = createNode({
          mother: grayTong,
          attribute: { desid },
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
          attribute: { desid },
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
              attribute: { desid },
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
  
        subArea = createNode({
          mother: targetTong,
          style: {
            display: "inline-flex",
            flexDirection: "column",
            position: "absolute",
            left: String(firstMargin) + ea,
            bottom: String(subAreaBottom) + ea,
            alignItems: "start",
          }
        });

        createNode({
          mother: subArea,
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: String(subAreaBetween) + ea,
          },
          children: [
            {
              text: "전체 :&nbsp;&nbsp;",
              style: {
                fontSize: String(tableSize) + ea,
                fontWeight: String(tableMiddleWeight),
                color: colorChip.black,
              }
            },
            {
              text: String(projects.length),
              style: {
                fontSize: String(tableSize) + ea,
                fontWeight: String(tableMiddleWeight),
                color: colorChip.green,
              }
            },
            {
              text: "건",
              style: {
                fontSize: String(tableSize) + ea,
                fontWeight: String(tableMiddleWeight),
                color: colorChip.black,
              }
            },
            {
              text: "&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;",
              style: {
                fontSize: String(tableSize) + ea,
                fontWeight: String(tableWeight),
                color: colorChip.gray4,
              }
            },
            {
              text: "진행중 :&nbsp;&nbsp;",
              style: {
                fontSize: String(tableSize) + ea,
                fontWeight: String(tableMiddleWeight),
                color: colorChip.black,
              }
            },
            {
              text: String(projects.filter((obj) => { return obj.process.contract.remain.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() }).filter((obj) => { return obj.process.contract.form.date.from.valueOf() <= (new Date()).valueOf() }).length),
              style: {
                fontSize: String(tableSize) + ea,
                fontWeight: String(tableMiddleWeight),
                color: colorChip.green,
              }
            },
            {
              text: "건",
              style: {
                fontSize: String(tableSize) + ea,
                fontWeight: String(tableMiddleWeight),
                color: colorChip.black,
              }
            },
          ]
        })


        createNode({
          mother: subArea,
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                top: String(onlineCircleTop) + ea,
                width: String(onlineCircleWidth) + ea,
                height: String(onlineCircleWidth) + ea,
                borderRadius: String(onlineCircleWidth) + ea,
                background: colorChip.gray3,
                marginRight: String(onlineCircleMarginRight) + ea,
              }
            },
            {
              text: "offline",
              style: {
                fontSize: String(onlineStatusSize) + ea,
                fontWeight: String(onlineStatusWeight),
                color: colorChip.deactive,
                fontFamily: "graphik",
              }
            }
          ]
        })


        nameDom = createNode({
          mother: targetTong,
          text: manager,
          style: {
            width: String(nameWidth) + ea,
            display: "inline-block",
            position: "relative",
            verticalAlign: "top",
            fontSize: String(textSize) + ea,
            fontWeight: String(700),
            color: colorChip.black,
            top: String(textTop) + ea,
            marginLeft: String(firstMargin) + ea,
            cursor: "pointer",
          },
          bold: {
            fontSize: String(textSize) + ea,
            fontWeight: String(300),
            color: colorChip.deactive,
          }
        });
  
        designerDom = createNode({
          mother: targetTong,
          text: designer,
          style: {
            width: String(designerWidth) + ea,
            display: "inline-block",
            position: "relative",
            verticalAlign: "top",
            fontSize: String(textSize) + ea,
            fontWeight: String(700),
            color: colorChip.black,
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
        
        clientTable = createNode({
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
  
        clientBlack = createNode({
          mother: clientTable,
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            height: String(tableBlockHeight) + ea,
            overflow: "hidden",
            borderRadius: String(5) + "px",
          }
        });
        for (let i = 0; i < clientColumns.length; i++) {
          createNode({
            mother: clientBlack,
            style: {
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              background: colorChip.gray1,
              height: withOut(0, ea),
              width: i === clientColumns.length - 1 ? String(tableBlockFactorWidth) + ea : String(tableBlockFactorWidth - 1) + ea,
              borderRight: i === clientColumns.length - 1 ?  "" : "1px solid " + colorChip.gray3,
            },
            children: [
              {
                text: clientColumns[i],
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
  
        latestCallNumber = 0;
        meetingDateNumber = 0;
        remainDateNumber = 0;
        startDateNumber = 0;
        endDateNumber = 0;
        rawDateNumber = 0;
        for (let z = 0; z < projects.length; z++) {
          thisProject = projects[z];
          callHistory = equalJson(JSON.stringify(thisProject.clientHistory.curation.analytics.call.out.concat(thisProject.clientHistory.curation.analytics.call.in))).filter((obj) => { return obj.success });
          callHistory.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

          latestCall = '-';
          if (callHistory.length > 0) {
            latestCall = dateToString(callHistory[0].date);
          }
          if (latestCall === '-') {
            latestCallNumber = latestCallNumber + 1;
          }
          
          partner = (thisProject.process.design.construct === null ? '-' : (thisProject.process.design.construct.contract.partner === "디자이너" ? "디자이너" : (thisProject.process.design.construct.contract.partner === "고객" ? "고객" : (thisProject.process.design.construct.contract.partner.trim() === "" ? "-" : "홈리에종"))));

          meetingDate = dateConvert(thisProject.process.contract.meeting.date);
          if (meetingDate === '-') {
            meetingDateNumber = meetingDateNumber + 1;
          }
          remainDate = dateConvert(thisProject.process.contract.remain.date);
          if (remainDate === '-') {
            remainDateNumber = remainDateNumber + 1;
          }
          startDate = dateConvert(thisProject.process.contract.form.date.from);
          if (startDate === '-') {
            startDateNumber = startDateNumber + 1;
          }
          endDate = dateConvert(thisProject.process.contract.form.date.to);
          if (endDate === '-') {
            endDateNumber = endDateNumber + 1;
          }
          rawDate = dateConvert(thisProject.rawDate);
          if (rawDate === '-') {
            rawDateNumber = rawDateNumber + 1;
          }

          clientValueArr = [
            {
              value: thisProject.name + "&nbsp;&nbsp;<b%" + serviceParsing(thisProject.service, false, true) + "%b>",
              color: colorChip.black,
              check: false,
            },
            {
              value: thisProject.process.status,
              color: colorChip.black,
              check: false,
            },
            {
              value: partner,
              color: partner === "홈리에종" ? colorChip.green : colorChip.black,
              check: false,
            },
            {
              value: latestCall,
              color: colorChip.black,
              check: true,
            },
            {
              value: dateConvert(thisProject.process.contract.first.date),
              color: colorChip.black,
              check: true,
            },
            {
              value: meetingDate,
              color: meetingDate === '-' ? colorChip.red : colorChip.black,
              check: true,
            },
            {
              value: remainDate,
              color: remainDate === '-' ? colorChip.red : colorChip.black,
              check: true,
            },
            {
              value: startDate,
              color: startDate === '-' ? colorChip.red : colorChip.black,
              check: true,
            },
            {
              value: endDate,
              color: endDate === '-' ? colorChip.red : colorChip.black,
              check: true,
            },
            {
              value: remainDate,
              color: remainDate === '-' ? colorChip.red : colorChip.black,
              check: true,
            },
            {
              value: remainDate,
              color: remainDate === '-' ? colorChip.red : colorChip.black,
              check: true,
            },
            {
              value: rawDate,
              color: rawDate === '-' ? colorChip.red : colorChip.black,
              check: true,
            },
          ];
  
          clientBlack = createNode({
            mother: clientTable,
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              overflow: "hidden",
              borderRadius: String(5) + "px",
            }
          });
          for (let i = 0; i < clientValueArr.length; i++) {
            createNode({
              mother: clientBlack,
              attribute: {
                proid: thisProject.proid,
              },
              event: {
                click: instance.whiteCardView(thisProject.proid),
              },
              style: {
                display: "inline-flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                background: colorChip.white,
                height: String(tableValueBlockHeight) + ea,
                paddingTop: String(z === 0 ? blockVisualPadding : 0) + ea,
                paddingBottom: String(z === projects.length - 1 ? blockVisualPadding : 0) + ea,
                width: i === clientColumns.length - 1 ? String(tableBlockFactorWidth) + ea : String(tableBlockFactorWidth - 1) + ea,
                borderRight: i === clientColumns.length - 1 ?  "" : "1px solid " + colorChip.gray3,
                cursor: "pointer",
              },
              children: [
                {
                  text: clientValueArr[i].value,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(wordingWidth) + ea,
                    textAlign: "center",
                    fontSize: String(tableSize) + ea,
                    fontWeight: String(tableWeight),
                    color: clientValueArr[i].color,
                    top: String(tableTextTop) + ea,
                  },
                  bold: {
                    fontSize: String(tableSize) + ea,
                    fontWeight: String(200),
                    color: colorChip.green,
                  }
                },
                {
                  mode: "svg",
                  source: svgMaker.checkBox(colorChip.green),
                  style: {
                    display: clientValueArr[i].check ? "inline-block" : "none",
                    position: "relative",
                    width: String(checkBoxWidth) + ea,
                    marginLeft: String(checkBoxMargin) + ea,
                    top: String(checkBoxVisualTop) + ea,
                  }
                }
              ]
            });
          }
  
        }

        clientValueArr = [
          {
            value: "총계",
            color: colorChip.black,
            check: false,
          },
          {
            value: String(projects.length),
            color: colorChip.black,
            check: false,
          },
          {
            value: '-',
            color: colorChip.black,
            check: false,
          },
          {
            value: (latestCallNumber === 0 ? String(latestCallNumber) : "<b%" + String(latestCallNumber) + "%b>") + " <u%/%u> " + String(projects.length),
            color: colorChip.black,
            check: false,
          },
          {
            value: String(0) + " <u%/%u> " + String(projects.length),
            color: colorChip.black,
            check: false,
          },
          {
            value: (meetingDateNumber === 0 ? String(meetingDateNumber) : "<b%" + String(meetingDateNumber) + "%b>") + " <u%/%u> " + String(projects.length),
            color: colorChip.black,
            check: false,
          },
          {
            value: (remainDateNumber === 0 ? String(remainDateNumber) : "<b%" + String(remainDateNumber) + "%b>") + " <u%/%u> " + String(projects.length),
            color: colorChip.black,
            check: false,
          },
          {
            value: (startDateNumber === 0 ? String(startDateNumber) : "<b%" + String(startDateNumber) + "%b>") + " <u%/%u> " + String(projects.length),
            color: colorChip.black,
            check: false,
          },
          {
            value: (endDateNumber === 0 ? String(endDateNumber) : "<b%" + String(endDateNumber) + "%b>") + " <u%/%u> " + String(projects.length),
            color: colorChip.black,
            check: false,
          },
          {
            value: (remainDateNumber === 0 ? String(remainDateNumber) : "<b%" + String(remainDateNumber) + "%b>") + " <u%/%u> " + String(projects.length),
            color: colorChip.black,
            check: false,
          },
          {
            value: (remainDateNumber === 0 ? String(remainDateNumber) : "<b%" + String(remainDateNumber) + "%b>") + " <u%/%u> " + String(projects.length),
            color: colorChip.black,
            check: false,
          },
          {
            value: (rawDateNumber === 0 ? String(rawDateNumber) : "<b%" + String(rawDateNumber) + "%b>") + " <u%/%u> " + String(projects.length),
            color: colorChip.black,
            check: false,
          },
        ];

        clientBlack = createNode({
          mother: clientTable,
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            overflow: "hidden",
            borderRadius: String(5) + "px",
          }
        });
        for (let i = 0; i < clientValueArr.length; i++) {
          createNode({
            mother: clientBlack,
            style: {
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              background: colorChip.gray0,
              height: String(tableBlockHeight) + ea,
              width: i === clientColumns.length - 1 ? String(tableBlockFactorWidth) + ea : String(tableBlockFactorWidth - 1) + ea,
              borderRight: i === clientColumns.length - 1 ?  "" : "1px solid " + colorChip.gray3,
              },
            children: [
              {
                text: clientValueArr[i].value,
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: String(wordingWidth) + ea,
                  textAlign: "center",
                  fontSize: String(tableSize) + ea,
                  fontWeight: String(tableWeight),
                  color: clientValueArr[i].color,
                  top: String(tableTextTop) + ea,
                },
                bold: {
                  fontSize: String(tableSize) + ea,
                  fontWeight: String(tableWeight),
                  color: colorChip.red,
                },
                under: {
                  fontSize: String(tableSize) + ea,
                  fontWeight: String(tableWeight),
                  color: colorChip.deactive,
                }
              }
            ]
          });
        }


      }
    }
  }

  contentsLoad();

  this.contentsLoad = contentsLoad;
}

ProcessJs.prototype.whiteCardView = function (proid) {
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

      instance.insertFormStatusBox(project, contentsArea);

    } catch (e) {
      console.log(e);
    }
  }
}

ProcessJs.prototype.insertFormStatusBox = async function (project, contentsArea) {
  const instance = this;
  const mother = this.mother;
  const { ea, media } = this;
  const { proid, desid } = project;
  const client = project.client;
  const designer = project.designer;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const generalSmall = !veryBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, svgMaker, selfHref, scrollTo, variableArray, findByAttribute, setQueue, serviceParsing, removeByClass, equalJson } = GeneralJs;
  const dateToHangul = (dateObject) => {
    return `${String(dateObject.getFullYear()).slice(2)}년 ${String(dateObject.getMonth() + 1)}월 ${String(dateObject.getDate())}일`;
  }
  const hangulToDate = (hangul) => {
    hangul = hangul.replace(/ /gi, '');
    const [ year, month, date ] = hangul.split(/[가-힣]/gi);
    return new Date(2000 + Number(year), Number(month) - 1, Number(date));
  }
  const siblingKeywords = "siblingKeywords__";
  const valueBlockClassName = "valueBlockClassName__";
  const blockContextMenuClassName = "blockContextMenuClassName__";
  const svgArrowColorTargetClassName = "svgArrowColorTargetClassName__";
  try {
    let margin;
    let paddingTop;
    let whiteBottomMargin;
    let titleFontSize;
    let bottomMargin;
    let whiteBlock;
    let grayTong;
    let contents;
    let innerMargin;
    let arrowWidth, arrowHeight;
    let textTop;
    let textSize, textWeight;
    let textMarginLeft;
    let mobileVisualPaddingValue;
    let button, buttons;
    let blockBetween;
    let blockBetweenBottom;
    let blockHeight;
    let lineTop;
    let columnsNumber;
    let textFileWeight;
    let whitePadding;
    let smallSize, smallWeight, smallBetween;
    let textTextTop;
    let smallTextTop;
    let panDom;
    let veryBigSize;
    let veryBigWeight;
    let firstWidth;
    let buttonWidth, buttonHeight;
    let buttonOuterPadding, buttonInnerMargin;
    let descriptionBetween;
    let panWidth, panVisualLeft;
    let veryBigTextTop;
    let circleWidth, circleTop, circleLeft;
    let subButtonWidth;
    let thirdWidth;
    let imageBoxVisualPaddingBottom;
    let imageBetween;
    let panBoxBetween;
    let wordingPaddingTop0, wordingPaddingTop1;
    let mainTong;
    let wordingBoxWidth;
    let contentsTong;
    let contentsTongPaddingBottom;
    let bigTextSize;
    let bigTextWeight;
    let bigTextTextTop;
    let clock;
    let formPanBase;
    let thisPan;
    let panBetween;
    let panHeight, panInnerMargin;
    let panCheckBoxWidth;
    let panWhitePaddingLeft;
    let panBlockBetween, panBlockBigBetween;
    let buttonSize, buttonWeight, buttonTextTop;
    let panPaddingTop;
    let panTitleSize, panTitleWeight;
    let formPanBaseMarginBottom;
    let checkBoxWidth;
    let blockTextSize, blockTextWeight;
    let siblings;
    let thisForm;
    let colorArr;
    let barArrBase;
    let barArrBlock;
    let barArrBlockValuesBase;
    let childrenMaxNumber;
    let thisValueNumber;
    let barBaseHeight, barFactorHeight, barFactorBetween;
    let barFirstWidth;
    let barArrBasePaddingTop;
    let barArrBaseMarginTop;
    let barArrTitleTextTop;
    let reloadMainButtons;
    let valueIndex;
    let finalValueNumber;
    let percentageSize;
    let percentageTextTop;
    let blackButtonWidth, blackButtonHeight, blackButtonBetween, blackButtonMargin;
    let blackButtonSize, blackButtonWeight, blackButtonTextTop;
    let whiteTong;
    let mainClickEvent, mainContextEvent;
    let detailArrowAreaWidth, detailArrowWidth;
    let detailArrowVisualTop;

    bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
    margin = <%% 55, 55, 47, 39, 6 %%>;
    paddingTop = <%% 44, 44, 36, 34, 5.4 %%>;
  
    whiteBottomMargin = <%% 52, 47, 39, 36, 5.6 %%>;
  
    titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  
    bigTextSize = <%% 36, 36, 36, 36, 4.4 %%>;
    bigTextWeight = <%% 100, 100, 100, 100, 100 %%>;
    bigTextTextTop = <%% (isMac() ? -7 : -5), (isMac() ? -7 : -5), -7, -7, -1 %%>;
  
    veryBigSize = <%% 23, 21, 20, 16, 4.4 %%>;
    veryBigWeight = <%% 700, 700, 700, 700, 700 %%>;
    veryBigTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -2 : 0), (isMac() ? -1 : 0), -1 %%>;
  
    innerMargin = <%% 0, 0, 0, 0, 1 %%>;
  
    textTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;
    smallTextTop = <%% (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), 0 %%>;
  
    textSize = <%% 14, 14, 13, 12, 3.2 %%>;
    textWeight = <%% 700, 700, 700, 700, 700 %%>;
    textFileWeight = <%% 400, 400, 400, 400, 400 %%>;
  
    whitePadding = <%% 12, 12, 8, 8, 2.2 %%>;
  
    blockBetween = <%% 36, 28, 26, 24, 5 %%>;
    blockBetweenBottom = <%% 10, 4, 4, 4, 2.2 %%>;
    blockHeight = <%% 36, 36, 32, 26, 4 %%>;
  
    lineTop = <%% 18, 18, 16, 13, 1.9 %%>;
  
    firstWidth = <%% 298, 230, 213, 142, 300 %%>;
  
    panWidth = <%% 20, 20, 20, 20, 2 %%>;
    panVisualLeft = <%% 1, 1, 1, 1, 1 %%>;
  
    circleWidth = <%% 5, 5, 5, 4, 0.8 %%>;
    circleTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 1.2 %%>;
    circleLeft = <%% -7, -7, -7, -5, -0.8 %%>;
  
    arrowWidth = <%% 18, 16, 15, 14, 3.6 %%>;
    arrowHeight = <%% 8, 8, 8, 7, 2 %%>;
  
    subButtonWidth = <%% 90, 72, 72, 64, 16 %%>;
  
    mobileVisualPaddingValue = 0.2;
  
    thirdWidth = <%% 240, 0, 0, 0, 0 %%>;
  
    imageBoxVisualPaddingBottom = <%% 4, 2, 2, 2, 0 %%>;
    imageBetween = <%% 32, 16, 12, 12, 6 %%>;
    panBoxBetween = <%% 12, 32, 26, 24, 12 %%>;
  
    wordingPaddingTop0 = <%% 300, 213, 213, 213, 213 %%>;
    wordingPaddingTop1 = <%% 309, 243, 243, 243, 243 %%>;
  
    wordingBoxWidth = <%% 175, 185, 175, 115, 175 %%>;
  
    contentsTongPaddingBottom = <%% 15, 15, 15, 15, 5 %%>;
    panBetween = <%% 28, 28, 24, 20, 2 %%>;
  
    panHeight = <%% 48, 48, 45, 42, 11 %%>;
    panInnerMargin = <%% 4, 4, 4, 3, 1 %%>;
  
    panCheckBoxWidth = <%% 28, 24, 20, 20, 8 %%>;
    checkBoxWidth = <%% 12, 11, 9, 9, 3 %%>;
  
    panWhitePaddingLeft = <%% 13, 14, 14, 14, 3.5 %%>; 
    panBlockBetween = <%% 8, 8, 6, 5, 1 %%>; 
    panBlockBigBetween = <%% 8, 8, 6, 5, 1 %%>; 
  
    buttonWidth = <%% 100, 80, 70, 60, 24 %%>;
    buttonHeight = <%% 36, 28, 26, 24, 8.2 %%>;
  
    buttonSize = <%% 15, 13, 12, 11, 3.5 %%>;
    buttonWeight = <%% 800, 800, 800, 800, 800 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;
  
    panPaddingTop = <%% 22, 16, 14, 14, 4 %%>;
  
    panTitleSize = <%% 16, 15, 14, 13, 3.8 %%>;
    panTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  
    formPanBaseMarginBottom = <%% 12, 8, 6, 6, 4 %%>;
  
    blockTextSize = <%% 14, 13, 12, 11, 3.2 %%>;
    blockTextWeight = <%% 600, 600, 600, 600, 600 %%>;
  
    barBaseHeight = <%% 40, 36, 32, 28, 6.8 %%>;
    barFirstWidth = <%% 70, 60, 50, 42, 14 %%>;
    barFactorHeight = <%% 20, 20, 18, 16, 5 %%>;
    barFactorBetween = <%% 0, 0, 0, 0, 0 %%>;

    barArrBasePaddingTop = <%% 38, 36, 32, 26, 8 %%>;
    barArrBaseMarginTop = <%% 48, 46, 40, 32, 9.5 %%>;

    barArrTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

    percentageSize = <%% 20, 20, 17, 14, 7.5 %%>;
    percentageTextTop = <%% -1, -1, -1, -1, 0 %%>;

    blackButtonWidth = <%% 132, 122, 114, 104, 28 %%>;
    blackButtonHeight = <%% 34, 30, 28, 26, 7 %%>;
    blackButtonBetween = <%% 4, 4, 3, 2, 1 %%>;
    blackButtonMargin = <%% 6, 6, 5, 4, 1.2 %%>;
    blackButtonSize = <%% 13, 12, 11, 10, 2.8 %%>;
    blackButtonWeight = <%% 600, 600, 600, 600, 600 %%>;
    blackButtonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;

    detailArrowAreaWidth = <%% 28, 28, 28, 28, 6 %%>;
    detailArrowVisualTop = <%% 0.5, 0.5, 0.5, 0.5, 0 %%>;
    detailArrowWidth = <%% 8, 8, 7, 7, 2 %%>;

    thisForm = await ajaxJson({ mode: "get", proid, desid }, SECONDHOST + "/projectDesignerStatus", { equal: true });
  
    reloadMainButtons = () => {};
    formPanBase = {};

    mainClickEvent = function () {
      return async function (e) {
        const self = this;
        const toggle = this.getAttribute("toggle");
        const middle = this.getAttribute("middle");
        const red = this.getAttribute("red");
        const x = Number(this.getAttribute("x"));
        const y = Number(this.getAttribute("y"));
        const deactive = (this.getAttribute("deactive") === "true");
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        try {
          let totalDom;
          let matrix;
          let maxX, maxY;
          let xArr, yArr;
          let tempObj;
          let targetDoms;
          let thisIndex;
          let finalIndex;

          siblings = [ ...document.querySelectorAll('.' + siblingKeywords + String(x)) ];
          thisIndex = siblings.findIndex((dom) => { return dom === self });

          if (!deactive) {
            if (toggle === "off") {
              if (red === "off") {

                for (let i = 0; i < siblings.length; i++) {
                  if (i < thisIndex) {
                    if (siblings[i].getAttribute("red") !== "on") {
                      siblings[i].style.background = colorChip.whiteGreen;
                      siblings[i].children[0].children[0].children[0].setAttribute("fill", colorChip.green);
                      siblings[i].children[1].children[0].style.color = colorChip.softGreen;
                      siblings[i].querySelector('.' + svgArrowColorTargetClassName).firstChild.style.fill = colorChip.softGreen;
                      siblings[i].setAttribute("toggle", "on");
                      siblings[i].setAttribute("middle", "on");
                      siblings[i].setAttribute("red", "off");
                    }
                  } else if (i === thisIndex) {
                    siblings[i].style.background = colorChip.gradientGreen;
                    siblings[i].children[0].children[0].children[0].setAttribute("fill", colorChip.white);
                    siblings[i].children[1].children[0].style.color = colorChip.black;
                    siblings[i].querySelector('.' + svgArrowColorTargetClassName).firstChild.style.fill = colorChip.green;
                    siblings[i].setAttribute("toggle", "on");
                    siblings[i].setAttribute("middle", "off");
                    siblings[i].setAttribute("red", "off");
                  } else {
                    siblings[i].style.background = colorChip.gray1;
                    siblings[i].children[0].children[0].children[0].setAttribute("fill", colorChip.gray4);
                    siblings[i].children[1].children[0].style.color = colorChip.deactive;
                    siblings[i].querySelector('.' + svgArrowColorTargetClassName).firstChild.style.fill = colorChip.deactive;
                    siblings[i].setAttribute("toggle", "off");
                    siblings[i].setAttribute("middle", "off");
                    siblings[i].setAttribute("red", "off");
                  }
                }

              } else {

                siblings[thisIndex].style.background = colorChip.whiteGreen;
                siblings[thisIndex].children[0].children[0].children[0].setAttribute("fill", colorChip.green);
                siblings[thisIndex].children[1].children[0].style.color = colorChip.softGreen;
                siblings[thisIndex].querySelector('.' + svgArrowColorTargetClassName).firstChild.style.fill = colorChip.softGreen;
                siblings[thisIndex].setAttribute("toggle", "on");
                siblings[thisIndex].setAttribute("middle", "on");
                siblings[thisIndex].setAttribute("red", "off");

              }
            } else {

              if (middle === "off") {

                if (siblings[thisIndex - 1] === undefined) {

                  siblings[thisIndex].style.background = colorChip.gray1;
                  siblings[thisIndex].children[0].children[0].children[0].setAttribute("fill", colorChip.gray4);
                  siblings[thisIndex].children[1].children[0].style.color = colorChip.deactive;
                  siblings[thisIndex].querySelector('.' + svgArrowColorTargetClassName).firstChild.style.fill = colorChip.deactive;
                  siblings[thisIndex].setAttribute("toggle", "off");
                  siblings[thisIndex].setAttribute("middle", "off");
                  siblings[thisIndex].setAttribute("red", "off");

                } else {

                  if (siblings[thisIndex - 1].getAttribute("middle") === "on") {

                    siblings[thisIndex].style.background = colorChip.gray1;
                    siblings[thisIndex].children[0].children[0].children[0].setAttribute("fill", colorChip.gray4);
                    siblings[thisIndex].children[1].children[0].style.color = colorChip.deactive;
                    siblings[thisIndex].querySelector('.' + svgArrowColorTargetClassName).firstChild.style.fill = colorChip.deactive;
                    siblings[thisIndex].setAttribute("toggle", "off");
                    siblings[thisIndex].setAttribute("middle", "off");
                    siblings[thisIndex].setAttribute("red", "off");

                    siblings[thisIndex - 1].style.background = colorChip.gradientGreen;
                    siblings[thisIndex - 1].children[0].children[0].children[0].setAttribute("fill", colorChip.white);
                    siblings[thisIndex - 1].children[1].children[0].style.color = colorChip.black;
                    siblings[thisIndex - 1].querySelector('.' + svgArrowColorTargetClassName).firstChild.style.fill = colorChip.green;
                    siblings[thisIndex - 1].setAttribute("toggle", "on");
                    siblings[thisIndex - 1].setAttribute("middle", "off");
                    siblings[thisIndex - 1].setAttribute("red", "off");

                  } else {

                    siblings[thisIndex].style.background = colorChip.gray1;
                    siblings[thisIndex].children[0].children[0].children[0].setAttribute("fill", colorChip.gray4);
                    siblings[thisIndex].children[1].children[0].style.color = colorChip.deactive;
                    siblings[thisIndex].querySelector('.' + svgArrowColorTargetClassName).firstChild.style.fill = colorChip.deactive;
                    siblings[thisIndex].setAttribute("toggle", "off");
                    siblings[thisIndex].setAttribute("middle", "off");
                    siblings[thisIndex].setAttribute("red", "off");

                    finalIndex = siblings.reduce((acc, curr, index) => {
                      if (curr.getAttribute("toggle") === "off") {
                        return acc;
                      } else {
                        return index;
                      }
                    }, -1);
                    
                    for (let i = 0; i < siblings.length; i++) {
                      if (i < finalIndex) {
                        // pass
                      } else if (i === finalIndex) {
                        siblings[i].style.background = colorChip.gradientGreen;
                        siblings[i].children[0].children[0].children[0].setAttribute("fill", colorChip.white);
                        siblings[i].children[1].children[0].style.color = colorChip.black;
                        siblings[i].querySelector('.' + svgArrowColorTargetClassName).firstChild.style.fill = colorChip.green;
                        siblings[i].setAttribute("toggle", "on");
                        siblings[i].setAttribute("middle", "off");
                        siblings[i].setAttribute("red", "off");
                      } else {
                        siblings[i].style.background = colorChip.gray1;
                        siblings[i].children[0].children[0].children[0].setAttribute("fill", colorChip.gray4);
                        siblings[i].children[1].children[0].style.color = colorChip.deactive;
                        siblings[i].querySelector('.' + svgArrowColorTargetClassName).firstChild.style.fill = colorChip.deactive;
                        siblings[i].setAttribute("toggle", "off");
                        siblings[i].setAttribute("middle", "off");
                        siblings[i].setAttribute("red", "off");
                      }
                    }

                  }
                }

              } else {
                siblings[thisIndex].style.background = colorChip.gray1;
                siblings[thisIndex].children[0].children[0].children[0].setAttribute("fill", colorChip.red);
                siblings[thisIndex].children[1].children[0].style.color = colorChip.red;
                siblings[thisIndex].querySelector('.' + svgArrowColorTargetClassName).firstChild.style.fill = colorChip.red;
                siblings[thisIndex].setAttribute("toggle", "off");
                siblings[thisIndex].setAttribute("middle", "off");
                siblings[thisIndex].setAttribute("red", "on");
              }
              
            }
          }

          totalDom = [ ...document.querySelectorAll('.' + valueBlockClassName) ];
          
          xArr = [];
          for (let dom of totalDom) {
            xArr.push(Number(dom.getAttribute("x")));
          }
          xArr.sort((a, b) => { return b - a; });
          maxX = xArr[0] + 1;

          matrix = [];
          for (let z = 0; z < maxX; z++) {
            targetDoms = totalDom.filter((dom) => { return Number(dom.getAttribute("x")) === z });
            targetDoms.sort((a, b) => { return Number(a.getAttribute("y")) - Number(b.getAttribute("y")); });
            tempObj = {
              title: targetDoms[0].getAttribute("mother"),
              children: []
            };
            for (let w = 0; w < targetDoms.length; w++) {
              tempObj.children.push({
                title: targetDoms[w].getAttribute("title"),
                deactive: targetDoms[w].getAttribute("deactive") === "true",
                value: targetDoms[w].getAttribute("toggle") === "on" ? 1 : 0,
                key: thisForm[z].children[w].key,
                children: equalJson(JSON.stringify(thisForm[z].children[w].children)),
              });
            }
            matrix.push(tempObj);
          }
          
          await ajaxJson({
            mode: "update",
            proid,
            desid,
            matrix
          }, SECONDHOST + "/projectDesignerStatus");

        } catch (e) {
          console.log(e);
        }
      }
    }

    mainContextEvent = function () {
      return async function (e) {
        try {
          e.preventDefault();
          e.stopPropagation();
          const self = this;
          const x = Number(this.getAttribute("x"));
          const y = Number(this.getAttribute("y"));
          const proid = this.getAttribute("proid");
          const desid = this.getAttribute("desid");
          const deactive = (this.getAttribute("deactive") === "true");
          const zIndex = 4;
          let cancelBack, whitePrompt;

          if (!deactive) {

            cancelBack = createNode({
              mother: formPanBase,
              class: [ blockContextMenuClassName ],
              event: {
                click: function (e) {
                  removeByClass(blockContextMenuClassName);
                }
              },
              style: {
                display: "block",
                position: "fixed",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: "transparent",
                zIndex: String(zIndex),
              }
            });

            whitePrompt = createNode({
              mother: formPanBase,
              class: [ blockContextMenuClassName ],
              style: {
                display: "inline-block",
                position: "absolute",
                top: String(e.clientY - formPanBase.getBoundingClientRect().top) + "px",
                left: desktop ? String(e.clientX - formPanBase.getBoundingClientRect().left) + "px" : "",
                right: desktop ? "" : String(0) + "px",
                width: String(blackButtonWidth) + ea,
                background: colorChip.white,
                borderRadius: String(5) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
                animation: "fadeuplite 0.3s ease forwards",
                zIndex: String(zIndex),
                padding: String(blackButtonMargin) + ea,
                paddingBottom: String(blackButtonMargin - blackButtonBetween) + ea,
              }
            });

            for (let z = 0; z < thisForm[x].children[y].children.length; z++) {
              createNode({
                mother: whitePrompt,
                attribute: {
                  x: String(x),
                  y: String(y),
                  z: String(z),
                  proid,
                  desid,
                  name: client.name,
                  designer: designer.designer,
                },
                event: {
                  click: async function (e) {
                    const self = this;
                    const x = Number(this.getAttribute("x"));
                    const y = Number(this.getAttribute("y"));
                    const z = Number(this.getAttribute("z"));
                    const proid = this.getAttribute("proid");
                    const desid = this.getAttribute("desid");
                    const type = thisForm[x].children[y].children[z].type;
                    try {
                      let tempFunction;
                      let key, photoBoo, thisStatusNumber;
                      let matrix;
                      let siblings;

                      if (type === "upload") {

                        key = thisForm[x].children[y].children[z].key;
                        photoBoo = thisForm[x].children[y].children[z].photo;
                        thisStatusNumber = instance.panContents.findIndex((o) => { return o.key === key });

                        removeByClass(blockContextMenuClassName);
                        instance.uploadFiles(thisStatusNumber, photoBoo).call(this, e);

                      } else if (type === "memo") {

                        key = thisForm[x].children[y].children[z].key;
                        thisStatusNumber = instance.panContents.findIndex((o) => { return o.key === key });

                        removeByClass(blockContextMenuClassName);
                        if (thisStatusNumber === -1) {
                          instance.plusMemo(thisStatusNumber, key, thisForm[x].children[y].children[z].title.replace(/메모/gi, "").trim()).call(this, e);
                        } else {
                          instance.plusMemo(thisStatusNumber).call(this, e);
                        }

                      } else if (type === "selection") {

                        matrix = equalJson(JSON.stringify(thisForm));

                        if (thisForm[x].children[y].children[z].value === 0) {
                          siblings = [ ...this.parentElement.children ];
                          for (let k = 0; k < thisForm[x].children[y].children.length; k++) {
                            thisForm[x].children[y].children[k].value = k === z ? 1 : 0;
                            matrix[x].children[y].children[k].value = k === z ? 1 : 0;
                            siblings[k].style.background = k === z ? colorChip.gradientGreen : colorChip.gray2;
                            siblings[k].firstChild.style.color = k === z ? colorChip.white : colorChip.deactive;  
                          }
                        } else {
                          this.style.background = colorChip.gray2;
                          this.firstChild.style.color = colorChip.deactive;
                          thisForm[x].children[y].children[z].value = 0;
                          matrix[x].children[y].children[z].value = 0;
                        }

                        await ajaxJson({
                          mode: "update",
                          proid,
                          desid,
                          matrix
                        }, SECONDHOST + "/projectDesignerStatus");

                        setQueue(() => {
                          self.parentElement.style.animation = "fadedownlite 0.3s ease forwards";
                          setQueue(() => {
                            removeByClass(blockContextMenuClassName);
                          }, 301);
                        }, 200);

                      }

                    } catch (e) {
                      console.log(e);
                    }
                  },
                },
                style: {
                  display: "flex",
                  height: String(blackButtonHeight) + ea,
                  width: String(blackButtonWidth) + ea,
                  borderRadius: String(5) + "px",
                  background: thisForm[x].children[y].children[z].type !== "selection" ? colorChip.gradientGray : (thisForm[x].children[y].children[z].value === 0 ? colorChip.gray2 : colorChip.gradientGreen),
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: String(blackButtonBetween) + ea,
                  cursor: "pointer",
                },
                child: {
                  text: thisForm[x].children[y].children[z].title,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(blackButtonSize) + ea,
                    fontWeight: String(blackButtonWeight),
                    color: thisForm[x].children[y].children[z].type !== "selection" ? colorChip.white : (thisForm[x].children[y].children[z].value === 0 ? colorChip.deactive : colorChip.white),
                    top: String(blackButtonTextTop) + ea,
                    cursor: "pointer",
                  }
                }
              });

            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    }

    formPanBase = createNode({
      mother: contentsArea,
      style: {
        display: (media[0] || media[4] ? "flex" : "block"),
        position: "relative",
        flexDirection: desktop ? "row" : "column",
        width: withOut(0),
        justifyContent: "start",
        alignItems: "start",
      },
    });

    barArrBase = createNode({
      mother: contentsArea,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        width: withOut(0),
        justifyContent: "start",
        alignItems: "start",
        paddingTop: String(barArrBasePaddingTop) + ea,
        borderTop: "1px dashed " + colorChip.gray3,
        marginTop: String(barArrBaseMarginTop) + ea,
      }
    });

    reloadMainButtons = (formPanBase, thisForm) => {
      cleanChildren(formPanBase);
      for (let i = 0; i < thisForm.length; i++) {
  
        thisPan = createNode({
          mother: formPanBase,
          attribute: {
            index: String(i),
          },
          style: {
            display: "inline-flex",
            position: "relative",
            flexDirection: "column",
            width: desktop ? (media[0] ? "calc(calc(100% - " + String(panBetween * (thisForm.length - 1)) + ea + ") / " + String(thisForm.length) + ")" : "calc(calc(100% - " + String(panBetween * ((thisForm.length / 2) - 1)) + ea + ") / " + String(thisForm.length / 2) + ")") : withOut(0, ea),
            marginRight: desktop ? (media[0] ? (i === thisForm.length - 1 ? "" : String(panBetween) + ea) : (i === thisForm.length - 1 || i === (thisForm.length / 2) - 1 ? "" : String(panBetween) + ea)) : "",
            paddingTop: String(panPaddingTop) + ea,
            verticalAlign: "top",
          }
        });
    
        createNode({
          mother: thisPan,
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: withOut(0, ea),
            height: String(panHeight) + ea,
          },
          child: {
            text: thisForm[i].title,
            style: {
              fontSize: String(panTitleSize) + ea,
              fontWeight: String(panTitleWeight),
              color: thisForm[i].children.every((obj) => { return obj.deactive === true }) ? colorChip.deactive : colorChip.black,
            }
          }
        });
  
        valueIndex = thisForm[i].children.reduce((acc, curr, index) => {
          if (curr.value === 0) {
            return acc;
          } else {
            return index;
          }
        }, -1);

        for (let j = 0; j < thisForm[i].children.length; j++) {
          createNode({
            mother: thisPan,
            class: [ valueBlockClassName, siblingKeywords + String(i) ],
            attribute: {
              toggle: thisForm[i].children[j].value === 0 ? "off" : "on",
              x: String(i),
              y: String(j),
              mother: thisForm[i].title,
              title: thisForm[i].children[j].title,
              deactive: thisForm[i].children[j].deactive ? "true" : "false",
              proid,
              desid,
              red: thisForm[i].children[j].value !== 0 ? "off" : (j < valueIndex ? "on" : "off"),
              middle: thisForm[i].children[j].value === 0 ? "off" : (j < valueIndex ? "on" : "off"),
            },
            event: {
              click: mainClickEvent(),
              contextmenu: mainContextEvent(),
            },
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: withOut(0, ea),
              height: String(panHeight) + ea,
              background: j > valueIndex ? colorChip.gray1 : (j === valueIndex ? colorChip.gradientGreen : (thisForm[i].children[j].value !== 0 ? colorChip.whiteGreen : colorChip.gray1)),
              borderRadius: String(5) + "px",
              marginBottom: j === thisForm[i].children.length - 1 ? "" : String(panBlockBetween) + ea,
              flexDirection: "row",
              cursor: "pointer",
              transition: "all 0s ease",
            },
            children: [
              {
                style: {
                  width: String(panCheckBoxWidth) + ea,
                  marginRight: String(panInnerMargin) + ea,
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: withOut(panInnerMargin * 2, ea),
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "all 0s ease",
                },
                child: {
                  mode: "svg",
                  source: svgMaker.checkBox(j > valueIndex ? colorChip.gray4 : (j === valueIndex ? colorChip.white : (thisForm[i].children[j].value !== 0 ? colorChip.green : colorChip.red))),
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(checkBoxWidth) + ea,
                    transition: "all 0s ease",
                  }
                }
              },
              {
                style: {
                  width: withOut(panCheckBoxWidth + (panInnerMargin * 3) + panWhitePaddingLeft, ea),
                  height: withOut(panInnerMargin * 2, ea),
                  background: thisForm[i].children[j].deactive ? colorChip.gray2 : colorChip.white,
                  borderRadius: String(5) + "px",
                  display: "inline-flex",
                  position: "relative",
                  justifyContent: "start",
                  alignItems: "center",
                  paddingLeft: String(panWhitePaddingLeft) + ea,
                  transition: "all 0s ease",
                },
                child: {
                  text: thisForm[i].children[j].title,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(blockTextSize) + ea,
                    fontWeight: String(blockTextWeight),
                    color: thisForm[i].children[j].deactive ? colorChip.deactive : (j > valueIndex ? colorChip.deactive : (j === valueIndex ? colorChip.black : (thisForm[i].children[j].value !== 0 ? colorChip.softGreen : colorChip.red))),
                    top: String(textTextTop) + ea,
                    transition: "all 0s ease",
                  },
                  next: {
                    attribute: {
                      x: String(i),
                      y: String(j),
                      mother: thisForm[i].title,
                      title: thisForm[i].children[j].title,
                      deactive: thisForm[i].children[j].deactive ? "true" : "false",
                      proid,
                      desid,
                    },
                    event: {
                      click: mainContextEvent()
                    },
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      right: String(0) + ea,
                      top: "calc(" + withOut(50, (detailArrowAreaWidth / 2), ea) + " - " + String(detailArrowVisualTop) + ea + ")",
                      width: String(detailArrowAreaWidth) + ea,
                      height: String(detailArrowAreaWidth) + ea,
                      cursor: "pointer",
                      background: "transparent",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    child: {
                      class: [ svgArrowColorTargetClassName ],
                      mode: "svg",
                      source: GeneralJs.prototype.returnArrow("right", thisForm[i].children[j].deactive ? colorChip.deactive : (j > valueIndex ? colorChip.deactive : (j === valueIndex ? colorChip.green : (thisForm[i].children[j].value !== 0 ? colorChip.softGreen : colorChip.red)))),
                      style: {
                        position: "relative",
                        width: String(detailArrowWidth) + ea,
                      }
                    }
                  }
                }
              }
            ]
          });
        }
      }
    }

    reloadMainButtons(formPanBase, thisForm);
  
  } catch (e) {
    console.log(e);
  }
}

ProcessJs.prototype.reloadProjects = function (serverResponse) {
  const instance = this;
  let projects, clients, designers, history;
  let proid, cliid, desid, service;
  let thisClient, thisDesigner, thisHistory;
  let clientHistory, thisClientHistory;
  let rawContents, rawContent;

  projects = serverResponse.projects;
  clients = serverResponse.clients;
  designers = serverResponse.designers;
  history = serverResponse.history;
  clientHistory = serverResponse.clientHistory;
  rawContents = serverResponse.rawContents;

  for (let project of projects) {
    ({ proid, cliid, desid, service } = project);

    thisClient = clients.find((obj) => { return obj.cliid === cliid });
    thisDesigner = designers.find((obj) => { return obj.desid === desid });
    thisHistory = history.find((obj) => {
      return obj.proid === proid
    });
    thisClientHistory = clientHistory.find((obj) => {
      return obj.cliid === thisClient.cliid
    });
    rawContent = rawContents.find((obj) => {
      return obj.proid === proid
    });

    project.client = thisClient;
    project.designer = thisDesigner;
    project.history = thisHistory;
    project.clientHistory = thisClientHistory;
    project.name = thisClient.name;
    project.phone = thisClient.phone;
    if (rawContent !== undefined) {
      project.rawDate = rawContent.date;
    } else {
      project.rawDate = new Date(1800, 0, 1);
    }

  }

  projects = projects.filter((obj) => {
    return obj.proid !== "p1801_aa01s" && obj.proid !== "p1801_aa02s";
  });

  this.clientHistory = clientHistory;
  this.history = history;
  this.projects = projects;
}

ProcessJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, equalJson, returnGet } = GeneralJs;
  try {
    const getObj = returnGet();
    const emptyDate = () => { return new Date(1800, 0, 1) };
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    let loading;
    let serverResponse;

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    loading = this.mother.grayLoading();

    serverResponse = await ajaxJson({ mode: "init" }, BACKHOST + "/processConsole", { equal: true });

    this.reloadProjects(serverResponse);

    this.matrix = [];
    this.names = [];
    this.baseMaker();

    document.getElementById("moveLeftArea").remove();
    document.getElementById("moveRightArea").remove();

    loading.remove();

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
