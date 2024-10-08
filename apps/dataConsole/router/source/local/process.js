const ProcessJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
}

ProcessJs.prototype.baseMaker = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects, media, entireMode } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, serviceParsing, equalJson, svgMaker, removeByClass, findByAttribute, returnGet } = GeneralJs;
  const splitToken = "__split__";
  const checkBoxLocalStorageName = "checkBoxLocalStorageName";
  const filterMenuClassName = "filterMenuClassName";
  const clientTableClassName = "clientTableClassName";
  const updateMenuClassName = "updateMenuClassName";
  const whiteCardClassName = "whiteCardClassName";
  const getObj = returnGet();
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
  let clientDom;
  let checkBoxVisualLeft;
  let sendStatus, sendStatusNumber;
  let sendSchedule, sendScheduleNumber;
  let sendFile, sendFileNumber;
  let checkBoxLocalStorageObj;
  let clientColumnsMenu;
  let clientColumnsBlankTitle;
  let clientColumnsBaseEvent;
  let buttonOuterPadding, buttonInnerPadding;
  let buttonWidth, buttonHeight;
  let buttonSize, buttonWeight, buttonTextTop;
  let clientColumnsFunctionsTong;
  let matchingFilterMaker;
  let circleTop, circleWidth, circleMarginLeft;
  let designerButtonWidth;
  let designerDomEvent;
  let managerFilterEvent;
  let managerButtonSize;
  let designerFilterEvent;
  let designerFilterButtonSize;
  let calendarWidth;
  let calendarPadding;
  let projectStatusUpdateEvent;
  let projectPartnerUpdateEvent;
  let projectMeetingUpdateEvent;
  let projectStartDateUpdateEvent;
  let projectEndDateUpdateEvent;
  let emptyProjectsDesigners;
  let notEmptyProjectsDesigners;
  let subAreaLeft, subAreaTop;
  let numbersSortEvent;
  let searchByProjects;
  let searchProjects;

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
      title: "상태",
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
      title: "시공사",
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
      title: "마지막 연락",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "계약금",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "현장 미팅",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "잔금",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "시작일",
      menu: [],
      blank: true,
      type: "date",
    },
    {
      title: "종료일",
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
  ];

  this.clientColumnsMenu = clientColumnsMenu;
  this.clientColumnsBlankTitle = clientColumnsBlankTitle;
  this.clientColumns = clientColumns;

  outerMargin = 30;
  innerPadding = 10;

  if (entireMode && (getObj.proid === undefined)) {
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
  tableBlockFactorWidth = 110;
  tableBetween = 20;

  blockVisualPadding = 8;

  nameWidth = 56;
  designerWidth = 280;
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

  subAreaBottom = 18;
  subAreaBetween = 4;

  onlineCircleTop = 2.5;
  onlineCircleWidth = 6;
  onlineCircleMarginRight = 4;
  onlineStatusSize = 14;
  onlineStatusWeight = 400;

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

  designerButtonWidth = 130;

  managerButtonSize = 90;
  designerFilterButtonSize = 90;

  calendarWidth = 260;
  calendarPadding = 4;

  subAreaLeft = 200;
  subAreaTop = 10;

  contentsLoad = () => {};

  buttonList = [];

  clientColumnsBaseEvent = (desid) => {
    return function (e) {

      e.preventDefault();
      e.stopPropagation();

      const index = Number(this.getAttribute("index"));
      const { menu, blank } = clientColumns[index];
      const zIndex = 4;
      let thisMenu;
      let cancelBack, menuPrompt;

      thisMenu = equalJson(JSON.stringify(clientColumnsMenu));
      if (blank) {
        thisMenu = thisMenu.concat(equalJson(JSON.stringify(clientColumnsBlankTitle)));
      }
      thisMenu = thisMenu.concat(menu);

      cancelBack = createNode({
        mother: totalContents,
        class: [ filterMenuClassName ],
        event: {
          click: function (e) {
            removeByClass(filterMenuClassName);
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
        class: [ filterMenuClassName ],
        attribute: {
          index: String(index),
          desid,
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
              key: obj.key
            },
            event: {
              click: function (e) {
                const key = this.getAttribute("key");
                const thisFunction = clientColumnsFunctionsTong[key];
                thisFunction.call(this.parentElement, e, false);
                removeByClass(filterMenuClassName);
              },
              contextmenu : function (e) {
                e.preventDefault();
                const key = this.getAttribute("key");
                const thisFunction = clientColumnsFunctionsTong[key];
                thisFunction.call(this.parentElement, e, true);
                removeByClass(filterMenuClassName);
              }
            },
            style: {
              display: "flex",
              width: String(buttonWidth) + ea,
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
      })

    }
  }

  matchingFilterMaker = (keyword) => {
    return function (e, entireMode = false) {
      const index = Number(this.getAttribute("index"));
      const type = clientColumns[index].type;
      let targetTable;
      let targetTables;
      let targets;
      let titleDom;
      let sumDom;
      let number;

      if (!entireMode) {

        targetTable = findByAttribute([ ...document.querySelectorAll('.' + clientTableClassName) ], "desid", this.getAttribute("desid"))
        targets = [ ...targetTable.children ].filter((dom) => { return typeof dom.getAttribute("proid") === "string" });
        titleDom = targetTable.firstChild;
        sumDom = targetTable.lastChild;
  
        targets = targets.map((dom) => {
          let boo;
          if ([ ...dom.children ][index].firstChild.textContent.trim() === keyword) {
            boo = true;
          } else {
            boo = false;
          }
          return { dom, boo }
        });
  
        targets.unshift({ dom: titleDom, boo: true });
        targets.push({ dom: sumDom, boo: true });
  
        number = 0;
        for (let { dom, boo } of targets) {
          if (number === 1 && boo) {
            if (number === targets.filter((obj) => { return obj.boo }).length - 2) {
              for (let child of dom.children) {
                child.style.paddingTop = String(blockVisualPadding) + ea;
                child.style.paddingBottom = String(blockVisualPadding) + ea;
              }
            } else {
              for (let child of dom.children) {
                child.style.paddingTop = String(blockVisualPadding) + ea;
                child.style.paddingBottom = String(0) + ea;
              }
            }
          } else if (number === targets.filter((obj) => { return obj.boo }).length - 2 && boo) {
            for (let child of dom.children) {
              child.style.paddingTop = String(0) + ea;
              child.style.paddingBottom = String(blockVisualPadding) + ea;
            }
          } else {
            for (let child of dom.children) {
              child.style.paddingTop = String(0) + ea;
              child.style.paddingBottom = String(0) + ea;
            }
          }
          if (boo) {
            dom.style.display = "block";
            number++;
          } else {
            dom.style.display = "none";
          }
        }

      } else {


        targetTables = [ ...document.querySelectorAll('.' + clientTableClassName) ];

        for (let targetTable of targetTables) {

          targets = [ ...targetTable.children ].filter((dom) => { return typeof dom.getAttribute("proid") === "string" });
          titleDom = targetTable.firstChild;
          sumDom = targetTable.lastChild;
    
          targets = targets.map((dom) => {
            let boo;
            if ([ ...dom.children ][index].firstChild.textContent.trim() === keyword) {
              boo = true;
            } else {
              boo = false;
            }
            return { dom, boo }
          });
    
          targets.unshift({ dom: titleDom, boo: true });
          targets.push({ dom: sumDom, boo: true });
    
          number = 0;
          for (let { dom, boo } of targets) {
            if (number === 1 && boo) {
              if (number === targets.filter((obj) => { return obj.boo }).length - 2) {
                for (let child of dom.children) {
                  child.style.paddingTop = String(blockVisualPadding) + ea;
                  child.style.paddingBottom = String(blockVisualPadding) + ea;
                }
              } else {
                for (let child of dom.children) {
                  child.style.paddingTop = String(blockVisualPadding) + ea;
                  child.style.paddingBottom = String(0) + ea;
                }
              }
            } else if (number === targets.filter((obj) => { return obj.boo }).length - 2 && boo) {
              for (let child of dom.children) {
                child.style.paddingTop = String(0) + ea;
                child.style.paddingBottom = String(blockVisualPadding) + ea;
              }
            } else {
              for (let child of dom.children) {
                child.style.paddingTop = String(0) + ea;
                child.style.paddingBottom = String(0) + ea;
              }
            }
            if (boo) {
              dom.style.display = "block";
              number++;
            } else {
              dom.style.display = "none";
            }
          }

        }

      }

    }
  }

  clientColumnsFunctionsTong = {
    downSort: function (e, entireMode = false) {
      const index = Number(this.getAttribute("index"));
      const type = clientColumns[index].type;
      let targetTable;
      let targetTables;
      let targets;
      let titleDom;
      let sumDom;
      let number;
      let boo;

      if (!entireMode) {
        targetTable = findByAttribute([ ...document.querySelectorAll('.' + clientTableClassName) ], "desid", this.getAttribute("desid"))
        targets = [ ...targetTable.children ].filter((dom) => { return typeof dom.getAttribute("proid") === "string" });
        titleDom = targetTable.firstChild;
        sumDom = targetTable.lastChild;
  
        if (type === "date") {
          targets.sort((a, b) => {
            const aValue = [ ...a.children ][index].firstChild.textContent;
            const bValue = [ ...b.children ][index].firstChild.textContent;
            return stringToDate(bValue).valueOf() - stringToDate(aValue).valueOf();
          })
        } else if (type === "string") {
          targets.sort((a, b) => {
            const aValue = [ ...a.children ][index].firstChild.textContent;
            const bValue = [ ...b.children ][index].firstChild.textContent;
            return bValue.charCodeAt(0) - aValue.charCodeAt(0);
          })
        }
  
        targets.unshift(titleDom);
        targets.push(sumDom);
  
        number = 0;
        for (let dom of targets) {
          boo = (dom.style.display !== "none");
          if (number === 1 && boo) {
            if (number === targets.filter((obj) => { return obj.style.display !== "none" }).length - 2) {
              for (let child of dom.children) {
                child.style.paddingTop = String(blockVisualPadding) + ea;
                child.style.paddingBottom = String(blockVisualPadding) + ea;
              }
            } else {
              for (let child of dom.children) {
                child.style.paddingTop = String(blockVisualPadding) + ea;
                child.style.paddingBottom = String(0) + ea;
              }
            }
          } else if (number === targets.filter((obj) => { return obj.style.display !== "none" }).length - 2 && boo) {
            for (let child of dom.children) {
              child.style.paddingTop = String(0) + ea;
              child.style.paddingBottom = String(blockVisualPadding) + ea;
            }
          } else {
            for (let child of dom.children) {
              child.style.paddingTop = String(0) + ea;
              child.style.paddingBottom = String(0) + ea;
            }
          }
          targetTable.appendChild(dom);
          if (boo) {
            number++;
          }
        }
        
      } else {

        targetTables = [ ...document.querySelectorAll('.' + clientTableClassName) ];

        for (let targetTable of targetTables) {
          targets = [ ...targetTable.children ].filter((dom) => { return typeof dom.getAttribute("proid") === "string" });
          titleDom = targetTable.firstChild;
          sumDom = targetTable.lastChild;
    
          if (type === "date") {
            targets.sort((a, b) => {
              const aValue = [ ...a.children ][index].firstChild.textContent;
              const bValue = [ ...b.children ][index].firstChild.textContent;
              return stringToDate(bValue).valueOf() - stringToDate(aValue).valueOf();
            })
          } else if (type === "string") {
            targets.sort((a, b) => {
              const aValue = [ ...a.children ][index].firstChild.textContent;
              const bValue = [ ...b.children ][index].firstChild.textContent;
              return bValue.charCodeAt(0) - aValue.charCodeAt(0);
            })
          }
    
          targets.unshift(titleDom);
          targets.push(sumDom);
    
          number = 0;
          for (let dom of targets) {
            boo = (dom.style.display !== "none");
            if (number === 1 && boo) {
              if (number === targets.filter((obj) => { return obj.style.display !== "none" }).length - 2) {
                for (let child of dom.children) {
                  child.style.paddingTop = String(blockVisualPadding) + ea;
                  child.style.paddingBottom = String(blockVisualPadding) + ea;
                }
              } else {
                for (let child of dom.children) {
                  child.style.paddingTop = String(blockVisualPadding) + ea;
                  child.style.paddingBottom = String(0) + ea;
                }
              }
            } else if (number === targets.filter((obj) => { return obj.style.display !== "none" }).length - 2 && boo) {
              for (let child of dom.children) {
                child.style.paddingTop = String(0) + ea;
                child.style.paddingBottom = String(blockVisualPadding) + ea;
              }
            } else {
              for (let child of dom.children) {
                child.style.paddingTop = String(0) + ea;
                child.style.paddingBottom = String(0) + ea;
              }
            }
            targetTable.appendChild(dom);
            if (boo) {
              number++;
            }
          }

        }
      }
    },
    upSort: function (e, entireMode = false) {
      const index = Number(this.getAttribute("index"));
      const type = clientColumns[index].type;
      let targetTable;
      let targetTables;
      let targets;
      let titleDom;
      let sumDom;
      let number;
      let boo;

      if (!entireMode) {
        targetTable = findByAttribute([ ...document.querySelectorAll('.' + clientTableClassName) ], "desid", this.getAttribute("desid"))
        targets = [ ...targetTable.children ].filter((dom) => { return typeof dom.getAttribute("proid") === "string" });
        titleDom = targetTable.firstChild;
        sumDom = targetTable.lastChild;
  
        if (type === "date") {
          targets.sort((a, b) => {
            const aValue = [ ...a.children ][index].firstChild.textContent;
            const bValue = [ ...b.children ][index].firstChild.textContent;
            return stringToDate(aValue).valueOf() - stringToDate(bValue).valueOf();
          })
        } else if (type === "string") {
          targets.sort((a, b) => {
            const aValue = [ ...a.children ][index].firstChild.textContent;
            const bValue = [ ...b.children ][index].firstChild.textContent;
            return aValue.charCodeAt(0) - bValue.charCodeAt(0);
          })
        }
  
        targets.unshift(titleDom);
        targets.push(sumDom);
  
        number = 0;
        for (let dom of targets) {
          boo = (dom.style.display !== "none");
          if (number === 1 && boo) {
            if (number === targets.filter((obj) => { return obj.style.display !== "none" }).length - 2) {
              for (let child of dom.children) {
                child.style.paddingTop = String(blockVisualPadding) + ea;
                child.style.paddingBottom = String(blockVisualPadding) + ea;
              }
            } else {
              for (let child of dom.children) {
                child.style.paddingTop = String(blockVisualPadding) + ea;
                child.style.paddingBottom = String(0) + ea;
              }
            }
          } else if (number === targets.filter((obj) => { return obj.style.display !== "none" }).length - 2 && boo) {
            for (let child of dom.children) {
              child.style.paddingTop = String(0) + ea;
              child.style.paddingBottom = String(blockVisualPadding) + ea;
            }
          } else {
            for (let child of dom.children) {
              child.style.paddingTop = String(0) + ea;
              child.style.paddingBottom = String(0) + ea;
            }
          }
          targetTable.appendChild(dom);
          if (boo) {
            number++;
          }
        }
        
      } else {

        targetTables = [ ...document.querySelectorAll('.' + clientTableClassName) ];

        for (let targetTable of targetTables) {
          targets = [ ...targetTable.children ].filter((dom) => { return typeof dom.getAttribute("proid") === "string" });
          titleDom = targetTable.firstChild;
          sumDom = targetTable.lastChild;
    
          if (type === "date") {
            targets.sort((a, b) => {
              const aValue = [ ...a.children ][index].firstChild.textContent;
              const bValue = [ ...b.children ][index].firstChild.textContent;
              return stringToDate(aValue).valueOf() - stringToDate(bValue).valueOf();
            })
          } else if (type === "string") {
            targets.sort((a, b) => {
              const aValue = [ ...a.children ][index].firstChild.textContent;
              const bValue = [ ...b.children ][index].firstChild.textContent;
              return aValue.charCodeAt(0) - bValue.charCodeAt(0);
            })
          }
    
          targets.unshift(titleDom);
          targets.push(sumDom);
    
          number = 0;
          for (let dom of targets) {
            boo = (dom.style.display !== "none");
            if (number === 1 && boo) {
              if (number === targets.filter((obj) => { return obj.style.display !== "none" }).length - 2) {
                for (let child of dom.children) {
                  child.style.paddingTop = String(blockVisualPadding) + ea;
                  child.style.paddingBottom = String(blockVisualPadding) + ea;
                }
              } else {
                for (let child of dom.children) {
                  child.style.paddingTop = String(blockVisualPadding) + ea;
                  child.style.paddingBottom = String(0) + ea;
                }
              }
            } else if (number === targets.filter((obj) => { return obj.style.display !== "none" }).length - 2 && boo) {
              for (let child of dom.children) {
                child.style.paddingTop = String(0) + ea;
                child.style.paddingBottom = String(blockVisualPadding) + ea;
              }
            } else {
              for (let child of dom.children) {
                child.style.paddingTop = String(0) + ea;
                child.style.paddingBottom = String(0) + ea;
              }
            }
            targetTable.appendChild(dom);
            if (boo) {
              number++;
            }
          }

        }
      }
    },
    totalFilter: function (e, entireMode = false) {
      const index = Number(this.getAttribute("index"));
      const type = clientColumns[index].type;
      let targetTable;
      let targetTables;
      let targets;
      let titleDom;
      let sumDom;
      let number;

      if (!entireMode) {

        targetTable = findByAttribute([ ...document.querySelectorAll('.' + clientTableClassName) ], "desid", this.getAttribute("desid"))
        targets = [ ...targetTable.children ].filter((dom) => { return typeof dom.getAttribute("proid") === "string" });
        titleDom = targetTable.firstChild;
        sumDom = targetTable.lastChild;
  
        targets = targets.map((dom) => {
          let boo;
          if ([ ...dom.children ][index].firstChild.textContent.trim() === '-') {
            boo = true;
          } else {
            boo = true;
          }
          return { dom, boo }
        });
  
        targets.unshift({ dom: titleDom, boo: true });
        targets.push({ dom: sumDom, boo: true });
  
        number = 0;
        for (let { dom, boo } of targets) {
          if (number === 1 && boo) {
            if (number === targets.filter((obj) => { return obj.boo }).length - 2) {
              for (let child of dom.children) {
                child.style.paddingTop = String(blockVisualPadding) + ea;
                child.style.paddingBottom = String(blockVisualPadding) + ea;
              }
            } else {
              for (let child of dom.children) {
                child.style.paddingTop = String(blockVisualPadding) + ea;
                child.style.paddingBottom = String(0) + ea;
              }
            }
          } else if (number === targets.filter((obj) => { return obj.boo }).length - 2 && boo) {
            for (let child of dom.children) {
              child.style.paddingTop = String(0) + ea;
              child.style.paddingBottom = String(blockVisualPadding) + ea;
            }
          } else {
            for (let child of dom.children) {
              child.style.paddingTop = String(0) + ea;
              child.style.paddingBottom = String(0) + ea;
            }
          }
          if (boo) {
            dom.style.display = "block";
            number++;
          } else {
            dom.style.display = "none";
          }
        }

      } else {


        targetTables = [ ...document.querySelectorAll('.' + clientTableClassName) ];

        for (let targetTable of targetTables) {

          targets = [ ...targetTable.children ].filter((dom) => { return typeof dom.getAttribute("proid") === "string" });
          titleDom = targetTable.firstChild;
          sumDom = targetTable.lastChild;
    
          targets = targets.map((dom) => {
            let boo;
            if ([ ...dom.children ][index].firstChild.textContent.trim() === '-') {
              boo = true;
            } else {
              boo = true;
            }
            return { dom, boo }
          });
    
          targets.unshift({ dom: titleDom, boo: true });
          targets.push({ dom: sumDom, boo: true });
    
          number = 0;
          for (let { dom, boo } of targets) {
            if (number === 1 && boo) {
              if (number === targets.filter((obj) => { return obj.boo }).length - 2) {
                for (let child of dom.children) {
                  child.style.paddingTop = String(blockVisualPadding) + ea;
                  child.style.paddingBottom = String(blockVisualPadding) + ea;
                }
              } else {
                for (let child of dom.children) {
                  child.style.paddingTop = String(blockVisualPadding) + ea;
                  child.style.paddingBottom = String(0) + ea;
                }
              }
            } else if (number === targets.filter((obj) => { return obj.boo }).length - 2 && boo) {
              for (let child of dom.children) {
                child.style.paddingTop = String(0) + ea;
                child.style.paddingBottom = String(blockVisualPadding) + ea;
              }
            } else {
              for (let child of dom.children) {
                child.style.paddingTop = String(0) + ea;
                child.style.paddingBottom = String(0) + ea;
              }
            }
            if (boo) {
              dom.style.display = "block";
              number++;
            } else {
              dom.style.display = "none";
            }
          }

        }

      }

    },
    existFilter: function (e, entireMode = false) {
      const index = Number(this.getAttribute("index"));
      const type = clientColumns[index].type;
      let targetTable;
      let targetTables;
      let targets;
      let titleDom;
      let sumDom;
      let number;

      if (!entireMode) {

        targetTable = findByAttribute([ ...document.querySelectorAll('.' + clientTableClassName) ], "desid", this.getAttribute("desid"))
        targets = [ ...targetTable.children ].filter((dom) => { return typeof dom.getAttribute("proid") === "string" });
        titleDom = targetTable.firstChild;
        sumDom = targetTable.lastChild;
  
        targets = targets.map((dom) => {
          let boo;
          if ([ ...dom.children ][index].firstChild.textContent.trim() === '-') {
            boo = false;
          } else {
            boo = true;
          }
          return { dom, boo }
        });
  
        targets.unshift({ dom: titleDom, boo: true });
        targets.push({ dom: sumDom, boo: true });
  
        number = 0;
        for (let { dom, boo } of targets) {
          if (number === 1 && boo) {
            if (number === targets.filter((obj) => { return obj.boo }).length - 2) {
              for (let child of dom.children) {
                child.style.paddingTop = String(blockVisualPadding) + ea;
                child.style.paddingBottom = String(blockVisualPadding) + ea;
              }
            } else {
              for (let child of dom.children) {
                child.style.paddingTop = String(blockVisualPadding) + ea;
                child.style.paddingBottom = String(0) + ea;
              }
            }
          } else if (number === targets.filter((obj) => { return obj.boo }).length - 2 && boo) {
            for (let child of dom.children) {
              child.style.paddingTop = String(0) + ea;
              child.style.paddingBottom = String(blockVisualPadding) + ea;
            }
          } else {
            for (let child of dom.children) {
              child.style.paddingTop = String(0) + ea;
              child.style.paddingBottom = String(0) + ea;
            }
          }
          if (boo) {
            dom.style.display = "block";
            number++;
          } else {
            dom.style.display = "none";
          }
        }

      } else {


        targetTables = [ ...document.querySelectorAll('.' + clientTableClassName) ];

        for (let targetTable of targetTables) {

          targets = [ ...targetTable.children ].filter((dom) => { return typeof dom.getAttribute("proid") === "string" });
          titleDom = targetTable.firstChild;
          sumDom = targetTable.lastChild;
    
          targets = targets.map((dom) => {
            let boo;
            if ([ ...dom.children ][index].firstChild.textContent.trim() === '-') {
              boo = false;
            } else {
              boo = true;
            }
            return { dom, boo }
          });
    
          targets.unshift({ dom: titleDom, boo: true });
          targets.push({ dom: sumDom, boo: true });
    
          number = 0;
          for (let { dom, boo } of targets) {
            if (number === 1 && boo) {
              if (number === targets.filter((obj) => { return obj.boo }).length - 2) {
                for (let child of dom.children) {
                  child.style.paddingTop = String(blockVisualPadding) + ea;
                  child.style.paddingBottom = String(blockVisualPadding) + ea;
                }
              } else {
                for (let child of dom.children) {
                  child.style.paddingTop = String(blockVisualPadding) + ea;
                  child.style.paddingBottom = String(0) + ea;
                }
              }
            } else if (number === targets.filter((obj) => { return obj.boo }).length - 2 && boo) {
              for (let child of dom.children) {
                child.style.paddingTop = String(0) + ea;
                child.style.paddingBottom = String(blockVisualPadding) + ea;
              }
            } else {
              for (let child of dom.children) {
                child.style.paddingTop = String(0) + ea;
                child.style.paddingBottom = String(0) + ea;
              }
            }
            if (boo) {
              dom.style.display = "block";
              number++;
            } else {
              dom.style.display = "none";
            }
          }

        }

      }

    },
    nonExistFilter: matchingFilterMaker('-'),
    clientReady: matchingFilterMaker("대기"),
    clientGoing: matchingFilterMaker("진행중"),
    constructDesigner: matchingFilterMaker("디자이너"),
    constructHomeliaison: matchingFilterMaker("홈리에종"),
    constructClient: matchingFilterMaker("고객"),
  }

  designerDomEvent = function (e) {
    e.preventDefault();
    const desid = this.getAttribute("desid");
    const zIndex = 4;
    let cancelBack, menuPrompt;
    let thisMenu;

    thisMenu = [
      {
        title: "디자이너 콘솔 보내기",
        event: async function (e) {
          try {
            const host = FRONTHOST.replace(/^https\:\/\//gi, '');
            const desid = this.getAttribute("desid");
            const designer = instance.designers.find((obj) => { return obj.desid === desid });
            if (window.confirm(designer.designer + " 실장님께 디자이너 콘솔 접근 알림톡을 보낼까요?")) {
              await ajaxJson({
                method: "designerConsole",
                name: designer.designer,
                phone: designer.information.phone,
                option: {
                  designer: designer.designer,
                  host: host,
                  path: "dashboard",
                  desid: designer.desid,
                }
              }, BACKHOST + "/alimTalk");
              window.alert(designer.designer + " 실장님께 디자이너 콘솔 접근 알림톡을 보냈습니다!");
            }
          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "상태 체크 요청",
        event: async function (e) {
          try {
            const host = FRONTHOST.replace(/^https\:\/\//gi, '');
            const desid = this.getAttribute("desid");
            const designer = instance.designers.find((obj) => { return obj.desid === desid });
            if (window.confirm(designer.designer + " 실장님께 프로젝트 상태 체크 요청 알림톡을 보낼까요?")) {
              await ajaxJson({
                method: "progressDesignerTotal",
                name: designer.designer,
                phone: designer.information.phone,
                option: {
                  designer: designer.designer,
                  host: host,
                  desid: designer.desid,
                }
              }, BACKHOST + "/alimTalk");
              window.alert(designer.designer + " 실장님께 프로젝트 상태 체크 요청 알림톡을 보냈습니다!");
            }
          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "디자이너 콘솔 확인",
        event: async function (e) {
          try {
            const desid = this.getAttribute("desid");
            blankHref(FRONTHOST + "/designer/dashboard.php?desid=" + desid);
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]

    cancelBack = createNode({
      mother: totalContents,
      class: [ filterMenuClassName ],
      event: {
        click: function (e) {
          removeByClass(filterMenuClassName);
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
      class: [ filterMenuClassName ],
      attribute: {
        desid,
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
            index: String(index)
          },
          event: {
            click: function (e) {
              const index = Number(this.getAttribute("index"));
              const thisFunction = thisMenu[index].event;
              thisFunction.call(this.parentElement, e);
              removeByClass(filterMenuClassName);
            },
            contextmenu: function (e) {
              e.preventDefault();
              const index = Number(this.getAttribute("index"));
              const thisFunction = thisMenu[index].event;
              thisFunction.call(this.parentElement, e);
              removeByClass(filterMenuClassName);
            },
          },
          style: {
            display: "flex",
            width: String(designerButtonWidth) + ea,
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
    })

  }

  managerFilterEvent = function (e) {
    e.preventDefault();
    const zIndex = 4;
    let cancelBack, menuPrompt;
    let thisMenu;
    let managersDom;

    managersDom = [ ...new Set(instance.bigDoms.map((dom) => {
      return dom.children[1].textContent;
    })) ];

    thisMenu = managersDom.map((str) => {
      return {
        title: str,
        event: function (e) {
          const targetName = str;
          for (let dom of instance.bigDoms) {
            if (dom.children[1].textContent === targetName) {
              dom.parentElement.parentElement.style.display = "block";
            } else {
              dom.parentElement.parentElement.style.display = "none";
            }
          }
        }
      };
    })

    thisMenu.push({
      title: "전체 보기",
      event: function (e) {
        for (let dom of instance.bigDoms) {
          dom.parentElement.parentElement.style.display = "block";
        }
      }
    })

    cancelBack = createNode({
      mother: totalContents,
      class: [ filterMenuClassName ],
      event: {
        click: function (e) {
          removeByClass(filterMenuClassName);
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
      class: [ filterMenuClassName ],
      attribute: {
        desid,
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
            index: String(index)
          },
          event: {
            click: function (e) {
              const index = Number(this.getAttribute("index"));
              const thisFunction = thisMenu[index].event;
              thisFunction.call(this.parentElement, e);
              removeByClass(filterMenuClassName);
            },
            contextmenu: function (e) {
              e.preventDefault();
              const index = Number(this.getAttribute("index"));
              const thisFunction = thisMenu[index].event;
              thisFunction.call(this.parentElement, e);
              removeByClass(filterMenuClassName);
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
    })

  }

  designerFilterEvent = function (e) {
    e.preventDefault();
    const zIndex = 4;
    let cancelBack, menuPrompt;
    let thisMenu;
    let managersDom;

    managersDom = [ ...new Set(instance.bigDoms.map((dom) => {
      return dom.children[2].textContent;
    })) ];

    thisMenu = managersDom.map((str) => {
      return {
        title: str,
        event: function (e) {
          const targetName = str;
          for (let dom of instance.bigDoms) {
            if (dom.children[2].textContent === targetName) {
              dom.parentElement.parentElement.style.display = "block";
            } else {
              dom.parentElement.parentElement.style.display = "none";
            }
          }
        }
      };
    })

    thisMenu.push({
      title: "전체 보기",
      event: function (e) {
        for (let dom of instance.bigDoms) {
          dom.parentElement.parentElement.style.display = "block";
        }
      }
    })

    cancelBack = createNode({
      mother: totalContents,
      class: [ filterMenuClassName ],
      event: {
        click: function (e) {
          removeByClass(filterMenuClassName);
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
      class: [ filterMenuClassName ],
      attribute: {
        desid,
      },
      style: {
        display: "block",
        position: "absolute",
        top: String(e.y) + "px",
        left: String(e.x) + "px",
        padding: String(buttonOuterPadding) + ea,
        paddingBottom: String(buttonOuterPadding - buttonInnerPadding) + ea,
        paddingRight: String(buttonOuterPadding - buttonInnerPadding) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.white,
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        animation: "fadeuplite 0.3s ease forwards",
        zIndex: String(zIndex),
        width: String((designerFilterButtonSize * 4) + (buttonInnerPadding * 4)) + ea,
      },
      children: thisMenu.map((obj, index) => {
        return {
          attribute: {
            index: String(index)
          },
          event: {
            click: function (e) {
              const index = Number(this.getAttribute("index"));
              const thisFunction = thisMenu[index].event;
              thisFunction.call(this.parentElement, e);
              removeByClass(filterMenuClassName);
            },
            contextmenu: function (e) {
              e.preventDefault();
              const index = Number(this.getAttribute("index"));
              const thisFunction = thisMenu[index].event;
              thisFunction.call(this.parentElement, e);
              removeByClass(filterMenuClassName);
            },
          },
          style: {
            display: "inline-flex",
            width: String(designerFilterButtonSize) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGray,
            marginRight: String(buttonInnerPadding) + ea,
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
    })

  }

  numbersSortEvent = function (e) {
    e.preventDefault();
    const box = this.children[2].getBoundingClientRect();
    const { x: standardX } = box;
    const x = Number(e.x);
    const sortTargets = [ ...grayTong.children ].slice(1);
    const targetAttribute = (standardX >= x ? "standby" : "process");
    if (Number(sortTargets[0].getAttribute(targetAttribute)) >= Number(sortTargets[sortTargets.length - 1].getAttribute(targetAttribute))) {
      sortTargets.sort((a, b) => {
        return Number(a.getAttribute(targetAttribute)) - Number(b.getAttribute(targetAttribute));
      })
    } else {
      sortTargets.sort((a, b) => {
        return Number(b.getAttribute(targetAttribute)) - Number(a.getAttribute(targetAttribute));
      })
    }
    for (let dom of sortTargets) {
      grayTong.appendChild(dom);
    }
  }

  projectStatusUpdateEvent = () => {
    return async function (e) {
      try {
        e.preventDefault();
        e.stopPropagation();
        const zIndex = 4;
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        let cancelBack, menuPrompt;
        let thisMenu;
        thisMenu = [
          {
            title: "완료 처리",
            event: function (e) {
              if (window.confirm("해당 프로젝트를 완료처리 하시겠습니까?")) {
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                const loading = instance.mother.grayLoading();
                let whiteBoo;
                let whiteTargetDom;

                ajaxJson({
                  whereQuery: { proid },
                  updateQuery: { "process.status": "완료" }
                }, BACKHOST + "/rawUpdateProject").then(() => {
                  instance.projects.find((p) => { return p.proid === proid }).process.status = "완료";
                  whiteBoo = false;
                  if (document.querySelector("." + whiteCardClassName) !== null) {
                    removeByClass(whiteCardClassName);
                    whiteBoo = true;
                  }
                  instance.contentsLoad(false);
                  if (whiteBoo) {
                    whiteTargetDom = findByAttribute([ ...instance.clientDoms ], "proid", proid)
                    if (whiteTargetDom !== null) {
                      whiteTargetDom.click();
                    }
                  }
                  loading.remove();
                }).catch((err) => {
                  console.log(err);
                });
              }
            }
          }
        ];
        cancelBack = createNode({
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
        menuPrompt = createNode({
          mother: totalContents,
          class: [ updateMenuClassName ],
          attribute: {
            desid,
            proid,
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
                index: String(index)
              },
              event: {
                click: function (e) {
                  const index = Number(this.getAttribute("index"));
                  const thisFunction = thisMenu[index].event;
                  thisFunction.call(this.parentElement, e);
                  removeByClass(updateMenuClassName);
                },
                contextmenu: function (e) {
                  e.preventDefault();
                  const index = Number(this.getAttribute("index"));
                  const thisFunction = thisMenu[index].event;
                  thisFunction.call(this.parentElement, e);
                  removeByClass(updateMenuClassName);
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
      } catch (e) {
        console.log(e);
      }
    }
  }
  this.projectStatusUpdateEvent = projectStatusUpdateEvent;

  projectPartnerUpdateEvent = () => {
    return async function (e) {
      try {
        e.preventDefault();
        e.stopPropagation();
        const zIndex = 4;
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        let cancelBack, menuPrompt;
        let thisMenu;
        thisMenu = [
          {
            title: "홈리에종",
            event: function (e) {
              const proid = this.getAttribute("proid");
              const desid = this.getAttribute("desid");
              let whiteBoo;
              let whiteTargetDom;

              ajaxJson({ noFlat: true, whereQuery: { proid } }, BACKHOST + "/getProjects").then(([ thisProject ]) => {
                if (thisProject.process.design.construct === null) {
                  window.alert("해당 프로젝트는 시공화가 안 되어 있어 업데이트를 진행할 수 없습니다!");
                  throw new Error("return error");
                } else {
                  return ajaxJson({
                    whereQuery: { proid },
                    updateQuery: { "process.design.construct.contract.partner": "홈리에종" }
                  }, BACKHOST + "/rawUpdateProject");
                }
              }).then(() => {
                instance.projects.find((p) => { return p.proid === proid }).process.design.construct.contract.partner = "홈리에종";
                whiteBoo = false;
                if (document.querySelector("." + whiteCardClassName) !== null) {
                  removeByClass(whiteCardClassName);
                  whiteBoo = true;
                }
                instance.contentsLoad(false);
                if (whiteBoo) {
                  whiteTargetDom = findByAttribute([ ...instance.clientDoms ], "proid", proid)
                  if (whiteTargetDom !== null) {
                    whiteTargetDom.click();
                  }
                }

              }).catch((err) => {
                console.log(err);
              })
            }
          },
          {
            title: "디자이너",
            event: function (e) {
              const proid = this.getAttribute("proid");
              const desid = this.getAttribute("desid");
              let whiteBoo;
              let whiteTargetDom;

              ajaxJson({ noFlat: true, whereQuery: { proid } }, BACKHOST + "/getProjects").then(([ thisProject ]) => {
                if (thisProject.process.design.construct === null) {
                  window.alert("해당 프로젝트는 시공화가 안 되어 있어 업데이트를 진행할 수 없습니다!");
                  throw new Error("return error");
                } else {
                  return ajaxJson({
                    whereQuery: { proid },
                    updateQuery: { "process.design.construct.contract.partner": "디자이너" }
                  }, BACKHOST + "/rawUpdateProject");
                }
              }).then(() => {
                instance.projects.find((p) => { return p.proid === proid }).process.design.construct.contract.partner = "디자이너";
                whiteBoo = false;
                if (document.querySelector("." + whiteCardClassName) !== null) {
                  removeByClass(whiteCardClassName);
                  whiteBoo = true;
                }
                instance.contentsLoad(false);
                if (whiteBoo) {
                  whiteTargetDom = findByAttribute([ ...instance.clientDoms ], "proid", proid)
                  if (whiteTargetDom !== null) {
                    whiteTargetDom.click();
                  }
                }
              }).catch((err) => {
                console.log(err);
              })
            }
          },
          {
            title: "고객",
            event: function (e) {
              const proid = this.getAttribute("proid");
              const desid = this.getAttribute("desid");
              let whiteBoo;
              let whiteTargetDom;

              ajaxJson({ noFlat: true, whereQuery: { proid } }, BACKHOST + "/getProjects").then(([ thisProject ]) => {
                if (thisProject.process.design.construct === null) {
                  window.alert("해당 프로젝트는 시공화가 안 되어 있어 업데이트를 진행할 수 없습니다!");
                  throw new Error("return error");
                } else {
                  return ajaxJson({
                    whereQuery: { proid },
                    updateQuery: { "process.design.construct.contract.partner": "고객" }
                  }, BACKHOST + "/rawUpdateProject");
                }
              }).then(() => {
                instance.projects.find((p) => { return p.proid === proid }).process.design.construct.contract.partner = "고객";
                whiteBoo = false;
                if (document.querySelector("." + whiteCardClassName) !== null) {
                  removeByClass(whiteCardClassName);
                  whiteBoo = true;
                }
                instance.contentsLoad(false);
                if (whiteBoo) {
                  whiteTargetDom = findByAttribute([ ...instance.clientDoms ], "proid", proid)
                  if (whiteTargetDom !== null) {
                    whiteTargetDom.click();
                  }
                }
              }).catch((err) => {
                console.log(err);
              })
            }
          },
        ];
        cancelBack = createNode({
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
        menuPrompt = createNode({
          mother: totalContents,
          class: [ updateMenuClassName ],
          attribute: {
            desid,
            proid,
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
                index: String(index)
              },
              event: {
                click: function (e) {
                  const index = Number(this.getAttribute("index"));
                  const thisFunction = thisMenu[index].event;
                  thisFunction.call(this.parentElement, e);
                  removeByClass(updateMenuClassName);
                },
                contextmenu: function (e) {
                  e.preventDefault();
                  const index = Number(this.getAttribute("index"));
                  const thisFunction = thisMenu[index].event;
                  thisFunction.call(this.parentElement, e);
                  removeByClass(updateMenuClassName);
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
      } catch (e) {
        console.log(e);
      }
    }
  }
  this.projectPartnerUpdateEvent = projectPartnerUpdateEvent;

  projectMeetingUpdateEvent = () => {
    return async function (e) {
      try {
        e.preventDefault();
        e.stopPropagation();
        const zIndex = 4;
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        let cancelBack, menuPrompt;
        let calendar;

        cancelBack = createNode({
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
        menuPrompt = createNode({
          mother: totalContents,
          class: [ updateMenuClassName ],
          attribute: {
            desid,
            proid,
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
            let whiteBoo;
            let whiteTargetDom;

            await ajaxJson({
              whereQuery: { proid },
              updateQuery: { "process.contract.meeting.date": updateValue },
            }, BACKHOST + "/rawUpdateProject");
            removeByClass(updateMenuClassName);
            instance.projects.find((p) => { return p.proid === proid }).process.contract.meeting.date = updateValue;
            whiteBoo = false;
            if (document.querySelector("." + whiteCardClassName) !== null) {
              removeByClass(whiteCardClassName);
              whiteBoo = true;
            }
            instance.contentsLoad(false);
            if (whiteBoo) {
              whiteTargetDom = findByAttribute([ ...instance.clientDoms ], "proid", proid)
              if (whiteTargetDom !== null) {
                whiteTargetDom.click();
              }
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
  this.projectMeetingUpdateEvent = projectMeetingUpdateEvent;

  projectStartDateUpdateEvent = () => {
    return async function (e) {
      try {
        e.preventDefault();
        e.stopPropagation();
        const zIndex = 4;
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        let cancelBack, menuPrompt;
        let calendar;

        cancelBack = createNode({
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
        menuPrompt = createNode({
          mother: totalContents,
          class: [ updateMenuClassName ],
          attribute: {
            desid,
            proid,
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
            const [ thisProject ] = await ajaxJson({ noFlat: true, whereQuery: { proid } }, BACKHOST + "/getProjects", { equal: true });
            const during = serviceParsing(thisProject.service, true);
            let startDate, endDate;
            let whereQuery, updateQuery;
            let whiteBoo;
            let whiteTargetDom;

            startDate = new Date(JSON.stringify(updateValue).slice(1, -1));
            endDate = new Date(JSON.stringify(updateValue).slice(1, -1));
            endDate.setDate(endDate.getDate() + during);

            whereQuery = { proid };
            updateQuery = {};
            updateQuery["process.contract.form.date.from"] = startDate;
            updateQuery["process.contract.form.date.to"] = endDate;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateProject");
            removeByClass(updateMenuClassName);
            instance.projects.find((p) => { return p.proid === proid }).process.contract.form.date.from = startDate;
            instance.projects.find((p) => { return p.proid === proid }).process.contract.form.date.to = endDate;
            whiteBoo = false;
            if (document.querySelector("." + whiteCardClassName) !== null) {
              removeByClass(whiteCardClassName);
              whiteBoo = true;
            }
            instance.contentsLoad(false);
            if (whiteBoo) {
              whiteTargetDom = findByAttribute([ ...instance.clientDoms ], "proid", proid)
              if (whiteTargetDom !== null) {
                whiteTargetDom.click();
              }
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
  this.projectStartDateUpdateEvent = projectStartDateUpdateEvent;

  projectEndDateUpdateEvent = () => {
    return async function (e) {
      try {
        e.preventDefault();
        e.stopPropagation();
        const zIndex = 4;
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        let cancelBack, menuPrompt;
        let calendar;

        cancelBack = createNode({
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
        menuPrompt = createNode({
          mother: totalContents,
          class: [ updateMenuClassName ],
          attribute: {
            desid,
            proid,
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
            const [ thisProject ] = await ajaxJson({ noFlat: true, whereQuery: { proid } }, BACKHOST + "/getProjects", { equal: true });
            const during = serviceParsing(thisProject.service, true);
            let startDate, endDate;
            let whereQuery, updateQuery;
            let whiteBoo;
            let whiteTargetDom;

            startDate = new Date(JSON.stringify(updateValue).slice(1, -1));
            endDate = new Date(JSON.stringify(updateValue).slice(1, -1));
            startDate.setDate(startDate.getDate() - during);

            whereQuery = { proid };
            updateQuery = {};
            updateQuery["process.contract.form.date.from"] = startDate;
            updateQuery["process.contract.form.date.to"] = endDate;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateProject");
            removeByClass(updateMenuClassName);
            instance.projects.find((p) => { return p.proid === proid }).process.contract.form.date.from = startDate;
            instance.projects.find((p) => { return p.proid === proid }).process.contract.form.date.to = endDate;
            whiteBoo = false;
            if (document.querySelector("." + whiteCardClassName) !== null) {
              removeByClass(whiteCardClassName);
              whiteBoo = true;
            }
            instance.contentsLoad(false);
            if (whiteBoo) {
              whiteTargetDom = findByAttribute([ ...instance.clientDoms ], "proid", proid)
              if (whiteTargetDom !== null) {
                whiteTargetDom.click();
              }
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
  this.projectEndDateUpdateEvent = projectEndDateUpdateEvent;

  grayBack = createNode({
    mother: totalContents,
    style: {
      display: (entireMode && typeof getObj.proid === "string") ? "none" : "block",
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
      text: "디자이너",
      event: {
        click: managerFilterEvent,
      },
      style: {
        width: String(nameWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(firstMargin) + ea,
        cursor: "pointer",
      }
    });

    createNode({
      mother: targetTong,
      text: "아이디",
      event: {
        click: designerFilterEvent,
      },
      style: {
        width: String(designerWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
        cursor: "pointer",
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
    if (Array.isArray(searchMode)) {
      designers = searchMode.map((obj) => { return obj.desid + splitToken + obj.designer });
      searchByProjects = false;
    } else if (typeof searchMode === "object" && searchMode !== null) {
      designers = instance.designers.filter((d) => { return searchMode.projects.map((p) => { return p.desid }).includes(d.desid); }).map((obj) => { return obj.desid + splitToken + obj.designer });
      searchByProjects = true;
    } else if (typeof searchMode === "boolean" || searchMode === undefined || searchMode === null) {
      designers = instance.designers.map((obj) => { return obj.desid + splitToken + obj.designer });
      searchByProjects = false;
    }
    for (let complex of designers) {
      [ desid, designer ] = complex.split(splitToken);
      if (!searchByProjects) {
        thisProjects2 = instance.projects.filter((obj) => { return obj.designer.designer === designer && obj.designer.desid === desid });
        if (instance.projects.length !== 1) {
          thisProjects2 = thisProjects2.filter((obj) => { return !/^[드완]/.test(obj.process.status) });
        }
      } else {
        searchProjects = searchMode.projects;
        thisProjects2 = searchProjects.filter((obj) => { return obj.designer.designer === designer && obj.designer.desid === desid });
        if (searchProjects.length !== 1) {
          thisProjects2 = thisProjects2.filter((obj) => { return !/^[드완]/.test(obj.process.status) });
        }
      }
      newProjectsTong.push({ designer, desid, projects: thisProjects2 });
    }

    notEmptyProjectsDesigners = newProjectsTong.filter((obj) => { return obj.projects.length !== 0 });
    emptyProjectsDesigners = newProjectsTong.filter((obj) => { return obj.projects.length === 0 });
    newProjectsTong = notEmptyProjectsDesigners;
    for (let obj of emptyProjectsDesigners) {
      newProjectsTong.push(obj);
    }

    instance.bigDoms = [];
    instance.clientDoms = [];
    instance.totalValues = [];
    for (let { designer, desid, projects } of newProjectsTong) {

      if (projects.length === 0) {
        continue;
      }

      motherBlock = createNode({
        mother: grayTong,
        attribute: {
          desid,
          standby: String(projects.length - projects.filter((obj) => { return obj.process.contract.remain.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() }).filter((obj) => { return obj.process.contract.form.date.from.valueOf() <= (new Date()).valueOf() }).length),
          process: String(projects.filter((obj) => { return obj.process.contract.remain.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() }).filter((obj) => { return obj.process.contract.form.date.from.valueOf() <= (new Date()).valueOf() }).length),
        },
        style: {
          display: "block",
          position: "relative",
          "min-height": String(blockHeight * 3) + ea,
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
          "min-height": String(blockHeight * 3) + ea,
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

      subArea = createNode({
        mother: targetTong,
        style: {
          display: "inline-flex",
          flexDirection: "column",
          position: "absolute",
          left: String(subAreaLeft) + ea,
          top: String(subAreaTop) + ea,
          alignItems: "start",
          zIndex: String(1),
        }
      });
      // numbers
      createNode({
        mother: subArea,
        attribute: {
          desid,
          standby: String(projects.length - projects.filter((obj) => { return obj.process.contract.remain.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() }).filter((obj) => { return obj.process.contract.form.date.from.valueOf() <= (new Date()).valueOf() }).length),
          process: String(projects.filter((obj) => { return obj.process.contract.remain.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() }).filter((obj) => { return obj.process.contract.form.date.from.valueOf() <= (new Date()).valueOf() }).length),
        },
        event: {
          click: numbersSortEvent,
          contextmenu: numbersSortEvent,
        },
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
            text: "대기&nbsp;&nbsp;",
            style: {
              fontSize: String(textSize) + ea,
              fontWeight: String(tableMiddleWeight),
              color: colorChip.black,
            }
          },
          {
            text: String(projects.length - projects.filter((obj) => { return obj.process.contract.remain.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() }).filter((obj) => { return obj.process.contract.form.date.from.valueOf() <= (new Date()).valueOf() }).length) + "&nbsp;&nbsp;",
            style: {
              fontSize: String(textSize) + ea,
              fontWeight: String(tableMiddleWeight),
              color: colorChip.red,
            }
          },
          {
            text: "/",
            style: {
              fontSize: String(textSize) + ea,
              fontWeight: String(tableWeight),
              color: colorChip.gray4,
            }
          },
          {
            text: "&nbsp;&nbsp;진행중&nbsp;&nbsp;",
            style: {
              fontSize: String(textSize) + ea,
              fontWeight: String(tableMiddleWeight),
              color: colorChip.black,
            }
          },
          {
            text: String(projects.filter((obj) => { return obj.process.contract.remain.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() }).filter((obj) => { return obj.process.contract.form.date.from.valueOf() <= (new Date()).valueOf() }).length),
            style: {
              fontSize: String(textSize) + ea,
              fontWeight: String(tableMiddleWeight),
              color: colorChip.green,
            }
          },
        ]
      });
      // checklist
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
            text: "체크리스트 진행&nbsp;&nbsp;",
            style: {
              fontSize: String(textSize) + ea,
              fontWeight: String(tableMiddleWeight),
              color: colorChip.black,
            }
          },
          {
            text: "안 함",
            style: {
              fontSize: String(textSize) + ea,
              fontWeight: String(tableMiddleWeight),
              color: colorChip.red,
            }
          },
        ]
      });
      // profile
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
            text: "프로필 사진 업로드&nbsp;&nbsp;",
            style: {
              fontSize: String(textSize) + ea,
              fontWeight: String(tableMiddleWeight),
              color: colorChip.black,
            }
          },
          {
            text: "안 함",
            style: {
              fontSize: String(textSize) + ea,
              fontWeight: String(tableMiddleWeight),
              color: colorChip.red,
            }
          },
        ]
      });
      // works
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
            text: "작업물 업로드&nbsp;&nbsp;",
            style: {
              fontSize: String(textSize) + ea,
              fontWeight: String(tableMiddleWeight),
              color: colorChip.black,
            }
          },
          {
            text: "안 함",
            style: {
              fontSize: String(textSize) + ea,
              fontWeight: String(tableMiddleWeight),
              color: colorChip.red,
            }
          },
        ]
      });

      nameDom = createNode({
        mother: targetTong,
        attribute: { desid },
        event: {
          click: designerDomEvent,
          contextmenu: designerDomEvent,
        },
        style: {
          width: String(nameWidth) + ea,
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          marginLeft: String(firstMargin) + ea,
          cursor: "pointer",
        },
        child: {
          text: designer,
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

      designerDom = createNode({
        mother: targetTong,
        attribute: { desid },
        event: {
          click: designerDomEvent,
          contextmenu: designerDomEvent,
        },
        style: {
          width: String(designerWidth) + ea,
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          marginLeft: String(minimumBetween) + ea,
          cursor: "pointer",
        },
        children: [
          {
            text: desid,
            style: {
              display: "inline-block",
              position: "relative",
              verticalAlign: "top",
              fontSize: String(textSize) + ea,
              fontWeight: String(700),
              color: colorChip.black,
              top: String(textTop) + ea,
            },
            bold: {
              fontSize: String(textSize) + ea,
              fontWeight: String(300),
              color: colorChip.deactive,
            },
          },
        ]
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
          attribute: {
            index: String(i),
          },
          event: {
            click: clientColumnsBaseEvent(desid),
            contextmenu: clientColumnsBaseEvent(desid),
          },
          style: {
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            background: colorChip.gray1,
            height: withOut(0, ea),
            width: i === clientColumns.length - 1 ? String(tableBlockFactorWidth) + ea : String(tableBlockFactorWidth - 1) + ea,
            borderRight: i === clientColumns.length - 1 ?  "" : "1px solid " + colorChip.gray3,
            cursor: "pointer",
          },
          children: [
            {
              text: clientColumns[i].title,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(tableSize) + ea,
                fontWeight: String(tableBoldWeight),
                color: colorChip.black,
                top: String(tableTextTop) + ea,
                cursor: "pointer",
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
      sendStatusNumber = 0;
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
            value: sendFile,
            color: sendFile === '-' ? colorChip.red : colorChip.black,
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
          event: {
            click: instance.whiteCardView(thisProject.proid, equalJson(JSON.stringify(clientColumns)).slice(1), equalJson(JSON.stringify(clientValueArr)).slice(1)),
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
              index: String(i)
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

          // name - index : 0
          if (clientValueArr[i].check) {
            clientDom.setAttribute("toggle", "off");
            checkBoxLocalStorageObj = window.localStorage.getItem(checkBoxLocalStorageName);
            if (checkBoxLocalStorageObj === null) {
              checkBoxLocalStorageObj = [];
              window.localStorage.setItem(checkBoxLocalStorageName, JSON.stringify([]));
            } else {
              checkBoxLocalStorageObj = JSON.parse(checkBoxLocalStorageObj);
            }
            if (checkBoxLocalStorageObj.includes(clientDom.getAttribute("proid"))) {
              clientDom.setAttribute("toggle", "on");
              clientDom.children[1].style.background = colorChip.white;
              clientDom.children[1].firstChild.style.display = "block";
            }
            clientDom.addEventListener("contextmenu", function (e) {
              e.preventDefault();
              e.stopPropagation();

              const toggle = this.getAttribute("toggle");
              const proid = this.getAttribute("proid");
              let thisCheckBoxLocalStorageObj;

              thisCheckBoxLocalStorageObj = window.localStorage.getItem(checkBoxLocalStorageName);
              if (thisCheckBoxLocalStorageObj === null) {
                thisCheckBoxLocalStorageObj = [];
                window.localStorage.setItem(checkBoxLocalStorageName, JSON.stringify([]));
              } else {
                thisCheckBoxLocalStorageObj = JSON.parse(thisCheckBoxLocalStorageObj);
              }

              if (toggle === "off") {
                this.children[1].style.background = colorChip.white;
                this.children[1].firstChild.style.display = "block";
                this.setAttribute("toggle", "on");
                thisCheckBoxLocalStorageObj.push(proid);
              } else {
                this.children[1].style.background = colorChip.gray2;
                this.children[1].firstChild.style.display = "none";
                this.setAttribute("toggle", "off");
                thisCheckBoxLocalStorageObj = thisCheckBoxLocalStorageObj.filter((str) => { return str !== proid });
              }

              window.localStorage.setItem(checkBoxLocalStorageName, JSON.stringify(thisCheckBoxLocalStorageObj));

            });

          // status - index: 1
          } else if (i === 1) {
            clientDom.addEventListener("contextmenu", projectStatusUpdateEvent());
          // partner - index: 2
          } else if (i === 2) {
            clientDom.addEventListener("contextmenu", projectPartnerUpdateEvent());
          // first meeting - index: 5
          } else if (i === 5) {
            clientDom.addEventListener("contextmenu", projectMeetingUpdateEvent());
          } else if (i === 7) {
            clientDom.addEventListener("contextmenu", projectStartDateUpdateEvent());
          } else if (i === 8) {
            clientDom.addEventListener("contextmenu", projectEndDateUpdateEvent());
          } else {
            clientDom.addEventListener("contextmenu", async function (e) {
              try {
                e.preventDefault();
                e.stopPropagation();
                // pass
              } catch (e) {
                console.log(e);
              }
            });
          }
        }
        instance.clientDoms.push(clientBlack);
        if (!media[0]) {
          instance.totalValues.push([ '-', designer ].concat(clientValueArr.map((obj) => { return obj.value })))
        } else {
          instance.totalValues.push([ '-', designer + "&nbsp;&nbsp;<u%" + desid + "%u>" ].concat(clientValueArr.map((obj) => { return obj.value })))
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
          value: (sendStatusNumber === 0 ? String(sendStatusNumber) : "<b%" + String(sendStatusNumber) + "%b>") + " <u%/%u> " + String(projects.length),
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
      ];

      clientBlack = createNode({
        mother: clientTable,
        style: {
          display: "none",
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

  contentsLoad(false);

  this.contentsLoad = contentsLoad;
}

ProcessJs.prototype.whiteCardView = function (proid, columnArr, valueArr) {
  const instance = this;
  const { totalContents, ea, belowHeight, projects, onofflineWordsClassName, entireMode } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, selfHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, removeByClass, setQueue, serviceParsing, equalJson, sleep, setCookie } = GeneralJs;
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
      let whiteInnerMarginTop;
      let latestCallBlock;

      while (instance.contents === null) {
        await sleep(100);
      }

      whiteOuterMargin = <%% 40, 20, 20, 20, 10 %%>;
      whiteInnerMargin = 50;
      whiteInnerMarginTop = 35;
      if (entireMode) {
        whiteOuterMargin = 0;
      }

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

      callHistory = equalJson(JSON.stringify(project.clientHistory.curation.analytics.call.out.concat(project.clientHistory.curation.analytics.call.in)));
      callHistory.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

      latestCall = '-';
      if (callHistory.length > 0) {
        latestCall = dateToString(callHistory[0].date);
      }

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
          height: withOut((whiteOuterMargin * 2) + belowHeight + (whiteInnerMargin + whiteInnerMarginTop), ea),
          padding: String(whiteInnerMargin) + ea,
          paddingTop: String(whiteInnerMarginTop) + ea,
          background: colorChip.white,
          borderRadius: String(5) + "px",
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          animation: !entireMode ? "fadeuplite 0.3s ease forwards" : "",
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
        attribute: { proid: project.proid, name: project.name },
        text: project.name,
        event: {
          click: async function (e) {
            try {
              const proid = this.getAttribute("proid");
              const name = this.getAttribute("name");
              if (window.confirm(name + " 고객님께 전화를 걸까요?")) {
                const response = await ajaxJson({
                  who: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
                  proid: proid
                }, BACKHOST + "/callTo");
                if (response.message === "error") {
                  window.localStorage.clear();
                  let obj = {};
                  obj["homeliaisonConsoleLoginedName"] = '';
                  obj["homeliaisonConsoleLoginedEmail"] = '';
                  obj["homeliaisonConsoleLoginedBoolean"] = '';
                  setCookie(obj, true);
                  window.location.reload();
                }
              }
            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "inline-flex",
          position: "relative",
          fontSize: String(nameSize) + ea,
          fontWeight: String(nameWeight),
          color: colorChip.black,
          cursor: "pointer",
        }
      });
      createNode({
        mother: titleArea,
        class: [ onofflineWordsClassName ],
        attribute: { proid: project.proid, desid: project.desid, status: "online" },
        text: project.proid + blank + "<u%/%u>" + blank + project.designer.designer + " D" + blank + "<u%/%u>" + blank + serviceParsing(project.service),
        event: {
          click: async function (e) {
            try {
              e.preventDefault();
              const proid = this.getAttribute("proid");
              const desid = this.getAttribute("desid");
              const slashes = [ ...this.querySelectorAll("b") ];
              const [ s0, s1, s2 ] = slashes;
              if (e.x <= s0.getBoundingClientRect().x) {
                await window.navigator.clipboard.writeText(proid);
                instance.mother.greenAlert(`클립보드에 저장되었습니다!`);
              } else if (e.x <= s1.getBoundingClientRect().x) {
                blankHref(FRONTHOST + "/designer/process.php?proid=" + proid);
              } else if (e.x <= s2.getBoundingClientRect().x) {
                // pass
              } else {
                // pass
              }
            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "inline-flex",
          fontSize: String(subSize) + ea,
          fontWeight: String(subWeight),
          color: colorChip.green,
          marginLeft: String(subMarginLeft) + ea,
          position: "relative",
          top: String(subTextTop) + ea,
        },
        under: {
          fontSize: String(subSize) + ea,
          fontWeight: String(300),
          color: colorChip.gray3,
        }
      });

      latestCallBlock = createNode({
        mother: titleArea,
        text: "마지막 통화 : " + latestCall.slice(2),
        style: {
          display: "inline-flex",
          fontSize: String(subSize) + ea,
          fontWeight: String(subWeight),
          color: colorChip.black,
          position: "absolute",
          right: String(0),
          top: String(statusTextTop) + ea,
        }
      });

      if (entireMode) {
        latestCallBlock.style.right = String(90) + ea;
        createNode({
          mother: titleArea,
          text: "되돌아가기",
          attribute: { proid },
          event: {
            click: function (e) {
              const getObj = GeneralJs.returnGet();
              const proid = this.getAttribute("proid");
              if (getObj.proid === proid) {
                globalThis.window.parent.postMessage(JSON.stringify({
                  type: "returnToPast",
                  proid: proid,
                  mode: "reset",
                  to: getObj.proid === proid ? "general" : "list",
                }), "*");
              } else {
                removeByClass(whiteCardClassName);
              }
            }
          },
          style: {
            display: "inline-flex",
            fontSize: String(subSize) + ea,
            fontWeight: String(subWeight),
            color: colorChip.black,
            position: "absolute",
            right: String(0),
            top: String(statusTextTop) + ea,
            cursor: "pointer",
          }
        });
      }

      // contents area

      contentsArea = createNode({
        mother: whiteCard,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          height: withOut(titleAreaHeight + titleAreaPaddingBottom, ea),
          width: withOut(0, ea),
        }
      });

      memoArea = createNode({
        mother: contentsArea,
        style: {
          display: "inline-flex",
          position: "relative",
          flexDirection: "column",
          width: String(memoAreaWidth - memoAreaMargin) + ea,
          marginRight: String(memoAreaMargin) + ea,
          height: withOut(0, ea),
        },
        children: [
          {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              width: withOut(0, ea),
              height: String(memoTitleAreaHeight) + ea,
              justifyContent: "start",
              alignItems: "end",
            },
            child: {
              text: "프로젝트 메모",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(memoTitleSize) + ea,
                fontWeight: String(memoTitleWeight),
                color: colorChip.black,
                top: String(memoTitleTextTop) + ea,
                left: String(memoTitleVisualLeft) + ea,
              }
            }
          },
          {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "column",
              border: "1px solid " + colorChip.gray3,
              width: withOut(0, ea),
              height: withOut(memoTitleAreaHeight + secondMemoTitleAreaHeight + dateAreaHeight, ea),
              borderRadius: String(5) + "px",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(memoAreaInnerPadding * 2, ea),
                height: withOut(memoAreaInnerPadding * 2, ea),
                overflow: "scroll",
              },
              child: {
                mode: "textarea",
                text: project.history.history,
                event: {
                  focus: function (e) {
                    this.style.color = colorChip.black;
                  },
                  blur: async function (e) {
                    try {
                      await ajaxJson({
                        id: project.proid,
                        column: "history",
                        value: this.value.replace(/[\=\&]/g, ''),
                        email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail
                      }, BACKHOST + "/updateProjectHistory");
                      instance.projects.find((p) => { return p.proid === project.proid }).history.history = this.value.replace(/[\=\&]/g, '');
                      this.style.color = colorChip.deactive;
                    } catch (e) {
                      console.log(e);
                    }
                  }
                },
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  height: withOut(0, ea),
                  fontSize: String(memoContentsSize) + ea,
                  fontWeight: String(memoContentsWeight),
                  color: colorChip.deactive,
                  border: String(0),
                  outline: String(0),
                  background: "transparent",
                  lineHeight: String(memoContentsLineHeight),
                }
              }
            }
          },
          {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              width: withOut(0, ea),
              height: String(secondMemoTitleAreaHeight) + ea,
              justifyContent: "start",
              alignItems: "end",
            },
            child: {
              text: "프로젝트 날짜",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(memoTitleSize) + ea,
                fontWeight: String(memoTitleWeight),
                color: colorChip.black,
                top: String(memoTitleTextTop) + ea,
                left: String(memoTitleVisualLeft) + ea,
              }
            }
          },
          {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "column",
              border: "1px solid " + colorChip.gray3,
              width: withOut(0, ea),
              height: String(dateAreaHeight) + ea,
              borderRadius: String(5) + "px",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(memoAreaInnerPadding * 2, ea),
                height: withOut(memoAreaInnerPadding * 2, ea),
                flexDirection: "row",
              },
              children: [
                {
                  text: columnArr.slice(0, 6).map((obj) => { return obj.title }).join("\n"),
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: "calc(100% / 4)",
                    height: withOut(0, ea),
                    fontSize: String(memoContentsSize) + ea,
                    fontWeight: String(memoContentsWeight),
                    color: colorChip.black,
                    background: "transparent",
                    lineHeight: String(memoContentsLineHeight),
                    textAlign: "left",
                  }
                },
                {
                  text: valueArr.slice(0, 6).map((obj) => { return obj.value }).join("\n"),
                  attribute: {
                    proid: project.proid,
                    desid: project.desid,
                  },
                  event: {
                    click: function (e) {
                      const rect = this.getBoundingClientRect();
                      const factorHeight = rect.height / 6;
                      const startY = rect.top;
                      let eventFunction;
                      if (startY + (factorHeight * 0) <= e.y && startY + (factorHeight * 1) > e.y) {
                        eventFunction = instance.projectStatusUpdateEvent();
                        eventFunction.call(this, e).catch((err) => {
                          console.log(err)
                        });
                      } else if (startY + (factorHeight * 1) <= e.y && startY + (factorHeight * 2) > e.y) {
                        eventFunction = instance.projectPartnerUpdateEvent();
                        eventFunction.call(this, e).catch((err) => {
                          console.log(err)
                        });
                      } else if (startY + (factorHeight * 2) <= e.y && startY + (factorHeight * 3) > e.y) {
                        // pass
                      } else if (startY + (factorHeight * 3) <= e.y && startY + (factorHeight * 4) > e.y) {
                        // pass
                      } else if (startY + (factorHeight * 4) <= e.y && startY + (factorHeight * 5) > e.y) {
                        eventFunction = instance.projectMeetingUpdateEvent();
                        eventFunction.call(this, e).catch((err) => {
                          console.log(err)
                        });
                      } else if (startY + (factorHeight * 5) <= e.y && startY + (factorHeight * 6) > e.y) {
                        // pass
                      }
                    }
                  },
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: "calc(100% / 4)",
                    height: withOut(0, ea),
                    fontSize: String(memoContentsSize) + ea,
                    fontWeight: String(memoContentsWeight),
                    color: colorChip.green,
                    background: "transparent",
                    lineHeight: String(memoContentsLineHeight),
                    textAlign: "left",
                  }
                },
                {
                  text: columnArr.slice(6).map((obj) => { return obj.title }).join("\n"),
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: "calc(100% / 4)",
                    height: withOut(0, ea),
                    fontSize: String(memoContentsSize) + ea,
                    fontWeight: String(memoContentsWeight),
                    color: colorChip.black,
                    background: "transparent",
                    lineHeight: String(memoContentsLineHeight),
                    textAlign: "left",
                  }
                },
                {
                  text: valueArr.slice(6).map((obj) => { return obj.value }).join("\n"),
                  attribute: {
                    proid: project.proid,
                    desid: project.desid,
                  },
                  event: {
                    click: function (e) {
                      const rect = this.getBoundingClientRect();
                      const factorHeight = rect.height / 6;
                      const startY = rect.top;
                      let eventFunction;
                      if (startY + (factorHeight * 0) <= e.y && startY + (factorHeight * 1) > e.y) {
                        eventFunction = instance.projectStartDateUpdateEvent();
                        eventFunction.call(this, e).catch((err) => {
                          console.log(err)
                        });
                      } else if (startY + (factorHeight * 1) <= e.y && startY + (factorHeight * 2) > e.y) {
                        eventFunction = instance.projectEndDateUpdateEvent();
                        eventFunction.call(this, e).catch((err) => {
                          console.log(err)
                        });
                      } else if (startY + (factorHeight * 2) <= e.y && startY + (factorHeight * 3) > e.y) {
                        // pass
                      } else if (startY + (factorHeight * 3) <= e.y && startY + (factorHeight * 4) > e.y) {
                        // pass
                      } else if (startY + (factorHeight * 4) <= e.y && startY + (factorHeight * 5) > e.y) {
                        // pass
                      } else if (startY + (factorHeight * 5) <= e.y && startY + (factorHeight * 6) > e.y) {
                        // pass
                      }
                    }
                  },
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: "calc(100% / 4)",
                    height: withOut(0, ea),
                    fontSize: String(memoContentsSize) + ea,
                    fontWeight: String(memoContentsWeight),
                    color: colorChip.green,
                    background: "transparent",
                    lineHeight: String(memoContentsLineHeight),
                    textAlign: "left",
                  }
                },
              ]
            }
          },
        ]
      });
      
      menuArea = createNode({
        mother: contentsArea,
        style: {
          display: "inline-block",
          position: "relative",
          width: withOut(memoAreaWidth, ea),
          height: withOut(0, ea),
          overflow: "scroll",
          borderBottom: "1px dashed " + colorChip.gray3,
        }
      })

      instance.menuArea = menuArea;

      await instance.insertFormStatusBox(project, menuArea);
      instance.insertUploadBox(project, menuArea);
      await instance.insertScheduleBox(project, menuArea);

    } catch (e) {
      console.log(e);
    }
  }
}

ProcessJs.prototype.reloadMenuArea = async function (project) {
  const instance = this;
  const { cleanChildren } = GeneralJs;
  try {
    if (this.menuArea !== null) {
      cleanChildren(this.menuArea);
      await instance.insertFormStatusBox(project, this.menuArea);
      instance.insertUploadBox(project, this.menuArea);  
    }
  } catch (e) {
    console.log(e);
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
  
    buttonWidth = <%% 116, 116, 116, 116, 24 %%>;
    buttonHeight = <%% 32, 28, 26, 24, 8.2 %%>;
  
    buttonSize = <%% 14, 13, 12, 11, 3.5 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
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
        const type = this.getAttribute("type");
        const zIndex = 5;
        try {
          let totalDom;
          let matrix;
          let maxX, maxY;
          let xArr, yArr;
          let tempObj;
          let targetDoms;
          let thisIndex;
          let finalIndex;
          let cancelBack, whitePrompt;
          let clickEnd;
          let clickRes;
          let copiedChildren;

          siblings = [ ...document.querySelectorAll('.' + siblingKeywords + String(x)) ];
          thisIndex = siblings.findIndex((dom) => { return dom === self });

          if (!deactive) {

            clickEnd = (x, y) => {
              return new Promise((resolve, reject) => {
                const targets = [ ...document.querySelectorAll('.' + valueBlockClassName) ]
                const target = targets.find((dom) => { return Number(dom.getAttribute('x')) === x && Number(dom.getAttribute('y')) === y })

                cancelBack = createNode({
                  mother: formPanBase,
                  class: [ blockContextMenuClassName ],
                  event: {
                    click: function (e) {
                      removeByClass(blockContextMenuClassName);
                      resolve(false);
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
                    top: String(target.getBoundingClientRect().top + (target.getBoundingClientRect().height / 2) - formPanBase.getBoundingClientRect().top) + "px",
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
                      click: function (e) {
                        const self = this;
                        const x = Number(this.getAttribute("x"));
                        const y = Number(this.getAttribute("y"));
                        const z = Number(this.getAttribute("z"));
                        const proid = this.getAttribute("proid");
                        const desid = this.getAttribute("desid");
                        let tempFunction;
                        let key, photoBoo, thisStatusNumber;
                        let matrix;
                        let siblings;
  
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

                        ajaxJson({
                          mode: "update",
                          proid,
                          desid,
                          matrix
                        }, SECONDHOST + "/projectDesignerStatus").then(() => {
                          setQueue(() => {
                            self.parentElement.style.animation = "fadedownlite 0.3s ease forwards";
                            setQueue(() => {
                              removeByClass(blockContextMenuClassName);
                              const targets = [ ...document.querySelectorAll('.' + valueBlockClassName) ]
                              const target = targets.find((dom) => { return Number(dom.getAttribute('x')) === x && Number(dom.getAttribute('y')) === y })
                              target.children[1].children[0].textContent = matrix[x].children[y].children[z].view;
                              resolve(true);
                            }, 301);
                          }, 200);
                        }).catch((err) => {
                          reject(err);
                        })

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
              })
            }

            if (toggle === "off") {
              if (type === "selection") {
                clickRes = await clickEnd(x, y);
                if (clickRes !== true) {
                  return;
                }
              }
              if (red === "off") {
                for (let i = 0; i < siblings.length; i++) {
                  if (i < thisIndex) {
                    if (siblings[i].getAttribute("red") !== "on") {
                      if (siblings[i].getAttribute("type") === "selection" && siblings[i].getAttribute("toggle") !== "on") {
                        clickRes = await clickEnd(Number(siblings[i].getAttribute("x")), Number(siblings[i].getAttribute("y")));
                        if (clickRes !== true) {
                          return;
                        }
                      }
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
              if (type === "selection") {
                const tempTargets = [ ...document.querySelectorAll('.' + valueBlockClassName) ]
                const tempTarget = tempTargets.find((dom) => { return Number(dom.getAttribute('x')) === x && Number(dom.getAttribute('y')) === y });
                tempTarget.children[1].children[0].textContent = thisForm[x].children[y].title;
              }
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
              copiedChildren = equalJson(JSON.stringify(thisForm[z].children[w].children));
              if (targetDoms[w].getAttribute("type") === "selection") {
                if (targetDoms[w].getAttribute("toggle") !== "on") {
                  for (let obj3 of copiedChildren) {
                    obj3.value = 0;
                  }
                }
              }
              tempObj.children.push({
                title: targetDoms[w].getAttribute("title"),
                type: targetDoms[w].getAttribute("type"),
                deactive: targetDoms[w].getAttribute("deactive") === "true",
                value: targetDoms[w].getAttribute("toggle") === "on" ? 1 : 0,
                key: thisForm[z].children[w].key,
                children: copiedChildren,
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
                            const targets = [ ...document.querySelectorAll('.' + valueBlockClassName) ]
                            const target = targets.find((dom) => { return Number(dom.getAttribute('x')) === x && Number(dom.getAttribute('y')) === y })
                            target.children[1].children[0].textContent = matrix[x].children[y].children[z].view;
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
              type: thisForm[i].children[j].type,
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
                  text: thisForm[i].children[j].type !== "selection" ? thisForm[i].children[j].title : (thisForm[i].children[j].children.find((o3) => { return o3.value === 1 }) === undefined ? thisForm[i].children[j].title : thisForm[i].children[j].children.find((o3) => { return o3.value === 1 }).view),
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
      createNode({
        mother: formPanBase,
        event: {
          click: async function (e) {
            try {
              const host = FRONTHOST.replace(/^https\:\/\//gi, '');
              const path = "project";
              if (window.confirm(designer.designer + " 실장님께 프로젝트 일정표 작성 요청 알림톡을 보낼까요?")) {
                await ajaxJson({
                  method: "puserScheduleDesigner",
                  name: designer.designer,
                  phone: designer.information.phone,
                  option: {
                    designer: designer.designer,
                    client: client.name,
                    host: host,
                    proid: project.proid,
                  }
                }, BACKHOST + "/alimTalk");
                window.alert(designer.designer + " 실장님께 프로젝트 일정표 작성 요청 알림톡을 보냈습니다!");
              }
            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          width: String(buttonWidth) + ea,
          height: String(buttonHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gradientGray,
          bottom: String(0),
          right: String(buttonWidth + 5) + ea,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          cursor: "pointer",
        },
        child: {
          text: "일정표 요청",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(buttonSize) + ea,
            fontWeight: String(buttonWeight),
            top: String(buttonTextTop) + ea,
            color: colorChip.white,
            cursor: "pointer",
          }
        }
      });
      createNode({
        mother: formPanBase,
        event: {
          click: async function (e) {
            try {
              const host = FRONTHOST.replace(/^https\:\/\//gi, '');
              const path = "project";
              if (window.confirm(designer.designer + " 실장님께 프로젝트 상태 체크 요청 알림톡을 보낼까요?")) {
                await ajaxJson({
                  method: "progressDesignerSpecific",
                  name: designer.designer,
                  phone: designer.information.phone,
                  option: {
                    designer: designer.designer,
                    client: client.name,
                    host: host,
                    proid: project.proid,
                    desid: designer.desid,
                  }
                }, BACKHOST + "/alimTalk");
                window.alert(designer.designer + " 실장님께 프로젝트 상태 체크 요청 알림톡을 보냈습니다!");
              }
            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          width: String(buttonWidth) + ea,
          height: String(buttonHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gradientGray,
          bottom: String(0),
          right: desktop ? String(0) : withOut(50, buttonWidth / 2, ea),
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          cursor: "pointer",
        },
        child: {
          text: "상태 체크 요청",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(buttonSize) + ea,
            fontWeight: String(buttonWeight),
            top: String(buttonTextTop) + ea,
            color: colorChip.white,
            cursor: "pointer",
          }
        }
      });
    }

    reloadMainButtons(formPanBase, thisForm);
  
  } catch (e) {
    console.log(e);
  }
}

ProcessJs.prototype.insertUploadBox = function (project, baseTong) {
  const instance = this;
  const mother = this.mother;
  const { ea, media } = this;
  const client = project.client;
  const designer = project.designer;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const uploadIconClassName = "uploadIconClassName";
  const memoIconClassName = "memoIconClassName";
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;
  let checkBoxAreaWidth;
  let mobileInnerPaddingBottom;
  let panMother;
  let panMotherInnerPadding;
  let panBetween;
  let basePan;
  let contentsTextTop;
  let panTitleBoxHeight;
  let uploadCircleWidth;
  let uploadCirclePadding;
  let uploadIconWidth;
  let uploadIconTop;
  let panMotherMinHeight;
  let contentsPan;
  let contentsPanPaddingTop;
  let contentsPanPaddingBottom;
  let panTitleBoxWidth;
  let itemBetween;
  let statusPadding;
  let statusOpacity;
  let subButtonPaddingRight;
  let subButtonSize, subButtonWeight;
  let subButtonVisualTop;
  let subButtonPaddingBottom;
  let subButtonPaddingTop;
  let subButtonPaddingLeft;
  let buttonBetween;
  let plusIconTop, plusIconWidth;
  let subButtonsBasePan;
  let subButtonsBetween;
  let subButtonsVisualTop;
  let linkIconWidth;
  let linkIconTop;
  let panMotherMarginTop;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), 0 %%>;
  contentsAreaPaddingTop = <%% 36, 36, 36, 36, 7 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  mobileInnerPaddingBottom = 0;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 15, 15, 14, 13, 2.9 %%>;
  contentsTextTop = <%% (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), -0.2 %%>;

  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 7 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 7 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 0 %%>;

  lineTop = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 9 : 7), 10 %%>;
  linePadding = <%% 12, 12, 12, 10, 12 %%>;

  mobilePaddingLeft = 0;

  mobileContentsWordingSize = 3;

  checkBoxAreaWidth = <%% 16, 16, 16, 16, 3 %%>;

  panMotherInnerPadding = <%% 12, 12, 10, 8, 0 %%>;
  panBetween = <%% 8, 8, 8, 8, 1 %%>;
  panTitleBoxWidth = <%% 124, 120, 114, 108, 21 %%>;
  panTitleBoxHeight = <%% 52, 48, 45, 40, 8.2 %%>;

  uploadCircleWidth = <%% 28, 28, 28, 24, 6 %%>;
  uploadCirclePadding = <%% 16, 16, 16, 12, 4 %%>;
  uploadIconWidth = <%% 13, 13, 13, 12, 3 %%>;
  uploadIconTop = <%% 0, 0, 0, 0, 0 %%>;

  linkIconWidth = <%% 15.5, 15.5, 15.5, 14, 3.4 %%>;
  linkIconTop = <%% 0, 0, 0, 0, 0 %%>;

  plusIconTop = <%% 0, 0, 0, 0, 0 %%>;
  plusIconWidth = <%% 14, 14, 13, 12, 3 %%>;

  panMotherMinHeight = <%% 500, 480, 420, 400, 54 %%>;

  contentsPanPaddingTop = <%% 18, 18, 16, 12, 3 %%>;
  contentsPanPaddingBottom = <%% 60, 60, 60, 54, 12 %%>;
  itemBetween = <%% 6, 6, 5, 4, 1 %%>;

  statusPadding = <%% 21, 21, 18, 18, 4 %%>;
  statusOpacity = <%% 0.4, 0.4, 0.4, 0.4, 0.4 %%>;

  subButtonPaddingRight = <%% 18, 18, 16, 12, 1.6 %%>;
  subButtonSize = <%% 12, 12, 11, 10, 2.4 %%>;
  subButtonWeight = <%% 800, 800, 800, 800, 800 %%>;
  subButtonVisualTop = <%% 3, 3, 2, 1, 0.3 %%>;
  subButtonPaddingBottom = <%% (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 5 : 4), (isIphone() ? 1.2 : 1.4) %%>;
  subButtonPaddingTop = <%% (isMac() ? 4 : 6), (isMac() ? 4 : 6), (isMac() ? 4 : 6), (isMac() ? 3 : 5), (isIphone() ? 1.2 : 1.2) %%>;
  subButtonPaddingLeft = <%% 11, 11, 10, 9, 2 %%>;
  subButtonsVisualTop = <%% 2, 3, 3, 1, 0 %%>;

  buttonBetween = <%% 5, 5, 5, 4, 1 %%>;

  subButtonsBetween = <%% 18, 18, 16, 14, 3 %%>;

  panMotherMarginTop = 60;

  this.whiteMargin = (desktop ? margin : 0);

  panMother = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(5) + "px",
      background: desktop ? colorChip.gray3 : colorChip.gray1,
      width: withOut(panMotherInnerPadding * 2, ea),
      padding: String(panMotherInnerPadding) + ea,
      marginTop: String(panMotherMarginTop) + ea,
    }
  });

  this.panList = [];
  for (let i = 0; i < this.panContents.length; i++) {
    basePan = createNode({
      mother: panMother,
      attribute: {
        index: String(i),
        proid: project.proid,
        desid: designer.desid,
        name: project.name,
        designer: designer.designer,
      },
      event: {
        drop: instance.dropFiles(project, i, (this.panContents[i].type === "photo")),
        dragenter: function (e) {
          e.preventDefault();
          e.stopPropagation();
          this.style.background = colorChip.whiteGreen;
        },
        dragover: function (e) {
          e.preventDefault();
          e.stopPropagation();
        },
        dragleave: function (e) {
          e.preventDefault();
          e.stopPropagation();
          this.style.background = colorChip.gray1;
        },
      },
      style: {
        display: "inline-block",
        verticalAlign: "top",
        position: "relative",
        width: withOut(0),
        marginBottom: String((i === (this.panContents.length - 1)) ? 0 : panBetween) + ea,
        background: desktop ? colorChip.gray1 : colorChip.gray3,
        borderRadius: String(5) + "px",
        transition: "all 0.5s ease",
      }
    });

    createNode({
      mother: basePan,
      style: {
        display: "inline-flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: String(panTitleBoxWidth) + ea,
        height: String(panTitleBoxHeight) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      },
      children: [
        {
          text: this.panContents[i].title,
          style: {
            position: "relative",
            top: String(contentsTextTop) + ea,
            fontSize: String(contentsWordingSize) + ea,
            fontWeight: String(800),
            color: colorChip.black,
          }
        }
      ]
    });

    subButtonsBasePan = createNode({
      mother: basePan,
      style: {
        display: "inline-flex",
        position: "absolute",
        alignItems: "center",
        flexDirection: "row",
        height: String(panTitleBoxHeight) + ea,
        paddingRight: String(subButtonPaddingRight) + ea,
        right: String(0),
        top: String(subButtonVisualTop) + ea,
      },
    });

    contentsPan = createNode({
      mother: basePan,
      attribute: {
        index: String(i),
        proid: project.proid,
        desid: designer.desid,
        name: project.name,
        designer: designer.designer,
        key: this.panContents[i].key,
      },
      style: {
        display: "block",
        position: "relative",
        width: withOut((contentsPanPaddingTop * 2) - itemBetween, ea),
        paddingTop: String(contentsPanPaddingTop) + ea,
        paddingBottom: String(contentsPanPaddingBottom) + ea,
        paddingLeft: String(contentsPanPaddingTop) + ea,
        paddingRight: String(contentsPanPaddingTop - itemBetween) + ea,
      }
    });

    createNode({
      mother: basePan,
      class: [ uploadIconClassName ],
      attribute: {
        index: String(i),
        key: this.panContents[i].key,
        proid: project.proid,
        desid: designer.desid,
        name: project.name,
        designer: designer.designer,
      },
      event: {
        click: (this.panContents[i].type === "link" ? instance.uploadLink(project, i) : instance.uploadFiles(project, i, (this.panContents[i].type === "photo"))),
      },
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: String(uploadCircleWidth) + ea,
        height: String(uploadCircleWidth) + ea,
        position: "absolute",
        bottom: String(uploadCirclePadding) + ea,
        right: String(uploadCirclePadding) + ea,
        borderRadius: String(uploadCircleWidth) + ea,
        background: colorChip.gradientGray,
        cursor: "pointer",
      },
      children: [
        {
          mode: "svg",
          source: instance.mother.returnExtract(colorChip.white),
          style: {
            display: "inline-block",
            position: "relative",
            top: String(uploadIconTop) + ea,
            width: String(uploadIconWidth) + ea,
          }
        }
      ]
    });

    createNode({
      mother: basePan,
      class: [ memoIconClassName ],
      attribute: {
        index: String(i),
        key: this.panContents[i].key,
        proid: project.proid,
        desid: designer.desid,
        name: project.name,
        designer: designer.designer,
      },
      event: {
        click: instance.plusMemo(project, i),
      },
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: String(uploadCircleWidth) + ea,
        height: String(uploadCircleWidth) + ea,
        position: "absolute",
        bottom: String(uploadCirclePadding) + ea,
        right: String((uploadCirclePadding + uploadCircleWidth) + buttonBetween) + ea,
        borderRadius: String(uploadCircleWidth) + ea,
        background: colorChip.gradientGray,
        cursor: "pointer",
      },
      children: [
        {
          mode: "svg",
          source: instance.mother.returnHamburger(colorChip.white),
          style: {
            display: "inline-block",
            position: "relative",
            top: String(plusIconTop) + ea,
            width: String(plusIconWidth) + ea,
          }
        }
      ]
    });

    this.panList.push(contentsPan);
  }

  this.setPanBlocks(project).catch((err) => { console.log(err) });

  return whiteBlock;
}

ProcessJs.prototype.insertScheduleBox = async function (project, baseTong) {
  const instance = this;
  const mother = this.mother;
  const { ea, media, totalContents } = this;
  const client = project.client;
  const proid = project.proid;
  const designer = project.designer;
  const desid = designer.desid;
  const requestNumber = project.requestNumber;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const manyBig = media[0];
  const generalSmall = !manyBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, ajaxForm, serviceParsing, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, downloadFile, blankHref, removeByClass, equalJson, svgMaker, uniqueValue, variableArray, colorCalendar } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainTitle = "프로젝트 일정";
  const dragElementClassName = "dragElementClassName";
  const tempInputClassName = "tempInputClassName";
  const duringTextToken = "~";
  const duringToken = "<b%&nbsp;&nbsp;" + duringTextToken + "&nbsp;&nbsp;%b>";
  const dateToHangul = (dateObject) => {
    if (dateObject.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
      return '-';
    } else {
      return `${String(dateObject.getFullYear()).slice(2)}년 ${String(dateObject.getMonth() + 1)}월 ${String(dateObject.getDate())}일`;
    }
  }
  const hangulToDate = (hangul, calendarMode = true) => {
    hangul = hangul.replace(/ /gi, '');
    if (calendarMode) {
      if (hangul.trim() === '-') {
        return new Date();
      } else {
        const [ year, month, date ] = hangul.split(/[가-힣]/gi);
        return new Date(2000 + Number(year), Number(month) - 1, Number(date));    
      }
    } else {
      if (hangul.trim() === '-') {
        return new Date(1800, 0, 1);
      } else {
        const [ year, month, date ] = hangul.split(/[가-힣]/gi);
        return new Date(2000 + Number(year), Number(month) - 1, Number(date));    
      }
    }
  }
  try {
    let updateTextValue;
    let paddingTop;
    let margin;
    let block;
    let whiteBottomMargin;
    let whiteBlock, whiteTong;
    let bottomMargin;
    let titleFontSize;
    let numberRight;
    let titleTop, titleTopNumber;
    let titleBottom;
    let mobileTitleLeft, mobileTitleTop;
    let mobilePaddingLeft;
    let mobileInnerPaddingBottom;
    let contentsAreaPaddingTop;
    let panMother;
    let panMotherInnerPadding;
    let panBetween;
    let panTitleBoxWidth;
    let panTitleBoxHeight;
    let panMotherBetween;
    let contents;
    let itemBetween;
    let smallBetween;
    let contentsPanPaddingTop;
    let contentsWordingSize;
    let contentsWordingBoldWeight;
    let contentsWordingWeight;
    let contentsWordingContentsWeight;
    let hamburgerItemWidth;
    let contentsTextTop;
    let widthRatio0, widthRatio1;
    let updateDateValue;
    let calendarWidth;
    let calendarPadding;
    let contentsBlock;
    let updateDateMobileValue;
    let setScheduleContents;
    let updateOrderValue;
    let buttonTongHeight, buttonTongPaddingTop;
    let buttonHeight, buttonPadding, buttonBetween;
    let buttonSize, buttonWeight, buttonTextTop;
    let originalContents;
    let contextMenuValue;
    let refreshUpdate;
    let calendarMother;
    let calendarTongPaddingTop, calendarTongPaddingBottom;
    let calendarDateArr;
    let updatedContents;
    let contentsRawInfo;
    let panMotherMarginTop;

    contentsRawInfo = await ajaxJson({ mode: "search", proid }, SECONDHOST + "/rawImageParsing", { equal: true });

    bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
    margin = <%% 55, 55, 47, 39, 4.7 %%>;
    paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;
  
    whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;
  
    titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
    numberRight = <%% 12, 12, 12, 12, 3 %%>;
  
    titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
    titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;
  
    titleBottom = <%% (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), 0 %%>;
    contentsAreaPaddingTop = <%% 36, 36, 36, 36, 7 %%>;

    panMotherInnerPadding = <%% 12, 12, 10, 8, 0 %%>;
    panBetween = <%% 8, 8, 8, 8, 1 %%>;
    panTitleBoxWidth = <%% 124, 120, 114, 108, 21 %%>;
    panTitleBoxHeight = <%% 52, 48, 40, 35, 8.2 %%>;
  
    panMotherBetween = <%% 8, 7, 6, 5, 1 %%>;
    smallBetween = <%% 3, 3, 2, 2, 1 %%>;
  
    mobileTitleLeft = 1.5;
    mobileTitleTop = -8.7;
  
    itemBetween = <%% 7, 7, 7, 6, 1.5 %%>;
  
    contentsPanPaddingTop = <%% 18, 18, 16, 12, 3 %%>;
    contentsWordingSize = <%% 14, 14, 12, 11, 2.7 %%>;
    contentsWordingBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    contentsWordingWeight = <%% 700, 700, 700, 700, 700 %%>;
    contentsWordingContentsWeight = <%% 400, 400, 400, 400, 400 %%>;
    contentsTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.1 %%>;
  
    calendarTongPaddingTop = <%% 24, 24, 20, 16, 3 %%>;
    calendarTongPaddingBottom = <%% 20, 20, 18, 14, 3 %%>;

    hamburgerItemWidth = <%% 14, 13, 13, 12, 2 %%>;
  
    widthRatio0 = <%% 4, 3, 3, 2.5, 3.5 %%>;
    widthRatio1 = <%% 12, 10, 10, 9, 1 %%>;
  
    calendarWidth = <%% 260, 260, 260, 260, 260 %%>;
    calendarPadding = <%% 4, 4, 4, 4, 3 %%>;
  
    buttonTongHeight = <%% 42, 42, 32, 30, 14 %%>;
    buttonTongPaddingTop = <%% 11, 11, 8, 6, 2 %%>;

    buttonHeight = <%% 36, 36, 30, 28, 7 %%>;
    buttonPadding = <%% 22, 18, 16, 14, 4 %%>;
    buttonBetween = <%% 6, 6, 6, 6, 1 %%>;

    buttonSize = <%% 14, 14, 12, 11, 2.7 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.1 %%>;

    panMotherMarginTop = 50;

    mobileInnerPaddingBottom = 0;
  
    this.whiteMargin = (desktop ? margin : 0);
  
    setScheduleContents = () => {};
  
    refreshUpdate = async function (base) {
      try {
        let refreshTargets;
        let num;
        let newContents;
        let childrenTarget;
        let tempObj;
        let whereQuery, updateQuery;

        refreshTargets = [ ...base.children ];
        refreshTargets.pop();

        num = -1;
        newContents = [];
        for (let dom of refreshTargets) {
          dom.setAttribute("index", String(num));
          childrenTarget = [ ...dom.children ];
          for (let child of childrenTarget) {
            child.setAttribute("index", String(num));
          }
          if (num !== -1) {
            tempObj = {};
            tempObj.date = {};
            for (let i = 0; i < childrenTarget.length; i++) {
              if (i === 1) {
                tempObj.title = childrenTarget[i].textContent;
              } else if (i === 2) {
                tempObj.description = childrenTarget[i].textContent;
              } else if (i === 3) {
                tempObj.date.start = hangulToDate(childrenTarget[i].textContent, false);
              } else if (i === 4) {
                tempObj.date.end = hangulToDate(childrenTarget[i].textContent, false);
              }
            }
            newContents.push(tempObj);
          }
          num++;
        }

        whereQuery = { proid: project.proid };
        updateQuery = {};
        updateQuery["schedule"] = newContents;

        await ajaxJson({
          mode: "update",
          proid: project.proid,
          desid: desid,
          whereQuery,
          updateQuery
        }, SECONDHOST + "/projectDesignerSchedule");

        return { schedule: newContents };
      } catch (e) {
        console.log(e);
      }
    }

    updateTextValue = (order, widthRatio, weight) => {
      return async function (e) {
        try {
          const index = Number(this.getAttribute("index"));
          const mother = this.parentElement.parentElement;
          const base = this.parentElement;
          const zIndex = 4;
          const thisChildOrder = order;
          let updateEvent;
          let cancelBack;
          let valueInput;
          let column;
          let whereQuery, updateQuery;
  
          cancelBack = {};
          valueInput = {};
  
          updateEvent = async function (e) {
            try {
              document.getElementById(base.id).children[thisChildOrder].firstChild.textContent = valueInput.value;

              if (thisChildOrder === 1) {
                column = "title";
              } else if (thisChildOrder === 2) {
                column = "description";
              } else if (thisChildOrder === 3) {
                column = "description";
              }

              whereQuery = { proid: project.proid };
              updateQuery = {};
              updateQuery["schedule." + String(index) + "." + column] = valueInput.value;

              updatedContents = await ajaxJson({
                mode: "update",
                proid: project.proid,
                desid: desid,
                whereQuery,
                updateQuery
              }, SECONDHOST + "/projectDesignerSchedule", { equal: true });

              removeByClass(tempInputClassName);
              setScheduleContents(updatedContents);

            } catch (e) {
              console.log(e);
            }
          }

          cancelBack = createNode({
            mother,
            attribute: {
              baseid: base.id,
            },
            class: [ tempInputClassName ],
            event: {
              click: function (e) {
                updateEvent(e).catch((err) => { console.log(err); });
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });
  
          valueInput = createNode({
            mother,
            class: [ tempInputClassName ],
            attribute: {
              baseid: base.id,
            },
            style: {
              display: "inline-flex",
              position: "absolute",
              top: String((widthRatio !== 100 ? base.getBoundingClientRect().top : this.getBoundingClientRect().top) - mother.getBoundingClientRect().top) + "px",
              left: String(this.getBoundingClientRect().left - mother.getBoundingClientRect().left) + "px",
              height: String(panTitleBoxHeight) + ea,
              width: widthRatio !== 100 ? String(panTitleBoxHeight * widthRatio) + ea : String(base.getBoundingClientRect().width) + "px",
              background: colorChip.white,
              borderRadius: String(5) + "px",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              zIndex: String(zIndex),
            },
            child: {
              mode: "input",
              attribute: {
                type: "text",
                baseid: base.id,
              },
              event: {
                keypress: function (e) {
                  if (e.key === "Enter") {
                    updateEvent(e).catch((err) => { console.log(err); });
                  }
                }
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(weight),
                color: colorChip.green,
                top: String(contentsTextTop) + ea,
                border: String(0),
                outline: String(0),
                width: withOut(0, ea),
                textAlign: "center",
              }
            }
          }).firstChild;
  
          valueInput.value = this.firstChild.textContent;
          valueInput.focus();
          
        } catch (e) {
          console.log(e);
        }
      }
    }
  
    contextMenuValue = (order) => {
      return async function (e) {
        try {

          e.preventDefault();

          const self = this;
          const index = Number(this.getAttribute("index"));
          const mother = this.parentElement.parentElement;
          const base = this.parentElement;
          const zIndex = 4;
          const thisChildOrder = order;
          let cancelBack;
          let valueInput;
          let menu;
          let clone;
          let whereQuery;
          let updateQuery;
  
          cancelBack = {};
          valueInput = {};

          menu = [
            {
              title: "수정하기",
              event: () => {
                return function (e) {
                  removeByClass(tempInputClassName);
                  self.click();
                }
              }
            },
            {
              title: "블록 지우기",
              event: () => {
                return async function (e) {
                  try {
                    removeByClass(tempInputClassName);
                    base.remove();
                    setScheduleContents(await refreshUpdate(mother));
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: "새 볼록 추가",
              event: () => {
                return async function (e) {
                  try {
                    removeByClass(tempInputClassName);
                    clone = base.cloneNode(true);
                    mother.insertBefore(clone, base.nextElementSibling);
                    setScheduleContents(await refreshUpdate(mother));
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
          ]

          cancelBack = createNode({
            mother,
            attribute: {
              baseid: base.id,
            },
            class: [ tempInputClassName ],
            event: {
              click: function (e) {
                removeByClass(tempInputClassName);
              },
              contextmenu: function (e) {
                e.preventDefault();
                removeByClass(tempInputClassName);
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });

          valueInput = createNode({
            mother,
            attribute: {
              baseid: base.id,
            },
            class: [ tempInputClassName ],
            event: {
              click: function (e) {

              }
            },
            style: {
              position: "fixed",
              top: String(e.clientY - baseTong.getBoundingClientRect().top) + "px",
              left: String(e.clientX - baseTong.getBoundingClientRect().left) + "px",
              background: colorChip.white,
              padding: String(6) + ea,
              zIndex: String(zIndex),
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              animation: "fadeuplite 0.3s ease forwards",
            },
            children: menu.map((obj, index) => {
              return {
                event: {
                  click: obj.event(),
                },
                style: {
                  display: "flex",
                  width: String(110) + ea,
                  height: String(32) + ea,
                  background: colorChip.gradientGreen,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: String(5) + "px",
                  marginBottom: index !== menu.length - 1 ? String(4) + ea : "",
                  cursor: "pointer",
                },
                child: {
                  text: obj.title,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(-1) + ea,
                    fontSize: String(13) + ea,
                    fontWeight: String(600),
                    color: colorChip.white,
                  }
                }
              };
            })
          });
          
        } catch (e) {
          console.log(e);
        }
      }
    }

    updateDateValue = (order) => {
      return async function (e) {
        try {
          const index = Number(this.getAttribute("index"));
          const mother = this.parentElement.parentElement;
          const base = this.parentElement;
          const zIndex = 4;
          const thisChildOrder = order;
          let cancelBack;
          let valueInput;
          let calendar;
          let updateEvent;
          let column;
          let whereQuery, updateQuery;
  
          cancelBack = {};
          valueInput = {};
  
          updateEvent = function (value) {
            return async function (e) {
              try {
                const thisDate = stringToDate(value);
                document.getElementById(base.id).children[thisChildOrder].firstChild.textContent = dateToHangul(thisDate);

                if (thisChildOrder === 3) {
                  column = "date.start";
                } else if (thisChildOrder === 4) {
                  column = "date.end";
                }
  
                whereQuery = { proid: project.proid };
                updateQuery = {};
                updateQuery["schedule." + String(index) + "." + column] = thisDate;
  
                updatedContents = await ajaxJson({
                  mode: "update",
                  proid: project.proid,
                  desid: desid,
                  whereQuery,
                  updateQuery
                }, SECONDHOST + "/projectDesignerSchedule", { equal: true });

                removeByClass(tempInputClassName);
                setScheduleContents(updatedContents);

              } catch (e) {
                console.log(e);
              }
            }
          }

          cancelBack = createNode({
            mother,
            attribute: {
              baseid: base.id,
            },
            class: [ tempInputClassName ],
            event: {
              click: function (e) {
                removeByClass(tempInputClassName);
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });
  
          valueInput = createNode({
            mother,
            class: [ tempInputClassName ],
            attribute: {
              baseid: base.id,
            },
            style: {
              display: "inline-flex",
              position: "absolute",
              top: String(base.getBoundingClientRect().top - mother.getBoundingClientRect().top + this.getBoundingClientRect().height + calendarPadding) + "px",
              left: String(this.getBoundingClientRect().left - mother.getBoundingClientRect().left + (this.getBoundingClientRect().width / 2) - (calendarWidth / 2)) + "px",
              width: String(calendarWidth) + ea,
              background: colorChip.white,
              borderRadius: String(5) + "px",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              zIndex: String(zIndex),
              boxShadow: "0px 5px 15px -9px " + colorChip.shadow,
              animation: "fadeuplite 0.3s ease forwards",
            },
          })
  
          calendar = instance.mother.makeCalendar(hangulToDate(base.children[thisChildOrder].firstChild.textContent), async function (e) {
            try {
              const updateFunc = updateEvent(this.getAttribute("buttonValue"));
              await updateFunc(e);
            } catch (e) {
              console.log(e);
            }
          });
          valueInput.appendChild(calendar.calendarBase);
          
        } catch (e) {
          console.log(e);
        }
      }
    }
  
    updateDateMobileValue = () => {
      return async function (e) {
        try {
          const index = Number(this.getAttribute("index"));
          const mother = this.parentElement.parentElement;
          const base = this.parentElement;
          const zIndex = 4;
          const thisChildOrder = 2;
          let cancelBack;
          let valueInput;
          let calendar;
          let thisDate, oppositeDate;
          let column;
          let whereQuery, updateQuery;

          cancelBack = {};
          valueInput = {};
  
          cancelBack = createNode({
            mother,
            attribute: {
              baseid: base.id,
            },
            class: [ tempInputClassName ],
            event: {
              click: function (e) {
                removeByClass(tempInputClassName);
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });
  
          valueInput = createNode({
            mother,
            class: [ tempInputClassName ],
            attribute: {
              baseid: base.id,
            },
            style: {
              display: "inline-flex",
              position: "absolute",
              top: String(base.getBoundingClientRect().top - mother.getBoundingClientRect().top + this.getBoundingClientRect().height + calendarPadding) + "px",
              right: String(3) + ea,
              width: String(calendarWidth) + "px",
              background: colorChip.white,
              borderRadius: String(5) + "px",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              zIndex: String(zIndex),
              boxShadow: "0px 5px 15px -9px " + colorChip.shadow,
              animation: "fadeuplite 0.3s ease forwards",
            },
          });
  


          if (e.clientX > this.querySelector('b').getBoundingClientRect().left) {
  
            thisDate = base.children[thisChildOrder].firstChild.textContent.split(duringTextToken).map((str) => { return str.trim() })[1];
            oppositeDate = base.children[thisChildOrder].firstChild.textContent.split(duringTextToken).map((str) => { return str.trim() })[0];
  
            calendar = instance.mother.makeCalendar(hangulToDate(thisDate), async function (e) {
              try {
                const thisDate = stringToDate(this.getAttribute("buttonValue"));
  
                document.getElementById(base.id).children[thisChildOrder].firstChild.lastChild.textContent = dateToHangul(thisDate);

                column = "date.end";
                whereQuery = { proid: project.proid };
                updateQuery = {};
                updateQuery["schedule." + String(index) + "." + column] = thisDate;
                
                updatedContents = await ajaxJson({
                  mode: "update",
                  proid: project.proid,
                  desid: desid,
                  whereQuery,
                  updateQuery
                }, SECONDHOST + "/projectDesignerSchedule", { equal: true });

                removeByClass(tempInputClassName);
                setScheduleContents(updatedContents);

              } catch (e) {
                console.log(e);
              }
            });
            valueInput.appendChild(calendar.calendarBase);
  
          } else {
  
            thisDate = base.children[thisChildOrder].firstChild.textContent.split(duringTextToken).map((str) => { return str.trim() })[0];
            oppositeDate = base.children[thisChildOrder].firstChild.textContent.split(duringTextToken).map((str) => { return str.trim() })[1];
  
            calendar = instance.mother.makeCalendar(hangulToDate(thisDate), async function (e) {
              try {
                const thisDate = stringToDate(this.getAttribute("buttonValue"));
                document.getElementById(base.id).children[thisChildOrder].firstChild.firstChild.textContent = dateToHangul(thisDate);

                column = "date.start";
                whereQuery = { proid: project.proid };
                updateQuery = {};
                updateQuery["schedule." + String(index) + "." + column] = thisDate;
                
                updatedContents = await ajaxJson({
                  mode: "update",
                  proid: project.proid,
                  desid: desid,
                  whereQuery,
                  updateQuery
                }, SECONDHOST + "/projectDesignerSchedule", { equal: true });

                removeByClass(tempInputClassName);
                setScheduleContents(updatedContents);

              } catch (e) {
                console.log(e);
              }
            });
            valueInput.appendChild(calendar.calendarBase);
  
          }
          
        } catch (e) {
          console.log(e);
        }
      }
    }

    updateOrderValue = () => {
      return async function (e) {
        try {
          const base = this.parentElement;
          let toTarget, fromTarget;

          e.preventDefault();
          toTarget = e.toElement;
          while (!(new RegExp(dragElementClassName, "gi")).test(toTarget.className === null ? '' : toTarget.className)) {
            toTarget = toTarget.parentElement;
          }
          toTarget.style.paddingBottom = String(0) + ea;

          fromTarget = document.getElementById(e.dataTransfer.getData("dragData"));

          if (toTarget.nextElementSibling === null) {
            base.appendChild(fromTarget);
          } else {
            base.insertBefore(fromTarget, toTarget.nextElementSibling)
          }

          if (desktop) {
            await refreshUpdate(base);
          }
          
        } catch (e) {
          console.log(e);
        }
      }
    }
    
    originalContents = await ajaxJson({ mode: "original", proid: project.proid, desid: desid }, SECONDHOST + "/projectDesignerSchedule");
  
    panMother = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: String(5) + "px",
        background: desktop ? colorChip.gray3 : colorChip.gray1,
        width: withOut(panMotherInnerPadding * 2, ea),
        padding: String(panMotherInnerPadding) + ea,
        verticalAlign: "top",
        marginTop: String(panMotherMarginTop) + ea,
      },
      child: {
        style: {
          display: "flex",
          flexDirection: "column",
          position: "relative",
          borderRadius: String(5) + "px",
          background: desktop ? colorChip.gray1 : colorChip.gray3,
          width: withOut(contentsPanPaddingTop * 2, ea),
          padding: String(contentsPanPaddingTop) + ea,
          verticalAlign: "top",
        }
      }
    }).firstChild;
  
    calendarMother = createNode({
      mother: panMother.parentElement,
      style: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: String(5) + "px",
        background: desktop ? colorChip.gray1 : colorChip.gray3,
        width: withOut(contentsPanPaddingTop * 2, ea),
        paddingLeft: String(contentsPanPaddingTop) + ea,
        paddingRight: String(contentsPanPaddingTop) + ea,
        paddingTop: String(calendarTongPaddingTop) + ea,
        paddingBottom: String(calendarTongPaddingBottom) + ea,
        marginTop: String(desktop ? panMotherInnerPadding : 2) + ea,
        verticalAlign: "top",
      },
    });

    setScheduleContents = (contents) => {

      cleanChildren(panMother);
      cleanChildren(calendarMother);

      calendarDateArr = [
        {
          contents: {
            color: colorChip.red,
            description: "",
            title: "오늘",
          },
          date: {
            start: new Date(),
            end: new Date(),
          }
        },
      ];

      for (let i = -1; i < contents.schedule.length; i++) {
        contentsBlock = createNode({
          mother: panMother,
          attribute: {
            draggable: "true",
            index: String(i),
          },
          class: [ dragElementClassName ],
          id: dragElementClassName + "_" + uniqueValue("hex"),
          event: {
            selectstart: (e) => {
              e.preventDefault();
            },
            dragstart: function (e) {
              this.style.height = String(0);
              this.style.opacity = String(0);
              this.style.marginBottom = String(0);
              e.dataTransfer.setData("dragData", this.id);
            },
            dragend: function (e) {
              this.style.height = String(panTitleBoxHeight) + ea;
              this.style.opacity = String(1);
              this.style.marginBottom = String(itemBetween) + ea;
              e.preventDefault();
            },
            dragenter: function (e) {
              this.style.paddingBottom = String(panTitleBoxHeight) + ea;
              e.preventDefault();
            },
            dragleave: function (e) {
              this.style.paddingBottom = String(0) + ea;
              e.preventDefault();
            },
            dragover: function (e) {
              e.preventDefault();
            },
            drop: updateOrderValue(),
          },
          style: {
            display: desktop ? "flex" : "block",
            position: "relative",
            width: withOut(0, ea),
            height: desktop ? String(panTitleBoxHeight) + ea : "",
            marginBottom: String(itemBetween) + ea,
            paddingBottom: desktop ? String(0) + ea : String(itemBetween) + ea,
            borderBottom: mobile ? "1px dashed " + colorChip.gray4 : "",
            transition: "all 0.3s ease",
          },
          children: [
            {
              attribute: {
                index: String(i),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(panTitleBoxHeight) + ea,
                height: String(panTitleBoxHeight) + ea,
                background: i === -1 ? colorChip.darkDarkShadow : colorChip.white,
                borderRadius: String(5) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                marginRight: String(smallBetween) + "px",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
                verticalAlign: "top",
                borderTopRightRadius: desktop ? String(5) + "px" : String(1) + "px",
                borderBottomRightRadius: desktop ? String(5) + "px" : String(1) + "px",
                borderBottomLeftRadius: desktop ? String(5) + "px" : String(1) + "px",
              },
              children: variableArray(1).map((index) => {
                if (desktop) {
                  return {
                    mode: "svg",
                    source: svgMaker.hamburgerIcon(colorChip.deactive),
                    style: {
                      display: i === -1 ? "none" : "inline-block",
                      position: "relative",
                      width: String(hamburgerItemWidth) + ea,
                    }
                  }
                } else {
                  return {
                    text: String(i + 1),
                    style: {
                      display: "inline-block",
                      position: "relative",
                      fontFamily: "graphik",
                      fontSize: String(contentsWordingSize) + ea,
                      fontStyle: "italic",
                      fontWeight: String(600),
                      color: i === -1 ? colorChip.white : colorChip.green,
                      top: String(contentsTextTop) + ea,
                    }
                  }
                }
              }),
            },
            {
              attribute: {
                index: String(i)
              },
              event: {
                click: updateTextValue(1, widthRatio0, contentsWordingWeight),
                contextmenu: contextMenuValue(1),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(panTitleBoxHeight * widthRatio0) + ea,
                height: String(panTitleBoxHeight) + ea,
                background: i === -1 ? colorChip.darkDarkShadow : colorChip.white,
                borderRadius: String(desktop ? 5 : 1) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                marginRight: String(smallBetween) + "px",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
                verticalAlign: "top",
                marginBottom: desktop ? "" : String(smallBetween) + "px",
              },
              child: {
                text: i === -1 ? "계획명" : contents.schedule[i].title,
                event: {
                  selectstart: (e) => {
                    e.preventDefault();
                  }
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(i === -1 ? contentsWordingBoldWeight : contentsWordingWeight),
                  color: i === -1 ? colorChip.white : colorChip.black,
                  top: String(contentsTextTop) + ea,
                }
              }
            },
          ]
        });
        if (desktop) {
          createNode({
            mother: contentsBlock,
            attribute: {
              index: String(i)
            },
            event: {
              click: updateTextValue(2, widthRatio1, contentsWordingContentsWeight),
              contextmenu: contextMenuValue(2),
            },
            style: {
              display: "inline-flex",
              position: "relative",
              width: desktop ? String(panTitleBoxHeight * widthRatio1) + ea : withOut(0, ea),
              height: String(panTitleBoxHeight) + ea,
              background: i === -1 ? colorChip.darkDarkShadow : colorChip.white,
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              marginRight: desktop ? String(smallBetween) + ea : "",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              verticalAlign: "top",
            },
            child: {
              text: i === -1 ? "설명" : contents.schedule[i].description,
              event: {
                selectstart: (e) => {
                  e.preventDefault();
                }
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(i === -1 ? contentsWordingBoldWeight : contentsWordingContentsWeight),
                color: i === -1 ? colorChip.white : colorChip.black,
                top: String(contentsTextTop) + ea,
              }
            }
          });
          createNode({
            mother: contentsBlock,
            attribute: {
              index: String(i)
            },
            event: {
              click: updateDateValue(3),
              contextmenu: contextMenuValue(3),
            },
            style: {
              display: "inline-flex",
              position: "relative",
              width: "calc(" + withOut((panTitleBoxHeight * (1 + widthRatio0 + widthRatio1)) + (smallBetween * 4), "px") + " / " + String(2) + ")",
              height: String(panTitleBoxHeight) + ea,
              background: i === -1 ? colorChip.darkDarkShadow : colorChip.white,
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              marginRight: String(smallBetween) + "px",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              verticalAlign: "top",
            },
            child: {
              text: i === -1 ? "시작일" : dateToHangul(contents.schedule[i].date.start),
              event: {
                selectstart: (e) => {
                  e.preventDefault();
                }
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(i === -1 ? contentsWordingBoldWeight : contentsWordingContentsWeight),
                color: i === -1 ? colorChip.white : colorChip.black,
                top: String(contentsTextTop) + ea,
              }
            }
          });
          createNode({
            mother: contentsBlock,
            attribute: {
              index: String(i)
            },
            event: {
              click: updateDateValue(4),
              contextmenu: contextMenuValue(4),
            },
            style: {
              display: "inline-flex",
              position: "relative",
              width: "calc(" + withOut((panTitleBoxHeight * (1 + widthRatio0 + widthRatio1)) + (smallBetween * 4), "px") + " / " + String(2) + ")",
              height: String(panTitleBoxHeight) + ea,
              background: i === -1 ? colorChip.darkDarkShadow : colorChip.white,
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              verticalAlign: "top",
            },
            child: {
              text: i === -1 ? "종료일" : dateToHangul(contents.schedule[i].date.end),
              event: {
                selectstart: (e) => {
                  e.preventDefault();
                }
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(i === -1 ? contentsWordingBoldWeight : contentsWordingContentsWeight),
                color: i === -1 ? colorChip.white : colorChip.black,
                top: String(contentsTextTop) + ea,
              }
            }
          });
        } else {
          createNode({
            mother: contentsBlock,
            attribute: {
              index: String(i)
            },
            event: {
              click: updateDateMobileValue(),
            },
            style: {
              display: "inline-flex",
              position: "relative",
              width: "calc(" + withOut((panTitleBoxHeight * (1 + widthRatio0)), ea) + " - " + String((smallBetween * 2)) + "px" + ")",
              height: String(panTitleBoxHeight) + ea,
              background: i === -1 ? colorChip.darkDarkShadow : colorChip.white,
              borderRadius: String(1) + "px",
              borderTopRightRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              verticalAlign: "top",
            },
            child: {
              text: i === -1 ? "해당 일정 시작일 ~ 종료일" : dateToHangul(contents.schedule[i].date.start) + duringToken + dateToHangul(contents.schedule[i].date.end),
              event: {
                selectstart: (e) => {
                  e.preventDefault();
                }
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(i === -1 ? contentsWordingBoldWeight : 700),
                color: i === -1 ? colorChip.white : colorChip.black,
                top: String(contentsTextTop) + ea,
                fontStyle: "italic",
              },
              bold: {
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(i === -1 ? contentsWordingBoldWeight : contentsWordingContentsWeight),
                color: i === -1 ? colorChip.white : colorChip.deactive,
              }
            }
          });
          createNode({
            mother: contentsBlock,
            attribute: {
              index: String(i)
            },
            event: {
              click: updateTextValue(3, 100, contentsWordingContentsWeight),
            },
            style: {
              display: "inline-flex",
              position: "relative",
              width: desktop ? String(panTitleBoxHeight * widthRatio1) + ea : withOut(0, ea),
              height: String(panTitleBoxHeight) + ea,
              background: i === -1 ? colorChip.darkDarkShadow : colorChip.white,
              borderTopLeftRadius: String(1) + "px",
              borderTopRightRadius: String(1) + "px",
              borderBottomLeftRadius: String(5) + "px",
              borderBottomRightRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              marginRight: desktop ? String(smallBetween) + "px" : "",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              verticalAlign: "top",
            },
            child: {
              text: i === -1 ? "해당 일정에 대한 자세한 설명" : contents.schedule[i].description,
              event: {
                selectstart: (e) => {
                  e.preventDefault();
                }
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(i === -1 ? contentsWordingBoldWeight : contentsWordingContentsWeight),
                color: i === -1 ? colorChip.white : colorChip.black,
                top: String(contentsTextTop) + ea,
              }
            }
          });
          if (i === contents.schedule.length - 1) {
            contentsBlock.style.marginBottom = "";
            contentsBlock.style.paddingBottom = "";
            contentsBlock.style.borderBottom = "";
          }
        }
        if (i !== -1) {
          calendarDateArr.push({
            contents: {
              color: [
                colorChip.yellow,
                colorChip.green,
                colorChip.purple,
                colorChip.red,
              ][i % 4],
              description: contents.schedule[i].description,
              title: contents.schedule[i].title,
            },
            date: {
              start: contents.schedule[i].date.start,
              end: contents.schedule[i].date.end,
            }
          })
        }
      }

      createNode({
        mother: panMother,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(buttonTongHeight) + ea,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: desktop ? "end" : "center",
          paddingTop: String(buttonTongPaddingTop) + ea,
        },
        children: [
          {
            event: {
              click: async function (e) {
                try {
                  const desid = project.desid;
                  const proid = project.proid;
                  if (window.confirm(project.client.name + " 고객님께 일정 알림톡을 보낼까요?")) {
                    await ajaxJson({ mode: "send", type: "schedule", proid, desid, designer: project.designer.designer, name: project.client.name, phone: project.client.phone }, SECONDHOST + "/projectDesignerStatus");
                    window.alert(project.client.name + " 고객님에게 일정 알림톡을 전송하였습니다!");  
                  }
                } catch (e) {
                  console.log(e);
                }
              }
            },
            style: {
              display: "inline-flex",
              height: String(buttonHeight) + ea,
              background: desktop ? colorChip.gradientGreen : colorChip.gradientGray,
              borderRadius: String(5) + "px",
              marginRight: String(buttonBetween) + ea,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: String(buttonPadding) + ea,
              paddingRight: String(buttonPadding) + ea,
              cursor: "pointer",
            },
            child: {
              text: "고객에게 일정표 알림 보내기",
              style: {
                display: "block",
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
                color: colorChip.white,
                position: "relative",
                top: String(buttonTextTop) + ea,
              }
            }
          },
          {
            event: {
              click: async function (e) {
                try {
                  let newContents;
                  if (window.confirm("일정을 초기화 하시겠습니까?")) {
                    await ajaxJson({
                      mode: "delete",
                      proid: project.proid,
                      desid: project.desid,
                    }, SECONDHOST + "/projectDesignerSchedule");
                    newContents = equalJson(JSON.stringify(originalContents));
                    await ajaxJson({ mode: "create", proid: project.proid, desid: project.desid, schedule: newContents.schedule }, SECONDHOST + "/projectDesignerSchedule");
                    setScheduleContents(newContents);
                  }
                } catch (e) {
                  console.log(e);
                }
              }
            },
            style: {
              display: "inline-flex",
              height: String(buttonHeight) + ea,
              background: desktop ? colorChip.gradientGreen : colorChip.gradientGray,
              borderRadius: String(5) + "px",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: String(buttonPadding) + ea,
              paddingRight: String(buttonPadding) + ea,
              cursor: "pointer",
            },
            child: {
              text: "전체 일정 초기화",
              style: {
                display: "block",
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
                color: colorChip.white,
                position: "relative",
                top: String(buttonTextTop) + ea,
              }
            }
          },
        ]
      });

      colorCalendar(calendarMother, calendarDateArr, { standardDate: new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1)) });

    }

    ajaxJson({ mode: "get", proid: project.proid, desid: desid }, SECONDHOST + "/projectDesignerSchedule", { equal: true }).then((rows) => {
      if (rows.length === 0) {
        contents = equalJson(JSON.stringify(originalContents));
        ajaxJson({ mode: "create", proid: project.proid, desid: desid, schedule: contents.schedule }, SECONDHOST + "/projectDesignerSchedule", { equal: true }).catch((err) => {
          console.log(err);
        });
      } else {
        contents = rows[0];
      }
      setScheduleContents(contents);
    }).catch((err) => {
      console.log(err);
    });

  } catch (e) {
    console.log(e);
  }
}

ProcessJs.prototype.insertTravelBox = function (project, baseTong) {
  const instance = this;
  const mother = this.mother;
  const { ea, media, totalContents } = this;
  const client = project.client;
  const requestNumber = project.requestNumber;
  const designer = project.designer;
  const mobile = media[4];
  const desktop = !mobile;
  const manyBig = media[0];
  const generalSmall = !manyBig;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, ajaxForm, serviceParsing, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, downloadFile, blankHref, removeByClass, equalJson, svgMaker, variableArray } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainTitle = "출장 내역";
  const travelBlockClassName = "travelBlockClassName";
  const dateValueClassName = "dateValueClassName";
  const feeValueClassName = "feeValueClassName";
  const fromValueClassName = "fromValueClassName";
  const toValueClassName = "toValueClassName";
  const tempInputClassName = "tempInputClassName";
  const dateConvert = (dateObject) => {
    const res = dateToString(dateObject);
    if (/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/gi.test(res)) {
      if (desktop) {
      return res.trim();
      } else {
      return res.trim().slice(2);
      }
    } else {
      return '-';
    }
  }
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;
  let checkBoxAreaWidth;
  let mobileInnerPaddingBottom;
  let panMother;
  let panMotherInnerPadding;
  let panBetween;
  let basePan;
  let contentsTextTop;
  let panTitleBoxHeight;
  let uploadCircleWidth;
  let uploadCirclePadding;
  let uploadIconWidth;
  let uploadIconTop;
  let panMotherMinHeight;
  let contentsPan;
  let contentsPanPaddingTop;
  let contentsPanPaddingBottom;
  let panTitleBoxWidth;
  let itemBetween;
  let statusPadding;
  let statusOpacity;
  let subButtonPaddingRight;
  let subButtonSize, subButtonWeight;
  let subButtonVisualTop;
  let subButtonPaddingBottom;
  let subButtonPaddingTop;
  let subButtonPaddingLeft;
  let buttonBetween;
  let plusIconTop, plusIconWidth;
  let subButtonsBasePan;
  let subButtonsBetween;
  let subButtonsVisualTop;
  let linkIconWidth;
  let linkIconTop;
  let panMotherBetween;
  let contents;
  let buttonSize, buttonWeight, buttonTextTop;
  let buttonHeight;
  let paymentByCard;
  let downloadOriginal;
  let viewPortfolio;
  let viewReview;
  let designerRawContentsUpload;
  let designerSampleDownload;
  let designerRawContentsView;
  let dateFeeWidth;
  let contentsValueWordingSize;
  let buttonTongHeight;
  let buttonTongPaddingTop;
  let buttonPadding;
  let travelAddEvent;
  let textMargin;
  let maximumTextWidth;
  let rowMaker;
  let minimumLength;
  let totalTravelUpdate;
  let updateDateValue;
  let calendarWidth;
  let calendarPadding;
  let initialDomSetting;
  let domToMatrix;
  let panMotherMarginTop;
  
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), 0 %%>;
  contentsAreaPaddingTop = <%% 36, 36, 36, 36, 7 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  mobileInnerPaddingBottom = 0;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 15, 14, 13, 12, 2.9 %%>;
  contentsValueWordingSize = <%% 14, 14, 12, 11, 2.7 %%>;
  contentsTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.1 %%>;

  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 7 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 7 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 0 %%>;

  lineTop = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 9 : 7), 10 %%>;
  linePadding = <%% 12, 12, 12, 10, 12 %%>;

  mobilePaddingLeft = 0;

  mobileContentsWordingSize = 3;

  checkBoxAreaWidth = <%% 16, 16, 16, 16, 3 %%>;

  panMotherInnerPadding = <%% 12, 12, 10, 8, 0 %%>;
  panBetween = <%% 8, 8, 8, 8, 1 %%>;
  panTitleBoxWidth = <%% 124, 120, 114, 108, 21 %%>;
  panTitleBoxHeight = <%% 52, 48, 40, 35, 8.2 %%>;

  uploadCircleWidth = <%% 28, 28, 28, 24, 6 %%>;
  uploadCirclePadding = <%% 16, 16, 16, 12, 4 %%>;
  uploadIconWidth = <%% 13, 13, 13, 12, 3 %%>;
  uploadIconTop = <%% 0, 0, 0, 0, 0 %%>;

  linkIconWidth = <%% 15.5, 15.5, 15.5, 14, 3.4 %%>;
  linkIconTop = <%% 0, 0, 0, 0, 0 %%>;

  plusIconTop = <%% 0, 0, 0, 0, 0 %%>;
  plusIconWidth = <%% 14, 14, 13, 12, 3 %%>;

  panMotherMinHeight = <%% 500, 480, 420, 400, 54 %%>;

  contentsPanPaddingTop = <%% 18, 18, 16, 12, 3 %%>;
  contentsPanPaddingBottom = <%% 60, 60, 60, 54, 12 %%>;
  itemBetween = <%% 7, 7, 7, 6, 0.5 %%>;

  statusPadding = <%% 21, 21, 18, 18, 4 %%>;
  statusOpacity = <%% 0.4, 0.4, 0.4, 0.4, 0.4 %%>;

  subButtonPaddingRight = <%% 18, 18, 16, 12, 1.6 %%>;
  subButtonSize = <%% 12, 12, 11, 10, 2.4 %%>;
  subButtonWeight = <%% 800, 800, 800, 800, 800 %%>;
  subButtonVisualTop = <%% 3, 3, 2, 1, 0.3 %%>;
  subButtonPaddingBottom = <%% (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 5 : 4), (isIphone() ? 1.2 : 1.4) %%>;
  subButtonPaddingTop = <%% (isMac() ? 4 : 6), (isMac() ? 4 : 6), (isMac() ? 4 : 6), (isMac() ? 3 : 5), (isIphone() ? 1.2 : 1.2) %%>;
  subButtonPaddingLeft = <%% 11, 11, 10, 9, 2 %%>;
  subButtonsVisualTop = <%% 2, 3, 3, 1, 0 %%>;

  subButtonsBetween = <%% 18, 18, 16, 14, 3 %%>;

  panMotherBetween = <%% 8, 7, 6, 5, 1 %%>;

  buttonTongHeight = <%% 42, 42, 32, 30, 14 %%>;
  buttonTongPaddingTop = <%% 11, 11, 8, 6, 0 %%>;

  buttonHeight = <%% 36, 36, 30, 28, 7 %%>;
  buttonPadding = <%% 22, 18, 16, 14, 4 %%>;
  buttonBetween = <%% 4, 4, 3, 2, 0.8 %%>;
  buttonSize = <%% 14, 14, 13, 12, 2.7 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
  buttonTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.1 %%>;

  dateFeeWidth = <%% 180, 160, 130, 110, 19 %%>;

  textMargin = <%% 16, 16, 14, 12, 2.6 %%>;
  maximumTextWidth = <%% 1000, 1000, 800, 600, 200 %%>;

  calendarWidth = <%% 260, 260, 260, 260, 260 %%>;
  calendarPadding = <%% 4, 4, 4, 4, 3 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  minimumLength = 3;

  panMotherMarginTop = 50;

  basePan = {};
  totalTravelUpdate = async () => {};
  initialDomSetting = () => {};
  domToMatrix = () => {};

  updateDateValue = () => {
    return async function (e) {
      try {
        const mother = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        const base = this.parentElement;
        const zIndex = 4;
        const value = stringToDate((mobile ? "20" : "") + this.getAttribute("date"));
        let cancelBack;
        let valueInput;
        let calendar;
        let updateEvent;
        let column;
        let whereQuery, updateQuery;

        cancelBack = {};
        valueInput = {};

        updateEvent = function (value) {
          return async function (e) {
            try {
              const thisDate = stringToDate(value);
              base.querySelector('.' + dateValueClassName).textContent = dateConvert(thisDate);
              base.querySelector('.' + dateValueClassName).setAttribute("date", dateConvert(thisDate));
              await totalTravelUpdate();
              removeByClass(tempInputClassName);
            } catch (e) {
              console.log(e);
            }
          }
        }

        cancelBack = createNode({
          mother,
          class: [ tempInputClassName ],
          event: {
            click: function (e) {
              removeByClass(tempInputClassName);
            }
          },
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            width: withOut(0, ea),
            height: withOut(0, ea),
            background: "transparent",
            zIndex: String(zIndex),
          }
        });

        valueInput = createNode({
          mother,
          class: [ tempInputClassName ],
          style: {
            display: "inline-flex",
            position: "absolute",
            top: String(base.getBoundingClientRect().top - mother.getBoundingClientRect().top + this.getBoundingClientRect().height + calendarPadding) + "px",
            left: desktop ? String(this.getBoundingClientRect().left - mother.getBoundingClientRect().left + (this.getBoundingClientRect().width / 2) - (calendarWidth / 2)) + "px" : String(0) + ea,
            width: String(calendarWidth) + "px",
            background: colorChip.white,
            borderRadius: String(5) + "px",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            zIndex: String(zIndex),
            boxShadow: "0px 5px 15px -9px " + colorChip.shadow,
            animation: "fadeuplite 0.3s ease forwards",
          },
        })

        calendar = instance.mother.makeCalendar(value, async function (e) {
          try {
            const updateFunc = updateEvent(this.getAttribute("buttonValue"));
            await updateFunc(e);
          } catch (e) {
            console.log(e);
          }
        });
        valueInput.appendChild(calendar.calendarBase);
        
      } catch (e) {
        console.log(e);
      }
    }
  }

  rowMaker = (index, date = new Date(1800, 0, 1), fee = 0, addressFrom = '', addressTo = '') => {
    let dom;
    let emptyBoo;

    if (date.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
      emptyBoo = true;
    } else {
      emptyBoo = false;
    }

    dom = createNode({
      mother: basePan,
      class: [ travelBlockClassName ],
      attribute: {
        index: String(index),
        empty: emptyBoo ? "true" : "false",
      },
      event: {
        contextmenu: async function (e) {
          try {
            e.preventDefault();
            this.remove();
            initialDomSetting(domToMatrix());
            await totalTravelUpdate();
          } catch (e) {
            console.log(e);
          }
        }
      },
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "row",
        width: withOut(0, ea),
        height: String(panTitleBoxHeight) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
        marginBottom: String(itemBetween) + ea,
        cursor: "pointer",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            borderRight: "1px solid " + colorChip.gray3,
            width: String(panTitleBoxHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            boxSizing: "border-box",
          },
          child: {
            style: {
              display: "block",
              position: "relative",
              width: withOut(textMargin * 2, ea),
              overflow: "scroll",
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                text: String(index),
                style: {
                  display: "block",
                  position: "relative",
                  top: String(desktop ? -1 : -0.2) + ea,
                  fontSize: String(contentsValueWordingSize) + ea,
                  fontWeight: String(600),
                  fontFamily: "graphik",
                  fontStyle: "italic",
                  color: colorChip.green,
                  cursor: "pointer",
                }
              }
            }
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            borderRight: "1px solid " + colorChip.gray3,
            width: String(dateFeeWidth) + ea,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            boxSizing: "border-box",
          },
          child: {
            style: {
              display: "block",
              position: "relative",
              width: withOut(textMargin * 2, ea),
              overflow: "scroll",
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                width: String(maximumTextWidth) + ea,
                left: withOut(50, maximumTextWidth / 2, ea),
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                class: [ dateValueClassName ],
                event: {
                  click: updateDateValue(),
                },
                attribute: {
                  date: dateConvert(date),
                },
                text: dateConvert(date),
                style: {
                  display: "block",
                  position: "relative",
                  top: String(contentsTextTop) + ea,
                  fontSize: String(contentsValueWordingSize) + ea,
                  fontWeight: String(700),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              }
            }
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            borderRight: "1px solid " + colorChip.gray3,
            width: String(dateFeeWidth) + ea,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            boxSizing: "border-box",
          },
          child: {
            style: {
              display: "block",
              position: "relative",
              width: withOut(textMargin * 2, ea),
              overflow: "scroll",
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                width: String(maximumTextWidth) + ea,
                left: withOut(50, maximumTextWidth / 2, ea),
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                class: [ feeValueClassName ],
                text: fee === 0 ? '-' : (autoComma(fee) + '원'),
                style: {
                  display: "block",
                  position: "relative",
                  top: String(contentsTextTop) + ea,
                  fontSize: String(contentsValueWordingSize) + ea,
                  fontWeight: String(400),
                  color: colorChip.black,      
                }
              }
            }
          }
        },
      ],
    });

    if (addressFrom.trim() !== '-' && addressFrom.trim() !== '') {
      createNode({
        mother: dom,
        style: {
          display: "inline-flex",
          position: "relative",
          borderRight: "1px solid " + colorChip.gray3,
          width: "calc(" + withOut((dateFeeWidth * 2) + panTitleBoxHeight, ea) + " / 2)",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          boxSizing: "border-box",
        },
        child: {
          style: {
            display: "block",
            position: "relative",
            width: withOut(textMargin * 2, ea),
            overflow: "scroll",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              width: String(maximumTextWidth) + ea,
              justifyContent: "start",
              alignItems: "center",
            },
            child: {
              class: [ fromValueClassName ],
              text: addressFrom,
              style: {
                display: "block",
                position: "relative",
                top: String(contentsTextTop) + ea,
                fontSize: String(contentsValueWordingSize) + ea,
                fontWeight: String(400),
                color: colorChip.black,      
              }
            }
          }
        }
      });
    } else {
      createNode({
        mother: dom,
        style: {
          display: "inline-flex",
          position: "relative",
          borderRight: "1px solid " + colorChip.gray3,
          width: "calc(" + withOut((dateFeeWidth * 2) + panTitleBoxHeight, ea) + " / 2)",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          boxSizing: "border-box",
        },
        child: {
          style: {
            display: "block",
            position: "relative",
            width: withOut(textMargin * 2, ea),
            overflow: "scroll",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
            },
            child: {
              class: [ fromValueClassName ],
              text: '-',
              style: {
                display: "block",
                position: "relative",
                top: String(contentsTextTop) + ea,
                fontSize: String(contentsValueWordingSize) + ea,
                fontWeight: String(400),
                color: colorChip.black,      
              }
            }
          }
        }
      });
    }

    if (addressTo.trim() !== '-' && addressTo.trim() !== '') {
      createNode({
        mother: dom,
        style: {
          display: "inline-flex",
          position: "relative",
          width: "calc(" + withOut((dateFeeWidth * 2) + panTitleBoxHeight, ea) + " / 2)",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        },
        child: {
          style: {
            display: "block",
            position: "relative",
            width: withOut(textMargin * 2, ea),
            overflow: "scroll",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              width: String(maximumTextWidth) + ea,
              justifyContent: "start",
              alignItems: "center",
            },
            child: {
              class: [ toValueClassName ],
              text: addressTo,
              style: {
                display: "block",
                position: "relative",
                top: String(contentsTextTop) + ea,
                fontSize: String(contentsValueWordingSize) + ea,
                fontWeight: String(400),
                color: colorChip.black,      
              }
            }
          }
        }
      });
    } else {
      createNode({
        mother: dom,
        style: {
          display: "inline-flex",
          position: "relative",
          width: "calc(" + withOut((dateFeeWidth * 2) + panTitleBoxHeight, ea) + " / 2)",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        },
        child: {
          style: {
            display: "block",
            position: "relative",
            width: withOut(textMargin * 2, ea),
            overflow: "scroll",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
            },
            child: {
              class: [ toValueClassName ],
              text: '-',
              style: {
                display: "block",
                position: "relative",
                top: String(contentsTextTop) + ea,
                fontSize: String(contentsValueWordingSize) + ea,
                fontWeight: String(400),
                color: colorChip.black,      
              }
            }
          }
        }
      });
    }
    
    return dom;
  }

  domToMatrix = () => {
    let blocks;
    let realBlocks;
    let matrix;
    let dateRaw, feeRaw, fromRaw, toRaw;
    let dateValue, feeValue, fromValue, toValue;

    blocks = [ ...document.querySelectorAll('.' + travelBlockClassName) ];
    realBlocks = blocks.filter((dom) => { return dom.getAttribute("empty") !== "true" });

    matrix = [];
    for (let dom of realBlocks) {
      dateRaw = dom.querySelector('.' + dateValueClassName).textContent.trim();
      feeRaw = dom.querySelector('.' + feeValueClassName).textContent.trim();
      fromRaw = dom.querySelector('.' + fromValueClassName).textContent.trim();
      toRaw = dom.querySelector('.' + toValueClassName).textContent.trim();

      if (dateRaw === '-' || dateRaw === '') {
        dateValue = new Date(1800, 0, 1);
      } else {
        if (desktop) {
          dateValue = stringToDate(dateRaw);
        } else {
          dateValue = stringToDate("20" + dateRaw);
        }
      }

      if (feeRaw === '-' || feeRaw === '') {
        feeValue = 0;
      } else {
        feeValue = Number(feeRaw.replace(/[^0-9]/gi, ''));
      }

      fromValue = fromRaw;
      toValue = toRaw;

      matrix.push({
        date: dateValue,
        fee: feeValue,
        address: {
          from: fromValue,
          to: toValue,
        }
      })
    }

    return matrix;
  }

  totalTravelUpdate = async () => {
    try {
      let proid, desid;
      let matrix;
      let finalObject;

      proid = project.proid;
      desid = designer.desid;
      
      matrix = domToMatrix();

      finalObject = {
        proid,
        desid,
        travel: matrix,
      };

      await ajaxJson({
        mode: "update",
        proid,
        desid,
        updateQuery: { travel: matrix }
      }, SECONDHOST + "/projectDesignerTravel");
      
    } catch (e) {
      console.log(e);
    }
  }

  travelAddEvent = async function (e) {
    try {
      const address = {
        from: designer.information.address[0],
        to: client.requests[requestNumber].request.space.address
      }
      const date = new Date();
      let fee;
      let thisProposal;
      let offlineCase;
      let dom;
      let blocks;
      let lastIndex;
      let indexArr;
      let emptyRows;
      let emptyLength;
      let realBlocks;

      thisProposal = project.proposal.detail.find((obj) => { return obj.desid === designer.desid });
      fee = 0;
      if (thisProposal !== undefined) {
        offlineCase = thisProposal.fee.find((o) => { return o.method === "offline" });
        if (offlineCase !== undefined) {
          fee = offlineCase.distance.amount;
        }
      }

      blocks = [ ...document.querySelectorAll('.' + travelBlockClassName) ];

      emptyRows = blocks.filter((dom) => { return dom.getAttribute("empty") === "true" });
      emptyLength = emptyRows.length;

      realBlocks = blocks.filter((dom) => { return dom.getAttribute("empty") !== "true" });

      if (emptyRows.length === 0) {
        dom = rowMaker(realBlocks.length + 1, date, fee, address.from, address.to);
        basePan.insertBefore(dom, basePan.children[basePan.children.length - 2]);
      } else {
        for (let row of emptyRows) {
          row.remove();
        }
        dom = rowMaker(realBlocks.length + 1, date, fee, address.from, address.to);
        basePan.insertBefore(dom, basePan.children[basePan.children.length - 2]);
        for (let i = 0; i < emptyLength - 1; i++) {
          dom = rowMaker(realBlocks.length + 1 + i + 1);
          basePan.insertBefore(dom, basePan.children[basePan.children.length - 2]);
        }
      }

      await totalTravelUpdate();

    } catch (e) {
      console.log(e);
    }
  }

  initialDomSetting = (matrix) => {
    let dom;
    let childrenTargets;
    let childrenLength;

    childrenTargets = [ ...basePan.children ];
    childrenLength = childrenTargets.length;

    for (let i = 0; i < childrenLength; i++) {
      if (i !== 0 && i !== childrenLength - 1) {
        basePan.removeChild(childrenTargets[i]);
      }
    }
    for (let i = 0; i < matrix.length; i++) {
      dom = rowMaker(i + 1, matrix[i].date, matrix[i].fee, matrix[i].address.from, matrix[i].address.to);
      basePan.insertBefore(dom, basePan.children[basePan.children.length - 2]);
    }
    if (matrix.length < minimumLength) {
      for (let i = 0; i < minimumLength - matrix.length; i++) {
        dom = rowMaker(i + 1 + matrix.length);
        basePan.insertBefore(dom, basePan.children[basePan.children.length - 2]);
      }
    }
  }

  panMother = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      borderRadius: String(5) + "px",
      background: desktop ? colorChip.gray3 : colorChip.gray1,
      width: withOut(panMotherInnerPadding * 2, ea),
      padding: String(panMotherInnerPadding) + ea,
      marginRight: desktop ? String(panMotherBetween) + ea : "",
      marginBottom: desktop ? "" : String(panMotherBetween) + ea,
      verticalAlign: "top",
      marginTop: String(panMotherMarginTop) + ea,
    }
  });

  basePan = createNode({
    mother: panMother,
    style: {
      display: "inline-block",
      verticalAlign: "top",
      position: "relative",
      width: withOut(contentsPanPaddingTop * 2, ea),
      background: desktop ? colorChip.gray1 : colorChip.gray3,
      borderRadius: String(5) + "px",
      transition: "all 0.5s ease",
      "min-height": String(panTitleBoxHeight * 5) + ea,
      padding: String(contentsPanPaddingTop) + ea,
    },
    children: [
      {
        style: {
          display: "flex",
          position: "relative",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "row",
          width: withOut(0, ea),
          height: String(panTitleBoxHeight) + ea,
          background: colorChip.darkDarkShadow,
          borderRadius: String(5) + "px",
          boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
          marginBottom: String(itemBetween) + ea,
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "relative",
              borderRight: "1px solid " + colorChip.gray3,
              width: String(panTitleBoxHeight) + ea,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxSizing: "border-box",
            },
            child: {
              style: {
                display: "block",
                position: "relative",
                width: withOut(0 * 2, ea),
                overflow: "scroll",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  text: "0",
                  style: {
                    display: "block",
                    position: "relative",
                    top: String(contentsTextTop) + ea,
                    fontSize: String(contentsWordingSize) + ea,
                    fontWeight: String(800),
                    color: colorChip.darkDarkShadow,
                  }
                }
              }
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "relative",
              borderRight: "1px solid " + colorChip.gray3,
              width: String(dateFeeWidth) + ea,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxSizing: "border-box",
            },
            child: {
              style: {
                display: "block",
                position: "relative",
                width: withOut(textMargin * 2, ea),
                overflow: "scroll",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  text: "출장일",
                  style: {
                    display: "block",
                    position: "relative",
                    top: String(contentsTextTop) + ea,
                    fontSize: String(contentsWordingSize) + ea,
                    fontWeight: String(800),
                    color: colorChip.white,
                  }
                }
              }
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "relative",
              borderRight: "1px solid " + colorChip.gray3,
              width: String(dateFeeWidth) + ea,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxSizing: "border-box",
            },
            child: {
              style: {
                display: "block",
                position: "relative",
                width: withOut(textMargin * 2, ea),
                overflow: "scroll",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  text: "출장비",
                  style: {
                    display: "block",
                    position: "relative",
                    top: String(contentsTextTop) + ea,
                    fontSize: String(contentsWordingSize) + ea,
                    fontWeight: String(800),
                    color: colorChip.white,      
                  }
                }
              }
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "relative",
              borderRight: "1px solid " + colorChip.gray3,
              width: "calc(" + withOut((dateFeeWidth * 2) + panTitleBoxHeight, ea) + " / 2)",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxSizing: "border-box",
            },
            child: {
              style: {
                display: "block",
                position: "relative",
                width: withOut(textMargin * 2, ea),
                overflow: "scroll",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  text: desktop ? "출발 장소" : "출발",
                  style: {
                    display: "block",
                    position: "relative",
                    top: String(contentsTextTop) + ea,
                    fontSize: String(contentsWordingSize) + ea,
                    fontWeight: String(800),
                    color: colorChip.white,      
                  }
                }
              }
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "relative",
              width: "calc(" + withOut((dateFeeWidth * 2) + panTitleBoxHeight, ea) + " / 2)",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            },
            child: {
              style: {
                display: "block",
                position: "relative",
                width: withOut(textMargin * 2, ea),
                overflow: "scroll",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  text: desktop ? "도착 장소" : "도착",
                  style: {
                    display: "block",
                    position: "relative",
                    top: String(contentsTextTop) + ea,
                    fontSize: String(contentsWordingSize) + ea,
                    fontWeight: String(800),
                    color: colorChip.white,      
                  }
                }
              }
            }
          },
        ],
      },
    ] 
  });

  // buttons
  createNode({
    mother: basePan,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      height: String(buttonTongHeight) + ea,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: desktop ? "end" : "center",
      paddingTop: String(buttonTongPaddingTop) + ea,
    },
    child: {
      event: {
        click: travelAddEvent,
      },
      style: {
        display: "inline-flex",
        position: "relative",
        background: desktop ? colorChip.gradientGreen : colorChip.gradientGray,
        height: String(buttonHeight) + ea,
        borderRadius: String(5) + "px",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: String(buttonPadding) + ea,
        paddingRight: String(buttonPadding) + ea,
        cursor: "pointer",
      },
      child: {
        text: "출장 내역 추가",
        style: {
          display: "block",
          fontSize: String(buttonSize) + ea,
          fontWeight: String(buttonWeight),
          color: colorChip.white,
          position: "relative",
          top: String(buttonTextTop) + ea,
          cursor: "pointer",
        }
      }
    }
  });

  ajaxJson({
    mode: "get",
    proid: project.proid,
    desid: project.desid,
  }, SECONDHOST + "/projectDesignerTravel", { equal: true }).then(({ travel }) => {
    initialDomSetting(travel);
  }).catch((err) => {
    console.log(err);
  })

}

ProcessJs.prototype.uploadFiles = function (project, thisStatusNumber, photoBoo) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker } = GeneralJs;
  const { ea, media, totalContents } = this;
  const client = project.client;
  const designer = project.designer;
  const requestNumber = project.requestNumber;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const fileInputClassName = "fileInputClassName";
  let serviceContents;
  let thisKey;
  let thisTitle;

  serviceContents = this.panContents;
  thisKey = serviceContents[thisStatusNumber].key;
  thisTitle = serviceContents[thisStatusNumber].title;

  if (photoBoo) {
    return async function (e) {
      try {
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        const name = this.getAttribute("name");
        const designer = this.getAttribute("designer");
        let input, removeTargets;

        if (!instance.nowUploading) {

          removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
          for (let dom of removeTargets) {
            dom.remove();
          }
  
          input = createNode({
            mother: document.body,
            class: [ fileInputClassName ],
            mode: "input",
            event: {
              change: async function (e) {
                try {
                  const proid = this.getAttribute("proid");
                  const desid = this.getAttribute("desid");
                  const client = this.getAttribute("client");
                  const designer = this.getAttribute("designer");
                  const thisKey = this.getAttribute("name");
                  const thisTitle = this.getAttribute("title");
                  let thisFiles, formData, res;
                  let removeTargets;
                  let loading;
                  let hash;
  
                  thisFiles = [ ...this.files ];
  
                  if (thisFiles.length >= 1) {
                    formData = new FormData();
                    formData.enctype = "multipart/form-data";
                    formData.append("proid", proid);
                    formData.append("desid", desid);
                    formData.append("client", client);
                    formData.append("type", "photo");
                    for (let i = 0; i < thisFiles.length; i++) {
                      formData.append("file_" + thisKey + "_" + String(i), thisFiles[i]);
                    }
  
                    if (!instance.nowUploading) {
                      loading = instance.asyncLoadingBlock();
  
                      ({ hash } = await ajaxJson({ mode: "crypto", string: String((new Date()).valueOf()) }, SECONDHOST + "/homeliaisonCrypto", { equal: true }));
                      formData.append("name", hash);
    
                      res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary", loading.progress);
                      await ajaxJson({ mode: "chain", proid, desid, key: thisKey }, SECONDHOST + "/projectDesignerStatus");

                      await instance.reloadMenuArea(project);

                      loading.remove();
                      
                    } else {
                      instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");
                    }
  
                  }
  
                } catch (e) {
                  console.log(e);
                  window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                  window.location.reload();
                }
              }
            },
            attribute: {
              type: "file",
              name: thisKey,
              title: thisTitle,
              multiple: "true",
              proid,
              desid,
              client: name,
              designer,
              accept: "image/*, application/pdf",
            },
            style: {
              display: "none",
            }
          });
  
          input.click();

        } else {

          instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");

        }

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }
  } else {
    return async function (e) {
      try {
        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        const name = this.getAttribute("name");
        const designer = this.getAttribute("designer");
        let input, removeTargets;

        if (!instance.nowUploading) {

          removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
          for (let dom of removeTargets) {
            dom.remove();
          }
  
          input = createNode({
            mother: document.body,
            class: [ fileInputClassName ],
            mode: "input",
            event: {
              change: async function (e) {
                try {
                  const proid = this.getAttribute("proid");
                  const desid = this.getAttribute("desid");
                  const client = this.getAttribute("client");
                  const designer = this.getAttribute("designer");
                  const thisKey = this.getAttribute("name");
                  const thisTitle = this.getAttribute("title");
                  let thisFiles, formData, res;
                  let removeTargets;
                  let loading;
                  let hash;
                  let rawResponse;
  
                  thisFiles = [ ...this.files ];
  
                  if (thisFiles.length >= 1) {
                    formData = new FormData();
                    formData.enctype = "multipart/form-data";
                    formData.append("proid", proid);
                    formData.append("desid", desid);
                    formData.append("client", client);
                    formData.append("type", "file");
                    formData.append("file_" + thisKey + "_" + String(0), thisFiles[0]);
  
                    if (!instance.nowUploading) {
  
                      rawResponse = null;
                      rawResponse = await GeneralJs.prompt("파일에 대한 간단한 이름 또는 메모를 적어주세요! (예) 주방_시공의뢰서_1");
                      if (typeof rawResponse !== "string" || rawResponse.trim() === '') {
                        rawResponse = "메모 없음";
                      }
                      rawResponse = rawResponse.replace(/[\=\/\\\(\)\?\+\&]/gi, '').replace(/ /gi, '_');
  
                      loading = instance.asyncLoadingBlock();
  
                      ({ hash } = await ajaxJson({ mode: "crypto", string: rawResponse }, SECONDHOST + "/homeliaisonCrypto", { equal: true }));
                      formData.append("name", hash);
    
                      res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary", loading.progress);
                      await ajaxJson({ mode: "chain", proid, desid, key: thisKey }, SECONDHOST + "/projectDesignerStatus");
    
                      await instance.reloadMenuArea(project);

                      loading.remove();
  
                    } else {
                      instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");
                    }
  
                  }
  
                } catch (e) {
                  console.log(e);
                  window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                  window.location.reload();
                }
              }
            },
            attribute: {
              type: "file",
              name: thisKey,
              title: thisTitle,
              proid,
              desid,
              client: name,
              designer,
            },
            style: {
              display: "none",
            }
          });
  
          input.click();

        } else {

          instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");

        }

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }

  }

}

ProcessJs.prototype.dropFiles = function (project, thisStatusNumber, photoBoo) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, removeByClass } = GeneralJs;
  const { ea, media, totalContents } = this;
  const client = project.client;
  const designer = project.designer;
  const requestNumber = project.requestNumber;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const fileInputClassName = "fileInputClassName";
  let serviceContents;
  let thisKey;
  let thisTitle;

  serviceContents = this.panContents;
  thisKey = serviceContents[thisStatusNumber].key;
  thisTitle = serviceContents[thisStatusNumber].title;

  if (photoBoo) {
    return async function (e) {
      try {

        e.preventDefault();
        e.stopPropagation();

        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        const name = this.getAttribute("name");
        const designer = this.getAttribute("designer");
        let input, changeEvent;

        if (!instance.nowUploading) {

          removeByClass(fileInputClassName);

          changeEvent = async function (e) {
            try {
              const proid = this.getAttribute("proid");
              const desid = this.getAttribute("desid");
              const client = this.getAttribute("client");
              const designer = this.getAttribute("designer");
              const thisKey = this.getAttribute("name");
              const thisTitle = this.getAttribute("title");
              let thisFiles, formData, res;
              let removeTargets;
              let loading;
              let hash;
  
              thisFiles = [ ...this.files ].filter((file) => {
                return /^image/gi.test(file.type) || file.type.trim() === "application/pdf";
              });
  
              if (thisFiles.length >= 1) {
                formData = new FormData();
                formData.enctype = "multipart/form-data";
                formData.append("proid", proid);
                formData.append("desid", desid);
                formData.append("client", client);
                formData.append("type", "photo");
                for (let i = 0; i < thisFiles.length; i++) {
                  formData.append("file_" + thisKey + "_" + String(i), thisFiles[i]);
                }
  
                if (!instance.nowUploading) {
  
                  loading = instance.asyncLoadingBlock();
  
                  ({ hash } = await ajaxJson({ mode: "crypto", string: String((new Date()).valueOf()) }, SECONDHOST + "/homeliaisonCrypto", { equal: true }));
                  formData.append("name", hash);
    
                  res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary", loading.progress);
                  await ajaxJson({ mode: "chain", proid, desid, key: thisKey }, SECONDHOST + "/projectDesignerStatus");
    
                  await instance.reloadMenuArea(project);

                  loading.remove();

                } else {
                  instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");
                }
  
              }
  
            } catch (e) {
              console.log(e);
              window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
  
          input = createNode({
            mother: document.body,
            class: [ fileInputClassName ],
            mode: "input",
            event: {
              change: changeEvent
            },
            attribute: {
              type: "file",
              name: thisKey,
              title: thisTitle,
              multiple: "true",
              proid,
              desid,
              client: name,
              designer,
              accept: "image/*, application/pdf",
            },
            style: {
              display: "none",
            }
          });
          input.files = e.dataTransfer.files;
          changeEvent.call(input, e);

        } else {

          instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");

        }

        this.style.background = colorChip.gray1;

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }
  } else {
    return async function (e) {
      try {

        e.preventDefault();
        e.stopPropagation();

        const proid = this.getAttribute("proid");
        const desid = this.getAttribute("desid");
        const name = this.getAttribute("name");
        const designer = this.getAttribute("designer");
        let input, changeEvent;

        if (!instance.nowUploading) {

          removeByClass(fileInputClassName);

          changeEvent = async function (e) {
            try {
              const proid = this.getAttribute("proid");
              const desid = this.getAttribute("desid");
              const client = this.getAttribute("client");
              const designer = this.getAttribute("designer");
              const thisKey = this.getAttribute("name");
              const thisTitle = this.getAttribute("title");
              let thisFiles, formData, res;
              let removeTargets;
              let loading;
              let hash;
              let rawResponse;
  
              thisFiles = [ ...this.files ];
  
              if (thisFiles.length >= 1) {
                formData = new FormData();
                formData.enctype = "multipart/form-data";
                formData.append("proid", proid);
                formData.append("desid", desid);
                formData.append("client", client);
                formData.append("type", "file");
                formData.append("file_" + thisKey + "_" + String(0), thisFiles[0]);
  
                if (!instance.nowUploading) {
  
                  rawResponse = null;
                  rawResponse = await GeneralJs.prompt("파일에 대한 간단한 이름 또는 메모를 적어주세요! (예) 주방_시공의뢰서_1");
                  if (typeof rawResponse !== "string" || rawResponse.trim() === '') {
                    rawResponse = "메모 없음";
                  }
                  rawResponse = rawResponse.replace(/[\=\/\\\(\)\?\+\&]/gi, '').replace(/ /gi, '_');
    
                  loading = instance.asyncLoadingBlock();
    
                  ({ hash } = await ajaxJson({ mode: "crypto", string: rawResponse }, SECONDHOST + "/homeliaisonCrypto", { equal: true }));
                  formData.append("name", hash);
    
                  res = await ajaxForm(formData, BRIDGEHOST + "/middlePhotoBinary", loading.progress);
                  await ajaxJson({ mode: "chain", proid, desid, key: thisKey }, SECONDHOST + "/projectDesignerStatus");
    
                  await instance.reloadMenuArea(project);

                  loading.remove();
                  
                } else {
                  instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");
                }
  
              }
  
            } catch (e) {
              console.log(e);
              window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
  
          input = createNode({
            mother: document.body,
            class: [ fileInputClassName ],
            mode: "input",
            event: {
              change: changeEvent
            },
            attribute: {
              type: "file",
              name: thisKey,
              title: thisTitle,
              multiple: "true",
              proid,
              desid,
              client: name,
              designer,
            },
            style: {
              display: "none",
            }
          });
          input.files = e.dataTransfer.files;
          changeEvent.call(input, e);

        } else {

          instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");

        }

        this.style.background = colorChip.gray1;

      } catch (e) {
        console.log(e);
        window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
        window.location.reload();
      }
    }
  }

}

ProcessJs.prototype.uploadLink = function (project, thisStatusNumber) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker } = GeneralJs;
  const { ea, media, totalContents } = this;
  const client = project.client;
  const designer = project.designer;
  const requestNumber = project.requestNumber;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  let serviceContents;
  let thisKey;
  let thisTitle;

  serviceContents = this.panContents;
  thisKey = serviceContents[thisStatusNumber].key;
  thisTitle = serviceContents[thisStatusNumber].title;

  return async function (e) {
    try {
      const cancelKeyword = "httpCancel";
      const proid = this.getAttribute("proid");
      const desid = this.getAttribute("desid");
      const key = this.getAttribute("key");
      let link, memo, loading;

      loading = null;

      do {
        link = await GeneralJs.prompt("제품 링크를 복사 붙여넣기 해주세요!");
        if (link === null) {
          link = cancelKeyword;
        }
      } while (typeof link !== "string" || !/^http/.test(link));

      if (link !== cancelKeyword) {
        memo = await GeneralJs.prompt("링크에 대한 간단한 이름과 타입 등을 적어주세요! (예) 침실협탁_아이보리");
        if (typeof memo !== "string" || memo.trim() === '') {
          memo = "메모 없음";
        }

        loading = instance.mother.grayLoading();
        await ajaxJson({ proid, desid, key, link: window.encodeURIComponent(link.trim()), memo: memo.trim() }, BRIDGEHOST + "/middleLinkSave");
      }

      await instance.reloadMenuArea(project);

      if (loading !== null) {
        loading.remove();
      }

    } catch (e) {
      console.log(e);
    }
  }

}

ProcessJs.prototype.plusMemo = function (project, thisStatusNumber, customKey = null, customTitle = null) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker } = GeneralJs;
  const client = project.client;
  const requestNumber = project.requestNumber;
  const designer = project.designer;
  const { ea, media, totalContents } = this;
  const memoFixedTargetsClassName = "memoFixedTargetsClassName";
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  let serviceContents;
  let thisKey;
  let thisTitle;
  let whitePromptWidth, whitePromptHeight;
  let whitePromptInnerPaddingTop;
  let whitePromptInnerPaddingLeft;
  let whitePromptInnerPaddingBottom;
  let titleArea, contentsArea;
  let cancelBack;
  let whitePrompt;
  let titleAreaHeight;
  let memoContents;
  let titleContentsBetween;
  let titleSize, titleWeight;
  let contentsSize, contentsWeight, contentsLineHeight;
  let memoJson;

  serviceContents = this.panContents;
  if (thisStatusNumber === -1 && typeof customKey === "string" && typeof customTitle === "string") {
    thisKey = customKey;
    thisTitle = customTitle;
  } else {
    thisKey = serviceContents[thisStatusNumber].key;
    thisTitle = serviceContents[thisStatusNumber].title;
  }

  whitePromptWidth = <%% 900, 800, 700, 600, 88 %%>;
  whitePromptHeight = <%% 492, 492, 492, 420, 120 %%>;

  whitePromptInnerPaddingLeft = <%% 44, 44, 40, 36, 6 %%>;
  whitePromptInnerPaddingTop = <%% 38, 38, 36, 32, 6 %%>;
  whitePromptInnerPaddingBottom = <%% 44, 44, 40, 36, 6 %%>;

  titleAreaHeight = <%% 40, 40, 38, 36, 7.5 %%>;

  titleContentsBetween = <%% 24, 24, 24, 16, 3.6 %%>;

  titleSize = <%% 21, 21, 20, 18, 4 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;

  contentsSize = <%% 14, 14, 14, 13, 2.8 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

  return async function (e) {
    try {
      const proid = this.getAttribute("proid");
      const desid = this.getAttribute("desid");
      const name = this.getAttribute("name");
      const designer = this.getAttribute("designer");
      const zIndex = 4;

      memoJson = await ajaxJson({
        mode: "get",
        proid: project.proid,
        desid: designer.desid,
        key: thisKey,
        memo: "",
      }, SECONDHOST + "/projectDesignerMemo", { equal: true });

      memoContents = memoJson.contents.memo;

      cancelBack = createNode({
        mother: totalContents,
        class: [ memoFixedTargetsClassName ],
        event: {
          click: function (e) {
            const removeTargets = document.querySelectorAll('.' + memoFixedTargetsClassName);
            for (let dom of removeTargets) {
              dom.remove();
            }
          }
        },
        style: {
          display: "block",
          position: "fixed",
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(0),
          background: colorChip.realBlack,
          opacity: String(0.7),
          zIndex: String(zIndex),
        }
      });

      whitePrompt = createNode({
        mother: totalContents,
        class: [ memoFixedTargetsClassName ],
        style: {
          display: "block",
          position: "fixed",
          paddingLeft: String(whitePromptInnerPaddingLeft) + ea,
          paddingRight: String(whitePromptInnerPaddingLeft) + ea,
          paddingTop: String(whitePromptInnerPaddingTop) + ea,
          paddingBottom: String(whitePromptInnerPaddingBottom) + ea,
          width: String(whitePromptWidth - (whitePromptInnerPaddingLeft * 2)) + ea,
          height: String(whitePromptHeight - (whitePromptInnerPaddingTop + whitePromptInnerPaddingBottom)) + ea,
          top: "calc(calc(calc(calc(100% - " + String(instance.belowHeight) + "px" + ") / 2) - " + String(whitePromptHeight / 2) + ea + ") + " + String(instance.naviHeight) + "px" + ")",
          left: withOut(50, whitePromptWidth / 2, ea),
          background: colorChip.white,
          borderRadius: String(5) + "px",
          boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
          animation: "fadeuplite 0.3s ease forwards",
          zIndex: String(zIndex),
        }
      });

      titleArea = createNode({
        mother: whitePrompt,
        style: {
          display: "block",
          position: "relative",
          borderBottom: "1px solid " + colorChip.black,
          height: String(titleAreaHeight) + ea,
        },
        children: [
          {
            text: thisTitle + " 관련 MEMO",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(titleWeight),
              color: colorChip.black,
            }
          }
        ]
      });

      contentsArea = createNode({
        mother: whitePrompt,
        style: {
          display: "block",
          position: "relative",
          paddingTop: String(titleContentsBetween) + ea,
          width: withOut(0),
          height: withOut(titleAreaHeight + titleContentsBetween, ea),
          borderBottom: "1px solid " + colorChip.gray3,
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              overflow: "scroll",
              top: String(0),
              left: String(0),
              width: withOut(0),
              height: withOut(0),
            },
            children: [
              {
                mode: "textarea",
                text: memoContents,
                event: {
                  focus: function (e) {
                    this.style.color = colorChip.green;
                  },
                  blur: async function (e) {
                    try {
                      this.style.color = colorChip.black;
                      await ajaxJson({
                        mode: "update",
                        proid: project.proid,
                        desid: designer.desid,
                        key: thisKey,
                        memo: this.value.trim(),
                      }, SECONDHOST + "/projectDesignerMemo");
                    } catch (e) {
                      console.log(e);
                    }
                  }
                },
                style: {
                  position: "relative",
                  fontSize: String(contentsSize) + ea,
                  fontWeight: String(contentsWeight),
                  color: colorChip.black,
                  lineHeight: String(contentsLineHeight),
                  width: withOut(0),
                  height: withOut(0),
                  outline: String(0),
                  border: String(0),
                  background: "transparent",
                }
              }
            ]
          }
        ]
      });


    } catch (e) {
      console.log(e);
    }
  }
}

ProcessJs.prototype.setPanBlocks = async function (project) {
  const instance = this;
  const { ea, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const client = project.client;
  const requestNumber = project.requestNumber;
  const designer = project.designer;
  const hashConst = "homeliaisonHash";
  const targetKeywords = "/photo/designer";
  const targetHref = BRIDGEHOST.replace(/\:3000/gi, '') + targetKeywords + "/" + designer.desid + "/" + project.proid;
  const targetDrive = "/" + designer.desid + "/" + project.proid;
  const { ajaxJson, createNode, colorChip, withOut, cleanChildren, dateToString, isMac, isIphone, swipePatch, blankHref, removeByClass, downloadFile, equalJson } = GeneralJs;
  const motherChildPhotoTongClassName = "motherChildPhotoTongClassName";
  const photoItemInitClassName = "photoItemInitClassName";
  const bigPhotoClassName = "bigPhotoClassName";
  const bigPhotoFixedTargetsClassName = "bigPhotoFixedTargetsClassName";
  const preItemMotherKey = "firstPhoto";
  const preItemHex = "070a916ebdea87fae21233050e1b322eb4694980e1bced5012199be287e2e92d";
  const whiteContextmenuClassName = "whiteContextmenuClassName";
  const fileNameClassName = "fileNameClassName";
  const filePannelDateClassName = "filePannelDateClassName";
  const filePannelCircleClassName = "filePannelCircleClassName";
  const linkTargetKey = [ "productLink" ];
  const emptyDate = client.requests[requestNumber].request.timeline;
  try {
    let itemList;
    let mothers;
    let itemBetween;
    let itemTongHeight;
    let itemTongMarginLeft;
    let itemBlock;
    let motherMatrix;
    let motherMaxNumber;
    let transparentItemsMatrix;
    let index;
    let textTop, textSize, textWeight;
    let divideNumber;
    let bigPhotoPadding;
    let arrowButtonWidth;
    let arrowButtonMargin;
    let bigPhotoClickEvent;
    let fileItemSelectEvent;
    let photoItemSelectEvent;
    let linkItemSelectEvent;
    let itemDivide;
    let preItemList;
    let preIndex;
    let linkTargets;
    let linkContents;
    let link, memo;
    let linkPhotoHeight;
    let linkPhotoMarginBottom;
    let parsedHash;
    let contextmenuEvent;
    let contextSize;
    let contextmenuPadding;
    let contextWidth;
    let contextHeight;
    let preItemHexId;
    let fileItemList, photoItemList, linkItemList;
    let titlePadding;
    let titlePannelWidth, titlePannelBetween;
    let titleMaxWidth;
    let pannelSize, pannelTextTop;
    let pannelCircleWidth, pannelCircleBetween, pannelCircleTop;
    let downloadedList;

    itemBetween = <%% 6, 6, 5, 4, 1 %%>;
    itemTongHeight = <%% 40, 40, 36, 32, 8 %%>;
    itemTongMarginLeft = <%% 12, 12, 12, 10, 1 %%>;
    itemDivide = <%% 5, 4, 3, 3, 2 %%>;

    textTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;
    textSize = <%% 14, 14, 13, 12, 2.7 %%>;
    textWeight = <%% 500, 500, 500, 500, 500 %%>;

    contextmenuPadding = <%% 8, 8, 7, 6, 1 %%>;
    contextSize = <%% 13, 13, 12, 11, 2.5 %%>;
    contextWidth = <%% 130, 130, 120, 100, 20 %%>;
    contextHeight = <%% 32, 32, 30, 28, 6 %%>;

    divideNumber = <%% 5, 4, 3, 3, 2 %%>;

    bigPhotoPadding = <%% 48, 48, 48, 40, 24 %%>;

    arrowButtonWidth = <%% 16, 16, 16, 16, 2.5 %%>;
    arrowButtonMargin = <%% 20, 20, 20, 20, 2.5 %%>;

    linkPhotoHeight = <%% 238, 211, 244, 195, 40 %%>;
    linkPhotoMarginBottom = <%% 0, 0, 0, 0, 0 %%>;

    titlePadding = <%% 16, 16, 15, 14, 3.1 %%>;
    titlePannelWidth = <%% 54, 54, 50, 48, 9.8 %%>;
    titlePannelBetween = <%% 8, 8, 6, 4, 1 %%>;
    titleMaxWidth = <%% 1000, 1000, 900, 800, 100 %%>;

    pannelSize = <%% 12, 12, 11, 10, 2.5 %%>;
    pannelTextTop = <%% (isMac() ? -1.5 : 0.5), (isMac() ? -1.5 : 0.5), (isMac() ? -1.5 : 0.5), (isMac() ? -1.5 : 0.5), -0.3 %%>;

    pannelCircleWidth = <%% 6, 6, 6, 5, 1.2 %%>;
    pannelCircleBetween = <%% 6, 6, 6, 5, 1.2 %%>;
    pannelCircleTop = <%% (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isIphone() ? -0.25 : -0.2) %%>;

    bigPhotoClickEvent = function (e) {
      e.preventDefault();
      e.stopPropagation();
      const self = this;
      const totalContents = document.querySelector("#totalcontents");
      const motherNumber = Number(this.getAttribute("number"));
      const zIndex = 4;
      let order, key, next, previous;
      let cancelBack, photoPrompt;
      let renderPhoto;

      next = {};
      previous = {};

      renderPhoto = (targetDom) => {
        const width = targetDom.getBoundingClientRect().width;
        const height = targetDom.getBoundingClientRect().height;
        const original = targetDom.getAttribute("original");
        const ratio = width / height;
        let thisWidth, thisHeight;
        let bigPhoto;

        order = Number(targetDom.getAttribute("order"));
        key = targetDom.getAttribute("key");
        next = document.querySelector('.' + photoItemInitClassName + "_" + key + "_" + String(order + 1));
        if (next === null) {
          next = document.querySelector('.' + photoItemInitClassName + "_" + key + "_" + String(0));
        }
        previous = document.querySelector('.' + photoItemInitClassName + "_" + key + "_" + String(order - 1));
        if (previous === null) {
          previous = document.querySelector('.' + photoItemInitClassName + "_" + key + "_" + String(motherMatrix[motherNumber] - 1));
        }

        if (document.querySelector('.' + bigPhotoClassName) !== null) {
          document.querySelector('.' + bigPhotoClassName).remove();
        }

        if (((window.innerHeight - instance.naviHeight) - (bigPhotoPadding * 2)) * ratio > window.innerWidth - (bigPhotoPadding * 2)) {
          thisWidth = window.innerWidth - (bigPhotoPadding * 2);
          thisHeight = thisWidth / ratio;
        } else {
          thisHeight = (window.innerHeight - instance.naviHeight) - (bigPhotoPadding * 2);
          thisWidth = thisHeight * ratio;
        }

        bigPhoto = createNode({
          mother: totalContents,
          mode: "img",
          class: [ bigPhotoClassName, bigPhotoFixedTargetsClassName ],
          event: {
            selectstart: (e) => { e.preventDefault(); },
          },
          attribute: {
            src: original
          },
          style: {
            display: "block",
            position: "fixed",
            top: "calc(calc(calc(calc(100% - " + String(instance.naviHeight) + "px" + ") / 2) - " + String(thisHeight / 2) + "px" + ") + " + String(instance.naviHeight) + "px" + ")",
            left: withOut(50, (thisWidth / 2), "px"),
            width: String(thisWidth) + "px",
            height: String(thisHeight) + "px",
            zIndex: String(zIndex),
            borderRadius: String(5) + "px",
          }
        });

        if (mobile) {
          swipePatch("left", function () {
            renderPhoto(next);
          }, bigPhoto);
          swipePatch("right", function () {
            renderPhoto(previous);
          }, bigPhoto);
        }

      }

      cancelBack = createNode({
        mother: totalContents,
        class: [ bigPhotoFixedTargetsClassName ],
        event: {
          click: function (e) {
            const removeTargets = document.querySelectorAll('.' + bigPhotoFixedTargetsClassName);
            for (let dom of removeTargets) {
              dom.remove();
            }
          }
        },
        style: {
          display: "block",
          position: "fixed",
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(0),
          background: colorChip.realBlack,
          opacity: String(0.7),
          zIndex: String(zIndex),
        }
      });

      if (desktop) {
        createNode({
          mother: totalContents,
          class: [ bigPhotoFixedTargetsClassName ],
          mode: "svg",
          source: instance.mother.returnArrow("left", colorChip.white),
          event: {
            selectstart: (e) => { e.preventDefault(); },
            click: function (e) {
              renderPhoto(previous);
            }
          },
          style: {
            display: "block",
            position: "fixed",
            top: "calc(calc(calc(calc(100% - " + String(instance.naviHeight) + "px" + ") / 2) - " + String(arrowButtonWidth / 2) + ea + ") + " + String(instance.naviHeight) + "px" + ")",
            left: String(arrowButtonMargin) + ea,
            width: String(arrowButtonWidth) + ea,
            zIndex: String(zIndex),
            cursor: "pointer",
          }
        });

        createNode({
          mother: totalContents,
          class: [ bigPhotoFixedTargetsClassName ],
          mode: "svg",
          source: instance.mother.returnArrow("right", colorChip.white),
          event: {
            selectstart: (e) => { e.preventDefault(); },
            click: function (e) {
              renderPhoto(next);
            }
          },
          style: {
            display: "block",
            position: "fixed",
            top: "calc(calc(calc(calc(100% - " + String(instance.naviHeight) + "px" + ") / 2) - " + String(arrowButtonWidth / 2) + ea + ") + " + String(instance.naviHeight) + "px" + ")",
            right: String(arrowButtonMargin) + ea,
            width: String(arrowButtonWidth) + ea,
            zIndex: String(zIndex),
            cursor: "pointer",
          }
        });
      }

      renderPhoto(self);

    }

    fileItemSelectEvent = function (e) {
      e.preventDefault();
      e.stopPropagation();
      const original = this.getAttribute("original");
      const key = this.getAttribute("key");
      const toggle = this.getAttribute("toggle");
      const hex = this.getAttribute("hex");
      const exe = this.getAttribute("exe");
      const type = this.getAttribute("type");

      if (toggle === "off") {

        this.style.background = colorChip.green;
        this.querySelector('.' + fileNameClassName).style.color = colorChip.white;
        this.querySelector('.' + filePannelDateClassName).style.color = colorChip.liteGreen;
        this.querySelector('.' + filePannelCircleClassName).style.background = colorChip.liteGreen;

        this.setAttribute("toggle", "on");
        instance.itemList.push({ original, key, hex, exe, type });
      } else {

        this.style.background = desktop ? colorChip.white : colorChip.gray0;
        this.querySelector('.' + fileNameClassName).style.color = colorChip.black;
        this.querySelector('.' + filePannelDateClassName).style.color = colorChip.deactive;
        this.querySelector('.' + filePannelCircleClassName).style.background = instance.downloaded.map((o) => { return o.file }).includes(original.split("/")[original.split("/").length - 1]) ? colorChip.gray4 : colorChip.green;

        instance.itemList.splice(instance.itemList.findIndex((obj) => {
          return obj.original === original;
        }), 1);
        this.setAttribute("toggle", "off");
      }

    }

    linkItemSelectEvent = function (e) {
      e.preventDefault();
      e.stopPropagation();
      const original = this.getAttribute("original");
      const key = this.getAttribute("key");
      const toggle = this.getAttribute("toggle");
      const hex = this.getAttribute("hex");
      const exe = this.getAttribute("exe");
      const type = this.getAttribute("type");

      if (toggle === "off") {

        this.lastChild.style.background = colorChip.green;
        this.lastChild.querySelector('.' + fileNameClassName).style.color = colorChip.white;
        this.lastChild.querySelector('.' + filePannelDateClassName).style.color = colorChip.liteGreen;
        this.lastChild.querySelector('.' + filePannelCircleClassName).style.background = colorChip.liteGreen;

        this.setAttribute("toggle", "on");
        instance.itemList.push({ original, key, hex, exe, type });
      } else {

        this.lastChild.style.background = desktop ? colorChip.white : colorChip.gray0;
        this.lastChild.querySelector('.' + fileNameClassName).style.color = colorChip.black;
        this.lastChild.querySelector('.' + filePannelDateClassName).style.color = colorChip.deactive;
        this.lastChild.querySelector('.' + filePannelCircleClassName).style.background = colorChip.green;

        instance.itemList.splice(instance.itemList.findIndex((obj) => {
          return obj.original === original;
        }), 1);
        this.setAttribute("toggle", "off");
      }

    }

    photoItemSelectEvent = function (e) {
      e.preventDefault();
      e.stopPropagation();
      const original = this.getAttribute("original");
      const key = this.getAttribute("key");
      const toggle = this.getAttribute("toggle");
      const hex = this.getAttribute("hex");
      const exe = this.getAttribute("exe");
      const type = this.getAttribute("type");

      if (toggle === "off") {

        this.lastChild.style.opacity = String(0.6);

        this.setAttribute("toggle", "on");
        instance.itemList.push({ original, key, hex, exe, type });
      } else {

        this.lastChild.style.opacity = String(0);

        instance.itemList.splice(instance.itemList.findIndex((obj) => {
          return obj.original === original;
        }), 1);
        this.setAttribute("toggle", "off");
      }

    }

    contextmenuEvent = (type) => {
      return function (e) {
        e.preventDefault();

        let forceSelect;

        forceSelect = 0;
        if (this.getAttribute("toggle") === "off") {
          if (type === "file") {
            fileItemSelectEvent.call(this, e);
          } else if (type === "photo") {
            photoItemSelectEvent.call(this, e);
          } else {
            linkItemSelectEvent.call(this, e);
          }
          forceSelect = 1;
        }

        const self = this;
        const { top, left, height, width } = this.getBoundingClientRect();
        let cancelBack, whitePrompt;
        let cancelEvent;
        let link, original, key;

        cancelEvent = function (e) {
          removeByClass(whiteContextmenuClassName);
          if (forceSelect === 1) {
            if (type === "file") {
              fileItemSelectEvent.call(self, e);
            } else if (type === "photo") {
              photoItemSelectEvent.call(self, e);
            } else {
              linkItemSelectEvent.call(self, e);
            }
          }
        }

        cancelBack = createNode({
          mother: totalContents,
          class: [ whiteContextmenuClassName ],
          event: {
            click: cancelEvent
          },
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            width: withOut(0, ea),
            height: withOut(0, ea),
            background: "transparent",
            zIndex: String(5),
          }
        });

        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteContextmenuClassName ],
          style: {
            display: "block",
            position: "fixed",
            top: String(e.y) + "px",
            left: String(e.x) + "px",
            padding: String(contextmenuPadding) + ea,
            background: colorChip.white,
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
            animation: "fadeuplite 0.3s ease forwards",
            zIndex: String(5),
          }
        });

        if (type !== "link") {
          createNode({
            mother: whitePrompt,
            event: {
              click: async function (e) {
                let parsedString, loading;
                try {
                  if (instance.itemList.length === 0) {
                    window.alert("파일을 먼저 선택해주세요!");
                  } else {
                    for (let { original, type, hex, exe } of instance.itemList) {
                      loading = instance.mother.whiteProgressLoading();
                      if (type === "photo") {
                        await downloadFile(original, null, loading.progress.firstChild);
                      } else {
                        parsedString = await ajaxJson({ mode: "decrypto", hash: hex }, SECONDHOST + "/homeliaisonCrypto", { equal: true });
                        await downloadFile(original, parsedString.string.replace(/ /gi, "_") + "." + exe, loading.progress.firstChild);
                      }
                      loading.remove();
                    }
                    cancelEvent.call(self, e);
                    await instance.setPanBlocks(project);
                  }
                } catch (e) {
                  console.log(e);
                  window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                }
              }
            },
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: String(contextWidth) + ea,
              height: String(contextHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray1,
              marginBottom: String(itemBetween) + ea,
              cursor: "pointer",
            },
            child: {
              text: "파일 다운로드",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contextSize) + ea,
                fontWeight: String(textWeight),
                color: colorChip.black,
                top: String(textTop) + ea,
              }
            }
          });
          createNode({
            mother: whitePrompt,
            event: {
              click: async function (e) {
                let parsedString, fileMap;
                try {
                  if (instance.itemList.length === 0) {
                    window.alert("파일을 먼저 선택해주세요!");
                  } else {
                    if (window.confirm("선택한 파일을 삭제하시겠습니까?")) {
                      fileMap = instance.itemList.map(({ original }) => {
                        if ((new RegExp(targetKeywords, "g")).test(original)) {
                          const [ protocol, host, const1, const2, desid, proid, fileName ] = original.split("/").filter((str) => { return str !== '' });
                          return { desid, proid, fileName, mode: "designer" };
                        } else {
                          const [ protocol, host, const1, const2, folder, kind, fileName ] = original.split("/").filter((str) => { return str !== '' });
                          return { folder, kind, fileName, mode: "client" };
                        }
                      });
                      await ajaxJson({ targets: fileMap }, BRIDGEHOST + "/middlePhotoRemove");
                    }
                    cancelEvent.call(self, e);
                    await instance.setPanBlocks(project);
                  }
                } catch (e) {
                  console.log(e);
                  window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                }
              }
            },
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: String(contextWidth) + ea,
              height: String(contextHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray1,
              marginBottom: String(itemBetween) + ea,
              cursor: "pointer",
            },
            child: {
              text: "파일 삭제",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contextSize) + ea,
                fontWeight: String(textWeight),
                color: colorChip.black,
                top: String(textTop) + ea,
              }
            }
          });
        } else {
          link = this.getAttribute("link");
          original = this.getAttribute("original");
          key = this.getAttribute("key");
          createNode({
            mother: whitePrompt,
            attribute: {
              link,
            },
            event: {
              click: function (e) {
                const link = this.getAttribute("link");
                blankHref(link);
                cancelEvent.call(self, e);
              },
            },
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: String(contextWidth) + ea,
              height: String(contextHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray1,
              marginBottom: String(itemBetween) + ea,
              cursor: "pointer",
            },
            child: {
              text: "링크 열기",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contextSize) + ea,
                fontWeight: String(textWeight),
                color: colorChip.black,
                top: String(textTop) + ea,
              }
            }
          });
          createNode({
            mother: whitePrompt,
            attribute: { original },
            event: {
              click: async function (e) {
                const original = this.getAttribute("original");
                let parsedString, fileMap;
                try {
                  if (instance.itemList.length === 0) {
                    window.alert("파일을 먼저 선택해주세요!");
                  } else {
                    if (window.confirm("선택한 파일을 삭제하시겠습니까?")) {
                      fileMap = instance.itemList.map(({ original }) => {
                        if ((new RegExp(targetKeywords, "g")).test(original)) {
                          const [ protocol, host, const1, const2, desid, proid, fileName ] = original.split("/").filter((str) => { return str !== '' });
                          return { desid, proid, fileName, mode: "designer" };
                        } else {
                          const [ protocol, host, const1, const2, folder, kind, fileName ] = original.split("/").filter((str) => { return str !== '' });
                          return { folder, kind, fileName, mode: "client" };
                        }
                      });
                      await ajaxJson({ targets: fileMap }, BRIDGEHOST + "/middlePhotoRemove");
                    }
                    cancelEvent.call(self, e);
                    await instance.setPanBlocks(project);
                  }
                } catch (e) {
                  console.log(e);
                  window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                }
              }
            },
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: String(contextWidth) + ea,
              height: String(contextHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray1,
              marginBottom: String(itemBetween) + ea,
              cursor: "pointer",
            },
            child: {
              text: "링크 삭제",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contextSize) + ea,
                fontWeight: String(textWeight),
                color: colorChip.black,
                top: String(textTop) + ea,
              }
            }
          });
        }
        createNode({
          mother: whitePrompt,
          event: {
            click: async function (e) {
              let parsedString, fileMap;
              let string;
              let newString;
              let updateMap;
              let hash;
              let loading;
              let hex, desid, proid, fileName;
              let folder, kind;
              let mode;

              try {
                if (instance.itemList.length === 0) {
                  window.alert("파일을 먼저 선택해주세요!");
                } else {

                  fileMap = instance.itemList.map(({ original, hex }) => {
                    if ((new RegExp(targetKeywords, "g")).test(original)) {
                      const [ protocol, host, const1, const2, desid, proid, fileName ] = original.split("/").filter((str) => { return str !== '' });
                      return { desid, proid, fileName, hex, mode: "designer" };
                    } else {
                      const [ protocol, host, const1, const2, folder, kind, fileName ] = original.split("/").filter((str) => { return str !== '' });
                      return { folder, kind, fileName, hex, mode: "client" };
                    }
                  });

                  updateMap = [];

                  for (let obj of fileMap) {
                    hex = obj.hex;
                    fileName = obj.fileName;
                    mode = obj.mode;

                    ({ string } = await ajaxJson({ mode: "decrypto", hash: hex }, SECONDHOST + "/homeliaisonCrypto", { equal: true }));
                    if (instance.isEmptyString(string)) {
                      string = '';
                    }

                    newString = null;
                    newString = await GeneralJs.prompt("파일에 대한 간단한 이름 또는 메모를 적어주세요! (예) 주방_시공의뢰서_1", string);
                    if (typeof newString !== "string" || newString.trim() === '') {
                      newString = "메모 없음";
                    }

                    newString = newString.replace(/[\=\/\\\(\)\?\+\&]/gi, '').replace(/ /gi, '_');
                    ({ hash } = await ajaxJson({ mode: "crypto", string: newString }, SECONDHOST + "/homeliaisonCrypto", { equal: true }));

                    if (mode === "designer") {
                      desid = obj.desid;
                      proid = obj.proid;
                      updateMap.push({ desid, proid, fileName, hash, mode });
                    } else {
                      folder = obj.folder;
                      kind = obj.kind;
                      updateMap.push({ folder, kind, fileName, hash, mode });
                    }
                  }

                  loading = instance.mother.grayLoading();
                  await ajaxJson({ targets: updateMap }, BRIDGEHOST + "/middlePhotoUpdate");
                  cancelEvent.call(self, e);
                  await instance.setPanBlocks(project);

                  loading.remove();
                }
              } catch (e) {
                console.log(e);
                window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              }
            }
          },
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: String(contextWidth) + ea,
            height: String(contextHeight) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gray1,
            marginBottom: String(itemBetween) + ea,
            cursor: "pointer",
          },
          child: {
            text: "메모 수정",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contextSize) + ea,
              fontWeight: String(textWeight),
              color: colorChip.black,
              top: String(textTop) + ea,
            }
          }
        });
        createNode({
          mother: whitePrompt,
          event: {
            click: async function (e) {
              try {
                const host = FRONTHOST.replace(/^https\:\/\//gi, '');
                const path = "project";

                if (instance.itemList.length === 0) {
                  window.alert("파일을 먼저 선택해주세요!");
                } else {
                  const targets = equalJson(JSON.stringify(instance.panContents));
                  const target = targets.find((obj) => { return obj.key === instance.itemList[0].key })
                  await ajaxJson({
                    method: "projectDetail",
                    name: client.name,
                    phone: client.phone,
                    option: {
                      client: client.name,
                      designer: designer.designer,
                      file: target.action[0].name,
                      host: host,
                      path: path,
                      proid: project.proid,
                      key: instance.itemList[0].key,
                    }
                  }, BACKHOST + "/alimTalk");
                  window.alert(client.name + " 고객님에게 알림톡을 전송하였습니다!");
                  cancelEvent.call(self, e);
                }

              } catch (e) {
                console.log(e);
              }
            }
          },
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: String(contextWidth) + ea,
            height: String(contextHeight) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gray1,
            cursor: "pointer",
          },
          child: {
            text: "고객 알림 보내기",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contextSize) + ea,
              fontWeight: String(textWeight),
              color: colorChip.black,
              top: String(textTop) + ea,
            }
          }
        });

      }
    }

    mothers = this.panList;
    itemList = await ajaxJson({ target: targetDrive }, BRIDGEHOST + "/middlePhotoRead", { equal: true });
    preItemList = await ajaxJson({ cliid: client.cliid }, BRIDGEHOST + "/clientPhoto", { equal: true });

    linkTargets = itemList.filter((str) => { return linkTargetKey.includes(str.split("_")[0]) });
    linkContents = await ajaxJson({ links: linkTargets.map((file) => { return { desid: designer.desid, proid: project.proid, file } }) }, BRIDGEHOST + "/middleLinkParsing", { equal: true });

    downloadedList = await ajaxJson({ mode: "get", desid: designer.desid, proid: project.proid }, SECONDHOST + "/projectDesignerDownloadLog", { equal: true });
    instance.downloaded = downloadedList.download;

    for (let mother of mothers) {
      cleanChildren(mother);
    }

    itemList = itemList.map((raw) => {
      const original = raw;
      const [ key, time, order, hex ] = raw.split("_");
      const [ hexId, exe ] = hex.split(".");
      const id = key + "_" + time + "_" + String(order) + "_" + hexId;
      return [ key, new Date(Number(time)), String(Number(order) + 1) + "." + exe, Number(order), targetHref + "/" + original, exe, id, hexId ];
    }).map(([ key, date, name, order, original, exe, id, hexId ]) => {
      return { key, date, name, order, original, exe, id, hexId };
    });

    itemList.forEach((obj) => {
      if (obj.key === preItemMotherKey) {
        obj.order = preItemList.sitePhoto.length + obj.order;
        obj.name = String(obj.order) + "." + obj.exe;
      }
    });

    preIndex = 1;
    for (let original of preItemList.sitePhoto) {
      preItemHexId = ((new RegExp("^" + hashConst + "_", "g")).test(original.split("/")[original.split("/").length - 1]) ? original.split("/")[original.split("/").length - 1].split("_")[1] : preItemHex);
      itemList.push({
        key: preItemMotherKey,
        date: emptyDate,
        name: String(preIndex) + "." + original.split(".")[original.split(".").length - 1],
        order: preIndex,
        original: original,
        exe: original.split(".")[original.split(".").length - 1],
        id: preItemMotherKey + "_" + String(emptyDate.valueOf()) + "_" + String(preIndex) + "_" + preItemHexId,
        hexId: preItemHexId,
      });
      preIndex++;
    }

    itemList.sort((a, b) => { return a.order - b.order });
    itemList.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });

    for (let item of itemList) {
      for (let i = 0; i < this.panContents.length; i++) {
        if (this.panContents[i].key === item.key) {
          item.mother = mothers[i];
          item.motherNumber = i;
          item.type = this.panContents[i].type;
        }
      }
    }

    motherMatrix = (new Array(this.panContents.length)).fill(0, 0);

    fileItemList = [];
    photoItemList = [];
    linkItemList = [];
    for (let { mother, key, date, name, order, motherNumber, type, original, exe, id, hexId } of itemList) {

      if (type === "file") {

        itemBlock = createNode({
          mother,
          attribute: {
            original,
            key,
            hex: hexId,
            exe,
            type,
            toggle: "off",
            date: dateToString(date).split("-").slice(1).join("/"),
          },
          event: {
            click: fileItemSelectEvent,
            contextmenu: contextmenuEvent(type),
          },
          style: {
            display: "inline-flex",
            justifyContent: "start",
            paddingLeft: String(titlePadding) + ea,
            paddingRight: String(titlePadding) + ea,
            alignItems: "center",
            width: "calc(calc(calc(100% - " + String(itemBetween * itemDivide) + ea + ") / " + String(itemDivide) + ") - " + String(titlePadding * 2) + ea + ")",
            marginRight: String(itemBetween) + ea,
            height: String(itemTongHeight) + ea,
            marginBottom: String(itemBetween) + ea,
            borderRadius: String(5) + "px",
            background: desktop ? colorChip.white : colorChip.gray0,
            cursor: "pointer",
            textAlign: "center",
            verticalAlign: "top",
            overflow: "hidden",
            boxShadow: "0px 1px 8px -6px " + colorChip.shadow,
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: withOut(titlePannelWidth + titlePannelBetween, ea),
                height: withOut(0, ea),
                overflow: "hidden",
                marginRight: String(titlePannelBetween) + ea,
              },
              child: {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(titleMaxWidth) + ea,
                  height: withOut(0, ea),
                  justifyContent: "start",
                  textAlign: "left",
                  alignItems: "center",    
                },
                child: {
                  id,
                  class: [ fileNameClassName ],
                  attribute: {
                    exe,
                    date: dateToString(date).split("-").slice(1).join("/"),
                  },
                  text: dateToString(date).slice(2) + "_" + name,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(textTop) + ea,
                    fontSize: String(textSize) + ea,
                    fontWeight: String(textWeight),
                    color: colorChip.black,
                  },
                  bold: {
                    fontSize: String(textSize) + ea,
                    fontWeight: String(textWeight),
                    color: colorChip.deactive,
                  }
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titlePannelWidth) + ea,
                height: withOut(0, ea),
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
              },
              children: [
                {
                  class: [ filePannelDateClassName ],
                  text: dateToString(date).split("-").slice(1).join("/"),
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(pannelTextTop) + ea,
                    fontSize: String(pannelSize) + ea,
                    fontWeight: String(textWeight),
                    color: colorChip.deactive,
                  },
                },
                {
                  class: [ filePannelCircleClassName ],
                  style: {
                    display: "inline-block",
                    position: "relative",
                    marginLeft: String(pannelCircleBetween) + ea,
                    width: String(pannelCircleWidth) + ea,
                    height: String(pannelCircleWidth) + ea,
                    borderRadius: String(pannelCircleWidth) + ea,
                    top: String(pannelCircleTop) + ea,
                    background: instance.downloaded.map((o) => { return o.file }).includes(original.split("/")[original.split("/").length - 1]) ? colorChip.gray4 : colorChip.green,
                  }
                }
              ]
            }
          ]
        });

        fileItemList.push({
          hash: hexId,
          target: id
        });

      } else if (type === "photo") {

        if (mother.querySelector('.' + motherChildPhotoTongClassName) === null) {
          for (let i = 0; i < divideNumber; i++) {
            createNode({
              mother,
              class: [ motherChildPhotoTongClassName ],
              style: {
                display: "inline-block",
                position: "relative",
                verticalAlign: "top",
                width: "calc(calc(100% - " + String(itemBetween * divideNumber) + ea + ") / " + String(divideNumber) + ")",
                marginRight: String(itemBetween) + ea,
                borderRadius: String(5) + "px",
              },
            });
          }
        }

        itemBlock = createNode({
          mother: [ ...mother.querySelectorAll('.' + motherChildPhotoTongClassName) ][(motherMatrix[motherNumber] % divideNumber)],
          class: [ (photoItemInitClassName + "_" + key + "_" + String(motherMatrix[motherNumber])) ],
          attribute: {
            key,
            original,
            hex: hexId,
            exe,
            type,
            order: String(motherMatrix[motherNumber]),
            number: String(motherNumber),
            toggle: "off"
          },
          event: {
            click: photoItemSelectEvent,
            contextmenu: contextmenuEvent(type),
          },
          style: {
            display: "block",
            position: "relative",
            width: withOut(0),
            borderRadius: String(5) + "px",
            marginBottom: String(itemBetween) + ea,
            cursor: "pointer",
          },
          children: [
            {
              mode: "img",
              attribute: { src: original },
              style: {
                display: "block",
                position: "relative",
                width: withOut(0),
                borderTopLeftRadius: String(5) + "px",
                borderTopRightRadius: String(5) + "px",
              }
            },
            {
              attribute: {
                date: dateToString(date).split("-").slice(1).join("/"),
              },
              style: {
                display: "flex",
                justifyContent: "start",
                paddingLeft: String(titlePadding) + ea,
                paddingRight: String(titlePadding) + ea,
                alignItems: "center",
                width: withOut(titlePadding * 2, ea),
                height: String(itemTongHeight) + ea,
                borderBottomLeftRadius: String(5) + "px",
                borderBottomRightRadius: String(5) + "px",
                background: desktop ? colorChip.white : colorChip.gray0,
                textAlign: "center",
                overflow: "hidden",
                boxShadow: "0px 1px 8px -6px " + colorChip.shadow,
                transition: "all 0.3s ease",
              },
              children: [
                {
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: withOut(titlePannelWidth + titlePannelBetween, ea),
                    height: withOut(0, ea),
                    overflow: "hidden",
                    marginRight: String(titlePannelBetween) + ea,
                  },
                  child: {
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      width: String(titleMaxWidth) + ea,
                      height: withOut(0, ea),
                      justifyContent: "start",
                      textAlign: "left",
                      alignItems: "center",    
                    },
                    child: {
                      id,
                      attribute: {
                        date: dateToString(date).split("-").slice(1).join("/"),
                      },
                      class: [ fileNameClassName ],
                      text: dateToString(date).slice(2) + "_" + name,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        top: String(textTop) + ea,
                        fontSize: String(textSize) + ea,
                        fontWeight: String(textWeight),
                        color: colorChip.black,
                      },
                      bold: {
                        fontSize: String(textSize) + ea,
                        fontWeight: String(textWeight),
                        color: colorChip.deactive,
                      }
                    }
                  }
                },
                {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    width: String(titlePannelWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "end",
                    alignItems: "center",
                    textAlign: "right",
                  },
                  children: [
                    {
                      class: [ filePannelDateClassName ],
                      text: dateToString(date).split("-").slice(1).join("/"),
                      style: {
                        display: "inline-block",
                        position: "relative",
                        top: String(pannelTextTop) + ea,
                        fontSize: String(pannelSize) + ea,
                        fontWeight: String(textWeight),
                        color: colorChip.deactive,
                      },
                    },
                    {
                      class: [ filePannelCircleClassName ],
                      style: {
                        display: "inline-block",
                        position: "relative",
                        marginLeft: String(pannelCircleBetween) + ea,
                        width: String(pannelCircleWidth) + ea,
                        height: String(pannelCircleWidth) + ea,
                        borderRadius: String(pannelCircleWidth) + ea,
                        top: String(pannelCircleTop) + ea,
                        background: instance.downloaded.map((o) => { return o.file }).includes(original.split("/")[original.split("/").length - 1]) ? colorChip.gray4 : colorChip.green,
                      }
                    }
                  ]
                }
              ]
            },
            {
              style: {
                display: "block",
                position: "absolute",
                top: String(0),
                left: String(0),
                width: withOut(0),
                height: withOut(0),
                background: colorChip.green,
                opacity: String(0),
                borderRadius: String(5) + "px",
              }
            }
          ]
        });

        photoItemList.push({
          hash: hexId,
          target: id
        });

      } else if (type === "link") {

        ({ link, memo } = linkContents.find(({ file }) => { return (targetHref + "/" + file) === original }));

        itemBlock = createNode({
          mother,
          attribute: {
            link,
            original,
            key,
            toggle: "off",
            hex: hexId,
            exe,
            type,
            date: dateToString(date).split("-").slice(1).join("/"),
          },
          event: {
            click: linkItemSelectEvent,
            contextmenu: contextmenuEvent(type),
          },
          style: {
            display: "inline-flex",
            width: "calc(calc(100% - " + String(itemBetween * divideNumber) + ea + ") / " + String(divideNumber) + ")",
            marginRight: String(itemBetween) + ea,
            marginBottom: String(itemBetween) + ea,
            cursor: "pointer",
            flexDirection: "column",
          },
          children: [
            {
              id,
              style: {
                display: "block",
                width: withOut(0, ea),
                height: String(linkPhotoHeight) + ea,
                borderTopLeftRadius: String(5) + "px",
                borderTopRightRadius: String(5) + "px",
                background: colorChip.white,
                marginBottom: String(linkPhotoMarginBottom) + ea,
                backgroundPosition: "50% 50%",
                backgroundSize: "100% auto",
                backgroundRepeat: "no-repeat",
              }
            },
            {
              style: {
                display: "flex",
                justifyContent: "start",
                paddingLeft: String(titlePadding) + ea,
                paddingRight: String(titlePadding) + ea,
                alignItems: "center",
                width: withOut(titlePadding * 2, ea),
                height: String(itemTongHeight) + ea,
                borderBottomLeftRadius: String(5) + "px",
                borderBottomRightRadius: String(5) + "px",
                background: desktop ? colorChip.white : colorChip.gray0,
                textAlign: "center",
                overflow: "hidden",
                boxShadow: "0px 1px 8px -6px " + colorChip.shadow,
              },
              children: [
                {
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: withOut(titlePannelWidth + titlePannelBetween, ea),
                    height: withOut(0, ea),
                    overflow: "hidden",
                    marginRight: String(titlePannelBetween) + ea,
                  },
                  child: {
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      width: String(titleMaxWidth) + ea,
                      height: withOut(0, ea),
                      justifyContent: "start",
                      textAlign: "left",
                      alignItems: "center",    
                    },
                    child: {
                      attribute: {
                        date: dateToString(date).split("-").slice(1).join("/"),
                      },
                      class: [ fileNameClassName ],
                      text: memo.trim() !== "" ? memo.trim() : dateToString(date) + "_" + name,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        top: String(textTop) + ea,
                        fontSize: String(textSize) + ea,
                        fontWeight: String(textWeight),
                        color: colorChip.black,
                      },
                      bold: {
                        fontSize: String(textSize) + ea,
                        fontWeight: String(textWeight),
                        color: colorChip.deactive,
                      }
                    }
                  }
                },
                {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    width: String(titlePannelWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "end",
                    alignItems: "center",
                    textAlign: "right",
                  },
                  children: [
                    {
                      class: [ filePannelDateClassName ],
                      text: dateToString(date).split("-").slice(1).join("/"),
                      style: {
                        display: "inline-block",
                        position: "relative",
                        top: String(pannelTextTop) + ea,
                        fontSize: String(pannelSize) + ea,
                        fontWeight: String(textWeight),
                        color: colorChip.deactive,
                      },
                    },
                    {
                      class: [ filePannelCircleClassName ],
                      style: {
                        display: "inline-block",
                        position: "relative",
                        marginLeft: String(pannelCircleBetween) + ea,
                        width: String(pannelCircleWidth) + ea,
                        height: String(pannelCircleWidth) + ea,
                        borderRadius: String(pannelCircleWidth) + ea,
                        top: String(pannelCircleTop) + ea,
                        background: colorChip.green,
                      }
                    }
                  ]
                }
              ],
            }
          ]
        });

        linkItemList.push({
          url: window.encodeURIComponent(link),
          target: id
        });

        ajaxJson({ mode: "image", url: window.encodeURIComponent(link), target: id }, BACKHOST + "/getOpenGraph").then(({ image, target }) => {
          target = document.querySelector('#' + target);
          if (target !== null) {
            if (image !== null && image !== "null") {
              target.style.backgroundImage = "url('" + image + "')";
            }
          }
        }).catch((err) => {
          console.log(err);
        });

      }

      motherMatrix[motherNumber] = motherMatrix[motherNumber] + 1;
    }

    ajaxJson({ mode: "decrypto", targets: fileItemList }, SECONDHOST + "/homeliaisonCrypto", { equal: true }).then((targets) => {
      for (let { string, target } of targets) {
        target = document.querySelector('#' + target);
        if (string.trim() !== "" && target !== null) {
          target.textContent = "";
          target.insertAdjacentHTML("beforeend", string);
        }
      }
    }).catch((err) => {
      console.log(err);
    });

    ajaxJson({ mode: "decrypto", targets: photoItemList }, SECONDHOST + "/homeliaisonCrypto", { equal: true }).then((targets) => {
      for (let { string, target } of targets) {
        target = document.querySelector('#' + target);
        if (target !== null) {
          if (!instance.isEmptyString(string)) {
            target.textContent = "";
            target.insertAdjacentHTML("beforeend", string);
          } else {
            target.textContent = "";
            target.insertAdjacentHTML("beforeend", '-');
          }
        }
      }
    }).catch((err) => {
      console.log(err);
    });

    motherMaxNumber = motherMatrix.reduce((acc, curr) => { return (acc >= curr ? acc : curr) }, 0);
    transparentItemsMatrix = motherMatrix.map((num) => { return Math.abs(motherMaxNumber - num) });

    this.itemList = [];

  } catch (e) {
    console.log(e);
  }
}

ProcessJs.prototype.isEmptyString = function (string) {
  const instance = this;
  if (/^[0-9]/.test(string) && /[0-9]$/.test(string) && string.length > 5 && string.replace(/[0-9]/gi, '') === '') {
    return true;
  } else {
    return false;
  }
}

ProcessJs.prototype.asyncLoadingBlock = function () {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker } = GeneralJs;
  const { ea, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let baseWidth;
  let bottom;
  let chatBaseWidth;
  let chatBaseHeight;
  let chatBaseBetween;
  let right;
  let zIndex;
  let setButtons;
  let buttonList;
  let buttonBase;
  let buttonPadding;
  let buttonHeight;
  let buttonMarginTop;
  let buttonBetween;
  let buttonTextTop;
  let buttonSize;
  let buttonWeight;
  let basePadding;
  let loadingWidth;
  let loadingTop;
  let progressSize;
  let progressWeight;
  let progressMarginBottom;
  let pastButtonBase;

  this.nowUploading = true;

  const WhiteLoading = function (base, progress) {
    this.base = base;
    this.progress = progress;
  }

  WhiteLoading.prototype.remove = function () {
    this.base.parentElement.removeChild(this.base);
    instance.nowUploading = false;
  }

  baseWidth = desktop ? 68 : 12;
  right = desktop ? 40 : 5.4;
  bottom = desktop ? 6 : 6;

  zIndex = 4;

  chatBaseWidth = <%% 160, 160, 160, 160, 21 %%>;
  chatBaseHeight = <%% 90, 90, 90, 90, 21 %%>;
  chatBaseBetween = <%% 16, 16, 16, 16, 2 %%>;

  buttonPadding = <%% 12, 12, 12, 10, 3.2 %%>;
  buttonHeight = <%% 36, 36, 36, 33, 6.8 %%>;
  buttonMarginTop = <%% 6, 6, 6, 6, 1 %%>;
  buttonBetween = <%% 6, 6, 6, 6, 1 %%>;

  buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isIphone() ? -0.1 : -0.3) %%>;
  buttonSize = <%% 14, 14, 14, 13, 2.6 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;

  basePadding = <%% 12, 12, 12, 10, 1.6 %%>;

  loadingWidth = <%% 40, 40, 40, 36, 8 %%>;
  loadingTop = <%% -3, -3, -3, -2, -0.5 %%>;

  progressSize = <%% 15, 15, 15, 14, 3.2 %%>;
  progressWeight = <%% 400, 400, 400, 400, 400 %%>;
  progressMarginBottom = <%% 1, 1, 1, 1, 0.5 %%>;

  buttonBase = createNode({
    mother: totalContents,
    style: {
      display: "inline-flex",
      position: "fixed",
      width: String(chatBaseWidth) + ea,
      height: String(chatBaseHeight) + ea,
      borderRadius: String(8) + "px",
      right: String(right) + ea,
      bottom: String(bottom + baseWidth + chatBaseBetween) + ea,
      boxShadow: "0px 6px 20px -10px " + colorChip.shadow,
      animation: "talkfade 0.3s ease forwards",
      overflow: "hidden",
      background: colorChip.white,
      padding: String(basePadding) + ea,
      paddingBottom: String(basePadding - buttonMarginTop) + ea,
      zIndex: String(zIndex),
      transition: "all 0.5s ease",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    children: [
      {
        mode: "svg",
        source: instance.mother.returnLoading(),
        class: [ "loading" ],
        style: {
          display: "inline-block",
          position: "relative",
          width: String(loadingWidth) + ea,
          height: String(loadingWidth) + ea,
          left: "auto",
          top: String(loadingTop) + ea,
        }
      },
      {
        text: "0%",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(progressSize) + ea,
          fontWeight: String(progressWeight),
          fontFamily: "graphik",
          color: colorChip.green,
          marginBottom: String(progressMarginBottom) + ea,
        }
      }
    ]
  });

  return (new WhiteLoading(buttonBase, buttonBase.lastChild));
}

ProcessJs.prototype.reloadProjects = function (serverResponse) {
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

  if (projects.length !== 1) {
    projects = projects.filter((obj) => {
      return obj.proid !== "p1801_aa01s" && obj.proid !== "p1801_aa02s";
    });
  }

  this.clientHistory = clientHistory;
  this.history = history;
  this.projects = projects;
}

ProcessJs.prototype.searchProjects = function () {
  const instance = this;
  const { totalContents, ea, belowHeight } = this;
  const { ajaxJson, uniqueValue, blankHref, setDebounce } = GeneralJs;
  const whiteCardClassName = "whiteCardClassName";
  let searchEvent;
  let loading;
  let removeTargets;
  let searchTarget;

  searchEvent = (value, e) => {
    return () => {
      loading = instance.mother.grayLoading(null, true);

      removeTargets = document.querySelectorAll('.' + whiteCardClassName);
      for (let dom of removeTargets) {
        dom.remove();
      }

      if (value.trim() !== '' && value.trim() !== '.' && value.trim() !== "전체") {

        ajaxJson({ mode: "search", value: value.trim() }, BACKHOST + "/processConsole", { equal: true }).then((serverResponse) => {
          instance.reloadProjects(serverResponse);
          instance.contentsLoad(true);
  
          try {
            loading.remove();
          } catch {}
          if (instance.clientDoms.length === 1) {
            instance.clientDoms[0].click();
          }

        }).catch((err) => {
          console.log(err);
        });

        searchTarget = instance.designers.filter((o) => { return (new RegExp(value.trim(), "gi")).test(o.designer) })
        if (searchTarget.length === 0) {
          searchTarget = instance.designers.filter((o) => { return (new RegExp(value.trim(), "gi")).test(o.desid) })
          if (searchTarget.length === 0) {
            searchTarget = {
              mode: "client",
              projects: instance.projects.filter((o) => { return (new RegExp(value.trim(), "gi")).test(o.name) }),
            };
          }  
        }
        instance.contentsLoad(searchTarget);
        loading.remove();

      } else {
        instance.contentsLoad(false);
        loading.remove();
      }
    }
  }

  this.searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      setDebounce(searchEvent(this.value, e), "__searchMatrix__", 200);
    }
  });
}

ProcessJs.prototype.dashBoardView = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, removeByClass, setQueue, serviceParsing, equalJson, variableArray } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      const blank = "&nbsp;&nbsp;&nbsp;";
      const slash = blank + "&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;" + blank;
      const whiteCardClassName = "whiteCardClassName";
      const filterMenuClassName = "filterMenuClassName2";
      const entireValueBlockClassName = "entireValueBlockClassName";
      const targetTableClassName = "targetTableClassName";
      const splitToken = "__split__";
      const vw = "vw";
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
      let dashboardTable;
      let tableColumns;
      let columnsLength;
      let columnPadding;
      let blockBetween;
      let nameWidth;
      let nameIndexPoint;
      let reportArea;
      let reportAreaHeight;
      let reportAreaPaddingTop;
      let reportSize, reportWeight;
      let reportBoldWeight;
      let reportTextTop;
      let managers;
      let desidSize;
      let dashboardTableLoad;
      let dashboardTableNumberLoad;
      let valuesArr, valuesNumberArr;
      let managerDesignerSet;
      let targetArr;
      let menuButtonOuterPadding;
      let menuButtonInnerPadding;
      let menuButtonWidth;
      let menuButtonHeight;
      let menuButtonSize;
      let menuButtonWeight;
      let menuButtonTextTop;
      let clientColumnsFunctionsTong;
      let matchingFilterMaker;
      
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

      blockHeight = <%% 36, 36, 36, 36, 36 %%>;

      valueSize = <%% 13, 13, 13, 13, 3 %%>;
      valueWeight = 400;
      valueBoldWeight = 700;
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

      columnPadding = 30;

      blockBetween = 2;

      nameWidth = 64;
      nameIndexPoint = 1;

      reportAreaHeight = 3;
      reportAreaPaddingTop = 20;

      reportSize = 0.85;
      reportWeight = 400;
      reportBoldWeight = 700;
      reportTextTop = (isMac() ? -1 : 1);

      desidSize = 10;

      menuButtonOuterPadding = 4;
      menuButtonInnerPadding = 3;
      menuButtonWidth = 90;
      menuButtonHeight = 26;
    
      menuButtonSize = 12;
      menuButtonWeight = 600;
      menuButtonTextTop = -1;

      tableColumns = equalJson(JSON.stringify(instance.clientColumns)).map((obj) => { return obj.title });
      tableColumns.unshift("디자이너");
      tableColumns.unshift("담당자");
      columnsLength = tableColumns.length;

      managers = [ ...new Set(instance.totalValues.map((arr) => {
        return arr[0]
      })) ];

      matchingFilterMaker = (keyword) => {
        return function (e) {
          const index = Number(this.getAttribute("index"));
          const type = this.getAttribute("type");
          const targetTable = document.querySelector('.' + targetTableClassName);
          let targets;

          targets = [ ...document.querySelectorAll('.' + entireValueBlockClassName) ];
          targets = targets.map((dom) => {
            let boo;
            if ([ ...dom.children ][index].firstChild.textContent.trim() === keyword) {
              boo = true;
            } else {
              boo = false;
            }
            return { dom, boo }
          });

          for (let { dom, boo } of targets) {
            if (boo) {
              dom.style.display = "block";
            } else {
              dom.style.display = "none";
            }
          }
  
        }
      }

      clientColumnsFunctionsTong = {
        downSort: function (e) {
          const index = Number(this.getAttribute("index"));
          const type = this.getAttribute("type");
          const targets = [ ...document.querySelectorAll('.' + entireValueBlockClassName) ];
          const targetTable = document.querySelector('.' + targetTableClassName);

          if (type === "date") {
            targets.sort((a, b) => {
              const aValue = [ ...a.children ][index].firstChild.textContent;
              const bValue = [ ...b.children ][index].firstChild.textContent;
              return stringToDate(bValue).valueOf() - stringToDate(aValue).valueOf();
            })
          } else if (type === "string") {
            targets.sort((a, b) => {
              const aValue = [ ...a.children ][index].firstChild.textContent;
              const bValue = [ ...b.children ][index].firstChild.textContent;
              return bValue.charCodeAt(0) - aValue.charCodeAt(0);
            })
          } else if (type === "number") {
            targets.sort((a, b) => {
              const aValue = [ ...a.children ][index].firstChild.textContent;
              const bValue = [ ...b.children ][index].firstChild.textContent;
              if (/\//gi.test(aValue)) {
                return Number(bValue.split("/")[0].replace(/[^0-9]/gi, '')) - Number(aValue.split("/")[0].replace(/[^0-9]/gi, ''));
              } else {
                return Number(bValue.replace(/[^0-9]/gi, '')) - Number(aValue.replace(/[^0-9]/gi, ''));
              }
            })
          }
          for (let dom of targets) {
            targetTable.appendChild(dom);
          }
        },
        upSort: function (e) {
          const index = Number(this.getAttribute("index"));
          const type = this.getAttribute("type");
          const targets = [ ...document.querySelectorAll('.' + entireValueBlockClassName) ];
          const targetTable = document.querySelector('.' + targetTableClassName);

          if (type === "date") {
            targets.sort((a, b) => {
              const aValue = [ ...a.children ][index].firstChild.textContent;
              const bValue = [ ...b.children ][index].firstChild.textContent;
              return stringToDate(aValue).valueOf() - stringToDate(bValue).valueOf();
            })
          } else if (type === "string") {
            targets.sort((a, b) => {
              const aValue = [ ...a.children ][index].firstChild.textContent;
              const bValue = [ ...b.children ][index].firstChild.textContent;
              return aValue.charCodeAt(0) - bValue.charCodeAt(0);
            })
          } else if (type === "number") {
            targets.sort((a, b) => {
              const aValue = [ ...a.children ][index].firstChild.textContent;
              const bValue = [ ...b.children ][index].firstChild.textContent;
              if (/\//gi.test(aValue)) {
                return Number(aValue.split("/")[0].replace(/[^0-9]/gi, '')) - Number(bValue.split("/")[0].replace(/[^0-9]/gi, ''));
              } else {
                return Number(aValue.replace(/[^0-9]/gi, '')) - Number(bValue.replace(/[^0-9]/gi, ''));
              }
            })
          }
          for (let dom of targets) {
            targetTable.appendChild(dom);
          }
        },
        totalFilter: function (e) {
          const index = Number(this.getAttribute("index"));
          const type = this.getAttribute("type");
          const targetTable = document.querySelector('.' + targetTableClassName);
          let targets;

          targets = [ ...document.querySelectorAll('.' + entireValueBlockClassName) ];
          targets = targets.map((dom) => {
            let boo;
            if ([ ...dom.children ][index].firstChild.textContent.trim() === '-') {
              boo = true;
            } else {
              boo = true;
            }
            return { dom, boo }
          });

          for (let { dom, boo } of targets) {
            if (boo) {
              dom.style.display = "block";
            } else {
              dom.style.display = "none";
            }
          }
        },
        existFilter: function (e) {
          const index = Number(this.getAttribute("index"));
          const type = this.getAttribute("type");
          const targetTable = document.querySelector('.' + targetTableClassName);
          let targets;

          targets = [ ...document.querySelectorAll('.' + entireValueBlockClassName) ];
          targets = targets.map((dom) => {
            let boo;
            if ([ ...dom.children ][index].firstChild.textContent.trim() === '-') {
              boo = false;
            } else {
              boo = true;
            }
            return { dom, boo }
          });

          for (let { dom, boo } of targets) {
            if (boo) {
              dom.style.display = "block";
            } else {
              dom.style.display = "none";
            }
          }
        },
        nonExistFilter: matchingFilterMaker('-'),
        clientReady: matchingFilterMaker("대기"),
        clientGoing: matchingFilterMaker("진행중"),
        constructDesigner: matchingFilterMaker("디자이너"),
        constructHomeliaison: matchingFilterMaker("홈리에종"),
        constructClient: matchingFilterMaker("고객"),
      }



      dashboardTableLoad = (dashboardTable) => {
        cleanChildren(dashboardTable);

        createNode({
          mother: dashboardTable,
          style: {
            display: "flex",
            position: "sticky",
            top: String(0),
            zIndex: String(1),
            flexDirection: "row",
            width: withOut(columnPadding * 2, ea),
            height: String(blockHeight) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGray,
            justifyContent: "start",
            alignItems: "start",
            paddingLeft: String(columnPadding) + ea,
            paddingRight: String(columnPadding) + ea,
          },
          children: variableArray(columnsLength).map((index) => {
            return {
              attribute: {
                length: String(columnsLength),
                index: String(index),
              },
              event: {
                click: function(e) {
                  const length = Number(this.getAttribute("length"));
                  const index = Number(this.getAttribute("index"));
                  const delta = length - instance.clientColumns.length;
                  const zIndex = 5;
                  let thisObject;
                  let thisMenu;
                  let cancelBack, menuPrompt;
                  let type;

                  if (instance.clientColumns[index - delta] !== undefined) {

                    thisObject = instance.clientColumns[index - delta];
                    type = thisObject.type;
                    if (type === "string") {
                      thisMenu = equalJson(JSON.stringify(instance.clientColumnsMenu)).concat(thisObject.menu)
                    } else {
                      thisMenu = equalJson(JSON.stringify(instance.clientColumnsMenu)).concat(equalJson(JSON.stringify(instance.clientColumnsBlankTitle))).concat(thisObject.menu);
                    }

                    cancelBack = createNode({
                      mother: totalContents,
                      class: [ filterMenuClassName ],
                      event: {
                        click: function (e) {
                          removeByClass(filterMenuClassName);
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
                      class: [ filterMenuClassName ],
                      attribute: {
                        index: String(index),
                        type,
                      },
                      style: {
                        position: "absolute",
                        top: String(e.y) + "px",
                        left: String(e.x) + "px",
                        padding: String(menuButtonOuterPadding) + ea,
                        paddingBottom: String(menuButtonOuterPadding - menuButtonInnerPadding) + ea,
                        borderRadius: String(5) + "px",
                        background: colorChip.white,
                        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                        animation: "fadeuplite 0.3s ease forwards",
                        zIndex: String(zIndex),
                      },
                      children: thisMenu.map((obj, index) => {
                        return {
                          attribute: {
                            key: obj.key
                          },
                          event: {
                            click: function (e) {
                              const key = this.getAttribute("key");
                              const thisFunction = clientColumnsFunctionsTong[key];
                              thisFunction.call(this.parentElement, e);
                              removeByClass(filterMenuClassName);
                            },
                            contextmenu : function (e) {
                              e.preventDefault();
                              const key = this.getAttribute("key");
                              const thisFunction = clientColumnsFunctionsTong[key];
                              thisFunction.call(this.parentElement, e);
                              removeByClass(filterMenuClassName);
                            }
                          },
                          style: {
                            display: "flex",
                            width: String(menuButtonWidth) + ea,
                            height: String(menuButtonHeight) + ea,
                            borderRadius: String(5) + "px",
                            background: colorChip.gradientGray,
                            marginBottom: String(menuButtonInnerPadding) + ea,
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          },
                          child: {
                            text: obj.title,
                            style: {
                              fontSize: String(menuButtonSize) + ea,
                              fontWeight: String(menuButtonWeight),
                              color: colorChip.white,
                              top: String(menuButtonTextTop) + ea,
                              position: "relative",
                            }
                          }
                        }
                      })
                    })

                  } else {
                    // manager
                    if (index === 0) {

                      thisMenu = [ ...new Set(instance.totalValues.map((arr) => { return arr[0] })) ];
                      thisMenu.sort();

                      cancelBack = createNode({
                        mother: totalContents,
                        class: [ filterMenuClassName ],
                        event: {
                          click: function (e) {
                            removeByClass(filterMenuClassName);
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
                        class: [ filterMenuClassName ],
                        attribute: {
                          index: String(index),
                          type,
                        },
                        style: {
                          position: "absolute",
                          top: String(e.y) + "px",
                          left: String(e.x) + "px",
                          padding: String(menuButtonOuterPadding) + ea,
                          paddingBottom: String(menuButtonOuterPadding - menuButtonInnerPadding) + ea,
                          borderRadius: String(5) + "px",
                          background: colorChip.white,
                          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                          animation: "fadeuplite 0.3s ease forwards",
                          zIndex: String(zIndex),
                        },
                        children: thisMenu.map((str, index) => {
                          return {
                            attribute: {
                              manager: str
                            },
                            event: {
                              click: function (e) {
                                const manager = this.getAttribute("manager");
                                matchingFilterMaker(manager).call(this, e);
                                removeByClass(filterMenuClassName);
                              },
                              contextmenu : function (e) {
                                e.preventDefault();
                                const manager = this.getAttribute("manager");
                                matchingFilterMaker(manager).call(this, e);
                                removeByClass(filterMenuClassName);
                              }
                            },
                            style: {
                              display: "flex",
                              width: String(menuButtonWidth) + ea,
                              height: String(menuButtonHeight) + ea,
                              borderRadius: String(5) + "px",
                              background: colorChip.gradientGray,
                              marginBottom: String(menuButtonInnerPadding) + ea,
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                            },
                            child: {
                              text: str,
                              style: {
                                fontSize: String(menuButtonSize) + ea,
                                fontWeight: String(menuButtonWeight),
                                color: colorChip.white,
                                top: String(menuButtonTextTop) + ea,
                                position: "relative",
                              }
                            }
                          }
                        })
                      })

                    }
                  }
                }
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: (index < nameIndexPoint ? String(nameWidth) + ea : ("calc(calc(100% - " + String(nameWidth * nameIndexPoint) + ea + ") / " + String(columnsLength - nameIndexPoint) + ")")),
                height: withOut(0, ea),
                justifyContent: "start",
                alignItems: "center",
                cursor: "pointer",
              },
              child: {
                text: tableColumns[index],
                style: {
                  fontSize: String(valueSize) + ea,
                  fontWeight: String(valueBoldWeight),
                  color: colorChip.white,
                  position: "relative",
                  top: String(valueTextTop) + ea,
                }
              }
            }
          }),
        });

        valuesArr = equalJson(JSON.stringify(instance.totalValues));
        for (let arr of valuesArr) {
          createNode({
            mother: dashboardTable,
            class: [ entireValueBlockClassName ],
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              width: withOut(columnPadding * 2, ea),
              height: String(blockHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray0,
              justifyContent: "start",
              alignItems: "start",
              paddingLeft: String(columnPadding) + ea,
              paddingRight: String(columnPadding) + ea,
              marginTop: String(blockBetween) + ea,
            },
            children: variableArray(columnsLength).map((index) => {
              return {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: (index < nameIndexPoint ? String(nameWidth) + ea : ("calc(calc(100% - " + String(nameWidth * nameIndexPoint) + ea + ") / " + String(columnsLength - nameIndexPoint) + ")")),
                  height: withOut(0, ea),
                  justifyContent: "start",
                  alignItems: "center",
                },
                child: {
                  text: arr[index],
                  style: {
                    fontSize: String(valueSize) + ea,
                    fontWeight: String(valueWeight),
                    color: colorChip.black,
                    position: "relative",
                    top: String(valueTextTop) + ea,
                  },
                  bold: {
                    fontSize: String(valueSize) + ea,
                    fontWeight: String(valueWeight),
                    color: colorChip.green,
                  },
                  under: {
                    fontSize: String(desidSize) + ea,
                    fontWeight: String(valueWeight),
                    color: colorChip.deactive,
                  }
                }
              }
            }),
          });
        }
      }

      dashboardTableNumberLoad = (dashboardTable) => {
        cleanChildren(dashboardTable);

        createNode({
          mother: dashboardTable,
          class: [ instance.numbersExtractClassName ],
          style: {
            display: "flex",
            position: "sticky",
            top: String(0),
            zIndex: String(1),
            flexDirection: "row",
            width: withOut(columnPadding * 2, ea),
            height: String(blockHeight) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGreen,
            justifyContent: "start",
            alignItems: "start",
            paddingLeft: String(columnPadding) + ea,
            paddingRight: String(columnPadding) + ea,
          },
          children: variableArray(columnsLength).map((index) => {
            return {
              attribute: {
                length: String(columnsLength),
                index: String(index),
              },
              event: {
                click: function(e) {
                  const length = Number(this.getAttribute("length"));
                  const index = Number(this.getAttribute("index"));
                  const delta = length - instance.clientColumns.length;
                  const zIndex = 5;
                  let thisObject;
                  let thisMenu;
                  let cancelBack, menuPrompt;
                  let type;

                  if (instance.clientColumns[index - delta] !== undefined) {
                    thisObject = instance.clientColumns[index - delta];
                    thisMenu = equalJson(JSON.stringify(instance.clientColumnsMenu));

                    cancelBack = createNode({
                      mother: totalContents,
                      class: [ filterMenuClassName ],
                      event: {
                        click: function (e) {
                          removeByClass(filterMenuClassName);
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
                      class: [ filterMenuClassName ],
                      attribute: {
                        index: String(index),
                        type: "number",
                      },
                      style: {
                        position: "absolute",
                        top: String(e.y) + "px",
                        left: String(e.x) + "px",
                        padding: String(menuButtonOuterPadding) + ea,
                        paddingBottom: String(menuButtonOuterPadding - menuButtonInnerPadding) + ea,
                        borderRadius: String(5) + "px",
                        background: colorChip.white,
                        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                        animation: "fadeuplite 0.3s ease forwards",
                        zIndex: String(zIndex),
                      },
                      children: thisMenu.map((obj, index) => {
                        return {
                          attribute: {
                            key: obj.key
                          },
                          event: {
                            click: function (e) {
                              const key = this.getAttribute("key");
                              const thisFunction = clientColumnsFunctionsTong[key];
                              thisFunction.call(this.parentElement, e);
                              removeByClass(filterMenuClassName);
                            },
                            contextmenu : function (e) {
                              e.preventDefault();
                              const key = this.getAttribute("key");
                              const thisFunction = clientColumnsFunctionsTong[key];
                              thisFunction.call(this.parentElement, e);
                              removeByClass(filterMenuClassName);
                            }
                          },
                          style: {
                            display: "flex",
                            width: String(menuButtonWidth) + ea,
                            height: String(menuButtonHeight) + ea,
                            borderRadius: String(5) + "px",
                            background: colorChip.gradientGreen,
                            marginBottom: String(menuButtonInnerPadding) + ea,
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          },
                          child: {
                            text: obj.title,
                            style: {
                              fontSize: String(menuButtonSize) + ea,
                              fontWeight: String(menuButtonWeight),
                              color: colorChip.white,
                              top: String(menuButtonTextTop) + ea,
                              position: "relative",
                            }
                          }
                        }
                      })
                    })

                  }
                }
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: (index < nameIndexPoint ? String(nameWidth) + ea : ("calc(calc(100% - " + String(nameWidth * nameIndexPoint) + ea + ") / " + String(columnsLength - nameIndexPoint) + ")")),
                height: withOut(0, ea),
                justifyContent: "start",
                alignItems: "center",
                cursor: "pointer",
              },
              child: {
                text: tableColumns[index],
                style: {
                  fontSize: String(valueSize) + ea,
                  fontWeight: String(valueBoldWeight),
                  color: colorChip.white,
                  position: "relative",
                  top: String(valueTextTop) + ea,
                }
              }
            }
          }),
        });

        valuesArr = equalJson(JSON.stringify(instance.totalValues));

        managerDesignerSet = [ ...new Set(valuesArr.map((arr) => { return arr[0] + splitToken + arr[1] })) ];
        managerDesignerSet = managerDesignerSet.map((str) => { return str.split(splitToken) });

        valuesNumberArr = [];
        for (let arr of managerDesignerSet) {

          targetArr = valuesArr.filter((a) => {
            return a[0] === arr[0] && a[1] === arr[1];
          })

          arr.push(String(targetArr.length));
          arr.push(String(targetArr.filter((a) => { return !/진행/gi.test(a[3]) }).length) + " / <b%" + String(targetArr.filter((a) => { return /진행/gi.test(a[3]) }).length) + "%b>");
          arr.push(String(targetArr.filter((a) => { return /홈리에종/gi.test(a[4]) }).length));
          arr.push(String(targetArr.filter((a) => { return a[5] !== '-' }).length));
          arr.push(String(targetArr.filter((a) => { return a[6] !== '-' }).length));
          arr.push(String(targetArr.filter((a) => { return a[7] !== '-' }).length));
          arr.push(String(targetArr.filter((a) => { return a[8] !== '-' }).length));
          arr.push(String(targetArr.filter((a) => { return a[9] !== '-' }).length));
          arr.push(String(targetArr.filter((a) => { return a[10] !== '-' }).length));
          arr.push(String(targetArr.filter((a) => { return a[11] !== '-' }).length));
          arr.push(String(targetArr.filter((a) => { return a[12] !== '-' }).length));
          arr.push(String(targetArr.filter((a) => { return a[13] !== '-' }).length));
          
          valuesNumberArr.push(equalJson(JSON.stringify(arr)));
        }

        instance.totalNumbers = [];
        for (let arr of valuesNumberArr) {
          createNode({
            mother: dashboardTable,
            class: [ entireValueBlockClassName ],
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              width: withOut(columnPadding * 2, ea),
              height: String(blockHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray0,
              justifyContent: "start",
              alignItems: "start",
              paddingLeft: String(columnPadding) + ea,
              paddingRight: String(columnPadding) + ea,
              marginTop: String(blockBetween) + ea,
            },
            children: variableArray(columnsLength).map((index) => {
              return {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: (index < nameIndexPoint ? String(nameWidth) + ea : ("calc(calc(100% - " + String(nameWidth * nameIndexPoint) + ea + ") / " + String(columnsLength - nameIndexPoint) + ")")),
                  height: withOut(0, ea),
                  justifyContent: "start",
                  alignItems: "center",
                },
                child: {
                  text: arr[index],
                  style: {
                    fontSize: String(valueSize) + ea,
                    fontWeight: String(valueWeight),
                    color: colorChip.black,
                    position: "relative",
                    top: String(valueTextTop) + ea,
                  },
                  bold: {
                    fontSize: String(valueSize) + ea,
                    fontWeight: String(valueWeight),
                    color: colorChip.green,
                  },
                  under: {
                    fontSize: String(desidSize) + ea,
                    fontWeight: String(valueWeight),
                    color: colorChip.deactive,
                  }
                }
              }
            }),
          });
          instance.totalNumbers.push(arr);
        }

      }

      dashboardTable = {};

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
        text: "현재 상황",
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
        text: "프로젝트 대시보드",
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
        attribute: {
          toggle: "off",
        },
        text: "숫자만 보기",
        event: {
          selectstart: (e) => { e.preventDefault() },
          click: function (e) {
            const toggle = this.getAttribute("toggle");
            if (toggle === "off") {
              this.textContent = "전체 보기";
              dashboardTableNumberLoad(dashboardTable);
              this.setAttribute("toggle", "on");
            } else {
              this.textContent = "숫자만 보기";
              dashboardTableLoad(dashboardTable);
              this.setAttribute("toggle", "off");
            }
          }
        },
        style: {
          display: "inline-flex",
          fontSize: String(subSize) + ea,
          fontWeight: String(subWeight),
          color: colorChip.green,
          position: "absolute",
          right: String(0),
          top: String(statusTextTop) + ea,
          cursor: "pointer",
        },
      });


      // contents area

      contentsArea = createNode({
        mother: whiteCard,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "column",
          height: "calc(" + withOut(titleAreaHeight + titleAreaPaddingBottom + contentsAreaPaddingTop + reportAreaPaddingTop, ea) + " - " + String(reportAreaHeight) + vw + ")",
          width: withOut(0, ea),
          marginTop: String(contentsAreaPaddingTop) + ea,
          overflow: "scroll",
        }
      });

      dashboardTable = createNode({
        mother: contentsArea,
        class: [ targetTableClassName ],
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "column",
          width: withOut(0, ea),
          paddingBottom: String(200) + ea,
        }
      });
      
      dashboardTableLoad(dashboardTable);


      // report area

      reportArea = createNode({
        mother: whiteCard,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          height: String(reportAreaHeight) + vw,
          width: withOut(0, ea),
          marginTop: String(reportAreaPaddingTop) + ea,
          boxSizing: "border-box",
          borderRadius: String(5) + "px",
          border: "1px solid " + colorChip.gray3,
          justifyContent: "center",
          alignItems: "center",
        }
      });

      createNode({
        mother: reportArea,
        text: "총 관리 프로젝트 :" + blank + "<b%" + String(instance.totalValues.length) + "%b> 개",
        style: {
          position: "relative",
          fontSize: String(reportSize) + vw,
          fontWeight: String(reportWeight),
          color: colorChip.black,
          top: String(reportTextTop) + ea,
        },
        bold: {
          fontSize: String(reportSize) + vw,
          fontWeight: String(reportBoldWeight),
          color: colorChip.green,
        }
      })

      createNode({
        mother: reportArea,
        text: slash,
        style: {
          position: "relative",
          fontSize: String(reportSize) + vw,
          fontWeight: String(reportWeight),
          color: colorChip.gray4,
          top: String(reportTextTop) + ea,
        }
      });

      createNode({
        mother: reportArea,
        text: "진행중 프로젝트 :" + blank + "<b%" + String(instance.totalValues.filter((arr) => { return /진행/gi.test(arr[3]) }).length) + "%b> 개",
        style: {
          position: "relative",
          fontSize: String(reportSize) + vw,
          fontWeight: String(reportWeight),
          color: colorChip.black,
          top: String(reportTextTop) + ea,
        },
        bold: {
          fontSize: String(reportSize) + vw,
          fontWeight: String(reportBoldWeight),
          color: colorChip.green,
        }
      })

      createNode({
        mother: reportArea,
        text: slash,
        style: {
          position: "relative",
          fontSize: String(reportSize) + vw,
          fontWeight: String(reportWeight),
          color: colorChip.gray4,
          top: String(reportTextTop) + ea,
        }
      });

      for (let manager of managers) {

        createNode({
          mother: reportArea,
          text: manager + " 관리 :" + blank + "<b%" + String(instance.totalValues.filter((arr) => { return arr[0] === manager }).length) + "%b> 개",
          style: {
            position: "relative",
            fontSize: String(reportSize) + vw,
            fontWeight: String(reportWeight),
            color: colorChip.black,
            top: String(reportTextTop) + ea,
          },
          bold: {
            fontSize: String(reportSize) + vw,
            fontWeight: String(reportBoldWeight),
            color: colorChip.green,
          }
        })
  
        createNode({
          mother: reportArea,
          text: slash,
          style: {
            position: "relative",
            fontSize: String(reportSize) + vw,
            fontWeight: String(reportWeight),
            color: colorChip.gray4,
            top: String(reportTextTop) + ea,
          }
        });

        createNode({
          mother: reportArea,
          text: manager + " 진행 :" + blank + "<b%" + String(instance.totalValues.filter((arr) => { return arr[0] === manager }).filter((arr) => { return /진행/gi.test(arr[3]) }).length) + "%b> 개",
          style: {
            position: "relative",
            fontSize: String(reportSize) + vw,
            fontWeight: String(reportWeight),
            color: colorChip.black,
            top: String(reportTextTop) + ea,
          },
          bold: {
            fontSize: String(reportSize) + vw,
            fontWeight: String(reportBoldWeight),
            color: colorChip.green,
          }
        })
  
        createNode({
          mother: reportArea,
          text: slash,
          style: {
            position: "relative",
            fontSize: String(reportSize) + vw,
            fontWeight: String(reportWeight),
            color: colorChip.gray4,
            top: String(reportTextTop) + ea,
          }
        });

      }

      reportArea.removeChild(reportArea.lastChild);

    } catch (e) {
      console.log(e);
    }
  }
}

ProcessJs.prototype.reportEvent = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects } = this;
  const { ajaxJson, uniqueValue, blankHref } = GeneralJs;
  const { belowButtons: { square: { reportIcon } } } = this.mother;

  reportIcon.addEventListener("click", this.dashBoardView());
}

ProcessJs.prototype.extractEvent = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects } = this;
  const { ajaxJson, uniqueValue, blankHref, equalJson } = GeneralJs;
  const { belowButtons: { sub: { extractIcon } } } = this.mother;
  const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
  const serviceStaticIndex = 2;
  const designerStaticIndex = 1;
  const statusStaticIndex = 3;

  extractIcon.addEventListener("click", async function (e) {
    try {
      const today = new Date();
      let rawMatrix;
      let tableColumns;
      let targetMatrix;
      let loading;
      let res;

      if (document.querySelector('.' + instance.numbersExtractClassName) === null) {
        rawMatrix = equalJson(JSON.stringify(instance.totalValues));
        rawMatrix = rawMatrix.map((arr) => {
          const tempArr = arr[serviceStaticIndex].split("&");
          const designerTempArr = arr[designerStaticIndex].split("&");
          let service;
          arr[designerStaticIndex] = designerTempArr[0];
          arr[serviceStaticIndex] = tempArr[0];
          service = tempArr[tempArr.length - 1];
          service = service.split("%")[service.split("%").length - 2];
          arr.splice(serviceStaticIndex, 0, service);
          return arr;
        });
  
        tableColumns = equalJson(JSON.stringify(instance.clientColumns)).map((obj) => { return obj.title });
        tableColumns.unshift("디자이너");
        tableColumns.unshift("담당자");
        tableColumns.splice(serviceStaticIndex, 0, "서비스");
  
        targetMatrix = [ tableColumns ].concat(rawMatrix);
  
        loading = instance.mother.grayLoading()
  
        res = await ajaxJson({
          values: targetMatrix,
          newMake: true,
          parentId: parentId,
          sheetName: "fromDB_process_" + String(today.getFullYear()) + instance.mother.todayMaker()
        }, BACKHOST + "/sendSheets");
        
        blankHref(res.link);
        
        loading.remove();
      } else {
        rawMatrix = equalJson(JSON.stringify(instance.totalNumbers));
        rawMatrix = rawMatrix.map((arr) => {
          const designerTempArr = arr[designerStaticIndex].split("&");
          arr[statusStaticIndex] = arr[statusStaticIndex].replace(/\<b\%/gi, '').replace(/\%b\>/gi, '');
          arr[designerStaticIndex] = designerTempArr[0];
          return arr;
        });
  
        tableColumns = equalJson(JSON.stringify(instance.clientColumns)).map((obj) => { return obj.title });
        tableColumns.unshift("디자이너");
        tableColumns.unshift("담당자");
  
        targetMatrix = [ tableColumns ].concat(rawMatrix);
  
        loading = instance.mother.grayLoading()
  
        res = await ajaxJson({
          values: targetMatrix,
          newMake: true,
          parentId: parentId,
          sheetName: "fromDB_process_" + String(today.getFullYear()) + instance.mother.todayMaker()
        }, BACKHOST + "/sendSheets");
        
        blankHref(res.link);
        
        loading.remove();
      }
      
    } catch (e) {
      console.log(e);
    }
  });
}

ProcessJs.prototype.addTransFormEvent = function () {
  const instance = this;
  const { selfHref } = GeneralJs;
  const { belowButtons: { square: { down } } } = this.mother;
  down.addEventListener("click", function (e) {
    selfHref(window.location.protocol + "//" + window.location.host + "/project");
  });
}

ProcessJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, equalJson, returnGet, ajaxMultiple, colorChip } = GeneralJs;
  try {
    const getObj = returnGet();
    const emptyDate = () => { return new Date(1800, 0, 1) };
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    const entireMode = (getObj.dataonly === "true" && getObj.entire === "true");
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

    if (entireMode) {
      this.belowHeight = this.mother.belowHeight = 0;
      this.grayBarWidth = this.mother.grayBarWidth = 0;  
    }
    this.entireMode = entireMode;

    loading = this.mother.grayLoading(null, true);
    
    ({ projects, clients } = await ajaxJson({ mode: "pre", searchMode: (typeof getObj.proid === "string" ? getObj.proid : "false") }, BACKHOST + "/processConsole", { equal: true }));
    proidArr = projects.map((p) => { return p.proid });
    cliidArr = clients.map((c) => { return c.cliid });

    if (proidArr.length === 0) {
      window.alert("결과가 없습니다!");
      window.location.href = window.location.protocol + "//" + window.location.host + "/process";
    }

    // $or: Array.from(new Set(projects.map((p) => { return p.desid }))).map((desid) => { return { desid } })

    matrix = await ajaxMultiple([
      [ { noFlat: true, whereQuery: {} }, BACKHOST + "/getDesigners" ],
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
    this.onofflineWordsClassName = "onofflineWordsClassName";
    this.numbersExtractClassName = "numbersExtractClassName";

    this.baseMaker();
    this.searchProjects();
    this.reportEvent();
    this.extractEvent();
    this.addTransFormEvent();

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
