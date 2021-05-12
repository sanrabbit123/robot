class Designers extends Array {
  constructor(arr) {
    super();
    for (let i of arr) {
      this.push(i);
    }
  }
  pick(desid) {
    if (desid === undefined) {
      throw new Error("invaild input");
    }
    let target = null;
    for (let i of this) {
      if (i.desid === desid) {
        target = i;
        break;
      }
    }
    if (target === null) {
      throw new Error("invaild desid");
    }
    return target;
  }
  getById(desid) {
    return this.pick(desid);
  }
  getByDesid(desid) {
    return this.pick(desid);
  }
  previous(desid) {
    if (desid === undefined) {
      throw new Error("invaild input");
    }
    let target = null;
    for (let i = 0; i < this.length; i++) {
      if (this[i].desid === desid) {
        target = i;
        break;
      }
    }
    if (target === null) {
      throw new Error("invaild desid");
    }
    if (target !== 0) {
      return this[target - 1];
    } else {
      return this[this.length - 1];
    }
  }
  next(desid) {
    if (desid === undefined) {
      throw new Error("invaild input");
    }
    let target = null;
    for (let i = 0; i < this.length; i++) {
      if (this[i].desid === desid) {
        target = i;
        break;
      }
    }
    if (target === null) {
      throw new Error("invaild desid");
    }
    if (target !== this.length - 1) {
      return this[target + 1];
    } else {
      return this[0];
    }
  }
}

const DesignerJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.module = {
    paddingTop: 38,
    height: 18,
    marginBottom: 18,
    initialLine: 14,
    initialMargin: 14,
  }
  this.grayBarWidth = 210;
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
  this.ea = "px";
  this.designers = [];
}

DesignerJs.prototype.standardBar = function (standard, localMode = false, specificDesid = null) {
  const instance = this;
  let div_clone, div_clone2, div_clone3;
  let style, style2, style3;
  let ea = "px";
  let temp, target;
  let num, leftPosition;
  let sortEventFunction;

  temp = {
    desid: standard.standard.desid.name,
    designer: standard.standard.designer.name
  };
  target = standard.data;
  if (standard.search === null) {
    target.unshift(temp);
  }

  style = {
    display: "block",
    position: "relative",
    background: GeneralJs.colorChip.gray0,
    top: String(0),
    left: String(0),
    width: String(this.grayBarWidth) + ea,
    zIndex: String(2),
  };

  style2 = {
    display: "block",
    position: "fixed",
    height: String(this.module.height + this.module.marginBottom) + ea,
    paddingTop: String(this.module.paddingTop) + ea,
    top: String(0) + ea,
    zIndex: String(1),
    background: GeneralJs.colorChip.gray0,
    width: style.width,
  };

  style3 = {
    position: "absolute",
    height: String(this.module.height + this.module.marginBottom) + ea,
    fontSize: String(14) + ea,
    fontWeight: String(600),
    color: "#2fa678",
  };

  if (standard.search === null) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    for (let i in style) {
      div_clone.style[i] = style[i];
    }
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.style.height = String(this.module.height + this.module.marginBottom + this.module.paddingTop + this.module.initialMargin) + ea;
    div_clone.appendChild(div_clone2);
  } else {
    div_clone = this.totalMother.children[0];
  }

  leftPosition = [
    57,
    141,
  ];

  sortEventFunction = function (index) {
    return function (e) {
      e.preventDefault();
      e.stopPropagation();
      let s, h, arr, toggle;
      let g, tempObj;
      s = document.createDocumentFragment();
      h = document.createDocumentFragment();
      g = document.createDocumentFragment();
      arr = [];
      toggle = Number(instance.standardDoms[0].getAttribute("sort"));
      for (let i = 1; i < instance.standardDoms.length; i++) {
        tempObj = {};
        tempObj.standard = instance.standardDoms[i];
        tempObj.caseDom = instance.caseDoms[i];
        if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
          tempObj.grayDom = GeneralJs.stacks["grayDataDoms"][i];
        }
        arr.push(tempObj);
      }
      arr.sort((a, b) => {
        if (/^[0-9]/.test(a.standard.children[index].textContent) && !/\-/g.test(a.standard.children[index].textContent)) {
          if (toggle) {
            return Number(a.standard.children[index].textContent.replace(/[^0-9\.]/g, '')) - Number(b.standard.children[index].textContent.replace(/[^0-9\.]/g, ''));
          } else {
            return Number(b.standard.children[index].textContent.replace(/[^0-9\.]/g, '')) - Number(a.standard.children[index].textContent.replace(/[^0-9\.]/g, ''));
          }
        } else {
          if (a.standard.children[index].textContent < b.standard.children[index].textContent) {
            return toggle ? -1 : 1;
          }
          if (a.standard.children[index].textContent > b.standard.children[index].textContent) {
            return toggle ? 1 : -1;
          }
          return 0;
        }
      });
      for (let obj of arr) {
        s.appendChild(obj.standard);
        h.appendChild(obj.caseDom);
        if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
          g.appendChild(obj.grayDom);
        }
      }
      instance.totalMother.firstChild.appendChild(s);
      instance.totalMother.children[2].appendChild(h);
      instance.standardDoms = [];
      for (let i = 1; i < instance.totalMother.children[0].children.length; i++) {
        instance.standardDoms.push(instance.totalMother.children[0].children[i]);
      }
      instance.caseDoms = [ instance.totalMother.children[1] ];
      for (let i = 1; i < instance.totalMother.children[2].children.length; i++) {
        instance.caseDoms.push(instance.totalMother.children[2].children[i]);
      }
      if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
        GeneralJs.stacks["grayData"].appendChild(g);
        GeneralJs.stacks["grayDataDoms"] = [];
        for (let i = 0; i < GeneralJs.stacks["grayData"].children.length; i++) {
          GeneralJs.stacks["grayDataDoms"].push(GeneralJs.stacks["grayData"].children[i]);
        }
        GeneralJs.stacks["grayData"].style.height = '';
        if (GeneralJs.stacks["grayData"].getBoundingClientRect().height < window.innerHeight) {
          GeneralJs.stacks["grayData"].style.height = String(window.innerHeight) + ea;
        }
      }
      instance.standardDoms[0].setAttribute("sort", String(toggle ? 0 : 1));
    }
  }

  num = (standard.search === null ? 0 : 1);
  for (let { desid, designer } of target) {
    if (num === 1) {
      style2.position = "relative";
      style3.color = "#404040";
      delete style2.paddingTop;
      delete style2.zIndex;
      delete style2.background;
      delete style2.width;
      leftPosition = [
        38,
        135,
      ];
    }

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    for (let i in style2) {
      div_clone2.style[i] = style2[i];
    }
    if (num !== 0) {
      div_clone2.setAttribute("desid", desid);
      if (specificDesid !== null) {
        if (specificDesid !== desid) {
          div_clone2.style.display = "none";
        }
      }
    }

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.textContent = desid;
    for (let i in style3) {
      div_clone3.style[i] = style3[i];
    }
    div_clone3.style.left = String(leftPosition[0]) + ea;
    if (num === 0) {
      if (!localMode) {
        div_clone3.addEventListener("contextmenu", sortEventFunction(0));
      }
    }
    div_clone2.appendChild(div_clone3);

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.textContent = designer;
    for (let i in style3) {
      div_clone3.style[i] = style3[i];
    }
    div_clone3.style.left = String(leftPosition[1]) + ea;
    if (num === 0) {
      if (!localMode) {
        div_clone3.addEventListener("contextmenu", sortEventFunction(1));
      }
    }
    div_clone2.appendChild(div_clone3);

    div_clone2.style.cursor = "pointer";
    if (num !== 0) {
      if (!localMode) {
        div_clone2.addEventListener("click", this.whiteViewMaker(num));
        div_clone2.addEventListener("contextmenu", this.makeClipBoardEvent(desid));
      }
    }

    if (num !== 0) {
      this.cases.push({ desid, designer });
    } else {
      div_clone2.style.borderBottom = "1px dashed #dddddd";
      div_clone2.style.height = String(this.module.height + this.module.initialLine) + ea;
      this.cases.push(null);
    }

    this.standardDoms.push(div_clone2);
    if (num === 0) {
      div_clone2.setAttribute("sort", String(0));
    }
    div_clone2.setAttribute("index", String(num));
    div_clone.appendChild(div_clone2);
    num++;
  }

  if (standard.search === null) {
    this.totalMother.appendChild(div_clone);
  }

  if (!localMode) {
    if (this.standardDoms.length === 2) {
      GeneralJs.timeouts["oneWhiteCardOnSelection"] = setTimeout(function () {
        instance.standardDoms[1].click();
        clearTimeout(GeneralJs.timeouts["oneWhiteCardOnSelection"]);
        GeneralJs.timeouts["oneWhiteCardOnSelection"] = null;
      }, 401);
    }
  }

}

