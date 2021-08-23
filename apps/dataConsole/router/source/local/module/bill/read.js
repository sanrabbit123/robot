BillJs.prototype.contentsBase = function (search = null) {
  const instance = this;
  const { ea, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const { white, green } = colorChip;
  let totalMother;
  let margin;
  let titleArea, contentsArea;
  let titleDesigner, titleProject, titleTime;
  let contentsDesigner, contentsProject, contentsTong;
  let size;
  let borderBack;
  let dashBoardHeight, dashBoardMargin;
  let dashBoard;
  let topMargin, leftMargin;

  margin = 30;
  size = 18;
  dashBoardHeight = 49;
  dashBoardMargin = 16;
  topMargin = 21;
  leftMargin = 20;

  totalMother = createNode({
    mother: document.getElementById("totalcontents"),
    class: [ "totalMother" ],
    style: {
      position: "fixed",
      top: String(0),
      left: String(0),
      paddingTop: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      height: withOut(margin + belowHeight, ea),
    }
  });
  this.totalMother = totalMother;

  [ borderBack, dashBoard, contentsArea, contentsTong ] = createNodes([
    {
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(margin + dashBoardHeight + dashBoardMargin) + ea,
        left: String(margin) + ea,
        width: withOut(margin * 2, ea),
        height: withOut(margin + dashBoardHeight + dashBoardMargin, ea),
        borderBottom: String(0),
        borderTopLeftRadius: String(3) + "px",
        borderTopRightRadius: String(3) + "px",
        boxSizing: "border-box",
        background: colorChip.gray2,
      }
    },
    {
      mother: totalMother,
      style: {
        position: "relative",
        height: String(dashBoardHeight) + ea,
        marginBottom: String(dashBoardMargin) + ea,
        background: colorChip.gray2,
        borderRadius: String(3) + "px",
        textAlign: "center",
      }
    },
    {
      mother: totalMother,
      style: {
        position: "relative",
        height: withOut(dashBoardHeight + dashBoardMargin, ea),
      }
    },
    {
      mother: -1,
      style: {
        display: "block",
        position: "relative",
        paddingTop: String(topMargin) + ea,
        paddingLeft: String(leftMargin) + ea,
        paddingRight: String(leftMargin) + ea,
        height: String(100) + '%',
        width: String(100) + '%',
        top: String(0) + ea,
        boxSizing: "border-box",
        overflowY: "scroll",
        overflowX: "hidden",
      }
    }
  ]);

  this.contentsSpec.contentsTong = contentsTong;
  this.contentsSpec.dashBoard = dashBoard;
  this.contentsBlockInjection();
  this.contentsDashBoard();
}

