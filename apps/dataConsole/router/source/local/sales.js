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
  let wordingWidth;
  let checkBoxWidth, checkBoxMargin, checkBoxVisualTop;
  let tableMiddleWeight;
  let clientDom;
  let checkBoxVisualLeft;
  let clientColumnsMenu;
  let clientColumnsBlankTitle;
  let thisClient;

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
      title: "1차 응대",
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
      title: "드랍 판단",
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


      for (let z = 0; z < cliids.length; z++) {
        thisClient = instance.clients.find((c) => { return c.cliid === cliids[z].cliid });

        clientValueArr = [
          {
            value: cliids[z].name,
            color: colorChip.black,
            check: true,
          },
          {
            value: cliids[z].cliid,
            color: colorChip.black,
            check: false,
          },
          {
            value: dateConvert(cliids[z].request.timeline),
            color: colorChip.black,
            check: false,
          },
          {
            value: cliids[z].analytics.response.status,
            color: colorChip.black,
            check: false,
          },
          {
            value: thisClient.cliid,
            color: colorChip.black,
            check: false,
          },
          {
            value: thisClient.cliid,
            color: colorChip.black,
            check: false,
          },
          {
            value: thisClient.cliid,
            color: colorChip.black,
            check: false,
          },
          {
            value: thisClient.cliid,
            color: colorChip.black,
            check: false,
          },
          {
            value: thisClient.cliid,
            color: colorChip.black,
            check: false,
          },
          {
            value: thisClient.cliid,
            color: colorChip.black,
            check: false,
          },
          {
            value: thisClient.cliid,
            color: colorChip.black,
            check: false,
          },
          {
            value: thisClient.cliid,
            color: colorChip.black,
            check: false,
          },
          {
            value: thisClient.cliid,
            color: colorChip.black,
            check: false,
          },
          {
            value: thisClient.cliid,
            color: colorChip.black,
            check: false,
          },
        ];

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

      }

      clientValueArr = [
        {
          value: "총계",
          color: colorChip.black,
          check: false,
        },
        {
          value: String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: String(cliids.length),
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
      for (let requestRaw of thisClient.requests) {
        thisObj = {
          cliid: thisClient.cliid,
          phone: thisClient.phone,
          name: thisClient.name,
          request: requestRaw.request,
          analytics: requestRaw.analytics,
          history: thisHistory,
          ...obj.cliids.find((o) => { return o.cliid === cliid }),
        };
        tempObj.cliids.push(thisObj);
      }
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