DesignerJs.prototype.infoArea = function (info) {
  const instance = this;
  let div_clone, div_clone2, div_clone3;
  let style, style2, style3;
  let ea = "px";
  let temp, target;
  let num, leftPosition, widthArr;
  let columns;
  const grayBarWidth = this.grayBarWidth;
  let upsideWhiteBar;
  let eventFunction, updateEventFunction;
  let enterEventFunction, leaveEventFunction;
  let sortEventFunction;
  let dragstartEventFunction, dragendEventFunction, dragenterEventFunction, dragleaveEventFunction, dragoverEventFunction, dropEventFunction;
  let dropPoint, redPoint;
  let onoffDummy;
  let thisOnOff;
  let originalColumns;

  temp = {};
  columns = [];
  leftPosition = [];
  widthArr = [];

  if (window.localStorage.getItem("designer_columnsOrder") !== null && window.localStorage.getItem("designer_columnsOrder") !== undefined) {
    originalColumns = JSON.parse(window.localStorage.getItem("designer_columnsOrder"));
    for (let c of originalColumns) {
      info.standard[c.name].left = c.left;
    }
  }

  for (let i in info.standard) {
    temp[i] = info.standard[i].name;
    columns.push(i);
    widthArr.push(info.standard[i].width);
    leftPosition.push(info.standard[i].left);
  }

  target = info.data;
  if (info.search === null) {
    target.unshift(temp);
  }

  onoffDummy = {};
  if (target.length > 0) {
    for (let i in target[0]) {
      onoffDummy[i] = false;
    }
  }

  style = {
    display: "block",
    position: "absolute",
    top: String(0),
    left: String(grayBarWidth) + ea,
    width: String(5000) + ea,
    color: "#404040",
  };

  style2 = {
    display: "block",
    position: "fixed",
    height: String(this.module.height + this.module.marginBottom) + ea,
    paddingTop: String(this.module.paddingTop) + ea,
    top: String(0) + ea,
    zIndex: String(1),
    background: GeneralJs.colorChip.white,
    width: style.width,
    left: style.left,
    color: "inherit",
  };

  style3 = {
    position: "absolute",
    marginBottom: String(this.module.marginBottom) + ea,
    height: String(this.module.height) + ea,
    fontSize: String(14) + ea,
    fontWeight: String(600),
    color: "#2fa678",
    textAlign: "center",
    overflow: "hidden",
    cursor: "pointer",
    transition: "0s all ease",
  };

  if (info.search === null) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    for (let i in style) {
      div_clone.style[i] = style[i];
    }
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.style.height = String(this.module.height + this.module.marginBottom + this.module.paddingTop + this.module.initialMargin) + ea;
    div_clone.appendChild(div_clone2);
  } else {
    div_clone = this.totalMother.children[2];
  }

  num = (info.search === null ? 0 : 1);
  eventFunction = function (left) {
    return function (e) {
      if (e.type === "click" && e.altKey) {
        const thisId = /d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(this.parentElement.className)[0];
        const onOffObj = JSON.parse(window.localStorage.getItem(thisId));
        onOffObj[this.getAttribute("column")] = !onOffObj[this.getAttribute("column")];
        window.localStorage.setItem(thisId, JSON.stringify(onOffObj));
        if (onOffObj[this.getAttribute("column")]) {
          this.style.color = "#2fa678";
        }
      }
      const targets = document.querySelectorAll(".moveTarget");
      const ea = "px";
      if (Number(targets[0].style.width.replace(/[^0-9]/g, '')) >= window.innerWidth - 20) {
        for (let target of targets) {
          target.style.transform = "translateX(" + String(left * -1) + ea + ")";
          if (Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) > 0) {
            target.style.transform = "translateX(0px)";
          } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-\.]/g, ''))) {
            target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) + ea + ")";
          }
        }
      }
    }
  }

  enterEventFunction = function (e) {
    const mother = this.parentElement;
    const thisIndex = this.parentElement.getAttribute("index");
    const desidChildren = instance.totalMother.children[0].children;
    for (let z = 0; z < mother.children.length; z++) {
      mother.children[z].style.color = "#2fa678";
    }
    for (let z = 0; z < desidChildren.length; z++) {
      if (desidChildren[z].getAttribute("index") === thisIndex) {
        for (let y = 0; y < desidChildren[z].children.length; y++) {
          desidChildren[z].children[y].style.color = "#2fa678";
        }
      }
    }
  }

  leaveEventFunction = function (e) {
    const mother = this.parentElement;
    const thisIndex = this.parentElement.getAttribute("index");
    const thisId = /d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(mother.className)[0];
    const onOffObj = JSON.parse(window.localStorage.getItem(thisId));
    const desidChildren = instance.totalMother.children[0].children;
    let finalColor;
    finalColor = "#404040";
    if (mother.getAttribute("red") === "true") {
      finalColor = "#d13939";
    }
    if (mother.getAttribute("drop") === "true") {
      finalColor = "#cccccc";
    }
    for (let z = 0; z < mother.children.length; z++) {
      if (!onOffObj[mother.children[z].getAttribute("column")]) {
        mother.children[z].style.color = finalColor;
      } else {
        mother.children[z].style.color = "#2fa678";
      }
    }
    for (let z = 0; z < desidChildren.length; z++) {
      if (desidChildren[z].getAttribute("index") === thisIndex) {
        for (let y = 0; y < desidChildren[z].children.length; y++) {
          desidChildren[z].children[y].style.color = finalColor;
        }
      }
    }
  }

  updateEventFunction = function (left) {
    return function (e) {
      if (e.cancelable) {
        e.preventDefault();
      }
      // const clickEventFunction = eventFunction(left);
      // clickEventFunction.call(this, e);

      const thisIndex = this.parentElement.getAttribute("index");
      const thisId = /d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(this.parentElement.className)[0];

      leaveEventFunction.call(this, e);
      for (let z = 0; z < instance.totalMother.children[0].children.length; z++) {
        if (instance.totalMother.children[0].children[z].getAttribute("index") === thisIndex) {
          for (let y = 0; y < instance.totalMother.children[0].children[z].children.length; y++) {
            instance.totalMother.children[0].children[z].children[y].style.color = "#2fa678";
          }
        }
      }

      const removeAllEvent = function () {
        GeneralJs.timeouts.whiteCardRemoveTargets = setTimeout(function () {
          const standardArea = instance.totalMother.children[2];
          const infoArea = instance.totalMother.children[0];
          const onOffObj = JSON.parse(window.localStorage.getItem(thisId));
          let finalColor;

          for (let z = 0; z < standardArea.children.length; z++) {
            if (standardArea.children[z].getAttribute("index") === thisIndex) {
              finalColor = "#404040";
              if (standardArea.children[z].getAttribute("drop") === "true") {
                finalColor = "#cccccc";
              }
              if (standardArea.children[z].getAttribute("red") === "true") {
                finalColor = "#d13939";
              }
              for (let y = 0; y < standardArea.children[z].children.length; y++) {
                if (!onOffObj[standardArea.children[z].children[y].getAttribute("column")]) {
                  standardArea.children[z].children[y].style.color = finalColor;
                } else {
                  standardArea.children[z].children[y].style.color = "#2fa678";
                }
              }
            }
          }
          for (let z = 0; z < infoArea.children.length; z++) {
            if (infoArea.children[z].getAttribute("index") === thisIndex) {
              for (let y = 0; y < infoArea.children[z].children.length; y++) {
                infoArea.children[z].children[y].style.color = finalColor;
              }
            }
          }
          while (document.querySelectorAll('.removeTarget').length !== 0) {
            document.querySelectorAll('.removeTarget')[0].remove();
          }
          clearTimeout(GeneralJs.timeouts.whiteCardRemoveTargets);
          GeneralJs.timeouts.whiteCardRemoveTargets = null;
        }, 10);
      }
      const cancel_event = function (e) {
        e.preventDefault();

        let originalDiv = this.parentNode;

        removeAllEvent();
        originalDiv.style.overflow = "hidden";
        originalDiv.style.color = "inherit";
        originalDiv.style.transition = "";

        window.removeEventListener('message', GeneralJs.stacks["addressEvent"]);
        GeneralJs.stacks["addressEvent"] = null;
      }
      const updateValueEvent = async function (e) {
        let thisId, requestIndex, column;
        let idDom;
        let mothers, targetDom;
        let originalDiv;
        let finalValue;
        let pastRawData;

        if ((e.type === "keypress" && GeneralJs.confirmKeyCode.includes(e.keyCode)) || e.type === "click" || e.type === "message") {

          if (this.hasAttribute("dateEventMethod")) {
            originalDiv = this.parentNode.parentNode.parentNode.parentNode.parentNode;
            column = originalDiv.getAttribute("column");
            idDom = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
          } else {
            originalDiv = this.parentNode;
            column = this.parentNode.getAttribute("column");
            idDom = this.parentNode.parentNode;
          }

          idDom.setAttribute("active", "true");
          thisId = idDom.getAttribute("class");
          mothers = document.querySelectorAll('.' + thisId);
          for (let i = 0; i < mothers.length; i++) {
            if (mothers[i].hasAttribute("active")) {
              if (mothers[i].getAttribute("active") === "true") {
                targetDom = mothers[i];
                requestIndex = i;
              }
            }
          }

          if (originalDiv.childNodes[0] !== undefined && originalDiv.childNodes[0].nodeType === 3) {
            pastRawData = originalDiv.childNodes[0].data;
          } else {
            pastRawData = '';
          }

          if (e.type === "keypress") {
            finalValue = GeneralJs.vaildValue(column, this.value.replace(/[\&\=]/g, ''), pastRawData);
          } else if (e.type === "click") {
            finalValue = GeneralJs.vaildValue(column, this.getAttribute("buttonValue"), pastRawData);
          } else if (e.type === "message") {
            finalValue = GeneralJs.vaildValue(column, e.data, pastRawData);
          }

          await GeneralJs.updateValue({
            thisId: thisId,
            requestIndex: String(requestIndex),
            column: column,
            pastValue: pastRawData,
            value: finalValue,
            index: Number(idDom.getAttribute("index")),
          });

          instance.cases[Number(idDom.getAttribute("index"))][column] = finalValue;
          originalDiv.textContent = finalValue;
          idDom.setAttribute("active", "false");
          removeAllEvent();
          originalDiv.style.overflow = "hidden";
        }

      }

      let input_clone;
      let button_clone, button_clone2;
      let svg_clone = {};
      let cancel_inputBack;
      let style;
      let ea = 'px';
      let paddingBottom;
      let height;
      let top;
      let width;
      let fontSize;
      let iframe_clone;
      let tempFunction;
      const updateEventMother = this;

      if (this.querySelector("input") === null) {

        cancel_inputBack = GeneralJs.nodes.div.cloneNode(true);
        cancel_inputBack.classList.add("removeTarget");
        style = {
          position: "fixed",
          top: String(0) + ea,
          left: String(0) + ea,
          width: String(100) + "%",
          height: String(document.querySelector('.totalMother').children[2].getBoundingClientRect().height) + ea,
          opacity: String(0.7),
          zIndex: String(3),
        };
        for (let i in style) {
          cancel_inputBack.style[i] = style[i];
        }
        this.appendChild(cancel_inputBack);

        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add("removeTarget");
        input_clone.setAttribute("type", "text");
        input_clone.setAttribute("value", this.textContent);

        paddingBottom = 1;

        style = {
          position: "absolute",
          top: String(0) + ea,
          left: String(0) + ea,
          width: String(100) + '%',
          outline: String(0) + ea,
          border: String(0) + ea,
          textAlign: "center",
          fontSize: "inherit",
          color: "#2fa678",
          paddingBottom: String(paddingBottom) + ea,
          zIndex: String(3),
        };
        for (let i in style) {
          input_clone.style[i] = style[i];
        }

        cancel_inputBack.addEventListener("click", cancel_event);
        cancel_inputBack.addEventListener("contextmenu", cancel_event);
        input_clone.addEventListener("keypress", updateValueEvent);

        this.appendChild(input_clone);

        //items
        const map = DataPatch.designerMap();
        const thisMap = map[this.getAttribute("column")];

        if (thisMap.type === "date" && e.type === "click") {

          cancel_inputBack.style.background = GeneralJs.colorChip.white;
          // cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";

          this.style.overflow = "";
          width = 260;
          height = 280;
          fontSize = Number(this.style.fontSize.replace((new RegExp(ea, "gi")), ''));
          top = Number(this.style.height.replace((new RegExp(ea, "gi")), '')) * 1.5;

          button_clone = GeneralJs.nodes.div.cloneNode(true);
          button_clone.classList.add("removeTarget");
          style = {
            position: "absolute",
            top: String(top) + ea,
            left: "calc(50% - " + String((width / 2) + 0.1) + ea + ")",
            width: String(width) + ea,
            height: String(260) + ea,
            background: GeneralJs.colorChip.white,
            textAlign: "center",
            fontSize: "inherit",
            color: "#2fa678",
            zIndex: String(3),
            borderRadius: String(3) + ea,
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0px 2px 11px -6px #808080",
            transition: "all 0s ease",
          };
          for (let j in style) {
            button_clone.style[j] = style[j];
          }
          const calendar = instance.mother.makeCalendar((this.textContent === '-' || this.textContent === '' || this.textContent === '예정') ? (new Date()) : this.textContent, updateValueEvent);
          button_clone.appendChild(calendar.calendarBase);
          button_clone.style.height = String(calendar.calendarHeight) + ea;
          this.appendChild(button_clone);

        } else if (thisMap.type !== "object" && thisMap.items !== undefined) {

          cancel_inputBack.style.background = GeneralJs.colorChip.white;
          // cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";

          this.style.overflow = "";
          height = Number(this.style.height.replace((new RegExp(ea, "gi")), ''));
          fontSize = Number(this.style.fontSize.replace((new RegExp(ea, "gi")), ''));
          top = height * 0.5;

          width = GeneralJs.calculationMenuWidth(fontSize, thisMap.items);

          for (let i = 0; i < thisMap.items.length; i++) {
            button_clone = GeneralJs.nodes.div.cloneNode(true);
            button_clone.classList.add("removeTarget");
            button_clone.setAttribute("buttonValue", thisMap.items[i]);
            style = {
              position: "absolute",
              top: String(((height * 2) * (i + 1)) - top) + ea,
              left: "calc(50% - " + String((width / 2) + 0.1) + ea + ")",
              width: String(width) + ea,
              paddingTop: String(height * (GeneralJs.isMac() ? 0.4 : 0.5)) + ea,
              height: String(height * (GeneralJs.isMac() ? 1.4 : 1.3)) + ea,
              background: thisMap.multiple === undefined ? GeneralJs.colorChip.green : GeneralJs.colorChip.gray2,
              textAlign: "center",
              fontSize: "inherit",
              color: GeneralJs.colorChip.white,
              zIndex: String(3),
              borderRadius: String(3) + ea,
              animation: "fadeuplite 0.3s ease forwards",
              boxShadow: "0px 2px 11px -6px " + (thisMap.multiple === undefined ? GeneralJs.colorChip.green : GeneralJs.colorChip.gray1),
            };
            for (let j in style) {
              button_clone.style[j] = style[j];
            }

            button_clone2 = GeneralJs.nodes.div.cloneNode(true);
            button_clone2.classList.add("hoverDefault");
            style = {
              position: "absolute",
              fontSize: "inherit",
              fontWeight: String(400),
              color: thisMap.multiple === undefined ? GeneralJs.colorChip.white : GeneralJs.colorChip.deactive,
              zIndex: String(3),
              textAlign: "center",
              background: "transparent",
              width: "100%",
              height: "calc(100% - " + String(5) + ea + ")",
              left: String(0) + ea,
              top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.8)) + ea,
              borderRadius: String(3) + ea,
              border: String(0),
              cursor: "pointer",
            };
            for (let j in style) {
              button_clone2.style[j] = style[j];
            }
            button_clone2.textContent = thisMap.items[i];
            button_clone.appendChild(button_clone2);

            if (thisMap.multiple === undefined) {
              button_clone.addEventListener("click", updateValueEvent);
            } else {
              //multiple select
              if ((new RegExp(thisMap.items[i], "gi")).test(input_clone.value)) {
                button_clone.setAttribute("selected", "true");
                button_clone.style.background = GeneralJs.colorChip.green;
                button_clone.style.boxShadow = GeneralJs.colorChip.green;
                button_clone.firstChild.style.color = GeneralJs.colorChip.white;
              } else {
                button_clone.setAttribute("selected", "false");
              }
              button_clone.addEventListener("click", function (e) {
                if (this.getAttribute("selected") === "false") {
                  this.style.background = GeneralJs.colorChip.green;
                  this.style.boxShadow = GeneralJs.colorChip.green;
                  this.firstChild.style.color = GeneralJs.colorChip.white;
                  this.setAttribute("selected", "true");
                } else {
                  this.style.background = GeneralJs.colorChip.gray2;
                  this.style.boxShadow = GeneralJs.colorChip.gray1;
                  this.firstChild.style.color = GeneralJs.colorChip.deactive;
                  this.setAttribute("selected", "false");
                }
                const children = this.parentNode.children;
                let value;
                value = '';
                for (let dom of children) {
                  if (dom.hasAttribute("selected")) {
                    if (dom.getAttribute("selected") === "true") {
                      value += dom.getAttribute("buttonValue");
                      value += ", ";
                    }
                  }
                }
                value = value.slice(0, -2);
                svg_clone.setAttribute("buttonValue", value);
              });
            }
            this.appendChild(button_clone);
          }

          if (thisMap.multiple !== undefined) {
            svg_clone = SvgTong.stringParsing(instance.mother.returnOk(GeneralJs.colorChip.green));
            svg_clone.classList.add("removeTarget");
            svg_clone.setAttribute("buttonValue", input_clone.value);
            style = {
              position: "absolute",
              top: String(((height * 2) * (thisMap.items.length + 1)) - 5) + ea,
              width: String(18) + ea,
              left: "calc(50% - " + String(18 / 2) + ea + ")",
              zIndex: String(3),
            };
            for (let j in style) {
              svg_clone.style[j] = style[j];
            }
            svg_clone.addEventListener("click", updateValueEvent);
            this.appendChild(svg_clone);
          }

        } else if (thisMap.type !== "object" && thisMap.address !== undefined && e.type === "click") {

          cancel_inputBack.style.background = GeneralJs.colorChip.white;
          // cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";

          this.style.overflow = "";
          height = Number(this.style.height.replace((new RegExp(ea, "gi")), ''));
          fontSize = Number(this.style.fontSize.replace((new RegExp(ea, "gi")), ''));
          top = height * 0.5;
          width = fontSize * 36;

          button_clone = GeneralJs.nodes.div.cloneNode(true);
          button_clone.classList.add("removeTarget");

          style = {
            position: "absolute",
            top: String((height * 1.9) - top) + ea,
            left: "calc(50% - " + String((width / 2) + 0.1) + ea + ")",
            width: String(width) + ea,
            paddingTop: String(height * 0.3) + ea,
            height: String(width * 0.9) + ea,
            background: GeneralJs.colorChip.white,
            zIndex: String(3),
            borderRadius: String(3) + ea,
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0px 2px 11px -6px #aaaaaa",
          };
          for (let i in style) {
            button_clone.style[i] = style[i];
          }

          iframe_clone = GeneralJs.nodes.iframe.cloneNode(true);
          iframe_clone.setAttribute("src", window.location.protocol + "//" + window.location.host + "/tools/address");
          iframe_clone.setAttribute("width", "100%");
          iframe_clone.setAttribute("height", "100%");
          iframe_clone.style.border = String(0);
          iframe_clone.style.borderRadius = String(3) + ea;
          button_clone.appendChild(iframe_clone);

          GeneralJs.stacks["addressEvent"] = async function (e) {
            updateValueEvent.call(button_clone, e);
            window.removeEventListener('message', GeneralJs.stacks["addressEvent"]);
            GeneralJs.stacks["addressEvent"] = null;
          }
          window.addEventListener('message', GeneralJs.stacks["addressEvent"]);

          this.appendChild(button_clone);

        } else if (thisMap.type === "object" && thisMap.inputFunction !== undefined) {

          cancel_inputBack.style.background = GeneralJs.colorChip.white;
          // cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";
          tempFunction = new Function("mother", "input", "callback", thisMap.inputFunction);
          tempFunction(this, input_clone, function () {
            let e = {};
            e.type = "keypress";
            e.keyCode = 13;
            updateValueEvent.call(input_clone, e);
            updateEventMother.style.overflow = "hidden";
          });

        } else {

          GeneralJs.timeouts.updateInputTimeout = setTimeout(function () {
            input_clone.focus();
            clearTimeout(GeneralJs.timeouts.updateInputTimeout);
            GeneralJs.timeouts.updateInputTimeout = null;
          }, 200);

        }

      }
    }
  }

  sortEventFunction = function (left, z) {
    return function (e) {
      if (e.cancelable) {
        e.preventDefault();
      }
      const map = DataPatch.designerMap();
      const clickEventFunction = eventFunction(left);
      clickEventFunction.call(this, e);

      let cancel_inputBack, cancel_event;
      let sort_event;
      let button_clone, button_clone2;
      let style;
      let ea = "px";
      let height, fontSize, top, width;
      let items;
      let tempArr;

      items = [
        "오름차순",
        "내림차순",
      ];

      tempArr = map[instance.caseDoms[0].children[z].getAttribute("column")];
      if (tempArr.items !== undefined && tempArr.items !== null) {
        tempArr = tempArr.items;
        tempArr.unshift("전체 보기");
        items = items.concat(tempArr);
      } else if (tempArr.yesNo !== undefined && tempArr.yesNo !== null) {
        tempArr = tempArr.yesNo;
        tempArr.unshift("전체 보기");
        items = items.concat(tempArr);
      }

      cancel_event = function (e) {
        if (e.cancelable) {
          e.preventDefault();
        }
        let originalDiv = this.parentNode;

        GeneralJs.timeouts.whiteCardRemoveTargets = setTimeout(function () {
          while (document.querySelectorAll('.removeTarget').length !== 0) {
            document.querySelectorAll('.removeTarget')[0].remove();
          }
          clearTimeout(GeneralJs.timeouts.whiteCardRemoveTargets);
          GeneralJs.timeouts.whiteCardRemoveTargets = null;
        }, 10);

        originalDiv.style.overflow = "hidden";
        originalDiv.style.color = "#2fa678";
        originalDiv.style.transition = "";
      }

      sort_event = function (toggle = true) {
        return function (e) {
          let s, h, g, arr;
          let tempObj;
          s = document.createDocumentFragment();
          h = document.createDocumentFragment();
          g = document.createDocumentFragment();
          arr = [];

          for (let i = 1; i < instance.caseDoms.length; i++) {
            tempObj = {};
            tempObj.standard = instance.standardDoms[i];
            tempObj.caseDom = instance.caseDoms[i];
            if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
              tempObj.grayDom = GeneralJs.stacks["grayDataDoms"][i];
            }
            arr.push(tempObj);
          }

          arr.sort((a, b) => {
            if ((/^[0-9]/.test(a.caseDom.children[z].textContent) && !/\-/g.test(a.caseDom.children[z].textContent)) || /d[0-9]+/g.test(a.caseDom.children[z].textContent)) {
              if (toggle) {
                return Number(a.caseDom.children[z].textContent.replace(/[^0-9\.]/g, '')) - Number(b.caseDom.children[z].textContent.replace(/[^0-9\.]/g, ''));
              } else {
                return Number(b.caseDom.children[z].textContent.replace(/[^0-9\.]/g, '')) - Number(a.caseDom.children[z].textContent.replace(/[^0-9\.]/g, ''));
              }
            } else {
              if (a.caseDom.children[z].textContent < b.caseDom.children[z].textContent) {
                return toggle ? -1 : 1;
              }
              if (a.caseDom.children[z].textContent > b.caseDom.children[z].textContent) {
                return toggle ? 1 : -1;
              }
              return 0;
            }
          });

          for (let obj of arr) {
            s.appendChild(obj.standard);
            h.appendChild(obj.caseDom);
            if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
              g.appendChild(obj.grayDom);
            }
          }
          instance.totalMother.firstChild.appendChild(s);
          instance.totalMother.children[2].appendChild(h);
          instance.standardDoms = [];
          for (let i = 1; i < instance.totalMother.children[0].children.length; i++) {
            instance.standardDoms.push(instance.totalMother.children[0].children[i]);
          }
          instance.caseDoms = [ instance.totalMother.children[1] ];
          for (let i = 1; i < instance.totalMother.children[2].children.length; i++) {
            instance.caseDoms.push(instance.totalMother.children[2].children[i]);
          }
          if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
            GeneralJs.stacks["grayData"].appendChild(g);
            GeneralJs.stacks["grayDataDoms"] = [];
            for (let i = 0; i < GeneralJs.stacks["grayData"].children.length; i++) {
              GeneralJs.stacks["grayDataDoms"].push(GeneralJs.stacks["grayData"].children[i]);
            }
            GeneralJs.stacks["grayData"].style.height = '';
            if (GeneralJs.stacks["grayData"].getBoundingClientRect().height < window.innerHeight) {
              GeneralJs.stacks["grayData"].style.height = String(window.innerHeight) + ea;
            }
          }
          GeneralJs.stacks["latestSort"].unshift(instance.caseDoms[0].children[z].getAttribute("column"));
          if (GeneralJs.stacks["latestSort"].length > 10) {
            GeneralJs.stacks["latestSort"] = GeneralJs.stacks["latestSort"].slice(0, 3);
          }
          cancel_event.call(this, e);
        }
      }

      cancel_inputBack = GeneralJs.nodes.div.cloneNode(true);
      cancel_inputBack.classList.add("removeTarget");
      style = {
        position: "fixed",
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(100) + "%",
        height: String(document.querySelector('.totalMother').children[2].getBoundingClientRect().height) + ea,
        opacity: String(0.7),
        zIndex: String(3),
        background: GeneralJs.colorChip.white,
        animation: "justfadeinmiddle 0.3s ease forwards",
      };
      for (let i in style) {
        cancel_inputBack.style[i] = style[i];
      }
      cancel_inputBack.addEventListener("dragstart", (e) => { e.stopPropagation(); e.preventDefault(); });
      cancel_inputBack.addEventListener("dragenter", (e) => { e.stopPropagation(); e.preventDefault(); });
      cancel_inputBack.addEventListener("dragleave", (e) => { e.stopPropagation(); e.preventDefault(); });
      cancel_inputBack.addEventListener("dragover", (e) => { e.stopPropagation(); e.preventDefault(); });
      cancel_inputBack.addEventListener("drop", (e) => { e.stopPropagation(); e.preventDefault(); });
      this.appendChild(cancel_inputBack);

      cancel_inputBack.addEventListener("click", cancel_event);
      cancel_inputBack.addEventListener("contextmenu", cancel_event);

      this.style.overflow = "";

      height = Number(this.style.height.replace((new RegExp(ea, "gi")), ''));
      fontSize = Number(this.style.fontSize.replace((new RegExp(ea, "gi")), ''));
      top = height * 0.5;
      width = GeneralJs.calculationMenuWidth(fontSize, items);

      for (let i = 0; i < items.length; i++) {
        button_clone = GeneralJs.nodes.div.cloneNode(true);
        button_clone.classList.add("removeTarget");
        button_clone.setAttribute("buttonValue", items[i]);
        style = {
          position: "absolute",
          top: String(((height * 2) * (i + 1)) - top) + ea,
          left: "calc(50% - " + String((width / 2) + 0.1) + ea + ")",
          width: String(width) + ea,
          paddingTop: String(height * (GeneralJs.isMac() ? 0.4 : 0.5)) + ea,
          height: String(height * (GeneralJs.isMac() ? 1.4 : 1.3)) + ea,
          background: "#2fa678",
          textAlign: "center",
          fontSize: "inherit",
          fontWeight: String(500),
          color: GeneralJs.colorChip.white,
          zIndex: String(3),
          borderRadius: String(3) + ea,
          animation: "fadeuplite 0.3s ease forwards",
          boxShadow: "0px 2px 11px -6px #2fa678",
        };
        for (let j in style) {
          button_clone.style[j] = style[j];
        }

        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("hoverDefault");
        style = {
          position: "absolute",
          fontSize: "inherit",
          fontWeight: String(400),
          color: GeneralJs.colorChip.white,
          zIndex: String(3),
          textAlign: "center",
          background: "transparent",
          width: "100%",
          height: "calc(100% - " + String(5) + ea + ")",
          left: String(0) + ea,
          top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.8)) + ea,
          borderRadius: String(3) + ea,
          border: String(0),
          cursor: "pointer",
        };
        for (let j in style) {
          button_clone2.style[j] = style[j];
        }
        button_clone2.textContent = items[i];
        button_clone.appendChild(button_clone2);

        if (i < 2) {
          button_clone.addEventListener("click", sort_event(i === 0));
        } else if (i === 2) {
          button_clone.addEventListener("click", function (e) {
            for (let j = 1; j < instance.caseDoms.length; j++) {
              instance.standardDoms[j].style.display = "block";
              instance.caseDoms[j].style.display = "block";
              if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
                GeneralJs.stacks["grayDataDoms"][j].style.display = "block";
                GeneralJs.stacks["grayData"].style.height = '';
                if (GeneralJs.stacks["grayData"].getBoundingClientRect().height < window.innerHeight) {
                  GeneralJs.stacks["grayData"].style.height = String(window.innerHeight) + ea;
                }
              }
            }
            GeneralJs.stacks["latestSort"].unshift(null);
            if (GeneralJs.stacks["latestSort"].length > 10) {
              GeneralJs.stacks["latestSort"] = GeneralJs.stacks["latestSort"].slice(0, 3);
            }
            cancel_event.call(this, e);
          });
        } else if (i >= 3) {
          button_clone.addEventListener("click", function (e) {
            const yesNo = [ "Y", "N" ];
            for (let j = 1; j < instance.caseDoms.length; j++) {
              if (!yesNo.includes(this.textContent)) {
                if (instance.caseDoms[j].children[z].textContent !== this.textContent) {
                  instance.standardDoms[j].style.display = "none";
                  instance.caseDoms[j].style.display = "none";
                  if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
                    GeneralJs.stacks["grayDataDoms"][j].style.display = "none";
                    GeneralJs.stacks["grayData"].style.height = '';
                    if (GeneralJs.stacks["grayData"].getBoundingClientRect().height < window.innerHeight) {
                      GeneralJs.stacks["grayData"].style.height = String(window.innerHeight) + ea;
                    }
                  }
                } else {
                  if (GeneralJs.stacks["latestSort"][0] === instance.caseDoms[0].children[z].getAttribute("column")) {
                    instance.standardDoms[j].style.display = "block";
                    instance.caseDoms[j].style.display = "block";
                    if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
                      GeneralJs.stacks["grayDataDoms"][j].style.display = "block";
                      GeneralJs.stacks["grayData"].style.height = '';
                      if (GeneralJs.stacks["grayData"].getBoundingClientRect().height < window.innerHeight) {
                        GeneralJs.stacks["grayData"].style.height = String(window.innerHeight) + ea;
                      }
                    }
                  } else {
                    if (instance.caseDoms[j].style.display !== "none") {
                      instance.standardDoms[j].style.display = "block";
                      instance.caseDoms[j].style.display = "block";
                      if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
                        GeneralJs.stacks["grayDataDoms"][j].style.display = "block";
                        GeneralJs.stacks["grayData"].style.height = '';
                        if (GeneralJs.stacks["grayData"].getBoundingClientRect().height < window.innerHeight) {
                          GeneralJs.stacks["grayData"].style.height = String(window.innerHeight) + ea;
                        }
                      }
                    }
                  }
                }
              } else {
                if (/^1[6789]/.test(instance.caseDoms[j].children[z].textContent) || instance.caseDoms[j].children[z].textContent === '' || instance.caseDoms[j].children[z].textContent === '-') {

                  if (this.textContent === "Y") {
                    instance.standardDoms[j].style.display = "none";
                    instance.caseDoms[j].style.display = "none";
                    if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
                      GeneralJs.stacks["grayDataDoms"][j].style.display = "none";
                      GeneralJs.stacks["grayData"].style.height = '';
                      if (GeneralJs.stacks["grayData"].getBoundingClientRect().height < window.innerHeight) {
                        GeneralJs.stacks["grayData"].style.height = String(window.innerHeight) + ea;
                      }
                    }
                  } else {
                    if (GeneralJs.stacks["latestSort"][0] === instance.caseDoms[0].children[z].getAttribute("column")) {
                      instance.standardDoms[j].style.display = "block";
                      instance.caseDoms[j].style.display = "block";
                      if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
                        GeneralJs.stacks["grayDataDoms"][j].style.display = "block";
                        GeneralJs.stacks["grayData"].style.height = '';
                        if (GeneralJs.stacks["grayData"].getBoundingClientRect().height < window.innerHeight) {
                          GeneralJs.stacks["grayData"].style.height = String(window.innerHeight) + ea;
                        }
                      }
                    } else {
                      if (instance.caseDoms[j].style.display !== "none") {
                        instance.standardDoms[j].style.display = "block";
                        instance.caseDoms[j].style.display = "block";
                        if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
                          GeneralJs.stacks["grayDataDoms"][j].style.display = "block";
                          GeneralJs.stacks["grayData"].style.height = '';
                          if (GeneralJs.stacks["grayData"].getBoundingClientRect().height < window.innerHeight) {
                            GeneralJs.stacks["grayData"].style.height = String(window.innerHeight) + ea;
                          }
                        }
                      }
                    }
                  }

                } else {

                  if (this.textContent !== "Y") {
                    instance.standardDoms[j].style.display = "none";
                    instance.caseDoms[j].style.display = "none";
                    if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
                      GeneralJs.stacks["grayDataDoms"][j].style.display = "none";
                      GeneralJs.stacks["grayData"].style.height = '';
                      if (GeneralJs.stacks["grayData"].getBoundingClientRect().height < window.innerHeight) {
                        GeneralJs.stacks["grayData"].style.height = String(window.innerHeight) + ea;
                      }
                    }
                  } else {
                    if (GeneralJs.stacks["latestSort"][0] === instance.caseDoms[0].children[z].getAttribute("column")) {
                      instance.standardDoms[j].style.display = "block";
                      instance.caseDoms[j].style.display = "block";
                      if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
                        GeneralJs.stacks["grayDataDoms"][j].style.display = "block";
                        GeneralJs.stacks["grayData"].style.height = '';
                        if (GeneralJs.stacks["grayData"].getBoundingClientRect().height < window.innerHeight) {
                          GeneralJs.stacks["grayData"].style.height = String(window.innerHeight) + ea;
                        }
                      }
                    } else {
                      if (instance.caseDoms[j].style.display !== "none") {
                        instance.standardDoms[j].style.display = "block";
                        instance.caseDoms[j].style.display = "block";
                        if (GeneralJs.stacks["grayDataDoms"] !== null && GeneralJs.stacks["grayDataDoms"] !== undefined) {
                          GeneralJs.stacks["grayDataDoms"][j].style.display = "block";
                          GeneralJs.stacks["grayData"].style.height = '';
                          if (GeneralJs.stacks["grayData"].getBoundingClientRect().height < window.innerHeight) {
                            GeneralJs.stacks["grayData"].style.height = String(window.innerHeight) + ea;
                          }
                        }
                      }
                    }
                  }

                }
              }
            }
            GeneralJs.stacks["latestSort"].unshift(instance.caseDoms[0].children[z].getAttribute("column"));
            if (GeneralJs.stacks["latestSort"].length > 10) {
              GeneralJs.stacks["latestSort"] = GeneralJs.stacks["latestSort"].slice(0, 3);
            }
            cancel_event.call(this, e);
          });
        }
        button_clone.addEventListener("contextmenu", (e) => { e.stopPropagation(); e.preventDefault(); });
        button_clone.addEventListener("dragstart", (e) => { e.stopPropagation(); e.preventDefault(); });
        button_clone.addEventListener("dragenter", (e) => { e.stopPropagation(); e.preventDefault(); });
        button_clone.addEventListener("dragleave", (e) => { e.stopPropagation(); e.preventDefault(); });
        button_clone.addEventListener("dragover", (e) => { e.stopPropagation(); e.preventDefault(); });
        button_clone.addEventListener("drop", (e) => { e.stopPropagation(); e.preventDefault(); });
        this.appendChild(button_clone);
      }
    }
  }

  dragstartEventFunction = function (e) {
    e.dataTransfer.setData("dragData", e.target.getAttribute("column"));
    const img = new Image();
    e.dataTransfer.setDragImage(img, 1, 1);
  }

  dragendEventFunction = function (e) {
    this.style.opacity = String(1);
    e.preventDefault();
  }

  dragenterEventFunction = function (e) {
    this.style.opacity = String(0.5);
    e.preventDefault();
  }

  dragleaveEventFunction = function (e) {
    this.style.opacity = String(1);
    e.preventDefault();
  }

  dragoverEventFunction = function (e) {
    this.style.opacity = String(0.5);
    e.preventDefault();
  }

  dropEventFunction = function (e) {
    e.preventDefault();
    this.style.opacity = String(1);
    const movingColumn = e.dataTransfer.getData("dragData");
    const thisColumn = this.getAttribute("column");
    let allColumns;
    let originalColumns;
    let margin, initialLeft;
    let thisWidth, thisLeft;
    let ea = "px";

    margin = 20;
    initialLeft = 30;
    originalColumns = [];
    allColumns = [];

    if (window.localStorage.getItem("designer_columnsOrder") !== null && window.localStorage.getItem("designer_columnsOrder") !== undefined) {
      originalColumns = JSON.parse(window.localStorage.getItem("designer_columnsOrder"));
    } else {
      for (let c of instance.caseDoms[0].children) {
        originalColumns.push({ name: c.getAttribute("column"), width: Number(c.style.width.replace(/[^0-9\.\-]/g, '')), left: Number(c.style.left.replace(/[^0-9\.\-]/g, '')) });
      }
    }

    for (let c of originalColumns) {
      if (c.name === movingColumn) {
        thisWidth = c.width;
        thisLeft = c.left;
      }
    }
    for (let c of originalColumns) {
      if (c.name !== movingColumn) {
        if (thisColumn === c.name) {
          allColumns.push({ name: movingColumn, width: thisWidth, left: thisLeft });
        }
        allColumns.push({ name: c.name, width: c.width, left: c.left });
      }
    }
    for (let c = 0; c < allColumns.length; c++) {
      if (c === 0) {
        allColumns[c].left = initialLeft;
      } else {
        allColumns[c].left = allColumns[c - 1].width + allColumns[c - 1].left + margin;
      }
    }

    window.localStorage.setItem("designer_columnsOrder", JSON.stringify(allColumns));

    for (let c of instance.caseDoms) {
      for (let d of c.children) {
        for (let { name, left } of allColumns) {
          if (d.getAttribute("column") === name) {
            d.style.left = String(left) + ea;
          }
        }
      }
    }

    e.stopPropagation();
  }

  dropPoint = DataPatch.designerDropPoint();
  redPoint = DataPatch.designerRedPoint();

  for (let obj of target) {
    if (num === 1) {
      style3.fontWeight = "500";
      style3.color = "inherit";
      style2.position = "relative";
      delete style2.paddingTop;
      delete style2.zIndex;
      delete style2.background;
      delete style2.width;
      delete style2.left;
    }

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.setAttribute("index", String(num));
    if (num !== 0) {
      div_clone2.classList.add(this.cases[num].desid);

      div_clone2.setAttribute("drop", "false");
      div_clone2.setAttribute("red", "false");
      if (dropPoint.values.includes(obj[dropPoint.column])) {
        style2.color = "#cccccc";
        for (let z = 0; z < this.standardDoms[num].children.length; z++) {
          this.standardDoms[num].children[z].style.color = "#cccccc";
        }
        div_clone2.setAttribute("drop", "true");
      } else if (redPoint.values.includes(obj[redPoint.column])) {
        style2.color = "#d13939";
        for (let z = 0; z < this.standardDoms[num].children.length; z++) {
          this.standardDoms[num].children[z].style.color = "#d13939";
        }
        div_clone2.setAttribute("red", "true");
      } else {
        style2.color = "inherit";
      }

      if (window.localStorage.getItem(this.cases[num].desid) === null) {
        window.localStorage.setItem(this.cases[num].desid, JSON.stringify(onoffDummy));
        thisOnOff = onoffDummy;
      } else {
        thisOnOff = JSON.parse(window.localStorage.getItem(this.cases[num].desid));
      }
    }

    for (let i in style2) {
      div_clone2.style[i] = style2[i];
    }

    for (let z = 0; z < columns.length; z++) {
      div_clone3 = GeneralJs.nodes.div.cloneNode(true);
      div_clone3.textContent = obj[columns[z]];
      for (let i in style3) {
        div_clone3.style[i] = style3[i];
      }
      if (num !== 0) {
        if (thisOnOff[columns[z]]) {
          div_clone3.style.color = "#2fa678";
        }
      }
      div_clone3.style.width = String(widthArr[z]) + ea;
      div_clone3.style.left = String(leftPosition[z]) + ea;
      div_clone3.setAttribute("column", columns[z]);

      if (num === 0) {
        div_clone3.setAttribute("draggable", "true");
        div_clone3.addEventListener("contextmenu", sortEventFunction((leftPosition[z] - (window.innerWidth / 2) + grayBarWidth), z));
        div_clone3.addEventListener("dragstart", dragstartEventFunction);
        div_clone3.addEventListener("dragenter", dragenterEventFunction);
        div_clone3.addEventListener("dragleave", dragleaveEventFunction);
        div_clone3.addEventListener("dragover", dragoverEventFunction);
        div_clone3.addEventListener("drop", dropEventFunction);
      } else {
        div_clone3.addEventListener("mouseenter", enterEventFunction);
        div_clone3.addEventListener("mouseleave", leaveEventFunction);
        div_clone3.addEventListener("click", updateEventFunction(leftPosition[z] - (window.innerWidth / 2) + grayBarWidth));
        div_clone3.addEventListener("contextmenu", updateEventFunction(leftPosition[z] - (window.innerWidth / 2) + grayBarWidth));
      }

      div_clone2.appendChild(div_clone3);
    }

    if (num === 0) {
      upsideWhiteBar = div_clone2;
      upsideWhiteBar.classList.add("moveTarget");

      upsideWhiteBar.style.borderBottom = "1px dashed #dddddd";
      upsideWhiteBar.style.height = String(this.module.height + this.module.initialLine) + ea;

      upsideWhiteBar.setAttribute("sort", String(0));
      this.totalMother.appendChild(upsideWhiteBar);
    } else {
      this.cases[num] = ({ ...this.cases[num], ...obj });
      div_clone.appendChild(div_clone2);
    }

    this.caseDoms.push(div_clone2);
    num++;
  }

  if (info.search === null) {
    div_clone.classList.add("moveTarget");
    upsideWhiteBar.style.width = div_clone.style.width = String(grayBarWidth + leftPosition[leftPosition.length - 1] + widthArr[widthArr.length - 1]) + ea;
    this.totalMother.appendChild(div_clone);
  }

  if (div_clone.getBoundingClientRect().height < window.innerHeight) {
    div_clone.style.height = String(window.innerHeight) + ea;
  }

}

