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
                let loading, res;
                let thisBillIndex, thisProjectIndex
                let amount, name;

                amount = await GeneralJs.prompt("정산 금액을 숫자로만 알려주세요!");
                if (typeof amount === "string") {
                  amount = Number(amount.replace(/[^0-9]/gi, ''));
                } else {
                  amount = 0;
                }
                name = await GeneralJs.prompt("시공사 이름을 알려주세요!");
                if (name === null) {
                  name = "알 수 없음";
                }

                res = await ajaxJson({ bilid, amount, name }, PYTHONHOST + "/responseInjection", { equal: true });

                thisBillIndex = instance.bills.findIndex((obj) => { return obj.bilid === bilid });
                thisProjectIndex = instance.projects.findIndex((obj) => { return obj.proid === proid });

                instance.bills[thisBillIndex] = res.bill;
                instance.projects[thisProjectIndex].bill = res.bill;

                loading = instance.mother.grayLoading();
                setQueue(() => {
                  instance.contentsLoad();
                  (instance.whiteCardView(proid))();
                  loading.remove();
                });

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
            value: !/시공/gi.test(responseName) ? project.process.calculation.method : '-',
            color: colorChip.black,
            pointer: false,
            event: null,
          },
          {
            value: !/시공/gi.test(responseName) ? String(project.process.calculation.percentage) + '%' : '-',
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
