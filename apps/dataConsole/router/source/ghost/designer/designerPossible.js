/<%patch%>/ {
  "patch": {
    "entire": false,
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false,
    "photo": false
  },
  "class": {
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return ('가능 일정 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('가능 일정 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "designerPossible",
  "hangul": "가능 일정",
  "route": [
    "designerPossible"
  ]
} %/%/g

const DesignerPossibleJs = function () {
  this.mother = new GeneralJs();
}

DesignerPossibleJs.binaryPath = FRONTHOST + "/middle/console/possible";

DesignerPossibleJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let quoteWidth;
  let quoteHeight;
  let titleFontSize, titleFontWeight;
  let serviceChildren;
  let searchTags;
  let titleWording;
  let servicePaddingLeft;
  let serviceSize;
  let serviceBlockPaddingTop;
  let whiteBlockPaddingTop, whiteBlockPaddingBottom;
  let quotoTongHeight;
  let searchBarPaddingTop;
  let searchBarHeight;
  let searchBarWidth;
  let searchIconHeight;
  let searchIconRight, searchIconTop;
  let whiteBlockMarginBottom;
  let inputWithoutHeight;
  let serviceButtonClassName;
  let serviceBlock;
  let inputSize, inputWeight;
  let placeholder;
  let titleTop;
  let servicePaddingTop, servicePaddingBottom;
  let serviceMarginRight;
  let subTitleMarginTop, subTitleFontSize, subTitleWeight;
  let subTitleContents;
  let middleBox;
  let tagTextTop;
  let tagTongBottom;
  let boxTopVisual;
  let mobileBlockTop;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 90, 80, 74, 60, 14.5 %%>;

  quoteHeight = <%% 15, 15, 15, 15, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 35, 33, 32, 30, 6.4 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  servicePaddingBottom = <%% 10, 10, 10, 10, 10 %%>;
  servicePaddingLeft = <%% 13, 13, 13, 12, 2.2 %%>;
  serviceMarginRight = <%% 6, 6, 6, 6, 6 %%>;
  serviceSize = <%% 13, 13, 13, 12, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 11 %%>;

  searchBarPaddingTop = <%% 220, 220, 192, 164, 12.5 %%>;
  searchBarHeight = <%% 40, 40, 40, 36, 8 %%>;
  searchBarWidth = <%% 690, 516, 516, 420, 88 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 15, 15, 15, 14, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  subTitleMarginTop = <%% 2, 2, 1, 1, 0.2 %%>;
  subTitleFontSize = <%% 16, 16, 16, 15, 3.2 %%>;
  subTitleWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.3 %%>;
  tagTongBottom = <%% 3, 3, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  titleWording = "가능 일정 관리";
  subTitleContents = "프로젝트 가능 일정 제어 콘솔";

  mobileBlockTop = 4.5;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      marginBottom: String(whiteBlockMarginBottom) + ea,
      top: String(-1 * boxTopVisual) + ea,
      paddingTop: desktop ? "" : String(mobileBlockTop) + ea,
    }
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      height: String(quotoTongHeight) + ea,
      opacity: String(0.6),
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.serifAsterisk(colorChip.white),
        style: {
          display: "inline-block",
          height: String(quoteHeight) + ea,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        text: titleWording,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(titleTop) + ea,
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: String(subTitleMarginTop) + ea,
    },
    children: [
      {
        text: subTitleContents,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(0) + ea,
          fontSize: String(subTitleFontSize) + ea,
          fontWeight: String(subTitleWeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

DesignerPossibleJs.prototype.calendarChain = function () {
  const instance = this;
  const { clients, projects, requestNumber, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, colorCalendar } = GeneralJs;

  for (let i = 0; i < 18; i++) {
    instance.insertCalendarBox(i);
  }
}

DesignerPossibleJs.prototype.boxToPossible = async function () {
  const instance = this;
  const { ajaxJson, stringToDate, equalJson } = GeneralJs;
  try {
    let newPossible;
    let start, end, matrix;
    let tempObj;
    let thisPossible;
    let yesterdayPossible;
    let updateQuery;

    newPossible = [];
    yesterdayPossible = null;
    tempObj = null;
    for (let { value, dom } of this.possibleBoxes) {
      thisPossible = Number(dom.firstChild.getAttribute("possible"));

      if (yesterdayPossible === thisPossible) {
        // pass
      } else {
        if (tempObj === null) {
          if (thisPossible !== 0) {
            tempObj = {};
            tempObj.start = stringToDate(value);
            tempObj.matrix = [ thisPossible, thisPossible, thisPossible, thisPossible ];
          } else {
            // pass
          }
        } else if (typeof tempObj === "object") {
          tempObj.end = stringToDate(value);
          tempObj.end.setDate(tempObj.end.getDate() - 1);
          newPossible.push(equalJson(JSON.stringify(tempObj)));
          tempObj = null;
          if (thisPossible !== 0) {
            tempObj = {};
            tempObj.start = stringToDate(value);
            tempObj.matrix = [ thisPossible, thisPossible, thisPossible, thisPossible ];
          } else {
            // pass
          }
        }
      }

      yesterdayPossible = thisPossible;
    }


    if (GeneralJs.returnGet().entire === "true") {
      this.realtimeDesigner.possible = equalJson(JSON.stringify(newPossible));
      this.realtimeDesigner.possible.sort((a, b) => { return a.start.valueOf() - b.start.valueOf() });
      updateQuery = {};
      updateQuery["possible"] = this.realtimeDesigner.possible;
      await ajaxJson({ mode: "update", desid: instance.designer.desid, updateQuery }, BACKHOST + "/realtimeDesigner");
    } else {
      window.alert("가능 일정을 조정하고 싶으실 경우, 홈리에종에 직접 문의해주세요!");
      window.location.reload();
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerPossibleJs.prototype.possiblePrompt = function () {
  const instance = this;
  const { clients, projects, requestNumber, ea, baseTong, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, colorCalendar } = GeneralJs;
  const possiblePromptClassName = "possiblePromptClassName";
  let cancelBack, whitePrompt;
  let zIndex;
  let whiteWidth, whiteHeight;
  let selectionReset;
  let innerPaddingTop, innerPaddingLeft;
  let questionSize, questionWeight;
  let grayWidth, grayHeight, grayMarginTop;
  let inputSize, inputWeight;
  let loadingHeight;
  let loadingBetween;
  let questionTextTop;

  whiteWidth = <%% 324, 324, 308, 294, 58.5 %%>;
  whiteHeight = <%% 136, 136, 130, 122, 21.6 %%>;
  zIndex = 4;

  innerPaddingTop = <%% 30, 30, 28, 26, 4 %%>;
  innerPaddingLeft = <%% 36, 36, 36, 36, 5 %%>;

  questionSize = <%% 18, 18, 17, 16, 3.5 %%>;
  questionWeight = <%% 700, 700, 700, 700, 700 %%>;
  questionTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  grayMarginTop = <%% 14, 14, 13, 12, 1.8 %%>;
  grayWidth = <%% 210, 210, 198, 184, 42.5 %%>;
  grayHeight = <%% 32, 32, 30, 30, 5.6 %%>;

  inputSize = <%% 14, 14, 13, 13, 2.6 %%>;
  inputWeight = <%% 400, 400, 400, 400, 400 %%>;

  loadingBetween = <%% 11, 11, 10, 10, 1.8 %%>;
  loadingHeight = <%% 30, 30, 28, 28, 4.2 %%>;

  selectionReset = () => {
    for (let { dom } of instance.possibleBoxes) {
      dom.style.background = colorChip.white;
      dom.parentNode.firstChild.style.color = dom.parentNode.firstChild.getAttribute("color");
      dom.firstChild.style.color =  Number(dom.firstChild.getAttribute("possible")) === 0 ? colorChip.deactive : colorChip.green;
      dom.setAttribute("toggle", "off");
    }
    instance.selection = [];
  }

  cancelBack = createNode({
    mother: totalContents,
    class: [ possiblePromptClassName ],
    event: {
      mousedown: (e) => { e.stopPropagation() },
      mouseup: (e) => { e.stopPropagation() },
      click: function (e) {
        const removeTargets = document.querySelectorAll('.' + possiblePromptClassName);
        for (let dom of removeTargets) {
          dom.remove();
        }
        selectionReset();
      }
    },
    style: {
      display: "block",
      position: "fixed",
      top: String(0),
      left: String(0),
      width: withOut(0),
      height: withOut(0),
      background: colorChip.black,
      opacity: String(0.3),
      zIndex: String(zIndex),
    }
  });

  whitePrompt = createNode({
    mother: totalContents,
    class: [ possiblePromptClassName ],
    event: {
      mousedown: (e) => { e.stopPropagation() },
      mouseup: (e) => { e.stopPropagation() },
    },
    style: {
      display: "inline-block",
      position: "fixed",
      top: withOut(50, (whiteHeight / 2), ea),
      left: withOut(50, (whiteWidth / 2), ea),
      width: String(whiteWidth) + ea,
      height: String(whiteHeight) + ea,
      background: colorChip.white,
      borderRadius: String(8) + "px",
      boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
      animation: "fadeuphard 0.5s ease forwards",
      overflow: "hidden",
      zIndex: String(zIndex),
      background: colorChip.white,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(innerPaddingTop * 2, ea),
          paddingTop: String(innerPaddingTop) + ea,
          paddingBottom: String(innerPaddingTop) + ea,
        },
        children: [
          {
            text: "가능한 프로젝트 건수를 알려주세요!",
            style: {
              display: "block",
              position: "relative",
              fontSize: String(questionSize) + ea,
              fontWeight: String(questionWeight),
              color: colorChip.black,
              paddingLeft: String(innerPaddingLeft) + ea,
              top: String(questionTextTop) + ea,
            }
          },
          {
            style: {
              display: "block",
              marginTop: String(grayMarginTop) + ea,
              position: "relative",
              paddingLeft: String(innerPaddingLeft) + ea,
              paddingRight: String(innerPaddingLeft) + ea,
              width: withOut(innerPaddingLeft * 2, ea),
            },
            children: [
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  height: String(grayHeight) + ea,
                  width: String(grayWidth) + ea,
                  borderRadius: String(5) + "px",
                  background: colorChip.gray1,
                  verticalAlign: "top",
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      placeholder: "1건",
                    },
                    event: {
                      keyup: function (e) {
                        let possibleValue, range, finalObj, removeTargets;

                        if (e.key === "Enter") {
                          if (this.value.trim() !== '') {
                            possibleValue = Number(this.value.replace(/[^0-9]/gi, ''));
                            if (Number.isNaN(possibleValue)) {
                              this.value = '';
                            } else {
                              if (instance.selection.length >= 2) {
                                range = [ stringToDate(instance.selection[0].value), stringToDate(instance.selection[1].value) ];
                                range.sort((a, b) => { return a.valueOf() - b.valueOf() });
                                for (let { value, dom } of instance.possibleBoxes) {
                                  if (range[0].valueOf() <= stringToDate(value).valueOf() && stringToDate(value).valueOf() <= range[1].valueOf()) {
                                    dom.firstChild.setAttribute("possible", String(possibleValue));
                                    dom.firstChild.textContent = String(possibleValue) + (desktop ? "건 가능" : "건");
                                  }
                                }

                                instance.boxToPossible().catch((err) => { console.log(err); });

                                removeTargets = document.querySelectorAll('.' + possiblePromptClassName);
                                for (let dom of removeTargets) {
                                  dom.remove();
                                }
                                selectionReset();

                              }
                            }
                          }
                        }
                      },
                      // blur: function (e) {
                      //   let possibleValue, range, finalObj, removeTargets;
                      //   if (this.value.trim() !== '') {
                      //     possibleValue = Number(this.value.replace(/[^0-9]/gi, ''));
                      //     if (Number.isNaN(possibleValue)) {
                      //       this.value = '';
                      //     } else {
                      //       if (instance.selection.length >= 2) {
                      //         range = [ stringToDate(instance.selection[0].value), stringToDate(instance.selection[1].value) ];
                      //         range.sort((a, b) => { return a.valueOf() - b.valueOf() });
                      //         for (let { value, dom } of instance.possibleBoxes) {
                      //           if (range[0].valueOf() <= stringToDate(value).valueOf() && stringToDate(value).valueOf() <= range[1].valueOf()) {
                      //             dom.firstChild.setAttribute("possible", String(possibleValue));
                      //             dom.firstChild.textContent = String(possibleValue) + (desktop ? "건 가능" : "건");
                      //           }
                      //         }

                      //         instance.boxToPossible().catch((err) => { console.log(err); });

                      //         removeTargets = document.querySelectorAll('.' + possiblePromptClassName);
                      //         for (let dom of removeTargets) {
                      //           dom.remove();
                      //         }
                      //         selectionReset();

                      //       }
                      //     }
                      //   }
                      // }
                    },
                    style: {
                      position: "absolute",
                      top: String(0),
                      left: String(0),
                      width: withOut(0),
                      height: withOut(3, '%'),
                      fontSize: String(inputSize) + ea,
                      fontWeight: String(inputWeight),
                      color: colorChip.black,
                      border: String(0),
                      outline: String(0),
                      textAlign: "center",
                      background: "transparent",
                    }
                  }
                ]
              },
              {
                mode: "svg",
                source: instance.mother.returnLoading(),
                style: {
                  display: "inline-block",
                  position: "relative",
                  marginLeft: String(loadingBetween) + ea,
                  height: String(loadingHeight) + ea,
                  top: String((grayHeight - loadingHeight) / 2) + ea,
                  animation: "loadingrotate 1.7s linear infinite",
                  verticalAlign: "top",
                }
              }
            ]
          }
        ]
      },
    ]
  });

  whitePrompt.querySelector("input").focus();

}

DesignerPossibleJs.prototype.insertCalendarBox = function (standardIndex = 0) {
  const instance = this;
  const mother = this.mother;
  const { clients, projects, requestNumber, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, colorCalendar, setQueue, returnGet } = GeneralJs;
  const isDateValid = (date) => {
    return ((new Date(2000, 0, 1)).valueOf() <= date.valueOf() && (new Date(3000, 0, 1)).valueOf() > date.valueOf());
  }
  const getObj = returnGet();
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let tong;
  let whiteBottomMargin;
  let grayBetween;
  let dateArr;
  let thisCalendar;
  let standardDate;
  let dateBoxes;
  let possibleSize;
  let possibleWeight;
  let possibleTextTop;
  let possibleBox;
  let valueRange;
  let thisDate;
  let thisPossible;

  grayBetween = <%% 40, 40, 36, 36, 3 %%>;

  bottomMargin = <%% 16, 16, 16, 12, 0 %%>;
  margin = <%% 55, 55, 47, 39, 0 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 20, 20, 16, 8, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 2 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 3 %%>;

  possibleSize = <%% 19, 18, 16, 14, 3 %%>;
  possibleWeight = <%% 200, 200, 200, 200, 200 %%>;
  possibleTextTop = <%% 0, 0, 0, 0, 0 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  standardDate = new Date();
  for (let i = 0; i < standardIndex; i++) {
    standardDate.setMonth(standardDate.getMonth() + 1);
  }

  whiteBlock = createNode({
    mother: getObj.entire === "true" ? instance.totalContents : baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(whiteBottomMargin) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: getObj.entire !== "true" ? (desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "") : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginBottom: String(grayBetween) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          overflow: "hidden",
          marginBottom: String(0) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  dateArr = [
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

  thisCalendar = colorCalendar(tong, dateArr, { standardDate });

  thisCalendar.querySelector("svg").remove();
  thisCalendar.querySelector("svg").remove();

  dateBoxes = [ ...thisCalendar.children[1].children ].slice(7).filter((dom) => {
    return dom.firstChild.textContent.trim() !== ''
  }).map((dom) => {
    cleanChildren(dom.children[1]);
    cleanChildren(dom.children[2]);
    dom.style.cursor = "pointer";
    return dom;
  })

  for (let mother of dateBoxes) {

    mother.firstChild.style.zIndex = String(1);
    mother.firstChild.setAttribute("color", mother.firstChild.style.color);

    thisDate = new Date(standardDate.getFullYear(), standardDate.getMonth(), Number(mother.firstChild.textContent));
    thisPossible = 0;
    for (let { start, end, matrix } of instance.realtimeDesigner.possible) {
      if (start.valueOf() <= thisDate.valueOf() && thisDate.valueOf() <= end.valueOf()) {
        thisPossible = matrix.reduce((acc, curr) => { return curr >= acc ? curr : acc }, 0);
      }
    }

    possibleBox = createNode({
      mother,
      attribute: {
        toggle: "off",
        value: dateToString(thisDate),
      },
      event: {
        selectstart: (e) => { e.preventDefault(); },
        contextmenu: (e) => { e.preventDefault(); },
        mouseenter: function (e) {
          const toggle = this.getAttribute("toggle");
          if (!instance.isMouseDown) {
            if (toggle === "off") {
              this.style.background = colorChip.liteGreen;
              this.parentNode.firstChild.style.color = colorChip.green;
            }
          } else {
            valueRange = [ stringToDate(instance.downSelection.getAttribute("value")).valueOf(), stringToDate(this.getAttribute("value")).valueOf() ];
            valueRange.sort((a, b) => { return a - b; });
            for (let { value, dom } of instance.possibleBoxes) {
              if (valueRange[0] <= stringToDate(value).valueOf() && stringToDate(value).valueOf() <= valueRange[1]) {
                dom.style.background = colorChip.middleGreen;
                dom.parentNode.firstChild.style.color = colorChip.darkGreen;
                dom.firstChild.style.color = colorChip.darkGreen;
              } else {
                dom.style.background = colorChip.white;
                dom.parentNode.firstChild.style.color = dom.parentNode.firstChild.getAttribute("color");
                dom.firstChild.style.color = colorChip.deactive;
              }
            }

          }
        },
        mouseleave: function (e) {
          const toggle = this.getAttribute("toggle");
          if (toggle === "off") {
            this.style.background = colorChip.white;
            this.parentNode.firstChild.style.color = this.parentNode.firstChild.getAttribute("color");
          }
        },
        mousedown: function (e) {
          e.stopPropagation();
          instance.isMouseDown = true;
          instance.downSelection = this;
        },
        mouseup: function (e) {
          e.stopPropagation();
          instance.isMouseDown = false;

          if (instance.downSelection !== null) {

            if (instance.downSelection === this) {

              instance.downSelection = null;

            } else {
              valueRange = [ stringToDate(instance.downSelection.getAttribute("value")).valueOf(), stringToDate(this.getAttribute("value")).valueOf() ];
              valueRange.sort((a, b) => { return a - b; });
              for (let { value, dom } of instance.possibleBoxes) {
                if (valueRange[0] <= stringToDate(value).valueOf() && stringToDate(value).valueOf() <= valueRange[1]) {
                  dom.style.background = colorChip.green;
                  dom.parentNode.firstChild.style.color = colorChip.white;
                  dom.firstChild.style.color = colorChip.white;
                  dom.setAttribute("toggle", "on");
                } else {
                  dom.style.background = colorChip.white;
                  dom.parentNode.firstChild.style.color = dom.parentNode.firstChild.getAttribute("color");
                  dom.firstChild.style.color = Number(dom.firstChild.getAttribute("possible")) === 0 ? colorChip.deactive : colorChip.green;
                  dom.setAttribute("toggle", "off");
                }
              }

              instance.selection = [
                {
                  value: instance.downSelection.getAttribute("value"),
                  dom: instance.downSelection
                },
                {
                  value: this.getAttribute("value"),
                  dom: this,
                }
              ];
              instance.selection.sort((a, b) => {
                return stringToDate(a.value).valueOf() - stringToDate(b.value).valueOf();
              })

              instance.downSelection = null;

              setQueue(() => {
                instance.possiblePrompt();
              });
            }

          } else {
            instance.downSelection = null;
            instance.selection = [];
          }

        },
        click: function (e) {
          const value = this.getAttribute("value");
          const toggle = this.getAttribute("toggle");
          if (toggle === "off") {
            this.style.background = colorChip.green;
            this.parentNode.firstChild.style.color = colorChip.white;
            this.firstChild.style.color = colorChip.white;
            this.setAttribute("toggle", "on");

            instance.selection.push({
              value,
              dom: this,
            });

            if (instance.selection.length === 1) {

              // pass

            } else if (instance.selection.length === 2) {

              valueRange = [ stringToDate(instance.selection[0].value).valueOf(), stringToDate(instance.selection[1].value).valueOf() ];
              valueRange.sort((a, b) => { return a - b; });

              for (let { value, dom } of instance.possibleBoxes) {
                if (valueRange[0] < stringToDate(value).valueOf() && stringToDate(value).valueOf() < valueRange[1]) {
                  dom.style.background = colorChip.green;
                  dom.parentNode.firstChild.style.color = colorChip.white;
                  dom.firstChild.style.color = colorChip.white;
                  dom.setAttribute("toggle", "on");
                }
              }

              setQueue(() => {
                instance.possiblePrompt();
              });

            } else {
              for (let { dom } of instance.possibleBoxes) {
                dom.style.background = colorChip.white;
                dom.parentNode.firstChild.style.color = dom.parentNode.firstChild.getAttribute("color");
                dom.firstChild.style.color = colorChip.green;
                dom.setAttribute("toggle", "off");
              }
              instance.selection = [];
            }

          } else {

            instance.selection.push({ value, dom: this });

            setQueue(() => {
              instance.possiblePrompt();
            });

          }
        }
      },
      style: {
        display: "flex",
        position: "absolute",
        top: String(0),
        left: String(0),
        width: withOut(0),
        height: withOut(0),
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: colorChip.white,
        transition: "all 0.3s ease",
      },
      children: [
        {
          event: {
            selectstart: (e) => { e.preventDefault(); },
          },
          attribute: {
            color: thisPossible === 0 ? colorChip.deactive : colorChip.green,
            possible: String(thisPossible),
          },
          text: String(thisPossible) + (desktop ? "건 가능" : "건"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(possibleSize) + ea,
            fontWeight: String(possibleWeight),
            color: thisPossible === 0 ? colorChip.deactive : colorChip.green,
            top: String(possibleTextTop) + ea,
          }
        }
      ]
    })
    this.possibleBoxes.push({
      value: dateToString(new Date(standardDate.getFullYear(), standardDate.getMonth(), Number(mother.firstChild.textContent))),
      dom: possibleBox,
    });
  }

}

DesignerPossibleJs.prototype.insertNoticeBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainContents = [
    {
      title: "프로젝트 가능 건 표시",
      contents: [
        "해당 날짜에 표시된 숫자는 진행 가능한 디자이너 판단의 기준이 되며, 자동 큐레이션이 진행될 시 중요한 연산 기준이 됩니다.",
      ],
    },
    {
      title: "콘솔 이용 방법",
      contents: [
        "날짜 범위를 선택하면, 그 범위에 가능한 프로젝트 가능 건수를 묻는 팝업이 제시됩니다.",
        "하루를 선택하기 위해선 <b%해당 날짜를 두 번 클릭%b>하시면 선택이 되고, 건수를 묻습니다."
      ],
    },
  ];
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 7 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
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
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? margin : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: desktop ? "block" : "none",
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: "가능 일정 표시 안내",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          borderRadius: mobile ? String(1) + ea : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: desktop ? "1px solid " + colorChip.shadow : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(5.5) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { title, contents } of mainContents) {
    num2 = 0;
    for (let str of contents) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(num2 === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
          marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(6) + ea)
        },
        children: [
          {
            text: (num2 === 0 ? String(num + 1) : ""),
            style: {
              display: desktop ? "inline-block" : "none",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(zeroWidth) + ea,
              marginRight: String(zeroMarginRight) + ea,
              textAlign: "right",
              color: colorChip.green,
            }
          },
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              verticalAlign: "top",
              width: desktop ? String(firstWidth) + ea : String(100) + '%',
              marginBottom: desktop ? "" : String(1.5) + ea,
            },
            children: [
              {
                style: {
                  display: num2 === 0 ? "block" : "none",
                  position: "absolute",
                  top: String(0),
                  left: String(0),
                  height: String(lineTop) + ea,
                  width: withOut(0),
                  borderBottom: desktop ? "1px solid " + colorChip.gray3 : "",
                }
              },
              {
                text: (num2 === 0 ? (desktop ? title : "<b%" + String(num + 1) + "%b>" + blank + title) : ""),
                style: {
                  display: desktop ? "inline-block" : "block",
                  position: "relative",
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(600),
                  lineHeight: String(1.6),
                  color: colorChip.black,
                  textAlign: "left",
                  background: colorChip.white,
                  paddingRight: String(linePadding) + ea,
                },
                bold: {
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(600),
                  color: colorChip.green,
                },
              }
            ]
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(secondWidth) + ea,
              marginRight: String(secondMarginRight) + ea,
              textAlign: desktop ? "right" : "left",
              color: colorChip.green,
            },
          },
          {
            text: str,
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: withOut(desktop ? zeroWidth + zeroMarginRight + firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
          },
        ]
      });

      num2++;
    }
    num++;
  }

}

DesignerPossibleJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, serviceParsing, colorChip } = GeneralJs;
  try {
    this.mother.setGeneralProperties(this);

    class SearchArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(target, value) {
        let obj = null;
        for (let i of this) {
          if (i[target] === value) {
            obj = i;
          }
        }
        return obj;
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i);
        }
        return arr;
      }
    }

    const getObj = returnGet();
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let desid, designers, designer;
    let requestNumber;
    let service;
    let response, services;
    let ghostContents;
    let socket;
    let wsLaunching;
    let wsOpenEvent;
    let wsMessageEvent;
    let wsCloseEvent;

    if (getObj.desid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    desid = getObj.desid;
    this.desid = desid;
    designers = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getDesigners", { equal: true });
    if (designers.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ designer ] = designers;
    this.designer = designer;

    projects = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getProjects", { equal: true });
    this.projects = projects;

    if (projects.length > 0) {
      clients = await ajaxJson({ whereQuery: { $or: projects.map((obj) => { return { cliid: obj.cliid } }) } }, SECONDHOST + "/getClients", { equal: true });
      this.clients = clients;
    } else {
      this.clients = [];
    }

    projects.sort((a, b) => {
      return b.process.contract.meeting.date.valueOf() - a.process.contract.meeting.date.valueOf();
    });

    for (let project of projects) {
      project.name = clients.find((obj) => { return obj.cliid === project.cliid }).name;
    }

    this.realtimeDesigner = await ajaxJson({ mode: "get", desid }, BACKHOST + "/realtimeDesigner", { equal: true });

    this.selection = [];
    this.possibleBoxes = [];
    this.isMouseDown = false;
    this.downSelection = null;

    document.body.addEventListener("mouseup", (e) => {
      instance.isMouseDown = false;
      instance.downSelection = null;
      for (let { value, dom } of instance.possibleBoxes) {
        dom.style.background = colorChip.white;
        dom.parentNode.firstChild.style.color = dom.parentNode.firstChild.getAttribute("color");
        dom.firstChild.style.color =  Number(dom.firstChild.getAttribute("possible")) === 0 ? colorChip.deactive : colorChip.green;
        dom.setAttribute("toggle", "off");
      }
      this.selection = [];
    });

    if (getObj.entire !== "true") {
      await this.mother.ghostDesignerLaunching({
        name: "designerPossible",
        designer: this.designer,
        base: {
          instance: this,
          binaryPath: DesignerPossibleJs.binaryPath,
          subTitle: "",
        },
        local: async () => {
          try {
            let whiteBlock;
            instance.insertInitBox();
            instance.insertNoticeBox();
            instance.calendarChain();
          } catch (e) {
            await GeneralJs.ajaxJson({ message: "DesignerPossibleJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
          }
        }
      });
    } else {
      instance.calendarChain();
    }

    loading.parentNode.removeChild(loading);

    if (getObj.entire !== "true") {
      // web socket
      socket = {};
      if (!document.hidden) {
        wsOpenEvent = (ws) => {
          return async function () {
            try {
              ws.send(JSON.stringify({
                mode: "register",
                to: "homeliaison",
                data: instance.designer.desid
              }));
            } catch (e) {
              console.log(e);
            }
          }
        }
        wsLaunching = () => {
          let ws;
          if (typeof socket.close === "function") {
            socket.close();
            socket = {};
          }
          ws = new WebSocket(CRONHOST.replace(/https\:\/\//, "wss://") + "/realTimeCommunication");
          ws.addEventListener("open", wsOpenEvent(ws));
          return ws;
        }
        socket = wsLaunching();
      }
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          if (typeof socket.close === "function") {
            socket.close();
            socket = {};
          }
        } else {
          socket = wsLaunching();
        }
      });
    }

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "DesignerPossibleJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
