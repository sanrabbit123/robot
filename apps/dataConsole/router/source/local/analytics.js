const AnalyticsJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.module = {};
  this.module.paddingTop = 38;
  this.module.height = <%% 18, 16, 16, 16, 18 %%>;
  this.module.marginBottom = 18;
  this.module.initialLine = 14;
  this.module.initialMargin = 14;

  this.grayBarWidth = null;
  this.belowHeight = null;
  this.whiteBox = null;
  this.standardDoms = [];
  this.caseDoms = [];
  this.cases = [];
  this.totalMother = null;
  this.totalFather = null;
  this.totalFatherChildren = [];
  this.onView = "mother";
  this.whiteConvert = 0;
  this.whiteMatrixA = null;
  this.whiteMatrixB = null;
  this.aspirants = [];
  this.aspirants_searchInput = null;
  this.whiteSse = null;
  this.ea = <%% "px", "px", "px", "px", "vw" %%>;
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
  this.designers = [];
}

AnalyticsJs.prototype.mainDataRender = async function () {
  const instance = this;
  const { ea, totalContents, asyncProcessText } = this;
  const { createNode, colorChip, withOut, dateToString, ajaxJson, autoComma, findByAttribute } = GeneralJs;
  try {
    let columns;
    let values;
    let standards;

    standards = {
      columns: [
        {
          title: "아이디",
          width: 96,
          name: "cliid",
          type: "string",
        },
        {
          title: "성함",
          width: 60,
          name: "name",
          type: "string",
        },
      ],
      values: {},
    }

    columns = [
      {
        title: "응대 상태",
        width: 100,
        name: "status",
        colorStandard: true,
        colorMap: [
          {
            value: "응대중",
            color: colorChip.black,
          },
          {
            value: "장기",
            color: colorChip.black,
          },
          {
            value: "드랍",
            color: colorChip.deactive,
          },
          {
            value: "진행",
            color: colorChip.green,
          },
        ],
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          }
        ].concat([
          "응대중",
          "장기",
          "드랍",
          "진행",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        }))
      },
      {
        title: "주소",
        width: 600,
        name: "address",
        type: "string",
      },
    ];

    values = {};

    for (let { client } of instance.clients) {

      standards.values[client.cliid] = [
        {
          value: client.cliid,
          name: "cliid",
        },
        {
          value: client.name,
          name: "name",
        },
      ];

      values[client.cliid] = [
        {
          value: client.requests[0].analytics.response.status,
          name: "status",
        },
        {
          value: client.requests[0].request.space.address,
          name: "address",
        },
      ];

    }

    return { standards, columns, values };

  } catch (e) {
    console.log(e);
  }
}

AnalyticsJs.prototype.coreColorSync = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText } = this;
  const { createNode, colorChip, withOut, dateToString, ajaxJson, autoComma, findByAttribute } = GeneralJs;
  try {
    let columns;
    let colorStandard;
    let standardDoms, valueDoms;
    let thisValue;
    let thisColor;
    let thisTargets;

    ({ columns } = await this.mainDataRender());

    colorStandard = columns.find((obj) => { return obj.colorStandard === true });

    standardDoms = [ ...document.querySelectorAll('.' + standardCaseClassName) ];
    valueDoms = [ ...document.querySelectorAll('.' + valueCaseClassName) ];

    for (let i = 0; i < standardDoms.length; i++) {
      thisValue = findByAttribute([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ], "name", colorStandard.name).textContent.trim();
      if (colorStandard.colorMap.find((o) => { return o.value === thisValue }) === undefined) {
        throw new Error("invalid value color match");
      }
      thisColor = colorStandard.colorMap.find((o) => { return o.value === thisValue }).color;
      thisTargets = [ ...standardDoms[i].querySelectorAll('.' + valueTargetClassName) ].concat([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ]);
      for (let dom of thisTargets) {
        dom.style.color = (new RegExp(asyncProcessText, "gi")).test(dom.textContent) ? colorChip.gray3 : thisColor;
        dom.setAttribute("color", (new RegExp(asyncProcessText, "gi")).test(dom.textContent) ? colorChip.gray3 : thisColor);
      }
    }

  } catch (e) {
    console.log(e);
  }
}

