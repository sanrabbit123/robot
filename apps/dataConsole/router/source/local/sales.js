const SalesJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
}

SalesJs.prototype.baseMaker = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, media, entireMode } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, serviceParsing, equalJson, svgMaker, removeByClass, findByAttribute } = GeneralJs;
  const splitToken = "__split__";
  const clientTableClassName = "clientTableClassName";
  const updateMenuClassName = "updateMenuClassName";
  const valueTextClassName = "valueTextClassName";
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
  let managerUpdateEvent;
  let designerButtonWidth;
  let managerButtonSize;
  let designerFilterButtonSize;
  let calendarWidth;
  let calendarPadding;
  let createUpdateMenu;
  let statusUpdateEvent;
  let dropReasonUpdateEvent;
  let contractPossibleColumns;
  let clientColumnsFunctionsTong;
  let buttonOuterPadding, buttonInnerPadding;
  let number;
  let targetSales;
  let columnsFilterSortEvent;
  let predictDesigners, predictDesignersNumber;
  let firstResponseUpdateEvent;
  let feedBackUpdateEvent;
  let designersUpdateEvent;
  let designerBoxLength;
  let lowLowSendEvent;
  
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
    },
    {
      title: "담당자",
      menu: [
        { title: "전체 보기", key: "totalFilter" },
        { title: "미지정", key: "nonManagerExistFilter" },
        ...instance.managers.map((o) => {
          return {
            title: o.name,
            key: "sameManagerFilter",
          }
        })
      ],
    },
    {
      title: "문의일",
      menu: [
        { title: "내림차순", key: "downSortTimeline" },
        { title: "오름차순", key: "upSortTimeline" },
      ],
    },
    {
      title: "상태",
      menu: [
        { title: "전체 보기", key: "totalFilter" },
        { title: "응대중", key: "sameStatusFilter" },
        { title: "드랍", key: "sameStatusFilter" },
        { title: "장기", key: "sameStatusFilter" },
        { title: "진행", key: "sameStatusFilter" },
      ],
    },
    {
      title: "1차 응대",
      menu: [
        { title: "전체 보기", key: "totalFilter" },
        { title: "O", key: "firstResponseExistFilter" },
        { title: "X", key: "firstResponseNonExistFilter" },
      ],
    },
    {
      title: "계약 가능성",
      menu: [
        { title: "전체 보기", key: "totalFilter" },
      ],
    },
    {
      title: "우선순위",
      menu: [
        { title: "전체 보기", key: "totalFilter" },
      ],
    },
    {
      title: "타겟 고객",
      menu: [
        { title: "전체 보기", key: "totalFilter" },
      ],
    },
    {
      title: "하하 전송",
      menu: [
        { title: "전체 보기", key: "totalFilter" },
        { title: "O", key: "logLowExistFilter" },
        { title: "X", key: "logLowNonExistFilter" },
        { title: "알림 보내기", key: "lowLowSend" }
      ],
    },
    {
      title: "서비스 설명 발송",
      menu: [
        { title: "전체 보기", key: "totalFilter" },
        { title: "O", key: "aboutServiceExistFilter" },
        { title: "X", key: "aboutServiceNonExistFilter" },
      ],
    },
    {
      title: "추천서 발송",
      menu: [
        { title: "전체 보기", key: "totalFilter" },
        { title: "O", key: "designerPorposalExistFilter" },
        { title: "X", key: "designerPorposalNonExistFilter" },
      ],
    },
    {
      title: "피드백 통화",
      menu: [
        { title: "전체 보기", key: "totalFilter" },
        { title: "O", key: "feedBackExistFilter" },
        { title: "X", key: "feedBackNonExistFilter" },
      ],
    },
    {
      title: "예상 디자이너",
      menu: [
        { title: "전체 보기", key: "totalFilter" },
      ],
    },
  ];

  outerMargin = 30;
  innerPadding = 10;

  if (entireMode) {
    outerMargin = 0;
  }

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
  requestWidth = tableBlockFactorWidth * (clientColumns.length + 1);

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

  designerButtonWidth = 120;
  managerButtonSize = 90;
  designerFilterButtonSize = 90;

  calendarWidth = 260;
  calendarPadding = 4;

  designerBoxLength = 6;

  contentsLoad = () => {};

  buttonList = [];

  createUpdateMenu = (cliid, thisMenu, e, valueDom, requestNumber) => {
    const zIndex = 4;
    return new Promise((resolve, reject) => {
      valueDom.style.color = colorChip.green;
      createNode({
        mother: totalContents,
        class: [ updateMenuClassName ],
        event: {
          click: function (e) {
            valueDom.style.color = valueDom.getAttribute("color");
            removeByClass(updateMenuClassName);
            resolve(false);
          }
        },
        style: {
          position: "fixed",
          top: String(0),
          left: String(0),
          background: "transparent",
          width: withOut(0, ea),
          height: withOut(0, ea),
          zIndex: String(zIndex),
        }
      });
      createNode({
        mother: totalContents,
        class: [ updateMenuClassName ],
        attribute: {
          cliid,
          number: String(requestNumber),
        },
        style: {
          position: "absolute",
          top: String(e.y) + "px",
          left: String(e.x) + "px",
          padding: String(buttonOuterPadding) + ea,
          paddingBottom: String(buttonOuterPadding - buttonInnerPadding) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          animation: "fadeuplite 0.3s ease forwards",
          zIndex: String(zIndex),
        },
        children: thisMenu.map((obj, index) => {
          return {
            attribute: {
              index: String(index),
              cliid,
              number: String(requestNumber),
            },
            event: {
              click: function (e) {
                const index = Number(this.getAttribute("index"));
                const thisFunction = thisMenu[index].event;
                thisFunction.call(this.parentElement, e).then(() => {
                  valueDom.style.color = valueDom.getAttribute("color");
                  removeByClass(updateMenuClassName);
                  resolve(true);
                }).catch((err) => {
                  console.log(err);
                });
              },
              contextmenu: function (e) {
                e.preventDefault();
                const index = Number(this.getAttribute("index"));
                const thisFunction = thisMenu[index].event;
                thisFunction.call(this.parentElement, e).then(() => {
                  valueDom.style.color = valueDom.getAttribute("color");
                  removeByClass(updateMenuClassName);
                  resolve(true);
                }).catch((err) => {
                  console.log(err);
                });
              },
            },
            style: {
              display: "flex",
              width: String(managerButtonSize) + ea,
              height: String(buttonHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gradientGreen,
              marginBottom: String(buttonInnerPadding) + ea,
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            },
            child: {
              text: obj.title,
              style: {
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
                color: colorChip.white,
                top: String(buttonTextTop) + ea,
                position: "relative",
              }
            }
          }
        })
      });
    })
  }

  managerUpdateEvent = () => {
    return async function (e) {
      try {
        e.preventDefault();
        e.stopPropagation();
        const cliid = this.getAttribute("cliid");
        const requestNumber = Number(this.getAttribute("number"));
        let thisMenu;
        thisMenu = instance.managers.map((o) => {
          const thisManager = o.name;
          return {
            title: thisManager,
            event: async function (e) {
              try {
                const cliid = this.getAttribute("cliid");
                let tempObj, tempObj2;

                await ajaxJson({
                  id: cliid,
                  column: "manager",
                  value: thisManager,
                  email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
                }, BACKHOST + "/updateClientHistory");

                instance.histories.find((o) => { return o.cliid === cliid }).manager = thisManager;
                instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).history.manager = thisManager;

                tempObj = instance.filteredSales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) });
                if (tempObj !== undefined) {
                  tempObj2 = tempObj.cliids.find((o) => { return o.cliid === cliid });
                  if (tempObj2 !== undefined) {
                    tempObj2.history.manager = thisManager;
                  }
                }

              } catch (e) {
                console.log(e);
              }
            }
          }
        });
        if (await createUpdateMenu(cliid, thisMenu, e, this.querySelector('.' + valueTextClassName), requestNumber)) {
          if (instance.filteredSales.length !== 0) {
            instance.contentsLoad(true, instance.filteredSales);
          } else {
            instance.contentsLoad(false);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  this.managerUpdateEvent = managerUpdateEvent;

  statusUpdateEvent = () => {
    return async function (e) {
      try {
        e.preventDefault();
        e.stopPropagation();
        const cliid = this.getAttribute("cliid");
        const requestNumber = Number(this.getAttribute("number"));
        let updatePossibleStatus;
        let thisMenu;

        updatePossibleStatus = [
          "응대중",
          "드랍",
          "장기",
        ]
        
        thisMenu = updatePossibleStatus.map((str) => {
          const thisStatus = str;
          return {
            title: thisStatus,
            event: async function (e) {
              try {
                const cliid = this.getAttribute("cliid");
                const requestNumber = Number(this.getAttribute("number"));

                let whereQuery, updateQuery;
                let tempObj, tempObj2;
                whereQuery = { cliid };
                updateQuery = {};
                updateQuery["requests." + String(requestNumber) + ".analytics.response.status"] = thisStatus;
                await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateClient");
                instance.clients.find((o) => { return o.cliid === cliid }).requests[requestNumber].analytics.response.status = thisStatus;
                instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).client.requests[requestNumber].analytics.response.status = thisStatus;
                instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).analytics.response.status = thisStatus;

                tempObj = instance.filteredSales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) });
                if (tempObj !== undefined) {
                  tempObj2 = tempObj.cliids.find((o) => { return o.cliid === cliid });
                  if (tempObj2 !== undefined) {
                    tempObj2.client.requests[requestNumber].analytics.response.status = thisStatus;
                    tempObj2.analytics.response.status = thisStatus;
                  }
                }

              } catch (e) {
                console.log(e);
              }
            }
          }
        })
        if (await createUpdateMenu(cliid, thisMenu, e, this.querySelector('.' + valueTextClassName), requestNumber)) {
          if (instance.filteredSales.length !== 0) {
            instance.contentsLoad(true, instance.filteredSales);
          } else {
            instance.contentsLoad(false);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  this.statusUpdateEvent = statusUpdateEvent;

  firstResponseUpdateEvent = () => {
    return async function (e) {
      try {
        e.preventDefault();
        e.stopPropagation();
        const zIndex = 4;
        const cliid = this.getAttribute("cliid");
        const requestNumber = Number(this.getAttribute("number"));
        const valueDom = this.querySelector('.' + valueTextClassName);
        let cancelBack, menuPrompt;
        let calendar;

        valueDom.style.color = colorChip.green;

        cancelBack = createNode({
          mother: totalContents,
          class: [ updateMenuClassName ],
          event: {
            click: function (e) {
              valueDom.style.color = valueDom.getAttribute("color");
              removeByClass(updateMenuClassName);
            }
          },
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            background: "transparent",
            width: withOut(0, ea),
            height: withOut(0, ea),
            zIndex: String(zIndex),
          }
        });
        menuPrompt = createNode({
          mother: totalContents,
          class: [ updateMenuClassName ],
          attribute: {
            cliid,
          },
          style: {
            display: "inline-flex",
            position: "absolute",
            top: String(e.y) + "px",
            left: String(e.x) + "px",
            width: String(calendarWidth) + ea,
            borderRadius: String(5) + "px",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            background: colorChip.white,
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            animation: "fadeuplite 0.3s ease forwards",
            zIndex: String(zIndex),
          },
        });
        calendar = instance.mother.makeCalendar(new Date(), async function (e) {
          try {
            const updateValue = stringToDate(this.getAttribute("buttonValue"));
            let updateQuery;
            let tempObj, tempObj2;

            updateQuery = {};
            updateQuery["requests." + String(requestNumber) + ".analytics.date.call.next"] = updateValue;

            await ajaxJson({
              whereQuery: { cliid },
              updateQuery,
            }, BACKHOST + "/rawUpdateClient");
            removeByClass(updateMenuClassName);

            instance.clients.find((o) => { return o.cliid === cliid }).requests[requestNumber].analytics.date.call.next = updateValue;
            instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).client.requests[requestNumber].analytics.date.call.next = updateValue;
            instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).analytics.date.call.next = updateValue;

            tempObj = instance.filteredSales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) });
            if (tempObj !== undefined) {
              tempObj2 = tempObj.cliids.find((o) => { return o.cliid === cliid });
              if (tempObj2 !== undefined) {
                tempObj2.client.requests[requestNumber].analytics.date.call.next = updateValue;
                tempObj2.analytics.date.call.next = updateValue;
              }
            }

            if (instance.filteredSales.length !== 0) {
              instance.contentsLoad(true, instance.filteredSales);
            } else {
              instance.contentsLoad(false);
            }

          } catch (e) {
            console.log(e);
          }
        });
        menuPrompt.appendChild(calendar.calendarBase);

      } catch (e) {
        console.log(e);
      }
    }
  }
  this.firstResponseUpdateEvent = firstResponseUpdateEvent;

  feedBackUpdateEvent = () => {
    return async function (e) {
      try {
        e.preventDefault();
        e.stopPropagation();
        const zIndex = 4;
        const cliid = this.getAttribute("cliid");
        const requestNumber = Number(this.getAttribute("number"));
        const valueDom = this.querySelector('.' + valueTextClassName);
        let cancelBack, menuPrompt;
        let calendar;

        valueDom.style.color = colorChip.green;

        cancelBack = createNode({
          mother: totalContents,
          class: [ updateMenuClassName ],
          event: {
            click: function (e) {
              valueDom.style.color = valueDom.getAttribute("color");
              removeByClass(updateMenuClassName);
            }
          },
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            background: "transparent",
            width: withOut(0, ea),
            height: withOut(0, ea),
            zIndex: String(zIndex),
          }
        });
        menuPrompt = createNode({
          mother: totalContents,
          class: [ updateMenuClassName ],
          attribute: {
            cliid,
          },
          style: {
            display: "inline-flex",
            position: "absolute",
            top: String(e.y) + "px",
            left: String(e.x) + "px",
            width: String(calendarWidth) + ea,
            borderRadius: String(5) + "px",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            background: colorChip.white,
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            animation: "fadeuplite 0.3s ease forwards",
            zIndex: String(zIndex),
          },
        });
        calendar = instance.mother.makeCalendar(new Date(), async function (e) {
          try {
            const updateValue = stringToDate(this.getAttribute("buttonValue"));
            let updateQuery;
            let tempObj, tempObj2;

            updateQuery = {};
            updateQuery["requests." + String(requestNumber) + ".analytics.date.call.recommend"] = updateValue;

            await ajaxJson({
              whereQuery: { cliid },
              updateQuery,
            }, BACKHOST + "/rawUpdateClient");
            removeByClass(updateMenuClassName);

            instance.clients.find((o) => { return o.cliid === cliid }).requests[requestNumber].analytics.date.call.recommend = updateValue;
            instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).client.requests[requestNumber].analytics.date.call.recommend = updateValue;
            instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).analytics.date.call.recommend = updateValue;

            tempObj = instance.filteredSales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) });
            if (tempObj !== undefined) {
              tempObj2 = tempObj.cliids.find((o) => { return o.cliid === cliid });
              if (tempObj2 !== undefined) {
                tempObj2.client.requests[requestNumber].analytics.date.call.recommend = updateValue;
                tempObj2.analytics.date.call.recommend = updateValue;
              }
            }

            if (instance.filteredSales.length !== 0) {
              instance.contentsLoad(true, instance.filteredSales);
            } else {
              instance.contentsLoad(false);
            }

          } catch (e) {
            console.log(e);
          }
        });
        menuPrompt.appendChild(calendar.calendarBase);

      } catch (e) {
        console.log(e);
      }
    }
  }
  this.feedBackUpdateEvent = feedBackUpdateEvent;

  designersUpdateEvent = () => {
    return async function (e) {
      try {
        e.preventDefault();
        e.stopPropagation();
        const cliid = this.getAttribute("cliid");
        const requestNumber = Number(this.getAttribute("number"));
        let updatePossibleStatus;
        let thisMenu;
        let designersMenu;
        let result;

        designersMenu = (cliid, thisMenu, e, valueDom, requestNumber) => {
          const zIndex = 4;
          return new Promise((resolve, reject) => {
            valueDom.style.color = colorChip.green;
            createNode({
              mother: totalContents,
              class: [ updateMenuClassName ],
              event: {
                click: function (e) {
                  valueDom.style.color = valueDom.getAttribute("color");
                  removeByClass(updateMenuClassName);
                  resolve(true);
                }
              },
              style: {
                position: "fixed",
                top: String(0),
                left: String(0),
                background: "transparent",
                width: withOut(0, ea),
                height: withOut(0, ea),
                zIndex: String(zIndex),
              }
            });
            createNode({
              mother: totalContents,
              class: [ updateMenuClassName ],
              attribute: {
                cliid,
                number: String(requestNumber),
              },
              style: {
                position: "absolute",
                top: String(e.y) + "px",
                left: String(e.x - ((designerButtonWidth * designerBoxLength) + (buttonInnerPadding * designerBoxLength))) + "px",
                padding: String(buttonOuterPadding) + ea,
                paddingRight: String(buttonOuterPadding - buttonInnerPadding) + ea,
                width: String((designerButtonWidth * designerBoxLength) + (buttonInnerPadding * designerBoxLength)) + ea,
                paddingBottom: String(buttonOuterPadding - buttonInnerPadding) + ea,
                borderRadius: String(5) + "px",
                background: colorChip.white,
                boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                animation: "fadeuplite 0.3s ease forwards",
                zIndex: String(zIndex),
              },
              children: thisMenu.map((obj, index) => {
                return {
                  attribute: {
                    index: String(index),
                    cliid,
                    number: String(requestNumber),
                  },
                  event: {
                    click: function (e) {
                      const index = Number(this.getAttribute("index"));
                      const thisFunction = thisMenu[index].event;
                      thisFunction.call(this.parentElement, e).then((str) => {
                        valueDom.textContent = str;
                      }).catch((err) => {
                        console.log(err);
                      });
                    },
                    contextmenu: function (e) {
                      e.preventDefault();
                      const index = Number(this.getAttribute("index"));
                      const thisFunction = thisMenu[index].event;
                      thisFunction.call(this.parentElement, e).then((str) => {
                        valueDom.textContent = str;
                      }).catch((err) => {
                        console.log(err);
                      });
                    },
                  },
                  style: {
                    display: "inline-flex",
                    width: String(designerButtonWidth) + ea,
                    height: String(buttonHeight) + ea,
                    borderRadius: String(5) + "px",
                    background: colorChip.black,
                    marginBottom: String(buttonInnerPadding) + ea,
                    marginRight: String(buttonInnerPadding) + ea,
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  },
                  child: {
                    text: obj.title,
                    style: {
                      fontSize: String(buttonSize) + ea,
                      fontWeight: String(buttonWeight),
                      color: colorChip.white,
                      top: String(buttonTextTop) + ea,
                      position: "relative",
                    },
                    bold: {
                      fontSize: String(buttonSize - 3) + ea,
                      fontWeight: String(300),
                      color: colorChip.gray4,
                    }
                  }
                }
              })
            });
          })
        }

        updatePossibleStatus = instance.designers.filter((d) => {
          return /완료/gi.test(d.information.contract.status);
        }).map((d) => {
          return d.designer + " <b%" + d.desid + "%b>";
        })
        
        thisMenu = updatePossibleStatus.map((str) => {
          const thisDesigner = str.split(" ")[0];
          const thisDesid = str.split(" ")[1].replace(/\<b\%/gi, '').replace(/\%b\>/gi, '');
          return {
            title: str,
            event: async function (e) {
              try {
                const cliid = this.getAttribute("cliid");
                const requestNumber = Number(this.getAttribute("number"));
                let whereQuery, updateQuery;
                let tempObj, tempObj2;
                let thisDesigners;
                let thisDesigners_new;

                thisDesigners = equalJson(JSON.stringify(instance.clients.find((o) => { return o.cliid === cliid }).requests[requestNumber].analytics.response.designers))

                if (/click/gi.test(e.type)) {
                  thisDesigners.push(thisDesid);
                } else {
                  thisDesigners_new = [];
                  for (let desid of thisDesigners) {
                    if (desid !== thisDesid) {
                      thisDesigners_new.push(desid);
                    }
                  }
                  thisDesigners = thisDesigners_new;
                }

                thisDesigners = [ ...new Set(thisDesigners) ];

                whereQuery = { cliid };
                updateQuery = {};
                updateQuery["requests." + String(requestNumber) + ".analytics.response.designers"] = thisDesigners;
                await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateClient");
                instance.clients.find((o) => { return o.cliid === cliid }).requests[requestNumber].analytics.response.designers = thisDesigners;
                instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).client.requests[requestNumber].analytics.response.designers = thisDesigners;
                instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).analytics.response.designers = thisDesigners;

                tempObj = instance.filteredSales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) });
                if (tempObj !== undefined) {
                  tempObj2 = tempObj.cliids.find((o) => { return o.cliid === cliid });
                  if (tempObj2 !== undefined) {
                    tempObj2.client.requests[requestNumber].analytics.response.designers = thisDesigners;
                    tempObj2.analytics.response.designers = thisDesigners;
                  }
                }

                return thisDesigners.map((desid) => { return instance.designers.find((d) => { return d.desid === desid }).designer }).join(", ");

              } catch (e) {
                console.log(e);
              }
            }
          }
        })

        result = await designersMenu(cliid, thisMenu, e, this.querySelector('.' + valueTextClassName), requestNumber);
        if (result) {
          if (instance.filteredSales.length !== 0) {
            instance.contentsLoad(true, instance.filteredSales);
          } else {
            instance.contentsLoad(false);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  this.designersUpdateEvent = designersUpdateEvent;

  lowLowSendEvent = () => {
    return async function (e) {
      try {
        e.preventDefault();
        e.stopPropagation();
        const cliid = this.getAttribute("cliid");
        const requestNumber = Number(this.getAttribute("number"));
        let lowLowSend;
        let thisMenu;

        lowLowSend = [ "하하 전송" ];
        
        thisMenu = lowLowSend.map((str) => {
          const thisStatus = str;
          return {
            title: thisStatus,
            event: async function (e) {
              try {
                const cliid = this.getAttribute("cliid");
                const requestNumber = Number(this.getAttribute("number"));
                const updatedHistory = await ajaxJson({ mode: "lowLow", cliid }, "/salesClient", { equal: true });

                instance.histories.find((o) => { return o.cliid === cliid }).curation.analytics.send = updatedHistory;
                instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).history.curation.analytics.send = updatedHistory;

                tempObj = instance.filteredSales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) });
                if (tempObj !== undefined) {
                  tempObj2 = tempObj.cliids.find((o) => { return o.cliid === cliid });
                  if (tempObj2 !== undefined) {
                    tempObj2.history.curation.analytics.send = updatedHistory;
                  }
                }

              } catch (e) {
                console.log(e);
              }
            }
          }
        });

        if (await createUpdateMenu(cliid, thisMenu, e, this.querySelector('.' + valueTextClassName), requestNumber)) {
          if (instance.filteredSales.length !== 0) {
            instance.contentsLoad(true, instance.filteredSales);
          } else {
            instance.contentsLoad(false);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  this.lowLowSendEvent = lowLowSendEvent;

  clientColumnsFunctionsTong = {
    totalFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        
        instance.filteredSales = [];
        instance.contentsLoad(false);
        instance.filterLog = [];

      } catch (e) {
        console.log(e);
      }
    },
    nonManagerExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "manager") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return (o.history.manager.trim() === '-' || o.history.manager.trim() === '');
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("manager");

      } catch (e) {
        console.log(e);
      }
    },
    sameManagerFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "manager") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.history.manager === title;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("manager");
        
      } catch (e) {
        console.log(e);
      }
    },
    downSortTimeline: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;

        if (instance.filteredSales.length !== 0) {
          copiedSales = equalJson(JSON.stringify(instance.filteredSales));
        } else {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        }

        for (let obj of copiedSales) {
          obj.cliids.sort((a, b) => {
            return b.request.timeline.valueOf() - a.request.timeline.valueOf();
          })
        }

        instance.filteredSales = copiedSales;
        instance.contentsLoad(true, instance.filteredSales);

      } catch (e) {
        console.log(e);
      }
    },
    upSortTimeline: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;

        if (instance.filteredSales.length !== 0) {
          copiedSales = equalJson(JSON.stringify(instance.filteredSales));
        } else {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        }

        for (let obj of copiedSales) {
          obj.cliids.sort((a, b) => {
            return a.request.timeline.valueOf() - b.request.timeline.valueOf();
          })
        }

        instance.filteredSales = copiedSales;
        instance.contentsLoad(true, instance.filteredSales);

      } catch (e) {
        console.log(e);
      }
    },
    sameStatusFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "status") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.analytics.response.status === title;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("status");
        
      } catch (e) {
        console.log(e);
      }
    },
    dropReasonExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "drop") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.analytics.response.outreason.length !== 0;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("drop");

      } catch (e) {
        console.log(e);
      }
    },
    dropReasonNonExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "drop") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.analytics.response.outreason.length === 0;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("drop");

      } catch (e) {
        console.log(e);
      }
    },
    firstResponseExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "firstResponse") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.analytics.date.call.next.valueOf() > (new Date(2000, 0, 1)).valueOf();
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("firstResponse");

      } catch (e) {
        console.log(e);
      }
    },
    firstResponseNonExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "firstResponse") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.analytics.date.call.next.valueOf() < (new Date(2000, 0, 1)).valueOf();
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("firstResponse");

      } catch (e) {
        console.log(e);
      }
    },
    contractPossibleHighFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "contractPossible") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.possible === 1;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("contractPossible");

      } catch (e) {
        console.log(e);
      }
    },
    contractPossibleMiddleFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "contractPossible") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.possible === 1;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("contractPossible");

      } catch (e) {
        console.log(e);
      }
    },
    contractPossibleLowFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "contractPossible") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.possible === 0;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("contractPossible");

      } catch (e) {
        console.log(e);
      }
    },
    priorityThreeFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "priority") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.priority === 2;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("priority");

      } catch (e) {
        console.log(e);
      }
    },
    priorityTwoFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "priority") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.priority === 1;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("priority");

      } catch (e) {
        console.log(e);
      }
    },
    priorityOneFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "priority") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.priority === 0;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("priority");

      } catch (e) {
        console.log(e);
      }
    },
    targetClientThreeFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "targetClient") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.target === 2;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("targetClient");

      } catch (e) {
        console.log(e);
      }
    },
    targetClientTwoFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "targetClient") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.target === 1;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("targetClient");

      } catch (e) {
        console.log(e);
      }
    },
    targetClientOneFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "targetClient") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.target === 0;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("targetClient");

      } catch (e) {
        console.log(e);
      }
    },
    logLowExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "lowLow") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.history.curation.analytics.send.filter((o) => { return o.page === "lowLowPush" }).length > 0;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("lowLow");

      } catch (e) {
        console.log(e);
      }
    },
    logLowNonExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "lowLow") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.history.curation.analytics.send.filter((o) => { return o.page === "lowLowPush" }).length === 0;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("lowLow");

      } catch (e) {
        console.log(e);
      }
    },
    aboutServiceExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "aboutService") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.history.curation.analytics.send.filter((o) => { return o.page === "finalPush" }).length > 0;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("aboutService");

      } catch (e) {
        console.log(e);
      }
    },
    aboutServiceNonExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "aboutService") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.history.curation.analytics.send.filter((o) => { return o.page === "finalPush" }).length === 0;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("aboutService");

      } catch (e) {
        console.log(e);
      }
    },
    designerPorposalExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "designerProposal") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.history.curation.analytics.send.filter((o) => { return o.page === "designerProposal" }).length > 0;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("designerProposal");

      } catch (e) {
        console.log(e);
      }
    },
    designerPorposalNonExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "designerProposal") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.history.curation.analytics.send.filter((o) => { return o.page === "designerProposal" }).length === 0;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("designerProposal");

      } catch (e) {
        console.log(e);
      }
    },
    porposalViewExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "proposalView") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.history.curation.analytics.page.filter((o) => { return o.page === "designerProposal" }).length > 0;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("proposalView");

      } catch (e) {
        console.log(e);
      }
    },
    porposalViewNonExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "proposalView") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.history.curation.analytics.page.filter((o) => { return o.page === "designerProposal" }).length === 0;
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("proposalView");

      } catch (e) {
        console.log(e);
      }
    },
    feedBackExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "feedBack") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.analytics.date.call.recommend.valueOf() > (new Date(2000, 0, 1)).valueOf();
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("feedBack");

      } catch (e) {
        console.log(e);
      }
    },
    feedBackNonExistFilter: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        let copiedSales;
        let newSales;
        let newCliids;

        if (instance.filterLog.length > 0 && instance.filterLog[0] === "feedBack") {
          copiedSales = equalJson(JSON.stringify(instance.sales));
        } else {
          if (instance.filteredSales.length !== 0) {
            copiedSales = equalJson(JSON.stringify(instance.filteredSales));
          } else {
            copiedSales = equalJson(JSON.stringify(instance.sales));
          }
        }

        newSales = [];
        for (let { id, date, cliids } of copiedSales) {
          newCliids = cliids.filter((o) => {
            return o.analytics.date.call.recommend.valueOf() < (new Date(2000, 0, 1)).valueOf();
          });
          newSales.push({
            id,
            date,
            cliids: newCliids
          });
        }

        instance.filteredSales = newSales;
        instance.contentsLoad(true, instance.filteredSales);

        instance.filterLog.unshift("feedBack");

      } catch (e) {
        console.log(e);
      }
    },
    lowLowSend: async function (e, menuIndex) {
      try {
        const index = Number(this.getAttribute("index"));
        const thisMenu = equalJson(this.getAttribute("menu"));
        const thisItem = thisMenu[menuIndex];
        const title = thisItem.title;
        await ajaxJson({ mode: "lowLow" }, BACKHOST + "/salesClient", { equal: true });
        window.alert("오늘의 하하 고객님들께 알림톡을 전송하였습니다!");
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
  }

  columnsFilterSortEvent = function (e) {
    e.preventDefault();
    const zIndex = 4;
    const menu = equalJson(this.getAttribute("menu"));
    const index = Number(this.getAttribute("index"));
    createNode({
      mother: totalContents,
      class: [ updateMenuClassName ],
      event: {
        click: function (e) {
          removeByClass(updateMenuClassName);
        }
      },
      style: {
        position: "fixed",
        top: String(0),
        left: String(0),
        background: "transparent",
        width: withOut(0, ea),
        height: withOut(0, ea),
        zIndex: String(zIndex),
      }
    });

    createNode({
      mother: totalContents,
      attribute: { index: String(index), menu: JSON.stringify(menu) },
      class: [ updateMenuClassName ],
      style: {
        position: "absolute",
        top: String(e.y) + "px",
        left: String(e.x) + "px",
        padding: String(buttonOuterPadding) + ea,
        paddingBottom: String(buttonOuterPadding - buttonInnerPadding) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.white,
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        animation: "fadeuplite 0.3s ease forwards",
        zIndex: String(zIndex),
      },
      children: menu.map((obj, index) => {
        return {
          attribute: {
            key: obj.key,
            index: String(index),
          },
          event: {
            click: function (e) {
              const key = this.getAttribute("key");
              const index = Number(this.getAttribute("index"));
              const thisFunction = clientColumnsFunctionsTong[key];
              thisFunction.call(this.parentElement, e, index).then(() => {
                removeByClass(updateMenuClassName);
              }).catch((err) => {
                console.log(err);
              });
            },
            contextmenu: function (e) {
              e.preventDefault();
              const key = this.getAttribute("key");
              const index = Number(this.getAttribute("index"));
              const thisFunction = clientColumnsFunctionsTong[key];
              thisFunction.call(this.parentElement, e, index).then(() => {
                removeByClass(updateMenuClassName);
              }).catch((err) => {
                console.log(err);
              });
            },
          },
          style: {
            display: "flex",
            width: String(managerButtonSize) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGray,
            marginBottom: String(buttonInnerPadding) + ea,
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          child: {
            text: obj.title,
            style: {
              fontSize: String(buttonSize) + ea,
              fontWeight: String(buttonWeight),
              color: colorChip.white,
              top: String(buttonTextTop) + ea,
              position: "relative",
            }
          }
        }
      })
    });

  };

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

  contentsLoad = (customSalesMode = false, sales = []) => {

    cleanChildren(grayTong);

    if (customSalesMode) {
      targetSales = sales;
    } else {
      targetSales = instance.sales;
    }

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
      text: "기준 날짜",
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

    number = 0;
    for (let { title, menu } of clientColumns) {
      createNode({
        mother: targetTong,
        attribute: { menu: JSON.stringify(menu), index: String(number) },
        event: {
          click: columnsFilterSortEvent,
          contextmenu: columnsFilterSortEvent,
        },
        text: title,
        style: {
          width: number !== clientColumns.length - 1 ? String(tableBlockFactorWidth) + ea : String(tableBlockFactorWidth * 2) + ea,
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
      number++;
    }

    instance.valueRowDoms = [];
    for (let { date, cliids } of targetSales) {

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
      predictDesignersNumber = 0;

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
        predictDesigners = '-';

        if (thisHistory.manager !== '-' && thisHistory.manager !== '') {
          manager = thisHistory.manager;
        } else {
          managerNumber = managerNumber + 1;
        }

        status = thisAnalytics.response.status;
        if (/응대/gi.test(status)) {
          statusNumber = statusNumber + 1;
        }

        firstResponse = dateConvert(thisAnalytics.date.call.next);
        if (firstResponse === "-") {
          firstResponseNumber = firstResponseNumber + 1;
        }

        contractPossible = thisAnalytics.response.possible;
        if (contractPossible === "높음") {
          contractPossibleNumber = contractPossibleNumber + 1;
        }

        priority = thisAnalytics.response.priority;
        targetClient = thisAnalytics.response.target;
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

        feedBack = dateConvert(thisAnalytics.date.call.recommend);
        if (feedBack === "-") {
          feedBackNumber = feedBackNumber + 1;
        }

        predictDesigners = thisAnalytics.response.designers.map((desid) => { return instance.designers.find((d) => { return d.desid === desid }).designer }).join(", ");
        if (predictDesigners !== '') {
          predictDesignersNumber = predictDesignersNumber + 1;
        } else {
          predictDesigners = '-';
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
            value: feedBack,
            color: colorChip.black,
            check: false,
          },
          {
            value: predictDesigners,
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
            cliid: thisClient.cliid,
            number: String(cliids[z].requestNumber),
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
              number: String(cliids[z].requestNumber),
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
              width: i === clientColumns.length - 1 ? String(tableBlockFactorWidth * 2) + ea : String(tableBlockFactorWidth - 1) + ea,
              borderRight: i === clientColumns.length - 1 ?  "" : "1px solid " + colorChip.gray3,
              cursor: "pointer",
              verticalAlign: "top",
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
                  class: [ valueTextClassName ],
                  attribute: {
                    color: clientValueArr[i].color,
                  },
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
          if (i === 0) {
            clientDom.addEventListener("click", instance.whiteCardView(thisClient.cliid, cliids[z].requestNumber));
          } else if (i === 1) {
            clientDom.addEventListener("click", managerUpdateEvent());
            clientDom.addEventListener("contextmenu", managerUpdateEvent());
          } else if (i === 3) {
            clientDom.addEventListener("click", statusUpdateEvent());
            clientDom.addEventListener("contextmenu", statusUpdateEvent());
          } else if (i === 4) {
            clientDom.addEventListener("click", firstResponseUpdateEvent());
            clientDom.addEventListener("contextmenu", firstResponseUpdateEvent());
          } else if (i === 5) {

            
          } else if (i === 6) {

            
          } else if (i === 7) {

            
          } else if (i === 8) {
            clientDom.addEventListener("click", lowLowSendEvent());
            clientDom.addEventListener("contextmenu", lowLowSendEvent());
          } else if (i === 11) {
            clientDom.addEventListener("click", feedBackUpdateEvent());
            clientDom.addEventListener("contextmenu", feedBackUpdateEvent());
          } else if (i === 12) {
            clientDom.addEventListener("click", designersUpdateEvent());
            clientDom.addEventListener("contextmenu", designersUpdateEvent());
          }
        }

        instance.valueRowDoms.push(clientBlack);
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
          value: "<b%" + String(feedBackNumber) + "%b>" + slash + String(cliids.length),
          color: colorChip.black,
          check: false,
        },
        {
          value: "<b%" + String(predictDesignersNumber) + "%b>" + slash + String(cliids.length),
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
            width: i === clientColumns.length - 1 ? String(tableBlockFactorWidth * 2) + ea : String(tableBlockFactorWidth - 1) + ea,
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

  contentsLoad(false);

  this.contentsLoad = contentsLoad;
}

SalesJs.prototype.whiteCardView = function (cliid, requestNumber) {
  const instance = this;
  const { totalContents, ea, belowHeight, clients } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, selfHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, removeByClass, setQueue, serviceParsing, equalJson, sleep } = GeneralJs;
  return async function (e) {
    try {
      const client = clients.find((obj) => { return obj.cliid === cliid });
      const zIndex = 2;
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
      let memoArea, menuArea;
      let memoAreaWidth;
      let memoAreaMargin;
      let memoTitleAreaHeight;
      let memoTitleSize, memoTitleWeight;
      let memoTitleTextTop, memoTitleVisualLeft;
      let memoAreaInnerPadding;
      let memoContentsSize, memoContentsWeight, memoContentsLineHeight;
      let callHistory;
      let latestCall;
      let secondMemoTitleAreaHeight;
      let dateAreaHeight;

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

      memoAreaWidth = 456;
      memoAreaMargin = 50;
      memoTitleAreaHeight = 71;

      memoTitleSize = 15;
      memoTitleWeight = 700;
      memoTitleTextTop = -7;
      memoTitleVisualLeft = 1;

      memoAreaInnerPadding = 20;

      memoContentsSize = 13;
      memoContentsWeight = 400;
      memoContentsLineHeight = 1.6;

      secondMemoTitleAreaHeight = 50;
      dateAreaHeight = 166;

      // base

      removeByClass(whiteCardClassName);

      cancelBack = createNode({
        mother: totalContents,
        class: [ whiteCardClassName ],
        attribute: { cliid: cliid, number: String(requestNumber) },
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
        attribute: { cliid: cliid, number: String(requestNumber) },
        style: {
          position: "fixed",
          top: String(whiteOuterMargin) + ea,
          left: String(whiteOuterMargin) + ea,
          width: withOut((whiteOuterMargin * 2) + (0 * 2), ea),
          height: withOut((whiteOuterMargin * 2) + belowHeight + (0 * 2), ea),
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
            child: {
              mode: "iframe",
              attribute: {
                src: window.location.protocol + "//" + window.location.host + "/client?cliid=" + cliid + "&entire=true&dataonly=true",
              },
              style: {
                position: "absolute",
                display: "block",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                border: String(0),
              }
            }
          }
        ]
      }).firstChild;

    } catch (e) {
      console.log(e);
    }
  }
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
  let thisRequestNumber;

  this.clients = serverResponse.clients;
  this.histories = serverResponse.histories;

  salesTong = [];
  for (let obj of serverResponse.sales) {

    tempObj = {
      id: obj.id,
      date: obj.date,
      cliids: [],
    }

    pureCliids = obj.cliids.map((o) => { return o.cliid });

    for (let cliid of pureCliids) {
      thisClient = serverResponse.clients.find((c) => { return c.cliid === cliid });
      thisHistory = serverResponse.histories.find((c) => { return c.cliid === cliid });
      thisRequestNumber = 0;
      for (let i = 0; i < thisClient.requests.length; i++) {
        if (thisClient.requests[i].request.timeline.valueOf() <= obj.date.valueOf()) {
          thisRequestNumber = i;
          break;
        }
      }
      thisObj = {
        cliid: thisClient.cliid,
        client: thisClient,
        phone: thisClient.phone,
        name: thisClient.name,
        request: thisClient.requests[thisRequestNumber].request,
        analytics: thisClient.requests[thisRequestNumber].analytics,
        requestNumber: thisRequestNumber,
        history: thisHistory,
        ...obj.cliids.find((o) => { return o.cliid === cliid }),
      };
      tempObj.cliids.push(thisObj);
    }
    salesTong.push(tempObj);
  }

  this.sales = salesTong;
  this.filteredSales = [];
}

SalesJs.prototype.addTransFormEvent = function () {
  const instance = this;
  const { selfHref } = GeneralJs;
  const { square: { up, down, reportIcon, returnIcon } } = this.mother.belowButtons;
  down.addEventListener("click", (e) => { selfHref("/client") });
  reportIcon.addEventListener("click", instance.reportCardView());
}

SalesJs.prototype.searchClients = function () {
  const instance = this;
  const { totalContents, ea, belowHeight } = this;
  const { ajaxJson, uniqueValue, blankHref, setDebounce } = GeneralJs;
  const whiteCardClassName = "whiteCardClassName";
  let searchEvent;
  let loading;
  let removeTargets;

  searchEvent = (value, e) => {
    return () => {
      loading = instance.mother.grayLoading(null, true);

      removeTargets = document.querySelectorAll('.' + whiteCardClassName);
      for (let dom of removeTargets) {
        dom.remove();
      }

      if (value.trim() !== '' && value.trim() !== '.' && value.trim() !== "전체") {
        ajaxJson({ mode: "search", value: value.trim() }, BACKHOST + "/salesClient", { equal: true }).then((serverResponse) => {
          instance.reloadSalesTong(serverResponse);
          instance.contentsLoad(false);
    
          loading.remove();

        }).catch((err) => {
          console.log(err);
        });
      } else {
        ajaxJson({ mode: "init" }, BACKHOST + "/salesClient", { equal: true }).then((serverResponse) => {
          instance.reloadSalesTong(serverResponse);
          instance.contentsLoad(false);
          loading.remove();

        }).catch((err) => {
          console.log(err);
        });
      }
    }
  }

  this.searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      setDebounce(searchEvent(this.value, e), "__searchMatrix__", 200);
    }
  });
}

SalesJs.prototype.communicationRender = function () {
  const instance = this;
  const { communication } = this.mother;
  const { ajaxJson, sleep, serviceParsing, findByAttribute, dateToString } = GeneralJs;
  const whiteCardClassName = "whiteCardClassName";

  communication.setItem([
    () => { return "추천서 자동 생성"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        let serid;
        let cliid, requestNumber, thisClient;
        let response, project;

        if (document.querySelector('.' + whiteCardClassName) === null || document.querySelector('.' + whiteCardClassName) === undefined) {
          window.alert("고객 카드를 먼저 열어주세요!");
          return;
        } else {
          cliid = document.querySelector('.' + whiteCardClassName).getAttribute("cliid");
          requestNumber = Number(document.querySelector('.' + whiteCardClassName).getAttribute("number"));
        }

        [ thisClient ] = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getClients", { equal: true });

        if (window.confirm(thisClient.name + " 고객님의 추천서를 새롭게 자동 생성합니다. 확실합니까?")) {

          response = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getProjects", { equal: true });
          if (response.length !== 0) {
            [ project ] = response;
            if (project.desid !== "") {
              window.alert("추천서가 새로 만들어질 예정입니다.");
            }
          }

          if (/홈퍼/gi.test(serviceParsing(thisClient.requests[requestNumber].analytics.response.service))) {
            serid = "s2011_aa01s";
          } else if (/홈스/gi.test(serviceParsing(thisClient.requests[requestNumber].analytics.response.service))) {
            serid = "s2011_aa02s";
          } else if (/토탈/gi.test(serviceParsing(thisClient.requests[requestNumber].analytics.response.service))) {
            serid = "s2011_aa03s";
          } else {
            serid = "s2011_aa04s";
          }

          await ajaxJson({
            id: cliid,
            column: "curation.analytics.full",
            value: false,
            email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
          }, "/updateClientHistory");

          await ajaxJson({ cliid, serid, silent: true }, "/proposalCreate");

          await sleep(1000);
          window.alert("추천서 제작 요청이 완료되었습니다!");
        }

      } catch (e) {
        console.log(e);
      }
    }
  ]);
  communication.setItem([
    () => { return "페이퍼 출력"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        let history;
        let curation;
        let cliid, requestNumber, thisClient;

        if (document.querySelector('.' + whiteCardClassName) === null || document.querySelector('.' + whiteCardClassName) === undefined) {
          window.alert("고객 카드를 먼저 열어주세요!");
          return;
        } else {
          cliid = document.querySelector('.' + whiteCardClassName).getAttribute("cliid");
          requestNumber = Number(document.querySelector('.' + whiteCardClassName).getAttribute("number"));
        }

        history = await ajaxJson({ id: cliid, rawMode: true }, "/getClientHistory", { equal: true });
        curation = history.curation;
        await ajaxJson({ cliid, requestNumber, curation }, SECONDHOST + "/printClient");
        window.alert("출력 요청이 완료되었습니다!");

      } catch (e) {
        console.log(e);
      }
    }
  ]);
  communication.setItem([
    () => { return "순수 부재중 알림"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        let cliid;
        let requestNumber;
        let thisClient;

        if (document.querySelector('.' + whiteCardClassName) === null || document.querySelector('.' + whiteCardClassName) === undefined) {
          window.alert("고객 카드를 먼저 열어주세요!");
          return;
        } else {
          cliid = document.querySelector('.' + whiteCardClassName).getAttribute("cliid");
          requestNumber = Number(document.querySelector('.' + whiteCardClassName).getAttribute("number"));
        }

        [ thisClient ] = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getClients", { equal: true });

        if (window.confirm(thisClient.name + " 고객님께 순수 부재중 알림 알림톡을 전송합니다. 확실합니까?")) {
          await ajaxJson({
            id: cliid,
            column: null,
            value: null,
            email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            send: "pureOutOfClient",
          }, BACKHOST + "/updateClientHistory");
          await ajaxJson({
            method: "pureOutOfClient",
            name: thisClient.name,
            phone: thisClient.phone,
            option: {
              client: thisClient.name,
              emoji0: "(미소)",
              emoji1: "(콜)",
            }
          }, BACKHOST + "/alimTalk");
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);
  communication.setItem([
    () => { return "고객용 서비스 소개"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        let cliid;
        let requestNumber;
        let thisClient;
        let allRows;
        let thisRow;

        if (document.querySelector('.' + whiteCardClassName) === null || document.querySelector('.' + whiteCardClassName) === undefined) {
          window.alert("고객 카드를 먼저 열어주세요!");
          return;
        } else {
          cliid = document.querySelector('.' + whiteCardClassName).getAttribute("cliid");
          requestNumber = Number(document.querySelector('.' + whiteCardClassName).getAttribute("number"));
        }
        
        [ thisClient ] = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getClients", { equal: true });

        if (window.confirm(thisClient.name + " 고객님께 서비스 소개 알림톡을 전송합니다. 확실합니까?")) {

          await ajaxJson({
            id: cliid,
            column: null,
            value: null,
            email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            send: "finalPush",
          }, BACKHOST + "/updateClientHistory");

          await ajaxJson({
            method: "finalPush",
            name: thisClient.name,
            phone: thisClient.phone,
            option: {
              client: thisClient.name,
              host: FRONTHOST.replace(/^https\:\/\//i, ''),
              path: "magnetic",
            }
          }, BACKHOST + "/alimTalk");

          allRows = Array.from(document.querySelectorAll(".clientTableClassName")).map((dom) => { return Array.from(dom.children) }).flat()
          thisRow = findByAttribute(allRows, "cliid", cliid);
          if (thisRow !== null) {
            thisRow.children[9].querySelector(".valueTextClassName").textContent = dateToString(new Date());
            thisRow.children[0].click();
          }

        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);
}

SalesJs.prototype.postMessageEvent = function () {
  const instance = this;
  const { equalJson, ajaxJson, stringToDate } = GeneralJs;
  window.addEventListener("message", async function (e) {
    try {
      const message = JSON.parse(e.data);
      let cliid, requestNumber, value;
      let tempObj, tempObj2;
      let finalValue;

      if (message.column === "designers") {
        ({ cliid, requestNumber, value } = message);

        instance.clients.find((o) => { return o.cliid === cliid }).requests[requestNumber].analytics.response.designers = value;
        instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).client.requests[requestNumber].analytics.response.designers = value;
        instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).analytics.response.designers = value;

        tempObj = instance.filteredSales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) });
        if (tempObj !== undefined) {
          tempObj2 = tempObj.cliids.find((o) => { return o.cliid === cliid });
          if (tempObj2 !== undefined) {
            tempObj2.client.requests[requestNumber].analytics.response.designers = value;
            tempObj2.analytics.response.designers = value;
          }
        }

        if (instance.filteredSales.length !== 0) {
          instance.contentsLoad(true, instance.filteredSales);
        } else {
          instance.contentsLoad(false);
        }
      } else if (message.column === "status") {
        ({ cliid, requestNumber, value } = message);

        instance.clients.find((o) => { return o.cliid === cliid }).requests[requestNumber].analytics.response.status = value;
        instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).client.requests[requestNumber].analytics.response.status = value;
        instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).analytics.response.status = value;

        tempObj = instance.filteredSales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) });
        if (tempObj !== undefined) {
          tempObj2 = tempObj.cliids.find((o) => { return o.cliid === cliid });
          if (tempObj2 !== undefined) {
            tempObj2.client.requests[requestNumber].analytics.response.status = value;
            tempObj2.analytics.response.status = value;
          }
        }

        if (instance.filteredSales.length !== 0) {
          instance.contentsLoad(true, instance.filteredSales);
        } else {
          instance.contentsLoad(false);
        }
      } else if (message.column === "firstResponse") {
        ({ cliid, requestNumber, value } = message);
        finalValue = stringToDate(value);
        
        instance.clients.find((o) => { return o.cliid === cliid }).requests[requestNumber].analytics.date.call.next = finalValue;
        instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).client.requests[requestNumber].analytics.date.call.next = finalValue;
        instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).analytics.date.call.next = finalValue;

        tempObj = instance.filteredSales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) });
        if (tempObj !== undefined) {
          tempObj2 = tempObj.cliids.find((o) => { return o.cliid === cliid });
          if (tempObj2 !== undefined) {
            tempObj2.client.requests[requestNumber].analytics.date.call.next = finalValue;
            tempObj2.analytics.date.call.next = finalValue;
          }
        }

        if (instance.filteredSales.length !== 0) {
          instance.contentsLoad(true, instance.filteredSales);
        } else {
          instance.contentsLoad(false);
        }
      } else if (message.column === "feedBack") {
        ({ cliid, requestNumber, value } = message);
        finalValue = stringToDate(value);

        instance.clients.find((o) => { return o.cliid === cliid }).requests[requestNumber].analytics.date.call.recommend = finalValue;
        instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).client.requests[requestNumber].analytics.date.call.recommend = finalValue;
        instance.sales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) }).cliids.find((o) => { return o.cliid === cliid }).analytics.date.call.recommend = finalValue;

        tempObj = instance.filteredSales.find((o) => { return o.cliids.map(({ cliid }) => { return cliid }).includes(cliid) });
        if (tempObj !== undefined) {
          tempObj2 = tempObj.cliids.find((o) => { return o.cliid === cliid });
          if (tempObj2 !== undefined) {
            tempObj2.client.requests[requestNumber].analytics.date.call.recommend = finalValue;
            tempObj2.analytics.date.call.recommend = finalValue;
          }
        }

        if (instance.filteredSales.length !== 0) {
          instance.contentsLoad(true, instance.filteredSales);
        } else {
          instance.contentsLoad(false);
        }
      }
    } catch {}
  });
}

