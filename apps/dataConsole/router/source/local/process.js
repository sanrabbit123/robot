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
  let nameWidth, designerWidth, idWidth, requestWidth, responseWidth;
  let contentsLoad;
  let requestTable, responseTable;
  let clientBlack, responseBlock;
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
  tableBoldWeight = 700;
  tableTextTop = (isMac() ? -1 : 1);

  wordingWidth = 77;
  checkBoxWidth = 10;
  checkBoxMargin = 5;
  checkBoxVisualTop = -0.5;

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
  
        createNode({
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
  
        clientBlack = createNode({
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
            mother: requestTable,
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
          mother: requestTable,
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