AnalyticsJs.prototype.whiteCardView = function (desid) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      const blank = "&nbsp;/&nbsp;";
      const designer = instance.designers.find((d) => { return d.desid === desid });
      let cancelBack, whitePrompt;
      let titleWhite;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteMaker;
      let iframeMaker;
      let linkDictionary;

      linkDictionary = {
        checklist: BACKHOST + "/designer?mode=checklist&entire=true&dataonly=true&normal=true&desid=" + designer.desid,
        possible: BACKHOST + "/middle/designerPossible?desid=" + designer.desid + "&entire=true&normal=true",
        portfolio: BACKHOST + "/designer?mode=general&desid=" + designer.desid + "&dataonly=true&entire=true&normal=true",
        report: BACKHOST + "/middle/designerReport?desid=" + designer.desid + "&entire=true&normal=true",
      }

      margin = 30;
      titleHeight = 50;
      innerMargin = 24;
      overlap = 12;

      titleTextTop = isMac() ? 2 : 2;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 0;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      iframeMaker = (mode) => {
        const src = linkDictionary[mode];
        return function (e) {
          const whiteTong = document.querySelector('.' + whiteBaseClassName);
          const toggle = this.getAttribute("off");
          const desid = this.getAttribute("desid");
          const siblings = Array.from(document.querySelectorAll('.' + titleButtonsClassName));
          whiteTong.removeChild(whiteTong.firstChild);
          createNode({
            mother: whiteTong,
            mode: "iframe",
            attribute: { src },
            style: {
              position: "absolute",
              display: "block",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              border: String(0),
            }
          });
          this.setAttribute("toggle", "on");
          this.style.color = colorChip.green;
          for (let dom of siblings) {
            if (dom !== this) {
              dom.setAttribute("toggle", "off");
              dom.style.color = colorChip.black;    
            }
          }
          instance.whiteCardMode = mode;
        }
      }

      whiteMaker = (reload = false) => {

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(grayBarWidth) + ea,
              width: withOut(grayBarWidth, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteCardClassName, whiteBaseClassName ],
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth, ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight, ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
          },
          child: {
            mode: "iframe",
            attribute: {
              src: linkDictionary[instance.whiteCardMode],
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
        });
  
        titleWhite = createNode({
          mother: totalContents,
          class: [ whiteCardClassName ],
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth, ea),
            height: String(titleHeight) + ea,
            background: colorChip.white,
            zIndex: String(zIndex),
            borderTopLeftRadius: String(5) + "px",
            borderTopRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "end",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "start",
              width: withOut(innerMargin * 2, ea),
            },
            children: [
              {
                attribute: { designer: designer.designer, phone: designer.information.phone.replace(/[^0-9]/gi, '') },
                event: {
                  click: function (e) {
                    const designer = this.getAttribute("designer");
                    const phone = this.getAttribute("phone");
                    const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
                    if (window.confirm(designer + " 실장님께 전화를 걸까요?")) {
                      ajaxJson({
                        who: cookies.homeliaisonConsoleLoginedEmail,
                        phone: phone
                      }, BACKHOST + "/callTo").catch((err) => { console.log(err); });
                    }
                  }
                },
                text: designer.designer,
                style: {
                  position: "relative",
                  top: String(titleTextTop) + ea,
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
              {
                attribute: { desid: desid },
                event: {
                  click: async function (e) {
                    try {
                      const desid = this.getAttribute("desid");
                      await window.navigator.clipboard.writeText(desid);
                      instance.mother.greenAlert("클립보드에 저장되었습니다!");
                    } catch (e) {
                      console.log(e);
                    }
                  },
                },
                text: designer.desid,
                style: {
                  position: "relative",
                  top: String(fontTextTop) + ea,
                  fontSize: String(fontSize) + ea,
                  marginLeft: String(fontBetween) + ea,
                  fontWeight: String(fontWeight),
                  color: colorChip.green,
                  cursor: "pointer",
                }
              },
              {
                style: {
                  display: "flex",
                  position: "absolute",
                  bottom: String(0),
                  right: String(0),
                  flexDirection: "row",
                  alignItems: "end",
                  justifyContent: "end",
                },
                children: [
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "checklist" ? "on" : "off"), desid, mode: "checklist" },
                    event: {
                      click: iframeMaker("checklist"),
                    },
                    text: "체크리스트",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "checklist" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "possible" ? "on" : "off"), desid, mode: "possible" },
                    event: {
                      click: iframeMaker("possible"),
                    },
                    text: "일정 관리",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "possible" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "portfolio" ? "on" : "off"), desid, mode: "portfolio" },
                    event: {
                      click: iframeMaker("portfolio"),
                    },
                    text: "포트폴리오",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "portfolio" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "report" ? "on" : "off"), desid, mode: "report" },
                    event: {
                      click: iframeMaker("report"),
                    },
                    text: "리포트",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "report" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: "off", desid },
                    event: {
                      click: function (e) {
                        const desid = this.getAttribute("desid");
                        blankHref(FRONTHOST + "/designer/dashboard.php?desid=" + desid);
                      }
                    },
                    text: "디자이너 콘솔",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.black,
                      cursor: "pointer",
                    }
                  },
                ]
              }
            ]
          }
        });
      }

      instance.whiteMaker = whiteMaker;

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteMaker(false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteMaker(true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

AnalyticsJs.prototype.baseMaker = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText, idNameAreaClassName, valueAreaClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson } = GeneralJs;
  const moveTargetClassName = "moveTarget";
  const menuPromptClassName = "menuPromptClassName";
  const importantCircleClassName = "importantCircleClassName";
  try {
    let totalMother;
    let grayArea, whiteArea;
    let totalPaddingTop;
    let columnAreaHeight;
    let fontSize, fontWeight;
    let idWidth, nameWidth;
    let idNameAreaPaddingTop;
    let idNameArea;
    let idNameHeight;
    let idNamePaddingBottom;
    let maxWidth;
    let valueColumnsAreaPaddingLeft;
    let valueArea;
    let valueWeight;
    let thisTong;
    let columns;
    let values;
    let valueMaxWidth;
    let thisTargets;
    let hoverEvent, hoverOutEvent;
    let standards;
    let menuPromptWidth, menuPromptHeight;
    let menuVisual;
    let menuBetween;
    let menuTextTop, menuSize, menuWeight;
    let columnsMenuEvent;
    let menuEventTong;
    let coreContentsLoad;
    let circleRight, circleTop;
  
    totalPaddingTop = 38;
    columnAreaHeight = 32;
  
    fontSize = 14;
    fontWeight = 600;
    valueWeight = 500;
  
    idWidth = 96;
    nameWidth = 60;
  
    idNameAreaPaddingTop = 17;
    idNameHeight = 36;
  
    idNamePaddingBottom = 400;
    maxWidth = 8000;
    valueMaxWidth = 1000;
  
    valueColumnsAreaPaddingLeft = 20;

    menuPromptWidth = 90;
    menuPromptHeight = 32;
    menuVisual = 4;
    menuBetween = 3;

    menuTextTop = isMac() ? -1 : 1,
    menuSize = 13;
    menuWeight = 600;

    circleRight = 2.5;
    circleTop = isMac() ? 3 : 1;

    ({ standards, columns, values } = await this.mainDataRender());
  
    hoverEvent = () => {
      return function (e) {
        const cliid = this.getAttribute("cliid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "cliid", cliid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = colorChip.green;
        }
      }
    }

    hoverOutEvent = () => {
      return function (e) {
        const cliid = this.getAttribute("cliid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "cliid", cliid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = dom.getAttribute("color") !== null ? dom.getAttribute("color") : colorChip.black;
        }
      }
    }

    menuEventTong = {
      sortEvent: (thisType, name, index) => {
        return async function (e) {
          try {
            const idNameArea = document.querySelector('.' + idNameAreaClassName);
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const idNameDoms = Array.from(document.querySelectorAll('.' + standardCaseClassName));
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const type = columns[index].type;
            let domMatrix;
            let thisDesid;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisDesid = idNameDoms[i].getAttribute("cliid");
              thisValueDom = findByAttribute(valueDoms, "cliid", thisDesid);
              domMatrix.push([
                idNameDoms[i],
                thisValueDom
              ]);
            }
  
            domMatrix.sort((a, b) => {
              let aValue, bValue;
              let aSortValue, bSortValue;
              let tempArr;
  
              aValue = findByAttribute([ ...a[1].querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent;
              bValue = findByAttribute([ ...b[1].querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent;
              
              if (type === "string") {
                aSortValue = aValue !== '' ? aValue.charCodeAt(0) : 0;
                bSortValue = bValue !== '' ? bValue.charCodeAt(0) : 0;
              } else if (type === "number") {
                aValue = aValue.replace(/[^0-9]/gi, '')
                bValue = bValue.replace(/[^0-9]/gi, '')
                aSortValue = aValue !== '' ? Number(aValue) : 0;
                bSortValue = bValue !== '' ? Number(bValue) : 0;
              } else if (type === "percentage") {
                aValue = aValue.replace(/[^0-9\.]/gi, '')
                bValue = bValue.replace(/[^0-9\.]/gi, '')
                aSortValue = aValue !== '' ? Number(aValue) : 0;
                bSortValue = bValue !== '' ? Number(bValue) : 0;
              } else if (type === "date") {
                aSortValue = aValue !== '' ? stringToDate(aValue) : stringToDate("1800-01-01");
                bSortValue = bValue !== '' ? stringToDate(bValue) : stringToDate("1800-01-01");
                aSortValue = aSortValue.valueOf();
                bSortValue = bSortValue.valueOf();
              } else if (type === "during") {
  
                if (/년/gi.test(aValue)) {
                  tempArr = aValue.split('년');
                  if (tempArr.length > 1) {
                    aSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) + Number(tempArr[1].replace(/[^0-9]/gi, ''));
                  } else {
                    aSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12);
                  }
                } else {
                  aSortValue = Number(aValue.replace(/[^0-9]/gi, ''));
                }
  
                if (/년/gi.test(bValue)) {
                  tempArr = bValue.split('년');
                  if (tempArr.length > 1) {
                    bSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) + Number(tempArr[1].replace(/[^0-9]/gi, ''));
                  } else {
                    bSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12);
                  }
                } else {
                  bSortValue = Number(bValue.replace(/[^0-9]/gi, ''));
                }
  
              } else {
                aSortValue = aValue !== '' ? aValue.charCodeAt(0) : 0;
                bSortValue = bValue !== '' ? bValue.charCodeAt(0) : 0;
              }
              
              if (thisType === "down") {
                return bSortValue - aSortValue;
              } else {
                return aSortValue - bSortValue;
              }
            });
  
            for (let [ standard, value ] of domMatrix) {
              idNameArea.appendChild(standard);
              valueArea.appendChild(value);
            }
  
            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
      filterEvent: (thisValue, name, index) => {
        return async function (e) {
          try {
            const idNameArea = document.querySelector('.' + idNameAreaClassName);
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const idNameDoms = Array.from(document.querySelectorAll('.' + standardCaseClassName));
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const last = "lastfilter";
            const type = columns[index].type;
            let domMatrix;
            let thisDesid;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisDesid = idNameDoms[i].getAttribute("cliid");
              thisValueDom = findByAttribute(valueDoms, "cliid", thisDesid);
              domMatrix.push([
                idNameDoms[i],
                thisValueDom
              ]);
            }

            if (thisValue === "$all") {
              for (let [ standard, value ] of domMatrix) {
                standard.style.display = "flex";
                value.style.display = "flex";
                standard.setAttribute(last, "none");
                value.setAttribute(last, "none");
              }
            } else {
              for (let [ standard, value ] of domMatrix) {
                if (standard.getAttribute(last) === name) {
                  if (findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim() === thisValue) {
                    standard.style.display = "flex";
                    value.style.display = "flex";
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                } else {
                  if (findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim() === thisValue) {
                    if (standard.style.display !== "none") {
                      standard.style.display = "flex";
                      value.style.display = "flex";
                    }
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                }
                standard.setAttribute(last, name);
                value.setAttribute(last, name);
              }
            }

            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
    }

    columnsMenuEvent = (index) => {
      return async function (e) {
        try {
          e.preventDefault();
          const name = this.getAttribute("name");
          const index = Number(this.getAttribute("index"));
          const thisObject = columns[index];
          const zIndex = 4;
          let cancelBack, blackPrompt;
          let thisMenu;

          thisMenu = [
            {
              value: "내림차순",
              functionName: "sortEvent_down",
            },
            {
              value: "오름차순",
              functionName: "sortEvent_up",
            },
          ];

          if (Array.isArray(thisObject.menu)) {
            thisMenu = thisMenu.concat(thisObject.menu);
          }

          cancelBack = createNode({
            mother: totalContents,
            class: [ menuPromptClassName ],
            event: (e) => { removeByClass(menuPromptClassName) },
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

          blackPrompt = createNode({
            mother: totalContents,
            class: [ menuPromptClassName ],
            style: {
              position: "fixed",
              top: String(e.y + menuVisual) + "px",
              left: String(e.x + menuVisual) + "px",
              width: String(menuPromptWidth) + ea,
              background: colorChip.white,
              animation: "fadeuplite 0.3s ease forwards",
              zIndex: String(zIndex),
            },
            children: thisMenu.map(({ value, functionName }) => {
              const functionOrderArr = functionName.split("_");
              const [ thisFunctionName ] = functionOrderArr;
              let thisArguments;
              if (functionOrderArr.length > 1) {
                thisArguments = functionOrderArr.slice(1).concat([ name, index ]);
              } else {
                thisArguments = [ name, index ];
              }
              return {
                event: {
                  selectstart: (e) => { e.preventDefault() },
                  click: menuEventTong[thisFunctionName](...thisArguments),
                },
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(menuPromptWidth) + ea,
                  height: String(menuPromptHeight) + ea,
                  borderRadius: String(5) + "px",
                  background: colorChip.gradientGray,
                  marginBottom: String(menuBetween) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                },
                child: {
                  text: value,
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                  },
                  style: {
                    position: "relative",
                    top: String(menuTextTop) + ea,
                    fontSize: String(menuSize) + ea,
                    fontWeight: String(menuWeight),
                    color: colorChip.white,
                  }
                }
              }
            })
          })

        } catch (e) {
          console.log(e);
        }
      }
    }

    totalMother = createNode({
      mother: totalContents,
      class: [ "totalMother" ],
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: withOut(this.belowHeight, ea),
      }
    });
    this.totalMother = totalMother;

    coreContentsLoad = async (reload = false) => {
      try {

        if (reload) {
          ({ standards, columns, values } = await instance.mainDataRender());
        }

        cleanChildren(totalMother);

        createNode({
          mother: totalMother,
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(this.grayBarWidth) + ea,
            height: withOut(0, ea),
            background: colorChip.gray0,
          }
        });
        createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(totalPaddingTop) + ea,
            height: String(columnAreaHeight) + ea,
            borderBottom: "1px dashed " + colorChip.gray3,
          },
          children: [
            {
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "start",
                verticalAlign: "top",
                width: String(this.grayBarWidth) + ea,
              },
              children: standards.columns.map(({ title, width }) => {
                return {
                  style: {
                    display: "inline-flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "start",
                    width: String(width) + ea,
                    cursor: "pointer",
                  },
                  child: {
                    text: title,
                    style: {
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.green,
                    }
                  }
                }
              })
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: withOut(0, ea),
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
              child: {
                class: [ moveTargetClassName ],
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: withOut(0, ea),
                  flexDirection: "row",
                  alignItems: "start",
                  justifyContent: "start",
                  paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
                },
                children: columns.map(({ title, width, name }, index) => {
                  return {
                    attribute: {
                      name: name,
                      index: String(index),
                    },
                    event: {
                      selectstart: (e) => { e.preventDefault() },
                      click: columnsMenuEvent(index),
                      contextmenu: columnsMenuEvent(index),
                    },
                    style: {
                      display: "inline-flex",
                      flexDirection: "row",
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "start",
                      width: String(width) + ea,
                      cursor: "pointer",
                    },
                    child: {
                      style: {
                        display: "inline-block",
                        width: String(90) + '%',
                        position: "relative",
                        overflow: "hidden",
                        textAlign: "center",
                      },
                      child: {
                        style: {
                          display: "flex",
                          width: String(valueMaxWidth) + ea,
                          position: "relative",
                          left: withOut(50, valueMaxWidth / 2, ea),
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        child: {
                          text: title,
                          style: {
                            fontSize: String(fontSize) + ea,
                            fontWeight: String(fontWeight),
                            color: colorChip.green,
                          }
                        }
                      }
                    }
                  }
                })
              }
            }
          ]
        });
      
        [ idNameArea, valueArea ] = createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(idNameAreaPaddingTop) + ea,
            height: withOut(totalPaddingTop + columnAreaHeight + idNameAreaPaddingTop, ea),
            width: withOut(0, ea),
            overflow: "scroll",
          },
          children: [
            {
              class: [ idNameAreaClassName ],
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                flexDirection: "column",
                position: "relative",
                width: String(this.grayBarWidth) + ea,
                paddingBottom: String(idNamePaddingBottom) + ea,
              }
            },
            {
              class: [ valueAreaClassName ],
              style: {
                display: "inline-block",
                position: "relative",
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
            }
          ]
        }).children;
      
        for (let { client } of instance.clients) {
      
          createNode({
            mother: idNameArea,
            attribute: { cliid: client.cliid, lastfilter: "none" },
            event: {
              click: instance.whiteCardView(client.cliid),
            },
            class: [ standardCaseClassName ],
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              height: String(idNameHeight) + ea,
              justifyContent: "center",
              alignItems: "start",
              cursor: "pointer",
            },
            children: standards.values[client.cliid].map(({ value, name }, index) => {
              return {
                style: {
                  display: "inline-flex",
                  flexDirection: "row",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "start",
                  width: String(standards.columns[index].width) + ea,
                },
                child: {
                  class: [ valueTargetClassName ],
                  attribute: { name },
                  text: value,
                  style: {
                    position: "relative",
                    transition: "all 0.3s ease",
                    fontSize: String(fontSize) + ea,
                    fontWeight: String(fontWeight),
                    color: colorChip.black,
                  },
                }
              }
            })
          });
      
          thisTong = createNode({
            mother: valueArea,
            attribute: { cliid: client.cliid, lastfilter: "none" },
            class: [ moveTargetClassName, valueCaseClassName, client.cliid ],
            event: {
              mouseenter: hoverEvent(),
              mouseleave: hoverOutEvent(),
            },
            style: {
              display: "flex",
              position: "relative",
              width: String(maxWidth) + ea,
              height: String(idNameHeight) + ea,
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "start",
              paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
              cursor: "pointer",
            }
          })
    
          for (let i = 0; i < columns.length; i++) {
            createNode({
              mother: thisTong,
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                justifyContent: "center",
                alignItems: "start",
                width: String(columns[i].width) + ea,
              },
              child: {
                style: {
                  display: "inline-block",
                  width: String(90) + '%',
                  position: "relative",
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    width: String(valueMaxWidth) + ea,
                    position: "relative",
                    left: withOut(50, valueMaxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    attribute: {
                      cliid: client.cliid,
                      name: values[client.cliid][i].name,
                    },
                    class: [ valueTargetClassName ],
                    text: String(values[client.cliid][i].value),
                    style: {
                      position: "relative",
                      transition: "all 0.1s ease",
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(valueWeight),
                      color: (new RegExp(asyncProcessText, "gi")).test(values[client.cliid][i].value) ? colorChip.gray3 : colorChip.black,
                    }
                  }
                }
              }
            });
          }
      
        }
    
        await this.coreColorSync();

      } catch (e) {
        console.log(e);
      }
    }

    await coreContentsLoad(false);
    this.coreContentsLoad = coreContentsLoad;

  } catch (e) {
    console.log(e);
  }
}

