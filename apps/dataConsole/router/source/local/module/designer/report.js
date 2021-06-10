DesignerJs.prototype.reportDetailLaunching = function (desid) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { colorChip } = GeneralJs;
  let target;

  this.desid = desid;

  if (this.reportBaseTong !== undefined && this.reportBaseTong !== null) {
    this.reportBaseTong.parentNode.removeChild(this.reportBaseTong);
    this.reportBaseTong = null;
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
  totalMother.scrollTo({ top: 0, behavior: "smooth" });
  this.reportDetail(desid);
  this.reportIconSet(desid);
}

DesignerJs.prototype.reportDetail = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, getCookiesAll } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const matrixButtonConst = "matrixButtons_" + desid;
  const cookies = getCookiesAll();
  const overConst = 3;
  const today = new Date();
  let designer;
  let information, analytics;
  let margin;
  let baseTong0, baseTong;
  let matrix;
  let tempArr;
  let tempObj, nodeArr;
  let eachTotalTong, eachNameTong, eachValueTong;
  let level1Width, level1Left;
  let topMargin, leftMargin, bottomMargin;
  let size;
  let tempMatrix;
  let alphabetWidth;
  let temp;
  let factorHeight, factorWidth;
  let tendencyTop, tendencyHeight;
  let tendencyFactorHeight, tendencyIndent, tendencyWidthIndent;
  let textAreaTop;
  let baseTongMarginBottom;
  let factorMarginTop, factorMarginBottom;
  let left;
  let columnVisual;
  let sumStartLeft;
  let overTargets;
  let overWidth, overRadius;
  let offConst;

  designer = this.designers.pick(desid);
  information = designer.information;
  analytics = designer.analytics;

  margin = 8;
  level1Width = 130;
  level1Left = 120;
  topMargin = isMac() ? 30 : 34;
  leftMargin = 34;
  bottomMargin = isMac() ? 15 : 13;
  baseTongMarginBottom = 80;
  size = 17;
  tendencyTop = 3;
  tendencyHeight = 16;
  alphabetWidth = 30;

  factorHeight = 34;
  factorWidth = 210;
  tendencyFactorHeight = 30;
  tendencyIndent = 105;
  tendencyWidthIndent = -135;

  factorMarginTop = 22;
  factorMarginBottom = factorHeight - (size - 2 + (isMac() ? 9 : 8));
  columnVisual = 5;

  sumStartLeft = 12;
  overWidth = 40;
  overRadius = 6;

  offConst = 102;

  textAreaTop = isMac() ? -3 : -4;

  const thisReport = this.reports.pick(desid);
  const { proposal, contract, price, contents } = thisReport.timeSplit();
  const reportData = [
    { name: "제안", children: [] },
    { name: "계약", children: [] },
    { name: "가격", children: [] },
    { name: "컨텐츠", children: [] },
  ];

  reportData[0].children.push({
    name: "",
    matrix: [ proposal.columns ],
    width: proposal.width,
    over: false,
    height: factorHeight + factorMarginBottom - columnVisual,
  });

  reportData[1].children.push({
    name: "",
    matrix: [ contract.columns ],
    width: contract.width,
    over: false,
    height: factorHeight + factorMarginBottom - columnVisual,
  });

  reportData[3].children.push({
    name: "",
    matrix: [ contents.columns ],
    width: contents.width,
    over: false,
    height: factorHeight + factorMarginBottom - columnVisual,
  });

  if (proposal.length > 0) {
    for (let { name, matrix, values } of proposal) {
      if (values.length === 0) {
        reportData[0].children.push({
          name,
          matrix: [ (proposal.columns.map((i) => { return '-'; })) ],
          width: proposal.width,
          over: false,
          height: factorHeight + factorMarginBottom,
        });
      } else {
        reportData[0].children.push({
          name,
          matrix,
          width: proposal.width,
          over: (values.length > overConst),
          height: (values.length >= overConst) ? ((factorHeight * overConst) + factorMarginBottom) : ((factorHeight * values.length) + factorMarginBottom),
        });
      }
    }
    reportData[0].children.push({
      name: "",
      result: proposal.result,
      height: (factorHeight * proposal.result.words.length) + factorMarginBottom,
    });
    reportData[0].children.push({
      name: "",
      result: proposal.result.year,
      height: (factorHeight * proposal.result.year.words.length) + factorMarginBottom,
    });
    reportData[0].children.push({
      name: "",
      result: proposal.result.total,
      height: (factorHeight * proposal.result.total.words.length) + factorMarginBottom,
    });
  } else {
    reportData[0].children.push({
      name: "제안건 없음",
      matrix: [ (proposal.columns.map((i) => { return '-'; })) ],
      width: proposal.width,
      over: false,
      height: factorHeight + factorMarginBottom,
    });
  }

  if (contract.length > 0) {
    for (let { name, matrix, values } of contract) {
      if (values.length === 0) {
        reportData[1].children.push({
          name,
          matrix: [ (contract.columns.map((i) => { return '-'; })) ],
          width: contract.width,
          over: false,
          height: factorHeight + factorMarginBottom,
        });
      } else {
        reportData[1].children.push({
          name,
          matrix,
          width: contract.width,
          over: (values.length > overConst),
          height: (values.length >= overConst) ? ((factorHeight * overConst) + factorMarginBottom) : ((factorHeight * values.length) + factorMarginBottom),
        });
      }
    }
    reportData[1].children.push({
      name: "",
      result: contract.result,
      height: (factorHeight * contract.result.words.length) + factorMarginBottom,
    });
    reportData[1].children.push({
      name: "",
      result: contract.result.year,
      height: (factorHeight * contract.result.year.words.length) + factorMarginBottom,
    });
    reportData[1].children.push({
      name: "",
      result: contract.result.total,
      height: (factorHeight * contract.result.total.words.length) + factorMarginBottom,
    });
  } else {
    reportData[1].children.push({
      name: "계약건 없음",
      matrix: [ (contract.columns.map((i) => { return '-'; })) ],
      width: contract.width,
      over: false,
      height: factorHeight + factorMarginBottom,
    });
  }

  reportData[2].children.push({
    name: "",
    matrix: [ price.columns ],
    width: price.width,
    over: false,
    height: factorHeight + factorMarginBottom - columnVisual,
  });
  if (price.length > 0) {
    reportData[2].children.push({
      name: String(today.getFullYear()).slice(2) + "년 현재",
      matrix: price,
      width: price.width,
      over: false,
      height: (factorHeight * price.length) + factorMarginBottom,
    });
  } else {
    reportData[2].children.push({
      name: "가격 없음",
      matrix: [ (price.columns.map((i) => { return '-'; })) ],
      width: price.width,
      over: false,
      height: factorHeight + factorMarginBottom,
    });
  }

  if (contents.length > 0) {
    for (let { name, matrix, values } of contents) {
      if (values.length === 0) {
        reportData[3].children.push({
          name,
          matrix: [ (contents.columns.map((i) => { return '-'; })) ],
          width: contents.width,
          over: false,
          height: factorHeight + factorMarginBottom,
        });
      } else {
        reportData[3].children.push({
          name,
          matrix,
          width: contents.width,
          over: (values.length > overConst),
          height: (values.length >= overConst) ? ((factorHeight * overConst) + factorMarginBottom) : ((factorHeight * values.length) + factorMarginBottom),
        });
      }
    }
  } else {
    reportData[3].children.push({
      name: "컨텐츠 없음",
      matrix: [ (contents.columns.map((i) => { return '-'; })) ],
      width: contents.width,
      over: false,
      height: factorHeight + factorMarginBottom,
    });
  }

  baseTong0 = createNode({
    mother: totalMother,
    style: {
      position: "absolute",
      top: String(margin * 3) + ea,
      left: String(grayBarWidth + (margin * 3)) + ea,
      width: withOut(grayBarWidth + (margin * 6), ea),
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
      borderRadius: String(5) + ea,
      border: "1px solid " + colorChip.gray4,
      background: colorChip.white,
      height: "auto",
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
    }
  });

  for (let i = 0; i < reportData.length; i++) {
    nodeArr = createNodes([
      {
        mother: baseTong,
        class: [ "totalname_" + String(i) ],
        attribute: [
          { x: String(i) },
        ],
        style: {
          position: "relative",
          width: String(100) + '%',
          height: "auto",
          overflow: "hidden",
          borderBottom: i !== reportData.length - 1 ? "1px solid " + colorChip.gray4 : "",
        }
      },
      {
        mother: -1,
        class: [ "hoverDefault" ],
        text: reportData[i].name,
        events: [
          {
            type: "click",
            event: function (e) {
              const x = Number(this.getAttribute('x'));
              const toggle = this.getAttribute("toggle");
              const target = document.querySelector(".totalname_" + String(x));
              if (toggle === "on") {
                target.style.height = String(offConst) + ea;
                this.setAttribute("toggle", "off");
              } else {
                target.style.height = "auto";
                this.setAttribute("toggle", "on");
              }
            }
          }
        ],
        attribute: [
          { x: String(i) },
          { toggle: "on" },
        ],
        style: {
          position: "absolute",
          fontSize: String(size) + ea,
          fontWeight: String(700),
          color: colorChip.black,
          top: String(topMargin + 1) + ea,
          left: String(leftMargin) + ea,
        }
      },
      {
        mother: -2,
        style: {
          position: "absolute",
          width: String(level1Width) + ea,
          top: String(0) + ea,
          left: String(level1Left) + ea,
          paddingTop: String(topMargin) + ea,
        }
      },
      {
        mother: -3,
        style: {
          position: "relative",
          width: withOut(level1Width + level1Left, ea),
          top: String(0) + ea,
          left: String(level1Width + level1Left) + ea,
          height: String(100) + '%',
          paddingTop: String(topMargin) + ea,
        }
      },
    ]);

    eachTotalTong = nodeArr[0];
    eachNameTong = nodeArr[2];
    eachValueTong = nodeArr[3];

    for (let j = 0; j < reportData[i].children.length; j++) {
      tempArr = [];
      tempObj = {
        mother: eachNameTong,
        class: [ "name_" + String(i) + "_" + String(j), ((reportData[i].children[j].matrix !== undefined && reportData[i].children[j].over) ? "overTarget" : "generalTarget") ],
        attribute: [
          { x: String(i) },
          { y: String(j) },
        ],
        text: reportData[i].children[j].name,
        style: {
          display: "block",
          position: "relative",
          fontSize: String(size - 2) + ea,
          fontWeight: String(600),
          color: colorChip.green,
          height: String(reportData[i].children[j].height) + ea,
          width: String(100) + '%',
          marginBottom: String((j !== reportData[i].children.length - 1) ? factorMarginTop : 0) + ea,
          borderBottom: j !== reportData[i].children.length - 1 ? ("1px solid " + colorChip.gray4) : "",
        }
      };
      tempArr.push(tempObj);

      tempObj = {
        mother: eachValueTong,
        class: [ "dom_" + String(i) + "_" + String(j) ],
        attribute: [
          { x: String(i) },
          { y: String(j) },
        ],
        style: {
          display: "block",
          position: "relative",
          height: String(reportData[i].children[j].height) + ea,
          width: String(100) + '%',
          overflow: "hidden",
          marginBottom: String((j !== reportData[i].children.length - 1) ? factorMarginTop : 0) + ea,
          borderBottom: j !== reportData[i].children.length - 1 ? ("1px solid " + colorChip.gray4) : "",
        }
      };
      tempArr.push(tempObj);

      if (reportData[i].children[j].matrix !== undefined) {
        for (let h = 0; h < reportData[i].children[j].matrix.length; h++) {
          tempObj = {
            mother: -1 + (-1 * h * (reportData[i].children[j].width.length + 1)),
            class: [ "dom_" + String(i) + "_" + String(j), "dom_" + String(i) + "_" + String(j) + "_" + String(h) ],
            attribute: [
              { x: String(i) },
              { y: String(j) },
              { z: String(h) },
            ],
            style: {
              display: ((i === 2) || (h < overConst)) ? "block" : "none",
              position: "relative",
              height: String(factorHeight) + ea,
              width: String(100) + '%',
              left: String(0) + ea,
              overflow: "hidden"
            }
          };
          tempArr.push(tempObj);
          left = 0;
          for (let k = 0; k < reportData[i].children[j].width.length; k++) {
            tempObj = {
              mother: -1 + (-1 * k),
              text: String(reportData[i].children[j].matrix[h][k]),
              style: {
                position: "absolute",
                fontSize: String(size - 2) + ea,
                fontWeight: String(j === 0 ? 600 : 400),
                color: colorChip.black,
                height: String(100) + '%',
                width: String(reportData[i].children[j].width[k]) + ea,
                top: String(0) + ea,
                left: String(left) + ea,
                textAlign: "center",
              }
            };
            tempArr.push(tempObj);
            left += reportData[i].children[j].width[k];
          }
        }
      } else if (reportData[i].children[j].result !== undefined) {

        for (let h = 0; h < reportData[i].children[j].result.words.length; h++) {
          tempObj = {
            mother: -1 + (-1 * h * ((reportData[i].children[j].result.words[h].values.length * 2) + 1 + 1)),
            class: [ "dom_" + String(i) + "_" + String(j), "dom_" + String(i) + "_" + String(j) + "_" + String(h) ],
            attribute: [
              { x: String(i) },
              { y: String(j) },
              { z: String(h) },
            ],
            style: {
              display: "block",
              position: "relative",
              height: String(factorHeight) + ea,
              width: String(100) + '%',
              left: String(0) + ea,
              overflow: "hidden"
            }
          };
          tempArr.push(tempObj);

          tempObj = {
            mother: -3 + (-1 * h * ((reportData[i].children[j].result.words[h].values.length * 2) + 1 + 1)),
            text: String(reportData[i].children[j].result.words[h].name),
            style: {
              display: "block",
              position: "relative",
              height: String(factorHeight) + ea,
              fontSize: String(size - 2) + ea,
              fontWeight: String(600),
              color: colorChip.black,
              width: String(100) + '%',
              top: String(0) + ea,
              left: String(0) + ea,
              textAlign: "left",
            }
          };
          tempArr.push(tempObj);

          left = sumStartLeft;
          for (let k = 0; k < reportData[i].children[j].result.words[h].values.length; k++) {
            tempObj = {
              mother: -2 + (-2 * k),
              text: String(reportData[i].children[j].result.words[h].values[k].name),
              style: {
                position: "absolute",
                fontSize: String(size - 2) + ea,
                fontWeight: String(400),
                color: colorChip.green,
                height: String(100) + '%',
                width: String(reportData[i].children[j].result.words[h].values[k].width[0]) + ea,
                top: String(0) + ea,
                left: String(left) + ea,
                textAlign: "left",
              }
            };
            tempArr.push(tempObj);
            left += reportData[i].children[j].result.words[h].values[k].width[0];

            tempObj = {
              mother: -3 + (-2 * k),
              text: String(reportData[i].children[j].result.words[h].values[k].value),
              style: {
                position: "absolute",
                fontSize: String(size - 2) + ea,
                fontWeight: String(400),
                color: colorChip.black,
                height: String(100) + '%',
                width: String(reportData[i].children[j].result.words[h].values[k].width[1]) + ea,
                top: String(0) + ea,
                left: String(left) + ea,
                textAlign: "left",
              }
            };
            tempArr.push(tempObj);
            left += reportData[i].children[j].result.words[h].values[k].width[1];
          }
        }
      }
      createNodes(tempArr);
    }
  }

  overTargets = document.querySelectorAll('.' + "overTarget");
  for (let dom of overTargets) {
    createNode({
      mother: dom,
      attribute: [
        { x: dom.getAttribute('x') },
        { y: dom.getAttribute('y') },
        { toggle: "off" },
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            const x = Number(this.getAttribute('x'));
            const y = Number(this.getAttribute('y'));
            const toggle = this.getAttribute("toggle");
            let targets, temp, length;

            targets = [];
            temp = document.querySelector(".dom_" + String(x) + "_" + String(y));
            targets.push(temp);
            temp = document.querySelector(".name_" + String(x) + "_" + String(y));
            targets.push(temp);
            length = targets[0].children.length;

            if (toggle === "off") {
              for (let target of targets) {
                target.style.height = String((factorHeight * length) + factorMarginBottom) + ea;
              }
              for (let child of targets[0].children) {
                child.style.display = "block";
              }
              this.setAttribute("toggle", "on");
            } else {
              for (let target of targets) {
                target.style.height = String((factorHeight * overConst) + factorMarginBottom) + ea;
              }
              for (let i = 0; i < length; i++) {
                if (i < overConst) {
                  targets[0].children[i].style.display = "block";
                } else {
                  targets[0].children[i].style.display = "none";
                }
              }
              this.setAttribute("toggle", "off");
            }
          }
        }
      ],
      class: [ "hoverDefault" ],
      style: {
        position: "absolute",
        bottom: String(factorMarginTop + factorMarginBottom - 3) + ea,
        left: String(0) + ea,
        width: String(overWidth) + ea,
        height: String(overRadius + 12) + ea,
        background: colorChip.white,
        cursor: "pointer",
      },
      children: [
        {
          style: {
            position: "absolute",
            height: String(overRadius) + ea,
            width: String(overRadius) + ea,
            background: colorChip.green,
            borderRadius: String(overRadius) + ea,
            bottom: String(0) + ea,
            left: String(0) + ea,
          }
        },
        {
          style: {
            position: "absolute",
            height: String(overRadius) + ea,
            width: String(overRadius) + ea,
            background: colorChip.green,
            borderRadius: String(overRadius) + ea,
            bottom: String(0) + ea,
            left: String(overRadius * 1.5) + ea,
          }
        },
        {
          style: {
            position: "absolute",
            height: String(overRadius) + ea,
            width: String(overRadius) + ea,
            background: colorChip.green,
            borderRadius: String(overRadius) + ea,
            bottom: String(0) + ea,
            left: String(overRadius * 3) + ea,
          }
        },
      ]
    });
  }

  this.reportBaseTong = baseTong0;
}