BillJs.prototype.contentsWhiteBlock = function (mother, bill, last, index) {
  const instance = this;
  const { ea, photoActionList } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, dateToString } = GeneralJs;
  const { links: { cliid, desid, proid, client, designer, project } } = bill;
  const zeroAddition = (num) => { return (num < 10) ? `0${String(num)}` : String(num); }
  const textMaker = (title, value, color, column) => { const space = "&nbsp;"; return `<b style="color:${colorChip.gray5};font-weight:200">${title}${space}:${space}</b><b id="${bill.bilid}_${column}" class="value" style="color:${colorChip[color]}">${value}</b>`; }
  const dateToColor = (dateObj, reverse = true) => {
    if (dateObj.valueOf() > (new Date(3000, 0, 1)).valueOf()) {
      return "red";
    } else if (dateObj.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
      return "gray5";
    } else {
      if (dateObj.valueOf() <= (new Date()).valueOf()) {
        return !reverse ? "green" : "black";
      } else {
        return !reverse ? "black" : "green";
      }
    }
  }
  let height, margin;
  let whiteBlock;
  let width0, width1;
  let top, left, size;
  let textMargin;
  let startLeft;
  let previousWidth, betweenText;
  let widthArr, domArr;
  let totalObj;
  let tempQsa;
  let circle, whiteBack;
  let radius;
  let circleTop;
  let redPoint;
  let whiteWidth;
  let stringArr, tempDom;
  let tempString, tempString0, tempString1, tempString2, tempString3;
  let updateArr;
  let emptyDate, emptyValue;
  let map, mapColumn;
  let generalMargin, lastMargin;
  let factorHeight;
  let num;

  totalObj = [];

  height = 41;
  margin = 4;

  width0 = 115;
  width1 = 3;

  top = isMac() ? 9 : 11;
  left = 16;
  size = 15;
  textMargin = 6;
  startLeft = 160;
  betweenText = 30;

  totalObj.push(startLeft);
  totalObj.push(betweenText);

  radius = 4;
  circleTop = 16;
  redPoint = false;
  whiteWidth = 40;

  stringArr = [];
  updateArr = [];

  generalMargin = 1;
  lastMargin = 60;

  factorHeight = 20;

  emptyDate = new Date(1800, 0, 1);
  emptyValue = "해당 없음";

  map = {
    bilid: {
      title: "아이디",
      position: "bilid",
      values: [],
      chain: null
    },
    date: {
      title: "발생일",
      position: "date",
      values: [],
      chain: null
    }
  };

  stringArr.push(textMaker(map["bilid"].title, bill.bilid, "black", "bilid"));
  updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
    const mother = this;
    cancelBox.parentNode.removeChild(cancelBox);
    parent.style.overflow = "hidden";
    resetWidthEvent(mother);
  });
  stringArr.push(textMaker(map["date"].title, dateToString(bill.date), "black", "date"));
  updateArr.push(function (e, option, cancelBox, parent, calendarEvent, resetWidthEvent) {
    const mother = this;
    cancelBox.parentNode.removeChild(cancelBox);
    parent.style.overflow = "hidden";
    resetWidthEvent(mother);
  });

  [ whiteBlock ] = createNodes([
    {
      mother,
      id: bill.bilid,
      attribute: [
        { index: String(index) },
        { sortstandard: "" },
        { sort: "1" },
      ],
      style: {
        display: instance.contentsSearchIndex.includes(index) ? "none" : "block",
        position: "relative",
        background: colorChip.white,
        width: String(100) + '%',
        height: String(height) + ea,
        borderRadius: String(5) + "px",
        marginBottom: String(margin * (!last ? generalMargin : lastMargin)) + ea,
        overflow: "hidden",
        transition: "all 0s ease",
      }
    },
    {
      mother: -1,
      text: bill.title,
      class: [ "hoverDefault" ],
      events: [
        {
          type: "click",
          event: function (e) {

          }
        }
      ],
      style: {
        position: "absolute",
        width: String(width0) + ea,
        top: String(top + (isMac() ? 1 : 0)) + ea,
        left: String(left) + ea,
        fontSize: String(size) + ea,
        fontWeight: String(400),
        zIndex: String(2),
        color: colorChip.black,
      },
      bold: {
        color: colorChip.green,
        fontWeight: String(400),
      },
      under: {
        color: colorChip.white,
        fontWeight: String(400),
      }
    },
    {
      mother: -2,
      text: '|',
      style: {
        position: "absolute",
        width: String(width1) + ea,
        top: String(top + (isMac() ? 1 : 0)) + ea,
        left: String(left + width0 + textMargin) + ea,
        fontSize: String(size) + ea,
        fontWeight: String(400),
        color: colorChip.gray4,
        zIndex: String(2),
      }
    },
    {
      mother: -3,
      style: {
        position: "absolute",
        width: String(left + width0 + textMargin + width1 + (textMargin * 1.5)) + ea,
        top: String(0) + ea,
        left: String(0) + ea,
        height: String(100) + '%',
        background: colorChip.white,
        zIndex: String(1),
      }
    },
  ]);

  widthArr = [];
  domArr = [];
  for (let i = 0; i < stringArr.length; i++) {
    tempDom = createNode({
      mother: whiteBlock,
      attribute: [
        { arrindex: String(i) },
      ],
      text: stringArr[i],
      class: [ "white_child_" + String(i) ],
      events: [
        {
          type: [ "click", "contextmenu" ],
          event: function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (this.querySelectorAll("aside").length === 0) {
              if (!e.altKey) {
                const index = Number(this.getAttribute("arrindex"));
                const { ea } = instance;
                const { createNodes, colorChip, withOut } = GeneralJs;
                const valueDom = this.querySelector(".value");
                let thisCase;
                thisCase = {};
                for (let column in map) {
                  if (document.getElementById(bill.bilid + "_" + column) === null) {
                    throw new Error("invaild doms");
                  }
                  thisCase[column] = document.getElementById(bill.bilid + "_" + column);
                }
                const option = { ea, top: 25, createNodes, colorChip, withOut, thisCase, boxShadow: "0px 3px 16px -9px " + colorChip.shadow, animation: "fadeuplite 0.2s ease forwards", borderRadius: String(5) + "px", zIndex: String(1), valueDom, height: 31, size: 14, textTop: (isMac() ? 5 : 7) };
                let cancelBox, parent, calendarEvent, resetWidthEvent;

                parent = this.parentElement;
                [ cancelBox ] = createNodes([
                  {
                    mother: this,
                    mode: "aside",
                    events: [
                      {
                        type: "click",
                        event: function (e) {
                          e.stopPropagation();
                          e.preventDefault();
                          parent.style.overflow = "hidden";
                          const directParent = this.parentElement;
                          const removeTargets = directParent.querySelectorAll("aside");
                          for (let dom of removeTargets) {
                            directParent.removeChild(dom);
                          }
                        }
                      }
                    ],
                    style: {
                      position: "fixed",
                      top: String(0) + ea,
                      left: String(0) + ea,
                      width: String(100) + '%',
                      height: String(100) + '%',
                      background: "transparent",
                      zIndex: option.zIndex,
                    }
                  }
                ]);
                parent.style.overflow = "visible";

                calendarEvent = null;

                resetWidthEvent = async function (domFactor) {
                  try {
                    const ignoreNumbers = [ 3, 2 ];
                    const thisDom = domFactor.parentElement;
                    const thisId = thisDom.id;
                    let children, width, left;
                    let between, betweenArr, betweenBeforeArr;
                    let tempArr;
                    let leftArr, widthArr;

                    children = thisDom.children;
                    if (children.length <= ignoreNumbers[0] + ignoreNumbers[1] + 1) {
                      throw new Error("invaild block");
                    }
                    betweenBeforeArr = [];
                    for (let i = ignoreNumbers[0]; i < children.length - ignoreNumbers[1]; i++) {
                      left = Number(children[i].style.left.replace(/[^0-9\-\.]/gi, ''));
                      width = Number(children[i].style.width.replace(/[^0-9\-\.]/gi, ''));
                      tempArr = [ left, width ];
                      betweenBeforeArr.push(tempArr);
                    }
                    betweenArr = [];
                    for (let i = 1; i < betweenBeforeArr.length; i++) {
                      betweenArr.push(Math.round(betweenBeforeArr[i][0] - (betweenBeforeArr[i - 1][0] + betweenBeforeArr[i - 1][1])));
                    }
                    betweenArr.sort((a, b) => { return b - a; });
                    between = betweenArr[0];

                    left = Number(children[ignoreNumbers[0]].style.left.replace(/[^0-9\-\.]/gi, '')) - between;
                    width = 0;
                    leftArr = [];
                    widthArr = [];
                    for (let i = ignoreNumbers[0]; i < children.length - ignoreNumbers[1]; i++) {
                      children[i].style.width = "auto";
                      left = left + width + between;
                      width = children[i].getBoundingClientRect().width;
                      leftArr.push(left);
                      widthArr.push(width);
                    }

                    for (let block of instance.contentsBlocks) {
                      children = block.children;
                      for (let i = ignoreNumbers[0]; i < children.length - ignoreNumbers[1]; i++) {
                        children[i].style.left = String(leftArr[i - ignoreNumbers[0]]) + ea;
                        children[i].style.width = String(widthArr[i - ignoreNumbers[0]]) + ea;
                      }
                    }

                  } catch (e) {
                    console.log(e);
                  }
                }

                updateArr[index].call(this, e, option, cancelBox, parent, calendarEvent, resetWidthEvent);

              } else {

                if (instance.contentsBlocks.length > 0) {

                  const mother = instance.contentsBlocks[0].parentElement;
                  const index = Number(this.getAttribute("arrindex"));
                  const sort = Number(instance.contentsBlocks[0].getAttribute("sort"));
                  const nameConst = "white_child_";
                  let tempArr;
                  let thisValue;
                  let numberBoo;

                  numberBoo = false;

                  for (let z = 0; z < instance.contentsBlocks.length; z++) {
                    tempArr = instance.contentsBlocks[z].querySelector('.' + nameConst + String(index)).textContent.split(':');
                    thisValue = tempArr[1].trim();
                    if (/[0-9]/gi.test(thisValue)) {
                      numberBoo = true;
                    }
                  }

                  for (let z = 0; z < instance.contentsBlocks.length; z++) {
                    tempArr = instance.contentsBlocks[z].querySelector('.' + nameConst + String(index)).textContent.split(':');
                    thisValue = tempArr[1].trim();
                    if (/[0-9]/gi.test(thisValue)) {
                      instance.contentsBlocks[z].setAttribute("sortstandard", thisValue.replace(/[^0-9]/gi, ''));
                    } else {
                      if (numberBoo) {
                        if (thisValue === "예정" || thisValue === "미정") {
                          instance.contentsBlocks[z].setAttribute("sortstandard", "9999999999999999");
                        } else {
                          instance.contentsBlocks[z].setAttribute("sortstandard", "0");
                        }
                      } else {
                        instance.contentsBlocks[z].setAttribute("sortstandard", thisValue);
                      }
                    }
                  }

                  if (sort === 1) {
                    if (numberBoo) {
                      instance.contentsBlocks.sort((a, b) => { return Number(b.getAttribute("sortstandard")) - Number(a.getAttribute("sortstandard")) });
                    } else {
                      instance.contentsBlocks.sort((a, b) => { return (b > a) ? 1 : -1 });
                    }
                  } else {
                    if (numberBoo) {
                      instance.contentsBlocks.sort((a, b) => { return Number(a.getAttribute("sortstandard")) - Number(b.getAttribute("sortstandard")) });
                    } else {
                      instance.contentsBlocks.sort((a, b) => { return (a > b) ? 1 : -1 });
                    }
                  }

                  for (let z = 0; z < instance.contentsBlocks.length; z++) {
                    mother.appendChild(instance.contentsBlocks[z]);
                    instance.contentsBlocks[z].style.marginBottom = String(margin * ((z !== instance.contentsBlocks.length - 1) ? generalMargin : lastMargin)) + ea;
                    instance.contentsBlocks[z].setAttribute("sort", (sort === 1) ? "0" : "1");
                  }

                }

              }
            }
          }
        },
      ],
      style: {
        position: "absolute",
        top: String(top) + ea,
        left: String(startLeft) + ea,
        fontSize: String(size) + ea,
        fontWeight: String(400),
        height: ((i === stringArr.length - 1) ? String(factorHeight) + ea : ""),
        overflow: ((i === stringArr.length - 1) ? "hidden" : "visible"),
        transition: "all 0s ease",
        cursor: "pointer",
      }
    });
    domArr.push(tempDom);
    previousWidth = tempDom.getBoundingClientRect().width;
    widthArr.push(previousWidth);
    startLeft = startLeft + previousWidth + betweenText;
  }
  totalObj.push(widthArr);
  totalObj.push(domArr);

  [ whiteBack, circle ] = createNodes([
    {
      mother: whiteBlock,
      style: {
        position: "absolute",
        top: String(0) + ea,
        right: String(0) + ea,
        width: String(whiteWidth) + ea,
        height: String(100) + '%',
        background: colorChip["white"]
      }
    },
    {
      mother: whiteBlock,
      style: {
        position: "absolute",
        top: String(circleTop) + ea,
        right: String(left + 1) + ea,
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        borderRadius: String(radius * 2) + ea,
        background: colorChip[redPoint ? "red" : "green"]
      }
    }
  ]);

  this.contentsBlocks.push(whiteBlock);

  return totalObj;
}

