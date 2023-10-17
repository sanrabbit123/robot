const MprJs = function () {
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

MprJs.prototype.mainDataRender = async function () {
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

MprJs.prototype.coreColorSync = async function () {
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

MprJs.prototype.mprBase = async function () {
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
              // click: instance.whiteCardView(client.cliid),
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

MprJs.prototype.reportWhite = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight, entireMode } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, autoComma, zeroAddition, chartJsPatch, serviceParsing } = GeneralJs;
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
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteReportMaker;
      let scrollBox;
      let titleArea;
      let today;
      let ago;
      let agoDate;
      let loading;
      let loadingWidth;
      let startPaddingTop;
      let inputWidth, inputSize, inputWeight;
      let subTodaySize, subTodayWeight;
      let dataLoad;
      let fromDate, toDate;
      let chartBetween;
      let chartHeight;
      let style;
      let todayRange;
      let todayString;
      let dateInput;
      let inputBottom;
      let middleTitleHeight;
      let previousToDate;

      toDate = new Date();
      previousToDate = new Date();
      previousToDate.setDate(previousToDate.getDate() - 1);
      ago = 21;
      fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - ago);

      margin = entireMode ? 0 : 30;
      titleHeight = 84;
      innerMargin = 36;
      overlap = 12;

      titleTextTop = isMac() ? 2 : 0;
      titleSize = 18;
      titleWeight = 800;
      middleTitleHeight = 32;

      fontTextTop = isMac() ? 1 : 0;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      loadingWidth = 48;

      inputWidth = 500;
      inputSize = 29;
      inputWeight = 200;

      subTodaySize = 15;
      subTodayWeight = 500;

      chartBetween = 40;
      chartHeight = 480;

      startPaddingTop = 40;
      inputBottom = 8;

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
              left: String(0) + ea,
              width: withOut(0, ea),
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
            left: String(0 + margin) + ea,
            width: withOut((margin * 2) + 0, ea),
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
                let endPreviousDay;

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

                endPreviousDay = stringToDate(endDay);
                endPreviousDay.setDate(endPreviousDay.getDate() - 1);
                chartJsPatch([
                  { data: { mode: "daily", fromDate: stringToDate(startDay), toDate: endPreviousDay }, url: LOGHOST + "/extractAnalytics" },
                  { data: { mode: "charge", fromDate: stringToDate(startDay), toDate: endPreviousDay }, url: LOGHOST + "/extractAnalytics" },
                  { data: { mode: "basic", fromDate: stringToDate(startDay), toDate: endPreviousDay }, url: BACKHOST + "/extractAnalytics" },
                  { data: { fromDate: stringToDate(startDay), toDate: stringToDate(endDay) }, url: S3HOST + ":3000/complexReport" },
                ]).then(dataLoad(loading)).catch((err) => {
                  console.log(err);
                });

              }
            }
          },
          mother: titleArea,
          style: {
            position: "absolute",
            left: String(0) + ea,
            bottom: String(inputBottom) + ea,
            width: String(inputWidth) + ea,
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            border: String(0) + ea,
            outline: String(0) + ea,
            color: colorChip.black,
          }
        });
        dateInput.value = todayRange;

        createNode({
          mother: titleArea,
          text: "리포트 전환",
          event: {
            click: function (e) {
              if (typeof globalThis.window.parent.postMessage === "function") {
                globalThis.window.parent.postMessage(JSON.stringify({
                  target: "first",
                  report: "reset",
                }), "*");
              }
            }
          },
          style: {
            position: "absolute",
            fontSize: String(subTodaySize) + ea,
            fontWeight: String(subTodayWeight) + ea,
            right: String(0) + ea,
            bottom: String(inputBottom) + ea,
            color: colorChip.green,
            cursor: "pointer",
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
          return (result) => {

            loading.remove();
            cleanChildren(scrollBox);

            [
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  verticalAlign: "top",
                },
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "페이지뷰, 유저수, 전환수",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "유저수, 전환수, 문의수",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "유저수 - 오가닉 / 광고 / SNS / 다이렉트",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "유저수 - 네이버 유입 / 메타 유입 / 구글 유입",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "전환수 - 오가닉 / 광고 / SNS / 다이렉트",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "페이지뷰 기기 비율 - 모바일 / 데스트탑 / 태블릿",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "문의수, 추천수, 계약수",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "유저수 / 20, 문의수, 계약수",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "광고 비용 - 네이버 / 메타 / 구글",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "광고 클릭 - 네이버 / 메타 / 구글",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  verticalAlign: "top",
                  marginBottom: String(chartBetween) + ea,
                },
              },
            ].forEach((obj) => {
              obj.mother = scrollBox;
              createNode(obj);
            });

            const [ rows, charge, basic, complex ] = result;
            const { contractDetail } = complex;

            rows.sort((a, b) => { return a.date.from.valueOf() - b.date.from.valueOf() });
            charge.sort((a, b) => { return a.date.from.valueOf() - b.date.from.valueOf() });
            basic.sort((a, b) => { return a.fromDate.valueOf() - b.fromDate.valueOf() });

            const type = "line";
            const labels = rows.map((o) => { return dateToString(o.date.from).slice(5) });
            const fill = false;
            const tension = 0.3;
            const borderJoinStyle = "round";
            const complexBoxesLength = 1;
            const visualDivide = 3;
            const visualDivideBlock = 4;
            const visualDivideFinal = 1;
            const detailBlockWidth = 60;
            const detailNormalWidth = 120;
            const detailServiceWidth = 162;
            const detailDoubleBlockWidth = 220;
            const nameBlockWidth = 200;
            const barWidth = 38;
            const contentsLongWidth = 3000;
            const detailBlockHeight = 30;
            const detailBlockSize = 16;
            let naverAds, metaAds, googleAds;
            let complexMother;
            let summaryMother;
            let contractBlockMother;
            let detailValueInjection;
            let totalWidth;
    
            // 0 - complex report
            complexMother = scrollBox.children[0];

            // 0 - 1
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "문의수",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.clients),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "추천수",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.proposal),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "계약수",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.contracts),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "계약 성공",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.contractsSuccess),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "계약 금액",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: autoComma(complex.contractsSupply) + "원",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });

            // 0 - 2
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "광고 노출",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.impressions),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "광고 클릭",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.clicks),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "MAU",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.mau),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "페이지뷰",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.pageViews),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "광고 비용",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: autoComma(complex.charge) + "원",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });

            // 0 - 12

            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "지역별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.region.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.region.map((o) => { return o.value }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.region.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "준공년차 문의수, 계약수",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.old.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.old.map((o) => { return o.value }),
                    borderColor: colorChip.green,
                    backgroundColor: colorChip.green,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.old.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "평형별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.pyeong.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.pyeong.map((o) => { return o.value }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.pyeong.map((o) => { return o.contract }),
                    borderColor: colorChip.black,
                    backgroundColor: colorChip.black,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "방 개수별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.room.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.room.map((o) => { return o.value }),
                    borderColor: colorChip.gray4,
                    backgroundColor: colorChip.gray4,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.room.map((o) => { return o.contract }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "예산별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.budget.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.budget.map((o) => { return o.value }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.budget.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "계약 형태별 문의수, 계약수",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.contract.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.contract.map((o) => { return o.value }),
                    borderColor: colorChip.green,
                    backgroundColor: colorChip.green,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.contract.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "소스별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.source.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.source.map((o) => { return o.value }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.source.map((o) => { return o.contract }),
                    borderColor: colorChip.black,
                    backgroundColor: colorChip.black,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "광고 여부 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.ad.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.ad.map((o) => { return o.value }),
                    borderColor: colorChip.gray4,
                    backgroundColor: colorChip.gray4,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.ad.map((o) => { return o.contract }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "디바이스별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.device.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.device.map((o) => { return o.value }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.device.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "거주중별 문의수, 계약수",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.living.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.living.map((o) => { return o.value }),
                    borderColor: colorChip.green,
                    backgroundColor: colorChip.green,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.living.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "층별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.floor.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.floor.map((o) => { return o.value }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.floor.map((o) => { return o.contract }),
                    borderColor: colorChip.black,
                    backgroundColor: colorChip.black,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "세대 규모별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.household.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.household.map((o) => { return o.value }),
                    borderColor: colorChip.gray4,
                    backgroundColor: colorChip.gray4,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.household.map((o) => { return o.contract }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });

            // 1
            new window.Chart(scrollBox.children[complexBoxesLength + 0].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Users",
                    data: rows.map((o) => { return o.data.users.total }),
                    borderColor: colorChip.red,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Views",
                    data: rows.map((o) => { return o.data.views.total }),
                    borderColor: colorChip.yellow,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Conversion",
                    data: rows.map((o) => { return o.data.conversion.consultingPage.total + o.data.conversion.popupOpen.total }),
                    borderColor: colorChip.purple,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });
  
            // 2
            new window.Chart(scrollBox.children[complexBoxesLength + 1].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Users",
                    data: rows.map((o) => { return o.data.users.total }),
                    borderColor: colorChip.red,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Conversion",
                    data: rows.map((o) => { return o.data.conversion.consultingPage.total + o.data.conversion.popupOpen.total }),
                    borderColor: colorChip.purple,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Clients",
                    data: basic.map((o) => { return o.client }),
                    borderColor: colorChip.green,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });
  
            // 3
            new window.Chart(scrollBox.children[complexBoxesLength + 2].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Organic",
                    data: rows.map((o) => { return o.data.users.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Ads",
                    data: rows.map((o) => { return o.data.users.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Sns",
                    data: rows.map((o) => { return o.data.users.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Direct",
                    data: rows.map((o) => { return o.data.users.total - (o.data.users.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) - (o.data.users.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    beginAtZero: true,
                    stacked: true,
                  }
                }
              }
            });
  
            // 4
            new window.Chart(scrollBox.children[complexBoxesLength + 3].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Naver",
                    data: rows.map((o) => { return o.data.users.detail.source.cases.filter((c) => { return /naver/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.softGreen,
                    backgroundColor: colorChip.softGreen,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Meta",
                    data: rows.map((o) => { return o.data.users.detail.source.cases.filter((c) => { return /instagram/gi.test(c.case) || /facebook/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Google",
                    data: rows.map((o) => { return o.data.users.detail.source.cases.filter((c) => { return /google/gi.test(c.case) || /youtube/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  }
                }
              }
            });
  
            // 5
            new window.Chart(scrollBox.children[complexBoxesLength + 4].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Organic",
                    data: rows.map((o) => { return (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Ads",
                    data: rows.map((o) => { return (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Sns",
                    data: rows.map((o) => { return (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Direct",
                    data: rows.map((o) => { return (o.data.conversion.consultingPage.total + o.data.conversion.popupOpen.total) - (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) - (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    beginAtZero: true,
                    stacked: true,
                  }
                }
              }
            });
  
            // 6
            new window.Chart(scrollBox.children[complexBoxesLength + 5].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Mobile",
                    data: rows.map((o) => { return o.data.views.detail.deviceCategory.cases.filter((c) => { return c.case === "mobile" }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Desktop",
                    data: rows.map((o) => { return o.data.views.detail.deviceCategory.cases.filter((c) => { return c.case === "desktop" }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.black,
                    backgroundColor: colorChip.black,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Tablet",
                    data: rows.map((o) => { return o.data.views.detail.deviceCategory.cases.filter((c) => { return c.case === "tablet" }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    beginAtZero: true,
                    stacked: true,
                  }
                }
              }
            });
  
            // 7
            new window.Chart(scrollBox.children[complexBoxesLength + 6].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Clients",
                    data: basic.map((o) => { return o.client }),
                    borderColor: colorChip.green,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Recommend",
                    data: basic.map((o) => { return o.recommend }),
                    borderColor: colorChip.black,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Contracts",
                    data: basic.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });
  
            // 8
            new window.Chart(scrollBox.children[complexBoxesLength + 7].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Users / 20",
                    data: rows.map((o) => { return o.data.users.total / 20 }),
                    borderColor: colorChip.red,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Clients",
                    data: basic.map((o) => { return o.client }),
                    borderColor: colorChip.green,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Contracts",
                    data: basic.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });
  
            // 9
            naverAds = [];
            metaAds = [];
            googleAds = [];
            for (let { date: { from, to } } of rows) {
              naverAds.push(charge.filter((o) => {
                return /naver/gi.test(o.information.mother);
              }).filter((o) => {
                return o.date.from.valueOf() >= from.valueOf() && o.date.to.valueOf() <= to.valueOf();
              }).reduce((acc, curr) => {
                return {
                  charge: acc.charge + curr.value.charge,
                  clicks: acc.clicks + curr.value.performance.clicks,
                  impressions: acc.impressions + curr.value.performance.impressions,
                }
              }, {
                charge: 0,
                clicks: 0,
                impressions: 0
              }));
  
              metaAds.push(charge.filter((o) => {
                return /facebook/gi.test(o.information.mother) || /instagram/gi.test(o.information.mother) || /meta/gi.test(o.information.mother);
              }).filter((o) => {
                return o.date.from.valueOf() >= from.valueOf() && o.date.to.valueOf() <= to.valueOf();
              }).reduce((acc, curr) => {
                return {
                  charge: acc.charge + curr.value.charge,
                  clicks: acc.clicks + curr.value.performance.clicks,
                  impressions: acc.impressions + curr.value.performance.impressions,
                }
              }, {
                charge: 0,
                clicks: 0,
                impressions: 0
              }));
  
              googleAds.push(charge.filter((o) => {
                return /google/gi.test(o.information.mother);
              }).filter((o) => {
                return o.date.from.valueOf() >= from.valueOf() && o.date.to.valueOf() <= to.valueOf();
              }).reduce((acc, curr) => {
                return {
                  charge: acc.charge + curr.value.charge,
                  clicks: acc.clicks + curr.value.performance.clicks,
                  impressions: acc.impressions + curr.value.performance.impressions,
                }
              }, {
                charge: 0,
                clicks: 0,
                impressions: 0
              }));
  
            }
            new window.Chart(scrollBox.children[complexBoxesLength + 8].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Naver",
                    data: naverAds.map((o) => { return o.charge }),
                    borderColor: colorChip.softGreen,
                    backgroundColor: colorChip.softGreen,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Meta",
                    data: metaAds.map((o) => { return o.charge }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Google",
                    data: googleAds.map((o) => { return o.charge }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  }
                }
              }
            });
  
            // 10
            new window.Chart(scrollBox.children[complexBoxesLength + 9].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Naver",
                    data: naverAds.map((o) => { return o.clicks }),
                    borderColor: colorChip.softGreen,
                    backgroundColor: colorChip.softGreen,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Meta",
                    data: metaAds.map((o) => { return o.clicks }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Google",
                    data: googleAds.map((o) => { return o.clicks }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  }
                }
              }
            });
  
            // contracts detail    
            summaryMother = scrollBox.lastChild;

            createNode({
              mother: summaryMother,
              style: {
                display: "block",
                position: "relative",
                width: withOut(0, ea),
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
                borderBottom: "1px solid " + colorChip.gray3,
              },
              child: {
                text: "계약자 상세 (" + String(contractDetail.length) + "명)",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });

            detailValueInjection = (contractBlockMother, value, width) => {
              createNode({
                mother: contractBlockMother,
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: typeof width === "number" ? String(width) + ea : width,
                  height: String(detailBlockHeight) + ea,
                  overflow: "scroll",
                },
                child: {
                  text: value,
                  style: {
                    position: "relative",
                    fontSize: String(detailBlockSize) + ea,
                    fontWeight: String(300),
                    color: colorChip.green,
                    top: String(titleTextTop) + ea,
                    width: String(contentsLongWidth) + ea,
                  }
                }
              });
              if (typeof width === "number") {
                createNode({
                  mother: contractBlockMother,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(barWidth) + ea,
                    height: String(detailBlockHeight) + ea,
                    overflow: "scroll",
                  },
                  child: {
                    text: "|",
                    style: {
                      position: "relative",
                      fontSize: String(detailBlockSize) + ea,
                      fontWeight: String(200),
                      color: colorChip.gray3,
                      top: String(titleTextTop) + ea,
                      width: String(contentsLongWidth) + ea,
                    }
                  }
                });
              }
              return width + barWidth;
            }

            for (let contractClient of contractDetail) {

              // mother
              contractBlockMother = createNode({
                mother: summaryMother,
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  marginBottom: String(chartBetween / visualDivideBlock) + ea,
                  verticalAlign: "top",
                },
              });

              // name
              createNode({
                mother: contractBlockMother,
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: String(nameBlockWidth) + ea,
                  height: String(detailBlockHeight) + ea,
                  overflow: "scroll",
                },
                child: {
                  text: contractClient.name + "(" + contractClient.cliid + ")",
                  style: {
                    position: "relative",
                    fontSize: String(detailBlockSize) + ea,
                    fontWeight: String(600),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    width: String(contentsLongWidth) + ea,
                  }
                }
              });

              // values
              totalWidth = nameBlockWidth;
              totalWidth += detailValueInjection(contractBlockMother, contractClient.summary.region, detailBlockWidth);
              totalWidth += detailValueInjection(contractBlockMother, (contractClient.summary.naverObject === null ? "알 수 없음" : contractClient.summary.naverObject.name), detailDoubleBlockWidth);
              totalWidth += detailValueInjection(contractBlockMother, contractClient.summary.howLong, detailNormalWidth);
              totalWidth += detailValueInjection(contractBlockMother, String(contractClient.summary.pyeong) + "평", detailBlockWidth);
              totalWidth += detailValueInjection(contractBlockMother, contractClient.summary.living, detailBlockWidth);
              totalWidth += detailValueInjection(contractBlockMother, contractClient.summary.contract, detailBlockWidth);
              totalWidth += detailValueInjection(contractBlockMother, contractClient.budget.replace(/ 이상/gi, ""), detailNormalWidth);
              totalWidth += detailValueInjection(contractBlockMother, serviceParsing(contractClient.thisProject.service).replace(/[a-zA-Z]/gi, '').trim(), detailServiceWidth);
              totalWidth += detailValueInjection(contractBlockMother, contractClient.summary.ad.replace(/ 유입/gi, ""), detailBlockWidth);
              detailValueInjection(contractBlockMother, contractClient.family, withOut(totalWidth, ea));

            }

          }
        }

        chartJsPatch([
          { data: { mode: "daily", fromDate, toDate: previousToDate }, url: LOGHOST + "/extractAnalytics" },
          { data: { mode: "charge", fromDate, toDate: previousToDate }, url: LOGHOST + "/extractAnalytics" },
          { data: { mode: "basic", fromDate, toDate: previousToDate }, url: BACKHOST + "/extractAnalytics" },
          { data: { fromDate, toDate }, url: S3HOST + ":3000/complexReport" },
        ]).then(dataLoad(loading)).catch((err) => {
          console.log(err);
        });

      }

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteReportMaker(fromDate, toDate, false);
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
            whiteReportMaker(fromDate, toDate, true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

MprJs.prototype.launching = async function () {
  const instance = this;
  const { returnGet, ajaxJson } = GeneralJs;
  try {
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true" && getObj.dataonly === "true");
    const defaultMonth = 6;
    let loading;
    let members;
    let ago;
    let clients;

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
    ago.setMonth(ago.getMonth() - defaultMonth);

    clients = await ajaxJson({ mode: "get", whereQuery: {
      "client.requests": {
        $elemMatch: {
          "request.timeline": { $gte: ago }
        }
      }
    }, projectQuery: {
      "client": 1,
    } }, CONTENTSHOST + "/clientAnalytics", { equal: true });

    members = await ajaxJson({ type: "get" }, BACKHOST + "/getMembers", { equal: true });

    this.members = members;
    this.clients = clients;
    this.valueTargetClassName = "valueTargetClassName";
    this.valueCaseClassName = "valueCaseClassName";
    this.standardCaseClassName = "standardCaseClassName";
    this.idNameAreaClassName = "idNameAreaClassName";
    this.valueAreaClassName = "valueAreaClassName";
    this.titleButtonsClassName = "titleButtonsClassName";
    this.whiteCardClassName = "whiteCardClassName";
    this.whiteBaseClassName = "whiteBaseClassName";
    this.processDetailEventClassName = "processDetailEventClassName";
    this.whiteCardMode = "aspirant";
    this.asyncProcessText = "로드중..";
    this.entireMode = entireMode;


    await this.mprBase();
    // await (this.reportWhite())();

    loading.parentNode.removeChild(loading);

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