AnalyticsJs.prototype.makeSearchEvent = async function () {
  const instance = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { ajaxJson, setQueue } = GeneralJs;
  try {
    this.searchInput.addEventListener("keypress", async function (e) {
      try {
        if (e.key === "Enter") {
          if (instance.totalFather !== null) {
            instance.totalFather.classList.remove("fadein");
            instance.totalFather.classList.add("fadeout");
            instance.totalMother.classList.remove("justfadeoutoriginal");
            instance.totalMother.classList.add("justfadeinoriginal");
            setQueue(() => {
              instance.totalFather.remove();
              instance.totalFather = null;
            }, 501);
          }
          if (document.querySelector('.' + whiteBaseClassName) !== null) {
            const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
            cancelBack.style.animation = "justfadeout 0.3s ease forwards";
            if (w0 !== undefined) {
              w0.style.animation = "fadedownlite 0.3s ease forwards";
            }
            if (w1 !== undefined) {
              w1.style.animation = "fadedownlite 0.3s ease forwards";
            }
            setQueue(() => {
              cancelBack.click();
            }, 350);
          }

          const value = this.value.trim().replace(/\&\=\+\\\//gi, '');
          const designers = await ajaxJson({ noFlat: true, query: value }, BACKHOST + "/searchDesigners", { equal: true });
          const histories = await ajaxJson({
            method: "designer",
            property: [ "manager", "important" ],
            idArr: designers.map((d) => { return d.desid }),
          }, BACKHOST + "/getHistoryProperty", { equal: true });

          for (let designer of designers) {
            designer.manager = histories[designer.desid].manager;
            designer.important = histories[designer.desid].important;
          }

          instance.designers = designers;
          await instance.coreContentsLoad(true);
          
          setQueue(async () => {
            try {
              if (instance.designers.length === 1) {
                const tempFunc = instance.whiteCardView(instance.designers[0].desid);
                await tempFunc({});
              }
            } catch (e) {
              console.log(e);
            }
          }, 350);

        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

AnalyticsJs.prototype.makeMessageEvent = async function () {
  const instance = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { findByAttribute, ajaxJson } = GeneralJs;
  try {
    window.addEventListener("message", function (e) {
      try {
        const data = JSON.parse(e.data);
        if (typeof data === "object" && data !== null) {
          if (data.type === "whiteConverting") {
            if (document.querySelector('.' + whiteBaseClassName) !== null) {
              if (findByAttribute([ ...document.querySelectorAll('.' + titleButtonsClassName) ], "mode", data.mode) !== null) {
                findByAttribute([ ...document.querySelectorAll('.' + titleButtonsClassName) ], "mode", data.mode).click();
              }
            }
          } else if (data.type === "checklistUpdate") {
            let designers;
            let histories;

            ajaxJson({ noFlat: true, whereQuery: {} }, BACKHOST + "/getDesigners", { equal: true }).then((de) => {
              designers = de;
              return ajaxJson({
                method: "designer",
                property: [ "manager", "important" ],
                idArr: designers.map((d) => { return d.desid }),
              }, BACKHOST + "/getHistoryProperty", { equal: true });
            }).then((h) => {
              histories = h;
              for (let designer of designers) {
                designer.manager = histories[designer.desid].manager;
                designer.important = histories[designer.desid].important;
              }
              instance.designers = designers;
              return instance.coreContentsLoad(true);
            }).catch((err) => {
              console.log(err);
            });
          }
        }
      } catch {}
    })
  } catch (e) {
    console.log(e);
  }
}

AnalyticsJs.prototype.makeExtractEvent = async function () {
  const instance = this;
  const { ajaxJson, blankHref } = GeneralJs;
  try {
    const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
    this.mother.belowButtons.sub.extractIcon.addEventListener("click", async function (e) {
      try {
        if (instance.normalMatrix === null) {
          window.alert("잠시 기다렸다가 다시 시도해주세요!");
        } else {
          const today = new Date();
          const data = await instance.mainDataRender();
          let thisName;
          let thisObject;
          let matrix;
          let tempArr;
          let thisDesigner;

          for (let desid in data.values) {
            for (let obj of data.values[desid]) {
              thisName = obj.name;
              thisObject = instance.normalMatrix[desid].find((obj) => { return obj.name === thisName });
              if (thisObject !== undefined) {
                obj.value = thisObject.value;
              }
            }
          }

          matrix = [];
          tempArr = [
            "아이디",
            "이름",
            // -------------------------------
            // add
            "이메일",
            "계좌번호",
            "사업자 분류",
            "사업자 등록번호",
            // -------------------------------
          ];
          for (let obj of data.columns) {
            tempArr.push(obj.title);
          }
          matrix.push(tempArr);

          for (let desid in data.values) {

            thisDesigner = instance.designers.find((d) => { return d.desid === desid });

            tempArr = [];
            tempArr.push(desid);
            tempArr.push(thisDesigner.designer);

            // -------------------------------
            // add
            tempArr.push(thisDesigner.information.email);
            tempArr.push(thisDesigner.information.business.account.length > 0 ? thisDesigner.information.business.account[0].bankName + " " + thisDesigner.information.business.account[0].accountNumber : "");
            tempArr.push(thisDesigner.information.business.businessInfo.classification);
            tempArr.push(thisDesigner.information.business.businessInfo.businessNumber);
            // -------------------------------

            for (let obj of data.columns) {
              thisObject = data.values[desid].find((o) => { return o.name === obj.name });
              tempArr.push(thisObject.value);
            }
            matrix.push(tempArr);
          }

          instance.mother.greenAlert("시트 추출이 완료되면 자동으로 열립니다!");
          ajaxJson({
            values: matrix,
            newMake: true,
            parentId: parentId,
            sheetName: "fromDB_designer_" + String(today.getFullYear()) + instance.mother.todayMaker()
          }, BACKHOST + "/sendSheets", { equal: true }).then((result) => {
            blankHref(result.link);
          }).catch((err) => {
            console.log(err);
          })

        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

AnalyticsJs.prototype.normalReportWhite = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, autoComma, zeroAddition } = GeneralJs;
  const vaildValue = function (target) {
    const today = new Date();
    let valueArr0, valueArr1, valueArr2;
    target.style.color = GeneralJs.colorChip.black;
    if (!/[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/.test(target.value)) {
      valueArr0 = target.value.split(" ~ ");
      valueArr1 = valueArr0[0].split("-");
      if (valueArr0[1] !== undefined) {
        valueArr2 = valueArr0[1].split("-");
        if (valueArr1.length === 3 && valueArr2.length === 3) {
          target.value = String(valueArr1[0]) + '-' + zeroAddition(valueArr1[1]) + '-' + zeroAddition(valueArr1[2]) + ' ~ ' + String(valueArr2[0]) + '-' + zeroAddition(valueArr2[1]) + '-' + zeroAddition(valueArr2[2]);
        } else {
          target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
        }
      } else {
        target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
      }
    }
    target.value = (/[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/.exec(target.value))[0];

    valueArr0 = target.value.split(" ~ ");
    valueArr1 = valueArr0[0].split("-");
    valueArr2 = valueArr0[1].split("-");
    if ((Number(valueArr1[0]) * 12) + Number(valueArr1[1].replace(/^0/, '')) > (Number(valueArr2[0]) * 12) + Number(valueArr2[1].replace(/^0/, ''))) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }
    if (Number(valueArr1[1].replace(/^0/, '')) > 12 || Number(valueArr1[1].replace(/^0/, '')) < 1) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }
    if (Number(valueArr2[1].replace(/^0/, '')) > 12 || Number(valueArr2[1].replace(/^0/, '')) < 1) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }
    if (Number(valueArr1[0]) < 19) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }

    GeneralJs.stacks.reportBoxStartDayInputValue = target.value;
  }
  return async function (e) {
    try {
      const zIndex = 4;
      let cancelBack, whitePrompt;
      let titleWhite;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteReportMaker;
      let iframeMaker;
      let linkDictionary;
      let base, scrollBox;
      let titleArea;
      let basePaddingTop;
      let basePaddingBottom;
      let divideNumber;
      let lineBetween;
      let linePaddingLeft;
      let wordingSize;
      let linePaddingTop;
      let linePaddingBottom;
      let designerSize;
      let desidSize;
      let subTitleLeft;
      let subTitleBottom;
      let data;
      let today;
      let ago;
      let agoDate;
      let loading;
      let loadingWidth;
      let style;
      let startPaddingTop;
      let todayRange, dateInput;
      let todayString;
      let inputWidth, inputSize, inputWeight;
      let subTodaySize, subTodayWeight;
      let dataLoad;

      today = new Date();
      ago = 30;
      agoDate = new Date();
      agoDate.setDate(agoDate.getDate() - ago);

      margin = 30;
      titleHeight = 58;
      innerMargin = 24;
      overlap = 12;

      titleTextTop = isMac() ? 2 : 0;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 0;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      basePaddingTop = 10;
      basePaddingBottom = 6;
      divideNumber = 4;
      lineBetween = 4;
      linePaddingLeft = 16;
      wordingSize = 14;
      linePaddingTop = isMac() ? 10 : 12;
      linePaddingBottom = isMac() ? 11 : 11;
      designerSize = 16;
      desidSize = 11;
      subTitleLeft = 1;
      subTitleBottom = isMac() ? 6 : 4;
      startPaddingTop = 10;

      loadingWidth = 48;

      inputWidth = 500;
      inputSize = 20;
      inputWeight = 500;

      subTodaySize = 13;
      subTodayWeight = 200;

      dataLoad = () => {};

      whiteReportMaker = (fromDate, toDate, reload = false) => {

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(grayBarWidth) + ea,
              width: withOut(grayBarWidth, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteCardClassName, whiteBaseClassName ],
          style: {
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth, ea),
            height: withOut(0 + (margin * 2) + belowHeight, ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
          },
          children: [
            {
              style: {
                display: "block",
                position: "relative",
                marginLeft: String(innerMargin) + ea,
                width: withOut(innerMargin * 2, ea),
                height: String(titleHeight) + ea,
                borderBottom: "1px dashed " + colorChip.gray3,
              }
            },
            {
              style: {
                display: "block",
                position: "relative",
                marginLeft: String(innerMargin) + ea,
                width: withOut(innerMargin * 2, ea),
                height: withOut(titleHeight + startPaddingTop, ea),
                paddingTop: String(startPaddingTop) + ea,
                overflow: "scroll",
              },
            }
          ]
        });

        [ titleArea, scrollBox ] = Array.from(whitePrompt.children);

        todayRange = dateToString(fromDate).slice(2) + " ~ " + dateToString(toDate).slice(2);
        todayString = dateToString(new Date());

        dateInput = createNode({
          mode: "input",
          attribute: {
            type: "text",
          },
          event: {
            focus: function (e) {
              this.style.color = colorChip.green;
              GeneralJs.stacks.reportBoxStartDayInputValue = this.value;
            },
            blur: function (e) {
              vaildValue(this);
            },
            keyup: function (e) {
              if (e.key === "Enter") {
                vaildValue(this);
                const dateArr = this.value.split(" ~ ");
                const startDay = "20" + dateArr[0];
                const endDay = "20" + dateArr[1];

                this.blur();

                cleanChildren(scrollBox);

                loading = instance.mother.returnLoadingIcon();
                style = {
                  position: "absolute",
                  width: String(loadingWidth) + ea,
                  height: String(loadingWidth) + ea,
                  top: withOut(50, loadingWidth / 2, ea),
                  left: withOut(50, loadingWidth / 2, ea),
                }
                for (let i in style) {
                  loading.style[i] = style[i];
                }
                whitePrompt.appendChild(loading);

                ajaxJson({
                  mode: "designer",
                  start: stringToDate(startDay),
                  end: stringToDate(endDay)
                }, BACKHOST + "/getProjectReport", { equal: true }).then(dataLoad(loading)).catch((err) => {
                  console.log(err);
                });
              }
            }
          },
          mother: titleArea,
          style: {
            position: "absolute",
            left: String(0) + ea,
            bottom: String(startPaddingTop) + ea,
            width: String(inputWidth) + ea,
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            border: String(0) + ea,
            outline: String(0) + ea,
            color: colorChip.black,
            fontFamily: "graphik",
          }
        });
        dateInput.value = todayRange;

        createNode({
          mother: titleArea,
          text: "today : " + todayString,
          style: {
            position: "absolute",
            fontSize: String(subTodaySize) + ea,
            fontWeight: String(subTodayWeight) + ea,
            right: String(0) + ea,
            bottom: String(startPaddingTop) + ea,
            color: colorChip.green,
            fontFamily: "graphik",
          }
        });

        loading = instance.mother.returnLoadingIcon();
        style = {
          position: "absolute",
          width: String(loadingWidth) + ea,
          height: String(loadingWidth) + ea,
          top: withOut(50, loadingWidth / 2, ea),
          left: withOut(50, loadingWidth / 2, ea),
        }
        for (let i in style) {
          loading.style[i] = style[i];
        }
        whitePrompt.appendChild(loading);

        dataLoad = (loading) => {
          return (data) => {
            loading.remove();
            cleanChildren(scrollBox);
  
            for (let designer of data.designers) {
        
              designer.proposal = designer.proposal.filter((obj) => { return obj.amount !== 0 });
              designer.process = designer.process.filter((obj) => { return obj.amount !== 0 });
              designer.first = designer.first.filter((obj) => { return obj.amount !== 0 });
              designer.remain = designer.remain.filter((obj) => { return obj.amount !== 0 });
          
              base = createNode({
                mother: scrollBox,
                style: {
                  display: "block",
                  position: "relative",
                  width: String(100) + '%',
                  paddingTop: String(basePaddingTop) + ea,
                  paddingBottom: String(basePaddingBottom) + ea,
                }
              });
          
              createNode({
                mother: base,
                class: [ "hoverDefault_lite" ],
                attribute: { desid: designer.desid },
                event: {
                  click: function (e) {
                    blankHref(FRONTHOST + "/designer/report.php?desid=" + this.getAttribute("desid"));
                  }
                },
                text: `${designer.designer}&nbsp;&nbsp;<b%${designer.desid}%b>`,
                style: {
                  display: "inline-block",
                  fontSize: String(designerSize) + ea,
                  fontWeight: String(600),
                  color: colorChip.black,
                  marginLeft: String(subTitleLeft) + ea,
                  marginBottom: String(subTitleBottom) + ea,
                },
                bold: {
                  fontSize: String(desidSize) + ea,
                  fontWeight: String(300),
                  color: colorChip.green
                }
              });
          
              tong = createNode({
                mother: base,
                style: {
                  display: "block",
                  borderRadius: String(5) + "px",
                  border: "1px solid " + colorChip.gray3,
                  boxSizing: "border-box",
                  width: String(100) + '%',
                }
              });
          
              for (let i = 0; i < divideNumber; i++) {
                area = createNode({
                  mother: tong,
                  style: {
                    display: "inline-block",
                    width: String(100 / divideNumber) + '%',
                    borderRight: i === divideNumber - 1 ? "" : "1px dashed " + colorChip.gray3,
                    verticalAlign: "top",
                    paddingTop: String(linePaddingTop) + ea,
                    paddingBottom: String(linePaddingBottom) + ea,
                    boxSizing: "border-box",
                  }
                });
                if (i === 0) {
          
                  createNode({
                    mother: area,
                    text: `<b%제안 횟수%b> : ${String(designer.proposal.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%제안액 누계%b> : ${autoComma(designer.proposal.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%제안액 평균%b> : ${designer.proposal.length === 0 ? String(0) : autoComma(Math.floor((designer.proposal.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.proposal.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%평단가 평균%b> : ${designer.proposal.length === 0 ? String(0) : autoComma(Math.floor((designer.proposal.reduce((acc, curr) => { return acc + curr.per }, 0) / designer.proposal.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                } else if (i === 1) {
          
                  createNode({
                    mother: area,
                    text: `<b%계약 횟수%b> : ${String(designer.process.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%디자인비 누계%b> : ${autoComma(designer.process.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%디자인비 평균%b> : ${designer.process.length === 0 ? String(0) : autoComma(Math.floor((designer.process.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.process.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%디자인비 평단가%b> : ${designer.process.length === 0 ? String(0) : autoComma(Math.floor((designer.process.reduce((acc, curr) => { return acc + curr.per }, 0) / designer.process.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
        
                } else if (i === 2) {
          
                  createNode({
                    mother: area,
                    text: `<b%선금 정산 횟수%b> : ${String(designer.first.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%선금 정산 누계%b> : ${autoComma(designer.first.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%선금 정산 평균%b> : ${designer.first.length === 0 ? String(0) : autoComma(Math.floor((designer.first.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.first.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%평균 평수%b> : ${designer.first.length === 0 ? String(0) : autoComma(Math.floor((designer.first.reduce((acc, curr) => { return acc + curr.pyeong }, 0) / designer.first.length) / 1) * 1)}평`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                } else {
          
                  createNode({
                    mother: area,
                    text: `<b%잔금 정산 횟수%b> : ${String(designer.remain.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%잔금 정산 누계%b> : ${autoComma(designer.remain.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%잔금 정산 평균%b> : ${designer.remain.length === 0 ? String(0) : autoComma(Math.floor((designer.remain.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.remain.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%평균 평수%b> : ${designer.remain.length === 0 ? String(0) : autoComma(Math.floor((designer.remain.reduce((acc, curr) => { return acc + curr.pyeong }, 0) / designer.remain.length) / 1) * 1)}평`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                }
              }
          
            }
          }
        }

        ajaxJson({
          mode: "designer",
          start: fromDate,
          end: toDate
        }, BACKHOST + "/getProjectReport", { equal: true }).then(dataLoad(loading)).catch((err) => {
          console.log(err);
        });

      }

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteReportMaker(agoDate, today, false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteReportMaker(agoDate, today, true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

AnalyticsJs.prototype.makeReportEvent = async function () {
  const instance = this;
  const { ajaxJson } = GeneralJs;
  try {
    this.mother.belowButtons.square.reportIcon.addEventListener("click", instance.normalReportWhite());
  } catch (e) {
    console.log(e);
  }
}

AnalyticsJs.prototype.launching = async function () {
  const instance = this;
  const { returnGet, ajaxJson } = GeneralJs;
  try {
    const getObj = returnGet();
    let loading;
    let designers;
    let histories;
    let members;
    let clients;
    let ago;

    this.grayBarWidth = this.mother.grayBarWidth;
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;

    this.grayBarWidth = <%% 210, 200, 200, 200, 0 %%>;
    this.mother.grayBarWidth = <%% 210, 200, 200, 210, 0 %%>;

    if (getObj.dataonly === "true") {
      this.belowHeight = this.mother.belowHeight = 0;
      this.grayBarWidth = this.mother.grayBarWidth = 0;
    }

    document.getElementById("grayLeftOpenButton").remove();

    loading = await this.mother.loadingRun();

    ago = new Date();
    ago.setMonth(ago.getMonth() - 3);

    clients = await ajaxJson({ mode: "get", whereQuery: {
      "client.requests": {
        $elemMatch: {
          "request.timeline": { $gte: ago }
        }
      }
    }, projectQuery: {
      "client": 1,
    } }, LOGHOST + "/clientAnalytics", { equal: true });

    members = await ajaxJson({ type: "get" }, BACKHOST + "/getMembers", { equal: true });

    this.members = members;
    this.clients = clients;
    this.normalMatrix = null;
    this.valueTargetClassName = "valueTargetClassName";
    this.valueCaseClassName = "valueCaseClassName";
    this.standardCaseClassName = "standardCaseClassName";
    this.idNameAreaClassName = "idNameAreaClassName";
    this.valueAreaClassName = "valueAreaClassName";
    this.titleButtonsClassName = "titleButtonsClassName";
    this.whiteCardClassName = "whiteCardClassName";
    this.whiteBaseClassName = "whiteBaseClassName";
    this.whiteCardMode = "checklist";
    this.asyncProcessText = "로드중..";

    await this.baseMaker();
    await this.makeSearchEvent();
    await this.makeMessageEvent();
    await this.makeExtractEvent();
    await this.makeReportEvent();

    loading.parentNode.removeChild(loading);

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
