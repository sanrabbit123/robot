DesignerJs.prototype.possibleDetailLaunching = function (desid, callback = null) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight, middleMode } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { scrollTo, ajaxJson, colorChip } = GeneralJs;
  let target, pastScrollTop;

  if (!middleMode) {
    this.pageHistory.unshift({ path: "possible", status: "list", desid });
  }
  window.history.pushState({ path: "possible", status: "list", desid }, '');

  pastScrollTop = totalMother.scrollTop;
  this.desid = desid;

  if (this.mainBaseTong !== undefined && this.mainBaseTong !== null) {
    this.mainBaseTong.parentNode.removeChild(this.mainBaseTong);
    this.mainBaseTong = null;
    for (let i = 1; i < this.standardDoms.length; i++) {
      this.standardDoms[i].style.color = colorChip.black;
    }
    if (this.rInitialIcon !== undefined && this.rInitialIcon !== null) {
      this.rInitialIcon.parentElement.removeChild(this.rInitialIcon);
    }
    if (this.nextIcon !== undefined && this.nextIcon !== null) {
      this.nextIcon.parentElement.removeChild(this.nextIcon);
    }
    if (this.mInitialIcon !== undefined && this.mInitialIcon !== null) {
      this.mInitialIcon.parentElement.removeChild(this.mInitialIcon);
    }
    if (this.previousIcon !== undefined && this.previousIcon !== null) {
      this.previousIcon.parentElement.removeChild(this.previousIcon);
    }
    if (this.aInitialIcon !== undefined && this.aInitialIcon !== null) {
      this.aInitialIcon.parentElement.removeChild(this.aInitialIcon);
    }
    if (this.listIcon !== undefined && this.listIcon !== null) {
      this.listIcon.parentElement.removeChild(this.listIcon);
    }
    this.listIcon = null;
    this.aInitialIcon = null;
    this.previousIcon = null;
    this.mInitialIcon = null;
    this.nextIcon = null;
    this.rInitialIcon = null;

    if (document.getElementById("memoTong") !== null) {
      totalMother.removeChild(document.getElementById("memoTong"));
    }
  }

  target = null;
  for (let i = 0; i < this.standardDoms.length; i++) {
    if (this.standardDoms[i].firstChild.textContent.match(/d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g) !== null) {
      if (desid === this.standardDoms[i].firstChild.textContent.match(/d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g)[0]) {
        target = i;
      }
    }
  }
  for (let i = 1; i < this.standardDoms.length; i++) {
    if (i !== target) {
      this.standardDoms[i].style.color = this.standardDoms[i].getAttribute("color");
    } else {
      this.standardDoms[i].style.color = colorChip.green;
      if (i !== 1) {
        if (this.standardDoms[i].getBoundingClientRect().top > window.innerHeight - belowHeight - motherHeight - this.standardDoms[i].getBoundingClientRect().height + 10 || this.standardDoms[i].getBoundingClientRect().top < firstTop) {
          standardBar.parentElement.scrollTo({ top: ((i - 1) * (this.standardDoms[i].getBoundingClientRect().height)) });
        }
      } else {
        standardBar.parentElement.scrollTo({ top: 0 });
      }
    }
  }

  if (middleMode) {
    ajaxJson({
      page: "possible",
      mode: "page",
      who: instance.designer.information.phone,
      desid,
    }, "/ghostDesigner_updateAnalytics").then((message) => {
      console.log(message);
    }).catch((err) => {
      console.log(err);
    });
  }

  this.possibleContents(desid);
  this.possibleIconSet(desid);
  scrollTo(totalMother, pastScrollTop);
  if (callback !== null) {
    if (typeof callback === "function") {
      callback();
    }
  }
}

DesignerJs.prototype.possibleContents = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  let margin;
  let baseTong0, baseTong;
  let matrix;
  let tempArr;
  let tempObj, nodeArr, subNodeArr;
  let eachTotalTong, eachNameTong, eachValueTong;
  let topMargin, leftMargin, bottomMargin;
  let size;
  let tempMatrix;
  let temp;
  let baseTongMarginBottom;
  let checkListData;
  let middleAdjustTong;
  let thisChildWidth;
  let dateString;
  let outerMargin;
  let contentsBox;

  margin = 8;
  outerMargin = <%% (margin * 3), (margin * 3), (margin * 3), (margin * 3), 0 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 12 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 40 %%>;
  size = <%% 16, 15, 15, 15, 4 %%>;

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: desktop ? String(outerMargin) + ea : (this.middleMode ? String(60) + "px" : String(outerMargin)),
      left: String(grayBarWidth + (outerMargin)) + ea,
      width: withOut(grayBarWidth + (outerMargin * 2), ea),
      height: "auto",
      animation: "",
    }
  });
  baseTong = createNode({
    mother: baseTong0,
    style: {
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + "px",
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      background: colorChip.white,
      height: "auto",
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
    }
  });

  contentsBox = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      top: String(outerMargin) + ea,
      marginLeft: String(outerMargin) + ea,
      marginRight: String(outerMargin) + ea,
      marginBottom: String(outerMargin * 2) + ea,
      width: withOut(outerMargin * 2, ea),
      display: "block",
    }
  });

  this.possibleMatrix(contentsBox, desid).catch((err) => {
    console.log(err);
  });

  this.mainBaseTong = baseTong0;
}

