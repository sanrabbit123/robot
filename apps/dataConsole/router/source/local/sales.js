const SalesJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
}

SalesJs.prototype.baseMaker = function (searchMode = false) {
  const instance = this;
  const { totalContents, ea, belowHeight, media } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, serviceParsing, equalJson, svgMaker, removeByClass, findByAttribute } = GeneralJs;
  const splitToken = "__split__";
  const clientTableClassName = "clientTableClassName";
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
  let tableMiddleWeight;
  let clientDom;
  let checkBoxVisualLeft;
  let sendStatus, sendStatusNumber;
  let sendSchedule, sendScheduleNumber;
  let sendFile, sendFileNumber;
  let clientColumnsMenu;
  let clientColumnsBlankTitle;

  clientColumnsMenu = [
    { title: "내림차순", key: "downSort" },
    { title: "오름차순", key: "upSort" },
  ];

  clientColumnsBlankTitle = [
    { title: "전체 보기", key: "totalFilter" },
    { title: "O", key: "existFilter" },
    { title: "X", key: "nonExistFilter" },
  ];

  clientColumns = [
    {
      title: "고객",
      menu: [],
      blank: false,
      type: "string",
    },
    {
      title: "아이디",
      menu: [
        {
          title: "전체 보기",
          key: "totalFilter"
        },
        {
          title: "대기",
          key: "clientReady"
        },
        {
          title: "진행중",
          key: "clientGoing"
        },
      ],
      blank: false,
      type: "string",
    },
    {
      title: "문의일",
      menu: [
        {
          title: "전체 보기",
          key: "totalFilter"
        },
        {
          title: "디자이너",
          key: "constructDesigner"
        },
        {
          title: "홈리에종",
          key: "constructHomeliaison"
        },
        {
          title: "고객",
          key: "constructClient"
        },
      ],
      blank: true,
      type: "string",
    },
    {
      title: "상태",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "1차 응대 성공",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "추천서 발송",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "계약 가능성",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "우선순위",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "타겟 고객",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "하하 전송",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "상태 공유",
      menu: [],
      blank: true,
      type: "date", 
    },
    {
      title: "디자인 제안",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "디자이너 글",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "디자이너 글",
      menu: [],
      blank: true,
      type: "date",
    },
  ];

  this.clientColumnsMenu = clientColumnsMenu;
  this.clientColumnsBlankTitle = clientColumnsBlankTitle;
  this.clientColumns = clientColumns;

  outerMargin = 30;
  innerPadding = 10;

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
  tableBlockFactorWidth = 118;
  tableBetween = 20;

  blockVisualPadding = 8;

  nameWidth = 98;
  designerWidth = 98;
  idWidth = 82;
  requestWidth = tableBlockFactorWidth * clientColumns.length;

  tableSize = 13;
  tableWeight = 400;
  tableMiddleWeight = 500;
  tableBoldWeight = 700;
  tableTextTop = (isMac() ? -1 : 1);

  wordingWidth = 80;
  checkBoxWidth = 10;
  checkBoxMargin = 9;
  checkBoxVisualTop = 0;
  checkBoxVisualLeft = -19;

  buttonOuterPadding = 6;
  buttonInnerPadding = 4;
  buttonWidth = 110;
  buttonHeight = 30;

  buttonSize = 13;
  buttonWeight = 600;
  buttonTextTop = -1;

  circleTop = 17;
  circleWidth = 6;
  circleMarginLeft = 5;

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
      background: colorChip.gray2,
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

  contentsLoad = (searchMode = false) => {

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
          class: [ "moveTarget" ],
          style: {
            display: "block",
            position: "relative",
            transform: "translateX(0px)",
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
        marginRight: String(minimumBetween) + ea,
        cursor: "pointer",
      }
    });

    for (let { title } of clientColumns) {
      createNode({
        mother: targetTong,
        text: title,
        style: {
          width: String(tableBlockFactorWidth) + ea,
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          fontSize: String(textSize) + ea,
          fontWeight: String(700),
          color: colorChip.white,
          top: String(textTop) + ea,
          cursor: "pointer",
        }
      });
    }

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
        if (searchMode === false) {
          if (instance.projects.length !== 1) {
            thisProjects2 = thisProjects2.filter((obj) => { return !/^[드완]/.test(obj.process.status) })
          }
        }
        newProjectsTong.push({ manager, designer, desid, projects: thisProjects2 });
      }
    }
    instance.bigDoms = [];
    instance.clientDoms = [];
    instance.totalValues = [];
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
              class: [ "moveTarget" ],
              style: {
                display: "block",
                position: "relative",
                transform: "translateX(0px)",
                width: String(8000) + ea,
                height: withOut(0, ea),
              }
            },
          ]
        });
  
        targetTong = baseBlock.firstChild;
  
        nameDom = createNode({
          mother: targetTong,
          style: {
            width: String(nameWidth) + ea,
            display: "inline-block",
            position: "relative",
            verticalAlign: "top",
            marginLeft: String(firstMargin) + ea,
            cursor: "pointer",
          },
          child: {
            text: manager,
            style: {
              display: "inline-block",
              position: "relative",
              verticalAlign: "top",
              fontSize: String(textSize) + ea,
              fontWeight: String(700),
              color: colorChip.black,
              top: String(textTop) + ea,
              cursor: "pointer",
            },
            bold: {
              fontSize: String(textSize) + ea,
              fontWeight: String(300),
              color: colorChip.deactive,
            },
          }
        });
        
        clientTable = createNode({
          mother: targetTong,
          class: [ clientTableClassName ],
          attribute: { desid },
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
  
        latestCallNumber = 0;
        meetingDateNumber = 0;
        remainDateNumber = 0;
        startDateNumber = 0;
        endDateNumber = 0;
        rawDateNumber = 0;
        sendStatusNumber = 0;
        sendScheduleNumber = 0;
        sendFileNumber = 0;
        for (let z = 0; z < projects.length; z++) {
          thisProject = projects[z];
          callHistory = equalJson(JSON.stringify(thisProject.clientHistory.curation.analytics.call.out.concat(thisProject.clientHistory.curation.analytics.call.in)));
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
          sendStatus = dateConvert(thisProject.sendStatus);
          if (sendStatus === '-') {
            sendStatusNumber = sendStatusNumber + 1;
          }
          sendSchedule = dateConvert(thisProject.sendSchedule);
          if (sendSchedule === '-') {
            sendScheduleNumber = sendScheduleNumber + 1;
          }
          sendFile = dateConvert(thisProject.sendFile);
          if (sendFile === '-') {
            sendFileNumber = sendFileNumber + 1;
          }

          clientValueArr = [
            {
              value: thisProject.name + "&nbsp;&nbsp;<b%" + serviceParsing(thisProject.service, false, true) + "%b>",
              color: colorChip.black,
              check: true,
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
              check: false,
            },
            {
              value: dateConvert(thisProject.process.contract.first.date),
              color: colorChip.black,
              check: false,
            },
            {
              value: meetingDate,
              color: meetingDate === '-' ? colorChip.red : colorChip.black,
              check: false,
            },
            {
              value: remainDate,
              color: remainDate === '-' ? colorChip.red : colorChip.black,
              check: false,
            },
            {
              value: startDate,
              color: startDate === '-' ? colorChip.red : colorChip.black,
              check: false,
            },
            {
              value: endDate,
              color: endDate === '-' ? colorChip.red : colorChip.black,
              check: false,
            },
            {
              value: sendStatus,
              color: sendStatus === '-' ? colorChip.red : colorChip.black,
              check: false,
            },
            {
              value: sendSchedule,
              color: sendSchedule === '-' ? colorChip.red : colorChip.black,
              check: false,
            },
            {
              value: sendFile,
              color: sendFile === '-' ? colorChip.red : colorChip.black,
              check: false,
            },
            {
              value: rawDate,
              color: rawDate === '-' ? colorChip.red : colorChip.black,
              check: false,
            },
            {
              value: rawDate,
              color: rawDate === '-' ? colorChip.red : colorChip.black,
              check: false,
            },
          ];
  
          clientBlack = createNode({
            mother: clientTable,
            attribute: {
              proid: thisProject.proid,
            },
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              overflow: "hidden",
              borderRadius: String(5) + "px",
            }
          });
          for (let i = 0; i < clientValueArr.length; i++) {
            clientDom = createNode({
              mother: clientBlack,
              attribute: {
                proid: thisProject.proid,
                desid: thisProject.desid,
                cliid: thisProject.cliid,
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
                  style: {
                    display: clientValueArr[i].check ? "inline-flex" : "none",
                    position: "relative",
                    width: String(checkBoxWidth) + ea,
                    height: String(checkBoxWidth) + ea,
                    borderRadius: String(1) + "px",
                    background: colorChip.gray2,
                    marginLeft: String(checkBoxMargin) + ea,
                    top: String(checkBoxVisualTop) + ea,
                    left: String(checkBoxVisualLeft) + ea,
                    flexDirection: "center",
                    alignItems: "center",
                  },
                  child: {
                    mode: "svg",
                    source: svgMaker.checkBox(colorChip.green),
                    style: {
                      display: "none",
                      position: "relative",
                      width: String(checkBoxWidth) + ea,
                    }
                  }
                }
              ]
            });
          }
          instance.clientDoms.push(clientBlack);
          instance.totalValues.push([ manager, designer + "&nbsp;&nbsp;<u%" + desid + "%u>" ].concat(clientValueArr.map((obj) => { return obj.value })))

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
            value: (sendStatusNumber === 0 ? String(sendStatusNumber) : "<b%" + String(sendStatusNumber) + "%b>") + " <u%/%u> " + String(projects.length),
            color: colorChip.black,
            check: false,
          },
          {
            value: (sendScheduleNumber === 0 ? String(sendScheduleNumber) : "<b%" + String(sendScheduleNumber) + "%b>") + " <u%/%u> " + String(projects.length),
            color: colorChip.black,
            check: false,
          },
          {
            value: (sendFileNumber === 0 ? String(sendFileNumber) : "<b%" + String(sendFileNumber) + "%b>") + " <u%/%u> " + String(projects.length),
            color: colorChip.black,
            check: false,
          },
          {
            value: (rawDateNumber === 0 ? String(rawDateNumber) : "<b%" + String(rawDateNumber) + "%b>") + " <u%/%u> " + String(projects.length),
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

        instance.bigDoms.push(targetTong);
      }
    }
  }

  contentsLoad(searchMode);

  this.contentsLoad = contentsLoad;
}