BillJs.prototype.contentsBlockInjection = function () {
  const instance = this;
  const { ea, bills, type } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren } = GeneralJs;
  const { contentsTong } = this.contentsSpec;
  const idUniqueNumber = (id) => {
    const dateNumber = Number(id.split('_')[0].replace(/[^0-9]/gi, ''));
    const dateConst = 1000 * 100 * 100;
    return (dateNumber * dateConst) + GeneralJs.orderSystem("decode", id);
  }
  const typeMap = {
    client: "cliid",
    designer: "desid"
  };
  let scrollTong;
  let width, dom;
  let maxWidth;
  let startLeft, betweenText, widthArr, domArr;
  let temp;
  let idPastArr;

  cleanChildren(contentsTong);

  scrollTong = createNode({
    mother: contentsTong,
    style: {
      position: "relative",
      width: String(100) + '%',
    }
  });

  width = [];
  dom = [];
  maxWidth = [];

  if (type === "client") {
    for (let bill of bills) {
      bill.title = `${bill.links.client.name}&nbsp;&nbsp;<b%&nbsp;>&nbsp;%b>&nbsp;&nbsp;${bill.links.designer.designer}`;
    }
    bills.sort((a, b) => { return idUniqueNumber(b.links.cliid) - idUniqueNumber(a.links.cliid); });
  } else if (type === "designer") {
    for (let bill of bills) {
      bill.title = `${bill.links.designer.designer}&nbsp;&nbsp;<b%&nbsp;>&nbsp;%b>&nbsp;&nbsp;${bill.links.client.name}`;
    }
    bills.sort((a, b) => { return idUniqueNumber(b.links.desid) - idUniqueNumber(a.links.desid); });
  }

  idPastArr = [];
  this.contentsBlocks = [];
  for (let i = 0; i < bills.length; i++) {
    if (!idPastArr.includes(bills[i].links[typeMap[type]])) {
      idPastArr.push(bills[i].links[typeMap[type]]);
      bills[i].title = "<b style=\"font-weight:" + String(700) + ";color:" + colorChip.black + "\">" + bills[i].title.replace(/\<b\%/, "</b><b%");
    } else {
      bills[i].title = "<u%" + bills[i].title.replace(/\<b\%/, '').replace(/\%b\>/, "%u>");
    }
    [ startLeft, betweenText, widthArr, domArr ] = this.contentsWhiteBlock(scrollTong, bills[i], (i === bills.length - 1), i);
    width.push(widthArr);
    dom.push(domArr);
  }

  if (width.length > 0) {
    for (let i = 0; i < width[0].length; i++) {
      width.sort((a, b) => { return b[i] - a[i] });
      maxWidth.push(width[0][i]);
    }
    for (let i = 0; i < dom.length; i++) {
      temp = startLeft;
      for (let j = 0; j < dom[i].length; j++) {
        dom[i][j].style.left = String(temp) + ea;
        dom[i][j].style.width = String(maxWidth[j] + 1) + ea;
        temp += maxWidth[j] + betweenText;
      }
    }
  }

}