DesignerJs.prototype.spreadData = async function (search = null, localMode = false, specificDesid = null) {
  const instance = this;
  try {
    let designers, totalMother;
    let standardDataTong = [], infoDataTong = [];
    let standardDomsFirst, caseDomsFirst, casesFirst;
    let standardDomsTargets, caseDomsTargets;

    if (search === null || search === '' || search === '-') {
      designers = JSON.parse(await GeneralJs.ajaxPromise("limit=100", "/getDesigners"));
    } else {
      designers = JSON.parse(await GeneralJs.ajaxPromise("query=" + search, "/searchDesigners"));
    }

    const { standard, data } = designers;

    for (let i of data) {
      standardDataTong.push(i.standard);
      infoDataTong.push(i.info);
    }

    if (search === null) {
      totalMother = GeneralJs.nodes.div.cloneNode(true);
      totalMother.classList.add("totalMother");
      this.totalContents.appendChild(totalMother);
      this.totalMother = totalMother;
    } else {
      standardDomsFirst = this.standardDoms.shift();
      caseDomsFirst = this.caseDoms.shift();
      casesFirst = this.cases.shift();
      this.standardDoms = [];
      this.caseDoms = [];
      this.cases = [];
      this.standardDoms.push(standardDomsFirst);
      this.caseDoms.push(caseDomsFirst);
      this.cases.push(casesFirst);

      standardDomsTargets = this.totalMother.children[0].children;
      while (standardDomsTargets[2] !== undefined) {
        this.totalMother.children[0].removeChild(this.totalMother.children[0].lastChild);
      }
      caseDomsTargets = this.totalMother.children[2].children;
      while (caseDomsTargets[1] !== undefined) {
        this.totalMother.children[2].removeChild(this.totalMother.children[2].lastChild);
      }
    }

    this.standardBar({ standard: standard.standard, data: standardDataTong, search: search }, localMode, specificDesid);
    if (!localMode) {
      this.infoArea({ standard: standard.info, data: infoDataTong, search: search });
    }

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

DesignerJs.prototype.cardViewMaker = function (force = false) {
  const instance = this;

  return async function (e) {
    const { cases, totalContents, totalMother } = instance;

    if (instance.whiteBox !== null) {
      if (GeneralJs.stacks.whiteBox !== 1) {
        instance.whiteBox.cancelBox.click();
      }
    }

    if (instance.totalFather !== null) {

      instance.totalFather.style.zIndex = String(1);
      if (instance.totalMother !== null && instance.totalMother !== undefined) {
        instance.totalMother.classList.remove("justfadeinoriginal");
        instance.totalMother.classList.add("justfadeoutoriginal");
      }
      instance.totalFather.classList.remove("fadeout");
      instance.totalFather.classList.add("fadein");

    } else {

      if (instance.totalMother !== null && instance.totalMother !== undefined) {
        instance.totalMother.classList.add("justfadeoutoriginal");
      }

      const ea = "px";
      const { createNodes, colorChip, withOut } = GeneralJs;
      const modeHref = (mode) => { window.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}?mode=${mode}`; }
      const cards = [
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">디자이너</b><br>신청자 조회", event: (e) => { modeHref("aspirant"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">디자이너</b><br>기본 정보", event: (e) => { modeHref("general"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">디자이너</b><br>정산 정보", event: (e) => { modeHref("calculation"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">디자이너</b><br>가격 정보", event: (e) => { modeHref("price"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">디자이너</b><br>일정 정보", event: (e) => { modeHref("calendar"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">디자이너</b><br>큐레이션 정보", event: (e) => { modeHref("checklist"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">디자이너</b><br>상세 정보", event: (e) => { modeHref("detail"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">디자이너</b><br>보고서", event: (e) => { modeHref("report"); } },
      ];
      let totalFather, tong, nodeArr;
      let tempObj;
      let topMargin, leftMargin;
      let margin;
      let width, height;
      let sqrt;

      topMargin = 42;
      leftMargin = 42;
      margin = 12;

      [ totalFather, tong ] = createNodes([
        {
          mother: totalContents,
          class: !force ? [ "totalFather", "fadein" ] : [ "totalFather" ],
          style: {
            zIndex: String(1),
            background: colorChip.gradientGreen3,
            overflow: "hidden",
          }
        },
        {
          mother: -1,
          style: {
            position: "relative",
            top: String(topMargin) + ea,
            left: String(leftMargin) + ea,
            width: withOut(leftMargin * 2, ea),
            height: withOut(topMargin * 2, ea)
          }
        }
      ]);

      for (let i = 0; i < cards.length; i++) {
        nodeArr = createNodes([
          {
            mother: tong,
            text: cards[i].name,
            class: [ "hoverDefault_lite" ],
            events: [
              {
                type: "click",
                event: cards[i].event
              },
            ],
            style: {
              display: "inline-block",
              position: "relative",
              width: "calc(calc(100% - " + String(margin * ((cards.length / 2) - 1)) + ea + ") / " + String(cards.length / 2) + ")",
              height: "calc(50% - " + String(margin) + ea + ")",
              background: colorChip.white,
              borderRadius: String(5) + "px",
              marginRight: ((i % (cards.length / 2)) === (cards.length / 2) - 1) ? String(0) + ea : String(margin) + ea,
              cursor: "pointer",
              boxShadow: "0px 3px 12px -9px " + colorChip.deactive,
              marginBottom: (i < (cards.length / 2)) ? String(margin) + ea : String(0) + ea,
            }
          },
          {
            mother: -1,
            text: String(i + 1),
            style: {
              position: "absolute",
              fontSize: String(25) + ea,
              fontWeight: String(100),
              top: String(GeneralJs.isMac() ? 16 : 20) + ea,
              left: String(29) + ea,
              color: colorChip.green,
            }
          },
          {
            mother: -2,
            text: cards[i].name,
            style: {
              position: "absolute",
              fontSize: String(30) + ea,
              fontWeight: String(500),
              bottom: String(31) + ea,
              right: String(32) + ea,
              color: colorChip.black,
              textAlign: "right",
              lineHeight: String(1.25),
            }
          },
          {
            mother: -3,
            style: {
              position: "absolute",
              top: String(0) + ea,
              left: String(0) + ea,
              width: String(100) + '%',
              height: String(50) + '%',
              borderBottom: "1px solid " + colorChip.green,
              transformOrigin: "50% 100%",
              transition: "all 0s ease",
              opacity: String(0.15)
            }
          },
        ]);

        width = nodeArr[0].getBoundingClientRect().width;
        height = nodeArr[0].getBoundingClientRect().height;
        sqrt = Math.sqrt((width * width) + (height * height));
        sqrt = sqrt - (2 * (31 / width) * sqrt);
        nodeArr[3].style.width = String(sqrt) + ea;
        nodeArr[3].style.left = String((width - sqrt) / 2) + ea;
        nodeArr[3].style.transform = "rotate(" + String(90 + (1 * (Math.atan(width / height) * (180 / Math.PI)))) + "deg)";

      }

      instance.totalFather = totalFather;
      window.addEventListener("resize", (e) => { window.location.reload(); });
    }
    instance.onView = "father";
  }
}

DesignerJs.prototype.whiteContentsMaker = function (thisCase, mother) {
  const instance = this;
  let { standard, info } = DataPatch.designerWhiteViewStandard();
  let div_clone, div_clone2, div_clone3, div_clone4, div_clone5, textArea_clone;
  let propertyBox, portfolioBox;
  let style;
  let ea = "px";
  let titleHeight, titleFontSize, topMargin, leftMargin;
  let fontSize;
  let motherHeight;
  let rightArrowBox, leftArrowBox;
  let rightArrow, leftArrow;
  let hInitial, hInitialBox;
  let updateEventFunction;
  let contentsBoxHeight, contentsBoxBottom;
  let lineHeightRatio;
  let historyTongTarget, historyTargetHeightConst;
  let visualSpecificMarginTop;
  let textAreas;
  let clipboardEvent;
  let dragstartEventFunction, dragendEventFunction, dragenterEventFunction, dragleaveEventFunction, dragoverEventFunction, dropEventFunction;
  let convertIcon, convertIconBox;
  let titleArea, contentsArea;
  let alimtalkIcon, alimtalkButton;
  let iconHeight, iconMargin;

  //entire box -------------------------------------
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    top: String(0) + ea,
    left: String(0) + ea,
    width: mother.style.width,
    height: mother.style.height
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  motherHeight = Number(mother.style.height.replace(/[^0-9\-\.]/g, ''));

  //title ------------------------------------------

  leftMargin = (60 / 786) * motherHeight;
  titleFontSize = (42 / 786) * motherHeight;
  topMargin = leftMargin * (62 / 60);
  titleHeight = (54 / 42) * titleFontSize;
  clipboardEvent = instance.makeClipBoardEvent(thisCase[standard[1]]);
  iconHeight = leftMargin * (GeneralJs.isMac() ? (12 / 60) : (13 / 60));

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    top: String(topMargin) + ea,
    left: String(0) + ea,
    width: "100%",
    height: String(titleHeight) + ea,
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }

  //name
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  div_clone3.textContent = thisCase[standard[0]];
  div_clone3.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    color: GeneralJs.colorChip.black,
    fontSize: String(titleFontSize) + ea,
    fontWeight: String(600),
    bottom: String(leftMargin * (GeneralJs.isMac() ? (12 / 60) : (5 / 60))) + ea,
    left: String(leftMargin - 3) + ea,
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone3.addEventListener("click", clipboardEvent);
  div_clone2.appendChild(div_clone3);

  //desid
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  div_clone3.textContent = thisCase[standard[1]];
  div_clone3.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    color: GeneralJs.colorChip.green,
    fontSize: String(titleFontSize * (19 / 42)) + ea,
    bottom: String(leftMargin * (GeneralJs.isMac() ? (17 / 60) : (14 / 60))) + ea,
    left: String(leftMargin * 3) + ea,
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone3.addEventListener("click", clipboardEvent);
  div_clone2.appendChild(div_clone3);

  //right arrow
  rightArrow = SvgTong.stringParsing(this.mother.returnArrow("right", GeneralJs.colorChip.green));
  style = {
    position: "absolute",
    width: String(leftMargin * (12 / 60)) + ea,
    bottom: String(leftMargin * (17 / 60)) + ea,
    right: String(leftMargin) + ea,
    cursor: "pointer",
  };
  for (let i in style) {
    rightArrow.style[i] = style[i];
  }
  div_clone2.appendChild(rightArrow);

  rightArrowBox = GeneralJs.nodes.div.cloneNode(true);
  for (let i in style) {
    rightArrowBox.style[i] = style[i];
  }
  rightArrowBox.style.width = String(leftMargin * (18 / 60)) + ea;
  rightArrowBox.style.height = String(leftMargin * (20 / 60)) + ea;
  rightArrowBox.style.bottom = String((leftMargin * (12 / 60)) + 1) + ea;
  rightArrowBox.style.right = String(leftMargin - 3) + ea;
  rightArrowBox.addEventListener("click", this.whiteViewMaker(Number(thisCase.index) + 1));
  div_clone2.appendChild(rightArrowBox);

  //left arrow
  leftArrow = SvgTong.stringParsing(this.mother.returnArrow("left", GeneralJs.colorChip.green));
  for (let i in style) {
    leftArrow.style[i] = style[i];
  }
  leftArrow.style.right = String(leftMargin + (leftMargin * (19 / 60))) + ea;
  div_clone2.appendChild(leftArrow);

  leftArrowBox = GeneralJs.nodes.div.cloneNode(true);
  for (let i in style) {
    leftArrowBox.style[i] = style[i];
  }
  leftArrowBox.style.right = String(leftMargin + (leftMargin * (15 / 60))) + ea;
  leftArrowBox.style.height = String(leftMargin * (20 / 60)) + ea;
  leftArrowBox.style.width = String(leftMargin * (18 / 60)) + ea;
  leftArrowBox.style.bottom = String((leftMargin * (12 / 60)) + 1) + ea;
  leftArrowBox.addEventListener("click", this.whiteViewMaker(Number(thisCase.index) - 1));
  div_clone2.appendChild(leftArrowBox);

  //h initial icon
  hInitial = SvgTong.stringParsing(this.mother.returnHinitial(GeneralJs.colorChip.green));
  for (let i in style) {
    hInitial.style[i] = style[i];
  }
  hInitial.style.right = String(leftMargin + (leftMargin * (GeneralJs.isMac() ? (35.5 / 60) : (38.5 / 60)))) + ea;
  hInitial.style.height = String(iconHeight) + ea;
  hInitial.style.width = String(iconHeight * SvgTong.getRatio(hInitial)) + ea;
  div_clone2.appendChild(hInitial);

  //h initial button
  hInitialBox = GeneralJs.nodes.div.cloneNode(true);
  for (let i in style) {
    hInitialBox.style[i] = style[i];
  }
  hInitialBox.style.right = String(leftMargin + (leftMargin * (GeneralJs.isMac() ? (31 / 60) : (34 / 60)))) + ea;
  hInitialBox.style.height = String(leftMargin * (20 / 60)) + ea;
  hInitialBox.style.width = String(leftMargin * (17 / 60)) + ea;
  hInitialBox.style.bottom = String((leftMargin * (12 / 60)) + 1) + ea;
  div_clone2.appendChild(hInitialBox);

  //m initial icon
  convertIcon = SvgTong.stringParsing(this.mother.returnMinitial(GeneralJs.colorChip.green));
  for (let i in style) {
    convertIcon.style[i] = style[i];
  }
  convertIcon.style.right = String(leftMargin + (leftMargin * (GeneralJs.isMac() ? (49 / 60) : (55 / 60)))) + ea;
  convertIcon.style.height = String(iconHeight) + ea;
  convertIcon.style.width = String(iconHeight * SvgTong.getRatio(convertIcon)) + ea;
  div_clone2.appendChild(convertIcon);

  //m initial button
  convertIconBox = GeneralJs.nodes.div.cloneNode(true);
  for (let i in style) {
    convertIconBox.style[i] = style[i];
  }
  convertIconBox.style.right = String(leftMargin + (leftMargin * (GeneralJs.isMac() ? (46 / 60) : (52 / 60)))) + ea;
  convertIconBox.style.height = String(leftMargin * (20 / 60)) + ea;
  convertIconBox.style.width = String(leftMargin * (17 / 60)) + ea;
  convertIconBox.style.bottom = String((leftMargin * (12 / 60)) + 1) + ea;
  div_clone2.appendChild(convertIconBox);

  //bar
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    background: GeneralJs.colorChip.gray3,
    height: String(1) + ea,
    width: "calc(100% - " + (leftMargin * 2) + ea + ")",
    bottom: String(0) + ea,
    left: String(leftMargin) + ea,
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone2.appendChild(div_clone3);
  titleArea = div_clone2;

  div_clone.appendChild(div_clone2);

  //contents ---------------------------------------------------------------------------------

  //property
  contentsBoxHeight = motherHeight - titleHeight - (topMargin * 2.5);
  contentsBoxBottom = topMargin;
  fontSize = (contentsBoxHeight / (info.length + 6)) / 1.8;
  lineHeightRatio = ((contentsBoxHeight - fontSize) / fontSize) / (info.length + 6 - 1);

  //contents event
  updateEventFunction = function () {
    return function (e) {
      e.preventDefault();

      const removeAllEvent = function () {
        GeneralJs.timeouts.whiteCardRemoveTargets = setTimeout(function () {
          while (document.querySelectorAll('.removeTarget').length !== 0) {
            document.querySelectorAll('.removeTarget')[0].remove();
          }
          clearTimeout(GeneralJs.timeouts.whiteCardRemoveTargets);
          GeneralJs.timeouts.whiteCardRemoveTargets = null;
        }, 10);
      }
      const cancel_event = function (e) {
        e.preventDefault();

        let originalDiv = this.parentNode;

        removeAllEvent();
        originalDiv.style.overflow = "hidden";
        originalDiv.style.color = "inherit";
        originalDiv.style.transition = "";

        window.removeEventListener('message', GeneralJs.stacks["addressEvent"]);
        GeneralJs.stacks["addressEvent"] = null;
      }
      const updateValueEvent = async function (e) {
        let grandMother, mother;
        let thisId, requestIndex, column;
        let targetDom;
        let fatherTarget = null;
        let originalDiv;
        let finalValue;
        let pastRawData;

        if ((e.type === "keypress" && GeneralJs.confirmKeyCode.includes(e.keyCode)) || e.type === "click" || e.type === "message") {
          grandMother = instance.whiteBox.contentsBox;

          if (this.hasAttribute("dateEventMethod")) {
            mother = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            originalDiv = this.parentNode.parentNode.parentNode.parentNode.parentNode;
          } else {
            mother = this.parentNode.parentNode;
            originalDiv = this.parentNode;
          }

          thisId = grandMother.getAttribute("index");
          requestIndex = grandMother.getAttribute("request");
          column = mother.getAttribute("index");
          for (let dom of document.querySelectorAll('.' + thisId)) {
            if (Number(dom.getAttribute("index")) === thisCase["index"]) {
              for (let ch of dom.children) {
                if (ch.getAttribute("column") === column) {
                  targetDom = ch;
                }
              }
            }
          }

          if (originalDiv.childNodes[0] !== undefined && originalDiv.childNodes[0].nodeType === 3) {
            pastRawData = originalDiv.childNodes[0].data;
          } else {
            pastRawData = '';
          }

          if (e.type === "keypress") {
            finalValue = GeneralJs.vaildValue(column, this.value.replace(/[\&\=]/g, ''), pastRawData);
          } else if (e.type === "click") {
            finalValue = GeneralJs.vaildValue(column, this.getAttribute("buttonValue"), pastRawData);
          } else if (e.type === "message") {
            finalValue = GeneralJs.vaildValue(column, e.data, pastRawData);
          }

          await GeneralJs.updateValue({
            thisId: thisId,
            requestIndex: requestIndex,
            column: column,
            pastValue: pastRawData,
            value: finalValue,
            index: thisCase["index"],
          });

          if (instance.totalFather !== null) {
            for (let father of instance.totalFatherChildren) {
              if (Number(father.getAttribute("index")) === thisCase["index"]) {
                if (father.querySelector(".father_" + column) !== null) {
                  fatherTarget = father.querySelector(".father_" + column);
                }
              }
            }
            if (fatherTarget !== null) {
              fatherTarget.textContent = finalValue;
            }
          }
          instance.cases[thisCase["index"]][column] = finalValue;
          originalDiv.textContent = finalValue;
          targetDom.textContent = finalValue;

          removeAllEvent();
        }
      }

      let input_clone, cancel_inputBack;
      let style;
      let ea = 'px';
      let paddingBottom;
      let button_clone, button_clone2;
      let svg_clone = {};
      let height;
      let top;
      let width;
      let fontSize;
      let iframe_clone;
      let tempFunction;
      const updateEventMother = this;

      if (this.querySelector("input") === null) {

        cancel_inputBack = GeneralJs.nodes.div.cloneNode(true);
        cancel_inputBack.classList.add("removeTarget");
        style = {
          position: "fixed",
          top: String(0) + ea,
          left: String(0) + ea,
          width: String(100) + "%",
          height: String(100) + "%",
          opacity: String(0.7),
          zIndex: String(3),
        };
        for (let i in style) {
          cancel_inputBack.style[i] = style[i];
        }
        this.appendChild(cancel_inputBack);

        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add("removeTarget");
        input_clone.setAttribute("type", "text");
        input_clone.setAttribute("value", this.textContent);

        paddingBottom = 1;

        style = {
          position: "absolute",
          top: String(0) + ea,
          left: String(0) + ea,
          width: String(100) + '%',
          outline: String(0) + ea,
          border: String(0) + ea,
          fontSize: "inherit",
          color: "#2fa678",
          paddingBottom: String(paddingBottom) + ea,
          zIndex: String(3),
        };
        for (let i in style) {
          input_clone.style[i] = style[i];
        }

        cancel_inputBack.addEventListener("click", cancel_event);
        cancel_inputBack.addEventListener("contextmenu", cancel_event);
        input_clone.addEventListener("keypress", updateValueEvent);

        this.appendChild(input_clone);

        //items
        const map = DataPatch.designerMap();
        const thisMap = map[this.parentNode.getAttribute("index")];

        if (thisMap.type === "date" && e.type === "click") {

          cancel_inputBack.style.background = GeneralJs.colorChip.white;
          // cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";

          this.style.overflow = "";
          width = 260;
          height = 280;
          fontSize = Number(this.style.fontSize.replace((new RegExp(ea, "gi")), ''));
          top = Number(this.style.height.replace((new RegExp(ea, "gi")), '')) * 1.5;

          button_clone = GeneralJs.nodes.div.cloneNode(true);
          button_clone.classList.add("removeTarget");
          style = {
            position: "absolute",
            top: String(top) + ea,
            left: String(0) + ea,
            width: String(width) + ea,
            height: String(260) + ea,
            background: GeneralJs.colorChip.white,
            textAlign: "center",
            fontSize: "inherit",
            color: "#2fa678",
            zIndex: String(3),
            borderRadius: String(3) + ea,
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0px 2px 11px -6px #808080",
            transition: "all 0s ease",
          };
          for (let j in style) {
            button_clone.style[j] = style[j];
          }
          const calendar = instance.mother.makeCalendar((this.textContent === '-' || this.textContent === '' || this.textContent === '예정') ? (new Date()) : this.textContent, updateValueEvent);
          button_clone.appendChild(calendar.calendarBase);
          button_clone.style.height = String(calendar.calendarHeight) + ea;
          this.appendChild(button_clone);

        } else if (thisMap.type !== "object" && thisMap.items !== undefined) {

          cancel_inputBack.style.background = GeneralJs.colorChip.white;
          // cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";

          this.style.overflow = "";
          height = Number(this.style.height.replace((new RegExp(ea, "gi")), ''));
          fontSize = Number(this.style.fontSize.replace((new RegExp(ea, "gi")), ''));
          top = height * 0.5;

          width = GeneralJs.calculationMenuWidth(fontSize, thisMap.items);

          for (let i = 0; i < thisMap.items.length; i++) {
            button_clone = GeneralJs.nodes.div.cloneNode(true);
            button_clone.classList.add("removeTarget");
            button_clone.setAttribute("buttonValue", thisMap.items[i]);
            style = {
              position: "absolute",
              top: String(((height * 2) * (i + 1)) - top) + ea,
              left: String(0) + ea,
              width: String(width) + ea,
              paddingTop: String(height * (GeneralJs.isMac() ? 0.4 : 0.5)) + ea,
              height: String(height * (GeneralJs.isMac() ? 1.4 : 1.3)) + ea,
              background: thisMap.multiple === undefined ? GeneralJs.colorChip.green : GeneralJs.colorChip.gray2,
              textAlign: "center",
              fontSize: "inherit",
              color: GeneralJs.colorChip.white,
              zIndex: String(3),
              borderRadius: String(3) + ea,
              animation: "fadeuplite 0.3s ease forwards",
              boxShadow: "0px 2px 11px -6px " + (thisMap.multiple === undefined ? GeneralJs.colorChip.green : GeneralJs.colorChip.gray1),
              cursor: "pointer",
            };
            for (let j in style) {
              button_clone.style[j] = style[j];
            }

            button_clone2 = GeneralJs.nodes.div.cloneNode(true);
            button_clone2.classList.add("hoverDefault");
            style = {
              position: "absolute",
              fontSize: "inherit",
              fontWeight: String(400),
              color: thisMap.multiple === undefined ? GeneralJs.colorChip.white : GeneralJs.colorChip.deactive,
              zIndex: String(3),
              textAlign: "center",
              background: "transparent",
              width: "100%",
              height: "calc(100% - " + String(5) + ea + ")",
              left: String(0) + ea,
              top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.8)) + ea,
              borderRadius: String(3) + ea,
              border: String(0),
              cursor: "pointer",
            };
            for (let j in style) {
              button_clone2.style[j] = style[j];
            }
            button_clone2.textContent = thisMap.items[i];
            button_clone.appendChild(button_clone2);

            if (thisMap.multiple === undefined) {
              button_clone.addEventListener("click", updateValueEvent);
            } else {
              //multiple select
              if ((new RegExp(thisMap.items[i], "gi")).test(input_clone.value)) {
                button_clone.setAttribute("selected", "true");
                button_clone.style.background = GeneralJs.colorChip.green;
                button_clone.style.boxShadow = GeneralJs.colorChip.green;
                button_clone.firstChild.style.color = GeneralJs.colorChip.white;
              } else {
                button_clone.setAttribute("selected", "false");
              }
              button_clone.addEventListener("click", function (e) {
                if (this.getAttribute("selected") === "false") {
                  this.style.background = GeneralJs.colorChip.green;
                  this.style.boxShadow = GeneralJs.colorChip.green;
                  this.firstChild.style.color = GeneralJs.colorChip.white;
                  this.setAttribute("selected", "true");
                } else {
                  this.style.background = GeneralJs.colorChip.gray2;
                  this.style.boxShadow = GeneralJs.colorChip.gray1;
                  this.firstChild.style.color = GeneralJs.colorChip.deactive;
                  this.setAttribute("selected", "false");
                }
                const children = this.parentNode.children;
                let value;
                value = '';
                for (let dom of children) {
                  if (dom.hasAttribute("selected")) {
                    if (dom.getAttribute("selected") === "true") {
                      value += dom.getAttribute("buttonValue");
                      value += ", ";
                    }
                  }
                }
                value = value.slice(0, -2);
                svg_clone.setAttribute("buttonValue", value);
              });
            }
            this.appendChild(button_clone);
          }

          if (thisMap.multiple !== undefined) {
            svg_clone = SvgTong.stringParsing(instance.mother.returnOk(GeneralJs.colorChip.green));
            svg_clone.classList.add("removeTarget");
            svg_clone.setAttribute("buttonValue", input_clone.value);
            style = {
              position: "absolute",
              top: String(((height * 2) * (thisMap.items.length + 1)) - 5) + ea,
              width: String(18) + ea,
              left: "calc(50% - " + String(18 / 2) + ea + ")",
              zIndex: String(3),
            };
            for (let j in style) {
              svg_clone.style[j] = style[j];
            }
            svg_clone.addEventListener("click", updateValueEvent);
            this.appendChild(svg_clone);
          }

        } else if (thisMap.type !== "object" && thisMap.address !== undefined && e.type === "click") {

          cancel_inputBack.style.background = GeneralJs.colorChip.white;
          // cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";

          this.style.overflow = "";
          height = Number(this.style.height.replace((new RegExp(ea, "gi")), ''));
          fontSize = Number(this.style.fontSize.replace((new RegExp(ea, "gi")), ''));
          top = height * 0.5;
          width = fontSize * 36;

          button_clone = GeneralJs.nodes.div.cloneNode(true);
          button_clone.classList.add("removeTarget");

          style = {
            position: "absolute",
            top: String((height * 1.9) - top) + ea,
            left: "calc(50% - " + String((width / 2) + 0.1) + ea + ")",
            width: String(width) + ea,
            paddingTop: String(height * 0.3) + ea,
            height: String(width * 0.9) + ea,
            background: GeneralJs.colorChip.white,
            zIndex: String(3),
            borderRadius: String(3) + ea,
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0px 2px 11px -6px #aaaaaa",
          };
          for (let i in style) {
            button_clone.style[i] = style[i];
          }

          iframe_clone = GeneralJs.nodes.iframe.cloneNode(true);
          iframe_clone.setAttribute("src", window.location.protocol + "//" + window.location.host + "/tools/address");
          iframe_clone.setAttribute("width", "100%");
          iframe_clone.setAttribute("height", "100%");
          iframe_clone.style.border = String(0);
          iframe_clone.style.borderRadius = String(3) + ea;
          button_clone.appendChild(iframe_clone);

          GeneralJs.stacks["addressEvent"] = async function (e) {
            updateValueEvent.call(button_clone, e);
            window.removeEventListener('message', GeneralJs.stacks["addressEvent"]);
            GeneralJs.stacks["addressEvent"] = null;
          }
          window.addEventListener('message', GeneralJs.stacks["addressEvent"]);

          this.appendChild(button_clone);

        } else if (thisMap.type === "object" && thisMap.inputFunction !== undefined) {

          cancel_inputBack.style.background = GeneralJs.colorChip.white;
          // cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";
          tempFunction = new Function("mother", "input", "callback", thisMap.inputFunction);
          tempFunction(this, input_clone, function () {
            let e = {};
            e.type = "keypress";
            e.keyCode = 13;
            updateValueEvent.call(input_clone, e);
            updateEventMother.style.overflow = "hidden";
          });

        } else {

          GeneralJs.timeouts.updateInputTimeout = setTimeout(function () {
            input_clone.focus();
            clearTimeout(GeneralJs.timeouts.updateInputTimeout);
            GeneralJs.timeouts.updateInputTimeout = null;
          }, 200);

        }
      }
    }
  }

  dragstartEventFunction = function (e) {
    e.dataTransfer.setData("dragData", e.target.parentNode.getAttribute("index"));
    const img = new Image();
    e.dataTransfer.setDragImage(img, 1, 1);
  }

  dragendEventFunction = function (e) {
    this.style.opacity = String(1);
    e.preventDefault();
  }

  dragenterEventFunction = function (e) {
    this.style.opacity = String(0.5);
    e.preventDefault();
  }

  dragleaveEventFunction = function (e) {
    this.style.opacity = String(1);
    e.preventDefault();
  }

  dragoverEventFunction = function (e) {
    this.style.opacity = String(0.5);
    e.preventDefault();
  }

  dropEventFunction = function (e) {
    e.preventDefault();
    this.style.opacity = String(1);
    const { info } = DataPatch.designerWhiteViewStandard();
    const movingColumn = e.dataTransfer.getData("dragData");
    const thisColumn = this.parentNode.getAttribute("index");
    let originalColumns, originalColumns_filtered, originalTops;
    let thisStorage;
    let movingColumnIndex, thisColumnIndex;
    let tempObj;
    let infoObj;
    let infoObjKey;

    infoObj = {};
    for (let c of info) {
      infoObj[c.target] = c.name;
    }
    infoObjKey = Object.keys(infoObj);

    originalColumns = [];
    originalColumns_filtered = [];
    originalTops = [];
    thisStorage = [];

    for (let c = 0; c < this.parentNode.parentNode.children.length; c++) {
      if (this.parentNode.parentNode.children[c].getAttribute("index") !== null && this.parentNode.parentNode.children[c].getAttribute("index") !== undefined) {
        if (infoObjKey.includes(this.parentNode.parentNode.children[c].getAttribute("index"))) {
          tempObj = { dom: this.parentNode.parentNode.children[c], name: this.parentNode.parentNode.children[c].getAttribute("index"), top: this.parentNode.parentNode.children[c].style.top };
          originalColumns.push(tempObj);
          originalTops.push(tempObj.top);
          if (tempObj.name === movingColumn) {
            movingColumnIndex = c;
          }
          if (tempObj.name === thisColumn) {
            thisColumnIndex = c;
          }
        }
      }
    }

    for (let c = 0; c < originalColumns.length; c++) {
      if (c !== movingColumnIndex) {
        if (c === thisColumnIndex) {
          originalColumns_filtered.push(originalColumns[movingColumnIndex]);
        }
        originalColumns_filtered.push(originalColumns[c]);
      }
    }

    for (let c = 0; c < originalColumns_filtered.length; c++) {
      originalColumns_filtered[c].dom.style.top = originalTops[c];
      originalColumns_filtered[c].top = originalTops[c];
    }

    originalColumns_filtered.sort((a, b) => {
      return Number(a.top.replace(/[^0-9\.\-]/gi, '')) - Number(b.top.replace(/[^0-9\.\-]/gi, ''));
    });

    for (let c = 0; c < originalColumns_filtered.length; c++) {
      thisStorage.push({ name: infoObj[originalColumns_filtered[c].name], target: originalColumns_filtered[c].name });
      this.parentNode.parentNode.insertBefore(originalColumns_filtered[originalColumns_filtered.length - 1 - c].dom, this.parentNode.parentNode.firstChild);
    }

    window.localStorage.setItem("designer_whiteOrder", JSON.stringify(thisStorage));

    e.stopPropagation();
  }

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    width: "100%",
    height: String(contentsBoxHeight) + ea,
    bottom: String(contentsBoxBottom) + ea,
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }

  //propoerty box
  propertyBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    left: String(leftMargin) + ea,
    width: "calc(45% - " + String(leftMargin + 30) + ea + ")",
    height: "100%",
  };
  for (let i in style) {
    propertyBox.style[i] = style[i];
  }

  if (window.localStorage.getItem("designer_whiteOrder") !== null && window.localStorage.getItem("designer_whiteOrder") !== undefined) {
    info = JSON.parse(window.localStorage.getItem("designer_whiteOrder"));
  }

  for (let i = 0; i < info.length; i++) {
    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.setAttribute("index", info[i].target);
    style = {
      position: "absolute",
      top: String(fontSize * lineHeightRatio * i) + ea,
      left: String(0) + ea,
      width: "100%",
      height: String(16) + ea,
    };
    for (let j in style) {
      div_clone3.style[j] = style[j];
    }

    //column name
    div_clone4 = GeneralJs.nodes.div.cloneNode(true);
    div_clone4.textContent = info[i].name;
    style = {
      display: "inline-block",
      position: "absolute",
      top: String(-0.8 * (fontSize / 15)) + ea,
      left: String(0) + ea,
      width: String(fontSize * 9) + ea,
      height: String(fontSize * (21 / 16)) + ea,
      fontSize: String(fontSize) + ea,
      fontWeight: String(700),
      cursor: "pointer",
    };
    for (let j in style) {
      div_clone4.style[j] = style[j];
    }
    div_clone4.setAttribute("draggable", "true");
    div_clone4.addEventListener("dragstart", dragstartEventFunction);
    div_clone4.addEventListener("dragenter", dragenterEventFunction);
    div_clone4.addEventListener("dragleave", dragleaveEventFunction);
    div_clone4.addEventListener("dragover", dragoverEventFunction);
    div_clone4.addEventListener("drop", dropEventFunction);
    div_clone3.appendChild(div_clone4);

    //value
    div_clone4 = GeneralJs.nodes.div.cloneNode(true);
    div_clone4.textContent = thisCase[info[i].target];
    style = {
      display: "inline-block",
      position: "absolute",
      top: String(-1.6 * (fontSize / 15)) + ea,
      left: String(fontSize * 9) + ea,
      width: "calc(100% - " + String(fontSize * 9) + ea + ")",
      height: String(fontSize * (21 / 16)) + ea,
      overflow: "scroll",
      fontSize: String(fontSize) + ea,
      fontWeight: String(300),
    };
    for (let j in style) {
      div_clone4.style[j] = style[j];
    }
    div_clone4.addEventListener("click", updateEventFunction());
    div_clone4.addEventListener("contextmenu", updateEventFunction());
    div_clone3.appendChild(div_clone4);

    propertyBox.appendChild(div_clone3);
  }

  div_clone2.appendChild(propertyBox);
  this.whiteBox.propertyBox = propertyBox;

  //contents box
  portfolioBox = GeneralJs.nodes.div.cloneNode(true);
  portfolioBox.classList.add("noScrollBar");
  style = {
    position: "absolute",
    height: "100%",
    bottom: String(0) + ea,
    right: String(leftMargin) + ea,
    width: "calc(55% - " + String(leftMargin) + ea + ")",
    overflow: "scroll",
    borderBottom: "1px solid #dddddd",
  };
  for (let i in style) {
    portfolioBox.style[i] = style[i];
  }

  //realtime
  GeneralJs.ajax("type=get&desid=" + thisCase[standard[1]], "/realtimeDesigner", function (data) {
    const dateArr = JSON.parse(data);
    let div_clone3, div_clone4, div_clone5;

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.setAttribute("index", "realtimeDesigner");
    style = {
      position: "absolute",
      top: String(fontSize * lineHeightRatio * info.length) + ea,
      left: String(0) + ea,
      width: "100%",
      height: String(16) + ea,
    };
    for (let j in style) {
      div_clone3.style[j] = style[j];
    }

    //column name
    div_clone4 = GeneralJs.nodes.div.cloneNode(true);
    div_clone4.textContent = "가능 일정";
    style = {
      display: "inline-block",
      position: "absolute",
      top: String(-0.8 * (fontSize / 15)) + ea,
      left: String(0) + ea,
      width: String(fontSize * 9) + ea,
      height: String(fontSize * (21 / 16)) + ea,
      fontSize: String(fontSize) + ea,
      fontWeight: String(700),
    };
    for (let j in style) {
      div_clone4.style[j] = style[j];
    }
    div_clone3.appendChild(div_clone4);

    //value
    div_clone4 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      display: "inline-block",
      position: "absolute",
      top: String(-1.2 * (fontSize / 15)) + ea,
      left: String(fontSize * 9) + ea,
      width: "calc(100% - " + String(fontSize * 9) + ea + ")",
      height: String(fontSize * (21 / 16)) + ea,
      overflow: "scroll",
      fontSize: String(fontSize) + ea,
      fontWeight: String(300),
    };
    for (let j in style) {
      div_clone4.style[j] = style[j];
    }

    for (let j = 0; j < dateArr.length; j++) {
      div_clone5 = GeneralJs.nodes.div.cloneNode(true);
      div_clone5.textContent = String(dateArr[j].year).slice(2) + '년' + ' ' + String(dateArr[j].month) + '월';
      style = {
        display: "inline-block",
        position: "relative",
        top: String(-1.6 * (fontSize / 15)) + ea,
        marginRight: String(14) + ea,
        fontSize: String(fontSize) + ea,
        fontWeight: String(300),
        cursor: "pointer",
        color: (dateArr[j].onoff ? GeneralJs.colorChip.green : GeneralJs.colorChip.deactive),
      };
      for (let j in style) {
        div_clone5.style[j] = style[j];
      }
      div_clone5.setAttribute("year", String(dateArr[j].year));
      div_clone5.setAttribute("month", String(dateArr[j].month));
      div_clone5.setAttribute("onoff", (dateArr[j].onoff ? "true" : "false"));
      div_clone5.addEventListener("click", async function (e) {
        try {
          let onoff;
          if (this.getAttribute("onoff") === "true") {
            onoff = 0;
            this.style.color = GeneralJs.colorChip.deactive;
            this.setAttribute("onoff", "false");
          } else {
            onoff = 1;
            this.style.color = GeneralJs.colorChip.green;
            this.setAttribute("onoff", "true");
          }
          await GeneralJs.ajaxPromise("type=update&year=" + this.getAttribute("year") + "&month=" + this.getAttribute("month") + "&onoff=" + String(onoff) + "&desid=" + thisCase[standard[1]], "/realtimeDesigner");
        } catch (e) {
          GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
          console.log(e);
        }
      });
      div_clone4.appendChild(div_clone5);
    }

    div_clone3.appendChild(div_clone4);
    propertyBox.appendChild(div_clone3);
  });

  //projects
  GeneralJs.ajax("noFlat=true&where=" + JSON.stringify({ "$or": [ { desid: thisCase[standard[1]], "process.status": "진행중" }, { desid: thisCase[standard[1]], "process.status": "대기" } ] }), "/getProjects", async function (data) {
    try {
      const projects = JSON.parse(data);

      let clients, pairs;
      let div_clone3, div_clone4, div_clone5, div_clone6;
      let areaMotherTop, areaTop;
      let margin;
      let whereQuery;
      whereQuery = {};
      whereQuery["$or"] = [];
      for (let p of projects) {
        whereQuery["$or"].push({ cliid: p.cliid });
      }

      pairs = [];
      if (whereQuery["$or"].length > 0) {
        clients = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify(whereQuery), "/getClients"));
        for (let p of projects) {
          for (let c of clients) {
            if (p.cliid === c.cliid) {
              pairs.push({ proid: p.proid, name: c.name });
            }
          }
        }
      }

      areaMotherTop = fontSize * lineHeightRatio * (info.length + 2);
      areaTop = (-1.6 * (fontSize / 15)) - 0.9;
      margin = 10;

      div_clone3 = GeneralJs.nodes.div.cloneNode(true);
      div_clone3.setAttribute("index", "realtimeProjects");
      style = {
        position: "absolute",
        top: String(areaMotherTop) + ea,
        left: String(0) + ea,
        width: "100%",
        height: String(16) + ea,
      };
      for (let j in style) {
        div_clone3.style[j] = style[j];
      }

      //column name
      div_clone4 = GeneralJs.nodes.div.cloneNode(true);
      div_clone4.textContent = "진행중 프로젝트";
      style = {
        display: "inline-block",
        position: "absolute",
        top: String(-0.8 * (fontSize / 15)) + ea,
        left: String(0) + ea,
        width: String(fontSize * 9) + ea,
        height: String(fontSize * (21 / 16)) + ea,
        fontSize: String(fontSize) + ea,
        fontWeight: String(700),
      };
      for (let j in style) {
        div_clone4.style[j] = style[j];
      }
      div_clone3.appendChild(div_clone4);

      //value area
      div_clone4 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        display: "inline-block",
        position: "absolute",
        top: String(areaTop) + ea,
        left: String(fontSize * 9) + ea,
        padding: String(margin) + ea,
        width: "calc(100% - " + String((fontSize * 9) + (margin * 2)) + ea + ")",
        height: String(Math.abs(contentsBoxHeight) - Math.abs(areaMotherTop) + Math.abs(areaTop) - (margin * 2)) + ea,
        background: GeneralJs.colorChip.gray0,
        borderRadius: String(4) + ea,
      };
      for (let j in style) {
        div_clone4.style[j] = style[j];
      }

      //value scroll box
      div_clone5 = GeneralJs.nodes.div.cloneNode(true);
      div_clone5.classList.add("noScrollBar");
      style = {
        display: "inline-block",
        position: "absolute",
        top: String(margin) + ea,
        left: String(margin) + ea,
        width: "calc(100% - " + String(margin * 2) + ea + ")",
        height: "calc(100% - " + String(margin * 2) + ea + ")",
        overflow: "scroll",
      };
      for (let j in style) {
        div_clone5.style[j] = style[j];
      }
      div_clone4.appendChild(div_clone5);

      //value detail
      for (let z = 0; z < pairs.length; z++) {
        div_clone6 = GeneralJs.nodes.div.cloneNode(true);
        div_clone6.classList.add("hoverDefault");
        div_clone6.addEventListener("click", function (e) {
          window.open(window.location.protocol + "//" + window.location.host + "/project?proid=" + pairs[z].proid, "_blank");
        });
        div_clone6.insertAdjacentHTML('beforeend', pairs[z].name + ' <b style="color:#2fa678;font-size:' + String(fontSize - 5) + ea + '" >' + pairs[z].proid + '</b>');
        style = {
          display: "inline-block",
          position: "relative",
          fontSize: String(fontSize - 2.5) + ea,
          fontWeight: String(600),
          background: GeneralJs.colorChip.white,
          paddingTop: String(margin / 2) + ea,
          paddingBottom: String(margin * 0.65) + ea,
          paddingRight: String(margin) + ea,
          paddingLeft: String(margin) + ea,
          marginRight: String(margin / 2) + ea,
          marginBottom: String(margin / 2) + ea,
          borderRadius: String(3) + ea,
        };
        for (let j in style) {
          div_clone6.style[j] = style[j];
        }
        div_clone5.appendChild(div_clone6);
      }
      div_clone4.appendChild(div_clone5);
      div_clone3.appendChild(div_clone4);
      propertyBox.appendChild(div_clone3);

    } catch (e) {
      GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
      console.log(e);
    }
  });

  //contents
  GeneralJs.ajax("noFlat=true&where=" + JSON.stringify({ desid: thisCase[standard[1]] }), "/getContents", async function (data) {
    try {
      const contents = JSON.parse(data);
      let totalTong;
      let div_clone, div_clone2, div_clone3;
      let img_clone;
      let style = {};
      let ea = "px";
      let height, margin, fontSize, titleHeight, totalWidth;
      let tempNumber;
      let ghost;
      let leftArea, rightArea;
      let notYetContents;

      totalTong = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "relative",
      };
      for (let i in style) {
        totalTong.style[i] = style[i];
      }

      height = 200;
      margin = 20;
      fontSize = 15;
      titleHeight = fontSize + 5;

      ghost = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ desid: thisCase[standard[1]] }), "/getDesigners"))[0].setting.ghost;
      notYetContents = JSON.parse(await GeneralJs.ajaxPromise("desid=" + thisCase[standard[1]], "/getDesignerGhost"));
      notYetContents.push(ghost);

      for (let i = 0; i < contents.length + notYetContents.length; i++) {

        //unit tong
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "relative",
          width: "100%",
          height: String(height) + ea,
          borderRadius: String(3) + ea,
          marginBottom: String(margin) + ea,
        };
        for (let j in style) {
          div_clone.style[j] = style[j];
        }

        //moving area - left
        leftArea = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          bottom: String(0) + ea,
          left: String(0) + ea,
          opacity: String(0),
          height: String(170) + ea,
          width: String(42) + ea,
          zIndex: String(1),
          cursor: "w-resize",
        };
        for (let s in style) {
          leftArea.style[s] = style[s];
        }
        GeneralJs.stacks[thisCase[standard[1]] + "first_boo_left" + String(i)] = true;
        leftArea.addEventListener("mouseover", function (e) {
          const targetNode = this.nextElementSibling.nextElementSibling.nextElementSibling.children[0];
          if (GeneralJs.stacks[thisCase[standard[1]] + "first_boo_left" + String(i)]) {
            GeneralJs.stacks[thisCase[standard[1]] + "first_left" + String(i)] = targetNode.getBoundingClientRect().left;
            GeneralJs.stacks[thisCase[standard[1]] + "first_boo_left" + String(i)] = false;
          }
          GeneralJs.timeouts[thisCase[standard[1]] + "contents_left" + String(i)] = setInterval(function () {
            let left = targetNode.getBoundingClientRect().left;
            targetNode.parentElement.scrollTo({ left: GeneralJs.stacks[thisCase[standard[1]] + "first_left" + String(i)] - left - 100, behavior: "smooth" });
          }, 80);
        });
        leftArea.addEventListener("mouseleave", function (e) {
          clearInterval(GeneralJs.timeouts[thisCase[standard[1]] + "contents_left" + String(i)]);
        });
        div_clone.appendChild(leftArea);

        //moving area - right
        rightArea = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          bottom: String(0) + ea,
          right: String(0) + ea,
          opacity: String(0),
          height: String(170) + ea,
          width: String(42) + ea,
          zIndex: String(1),
          cursor: "e-resize",
        };
        for (let s in style) {
          rightArea.style[s] = style[s];
        }
        GeneralJs.stacks[thisCase[standard[1]] + "first_boo_right" + String(i)] = true;
        rightArea.addEventListener("mouseover", function (e) {
          const targetNode = this.nextElementSibling.nextElementSibling.children[0];
          if (GeneralJs.stacks[thisCase[standard[1]] + "first_boo_right" + String(i)]) {
            GeneralJs.stacks[thisCase[standard[1]] + "first_right" + String(i)] = targetNode.getBoundingClientRect().left;
            GeneralJs.stacks[thisCase[standard[1]] + "first_boo_right" + String(i)] = false;
          }
          GeneralJs.timeouts[thisCase[standard[1]] + "contents_right" + String(i)] = setInterval(function () {
            let left = targetNode.getBoundingClientRect().left;
            targetNode.parentElement.scrollTo({ left: GeneralJs.stacks[thisCase[standard[1]] + "first_right" + String(i)] - left + 100, behavior: "smooth" });
          }, 80);
        });
        rightArea.addEventListener("mouseleave", function (e) {
          clearInterval(GeneralJs.timeouts[thisCase[standard[1]] + "contents_right" + String(i)]);
        });
        div_clone.appendChild(rightArea);

        //title
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.classList.add("hoverDefault");
        if (i < contents.length) {
          div_clone2.textContent = contents[i].contents.portfolio.pid + " : " + contents[i].contents.portfolio.title.main;
        } else {
          div_clone2.textContent = "기타 미등록 포트폴리오";
        }
        style = {
          position: "absolute",
          top: String(GeneralJs.isMac() ? 0 : -2) + ea,
          left: String(0) + ea,
          fontSize: String(fontSize) + ea,
          fontWeight: String(600),
          color: "#404040",
          width: "100%",
          height: String(titleHeight) + ea,
          cursor: "pointer",
        };
        for (let j in style) {
          div_clone2.style[j] = style[j];
        }
        if (i < contents.length) {
          div_clone2.addEventListener("click", function (e) {
            window.open(window.location.protocol + "//" + window.location.host + "/contents?pid=" + contents[i].contents.portfolio.pid, "_blank");
          });
        }
        div_clone.appendChild(div_clone2);

        //picture tong
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.classList.add("noScrollBar");
        style = {
          position: "relative",
          top: String(titleHeight + (margin / 2) + (GeneralJs.isMac() ? 0 : -2)) + ea,
          left: String(0) + ea,
          background: GeneralJs.colorChip.gray0,
          borderRadius: String(4) + ea,
          width: "100%",
          height: String(height - (titleHeight + (margin / 2))) + ea,
          overflow: "scroll",
          cursor: "pointer"
        };
        for (let j in style) {
          div_clone2.style[j] = style[j];
        }

        //picture scroll box
        div_clone3 = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "relative",
          width: String(5000) + ea,
          height: String(height - (titleHeight + (margin / 2)) - margin) + ea,
          top: String(margin / 2) + ea,
          left: String(margin / 2) + ea,
        };
        for (let j in style) {
          div_clone3.style[j] = style[j];
        }

        //pictures
        totalWidth = 0;
        if (i < contents.length) {

          for (let j = 0; j < contents[i].photos.detail.length; j++) {
            img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.src = S3HOST + "/corePortfolio/listImage/" + contents[i].contents.portfolio.pid + "/t" + String(contents[i].photos.detail[j].index) + contents[i].contents.portfolio.pid + ".jpg";
            img_clone.addEventListener("dblclick", function (e) {
              e.preventDefault();
              window.open(S3HOST + "/corePortfolio/original/" + contents[i].contents.portfolio.pid + "/i" + String(contents[i].photos.detail[j].index) + contents[i].contents.portfolio.pid + ".jpg", "_blank");
            });
            style = {
              display: "inline-block",
              position: "relative",
              height: String(height - (titleHeight + (margin / 2)) - margin) + ea,
              marginRight: String(margin / 2) + ea,
              borderRadius: String(3) + ea,
            };
            if (j === contents[i].photos.detail.length - 1) {
              delete style.marginRight;
            }

            if (contents[i].photos.detail[j].gs === 'g') {
              tempNumber = (height - (titleHeight + (margin / 2)) - margin) * (297 / 210);
              style.width = String(tempNumber) + ea;
            } else {
              tempNumber = (height - (titleHeight + (margin / 2)) - margin) * (210 / 297);
              style.width = String(tempNumber) + ea;
            }
            totalWidth = tempNumber + totalWidth + (margin / 2);

            for (let k in style) {
              img_clone.style[k] = style[k];
            }
            div_clone3.appendChild(img_clone);
          }

        } else {

          for (let j = 0; j < notYetContents[i - contents.length].length; j++) {
            img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.src = S3HOST + notYetContents[i - contents.length][j].link;
            img_clone.addEventListener("dblclick", function (e) {
              e.preventDefault();
              window.open(S3HOST + notYetContents[i - contents.length][j].link, "_blank");
            });
            style = {
              display: "inline-block",
              position: "relative",
              height: String(height - (titleHeight + (margin / 2)) - margin) + ea,
              marginRight: String(margin / 2) + ea,
              borderRadius: String(3) + ea,
            };
            if (j === notYetContents[i - contents.length].length - 1) {
              delete style.marginRight;
            }

            if (notYetContents[i - contents.length][j].sgTrue === 'g') {
              tempNumber = (height - (titleHeight + (margin / 2)) - margin) * (297 / 210);
              style.width = String(tempNumber) + ea;
            } else {
              tempNumber = (height - (titleHeight + (margin / 2)) - margin) * (210 / 297);
              style.width = String(tempNumber) + ea;
            }
            totalWidth = tempNumber + totalWidth + (margin / 2);

            for (let k in style) {
              img_clone.style[k] = style[k];
            }
            div_clone3.appendChild(img_clone);
          }

        }

        div_clone3.style.width = String(totalWidth) + ea;

        div_clone2.appendChild(div_clone3);
        GeneralJs.addScrollXEvent(div_clone2);
        div_clone.appendChild(div_clone2);

        //unit tong end
        totalTong.appendChild(div_clone);
      }
      portfolioBox.appendChild(totalTong);

    } catch (e) {
      GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
      console.log(e);
    }
  });

  div_clone2.appendChild(portfolioBox);
  contentsArea = div_clone2;
  this.whiteBox.portfolioBox = portfolioBox;

  //h inital event
  GeneralJs.stacks["hInitialBoxButtonToggle"] = 0;
  hInitialBox.addEventListener("click", function (e) {
    if (GeneralJs.stacks["hInitialBoxButtonToggle"] === 0) {
      propertyBox.style.opacity = String(0);
      portfolioBox.style.width = "calc(100% - " + String(leftMargin * 2) + ea + ")";
      GeneralJs.stacks["hInitialBoxButtonToggle"] = 1;
    } else {
      propertyBox.style.opacity = String(1);
      portfolioBox.style.width = "calc(55% - " + String(leftMargin) + ea + ")";
      GeneralJs.stacks["hInitialBoxButtonToggle"] = 0;
    }
  });

  //convert event
  convertIconBox.addEventListener("click", function (e) {
    window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=checklist&desid=" + thisCase[standard[1]];
  });

  //end ---------------------------------------------
  div_clone.appendChild(contentsArea);
  mother.appendChild(div_clone);
}

DesignerJs.checkListSseEvent = function (e) {
  const { desid, column, type, order } = JSON.parse(e.data);
  const idName = desid + "_" + column;
  const targetDom = document.getElementById(idName);
  const rangeConstant = "checkRange";
  const matrixConstant = "designerMatrixFactor";
  let temp, flatTong, matrixFactors;
  if (targetDom !== null) {
    const { children } = targetDom;
    if (type === "check" || type === "radio") {
      for (let i = 0; i < children.length; i++) {
        if (order[i] === 1) {
          children[i].setAttribute("toggle", "on");
          children[i].style.background = GeneralJs.colorChip.green;
          children[i].children[0].style.color = GeneralJs.colorChip.white;
        } else {
          children[i].setAttribute("toggle", "off");
          children[i].style.background = GeneralJs.colorChip.gray1;
          children[i].children[0].style.color = GeneralJs.colorChip.deactive;
        }
      }
    } else if (type === "range") {
      for (let i = 0; i < children.length; i++) {
        children[i].querySelector("." + rangeConstant + column + "_value").firstChild.textContent = String(order[i].value);
        temp = children[i].querySelectorAll("." + rangeConstant + column + "_boxes");
        for (let j = 0; j < temp.length; j++) {
          if (order[i].value > j) {
            temp[j].style.background = GeneralJs.colorChip.green;
          } else {
            temp[j].style.background = GeneralJs.colorChip.gray1;
          }
        }
      }
    } else if (type === "input") {
      targetDom.querySelector("input").value = order[0];
    } else if (type === "matrix") {
      flatTong = [];
      for (let z = 0; z < order[0].length; z++) {
        for (let i = 0; i < order.length; i++) {
          for (let j = 0; j < order[i][z].length; j++) {
            flatTong.push(order[i][z][j]);
          }
        }
      }
      matrixFactors = document.querySelectorAll('.' + matrixConstant);
      for (let i = 0; i < matrixFactors.length; i++) {
        if (flatTong[i] !== (matrixFactors[i].getAttribute("toggle") === "on" ? 1 : 0)) {
          matrixFactors[i].click();
        }
      }
    }
  }
}

DesignerJs.prototype.whiteCancelMaker = function (callback = null, recycle = false) {
  const instance = this;
  return function (e) {

    GeneralJs.stacks.whiteBox = 1;

    //color name
    let domTargets;
    for (let z = 0; z < instance.standardDoms.length; z++) {
      if (z !== 0) {
        domTargets = instance.standardDoms[z].children;
        domTargets[0].style.color = domTargets[1].style.color = "#404040";
      } else {
        domTargets = instance.standardDoms[z].children;
        domTargets[0].style.color = domTargets[1].style.color = "#2fa678";
      }
    }

    //animation
    if (!recycle) {
      instance.whiteBox.cancelBox.classList.remove("justfadein");
      instance.whiteBox.cancelBox.classList.add("justfadeout");
    }
    instance.whiteBox.contentsBox.classList.remove("fadeup");
    instance.whiteBox.contentsBox.classList.add("fadedown");

    //aspirant search
    if (instance.aspirants_searchInput !== null) {
      instance.aspirants_searchInput.previousElementSibling.style.opacity = String(1);
      instance.aspirants_searchInput.parentNode.removeChild(instance.aspirants_searchInput);
      instance.aspirants_searchInput = null;
    }

    //sse close
    if (instance.whiteSse !== null && instance.whiteSse !== undefined) {
      instance.whiteSse.close();
      instance.whiteSse = null;
    }

    //dom delete
    GeneralJs.timeouts.whiteBox = setTimeout(function () {
      instance.whiteBox.contentsBox.remove();
      if (!recycle) {
        instance.whiteBox.cancelBox.remove();
        instance.whiteBox = null;
      }
      if (callback !== null) {
        callback();
      }
      clearTimeout(GeneralJs.timeouts.whiteBox);
      GeneralJs.timeouts.whiteBox = null;
      GeneralJs.stacks.whiteBox = 0;
    }, 401);
  }
}

DesignerJs.prototype.whiteViewMakerDetail = function (index, recycle = false) {
  const instance = this;
  const { standard, info } = DataPatch.designerWhiteViewStandard();
  return function () {
    const thisCase = { ...instance.cases[index], index };
    let div_clone;
    let style;
    let ea = "px";
    let margin;
    let domTargets;
    let motherBoo;
    let indexArr, requestIndex;

    motherBoo = (instance.onView === "mother") ? true : false;

    for (let z = 0; z < instance.standardDoms.length; z++) {
      if (z !== index && z !== 0) {
        domTargets = instance.standardDoms[z].children;
        domTargets[0].style.color = domTargets[1].style.color = "#cccccc";
      } else {
        domTargets = instance.standardDoms[z].children;
        domTargets[0].style.color = domTargets[1].style.color = "#2fa678";
      }
    }

    margin = 30;

    if (!recycle) {

      instance.whiteBox = {};

      //cancel box
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("justfadein");
      style = {
        position: "fixed",
        background: "#404040",
        top: String(0) + ea,
        left: String(motherBoo ? instance.grayBarWidth : 0) + ea,
        width: "calc(100% - " + String(motherBoo ? instance.grayBarWidth : 0) + ea + ")",
        height: "calc(100% - " + String(instance.belowHeight) + ea + ")",
        zIndex: String(2),
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }

      div_clone.addEventListener("click", instance.whiteCancelMaker());

      instance.whiteBox.cancelBox = div_clone;
      instance.totalContents.appendChild(div_clone);

    }

    //contents box
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("fadeup");
    div_clone.classList.add("totalWhite");

    indexArr = [];
    for (let dom of document.querySelectorAll('.' + thisCase["desid"])) {
      indexArr.push(Number(dom.getAttribute("index")));
    }
    indexArr.sort((a, b) => { return a - b; });
    for (let z = 0; z < indexArr.length; z++) {
      if (indexArr[z] === index) {
        requestIndex = z;
      }
    }

    div_clone.setAttribute("index", thisCase["desid"]);
    div_clone.setAttribute("request", String(requestIndex));

    style = {
      position: "fixed",
      background: GeneralJs.colorChip.white,
      top: String(margin) + ea,
      left: String((motherBoo ? instance.grayBarWidth : 0) + margin) + ea,
      borderRadius: String(5) + ea,
      boxShadow: "0 2px 10px -6px #808080",
      width: String(window.innerWidth - (motherBoo ? instance.grayBarWidth : 0) - (margin * 2)) + ea,
      height: String(window.innerHeight - instance.belowHeight - (margin * 2) - 10) + ea,
      zIndex: String(2),
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    instance.whiteContentsMaker(thisCase, div_clone);
    instance.whiteBox.contentsBox = div_clone;
    instance.whiteBox.index = index;
    instance.whiteBox.id = thisCase[standard[1]];
    instance.totalContents.appendChild(div_clone);
    GeneralJs.stacks.whiteBox = 0;
  }
}

DesignerJs.prototype.whiteViewMaker = function (index) {
  const instance = this;
  return function (e) {
    let tempFunc;
    instance.whiteMatrixA = null;
    instance.whiteMatrixB = null;
    if (GeneralJs.stacks.whiteBox !== 1 && instance.cases[index] !== undefined) {
      if (instance.whiteBox !== null && instance.whiteBox.index !== index) {
        tempFunc = instance.whiteCancelMaker(instance.whiteViewMakerDetail(index, true), true);
        tempFunc();
      } else if (instance.whiteBox === null) {
        tempFunc = instance.whiteViewMakerDetail(index, false);
        tempFunc();
      }
    }
  }
}

DesignerJs.prototype.rowViewMaker = function () {
  const instance = this;
  return function (e) {
    if (instance.totalFather !== null) {
      instance.totalFather.style.zIndex = String(-1);
      instance.totalFather.classList.remove("fadein");
      instance.totalFather.classList.add("fadeout");
    }
    instance.totalMother.classList.remove("justfadeoutoriginal");
    instance.totalMother.classList.add("justfadeinoriginal");
    instance.onView = "mother";
    GeneralJs.timeouts.fadeinTimeout = setTimeout(function () {
      if (instance.totalFather !== null) {
        instance.totalFatherChildren = [];
        instance.totalFather.remove();
      }
      instance.totalFather = null;
      instance.totalMother.classList.remove("justfadeinoriginal");
      clearTimeout(GeneralJs.timeouts.fadeinTimeout);
      GeneralJs.timeouts.fadeinTimeout = null;
    }, 401);
  }
}

DesignerJs.prototype.returnValueEventMaker = function () {
  const instance = this;
  return async function (e) {
    let pastObj;
    let textTargets;
    let mother, nodeArr;
    let targetNode;
    let white;
    let totalWhiteNode;
    let father;
    let targetFatherNode;

    textTargets = [];
    pastObj = await GeneralJs.returnValue();

    //mother
    mother = document.querySelector(".totalMother");
    nodeArr = [];
    for (let node of mother.children[2].children) {
      if (node.className === pastObj.thisId) {
        nodeArr.push(node);
      }
    }
    if (nodeArr.length === 0) {
      return;
    }
    nodeArr.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")); });
    targetNode = nodeArr[Number(pastObj.requestIndex)];
    for (let node of targetNode.children) {
      if (node.getAttribute("column") === pastObj.column) {
        textTargets.push(node);
      }
    }

    //white
    if (document.querySelector(".totalWhite") !== null) {
      totalWhiteNode = instance.whiteBox.propertyBox.children;
      for (let node of totalWhiteNode) {
        if (node.getAttribute("index") === pastObj.column) {
          textTargets.push(node.children[1]);
        }
      }
    }

    //father
    if (document.querySelector(".totalFather") !== null) {
      nodeArr = [];
      for (let node of instance.totalFatherChildren) {
        if (node.getAttribute("desid") === pastObj.thisId) {
          nodeArr.push(node);
        }
      }
      nodeArr.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) });
      targetFatherNode = nodeArr[Number(pastObj.requestIndex)];
      for (let node of targetFatherNode.children) {
        if (node.className.split("_")[1] === pastObj.column) {
          textTargets.push(node);
        }
      }
    }

    for (let i of textTargets) {
      i.textContent = pastObj.value;
    }
    instance.cases[Number(pastObj.index)][pastObj.column] = pastObj.value;

  }
}

DesignerJs.prototype.reportContents = function (data, mother, loadingIcon, callback = function (doms) {}) {
  const instance = this;
  const zeroAddition = function (number) {
    if (number < 10) {
      return "0" + String(number);
    } else {
      return String(number);
    }
  }
  const stringToDateValue = function (str) {
    let tempArr0, tempArr1, tempArr2;
    let resultDate;
    tempArr0 = str.split(" ");
    tempArr1 = tempArr0[0].split("-");
    tempArr2 = tempArr0[1].split(":");
    resultDate = new Date(Number(tempArr1[0]), Number(tempArr1[1].replace(/^0/, '')) - 1, Number(tempArr1[2].replace(/^0/, '')), Number(tempArr2[0].replace(/^0/, '')), Number(tempArr2[1].replace(/^0/, '')), Number(tempArr2[2].replace(/^0/, '')));
    return resultDate.valueOf();
  }
  const stringToCareerNumber = function (str) {
    let tempArr0, tempArr1, tempArr2;
    tempArr0 = str.split("년 ");
    return (Number(tempArr0[0].replace(/[^0-9]/g, '').replace(/^0/, '')) * 12) + Number(tempArr0[1].replace(/[^0-9]/g, '').replace(/^0/, ''));
  }
  class DataDoms extends Array {
    pickValue(colmun, index) {
      let targetDom;
      for (let i of this[index].children) {
        if (i.getAttribute("column") === column) {
          targetDom = i.firstChild;
        }
      }
      return targetDom.textContent;
    }
    valueFilter(column, value, reverse=false) {
      let arr, boo;
      arr = [];
      for (let i of this) {
        boo = false;
        for (let j of i.children) {
          if (j.getAttribute("column") === column) {
            if (j.firstChild.textContent === value) {
              boo = true;
            }
          }
        }
        if (value === "all") {
          boo = true;
        }
        if (reverse ? !boo : boo) {
          arr.push(i);
        }
      }
      return arr;
    }
  }
  const columns = Object.keys(data.columns);
  const { portfolioBooArr, alarmStandard, updateStandard, binaryStandard, dbNameMap, titleNameMap, columnRelativeMap, cardViewMap, reportTargetMap, sameStandard, editables } = DataPatch.designerRawMap();
  const map = columnRelativeMap[data.mode];
  let div_clone, gray_line;
  let text_div;
  let style;
  let ea;
  let temp, tempArr, tempObj;
  let mainMargin, mainTopBottom;
  let subMargin;
  let motherWidth;
  let titleArea;
  let titleFontSize, titleHeight;
  let titleIcon0, titleIcon1, titleIcon2;
  let titleIcon0_2, titleIcon0_3, titleIcon0_4;
  let dataArea;
  let dataScrollBox;
  let dataTitleZone;
  let dataTitleBox;
  let dataTitleFactor;
  let dataTitleFactors;
  let dataDataZone;
  let dataDataBox;
  let dataDataFactor;
  let dataDataFactorsTotal, dataDataFactors;
  let dataDoms;
  let reportArea;
  let reportScrollBox;
  let visualSpecific;
  let relativeRatio;
  let totalWidth;
  let fixedWidth;
  let factorsMargin;
  let iconHeight;
  let moveTargets, moveParsing, moveAmount;
  let sortTargets;
  let columnIndex;
  let dataAreaToCardEvent;
  let reportHeight;
  let reportFontSize;
  let reportTextWidth, reportTextHeight;
  let reportContentsBox;
  let reportTargetColumn;
  let reportTargetColumnTong;
  let reportTargetAllBox;
  let reportTargetNumberValue;
  let reportScrollBoxTotalWidth;
  let editFunction;
  let tempFunction, tempFunctionOutput;
  let tempWidth0, tempWidth1, tempWidth2;
  let reportSortTitleTop;
  let alarmTargets;
  let alarmCircle;


  motherWidth = Number(mother.style.width.replace((new RegExp(ea + '$')), ''));
  ea = "px";
  mainMargin = 45;
  subMargin = 15;
  mainTopBottom = mainMargin - 4;

  titleFontSize = 22;
  titleHeight = 28;
  iconHeight = 11;

  reportHeight = 90;
  visualSpecific = 2.5
  relativeRatio = 1.2;

  factorsMargin = 10;

  reportFontSize = 21;

  moveTargets = [];
  moveParsing = function (dom, move) {
    let number;
    let ea;
    let translateX;
    translateX = dom.style.transform;
    ea = "px";
    number = Number(translateX.replace(/[^0-9\-\.]/gi, ''));
    return { style: "translateX(" + String(number + move) + ea + ")", number: number + move };
  }
  moveAmount = (data.mode === "presentation") ? 200 : 360;

  totalWidth = 100;
  for (let i of columns) {
    totalWidth += (data.columns[i].relative * relativeRatio) + factorsMargin;
  }

  dataArea = {};
  dataDataZone = {};
  sortTargets = [];
  dataDataFactorsTotal = [];
  alarmTargets = [];

  titleIcon0 = {};
  titleIcon0_2 = {};
  titleIcon0_3 = {};
  titleIcon0_4 = {};

  editFunction = function (thisColumnName, inputFunction, outputFunction) {
    return {
      calendar: function (e) {
        e.stopPropagation();
        if (e.cancelable) {
          e.preventDefault();
        }
        const grandMother = this.parentNode.parentNode;
        const mother = this.parentNode;
        const { top: grandMotherTop, left: grandMotherLeft } = grandMother.getBoundingClientRect();
        const { top, left, height, width } = this.getBoundingClientRect();
        const targetSpot = this.firstChild;
        const thisWidth = Number(this.style.width.replace(/[^0-9\.\-]/gi, ''));
        const thisDate = inputFunction(targetSpot.textContent);
        const thisStandard = this.getAttribute("standard");
        const ea = "px";
        let style, calendarWidth, calendarHeight, cancelBack, calendar, calendarTong;
        let whiteTop, whiteLeft;

        calendarTong = GeneralJs.nodes.div.cloneNode(true);
        calendar = instance.mother.makeCalendar(thisDate, function (e) {
          e.stopPropagation();

          const dateString = this.getAttribute("buttonValue");
          let tempArr, thisDate;
          let finalValue;
          let promptData;

          tempArr = dateString.split('-');
          thisDateObj = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));

          finalValue = outputFunction(thisDateObj);

          promptData = window.prompt("시간을 한글 없이, 숫자 형태로만 적어주세요! (예 : 오후 2시 => 14, 오전 9시 => 9, 오후 11시 => 23, 새벽 12시 => 0)");
          promptData = Number(promptData.replace(/[^0-9]/g, ''));
          if (Number.isNaN(promptData)) {
            promptData = 14;
          }
          if (!(promptData >= 0 && promptData < 24)) {
            promptData = 14;
          }

          finalValue = finalValue.slice(0, -3) + String(promptData) + '시';

          targetSpot.style.width = "";
          targetSpot.style.left = "";

          targetSpot.textContent = finalValue;

          targetSpot.style.left = String((thisWidth / 2) - (targetSpot.getBoundingClientRect().width / 2) - 2) + ea;
          targetSpot.style.width = String(targetSpot.getBoundingClientRect().width + 4) + ea;

          GeneralJs.ajax("standard=" + thisStandard + "&column=" + thisColumnName + "&value=" + finalValue + "&calendar=true", "/updateDesignerReport", function (res) {
            let statusDom;

            mother.setAttribute("alarm", "off");
            for (let dom of mother.children) {
              if (alarmStandard[data.mode].target.includes(dom.getAttribute("column"))) {
                if (dom.querySelector("svg") !== null) {
                  dom.querySelector("svg").remove();
                }
                dom.setAttribute("alarm", "off");
              }
              if (dom.getAttribute("column") === alarmStandard[data.mode].standard) {
                statusDom = dom;
              }
            }

            if (alarmStandard[data.mode].value.includes(statusDom.firstChild.textContent)) {
              statusDom.firstChild.textContent = alarmStandard[data.mode].convertValue;
              GeneralJs.ajax("standard=" + thisStandard + "&column=" + alarmStandard[data.mode].standard + "&value=" + alarmStandard[data.mode].convertValue, "/updateDesignerReport", function (res) {});
            }

            for (let obj of data.data) {
              if (obj.phone === thisStandard) {
                obj[thisColumnName] = finalValue;
                if (alarmStandard[data.mode].value.includes(statusDom.firstChild.textContent)) {
                  obj[alarmStandard[data.mode].standard] = alarmStandard[data.mode].convertValue;
                }
              }
            }

            GeneralJs.stacks.reportSortTitleFunction();

            grandMother.removeChild(grandMother.lastChild);
            grandMother.removeChild(grandMother.lastChild);
          });
        });
        calendarWidth = Number(calendar.calendarBase.style.width.replace(/[^0-9\.\-]/gi, ''));
        calendarHeight = Number(calendar.calendarBase.style.height.replace(/[^0-9\.\-]/gi, ''));
        whiteTop = grandMother.scrollTop + top - grandMotherTop + height + 5;
        whiteLeft = left - grandMotherLeft + (width / 2) - (calendarWidth / 2);

        style = {
          position: "absolute",
          background: GeneralJs.colorChip.white,
          top: String(whiteTop) + ea,
          left: String(whiteLeft) + ea,
          boxShadow: "0px 4px 14px -8px #808080",
          paddingTop: String(1) + ea,
          borderRadius: String(5) + ea,
          animation: "fadeuplite 0.3s ease forwards",
          width: String(calendarWidth) + ea,
          height: String(calendarHeight) + ea,
          overflow: "hidden",
        };
        GeneralJs.timeouts["designerReportEditableCalendar"] = setTimeout(function () {
          calendarTong.style.animation = "";
          clearTimeout(GeneralJs.timeouts["designerReportEditableCalendar"]);
          GeneralJs.timeouts["designerReportEditableCalendar"] = null;
        }, 301);
        for (let i in style) {
          calendarTong.style[i] = style[i];
        }

        moveTargets.push(calendarTong);

        cancelBack = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          background: "gray",
          opacity: String(0),
          top: String(0) + ea,
          left: String(0) + ea,
          width: String(100) + '%',
          height: String(6 + (36 * data.data.length) + 500) + ea,
          animation: "justfadein 0.3s ease forwards",
        };
        for (let i in style) {
          cancelBack.style[i] = style[i];
        }

        cancelBack.addEventListener("click", function (e) {
          cancelBack.parentNode.removeChild(calendarTong);
          cancelBack.parentNode.removeChild(cancelBack);
        });

        grandMother.appendChild(cancelBack);
        calendarTong.appendChild(calendar.calendarBase);
        grandMother.appendChild(calendarTong);
      },
      menu: function (e) {
        e.stopPropagation();
        if (e.cancelable) {
          e.preventDefault();
        }
        const grandMother = this.parentNode.parentNode;
        const mother = this.parentNode;
        const { top: grandMotherTop, left: grandMotherLeft } = grandMother.getBoundingClientRect();
        const { top, left, height, width } = this.getBoundingClientRect();
        const targetSpot = this.firstChild;
        const thisWidth = Number(this.style.width.replace(/[^0-9\.\-]/gi, ''));
        const items = outputFunction();
        const thisItem = inputFunction(targetSpot.textContent);
        const thisStandard = this.getAttribute("standard");
        const ea = "px";
        let style;
        let itemsTong;
        let itemFactor;
        let itemStyle, itemTextStyle;
        let text_div;
        let tongWidth, tongHeight;
        let itemHeight;
        let cancelBack;
        let whiteTop, whiteLeft;
        let itemClickEvent;

        tongWidth = 80;
        itemHeight = 32;

        whiteTop = grandMother.scrollTop + top - grandMotherTop + height + 5;
        whiteLeft = left - grandMotherLeft + (width / 2) - (tongWidth / 2);

        itemClickEvent = function (e) {
          e.stopPropagation();
          if (e.cancelable) {
            e.preventDefault();
          }

          let finalValue;

          finalValue = this.getAttribute("value");

          targetSpot.style.left = "";
          targetSpot.style.width = "";
          targetSpot.firstChild.textContent = finalValue;
          targetSpot.style.left = String((thisWidth / 2) - (targetSpot.getBoundingClientRect().width / 2) - 2) + ea;
          targetSpot.style.width = String(targetSpot.getBoundingClientRect().width + 4) + ea;

          GeneralJs.ajax("standard=" + thisStandard + "&column=" + thisColumnName + "&value=" + finalValue, "/updateDesignerReport", function (res) {
            let alarmCircle;

            if (alarmStandard[data.mode].standard === thisColumnName) {
              if (!alarmStandard[data.mode].value.includes(finalValue)) {
                mother.setAttribute("alarm", "off");
                for (let dom of mother.children) {
                  if (alarmStandard[data.mode].target.includes(dom.getAttribute("column"))) {
                    if (dom.querySelector("svg") !== null) {
                      dom.querySelector("svg").remove();
                    }
                    dom.setAttribute("alarm", "off");
                  }
                }
              } else {
                mother.setAttribute("alarm", "on");
                for (let dom of mother.children) {
                  if (alarmStandard[data.mode].target.includes(dom.getAttribute("column"))) {
                    alarmCircle = SvgTong.stringParsing(instance.mother.returnCircle("position:absolute;transform:scale(0.4);transform-origin:100% 0%;right:-5.5px;top:" + (GeneralJs.isMac() ? String(4) : String(2)) + "px;", "#FF5F57"));
                    dom.firstChild.appendChild(alarmCircle);
                    dom.setAttribute("alarm", "on");
                  }
                }
              }
            }

            for (let obj of data.data) {
              if (obj.phone === thisStandard) {
                obj[thisColumnName] = finalValue;
              }
            }

            GeneralJs.stacks.reportSortTitleFunction();

            if (/드[랍롭]/.test(finalValue)) {
              titleIcon0.click();
            }

            grandMother.removeChild(grandMother.lastChild);
            grandMother.removeChild(grandMother.lastChild);
          });
        }

        //item tong
        itemsTong = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          top: String(whiteTop) + ea,
          left: String(whiteLeft) + ea,
          paddingTop: String(1) + ea,
          animation: "fadeuplite 0.3s ease forwards",
          width: String(tongWidth) + ea,
        };
        for (let i in style) {
          itemsTong.style[i] = style[i];
        }

        GeneralJs.timeouts["designerReportEditableMenuBox"] = setTimeout(function () {
          itemsTong.style.animation = "";
          clearTimeout(GeneralJs.timeouts["designerReportEditableMenuBox"]);
          GeneralJs.timeouts["designerReportEditableMenuBox"] = null;
        }, 301);

        moveTargets.push(itemsTong);

        //set item style
        itemStyle = {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          height: String(itemHeight) + ea,
          background: GeneralJs.colorChip.white,
          boxShadow: "0px 2px 14px -8px #808080",
          borderRadius: String(3) + ea,
          marginBottom: String(5) + ea,
          cursor: "pointer",
        };
        itemTextStyle = {
          fontSize: String(13) + ea,
          fontWeight: String(500),
          position: "absolute",
          width: String(100) + '%',
          top: String(GeneralJs.isMac() ? 6 : 8) + ea,
          textAlign: "center",
          color: "#2fa678",
        };

        //append items
        for (let i = 0; i < items.length; i++) {
          itemFactor = GeneralJs.nodes.div.cloneNode(true);
          for (let j in itemStyle) {
            itemFactor.style[j] = itemStyle[j];
          }
          text_div = GeneralJs.nodes.div.cloneNode(true);
          text_div.classList.add("hoverDefault_lite");
          text_div.textContent = items[i];
          for (let j in itemTextStyle) {
            text_div.style[j] = itemTextStyle[j];
          }
          itemFactor.appendChild(text_div);
          itemFactor.setAttribute("value", items[i]);
          itemFactor.addEventListener("click", itemClickEvent);
          itemsTong.appendChild(itemFactor);
        }

        //cancel back
        cancelBack = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          background: "gray",
          opacity: String(0),
          top: String(0) + ea,
          left: String(0) + ea,
          width: String(100) + '%',
          height: String(6 + (36 * data.data.length) + 500) + ea,
          animation: "justfadein 0.3s ease forwards",
        };
        for (let i in style) {
          cancelBack.style[i] = style[i];
        }

        cancelBack.addEventListener("click", function (e) {
          cancelBack.parentNode.removeChild(itemsTong);
          cancelBack.parentNode.removeChild(cancelBack);
        });

        //end
        grandMother.appendChild(cancelBack);
        grandMother.appendChild(itemsTong);
      }
    };
  }

  //title area
  titleArea = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    paddingTop: String(mainTopBottom) + ea,
    paddingLeft: String(mainMargin) + ea,
    height: String(titleHeight) + ea,
  };
  for (let i in style) {
    titleArea.style[i] = style[i];
  }

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.textContent = data.title;
  style = {
    display: "inline-block",
    position: "relative",
    width: "auto",
    fontSize: String(titleFontSize) + ea,
    fontWeight: String(600),
    bottom: String(GeneralJs.isMac() ? 0 : -2) + ea,
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }
  titleArea.appendChild(div_clone);


  titleIcon0 = GeneralJs.nodes.div.cloneNode(true);
  titleIcon0.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    height: String(15) + ea,
    width: String(300) + ea,
    bottom: String(0) + ea,
  };
  for (let i in style) {
    titleIcon0.style[i] = style[i];
  }
  text_div = GeneralJs.nodes.div.cloneNode(true);
  text_div.textContent = "전체 보기";
  style = {
    position: "absolute",
    fontSize: String(13) + ea,
    bottom: String(0) + ea,
    fontWeight: String(500),
    color: (data.mode === "total" ? "#2fa678" : "#cccccc"),
  };
  for (let i in style) {
    text_div.style[i] = style[i];
  }
  titleIcon0.appendChild(text_div);
  titleIcon0.addEventListener("click", function (e) {
    while (mother.firstChild !== loadingIcon) {
      mother.removeChild(mother.firstChild);
    }
    while (mother.lastChild !== loadingIcon) {
      mother.removeChild(mother.lastChild);
    }
    loadingIcon.style.opacity = "1";
    GeneralJs.ajax("mode=total", "/getDesignerReport", function (data) {
      loadingIcon.style.opacity = "0";
      instance.reportContents(JSON.parse(data), mother, loadingIcon);
    });
  });
  titleArea.appendChild(titleIcon0);


  titleIcon0_2 = GeneralJs.nodes.div.cloneNode(true);
  titleIcon0_2.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    height: String(15) + ea,
    width: String(300) + ea,
    bottom: String(0) + ea,
  };
  for (let i in style) {
    titleIcon0_2.style[i] = style[i];
  }
  text_div = GeneralJs.nodes.div.cloneNode(true);
  text_div.textContent = "설명회";
  style = {
    position: "absolute",
    fontSize: String(13) + ea,
    bottom: String(0) + ea,
    fontWeight: String(500),
    color: (data.mode === "presentation" ? "#2fa678" : "#cccccc"),
  };
  for (let i in style) {
    text_div.style[i] = style[i];
  }
  titleIcon0_2.appendChild(text_div);
  titleIcon0_2.addEventListener("click", function (e) {
    while (mother.firstChild !== loadingIcon) {
      mother.removeChild(mother.firstChild);
    }
    while (mother.lastChild !== loadingIcon) {
      mother.removeChild(mother.lastChild);
    }
    loadingIcon.style.opacity = "1";
    GeneralJs.ajax("mode=presentation", "/getDesignerReport", function (data) {
      loadingIcon.style.opacity = "0";
      instance.reportContents(JSON.parse(data), mother, loadingIcon);
    });
  });
  titleArea.appendChild(titleIcon0_2);


  titleIcon0_3 = GeneralJs.nodes.div.cloneNode(true);
  titleIcon0_3.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    height: String(15) + ea,
    width: String(300) + ea,
    bottom: String(0) + ea,
  };
  for (let i in style) {
    titleIcon0_3.style[i] = style[i];
  }
  text_div = GeneralJs.nodes.div.cloneNode(true);
  text_div.textContent = "파트너십";
  style = {
    position: "absolute",
    fontSize: String(13) + ea,
    bottom: String(0) + ea,
    fontWeight: String(500),
    color: (data.mode === "partnership" ? "#2fa678" : "#cccccc"),
  };
  for (let i in style) {
    text_div.style[i] = style[i];
  }
  titleIcon0_3.appendChild(text_div);
  titleIcon0_3.addEventListener("click", function (e) {
    while (mother.firstChild !== loadingIcon) {
      mother.removeChild(mother.firstChild);
    }
    while (mother.lastChild !== loadingIcon) {
      mother.removeChild(mother.lastChild);
    }
    loadingIcon.style.opacity = "1";
    GeneralJs.ajax("mode=partnership", "/getDesignerReport", function (data) {
      loadingIcon.style.opacity = "0";
      instance.reportContents(JSON.parse(data), mother, loadingIcon);
    });
  });
  titleArea.appendChild(titleIcon0_3);


  titleIcon0_4 = GeneralJs.nodes.div.cloneNode(true);
  titleIcon0_4.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    height: String(15) + ea,
    width: String(300) + ea,
    bottom: String(0) + ea,
  };
  for (let i in style) {
    titleIcon0_4.style[i] = style[i];
  }
  text_div = GeneralJs.nodes.div.cloneNode(true);
  text_div.textContent = "추출";
  style = {
    position: "absolute",
    fontSize: String(13) + ea,
    bottom: String(0) + ea,
    fontWeight: String(500),
    color: "#cccccc",
  };
  for (let i in style) {
    text_div.style[i] = style[i];
  }
  titleIcon0_4.appendChild(text_div);
  titleIcon0_4.addEventListener("click", function (e) {
    const today = new Date();
    const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
    let ajaxData, matrix, tempArr;
    let targetWhite, grayBack, style, ea;

    matrix = [];

    tempArr = [];
    for (let c of columns) {
      tempArr.push(map[c].name);
    }
    matrix.push(tempArr);

    for (let i of data.data) {
      tempArr = [];
      for (let c of columns) {
        tempArr.push(i[c]);
      }
      matrix.push(tempArr);
    }

    ajaxData = '';
    ajaxData += "values=";
    ajaxData += JSON.stringify(matrix).replace(/&/g, '').replace(/=/g, '');
    ajaxData += "&newMake=";
    ajaxData += "true";
    ajaxData += "&parentId=";
    ajaxData += parentId;
    ajaxData += "&sheetName=";
    ajaxData += "fromDB_rawDesigner_" + String(today.getFullYear()) + instance.mother.todayMaker();

    ea = "px";
    targetWhite = loadingIcon.parentNode;

    loadingIcon.style.opacity = String(1);
    loadingIcon.style.zIndex = String(1);

    grayBack = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: String(100) + '%',
      height: String(100) + '%',
      background: "#cccccc",
      opacity: String(0.4),
      top: String(0) + ea,
      left: String(0) + ea,
      animation: "justfadein 0.3s ease",
    };
    for (let i in style) {
      grayBack.style[i] = style[i];
    }
    targetWhite.appendChild(grayBack);

    GeneralJs.ajax(ajaxData, "/sendSheets", function (res) {
      const { link } = JSON.parse(res);
      loadingIcon.style.opacity = String(0);
      loadingIcon.style.zIndex = String(0);
      targetWhite.removeChild(targetWhite.lastChild);
      window.open(link, "_blank");
    });
  });
  titleArea.appendChild(titleIcon0_4);


  titleIcon1 = SvgTong.stringParsing(this.mother.returnArrow("left", "#2fa678"));
  titleIcon1.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    width: String(iconHeight * SvgTong.getRatio(titleIcon1)) + ea,
    height: String(iconHeight) + ea,
    right: String(mainMargin + 18) + ea,
    bottom: String(0) + ea,
  };
  for (let i in style) {
    titleIcon1.style[i] = style[i];
  }
  titleIcon1.addEventListener("click", function (e) {
    let tempObj;
    let minArr;
    let minimumMove;
    minArr = [];
    for (let dom of moveTargets) {
      tempObj = moveParsing(dom, (moveAmount * -1));
      minArr.push(tempObj.number);
    }
    minArr.sort((a, b) => { return a - b; });

    minimumMove = moveAmount * -1;

    for (let dom of moveTargets) {
      tempObj = moveParsing(dom, (moveAmount * 1));
      if (minArr[0] >= minimumMove) {
        dom.style.transform = "translateX(0px)";
      } else {
        dom.style.transform = tempObj.style;
      }
    }
  });
  titleArea.appendChild(titleIcon1);

  titleIcon2 = SvgTong.stringParsing(this.mother.returnArrow("right", "#2fa678"));
  titleIcon2.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    width: String(iconHeight * SvgTong.getRatio(titleIcon1)) + ea,
    height: String(iconHeight) + ea,
    right: String(mainMargin) + ea,
    bottom: String(0) + ea,
  };
  for (let i in style) {
    titleIcon2.style[i] = style[i];
  }
  titleIcon2.addEventListener("click", function (e) {
    let tempObj;
    let standard;
    let maxArr;
    standard = dataArea.getBoundingClientRect().width - (mainMargin * 2);
    maxArr = [];
    for (let dom of moveTargets) {
      tempObj = moveParsing(dom, (moveAmount * -1));
      maxArr.push(tempObj.number);
    }
    maxArr.sort((a, b) => { return b - a; });
    for (let dom of moveTargets) {
      tempObj = moveParsing(dom, (moveAmount * -1));
      if (maxArr[0] <= standard - totalWidth) {
        dom.style.transform = "translateX(" + String(standard - totalWidth) + "px)";
      } else {
        dom.style.transform = tempObj.style;
      }
    }
  });
  titleArea.appendChild(titleIcon2);
  mother.appendChild(titleArea);

  titleIcon0.style.left = String(mainMargin + div_clone.getBoundingClientRect().width + 11) + ea;
  tempWidth0 = titleIcon0.firstChild.getBoundingClientRect().width;
  titleIcon0.style.width = String(tempWidth0 + 1) + ea;

  titleIcon0_2.style.left = String(mainMargin + div_clone.getBoundingClientRect().width + 11 + tempWidth0 + 9) + ea;
  tempWidth1 = titleIcon0_2.firstChild.getBoundingClientRect().width;
  titleIcon0_2.style.width = String(tempWidth1 + 1) + ea;

  titleIcon0_3.style.left = String(mainMargin + div_clone.getBoundingClientRect().width + 11 + tempWidth0 + 9 + tempWidth1 + 9) + ea;
  tempWidth2 = titleIcon0_3.firstChild.getBoundingClientRect().width;
  titleIcon0_3.style.width = String(tempWidth2 + 1) + ea;

  titleIcon0_4.style.left = String(mainMargin + div_clone.getBoundingClientRect().width + 11 + tempWidth0 + 9 + tempWidth1 + 9 + tempWidth2 + 9) + ea;
  titleIcon0_4.style.width = String(titleIcon0_4.firstChild.getBoundingClientRect().width + 1) + ea;

  //data area
  dataArea = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    paddingLeft: String(mainMargin) + ea,
    paddingRight: String(mainMargin) + ea,
    width: "calc(100% - " + String(mainMargin * 2) + ea + ")",
    height: "calc(calc(100% - " + String(((mainMargin * 2) + visualSpecific) + titleHeight) + ea + ") - " + String(reportHeight) + ea + ")",
  };
  for (let i in style) {
    dataArea.style[i] = style[i];
  }

  dataAreaToCardEvent = function (e) {
    const thisCase = this.parentNode;
    const thisIndex = Number(this.getAttribute("index"));
    const thisRelation = (this.getAttribute(sameStandard.name) === "true");
    const thisRelationIndex = thisRelation ? 1 : 0;
    const thisBinary = (this.getAttribute(binaryStandard.name) === "true");
    const thisBinaryIndex = thisBinary ? 1 : 0;
    const thisFolderId = this.getAttribute(binaryStandard.target);
    const thisData = data.data[thisIndex];
    const { designer, phone } = thisData;
    let newArea;
    let cardArea;
    let div_clone, text_div;
    let style;
    let ea;
    let cardTitleWidth, cardTitleHeight;
    let cardTitleTop;
    let cardMargin;
    let cardGrayBar;
    let contentsStartTop;
    let lineHeight, indexNumber, valueIndent;
    let cardTitleFontSize, cardDefaultFontSize;
    let buttonsTargets;
    let buttonsWidthAddtion;
    let titleIcon1, titleIcon2;
    let cardValueTong;
    let tempBoo;

    ea = "px";
    cardMargin = 42;
    cardTitleTop = 30;
    lineHeight = 30;
    valueIndent = 120;
    cardTitleFontSize = 38;
    cardDefaultFontSize = 15;

    //initial
    newArea = dataArea.cloneNode(true);
    newArea.style.position = "absolute";
    newArea.style.top = String(mainTopBottom + titleHeight) + ea;
    cardArea = newArea.firstChild;

    while (cardArea.firstChild) {
      cardArea.removeChild(cardArea.lastChild);
    }

    if (e.noFadeInAnimation !== undefined) {
      newArea.style.transition = "all 0s ease";
      dataArea.style.transition = "all 0s ease";
      newArea.style.animation = "fadein 0s ease forwards";
      dataArea.style.animation = "fadeout 0s ease forwards";
    } else {
      newArea.style.transition = "all 0.3s ease";
      dataArea.style.transition = "all 0.3s ease";
      newArea.style.animation = "fadein 0.3s ease forwards";
      dataArea.style.animation = "fadeout 0.3s ease forwards";
    }
    dataArea.parentNode.insertBefore(newArea, dataArea.nextElementSibling);

    //button setting
    buttonsTargets = [
      {
        toggle: [ "목록으로", "목록으로" ],
        click: function (e) {
          dataArea.parentNode.removeChild(newArea);
          dataArea.style.animation = "fadein 0.3s ease forwards";
        },
        color: [ "#404040", "#404040" ],
        mode: null,
      },
      {
        toggle: [ ((data.mode !== "partnership") ? "파트너십 신청 안 함" : "설명회 신청 안 함"), ((data.mode !== "partnership") ? "파트너십 신청" : "설명회 신청") ],
        click: function (e) {
          if (thisRelation) {
            while (mother.firstChild !== loadingIcon) {
              mother.removeChild(mother.firstChild);
            }
            while (mother.lastChild !== loadingIcon) {
              mother.removeChild(mother.lastChild);
            }
            loadingIcon.style.opacity = "1";
            GeneralJs.ajax("mode=" + ((data.mode === "presentation") ? "partnership" : "presentation"), "/getDesignerReport", function (data) {
              loadingIcon.style.opacity = "0";
              instance.reportContents(JSON.parse(data), mother, loadingIcon, function (doms) {
                const target = (doms.valueFilter("phone", phone))[0];
                GeneralJs.timeouts["convertDesignerReportTimeouts"] = setTimeout(function () {
                  target.firstChild.click();
                  clearTimeout(GeneralJs.timeouts["convertDesignerReportTimeouts"]);
                  GeneralJs.timeouts["convertDesignerReportTimeouts"] = null;
                }, 0);
              });
            });
          } else {
            alert("추가 신청이 없습니다!");
          }
        },
        color: [ "#c1272d", "#2fa678" ],
        mode: "opposite",
      },
      {
        toggle: [ "포트폴리오 없음", "포트폴리오 보기" ],
        click: function (e) {
          let str;
          if (thisFolderId !== null) {
            if (!/^__link__/.test(thisFolderId)) {
              str = "https://drive.google.com/drive/folders/";
              str += thisFolderId;
              str += "?usp=sharing";
            } else {
              str = thisFolderId.replace(/^__link__/, '');
            }
            for (let doms of thisCase.children) {
              if (portfolioBooArr.includes(doms.getAttribute("column"))) {
                if (doms.firstChild.querySelector("svg") !== null) {
                  doms.firstChild.querySelector("svg").remove();
                }
              }
            }
            GeneralJs.ajax("standard=" + phone + "&user=" + instance.user.email, "/viewDesignerRawPortfolio", function (data) {});
            window.open(str, "_blank");
          } else {
            alert("포트폴리오가 없습니다!");
          }
        },
        color: [ "#c1272d", "#2fa678" ],
        mode: "binary",
      },
    ];

    //name
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("hoverDefault_lite");
    style = {
      position: "relative",
      marginTop: String(cardTitleTop) + ea,
      left: String(cardMargin) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }
    text_div = GeneralJs.nodes.div.cloneNode(true);
    text_div.textContent = designer;
    style = {
      position: "absolute",
      fontSize: String(cardTitleFontSize) + ea,
      fontWeight: String(500),
      top: String(0) + ea,
    };
    for (let i in style) {
      text_div.style[i] = style[i];
    }
    div_clone.addEventListener("click", buttonsTargets[0].click);
    div_clone.appendChild(text_div);
    cardArea.appendChild(div_clone);

    cardTitleWidth = text_div.getBoundingClientRect().width;
    cardTitleHeight = text_div.getBoundingClientRect().height;

    div_clone.style.width = String(cardTitleWidth) + ea;
    div_clone.style.height = String(cardTitleHeight) + ea;

    //phone
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("hoverDefault_lite");
    style = {
      position: "absolute",
      top: String((cardTitleTop * 2) - (cardMargin - cardTitleFontSize)) + ea,
      left: String(cardMargin + cardTitleWidth + 11) + ea,
      width: String(1000) + ea,
      transition: "all 0s ease",
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }
    text_div = GeneralJs.nodes.div.cloneNode(true);
    text_div.textContent = phone;
    style = {
      position: "absolute",
      fontSize: String(cardDefaultFontSize + 1) + ea,
      fontWeight: String(200),
      color: "#2fa678",
      top: String(0) + ea,
    };
    for (let i in style) {
      text_div.style[i] = style[i];
    }
    div_clone.appendChild(text_div);
    div_clone.addEventListener("click", buttonsTargets[0].click);
    cardArea.appendChild(div_clone);

    cardTitleWidth = text_div.getBoundingClientRect().width;
    cardTitleHeight = text_div.getBoundingClientRect().height;

    div_clone.style.width = String(cardTitleWidth) + ea;
    div_clone.style.height = String(cardTitleHeight) + ea;

    //icons
    titleIcon1 = SvgTong.stringParsing(instance.mother.returnArrow("left", "#2fa678"));
    titleIcon1.classList.add("hoverDefault_lite");
    style = {
      position: "absolute",
      width: String(iconHeight * SvgTong.getRatio(titleIcon1)) + ea,
      height: String(iconHeight) + ea,
      right: String(cardMargin + 18) + ea,
      top: String(64) + ea,
    };
    for (let i in style) {
      titleIcon1.style[i] = style[i];
    }
    titleIcon1.addEventListener("click", function (e) {
      if (thisCase.previousElementSibling !== null) {
        dataArea.parentNode.removeChild(newArea);
        e.noFadeInAnimation = true;
        dataAreaToCardEvent.call(thisCase.previousElementSibling.firstChild, e);
      }
    });
    cardArea.appendChild(titleIcon1);

    titleIcon2 = SvgTong.stringParsing(instance.mother.returnArrow("right", "#2fa678"));
    titleIcon2.classList.add("hoverDefault_lite");
    style = {
      position: "absolute",
      width: String(iconHeight * SvgTong.getRatio(titleIcon1)) + ea,
      height: String(iconHeight) + ea,
      right: String(cardMargin) + ea,
      top: String(64) + ea,
    };
    for (let i in style) {
      titleIcon2.style[i] = style[i];
    }
    titleIcon2.addEventListener("click", function (e) {
      if (thisCase.nextElementSibling !== null) {
        dataArea.parentNode.removeChild(newArea);
        e.noFadeInAnimation = true;
        dataAreaToCardEvent.call(thisCase.nextElementSibling.firstChild, e);
      }
    });
    cardArea.appendChild(titleIcon2);

    //gray bar
    contentsStartTop = ((cardTitleTop * 2) - (cardMargin - cardTitleFontSize)) + cardTitleHeight + 12;
    cardGrayBar = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      top: String(contentsStartTop) + ea,
      borderTop: "1px solid #dddddd",
      width: "calc(100% - " + String(cardMargin * 2) + ea + ")",
      left: String(cardMargin) + ea,
    };
    for (let i in style) {
      cardGrayBar.style[i] = style[i];
    }
    cardArea.appendChild(cardGrayBar);

    //card values
    cardValueTong = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      marginTop: String(11) + ea,
      width: "calc(100% - " + String(cardMargin * 2) + ea + ")",
      left: String(cardMargin) + ea,
      height: "calc(100% - " + String(130) + ea + ")",
      overflow: "scroll",
    };
    for (let i in style) {
      cardValueTong.style[i] = style[i];
    }
    cardArea.appendChild(cardValueTong);

    contentsStartTop = contentsStartTop + cardTitleTop;
    indexNumber = 0;
    for (let obj of cardViewMap[data.mode]) {

      //column name
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        top: String(cardTitleTop + (lineHeight * indexNumber)) + ea,
        left: String(0) + ea,
        width: String(2000) + ea,
        transition: "all 0s ease",
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }
      text_div = GeneralJs.nodes.div.cloneNode(true);
      text_div.textContent = map[obj.column].name;
      style = {
        position: "absolute",
        fontSize: String(cardDefaultFontSize) + ea,
        fontWeight: String(600),
        color: "#404040",
        top: String(0) + ea,
      };
      for (let i in style) {
        text_div.style[i] = style[i];
      }
      div_clone.appendChild(text_div);
      cardValueTong.appendChild(div_clone);

      cardTitleWidth = text_div.getBoundingClientRect().width;
      cardTitleHeight = text_div.getBoundingClientRect().height;

      div_clone.style.width = String(cardTitleWidth) + ea;
      div_clone.style.height = String(cardTitleHeight) + ea;

      //value
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        top: String(cardTitleTop + (lineHeight * indexNumber)) + ea,
        left: String(valueIndent) + ea,
        width: String(12000) + ea,
        overflow: "scroll",
        transition: "all 0s ease",
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }
      text_div = GeneralJs.nodes.div.cloneNode(true);
      if (obj.complex !== undefined) {
        text_div.textContent = thisData[obj.column];
        text_div.textContent = text_div.textContent + " ";
        for (let c of obj.complex) {
          text_div.textContent = text_div.textContent + thisData[c];
          text_div.textContent = text_div.textContent + " ";
        }
        text_div.textContent = text_div.textContent.slice(0, -1);
      } else {
        text_div.textContent = thisData[obj.column];
      }
      style = {
        position: "absolute",
        fontSize: String(cardDefaultFontSize) + ea,
        fontWeight: String(300),
        textAlign: "left",
        color: "#404040",
        top: String(0) + ea,
      };
      for (let i in style) {
        text_div.style[i] = style[i];
      }
      div_clone.appendChild(text_div);
      cardValueTong.appendChild(div_clone);

      cardTitleWidth = text_div.getBoundingClientRect().width;
      cardTitleHeight = text_div.getBoundingClientRect().height;

      div_clone.style.width = String(cardTitleWidth) + ea;
      div_clone.style.height = String(cardTitleHeight) + ea;
      text_div.style.width = String(cardTitleWidth) + ea;
      div_clone.style.width = "calc(100% - " + String(valueIndent) + ea + ")";

      indexNumber++;
    }

    //buttons
    buttonsWidthAddtion = 0;
    for (let obj of buttonsTargets) {

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        bottom: String(cardMargin - 2) + ea,
        right: String(cardMargin + buttonsWidthAddtion) + ea,
        width: String(1000) + ea,
        border: "1px solid #dddddd",
        borderRadius: String(3) + ea,
        transition: "all 0s ease",
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }
      text_div = GeneralJs.nodes.div.cloneNode(true);
      text_div.textContent = obj.toggle[obj.mode === "binary" ? thisBinaryIndex : thisRelationIndex];
      text_div.classList.add("hoverDefault_lite");
      style = {
        position: "absolute",
        fontSize: String(cardDefaultFontSize - 1) + ea,
        fontWeight: String(600),
        color: obj.color[obj.mode === "binary" ? thisBinaryIndex : thisRelationIndex],
        top: String(5) + ea,
        left: String(13) + ea,
      };
      for (let i in style) {
        text_div.style[i] = style[i];
      }
      div_clone.appendChild(text_div);
      cardArea.appendChild(div_clone);

      cardTitleWidth = text_div.getBoundingClientRect().width;
      cardTitleHeight = text_div.getBoundingClientRect().height;

      div_clone.style.width = String(cardTitleWidth + (13 * 2)) + ea;
      div_clone.style.height = String(cardTitleHeight + (5 * 2) + 2) + ea;

      div_clone.addEventListener("click", obj.click);

      buttonsWidthAddtion = buttonsWidthAddtion + (cardTitleWidth + (13 * 2)) + 10;
    }
  }

  dataScrollBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    top: String(subMargin) + ea,
    height: "calc(100% - " + String(subMargin) + ea + ")",
    border: "1px solid #dddddd",
    borderRadius: String(4) + ea,
  };
  for (let i in style) {
    dataScrollBox.style[i] = style[i];
  }

  dataTitleZone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    height: String(46) + ea,
    borderBottom: "1px solid #dddddd",
    overflow: "hidden",
  };
  for (let i in style) {
    dataTitleZone.style[i] = style[i];
  }

  dataTitleBox = GeneralJs.nodes.div.cloneNode(true);
  moveTargets.push(dataTitleBox);
  style = {
    position: "relative",
    height: String(46) + ea,
    width: String(totalWidth) + ea,
    transform: "translateX(" + String(0) + ea + ")",
  };
  for (let i in style) {
    dataTitleBox.style[i] = style[i];
  }

  dataTitleFactors = [];

  columnIndex = 0;
  for (let z of columns) {
    dataTitleFactor = GeneralJs.nodes.div.cloneNode(true);
    dataTitleFactor.classList.add("hoverDefault_lite");
    style = {
      display: "inline-block",
      position: "relative",
      height: "100%",
      width: String(1000) + ea,
      transition: "all 0s ease",
      opacity: String(0),
      overflow: "hidden",
      marginRight: String(factorsMargin) + ea,
    };
    for (let i in style) {
      dataTitleFactor.style[i] = style[i];
    }

    text_div = GeneralJs.nodes.div.cloneNode(true);
    text_div.textContent = data.columns[z].name;
    style = {
      position: "absolute",
      top: String(GeneralJs.isMac() ? 12 : 13) + ea,
      fontSize: String(14) + ea,
      fontWeight: String(600),
      width: "auto",
      color: "#2fa678",
      transition: "all 0s ease",
      textAlign: "center",
    };
    for (let i in style) {
      text_div.style[i] = style[i];
    }
    dataTitleFactor.appendChild(text_div);
    dataTitleFactor.setAttribute("index", String(columnIndex));
    dataTitleFactor.setAttribute("sort_toggle", String(1));
    dataTitleFactor.addEventListener("click", function (e) {
      const columnIndex = Number(this.getAttribute("index"));
      const toggle = Number(this.getAttribute("sort_toggle"));
      if (map[z].sort === "string") {
        sortTargets.sort((a, b) => {
          if (b.children[columnIndex].firstChild.textContent >= a.children[columnIndex].firstChild.textContent) {
            return -1 * toggle;
          } else {
            return 1 * toggle;
          }
        });
      } else if (map[z].sort === "number") {
        sortTargets.sort((a, b) => {
          return toggle * (Number(a.children[columnIndex].firstChild.textContent.replace(/[^0-9]/g, '')) - Number(b.children[columnIndex].firstChild.textContent.replace(/[^0-9]/g, '')));
        });
      } else if (map[z].sort === "date") {
        sortTargets.sort((a, b) => {
          return toggle * (stringToDateValue(a.children[columnIndex].firstChild.textContent) - stringToDateValue(b.children[columnIndex].firstChild.textContent));
        });
      } else if (map[z].sort === "career") {
        sortTargets.sort((a, b) => {
          return toggle * (stringToCareerNumber(a.children[columnIndex].firstChild.textContent) - stringToCareerNumber(b.children[columnIndex].firstChild.textContent));
        });
      }
      for (let div of sortTargets) {
        dataDataZone.appendChild(div);
      }
      this.setAttribute("sort_toggle", String(-1 * toggle));
    });

    dataTitleFactors.push({ tong: dataTitleFactor, text: text_div, width: (data.columns[z].relative * relativeRatio) });
    dataTitleBox.appendChild(dataTitleFactor);
    columnIndex++;
  }
  dataTitleZone.appendChild(dataTitleBox);
  dataScrollBox.appendChild(dataTitleZone);

  dataDataZone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    paddingTop: String(6) + ea,
    paddingBottom: String(200) + ea,
    height: "calc(100% - " + String(46 + (6 + 200)) + ea + ")",
    overflowY: "scroll",
    overflowX: "hidden",
  };
  for (let i in style) {
    dataDataZone.style[i] = style[i];
  }

  dataDoms = new DataDoms();
  for (let j = 0; j < data.data.length; j++) {
    dataDataBox = GeneralJs.nodes.div.cloneNode(true);
    dataDataBox.setAttribute("index", String(j));
    dataDataBox.setAttribute("standard", data.data[j][data.standard]);
    dataDataBox.setAttribute(sameStandard.name, String(data.data[j][sameStandard.name]));
    dataDataBox.setAttribute(binaryStandard.name, String(data.data[j][binaryStandard.name]));
    if (alarmStandard[data.mode].value.includes(data.data[j][alarmStandard[data.mode].standard])) {
      dataDataBox.setAttribute("alarm", "on");
    } else {
      dataDataBox.setAttribute("alarm", "off");
    }
    moveTargets.push(dataDataBox);
    style = {
      height: String(36) + ea,
      width: String(totalWidth) + ea,
      transform: "translateX(" + String(0) + ea + ")",
      opacity: data.data[j][binaryStandard.name] ? String(1) : String(0.5),
    };
    for (let i in style) {
      dataDataBox.style[i] = style[i];
    }

    dataDataFactors = [];
    for (let z of columns) {
      dataDataFactor = GeneralJs.nodes.div.cloneNode(true);
      dataDataFactor.classList.add("hoverDefault_lite");
      dataDataFactor.setAttribute("index", String(j));
      dataDataFactor.setAttribute("standard", data.data[j][data.standard]);
      dataDataFactor.setAttribute("column", z);
      dataDataFactor.setAttribute(sameStandard.name, String(data.data[j][sameStandard.name]));
      dataDataFactor.setAttribute(binaryStandard.name, String(data.data[j][binaryStandard.name]));
      if (data.data[j][binaryStandard.target] !== null) {
        dataDataFactor.setAttribute(binaryStandard.target, String(data.data[j][binaryStandard.target]));
      }
      style = {
        display: "inline-block",
        position: "relative",
        height: "100%",
        width: String(1000) + ea,
        transition: "all 0s ease",
        opacity: String(0),
        overflow: "hidden",
        marginRight: String(factorsMargin) + ea,
      };
      for (let i in style) {
        dataDataFactor.style[i] = style[i];
      }

      text_div = GeneralJs.nodes.div.cloneNode(true);
      text_div.setAttribute("index", String(j));
      text_div.setAttribute("column", z);
      text_div.textContent = data.data[j][z];
      style = {
        position: "absolute",
        top: String(7) + ea,
        fontSize: String(14) + ea,
        width: "auto",
        lineHeight: String(1.8),
        color: "#202020",
        fontWeight: data.data[j][sameStandard.name] ? String(500) : String(200),
        transition: "all 0s ease",
        textAlign: "center",
      };
      for (let i in style) {
        text_div.style[i] = style[i];
      }
      dataDataFactor.appendChild(text_div);
      if (editables[z] !== undefined) {
        tempFunction = editables[z];
        tempFunctionOutput = tempFunction();
        dataDataFactor.addEventListener("click", (editFunction(tempFunctionOutput.thisColumnName, tempFunctionOutput.inputFunction, tempFunctionOutput.outputFunction))[tempFunctionOutput.type]);
        dataDataFactor.addEventListener("contextmenu", (editFunction(tempFunctionOutput.thisColumnName, tempFunctionOutput.inputFunction, tempFunctionOutput.outputFunction))[tempFunctionOutput.type]);
      } else {
        dataDataFactor.addEventListener("click", dataAreaToCardEvent);
      }
      dataDataFactors.push({ tong: dataDataFactor, text: text_div, width: (data.columns[z].relative * relativeRatio) });
      if (alarmStandard[data.mode].target.includes(z)) {
        if (alarmStandard[data.mode].value.includes(data.data[j][alarmStandard[data.mode].standard])) {
          dataDataFactor.setAttribute("alarm", "on");
        } else {
          dataDataFactor.setAttribute("alarm", "off");
        }
        alarmTargets.push(dataDataFactor);
      }

      if (portfolioBooArr.includes(z)) {

        dataDataFactor.addEventListener("click", function (e) {
          const thisCase = this.parentNode;
          const thisFolderId = this.getAttribute(binaryStandard.target);
          const thisIndex = Number(this.getAttribute("index"));
          const thisData = data.data[thisIndex];
          const { designer, phone } = thisData;
          let str;
          if (thisFolderId !== null) {
            if (!/^__link__/.test(thisFolderId)) {
              str = "https://drive.google.com/drive/folders/";
              str += thisFolderId;
              str += "?usp=sharing";
            } else {
              str = thisFolderId.replace(/^__link__/, '');
            }
            for (let doms of thisCase.children) {
              if (portfolioBooArr.includes(doms.getAttribute("column"))) {
                if (doms.firstChild.querySelector("svg") !== null) {
                  doms.firstChild.querySelector("svg").remove();
                }
              }
            }
            GeneralJs.ajax("standard=" + phone + "&user=" + instance.user.email, "/viewDesignerRawPortfolio", function (data) {});
            window.open(str, "_blank");
          } else {
            alert("포트폴리오가 없습니다!");
          }
        });

        if (data.data[j][portfolioBooArr.standardColumnName] === portfolioBooArr.standardColumnValue) {
          if (JSON.parse(data.data[j][portfolioBooArr.flatColumnName]).length > 0) {
            tempBoo = false;
            for (let p of JSON.parse(data.data[j][portfolioBooArr.flatColumnName])) {
              if (p.who === instance.user.email) {
                tempBoo = true;
              }
            }
            if (!tempBoo) {
              dataDataFactor.setAttribute("alarm", "on");
              alarmTargets.push(dataDataFactor);
            }
          } else {
            dataDataFactor.setAttribute("alarm", "on");
            alarmTargets.push(dataDataFactor);
          }
        }
      }

      dataDataBox.appendChild(dataDataFactor);
    }
    sortTargets.push(dataDataBox);
    dataDataFactorsTotal.push(dataDataFactors);
    dataDataZone.appendChild(dataDataBox);
    dataDoms.push(dataDataBox);
  }

  this.aspirants = dataDoms;
  dataScrollBox.appendChild(dataDataZone);

  dataArea.appendChild(dataScrollBox);
  mother.appendChild(dataArea);

  //fix data area factor's width
  for (let { tong, text, width } of dataTitleFactors) {
    fixedWidth = text.getBoundingClientRect().width;
    tong.style.width = String(width) + ea;
    text.style.width = String(fixedWidth + 4) + ea;
    text.style.left = "calc(50% - " + String((fixedWidth / 2) + 2) + ea + ")";
    tong.style.opacity = String(1);
  }

  for (let arr of dataDataFactorsTotal) {
    for (let { tong, text, width } of arr) {
      fixedWidth = text.getBoundingClientRect().width;
      tong.style.width = String(width) + ea;
      text.style.width = String(fixedWidth + 4) + ea;
      text.style.left = "calc(50% - " + String((fixedWidth / 2) + 2) + ea + ")";
      tong.style.opacity = String(1);
    }
  }

  for (let a of alarmTargets) {
    if (a.getAttribute("alarm") === "on") {
      alarmCircle = SvgTong.stringParsing(instance.mother.returnCircle("position:absolute;transform:scale(0.4);transform-origin:100% 0%;right:-5.5px;top:" + (GeneralJs.isMac() ? String(4) : String(2)) + "px;", "#FF5F57"));
      a.firstChild.appendChild(alarmCircle);
    }
  }

  //report area
  reportArea = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    paddingLeft: String(mainMargin) + ea,
    paddingRight: String(mainMargin) + ea,
    height: String(reportHeight) + ea,
  };
  for (let i in style) {
    reportArea.style[i] = style[i];
  }
  reportScrollBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    top: String(subMargin) + ea,
    height: "calc(100% - " + String(subMargin) + ea + ")",
    background: "#f4f4f4",
    borderRadius: String(4) + ea,
  };
  for (let i in style) {
    reportScrollBox.style[i] = style[i];
  }
  reportArea.appendChild(reportScrollBox);
  mother.appendChild(reportArea);

  //report sort standards contents

  //report sort title
  GeneralJs.stacks["reportSortTitleFunction"] = function () {
    let div_clone, text_div;
    let style;
    let ea;
    let tempArr;

    //reset
    while (reportScrollBox.firstChild) {
      reportScrollBox.removeChild(reportScrollBox.lastChild);
    }

    ea = "px";

    reportSortTitleTop = GeneralJs.isMac() ? 20 : 24;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      top: String(reportSortTitleTop) + ea,
      left: String(28) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }
    text_div = GeneralJs.nodes.div.cloneNode(true);
    text_div.textContent = "분류 기준";
    style = {
      position: "absolute",
      fontSize: String(reportFontSize) + ea,
      fontWeight: String(500),
    };
    for (let i in style) {
      text_div.style[i] = style[i];
    }
    div_clone.appendChild(text_div);

    reportScrollBox.appendChild(div_clone);
    reportTextWidth = text_div.getBoundingClientRect().width;
    reportTextHeight = text_div.getBoundingClientRect().height;
    div_clone.style.width = String(reportTextWidth) + ea;
    div_clone.style.height = String(reportTextHeight) + ea;

    //report sort bar
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      top: String(reportSortTitleTop - 1) + ea,
      left: String(28 + reportTextWidth + 12) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }
    text_div = GeneralJs.nodes.div.cloneNode(true);
    text_div.textContent = "|";
    style = {
      position: "absolute",
      fontSize: String(reportFontSize) + ea,
      fontWeight: String(200),
      color: "#cccccc",
    };
    for (let i in style) {
      text_div.style[i] = style[i];
    }
    div_clone.appendChild(text_div);

    reportScrollBox.appendChild(div_clone);
    div_clone.style.width = String(text_div.getBoundingClientRect().width) + ea;
    div_clone.style.height = String(text_div.getBoundingClientRect().height) + ea;

    //report contents
    reportContentsBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      top: String(reportSortTitleTop) + ea,
      left: String(28 + reportTextWidth + 12 + text_div.getBoundingClientRect().width + 25) + ea,
      width: "calc(100% - " + String(28 + reportTextWidth + 12 + text_div.getBoundingClientRect().width + 25 + 28) + ea + ")",
      height: "calc(100% - " + String(reportSortTitleTop * 2) + ea + ")",
      overflow: "scroll",
    };
    for (let i in style) {
      reportContentsBox.style[i] = style[i];
    }

    reportTargetColumn = reportTargetMap[data.mode][0];
    reportTargetColumnTong = [];
    for (let i = 0; i < data.data.length; i++) {
      reportTargetColumnTong.push(data.data[i][reportTargetColumn]);
    }

    reportTargetColumnTong = Array.from(new Set(reportTargetColumnTong));
    reportTargetColumnTong.sort((a, b) => {
      if (a >= b) {
        return -1;
      } else {
        return 1;
      }
    });

    tempArr = [];
    reportTargetNumberValue = 0;
    for (let c of reportTargetColumnTong) {
      tempObj = {};
      reportTargetNumberValue = 0;
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i][reportTargetColumn] === c) {
          reportTargetNumberValue = reportTargetNumberValue + 1;
        }
      }
      tempObj.name = c;
      tempObj.value = reportTargetNumberValue;
      tempObj.eventFunction = function (e) {
        const displayNoneTarget = dataDoms.valueFilter(reportTargetColumn, c, true);
        const displayBlockTarget = dataDoms.valueFilter(reportTargetColumn, c, false);
        for (let z of displayNoneTarget) {
          z.style.display = "none";
        }
        for (let z of displayBlockTarget) {
          z.style.display = "block";
        }
      }
      tempArr.push(tempObj);
    }

    if (reportTargetColumn === "presentationTimes" || reportTargetColumn === "meetingTime") {
      tempArr.sort((a, b) => {
        return ((b.name.slice(0, 5).replace(/[^0-9]/g, '').length === 0) ? 9999999999 : ((b.name.slice(0, 5).replace(/[^0-9]/g, '').length === 2) ? Number(b.name.slice(0, 1) + '0' + b.name.slice(1, 5).replace(/[^0-9]/g, '')) : Number(b.name.slice(0, 5).replace(/[^0-9]/g, '')))) - ((a.name.slice(0, 5).replace(/[^0-9]/g, '').length === 0) ? 9999999999 : ((a.name.slice(0, 5).replace(/[^0-9]/g, '').length === 2) ? Number(a.name.slice(0, 1) + '0' + a.name.slice(1, 5).replace(/[^0-9]/g, '')) : Number(a.name.slice(0, 5).replace(/[^0-9]/g, ''))));
      });
    } else {
      tempArr.sort((a, b) => {
        if (a.name >= b.name) {
          return -1;
        } else {
          return 1;
        }
      });
    }

    reportTargetColumnTong = tempArr;
    reportTargetColumnTong.unshift({
      name: "전체 보기",
      value: null,
      eventFunction: function (e) {
        const displayBlockTarget = dataDoms.valueFilter(reportTargetColumn, "all", false);
        for (let z of displayBlockTarget) {
          z.style.display = "block";
        }
      }
    });

    reportTargetAllBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: String(8000) + ea,
      height: String(100) + '%',
      left: String(0) + ea,
      top: String(0) + ea,
      transition: "all 0s ease",
    };
    for (let i in style) {
      reportTargetAllBox.style[i] = style[i];
    }
    reportContentsBox.appendChild(reportTargetAllBox);
    reportScrollBox.appendChild(reportContentsBox);

    reportScrollBoxTotalWidth = 0;
    for (let i = 0; i < reportTargetColumnTong.length; i++) {
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("hoverDefault");
      style = {
        display: "inline-block",
        position: "relative",
        height: String(100) + '%',
        width: String(500) + ea,
        marginRight: String(28) + ea,
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }
      text_div = GeneralJs.nodes.div.cloneNode(true);
      if (reportTargetColumnTong[i].value !== null) {
        text_div.insertAdjacentHTML("beforeend", reportTargetColumnTong[i].name + ' : <b style="font-size:' + String(reportFontSize - 2) + ea + ';color:#2fa678;font-weight:500">' + String(reportTargetColumnTong[i].value) + '</b>');
      } else {
        text_div.insertAdjacentHTML("beforeend", reportTargetColumnTong[i].name);
      }
      style = {
        position: "absolute",
        fontSize: String(reportFontSize - 2) + ea,
        fontWeight: String(200),
        color: "#202020",
      };
      for (let i in style) {
        text_div.style[i] = style[i];
      }
      div_clone.appendChild(text_div);
      reportTargetAllBox.appendChild(div_clone);

      reportScrollBoxTotalWidth += text_div.getBoundingClientRect().width + 28 + 2;
      div_clone.style.width = String(text_div.getBoundingClientRect().width) + ea;
      div_clone.addEventListener("click", reportTargetColumnTong[i].eventFunction);
    }

    reportTargetAllBox.style.width = String(reportScrollBoxTotalWidth) + ea;
    GeneralJs.addScrollXEvent(reportContentsBox);

  }

  GeneralJs.stacks.reportSortTitleFunction();

  callback(dataDoms);
}

DesignerJs.prototype.reportViewMakerDetail = function (recycle = false) {
  const instance = this;
  try {
    return function () {
      const searchTarget = instance.searchInput.parentNode;
      const searchTarget_new = searchTarget.cloneNode(true);
      searchTarget.style.opacity = String(0);
      searchTarget_new.style.position = "absolute";
      searchTarget.parentNode.insertBefore(searchTarget_new, instance.searchInput.parentNode.nextElementSibling);
      searchTarget_new.querySelector("input").addEventListener("keypress", function (e) {
        this.value = this.value.replace(/[\~\!\@\#\$\%\^\&\*\(\)\_\[\]\{\}\<\>\/\? \n]/g, '').trim();
        if (e.keyCode === 13) {
          const finalValue = this.value.replace(/[\~\!\@\#\$\%\^\&\*\(\)\_\[\]\{\}\<\>\/\? \n]/g, '').trim();
          const regexp = new RegExp(finalValue, "gi");
          for (let dom of instance.aspirants) {
            if (!regexp.test(dom.textContent)) {
              dom.style.display = "none";
            } else {
              dom.style.display = "block";
            }
          }
        }
      });
      instance.aspirants_searchInput = searchTarget_new;

      let div_clone, svg_icon;
      let style;
      let ea = "px";
      let margin;
      let domTargets;
      let motherBoo;
      let width;

      motherBoo = (instance.onView === "mother") ? true : false;

      margin = 30;

      if (!recycle) {

        instance.whiteBox = {};

        //cancel box
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        div_clone.classList.add("justfadein");
        style = {
          position: "fixed",
          background: "#404040",
          top: String(0) + ea,
          left: String(motherBoo ? instance.grayBarWidth : 0) + ea,
          width: "calc(100% - " + String(motherBoo ? instance.grayBarWidth : 0) + ea + ")",
          height: "calc(100% - " + String(instance.belowHeight) + ea + ")",
          zIndex: String(2),
        };
        for (let i in style) {
          div_clone.style[i] = style[i];
        }

        div_clone.addEventListener("click", instance.whiteCancelMaker());

        instance.whiteBox.cancelBox = div_clone;
        instance.totalContents.appendChild(div_clone);

      }

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("fadeup");
      div_clone.classList.add("totalWhite");
      style = {
        position: "fixed",
        background: GeneralJs.colorChip.white,
        top: String(margin) + ea,
        left: String((motherBoo ? instance.grayBarWidth : 0) + margin) + ea,
        borderRadius: String(5) + ea,
        boxShadow: "0 2px 10px -6px #808080",
        width: String(window.innerWidth - (motherBoo ? instance.grayBarWidth : 0) - (margin * 2)) + ea,
        height: String(window.innerHeight - instance.belowHeight - (margin * 2) - 10) + ea,
        zIndex: String(2),
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }

      width = 50;

      svg_icon = instance.mother.returnLoadingIcon();
      style = {
        width: String(width) + ea,
        height: String(width) + ea,
        top: 'calc(50% - ' + String(width / 2) + ea + ')',
        left: 'calc(50% - ' + String(width / 2) + ea + ')',
      }
      for (let i in style) {
        svg_icon.style[i] = style[i];
      }
      div_clone.appendChild(svg_icon);

      instance.whiteBox.contentsBox = div_clone;
      instance.totalContents.appendChild(div_clone);

      GeneralJs.ajax("mode=total", "/getDesignerReport", function (data) {
        svg_icon.style.opacity = "0";
        instance.reportContents(JSON.parse(data), div_clone, svg_icon);
      });

      GeneralJs.stacks.whiteBox = 0;
    }
  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

DesignerJs.prototype.reportViewMaker = function () {
  const instance = this;
  return function (e) {
    let tempFunc;
    if (GeneralJs.stacks.whiteBox !== 1) {
      if (instance.whiteBox !== null) {
        tempFunc = instance.whiteCancelMaker(instance.reportViewMakerDetail(true), true);
        tempFunc();
      } else {
        tempFunc = instance.reportViewMakerDetail(false);
        tempFunc();
      }
    }
  }
}

DesignerJs.prototype.addTransFormEvent = function () {
  const instance = this;
  const { square: { up, down, reportIcon, returnIcon } } = this.mother.belowButtons;
  up.addEventListener("click", this.cardViewMaker());
  down.addEventListener("click", this.rowViewMaker());
  reportIcon.addEventListener("click", this.reportViewMaker());
  returnIcon.addEventListener("click", this.returnValueEventMaker());
}

DesignerJs.prototype.makeSearchEvent = function (search = null) {
  const instance = this;
  return async function (e) {
    if (GeneralJs.confirmKeyCode.includes(e.keyCode)) {

      if (search === null) {
        this.value = this.value.replace(/[ \n]/g, '');
      }

      if (instance.totalFather !== null && instance.totalFather !== undefined) {
        instance.totalFather.style.zIndex = String(-1);
        instance.totalFather.classList.remove("fadein");
        instance.totalFather.classList.add("fadeout");

        instance.totalMother.classList.remove("justfadeoutoriginal");
        instance.totalMother.classList.add("justfadeinoriginal");

        GeneralJs.timeouts.fadeinTimeout = setTimeout(function () {
          instance.totalFatherChildren = [];
          instance.totalFather.remove();
          instance.totalFather = null;
          instance.totalMother.classList.remove("justfadeinoriginal");
          clearTimeout(GeneralJs.timeouts.fadeinTimeout);
          GeneralJs.timeouts.fadeinTimeout = null;
        }, 401);
      }

      let grayOn = false;
      if (GeneralJs.stacks["grayTitle"] !== null) {
        GeneralJs.stacks["grayLeftButton"].setAttribute("set", "second");
        GeneralJs.grayLeftLaunching().call(GeneralJs.stacks["grayLeftButton"], {});
        grayOn = true;
      }

      if (instance.whiteBox !== null) {
        if (instance.whiteBox.cancelBox !== undefined && instance.whiteBox.cancelBox !== null) {
          const cancelFunction = instance.whiteCancelMaker(null, false);
          cancelFunction.call(instance.whiteBox.cancelBox, { type: "click" });
        } else {
          instance.whiteBox === null;
        }
      }
      instance.onView = "mother";

      if (search === null) {
        await instance.spreadData(this.value);
      } else {
        await instance.spreadData(search);
      }

      if (grayOn) {
        GeneralJs.timeouts.grayLeftOnOffTimeout = setTimeout(function () {
          GeneralJs.grayLeftLaunching().call(GeneralJs.stacks["grayLeftButton"], {});
          clearTimeout(GeneralJs.timeouts.grayLeftOnOffTimeout);
          GeneralJs.timeouts.grayLeftOnOffTimeout = null;
        }, 501);
      }

      if (GeneralJs.stacks["dashboardBoxBoo"]) {
        GeneralJs.dashboardBoxLaunching(GeneralJs.stacks["dashboardBox"], true);
      }

    }
  }
}

DesignerJs.prototype.addSearchEvent = function () {
  const instance = this;
  const input = this.searchInput;
  input.addEventListener("keypress", this.makeSearchEvent(null));
}

DesignerJs.prototype.backGrayBar = function () {
  const instance = this;
  let div_clone;
  let style;
  let ea = "px";

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    background: GeneralJs.colorChip.gray0,
    width: String(this.grayBarWidth) + ea,
    height: String(100) + "vh",
    top: String(0) + ea,
    left: String(0) + ea,
    zIndex: String(0),
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  this.totalContents.appendChild(div_clone);
}

DesignerJs.prototype.extractViewMakerDetail = function (recycle = false, link) {
  const instance = this;
  try {
    return function () {
      let div_clone;
      let style;
      let ea = "px";
      let margin;
      let domTargets;
      let motherBoo;
      let width;
      let iframe;
      let whiteArea;

      motherBoo = (instance.onView === "mother") ? true : false;

      margin = 30;

      if (!recycle) {

        instance.whiteBox = {};

        //cancel box
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        div_clone.classList.add("justfadein");
        style = {
          position: "fixed",
          background: "#404040",
          top: String(0) + ea,
          left: String(motherBoo ? instance.grayBarWidth : 0) + ea,
          width: "calc(100% - " + String(motherBoo ? instance.grayBarWidth : 0) + ea + ")",
          height: "calc(100% - " + String(instance.belowHeight) + ea + ")",
          zIndex: String(2),
        };
        for (let i in style) {
          div_clone.style[i] = style[i];
        }

        div_clone.addEventListener("click", instance.whiteCancelMaker());

        instance.whiteBox.cancelBox = div_clone;
        instance.totalContents.appendChild(div_clone);

      }

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("fadeup");
      div_clone.classList.add("totalWhite");
      style = {
        position: "fixed",
        background: GeneralJs.colorChip.white,
        top: String(margin) + ea,
        left: String((motherBoo ? instance.grayBarWidth : 0) + margin) + ea,
        borderRadius: String(5) + ea,
        boxShadow: "0 2px 10px -6px #808080",
        width: String(window.innerWidth - (motherBoo ? instance.grayBarWidth : 0) - (margin * 2)) + ea,
        height: String(window.innerHeight - instance.belowHeight - (margin * 2) - 10) + ea,
        zIndex: String(2),
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }

      iframe = document.createElement("IFRAME");
      iframe.setAttribute("src", link);
      iframe.setAttribute("width", "90%");
      iframe.setAttribute("height", "90%");
      style = {
        border: 0,
        width: "calc(100% - 50px)",
        height: "calc(100% - 60px)",
        top: "30px",
        left: "25px",
        position: "absolute",
        borderRadius: "5px",
        overflow: "hidden",
      };
      for (let i in style) {
        iframe.style[i] = style[i];
      }
      div_clone.appendChild(iframe);


      whiteArea = document.createElement("A");
      style = {
        border: 0,
        width: "calc(100% - 50px)",
        height: "calc(25% - 60px)",
        top: "30px",
        left: "25px",
        position: "absolute",
        cursor: "pointer",
      };
      for (let i in style) {
        whiteArea.style[i] = style[i];
      }
      whiteArea.setAttribute('href', link);
      whiteArea.setAttribute('target', '_blank');
      div_clone.appendChild(whiteArea);

      instance.whiteBox.contentsBox = div_clone;
      instance.totalContents.appendChild(div_clone);

      GeneralJs.stacks.whiteBox = 0;
    }
  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

DesignerJs.prototype.extractViewMaker = function (link) {
  const instance = this;
  return function (e) {
    let tempFunc;
    instance.whiteMatrixA = null;
    instance.whiteMatrixB = null;
    if (GeneralJs.stacks.whiteBox !== 1) {
      if (instance.whiteBox !== null) {
        tempFunc = instance.whiteCancelMaker(instance.extractViewMakerDetail(true, link), true);
        tempFunc();
      } else {
        tempFunc = instance.extractViewMakerDetail(false, link);
        tempFunc();
      }
    }
  }
}

DesignerJs.prototype.addExtractEvent = function () {
  const instance = this;
  const { sub: { extractIcon } } = this.mother.belowButtons;
  let sendEvent;

  sendEvent = async function (e) {
    try {
      const today = new Date();
      const caseCopied = JSON.parse(JSON.stringify(instance.cases));
      caseCopied.shift();
      const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
      const map = DataPatch.designerMap();

      let data;
      let valuesArr;
      let temp, temp2;
      let div_clone, svg_clone;
      let style;
      let ea = "px";
      let width;

      valuesArr = [];

      temp2 = Object.keys(caseCopied[0]);
      temp = [];
      for (let i of temp2) {
        temp.push(map[i].name);
      }
      valuesArr.push(temp);

      for (let i = 0; i < caseCopied.length; i++) {
        temp2 = Object.values(caseCopied[i]);
        valuesArr.push(temp2);
      }

      data = '';
      data += "values=";
      data += JSON.stringify(valuesArr).replace(/&/g, '').replace(/=/g, '');
      data += "&newMake=";
      data += "true";
      data += "&parentId=";
      data += parentId;
      data += "&sheetName=";
      data += "fromDB_client_" + String(today.getFullYear()) + instance.mother.todayMaker();

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("justfadein");
      style = {
        position: "fixed",
        zIndex: String(2),
        background: "#404040",
        opacity: String(0.2),
        width: "100%",
        height: "100%",
        top: String(0),
        left: String(0),
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }
      instance.totalMother.appendChild(div_clone);

      width = 50;
      svg_clone = instance.mother.returnLoadingIcon();
      style = {
        position: "fixed",
        zIndex: String(2),
        width: String(width) + ea,
        height: String(width) + ea,
        top: "calc(50% - " + String((width / 2) + 60) + ea + ")",
        left: "calc(50% - " + String((width / 2)) + ea + ")",
      };
      for (let i in style) {
        svg_clone.style[i] = style[i];
      }
      instance.totalMother.appendChild(svg_clone);

      GeneralJs.ajax(data, "/sendSheets", function (res) {
        const link = JSON.parse(res).link;
        div_clone.classList.remove("justfadein");
        div_clone.classList.add("justfadeout");
        svg_clone.style.opacity = "0";
        GeneralJs.timeouts["extractPendingBack"] = setTimeout(function () {
          let viewFunction;
          instance.totalMother.removeChild(instance.totalMother.lastChild);
          instance.totalMother.removeChild(instance.totalMother.lastChild);
          viewFunction = instance.extractViewMaker(link);
          viewFunction();
          clearTimeout(GeneralJs.timeouts["extractPendingBack"]);
          GeneralJs.timeouts["extractPendingBack"] = null;
        }, 401);
      });

    } catch (e) {
      GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
      console.log(e);
    }
  }

  extractIcon.addEventListener("click", sendEvent);
}

DesignerJs.prototype.makeClipBoardEvent = function (id) {
  const instance = this;
  return async function (e) {
    if (e.cancelable) {
      e.preventDefault();
    }
    try {
      await window.navigator.clipboard.writeText(id);
      instance.mother.greenAlert(`클립보드에 저장되었습니다!`);
    } catch (e) {
      GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
      console.log(e);
    }
  }
}

DesignerJs.prototype.whiteResize = function () {
  const instance = this;
  this.resizeStack = 0;
  this.resizeFrom = 0;
  this.resizePopup = 0;
  const resizeDebounceEvent = function () {
    let timeout;
    const reEvent = function () {
      if (instance.whiteBox !== undefined && instance.whiteBox !== null) {
        if (instance.whiteBox.id !== undefined) {
          window.location.search = "desid=" + instance.whiteBox.id;
        } else {
          window.location.reload();
        };
      }
      instance.resizeStack = 0;
    }
    let immediate = null;
    return function (e) {
      if (instance.resizeStack === 0) {
        instance.resizeStack = 1;
        instance.resizeFrom = window.innerWidth;
      }
      let context = this;
      let args = arguments;
      function later() {
        timeout = null;
        if (!immediate) { reEvent.apply(context, args); };
      }
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, 250);
      if (callNow) { reEvent.apply(context, args); };
    }
  }
  window.addEventListener('resize', resizeDebounceEvent());
}

// 06 Designer checkList

// checkList data

DesignerJs.checkListData = function (factorHeight, factorWidth, tendencyIndent, tendencyWidthIndent, tendencyFactorHeight) {
  const checkListData = [
    {
      name: "일반",
      children: [
        {
          name: "성함",
          value: function (designer) {
            return designer.designer;
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "연락처",
          value: function (designer) {
            return designer.information.phone;
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "경력",
          value: function (designer) {
            const { information } = designer;
            const { relatedY, relatedM, startY, startM } = information.business.career;
            return `유관 경력 : ${String(relatedY)}년 ${String(relatedM)}개월&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;스타일링 시작일 : ${String(startY)}년 ${String(startM)}월`;
          },
          update: function (text) {
            const errorObj = { updateQuery: "error", text: "error" };
            let updateQuery;
            let tempArr;
            let arr0, arr1;
            let relatedY, relatedM, startY, startM;
            let divText;
            updateQuery = {};
            divText = "";
            if (!/\|/g.test(text)) {
              return errorObj;
            } else {
              tempArr = text.split('|');
              if (tempArr.length !== 2) {
                return errorObj;
              } else {
                if (/년/g.test(tempArr[0]) && /년/g.test(tempArr[1])) {
                  arr0 = tempArr[0].split('년');
                  arr1 = tempArr[1].split('년');
                  if (arr0.length === 2 && arr1.length === 2) {
                    if (arr0[0].replace(/[^0-9]/gi, '').length === 0) {
                      return errorObj;
                    }
                    if (arr0[1].replace(/[^0-9]/gi, '').length === 0) {
                      return errorObj;
                    }
                    if (arr1[0].replace(/[^0-9]/gi, '').length === 0) {
                      return errorObj;
                    }
                    if (arr1[1].replace(/[^0-9]/gi, '').length === 0) {
                      return errorObj;
                    }
                    if (Number.isNaN(Number(arr0[0].replace(/[^0-9]/gi, '')))) {
                      return errorObj;
                    }
                    if (Number.isNaN(Number(arr0[1].replace(/[^0-9]/gi, '')))) {
                      return errorObj;
                    }
                    if (Number.isNaN(Number(arr1[0].replace(/[^0-9]/gi, '')))) {
                      return errorObj;
                    }
                    if (Number.isNaN(Number(arr1[1].replace(/[^0-9]/gi, '')))) {
                      return errorObj;
                    }
                    relatedY = Number(arr0[0].replace(/[^0-9]/gi, ''));
                    relatedM = Number(arr0[1].replace(/[^0-9]/gi, ''));
                    startY = Number(arr1[0].replace(/[^0-9]/gi, ''));
                    startM = Number(arr1[1].replace(/[^0-9]/gi, ''));
                    if (relatedY < 0) {
                      return errorObj;
                    }
                    if (relatedM < 0 || relatedM > 12) {
                      return errorObj;
                    }
                    if (startY < 1900 || startY > 4000) {
                      return errorObj;
                    }
                    if (startM <= 0 || startM > 12) {
                      return errorObj;
                    }
                    updateQuery["information.business.career.relatedY"] = relatedY;
                    updateQuery["information.business.career.relatedM"] = relatedM;
                    updateQuery["information.business.career.startY"] = startY;
                    updateQuery["information.business.career.startM"] = startM;
                    divText = `유관 경력 : ${String(relatedY)}년 ${String(relatedM)}개월&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;스타일링 시작일 : ${String(startY)}년 ${String(startM)}월`;
                  } else {
                    return errorObj;
                  }
                } else {
                  return errorObj;
                }
              }
            }
            return { updateQuery, text: divText };
          },
          height: factorHeight,
          type: "string",
        }
      ]
    },
    {
      name: "공간",
      children: [
        {
          name: "주소",
          value: function (designer) {
            return (designer.information.address.length === 0) ? "주소 없음" : designer.information.address[0];
          },
          update: function (text) {
            const errorObj = { updateQuery: "error", text: "error" };
            let updateQuery;
            let divText;
            updateQuery = {};
            divText = "";
            if (text === '') {
              return errorObj;
            } else {
              if (/없음/gi.test(text)) {
                updateQuery["information.address"] = [ text ];
              } else {
                updateQuery["information.address.0"] = text;
              }
            }
            return { updateQuery, text };
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "이동 수단",
          value: function (designer) {
            let contents, value;
            contents = [
              "대중교통",
              "자동차"
            ];
            value = [
              (/대중/.test(designer.analytics.region.transportation)) ? 1 : 0,
              (/대중/.test(designer.analytics.region.transportation)) ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            let contents, target;
            contents = [
              "대중교통",
              "자동차"
            ];
            target = null;
            for (let i = 0; i < value.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
                break;
              }
            }
            if (target === null) {
              target = contents[0];
            }
            return { "analytics.region.transportation": target };
          },
          height: factorHeight * 1.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
      ]
    },
    {
      name: "작업",
      children: [
        {
          name: "활동 범위",
          value: function (designer) {
            const { matrix } = designer.analytics.project;
            let contents, value;
            contents = [
              "홈퍼니싱 프리미엄",
              "홈스타일링 프리미엄",
              "토탈 스타일링 프리미엄",
              "설계 변경 프리미엄",
              "홈퍼니싱 일반",
              "홈스타일링 일반",
              "토탈 스타일링 일반",
              "설계 변경 일반",
            ];
            value = [
              matrix[0][2],
              matrix[1][2],
              matrix[2][2],
              matrix[3][2],
              matrix[0][1],
              matrix[1][1],
              matrix[2][1],
              matrix[3][1],
            ];
            return { contents, value };
          },
          update: function (value) {
            let xy, updateQuery;
            const positionConst = "analytics.project.matrix.";
            xy = [
              '0.2',
              '1.2',
              '2.2',
              '3.2',
              '0.1',
              '1.1',
              '2.1',
              '3.1',
            ];
            updateQuery = {};
            for (let i = 0; i < value.length; i++) {
              updateQuery[positionConst + xy[i]] = value[i];
            }
            return updateQuery;
          },
          height: factorHeight * 2,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "부분 공간",
          value: function (designer) {
            const { matrix } = designer.analytics.project;
            let contents, value;
            contents = [
              "홈퍼니싱 부분 공간",
              "홈스타일링 부분 공간",
              "토탈 스타일링 부분 공간",
              "설계 변경 부분 공간",
            ];
            value = [
              matrix[0][0],
              matrix[1][0],
              matrix[2][0],
              matrix[3][0],
            ];
            return { contents, value };
          },
          update: function (value) {
            let xy, updateQuery;
            const positionConst = "analytics.project.matrix.";
            xy = [
              '0.0',
              '1.0',
              '2.0',
              '3.0'
            ];
            updateQuery = {};
            for (let i = 0; i < value.length; i++) {
              updateQuery[positionConst + xy[i]] = value[i];
            }
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "온라인",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.project.online ? 1 : 0,
              designer.analytics.project.online ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.project.online";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "고객 예산 범위",
          value: function (designer) {
            let { min, max } = designer.analytics.project.operationBudget;
            let contentsValues;
            let tempArr;
            let contents, value;

            min = min / 10000;
            max = max / 10000;

            contents = [
              "0 - 500",
              "500 - 1000",
              "1000 - 2000",
              "2000 - 5000",
              "5000 -",
            ];

            contentsValues = [];
            for (let i = 0; i < contents.length; i++) {
              tempArr = contents[i].split(' - ');
              if (tempArr.length === 1) {
                tempArr.push("10000");
              }
              for (let j = 0; j < tempArr.length; j++) {
                tempArr[j] = Number(tempArr[j].replace(/[^0-9]/g, ''));
              }
              if (tempArr.length !== 2) {
                throw new Error("range error");
              }
              contentsValues.push(tempArr);
            }
            value = [];
            for (let i = 0; i < contents.length; i++) {
              value.push((min <= contentsValues[i][0] && contentsValues[i][1] <= max) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            let contents;
            let min = null, max = null;
            contents = [
              [ 0, 500 ],
              [ 500, 1000 ],
              [ 1000, 2000 ],
              [ 2000, 5000 ],
              [ 5000, 10000 ],
            ];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                min = i;
                break;
              }
            }
            for (let i = contents.length - 1; i > -1; i--) {
              if (value[i] === 1) {
                max = i;
                break;
              }
            }
            if (min === null || max === null) {
              min = 0;
              max = 0;
            }
            return { "analytics.project.operationBudget": { min: (contents[min][0] * 10000), max: (contents[max][1] * 10000) } };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 5,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "1차 제안 시간",
          value: function (designer) {
            let contents, value;
            contents = [
              "1주일 이내",
              "2주일 이내",
              "3주일 이내",
              "3주 이상"
            ];
            value = [];
            for (let i = 0; i < contents.length; i++) {
              if (designer.analytics.project.time.first === ((i + 1) * 7)) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return { contents, value };
          },
          update: function (value) {
            let contents, target;
            contents = [
              7,
              14,
              21,
              28
            ];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = i;
              }
            }
            return { "analytics.project.time.first": contents[target] };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "페이퍼 워크",
          value: function (designer) {
            let contents, value;
            contents = [
              "도면",
              "3D",
              "컨셉 제안",
              "마감재 제안",
              "제품 리스트",
              "참고 이미지",
              "드로잉",
            ];
            value = [];
            for (let i of contents) {
              value.push(designer.analytics.project.paperWork.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            let contents, target;
            contents = [
              "도면",
              "3D",
              "컨셉 제안",
              "마감재 제안",
              "제품 리스트",
              "참고 이미지",
              "드로잉",
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            return { "analytics.project.paperWork": target };
          },
          height: factorHeight * 2.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
      ]
    },
    {
      name: "시공",
      children: [
        {
          name: "시공 능력",
          value: function (designer) {
            let contents, value;
            contents = [ "1단계", "2단계", "3단계" ];
            value = [ 0, 0, 0 ];
            if (value[designer.analytics.construct.level - 1] === undefined) {
              throw new Error("level error");
            }
            value[designer.analytics.construct.level - 1] = 1;
            return { contents, value };
          },
          update: function (value) {
            let target;
            target = null;
            for (let i = 0; i < value.length; i++) {
              if (value[i] === 1) {
                target = i + 1;
              }
            }
            if (target === null) {
              target = 1;
            }
            return { "analytics.construct.level": target };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 3,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "시공 감리",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.construct.possible.supervision ? 1 : 0,
              designer.analytics.construct.possible.supervision ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.construct.possible.supervision";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "시공 방식 (S)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[0].contract.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.construct.case.0.contract";
            let contents, updateQuery, target;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 가능 (S)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[0].possible.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.construct.case.0.possible";
            let contents, updateQuery, target;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 방식 (T)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[1].contract.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.construct.case.1.contract";
            let contents, updateQuery, target;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 가능 (T)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[1].possible.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.construct.case.1.possible";
            let contents, updateQuery, target;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 방식 (XT)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[2].contract.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.construct.case.2.contract";
            let contents, updateQuery, target;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 가능 (XT)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[2].possible.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.construct.case.2.possible";
            let contents, updateQuery, target;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight * 1.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
      ]
    },
    {
      name: "스타일링",
      children: [
        {
          name: "스타일링 능력",
          value: function (designer) {
            let contents, value;
            contents = [ "1단계", "2단계", "3단계" ];
            value = [ 0, 0, 0 ];
            if (value[designer.analytics.styling.level - 1] === undefined) {
              throw new Error("level error");
            }
            value[designer.analytics.styling.level - 1] = 1;
            return { contents, value };
          },
          update: function (value) {
            let target;
            target = null;
            for (let i = 0; i < value.length; i++) {
              if (value[i] === 1) {
                target = i + 1;
              }
            }
            if (target === null) {
              target = 1;
            }
            return { "analytics.styling.level": target };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 3,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "제안 방식",
          value: function (designer) {
            let contents, value;
            contents = [
              "순차 제안",
              "한번에 제안"
            ];
            value = [];
            for (let i of contents) {
              if (i === designer.analytics.styling.method) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return { contents, value };
          },
          update: function (value) {
            let contents, target;
            contents = [
              "순차 제안",
              "한번에 제안"
            ];
            target = null;
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
              }
            }
            if (target === null) {
              target = contents[0];
            }
            return { "analytics.styling.method": target };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 3,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "빌트인 가구 제작",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.styling.furniture.builtin ? 1 : 0,
              designer.analytics.styling.furniture.builtin ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.styling.furniture.builtin";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "디자인 가구 제작",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.styling.furniture.design ? 1 : 0,
              designer.analytics.styling.furniture.design ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.styling.furniture.design";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "커튼 패브릭 제작",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.styling.fabric.curtain ? 1 : 0,
              designer.analytics.styling.fabric.curtain ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.styling.fabric.curtain";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "베딩 패브릭 제작",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.styling.fabric.bedding ? 1 : 0,
              designer.analytics.styling.fabric.bedding ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.styling.fabric.bedding";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "패브릭 발주 방식",
          value: function (designer) {
            let contents, value;
            contents = [
              "업체 연결",
              "기성 제품 추천",
              "직접 제작"
            ];
            value = [];
            for (let i of contents) {
              if (designer.analytics.styling.fabric.method === i) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return { contents, value };
          },
          update: function (value) {
            let contents, target;
            contents = [
              "업체 연결",
              "기성 제품 추천",
              "직접 제작"
            ];
            target = null;
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
              }
            }
            if (target === null) {
              target = contents[0];
            }
            return { "analytics.styling.fabric.method": target };
          },
          height: factorHeight * 1.5,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "스타일 경향성",
          value: function (designer) {
            let contents, contentsKey, contentsMother, value;
            contentsKey = [
              "modern",
              "classic",
              "natural",
              "mixmatch",
              "scandinavian",
              "vintage",
              "oriental",
              "exotic",
            ];
            contentsMother = {
              modern: "모던",
              classic: "클래식",
              natural: "내추럴",
              mixmatch: "믹스매치",
              scandinavian: "북유럽",
              vintage: "빈티지",
              oriental: "오리엔탈",
              exotic: "이그저틱",
            };
            contents = [];
            for (let i of contentsKey) {
              contents.push(contentsMother[i]);
            }
            value = [];
            for (let i of contentsKey) {
              value.push(designer.analytics.styling.tendency.style[i] - 1);
            }
            return { contents, value };
          },
          update: function (z, t) {
            const position = "analytics.styling.tendency.style.";
            let contents, updateQuery;
            contents = [
              "modern",
              "classic",
              "natural",
              "mixmatch",
              "scandinavian",
              "vintage",
              "oriental",
              "exotic",
            ];
            updateQuery = {};
            updateQuery[position + contents[z]] = t + 1;
            return updateQuery;
          },
          height: (tendencyFactorHeight * 8) + (factorHeight * 0.7),
          width: factorWidth - tendencyIndent,
          totalWidth: (factorWidth * 4) + tendencyWidthIndent,
          factorHeight: tendencyFactorHeight,
          type: "tendency",
        },
        {
          name: "텍스처 경향성",
          value: function (designer) {
            let contents, contentsKey, contentsMother, value;
            contentsKey = [
              "darkWood",
              "whiteWood",
              "coating",
              "metal",
            ];
            contentsMother = {
              darkWood: "진한 우드",
              whiteWood: "연한 우드",
              coating: "도장",
              metal: "금속",
            };
            contents = [];
            for (let i of contentsKey) {
              contents.push(contentsMother[i]);
            }
            value = [];
            for (let i of contentsKey) {
              value.push(designer.analytics.styling.tendency.texture[i] - 1);
            }
            return { contents, value };
          },
          update: function (z, t) {
            const position = "analytics.styling.tendency.texture.";
            let contents, updateQuery;
            contents = [
              "darkWood",
              "whiteWood",
              "coating",
              "metal",
            ];
            updateQuery = {};
            updateQuery[position + contents[z]] = t + 1;
            return updateQuery;
          },
          height: (tendencyFactorHeight * 4) + (factorHeight * 0.7),
          width: factorWidth - tendencyIndent,
          totalWidth: (factorWidth * 4) + tendencyWidthIndent,
          factorHeight: tendencyFactorHeight,
          type: "tendency",
        },
        {
          name: "컬러톤 경향성",
          value: function (designer) {
            let contents, contentsKey, contentsMother, value;
            contentsKey = [
              "darkWood",
              "whiteWood",
              "highContrast",
              "vivid",
              "white",
              "mono",
              "bright",
              "dark",
            ];
            contentsMother = {
              darkWood: "다크 우드",
              whiteWood: "화이트 우드",
              highContrast: "고대비",
              vivid: "비비드",
              white: "화이트",
              mono: "모노톤",
              bright: "밝은톤",
              dark: "어두운톤",
            };
            contents = [];
            for (let i of contentsKey) {
              contents.push(contentsMother[i]);
            }
            value = [];
            for (let i of contentsKey) {
              value.push(designer.analytics.styling.tendency.color[i] - 1);
            }
            return { contents, value };
          },
          update: function (z, t) {
            const position = "analytics.styling.tendency.color.";
            let contents, updateQuery;
            contents = [
              "darkWood",
              "whiteWood",
              "highContrast",
              "vivid",
              "white",
              "mono",
              "bright",
              "dark",
            ];
            updateQuery = {};
            updateQuery[position + contents[z]] = t + 1;
            return updateQuery;
          },
          height: (tendencyFactorHeight * 8) + (factorHeight * 0.7),
          width: factorWidth - tendencyIndent,
          totalWidth: (factorWidth * 4) + tendencyWidthIndent,
          factorHeight: tendencyFactorHeight,
          type: "tendency",
        },
        {
          name: "밀도 경향성",
          value: function (designer) {
            let contents, contentsKey, contentsMother, value;
            contentsKey = [
              "maximun",
              "minimum",
            ];
            contentsMother = {
              maximun: "맥시멈",
              minimum: "미니멈",
            };
            contents = [];
            for (let i of contentsKey) {
              contents.push(contentsMother[i]);
            }
            value = [];
            for (let i of contentsKey) {
              value.push(designer.analytics.styling.tendency.density[i] - 1);
            }
            return { contents, value };
          },
          update: function (z, t) {
            const position = "analytics.styling.tendency.density.";
            let contents, updateQuery;
            contents = [
              "maximun",
              "minimum",
            ];
            updateQuery = {};
            updateQuery[position + contents[z]] = t + 1;
            updateQuery[position + contents[1 - z]] = 10 - (t + 1);
            return updateQuery;
          },
          height: (tendencyFactorHeight * 2) + (factorHeight * 0.5),
          width: factorWidth - tendencyIndent,
          totalWidth: (factorWidth * 4) + tendencyWidthIndent,
          factorHeight: tendencyFactorHeight,
          type: "tendency",
          opposite: true,
        },
      ]
    },
    {
      name: "구매",
      children: [
        {
          name: "구매 대행",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.purchase.agencies ? 1 : 0,
              designer.analytics.purchase.agencies ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.purchase.agencies";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "조립 설치 서비스",
          value: function (designer) {
            let contents, value;
            contents = [
              "제공",
              "미제공"
            ];
            value = [
              designer.analytics.purchase.setting.install ? 1 : 0,
              designer.analytics.purchase.setting.install ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.purchase.setting.install";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "정리 수납 상담",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.purchase.setting.storage ? 1 : 0,
              designer.analytics.purchase.setting.storage ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.purchase.setting.storage";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight * 1.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
      ]
    },
    {
      name: "성격",
      children: [
        {
          name: "미팅 적극성",
          value: function (designer) {
            let contents, value;
            contents = [
              "높음",
              "낮음"
            ];
            value = [
              designer.analytics.etc.personality[0].value ? 1 : 0,
              designer.analytics.etc.personality[0].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.etc.personality.0.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "미팅 준비성",
          value: function (designer) {
            let contents, value;
            contents = [
              "높음",
              "낮음"
            ];
            value = [
              designer.analytics.etc.personality[1].value ? 1 : 0,
              designer.analytics.etc.personality[1].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.etc.personality.1.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "작업 속도",
          value: function (designer) {
            let contents, value;
            contents = [
              "빠름",
              "느림"
            ];
            value = [
              designer.analytics.etc.personality[2].value ? 1 : 0,
              designer.analytics.etc.personality[2].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.etc.personality.2.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "진행 스타일",
          value: function (designer) {
            let contents, value;
            contents = [
              "리드",
              "순응"
            ];
            value = [
              designer.analytics.etc.personality[3].value ? 1 : 0,
              designer.analytics.etc.personality[3].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.etc.personality.3.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "고객 맞춤",
          value: function (designer) {
            let contents, value;
            contents = [
              "적극",
              "소극"
            ];
            value = [
              designer.analytics.etc.personality[4].value ? 1 : 0,
              designer.analytics.etc.personality[4].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.etc.personality.4.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "홈리에종 관계",
          value: function (designer) {
            let contents, value;
            contents = [
              "지속가능성 높음",
              "그냥 평범",
              "확인중",
              "좋지 않음"
            ];
            value = [];
            for (let i of contents) {
              if (i === designer.analytics.etc.relation) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return { contents, value };
          },
          update: function (value) {
            let contents, target;
            contents = [
              "지속가능성 높음",
              "그냥 평범",
              "확인중",
              "좋지 않음"
            ];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
              }
            }
            return { "analytics.etc.relation": target };
          },
          height: factorHeight * 1.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
      ]
    }
  ];
  return checkListData;
}

// checkList method

DesignerJs.prototype.checkListView = async function (invisible = false) {
  const instance = this;
  try {
    const { createNode, createNodes, ajaxJson, colorChip, withOut } = GeneralJs;
    const { totalMother, ea, grayBarWidth } = this;
    const designers = await ajaxJson({ noFlat: true }, "/getDesigners");
    const length = designers.length;
    let boxTong;
    let nodeArr;
    let tempObj;
    let minWidth;
    let margin;
    let width, height;
    let boxNumber;
    let status;
    let searchInput;

    this.designers = new Designers(designers);

    minWidth = 210;
    margin = 8;

    boxNumber = Math.floor((window.innerWidth - grayBarWidth) / (minWidth + margin));
    width = (window.innerWidth - grayBarWidth - ((boxNumber + 1 + 4) * margin)) / boxNumber;

    boxTong = createNode({
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(0),
        left: String(grayBarWidth) + ea,
        paddingLeft: String(margin * 3) + ea,
        paddingTop: String(margin * 3) + ea,
        paddingBottom: String(margin * 3) + ea,
        width: withOut(grayBarWidth + (margin * 3), ea),
        height: "auto",
        animation: !invisible ? "fadeup 0.3s ease forwards" : "invisible 0.3s ease forwards",
      }
    });

    this.checkListBaseList = boxTong;

    nodeArr = [];
    for (let i = 0; i < length; i++) {

      status = /완료/g.test(designers[i].information.contract.status);

      tempObj = {
        mother: boxTong,
        class: [ "hoverDefault" ],
        attribute: [
          { desid: designers[i].desid }
        ],
        events: [
          {
            type: "click",
            event: function (e) {
              const desid = this.getAttribute("desid");
              instance.checkListDetailLaunching(desid, false);
            }
          }
        ],
        style: {
          display: "inline-block",
          position: "relative",
          width: String(width) + ea,
          height: String(width) + ea,
          marginRight: String(margin) + ea,
          marginBottom: String(margin) + ea,
          borderRadius: String(5) + "px",
          background: status ? colorChip.gray1 : colorChip.gray3,
        }
      };
      nodeArr.push(tempObj);

      for (let j = 0; j < 9; j++) {
        tempObj = {
          mother: -1 * (j + 1),
          style: {
            position: "absolute",
            top: String(1 + (32 * Math.floor(j / 3)) + (1 * Math.floor(j / 3))) + '%',
            left: String(1 + (32 * (j % 3)) + (1 * (j % 3))) + '%',
            width: String(32) + '%',
            height: String(32) + '%',
            borderRadius: String(3) + "px",
            background: status ? colorChip.gray0 : colorChip.gray3,
            opacity: String(0.2 + Math.random())
          }
        };
        nodeArr.push(tempObj);
      }

      tempObj = {
        mother: -10,
        text: `checkList&nbsp;<b style="font-style:normal;font-family:'graphik';font-weight:100;color:${status ? colorChip.black : colorChip.deactive}">${designers[i].information.did}</b>`,
        style: {
          position: "absolute",
          width: String(100) + '%',
          top: "calc(50% + " + String(8) + ea + ")",
          fontSize: String(16) + ea,
          textAlign: "center",
          fontFamily: "graphik",
          fontWeight: String(400),
          fontStyle: "italic",
          color: status ? colorChip.black : colorChip.deactive,
        }
      };
      nodeArr.push(tempObj);
      tempObj = {
        mother: -1,
        text: designers[i].designer,
        style: {
          position: "absolute",
          width: String(100) + '%',
          top: String(GeneralJs.isMac() ? -43 : -40) + ea,
          fontSize: String(32) + ea,
          textAlign: "center",
          fontWeight: String(500),
          fontStyle: "normal",
          color: status ? colorChip.black : colorChip.deactive,
        }
      };
      nodeArr.push(tempObj);
    }

    createNodes(nodeArr);

    //search event
    searchInput = this.searchInput;
    searchInput.addEventListener("keypress", function (e) {
      if (e.keyCode === 13) {
        const value = this.value.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '').replace(/[\~\@\#\$\%\^\&\*\(\)\-\=\+\[\]\{\}\<\>\/\\ \n\t]/gi, '');
        let target;
        if (value === "") {
          instance.checkListDetailLaunching("", false, true);
        } else {
          target = null;
          for (let { designer, desid } of instance.designers) {
            if (value === designer) {
              target = desid;
            }
          }
          if (target !== null) {
            instance.checkListDetailLaunching(target);
          }
        }
      }
    });

    //standard doms event
    for (let i = 1; i < this.standardDoms.length; i++) {
      this.standardDoms[i].addEventListener("click", (e) => {
        window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general&desid=" + instance.standardDoms[i].getAttribute("desid");
      });
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.checkListDetailLaunching = function (desid, noAnimation = false, removeOnly = false) {
  const instance = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = totalMother.firstChild;
  let target;

  if (this.checkListBaseTong !== undefined && this.checkListBaseTong !== null && this.checkListBaseList !== undefined && this.checkListBaseList !== null) {
    this.checkListBaseTong.parentNode.removeChild(this.checkListBaseTong);
    this.checkListBaseTong = null;
    this.checkListBaseList.style.animation = "fadein 0.3s ease forwards";
    standardBar.style.position = "relative";
    for (let i = 1; i < this.standardDoms.length; i++) {
      this.standardDoms[i].style.display = "block";
    }
    const mother = document.querySelector(".totalMother");
    if (this.rInitialIcon !== undefined && this.rInitialIcon !== null) {
      mother.removeChild(this.rInitialIcon);
    }
    if (this.nextIcon !== undefined && this.nextIcon !== null) {
      mother.removeChild(this.nextIcon);
    }
    if (this.mInitialIcon !== undefined && this.mInitialIcon !== null) {
      mother.removeChild(this.mInitialIcon);
    }
    if (this.previousIcon !== undefined && this.previousIcon !== null) {
      mother.removeChild(this.previousIcon);
    }
    if (this.aInitialIcon !== undefined && this.aInitialIcon !== null) {
      mother.removeChild(this.aInitialIcon);
    }
    if (this.listIcon !== undefined && this.listIcon !== null) {
      mother.removeChild(this.listIcon);
    }
    this.listIcon = null;
    this.aInitialIcon = null;
    this.previousIcon = null;
    this.mInitialIcon = null;
    this.nextIcon = null;
    this.rInitialIcon = null;
  }

  if (!removeOnly) {
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
        this.standardDoms[i].style.display = "none";
      } else {
        this.standardDoms[i].style.display = "block";
      }
    }
    standardBar.style.position = "fixed";
    if (/fade/gi.test(this.checkListBaseList.style.animation)) {
      this.checkListBaseList.style.animation = "fadeout 0.3s ease forwards";
    }
    totalMother.scrollTo({ top: 0, behavior: "smooth" });
    this.checkListDetail(desid, noAnimation);
    this.checkListIconSet(desid, noAnimation);
  }
}

DesignerJs.prototype.checkListDetail = function (desid, noAnimation = false) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const designer = this.designers.pick(desid);
  const { information, analytics } = designer;
  const matrixButtonConst = "matrixButtons_" + desid;
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

  margin = 8;
  level1Width = 210;
  level1Left = 160;
  topMargin = GeneralJs.isMac() ? 30 : 32;
  leftMargin = 34;
  bottomMargin = 15;
  size = 17;
  tendencyTop = 3;
  tendencyHeight = 16;
  alphabetWidth = 30;

  factorHeight = 38;
  factorWidth = 210;
  tendencyFactorHeight = 30;
  tendencyIndent = 105;
  tendencyWidthIndent = -135;

  const checkListData = DesignerJs.checkListData(factorHeight, factorWidth, tendencyIndent, tendencyWidthIndent, tendencyFactorHeight);

  baseTong0 = createNode({
    mother: totalMother,
    style: {
      position: "absolute",
      top: String(margin * 3) + ea,
      left: String(grayBarWidth + (margin * 3)) + ea,
      width: withOut(grayBarWidth + (margin * 6), ea),
      height: "auto",
      animation: noAnimation ? "" : "fadeup 0.3s ease forwards",
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
      marginBottom: String(80) + ea,
    }
  });

  for (let i = 0; i < checkListData.length; i++) {
    nodeArr = createNodes([
      {
        mother: baseTong,
        style: {
          position: "relative",
          width: String(100) + '%',
          borderBottom: i !== checkListData.length - 1 ? "1px solid " + colorChip.gray4 : "",
        }
      },
      {
        mother: -1,
        text: checkListData[i].name,
        style: {
          position: "absolute",
          fontSize: String(size) + ea,
          fontWeight: String(700),
          color: colorChip.black,
          top: String(topMargin) + ea,
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
          paddingBottom: String(bottomMargin) + ea,
        }
      },
      {
        mother: -4,
        text: String.fromCharCode(65 + i),
        style: {
          position: "absolute",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          color: colorChip.green,
          bottom: String(topMargin) + ea,
          right: String(leftMargin) + ea,
          zIndex: String(2),
        }
      },
    ]);

    eachTotalTong = nodeArr[0];
    eachNameTong = nodeArr[2];
    eachValueTong = nodeArr[3];

    for (let j = 0; j < checkListData[i].children.length; j++) {
      tempArr = [];
      tempObj = {
        mother: eachNameTong,
        text: String.fromCharCode(65 + i) + String(j + 1),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          color: colorChip.green,
          height: String(checkListData[i].children[j].height) + ea,
          width: String(alphabetWidth) + ea,
        }
      };
      tempArr.push(tempObj);
      tempObj = {
        mother: eachNameTong,
        text: checkListData[i].children[j].name,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(size) + ea,
          fontWeight: String(500),
          color: colorChip.black,
          height: String(checkListData[i].children[j].height) + ea,
          width: withOut(alphabetWidth, ea),
        }
      };
      tempArr.push(tempObj);

      if (checkListData[i].children[j].type === "string") {

        tempObj = {
          mother: eachValueTong,
          text: (typeof checkListData[i].children[j].value === "function") ? checkListData[i].children[j].value(designer) : "NULL",
          attribute: [
            { x: String(i) },
            { y: String(j) },
          ],
          events: [
            {
              type: "click",
              event: function (e) {
                e.stopPropagation();
                if (/div/gi.test(e.target.nodeName)) {
                  const x = Number(this.getAttribute('x'));
                  const y = Number(this.getAttribute('y'));
                  if (typeof checkListData[x].children[y].update === "function") {
                    const [ cancelBox, inputBox ] = createNodes([
                      {
                        mother: this,
                        mode: "aside",
                        events: [
                          {
                            type: "click",
                            event: function (e) {
                              this.parentElement.removeChild(this.parentElement.querySelector("input"));
                              this.parentElement.removeChild(this.parentElement.querySelector("aside"));
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
                          zIndex: String(1),
                        }
                      },
                      {
                        mother: this,
                        mode: "input",
                        attribute: [
                          { type: "text" },
                          { value: this.textContent },
                          { past: this.textContent },
                        ],
                        events: [
                          {
                            type: "keypress",
                            event: async function (e) {
                              try {
                                if (e.keyCode === 13) {
                                  const whereQuery = { desid };
                                  const { updateQuery, text } = checkListData[x].children[y].update(this.value);
                                  if (updateQuery === "error") {
                                    this.value = this.getAttribute("past");
                                  } else {
                                    this.parentElement.removeChild(this.parentElement.firstChild);
                                    this.parentElement.insertAdjacentHTML("beforeend", text);
                                    await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                                  }
                                  this.parentElement.removeChild(this.parentElement.querySelector("aside"));
                                  this.parentElement.removeChild(this.parentElement.querySelector("input"));
                                }
                              } catch (err) {
                                console.log(err);
                              }
                            }
                          }
                        ],
                        style: {
                          display: "block",
                          position: "absolute",
                          fontSize: String(size) + ea,
                          fontWeight: String(400),
                          top: String(0),
                          left: String(0),
                          color: colorChip.green,
                          background: colorChip.white,
                          border: String(0),
                          outline: String(0),
                          width: String(this.getBoundingClientRect().width) + ea,
                          zIndex: String(1),
                        }
                      }
                    ]);
                    inputBox.focus();
                  }
                }
              }
            }
          ],
          style: {
            display: "block",
            position: "relative",
            fontSize: String(size) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            height: String(checkListData[i].children[j].height) + ea,
            cursor: "pointer",
          }
        };
        tempArr.push(tempObj);

      } else if (checkListData[i].children[j].type === "matrix") {

        tempMatrix = checkListData[i].children[j].value(designer);

        tempObj = {
          mother: eachValueTong,
          style: {
            display: "block",
            position: "relative",
            fontSize: String(size) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            width: String(checkListData[i].children[j].totalWidth) + ea,
            height: String(checkListData[i].children[j].height) + ea,
          }
        };
        tempArr.push(tempObj);

        for (let k = 0; k < tempMatrix.contents.length; k++) {
          tempObj = {
            mother: -1 + (k * -1),
            text: tempMatrix.contents[k],
            attribute: [
              { x: String(i) },
              { y: String(j) },
              { z: String(k) },
              { toggle: String(tempMatrix.value[k]) },
            ],
            events: [
              {
                type: "click",
                event: async function (e) {
                  try {
                    const x = Number(this.getAttribute('x'));
                    const y = Number(this.getAttribute('y'));
                    const z = Number(this.getAttribute('z'));
                    const toggle = Number(this.getAttribute('toggle'));
                    const multiple = checkListData[x].children[y].multiple === true;
                    const thisButtons = document.querySelectorAll('.' + matrixButtonConst + String(x) + String(y));
                    let anothers, resultArr;
                    let whereQuery, updateQuery;

                    anothers = [];
                    for (let dom of thisButtons) {
                      if (this !== dom) {
                        anothers.push(dom);
                      }
                    }
                    if (toggle === 0) {
                      if (!multiple) {
                        for (let dom of anothers) {
                          dom.style.color = colorChip.gray4;
                          dom.setAttribute("toggle", String(0));
                        }
                      }
                      this.style.color = colorChip.green;
                      this.setAttribute("toggle", String(1));
                    } else {
                      this.style.color = colorChip.gray4;
                      this.setAttribute("toggle", String(0));
                    }

                    resultArr = [];
                    for (let dom of thisButtons) {
                      resultArr.push(Number(dom.getAttribute("toggle")));
                    }
                    updateQuery = checkListData[x].children[y].update(resultArr);
                    whereQuery = { desid };

                    await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");

                  } catch (err) {
                    console.log(err);
                  }
                }
              }
            ],
            class: [ "hoverDefault_lite", matrixButtonConst + String(i) + String(j), matrixButtonConst + String(i) + String(j) + String(k) ],
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(size) + ea,
              fontWeight: String(300),
              width: String(checkListData[i].children[j].width) + ea,
              color: colorChip[tempMatrix.value[k] === 1 ? "green" : "gray4"],
              height: String(checkListData[i].children[j].factorHeight) + ea,
              transition: "all 0.1s ease",
            }
          };
          tempArr.push(tempObj);
        }

      } else if (checkListData[i].children[j].type === "tendency") {

        tempMatrix = checkListData[i].children[j].value(designer);
        tempObj = {
          mother: eachValueTong,
          style: {
            display: "block",
            position: "relative",
            fontSize: String(size) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            width: String(checkListData[i].children[j].totalWidth) + ea,
            height: String(checkListData[i].children[j].height) + ea,
          }
        };
        tempArr.push(tempObj);

        for (let k = 0; k < tempMatrix.contents.length; k++) {
          tempObj = {
            mother: -1 + (k * -11),
            text: tempMatrix.contents[k],
            class: [ "hoverDefault_lite" ],
            style: {
              display: "block",
              position: "relative",
              fontSize: String(size) + ea,
              fontWeight: String(300),
              width: String(checkListData[i].children[j].totalWidth) + ea,
              color: colorChip.black,
              height: String(checkListData[i].children[j].factorHeight) + ea,
            }
          };
          tempArr.push(tempObj);
          for (let l = 0; l < 10; l++) {
            temp = (checkListData[i].children[j].totalWidth - checkListData[i].children[j].width) / 10;
            tempObj = {
              mother: -1 + (l * -1),
              attribute: [
                { x: String(i) },
                { y: String(j) },
                { z: String(k) },
                { t: String(l) },
                { toggle: String(l <= tempMatrix.value[k] ? 1 : 0) },
              ],
              events: [
                {
                  type: "click",
                  event: async function (e) {
                    try {
                      const x = Number(this.getAttribute('x'));
                      const y = Number(this.getAttribute('y'));
                      const z = Number(this.getAttribute('z'));
                      const t = Number(this.getAttribute('t'));
                      const thisButtons = document.querySelectorAll('.' + matrixButtonConst + String(x) + String(y) + String(z));
                      let whereQuery, updateQuery;

                      for (let i = 0; i < thisButtons.length; i++) {
                        if (i <= t) {
                          thisButtons[i].setAttribute("toggle", String(1));
                          thisButtons[i].style.background = colorChip.green;
                        } else {
                          thisButtons[i].setAttribute("toggle", String(0));
                          thisButtons[i].style.background = colorChip.gray2;
                        }
                      }

                      if (checkListData[x].children[y].opposite === true) {
                        const oppositeButtons = document.querySelectorAll('.' + matrixButtonConst + String(x) + String(y) + String(1 - z));
                        if (oppositeButtons !== null) {
                          for (let i = 0; i < oppositeButtons.length; i++) {
                            if (i < oppositeButtons.length - t - 1) {
                              oppositeButtons[i].setAttribute("toggle", String(1));
                              oppositeButtons[i].style.background = colorChip.green;
                            } else {
                              oppositeButtons[i].setAttribute("toggle", String(0));
                              oppositeButtons[i].style.background = colorChip.gray2;
                            }
                          }
                        }
                      }

                      whereQuery = { desid };
                      updateQuery = checkListData[x].children[y].update(z, t);

                      await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                    } catch (err) {
                      console.log(err);
                    }
                  }
                }
              ],
              class: [ "hoverDefault_lite", matrixButtonConst + String(i) + String(j) + String(k) ],
              style: {
                position: "absolute",
                width: String(temp) + ea,
                left: String(checkListData[i].children[j].width + (temp * l)) + ea,
                background: colorChip[l <= tempMatrix.value[k] ? "green" : "gray2"],
                top: String(tendencyTop) + ea,
                height: String(tendencyHeight) + ea,
                transition: "all 0.1s ease",
              }
            };
            if (l === 0) {
              tempObj.style.borderTopLeftRadius = tempObj.style.borderBottomLeftRadius = String(3) + "px";
            }
            if (l === 10 - 1) {
              tempObj.style.borderTopRightRadius = tempObj.style.borderBottomRightRadius = String(3) + "px";
            }
            tempArr.push(tempObj);
          }
        }
      }
      createNodes(tempArr);
    }

  }

  this.checkListBaseTong = baseTong0;
}

DesignerJs.prototype.checkListDesignerMemo = function (desid) {
  const instance = this;
  const { totalMother, ea, grayBarWidth, belowHeight } = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut } = GeneralJs;
  const baseTong = this.checkListBaseTong;
  const designer = this.designers.pick(desid);
  return async function (e) {
    try {
      if (document.getElementById("memoTong") === null) {

        let memoTong;
        let margin;
        let innerMargin;
        let titleHeight;
        let size;
        let titleBox, whiteBox, scrollBox, textBox;
        let resObj, history;

        margin = 40;
        innerMargin = 15;
        titleHeight = 31;
        size = 16;

        resObj = await ajaxJson({ method: "designer", property: "history", idArr: [ desid ] }, "/getHistoryProperty");
        if (resObj[desid] === undefined) {
          throw new Error("history error");
        }
        history = resObj[desid];
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
            width: "calc(calc(calc(100% - " + String(grayBarWidth) + ea + ") / 2) - " + String(margin) + ea + ")",
            height: "calc(calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 3) * 2) - " + String(margin) + ea + ")",
            bottom: String(belowHeight + margin) + ea,
            right: String(margin) + ea,
            borderRadius: String(3) + "px",
            boxShadow: "0px 5px 18px -9px " + colorChip.shadow,
            animation: "fadeup 0.3s ease forwards",
            background: colorChip.gradientGreen2,
          }
        });

        [ titleBox, whiteBox, scrollBox, textBox ] = createNodes([
          {
            mother: memoTong,
            text: designer.designer + " 디자이너 메모",
            style: {
              position: "absolute",
              top: String(innerMargin - 1) + ea,
              left: String(innerMargin + 2) + ea,
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
              width: "calc(50% - " + String(innerMargin * 1.5) + ea + ")",
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
              top: String(innerMargin) + ea,
              left: String(innerMargin) + ea,
              width: withOut(innerMargin * 2, ea),
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
                  const ajaxData = "method=designer&id=" + desid + "&column=history&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail;
                  GeneralJs.ajax(ajaxData, "/updateHistory", function () {});
                }
              },
              {
                type: "keypress",
                event: function (e) {
                  if (e.keyCode === 13) {
                    const cookies = GeneralJs.getCookiesAll();
                    const ajaxData = "method=designer&id=" + desid + "&column=history&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail;
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
          }
        ]);
        textBox.value = history;

      } else {
        totalMother.removeChild(document.getElementById("memoTong"));
      }

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.checkListIconSet = function (desid, noAnimation = false) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const mother = document.querySelector(".totalMother");
  const { createNode, createNodes, colorChip, withOut, blankHref } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight } = this;
  const designer = this.designers.pick(desid);
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

  nodeArr = createNodes([
    {
      mother,
      style: {
        position: "fixed",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(belowHeight + bottom) + ea,
        left: String(left) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        animation: noAnimation ? "" : "fadeup 0.3s ease forwards",
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
        position: "fixed",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(belowHeight + bottom + (radius * 2) + margin) + ea,
        left: String(left) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        animation: noAnimation ? "" : "fadeup 0.3s ease forwards",
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
        position: "fixed",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(belowHeight + bottom) + ea,
        left: String(left + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        animation: noAnimation ? "" : "fadeup 0.3s ease forwards",
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
        position: "fixed",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(belowHeight + bottom + (radius * 2) + margin) + ea,
        left: String(left + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        animation: noAnimation ? "" : "fadeup 0.3s ease forwards",
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
        position: "fixed",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(belowHeight + bottom) + ea,
        left: String(left + (radius * 2) + margin + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        animation: noAnimation ? "" : "fadeup 0.3s ease forwards",
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
        position: "fixed",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(belowHeight + bottom + (radius * 2) + margin) + ea,
        left: String(left + (radius * 2) + margin + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        animation: noAnimation ? "" : "fadeup 0.3s ease forwards",
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

  listIcon.addEventListener("click", (e) => { instance.checkListDetailLaunching(desid, false, true); });

  previousIcon.addEventListener("click", function (e) {
    const { desid: previousDesid } = instance.designers.previous(desid);
    instance.checkListDetailLaunching(previousDesid, true);
  });

  nextIcon.addEventListener("click", function (e) {
    const { desid: nextDesid } = instance.designers.next(desid);
    instance.checkListDetailLaunching(nextDesid, true);
  });

  rInitialIcon.addEventListener("click", function (e) {
    blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general&desid=" + desid);
  });

  mInitialIcon.addEventListener("click", instance.checkListDesignerMemo(desid));

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

DesignerJs.prototype.launching = async function () {
  const instance = this;
  try {
    const getObj = GeneralJs.returnGet();
    let getTarget;
    let tempFunction;

    this.user = GeneralJs.getUser();

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.backGrayBar();
    // await this.spreadData();
    // this.addTransFormEvent();
    // this.addSearchEvent();
    // this.addExtractEvent();
    // this.whiteResize();

    getTarget = null;
    if (getObj.mode === "general" || getObj.mode === '2') {

      await this.spreadData();
      this.addTransFormEvent();
      this.addSearchEvent();
      this.addExtractEvent();
      this.whiteResize();

      if (getObj.desid !== undefined) {
        for (let dom of this.standardDoms) {
          if ((new RegExp(getObj.desid, 'gi')).test(dom.textContent)) {
            getTarget = dom;
          }
        }
        if (getTarget === null) {
          tempFunction = this.makeSearchEvent(getObj.desid);
          await tempFunction({ keyCode: 13 });
          for (let dom of this.standardDoms) {
            if ((new RegExp(getObj.desid, 'gi')).test(dom.textContent)) {
              getTarget = dom;
            }
          }
        }
        if (getTarget !== null) {
          getTarget.click();
        }
      }

    } else if (getObj.mode === "aspirant" || getObj.mode === '1') {

      await this.spreadData();
      this.addTransFormEvent();
      this.addSearchEvent();
      this.addExtractEvent();
      this.whiteResize();
      tempFunction = instance.reportViewMaker();
      tempFunction();

    } else if (getObj.mode === "checklist" || getObj.mode === '6') {

      document.getElementById("grayLeftOpenButton").remove();
      if (getObj.desid !== undefined) {
        await this.spreadData(null, true, getObj.desid);
        await this.checkListView(true);
        this.checkListDetailLaunching(getObj.desid);
      } else {
        await this.spreadData(null, true);
        await this.checkListView();
      }
      this.addTransFormEvent();
      document.getElementById("moveRightArea").style.display = "none";
      document.getElementById("moveLeftArea").style.display = "none";

    } else {

      tempFunction = this.cardViewMaker(true);
      tempFunction().catch(function (e) {
        throw new Error(e);
      });

    }

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