SalesJs.prototype.reloadProjects = function (serverResponse) {
  const instance = this;
  let projects, clients, designers, history;
  let proid, cliid, desid, service;
  let thisClient, thisDesigner, thisHistory;
  let clientHistory, thisClientHistory;
  let rawContents, rawContent;
  let requestNumber;
  let sendStatus, sendSchedule, sendFile;
  let thisSendStatus, thisSendSchedule, thisSendFile;

  projects = serverResponse.projects;
  clients = serverResponse.clients;
  designers = serverResponse.designers;
  history = serverResponse.history;
  clientHistory = serverResponse.clientHistory;
  rawContents = serverResponse.rawContents;
  sendStatus = serverResponse.sendStatus;
  sendSchedule = serverResponse.sendSchedule;
  sendFile = serverResponse.sendFile;

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

    thisSendStatus = sendStatus.filter((obj) => { return obj.proid === proid });
    thisSendSchedule = sendSchedule.filter((obj) => { return obj.proid === proid });
    thisSendFile = sendFile.filter((obj) => { return obj.proid === proid });

    requestNumber = 0;
    for (let i = 0; i < thisClient.requests.length; i++) {
      if (thisClient.requests[i].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
        requestNumber = i;
        break;
      }
    }

    project.client = thisClient;
    project.requestNumber = requestNumber;
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
    if (thisSendStatus.length > 0) {
      thisSendStatus.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
      project.sendStatus = thisSendStatus[0].date;
    } else {
      project.sendStatus = new Date(1800, 0, 1);
    }
    if (thisSendSchedule.length > 0) {
      thisSendSchedule.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
      project.sendSchedule = thisSendSchedule[0].date;
    } else {
      project.sendSchedule = new Date(1800, 0, 1);
    }
    if (thisSendFile.length > 0) {
      thisSendFile.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
      project.sendFile = thisSendFile[0].date;
    } else {
      project.sendFile = new Date(1800, 0, 1);
    }

  }

  // projects = projects.filter((obj) => {
  //   return obj.proid !== "p1801_aa01s" && obj.proid !== "p1801_aa02s";
  // });

  this.clientHistory = clientHistory;
  this.history = history;
  this.projects = projects;
}

SalesJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, equalJson, returnGet, ajaxMultiple, backgroundSse, colorChip } = GeneralJs;
  try {
    const getObj = returnGet();
    const emptyDate = () => { return new Date(1800, 0, 1) };
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    let loading;
    let serverResponse;
    let projects;
    let clients, designers;
    let proidArr;
    let history;
    let clientHistory;
    let cliidArr;
    let secondRes;
    let matrix;

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    loading = this.mother.grayLoading();
    
    ({ projects, clients } = await ajaxJson({ mode: "pre", searchMode: (typeof getObj.proid === "string" ? getObj.proid : "false") }, BACKHOST + "/processConsole", { equal: true }));
    proidArr = projects.map((p) => { return p.proid });
    cliidArr = clients.map((c) => { return c.cliid });

    if (proidArr.length === 0) {
      throw new Error("invalid porid arr");
    }

    matrix = await ajaxMultiple([
      [ { noFlat: true, whereQuery: { $or: Array.from(new Set(projects.map((p) => { return p.desid }))).map((desid) => { return { desid } }) } }, BACKHOST + "/getDesigners" ],
      [ { method: "project", idArr: proidArr }, BACKHOST + "/getHistoryTotal" ],
      [ { method: "client", idArr: cliidArr }, BACKHOST + "/getHistoryTotal" ],
      [ { proidArr }, SECONDHOST + "/getProcessData" ],
    ]);

    designers = matrix[0];
    history = Object.values(matrix[1]);
    clientHistory = Object.values(matrix[2]);
    secondRes = matrix[3];

    serverResponse = {
      projects,
      clients,
      designers,
      history,
      clientHistory,
      rawContents: secondRes.rawContents,
      sendStatus: secondRes.sendStatus,
      sendSchedule: secondRes.sendSchedule,
      sendFile: secondRes.sendFile
    }

    this.reloadProjects(serverResponse);
    this.designers = designers;

    this.contents = null;
    ajaxJson({}, SECONDHOST + "/getChecklist").then((contents) => {
      instance.contents = contents;
      instance.panContents = this.contents.map((obj) => { return obj.children }).flat();
      instance.panList = [];
      instance.itemList = [];
      instance.panNumbers = [];
      instance.naviHeight = 0;
      instance.nowUploading = false;
      instance.menuArea = null;
    }).catch((err) => {
      window.location.reload();
    })

    this.matrix = [];
    this.names = [];
    this.bigDoms = [];
    this.clientDoms = [];
    this.totalValues = [];
    this.totalNumbers = [];
    this.onofflineCircleClassName = "onofflineCircleClassName";
    this.onofflineWordsClassName = "onofflineWordsClassName";
    this.numbersExtractClassName = "numbersExtractClassName";
    this.onofflineDesid = [];

    this.baseMaker(typeof getObj.proid === "string");

    document.getElementById("moveLeftArea").remove();
    document.getElementById("moveRightArea").remove();
    document.getElementById("grayLeftOpenButton").remove();

    loading.remove();

    if (typeof getObj.proid === "string") {
      if (this.clientDoms.find((dom) => { return dom.getAttribute("proid") === getObj.proid }) !== undefined) {
        this.clientDoms.find((dom) => { return dom.getAttribute("proid") === getObj.proid }).click();
      }
    }

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e.message).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