DesignerJs.prototype.reportDesignerMemo = function (desid) {
  const instance = this;
  const { totalMother, ea, grayBarWidth, belowHeight } = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut } = GeneralJs;
  const baseTong = this.reportBaseTong;
  const designer = this.designers.pick(desid);
  return async function (e) {
    try {
      if (document.getElementById("memoTong") === null) {

        let memoTong;
        let margin;
        let innerMargin;
        let titleHeight;
        let size;
        let resObj, history, career;
        let nodeArr;

        margin = 40;
        innerMargin = 15;
        titleHeight = 28;
        size = 16;

        resObj = await ajaxJson({ method: "designer", property: "history", idArr: [ desid ] }, "/getHistoryTotal");
        if (resObj[desid] === undefined) {
          throw new Error("history error");
        }
        career = resObj[desid].career;

        memoTong = createNode({
          mother: totalMother,
          id: "memoTong",
          events: [
            {
              type: "dblclick",
              event: function (e) {
                e.preventDefault();
                e.stopPropagation();
                totalMother.removeChild(document.getElementById("memoTong"));
              }
            },
            {
              type: "contextmenu",
              event: function (e) {
                e.preventDefault();
                e.stopPropagation();
                totalMother.removeChild(document.getElementById("memoTong"));
              }
            }
          ],
          style: {
            position: "fixed",
            width: "calc(calc(calc(100% - " + String(grayBarWidth) + ea + ") / 3) - " + String(margin) + ea + ")",
            height: "calc(calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 3) * 1.5) - " + String(margin) + ea + ")",
            bottom: String(belowHeight + margin) + ea,
            right: String(margin) + ea,
            borderRadius: String(3) + "px",
            boxShadow: "0px 5px 18px -9px " + colorChip.shadow,
            animation: "fadeup 0.3s ease forwards",
            background: colorChip.gradientGreen2,
          }
        });

        nodeArr = createNodes([
          {
            mother: memoTong,
            text: designer.designer + " 디자이너 상세 경력",
            style: {
              position: "absolute",
              top: String(innerMargin - 1) + ea,
              left: String(innerMargin + 1) + ea,
              fontSize: String(size) + ea,
              fontWeight: String(600),
              color: colorChip.white,
            }
          },
          {
            mother: memoTong,
            style: {
              position: "absolute",
              bottom: String(innerMargin) + ea,
              left: String(innerMargin) + ea,
              width: "calc(100% - " + String(innerMargin * 2) + ea + ")",
              height: withOut((innerMargin * 2) + titleHeight, ea),
              background: colorChip.white,
              borderRadius: String(3) + "px",
              opacity: String(0.95),
            }
          },
          {
            mother: -1,
            style: {
              position: "absolute",
              top: String(innerMargin - 2) + ea,
              left: String(innerMargin) + ea,
              width: withOut((innerMargin - 2) * 2, ea),
              height: withOut(innerMargin * 2, ea),
              background: "aqua",
            }
          },
          {
            mother: -1,
            mode: "textarea",
            events: [
              {
                type: "blur",
                event: function (e) {
                  const cookies = GeneralJs.getCookiesAll();
                  const ajaxData = "method=designer&id=" + desid + "&column=career&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail;
                  GeneralJs.ajax(ajaxData, "/updateHistory", function () {});
                }
              },
              {
                type: "keypress",
                event: function (e) {
                  if (e.key === "Enter") {
                    const cookies = GeneralJs.getCookiesAll();
                    const ajaxData = "method=designer&id=" + desid + "&column=career&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail;
                    GeneralJs.ajax(ajaxData, "/updateHistory", function () {});
                  }
                }
              },
              {
                type: "contextmenu",
                event: function (e) {
                  e.stopPropagation();
                }
              }
            ],
            style: {
              position: "relative",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              fontSize: String(size - 1) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              border: String(0),
              outline: String(0),
              overflow: "scroll",
              height: String(100) + '%',
              lineHeight: String(1.7),
            }
          },
        ]);
        nodeArr[3].value = career;

      } else {
        totalMother.removeChild(document.getElementById("memoTong"));
      }

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.reportIconSet = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, colorChip, withOut, blankHref } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight, motherHeight } = this;
  const designer = this.designers.pick(desid);
  let mother;
  let radius;
  let left, bottom;
  let margin;
  let color;
  let iconTop;
  let nodeArr;
  let listIcon, previousIcon, nextIcon, aInitialIcon, mInitialIcon, rInitialIcon;

  radius = 20;
  left = 40;
  bottom = 40;
  margin = 6;
  color = colorChip.gradientGreen;
  iconTop = 12.5;

  mother = createNode({
    mother: document.querySelector(".totalMother"),
    style: {
      position: "fixed",
      height: String(motherHeight) + ea,
      width: String(grayBarWidth) + ea,
      left: String(0),
      bottom: String(belowHeight) + ea,
      background: colorChip.gray0,
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
      source: this.mother.returnHamburger(colorChip.white),
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
      source: this.mother.returnAinitial(colorChip.white),
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
      source: this.mother.returnDecrease(colorChip.white),
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
      source: this.mother.returnMinitial(colorChip.white),
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
      source: this.mother.returnIncrease(colorChip.white),
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
      source: this.mother.returnRinitial(colorChip.white),
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

  listIcon.addEventListener("click", function (e) {
    blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general");
  });

  previousIcon.addEventListener("click", function (e) {
    const { desid: previousDesid } = instance.designers.previous(desid);
    instance.reportDetailLaunching(previousDesid);
  });

  nextIcon.addEventListener("click", function (e) {
    const { desid: nextDesid } = instance.designers.next(desid);
    instance.reportDetailLaunching(nextDesid);
  });

  rInitialIcon.addEventListener("click", function (e) {
    blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general&desid=" + desid);
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
    const today = new Date();
    const dayArr = [ '일', '월', '화', '수', '목', '금', '토' ];
    let expiredString = '';

    if (today.getDay() !== 0 && today.getDay() !== 6) {
      //pyeong-day
      today.setDate(today.getDate() + 7);
    } else {
      if (today.getDay() !== 0) {
        //saturday
        today.setDate(today.getDate() + 9);
      } else {
        //sunday
        today.setDate(today.getDate() + 8);
      }
    }

    expiredString += String(today.getMonth() + 1) + "월";
    expiredString += " ";
    expiredString += String(today.getDate()) + "일";
    expiredString += " ";
    expiredString += dayArr[today.getDay()] + "요일";
    expiredString += " ";
    expiredString += String(14) + "시";

    if (window.confirm(designer.designer + " 디자이너님에게 알림톡을 전송합니다. 확실합니까?\n메세지에 기입될 마감 기한 => " + expiredString)) {
      GeneralJs.ajax("method=designerCheckList&name=" + designer.designer + "&phone=" + designer.information.phone + "&option=" + JSON.stringify({ date: expiredString, desid: desid, host: "ADDRESS[homeinfo(ghost)]" }), "/alimTalk", function (rawJson) {
        let middleDate, deadDate;
        if (JSON.parse(rawJson).message !== "success") {
          throw new Error("alimTalk error");
        } else {
          instance.mother.greenAlert("알림톡이 전송되었습니다!");
          //set deadline
          middleDate = new Date();
          middleDate.setHours(middleDate.getHours() + 8);
          deadDate = new Date();
          deadDate.setDate(deadDate.getDate() + 9);
          GeneralJs.ajax("json=" + JSON.stringify({ deadline: deadDate, middleline: middleDate, name: "designerCheckList_" + desid, mode: "set" }), "/manageDeadline", function (res) {});
        }
      });
    } else {
      instance.mother.greenAlert("알림톡 전송을 취소하였습니다.");
    }
  });

}

DesignerJs.prototype.reportDataRendering = async function () {
  const instance = this;
  try {
    const { ajaxJson, dateToString, autoComma } = GeneralJs;
    const today = new Date();
    const yearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    const emptyDate = new Date(1800, 0, 1);
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    const reverseMatrix = function (matrix) {
      if (!Array.isArray(matrix)) {
        throw new Error("must be 2 matrix");
      }
      let length = null;
      for (let arr of matrix) {
        if (!Array.isArray(arr)) {
          throw new Error("invaild matrix");
        }
        if (length !== null) {
          if (length !== arr.length) {
            throw new Error("invaild matrix");
          }
        }
        length = arr.length;
      }
      if (length === null) {
        return [];
      }
      let tong;
      let tempArr;
      tong = [];
      for (let i = 0; i < length; i++) {
        tempArr = [];
        for (let arr of matrix) {
          tempArr.push(arr[i]);
        }
        tong.push(tempArr);
      }
      return tong;
    }
    const service = [
      { serid: "s2011_aa01s", column: "homeFurnishing", name: "홈퍼니싱", id: 'F' },
      { serid: "s2011_aa02s", column: "homeStyling", name: "홈스타일링", id: 'S' },
      { serid: "s2011_aa03s", column: "totalStyling", name: "토탈 스타일링", id: 'T' },
      { serid: "s2011_aa04s", column: "architecture", name: "설계 변경", id: 'XT' }
    ];
    const xValueMap = { "M": "mini", "B": "basic", "P": "premium" };
    const relationItems = [ "지속가능성 높음", "그냥 평범", "확인중", "좋지 않음" ];
    class DesignerReports extends Array {
      constructor(arr, projects, price) {
        super();
        if (!Array.isArray(arr) || projects === undefined || price === undefined) {
          throw new Error("invaild input");
        }
        this.projects = projects;
        this.price = price;
        for (let i of arr) {
          if (!(i instanceof DesignerReport)) {
            throw new Error("child must be DesignerReport type");
          }
          this.push(i);
        }
      }
      pick(q) {
        if (typeof q !== "string") {
          throw new Error("invaild input");
        }
        let result;
        result = null;
        if (/^d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(q)) {
          for (let obj of this) {
            if (obj.desid === q) {
              result = obj;
              break;
            }
          }
        } else {
          for (let obj of this) {
            if ((new RegExp(q, "gi")).test(obj.designer.designer)) {
              result = obj;
              break;
            }
          }
        }
        return result;
      }
    }
    class DesignerReport {
      constructor(projects, price) {
        if (projects === undefined || price === undefined) {
          throw new Error("invaild input");
        }
        this.projects = projects;
        this.price = price;
      }
      timeSplit() {
        const { proposal, contract, price, contents } = this;
        const today = new Date();
        const timeHalfConst = "반기";
        const timeHalfArr = [ "상", "하" ];
        const timeHalfToken = [ 30000, 60000 ];
        const service = [
          { serid: "s2011_aa01s", column: "homeFurnishing", name: "홈퍼니싱", id: 'F' },
          { serid: "s2011_aa02s", column: "homeStyling", name: "홈스타일링", id: 'S' },
          { serid: "s2011_aa03s", column: "totalStyling", name: "토탈 스타일링", id: 'T' },
          { serid: "s2011_aa04s", column: "architecture", name: "설계 변경", id: 'XT' }
        ];
        const proposalConst = {
          width: [
            50,
            50,
            50,
            72,
            60,
            120,
            120,
            64,
            110,
            72,
            60,
            60,
          ],
          columns: [
            'E',
            'Y',
            'H',
            "고객",
            "서비스",
            "제안 날짜",
            "제안 금액",
            "평수",
            "평단가",
            "방식",
            "부분",
            "계약",
          ]
        };
        const contractConst = {
          width: [
            50,
            50,
            50,
            72,
            60,
            110,
            110,
            72,
            50,
            120,
            70,
            120,
            64,
            110,
            110,
            110,
          ],
          columns: [
            'E',
            'Y',
            'H',
            "고객",
            "서비스",
            "시작일",
            "종료일",
            "방식",
            "부분",
            "정산 금액",
            "수수료",
            "제안 금액",
            "평수",
            "평단가",
            "선금 정산일",
            "잔금 정산일",
          ]
        };
        const priceConst = {
          width: [
            50,
            150,
            130,
            130,
            130,
            130,
            130,
            130,
            130,
            130,
          ],
          columns: [
            "가산점",
            "서비스명",
            "0 - 8",
            "9 - 14",
            "15 - 22",
            "23 - 29",
            "30 - 33",
            "34 - 38",
            "39 - 44",
            "44 - 999",
          ]
        };
        const contentsConst = {
          width: [
            50,
            50,
            50,
            72,
            72,
            72,
            110,
            110,
            360,
            360
          ],
          columns: [
            'E',
            'Y',
            'H',
            "종류",
            "고객",
            "아이디",
            "발행일",
            "고객 후기",
            "포트폴리오 링크",
            "고객 후기 링크"
          ],
        };
        const homepage = "https://home-liaison.com";
        const portfolioPath = "/portdetail.php";
        const reviewPath = "/revdetail.php";
        class TimeArray extends Array {
          setWidth(width) {
            this.width = width;
          }
          setColumns(columns) {
            this.columns = columns;
          }
          setProperty(name, value) {
            this[name] = value;
          }
        }
        let proposalFirst, contactFirst;
        let timeValue0, timeValue1;
        let timeCaseBoo;
        let timeArr;
        let timeLength;
        let timeHalfFirst;
        let first;
        let thisYear, thisHalf;
        let tempDate0, tempDate1;
        let tempTong;
        let resultObj;
        let tempArr;
        let boo;
        let totalOrder;
        let yearOrders, yearOrder;
        let order;
        let pastYear;
        let targetProject, tempProposal;
        let tempObj;
        let yearSums, yearSums_key;
        let totalSums;
        let basicTarget, premiumTarget;
        let mapFunction;
        let target;

        resultObj = {};

        //proposal
        if (proposal.length === 0) {

          resultObj.proposal = new TimeArray();
          resultObj.proposal.setWidth(proposalConst.width);
          resultObj.proposal.setColumns(proposalConst.columns);

        } else {

          proposal.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
          proposalFirst = proposal[proposal.length - 1].date;

          first = proposalFirst;
          timeValue0 = (today.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]) + today.getFullYear();
          timeValue1 = (first.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]) + first.getFullYear();
          timeCaseBoo = (0 <= timeValue0 - timeValue1 && timeValue0 - timeValue1 < 10000);
          timeLength = timeCaseBoo ? (((timeValue0 - timeValue1) * 2) + 1) : ((Math.abs(timeHalfToken[0] - Math.abs(timeValue0 - timeValue1)) * 2) + (timeValue0 >= timeHalfToken[1] ? 2 : 0));
          timeHalfFirst = timeValue0 >= timeHalfToken[1] ? 1 : 0;

          timeArr = new TimeArray();
          for (let i = 0; i < timeLength; i++) {
            thisYear = today.getFullYear() - Math.ceil(i / 2);
            thisHalf = i % 2 === 0 ? timeHalfFirst : 1 - timeHalfFirst;
            if (thisHalf === 0) {
              tempDate0 = new Date(thisYear, 0, 1);
              tempDate1 = new Date(thisYear, 6, 1);
            } else {
              tempDate0 = new Date(thisYear, 6, 1);
              tempDate1 = new Date(thisYear + 1, 0, 1);
            }
            tempTong = [];
            for (let p of proposal) {
              if (p.date.valueOf() >= tempDate0.valueOf() && p.date.valueOf() < tempDate1.valueOf()) {
                tempTong.push(p);
              }
            }

            timeArr.push({
              key: ((thisHalf === 0 ? timeHalfToken[0] : timeHalfToken[1]) + thisYear),
              year: thisYear,
              half: thisHalf,
              name: String(thisYear).slice(2) + "년 " + timeHalfArr[thisHalf] + timeHalfConst,
              values: tempTong,
              matrix: [],
              result: {},
            });

          }
          resultObj.proposal = timeArr;

          totalOrder = 1;
          yearOrders = {};
          yearSums = {};
          totalSums = {
            proposal: 0,
            pyeongEa: 0,
            pyeongLength: 0,
          };
          resultObj.proposal.setWidth(proposalConst.width);
          resultObj.proposal.setColumns(proposalConst.columns);
          for (let i = 0; i < resultObj.proposal.length; i++) {
            order = resultObj.proposal[i].values.length;
            if (yearOrders['y' + String(resultObj.proposal[i].year)] === undefined) {
              yearOrders['y' + String(resultObj.proposal[i].year)] = 1;
            }
            if (yearSums['y' + String(resultObj.proposal[i].year)] === undefined) {
              yearSums['y' + String(resultObj.proposal[i].year)] = {
                proposal: 0,
                pyeongEa: 0,
                pyeongLength: 0,
              };
            }

            resultObj.proposal[i].result.order = 0;
            resultObj.proposal[i].result.proposal = 0;
            resultObj.proposal[i].result.pyeongEa = 0;
            resultObj.proposal[i].result.pyeongLength = 0;

            for (let obj of resultObj.proposal[i].values) {
              tempArr = [];
              tempArr.push(order);
              tempArr.push(order);
              tempArr.push(order);
              tempArr.push(obj.client.name);
              tempArr.push(obj.service.name);
              tempArr.push(dateToString(obj.date));
              tempArr.push(autoComma(obj.detail.amount) + '원');
              tempArr.push(String(obj.client.pyeong) + '평');
              if (obj.client.pyeong === 0) {
                alert("평수 에러 : " + obj.client.name + " 고객님의 평수가 0평으로 되어 있습니다! 바르게 고쳐 주세요!");
                window.location.href = window.location.protocol + "//" + window.location.host + "/client?cliid=" + obj.client.cliid;
              }
              tempArr.push(autoComma(Math.round((obj.detail.amount / obj.client.pyeong) / 1000) * 1000) + '원');
              tempArr.push(obj.detail.method);
              tempArr.push(obj.detail.partial ? 'O' : 'X');
              boo = false;
              for (let obj2 of this.contract) {
                if (obj.proid === obj2.project.proid) {
                  boo = true;
                }
              }
              tempArr.push(boo ? 'O' : 'X');
              resultObj.proposal[i].matrix.push(tempArr);
              order = order - 1;
              totalOrder = totalOrder + 1;
              yearOrders['y' + String(resultObj.proposal[i].year)] = yearOrders['y' + String(resultObj.proposal[i].year)] + 1;

              resultObj.proposal[i].result.order += 1;
              resultObj.proposal[i].result.proposal += obj.detail.amount;
              totalSums.proposal += obj.detail.amount;
              yearSums['y' + String(resultObj.proposal[i].year)].proposal += obj.detail.amount;
              if (!obj.detail.partial) {
                resultObj.proposal[i].result.pyeongEa += Math.round((obj.detail.amount / obj.client.pyeong) / 1000) * 1000;
                resultObj.proposal[i].result.pyeongLength += 1;
                totalSums.pyeongEa += Math.round((obj.detail.amount / obj.client.pyeong) / 1000) * 1000;
                totalSums.pyeongLength += 1;
                yearSums['y' + String(resultObj.proposal[i].year)].pyeongEa += Math.round((obj.detail.amount / obj.client.pyeong) / 1000) * 1000;
                yearSums['y' + String(resultObj.proposal[i].year)].pyeongLength += 1;
              }

            }
          }

          totalSums.order = totalOrder - 1;
          if (totalSums.pyeongLength !== 0) {
            totalSums.pyeongEaAverage = Math.round((totalSums.pyeongEa / totalSums.pyeongLength) / 1000) * 1000;
          } else {
            totalSums.pyeongEaAverage = 0;
          }
          for (let i in yearSums) {
            yearSums[i].order = yearOrders[i] - 1;
            if (yearSums[i].pyeongLength !== 0) {
              yearSums[i].pyeongEaAverage = Math.round((yearSums[i].pyeongEa / yearSums[i].pyeongLength) / 1000) * 1000;
            } else {
              yearSums[i].pyeongEaAverage = 0;
            }
          }

          order = 1;
          yearOrder = 1;
          pastYear = null;
          for (let i = 0; i < resultObj.proposal.length; i++) {
            if (pastYear !== null) {
              if (resultObj.proposal[i].year !== pastYear) {
                yearOrder = 1;
              }
            }

            if (resultObj.proposal[i].result.pyeongLength !== 0) {
              resultObj.proposal[i].result.pyeongEaAverage = Math.round((resultObj.proposal[i].result.pyeongEa / resultObj.proposal[i].result.pyeongLength) / 1000) * 1000;
            } else {
              resultObj.proposal[i].result.pyeongEaAverage = 0;
            }

            resultObj.proposal[i].result.total = {};
            resultObj.proposal[i].result.total.order = totalOrder - 1;
            resultObj.proposal[i].result.total.proposal = totalSums.proposal;
            resultObj.proposal[i].result.total.pyeongEa = totalSums.pyeongEa;
            resultObj.proposal[i].result.total.pyeongLength = totalSums.pyeongLength;
            resultObj.proposal[i].result.total.pyeongEaAverage = totalSums.pyeongEaAverage;

            resultObj.proposal[i].result.year = {};
            resultObj.proposal[i].result.year.order = yearOrders['y' + String(resultObj.proposal[i].year)] - 1;
            resultObj.proposal[i].result.year.proposal = yearSums['y' + String(resultObj.proposal[i].year)].proposal;
            resultObj.proposal[i].result.year.pyeongEa = yearSums['y' + String(resultObj.proposal[i].year)].pyeongEa;
            resultObj.proposal[i].result.year.pyeongLength = yearSums['y' + String(resultObj.proposal[i].year)].pyeongLength;
            resultObj.proposal[i].result.year.pyeongEaAverage = yearSums['y' + String(resultObj.proposal[i].year)].pyeongEaAverage;

            for (let arr of resultObj.proposal[i].matrix) {
              arr[0] = totalOrder - order;
              arr[1] = yearOrders['y' + String(resultObj.proposal[i].year)] - yearOrder;
              order = order + 1;
              yearOrder = yearOrder + 1;
            }
            pastYear = resultObj.proposal[i].year;
          }

          resultObj.proposal.setProperty("result", {});
          resultObj.proposal.result.words = [];
          resultObj.proposal.result.year = {};
          resultObj.proposal.result.total = {};
          resultObj.proposal.result.year.words = [];
          resultObj.proposal.result.total.words = [];
          for (let i = 0; i < resultObj.proposal.length; i++) {
            if (resultObj.proposal[i].values.length > 0) {
              tempObj = {};
              tempObj.name = resultObj.proposal[i].name;
              tempObj.values = [];
              tempObj.values.push({ name: "건수", value: String(resultObj.proposal[i].result.order) + "건", width: [ 50, 80 ] });
              tempObj.values.push({ name: "제안 총 금액", value: autoComma(resultObj.proposal[i].result.proposal) + "원", width: [ 98, 145 ] });
              tempObj.values.push({ name: "평단가 평균", value: autoComma(resultObj.proposal[i].result.pyeongEaAverage) + "원", width: [ 94, 120 ] });
              resultObj.proposal.result.words.push(tempObj);
            }
          }

          yearSums_key = Object.keys(yearSums);
          yearSums_key.sort((a, b) => { return Number(b.replace(/[^0-9]/g, '')) - Number(a.replace(/[^0-9]/g, '')); });
          for (let year of yearSums_key) {
            tempObj = {};
            tempObj.name = String(year.replace(/[^0-9]/g, '')) + "년 합계";
            tempObj.values = [];
            tempObj.values.push({ name: "건수", value: String(yearSums[year].order) + "건", width: [ 50, 80 ] });
            tempObj.values.push({ name: "제안 총 금액", value: autoComma(yearSums[year].proposal) + "원", width: [ 98, 145 ] });
            tempObj.values.push({ name: "평단가 평균", value: autoComma(yearSums[year].pyeongEaAverage) + "원", width: [ 94, 120 ] });
            resultObj.proposal.result.year.words.push(tempObj);
          }

          tempObj = {};
          tempObj.name = "총 합계";
          tempObj.values = [];
          tempObj.values.push({ name: "건수", value: String(totalSums.order) + "건", width: [ 50, 80 ] });
          tempObj.values.push({ name: "제안 총 금액", value: autoComma(totalSums.proposal) + "원", width: [ 98, 145 ] });
          tempObj.values.push({ name: "평단가 평균", value: autoComma(totalSums.pyeongEaAverage) + "원", width: [ 94, 120 ] });
          resultObj.proposal.result.total.words.push(tempObj);

        }

        //contract
        if (contract.length === 0) {

          resultObj.contract = new TimeArray();
          resultObj.contract.setWidth(contractConst.width);
          resultObj.contract.setColumns(contractConst.columns);

        } else {

          contract.sort((a, b) => { return b.project.start.valueOf() - a.project.start.valueOf(); });
          contactFirst = contract[contract.length - 1].project.start;

          first = contactFirst;
          timeValue0 = (today.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]) + today.getFullYear();
          timeValue1 = (first.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]) + first.getFullYear();
          timeCaseBoo = (0 <= timeValue0 - timeValue1 && timeValue0 - timeValue1 < 10000);
          timeLength = timeCaseBoo ? (((timeValue0 - timeValue1) * 2) + 1) : ((Math.abs(timeHalfToken[0] - Math.abs(timeValue0 - timeValue1)) * 2) + (timeValue0 >= timeHalfToken[1] ? 2 : 0));
          timeHalfFirst = timeValue0 >= timeHalfToken[1] ? 1 : 0;

          timeArr = new TimeArray();
          for (let i = 0; i < timeLength; i++) {
            thisYear = today.getFullYear() - Math.ceil(i / 2);
            thisHalf = i % 2 === 0 ? timeHalfFirst : 1 - timeHalfFirst;
            if (thisHalf === 0) {
              tempDate0 = new Date(thisYear, 0, 1);
              tempDate1 = new Date(thisYear, 6, 1);
            } else {
              tempDate0 = new Date(thisYear, 6, 1);
              tempDate1 = new Date(thisYear + 1, 0, 1);
            }
            tempTong = [];
            for (let c of contract) {
              if (c.project.start.valueOf() >= tempDate0.valueOf() && c.project.start.valueOf() < tempDate1.valueOf()) {
                tempTong.push(c);
              }
            }

            timeArr.push({
              key: ((thisHalf === 0 ? timeHalfToken[0] : timeHalfToken[1]) + thisYear),
              year: thisYear,
              half: thisHalf,
              name: String(thisYear).slice(2) + "년 " + timeHalfArr[thisHalf] + timeHalfConst,
              values: tempTong,
              matrix: [],
              result: {},
            });

          }
          resultObj.contract = timeArr;

          totalOrder = 1;
          yearOrders = {};
          yearSums = {};
          totalSums = {
            contract: 0,
            first: 0,
            remain: 0,
            proposal: 0,
            pyeongEa: 0,
            pyeongLength: 0,
          };
          resultObj.contract.setWidth(contractConst.width);
          resultObj.contract.setColumns(contractConst.columns);
          for (let i = 0; i < resultObj.contract.length; i++) {
            order = resultObj.contract[i].values.length;
            if (yearOrders['y' + String(resultObj.contract[i].year)] === undefined) {
              yearOrders['y' + String(resultObj.contract[i].year)] = 1;
            }
            if (yearSums['y' + String(resultObj.contract[i].year)] === undefined) {
              yearSums['y' + String(resultObj.contract[i].year)] = {
                contract: 0,
                first: 0,
                remain: 0,
                proposal: 0,
                pyeongEa: 0,
                pyeongLength: 0,
              };
            }

            resultObj.contract[i].result.order = 0;
            resultObj.contract[i].result.contract = 0;
            resultObj.contract[i].result.first = 0;
            resultObj.contract[i].result.remain = 0;
            resultObj.contract[i].result.proposal = 0;
            resultObj.contract[i].result.pyeongEa = 0;
            resultObj.contract[i].result.pyeongLength = 0;

            for (let obj of resultObj.contract[i].values) {

              tempProposal = null;
              for (let obj2 of this.proposal) {
                if (obj2.proid === obj.project.proid) {
                  tempProposal = obj2;
                }
              }
              if (tempProposal === null) {
                for (let project of this.projects) {
                  if (obj.project.proid === project.proid) {
                    targetProject = project;
                  }
                }
                tempProposal = {
                  detail: {
                    method: targetProject.proposal.detail[0].fee[0].method,
                    partial: targetProject.proposal.detail[0].fee[0].partial,
                    amount: 0
                  }
                };
              }

              tempArr = [];
              tempArr.push(order);
              tempArr.push(order);
              tempArr.push(order);
              tempArr.push(obj.client.name);
              tempArr.push(obj.service.name);
              tempArr.push(dateToString(obj.project.start));
              tempArr.push(dateToString(obj.project.end));
              tempArr.push(tempProposal.detail.method);
              tempArr.push(tempProposal.detail.partial ? 'O' : 'X');
              tempArr.push(autoComma(obj.payments.amount) + '원');
              tempArr.push(String(obj.payments.percentage) + '%');
              tempArr.push(autoComma(tempProposal.detail.amount) + '원');
              tempArr.push(String(obj.client.pyeong) + '평');
              if (obj.client.pyeong === 0) {
                alert("평수 에러 : " + obj.client.name + " 고객님의 평수가 0평으로 되어 있습니다! 바르게 고쳐 주세요!");
                window.location.href = window.location.protocol + "//" + window.location.host + "/client?cliid=" + obj.client.cliid;
              }
              tempArr.push(autoComma(Math.round((tempProposal.detail.amount / obj.client.pyeong) / 1000) * 1000) + '원');
              tempArr.push(/없음/gi.test(dateToString(obj.payments.first)) ? "예정" : dateToString(obj.payments.first));
              tempArr.push(/없음/gi.test(dateToString(obj.payments.remain)) ? "예정" : dateToString(obj.payments.remain));
              resultObj.contract[i].matrix.push(tempArr);
              order = order - 1;
              totalOrder = totalOrder + 1;
              yearOrders['y' + String(resultObj.contract[i].year)] = yearOrders['y' + String(resultObj.contract[i].year)] + 1;

              resultObj.contract[i].result.order += 1;
              resultObj.contract[i].result.contract += obj.payments.amount;
              totalSums.contract += obj.payments.amount;
              yearSums['y' + String(resultObj.contract[i].year)].contract += obj.payments.amount;

              if ((new Date(2000, 0, 1)).valueOf() <= obj.payments.first.valueOf() && (new Date(3000, 0, 1)).valueOf() >= obj.payments.first.valueOf()) {
                resultObj.contract[i].result.first += Math.round(obj.payments.amount / 2);
                totalSums.first += Math.round(obj.payments.amount / 2);
                yearSums['y' + String(resultObj.contract[i].year)].first += Math.round(obj.payments.amount / 2);
              }
              if ((new Date(2000, 0, 1)).valueOf() <= obj.payments.remain.valueOf() && (new Date(3000, 0, 1)).valueOf() >= obj.payments.remain.valueOf()) {
                resultObj.contract[i].result.remain += Math.round(obj.payments.amount / 2);
                totalSums.remain += Math.round(obj.payments.amount / 2);
                yearSums['y' + String(resultObj.contract[i].year)].remain += Math.round(obj.payments.amount / 2);
              }
              resultObj.contract[i].result.proposal += tempProposal.detail.amount;
              totalSums.proposal += tempProposal.detail.amount;
              yearSums['y' + String(resultObj.contract[i].year)].proposal += tempProposal.detail.amount;

              if (!tempProposal.detail.partial && (tempProposal.detail.amount !== 0)) {
                resultObj.contract[i].result.pyeongEa += Math.round((tempProposal.detail.amount / obj.client.pyeong) / 1000) * 1000;
                resultObj.contract[i].result.pyeongLength += 1;
                totalSums.pyeongEa += Math.round((tempProposal.detail.amount / obj.client.pyeong) / 1000) * 1000;
                totalSums.pyeongLength += 1;
                yearSums['y' + String(resultObj.contract[i].year)].pyeongEa += Math.round((tempProposal.detail.amount / obj.client.pyeong) / 1000) * 1000;
                yearSums['y' + String(resultObj.contract[i].year)].pyeongLength += 1;
              }

            }
          }

          totalSums.order = totalOrder - 1;
          if (totalSums.pyeongLength !== 0) {
            totalSums.pyeongEaAverage = Math.round((totalSums.pyeongEa / totalSums.pyeongLength) / 1000) * 1000;
          } else {
            totalSums.pyeongEaAverage = 0;
          }
          for (let i in yearSums) {
            yearSums[i].order = yearOrders[i] - 1;
            if (yearSums[i].pyeongLength !== 0) {
              yearSums[i].pyeongEaAverage = Math.round((yearSums[i].pyeongEa / yearSums[i].pyeongLength) / 1000) * 1000;
            } else {
              yearSums[i].pyeongEaAverage = 0;
            }
          }

          order = 1;
          yearOrder = 1;
          pastYear = null;
          for (let i = 0; i < resultObj.contract.length; i++) {
            if (pastYear !== null) {
              if (resultObj.contract[i].year !== pastYear) {
                yearOrder = 1;
              }
            }
            if (resultObj.contract[i].result.pyeongLength !== 0) {
              resultObj.contract[i].result.pyeongEaAverage = Math.round((resultObj.contract[i].result.pyeongEa / resultObj.contract[i].result.pyeongLength) / 1000) * 1000;
            } else {
              resultObj.contract[i].result.pyeongEaAverage = 0;
            }

            resultObj.contract[i].result.total = {};
            resultObj.contract[i].result.total.order = totalOrder - 1;
            resultObj.contract[i].result.total.contract = totalSums.contract;
            resultObj.contract[i].result.total.first = totalSums.first;
            resultObj.contract[i].result.total.remain = totalSums.remain;
            resultObj.contract[i].result.total.proposal = totalSums.proposal;
            resultObj.contract[i].result.total.pyeongEa = totalSums.pyeongEa;
            resultObj.contract[i].result.total.pyeongLength = totalSums.pyeongLength;
            resultObj.contract[i].result.total.pyeongEaAverage = totalSums.pyeongEaAverage;

            resultObj.contract[i].result.year = {};
            resultObj.contract[i].result.year.order = yearOrders['y' + String(resultObj.contract[i].year)] - 1;
            resultObj.contract[i].result.year.contract = yearSums['y' + String(resultObj.contract[i].year)].contract;
            resultObj.contract[i].result.year.first = yearSums['y' + String(resultObj.contract[i].year)].first;
            resultObj.contract[i].result.year.remain = yearSums['y' + String(resultObj.contract[i].year)].remain;
            resultObj.contract[i].result.year.proposal = yearSums['y' + String(resultObj.contract[i].year)].proposal;
            resultObj.contract[i].result.year.pyeongEa = yearSums['y' + String(resultObj.contract[i].year)].pyeongEa;
            resultObj.contract[i].result.year.pyeongLength = yearSums['y' + String(resultObj.contract[i].year)].pyeongLength;
            resultObj.contract[i].result.year.pyeongEaAverage = yearSums['y' + String(resultObj.contract[i].year)].pyeongEaAverage;

            for (let arr of resultObj.contract[i].matrix) {
              arr[0] = totalOrder - order;
              arr[1] = yearOrders['y' + String(resultObj.contract[i].year)] - yearOrder;
              order = order + 1;
              yearOrder = yearOrder + 1;
            }
            pastYear = resultObj.contract[i].year;
          }

          resultObj.contract.setProperty("result", {});
          resultObj.contract.result.words = [];
          resultObj.contract.result.year = {};
          resultObj.contract.result.total = {};
          resultObj.contract.result.year.words = [];
          resultObj.contract.result.total.words = [];
          for (let i = 0; i < resultObj.contract.length; i++) {
            if (resultObj.contract[i].values.length > 0) {
              tempObj = {};
              tempObj.name = resultObj.contract[i].name;
              tempObj.values = [];
              tempObj.values.push({ name: "건수", value: String(resultObj.contract[i].result.order) + "건", width: [ 50, 80 ] });
              tempObj.values.push({ name: "계약 총 금액", value: autoComma(resultObj.contract[i].result.contract) + "원", width: [ 98, 145 ] });
              tempObj.values.push({ name: "선금 정산액", value: autoComma(resultObj.contract[i].result.first) + "원", width: [ 94, 140 ] });
              tempObj.values.push({ name: "잔금 정산액", value: autoComma(resultObj.contract[i].result.remain) + "원", width: [ 94, 140 ] });
              tempObj.values.push({ name: "제안 총 금액", value: autoComma(resultObj.contract[i].result.proposal) + "원", width: [ 98, 145 ] });
              tempObj.values.push({ name: "평단가 평균", value: autoComma(resultObj.contract[i].result.pyeongEaAverage) + "원", width: [ 94, 140 ] });
              resultObj.contract.result.words.push(tempObj);
            }
          }

          yearSums_key = Object.keys(yearSums);
          yearSums_key.sort((a, b) => { return Number(b.replace(/[^0-9]/g, '')) - Number(a.replace(/[^0-9]/g, '')); });
          for (let year of yearSums_key) {
            tempObj = {};
            tempObj.name = String(year.replace(/[^0-9]/g, '')) + "년 합계";
            tempObj.values = [];
            tempObj.values.push({ name: "건수", value: String(yearSums[year].order) + "건", width: [ 50, 80 ] });
            tempObj.values.push({ name: "계약 총 금액", value: autoComma(yearSums[year].contract) + "원", width: [ 98, 145 ] });
            tempObj.values.push({ name: "선금 정산액", value: autoComma(yearSums[year].first) + "원", width: [ 94, 140 ] });
            tempObj.values.push({ name: "잔금 정산액", value: autoComma(yearSums[year].remain) + "원", width: [ 94, 140 ] });
            tempObj.values.push({ name: "제안 총 금액", value: autoComma(yearSums[year].proposal) + "원", width: [ 98, 145 ] });
            tempObj.values.push({ name: "평단가 평균", value: autoComma(yearSums[year].pyeongEaAverage) + "원", width: [ 94, 140 ] });
            resultObj.contract.result.year.words.push(tempObj);
          }

          tempObj = {};
          tempObj.name = "총 합계";
          tempObj.values = [];
          tempObj.values.push({ name: "건수", value: String(totalSums.order) + "건", width: [ 50, 80 ] });
          tempObj.values.push({ name: "계약 총 금액", value: autoComma(totalSums.contract) + "원", width: [ 98, 145 ] });
          tempObj.values.push({ name: "선금 정산액", value: autoComma(totalSums.first) + "원", width: [ 94, 140 ] });
          tempObj.values.push({ name: "잔금 정산액", value: autoComma(totalSums.remain) + "원", width: [ 94, 140 ] });
          tempObj.values.push({ name: "제안 총 금액", value: autoComma(totalSums.proposal) + "원", width: [ 98, 145 ] });
          tempObj.values.push({ name: "평단가 평균", value: autoComma(totalSums.pyeongEaAverage) + "원", width: [ 94, 140 ] });
          resultObj.contract.result.total.words.push(tempObj);

        }

        //contents
        if (contents.length === 0) {

          resultObj.contents = new TimeArray();
          resultObj.contents.setWidth(contentsConst.width);
          resultObj.contents.setColumns(contentsConst.columns);

        } else {

          contents.sort((a, b) => { return b.contents.portfolio.date.valueOf() - a.contents.portfolio.date.valueOf(); });
          first = contents[contents.length - 1].contents.portfolio.date;
          timeValue0 = (today.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]) + today.getFullYear();
          timeValue1 = (first.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]) + first.getFullYear();
          timeCaseBoo = (0 <= timeValue0 - timeValue1 && timeValue0 - timeValue1 < 10000);
          timeLength = timeCaseBoo ? (((timeValue0 - timeValue1) * 2) + 1) : ((Math.abs(timeHalfToken[0] - Math.abs(timeValue0 - timeValue1)) * 2) + (timeValue0 >= timeHalfToken[1] ? 2 : 0));
          timeHalfFirst = timeValue0 >= timeHalfToken[1] ? 1 : 0;

          timeArr = new TimeArray();
          for (let i = 0; i < timeLength; i++) {
            thisYear = today.getFullYear() - Math.ceil(i / 2);
            thisHalf = i % 2 === 0 ? timeHalfFirst : 1 - timeHalfFirst;
            if (thisHalf === 0) {
              tempDate0 = new Date(thisYear, 0, 1);
              tempDate1 = new Date(thisYear, 6, 1);
            } else {
              tempDate0 = new Date(thisYear, 6, 1);
              tempDate1 = new Date(thisYear + 1, 0, 1);
            }
            tempTong = [];
            for (let p of contents) {
              if (p.contents.portfolio.date.valueOf() >= tempDate0.valueOf() && p.contents.portfolio.date.valueOf() < tempDate1.valueOf()) {
                tempTong.push(p);
              }
            }

            timeArr.push({
              key: ((thisHalf === 0 ? timeHalfToken[0] : timeHalfToken[1]) + thisYear),
              year: thisYear,
              half: thisHalf,
              name: String(thisYear).slice(2) + "년 " + timeHalfArr[thisHalf] + timeHalfConst,
              values: tempTong,
              matrix: [],
              result: {},
            });

          }
          resultObj.contents = timeArr;

          totalOrder = 1;
          yearOrders = {};

          resultObj.contents.setWidth(contentsConst.width);
          resultObj.contents.setColumns(contentsConst.columns);
          for (let i = 0; i < resultObj.contents.length; i++) {
            order = resultObj.contents[i].values.length;
            if (yearOrders['y' + String(resultObj.contents[i].year)] === undefined) {
              yearOrders['y' + String(resultObj.contents[i].year)] = 1;
            }

            for (let obj of resultObj.contents[i].values) {
              tempArr = [];
              tempArr.push(order);
              tempArr.push(order);
              tempArr.push(order);
              tempArr.push(obj.proid === "" ? "개인" : "HL");
              tempArr.push(obj.name === undefined ? "개인" : obj.name);
              tempArr.push(obj.contents.portfolio.pid);
              tempArr.push(dateToString(obj.contents.portfolio.date));
              tempArr.push(dateToString(obj.contents.review.date));
              tempArr.push(homepage + portfolioPath + "?qqq=" + obj.contents.portfolio.pid);
              tempArr.push(/999/g.test(obj.contents.review.rid) ? "-" : homepage + reviewPath + "?qqq=" + obj.contents.review.rid);
              resultObj.contents[i].matrix.push(tempArr);
              order = order - 1;
              totalOrder = totalOrder + 1;
              yearOrders['y' + String(resultObj.contents[i].year)] = yearOrders['y' + String(resultObj.contents[i].year)] + 1;
            }
          }

          order = 1;
          yearOrder = 1;
          pastYear = null;
          for (let i = 0; i < resultObj.contents.length; i++) {
            if (pastYear !== null) {
              if (resultObj.contents[i].year !== pastYear) {
                yearOrder = 1;
              }
            }
            for (let arr of resultObj.contents[i].matrix) {
              arr[0] = totalOrder - order;
              arr[1] = yearOrders['y' + String(resultObj.contents[i].year)] - yearOrder;
              order = order + 1;
              yearOrder = yearOrder + 1;
            }
            pastYear = resultObj.contents[i].year;
          }

        }

        //price
        resultObj.price = new TimeArray();
        resultObj.price.setWidth(priceConst.width);
        resultObj.price.setColumns(priceConst.columns);

        basicTarget = Object.keys(price.detail.basic);
        premiumTarget = Object.keys(price.detail.premium);
        mapFunction = (str) => {
          for (let { column, name } of service) {
            if (column === str) {
              return { column, name };
            }
          }
        }
        basicTarget = basicTarget.map(mapFunction);
        premiumTarget = premiumTarget.map(mapFunction);

        for (let i = 0; i < basicTarget.length; i++) {
          tempArr = [];
          if (i === 0) {
            tempArr.push(String(price.alpha) + '%');
          } else {
            tempArr.push('');
          }
          tempArr.push(basicTarget[i].name + ' B');
          target = price.detail.basic[basicTarget[i].column];
          for (let j = 0; j < target.length; j++) {
            tempArr.push(autoComma(target[j] * 10000) + '원');
          }
          resultObj.price.push(tempArr);
        }
        for (let i = 0; i < premiumTarget.length; i++) {
          tempArr = [];
          tempArr.push('');
          tempArr.push(premiumTarget[i].name + ' P');
          target = price.detail.premium[premiumTarget[i].column];
          for (let j = 0; j < target.length; j++) {
            tempArr.push(autoComma(target[j] * 10000) + '원');
          }
          resultObj.price.push(tempArr);
        }

        tempArr = [];
        tempArr.push('');
        tempArr.push("수수료");
        for (let num of this.fee) {
          tempArr.push(String(Math.round(num)) + '%');
        }
        resultObj.price.push(tempArr);

        return resultObj;
      }
    }
    let projects, clients;
    let cliidArr, cliidArr_raw;
    let desidArr, desidArr_raw;
    let proposalArr;
    let whereQuery;
    let price, standard;
    let allProjects, allDesigners;
    let entireTong;
    let proposals, contract;
    let desid;
    let alpha, alphaPercentage;
    let homeliaison;
    let key0, key1;
    let matrix;
    let newcomer;
    let premium;
    let fee;
    let possible;
    let targetService;
    let targetServicePremium;
    let serviceTong;
    let tong;
    let requests;
    let boo;
    let contentsArr, contents;

    allDesigners = this.designers;

    // desidArr_raw = [];
    // for (let designer of this.designers) {
    //   desidArr_raw.push(designer.desid);
    // }
    // desidArr_raw = Array.from(new Set(desidArr_raw));
    // desidArr = [];
    // proposalArr = [];
    // for (let desid of desidArr_raw) {
    //   desidArr.push({ desid });
    //   proposalArr.push({ "proposal.detail": { $elemMatch: { desid } } });
    // }

    whereQuery = {};
    // whereQuery["$or"] = desidArr.concat(proposalArr);
    allProjects = await ajaxJson({ noFlat: true, whereQuery }, "/getProjects", { equal: true });
    cliidArr_raw = [];
    for (let project of allProjects) {
      cliidArr_raw.push(project.cliid);
    }
    cliidArr_raw = Array.from(new Set(cliidArr_raw));
    cliidArr = [];
    for (let cliid of cliidArr_raw) {
      cliidArr.push({ cliid });
    }

    whereQuery = {};
    whereQuery["$or"] = cliidArr;
    clients = await ajaxJson({ noFlat: true, whereQuery }, "/getClients", { equal: true });
    for (let project of allProjects) {
      for (let client of clients) {
        if (project.cliid === client.cliid) {
          project.name = client.name;
          requests = client.requests;
          boo = false;
          for (let { request } of requests) {
            if (request.timeline.valueOf() <= project.proposal.date.valueOf()) {
              boo = true;
              project.pyeong = request.space.pyeong;
            }
          }
          if (!boo) {
            project.pyeong = requests[0].request.space.pyeong;
          }
        }
      }
    }

    price = await ajaxJson({
      mode: "read",
      db: "console",
      collection: "designerPrice",
      whereQuery: {},
    }, "/generalMongo", { equal: true });
    for (let obj of price) {
      if (obj.key === 33) {
        standard = obj;
        break;
      }
    }

    whereQuery = {};
    contentsArr = await ajaxJson({ noFlat: true, whereQuery }, "/getContents", { equal: true });
    for (let c of contentsArr) {
      for (let client of clients) {
        if (c.cliid === client.cliid) {
          c.name = client.name;
        }
      }
    }

    tong = [];
    for (let designer of allDesigners) {
      desid = designer.desid;
      entireTong = new DesignerReport(allProjects, price);
      entireTong.desid = desid;
      entireTong.designer = designer;
      projects = [];
      for (let project of allProjects) {
        if (project.desid === desid) {
          projects.push(project);
        }
      }

      proposals = [];
      for (let project of allProjects) {
        for (let obj of project.proposal.detail) {
          if (desid === obj.desid) {
            serviceName = "";
            for (let { serid, name, id } of service) {
              if (serid === project.service.serid) {
                serviceName += id;
              }
            }
            serviceName += project.service.xValue;
            proposals.push({
              proid: project.proid,
              date: project.proposal.date,
              service: {
                name: serviceName,
                serid: project.service.serid,
                xValue: project.service.xValue
              },
              client: {
                name: project.name,
                cliid: project.cliid,
                pyeong: project.pyeong
              },
              detail: {
                amount: obj.fee[0].amount,
                method: obj.fee[0].method,
                partial: obj.fee[0].partial,
              }
            });
          }
        }
      }

      contract = [];
      for (let project of projects) {
        serviceName = "";
        for (let { serid, name, id } of service) {
          if (serid === project.service.serid) {
            serviceName += id;
          }
        }
        serviceName += project.service.xValue;
        contract.push({
          client: {
            name: project.name,
            cliid: project.cliid,
            pyeong: project.pyeong
          },
          service: {
            name: serviceName,
            serid: project.service.serid,
            xValue: project.service.xValue
          },
          project: {
            proid: project.proid,
            start: (project.process.contract.meeting.date.valueOf() < emptyDateValue ? project.proposal.date : project.process.contract.meeting.date),
            end: (project.process.contract.form.date.to.valueOf() < emptyDateValue ? ((project.process.calculation.payments.remain.date.valueOf() < emptyDateValue) ? (project.contents.photo.date.valueOf() < emptyDateValue ? (new Date(3800, 0, 1)) : project.contents.photo.date) : project.process.calculation.payments.remain.date) : project.process.contract.form.date.to),
          },
          payments: {
            percentage: project.process.calculation.percentage,
            amount: project.process.calculation.payments.totalAmount,
            first: project.process.calculation.payments.first.date,
            remain: project.process.calculation.payments.remain.date,
          }
        });
      }

      entireTong.proposal = proposals;
      entireTong.contract = contract;

      alpha = 0;
      alpha += ((new Date(designer.information.business.career.startY, designer.information.business.career.startM - 1, 1)).valueOf() <= yearsAgo.valueOf()) ? 2 : 0;
      alpha += (designer.analytics.project.paperWork.length >= 4) ? 2 : 0;
      alpha += designer.analytics.purchase.agencies ? (1 / 3) : 0
      alpha += designer.analytics.purchase.setting.install ? (1 / 3) : 0
      alpha += designer.analytics.purchase.setting.storage ? (1 / 3) : 0

      homeliaison = 0;
      for (let { value } of designer.analytics.etc.personality) {
        if (value) {
          homeliaison = homeliaison + 1;
        }
      }
      homeliaison += 2 - relationItems.indexOf(designer.analytics.etc.relation);

      alpha += (homeliaison * (2 / 7));
      alphaPercentage = (alpha / 100) + 1;
      alpha = (Math.floor(alpha * 100) / 100);

      key0 = designer.analytics.construct.level;
      key1 = designer.analytics.styling.level;

      row = null;
      for (let obj of price) {
        if (obj.key === ((key0 * 10) + key1)) {
          row = obj;
        }
      }
      if (row === null) {
        throw new Error("invaild key");
      }
      matrix = reverseMatrix(row.matrix);

      newcomer = standard.newcomer;
      premium = standard.premium;
      fee = standard.fee;
      possible = designer.analytics.project.matrix;

      targetService = [];
      targetServicePremium = [];
      for (let i = 0; i < possible.length; i++) {
        if (possible[i][1] === 1) {
          targetService.push(i);
        }
        if (possible[i][2] === 1) {
          targetServicePremium.push(i);
        }
      }

      serviceTong = {
         basic: {},
         premium: {}
      };
      for (let index of targetService) {
        serviceTong.basic[service[index].column] = matrix[index].map((amount) => { return Math.round(amount * alphaPercentage) });
      }
      for (let index of targetServicePremium) {
        serviceTong.premium[service[index].column] = matrix[index].map((amount) => { return Math.round(amount * premium * alphaPercentage) });
      }
      fee = fee.map((num) => { return designer.information.business.service.cost.percentage * (num / 30) });

      entireTong.price = {};
      entireTong.price.alpha = alpha;
      entireTong.price.detail = serviceTong;
      entireTong.fee = fee;

      contents = [];
      for (let c of contentsArr) {
        if (c.desid === designer.desid) {
          contents.push(c);
        }
      }
      entireTong.contents = contents;

      tong.push(entireTong);
    }

    this.reports = new DesignerReports(tong, allProjects, price);

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.reportView = async function () {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    this.backGrayBar();
    await this.spreadData(null, true);
    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight } = this;
    const standardBar = totalMother.firstChild;
    const designers = await ajaxJson({ noFlat: true }, "/getDesigners", { equal: true });
    const length = designers.length;
    const getObj = returnGet();
    let boxTong;
    let nodeArr;
    let tempObj;
    let minWidth;
    let margin;
    let width, height;
    let boxNumber;
    let status;
    let searchInput;
    let standardBar_mother;
    let style;
    let childrenLength, children;
    let motherHeight;

    this.designers = new Designers(designers);
    this.desid = (getObj.desid !== undefined) ? getObj.desid : this.standardDoms[1].getAttribute("desid");

    await this.reportDataRendering();

    minWidth = 210;
    margin = 8;
    motherHeight = 154;

    //search event
    if (this.searchInput !== undefined && this.searchInput !== null) {
      searchInput = this.searchInput;
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          const value = this.value.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '').replace(/[\~\@\#\$\%\^\&\*\(\)\-\=\+\[\]\{\}\<\>\/\\ \n\t]/gi, '');
          let target;
          if (value === "") {
            instance.reportDetailLaunching(instance.standardDoms[1].getAttribute("desid"));
          } else {
            target = null;
            for (let { designer, desid } of instance.designers) {
              if (value === designer) {
                target = desid;
              }
            }
            if (target !== null) {
              instance.reportDetailLaunching(target);
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
        instance.reportDetailLaunching(instance.standardDoms[i].getAttribute("desid"));
      });
      this.standardDoms[i].addEventListener("contextmenu", this.makeClipBoardEvent(this.standardDoms[i].getAttribute("desid")));
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

    //launching
    this.reportDetailLaunching(this.desid);

  } catch (e) {
    console.log(e);
  }
}