BillJs.prototype.contentsDashBoard = function () {
  const instance = this;
  const { ea, projects } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const { dashBoard } = this.contentsSpec;
  let size, top, left;
  let nodeArr;
  let textArr;
  let typeNum;
  let dashBoardBox;

  size = 16;
  top = 11;
  left = 19;

  textArr = [];
  typeNum = 0;
  for (let i = 0; i < this.typeArr.length; i++) {
    if (this.typeArr[i] === this.type) {
      typeNum = i;
    }
    textArr.push(this.typeArr[i].slice(0, 1).toUpperCase() + this.typeArr[i].slice(1));
  }

  dashBoardBox = createNode({
    mother: dashBoard,
    style: {
      position: "relative",
      width: withOut(left * 2, ea),
      height: String(100) + '%',
      left: String(left) + ea,
      textAlign: "left",
    }
  });

  nodeArr = [];
  for (let i = 0; i < textArr.length; i++) {
    nodeArr.push({
      mother: dashBoardBox,
      text: textArr[i],
      class: [ "hoverDefault" ],
      attribute: [
        { value: instance.typeArr[i] }
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            instance.type = this.getAttribute("value");
            for (let i = 0; i < instance.typeArr.length; i++) {
              if (instance.typeArr[i] === instance.type) {
                instance.typeDoms[i].style.color = colorChip.green;
              } else {
                instance.typeDoms[i].style.color = colorChip.shadow;
              }
            }
            instance.contentsBlockInjection();
          }
        }
      ],
      style: {
        display: "inline-block",
        position: "relative",
        fontFamily: "graphik",
        fontSize: String(size) + ea,
        fontWeight: String(400),
        top: String(top) + ea,
        color: colorChip[i === typeNum ? "green" : "shadow"],
      }
    });
    if (i !== textArr.length - 1) {
      nodeArr.push({
        mother: dashBoardBox,
        text: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`,
        style: {
          display: "inline-block",
          position: "relative",
          fontFamily: "graphik",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          top: String(top) + ea,
          color: colorChip.gray5
        }
      });
    }
  }
  nodeArr.push({
    mother: dashBoardBox,
    text: 'D',
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/designer?mode=general");
        }
      }
    ],
    style: {
      position: "absolute",
      fontFamily: "graphik",
      fontSize: String(size + 2) + ea,
      fontWeight: String(500),
      top: String(top - 1) + ea,
      right: String(0) + ea,
      fontStyle: "italic",
      color: colorChip["black"],
    }
  });
  nodeArr.push({
    mother: dashBoardBox,
    text: 'C',
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/project");
        }
      }
    ],
    style: {
      position: "absolute",
      fontFamily: "graphik",
      fontSize: String(size + 2) + ea,
      fontWeight: String(500),
      top: String(top - 1) + ea,
      right: String(18) + ea,
      fontStyle: "italic",
      color: colorChip["black"],
    }
  });

  nodeArr.push({
    mother: dashBoardBox,
    mode: "svg",
    source: this.mother.returnHamburger(colorChip.black),
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          instance.contentsSearchIndex = [];
          instance.contentsBlockInjection();
        }
      }
    ],
    style: {
      position: "absolute",
      height: String(11) + ea,
      top: String(18) + ea,
      right: String(38) + ea,
    }
  });

  nodeArr = createNodes(nodeArr);
  instance.typeDoms = [];
  for (let i = 0; i < nodeArr.length; i++) {
    if (i % 2 === 0) {
      instance.typeDoms.push(nodeArr[i]);
    }
  }
}

BillJs.prototype.contentsSearchEvent = function () {
  const instance = this;
  const { ea } = this;
  const input = this.searchInput;
  let width, length;

  length = this.projects.length;
  width = 800;

  input.parentNode.style.width = String(width) + ea;
  input.parentNode.style.left = GeneralJs.withOut(50, width / 2, ea);
  input.addEventListener("keypress", function (e) {
    let tempArr, orArr;
    if (e.key === "Enter") {
      instance.contentsSearchIndex = [];
      orArr = [];
      tempArr = this.value.trim().split(',');
      for (let value of tempArr) {
        if (value.trim() !== '' && value.trim() !== '.') {
          for (let dom of instance.contentsBlocks) {
            if ((new RegExp(value.trim(), "gi")).test(dom.textContent)) {
              orArr.push(Number(dom.getAttribute("index")));
            }
          }
        }
      }
      if (this.value.trim() !== '' && this.value.trim() !== '.') {
        for (let i = 0; i < length; i++) {
          if (!orArr.includes(i)) {
            instance.contentsSearchIndex.push(i);
          }
        }
      }
      instance.contentsBlockInjection();
    }
  });
}

BillJs.prototype.contentsUpdate = async function (whereQuery, updateQuery, chainQuery = null, rawValue = '') {
  const instance = this;
  const { colorChip, ajaxJson } = GeneralJs;
  try {
    if (typeof whereQuery !== "object" || typeof updateQuery !== "object") {
      throw new Error("invaild input");
    }
    if (chainQuery !== null) {
      if (chainQuery.condition === undefined || chainQuery.updateQuery === undefined) {
        throw new Error("invaild input");
      }
    }
    const { proid } = whereQuery;
    const project = this.projects.search("proid", proid);
    let tempArr, target;
    let boo;
    let tempQsa0, tempQsa1, tempQsa2;

    await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateProject");

    for (let query in updateQuery) {
      tempArr = query.split('.');
      target = project;
      for (let i = 0; i < tempArr.length - 1; i++) {
        target = target[tempArr[i]];
      }
      target[tempArr[tempArr.length - 1]] = updateQuery[query];
    }

    if (chainQuery !== null) {
      const { condition, updateQuery: chainUpdateQuery } = chainQuery;
      boo = false;
      if ((new RegExp(condition, "gi")).test(rawValue)) {
        boo = true;
      }
      if (boo) {
        await ajaxJson({ whereQuery, updateQuery: chainUpdateQuery }, "/rawUpdateProject");
        for (let query in chainUpdateQuery) {
          tempArr = query.split('.');
          target = project;
          for (let i = 0; i < tempArr.length - 1; i++) {
            target = target[tempArr[i]];
          }
          target[tempArr[tempArr.length - 1]] = chainUpdateQuery[query];
        }
      }
    }

  } catch (e) {
    console.log(e);
  }
}

BillJs.prototype.contentsDeactivate = function (proid, offMode = true) {
  const instance = this;
  const { colorChip, stacks } = GeneralJs;
  let emptyDate, emptyValue;
  let tempQsa;
  let whiteBlock;
  let num;
  let name;
  let tong;
  let children;
  let length;

  whiteBlock = document.getElementById(proid);
  children = whiteBlock.children;
  length = children.length;
  emptyDate = new Date(1800, 0, 1);
  emptyValue = "해당 없음";
  name = "deactive_" + proid;

  if (offMode) {
    stacks[name] = [];
    tong = stacks[name];
    tempQsa = whiteBlock.querySelectorAll("div");
    for (let dom of tempQsa) {
      tong.push(dom.style.color);
      dom.style.color = colorChip.gray4;
    }
    tempQsa = whiteBlock.querySelectorAll("b");
    for (let dom of tempQsa) {
      tong.push(dom.style.color);
      dom.style.color = colorChip.gray4;
    }
    tong.push(whiteBlock.style.background);
    whiteBlock.style.background = colorChip.gray0;
    tong.push(children[length - 2].style.background);
    children[length - 2].style.background = colorChip.gray0;
    tong.push(children[length - 1].style.background);
    children[length - 1].style.background = colorChip.gray4;
  } else {
    if (Array.isArray(stacks[name])) {
      num = 0;
      tong = stacks[name];
      tempQsa = whiteBlock.querySelectorAll("div");
      for (let dom of tempQsa) {
        dom.style.color = tong[num];
        num = num + 1;
      }
      tempQsa = whiteBlock.querySelectorAll("b");
      for (let dom of tempQsa) {
        dom.style.color = tong[num];
        num = num + 1;
      }
      whiteBlock.style.background = tong[num];
      num = num + 1;
      children[length - 2].style.background = tong[num];
      num = num + 1;
      children[length - 1].style.background = tong[num];
    } else {
      window.location.reload();
    }
  }

}

BillJs.prototype.contentsBlockMove = function () {
  const instance = this;
  const { ea } = this;
  const { belowButtons: { arrow: { left, right } } } = this.mother;
  const moveEvent = function (type = "left") {
    return function (e) {
      const blocks = instance.contentsBlocks;
      const movementAmount = 50;
      const ignoreNumbers = [ 3, 2 ];
      let children;
      let left;
      for (let block of blocks) {
        children = block.children;
        for (let i = ignoreNumbers[0]; i < children.length - ignoreNumbers[1]; i++) {
          left = Number(children[i].style.left.replace(/[^0-9\-\.]/gi, ''));
          left = left + (movementAmount * (type === "left" ? -1 : 1));
          children[i].style.left = String(left) + ea;
        }
      }
    }
  }
  left.addEventListener("click", moveEvent("left"));
  right.addEventListener("click", moveEvent("right"));
}

BillJs.prototype.contentsView = async function () {
  const instance = this;
  try {
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
    }
    const { createNodes, colorChip, ajaxJson, returnGet, equalJson, sleep } = GeneralJs;
    const todayDateValue = (new Date()).valueOf();
    let loading;
    let bills;
    let projects;
    let designers;
    let clients;
    let temp;
    let type, typeArr;
    let whereQuery;

    loading = await this.mother.loadingRun();

    typeArr = [ "client", "designer", "project", "all" ];
    type = returnGet().type;
    if (type === undefined || type === null || !typeArr.includes(type)) {
      type = typeArr[0];
    }

    this.typeArr = typeArr;
    this.type = type;
    this.contentsSpec = {};
    this.contentsSearchIndex = [];
    this.contentsBlocks = null;

    bills = await ajaxJson({ mode: "read", whereQuery: {}, limit: 200 }, PYTHONHOST + "/generalBill", { equal: true });
    bills = bills.filter((bill) => { return bill.links.proid !== undefined && bill.links.cliid !== undefined && bill.links.desid !== undefined; });
    bills.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });

    whereQuery = { $or: [] };
    for (let bill of bills) {
      if (bill.links.proid !== undefined && typeof bill.links.proid === "string") {
        whereQuery["$or"].push(bill.links.proid);
      }
    }
    whereQuery["$or"] = Array.from(new Set(whereQuery["$or"]));
    whereQuery["$or"] = whereQuery["$or"].map((id) => { return { proid: id }; });
    projects = new SearchArray(await ajaxJson({ noFlat: true, whereQuery }, "/getProjects", { equal: true }));

    whereQuery = { $or: [] };
    for (let bill of bills) {
      if (bill.links.cliid !== undefined && typeof bill.links.cliid === "string") {
        whereQuery["$or"].push(bill.links.cliid);
      }
    }
    whereQuery["$or"] = Array.from(new Set(whereQuery["$or"]));
    whereQuery["$or"] = whereQuery["$or"].map((id) => { return { cliid: id }; });
    clients = new SearchArray(await ajaxJson({ noFlat: true, whereQuery }, "/getClients", { equal: true }));

    whereQuery = { $or: [] };
    for (let bill of bills) {
      if (bill.links.desid !== undefined && typeof bill.links.desid === "string") {
        whereQuery["$or"].push(bill.links.desid);
      }
    }
    whereQuery["$or"] = Array.from(new Set(whereQuery["$or"]));
    whereQuery["$or"] = whereQuery["$or"].map((id) => { return { desid: id }; });
    designers = new Designers(await ajaxJson({ noFlat: true, whereQuery }, "/getDesigners", { equal: true }));

    for (let bill of bills) {
      bill.links.client = clients.search("cliid", bill.links.cliid);
      bill.links.project = projects.search("proid", bill.links.proid);
      bill.links.designer = designers.pick(bill.links.desid);
      bill.title = `${bill.links.client.name}&nbsp;&nbsp;<b%&nbsp;>&nbsp;%b>&nbsp;&nbsp;${bill.links.designer.designer}`;
    }

    this.bills = bills;
    this.projects = projects;
    this.clients = clients;
    this.designers = designers;
    this.designers.setProjects(projects);
    this.designers.setClients(clients);

    console.log(bills);

    loading.parentNode.removeChild(loading);

    this.contentsBase();
    // this.contentsSearchEvent();
    // this.contentsBlockMove();

  } catch (e) {
    console.log(e);
  }
}
