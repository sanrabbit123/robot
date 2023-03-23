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
  const slash = " <u%/%u> ";
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
  let wordingWidth;
  let checkBoxWidth, checkBoxMargin, checkBoxVisualTop;
  let tableMiddleWeight;
  let clientDom;
  let checkBoxVisualLeft;
  let clientColumnsMenu;
  let clientColumnsBlankTitle;
  let thisClient;
  let serviceAboutArr;
  let proposalOpenArr;
  let status, firstResponse, contractPossible, priority, targetClient, lowLow, dropReason, serviceAbout, proposalOpen, feedBack;
  let statusNumber, firstResponseNumber, contractPossibleNumber, priorityNumber, targetClientNumber, lowLowNumber, dropReasonNumber, serviceAboutNumber, proposalOpenNumber, feedBackNumber;
  let manager, managerNumber;
  let thisHistory;
  let proposalSend, proposalSendNumber;
  let thisRequest, thisAnalytics;
  let curationAnalytics;
  let proposalSendArr;
  let maxWidth;
  let arr0, arr1, boo;
  let lowLowSendArr;
  let priorityColumns;
  let targetClientColumns;

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
      title: "담당자",
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
      title: "드랍 판단",
      menu: [],
      blank: true,
      type: "date", 
    },
    {
      title: "1차 응대",
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
      title: "서비스 설명 발송",
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
      title: "추천서 조회",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "피드백 통화",
      menu: [],
      blank: true,
      type: "date",
    },
  ];

  priorityColumns = [ '하', '중', '상' ];
  targetClientColumns = [ "해당 없음", "애매", "타겟" ];

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

  maxWidth = 1000;

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

    for (let { date, cliids } of instance.sales) {

      motherBlock = createNode({
        mother: grayTong,
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
          text: dateToString(date),
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

      managerNumber = 0;
      statusNumber = 0;
      firstResponseNumber = 0;
      proposalSendNumber = 0;
      contractPossibleNumber = 0;
      priorityNumber = 0;
      targetClientNumber = 0;
      lowLowNumber = 0;
      dropReasonNumber = 0;
      serviceAboutNumber = 0;
      proposalOpenNumber = 0;
      feedBackNumber = 0;

      for (let z = 0; z < cliids.length; z++) {
        thisClient = cliids[z].client;
        thisHistory = cliids[z].history;
        thisRequest = cliids[z].request;
        thisAnalytics = cliids[z].analytics;
        curationAnalytics = thisHistory.curation.analytics;

        manager = '-';
        status = '-';
        firstResponse = '-';
        proposalSend = '-';
        contractPossible = '-';
        priority = '-';
        targetClient = '-';
        lowLow = '-';
        dropReason = '-';
        serviceAbout = '-';
        proposalOpen = '-';
        feedBack = '-';

        if (thisHistory.manager !== '-' && thisHistory.manager !== '') {
          manager = thisHistory.manager;
        } else {
          managerNumber = managerNumber + 1;
        }

        status = thisAnalytics.response.status;
        if (/응대/gi.test(status)) {
          statusNumber = statusNumber + 1;
        }

        curationAnalytics.call.out.sort((a, b) => {
          return a.date.valueOf() - b.date.valueOf();
        })
        firstResponse = curationAnalytics.call.out.length > 0 ? dateToString(curationAnalytics.call.out[0].date) : "대기";

        if (firstResponse === "대기") {
          firstResponseNumber = firstResponseNumber + 1;
        }

        contractPossible = cliids[z].possible === 0 ? "낮음" : "높음";
        if (contractPossible === "높음") {
          contractPossibleNumber = contractPossibleNumber + 1;
        }

        priority = priorityColumns[cliids[z].priority];
        targetClient = targetClientColumns[cliids[z].target];
        if (targetClient === "타겟") {
          targetClientNumber = targetClientNumber + 1;
        }

        if (thisAnalytics.response.outreason.length > 0) {
          dropReason = thisAnalytics.response.outreason.join(", ");
        }

        serviceAboutArr = curationAnalytics.send.filter((obj) => { return obj.page === "finalPush" });
        serviceAboutArr.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
        serviceAbout = serviceAboutArr.length > 0 ? dateToString(serviceAboutArr[0].date) : "대기";

        proposalSendArr = curationAnalytics.send.filter((obj) => { return obj.page === "designerProposal" });
        proposalSendArr.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
        proposalSend = proposalSendArr.length > 0 ? dateToString(proposalSendArr[0].date) : "대기";

        proposalOpenArr = curationAnalytics.page.filter((obj) => { return obj.page === "designerProposal" });
        proposalOpenArr.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
        proposalOpen = proposalOpenArr.length > 0 ? dateToString(proposalOpenArr[0].date) : "대기";
        
        if (serviceAbout !== "대기") {
          serviceAboutNumber = serviceAboutNumber + 1;
        }
        if (proposalSend !== "대기") {
          proposalSendNumber = proposalSendNumber + 1;
        }
        if (proposalOpen !== "대기") {
          proposalOpenNumber = proposalOpenNumber + 1;
        }

        lowLowSendArr = curationAnalytics.send.filter((obj) => { return obj.page === "lowLowPush" });
        lowLowSendArr.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
        lowLow = lowLowSendArr.length > 0 ? dateToString(lowLowSendArr[0].date) : "-";

        if (lowLow !== '-') {
          lowLowNumber = lowLowNumber + 1;
        }

        arr0 = curationAnalytics.send.filter((obj) => { return obj.page === "designerProposal" })
        arr1 = curationAnalytics.call.out;
        boo = false;
        for (let { date } of arr0) {
          for (let { date: callDate } of arr1) {
            boo = date.valueOf() <= callDate.valueOf();
            if (boo) {
              break;
            }
          }
          if (boo) {
            break;
          }
        }
        if (boo) {
          arr1.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
          feedBack = dateToString(arr1[0].date);
        } else {
          feedBack = "대기";
        }

        if (feedBack !== "대기") {
          feedBackNumber = feedBackNumber + 1;
        }

        clientValueArr = [
          {
            value: cliids[z].name,
            color: colorChip.black,
            check: true,
          },
          {
            value: manager,
            color: colorChip.black,
            check: false,
          },
          {
            value: dateConvert(thisRequest.timeline),
            color: colorChip.black,
            check: false,
          },
          {
            value: status,
            color: colorChip.black,
            check: false,
          },
          {
            value: dropReason,
            color: dropReason === '-' ? colorChip.gray3 : colorChip.black,
            check: false,
          },
          {
            value: firstResponse,
            color: colorChip.black,
            check: false,
          },
          {
            value: contractPossible,
            color: /높음/gi.test(contractPossible) ? colorChip.purple : colorChip.black,
            check: false,
          },
          {
            value: priority,
            color: colorChip.black,
            check: false,
          },
          {
            value: targetClient,
            color: colorChip.black,
            check: false,
          },
          {
            value: lowLow,
            color: lowLow === '-' ? colorChip.gray3 : colorChip.black,
            check: false,
          },
          {
            value: serviceAbout,
            color: colorChip.black,
            check: false,
          },
          {
            value: proposalSend,
            color: colorChip.black,
            check: false,
          },
          {
            value: proposalOpen,
            color: colorChip.black,
            check: false,
          },
          {
            value: feedBack,
            color: colorChip.black,
            check: false,
          },
        ];

        if ((manager.trim() === '-' || manager.trim() === '') && lowLow === '-') {
          for (let obj of clientValueArr) {
            obj.color = colorChip.red;
          }
        }
        if (lowLow !== '-' && (manager.trim() === '-' || manager.trim() === '')) {
          for (let obj of clientValueArr) {
            obj.color = colorChip.deactive;
          }
        }

        if (/^[높]/gi.test(contractPossible)) {
          for (let obj of clientValueArr) {
            obj.color = colorChip.purple;
          }
        }

        if (/^[드]/gi.test(status)) {
          for (let obj of clientValueArr) {
            obj.color = colorChip.gray3;
          }
        } else if (/^[진]/gi.test(status)) {
          for (let obj of clientValueArr) {
            obj.color = colorChip.green;
          }
        }

        clientBlack = createNode({
          mother: clientTable,
          attribute: {
            proid: thisClient.cliid,
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
              cliid: thisClient.cliid,
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
              paddingBottom: String(z === cliids.length - 1 ? blockVisualPadding : 0) + ea,
              width: i === clientColumns.length - 1 ? String(tableBlockFactorWidth) + ea : String(tableBlockFactorWidth - 1) + ea,
              borderRight: i === clientColumns.length - 1 ?  "" : "1px solid " + colorChip.gray3,
              cursor: "pointer",
            },
            child: {
              style: {
                display: "block",
                width: withOut(0, ea),
                position: "relative",
                overflow: i === 4 ? "scroll" : "hidden",
                textAlign: "center",
              },
              child: {
                style: {
                  display: "flex",
                  flexDirection: "row",
                  width: String(maxWidth) + ea,
                  left: withOut(50, maxWidth / 2, ea),
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                },
                child: {
                  text: clientValueArr[i].value,
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    textAlign: "center",
                    alignItems: "center",
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
                }
              }
            }
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
          value: "<b%" + String(managerNumber) + "%b>" + slash + String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: '-',
          color: colorChip.black,
          check: false,
        },
        {
          value: "<b%" + String(statusNumber) + "%b>" + slash + String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: '-',
          color: colorChip.black,
          check: false,
        },
        {
          value: "<b%" + String(firstResponseNumber) + "%b>" + slash + String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: "<b%" + String(contractPossibleNumber) + "%b>" + slash + String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: '-',
          color: colorChip.black,
          check: false,
        },
        {
          value: "<b%" + String(targetClientNumber) + "%b>" + slash + String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: "<b%" + String(lowLowNumber) + "%b>" + slash + String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: "<b%" + String(serviceAboutNumber) + "%b>" + slash + String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: "<b%" + String(proposalSendNumber) + "%b>" + slash + String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: "<b%" + String(proposalOpenNumber) + "%b>" + slash + String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: "<b%" + String(feedBackNumber) + "%b>" + slash + String(cliids.length),
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

  contentsLoad(searchMode);

  this.contentsLoad = contentsLoad;
}

SalesJs.prototype.reloadSalesTong = function (serverResponse) {
  const instance = this;
  const { equalJson } = GeneralJs;
  let salesTong;
  let tempObj;
  let pureCliids;
  let thisClient;
  let thisObj;
  let thisHistory;

  this.clients = serverResponse.clients;
  this.histories = serverResponse.histories;

  salesTong = [];
  for (let obj of serverResponse.sales) {
    tempObj = {
      date: obj.date,
      cliids: [],
    }

    pureCliids = obj.cliids.map((o) => { return o.cliid });

    for (let cliid of pureCliids) {
      thisClient = serverResponse.clients.find((c) => { return c.cliid === cliid });
      thisHistory = serverResponse.histories.find((c) => { return c.cliid === cliid });
      thisObj = {
        cliid: thisClient.cliid,
        client: thisClient,
        phone: thisClient.phone,
        name: thisClient.name,
        request: thisClient.requests[0].request,
        analytics: thisClient.requests[0].analytics,
        history: thisHistory,
        ...obj.cliids.find((o) => { return o.cliid === cliid }),
      };
      tempObj.cliids.push(thisObj);
    }
    salesTong.push(tempObj);
  }

  this.sales = salesTong;
}

SalesJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, equalJson, returnGet, ajaxMultiple, backgroundSse, colorChip } = GeneralJs;
  try {
    const getObj = returnGet();
    let loading;
    let serverResponse;

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    loading = this.mother.grayLoading();
    
    serverResponse = await ajaxJson({ mode: "init" }, BACKHOST + "/salesClient", { equal: true });
    this.reloadSalesTong(serverResponse);

    this.baseMaker();

    document.getElementById("moveLeftArea").remove();
    document.getElementById("moveRightArea").remove();
    document.getElementById("grayLeftOpenButton").remove();

    loading.remove();

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e.message).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