SalesJs.prototype.reportCardView = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, clients } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, selfHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, removeByClass, setQueue, serviceParsing, equalJson, sleep } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 2;
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
      let memoArea, menuArea;
      let memoAreaWidth;
      let memoAreaMargin;
      let memoTitleAreaHeight;
      let memoTitleSize, memoTitleWeight;
      let memoTitleTextTop, memoTitleVisualLeft;
      let memoAreaInnerPadding;
      let memoContentsSize, memoContentsWeight, memoContentsLineHeight;
      let callHistory;
      let latestCall;
      let secondMemoTitleAreaHeight;
      let dateAreaHeight;

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

      memoAreaWidth = 456;
      memoAreaMargin = 50;
      memoTitleAreaHeight = 71;

      memoTitleSize = 15;
      memoTitleWeight = 700;
      memoTitleTextTop = -7;
      memoTitleVisualLeft = 1;

      memoAreaInnerPadding = 20;

      memoContentsSize = 13;
      memoContentsWeight = 400;
      memoContentsLineHeight = 1.6;

      secondMemoTitleAreaHeight = 50;
      dateAreaHeight = 166;

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
          width: withOut((whiteOuterMargin * 2) + (0 * 2), ea),
          height: withOut((whiteOuterMargin * 2) + belowHeight + (0 * 2), ea),
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
            child: {
              mode: "iframe",
              attribute: {
                src: window.location.protocol + "//" + window.location.host + "/client?report=sales&entire=true&dataonly=true",
              },
              style: {
                position: "absolute",
                display: "block",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                border: String(0),
              }
            }
          }
        ]
      }).firstChild;

    } catch (e) {
      console.log(e);
    }
  }
}

SalesJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, equalJson, returnGet, colorChip } = GeneralJs;
  try {
    const getObj = returnGet();
    const entireMode = (getObj.dataonly === "true" && getObj.entire === "true");
    let loading;
    let serverResponse;
    let members;
    let designers;

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    if (entireMode) {
      this.belowHeight = this.mother.belowHeight = 0;
      this.grayBarWidth = this.mother.grayBarWidth = 0;  
    }
    this.entireMode = entireMode;

    loading = this.mother.grayLoading(null, true);
    
    this.clients = [];
    this.histories = [];
    this.sales = [];
    this.filteredSales = [];
    this.filterLog = [];

    serverResponse = await ajaxJson({ mode: "init" }, BACKHOST + "/salesClient", { equal: true });
    this.reloadSalesTong(serverResponse);

    members = await ajaxJson({ type: "get" }, BACKHOST + "/getMembers", { equal: true });
    this.members = members;
    this.managers = members.filter((o) => {
      return o.alive;
    }).filter((o) => {
      return o.roles.includes("CX");
    });

    designers = await ajaxJson({ noFlat: true, whereQuery: {} }, BACKHOST + "/getDesigners", { equal: true });
    this.designers = designers;
    this.valueRowDoms = [];

    this.baseMaker();
    this.addTransFormEvent();
    this.searchClients();
    this.communicationRender();
    this.postMessageEvent();

    document.getElementById("moveLeftArea").remove();
    document.getElementById("moveRightArea").remove();
    document.getElementById("grayLeftOpenButton").remove();

    loading.remove();

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e.message).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