DesignerJs.prototype.possibleMatrix = async function (mother, desid) {
  const instance = this;
  const { ajaxJson, createNode, withOut, colorChip, getCookiesAll, getDateMatrix } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const designer = this.designers.pick(desid);
  const cookies = getCookiesAll();
  const now = new Date();
  const nowValue = now.valueOf();
  const futureLength = 18;
  const okClassName = "okSvg";
  const cancelClassName = "cancelSvg";
  const numberClassName = "numberWord";
  const backClassName = "backColor";
  const nullClassName = "dateNullTarget";
  const generalDateClassName = "dateTarget";
  const weekClassName = "week";
  const weekGeneralClassName = "weekGeneral";
  const titleClassName = "title";
  const titleGeneralName = "titleGeneral";
  const joinToken = "_";
  const scrollEventName = "scrollYEvent";
  const scrollEventTimeout = "scrollYTimeout";
  try {
    let dateMatrix;
    let map;
    let size;
    let tempObj;
    let block;
    let titleField, matrixField;
    let titleWidth;
    let titlePaddingLeft;
    let titlePaddingRight;
    let titleLineHeight;
    let weekBlock;
    let weekBlockHeight;
    let num;
    let blockMarginBottom;
    let dateBox;
    let dateNumberSize, dateNumberTop, dateNumberLeft;
    let dateIconTop, dateIconWidth, dateIconRight;
    let pastBoo;
    let weekBlocks;
    let removeTargets;
    let children, length;
    let weekTotalLength;
    let firstBlock;
    let tempArr;
    let titleTargets;
    let firstMother;
    let topMap;

    size = <%% 16, 15, 15, 15, 4 %%>;
    titleWidth = <%% 120, 120, 120, 120, 20 %%>;
    titlePaddingLeft = <%% 5, 5, 5, 5, 0.1 %%>;
    titlePaddingRight = <%% 60, 60, 60, 60, 5 %%>;
    titleLineHeight = 1.5;

    weekBlockHeight = <%% 60, 60, 60, 60, 4 %%>;

    blockMarginBottom = <%% 48, 48, 48, 48, 4 %%>;

    dateNumberSize = <%% 18, 18, 18, 18, 4 %%>;
    dateNumberTop = <%% 16, 16, 16, 16, 4 %%>;
    dateNumberLeft = <%% 23, 23, 23, 23, 4 %%>;

    dateIconTop = <%% 19, 19, 19, 19, 4 %%>;
    dateIconWidth = <%% 22, 22, 22, 22, 5 %%>;
    dateIconRight = <%% 24, 24, 24, 24, 4 %%>;

    dateMatrix = getDateMatrix(now.getFullYear(), now.getMonth());
    map = [];
    for (let i = 0; i < futureLength; i++) {
      tempObj = {};
      tempObj.year = dateMatrix.getYearString();
      tempObj.month = dateMatrix.getMonthString();
      tempObj.matrix = dateMatrix.returnSundayMatrix();
      map.push(tempObj);
      dateMatrix = dateMatrix.nextMatrix();
    }

    this.dateDoms = [];
    weekBlocks = [];
    num = 0;
    for (let { year, month, matrix } of map) {
      block = createNode({
        mother,
        style: {
          position: "relative",
          display: "block",
          verticalAlign: "top",
          paddingBottom: String(blockMarginBottom) + ea,
        }
      });
      if (num === 0) {
        firstMother = block;
      }
      titleField = createNode({
        mother: block,
        class: [
          titleGeneralName,
          [ titleClassName, year.replace(/[^0-9]/g, ''), month.replace(/[^0-9]/g, '') ].join(joinToken)
        ],
        attribute: [
          { year: year.replace(/[^0-9]/g, '') },
          { month: month.replace(/[^0-9]/g, '') },
        ],
        style: {
          position: "relative",
          display: "inline-block",
          width: String(titleWidth - titlePaddingLeft - titlePaddingRight) + ea,
          paddingLeft: String(titlePaddingLeft) + ea,
          paddingRight: String(titlePaddingRight) + ea,
          height: String(100) + '%',
          verticalAlign: "top"
        },
        children: [
          {
            text: year + " " + month,
            style: {
              fontSize: String(size) + ea,
              fontWeight: String(600),
              color: colorChip.black,
              lineHeight: String(titleLineHeight),
            }
          }
        ]
      });
      matrixField = createNode({
        mother: block,
        style: {
          position: "relative",
          display: "inline-block",
          verticalAlign: "top",
          width: withOut(titleWidth, ea),
          height: String(100) + '%',
        }
      });
      if (num === 0) {
        firstBlock = matrixField;
      }

      for (let i = 0; i < matrix.length; i++) {
        weekBlock = createNode({
          mother: matrixField,
          style: {
            position: "relative",
            display: "block",
            width: String(100) + '%',
            height: String(weekBlockHeight) + ea,
            boxSizing: "border-box",
            borderRadius: String(5) + "px",
            transition: "all 0.1s ease",
          }
        });
        for (let j = 0; j < 7; j++) {
          if (matrix[i][j] !== null) {
            pastBoo = nowValue >= (new Date(Number(year.replace(/[^0-9]/gi, '')), Number(month.replace(/[^0-9]/gi, '')) - 1, matrix[i][j].date)).valueOf();
          }
          dateBox = createNode({
            mother: weekBlock,
            class: [ "hoverDefault_lite", (matrix[i][j] !== null ? generalDateClassName : nullClassName) ],
            attribute: [
              { toggle: "off" },
              { year: year.replace(/[^0-9]/gi, '') },
              { month: month.replace(/[^0-9]/gi, '') },
              { date: (matrix[i][j] !== null ? String(matrix[i][j].date) : "0") },
              { value: (matrix[i][j] !== null ? JSON.stringify(new Date(Number(year.replace(/[^0-9]/gi, '')), Number(month.replace(/[^0-9]/gi, '')) - 1, matrix[i][j].date)) : "null") },
              { past: pastBoo ? "true" : "false" },
              { index: String(j) }
            ],
            events: [
              {
                type: "click",
                event: function (e) {
                  e.stopPropagation();
                  const self = this;
                  const toggle = this.getAttribute("toggle");
                  const thisDate = new Date(this.getAttribute("value"));
                  const thisOk = this.querySelector('.' + okClassName);
                  const thisCancel = this.querySelector('.' + cancelClassName);
                  const thisWords = this.querySelector('.' + numberClassName);
                  const thisMonth = this.querySelector('.' + numberClassName).querySelector('b');
                  const thisBack = this.querySelector('.' + backClassName);
                  const pastBoo = (this.getAttribute("past") === "true");
                  let index, first, last;
                  if (!pastBoo) {
                    if (toggle === "off") {
                      index = instance.dateDoms.findIndex((d) => { return d === self; });
                      thisWords.style.color = colorChip.green;
                      thisMonth.style.color = colorChip.green;
                      thisBack.style.background = colorChip.green;
                      thisOk.style.opacity = String(1);
                      thisCancel.style.opacity = String(0);
                      if (instance.selection.length === 0) {
                        instance.selection.push(index);
                      } else {
                        if (index < instance.selection[0]) {
                          first = index;
                          last = instance.selection[0];
                        } else {
                          last = index;
                          first = instance.selection[0];
                        }
                        for (let i = first; i < last; i++) {
                          instance.dateDoms[i].querySelector('.' + okClassName).style.opacity = String(1);
                          instance.dateDoms[i].querySelector('.' + cancelClassName).style.opacity = String(0);
                          instance.dateDoms[i].querySelector('.' + numberClassName).style.color = colorChip.green;
                          instance.dateDoms[i].querySelector('.' + numberClassName).querySelector('b').style.color = colorChip.green;
                          instance.dateDoms[i].querySelector('.' + backClassName).style.background = colorChip.green;
                          instance.dateDoms[i].setAttribute("toggle", "on");
                        }
                        instance.selection = [];
                      }
                      this.setAttribute("toggle", "on");
                    } else {

                      thisWords.style.color = colorChip.black;
                      thisMonth.style.color = colorChip.black;
                      thisBack.style.background = "transparent";
                      thisOk.style.opacity = String(0);
                      thisCancel.style.opacity = String(1);

                      this.setAttribute("toggle", "off");
                    }
                  }
                }
              }
            ],
            style: {
              position: "relative",
              display: "inline-block",
              width: "calc(100% / 7)",
              height: String(100) + '%',
              boxSizing: "border-box",
              borderTop: "1px solid " + colorChip.gray3,
              borderLeft: "1px solid " + colorChip.gray3,
              borderRight: (j !== 7 - 1 ? "" : "1px solid " + colorChip.gray3),
              borderRadius: String(5) + "px",
              background: (matrix[i][j] === null ? colorChip.gray0 : (pastBoo ? colorChip.gray0 : colorChip.white)),
              transition: "all 0.1s ease",
            }
          });
          if (matrix[i][j] !== null) {
            createNode({
              mother: dateBox,
              class: [ backClassName ],
              style: {
                position: "absolute",
                top: String(0) + ea,
                left: String(0) + ea,
                width: String(100) + '%',
                height: String(100) + '%',
                background: "transparent",
                borderRadius: String(5) + "px",
                transition: "all 0s ease",
                opacity: String(0.1),
              }
            });
            createNode({
              mother: dateBox,
              class: [ numberClassName ],
              // text: (matrix[i][j + 1] === null || matrix[i][j].date === 1 || (matrix[i + 1] === undefined && matrix[i][j + 1] === undefined) ? String("<b%" + month.replace(/[^0-9]/gi, '') + "%b><u% / %u>" + matrix[i][j].date) : String(matrix[i][j].date)),
              text: String("<b%" + month.replace(/[^0-9]/gi, '') + "%b><u% / %u>" + matrix[i][j].date),
              style: {
                position: "absolute",
                fontStyle: "graphik",
                fontSize: String(dateNumberSize) + ea,
                fontWeight: String(300),
                color: (pastBoo ? colorChip.deactive : colorChip.black),
                top: String(dateNumberTop) + ea,
                left: String(dateNumberLeft) + ea,
              },
              bold: {
                fontSize: String(dateNumberSize) + ea,
                fontWeight: String(300),
                color: (pastBoo ? colorChip.deactive : colorChip.black),
              },
              under: {
                fontSize: String(dateNumberSize) + ea,
                fontWeight: String(300),
                color: colorChip.gray3,
              }
            });
            createNode({
              mother: dateBox,
              class: [ okClassName ],
              mode: "svg",
              source: instance.mother.returnCheckCircle(pastBoo ? colorChip.deactive : colorChip.green),
              style: {
                position: "absolute",
                top: String(dateIconTop) + ea,
                right: String(dateIconRight) + ea,
                width: String(dateIconWidth) + ea,
                opacity: String(pastBoo ? 1 : 0),
              }
            });
            createNode({
              mother: dateBox,
              class: [ cancelClassName ],
              mode: "svg",
              source: instance.mother.returnCancelCircle(pastBoo ? colorChip.deactive : colorChip.red),
              style: {
                position: "absolute",
                top: String(dateIconTop) + ea,
                right: String(dateIconRight) + ea,
                width: String(dateIconWidth) + ea,
                opacity: String(pastBoo ? 0 : 1),
              }
            });
            this.dateDoms.push(dateBox);
          }
        }
        weekBlocks.push(weekBlock);
      }

      createNode({
        mother: block,
        style: {
          position: "absolute",
          bottom: String(blockMarginBottom / 2) + ea,
          left: String(titleWidth) + ea,
          width: withOut(titleWidth, ea),
          height: String(0),
          borderBottom: "1px dashed " + colorChip.gray3,
        }
      });

      num++;
    }

    weekTotalLength = weekBlocks.length;
    for (let i = 0; i < weekTotalLength; i++) {
      if (i !== 0) {
        if (weekBlocks[i + 1] !== undefined && weekBlocks[i].querySelector('.' + nullClassName) !== null && weekBlocks[i + 1].querySelector('.' + nullClassName) !== null) {
          removeTargets = weekBlocks[i].querySelectorAll('.' + nullClassName);
          for (let dom of removeTargets) {
            weekBlocks[i].removeChild(dom);
          }
          removeTargets = weekBlocks[i + 1].querySelectorAll('.' + nullClassName);
          for (let dom of removeTargets) {
            weekBlocks[i + 1].removeChild(dom);
          }
          children = weekBlocks[i + 1].querySelectorAll('.' + generalDateClassName);
          length = children.length;
          for (let j = 0; j < length; j++) {
            weekBlocks[i].appendChild(children[j]);
          }
        }
      }
    }
    for (let i = 0; i < weekTotalLength; i++) {
      if (weekBlocks[i].children.length !== 0) {
        firstBlock.appendChild(weekBlocks[i]);
      }
    }
    weekBlocks[weekTotalLength - 1].style.borderBottom = "1px solid " + colorChip.gray3;

    weekBlocks = [];
    for (let dom of firstBlock.children) {
      tempArr = ([ ...dom.children ]).map((d) => { return (Number(d.getAttribute("year")) * 100) + Number(d.getAttribute("month")); });
      tempArr.sort((a, b) => { return b - a; });
      if (tempArr.reduce((accumulator, currentValue) => { return accumulator + currentValue; }) !== (tempArr[0] * (tempArr.length)) || dom.firstChild.getAttribute("date") === String(1)) {
        dom.setAttribute("first", "true");
      } else {
        dom.setAttribute("first", "false");
      }
      dom.setAttribute("year", String(Math.floor(tempArr[0] / 100)));
      dom.setAttribute("month", String(tempArr[0] % 100));
      dom.classList.add([ weekClassName, String(Math.floor(tempArr[0] / 100)), String(tempArr[0] % 100) ].join(joinToken));
      dom.classList.add(weekGeneralClassName);
      weekBlocks.push(dom);
    }

    titleTargets = document.querySelectorAll('.' + titleGeneralName);
    topMap = (new Array(titleTargets.length - 1)).fill(null, 0);
    for (let i = 1; i < titleTargets.length; i++) {
      tempArr = [ ...document.querySelectorAll('.' + [ weekClassName, titleTargets[i].getAttribute("year"), titleTargets[i].getAttribute("month") ].join(joinToken)) ];
      if (tempArr.find((d) => { return d.getAttribute("first") === "true"; }) !== undefined) {
        firstMother.appendChild(titleTargets[i]);
        titleTargets[i].style.position = "absolute";
        titleTargets[i].style.left = String(0) + ea;
        tempObj = {};
        tempObj.year = Number(titleTargets[i].getAttribute("year"));
        tempObj.month = Number(titleTargets[i].getAttribute("month"));
        tempObj.top = tempArr.find((d) => { return d.getAttribute("first") === "true"; }).getBoundingClientRect().top;
        tempObj.targetDoms = [];
        tempObj.targetDoms = tempObj.targetDoms.concat(tempArr.filter((d) => { return d.getAttribute("first") !== "true"; }));
        tempObj.targetDoms = tempObj.targetDoms.concat([ ...tempArr.find((d) => { return d.getAttribute("first") === "true"; }).children ].filter((d) => { return (d.getAttribute("year") === titleTargets[i].getAttribute("year") && d.getAttribute("month") === titleTargets[i].getAttribute("month")) }));
        if (topMap[i - 2] !== undefined) {
          topMap[i - 2].targetDoms = topMap[i - 2].targetDoms.concat([ ...tempArr.find((d) => { return d.getAttribute("first") === "true"; }).children ].filter((d) => { return (d.getAttribute("year") === titleTargets[i - 1].getAttribute("year") && d.getAttribute("month") === titleTargets[i - 1].getAttribute("month")) }));
        }
        titleTargets[i].style.top = String(tempArr.find((d) => { return d.getAttribute("first") === "true"; }).getBoundingClientRect().top - firstBlock.getBoundingClientRect().top) + ea;
        titleTargets[i].style.height = String(weekBlockHeight * tempArr.length) + ea;
        topMap[i - 1] = tempObj;
      }
    }
    topMap.unshift({
      year: Number(titleTargets[0].getAttribute("year")),
      month: Number(titleTargets[0].getAttribute("month")),
      top: weekBlockHeight * 2,
      targetDoms: []
    });
    tempArr = [ ...document.querySelectorAll('.' + [ weekClassName, titleTargets[0].getAttribute("year"), titleTargets[0].getAttribute("month") ].join(joinToken)) ];
    topMap[0].targetDoms = topMap[0].targetDoms.concat(tempArr);
    tempArr = [ ...document.querySelectorAll('.' + [ weekClassName, titleTargets[1].getAttribute("year"), titleTargets[1].getAttribute("month") ].join(joinToken)) ];
    topMap[0].targetDoms = topMap[0].targetDoms.concat([ ...tempArr.find((d) => { return d.getAttribute("first") === "true"; }).children ].filter((d) => { return (d.getAttribute("year") === titleTargets[0].getAttribute("year") && d.getAttribute("month") === titleTargets[0].getAttribute("month")) }));

    while (mother.children.length !== 1) {
      mother.removeChild(mother.lastChild);
    }

    // if (typeof GeneralJs.stacks[scrollEventName] === "function") {
    //   totalMother.removeEventListener("scroll", GeneralJs.stacks[scrollEventName]);
    // }
    // GeneralJs.stacks[scrollEventName] = function (e) {
    //   if (GeneralJs.timeouts[scrollEventTimeout] !== undefined && GeneralJs.timeouts[scrollEventTimeout] !== null) {
    //     clearTimeout(GeneralJs.timeouts[scrollEventTimeout]);
    //   }
    //   GeneralJs.timeouts[scrollEventTimeout] = setTimeout(() => {
    //     const positionTop = totalMother.scrollTop - (weekBlockHeight * 1.5);
    //     const deactive = 0.3;
    //     const active = 1;
    //     let index, targets;
    //     let activeTargets;
    //     let targetArr, indexArr, weekArr;
    //     let targetIndex;
    //     let addtionalNumber;
    //     let lastBoo, lastYear, lastMonth;
    //
    //     index = -1;
    //     for (let i = 0; i < topMap.length - 1; i++) {
    //       if (topMap[i].top < positionTop && positionTop <= topMap[i + 1].top) {
    //         index = i;
    //       }
    //     }
    //
    //     activeTargets = [];
    //     for (let i = 0; i < topMap.length; i++) {
    //       targets = topMap[i].targetDoms;
    //       if (i !== index + 1 && i !== index + 2) {
    //         for (let dom of targets) {
    //           dom.style.opacity = String(deactive);
    //         }
    //       } else {
    //         for (let dom of targets) {
    //           activeTargets.push(dom);
    //         }
    //       }
    //     }
    //
    //     targetArr = activeTargets.filter((d) => { return (new RegExp(generalDateClassName, 'g')).test(d.className); });
    //     weekArr = activeTargets.filter((d) => { return !((new RegExp(generalDateClassName, 'g')).test(d.className)); });
    //     indexArr = targetArr.map((d) => { return Number(d.getAttribute("date")); });
    //
    //     if (Number(weekArr[weekArr.length - 1].getAttribute("month")) === 12) {
    //       lastYear = Number(weekArr[weekArr.length - 1].getAttribute("year")) + 1;
    //       lastMonth = 1;
    //     } else {
    //       lastYear = Number(weekArr[weekArr.length - 1].getAttribute("year"));
    //       lastMonth = Number(weekArr[weekArr.length - 1].getAttribute("month")) + 1;
    //     }
    //     lastBoo = document.querySelector('.' + [ weekClassName, String(lastYear), String(lastMonth) ].join(joinToken)) === null;
    //
    //     targetIndex = 0;
    //     for (let i = 1; i < indexArr.length; i++) {
    //       if (indexArr[i - 1] + 1 !== indexArr[i]) {
    //         targetIndex = i;
    //       }
    //     }
    //
    //     if (Number(targetArr[targetIndex].getAttribute("date")) >= 20) {
    //       for (let i = 0; i < targetArr.length; i++) {
    //         if (targetArr[i].getAttribute("index") !== '6') {
    //           targetArr[i].style.borderRight = "";
    //         }
    //         if (i < targetIndex) {
    //           targetArr[i].style.borderBottom = "";
    //         } else {
    //           targetArr[i].style.borderBottom = "1px solid " + colorChip.gray3;
    //         }
    //       }
    //       targetArr[targetArr.length - 1].style.borderRight = "1px solid " + colorChip.gray3;
    //       addtionalNumber = 7 - (targetArr.length - targetIndex);
    //       for (let i = 0; i < weekArr.length; i++) {
    //         for (let j = 0; j < weekArr[i].children.length; j++) {
    //           weekArr[i].children[j].style.borderBottom = "";
    //         }
    //       }
    //       for (let i = 0; i < weekArr[weekArr.length - 1].children.length; i++) {
    //         if (i >= targetArr.length - targetIndex) {
    //           weekArr[weekArr.length - 1].children[i].style.borderBottom = "1px solid " + colorChip.gray3;
    //         }
    //       }
    //     } else {
    //
    //       for (let i = 0; i < targetArr.length; i++) {
    //         if (targetArr[i].getAttribute("index") !== '6') {
    //           targetArr[i].style.borderRight = "";
    //         }
    //         targetArr[i].style.borderBottom = "";
    //       }
    //       for (let i = 0; i < weekArr.length; i++) {
    //         for (let j = 0; j < weekArr[i].children.length; j++) {
    //           weekArr[i].children[j].style.borderBottom = "";
    //         }
    //       }
    //       if (!lastBoo) {
    //         for (let i = 0; i < weekArr[weekArr.length - 1].children.length; i++) {
    //           weekArr[weekArr.length - 1].children[i].style.borderBottom = "1px solid " + colorChip.gray3;
    //         }
    //       }
    //
    //     }
    //
    //     for (let i = 0; i < activeTargets.length; i++) {
    //       activeTargets[i].style.opacity = String(active);
    //     }
    //
    //     clearTimeout(GeneralJs.timeouts[scrollEventTimeout]);
    //     GeneralJs.timeouts[scrollEventTimeout] = null;
    //   }, 40);
    // }
    // totalMother.addEventListener("scroll", GeneralJs.stacks[scrollEventName]);

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.possibleIconSet = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, colorChip, withOut, blankHref, scrollTo } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight, motherHeight } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const designer = this.designers.pick(desid);
  let mother;
  let radius;
  let left, bottom;
  let margin;
  let color;
  let iconTop;
  let nodeArr;
  let listIcon, previousIcon, nextIcon, aInitialIcon, mInitialIcon, rInitialIcon;

  radius = <%% 20, 20, 20, 20, 6 %%>;
  left = <%% 40, 35, 35, 35, 0 %%>;
  bottom = <%% 40, 35, 35, 35, 7.2 %%>;
  margin = <%% 6, 6, 6, 6, 0 %%>;
  color = colorChip.gradientGreen;
  iconTop = <%% 12.5, 12.5, 12.5, 12.5, 3.8 %%>;

  mother = createNode({
    mother: document.querySelector(".totalMother"),
    style: {
      display: "block",
      position: "fixed",
      height: String(desktop ? motherHeight : (bottom + (radius * 2))) + ea,
      width: String(desktop ? grayBarWidth : (bottom + (radius * 2))) + ea,
      left: desktop ? String(0) : "",
      right: desktop ? "" : String(0),
      bottom: String(belowHeight) + ea,
      background: desktop ? colorChip.gray0 : "transparent",
      zIndex: String(2),
    }
  });

  nodeArr = createNodes([
    {
      mother,
      style: {
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom) + ea,
        left: String(left) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnHamburger(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: "calc(50% - " + String(radius * 0.45) + ea + ")",
        top: String(iconTop) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom + (radius * 2) + margin) + ea,
        left: String(left) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnAinitial(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(15) + ea,
        left: String(12.5) + ea,
        top: String(11) + ea,
      }
    },
    {
      mother,
      style: {
        display: ((instance.middleMode && mobile) ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom) + ea,
        left: String(left + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnDecrease(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: String(9.5) + ea,
        top: String(iconTop - 1.5) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom + (radius * 2) + margin) + ea,
        left: String(left + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnMinitial(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(16.5) + ea,
        left: String(11.5) + ea,
        top: String(11.5) + ea,
      }
    },
    {
      mother,
      style: {
        display: ((instance.middleMode && mobile) ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom) + ea,
        left: String(left + (radius * 2) + margin + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnIncrease(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: String(11.5) + ea,
        top: String(iconTop - 1.5) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom + (radius * 2) + margin) + ea,
        left: String(left + (radius * 2) + margin + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnRinitial(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(14) + ea,
        left: String(13.5) + ea,
        top: String(10.5) + ea,
      }
    },
  ]);

  listIcon = nodeArr[0];
  aInitialIcon = nodeArr[2];
  previousIcon = nodeArr[4];
  mInitialIcon = nodeArr[6];
  nextIcon = nodeArr[8];
  rInitialIcon = nodeArr[10];

  this.listIcon = listIcon;
  this.aInitialIcon = aInitialIcon;
  this.previousIcon = previousIcon;
  this.mInitialIcon = mInitialIcon;
  this.nextIcon = nextIcon;
  this.rInitialIcon = rInitialIcon;

  if (!this.middleMode) {

    listIcon.addEventListener("click", function (e) {
      blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general");
    });

    previousIcon.addEventListener("click", function (e) {
      let previousDesid, boo, thisStandard;
      previousDesid = desid;
      do {
        previousDesid = instance.designers.previous(previousDesid).desid;
        for (let dom of instance.standardDoms) {
          if (dom.getAttribute("desid") === previousDesid) {
            thisStandard = dom;
            boo = (dom.style.display === "none");
          }
        }
      } while (boo);
      scrollTo(document.querySelector(".totalMother").firstChild, thisStandard);
      instance.possibleDetailLaunching(previousDesid);
    });

    nextIcon.addEventListener("click", function (e) {
      let nextDesid, boo, thisStandard;
      nextDesid = desid;
      do {
        nextDesid = instance.designers.next(nextDesid).desid;
        for (let dom of instance.standardDoms) {
          if (dom.getAttribute("desid") === nextDesid) {
            thisStandard = dom;
            boo = (dom.style.display === "none");
          }
        }
      } while (boo);
      scrollTo(document.querySelector(".totalMother").firstChild, thisStandard);
      instance.possibleDetailLaunching(nextDesid);
    });

  } else if (desktop) {

    listIcon.addEventListener("click", function (e) {
      let num = designer.information.did.replace(/[^0-9]/g, '');
      let id;
      id = '';
      for (let i = 0; i < 3 - num.length; i++) {
        id += '0';
      }
      id += num;
      blankHref(FRONTHOST + "/desdetail.php?qqq=de" + id);
    });

    previousIcon.addEventListener("click", function (e) {
      const targets = document.querySelectorAll(".leftMenus");
      if (targets.length > 0) {
        let index, target;
        index = null;
        for (let i = 0; i < targets.length; i++) {
          if (targets[i].getAttribute("toggle") === "on") {
            index = i;
          }
        }
        if (index === null) {
          throw new Error("invaild index");
        }
        target = targets[index - 1] === undefined ? targets[targets.length - 1] : targets[index - 1];
        target.click();
      }
    });

    nextIcon.addEventListener("click", function (e) {
      const targets = document.querySelectorAll(".leftMenus");
      if (targets.length > 0) {
        let index, target;
        index = null;
        for (let i = 0; i < targets.length; i++) {
          if (targets[i].getAttribute("toggle") === "on") {
            index = i;
          }
        }
        if (index === null) {
          throw new Error("invaild index");
        }
        target = targets[index + 1] === undefined ? targets[0] : targets[index + 1];
        target.click();
      }
    });

  }

  rInitialIcon.addEventListener("click", function (e) {
    if (instance.proid === null) {
      window.alert("의뢰서를 선택해주세요!");
    } else {
      window.location.href = window.location.protocol + "//" + window.location.host + "/project?proid=" + instance.proid;
    }
  });

  mInitialIcon.addEventListener("click", async function (e) {
    try {
      e.preventDefault();
      e.stopPropagation();
      const links = await GeneralJs.ajaxJson({
        mode: "read",
        db: "console",
        collection: "folderDesigner",
        whereQuery: { desid }
      }, "/generalMongo", { equal: true });
      if (links.length === 0) {
        alert("만들어진 문서가 없습니다!");
      } else {
        GeneralJs.blankHref(links[0].docs);
      }
    } catch (e) {
      console.log(e);
    }
  });

  mInitialIcon.addEventListener("contextmenu", async function (e) {
    try {
      e.preventDefault();
      e.stopPropagation();
      const links = await GeneralJs.ajaxJson({
        mode: "read",
        db: "console",
        collection: "folderDesigner",
        whereQuery: { desid }
      }, "/generalMongo", { equal: true });
      if (links.length === 0) {
        alert("만들어진 폴더가 없습니다!");
      } else {
        GeneralJs.blankHref(links[0].drive);
      }
    } catch (e) {
      console.log(e);
    }
  });

  aInitialIcon.addEventListener("click", function (e) {
    if (instance.proid === null) {
      if (window.confirm(designer.designer + " 디자이너님에게 디자이너 콘솔 알림톡을 전송합니다. 확실합니까?")) {
        GeneralJs.ajaxJson({
          method: "designerConsole",
          name: designer.designer,
          phone: designer.information.phone,
          option: {
            desid: designer.desid,
            designer: designer.designer,
            host: GHOSTHOST,
            path: "console",
          }
        }, "/alimTalk").then(() => {
          return GeneralJs.ajaxJson({
            page: "possible",
            mode: "send",
            who: GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail,
            desid: designer.desid,
          }, "/ghostDesigner_updateAnalytics");
        }).then(() => {
          instance.mother.greenAlert("알림톡이 전송되었습니다!");
        }).catch((err) => {
          console.log(err);
        });
      } else {
        instance.mother.greenAlert("알림톡 전송을 취소하였습니다.");
      }
    } else {
      if (window.confirm(designer.designer + " 디자이너님에게 " + instance.client.name + " 고객님 홈스타일링 의뢰서 알림톡을 전송합니다. 확실합니까?")) {
        GeneralJs.ajaxJson({
          method: "designerConsoleRequest",
          name: designer.designer,
          phone: designer.information.phone,
          option: {
            desid: designer.desid,
            designer: designer.designer,
            client: instance.client.name,
            host: GHOSTHOST,
            path: "console",
            mode: "request",
            cliid: instance.client.cliid,
          }
        }, "/alimTalk").then(() => {
          return GeneralJs.ajaxJson({
            page: "possible",
            mode: "send",
            who: GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail,
            desid: designer.desid,
          }, "/ghostDesigner_updateAnalytics");
        }).then(() => {
          instance.mother.greenAlert("알림톡이 전송되었습니다!");
        }).catch((err) => {
          console.log(err);
        });
      } else {
        instance.mother.greenAlert("알림톡 전송을 취소하였습니다.");
      }
    }
  });

}

DesignerJs.prototype.possibleView = async function () {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    const middleMode = /middle/gi.test(window.location.pathname);
    this.backGrayBar();
    await this.spreadData(null, true, middleMode ? "middle" : null);
    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight } = this;
    const standardBar = totalMother.firstChild;
    const designers = await ajaxJson({ noFlat: true }, "/getDesigners", { equal: true });
    const projects = await ajaxJson({
      noFlat: true,
      whereQuery: { desid: { $regex: "^d" } }
    }, "/getProjects", { equal: true });
    const clients = await ajaxJson({
      noFlat: true,
      whereQuery: { $or: projects.map((obj) => { return { cliid: obj.cliid } }) }
    }, "/getClients", { equal: true });
    const length = designers.length;
    const getObj = returnGet();
    let boxTong;
    let nodeArr;
    let tempObj;
    let width, height;
    let status;
    let searchInput;
    let standardBar_mother;
    let style;
    let childrenLength, children;
    let motherHeight;
    let searchResult;

    this.designers = new Designers(designers);
    this.designers.setProjects(projects);
    this.designers.setClients(clients);
    this.desid = (getObj.desid !== undefined) ? getObj.desid : this.standardDoms[this.standardDoms.length - 1].getAttribute("desid");
    this.middleMode = middleMode;
    this.modes = [ "checklist", "report", "request" ];
    this.mode = this.modes[2];
    this.result = null;
    this.searchCondition = {
      mode: "or",
      conditions: [],
      blocks: [],
    };
    this.dateDoms = [];
    this.selection = [];

    motherHeight = <%% 154, 148, 148, 148, 148 %%>;

    //search event
    if (this.searchInput !== undefined && this.searchInput !== null) {
      searchInput = this.searchInput;
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          if (instance.totalFather !== null) {
            document.getElementById("totalcontents").removeChild(document.querySelector(".totalFather"));
            instance.totalFather = null;
            instance.totalMother.classList.remove("justfadeoutoriginal");
            instance.totalMother.classList.add("justfadeinoriginal");
          }
          const value = this.value.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '').replace(/[\~\@\#\$\%\^\&\*\(\)\-\=\+\[\]\{\}\<\>\/\\ \n\t]/gi, '');
          let target;
          if (value === "") {
            instance.possibleDetailLaunching(instance.standardDoms[1].getAttribute("desid"));
          } else {
            searchResult = instance.designers.search(value);
            if (searchResult.length > 0) {
              instance.possibleDetailLaunching(searchResult[0].desid);
            }
          }
        }
      });
    }

    //standard doms event
    standardBar_mother = standardBar.cloneNode(false);
    style = {
      position: "fixed",
      height: withOut(100, belowHeight + motherHeight, ea),
      overflow: "scroll",
    };
    for (let i in style) {
      standardBar_mother.style[i] = style[i];
    }
    totalMother.insertBefore(standardBar_mother, standardBar);
    standardBar_mother.appendChild(standardBar);
    for (let i = 1; i < this.standardDoms.length; i++) {
      this.standardDoms[i].style.color = colorChip[(/완료/g.test(this.designers.pick(this.standardDoms[i].getAttribute("desid")).information.contract.status)) ? "black" : "deactive"];
      this.standardDoms[i].setAttribute("color", this.standardDoms[i].style.color);
      this.standardDoms[i].style.transition = "all 0s ease";
      this.standardDoms[i].addEventListener("click", (e) => {
        instance.possibleDetailLaunching(instance.standardDoms[i].getAttribute("desid"));
      });
      children = this.standardDoms[i].children;
      childrenLength = children.length;
      for (let j = 0; j < childrenLength; j++) {
        children[j].style.color = "inherit";
        children[j].style.transition = "all 0s ease";
      }
    }

    this.firstTop = this.standardDoms[1].getBoundingClientRect().top;
    this.motherHeight = motherHeight;

    loading.parentNode.removeChild(loading);

    this.pageHistory = [];
    window.addEventListener("resize", (e) => {
      window.location.reload();
    });
    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      if (instance.pageHistory.length > 1) {
        if (getObj.mode === instance.pageHistory[1].path) {
          if (instance.pageHistory[1].status === "list") {
            instance.possibleDetailLaunching(instance.pageHistory[1].desid);
            instance.pageHistory.shift();
            instance.pageHistory.shift();
          } else {
            instance.possibleDetailLaunching(instance.pageHistory[1].desid);
            instance.pageHistory.shift();
            // for (let box of instance.requestBoxes) {
            //   if (box.getAttribute("cliid") === instance.pageHistory[1].cliid) {
            //     box.click();
            //   }
            // }
            instance.pageHistory.shift();
            instance.pageHistory.shift();
          }
        }
      }
    });

    //launching
    this.proid = null;
    this.project = null;
    this.client = null;
    this.possibleDetailLaunching(this.desid);

  } catch (e) {
    console.log(e);
  }
}
